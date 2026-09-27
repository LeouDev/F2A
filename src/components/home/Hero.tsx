import { Link } from 'react-router'
import { m } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { images } from '../../data/images'
import { HERO_SIZES } from '../../lib/image'
import { brand } from '../../data/site'
import { Button } from '../ui/Button'
import { Img } from '../ui/Img'
import { ease, RevealLines } from '../ui/Reveal'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
})

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pb-36 pt-32 sm:pb-40 lg:pb-48">
      {/* Background: slow settle. Phones: image sits above the copy so the car stays visible. */}
      <m.div className="absolute inset-x-0 top-0 -z-20 h-[64%] lg:inset-0 lg:h-full" initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 3, ease }}>
        <Img image={images.heroes.home} priority sizes={HERO_SIZES} className="size-full object-cover" />
      </m.div>
      <div aria-hidden className="absolute inset-x-0 top-[34%] -z-10 h-[31%] bg-gradient-to-b from-transparent to-ink lg:hidden" />
      <div aria-hidden className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-ink via-ink/70 to-ink/5 lg:block" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/25 to-ink/50 max-lg:via-transparent max-lg:to-ink/30" />
      <div aria-hidden className="absolute bottom-0 left-0 -z-10 h-px w-2/3 bg-gradient-to-r from-f2a to-transparent" />

      <div className="container-site">
        <m.p {...fadeUp(0.1)} className="eyebrow flex items-center gap-3 text-white/70">
          <span aria-hidden className="h-px w-8 bg-f2a" />
          F2A Cars · Timog, Quezon City
        </m.p>

        <h1 id="hero-title" className="headline mt-6 text-[clamp(4.1rem,13.5vw,11.75rem)]">
          <RevealLines
            onMount
            delay={0.2}
            lines={[
              'Find your',
              <>
                Next ride<span className="text-f2a">.</span>
              </>,
            ]}
          />
        </h1>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <m.p {...fadeUp(0.55)} className="max-w-md text-lg leading-relaxed text-white/80 sm:text-xl">
              Quality pre-owned cars for clients who expect more.
            </m.p>
            <m.div {...fadeUp(0.7)} className="mt-8 flex flex-wrap gap-3">
              <Button to="/cars" size="lg" arrow>
                Explore cars
              </Button>
              <Button to="/sell-your-car" size="lg" variant="outline">
                Sell your car
              </Button>
            </m.div>
          </div>
          <m.p {...fadeUp(0.85)} className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2 text-white/70">
            {['Buy', 'Sell', 'Trade', 'Consign'].map((word, i) => (
              <span key={word} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden className="size-1 rounded-full bg-f2a" />}
                {word}
              </span>
            ))}
          </m.p>
        </div>
      </div>

      {/* WE BUY CARS 24/7 — from the F2A Facebook intro */}
      <m.div {...fadeUp(1)} className="absolute right-12 top-32 hidden xl:block">
        <Link to="/sell-your-car" className="group block border border-white/15 bg-black/40 p-5 backdrop-blur-md transition-colors hover:border-f2a">
          <span className="eyebrow block text-white/60">{brand.weBuy.replace(' 24/7', '')}</span>
          <span className="headline mt-1 block text-6xl text-f2a">24/7</span>
          <span className="mt-3 flex items-center gap-2 text-sm text-white/80">
            {brand.weBuyCta}
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </span>
        </Link>
      </m.div>

      {/* Scroll cue */}
      <m.div {...fadeUp(1.1)} aria-hidden className="absolute bottom-40 right-12 hidden flex-col items-center gap-4 lg:flex">
        <span className="eyebrow text-[10px] text-white/50 [writing-mode:vertical-rl]">Scroll</span>
        <span className="relative h-16 w-px overflow-hidden bg-white/15">
          <span className="absolute inset-0 animate-cue bg-f2a" />
        </span>
      </m.div>
    </section>
  )
}
