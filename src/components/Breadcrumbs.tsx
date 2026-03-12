import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  variant?: 'default' | 'compact'
}

export function Breadcrumbs({ items, variant = 'compact' }: BreadcrumbsProps) {
  const isDefault = variant === 'default'

  return (
    <nav aria-label="Breadcrumb" className={isDefault ? 'py-4' : 'text-sm'}>
      <ol className={`flex flex-wrap items-center ${isDefault ? 'gap-2 text-sm' : 'gap-1 text-silver'}`}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.href || index} className="flex items-center">
              {!isDefault && index > 0 && (
                <span className="mx-2 text-silver-light">/</span>
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={
                    isDefault
                      ? 'text-maple-red hover:text-burgundy transition-colors tracking-wider uppercase text-xs'
                      : 'hover:text-maple-red hover:underline transition-colors'
                  }
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={
                    isDefault
                      ? 'text-charcoal tracking-wider uppercase text-xs font-medium'
                      : 'text-charcoal font-medium truncate max-w-[200px]'
                  }
                >
                  {item.label}
                </span>
              )}
              {isDefault && !isLast && <span className="text-silver ml-2">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
