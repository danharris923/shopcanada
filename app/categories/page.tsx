import Link from 'next/link'
import { categories } from '@/lib/brands-data'
import { Breadcrumbs } from '@/components/breadcrumbs'

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-[#0f1410]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Categories' }
        ]} />

        <div className="mb-12">
          <h1 className="text-5xl font-serif text-[#b8860b] mb-4">Browse by Category</h1>
          <p className="text-xl text-[#b8a896]">
            577+ Canadian Brands Organized by Type
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group bg-[#1a2a1a] border-2 border-[#3a4a3a] p-8 hover:border-[#b8860b] transition-all hover:-translate-y-1"
            >
              <div className="text-5xl mb-4">{category.icon}</div>
              <h2 className="text-2xl font-bold text-[#f4ede4] mb-2 group-hover:text-[#b8860b] transition-colors">
                {category.name}
              </h2>
              <p className="text-[#b8a896] mb-4">
                {category.brandCount} Canadian Brands
              </p>
              <div className="text-[#b8860b] font-bold group-hover:text-[#d4a520]">
                Browse {category.name} →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
