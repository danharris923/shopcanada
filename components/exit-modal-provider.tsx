'use client'

import React, { useState } from 'react'
import { useExitIntent } from '@/hooks/use-exit-intent'
import { ExitDealsModal } from './exit-deals-modal'
import { getBrandBySlug } from '@/lib/brands-data'

/**
 * Exit Modal Provider
 *
 * Client component that wraps the app and manages exit intent detection.
 * Automatically shows modal when user shows exit intent (once per day).
 */
export function ExitModalProvider() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Setup exit intent detection
  useExitIntent({
    enabled: true,
    onExitIntent: () => {
      setIsModalOpen(true)
    },
  })

  // Prepare featured deals data (same 4 brands from homepage)
  const featuredBrandSlugs = ['lululemon', 'roots', 'aritzia', 'ardene']

  const featuredBrands = featuredBrandSlugs.map(slug => {
    const brandData = getBrandBySlug(slug)
    if (!brandData) return null

    const displayData: Record<string, { tagline: string, image: string }> = {
      'lululemon': {
        tagline: "Canada's Global Athleisure Icon",
        image: '/lululemon-yoga-pants-athletic-wear-storefront.jpg',
      },
      'aritzia': {
        tagline: 'Elevated Fashion With a Cult Following',
        image: '/aritzia-fashion-clothing-store-super-puff-jacket.jpg',
      },
      'roots': {
        tagline: 'Heritage Brand Built on Craftsmanship',
        image: '/roots-canada-leather-goods-sweatpants-cabin-clothi.jpg',
      },
      'ardene': {
        tagline: 'Affordable Fashion for Every Canadian',
        image: '/ardene-fashion-lifestyle.jpg',
      }
    }

    return {
      ...brandData,
      ...displayData[slug]
    }
  }).filter(Boolean)

  return (
    <ExitDealsModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      deals={featuredBrands}
    />
  )
}
