import { chromium } from 'playwright'

async function verifyUrls() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  const urls = [
    {
      name: 'Princess Auto',
      url: 'https://www.princessauto.com/en/searchresults?Ntt=golf'
    },
    {
      name: 'Home Hardware',
      url: 'https://www.homehardware.ca/en/search-results?q=golf'
    }
  ]

  for (const { name, url } of urls) {
    console.log(`\n${name}:`)
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 })
      await page.waitForTimeout(2000)
      const finalUrl = page.url()
      const hasResults = finalUrl.includes('search') || finalUrl.includes('Ntt')
      console.log(`  URL: ${url}`)
      console.log(`  Final: ${finalUrl.slice(0, 80)}`)
      console.log(`  Works: ${hasResults ? 'YES' : 'NO'}`)
    } catch (e: any) {
      console.log(`  Error: ${e.message}`)
    }
  }

  await browser.close()
}

verifyUrls()
