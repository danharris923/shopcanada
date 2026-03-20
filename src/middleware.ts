import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const NEW_DOMAIN = 'clickandsavecanada.com'

const OLD_DOMAINS = [
  'shopcanada.cc',
  'www.shopcanada.cc',
  'canadiandealfinder.ca',
  'www.canadiandealfinder.ca',
  'canadiandealfinder.com',
  'www.canadiandealfinder.com',
  'www.clickandsavecanada.com',
]

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''

  if (OLD_DOMAINS.includes(host)) {
    const url = new URL(request.url)
    url.host = NEW_DOMAIN
    url.protocol = 'https'
    return NextResponse.redirect(url.toString(), 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/(.*)',
}
