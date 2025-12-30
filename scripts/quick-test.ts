import { chromium } from 'playwright'

const URLS = [
  'https://shopcanada.cc/category/books',
  'https://shopcanada.cc/category/toys',
  'https://shopcanada.cc/category/baby',
  'https://shopcanada.cc/category/tools',
  'https://shopcanada.cc/category/health',
]

async function test() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  console.log('Testing previously 404 pages:\n')

  for (const url of URLS) {
    try {
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 })
      const status = response?.status() || 0
      const icon = status < 400 ? '✅' : '❌'
      console.log(`${icon} ${status} ${url}`)
    } catch (e: any) {
      console.log(`⚠️ ERROR ${url}: ${e.message.slice(0, 50)}`)
    }
  }

  await browser.close()
}

test()
