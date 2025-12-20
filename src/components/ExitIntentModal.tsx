"use client"

import { useEffect, useState, useCallback } from 'react'
import { toNumber, formatPrice } from '@/lib/price-utils'

interface ExitIntentModalProps {
  dealTitle?: string
  dealPrice?: number | string | null
}

export function ExitIntentModal({ dealTitle, dealPrice }: ExitIntentModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [hasShown, setHasShown] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const priceNum = toNumber(dealPrice)

  const handleExitIntent = useCallback((e: MouseEvent) => {
    // Only trigger when mouse moves to top of viewport (leaving page)
    if (e.clientY < 10 && !hasShown) {
      setIsOpen(true)
      setHasShown(true)
    }
  }, [hasShown])

  useEffect(() => {
    // Don't show on mobile (exit intent doesn't work well)
    if (typeof window === 'undefined' || window.innerWidth < 768) return

    // Don't show if already shown this session
    if (sessionStorage.getItem('exitIntentShown')) {
      setHasShown(true)
      return
    }

    // Wait a bit before enabling (don't trigger immediately)
    const timeout = setTimeout(() => {
      document.addEventListener('mouseout', handleExitIntent as any)
    }, 5000) // Wait 5 seconds

    return () => {
      clearTimeout(timeout)
      document.removeEventListener('mouseout', handleExitIntent as any)
    }
  }, [handleExitIntent])

  const handleClose = () => {
    setIsOpen(false)
    sessionStorage.setItem('exitIntentShown', 'true')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Integrate with email service (Mailchimp, ConvertKit, etc.)
    console.log('Email captured:', email)
    setIsSubmitted(true)
    setTimeout(() => {
      handleClose()
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="
          relative w-full max-w-md mx-4
          bg-white rounded-card shadow-strong
          overflow-hidden
          animate-slide-up
        "
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-silver hover:text-charcoal z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-maple-red to-burgundy px-6 py-8 text-center">
          <div className="text-4xl mb-2">DEAL</div>
          <h2 className="text-2xl font-bold text-white mb-1">
            Wait! Don&apos;t Miss Out
          </h2>
          <p className="text-white/90 text-sm">
            Get notified when prices drop even lower
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {isSubmitted ? (
            <div className="text-center py-4">
              <div className="text-4xl mb-2">OK</div>
              <p className="text-charcoal font-semibold">You&apos;re on the list!</p>
              <p className="text-slate text-sm">
                We&apos;ll email you when we find better deals.
              </p>
            </div>
          ) : (
            <>
              {/* Deal reminder */}
              {dealTitle && (
                <div className="bg-ivory rounded-lg p-3 mb-4">
                  <p className="text-sm text-slate">You were looking at:</p>
                  <p className="font-semibold text-charcoal truncate">{dealTitle}</p>
                  {priceNum !== null && (
                    <p className="text-maple-red font-bold">${formatPrice(priceNum)}</p>
                  )}
                </div>
              )}

              {/* Value Props */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate">
                  <span className="text-maple-red">✓</span>
                  <span>Instant price drop alerts</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate">
                  <span className="text-maple-red">✓</span>
                  <span>Exclusive Canadian deals</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate">
                  <span className="text-maple-red">✓</span>
                  <span>Unsubscribe anytime</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="
                    w-full px-4 py-3 rounded-button
                    border border-silver-light
                    focus:border-maple-red focus:ring-2 focus:ring-maple-red/20
                    outline-none transition-all
                  "
                />
                <button
                  type="submit"
                  className="
                    w-full py-3 px-4 rounded-button
                    bg-maple-red hover:bg-burgundy
                    text-white font-bold
                    transition-all
                  "
                >
                  GET DEAL ALERTS
                </button>
              </form>

              {/* Dismiss */}
              <button
                onClick={handleClose}
                className="w-full text-center text-sm text-silver mt-3 hover:text-slate"
              >
                No thanks, I&apos;ll pay full price
              </button>

              {/* Social proof */}
              <p className="text-center text-xs text-silver mt-4">
                Join 47,234 Canadian deal hunters
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
