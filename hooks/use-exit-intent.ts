'use client'

import { useEffect, useState } from 'react'

interface UseExitIntentOptions {
  enabled?: boolean
  onExitIntent?: () => void
  threshold?: number
}

/**
 * useExitIntent Hook
 *
 * Detects when user shows exit intent and triggers callback.
 * Uses localStorage to limit frequency (once per day).
 *
 * Desktop: Triggers when mouse leaves viewport at top
 * Mobile: Triggers after 45 seconds + scroll depth
 */
export function useExitIntent(options: UseExitIntentOptions = {}) {
  const { enabled = true, onExitIntent, threshold = 10 } = options
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    if (!enabled || hasTriggered) return

    // Check localStorage - only show once per day
    const STORAGE_KEY = 'shopcanada_exit_modal_last_shown'
    const lastShown = localStorage.getItem(STORAGE_KEY)

    if (lastShown) {
      const daysSinceShown = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60 * 24)
      if (daysSinceShown < 1) {
        // Already shown today
        return
      }
    }

    // Desktop: Mouse leave detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= threshold && !hasTriggered) {
        setHasTriggered(true)
        onExitIntent?.()
        localStorage.setItem(STORAGE_KEY, Date.now().toString())
      }
    }

    // Mobile: Time + scroll depth fallback
    let scrollTriggered = false
    const handleScroll = () => {
      if (scrollTriggered) return

      const scrollDepth = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

      if (scrollDepth > 30) {
        scrollTriggered = true
      }
    }

    const mobileTimeout = setTimeout(() => {
      if (scrollTriggered && !hasTriggered) {
        setHasTriggered(true)
        onExitIntent?.()
        localStorage.setItem(STORAGE_KEY, Date.now().toString())
      }
    }, 45000) // 45 seconds

    // Add listeners
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', handleScroll)

    // Cleanup
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(mobileTimeout)
    }
  }, [enabled, hasTriggered, onExitIntent, threshold])

  return { hasTriggered }
}
