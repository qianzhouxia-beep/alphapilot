// AlphaPilot A 股 Billing — PayPal sandbox
// 老板 L1 09:23 拍板: PayPal 接入, Stripe 暂不做
// M2 stub UI (老板 L1 还没给 sandbox client_id/secret), M3 真接 PayPal SDK
// 流程: 看 3 档定价 -> 点 "Subscribe" -> 调 /api/paypal/create-order -> 跳 PayPal
//       -> PayPal 完成 -> 跳回 /billing/success -> 后端 capture + 升级 plan

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HeaderBar } from "@/components/HeaderBar";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";

type Plan = {
  id: string;
  label: string;
  price_usd: number;
  features: string[];
};

const PLANS_CN: Plan[] = [
  {
    id: "starter",
    label: "Starter",
    price_usd: 29,
    features: [
      "5 个观察股",
      "每日 1 次 AI 评分",
      "基础决策卡",
      "邮件支持",
    ],
  },
  {
    id: "pro",
    label: "Pro",
    price_usd: 99,
    features: [
      "50 个观察股",
      "不限 AI 评分",
      "主力意图雷达",
      "回测 + 多周期共振",
      "优先支持",
    ],
  },
  {
    id: "elite",
    label: "Elite",
    price_usd: 299,
    features: [
      "不限观察股",
      "美股 + A 股 + 期权",
      "API 接入",
      "白手套客服",
      "Beta 功能优先",
    ],
  },
];

export default function BillingCN() {
  const { t } = useI18n();
  const { session } = useAuth();
  const [paypalMode, setPaypalMode] = useState<"sandbox" | "live" | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/paypal/config")
      .then((r) => r.json())
      .then((d) => setPaypalMode(d.mode))
      .catch(() => setPaypalMode(null));
  }, []);

  async function subscribe(planId: string) {
    if (!session) {
      window.location.href = "/login?next=/cn/billing";
      return;
    }
    setLoading(planId);
    setError(null);
    try {
      const r = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan_id: planId, user_email: session.user.email }),
      });
      if (!r.ok) throw new Error("create-order failed");
      const { approval_url } = await r.json();
      window.location.href = approval_url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      setLoading(null);
    }
  }

  return (
    <main className="mx-auto max-w-[1440px] px-8 py-8 min-h-screen">
      <HeaderBar market="cn" />

      <header className="mb-8">
        <a href="/cn" className="mb-2 inline-flex items-center gap-1 text-[12px] text-[#9FB0C7] hover:text-[#4DA3FF]">
          ← 返回 A 股首页
        </a>
        <h1 className="text-[28px] font-semibold tracking-tight">订阅 AlphaPilot</h1>
        <p className="mt-1 text-[13px] text-[#9FB0C7]">
          7 天免费试用 · 随时取消 · PayPal 支付 {paypalMode && <span className="ml-2 rounded-full bg-[rgba(77,163,255,0.12)] px-2 py-0.5 text-[10px] text-[#4DA3FF] border border-[rgba(77,163,255,0.3)]">模式: {paypalMode}</span>}
        </p>
      </header>

      {error && (
        <div className="glass mb-6 rounded-2xl border border-[#FF5D5D] p-4 text-sm text-[#FF5D5D]">
          PayPal 错误: {error}
          <br />
          <span className="text-[#9FB0C7]">提示: 老板 L1 需在 PayPal Dashboard 创建 sandbox app, 配 PAYPAL_CLIENT_ID/SECRET env</span>
        </div>
      )}

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {PLANS_CN.map((p) => (
          <div
            key={p.id}
            className={`glass card-lift rounded-2xl p-6 ${
              p.id === "pro" ? "border-[#4DA3FF] ring-1 ring-[#4DA3FF]/30" : ""
            }`}
          >
            {p.id === "pro" && (
              <div className="mb-2 text-center">
                <span className="rounded-full bg-[#4DA3FF] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#00315b]">
                  最受欢迎
                </span>
              </div>
            )}
            <div className="mb-4 text-center">
              <h3 className="text-[20px] font-semibold">{p.label}</h3>
              <div className="mt-2 flex items-baseline justify-center gap-1">
                <span className="font-display-numeric text-[36px] text-[#3EE6A8]">
                  ${p.price_usd}
                </span>
                <span className="text-[14px] text-[#9FB0C7]">/月</span>
              </div>
            </div>
            <ul className="mb-6 space-y-2 text-[13px]">
              {p.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-[#9FB0C7]">
                  <span className="material-symbols-outlined text-[#3EE6A8]" style={{ fontSize: 16 }}>
                    check_circle
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => subscribe(p.id)}
              disabled={loading === p.id}
              className={`w-full rounded-lg py-2.5 text-[14px] font-semibold transition-colors ${
                p.id === "pro"
                  ? "bg-[#4DA3FF] text-[#00315b] hover:bg-[#7ddeff]"
                  : "border border-[#1D2A42] bg-[#0C1728] text-[#9FB0C7] hover:border-[#4DA3FF] hover:text-[#EAF2FF]"
              } disabled:opacity-50`}
            >
              {loading === p.id ? "正在跳转 PayPal..." : `订阅 ${p.label}`}
            </button>
          </div>
        ))}
      </section>

      <section className="mt-10 glass rounded-2xl p-6">
        <h2 className="mb-4 text-[16px] font-semibold">支付流程</h2>
        <ol className="space-y-2 text-[13px] text-[#9FB0C7]">
          <li>1. 选择套餐 → 点订阅</li>
          <li>2. 跳转到 PayPal (sandbox 模式, 用 sandbox 账号测)</li>
          <li>3. PayPal 完成支付 → 自动跳回 AlphaPilot</li>
          <li>4. 后端 capture 订单 → 升级用户 plan → 解锁 Pro/Elite 功能</li>
        </ol>
        <p className="mt-4 text-[11px] text-[#6E7C93]">
          M2 stub: PayPal SDK 代码已写, 需老板 L1 在 https://developer.paypal.com/dashboard 创建 sandbox app, 把 client_id/secret 配到 Zeabur env, 即可真接。
        </p>
      </section>

      <footer className="mt-10 text-center text-[11px] text-[#6E7C93]">
        AlphaPilot 提供 AI 辅助分析,仅供教育用途,非投资建议。
        <br />
        A 股内容仅供在美华人教育用途,非中国境内投顾服务。
      </footer>
    </main>
  );
}
