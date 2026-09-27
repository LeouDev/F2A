import type { ReactNode } from 'react'
import { MessageCircle, Phone } from 'lucide-react'
import { images } from '../../data/images'
import { site } from '../../data/site'
import { useInquiry } from '../inquiry/inquiryContext'
import { Button } from '../ui/Button'
import { Img } from '../ui/Img'
import { Reveal, RevealLines } from '../ui/Reveal'

type ClosingCTAProps = { title?: ReactNode[]; text?: ReactNode }

export function ClosingCTA({
  title = ['Your next car', <>starts here<span className="text-f2a">.</span></>],
  text = 'Find F2A Cars in Timog, Quezon City — or reach us by phone, email or Messenger.',
}: ClosingCTAProps) {
  const { openInquiry } = useInquiry()

  return (
    <section aria-label="Contact F2A" className="relative isolate overflow-hidden py-28 lg:py-40">
      <Img image={images.heroes.cta} alt="" sizes="100vw" className="absolute inset-0 -z-20 size-full object-cover opacity-50" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink" />
      <div aria-hidden className="absolute -bottom-48 left-1/2 -z-10 h-96 w-[70rem] max-w-[160vw] -translate-x-1/2 rounded-full bg-f2a/25 blur-[140px]" />
      <div className="container-site">
        <h2 className="headline text-[clamp(3.4rem,11vw,10rem)]">
          <RevealLines lines={title} />
        </h2>
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-5">
            <p className="max-w-md text-lg leading-relaxed text-muted">{text}</p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap gap-3 lg:col-span-7 lg:justify-end">
            <Button size="lg" arrow onClick={() => openInquiry()}>
              Inquire now
            </Button>
            <Button href={site.phone.href} variant="outline" size="lg" icon={<Phone className="size-4" aria-hidden />}>
              Call F2A
            </Button>
            <Button href={site.messenger} variant="outline" size="lg" icon={<MessageCircle className="size-4" aria-hidden />}>
              Message F2A
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
