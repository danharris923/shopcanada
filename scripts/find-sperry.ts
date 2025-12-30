import { chromium } from 'playwright'

async function findSperry() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  // Search for sperry on the site
  await page.goto('https://shopcanada.cc/search?q=sperry', { waitUntil: 'domcontentloaded', timeout: 30000 })
  await page.waitForTimeout(3000)

  const cards = await page.$$('.deal-card')
  console.log(`Found ${cards.length} cards for "sperry"\n`)

  for (const card of cards) {
    const tagName = await card.evaluate(el => el.tagName.toLowerCase())
    const href = tagName === 'a' ? await card.getAttribute('href') : null
    const titleEl = await card.$('h3')
    const title = titleEl ? await titleEl.textContent() : 'Unknown'
    const storeEl = await card.$('.deal-card-store')
    const store = storeEl ? await storeEl.textContent() : 'Unknown'

    console.log(`Store: ${store?.trim()}`)
    console.log(`Title: ${title?.trim().slice(0, 50)}`)
    console.log(`Link: ${href || 'NONE'}`)
    console.log('')
  }

  await browser.close()
}

findSperry()
