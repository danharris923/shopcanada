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
  // Get raw query string to preserve + signs (searchParams decodes them as spaces)
  const url = new URL(request.url)
  const rawQuery = url.search.slice(1) // Remove leading ?
  const params = new URLSearchParams(rawQuery)

  // Decode but preserve the actual URL structure
  const affiliateUrl = params.get('a')
  const searchUrl = params.get('s')

  if (!searchUrl) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If we have both affiliate and search URLs:
  // 1. Fire off affiliate URL request (img beacon)
  // 2. Subtle corner toast (200ms)
  // 3. Redirect to search URL
  if (affiliateUrl) {
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <style>
    body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
    .toast{position:fixed;bottom:20px;left:20px;background:#fff;border:1px solid #e5e5e5;border-radius:8px;padding:12px 16px;box-shadow:0 2px 8px rgba(0,0,0,.1);display:flex;align-items:center;gap:10px}
    .spinner{width:14px;height:14px;border:2px solid #e5e5e5;border-top-color:#c41e3a;border-radius:50%;animation:spin .6s linear infinite}
    .txt{font-size:13px;color:#666}
    @keyframes spin{to{transform:rotate(360deg)}}
  </style>
</head>
<body>
  <div class="toast"><div class="spinner"></div><span class="txt">Redirecting...</span></div>
  <img src="${affiliateUrl}" width="1" height="1" style="position:absolute;left:-9999px" alt="">
  <script>setTimeout(function(){window.location.replace("${searchUrl}")},200)</script>
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
