// AlphaPilot US Market Dashboard — top-N opportunity-ranked US stocks
// M2 2026-06-06: i18n, A-shares tab in header, Boss pick 双市场+双语

import { HeaderBar } from "@/components/HeaderBar";

type ScreenerItem = {
  symbol: string;
  name: string;
  score: number;
  up_probability: number;
  risk: "low" | "medium" | "high";
  main_force: string;
  sector: string | null;
};

type ScreenerResponse = {
  count: number;
  items: ScreenerItem[];
  generated_at: string;
  source: "mock" | "live";
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8002";

async function fetchTopOpportunities(n: number = 20): Promise<ScreenerResponse> {
  const res = await fetch(`${API_BASE}/v1/screener/top?n=${n}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Backend ${res.status}: ${res.statusText}`);
  return res.json();
}

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
  s >= 90
    ? "text-[#3EE6A8]"
    : s >= 80
      ? "text-[#4DA3FF]"
      : s >= 70
        ? "text-[#F5C451]"
        : "text-[#9FB0C7]";

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

const t = {
  // Note: this page is server component; t() uses a server-side default map.
  // The header (client) handles real i18n. We just translate the static labels here.
  zh: {
    kpiTop: "最佳机会",
    kpiAvg: "平均评分",
    kpiBullish: "看多信号",
    kpiBearish: "看空信号",
    kpiTopSub: "评分",
    kpiTop20: "Top 20",
    kpiBullishSub: "吸筹 + 拉升",
    kpiBearishSub: "出货 + 洗盘",
    tableTitle: "Top 20 美股机会",
    tableSubtitle: "AI 评分美股 · 数据源:",
    fullScreener: "完整选股 →",
    rank: "#",
    symbol: "代码",
    name: "名称",
    score: "评分",
    up: "上涨%",
    risk: "风险",
    mainforce: "主力状态",
    sector: "行业",
    details: "详情 →",
    riskLow: "低",
    riskMed: "中",
    riskHigh: "高",
    mainforceAcc: "吸筹",
    mainforceMar: "拉升",
    mainforceDis: "出货",
    mainforceWas: "洗盘",
    mainforceRea: "二次吸筹",
    mainforceBul: "诱多",
    mainforceBea: "诱空",
    errBackend: "后端无法连接",
    errBackendTip: "提示:请确认后端运行在 localhost:8002",
    footer: "AlphaPilot 提供 AI 辅助分析,仅供教育用途,非投资建议。过往表现不保证未来收益。所有概率为估计值,非保证。",
  },
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

export default async function Dashboard() {
  let data: ScreenerResponse | null = null;
  let error: string | null = null;
  try {
    data = await fetchTopOpportunities(20);
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }

  const top = data?.items?.[0];
  const avgScore = data
    ? Math.round(data.items.reduce((s, i) => s + i.score, 0) / data.items.length)
    : 0;
  const bullish =
    data?.items.filter((i) => i.main_force === "accumulation" || i.main_force === "markup").length ?? 0;
  const bearish =
    data?.items.filter((i) => i.main_force === "distribution" || i.main_force === "washout").length ?? 0;

  const txt = t.zh;

  return (
    <main className="mx-auto max-w-[1440px] px-8 py-8 min-h-screen">
      <HeaderBar market="us" />

      {error && (
        <div className="glass mb-6 rounded-2xl border border-[#FF5D5D] p-4 text-sm text-[#FF5D5D]">
          {txt.errBackend}: {error}
          <br />
          <span className="text-[#9FB0C7]">{txt.errBackendTip}</span>
        </div>
      )}

      {data && (
        <section className="mb-8 grid grid-cols-4 gap-4">
          <KPI label={txt.kpiTop} value={top ? top.symbol : "—"} sub={top ? `${top.score} ${txt.kpiTopSub}` : ""} accent="#3EE6A8" />
          <KPI label={txt.kpiAvg} value={`${avgScore}`} sub={txt.kpiTop20} accent="#4DA3FF" />
          <KPI label={txt.kpiBullish} value={`${bullish}/20`} sub={txt.kpiBullishSub} accent="#3EE6A8" />
          <KPI label={txt.kpiBearish} value={`${bearish}/20`} sub={txt.kpiBearishSub} accent="#FF5D5D" />
        </section>
      )}

      <section className="glass rounded-2xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-[20px] font-semibold">{txt.tableTitle}</h2>
            <p className="mt-0.5 text-[12px] text-[#6E7C93]">
              {txt.tableSubtitle} {data?.source ?? "—"}
            </p>
          </div>
          <a
            href="/screener"
            className="rounded-lg border border-[#1D2A42] bg-[#0C1728] px-3 py-1.5 text-[12px] text-[#9FB0C7] hover:border-[#4DA3FF] hover:text-[#EAF2FF]"
          >
            {txt.fullScreener}
          </a>
        </div>

        {data && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#1D2A42] text-[11px] uppercase tracking-wider text-[#6E7C93]">
                  <th className="px-3 py-3 font-medium">{txt.rank}</th>
                  <th className="px-3 py-3 font-medium">{txt.symbol}</th>
                  <th className="px-3 py-3 font-medium">{txt.name}</th>
                  <th className="px-3 py-3 text-right font-medium">{txt.score}</th>
                  <th className="px-3 py-3 text-right font-medium">{txt.up}</th>
                  <th className="px-3 py-3 font-medium">{txt.risk}</th>
                  <th className="px-3 py-3 font-medium">{txt.mainforce}</th>
                  <th className="px-3 py-3 font-medium">{txt.sector}</th>
                  <th className="px-3 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((item, i) => (
                  <tr key={item.symbol} className="card-lift border-b border-[#1D2A42]/50 hover:bg-[rgba(77,163,255,0.04)]">
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
                        {item.risk === "low" ? txt.riskLow : item.risk === "medium" ? txt.riskMed : txt.riskHigh}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center gap-1.5 text-[12px] text-[#9FB0C7]">
                        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                          {mainForceIcon(item.main_force)}
                        </span>
                        {MAIN_FORCE_ZH[item.main_force] || item.main_force}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-[12px] text-[#6E7C93]">{item.sector}</td>
                    <td className="px-3 py-3 text-right">
                      <a href={`/stock/${item.symbol}`} className="text-[12px] text-[#4DA3FF] hover:underline">
                        {txt.details}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <footer className="mt-10 text-center text-[11px] text-[#6E7C93]">
        {txt.footer}
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
