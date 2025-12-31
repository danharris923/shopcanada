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
  'home-hardware': 'https://www.homehardware.ca/en/search-results?q=',
  'princess-auto': 'https://www.princessauto.com/en/searchresults?Ntt=',
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

  // Canadian Fashion (former ShopStyle stores)
  'lululemon': 'https://shop.lululemon.com/search?Ntt=',
  'roots': 'https://www.roots.com/ca/en/search?q=',
  'aritzia': 'https://www.aritzia.com/en/search?q=',
  'ardene': 'https://www.ardene.com/ca/en/search?q=',
  'michael-kors': 'https://www.michaelkors.ca/search?q=',
  'sephora': 'https://www.sephora.ca/search?keyword=',
  'sperry': 'https://www.sperry.com/en-ca/search?q=',
  'joe-fresh': 'https://www.joefresh.com/ca/search?q=',

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

  // Flipp Grocery/Specialty Stores (unique aliases only - duplicates removed)
  'adonis': 'https://www.marchesadonis.com/en/search?q=',
  'marches-adonis': 'https://www.marchesadonis.com/en/search?q=',
  'starsky': 'https://www.starskydeli.com/',
  't-t-supermarket': 'https://www.tntsupermarket.com/search.html?keyword=',
  'tnt-supermarket': 'https://www.tntsupermarket.com/search.html?keyword=',
  'fortinos': 'https://www.fortinos.ca/search?search-bar=',
  'natures-emporium': 'https://www.naturesemporium.com/',
  "nature-s-emporium": 'https://www.naturesemporium.com/',
  'cabelas-bass-pro': 'https://www.cabelas.ca/search?q=',
  "cabela-s-bass-pro": 'https://www.cabelas.ca/search?q=',
  'm-m-food-market': 'https://www.mmfoodmarket.com/en/search?q=',
  'farm-boy': 'https://www.farmboy.ca/',
  'bulk-barn': 'https://www.bulkbarn.ca/',
  'your-independent-grocer': 'https://www.yourindependentgrocer.ca/search?search-bar=',
  'valumart': 'https://www.valumart.ca/search?search-bar=',
  'zehrs': 'https://www.zehrs.ca/search?search-bar=',
  'atlantic-superstore': 'https://www.atlanticsuperstore.ca/search?search-bar=',
  'dominion': 'https://www.dominion.ca/search?search-bar=',
  'extra-foods': 'https://www.extrafoods.ca/search?search-bar=',

  // Appliances
  'goemans-appliances': 'https://www.goemans.com/search?q=',
  'goemans': 'https://www.goemans.com/search?q=',

  // Fashion & Apparel (Affiliate Brands)
  'foot-locker': 'https://www.footlocker.ca/en/search?query=',
  'aldo': 'https://www.aldoshoes.com/ca/en/search?q=',
  'new-balance': 'https://www.newbalance.ca/en_ca/search?q=',
  'abercrombie-fitch': 'https://www.abercrombie.com/shop/search?searchTerm=',
  'aerie': 'https://www.ae.com/ca/en/c/aerie/cat1410002?q=',
  'alo-yoga': 'https://www.aloyoga.com/search?q=',
  'american-eagle': 'https://www.ae.com/ca/en/search?q=',
  'anthropologie': 'https://www.anthropologie.com/search?q=',
  'birkenstock': 'https://www.birkenstock.com/ca/search?q=',
  'brooklinen': 'https://www.brooklinen.com/search?q=',
  'cb2': 'https://www.cb2.ca/search?query=',
  'cotton-on': 'https://cottonon.com/CA/search/?q=',
  'crate-barrel': 'https://www.crateandbarrel.ca/search?query=',
  'free-people': 'https://www.freepeople.com/search/?q=',
  'guess': 'https://www.guess.ca/en/catalog/search?q=',
  'lulus': 'https://www.lulus.com/search?q=',
  'madewell': 'https://www.madewell.com/search?q=',
  'nasty-gal': 'https://www.nastygal.com/search?q=',
  'pottery-barn': 'https://www.potterybarn.ca/search/results.html?words=',
  'prettylittlething': 'https://www.prettylittlething.ca/catalogsearch/result/?q=',
  'princess-polly': 'https://us.princesspolly.com/search?q=',
  'revolve': 'https://www.revolve.com/content/search?q=',
  'shopbop': 'https://www.shopbop.com/s/search?keywords=',
  'skims': 'https://skims.com/search?q=',
  'steve-madden': 'https://www.stevemadden.ca/search?q=',
  'ugg': 'https://www.ugg.com/ca/search?q=',
  'urban-outfitters': 'https://www.urbanoutfitters.com/search?q=',
  'vuori': 'https://vuoriclothing.com/search?q=',
  'west-elm': 'https://www.westelm.ca/search/results.html?words=',

  // Beauty Brands
  'charlotte-tilbury': 'https://www.charlottetilbury.com/ca/search?q=',
  'colleen-rothschild': 'https://www.colleenrothschild.com/search?q=',
  'dime-beauty': 'https://dimebeautyco.com/search?q=',
  'dyson': 'https://www.dyson.ca/en/search?q=',
  'elf-cosmetics': 'https://www.elfcosmetics.com/search?q=',
  'merit-beauty': 'https://meritbeauty.com/search?q=',
  'supergoop': 'https://supergoop.com/search?q=',
  'tarte-cosmetics': 'https://tartecosmetics.com/shop/search?q=',
  'tula-skincare': 'https://www.tula.com/search?q=',
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
 * Extract clean search terms from a product title
 * Strips out prices, sale language, sizes, and other noise
 *
 * "Sale $6 Jays My Mighty Wolf, Doggy Bits dog treats" -> "Jays My Mighty Wolf Doggy Bits dog treats"
 * "SAVE 50% Tide Pods 42ct" -> "Tide Pods"
 * "$19.99 Samsung Galaxy Buds" -> "Samsung Galaxy Buds"
 */
export function extractSearchTerms(title: string, brandName?: string): string {
  if (!title) return ''

  let cleaned = title

  // Remove brand name if provided (case insensitive)
  if (brandName) {
    const brandPattern = new RegExp(`\\b${brandName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
    cleaned = cleaned.replace(brandPattern, '')
  }

  // Remove common marketing/noise words that don't help search
  const noiseWords = [
    'collection', 'collections', 'new arrivals', 'arrivals', 'new', 'shop now',
    'shop', 'bestseller', 'bestsellers', 'best seller', 'fan favorite', 'fan favorites',
    'classic', 'essentials', 'must have', 'must-have', 'trending', 'featured',
    'limited edition', 'exclusive', 'special', 'hot', 'deal', 'deals',
    'buy now', 'get it now', 'available now', 'in stock', 'back in stock'
  ]
  for (const word of noiseWords) {
    const wordPattern = new RegExp(`\\b${word}\\b`, 'gi')
    cleaned = cleaned.replace(wordPattern, '')
  }

  // Remove price patterns: $6, $19.99, $1,299.99
  cleaned = cleaned.replace(/\$[\d,]+\.?\d*/g, '')

  // Remove "SAVE X%" patterns first (before removing standalone %)
  cleaned = cleaned.replace(/\bsave\s+\d+%?/gi, '')

  // Remove "Sale" prefix and sale-related words
  cleaned = cleaned.replace(/^sale\s+/i, '')
  cleaned = cleaned.replace(/\bon\s+sale\b/gi, '')
  cleaned = cleaned.replace(/\bsale\b/gi, '')
  cleaned = cleaned.replace(/\bsavings?\b/gi, '')

  // Remove discount patterns: 50% OFF, -20%, 50%, 30% off
  cleaned = cleaned.replace(/-?\d+%\s*(off)?\b/gi, '')

  // Remove standalone % left over
  cleaned = cleaned.replace(/\s*%\s*/g, ' ')

  // Remove "was $X" / "reg $X" / "now $X" patterns
  cleaned = cleaned.replace(/\b(was|reg|regular|originally|now)\s*\$?[\d,.]+/gi, '')

  // Remove standalone "was", "now" left over from price removal
  cleaned = cleaned.replace(/\b(was|now)\b/gi, '')

  // Remove quantity/size patterns: 42ct, 500ml, 1.5L, 12pk, 6 pack, 1kg
  cleaned = cleaned.replace(/\b\d+\.?\d*\s*(ct|pk|pack|count|ml|l|g|kg|oz|lb)\b/gi, '')

  // Remove "limit X" patterns
  cleaned = cleaned.replace(/\blimit\s+\d+\b/gi, '')

  // Remove standalone numbers at start
  cleaned = cleaned.replace(/^\d+\s+/, '')

  // Remove common flyer noise words
  cleaned = cleaned.replace(/\b(selected|assorted|varieties|each|ea)\b/gi, '')

  // Clean up punctuation and whitespace
  cleaned = cleaned.replace(/[,|\-]/g, ' ')    // Replace commas, pipes, dashes with spaces
  cleaned = cleaned.replace(/\s+/g, ' ')       // Collapse multiple spaces
  cleaned = cleaned.trim()

  // If we stripped too much, return a reasonable portion of original
  if (cleaned.length < 3 && title.length > 3) {
    // Just strip obvious prefixes and prices
    return title
      .replace(/^sale\s+/i, '')
      .replace(/\$[\d,]+\.?\d*/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  }

  return cleaned
}

/**
 * Build affiliate search URL from a base search URL and product title
 * @param searchUrl - The base search URL from DB (e.g., "https://www.amazon.ca/s?k=")
 * @param productTitle - The product to search for (will be cleaned)
 * @param storeSlug - Optional store slug for cookie bypass params
 */
export function buildAffiliateSearchUrl(
  searchUrl: string,
  productTitle: string,
  storeSlug?: string | null
): string {
  const cleanedTitle = extractSearchTerms(productTitle)
  const bypassParam = storeSlug ? (COOKIE_BYPASS_PARAMS[storeSlug] || '') : ''
  return `${searchUrl}${encodeURIComponent(cleanedTitle)}${bypassParam}`
}

/**
 * Map store slugs to brand names for search term cleaning
 */
const STORE_BRAND_NAMES: Record<string, string> = {
  'lululemon': 'Lululemon',
  'aritzia': 'Aritzia',
  'ardene': 'Ardene',
  'aldo': 'Aldo',
  'simons': 'Simons',
  'foot-locker': 'Foot Locker',
  'new-balance': 'New Balance',
  'abercrombie-fitch': 'Abercrombie',
  'american-eagle': 'American Eagle',
  'anthropologie': 'Anthropologie',
  'free-people': 'Free People',
  'urban-outfitters': 'Urban Outfitters',
  'madewell': 'Madewell',
  'skims': 'SKIMS',
  'birkenstock': 'Birkenstock',
  'ugg': 'UGG',
  'steve-madden': 'Steve Madden',
  'revolve': 'Revolve',
  'princess-polly': 'Princess Polly',
  'nasty-gal': 'Nasty Gal',
  'prettylittlething': 'PrettyLittleThing',
  'lulus': 'Lulus',
  'guess': 'GUESS',
  'dyson': 'Dyson',
  'sephora': 'Sephora',
  'charlotte-tilbury': 'Charlotte Tilbury',
  'tarte-cosmetics': 'Tarte',
  'elf-cosmetics': 'e.l.f.',
  'supergoop': 'Supergoop',
}

/**
 * Get affiliate link with product search query appended
 * Priority: Rakuten affiliate > Direct retailer search URL
 * Automatically cleans the product title for better search results
 */
export function getAffiliateSearchUrl(storeSlug: string | null, productTitle: string): string | null {
  if (!storeSlug) return null

  // Get brand name from slug for better search term cleaning
  const brandName = STORE_BRAND_NAMES[storeSlug]

  // Clean the title for better search results (strips brand name, noise words)
  const cleanedTitle = extractSearchTerms(productTitle, brandName)

  // Try Rakuten (affiliate)
  const rakutenUrl = buildRakutenDeepLink(storeSlug, cleanedTitle)
  if (rakutenUrl) return rakutenUrl

  // Try direct retailer search URL
  const searchUrl = RETAILER_SEARCH_URLS[storeSlug]
  if (searchUrl) {
    const bypassParam = COOKIE_BYPASS_PARAMS[storeSlug] || ''
    return `${searchUrl}${encodeURIComponent(cleanedTitle)}${bypassParam}`
  }

  return null
}

/**
 * Extract store slug from a URL domain
 */
function extractStoreSlugFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url)
    const domain = urlObj.hostname.replace('www.', '').replace('.ca', '').replace('.com', '')
    // Convert domain to slug format
    return domain.replace(/\./g, '-')
  } catch {
    return null
  }
}

/**
 * Check if URL is an Amazon product link (not just homepage)
 */
function isAmazonProductLink(url: string): boolean {
  if (!url.includes('amazon.ca') && !url.includes('amazon.com') && !url.includes('amzn.')) {
    return false
  }
  // Check if it has a product path (/dp/, /gp/, product ASIN)
  return /\/(dp|gp|product)\/|\/[A-Z0-9]{10}/i.test(url)
}

/**
 * Affiliate tracking domains that support deep linking with custom URLs
 * These can wrap a search URL while maintaining affiliate tracking
 */
const DEEP_LINK_AFFILIATE_DOMAINS: Record<string, (url: string, publisherId: string) => string> = {
  // Rakuten/LinkShare - supports murl parameter for destination
  'click.linksynergy.com': (url, publisherId) =>
    `https://click.linksynergy.com/deeplink?id=${publisherId}&mid=1&murl=${encodeURIComponent(url)}`,
}

/**
 * Affiliate tracking domains that are static redirects (cannot add search params)
 */
const STATIC_AFFILIATE_DOMAINS = [
  'rstyle.me',           // rewardStyle/LTK - static redirect links
  'shareasale.com',      // ShareASale
  'pntra.com',           // Pepperjam
  'pjatr.com',           // Pepperjam
  'sjv.io',              // Skimlinks
  'go.redirectingat.com', // Skimlinks
  'howl.me',             // Howl
  'narrativ.com',        // Narrativ
  'shop-links.co',       // ShopLinks
]

/**
 * Check if URL is from a static affiliate domain (can't be modified)
 */
function isStaticAffiliateLink(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return STATIC_AFFILIATE_DOMAINS.some(domain =>
      urlObj.hostname === domain || urlObj.hostname.endsWith('.' + domain)
    )
  } catch {
    return STATIC_AFFILIATE_DOMAINS.some(domain => url.includes(domain))
  }
}

/**
 * Check if a URL already has search parameters (is a search URL template with query)
 */
function hasSearchQuery(url: string): boolean {
  try {
    const urlObj = new URL(url)
    // Check for common search params that already have values
    const searchParams = ['q', 'query', 'search', 'searchTerm', 'keyword', 'k', 'Ntt', 'text']
    return searchParams.some(param => {
      const value = urlObj.searchParams.get(param)
      return value && value.length > 0
    })
  } catch {
    return false
  }
}

/**
 * Build affiliate redirect URL that sets cookie AND redirects to search
 * Uses /api/go endpoint to load affiliate link in iframe, then redirect to search
 */
function buildAffiliateRedirect(affiliateUrl: string, searchUrl: string): string {
  return `/api/go?a=${encodeURIComponent(affiliateUrl)}&s=${encodeURIComponent(searchUrl)}`
}

/**
 * Get the best affiliate URL for a deal:
 * 1. Amazon product links - use directly with our tag
 * 2. Static affiliate links (rstyle.me) + search URL - use redirect wrapper (cookie + search)
 * 3. Rakuten stores - use deep link with search
 * 4. Homepage URLs - search-wrap with product title
 * 5. Fall back to store search URL
 */
export function getDealAffiliateUrl(
  dealAffiliateUrl: string | null | undefined,
  storeSlug: string | null,
  productTitle: string
): string | null {
  // Amazon product links go directly (already has product page)
  if (dealAffiliateUrl && isAmazonProductLink(dealAffiliateUrl)) {
    return cleanAmazonUrl(dealAffiliateUrl)
  }

  // Static affiliate links (rstyle.me, etc.) - wrap with search redirect
  if (dealAffiliateUrl && isStaticAffiliateLink(dealAffiliateUrl)) {
    // Build the search URL for this store
    const searchUrl = storeSlug ? getAffiliateSearchUrl(storeSlug, productTitle) : null

    if (searchUrl) {
      // Use redirect wrapper: sets affiliate cookie, then goes to search
      return buildAffiliateRedirect(dealAffiliateUrl, searchUrl)
    }

    // No search URL available, use affiliate link directly
    return dealAffiliateUrl
  }

  // Check if we have Rakuten for this store (can wrap search URL with tracking)
  if (storeSlug) {
    const rakutenMerchant = RAKUTEN_MERCHANTS[storeSlug]
    if (rakutenMerchant) {
      const cleanedTitle = extractSearchTerms(productTitle)
      const targetUrl = `${rakutenMerchant.domain}${rakutenMerchant.searchPath}${encodeURIComponent(cleanedTitle)}`
      return `https://click.linksynergy.com/deeplink?id=${RAKUTEN_PUBLISHER_ID}&mid=${rakutenMerchant.mid}&murl=${encodeURIComponent(targetUrl)}`
    }
  }

  // For other URLs, try to search-wrap them
  if (dealAffiliateUrl) {
    const urlStoreSlug = extractStoreSlugFromUrl(dealAffiliateUrl)
    const effectiveSlug = storeSlug || urlStoreSlug

    if (effectiveSlug) {
      const searchUrl = getAffiliateSearchUrl(effectiveSlug, productTitle)
      if (searchUrl) {
        return searchUrl
      }
    }

    return dealAffiliateUrl
  }

  // No affiliate URL - try to build one from store
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
