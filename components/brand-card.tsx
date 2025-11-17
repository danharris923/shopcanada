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
        <div className="bg-[#1a2a1a] border-2 border-[#3a4a3a] hover:border-[#b8860b] transition-all">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#0f1410]">
            <img 
              src={image || "/placeholder.svg"} 
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1410] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-sm text-[#b8860b] font-bold mb-1">{established}</div>
              <h3 className="text-2xl font-serif text-[#f4ede4] mb-1">{name}</h3>
            </div>
          </div>
          <div className="p-4">
            <p className="text-[#b8a896] mb-3 leading-relaxed">{tagline}</p>
            <span className="text-[#b8860b] group-hover:text-[#d4a520] font-medium text-sm">
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
            className="px-6 py-3 bg-[#b8860b] text-[#0f1410] font-bold text-center hover:bg-[#d4a520] transition-colors"
          >
            Visit {name}
          </a>
        )}
        {amazonLink && (
          <a
            href={amazonLink}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="px-6 py-3 bg-transparent text-[#b8860b] font-bold text-center border-2 border-[#b8860b] hover:bg-[#5c1a1a] transition-colors"
          >
            Shop on Amazon 🛒
          </a>
        )}
      </div>
    </div>
  )
}
