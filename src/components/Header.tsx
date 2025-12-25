'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X, Leaf, Home, ShoppingBag, Store, Grid3X3, Search } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/stores', label: 'Browse Stores', icon: Store },
  { href: '/deals', label: "Today's Deals", icon: ShoppingBag },
  { href: '/categories', label: 'Categories', icon: Grid3X3 },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="bg-soft-black sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white shrink-0">
            <Leaf size={24} className="text-maple-red" />
            <span className="hidden sm:inline">Shop Canada</span>
          </Link>

          {/* Search Bar - Center */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products or stores..."
                className="w-full px-4 py-2 pl-10 pr-20 rounded-full bg-white/10 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white text-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium border border-white/30 hover:bg-white/30 transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Hamburger Menu Button - Now for both desktop and mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors shrink-0"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation Menu - Slide out for both desktop and mobile */}
        <div
          className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${menuOpen ? 'max-h-96 pb-4' : 'max-h-0'}
          `}
        >
          <nav className="flex flex-col gap-1 pt-2 border-t border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all text-silver hover:text-white hover:bg-white/10"
              >
                <link.icon size={20} />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
