'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AlertTriangle, Home, RefreshCw, ArrowLeft } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-maple-red/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="text-maple-red" size={40} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-charcoal mb-2">
            Something went wrong
          </h1>
          <p className="text-slate mb-8">
            We encountered an unexpected error. Please try again or return to the homepage.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-maple-red text-white font-medium rounded-card hover:bg-maple-red/90 transition-colors"
            >
              <RefreshCw size={18} />
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-charcoal font-medium rounded-card border border-silver-light hover:border-maple-red transition-colors"
            >
              <Home size={18} />
              Go Home
            </Link>
          </div>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-slate hover:text-charcoal transition-colors"
          >
            <ArrowLeft size={16} />
            Go back
          </button>

          {error.digest && (
            <p className="mt-8 text-xs text-slate">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
