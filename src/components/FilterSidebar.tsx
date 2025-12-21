'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FilterSidebarProps {
  stores: { name: string; slug: string; count: number }[]
  categories: { name: string; slug: string; count: number }[]
  currentStore?: string
  currentCategory?: string
}

export function FilterSidebar({ stores, categories, currentStore, currentCategory }: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-20 z-30 bg-soft-black text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-charcoal transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span className="text-sm font-medium">Filter</span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        overflow-y-auto
      `}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-silver-light p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-charcoal">Filter Deals</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-cream rounded-full transition-colors"
          >
            <svg className="w-5 h-5 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Clear Filters */}
        {(currentStore || currentCategory) && (
          <div className="p-4 border-b border-silver-light">
            <Link
              href="/deals"
              className="text-maple-red hover:text-burgundy text-sm font-medium"
              onClick={() => setIsOpen(false)}
            >
              Clear all filters
            </Link>
          </div>
        )}

        {/* Stores */}
        <div className="p-4 border-b border-silver-light">
          <h3 className="font-semibold text-charcoal mb-3">Stores</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {stores.map(store => (
              <Link
                key={store.slug}
                href={`/stores/${store.slug}`}
                onClick={() => setIsOpen(false)}
                className={`
                  block px-3 py-2 rounded-lg text-sm transition-colors
                  ${currentStore === store.slug
                    ? 'bg-maple-red text-white'
                    : 'hover:bg-cream text-charcoal'
                  }
                `}
              >
                <span className="flex items-center justify-between">
                  <span>{store.name}</span>
                  <span className="text-xs opacity-60">{store.count}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="p-4">
          <h3 className="font-semibold text-charcoal mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map(cat => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setIsOpen(false)}
                className={`
                  block px-3 py-2 rounded-lg text-sm transition-colors
                  ${currentCategory === cat.slug
                    ? 'bg-maple-red text-white'
                    : 'hover:bg-cream text-charcoal'
                  }
                `}
              >
                <span className="flex items-center justify-between">
                  <span>{cat.name}</span>
                  <span className="text-xs opacity-60">{cat.count}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
