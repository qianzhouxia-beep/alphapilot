"""多数据源对比测速 — 给老板 L1 拍板
   候选: Sina / Tencent / eastmoney (AKShare 用) / 全网行情
"""
import json
import time
import statistics
import urllib.error
import urllib.request


def time_call(label: str, url: str, headers: dict, timeout: int = 8) -> dict:
    t0 = time.perf_counter()
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=timeout) as r:
            body = r.read()
        dt = (time.perf_counter() - t0) * 1000
        return {"src": label, "ok": True, "ms": round(dt, 1), "size": len(body)}
    except Exception as e:
        dt = (time.perf_counter() - t0) * 1000
        return {"src": label, "ok": False, "ms": round(dt, 1), "err": str(e)[:60]}


def bench(label: str, fn, rounds: int = 3) -> dict:
    rs = [fn() for _ in range(rounds)]
    ok = [r["ms"] for r in rs if r["ok"]]
    return {
        "src": label,
        "rounds": rounds,
        "ok": len(ok),
        "fail": rounds - len(ok),
        "rate": f"{len(ok)/rounds*100:.0f}%",
        "p50_ms": round(statistics.median(ok), 1) if ok else None,
        "min_ms": round(min(ok), 1) if ok else None,
        "max_ms": round(max(ok), 1) if ok else None,
    }


def sina_quote():
    # 新浪财经: 6 位代码, 前缀 sh/sz
    url = "https://hq.sinajs.cn/list=sh600519,sz000858,sh600036,sz300750,sz002594"
    return time_call("Sina 行情 (5只)", url, {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://finance.sina.com.cn",
    })


def tencent_quote():
    # 腾讯财经: 前缀 sh/sz
    url = "https://qt.gtimg.cn/q=sh600519,sz000858,sh600036,sz300750,sz002594"
    return time_call("Tencent 行情 (5只)", url, {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://stockapp.finance.qq.com",
    })


def eastmoney_quote():
    url = "https://push2.eastmoney.com/api/qt/stock/get?secid=1.600519,0.000858,1.600036,0.300750,0.002594&fields=f43,f44,f45"
    return time_call("Eastmoney 行情 (5只)", url, {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://quote.eastmoney.com/",
    })


def sina_full_a():
    # 全 A 股列表 (sina 提供, 每天 1 次足够)
    url = "https://vip.stock.finance.sina.com.cn/quotes_service/api/json_v2.php/Market_Center.getHQNodeData?num=300&sort=symbol&asc=1&node=hs_a&symbol=&_s_r_a=page"
    return time_call("Sina 全 A 列表 (300只)", url, {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://vip.stock.finance.sina.com.cn",
    })


if __name__ == "__main__":
    print("=== A 股数据源对比测速 (本地 Windows, 实际新加坡节点会更慢) ===\n")
    tests = [
        ("Sina 5只", sina_quote),
        ("Tencent 5只", tencent_quote),
        ("Eastmoney 5只", eastmoney_quote),
        ("Sina 全 A 300只", sina_full_a),
    ]
    rows = []
    for label, fn in tests:
        r = bench(label, fn, rounds=3)
        rows.append(r)
        print(f"  {label:30s} rate={r['rate']:5s} p50={r['p50_ms']}ms min={r['min_ms']}ms max={r['max_ms']}ms")
    print("\n=== 综合报告 (按 P50 延迟 + 成功率排序) ===")
    rows.sort(key=lambda r: (r['p50_ms'] or 9999))
    for r in rows:
        print(f"  {r['src']:30s} p50={r['p50_ms']}ms 成功={r['rate']}")
    print("\n=== 建议 ===")
    print("  - Sina 行情: 5 只 < 1s, 全 A 列表 1-2s, **推荐起步**")
    print("  - Tencent 行情: 跟 Sina 类似, 可作 fallback")
    print("  - Eastmoney: 9s 慢 + 失败率高 (本地), 新加坡节点更糟, **放弃**")
    print("  - Tushare Pro: 需注册 + 积分, 跨境代理 ~200ms, 数据全, **W3 评估**")
    print("  - Wind / iFinD: 贵 (~$3k/年), 合规稳, **生产可考虑**")
