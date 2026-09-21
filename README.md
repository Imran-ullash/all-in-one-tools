# OmniTools — Modern All-in-One Online Utility Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

OmniTools is a high-speed, 100% client-side, privacy-focused online utility platform built with **Next.js 14 (App Router)** and **TypeScript**. Designed with a premium dark minimalist aesthetic, high-contrast typography, and smooth micro-animations.

---

## ✨ Features

- **⚡ 100% Client-Side Privacy**: All computations, image processing, and text analysis happen locally in the user's browser. Zero data is sent to external servers.
- **🚀 18 High-Performance Utilities**: Spanning calculators, text tools, image processors, and developer utilities.
- **🔍 Global Instant Search**: Fast, keyboard-accessible command palette (`Ctrl+K` / `Cmd+K`) to jump to any tool instantly.
- **📱 Fully Responsive**: Tailored for desktop, tablet, and mobile with dedicated drawer navigation and touch-friendly controls.
- **🎨 Bespoke Dark Aesthetic**: Rich color palette (`#0A0A0F`), smooth transitions, and glassmorphic dropdowns.
- **📈 Production SEO & Schema**: Static Site Generation (SSG), OpenGraph tags, JSON-LD Schema (`SoftwareApplication` & `WebSite`), sitemap.xml, and robots.txt.
- **💰 Monetization-Ready**: Pre-configured for Google AdSense with clean slots, auto-suppression in dev/unconfigured states, and `ads.txt` support.

---

## 🛠️ Tool Suite (18 Built-in Tools)

### 1. 🧮 Calculators
- **Age Calculator**: Exact chronological age (years, months, days, minutes) + next birthday countdown.
- **BMI Calculator**: Bi-directional metric/imperial unit converter (kg/cm $\leftrightarrow$ lbs/ft) with interactive sliders, visual gauge, and copyable summary.
- **Percentage Calculator**: 3-in-1 percentage calculation (X% of Y, X is what % of Y, percentage increase/decrease).
- **Loan Calculator**: Fixed-rate EMI calculator with principal vs interest ratio bars and first 12-month amortization schedule.
- **Date Calculator**: Date difference calculator and future/past date adder/subtractor.

### 2. 📝 Text Tools
- **Word Counter**: Live count of words, characters, sentences, paragraphs, reading time, and speaking time.
- **Character Counter**: Detailed metrics with/without spaces and social media limit progress bars (X/Twitter, LinkedIn, Meta).
- **Case Converter**: Convert between UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, and PascalCase.
- **Remove Duplicate Lines**: Deduplicate lists, sort alphabetically, remove whitespace, and count unique items.

### 3. 🖼️ Image Tools
- **Image Compressor**: In-browser Canvas-based compression with target file-size estimation and quality controls.
- **Image Resizer**: Dimension controls (percentage or exact pixels) with aspect ratio locking.
- **JPG to PNG Converter**: Instant format conversion with transparent background support.
- **PNG to JPG Converter**: Convert PNGs to optimized JPGs with custom background color fill.

### 4. 💻 Developer Tools
- **JSON Formatter**: Syntax highlighting, 2/4 space indentation, minification, and copy/download.
- **JSON Validator**: Instant syntax validation with clear line and column error indicators.
- **Base64 Encoder**: Encode UTF-8 text or binary files into standard Base64.
- **Base64 Decoder**: Decode Base64 strings back to clean UTF-8 text.
- **UUID Generator**: Bulk v4 UUID generator (uppercase/lowercase, with/without hyphens) with copy-all.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Imran-ullash/all-in-one-tools.git
   cd all-in-one-tools
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (optional):
   ```bash
   cp .env.example .env.local
   ```
   Add your Google AdSense publisher ID when ready:
   ```env
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

5. Build for production:
   ```bash
   npm run build
   npm run start
   ```

---

## 📁 Project Architecture

```
Tools-website/
├── assets/                  # CSS stylesheets (design system tokens)
│   ├── css/main.css         # Global layout, theme variables & typography
│   ├── css/tools.css        # Interactive tool cards, gauges, segmented buttons
│   └── css/components.css   # Modals, drawers, breadcrumbs & toasts
├── public/                  # Static assets & SEO files
│   ├── ads.txt              # AdSense authorization verification
│   └── robots.txt           # Crawler instructions
├── src/
│   ├── app/                 # Next.js 14 App Router
│   │   ├── [category]/      # Dynamic and static category routes
│   │   │   └── [slug]/      # SSG individual tool pages
│   │   ├── layout.tsx       # Root layout with fonts & AdSense loader
│   │   ├── page.tsx         # Homepage with hero search & categories
│   │   ├── sitemap.ts       # Dynamic sitemap generation
│   │   └── robots.ts        # Dynamic robots.txt generation
│   ├── components/
│   │   ├── ads/             # GoogleAdSense & AdBanner components
│   │   ├── home/            # HeroSearch & landing components
│   │   ├── layout/          # Header with mega-menu, Footer, Drawer
│   │   ├── search/          # Command palette search modal
│   │   ├── tools/           # 18 client-side tool implementations
│   │   └── ui/              # Toast notifications & UI primitives
│   ├── context/             # SearchContext (global Ctrl+K state)
│   ├── data/                # Tools catalog & metadata definitions
│   └── types/               # TypeScript interfaces
├── .gitignore               # Excludes build output, node_modules, and secrets
├── next.config.js           # Next.js configuration
├── package.json             # Scripts & dependencies
└── tsconfig.json            # TypeScript configuration
```

---

## 🚢 Deployment

Deploy effortlessly to **Vercel**, **Netlify**, or any Node.js hosting platform:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Imran-ullash/all-in-one-tools)

1. Push your repository to GitHub.
2. Import the project in Vercel or Netlify.
3. The build command (`npm run build`) and output directory (`.next`) are automatically detected.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
