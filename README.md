# Husn-e-Hijab — Contemporary Luxury Modest Fashion

A premium e-commerce experience for **Husn-e-Hijab**, a luxury modest fashion brand specializing in hijabs, niqabs, abayas, and khimars. Built with Next.js App Router, featuring cinematic GSAP animations, a curated product catalog, and WhatsApp-integrated order confirmation.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict mode) |
| UI | React 19 |
| Styling | Tailwind CSS 4 |
| Animations | GSAP 3.15 + `@gsap/react` |
| Icons | Lucide React |
| Utilities | `clsx`, `tailwind-merge` |
| Linting | ESLint 9 (flat config) |
| Deployment | Vercel |

---

## Features

### Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with 6 cinematic storytelling sections |
| `/products` | Filterable product catalog with category tabs |
| `/about` | Brand philosophy, story, and core pillars |
| `/contact` | Contact form with direct inquiry info |
| `/checkout` | Multi-step checkout with 5 payment methods |
| `/checkout/success` | Order confirmation with WhatsApp integration |

### Home Page Sections

1. **HeroSection** — Full-viewport hero with three switchable color atmospheres (Dusty Rose, Deep Cocoa, Obsidian Charcoal), parallax mouse tracking, and entrance choreography
2. **EditorialRevealSection** — Auto-advancing editorial carousel showcasing 4 fashion looks with cinematic garment-to-small-preview transitions
3. **CollectionShowcaseSection** — Interactive collection category showcase with auto-advancing slider and dynamic background transitions
4. **FeaturePillsSection** — Accordion-style feature showcase explaining 5 design principles with scroll-triggered GSAP entrance
5. **CursorReactiveSection** — Dark-themed section with a 5-layer cursor parallax system creating depth effect
6. **MouseTrailCTASection** — CTA section with mouse-trail effect that drops product image thumbnails along the cursor path

### E-Commerce

- **Product Catalog** — 9 products across 4 categories (Hijab, Niqab, Abaya, Khimar) with filtering
- **Quick View Modal** — Product detail overlay with quantity selector and add-to-cart
- **Cart Drawer** — Slide-in right drawer with quantity controls, subtotals, and checkout CTA
- **Cart Persistence** — localStorage-backed cart with hydration-safe initialization
- **Multi-Payment Checkout** — ATM/Credit/Debit Cards, PayPal, JazzCash/EasyPaisa/Raast, Bank Wire/IBAN, Cash on Delivery
- **WhatsApp Order Flow** — Pre-formatted order summary sent via WhatsApp for confirmation

### Animation System

The app uses GSAP extensively with these patterns:

- **Entrance Timelines** — Staggered reveal animations on page load and scroll
- **Cursor Parallax** — `gsap.quickTo()` physics for multi-layer depth effects
- **Idle Floating** — Continuous gentle floating animation on hero garment
- **ScrollTrigger** — Scroll-driven animations with `toggleActions` for replay on re-entry
- **Dual-Timeline Transitions** — Exit-then-enter animations for carousel slides
- **Mouse Trail** — Ring-buffer trail spawning product thumbnails along cursor path

All animations respect `prefers-reduced-motion` and disable on touch devices.

### Design System

| Token | Hex | Usage |
|-------|-----|-------|
| Ivory | `#F5F0E9` | Page background |
| Soft White | `#FAF8F4` | Cards, modals |
| Charcoal | `#1C1B1B` | Primary text, dark backgrounds |
| Deep Cocoa | `#3A2620` | Buttons, borders |
| Dusty Rose | `#B98388` | Accent, active states |
| Gold | `#C5A059` | Premium accents, badges |
| Warm Sand | `#D8C8B9` | Subtle accents |

**Typography:**
- Display: Cormorant Garamond (serif) — headlines, section titles
- Body: Plus Jakarta Sans (sans-serif) — paragraphs, UI elements
- Mono: System mono — prices, metadata, slide numbers

---

## Project Structure

```
anitii/
├── app/
│   ├── layout.tsx                 # Root layout (fonts, providers, Navbar/Footer)
│   ├── page.tsx                   # Home page (6 sections)
│   ├── globals.css                # Global styles, CSS variables, animations
│   ├── about/page.tsx             # Brand philosophy page
│   ├── contact/page.tsx           # Contact page with form
│   ├── products/page.tsx          # Product catalog page
│   └── checkout/
│       ├── page.tsx               # Checkout form (5 payment methods)
│       └── success/page.tsx       # Order confirmation + WhatsApp
├── components/
│   ├── cart/CartDrawer.tsx        # Slide-in cart drawer
│   ├── contact/ContactForm.tsx    # Contact inquiry form
│   ├── home/
│   │   ├── HeroSection.tsx        # Hero with 3 atmospheres
│   │   ├── EditorialRevealSection.tsx  # Editorial carousel
│   │   ├── CollectionShowcaseSection.tsx  # Collection showcase
│   │   ├── FeaturePillsSection.tsx # Feature accordion
│   │   ├── CursorReactiveSection.tsx  # Cursor parallax section
│   │   └── MouseTrailCTASection.tsx  # Mouse trail CTA
│   ├── layout/
│   │   ├── Navbar.tsx             # Fixed nav with mobile drawer
│   │   └── Footer.tsx             # Site-wide footer
│   ├── products/ProductGrid.tsx   # Filterable product grid
│   └── ui/QuickViewModal.tsx      # Product quick view modal
├── context/
│   └── CartContext.tsx            # Cart state + localStorage persistence
├── data/
│   ├── siteConfig.ts              # Brand config, nav links, principles
│   └── products.ts                # Product catalog (9 items)
├── public/
│   ├── assets/                    # Brand logos, hero images, editorial looks
│   └── images/                    # Product photography, page images
│       ├── home/
│       ├── about/
│       └── contact/
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd anitii

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

---

## Data Architecture

This is a **static, client-side application** with no backend, database, or API calls.

- **`data/siteConfig.ts`** — Brand identity, navigation links, contact info, brand principles (read-only)
- **`data/products.ts`** — Product catalog with 9 items, TypeScript `Product` interface
- **`context/CartContext.tsx`** — React Context managing cart state, persisted to `localStorage` under key `husn_cart_items_v1`

### Cart Context API

```tsx
const { items, addToCart, removeFromCart, updateQuantity, clearCart,
        isCartOpen, openCart, closeCart,
        subtotalPrice, totalItemsCount } = useCart();
```

- `addToCart` auto-opens the cart drawer
- Duplicate products merge by incrementing quantity
- `subtotalPrice` and `totalItemsCount` are memoized
- Hydration-safe: prevents SSR/localStorage mismatches

---

## Product Catalog

| Product | Category | Price (PKR) | Featured |
|---------|----------|-------------|----------|
| Husn Flowing Rose Ensemble | Abaya | 8,900 | Yes |
| Royal Emerald Velvet Abaya | Abaya | 12,500 | Yes |
| Noir Lace Trim Abaya | Abaya | 7,800 | Yes |
| Sage Whisper Layered Abaya | Abaya | 9,400 | No |
| Vail 3-Tier Layered Niqab | Niqab | 2,900 | Yes |
| Cocoa Satin Trim Niqab | Niqab | 2,400 | No |
| Imperial Viscose Drape Hijab | Hijab | 1,950 | Yes |
| Satin Silk Shimmer Hijab | Hijab | 2,600 | No |
| Grace Overhead Khimar | Khimar | 4,900 | Yes |

---

## Checkout Flow

1. User adds products to cart via catalog or quick-view modal
2. Proceeds to `/checkout` — fills shipping details (name, phone, email, address, city, country)
3. Selects one of 5 payment methods with method-specific fields
4. Form validates and generates a random order ID (`HNJ-XXXXXX`)
5. Order data saved to `sessionStorage` and user redirected to `/checkout/success`
6. Success page displays order summary with pre-formatted WhatsApp message
7. User clicks to open WhatsApp and sends order to the store

**Payment Methods:**
- ATM / Credit & Debit Cards (Visa, MasterCard, PayPak detection)
- PayPal & International Transfer
- JazzCash / EasyPaisa / Raast
- Direct Bank Wire / IBAN (Meezan Bank Ltd)
- Cash on Delivery

---

## Configuration

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js config (default) |
| `tsconfig.json` | TypeScript (strict, ES2017, bundler resolution, `@/*` alias) |
| `postcss.config.mjs` | PostCSS with `@tailwindcss/postcss` (Tailwind v4) |
| `eslint.config.mjs` | ESLint flat config with `next/core-web-vitals` + `next/typescript` |

---

## Deployment (GitHub Pages)

The site deploys automatically to GitHub Pages via GitHub Actions on every push to `master`.

**Live URL:** https://abdullah12qw119.github.io/husn-e-hijab/

### How it works

1. `.github/workflows/deploy.yml` builds a static export (`output: "export"`) on push
2. The build sets `NEXT_PUBLIC_BASE_PATH=/husn-e-hijab` so all asset URLs are prefixed for the subpath
3. `image-loader.ts` (custom Next.js image loader) prefixes all `next/image` srcs at build time
4. `trailingSlash: true` emits each route as a folder with `index.html` so direct URLs work
5. `public/.nojekyll` prevents Jekyll processing of `_next/` assets
6. The `out/` folder is uploaded and served via `actions/deploy-pages`

### One-time setup (already done / required if recreating)

In **GitHub repo → Settings → Pages → Source**, select **GitHub Actions**.

### Manual trigger

The workflow also supports manual runs via **Actions → Deploy to GitHub Pages → Run workflow**.

> Note: locally, `npm run dev` and `npm run build && npm start` work unchanged — the static-export config only activates when `NEXT_PUBLIC_BASE_PATH` is set.

---

## Assets

- **Brand:** Logo original + mark (`public/assets/`)
- **Hero:** 3 hero images, 4 editorial looks (`public/assets/`, `public/assets/editorial/`)
- **Products:** 25+ product and model photographs (`public/images/`)
- **Page-specific:** About (3 images), Contact (1 image), Home (5 images)

---

## License

Private project. All rights reserved.
