import Link from 'next/link'
import { Breadcrumbs } from '@/components/breadcrumbs'

export default function AritziaPage() {
  return (
    <main className="bg-[#1a3a1a] min-h-screen">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Featured Brands', href: '/#featured' },
        { label: 'Aritzia' }
      ]} />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="inline-block bg-[#5c1a1a] px-4 py-2 mb-4">
            <span className="text-[#b8860b] font-bold text-sm">🇨🇦 FEATURED CANADIAN BRAND</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#f4ede4] mb-4 text-balance">
            Aritzia: Elevated Canadian Fashion With a Cult Following
          </h1>
        </div>

        <div className="bg-[#0f1410] border-2 border-[#3a4a3a] p-8 mb-8">
          <img 
            src="/aritzia-fashion-clothing-store-super-puff-jacket.jpg" 
            alt="Aritzia fashion and storefront"
            className="w-full h-64 object-cover mb-6"
          />
          
          <div className="prose prose-invert max-w-none">
            <div className="text-[#f4ede4] leading-relaxed space-y-6 text-lg">
              <p>
                If you've ever wondered why everyone seems obsessed with Aritzia, the answer is quality, consistency, and timeless style. Founded in <strong className="text-[#b8860b]">Vancouver in 1984</strong>, Aritzia didn't rely on splashy advertising or trend-chasing. It grew quietly through word of mouth — offering premium fabrics, beautiful tailoring, and minimalist Canadian design.
              </p>

              <p>
                Aritzia's biggest strength is its curated in-house labels: <strong className="text-[#b8860b]">Wilfred, Babaton, TNA, and Sunday Best</strong>. Each one feels like its own brand, giving shoppers a range of styles from cozy modern basics to elevated businesswear. Their famous Super Puff jackets have become a must-have winter staple across Canada.
              </p>

              <p>
                As more consumers look to shift purchases toward Canadian retailers, Aritzia stands out as a homegrown success story. It's proof that Canadian fashion can compete with high-end U.S. and European brands — and often outshine them.
              </p>

              <div className="bg-[#1a2a1a] border-l-4 border-[#b8860b] p-6 my-8">
                <h3 className="text-[#b8860b] font-bold text-xl mb-3">Why Shop Aritzia</h3>
                <ul className="space-y-2 text-[#f4ede4]">
                  <li>✓ Founded in Vancouver, BC in 1984</li>
                  <li>✓ Curated in-house labels with premium quality</li>
                  <li>✓ Famous Super Puff jackets and elevated basics</li>
                  <li>✓ Timeless style and exceptional tailoring</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <a 
                  href="https://www.aritzia.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#b8860b] text-[#0f1410] px-8 py-4 font-bold text-center hover:bg-[#d4a520] transition-colors"
                >
                  VISIT ARITZIA.COM →
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/#featured" 
            className="inline-block text-[#b8860b] hover:text-[#d4a520] font-bold"
          >
            ← Back to Featured Brands
          </Link>
        </div>
      </div>
    </main>
  )
}
