'use client'

import { useEffect, useState } from 'react'

// Page revalidates every 15 minutes (900 seconds)
const REVALIDATE_INTERVAL = 900

export function RefreshCountdown() {
  const [secondsUntilRefresh, setSecondsUntilRefresh] = useState(0)

  useEffect(() => {
    // Calculate seconds until next 15-minute interval
    const now = new Date()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()

    // Find next 15-minute mark (0, 15, 30, 45)
    const currentIntervalMinute = Math.floor(minutes / 15) * 15
    const nextIntervalMinute = currentIntervalMinute + 15

    const minutesUntilNext = nextIntervalMinute - minutes - 1
    const secondsUntilNext = 60 - seconds

    const totalSeconds = minutesUntilNext * 60 + secondsUntilNext
    setSecondsUntilRefresh(totalSeconds > 0 ? totalSeconds : REVALIDATE_INTERVAL)

    const timer = setInterval(() => {
      setSecondsUntilRefresh(prev => {
        if (prev <= 1) {
          // Reset to 15 minutes when it hits 0
          return REVALIDATE_INTERVAL
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const minutes = Math.floor(secondsUntilRefresh / 60)
  const seconds = secondsUntilRefresh % 60

  return (
    <div className="w-full py-2.5 px-4 bg-burgundy text-white text-center">
      <div className="flex items-center justify-center gap-2 text-sm font-bold">
        <span className="text-lg">🔄</span>
        <span>New deals in</span>
        <span className="font-mono bg-soft-black/30 px-2 py-0.5 rounded">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}
