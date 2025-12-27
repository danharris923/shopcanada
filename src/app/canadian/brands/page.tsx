import { Leaf } from 'lucide-react'
import Link from 'next/link'
import { brands, categories } from '@/lib/brands-data'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { StatsBar } from '@/components/StatsBar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Canadian Brands',
  description: 'Browse our complete directory of Canadian brands. Support local businesses and discover quality Canadian-made products.',
}

export default function AllBrandsPage() {
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
      <StatsBar />
      <main className="bg-cream min-h-screen">
        {/* Hero */}
        <section className="bg-burgundy py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-4">
              <Link href="/canadian" className="text-silver-light hover:text-white text-sm">
                &larr; Back to Canadian Brands
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              All Canadian Brands
            </h1>
            <p className="text-silver-light text-lg">
              {brands.length} verified Canadian brands to explore
            </p>
          </div>
        </section>

        {/* Letter Navigation */}
        <section className="bg-white border-b border-silver-light py-4 px-6 sticky top-0 z-30">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-2 justify-center">
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

        {/* Brands List */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            {letters.map(letter => (
              <div key={letter} id={`letter-${letter}`} className="mb-12">
                <h2 className="text-3xl font-bold text-charcoal mb-6 pb-2 border-b-2 border-maple-red">
                  {letter}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                      <p className="text-sm text-slate mb-4 line-clamp-2">
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
                            Shop Now
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
