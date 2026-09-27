import { useState } from 'react'
import { Play, VideoOff } from 'lucide-react'
import { site } from '../../data/site'
import type { Vlog } from '../../data/vlogs'
import { cn } from '../../lib/cn'
import { BrandIcon } from '../ui/Icons'
import { Img } from '../ui/Img'

/** YouTube / Facebook URL → privacy-friendly embed URL (null if unsupported). */
export function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\.|^m\./, '')
    if (host === 'youtu.be') return `https://www.youtube-nocookie.com/embed/${u.pathname.slice(1)}?autoplay=1&rel=0`
    if (host === 'youtube.com') {
      const id = u.searchParams.get('v') ?? u.pathname.match(/\/(?:shorts|embed|live)\/([\w-]+)/)?.[1]
      return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0` : null
    }
    if (host === 'facebook.com' || host === 'fb.watch') {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&autoplay=true`
    }
  } catch {
    // invalid URL → treated as unavailable
  }
  return null
}

/**
 * Lite video player: shows the poster until clicked, then loads the embed (no third-party
 * JS on page load). Without a configured video URL it links to the F2A Facebook page.
 */
export function VideoPlayer({ vlog, className, priority }: { vlog: Vlog; className?: string; priority?: boolean }) {
  const [playing, setPlaying] = useState(false)
  const embed = vlog.videoUrl ? toEmbedUrl(vlog.videoUrl) : null
  const unavailable = !!vlog.videoUrl && !embed

  if (playing && embed) {
    return (
      <div className={cn('relative aspect-video bg-black', className)}>
        <iframe
          src={embed}
          title={vlog.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      </div>
    )
  }

  return (
    <div className={cn('group relative overflow-hidden bg-steel', className)}>
      <Img image={vlog.thumbnail} priority={priority} sizes="(min-width: 1024px) 50vw, 100vw" maxWidth={1440} className="size-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.04]" />
      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {unavailable ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/70 p-6 text-center">
          <VideoOff className="size-8 text-f2a-hot" aria-hidden />
          <p className="headline text-3xl">Video unavailable</p>
          <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="eyebrow underline underline-offset-4">
            Watch on Facebook
          </a>
        </div>
      ) : embed ? (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`Play ${vlog.title}`} className="absolute inset-0 flex items-center justify-center">
          <PlayBadge />
        </button>
      ) : (
        <a
          href={site.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Watch ${vlog.title} on Facebook (opens in a new tab)`}
          className="absolute inset-0 flex flex-col items-center justify-center gap-4"
        >
          <PlayBadge />
          <span className="eyebrow flex items-center gap-2 bg-black/60 px-3 py-2 text-white/90 backdrop-blur">
            <BrandIcon name="facebook" className="size-3.5" /> Watch on Facebook
          </span>
        </a>
      )}
    </div>
  )
}

function PlayBadge() {
  return (
    <span className="relative flex size-20 items-center justify-center rounded-full bg-f2a text-white shadow-2xl shadow-f2a/40 transition-transform duration-500 ease-out-expo group-hover:scale-110 sm:size-24">
      <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-f2a/40 [animation-duration:2.4s]" />
      <Play className="relative ml-1 size-8 fill-current" aria-hidden />
    </span>
  )
}
