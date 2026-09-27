import { MessageCircle } from 'lucide-react'
import { PageHero } from '../components/blocks/PageHero'
import { ProcessSteps } from '../components/blocks/ProcessSteps'
import { SellForm } from '../components/forms/SellForm'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { Eyebrow } from '../components/ui/Section'
import { images } from '../data/images'
import { brand, site } from '../data/site'
import { Seo } from '../lib/seo'

const process = [
  { title: 'Tell us about your car', text: 'Make, model, year, mileage and condition — the basics F2A needs to look at your car.' },
  { title: 'Add photos', text: 'Front, rear, side, interior, dashboard and engine. Clear photos help F2A review your car.' },
  { title: 'Get your quote', text: 'F2A contacts you through your preferred channel to talk about your car.' },
]

const scrollToQuote = () => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

export default function SellYourCar() {
  return (
    <>
      <Seo
        title="Sell Your Car | F2A Cars"
        description="Sell your car to F2A Cars in Quezon City. We buy cars 24/7 — tell us about your car, add photos and get a quote."
      />
      <PageHero
        eyebrow={brand.weBuy}
        title={['Sell your car.', <span className="text-f2a">Turn it into cash.</span>]}
        subtitle="Tell us about your car, add a few photos, and F2A will get in touch about a quote."
        image={images.heroes.sell}
      >
        <div className="flex flex-wrap gap-3">
          <Button size="lg" arrow onClick={scrollToQuote}>
            Get a quote
          </Button>
          <Button href={site.messenger} size="lg" variant="outline" icon={<MessageCircle className="size-4" aria-hidden />}>
            DM us instead
          </Button>
        </div>
      </PageHero>

      <section aria-labelledby="sell-process" className="border-b border-white/10 py-20 lg:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow index="01">How it works</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="sell-process" className="headline mt-6 text-[clamp(3rem,7vw,5.5rem)]">
                Three simple
                <br />
                <span className="text-f2a">steps.</span>
              </h2>
            </Reveal>
          </div>
          <ProcessSteps steps={process} className="sm:grid-cols-3 lg:col-span-8" />
        </div>
      </section>

      <section id="quote" aria-labelledby="quote-title" className="scroll-mt-20 py-20 lg:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <Eyebrow index="02">Get a quote</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 id="quote-title" className="headline mt-6 text-[clamp(3rem,7vw,5.5rem)]">
                  Tell us about
                  <br />
                  your <span className="text-f2a">car.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">{brand.weBuy}. Share your car’s details below — or message F2A directly.</p>
                <div className="mt-8 border border-white/10 bg-carbon p-6">
                  <p className="eyebrow text-f2a-hot">Prefer to chat?</p>
                  <p className="headline mt-3 text-3xl">Wanna sell your car? DM us.</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Button href={site.messenger} size="sm" icon={<MessageCircle className="size-4" aria-hidden />}>
                      Messenger
                    </Button>
                    <Button href={site.phone.href} size="sm" variant="outline">
                      {site.phone.display}
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-8">
            <SellForm />
          </div>
        </div>
      </section>
    </>
  )
}
