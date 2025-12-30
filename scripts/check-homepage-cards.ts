import { chromium } from 'playwright'

async function checkHomepageCards() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  console.log('Checking homepage cards for clickability...\n')

  await page.goto('https://shopcanada.cc', { waitUntil: 'domcontentloaded', timeout: 30000 })
  await page.waitForTimeout(2000)

  // Find all deal cards
  const allCards = await page.$$('.deal-card')
  console.log(`Found ${allCards.length} deal cards\n`)

  let unclickable = 0
  for (const card of allCards) {
    const tagName = await card.evaluate(el => el.tagName.toLowerCase())
    const href = tagName === 'a' ? await card.getAttribute('href') : null
    const titleEl = await card.$('h3')
    const title = titleEl ? await titleEl.textContent() : 'Unknown'
    const storeEl = await card.$('.deal-card-store')
    const store = storeEl ? await storeEl.textContent() : ''

    // Check for FLYER badge
    const flyerBadge = await card.$('span:has-text("FLYER")')
    const isFlyer = flyerBadge !== null

    if (!href || href === '') {
      unclickable++
      console.log(`❌ UNCLICKABLE:`)
      console.log(`   Store: ${store?.trim() || 'Unknown'}`)
      console.log(`   Title: ${title?.trim().slice(0, 50)}`)
      console.log(`   Tag: <${tagName}>`)
      console.log(`   Is Flyer: ${isFlyer}`)
      console.log('')
    }
  }

  console.log(`\nTotal unclickable: ${unclickable}/${allCards.length}`)

  await browser.close()
}

checkHomepageCards()
