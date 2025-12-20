'use client'

import { useEffect, useState } from 'react'

interface SocialProofBannerProps {
  viewerCount: number
  purchaseCount: number
}

export function SocialProofBanner({ viewerCount, purchaseCount }: SocialProofBannerProps) {
  // Simulate live activity - viewer count fluctuates slightly
  const [currentViewers, setCurrentViewers] = useState(viewerCount)
  const [recentPurchase, setRecentPurchase] = useState(false)

  useEffect(() => {
    // Fluctuate viewers every 3-8 seconds
    const viewerInterval = setInterval(() => {
      setCurrentViewers(prev => {
        const change = Math.floor(Math.random() * 11) - 5 // -5 to +5
        return Math.max(20, prev + change)
      })
    }, 3000 + Math.random() * 5000)

    // Flash "just purchased" occasionally
    const purchaseInterval = setInterval(() => {
      setRecentPurchase(true)
      setTimeout(() => setRecentPurchase(false), 3000)
    }, 15000 + Math.random() * 30000)

    return () => {
      clearInterval(viewerInterval)
      clearInterval(purchaseInterval)
    }
  }, [])

  return (
    <div className="w-full py-2 px-4 bg-ivory border-b border-silver-light">
      <div className="flex items-center justify-center gap-4 text-sm">
        <span className="flex items-center gap-1.5 text-charcoal">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-maple-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-maple-red"></span>
          </span>
          <span className="font-medium">{currentViewers}</span> viewing now
        </span>

        <span className="text-silver">•</span>

        <span className={`
          text-charcoal font-medium
          transition-all duration-300
          ${recentPurchase ? 'text-maple-red scale-110' : ''}
        `}>
          🛒 {purchaseCount} sold today
          {recentPurchase && (
            <span className="ml-1 text-maple-red animate-bounce inline-block">
              +1
            </span>
          )}
        </span>
      </div>
    </div>
  )
}
