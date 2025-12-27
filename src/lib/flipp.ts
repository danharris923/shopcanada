/**
 * Flipp API Client
 *
 * Unofficial API for fetching Canadian flyer deals.
 * Endpoint: https://backflipp.wishabi.com/flipp/items/search
 */

// =============================================================================
// TYPES
// =============================================================================

export interface FlippItem {
  id: number
  flyer_item_id: number
  flyer_id: number
  name: string
  current_price: number | null
  original_price: number | null
  sale_story: string | null
  merchant_id: number
  merchant_name: string
  merchant_logo: string
  clean_image_url: string
  clipping_image_url: string
  valid_from: string
  valid_to: string
  _L1: string | null  // Category level 1
  _L2: string | null  // Category level 2
  item_type: 'flyer' | 'ecom'
  pre_price_text: string | null
  post_price_text: string | null
}

export interface FlippEcomItem {
  id: number
  global_id: string
  name: string
  description: string
  current_price: number | null
  original_price: number | null
  merchant: string
  merchant_id: number
  merchant_logo: string
  image_url: string
  item_id: string
  sku: string
  average_rating: number | null
  total_reviews: number
  item_type: 'ecom'
}

export interface FlippMerchant {
  id: number
  name: string
  name_identifier: string
  us_based: boolean
  storefront_logo: string
}

export interface FlippSearchResponse {
  items: FlippItem[]
  ecom_items: FlippEcomItem[]
  merchants: FlippMerchant[]
  flyers: unknown[]
  facets: unknown
  normalized_query: string
}

export interface FlippDeal {
  id: string
  title: string
  slug: string
  imageUrl: string
  price: number | null
  originalPrice: number | null
  discountPercent: number | null
  store: string
  storeSlug: string
  storeLogo: string
  category: string | null
  saleStory: string | null
  validFrom: string
  validTo: string
  source: 'flipp'
}

// =============================================================================
// CONFIG
// =============================================================================

const FLIPP_API_URL = 'https://backflipp.wishabi.com/flipp/items/search'
const DEFAULT_LOCALE = 'en-ca'
const DEFAULT_POSTAL_CODE = 'M5V1J2' // Toronto

// Store name to slug mapping
const STORE_SLUGS: Record<string, string> = {
  'Walmart': 'walmart',
  'Costco': 'costco',
  'Best Buy': 'best-buy',
  'Canadian Tire': 'canadian-tire',
  'The Brick': 'the-brick',
  'Leon\'s': 'leons',
  'Shoppers Drug Mart': 'shoppers',
  'No Frills': 'no-frills',
  'Real Canadian Superstore': 'superstore',
  'Loblaws': 'loblaws',
  'Metro': 'metro',
  'Food Basics': 'food-basics',
  'FreshCo': 'freshco',
  'Sobeys': 'sobeys',
  'Safeway': 'safeway',
  'Save-On-Foods': 'save-on-foods',
  'London Drugs': 'london-drugs',
  'Staples': 'staples',
  'Home Depot': 'home-depot',
  'RONA': 'rona',
  'Home Hardware': 'home-hardware',
  'Princess Auto': 'princess-auto',
  'Peavey Mart': 'peavey-mart',
  'Sport Chek': 'sport-chek',
  'Mark\'s': 'marks',
  'Atmosphere': 'atmosphere',
  'PetSmart': 'petsmart',
  'Pet Valu': 'pet-valu',
  'Toys R Us': 'toys-r-us',
  'Giant Tiger': 'giant-tiger',
  'Dollarama': 'dollarama',
  'IKEA': 'ikea',
  'Hudson\'s Bay': 'the-bay',
  'Winners': 'winners',
  'HomeSense': 'homesense',
  'Bed Bath & Beyond': 'bed-bath-beyond',
  'Kitchen Stuff Plus': 'kitchen-stuff-plus',
  'Long & McQuade Musical Instruments': 'long-mcquade',
  '2001 Audio Video': '2001-audio-video',
  'TeleTime': 'teletime',
  'Visions Electronics': 'visions',
  'Bass Pro Shops': 'bass-pro',
  'Cabela\'s': 'cabelas',
  // Additional stores from Flipp
  'Wholesale Club and Club Entrepôt': 'wholesale-club',
  'Wholesale Club': 'wholesale-club',
  'Club Entrepôt': 'wholesale-club',
  'EB Games Canada': 'eb-games',
  'EB Games': 'eb-games',
  'Adonis': 'adonis',
  'Old Navy': 'old-navy',
  'Old Navy Canada': 'old-navy',
  'Gap': 'gap',
  'Gap Canada': 'gap',
  'Cabela\'s & Bass Pro': 'bass-pro',
  'CABELA\'S & BASS PRO': 'bass-pro',
  'Rexall': 'rexall',
  'Jean Coutu': 'jean-coutu',
  'Pharmaprix': 'pharmaprix',
  'IGA': 'iga',
  'Maxi': 'maxi',
  'Provigo': 'provigo',
  'Super C': 'super-c',
  'Walmart Canada': 'walmart',
  'Amazon.ca': 'amazon',
  'Indigo': 'indigo',
  'Chapters': 'indigo',
  'Michaels': 'michaels',
  'Party City': 'party-city',
  'Lowe\'s': 'lowes',
  'Lowes': 'lowes',
  'Reno-Depot': 'reno-depot',
  'TSC Stores': 'tsc-stores',
  'Tractor Supply': 'tractor-supply',
  'Marshalls': 'marshalls',
  'Structube': 'structube',
  'Sleep Country': 'sleep-country',
  'The Source': 'the-source',
  'Bureau en Gros': 'staples',
  'Tiger Direct': 'tiger-direct',
  // Grocery & Specialty Stores
  'Independent': 'independent',
  'Independent City Market': 'independent',
  'Your Independent Grocer': 'independent',
  'Starsky': 'starsky',
  'Starsky Fine Foods': 'starsky',
  'T&T Supermarket': 't-and-t',
  'T&T': 't-and-t',
  'Nations Fresh Foods': 'nations',
  'Nations': 'nations',
  'Food Depot': 'food-depot',
  'Farm Boy': 'farm-boy',
  'Fortinos': 'fortinos',
  'Zehrs': 'zehrs',
  'Valu-mart': 'valu-mart',
  'ValuMart': 'valu-mart',
  'Atlantic Superstore': 'atlantic-superstore',
  'Dominion': 'dominion',
  'Voilà': 'voila',
  'Voila': 'voila',
  'Longos': 'longos',
  'Longo\'s': 'longos',
  'Pusateri\'s': 'pusateris',
  'Whole Foods': 'whole-foods',
  'Whole Foods Market': 'whole-foods',
  'Bulk Barn': 'bulk-barn',
  'Coppa\'s': 'coppas',
  'McEwan': 'mcewan',
  'Rabba': 'rabba',
  'Summerhill Market': 'summerhill-market',
  // More Retailers
  'Sail': 'sail',
  'Sail Outdoors': 'sail',
  'Running Room': 'running-room',
  'Sportium': 'sportium',
  'National Sports': 'national-sports',
  'Golf Town': 'golf-town',
  'Sporting Life': 'sporting-life',
  'MEC': 'mec',
  'Mountain Equipment Company': 'mec',
  'Roots': 'roots',
  'Roots Canada': 'roots',
  'Kernels': 'kernels',
  'Laura Secord': 'laura-secord',
  'Rocky Mountain Chocolate': 'rocky-mountain',
  'Purdy\'s': 'purdys',
  'Lindt': 'lindt',
  // Electronics
  'Memory Express': 'memory-express',
  'Canada Computers': 'canada-computers',
  'Newegg': 'newegg',
  'Newegg Canada': 'newegg',
  // Pharmacy & Health
  'Lawtons': 'lawtons',
  'Guardian': 'guardian',
  'I.D.A.': 'ida',
  'IDA': 'ida',
  'Remedy\'sRx': 'remedys-rx',
  'Pharmasave': 'pharmasave',
  // Home & Furniture
  'Wayfair': 'wayfair',
  'Wayfair Canada': 'wayfair',
  'Article': 'article',
  'EQ3': 'eq3',
  'Mobilia': 'mobilia',
  'Bouclair': 'bouclair',
  'Urban Barn': 'urban-barn',
  'Pier 1': 'pier-1',
  'Crate & Barrel': 'crate-barrel',
  'West Elm': 'west-elm',
  'Pottery Barn': 'pottery-barn',
  'Williams Sonoma': 'williams-sonoma',
  // Fashion
  'Aritzia': 'aritzia',
  'Lululemon': 'lululemon',
  'Lululemon Athletica': 'lululemon',
  'H&M': 'h-m',
  'Zara': 'zara',
  'Uniqlo': 'uniqlo',
  'UNIQLO': 'uniqlo',
  'Forever 21': 'forever-21',
  'Ardene': 'ardene',
  'Suzy Shier': 'suzy-shier',
  'Reitmans': 'reitmans',
  'Penningtons': 'penningtons',
  'Addition Elle': 'addition-elle',
  'RW&CO': 'rw-co',
  'Bootlegger': 'bootlegger',
  'Below The Belt': 'below-the-belt',
  'Tip Top Tailors': 'tip-top',
  'Moores': 'moores',
  // Department Stores
  'Simons': 'simons',
  'La Maison Simons': 'simons',
  'Sears': 'sears',
  'Sears Canada': 'sears',
  'Nordstrom': 'nordstrom',
  'Nordstrom Rack': 'nordstrom-rack',
  // Discount & Dollar Stores
  'Dollar Tree': 'dollar-tree',
  'Dollar General': 'dollar-general',
  'Bargain Shop': 'bargain-shop',
  'Dollarama': 'dollarama',
  'Buck or Two': 'buck-or-two',
  'Everything for a Dollar': 'everything-dollar',
  // Grocery Chains
  'Safeway Canada': 'safeway',
  'Thrifty Foods': 'thrifty-foods',
  'Urban Fare': 'urban-fare',
  'Price Chopper': 'price-chopper',
  'FreshMart': 'freshmart',
  'Foodland': 'foodland',
  'Foodland Ontario': 'foodland',
  'Co-op': 'co-op',
  'Calgary Co-op': 'calgary-co-op',
  'Federated Co-op': 'federated-co-op',
  'Save Easy': 'save-easy',
  'Needs': 'needs',
  'Hasty Market': 'hasty-market',
  'Mac\'s': 'macs',
  'Circle K': 'circle-k',
  'Couche-Tard': 'couche-tard',
  '7-Eleven': '7-eleven',
  'Shell': 'shell',
  'Esso': 'esso',
  'Petro-Canada': 'petro-canada',
  'Pioneer': 'pioneer',
  'Husky': 'husky',
  // Ethnic & Specialty Grocers
  'H Mart': 'h-mart',
  'H-Mart': 'h-mart',
  'PAT Central': 'pat-central',
  'Galleria Supermarket': 'galleria',
  'Oceans': 'oceans',
  'Oceans Fresh Food Market': 'oceans',
  'BTrust': 'btrust',
  'Sunny Foodmart': 'sunny-foodmart',
  'FoodyMart': 'foodymart',
  'Ample Food Market': 'ample-food',
  'No Frills': 'no-frills',
  'Food 4 Less': 'food-4-less',
  'Marche Adonis': 'adonis',
  'Akhavan': 'akhavan',
  'Arz Fine Foods': 'arz',
  'Highland Farms': 'highland-farms',
  'Fiesta Farms': 'fiesta-farms',
  'Bloor Street Market': 'bloor-street-market',
  'Loblaws City Market': 'loblaws',
  // Warehouse & Wholesale
  'Cash & Carry': 'cash-carry',
  'Sysco': 'sysco',
  'Gordon Food Service': 'gordon-food',
  'Restaurant Depot': 'restaurant-depot',
  // Hardware & Building
  'Castle Building Centres': 'castle',
  'Timber Mart': 'timber-mart',
  'BMR': 'bmr',
  'Patrick Morin': 'patrick-morin',
  'Canac': 'canac',
  'Kent Building Supplies': 'kent',
  'Co-op Home Centre': 'co-op-home',
  // Auto Parts
  'Canadian Tire Auto': 'canadian-tire',
  'PartSource': 'partsource',
  'NAPA': 'napa',
  'NAPA Auto Parts': 'napa',
  'Auto Value': 'auto-value',
  'Lordco': 'lordco',
  'UAP': 'uap',
  'Carquest': 'carquest',
  'O\'Reilly': 'oreilly',
  'AutoZone': 'autozone',
  // Furniture & Mattress
  'The Brick': 'the-brick',
  'Leon\'s': 'leons',
  'Bad Boy': 'bad-boy',
  'Lastman\'s Bad Boy': 'bad-boy',
  'Dufresne': 'dufresne',
  'Ashley Furniture': 'ashley',
  'Ashley HomeStore': 'ashley',
  'Jysk': 'jysk',
  'JYSK': 'jysk',
  'Sleep Country Canada': 'sleep-country',
  'Mattress Firm': 'mattress-firm',
  'Mattress Warehouse': 'mattress-warehouse',
  'Brick Mattress Store': 'the-brick',
  // Electronics & Appliances
  'Brault & Martineau': 'brault-martineau',
  'Tanguay': 'tanguay',
  'Corbeil': 'corbeil',
  'Trail Appliances': 'trail-appliances',
  'Coast Appliances': 'coast-appliances',
  'Goemans': 'goemans',
  'TA Appliances': 'ta-appliances',
  'Midland Appliance': 'midland-appliance',
  // Office & Business
  'Grand & Toy': 'grand-toy',
  'Mills Fleet Farm': 'fleet-farm',
  'Business Depot': 'staples',
  // Toys & Kids
  'Mastermind Toys': 'mastermind-toys',
  'Scholar\'s Choice': 'scholars-choice',
  'Learning Express': 'learning-express',
  'Once Upon A Child': 'once-upon-child',
  'Carter\'s': 'carters',
  'OshKosh': 'oshkosh',
  'Children\'s Place': 'childrens-place',
  'The Children\'s Place': 'childrens-place',
  'Gymboree': 'gymboree',
  'Toys R Us Canada': 'toys-r-us',
  'Babies R Us': 'babies-r-us',
  // Sporting Goods
  'Decathlon': 'decathlon',
  'Soccer Experts': 'soccer-experts',
  'Hockey Experts': 'hockey-experts',
  'L\'Equipeur': 'lequipeur',
  'Intersport': 'intersport',
  'Pro Hockey Life': 'pro-hockey-life',
  'Source For Sports': 'source-for-sports',
  'Play It Again Sports': 'play-it-again',
  // Outdoor & Camping
  'Campers Village': 'campers-village',
  'Atmosphere': 'atmosphere',
  'Cabela\'s Canada': 'cabelas',
  'Bass Pro': 'bass-pro',
  'Fishing World': 'fishing-world',
  'Sportsman\'s Warehouse': 'sportsmans-warehouse',
  // Beauty & Cosmetics
  'Shoppers Beauty': 'shoppers',
  'Sephora': 'sephora',
  'Sephora Canada': 'sephora',
  'MAC Cosmetics': 'mac',
  'The Body Shop': 'body-shop',
  'Bath & Body Works': 'bath-body-works',
  'Lush': 'lush',
  'L\'Occitane': 'loccitane',
  'Yves Rocher': 'yves-rocher',
  'Jean Coutu Beauty': 'jean-coutu',
  'Ulta': 'ulta',
  // Pet Stores
  'Pet Valu': 'pet-valu',
  'PetSmart Canada': 'petsmart',
  'Petland': 'petland',
  'Ren\'s Pets': 'rens-pets',
  'Global Pet Foods': 'global-pet',
  'Tisol': 'tisol',
  'Homes Alive Pets': 'homes-alive',
  'Pet Planet': 'pet-planet',
  // Wine & Liquor
  'LCBO': 'lcbo',
  'SAQ': 'saq',
  'BC Liquor': 'bc-liquor',
  'Alberta Liquor': 'alberta-liquor',
  'Wine Rack': 'wine-rack',
  'Beer Store': 'beer-store',
  'The Beer Store': 'beer-store',
  // Craft & Hobby
  'Michaels Canada': 'michaels',
  'DeSerres': 'deserres',
  'Curry\'s Art Store': 'currys',
  'Above Ground Art': 'above-ground',
  'Opus Art Supplies': 'opus',
  'Fabricland': 'fabricland',
  'Fabricville': 'fabricville',
  'Len\'s Mill Stores': 'lens-mill',
  // Garden & Nursery
  'Sheridan Nurseries': 'sheridan-nurseries',
  'Terra Greenhouses': 'terra',
  'Parkwood Gardens': 'parkwood',
  'Plant World': 'plant-world',
  'Garden Gallery': 'garden-gallery',
  // Optical
  'Clearly': 'clearly',
  'LensCrafters': 'lenscrafters',
  'Pearle Vision': 'pearle-vision',
  'Hakim Optical': 'hakim',
  'Image Optometry': 'image-optometry',
  'FYidoctors': 'fyidoctors',
  // Telecom
  'Bell': 'bell',
  'Rogers': 'rogers',
  'Telus': 'telus',
  'Freedom Mobile': 'freedom-mobile',
  'Koodo': 'koodo',
  'Fido': 'fido',
  'Virgin Plus': 'virgin-plus',
  'Chatr': 'chatr',
  'Lucky Mobile': 'lucky-mobile',
  'Public Mobile': 'public-mobile',
  // Restaurants & Fast Food (flyers)
  'McDonald\'s': 'mcdonalds',
  'Tim Hortons': 'tim-hortons',
  'Starbucks': 'starbucks',
  'Subway': 'subway',
  'Pizza Pizza': 'pizza-pizza',
  'Boston Pizza': 'boston-pizza',
  'Swiss Chalet': 'swiss-chalet',
  'Harvey\'s': 'harveys',
  'A&W': 'a-and-w',
  'Burger King': 'burger-king',
  'Wendy\'s': 'wendys',
  'KFC': 'kfc',
  'Popeyes': 'popeyes',
  'Dairy Queen': 'dairy-queen',
  // Other Retailers
  'Bentley': 'bentley',
  'Aldo': 'aldo',
  'Call It Spring': 'call-it-spring',
  'Soft Moc': 'soft-moc',
  'Browns': 'browns',
  'Town Shoes': 'town-shoes',
  'Shoe Warehouse': 'shoe-warehouse',
  'Payless': 'payless',
  'DSW': 'dsw',
  'Foot Locker': 'foot-locker',
  'Foot Locker Canada': 'foot-locker',
  'Champs Sports': 'champs-sports',
  'Finish Line': 'finish-line',
}

// Category mapping from Flipp _L1 to our categories
const CATEGORY_MAP: Record<string, string> = {
  'Electronics': 'electronics',
  'Computers & Software': 'electronics',
  'Home & Garden': 'home',
  'Kitchen & Dining': 'home',
  'Furniture': 'home',
  'Apparel & Accessories': 'fashion',
  'Health & Beauty': 'beauty',
  'Food': 'grocery',
  'Beverages': 'grocery',
  'Sports & Outdoors': 'sports',
  'Toys & Games': 'toys',
  'Baby & Kids': 'kids',
  'Automotive': 'automotive',
  'Pet Supplies': 'pets',
  'Office Supplies': 'office',
  'Tools & Hardware': 'home',
}

// =============================================================================
// API FUNCTIONS
// =============================================================================

/**
 * Search Flipp for deals
 */
export async function searchFlipp(
  query: string,
  postalCode: string = DEFAULT_POSTAL_CODE,
  limit: number = 50
): Promise<FlippSearchResponse> {
  const url = new URL(FLIPP_API_URL)
  url.searchParams.set('locale', DEFAULT_LOCALE)
  url.searchParams.set('postal_code', postalCode)
  url.searchParams.set('q', query)
  url.searchParams.set('limit', String(limit))

  const response = await fetch(url.toString(), {
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'PromoPenguin/1.0',
    },
    next: { revalidate: 900 } // Cache for 15 minutes
  })

  if (!response.ok) {
    throw new Error(`Flipp API error: ${response.status}`)
  }

  return response.json()
}

/**
 * Get deals for a specific store
 */
export async function getFlippStoreDeals(
  storeName: string,
  postalCode: string = DEFAULT_POSTAL_CODE
): Promise<FlippDeal[]> {
  try {
    const response = await searchFlipp(storeName, postalCode)
    // Filter to only include items from the requested store
    // (Flipp search can return items where the query matches product name, not just store)
    const storeNameLower = storeName.toLowerCase()
    const filteredItems = response.items.filter(item =>
      item.merchant_name.toLowerCase().includes(storeNameLower) ||
      storeNameLower.includes(item.merchant_name.toLowerCase())
    )
    return transformFlippItems(filteredItems)
  } catch (error) {
    // Error fetching Flipp deals for store
    return []
  }
}

/**
 * Get deals for a product search
 */
export async function searchFlippDeals(
  query: string,
  limit: number = 50,
  postalCode: string = DEFAULT_POSTAL_CODE
): Promise<FlippDeal[]> {
  try {
    const response = await searchFlipp(query, postalCode, limit * 2)
    const deals = transformFlippItems(response.items)
    return deals.slice(0, limit)
  } catch (error) {
    // Error searching Flipp for query
    return []
  }
}

/**
 * Get deals from multiple stores
 */
export async function getFlippDealsMultiStore(
  storeNames: string[],
  postalCode: string = DEFAULT_POSTAL_CODE
): Promise<FlippDeal[]> {
  const allDeals: FlippDeal[] = []

  for (const store of storeNames) {
    const deals = await getFlippStoreDeals(store, postalCode)
    allDeals.push(...deals)
  }

  // Dedupe by id
  const seen = new Set<string>()
  return allDeals.filter(deal => {
    if (seen.has(deal.id)) return false
    seen.add(deal.id)
    return true
  })
}

// =============================================================================
// TRANSFORM FUNCTIONS
// =============================================================================

/**
 * Transform Flipp items to our deal format
 * Filters out low-quality items (no price, too cheap, no image)
 */
function transformFlippItems(items: FlippItem[]): FlippDeal[] {
  return items
    .filter(item => {
      // Must have name and price
      if (!item.name || item.current_price === null) return false
      // Skip items under $1 (often have bad cropped images)
      if (item.current_price < 1) return false
      // Must have an image
      if (!item.clean_image_url && !item.clipping_image_url) return false
      // Skip if name is just the store name (it's a logo/banner)
      if (item.name.toLowerCase() === item.merchant_name.toLowerCase()) return false
      return true
    })
    .map(item => transformFlippItem(item))
}

/**
 * Transform a single Flipp item
 */
function transformFlippItem(item: FlippItem): FlippDeal {
  const storeSlug = getStoreSlug(item.merchant_name)
  const discountPercent = calculateDiscount(item.original_price, item.current_price)

  return {
    id: `flipp-${item.flyer_item_id || item.id}`,
    title: cleanTitle(item.name),
    slug: generateSlug(item.name, item.flyer_item_id || item.id),
    imageUrl: item.clean_image_url || item.clipping_image_url,
    price: item.current_price,
    originalPrice: item.original_price,
    discountPercent,
    store: item.merchant_name,
    storeSlug,
    storeLogo: item.merchant_logo,
    category: mapCategory(item._L1),
    saleStory: item.sale_story,
    validFrom: item.valid_from,
    validTo: item.valid_to,
    source: 'flipp',
  }
}

// =============================================================================
// HELPERS
// =============================================================================

function getStoreSlug(merchantName: string): string {
  return STORE_SLUGS[merchantName] || merchantName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

function mapCategory(flippCategory: string | null): string | null {
  if (!flippCategory) return null
  return CATEGORY_MAP[flippCategory] || 'general'
}

function calculateDiscount(original: number | null, current: number | null): number | null {
  if (!original || !current || original <= current) return null
  return Math.round(((original - current) / original) * 100)
}

function cleanTitle(name: string): string {
  // Remove excessive whitespace
  return name.replace(/\s+/g, ' ').trim()
}

function generateSlug(name: string, id: number): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
  return `${base}-${id}`
}

// =============================================================================
// STORE LIST
// =============================================================================

/**
 * Get list of supported stores for Flipp
 */
export function getFlippStores(): { name: string; slug: string }[] {
  return Object.entries(STORE_SLUGS).map(([name, slug]) => ({ name, slug }))
}

/**
 * Get store name from slug
 */
export function getStoreNameFromSlug(slug: string): string | null {
  for (const [name, s] of Object.entries(STORE_SLUGS)) {
    if (s === slug) return name
  }
  return null
}

/**
 * Check if a store slug has Flipp flyer support
 */
export function hasFlippSupport(slug: string): boolean {
  return Object.values(STORE_SLUGS).includes(slug)
}

/**
 * Get all Flipp-supported store slugs
 */
export function getFlippStoreSlugs(): string[] {
  return Object.values(STORE_SLUGS)
}

