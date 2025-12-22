import Link from 'next/link'
import { categories } from '@/lib/brands-data'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import type { Metadata } from 'next'
import * as LucideIcons from 'lucide-react'

// Dynamic icon component that renders Lucide icons by name
function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (LucideIcons as Record<string, React.ComponentType<{ className?: string; size?: number }>>)[name] || LucideIcons.Leaf
  return <Icon className={className} size={32} />
}

export const metadata: Metadata = {
  title: 'Canadian Brand Categories',
  description: 'Browse Canadian brands by category. From fashion to food, discover quality Canadian-made products.',
}

export default function CategoriesPage() {
  return (
    <>
      <Header />
      <main className="bg-cream min-h-screen">
        {/* Hero */}
        <section className="bg-soft-black py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-4">
              <Link href="/canadian" className="text-silver-light hover:text-white text-sm">
                &larr; Back to Canadian Brands
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Shop by Category
            </h1>
            <p className="text-silver-light text-lg">
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
                  className="group bg-card-bg border border-card-border shadow-card hover:shadow-card-hover hover:border-maple-red hover:-translate-y-1 transition-all p-6 rounded-card"
                >
                  <div className="mb-4">
                    <CategoryIcon name={category.icon} className="text-maple-red" />
                  </div>
                  <h2 className="text-2xl font-bold text-charcoal mb-2 group-hover:text-maple-red transition-colors">
                    {category.name}
                  </h2>
                  <p className="text-slate text-sm mb-4">
                    {category.seoBlurb || `Explore Canadian ${category.name.toLowerCase()} brands`}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-maple-red font-bold">
                      {category.brandCount} brands
                    </span>
                    <span className="text-maple-red group-hover:text-burgundy transition-colors">
                      Browse →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
