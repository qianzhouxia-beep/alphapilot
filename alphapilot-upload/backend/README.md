# AlphaPilot Backend — FastAPI Scaffold

> **W1 预研产出 (2026-06-05)**
> **PM**: 领航 (mvs_c4114159002f4e34850b3008d3ecae77)
> **目的**: 拍板一开,代码立刻能跑 (W2 启动 0 摩擦)

---

## 这个脚手架能做什么

- ✅ FastAPI app 启动,带 `/health` 和 `/v1/screener/top` (mock)
- ✅ 跑通 Docker + Docker Compose
- ✅ 接 PostgreSQL (SQLAlchemy 2) + Redis (redis-py async)
- ✅ 接 Polygon.io REST (requests / httpx) — 准备后 W2 接 WebSocket
- ✅ pytest 跑通 1 个 smoke test
- ✅ Pydantic v2 schema + .env 加载 + structlog 日志

**不能**做什么 (留给 W2-W4):
- ❌ 不接 WebSocket (留 W2 接 Polygon 实时)
- ❌ 不接 Stripe (留 W2 接支付)
- ❌ 不接真实 AI 模型 (M1 全部 mock)
- ❌ 不接 9 大微服务 (M1 单体先跑通)

---

## 怎么跑 (老板 / PM 验证用)

### 方式 A: 本地 Python

```powershell
cd D:\MavisProjects\alphapilot\backend
py -3.11 -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env  # 然后填 POLYGON_API_KEY
uvicorn app.main:app --reload --port 8001
```

打开 http://localhost:8001/docs 看 OpenAPI。

### 方式 B: Docker

```powershell
cd D:\MavisProjects\alphapilot\backend
docker build -t alphapilot-backend .
docker run -p 8001:8001 --env-file .env alphapilot-backend
```

---

## 目录结构

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                # FastAPI app + 路由注册
│   ├── config.py              # pydantic-settings 加载 .env
│   ├── db.py                  # SQLAlchemy 2 async session
│   ├── cache.py               # Redis async client
│   ├── polygon.py             # Polygon REST client (W2 扩 WebSocket)
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── screener.py        # ScreenerTop response schema
│   │   └── stock.py           # Stock detail schema
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── health.py
│   │   └── screener.py
│   └── services/
│       ├── __init__.py
│       └── screener_service.py
├── tests/
│   ├── __init__.py
│   └── test_health.py
├── requirements.txt
├── pyproject.toml
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

---

## 关键文件清单 (9 个)

| 文件 | 作用 | 状态 |
|---|---|---|
| `app/main.py` | FastAPI app 入口 | ✅ |
| `app/config.py` | 环境变量加载 | ✅ |
| `app/db.py` | DB session 工厂 | ✅ |
| `app/cache.py` | Redis client | ✅ |
| `app/polygon.py` | Polygon REST 客户端 (W2 扩) | ✅ stub |
| `app/routers/health.py` | `/health` 端点 | ✅ |
| `app/routers/screener.py` | `/v1/screener/top` mock 端点 | ✅ |
| `tests/test_health.py` | pytest smoke | ✅ |
| `Dockerfile` + `docker-compose.yml` + `requirements.txt` + `.env.example` | 容器化 + 依赖 | ✅ |

---

## W2 启动扩展点

老板拍完 A 后,本脚手架直接升级:

1. **接 Polygon WebSocket** → `app/polygon.py` 加 WebSocket client,实时 trade/quote 流
2. **接 Stripe** → 新增 `app/payments.py` + `app/routers/billing.py` + Webhook 接收
3. **接真实数据模型** → `app/models/` 加 SQLAlchemy ORM (stocks, quotes, signals 等)
4. **加 AI mock** → `app/services/screener_service.py` 升级为"机会评分 mock"逻辑
5. **加 auth** → `app/auth.py` 接 JWT (python-jose) + bcrypt

---

## 验证清单 (PM 自测用)

- [ ] `py -3.11 -m venv .venv` 通过
- [ ] `pip install -r requirements.txt` 0 错误
- [ ] `uvicorn app.main:app --reload --port 8001` 启动无 traceback
- [ ] `curl http://localhost:8001/health` 返回 `{"status":"ok"}`
- [ ] `curl http://localhost:8001/v1/screener/top?n=5` 返回 5 条 mock 股票
- [ ] `curl http://localhost:8001/docs` 200 OK (Swagger UI)
- [ ] `pytest` 通过 1 个 smoke test
- [ ] `docker build -t alphapilot-backend .` 0 错误
- [ ] `docker run -p 8001:8001 alphapilot-backend` 启动 + `/health` 200

**PM 跑完验证清单 → STATUS.md "M1 W2 启动" 状态由 🟡 改 🟢**。

---

## 不做的 (防 over-engineering)

按 Karpathy guideline 砍掉:
- ❌ Alembic migration (M1 阶段表直接 `Base.metadata.create_all`)
- ❌ Celery 队列 (M1 同步够用,M2 再加)
- ❌ 多个 worker / gunicorn (M1 单进程够,W2 压测再上)
- ❌ Sentry / Prometheus (M3 再接)
- ❌ K8s helm chart (Zeabur 直接跑)
- ❌ OpenTelemetry (M3 再接)

**只做最小可跑 → 验证 → 签字 → 扩**。
