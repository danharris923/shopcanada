import Link from 'next/link'
import { brands, categories, getBrandBySlug } from '@/lib/brands-data'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
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
    <>
      <Header />
      <main className="bg-cream min-h-screen">
        {/* Hero Section */}
        <section className="bg-burgundy py-12 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-4">
              <Link href="/" className="text-silver-light hover:text-white text-sm">
                &larr; Back to Deals
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Canadian Brands
            </h1>
            <p className="text-lg text-silver-light mb-2 max-w-2xl mx-auto">
              Support Canadian businesses. Browse {totalBrands} quality brands.
            </p>
          </div>
        </section>

        {/* Icons of Canadian Retail - Featured Brands */}
        <section className="bg-soft-black py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block bg-burgundy px-4 py-2 rounded-lg mb-3">
                <span className="text-white font-bold text-sm">FEATURED CANADIAN BRANDS</span>
              </div>
              <h2 className="text-3xl font-bold text-white">
                Icons of Canadian Retail
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredBrands.map((brand: any) => (
                <div
                  key={brand.slug}
                  className="group bg-charcoal border border-slate hover:border-maple-red transition-all overflow-hidden rounded-card"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={brand.image}
                      alt={`${brand.name} lifestyle`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                    <div className="absolute top-2 left-2 bg-maple-red px-2 py-1 rounded">
                      <span className="text-white text-xs font-bold">EST. {brand.founded?.split(', ')[1]}</span>
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
                        <div className="w-10 h-10 rounded bg-cream flex items-center justify-center flex-shrink-0 text-xl">
                          🍁
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-bold text-white">{brand.name}</h3>
                        <span className="text-xs text-silver">{brand.founded}</span>
                      </div>
                    </div>
                    <p className="text-sm text-silver mb-4">{brand.tagline}</p>

                    {brand.amazonLink ? (
                      <a
                        href={brand.amazonLink}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="block w-full text-center bg-maple-red hover:bg-burgundy text-white font-bold py-2 px-4 text-sm transition-colors rounded-button mb-2"
                      >
                        {brand.buttonText?.toUpperCase() || 'SHOP NOW'}
                      </a>
                    ) : null}

                    <Link
                      href={`/canadian/brand/${brand.slug}`}
                      className="block w-full text-center border border-maple-red text-maple-red hover:bg-maple-red hover:text-white font-bold py-2 px-4 text-sm transition-colors rounded-button"
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
        <section className="bg-white border-b border-silver-light py-3 px-4 sticky top-0 z-30">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-1 justify-center">
              {letters.map(letter => (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="w-8 h-8 flex items-center justify-center bg-ivory text-charcoal hover:bg-maple-red hover:text-white transition-colors font-bold text-sm rounded"
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
              <div className="sticky top-16 bg-white border border-silver-light rounded-card p-4">
                <h3 className="text-maple-red font-bold text-sm mb-4 uppercase tracking-wider">
                  Categories
                </h3>
                <ul className="space-y-1 max-h-[70vh] overflow-y-auto">
                  {categories.map(category => (
                    <li key={category.slug}>
                      <Link
                        href={`/canadian/category/${category.slug}`}
                        className="flex items-center gap-2 text-sm py-2 px-2 text-slate hover:text-charcoal hover:bg-ivory rounded transition-colors"
                      >
                        <span className="text-base">{category.icon}</span>
                        <span className="flex-1 truncate">{category.name}</span>
                        <span className="text-xs text-maple-red font-semibold">{category.brandCount}</span>
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
                  <h2 className="text-2xl font-bold text-charcoal mb-4 pb-2 border-b-2 border-maple-red">
                    {letter}
                  </h2>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {brandsByLetter[letter].map(brand => (
                      <div
                        key={brand.slug}
                        className="bg-white border border-silver-light hover:border-maple-red transition-all p-4 rounded-card"
                      >
                        <div className="flex items-start gap-3 mb-2">
                          {brand.logo ? (
                            <img
                              src={brand.logo}
                              alt={`${brand.name} logo`}
                              className="w-10 h-10 rounded object-contain bg-cream flex-shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded bg-cream flex items-center justify-center flex-shrink-0 text-xl">
                              🍁
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-charcoal truncate">
                              {brand.name}
                            </h3>
                            <span className="text-xs bg-ivory text-slate px-2 py-0.5 inline-block rounded">
                              {brand.category}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-slate mb-3 line-clamp-2">
                          {brand.description}
                        </p>
                        <div className="flex gap-2">
                          <Link
                            href={`/canadian/brand/${brand.slug}`}
                            className="flex-1 text-center bg-maple-red hover:bg-burgundy text-white font-bold py-2 px-3 text-sm transition-colors rounded-button"
                          >
                            Read More
                          </Link>
                          {brand.amazonLink && (
                            <a
                              href={brand.amazonLink}
                              target="_blank"
                              rel="nofollow noopener noreferrer"
                              className="flex-1 text-center border border-maple-red text-maple-red hover:bg-maple-red hover:text-white font-bold py-2 px-3 text-sm transition-colors rounded-button"
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
        <section className="bg-soft-black py-8 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <a
              href="#"
              className="btn-primary"
            >
              Back to Top
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
