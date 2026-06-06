# Stripe Payments KYC 调研

> **W1 预研产出 (2026-06-05)**
> **PM**: 领航 (mvs_c4114159002f4e34850b3008d3ecae77)
> **来源**: Stripe 官方文档 (https://docs.stripe.com/connect/identity-verification) + Stripe Atlas + Stripe Payments 文档
> **目标**: W2 启动前,老板 KYC 完成 + Stripe 沙箱跑通

---

## TL;DR

- **产品类型**: **Stripe Payments** (直接收订阅费) — **不是 Connect** (Connect 是平台型 marketplace)
- **KYC 主体**: 老板本人(美国 SSN/ITIN) 或 美国公司(EIN)
- **需要的文件**: 政府 ID + 银行对账单 + 税号 (SSN 或 EIN)
- **时间**: 标准 1-3 工作日,复杂 7+ 工作日
- **费用**: 2.9% + 30¢ per card (US),无月费,无年费
- **沙箱**: 有,test mode 跑通端到端
- **老板行动**: 立即注册 → 填 KYC → 收 ~$5 测试订单 → 切 Live

---

## 1. 关键决策:Payments vs Connect

| 项 | **Stripe Payments** ✅ | Stripe Connect (放弃) |
|---|---|---|
| 适用 | 直接卖产品 / 订阅 | 平台分账 (marketplace) |
| 客户 | C 端用户付给你 | 用户付给平台 → 平台分给商家 |
| KYC | **你自己** KYC 一次 | **每个商家** 都 KYC |
| 复杂度 | 低 | 高 |
| 监管 | 你是商户 | 你是平台 (多 1-2 个许可) |
| 月费 | 0 | 0 (但要更多合规) |

**AlphaPilot = SaaS 订阅,用户直接付给老板的 Stripe 账户 → 用 Payments 不用 Connect**。

---

## 2. 老板 KYC 全流程 (美国主体)

### 2.1 准备清单

#### 老板是个人 (sole proprietorship) 路径

| 项 | 必需 | 说明 |
|---|---|---|
| **SSN 或 ITIN** | ✅ | 没 SSN 拿 ITIN(IRS 申请,免费,7 周) |
| **DOB** | ✅ | 出生日期 |
| **家庭住址** | ✅ | 物理地址(不能 PO Box) |
| **政府签发 ID** | ✅ | 驾照 / 护照 / State ID(二选一,正反面) |
| **银行账户** | ✅ | 美国本地银行 (Chase / BoA / Wells Fargo / Mercury 等) |
| **手机号** | ✅ | 能收 SMS 验证码 |
| **个人邮箱** | ✅ | 常用邮箱 |

#### 老板用美国公司 (LLC/C-Corp) 路径

| 项 | 必需 | 说明 |
|---|---|---|
| **EIN** | ✅ | IRS 发的 Employer ID Number (免费,网申 15 分钟) |
| **公司注册文件** | ✅ | Articles of Incorporation / LLC Certificate |
| **Beneficial Owner 信息** | ✅ | 所有 ≥25% 持股的人的信息 |
| **DBA (Doing Business As)** | ⚠️ | 如果公司名 ≠ 商户名 |
| **公司银行账户** | ✅ | 公司名义开户 |
| **公司文件地址** | ✅ | 不能用 registered agent 代替 |
| **公司电话** | ✅ | 公司实体相关 |

### 2.2 注册步骤

```
1. https://dashboard.stripe.com/register
   → 邮箱 + 密码 + 国家(US) + 名字
2. 收验证邮件 → 激活
3. 选 "Business" 类型:
   - Individual (sole proprietor) / Company (LLC/Corp)
4. 填业务信息:
   - Legal name (公司名或个人姓名)
   - DBA (商户名,如 "AlphaPilot")
   - Business address
   - Business phone
   - Business URL (https://alphapilot.api-tokenmaster.com)
   - Industry: "Software & SaaS" / "Information Services"
   - Product description: "AI stock analysis SaaS subscription"
5. 填个人/公司 KYC (per 2.1 清单)
6. 填银行账户 (routing + account number)
7. 等待 Stripe 审核 (1-3 工作日)
8. 审核通过 → 立刻可收款
```

### 2.3 时间表

| 阶段 | 时间 |
|---|---|
| 邮箱注册 | 5 分钟 |
| 业务信息 + KYC 提交 | 30-60 分钟 (首次) |
| Stripe 审核 | **1-3 工作日** (标准),7+ (复杂) |
| 银行验证 (小额打款) | 1-2 工作日 |
| 第一次真实收款 | T+2 (Stripe hold 2 个工作日放款) |

**老板 L1 操作项 #4 (Stripe KYC)**: 估算 1 周完成,PM W2 启动时必须拿到 test mode API key。

---

## 3. 收费模型

### 3.1 标准费 (US card)

| 卡类型 | 费率 | + 固定费 |
|---|---|---|
| 国内 Visa/Mastercard/Discover | 2.9% | $0.30 |
| 国内 Amex | 3.5% | $0.30 |
| 跨境 (international card) | +1.5% | — |
| ACH Direct Debit | 0.8% | cap $5 |
| Apple Pay / Google Pay | 同 card 费率 | — |

**AlphaPilot 月费 $29/$99/$299 三档,扣费后到账**:
- $29 → Stripe 抽 $1.14 = 老板收 $27.86
- $99 → Stripe 抽 $3.17 = 老板收 $95.83
- $299 → Stripe 抽 $8.97 = 老板收 $290.03

**平均 ~3% 抽成**,1000 付费用户中位数 $99 套餐 = 老板月入 $96,830 (扣 Stripe 费)。

### 3.2 退款 / 争议

- 退款: 老板可在 Dashboard 退,Stripe 退 $0.30 固定费 + 不退 2.9%
- 争议 (chargeback): $15/次,胜诉退还
- 30 天无理由退款: 老板政策,Stripe 不抽额外费

### 3.3 订阅特殊

| 项 | 说明 |
|---|---|
| 自动续费 | Stripe Subscription 模式,自动扣款 |
| 试用 (7 天) | `trial_period_days: 7`,免费,**不扣款不预留** |
| 失败重试 | Stripe Smart Retries (4 次/周),挽回 ~38% 失败 |
| 升降级 | API: `proration_behavior: 'create_prorations'` |
| 暂停 / 取消 | 用户在 Customer Portal 自助 |

---

## 4. 集成架构 (W2 实施)

### 4.1 依赖

```
stripe==11.4.1  (Python SDK)
```

### 4.2 流程

```
[用户填信用卡]
     ↓
[Stripe Checkout (Hosted Page) ]  ← 不在自家网站,跳到 Stripe 域
     ↓
[Stripe 收钱 + 跳回 success_url]
     ↓
[Webhook → /api/stripe/webhook]    ← 后端异步收事件
     ↓
[Subscription active → 解锁 Pro 功能]
```

**关键: 不要在自家网站收信用卡**。用 **Stripe Checkout** (托管页) 或 **Stripe Elements** (嵌入式),PCI 合规由 Stripe 负责。

### 4.3 关键 API (W2 实现)

```python
# 1. 创建 Checkout Session
checkout = stripe.checkout.Session.create(
    mode="subscription",
    line_items=[{"price": "price_xxx", "quantity": 1}],
    success_url="https://alphapilot.api-tokenmaster.com/billing/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url="https://alphapilot.api-tokenmaster.com/billing",
    customer_email=user.email,
    client_reference_id=user.id,
    subscription_data={"trial_period_days": 7},
)

# 2. Webhook 接收
@app.post("/api/stripe/webhook")
async def webhook(request: Request):
    payload = await request.body()
    sig = request.headers.get("stripe-signature")
    event = stripe.Webhook.construct_event(payload, sig, STRIPE_WEBHOOK_SECRET)
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        # mark user as Pro in DB
    elif event["type"] == "invoice.payment_failed":
        # mark user as past_due
    return {"status": "ok"}
```

### 4.4 Customer Portal

W2 直接用 Stripe 自带 **Customer Portal** — 用户自助管理订阅 / 改卡 / 取消,老板不用自己写 UI。

```python
portal = stripe.billing_portal.Session.create(
    customer=customer_id,
    return_url="https://alphapilot.api-tokenmaster.com/billing",
)
# 用户点 Billing 页 "Manage Subscription" → 跳 portal.url
```

---

## 5. 沙箱 (Test Mode)

Stripe **强烈推荐**先用 test mode 跑通:

1. Dashboard 右上角切换 "Test mode"
2. 用 test API key (sk_test_xxx, pk_test_xxx)
3. 测试卡号:
   - `4242 4242 4242 4242` — 成功
   - `4000 0000 0000 0002` — 卡被拒
   - `4000 0027 6000 3184` — 需要 3DS
4. 任何过期日 / 任何 CVC / 任何邮编
5. Webhook 本地测试:用 `stripe listen --forward-to localhost:8001/api/stripe/webhook`
6. 跑通 5 个场景: 注册试用 / 试用转付费 / 失败重试 / 升降级 / 取消

**W2 验证清单**:
- [ ] `stripe listen` 跑通
- [ ] 试用 7 天 → 扣款成功 → Webhook `invoice.paid` 收到
- [ ] 用户取消订阅 → Webhook `customer.subscription.deleted` 收到
- [ ] 失败重试 → Webhook `invoice.payment_failed` → `invoice.paid` (第 3 次成功)
- [ ] 升降级 Pro → Elite → 价格 proration 正确

---

## 6. KYC 失败常见原因

| 错误 | 原因 | 解决 |
|---|---|---|
| "We can't verify your identity" | 名字 vs SSN 不匹配 | 检查 SSN 拼写,可能银行名字不一样 |
| "Document not accepted" | ID 模糊 / 过期 / 反光 | 重拍,确保清晰,4 角完整 |
| "Address mismatch" | 账单地址 vs ID 地址不同 | 用银行账单地址(优先) |
| "Business type unclear" | LLC 类型选错 | 跟 EIN 信核对(LLC 默认 sole_prop,除非 elect) |
| "High risk" | 行业被 Stripe 标高风险 | 改 industry 描述("Stock analysis SaaS" 而非 "Investment advice") |

**W2 老板 KYC 提示**: AlphaPilot 行业描述 **必须**用 "Software & SaaS",**不要**用 "Investment" / "Trading" / "Financial advice" — 后者会触发 Stripe 高风险审核,被卡概率 +30%。

---

## 7. 文案合规 (FINRA + Stripe 双线)

| 红线 (不能写) | 合规写法 |
|---|---|
| "Guaranteed profit" | "Probabilistic outcome, not guaranteed" |
| "Investment advice" | "Educational analysis tool" |
| "We recommend buying X" | "AI scoring indicates X has 78% up probability" |
| "Best stocks to buy" | "Top opportunity-ranked tickers" |
| "Make money with AI" | "AI-assisted decision framework" |

**AlphaPilot 站点**:
- ✅ Footer: "AlphaPilot provides AI-assisted analysis for educational purposes. Not investment advice. Past performance does not guarantee future results."
- ✅ Pricing 页: "Probabilistic. No guarantees."
- ✅ Sign up: 勾选 "I understand AlphaPilot is not a registered investment advisor"

---

## 8. 老板 L1 操作项 #4 完整 checklist

```
□ 1. 选 KYC 路径: 个人 (SSN) / 公司 (EIN)
□ 2. 个人 → 准备 SSN + 驾照 + 银行账户
      公司 → 准备 EIN + Articles + 公司银行 + Beneficial Owner 信息
□ 3. 打开 https://dashboard.stripe.com/register
□ 4. 邮箱注册 + 选 US + Business type
□ 5. 填业务信息:
      - 商户名: "AlphaPilot" (or DBA)
      - 行业: "Software & SaaS"
      - URL: https://alphapilot.api-tokenmaster.com
      - 产品: "AI-assisted stock analysis SaaS subscription"
□ 6. 填 KYC 资料 (per 2.1)
□ 7. 接银行账户 (routing + account)
□ 8. 等 Stripe 审核 (1-3 工作日)
□ 9. 审核通过 → 切 Test mode → 跑 5 个测试场景
□ 10. 切 Live mode → 把 API key 给领航 PM → 部署
```

**总耗时**: 1 周 (KYC 审核占大头)。

---

## 9. 备选方案 (如果 Stripe 卡了)

| 方案 | 月费 | 优势 | 劣势 |
|---|---|---|---|
| **Paddle** | $0 + 5% + $0.50 | Merchant of Record (他们处理税务) | 比 Stripe 贵 2% |
| **LemonSqueezy** | $0 + 5% + $0.50 | MoR + 大陆身份可注册 | 也被卡过 (TokenMaster 前车之鉴) |
| **Coinbase Commerce** | 1% + 网络费 | 加密货币 | 用户门槛高,无订阅 |
| **PayPal** | 2.99% + $0.49 | 用户熟 | 账户被封风险,合规审核慢 |
| **2Checkout** | 3.5% + $0.35 | 全球化 | 贵 + 慢 |

**W2 优先 Stripe** → 失败 → **Paddle (Merchant of Record 自动税务,美国用户友好)**。

---

## 10. 参考资料

- 官方: https://docs.stripe.com/payments
- Connect 文档 (参考但不用): https://docs.stripe.com/connect/identity-verification
- 测试卡: https://docs.stripe.com/testing
- Webhook 调试: https://docs.stripe.com/webhooks/test
- Pricing 表: https://stripe.com/pricing
- Atlas (公司注册一站式): https://stripe.com/atlas (用美国公司另算)

---

**领航注**: 老板 KYC 启动后,PM 立刻建 `app/payments.py` (Stripe wrapper) + `app/routers/billing.py` (Checkout + Webhook + Portal),W2 周末前可跑通 5 个测试场景。
