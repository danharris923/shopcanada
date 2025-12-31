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
  // 1. Fire off affiliate URL request (img beacon)
  // 2. Quick branded animation (250ms)
  // 3. Redirect to search URL
  if (affiliateUrl) {
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>ShopCanada</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:system-ui,sans-serif;background:#c41e3a;height:100vh;display:flex;justify-content:center;align-items:center;overflow:hidden}
    .wrap{text-align:center;animation:pop .2s ease-out}
    .leaf{font-size:48px;animation:bounce .3s ease-out}
    .txt{color:#fff;font-weight:700;font-size:14px;margin-top:8px;opacity:0;animation:fade .2s ease-out .1s forwards}
    @keyframes pop{0%{transform:scale(0)}100%{transform:scale(1)}}
    @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
    @keyframes fade{to{opacity:1}}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="leaf">🍁</div>
    <div class="txt">Taking you to the deal...</div>
  </div>
  <img src="${affiliateUrl}" width="1" height="1" style="position:absolute;left:-9999px" alt="">
  <script>setTimeout(function(){window.location.replace("${searchUrl}")},250)</script>
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
