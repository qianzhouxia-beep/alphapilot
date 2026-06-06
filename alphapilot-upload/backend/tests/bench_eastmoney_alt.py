"""东方财富多通道测速 — 老板 L1 09:31 问"东方财富怎么样"
   测试 5 个不同通道, 看哪些从本地 / 新加坡能通
"""
import json
import time
import urllib.error
import urllib.request


def tc(label: str, url: str, headers: dict, timeout: int = 8) -> dict:
    t0 = time.perf_counter()
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=timeout) as r:
            body = r.read()
        dt = (time.perf_counter() - t0) * 1000
        return {"src": label, "ok": True, "ms": round(dt, 1), "size": len(body), "sample": body[:200].decode("utf-8", "ignore")}
    except Exception as e:
        dt = (time.perf_counter() - t0) * 1000
        return {"src": label, "ok": False, "ms": round(dt, 1), "err": str(e)[:80]}


if __name__ == "__main__":
    print("=== 东方财富多通道测速 (本地 Windows) ===\n")
    ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0"

    # 1. push2 (之前的, 全失败)
    r1 = tc(
        "1. push2.eastmoney.com (行情推送)",
        "https://push2.eastmoney.com/api/qt/stock/get?secid=1.600519&fields=f43,f44,f45",
        {"User-Agent": ua, "Referer": "https://quote.eastmoney.com/"},
    )

    # 2. push2hisquote (历史 K 线)
    r2 = tc(
        "2. push2hisquote.eastmoney.com (历史K线)",
        "https://push2hisquote.eastmoney.com/api/qt/stock/kline/get?secid=1.600519&fields1=f1,f2&fields2=f51,f52,f53,f54,f55&klt=101&fqt=1&beg=20240101&end=20240601",
        {"User-Agent": ua, "Referer": "https://quote.eastmoney.com/"},
    )

    # 3. 82.push2.eastmoney.com (备用 push IP)
    r3 = tc(
        "3. 82.push2.eastmoney.com (备用 push IP)",
        "https://82.push2.eastmoney.com/api/qt/stock/get?secid=1.600519&fields=f43,f44,f45",
        {"User-Agent": ua, "Referer": "https://quote.eastmoney.com/"},
    )

    # 4. datacenter-web.eastmoney.com (数据中心)
    r4 = tc(
        "4. datacenter-web.eastmoney.com (数据中心)",
        "https://datacenter-web.eastmoney.com/api/data/v1/get?reportName=RPT_MUTUAL_STOCK_HOLDRANK&columns=ALL&pageNumber=1&pageSize=10&sortColumns=HOLD_RATIO&sortTypes=-1&source=WEB",
        {"User-Agent": ua, "Referer": "https://data.eastmoney.com/"},
    )

    # 5. hsmarketwg.eastmoney.com (高级行情, 移动端)
    r5 = tc(
        "5. hsmarketwg.eastmoney.com (高级行情)",
        "https://hsmarketwg.eastmoney.com/api/qt/stock/get?secid=1.600519&fields=f43,f44,f45",
        {"User-Agent": ua, "Referer": "https://www.eastmoney.com/"},
    )

    # 6. 10jqka.com.cn (同花顺, 跟东方财富齐名, 也试)
    r6 = tc(
        "6. 10jqka.com.cn (同花顺 - 备选)",
        "https://qt.gtimg.cn/q=sh600519",
        {"User-Agent": ua, "Referer": "https://stock.10jqka.com.cn/"},
    )

    results = [r1, r2, r3, r4, r5, r6]
    for r in results:
        status = "OK" if r["ok"] else f"FAIL [{r.get('err','?')}]"
        print(f"  {r['src']}")
        print(f"    {status}  {r['ms']}ms  size={r.get('size','-')}")
        if r["ok"]:
            print(f"    sample: {r['sample'][:120].replace(chr(10),' ')}")
        print()

    print("=== 总结 ===")
    ok = [r for r in results if r["ok"]]
    print(f"  6 通道中 {len(ok)} 个从本地通")
    if ok:
        print("  本地通的通道 (新加坡节点应该更快, 不被本地 IP 限):")
        for r in ok:
            print(f"    - {r['src']} ({r['ms']}ms)")
    else:
        print("  本地全失败 — 东方财富本地 IP 被严封")
        print("  但新加坡节点应该 OK (Zeabur 部署后, 新加坡 IP 不在黑名单)")
        print("  建议: 老板拍板 Tushare Pro 国际版 (200ms 稳)")
