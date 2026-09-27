import { isRouteErrorResponse, useNavigation, useRouteError } from 'react-router'
import { AnimatePresence, m } from 'framer-motion'
import { Compass, TriangleAlert } from 'lucide-react'
import { images } from '../../data/images'
import { Seo } from '../../lib/seo'
import { Button } from '../ui/Button'
import { StateMessage } from '../ui/States'

/** Thin red bar while a lazily-loaded page is fetched. */
export function NavigationProgress() {
  const busy = useNavigation().state !== 'idle'
  return (
    <AnimatePresence>
      {busy && (
        <m.div
          key="progress"
          aria-hidden
          className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-f2a"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0.85, transition: { duration: 2.2, ease: 'easeOut' } }}
          exit={{ scaleX: 1, opacity: 0, transition: { duration: 0.35 } }}
        />
      )}
    </AnimatePresence>
  )
}

/** Shown while the first route loads. */
export function PageLoader() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-ink" role="status" aria-label="Loading">
      <img src={images.brand.logo.src} alt="" width={64} height={64} className="size-16 animate-pulse rounded-full" />
    </div>
  )
}

export function NotFoundContent() {
  return (
    <section className="container-site flex min-h-[80svh] flex-col justify-center pb-16 pt-32">
      <Seo title="Page not found | F2A Cars" noindex />
      <p className="eyebrow text-f2a-hot">Error 404</p>
      <h1 className="headline mt-6 text-[clamp(4rem,14vw,12rem)]">
        Wrong
        <br />
        turn<span className="text-f2a">.</span>
      </h1>
      <p className="mt-8 max-w-md text-lg text-muted">The page you’re looking for doesn’t exist or has moved.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button to="/" arrow>
          Back to home
        </Button>
        <Button to="/cars" variant="outline" icon={<Compass className="size-4" aria-hidden />}>
          Browse cars
        </Button>
      </div>
    </section>
  )
}

export function RouteError() {
  const error = useRouteError()
  if (isRouteErrorResponse(error) && error.status === 404) return <NotFoundContent />
  if (import.meta.env.DEV) console.error(error)

  return (
    <section className="container-site flex min-h-[80svh] flex-col justify-center pb-16 pt-32">
      <Seo title="Something went wrong | F2A Cars" noindex />
      <StateMessage
        icon={<TriangleAlert aria-hidden />}
        title="Something went wrong"
        as="h1"
        actions={
          <>
            <Button onClick={() => window.location.reload()}>Reload page</Button>
            <Button to="/" variant="outline">
              Back to home
            </Button>
          </>
        }
      >
        This page didn’t load properly. Check your connection and try again.
      </StateMessage>
    </section>
  )
}
