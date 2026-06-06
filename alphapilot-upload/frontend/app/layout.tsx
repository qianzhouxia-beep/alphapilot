import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { LocaleProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "AlphaPilot — AI 股票智能决策平台 / AI Stock Intelligence",
  description:
    "AI-Powered Stock Intelligence & Trading Decision Platform. 美股 / A 股 双市场,中文 + 英文双语切换。",
  icons: { icon: "/favicon.png" },
  openGraph: {
    title: "AlphaPilot — AI 股票智能决策平台",
    description: "美股 + A 股 双市场,中文 + 英文 双语切换",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-[#07111F] text-[#EAF2FF] antialiased">
        <LocaleProvider>
          <AuthProvider>{children}</AuthProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
