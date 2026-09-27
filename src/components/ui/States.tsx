import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type StateMessageProps = {
  icon?: ReactNode
  title: string
  /** Use 'h1' when the message is the whole page (not found, route error). */
  as?: 'h1' | 'h2' | 'h3'
  children?: ReactNode
  actions?: ReactNode
  className?: string
}

/** Empty / error / not-found message block. */
export function StateMessage({ icon, title, as: Heading = 'h3', children, actions, className }: StateMessageProps) {
  return (
    <div className={cn('flex flex-col items-start gap-5 border border-white/10 bg-carbon/60 p-8 sm:p-12', className)}>
      {icon && <span className="flex size-12 items-center justify-center border border-white/15 text-f2a-hot [&>svg]:size-5">{icon}</span>}
      <Heading className="headline text-4xl sm:text-5xl">{title}</Heading>
      {children && <div className="max-w-lg text-base leading-relaxed text-muted">{children}</div>}
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </div>
  )
}

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn('animate-pulse bg-white/[0.06]', className)} />
}
