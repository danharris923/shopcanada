import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Home, Search, Store, ShoppingBag } from 'lucide-react'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="text-8xl font-bold text-maple-red mb-4">404</div>
          <h1 className="text-2xl font-bold text-charcoal mb-2">
            Page Not Found
          </h1>
          <p className="text-slate mb-8">
            Sorry, we couldn't find the page you're looking for.
            It may have been moved or no longer exists.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-card border border-silver-light hover:border-maple-red transition-colors group"
            >
              <Home className="text-maple-red" size={24} />
              <span className="text-sm font-medium text-charcoal group-hover:text-maple-red">
                Home
              </span>
            </Link>
            <Link
              href="/deals"
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-card border border-silver-light hover:border-maple-red transition-colors group"
            >
              <ShoppingBag className="text-maple-red" size={24} />
              <span className="text-sm font-medium text-charcoal group-hover:text-maple-red">
                Deals
              </span>
            </Link>
            <Link
              href="/stores"
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-card border border-silver-light hover:border-maple-red transition-colors group"
            >
              <Store className="text-maple-red" size={24} />
              <span className="text-sm font-medium text-charcoal group-hover:text-maple-red">
                Stores
              </span>
            </Link>
            <Link
              href="/search"
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-card border border-silver-light hover:border-maple-red transition-colors group"
            >
              <Search className="text-maple-red" size={24} />
              <span className="text-sm font-medium text-charcoal group-hover:text-maple-red">
                Search
              </span>
            </Link>
          </div>

          <Link href="/" className="btn-primary">
            Back to Homepage
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
