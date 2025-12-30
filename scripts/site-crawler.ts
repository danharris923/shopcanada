import { chromium, Browser, Page } from 'playwright'

interface LinkResult {
  url: string
  status: number | string
  source: string
  text?: string
}

interface CrawlResults {
  tested: number
  passed: number
  failed: LinkResult[]
  errors: LinkResult[]
}

const BASE_URL = 'https://shopcanada.cc'
const visited = new Set<string>()
const results: CrawlResults = {
  tested: 0,
  passed: 0,
  failed: [],
  errors: []
}

// Pages to start crawling from
const SEED_PAGES = [
  '/',
  '/stores',
  '/deals',
  '/canadian/brands',
  '/canadian/categories',
  '/category/electronics',
  '/category/fashion',
  '/category/home',
  '/category/beauty',
  '/category/sports',
  '/category/grocery',
  '/category/books',
  '/category/toys',
  '/about',
  '/privacy',
  '/terms',
]

async function testLink(page: Page, url: string, source: string, text?: string): Promise<void> {
  if (visited.has(url)) return
  visited.add(url)

  // Skip external links
  if (!url.startsWith(BASE_URL) && !url.startsWith('/')) {
    return
  }

  const fullUrl = url.startsWith('/') ? `${BASE_URL}${url}` : url

  // Skip non-http links
  if (!fullUrl.startsWith('http')) return

  // Skip external sites
  if (!fullUrl.includes('shopcanada.cc') && !fullUrl.includes('vercel.app')) return

  results.tested++

  try {
    const response = await page.goto(fullUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 15000
    })

    const status = response?.status() || 0

    if (status >= 400) {
      results.failed.push({ url: fullUrl, status, source, text })
      console.log(`❌ ${status} ${fullUrl}`)
    } else {
      results.passed++
      process.stdout.write('.')
    }
  } catch (error: any) {
    results.errors.push({ url: fullUrl, status: error.message, source, text })
    console.log(`⚠️ ERROR ${fullUrl}: ${error.message.slice(0, 50)}`)
  }
}

async function crawlPage(browser: Browser, url: string): Promise<string[]> {
  const page = await browser.newPage()
  const links: string[] = []

  try {
    const fullUrl = url.startsWith('/') ? `${BASE_URL}${url}` : url
    console.log(`\n📄 Crawling: ${fullUrl}`)

    const response = await page.goto(fullUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 20000
    })

    const status = response?.status() || 0
    if (status >= 400) {
      results.failed.push({ url: fullUrl, status, source: 'seed' })
      console.log(`❌ SEED PAGE ${status}: ${fullUrl}`)
      return []
    }

    await page.waitForTimeout(1000)

    // Get all links
    const anchors = await page.$$('a[href]')
    for (const anchor of anchors) {
      try {
        const href = await anchor.getAttribute('href')
        const text = await anchor.textContent()
        if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
          links.push(href)
        }
      } catch {}
    }

    // Get all buttons that might navigate
    const buttons = await page.$$('button')
    for (const button of buttons) {
      try {
        const onclick = await button.getAttribute('onclick')
        if (onclick && onclick.includes('location')) {
          console.log(`  Found button with navigation: ${onclick.slice(0, 50)}`)
        }
      } catch {}
    }

  } catch (error: any) {
    console.log(`⚠️ Could not crawl ${url}: ${error.message.slice(0, 50)}`)
  } finally {
    await page.close()
  }

  return links
}

async function main() {
  console.log('🕷️ ShopCanada Site Crawler\n')
  console.log(`Base URL: ${BASE_URL}\n`)

  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  // First, test all seed pages
  console.log('Testing seed pages...\n')
  for (const seedUrl of SEED_PAGES) {
    await testLink(page, seedUrl, 'seed')
  }

  // Crawl each seed page and collect links
  console.log('\n\nCrawling pages for links...\n')
  const allLinks: Map<string, string> = new Map()

  for (const seedUrl of SEED_PAGES) {
    const links = await crawlPage(browser, seedUrl)
    for (const link of links) {
      if (!allLinks.has(link)) {
        allLinks.set(link, seedUrl)
      }
    }
  }

  // Test all collected links
  console.log(`\n\nTesting ${allLinks.size} collected links...\n`)
  let count = 0
  for (const [link, source] of allLinks) {
    await testLink(page, link, source)
    count++
    if (count % 50 === 0) {
      console.log(`\n  (${count}/${allLinks.size})`)
    }
  }

  await browser.close()

  // Report
  console.log('\n\n' + '='.repeat(60))
  console.log('📊 CRAWL RESULTS')
  console.log('='.repeat(60))
  console.log(`Total tested: ${results.tested}`)
  console.log(`Passed: ${results.passed}`)
  console.log(`Failed (4xx/5xx): ${results.failed.length}`)
  console.log(`Errors: ${results.errors.length}`)

  if (results.failed.length > 0) {
    console.log('\n❌ FAILED LINKS:')
    console.log('-'.repeat(60))
    for (const fail of results.failed) {
      console.log(`${fail.status} | ${fail.url}`)
      console.log(`    Source: ${fail.source}`)
      if (fail.text) console.log(`    Text: ${fail.text.slice(0, 50)}`)
    }
  }

  if (results.errors.length > 0) {
    console.log('\n⚠️ ERRORS:')
    console.log('-'.repeat(60))
    for (const err of results.errors) {
      console.log(`${err.url}`)
      console.log(`    Error: ${err.status}`)
      console.log(`    Source: ${err.source}`)
    }
  }

  console.log('\n✅ Crawl complete!')
}

main().catch(console.error)
