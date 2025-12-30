/**
 * Test getAffiliateSearchUrl for Princess Auto and Home Hardware
 */

import { getAffiliateSearchUrl, RETAILER_SEARCH_URLS } from '../src/lib/affiliates'

const testCases = [
  { storeSlug: 'princess-auto', title: '9 ft Telescopic Golf Ball Retriever' },
  { storeSlug: 'home-hardware', title: 'The Card Game of Golf' },
]

console.log('Testing getAffiliateSearchUrl:\n')

testCases.forEach(({ storeSlug, title }) => {
  console.log(`Store: ${storeSlug}`)
  console.log(`Title: ${title}`)

  // Check if store exists in RETAILER_SEARCH_URLS
  const searchUrl = RETAILER_SEARCH_URLS[storeSlug]
  console.log(`In RETAILER_SEARCH_URLS: ${searchUrl ? 'YES' : 'NO'}`)
  if (searchUrl) {
    console.log(`Base URL: ${searchUrl}`)
  }

  // Get the affiliate URL
  const affiliateUrl = getAffiliateSearchUrl(storeSlug, title)
  console.log(`Result URL: ${affiliateUrl || 'NULL'}`)
  console.log('')
})
