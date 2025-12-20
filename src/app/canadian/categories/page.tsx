import Link from 'next/link'
import { categories } from '@/lib/brands-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Canadian Brand Categories',
  description: 'Browse Canadian brands by category. From fashion to food, discover quality Canadian-made products.',
}

export default function CategoriesPage() {
  return (
    <main className="bg-[#f5f0e8] min-h-screen">
      {/* Header */}
      <section className="bg-[#0f1410] border-b-4 border-[#3a4a3a] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4">
            <Link href="/canadian" className="text-[#b8a896] hover:text-[#b8860b] text-sm">
              &larr; Back to Canadian Brands
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#f4ede4] mb-4">
            Shop by Category
          </h1>
          <p className="text-[#b8a896] text-lg">
            {categories.length} categories of Canadian brands to explore
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => (
              <Link
                key={category.slug}
                href={`/canadian/category/${category.slug}`}
                className="group bg-[#0f1410] border-2 border-[#3a4a3a] hover:border-[#b8860b] transition-all p-6"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h2 className="text-2xl font-serif text-[#f4ede4] mb-2 group-hover:text-[#b8860b] transition-colors">
                  {category.name}
                </h2>
                <p className="text-[#b8a896] text-sm mb-4">
                  {category.seoBlurb || `Explore Canadian ${category.name.toLowerCase()} brands`}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#b8860b] font-bold">
                    {category.brandCount} brands
                  </span>
                  <span className="text-[#b8860b] group-hover:text-[#d4a520] transition-colors">
                    Browse →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
