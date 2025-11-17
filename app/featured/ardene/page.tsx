import Link from 'next/link'
import { Breadcrumbs } from '@/components/breadcrumbs'

export default function ArdenePage() {
  return (
    <main className="bg-[#1a3a1a] min-h-screen">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Featured Brands', href: '/#featured' },
        { label: 'Ardene' }
      ]} />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="inline-block bg-[#5c1a1a] px-4 py-2 mb-4">
            <span className="text-[#b8860b] font-bold text-sm">🇨🇦 FEATURED CANADIAN BRAND</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#f4ede4] mb-4 text-balance">
            Ardene: Affordable Fashion for Every Canadian
          </h1>
        </div>

        <div className="bg-[#0f1410] border-2 border-[#3a4a3a] p-8 mb-8">
          <img
            src="/ardene-fashion-lifestyle.jpg"
            alt="Ardene fashion lifestyle"
            className="w-full h-64 object-cover mb-6"
          />

          <div className="prose prose-invert max-w-none">
            <div className="text-[#f4ede4] leading-relaxed space-y-6 text-lg">
              <p>
                Founded in <strong className="text-[#b8860b]">Montreal in 1982</strong>, Ardene has grown from a small accessories retailer to a fashion destination with over 250 stores across Canada and beyond. What started as a jewelry and accessories shop has evolved into a one-stop destination for trend-conscious shoppers looking for affordable, on-trend fashion.
              </p>

              <p>
                Ardene is known for its accessible price points and youthful, vibrant style. Whether you're looking for the latest fashion trends, comfortable basics, or statement accessories, Ardene delivers head-to-toe outfits without breaking the bank.
              </p>

              <p>
                The brand has expanded its offerings to include clothing, shoes, beauty products, and accessories for women, with recent additions for men and kids. Ardene also launched the eco-conscious "Ardene Collective" line, showing commitment to sustainable fashion.
              </p>

              <div className="bg-[#1a2a1a] border-l-4 border-[#b8860b] p-6 my-8">
                <h3 className="text-[#b8860b] font-bold text-xl mb-3">Why Shop Ardene</h3>
                <ul className="space-y-2 text-[#f4ede4]">
                  <li>✓ Founded in Montreal, QC in 1982</li>
                  <li>✓ Over 250 stores across North America</li>
                  <li>✓ Affordable, trend-forward fashion</li>
                  <li>✓ Sustainable "Ardene Collective" line</li>
                  <li>✓ Complete outfits from head to toe</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <a
                  href="https://www.ardene.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-transparent text-[#b8860b] px-8 py-4 font-bold text-center border-2 border-[#b8860b] hover:bg-[#5c1a1a] transition-colors"
                >
                  VISIT ARDENE.COM →
                </a>
                <a
                  href="https://shopstyle.it/l/cwE8W"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="flex-1 bg-[#b8860b] text-[#0f1410] px-8 py-4 font-bold text-center hover:bg-[#d4a520] transition-colors"
                >
                  ARDENE SALE ON NOW!
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
