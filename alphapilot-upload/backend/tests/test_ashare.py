import sys, json, os
_APP_DIR = r"D:\MavisProjects\alphapilot\backend\app"
sys.path.insert(0, _APP_DIR)
from ashare import get_quote, screener_topn

print("=== 600519 quote ===")
q = get_quote("600519.SH")
print(json.dumps(q, indent=2, ensure_ascii=False, default=str))
print()
print("=== Top 5 A-shares ===")
t = screener_topn(5)
for i, x in enumerate(t):
    print("  %d. %s %s score=%d pct=%s" % (i+1, x["symbol"], x["name"], x["score"], x.get("change_pct", "?")))
