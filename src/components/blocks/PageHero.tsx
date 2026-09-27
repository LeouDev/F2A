import type { ReactNode } from 'react'
import { m } from 'framer-motion'
import type { ImageAsset } from '../../data/images'
import { cn } from '../../lib/cn'
import { Img } from '../ui/Img'
import { ease, RevealLines } from '../ui/Reveal'
import { Eyebrow } from '../ui/Section'

type PageHeroProps = {
  eyebrow: string
  /** One entry per line */
  title: ReactNode[]
  subtitle?: ReactNode
  image: ImageAsset
  children?: ReactNode
  /** Shorter hero for utility pages (inventory) */
  compact?: boolean
}

/** Cinematic hero for inner pages: slow image settle, masked headline reveal. */
export function PageHero({ eyebrow, title, subtitle, image, children, compact }: PageHeroProps) {
  return (
    <section
      className={cn(
        'relative isolate flex items-end overflow-hidden pt-36',
        compact ? 'min-h-[54svh] pb-12 lg:min-h-[60svh] lg:pb-16' : 'min-h-[74svh] pb-16 sm:pb-20 lg:min-h-[80svh] lg:pb-24',
      )}
    >
      <m.div className="absolute inset-0 -z-20" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 2.6, ease }}>
        {/* cover-cropped in a ~80svh box: rendered width ≈ max(100vw, 120vh) */}
        <Img image={image} priority sizes="max(100vw, 120vh)" className="size-full object-cover" />
      </m.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/75 to-ink/15" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/15 to-ink/60" />
      <div className="container-site">
        <m.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </m.div>
        <h1 className="headline mt-6 max-w-5xl text-[clamp(3.3rem,10.5vw,9.5rem)]">
          <RevealLines lines={title} onMount delay={0.1} />
        </h1>
        {subtitle && (
          <m.p
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease }}
          >
            {subtitle}
          </m.p>
        )}
        {children && (
          <m.div className="mt-9" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55, ease }}>
            {children}
          </m.div>
        )}
      </div>
    </section>
  )
}
