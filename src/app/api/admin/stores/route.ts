import { NextResponse } from 'next/server'
import { getAllStoresAdmin, updateStoreAffiliateUrl, addStore, checkStoreSlugExists } from '@/lib/db'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'shopcanada2024'

function checkAuth(request: Request): boolean {
  const auth = request.headers.get('Authorization')
  return auth === ADMIN_PASSWORD
}

// GET all stores
export async function GET() {
  try {
    const stores = await getAllStoresAdmin()
    return NextResponse.json({ stores })
  } catch (error) {
    // Error fetching stores
    return NextResponse.json({ error: 'Failed to fetch stores' }, { status: 500 })
  }
}

// PUT - update store affiliate URL
export async function PUT(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id, affiliate_url } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Store ID required' }, { status: 400 })
    }

    const success = await updateStoreAffiliateUrl(id, affiliate_url)
    if (!success) {
      return NextResponse.json({ error: 'Failed to update store' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    // Error updating store
    return NextResponse.json({ error: 'Failed to update store' }, { status: 500 })
  }
}

// POST - add new store
export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { name, slug, affiliate_url } = await request.json()

    if (!name || !slug) {
      return NextResponse.json({ error: 'Name and slug required' }, { status: 400 })
    }

    // Check if slug already exists
    const exists = await checkStoreSlugExists(slug)
    if (exists) {
      return NextResponse.json({ error: 'Store with this slug already exists' }, { status: 409 })
    }

    const success = await addStore(name, slug, affiliate_url || null)
    if (!success) {
      return NextResponse.json({ error: 'Failed to add store' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    // Error adding store
    return NextResponse.json({ error: 'Failed to add store' }, { status: 500 })
  }
}
