import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop by Category',
  description: 'Browse deals by category. Find the best prices on electronics, fashion, home, grocery, and more from top Canadian retailers.',
}

const categories = [
  { slug: 'electronics', name: 'Electronics', icon: '📱', description: 'TVs, laptops, phones, gaming & more' },
  { slug: 'fashion', name: 'Fashion', icon: '👕', description: 'Clothing, shoes, accessories' },
  { slug: 'home', name: 'Home', icon: '🏠', description: 'Furniture, decor, kitchen' },
  { slug: 'grocery', name: 'Grocery', icon: '🛒', description: 'Food, beverages, household' },
  { slug: 'beauty', name: 'Beauty', icon: '💄', description: 'Skincare, makeup, haircare' },
  { slug: 'sports', name: 'Sports', icon: '⚽', description: 'Fitness, outdoor, equipment' },
  { slug: 'toys', name: 'Toys & Games', icon: '🎮', description: 'Kids toys, board games, video games' },
  { slug: 'automotive', name: 'Automotive', icon: '🚗', description: 'Car parts, accessories, tools' },
  { slug: 'baby', name: 'Baby', icon: '👶', description: 'Diapers, gear, clothing' },
  { slug: 'pets', name: 'Pets', icon: '🐾', description: 'Food, toys, supplies' },
  { slug: 'office', name: 'Office', icon: '💼', description: 'Supplies, furniture, tech' },
  { slug: 'health', name: 'Health', icon: '💊', description: 'Vitamins, supplements, wellness' },
]

export default function CategoriesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-white border-b border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Find the best deals organized by category. From electronics to fashion,
              we've got deals for every Canadian shopper.
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-red-500 hover:shadow-lg transition-all"
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                    {category.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {category.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Canadian Brands CTA */}
        <section className="py-12 px-4 bg-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Looking for Canadian Brands?
            </h2>
            <p className="text-gray-400 mb-6">
              Explore 600+ Canadian brands organized by category
            </p>
            <Link
              href="/canadian/categories"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Browse Canadian Brands
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
