// Store-specific information for FAQs - returns, loyalty programs, shipping, etc.

export interface StoreInfo {
  name: string
  returnPolicy: string
  loyaltyProgram?: {
    name: string
    description: string
  }
  shippingInfo: string
  priceMatch?: string
}

export const storeInfo: Record<string, StoreInfo> = {
  'amazon': {
    name: 'Amazon.ca',
    returnPolicy: 'Most items can be returned within 30 days of delivery for a full refund. Some items have extended holiday return windows.',
    loyaltyProgram: {
      name: 'Amazon Prime',
      description: 'Prime members get free two-day shipping, access to Prime Video, Prime Music, and exclusive deals. $99/year or $9.99/month.',
    },
    shippingInfo: 'Free shipping on orders over $35 for non-Prime members. Prime members get free two-day shipping on eligible items.',
    priceMatch: 'Amazon does not price match, but prices are adjusted frequently.',
  },
  'walmart': {
    name: 'Walmart Canada',
    returnPolicy: 'Most items can be returned within 90 days with receipt. Electronics have a 30-day return window.',
    loyaltyProgram: {
      name: 'Walmart+',
      description: 'Members get free shipping with no minimum, free grocery delivery, and member prices on fuel.',
    },
    shippingInfo: 'Free shipping on orders over $35. Free store pickup available.',
    priceMatch: 'Walmart offers Ad Match - they will match competitor advertised prices in-store.',
  },
  'costco': {
    name: 'Costco',
    returnPolicy: 'Costco has a 100% satisfaction guarantee with generous return policy on most items. Electronics must be returned within 90 days.',
    loyaltyProgram: {
      name: 'Costco Membership',
      description: 'Gold Star ($65/year) or Executive ($130/year with 2% reward). Membership required to shop. Executive members earn 2% back annually.',
    },
    shippingInfo: 'Free shipping on most items over $75. Some items ship free with no minimum.',
  },
  'best-buy': {
    name: 'Best Buy',
    returnPolicy: 'Standard 15-day return window. My Best Buy members get 30 days. Activatable devices have 14-day return policy.',
    loyaltyProgram: {
      name: 'My Best Buy',
      description: 'Free to join. Earn points on purchases, get member-only offers, and extended return windows.',
    },
    shippingInfo: 'Free shipping on orders over $35. Free store pickup available, often same-day.',
    priceMatch: 'Best Buy price matches major online retailers including Amazon.ca.',
  },
  'canadian-tire': {
    name: 'Canadian Tire',
    returnPolicy: 'Most items can be returned within 90 days with receipt. Some items like mattresses have 30-day policy.',
    loyaltyProgram: {
      name: 'Triangle Rewards',
      description: 'Earn Canadian Tire Money on purchases. Triangle Mastercard holders earn 4% back at Canadian Tire stores.',
    },
    shippingInfo: 'Free shipping on orders over $50. Free store pickup available.',
  },
  'the-source': {
    name: 'The Source',
    returnPolicy: 'Most items can be returned within 30 days with receipt. Carrier-connected devices have 14-day return policy.',
    loyaltyProgram: {
      name: 'Triangle Rewards',
      description: 'Part of the Canadian Tire family. Earn Canadian Tire Money on purchases.',
    },
    shippingInfo: 'Free shipping on orders over $50. Free store pickup available.',
  },
  'home-depot': {
    name: 'Home Depot',
    returnPolicy: 'Most items can be returned within 90 days. Major appliances and furniture have 30-day window.',
    loyaltyProgram: {
      name: 'Pro Xtra',
      description: 'For contractors and pros. Earn rewards, get purchase tracking, and volume pricing.',
    },
    shippingInfo: 'Free delivery on orders over $50. Free store pickup available.',
    priceMatch: 'Home Depot offers Low Price Guarantee - they match competitor prices.',
  },
  'lowes': {
    name: "Lowe's Canada",
    returnPolicy: 'Most items can be returned within 90 days with receipt. Major appliances have 30-day return window.',
    shippingInfo: 'Free shipping on orders over $49. Free store pickup available.',
    priceMatch: "Lowe's matches competitor prices on identical items.",
  },
  'ikea': {
    name: 'IKEA',
    returnPolicy: 'New, unopened products can be returned within 365 days with receipt. Opened products within 180 days.',
    loyaltyProgram: {
      name: 'IKEA Family',
      description: 'Free to join. Get discounts, special offers, free coffee/tea, and extended returns.',
    },
    shippingInfo: 'Flat-rate delivery starting at $5 for small items. Large item delivery varies by location.',
  },
  'sephora': {
    name: 'Sephora',
    returnPolicy: 'New or gently used products can be returned within 30 days for full refund. Beauty Insider members get 60 days.',
    loyaltyProgram: {
      name: 'Beauty Insider',
      description: 'Free to join. Earn points, get birthday gifts, and access exclusive events. VIB ($350/year) and Rouge ($1000/year) tiers unlock more perks.',
    },
    shippingInfo: 'Free shipping on orders over $50. Free store pickup available.',
  },
  'shoppers': {
    name: 'Shoppers Drug Mart',
    returnPolicy: 'Unused products can be returned within 30 days with receipt. Cosmetics must be sealed.',
    loyaltyProgram: {
      name: 'PC Optimum',
      description: 'Earn PC Optimum points on purchases. Look for 20x points events for big earnings. Redeem for groceries and more.',
    },
    shippingInfo: 'Free shipping on orders over $50. Free store pickup available.',
  },
  'loblaws': {
    name: 'Loblaws',
    returnPolicy: 'Satisfaction guaranteed. Unused products can be returned with receipt.',
    loyaltyProgram: {
      name: 'PC Optimum',
      description: 'Earn PC Optimum points on all purchases. PC Insiders members get 2x points, free delivery, and more.',
    },
    shippingInfo: 'Free pickup. Delivery fees vary by location. PC Express available.',
  },
  'sport-chek': {
    name: 'Sport Chek',
    returnPolicy: 'Most items can be returned within 90 days with tags attached and receipt.',
    loyaltyProgram: {
      name: 'Triangle Rewards',
      description: 'Part of the Canadian Tire family. Earn Canadian Tire Money on purchases.',
    },
    shippingInfo: 'Free shipping on orders over $50. Free store pickup available.',
  },
  'mec': {
    name: 'MEC',
    returnPolicy: 'Products can be returned within 60 days. Gear in good condition gets full refund. Lifetime guarantee on MEC Label products.',
    loyaltyProgram: {
      name: 'MEC Membership',
      description: '$5 one-time lifetime membership. Members get member pricing, gear swaps, and voting rights.',
    },
    shippingInfo: 'Free shipping on orders over $50. Free store pickup available.',
  },
  'indigo': {
    name: 'Indigo',
    returnPolicy: 'Items can be returned within 30 days with receipt. Plum members get 45 days.',
    loyaltyProgram: {
      name: 'Plum Rewards',
      description: 'Free to join. Earn points on books and general merchandise. Plum Plus ($39/year) gets 10% off books and free shipping.',
    },
    shippingInfo: 'Free shipping on orders over $35. Plum Plus members get free shipping always.',
  },
  'the-bay': {
    name: "Hudson's Bay",
    returnPolicy: 'Most items can be returned within 30 days. Beauty and designer items must be unused.',
    loyaltyProgram: {
      name: 'Hudson\'s Bay Rewards',
      description: 'Earn points on purchases. HBC Credit Card holders earn bonus points.',
    },
    shippingInfo: 'Free shipping on orders over $99. Free store pickup available.',
  },
  'winners': {
    name: 'Winners',
    returnPolicy: 'Items can be returned within 30 days with tags attached and receipt for refund or exchange.',
    shippingInfo: 'In-store only. No online ordering available.',
  },
  'marshalls': {
    name: 'Marshalls',
    returnPolicy: 'Items can be returned within 30 days with tags attached and receipt for refund or exchange.',
    shippingInfo: 'In-store only. No online ordering available.',
  },
  'staples': {
    name: 'Staples',
    returnPolicy: 'Most items can be returned within 30 days. Technology products within 14 days.',
    loyaltyProgram: {
      name: 'Staples Advantage',
      description: 'Business program with volume discounts, dedicated support, and net payment terms.',
    },
    shippingInfo: 'Free next-day delivery on orders over $50. Free store pickup available.',
    priceMatch: 'Staples matches competitor prices on identical items.',
  },
  'london-drugs': {
    name: 'London Drugs',
    returnPolicy: 'Most items can be returned within 30 days with receipt. Electronics within 14 days.',
    loyaltyProgram: {
      name: 'LDExtras',
      description: 'Earn points on purchases, get personalized offers, and members-only pricing.',
    },
    shippingInfo: 'Free shipping on orders over $75. Free store pickup available.',
  },
  'well-ca': {
    name: 'Well.ca',
    returnPolicy: 'Unused items can be returned within 30 days for refund.',
    shippingInfo: 'Free shipping on orders over $35. Ships from Canadian warehouse.',
  },
  'newegg': {
    name: 'Newegg',
    returnPolicy: 'Standard 30-day return policy. Some items are replacement only or non-returnable.',
    loyaltyProgram: {
      name: 'Newegg Premier',
      description: 'Premium membership with free expedited shipping, extended returns, and dedicated support.',
    },
    shippingInfo: 'Free shipping on many items. Shipping from Canadian warehouse when available.',
  },
  'apple': {
    name: 'Apple',
    returnPolicy: 'Standard 14-day return policy from delivery or purchase date. Items must be in original condition.',
    shippingInfo: 'Free shipping on all orders. Express shipping available for additional cost.',
  },
  'nike': {
    name: 'Nike',
    returnPolicy: 'Nike Members can return unworn items within 60 days. Non-members get 30 days.',
    loyaltyProgram: {
      name: 'Nike Membership',
      description: 'Free to join. Get member-exclusive products, early access to launches, and free shipping on orders over $50.',
    },
    shippingInfo: 'Free shipping for members on orders over $50. Free returns.',
  },
  'adidas': {
    name: 'Adidas',
    returnPolicy: 'Items can be returned within 30 days. adiClub members get 60 days.',
    loyaltyProgram: {
      name: 'adiClub',
      description: 'Free to join. Earn points, get early access, and unlock exclusive products and experiences.',
    },
    shippingInfo: 'Free shipping on orders over $50. Free returns.',
  },
  'lululemon': {
    name: 'Lululemon',
    returnPolicy: 'Unworn items with tags can be returned within 30 days. We Made Too Much items are final sale.',
    shippingInfo: 'Free shipping on orders over $75. Free returns and exchanges.',
  },
  'aritzia': {
    name: 'Aritzia',
    returnPolicy: 'Items can be returned within 30 days with tags attached. Final sale items excluded.',
    loyaltyProgram: {
      name: 'Clientele',
      description: 'By invitation. VIP access to sales, new arrivals, and exclusive events.',
    },
    shippingInfo: 'Free shipping on orders over $50.',
  },
  'roots': {
    name: 'Roots',
    returnPolicy: 'Items can be returned within 30 days with receipt. Leather goods have 1-year warranty.',
    loyaltyProgram: {
      name: 'Roots Rewards',
      description: 'Earn points on purchases, get early access to sales, and birthday rewards.',
    },
    shippingInfo: 'Free shipping on orders over $50. Free store pickup available.',
  },
}

export function getStoreInfo(storeSlug: string): StoreInfo | null {
  const slug = storeSlug.toLowerCase().replace(/\s+/g, '-')
  return storeInfo[slug] || null
}
