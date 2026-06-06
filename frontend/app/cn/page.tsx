// AlphaPilot A 股 Dashboard — Boss pick 全 A + 沪深 300
// M2 2026-06-06: 中文 UI, mock 25 龙头, 沪深 300 起步
// W3: 接入 Tushare/AKShare 真数据后整池扩展

import { HeaderBar } from "@/components/HeaderBar";
import { cnTopN } from "@/lib/cn-mock";
import type { ScreenerItem } from "@/lib/types";

const riskStyles = (r: ScreenerItem["risk"]) => {
  switch (r) {
    case "low":
      return "bg-[rgba(62,230,168,0.12)] text-[#3EE6A8] border border-[rgba(62,230,168,0.3)]";
    case "medium":
      return "bg-[rgba(245,196,81,0.12)] text-[#F5C451] border border-[rgba(245,196,81,0.3)]";
    case "high":
      return "bg-[rgba(255,93,93,0.12)] text-[#FF5D5D] border border-[rgba(255,93,93,0.3)]";
  }
};

const scoreColor = (s: number) =>
  s >= 90 ? "text-[#3EE6A8]" : s >= 80 ? "text-[#4DA3FF]" : s >= 70 ? "text-[#F5C451]" : "text-[#9FB0C7]";

const mainForceIcon = (m: string) => {
  const map: Record<string, string> = {
    accumulation: "trending_up",
    markup: "rocket_launch",
    distribution: "trending_down",
    washout: "water_drop",
    reaccumulation: "repeat",
    bull_trap: "north_east",
    bear_trap: "south_east",
  };
  return map[m] || "show_chart";
};

const MAIN_FORCE_ZH: Record<string, string> = {
  accumulation: "吸筹",
  markup: "拉升",
  distribution: "出货",
  washout: "洗盘",
  reaccumulation: "二次吸筹",
  bull_trap: "诱多",
  bear_trap: "诱空",
};

const RISK_ZH = { low: "低", medium: "中", high: "高" } as const;

export default async function CNDashboard() {
  const data = cnTopN(20);
  const top = data[0];
  const avgScore = Math.round(data.reduce((s, i) => s + i.score, 0) / data.length);
  const bullish = data.filter((i) => i.main_force === "accumulation" || i.main_force === "markup").length;
  const bearish = data.filter((i) => i.main_force === "distribution" || i.main_force === "washout").length;

  return (
    <main className="mx-auto max-w-[1440px] px-8 py-8 min-h-screen">
      <HeaderBar market="cn" />

      <section className="mb-8 grid grid-cols-4 gap-4">
        <KPI label="最佳机会" value={top.symbol.split(".")[0]} sub={`${top.name} · ${top.score} 分`} accent="#3EE6A8" />
        <KPI label="平均评分" value={`${avgScore}`} sub="Top 20" accent="#4DA3FF" />
        <KPI label="看多信号" value={`${bullish}/20`} sub="吸筹 + 拉升" accent="#3EE6A8" />
        <KPI label="看空信号" value={`${bearish}/20`} sub="出货 + 洗盘" accent="#FF5D5D" />
      </section>

      <section className="glass rounded-2xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-[20px] font-semibold">A 股 Top 20 机会</h2>
            <p className="mt-0.5 text-[12px] text-[#6E7C93]">
              AI 评分沪深 300 主流 · 起步 mock 25 只 · W3 接入 Tushare/AKShare 整池
            </p>
          </div>
          <a
            href="/cn/screener"
            className="rounded-lg border border-[#1D2A42] bg-[#0C1728] px-3 py-1.5 text-[12px] text-[#9FB0C7] hover:border-[#4DA3FF] hover:text-[#EAF2FF]"
          >
            完整选股 →
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#1D2A42] text-[11px] uppercase tracking-wider text-[#6E7C93]">
                <th className="px-3 py-3 font-medium">#</th>
                <th className="px-3 py-3 font-medium">代码</th>
                <th className="px-3 py-3 font-medium">名称</th>
                <th className="px-3 py-3 text-right font-medium">评分</th>
                <th className="px-3 py-3 text-right font-medium">上涨%</th>
                <th className="px-3 py-3 font-medium">风险</th>
                <th className="px-3 py-3 font-medium">主力</th>
                <th className="px-3 py-3 font-medium">行业</th>
                <th className="px-3 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr
                  key={item.symbol}
                  className="card-lift border-b border-[#1D2A42]/50 hover:bg-[rgba(77,163,255,0.04)]"
                >
                  <td className="px-3 py-3 text-[12px] text-[#6E7C93] font-display-numeric">
                    {String(i + 1).padStart(2, "0")}
                  </td>
                  <td className="px-3 py-3">
                    <span className="font-mono text-[14px] font-semibold text-[#4DA3FF]">
                      {item.symbol}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-[13px] text-[#EAF2FF]">{item.name}</td>
                  <td className={`px-3 py-3 text-right font-display-numeric text-[24px] ${scoreColor(item.score)}`}>
                    {item.score}
                  </td>
                  <td className="px-3 py-3 text-right text-[14px] text-[#EAF2FF] font-display-numeric">
                    {item.up_probability}%
                  </td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${riskStyles(item.risk)}`}>
                      {RISK_ZH[item.risk]}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="inline-flex items-center gap-1.5 text-[12px] text-[#9FB0C7]">
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                        {mainForceIcon(item.main_force)}
                      </span>
                      {MAIN_FORCE_ZH[item.main_force]}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-[12px] text-[#6E7C93]">{item.sector}</td>
                  <td className="px-3 py-3 text-right">
                    <a
                      href={`/cn/stock/${item.symbol}`}
                      className="text-[12px] text-[#4DA3FF] hover:underline"
                    >
                      详情 →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="mt-10 text-center text-[11px] text-[#6E7C93]">
        AlphaPilot 提供 AI 辅助分析,仅供教育用途,非投资建议。过往表现不保证未来收益。所有概率为估计值,非保证。
        <br />
        A 股内容仅供在美华人教育用途,非中国境内投顾服务 / A-share content for educational purposes only, not investment advice in mainland China.
      </footer>
    </main>
  );
}

function KPI({ label, value, sub, accent }: { label: string; value: string; sub: string; accent: string }) {
  return (
    <div className="glass card-lift rounded-2xl p-5">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wider text-[#6E7C93]">{label}</span>
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}` }}></span>
      </div>
      <div className="font-display-numeric text-[32px]" style={{ color: accent }}>
        {value}
      </div>
      <div className="mt-1 text-[12px] text-[#9FB0C7]">{sub}</div>
    </div>
  );
}
