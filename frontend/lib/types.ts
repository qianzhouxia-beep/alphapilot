export type ScreenerItem = {
  symbol: string;
  name: string;
  score: number;
  up_probability: number;
  risk: "low" | "medium" | "high";
  main_force: string;
  sector: string | null;
};

export type ScreenerResponse = {
  count: number;
  items: ScreenerItem[];
  generated_at: string;
  source: "mock" | "live";
};
