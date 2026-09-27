import { ClosingCTA } from '../components/blocks/ClosingCTA'
import { PageHero } from '../components/blocks/PageHero'
import { SocialProofStats } from '../components/blocks/SocialProofStats'
import { TestimonialCard } from '../components/media/Cards'
import { Button } from '../components/ui/Button'
import { Img } from '../components/ui/Img'
import { Reveal } from '../components/ui/Reveal'
import { Eyebrow, SectionHeader } from '../components/ui/Section'
import { images } from '../data/images'
import { brand, values } from '../data/site'
import { socialProof } from '../data/socialProof'
import { testimonials } from '../data/testimonials'
import { featuredVlog } from '../data/vlogs'
import { Seo } from '../lib/seo'

const focus = [
  { title: 'Quality pre-owned vehicles', text: brand.mission },
  { title: 'Customer satisfaction', text: brand.satisfaction },
  { title: 'Transparency', text: 'Clear, straightforward information so you understand what you are buying.' },
  { title: 'After-sales communication', text: '“We communicate aftersales.”' },
]

export default function About() {
  return (
    <>
      <Seo
        title="About F2A Cars | Honesty, Integrity, Transparency"
        description="F2A Cars finds and provides quality pre-owned cars for clients — built on honesty, integrity and transparency, with excellent after-sales service."
      />
      <PageHero
        eyebrow="About F2A"
        title={['More than', <>a car dealer<span className="text-f2a">.</span></>]}
        subtitle="F2A CARS finds and provides quality pre-owned cars — and keeps the conversation going after the sale."
        image={images.heroes.about}
      />

      {/* Editorial statement */}
      <section aria-labelledby="about-statement" className="py-20 lg:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow index="01">What drives F2A</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="about-statement" className="headline mt-6 text-[clamp(3.2rem,8vw,6.75rem)]">
                {brand.pillars.map((pillar, i) => (
                  <span key={pillar} className="block">
                    {i > 0 && <span className="text-f2a">+</span>}
                    {pillar}
                  </span>
                ))}
              </h2>
            </Reveal>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-white/75 lg:col-span-5 lg:col-start-8 lg:pt-16">
            <Reveal>
              <p className="text-2xl leading-snug text-white">F2A CARS is a car dealership in Timog, Quezon City, built around three words: honesty, integrity and transparency.</p>
            </Reveal>
            <Reveal delay={0.05}>
              <p>
                We find and provide quality pre-owned cars for our clients, and we measure ourselves by client satisfaction — with excellent after-sales
                service. As we like to put it: <span className="text-white">we communicate aftersales.</span>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                F2A buys, sells, trades and consigns cars — and {brand.weBuy.toLowerCase()}.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="container-site mt-20">
          <ul className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {focus.map((item, i) => (
              <li key={item.title} className="bg-ink">
                <Reveal delay={i * 0.06} className="flex h-full flex-col p-6 sm:p-8">
                  <span className="eyebrow text-f2a-hot">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="headline mt-6 text-3xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What we stand for */}
      <section aria-labelledby="values-title" className="border-y border-white/10 bg-carbon py-20 lg:py-32">
        <div className="container-site">
          <SectionHeader
            index="02"
            eyebrow="Our values"
            id="values-title"
            title={
              <>
                What we
                <br />
                stand <span className="text-f2a">for.</span>
              </>
            }
          />
          <ol className="mt-14 border-t border-white/10">
            {values.map((value, i) => (
              <li key={value.title}>
                <Reveal delay={i * 0.05} className="grid gap-4 border-b border-white/10 py-10 md:grid-cols-12 md:items-baseline">
                  <span className="eyebrow text-f2a-hot md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="headline text-[clamp(3rem,7vw,5.5rem)] md:col-span-6">{value.title}</h3>
                  <p className="text-lg leading-relaxed text-white/75 md:col-span-5">{value.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Media brand */}
      <section aria-labelledby="media-title" className="py-20 lg:py-32">
        <div className="container-site grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="relative lg:col-span-5">
            <Img image={featuredVlog.thumbnail} sizes="(min-width: 1024px) 40vw, 100vw" maxWidth={1080} className="aspect-square w-full border border-white/10 object-cover" />
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <Eyebrow index="03">Cars. Stories. People. Deals.</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="media-title" className="headline mt-6 text-[clamp(3.2rem,8vw,6.25rem)]">
                A dealership
                <br />
                <span className="text-f2a">you can watch.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
                F2A shares its cars, customer releases and F2A Vlogs with {socialProof.followers} followers on Facebook — so you can see how F2A works
                before you ever visit.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-3">
              <Button to="/vlogs" size="lg" arrow>
                Watch F2A Vlogs
              </Button>
              <Button to="/cars" size="lg" variant="outline">
                Browse cars
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section aria-labelledby="proof-title" className="border-t border-white/10 py-20 lg:py-32">
        <div className="container-site">
          <SectionHeader
            index="04"
            eyebrow="Social proof"
            id="proof-title"
            title={
              <>
                Real people.
                <br />
                <span className="text-f2a">Real deals.</span>
              </>
            }
          />
          <SocialProofStats className="mt-14" />
          <div className="mt-16 grid gap-3 md:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <Reveal key={testimonial.id} delay={i * 0.06}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA />
    </>
  )
}
