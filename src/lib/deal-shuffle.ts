/**
 * Deal Shuffle System
 *
 * Provides balanced content distribution with:
 * - 25% Flipp/RFD-style sale deals
 * - 20% Amazon deals (maximum)
 * - 55% other deals from various sources
 * - Random shuffling that changes every 15 minutes
 */

import { Deal, MixedDeal } from '@/types/deal'
import { seededRandom, shuffleArray } from '@/lib/utils/interval'
import { searchFlippDeals, FlippDeal } from '@/lib/flipp'
import { getDeals, getLatestDeals, getFeaturedDeals } from '@/lib/db'

export interface ShuffledDeals {
  deals: MixedDeal[]
  distribution: {
    total: number
    flipp: number
    amazon: number
    other: number
  }
}



/**
 * Transform FlippDeal to match Deal interface for consistency
 */
function normalizeFlippDeal(flippDeal: FlippDeal): MixedDeal {
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
 */
export async function getShuffledDeals(
  limit: number = 24,
  forceRefresh: boolean = false
): Promise<ShuffledDeals> {
  // Always use a unique seed so each ISR rebuild gets a fresh shuffle
  const seed = Date.now() + Math.floor(Math.random() * 100000)

  // Calculate target distribution
  const targetFlipp = Math.max(Math.floor(limit * 0.25), 2) // 25% Flipp/RFD-style
  const maxAmazon = Math.floor(limit * 0.20) // Maximum 20% Amazon

  try {
    // Fetch a large random sample from the DB so each revalidation pulls different deals
    const poolSize = Math.max(limit * 12, 200)
    const [dbDeals, flippDeals] = await Promise.all([
      getDeals({ limit: poolSize, orderBy: 'random' }),
      searchFlippDeals('sale', Math.min(targetFlipp * 3, 50)),
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

    // Select Flipp deals
    const selectedFlipp = shuffleArray(flippDeals.slice(0, targetFlipp * 2), seed)
      .slice(0, targetFlipp)
      .map(normalizeFlippDeal)

    // Select Amazon deals (max 20%)
    const selectedAmazon = shuffleArray(amazonDeals, seed)
      .slice(0, Math.min(maxAmazon, amazonDeals.length))

    // Fill remaining slots with other deals
    const remainingSlots = limit - selectedFlipp.length - selectedAmazon.length
    const selectedOther = shuffleArray(otherDeals, seed)
      .slice(0, Math.max(0, remainingSlots))

    // Combine and shuffle all selected deals
    const allSelected: MixedDeal[] = [
      ...selectedFlipp,
      ...selectedAmazon.map(deal => ({ ...deal, source: 'database' as const })),
      ...selectedOther.map(deal => ({ ...deal, source: 'database' as const }))
    ]

    const finalDeals = shuffleArray(allSelected, seed + 1000) // Different seed for final shuffle
      .slice(0, limit)

    return {
      deals: finalDeals,
      distribution: {
        total: finalDeals.length,
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
      deals: shuffled.map(deal => ({ ...deal, source: 'database' as const })),
      distribution: {
        total: shuffled.length,
        flipp: 0,
        amazon: amazonCount,
        other: shuffled.length - amazonCount
      }
    }
  }
}

/**
 * Get shuffled featured deals for homepage
 */
export async function getShuffledFeaturedDeals(
  limit: number = 8
): Promise<ShuffledDeals> {
  const seed = Date.now() + Math.floor(Math.random() * 100000)

  try {
    const featuredPoolSize = Math.max(limit * 10, 80)
    const [featuredDeals, flippDeals] = await Promise.all([
      getFeaturedDeals(featuredPoolSize, true),
      searchFlippDeals('featured', Math.min(Math.floor(limit * 0.25), 10)),
    ])

    // Add some Flipp deals to featured mix (up to 25%)
    const flippToAdd = Math.min(Math.floor(limit * 0.25), flippDeals.length)
    const selectedFlipp = shuffleArray(flippDeals, seed)
      .slice(0, flippToAdd)
      .map(normalizeFlippDeal)

    const combined: MixedDeal[] = [
      ...featuredDeals.map(deal => ({ ...deal, source: 'database' as const })),
      ...selectedFlipp
    ]

    const shuffled = shuffleArray(combined, seed).slice(0, limit)

    const amazonCount = shuffled.filter(deal =>
      deal.store?.toLowerCase().includes('amazon') ||
      deal.affiliate_url?.includes('amazon.ca')
    ).length

    return {
      deals: shuffled,
      distribution: {
        total: shuffled.length,
        flipp: selectedFlipp.length,
        amazon: amazonCount,
        other: shuffled.length - selectedFlipp.length - amazonCount
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
      deals: shuffled.map(deal => ({ ...deal, source: 'database' as const })),
      distribution: {
        total: shuffled.length,
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
  const flippPercent = Math.round((distribution.flipp / distribution.total) * 100)
  const amazonPercent = Math.round((distribution.amazon / distribution.total) * 100)
  const otherPercent = Math.round((distribution.other / distribution.total) * 100)

  return `${distribution.total} deals: ${distribution.flipp} Flipp (${flippPercent}%), ${distribution.amazon} Amazon (${amazonPercent}%), ${distribution.other} Other (${otherPercent}%)`
}
