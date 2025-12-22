'use client'

import { useState } from 'react'

interface WebsitePreviewProps {
  brandName: string
  brandSlug: string
  brandUrl: string
}

export function WebsitePreview({ brandName, brandSlug, brandUrl }: WebsitePreviewProps) {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return null // Don't render anything if screenshot doesn't exist
  }

  return (
    <div className="mb-12 bg-white border border-silver-light rounded-card p-6">
      <h2 className="text-xl font-bold text-charcoal mb-4">Visit {brandName}&apos;s Website</h2>
      <a
        href={brandUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block group relative overflow-hidden rounded-lg border-2 border-silver-light hover:border-maple-red transition-colors"
      >
        <img
          src={`/brand-screenshots/${brandSlug}.png`}
          alt={`${brandName} website preview`}
          className="w-full h-auto object-cover"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-burgundy/0 group-hover:bg-burgundy/20 transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-maple-red text-white px-6 py-3 rounded-button font-bold shadow-lg">
            Visit Website →
          </span>
        </div>
      </a>
    </div>
  )
}
