# AlphaPilot AI 智能股票决策平台（AI开发总指令 V3.0）

---

# 项目名称

**AlphaPilot**

AI-Powered Stock Intelligence & Trading Decision Platform

---

# 项目目标

开发一套专业级 AI 股票决策平台。

AlphaPilot 不是传统行情软件，也不是简单选股工具。

核心目标：

> 利用 AI 对市场数据进行理解、推理、评分和解释，帮助用户发现机会、识别主力意图、制定交易计划并控制风险。

系统重点不在于预测绝对价格，而在于：

* 机会发现
* 主力行为识别
* 概率分析
* 风险评估
* 交易决策辅助

所有结论必须具备：

* 概率
* 置信度
* 证据链
* 风险提示
* 失效条件

---

# 技术架构

## 前端

```yaml
Framework:
  - Next.js 15
  - React 19
  - TypeScript

UI:
  - TailwindCSS
  - shadcn/ui
  - Framer Motion

Chart:
  - TradingView Lightweight Chart
  - Recharts

State:
  - Zustand
  - React Query

Auth:
  - JWT
  - OAuth
```

---

## 后端

```yaml
Framework:
  - FastAPI

Architecture:
  - Microservice

Services:
  - market-service
  - indicator-service
  - capitalflow-service
  - chip-service
  - sentiment-service
  - prediction-service
  - strategy-service
  - risk-service
  - screener-service

Communication:
  - REST API
  - WebSocket
  - Redis Queue
```

---

## 数据库

```yaml
PostgreSQL

Tables:

stocks
quotes
kline
capital_flow
chip_distribution
financial_reports
news
signals
predictions
strategies
risk_events
users
watchlists
backtests
```

---

## 缓存

```yaml
Redis

用途：

实时行情缓存
AI结果缓存
热点股票缓存
排行榜缓存
```

---

## AI模型

```yaml
Machine Learning

XGBoost
LightGBM

Deep Learning

Transformer
LSTM

Framework

PyTorch
Scikit-Learn
```

---

# 系统总体架构

```text
Market Data Layer
        ↓
Feature Engineering Layer
        ↓
Signal Analysis Layer
        ↓
AI Reasoning Layer
        ↓
Main Force Intention Engine
        ↓
Prediction Engine
        ↓
Decision Engine
        ↓
Risk Engine
        ↓
API Layer
        ↓
Frontend UI
```

---

# 模块一：行情数据中心

## 功能

支持：

```yaml
A股
港股
美股
```

周期：

```yaml
1m
5m
15m
30m
60m
1d
1w
1M
```

实时更新：

```yaml
WebSocket
```

输出统一数据格式：

```json
{
  "symbol":"AAPL",
  "timestamp":"2026-06-05",
  "open":201.1,
  "high":205.4,
  "low":198.5,
  "close":204.7,
  "volume":18293743
}
```

---

# 模块二：技术分析引擎

计算：

```yaml
MA
EMA
MACD
RSI
ADX
BOLL
ATR
KDJ
VWAP
```

输出：

```json
{
  "trend_score":84,
  "trend_direction":"bullish",
  "trend_strength":"strong"
}
```

评分范围：

```yaml
0-100
```

---

# 模块三：量价行为引擎

识别：

```yaml
Volume Breakout
Volume Divergence
Price Compression
Momentum Expansion
```

分析：

```yaml
放量突破
缩量回调
放量滞涨
量价背离
```

输出：

```json
{
  "momentum_score":78,
  "pattern":"volume_breakout"
}
```

---

# 模块四：筹码结构引擎

分析：

```yaml
成本分布
获利盘
套牢盘
筹码集中度
```

输出：

```json
{
  "control_score":82,
  "profit_ratio":67,
  "trap_ratio":33
}
```

---

# 模块五：资金流引擎

分析：

```yaml
Super Order
Institutional Flow
Northbound Flow
Continuous Inflow
```

输出：

```json
{
  "capital_score":88,
  "net_inflow":125000000,
  "inflow_days":6
}
```

---

# 模块六：市场情绪引擎

数据来源：

```yaml
News
Announcements
Research Reports
Social Media
```

AI分析：

```yaml
Sentiment Classification
Event Impact Analysis
```

输出：

```json
{
  "sentiment_score":76,
  "sentiment":"positive"
}
```

---

# 核心模块：AI主力意图识别系统

## 目标

判断主力当前所处阶段。

阶段：

```yaml
吸筹
洗盘
拉升
出货
二次吸筹
诱多
诱空
```

输出：

```json
{
  "accumulation":82,
  "washout":18,
  "markup":61,
  "distribution":9,
  "reaccumulation":48,
  "bull_trap":7,
  "bear_trap":12
}
```

---

## 主力意图雷达图

前端必须生成：

```yaml
Radar Chart
```

展示：

```yaml
吸筹概率
洗盘概率
拉升概率
出货概率
诱多概率
诱空概率
```

---

# K线行为识别系统

识别：

```yaml
Hammer
Engulfing
Morning Star
Evening Star
Three White Soldiers
Doji
Dark Cloud Cover
```

输出：

```json
{
  "pattern":"hammer",
  "reversal_probability":73
}
```

---

# 多周期共振分析引擎

同时分析：

```yaml
5m
15m
30m
60m
Daily
Weekly
```

输出：

```json
{
  "alignment_score":85,
  "conclusion":"Potential Markup Phase"
}
```

---

# AI预测引擎

注意：

不要输出绝对价格预测。

采用：

```yaml
Scenario Forecast
```

输出未来：

```yaml
1天
3天
5天
```

上涨概率：

```json
{
  "1d_up_probability":71,
  "3d_up_probability":78,
  "5d_up_probability":74
}
```

同时输出：

```json
{
  "confidence":86
}
```

---

# AI选股系统

点击：

```yaml
Start Scan
```

扫描：

```yaml
5000+
Stocks
```

排序依据：

```yaml
Opportunity Score
```

输出：

```json
{
  "symbol":"TSLA",
  "score":93,
  "up_probability":78,
  "risk":"medium"
}
```

返回：

```yaml
Top 20
Top 50
Top 100
```

---

# 核心模块：AI交易决策卡

每支股票自动生成：

```json
{
  "symbol":"TSLA",
  "score":92,
  "confidence":86,
  "up_probability":78,
  "risk":"medium",
  "main_force":"Accumulation",
  "next_action":"Markup",
  "buy_zone":[468,472],
  "stop_loss":458,
  "target_1":485,
  "target_2":498,
  "position_size":"20%"
}
```

---

# 决策解释系统（Explainable AI）

所有结论必须提供证据链。

例如：

```json
{
  "reasoning":[
    "MACD Golden Cross",
    "6 Days Capital Inflow",
    "Chip Concentration Rising",
    "Daily + Weekly Alignment"
  ]
}
```

---

# 风险控制系统

检测：

```yaml
Earnings Risk
Unlock Risk
Gap Risk
High Volatility
Black Swan Event
```

输出：

```json
{
  "risk_level":"medium",
  "risk_score":34,
  "warning":"Earnings report within 48 hours"
}
```

---

# AI复盘系统

记录：

```yaml
Entry
Exit
Profit
Loss
Decision Reason
```

自动生成：

```yaml
Winning Factors
Failure Factors
```

---

# 回测系统

支持：

```yaml
Strategy Backtest
Signal Backtest
Model Backtest
```

指标：

```yaml
Win Rate
Profit Factor
Sharpe Ratio
Max Drawdown
Annual Return
```

---

# 市场状态识别系统

识别：

```yaml
Bull Market
Bear Market
Sideways Market
High Volatility Market
```

自动切换：

```yaml
Model Weight
Signal Threshold
Risk Parameter
```

---

# API设计

必须使用：

```yaml
REST
WebSocket
```

示例：

```text
GET /api/stock/{symbol}

GET /api/screener/top

GET /api/intention/{symbol}

GET /api/decision/{symbol}

GET /api/risk/{symbol}

GET /api/backtest/{symbol}
```

---

# 前端页面

## Dashboard

模块：

```yaml
今日最佳机会
主力异动榜
热门板块
未来高胜率股票
```

---

## Stock Detail

模块：

```yaml
TradingView Chart
AI交易决策卡
主力意图雷达图
证据链
风险分析
多周期共振
```

---

## AI Screener

模块：

```yaml
Top Opportunities
Filters
Ranking
```

---

## Backtest Center

模块：

```yaml
策略回测
模型回测
信号回测
```

---

# AI开发要求

必须遵循：

```yaml
Clean Architecture
DDD
SOLID
Type Safety
Unit Testing
Integration Testing
CI/CD
Docker
Kubernetes
```

代码要求：

```yaml
Production Ready
Modular
Scalable
Maintainable
```

---

# 关键产品原则

禁止：

```yaml
保证盈利
保证上涨
精准预测价格
```

必须：

```yaml
概率输出
证据链解释
风险提示
置信度评分
```

---

# 最终目标

构建一个面向专业投资者和高频决策用户的 AI 股票决策平台。

核心竞争力：

1. AI主力意图识别系统
2. AI交易决策卡
3. 多周期共振分析
4. Explainable AI 证据链
5. 风险优先决策框架

最终让用户获得：

> 发现机会 → 理解逻辑 → 控制风险 → 制定计划 → 持续复盘优化

而不是单纯看到一堆指标和K线。
