import type { ReactNode } from 'react'
import { m } from 'framer-motion'

export const ease = [0.16, 1, 0.3, 1] as const

type RevealProps = { children: ReactNode; delay?: number; y?: number; className?: string }

/** Fade + rise when scrolled into view (transforms are skipped for reduced-motion users). */
export function Reveal({ children, delay = 0, y = 28, className }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </m.div>
  )
}

/** Masked, line-by-line headline reveal. */
export function RevealLines({ lines, delay = 0, onMount }: { lines: ReactNode[]; delay?: number; onMount?: boolean }) {
  return lines.map((line, i) => (
    <span key={i} className="-my-[0.1em] block overflow-hidden py-[0.1em]">
      <m.span
        className="block"
        initial={{ y: '115%' }}
        {...(onMount ? { animate: { y: 0 } } : { whileInView: { y: 0 }, viewport: { once: true } })}
        transition={{ duration: 1.05, delay: delay + i * 0.09, ease }}
      >
        {line}
      </m.span>
      {/* keeps words apart in the accessible name ("Find your next ride", not "Find yournext ride") */}
      {i < lines.length - 1 && ' '}
    </span>
  ))
}
