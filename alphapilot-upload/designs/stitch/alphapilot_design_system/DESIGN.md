---
name: AlphaPilot Design System
colors:
  surface: '#0a1422'
  surface-dim: '#0a1422'
  surface-bright: '#303a49'
  surface-container-lowest: '#050e1c'
  surface-container-low: '#121c2a'
  surface-container: '#16202f'
  surface-container-high: '#212a39'
  surface-container-highest: '#2c3545'
  on-surface: '#d9e3f7'
  on-surface-variant: '#c0c7d4'
  inverse-surface: '#d9e3f7'
  inverse-on-surface: '#273140'
  outline: '#8a919d'
  outline-variant: '#404752'
  surface-tint: '#a2c9ff'
  primary: '#a2c9ff'
  on-primary: '#00315b'
  primary-container: '#4da3ff'
  on-primary-container: '#003866'
  inverse-primary: '#0060a9'
  secondary: '#7ddeff'
  on-secondary: '#003543'
  secondary-container: '#00c6f0'
  on-secondary-container: '#004e60'
  tertiary: '#35e0a3'
  on-tertiary: '#003825'
  tertiary-container: '#00b680'
  on-tertiary-container: '#003f2a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d3e4ff'
  primary-fixed-dim: '#a2c9ff'
  on-primary-fixed: '#001c38'
  on-primary-fixed-variant: '#004881'
  secondary-fixed: '#b5ebff'
  secondary-fixed-dim: '#46d6ff'
  on-secondary-fixed: '#001f28'
  on-secondary-fixed-variant: '#004e60'
  tertiary-fixed: '#5cfdbd'
  tertiary-fixed-dim: '#35e0a3'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#0a1422'
  on-background: '#d9e3f7'
  surface-variant: '#2c3545'
  surface-panel: '#0C1728'
  surface-card: '#101C30'
  border-subtle: '#1D2A42'
  text-primary: '#EAF2FF'
  text-secondary: '#9FB0C7'
  text-disabled: '#6E7C93'
  status-warning: '#F5C451'
  status-danger: '#FF5D5D'
typography:
  display-numeric:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1440px
  margin-desktop: 32px
  margin-mobile: 16px
  gutter: 20px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style
The design system is engineered for a high-stakes AI-driven stock decision platform. It embodies a **Corporate Modern** aesthetic fused with **Glassmorphism**, specifically tailored for a "Dark Mode First" environment. The brand personality is professional, authoritative, and clinical, prioritizing decision-making over mere data visualization.

The UI should evoke a sense of a "Trading Terminal from the Future"—calm and trustworthy, yet technically superior. By utilizing high-density layouts and subtle neon accents, the design system ensures that AI insights are treated as high-priority intelligence, distinguishing conclusions from background noise.

## Colors
The palette is built on a deep nocturnal foundation to reduce eye strain during long trading sessions. 

- **Primary & Secondary Blues:** Reserved for AI-generated insights, active states, and primary interaction points.
- **Semantic Colors:** Green and Red are strictly mapped to financial performance (Long/Short, Gain/Loss), while Yellow acts as a cautionary signal for risk or pending AI confirmations.
- **Neutral Layers:** Three distinct dark tones establish the Z-axis hierarchy—Background (`#07111F`) for the canvas, Panel (`#0C1728`) for grouping, and Card (`#101C30`) for actionable content.

## Typography
**Inter** is the sole typeface, chosen for its exceptional legibility in data-dense environments. 

- **Numeric Emphasis:** Stock prices, AI scores, and percentage changes use the `display-numeric` role with tighter letter spacing and bold weights to ensure they are the first elements the eye scans.
- **Hierarchy:** Clear distinction between conclusion-based headlines and supporting evidence.
- **Readability:** High line-height ratios are maintained for body text to prevent visual fatigue in complex information blocks.

## Layout & Spacing
This design system utilizes a **12-column fixed grid** for desktop, optimized for a 1440px base width. 

- **Density:** The spacing rhythm is compact (8px base unit) to accommodate high information density without feeling cluttered.
- **Reflow:** On mobile, the layout collapses into a single-column stack, prioritizing the AI "Conclusion Card" at the top of the viewport.
- **Safe Areas:** Margins of 32px on desktop provide a visual "breath" against the screen edge, while 20px gutters ensure distinct separation between glassmorphic panels.

## Elevation & Depth
Depth is achieved through **Glassmorphism** and tonal layering rather than traditional heavy shadows.

- **Surface Tiering:** Each level of elevation (Background -> Panel -> Card) increases slightly in lightness.
- **Glass Effects:** Cards use a subtle backdrop blur (12px - 20px) and a semi-transparent border (`#1D2A42` at 50% opacity) to create a "floating" lens effect.
- **Glows:** High-priority AI signals use a 0px blur, 2px spread "inner glow" or a very faint outer bloom in the accent color (Blue or Green) to signify importance.
- **Outlines:** All containers feature a 1px solid border to maintain structural integrity in the dark environment.

## Shapes
The shape language balances modern softness with technical precision. 

- **Core Radius:** A 16px to 20px radius is applied to all primary cards and panels to soften the "terminal" look and feel more like a modern SaaS.
- **Small Components:** Buttons and input fields use a consistent 8px (`rounded-md`) radius.
- **Interactive States:** Hovering over a card triggers a slight "lift" (Y-offset) and an increase in border opacity.

## Components

### Buttons & Inputs
- **Primary Action:** Solid `#4DA3FF` with white or `#07111F` text. 
- **Secondary Action:** Ghost buttons with the `#1D2A42` border and `#EAF2FF` text.
- **Inputs:** Darker than the card surface (`#07111F`) with a focused state border in `#4DA3FF`.

### AI Decision Cards
The hero component of the system. It must include:
- A prominent **Score/Probability** display using `display-numeric`.
- A colored **Status Badge** (e.g., "Strong Buy", "Risk Warning").
- **Evidence Chain:** A bulleted list of supporting data points using `label-md`.
- **Action Footer:** "Buy" and "Details" buttons positioned for immediate access.

### Charts & Data Viz
- **K-Line:** Dark-themed TradingView style. Bullish candles use `#3EE6A8`, Bearish candles use `#FF5D5D`.
- **Radar Charts:** Used for "Main Intent" analysis, utilizing the secondary blue with a semi-transparent fill.
- **Sparklines:** Compact trend lines within list views to show 24h momentum without taking up vertical space.

### Status Indicators
- **High Contrast Badges:** Small, high-saturation chips for "AI Active", "New Signal", or "Volatility High".
- **Risk Banners:** Full-width bars appearing at the top of panels for critical market-wide warnings.