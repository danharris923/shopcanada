import Link from 'next/link'
import { categories, getBrandsByCategory, getCategoryBySlug } from '@/lib/brands-data'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { CategorySidebar } from '@/components/category-sidebar'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  const brands = getBrandsByCategory(slug)

  if (!category) {
    notFound()
  }

  // Get related categories (just show other categories for now)
  const relatedCategories = categories.filter(c => c.slug !== slug).slice(0, 4)

  return (
    <main className="min-h-screen bg-[#0f1410]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Categories', href: '/categories' },
          { label: category.name }
        ]} />

        <div className="flex gap-8 mt-8">
          <CategorySidebar activeCategory={slug} />

          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-5xl font-serif text-[#b8860b] mb-4 flex items-center gap-4">
                <span className="text-6xl">{category.icon}</span>
                Canadian {category.name} Brands
              </h1>
              {category.seoBlurb && (
                <p className="text-lg text-[#b8a896] leading-relaxed mb-4 max-w-3xl">
                  {category.seoBlurb}
                </p>
              )}
              <p className="text-xl text-[#b8a896]">
                Supporting local {category.name ? category.name.toLowerCase() : 'products'} - {brands.length} brands found
              </p>
            </div>

            {/* Filter Bar */}
            <div className="mb-8 p-4 bg-[#1a2a1a] border-2 border-[#3a4a3a] flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <span className="text-[#b8a896] text-sm">Sort:</span>
                <select className="bg-[#0f1410] text-[#f4ede4] border border-[#3a4a3a] px-3 py-1 text-sm">
                  <option>A-Z</option>
                  <option>Most Popular</option>
                  <option>Newest</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#b8a896] text-sm">Filter:</span>
                <button className="px-3 py-1 bg-[#5c1a1a] text-[#b8860b] text-sm font-bold border border-[#b8860b]">
                  All
                </button>
                <button className="px-3 py-1 bg-[#0f1410] text-[#b8a896] text-sm hover:text-[#f4ede4]">
                  Featured
                </button>
                <button className="px-3 py-1 bg-[#0f1410] text-[#b8a896] text-sm hover:text-[#f4ede4]">
                  New
                </button>
              </div>
            </div>

            {/* Brand Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {brands.map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/brand/${brand.slug}`}
                  className="group bg-[#1a2a1a] border-2 border-[#3a4a3a] p-6 hover:border-[#b8860b] transition-all hover:-translate-y-1"
                >
                  <div className="mb-4 h-24 flex items-center justify-center">
                    <div className="text-4xl">🍁</div>
                  </div>
                  <h3 className="text-lg font-bold text-[#f4ede4] mb-2 group-hover:text-[#b8860b]">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-[#b8a896] mb-4 line-clamp-2">
                    {brand.description}
                  </p>
                  <button className="w-full px-3 py-2 bg-[#b8860b] text-[#0f1410] text-xs font-bold hover:bg-[#d4a520]">
                    View Brand
                  </button>
                </Link>
              ))}
            </div>

            {/* Related Categories */}
            {relatedCategories.length > 0 && (
              <div className="mt-12 pt-8 border-t-2 border-[#3a4a3a]">
                <h2 className="text-2xl font-serif text-[#b8860b] mb-6">You might also like:</h2>
                <div className="flex flex-wrap gap-4">
                  {relatedCategories.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/category/${related.slug}`}
                      className="px-6 py-3 bg-[#1a2a1a] border-2 border-[#3a4a3a] hover:border-[#b8860b] text-[#f4ede4] hover:text-[#b8860b] font-bold transition-colors"
                    >
                      {related.icon} {related.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
