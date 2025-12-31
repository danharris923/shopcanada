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

  // If we have both affiliate and search URLs, return HTML that:
  // 1. Loads affiliate URL in hidden iframe (sets cookie)
  // 2. Redirects main window to search URL after brief delay
  if (affiliateUrl) {
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background: #f5f5f5;
    }
    .loader {
      text-align: center;
    }
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #ddd;
      border-top-color: #c41e3a;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 16px;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div class="loader">
    <div class="spinner"></div>
    <p>Taking you to the store...</p>
  </div>

  <!-- Hidden iframe to set affiliate cookie -->
  <iframe src="${affiliateUrl}" style="display:none" width="0" height="0"></iframe>

  <script>
    // Redirect to search URL after cookie is set
    setTimeout(function() {
      window.location.href = "${searchUrl}";
    }, 500);
  </script>
</body>
</html>`

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    })
  }

  // No affiliate URL, just redirect to search
  return NextResponse.redirect(searchUrl)
}
