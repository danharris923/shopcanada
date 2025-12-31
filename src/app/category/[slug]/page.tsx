import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { DealCard, DealGrid } from '@/components/DealCard'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { StatsBar } from '@/components/StatsBar'
import { getDealsByCategory } from '@/lib/db'
import { CATEGORIES, getCategoryBySlug, type Category } from '@/lib/categories'
import type { Metadata } from 'next'

// Revalidate every 15 minutes
export const revalidate = 900

// Use all categories for category pages (including extended categories)
const categories = CATEGORIES

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = categories.find(cat => cat.slug === params.slug)

  if (!category) {
    return {
      title: 'Category Not Found - Shop Canada',
    }
  }

  return {
    title: `${category.name} Deals - Shop Canada`,
    description: category.description,
    keywords: category.keywords,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find(cat => cat.slug === params.slug)

  if (!category) {
    notFound()
  }

  const Icon = category.icon

  // Fetch deals for this category
  const deals = await getDealsByCategory(category.slug, 50)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Categories', href: '/categories' },
            { label: category.name },
          ]} />
        </div>

        {/* Hero */}
        <section className="bg-soft-black py-8 mt-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-maple-red rounded-lg">
                <Icon size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {category.name}
                </h1>
                <p className="text-silver-light">
                  {deals.length} deals from Canadian retailers
                </p>
              </div>
            </div>

            <p className="text-silver max-w-3xl">
              {category.description}
            </p>
          </div>
        </section>

        {/* Stats Bar */}
        <StatsBar dealCount={deals.length} />

        {/* Deals Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            {deals.length > 0 ? (
              <>
                <h2 className="text-2xl font-bold text-charcoal mb-6">Featured Deals</h2>
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
                    store={deal.store || null}
                    affiliateUrl={deal.affiliate_url}
                  />
                ))}
              </DealGrid>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-maple-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={32} className="text-maple-red" />
                </div>
                <h2 className="text-2xl font-bold text-charcoal mb-2">
                  No {category.name} Deals Right Now
                </h2>
                <p className="text-slate mb-6">
                  Check back soon - new deals are added every 15 minutes!
                </p>
                <Link href="/deals" className="btn-primary">
                  Browse All Deals
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Related Categories */}
        <section className="py-8 px-4 bg-white border-t border-silver-light">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-bold text-charcoal mb-6">Other Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categories
                .filter(cat => cat.slug !== category.slug)
                .map(cat => {
                  const CatIcon = cat.icon
                  return (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="flex flex-col items-center justify-center p-4 bg-cream rounded-card hover:bg-ivory transition-colors group"
                    >
                      <CatIcon size={24} className="text-maple-red mb-2" />
                      <span className="text-sm font-medium text-charcoal group-hover:text-maple-red transition-colors text-center">
                        {cat.name}
                      </span>
                    </Link>
                  )
                })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
