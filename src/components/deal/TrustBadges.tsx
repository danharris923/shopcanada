interface TrustBadgesProps {
  storeName?: string
}

export function TrustBadges({ storeName }: TrustBadgesProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate">
      <Badge icon="✓" text="Free Shipping" />
      <Badge icon="↩️" text="Easy Returns" />
      <Badge icon="🔒" text="Secure Checkout" />
      {storeName && <Badge icon="🏪" text={`Shop ${storeName}`} />}
    </div>
  )
}

function Badge({ icon, text }: { icon: string; text: string }) {
  return (
    <span className="flex items-center gap-1.5 bg-ivory px-3 py-1.5 rounded-full">
      <span>{icon}</span>
      <span>{text}</span>
    </span>
  )
}

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
