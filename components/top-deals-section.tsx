import React from 'react'
import Image from 'next/image'
import { PrimaryButton } from './primary-button'

interface Deal {
  slug: string
  name: string
  tagline: string
  image: string
  founded: string
  amazonLink?: string
  buttonText?: string
}

interface TopDealsSectionProps {
  deals: Deal[]
}

/**
 * Top Canadian Deals Section - Above the Fold
 *
 * Displays 4 featured affiliate brand cards in a 2x2 grid (desktop)
 * or 1 per row (mobile). Optimized for maximum CTR with prominent
 * CTAs and modern 2025 design.
 *
 * This section appears directly below the hero on the homepage.
 */
export function TopDealsSection({ deals }: TopDealsSectionProps) {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-12 md:py-16">
      {/* Section Header */}
      <header className="mb-8 md:mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-3">
          Top Canadian Deals This Week
        </h2>
        <p className="text-base md:text-lg text-[var(--color-text-secondary)] max-w-2xl">
          Hand-picked offers from iconic Canadian brands. Click through to shop directly and support Canadian businesses.
        </p>
      </header>

      {/* 2x2 Grid of Featured Deals */}
      <div className="grid gap-6 md:grid-cols-2">
        {deals.map((deal) => (
          <article
            key={deal.slug}
            className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-xl overflow-hidden flex flex-col hover:border-[var(--color-accent)] transition-colors duration-200"
          >
            {/* Brand Image */}
            {deal.image && (
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={deal.image}
                  alt={`${deal.name} - ${deal.tagline}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Founded Badge */}
                <div className="absolute top-4 left-4 bg-[var(--color-bg)] bg-opacity-90 px-3 py-1.5 rounded">
                  <span className="text-[var(--color-text-secondary)] text-xs font-semibold">
                    EST. {deal.founded.split(', ')[1]}
                  </span>
                </div>
              </div>
            )}

            {/* Card Content */}
            <div className="p-5 md:p-6 flex flex-col gap-4 flex-1">
              {/* Brand Name & Tagline */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text)] mb-2">
                  {deal.name}
                </h3>
                <p className="text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed">
                  {deal.tagline}
                </p>
              </div>

              {/* Location & Year */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--color-text-secondary)]">
                  📍 {deal.founded}
                </span>
              </div>

              {/* CTA Button - Spacer pushes to bottom */}
              <div className="mt-auto pt-2">
                <PrimaryButton
                  href={deal.amazonLink || `/featured/${deal.slug}`}
                  target={deal.amazonLink ? '_blank' : undefined}
                  rel={deal.amazonLink ? 'nofollow noopener noreferrer' : undefined}
                  className="w-full justify-center text-base font-bold"
                >
                  {deal.buttonText?.toUpperCase() || 'SHOP NOW'}
                </PrimaryButton>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
