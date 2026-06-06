// AlphaPilot A 股 Screener — full A-shares list (M2)
// Boss pick 全 A + 沪深 300 起步, 25 龙头 mock

import { HeaderBar } from "@/components/HeaderBar";
import { cnTopN } from "@/lib/cn-mock";

const RISK_ZH = { low: "低", medium: "中", high: "高" } as const;
const MAIN_FORCE_ZH: Record<string, string> = {
  accumulation: "吸筹",
  markup: "拉升",
  distribution: "出货",
  washout: "洗盘",
  reaccumulation: "二次吸筹",
  bull_trap: "诱多",
  bear_trap: "诱空",
};

const sectorStyles: Record<string, string> = {
  "白酒": "text-[#F5C451]",
  "银行": "text-[#35e0a3]",
  "保险": "text-[#35e0a3]",
  "新能源": "text-[#4DA3FF]",
  "新能源车": "text-[#4DA3FF]",
  "光伏": "text-[#4DA3FF]",
  "医药": "text-[#3EE6A8]",
  "医疗器械": "text-[#3EE6A8]",
  "家电": "text-[#7ddeff]",
  "食品饮料": "text-[#9FB0C7]",
  "旅游零售": "text-[#7ddeff]",
  "AI": "text-[#4DA3FF]",
  "消费电子": "text-[#4DA3FF]",
  "券商": "text-[#F5C451]",
  "石油石化": "text-[#FF5D5D]",
  "农牧": "text-[#3EE6A8]",
};

export default async function CNScreener() {
  const items = cnTopN(25);
  const sectors = Array.from(new Set(items.map((i) => i.sector ?? "其他")));

  return (
    <main className="mx-auto max-w-[1440px] px-8 py-8 min-h-screen">
      <HeaderBar market="cn" />

      <header className="mb-6">
        <a href="/cn" className="mb-2 inline-flex items-center gap-1 text-[12px] text-[#9FB0C7] hover:text-[#4DA3FF]">
          ← 返回 A 股首页
        </a>
        <h1 className="text-[28px] font-semibold tracking-tight">A 股智能选股</h1>
        <p className="mt-1 text-[13px] text-[#9FB0C7]">
          {items.length} 只 A 股龙头 AI 评分排序 · 起步 mock (沪深 300 主流) · W3 接入 Tushare 整池
        </p>
      </header>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-[11px] uppercase tracking-wider text-[#6E7C93] mr-2">行业</span>
        {sectors.map((s) => (
          <span
            key={s}
            className="rounded-full border border-[#1D2A42] bg-[#0C1728] px-3 py-1 text-[12px] text-[#9FB0C7] hover:border-[#4DA3FF] hover:text-[#EAF2FF] cursor-pointer"
          >
            {s}
          </span>
        ))}
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <a
            key={item.symbol}
            href={`/cn/stock/${item.symbol}`}
            className="glass card-lift block rounded-2xl p-5"
          >
            <div className="mb-3 flex items-start justify-between">
              <div>
                <div className="font-mono text-[18px] font-semibold text-[#4DA3FF]">
                  {item.symbol.replace(/\..*/, "")}
                </div>
                <div className="mt-0.5 text-[12px] text-[#9FB0C7]">{item.name}</div>
              </div>
              <div className="font-display-numeric text-[36px] text-[#3EE6A8]">
                {item.score}
              </div>
            </div>
            <div className="mb-3 flex items-center justify-between text-[11px]">
              <span className={`uppercase tracking-wider ${sectorStyles[item.sector ?? ""] ?? "text-[#6E7C93]"}`}>
                {item.sector}
              </span>
              <span className="text-[#9FB0C7]">
                上涨 <span className="text-[#EAF2FF] font-display-numeric">{item.up_probability}%</span>
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-[#1D2A42] pt-3 text-[11px]">
              <span className="text-[#9FB0C7]">
                {MAIN_FORCE_ZH[item.main_force]}
              </span>
              <span
                className={
                  item.risk === "low" ? "text-[#3EE6A8]" : item.risk === "medium" ? "text-[#F5C451]" : "text-[#FF5D5D]"
                }
              >
                {RISK_ZH[item.risk]} 风险
              </span>
            </div>
          </a>
        ))}
      </section>
    </main>
  );
}
