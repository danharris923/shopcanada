'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CanadianRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to stores page with Canadian filter
    router.push('/stores?filter=canadian')
  }, [router])

  // Loading state while redirecting
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-maple-red mx-auto mb-4"></div>
        <p className="text-charcoal">Redirecting to Canadian stores...</p>
      </div>
    </div>
  )
}