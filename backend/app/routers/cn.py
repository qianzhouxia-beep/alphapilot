"""A 股 (China) router — Ashare (mpquant) 主力 + 东方财富 fallback + Redis cache
   老板 L1 11:33 拍板 GitHub 量化数据接口, 用 mpquant/Ashare 主力
"""
from fastapi import APIRouter, HTTPException, Query
import structlog
from app.ashare_client import get_quote as ashare_get_quote, screener_topn, get_kline as ashare_get_kline
from app.eastmoney import get_quote as em_get_quote, get_kline as em_get_kline, screener_topn as em_screener_topn

log = structlog.get_logger()
router = APIRouter()


def _get_quote_with_fallback(symbol: str):
    """Ashare 主力 (新浪+腾讯热备) -> 东方财富 fallback."""
    q = ashare_get_quote(symbol)
    if q and q.get("price"):
        return q
    log.info("cn.get_quote.fallback.eastmoney", symbol=symbol)
    return em_get_quote(symbol)


def _get_kline_with_fallback(symbol: str, period: str = "1d", limit: int = 120):
    """Ashare 主力 -> 东方财富 fallback."""
    rows = ashare_get_kline(symbol, period, limit)
    if rows:
        return rows
    log.info("cn.get_kline.fallback.eastmoney", symbol=symbol)
    return em_get_kline(symbol, period, limit)


def _screener_with_fallback(n: int):
    """Ashare + 东方财富 screener fallback."""
    rows = screener_topn(n)
    if rows:
        return rows
    log.info("cn.screener.fallback.eastmoney", n=n)
    return em_screener_topn(n)


@router.get("/screener/top")
async def cn_screener_top(n: int = Query(default=20, ge=1, le=100)) -> dict:
    """A 股 Top N (Ashare 主力 + 东方财富 fallback, 启发式 AI 评分, Redis 缓存 5 分钟)."""
    data = _screener_with_fallback(n)
    if not data:
        raise HTTPException(status_code=503, detail="A-share data source unreachable (Ashare + Eastmoney both failed)")
    return {
        "count": len(data),
        "items": [{k: v for k, v in item.items() if not k.startswith("_")} for item in data],
        "source": "ashare-live" if data and data[0].get("source") != "eastmoney" else "eastmoney-fallback",
    }


@router.get("/stock/{symbol}")
async def cn_stock_detail(symbol: str) -> dict:
    """A 股单股实时行情 + AI 评分 (Ashare 主力 + 东方财富 fallback)."""
    # 标准化
    symbol = symbol.upper()
    if not symbol.endswith(".SH") and not symbol.endswith(".SZ"):
        return {"error": f"Invalid A-share symbol: {symbol} (need .SH / .SZ suffix)"}

    quote = _get_quote_with_fallback(symbol)
    if not quote:
        raise HTTPException(status_code=404, detail=f"A-share quote failed for {symbol} (Ashare + Eastmoney both)")

    # 简化: 评分逻辑复用 screener 的启发式
    change_pct = quote.get("change_pct", 0)
    pe = quote.get("pe", 0)
    score = max(0, min(100, 60 + change_pct * 1.5 + (10 - pe / 20)))

    if "ST" in quote.get("name", "") or pe > 200 or pe < 0:
        risk = "high"
    elif pe > 80 or abs(change_pct) > 7:
        risk = "medium"
    else:
        risk = "low"

    if change_pct > 5:
        main_force = "markup"
    elif change_pct > 2:
        main_force = "accumulation"
    elif change_pct < -5:
        main_force = "washout"
    else:
        main_force = "accumulation"

    return {
        "symbol": symbol,
        "name": quote.get("name", ""),
        "score": int(score),
        "up_probability": max(20, min(85, 50 + change_pct * 2)),
        "risk": risk,
        "main_force": main_force,
        "sector": "综合",  # 东方财富单股接口没行业, 从 screener 取
        "price": quote.get("price"),
        "change_pct": change_pct,
        "open": quote.get("open"),
        "high": quote.get("high"),
        "low": quote.get("low"),
        "prev_close": quote.get("prev_close"),
        "volume": quote.get("volume"),
        "turnover": quote.get("turnover"),
        "pe": pe,
        "market_cap": quote.get("market_cap"),
        "source": "eastmoney-live",
    }


@router.get("/kline/{symbol}")
async def cn_kline(symbol: str, period: str = "daily", limit: int = Query(default=120, ge=1, le=500)) -> dict:
    """A 股 K 线 (Ashare 主力 + 东方财富 fallback)."""
    symbol = symbol.upper()
    if not symbol.endswith(".SH") and not symbol.endswith(".SZ"):
        raise HTTPException(status_code=400, detail="Invalid A-share symbol")
    rows = _get_kline_with_fallback(symbol, period, limit)
    if not rows:
        raise HTTPException(status_code=404, detail=f"K-line not found for {symbol}")
    return {"symbol": symbol, "period": period, "count": len(rows), "data": rows}
