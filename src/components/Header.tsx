import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🍁</span>
            <span className="font-bold text-xl text-charcoal">
              Shop<span className="text-maple-red">Canada</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/deals"
              className="nav-link"
            >
              All Deals
            </Link>
            <Link
              href="/stores"
              className="nav-link"
            >
              Stores
            </Link>
            <Link
              href="/category"
              className="nav-link"
            >
              Categories
            </Link>
            <Link
              href="/canadian"
              className="nav-link"
            >
              Canadian Brands
            </Link>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/deals"
              className="
                hidden sm:inline-flex
                items-center gap-1.5
                px-4 py-2 rounded-lg
                bg-maple-red hover:bg-burgundy
                text-white font-semibold text-sm
                transition-colors
              "
            >
              <span>Browse Deals</span>
            </Link>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-slate">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
