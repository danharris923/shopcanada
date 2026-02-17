# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Next.js)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint via Next.js
```

No test suite is configured.

## Architecture

ShopCanada is a **Next.js 14 App Router** Canadian deals aggregator deployed on **Vercel** at shopcanada.cc. A separate scraper (runs on a DigitalOcean droplet) writes deals to the shared Vercel Postgres database; this frontend reads and renders them.

### Data Flow
```
DO Droplet (Scraper) → Vercel Postgres ← Next.js Frontend (Vercel) → Users
                                        ← Flipp API (live flyer deals)
                                        ← Fashion deals (generated from local brand images)
```

### Data Layer
- **PostgreSQL** (Vercel Postgres) accessed via raw `pg` queries — no ORM
- All query functions live in `src/lib/db.ts` — uses `query<T>()` and `queryOne<T>()` helpers with parameterized SQL
- `transformRow()` in db.ts converts PG types (Date, DECIMAL, JSONB, BigInt) to primitives for React Server Component serialization — all DB results pass through this
- Key tables: `deals`, `stores`, `categories`, `scrape_logs`
- Schema initialization: `init-db.js`

### Deal Sources & Shuffle System
The homepage blends deals from three sources via `src/lib/deal-shuffle.ts`:
- **Database deals** — scraped from Canadian retailers (the `deals` table)
- **Flipp API deals** — live Canadian flyer deals fetched from `backflipp.wishabi.com` (`src/lib/flipp.ts`)
- **Fashion deals** — synthetic deal cards generated from local brand images (`src/lib/fashion-deals.ts`, `src/lib/fashion-brands.ts`)

Distribution target: ~33% fashion, ~25% Flipp, ~20% Amazon (max), ~22% other. Shuffles rotate every 15 minutes using a time-based seed.

### Rendering
- Pages are **server components** by default; client components use `'use client'` directive
- ISR with `revalidate: 900` (15 min) set via `REVALIDATE_INTERVAL` from `src/lib/config.ts`
- Path alias: `@/*` → `./src/*`

### Affiliate System
- `/api/go` route (`src/app/api/go/route.ts`) — fires an affiliate tracking pixel via hidden `<img>`, then JS-redirects the user to the search URL. Params: `a=AFFILIATE_URL&s=SEARCH_URL`
- `src/lib/affiliates.ts` — strips competitor affiliate tags (CJ, UTM, ShareASale, Rakuten, etc.) and builds clean affiliate URLs
- Store-specific affiliate/search URLs are stored in the database `stores` table

### Content Generation
- `src/lib/content-generator.ts` — template-based SEO descriptions (8 variations per category), FAQs, breadcrumbs, store descriptions
- `src/lib/schema.ts` — JSON-LD generators (Product, BreadcrumbList, FAQ, Review) for rich snippets
- `src/lib/urgency.ts` — deterministic "psychological trigger" data (viewer counts, stock levels) derived from deal IDs

### Key Types
All core interfaces in `src/types/deal.ts`:
- `Deal` — maps to the `deals` table
- `MixedDeal extends Deal` — adds `source` field and Flipp-specific props for blended deal lists
- `Store` — full store metadata including policies, badges, affiliate config
- `DealCardProps` — simplified props for the `DealCard` component, supports `variant: 'default' | 'flipp'`

### Canadian Brands Section
- `src/app/canadian/` — dedicated section for Canadian brands with brand stories
- Brand story markdown files in `src/content/brands/stories/{slug}.md`
- Read by `src/lib/brand-story.ts` (strips frontmatter, returns markdown content)

### Key Directories
- `src/lib/` — all business logic: DB queries, config, content generation, affiliate utils, deal shuffling
- `src/components/deal/` — deal page CTA components (urgency, social proof, stock warnings, trust badges, sticky mobile CTA)
- `src/components/` — shared components (DealCard, Header, Footer, StoreLogo, FashionCarousel, etc.)
- `src/app/admin/` — admin page with store management API (`/api/admin/stores`)
- `scripts/` — data migration, brand scraping, and image optimization scripts

### Styling
- **Tailwind CSS** with custom theme: maple-red (`#8F020D`), burgundy, soft-black
- Custom font: Inter via `next/font/google`
- Custom animations: pulse-fast, glow, shake, slide-up, fade-in, ticker-scroll

### Environment
Required: `POSTGRES_URL`, `BLOB_READ_WRITE_TOKEN`, `NEXT_PUBLIC_SITE_URL`
Optional: `NEXT_PUBLIC_GA_ID`

### Security
- Parameterized SQL queries throughout (all queries use `$1`, `$2`, etc.)
- Security headers configured in `vercel.json` (HSTS, X-Frame-Options, COEP, Permissions-Policy)
- Remote image patterns whitelisted in `next.config.js` for Canadian retailer CDNs
