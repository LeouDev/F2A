import { socialProof } from '../../data/socialProof'
import { cn } from '../../lib/cn'
import { formatDate } from '../../lib/format'
import { Reveal } from '../ui/Reveal'

/** "96%" → 96 + red %, "1.9M" → 1.9 + red M */
function Figure({ value }: { value: string }) {
  const [, number, suffix] = value.match(/^([\d.,]+)(.*)$/) ?? [null, value, '']
  return (
    <>
      {number}
      {suffix && <span className="text-f2a">{suffix}</span>}
    </>
  )
}

/** Facebook metrics — always shown with their source and date. */
export function SocialProofStats({ className }: { className?: string }) {
  const stats = [
    { value: socialProof.recommendationRate, label: 'Recommend F2A on Facebook' },
    { value: String(socialProof.reviewCount), label: 'Facebook reviews' },
    { value: socialProof.followers, label: 'Facebook followers' },
  ]

  return (
    <div className={className}>
      <dl className="grid divide-y divide-white/10 border-y border-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08} className={cn('flex flex-col-reverse gap-3 py-8 sm:px-8', i === 0 && 'sm:pl-0')}>
            <dt className="eyebrow text-white/50">{stat.label}</dt>
            <dd className="headline text-[clamp(4.5rem,10vw,8rem)] leading-[0.8]">
              <Figure value={stat.value} />
            </dd>
          </Reveal>
        ))}
      </dl>
      <p className="mt-4 text-xs leading-relaxed text-white/45">
        Based on the{' '}
        <a href={socialProof.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white">
          {socialProof.source}
        </a>{' '}
        as of {formatDate(socialProof.asOf)}. Figures may change over time.
      </p>
    </div>
  )
}
