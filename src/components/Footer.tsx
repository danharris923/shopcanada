import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-soft-black text-silver">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🍁</span>
              <span className="font-bold text-xl text-white">
                Shop<span className="text-maple-red">Canada</span>
              </span>
            </Link>
            <p className="text-sm text-silver mb-4">
              Your destination for the best Canadian deals, discounts, and Canadian-made products.
              Shop Canadian. Support Local.
            </p>
            <p className="text-xs text-slate">
              Made for Canadian Shoppers
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 uppercase text-sm tracking-wide">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/deals" className="hover:text-cream transition-colors">All Deals</Link></li>
              <li><Link href="/stores" className="hover:text-cream transition-colors">Stores</Link></li>
              <li><Link href="/category" className="hover:text-cream transition-colors">Categories</Link></li>
              <li><Link href="/canadian" className="hover:text-cream transition-colors">Canadian Brands</Link></li>
            </ul>
          </div>

          {/* Popular Stores */}
          <div>
            <h3 className="font-semibold text-white mb-4 uppercase text-sm tracking-wide">Popular Stores</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/stores/amazon" className="hover:text-cream transition-colors">Amazon.ca</Link></li>
              <li><Link href="/stores/walmart" className="hover:text-cream transition-colors">Walmart Canada</Link></li>
              <li><Link href="/stores/costco" className="hover:text-cream transition-colors">Costco</Link></li>
              <li><Link href="/stores/best-buy" className="hover:text-cream transition-colors">Best Buy</Link></li>
              <li><Link href="/stores/canadian-tire" className="hover:text-cream transition-colors">Canadian Tire</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-white mb-4 uppercase text-sm tracking-wide">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/category/electronics" className="hover:text-cream transition-colors">Electronics</Link></li>
              <li><Link href="/category/fashion" className="hover:text-cream transition-colors">Fashion</Link></li>
              <li><Link href="/category/home" className="hover:text-cream transition-colors">Home</Link></li>
              <li><Link href="/category/grocery" className="hover:text-cream transition-colors">Grocery</Link></li>
              <li><Link href="/category/beauty" className="hover:text-cream transition-colors">Beauty</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-charcoal mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate">
            &copy; {new Date().getFullYear()} Shop Canada. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-slate">
            <Link href="/privacy" className="hover:text-cream transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-cream transition-colors">Terms</Link>
            <Link href="/about" className="hover:text-cream transition-colors">About</Link>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className="mt-6 text-xs text-slate text-center">
          <p>
            As an affiliate, Shop Canada earns from qualifying purchases.
            Prices and availability are subject to change.
          </p>
        </div>
      </div>
    </footer>
  )
}
