import Link from 'next/link'

interface BrandCardProps {
  name: string
  tagline: string
  established: string
  href: string
  image: string
  amazonLink?: string
  websiteUrl?: string
}

export function BrandCard({ name, tagline, established, href, image, amazonLink, websiteUrl }: BrandCardProps) {
  return (
    <div className="group block">
      <Link href={href}>
        <div className="bg-white border border-silver-light hover:border-maple-red transition-all rounded-card overflow-hidden">
          <div className="relative aspect-[4/3] overflow-hidden bg-ivory">
            <img
              src={image || "/placeholder.svg"}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-sm text-maple-red font-bold mb-1">{established}</div>
              <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
            </div>
          </div>
          <div className="p-4">
            <p className="text-slate mb-3 leading-relaxed">{tagline}</p>
            <span className="text-maple-red group-hover:text-burgundy font-medium text-sm">
              Read Their Story →
            </span>
          </div>
        </div>
      </Link>

      <div className="mt-4 flex flex-col gap-2">
        {websiteUrl && (
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-center"
          >
            Visit {name}
          </a>
        )}
        {amazonLink && (
          <a
            href={amazonLink}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="btn-secondary text-center"
          >
            Shop on Amazon 🛒
          </a>
        )}
      </div>
    </div>
  )
}
