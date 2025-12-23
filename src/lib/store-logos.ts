/**
 * Store Logo URLs - High-quality logos via Clearbit & Google
 * Using Clearbit Logo API (https://logo.clearbit.com/domain.com)
 */

export type StoreBadge =
  | 'canadian-owned'      // 🇨🇦 Canadian-Owned
  | 'canadian-retailer'   // 🏬 Canadian Retailer
  | 'international'       // 🌍 International (Canada-Available)
  | 'ships-from-canada'   // 🚚 Ships from Canada
  | 'made-in-canada'      // 🏭 Made in Canada

// Badge display configuration - priority order (highest first)
export const BADGE_CONFIG: Record<StoreBadge, { emoji: string; label: string; priority: number }> = {
  'canadian-owned': { emoji: '🇨🇦', label: 'Canadian-Owned', priority: 1 },
  'made-in-canada': { emoji: '🏭', label: 'Made in Canada', priority: 2 },
  'canadian-retailer': { emoji: '🏬', label: 'Canadian Retailer', priority: 3 },
  'international': { emoji: '🌍', label: 'International', priority: 4 },
  'ships-from-canada': { emoji: '🚚', label: 'Ships from Canada', priority: 5 },
}

/**
 * Get top N badges for a store, sorted by priority
 * Returns badges with emoji and label for display
 */
export function getTopBadges(store: StoreInfo, maxBadges: number = 2): { emoji: string; label: string }[] {
  if (!store.badges || store.badges.length === 0) return []

  return store.badges
    .map(badge => ({ ...BADGE_CONFIG[badge], badge }))
    .sort((a, b) => a.priority - b.priority)
    .slice(0, maxBadges)
    .map(({ emoji, label }) => ({ emoji, label }))
}

export interface StoreInfo {
  slug: string
  name: string
  domain: string
  logo: string
  color: string
  tagline: string           // SEO-optimized microcopy (auto-generated or manual)
  badges?: StoreBadge[]     // Optional informational badges
  isCanadian?: boolean      // Canadian-owned flag
  // SEO fields for microcopy generation
  topCategories?: string[]  // Max 3 categories for SEO (e.g., ['electronics', 'home', 'fashion'])
  province?: string         // For small Canadian brands (e.g., 'Saskatchewan')
}

// Helper to generate Google favicon URL (most reliable)
const gfav = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`

/**
 * Generate SEO-optimized microcopy for store cards
 * Format: "{Brand Name} Canada deals on {categories}"
 * Leverages brand search equity + Canada modifiers for organic traffic
 */
export function generateSeoTagline(store: StoreInfo): string {
  const { name, topCategories, province, isCanadian } = store

  // Small Canadian brand with province
  if (province && isCanadian && topCategories?.length) {
    return `${topCategories[0]} made in ${province}`
  }

  // Has categories - use SEO format
  if (topCategories && topCategories.length > 0) {
    const brandName = name.replace(/\.ca$/, '').replace(/ Canada$/, '')
    const categories = formatCategories(topCategories)
    return `${brandName} Canada deals on ${categories}`
  }

  // Fallback
  return `Shop ${name} deals available in Canada`
}

/**
 * Format categories array into readable string
 * ['electronics', 'home', 'fashion'] -> "electronics, home, and fashion"
 */
function formatCategories(categories: string[]): string {
  if (categories.length === 1) return categories[0]
  if (categories.length === 2) return `${categories[0]} and ${categories[1]}`
  return `${categories.slice(0, -1).join(', ')}, and ${categories[categories.length - 1]}`
}

/**
 * Format category slug to display name
 * 'home-decor' -> 'Home Decor'
 */
export function formatCategoryName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Generate SEO-optimized H2 for category section on store page
 * Template: "{Category Name} Deals at {Store Name} Canada"
 * For Canadian brands or brands with "Canada" in name, omits extra "Canada"
 */
export function generateCategoryH2(categorySlug: string, store: StoreInfo): string {
  const categoryName = formatCategoryName(categorySlug)
  const brandName = store.name.replace(/\.ca$/, '').replace(/ Canada$/, '')

  // Small Canadian brand with province - use province instead of "Canada"
  if (store.province && store.isCanadian) {
    return `${categoryName} Deals Made in ${store.province}`
  }

  // Check if brand already has "Canada" or "Canadian" in the name
  const hasCanadaInName = /canad/i.test(store.name)

  if (hasCanadaInName) {
    return `${categoryName} Deals at ${brandName}`
  }

  return `${categoryName} Deals at ${brandName} Canada`
}

/**
 * Get store page H1 - returns tagline verbatim (matches store card microcopy)
 * This ensures H1 = store card microcopy for SEO consistency
 */
export function getStorePageH1(store: StoreInfo): string {
  return store.tagline
}

// Map store slugs to domains and logos
export const storeLogos: Record<string, StoreInfo> = {
  // Major Retailers
  'amazon': {
    slug: 'amazon',
    name: 'Amazon.ca',
    domain: 'amazon.ca',
    logo: gfav('amazon.ca'),
    color: 'bg-[#FF9900]',
    tagline: 'Amazon Canada deals on electronics, home, and everyday essentials',
    topCategories: ['electronics', 'home', 'everyday essentials'],
    badges: ['international', 'ships-from-canada'],
  },
  'walmart': {
    slug: 'walmart',
    name: 'Walmart Canada',
    domain: 'walmart.ca',
    logo: gfav('walmart.ca'),
    color: 'bg-[#0071CE]',
    tagline: 'Walmart Canada deals on groceries, electronics, and home goods',
    topCategories: ['groceries', 'electronics', 'home goods'],
    badges: ['international', 'ships-from-canada'],
  },
  'costco': {
    slug: 'costco',
    name: 'Costco',
    domain: 'costco.ca',
    logo: gfav('costco.ca'),
    color: 'bg-[#E31837]',
    tagline: 'Costco Canada deals on bulk groceries, electronics, and home goods',
    topCategories: ['bulk groceries', 'electronics', 'home goods'],
    badges: ['international', 'ships-from-canada'],
  },
  'best-buy': {
    slug: 'best-buy',
    name: 'Best Buy',
    domain: 'bestbuy.ca',
    logo: gfav('bestbuy.ca'),
    color: 'bg-[#0046BE]',
    tagline: 'Best Buy Canada deals on electronics, TVs, and appliances',
    topCategories: ['electronics', 'TVs', 'appliances'],
    badges: ['international', 'ships-from-canada'],
  },
  'canadian-tire': {
    slug: 'canadian-tire',
    name: 'Canadian Tire',
    domain: 'canadiantire.ca',
    logo: gfav('canadiantire.ca'),
    color: 'bg-[#D52B1E]',
    tagline: 'Canadian Tire deals on automotive, tools, and outdoor gear',
    topCategories: ['automotive', 'tools', 'outdoor gear'],
    badges: ['canadian-owned', 'canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'shoppers': {
    slug: 'shoppers',
    name: 'Shoppers Drug Mart',
    domain: 'shoppersdrugmart.ca',
    logo: gfav('shoppersdrugmart.ca'),
    color: 'bg-[#E31837]',
    tagline: 'Shoppers Drug Mart deals on beauty, pharmacy, and wellness',
    topCategories: ['beauty', 'pharmacy', 'wellness'],
    badges: ['canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'home-depot': {
    slug: 'home-depot',
    name: 'Home Depot',
    domain: 'homedepot.ca',
    logo: gfav('homedepot.ca'),
    color: 'bg-[#F96302]',
    tagline: 'Home Depot Canada deals on tools, lumber, and appliances',
    topCategories: ['tools', 'lumber', 'appliances'],
    badges: ['international', 'ships-from-canada'],
  },
  'lowes': {
    slug: 'lowes',
    name: "Lowe's Canada",
    domain: 'lowes.ca',
    logo: gfav('lowes.ca'),
    color: 'bg-[#004990]',
    tagline: "Lowe's Canada deals on tools, appliances, and building materials",
    topCategories: ['tools', 'appliances', 'building materials'],
    badges: ['international', 'ships-from-canada'],
  },
  'staples': {
    slug: 'staples',
    name: 'Staples',
    domain: 'staples.ca',
    logo: gfav('staples.ca'),
    color: 'bg-[#CC0000]',
    tagline: 'Staples Canada deals on office supplies, tech, and furniture',
    topCategories: ['office supplies', 'tech', 'furniture'],
    badges: ['international', 'ships-from-canada'],
  },
  'sport-chek': {
    slug: 'sport-chek',
    name: 'Sport Chek',
    domain: 'sportchek.ca',
    logo: gfav('sportchek.ca'),
    color: 'bg-[#00529B]',
    tagline: 'Sport Chek Canada deals on athletic gear, footwear, and apparel',
    topCategories: ['athletic gear', 'footwear', 'apparel'],
    badges: ['canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'the-bay': {
    slug: 'the-bay',
    name: "Hudson's Bay",
    domain: 'thebay.com',
    logo: gfav('thebay.com'),
    color: 'bg-[#000000]',
    tagline: "Hudson's Bay Canada deals on fashion, home, and beauty",
    topCategories: ['fashion', 'home', 'beauty'],
    badges: ['canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'indigo': {
    slug: 'indigo',
    name: 'Indigo',
    domain: 'indigo.ca',
    logo: gfav('indigo.ca'),
    color: 'bg-[#5C2D91]',
    tagline: 'Indigo Canada deals on books, gifts, and home decor',
    topCategories: ['books', 'gifts', 'home decor'],
    badges: ['canadian-owned', 'canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'well-ca': {
    slug: 'well-ca',
    name: 'Well.ca',
    domain: 'well.ca',
    logo: gfav('well.ca'),
    color: 'bg-[#7AB800]',
    tagline: 'Well.ca deals on natural health, baby, and beauty products',
    topCategories: ['natural health', 'baby', 'beauty products'],
    badges: ['canadian-owned', 'ships-from-canada'],
    isCanadian: true,
  },
  'london-drugs': {
    slug: 'london-drugs',
    name: 'London Drugs',
    domain: 'londondrugs.com',
    logo: gfav('londondrugs.com'),
    color: 'bg-[#003DA5]',
    tagline: 'London Drugs Canada deals on electronics, pharmacy, and photo',
    topCategories: ['electronics', 'pharmacy', 'photo'],
    badges: ['canadian-owned', 'canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'real-canadian-superstore': {
    slug: 'real-canadian-superstore',
    name: 'Real Canadian Superstore',
    domain: 'realcanadiansuperstore.ca',
    logo: gfav('realcanadiansuperstore.ca'),
    color: 'bg-[#E31837]',
    tagline: 'Real Canadian Superstore deals on groceries, home, and apparel',
    topCategories: ['groceries', 'home', 'apparel'],
    badges: ['canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'loblaws': {
    slug: 'loblaws',
    name: 'Loblaws',
    domain: 'loblaws.ca',
    logo: gfav('loblaws.ca'),
    color: 'bg-[#E31837]',
    tagline: 'Loblaws Canada deals on groceries, pharmacy, and PC products',
    topCategories: ['groceries', 'pharmacy', 'PC products'],
    badges: ['canadian-owned', 'canadian-retailer'],
    isCanadian: true,
  },

  // Electronics & Tech
  'newegg': {
    slug: 'newegg',
    name: 'Newegg',
    domain: 'newegg.ca',
    logo: gfav('newegg.ca'),
    color: 'bg-[#FF6600]',
    tagline: 'Newegg Canada deals on PC components, laptops, and gaming',
    topCategories: ['PC components', 'laptops', 'gaming'],
    badges: ['international', 'ships-from-canada'],
  },
  'the-source': {
    slug: 'the-source',
    name: 'The Source',
    domain: 'thesource.ca',
    logo: gfav('thesource.ca'),
    color: 'bg-[#E4002B]',
    tagline: 'The Source Canada deals on electronics, phones, and accessories',
    topCategories: ['electronics', 'phones', 'accessories'],
    badges: ['canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'bed-bath-beyond': {
    slug: 'bed-bath-beyond',
    name: 'Bed Bath & Beyond',
    domain: 'bedbathandbeyond.ca',
    logo: gfav('bedbathandbeyond.ca'),
    color: 'bg-[#003399]',
    tagline: 'Shop Bed Bath & Beyond deals available in Canada',
    badges: ['international'],
  },
  'ikea': {
    slug: 'ikea',
    name: 'IKEA',
    domain: 'ikea.ca',
    logo: gfav('ikea.ca'),
    color: 'bg-[#0051BA]',
    tagline: 'IKEA Canada deals on furniture, storage, and home decor',
    topCategories: ['furniture', 'storage', 'home decor'],
    badges: ['international', 'ships-from-canada'],
  },
  'marks': {
    slug: 'marks',
    name: "Mark's",
    domain: 'marks.com',
    logo: gfav('marks.com'),
    color: 'bg-[#D52B1E]',
    tagline: "Mark's Canada deals on workwear, boots, and casual apparel",
    topCategories: ['workwear', 'boots', 'casual apparel'],
    badges: ['canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'atmosphere': {
    slug: 'atmosphere',
    name: 'Atmosphere',
    domain: 'atmosphere.ca',
    logo: gfav('atmosphere.ca'),
    color: 'bg-[#00529B]',
    tagline: 'Atmosphere Canada deals on outdoor gear, camping, and hiking',
    topCategories: ['outdoor gear', 'camping', 'hiking'],
    badges: ['canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'winners': {
    slug: 'winners',
    name: 'Winners',
    domain: 'winners.ca',
    logo: gfav('winners.ca'),
    color: 'bg-[#E31837]',
    tagline: 'Winners Canada deals on designer fashion, home, and beauty',
    topCategories: ['designer fashion', 'home', 'beauty'],
    badges: ['canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'homesense': {
    slug: 'homesense',
    name: 'HomeSense',
    domain: 'homesense.ca',
    logo: gfav('homesense.ca'),
    color: 'bg-[#00529B]',
    tagline: 'HomeSense Canada deals on home decor, furniture, and kitchenware',
    topCategories: ['home decor', 'furniture', 'kitchenware'],
    badges: ['canadian-retailer'],
    isCanadian: true,
  },
  'marshalls': {
    slug: 'marshalls',
    name: 'Marshalls',
    domain: 'marshalls.ca',
    logo: gfav('marshalls.ca'),
    color: 'bg-[#000000]',
    tagline: 'Marshalls Canada deals on fashion, shoes, and accessories',
    topCategories: ['fashion', 'shoes', 'accessories'],
    badges: ['canadian-retailer'],
    isCanadian: true,
  },
  'old-navy': {
    slug: 'old-navy',
    name: 'Old Navy',
    domain: 'oldnavy.ca',
    logo: gfav('oldnavy.ca'),
    color: 'bg-[#003E7E]',
    tagline: 'Old Navy Canada deals on family apparel, kids, and activewear',
    topCategories: ['family apparel', 'kids', 'activewear'],
    badges: ['international', 'ships-from-canada'],
  },
  'gap': {
    slug: 'gap',
    name: 'Gap',
    domain: 'gapcanada.ca',
    logo: gfav('gap.com'),
    color: 'bg-[#000000]',
    tagline: 'Gap Canada deals on casual wear, denim, and basics',
    topCategories: ['casual wear', 'denim', 'basics'],
    badges: ['international', 'ships-from-canada'],
  },
  'h-m': {
    slug: 'h-m',
    name: 'H&M',
    domain: 'hm.com',
    logo: gfav('hm.com'),
    color: 'bg-[#E50010]',
    tagline: 'H&M Canada deals on fashion, home, and sustainable styles',
    topCategories: ['fashion', 'home', 'sustainable styles'],
    badges: ['international', 'ships-from-canada'],
  },
  'zara': {
    slug: 'zara',
    name: 'Zara',
    domain: 'zara.com',
    logo: gfav('zara.com'),
    color: 'bg-[#000000]',
    tagline: 'Zara Canada deals on women, men, and kids fashion',
    topCategories: ['women', 'men', 'kids fashion'],
    badges: ['international', 'ships-from-canada'],
  },
  'uniqlo': {
    slug: 'uniqlo',
    name: 'Uniqlo',
    domain: 'uniqlo.com',
    logo: gfav('uniqlo.com'),
    color: 'bg-[#FF0000]',
    tagline: 'Uniqlo Canada deals on basics, outerwear, and essentials',
    topCategories: ['basics', 'outerwear', 'essentials'],
    badges: ['international', 'ships-from-canada'],
  },
  'lululemon': {
    slug: 'lululemon',
    name: 'lululemon',
    domain: 'lululemon.com',
    logo: gfav('lululemon.com'),
    color: 'bg-[#D31334]',
    tagline: 'lululemon Canada deals on yoga, running, and athletic wear',
    topCategories: ['yoga', 'running', 'athletic wear'],
    badges: ['canadian-owned', 'ships-from-canada'],
    isCanadian: true,
  },
  'aritzia': {
    slug: 'aritzia',
    name: 'Aritzia',
    domain: 'aritzia.com',
    logo: gfav('aritzia.com'),
    color: 'bg-[#000000]',
    tagline: 'Aritzia Canada deals on everyday luxury and womens fashion',
    topCategories: ['everyday luxury', 'womens fashion'],
    badges: ['canadian-owned', 'canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'roots': {
    slug: 'roots',
    name: 'Roots',
    domain: 'roots.com',
    logo: gfav('roots.com'),
    color: 'bg-[#8B4513]',
    tagline: 'Roots Canada deals on leather goods, sweats, and Canadiana',
    topCategories: ['leather goods', 'sweats', 'Canadiana'],
    badges: ['canadian-owned', 'made-in-canada', 'ships-from-canada'],
    isCanadian: true,
  },
  'canada-goose': {
    slug: 'canada-goose',
    name: 'Canada Goose',
    domain: 'canadagoose.com',
    logo: gfav('canadagoose.com'),
    color: 'bg-[#000000]',
    tagline: 'Canada Goose deals on parkas, outerwear, and cold weather gear',
    topCategories: ['parkas', 'outerwear', 'cold weather gear'],
    badges: ['canadian-owned', 'made-in-canada'],
    isCanadian: true,
  },
  'sephora': {
    slug: 'sephora',
    name: 'Sephora',
    domain: 'sephora.com',
    logo: gfav('sephora.com'),
    color: 'bg-[#000000]',
    tagline: 'Sephora Canada deals on makeup, skincare, and fragrance',
    topCategories: ['makeup', 'skincare', 'fragrance'],
    badges: ['international', 'ships-from-canada'],
  },
  'bath-body-works': {
    slug: 'bath-body-works',
    name: 'Bath & Body Works',
    domain: 'bathandbodyworks.ca',
    logo: gfav('bathandbodyworks.com'),
    color: 'bg-[#004C91]',
    tagline: 'Bath & Body Works Canada deals on body care, candles, and fragrance',
    topCategories: ['body care', 'candles', 'fragrance'],
    badges: ['international', 'ships-from-canada'],
  },
  'petsmart': {
    slug: 'petsmart',
    name: 'PetSmart',
    domain: 'petsmart.ca',
    logo: gfav('petsmart.ca'),
    color: 'bg-[#0054A4]',
    tagline: 'PetSmart Canada deals on pet food, supplies, and grooming',
    topCategories: ['pet food', 'supplies', 'grooming'],
    badges: ['international', 'ships-from-canada'],
  },
  'pet-valu': {
    slug: 'pet-valu',
    name: 'Pet Valu',
    domain: 'petvalu.ca',
    logo: gfav('petvalu.ca'),
    color: 'bg-[#E31837]',
    tagline: 'Pet Valu Canada deals on pet food, treats, and accessories',
    topCategories: ['pet food', 'treats', 'accessories'],
    badges: ['canadian-owned', 'canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'michaels': {
    slug: 'michaels',
    name: 'Michaels',
    domain: 'michaels.com',
    logo: gfav('michaels.com'),
    color: 'bg-[#D52B1E]',
    tagline: 'Michaels Canada deals on arts, crafts, and framing',
    topCategories: ['arts', 'crafts', 'framing'],
    badges: ['international', 'ships-from-canada'],
  },
  'foot-locker': {
    slug: 'foot-locker',
    name: 'Foot Locker',
    domain: 'footlocker.ca',
    logo: gfav('footlocker.ca'),
    color: 'bg-[#000000]',
    tagline: 'Foot Locker Canada deals on sneakers, Jordan, and sportswear',
    topCategories: ['sneakers', 'Jordan', 'sportswear'],
    badges: ['international', 'ships-from-canada'],
  },
  'nike': {
    slug: 'nike',
    name: 'Nike',
    domain: 'nike.com',
    logo: gfav('nike.com'),
    color: 'bg-[#000000]',
    tagline: 'Nike Canada deals on running shoes, apparel, and Jordan',
    topCategories: ['running shoes', 'apparel', 'Jordan'],
    badges: ['international', 'ships-from-canada'],
  },
  'adidas': {
    slug: 'adidas',
    name: 'Adidas',
    domain: 'adidas.ca',
    logo: gfav('adidas.ca'),
    color: 'bg-[#000000]',
    tagline: 'Adidas Canada deals on sneakers, sportswear, and Originals',
    topCategories: ['sneakers', 'sportswear', 'Originals'],
    badges: ['international', 'ships-from-canada'],
  },
  'apple': {
    slug: 'apple',
    name: 'Apple',
    domain: 'apple.com',
    logo: gfav('apple.com'),
    color: 'bg-[#000000]',
    tagline: 'Apple Canada deals on iPhone, Mac, and iPad',
    topCategories: ['iPhone', 'Mac', 'iPad'],
    badges: ['international', 'ships-from-canada'],
  },
  'microsoft': {
    slug: 'microsoft',
    name: 'Microsoft',
    domain: 'microsoft.com',
    logo: gfav('microsoft.com'),
    color: 'bg-[#00A4EF]',
    tagline: 'Microsoft Canada deals on Surface, Xbox, and software',
    topCategories: ['Surface', 'Xbox', 'software'],
    badges: ['international', 'ships-from-canada'],
  },
  'dell': {
    slug: 'dell',
    name: 'Dell',
    domain: 'dell.ca',
    logo: gfav('dell.ca'),
    color: 'bg-[#007DB8]',
    tagline: 'Dell Canada deals on laptops, desktops, and monitors',
    topCategories: ['laptops', 'desktops', 'monitors'],
    badges: ['international', 'ships-from-canada'],
  },
  'lenovo': {
    slug: 'lenovo',
    name: 'Lenovo',
    domain: 'lenovo.com',
    logo: gfav('lenovo.com'),
    color: 'bg-[#E2231A]',
    tagline: 'Lenovo Canada deals on ThinkPad, laptops, and tablets',
    topCategories: ['ThinkPad', 'laptops', 'tablets'],
    badges: ['international', 'ships-from-canada'],
  },
  'wayfair': {
    slug: 'wayfair',
    name: 'Wayfair',
    domain: 'wayfair.ca',
    logo: gfav('wayfair.ca'),
    color: 'bg-[#7B189F]',
    tagline: 'Wayfair Canada deals on furniture, rugs, and lighting',
    topCategories: ['furniture', 'rugs', 'lighting'],
    badges: ['international', 'ships-from-canada'],
  },
  'structube': {
    slug: 'structube',
    name: 'Structube',
    domain: 'structube.com',
    logo: gfav('structube.com'),
    color: 'bg-[#000000]',
    tagline: 'Structube Canada deals on modern furniture and home decor',
    topCategories: ['modern furniture', 'home decor'],
    badges: ['canadian-owned', 'canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'article': {
    slug: 'article',
    name: 'Article',
    domain: 'article.com',
    logo: gfav('article.com'),
    color: 'bg-[#000000]',
    tagline: 'Article Canada deals on sofas, beds, and dining furniture',
    topCategories: ['sofas', 'beds', 'dining furniture'],
    badges: ['canadian-owned', 'ships-from-canada'],
    isCanadian: true,
  },
  'sobeys': {
    slug: 'sobeys',
    name: 'Sobeys',
    domain: 'sobeys.com',
    logo: gfav('sobeys.com'),
    color: 'bg-[#00843D]',
    tagline: 'Sobeys Canada deals on groceries, fresh food, and pharmacy',
    topCategories: ['groceries', 'fresh food', 'pharmacy'],
    badges: ['canadian-owned', 'canadian-retailer'],
    isCanadian: true,
  },
  'metro': {
    slug: 'metro',
    name: 'Metro',
    domain: 'metro.ca',
    logo: gfav('metro.ca'),
    color: 'bg-[#E31837]',
    tagline: 'Metro Canada deals on groceries, produce, and pharmacy',
    topCategories: ['groceries', 'produce', 'pharmacy'],
    badges: ['canadian-owned', 'canadian-retailer'],
    isCanadian: true,
  },
  'no-frills': {
    slug: 'no-frills',
    name: 'No Frills',
    domain: 'nofrills.ca',
    logo: gfav('nofrills.ca'),
    color: 'bg-[#FFD100]',
    tagline: 'No Frills Canada deals on discount groceries and essentials',
    topCategories: ['discount groceries', 'essentials'],
    badges: ['canadian-retailer'],
    isCanadian: true,
  },
  'food-basics': {
    slug: 'food-basics',
    name: 'Food Basics',
    domain: 'foodbasics.ca',
    logo: gfav('foodbasics.ca'),
    color: 'bg-[#FF6600]',
    tagline: 'Food Basics Canada deals on discount groceries and produce',
    topCategories: ['discount groceries', 'produce'],
    badges: ['canadian-retailer'],
    isCanadian: true,
  },
  'freshco': {
    slug: 'freshco',
    name: 'FreshCo',
    domain: 'freshco.com',
    logo: gfav('freshco.com'),
    color: 'bg-[#00843D]',
    tagline: 'FreshCo Canada deals on fresh groceries and everyday savings',
    topCategories: ['fresh groceries', 'everyday savings'],
    badges: ['canadian-retailer'],
    isCanadian: true,
  },
  'dollarama': {
    slug: 'dollarama',
    name: 'Dollarama',
    domain: 'dollarama.com',
    logo: gfav('dollarama.com'),
    color: 'bg-[#FFD100]',
    tagline: 'Dollarama Canada deals on household, party, and seasonal items',
    topCategories: ['household', 'party', 'seasonal items'],
    badges: ['canadian-owned', 'canadian-retailer'],
    isCanadian: true,
  },
  'giant-tiger': {
    slug: 'giant-tiger',
    name: 'Giant Tiger',
    domain: 'gianttiger.com',
    logo: gfav('gianttiger.com'),
    color: 'bg-[#FF6600]',
    tagline: 'Giant Tiger Canada deals on apparel, groceries, and home',
    topCategories: ['apparel', 'groceries', 'home'],
    badges: ['canadian-owned', 'canadian-retailer'],
    isCanadian: true,
  },
  'toys-r-us': {
    slug: 'toys-r-us',
    name: 'Toys R Us',
    domain: 'toysrus.ca',
    logo: gfav('toysrus.ca'),
    color: 'bg-[#004990]',
    tagline: 'Toys R Us Canada deals on toys, games, and baby gear',
    topCategories: ['toys', 'games', 'baby gear'],
    badges: ['canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'mastermind-toys': {
    slug: 'mastermind-toys',
    name: 'Mastermind Toys',
    domain: 'mastermindtoys.com',
    logo: gfav('mastermindtoys.com'),
    color: 'bg-[#FF0000]',
    tagline: 'Mastermind Toys Canada deals on educational toys, games, and puzzles',
    topCategories: ['educational toys', 'games', 'puzzles'],
    badges: ['canadian-owned', 'canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'eb-games': {
    slug: 'eb-games',
    name: 'EB Games',
    domain: 'ebgames.ca',
    logo: gfav('ebgames.ca'),
    color: 'bg-[#FF0000]',
    tagline: 'EB Games Canada deals on video games, consoles, and collectibles',
    topCategories: ['video games', 'consoles', 'collectibles'],
    badges: ['canadian-retailer'],
    isCanadian: true,
  },
  'canada-computers': {
    slug: 'canada-computers',
    name: 'Canada Computers',
    domain: 'canadacomputers.com',
    logo: gfav('canadacomputers.com'),
    color: 'bg-[#E31837]',
    tagline: 'Canada Computers deals on PC parts, laptops, and peripherals',
    topCategories: ['PC parts', 'laptops', 'peripherals'],
    badges: ['canadian-owned', 'canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'memory-express': {
    slug: 'memory-express',
    name: 'Memory Express',
    domain: 'memoryexpress.com',
    logo: gfav('memoryexpress.com'),
    color: 'bg-[#003DA5]',
    tagline: 'Memory Express Canada deals on PC components, GPUs, and gaming',
    topCategories: ['PC components', 'GPUs', 'gaming'],
    badges: ['canadian-owned', 'canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'rona': {
    slug: 'rona',
    name: 'RONA',
    domain: 'rona.ca',
    logo: gfav('rona.ca'),
    color: 'bg-[#003DA5]',
    tagline: 'RONA Canada deals on building materials, tools, and hardware',
    topCategories: ['building materials', 'tools', 'hardware'],
    badges: ['canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'princess-auto': {
    slug: 'princess-auto',
    name: 'Princess Auto',
    domain: 'princessauto.com',
    logo: gfav('princessauto.com'),
    color: 'bg-[#E31837]',
    tagline: 'Princess Auto Canada deals on tools, automotive, and farm supplies',
    topCategories: ['tools', 'automotive', 'farm supplies'],
    badges: ['canadian-owned', 'canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'sail': {
    slug: 'sail',
    name: 'SAIL',
    domain: 'sail.ca',
    logo: gfav('sail.ca'),
    color: 'bg-[#00843D]',
    tagline: 'SAIL Canada deals on outdoor gear, hunting, and fishing',
    topCategories: ['outdoor gear', 'hunting', 'fishing'],
    badges: ['canadian-owned', 'canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'mec': {
    slug: 'mec',
    name: 'MEC',
    domain: 'mec.ca',
    logo: gfav('mec.ca'),
    color: 'bg-[#00843D]',
    tagline: 'MEC Canada deals on camping, hiking, and cycling gear',
    topCategories: ['camping', 'hiking', 'cycling gear'],
    badges: ['canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'sportium': {
    slug: 'sportium',
    name: 'Sportium',
    domain: 'sportium.ca',
    logo: gfav('sportium.ca'),
    color: 'bg-[#00529B]',
    tagline: 'Sportium Canada deals on hockey, soccer, and team sports',
    topCategories: ['hockey', 'soccer', 'team sports'],
    badges: ['canadian-retailer'],
    isCanadian: true,
  },
}

/**
 * Get store info by slug or name
 */
export function getStoreLogo(storeIdentifier: string): StoreInfo | null {
  // Try exact slug match first
  const slug = storeIdentifier.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')

  if (storeLogos[slug]) {
    return storeLogos[slug]
  }

  // Try finding by name
  const byName = Object.values(storeLogos).find(
    s => s.name.toLowerCase() === storeIdentifier.toLowerCase()
  )
  if (byName) return byName

  // Try partial match
  const partial = Object.values(storeLogos).find(
    s => s.slug.includes(slug) || slug.includes(s.slug) ||
         s.name.toLowerCase().includes(storeIdentifier.toLowerCase())
  )
  if (partial) return partial

  return null
}

/**
 * Generate a logo URL for any domain using Clearbit
 */
export function generateLogoUrl(domain: string): string {
  return `https://logo.clearbit.com/${domain.replace('www.', '')}`
}

/**
 * Get all stores as array
 */
export function getAllStores(): StoreInfo[] {
  return Object.values(storeLogos)
}

/**
 * Featured stores for homepage
 */
export const featuredStores: StoreInfo[] = [
  storeLogos['amazon'],
  storeLogos['walmart'],
  storeLogos['costco'],
  storeLogos['best-buy'],
  storeLogos['canadian-tire'],
  storeLogos['shoppers'],
]
