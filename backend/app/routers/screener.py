"""Screener endpoints — M1 uses mock data only."""
from datetime import datetime, timezone

from fastapi import APIRouter, Query

from app.schemas.screener import ScreenerItem, ScreenerResponse
from app.services.screener_service import get_top_opportunities

router = APIRouter()


@router.get("/top", response_model=ScreenerResponse)
async def top(
    n: int = Query(default=20, ge=1, le=100, description="Number of items to return"),
) -> ScreenerResponse:
    """Return top-N opportunity-ranked stocks. M1: mock. W2: live Polygon + AI score."""
    items = get_top_opportunities(n)
    return ScreenerResponse(
        count=len(items),
        items=[ScreenerItem(**i) for i in items],
        generated_at=datetime.now(timezone.utc).isoformat(),
        source="mock",
    )
