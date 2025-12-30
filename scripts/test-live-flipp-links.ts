import { chromium } from 'playwright'

async function testFlippLinks() {
  console.log('Testing Flipp links on live site...\n')

  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  try {
    await page.goto('https://shopcanada.cc/search?q=golf', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    })

    // Wait for deals to load
    await page.waitForTimeout(3000)

    // Get ALL deal cards (both linked and not)
    const allCards = await page.$$('.deal-card')
    console.log(`Found ${allCards.length} total deal cards\n`)

    // Check each card
    for (const card of allCards) {
      const tagName = await card.evaluate(el => el.tagName.toLowerCase())
      const href = tagName === 'a' ? await card.getAttribute('href') : null
      const titleEl = await card.$('h3')
      const title = titleEl ? await titleEl.textContent() : 'Unknown'
      const storeEl = await card.$('.deal-card-store')
      const store = storeEl ? await storeEl.textContent() : 'Unknown'

      // Check for Princess Auto or Home Hardware
      const storeLower = store?.toLowerCase() || ''
      if (storeLower.includes('princess') || storeLower.includes('home hardware')) {
        console.log(`Store: ${store?.trim()}`)
        console.log(`Title: ${title?.trim().slice(0, 60)}`)
        console.log(`Tag: <${tagName}>`)
        console.log(`Link: ${href || 'NONE'}`)

        // Check if link includes search term
        if (href) {
          const hasSearch = href.includes('search') || href.includes('q=')
          const hasTitle = title && href.toLowerCase().includes(encodeURIComponent(title.toLowerCase().slice(0, 10)))
          console.log(`Has search param: ${hasSearch}`)
          console.log(`Title in URL: ${hasTitle}`)
        }
        console.log('')
      }
    }

    // Also log first few cards to see pattern
    console.log('\n--- First 5 cards for reference ---\n')
    const firstFive = allCards.slice(0, 5)
    for (const card of firstFive) {
      const tagName = await card.evaluate(el => el.tagName.toLowerCase())
      const href = tagName === 'a' ? await card.getAttribute('href') : null
      const titleEl = await card.$('h3')
      const title = titleEl ? await titleEl.textContent() : 'Unknown'
      const storeEl = await card.$('.deal-card-store')
      const store = storeEl ? await storeEl.textContent() : ''

      console.log(`${store?.trim().padEnd(20)} | ${tagName} | ${href?.slice(0, 60) || 'no link'}`)
    }

  } catch (error: any) {
    console.error('Error:', error.message)
  } finally {
    await browser.close()
  }
}

testFlippLinks()
