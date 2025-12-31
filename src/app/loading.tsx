import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function Loading() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Hero skeleton */}
          <div className="h-48 bg-white rounded-card mb-8 animate-pulse" />

          {/* Content grid skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-card overflow-hidden">
                <div className="h-48 bg-silver-light animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-silver-light rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-silver-light rounded animate-pulse w-1/2" />
                  <div className="h-8 bg-silver-light rounded animate-pulse w-full mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
