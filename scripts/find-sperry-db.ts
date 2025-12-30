import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://fxstwnfypgihgnobfgeu.supabase.co',
  'sb_secret_A2sndPo8UBcI4DTc7e4HUA__-tuQc9P'
)

async function find() {
  console.log('Searching for Sperry deals...')

  const { data, error } = await supabase
    .from('deals')
    .select('id, title, store, affiliate_url')
    .ilike('title', '%sperry%')

  if (error) {
    console.log('Error:', error)
    return
  }

  console.log('Found', data?.length || 0, 'deals')
  console.log(JSON.stringify(data, null, 2))
}

find()
