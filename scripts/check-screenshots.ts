import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
});

async function check() {
  const result = await pool.query(`
    SELECT
      COUNT(*) as total,
      COUNT(screenshot_url) as has_screenshot,
      COUNT(*) - COUNT(screenshot_url) as missing_screenshot
    FROM stores
    WHERE type = 'brand' OR is_canadian = true
  `);

  console.log('=== SCREENSHOT SUMMARY ===');
  console.log('Total brands:', result.rows[0].total);
  console.log('With screenshot URL:', result.rows[0].has_screenshot);
  console.log('Missing screenshot URL:', result.rows[0].missing_screenshot);

  const missing = await pool.query(`
    SELECT name, slug
    FROM stores
    WHERE (type = 'brand' OR is_canadian = true)
    AND screenshot_url IS NULL
    ORDER BY name
    LIMIT 30
  `);

  console.log('\n=== BRANDS MISSING SCREENSHOTS (first 30) ===');
  missing.rows.forEach((r: any) => console.log('  -', r.name, '(' + r.slug + ')'));

  const sample = await pool.query(`
    SELECT name, slug, screenshot_url
    FROM stores
    WHERE screenshot_url IS NOT NULL
    LIMIT 5
  `);

  console.log('\n=== SAMPLE SCREENSHOT URLs ===');
  sample.rows.forEach((r: any) => console.log('  -', r.name + ':', r.screenshot_url));

  await pool.end();
}

check();
