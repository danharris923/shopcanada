/**
 * YouTube Feed Integration
 * Fetches latest videos from channel RSS feed and matches to store pages
 */

export interface YouTubeVideo {
  id: string
  title: string
  description: string
  publishedAt: string
  thumbnail: string
  storeSlug: string | null  // Matched store, null if no match
}

// Your YouTube Channel ID
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCgx2hLwR8-Ec_B0btTmk0yQ'

// Store name patterns to match in video titles
const STORE_PATTERNS: Record<string, string[]> = {
  'costco': ['costco', 'costco canada', 'costco haul'],
  'walmart': ['walmart', 'walmart canada'],
  'canadian-tire': ['canadian tire', 'can tire'],
  'no-frills': ['no frills', 'nofrills'],
  'loblaws': ['loblaws', 'loblaw'],
  'shoppers': ['shoppers', 'shoppers drug mart', 'sdm'],
  'real-canadian-superstore': ['superstore', 'real canadian superstore', 'rcss'],
  'dollarama': ['dollarama', 'dollar store'],
  'amazon': ['amazon', 'amazon canada', 'amazon haul'],
  'best-buy': ['best buy', 'bestbuy'],
  'home-depot': ['home depot', 'homedepot'],
  'ikea': ['ikea'],
  'winners': ['winners', 'winners haul'],
  'metro': ['metro'],
  'sobeys': ['sobeys'],
  'food-basics': ['food basics'],
  'freshco': ['freshco'],
  'giant-tiger': ['giant tiger'],
  'london-drugs': ['london drugs'],
}

/**
 * Match video title to a store slug
 */
export function matchStoreFromTitle(title: string): string | null {
  const lowerTitle = title.toLowerCase()

  for (const [storeSlug, patterns] of Object.entries(STORE_PATTERNS)) {
    for (const pattern of patterns) {
      if (lowerTitle.includes(pattern)) {
        return storeSlug
      }
    }
  }

  return null
}

/**
 * Fetch latest videos from YouTube RSS feed
 */
export async function fetchYouTubeVideos(limit: number = 10): Promise<YouTubeVideo[]> {
  if (CHANNEL_ID === 'YOUR_CHANNEL_ID_HERE') {
    console.warn('YouTube Channel ID not configured')
    return []
  }

  try {
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`

    const response = await fetch(feedUrl, {
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!response.ok) {
      console.error('Failed to fetch YouTube feed:', response.status)
      return []
    }

    const xml = await response.text()
    const videos = parseYouTubeFeed(xml)

    return videos.slice(0, limit)
  } catch (error) {
    console.error('Error fetching YouTube videos:', error)
    return []
  }
}

/**
 * Parse YouTube RSS XML feed
 */
function parseYouTubeFeed(xml: string): YouTubeVideo[] {
  const videos: YouTubeVideo[] = []

  // Simple regex parsing for RSS feed (works without xml parser)
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g
  const entries = xml.match(entryRegex) || []

  for (const entry of entries) {
    const videoId = extractTag(entry, 'yt:videoId')
    const title = extractTag(entry, 'title')
    const published = extractTag(entry, 'published')
    const description = extractTag(entry, 'media:description') || ''

    // Get thumbnail from media:thumbnail or construct from video ID
    const thumbnailMatch = entry.match(/url="([^"]*maxresdefault[^"]*)"/) ||
                          entry.match(/url="([^"]*hqdefault[^"]*)"/)
    const thumbnail = thumbnailMatch
      ? thumbnailMatch[1]
      : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`

    if (videoId && title) {
      videos.push({
        id: videoId,
        title: decodeHtmlEntities(title),
        description: decodeHtmlEntities(description),
        publishedAt: published,
        thumbnail,
        storeSlug: matchStoreFromTitle(title)
      })
    }
  }

  return videos
}

/**
 * Extract content from XML tag
 */
function extractTag(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`)
  const match = xml.match(regex)
  return match ? match[1].trim() : ''
}

/**
 * Decode HTML entities
 */
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
}

/**
 * Get videos for a specific store
 */
export async function getVideosForStore(storeSlug: string, limit: number = 3): Promise<YouTubeVideo[]> {
  const allVideos = await fetchYouTubeVideos(50) // Fetch more to filter
  return allVideos
    .filter(v => v.storeSlug === storeSlug)
    .slice(0, limit)
}

/**
 * Get latest videos (for homepage)
 */
export async function getLatestVideos(limit: number = 6): Promise<YouTubeVideo[]> {
  return fetchYouTubeVideos(limit)
}
