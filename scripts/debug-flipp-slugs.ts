/**
 * Debug Flipp store slugs for Princess Auto and Home Hardware
 */

const FLIPP_API_URL = 'https://backflipp.wishabi.com/flipp/items/search'

interface FlippItem {
  id: number
  name: string
  merchant_name: string
  current_price: number | null
}

interface FlippResponse {
  items: FlippItem[]
}

function getStoreSlug(merchantName: string): string {
  return merchantName
    .toLowerCase()
    .replace(/[']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function debugFlippSlugs() {
  console.log('Searching Flipp for "golf"...\n')

  const params = new URLSearchParams({
    q: 'golf',
    locale: 'en-ca',
    postal_code: 'M5V1J2',
  })

  const res = await fetch(`${FLIPP_API_URL}?${params}`)
  const data: FlippResponse = await res.json()

  // Find Princess Auto and Home Hardware items
  const targetStores = ['princess auto', 'home hardware']

  console.log('All merchants found:')
  const merchants = [...new Set(data.items.map(i => i.merchant_name))]
  merchants.forEach(m => {
    const slug = getStoreSlug(m)
    const isTarget = targetStores.some(t => m.toLowerCase().includes(t))
    console.log(`  "${m}" -> "${slug}"${isTarget ? ' <-- TARGET' : ''}`)
  })

  console.log('\n\nPrincess Auto / Home Hardware items:')
  data.items
    .filter(item =>
      targetStores.some(t => item.merchant_name.toLowerCase().includes(t))
    )
    .forEach(item => {
      const slug = getStoreSlug(item.merchant_name)
      console.log(`  Store: "${item.merchant_name}"`)
      console.log(`  Slug:  "${slug}"`)
      console.log(`  Item:  "${item.name}"`)
      console.log(`  Price: $${item.current_price}`)
      console.log('')
    })
}

debugFlippSlugs().catch(console.error)
