import { useRef } from 'react'
import { ChevronLeft, ChevronRight, TriangleAlert } from 'lucide-react'
import { fetchVehicles } from '../../lib/inventory'
import { useAsync } from '../../lib/useAsync'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/Section'
import { StateMessage } from '../ui/States'
import { SampleNotice, VehicleCard, VehicleCardSkeleton } from '../vehicles/VehicleCard'

const slide = 'w-[86%] shrink-0 snap-start sm:w-[calc(50%-0.5rem)] xl:w-[calc(33.333%-0.667rem)]'

export function FeaturedCars() {
  const { data, loading, error, retry } = useAsync(fetchVehicles)
  const track = useRef<HTMLDivElement>(null)
  const cars = (data ?? []).filter((v) => v.status !== 'sold').slice(0, 6)
  const scroll = (direction: number) => {
    const el = track.current
    el?.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: 'smooth' })
  }

  return (
    <section aria-labelledby="featured-title" className="relative border-t border-white/10 py-20 sm:py-24 lg:py-32">
      <div className="container-site">
        <SectionHeader
          index="01"
          eyebrow="Find your car"
          id="featured-title"
          title={
            <>
              Featured
              <br />
              cars<span className="text-f2a">.</span>
            </>
          }
          subtitle="Explore some of the vehicles currently available from F2A Cars."
          action={
            <Button to="/cars" variant="outline" arrow>
              View all cars
            </Button>
          }
        />

        {cars.some((v) => v.sample) && <SampleNotice className="mt-10" />}

        {error ? (
          <StateMessage
            className="mt-10"
            icon={<TriangleAlert aria-hidden />}
            title="Inventory unavailable"
            actions={
              <>
                <Button onClick={retry}>Try again</Button>
                <Button to="/contact" variant="outline">
                  Contact F2A
                </Button>
              </>
            }
          >
            We couldn’t load the cars right now. Please try again, or contact F2A directly.
          </StateMessage>
        ) : (
          <>
            <div
              ref={track}
              className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:scroll-px-0 lg:px-0"
              aria-label="Featured cars"
              aria-busy={loading}
            >
              {loading
                ? Array.from({ length: 3 }, (_, i) => (
                    <div key={i} className={slide}>
                      <VehicleCardSkeleton />
                    </div>
                  ))
                : cars.map((vehicle, i) => (
                    <Reveal key={vehicle.id} delay={Math.min(i, 3) * 0.07} className={slide}>
                      <VehicleCard vehicle={vehicle} />
                    </Reveal>
                  ))}
            </div>
            {!loading && cars.length > 1 && (
              <div className="mt-6 hidden justify-end gap-2 sm:flex">
                <button type="button" onClick={() => scroll(-1)} aria-label="Scroll featured cars left" className="flex size-12 items-center justify-center border border-white/20 transition-colors hover:border-white hover:bg-white hover:text-ink">
                  <ChevronLeft className="size-5" aria-hidden />
                </button>
                <button type="button" onClick={() => scroll(1)} aria-label="Scroll featured cars right" className="flex size-12 items-center justify-center border border-white/20 transition-colors hover:border-white hover:bg-white hover:text-ink">
                  <ChevronRight className="size-5" aria-hidden />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
