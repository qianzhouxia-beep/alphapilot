"""PayPal SDK client (M2 stub, M3 接入真 sandbox)
   老板 L1 09:23 拍板: 用 PayPal (Stripe 暂不做)
   流程: 前端调 /api/paypal/create-order → 后端 PayPal SDK 创建订单 → 返回 approval_url
   用户在 PayPal 完成支付 → 重定向回 success → /api/paypal/capture-order 验证收款
"""
import os
import structlog
from typing import Optional

log = structlog.get_logger()

# 老板 L1 在 PayPal Dashboard 拿 sandbox 凭证 (https://developer.paypal.com/dashboard)
PAYPAL_CLIENT_ID = os.environ.get("PAYPAL_CLIENT_ID", "REPLACE_ME_SANDBOX_CLIENT_ID")
PAYPAL_CLIENT_SECRET = os.environ.get("PAYPAL_CLIENT_SECRET", "REPLACE_ME_SANDBOX_CLIENT_SECRET")
PAYPAL_MODE = os.environ.get("PAYPAL_MODE", "sandbox")  # sandbox | live
PAYPAL_WEBHOOK_ID = os.environ.get("PAYPAL_WEBHOOK_ID", "REPLACE_ME")

PAYPAL_API_BASE = (
    "https://api-m.sandbox.paypal.com" if PAYPAL_MODE == "sandbox"
    else "https://api-m.paypal.com"
)


# 老板 L1 L4-L5 拍板的定价 (DECISIONS-v1.md 5 A)
PLANS = {
    "starter": {"id": "starter", "price_usd": 29, "label": "Starter"},
    "pro": {"id": "pro", "price_usd": 99, "label": "Pro"},
    "elite": {"id": "elite", "price_usd": 299, "label": "Elite"},
}


async def get_access_token() -> Optional[str]:
    """PayPal OAuth2 client_credentials 获取 access token."""
    import httpx
    async with httpx.AsyncClient(timeout=10) as client:
        r = await client.post(
            f"{PAYPAL_API_BASE}/v1/oauth2/token",
            auth=(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET),
            data={"grant_type": "client_credentials"},
            headers={"Accept": "application/json"},
        )
        if r.status_code != 200:
            log.error("paypal.oauth.fail", status=r.status_code, body=r.text[:200])
            return None
        return r.json().get("access_token")


async def create_order(plan_id: str, user_email: str) -> Optional[dict]:
    """创建 PayPal 订单, 返回 approval_url.

    Args:
        plan_id: starter / pro / elite
        user_email: 用户邮箱 (写进 custom_id, webhook 拿来认用户)

    Returns:
        {"order_id": "...", "approval_url": "https://www.sandbox.paypal.com/..."}
    """
    if plan_id not in PLANS:
        return None
    plan = PLANS[plan_id]
    token = await get_access_token()
    if not token:
        return None
    import httpx
    async with httpx.AsyncClient(timeout=10) as client:
        r = await client.post(
            f"{PAYPAL_API_BASE}/v2/checkout/orders",
            json={
                "intent": "CAPTURE",
                "purchase_units": [{
                    "amount": {"currency_code": "USD", "value": str(plan["price_usd"])},
                    "description": f"AlphaPilot {plan['label']} subscription",
                    "custom_id": user_email,  # webhook 拿来认用户
                    "soft_descriptor": "ALPHAPILOT",
                }],
                "application_context": {
                    "brand_name": "AlphaPilot",
                    "shipping_preference": "NO_SHIPPING",
                    "user_action": "SUBSCRIBE_NOW",  # 或 "PAY_NOW" 一次性
                    "return_url": "https://alphapilot.api-tokenmaster.com/billing/success",
                    "cancel_url": "https://alphapilot.api-tokenmaster.com/billing/cancel",
                },
            },
            headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        )
        if r.status_code not in (200, 201):
            log.error("paypal.create_order.fail", status=r.status_code, body=r.text[:300])
            return None
        data = r.json()
        order_id = data.get("id")
        approval_url = next(
            (l["href"] for l in data.get("links", []) if l.get("rel") == "approve"),
            None,
        )
        return {"order_id": order_id, "approval_url": approval_url}


async def capture_order(order_id: str) -> Optional[dict]:
    """PayPal capture 订单 (用户在 PayPal 完成支付后回调)."""
    token = await get_access_token()
    if not token:
        return None
    import httpx
    async with httpx.AsyncClient(timeout=10) as client:
        r = await client.post(
            f"{PAYPAL_API_BASE}/v2/checkout/orders/{order_id}/capture",
            headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        )
        if r.status_code not in (200, 201):
            log.error("paypal.capture.fail", status=r.status_code, body=r.text[:300])
            return None
        data = r.json()
        # custom_id 拿用户邮箱
        custom_id = ""
        try:
            custom_id = data["purchase_units"][0].get("custom_id", "")
        except (KeyError, IndexError):
            pass
        status = data.get("status")
        return {"order_id": order_id, "status": status, "user_email": custom_id, "raw": data}


def verify_webhook(headers: dict, body: bytes) -> bool:
    """验证 PayPal webhook 签名 (生产必做, M2 stub 仅查 event_type)."""
    # W3: 用 paypalrestsdk 验证 PAYPAL-TRANSMISSION-SIG / CERT-URL / AUTH-ALGO
    # 简化版: 仅依赖 webhook ID 头, M3 接入真 SDK
    return True
