# Shop Canada - Agent Handoff Document

**Last Updated:** December 31, 2024
**Project:** shopcanada.cc - Canadian deals aggregator
**Stack:** Next.js 14, TypeScript, Tailwind CSS, PostgreSQL

---

## Project Overview

Shop Canada is a deals aggregation site for Canadian shoppers. It pulls deals from multiple sources:
- **RFD Scraper** - RedFlagDeals scraped deals
- **Flipp API** - Flyer deals from Canadian retailers
- **Fashion Affiliates** - LTK/RewardStyle affiliate deals from fashion brands
- **Amazon PA-API** - Amazon.ca product deals

The site monetizes through affiliate links (Rakuten, LTK/rstyle.me, Amazon Associates).

---

## Recent Work Completed

### 1. Affiliate Link System Overhaul

**Problem:** Static affiliate links (rstyle.me) couldn't be modified to include search terms, so users landed on homepages instead of product searches.

**Solution:** Created `/api/go` redirect wrapper that:
1. Loads affiliate URL via hidden img beacon (sets cookie)
2. Shows subtle "Redirecting..." toast (200ms)
3. Redirects to search URL

**Files:**
- `src/app/api/go/route.ts` - Redirect endpoint
- `src/lib/affiliates.ts` - `getDealAffiliateUrl()`, `buildAffiliateRedirect()`, `STORE_BRAND_NAMES` map

**Flow:**
```
User clicks deal card
  → /api/go?a=AFFILIATE_URL&s=SEARCH_URL
  → Img beacon fires (sets affiliate cookie)
  → 200ms delay with toast
  → Redirect to retailer search page
```

### 2. Search Term Stripping

**Problem:** Search URLs contained brand names, making searches too specific (e.g., "Lululemon Define Jacket" instead of "Define Jacket").

**Solution:** Added `STORE_BRAND_NAMES` map in `affiliates.ts` and `extractSearchTerms()` function that removes brand names from product titles before building search URLs.

**File:** `src/lib/affiliates.ts` (lines ~15-45)

### 3. Navigation Audit & Fixes

**Fixed:**
- Category breadcrumbs: `Home > Stores > Category` → `Home > Categories > Category`
- Footer link: `/canadian` → `/stores?filter=canadian`
- Deal page breadcrumbs: Fixed store slug generation, added category link
- Header: Added "Categories" nav item, split from "Stores & Categories"
- Created `/categories` listing page

**Files:**
- `src/app/category/[slug]/page.tsx` - Fixed breadcrumbs
- `src/app/categories/page.tsx` - NEW listing page
- `src/components/Header.tsx` - Added Categories nav
- `src/components/Footer.tsx` - Fixed Canadian link
- `src/lib/content-generator.ts` - Fixed `generateBreadcrumbs()`

### 4. Quick Fixes Applied

| Fix | File | Description |
|-----|------|-------------|
| Custom 404 | `src/app/not-found.tsx` | NEW - Branded 404 with nav links |
| Server redirect | `src/app/canadian/page.tsx` | Client → server redirect |
| Double query | `src/app/categories/page.tsx` | Removed redundant DB call |
| Canonical URLs | Multiple pages | Added to categories, deals, about, privacy, terms |
| OG images | `layout.tsx`, `deals/[slug]` | Updated refs to use `hero-desktop.png` |
| Accessibility | `Header.tsx` | aria-labels, sr-only, aria-expanded |

### 5. Store Slug Fixes

Fixed 6 fashion brand slugs in database to match `FASHION_BRANDS` config:
- `abercrombie` → `abercrombie-fitch`
- `crate-and-barrel` → `crate-barrel`
- `elf` → `elf-cosmetics`
- `merit` → `merit-beauty`
- `tarte` → `tarte-cosmetics`
- `tula` → `tula-skincare`

**Scripts:**
- `scripts/check-store-slugs.ts`
- `scripts/fix-store-slugs.ts`

### 6. Deal Card Behavior

**Change:** "Read More" button on deal cards now goes to store page (not affiliate) for affiliated retailers.

**Logic in `DealCard.tsx`:**
```typescript
const handleReadMoreClick = (e: React.MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
  if (effectiveAffiliateUrl && storeSlug) {
    window.location.href = `/stores/${storeSlug}`  // Affiliated → store page
  } else {
    window.location.href = `/deals/${slug}`  // Non-affiliated → deal page
  }
}
```

**Result:**
- Card click → Affiliate URL (with cookie + search redirect)
- "Read More" button → Store page (`/stores/{slug}`)

---

## Site Architecture

### Routes
```
/                           Homepage (shuffled deals, featured stores)
├── /deals                  All deals listing
│   └── /deals/[slug]       Individual deal page
├── /stores                 Store directory (filterable)
│   └── /stores/[slug]      Individual store page
├── /categories             Category listing (NEW)
│   └── /category/[slug]    Category deals page
├── /search                 Search results
├── /canadian               → Redirects to /stores?filter=canadian
├── /admin                  Admin panel (LTK priority, category filters)
├── /about, /privacy, /terms
└── /api/go                 Affiliate redirect wrapper
```

### Key Components
- `DealCard.tsx` - Universal deal card (regular + Flipp variants)
- `Header.tsx` - Sticky header with search, hamburger nav
- `Footer.tsx` - Store links, Canadian brands CTA
- `StatsBar.tsx` - Deal/store count display
- `Breadcrumbs.tsx` - Navigation breadcrumbs
- `FilterSidebar.tsx` - Deals page filters

### Data Flow
```
Database (PostgreSQL)
  ↓
lib/db.ts (queries)
  ↓
Server Components (fetch data)
  ↓
Client Components (render)
```

### Affiliate System
```
lib/affiliates.ts
├── FASHION_BRANDS - Config for LTK-affiliated brands
├── STORE_BRAND_NAMES - Brand name → display name mapping
├── getAffiliateSearchUrl() - Builds search URL for store
├── getDealAffiliateUrl() - Main function for deal affiliate URLs
├── buildAffiliateRedirect() - Creates /api/go wrapper URL
└── extractSearchTerms() - Cleans product title for search
```

---

## Known Issues / Technical Debt

### High Priority
1. **Type assertions everywhere** - Many `(deal as any)` throughout codebase. Deal types need consolidation.
2. **No error boundary** - Missing `error.tsx` for graceful error handling
3. **Orphaned routes** - `/canadian/brand/*`, `/canadian/categories` may be dead

### Medium Priority
4. **No loading skeletons** - `/deals` and `/category` pages have no Suspense/skeleton
5. **OG image** - Using hero-desktop.png, should create dedicated 1200x630 OG image
6. **Button inconsistency** - Multiple button styles (btn-primary class vs inline styles)

### Low Priority
7. **Filter sidebar accessibility** - Missing role, keyboard nav
8. **Mobile sticky CTA** - May overflow on very small screens
9. **Store page OG** - Minimal Open Graph metadata

---

## Database Schema (Key Tables)

```sql
-- Deals
deals (
  id, slug, title, description,
  price, original_price, discount_percent,
  image_url, image_blob_url,
  affiliate_url, store, category,
  is_active, featured, date_added, date_updated
)

-- Stores
stores (
  id, slug, name, tagline, description,
  logo_url, website_url, affiliate_url, screenshot_url,
  is_canadian, badges[], top_categories[],
  return_policy, shipping_info, loyalty_program_name,
  price_match_policy
)
```

---

## Config Files

### Key Configs
- `src/lib/config.ts` - SITE_URL, REVALIDATE_INTERVAL, SOCIAL_LINKS, FEATURED_STORE_SLUGS
- `src/lib/categories.ts` - CATEGORIES, CORE_CATEGORIES, EXTENDED_CATEGORIES
- `src/lib/affiliates.ts` - FASHION_BRANDS, STORE_BRAND_NAMES, affiliate URL builders

### Environment Variables
```
POSTGRES_URL - Database connection
NEXT_PUBLIC_SITE_URL - https://shopcanada.cc
```

---

## Scripts

| Script | Purpose |
|--------|---------|
| `scripts/fix-store-slugs.ts` | Fix store slugs to match FASHION_BRANDS |
| `scripts/check-store-slugs.ts` | Verify store slugs in DB |
| `scripts/check-screenshots.ts` | Check store screenshot status |
| `scripts/audit-system.ts` | Audit affiliate URLs, search stripping, deal shuffle |

---

## Testing Checklist

Before deploying, verify:

- [ ] Deal card click → Opens affiliate URL (check /api/go redirect works)
- [ ] "Read More" button → Goes to store page for affiliated deals
- [ ] Search term stripping → Brand names removed from search URLs
- [ ] 404 page → Shows custom page with navigation
- [ ] /canadian → Server redirects to /stores?filter=canadian
- [ ] Categories page → Shows all categories with deal counts
- [ ] Breadcrumbs → Correct hierarchy on all pages
- [ ] Mobile nav → Hamburger menu works, aria-expanded toggles

---

## Next Steps / Recommendations

### Immediate
1. Run `npm run build` to verify no type errors
2. Test affiliate redirect flow on staging
3. Verify search term stripping with real LTK URLs

### Short Term
1. Create proper 1200x630 OG image
2. Add error.tsx boundary
3. Add Suspense boundaries with skeleton loaders
4. Clean up orphaned /canadian/* routes

### Medium Term
1. Consolidate Deal types (remove `as any` casts)
2. Unify button components
3. Add analytics tracking for affiliate clicks
4. Implement deal card A/B testing

---

## Useful Commands

```bash
# Development
npm run dev

# Build (check for errors)
npm run build

# Run scripts
npx tsx scripts/check-store-slugs.ts
npx tsx scripts/fix-store-slugs.ts

# Database (if needed)
# Scripts use POSTGRES_URL from .env.local
```

---

## Contact / Resources

- **Site:** https://shopcanada.cc
- **Admin:** /admin (LTK priority, category filters)
- **Git:** Main branch is `main`

---

*This document was generated to help the next agent understand the current state of the project and continue development efficiently.*
