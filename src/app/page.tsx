import Link from 'next/link'
import { getStoreStats } from '@/lib/db'
import { generateWebsiteSchema, generateOrganizationSchema } from '@/lib/schema'
import { DealCard, DealGrid } from '@/components/DealCard'
import { FlippDealCard, FlippDealGrid } from '@/components/FlippDealCard'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { StoreLogo } from '@/components/StoreLogo'
import { featuredStores, getTopBadges } from '@/lib/store-logos'
import { Smartphone, Shirt, Home, ShoppingCart, Sparkles, Dumbbell, Leaf } from 'lucide-react'
import { StatsBar } from '@/components/StatsBar'
import { getShuffledFeaturedDeals, getShuffledDeals, getDistributionSummary } from '@/lib/deal-shuffle'
import { getLatestVideos } from '@/lib/youtube'
import { VideoCarousel } from '@/components/VideoCarousel'

// Revalidate every 15 minutes
export const revalidate = 900

export default async function HomePage() {
  const [shuffledFeatured, shuffledLatest, storeStats, latestVideos] = await Promise.all([
    getShuffledFeaturedDeals(8),
    getShuffledDeals(16),
    getStoreStats(),
    getLatestVideos(6),
  ])

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
          <picture>
            <source media="(min-width: 768px)" srcSet="/hero-desktop.png" />
            <img
              src="/hero-mobile.png"
              alt="Shop Canada"
              className="w-full h-auto object-cover max-h-[300px] md:max-h-[400px]"
            />
          </picture>
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
                  (deal as any).source === 'flipp' ? (
                    <FlippDealCard
                      key={deal.id}
                      deal={{
                        id: deal.id,
                        title: deal.title,
                        store: deal.store || 'Unknown',
                        storeSlug: (deal as any).category || 'general',
                        imageUrl: (deal as any).image_blob_url || (deal as any).image_url || (deal as any).imageUrl || '/placeholder-deal.jpg',
                        price: deal.price,
                        originalPrice: (deal as any).original_price || (deal as any).originalPrice,
                        discountPercent: (deal as any).discount_percent || (deal as any).discountPercent,
                        validFrom: (deal as any).date_added || (deal as any).validFrom || new Date().toISOString(),
                        validTo: (deal as any).validTo || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                        saleStory: (deal as any).saleStory || null,
                        storeLogo: (deal as any).storeLogo || '',
                        category: (deal as any).category,
                        slug: deal.slug,
                        source: 'flipp'
                      }}
                    />
                  ) : (
                    <DealCard
                      key={deal.id}
                      id={deal.id}
                      title={deal.title}
                      slug={deal.slug}
                      imageUrl={(deal as any).image_blob_url || (deal as any).image_url || (deal as any).imageUrl || '/placeholder-deal.jpg'}
                      price={deal.price}
                      originalPrice={(deal as any).original_price || (deal as any).originalPrice}
                      discountPercent={(deal as any).discount_percent || (deal as any).discountPercent}
                      store={deal.store || 'Unknown'}
                      affiliateUrl={(deal as any).affiliate_url}
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
                const badges = getTopBadges(store, 1)
                return (
                  <Link
                    key={store.slug}
                    href={`/stores/${store.slug}`}
                    className="store-card group"
                  >
                    <div className="w-12 h-12 mb-2 mx-auto rounded-lg overflow-hidden bg-cream flex items-center justify-center group-hover:scale-110 transition-transform">
                      <StoreLogo
                        src={store.logo}
                        alt={`${store.name} logo`}
                        domain={store.domain}
                        size={40}
                      />
                    </div>
                    <span className="font-semibold text-charcoal text-sm text-center group-hover:text-maple-red transition-colors">
                      {store.name}
                    </span>
                    {badges.length > 0 && (
                      <span className="block text-[10px] text-slate mt-1" title={badges[0].label}>
                        {badges[0].emoji} {badges[0].label}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Store Tours + Social */}
        <section className="py-12 section-cream">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-6">
              Follow Along
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Auto-playing Video Carousel */}
              {latestVideos.length > 0 && (
                <VideoCarousel videos={latestVideos.slice(0, 6)} />
              )}

              {/* Social Buttons Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@ShopCanada-cc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-6 bg-white rounded-lg border-2 border-transparent hover:border-[#FF0000] transition-all group shadow-sm hover:shadow-md"
                >
                  <svg className="w-12 h-12 mb-3 text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span className="font-bold text-charcoal group-hover:text-[#FF0000] transition-colors">YouTube</span>
                  <span className="text-xs text-slate">Store Tours</span>
                </a>

                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@shopcanada1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-6 bg-white rounded-lg border-2 border-transparent hover:border-black transition-all group shadow-sm hover:shadow-md"
                >
                  <svg className="w-12 h-12 mb-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                  <span className="font-bold text-charcoal group-hover:text-black transition-colors">TikTok</span>
                  <span className="text-xs text-slate">Quick Clips</span>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=100079001052299"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-6 bg-white rounded-lg border-2 border-transparent hover:border-[#1877F2] transition-all group shadow-sm hover:shadow-md"
                >
                  <svg className="w-12 h-12 mb-3 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="font-bold text-charcoal group-hover:text-[#1877F2] transition-colors">Facebook</span>
                  <span className="text-xs text-slate">Community</span>
                </a>

                {/* Bluesky */}
                <a
                  href="https://bsky.app/profile/shopcanada.bsky.social"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-6 bg-white rounded-lg border-2 border-transparent hover:border-[#0085FF] transition-all group shadow-sm hover:shadow-md"
                >
                  <svg className="w-12 h-12 mb-3 text-[#0085FF]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z"/>
                  </svg>
                  <span className="font-bold text-charcoal group-hover:text-[#0085FF] transition-colors">Bluesky</span>
                  <span className="text-xs text-slate">Updates</span>
                </a>
              </div>
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
                (deal as any).source === 'flipp' ? (
                  <FlippDealCard
                    key={deal.id}
                    deal={{
                      id: deal.id,
                      title: deal.title,
                      store: deal.store || 'Unknown',
                      storeSlug: (deal as any).category || 'general',
                      imageUrl: (deal as any).image_blob_url || (deal as any).image_url || (deal as any).imageUrl || '/placeholder-deal.jpg',
                      price: deal.price,
                      originalPrice: (deal as any).original_price || (deal as any).originalPrice,
                      discountPercent: (deal as any).discount_percent || (deal as any).discountPercent,
                      validFrom: (deal as any).date_added || (deal as any).validFrom || new Date().toISOString(),
                      validTo: (deal as any).validTo || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                      saleStory: (deal as any).saleStory || null,
                      storeLogo: (deal as any).storeLogo || '',
                      category: (deal as any).category,
                      slug: deal.slug,
                      source: 'flipp'
                    }}
                  />
                ) : (
                  <DealCard
                    key={deal.id}
                    id={deal.id}
                    title={deal.title}
                    slug={deal.slug}
                    imageUrl={(deal as any).image_blob_url || (deal as any).image_url || (deal as any).imageUrl || '/placeholder-deal.jpg'}
                    price={deal.price}
                    originalPrice={(deal as any).original_price || (deal as any).originalPrice}
                    discountPercent={(deal as any).discount_percent || (deal as any).discountPercent}
                    store={deal.store || 'Unknown'}
                    affiliateUrl={(deal as any).affiliate_url}
                    featured={(deal as any).featured}
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
              {[
                { slug: 'electronics', name: 'Electronics', Icon: Smartphone },
                { slug: 'fashion', name: 'Fashion', Icon: Shirt },
                { slug: 'home', name: 'Home', Icon: Home },
                { slug: 'grocery', name: 'Grocery', Icon: ShoppingCart },
                { slug: 'beauty', name: 'Beauty', Icon: Sparkles },
                { slug: 'sports', name: 'Sports', Icon: Dumbbell },
              ].map(cat => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="category-pill justify-center"
                >
                  <cat.Icon size={28} className="text-maple-red" />
                  <span className="font-semibold text-charcoal">{cat.name}</span>
                </Link>
              ))}
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
