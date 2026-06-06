# Zeabur 部署指南 — AlphaPilot

> **老板 L1 09:23 拍板**: 今天部署
> **领航 09:34 写**: 老板照着点, 5 分钟上线
> **服务器**: Zeabur 新加坡节点 (老板 00:54 拍板改新加坡)

---

## TL;DR (5 步上线)

```powershell
# 1. 老板 L1: 在 https://zeabur.com 创建账号 (GitHub 登录)
# 2. 老板 L1: New Project -> Singapore region (新加坡)
# 3. 老板 L1: Deploy -> GitHub repo (alphapilot) -> main 分支
# 4. 老板 L1: Add 2 services: backend (Dockerfile) + frontend (next start)
# 5. 老板 L1: Add Postgres + Redis services, 配 DATABASE_URL/REDIS_URL env
```

---

## 1. 老板 L1 准备 (5 min)

### 1.1 GitHub repo
- 创建 `alphapilot` repo (org 名自定, e.g. `api-tokenmaster/alphapilot`)
- 把 D:\MavisProjects\alphapilot 推到 main 分支
- 包含 .gitignore 已写 (忽略 .env, .venv, node_modules, demo-screens/*.png)

### 1.2 Zeabur 项目
- https://zeabur.com 注册 (GitHub OAuth)
- New Project -> 选 **Singapore (ap-southeast-1)**
- 项目名: `alphapilot`

### 1.3 PayPal sandbox (W2 末老板 L1 拍板接入, M2 stub)
- https://developer.paypal.com/dashboard
- Apps & Credentials -> Sandbox -> Create App
- Copy **Client ID** + **Secret** (给 W3 配 env)

### 1.4 东方财富数据 (M3 自动, 不需 key)
- 东方财富公共 API, 无需注册

---

## 2. Zeabur 服务架构 (领航 09:34 已写 monorepo 配置)

```
zeabur-deploy/
├── zeabur.json           # 项目配置
├── backend.Dockerfile    # backend 镜像
└── frontend.Dockerfile   # frontend 镜像
```

### 2.1 backend 服务

| 项 | 值 |
|---|---|
| Name | `alphapilot-backend` |
| Source | GitHub repo, monorepo path: `alphapilot/` |
| Dockerfile | `backend.Dockerfile` |
| Port | 8001 (容器内) |
| Health check | `GET /health` |
| Env vars | 见下表 |

```env
# Required
DATABASE_URL=postgresql+asyncpg://alphapilot:STRONG_PWD@${POSTGRES_HOST}:5432/alphapilot
REDIS_URL=redis://${REDIS_HOST}:6379/0
APP_ENV=production
CORS_ORIGINS_RAW=https://alphapilot.api-tokenmaster.com
JWT_SECRET=GENERATE_WITH_openssl_rand_hex_32
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=1440

# Polygon (美股数据, M3 真接 W4 上)
POLYGON_API_KEY=YOUR_POLYGON_KEY

# PayPal (M3 真接 W3 末)
PAYPAL_CLIENT_ID=YOUR_PAYPAL_SANDBOX_CLIENT_ID
PAYPAL_CLIENT_SECRET=YOUR_PAYPAL_SANDBOX_CLIENT_SECRET
PAYPAL_MODE=sandbox
```

### 2.2 frontend 服务

| 项 | 值 |
|---|---|
| Name | `alphapilot-frontend` |
| Source | 同一个 repo, monorepo |
| Dockerfile | `frontend.Dockerfile` |
| Port | 3000 (容器内) |
| Env vars | |

```env
NEXT_PUBLIC_API_BASE=https://api-alphapilot.zeabur.app
# 或绑域名: https://alphapilot.api-tokenmaster.com (通过 Zeabur 域名 + 反代)
```

### 2.3 Postgres 服务
- Zeabur Marketplace -> PostgreSQL -> Deploy
- 16-alpine, 自动给 `POSTGRES_HOST` / `POSTGRES_PASSWORD` / `POSTGRES_USER` / `POSTGRES_DB`
- backend env 用 `${POSTGRES_HOST}` 占位自动注入

### 2.4 Redis 服务
- Zeabur Marketplace -> Redis -> Deploy
- 7-alpine
- backend env 用 `${REDIS_HOST}` 占位

---

## 3. 域名绑定 (老板 L1 操作)

```
Zeabur -> alphapilot-frontend service -> Networking -> Custom Domain
  -> alphapilot.api-tokenmaster.com (CNAME)
  -> Zeabur 自动 SSL (Let's Encrypt)
```

DNS (老板 L1 在 Cloudflare / 阿里云 DNS):
- 删旧: qubix.api-tokenmaster.com (没部署过任何东西, 无 SEO 包袱)
- 加新: alphapilot.api-tokenmaster.com CNAME -> gateway.zeabur.com (Zeabur 给的)

Zeabur 自动给 frontend 一个 `xxx.zeabur.app` 子域名, 5 分钟生效, 先用子域名测, 再绑真域名.

---

## 4. M2 上线检查清单 (老板 L1 自测)

部署后, 老板 L1 打开 `https://alphapilot.api-tokenmaster.com` 应该看到:

- [ ] Dashboard 加载 (US 20 只 + A 股 25 只)
- [ ] 点击 AAPL -> 详情页正常
- [ ] 点击 600519.SH -> A 股详情正常
- [ ] 点击 "Sign up" -> 注册 (M2 mock, 任何 email+password 都行)
- [ ] 右上角 🌐 EN/中 toggle 切换语言
- [ ] 切换 美股/A股 tab 路由跳转
- [ ] Browser DevTools console 0 errors
- [ ] curl https://.../health -> 200 OK
- [ ] curl https://.../api/v1/ping -> 200 OK
- [ ] curl https://.../v1/screener/top -> 200 OK (US 20 只)

---

## 5. 老板 L1 Zeabur 部署 5 步 (3 分钟操作)

1. **GitHub 推代码** (领航会做, 见 §6)
2. **Zeabur -> New Project -> Singapore** (1 min)
3. **Deploy -> GitHub repo + main 分支** (1 min)
4. **Add 2 services + 2 marketplace**:
   - Add Service -> alphapilot-backend (Dockerfile in `alphapilot/`)
   - Add Service -> alphapilot-frontend (Dockerfile in `alphapilot/`)
   - Add from Marketplace -> PostgreSQL
   - Add from Marketplace -> Redis
5. **配 env vars** (per §2) + 等 build (~3-5 min)

部署完成 -> 拿 Zeabur 给的 `xxx.zeabur.app` 子域名 -> 老板 L1 测 ✓ -> 绑真域名 (alphapilot.api-tokenmaster.com).

---

## 6. 推代码 (领航 09:34-09:35 做)

```powershell
cd D:\MavisProjects\alphapilot
git init 2>&1 | Select-Object -First 3
git add . 2>&1 | Select-Object -First 3
git status 2>&1 | Select-Object -First 10
git -c user.email=linghang@alphapilot.io -c user.name=linghang commit -m "M2 done: dual-market + bilingual + 25 A-share leaders + mock auth + 3 logos" 2>&1 | Select-Object -First 5
git remote add origin https://github.com/api-tokenmaster/alphapilot.git 2>&1
git push -u origin main 2>&1 | Select-Object -First 5
```

**需要老板 L1 配合**:
- GitHub repo 创建 (https://github.com/new, 选 private)
- Personal access token (Settings -> Developer settings -> PAT, 勾 repo)
- 老板发我 token 或 webhook URL, 我推代码

---

## 7. 老板 L1 速读 - Zeabur 5 步

| 步骤 | 操作 | 估时 |
|---|---|---|
| 1 | 老板 L1: GitHub 建 alphapilot private repo | 30s |
| 2 | 老板 L1: 创 PAT (classic, 勾 repo) 发我 | 30s |
| 3 | 领航: 推 D:\MavisProjects\alphapilot 代码到 main | 1 min |
| 4 | 老板 L1: Zeabur -> New Project Singapore | 30s |
| 5 | 老板 L1: Deploy GitHub + Add 4 services + 配 env | 3 min |
| **总计** | | **5 min** |

---

## 8. 已知限制 + W3 计划

### 8.1 已知限制 (M2 部署后)

| 项 | 状态 | 缓解 |
|---|---|---|
| 8002 后端 signup /api/auth/* | 死路 | A 方案前端 mock, W3 接入真后端 |
| 8001 端口被 RoadMap 占 | 互不干扰 | 我们 8002 |
| 东方财富 push2hisquote (历史 K 线) | 本地 8s 超时 | 改 datacenter-web 通道, M3 验证新加坡节点 |
| paypal SDK (httpx async) | M2 写了, 没真测 | M3 老板 L1 给 sandbox key 后立即真测 |
| 旧域名 qubix.api-tokenmaster.com | 删, 无 301 | 老板 L1 拍板 12:46 不做 |
| M2 mock 25 龙头 | 短期, W3 切真数据 | 东方财富 100% 实时榜单, 部署后立即切 |
| PayPal payment | M2 stub, W3 末接入 | 老板 L1 给 sandbox key |

### 8.2 W3 立即做 (M2 部署后)

1. **东方财富 client 切真数据** (已写 eastmoney.py, 改 cn-mock fn 用真数据, **1 hour**)
2. **PayPal sandbox 真接入** (老板 L1 给 key, 跑 create-order + capture 端到端, **1 hour**)
3. **300+ A 股池扩展** (用东方财富 screener API, 自动取 Top 300, **1 hour**)
4. **GitHub Actions CI** (lint + test, 跟 RoadMap 类似, **1 hour**)
5. **老板 L1 验收 + 调整** (demo 给老板, 反馈调整)

---

**领航 09:34 — 老板 L1 推代码 + Zeabur 5 步即可上线**。需要 GitHub PAT 我立即推。
