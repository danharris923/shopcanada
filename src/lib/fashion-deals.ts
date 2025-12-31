/**
 * Fashion Deal Generation Service
 *
 * This service generates synthetic fashion deal cards from local brand images.
 * Cards rotate every 15 minutes to match the site's shuffle timing.
 *
 * Usage in deal-shuffle.ts:
 *   import { getFashionDeals, getTopTierFashionDeals } from './fashion-deals'
 *   const fashionDeals = await getFashionDeals()
 *   const topTierDeals = await getTopTierFashionDeals()
 */

import { Deal } from '@/types/deal'
import {
  FASHION_BRANDS,
  FashionBrand,
  generateFashionDeal,
  getTopTierBrands,
  getStandardBrands,
} from './fashion-brands'

// =============================================================================
// IMAGE PATH CONFIGURATION
// Images are served from public/images/fashion/{brand}/
// Sync images using: npx ts-node scripts/sync-fashion-images.ts
// =============================================================================

/**
 * Get list of image files for a brand
 * In production (Vercel): Uses pre-generated manifest or fallback
 * In development: Can scan filesystem
 */
function getBrandImageFiles(brand: FashionBrand): string[] {
  // For now, use expected filenames based on typical image counts
  // Images are synced from source folder with normalized names
  return generateExpectedImageFiles(brand.folder)
}

/**
 * Generate expected image filenames
 * Matches the naming convention from the source images
 * Format: {original_folder}_{num}_{hash}.jpg (lowercase)
 */
function generateExpectedImageFiles(folder: string): string[] {
  // Map normalized folder names back to original naming patterns
  const folderPatterns: Record<string, string> = {
    'lululemon': 'lululemon',
    'foot-locker': 'footlocker',
    'aldo': 'aldo',
    'new-balance': 'new_balance',
    'simons': 'simons',
    'abercrombie-fitch': 'abercrombie_fitch',
    'aerie': 'aerie',
    'alo-yoga': 'alo_yoga',
    'american-eagle': 'american_eagle',
    'anthropologie': 'anthropologie',
    'birkenstock': 'birkenstock',
    'brooklinen': 'brooklinen',
    'cb2': 'cb2',
    'charlotte-tilbury': 'charlotte_tilbury',
    'colleen-rothschild': 'colleen_rothschild',
    'cotton-on': 'cotton_on',
    'crate-barrel': 'crate_barrel',
    'dime-beauty': 'dime_beauty',
    'dyson': 'dyson',
    'elf-cosmetics': 'e.l.f._cosmetics',
    'free-people': 'free_people',
    'guess': 'guess',
    'lulus': 'lulus',
    'madewell': 'madewell',
    'merit-beauty': 'merit_beauty',
    'nasty-gal': 'nasty_gal',
    'pottery-barn': 'pottery_barn',
    'prettylittlething': 'prettylittlething',
    'princess-polly': 'princess_polly',
    'revolve': 'revolve',
    'shopbop': 'shopbop',
    'skims': 'skims',
    'steve-madden': 'steve_madden',
    'supergoop': 'supergoop',
    'tarte-cosmetics': 'tarte_cosmetics',
    'tula-skincare': 'tula_skincare',
    'ugg': 'ugg',
    'urban-outfitters': 'urban_outfitters',
    'vuori': 'vuori',
    'west-elm': 'west_elm',
  }

  const pattern = folderPatterns[folder] || folder.replace(/-/g, '_')

  // Generate 12 expected images per brand (most have 10-15)
  return Array.from({ length: 12 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0')
    // Use simple naming - actual files may have hash suffixes
    return `${pattern}_${num}.jpg`
  })
}

// =============================================================================
// IN-MEMORY CACHE
// Caches generated deals for 15 minutes (matches shuffle interval)
// =============================================================================

interface DealCache {
  deals: Deal[]
  timestamp: number
  interval: number
}

let dealCache: DealCache | null = null

/**
 * Get the current 15-minute interval (for cache invalidation)
 */
function getCurrentInterval(): number {
  const now = new Date()
  const minutes = now.getHours() * 60 + now.getMinutes()
  return Math.floor(minutes / 15)
}

/**
 * Check if cache is valid (same 15-minute interval)
 */
function isCacheValid(): boolean {
  if (!dealCache) return false
  return dealCache.interval === getCurrentInterval()
}

// =============================================================================
// DEAL GENERATION
// =============================================================================

/**
 * Generate all fashion deals from brand images
 * Returns deals for ALL brands (top tier + standard)
 */
export async function getFashionDeals(): Promise<Deal[]> {
  // Return cached deals if still valid
  if (isCacheValid() && dealCache) {
    return dealCache.deals
  }

  const deals: Deal[] = []

  for (let i = 0; i < FASHION_BRANDS.length; i++) {
    const brand = FASHION_BRANDS[i]
    const images = getBrandImageFiles(brand)

    if (images.length > 0) {
      const deal = generateFashionDeal(brand, i, images)
      deals.push(deal)
    }
  }

  // Update cache
  dealCache = {
    deals,
    timestamp: Date.now(),
    interval: getCurrentInterval(),
  }

  return deals
}

/**
 * Get only top-tier fashion deals (for page 1 priority)
 * These brands should always have representation on first page load
 */
export async function getTopTierFashionDeals(): Promise<Deal[]> {
  const allDeals = await getFashionDeals()
  const topTierSlugs = new Set(getTopTierBrands().map(b => b.slug))

  return allDeals.filter(deal => {
    // Extract brand slug from deal ID (format: fashion-{slug}-{interval})
    const match = deal.id.match(/^fashion-(.+)-\d+$/)
    if (!match) return false
    return topTierSlugs.has(match[1])
  })
}

/**
 * Get standard-tier fashion deals (for regular rotation)
 */
export async function getStandardFashionDeals(): Promise<Deal[]> {
  const allDeals = await getFashionDeals()
  const topTierSlugs = new Set(getTopTierBrands().map(b => b.slug))

  return allDeals.filter(deal => {
    const match = deal.id.match(/^fashion-(.+)-\d+$/)
    if (!match) return false
    return !topTierSlugs.has(match[1])
  })
}

/**
 * Get fashion deals by category
 */
export async function getFashionDealsByCategory(category: string): Promise<Deal[]> {
  const allDeals = await getFashionDeals()
  return allDeals.filter(deal => deal.category === category)
}

// =============================================================================
// STATIC EXPORT: Pre-generate deals for build time
// =============================================================================

/**
 * Pre-generate fashion deals for static build
 * Use this in getStaticProps or generateStaticParams
 */
export function getStaticFashionDeals(): Deal[] {
  const deals: Deal[] = []

  for (let i = 0; i < FASHION_BRANDS.length; i++) {
    const brand = FASHION_BRANDS[i]
    // Use fallback image list for static generation
    const images = generateExpectedImageFiles(brand.folder)
    const deal = generateFashionDeal(brand, i, images)
    deals.push(deal)
  }

  return deals
}

// =============================================================================
// INTEGRATION HELPERS
// =============================================================================

/**
 * Check if a deal is a fashion affiliate deal
 */
export function isFashionDeal(deal: Deal): boolean {
  return deal.id.startsWith('fashion-')
}

/**
 * Get the brand slug from a fashion deal ID
 */
export function getBrandSlugFromDeal(deal: Deal): string | null {
  const match = deal.id.match(/^fashion-(.+)-\d+$/)
  return match ? match[1] : null
}

/**
 * Get brand configuration for a fashion deal
 */
export function getBrandForDeal(deal: Deal): FashionBrand | null {
  const slug = getBrandSlugFromDeal(deal)
  if (!slug) return null
  return FASHION_BRANDS.find(b => b.slug === slug) || null
}
