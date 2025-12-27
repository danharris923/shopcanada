interface PriceDisplayProps {
  currentPrice: number | string | null
  originalPrice: number | string | null
  discountPercent: number | string | null
  size?: "sm" | "md" | "lg" | "xl"
}

export function PriceDisplay({
  currentPrice,
  originalPrice,
  discountPercent,
  size = "lg"
}: PriceDisplayProps) {
  const current = currentPrice != null ? Number(currentPrice) : null
  const original = originalPrice != null ? Number(originalPrice) : null
  const discount = discountPercent != null ? Number(discountPercent) : null

  const savingsAmount = original && current && !isNaN(original) && !isNaN(current) && original > current
    ? original - current
    : null
  const savings = savingsAmount && savingsAmount > 0 ? savingsAmount.toFixed(2) : null

  const sizeClasses = {
    sm: { current: "text-2xl", original: "text-sm", savings: "text-xs" },
    md: { current: "text-3xl", original: "text-base", savings: "text-sm" },
    lg: { current: "text-4xl", original: "text-lg", savings: "text-base" },
    xl: { current: "text-5xl", original: "text-xl", savings: "text-lg" },
  }

  const classes = sizeClasses[size]
  const originalClass = classes.original + " text-silver line-through"
  const currentClass = classes.current + " font-black text-maple-red"
  const currentClassAlt = classes.current + " font-black text-charcoal"
  const savingsClass = classes.savings + " text-maple-red font-bold"

  return (
    <div className="flex flex-col items-start gap-1">
      {original != null && !isNaN(original) && original > 0 && (
        <div className={originalClass}>
          ${original.toFixed(2)}
        </div>
      )}

      <div className="flex items-baseline gap-3">
        {current != null && !isNaN(current) && current > 0 ? (
          <span className={currentClass}>
            ${current.toFixed(2)}
          </span>
        ) : (
          <span className={currentClassAlt}>
            See Price
          </span>
        )}

        {discount != null && !isNaN(discount) && discount > 0 && (
          <span className="bg-maple-red text-white px-2 py-1 rounded-lg font-bold text-sm">
            -{discount}%
          </span>
        )}
      </div>

      {savings && (
        <div className={savingsClass}>
          You Save: ${savings}
        </div>
      )}
    </div>
  )
}
