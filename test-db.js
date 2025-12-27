const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
});

async function testQuery() {
  try {
    const result = await pool.query('SELECT * FROM deals LIMIT 1');
    const row = result.rows[0];

    if (!row) {
      console.log('No deals found');
      return;
    }

    console.log('\n=== RAW DATA FROM PG DRIVER ===\n');
    for (const [key, value] of Object.entries(row)) {
      console.log(`${key}:`);
      console.log(`  value: ${value}`);
      console.log(`  type: ${typeof value}`);
      console.log(`  constructor: ${value?.constructor?.name || 'null'}`);
      console.log('');
    }

    // Try to JSON.stringify
    console.log('\n=== JSON SERIALIZATION TEST ===\n');
    try {
      JSON.stringify(row);
      console.log('SUCCESS: Row is JSON serializable');
    } catch (e) {
      console.log('FAILED:', e.message);
    }

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await pool.end();
  }
}

testQuery();
