'use client'

import { AnimatedCounter } from '@/components/AnimatedCounter'
import { RefreshCountdown } from '@/components/deal/RefreshCountdown'

interface StatsBarProps {
  dealCount?: number
  storeCount?: number
}

export function StatsBar({ dealCount = 274, storeCount = 48 }: StatsBarProps) {
  return (
    <section className="bg-soft-black text-white py-2">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center gap-6 md:gap-12 text-center items-center">
          <div className="flex items-center gap-1.5">
            <AnimatedCounter end={dealCount} suffix="+" className="text-lg md:text-xl font-bold text-maple-red" />
            <span className="text-xs text-silver">Sales</span>
          </div>
          <div className="flex items-center gap-1.5">
            <AnimatedCounter end={storeCount} suffix="+" className="text-lg md:text-xl font-bold text-maple-red" />
            <span className="text-xs text-silver">Stores</span>
          </div>
          <RefreshCountdown inline />
        </div>
      </div>
    </section>
  )
}
