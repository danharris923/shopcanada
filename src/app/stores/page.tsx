import { Suspense } from 'react'
import { getStores } from '@/lib/db'
import { Store as StoreType } from '@/types/deal'
import { StoresClient } from './StoresClient'

// Revalidate every 5 minutes to pick up DB changes
export const revalidate = 300

// Server component that fetches stores from database
export default async function StoresPage() {
  let stores: StoreType[] = []
  try {
    stores = await getStores()
  } catch (error) {
    console.error('Failed to load stores:', error)
    stores = []
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-maple-red mx-auto mb-4"></div>
          <p className="text-charcoal">Loading stores...</p>
        </div>
      </div>
    }>
      <StoresClient stores={stores} />
    </Suspense>
  )
}
