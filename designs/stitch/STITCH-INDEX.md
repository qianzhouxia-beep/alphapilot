# AlphaPilot Stitch Design Index

> 老板 2026-06-05 用 Google Stitch 出的 UI 设计套件,共 16 个文件 7MB。
> 路径: `D:\MavisProjects\alphapilot\designs\stitch\`

## 核心 5 页面 (P0 — 6/12 demo 必用)

| 页面 | PNG | HTML 导出 | 用途 |
|---|---|---|---|
| **Dashboard 主页** | `alphapilot_dashboard_ai_intelligence/screen.png` | (无) | 首页 — K线 + 决策卡 + 主力意图 |
| **Screener 列表** | `alphapilot_ai_screener/screen.png` | (无) | 股票筛选页 |
| **单股详情 v2** | `alphapilot_stock_detail_v2/screen.png` | `code.html` | 详情页(用 v2,v1 弃) |
| **回测页** | `alphapilot_backtesting/screen.png` | `code.html` | 回测模块 (M2) |
| **AI 组件** | `alphapilot_component_ai/screen.png` | `code.html` | 决策卡 / 雷达图 / 证据链 |

## 设计系统 (P0 — 6/12 demo 必用)

- `alphapilot_design_system/DESIGN.md` (187 行)
  - 完整色板 / 字体 / spacing / elevation / shapes / 组件
  - 直接复制进 `tailwind.config.ts` + `src/styles/design-system.ts`

## 通用组件 (P1 — 6/12 demo 可用)

- `alphapilot_component/screen.png` + `code.html` — 通用组件库 (按钮/输入/卡片)

## Logo 变体 (P2 — 6/12 demo 选 1)

- `alphapilot_logo_1.png/screen.png` (94KB)
- `alphapilot_logo_3.png/screen.png` (66KB)
- `alphapilot_logo_5.png/screen.png` (40KB)

**待老板 L1 选 1**。麦麦建议 logo_1 (94KB, 细节更多)。

## 完整设计代码 (Stitch 导出)

- `AlphaPilot Design Code.md` (190KB) — 全部 HTML/CSS 原代码,可直接摘取

## 弃用文件 (旧版本)

- `alphapilot_stock_detail/screen.png` (1MB) — 单股详情 v1,已弃用,用 v2 替代

## 旧版设计规范 (弃用)

- `alphapilot_design.md` (8770B) — ChatGPT 出的旧规范,Stitch 是更高优先级

## 实施优先级 (领航看)

| 任务 | 优先级 | 截止 |
|---|---|---|
| 写 STITCH-INDEX.md (本文件) | P0 | 今晚 |
| 复制设计系统到 tailwind.config.ts | P0 | 6/12 demo |
| 重写 Dashboard 组件 (用 design + screen) | P0 | 6/12 demo |
| 重写 Screener 组件 | P0 | 6/12 demo |
| 重写单股详情 v2 组件 | P1 | 6/12 demo |
| 重写 AI 组件 (决策卡/雷达) | P0 | 6/12 demo |
| Logo 替换 | P2 | 6/12 demo |
| 回测组件 | P2 | 6/19 之后 |
