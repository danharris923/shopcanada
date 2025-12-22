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

export interface StoreInfo {
  slug: string
  name: string
  domain: string
  logo: string
  color: string
  tagline: string           // Short descriptive line for store cards
  badges?: StoreBadge[]     // Optional informational badges
  isCanadian?: boolean      // Canadian-owned flag
}

// Helper to generate Google favicon URL (most reliable)
const gfav = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`

// Default tagline for stores without specific microcopy
const DEFAULT_TAGLINE = 'Deals available to Canadian shoppers'

// Map store slugs to domains and logos
export const storeLogos: Record<string, StoreInfo> = {
  // Major Retailers
  'amazon': {
    slug: 'amazon',
    name: 'Amazon.ca',
    domain: 'amazon.ca',
    logo: gfav('amazon.ca'),
    color: 'bg-[#FF9900]',
    tagline: 'International retailer with Canadian pricing and fulfillment',
    badges: ['international', 'ships-from-canada'],
  },
  'walmart': {
    slug: 'walmart',
    name: 'Walmart Canada',
    domain: 'walmart.ca',
    logo: gfav('walmart.ca'),
    color: 'bg-[#0071CE]',
    tagline: 'International retailer with stores across Canada',
    badges: ['international', 'ships-from-canada'],
  },
  'costco': {
    slug: 'costco',
    name: 'Costco',
    domain: 'costco.ca',
    logo: gfav('costco.ca'),
    color: 'bg-[#E31837]',
    tagline: 'Membership retailer with Canadian warehouses and pricing',
    badges: ['international', 'ships-from-canada'],
  },
  'best-buy': {
    slug: 'best-buy',
    name: 'Best Buy',
    domain: 'bestbuy.ca',
    logo: gfav('bestbuy.ca'),
    color: 'bg-[#0046BE]',
    tagline: 'Electronics retailer serving Canadian shoppers nationwide',
    badges: ['international', 'ships-from-canada'],
  },
  'canadian-tire': {
    slug: 'canadian-tire',
    name: 'Canadian Tire',
    domain: 'canadiantire.ca',
    logo: gfav('canadiantire.ca'),
    color: 'bg-[#D52B1E]',
    tagline: 'Canadian retailer serving shoppers coast to coast',
    badges: ['canadian-owned', 'canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'shoppers': {
    slug: 'shoppers',
    name: 'Shoppers Drug Mart',
    domain: 'shoppersdrugmart.ca',
    logo: gfav('shoppersdrugmart.ca'),
    color: 'bg-[#E31837]',
    tagline: 'Canadian pharmacy chain with nationwide locations',
    badges: ['canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'home-depot': {
    slug: 'home-depot',
    name: 'Home Depot',
    domain: 'homedepot.ca',
    logo: gfav('homedepot.ca'),
    color: 'bg-[#F96302]',
    tagline: 'Home improvement retailer with Canadian stores and delivery',
    badges: ['international', 'ships-from-canada'],
  },
  'lowes': {
    slug: 'lowes',
    name: "Lowe's Canada",
    domain: 'lowes.ca',
    logo: gfav('lowes.ca'),
    color: 'bg-[#004990]',
    tagline: 'Home improvement retailer serving Canadian homeowners',
    badges: ['international', 'ships-from-canada'],
  },
  'staples': {
    slug: 'staples',
    name: 'Staples',
    domain: 'staples.ca',
    logo: gfav('staples.ca'),
    color: 'bg-[#CC0000]',
    tagline: 'Office supplies retailer with Canadian locations',
    badges: ['international', 'ships-from-canada'],
  },
  'sport-chek': {
    slug: 'sport-chek',
    name: 'Sport Chek',
    domain: 'sportchek.ca',
    logo: gfav('sportchek.ca'),
    color: 'bg-[#00529B]',
    tagline: 'Canadian sporting goods retailer nationwide',
    badges: ['canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'the-bay': {
    slug: 'the-bay',
    name: "Hudson's Bay",
    domain: 'thebay.com',
    logo: gfav('thebay.com'),
    color: 'bg-[#000000]',
    tagline: 'Historic Canadian department store chain',
    badges: ['canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'indigo': {
    slug: 'indigo',
    name: 'Indigo',
    domain: 'indigo.ca',
    logo: gfav('indigo.ca'),
    color: 'bg-[#5C2D91]',
    tagline: 'Canadian-owned bookstore with nationwide shipping',
    badges: ['canadian-owned', 'canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'well-ca': {
    slug: 'well-ca',
    name: 'Well.ca',
    domain: 'well.ca',
    logo: gfav('well.ca'),
    color: 'bg-[#7AB800]',
    tagline: 'Canadian online retailer shipping from Ontario',
    badges: ['canadian-owned', 'ships-from-canada'],
    isCanadian: true,
  },
  'london-drugs': {
    slug: 'london-drugs',
    name: 'London Drugs',
    domain: 'londondrugs.com',
    logo: gfav('londondrugs.com'),
    color: 'bg-[#003DA5]',
    tagline: 'Canadian-owned retailer based in Western Canada',
    badges: ['canadian-owned', 'canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'real-canadian-superstore': {
    slug: 'real-canadian-superstore',
    name: 'Real Canadian Superstore',
    domain: 'realcanadiansuperstore.ca',
    logo: gfav('realcanadiansuperstore.ca'),
    color: 'bg-[#E31837]',
    tagline: 'Canadian grocery chain with locations nationwide',
    badges: ['canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'loblaws': {
    slug: 'loblaws',
    name: 'Loblaws',
    domain: 'loblaws.ca',
    logo: gfav('loblaws.ca'),
    color: 'bg-[#E31837]',
    tagline: 'Canadian-owned grocery retailer nationwide',
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
    tagline: 'Tech retailer with Canadian site and shipping',
    badges: ['international', 'ships-from-canada'],
  },
  'the-source': {
    slug: 'the-source',
    name: 'The Source',
    domain: 'thesource.ca',
    logo: gfav('thesource.ca'),
    color: 'bg-[#E4002B]',
    tagline: 'Canadian electronics retailer with nationwide stores',
    badges: ['canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'bed-bath-beyond': {
    slug: 'bed-bath-beyond',
    name: 'Bed Bath & Beyond',
    domain: 'bedbathandbeyond.ca',
    logo: gfav('bedbathandbeyond.ca'),
    color: 'bg-[#003399]',
    tagline: DEFAULT_TAGLINE,
    badges: ['international'],
  },
  'ikea': {
    slug: 'ikea',
    name: 'IKEA',
    domain: 'ikea.ca',
    logo: gfav('ikea.ca'),
    color: 'bg-[#0051BA]',
    tagline: 'International brand with stores and delivery across Canada',
    badges: ['international', 'ships-from-canada'],
  },
  'marks': {
    slug: 'marks',
    name: "Mark's",
    domain: 'marks.com',
    logo: gfav('marks.com'),
    color: 'bg-[#D52B1E]',
    tagline: 'Canadian workwear and apparel retailer',
    badges: ['canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'atmosphere': {
    slug: 'atmosphere',
    name: 'Atmosphere',
    domain: 'atmosphere.ca',
    logo: gfav('atmosphere.ca'),
    color: 'bg-[#00529B]',
    tagline: 'Canadian outdoor gear retailer',
    badges: ['canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'winners': {
    slug: 'winners',
    name: 'Winners',
    domain: 'winners.ca',
    logo: gfav('winners.ca'),
    color: 'bg-[#E31837]',
    tagline: 'Off-price retailer with Canadian locations',
    badges: ['canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'homesense': {
    slug: 'homesense',
    name: 'HomeSense',
    domain: 'homesense.ca',
    logo: gfav('homesense.ca'),
    color: 'bg-[#00529B]',
    tagline: 'Home decor retailer with Canadian stores',
    badges: ['canadian-retailer'],
    isCanadian: true,
  },
  'marshalls': {
    slug: 'marshalls',
    name: 'Marshalls',
    domain: 'marshalls.ca',
    logo: gfav('marshalls.ca'),
    color: 'bg-[#000000]',
    tagline: 'Off-price fashion retailer across Canada',
    badges: ['canadian-retailer'],
    isCanadian: true,
  },
  'old-navy': {
    slug: 'old-navy',
    name: 'Old Navy',
    domain: 'oldnavy.ca',
    logo: gfav('oldnavy.ca'),
    color: 'bg-[#003E7E]',
    tagline: 'Family apparel with Canadian stores and shipping',
    badges: ['international', 'ships-from-canada'],
  },
  'gap': {
    slug: 'gap',
    name: 'Gap',
    domain: 'gapcanada.ca',
    logo: gfav('gap.com'),
    color: 'bg-[#000000]',
    tagline: 'Global brand with Canadian site and stores',
    badges: ['international', 'ships-from-canada'],
  },
  'h-m': {
    slug: 'h-m',
    name: 'H&M',
    domain: 'hm.com',
    logo: gfav('hm.com'),
    color: 'bg-[#E50010]',
    tagline: 'International fashion with Canadian locations',
    badges: ['international', 'ships-from-canada'],
  },
  'zara': {
    slug: 'zara',
    name: 'Zara',
    domain: 'zara.com',
    logo: gfav('zara.com'),
    color: 'bg-[#000000]',
    tagline: 'International fashion with Canadian stores',
    badges: ['international', 'ships-from-canada'],
  },
  'uniqlo': {
    slug: 'uniqlo',
    name: 'Uniqlo',
    domain: 'uniqlo.com',
    logo: gfav('uniqlo.com'),
    color: 'bg-[#FF0000]',
    tagline: 'Japanese brand with Canadian locations',
    badges: ['international', 'ships-from-canada'],
  },
  'lululemon': {
    slug: 'lululemon',
    name: 'lululemon',
    domain: 'lululemon.com',
    logo: gfav('lululemon.com'),
    color: 'bg-[#D31334]',
    tagline: 'Canadian-founded athletic apparel brand',
    badges: ['canadian-owned', 'ships-from-canada'],
    isCanadian: true,
  },
  'aritzia': {
    slug: 'aritzia',
    name: 'Aritzia',
    domain: 'aritzia.com',
    logo: gfav('aritzia.com'),
    color: 'bg-[#000000]',
    tagline: 'Canadian fashion retailer based in Vancouver',
    badges: ['canadian-owned', 'canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'roots': {
    slug: 'roots',
    name: 'Roots',
    domain: 'roots.com',
    logo: gfav('roots.com'),
    color: 'bg-[#8B4513]',
    tagline: 'Canadian-owned lifestyle brand',
    badges: ['canadian-owned', 'made-in-canada', 'ships-from-canada'],
    isCanadian: true,
  },
  'canada-goose': {
    slug: 'canada-goose',
    name: 'Canada Goose',
    domain: 'canadagoose.com',
    logo: gfav('canadagoose.com'),
    color: 'bg-[#000000]',
    tagline: 'Canadian luxury outerwear brand',
    badges: ['canadian-owned', 'made-in-canada'],
    isCanadian: true,
  },
  'sephora': {
    slug: 'sephora',
    name: 'Sephora',
    domain: 'sephora.com',
    logo: gfav('sephora.com'),
    color: 'bg-[#000000]',
    tagline: 'Beauty retailer with Canadian stores and shipping',
    badges: ['international', 'ships-from-canada'],
  },
  'bath-body-works': {
    slug: 'bath-body-works',
    name: 'Bath & Body Works',
    domain: 'bathandbodyworks.ca',
    logo: gfav('bathandbodyworks.com'),
    color: 'bg-[#004C91]',
    tagline: 'Body care retailer with Canadian locations',
    badges: ['international', 'ships-from-canada'],
  },
  'petsmart': {
    slug: 'petsmart',
    name: 'PetSmart',
    domain: 'petsmart.ca',
    logo: gfav('petsmart.ca'),
    color: 'bg-[#0054A4]',
    tagline: 'Pet supplies retailer with Canadian stores',
    badges: ['international', 'ships-from-canada'],
  },
  'pet-valu': {
    slug: 'pet-valu',
    name: 'Pet Valu',
    domain: 'petvalu.ca',
    logo: gfav('petvalu.ca'),
    color: 'bg-[#E31837]',
    tagline: 'Canadian-owned pet specialty retailer',
    badges: ['canadian-owned', 'canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'michaels': {
    slug: 'michaels',
    name: 'Michaels',
    domain: 'michaels.com',
    logo: gfav('michaels.com'),
    color: 'bg-[#D52B1E]',
    tagline: 'Arts and crafts retailer with Canadian stores',
    badges: ['international', 'ships-from-canada'],
  },
  'foot-locker': {
    slug: 'foot-locker',
    name: 'Foot Locker',
    domain: 'footlocker.ca',
    logo: gfav('footlocker.ca'),
    color: 'bg-[#000000]',
    tagline: 'Athletic footwear with Canadian locations',
    badges: ['international', 'ships-from-canada'],
  },
  'nike': {
    slug: 'nike',
    name: 'Nike',
    domain: 'nike.com',
    logo: gfav('nike.com'),
    color: 'bg-[#000000]',
    tagline: 'Global brand with official Canadian store',
    badges: ['international', 'ships-from-canada'],
  },
  'adidas': {
    slug: 'adidas',
    name: 'Adidas',
    domain: 'adidas.ca',
    logo: gfav('adidas.ca'),
    color: 'bg-[#000000]',
    tagline: 'Global brand with Canadian site and stores',
    badges: ['international', 'ships-from-canada'],
  },
  'apple': {
    slug: 'apple',
    name: 'Apple',
    domain: 'apple.com',
    logo: gfav('apple.com'),
    color: 'bg-[#000000]',
    tagline: 'Global brand with official Canadian store and pricing',
    badges: ['international', 'ships-from-canada'],
  },
  'microsoft': {
    slug: 'microsoft',
    name: 'Microsoft',
    domain: 'microsoft.com',
    logo: gfav('microsoft.com'),
    color: 'bg-[#00A4EF]',
    tagline: 'Global tech brand with Canadian pricing',
    badges: ['international', 'ships-from-canada'],
  },
  'dell': {
    slug: 'dell',
    name: 'Dell',
    domain: 'dell.ca',
    logo: gfav('dell.ca'),
    color: 'bg-[#007DB8]',
    tagline: 'PC manufacturer with Canadian site and support',
    badges: ['international', 'ships-from-canada'],
  },
  'lenovo': {
    slug: 'lenovo',
    name: 'Lenovo',
    domain: 'lenovo.com',
    logo: gfav('lenovo.com'),
    color: 'bg-[#E2231A]',
    tagline: 'Global PC brand with Canadian site and shipping',
    badges: ['international', 'ships-from-canada'],
  },
  'wayfair': {
    slug: 'wayfair',
    name: 'Wayfair',
    domain: 'wayfair.ca',
    logo: gfav('wayfair.ca'),
    color: 'bg-[#7B189F]',
    tagline: 'Home goods retailer serving Canadian shoppers',
    badges: ['international', 'ships-from-canada'],
  },
  'structube': {
    slug: 'structube',
    name: 'Structube',
    domain: 'structube.com',
    logo: gfav('structube.com'),
    color: 'bg-[#000000]',
    tagline: 'Canadian furniture retailer based in Montreal',
    badges: ['canadian-owned', 'canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'article': {
    slug: 'article',
    name: 'Article',
    domain: 'article.com',
    logo: gfav('article.com'),
    color: 'bg-[#000000]',
    tagline: 'Canadian furniture company based in Vancouver',
    badges: ['canadian-owned', 'ships-from-canada'],
    isCanadian: true,
  },
  'sobeys': {
    slug: 'sobeys',
    name: 'Sobeys',
    domain: 'sobeys.com',
    logo: gfav('sobeys.com'),
    color: 'bg-[#00843D]',
    tagline: 'Canadian-owned grocery chain',
    badges: ['canadian-owned', 'canadian-retailer'],
    isCanadian: true,
  },
  'metro': {
    slug: 'metro',
    name: 'Metro',
    domain: 'metro.ca',
    logo: gfav('metro.ca'),
    color: 'bg-[#E31837]',
    tagline: 'Canadian grocery retailer in Ontario and Quebec',
    badges: ['canadian-owned', 'canadian-retailer'],
    isCanadian: true,
  },
  'no-frills': {
    slug: 'no-frills',
    name: 'No Frills',
    domain: 'nofrills.ca',
    logo: gfav('nofrills.ca'),
    color: 'bg-[#FFD100]',
    tagline: 'Canadian discount grocery chain',
    badges: ['canadian-retailer'],
    isCanadian: true,
  },
  'food-basics': {
    slug: 'food-basics',
    name: 'Food Basics',
    domain: 'foodbasics.ca',
    logo: gfav('foodbasics.ca'),
    color: 'bg-[#FF6600]',
    tagline: 'Canadian discount grocery chain',
    badges: ['canadian-retailer'],
    isCanadian: true,
  },
  'freshco': {
    slug: 'freshco',
    name: 'FreshCo',
    domain: 'freshco.com',
    logo: gfav('freshco.com'),
    color: 'bg-[#00843D]',
    tagline: 'Canadian value grocery from Sobeys',
    badges: ['canadian-retailer'],
    isCanadian: true,
  },
  'dollarama': {
    slug: 'dollarama',
    name: 'Dollarama',
    domain: 'dollarama.com',
    logo: gfav('dollarama.com'),
    color: 'bg-[#FFD100]',
    tagline: 'Canadian-owned dollar store chain',
    badges: ['canadian-owned', 'canadian-retailer'],
    isCanadian: true,
  },
  'giant-tiger': {
    slug: 'giant-tiger',
    name: 'Giant Tiger',
    domain: 'gianttiger.com',
    logo: gfav('gianttiger.com'),
    color: 'bg-[#FF6600]',
    tagline: 'Canadian-owned discount retailer',
    badges: ['canadian-owned', 'canadian-retailer'],
    isCanadian: true,
  },
  'toys-r-us': {
    slug: 'toys-r-us',
    name: 'Toys R Us',
    domain: 'toysrus.ca',
    logo: gfav('toysrus.ca'),
    color: 'bg-[#004990]',
    tagline: 'Toy retailer with Canadian stores',
    badges: ['canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'mastermind-toys': {
    slug: 'mastermind-toys',
    name: 'Mastermind Toys',
    domain: 'mastermindtoys.com',
    logo: gfav('mastermindtoys.com'),
    color: 'bg-[#FF0000]',
    tagline: 'Canadian-owned toy specialty retailer',
    badges: ['canadian-owned', 'canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'eb-games': {
    slug: 'eb-games',
    name: 'EB Games',
    domain: 'ebgames.ca',
    logo: gfav('ebgames.ca'),
    color: 'bg-[#FF0000]',
    tagline: 'Video game retailer with Canadian stores',
    badges: ['canadian-retailer'],
    isCanadian: true,
  },
  'canada-computers': {
    slug: 'canada-computers',
    name: 'Canada Computers',
    domain: 'canadacomputers.com',
    logo: gfav('canadacomputers.com'),
    color: 'bg-[#E31837]',
    tagline: 'Canadian-owned tech retailer',
    badges: ['canadian-owned', 'canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'memory-express': {
    slug: 'memory-express',
    name: 'Memory Express',
    domain: 'memoryexpress.com',
    logo: gfav('memoryexpress.com'),
    color: 'bg-[#003DA5]',
    tagline: 'Canadian computer retailer based in Calgary',
    badges: ['canadian-owned', 'canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'rona': {
    slug: 'rona',
    name: 'RONA',
    domain: 'rona.ca',
    logo: gfav('rona.ca'),
    color: 'bg-[#003DA5]',
    tagline: 'Canadian home improvement retailer',
    badges: ['canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'princess-auto': {
    slug: 'princess-auto',
    name: 'Princess Auto',
    domain: 'princessauto.com',
    logo: gfav('princessauto.com'),
    color: 'bg-[#E31837]',
    tagline: 'Canadian-owned tools and equipment retailer',
    badges: ['canadian-owned', 'canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'sail': {
    slug: 'sail',
    name: 'SAIL',
    domain: 'sail.ca',
    logo: gfav('sail.ca'),
    color: 'bg-[#00843D]',
    tagline: 'Canadian outdoor and hunting retailer',
    badges: ['canadian-owned', 'canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'mec': {
    slug: 'mec',
    name: 'MEC',
    domain: 'mec.ca',
    logo: gfav('mec.ca'),
    color: 'bg-[#00843D]',
    tagline: 'Canadian outdoor gear retailer',
    badges: ['canadian-retailer', 'ships-from-canada'],
    isCanadian: true,
  },
  'sportium': {
    slug: 'sportium',
    name: 'Sportium',
    domain: 'sportium.ca',
    logo: gfav('sportium.ca'),
    color: 'bg-[#00529B]',
    tagline: 'Canadian sporting goods retailer in Quebec',
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
