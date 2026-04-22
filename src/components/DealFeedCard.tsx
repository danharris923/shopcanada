'use client'

import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import {
  computeDiscountPercent,
  daysUntilExpiry,
  type FeedDeal,
} from '@/lib/deal-feed'

interface DealFeedCardProps {
  deal: FeedDeal
}

export function DealFeedCard({ deal }: DealFeedCardProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(
    deal.image ?? deal.image_source,
  )
  const [triedFallback, setTriedFallback] = useState(
    !deal.image || !deal.image_source || deal.image === deal.image_source,
  )
  const [hidden, setHidden] = useState(false)

  if (hidden || !imgSrc) return null

  const handleImageError = () => {
    if (!triedFallback && deal.image_source && imgSrc !== deal.image_source) {
      setTriedFallback(true)
      setImgSrc(deal.image_source)
      return
    }
    setHidden(true)
  }

  const discount = computeDiscountPercent(deal.price, deal.original_price)
  const daysLeft = daysUntilExpiry(deal.valid_until)
  const endsSoon = daysLeft !== null && daysLeft >= 0 && daysLeft <= 7
  const price = deal.price
  const original = deal.original_price

  const priceSrText =
    price !== null && original !== null && original > price
      ? `sale price $${price.toFixed(2)}, was $${original.toFixed(2)}`
      : price !== null
      ? `price $${price.toFixed(2)}`
      : null

  return (
    <a
      href={deal.main_affiliate_url}
      target="_blank"
      rel="sponsored nofollow noopener"
      className="group block bg-white rounded-lg overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-maple-red"
    >
      <div className="relative aspect-square bg-cream">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={deal.title}
          loading="lazy"
          decoding="async"
          onError={handleImageError}
          className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-200"
        />
        {discount !== null && (
          <span className="absolute top-2 right-2 bg-maple-red text-white px-2 py-1 rounded-lg font-bold text-xs shadow-md">
            -{discount}%
          </span>
        )}
        {deal.category && (
          <span className="absolute top-2 left-2 bg-white/90 text-soft-black px-2 py-1 rounded-lg font-semibold text-[10px] shadow-sm border border-slate-200">
            {deal.category}
          </span>
        )}
      </div>

      <div className="p-4">
        {deal.seller && (
          <div className="text-[10px] uppercase tracking-wide text-slate font-semibold mb-1">
            {deal.seller}
          </div>
        )}
        <h3 className="font-semibold text-soft-black line-clamp-2 text-sm leading-snug mb-2 group-hover:text-maple-red transition-colors min-h-[2.5rem]">
          {deal.title}
        </h3>

        {price !== null && (
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-maple-red" aria-hidden>
              ${price.toFixed(2)}
            </span>
            {original !== null && original > price && (
              <span className="text-sm text-slate line-through" aria-hidden>
                ${original.toFixed(2)}
              </span>
            )}
            {priceSrText && <span className="sr-only">{priceSrText}</span>}
          </div>
        )}

        {endsSoon && (
          <div className="mt-2 text-[11px] font-medium text-maple-red">
            {daysLeft === 0
              ? 'Ends today'
              : `Ends in ${daysLeft} day${daysLeft === 1 ? '' : 's'}`}
          </div>
        )}

        <div className="mt-3 inline-flex items-center text-[11px] font-semibold text-slate">
          View deal
          <ExternalLink className="ml-1 h-3 w-3" />
        </div>
      </div>
    </a>
  )
}
