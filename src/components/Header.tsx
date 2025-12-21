import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-soft-black sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="font-bold text-xl text-white">
            Shop Canada
          </Link>
        </div>
      </div>
    </header>
  )
}
