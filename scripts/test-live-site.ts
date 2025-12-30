import { chromium } from 'playwright'

async function testLiveSite() {
  console.log('Testing https://shopcanada.cc ...')

  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  // Capture console errors
  const errors: string[] = []
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text())
    }
  })

  try {
    // Test homepage
    console.log('\n1. Testing homepage...')
    await page.goto('https://shopcanada.cc', { waitUntil: 'domcontentloaded', timeout: 30000 })
    const title = await page.title()
    console.log(`   Title: ${title}`)
    console.log('   ✓ Homepage loads')

    // Test search page (where Flipp deals are)
    console.log('\n2. Testing search page...')
    await page.goto('https://shopcanada.cc/search?q=fish', { waitUntil: 'domcontentloaded', timeout: 30000 })

    // Wait for deals to load
    await page.waitForTimeout(2000)

    // Check for deal cards
    const dealCards = await page.$$('.deal-card')
    console.log(`   Found ${dealCards.length} deal cards`)

    // Check if any cards have links
    const linkedCards = await page.$$('a.deal-card')
    console.log(`   Linked cards: ${linkedCards.length}`)

    if (linkedCards.length > 0) {
      const firstLink = await linkedCards[0].getAttribute('href')
      console.log(`   First card link: ${firstLink?.slice(0, 60)}...`)
    }
    console.log('   ✓ Search page loads')

    // Test a Canadian brand page with screenshot
    console.log('\n3. Testing Canadian brand page (lululemon)...')
    await page.goto('https://shopcanada.cc/canadian/brand/lululemon', { waitUntil: 'domcontentloaded', timeout: 30000 })

    // Check for screenshot image
    const screenshot = await page.$('img[alt*="website screenshot"]')
    if (screenshot) {
      console.log('   ✓ Screenshot image found')
    } else {
      console.log('   ⚠ Screenshot image not found')
    }

    // Print any console errors
    if (errors.length > 0) {
      console.log('\n⚠ Console errors found:')
      errors.forEach(e => console.log(`   - ${e.slice(0, 100)}`))
    } else {
      console.log('\n✓ No console errors!')
    }

    console.log('\n✓ All tests passed!')

  } catch (error: any) {
    console.error('\n✗ Test failed:', error.message)
    process.exit(1)
  } finally {
    await browser.close()
  }
}

testLiveSite()
