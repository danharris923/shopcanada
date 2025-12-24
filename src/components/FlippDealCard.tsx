'use client'

import { Leaf, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FlippDeal } from '@/lib/flipp'
import { getAffiliateSearchUrl } from '@/lib/affiliates'

interface FlippDealCardProps {
  deal: FlippDeal
  directAffiliate?: boolean  // If true, click goes directly to affiliate link
}

// Full size card style matching regular DealCard
export function FlippDealCard({ deal, directAffiliate = false }: FlippDealCardProps) {
  const hasDiscount = deal.discountPercent !== null && deal.discountPercent > 0
  const hasPriceData = deal.price !== null && deal.price > 0

  // Check if this store has an affiliate link
  const affiliateUrl = getAffiliateSearchUrl(deal.storeSlug, deal.title)

  const cardContent = (
    <>
      {/* Image Container */}
      <div className="relative aspect-square bg-cream">
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="discount-badge">
            -{deal.discountPercent}%
          </div>
        )}

        {/* Flyer Badge */}
        <div className="absolute top-2 left-2 z-10">
          <span className="
            bg-orange-600 text-white
            px-2 py-1 rounded-lg
            font-bold text-xs
            shadow-md
          ">
            FLYER
          </span>
        </div>

        {/* Direct Affiliate Badge */}
        {directAffiliate && affiliateUrl && (
          <div className="absolute top-2 right-2 z-10">
            <span className="
              bg-maple-red text-white
              px-2 py-1 rounded-lg
              font-bold text-xs
              shadow-md
              flex items-center gap-1
            ">
              <ExternalLink size={10} /> Direct
            </span>
          </div>
        )}


        {/* Image */}
        <Image
          src={deal.imageUrl || '/placeholder-deal.jpg'}
          alt={deal.title}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-200"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          unoptimized
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Store */}
        <div className="deal-card-store uppercase tracking-wide mb-1">
          {deal.store}
        </div>

        {/* Title */}
        <h3 className="deal-card-title mb-2 line-clamp-2 group-hover:text-maple-red transition-colors">
          {deal.title}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          {hasPriceData ? (
            <>
              <span className="deal-card-price">
                ${deal.price?.toFixed(2)}
              </span>
              {deal.originalPrice && deal.originalPrice > (deal.price || 0) && (
                <span className="deal-card-original-price">
                  ${deal.originalPrice.toFixed(2)}
                </span>
              )}
            </>
          ) : deal.saleStory ? (
            <span className="text-lg font-semibold text-maple-red">
              {deal.saleStory}
            </span>
          ) : (
            <span className="text-lg font-semibold text-charcoal">
              See Flyer
            </span>
          )}
        </div>

        {/* Valid dates */}
        <div className="text-sm text-meta mt-1">
          Valid until {new Date(deal.validTo).toLocaleDateString()}
        </div>
      </div>
    </>
  )

  // Conditional rendering based on directAffiliate prop
  if (directAffiliate && affiliateUrl) {
    return (
      <a
        href={affiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="deal-card group block cursor-pointer"
      >
        {cardContent}
      </a>
    )
  }

  // If has slug, navigate to deal page, otherwise use affiliate link
  if (deal.slug) {
    return (
      <Link
        href={`/deals/${deal.slug}`}
        className="deal-card group block"
      >
        {cardContent}
      </Link>
    )
  }

  // Fallback to affiliate link if no slug
  if (affiliateUrl) {
    return (
      <a
        href={affiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="deal-card group block"
      >
        {cardContent}
      </a>
    )
  }

  // No link available
  return (
    <div className="deal-card group block">
      {cardContent}
    </div>
  )
}

// Grid wrapper for flipp deal cards - matches regular DealGrid
export function FlippDealGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {children}
    </div>
  )
}
