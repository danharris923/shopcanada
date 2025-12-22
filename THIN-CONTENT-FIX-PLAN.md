# Thin Content Fix Plan: Canadian Brands Directory

## The Problem

Shop Canada has **600+ brand pages** that Google may see as "thin content" because:

1. **Short descriptions** - Most brands only have 1-2 sentence descriptions
2. **Generic boilerplate** - Every page has identical "Why Choose {brand}?" text
3. **No unique content** - `brandStory` field is empty for most brands
4. **Duplicate structure** - All pages look nearly identical to Google

### Example of Current Thin Content

```typescript
// Current brand data (THIN)
{
  slug: "roots",
  name: "Roots",
  category: "Clothing",
  url: "https://www.roots.com",
  description: "Roots is a Canadian brand known for quality leather goods and casual wear."
  // brandStory: undefined  <-- EMPTY!
  // affiliateProducts: undefined  <-- EMPTY!
}
```

**Page renders:**
- 1 sentence description
- Generic "represents the best of Canadian clothing" boilerplate
- Same template as 599 other brands

---

## The Solution

Scrape each brand's website for unique "About Us" content and populate the `brandStory` field.

### Target Data to Scrape

| Field | Source | Example |
|-------|--------|---------|
| Founding story | /about, /about-us, /our-story | "Founded in 1973 by Michael Budman..." |
| Mission statement | About page | "At Roots, being Canadian isn't just part of our story" |
| Company values | About page | "Quality, craftsmanship, community" |
| Key facts | About page | "115 locations across Canada, 2000+ employees" |
| Founder info | About page | Names, background, inspiration |

### Example of Enriched Content

```typescript
// After scraping (RICH)
{
  slug: "roots",
  name: "Roots",
  category: "Clothing",
  url: "https://www.roots.com",
  description: "Roots is a Canadian brand known for quality leather goods and casual wear.",
  brandStory: `
## Founding & Heritage
Roots was established in 1973 by Michael Budman and Don Green, who met at Camp Tamakwa
in Algonquin Park. Their shared love of Canada inspired them to create the brand. The
company launched with the innovative "Sport Root Shoe" featuring a negative heel design.

## Core Mission
"At Roots, being Canadian isn't just part of our story—it's who we are." The brand
emphasizes connection to nature, Canadian heritage, and community commitment.

## Key Values & Craftsmanship
The company prioritizes quality and handcrafted excellence. Karl Kowalewski, VP of
Leather Product Development: "My father instilled in us the importance of quality
and ethics. He taught us that there are no shortcuts."

## Growth & Presence
What began as a single Toronto storefront has expanded to 115 locations across Canada
and 100+ internationally, with over 2,000 Canadian employees.
  `
}
```

---

## Implementation Plan

### Phase 1: Create Scraper Script

**File:** `scripts/scrape-brand-stories.ts`

```typescript
// Scraper structure
interface ScrapedBrand {
  slug: string;
  name: string;
  url: string;
  brandStory: string | null;
  scrapedFrom: string | null;
  error: string | null;
}

// URL patterns to try for each brand
const ABOUT_PAGE_PATTERNS = [
  '/about',
  '/about-us',
  '/our-story',
  '/company',
  '/about/our-story',
  '/pages/about',
  '/pages/about-us',
  '/en/about',
  '/en/about-us',
  '/#about',
];

// Main scraping function
async function scrapeBrandStory(brand: Brand): Promise<ScrapedBrand> {
  for (const pattern of ABOUT_PAGE_PATTERNS) {
    const url = new URL(pattern, brand.url).toString();
    try {
      const content = await fetchAndExtract(url);
      if (content && content.length > 200) {
        return {
          slug: brand.slug,
          name: brand.name,
          url: brand.url,
          brandStory: formatBrandStory(content),
          scrapedFrom: url,
          error: null
        };
      }
    } catch (e) {
      continue; // Try next pattern
    }
  }
  return { ...brand, brandStory: null, error: 'No about page found' };
}
```

### Phase 2: Content Extraction Logic

```typescript
// Extract meaningful content from HTML
function extractAboutContent(html: string): string {
  // Target elements that typically contain about content
  const selectors = [
    'main article',
    '.about-content',
    '.our-story',
    '[class*="about"]',
    '[class*="story"]',
    '.content-wrapper',
    'article',
  ];

  // Clean and format extracted text
  // Remove navigation, footers, scripts
  // Keep paragraphs, headings, lists
  // Limit to ~500-1000 words
}

// Format into brandStory markdown
function formatBrandStory(rawContent: string): string {
  // Add section headers based on content
  // ## Our Story / ## Mission / ## Values
  // Clean up formatting
  // Ensure proper markdown structure
}
```

### Phase 3: Rate Limiting & Error Handling

```typescript
// Configuration
const CONFIG = {
  delayBetweenRequests: 2000,  // 2 seconds between requests
  maxRetries: 2,
  timeout: 10000,  // 10 second timeout
  batchSize: 50,   // Save progress every 50 brands
  userAgent: 'ShopCanada Bot (content enrichment)',
};

// Progress tracking
interface Progress {
  completed: string[];
  failed: string[];
  lastProcessed: string;
}

// Save progress to resume if interrupted
function saveProgress(progress: Progress) {
  fs.writeFileSync('scrape-progress.json', JSON.stringify(progress, null, 2));
}
```

### Phase 4: Output & Integration

```typescript
// Output enriched brands to new file
function outputEnrichedBrands(brands: ScrapedBrand[]) {
  // Write to brands-data-enriched.ts
  // Include success rate stats
  // List failed brands for manual review
}

// Integration with existing data
function mergeWithExisting(existing: Brand[], scraped: ScrapedBrand[]): Brand[] {
  return existing.map(brand => {
    const enriched = scraped.find(s => s.slug === brand.slug);
    if (enriched?.brandStory) {
      return { ...brand, brandStory: enriched.brandStory };
    }
    return brand;
  });
}
```

---

## File Structure

```
shopcanada/
├── scripts/
│   ├── scrape-brand-stories.ts    # Main scraper script
│   ├── scrape-progress.json       # Progress tracking (auto-generated)
│   └── scrape-results.json        # Raw results (auto-generated)
├── src/lib/
│   ├── brands-data.ts             # Original (backup)
│   └── brands-data-enriched.ts    # New enriched version
└── THIN-CONTENT-FIX-PLAN.md       # This document
```

---

## Expected Results

| Metric | Before | After |
|--------|--------|-------|
| Avg words per page | ~150 | ~500-800 |
| Unique content | 10% | 70-80% |
| brandStory populated | ~20 brands | ~400-500 brands |
| SEO content score | Low | Medium-High |

### Success Criteria

- **60%+ brands** get scraped content (some sites will block/404)
- **Average 300+ words** of unique content per brand
- **No duplicate content** - each brandStory is unique
- **Proper formatting** - Markdown with headers, paragraphs

---

## Handling Failures

Some brands will fail to scrape. Fallback strategies:

### Tier 1: Auto-scraped (~60%)
- Successfully scraped from brand website
- High-quality unique content

### Tier 2: AI-generated (~20%)
- For brands that block scraping
- Use brand name + category to generate unique content
- Less ideal but better than nothing

### Tier 3: Enhanced template (~20%)
- For complete failures
- Generate slightly varied boilerplate using:
  - Category-specific content
  - Location (if known)
  - Product type variations

```typescript
// Tier 3 fallback template generator
function generateFallbackStory(brand: Brand): string {
  const templates = getCategoryTemplates(brand.category);
  const template = templates[hashString(brand.slug) % templates.length];
  return template
    .replace('{name}', brand.name)
    .replace('{category}', brand.category)
    .replace('{description}', brand.description);
}
```

---

## Commands to Run

```bash
# 1. Install dependencies (if needed)
cd D:\git\new-shopcanada\shopcanada
npm install cheerio node-fetch

# 2. Run the scraper
npx ts-node scripts/scrape-brand-stories.ts

# 3. Review results
cat scripts/scrape-results.json | head -100

# 4. Integrate enriched data
# (Manual step - review and merge)

# 5. Build and test
npm run build

# 6. Push changes
git add -A && git commit -m "Enrich 600+ brand pages with scraped content" && git push
```

---

## Alternative Approach: Use AI to Generate

If scraping proves too unreliable, alternative approach:

```typescript
// Use Claude/GPT to generate unique brand stories
async function generateBrandStory(brand: Brand): Promise<string> {
  const prompt = `
    Write a 200-300 word brand story for ${brand.name}, a Canadian ${brand.category} brand.
    Website: ${brand.url}
    Current description: ${brand.description}

    Include:
    - Founding story (make reasonable assumptions based on brand type)
    - What makes them Canadian
    - Their values and mission
    - Why customers love them

    Format in markdown with ## headers.
    Be specific but don't invent false facts.
  `;

  return await callAI(prompt);
}
```

**Pros:** 100% success rate, consistent quality
**Cons:** Not "real" content, potential accuracy issues

---

## SEO Impact Expected

| Improvement | Impact |
|-------------|--------|
| Unique content per page | HIGH - Google rewards uniqueness |
| More keywords naturally | MEDIUM - Better long-tail rankings |
| Lower bounce rate | MEDIUM - Users find value |
| Internal linking opportunities | LOW - More content to link to |
| Featured snippets potential | LOW - FAQ/story content |

---

## Next Steps

1. **Start new Claude session** with this plan
2. **Run scraper** on first 50 brands as test
3. **Review quality** of scraped content
4. **Adjust extraction logic** if needed
5. **Run full scrape** on 600+ brands
6. **Merge and deploy** enriched data

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/lib/brands-data.ts` | Current brand data (600+ brands) |
| `src/app/canadian/brand/[slug]/page.tsx` | Brand page template |
| `src/lib/content-generator.ts` | Existing content generation |
| `scripts/scrape-brand-stories.ts` | New scraper (to create) |

---

## Notes

- Some major brands (Aritzia, etc.) block scraping - will need fallback
- Rate limit to avoid IP bans
- Save progress frequently to resume if interrupted
- Manual review recommended for top 50 brands
- Consider caching scraped content for rebuilds
