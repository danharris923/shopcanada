import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { DealCard, DealGrid } from '@/components/DealCard'
import { Breadcrumbs } from '@/components/deal/Breadcrumbs'
import { Smartphone, Shirt, Home, ShoppingCart, Sparkles, Dumbbell } from 'lucide-react'
import { StatsBar } from '@/components/StatsBar'
import { getDealsByCategory } from '@/lib/db'
import type { Metadata } from 'next'

// Revalidate every 15 minutes
export const revalidate = 900

const categories = [
  { slug: 'electronics', name: 'Electronics', icon: Smartphone, description: 'Find the latest electronics, computers, phones, tablets, gaming gear, and tech accessories from top Canadian retailers.', keywords: 'electronics, computers, phones, tablets, gaming' },
  { slug: 'fashion', name: 'Fashion & Apparel', icon: Shirt, description: 'Discover fashion deals on clothing, shoes, and accessories for men, women, and kids from Canadian fashion retailers.', keywords: 'fashion, clothing, shoes, accessories' },
  { slug: 'home', name: 'Home & Garden', icon: Home, description: 'Shop home improvement, furniture, decor, appliances, tools, and outdoor living products from Canadian home retailers.', keywords: 'home, garden, furniture, decor, appliances' },
  { slug: 'grocery', name: 'Grocery & Food', icon: ShoppingCart, description: 'Save on fresh food, pantry staples, snacks, and beverages from Canadian grocery stores and food retailers.', keywords: 'grocery, food, fresh, pantry, snacks' },
  { slug: 'beauty', name: 'Beauty & Personal Care', icon: Sparkles, description: 'Browse beauty deals on skincare, makeup, haircare, and wellness products from Canadian beauty retailers.', keywords: 'beauty, skincare, makeup, haircare, wellness' },
  { slug: 'sports', name: 'Sports & Outdoors', icon: Dumbbell, description: 'Find deals on fitness equipment, outdoor gear, sportswear, and recreational products from Canadian sports retailers.', keywords: 'sports, outdoors, fitness, gear, recreation' },
]

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
            { label: 'Stores', href: '/stores' },
            { label: category.name, href: `/category/${category.slug}` },
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
                    imageUrl={(deal as any).image_blob_url || (deal as any).image_url || '/placeholder-deal.jpg'}
                    price={deal.price}
                    originalPrice={(deal as any).original_price}
                    discountPercent={(deal as any).discount_percent}
                    store={deal.store || null}
                    affiliateUrl={(deal as any).affiliate_url}
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
