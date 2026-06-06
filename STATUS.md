# AlphaPilot

## 简介

AI-Powered Stock Intelligence & Trading Decision Platform。

**核心定位**：不是行情软件、不是选股工具，而是用 AI 对市场数据做理解、推理、评分、解释，帮用户**发现机会 + 识别主力意图 + 制定交易计划 + 控制风险**的决策平台。

**产品原则（铁律）**：
- ✅ 必须输出：概率 + 置信度 + 证据链 + 风险提示 + 失效条件
- ❌ 禁止承诺：保证盈利 / 保证上涨 / 精准预测价格

**核心竞争力**：
1. AI 主力意图识别系统（吸筹/洗盘/拉升/出货/二次吸筹/诱多/诱空 7 阶段概率分布）
2. AI 交易决策卡（综合评分 + 买卖区间 + 仓位 + 失效条件一卡打完）
3. 多周期共振分析（5m/15m/30m/60m/Daily/Weekly 同向验证）
4. Explainable AI 证据链（每条结论都可追溯）
5. 风险优先决策框架（风险 > 机会，5 类风险事件检测）

**目标用户**：美国市场专业投资者 / 高频决策用户（**仅美股 / 美股期权**，**不进入中国市场**，**不涉港股**）。

**市场边界（硬约束，老板 2026-06-05 拍板）**：
- ✅ 覆盖：**美股 + 美股 ETF + 美股期权**（NYSE / NASDAQ / AMEX）
- ❌ 不覆盖：A 股 / 港股 / 其他海外市场
- ❌ **不进入中国大陆市场**（合规 + 投顾红线）
- ✅ 营销 / 支付 / 服务：**全美**

**对应文档**：
- 产品定义：`AlphaPilot.md`（834 行 AI 开发总指令 V3.0）
- 设计规范：`AlphaPilot_Design.md`（483 行 UI 设计规范，深色科技风 + 决策优先信息层级）

## 技术栈

- **前端**: Next.js 15 + React 19 + TypeScript + TailwindCSS + shadcn/ui + Framer Motion
- **图表**: TradingView Lightweight Chart + Recharts
- **状态管理**: Zustand + React Query
- **鉴权**: JWT + OAuth
- **后端**: FastAPI（Python）+ 微服务架构
- **9 大微服务**: market-service / indicator-service / capitalflow-service / chip-service / sentiment-service / prediction-service / strategy-service / risk-service / screener-service
- **通信**: REST API + WebSocket + Redis Queue
- **数据库**: PostgreSQL（stocks / quotes / kline / capital_flow / chip_distribution / financial_reports / news / signals / predictions / strategies / risk_events / users / watchlists / backtests）
- **缓存**: Redis（实时行情缓存 / AI 结果缓存 / 热点股票 / 排行榜）
- **数据源（美股）**: Polygon.io (主) / Alpha Vantage (备) / IEX Cloud (备) / SEC EDGAR (财报) / Finnhub (新闻+基本面) / Tradier (期权链)
- **AI/ML**: XGBoost + LightGBM + Transformer + LSTM（PyTorch + Scikit-Learn）
- **部署**: Docker + Kubernetes + Zeabur
- **工程规范**: Clean Architecture + DDD + SOLID + Type Safety + Unit/Integration Testing + CI/CD

## 当前状态

[ ] 未开始 / [x] 进行中（产品定义 + 设计规范已定，**待 PM 启动实施**）/ [ ] 已上线 / [ ] 暂停 / [ ] 已归档

**详细状态**：
- ✅ 产品定位 + 功能模块设计（AlphaPilot.md 834 行）
- ✅ 前端 UI 设计规范（AlphaPilot_Design.md 483 行）
- ✅ L3 PM session 启动中（**2026-06-05 老板拍板**）
- ⏳ 域名切换：qubix.api-tokenmaster.com → alphapilot.api-tokenmaster.com（**等老板改 DNS + Zeabur 域名配置**）
- ⏳ MVP 范围 / 技术栈最终选型 / 优先级（**等老板拍板**）
- ⏳ 代码仓库（**没建**，等 PM 启动后开干）
- ⏳ AI 模型（**没训**，等数据源 + 训练 pipeline 决策）

## 上次更新

2026-06-05 12:57（**老板 L1 拍板: B 激进 2 周 demo,领航已接新时间表**）

## 当前负责人

- **Session**: mvs_<新建 ID>（**领航-PM-AlphaPilot**）
- **角色**: L3 PM（领航）— 整个 AlphaPilot 产品的项目总经理
- **上级**: L2 CEO 麦麦总（mvs_0f65177fc3024af1bb278146e8ff1405）
- **状态**: 接入中（2026-06-05 刚拍板建 session，第一周交付物待出）
- **最后活动**: 2026-06-05

## 团队花名册

- **L3 PM**:
  - 领航（总 PM，待建 session）— 整个产品规划 / 拍板材料准备 / 跨模块协调
- **L4 全局员工**（可随时调度，跨项目）:
  - 时妹 (scheduler) — 定时巡检 / 定时任务
  - 小桥 (im-bridge) — 飞书通知 / IM 桥接
  - 建哥 (team-builder) — 团队组建
  - 匠叔 (skill-crafter) — skill 创作
  - 启明 (self-improver) — 沉淀经验
  - 销妹 (marketing-promoter) — 营销方案（**等 M1 上线前不需要**）
- **L5 项目员工**: ⏳ **PM 启动后按需建**
  - `alphapilot-coder` (AlphaPilot 码哥) — 前后端开发
  - `alphapilot-reviewer` (AlphaPilot 审官) — 代码审查 / 安全审计
  - `alphapilot-tester` (AlphaPilot 测手) — 单元/集成/E2E 测试
  - `alphapilot-quant` (AlphaPilot 算神) — AI 模型 / 量化研究（项目专属，**AlphaPilot 独有**）
  - `alphapilot-marketer` (AlphaPilot 广哥) — 上线后再建（M1 之后）

## 域名 & 部署

- **目标域名**: `alphapilot.api-tokenmaster.com`（原 `qubix.api-tokenmaster.com`）
- **服务器**: Zeabur（与 TokenMaster 母平台同源）
- **DNS 切换**: ⏳ **等老板改**（CEO 麦麦总没服务器权限）
- **301 重定向**: 建议老域名同步加 301 跳新域名（保 SEO + 用户习惯）

## 不满意点

- ❌ **MVP 范围未拍板** — 9 个微服务 + 14 张表 + N 个 AI 模型，**全做不现实**，必须分阶段
- ❌ **数据源未最终拍板** — 已锁定美股池，候选: Polygon.io (主) / Alpha Vantage (备) / IEX Cloud (备) / SEC EDGAR (财报) / Tradier (期权)，待老板拍主备
- ❌ **AI 模型未选型** — XGBoost / LightGBM / Transformer / LSTM 哪个主推？训练数据从哪来？
- ❌ **商业模式未定** — 订阅 / 按量 / 免费增值？面向美国用户（USD 定价）
- ❌ **合规边界未划** — FINRA / SEC 投顾合规 + 不向中国用户开放 + 文案规避"guaranteed profit"红线

## 下一步

### PM 第一周交付物（领航上任必出）

- [ ] **W1 启动报告** `LAUNCH-REPORT.md` — 项目现状 / 团队花名册 / 资源盘点 / 风险清单
- [ ] **W1 拍板材料** `DECISIONS-v1.md` — 5 个必拍点（见下表）
- [ ] **W1 Phase 拆解** `PHASE-PLAN-v1.md` — MVP / V1 / V2 三阶段拆解 + 交付物
- [ ] **W1 项目骨架** `.harness/` — 项目级 reins 目录 + 4 个 rein agent 描述（coder/reviewer/tester/quant）
- [ ] **W1 仓库初始化** — 选 Monorepo / 多仓 + 建 README + 跑通 hello world（**等老板拍板技术选型后**）

### 老板 L1 必拍点（PM 准备好材料后回报）

**市场硬约束（已锁，老板 2026-06-05 拍板）**：
- ✅ 覆盖：**美股 + 美股 ETF + 美股期权**（NYSE / NASDAQ / AMEX）
- ❌ **不进入中国大陆市场**（合规 + 投顾红线）
- ❌ 不涉港股 / A 股 / 其他海外市场
- ✅ 营销 + 支付 + 服务：**全美**

**待拍 7 点**：

| # | 拍板点 | 候选 | 领航建议（PM 出材料） | 状态 |
|---|---|---|---|---|
| 1 | **MVP 范围** | A 单体先跑通 3 大模块 / B 3 个微服务最小集 / C 全栈 demo | A (领航推荐) | ✅ **已拍(2026-06-05 12:39,老板 L1 全 A 推)** |
| 2 | **技术栈最终选型** | A Next.js 15 + FastAPI + PostgreSQL / B Django + React / C Go + React | A (沿用产品定义) | ✅ **已拍** |
| 3 | **美股数据源主备** | A Polygon 主 + Alpha 备 + Tradier 期权 / B 全 IEX / C 其他 | A | ✅ **已拍** |
| 4 | **首期股票池** | A SP500 全 / B NASDAQ100 / C 自定义 Top 50 | A | ✅ **已拍** |
| 5 | **商业模式** | A 订阅 $29/$99/$299 三档 / B 按量 / C 免费增值 | A | ✅ **已拍** |
| 6 | **联运 TokenMaster** | 弱关联（避免合规串味） | 弱关联 | 🟡 待拍(老板未定) |
| 7 | **优先级** | 合规 > 质量 > 速度 | 合规优先 | 🟡 待拍(老板未定) |

### 老板 L1 操作项（CEO 麦麦总做不了）

- [x] **改 DNS**：qubix.api-tokenmaster.com → alphapilot.api-tokenmaster.com（**2026-06-05 12:46 老板改好**,记录 Alpha Pilot,等解析生效 5-30 分钟）
- [ ] **Zeabur 域名配置切换**（**领航出"老板照着做"操作指南**,W2 周五交付）
- [ ] **老域名加 301 跳新域名** → ❌ **老板拍板: 不做**(老域名没部署过任何东西,无 SEO/老用户包袱,省事)
- [ ] **支付通道**: ⏸️ **老板拍板: 延后讨论**（倾向 PayPal 或加密货币,等 W2 代码出来再议 3 选 1: Stripe / PayPal / 加密）
- [ ] 决定是否用 TokenMaster 母平台账号体系（SSO / 独立 / OAuth）

## 完成度评估

- **产品定义**: 95%（AlphaPilot.md 写得非常完整，AI 主力意图系统、决策卡、证据链、风险系统、回测全有）
- **设计规范**: 95%（AlphaPilot_Design.md 483 行，色板/字体/组件/页面结构齐）
- **MVP 代码**: 0%（**没开工**）
- **AI 模型**: 0%（**没训**）
- **数据接入**: 0%
- **测试 / 部署 / 上线**: 0%
- **整体上线就绪度**: 5%（产品文档化已完成，工程化零起步）

## 阻塞

- ⏳ **域名切换未完成**（老板改 DNS + Zeabur 配置）
- ⏳ **MVP 范围未拍板**（领航 PM 准备 W1 拍板材料，老板拍）
- ⏳ **数据源未选型**（领航 PM 准备成本对比，老板拍）
- ⏳ **商业模式未拍板**（领航 PM 准备 3 套方案对比，老板拍）
- ❌ 当前无活跃 L5 实施者（PM 启动后建 reins）

## 备注

- **改名历史**: 2026-06-05 由 Qubix 改名为 AlphaPilot + 换域名 qubix → alphapilot（老板拍板）
- **品牌**: AlphaPilot（"领航"花名取自此，Alpha 谐音"领航"）
- **与 TokenMaster 关系**: 寄生在母平台下（api-tokenmaster.com 子域名），但**产品完全独立**（避免投顾合规串味）
- **核心命名建议**: 
  - L3 总 PM = **领航**（AI 决策指挥感）
  - L3 技术 sub-PM = **智舰**（AI 引擎感，**等拆**）
  - L3 营销 sub-PM = **广哥**（**M1 之后再建**）
  - L5 coder = **AlphaPilot 码哥**
  - L5 reviewer = **AlphaPilot 审官**
  - L5 tester = **AlphaPilot 测手**
  - L5 quant = **AlphaPilot 算神**（**AlphaPilot 独有**，因为要做 AI 模型）
  - L5 marketer = **AlphaPilot 广哥**（上线后）
- **与 RoadMap 对比**: RoadMap 是赌博预测（已上线 + Phase 3 启动中），AlphaPilot 是股票预测（产品定义齐，工程零起步）— **两个项目可以共享前后端技术栈经验**（FastAPI + Next.js 类似）
- **关键风险提示**:
  - **投顾合规红线 (FINRA/SEC)**：不能给"买卖建议"，只能给"概率 + 证据 + 风险"
  - **数据成本**: Polygon.io 实时美股行情 ≈ $99-$999/月（看档位），Tradier 期权链 ≈ $10-$50/月
  - **AI 模型需要持续训练**（美股数据漂移 + 风格切换比 A 股更频繁）
  - **用户期望管理**（"AI 选股"在用户眼里 = "稳赚"，**产品文案必须避免**）
  - **不进入中国市场**的合规好处：避开中国投顾监管 + 境内数据出境 + 跨境支付三重雷区

## 子任务状态

- [x] 产品定义 (AlphaPilot.md)
- [x] 设计规范 (AlphaPilot_Design.md)
- [x] 老板拍板改名 + 换域名
- [x] L3 PM session 启动（领航上任）
- [ ] L3 PM 第一周交付物
- [ ] 老板 L1 拍板 MVP 范围 / 技术选型 / 数据源
- [ ] DNS + Zeabur 域名切换
- [ ] 项目仓库初始化
- [ ] .harness/reins/ 项目骨架
- [ ] 4 个 L5 reins 建 agent
- [ ] 第一个 hello world
- [ ] MVP 上线（暂定 2-3 个月后）
