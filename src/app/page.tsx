import Link from 'next/link'
import { getFeaturedDeals, getLatestDeals, getStoreStats } from '@/lib/db'
import { generateWebsiteSchema, generateOrganizationSchema } from '@/lib/schema'
import { DealCard, DealGrid } from '@/components/DealCard'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { StoreLogo } from '@/components/StoreLogo'
import { featuredStores } from '@/lib/store-logos'

// Revalidate every 15 minutes
export const revalidate = 900

export default async function HomePage() {
  const [featuredDeals, latestDeals, storeStats] = await Promise.all([
    getFeaturedDeals(8),
    getLatestDeals(16),
    getStoreStats(),
  ])

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
        <section className="relative overflow-hidden">
          <img src="/herobanner.png" alt="Shop Canada" className="w-full h-auto" />
          <div className="absolute inset-0 flex items-center justify-end pr-8 md:pr-16">
            <div className="text-right">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 text-white">ShopCanada</h1>
              <p className="text-sm md:text-base mb-4 text-white">Canadian deals for Canadians</p>
              <Link href="/deals" className="btn-primary">Browse Deals</Link>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-soft-black text-white py-5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center gap-8 md:gap-16 text-center">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-maple-red">
                  {latestDeals.length + featuredDeals.length}+
                </div>
                <div className="text-sm text-silver">Active Deals</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-maple-red">
                  {storeStats.length}+
                </div>
                <div className="text-sm text-silver">Stores</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-maple-red">
                  600+
                </div>
                <div className="text-sm text-silver">Canadian Brands</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Deals */}
        {featuredDeals.length > 0 && (
          <section className="py-12 section-ivory">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
                  Featured Deals
                </h2>
                <Link
                  href="/deals"
                  className="text-maple-red hover:text-burgundy font-semibold transition-colors"
                >
                  View All →
                </Link>
              </div>
              <DealGrid>
                {featuredDeals.map(deal => (
                  <DealCard
                    key={deal.id}
                    id={deal.id}
                    title={deal.title}
                    slug={deal.slug}
                    imageUrl={deal.image_blob_url || deal.image_url || '/placeholder-deal.jpg'}
                    price={deal.price}
                    originalPrice={deal.original_price}
                    discountPercent={deal.discount_percent}
                    store={deal.store || 'Unknown'}
                    affiliateUrl={deal.affiliate_url}
                    featured={true}
                  />
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
              {featuredStores.map(store => (
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
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Deals */}
        <section className="py-12 section-cream">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
                Latest Deals
              </h2>
              <Link
                href="/deals"
                className="text-maple-red hover:text-burgundy font-semibold transition-colors"
              >
                View All →
              </Link>
            </div>
            <DealGrid>
              {latestDeals.map(deal => (
                <DealCard
                  key={deal.id}
                  id={deal.id}
                  title={deal.title}
                  slug={deal.slug}
                  imageUrl={deal.image_blob_url || deal.image_url || '/placeholder-deal.jpg'}
                  price={deal.price}
                  originalPrice={deal.original_price}
                  discountPercent={deal.discount_percent}
                  store={deal.store || 'Unknown'}
                  affiliateUrl={deal.affiliate_url}
                  featured={deal.featured}
                />
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
                { slug: 'electronics', name: 'Electronics', icon: '📱' },
                { slug: 'fashion', name: 'Fashion', icon: '👕' },
                { slug: 'home', name: 'Home', icon: '🏠' },
                { slug: 'grocery', name: 'Grocery', icon: '🛒' },
                { slug: 'beauty', name: 'Beauty', icon: '💄' },
                { slug: 'sports', name: 'Sports', icon: '⚽' },
              ].map(cat => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="category-pill justify-center"
                >
                  <span className="text-2xl">{cat.icon}</span>
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
              Support <span className="text-maple-red">Canadian</span> Brands
            </h2>
            <p className="text-silver mb-8 text-lg">
              Discover 600+ Canadian brands and shop local. From coast to coast,
              find quality products made right here in Canada.
            </p>
            <Link href="/canadian" className="btn-primary text-lg px-8 py-4">
              Explore Canadian Brands
            </Link>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 section-white">
          <div className="max-w-4xl mx-auto px-4 prose">
            <h2>About Shop Canada - Your Canadian Deals Destination</h2>
            <p>
              Shop Canada is your go-to destination for finding the best deals, sales,
              and discounts from top Canadian retailers. We scour the web to bring you
              verified deals from Amazon.ca, Walmart Canada, Costco, Best Buy, Canadian
              Tire, and dozens more stores.
            </p>

            <h3>How We Find Deals</h3>
            <p>
              Our automated deal-finding system monitors major Canadian retailers and
              deal aggregators around the clock. We update our listings every 4 hours
              to ensure you always have access to the latest savings opportunities.
            </p>

            <h3>Why Canadian Shoppers Trust Us</h3>
            <ul>
              <li>Real-time price tracking from major Canadian retailers</li>
              <li>Verified deals - we only list active promotions</li>
              <li>600+ Canadian brands directory</li>
              <li>Easy-to-use interface designed for quick deal hunting</li>
            </ul>

            <h3>Start Saving Today</h3>
            <p>
              Browse our latest deals, explore your favorite stores, or search by
              category to find exactly what you&apos;re looking for. Whether you&apos;re
              shopping for electronics, fashion, home goods, or groceries, we&apos;ve
              got deals for every Canadian shopper.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
