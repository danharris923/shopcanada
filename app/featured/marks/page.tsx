import Link from 'next/link'
import { Breadcrumbs } from '@/components/breadcrumbs'

export default function MarksPage() {
  return (
    <main className="bg-[#f5f0e8] min-h-screen">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Featured Brands', href: '/#featured' },
        { label: "Mark's" }
      ]} />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="inline-block bg-[#5c1a1a] px-4 py-2 mb-4">
            <span className="text-[#b8860b] font-bold text-sm">🇨🇦 FEATURED CANADIAN BRAND</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#2a2a2a] mb-4 text-balance">
            Mark's: Practical Canadian Clothing for Real Canadian Weather
          </h1>
        </div>

        <div className="bg-[#0f1410] border-2 border-[#3a4a3a] p-8 mb-8">
          <img 
            src="/marks-work-wearhouse-winter-boots-workwear-canadia.jpg" 
            alt="Mark's workwear and winter clothing"
            className="w-full h-64 object-cover mb-6"
          />
          
          <div className="prose prose-invert max-w-none">
            <div className="text-[#f4ede4] leading-relaxed space-y-6 text-lg">
              <p>
                Mark's (originally Mark's Work Wearhouse) may be one of the most practical, underrated Canadian retailers. Founded in <strong className="text-[#b8860b]">Calgary in 1977</strong>, the brand built its reputation on tough, functional workwear made to withstand real Canadian conditions — snow, slush, rain, black ice, and the occasional -30°C wind chill.
              </p>

              <p>
                While Mark's started as a workwear shop, it has grown into a national destination for everyday apparel, winter boots, outdoor clothing, and reliable basics. Their in-house labels like <strong className="text-[#b8860b]">Dakota and WindRiver</strong> focus on durability and weather protection, not fast fashion.
              </p>

              <p>
                Mark's is a perfect example of a Canadian brand that understands Canadian life. With more shoppers looking to buy domestic and support brands closer to home, Mark's hits the sweet spot between affordability, practicality, and homegrown reliability.
              </p>

              <div className="bg-[#1a2a1a] border-l-4 border-[#b8860b] p-6 my-8">
                <h3 className="text-[#b8860b] font-bold text-xl mb-3">Why Shop Mark's</h3>
                <ul className="space-y-2 text-[#f4ede4]">
                  <li>✓ Founded in Calgary, AB in 1977</li>
                  <li>✓ Built for real Canadian weather conditions</li>
                  <li>✓ Quality in-house brands like Dakota and WindRiver</li>
                  <li>✓ Affordable, practical, and reliable workwear</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <a 
                  href="https://www.marks.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#b8860b] text-[#0f1410] px-8 py-4 font-bold text-center hover:bg-[#d4a520] transition-colors"
                >
                  VISIT MARKS.COM →
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
