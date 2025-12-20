import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={index} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-maple-red hover:text-burgundy transition-colors tracking-wider uppercase text-xs"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-charcoal tracking-wider uppercase text-xs font-medium">
                  {item.label}
                </span>
              )}
              {!isLast && <span className="text-silver">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
