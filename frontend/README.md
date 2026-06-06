# AlphaPilot Frontend — Next.js 15 (App Router)

> AI Stock Decision Platform — US market only.
> Pairs with `../backend/` (FastAPI on port 8001).

## Quick Start

```powershell
cd D:\MavisProjects\alphapilot\frontend

# Install deps (first time only, ~3-5 min)
npm install

# Copy env example to local
copy .env.example .env.local

# Start dev server
npm run dev
```

Open http://localhost:3000 — Dashboard fetches top-20 opportunities from backend.

## Architecture

- **Framework**: Next.js 15.1 + React 19 + TypeScript 5.7
- **Styling**: TailwindCSS v4 (PostCSS plugin)
- **Pages**:
  - `/` — Dashboard (Top 20 opportunities)
  - `/screener` — Full screener (W2)
  - `/stock/[symbol]` — Stock detail with decision card (W2)
  - `/billing` — Stripe checkout (W3)
- **Proxy**: `/api/backend/*` → `localhost:8001/*` (Next.js rewrites, dev only)
- **Color tokens**: defined in `app/globals.css` per `AlphaPilot_Design.md`

## Production Build

```powershell
npm run build
npm start
```

## W2 路线图 (2026-06-05 → 2026-06-12)

- [x] M1: Next.js 15 skeleton + Dashboard fetching mock data
- [ ] M2: Stock detail page + decision card mock + main force radar
- [ ] M3: Auth (JWT) + protected routes
- [ ] M4: TypeScript strict + ESLint
- [ ] M5: Production build + deploy preview

## W3-W4 (激进版 2 周 demo, 2026-06-19 截止)

- [ ] Stripe sandbox integration
- [ ] Subscription flow
- [ ] AI scoring (mock + light GBM)
- [ ] Beta invite flow (50 US users)
- [ ] Production deploy to Zeabur
