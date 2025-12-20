import Link from 'next/link'
import { brands, categories } from '@/lib/brands-data'
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
            All Canadian Brands
          </h1>
          <p className="text-[#b8a896] text-lg">
            {brands.length} verified Canadian brands to explore
          </p>
        </div>
      </section>

      {/* Letter Navigation */}
      <section className="bg-[#0f1410] border-b border-[#3a4a3a] py-4 px-6 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {letters.map(letter => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-8 h-8 flex items-center justify-center bg-[#3a4a3a] text-[#f4ede4] hover:bg-[#b8860b] hover:text-[#0f1410] transition-colors font-bold text-sm"
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
              <h2 className="text-3xl font-serif text-[#2a2a2a] mb-6 pb-2 border-b-2 border-[#b8860b]">
                {letter}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    <p className="text-sm text-[#5a5a5a] mb-4 line-clamp-2">
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
  )
}
