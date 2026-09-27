import type { ReactNode } from 'react'
import { Reveal } from '../ui/Reveal'
import { Eyebrow } from '../ui/Section'

type LeadSectionProps = {
  id: string
  index?: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  aside?: ReactNode
  children: ReactNode
}

/** Two-column form section: sticky intro on the left, form card on the right. */
export function LeadSection({ id, index, eyebrow, title, intro, aside, children }: LeadSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 py-20 lg:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow index={index}>{eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id={`${id}-title`} className="headline mt-6 text-[clamp(3rem,7vw,5.5rem)]">
                {title}
              </h2>
            </Reveal>
            {intro && (
              <Reveal delay={0.1}>
                <div className="mt-6 max-w-sm space-y-4 text-lg leading-relaxed text-muted">{intro}</div>
              </Reveal>
            )}
            {aside && (
              <Reveal delay={0.15} className="mt-8">
                {aside}
              </Reveal>
            )}
          </div>
        </div>
        <div className="min-w-0 lg:col-span-8">
          <div className="border border-white/10 bg-carbon p-6 sm:p-10">{children}</div>
        </div>
      </div>
    </section>
  )
}
