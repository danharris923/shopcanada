'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface DealFeedFiltersProps {
  categories: string[]
  currentCategory?: string
  currentMinDiscount?: number
}

export function DealFeedFilters({
  categories,
  currentCategory,
  currentMinDiscount,
}: DealFeedFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === null || value === '' || value === 'all') params.delete(key)
    else params.set(key, value)
    router.push(`/daily?${params.toString()}`)
  }

  const discount = currentMinDiscount ?? 0

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 mb-8 space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <label
          htmlFor="feed-category"
          className="text-sm text-slate font-semibold"
        >
          Category:
        </label>
        <select
          id="feed-category"
          value={currentCategory ?? 'all'}
          onChange={(e) => updateParam('category', e.target.value)}
          className="px-3 py-1.5 rounded border border-slate-300 bg-white text-soft-black text-sm focus:outline-none focus:ring-2 focus:ring-maple-red"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3 max-w-md">
        <label
          htmlFor="feed-min-discount"
          className="text-sm text-slate font-semibold whitespace-nowrap"
        >
          Minimum discount:
        </label>
        <input
          id="feed-min-discount"
          type="range"
          min={0}
          max={90}
          step={5}
          value={discount}
          onChange={(e) => updateParam('minDiscount', e.target.value || null)}
          className="flex-1 accent-maple-red"
          aria-valuemin={0}
          aria-valuemax={90}
          aria-valuenow={discount}
        />
        <span className="text-sm font-bold text-maple-red w-10 tabular-nums">
          {discount}%
        </span>
      </div>
    </div>
  )
}
