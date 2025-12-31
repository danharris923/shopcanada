import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

function DealCardSkeleton() {
  return (
    <div className="bg-white rounded-card overflow-hidden shadow-sm">
      <div className="h-48 bg-silver-light animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-silver-light rounded-full animate-pulse" />
          <div className="h-3 bg-silver-light rounded animate-pulse w-20" />
        </div>
        <div className="h-5 bg-silver-light rounded animate-pulse w-full" />
        <div className="h-4 bg-silver-light rounded animate-pulse w-3/4" />
        <div className="flex items-center justify-between mt-4">
          <div className="h-6 bg-silver-light rounded animate-pulse w-24" />
          <div className="h-6 bg-maple-red/20 rounded animate-pulse w-16" />
        </div>
        <div className="h-10 bg-silver-light rounded animate-pulse w-full mt-2" />
      </div>
    </div>
  )
}

function FilterSidebarSkeleton() {
  return (
    <div className="bg-white rounded-card p-4 space-y-6">
      <div className="h-6 bg-silver-light rounded animate-pulse w-24" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-4 h-4 bg-silver-light rounded animate-pulse" />
          <div className="h-4 bg-silver-light rounded animate-pulse flex-1" />
        </div>
      ))}
      <div className="h-px bg-silver-light" />
      <div className="h-6 bg-silver-light rounded animate-pulse w-20" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-4 h-4 bg-silver-light rounded animate-pulse" />
          <div className="h-4 bg-silver-light rounded animate-pulse flex-1" />
        </div>
      ))}
    </div>
  )
}

export default function DealsLoading() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Page header skeleton */}
          <div className="mb-8">
            <div className="h-8 bg-silver-light rounded animate-pulse w-48 mb-2" />
            <div className="h-4 bg-silver-light rounded animate-pulse w-64" />
          </div>

          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <FilterSidebarSkeleton />
            </div>

            {/* Deals grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <DealCardSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
