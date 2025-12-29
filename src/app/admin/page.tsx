'use client'

import { useState, useEffect } from 'react'

interface Store {
  id: number
  name: string
  slug: string
  website_url: string | null
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
  const [newStoreWebsite, setNewStoreWebsite] = useState('')
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

  const updateStore = async (store: Store, newWebsiteUrl: string, newAffiliateUrl: string) => {
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
        website_url: newWebsiteUrl || null,
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
        website_url: newStoreWebsite || null,
        affiliate_url: newStoreAffiliate || null,
      }),
    })
    if (res.ok) {
      setMessage(`Added ${newStoreName}`)
      setNewStoreName('')
      setNewStoreSlug('')
      setNewStoreWebsite('')
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
          <form onSubmit={addStore} className="space-y-3">
            <div className="flex flex-wrap gap-3">
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
            </div>
            <div className="flex flex-wrap gap-3">
              <input
                type="text"
                value={newStoreWebsite}
                onChange={(e) => setNewStoreWebsite(e.target.value)}
                placeholder="Website URL (e.g. https://footlocker.ca)"
                className="flex-1 min-w-[250px] px-3 py-2 border rounded"
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
            </div>
          </form>
        </div>

        {/* Store List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">All Stores ({stores.length})</h2>
          </div>

          {/* Column Headers */}
          <div className="px-6 py-2 flex items-center gap-3 bg-gray-50 border-b text-xs font-medium text-gray-500 uppercase">
            <div className="w-36 flex-shrink-0">Store</div>
            <div className="w-56 flex-shrink-0">Website URL</div>
            <div className="flex-1">Affiliate URL</div>
            <div className="w-12 flex-shrink-0 text-right">Deals</div>
            <div className="w-[52px] flex-shrink-0"></div>
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
  onSave: (store: Store, websiteUrl: string, affiliateUrl: string) => void
  saving: boolean
}) {
  const [websiteUrl, setWebsiteUrl] = useState(store.website_url || '')
  const [affiliateUrl, setAffiliateUrl] = useState(store.affiliate_url || '')
  const [edited, setEdited] = useState(false)

  const checkEdited = (newWebsite: string, newAffiliate: string) => {
    const websiteChanged = newWebsite !== (store.website_url || '')
    const affiliateChanged = newAffiliate !== (store.affiliate_url || '')
    setEdited(websiteChanged || affiliateChanged)
  }

  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setWebsiteUrl(val)
    checkEdited(val, affiliateUrl)
  }

  const handleAffiliateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setAffiliateUrl(val)
    checkEdited(websiteUrl, val)
  }

  const handleSave = () => {
    onSave(store, websiteUrl, affiliateUrl)
    setEdited(false)
  }

  return (
    <div className="px-6 py-3 flex items-center gap-3 flex-nowrap overflow-hidden">
      <div className="w-36 flex-shrink-0">
        <div className="font-medium truncate text-sm">{store.name}</div>
        <div className="text-xs text-gray-500 truncate">{store.slug}</div>
      </div>
      <div className="w-56 flex-shrink-0">
        <input
          type="text"
          value={websiteUrl}
          onChange={handleWebsiteChange}
          placeholder="https://store.ca"
          className={`w-full px-2 py-1.5 border rounded text-sm ${
            websiteUrl !== (store.website_url || '') ? 'border-yellow-400 bg-yellow-50' : ''
          }`}
        />
        {websiteUrl && (
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-xs truncate block mt-1"
          >
            {websiteUrl.replace(/^https?:\/\/(www\.)?/, '')}
          </a>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <input
          type="text"
          value={affiliateUrl}
          onChange={handleAffiliateChange}
          placeholder="Paste affiliate URL here"
          className={`w-full px-2 py-1.5 border rounded text-sm ${
            affiliateUrl !== (store.affiliate_url || '') ? 'border-yellow-400 bg-yellow-50' : ''
          }`}
        />
      </div>
      <div className="w-12 flex-shrink-0 text-sm text-gray-500 text-right">
        {store.deal_count}
      </div>
      <button
        onClick={handleSave}
        disabled={!edited || saving}
        className={`px-3 py-1.5 rounded flex-shrink-0 whitespace-nowrap text-sm ${
          edited
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        {saving ? '...' : 'Save'}
      </button>
    </div>
  )
}
