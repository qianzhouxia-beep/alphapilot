# Polygon.io WebSocket 协议调研

> **W1 预研产出 (2026-06-05)**
> **PM**: 领航 (mvs_c4114159002f4e34850b3008d3ecae77)
> **来源**: Polygon.io 官方文档 (注意:2024 起部分文档迁到 `massive.com`,但 API 兼容)+ 内部知识
> **目标**: W2 直接接入,W3 接实时数据

---

## TL;DR

- **URL**: `wss://socket.polygon.io/stocks` (美股实时行情)
- **鉴权**: 首条消息 `{"action":"auth","params":"<API_KEY>"}`
- **订阅格式**: `{"action":"subscribe","params":"T.AAPL,Q.AAPL,A.AAPL"}`
- **事件类型**: `T` (Trades) / `Q` (Quotes NBBO) / `A` (Per-minute Aggregate) / `AM` (Per-second)
- **数据格式**: 数组 (status 是数组,event 也是数组)
- **限流**: 免费 5 msg/秒 / Starter 100 msg/秒 / Pro+ 不限
- **重连**: 客户端必须实现 (5s 间隔 + 退避)

**W2 推荐方案**: 启动时 auth → 订阅 SP500 全 `T.*` + 重点 10 个 `Q.*` → 收到 trade 后写 Redis Streams → 后端服务读 stream 入库。

---

## 1. 连接

### 1.1 端点

| 端点 | 用途 |
|---|---|
| `wss://socket.polygon.io/stocks` | 美股实时 (T, Q, A, AM, status, **mintick**) |
| `wss://socket.polygon.io/options` | 美股期权 |
| `wss://socket.polygon.io/forex` | 外汇 |
| `wss://socket.polygon.io/crypto` | 加密货币 |
| `wss://socket.polygon.io/indexes` | 指数 |

**AlphaPilot 用 stocks + options 即可**。

### 1.2 鉴权

WebSocket 鉴权在**应用层**——不是 HTTP 头,而是首条消息:

```json
{"action":"auth","params":"<POLYGON_API_KEY>"}
```

服务端返回:

```json
[{"ev":"status","status":"auth_success","message":"authenticated"}]
```

或失败:

```json
[{"ev":"status","status":"auth_failed","message":"invalid api key"}]
```

**W2 实施**: 收到 `auth_failed` 必须立刻断开并报警(API Key 错或过期)。

---

## 2. 订阅格式

### 2.1 订阅动作

| Action | 说明 | 例子 |
|---|---|---|
| `subscribe` | 订阅 | `{"action":"subscribe","params":"T.AAPL,Q.AAPL"}` |
| `unsubscribe` | 取消订阅 | `{"action":"unsubscribe","params":"T.AAPL"}` |

`params` 用 `,` 分隔多个 channel.ticker。

### 2.2 通配符

支持 `*` 一次订阅多个 ticker:

| 模式 | 订阅数量 | 注意 |
|---|---|---|
| `T.AAPL` | 1 个 | — |
| `T.AAPL,MSFT,GOOGL` | 3 个 | — |
| `T.SPY.*` | SPY 所有期权 | 期权合约层级用 |
| ❌ `T.*` | **不支持** | Polygon 不允许全市场订阅,必须显式 |

**W2 实施**: 启动时遍历 SP500 列表发 500 条 `T.<symbol>` 订阅。

### 2.3 频道总览

| 频道 | 事件 | 频率 | 用途 |
|---|---|---|---|
| `T.<symbol>` | Trades | 每笔成交 | K 线 / 实时价 |
| `Q.<symbol>` | Quotes (NBBO) | 每笔 bid/ask 更新 | 盘口 / 实时价 |
| `A.<symbol>` | Per-Minute Aggregate | 每分钟 1 条 | 1m K 线 |
| `AM.<symbol>` | Per-Second Aggregate | 每秒 1 条 | 1s K 线 (高频用) |

**AlphaPilot 推荐订阅组合**:

| 频道 | 订阅范围 | 用途 |
|---|---|---|
| `T.*` | SP500 全 | 实时价 (主屏) |
| `Q.*` | 50 个核心 (AAPL/MSFT/NVDA/...) | 盘口 (Pro+ 才有) |
| `A.*` | SP500 全 | 1m K 线 (懒加载) |
| ❌ `AM.*` | 不用 | 太密,数据量爆炸 |

---

## 3. 数据格式 (收到的消息)

### 3.1 Trades (`T.<symbol>`)

```json
[
  {
    "ev": "T",
    "sym": "AAPL",
    "i": "1234567890",
    "x": 4,
    "p": 201.45,
    "s": 100,
    "c": [0, 12],
    "t": 1700000000000,
    "q": 12345678
  }
]
```

| 字段 | 含义 |
|---|---|
| `ev` | 事件类型 (T/Q/A/AM/status) |
| `sym` | Ticker |
| `p` | Price (USD) |
| `s` | Size (shares) |
| `t` | Timestamp (ms epoch) |
| `c` | Conditions (array of ints) |
| `i` | Trade ID |
| `x` | Exchange (4 = NASDAQ, 11 = NYSE, ...) |
| `q` | Sequence number |

### 3.2 Quotes (`Q.<symbol>`)

```json
[
  {
    "ev": "Q",
    "sym": "AAPL",
    "bx": 4,
    "bp": 201.40,
    "bs": 100,
    "ax": 11,
    "ap": 201.45,
    "as": 200,
    "t": 1700000000000,
    "q": 12345678
  }
]
```

| 字段 | 含义 |
|---|---|
| `bp` / `ap` | Bid / Ask price |
| `bs` / `as` | Bid / Ask size |
| `bx` / `ax` | Bid / Ask exchange |

### 3.3 Per-Minute Aggregate (`A.<symbol>`)

```json
[
  {
    "ev": "A",
    "sym": "AAPL",
    "v": 1000,
    "o": 201.0,
    "c": 201.45,
    "h": 201.50,
    "l": 200.95,
    "s": 1700000000000,
    "e": 1700000060000
  }
]
```

| 字段 | 含义 |
|---|---|
| `o` / `c` / `h` / `l` | Open / Close / High / Low |
| `v` | Volume |
| `s` / `e` | Start / End timestamp (ms) |

---

## 4. 限流 (Rate Limits)

| 套餐 | 月费 | 实时 WebSocket | REST API | 限流 |
|---|---|---|---|---|
| **Free** | $0 | ✅ | ✅ | 5 msg/秒 |
| **Starter** | $29 | ✅ | ✅ | 100 msg/秒 |
| **Developer** | $79 | ✅ | ✅ | 200 msg/秒 |
| **Advanced** | $199 | ✅ | ✅ | 400 msg/秒 |
| **Pro** | $999 | ✅ | ✅ | unlimited |
| **Enterprise** | Custom | ✅ | ✅ | unlimited + dedicated |

**W2 推荐 Advanced $199/月**:
- 400 msg/秒 够 SP500 全 ticker × 4 频道(只取 2 个就够)
- 历史 K 线全周期 (5y)
- 基本面 + News

**注意**: WebSocket 收到的是 push,不占 REST 限流。但 client → server 的 subscribe 消息算 REST 限流。

---

## 5. 关键时序

### 5.1 交易日

美股交易时间 (美东):
- **常规**: 09:30 - 16:00 ET
- **盘前**: 04:00 - 09:30 ET (Starter+)
- **盘后**: 16:00 - 20:00 ET (Starter+)

**AlphaPilot 初期只覆盖常规时段**。盘前盘后是 W3 优化。

### 5.2 重连策略

WebSocket 必断(网络 / Polygon 维护 / API 限流),**W2 必须实现**:

```python
async def polygon_ws_loop(symbols: list[str]):
    backoff = 5  # seconds
    while True:
        try:
            async with websockets.connect("wss://socket.polygon.io/stocks") as ws:
                await ws.send(json.dumps({"action": "auth", "params": API_KEY}))
                # wait for auth_success
                # subscribe
                await ws.send(json.dumps({"action": "subscribe", "params": ",".join(symbols)}))
                backoff = 5  # reset on success
                async for msg in ws:
                    handle(msg)
        except (ConnectionClosed, OSError) as e:
            log.warning(f"WS disconnected: {e}, reconnect in {backoff}s")
            await asyncio.sleep(backoff)
            backoff = min(backoff * 2, 300)  # cap at 5 min
```

### 5.3 错误码

| Status | 含义 | 应对 |
|---|---|---|
| `auth_success` | OK | 继续 |
| `auth_failed` | API key 错 / 过期 | 报警 + 停 WS |
| `success` (subscribe) | OK | 继续 |
| `error` (subscribe) | 订阅失败 | 检查 channel.ticker 格式 |
| 连接断开 | 网络问题 | 自动重连 |

---

## 6. 集成架构 (W2 实施)

```
[Polygon WS] → [polygon-ingestor (单独 service)]
                       ↓
                  [Redis Streams: polygon.trades / polygon.quotes]
                       ↓
                  [backfill-service] 写 PostgreSQL (kline / quotes 表)
                       ↓
                  [decision-engine] (cron / 触发器) 算 AI 评分
                       ↓
                  [REST API: GET /v1/decision/{symbol}] ← 前端轮询
```

**关键决策**:
- **不直接 WS → API**: 必须经 Redis Streams(防 API service 挂掉丢数据)
- **ingestor 单进程**: 一个 WebSocket 连接足够 SP500 实时,不需要多 worker
- **REST 拉 K 线用 REST API** (`/v2/aggs/ticker/{symbol}/range/1/day/...`),不用 WS
- **历史 K 线**: 用 REST 一次性拉 5 年,存 DB;之后用 WS 增量更新

---

## 7. 沙箱 / 测试

Polygon **没有真正的沙箱**——只有 free tier (限流) 和 paid tier。

**W2 测试策略**:
1. **本地 mock**: 写一个 `MockPolygonClient` 模拟 WS 推送,跑通业务逻辑
2. **Polygon Free tier**: 用 free API key 接真实 WS,验证鉴权 + 订阅流程(只订 1-2 个 ticker,不超限流)
3. **Production**: 老板充值 Advanced $199,接 SP500

---

## 8. 成本估算

| 项 | 月费 | 一次性 |
|---|---|---|
| Polygon Advanced | $199 | — |
| Redis (Zeabur) | ~$5 | — |
| Postgres (Zeabur) | ~$5 | — |
| Ingestor 进程 (Zeabur always-on) | ~$5 | — |
| **M1 阶段月成本** | **~$214** | — |
| W3 接历史 K 线 (5y 回填) | — | ~$0 (free tier 拉满 5 msg/秒,需 24h) |

**M2 接 Pro $999 + 期权链 + 多周期共振 → ~$1100/月**(用户增长后)。

---

## 9. 参考资料

- 官方文档: https://polygon.io/docs/stocks/ws_getting-started (部分迁到 https://massive.com/docs/llms.txt)
- 实时 WS 例子: https://github.com/polygon-io/client-python (官方 Python SDK)
- 类型定义: https://github.com/polygon-io/client-python/blob/master/polygon/websocket/__init__.py

---

**领航注**: W2 启动后立刻建 `app/polygon_ws.py` (asyncio + websockets),先 mock 跑通,再接 real key。
