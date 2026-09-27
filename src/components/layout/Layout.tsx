import { useEffect, useRef, type CSSProperties } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import { m } from 'framer-motion'
import { concept } from '../../data/site'
import { InquiryProvider } from '../inquiry/InquiryProvider'
import { Footer } from './Footer'
import { MobileActionBar } from './MobileActionBar'
import { Navbar } from './Navbar'
import { NavigationProgress } from './RouteStates'

// Height of the concept disclaimer strip — sticky offsets and top padding add it via var(--banner-h).
const bannerHeight = { '--banner-h': concept.enabled ? '2rem' : '0rem' } as CSSProperties

export function Layout() {
  const { pathname } = useLocation()
  const firstRender = useRef(true)

  // Move focus to the new page for keyboard and screen-reader users.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <InquiryProvider>
      <div style={bannerHeight}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-f2a focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <NavigationProgress />
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">
          <m.div key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
            <Outlet />
          </m.div>
        </main>
        <Footer />
        <MobileActionBar />
        {/* Per history entry (new visits start at the top). The first entry of every page load is keyed
            "default", which would collide across fresh loads in one tab — use its path instead. */}
        <ScrollRestoration getKey={(location) => (location.key === 'default' ? location.pathname : location.key)} />
      </div>
    </InquiryProvider>
  )
}
