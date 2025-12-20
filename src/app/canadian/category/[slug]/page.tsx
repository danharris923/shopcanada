import Link from 'next/link'
import { brands, categories, getCategoryBySlug } from '@/lib/brands-data'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    return { title: 'Category Not Found' }
  }

  return {
    title: `${category.name} - Canadian Brands`,
    description: category.seoBlurb || `Browse Canadian ${category.name.toLowerCase()} brands. Support local businesses.`,
  }
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const categoryBrands = brands.filter(
    brand => brand.category.toLowerCase() === category.name.toLowerCase()
  )

  return (
    <main className="bg-[#f5f0e8] min-h-screen">
      {/* Header */}
      <section className="bg-[#0f1410] border-b-4 border-[#3a4a3a] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4">
            <Link href="/canadian/categories" className="text-[#b8a896] hover:text-[#b8860b] text-sm">
              &larr; Back to Categories
            </Link>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{category.icon}</span>
            <h1 className="text-4xl md:text-5xl font-serif text-[#f4ede4]">
              {category.name}
            </h1>
          </div>
          <p className="text-[#b8a896] text-lg max-w-2xl">
            {category.seoBlurb || `Discover quality Canadian ${category.name.toLowerCase()} brands.`}
          </p>
          <p className="text-[#b8860b] font-bold mt-4">
            {categoryBrands.length} brands in this category
          </p>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryBrands.map(brand => (
              <div
                key={brand.slug}
                className="bg-white border-2 border-[#e0d8cc] hover:border-[#b8860b] transition-all p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="w-12 h-12 rounded object-contain bg-white flex-shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded bg-[#f5f0e8] flex items-center justify-center flex-shrink-0 text-2xl">
                      🍁
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-[#2a2a2a]">
                    {brand.name}
                  </h3>
                </div>
                <p className="text-[#5a5a5a] text-sm mb-4 line-clamp-3">
                  {brand.description}
                </p>
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/canadian/brand/${brand.slug}`}
                    className="text-center bg-[#b8860b] hover:bg-[#d4a520] text-[#0f1410] font-bold py-3 px-4 transition-colors"
                  >
                    READ MORE
                  </Link>
                  {brand.amazonLink && (
                    <a
                      href={brand.amazonLink}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="text-center border-2 border-[#b8860b] text-[#b8860b] hover:bg-[#b8860b] hover:text-[#0f1410] font-bold py-3 px-4 transition-colors"
                    >
                      {brand.buttonText?.toUpperCase() || 'SHOP NOW'}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {categoryBrands.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#5a5a5a] text-lg">No brands found in this category yet.</p>
              <Link href="/canadian/brands" className="text-[#b8860b] hover:text-[#d4a520] font-bold mt-4 inline-block">
                Browse All Brands →
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
