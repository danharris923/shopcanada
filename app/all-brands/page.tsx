import Link from 'next/link'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { brands } from '@/lib/brands-data'

export default function AllBrandsPage() {
  // Group brands by first letter
  const groupedBrands = brands.reduce((acc, brand) => {
    const firstLetter = brand.name[0].toUpperCase()
    if (!acc[firstLetter]) {
      acc[firstLetter] = []
    }
    acc[firstLetter].push(brand)
    return acc
  }, {} as Record<string, typeof brands>)

  const letters = Object.keys(groupedBrands).sort()

  return (
    <main className="min-h-screen bg-[#f5f0e8]">
      {/* Hero Section */}
      <div className="bg-[#0f1410] py-16 px-6 border-b-4 border-[#3a4a3a]">
        <div className="max-w-6xl mx-auto">
          <div className="inline-block mb-4 px-4 py-2 bg-[#5c1a1a] text-[#b8860b] text-xs tracking-widest border border-[#b8860b]">
            COMPLETE DIRECTORY • {brands.length} BRANDS
          </div>
          <h1 className="text-5xl md:text-6xl font-serif mb-6 text-[#f4ede4]">
            All Canadian Brands
          </h1>
          <p className="text-xl text-[#b8a896] max-w-3xl leading-relaxed">
            Browse our complete directory of {brands.length} authentic Canadian brands.
            From heritage manufacturers to modern innovators, find the perfect Canadian
            company to support.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* A-Z Index */}
          <div className="flex flex-wrap gap-2 mb-12 pb-6 border-b-2 border-[#3a4a3a]">
            {letters.map(letter => (
              <a
                key={letter}
                href={`#${letter}`}
                className="w-10 h-10 flex items-center justify-center bg-[#0f1410] border-2 border-[#3a4a3a] text-[#b8860b] hover:bg-[#1a2a1a] hover:border-[#b8860b] transition-all font-bold"
              >
                {letter}
              </a>
            ))}
          </div>

          {/* Brand Groups */}
          {letters.map(letter => (
            <div key={letter} id={letter} className="mb-12">
              <h2 className="text-3xl font-serif text-[#5c1a1a] mb-6 pb-2 border-b border-[#3a4a3a]">
                {letter}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedBrands[letter].map(brand => (
                  <Link
                    key={brand.slug}
                    href={`/brand/${brand.slug}`}
                    className="group flex items-center gap-4 p-4 bg-white border-2 border-[#3a4a3a] hover:border-[#b8860b] transition-all"
                  >
                    <div className="w-12 h-12 bg-[#0f1410] border border-[#3a4a3a] flex items-center justify-center shrink-0">
                      <span className="text-2xl">🍁</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-[#2a2a2a] group-hover:text-[#b8860b] truncate">
                        {brand.name}
                      </h3>
                      <p className="text-sm text-[#5a5a5a]">{brand.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
