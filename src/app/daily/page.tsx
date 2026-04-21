import Link from 'next/link'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { DealFeedCard } from '@/components/DealFeedCard'
import { DealFeedFilters } from '@/components/DealFeedFilters'
import {
  applyFilters,
  fetchFeed,
  sortDeals,
  uniqueCategories,
} from '@/lib/deal-feed'
import { SITE_URL } from '@/lib/config'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Daily Deals - Click & Save Canada',
  description:
    'Fresh Canadian deals from our daily feed. Electronics, home, fashion and more — sorted by biggest discount.',
  alternates: {
    canonical: `${SITE_URL}/daily`,
  },
}

interface DailyPageProps {
  searchParams: Promise<{
    category?: string
    minDiscount?: string
  }>
}

export default async function DailyPage({ searchParams }: DailyPageProps) {
  const { category, minDiscount: minDiscountRaw } = await searchParams
  const minDiscount = minDiscountRaw ? Number(minDiscountRaw) : 0

  const all = await fetchFeed()
  const categories = uniqueCategories(all)
  const filtered = sortDeals(
    applyFilters(all, {
      category,
      minDiscount: Number.isFinite(minDiscount) ? minDiscount : 0,
    }),
  )

  const hasActiveFilter = Boolean(category) || minDiscount > 0

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Daily Deals', href: '/daily' },
            ]}
          />
        </div>

        <section className="bg-soft-black py-12 mt-4">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Daily Deals</h1>
            <p className="text-silver-light text-lg max-w-2xl mx-auto">
              Freshly-scraped Canadian deals, refreshed every 6 hours.
            </p>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <DealFeedFilters
              categories={categories}
              currentCategory={category}
              currentMinDiscount={minDiscount}
            />

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-slate mb-4">
                  No deals match your filters right now.
                </p>
                {hasActiveFilter && (
                  <Link href="/daily" className="btn-primary">
                    Show all daily deals
                  </Link>
                )}
              </div>
            ) : (
              <>
                <p className="text-slate mb-6">Showing {filtered.length} deals</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {filtered.map((deal) => (
                    <DealFeedCard key={deal.id} deal={deal} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
