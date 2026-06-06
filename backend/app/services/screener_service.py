"""Screener business logic.

M1: hard-coded mock list of 20 top SP500-style names.
W2: replace with live Polygon + real opportunity scoring (AI model).
"""
from typing import List


_MOCK_TOP_20 = [
    {"symbol": "AAPL", "name": "Apple Inc.", "score": 92, "up_probability": 78, "risk": "low", "main_force": "accumulation", "sector": "Technology"},
    {"symbol": "MSFT", "name": "Microsoft Corp.", "score": 90, "up_probability": 76, "risk": "low", "main_force": "markup", "sector": "Technology"},
    {"symbol": "NVDA", "name": "NVIDIA Corp.", "score": 95, "up_probability": 81, "risk": "medium", "main_force": "markup", "sector": "Technology"},
    {"symbol": "GOOGL", "name": "Alphabet Inc.", "score": 88, "up_probability": 73, "risk": "low", "main_force": "accumulation", "sector": "Communication Services"},
    {"symbol": "AMZN", "name": "Amazon.com Inc.", "score": 87, "up_probability": 72, "risk": "medium", "main_force": "markup", "sector": "Consumer Discretionary"},
    {"symbol": "META", "name": "Meta Platforms Inc.", "score": 89, "up_probability": 75, "risk": "medium", "main_force": "markup", "sector": "Communication Services"},
    {"symbol": "TSLA", "name": "Tesla Inc.", "score": 84, "up_probability": 68, "risk": "high", "main_force": "washout", "sector": "Consumer Discretionary"},
    {"symbol": "BRK.B", "name": "Berkshire Hathaway", "score": 82, "up_probability": 70, "risk": "low", "main_force": "accumulation", "sector": "Financials"},
    {"symbol": "JPM", "name": "JPMorgan Chase", "score": 85, "up_probability": 71, "risk": "low", "main_force": "markup", "sector": "Financials"},
    {"symbol": "V", "name": "Visa Inc.", "score": 86, "up_probability": 74, "risk": "low", "main_force": "markup", "sector": "Financials"},
    {"symbol": "JNJ", "name": "Johnson & Johnson", "score": 79, "up_probability": 67, "risk": "low", "main_force": "accumulation", "sector": "Health Care"},
    {"symbol": "WMT", "name": "Walmart Inc.", "score": 80, "up_probability": 69, "risk": "low", "main_force": "accumulation", "sector": "Consumer Staples"},
    {"symbol": "PG", "name": "Procter & Gamble", "score": 78, "up_probability": 66, "risk": "low", "main_force": "accumulation", "sector": "Consumer Staples"},
    {"symbol": "MA", "name": "Mastercard Inc.", "score": 87, "up_probability": 75, "risk": "low", "main_force": "markup", "sector": "Financials"},
    {"symbol": "HD", "name": "Home Depot Inc.", "score": 81, "up_probability": 70, "risk": "medium", "main_force": "markup", "sector": "Consumer Discretionary"},
    {"symbol": "AVGO", "name": "Broadcom Inc.", "score": 90, "up_probability": 77, "risk": "medium", "main_force": "markup", "sector": "Technology"},
    {"symbol": "LLY", "name": "Eli Lilly and Co.", "score": 88, "up_probability": 74, "risk": "medium", "main_force": "markup", "sector": "Health Care"},
    {"symbol": "XOM", "name": "Exxon Mobil Corp.", "score": 77, "up_probability": 65, "risk": "medium", "main_force": "accumulation", "sector": "Energy"},
    {"symbol": "COST", "name": "Costco Wholesale", "score": 83, "up_probability": 71, "risk": "low", "main_force": "markup", "sector": "Consumer Staples"},
    {"symbol": "ABBV", "name": "AbbVie Inc.", "score": 79, "up_probability": 68, "risk": "low", "main_force": "accumulation", "sector": "Health Care"},
]


def get_top_opportunities(n: int = 20) -> List[dict]:
    """Return top-N opportunity-ranked stocks. M1: hard-coded mock."""
    return _MOCK_TOP_20[:n]
