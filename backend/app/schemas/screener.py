"""Screener response schemas."""
from typing import Literal, Optional

from pydantic import BaseModel, Field


class ScreenerItem(BaseModel):
    """One row in the screener result table."""

    symbol: str = Field(..., description="Ticker symbol, e.g. AAPL")
    name: str = Field(..., description="Company name")
    score: int = Field(..., ge=0, le=100, description="Opportunity score 0-100")
    up_probability: int = Field(..., ge=0, le=100, description="5-day up probability %")
    risk: Literal["low", "medium", "high"] = Field(..., description="Risk tier")
    main_force: str = Field(..., description="Main force stage: accumulation | markup | distribution | washout | ...")
    sector: Optional[str] = Field(None, description="GICS sector")


class ScreenerResponse(BaseModel):
    """Top-N screener response."""

    count: int = Field(..., description="Number of items returned")
    items: list[ScreenerItem]
    generated_at: str = Field(..., description="ISO 8601 timestamp")
    source: Literal["mock", "live"] = Field("mock", description="Data source")
