"""Polygon.io client — REST stub (W2) + WebSocket (W3).

M1 uses mock data only; this stub is wired so that W2 can plug in real calls
without changing downstream code.
"""
from typing import List

import httpx
import structlog

from app.config import settings

log = structlog.get_logger()


class PolygonClient:
    """Thin async REST client for Polygon.io.

    M1 status: stub. All methods return empty results.
    W2: implement real REST calls (reference tickers, aggregates, etc.)
    W3: add WebSocket client for real-time trades/quotes.
    """

    def __init__(self, api_key: str | None = None, base_url: str | None = None) -> None:
        self.api_key = api_key or settings.polygon_api_key
        self.base_url = base_url or settings.polygon_rest_url

    async def get_ticker_details(self, symbol: str) -> dict:
        """Fetch ticker reference data. W2: implement real call."""
        log.info("polygon.get_ticker_details.stub", symbol=symbol)
        return {"symbol": symbol, "stub": True}

    async def get_aggregates(
        self, symbol: str, multiplier: int, timespan: str, _from: str, to: str
    ) -> List[dict]:
        """Fetch OHLCV aggregates. W2: implement real call."""
        log.info("polygon.get_aggregates.stub", symbol=symbol, timespan=timespan)
        return []


# Module-level singleton (lazy)
_client: PolygonClient | None = None


def get_polygon() -> PolygonClient:
    global _client
    if _client is None:
        _client = PolygonClient()
    return _client
