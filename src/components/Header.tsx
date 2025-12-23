'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Leaf, Home, ShoppingBag, Store, Grid3X3 } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/canadian', label: 'Canadian Retailers', icon: Leaf, highlight: true },
  { href: '/deals', label: 'Sales', icon: ShoppingBag },
  { href: '/stores', label: 'Stores', icon: Store },
  { href: '/canadian/categories', label: 'Categories', icon: Grid3X3 },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-soft-black sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
            <Leaf size={24} className="text-maple-red" />
            Shop Canada
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
                  ${link.highlight
                    ? 'bg-maple-red/10 text-maple-red hover:bg-maple-red hover:text-white'
                    : 'text-silver hover:text-white hover:bg-white/10'
                  }
                `}
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${mobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'}
          `}
        >
          <nav className="flex flex-col gap-1 pt-2 border-t border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all
                  ${link.highlight
                    ? 'bg-maple-red/10 text-maple-red'
                    : 'text-silver hover:text-white hover:bg-white/10'
                  }
                `}
              >
                <link.icon size={20} />
                {link.label}
                {link.highlight && (
                  <span className="ml-auto text-xs bg-maple-red text-white px-2 py-0.5 rounded-full">
                    600+ retailers
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
