// AlphaPilot Frontend — Next.js 15 (App Router)
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  async rewrites() {
    // BUG FIX 2026-06-07: previously read NEXT_PUBLIC_API_BASE which was unset in prod
    // (L1 set NEXT_PUBLIC_API_URL instead). Fallback now points at the real Zeabur
    // backend so rewrites work even if no env is set. Order of preference:
    //   1. NEXT_PUBLIC_API_URL (L1's env var, set to Cloudflare-fronted URL in prod)
    //   2. NEXT_PUBLIC_API_BASE (legacy name, kept for backward compat)
    //   3. Hardcoded Zeabur backend URL (fallback for prod with no env set)
    //   4. localhost:8002 (dev fallback only)
    const apiBase =
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.NEXT_PUBLIC_API_BASE ||
      "https://alphapilot-backend.zeabur.app";
    return [{ source: "/api/backend/:path*", destination: `${apiBase}/:path*` }];
  },
};

export default nextConfig;
