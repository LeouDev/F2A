import { useEffect, useRef } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import { m } from 'framer-motion'
import { InquiryProvider } from '../inquiry/InquiryProvider'
import { Footer } from './Footer'
import { MobileActionBar } from './MobileActionBar'
import { Navbar } from './Navbar'
import { NavigationProgress } from './RouteStates'

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
      {/* Keyed by path: the default key ("default") collides across fresh page loads in the same tab. */}
      <ScrollRestoration getKey={(location) => location.pathname} />
    </InquiryProvider>
  )
}
