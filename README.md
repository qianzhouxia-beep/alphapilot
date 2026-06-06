# AlphaPilot — AI Stock Decision Platform

> **Status**: 🟡 W2 启动中 (2026-06-05)
> **PM**: 领航 (mvs_c4114159002f4e34850b3008d3ecae77)
> **CEO**: 麦麦总 (mvs_21438e83b392464b8fc3ef4d573a0067)
> **L1 老板**: 用户本人
> **市场**: 🇺🇸 美股 only (NYSE / NASDAQ / AMEX)
> **截止**: W2 周五 6/12 (老板 demo 日)

---

## 项目定位

**不是** 行情软件 / 选股工具。**是** 用 AI 对市场数据做理解、推理、评分、解释,帮用户**发现机会 + 识别主力意图 + 制定交易计划 + 控制风险**的决策平台。

**5 大核心竞争力** (per `AlphaPilot.md`):
1. AI 主力意图识别 (吸筹/洗盘/拉升/出货/诱多/诱空 7 阶段概率)
2. AI 交易决策卡 (综合评分 + 买卖区间 + 仓位 + 失效条件)
3. 多周期共振分析 (5m/15m/30m/60m/Daily/Weekly)
4. Explainable AI 证据链 (每条结论可追溯)
5. 风险优先决策框架 (5 类风险事件检测)

**产品铁律**: 概率 + 置信度 + 证据链 + 风险 + 失效条件。**禁止** 承诺盈利/上涨/精准预测。

---

## 仓库结构

```
alphapilot/
├── backend/          # FastAPI 0.115 + Python 3.11
├── frontend/         # Next.js 15.1 + React 19 + TS 5.7
├── research/         # 预研文档
│   ├── POLYGON-WEBSOCKET-RESEARCH.md
│   └── STRIPE-PAYMENTS-KYC-RESEARCH.md
├── .harness/         # L5 项目员工 reins
│   └── reins/
│       ├── alphapilot-coder/
│       ├── alphapilot-reviewer/
│       ├── alphapilot-tester/
│       ├── alphapilot-quant/
│       └── alphapilot-marketer/
├── AlphaPilot.md     # 产品定义 (834 行, AI 开发总指令 V3.0)
├── AlphaPilot_Design.md  # UI 设计规范 (483 行)
├── DECISIONS-v1.md   # W1 拍板材料 (老板全 A 已拍)
├── STATUS.md         # 项目主状态 (L2/L3 协调单一信息源)
├── W2-PLAN.md        # W2 路线图 (激进版 demo, 6/12 截止)
└── README.md         # 你在这里
```

---

## 老板拍板结果 (5 A + 1 B)

| # | 拍板点 | 选项 | 状态 |
|---|---|---|---|
| 1 | MVP 范围 | A 单体先跑通 3 大模块 | ✅ 拍 |
| 2 | 技术栈 | A Next.js 15 + FastAPI + PostgreSQL | ✅ 拍 |
| 3 | 数据源 | A Polygon 主 + Alpha 备 + Tradier 期权 | ✅ 拍 |
| 4 | 股票池 | A SP500 | ✅ 拍 |
| 5 | 商业模式 | A 订阅 $29/$99/$299 | ✅ 拍 |
| 6 | **时间表** | **B 激进版 2 周 demo (6/12 截止)** | ✅ 拍 |

详细拍板材料: `DECISIONS-v1.md`

---

## 快速验证 (PM 自测用)

### 后端

```powershell
cd D:\MavisProjects\alphapilot\backend
.\.venv\Scripts\python.exe -m pytest tests/ -v
# 3 passed in 3.51s
```

### 前端 (等 npm install 完)

```powershell
cd D:\MavisProjects\alphapilot\frontend
copy .env.example .env.local
npm run dev
# open http://localhost:3000
```

### 端到端联通

```powershell
# 1) Start backend (port 8001)
cd D:\MavisProjects\alphapilot\backend
.\.venv\Scripts\python.exe -m uvicorn app.main:app --port 8001

# 2) Start frontend (port 3000) in another shell
cd D:\MavisProjects\alphapilot\frontend
npm run dev

# 3) Open http://localhost:3000 → see Dashboard with 20 mock stocks
```

---

## W2 路线图 (6/5 - 6/12 demo)

老板拍 B 激进版,**7 天交付可 demo 给美国用户看的最小完整版**:

| 天 | 阶段 | 交付物 | 验证 |
|---|---|---|---|
| **6/5 (今天)** | M1 后端 + M2 前端骨架 | FastAPI 3 端点 + Next.js Dashboard | pytest + curl + 浏览器 |
| **6/6-7** | M3 详情页 + 决策卡 + 主力意图雷达 mock | /stock/[symbol] 页 + radar chart (SVG) | 浏览器点 AAPL/MSFT 看完整页 |
| **6/8-9** | M4 用户注册/登录 (JWT) | /signup /login /api/auth/* | curl + 浏览器 |
| **6/10** | M5 Stripe 沙箱订阅 | /billing + Stripe Checkout test mode | Stripe test 卡扣款 + Webhook |
| **6/11** | M6 部署 Zeabur + DNS 切换 | https://alphapilot.api-tokenmaster.com 上线 | 老板刷真域名 |
| **6/12** | M7 整体 demo + 验收 | 全流程 demo + README + 录屏 | 老板 L1 验收签字 |

每块流程: **做 → 验证 → 签字 → 下一块** (Karpathy goal-driven)。

---

## 团队

### L3 PM
- **领航** (mvs_c4114159002f4e34850b3008d3ecae77) — 当前 session, AlphaPilot 项目总经理

### L4 全局员工 (跨项目可调)
- 时妹 (scheduler) / 小桥 (im-bridge) / 建哥 (team-builder) / 匠叔 (skill-crafter) / 启明 (self-improver) / 销妹 (marketing-promoter)

### L5 项目员工 (本项目专属, M2 启动后建)
- alphapilot-coder (AlphaPilot 码哥) — 前后端开发
- alphapilot-reviewer (AlphaPilot 审官) — 代码审查 + AI 模型审查
- alphapilot-tester (AlphaPilot 测手) — 单元/集成/E2E
- **alphapilot-quant (AlphaPilot 算神)** — 美股 AI 模型训练 (AlphaPilot 独有)
- alphapilot-marketer (AlphaPilot 广哥) — M3 上线后建

---

## 合规边界 (硬约束)

- ✅ 覆盖: 美股 + 美股 ETF + 美股期权
- ❌ **不进入中国市场** (合规 + 投顾红线)
- ❌ **不涉港股 / A 股 / 其他海外市场**
- ✅ 营销 + 支付 + 服务: 全美
- ✅ 文案铁律: "Probabilistic, not Guaranteed" / "Not investment advice"
- ✅ 行业描述: "Software & SaaS" (避免 Stripe 触发高风险审核)

---

## 不做的 (防 over-engineering)

按 Karpathy 简约优先:
- ❌ K8s / Helm (Zeabur 直接跑)
- ❌ 微服务架构 (M1 单体先跑通)
- ❌ OpenTelemetry / Sentry (M3+ 再接)
- ❌ Alembic 自动 migration (M1 直接 `metadata.create_all`)
- ❌ Celery 异步队列 (M1 同步够用)
- ❌ 复杂 CI/CD (M2 末 GitHub Actions 跑 lint+test 即可)

---

**领航 2026-06-05 13:02 启航。W2 7 天,6/12 demo 见。**
