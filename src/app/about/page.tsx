import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Leaf, Target, Users, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Shop Canada - Canadian Deals & Savings',
  description: 'Shop Canada helps Canadians find the best deals from trusted retailers like Amazon.ca, Walmart, Costco, and more. Learn about our mission to save you money.',
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        {/* Hero */}
        <section className="bg-soft-black py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              About Shop Canada
            </h1>
            <p className="text-silver text-lg">
              Helping Canadians find great deals from the stores they trust.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Mission */}
            <div className="bg-white rounded-card p-8 shadow-soft mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-maple-red/10 rounded-lg">
                  <Leaf className="w-6 h-6 text-maple-red" />
                </div>
                <h2 className="text-2xl font-bold text-charcoal">Our Mission</h2>
              </div>
              <p className="text-slate leading-relaxed mb-4">
                Shop Canada was created with a simple goal: help Canadian shoppers save money on everyday purchases.
                We aggregate deals from major Canadian retailers including Amazon.ca, Walmart Canada, Costco, Best Buy,
                Canadian Tire, and many more, making it easy to find the best prices in one place.
              </p>
              <p className="text-slate leading-relaxed">
                Our team monitors prices across dozens of Canadian retailers, tracking discounts, sales events,
                and limited-time offers. Whether you're looking for electronics, home goods, fashion, groceries,
                or sporting equipment, we help you find deals that matter.
              </p>
            </div>

            {/* How It Works */}
            <div className="bg-white rounded-card p-8 shadow-soft mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-maple-red/10 rounded-lg">
                  <Target className="w-6 h-6 text-maple-red" />
                </div>
                <h2 className="text-2xl font-bold text-charcoal">How It Works</h2>
              </div>
              <p className="text-slate leading-relaxed mb-4">
                We use automated systems to scan retailer websites and flyers for the latest deals. When we find
                a significant discount or sale, we add it to our database with all the details you need: the
                original price, sale price, discount percentage, and a direct link to purchase.
              </p>
              <p className="text-slate leading-relaxed mb-4">
                Deals are updated throughout the day, so you can always find fresh savings. We categorize deals
                by store, category, and discount level, making it simple to browse and discover new offers.
              </p>
              <p className="text-slate leading-relaxed">
                Every deal links directly to the retailer's website where you can complete your purchase.
                We never sell products directly—we simply help you find the best prices from stores you already
                know and trust.
              </p>
            </div>

            {/* For Canadians */}
            <div className="bg-white rounded-card p-8 shadow-soft mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-maple-red/10 rounded-lg">
                  <Users className="w-6 h-6 text-maple-red" />
                </div>
                <h2 className="text-2xl font-bold text-charcoal">Built for Canadians</h2>
              </div>
              <p className="text-slate leading-relaxed mb-4">
                Unlike deal sites that focus on US retailers, Shop Canada is built specifically for Canadian
                shoppers. All prices are in Canadian dollars, all retailers ship to Canada, and we understand
                the stores that Canadians actually shop at.
              </p>
              <p className="text-slate leading-relaxed">
                From coast to coast, we feature deals from national chains and regional favourites. Whether
                you're in Vancouver, Calgary, Toronto, Montreal, or Halifax, you'll find deals relevant to you.
              </p>
            </div>

            {/* Affiliate Disclosure */}
            <div className="bg-ivory rounded-card p-8 border border-silver-light">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-maple-red/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-maple-red" />
                </div>
                <h2 className="text-2xl font-bold text-charcoal">How We Earn</h2>
              </div>
              <p className="text-slate leading-relaxed mb-4">
                Shop Canada is a free service supported by affiliate partnerships. When you click a deal and
                make a purchase, we may earn a small commission from the retailer. This doesn't affect the
                price you pay—it's simply how retailers reward sites that send them customers.
              </p>
              <p className="text-slate leading-relaxed">
                These commissions help us keep the site running and continue finding great deals for Canadian
                shoppers. We appreciate your support!
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <Link href="/deals" className="btn-primary inline-block">
                Browse Today's Deals
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
