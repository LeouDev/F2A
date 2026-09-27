import { Clock } from 'lucide-react'
import { featuredVlog as vlog } from '../../data/vlogs'
import { site } from '../../data/site'
import { formatDate } from '../../lib/format'
import { VideoPlayer } from '../media/VideoPlayer'
import { Button } from '../ui/Button'
import { Img } from '../ui/Img'
import { Reveal } from '../ui/Reveal'
import { Eyebrow } from '../ui/Section'

/** Featured F2A Vlogs episode — the media side of the brand. */
export function VlogSpotlight({ index = '04' }: { index?: string }) {
  return (
    <section aria-labelledby="vlog-title" className="relative isolate overflow-hidden border-y border-white/10 bg-carbon py-20 sm:py-24 lg:py-32">
      <div aria-hidden className="absolute inset-0 -z-10 opacity-25">
        <Img image={vlog.thumbnail} alt="" sizes="50vw" maxWidth={768} className="size-full scale-125 object-cover blur-3xl" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-carbon via-carbon/70 to-carbon" />

      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <VideoPlayer vlog={vlog} className="aspect-square w-full border border-white/10" />
        </Reveal>

        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow index={index}>Watch F2A</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="headline mt-6 text-3xl text-white/60">F2A Vlogs</p>
            <h2 id="vlog-title" className="headline mt-2 text-[clamp(5rem,14vw,11rem)] leading-[0.8]">
              <span className="text-outline">EP.</span> {vlog.episode}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/80">{vlog.description}</p>
            <p className="eyebrow mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-white/50">
              {vlog.date && <time dateTime={vlog.date}>{formatDate(vlog.date)}</time>}
              {vlog.duration && (
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5" aria-hidden /> {vlog.duration}
                </span>
              )}
              <span>Cars · Stories · People · Deals</span>
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
            <Button href={vlog.videoUrl ?? site.facebook} size="lg" arrow>
              Watch episode
            </Button>
            <Button to="/vlogs" size="lg" variant="outline">
              All episodes
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
