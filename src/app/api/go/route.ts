import { NextRequest, NextResponse } from 'next/server'

/**
 * Affiliate redirect wrapper
 *
 * Sets affiliate cookie via the tracking link, then redirects to search URL
 *
 * Usage: /api/go?a=AFFILIATE_URL&s=SEARCH_URL
 * - a: Affiliate tracking URL (rstyle.me, etc.) - sets cookie
 * - s: Search URL - where user ends up
 *
 * Hardened against open-redirect + XSS (ported from promopenguin canonical,
 * allowlist UNIONed with shopcanada-specific retailer domains from
 * RETAILER_SEARCH_URLS in src/lib/affiliates.ts).
 */

const ALLOWED_REDIRECT_DOMAINS = [
  // --- Core retailers (promopenguin canonical) ---
  'amazon.ca', 'amazon.com',
  'walmart.ca', 'walmart.com',
  'costco.ca',
  'bestbuy.ca',
  'canadiantire.ca',
  'shoppers.ca', 'shoppersdrugmart.ca',
  'well.ca',
  'thebay.com', 'hudsonsbay.com',
  'sportchek.ca',
  'mec.ca',
  'ikea.ca',
  'wayfair.ca',
  'sephora.com',
  'lululemon.com',
  'aritzia.com',
  'simons.ca',
  'footlocker.ca', 'footlocker.com',
  'urbanoutfitters.com',
  'freepeople.com',
  'anthropologie.com',
  'abercrombie.com',
  'ae.com',
  'aloyoga.com',
  'guess.ca', 'guess.com',
  'skims.com',
  'revolve.com',
  'princesspolly.com',
  'shopbop.com',
  'vuoriclothing.com',
  'lulus.com',
  'madewell.com',
  'cottononus.com', 'cottonon.com',
  'nastygal.com',
  'prettylittlething.com', 'prettylittlething.ca',
  'stevemadden.ca', 'stevemadden.com',
  'newbalance.ca', 'newbalance.com',
  'birkenstock.ca', 'birkenstock.com',
  'ugg.com',
  'charlottetilbury.com',
  'tartecosmetics.com',
  'elfcosmetics.com',
  'tula.com',
  'colleen-rothschild.com', 'colleenrothschild.com',
  'dimebeauty.co',
  'meritbeauty.com',
  'supergoop.com',
  'crateandbarrel.com',
  'potterybarn.com',
  'westelm.com',
  'cb2.com',
  'dyson.ca', 'dyson.com',
  'brooklinen.com',
  'newegg.ca',
  'memoryexpress.com',
  'staples.ca',
  'thesource.ca',
  'atmosphere.ca',
  'loblaws.ca',
  'metro.ca',
  'sobeys.com',
  'saveonfoods.com',
  'safeway.ca',
  'londondrugs.com',
  'rfrk.com',
  // Affiliate networks
  'rstyle.me',
  'linksynergy.com',
  'rakuten.ca',
  'shopstyle.com',
  'pntra.com', 'pntrs.com', 'pntrac.com',
  'anrdoezrs.net', 'jdoqocy.com', 'tkqlhce.com', 'dpbolvw.net', 'kqzyfj.com',
  'shareasale.com',
  'avantlink.com',
  'impact.com',
  'partnerize.com',

  // --- Shopcanada-specific retailer domains ---
  // (UNIONed from src/lib/affiliates.ts RETAILER_SEARCH_URLS)
  'nofrills.ca',
  'realcanadiansuperstore.ca',
  'foodbasics.ca',
  'freshco.com',
  'iga.net',
  'maxi.ca',
  'provigo.ca',
  'superc.ca',
  'wholesaleclub.ca',
  'gianttiger.com',
  'dollarama.com',
  'dell.com',
  'lenovo.com',
  'canadacomputers.com',
  'apple.com',
  'microsoft.com',
  'samsung.com',
  'visions.ca',
  'homedepot.ca',
  'rona.ca',
  'homehardware.ca',
  'princessauto.com',
  'leevalley.com',
  'structube.com',
  'thebrick.com',
  'leons.ca',
  'sleepcountry.ca',
  'gapcanada.ca',
  'hm.com',
  'zara.com',
  'uniqlo.com',
  'roots.com',
  'ardene.com',
  'michaelkors.ca',
  'sephora.ca',
  'sperry.com',
  'joefresh.com',
  'marks.com',
  'sail.ca',
  'rexall.ca',
  'petsmart.ca',
  'petvalu.ca',
  'indigo.ca',
  'toysrus.ca',
  'michaels.com',
  'ebgames.ca',
  'marchesadonis.com',
  'starskydeli.com',
  'tntsupermarket.com',
  'fortinos.ca',
  'naturesemporium.com',
  'cabelas.ca',
  'mmfoodmarket.com',
  'farmboy.ca',
  'bulkbarn.ca',
  'yourindependentgrocer.ca',
  'valumart.ca',
  'zehrs.ca',
  'atlanticsuperstore.ca',
  'dominion.ca',
  'extrafoods.ca',
  'goemans.com',
  'aldoshoes.com',
  'cb2.ca',
  'potterybarn.ca',
  'westelm.ca',
  'dimebeautyco.com',
]

function isAllowedUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString)
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return false
    const hostname = url.hostname.toLowerCase()
    return ALLOWED_REDIRECT_DOMAINS.some(domain =>
      hostname === domain || hostname.endsWith('.' + domain)
    )
  } catch {
    return false
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export async function GET(request: NextRequest) {
  // Get raw query string to preserve + signs (searchParams decodes them as spaces)
  const url = new URL(request.url)
  const rawQuery = url.search.slice(1)
  const params = new URLSearchParams(rawQuery)

  const affiliateUrl = params.get('a')
  const searchUrl = params.get('s')

  if (!searchUrl || !isAllowedUrl(searchUrl)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (affiliateUrl) {
    if (!isAllowedUrl(affiliateUrl)) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    const safeAffiliateUrl = escapeHtml(affiliateUrl)
    const safeSearchUrl = escapeHtml(searchUrl)

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
</head>
<body>
  <img src="${safeAffiliateUrl}" width="1" height="1" style="position:absolute;left:-9999px" alt="">
  <script>window.location.replace("${safeSearchUrl}")</script>
</body>
</html>`

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    })
  }

  return NextResponse.redirect(searchUrl)
}
