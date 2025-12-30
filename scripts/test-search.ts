import { chromium } from 'playwright'

async function testSearch() {
  console.log('Starting Playwright test...\n')

  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  // Capture console messages
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('Console ERROR:', msg.text())
    }
  })

  // Capture page errors
  page.on('pageerror', err => {
    console.log('Page ERROR:', err.message)
  })

  try {
    console.log('1. Loading http://localhost:3000/search?q=fish ...')
    const response = await page.goto('http://localhost:3000/search?q=fish', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    })

    console.log('   Status:', response?.status())
    console.log('   URL:', page.url())

    // Wait for content to load
    await page.waitForTimeout(3000)

    // Check page title
    const title = await page.title()
    console.log('   Title:', title)

    // Look for deal cards
    const dealCards = await page.locator('[class*="deal"], [class*="card"]').count()
    console.log('   Deal/Card elements found:', dealCards)

    // Look for Flipp deals specifically
    const flippDeals = await page.locator('text=FLYER').count()
    console.log('   FLYER badges found:', flippDeals)

    // Check for any visible errors
    const bodyText = await page.locator('body').innerText()
    if (bodyText.toLowerCase().includes('error')) {
      console.log('\n   ⚠️  Error text found on page')
    }

    // Get first 1500 chars of body text
    console.log('\n2. Page content preview:')
    console.log('   ' + bodyText.substring(0, 1500).replace(/\n/g, '\n   '))

    // Check for links
    const links = await page.locator('a[href*="walmart"], a[href*="costco"], a[href*="amazon"]').count()
    console.log('\n3. Retailer links found:', links)

    // Try to find any deal link
    const allLinks = await page.locator('a').all()
    console.log('   Total links on page:', allLinks.length)

    // Sample some href values
    console.log('\n4. Sample hrefs:')
    for (let i = 0; i < Math.min(5, allLinks.length); i++) {
      const href = await allLinks[i].getAttribute('href')
      if (href && href.length > 1) {
        console.log('   -', href.substring(0, 100))
      }
    }

    // Take screenshot
    await page.screenshot({ path: 'search-test.png', fullPage: true })
    console.log('\n5. Screenshot saved to search-test.png')

  } catch (error: any) {
    console.error('Test failed:', error.message)
  }

  await browser.close()
}

testSearch()
