import Link from 'next/link'
import { brands, categories, getBrandBySlug } from '@/lib/brands-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Canadian Brands - Shop Canadian, Support Local',
  description: 'Discover quality Canadian-made products and support domestic businesses. Browse our curated collection of Canadian brands.',
}

export default function CanadianPage() {
  const totalBrands = brands.length

  // Featured brands data
  const featuredBrandSlugs = ['lululemon', 'roots', 'aritzia', 'ardene']
  const featuredBrands = featuredBrandSlugs.map(slug => {
    const brandData = getBrandBySlug(slug)
    if (!brandData) return null

    const displayData: Record<string, { tagline: string, founded: string, image: string }> = {
      'lululemon': {
        tagline: "Canada's Global Athleisure Icon",
        founded: 'Vancouver, 1998',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop'
      },
      'aritzia': {
        tagline: 'Elevated Fashion With a Cult Following',
        founded: 'Vancouver, 1984',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
      },
      'roots': {
        tagline: 'Heritage Brand Built on Craftsmanship',
        founded: 'Toronto, 1973',
        image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400&h=300&fit=crop'
      },
      'ardene': {
        tagline: 'Affordable Fashion for Every Canadian',
        founded: 'Montreal, 1982',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop'
      }
    }

    return {
      ...brandData,
      ...displayData[slug]
    }
  }).filter(Boolean)

  // Group brands by first letter
  const brandsByLetter = brands.reduce((acc, brand) => {
    const letter = brand.name.charAt(0).toUpperCase()
    if (!acc[letter]) acc[letter] = []
    acc[letter].push(brand)
    return acc
  }, {} as Record<string, typeof brands>)

  const letters = Object.keys(brandsByLetter).sort()

  return (
    <main className="bg-[#f5f0e8] min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#0f1410] border-b-4 border-[#3a4a3a] py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-4">
            <Link href="/" className="text-[#b8a896] hover:text-[#b8860b] text-sm">
              &larr; Back to Deals
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#f4ede4] mb-4">
            Canadian Brands
          </h1>
          <p className="text-lg text-[#b8a896] mb-2 max-w-2xl mx-auto">
            Support Canadian businesses. Browse {totalBrands} quality brands.
          </p>
        </div>
      </section>

      {/* Icons of Canadian Retail - Featured Brands */}
      <section className="bg-[#1a2a1a] py-12 px-6 border-b-4 border-[#3a4a3a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-[#5c1a1a] px-4 py-2 mb-3">
              <span className="text-[#b8860b] font-bold text-sm">FEATURED CANADIAN BRANDS</span>
            </div>
            <h2 className="text-3xl font-serif text-[#f4ede4]">
              Icons of Canadian Retail
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredBrands.map((brand: any) => (
              <div
                key={brand.slug}
                className="group bg-[#0f1410] border-2 border-[#3a4a3a] hover:border-[#b8860b] transition-all overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={brand.image}
                    alt={`${brand.name} lifestyle`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1410] via-transparent to-transparent" />
                  <div className="absolute top-2 left-2 bg-[#5c1a1a] px-2 py-1">
                    <span className="text-[#b8860b] text-xs font-bold">EST. {brand.founded?.split(', ')[1]}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    {brand.logo ? (
                      <img
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        className="w-10 h-10 rounded object-contain bg-white flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded bg-[#f5f0e8] flex items-center justify-center flex-shrink-0 text-xl">
                        🍁
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-serif text-[#f4ede4]">{brand.name}</h3>
                      <span className="text-xs text-[#b8a896]">{brand.founded}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#b8a896] mb-4">{brand.tagline}</p>

                  {brand.amazonLink ? (
                    <a
                      href={brand.amazonLink}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="block w-full text-center bg-[#b8860b] hover:bg-[#d4a520] text-[#0f1410] font-bold py-2 px-4 text-sm transition-colors mb-2"
                    >
                      {brand.buttonText?.toUpperCase() || 'SHOP NOW'}
                    </a>
                  ) : null}

                  <Link
                    href={`/canadian/brand/${brand.slug}`}
                    className="block w-full text-center border border-[#b8860b] text-[#b8860b] hover:bg-[#b8860b] hover:text-[#0f1410] font-bold py-2 px-4 text-sm transition-colors"
                  >
                    READ MORE
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Letter Navigation - Sticky */}
      <section className="bg-[#0f1410] border-b border-[#3a4a3a] py-3 px-4 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-1 justify-center">
            {letters.map(letter => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-7 h-7 flex items-center justify-center bg-[#3a4a3a] text-[#f4ede4] hover:bg-[#b8860b] hover:text-[#0f1410] transition-colors font-bold text-xs"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content: Sidebar + Brands List */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto flex gap-6">

          {/* Category Sidebar */}
          <aside className="w-56 shrink-0 hidden lg:block">
            <div className="sticky top-16 bg-[#0f1410] border-2 border-[#3a4a3a] p-4">
              <h3 className="text-[#b8860b] font-bold text-sm mb-4 uppercase tracking-wider">
                Categories
              </h3>
              <ul className="space-y-1 max-h-[70vh] overflow-y-auto">
                {categories.map(category => (
                  <li key={category.slug}>
                    <Link
                      href={`/canadian/category/${category.slug}`}
                      className="flex items-center gap-2 text-sm py-2 px-2 text-[#b8a896] hover:text-[#f4ede4] hover:bg-[#2a3a2a] rounded transition-colors"
                    >
                      <span className="text-base">{category.icon}</span>
                      <span className="flex-1 truncate">{category.name}</span>
                      <span className="text-xs text-[#b8860b]">{category.brandCount}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Brands List */}
          <div className="flex-1">
            {letters.map(letter => (
              <div key={letter} id={`letter-${letter}`} className="mb-10">
                <h2 className="text-2xl font-serif text-[#2a2a2a] mb-4 pb-2 border-b-2 border-[#b8860b]">
                  {letter}
                </h2>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {brandsByLetter[letter].map(brand => (
                    <div
                      key={brand.slug}
                      className="bg-white border-2 border-[#e0d8cc] hover:border-[#b8860b] transition-all p-4"
                    >
                      <div className="flex items-start gap-3 mb-2">
                        {brand.logo ? (
                          <img
                            src={brand.logo}
                            alt={`${brand.name} logo`}
                            className="w-10 h-10 rounded object-contain bg-white flex-shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded bg-[#f5f0e8] flex items-center justify-center flex-shrink-0 text-xl">
                            🍁
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-[#2a2a2a] truncate">
                            {brand.name}
                          </h3>
                          <span className="text-xs bg-[#f5f0e8] text-[#5a5a5a] px-2 py-0.5 inline-block">
                            {brand.category}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-[#5a5a5a] mb-3 line-clamp-2">
                        {brand.description}
                      </p>
                      <div className="flex gap-2">
                        <Link
                          href={`/canadian/brand/${brand.slug}`}
                          className="flex-1 text-center bg-[#b8860b] hover:bg-[#d4a520] text-[#0f1410] font-bold py-2 px-3 text-sm transition-colors"
                        >
                          Read More
                        </Link>
                        {brand.amazonLink && (
                          <a
                            href={brand.amazonLink}
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            className="flex-1 text-center border-2 border-[#b8860b] text-[#b8860b] hover:bg-[#b8860b] hover:text-[#0f1410] font-bold py-2 px-3 text-sm transition-colors"
                          >
                            Shop
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Top */}
      <section className="bg-[#0f1410] border-t-4 border-[#3a4a3a] py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <a
            href="#"
            className="inline-block bg-[#b8860b] hover:bg-[#d4a520] text-[#0f1410] font-bold py-3 px-8 transition-colors"
          >
            Back to Top
          </a>
        </div>
      </section>
    </main>
  )
}
