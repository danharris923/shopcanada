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

ShopCanada is a **Next.js 14 App Router** Canadian deals aggregator deployed on **Vercel**. It aggregates affiliate deals, renders them with ISR (on-demand + 15-min revalidate), and monetizes via affiliate link redirects.

### Data Layer
- **PostgreSQL** (Vercel Postgres) accessed via raw `pg` queries — no ORM
- All query functions live in `src/lib/db.ts` (50+ functions: `getDealBySlug`, `getDeals`, `getFeaturedDeals`, `searchDeals`, etc.)
- `transformRow()` in db.ts converts PG types (Date, DECIMAL, JSONB) to primitives for React Server Component serialization
- Key tables: `deals`, `stores`, `categories`, `scrape_logs`
- Schema initialization: `init-db.js`

### Rendering
- Pages are **server components** by default; client components use `'use client'` directive
- ISR with `revalidate: 900` on deal/category pages; recent switch to on-demand ISR
- Path alias: `@/*` → `./src/*`

### Affiliate System
- `/api/go` route handles affiliate redirects (tracks click, then redirects)
- Affiliate URL builders in `src/lib/affiliates.ts`
- Amazon affiliate tag configured in admin

### Key Directories
- `src/lib/` — Business logic, DB queries, config, SEO content generation, affiliate utils
- `src/components/deal/` — Psychological CTA components (urgency, social proof, stock warnings, trust badges)
- `src/types/deal.ts` — Core TypeScript interfaces (Deal, Store, Category, DealCardProps)
- `src/app/canadian/` — Canadian brands section with brand stories
- `scripts/` — Migration and data sync scripts

### Styling
- **Tailwind CSS** with custom theme: maple-red (`#8F020D`), burgundy, soft-black
- Custom font: Inter via Google Fonts
- Custom animations: pulse-fast, glow, shake, slide-up, fade-in, ticker-scroll

### Environment
Required: `POSTGRES_URL`, `BLOB_READ_WRITE_TOKEN`, `NEXT_PUBLIC_SITE_URL`
Optional: `NEXT_PUBLIC_GA_ID`

### Security
- Parameterized SQL queries throughout
- Security headers configured in `vercel.json` (HSTS, CSP, X-Frame-Options)
- Remote image patterns whitelisted in `next.config.js`
