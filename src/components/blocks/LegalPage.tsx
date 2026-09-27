import type { ReactNode } from 'react'
import { Info } from 'lucide-react'
import { site } from '../../data/site'
import { Seo } from '../../lib/seo'
import { Eyebrow } from '../ui/Section'

type LegalPageProps = {
  title: string
  seoTitle: string
  description: string
  updated: string
  sections: { heading: string; body: ReactNode }[]
}

export function LegalPage({ title, seoTitle, description, updated, sections }: LegalPageProps) {
  return (
    <>
      <Seo title={seoTitle} description={description} />
      <article className="container-site pb-24 pt-36 lg:pb-32 lg:pt-44">
        <div className="max-w-3xl">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="headline mt-6 text-[clamp(3.2rem,9vw,7rem)]">{title}</h1>
          <p className="eyebrow mt-6 text-white/45">Last updated {updated}</p>
          {/* Template notice — remove once F2A has reviewed and approved the final text. */}
          <p className="mt-8 flex gap-3 border border-white/10 bg-carbon p-5 text-sm leading-relaxed text-white/65">
            <Info className="mt-0.5 size-4 shrink-0 text-f2a-hot" aria-hidden />
            This page is a starting template. It should be reviewed and approved by F2A Cars before it is relied on.
          </p>
          <div className="mt-14 space-y-12">
            {sections.map((section, i) => (
              <section key={section.heading}>
                <h2 className="headline flex items-baseline gap-4 text-3xl sm:text-4xl">
                  <span className="eyebrow text-f2a-hot">{String(i + 1).padStart(2, '0')}</span>
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-white/70 [&_a]:text-white [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_li]:list-disc">
                  {section.body}
                </div>
              </section>
            ))}
            <section>
              <h2 className="headline text-3xl sm:text-4xl">Contact</h2>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                {site.name} · {site.address.lines.join(', ')} ·{' '}
                <a href={site.phone.href} className="text-white underline underline-offset-4">
                  {site.phone.display}
                </a>{' '}
                ·{' '}
                <a href={`mailto:${site.email}`} className="break-all text-white underline underline-offset-4">
                  {site.email}
                </a>
              </p>
            </section>
          </div>
        </div>
      </article>
    </>
  )
}
