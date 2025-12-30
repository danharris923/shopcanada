import { chromium } from 'playwright'

async function findSearchUrl(storeName: string, storeUrl: string) {
  console.log(`\n${storeName}:`)

  const browser = await chromium.launch({ headless: false })
  const page = await browser.newPage()

  try {
    await page.goto(storeUrl, { waitUntil: 'domcontentloaded', timeout: 30000 })

    // Close popups
    await page.waitForTimeout(2000)

    // Try to close cookie banners
    const cookieSelectors = [
      'button:has-text("Accept")',
      'button:has-text("Accept All")',
      'button:has-text("I Accept")',
      '[id*="cookie"] button',
      '[class*="cookie"] button',
      '.modal button.close',
    ]

    for (const selector of cookieSelectors) {
      try {
        const btn = await page.$(selector)
        if (btn) {
          await btn.click()
          console.log(`  Closed popup: ${selector}`)
          await page.waitForTimeout(500)
        }
      } catch {}
    }

    // Find and use the search box
    const searchSelectors = [
      'input[type="search"]',
      'input[name="q"]',
      'input[name="search"]',
      'input[placeholder*="Search"]',
      'input[placeholder*="search"]',
      '#search',
      '.search-input',
    ]

    for (const selector of searchSelectors) {
      try {
        const input = await page.$(selector)
        if (input && await input.isVisible()) {
          console.log(`  Found search: ${selector}`)

          // Type search term
          await input.fill('golf')
          await page.waitForTimeout(500)

          // Submit
          await input.press('Enter')
          await page.waitForTimeout(3000)

          // Get the search results URL
          const resultUrl = page.url()
          console.log(`  Result URL: ${resultUrl}`)

          // Extract the pattern
          if (resultUrl.includes('golf')) {
            const pattern = resultUrl.replace('golf', '{QUERY}')
            console.log(`  Pattern: ${pattern}`)
          }
          break
        }
      } catch {}
    }

  } catch (error: any) {
    console.log(`  Error: ${error.message}`)
  } finally {
    await browser.close()
  }
}

async function main() {
  await findSearchUrl('Home Hardware', 'https://www.homehardware.ca')
  await findSearchUrl('Princess Auto', 'https://www.princessauto.com')
}

main()
