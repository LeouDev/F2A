import { Link, useLocation } from 'react-router'
import { m } from 'framer-motion'
import { Mail, MessageCircle, Phone, X } from 'lucide-react'
import { isActive, mobileNav, site } from '../../data/site'
import { cn } from '../../lib/cn'
import { useInquiry } from '../inquiry/inquiryContext'
import { Button } from '../ui/Button'
import { Dialog } from '../ui/Dialog'
import { Logo } from '../ui/Logo'
import { ease } from '../ui/Reveal'

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { pathname } = useLocation()
  const { openInquiry } = useInquiry()

  return (
    <Dialog open={open} onClose={onClose} label="Menu" variant="fullscreen" className="overflow-y-auto overflow-x-hidden bg-ink">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full bg-f2a/20 blur-[120px]" />
      <div className="container-site relative flex h-[72px] shrink-0 items-center justify-between lg:h-20">
        <Logo onClick={onClose} />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex size-11 items-center justify-center border border-white/20 transition-colors hover:border-white"
        >
          <X className="size-5" aria-hidden />
        </button>
      </div>

      <nav aria-label="Mobile" className="container-site relative flex-1 py-6">
        <ul className="border-t border-white/10">
          {mobileNav.map((item, i) => {
            const active = isActive(item, pathname)
            return (
              <m.li
                key={item.to}
                className="border-b border-white/10"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.08 + i * 0.045, ease }}
              >
                <Link
                  to={item.to}
                  onClick={onClose}
                  aria-current={active ? 'page' : undefined}
                  className="group flex items-baseline gap-5 py-4"
                >
                  <span className={cn('eyebrow w-6', active ? 'text-f2a-hot' : 'text-white/35')}>{String(i + 1).padStart(2, '0')}</span>
                  <span
                    className={cn(
                      'headline text-[clamp(2.4rem,10vw,3.75rem)] transition-colors duration-300',
                      active ? 'text-white' : 'text-white/70 group-hover:text-white',
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              </m.li>
            )
          })}
        </ul>
      </nav>

      <m.div
        className="container-site relative space-y-6 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45, ease }}
      >
        <Button
          size="lg"
          arrow
          className="w-full"
          onClick={() => {
            onClose()
            openInquiry()
          }}
        >
          Inquire now
        </Button>
        <div className="grid grid-cols-3 gap-2 text-center">
          <a href={site.phone.href} className="flex flex-col items-center gap-2 border border-white/10 py-4 eyebrow text-white/70 hover:text-white">
            <Phone className="size-4" aria-hidden /> Call
          </a>
          <a href={site.messenger} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 border border-white/10 py-4 eyebrow text-white/70 hover:text-white">
            <MessageCircle className="size-4" aria-hidden /> Message
          </a>
          <a href={`mailto:${site.email}`} className="flex flex-col items-center gap-2 border border-white/10 py-4 eyebrow text-white/70 hover:text-white">
            <Mail className="size-4" aria-hidden /> Email
          </a>
        </div>
        <p className="eyebrow text-white/40">{site.address.lines.join(' · ')}</p>
      </m.div>
    </Dialog>
  )
}
