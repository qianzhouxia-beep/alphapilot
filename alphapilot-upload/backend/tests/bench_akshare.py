"""AKShare 测速脚本 — 老板 L1 拍板 09:23, 数据源选型
   从本地 windows 拉 AKShare, 看延迟 / 稳定性 / 数据完整度
   W3: 跑通后切新加坡 Zeabur 节点 + 测跨国延迟
"""
import json
import time
import statistics
import urllib.error
import urllib.request


def fetch_akshare(symbol: str = "600519") -> dict:
    """拉一只 A 股实时行情, 模拟 AKShare 的 eastmoney 通道.

    AKShare 的 stock_zh_a_spot_em() 是实时全 A 股池; 这里只取一只测延迟.
    返回: {symbol, name, price, change_pct, latency_ms, ok}
    """
    url = f"https://push2.eastmoney.com/api/qt/stock/get?secid=1.{symbol}&fields=f43,f44,f45,f46,f60,f169,f170"
    t0 = time.perf_counter()
    try:
        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Referer": "https://quote.eastmoney.com/",
            },
        )
        with urllib.request.urlopen(req, timeout=10) as r:
            data = json.loads(r.read().decode("utf-8"))
        dt = (time.perf_counter() - t0) * 1000
        if not data.get("data"):
            return {"symbol": symbol, "ok": False, "latency_ms": dt, "error": "empty data"}
        d = data["data"]
        return {
            "symbol": symbol,
            "name": d.get("f58", "?"),
            "price": d.get("f43", 0) / 100,  # eastmoney 价是 分
            "high": d.get("f44", 0) / 100,
            "low": d.get("f45", 0) / 100,
            "open": d.get("f46", 0) / 100,
            "volume": d.get("f60", 0),
            "turnover": d.get("f169", 0),
            "pe": d.get("f170", 0) / 100,
            "latency_ms": round(dt, 1),
            "ok": True,
        }
    except urllib.error.URLError as e:
        dt = (time.perf_counter() - t0) * 1000
        return {"symbol": symbol, "ok": False, "latency_ms": round(dt, 1), "error": str(e)}
    except Exception as e:
        dt = (time.perf_counter() - t0) * 1000
        return {"symbol": symbol, "ok": False, "latency_ms": round(dt, 1), "error": str(e)}


def benchmark(symbols: list[str], rounds: int = 3) -> dict:
    """多轮测速, 算 P50/P95/成功率."""
    results = []
    for r in range(rounds):
        for s in symbols:
            res = fetch_akshare(s)
            results.append(res)
            status = "OK" if res["ok"] else f"FAIL {res.get('error','?')[:30]}"
            print(f"  [r{r+1}] {s} {status} {res.get('latency_ms')}ms")
    ok = [r["latency_ms"] for r in results if r["ok"]]
    fail = [r for r in results if not r["ok"]]
    return {
        "rounds": rounds,
        "total_calls": len(results),
        "ok_calls": len(ok),
        "fail_calls": len(fail),
        "success_rate": round(len(ok) / len(results) * 100, 1),
        "latency_p50_ms": round(statistics.median(ok), 1) if ok else None,
        "latency_p95_ms": round(sorted(ok)[int(len(ok) * 0.95) - 1], 1) if len(ok) >= 2 else (ok[0] if ok else None),
        "latency_min_ms": round(min(ok), 1) if ok else None,
        "latency_max_ms": round(max(ok), 1) if ok else None,
        "samples": results[:5],
    }


if __name__ == "__main__":
    print("=== AKShare 通道测速 (eastmoney 直接 HTTP) ===")
    print("  注: 这是从本地 Windows 测, 实际新加坡节点要再测")
    # 沪深 300 主流 5 只
    symbols = ["600519", "000858", "600036", "300750", "002594"]
    report = benchmark(symbols, rounds=2)
    print("\n=== 报告 ===")
    print(json.dumps(report, indent=2, ensure_ascii=False, default=str))

    print("\n=== 数据源对比参考 (PM 经验) ===")
    print("  AKShare    : 免费/开源/全功能, 偶尔被反爬, 1-3s 延迟 OK")
    print("  Tushare    : 积分制/稳/全, 海外访问需代理 (~200ms + proxy)")
    print("  通达信本地 : 免费, 但要本机客户端, Zeabur 跑不了")
    print("  东方财富爬 : 同 AKShare 通道, 反爬严")
    print("  Wind 海外版: 贵 (~$3000/年/账号), 全, 合规")
    print("  新加 Pand-AShare: 港股 + 美股都包, 海外直连 OK (待 W3 评估)")
