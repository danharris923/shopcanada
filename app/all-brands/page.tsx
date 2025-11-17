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
    <main className="min-h-screen bg-[#0f1410]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'All Brands' }
          ]} 
        />

        <div className="mt-8">
          <h1 className="text-4xl md:text-5xl font-serif text-[#b8860b] mb-4">
            All Canadian Brands
          </h1>
          <p className="text-xl text-[#b8a896] mb-8">
            Complete directory of {brands.length} authentic Canadian brands
          </p>

          {/* A-Z Index */}
          <div className="flex flex-wrap gap-2 mb-12 pb-6 border-b-2 border-[#3a4a3a]">
            {letters.map(letter => (
              <a
                key={letter}
                href={`#${letter}`}
                className="w-10 h-10 flex items-center justify-center bg-[#1a2a1a] border-2 border-[#3a4a3a] text-[#b8860b] hover:bg-[#2a3a2a] hover:border-[#b8860b] transition-all font-bold"
              >
                {letter}
              </a>
            ))}
          </div>

          {/* Brand Groups */}
          {letters.map(letter => (
            <div key={letter} id={letter} className="mb-12">
              <h2 className="text-3xl font-serif text-[#b8860b] mb-6 pb-2 border-b border-[#3a4a3a]">
                {letter}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedBrands[letter].map(brand => (
                  <Link
                    key={brand.slug}
                    href={`/brand/${brand.slug}`}
                    className="group flex items-center gap-4 p-4 bg-[#1a2a1a] border-2 border-[#3a4a3a] hover:border-[#b8860b] transition-all"
                  >
                    <div className="w-12 h-12 bg-[#0f1410] border border-[#3a4a3a] flex items-center justify-center shrink-0">
                      <span className="text-2xl">🍁</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-[#f4ede4] group-hover:text-[#b8860b] truncate">
                        {brand.name}
                      </h3>
                      <p className="text-sm text-[#b8a896]">{brand.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
