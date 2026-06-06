// HeaderBar — client component, i18n + auth + market status
// M2 2026-06-06: Boss pick 双市场+双语, A 方案 mock auth

"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";

export function HeaderBar({ market = "us" }: { market?: "us" | "cn" }) {
  const { locale, setLocale, t } = useI18n();
  const { session, logout } = useAuth();

  const otherLocale = locale === "zh-CN" ? "en" : "zh-CN";

  return (
    <header className="mb-6 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3">
        {/* 横版 logo_1 (header brand) — 已自带 "AlphaPilot" 字样, 不再写 h1 重复 */}
        <img src="/logo.png" alt="AlphaPilot" className="h-10 w-auto" width={120} height={40} />
        <p className="text-[12px] text-[#9FB0C7] hidden md:block">
          {t("site.subtitle")}
        </p>
      </Link>

      <div className="flex items-center gap-3">
        {/* Market tab (US / A 股) — Phase 3 独立路由就位后切换 */}
        <div className="flex items-center rounded-lg border border-[#1D2A42] bg-[#0C1728] p-0.5">
          <Link
            href="/us"
            className={`rounded-md px-3 py-1.5 text-[12px] font-medium ${
              market === "us"
                ? "bg-[#4DA3FF] text-[#00315b]"
                : "text-[#9FB0C7] hover:text-[#EAF2FF]"
            }`}
          >
            {t("market.us")}
          </Link>
          <Link
            href="/cn"
            className={`rounded-md px-3 py-1.5 text-[12px] font-medium ${
              market === "cn"
                ? "bg-[#4DA3FF] text-[#00315b]"
                : "text-[#9FB0C7] hover:text-[#EAF2FF]"
            }`}
          >
            {t("market.cn")}
          </Link>
        </div>

        {/* Market status pill */}
        <div className="hidden items-center gap-2 rounded-lg border border-[#1D2A42] bg-[#0C1728] px-3 py-2 md:flex">
          <span className="h-2 w-2 rounded-full bg-[#3EE6A8]"></span>
          <span className="text-[11px] text-[#9FB0C7]">
            {market === "cn" ? t("market.status.open.cn") : t("market.status.open")}
          </span>
        </div>

        {/* Language toggle */}
        <button
          onClick={() => setLocale(otherLocale)}
          className="rounded-lg border border-[#1D2A42] bg-[#0C1728] px-3 py-2 text-[12px] text-[#9FB0C7] hover:border-[#4DA3FF] hover:text-[#EAF2FF]"
          title={locale === "zh-CN" ? "Switch to English" : "切换到中文"}
        >
          🌐 {t("lang.toggle")}
        </button>

        {/* Auth state */}
        {session ? (
          <div className="flex items-center gap-2 rounded-lg border border-[#1D2A42] bg-[#0C1728] px-3 py-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#4DA3FF] to-[#7ddeff] text-[11px] font-semibold text-[#00315b]">
              {session.user.full_name.charAt(0).toUpperCase()}
            </div>
            <div className="text-left">
              <div className="text-[12px] text-[#EAF2FF]">{session.user.full_name}</div>
              <div className="text-[10px] uppercase tracking-wider text-[#6E7C93]">
                {session.user.plan}
              </div>
            </div>
            <button
              onClick={logout}
              className="ml-2 text-[11px] text-[#6E7C93] hover:text-[#FF5D5D]"
            >
              {t("auth.signout")}
            </button>
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="rounded-lg border border-[#1D2A42] bg-[#0C1728] px-3 py-2 text-[12px] text-[#9FB0C7] hover:border-[#4DA3FF] hover:text-[#EAF2FF]"
            >
              {t("auth.signin")}
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-[#4DA3FF] px-3 py-2 text-[12px] font-semibold text-[#00315b] hover:bg-[#7ddeff]"
            >
              {t("auth.signup")}
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
