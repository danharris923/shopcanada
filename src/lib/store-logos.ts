/**
 * Store Logo URLs - High-quality logos via Clearbit & Google
 * Using Clearbit Logo API (https://logo.clearbit.com/domain.com)
 */

export interface StoreInfo {
  slug: string
  name: string
  domain: string
  logo: string
  color: string
}

// Helper to generate Google favicon URL (most reliable)
const gfav = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`

// Map store slugs to domains and logos
export const storeLogos: Record<string, StoreInfo> = {
  // Major Canadian Retailers
  'amazon': {
    slug: 'amazon',
    name: 'Amazon.ca',
    domain: 'amazon.ca',
    logo: gfav('amazon.ca'),
    color: 'bg-[#FF9900]'
  },
  'walmart': {
    slug: 'walmart',
    name: 'Walmart Canada',
    domain: 'walmart.ca',
    logo: gfav('walmart.ca'),
    color: 'bg-[#0071CE]'
  },
  'costco': {
    slug: 'costco',
    name: 'Costco',
    domain: 'costco.ca',
    logo: gfav('costco.ca'),
    color: 'bg-[#E31837]'
  },
  'best-buy': {
    slug: 'best-buy',
    name: 'Best Buy',
    domain: 'bestbuy.ca',
    logo: gfav('bestbuy.ca'),
    color: 'bg-[#0046BE]'
  },
  'canadian-tire': {
    slug: 'canadian-tire',
    name: 'Canadian Tire',
    domain: 'canadiantire.ca',
    logo: gfav('canadiantire.ca'),
    color: 'bg-[#D52B1E]'
  },
  'shoppers': {
    slug: 'shoppers',
    name: 'Shoppers Drug Mart',
    domain: 'shoppersdrugmart.ca',
    logo: gfav('shoppersdrugmart.ca'),
    color: 'bg-[#E31837]'
  },
  'home-depot': {
    slug: 'home-depot',
    name: 'Home Depot',
    domain: 'homedepot.ca',
    logo: gfav('homedepot.ca'),
    color: 'bg-[#F96302]'
  },
  'lowes': {
    slug: 'lowes',
    name: "Lowe's Canada",
    domain: 'lowes.ca',
    logo: gfav('lowes.ca'),
    color: 'bg-[#004990]'
  },
  'staples': {
    slug: 'staples',
    name: 'Staples',
    domain: 'staples.ca',
    logo: gfav('staples.ca'),
    color: 'bg-[#CC0000]'
  },
  'sport-chek': {
    slug: 'sport-chek',
    name: 'Sport Chek',
    domain: 'sportchek.ca',
    logo: gfav('sportchek.ca'),
    color: 'bg-[#00529B]'
  },
  'the-bay': {
    slug: 'the-bay',
    name: "Hudson's Bay",
    domain: 'thebay.com',
    logo: gfav('thebay.com'),
    color: 'bg-[#000000]'
  },
  'indigo': {
    slug: 'indigo',
    name: 'Indigo',
    domain: 'indigo.ca',
    logo: gfav('indigo.ca'),
    color: 'bg-[#5C2D91]'
  },
  'well-ca': {
    slug: 'well-ca',
    name: 'Well.ca',
    domain: 'well.ca',
    logo: gfav('well.ca'),
    color: 'bg-[#7AB800]'
  },
  'london-drugs': {
    slug: 'london-drugs',
    name: 'London Drugs',
    domain: 'londondrugs.com',
    logo: gfav('londondrugs.com'),
    color: 'bg-[#003DA5]'
  },
  'real-canadian-superstore': {
    slug: 'real-canadian-superstore',
    name: 'Real Canadian Superstore',
    domain: 'realcanadiansuperstore.ca',
    logo: gfav('realcanadiansuperstore.ca'),
    color: 'bg-[#E31837]'
  },
  'loblaws': {
    slug: 'loblaws',
    name: 'Loblaws',
    domain: 'loblaws.ca',
    logo: gfav('loblaws.ca'),
    color: 'bg-[#E31837]'
  },

  // Additional stores from deals
  'newegg': {
    slug: 'newegg',
    name: 'Newegg',
    domain: 'newegg.ca',
    logo: gfav('newegg.ca'),
    color: 'bg-[#FF6600]'
  },
  'the-source': {
    slug: 'the-source',
    name: 'The Source',
    domain: 'thesource.ca',
    logo: gfav('thesource.ca'),
    color: 'bg-[#E4002B]'
  },
  'bed-bath-beyond': {
    slug: 'bed-bath-beyond',
    name: 'Bed Bath & Beyond',
    domain: 'bedbathandbeyond.ca',
    logo: gfav('bedbathandbeyond.ca'),
    color: 'bg-[#003399]'
  },
  'ikea': {
    slug: 'ikea',
    name: 'IKEA',
    domain: 'ikea.ca',
    logo: gfav('ikea.ca'),
    color: 'bg-[#0051BA]'
  },
  'marks': {
    slug: 'marks',
    name: "Mark's",
    domain: 'marks.com',
    logo: gfav('marks.com'),
    color: 'bg-[#D52B1E]'
  },
  'atmosphere': {
    slug: 'atmosphere',
    name: 'Atmosphere',
    domain: 'atmosphere.ca',
    logo: gfav('atmosphere.ca'),
    color: 'bg-[#00529B]'
  },
  'winners': {
    slug: 'winners',
    name: 'Winners',
    domain: 'winners.ca',
    logo: gfav('winners.ca'),
    color: 'bg-[#E31837]'
  },
  'homesense': {
    slug: 'homesense',
    name: 'HomeSense',
    domain: 'homesense.ca',
    logo: gfav('homesense.ca'),
    color: 'bg-[#00529B]'
  },
  'marshalls': {
    slug: 'marshalls',
    name: 'Marshalls',
    domain: 'marshalls.ca',
    logo: gfav('marshalls.ca'),
    color: 'bg-[#000000]'
  },
  'old-navy': {
    slug: 'old-navy',
    name: 'Old Navy',
    domain: 'oldnavy.ca',
    logo: gfav('oldnavy.ca'),
    color: 'bg-[#003E7E]'
  },
  'gap': {
    slug: 'gap',
    name: 'Gap',
    domain: 'gapcanada.ca',
    logo: gfav('gap.com'),
    color: 'bg-[#000000]'
  },
  'h-m': {
    slug: 'h-m',
    name: 'H&M',
    domain: 'hm.com',
    logo: gfav('hm.com'),
    color: 'bg-[#E50010]'
  },
  'zara': {
    slug: 'zara',
    name: 'Zara',
    domain: 'zara.com',
    logo: gfav('zara.com'),
    color: 'bg-[#000000]'
  },
  'uniqlo': {
    slug: 'uniqlo',
    name: 'Uniqlo',
    domain: 'uniqlo.com',
    logo: gfav('uniqlo.com'),
    color: 'bg-[#FF0000]'
  },
  'lululemon': {
    slug: 'lululemon',
    name: 'lululemon',
    domain: 'lululemon.com',
    logo: gfav('lululemon.com'),
    color: 'bg-[#D31334]'
  },
  'aritzia': {
    slug: 'aritzia',
    name: 'Aritzia',
    domain: 'aritzia.com',
    logo: gfav('aritzia.com'),
    color: 'bg-[#000000]'
  },
  'roots': {
    slug: 'roots',
    name: 'Roots',
    domain: 'roots.com',
    logo: gfav('roots.com'),
    color: 'bg-[#8B4513]'
  },
  'canada-goose': {
    slug: 'canada-goose',
    name: 'Canada Goose',
    domain: 'canadagoose.com',
    logo: gfav('canadagoose.com'),
    color: 'bg-[#000000]'
  },
  'sephora': {
    slug: 'sephora',
    name: 'Sephora',
    domain: 'sephora.com',
    logo: gfav('sephora.com'),
    color: 'bg-[#000000]'
  },
  'bath-body-works': {
    slug: 'bath-body-works',
    name: 'Bath & Body Works',
    domain: 'bathandbodyworks.ca',
    logo: gfav('bathandbodyworks.com'),
    color: 'bg-[#004C91]'
  },
  'petsmart': {
    slug: 'petsmart',
    name: 'PetSmart',
    domain: 'petsmart.ca',
    logo: gfav('petsmart.ca'),
    color: 'bg-[#0054A4]'
  },
  'pet-valu': {
    slug: 'pet-valu',
    name: 'Pet Valu',
    domain: 'petvalu.ca',
    logo: gfav('petvalu.ca'),
    color: 'bg-[#E31837]'
  },
  'michaels': {
    slug: 'michaels',
    name: 'Michaels',
    domain: 'michaels.com',
    logo: gfav('michaels.com'),
    color: 'bg-[#D52B1E]'
  },
  'foot-locker': {
    slug: 'foot-locker',
    name: 'Foot Locker',
    domain: 'footlocker.ca',
    logo: gfav('footlocker.ca'),
    color: 'bg-[#000000]'
  },
  'nike': {
    slug: 'nike',
    name: 'Nike',
    domain: 'nike.com',
    logo: gfav('nike.com'),
    color: 'bg-[#000000]'
  },
  'adidas': {
    slug: 'adidas',
    name: 'Adidas',
    domain: 'adidas.ca',
    logo: gfav('adidas.ca'),
    color: 'bg-[#000000]'
  },
  'apple': {
    slug: 'apple',
    name: 'Apple',
    domain: 'apple.com',
    logo: gfav('apple.com'),
    color: 'bg-[#000000]'
  },
  'microsoft': {
    slug: 'microsoft',
    name: 'Microsoft',
    domain: 'microsoft.com',
    logo: gfav('microsoft.com'),
    color: 'bg-[#00A4EF]'
  },
  'dell': {
    slug: 'dell',
    name: 'Dell',
    domain: 'dell.ca',
    logo: gfav('dell.ca'),
    color: 'bg-[#007DB8]'
  },
  'lenovo': {
    slug: 'lenovo',
    name: 'Lenovo',
    domain: 'lenovo.com',
    logo: gfav('lenovo.com'),
    color: 'bg-[#E2231A]'
  },
  'wayfair': {
    slug: 'wayfair',
    name: 'Wayfair',
    domain: 'wayfair.ca',
    logo: gfav('wayfair.ca'),
    color: 'bg-[#7B189F]'
  },
  'structube': {
    slug: 'structube',
    name: 'Structube',
    domain: 'structube.com',
    logo: gfav('structube.com'),
    color: 'bg-[#000000]'
  },
  'article': {
    slug: 'article',
    name: 'Article',
    domain: 'article.com',
    logo: gfav('article.com'),
    color: 'bg-[#000000]'
  },
  'sobeys': {
    slug: 'sobeys',
    name: 'Sobeys',
    domain: 'sobeys.com',
    logo: gfav('sobeys.com'),
    color: 'bg-[#00843D]'
  },
  'metro': {
    slug: 'metro',
    name: 'Metro',
    domain: 'metro.ca',
    logo: gfav('metro.ca'),
    color: 'bg-[#E31837]'
  },
  'no-frills': {
    slug: 'no-frills',
    name: 'No Frills',
    domain: 'nofrills.ca',
    logo: gfav('nofrills.ca'),
    color: 'bg-[#FFD100]'
  },
  'food-basics': {
    slug: 'food-basics',
    name: 'Food Basics',
    domain: 'foodbasics.ca',
    logo: gfav('foodbasics.ca'),
    color: 'bg-[#FF6600]'
  },
  'freshco': {
    slug: 'freshco',
    name: 'FreshCo',
    domain: 'freshco.com',
    logo: gfav('freshco.com'),
    color: 'bg-[#00843D]'
  },
  'dollarama': {
    slug: 'dollarama',
    name: 'Dollarama',
    domain: 'dollarama.com',
    logo: gfav('dollarama.com'),
    color: 'bg-[#FFD100]'
  },
  'giant-tiger': {
    slug: 'giant-tiger',
    name: 'Giant Tiger',
    domain: 'gianttiger.com',
    logo: gfav('gianttiger.com'),
    color: 'bg-[#FF6600]'
  },
  'toys-r-us': {
    slug: 'toys-r-us',
    name: 'Toys R Us',
    domain: 'toysrus.ca',
    logo: gfav('toysrus.ca'),
    color: 'bg-[#004990]'
  },
  'mastermind-toys': {
    slug: 'mastermind-toys',
    name: 'Mastermind Toys',
    domain: 'mastermindtoys.com',
    logo: gfav('mastermindtoys.com'),
    color: 'bg-[#FF0000]'
  },
  'eb-games': {
    slug: 'eb-games',
    name: 'EB Games',
    domain: 'ebgames.ca',
    logo: gfav('ebgames.ca'),
    color: 'bg-[#FF0000]'
  },
  'canada-computers': {
    slug: 'canada-computers',
    name: 'Canada Computers',
    domain: 'canadacomputers.com',
    logo: gfav('canadacomputers.com'),
    color: 'bg-[#E31837]'
  },
  'memory-express': {
    slug: 'memory-express',
    name: 'Memory Express',
    domain: 'memoryexpress.com',
    logo: gfav('memoryexpress.com'),
    color: 'bg-[#003DA5]'
  },
  'rona': {
    slug: 'rona',
    name: 'RONA',
    domain: 'rona.ca',
    logo: gfav('rona.ca'),
    color: 'bg-[#003DA5]'
  },
  'princess-auto': {
    slug: 'princess-auto',
    name: 'Princess Auto',
    domain: 'princessauto.com',
    logo: gfav('princessauto.com'),
    color: 'bg-[#E31837]'
  },
  'sail': {
    slug: 'sail',
    name: 'SAIL',
    domain: 'sail.ca',
    logo: gfav('sail.ca'),
    color: 'bg-[#00843D]'
  },
  'mec': {
    slug: 'mec',
    name: 'MEC',
    domain: 'mec.ca',
    logo: gfav('mec.ca'),
    color: 'bg-[#00843D]'
  },
  'sportium': {
    slug: 'sportium',
    name: 'Sportium',
    domain: 'sportium.ca',
    logo: gfav('sportium.ca'),
    color: 'bg-[#00529B]'
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
