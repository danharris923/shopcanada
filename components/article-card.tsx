import Link from 'next/link'

interface ArticleCardProps {
  title: string
  excerpt: string
  category: string
  readTime: string
  href: string
  image: string
}

export function ArticleCard({ title, excerpt, category, readTime, href, image }: ArticleCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="bg-[#1a2a1a] border-2 border-[#3a4a3a] hover:border-[#b8860b] transition-colors h-full flex flex-col">
        <div className="relative aspect-video overflow-hidden bg-[#0f1410]">
          <img 
            src={image || "/placeholder.svg"} 
            alt={title}
            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
          />
        </div>
        
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-3 text-xs">
            <span className="px-2 py-1 bg-[#5c1a1a] text-[#b8860b] font-bold border border-[#b8860b]">
              {category.toUpperCase()}
            </span>
            <span className="text-[#b8a896]">{readTime} read</span>
          </div>
          
          <h3 className="text-xl font-bold text-[#f4ede4] mb-3 group-hover:text-[#b8860b] transition-colors leading-snug">
            {title}
          </h3>
          
          <p className="text-[#b8a896] text-sm leading-relaxed mb-4 flex-1">
            {excerpt}
          </p>
          
          <span className="text-[#b8860b] group-hover:text-[#d4a520] font-medium text-sm">
            Read More →
          </span>
        </div>
      </div>
    </Link>
  )
}
