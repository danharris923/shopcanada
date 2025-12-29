/**
 * Migrate brand screenshots from local /public/brand-screenshots to Supabase Storage
 *
 * Prerequisites:
 * 1. Add to .env.local:
 *    SUPABASE_URL=https://fxstwnfypgihgnobfgeu.supabase.co
 *    SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
 *
 * 2. Create bucket in Supabase Dashboard:
 *    - Go to Storage → New Bucket
 *    - Name: brand-screenshots
 *    - Public: Yes
 *
 * Run with: npx tsx scripts/migrate-screenshots-to-supabase.ts
 */

import { createClient } from '@supabase/supabase-js'
import { Pool } from 'pg'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const POSTGRES_URL = process.env.POSTGRES_URL
const BUCKET_NAME = 'brand-screenshots'
const LOCAL_DIR = './public/brand-screenshots'

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  console.error('')
  console.error('Add these to your .env.local:')
  console.error('  SUPABASE_URL=https://fxstwnfypgihgnobfgeu.supabase.co')
  console.error('  SUPABASE_SERVICE_ROLE_KEY=your-service-role-key')
  console.error('')
  console.error('Get the service role key from:')
  console.error('  Supabase Dashboard → Settings → API → service_role key')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
const pool = new Pool({
  connectionString: POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
})

async function ensureBucketExists() {
  console.log('1. Checking/creating bucket...\n')

  const { data: buckets, error: listError } = await supabase.storage.listBuckets()

  if (listError) {
    console.error('❌ Error listing buckets:', listError.message)
    process.exit(1)
  }

  const bucketExists = buckets?.some(b => b.name === BUCKET_NAME)

  if (bucketExists) {
    console.log(`   ✓ Bucket "${BUCKET_NAME}" already exists`)
  } else {
    const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      fileSizeLimit: 5242880 // 5MB per file
    })

    if (createError) {
      console.error('❌ Error creating bucket:', createError.message)
      console.error('')
      console.error('You may need to create it manually in Supabase Dashboard:')
      console.error('  Storage → New Bucket → Name: brand-screenshots → Public: Yes')
      process.exit(1)
    }

    console.log(`   ✓ Created bucket "${BUCKET_NAME}"`)
  }
  console.log('')
}

async function uploadScreenshots() {
  console.log('2. Uploading screenshots to Supabase Storage...\n')

  const files = fs.readdirSync(LOCAL_DIR).filter(f =>
    f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.webp')
  )

  console.log(`   Found ${files.length} screenshot files\n`)

  let uploaded = 0
  let skipped = 0
  let failed = 0
  const results: { filename: string; url: string }[] = []

  for (const filename of files) {
    const filePath = path.join(LOCAL_DIR, filename)
    const fileBuffer = fs.readFileSync(filePath)

    // Determine content type
    const ext = path.extname(filename).toLowerCase()
    const contentType = ext === '.png' ? 'image/png'
      : ext === '.webp' ? 'image/webp'
      : 'image/jpeg'

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filename, fileBuffer, {
        contentType,
        upsert: true // Overwrite if exists
      })

    if (error) {
      console.log(`   ✗ Failed: ${filename} - ${error.message}`)
      failed++
    } else {
      uploaded++
      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${filename}`
      results.push({ filename, url: publicUrl })

      if (uploaded % 50 === 0) {
        console.log(`   ... uploaded ${uploaded}/${files.length}`)
      }
    }
  }

  console.log('')
  console.log(`   ✓ Uploaded: ${uploaded}`)
  console.log(`   ✗ Failed: ${failed}`)
  console.log('')

  return results
}

async function updateDatabaseUrls(results: { filename: string; url: string }[]) {
  console.log('3. Updating database screenshot_url values...\n')

  let updated = 0

  for (const { filename, url } of results) {
    // The local path was like /brand-screenshots/alo-yoga.png
    // We need to match stores where screenshot_url ends with this filename
    const localPath = `/brand-screenshots/${filename}`

    const result = await pool.query(
      `UPDATE stores SET screenshot_url = $1 WHERE screenshot_url = $2`,
      [url, localPath]
    )

    if (result.rowCount && result.rowCount > 0) {
      updated += result.rowCount
    }
  }

  console.log(`   ✓ Updated ${updated} store records`)
  console.log('')
}

async function verifyMigration() {
  console.log('4. Verifying migration...\n')

  const result = await pool.query(`
    SELECT
      COUNT(*) as total,
      COUNT(CASE WHEN screenshot_url LIKE '%supabase%' THEN 1 END) as supabase_urls,
      COUNT(CASE WHEN screenshot_url LIKE '/brand-screenshots%' THEN 1 END) as local_urls
    FROM stores
    WHERE screenshot_url IS NOT NULL
  `)

  const { total, supabase_urls, local_urls } = result.rows[0]

  console.log(`   Total with screenshots: ${total}`)
  console.log(`   Using Supabase Storage: ${supabase_urls}`)
  console.log(`   Still using local path: ${local_urls}`)
  console.log('')

  if (parseInt(local_urls) === 0) {
    console.log('   ✓ All screenshots migrated successfully!')
    console.log('')
    console.log('   You can now delete the local screenshots:')
    console.log('   rm -rf public/brand-screenshots')
  } else {
    console.log(`   ⚠ ${local_urls} screenshots still using local paths`)
  }
}

async function migrate() {
  console.log('='.repeat(60))
  console.log('Migrate Screenshots to Supabase Storage')
  console.log('='.repeat(60) + '\n')

  try {
    await ensureBucketExists()
    const results = await uploadScreenshots()
    await updateDatabaseUrls(results)
    await verifyMigration()

    console.log('='.repeat(60))
    console.log('Migration complete!')
    console.log('='.repeat(60))
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

migrate()
