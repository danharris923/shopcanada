import { NextRequest, NextResponse } from 'next/server'

/**
 * Affiliate redirect wrapper
 *
 * Sets affiliate cookie via the tracking link, then redirects to search URL
 *
 * Usage: /api/go?a=AFFILIATE_URL&s=SEARCH_URL
 * - a: Affiliate tracking URL (rstyle.me, etc.) - sets cookie
 * - s: Search URL - where user ends up
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const affiliateUrl = searchParams.get('a')
  const searchUrl = searchParams.get('s')

  if (!searchUrl) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If we have both affiliate and search URLs:
  // 1. Fire off affiliate URL request immediately (img beacon - fastest)
  // 2. Redirect to search URL with zero delay
  if (affiliateUrl) {
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0;url=${searchUrl}">
  <title>Redirecting...</title>
</head>
<body>
  <img src="${affiliateUrl}" width="1" height="1" style="position:absolute;left:-9999px" alt="">
  <script>window.location.replace("${searchUrl}")</script>
</body>
</html>`

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    })
  }

  // No affiliate URL, just redirect to search
  return NextResponse.redirect(searchUrl)
}
