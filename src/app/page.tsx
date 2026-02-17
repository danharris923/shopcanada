import Link from 'next/link'
import Image from 'next/image'
import { getStoreStats, getStoreBySlug } from '@/lib/db'
import { generateWebsiteSchema, generateOrganizationSchema } from '@/lib/schema'
import { DealCard, DealGrid } from '@/components/DealCard'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { StoreLogo } from '@/components/StoreLogo'
import { FashionCarousel } from '@/components/FashionCarousel'
import { Leaf } from 'lucide-react'
import { CORE_CATEGORIES } from '@/lib/categories'
import { StatsBar } from '@/components/StatsBar'
import { getShuffledFeaturedDeals, getShuffledDeals, getDistributionSummary } from '@/lib/deal-shuffle'
import { REVALIDATE_INTERVAL, FEATURED_STORE_SLUGS } from '@/lib/config'
import { getCanadianFashionBrands, FASHION_IMAGES_BASE_URL, FASHION_SEARCH_URLS } from '@/lib/fashion-brands'
import { IMAGE_MANIFEST } from '@/lib/fashion-deals'
import { Store, MixedDeal } from '@/types/deal'

// Badge display configuration for homepage store cards
const BADGE_CONFIG: Record<string, { emoji: string; label: string; priority: number }> = {
  'canadian-owned': { emoji: '\u{1F1E8}\u{1F1E6}', label: 'Canadian-Owned', priority: 1 },
  'made-in-canada': { emoji: '\u{1F3ED}', label: 'Made in Canada', priority: 2 },
  'canadian-retailer': { emoji: '\u{1F3EC}', label: 'Canadian Retailer', priority: 3 },
  'international': { emoji: '\u{1F30D}', label: 'International', priority: 4 },
  'ships-from-canada': { emoji: '\u{1F69A}', label: 'Ships from Canada', priority: 5 },
}

/**
 * Get top badge for a store, sorted by priority
 */
function getTopBadge(store: Store): { emoji: string; label: string } | null {
  if (!store.badges || store.badges.length === 0) return null

  const sorted = store.badges
    .filter(badge => BADGE_CONFIG[badge])
    .map(badge => ({ ...BADGE_CONFIG[badge], badge }))
    .sort((a, b) => a.priority - b.priority)

  return sorted.length > 0 ? { emoji: sorted[0].emoji, label: sorted[0].label } : null
}

/**
 * Extract domain from a URL for StoreLogo fallback
 */
function extractDomain(url: string | null): string {
  if (!url) return ''
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url.replace(/^https?:\/\//, '').replace('www.', '').split('/')[0]
  }
}

export const revalidate = REVALIDATE_INTERVAL

export default async function HomePage() {
  const [shuffledFeatured, shuffledLatest, storeStats, ...featuredStoreResults] = await Promise.all([
    getShuffledFeaturedDeals(8),
    getShuffledDeals(16),
    getStoreStats(),
    ...FEATURED_STORE_SLUGS.map(slug => getStoreBySlug(slug)),
  ])

  // Filter out null results and cast to Store[]
  const featuredStores = featuredStoreResults.filter((s): s is Store => s !== null)

  // Distribution logging removed for production

  const websiteSchema = generateWebsiteSchema()
  const orgSchema = generateOrganizationSchema()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([websiteSchema, orgSchema]),
        }}
      />

      <Header />

      <main>
        {/* Hero Banner */}
        <section className="relative">
          {/* Desktop Hero - hidden on mobile */}
          <div className="hidden md:block relative w-full h-[400px]">
            <Image
              src="/hero-desktop.webp"
              alt="Shop Canada - Best Canadian Deals"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
          {/* Mobile Hero - hidden on desktop */}
          <div className="block md:hidden relative w-full h-[300px]">
            <Image
              src="/hero-mobile.webp"
              alt="Shop Canada - Best Canadian Deals"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-7xl mx-auto px-4 flex flex-col items-end">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 text-right tracking-wide" style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
              }}>
                Shop Canada
              </h1>
              <p className="text-white/90 text-sm md:text-lg text-right" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                The best deals for Canadian shoppers
              </p>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <StatsBar
          dealCount={shuffledLatest.deals.length + shuffledFeatured.deals.length + 250}
          storeCount={storeStats.length + 45}
        />

        {/* Canadian Picks - Above the Fold CTA */}
        <section className="py-6 bg-gradient-to-r from-maple-red to-burgundy">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-white">
                <Leaf size={40} className="text-white" />
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-300">
                    Discover Canadian Brands
                  </h2>
                  <p className="text-white/80 text-sm md:text-base">
                    Plus 600+ homegrown Canadian brands worth knowing
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/stores?filter=canadian"
                  className="bg-white text-maple-red hover:bg-cream font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Explore Canadian Brands
                </Link>
                <Link
                  href="/stores"
                  className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-maple-red font-semibold py-3 px-6 rounded-lg transition-colors hidden md:inline-block"
                >
                  Browse Stores
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Icons of Canadian Fashion - Carousel */}
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-6">
              Icons of Canadian Fashion
            </h2>
            <FashionCarousel
              cards={getCanadianFashionBrands().map((brand, brandIdx) => {
                const images = IMAGE_MANIFEST[brand.folder] || []
                const img = images[brandIdx % images.length] || images[0]
                return {
                  slug: brand.slug,
                  name: brand.name,
                  title: brand.cardTitles[0],
                  imageUrl: `${FASHION_IMAGES_BASE_URL}/${brand.folder}/${img}`,
                  affiliateUrl: FASHION_SEARCH_URLS[brand.slug] || `/stores/${brand.slug}`,
                }
              })}
              autoPlayInterval={60000}
            />
          </div>
        </section>

        {/* Hot Sales */}
        {shuffledFeatured.deals.length > 0 && (
          <section className="py-12 section-ivory">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
                  Hot Sales
                </h2>
                <Link
                  href="/deals"
                  className="text-maple-red hover:text-burgundy font-semibold transition-colors"
                >
                  View All →
                </Link>
              </div>
              <DealGrid>
                {shuffledFeatured.deals.map(deal => (
                  deal.source === 'flipp' ? (
                    <DealCard
                      key={deal.id}
                      id={deal.id}
                      title={deal.title}
                      slug={deal.slug}
                      imageUrl={deal.image_blob_url || deal.image_url || deal.imageUrl || '/placeholder-deal.svg'}
                      price={deal.price}
                      originalPrice={deal.original_price ?? deal.originalPrice ?? null}
                      discountPercent={deal.discount_percent ?? deal.discountPercent ?? null}
                      store={deal.store || null}
                      affiliateUrl={deal.affiliate_url || ''}
                      variant="flipp"
                      storeSlug={deal.storeSlug || deal.store?.toLowerCase().replace(/\s+/g, '-') || 'general'}
                      storeLogo={deal.storeLogo || ''}
                      validTo={deal.validTo || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()}
                      saleStory={deal.saleStory ?? null}
                    />
                  ) : (
                    <DealCard
                      key={deal.id}
                      id={deal.id}
                      title={deal.title}
                      slug={deal.slug}
                      imageUrl={deal.image_blob_url || deal.image_url || deal.imageUrl || '/placeholder-deal.svg'}
                      price={deal.price}
                      originalPrice={deal.original_price ?? deal.originalPrice ?? null}
                      discountPercent={deal.discount_percent ?? deal.discountPercent ?? null}
                      store={deal.store || null}
                      affiliateUrl={deal.affiliate_url}
                      featured={true}
                    />
                  )
                ))}
              </DealGrid>
            </div>
          </section>
        )}

        {/* Store Shortcuts */}
        <section className="py-12 section-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-6">
              Shop by Store
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {featuredStores.map(store => {
                const badge = getTopBadge(store)
                return (
                  <Link
                    key={store.slug}
                    href={`/stores/${store.slug}`}
                    className="store-card group"
                  >
                    <div className="w-12 h-12 mb-2 mx-auto rounded-lg overflow-hidden bg-cream flex items-center justify-center group-hover:scale-110 transition-transform">
                      <StoreLogo
                        src={store.logo_url || ''}
                        alt={`${store.name} logo`}
                        domain={extractDomain(store.website_url)}
                        size={40}
                      />
                    </div>
                    <span className="font-semibold text-charcoal text-sm text-center group-hover:text-maple-red transition-colors">
                      {store.name}
                    </span>
                    {badge && (
                      <span className="block text-[10px] text-slate mt-1" title={badge.label}>
                        {badge.emoji} {badge.label}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Fresh Markdowns */}
        <section className="py-12 section-ivory">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
                Fresh Markdowns
              </h2>
              <Link
                href="/deals"
                className="text-maple-red hover:text-burgundy font-semibold transition-colors"
              >
                View All →
              </Link>
            </div>
            <DealGrid>
              {shuffledLatest.deals.map(deal => (
                deal.source === 'flipp' ? (
                  <DealCard
                    key={deal.id}
                    id={deal.id}
                    title={deal.title}
                    slug={deal.slug}
                    imageUrl={deal.image_blob_url || deal.image_url || deal.imageUrl || '/placeholder-deal.svg'}
                    price={deal.price}
                    originalPrice={deal.original_price ?? deal.originalPrice ?? null}
                    discountPercent={deal.discount_percent ?? deal.discountPercent ?? null}
                    store={deal.store || null}
                    affiliateUrl={deal.affiliate_url || ''}
                    variant="flipp"
                    storeSlug={deal.storeSlug || deal.store?.toLowerCase().replace(/\s+/g, '-') || 'general'}
                    storeLogo={deal.storeLogo || ''}
                    validTo={deal.validTo || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()}
                    saleStory={deal.saleStory ?? null}
                  />
                ) : (
                  <DealCard
                    key={deal.id}
                    id={deal.id}
                    title={deal.title}
                    slug={deal.slug}
                    imageUrl={deal.image_blob_url || deal.image_url || deal.imageUrl || '/placeholder-deal.svg'}
                    price={deal.price}
                    originalPrice={deal.original_price ?? deal.originalPrice ?? null}
                    discountPercent={deal.discount_percent ?? deal.discountPercent ?? null}
                    store={deal.store || null}
                    affiliateUrl={deal.affiliate_url}
                    featured={deal.featured}
                  />
                )
              ))}
            </DealGrid>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 section-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-6">
              Browse Categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {CORE_CATEGORIES.map(cat => {
                const Icon = cat.icon
                return (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="category-pill justify-center"
                  >
                    <Icon size={28} className="text-maple-red" />
                    <span className="font-semibold text-charcoal">{cat.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Canadian Brands CTA */}
        <section className="py-16 section-dark">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold text-white mb-4">
              Discover <span className="text-maple-red">Canadian</span> Brands
            </h2>
            <p className="text-silver mb-8 text-lg">
              Explore our directory of 600+ Canadian brands. From coast to coast,
              discover quality products made right here in Canada.
            </p>
            <Link href="/stores?filter=canadian" className="btn-primary text-lg px-8 py-4">
              Explore Canadian Brands
            </Link>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 section-white">
          <div className="max-w-4xl mx-auto px-4 prose">
            <h2>About Shop Canada – Deals for Canadian Shoppers</h2>
            <p>
              Shop Canada helps Canadians find the best deals available in Canada — including sales, markdowns,
              and verified discounts from Canadian brands and major retailers that serve Canadian shoppers.
            </p>
            <p>
              We track real price drops from trusted stores like Amazon.ca, Walmart Canada, Costco, Best Buy,
              Canadian Tire, and dozens more, so you can shop confidently knowing the deals are current and
              available in Canada.
            </p>

            <h3>How We Find Savings</h3>
            <p>
              Our automated price-tracking system monitors retailers and savings sources serving Canada
              around the clock. Listings are refreshed every 15 minutes, allowing us to surface new price
              drops, active promotions, and limited-time discounts shortly after they appear.
            </p>

            <h3>Why Canadian Shoppers Trust Us</h3>
            <ul>
              <li>Near real-time price tracking from retailers serving Canada</li>
              <li>Verified savings — only active, live promotions are listed</li>
              <li>Directory of 600+ stores and brands available to Canadian shoppers</li>
              <li>Simple, fast interface designed for efficient deal hunting</li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
