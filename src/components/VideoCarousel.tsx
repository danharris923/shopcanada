'use client'

import { useState, useEffect, useRef } from 'react'
import { YouTubeVideo } from '@/lib/youtube'

interface VideoCarouselProps {
  videos: YouTubeVideo[]
}

/**
 * Auto-rotating YouTube video carousel
 * Autoplays each video, moves to next when it ends
 */
export function VideoCarousel({ videos }: VideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const playerRef = useRef<HTMLIFrameElement>(null)

  // Listen for video end via YouTube API
  useEffect(() => {
    if (videos.length <= 1) return

    // Use postMessage API to detect video end
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.youtube.com') return

      try {
        const data = JSON.parse(event.data)
        // YouTube sends state 0 when video ends
        if (data.event === 'onStateChange' && data.info === 0) {
          setCurrentIndex((prev) => (prev + 1) % videos.length)
        }
      } catch {
        // Not a JSON message, ignore
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [videos.length])

  if (videos.length === 0) return null

  const video = videos[currentIndex]

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
      {/* YouTube Embed - Autoplay, muted */}
      <iframe
        ref={playerRef}
        key={video.id}
        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&enablejsapi=1`}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />

      {/* Video info overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
        <p className="text-white font-medium line-clamp-1">
          {video.title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-white/70 text-sm">Store Tour</span>
          {videos.length > 1 && (
            <>
              <span className="text-white/50 text-xs">•</span>
              <span className="text-white/50 text-xs">{currentIndex + 1} / {videos.length}</span>
            </>
          )}
        </div>
      </div>

      {/* Progress dots - only show if multiple videos */}
      {videos.length > 1 && (
        <div className="absolute top-3 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
          {videos.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex ? 'bg-maple-red w-6' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
