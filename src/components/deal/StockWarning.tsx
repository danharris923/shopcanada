interface StockWarningProps {
  variant: 'warning' | 'critical'
  message: string
}

export function StockWarning({ variant, message }: StockWarningProps) {
  const variantClasses = {
    warning: 'stock-warning',
    critical: 'stock-warning stock-critical animate-pulse',
  }

  const icon = variant === 'critical' ? '🚨' : '⚠️'

  return (
    <div className={variantClasses[variant]}>
      <span className="text-lg">{icon}</span>
      <span className="font-medium text-sm">{message}</span>
    </div>
  )
}
