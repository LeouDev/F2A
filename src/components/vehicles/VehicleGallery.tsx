import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import type { ImageAsset } from '../../data/images'
import { cn } from '../../lib/cn'
import { Dialog } from '../ui/Dialog'
import { Img } from '../ui/Img'

const indexFromScroll = (el: HTMLElement) => Math.round(el.scrollLeft / Math.max(el.clientWidth, 1))

function ArrowButton({ direction, onClick, className }: { direction: 'prev' | 'next'; onClick: () => void; className?: string }) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Previous image' : 'Next image'}
      className={cn('flex size-12 items-center justify-center border border-white/20 bg-black/50 text-white backdrop-blur transition-colors hover:border-white hover:bg-white hover:text-ink', className)}
    >
      <Icon className="size-5" aria-hidden />
    </button>
  )
}

/** Desktop: stage + thumbnails. Mobile: native swipe (scroll-snap). Both open a fullscreen viewer. */
export function VehicleGallery({ images, title }: { images: ImageAsset[]; title: string }) {
  const [index, setIndex] = useState(0)
  const [viewerOpen, setViewerOpen] = useState(false)
  const count = images.length
  const go = (i: number) => setIndex((i + count) % count)

  return (
    <div>
      {/* Desktop */}
      <div className="hidden md:block">
        <div className="group relative aspect-[16/10] overflow-hidden bg-steel">
          <AnimatePresence initial={false}>
            <m.div key={index} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <Img image={images[index]} priority={index === 0} sizes="(min-width: 1024px) 60vw, 100vw" className="size-full object-cover" />
            </m.div>
          </AnimatePresence>
          <button type="button" onClick={() => setViewerOpen(true)} className="absolute inset-0 cursor-zoom-in" aria-label="Open fullscreen gallery" />
          {count > 1 && (
            <div className="pointer-events-none absolute inset-x-5 top-1/2 flex -translate-y-1/2 justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
              <ArrowButton direction="prev" onClick={() => go(index - 1)} className="pointer-events-auto" />
              <ArrowButton direction="next" onClick={() => go(index + 1)} className="pointer-events-auto" />
            </div>
          )}
          <div className="pointer-events-none absolute inset-x-5 bottom-5 flex items-center justify-between">
            <span className="eyebrow bg-black/60 px-3 py-2 text-white/85 backdrop-blur">
              {index + 1} / {count}
            </span>
            <span className="eyebrow flex items-center gap-2 bg-black/60 px-3 py-2 text-white/85 backdrop-blur">
              <Expand className="size-3.5" aria-hidden /> Fullscreen
            </span>
          </div>
        </div>
        {count > 1 && (
          <ul className="mt-3 grid grid-cols-5 gap-3">
            {images.map((image, i) => (
              <li key={`${image.src}-${i}`}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show image ${i + 1} of ${count}`}
                  aria-current={i === index}
                  className={cn('relative block aspect-[4/3] w-full overflow-hidden bg-steel ring-offset-2 ring-offset-ink transition', i === index ? 'ring-2 ring-f2a' : 'opacity-55 hover:opacity-100')}
                >
                  <Img image={image} alt="" sizes="12vw" maxWidth={480} className="size-full object-cover" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Mobile */}
      <div className="relative -mx-5 sm:-mx-8 md:hidden">
        <div
          onScroll={(e) => setIndex(indexFromScroll(e.currentTarget))}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
          aria-label={`${title} photos — swipe to browse`}
        >
          {images.map((image, i) => (
            <button
              key={`${image.src}-${i}`}
              type="button"
              onClick={() => {
                setIndex(i)
                setViewerOpen(true)
              }}
              aria-label={`Open image ${i + 1} of ${count} fullscreen`}
              className="relative aspect-[4/3] w-full shrink-0 snap-center bg-steel"
            >
              <Img image={image} priority={i === 0} sizes="100vw" maxWidth={1440} className="size-full object-cover" />
            </button>
          ))}
        </div>
        <span className="eyebrow pointer-events-none absolute bottom-4 right-5 bg-black/60 px-3 py-2 text-white/85 backdrop-blur">
          {index + 1} / {count}
        </span>
        {count > 1 && (
          <div aria-hidden className="pointer-events-none absolute bottom-5 left-5 flex gap-1.5">
            {images.map((image, i) => (
              <span key={`${image.src}-${i}`} className={cn('h-1 rounded-full transition-all duration-300', i === index ? 'w-6 bg-f2a' : 'w-1.5 bg-white/50')} />
            ))}
          </div>
        )}
      </div>

      <FullscreenViewer open={viewerOpen} onClose={() => setViewerOpen(false)} images={images} start={index} title={title} onIndexChange={setIndex} />
    </div>
  )
}

type ViewerProps = {
  open: boolean
  onClose: () => void
  images: ImageAsset[]
  start: number
  title: string
  onIndexChange: (i: number) => void
}

function FullscreenViewer({ open, onClose, images, start, title, onIndexChange }: ViewerProps) {
  const track = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(start)

  useEffect(() => {
    if (!open) return
    setCurrent(start)
    requestAnimationFrame(() => {
      const el = track.current
      el?.scrollTo({ left: start * el.clientWidth, behavior: 'instant' })
    })
  }, [open, start])

  const step = (direction: number) => {
    const el = track.current
    el?.scrollBy({ left: direction * el.clientWidth, behavior: 'smooth' })
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') step(1)
    if (e.key === 'ArrowLeft') step(-1)
  }

  return (
    <Dialog open={open} onClose={onClose} label={`${title} — photos`} variant="fullscreen" className="bg-black">
      <div className="flex h-full flex-col" onKeyDown={onKeyDown}>
        <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <p className="eyebrow truncate text-white/75">
            {title} <span className="text-white/40">— {current + 1} / {images.length}</span>
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="flex size-11 shrink-0 items-center justify-center border border-white/20 transition-colors hover:border-white"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>
        <div className="relative min-h-0 flex-1">
          <div
            ref={track}
            tabIndex={0}
            aria-label="Photos. Use the arrow keys or swipe to browse."
            onScroll={(e) => {
              const i = indexFromScroll(e.currentTarget)
              if (i !== current) {
                setCurrent(i)
                onIndexChange(i)
              }
            }}
            className="no-scrollbar flex h-full snap-x snap-mandatory overflow-x-auto overscroll-contain outline-none"
          >
            {images.map((image, i) => (
              <figure key={`${image.src}-${i}`} className="flex h-full w-full shrink-0 snap-center items-center justify-center px-2 pb-6 sm:px-20">
                <Img image={image} sizes="100vw" className="max-h-full w-auto max-w-full object-contain" />
              </figure>
            ))}
          </div>
          {images.length > 1 && (
            <>
              <ArrowButton direction="prev" onClick={() => step(-1)} className="absolute left-5 top-1/2 hidden -translate-y-1/2 md:flex" />
              <ArrowButton direction="next" onClick={() => step(1)} className="absolute right-5 top-1/2 hidden -translate-y-1/2 md:flex" />
            </>
          )}
        </div>
      </div>
    </Dialog>
  )
}
