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
                  className="text-[#b8860b] hover:text-[#d4a520] transition-colors tracking-wider uppercase text-xs"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#f4ede4] tracking-wider uppercase text-xs">
                  {item.label}
                </span>
              )}
              {!isLast && <span className="text-[#b8a896]">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
