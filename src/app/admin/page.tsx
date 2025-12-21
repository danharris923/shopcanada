'use client'

import { useState, useEffect } from 'react'

interface Store {
  id: number
  name: string
  slug: string
  affiliate_url: string | null
  deal_count: number
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [stores, setStores] = useState<Store[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState<number | null>(null)
  const [message, setMessage] = useState('')
  const [newStoreName, setNewStoreName] = useState('')
  const [newStoreSlug, setNewStoreSlug] = useState('')
  const [newStoreAffiliate, setNewStoreAffiliate] = useState('')

  // Simple password check
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      setIsLoggedIn(true)
      localStorage.setItem('admin_token', password)
      loadStores()
    } else {
      setMessage('Invalid password')
    }
  }

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: token }),
      }).then(res => {
        if (res.ok) {
          setIsLoggedIn(true)
          setPassword(token)
          loadStores()
        }
      })
    }
  }, [])

  const loadStores = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/stores')
    if (res.ok) {
      const data = await res.json()
      setStores(data.stores || [])
    }
    setLoading(false)
  }

  const updateStore = async (store: Store, newAffiliateUrl: string) => {
    setSaving(store.id)
    const token = localStorage.getItem('admin_token')
    const res = await fetch('/api/admin/stores', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token || '',
      },
      body: JSON.stringify({
        id: store.id,
        affiliate_url: newAffiliateUrl || null,
      }),
    })
    if (res.ok) {
      setMessage(`Updated ${store.name}`)
      loadStores()
    } else {
      setMessage('Failed to update')
    }
    setSaving(null)
    setTimeout(() => setMessage(''), 3000)
  }

  const addStore = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newStoreName || !newStoreSlug) return

    const token = localStorage.getItem('admin_token')
    const res = await fetch('/api/admin/stores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token || '',
      },
      body: JSON.stringify({
        name: newStoreName,
        slug: newStoreSlug.toLowerCase().replace(/\s+/g, '-'),
        affiliate_url: newStoreAffiliate || null,
      }),
    })
    if (res.ok) {
      setMessage(`Added ${newStoreName}`)
      setNewStoreName('')
      setNewStoreSlug('')
      setNewStoreAffiliate('')
      loadStores()
    } else {
      const data = await res.json()
      setMessage(data.error || 'Failed to add store')
    }
    setTimeout(() => setMessage(''), 3000)
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    setIsLoggedIn(false)
    setPassword('')
    setStores([])
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded mb-4"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              Login
            </button>
          </form>
          {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Store Affiliate Links</h1>
          <button onClick={logout} className="text-gray-500 hover:text-black">
            Logout
          </button>
        </div>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
            {message}
          </div>
        )}

        {/* Add New Store */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Store</h2>
          <form onSubmit={addStore} className="flex flex-wrap gap-4">
            <input
              type="text"
              value={newStoreName}
              onChange={(e) => setNewStoreName(e.target.value)}
              placeholder="Store Name (e.g. Foot Locker)"
              className="flex-1 min-w-[200px] px-3 py-2 border rounded"
            />
            <input
              type="text"
              value={newStoreSlug}
              onChange={(e) => setNewStoreSlug(e.target.value)}
              placeholder="Slug (e.g. foot-locker)"
              className="flex-1 min-w-[150px] px-3 py-2 border rounded"
            />
            <input
              type="text"
              value={newStoreAffiliate}
              onChange={(e) => setNewStoreAffiliate(e.target.value)}
              placeholder="Affiliate URL (optional)"
              className="flex-1 min-w-[250px] px-3 py-2 border rounded"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Add Store
            </button>
          </form>
        </div>

        {/* Store List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">All Stores ({stores.length})</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : (
            <div className="divide-y">
              {stores.map((store) => (
                <StoreRow
                  key={store.id}
                  store={store}
                  onSave={updateStore}
                  saving={saving === store.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StoreRow({
  store,
  onSave,
  saving
}: {
  store: Store
  onSave: (store: Store, url: string) => void
  saving: boolean
}) {
  const [affiliateUrl, setAffiliateUrl] = useState(store.affiliate_url || '')
  const [edited, setEdited] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAffiliateUrl(e.target.value)
    setEdited(e.target.value !== (store.affiliate_url || ''))
  }

  const handleSave = () => {
    onSave(store, affiliateUrl)
    setEdited(false)
  }

  return (
    <div className="px-6 py-4 flex items-center gap-4">
      <div className="w-48">
        <div className="font-medium">{store.name}</div>
        <div className="text-sm text-gray-500">{store.slug}</div>
      </div>
      <div className="flex-1">
        <input
          type="text"
          value={affiliateUrl}
          onChange={handleChange}
          placeholder="No affiliate URL set"
          className={`w-full px-3 py-2 border rounded ${
            edited ? 'border-yellow-400 bg-yellow-50' : ''
          }`}
        />
      </div>
      <div className="w-20 text-sm text-gray-500">
        {store.deal_count} deals
      </div>
      <button
        onClick={handleSave}
        disabled={!edited || saving}
        className={`px-4 py-2 rounded ${
          edited
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        {saving ? 'Saving...' : 'Save'}
      </button>
    </div>
  )
}
