import { chromium } from 'playwright'

async function findHomeHardwareSearch() {
  console.log('Finding Home Hardware search URL...\n')

  const browser = await chromium.launch({ headless: false })
  const page = await browser.newPage()

  try {
    await page.goto('https://www.homehardware.ca', { waitUntil: 'networkidle', timeout: 60000 })
    await page.waitForTimeout(3000)

    // Close cookie popup
    try {
      await page.click('button:has-text("Accept")', { timeout: 3000 })
      console.log('Closed cookie popup')
      await page.waitForTimeout(1000)
    } catch {}

    // Close location popup if any
    try {
      await page.click('button:has-text("Close")', { timeout: 2000 })
    } catch {}
    try {
      await page.click('[aria-label="Close"]', { timeout: 2000 })
    } catch {}

    await page.waitForTimeout(1000)

    // Find search input
    const searchInput = await page.$('input[type="search"], input[name="search"], input[placeholder*="earch"]')
    if (searchInput) {
      console.log('Found search input')
      await searchInput.click()
      await page.waitForTimeout(500)
      await searchInput.fill('golf')
      await page.waitForTimeout(500)
      await searchInput.press('Enter')
      await page.waitForTimeout(5000)

      const url = page.url()
      console.log(`\nSearch URL: ${url}`)

      // Extract pattern
      const pattern = url.replace(/golf/gi, '{QUERY}')
      console.log(`Pattern: ${pattern}`)
    } else {
      console.log('Search input not found, trying to inspect page...')
      // Look for any inputs
      const inputs = await page.$$('input')
      console.log(`Found ${inputs.length} inputs`)
      for (const input of inputs.slice(0, 5)) {
        const placeholder = await input.getAttribute('placeholder')
        const name = await input.getAttribute('name')
        const type = await input.getAttribute('type')
        console.log(`  - type="${type}" name="${name}" placeholder="${placeholder}"`)
      }
    }

  } catch (error: any) {
    console.log(`Error: ${error.message}`)
  } finally {
    await browser.close()
  }
}

findHomeHardwareSearch()
