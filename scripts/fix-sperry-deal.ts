import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://fxstwnfypgihgnobfgeu.supabase.co',
  'sb_secret_A2sndPo8UBcI4DTc7e4HUA__-tuQc9P'
)

async function fixSperryDeal() {
  console.log('Fixing Sperry deal...')

  const { data, error } = await supabase
    .from('deals')
    .update({ store: 'Sperry' })
    .ilike('title', '%sperry%')
    .select('id, title, store')

  if (error) {
    console.log('Error:', error)
    return
  }

  console.log('Updated:', JSON.stringify(data, null, 2))
}

fixSperryDeal()
