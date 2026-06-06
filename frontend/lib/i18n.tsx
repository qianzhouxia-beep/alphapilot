"use client";

/**
 * i18n (M2 2026-06-06 — Boss pick 双市场+双语)
 *
 * - 默认从浏览器 Accept-Language + navigator.language 判断
 * - 用户手动 toggle 后存 localStorage,覆盖默认
 * - 翻译 key-value 字典 (zh-CN / en)
 * - W3 可换 next-intl,但 M2 mock 够用
 */

import { createContext, useContext, useEffect, useState } from "react";

export type Locale = "zh-CN" | "en";

const STORAGE_KEY = "alphapilot_locale";

type Dict = Record<string, string>;
const zhCN: Dict = {
  "site.title": "AlphaPilot — AI 股票智能决策平台",
  "site.subtitle": "AI-Powered Stock Intelligence · 美股 + A 股 双市场",
  "market.us": "美股",
  "market.cn": "A 股",
  "market.status.open": "美股交易中",
  "market.status.open.cn": "A 股交易中",
  "kpi.top": "最佳机会",
  "kpi.avg": "平均评分",
  "kpi.bullish": "看多信号",
  "kpi.bearish": "看空信号",
  "kpi.score": "评分",
  "kpi.top20": "Top 20",
  "kpi.bullish.sub": "吸筹 + 拉升",
  "kpi.bearish.sub": "出货 + 洗盘",
  "table.title": "Top 20 机会",
  "table.subtitle": "AI 评分美股 + A 股 · 数据源:",
  "table.fullScreener": "完整选股 →",
  "table.col.rank": "#",
  "table.col.symbol": "代码",
  "table.col.name": "名称",
  "table.col.score": "评分",
  "table.col.up": "上涨%",
  "table.col.risk": "风险",
  "table.col.mainforce": "主力状态",
  "table.col.sector": "行业",
  "table.col.action": "操作",
  "table.details": "详情 →",
  "risk.low": "低",
  "risk.medium": "中",
  "risk.high": "高",
  "auth.signin": "登录",
  "auth.signup": "注册",
  "auth.signout": "退出",
  "auth.plan": "套餐",
  "auth.signup.title": "创建账户",
  "auth.signup.subtitle": "7 天免费试用开始",
  "auth.signin.title": "登录",
  "auth.signin.subtitle": "欢迎回来",
  "auth.field.name": "姓名",
  "auth.field.email": "邮箱",
  "auth.field.password": "密码",
  "auth.field.password.signup": "密码 (8+ 字符)",
  "auth.submit.signup": "创建账户",
  "auth.submit.signin": "登录",
  "auth.toSignup": "还没有账户?",
  "auth.toSignin": "已有账户?",
  "auth.create": "立即注册",
  "auth.signin.link": "去登录",
  "auth.mock.note": "M2 模拟登录 (localStorage) · W3 接入真后端",
  "screener.title": "AI 智能选股",
  "screener.subtitle": "只股票 AI 评分排序",
  "screener.filter.sectors": "行业筛选",
  "screener.empty": "后端未连接,请启动后端在 8002 端口",
  "stock.back": "← 返回",
  "stock.tabs.decision": "AI 决策卡",
  "stock.tabs.ai": "AI 评分",
  "stock.tabs.radar": "主力意图",
  "stock.tabs.evidence": "证据链",
  "stock.tabs.risk": "风险",
  "stock.tabs.multi": "多周期",
  "stock.decision.score": "综合评分",
  "stock.decision.confidence": "置信度",
  "stock.decision.up": "上涨概率",
  "stock.decision.mainforce": "主力状态",
  "stock.decision.next": "下一步",
  "stock.decision.buyzone": "买入区间",
  "stock.decision.stoploss": "止损位",
  "stock.decision.target1": "目标 1",
  "stock.decision.target2": "目标 2",
  "stock.decision.position": "建议仓位",
  "stock.decision.buy": "买入",
  "stock.decision.watch": "加自选",
  "stock.risk.level": "风险等级",
  "stock.risk.invalidation": "失效条件",
  "stock.risk.earnings": "财报",
  "stock.risk.beta": "行业 Beta",
  "stock.multi.alignment": "周期共振",
  "stock.multi.bullish": "看多",
  "stock.multi.neutral": "中性",
  "stock.multi.caution": "谨慎",
  "lang.toggle": "EN",
  "footer.disclaimer":
    "AlphaPilot 提供 AI 辅助分析,仅供教育用途,非投资建议。过往表现不保证未来收益。所有概率为估计值,非保证。",
  "footer.disclaimer.en":
    "AlphaPilot provides AI-assisted analysis for educational purposes only. Not investment advice. Past performance does not guarantee future results.",
  "error.backend": "后端无法连接",
  "error.backend.tip": "提示:请确认后端运行在 localhost:8002",
  "tab.us": "美股 / US",
  "tab.cn": "A 股 / China",
  "tab.home": "首页",
  "tab.screener": "选股",
  "mainforce.accumulation": "吸筹",
  "mainforce.markup": "拉升",
  "mainforce.distribution": "出货",
  "mainforce.washout": "洗盘",
  "mainforce.reaccumulation": "二次吸筹",
  "mainforce.bull_trap": "诱多",
  "mainforce.bear_trap": "诱空",
  "loading": "加载中…",
};

const en: Dict = {
  "site.title": "AlphaPilot — AI Stock Intelligence",
  "site.subtitle": "AI-Powered Stock Intelligence · US + China A-Shares",
  "market.us": "US",
  "market.cn": "China A",
  "market.status.open": "US Market Open",
  "market.status.open.cn": "A-Shares Open",
  "kpi.top": "Top Opportunity",
  "kpi.avg": "Avg Score",
  "kpi.bullish": "Bullish",
  "kpi.bearish": "Bearish",
  "kpi.score": "score",
  "kpi.top20": "Top 20",
  "kpi.bullish.sub": "Accumulation + Markup",
  "kpi.bearish.sub": "Distribution + Washout",
  "table.title": "Top 20 Opportunities",
  "table.subtitle": "AI-scored US + A-shares · Source:",
  "table.fullScreener": "Full Screener →",
  "table.col.rank": "#",
  "table.col.symbol": "Symbol",
  "table.col.name": "Name",
  "table.col.score": "Score",
  "table.col.up": "Up %",
  "table.col.risk": "Risk",
  "table.col.mainforce": "Main Force",
  "table.col.sector": "Sector",
  "table.col.action": "",
  "table.details": "Details →",
  "risk.low": "low",
  "risk.medium": "med",
  "risk.high": "high",
  "auth.signin": "Sign in",
  "auth.signup": "Sign up",
  "auth.signout": "Sign out",
  "auth.plan": "plan",
  "auth.signup.title": "Create account",
  "auth.signup.subtitle": "Start 7-day free trial",
  "auth.signin.title": "Sign in",
  "auth.signin.subtitle": "Welcome back",
  "auth.field.name": "Full name",
  "auth.field.email": "Email",
  "auth.field.password": "Password",
  "auth.field.password.signup": "Password (8+ chars)",
  "auth.submit.signup": "Create account",
  "auth.submit.signin": "Sign in",
  "auth.toSignup": "New to AlphaPilot?",
  "auth.toSignin": "Already have an account?",
  "auth.create": "Sign up",
  "auth.signin.link": "Sign in",
  "auth.mock.note": "M2 mock auth (localStorage). W3 backend.",
  "screener.title": "AI Screener",
  "screener.subtitle": "AI-scored stocks, ranked",
  "screener.filter.sectors": "Sectors",
  "screener.empty": "Backend unreachable. Start on port 8002.",
  "stock.back": "← Back",
  "stock.tabs.decision": "AI Decision",
  "stock.tabs.ai": "AI Score",
  "stock.tabs.radar": "Main Force",
  "stock.tabs.evidence": "Evidence",
  "stock.tabs.risk": "Risk",
  "stock.tabs.multi": "Multi-Period",
  "stock.decision.score": "Score",
  "stock.decision.confidence": "Confidence",
  "stock.decision.up": "Up prob.",
  "stock.decision.mainforce": "Main Force",
  "stock.decision.next": "Next",
  "stock.decision.buyzone": "Buy Zone",
  "stock.decision.stoploss": "Stop Loss",
  "stock.decision.target1": "Target 1",
  "stock.decision.target2": "Target 2",
  "stock.decision.position": "Position",
  "stock.decision.buy": "Buy",
  "stock.decision.watch": "Watchlist",
  "stock.risk.level": "Risk",
  "stock.risk.invalidation": "Invalidation",
  "stock.risk.earnings": "Earnings",
  "stock.risk.beta": "Beta",
  "stock.multi.alignment": "Alignment",
  "stock.multi.bullish": "Bullish",
  "stock.multi.neutral": "Neutral",
  "stock.multi.caution": "Caution",
  "lang.toggle": "中",
  "footer.disclaimer":
    "AlphaPilot 提供 AI 辅助分析,仅供教育用途,非投资建议。过往表现不保证未来收益。",
  "footer.disclaimer.en":
    "AlphaPilot provides AI-assisted analysis for educational purposes only. Not investment advice. Past performance does not guarantee future results.",
  "error.backend": "Backend unreachable",
  "error.backend.tip": "Tip: ensure backend runs on localhost:8002",
  "tab.us": "美股 / US",
  "tab.cn": "A 股 / China",
  "tab.home": "Home",
  "tab.screener": "Screener",
  "mainforce.accumulation": "Accumulation",
  "mainforce.markup": "Markup",
  "mainforce.distribution": "Distribution",
  "mainforce.washout": "Washout",
  "mainforce.reaccumulation": "Reaccumulation",
  "mainforce.bull_trap": "Bull Trap",
  "mainforce.bear_trap": "Bear Trap",
  "loading": "Loading…",
};

const DICTS: Record<Locale, Dict> = { "zh-CN": zhCN, en };

function detectLocale(): Locale {
  if (typeof window === "undefined") return "zh-CN";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "zh-CN" || stored === "en") return stored;
  // Browser + system locale
  const langs = [
    navigator.language,
    ...(navigator.languages ?? []),
  ].join(",").toLowerCase();
  if (langs.includes("zh")) return "zh-CN";
  return "en";
}

type I18nState = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: keyof Dict | string) => string;
};

const I18nContext = createContext<I18nState | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("zh-CN");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLocaleState(detectLocale());
    setReady(true);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, l);
    }
  };

  const t = (key: string) => {
    const dict = DICTS[locale] || DICTS["zh-CN"];
    return dict[key] || DICTS["en"][key] || key;
  };

  // Don't block render — provider always available, content uses defaults
  void ready;

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nState {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    // Fallback during SSR / first paint — return zh-CN defaults
    return {
      locale: "zh-CN",
      setLocale: () => {},
      t: (k: string) => zhCN[k] || en[k] || k,
    };
  }
  return ctx;
}
