'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import { YouTubeVideo } from '@/lib/youtube'

interface YouTubeEmbedProps {
  video: YouTubeVideo
  autoplay?: boolean
}

/**
 * Lazy-loaded YouTube embed - shows thumbnail until clicked
 * Better for performance and page load
 */
export function YouTubeEmbed({ video, autoplay = false }: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay)

  if (isPlaying) {
    return (
      <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    )
  }

  return (
    <button
      onClick={() => setIsPlaying(true)}
      className="relative aspect-video rounded-lg overflow-hidden bg-black group cursor-pointer w-full"
    >
      {/* Thumbnail */}
      <img
        src={video.thumbnail}
        alt={video.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-maple-red flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <Play size={32} className="text-white ml-1" fill="white" />
        </div>
      </div>

      {/* Video title */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-white text-sm font-medium line-clamp-2">
          {video.title}
        </p>
      </div>
    </button>
  )
}

interface VideoGridProps {
  videos: YouTubeVideo[]
  title?: string
}

/**
 * Grid of YouTube video embeds
 */
export function VideoGrid({ videos, title }: VideoGridProps) {
  if (videos.length === 0) return null

  return (
    <section className="py-8">
      {title && (
        <h2 className="text-2xl font-bold text-charcoal mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <YouTubeEmbed key={video.id} video={video} />
        ))}
      </div>
    </section>
  )
}

interface StoreVideosProps {
  storeSlug: string
  storeName: string
  videos: YouTubeVideo[]
}

/**
 * Store-specific video section for store pages
 */
export function StoreVideos({ storeSlug, storeName, videos }: StoreVideosProps) {
  if (videos.length === 0) return null

  return (
    <section className="py-8 border-t border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-charcoal">
          {storeName} Store Tours
        </h2>
        <a
          href="https://www.youtube.com/@ShopCanada-cc"
          target="_blank"
          rel="noopener noreferrer"
          className="text-maple-red hover:underline text-sm font-medium"
        >
          See all videos →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.slice(0, 3).map((video) => (
          <YouTubeEmbed key={video.id} video={video} />
        ))}
      </div>
    </section>
  )
}
