'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { PrimaryButton } from './primary-button'

interface Deal {
  slug: string
  name: string
  tagline: string
  image: string
  amazonLink?: string
  buttonText?: string
}

interface ExitDealsModalProps {
  isOpen: boolean
  onClose: () => void
  deals: Deal[]
}

/**
 * Exit Deals Modal
 *
 * Displayed when user shows exit intent.
 * Highlights top 4 Canadian deals with direct affiliate CTAs.
 * Modal is centered, responsive, and accessible.
 */
export function ExitDealsModal({ isOpen, onClose, deals }: ExitDealsModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // ESC key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-modal-title"
    >
      {/* Modal Content */}
      <div
        className="relative w-full max-w-4xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-2xl shadow-2xl overflow-hidden animate-slide-up max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-bg)] bg-opacity-90 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-opacity-100 transition-all"
          aria-label="Close modal"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header */}
        <div className="px-6 py-8 md:px-8 md:py-10 text-center border-b border-[var(--color-border-subtle)]">
          <h2
            id="exit-modal-title"
            className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-2"
          >
            Before you go...
          </h2>
          <p className="text-base md:text-lg text-[var(--color-text-secondary)]">
            Don't miss these exclusive deals from top Canadian brands
          </p>
        </div>

        {/* Deals Grid */}
        <div className="p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            {deals.map((deal) => (
              <div
                key={deal.slug}
                className="flex gap-4 bg-[var(--color-bg)] border border-[var(--color-border-subtle)] rounded-lg p-4 hover:border-[var(--color-accent)] transition-colors"
              >
                {/* Brand Image */}
                {deal.image && (
                  <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={deal.image}
                      alt={deal.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                )}

                {/* Brand Info & CTA */}
                <div className="flex-1 flex flex-col justify-center gap-2">
                  <div>
                    <h3 className="text-base font-bold text-[var(--color-text)]">
                      {deal.name}
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)] line-clamp-1">
                      {deal.tagline}
                    </p>
                  </div>

                  <PrimaryButton
                    href={deal.amazonLink || `/featured/${deal.slug}`}
                    target={deal.amazonLink ? '_blank' : undefined}
                    rel={deal.amazonLink ? 'nofollow noopener noreferrer' : undefined}
                    className="px-4 py-2 text-xs"
                  >
                    {deal.buttonText?.toUpperCase() || 'SHOP NOW'}
                  </PrimaryButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
