import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Reveal } from './Reveal'

/** "01 — FIND YOUR CAR" label with the red accent line. */
export function Eyebrow({ index, children, className }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn('eyebrow flex items-center gap-3 text-white/60', className)}>
      {index && <span className="text-f2a-hot">{index}</span>}
      <span aria-hidden className="h-px w-8 bg-f2a" />
      <span>{children}</span>
    </p>
  )
}

type SectionHeaderProps = {
  index?: string
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  action?: ReactNode
  id?: string
  className?: string
}

export function SectionHeader({ index, eyebrow, title, subtitle, action, id, className }: SectionHeaderProps) {
  return (
    <div className={cn('grid gap-8 lg:grid-cols-12 lg:items-end', className)}>
      <div className="lg:col-span-7">
        {eyebrow && (
          <Reveal>
            <Eyebrow index={index}>{eyebrow}</Eyebrow>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h2 id={id} className="headline mt-6 text-[clamp(2.9rem,8vw,6.25rem)]">
            {title}
          </h2>
        </Reveal>
      </div>
      {(subtitle || action) && (
        <Reveal delay={0.1} className="flex flex-col items-start gap-6 lg:col-span-4 lg:col-start-9 lg:pb-2">
          {subtitle && <p className="max-w-md text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>}
          {action}
        </Reveal>
      )}
    </div>
  )
}
