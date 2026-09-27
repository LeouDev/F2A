import type { CSSProperties, ReactNode } from 'react'
import { cn } from '../../lib/cn'

/** Infinite CSS marquee (stops for reduced-motion users; pauses on hover). */
export function Marquee({ children, duration = 40, className }: { children: ReactNode; duration?: number; className?: string }) {
  return (
    <div className={cn('flex overflow-hidden', className)}>
      <div className="flex w-max shrink-0 animate-marquee hover:[animation-play-state:paused]" style={{ '--marquee-duration': `${duration}s` } as CSSProperties}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  )
}
