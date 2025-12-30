import { chromium } from 'playwright'

async function debug() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  // Check what's being rendered
  await page.goto('https://shopcanada.cc', { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(2000)

  // Find the PetSmart card and inspect it
  const cards = await page.$$('.deal-card')

  for (const card of cards) {
    const storeEl = await card.$('.deal-card-store')
    const store = storeEl ? await storeEl.textContent() : ''

    if (store?.toLowerCase().includes('petsmart') || store?.toLowerCase().includes('goemans')) {
      const tagName = await card.evaluate(el => el.tagName.toLowerCase())
      const href = tagName === 'a' ? await card.getAttribute('href') : null
      const titleEl = await card.$('h3')
      const title = titleEl ? await titleEl.textContent() : ''

      // Get outer HTML to see what's rendered
      const html = await card.evaluate(el => el.outerHTML.slice(0, 500))

      console.log(`Store: ${store?.trim()}`)
      console.log(`Title: ${title?.trim().slice(0, 40)}`)
      console.log(`Tag: <${tagName}>`)
      console.log(`Href: ${href || 'NONE'}`)
      console.log(`HTML: ${html.slice(0, 200)}...`)
      console.log('')
    }
  }

  await browser.close()
}

debug()
