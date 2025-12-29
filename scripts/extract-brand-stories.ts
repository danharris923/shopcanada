/**
 * Script to extract brandStory content from brands-data.ts to markdown files
 *
 * Run with: npx tsx scripts/extract-brand-stories.ts
 */

import * as fs from 'fs'
import * as path from 'path'

// Paths
const BRANDS_DATA_PATH = path.join(__dirname, '..', 'src', 'lib', 'brands-data.ts')
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'brands')

interface BrandInfo {
  slug: string
  name: string
  category: string
  brandStory: string
}

/**
 * Parse the brands-data.ts file and extract brands with brandStory
 */
function extractBrandsWithStories(): BrandInfo[] {
  console.log('Reading brands-data.ts...')
  const fileContent = fs.readFileSync(BRANDS_DATA_PATH, 'utf-8')

  const brands: BrandInfo[] = []

  // Regex to match each brand object in the array
  // This matches objects within the brands array
  const brandObjectRegex = /\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g

  // Find the brands array content
  const brandsArrayMatch = fileContent.match(/export const brands: Brand\[\] = \[([\s\S]*?)\];\s*(?:export|$)/m)
    || fileContent.match(/export const brands: Brand\[\] = \[([\s\S]*)\]/m)

  if (!brandsArrayMatch) {
    console.error('Could not find brands array in file')
    return []
  }

  const brandsArrayContent = brandsArrayMatch[1]

  // Match individual brand objects more carefully
  // We need to handle nested objects (affiliateProducts)
  let depth = 0
  let currentObject = ''
  let inString = false
  let stringChar = ''
  let prevChar = ''

  for (let i = 0; i < brandsArrayContent.length; i++) {
    const char = brandsArrayContent[i]

    // Track string state
    if ((char === '"' || char === "'") && prevChar !== '\\') {
      if (!inString) {
        inString = true
        stringChar = char
      } else if (char === stringChar) {
        inString = false
      }
    }

    if (!inString) {
      if (char === '{') {
        depth++
        if (depth === 1) {
          currentObject = ''
        }
      }
      if (char === '}') {
        depth--
        if (depth === 0) {
          currentObject += char
          // Parse this brand object
          const brand = parseBrandObject(currentObject)
          if (brand && brand.brandStory) {
            brands.push(brand)
          }
          currentObject = ''
        }
      }
    }

    if (depth > 0) {
      currentObject += char
    }

    prevChar = char
  }

  return brands
}

/**
 * Parse a single brand object string and extract fields
 */
function parseBrandObject(objStr: string): BrandInfo | null {
  try {
    // Extract slug
    const slugMatch = objStr.match(/"slug":\s*"([^"]+)"/)
    if (!slugMatch) return null
    const slug = slugMatch[1]

    // Extract name
    const nameMatch = objStr.match(/"name":\s*"([^"]+)"/)
    if (!nameMatch) return null
    const name = nameMatch[1]

    // Extract category
    const categoryMatch = objStr.match(/"category":\s*"([^"]+)"/)
    if (!categoryMatch) return null
    const category = categoryMatch[1]

    // Extract brandStory (may contain escaped quotes)
    const brandStoryMatch = objStr.match(/"brandStory":\s*"((?:[^"\\]|\\.)*)"/s)
    if (!brandStoryMatch) return null
    const brandStory = brandStoryMatch[1]
      .replace(/\\"/g, '"')  // Unescape quotes
      .replace(/\\n/g, '\n') // Convert newline escapes
      .replace(/\\\\/g, '\\') // Unescape backslashes

    return { slug, name, category, brandStory }
  } catch (error) {
    return null
  }
}

/**
 * Create a markdown file for a brand
 */
function createMarkdownFile(brand: BrandInfo): void {
  const frontmatter = `---
title: "${brand.name}"
slug: "${brand.slug}"
category: "${brand.category}"
---

`

  const content = frontmatter + brand.brandStory

  const filePath = path.join(CONTENT_DIR, `${brand.slug}.md`)
  fs.writeFileSync(filePath, content, 'utf-8')
  console.log(`  Created: ${brand.slug}.md`)
}

/**
 * Main function
 */
function main() {
  console.log('='.repeat(60))
  console.log('Brand Story Extraction Script')
  console.log('='.repeat(60))
  console.log('')

  // Create content directory if it doesn't exist
  if (!fs.existsSync(CONTENT_DIR)) {
    console.log(`Creating directory: ${CONTENT_DIR}`)
    fs.mkdirSync(CONTENT_DIR, { recursive: true })
  }

  // Extract brands with stories
  const brands = extractBrandsWithStories()

  if (brands.length === 0) {
    console.log('No brands with brandStory found.')
    return
  }

  console.log(`\nFound ${brands.length} brands with brandStory content.\n`)
  console.log('Creating markdown files...')

  // Create markdown files
  for (const brand of brands) {
    createMarkdownFile(brand)
  }

  console.log('')
  console.log('='.repeat(60))
  console.log(`Done! Extracted ${brands.length} brand stories to ${CONTENT_DIR}`)
  console.log('='.repeat(60))
}

// Run the script
main()
