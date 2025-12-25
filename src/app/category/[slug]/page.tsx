import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CategoryIcon } from '@/components/CategoryIcon'
import { Smartphone, Shirt, Home, ShoppingCart, Sparkles, Dumbbell, BookOpen, Baby, Gamepad2, Wrench, Heart, Package, ArrowLeft, Filter } from 'lucide-react'
import type { Metadata } from 'next'

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

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find(cat => cat.slug === params.slug)

  if (!category) {
    notFound()
  }

  const Icon = category.icon

  // Mock deals data for the category
  const mockDeals = [
    {
      title: `Best ${category.name} Deals`,
      store: 'Amazon.ca',
      discount: '25% off',
      originalPrice: '$199.99',
      salePrice: '$149.99',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop'
    },
    {
      title: `${category.name} Sale`,
      store: 'Best Buy',
      discount: '30% off',
      originalPrice: '$299.99',
      salePrice: '$209.99',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop'
    },
    {
      title: `${category.name} Clearance`,
      store: 'Canadian Tire',
      discount: '40% off',
      originalPrice: '$79.99',
      salePrice: '$47.99',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop'
    },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        {/* Breadcrumb & Hero */}
        <section className="bg-soft-black py-8">
          <div className="max-w-7xl mx-auto px-4">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-silver hover:text-white transition-colors mb-4"
            >
              <ArrowLeft size={16} />
              Back to Categories
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-maple-red rounded-lg">
                <Icon size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {category.name}
                </h1>
                <p className="text-silver-light">
                  Best deals from Canadian retailers
                </p>
              </div>
            </div>

            <p className="text-silver max-w-3xl">
              {category.description}
            </p>
          </div>
        </section>

        {/* Coming Soon Notice */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-card p-8 border border-maple-red/20">
              <div className="mb-6">
                <div className="w-16 h-16 bg-maple-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={32} className="text-maple-red" />
                </div>
                <h2 className="text-2xl font-bold text-charcoal mb-2">
                  {category.name} Categories Coming Soon
                </h2>
                <p className="text-slate">
                  We're working on organizing deals by category to make it easier for you to find what you're looking for.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/deals"
                  className="btn-primary"
                >
                  Browse All Deals
                </Link>
                <Link
                  href="/stores"
                  className="btn-secondary"
                >
                  Browse Stores
                </Link>
              </div>
            </div>
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