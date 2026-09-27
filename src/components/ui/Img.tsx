import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import type { ImageAsset } from '../../data/images'
import { cn } from '../../lib/cn'
import { imageSources } from '../../lib/image'

type ImgProps = {
  image: ImageAsset
  /** How wide the image renders, e.g. "(min-width: 1024px) 33vw, 100vw" */
  sizes?: string
  /** Above the fold: eager + high fetch priority, no fade-in */
  priority?: boolean
  maxWidth?: number
  className?: string
  /** Override alt text ('' for decorative images) */
  alt?: string
}

export function Img({ image, sizes = '100vw', priority, maxWidth = 2560, className, alt }: ImgProps) {
  const [state, setState] = useState<'loading' | 'loaded' | 'error'>(priority ? 'loaded' : 'loading')
  const [src, setSrc] = useState(image.src)
  if (src !== image.src) {
    setSrc(image.src)
    setState(priority ? 'loaded' : 'loading')
  }

  if (state === 'error') {
    return (
      <div role="img" aria-label={alt || image.alt} className={cn('flex flex-col items-center justify-center gap-3 bg-steel text-muted', className)}>
        <ImageOff className="size-6" aria-hidden />
        <span className="eyebrow text-[10px]">Image unavailable</span>
      </div>
    )
  }

  return (
    <img
      {...imageSources(image.src, maxWidth)}
      sizes={sizes}
      alt={alt ?? image.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      ref={(el) => {
        if (el?.complete && el.naturalWidth > 0 && state === 'loading') setState('loaded')
      }}
      onLoad={() => setState('loaded')}
      onError={() => setState('error')}
      style={image.position ? { objectPosition: image.position } : undefined}
      className={cn('transition-opacity duration-700', state === 'loaded' ? 'opacity-100' : 'opacity-0', className)}
    />
  )
}
