/**
 * Affiliate Links Configuration
 *
 * Utility functions for building affiliate URLs.
 * Store-specific data (search URLs, affiliate URLs) is now stored in the database.
 */

// =============================================================================
// AMAZON AFFILIATE CONFIG
// =============================================================================

// PromoPenguin Amazon Associates tag
export const AMAZON_AFFILIATE_TAG = 'promopenguin-20'

/**
 * Clean an Amazon URL and replace any existing affiliate tag with ours
 */
export function cleanAmazonUrl(url: string): string {
  if (!url) return url

  // Check if it's an Amazon URL
  if (!url.includes('amazon.ca') && !url.includes('amazon.com') && !url.includes('amzn.')) {
    return url
  }

  try {
    const urlObj = new URL(url)

    // Remove any existing tag parameter
    urlObj.searchParams.delete('tag')

    // Add our affiliate tag
    urlObj.searchParams.set('tag', AMAZON_AFFILIATE_TAG)

    return urlObj.toString()
  } catch {
    // If URL parsing fails, try simple regex replacement
    // Remove existing tag parameter
    let cleanUrl = url.replace(/[?&]tag=[^&]+/gi, '')

    // Add our tag
    const separator = cleanUrl.includes('?') ? '&' : '?'
    return `${cleanUrl}${separator}tag=${AMAZON_AFFILIATE_TAG}`
  }
}

// =============================================================================
// RAKUTEN CONFIG
// =============================================================================

// Your Rakuten publisher ID (constant across all merchants)
export const RAKUTEN_PUBLISHER_ID = 'sUVpAjRtGL4'

// Rakuten merchant configs: { mid, searchPath }
interface RakutenMerchant {
  mid: string           // Merchant ID from Rakuten dashboard
  domain: string        // Merchant's website domain
  searchPath: string    // Path to search page with query param
}

export const RAKUTEN_MERCHANTS: Record<string, RakutenMerchant> = {
  'bass-pro': {
    mid: '50435',  // Bass Pro Shops & Cabela's Canada
    domain: 'https://www.basspro.com',
    searchPath: '/shop/en/bps/search?q=',
  },
  'cabelas': {
    mid: '50435',  // Same merchant ID as Bass Pro
    domain: 'https://www.cabelas.ca',
    searchPath: '/search?q=',
  },
}

/**
 * Build Rakuten deep link with search query
 */
export function buildRakutenDeepLink(merchantSlug: string, searchQuery: string): string | null {
  const merchant = RAKUTEN_MERCHANTS[merchantSlug]
  if (!merchant) return null

  const targetUrl = `${merchant.domain}${merchant.searchPath}${encodeURIComponent(searchQuery)}`
  const encodedUrl = encodeURIComponent(targetUrl)

  return `https://click.linksynergy.com/deeplink?id=${RAKUTEN_PUBLISHER_ID}&mid=${merchant.mid}&murl=${encodedUrl}`
}

// =============================================================================
// COOKIE BYPASS PARAMS
// Append after search query for sites with known cookie consent popups
// =============================================================================

export const COOKIE_BYPASS_PARAMS: Record<string, string> = {
  'metro': '&cookieConsent=accepted',
  'sobeys': '&privacy_policy_accepted=true',
  'safeway': '&privacy_policy_accepted=true',
  'ikea': '&irclickid=bypass',
  'the-bay': '&site_preference=desktop',
  'hudsons-bay': '&site_preference=desktop',
  'sport-chek': '&consent=1',
  'marks': '&consent=1',
}

// =============================================================================
// UNIFIED API
// =============================================================================

/**
 * Get affiliate link for a store (base URL without search)
 * Now only supports Rakuten merchants - other stores should use affiliate_url from DB
 */
export function getStoreAffiliateLink(storeSlug: string | null): string | null {
  if (!storeSlug) return null

  // Check Rakuten (return base link to homepage)
  const rakutenMerchant = RAKUTEN_MERCHANTS[storeSlug]
  if (rakutenMerchant) {
    const encodedUrl = encodeURIComponent(rakutenMerchant.domain)
    return `https://click.linksynergy.com/deeplink?id=${RAKUTEN_PUBLISHER_ID}&mid=${rakutenMerchant.mid}&murl=${encodedUrl}`
  }

  return null
}

/**
 * Build affiliate search URL from a base search URL and product title
 * @param searchUrl - The base search URL from DB (e.g., "https://www.amazon.ca/s?k=")
 * @param productTitle - The product to search for
 * @param storeSlug - Optional store slug for cookie bypass params
 */
export function buildAffiliateSearchUrl(
  searchUrl: string,
  productTitle: string,
  storeSlug?: string | null
): string {
  const bypassParam = storeSlug ? (COOKIE_BYPASS_PARAMS[storeSlug] || '') : ''
  return `${searchUrl}${encodeURIComponent(productTitle)}${bypassParam}`
}

/**
 * Get affiliate link with product search query appended
 * Uses Rakuten for supported merchants, otherwise returns null
 * For other stores, use buildAffiliateSearchUrl with the store's search URL from DB
 */
export function getAffiliateSearchUrl(storeSlug: string | null, productTitle: string): string | null {
  if (!storeSlug) return null

  // Try Rakuten (affiliate)
  const rakutenUrl = buildRakutenDeepLink(storeSlug, productTitle)
  if (rakutenUrl) return rakutenUrl

  return null
}

/**
 * Get the best affiliate URL for a deal:
 * 1. Use deal's affiliate_url if it exists (cleaned for Amazon)
 * 2. Fall back to store affiliate link + product search (Rakuten only)
 * 3. Return null if no affiliate available
 */
export function getDealAffiliateUrl(
  dealAffiliateUrl: string | null | undefined,
  storeSlug: string | null,
  productTitle: string
): string | null {
  // If deal has its own affiliate URL, use that (but clean Amazon URLs)
  if (dealAffiliateUrl) {
    return cleanAmazonUrl(dealAffiliateUrl)
  }

  // Otherwise, try to build one from Rakuten affiliate
  return getAffiliateSearchUrl(storeSlug, productTitle)
}

/**
 * Check if a store has a Rakuten affiliate link
 */
export function hasStoreAffiliate(storeSlug: string | null): boolean {
  if (!storeSlug) return false
  return storeSlug in RAKUTEN_MERCHANTS
}

/**
 * Get list of all Rakuten affiliate store slugs
 */
export function getAffiliateStores(): string[] {
  return Object.keys(RAKUTEN_MERCHANTS)
}

// =============================================================================
// AFFILIATE BRAND TYPE (for components that need it)
// =============================================================================

export interface AffiliateBrand {
  name: string
  slug: string
  emoji: string
  tagline: string
  description: string
  color: string        // Tailwind gradient classes
  bgColor: string      // Light background for chips
  textColor: string    // Text color for chips
  image?: string       // Primary image for the brand
}
