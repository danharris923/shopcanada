'use client'

import { ExternalLink, RotateCcw, Crown, Truck, Scale } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FlippDeal } from '@/lib/flipp'
import { getAffiliateSearchUrl } from '@/lib/affiliates'
import { getStoreInfo } from '@/lib/store-info'

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

  // Get store policies for SEO badges
  const storeData = getStoreInfo(deal.storeSlug)

  // Parse return days from policy text
  const getReturnDays = (policy: string): string | null => {
    const match = policy.match(/(\d+)\s*day/i)
    return match ? `${match[1]}-day returns` : null
  }

  // Parse free shipping threshold
  const getShipThreshold = (shipping: string): string | null => {
    const match = shipping.match(/\$(\d+)/i)
    if (shipping.toLowerCase().includes('free') && match) {
      return `Free ship $${match[1]}+`
    }
    return null
  }

  // Random highlight tags for affiliated Flipp deals
  const highlightTags = [
    { text: 'HOT DEAL', color: 'bg-red-600' },
    { text: 'BEST PRICE', color: 'bg-orange-600' },
    { text: 'LIMITED TIME', color: 'bg-purple-600' },
    { text: 'TRENDING', color: 'bg-pink-600' },
    { text: 'POPULAR', color: 'bg-blue-600' },
    { text: 'FLASH SALE', color: 'bg-green-600' },
    { text: 'EXCLUSIVE', color: 'bg-indigo-600' },
    { text: 'TOP PICK', color: 'bg-yellow-600' },
  ]

  // Generate consistent random tag based on deal title
  const getRandomTag = (dealTitle: string) => {
    const hash = dealTitle.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    return highlightTags[Math.abs(hash) % highlightTags.length]
  }

  const shouldShowHighlight = affiliateUrl && !directAffiliate
  const randomTag = shouldShowHighlight ? getRandomTag(deal.title) : null

  // Function to handle Read more click for Flipp deals
  const handleReadMoreClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    window.location.href = `/deals/${deal.slug}`
  }

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

        {/* Highlight Badge - Only show for affiliate deals with random tags */}
        {randomTag ? (
          <div className="absolute top-2 left-2 z-10">
            <span className={`
              ${randomTag.color} text-white
              px-2 py-1 rounded-lg
              font-bold text-xs
              shadow-md
              animate-pulse
            `}>
              {randomTag.text}
            </span>
          </div>
        ) : (
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
        )}

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
        {/* Store with Logo - Clickable */}
        <Link
          href={`/stores/${deal.storeSlug}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 mb-1 hover:text-maple-red transition-colors"
        >
          {deal.storeLogo && (
            <img
              src={deal.storeLogo}
              alt=""
              className="w-4 h-4 rounded-sm object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          )}
          <span className="deal-card-store uppercase tracking-wide">
            {deal.store}
          </span>
        </Link>

        {/* Title */}
        <h3 className="deal-card-title mb-2 line-clamp-2 group-hover:text-maple-red transition-colors">
          {deal.title}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
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
              Check Flyer
            </span>
          )}
        </div>

        {/* Valid dates */}
        <div className="text-sm text-meta mb-2">
          Valid until {new Date(deal.validTo).toLocaleDateString()}
        </div>

        {/* Store Info Badges - Real SEO data */}
        {storeData && (
          <div className="flex flex-wrap gap-1 mb-2">
            {storeData.returnPolicy && getReturnDays(storeData.returnPolicy) && (
              <span className="inline-flex items-center gap-0.5 text-[10px] text-charcoal bg-cream px-1.5 py-0.5 rounded">
                <RotateCcw size={10} className="text-maple-red" />
                {getReturnDays(storeData.returnPolicy)}
              </span>
            )}
            {storeData.loyaltyProgram && (
              <span className="inline-flex items-center gap-0.5 text-[10px] text-charcoal bg-cream px-1.5 py-0.5 rounded">
                <Crown size={10} className="text-maple-red" />
                {storeData.loyaltyProgram.name}
              </span>
            )}
            {storeData.shippingInfo && getShipThreshold(storeData.shippingInfo) && (
              <span className="inline-flex items-center gap-0.5 text-[10px] text-charcoal bg-cream px-1.5 py-0.5 rounded">
                <Truck size={10} className="text-maple-red" />
                {getShipThreshold(storeData.shippingInfo)}
              </span>
            )}
            {storeData.priceMatch && (
              <span className="inline-flex items-center gap-0.5 text-[10px] text-charcoal bg-cream px-1.5 py-0.5 rounded">
                <Scale size={10} className="text-maple-red" />
                Price Match
              </span>
            )}
          </div>
        )}
      </div>
    </>
  )

  // For Flipp deals, ALWAYS use affiliate link - never internal deal pages
  if (affiliateUrl) {
    return (
      <a
        href={affiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="deal-card group block cursor-pointer hover:no-underline"
      >
        {cardContent}
      </a>
    )
  }

  // No affiliate link available - just display without link
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
