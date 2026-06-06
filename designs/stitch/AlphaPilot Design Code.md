<!-- AlphaPilot Component - 主力意图雷达图设计 -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                "on-error": "#690005",
                "background": "#0a1422",
                "on-secondary-fixed": "#001f28",
                "inverse-on-surface": "#273140",
                "secondary": "#7ddeff",
                "on-primary-fixed": "#001c38",
                "secondary-fixed": "#b5ebff",
                "secondary-fixed-dim": "#46d6ff",
                "tertiary-fixed": "#5cfdbd",
                "tertiary": "#35e0a3",
                "surface-variant": "#2c3545",
                "surface-container-highest": "#2c3545",
                "surface-card": "#101C30",
                "secondary-container": "#00c6f0",
                "on-primary": "#00315b",
                "surface-container-low": "#121c2a",
                "on-primary-fixed-variant": "#004881",
                "surface-panel": "#0C1728",
                "surface-bright": "#303a49",
                "on-surface-variant": "#c0c7d4",
                "on-secondary-container": "#004e60",
                "text-disabled": "#6E7C93",
                "border-subtle": "#1D2A42",
                "outline-variant": "#404752",
                "primary-container": "#4da3ff",
                "on-tertiary-container": "#003f2a",
                "surface-tint": "#a2c9ff",
                "error-container": "#93000a",
                "on-secondary-fixed-variant": "#004e60",
                "on-primary-container": "#003866",
                "status-warning": "#F5C451",
                "outline": "#8a919d",
                "tertiary-container": "#00b680",
                "inverse-primary": "#0060a9",
                "primary-fixed": "#d3e4ff",
                "surface": "#0a1422",
                "tertiary-fixed-dim": "#35e0a3",
                "on-tertiary-fixed": "#002114",
                "on-error-container": "#ffdad6",
                "error": "#ffb4ab",
                "surface-container-lowest": "#050e1c",
                "on-surface": "#d9e3f7",
                "primary-fixed-dim": "#a2c9ff",
                "on-tertiary": "#003825",
                "on-background": "#d9e3f7",
                "inverse-surface": "#d9e3f7",
                "status-danger": "#FF5D5D",
                "primary": "#a2c9ff",
                "text-primary": "#EAF2FF",
                "surface-dim": "#0a1422",
                "surface-container-high": "#212a39",
                "on-tertiary-fixed-variant": "#005137",
                "surface-container": "#16202f",
                "text-secondary": "#9FB0C7",
                "on-secondary": "#003543"
              },
              "borderRadius": {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
              },
              "spacing": {
                "stack-lg": "24px",
                "stack-sm": "8px",
                "margin-mobile": "16px",
                "margin-desktop": "32px",
                "container-max": "1440px",
                "stack-md": "16px",
                "gutter": "20px"
              },
              "fontFamily": {
                "headline-lg": ["Inter"],
                "headline-md": ["Inter"],
                "headline-sm": ["Inter"],
                "body-lg": ["Inter"],
                "body-md": ["Inter"],
                "label-md": ["Inter"],
                "label-sm": ["Inter"],
                "display-numeric": ["Inter"]
              },
              "fontSize": {
                "display-numeric": ["36px", {"lineHeight": "44px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                "headline-lg": ["32px", {"lineHeight": "40px", "fontWeight": "600"}],
                "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                "headline-sm": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
                "body-lg": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                "body-md": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                "label-md": ["13px", {"lineHeight": "18px", "letterSpacing": "0.01em", "fontWeight": "500"}],
                "label-sm": ["12px", {"lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "500"}]
              }
            },
          },
        }
    </script>
<style>
        body {
            background-color: #0a1422;
            color: #d9e3f7;
            font-family: 'Inter', sans-serif;
        }
        .glass-panel {
            background: rgba(16, 28, 48, 0.6);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(29, 42, 66, 0.5);
        }
        .radar-grid {
            stroke: #1D2A42;
            stroke-width: 1;
            fill: none;
        }
        .radar-axis {
            stroke: #1D2A42;
            stroke-width: 1;
        }
        .radar-area {
            fill: rgba(77, 163, 255, 0.2);
            stroke: #4DA3FF;
            stroke-width: 2;
            filter: drop-shadow(0 0 8px rgba(77, 163, 255, 0.4));
        }
        .radar-point {
            fill: #4DA3FF;
            stroke: #0a1422;
            stroke-width: 2;
        }
        @keyframes pulse-glow {
            0% { filter: drop-shadow(0 0 2px rgba(77, 163, 255, 0.4)); }
            50% { filter: drop-shadow(0 0 12px rgba(77, 163, 255, 0.8)); }
            100% { filter: drop-shadow(0 0 2px rgba(77, 163, 255, 0.4)); }
        }
        .glow-active {
            animation: pulse-glow 3s infinite ease-in-out;
        }
    </style>
</head>
<body class="overflow-x-hidden">
<!-- TopNavBar -->
<nav class="fixed top-0 w-full z-40 border-b border-border-subtle bg-surface-panel/80 backdrop-blur-md shadow-sm flex items-center justify-between px-margin-desktop h-16">
<div class="flex items-center gap-stack-md">
<span class="font-headline-md text-headline-md font-bold text-primary">AlphaPilot AI</span>
<div class="hidden md:flex gap-stack-md ml-stack-lg">
<a class="font-body-md text-body-md text-primary font-bold border-b-2 border-primary py-1" href="#">Stock Screener</a>
<a class="font-body-md text-body-md text-text-secondary hover:text-text-primary transition-colors duration-200 py-1" href="#">Dashboard</a>
<a class="font-body-md text-body-md text-text-secondary hover:text-text-primary transition-colors duration-200 py-1" href="#">AI Intelligence</a>
</div>
</div>
<div class="flex items-center gap-stack-md">
<button class="p-2 hover:bg-surface-container-high rounded-full transition-colors duration-200">
<span class="material-symbols-outlined text-text-secondary">notifications</span>
</button>
<button class="p-2 hover:bg-surface-container-high rounded-full transition-colors duration-200">
<span class="material-symbols-outlined text-text-secondary">settings</span>
</button>
<div class="w-8 h-8 rounded-full overflow-hidden border border-border-subtle">
<img alt="User Account Profile" data-alt="A professional headshot of a financial tech executive, clean lighting, dark background with subtle blue rim light, high-end corporate aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuALDb7_3rvZcVJn_8bLyQWZHkiial_wCVcWUQpCR_YnDRFGxTMwzfNsovvFQj36Yo2usalQRLLCrxYIuxyjXDpqeiJuzqcwEXh75Kr36Ym2wJQU4M1pDiUukzMuKr6wudoW2GajBOeKE0Tl_ygTUtJ3g-YJugBDOf3fbjWSCOhakX1VuU22ou3Nk84rAjsR-ZJZVLkfm3AxPdZEKhrDcyN6SRoPkwp5E0YJ7JHxYaO1-mSG3jq5vAJv5cWpuzdUmEZvgYCtbs0bRgng"/>
</div>
</div>
</nav>
<!-- SideNavBar (Hidden on Mobile) -->
<aside class="fixed left-0 top-0 h-full w-64 z-50 border-r border-border-subtle bg-surface-container-lowest hidden md:flex flex-col py-stack-lg">
<div class="px-6 mb-stack-lg">
<div class="flex items-center gap-3">
<div class="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center">
<span class="material-symbols-outlined text-on-primary-container">insights</span>
</div>
<div>
<h1 class="font-headline-sm text-headline-sm font-black text-primary leading-none">AlphaPilot</h1>
<p class="text-[10px] uppercase tracking-widest text-text-secondary mt-1">AI Intelligence</p>
</div>
</div>
</div>
<nav class="flex-1 px-4 space-y-2">
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-container-high hover:text-text-primary transition-all duration-200 group" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span class="font-label-md text-label-md">Dashboard</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-secondary-container/10 text-secondary border-r-4 border-secondary group" href="#">
<span class="material-symbols-outlined">query_stats</span>
<span class="font-label-md text-label-md">Stock Screener</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-container-high hover:text-text-primary transition-all duration-200 group" href="#">
<span class="material-symbols-outlined">history_edu</span>
<span class="font-label-md text-label-md">Backtesting</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-container-high hover:text-text-primary transition-all duration-200 group" href="#">
<span class="material-symbols-outlined">security</span>
<span class="font-label-md text-label-md">Risk Management</span>
</a>
</nav>
<div class="px-6 py-4">
<button class="w-full py-3 bg-secondary text-on-secondary rounded-xl font-bold text-label-md shadow-lg shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all">
                Upgrade to Pro
            </button>
</div>
<div class="px-4 mt-auto border-t border-border-subtle pt-4">
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-container-high transition-all" href="#">
<span class="material-symbols-outlined">help_outline</span>
<span class="font-label-md text-label-md">Support</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-container-high transition-all" href="#">
<span class="material-symbols-outlined">logout</span>
<span class="font-label-md text-label-md">Sign Out</span>
</a>
</div>
</aside>
<!-- Main Content Canvas -->
<main class="md:ml-64 pt-20 pb-12 px-margin-desktop min-h-screen bg-background">
<!-- Header Section -->
<header class="mb-stack-lg flex flex-col md:flex-row md:items-end justify-between gap-stack-md">
<div>
<nav class="flex items-center gap-2 text-text-secondary mb-2">
<span class="font-label-sm text-label-sm">Components</span>
<span class="material-symbols-outlined text-[14px]">chevron_right</span>
<span class="font-label-sm text-label-sm text-primary">Radar Analysis</span>
</nav>
<h2 class="font-headline-lg text-headline-lg text-text-primary">AlphaPilot Component - Main Force Intent Analysis</h2>
<p class="font-body-md text-body-md text-text-secondary mt-1">Deep institutional behavioral mapping for large-cap assets.</p>
</div>
<div class="flex items-center gap-3 glass-panel px-4 py-2 rounded-xl">
<div class="flex items-center gap-3 border-r border-border-subtle pr-4">
<img alt="NVDA" class="w-8 h-8 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe5VdF-JN2T5lHk0GPm4CbXCHIoWJYBxqwNDHmeSAMc77zQg04_0vjuIrVXaCDupB0qOepzJWRX9c_qu9Nb1LaXZqz9w01YmQXvoWxmYk1BEMVCIdfrsy-_PD7wmGhC8gp3T7Ahj94_Mu-mhRcrL-qan0jkUfD1HkmqoTMClcR9J07HxkLKR4EqphZAW_d_RKHrlECUg-ANuwmtjQhF3cIpc7I26dPE7JU3ZOpIFFtDL6yUyzJ3Z3qtjY6kUKbCZoQ5bhdq-4pR-73"/>
<div>
<div class="font-bold text-primary font-label-md">NVDA</div>
<div class="text-[10px] text-text-secondary">NVIDIA Corp.</div>
</div>
</div>
<div class="pl-2">
<div class="text-tertiary font-display-numeric text-[20px]">$875.28</div>
<div class="text-tertiary font-label-sm flex items-center">
<span class="material-symbols-outlined text-[14px]">arrow_drop_up</span>
                        2.41%
                    </div>
</div>
</div>
</header>
<!-- Bento Grid Layout -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
<!-- Left Side: Radar Chart Component (Main Focus) -->
<div class="lg:col-span-8 glass-panel rounded-2xl p-stack-lg relative overflow-hidden flex flex-col items-center justify-center min-h-[600px]">
<!-- Background Decorative Glow -->
<div class="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
<div class="absolute -bottom-24 -right-24 w-80 h-80 bg-secondary/10 rounded-full blur-[120px]"></div>
<div class="w-full flex justify-between items-start absolute top-8 px-8">
<div>
<span class="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Live Engine</span>
<h3 class="font-headline-sm text-headline-sm mt-3">Institutional Radar</h3>
</div>
<div class="text-right">
<div class="text-[10px] uppercase text-text-secondary mb-1">Confidence Score</div>
<div class="font-display-numeric text-headline-md text-secondary">94.2%</div>
</div>
</div>
<!-- The Radar Chart SVG -->
<div class="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
<svg class="w-full h-full" viewbox="0 0 400 400">
<!-- Grid Concentric Hexagons -->
<polygon class="radar-grid" points="200,40 338,120 338,280 200,360 62,280 62,120"></polygon>
<polygon class="radar-grid" points="200,80 304,140 304,260 200,320 96,260 96,140"></polygon>
<polygon class="radar-grid" points="200,120 270,160 270,240 200,280 130,240 130,160"></polygon>
<polygon class="radar-grid" points="200,160 234,180 234,220 200,240 166,220 166,180"></polygon>
<!-- Axes -->
<line class="radar-axis" x1="200" x2="200" y1="200" y2="40"></line>
<line class="radar-axis" x1="200" x2="338" y1="200" y2="120"></line>
<line class="radar-axis" x1="200" x2="338" y1="200" y2="280"></line>
<line class="radar-axis" x1="200" x2="200" y1="200" y2="360"></line>
<line class="radar-axis" x1="200" x2="62" y1="200" y2="280"></line>
<line class="radar-axis" x1="200" x2="62" y1="200" y2="120"></line>
<!-- Radar Area (Data Polygon) -->
<!-- Order: Accumulation, Pump, Distribution, Bear Trap, Bull Trap, Washout -->
<!-- Points calc: Center(200,200), max radius 160. 0 deg is Up. -->
<polygon class="radar-area" points="200,50 320,135 240,225 200,260 90,240 75,130"></polygon>
<!-- Data Points -->
<circle class="radar-point" cx="200" cy="50" r="4"></circle>
<circle class="radar-point" cx="320" cy="135" r="4"></circle>
<circle class="radar-point" cx="240" cy="225" r="4"></circle>
<circle class="radar-point" cx="200" cy="260" r="4"></circle>
<circle class="radar-point" cx="90" cy="240" r="4"></circle>
<circle class="radar-point" cx="75" cy="130" r="4"></circle>
</svg>
<!-- Labels -->
<div class="absolute top-[5%] left-1/2 -translate-x-1/2 font-label-md text-text-primary flex flex-col items-center group cursor-help">
<span class="text-primary font-bold">Accumulation (吸筹)</span>
<div class="hidden group-hover:block absolute top-full mt-2 w-48 glass-panel p-3 rounded-lg text-[11px] z-50">
                            Institutions quietly buying large blocks without moving price significantly.
                        </div>
</div>
<div class="absolute top-[25%] right-[2%] font-label-md text-text-primary flex flex-col items-end group cursor-help">
<span class="text-tertiary">Pump/Rally (拉升)</span>
</div>
<div class="absolute bottom-[25%] right-[2%] font-label-md text-text-primary group cursor-help">
<span class="text-text-secondary">Distribution (出货)</span>
</div>
<div class="absolute bottom-[5%] left-1/2 -translate-x-1/2 font-label-md text-text-primary group cursor-help">
<span class="text-status-danger">Bear Trap (诱空)</span>
</div>
<div class="absolute bottom-[25%] left-[2%] font-label-md text-text-primary group cursor-help">
<span class="text-status-warning">Bull Trap (诱多)</span>
</div>
<div class="absolute top-[25%] left-[2%] font-label-md text-text-primary group cursor-help">
<span class="text-secondary">Washout (洗盘)</span>
</div>
<!-- Center Conclusion Hub -->
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 flex items-center justify-center">
<div class="w-full h-full rounded-full border-2 border-primary/30 bg-surface-panel/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-2 glow-active ring-1 ring-primary/20">
<span class="text-[9px] uppercase tracking-tighter text-text-secondary mb-1">Conclusion</span>
<div class="font-bold text-primary text-[12px] leading-tight">Strong<br/>Accumulation</div>
<div class="text-tertiary text-[10px] mt-1 font-bold">主力意图：强力吸筹</div>
</div>
</div>
</div>
<!-- Legend / Status -->
<div class="w-full grid grid-cols-3 gap-4 mt-8 px-8">
<div class="border-l-2 border-primary pl-3 py-1">
<div class="text-[10px] text-text-secondary uppercase">Momentum</div>
<div class="font-bold text-text-primary font-label-md">Aggressive</div>
</div>
<div class="border-l-2 border-secondary pl-3 py-1">
<div class="text-[10px] text-text-secondary uppercase">Volume Profile</div>
<div class="font-bold text-text-primary font-label-md">Exhaustion High</div>
</div>
<div class="border-l-2 border-tertiary pl-3 py-1">
<div class="text-[10px] text-text-secondary uppercase">Net Position</div>
<div class="font-bold text-text-primary font-label-md">+24.8M Shrs</div>
</div>
</div>
</div>
<!-- Right Side Column: Insights & Details -->
<div class="lg:col-span-4 flex flex-col gap-gutter">
<!-- AI Conclusion Card -->
<div class="glass-panel rounded-2xl p-stack-md border-l-4 border-tertiary">
<div class="flex items-center justify-between mb-stack-sm">
<span class="font-label-sm text-label-sm text-tertiary font-bold flex items-center gap-1">
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">stars</span>
                            AI SIGNATURE: STRONG BUY
                        </span>
<span class="text-[10px] text-text-disabled">Updated 2m ago</span>
</div>
<div class="font-display-numeric text-display-numeric text-text-primary mb-2">88<span class="text-headline-md opacity-50">/100</span></div>
<p class="font-body-md text-body-md text-text-secondary mb-4">Institutional order flow patterns suggest a classic "Spring" phase in the Wyckoff cycle. Minor retail washout detected at $860 support.</p>
<ul class="space-y-2 mb-stack-md">
<li class="flex items-start gap-2 font-label-md text-label-md">
<span class="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
<span>Abnormal Dark Pool activity at $870 level.</span>
</li>
<li class="flex items-start gap-2 font-label-md text-label-md">
<span class="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
<span>Put/Call ratio divergence confirms bottoming.</span>
</li>
<li class="flex items-start gap-2 font-label-md text-label-md">
<span class="material-symbols-outlined text-status-warning text-[18px]">error</span>
<span>Volume spike needed to confirm breakout.</span>
</li>
</ul>
<div class="flex gap-2">
<button class="flex-1 py-2.5 bg-primary-container text-on-primary-container rounded-lg font-bold text-label-md hover:opacity-90 transition-opacity">Execute Trade</button>
<button class="px-3 py-2.5 bg-surface-container-high border border-border-subtle rounded-lg">
<span class="material-symbols-outlined text-text-primary">share</span>
</button>
</div>
</div>
<!-- Market Context / Sparklines -->
<div class="glass-panel rounded-2xl p-stack-md flex-1">
<h4 class="font-headline-sm text-headline-sm mb-4">Sector Comparison</h4>
<div class="space-y-4">
<div class="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-border-subtle">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-lg bg-[#313339] flex items-center justify-center">
<img alt="TSLA" class="w-5 h-5 rounded-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvM-y7R_hlsS8BsBBgimwUc9FCReG0sc6wm_JiOft68QyKdgMbsz8YRroAv2sMQB44PGeMc7CLbj2BQ4qO7amTge62ZrRxhfc8PccwIkK63dwE1NvLXmpLvkwt8BgcManS5nrvMnpwKDwQOJhnhjDi9f0NBbghLK1U5C3rzXVmt7kCPEmjCiCnf7JpYNv1x-Lu8iwyTmaeGyokFNggt1oG27afOwk0EWy0RJf2ksmmsNTx6dO9U2aK71Oao3TJV1Q9esJMmn6bmKRO"/>
</div>
<div>
<div class="font-bold font-label-md text-text-primary">TSLA</div>
<div class="text-[10px] text-text-secondary">Consumer</div>
</div>
</div>
<div class="text-right">
<div class="text-status-danger font-label-md">-1.24%</div>
<div class="text-[10px] text-text-disabled">Distribution Phase</div>
</div>
</div>
<div class="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-border-subtle">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-lg bg-[#313339] flex items-center justify-center">
<img alt="AAPL" class="w-5 h-5 rounded-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXLMYzC1NKnZZ34zMMHUtM909dm3UORnbyYBd9xBrb4EMvNDFzxHHai7K9VBUBa5_ZaLiejMlEwgMpyISfM71X0AQ_o9RjKQUAW7B9lUQ6FZD9BgOSPinMeOGzGPANJE51Kwyzjt30vva6TcDIetSEXUNXRr_cPCLA3J9lM4NGxm2iZ2vZDB11hRXETYlLltyeRuT6bKfMeZRo6OvdyY8b7uI2rWSBt5pwK5qWliO8HA4NoHkxWQkUJ8XscE9lP7E7tZiGlmkpqix4"/>
</div>
<div>
<div class="font-bold font-label-md text-text-primary">AAPL</div>
<div class="text-[10px] text-text-secondary">Technology</div>
</div>
</div>
<div class="text-right">
<div class="text-tertiary font-label-md">+0.85%</div>
<div class="text-[10px] text-text-disabled">Stable Accumulation</div>
</div>
</div>
</div>
<div class="mt-stack-lg">
<h4 class="font-headline-sm text-headline-sm mb-2">Intent Evolution</h4>
<div class="h-32 w-full bg-surface-container-lowest rounded-xl flex items-end gap-1 px-2 py-4">
<!-- Simple Bar Chart Placeholder -->
<div class="flex-1 bg-tertiary/20 rounded-t-sm h-[30%]"></div>
<div class="flex-1 bg-tertiary/30 rounded-t-sm h-[45%]"></div>
<div class="flex-1 bg-tertiary/40 rounded-t-sm h-[55%]"></div>
<div class="flex-1 bg-tertiary/60 rounded-t-sm h-[80%]"></div>
<div class="flex-1 bg-tertiary/80 rounded-t-sm h-[95%]"></div>
<div class="flex-1 bg-primary rounded-t-sm h-[90%] border-t-2 border-white/20"></div>
</div>
<div class="flex justify-between mt-2 px-1 text-[10px] text-text-disabled">
<span>09:30 AM</span>
<span>CURRENT</span>
</div>
</div>
</div>
</div>
</div>
<!-- Component Documentation / Footer -->
<section class="mt-stack-lg glass-panel rounded-2xl p-stack-lg border-t-2 border-primary/20">
<div class="flex flex-col md:flex-row gap-stack-lg">
<div class="md:w-1/3">
<h3 class="font-headline-md text-headline-md text-text-primary mb-2">Component Logic</h3>
<p class="font-body-md text-body-md text-text-secondary">The "Main Force Intent Radar Chart" utilizes high-frequency tape reading and dark pool data to identify 6 key market manipulations.</p>
</div>
<div class="flex-1 grid grid-cols-2 md:grid-cols-3 gap-stack-md">
<div class="p-4 rounded-xl bg-surface-container-high/40 border border-border-subtle">
<div class="text-primary font-bold font-label-md mb-1">Accumulation</div>
<p class="text-[11px] text-text-secondary">High frequency, small lot buying at support clusters.</p>
</div>
<div class="p-4 rounded-xl bg-surface-container-high/40 border border-border-subtle">
<div class="text-secondary font-bold font-label-md mb-1">Washout</div>
<p class="text-[11px] text-text-secondary">Sharp stop-loss hunts to clear retail leveraged positions.</p>
</div>
<div class="p-4 rounded-xl bg-surface-container-high/40 border border-border-subtle">
<div class="text-tertiary font-bold font-label-md mb-1">Pump</div>
<p class="text-[11px] text-text-secondary">Coordinated momentum push across major order books.</p>
</div>
</div>
</div>
</section>
</main>
<!-- Floating Action for Component Customization -->
<button class="fixed bottom-8 right-8 w-14 h-14 bg-secondary text-on-secondary rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-50">
<span class="material-symbols-outlined">tune</span>
</button>
<script>
        // Simple interactive simulation for radar growth/changes
        document.addEventListener('DOMContentLoaded', () => {
            const polygon = document.querySelector('.radar-area');
            const points = document.querySelectorAll('.radar-point');
            
            // Randomize slightly every few seconds to simulate "Live" data
            setInterval(() => {
                const basePoints = [
                    [200, 40 + Math.random() * 20],   // Acc
                    [338 - Math.random() * 30, 120 + Math.random() * 20], // Pump
                    [338 - Math.random() * 100, 280 - Math.random() * 50], // Dist
                    [200, 360 - Math.random() * 100], // Bear
                    [62 + Math.random() * 40, 280 - Math.random() * 40], // Bull
                    [62 + Math.random() * 20, 120 + Math.random() * 20]  // Wash
                ];
                
                const pointsStr = basePoints.map(p => p.join(',')).join(' ');
                polygon.setAttribute('points', pointsStr);
                
                points.forEach((dot, index) => {
                    dot.setAttribute('cx', basePoints[index][0]);
                    dot.setAttribute('cy', basePoints[index][1]);
                });
            }, 3000);
        });
    </script>
</body></html>

<!-- AlphaPilot Dashboard - AI Intelligence首页 -->
<!DOCTYPE html><html class="dark" lang="en"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>AlphaPilot | AI Trading Intelligence Dashboard</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "surface-container-highest": "#2c3545",
                      "on-secondary": "#003543",
                      "error": "#ffb4ab",
                      "secondary": "#7ddeff",
                      "surface-dim": "#0a1422",
                      "surface-bright": "#303a49",
                      "surface": "#0a1422",
                      "text-secondary": "#9FB0C7",
                      "tertiary-fixed-dim": "#35e0a3",
                      "on-tertiary": "#003825",
                      "on-secondary-fixed": "#001f28",
                      "on-background": "#d9e3f7",
                      "inverse-surface": "#d9e3f7",
                      "background": "#0a1422",
                      "on-primary-fixed": "#001c38",
                      "secondary-container": "#00c6f0",
                      "surface-container-lowest": "#050e1c",
                      "status-danger": "#FF5D5D",
                      "surface-container-low": "#121c2a",
                      "on-surface": "#d9e3f7",
                      "surface-container": "#16202f",
                      "on-tertiary-container": "#003f2a",
                      "surface-container-high": "#212a39",
                      "tertiary-container": "#00b680",
                      "on-primary-container": "#003866",
                      "primary-fixed-dim": "#a2c9ff",
                      "tertiary-fixed": "#5cfdbd",
                      "error-container": "#93000a",
                      "on-primary": "#00315b",
                      "on-error-container": "#ffdad6",
                      "inverse-primary": "#0060a9",
                      "tertiary": "#35e0a3",
                      "surface-card": "#101C30",
                      "on-tertiary-fixed-variant": "#005137",
                      "text-primary": "#EAF2FF",
                      "on-primary-fixed-variant": "#004881",
                      "secondary-fixed": "#b5ebff",
                      "outline": "#8a919d",
                      "surface-panel": "#0C1728",
                      "primary-fixed": "#d3e4ff",
                      "status-warning": "#F5C451",
                      "secondary-fixed-dim": "#46d6ff",
                      "inverse-on-surface": "#273140",
                      "on-tertiary-fixed": "#002114",
                      "on-surface-variant": "#c0c7d4",
                      "text-disabled": "#6E7C93",
                      "primary": "#a2c9ff",
                      "surface-variant": "#2c3545",
                      "border-subtle": "#1D2A42",
                      "primary-container": "#4da3ff",
                      "on-secondary-fixed-variant": "#004e60",
                      "on-secondary-container": "#004e60",
                      "on-error": "#690005",
                      "outline-variant": "#404752",
                      "surface-tint": "#a2c9ff"
              },
              "borderRadius": {
                      "DEFAULT": "0.25rem",
                      "lg": "0.5rem",
                      "xl": "0.75rem",
                      "full": "9999px"
              },
              "spacing": {
                      "margin-desktop": "32px",
                      "gutter": "20px",
                      "stack-sm": "8px",
                      "stack-md": "16px",
                      "stack-lg": "24px",
                      "margin-mobile": "16px",
                      "container-max": "1440px"
              },
              "fontFamily": {
                      "label-sm": ["Inter"],
                      "headline-sm": ["Inter"],
                      "display-numeric": ["Inter"],
                      "label-md": ["Inter"],
                      "body-md": ["Inter"],
                      "headline-md": ["Inter"],
                      "headline-lg": ["Inter"],
                      "body-lg": ["Inter"],
                      "headline-lg-mobile": ["Inter"]
              },
              "fontSize": {
                      "label-sm": ["12px", {"lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "500"}],
                      "headline-sm": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
                      "display-numeric": ["36px", {"lineHeight": "44px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                      "label-md": ["13px", {"lineHeight": "18px", "letterSpacing": "0.01em", "fontWeight": "500"}],
                      "body-md": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                      "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                      "headline-lg": ["32px", {"lineHeight": "40px", "fontWeight": "600"}],
                      "body-lg": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                      "headline-lg-mobile": ["24px", {"lineHeight": "32px", "fontWeight": "600"}]
              }
            },
          },
        }
      </script>
<style>
        body { background-color: #07111F; color: #EAF2FF; font-family: 'Inter', sans-serif; }
        .glass-panel {
            background: rgba(16, 28, 48, 0.7);
            backdrop-filter: blur(12px);
            border: 1px solid #1D2A42;
            border-radius: 20px;
        }
        .ai-glow {
            box-shadow: 0 0 15px rgba(77, 163, 255, 0.15);
            border: 1px solid rgba(77, 163, 255, 0.4);
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #07111F; }
        ::-webkit-scrollbar-thumb { background: #1D2A42; border-radius: 10px; }
        .sparkline-svg { stroke-width: 2; fill: none; }
    </style>
</head>
<body class="dark overflow-x-hidden">
<!-- SideNavBar Shell -->
<aside class="h-screen w-64 fixed left-0 top-0 bg-surface-panel border-r border-border-subtle flex flex-col py-stack-lg z-50">
<div class="px-6 mb-10 flex items-center gap-3">
<img alt="AlphaPilot" class="h-8 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWJSi9BS0baejufKavq12dUoIGDqjd2CY2HhUl6yAA6geUlUDSN6pu5B4Tw8M0T-cKK-ocm_IBA-j9qmWa2qmv3WvJzmffaFlhe_ciwDeznTFVRzrzdrHQRV1TC2fi1iaPQMvs19cXXqYEUmjS9EQr3rtkqhceEpUXAszFMNDU_3HILlZX--IyT25onvCEFr5qxcMP15ssmYxz5Cn_e0GfaB8qiDzI1w5jrbkzo0e1PSjIhmWbVQ6CaRnE4FcUVtOXJaEJKBbqjM-O">
</div>
<nav class="flex-1 space-y-1 px-4">
<div class="text-primary border-r-2 border-primary bg-primary-container/10 flex items-center gap-3 px-4 py-3 cursor-pointer duration-200 ease-in-out font-label-md text-label-md">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span>Dashboard</span>
</div>
<div class="text-text-disabled hover:bg-surface-container-high hover:text-text-primary flex items-center gap-3 px-4 py-3 cursor-pointer duration-200 ease-in-out font-label-md text-label-md">
<span class="material-symbols-outlined" data-icon="analytics">analytics</span>
<span>Stock Screener</span>
</div>
<div class="text-text-disabled hover:bg-surface-container-high hover:text-text-primary flex items-center gap-3 px-4 py-3 cursor-pointer duration-200 ease-in-out font-label-md text-label-md">
<span class="material-symbols-outlined" data-icon="history">history</span>
<span>Backtesting</span>
</div>
<div class="text-text-disabled hover:bg-surface-container-high hover:text-text-primary flex items-center gap-3 px-4 py-3 cursor-pointer duration-200 ease-in-out font-label-md text-label-md">
<span class="material-symbols-outlined" data-icon="security">security</span>
<span>Risk Management</span>
</div>
</nav>
<div class="px-4 mt-auto space-y-4">
<div class="bg-primary/10 border border-primary/20 rounded-xl p-4">
<p class="text-primary font-label-sm text-label-sm font-bold mb-2">Upgrade to Pro</p>
<p class="text-text-secondary text-[11px] mb-3 leading-relaxed">Access real-time institutional flow &amp; advanced AI models.</p>
<button class="w-full bg-primary-container text-on-primary-container py-2 rounded-lg font-label-sm text-label-sm font-bold hover:opacity-90 transition-opacity">Upgrade</button>
</div>
<div class="pt-4 border-t border-border-subtle space-y-1">
<div class="text-text-disabled hover:text-text-primary flex items-center gap-3 px-4 py-2 cursor-pointer duration-200 ease-in-out font-label-md text-label-md">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span>Settings</span>
</div>
<div class="text-text-disabled hover:text-text-primary flex items-center gap-3 px-4 py-2 cursor-pointer duration-200 ease-in-out font-label-md text-label-md">
<span class="material-symbols-outlined" data-icon="help">help</span>
<span>Support</span>
</div>
</div>
</div>
</aside>
<!-- TopNavBar Shell -->
<header class="fixed top-0 right-0 left-64 z-40 flex justify-between items-center px-margin-desktop h-16 bg-surface/80 backdrop-blur-xl border-b border-border-subtle shadow-sm">
<div class="flex items-center gap-6">
<div class="relative group">
<span class="absolute inset-y-0 left-0 pl-3 flex items-center text-text-disabled group-focus-within:text-primary">
<span class="material-symbols-outlined text-[20px]">search</span>
</span>
<input class="bg-surface-container-lowest border border-border-subtle text-text-primary text-label-sm font-label-sm rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all" placeholder="Search markets..." type="text">
</div>
<nav class="hidden md:flex items-center gap-6">
<a class="text-tertiary font-bold font-label-sm text-label-sm" href="#">Bullish</a>
<a class="text-text-secondary hover:text-primary transition-opacity font-label-sm text-label-sm" href="#">Low Risk</a>
</nav>
</div>
<div class="flex items-center gap-4">
<div class="relative cursor-pointer text-text-secondary hover:text-primary transition-opacity">
<span class="material-symbols-outlined">notifications</span>
<span class="absolute top-0 right-0 w-2 h-2 bg-status-danger rounded-full border-2 border-surface"></span>
</div>
<div class="flex items-center gap-3 pl-4 border-l border-border-subtle cursor-pointer group">
<img alt="User Profile" class="w-8 h-8 rounded-full border border-border-subtle" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy18mGbtQZDIY95qpfWrX6u5FdkOVCJCVspRfIANwVbskOleeevHNehEopQuGsOsXjv5Ro0JqGTEAV4Y_naOmY-TYNeLUaCgkfOxqId1aNuZrpjBmgJfvkH8ZnjG7gFpZ0LmFCPEtzDYiqyRuSrgkVA-v3Saa2QGb_k_5MgM-tSgsv75RHLO715LEF18STXBCFPeMlCQAJM2tHDOfSiWGSGyebk2DDIQGATuCEi_6VwvDR3sTY1zOe_bvV4u_O7zF-u9K4yyyiyiV2">
<div class="text-right hidden sm:block">
<p class="text-text-primary font-label-md text-label-md font-bold">Alex Rivera</p>
<p class="text-text-disabled text-[10px]">Premium Member</p>
</div>
<span class="material-symbols-outlined text-text-disabled group-hover:text-primary">expand_more</span>
</div>
</div>
</header>
<!-- Main Content Area -->
<main class="ml-64 pt-24 px-margin-desktop pb-12">
<!-- Market Status Bar -->
<div class="flex flex-wrap items-center gap-gutter mb-stack-lg">
<div class="flex items-center gap-2 px-4 py-2 rounded-full border border-tertiary/30 bg-tertiary/5">
<span class="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
<span class="font-label-sm text-label-sm text-tertiary uppercase tracking-wider">Bull Market</span>
</div>
<div class="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
<span class="material-symbols-outlined text-primary text-[18px]">verified_user</span>
<span class="font-label-sm text-label-sm text-primary uppercase tracking-wider">Normal Risk</span>
</div>
<div class="flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/5">
<span class="material-symbols-outlined text-secondary text-[18px]">psychology</span>
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider">High AI Confidence (88%)</span>
</div>
<div class="ml-auto flex items-center gap-4">
<span class="text-text-disabled font-label-sm text-label-sm">Live market data updated 12s ago</span>
<div class="flex -space-x-2">
<div class="w-6 h-6 rounded-full border border-surface bg-surface-container-high"></div>
<div class="w-6 h-6 rounded-full border border-surface bg-surface-container-highest"></div>
<div class="w-6 h-6 rounded-full border border-surface bg-primary/20 flex items-center justify-center text-[8px] font-bold">+24</div>
</div>
</div>
</div>
<!-- 12-Column Grid -->
<div class="grid grid-cols-12 gap-gutter">
<!-- Top Opportunities (8 cols) -->
<section class="col-span-8 space-y-stack-md">
<div class="flex items-center justify-between mb-2">
<h2 class="font-headline-sm text-headline-sm text-text-primary">Top 5 AI Picks</h2>
<button class="text-primary font-label-sm text-label-sm hover:underline">View All Intelligence</button>
</div>
<div class="glass-panel overflow-hidden">
<table class="w-full text-left">
<thead class="bg-surface-container/50 border-b border-border-subtle">
<tr>
<th class="px-6 py-4 font-label-sm text-label-sm text-text-disabled uppercase tracking-wider">Score</th>
<th class="px-6 py-4 font-label-sm text-label-sm text-text-disabled uppercase tracking-wider">Symbol</th>
<th class="px-6 py-4 font-label-sm text-label-sm text-text-disabled uppercase tracking-wider">Price</th>
<th class="px-6 py-4 font-label-sm text-label-sm text-text-disabled uppercase tracking-wider">24h Change</th>
<th class="px-6 py-4 font-label-sm text-label-sm text-text-disabled uppercase tracking-wider">AI Sentiment</th>
<th class="px-6 py-4"></th>
</tr>
</thead>
<tbody class="divide-y divide-border-subtle">
<!-- Pick 1 -->
<tr class="hover:bg-surface-container/30 transition-colors group">
<td class="px-6 py-4">
<div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-display-numeric text-lg font-bold">92</div>
</td>
<td class="px-6 py-4">
<div>
<p class="font-label-md text-label-md text-text-primary font-bold">NVDA</p>
<p class="text-[11px] text-text-disabled">NVIDIA Corp</p>
</div>
</td>
<td class="px-6 py-4 font-display-numeric text-label-md text-text-primary">$894.32</td>
<td class="px-6 py-4">
<span class="text-tertiary font-display-numeric text-label-md">+4.21%</span>
</td>
<td class="px-6 py-4">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-tertiary/10 text-tertiary border border-tertiary/20">STRONG ACCUMULATION</span>
</td>
<td class="px-6 py-4 text-right">
<span class="material-symbols-outlined text-text-disabled group-hover:text-primary cursor-pointer transition-colors">chevron_right</span>
</td>
</tr>
<!-- Pick 2 -->
<tr class="hover:bg-surface-container/30 transition-colors group">
<td class="px-6 py-4">
<div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-display-numeric text-lg font-bold">88</div>
</td>
<td class="px-6 py-4">
<div>
<p class="font-label-md text-label-md text-text-primary font-bold">TSLA</p>
<p class="text-[11px] text-text-disabled">Tesla, Inc.</p>
</div>
</td>
<td class="px-6 py-4 font-display-numeric text-label-md text-text-primary">$176.54</td>
<td class="px-6 py-4">
<span class="text-tertiary font-display-numeric text-label-md">+2.88%</span>
</td>
<td class="px-6 py-4">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-tertiary/10 text-tertiary border border-tertiary/20">HEAVY INFLOW</span>
</td>
<td class="px-6 py-4 text-right">
<span class="material-symbols-outlined text-text-disabled group-hover:text-primary cursor-pointer transition-colors">chevron_right</span>
</td>
</tr>
<!-- Pick 3 -->
<tr class="hover:bg-surface-container/30 transition-colors group">
<td class="px-6 py-4">
<div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-display-numeric text-lg font-bold">85</div>
</td>
<td class="px-6 py-4">
<div>
<p class="font-label-md text-label-md text-text-primary font-bold">AMD</p>
<p class="text-[11px] text-text-disabled">Advanced Micro Devices</p>
</div>
</td>
<td class="px-6 py-4 font-display-numeric text-label-md text-text-primary">$192.10</td>
<td class="px-6 py-4">
<span class="text-tertiary font-display-numeric text-label-md">+1.45%</span>
</td>
<td class="px-6 py-4">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">TESTING SUPPORT</span>
</td>
<td class="px-6 py-4 text-right">
<span class="material-symbols-outlined text-text-disabled group-hover:text-primary cursor-pointer transition-colors">chevron_right</span>
</td>
</tr>
<!-- Pick 4 -->
<tr class="hover:bg-surface-container/30 transition-colors group">
<td class="px-6 py-4">
<div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-display-numeric text-lg font-bold">82</div>
</td>
<td class="px-6 py-4">
<div>
<p class="font-label-md text-label-md text-text-primary font-bold">MSFT</p>
<p class="text-[11px] text-text-disabled">Microsoft Corp</p>
</div>
</td>
<td class="px-6 py-4 font-display-numeric text-label-md text-text-primary">$415.22</td>
<td class="px-6 py-4">
<span class="text-tertiary font-display-numeric text-label-md">+0.98%</span>
</td>
<td class="px-6 py-4">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">STABLE CORE</span>
</td>
<td class="px-6 py-4 text-right">
<span class="material-symbols-outlined text-text-disabled group-hover:text-primary cursor-pointer transition-colors">chevron_right</span>
</td>
</tr>
<!-- Pick 5 -->
<tr class="hover:bg-surface-container/30 transition-colors group">
<td class="px-6 py-4">
<div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-display-numeric text-lg font-bold">81</div>
</td>
<td class="px-6 py-4">
<div>
<p class="font-label-md text-label-md text-text-primary font-bold">AAPL</p>
<p class="text-[11px] text-text-disabled">Apple Inc.</p>
</div>
</td>
<td class="px-6 py-4 font-display-numeric text-label-md text-text-primary">$171.12</td>
<td class="px-6 py-4">
<span class="text-status-danger font-display-numeric text-label-md">-0.45%</span>
</td>
<td class="px-6 py-4">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-status-warning/10 text-status-warning border border-status-warning/20">WASHING OUT</span>
</td>
<td class="px-6 py-4 text-right">
<span class="material-symbols-outlined text-text-disabled group-hover:text-primary cursor-pointer transition-colors">chevron_right</span>
</td>
</tr>
</tbody>
</table>
</div>
</section>
<!-- Featured AI Decision Card (4 cols) -->
<section class="col-span-4 flex flex-col gap-gutter">
<div class="flex items-center justify-between mb-2">
<h2 class="font-headline-sm text-headline-sm text-text-primary">Featured Analysis</h2>
</div>
<div class="glass-panel ai-glow p-stack-lg relative overflow-hidden flex-1">
<div class="absolute top-0 right-0 p-4">
<span class="material-symbols-outlined text-primary text-[48px] opacity-10">bolt</span>
</div>
<div class="mb-6">
<div class="flex items-center justify-between mb-4">
<div class="flex items-center gap-3">
<div class="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center border border-border-subtle">
<span class="font-bold text-primary">PLTR</span>
</div>
<div>
<h3 class="font-headline-sm text-headline-sm text-text-primary">Palantir Tech</h3>
<p class="text-text-disabled text-label-sm font-label-sm">High-Conviction Setup</p>
</div>
</div>
<span class="bg-tertiary text-on-tertiary px-3 py-1 rounded-md text-[11px] font-black uppercase">Strong Buy</span>
</div>
<div class="flex items-end gap-2 mb-6">
<span class="font-display-numeric text-[56px] leading-tight text-text-primary">94<span class="text-[32px] text-primary">%</span></span>
<span class="text-text-secondary font-label-md text-label-md pb-2">AI Win Probability</span>
</div>
<div class="grid grid-cols-2 gap-4 mb-8">
<div class="p-3 rounded-xl bg-surface-container/50 border border-border-subtle">
<p class="text-text-disabled text-[10px] uppercase font-bold mb-1">Target Price</p>
<p class="text-tertiary font-display-numeric text-xl font-bold">$32.50</p>
</div>
<div class="p-3 rounded-xl bg-surface-container/50 border border-border-subtle">
<p class="text-text-disabled text-[10px] uppercase font-bold mb-1">Stop Loss</p>
<p class="text-status-danger font-display-numeric text-xl font-bold">$21.80</p>
</div>
</div>
<div class="space-y-3 mb-8">
<p class="text-text-primary font-label-md text-label-md font-bold flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-[18px]">verified</span>
                                Evidence Chain
                            </p>
<ul class="space-y-2">
<li class="flex items-start gap-2 text-label-sm font-label-sm text-text-secondary">
<span class="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></span>
<span>Institutional inflow increased by 140% in last 3 sessions.</span>
</li>
<li class="flex items-start gap-2 text-label-sm font-label-sm text-text-secondary">
<span class="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></span>
<span>Golden Cross confirmed on 4H timeframe with volume support.</span>
</li>
<li class="flex items-start gap-2 text-label-sm font-label-sm text-text-secondary">
<span class="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></span>
<span>AI Sentiment score jumped from 64 to 92 overnight.</span>
</li>
</ul>
</div>
</div>
<div class="mt-auto flex gap-3">
<button class="flex-1 bg-primary-container text-on-primary-container py-3 rounded-xl font-bold font-label-md text-label-md hover:brightness-110 active:scale-[0.98] transition-all">Execute Trade</button>
<button class="px-4 border border-border-subtle text-text-primary rounded-xl hover:bg-surface-container transition-colors">
<span class="material-symbols-outlined">share</span>
</button>
</div>
</div>
</section>
<!-- Institutional Intent List (6 cols) -->
<section class="col-span-6 space-y-stack-md">
<div class="flex items-center justify-between">
<h2 class="font-headline-sm text-headline-sm text-text-primary flex items-center gap-2">
<span class="material-symbols-outlined text-tertiary">account_balance</span>
                        Institutional Intent
                    </h2>
</div>
<div class="glass-panel p-stack-md space-y-4">
<!-- Row 1 -->
<div class="flex items-center justify-between p-4 bg-surface-container/30 border border-border-subtle rounded-xl">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-lg bg-tertiary/10 flex items-center justify-center font-bold text-tertiary">GOOG</div>
<div>
<p class="text-text-primary font-bold text-label-md">Alphabet Inc.</p>
<p class="text-[10px] text-tertiary font-bold uppercase">Pulling Up</p>
</div>
</div>
<div class="flex-1 px-8">
<svg class="sparkline-svg w-full h-8 stroke-tertiary opacity-70" viewBox="0 0 100 20">
<path d="M0,15 L10,12 L20,16 L30,10 L40,12 L50,8 L60,10 L70,4 L80,6 L90,2 L100,5"></path>
</svg>
</div>
<div class="text-right">
<p class="text-text-primary font-display-numeric font-bold">$154.20</p>
<p class="text-tertiary text-[10px]">+2.1% Inflow</p>
</div>
</div>
<!-- Row 2 -->
<div class="flex items-center justify-between p-4 bg-surface-container/30 border border-border-subtle rounded-xl">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-lg bg-status-warning/10 flex items-center justify-center font-bold text-status-warning">AMZN</div>
<div>
<p class="text-text-primary font-bold text-label-md">Amazon.com</p>
<p class="text-[10px] text-status-warning font-bold uppercase">Washing Out</p>
</div>
</div>
<div class="flex-1 px-8">
<svg class="sparkline-svg w-full h-8 stroke-status-warning opacity-70" viewBox="0 0 100 20">
<path d="M0,5 L10,8 L20,4 L30,15 L40,12 L50,18 L60,14 L70,16 L80,10 L90,12 L100,10"></path>
</svg>
</div>
<div class="text-right">
<p class="text-text-primary font-display-numeric font-bold">$180.15</p>
<p class="text-status-warning text-[10px]">-1.4% Outflow</p>
</div>
</div>
<!-- Row 3 -->
<div class="flex items-center justify-between p-4 bg-surface-container/30 border border-border-subtle rounded-xl">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-lg bg-tertiary/10 flex items-center justify-center font-bold text-tertiary">META</div>
<div>
<p class="text-text-primary font-bold text-label-md">Meta Platforms</p>
<p class="text-[10px] text-tertiary font-bold uppercase">Accumulation</p>
</div>
</div>
<div class="flex-1 px-8">
<svg class="sparkline-svg w-full h-8 stroke-tertiary opacity-70" viewBox="0 0 100 20">
<path d="M0,18 L10,16 L20,17 L30,14 L40,15 L50,10 L60,12 L70,8 L80,9 L90,5 L100,4"></path>
</svg>
</div>
<div class="text-right">
<p class="text-text-primary font-display-numeric font-bold">$496.80</p>
<p class="text-tertiary text-[10px]">+0.8% Inflow</p>
</div>
</div>
</div>
</section>
<!-- Risk Alerts (6 cols) -->
<section class="col-span-6 space-y-stack-md">
<div class="flex items-center justify-between">
<h2 class="font-headline-sm text-headline-sm text-text-primary flex items-center gap-2">
<span class="material-symbols-outlined text-status-danger">warning</span>
                        Critical Risk Alerts
                    </h2>
</div>
<div class="glass-panel p-stack-md space-y-3">
<div class="flex items-start gap-4 p-4 bg-status-danger/5 border border-status-danger/20 rounded-xl relative overflow-hidden group">
<div class="absolute top-0 left-0 w-1 h-full bg-status-danger"></div>
<div class="bg-status-danger/10 p-2 rounded-lg">
<span class="material-symbols-outlined text-status-danger">trending_down</span>
</div>
<div class="flex-1">
<div class="flex items-center justify-between mb-1">
<p class="text-text-primary font-bold text-label-md">NFLX Stop Loss Alert</p>
<span class="text-[10px] text-text-disabled">2m ago</span>
</div>
<p class="text-text-secondary text-label-sm font-label-sm leading-relaxed">Netflix (NFLX) has hit the dynamic AI stop loss at $610.20. Market structure showing early distribution patterns.</p>
</div>
<button class="self-center bg-status-danger text-white text-[10px] font-bold px-3 py-1.5 rounded-lg hover:brightness-110">Close Position</button>
</div>
<div class="flex items-start gap-4 p-4 bg-status-warning/5 border border-status-warning/20 rounded-xl relative overflow-hidden">
<div class="absolute top-0 left-0 w-1 h-full bg-status-warning"></div>
<div class="bg-status-warning/10 p-2 rounded-lg">
<span class="material-symbols-outlined text-status-warning">sensors</span>
</div>
<div class="flex-1">
<div class="flex items-center justify-between mb-1">
<p class="text-text-primary font-bold text-label-md">BABA Distribution Signal</p>
<span class="text-[10px] text-text-disabled">14m ago</span>
</div>
<p class="text-text-secondary text-label-sm font-label-sm leading-relaxed">Institutional distribution detected in BABA. Large block trades identified on the bid side. Suggest reducing exposure.</p>
</div>
<button class="self-center border border-status-warning/40 text-status-warning text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-status-warning/10">Analyze</button>
</div>
<div class="flex items-start gap-4 p-4 bg-status-danger/5 border border-status-danger/20 rounded-xl relative overflow-hidden">
<div class="absolute top-0 left-0 w-1 h-full bg-status-danger"></div>
<div class="bg-status-danger/10 p-2 rounded-lg">
<span class="material-symbols-outlined text-status-danger">gavel</span>
</div>
<div class="flex-1">
<div class="flex items-center justify-between mb-1">
<p class="text-text-primary font-bold text-label-md">Macro Volatility Warning</p>
<span class="text-[10px] text-text-disabled">45m ago</span>
</div>
<p class="text-text-secondary text-label-sm font-label-sm leading-relaxed">Unexpected CPI data release has spiked VIX. All aggressive long positions now carry 2.5x standard risk.</p>
</div>
</div>
</div>
</section>
</div>
</main>
<!-- FAB for AI Chat -->
<div class="fixed bottom-8 right-8 z-50">
<button class="w-16 h-16 bg-primary-container text-on-primary-container rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group overflow-hidden">
<span class="material-symbols-outlined text-[32px] group-hover:rotate-12 transition-transform">auto_awesome</span>
<div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
</button>
</div>
<script>
        // Micro-interactions for numerical updates
        document.querySelectorAll('.font-display-numeric').forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.classList.add('text-primary');
            });
            el.addEventListener('mouseleave', () => {
                el.classList.remove('text-primary');
            });
        });

        // Search bar focus effect
        const searchInput = document.querySelector('input[type="text"]');
        searchInput.addEventListener('focus', () => {
            searchInput.parentElement.classList.add('scale-[1.02]');
        });
        searchInput.addEventListener('blur', () => {
            searchInput.parentElement.classList.remove('scale-[1.02]');
        });
    </script>
</body></html>

<!-- AlphaPilot Stock Detail - 股票详情分析页 -->
<!DOCTYPE html><html class="dark" lang="en"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>AlphaPilot | NVDA Stock Detail</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "tertiary-container": "#00b680",
                        "tertiary": "#35e0a3",
                        "on-surface-variant": "#c0c7d4",
                        "on-secondary-fixed-variant": "#004e60",
                        "surface-panel": "#0C1728",
                        "on-surface": "#d9e3f7",
                        "secondary-fixed": "#b5ebff",
                        "surface-variant": "#2c3545",
                        "surface-container-low": "#121c2a",
                        "surface-tint": "#a2c9ff",
                        "on-primary-fixed": "#001c38",
                        "on-tertiary": "#003825",
                        "on-primary": "#00315b",
                        "on-tertiary-fixed": "#002114",
                        "inverse-surface": "#d9e3f7",
                        "on-primary-fixed-variant": "#004881",
                        "tertiary-fixed-dim": "#35e0a3",
                        "primary-container": "#4da3ff",
                        "surface-container-high": "#212a39",
                        "outline-variant": "#404752",
                        "error-container": "#93000a",
                        "status-danger": "#FF5D5D",
                        "text-primary": "#EAF2FF",
                        "secondary-fixed-dim": "#46d6ff",
                        "inverse-primary": "#0060a9",
                        "surface-container-highest": "#2c3545",
                        "on-error": "#690005",
                        "on-background": "#d9e3f7",
                        "surface-card": "#101C30",
                        "primary": "#a2c9ff",
                        "on-tertiary-fixed-variant": "#005137",
                        "secondary": "#7ddeff",
                        "error": "#ffb4ab",
                        "tertiary-fixed": "#5cfdbd",
                        "background": "#0a1422",
                        "surface-bright": "#303a49",
                        "status-warning": "#F5C451",
                        "on-secondary-container": "#004e60",
                        "outline": "#8a919d",
                        "surface": "#0a1422",
                        "primary-fixed-dim": "#a2c9ff",
                        "inverse-on-surface": "#273140",
                        "on-secondary": "#003543",
                        "surface-container-lowest": "#050e1c",
                        "border-subtle": "#1D2A42",
                        "text-secondary": "#9FB0C7",
                        "secondary-container": "#00c6f0",
                        "surface-container": "#16202f",
                        "on-tertiary-container": "#003f2a",
                        "primary-fixed": "#d3e4ff",
                        "on-primary-container": "#003866",
                        "text-disabled": "#6E7C93",
                        "surface-dim": "#0a1422",
                        "on-secondary-fixed": "#001f28",
                        "on-error-container": "#ffdad6"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "margin-desktop": "32px",
                        "stack-sm": "8px",
                        "container-max": "1440px",
                        "stack-lg": "24px",
                        "margin-mobile": "16px",
                        "gutter": "20px",
                        "stack-md": "16px"
                    },
                    "fontFamily": {
                        "body-lg": ["Inter"],
                        "label-md": ["Inter"],
                        "headline-lg": ["Inter"],
                        "body-md": ["Inter"],
                        "headline-md": ["Inter"],
                        "display-numeric": ["Inter"],
                        "headline-sm": ["Inter"],
                        "label-sm": ["Inter"]
                    },
                    "fontSize": {
                        "body-lg": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                        "label-md": ["13px", {"lineHeight": "18px", "letterSpacing": "0.01em", "fontWeight": "500"}],
                        "headline-lg": ["32px", {"lineHeight": "40px", "fontWeight": "600"}],
                        "body-md": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                        "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                        "display-numeric": ["36px", {"lineHeight": "44px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                        "headline-sm": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
                        "label-sm": ["12px", {"lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "500"}]
                    }
                },
            },
        }
    </script>
<style>
        body {
            background-color: #0a1422;
            color: #d9e3f7;
            font-family: 'Inter', sans-serif;
        }
        .glass-card {
            background: rgba(16, 28, 48, 0.6);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(29, 42, 66, 0.5);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }
        .inner-glow-blue {
            box-shadow: inset 0 0 10px rgba(77, 163, 255, 0.1);
        }
        .inner-glow-green {
            box-shadow: inset 0 0 10px rgba(62, 230, 168, 0.1);
        }
        .radar-gradient {
            background: radial-gradient(circle, rgba(77, 163, 255, 0.15) 0%, transparent 70%);
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    </style>
</head>
<body class="antialiased overflow-hidden">
<!-- Sidebar (Shared Component) -->
<aside class="h-screen w-64 fixed left-0 top-0 bg-surface-panel border-r border-border-subtle flex flex-col py-stack-lg z-50">
<div class="px-6 mb-10">
<img alt="AlphaPilot Logo" class="h-8 w-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqsPloYEpgzW6f4D3PnguRDMlvR2BCN8iWz2Nf64AllLY5knoX8zB3-bs9hiMyWSj_GudTkGq5CRyU3K7JRLqK7aCbymjPg6PAPXDCiYpfml0ACTxrzaQ9jOQlLKthPuRS2kayc0-rLGpoim_yu8Ef3O1amOWqY0Uy_-wt_tmWF_EsiDvrTOWjwG1TYyeksMXRkY3V8dr2flrl0lljhr-wCHbw90iQqNg-Ns13v41UQ3B0PkCkQn39FACy-_WuiLI2Veo-dBI_wqkY">
</div>
<nav class="flex-1 px-4 space-y-2">
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary border-r-2 border-primary bg-primary-container/10 transition-colors" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">dashboard</span>
<span class="font-label-md text-label-md">Dashboard</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-text-disabled hover:bg-surface-container-high hover:text-text-primary transition-colors" href="#">
<span class="material-symbols-outlined">analytics</span>
<span class="font-label-md text-label-md">Stock Screener</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-text-disabled hover:bg-surface-container-high hover:text-text-primary transition-colors" href="#">
<span class="material-symbols-outlined">history</span>
<span class="font-label-md text-label-md">Backtesting</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-text-disabled hover:bg-surface-container-high hover:text-text-primary transition-colors" href="#">
<span class="material-symbols-outlined">security</span>
<span class="font-label-md text-label-md">Risk Management</span>
</a>
</nav>
<div class="px-4 mt-auto space-y-2">
<div class="p-4 bg-primary-container/10 border border-primary/20 rounded-xl mb-6">
<p class="font-label-sm text-label-sm text-primary mb-2">AlphaPilot Pro</p>
<p class="text-xs text-text-secondary mb-3 leading-relaxed">Access institutional-grade AI signals and deep liquidity data.</p>
<button class="w-full py-2 bg-primary-container text-on-primary-container font-label-md text-label-md rounded-lg hover:opacity-90 transition-opacity">Upgrade to Pro</button>
</div>
<a class="flex items-center gap-3 px-4 py-2 text-text-disabled hover:text-text-primary transition-colors" href="#">
<span class="material-symbols-outlined text-[20px]">settings</span>
<span class="font-label-md text-label-md">Settings</span>
</a>
<a class="flex items-center gap-3 px-4 py-2 text-text-disabled hover:text-text-primary transition-colors" href="#">
<span class="material-symbols-outlined text-[20px]">help</span>
<span class="font-label-md text-label-md">Support</span>
</a>
</div>
</aside>
<!-- Main Top Nav (Shared Component) -->
<header class="fixed top-0 right-0 left-64 z-40 bg-surface/80 backdrop-blur-xl border-b border-border-subtle shadow-sm h-16 flex justify-between items-center px-margin-desktop">
<div class="flex items-center gap-8">
<div class="relative w-80">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-disabled text-[20px]">search</span>
<input class="w-full bg-surface-container-lowest border-border-subtle rounded-full pl-10 pr-4 py-2 text-label-sm font-label-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Search ticker, strategy, or AI insight..." type="text">
</div>
<nav class="flex gap-6">
<a class="text-tertiary font-bold font-label-sm text-label-sm" href="#">Bullish</a>
<a class="text-text-secondary hover:text-primary transition-opacity font-label-sm text-label-sm" href="#">Low Risk</a>
</nav>
</div>
<div class="flex items-center gap-4">
<button class="p-2 text-text-secondary hover:text-primary transition-colors relative">
<span class="material-symbols-outlined">notifications</span>
<span class="absolute top-2 right-2 w-2 h-2 bg-tertiary rounded-full border border-background"></span>
</button>
<div class="flex items-center gap-3 pl-4 border-l border-border-subtle">
<div class="text-right">
<p class="font-label-sm text-label-sm text-text-primary">John Doe</p>
<p class="text-[10px] text-tertiary font-bold uppercase tracking-wider">Pro Account</p>
</div>
<div class="w-8 h-8 rounded-full bg-surface-container-high border border-border-subtle flex items-center justify-center">
<span class="material-symbols-outlined text-primary">account_circle</span>
</div>
</div>
</div>
</header>
<!-- Content Canvas -->
<main class="ml-64 pt-16 h-screen overflow-y-auto bg-background p-margin-desktop no-scrollbar">
<div class="max-w-container-max mx-auto grid grid-cols-12 gap-gutter">
<!-- LEFT COLUMN (65%) -->
<div class="col-span-12 lg:col-span-8 space-y-stack-lg">
<!-- Stock Header -->
<section class="flex flex-wrap items-end justify-between gap-stack-md">
<div class="flex items-start gap-stack-md">
<div class="w-14 h-14 rounded-xl glass-card flex items-center justify-center p-2">
<img alt="NVDA" class="w-full h-full object-contain rounded-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFpysW3ojF9WS5AOdx9RDRGufAa4uH9O4-t4_EXeWq7EyZe-3rA6eNbv0UokBdmCsvRi-dAwUQtMJ4JXo3fhQjpA1mbIo8__F6INxpo5_oDRB1bx10Jse2DPSMbqojzoC3YLvNDSVSAUOK4uZkfuADrNS37icS-G1tc4mqi4bsZCHURuNiBH_L6FCRFkLaKHlqtMwkpVmC1z_sjzcuxgkRMolTLdWYfuZ6Mu60xmHO1ZF12CbuSx_pV0h4u5oGdHj3A4f7IuzeoLlS">
</div>
<div>
<div class="flex items-center gap-3">
<h1 class="font-headline-lg text-headline-lg text-text-primary">NVDA</h1>
<span class="px-2 py-0.5 bg-surface-container-high text-text-secondary text-[10px] font-bold rounded uppercase">NASDAQ</span>
<span class="px-2 py-0.5 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded uppercase flex items-center gap-1">
<span class="material-symbols-outlined text-[12px]" style="font-variation-settings: 'FILL' 1;">bolt</span> AI TRACKING ACTIVE
                                </span>
</div>
<p class="font-body-lg text-body-lg text-text-secondary">NVIDIA Corporation</p>
</div>
</div>
<div class="text-right">
<div class="flex items-baseline gap-3">
<span class="font-display-numeric text-display-numeric text-text-primary">$894.32</span>
<span class="font-headline-sm text-headline-sm text-tertiary">+4.21%</span>
</div>
<p class="text-label-sm font-label-sm text-text-disabled flex items-center justify-end gap-1">
<span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Market Open • High Volume
                        </p>
</div>
</section>
<!-- TradingView Style Chart -->
<div class="glass-card rounded-xl overflow-hidden aspect-[16/9] relative group">
<div class="absolute inset-0 z-0 opacity-40">
<!-- Custom Chart Visual -->
<div class="h-full w-full bg-surface-container-lowest flex flex-col p-stack-md">
<div class="flex-1 grid grid-cols-30 items-end gap-[2px]">
<!-- Synthetic K-Lines -->
<div class="bg-status-danger w-full h-[60%] opacity-80 rounded-sm"></div>
<div class="bg-status-danger w-full h-[55%] opacity-80 rounded-sm"></div>
<div class="bg-tertiary w-full h-[58%] opacity-80 rounded-sm"></div>
<div class="bg-tertiary w-full h-[65%] opacity-80 rounded-sm border-t-2 border-tertiary shadow-[0_0_10px_rgba(58,230,168,0.3)]"></div>
<div class="bg-tertiary w-full h-[63%] opacity-80 rounded-sm"></div>
<div class="bg-tertiary w-full h-[70%] opacity-80 rounded-sm"></div>
<div class="bg-status-danger w-full h-[68%] opacity-80 rounded-sm"></div>
<div class="bg-tertiary w-full h-[75%] opacity-80 rounded-sm border-t-2 border-tertiary shadow-[0_0_10px_rgba(58,230,168,0.3)]"></div>
<div class="bg-tertiary w-full h-[82%] opacity-80 rounded-sm"></div>
<div class="bg-status-danger w-full h-[80%] opacity-80 rounded-sm"></div>
<div class="bg-tertiary w-full h-[85%] opacity-80 rounded-sm"></div>
<div class="bg-tertiary w-full h-[92%] opacity-80 rounded-sm border-t-2 border-tertiary shadow-[0_0_15px_rgba(58,230,168,0.4)]"></div>
</div>
</div>
</div>
<!-- Chart Overlay UI -->
<div class="absolute inset-0 p-6 flex flex-col justify-between z-10">
<div class="flex justify-between items-start">
<div class="flex gap-2">
<span class="px-2 py-1 bg-surface-container-highest/60 rounded text-[11px] font-bold">15M</span>
<span class="px-2 py-1 bg-primary text-on-primary-container rounded text-[11px] font-bold">1H</span>
<span class="px-2 py-1 bg-surface-container-highest/60 rounded text-[11px] font-bold">4H</span>
<span class="px-2 py-1 bg-surface-container-highest/60 rounded text-[11px] font-bold">D</span>
</div>
<div class="flex gap-4">
<div class="flex items-center gap-2 text-[11px] font-bold text-text-secondary">
<span class="w-2 h-2 rounded-full bg-primary-container"></span> MA(20) 882.14
                                </div>
<div class="flex items-center gap-2 text-[11px] font-bold text-text-secondary">
<span class="w-2 h-2 rounded-full bg-status-warning"></span> MA(50) 865.20
                                </div>
</div>
</div>
<div class="flex justify-end gap-2">
<button class="p-2 glass-card rounded hover:bg-surface-container-highest transition-colors">
<span class="material-symbols-outlined text-[20px]">fullscreen</span>
</button>
<button class="p-2 glass-card rounded hover:bg-surface-container-highest transition-colors">
<span class="material-symbols-outlined text-[20px]">add_circle</span>
</button>
</div>
</div>
<!-- Decorative Chart Background Image (Detailed Prompt) -->
<div class="hidden">
<img data-alt="A professional high-density financial trading terminal display featuring a candle-stick stock chart on a deep indigo and midnight black background. Glowing neon teal and vibrant blue lines represent complex moving averages and volume oscillators. The interface is clinical and technical, with a focus on data clarity, featuring a sophisticated glassmorphism effect and soft UI shadows typical of high-end fintech applications. The lighting is low-key, emphasizing the luminescent data points and digital clarity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj3I7zekMAVuqs1YeembKcmw8I5L5poMKiHbHZ1yE6JV4Ock_rkDZTmxzDLaicI1EOZ2L6zpqmg7TnuehFVkPjCyOE6nL8whY4oCVMxwRLJ2cc-8wPLjmDXrga4WwDPHok9grJ8CYIG3cLQZyLjk3sI_MCabLzsookqa4DycDP9TsbTL5ENxiQem8OgLXLkvqNOTSFjGbUO4KiCSejqkb9GuO0tBF8AIxbAJrwhsfLOv1k2DhQTY57TPskcQCbI7M0Tq5eLCLvzP_W">
</div>
</div>
<!-- Bottom Analysis Row -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
<!-- Institutional Intent Radar -->
<div class="glass-card rounded-xl p-stack-lg relative overflow-hidden">
<div class="flex items-center justify-between mb-6">
<h3 class="font-headline-sm text-headline-sm text-text-primary">Institutional Intent</h3>
<span class="material-symbols-outlined text-primary">hub</span>
</div>
<div class="flex items-center justify-center py-4">
<!-- Radar Mockup -->
<div class="relative w-48 h-48 border border-border-subtle rounded-full radar-gradient flex items-center justify-center">
<div class="absolute inset-0 flex items-center justify-center">
<div class="w-40 h-40 border border-border-subtle/50 rounded-full"></div>
<div class="w-24 h-24 border border-border-subtle/30 rounded-full"></div>
</div>
<div class="z-10 text-center">
<p class="text-[10px] text-tertiary font-black uppercase tracking-widest">Decision</p>
<p class="text-headline-sm font-headline-sm text-text-primary">Accumulate</p>
</div>
<!-- Signal Dots -->
<div class="absolute top-1/4 right-1/4 w-3 h-3 bg-tertiary rounded-full shadow-[0_0_15px_#3EE6A8] animate-pulse"></div>
<div class="absolute bottom-1/3 left-1/4 w-2 h-2 bg-primary rounded-full"></div>
</div>
</div>
<div class="grid grid-cols-2 gap-2 mt-4">
<div class="flex items-center gap-2 text-xs text-text-secondary px-3 py-2 bg-surface-container-lowest rounded-lg">
<span class="w-2 h-2 bg-tertiary rounded-full"></span> Accumulation: High
                            </div>
<div class="flex items-center gap-2 text-xs text-text-secondary px-3 py-2 bg-surface-container-lowest rounded-lg">
<span class="w-2 h-2 bg-status-danger rounded-full"></span> Shipping: Low
                            </div>
</div>
</div>
<!-- Evidence Chain -->
<div class="glass-card rounded-xl p-stack-lg border-l-4 border-tertiary">
<h3 class="font-headline-sm text-headline-sm text-text-primary mb-6">Evidence Chain</h3>
<ul class="space-y-4">
<li class="flex items-start gap-4">
<div class="mt-1 w-6 h-6 rounded-full bg-tertiary/20 flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
</div>
<div>
<p class="font-label-md text-label-md text-text-primary">Institutional Inflow Peak</p>
<p class="text-xs text-text-secondary">Top 5 hedge funds increased positions by 12% in the last 48h.</p>
</div>
</li>
<li class="flex items-start gap-4">
<div class="mt-1 w-6 h-6 rounded-full bg-tertiary/20 flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
</div>
<div>
<p class="font-label-md text-label-md text-text-primary">Golden Cross Confirmed</p>
<p class="text-xs text-text-secondary">MA20 crossed MA50 with volume expansion (2.4x avg).</p>
</div>
</li>
<li class="flex items-start gap-4">
<div class="mt-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined text-[16px] text-primary" style="font-variation-settings: 'FILL' 1;">psychology</span>
</div>
<div>
<p class="font-label-md text-label-md text-text-primary">AI Sentiment Jump</p>
<p class="text-xs text-text-secondary">Neural models detect positive shift in earnings call transcripts.</p>
</div>
</li>
</ul>
</div>
</div>
</div>
<!-- RIGHT COLUMN (35%) -->
<div class="col-span-12 lg:col-span-4 space-y-stack-lg">
<!-- AI TRADING DECISION CARD -->
<section class="glass-card rounded-2xl p-6 border-2 border-primary/20 inner-glow-blue">
<div class="flex items-center justify-between mb-8">
<div>
<p class="text-[10px] font-black uppercase text-primary tracking-widest mb-1">AI STRATEGY: ALPHA_V4</p>
<h2 class="font-headline-md text-headline-md text-text-primary">Strong Buy</h2>
</div>
<div class="text-center">
<p class="text-[10px] text-text-secondary font-bold mb-1">PROBABILITY</p>
<div class="w-16 h-16 rounded-full border-4 border-primary flex items-center justify-center">
<span class="font-display-numeric text-headline-md text-primary">92%</span>
</div>
</div>
</div>
<div class="space-y-4 mb-8">
<div class="flex justify-between items-center p-4 bg-surface-container-lowest rounded-xl border border-border-subtle">
<span class="text-label-md text-text-secondary">Buy Range</span>
<span class="font-display-numeric text-headline-sm text-text-primary">$890 - $895</span>
</div>
<div class="flex justify-between items-center p-4 bg-surface-container-lowest rounded-xl border border-border-subtle">
<span class="text-label-md text-text-secondary">Target Price</span>
<span class="font-display-numeric text-headline-sm text-tertiary">$1,020.00</span>
</div>
<div class="flex justify-between items-center p-4 bg-surface-container-lowest rounded-xl border border-border-subtle">
<span class="text-label-md text-text-secondary">Stop Loss</span>
<span class="font-display-numeric text-headline-sm text-status-danger">$862.50</span>
</div>
</div>
<div class="flex gap-3">
<button class="flex-1 py-4 bg-primary-container text-on-primary-container font-headline-sm text-headline-sm rounded-xl hover:shadow-[0_0_20px_rgba(77,163,255,0.4)] transition-all">Buy Now</button>
<button class="p-4 glass-card border-border-subtle rounded-xl text-text-primary">
<span class="material-symbols-outlined">bookmark</span>
</button>
</div>
</section>
<!-- Multi-cycle Resonance Analysis -->
<section class="glass-card rounded-xl p-6">
<h3 class="font-headline-sm text-headline-sm text-text-primary mb-6">Cycle Resonance</h3>
<div class="grid grid-cols-2 gap-4">
<div class="p-3 bg-surface-container-lowest rounded-xl border border-tertiary/20">
<p class="text-[10px] text-text-disabled font-bold mb-1">15M SHORT</p>
<div class="flex items-center justify-between">
<span class="text-tertiary font-bold">BULLISH</span>
<span class="material-symbols-outlined text-tertiary text-[18px]">trending_up</span>
</div>
</div>
<div class="p-3 bg-surface-container-lowest rounded-xl border border-tertiary/20">
<p class="text-[10px] text-text-disabled font-bold mb-1">1H INTRADAY</p>
<div class="flex items-center justify-between">
<span class="text-tertiary font-bold">BULLISH</span>
<span class="material-symbols-outlined text-tertiary text-[18px]">trending_up</span>
</div>
</div>
<div class="p-3 bg-surface-container-lowest rounded-xl border border-primary/20">
<p class="text-[10px] text-text-disabled font-bold mb-1">4H SWING</p>
<div class="flex items-center justify-between">
<span class="text-primary font-bold">SIDEWAYS</span>
<span class="material-symbols-outlined text-primary text-[18px]">trending_flat</span>
</div>
</div>
<div class="p-3 bg-surface-container-lowest rounded-xl border border-tertiary/20">
<p class="text-[10px] text-text-disabled font-bold mb-1">DAILY TREND</p>
<div class="flex items-center justify-between">
<span class="text-tertiary font-bold">BULLISH</span>
<span class="material-symbols-outlined text-tertiary text-[18px]">trending_up</span>
</div>
</div>
</div>
</section>
<!-- Risk Control & Invalidation -->
<section class="bg-status-danger/10 border border-status-danger/30 rounded-xl p-6">
<div class="flex items-center gap-3 mb-4">
<div class="p-2 bg-status-danger rounded-lg">
<span class="material-symbols-outlined text-on-primary text-[20px]" style="font-variation-settings: 'FILL' 1;">warning</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-status-danger">Invalidation Alert</h3>
</div>
<div class="space-y-4">
<div class="flex items-center gap-4 border-b border-status-danger/20 pb-4">
<span class="font-display-numeric text-headline-sm text-text-primary">$860.00</span>
<p class="text-xs text-text-secondary leading-tight">Close below this level invalidates current long-term bullish resonance.</p>
</div>
<p class="text-xs text-text-secondary italic">Conditions: Invalidation is triggered only on a 1-hour candle close basis with sustained volume above 1.5M.</p>
</div>
</section>
</div>
</div>
</main>
<!-- Floating AI Assistant Button (Contextual) -->
<div class="fixed bottom-8 right-8 z-50">
<button class="w-14 h-14 bg-primary text-on-primary-container rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
<span class="material-symbols-outlined text-[28px]" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
</button>
</div>
<script>
        // Simple micro-interaction for the Buy Now button
        const buyBtn = document.querySelector('button.bg-primary-container');
        if (buyBtn) {
            buyBtn.addEventListener('mousedown', () => buyBtn.classList.add('scale-[0.98]'));
            buyBtn.addEventListener('mouseup', () => buyBtn.classList.remove('scale-[0.98]'));
        }

        // Radar Animation logic (simulated)
        const radarDot = document.querySelector('.radar-gradient .animate-pulse');
        setInterval(() => {
            const x = Math.random() * 80 + 10;
            const y = Math.random() * 80 + 10;
            if(radarDot) {
                radarDot.style.transition = 'all 2s ease-in-out';
                radarDot.style.top = `${y}%`;
                radarDot.style.right = `${x}%`;
            }
        }, 3000);
    </script>
</body></html>

<!-- AlphaPilot Stock Detail - 核心决策工作台 (V2) -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #0a1422;
        }
        .glass-panel {
            background: rgba(16, 28, 48, 0.6);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(29, 42, 66, 0.5);
        }
        .glass-card {
            background: rgba(22, 32, 47, 0.8);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(64, 71, 82, 0.3);
        }
        .neon-glow-primary {
            box-shadow: 0 0 15px -3px rgba(77, 163, 255, 0.3);
        }
        .neon-glow-success {
            box-shadow: 0 0 15px -3px rgba(62, 230, 168, 0.3);
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #2c3545;
            border-radius: 10px;
        }
    </style>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "on-error-container": "#ffdad6",
                    "secondary": "#7ddeff",
                    "background": "#0a1422",
                    "surface-container-lowest": "#050e1c",
                    "error": "#ffb4ab",
                    "surface-container": "#16202f",
                    "on-secondary-fixed": "#001f28",
                    "surface-panel": "#0C1728",
                    "inverse-surface": "#d9e3f7",
                    "secondary-fixed": "#b5ebff",
                    "on-primary-fixed-variant": "#004881",
                    "tertiary-fixed-dim": "#35e0a3",
                    "text-secondary": "#9FB0C7",
                    "on-tertiary-container": "#003f2a",
                    "surface": "#0a1422",
                    "on-tertiary": "#003825",
                    "tertiary-container": "#00b680",
                    "on-tertiary-fixed": "#002114",
                    "on-primary-fixed": "#001c38",
                    "status-danger": "#FF5D5D",
                    "tertiary": "#35e0a3",
                    "text-disabled": "#6E7C93",
                    "secondary-fixed-dim": "#46d6ff",
                    "on-tertiary-fixed-variant": "#005137",
                    "on-primary-container": "#003866",
                    "primary-container": "#4da3ff",
                    "primary": "#a2c9ff",
                    "surface-bright": "#303a49",
                    "surface-tint": "#a2c9ff",
                    "surface-card": "#101C30",
                    "inverse-primary": "#0060a9",
                    "surface-variant": "#2c3545",
                    "on-secondary-fixed-variant": "#004e60",
                    "inverse-on-surface": "#273140",
                    "on-background": "#d9e3f7",
                    "surface-container-low": "#121c2a",
                    "primary-fixed": "#d3e4ff",
                    "surface-container-highest": "#2c3545",
                    "secondary-container": "#00c6f0",
                    "error-container": "#93000a",
                    "text-primary": "#EAF2FF",
                    "outline-variant": "#404752",
                    "surface-container-high": "#212a39",
                    "surface-dim": "#0a1422",
                    "status-warning": "#F5C451",
                    "primary-fixed-dim": "#a2c9ff",
                    "on-surface": "#d9e3f7",
                    "border-subtle": "#1D2A42",
                    "tertiary-fixed": "#5cfdbd",
                    "on-error": "#690005",
                    "outline": "#8a919d",
                    "on-surface-variant": "#c0c7d4",
                    "on-secondary-container": "#004e60",
                    "on-secondary": "#003543",
                    "on-primary": "#00315b"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "stack-lg": "24px",
                    "container-max": "1440px",
                    "gutter": "20px",
                    "stack-sm": "8px",
                    "margin-mobile": "16px",
                    "margin-desktop": "32px",
                    "stack-md": "16px"
            },
            "fontFamily": {
                    "label-sm": ["Inter"],
                    "body-lg": ["Inter"],
                    "display-numeric": ["Inter"],
                    "body-md": ["Inter"],
                    "headline-lg-mobile": ["Inter"],
                    "headline-lg": ["Inter"],
                    "label-md": ["Inter"],
                    "headline-md": ["Inter"],
                    "headline-sm": ["Inter"]
            },
            "fontSize": {
                    "label-sm": ["12px", {"lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "500"}],
                    "body-lg": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                    "display-numeric": ["36px", {"lineHeight": "44px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "body-md": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                    "headline-lg-mobile": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                    "headline-lg": ["32px", {"lineHeight": "40px", "fontWeight": "600"}],
                    "label-md": ["13px", {"lineHeight": "18px", "letterSpacing": "0.01em", "fontWeight": "500"}],
                    "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                    "headline-sm": ["20px", {"lineHeight": "28px", "fontWeight": "600"}]
            }
          },
        },
      }
    </script>
</head>
<body class="bg-background text-on-background min-h-screen">
<!-- SideNavBar -->
<aside class="fixed left-0 top-0 h-screen w-64 bg-surface-panel border-r border-border-subtle shadow-lg flex flex-col p-stack-md gap-stack-lg z-50">
<div class="flex items-center gap-3 px-2">
<img alt="AlphaPilot Logo" class="h-8 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXYrnOk5Yrfwf_iXYQqW-X5D5ODFgCcbtoal50kTsR7ytMQGMSgElSyJO1_8U4nyESbswpkzpK0eCqjzlqS3ca5YrDrQg-7vZOMog_wb_0YGyOfiGYCuqRaKJVu0fWnnDqxiq8MBXRoXBi6q5uV5n1CMVyRg06gRp5Ab-YALvVLR6Q7MYMP2luIH5PFfHE5O3JGAf4ESAuQ7UM_HHFcaIX0e9_C0gdOkzMyumGptGioo1_tVg0UcvLI59VWgulpzYnE_U0asc22FDa"/>
<div class="flex flex-col">
<span class="font-headline-sm text-headline-sm font-black text-primary tracking-tight">AlphaPilot</span>
<span class="text-[10px] text-text-secondary uppercase tracking-widest">AI Trading Intelligence</span>
</div>
</div>
<nav class="flex-1 space-y-2">
<a class="flex items-center gap-3 px-3 py-2 text-text-secondary hover:bg-surface-container-high transition-all rounded-lg group" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span class="font-label-md text-label-md">Dashboard</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 bg-primary-container text-on-primary-container rounded-lg font-bold shadow-lg shadow-primary/10" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">query_stats</span>
<span class="font-label-md text-label-md">Stock Screener</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 text-text-secondary hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span class="material-symbols-outlined">history_edu</span>
<span class="font-label-md text-label-md">Backtesting</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 text-text-secondary hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span class="material-symbols-outlined">security</span>
<span class="font-label-md text-label-md">Risk Management</span>
</a>
</nav>
<div class="p-4 bg-surface-container rounded-xl border border-border-subtle">
<p class="text-label-sm font-label-sm text-text-secondary mb-2">PRO ACCESS</p>
<p class="text-body-md font-body-md text-text-primary mb-4 leading-tight">Unlock AI Deep Analysis</p>
<button class="w-full py-2 bg-primary-container text-on-primary-container rounded-lg font-bold text-label-md transition-transform active:scale-95">Upgrade to Pro</button>
</div>
<div class="space-y-1">
<a class="flex items-center gap-3 px-3 py-2 text-text-secondary hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span class="material-symbols-outlined">help</span>
<span class="font-label-md text-label-md">Support</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 text-text-secondary hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span class="material-symbols-outlined">person</span>
<span class="font-label-md text-label-md">Account</span>
</a>
</div>
</aside>
<!-- TopNavBar -->
<header class="fixed top-0 right-0 h-16 flex justify-between items-center bg-background border-b border-border-subtle px-margin-desktop z-40 transition-all" style="left: 16rem;">
<div class="flex items-center gap-8">
<div class="relative flex items-center">
<span class="material-symbols-outlined absolute left-3 text-text-disabled">search</span>
<input class="bg-surface-container-low border border-border-subtle rounded-full py-1.5 pl-10 pr-4 text-label-md focus:outline-none focus:border-primary w-64 transition-all" placeholder="Search NVDA, AAPL, BTC..." type="text"/>
</div>
<nav class="hidden md:flex gap-6">
<a class="text-text-secondary font-label-md text-label-md hover:text-text-primary transition-colors" href="#">Markets</a>
<a class="text-primary font-bold border-b-2 border-primary py-5" href="#">Portfolio</a>
<a class="text-text-secondary font-label-md text-label-md hover:text-text-primary transition-colors" href="#">Signals</a>
</nav>
</div>
<div class="flex items-center gap-4">
<button class="p-2 text-text-secondary hover:bg-surface-variant rounded-full transition-colors relative">
<span class="material-symbols-outlined">notifications</span>
<span class="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
</button>
<button class="p-2 text-text-secondary hover:bg-surface-variant rounded-full transition-colors">
<span class="material-symbols-outlined">settings</span>
</button>
<div class="h-8 w-[1px] bg-border-subtle mx-2"></div>
<div class="flex items-center gap-3">
<div class="text-right hidden sm:block">
<p class="text-label-md font-bold text-text-primary leading-none">Alex Rivera</p>
<p class="text-[10px] text-text-secondary">PRO TRADER</p>
</div>
<div class="w-8 h-8 rounded-full bg-surface-variant border border-border-subtle flex items-center justify-center overflow-hidden">
<img alt="User profile" class="w-full h-full object-cover" data-alt="A high-quality professional headshot of a Hispanic male trader in his early 30s, wearing a crisp white shirt and a modern blazer. The background is a blurred high-end office with soft blue neon ambient lighting, reflecting a corporate modern and technologically advanced atmosphere. The lighting is sophisticated, emphasizing a clean and professional aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUBpHBUGILJLwGTPomUBnlEguDWrF3xae20HwFTlBGUo1LmjeThNHzN3PqxK570Wgux8YBKYV1Prv_cKSoHAD4Ce-FH5dvgQA_p3AEBs1u8rmOMF1QkpPiznwqxi2VWGMLpT3xtT3udN21JHV7TbwdbFDItJhHAcc4mOG1km597I1HUAGTG4bnbSf2KD4Xnbap_vDOxKt28TdFGX1fm-e1buQ38M2MgJ4Rbuq8hMC_uF8X3tWMGNLlpDM1Ttisn4aRd0OpPeeXs8qG"/>
</div>
</div>
</div>
</header>
<!-- Main Content -->
<main class="pt-16 pl-64 min-h-screen">
<div class="max-w-[1440px] mx-auto p-margin-desktop space-y-gutter">
<!-- Stock Header -->
<div class="flex flex-wrap items-end justify-between gap-4">
<div class="space-y-1">
<div class="flex items-center gap-3">
<h1 class="font-headline-lg text-headline-lg font-extrabold tracking-tight text-text-primary">NVDA</h1>
<span class="px-2 py-0.5 bg-surface-container-highest border border-border-subtle text-[10px] font-bold rounded uppercase tracking-wider text-text-secondary">NVIDIA CORP.</span>
<div class="flex items-center gap-1.5 px-2 py-0.5 bg-tertiary-container/20 text-tertiary rounded-full border border-tertiary/30">
<span class="w-1.5 h-1.5 bg-tertiary rounded-full animate-pulse"></span>
<span class="text-[10px] font-bold uppercase">Market Open</span>
</div>
</div>
<div class="flex items-baseline gap-4">
<span class="font-display-numeric text-display-numeric text-text-primary">$875.28</span>
<div class="flex items-center text-tertiary gap-1">
<span class="material-symbols-outlined text-sm">arrow_upward</span>
<span class="font-bold text-headline-sm">+$24.12 (+2.83%)</span>
</div>
</div>
</div>
<div class="flex gap-2">
<button class="flex items-center gap-2 px-4 py-2 bg-surface-container border border-border-subtle rounded-lg text-label-md font-bold hover:bg-surface-variant transition-colors">
<span class="material-symbols-outlined text-sm">star</span>
                        Watchlist
                    </button>
<button class="flex items-center gap-2 px-4 py-2 bg-surface-container border border-border-subtle rounded-lg text-label-md font-bold hover:bg-surface-variant transition-colors">
<span class="material-symbols-outlined text-sm">share</span>
                        Share Signal
                    </button>
</div>
</div>
<!-- Upper Section: Chart & AI Decision -->
<div class="grid grid-cols-12 gap-gutter">
<!-- Left: Chart (70%) -->
<div class="col-span-12 lg:col-span-8 glass-panel rounded-2xl overflow-hidden min-h-[500px] flex flex-col">
<div class="p-4 border-b border-border-subtle flex items-center justify-between bg-surface-container/30">
<div class="flex gap-2">
<button class="px-3 py-1 bg-surface-variant rounded text-label-sm font-bold text-primary">1H</button>
<button class="px-3 py-1 hover:bg-surface-variant rounded text-label-sm font-bold text-text-secondary">4H</button>
<button class="px-3 py-1 hover:bg-surface-variant rounded text-label-sm font-bold text-text-secondary">1D</button>
<div class="w-[1px] bg-border-subtle mx-2"></div>
<button class="px-2 py-1 hover:bg-surface-variant rounded text-text-secondary"><span class="material-symbols-outlined text-base">candlestick_chart</span></button>
<button class="px-2 py-1 hover:bg-surface-variant rounded text-text-secondary"><span class="material-symbols-outlined text-base">monitoring</span></button>
</div>
<div class="flex items-center gap-4 text-text-secondary text-[11px] font-mono">
<span>O: 852.10</span>
<span>H: 878.50</span>
<span>L: 849.20</span>
<span class="text-tertiary">C: 875.28</span>
</div>
</div>
<div class="flex-1 relative bg-[#07111f] p-4">
<!-- Custom SVG Chart Simulation -->
<div class="absolute inset-0 p-8 flex flex-col justify-between">
<div class="w-full h-full relative">
<!-- Grid Lines -->
<div class="absolute inset-0 grid grid-rows-6 pointer-events-none opacity-10">
<div class="border-t border-text-secondary"></div>
<div class="border-t border-text-secondary"></div>
<div class="border-t border-text-secondary"></div>
<div class="border-t border-text-secondary"></div>
<div class="border-t border-text-secondary"></div>
<div class="border-t border-text-secondary"></div>
</div>
<!-- Candlesticks simulation -->
<div class="absolute inset-0 flex items-end justify-around pb-4">
<div class="w-3 bg-tertiary rounded-sm h-[40%]" style="box-shadow: 0 0 10px rgba(62, 230, 168, 0.2)"></div>
<div class="w-3 bg-status-danger rounded-sm h-[35%]"></div>
<div class="w-3 bg-tertiary rounded-sm h-[55%]"></div>
<div class="w-3 bg-tertiary rounded-sm h-[45%]"></div>
<div class="w-3 bg-status-danger rounded-sm h-[30%]"></div>
<div class="w-3 bg-tertiary rounded-sm h-[65%]"></div>
<div class="w-3 bg-tertiary rounded-sm h-[85%] neon-glow-success border border-tertiary/50"></div>
<div class="w-3 bg-tertiary rounded-sm h-[75%]"></div>
</div>
<!-- AI Prediction Overlay -->
<div class="absolute right-0 top-[15%] w-1/3 h-[2px] bg-primary-container border-t border-dashed border-primary animate-pulse"></div>
<div class="absolute right-4 top-[10%] bg-primary-container text-on-primary-container px-2 py-1 rounded text-[10px] font-bold">TARGET $920.00</div>
</div>
</div>
</div>
</div>
<!-- Right: AI Decision (30%) -->
<div class="col-span-12 lg:col-span-4 glass-card rounded-2xl p-6 flex flex-col border-primary/20 neon-glow-primary">
<div class="flex items-center justify-between mb-6">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">psychology</span>
<span class="font-label-md text-label-md text-primary font-bold uppercase tracking-widest">AI Intelligence</span>
</div>
<span class="px-2 py-1 bg-surface-container text-text-secondary text-[10px] rounded border border-border-subtle">Updated 2m ago</span>
</div>
<div class="text-center space-y-2 mb-8">
<div class="relative inline-block">
<svg class="w-32 h-32 transform -rotate-90">
<circle class="text-surface-container" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" stroke-width="8"></circle>
<circle class="text-primary-container" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" stroke-dasharray="364.4" stroke-dashoffset="21.8" stroke-width="8" style="transition: stroke-dashoffset 1s ease-out;"></circle>
</svg>
<div class="absolute inset-0 flex flex-col items-center justify-center">
<span class="font-display-numeric text-4xl text-text-primary">94%</span>
<span class="text-[10px] text-text-secondary uppercase">Confidence</span>
</div>
</div>
<h2 class="text-headline-md font-bold text-tertiary">Strong Buy</h2>
</div>
<div class="space-y-4 mb-8">
<div class="flex justify-between items-center p-3 bg-surface-container-low rounded-xl border border-border-subtle">
<span class="text-label-md text-text-secondary">Entry Range</span>
<span class="text-label-md font-bold text-text-primary">$872.50 - $876.00</span>
</div>
<div class="flex justify-between items-center p-3 bg-surface-container-low rounded-xl border border-border-subtle">
<span class="text-label-md text-text-secondary">Target Price</span>
<span class="text-label-md font-bold text-tertiary">$920.00</span>
</div>
<div class="flex justify-between items-center p-3 bg-surface-container-low rounded-xl border border-border-subtle">
<span class="text-label-md text-text-secondary">Stop Loss</span>
<span class="text-label-md font-bold text-status-danger">$858.50</span>
</div>
</div>
<button class="mt-auto w-full py-4 bg-primary-container text-on-primary-container rounded-xl font-bold headline-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                        Execute Trade
                        <span class="material-symbols-outlined">bolt</span>
</button>
</div>
</div>
<!-- Lower Section: Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
<!-- Col 1: Institutional Intent -->
<div class="glass-panel rounded-2xl p-5 border border-border-subtle">
<h3 class="font-label-md text-label-md text-text-secondary uppercase mb-4 flex items-center gap-2">
<span class="material-symbols-outlined text-sm">groups</span>
                        Institutional Intent
                    </h3>
<div class="flex items-center justify-center h-32 mb-4">
<!-- Simulated Radar Chart -->
<div class="relative w-28 h-28 border-2 border-border-subtle rounded-full flex items-center justify-center">
<div class="absolute inset-0 grid grid-cols-2 grid-rows-2">
<div class="border-r border-b border-border-subtle/50"></div>
<div class="border-b border-border-subtle/50"></div>
<div class="border-r border-border-subtle/50"></div>
<div></div>
</div>
<div class="w-20 h-20 bg-primary/20 border border-primary rounded-[30%_70%_70%_30% / 30%_30%_70%_70%] animate-pulse"></div>
</div>
</div>
<div class="flex justify-between items-center">
<div class="text-center">
<p class="text-[10px] text-text-secondary uppercase">Accumulation</p>
<p class="text-label-md font-bold text-tertiary">High</p>
</div>
<div class="w-[1px] h-8 bg-border-subtle"></div>
<div class="text-center">
<p class="text-[10px] text-text-secondary uppercase">Dark Pool</p>
<p class="text-label-md font-bold text-primary">+12.4%</p>
</div>
</div>
</div>
<!-- Col 2: Money Flow -->
<div class="glass-panel rounded-2xl p-5 border border-border-subtle">
<h3 class="font-label-md text-label-md text-text-secondary uppercase mb-4 flex items-center gap-2">
<span class="material-symbols-outlined text-sm">payments</span>
                        Money Flow
                    </h3>
<div class="space-y-4">
<div>
<div class="flex justify-between text-[11px] mb-1">
<span class="text-text-secondary">Net Inflow (24h)</span>
<span class="text-tertiary font-bold">+$1.4B</span>
</div>
<div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-tertiary w-[78%]"></div>
</div>
</div>
<div>
<div class="flex justify-between text-[11px] mb-1">
<span class="text-text-secondary">Chip Concentration</span>
<span class="text-primary font-bold">82.5%</span>
</div>
<div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-primary-container w-[82.5%]"></div>
</div>
</div>
<div class="pt-2 flex gap-2">
<span class="px-2 py-1 bg-surface-container border border-border-subtle rounded text-[9px] font-bold text-text-secondary">RETAIL: -2.1%</span>
<span class="px-2 py-1 bg-tertiary/10 border border-tertiary/30 rounded text-[9px] font-bold text-tertiary">WHALES: +5.4%</span>
</div>
</div>
</div>
<!-- Col 3: Evidence Chain -->
<div class="glass-panel rounded-2xl p-5 border border-border-subtle">
<h3 class="font-label-md text-label-md text-text-secondary uppercase mb-4 flex items-center gap-2">
<span class="material-symbols-outlined text-sm">fact_check</span>
                        Evidence Chain
                    </h3>
<ul class="space-y-2.5">
<li class="flex items-center gap-2">
<span class="material-symbols-outlined text-tertiary text-lg" style="font-variation-settings: 'FILL' 1;">check_circle</span>
<span class="text-label-md text-text-primary">Golden Cross (MA50/200)</span>
</li>
<li class="flex items-center gap-2">
<span class="material-symbols-outlined text-tertiary text-lg" style="font-variation-settings: 'FILL' 1;">check_circle</span>
<span class="text-label-md text-text-primary">Bullish RSI Divergence</span>
</li>
<li class="flex items-center gap-2">
<span class="material-symbols-outlined text-tertiary text-lg" style="font-variation-settings: 'FILL' 1;">check_circle</span>
<span class="text-label-md text-text-primary">Sentiment Jump (Social)</span>
</li>
<li class="flex items-center gap-2">
<span class="material-symbols-outlined text-text-disabled text-lg">radio_button_unchecked</span>
<span class="text-label-md text-text-disabled">Earnings Outperformance</span>
</li>
</ul>
</div>
<!-- Col 4: Risk & Invalidation -->
<div class="glass-panel rounded-2xl p-5 border border-border-subtle flex flex-col">
<h3 class="font-label-md text-label-md text-text-secondary uppercase mb-4 flex items-center gap-2">
<span class="material-symbols-outlined text-sm">warning</span>
                        Risk &amp; Invalidation
                    </h3>
<div class="p-3 bg-error-container/10 border border-status-danger/40 rounded-xl mb-4">
<p class="text-[10px] text-status-danger font-bold uppercase mb-1">Invalidation Logic</p>
<p class="text-label-sm text-on-error-container leading-snug">Signal fails if price breaks below $858.50 on high volume.</p>
</div>
<div class="mt-auto grid grid-cols-2 gap-2">
<div class="bg-surface-container-low p-2 rounded-lg border border-border-subtle">
<p class="text-[9px] text-text-secondary uppercase">Win Rate</p>
<p class="text-label-md font-bold text-text-primary">74.2%</p>
</div>
<div class="bg-surface-container-low p-2 rounded-lg border border-border-subtle">
<p class="text-[9px] text-text-secondary uppercase">P/L Ratio</p>
<p class="text-label-md font-bold text-text-primary">3.4:1</p>
</div>
</div>
</div>
</div>
</div>
</main>
<script>
        // Micro-interactions and subtle effects
        document.querySelectorAll('.glass-panel, .glass-card').forEach(panel => {
            panel.addEventListener('mouseenter', () => {
                panel.style.transform = 'translateY(-2px)';
                panel.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            panel.addEventListener('mouseleave', () => {
                panel.style.transform = 'translateY(0)';
            });
        });

        // Simulating live data update every 10 seconds
        setInterval(() => {
            const price = 875.28 + (Math.random() * 2 - 1);
            const priceEl = document.querySelector('.font-display-numeric');
            if(priceEl) priceEl.innerText = `$${price.toFixed(2)}`;
        }, 10000);
    </script>
</body></html>

<!-- AlphaPilot Backtesting - 策略回测与复盘页 -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Backtesting Review | AlphaPilot</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #07111F;
            color: #EAF2FF;
            margin: 0;
            overflow-x: hidden;
        }
        .glass-panel {
            background: rgba(16, 28, 48, 0.7);
            backdrop-filter: blur(16px);
            border: 1px solid #1D2A42;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        /* Custom scrollbar for high-density tables */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0a1422; }
        ::-webkit-scrollbar-thumb { background: #1D2A42; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #4DA3FF; }
    </style>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                "primary-fixed": "#d3e4ff",
                "on-primary-container": "#003866",
                "surface-bright": "#303a49",
                "secondary-fixed-dim": "#46d6ff",
                "tertiary-fixed": "#5cfdbd",
                "on-tertiary": "#003825",
                "surface-container-highest": "#2c3545",
                "background": "#0a1422",
                "surface-tint": "#a2c9ff",
                "outline-variant": "#404752",
                "status-warning": "#F5C451",
                "on-tertiary-container": "#003f2a",
                "text-disabled": "#6E7C93",
                "surface-container-high": "#212a39",
                "outline": "#8a919d",
                "on-tertiary-fixed": "#002114",
                "surface-dim": "#0a1422",
                "secondary-fixed": "#b5ebff",
                "text-secondary": "#9FB0C7",
                "on-primary-fixed-variant": "#004881",
                "on-secondary": "#003543",
                "on-error-container": "#ffdad6",
                "surface": "#0a1422",
                "surface-container": "#16202f",
                "inverse-surface": "#d9e3f7",
                "on-secondary-container": "#004e60",
                "tertiary-container": "#00b680",
                "on-primary": "#00315b",
                "tertiary-fixed-dim": "#35e0a3",
                "primary-container": "#4da3ff",
                "on-secondary-fixed-variant": "#004e60",
                "text-primary": "#EAF2FF",
                "surface-card": "#101C30",
                "primary-fixed-dim": "#a2c9ff",
                "on-surface-variant": "#c0c7d4",
                "error-container": "#93000a",
                "on-background": "#d9e3f7",
                "secondary": "#7ddeff",
                "border-subtle": "#1D2A42",
                "on-error": "#690005",
                "on-tertiary-fixed-variant": "#005137",
                "primary": "#a2c9ff",
                "surface-container-low": "#121c2a",
                "on-primary-fixed": "#001c38",
                "tertiary": "#35e0a3",
                "status-danger": "#FF5D5D",
                "secondary-container": "#00c6f0",
                "surface-variant": "#2c3545",
                "on-secondary-fixed": "#001f28",
                "surface-container-lowest": "#050e1c",
                "surface-panel": "#0C1728",
                "on-surface": "#d9e3f7",
                "inverse-on-surface": "#273140",
                "inverse-primary": "#0060a9",
                "error": "#ffb4ab"
              },
              "borderRadius": {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
              },
              "spacing": {
                "stack-lg": "24px",
                "stack-sm": "8px",
                "stack-md": "16px",
                "margin-desktop": "32px",
                "container-max": "1440px",
                "margin-mobile": "16px",
                "gutter": "20px"
              },
              "fontFamily": {
                "headline-md": ["Inter"],
                "display-numeric": ["Inter"],
                "label-sm": ["Inter"],
                "headline-sm": ["Inter"],
                "body-md": ["Inter"],
                "body-lg": ["Inter"],
                "label-md": ["Inter"],
                "headline-lg": ["Inter"],
                "headline-lg-mobile": ["Inter"]
              },
              "fontSize": {
                "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                "display-numeric": ["36px", {"lineHeight": "44px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                "label-sm": ["12px", {"lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "500"}],
                "headline-sm": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
                "body-md": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                "body-lg": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                "label-md": ["13px", {"lineHeight": "18px", "letterSpacing": "0.01em", "fontWeight": "500"}],
                "headline-lg": ["32px", {"lineHeight": "40px", "fontWeight": "600"}],
                "headline-lg-mobile": ["24px", {"lineHeight": "32px", "fontWeight": "600"}]
              }
            }
          }
        }
    </script>
</head>
<body class="bg-background text-text-primary">
<!-- SIDE NAV BAR (FROM SHARED COMPONENTS) -->
<aside class="fixed left-0 top-0 h-full w-64 bg-surface-container-low border-r border-outline-variant flex flex-col z-40">
<div class="p-6">
<h1 class="font-headline-md text-headline-md font-bold text-primary tracking-tight">AlphaPilot</h1>
<p class="font-label-md text-label-md text-text-secondary mt-1">AI Terminal Active</p>
</div>
<nav class="flex-grow space-y-1 px-3">
<a class="flex items-center gap-3 px-4 py-3 text-text-secondary hover:bg-surface-container-high transition-all duration-200 rounded-lg group" href="#">
<span class="material-symbols-outlined group-hover:text-primary">dashboard</span>
<span class="font-label-md text-label-md">Dashboard</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-text-secondary hover:bg-surface-container-high transition-all duration-200 rounded-lg group" href="#">
<span class="material-symbols-outlined group-hover:text-primary">query_stats</span>
<span class="font-label-md text-label-md">Stock Screener</span>
</a>
<!-- ACTIVE TAB: Backtesting -->
<a class="flex items-center gap-3 px-4 py-3 text-primary bg-primary-container/10 border-r-2 border-primary group" href="#">
<span class="material-symbols-outlined">history_toggle_off</span>
<span class="font-label-md text-label-md">Backtesting</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-text-secondary hover:bg-surface-container-high transition-all duration-200 rounded-lg group" href="#">
<span class="material-symbols-outlined group-hover:text-primary">security</span>
<span class="font-label-md text-label-md">Risk Management</span>
</a>
</nav>
<div class="p-4 border-t border-outline-variant space-y-1">
<button class="w-full bg-primary text-on-primary-fixed py-2 px-4 rounded font-label-md text-label-md font-bold mb-4 active:scale-95 transition-transform">
                New Analysis
            </button>
<a class="flex items-center gap-3 px-4 py-2 text-text-secondary hover:text-text-primary transition-colors" href="#">
<span class="material-symbols-outlined text-sm">settings</span>
<span class="font-label-md text-label-md">Settings</span>
</a>
<a class="flex items-center gap-3 px-4 py-2 text-text-secondary hover:text-text-primary transition-colors" href="#">
<span class="material-symbols-outlined text-sm">help</span>
<span class="font-label-md text-label-md">Support</span>
</a>
</div>
</aside>
<!-- TOP NAV BAR (FROM SHARED COMPONENTS) -->
<header class="fixed top-0 right-0 left-64 h-16 bg-surface/80 backdrop-blur-md border-b border-outline-variant flex justify-between items-center px-margin-desktop z-30">
<div class="flex items-center gap-4 flex-grow">
<div class="relative w-full max-w-md">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-lg">search</span>
<input class="bg-surface-container-lowest border border-outline-variant rounded-full pl-10 pr-4 py-1.5 w-full text-body-md font-body-md focus:outline-none focus:border-primary transition-colors" placeholder="Search strategy results..." type="text"/>
</div>
</div>
<div class="flex items-center gap-6">
<div class="flex items-center gap-4">
<button class="material-symbols-outlined text-text-secondary hover:text-primary transition-colors">notifications</button>
<button class="material-symbols-outlined text-text-secondary hover:text-primary transition-colors">account_balance_wallet</button>
</div>
<div class="flex items-center gap-3 border-l border-outline-variant pl-6">
<div class="text-right">
<p class="font-label-md text-label-md text-text-primary">Dr. Analyst</p>
<p class="text-[10px] text-primary tracking-widest uppercase font-bold">Pro Account</p>
</div>
<img alt="User avatar" class="w-10 h-10 rounded-full border border-primary/50" data-alt="A professional headshot of a middle-aged financial analyst with a neutral expression, set against a dark, minimalist architectural background. The lighting is low-key with a cool blue rim light that matches the AlphaPilot corporate dark-mode aesthetic. The image is clean and high-resolution, conveying expertise and seriousness." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZTQUP35wq0pK4RJD-EfljmLgM_T84I7myv6VC4NU5qdHjlGcPjSlE7HIq9OxKYtxwcDOZW1Lt3R8oK1G76j9yWOA0RzdXovk2rMJ3Yu2LdV4LeC6gl9AQFi2pUYZlac6iHRNQ-Ja9U0cU5PAxdjaGV60Im-umRRp3UI11zB75vE3wxPtCrggLv1hZX9zHqkjBv-RC_RwsIfxc027IuWzBTBE46dIvvVewVOusM6RgU9PZnT1FZ7gYcAZ2sS8CdekitI1WbqCY_Q6r"/>
</div>
</div>
</header>
<!-- MAIN CONTENT CANVAS -->
<main class="ml-64 mt-16 p-margin-desktop min-h-[calc(100vh-64px)] bg-background">
<!-- MODULE 2: STRATEGY & MODEL VERSION HEADER -->
<section class="mb-stack-lg flex flex-col md:flex-row md:items-end justify-between gap-gutter">
<div>
<nav class="flex items-center gap-2 text-text-disabled mb-2">
<span class="font-label-sm text-label-sm">Backtesting</span>
<span class="material-symbols-outlined text-[14px]">chevron_right</span>
<span class="font-label-sm text-label-sm text-primary">Simulation Review</span>
</nav>
<h2 class="font-headline-lg text-headline-lg text-text-primary mb-1">AlphaPilot Neural V4.2</h2>
<div class="flex items-center gap-4 text-text-secondary">
<span class="flex items-center gap-1 font-body-md text-body-md">
<span class="material-symbols-outlined text-sm">calendar_today</span>
                        2023-01-01 to 2024-03-20
                    </span>
<span class="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
<span class="flex items-center gap-1 font-body-md text-body-md">
<span class="material-symbols-outlined text-sm">database</span>
                        NASDAQ-100 Universe
                    </span>
</div>
</div>
<div class="flex gap-stack-sm">
<button class="bg-surface-container-high text-text-primary px-4 py-2 rounded-lg border border-outline-variant font-label-md text-label-md hover:border-primary transition-all">
                    Export CSV
                </button>
<button class="bg-primary text-on-primary-fixed px-6 py-2 rounded-lg font-label-md text-label-md font-bold hover:brightness-110 active:scale-95 transition-all">
                    Rerun Simulation
                </button>
</div>
</section>
<!-- MODULE 1: PERFORMANCE METRICS DASHBOARD -->
<section class="grid grid-cols-1 md:grid-cols-5 gap-gutter mb-stack-lg">
<div class="glass-panel p-stack-md rounded-xl">
<p class="text-text-secondary font-label-md text-label-md mb-2">Win Rate</p>
<p class="font-display-numeric text-display-numeric text-[#3EE6A8]">68.5%</p>
<div class="w-full bg-outline-variant h-1 mt-4 rounded-full overflow-hidden">
<div class="bg-[#3EE6A8] h-full" style="width: 68.5%"></div>
</div>
</div>
<div class="glass-panel p-stack-md rounded-xl">
<p class="text-text-secondary font-label-md text-label-md mb-2">Profit/Loss Ratio</p>
<p class="font-display-numeric text-display-numeric text-text-primary">2.8:1</p>
<p class="text-[#3EE6A8] font-label-sm text-label-sm mt-2 flex items-center gap-1">
<span class="material-symbols-outlined text-xs">trending_up</span> Above Target
                </p>
</div>
<div class="glass-panel p-stack-md rounded-xl border-l-4 border-l-[#FF5D5D]">
<p class="text-text-secondary font-label-md text-label-md mb-2">Max Drawdown</p>
<p class="font-display-numeric text-display-numeric text-[#FF5D5D]">-12.4%</p>
<p class="text-text-disabled font-label-sm text-label-sm mt-2">Recovery: 18 days</p>
</div>
<div class="glass-panel p-stack-md rounded-xl">
<p class="text-text-secondary font-label-md text-label-md mb-2">Total Trades</p>
<p class="font-display-numeric text-display-numeric text-text-primary">142</p>
<p class="text-text-disabled font-label-sm text-label-sm mt-2">Avg 12.8 / month</p>
</div>
<div class="glass-panel p-stack-md rounded-xl bg-primary-container/5 border-primary/20">
<p class="text-primary font-label-md text-label-md mb-2">Net Profit</p>
<p class="font-display-numeric text-display-numeric text-primary">+24.8%</p>
<p class="text-text-secondary font-label-sm text-label-sm mt-2 flex items-center gap-1">
<span class="material-symbols-outlined text-xs">account_balance</span> +$12,400.00
                </p>
</div>
</section>
<!-- GRID LAYOUT FOR CHART AND CONCLUSION -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-stack-lg">
<!-- EQUITY CURVE / TREND (Placeholder for Visualization) -->
<div class="lg:col-span-2 glass-panel rounded-xl overflow-hidden flex flex-col">
<div class="p-stack-md border-b border-outline-variant flex justify-between items-center">
<h3 class="font-headline-sm text-headline-sm flex items-center gap-2">
<span class="material-symbols-outlined text-primary">timeline</span>
                        Equity Growth Curve
                    </h3>
<div class="flex gap-2">
<button class="px-2 py-1 text-label-sm font-label-sm bg-surface-container-highest rounded">1D</button>
<button class="px-2 py-1 text-label-sm font-label-sm bg-surface-container-highest rounded">1M</button>
<button class="px-2 py-1 text-label-sm font-label-sm bg-primary text-on-primary-fixed rounded">ALL</button>
</div>
</div>
<div class="flex-grow min-h-[300px] relative bg-[#050e1c] p-stack-lg flex items-center justify-center">
<!-- Aesthetic Chart Visualization using CSS and a single descriptive image background -->
<div class="absolute inset-0 opacity-20 pointer-events-none" style="background-image: radial-gradient(#1D2A42 1px, transparent 1px); background-size: 24px 24px;"></div>
<img alt="Equity curve chart" class="w-full h-full object-cover opacity-60 mix-blend-screen" data-alt="A sophisticated financial chart display showing a glowing blue equity curve rising steadily over a grid in a dark environment. The chart features sharp, high-contrast lines and subtle neon blue atmospheric glows against a deep navy background. Digital artifacts and data points are rendered with precision, evoking a futuristic AI trading terminal aesthetic. The mood is professional and analytical." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMfDgTTetLKQ_huBUO-sioV4J9waXo5sO9_xKFu3v997Ngzf6-VDuL6tmSa9bndTlCPTBxiemggCUFbUDWhidsXtAhHeokuGpOUtpxAsdECptnZlirQAxc6hCAEc5voqVPZIq9iW0oPZgjrQ1vcxH68rW4-JX-f7Xk-UNZEpQNWEY3T1xtMk_mejqMD4xUzNcrGnRQ-FmynGytLbRFsQdHaiQq1MTnHtpFiRoLQJyPFLUdFsNvqoa4pEjJr5IIozX-LcY0K5gvLVZc"/>
<div class="absolute bottom-10 right-10 flex flex-col items-end">
<div class="bg-primary/20 border border-primary text-primary px-3 py-1 rounded-full text-label-md font-label-md backdrop-blur-md">
                            Benchmark Overperfomance: +8.4%
                        </div>
</div>
</div>
</div>
<!-- MODULE 4: BACKTEST REVIEW & CONCLUSION -->
<div class="glass-panel rounded-xl flex flex-col border-l-4 border-l-primary">
<div class="p-stack-md border-b border-outline-variant">
<h3 class="font-headline-sm text-headline-sm flex items-center gap-2 text-primary">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">smart_toy</span>
                        AI Insights
                    </h3>
</div>
<div class="p-stack-md flex-grow space-y-stack-md overflow-y-auto max-h-[400px]">
<div class="p-stack-md bg-surface-container rounded-lg border border-outline-variant">
<p class="font-label-md text-label-md text-primary mb-1">Performance Summary</p>
<p class="font-body-md text-body-md text-text-secondary leading-relaxed">
                            Neural V4.2 shows exceptional resilience during high-volatility sessions. The model successfully front-ran 72% of mid-day reversals in the NASDAQ-100 universe.
                        </p>
</div>
<div class="space-y-stack-sm">
<div class="flex gap-3">
<span class="material-symbols-outlined text-[#3EE6A8]">check_circle</span>
<p class="font-body-md text-body-md text-text-primary">
<span class="font-bold">Optimal Condition:</span> Performs best in high-volatility environments (VIX &gt; 22).
                            </p>
</div>
<div class="flex gap-3">
<span class="material-symbols-outlined text-[#F5C451]">warning</span>
<p class="font-body-md text-body-md text-text-primary">
<span class="font-bold">Slippage Alert:</span> Significant slippage observed during pre-market hours (04:00 - 07:00).
                            </p>
</div>
<div class="flex gap-3">
<span class="material-symbols-outlined text-primary">lightbulb</span>
<p class="font-body-md text-body-md text-text-primary">
<span class="font-bold">Recommendation:</span> Implement a tighter stop-loss trailing mechanism for assets with ATR &gt; 2.5.
                            </p>
</div>
</div>
<div class="mt-4 pt-4 border-t border-outline-variant">
<div class="flex items-center justify-between mb-2">
<span class="text-label-sm font-label-sm text-text-disabled">Confidence Score</span>
<span class="text-label-sm font-label-sm text-primary">92%</span>
</div>
<div class="h-1.5 w-full bg-surface-container-highest rounded-full">
<div class="h-full bg-primary rounded-full" style="width: 92%"></div>
</div>
</div>
</div>
<div class="p-stack-md bg-surface-container-low border-t border-outline-variant">
<button class="w-full border border-primary text-primary py-2 rounded-lg font-label-md text-label-md hover:bg-primary hover:text-on-primary-fixed transition-all">
                        Generate Optimization Plan
                    </button>
</div>
</div>
</div>
<!-- MODULE 3: TRADE LIST (DATA TABLE) -->
<section class="glass-panel rounded-xl overflow-hidden">
<div class="p-stack-md border-b border-outline-variant flex justify-between items-center">
<h3 class="font-headline-sm text-headline-sm">Trade Log - Latest Simulations</h3>
<div class="flex gap-2">
<div class="relative">
<select class="bg-surface-container-highest border-none text-label-md font-label-md rounded px-8 py-1.5 appearance-none">
<option>All Assets</option>
<option>Tech Only</option>
<option>Energy Only</option>
</select>
<span class="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-text-disabled pointer-events-none text-sm">expand_more</span>
</div>
<button class="material-symbols-outlined bg-surface-container-highest p-1.5 rounded text-text-secondary hover:text-text-primary">filter_list</button>
</div>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-surface-container text-text-secondary font-label-sm text-label-sm uppercase tracking-wider">
<th class="px-stack-lg py-4 border-b border-outline-variant">Asset</th>
<th class="px-stack-lg py-4 border-b border-outline-variant">Type</th>
<th class="px-stack-lg py-4 border-b border-outline-variant">Entry Price</th>
<th class="px-stack-lg py-4 border-b border-outline-variant">Exit Price</th>
<th class="px-stack-lg py-4 border-b border-outline-variant">Result (P/L)</th>
<th class="px-stack-lg py-4 border-b border-outline-variant">Duration</th>
<th class="px-stack-lg py-4 border-b border-outline-variant">Status</th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant/30">
<!-- Trade 1 -->
<tr class="hover:bg-surface-container-high transition-colors">
<td class="px-stack-lg py-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded bg-[#1D2A42] flex items-center justify-center font-bold text-xs text-primary">NV</div>
<div>
<p class="font-bold text-text-primary text-body-md">NVDA</p>
<p class="text-text-disabled text-[10px]">NVIDIA Corp.</p>
</div>
</div>
</td>
<td class="px-stack-lg py-4">
<span class="bg-[#3EE6A8]/10 text-[#3EE6A8] px-2 py-0.5 rounded text-[10px] font-bold">LONG</span>
</td>
<td class="px-stack-lg py-4 font-display-numeric text-body-md">$874.12</td>
<td class="px-stack-lg py-4 font-display-numeric text-body-md">$912.45</td>
<td class="px-stack-lg py-4">
<span class="text-[#3EE6A8] font-bold text-body-md">+4.38%</span>
</td>
<td class="px-stack-lg py-4 text-text-secondary text-body-md">2h 14m</td>
<td class="px-stack-lg py-4">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-[#3EE6A8]"></span>
<span class="text-label-sm font-label-sm text-text-primary">Closed</span>
</div>
</td>
</tr>
<!-- Trade 2 -->
<tr class="hover:bg-surface-container-high transition-colors">
<td class="px-stack-lg py-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded bg-[#1D2A42] flex items-center justify-center font-bold text-xs text-primary">TS</div>
<div>
<p class="font-bold text-text-primary text-body-md">TSLA</p>
<p class="text-text-disabled text-[10px]">Tesla, Inc.</p>
</div>
</div>
</td>
<td class="px-stack-lg py-4">
<span class="bg-[#FF5D5D]/10 text-[#FF5D5D] px-2 py-0.5 rounded text-[10px] font-bold">SHORT</span>
</td>
<td class="px-stack-lg py-4 font-display-numeric text-body-md">$172.50</td>
<td class="px-stack-lg py-4 font-display-numeric text-body-md">$175.12</td>
<td class="px-stack-lg py-4">
<span class="text-[#FF5D5D] font-bold text-body-md">-1.52%</span>
</td>
<td class="px-stack-lg py-4 text-text-secondary text-body-md">45m</td>
<td class="px-stack-lg py-4">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-[#3EE6A8]"></span>
<span class="text-label-sm font-label-sm text-text-primary">Closed</span>
</div>
</td>
</tr>
<!-- Trade 3 -->
<tr class="hover:bg-surface-container-high transition-colors">
<td class="px-stack-lg py-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded bg-[#1D2A42] flex items-center justify-center font-bold text-xs text-primary">MS</div>
<div>
<p class="font-bold text-text-primary text-body-md">MSFT</p>
<p class="text-text-disabled text-[10px]">Microsoft Corp.</p>
</div>
</div>
</td>
<td class="px-stack-lg py-4">
<span class="bg-[#3EE6A8]/10 text-[#3EE6A8] px-2 py-0.5 rounded text-[10px] font-bold">LONG</span>
</td>
<td class="px-stack-lg py-4 font-display-numeric text-body-md">$412.00</td>
<td class="px-stack-lg py-4 font-display-numeric text-body-md">--</td>
<td class="px-stack-lg py-4">
<span class="text-text-disabled font-bold text-body-md">0.00%</span>
</td>
<td class="px-stack-lg py-4 text-text-secondary text-body-md">Active</td>
<td class="px-stack-lg py-4">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
<span class="text-label-sm font-label-sm text-primary">Open</span>
</div>
</td>
</tr>
<!-- Trade 4 -->
<tr class="hover:bg-surface-container-high transition-colors">
<td class="px-stack-lg py-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded bg-[#1D2A42] flex items-center justify-center font-bold text-xs text-primary">AM</div>
<div>
<p class="font-bold text-text-primary text-body-md">AMZN</p>
<p class="text-text-disabled text-[10px]">Amazon.com, Inc.</p>
</div>
</div>
</td>
<td class="px-stack-lg py-4">
<span class="bg-[#3EE6A8]/10 text-[#3EE6A8] px-2 py-0.5 rounded text-[10px] font-bold">LONG</span>
</td>
<td class="px-stack-lg py-4 font-display-numeric text-body-md">$178.22</td>
<td class="px-stack-lg py-4 font-display-numeric text-body-md">$184.10</td>
<td class="px-stack-lg py-4">
<span class="text-[#3EE6A8] font-bold text-body-md">+3.30%</span>
</td>
<td class="px-stack-lg py-4 text-text-secondary text-body-md">5h 30m</td>
<td class="px-stack-lg py-4">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-[#3EE6A8]"></span>
<span class="text-label-sm font-label-sm text-text-primary">Closed</span>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<div class="p-stack-md bg-surface-container-low border-t border-outline-variant flex justify-between items-center">
<p class="text-label-sm font-label-sm text-text-disabled">Showing 4 of 142 total simulated trades</p>
<div class="flex gap-2">
<button class="px-3 py-1 bg-surface-container-highest rounded text-label-sm font-label-sm disabled:opacity-50" disabled="">Previous</button>
<button class="px-3 py-1 bg-primary text-on-primary-fixed rounded text-label-sm font-label-sm">Next</button>
</div>
</div>
</section>
</main>
<!-- FLOATING ACTION BUTTON (SUPPRESSED AS PER TASK FOCUS) -->
<script>
        // Micro-interaction for table rows
        document.querySelectorAll('tr').forEach(row => {
            row.addEventListener('click', () => {
                if(row.querySelector('th')) return;
                console.log('Row clicked - Opening detailed trade breakdown...');
            });
        });

        // Simple animation for numbers (Optional flair)
        const animateNumbers = () => {
            // Logic to potentially increment counters on load
        };
        window.onload = animateNumbers;
    </script>
</body></html>

<!-- AlphaPilot Component - AI 交易决策卡设计 -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>AlphaPilot | AI Trading Decision Card Showcase</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        .glass-panel {
            background: rgba(16, 28, 48, 0.6);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(29, 42, 66, 0.5);
        }
        .ai-glow-primary {
            box-shadow: inset 0 0 20px rgba(77, 163, 255, 0.1), 0 0 30px rgba(77, 163, 255, 0.05);
        }
        .ai-glow-success {
            box-shadow: inset 0 0 15px rgba(53, 224, 163, 0.15);
        }
        .k-line-container {
            mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "surface-tint": "#a2c9ff",
                      "surface-panel": "#0C1728",
                      "inverse-on-surface": "#273140",
                      "surface-container": "#16202f",
                      "text-disabled": "#6E7C93",
                      "surface-container-high": "#212a39",
                      "primary": "#a2c9ff",
                      "surface-container-highest": "#2c3545",
                      "primary-fixed-dim": "#a2c9ff",
                      "on-primary-container": "#003866",
                      "on-surface": "#d9e3f7",
                      "surface": "#0a1422",
                      "inverse-primary": "#0060a9",
                      "on-primary": "#00315b",
                      "border-subtle": "#1D2A42",
                      "outline": "#8a919d",
                      "secondary-fixed": "#b5ebff",
                      "error-container": "#93000a",
                      "primary-fixed": "#d3e4ff",
                      "text-primary": "#EAF2FF",
                      "surface-container-lowest": "#050e1c",
                      "on-primary-fixed": "#001c38",
                      "on-tertiary-fixed": "#002114",
                      "secondary-container": "#00c6f0",
                      "tertiary-fixed": "#5cfdbd",
                      "on-tertiary-container": "#003f2a",
                      "surface-container-low": "#121c2a",
                      "surface-variant": "#2c3545",
                      "error": "#ffb4ab",
                      "secondary": "#7ddeff",
                      "tertiary": "#35e0a3",
                      "outline-variant": "#404752",
                      "on-surface-variant": "#c0c7d4",
                      "on-error": "#690005",
                      "status-warning": "#F5C451",
                      "on-secondary": "#003543",
                      "on-background": "#d9e3f7",
                      "on-secondary-fixed-variant": "#004e60",
                      "tertiary-container": "#00b680",
                      "surface-card": "#101C30",
                      "on-secondary-container": "#004e60",
                      "on-error-container": "#ffdad6",
                      "primary-container": "#4da3ff",
                      "inverse-surface": "#d9e3f7",
                      "on-secondary-fixed": "#001f28",
                      "surface-dim": "#0a1422",
                      "tertiary-fixed-dim": "#35e0a3",
                      "on-tertiary": "#003825",
                      "surface-bright": "#303a49",
                      "background": "#0a1422",
                      "on-primary-fixed-variant": "#004881",
                      "secondary-fixed-dim": "#46d6ff",
                      "text-secondary": "#9FB0C7",
                      "on-tertiary-fixed-variant": "#005137",
                      "status-danger": "#FF5D5D"
              },
              "borderRadius": {
                      "DEFAULT": "0.25rem",
                      "lg": "0.5rem",
                      "xl": "0.75rem",
                      "full": "9999px"
              },
              "spacing": {
                      "margin-desktop": "32px",
                      "gutter": "20px",
                      "stack-md": "16px",
                      "stack-lg": "24px",
                      "container-max": "1440px",
                      "stack-sm": "8px",
                      "margin-mobile": "16px"
              },
              "fontFamily": {
                      "headline-sm": ["Inter"],
                      "headline-md": ["Inter"],
                      "headline-lg-mobile": ["Inter"],
                      "label-sm": ["Inter"],
                      "headline-lg": ["Inter"],
                      "display-numeric": ["Inter"],
                      "label-md": ["Inter"],
                      "body-md": ["Inter"],
                      "body-lg": ["Inter"]
              },
              "fontSize": {
                      "headline-sm": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
                      "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                      "headline-lg-mobile": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                      "label-sm": ["12px", {"lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "500"}],
                      "headline-lg": ["32px", {"lineHeight": "40px", "fontWeight": "600"}],
                      "display-numeric": ["36px", {"lineHeight": "44px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                      "label-md": ["13px", {"lineHeight": "18px", "letterSpacing": "0.01em", "fontWeight": "500"}],
                      "body-md": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                      "body-lg": ["16px", {"lineHeight": "24px", "fontWeight": "400"}]
              }
            },
          },
        }
    </script>
</head>
<body class="bg-background text-on-surface font-body-md overflow-x-hidden">
<!-- SideNavBar (Shared Component Shell) -->
<aside class="fixed left-0 top-0 h-full w-64 bg-surface-container-low border-r border-outline-variant flex flex-col z-40">
<div class="p-6">
<div class="flex items-center gap-3 mb-8">
<img alt="AlphaPilot Logo" class="w-10 h-10 rounded-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsPQnFMU-stV_ANfTbr5bn1SzNA0xS114LtjJmgeEFK_ZEJC2mrwAfFz0ZWkKxHdnDZAEGmvr7ODjziyJJEwjk-GHdi_ZLOT1P5B3qXq1cVpxVpZ8HdCRwNbrtDNmRoJYfE0nGm0hc5NRpMTg_tB6BwRC3hf4-n4S32JiRUd-1Xe3cgMjPGbbdfLxeD27HlSBXc2usax8BjwZGtDqT9GHGg1bbKtA6frG_W1opAML5hhZOmnZYAfhgtKheASDRxy1w3mxiDJIMJNOr"/>
<div class="flex flex-col">
<span class="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">AlphaPilot</span>
<span class="font-label-sm text-label-sm text-tertiary">AI Terminal Active</span>
</div>
</div>
<button class="w-full bg-primary-container text-on-primary py-3 px-4 rounded-xl font-label-md flex items-center justify-center gap-2 mb-8 hover:opacity-90 transition-all active:scale-95">
<span class="material-symbols-outlined text-[20px]">add</span>
                New Analysis
            </button>
<nav class="space-y-1">
<a class="flex items-center gap-3 px-4 py-3 text-primary bg-primary-container/10 border-r-2 border-primary" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span class="font-label-md">Dashboard</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-surface-container-high transition-all" href="#">
<span class="material-symbols-outlined" data-icon="query_stats">query_stats</span>
<span class="font-label-md">Stock Screener</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-surface-container-high transition-all" href="#">
<span class="material-symbols-outlined" data-icon="history_toggle_off">history_toggle_off</span>
<span class="font-label-md">Backtesting</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-surface-container-high transition-all" href="#">
<span class="material-symbols-outlined" data-icon="security">security</span>
<span class="font-label-md">Risk Management</span>
</a>
</nav>
</div>
<div class="mt-auto p-6 space-y-1">
<a class="flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-surface-container-high transition-all" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span class="font-label-md">Settings</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-surface-container-high transition-all" href="#">
<span class="material-symbols-outlined" data-icon="help">help</span>
<span class="font-label-md">Support</span>
</a>
</div>
</aside>
<!-- TopNavBar (Shared Component Shell) -->
<header class="fixed top-0 right-0 left-64 h-16 bg-surface/80 backdrop-blur-md flex justify-between items-center px-margin-desktop z-30 border-b border-outline-variant">
<div class="flex items-center bg-surface-container-highest/50 px-4 py-2 rounded-full border border-outline-variant w-96 group focus-within:border-primary transition-all">
<span class="material-symbols-outlined text-text-secondary mr-2" data-icon="search">search</span>
<input class="bg-transparent border-none focus:ring-0 text-body-md w-full placeholder:text-text-disabled" placeholder="Search markets, AI signals, or assets..." type="text"/>
</div>
<div class="flex items-center gap-6">
<div class="flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-lg border border-outline-variant">
<span class="material-symbols-outlined text-primary text-[20px]" data-icon="account_balance_wallet">account_balance_wallet</span>
<span class="font-label-md text-text-primary">$142,500.80</span>
</div>
<button class="relative text-text-secondary hover:text-primary transition-colors">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
<span class="absolute top-0 right-0 w-2 h-2 bg-status-danger rounded-full border border-surface"></span>
</button>
<div class="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center border border-primary/30 overflow-hidden">
<img alt="User avatar" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLzLlBg4C2Fjf1Plbw5axsmjQHnDKrLZnePVNUemabdJ7Q9vEcuPFaG-iI8V3Wa1XlpJV7rUXsqZpbbjRx4Yq23Y0Lcqm8rNt2Kp-iH2kVbF3IyRqfNkjsgO-NBZB1l_1EIfdaR9vns5Q4djVLBuFu6kSz7Pf_m_FKM1UAnD2ggpbFHZstsOCtIWGs09ttl8fjqBswBEERSnEaJ9uNS1xw7yQ8dmKiFuCFy2GPGQyWpwfOmrApncJ20oOyPzAQcEmPohrHp6PcLmvw"/>
</div>
</div>
</header>
<!-- Main Content Canvas -->
<main class="pl-64 pt-16 min-h-screen">
<div class="p-margin-desktop max-w-container-max mx-auto">
<!-- Page Header -->
<div class="mb-stack-lg flex justify-between items-end">
<div>
<div class="flex items-center gap-2 mb-2">
<span class="w-2 h-2 bg-tertiary rounded-full animate-pulse"></span>
<span class="font-label-sm text-tertiary tracking-widest">LIVE AI ENGINE</span>
</div>
<h1 class="font-headline-lg text-headline-lg text-text-primary">Component Showcase: AI Decision Card</h1>
<p class="text-text-secondary font-body-md mt-1">High-stakes intelligence designed for immediate institutional-grade execution.</p>
</div>
<div class="flex gap-3">
<button class="px-6 py-2 rounded-lg border border-outline-variant text-text-primary font-label-md hover:bg-surface-container-high transition-all">Documentation</button>
<button class="px-6 py-2 rounded-lg bg-primary text-on-primary font-label-md hover:opacity-90 transition-all">Export Library</button>
</div>
</div>
<!-- Bento Layout Container -->
<div class="grid grid-cols-12 gap-gutter">
<!-- STANDALONE DETAIL VIEW (Hero Component) -->
<div class="col-span-12 lg:col-span-5 flex flex-col gap-gutter">
<div class="p-stack-md bg-surface-container-lowest/50 rounded-xl border border-outline-variant">
<h3 class="font-label-sm text-text-disabled uppercase mb-4 tracking-tighter">Standalone Specification</h3>
<!-- THE AI DECISION CARD -->
<div class="glass-panel rounded-2xl overflow-hidden ai-glow-primary group">
<!-- Card Header: Symbol & AI Score -->
<div class="p-6 flex justify-between items-start border-b border-outline-variant/30">
<div>
<div class="flex items-center gap-3 mb-1">
<div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1 overflow-hidden">
<img alt="NVDA Logo" class="max-w-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzyE-w1L3VQYqrDq_dwO7Bfic8NXahFIqmpvrXhygxMpCwoAQHRySn-d0bk5dqYNJKTRsgUZMhMA4NDfH4wXbcmqk3i_1Ca0BjtcOEUi3Y7nVacHw9TMQwTKj9iI-4R2tV6vLSf_y-vx_0PaNOEOEvIiPPTF_3je3yy4DB96f5HpFcGbHxMMOJT4-pmDuIyQfOHP1RA1P5dQaKWuyUB3qBpqE-1poOJUUX-CW5KIZZQaed19rEVl8n39Tk3jy0-qrTSeAjm-CkbFgx"/>
</div>
<div>
<h2 class="font-headline-md text-headline-md text-text-primary leading-none">NVDA</h2>
<span class="text-text-secondary text-label-sm">NVIDIA Corporation</span>
</div>
</div>
<span class="inline-flex items-center px-2 py-1 bg-tertiary/10 text-tertiary text-[10px] font-bold tracking-widest rounded uppercase border border-tertiary/20">
                                        ACCUMULATION
                                    </span>
</div>
<div class="text-right">
<div class="font-display-numeric text-display-numeric text-primary leading-none">94</div>
<span class="text-label-sm text-text-disabled">AI SIGNAL SCORE</span>
</div>
</div>
<!-- Probability & Core Stats -->
<div class="p-6 grid grid-cols-2 gap-stack-lg border-b border-outline-variant/30">
<div class="space-y-1">
<span class="text-label-sm text-text-disabled uppercase tracking-wide">Bullish Probability</span>
<div class="flex items-baseline gap-2">
<span class="font-display-numeric text-[32px] text-tertiary">88.4%</span>
<span class="material-symbols-outlined text-tertiary text-[20px]" data-icon="trending_up">trending_up</span>
</div>
</div>
<div class="space-y-1 text-right">
<span class="text-label-sm text-text-disabled uppercase tracking-wide">Risk Profile</span>
<div class="flex items-center justify-end gap-2 mt-1">
<span class="w-2 h-2 rounded-full bg-tertiary ai-glow-success"></span>
<span class="font-headline-sm text-tertiary">Low Risk</span>
</div>
</div>
</div>
<!-- Execution Strategy -->
<div class="p-6 grid grid-cols-2 gap-y-stack-lg gap-x-gutter">
<div class="space-y-1">
<span class="text-label-sm text-text-disabled uppercase">Buy Entry Range</span>
<div class="font-headline-sm text-text-primary tracking-tight">$872.50 - $876.00</div>
</div>
<div class="space-y-1 text-right">
<span class="text-label-sm text-text-disabled uppercase">Target Exit</span>
<div class="font-headline-sm text-tertiary tracking-tight">$920.00</div>
</div>
<div class="space-y-1">
<span class="text-label-sm text-text-disabled uppercase">Stop Loss</span>
<div class="font-headline-sm text-status-danger tracking-tight">$858.50</div>
</div>
<div class="space-y-1 text-right">
<span class="text-label-sm text-text-disabled uppercase">Allocated Size</span>
<div class="font-headline-sm text-text-primary">20.0%</div>
</div>
</div>
<!-- Evidence Chain (Collapsible Logic) -->
<div class="px-6 pb-6">
<details class="group/evidence" open="">
<summary class="flex items-center justify-between py-3 cursor-pointer list-none border-t border-outline-variant/30 text-text-secondary hover:text-text-primary transition-colors">
<span class="font-label-md">EVIDENCE CHAIN</span>
<span class="material-symbols-outlined transition-transform group-open/evidence:rotate-180" data-icon="expand_more">expand_more</span>
</summary>
<div class="pt-2 pb-4 space-y-3">
<div class="flex items-start gap-3">
<span class="material-symbols-outlined text-tertiary text-[18px] mt-0.5" data-icon="check_circle">check_circle</span>
<div>
<p class="font-label-md text-text-primary">Golden Cross Confirmed (50/200 DMA)</p>
<p class="text-label-sm text-text-disabled">Strong momentum continuation signal on daily timeframe.</p>
</div>
</div>
<div class="flex items-start gap-3">
<span class="material-symbols-outlined text-tertiary text-[18px] mt-0.5" data-icon="check_circle">check_circle</span>
<div>
<p class="font-label-md text-text-primary">Institutional Order Flow Divergence</p>
<p class="text-label-sm text-text-disabled">Hidden bullish RSI divergence on 4H chart with high volume.</p>
</div>
</div>
<div class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-[18px] mt-0.5" data-icon="info">info</span>
<div>
<p class="font-label-md text-text-primary">Volatility Compression (Bollinger Band Squeeze)</p>
<p class="text-label-sm text-text-disabled">Price consolidating before expected breakout.</p>
</div>
</div>
</div>
</details>
</div>
<!-- CTA Footer -->
<div class="p-4 bg-surface-container-high/50 flex gap-3">
<button class="flex-1 py-3 bg-tertiary text-on-tertiary font-bold rounded-xl active:scale-95 transition-all shadow-lg shadow-tertiary/10">
                                    EXECUTE ORDER
                                </button>
<button class="w-12 h-12 flex items-center justify-center border border-outline-variant rounded-xl text-text-primary hover:bg-surface-container-highest transition-all">
<span class="material-symbols-outlined" data-icon="share">share</span>
</button>
</div>
</div>
</div>
<!-- Usage Guidelines -->
<div class="p-6 glass-panel rounded-2xl border border-outline-variant">
<h4 class="font-headline-sm text-text-primary mb-4">Design Rationale</h4>
<ul class="space-y-4">
<li class="flex gap-3">
<div class="w-6 h-6 rounded bg-primary/20 flex items-center justify-center shrink-0">
<span class="text-primary font-bold text-[10px]">01</span>
</div>
<p class="text-body-md text-text-secondary"><strong class="text-text-primary">Hierarchical Clarity:</strong> High-priority numbers use `display-numeric` for instant legibility in high-pressure trading scenarios.</p>
</li>
<li class="flex gap-3">
<div class="w-6 h-6 rounded bg-primary/20 flex items-center justify-center shrink-0">
<span class="text-primary font-bold text-[10px]">02</span>
</div>
<p class="text-body-md text-text-secondary"><strong class="text-text-primary">Color Semantics:</strong> `tertiary` (#35e0a3) is used exclusively for actionable bullish signals, while `status-danger` (#FF5D5D) highlights risk thresholds.</p>
</li>
</ul>
</div>
</div>
<!-- DASHBOARD CONTEXT VIEW -->
<div class="col-span-12 lg:col-span-7 space-y-gutter">
<div class="p-stack-md bg-surface-container-lowest/50 rounded-xl border border-outline-variant">
<h3 class="font-label-sm text-text-disabled uppercase mb-4 tracking-tighter">Contextual Implementation</h3>
<!-- Simulated Dashboard -->
<div class="bg-surface-panel border border-outline-variant rounded-2xl overflow-hidden">
<!-- Dashboard Header -->
<div class="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
<div class="flex gap-4">
<button class="font-label-md text-primary border-b-2 border-primary pb-1">AI Hot Picks</button>
<button class="font-label-md text-text-secondary hover:text-text-primary transition-colors pb-1">Watchlist</button>
<button class="font-label-md text-text-secondary hover:text-text-primary transition-colors pb-1">History</button>
</div>
<div class="flex gap-2">
<span class="material-symbols-outlined text-text-secondary cursor-pointer" data-icon="grid_view">grid_view</span>
<span class="material-symbols-outlined text-primary cursor-pointer" data-icon="view_list">view_list</span>
</div>
</div>
<!-- Dash Content Grid -->
<div class="p-6 bg-surface grid grid-cols-2 gap-6">
<!-- Chart Preview -->
<div class="col-span-2 h-64 glass-panel rounded-xl border border-outline-variant relative overflow-hidden flex flex-col">
<div class="absolute inset-0 k-line-container opacity-40 pointer-events-none">
<!-- Placeholder for chart texture -->
<div class="h-full w-full bg-[linear-gradient(to_right,#1d2a42_1px,transparent_1px),linear-gradient(to_bottom,#1d2a42_1px,transparent_1px)] bg-[size:24px_24px]"></div>
</div>
<div class="p-4 flex justify-between items-center relative z-10">
<div class="flex items-center gap-2">
<span class="font-headline-sm text-text-primary">NVDA/USD</span>
<span class="text-tertiary text-label-sm">+4.2%</span>
</div>
<div class="flex gap-2">
<span class="px-2 py-1 bg-surface-container-highest rounded text-[10px] text-text-primary">1H</span>
<span class="px-2 py-1 bg-primary text-on-primary rounded text-[10px]">1D</span>
<span class="px-2 py-1 bg-surface-container-highest rounded text-[10px] text-text-primary">1W</span>
</div>
</div>
<!-- Simple Sparkline Representation -->
<div class="mt-auto h-32 w-full px-4 pb-8 flex items-end gap-1 relative z-10">
<div class="flex-1 bg-tertiary/20 rounded-t h-[40%]"></div>
<div class="flex-1 bg-tertiary/20 rounded-t h-[35%]"></div>
<div class="flex-1 bg-tertiary/40 rounded-t h-[55%]"></div>
<div class="flex-1 bg-tertiary/30 rounded-t h-[45%]"></div>
<div class="flex-1 bg-tertiary/60 rounded-t h-[75%] border-t-2 border-tertiary shadow-[0_-4px_10px_rgba(53,224,163,0.3)]"></div>
<div class="flex-1 bg-tertiary/40 rounded-t h-[65%]"></div>
<div class="flex-1 bg-tertiary/80 rounded-t h-[95%] border-t-2 border-tertiary shadow-[0_-4px_10px_rgba(53,224,163,0.3)]"></div>
</div>
</div>
<!-- The Main Signal Card (Scaled) -->
<div class="col-span-1 glass-panel rounded-xl border border-outline-variant p-5 hover:border-primary transition-all cursor-pointer">
<div class="flex justify-between items-start mb-4">
<span class="font-headline-sm text-text-primary">NVDA</span>
<div class="px-2 py-0.5 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded">SIGNAL ACTIVE</div>
</div>
<div class="flex items-baseline gap-2 mb-4">
<span class="font-display-numeric text-3xl text-primary">94</span>
<span class="text-label-sm text-text-disabled">SCORE</span>
</div>
<div class="grid grid-cols-2 gap-4 text-label-sm">
<div>
<p class="text-text-disabled uppercase">Probability</p>
<p class="text-tertiary font-bold">88.4% ↑</p>
</div>
<div class="text-right">
<p class="text-text-disabled uppercase">Risk</p>
<p class="text-tertiary font-bold">LOW</p>
</div>
</div>
<button class="w-full mt-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg text-label-md hover:bg-primary hover:text-on-primary transition-all">Quick Trade</button>
</div>
<!-- Secondary Card -->
<div class="col-span-1 glass-panel rounded-xl border border-outline-variant p-5 hover:border-primary transition-all cursor-pointer group opacity-70 hover:opacity-100">
<div class="flex justify-between items-start mb-4">
<span class="font-headline-sm text-text-primary">MSFT</span>
<div class="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded">MONITORING</div>
</div>
<div class="flex items-baseline gap-2 mb-4">
<span class="font-display-numeric text-3xl text-text-secondary group-hover:text-primary transition-colors">72</span>
<span class="text-label-sm text-text-disabled">SCORE</span>
</div>
<div class="grid grid-cols-2 gap-4 text-label-sm">
<div>
<p class="text-text-disabled uppercase">Probability</p>
<p class="text-text-primary font-bold">64.1% ↑</p>
</div>
<div class="text-right">
<p class="text-text-disabled uppercase">Risk</p>
<p class="text-status-warning font-bold">MEDIUM</p>
</div>
</div>
<button class="w-full mt-4 py-2 bg-surface-container-highest text-text-secondary border border-outline-variant rounded-lg text-label-md hover:bg-primary/20 hover:text-primary transition-all">View Details</button>
</div>
</div>
</div>
</div>
<!-- Component Props & Variants -->
<div class="grid grid-cols-2 gap-gutter">
<div class="p-6 glass-panel rounded-2xl border border-outline-variant">
<h4 class="font-label-md text-primary mb-3">States &amp; Themes</h4>
<div class="space-y-4">
<div class="flex items-center justify-between p-3 bg-surface-container rounded-lg border border-outline-variant">
<span class="text-label-md text-text-primary">Bullish Action</span>
<span class="w-4 h-4 rounded-full bg-tertiary"></span>
</div>
<div class="flex items-center justify-between p-3 bg-surface-container rounded-lg border border-outline-variant">
<span class="text-label-md text-text-primary">Bearish Warning</span>
<span class="w-4 h-4 rounded-full bg-status-danger"></span>
</div>
<div class="flex items-center justify-between p-3 bg-surface-container rounded-lg border border-outline-variant">
<span class="text-label-md text-text-primary">Neutral/Observing</span>
<span class="w-4 h-4 rounded-full bg-outline"></span>
</div>
</div>
</div>
<div class="p-6 glass-panel rounded-2xl border border-outline-variant flex flex-col justify-center items-center text-center">
<span class="material-symbols-outlined text-primary text-[48px] mb-2" data-icon="auto_awesome">auto_awesome</span>
<h4 class="font-headline-sm text-text-primary">AI Logic Layer</h4>
<p class="text-label-sm text-text-secondary mt-2">The decision card is not just data—it is a visual conclusion synthesized from 50+ real-time technical and sentiment indicators.</p>
</div>
</div>
</div>
</div>
</div>
</main>
<!-- Background Decorative Elements -->
<div class="fixed top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -z-10 -translate-y-1/2 translate-x-1/2"></div>
<div class="fixed bottom-0 left-0 w-[600px] h-[600px] bg-tertiary/5 rounded-full blur-[150px] -z-10 translate-y-1/2 -translate-x-1/4"></div>
<script>
        // Micro-interactions
        document.querySelectorAll('.glass-panel').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const { left, top, width, height } = card.getBoundingClientRect();
                const x = (e.clientX - left) / width;
                const y = (e.clientY - top) / height;
                
                card.style.setProperty('--mouse-x', `${x * 100}%`);
                card.style.setProperty('--mouse-y', `${y * 100}%`);
                
                // Subtle tilt effect
                const tiltX = (y - 0.5) * 4;
                const tiltY = (x - 0.5) * -4;
                card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
            });
        });
    </script>
</body></html>

<!-- AlphaPilot AI Screener - 批量市场扫描页 -->
<!DOCTYPE html><html class="dark" lang="en" style=""><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>AlphaPilot AI Market Scanner</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "surface-bright": "#303a49",
                        "border-subtle": "#1D2A42",
                        "tertiary-container": "#00b680",
                        "status-danger": "#FF5D5D",
                        "on-tertiary-fixed": "#002114",
                        "on-background": "#d9e3f7",
                        "inverse-primary": "#0060a9",
                        "primary-container": "#4da3ff",
                        "outline-variant": "#404752",
                        "inverse-on-surface": "#273140",
                        "on-tertiary": "#003825",
                        "error-container": "#93000a",
                        "on-secondary-fixed-variant": "#004e60",
                        "background": "#0a1422",
                        "text-disabled": "#6E7C93",
                        "surface-dim": "#0a1422",
                        "on-primary-fixed": "#001c38",
                        "surface-container": "#16202f",
                        "error": "#ffb4ab",
                        "text-primary": "#EAF2FF",
                        "surface-container-lowest": "#050e1c",
                        "surface-container-high": "#212a39",
                        "status-warning": "#F5C451",
                        "surface": "#0a1422",
                        "on-secondary": "#003543",
                        "tertiary-fixed-dim": "#35e0a3",
                        "text-secondary": "#9FB0C7",
                        "secondary-fixed-dim": "#46d6ff",
                        "on-secondary-container": "#004e60",
                        "on-surface-variant": "#c0c7d4",
                        "surface-variant": "#2c3545",
                        "primary-fixed-dim": "#a2c9ff",
                        "on-surface": "#d9e3f7",
                        "secondary-container": "#00c6f0",
                        "secondary-fixed": "#b5ebff",
                        "on-primary-fixed-variant": "#004881",
                        "surface-container-low": "#121c2a",
                        "on-primary": "#00315b",
                        "tertiary-fixed": "#5cfdbd",
                        "outline": "#8a919d",
                        "tertiary": "#35e0a3",
                        "on-error-container": "#ffdad6",
                        "primary": "#a2c9ff",
                        "on-error": "#690005",
                        "on-secondary-fixed": "#001f28",
                        "surface-tint": "#a2c9ff",
                        "on-tertiary-fixed-variant": "#005137",
                        "primary-fixed": "#d3e4ff",
                        "surface-panel": "#0C1728",
                        "on-tertiary-container": "#003f2a",
                        "surface-card": "#101C30",
                        "inverse-surface": "#d9e3f7",
                        "on-primary-container": "#003866",
                        "secondary": "#7ddeff",
                        "bullish": "#3EE6A8"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "gutter": "20px",
                        "stack-lg": "24px",
                        "stack-md": "16px",
                        "container-max": "1440px",
                        "stack-sm": "8px",
                        "margin-mobile": "16px",
                        "margin-desktop": "32px"
                    },
                    "fontFamily": {
                        "headline-sm": ["Inter"],
                        "headline-lg": ["Inter"],
                        "body-md": ["Inter"],
                        "body-lg": ["Inter"],
                        "headline-md": ["Inter"],
                        "label-sm": ["Inter"],
                        "display-numeric": ["Inter"],
                        "label-md": ["Inter"]
                    },
                    "fontSize": {
                        "headline-sm": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
                        "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                        "headline-lg": ["32px", {"lineHeight": "40px", "fontWeight": "600"}],
                        "body-md": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                        "body-lg": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                        "label-sm": ["12px", {"lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "500"}],
                        "display-numeric": ["36px", {"lineHeight": "44px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                        "label-md": ["13px", {"lineHeight": "18px", "letterSpacing": "0.01em", "fontWeight": "500"}]
                    }
                }
            }
        }
    </script>
<style>
        body { font-family: 'Inter', sans-serif; background-color: #0a1422; }
        .glass-panel {
            background: rgba(16, 28, 48, 0.7);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(29, 42, 66, 0.5);
        }
        .sparkline-svg {
            stroke-width: 2;
            fill: none;
            stroke-linecap: round;
        }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1D2A42; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #2c3545; }
    </style>
</head>
<body class="text-on-surface selection:bg-primary/30">
<!-- Side Navigation Shell -->
<aside class="flex flex-col h-screen fixed left-0 top-0 bg-surface-container-low border-r border-border-subtle/50 w-64 z-50 transition-all duration-200 ease-in-out">
<div class="p-6">
<img alt="AlphaPilot Logo" class="h-8 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAffywjTOMgSG4aidBukLpVhyqj1t9iWcucAvdxqQVlJIxZJtRD4ZG1UJW_kkuJKlWNhMUuanAGs8OrdboNb3Oyva8IZCtfvAH5FJRTZl6BXFS7CttoLXA6Y-mFEv5I50D8Wnpcm8GXnbMLqMfTYe5IVjzmvA85yOVjhYDqnTlh4vOeQdaXBZ_8NIgbZIOsFkV90-gLdzQrvX8LE7GYQFZophBuYSQziSnAYiuASck1v3K-FrUHSc-3RPp2AzIruv0CEyMYVrkLeHkA">
<div class="mt-2 font-headline-md text-headline-md font-bold text-primary">AlphaPilot</div>
<div class="font-body-md text-body-md text-text-secondary opacity-70">AI Intelligence v2.4</div>
</div>
<nav class="flex-1 px-4 space-y-1">
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant font-medium hover:bg-surface-variant/30 hover:text-on-surface transition-all h-12" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span class="font-body-md text-body-md">Dashboard</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-primary font-bold border-r-2 border-primary bg-surface-variant/20 transition-all h-12" href="#">
<span class="material-symbols-outlined">filter_alt</span>
<span class="font-body-md text-body-md">Market Screener</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant font-medium hover:bg-surface-variant/30 hover:text-on-surface transition-all h-12" href="#">
<span class="material-symbols-outlined">auto_awesome</span>
<span class="font-body-md text-body-md">AI Signals</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant font-medium hover:bg-surface-variant/30 hover:text-on-surface transition-all h-12" href="#">
<span class="material-symbols-outlined">account_balance_wallet</span>
<span class="font-body-md text-body-md">Portfolio</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant font-medium hover:bg-surface-variant/30 hover:text-on-surface transition-all h-12" href="#">
<span class="material-symbols-outlined">settings</span>
<span class="font-body-md text-body-md">Settings</span>
</a>
</nav>
<div class="p-4 border-t border-border-subtle/30">
<button class="w-full bg-primary-container text-on-primary-container py-3 rounded-lg font-label-md text-label-md font-bold hover:brightness-110 transition-all mb-4">
                Upgrade to Pro
            </button>
<div class="space-y-1">
<a class="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant font-medium hover:text-on-surface" href="#">
<span class="material-symbols-outlined">help_outline</span>
<span class="font-body-md text-body-md">Support</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant font-medium hover:text-on-surface" href="#">
<span class="material-symbols-outlined">logout</span>
<span class="font-body-md text-body-md">Log Out</span>
</a>
</div>
</div>
</aside>
<!-- Main Content Area -->
<main class="ml-64 min-h-screen">
<!-- Top Nav Bar -->
<header class="flex justify-between items-center h-16 px-8 sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-border-subtle/50">
<div class="flex items-center gap-8">
<div class="font-headline-sm text-headline-sm font-black text-on-surface">AlphaPilot Screener</div>
<div class="hidden md:flex gap-6 items-center h-full">
<a class="text-primary border-b-2 border-primary pb-1 font-label-md text-label-md" href="#">All Markets</a>
<a class="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md" href="#">Nasdaq 100</a>
<a class="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md" href="#">S&amp;P 500</a>
<a class="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md" href="#">Crypto</a>
</div>
</div>
<div class="flex items-center gap-4">
<button class="flex items-center gap-2 px-4 py-2 border border-border-subtle rounded-lg text-label-md font-label-md text-on-surface hover:bg-surface-variant/30 transition-all">
<span class="material-symbols-outlined text-sm">notifications</span>
                    Create Alert
                </button>
<div class="h-10 w-10 rounded-full bg-surface-variant flex items-center justify-center border border-border-subtle cursor-pointer hover:border-primary transition-all">
<span class="material-symbols-outlined">account_circle</span>
</div>
</div>
</header>
<!-- Screener Header -->
<section class="p-8">
<div class="mb-8">
<h1 class="font-headline-lg text-headline-lg text-text-primary mb-1">AI Market Scanner</h1>
<p class="font-body-lg text-body-lg text-text-secondary">Discover high-probability opportunities across all sectors using neural analysis.</p>
</div>
<!-- Filter Controls -->
<div class="glass-panel rounded-xl p-4 flex flex-wrap items-center gap-4 mb-8">
<div class="flex-1 flex gap-3 min-w-[400px] items-center">
<div class="relative flex-1">
<select class="w-full bg-surface-container-lowest border border-border-subtle rounded-lg px-4 py-2.5 text-on-surface font-label-md text-label-md appearance-none focus:ring-1 focus:ring-primary outline-none h-12">
<option>Sector: All</option>
<option>Technology</option>
<option>Healthcare</option>
<option>Fintech</option>
<option>Energy</option>
</select>
<span class="material-symbols-outlined absolute right-3 top-2.5 pointer-events-none text-text-secondary">keyboard_arrow_down</span>
</div>
<div class="relative flex-1">
<select class="w-full bg-surface-container-lowest border border-border-subtle rounded-lg px-4 py-2.5 text-on-surface font-label-md text-label-md appearance-none focus:ring-1 focus:ring-primary outline-none h-12">
<option>Market Cap: Large</option>
<option>Mid Cap</option>
<option>Small Cap</option>
</select>
<span class="material-symbols-outlined absolute right-3 top-2.5 pointer-events-none text-text-secondary">keyboard_arrow_down</span>
</div>
<div class="relative flex-1">
<select class="w-full bg-surface-container-lowest border border-border-subtle rounded-lg px-4 py-2.5 text-on-surface font-label-md text-label-md appearance-none focus:ring-1 focus:ring-primary outline-none h-12">
<option>AI Signal: Bullish</option>
<option>Trend Reversal</option>
<option>Oversold</option>
<option>High Volatility</option>
</select>
<span class="material-symbols-outlined absolute right-3 top-2.5 pointer-events-none text-text-secondary">keyboard_arrow_down</span>
</div>
</div>
<div class="flex items-center gap-4 border-l border-border-subtle/50 pl-4">
<div class="relative">
<select class="bg-transparent border-none text-on-surface font-label-md text-label-md pr-8 cursor-pointer focus:ring-0 h-12">
<option>Sort by: AI Score</option>
<option>By Probability</option>
<option>By Market Cap</option>
</select>
<span class="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary">sort</span>
</div>
<div class="flex bg-surface-container-lowest rounded-lg p-1 border border-border-subtle">
<button class="px-4 py-1.5 rounded-md text-label-md font-label-md bg-surface-variant text-on-surface shadow-sm transition-all">Top 20</button>
<button class="px-4 py-1.5 rounded-md text-label-md font-label-md text-text-secondary hover:text-on-surface transition-all">Top 50</button>
</div>
</div>
</div>
<!-- Stock Table Container -->
<div class="glass-panel rounded-xl overflow-hidden">
<table class="w-full text-left border-collapse">
<thead class="bg-surface-container-high/50 border-b border-border-subtle/50">
<tr>
<th class="px-6 py-4 font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">Symbol / Name</th>
<th class="px-6 py-4 font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">Sector</th>
<th class="px-6 py-4 font-label-sm text-label-sm text-text-secondary uppercase tracking-wider text-center">AI Score</th>
<th class="px-6 py-4 font-label-sm text-label-sm text-text-secondary uppercase tracking-wider text-left">Upward Probability</th>
<th class="px-6 py-4 font-label-sm text-label-sm text-text-secondary uppercase tracking-wider text-center">Risk Level</th>
<th class="px-6 py-4 font-label-sm text-label-sm text-text-secondary uppercase tracking-wider text-right">Action</th>
</tr>
</thead>
<tbody class="divide-y divide-border-subtle/30">
<!-- Row 1 -->
<tr class="group hover:bg-surface-variant/20 transition-all cursor-pointer">
<td class="px-6 py-4">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-lg bg-primary-container/20 flex items-center justify-center font-bold text-primary">NV</div>
<div>
<div class="font-headline-sm text-[16px] text-text-primary">NVDA</div>
<div class="font-body-md text-label-sm text-text-secondary">NVIDIA Corp.</div>
</div>
<div class="ml-2 w-16 h-8">
<svg class="sparkline-svg stroke-bullish" viewBox="0 0 100 40">
<path d="M0,35 L20,30 L40,32 L60,15 L80,20 L100,5"></path>
</svg>
</div>
</div>
</td>
<td class="px-6 py-4">
<span class="font-body-md text-on-surface-variant">Technology</span>
</td>
<td class="px-6 py-4 text-center">
<div class="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-bullish/30 relative">
<span class="font-display-numeric text-lg text-bullish">94</span>
</div>
</td>
<td class="px-6 py-4">
<div class="w-full max-w-[120px]">
<div class="flex justify-between mb-1">
<span class="text-label-sm font-label-sm text-bullish">88.4%</span>
</div>
<div class="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-bullish" style="width: 88.4%"></div>
</div>
</div>
</td>
<td class="px-6 py-4 text-center">
<span class="px-3 py-1 rounded-full bg-bullish/10 text-bullish text-[11px] font-bold uppercase tracking-wide border border-bullish/20 inline-flex items-center justify-center leading-none w-24">Low Risk</span>
</td>
<td class="px-6 py-4 text-right">
<button class="px-4 py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md font-bold hover:scale-105 transition-transform active:opacity-80 w-24">Analyze</button>
</td>
</tr>
<!-- Row 2 -->
<tr class="group hover:bg-surface-variant/20 transition-all cursor-pointer">
<td class="px-6 py-4">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-lg bg-secondary-container/20 flex items-center justify-center font-bold text-secondary">TS</div>
<div>
<div class="font-headline-sm text-[16px] text-text-primary">TSLA</div>
<div class="font-body-md text-label-sm text-text-secondary">Tesla, Inc.</div>
</div>
<div class="ml-2 w-16 h-8">
<svg class="sparkline-svg stroke-status-danger" viewBox="0 0 100 40">
<path d="M0,5 L20,25 L40,15 L60,35 L80,28 L100,38"></path>
</svg>
</div>
</div>
</td>
<td class="px-6 py-4">
<span class="font-body-md text-on-surface-variant">Consumer Cyclical</span>
</td>
<td class="px-6 py-4 text-center">
<div class="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-status-warning/30 relative">
<span class="font-display-numeric text-lg text-status-warning">71</span>
</div>
</td>
<td class="px-6 py-4">
<div class="w-full max-w-[120px]">
<div class="flex justify-between mb-1">
<span class="text-label-sm font-label-sm text-status-warning">64.2%</span>
</div>
<div class="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-status-warning" style="width: 64.2%"></div>
</div>
</div>
</td>
<td class="px-6 py-4 text-center">
<span class="px-3 py-1 rounded-full bg-status-warning/10 text-status-warning text-[11px] font-bold uppercase tracking-wide border border-status-warning/20 inline-flex items-center justify-center leading-none text-center min-w-[100px] w-24">Medium Risk</span>
</td>
<td class="px-6 py-4 text-right">
<button class="px-4 py-2 bg-surface-variant text-on-surface rounded-lg font-label-md text-label-md font-bold hover:bg-primary-container hover:text-on-primary-container transition-all w-24">Analyze</button>
</td>
</tr>
<!-- Row 3 -->
<tr class="group hover:bg-surface-variant/20 transition-all cursor-pointer">
<td class="px-6 py-4">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-lg bg-primary-container/20 flex items-center justify-center font-bold text-primary">PL</div>
<div>
<div class="font-headline-sm text-[16px] text-text-primary">PLTR</div>
<div class="font-body-md text-label-sm text-text-secondary">Palantir Technologies</div>
</div>
<div class="ml-2 w-16 h-8">
<svg class="sparkline-svg stroke-bullish" viewBox="0 0 100 40">
<path d="M0,38 L20,30 L40,25 L60,10 L80,5 L100,2"></path>
</svg>
</div>
</div>
</td>
<td class="px-6 py-4">
<span class="font-body-md text-on-surface-variant">Technology</span>
</td>
<td class="px-6 py-4 text-center">
<div class="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-bullish/30 relative">
<span class="font-display-numeric text-lg text-bullish">89</span>
</div>
</td>
<td class="px-6 py-4">
<div class="w-full max-w-[120px]">
<div class="flex justify-between mb-1">
<span class="text-label-sm font-label-sm text-bullish">82.1%</span>
</div>
<div class="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-bullish" style="width: 82.1%"></div>
</div>
</div>
</td>
<td class="px-6 py-4 text-center">
<span class="px-3 py-1 rounded-full bg-bullish/10 text-bullish text-[11px] font-bold uppercase tracking-wide border border-bullish/20 inline-flex items-center justify-center leading-none w-24">Low Risk</span>
</td>
<td class="px-6 py-4 text-right">
<button class="px-4 py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md font-bold hover:scale-105 transition-transform active:opacity-80 w-24">Analyze</button>
</td>
</tr>
<!-- Row 4 -->
<tr class="group hover:bg-surface-variant/20 transition-all cursor-pointer">
<td class="px-6 py-4">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-lg bg-error-container/20 flex items-center justify-center font-bold text-error">CO</div>
<div>
<div class="font-headline-sm text-[16px] text-text-primary">COIN</div>
<div class="font-body-md text-label-sm text-text-secondary">Coinbase Global</div>
</div>
<div class="ml-2 w-16 h-8">
<svg class="sparkline-svg stroke-status-warning" viewBox="0 0 100 40">
<path d="M0,20 L20,10 L40,30 L60,5 L80,35 L100,20"></path>
</svg>
</div>
</div>
</td>
<td class="px-6 py-4">
<span class="font-body-md text-on-surface-variant">Financial Services</span>
</td>
<td class="px-6 py-4 text-center">
<div class="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-status-danger/30 relative">
<span class="font-display-numeric text-lg text-status-danger">42</span>
</div>
</td>
<td class="px-6 py-4">
<div class="w-full max-w-[120px]">
<div class="flex justify-between mb-1">
<span class="text-label-sm font-label-sm text-status-danger">38.9%</span>
</div>
<div class="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-status-danger" style="width: 38.9%"></div>
</div>
</div>
</td>
<td class="px-6 py-4 text-center">
<span class="px-3 py-1 rounded-full bg-status-danger/10 text-status-danger text-[11px] font-bold uppercase tracking-wide border border-status-danger/20 inline-flex items-center justify-center leading-none text-center w-24">High Risk</span>
</td>
<td class="px-6 py-4 text-right">
<button class="px-4 py-2 bg-surface-variant text-on-surface rounded-lg font-label-md text-label-md font-bold hover:bg-primary-container hover:text-on-primary-container transition-all w-24">Analyze</button>
</td>
</tr>
</tbody>
</table>
</div>
<!-- AI Signal Legend / Bottom Stats -->
<div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
<div class="glass-panel p-6 rounded-xl flex items-center gap-4">
<div class="w-12 h-12 rounded-full bg-bullish/20 flex items-center justify-center text-bullish">
<span class="material-symbols-outlined">trending_up</span>
</div>
<div>
<div class="text-label-sm font-label-sm text-text-secondary uppercase">Active Bullish Signals</div>
<div class="font-headline-md text-headline-md text-bullish">127 Stocks</div>
</div>
</div>
<div class="glass-panel p-6 rounded-xl flex items-center gap-4">
<div class="w-12 h-12 rounded-full bg-status-warning/20 flex items-center justify-center text-status-warning">
<span class="material-symbols-outlined">psychology_alt</span>
</div>
<div>
<div class="text-label-sm font-label-sm text-text-secondary uppercase">Analysis Confidence</div>
<div class="font-headline-md text-headline-md text-status-warning">High (89%)</div>
</div>
</div>
<div class="glass-panel p-6 rounded-xl flex items-center gap-4">
<div class="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
<span class="material-symbols-outlined">bolt</span>
</div>
<div>
<div class="text-label-sm font-label-sm text-text-secondary uppercase">Processing Speed</div>
<div class="font-headline-md text-headline-md text-primary">1.2ms / ticker</div>
</div>
</div>
</div>
</section>
<!-- Footer Overlay Info -->
<footer class="p-8 pt-0 opacity-50 w-full">
<div class="border-t border-border-subtle/30 pt-4 flex justify-between items-center text-label-sm font-label-sm">
<p class="">© 2024 AlphaPilot AI Intelligence. Market data delayed by 15 minutes.</p>
<div class="flex gap-6">
<a class="hover:text-primary transition-colors" href="#">Risk Disclosure</a>
<a class="hover:text-primary transition-colors" href="#">API Access</a>
<a class="hover:text-primary transition-colors" href="#">System Status</a>
</div>
</div>
</footer>
</main>
<!-- Floating AI Assistant Button -->
<button class="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg shadow-primary/20 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
<span class="material-symbols-outlined text-3xl" style="font-variation-settings: &quot;FILL&quot; 1;">auto_awesome</span>
</button>
<script>
        // Simple row hover effect enhancement
        document.querySelectorAll('tr.group').forEach(row => {
            row.addEventListener('click', () => {
                const ticker = row.querySelector('.text-text-primary').textContent;
                console.log(`Analyzing ${ticker}...`);
            });
        });
    </script>


</body></html>