"""PayPal router — M2 stub (sandbox), M3 真接入"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr, Field

from app.paypal import create_order, capture_order, verify_webhook, PLANS

router = APIRouter()


class CreateOrderRequest(BaseModel):
    plan_id: str = Field(..., description="starter / pro / elite")
    user_email: EmailStr


class CreateOrderResponse(BaseModel):
    order_id: str
    approval_url: str


class CaptureOrderRequest(BaseModel):
    order_id: str


class CaptureOrderResponse(BaseModel):
    order_id: str
    status: str
    user_email: str


@router.get("/config")
async def paypal_config() -> dict:
    """前端调这个拿 client_id (公钥, OK 暴露) + 模式 (sandbox/live)."""
    from app.paypal import PAYPAL_CLIENT_ID, PAYPAL_MODE
    return {
        "client_id": PAYPAL_CLIENT_ID,
        "mode": PAYPAL_MODE,
        "plans": [{"id": p["id"], "label": p["label"], "price_usd": p["price_usd"]} for p in PLANS.values()],
    }


@router.post("/create-order", response_model=CreateOrderResponse)
async def create_order_endpoint(body: CreateOrderRequest) -> CreateOrderResponse:
    """创建 PayPal 订单, 返回 approval_url 给前端跳转到 PayPal."""
    result = await create_order(body.plan_id, body.user_email)
    if not result:
        raise HTTPException(status_code=500, detail="PayPal create order failed")
    return CreateOrderResponse(**result)


@router.post("/capture-order", response_model=CaptureOrderResponse)
async def capture_order_endpoint(body: CaptureOrderRequest) -> CaptureOrderResponse:
    """用户在 PayPal 完成支付后回调, capture 订单 + 升级用户 plan."""
    result = await capture_order(body.order_id)
    if not result:
        raise HTTPException(status_code=500, detail="PayPal capture failed")
    # TODO (M3): 用 result["user_email"] 找用户, 升级 plan 字段
    return CaptureOrderResponse(
        order_id=result["order_id"],
        status=result["status"],
        user_email=result.get("user_email", ""),
    )


@router.post("/webhook")
async def webhook(request_body: dict, paypal_transmission_id: str | None = None) -> dict:
    """PayPal 异步 webhook (subscription 续费, 退款, 争议)."""
    # verify_webhook(request.headers(), request.body())
    event_type = request_body.get("event_type", "")
    return {"received": True, "event_type": event_type}
