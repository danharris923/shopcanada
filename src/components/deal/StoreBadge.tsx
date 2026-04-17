// Store-specific trust badges
export function StoreBadge({ store }: { store: string | null }) {
  if (!store) return null

  const badges: Record<string, { color: string; text: string }> = {
    'amazon': { color: 'bg-amber-50 text-amber-800', text: '🚀 Prime Eligible' },
    'walmart': { color: 'bg-ivory text-charcoal', text: '📦 Free Pickup' },
    'costco': { color: 'bg-red-50 text-burgundy', text: '🏷️ Member Price' },
    'best-buy': { color: 'bg-ivory text-charcoal', text: '💳 Price Match' },
  }

  const badge = badges[store]
  if (!badge) return null

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}>
      {badge.text}
    </span>
  )
}
