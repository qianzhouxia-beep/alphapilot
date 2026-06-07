// AlphaPilot Frontend — Next.js 15 (App Router)
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  // 2026-06-07: removed rewrites() — pages now use absolute Zeabur URL directly,
  // no env lookup, no rewrite, no CORS surprise.
};

export default nextConfig;
