import Link from 'next/link'

interface ProductCardProps {
  name: string
  brand: string
  price: string
  established?: string
  image: string
  href: string
  inStock?: boolean
}

export function ProductCard({ name, brand, price, established, image, href, inStock = true }: ProductCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="bg-[#1a2a1a] border-2 border-[#3a4a3a] hover:border-[#b8860b] transition-colors">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0f1410]">
          <img 
            src={image || "/placeholder.svg"} 
            alt={name}
            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="px-3 py-1 bg-[#5c1a1a] text-[#f4ede4] text-xs font-bold border border-[#b8860b]">
              🍁 CANADIAN MADE
            </span>
          </div>
          {!inStock && (
            <div className="absolute inset-0 bg-[#0f1410]/80 flex items-center justify-center">
              <span className="px-4 py-2 bg-[#5c1a1a] text-[#f4ede4] font-bold border-2 border-[#b8860b]">
                TEMPORARILY SOLD OUT
              </span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-sm text-[#b8860b] font-bold mb-1">{brand}</div>
              {established && (
                <div className="text-xs text-[#b8a896] mb-1">{established}</div>
              )}
            </div>
            <div className="text-xl font-bold text-[#f4ede4]">{price}</div>
          </div>
          
          <h3 className="font-bold text-[#f4ede4] mb-2 group-hover:text-[#b8860b] transition-colors leading-snug">
            {name}
          </h3>
          
          <div className="flex items-center justify-between pt-3 border-t border-[#3a4a3a]">
            <span className="text-sm text-[#b8a896]">Support Canadian</span>
            <span className="text-[#b8860b] group-hover:text-[#d4a520] font-medium text-sm">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
