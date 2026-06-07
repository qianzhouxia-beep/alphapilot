// AlphaPilot Screener — full top-20 with filters (M2)
// Stitch design system + mock data from backend
// 2026-06-07: 'use client' for relative-URL fetches (rewrites work in client only, not RSC)

"use client";

import Link from "next/link";

type ScreenerItem = {
  symbol: string;
  name: string;
  score: number;
  up_probability: number;
  risk: "low" | "medium" | "high";
  main_force: string;
  sector: string | null;
};

// Screener sub-page also goes through Next.js rewrite (same-origin, no CORS)
const SCREENER_API_PATH = "/api/backend/v1/screener/top";

async function fetchTop(n: number = 50): Promise<{ items: ScreenerItem[]; source: string }> {
  try {
    const res = await fetch(`${SCREENER_API_PATH}?n=${n}`, { cache: "no-store" });
    if (!res.ok) throw new Error("backend");
    return await res.json();
  } catch {
    return { items: [], source: "error" };
  }
}

const sectorStyles: Record<string, string> = {
  Technology: "text-[#4DA3FF]",
  "Communication Services": "text-[#7ddeff]",
  "Consumer Discretionary": "text-[#F5C451]",
  Financials: "text-[#35e0a3]",
  "Health Care": "text-[#35e0a3]",
  "Consumer Staples": "text-[#9FB0C7]",
  Energy: "text-[#FF5D5D]",
};

export default async function Screener() {
  const { items, source } = await fetchTop(50);

  const sectors = Array.from(new Set(items.map((i) => i.sector ?? "Other")));

  return (
    <main className="mx-auto max-w-[1440px] px-8 py-8 min-h-screen">
      <header className="mb-8">
        <a href="/" className="mb-2 inline-flex items-center gap-1 text-[12px] text-[#9FB0C7] hover:text-[#4DA3FF]">
          ← Back to Dashboard
        </a>
        <h1 className="text-[28px] font-semibold tracking-tight">AI Screener</h1>
        <p className="mt-1 text-[13px] text-[#9FB0C7]">
          {items.length} US stocks ranked by AI opportunity score &middot; Source: {source}
        </p>
      </header>

      {/* Filter chips */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-[11px] uppercase tracking-wider text-[#6E7C93] mr-2">Sectors</span>
        {sectors.map((s) => (
          <span
            key={s}
            className="rounded-full border border-[#1D2A42] bg-[#0C1728] px-3 py-1 text-[12px] text-[#9FB0C7] hover:border-[#4DA3FF] hover:text-[#EAF2FF] cursor-pointer"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Grid of cards */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.length === 0 && (
          <div className="col-span-3 glass rounded-2xl p-8 text-center text-[#9FB0C7]">
            Backend unreachable. Start it on port 8001.
          </div>
        )}
        {items.map((item) => (
          <Link
            key={item.symbol}
            href={`/stock/${item.symbol}`}
            className="glass card-lift block rounded-2xl p-5"
          >
            <div className="mb-3 flex items-start justify-between">
              <div>
                <div className="font-mono text-[18px] font-semibold text-[#4DA3FF]">
                  {item.symbol}
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
                Up <span className="text-[#EAF2FF] font-display-numeric">{item.up_probability}%</span>
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-[#1D2A42] pt-3 text-[11px]">
              <span className="capitalize text-[#9FB0C7]">
                {item.main_force.replace("_", " ")}
              </span>
              <span
                className={
                  item.risk === "low"
                    ? "text-[#3EE6A8]"
                    : item.risk === "medium"
                      ? "text-[#F5C451]"
                      : "text-[#FF5D5D]"
                }
              >
                {item.risk} risk
              </span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
