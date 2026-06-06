// AlphaPilot Stock Detail — AI Decision Card + Main Force Radar
// M2 2026-06-05: Stitch design system, mock decision data
// Ref: designs/stitch/alphapilot_component_ai/, alphapilot_stock_detail_v2/

import { notFound } from "next/navigation";

type ScreenerItem = {
  symbol: string;
  name: string;
  score: number;
  up_probability: number;
  risk: "low" | "medium" | "high";
  main_force: string;
  sector: string | null;
};

type DecisionCard = {
  symbol: string;
  score: number;
  confidence: number;
  up_probability: number;
  risk: "low" | "medium" | "high";
  main_force: string;
  next_action: string;
  buy_zone: [number, number];
  stop_loss: number;
  target_1: number;
  target_2: number;
  position_size: string;
  evidence: string[];
};

type MainForceRadar = {
  accumulation: number;
  washout: number;
  markup: number;
  distribution: number;
  bull_trap: number;
  bear_trap: number;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8001";

async function fetchFromBackend(path: string): Promise<any> {
  const res = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Backend ${res.status}`);
  return res.json();
}

// Mock decision data (W2: real Polygon + AI scoring)
function buildMockDecision(symbol: string, listItem?: ScreenerItem): DecisionCard {
  const basePrice = symbol === "AAPL" ? 201.45 : symbol === "NVDA" ? 920.13 : 100 + (symbol.charCodeAt(0) % 50);
  return {
    symbol,
    score: listItem?.score ?? 85,
    confidence: 78 + (symbol.charCodeAt(1) % 15),
    up_probability: listItem?.up_probability ?? 72,
    risk: listItem?.risk ?? "medium",
    main_force: listItem?.main_force ?? "accumulation",
    next_action: "Markup",
    buy_zone: [basePrice * 0.985, basePrice * 0.995],
    stop_loss: basePrice * 0.96,
    target_1: basePrice * 1.04,
    target_2: basePrice * 1.08,
    position_size: "20%",
    evidence: [
      "MACD Golden Cross on Daily",
      "6 days consecutive capital inflow",
      "Chip concentration rising (+4.2%)",
      "Volume breakout above 50-day MA",
      "RSI at 62 (neutral, room to run)",
    ],
  };
}

function buildMockRadar(symbol: string): MainForceRadar {
  // Deterministic mock by symbol hash
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

export default async function StockDetail({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  const upper = symbol.toUpperCase();

  // Try to find in screener top 20 to get real data
  let listItem: ScreenerItem | undefined;
  try {
    const top = await fetchFromBackend("/v1/screener/top?n=20");
    listItem = top.items?.find((i: ScreenerItem) => i.symbol === upper);
  } catch {
    // Backend down — use fully mock
  }

  if (!listItem) {
    // Allow any US ticker to view (M2: only screener top 20 + allow any uppercase 1-5 chars)
    if (!/^[A-Z]{1,5}$/.test(upper)) notFound();
  }

  const decision = buildMockDecision(upper, listItem);
  const radar = buildMockRadar(upper);
  const name = listItem?.name ?? `${upper} Inc.`;
  const sector = listItem?.sector ?? "Technology";
  const price = decision.buy_zone[1] + (decision.target_1 - decision.buy_zone[1]) * 0.4;
  const changePct = 1.24;

  return (
    <main className="mx-auto max-w-[1440px] px-8 py-8 min-h-screen">
      {/* Header */}
      <header className="mb-8 flex items-start justify-between">
        <div>
          <a
            href="/"
            className="mb-2 inline-flex items-center gap-1 text-[12px] text-[#9FB0C7] hover:text-[#4DA3FF]"
          >
            ← Back to Dashboard
          </a>
          <div className="flex items-baseline gap-4">
            <h1 className="text-[36px] font-semibold leading-none tracking-tight">
              {upper}
            </h1>
            <span className="text-[16px] text-[#9FB0C7]">{name}</span>
          </div>
          <p className="mt-1 text-[12px] text-[#6E7C93]">{sector}</p>
        </div>
        <div className="text-right">
          <div className="font-display-numeric text-[36px] text-[#EAF2FF]">
            ${price.toFixed(2)}
          </div>
          <div className="font-display-numeric text-[16px] text-[#3EE6A8]">
            +{changePct.toFixed(2)}%
          </div>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6">
        {/* LEFT: Decision Card (hero) */}
        <section className="col-span-1 glass-strong rounded-2xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-[#6E7C93]">
              AI Decision Card
            </span>
            <span className="rounded-full bg-[rgba(62,230,168,0.12)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#3EE6A8] border border-[rgba(62,230,168,0.3)]">
              AI Active
            </span>
          </div>

          {/* Score */}
          <div className="mb-4 text-center">
            <div className="mb-1 text-[11px] uppercase tracking-wider text-[#6E7C93]">
              Score
            </div>
            <div className="font-display-numeric text-[64px] leading-none text-[#3EE6A8]">
              {decision.score}
            </div>
            <div className="mt-2 text-[12px] text-[#9FB0C7]">
              Confidence <span className="text-[#EAF2FF]">{decision.confidence}%</span> &middot; Up probability{" "}
              <span className="text-[#EAF2FF]">{decision.up_probability}%</span>
            </div>
          </div>

          {/* Main force state */}
          <div className="mb-4 rounded-xl border border-[#1D2A42] bg-[#0C1728] p-3">
            <div className="mb-1 text-[10px] uppercase tracking-wider text-[#6E7C93]">
              Main Force
            </div>
            <div className="text-[18px] font-semibold capitalize text-[#4DA3FF]">
              {decision.main_force}
            </div>
            <div className="mt-1 text-[12px] text-[#9FB0C7]">
              Next: <span className="text-[#EAF2FF]">{decision.next_action}</span>
            </div>
          </div>

          {/* Buy/Sell zones */}
          <div className="mb-4 space-y-2 text-[13px]">
            <Row label="Buy Zone" value={`$${decision.buy_zone[0].toFixed(2)} – $${decision.buy_zone[1].toFixed(2)}`} color="#3EE6A8" />
            <Row label="Stop Loss" value={`$${decision.stop_loss.toFixed(2)}`} color="#FF5D5D" />
            <Row label="Target 1" value={`$${decision.target_1.toFixed(2)}`} color="#4DA3FF" />
            <Row label="Target 2" value={`$${decision.target_2.toFixed(2)}`} color="#4DA3FF" />
            <Row label="Position Size" value={decision.position_size} color="#EAF2FF" />
          </div>

          <div className="flex gap-2">
            <button className="flex-1 rounded-lg bg-[#4DA3FF] py-2 text-[13px] font-semibold text-[#00315b] hover:bg-[#7ddeff]">
              Buy
            </button>
            <button className="rounded-lg border border-[#1D2A42] px-4 py-2 text-[13px] text-[#9FB0C7] hover:border-[#4DA3FF] hover:text-[#EAF2FF]">
              Watchlist
            </button>
          </div>
        </section>

        {/* MIDDLE: Main Force Radar */}
        <section className="col-span-1 glass rounded-2xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[16px] font-semibold">Main Force Radar</h2>
            <span className="text-[11px] text-[#6E7C93]">6-Dimension</span>
          </div>
          <MainForceRadarChart data={radar} />
          <p className="mt-4 text-[11px] text-[#6E7C93]">
            Probability distribution across 6 main-force stages. Higher values indicate stronger signal.
          </p>
        </section>

        {/* RIGHT: Evidence Chain + Risk */}
        <section className="col-span-1 space-y-6">
          <div className="glass rounded-2xl p-5">
            <h3 className="mb-3 text-[14px] font-semibold">Evidence Chain</h3>
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
              <h3 className="text-[14px] font-semibold">Risk Assessment</h3>
              <span className="rounded-full bg-[rgba(245,196,81,0.12)] px-2 py-0.5 text-[10px] font-semibold uppercase text-[#F5C451] border border-[rgba(245,196,81,0.3)]">
                {decision.risk}
              </span>
            </div>
            <div className="space-y-2 text-[12px] text-[#9FB0C7]">
              <p>
                <span className="text-[#EAF2FF]">Invalidation:</span> Close below $
                {decision.stop_loss.toFixed(2)} on heavy volume
              </p>
              <p>
                <span className="text-[#EAF2FF]">Earnings:</span> Outside 14-day window
              </p>
              <p>
                <span className="text-[#EAF2FF]">Sector Beta:</span> Tech (1.12)
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Multi-period alignment (placeholder) */}
      <section className="mt-6 glass rounded-2xl p-6">
        <h2 className="mb-4 text-[16px] font-semibold">Multi-Period Alignment</h2>
        <div className="grid grid-cols-6 gap-3">
          {["5m", "15m", "30m", "60m", "Daily", "Weekly"].map((p, i) => {
            const align = [82, 75, 88, 71, 92, 68][i];
            const color = align >= 80 ? "#3EE6A8" : align >= 70 ? "#4DA3FF" : "#F5C451";
            return (
              <div key={p} className="rounded-xl border border-[#1D2A42] bg-[#0C1728] p-3 text-center">
                <div className="text-[10px] uppercase tracking-wider text-[#6E7C93]">{p}</div>
                <div className="mt-1 font-display-numeric text-[24px]" style={{ color }}>
                  {align}
                </div>
                <div className="mt-0.5 text-[10px] text-[#6E7C93]">
                  {align >= 80 ? "Bullish" : align >= 70 ? "Neutral" : "Caution"}
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-[12px] text-[#9FB0C7]">
          <span className="text-[#EAF2FF] font-semibold">Alignment Score: 81/100</span> &middot; 4 of 6 periods bullish.
          Higher alignment = stronger signal.
        </p>
      </section>

      <footer className="mt-10 text-center text-[11px] text-[#6E7C93]">
        AlphaPilot provides AI-assisted analysis for educational purposes only. Not investment advice.
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

// 6-axis radar chart (pure SVG, no deps)
function MainForceRadarChart({ data }: { data: MainForceRadar }) {
  const labels = [
    { key: "accumulation", label: "Accumulation" },
    { key: "markup", label: "Markup" },
    { key: "distribution", label: "Distribution" },
    { key: "washout", label: "Washout" },
    { key: "bull_trap", label: "Bull Trap" },
    { key: "bear_trap", label: "Bear Trap" },
  ] as const;

  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 110;
  const n = labels.length;
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;

  // Background rings
  const rings = [20, 40, 60, 80, 100];
  // Data polygon
  const points = labels
    .map((l, i) => {
      const v = data[l.key as keyof MainForceRadar];
      const r = (v / 100) * radius;
      const x = cx + r * Math.cos(angle(i));
      const y = cy + r * Math.sin(angle(i));
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background rings */}
        {rings.map((r) => (
          <circle
            key={r}
            cx={cx}
            cy={cy}
            r={(r / 100) * radius}
            fill="none"
            stroke="#1D2A42"
            strokeWidth="1"
            strokeDasharray={r === 100 ? "0" : "2 4"}
          />
        ))}
        {/* Axes */}
        {labels.map((_, i) => {
          const x = cx + radius * Math.cos(angle(i));
          const y = cy + radius * Math.sin(angle(i));
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="#1D2A42"
              strokeWidth="1"
            />
          );
        })}
        {/* Data polygon */}
        <polygon
          points={points}
          fill="rgba(77,163,255,0.2)"
          stroke="#4DA3FF"
          strokeWidth="2"
        />
        {/* Data points */}
        {labels.map((l, i) => {
          const v = data[l.key as keyof MainForceRadar];
          const r = (v / 100) * radius;
          const x = cx + r * Math.cos(angle(i));
          const y = cy + r * Math.sin(angle(i));
          return (
            <g key={l.key}>
              <circle cx={x} cy={y} r="3" fill="#4DA3FF" />
              <text
                x={cx + (radius + 18) * Math.cos(angle(i))}
                y={cy + (radius + 18) * Math.sin(angle(i))}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#9FB0C7"
                fontSize="11"
                fontFamily="Inter"
              >
                {l.label}
              </text>
              <text
                x={cx + (radius + 18) * Math.cos(angle(i))}
                y={cy + (radius + 18) * Math.sin(angle(i)) + 14}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#4DA3FF"
                fontSize="11"
                fontWeight="600"
                fontFamily="Inter"
              >
                {v}
              </text>
            </g>
          );
        })}
        {/* Center label */}
        <text x={cx} y={cy - 4} textAnchor="middle" fill="#6E7C93" fontSize="10" fontFamily="Inter">
          MAIN FORCE
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="#EAF2FF" fontSize="12" fontWeight="600" fontFamily="Inter">
          Accumulation
        </text>
      </svg>
    </div>
  );
}
