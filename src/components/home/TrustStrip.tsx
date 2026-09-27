import { brand } from '../../data/site'
import { Reveal } from '../ui/Reveal'

const pillars = ['Honesty', 'Integrity', 'Transparency', 'After-sales']

/** Brand pillars + the "We communicate aftersales" statement. */
export function TrustStrip() {
  return (
    <section aria-labelledby="trust-title" className="relative pb-20 pt-20 sm:pt-24 lg:pb-32">
      <div className="container-site">
        <ul className="grid gap-px border-y border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <li key={pillar} className="flex items-baseline gap-5 bg-ink py-5 sm:block sm:px-6 sm:py-7 sm:odd:pl-0 lg:px-8 lg:odd:pl-8 lg:first:pl-0">
              <span className="eyebrow w-6 text-f2a-hot">{String(i + 1).padStart(2, '0')}</span>
              <p className="headline text-[2.4rem] sm:mt-3 sm:text-[clamp(2rem,3.6vw,3rem)]">{pillar}</p>
            </li>
          ))}
        </ul>

        <div className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-9">
            <p className="eyebrow text-white/50">In F2A’s words</p>
            <h2 id="trust-title" className="headline mt-6 text-[clamp(3.4rem,10vw,9.5rem)]">
              <span className="text-f2a">“</span>
              <span className="metallic">We communicate</span>
              <br />
              aftersales<span className="text-f2a">.”</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-3 lg:pb-3">
            <p className="text-base leading-relaxed text-muted">
              {brand.satisfaction} {brand.mission}
            </p>
            <p className="eyebrow mt-5 text-white/40">— {brand.motto}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
