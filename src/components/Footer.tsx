import Link from 'next/link'
import { Leaf } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-soft-black text-silver">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-bold text-xl text-white mb-4 inline-block">
              Shop Canada
            </Link>
            <p className="text-sm text-silver mb-4">
              Canadian sales at Canadian stores for Canadian people.
            </p>
            <p className="text-xs text-slate">
              Made for Canadian Shoppers
            </p>
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

          {/* More Stores */}
          <div>
            <h3 className="font-semibold text-white mb-4 uppercase text-sm tracking-wide">More Stores</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/stores/shoppers" className="hover:text-cream transition-colors">Shoppers Drug Mart</Link></li>
              <li><Link href="/stores/home-depot" className="hover:text-cream transition-colors">Home Depot</Link></li>
              <li><Link href="/stores/the-bay" className="hover:text-cream transition-colors">The Bay</Link></li>
              <li><Link href="/stores/sport-chek" className="hover:text-cream transition-colors">Sport Chek</Link></li>
              <li><Link href="/stores/indigo" className="hover:text-cream transition-colors">Indigo</Link></li>
            </ul>
          </div>
        </div>

        {/* Canadian Brand Directory Card */}
        <div className="mt-8 p-6 bg-gradient-to-r from-burgundy to-maple-red rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Canadian Brand Directory</h3>
                <p className="text-white/80 text-sm">
                  Your destination for the best Canadian deals, discounts, and Canadian-made products. Shop Canadian. Support Local.
                </p>
              </div>
            </div>
            <Link
              href="/canadian"
              className="bg-white text-maple-red hover:bg-cream font-bold py-3 px-6 rounded-button transition-colors whitespace-nowrap"
            >
              Explore Brands
            </Link>
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
