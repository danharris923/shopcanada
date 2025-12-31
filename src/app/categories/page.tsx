import Link from 'next/link'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { StatsBar } from '@/components/StatsBar'
import { CATEGORIES } from '@/lib/categories'
import { getDealsByCategory } from '@/lib/db'
import { SITE_URL } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Browse Categories - Shop Canada',
  description: 'Browse deals by category. Find electronics, fashion, home & garden, grocery, beauty, sports, and more from Canadian retailers.',
  alternates: {
    canonical: `${SITE_URL}/categories`,
  },
}

// Revalidate every 15 minutes
export const revalidate = 900

export default async function CategoriesPage() {
  // Fetch deal counts for each category in parallel (single query per category)
  const categoryDeals = await Promise.all(
    CATEGORIES.map(async (cat) => {
      const deals = await getDealsByCategory(cat.slug, 100)
      return {
        ...cat,
        dealCount: deals.length,
      }
    })
  )

  const totalDeals = categoryDeals.reduce((sum, cat) => sum + cat.dealCount, 0)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Categories' },
          ]} />
        </div>

        {/* Hero */}
        <section className="bg-soft-black py-12 mt-4">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Browse by Category
            </h1>
            <p className="text-silver-light text-lg max-w-2xl mx-auto">
              Find deals across {CATEGORIES.length} categories from Canadian retailers
            </p>
          </div>
        </section>

        {/* Stats Bar */}
        <StatsBar dealCount={totalDeals} />

        {/* Categories Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryDeals.map((cat) => {
                const Icon = cat.icon
                return (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="group bg-white border border-silver-light rounded-card p-6 hover:border-maple-red hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-maple-red/10 rounded-lg group-hover:bg-maple-red transition-colors">
                        <Icon size={32} className="text-maple-red group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-charcoal mb-2 group-hover:text-maple-red transition-colors">
                          {cat.name}
                        </h2>
                        <p className="text-sm text-slate mb-3 line-clamp-2">
                          {cat.description}
                        </p>
                        {cat.dealCount > 0 && (
                          <span className="inline-block text-xs font-medium text-maple-red bg-maple-red/10 px-2 py-1 rounded">
                            {cat.dealCount} deals
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Stores CTA */}
        <section className="py-12 px-4 bg-soft-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Browse by Store Instead?
            </h2>
            <p className="text-silver mb-6">
              Explore 600+ stores serving Canadian shoppers
            </p>
            <Link href="/stores" className="btn-primary">
              Browse All Stores
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
