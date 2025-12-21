import Link from 'next/link'
import { getDeals, getDealCount, getStoreStats } from '@/lib/db'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { DealCard, DealGrid } from '@/components/DealCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Deals - Shop Canada',
  description: 'Browse all the best deals from Canadian retailers. Find discounts from Amazon.ca, Walmart, Costco, Best Buy, Canadian Tire and more.',
}

// Revalidate every 15 minutes
export const revalidate = 900

export default async function DealsPage() {
  const [deals, dealCount, storeStats] = await Promise.all([
    getDeals({ limit: 100, orderBy: 'date_added', orderDir: 'DESC' }),
    getDealCount(),
    getStoreStats(),
  ])
  const storeCount = storeStats.length

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        {/* Hero */}
        <section className="bg-soft-black py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              All Deals
            </h1>
            <p className="text-silver-light text-lg max-w-2xl mx-auto">
              {dealCount} products from {storeCount} retailers, updated every 15 minutes
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-4 px-4 bg-white border-b border-silver-light">
          <div className="max-w-7xl mx-auto flex flex-wrap gap-2 justify-center">
            <Link href="/deals" className="px-4 py-2 rounded-full bg-maple-red text-white text-sm font-medium">
              All Deals
            </Link>
            <Link href="/stores/amazon" className="px-4 py-2 rounded-full bg-ivory hover:bg-silver-light text-charcoal text-sm font-medium transition-colors">
              Amazon.ca
            </Link>
            <Link href="/stores/walmart" className="px-4 py-2 rounded-full bg-ivory hover:bg-silver-light text-charcoal text-sm font-medium transition-colors">
              Walmart
            </Link>
            <Link href="/stores/costco" className="px-4 py-2 rounded-full bg-ivory hover:bg-silver-light text-charcoal text-sm font-medium transition-colors">
              Costco
            </Link>
            <Link href="/stores/best-buy" className="px-4 py-2 rounded-full bg-ivory hover:bg-silver-light text-charcoal text-sm font-medium transition-colors">
              Best Buy
            </Link>
            <Link href="/stores" className="px-4 py-2 rounded-full bg-ivory hover:bg-silver-light text-charcoal text-sm font-medium transition-colors">
              All Stores
            </Link>
          </div>
        </section>

        {/* Deals Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            {deals.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-slate">
                    Showing {deals.length} deals
                  </p>
                </div>
                <DealGrid>
                  {deals.map(deal => (
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
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-slate mb-4">No deals available at the moment</p>
                <p className="text-silver mb-8">Check back soon - we update every 15 minutes!</p>
                <Link href="/" className="btn-primary">
                  Back to Home
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Canadian Brands CTA */}
        <section className="py-12 px-4 bg-soft-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Support Canadian Brands
            </h2>
            <p className="text-silver mb-6">
              Discover 600+ Canadian brands and shop local
            </p>
            <Link href="/canadian" className="btn-primary">
              Explore Canadian Brands
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
