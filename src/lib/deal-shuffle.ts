/**
 * Deal Shuffle System
 *
 * Provides balanced content distribution with:
 * - 15% Fashion affiliate deals (top tier brands get priority)
 * - 20% Flipp deals (minimum)
 * - 25% Amazon deals (maximum)
 * - 40% other deals from various sources
 * - Random shuffling that changes every 15 minutes
 */

import { Deal } from '@/types/deal'
import { searchFlippDeals, FlippDeal } from '@/lib/flipp'
import { getDeals, getLatestDeals, getFeaturedDeals } from '@/lib/db'
import { getFashionDeals, getTopTierFashionDeals, isFashionDeal } from '@/lib/fashion-deals'

export interface ShuffledDeals {
  deals: (Deal | FlippDeal)[]
  distribution: {
    total: number
    fashion: number
    flipp: number
    amazon: number
    other: number
  }
}

/**
 * Get time-based seed for 15-minute intervals
 */
function getTimeSeed(): number {
  const now = new Date()
  const minutes = now.getHours() * 60 + now.getMinutes()
  const intervalIndex = Math.floor(minutes / 15) // Changes every 15 minutes
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000)
  return dayOfYear * 96 + intervalIndex // 96 intervals per day
}

/**
 * Seeded random number generator
 */
function seededRandom(seed: number): () => number {
  let x = seed
  return () => {
    x = Math.sin(x) * 10000
    return x - Math.floor(x)
  }
}

/**
 * Fisher-Yates shuffle with seeded random
 */
function shuffleArray<T>(array: T[], seed: number): T[] {
  const shuffled = [...array]
  const random = seededRandom(seed)

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled
}

/**
 * Transform FlippDeal to match Deal interface for consistency
 */
function normalizeFlippDeal(flippDeal: FlippDeal): Deal & { source: 'flipp', storeSlug: string, storeLogo: string, validTo: string, saleStory: string | null } {
  return {
    id: flippDeal.id,
    title: flippDeal.title,
    slug: flippDeal.slug,
    image_url: flippDeal.imageUrl,
    image_blob_url: null,
    price: flippDeal.price,
    original_price: flippDeal.originalPrice,
    discount_percent: flippDeal.discountPercent,
    store: flippDeal.store,
    category: flippDeal.category,
    affiliate_url: '', // Flipp deals use getAffiliateSearchUrl
    featured: false,
    is_active: true,
    date_added: new Date().toISOString(),
    date_updated: new Date().toISOString(),
    description: null,
    source_url: null,
    source: 'flipp',
    // Include Flipp-specific fields for DealCard
    storeSlug: flippDeal.storeSlug,
    storeLogo: flippDeal.storeLogo,
    validTo: flippDeal.validTo,
    saleStory: flippDeal.saleStory
  }
}

/**
 * Get shuffled deals with balanced distribution
 * Now includes fashion affiliate deals with priority placement
 */
export async function getShuffledDeals(
  limit: number = 24,
  forceRefresh: boolean = false
): Promise<ShuffledDeals> {
  const seed = forceRefresh ? Date.now() : getTimeSeed()

  // Calculate target distribution
  const targetFashion = Math.max(Math.floor(limit * 0.15), 2) // 15% fashion, minimum 2
  const targetFlipp = Math.max(Math.floor(limit * 0.2), 1) // 20% Flipp
  const maxAmazon = Math.floor(limit * 0.25) // Maximum 25% Amazon

  try {
    // Fetch deals from different sources in parallel
    const [dbDeals, flippDeals, fashionDeals, topTierFashion] = await Promise.all([
      getDeals({ limit: limit * 2, orderBy: 'date_added', orderDir: 'DESC' }),
      searchFlippDeals('sale', Math.min(targetFlipp * 3, 50)),
      getFashionDeals(),
      getTopTierFashionDeals()
    ])

    // Categorize database deals
    const amazonDeals = dbDeals.filter(deal =>
      deal.store?.toLowerCase().includes('amazon') ||
      deal.affiliate_url?.includes('amazon.ca')
    )
    const otherDeals = dbDeals.filter(deal =>
      !deal.store?.toLowerCase().includes('amazon') &&
      !deal.affiliate_url?.includes('amazon.ca')
    )

    // Select fashion deals - prioritize top tier brands
    // Top tier brands (Lululemon, Foot Locker, Aldo, etc.) get guaranteed slots
    const topTierCount = Math.min(Math.ceil(targetFashion * 0.6), topTierFashion.length)
    const standardFashionCount = targetFashion - topTierCount
    const standardFashion = fashionDeals.filter(d => !topTierFashion.some(t => t.id === d.id))

    const selectedFashion = [
      ...shuffleArray(topTierFashion, seed).slice(0, topTierCount),
      ...shuffleArray(standardFashion, seed).slice(0, standardFashionCount)
    ].map(deal => ({ ...deal, source: 'fashion' }))

    // Select Flipp deals
    const selectedFlipp = shuffleArray(flippDeals.slice(0, targetFlipp * 2), seed)
      .slice(0, targetFlipp)
      .map(normalizeFlippDeal)

    // Select Amazon deals
    const selectedAmazon = shuffleArray(amazonDeals, seed)
      .slice(0, Math.min(maxAmazon, amazonDeals.length))

    // Fill remaining slots with other deals
    const remainingSlots = limit - selectedFashion.length - selectedFlipp.length - selectedAmazon.length
    const selectedOther = shuffleArray(otherDeals, seed)
      .slice(0, Math.max(0, remainingSlots))

    // Combine and shuffle all selected deals
    const allSelected: (Deal & { source?: string })[] = [
      ...selectedFashion,
      ...selectedFlipp,
      ...selectedAmazon.map(deal => ({ ...deal, source: 'database' })),
      ...selectedOther.map(deal => ({ ...deal, source: 'database' }))
    ]

    const finalDeals = shuffleArray(allSelected, seed + 1000) // Different seed for final shuffle
      .slice(0, limit)

    return {
      deals: finalDeals,
      distribution: {
        total: finalDeals.length,
        fashion: selectedFashion.length,
        flipp: selectedFlipp.length,
        amazon: selectedAmazon.length,
        other: selectedOther.length
      }
    }
  } catch (error) {
    // Error in getShuffledDeals - fallback to database deals only
    const fallbackDeals = await getDeals({ limit, orderBy: 'date_added', orderDir: 'DESC' })
    const shuffled = shuffleArray(fallbackDeals, seed)

    const amazonCount = shuffled.filter(deal =>
      deal.store?.toLowerCase().includes('amazon') ||
      deal.affiliate_url?.includes('amazon.ca')
    ).length

    return {
      deals: shuffled.map(deal => ({ ...deal, source: 'database' })),
      distribution: {
        total: shuffled.length,
        fashion: 0,
        flipp: 0,
        amazon: amazonCount,
        other: shuffled.length - amazonCount
      }
    }
  }
}

/**
 * Get shuffled featured deals for homepage
 * Includes top-tier fashion brands for visibility
 */
export async function getShuffledFeaturedDeals(
  limit: number = 8
): Promise<ShuffledDeals> {
  const seed = getTimeSeed()

  try {
    // Get featured deals, Flipp deals, and top-tier fashion
    const [featuredDeals, flippDeals, topTierFashion] = await Promise.all([
      getFeaturedDeals(limit),
      searchFlippDeals('featured', Math.min(Math.floor(limit * 0.25), 10)),
      getTopTierFashionDeals()
    ])

    // Add top-tier fashion deals (1-2 for featured section)
    const fashionToAdd = Math.min(2, topTierFashion.length)
    const selectedFashion = shuffleArray(topTierFashion, seed)
      .slice(0, fashionToAdd)
      .map(deal => ({ ...deal, source: 'fashion' }))

    // Add some Flipp deals to featured mix (up to 25%)
    const flippToAdd = Math.min(Math.floor(limit * 0.25), flippDeals.length)
    const selectedFlipp = shuffleArray(flippDeals, seed)
      .slice(0, flippToAdd)
      .map(normalizeFlippDeal)

    // Combine and limit
    const combined = [
      ...selectedFashion,
      ...featuredDeals.map(deal => ({ ...deal, source: 'database' })),
      ...selectedFlipp
    ]

    const shuffled = shuffleArray(combined, seed).slice(0, limit)

    const amazonCount = shuffled.filter(deal =>
      deal.store?.toLowerCase().includes('amazon') ||
      deal.affiliate_url?.includes('amazon.ca')
    ).length
    const fashionCount = shuffled.filter(deal => isFashionDeal(deal)).length

    return {
      deals: shuffled,
      distribution: {
        total: shuffled.length,
        fashion: fashionCount,
        flipp: selectedFlipp.length,
        amazon: amazonCount,
        other: shuffled.length - fashionCount - selectedFlipp.length - amazonCount
      }
    }
  } catch (error) {
    // Error in getShuffledFeaturedDeals - fallback to regular featured deals
    const fallbackDeals = await getFeaturedDeals(limit)
    const shuffled = shuffleArray(fallbackDeals, seed)

    const amazonCount = shuffled.filter(deal =>
      deal.store?.toLowerCase().includes('amazon') ||
      deal.affiliate_url?.includes('amazon.ca')
    ).length

    return {
      deals: shuffled.map(deal => ({ ...deal, source: 'database' })),
      distribution: {
        total: shuffled.length,
        fashion: 0,
        flipp: 0,
        amazon: amazonCount,
        other: shuffled.length - amazonCount
      }
    }
  }
}

/**
 * Get next shuffle time (next 15-minute interval)
 */
export function getNextShuffleTime(): Date {
  const now = new Date()
  const minutes = now.getMinutes()
  const nextInterval = Math.ceil((minutes + 1) / 15) * 15
  const nextTime = new Date(now)

  if (nextInterval >= 60) {
    nextTime.setHours(now.getHours() + 1, 0, 0, 0)
  } else {
    nextTime.setMinutes(nextInterval, 0, 0)
  }

  return nextTime
}

/**
 * Get distribution summary as string for logging
 */
export function getDistributionSummary(distribution: ShuffledDeals['distribution']): string {
  const fashionPercent = Math.round((distribution.fashion / distribution.total) * 100)
  const flippPercent = Math.round((distribution.flipp / distribution.total) * 100)
  const amazonPercent = Math.round((distribution.amazon / distribution.total) * 100)
  const otherPercent = Math.round((distribution.other / distribution.total) * 100)

  return `${distribution.total} deals: ${distribution.fashion} Fashion (${fashionPercent}%), ${distribution.flipp} Flipp (${flippPercent}%), ${distribution.amazon} Amazon (${amazonPercent}%), ${distribution.other} Other (${otherPercent}%)`
}