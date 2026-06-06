// AlphaPilot Frontend — Next.js 15 (App Router)
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8002";
    return [{ source: "/api/backend/:path*", destination: `${apiBase}/:path*` }];
  },
};

export default nextConfig;
