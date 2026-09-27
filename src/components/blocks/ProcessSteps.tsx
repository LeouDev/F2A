import { cn } from '../../lib/cn'
import { Reveal } from '../ui/Reveal'

export function ProcessSteps({ steps, className }: { steps: { title: string; text: string }[]; className?: string }) {
  return (
    <ol className={cn('grid gap-px border border-white/10 bg-white/10', className)}>
      {steps.map((step, i) => (
        <li key={step.title} className="bg-ink">
          <Reveal delay={i * 0.06} className="flex h-full flex-col p-6 sm:p-8">
            <span className="headline text-outline text-7xl">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="headline mt-8 text-3xl">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}
