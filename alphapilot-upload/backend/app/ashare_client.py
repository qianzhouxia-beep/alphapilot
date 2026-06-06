"""Ashare (mpquant/Ashare) 包装 — 老板 L1 11:33 拍板 GitHub 量化数据接口技能
   主力: 新浪 (sina) / 备: 腾讯 (tx) / 自动 try/except 热备
   优势: 单文件 / 公开数据 / 无需 key / 多年稳定
   包装层: 加 A 股 .SH/.SZ 适配 + 启发式 AI 评分 + screener_topn
"""
import importlib.util
import os
from typing import List, Optional

# 动态加载同目录下的 Ashare.py (mpquant 原版, 大小写敏感, Windows NTFS case-insensitive 避撞)
_ASHARE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Ashare.py")
_spec = importlib.util.spec_from_file_location("_ashare_lib", _ASHARE_PATH)
_ashare = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_ashare)
get_price = _ashare.get_price


import structlog
log = structlog.get_logger()


def em_to_ashare_code(symbol: str) -> str:
    """600519.SH -> sh600519,  000858.SZ -> sz000858"""
    code, ex = symbol.split(".")
    return f"sh{code}" if ex == "SH" else f"sz{code}"


def get_quote(symbol: str) -> Optional[dict]:
    """拉一只 A 股实时行情 (Ashare 主力 新浪 -> 备 腾讯).

    Ashare 不直接给"实时价", 最后一根日线 = 当日。
    Returns: dict 或 None
    """
    try:
        code = em_to_ashare_code(symbol)
        df = get_price(code, frequency="1d", count=5)
        if df is None or df.empty:
            return None
        latest = df.iloc[-1]
        prev = df.iloc[-2] if len(df) >= 2 else latest
        prev_close = float(prev["close"])
        cur_close = float(latest["close"])
        change_pct = ((cur_close - prev_close) / prev_close * 100) if prev_close else 0
        return {
            "symbol": symbol,
            "name": "",
            "price": cur_close,
            "prev_close": prev_close,
            "open": float(latest["open"]),
            "high": float(latest["high"]),
            "low": float(latest["low"]),
            "volume": float(latest["volume"]),
            "change_pct": round(change_pct, 2),
            "source": "ashare",
        }
    except Exception as e:
        log.warning("ashare.get_quote.fail", symbol=symbol, err=str(e)[:60])
        return None


def get_kline(symbol: str, period: str = "1d", limit: int = 120) -> List[dict]:
    """拉 K 线 (Ashare 全周期支持)."""
    try:
        code = em_to_ashare_code(symbol)
        df = get_price(code, frequency=period, count=limit)
        if df is None or df.empty:
            return []
        rows = []
        for idx, row in df.iterrows():
            rows.append({
                "date": idx.isoformat() if hasattr(idx, "isoformat") else str(idx),
                "open": float(row["open"]),
                "close": float(row["close"]),
                "high": float(row["high"]),
                "low": float(row["low"]),
                "volume": float(row["volume"]),
            })
        return rows
    except Exception as e:
        log.warning("ashare.get_kline.fail", symbol=symbol, err=str(e)[:60])
        return []


def screener_topn(n: int = 25) -> List[dict]:
    """A 股 Top N — Ashare 不提供榜单, 用东方财富沪深 A 列表 + 启发式 AI 评分."""
    import json
    import urllib.request

    # 沪深 300 主流: sh 主板 (6xx, 9xx) + sz 主板 (0xx) — 排除 3 创业板, 688 科创板, bj 北交所
    fs = "m:1+t:2,m:0+t:6"
    fields = "f12,f14,f2,f3,f5,f6,f9,f20,f22,f23"
    urls = [
        f"https://push2.eastmoney.com/api/qt/clist/get?pn=1&pz=100&po=1&np=1&fltt=2&invt=2&fid=f20&fs={fs}&fields={fields}",
        f"https://82.push2.eastmoney.com/api/qt/clist/get?pn=1&pz=100&po=1&np=1&fltt=2&invt=2&fid=f20&fs={fs}&fields={fields}",
    ]
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": "https://quote.eastmoney.com/",
    }
    diff = None
    for url in urls:
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=6) as r:
                payload = json.loads(r.read().decode("utf-8", "ignore"))
            cand = payload.get("data", {}).get("diff", []) if payload.get("data") else None
            if cand:
                diff = cand
                break
        except Exception as e:
            log.warning("ashare.screener.try.fail", url=url[:60], err=str(e)[:50])
            continue

    if not diff:
        log.warning("ashare.screener.all_fail")
        return []

    rows = []
    for d in diff:
        try:
            code = d.get("f12", "")
            if not code or not code.isdigit():
                continue
            name = d.get("f14", "")
            change_pct = float(d.get("f3", 0) or 0) / 100
            pe = float(d.get("f9", 0) or 0) / 100
            industry = d.get("f23", "")

            ex = "SH" if code.startswith(("6", "9")) else "SZ"
            symbol = f"{code}.{ex}"

            score = max(0, min(100, 60 + change_pct * 1.5 + (10 - pe / 20)))
            if "ST" in name or pe > 200 or pe < 0:
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

            rows.append({
                "symbol": symbol,
                "name": name,
                "score": int(score),
                "up_probability": max(20, min(85, 50 + change_pct * 2)),
                "risk": risk,
                "main_force": main_force,
                "sector": industry,
            })
            if len(rows) >= n * 3:
                break
        except (ValueError, KeyError, TypeError):
            continue

    rows.sort(key=lambda r: -r["score"])
    return rows[:n]
