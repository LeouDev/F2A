import { useEffect, useRef, type ReactNode } from 'react'
import { AnimatePresence, m, type TargetAndTransition } from 'framer-motion'
import { cn } from '../../lib/cn'
import { ease } from './Reveal'

type Variant = 'modal' | 'fullscreen' | 'sheet'

const panels: Record<Variant, { className: string; initial: TargetAndTransition; animate: TargetAndTransition; exit: TargetAndTransition }> = {
  // Bottom sheet on phones, centred modal from `sm` up.
  modal: {
    className:
      'relative z-10 mt-auto max-h-[92dvh] w-full overflow-y-auto overscroll-contain border-t border-white/10 bg-carbon sm:m-auto sm:max-h-[min(90dvh,880px)] sm:max-w-2xl sm:border',
    initial: { opacity: 0, y: 48 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 32 },
  },
  fullscreen: {
    className: 'relative z-10 flex h-full w-full flex-col',
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  sheet: {
    className: 'relative z-10 mt-auto flex max-h-[88dvh] w-full flex-col border-t border-white/10 bg-carbon',
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
  },
}

type DialogProps = {
  open: boolean
  onClose: () => void
  label?: string
  labelledBy?: string
  variant?: Variant
  className?: string
  children: ReactNode
}

/**
 * Native <dialog> (focus trap, Esc, inert page, top layer) with Framer Motion enter/exit.
 * The element stays open until the exit animation finishes, then closes.
 */
export function Dialog({ open, onClose, label, labelledBy, variant = 'modal', className, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (open && dialog && !dialog.open) dialog.showModal()
  }, [open])

  const panel = panels[variant]

  return (
    <dialog
      ref={ref}
      aria-label={label}
      aria-labelledby={labelledBy}
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0 text-light open:flex"
    >
      <AnimatePresence onExitComplete={() => ref.current?.close()}>
        {open && (
          <m.div
            key="backdrop"
            aria-hidden
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
        )}
        {open && (
          <m.div
            key="panel"
            className={cn(panel.className, className)}
            initial={panel.initial}
            animate={panel.animate}
            exit={panel.exit}
            transition={{ duration: 0.5, ease }}
          >
            {children}
          </m.div>
        )}
      </AnimatePresence>
    </dialog>
  )
}
