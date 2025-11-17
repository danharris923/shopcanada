import Link from 'next/link'
import { Breadcrumbs } from '@/components/breadcrumbs'

export default function RootsPage() {
  return (
    <main className="bg-[#1a3a1a] min-h-screen">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Featured Brands', href: '/#featured' },
        { label: 'Roots' }
      ]} />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="inline-block bg-[#5c1a1a] px-4 py-2 mb-4">
            <span className="text-[#b8860b] font-bold text-sm">🇨🇦 FEATURED CANADIAN BRAND</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#f4ede4] mb-4 text-balance">
            Roots: A Canadian Heritage Brand Built on Comfort and Craftsmanship
          </h1>
        </div>

        <div className="bg-[#0f1410] border-2 border-[#3a4a3a] p-8 mb-8">
          <img 
            src="/roots-canada-leather-goods-sweatpants-cabin-clothi.jpg" 
            alt="Roots leather goods and apparel"
            className="w-full h-64 object-cover mb-6"
          />
          
          <div className="prose prose-invert max-w-none">
            <div className="text-[#f4ede4] leading-relaxed space-y-6 text-lg">
              <p>
                Few brands capture the spirit of Canada like Roots. Founded in <strong className="text-[#b8860b]">Toronto in 1973</strong>, Roots became famous for its high-quality leather goods and cozy cabin-inspired clothing long before "loungewear" became a trend. For many Canadians, their first pair of sweatpants came from Roots — and they often lasted a decade or more.
              </p>

              <p>
                Roots' commitment to craftsmanship sets it apart. Many of their leather products are still made right here in Canada at the <strong className="text-[#b8860b]">Roots Leather Factory</strong>. Their fleece, sweats, and hoodies are known for that authentic cottage-country look: warm, soft, and built to last.
              </p>

              <p>
                In a time where consumers are rethinking foreign imports and looking to support domestic brands, Roots is the ultimate buy Canadian brand. It represents comfort, quality, nostalgia, and true Canadian identity.
              </p>

              <div className="bg-[#1a2a1a] border-l-4 border-[#b8860b] p-6 my-8">
                <h3 className="text-[#b8860b] font-bold text-xl mb-3">Why Shop Roots</h3>
                <ul className="space-y-2 text-[#f4ede4]">
                  <li>✓ Founded in Toronto, ON in 1973</li>
                  <li>✓ Many products made in Canada at Roots Leather Factory</li>
                  <li>✓ Exceptional quality that lasts for years</li>
                  <li>✓ Authentic Canadian heritage and cottage-country style</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <a 
                  href="https://www.roots.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#b8860b] text-[#0f1410] px-8 py-4 font-bold text-center hover:bg-[#d4a520] transition-colors"
                >
                  VISIT ROOTS.COM →
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
