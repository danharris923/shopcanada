import { chromium } from 'playwright'

async function testRetailerUrls() {
  console.log('Testing retailer search URLs...\n')

  const browser = await chromium.launch({ headless: false }) // Show browser
  const context = await browser.newContext()
  const page = await context.newPage()

  const urls = [
    {
      name: 'Princess Auto',
      url: 'https://www.princessauto.com/search?q=golf%20ball'
    },
    {
      name: 'Home Hardware',
      url: 'https://www.homehardware.ca/en/search?q=golf'
    }
  ]

  for (const { name, url } of urls) {
    console.log(`\n${name}:`)
    console.log(`  URL: ${url}`)

    try {
      // Try to accept cookies first
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })

      // Wait for any popups/redirects
      await page.waitForTimeout(3000)

      // Get final URL
      const finalUrl = page.url()
      console.log(`  Final URL: ${finalUrl}`)

      // Check if we're on search results or got redirected
      const hasSearchTerm = finalUrl.includes('search') || finalUrl.includes('q=')
      console.log(`  Has search in URL: ${hasSearchTerm}`)

      // Check for search results
      const title = await page.title()
      console.log(`  Page title: ${title}`)

    } catch (error: any) {
      console.log(`  Error: ${error.message}`)
    }
  }

  await browser.close()
}

testRetailerUrls()
