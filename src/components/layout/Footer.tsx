import { Link } from 'react-router'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { brand, footerNav, site, socialLinks } from '../../data/site'
import { socialProof } from '../../data/socialProof'
import { formatDate } from '../../lib/format'
import { BrandIcon, type Brand } from '../ui/Icons'
import { Logo } from '../ui/Logo'

function FooterLinks({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="eyebrow text-white/40">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="text-sm text-white/75 transition-colors hover:text-f2a-hot">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function Footer() {
  const socials = (Object.entries(socialLinks) as [Brand, string | null][]).filter((entry): entry is [Brand, string] => !!entry[1])

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink pb-[calc(6rem+env(safe-area-inset-bottom))] pt-20 lg:pb-10">
      <div className="container-site">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-5">
            <Logo />
            <p className="headline mt-10 text-5xl sm:text-6xl">
              Quality
              <br />
              pre-owned cars.
            </p>
            <p className="eyebrow mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-white/60">
              {['Buy', 'Sell', 'Trade', 'Consign'].map((word, i) => (
                <span key={word} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden className="size-1 rounded-full bg-f2a" />}
                  {word}
                </span>
              ))}
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              {brand.motto}. {brand.mission} {brand.satisfaction}
            </p>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <FooterLinks title="Showroom" links={footerNav.showroom} />
          </div>
          <div className="lg:col-span-2">
            <FooterLinks title="F2A" links={footerNav.f2a} />
          </div>

          <div className="col-span-2 lg:col-span-3">
            <h2 className="eyebrow text-white/40">Contact</h2>
            <address className="mt-5 space-y-4 text-sm not-italic text-white/75">
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-white">
                <MapPin className="mt-0.5 size-4 shrink-0 text-f2a-hot" aria-hidden />
                <span>
                  {site.name}
                  <br />
                  {site.address.lines.join(', ')}
                </span>
              </a>
              <a href={site.phone.href} className="flex items-center gap-3 hover:text-white">
                <Phone className="size-4 shrink-0 text-f2a-hot" aria-hidden />
                {site.phone.display}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all hover:text-white">
                <Mail className="size-4 shrink-0 text-f2a-hot" aria-hidden />
                {site.email}
              </a>
              <a href={site.messenger} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white">
                <MessageCircle className="size-4 shrink-0 text-f2a-hot" aria-hidden />
                Message on Messenger
              </a>
            </address>
            <ul className="mt-6 flex gap-2" aria-label="Social media">
              {socials.map(([name, url]) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`F2A Cars on ${name[0].toUpperCase()}${name.slice(1)}`}
                    className="flex size-11 items-center justify-center border border-white/15 text-white/80 transition-colors hover:border-f2a hover:bg-f2a hover:text-white"
                  >
                    <BrandIcon name={name} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p aria-hidden className="headline metallic pointer-events-none mt-20 select-none whitespace-nowrap text-[22vw] leading-[0.74] opacity-90 xl:text-[19.5rem]">
          F<span className="text-f2a [-webkit-text-fill-color:var(--color-f2a)]">2</span>A Cars
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved. ·{' '}
            <Link to="/privacy" className="hover:text-white">
              Privacy
            </Link>{' '}
            ·{' '}
            <Link to="/terms" className="hover:text-white">
              Terms
            </Link>
          </p>
          <p>
            Facebook figures as listed on the {socialProof.source} ({formatDate(socialProof.asOf)}); they may change over time.
          </p>
        </div>
      </div>
    </footer>
  )
}
