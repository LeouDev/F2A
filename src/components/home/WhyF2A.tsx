import { brand, values } from '../../data/site'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { Eyebrow } from '../ui/Section'

export function WhyF2A() {
  return (
    <section aria-labelledby="why-title" className="relative border-t border-white/10 py-20 sm:py-24 lg:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-12">
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <Reveal>
            <Eyebrow index="03">Experience F2A</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="why-title" className="headline mt-6 text-[clamp(3.4rem,9vw,7rem)]">
              Why
              <br />
              F2A<span className="text-f2a">.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="headline mt-10 text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[0.95] text-white/30">
              {brand.pillars.map((pillar, i) => (
                <span key={pillar} className="block">
                  {i > 0 && <span className="text-f2a">+ </span>}
                  {pillar}
                </span>
              ))}
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-2xl font-medium leading-snug text-white/90 sm:text-[2rem] sm:leading-tight">
              We find &amp; provide quality pre-owned cars for our clients — with client satisfaction and{' '}
              <span className="text-f2a-hot">excellent after-sales service</span>.
            </p>
          </Reveal>
          <ol className="mt-12 border-t border-white/10">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.06}>
                <li className="grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-2 border-b border-white/10 py-7 sm:grid-cols-[3.5rem_15rem_1fr] sm:items-baseline">
                  <span className="eyebrow text-f2a-hot">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="headline text-4xl">{value.title}</h3>
                  <p className="col-start-2 text-base leading-relaxed text-muted sm:col-start-auto">{value.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-10">
            <Button to="/about" variant="outline" arrow>
              More about F2A
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
