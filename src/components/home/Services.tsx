import { Link } from 'react-router'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { images } from '../../data/images'
import { brand, services, site } from '../../data/site'
import { Button } from '../ui/Button'
import { Img } from '../ui/Img'
import { Marquee } from '../ui/Marquee'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/Section'

export function ServicesMarquee() {
  return (
    <div className="border-y border-white/10 bg-carbon py-6 sm:py-8">
      <p className="sr-only">Buy, sell, trade, consign.</p>
      <Marquee duration={36} className="headline text-[clamp(3.5rem,9vw,8rem)] leading-none">
        {['Buy', 'Sell', 'Trade', 'Consign', 'Buy', 'Sell', 'Trade', 'Consign'].map((word, i) => (
          <span key={i} aria-hidden className="flex items-center">
            <span className={i % 2 ? 'text-outline' : 'text-white'}>{word}</span>
            <span className="mx-[3vw] inline-block size-3 rotate-45 bg-f2a sm:size-4" />
          </span>
        ))}
      </Marquee>
    </div>
  )
}

export function Services() {
  return (
    <section aria-labelledby="services-title" className="relative py-20 sm:py-24 lg:py-32">
      <div className="container-site">
        <SectionHeader
          index="02"
          eyebrow="Sell your car"
          id="services-title"
          title={
            <>
              Buy. Sell.
              <br />
              Trade. <span className="text-f2a">Consign.</span>
            </>
          }
          subtitle={`${brand.services} — and ${brand.weBuy.toLowerCase()}. Pick the path that fits your next move.`}
        />

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.key} delay={i * 0.07}>
              <Link
                to={service.to}
                className="group relative flex h-full min-h-[24rem] flex-col justify-between overflow-hidden border border-white/10 bg-carbon p-6 transition-colors duration-500 hover:border-white/30 lg:min-h-[32rem] lg:p-7"
              >
                <Img
                  image={images.services[service.key]}
                  alt=""
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  maxWidth={1080}
                  className="absolute inset-0 size-full object-cover opacity-30 grayscale transition duration-[1.4s] ease-out-expo group-hover:scale-105 group-hover:opacity-55 group-hover:grayscale-0"
                />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
                <span className="relative flex items-center justify-between">
                  <span className="eyebrow text-f2a-hot">{String(i + 1).padStart(2, '0')}</span>
                  <ArrowUpRight className="size-5 text-white/50 transition-all duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" aria-hidden />
                </span>
                <span className="relative">
                  <span className="headline block text-[clamp(3.5rem,6vw,5.25rem)]">{service.title}</span>
                  <span className="mt-4 block max-w-xs text-base leading-relaxed text-white/70">{service.text}</span>
                  <span className="eyebrow mt-7 inline-flex items-center gap-2 text-white">
                    {service.cta}
                    <span aria-hidden className="h-px w-6 bg-f2a transition-all duration-500 ease-out-expo group-hover:w-12" />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* WE BUY CARS 24/7 band */}
        <Reveal className="mt-3">
          <div className="relative flex flex-col gap-8 overflow-hidden border border-f2a/40 bg-gradient-to-r from-f2a/20 via-f2a/5 to-transparent p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="eyebrow text-f2a-hot">Selling?</p>
              <p className="headline mt-3 text-[clamp(2.8rem,7vw,5.5rem)]">
                We buy cars <span className="text-f2a">24/7</span>
              </p>
              <p className="mt-3 text-white/70">{brand.weBuyCta}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button to="/sell-your-car" size="lg" arrow>
                Get a quote
              </Button>
              <Button href={site.messenger} size="lg" variant="outline" icon={<MessageCircle className="size-4" aria-hidden />}>
                DM F2A
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
