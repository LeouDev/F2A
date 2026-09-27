import type { ReactNode } from 'react'
import { Plus } from 'lucide-react'

/** Native <details> accordion — keyboard and screen-reader support for free. */
export function Accordion({ title, children, defaultOpen }: { title: ReactNode; children: ReactNode; defaultOpen?: boolean }) {
  return (
    <details className="group border-b border-white/10" open={defaultOpen}>
      <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 transition-colors hover:text-white">
        <span className="headline text-2xl sm:text-3xl">{title}</span>
        <span className="flex size-10 shrink-0 items-center justify-center border border-white/15 transition-colors group-open:border-f2a group-open:bg-f2a">
          <Plus aria-hidden className="size-4 transition-transform duration-500 ease-out-expo group-open:rotate-45" />
        </span>
      </summary>
      <div className="pb-8 text-base leading-relaxed text-muted">{children}</div>
    </details>
  )
}
