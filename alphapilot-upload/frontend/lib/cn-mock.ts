// A 股 mock 数据 (M2 2026-06-06 — Boss pick 全 A + 沪深 300 起步)
// 25 龙头 mock,覆盖沪深 300 主流行业
// W3 接入真数据源 (Tushare / AKShare) 后整池扩展

import type { ScreenerItem } from "@/lib/types";

export const CN_MOCK_TOP_25: ScreenerItem[] = [
  // 白酒/消费
  { symbol: "600519.SH", name: "贵州茅台", score: 94, up_probability: 76, risk: "low", main_force: "accumulation", sector: "白酒" },
  { symbol: "000858.SZ", name: "五粮液", score: 88, up_probability: 71, risk: "low", main_force: "markup", sector: "白酒" },
  { symbol: "000568.SZ", name: "泸州老窖", score: 84, up_probability: 68, risk: "medium", main_force: "accumulation", sector: "白酒" },
  // 银行
  { symbol: "600036.SH", name: "招商银行", score: 91, up_probability: 73, risk: "low", main_force: "accumulation", sector: "银行" },
  { symbol: "601398.SH", name: "工商银行", score: 82, up_probability: 66, risk: "low", main_force: "accumulation", sector: "银行" },
  { symbol: "601939.SH", name: "建设银行", score: 81, up_probability: 65, risk: "low", main_force: "accumulation", sector: "银行" },
  { symbol: "601288.SH", name: "农业银行", score: 80, up_probability: 67, risk: "low", main_force: "accumulation", sector: "银行" },
  { symbol: "601318.SH", name: "中国平安", score: 86, up_probability: 70, risk: "low", main_force: "markup", sector: "保险" },
  // 新能源
  { symbol: "300750.SZ", name: "宁德时代", score: 93, up_probability: 75, risk: "medium", main_force: "markup", sector: "新能源" },
  { symbol: "002594.SZ", name: "比亚迪", score: 90, up_probability: 72, risk: "medium", main_force: "markup", sector: "新能源车" },
  { symbol: "601012.SH", name: "隆基绿能", score: 76, up_probability: 60, risk: "high", main_force: "washout", sector: "光伏" },
  // 医药
  { symbol: "600276.SH", name: "恒瑞医药", score: 87, up_probability: 71, risk: "medium", main_force: "markup", sector: "医药" },
  { symbol: "300760.SZ", name: "迈瑞医疗", score: 89, up_probability: 73, risk: "low", main_force: "markup", sector: "医疗器械" },
  { symbol: "600196.SH", name: "复星医药", score: 79, up_probability: 64, risk: "medium", main_force: "accumulation", sector: "医药" },
  // 家电/制造
  { symbol: "000333.SZ", name: "美的集团", score: 87, up_probability: 71, risk: "low", main_force: "markup", sector: "家电" },
  { symbol: "000651.SZ", name: "格力电器", score: 83, up_probability: 68, risk: "low", main_force: "accumulation", sector: "家电" },
  // 消费
  { symbol: "600887.SH", name: "伊利股份", score: 81, up_probability: 66, risk: "low", main_force: "accumulation", sector: "食品饮料" },
  { symbol: "601888.SH", name: "中国中免", score: 85, up_probability: 70, risk: "medium", main_force: "markup", sector: "旅游零售" },
  // 科技/AI
  { symbol: "002230.SZ", name: "科大讯飞", score: 88, up_probability: 73, risk: "high", main_force: "markup", sector: "AI" },
  { symbol: "002475.SZ", name: "立讯精密", score: 84, up_probability: 70, risk: "medium", main_force: "markup", sector: "消费电子" },
  { symbol: "300059.SZ", name: "东方财富", score: 86, up_probability: 71, risk: "medium", main_force: "markup", sector: "券商" },
  { symbol: "600030.SH", name: "中信证券", score: 82, up_probability: 67, risk: "low", main_force: "accumulation", sector: "券商" },
  // 能源
  { symbol: "600028.SH", name: "中国石化", score: 78, up_probability: 64, risk: "low", main_force: "accumulation", sector: "石油石化" },
  { symbol: "601857.SH", name: "中国石油", score: 77, up_probability: 63, risk: "low", main_force: "accumulation", sector: "石油石化" },
  // 农牧
  { symbol: "002714.SZ", name: "牧原股份", score: 80, up_probability: 66, risk: "medium", main_force: "markup", sector: "农牧" },
];

export function cnTopN(n: number = 20): ScreenerItem[] {
  return CN_MOCK_TOP_25.slice(0, n);
}
