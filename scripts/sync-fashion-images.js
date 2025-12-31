/**
 * Fashion Images Sync Script
 *
 * Copies brand images from the source folder to public/images/fashion/
 * for local development and Next.js static serving.
 *
 * Usage:
 *   node scripts/sync-fashion-images.js
 *   npm run sync-fashion-images
 */

const fs = require('fs')
const path = require('path')

// Configuration
const SOURCE_DIR = 'D:/git/shopsitescraper/images'
const DEST_DIR = path.join(process.cwd(), 'public', 'images', 'fashion')

// Brand folder mappings (source folder -> destination folder)
// Normalizes folder names for URL consistency
const BRAND_FOLDERS = {
  'Abercrombie_Fitch': 'abercrombie-fitch',
  'Aerie': 'aerie',
  'aldo': 'aldo',
  'Alo_Yoga': 'alo-yoga',
  'American_Eagle': 'american-eagle',
  'Anthropologie': 'anthropologie',
  'Birkenstock': 'birkenstock',
  'Brooklinen': 'brooklinen',
  'CB2': 'cb2',
  'Charlotte_Tilbury': 'charlotte-tilbury',
  'Colleen_Rothschild': 'colleen-rothschild',
  'Cotton_On': 'cotton-on',
  'Crate_Barrel': 'crate-barrel',
  'Dime_Beauty': 'dime-beauty',
  'Dyson': 'dyson',
  'e.l.f._Cosmetics': 'elf-cosmetics',
  'footlocker': 'foot-locker',
  'Free_People': 'free-people',
  'GUESS': 'guess',
  'lululemon': 'lululemon',
  'Lulus': 'lulus',
  'Madewell': 'madewell',
  'Merit_Beauty': 'merit-beauty',
  'Nasty_Gal': 'nasty-gal',
  'New_Balance': 'new-balance',
  'Pottery_Barn': 'pottery-barn',
  'PrettyLittleThing': 'prettylittlething',
  'Princess_Polly': 'princess-polly',
  'Revolve': 'revolve',
  'Shopbop': 'shopbop',
  'Simons': 'simons',
  'SKIMS': 'skims',
  'Steve_Madden': 'steve-madden',
  'Supergoop': 'supergoop',
  'Tarte_Cosmetics': 'tarte-cosmetics',
  'Tula_Skincare': 'tula-skincare',
  'UGG': 'ugg',
  'Urban_Outfitters': 'urban-outfitters',
  'Vuori': 'vuori',
  'West_Elm': 'west-elm',
}

function log(message, type = 'info') {
  const timestamp = new Date().toISOString()
  const colors = {
    info: '\x1b[36m',    // Cyan
    success: '\x1b[32m', // Green
    error: '\x1b[31m',   // Red
    warn: '\x1b[33m',    // Yellow
  }
  const reset = '\x1b[0m'
  console.log(`${colors[type]}[${timestamp}] ${message}${reset}`)
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    log(`Created directory: ${dir}`, 'success')
  }
}

function copyImages(sourceFolder, destFolder) {
  const sourcePath = path.join(SOURCE_DIR, sourceFolder)
  const destPath = path.join(DEST_DIR, destFolder)

  if (!fs.existsSync(sourcePath)) {
    log(`Source folder not found: ${sourcePath}`, 'warn')
    return 0
  }

  ensureDir(destPath)

  const files = fs.readdirSync(sourcePath)
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))

  let copied = 0
  for (const file of imageFiles) {
    const srcFile = path.join(sourcePath, file)
    // Normalize filename to lowercase with consistent naming
    const destFile = path.join(destPath, file.toLowerCase())

    // Only copy if dest doesn't exist or is older
    const srcStat = fs.statSync(srcFile)
    let shouldCopy = true
    if (fs.existsSync(destFile)) {
      const destStat = fs.statSync(destFile)
      if (destStat.mtime >= srcStat.mtime) {
        shouldCopy = false
      }
    }

    if (shouldCopy) {
      fs.copyFileSync(srcFile, destFile)
      copied++
    }
  }

  return copied
}

function main() {
  log('========================================', 'info')
  log('Fashion Images Sync Script', 'info')
  log('========================================', 'info')
  log(`Source: ${SOURCE_DIR}`, 'info')
  log(`Destination: ${DEST_DIR}`, 'info')
  log('', 'info')

  // Ensure base destination directory exists
  ensureDir(DEST_DIR)

  let totalCopied = 0
  let totalBrands = 0

  for (const [sourceFolder, destFolder] of Object.entries(BRAND_FOLDERS)) {
    const copied = copyImages(sourceFolder, destFolder)
    if (copied > 0) {
      log(`${destFolder}: ${copied} images copied`, 'success')
    } else {
      log(`${destFolder}: up to date`, 'info')
    }
    totalCopied += copied
    totalBrands++
  }

  log('', 'info')
  log('========================================', 'info')
  log(`Sync complete: ${totalCopied} images copied across ${totalBrands} brands`, 'success')
  log('========================================', 'info')
}

main()
