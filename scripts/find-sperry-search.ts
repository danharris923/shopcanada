import { chromium } from 'playwright'

async function findSperrySearch() {
  console.log('Finding Sperry search URL...\n')

  const browser = await chromium.launch({ headless: false })
  const page = await browser.newPage()

  try {
    await page.goto('https://www.sperry.com/en-ca', { waitUntil: 'domcontentloaded', timeout: 30000 })
    await page.waitForTimeout(3000)

    // Accept cookies
    try {
      await page.click('button:has-text("Accept")', { timeout: 3000 })
      console.log('Accepted cookies')
    } catch {}
    try {
      await page.click('#onetrust-accept-btn-handler', { timeout: 2000 })
      console.log('Accepted OneTrust cookies')
    } catch {}

    await page.waitForTimeout(1000)

    // Find search
    const searchBtn = await page.$('[aria-label*="search" i], .search-icon, button[class*="search"]')
    if (searchBtn) {
      await searchBtn.click()
      await page.waitForTimeout(1000)
    }

    const searchInput = await page.$('input[type="search"], input[name="q"], input[placeholder*="Search" i]')
    if (searchInput) {
      await searchInput.fill('boat shoes')
      await page.waitForTimeout(500)
      await searchInput.press('Enter')
      await page.waitForTimeout(3000)

      const url = page.url()
      console.log(`Search URL: ${url}`)
      console.log(`Pattern: ${url.replace(/boat%20shoes|boat\+shoes/gi, '{QUERY}')}`)
    } else {
      console.log('No search input found')
    }

  } catch (e: any) {
    console.log('Error:', e.message)
  } finally {
    await browser.close()
  }
}

findSperrySearch()
