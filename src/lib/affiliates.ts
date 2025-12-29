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
// RETAILER SEARCH URLS
// Direct search URLs for stores without affiliate programs
// =============================================================================

export const RETAILER_SEARCH_URLS: Record<string, string> = {
  // Grocery
  'costco': 'https://www.costco.ca/CatalogSearch?keyword=',
  'no-frills': 'https://www.nofrills.ca/search?search-bar=',
  'superstore': 'https://www.realcanadiansuperstore.ca/search?search-bar=',
  'real-canadian-superstore': 'https://www.realcanadiansuperstore.ca/search?search-bar=',
  'loblaws': 'https://www.loblaws.ca/search?search-bar=',
  'metro': 'https://www.metro.ca/en/online-grocery/search?filter=',
  'food-basics': 'https://www.foodbasics.ca/search?filter=',
  'freshco': 'https://www.freshco.com/search?q=',
  'sobeys': 'https://www.sobeys.com/en/search/?q=',
  'safeway': 'https://www.safeway.ca/search?q=',
  'save-on-foods': 'https://www.saveonfoods.com/search?q=',
  'iga': 'https://www.iga.net/en/search?q=',
  'maxi': 'https://www.maxi.ca/search?search-bar=',
  'provigo': 'https://www.provigo.ca/search?search-bar=',
  'super-c': 'https://www.superc.ca/search?search-bar=',
  'wholesale-club': 'https://www.wholesaleclub.ca/search?search-bar=',
  'giant-tiger': 'https://www.gianttiger.com/search?q=',

  // Big Box / General
  'walmart': 'https://www.walmart.ca/search?q=',
  'amazon': 'https://www.amazon.ca/s?k=',
  'amazon-ca': 'https://www.amazon.ca/s?k=',
  'canadian-tire': 'https://www.canadiantire.ca/en/search.html?q=',
  'dollarama': 'https://www.dollarama.com/en-CA/search?q=',

  // Electronics
  'best-buy': 'https://www.bestbuy.ca/en-ca/search?search=',
  'the-source': 'https://www.thesource.ca/en-ca/search?text=',
  'staples': 'https://www.staples.ca/search?query=',
  'dell': 'https://www.dell.com/en-ca/search/laptop?p=1&q=',
  'lenovo': 'https://www.lenovo.com/ca/en/search?text=',
  'newegg': 'https://www.newegg.ca/p/pl?d=',
  'memory-express': 'https://www.memoryexpress.com/Search/Products?Search=',
  'canada-computers': 'https://www.canadacomputers.com/search.php?search=',
  'apple': 'https://www.apple.com/ca/shop/search/',
  'microsoft': 'https://www.microsoft.com/en-ca/search?q=',
  'samsung': 'https://www.samsung.com/ca/search/?searchvalue=',
  'visions': 'https://www.visions.ca/Catalogue/Search?keywords=',

  // Home Improvement
  'home-depot': 'https://www.homedepot.ca/search?q=',
  'rona': 'https://www.rona.ca/en/search?q=',
  'home-hardware': 'https://www.homehardware.ca/en/search?q=',
  'princess-auto': 'https://www.princessauto.com/search?q=',
  'lee-valley': 'https://www.leevalley.com/en-ca/search#q=',
  'structube': 'https://www.structube.com/en_ca/catalogsearch/result/?q=',
  'ikea': 'https://www.ikea.com/ca/en/search/?q=',

  // Furniture
  'the-brick': 'https://www.thebrick.com/search?q=',
  'leons': 'https://www.leons.ca/search?q=',
  'wayfair': 'https://www.wayfair.ca/keyword.html?keyword=',
  'sleep-country': 'https://www.sleepcountry.ca/search?q=',

  // Fashion / Department
  'the-bay': 'https://www.thebay.com/search?q=',
  'hudsons-bay': 'https://www.thebay.com/search?q=',
  'hudson-s-bay': 'https://www.thebay.com/search?q=',
  'simons': 'https://www.simons.ca/en/search?q=',
  'old-navy': 'https://oldnavy.gapcanada.ca/browse/search.do?searchText=',
  'gap': 'https://www.gapcanada.ca/browse/search.do?searchText=',
  'h-m': 'https://www2.hm.com/en_ca/search-results.html?q=',
  'zara': 'https://www.zara.com/ca/en/search?searchTerm=',
  'uniqlo': 'https://www.uniqlo.com/ca/en/search?q=',

  // Sports / Outdoors
  'sport-chek': 'https://www.sportchek.ca/search.html?q=',
  'sportchek': 'https://www.sportchek.ca/search.html?q=',
  'marks': 'https://www.marks.com/en/search.html?q=',
  'atmosphere': 'https://www.atmosphere.ca/search.html?q=',
  'mec': 'https://www.mec.ca/en/search?text=',
  'sail': 'https://www.sail.ca/en/catalogsearch/result/?q=',

  // Pharmacy / Health
  'shoppers': 'https://shop.shoppersdrugmart.ca/Shop/Search?q=',
  'shoppers-drug-mart': 'https://shop.shoppersdrugmart.ca/Shop/Search?q=',
  'rexall': 'https://www.rexall.ca/search?q=',
  'london-drugs': 'https://www.londondrugs.com/search/?q=',

  // Pets
  'petsmart': 'https://www.petsmart.ca/search/?q=',
  'pet-valu': 'https://www.petvalu.ca/search?q=',

  // Books / Toys
  'indigo': 'https://www.indigo.ca/en-ca/search/?q=',
  'toys-r-us': 'https://www.toysrus.ca/en/toysrus/search?q=',
  'michaels': 'https://canada.michaels.com/en/search?q=',
  'eb-games': 'https://www.ebgames.ca/SearchResult/QuickSearch?q=',
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
 * Priority: Rakuten affiliate > Direct retailer search URL
 */
export function getAffiliateSearchUrl(storeSlug: string | null, productTitle: string): string | null {
  if (!storeSlug) return null

  // Try Rakuten (affiliate)
  const rakutenUrl = buildRakutenDeepLink(storeSlug, productTitle)
  if (rakutenUrl) return rakutenUrl

  // Try direct retailer search URL
  const searchUrl = RETAILER_SEARCH_URLS[storeSlug]
  if (searchUrl) {
    const bypassParam = COOKIE_BYPASS_PARAMS[storeSlug] || ''
    return `${searchUrl}${encodeURIComponent(productTitle)}${bypassParam}`
  }

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
