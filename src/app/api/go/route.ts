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
  // 2. Clean professional loading (200ms)
  // 3. Redirect to search URL
  if (affiliateUrl) {
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>ShopCanada</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#fff;height:100vh;display:flex;justify-content:center;align-items:center}
    .wrap{text-align:center}
    .logo{font-size:18px;font-weight:600;color:#1a1a1a;letter-spacing:-.5px}
    .logo span{color:#c41e3a}
    .spinner{width:20px;height:20px;border:2px solid #e5e5e5;border-top-color:#c41e3a;border-radius:50%;margin:16px auto 0;animation:spin .6s linear infinite}
    @keyframes spin{to{transform:rotate(360deg)}}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="logo">Shop<span>Canada</span></div>
    <div class="spinner"></div>
  </div>
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
