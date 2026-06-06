// AlphaPilot A 股 Stock Detail — AI 决策卡 + 主力意图雷达
// M2 2026-06-06: Boss pick 双市场+双语, A 股 mock 数据

import { HeaderBar } from "@/components/HeaderBar";
import { notFound } from "next/navigation";
import { cnTopN } from "@/lib/cn-mock";
import type { ScreenerItem } from "@/lib/types";

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

function buildMockDecision(symbol: string, listItem?: ScreenerItem) {
  // 简单确定性 mock — 按 hash 算 6 位代码的"当前价"
  const seed = symbol.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const code = symbol.split(".")[0];
  const basePrice = 30 + (seed % 800); // 30-830 元
  return {
    symbol,
    score: listItem?.score ?? 85,
    confidence: 70 + (seed % 25),
    up_probability: listItem?.up_probability ?? 70,
    risk: listItem?.risk ?? "medium" as const,
    main_force: listItem?.main_force ?? "accumulation",
    next_action: "Markup",
    buy_zone: [basePrice * 0.97, basePrice * 0.99] as [number, number],
    stop_loss: basePrice * 0.94,
    target_1: basePrice * 1.05,
    target_2: basePrice * 1.10,
    position_size: "20%",
    evidence: [
      "MACD 日线金叉",
      "连续 5 日主力净流入",
      "筹码集中度上升 (+3.8%)",
      "成交量突破 50 日均线",
      "RSI 处于 58 (中性偏多, 有上行空间)",
    ],
    sector: listItem?.sector ?? "综合",
    name: listItem?.name ?? code,
    code,
    basePrice,
  };
}

function buildMockRadar(symbol: string) {
  const seed = symbol.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return {
    accumulation: 50 + (seed % 40),
    washout: 10 + (seed % 20),
    markup: 55 + (seed % 35),
    distribution: 5 + (seed % 15),
    bull_trap: 5 + (seed % 12),
    bear_trap: 8 + (seed % 15),
  };
}

export default async function CNStockDetail({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  const upper = symbol.toUpperCase();

  // 查 A 股 mock 池
  const listItem = cnTopN(25).find((i) => i.symbol === upper);
  if (!listItem) {
    // 允许 6 位代码 (.SH / .SZ) — 模糊查找
    const fuzzy = cnTopN(25).find((i) => i.symbol.replace(/\..*/, "") === upper.replace(/\..*/, ""));
    if (!fuzzy) notFound();
  }

  const decision = buildMockDecision(upper, listItem);
  const radar = buildMockRadar(upper);
  const price = decision.buy_zone[1] + (decision.target_1 - decision.buy_zone[1]) * 0.4;
  const changePct = 1.24;

  return (
    <main className="mx-auto max-w-[1440px] px-8 py-8 min-h-screen">
      <HeaderBar market="cn" />

      {/* Header */}
      <header className="mb-8 flex items-start justify-between">
        <div>
          <a
            href="/cn"
            className="mb-2 inline-flex items-center gap-1 text-[12px] text-[#9FB0C7] hover:text-[#4DA3FF]"
          >
            ← 返回 A 股首页
          </a>
          <div className="flex items-baseline gap-4">
            <h1 className="font-mono text-[32px] font-semibold leading-none tracking-tight text-[#4DA3FF]">
              {decision.code}
            </h1>
            <span className="text-[18px] text-[#EAF2FF]">{decision.name}</span>
          </div>
          <p className="mt-1 text-[12px] text-[#6E7C93]">{decision.sector} · {upper}</p>
        </div>
        <div className="text-right">
          <div className="font-display-numeric text-[36px] text-[#EAF2FF]">
            ¥{price.toFixed(2)}
          </div>
          <div className="font-display-numeric text-[16px] text-[#3EE6A8]">
            +{changePct.toFixed(2)}%
          </div>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6">
        {/* LEFT: 决策卡 */}
        <section className="col-span-1 glass-strong rounded-2xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-[#6E7C93]">AI 决策卡</span>
            <span className="rounded-full bg-[rgba(62,230,168,0.12)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#3EE6A8] border border-[rgba(62,230,168,0.3)]">
              AI 活跃
            </span>
          </div>

          <div className="mb-4 text-center">
            <div className="mb-1 text-[11px] uppercase tracking-wider text-[#6E7C93]">综合评分</div>
            <div className="font-display-numeric text-[64px] leading-none text-[#3EE6A8]">{decision.score}</div>
            <div className="mt-2 text-[12px] text-[#9FB0C7]">
              置信度 <span className="text-[#EAF2FF]">{decision.confidence}%</span> · 上涨概率{" "}
              <span className="text-[#EAF2FF]">{decision.up_probability}%</span>
            </div>
          </div>

          <div className="mb-4 rounded-xl border border-[#1D2A42] bg-[#0C1728] p-3">
            <div className="mb-1 text-[10px] uppercase tracking-wider text-[#6E7C93]">主力状态</div>
            <div className="text-[18px] font-semibold text-[#4DA3FF]">
              {MAIN_FORCE_ZH[decision.main_force]}
            </div>
            <div className="mt-1 text-[12px] text-[#9FB0C7]">
              下一步: <span className="text-[#EAF2FF]">{MAIN_FORCE_ZH[decision.next_action.toLowerCase()] || decision.next_action}</span>
            </div>
          </div>

          <div className="mb-4 space-y-2 text-[13px]">
            <Row label="买入区间" value={`¥${decision.buy_zone[0].toFixed(2)} – ¥${decision.buy_zone[1].toFixed(2)}`} color="#3EE6A8" />
            <Row label="止损位" value={`¥${decision.stop_loss.toFixed(2)}`} color="#FF5D5D" />
            <Row label="目标 1" value={`¥${decision.target_1.toFixed(2)}`} color="#4DA3FF" />
            <Row label="目标 2" value={`¥${decision.target_2.toFixed(2)}`} color="#4DA3FF" />
            <Row label="建议仓位" value={decision.position_size} color="#EAF2FF" />
            <Row label="风险等级" value={RISK_ZH[decision.risk]} color={decision.risk === "low" ? "#3EE6A8" : decision.risk === "medium" ? "#F5C451" : "#FF5D5D"} />
          </div>

          <div className="flex gap-2">
            <button className="flex-1 rounded-lg bg-[#4DA3FF] py-2 text-[13px] font-semibold text-[#00315b] hover:bg-[#7ddeff]">
              买入
            </button>
            <button className="rounded-lg border border-[#1D2A42] px-4 py-2 text-[13px] text-[#9FB0C7] hover:border-[#4DA3FF] hover:text-[#EAF2FF]">
              加自选
            </button>
          </div>
        </section>

        {/* MIDDLE: 主力意图雷达 */}
        <section className="col-span-1 glass rounded-2xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[16px] font-semibold">主力意图雷达</h2>
            <span className="text-[11px] text-[#6E7C93]">6 维度</span>
          </div>
          <Radar data={radar} />
          <p className="mt-4 text-[11px] text-[#6E7C93]">
            主力 6 阶段概率分布,值越高信号越强。
          </p>
        </section>

        {/* RIGHT: 证据链 + 风险 */}
        <section className="col-span-1 space-y-6">
          <div className="glass rounded-2xl p-5">
            <h3 className="mb-3 text-[14px] font-semibold">证据链</h3>
            <ul className="space-y-2 text-[12px]">
              {decision.evidence.map((e, i) => (
                <li key={i} className="flex items-start gap-2 text-[#9FB0C7]">
                  <span className="material-symbols-outlined text-[#3EE6A8]" style={{ fontSize: 16 }}>
                    check_circle
                  </span>
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-2xl border border-[rgba(245,196,81,0.3)] p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[14px] font-semibold">风险提示</h3>
              <span className="rounded-full bg-[rgba(245,196,81,0.12)] px-2 py-0.5 text-[10px] font-semibold uppercase text-[#F5C451] border border-[rgba(245,196,81,0.3)]">
                {RISK_ZH[decision.risk]}
              </span>
            </div>
            <div className="space-y-2 text-[12px] text-[#9FB0C7]">
              <p>
                <span className="text-[#EAF2FF]">失效条件:</span> 收盘跌破 ¥
                {decision.stop_loss.toFixed(2)} (放量)
              </p>
              <p>
                <span className="text-[#EAF2FF]">财报:</span> 14 天内无窗口
              </p>
              <p>
                <span className="text-[#EAF2FF]">行业 Beta:</span> {decision.sector} (1.05)
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 多周期 */}
      <section className="mt-6 glass rounded-2xl p-6">
        <h2 className="mb-4 text-[16px] font-semibold">多周期共振</h2>
        <div className="grid grid-cols-6 gap-3">
          {(["5m", "15m", "30m", "60m", "日线", "周线"] as const).map((p, i) => {
            const align = [82, 75, 88, 71, 92, 68][i];
            const color = align >= 80 ? "#3EE6A8" : align >= 70 ? "#4DA3FF" : "#F5C451";
            const lbl = align >= 80 ? "看多" : align >= 70 ? "中性" : "谨慎";
            return (
              <div key={p} className="rounded-xl border border-[#1D2A42] bg-[#0C1728] p-3 text-center">
                <div className="text-[10px] uppercase tracking-wider text-[#6E7C93]">{p}</div>
                <div className="mt-1 font-display-numeric text-[24px]" style={{ color }}>
                  {align}
                </div>
                <div className="mt-0.5 text-[10px] text-[#6E7C93]">{lbl}</div>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-[12px] text-[#9FB0C7]">
          <span className="text-[#EAF2FF] font-semibold">周期共振评分: 81/100</span> · 6 周期中 4 个看多,共振越强信号越稳。
        </p>
      </section>

      <footer className="mt-10 text-center text-[11px] text-[#6E7C93]">
        AlphaPilot 提供 AI 辅助分析,仅供教育用途,非投资建议。过往表现不保证未来收益。所有概率为估计值,非保证。
        <br />
        A 股内容仅供在美华人教育用途,非中国境内投顾服务 / A-share content for educational purposes only, not investment advice in mainland China.
      </footer>
    </main>
  );
}

function Row({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#6E7C93]">{label}</span>
      <span className="font-display-numeric text-[14px]" style={{ color }}>
        {value}
      </span>
    </div>
  );
}

// 6 轴雷达图 (SVG)
function Radar({ data }: { data: { accumulation: number; washout: number; markup: number; distribution: number; bull_trap: number; bear_trap: number } }) {
  const labels = [
    { key: "accumulation", label: "吸筹" },
    { key: "markup", label: "拉升" },
    { key: "distribution", label: "出货" },
    { key: "washout", label: "洗盘" },
    { key: "bull_trap", label: "诱多" },
    { key: "bear_trap", label: "诱空" },
  ] as const;
  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 110;
  const n = labels.length;
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const rings = [20, 40, 60, 80, 100];
  const points = labels.map((l, i) => {
    const v = data[l.key];
    const r = (v / 100) * radius;
    return `${cx + r * Math.cos(angle(i))},${cy + r * Math.sin(angle(i))}`;
  }).join(" ");

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} className="overflow-visible">
        {rings.map((r) => (
          <circle key={r} cx={cx} cy={cy} r={(r / 100) * radius} fill="none" stroke="#1D2A42" strokeWidth="1" strokeDasharray={r === 100 ? "0" : "2 4"} />
        ))}
        {labels.map((_, i) => {
          const x = cx + radius * Math.cos(angle(i));
          const y = cy + radius * Math.sin(angle(i));
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#1D2A42" strokeWidth="1" />;
        })}
        <polygon points={points} fill="rgba(77,163,255,0.2)" stroke="#4DA3FF" strokeWidth="2" />
        {labels.map((l, i) => {
          const v = data[l.key];
          const r = (v / 100) * radius;
          const x = cx + r * Math.cos(angle(i));
          const y = cy + r * Math.sin(angle(i));
          return (
            <g key={l.key}>
              <circle cx={x} cy={y} r="3" fill="#4DA3FF" />
              <text x={cx + (radius + 18) * Math.cos(angle(i))} y={cy + (radius + 18) * Math.sin(angle(i))} textAnchor="middle" dominantBaseline="middle" fill="#9FB0C7" fontSize="11" fontFamily="Inter">
                {l.label}
              </text>
              <text x={cx + (radius + 18) * Math.cos(angle(i))} y={cy + (radius + 18) * Math.sin(angle(i)) + 14} textAnchor="middle" dominantBaseline="middle" fill="#4DA3FF" fontSize="11" fontWeight="600" fontFamily="Inter">
                {v}
              </text>
            </g>
          );
        })}
        <text x={cx} y={cy - 4} textAnchor="middle" fill="#6E7C93" fontSize="10" fontFamily="Inter">主力意图</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="#EAF2FF" fontSize="12" fontWeight="600" fontFamily="Inter">吸筹</text>
      </svg>
    </div>
  );
}
