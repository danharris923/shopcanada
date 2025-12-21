'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function HeroSearch() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search deals..."
          className="w-full px-5 py-3 pl-12 rounded-full bg-white/10 text-white placeholder-white/60 border border-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white"
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-white/20 text-white rounded-full font-medium border border-white/50 hover:bg-white/30 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  )
}
