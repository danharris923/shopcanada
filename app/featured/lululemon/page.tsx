import Link from 'next/link'
import { Breadcrumbs } from '@/components/breadcrumbs'

export default function LululemonPage() {
  return (
    <main className="bg-[#1a3a1a] min-h-screen">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Featured Brands', href: '/#featured' },
        { label: 'Lululemon' }
      ]} />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="inline-block bg-[#5c1a1a] px-4 py-2 mb-4">
            <span className="text-[#b8860b] font-bold text-sm">🇨🇦 FEATURED CANADIAN BRAND</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#f4ede4] mb-4 text-balance">
            Lululemon: Canada's Global Athleisure Icon
          </h1>
        </div>

        <div className="bg-[#0f1410] border-2 border-[#3a4a3a] p-8 mb-8">
          <img 
            src="/lululemon-yoga-pants-athletic-wear-storefront.jpg" 
            alt="Lululemon storefront and products"
            className="w-full h-64 object-cover mb-6"
          />
          
          <div className="prose prose-invert max-w-none">
            <div className="text-[#f4ede4] leading-relaxed space-y-6 text-lg">
              <p>
                Lululemon is one of the most successful Canadian brands of all time — and it's easy to see why. Founded in <strong className="text-[#b8860b]">Vancouver in 1998</strong>, the company started small, designing premium yoga apparel long before "athleisure" became the powerhouse category it is today. What made Lululemon different was simple: better fabrics, better fit, and better performance than anything else on the market.
              </p>

              <p>
                From the buttery-soft Nulu leggings to the famous ABC pants, Lululemon built its reputation on innovation. The brand focuses heavily on material technology, comfort, and functional design — something Canadians appreciate, especially with our unpredictable weather and active lifestyles.
              </p>

              <p>
                Today, Lululemon is a global phenomenon, but it still carries the relaxed, mindful, West Coast energy that made it special. For shoppers who want to support Canadian companies — especially during ongoing U.S.–Canada tariff tension — Lululemon is a standout example of a homegrown brand competing at the world's highest level.
              </p>

              <div className="bg-[#1a2a1a] border-l-4 border-[#b8860b] p-6 my-8">
                <h3 className="text-[#b8860b] font-bold text-xl mb-3">Why Shop Lululemon</h3>
                <ul className="space-y-2 text-[#f4ede4]">
                  <li>✓ Founded in Vancouver, BC in 1998</li>
                  <li>✓ Innovative fabric technology and performance design</li>
                  <li>✓ Global leader in athleisure category</li>
                  <li>✓ Supporting a Canadian success story</li>
                </ul>
              </div>

              <div className="pt-6">
                <a
                  href="https://shopstyle.it/l/cwE20"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="block w-full bg-[#b8860b] text-[#0f1410] px-8 py-4 font-bold text-center hover:bg-[#d4a520] transition-colors"
                >
                  WE MADE TOO MUCH SALE!
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
