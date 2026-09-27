import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu } from 'lucide-react'
import { isActive, mainNav } from '../../data/site'
import { cn } from '../../lib/cn'
import { useInquiry } from '../inquiry/inquiryContext'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'
import { ConceptStrip } from './ConceptStrip'
import { MobileMenu } from './MobileMenu'

export function Navbar() {
  const { pathname } = useLocation()
  const { openInquiry } = useInquiry()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-500',
        scrolled ? 'border-white/10 bg-ink/80 backdrop-blur-xl' : 'border-transparent bg-transparent',
      )}
    >
      <ConceptStrip />
      {/* Legibility over bright hero images before the bar turns solid */}
      <div aria-hidden className={cn('pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-black/60 to-transparent transition-opacity duration-500', scrolled && 'opacity-0')} />
      <div className="container-site flex h-[72px] items-center justify-between gap-6 lg:h-20">
        <Logo />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {mainNav.map((item) => {
              const active = isActive(item, pathname)
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300',
                      'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-f2a after:transition-transform after:duration-500 after:ease-out-expo',
                      active ? 'text-white after:scale-x-100' : 'text-white/65 after:scale-x-0 hover:text-white hover:after:scale-x-100',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => openInquiry()} className="max-sm:hidden">
            Inquire now
          </Button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
            className="flex size-11 items-center justify-center border border-white/20 transition-colors hover:border-white xl:hidden"
          >
            <Menu className="size-5" aria-hidden />
          </button>
        </div>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}
