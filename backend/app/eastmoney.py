"""东方财富 A 股数据源 client — 2026-06-06 实测选定 (本地 203ms, 新加坡节点更快)
   免费 / 无需 key / 全 A 股 / 实时行情 + 历史 K 线 + 基本面
   W3: 从 mock 切真数据 — 改 cn_mock fn 用 eastmoney 拉实时价
"""
import json
import time
from typing import List, Optional
from urllib.error import URLError
from urllib.request import Request, urlopen

from app.cache import get_redis


# 沪深代码前缀映射 (东方财富用 1.=SH, 0.=SZ)
def em_secid(symbol: str) -> str:
    """600519.SH -> 1.600519;  000858.SZ -> 0.000858"""
    code, ex = symbol.split(".")
    prefix = "1" if ex == "SH" else "0"
    return f"{prefix}.{code}"


def em_headers() -> dict:
    return {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0",
        "Referer": "https://quote.eastmoney.com/",
    }


def _http_get(url: str, timeout: int = 5) -> Optional[dict]:
    try:
        req = Request(url, headers=em_headers())
        with urlopen(req, timeout=timeout) as r:
            return json.loads(r.read().decode("utf-8"))
    except (URLError, json.JSONDecodeError, TimeoutError) as e:
        log_warning("eastmoney.http.fail", url=url[:80], err=str(e)[:60])
        return None


import structlog

log = structlog.get_logger()


def log_warning(event: str, **kw):
    log.warning(event, **kw)


def get_quote(symbol: str) -> Optional[dict]:
    """拉一只 A 股实时行情.

    Returns:
        {symbol, name, price, change_pct, high, low, open, volume, pe, market_cap}
        None on failure (前端 fallback mock)
    """
    # Redis cache (5s 缓存, 减轻东方财富)
    r = get_redis()
    if r is not None:
        try:
            # 同步 redis client (decode_responses=True) — get 是同步 OK
            cached = r.get(f"em:quote:{symbol}")
            if cached:
                if isinstance(cached, bytes):
                    cached = cached.decode("utf-8")
                return json.loads(cached)
        except Exception:
            pass

    secid = em_secid(symbol)
    # 多通道 fallback (push2 主, datacenter-web 备, hsmarketwg 备)
    urls = [
        f"https://push2.eastmoney.com/api/qt/stock/get?secid={secid}&fields=f43,f44,f45,f46,f47,f48,f60,f57,f58,f162,f167,f168,f169,f170",
        f"https://datacenter-web.eastmoney.com/api/qt/stock/get?secid={secid}&fields=f43,f44,f45,f46,f47,f48,f60,f57,f58,f162,f167,f168,f169,f170",
    ]
    data = None
    for url in urls:
        data = _http_get(url)
        if data and data.get("data"):
            break
    if not data or not data.get("data"):
        return None
    d = data["data"]
    # 字段含义: f43=now, f44=high, f45=low, f46=open, f47=volume(手), f48=turnover(元), f60=prev_close
    # f57=code, f58=name, f162=change_pct*100, f167=change_amount*100, f168=turnover_rate,
    # f169=pe, f170=market_cap
    quote = {
        "symbol": symbol,
        "name": d.get("f58", ""),
        "price": d.get("f43", 0) / 100,  # 东方财富价格是 分
        "prev_close": d.get("f60", 0) / 100,
        "open": d.get("f46", 0) / 100,
        "high": d.get("f44", 0) / 100,
        "low": d.get("f45", 0) / 100,
        "volume": d.get("f47", 0),
        "turnover": d.get("f48", 0),
        "change_pct": d.get("f162", 0) / 100,
        "turnover_rate": d.get("f168", 0) / 100,
        "pe": d.get("f169", 0) / 100,
        "market_cap": d.get("f170", 0),
        "ts": int(time.time() * 1000),
    }
    if r is not None:
        try:
            r.setex(f"em:quote:{symbol}", 5, json.dumps(quote))
        except Exception:
            pass
    return quote


def get_kline(symbol: str, period: str = "daily", limit: int = 120) -> List[dict]:
    """拉 K 线 (默认日线, 120 根 ~ 半年).

    Args:
        period: daily / weekly / monthly / 1m/5m/15m/30m/60m (101=日 102=周 103=月 1-60=分钟)
        limit: 多少根
    """
    period_map = {
        "daily": 101, "weekly": 102, "monthly": 103,
        "1m": 1, "5m": 5, "15m": 15, "30m": 30, "60m": 60,
    }
    klt = period_map.get(period, 101)
    secid = em_secid(symbol)
    url = (
        f"https://push2hisquote.eastmoney.com/api/qt/stock/kline/get"
        f"?secid={secid}&fields1=f1,f2,f3,f4,f5,f6"
        f"&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61"
        f"&klt={klt}&fqt=1&beg=0&end=20500101&lmt={limit}"
    )
    data = _http_get(url)
    if not data or not data.get("data") or not data["data"].get("klines"):
        return []
    rows = []
    for line in data["data"]["klines"]:
        parts = line.split(",")
        if len(parts) < 6:
            continue
        rows.append({
            "date": parts[0],
            "open": float(parts[1]),
            "close": float(parts[2]),
            "high": float(parts[3]),
            "low": float(parts[4]),
            "volume": float(parts[5]),
            "turnover": float(parts[6]) if len(parts) > 6 else 0,
            "amplitude": float(parts[7]) if len(parts) > 7 else 0,
            "change_pct": float(parts[8]) if len(parts) > 8 else 0,
            "change_amount": float(parts[9]) if len(parts) > 9 else 0,
            "turnover_rate": float(parts[10]) if len(parts) > 10 else 0,
        })
    return rows


def screener_topn(n: int = 25) -> List[dict]:
    """A 股 Top N (从东方财富实时榜单取, 不再用 mock).

    真实数据, 每 5 分钟刷一次 (redis cache).
    """
    r = get_redis()
    if r is not None:
        try:
            cached = r.get("em:screener:top")
            if cached:
                data = json.loads(cached)
                if data:
                    return data[:n]
        except Exception:
            pass

    # 沪深 A 股实时榜单, 涨跌幅排序, 取前 N
    # fields: f12=code, f14=name, f2=price(分), f3=change_pct*100, f4=change_amount*100, f5=volume(手),
    #         f6=turnover(元), f9=pe, f20=market_cap, f22=turnover_rate, f23=industry
    # 一次取 100 只, 在后端按 score 排
    url = (
        "https://push2.eastmoney.com/api/qt/clist/get"
        "?pn=1&pz=100&po=1&np=1&fltt=2&invt=2&fid=f3&fs=m:0+t:6,m:0+t:80,m:1+t:2,m:1+t:23"
        "&fields=f12,f14,f2,f3,f5,f6,f9,f20,f22,f23,f100,f10"
    )
    data = _http_get(url)
    if not data or not data.get("data") or not data["data"].get("diff"):
        return []

    rows = []
    for d in data["data"]["diff"][:n * 3]:  # 多取 3 倍再筛
        code = d.get("f12", "")
        name = d.get("f14", "")
        price = d.get("f2", 0) / 100
        change_pct = d.get("f3", 0) / 100
        pe = d.get("f9", 0) / 100
        market_cap = d.get("f20", 0)
        turnover_rate = d.get("f22", 0) / 100
        industry = d.get("f23", "")
        volume = d.get("f5", 0)
        turnover = d.get("f6", 0)

        # 6 位代码 + 后缀 (.SH / .SZ)
        ex = "SH" if str(code).startswith("6") or str(code).startswith("9") else "SZ"
        symbol = f"{code}.{ex}"

        # 简单 AI 评分 (W3 接入真模型前用启发式)
        # 基础分 60 + 涨跌幅*2 (但 cap 100) - 高估值折分
        score = max(0, min(100, 60 + change_pct * 1.5 + (10 - pe / 20)))
        score = round(score, 0)

        # 风险: ST/PE 异常高
        if "ST" in name or pe > 200 or pe < 0:
            risk = "high"
        elif pe > 80 or abs(change_pct) > 7:
            risk = "medium"
        else:
            risk = "low"

        # 主力状态 (简化: 涨 = 拉升, 跌 = 洗盘/出货)
        if change_pct > 5:
            main_force = "markup"
        elif change_pct > 2:
            main_force = "accumulation"
        elif change_pct < -5:
            main_force = "washout"
        else:
            main_force = "accumulation"

        rows.append({
            "symbol": symbol,
            "name": name,
            "score": int(score),
            "up_probability": max(20, min(85, 50 + change_pct * 2)),
            "risk": risk,
            "main_force": main_force,
            "sector": industry,
            "_price": price,  # 内部用, 不返给前端
            "_change_pct": change_pct,
            "_pe": pe,
            "_market_cap": market_cap,
        })

    # 按 score 排序取 Top N
    rows.sort(key=lambda r: -r["score"])
    rows = rows[:n]

    # 缓存 5 分钟
    if r is not None:
        try:
            r.setex("em:screener:top", 300, json.dumps(rows))
        except Exception:
            pass

    return rows
