"""Stock detail schemas (W2)."""
from typing import Optional

from pydantic import BaseModel, Field


class StockBase(BaseModel):
    symbol: str
    name: str
    sector: Optional[str] = None
    industry: Optional[str] = None
    market_cap: Optional[float] = None


class StockDetail(StockBase):
    """Full stock detail page payload. W2: populated by screener + decision services."""

    current_price: Optional[float] = None
    decision_card: Optional[dict] = Field(None, description="AI decision card payload (W2)")
    main_force_radar: Optional[dict] = Field(None, description="Main force radar (W2)")
    evidence_chain: Optional[list[str]] = Field(None, description="Reasoning trace (W2)")
    risk: Optional[dict] = Field(None, description="Risk assessment (W2)")
