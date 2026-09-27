import { useEffect, type ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import { CalendarDays, CarFront, Check, Cog, Fuel, Gauge, Mail, MessageCircle, Milestone, Phone, TriangleAlert, Zap } from 'lucide-react'
import { useInquiry } from '../components/inquiry/inquiryContext'
import { Accordion } from '../components/ui/Accordion'
import { Breadcrumbs } from '../components/ui/Breadcrumbs'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { Skeleton, StateMessage } from '../components/ui/States'
import { SampleBadge, SampleNotice, StatusBadge, VehicleCard } from '../components/vehicles/VehicleCard'
import { VehicleGallery } from '../components/vehicles/VehicleGallery'
import { brand, site } from '../data/site'
import type { Vehicle } from '../data/vehicles'
import { formatMileage, formatPrice, vehicleTitle } from '../lib/format'
import { fetchVehicles } from '../lib/inventory'
import { carJsonLd, Seo } from '../lib/seo'
import { useAsync } from '../lib/useAsync'

function Shell({ children }: { children: ReactNode }) {
  return <div className="container-site pb-24 pt-[calc(7rem_+_var(--banner-h))] lg:pb-32 lg:pt-[calc(8rem_+_var(--banner-h))]">{children}</div>
}

function DetailSkeleton() {
  return (
    <Shell>
      <div aria-busy aria-label="Loading vehicle">
        <Skeleton className="h-3 w-48" />
        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7 xl:col-span-8">
            <Skeleton className="aspect-[4/3] w-full md:aspect-[16/10]" />
            <div className="mt-3 hidden grid-cols-5 gap-3 md:grid">
              {Array.from({ length: 5 }, (_, i) => (
                <Skeleton key={i} className="aspect-[4/3]" />
              ))}
            </div>
          </div>
          <div className="space-y-4 lg:col-span-5 xl:col-span-4">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-16 w-3/4" />
            <Skeleton className="h-20 w-full" />
            <div className="grid grid-cols-2 gap-px">
              {Array.from({ length: 6 }, (_, i) => (
                <Skeleton key={i} className="h-20" />
              ))}
            </div>
            <Skeleton className="h-14 w-full" />
          </div>
        </div>
      </div>
    </Shell>
  )
}

const specsOf = (v: Vehicle) =>
  [
    { label: 'Mileage', value: v.mileage != null ? formatMileage(v.mileage) : undefined, icon: Gauge },
    { label: 'Transmission', value: v.transmission, icon: Cog },
    { label: 'Fuel', value: v.fuelType, icon: Fuel },
    { label: 'Engine', value: v.engine, icon: Zap },
    { label: 'Body type', value: v.bodyType, icon: CarFront },
    { label: 'Drive type', value: v.driveType, icon: Milestone },
  ] as const

export default function CarDetail() {
  const { id = '' } = useParams()
  const { data, loading, error, retry } = useAsync(fetchVehicles)
  const { openInquiry, setPageVehicle } = useInquiry()
  const vehicle = data?.find((v) => v.id === id)

  useEffect(() => {
    setPageVehicle(vehicle ?? null)
    return () => setPageVehicle(null)
  }, [vehicle, setPageVehicle])

  if (loading) return <DetailSkeleton />

  if (error) {
    return (
      <Shell>
        <Seo title="Inventory unavailable | F2A Cars" noindex />
        <StateMessage
          icon={<TriangleAlert aria-hidden />}
          title="Inventory unavailable"
          as="h1"
          actions={
            <>
              <Button onClick={retry}>Try again</Button>
              <Button to="/contact" variant="outline">
                Contact F2A
              </Button>
            </>
          }
        >
          We couldn’t load this vehicle right now. Please try again, or contact F2A directly.
        </StateMessage>
      </Shell>
    )
  }

  if (!vehicle) {
    return (
      <Shell>
        <Seo title="Vehicle not found | F2A Cars" noindex />
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cars', to: '/cars' }, { label: 'Not found' }]} />
        <StateMessage
          className="mt-8"
          icon={<CarFront aria-hidden />}
          title="Vehicle not found"
          as="h1"
          actions={
            <>
              <Button to="/cars" arrow>
                Browse cars
              </Button>
              <Button to="/contact" variant="outline">
                Contact F2A
              </Button>
            </>
          }
        >
          This vehicle may have been sold or removed from the inventory. Browse the available cars or ask F2A about similar units.
        </StateMessage>
      </Shell>
    )
  }

  const title = vehicleTitle(vehicle)
  const specs = specsOf(vehicle).filter((spec) => spec.value)
  const related = (data ?? [])
    .filter((v) => v.id !== vehicle.id && v.status !== 'sold')
    .sort((a, b) => Number(b.bodyType === vehicle.bodyType) - Number(a.bodyType === vehicle.bodyType))
    .slice(0, 3)
  const details: [string, ReactNode][] = [
    ['Year', vehicle.year],
    ['Make', vehicle.make],
    ['Model', vehicle.model],
    ['Variant', vehicle.variant],
    ['Color', vehicle.color],
    ...specs.map((spec): [string, ReactNode] => [spec.label, spec.value]),
    ['Status', <span className="capitalize">{vehicle.status}</span>],
  ]

  return (
    <>
      <Seo
        title={`F2A Cars | ${title}`}
        description={`${[title, vehicle.variant].filter(Boolean).join(' ')} — ${formatPrice(vehicle.price)}. ${[formatMileage(vehicle.mileage), vehicle.transmission, vehicle.fuelType].filter(Boolean).join(', ')}. Inquire with F2A Cars, Quezon City.`}
        image={vehicle.images[0] ? `${vehicle.images[0].src}${vehicle.images[0].src.includes('unsplash') ? '?w=1200&h=630&fit=crop&q=70' : ''}` : undefined}
        type="product"
        jsonLd={vehicle.sample ? undefined : carJsonLd(vehicle)}
      />

      <Shell>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cars', to: '/cars' }, { label: title }]} />
        {vehicle.sample && <SampleNotice className="mt-6" />}

        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7 xl:col-span-8">
            <VehicleGallery images={vehicle.images} title={title} />
          </div>

          <aside className="lg:col-span-5 xl:col-span-4" aria-label="Vehicle summary">
            <div className="lg:sticky lg:top-[calc(7rem_+_var(--banner-h))]">
              <div className="flex gap-2">
                <StatusBadge status={vehicle.status} />
                {vehicle.sample && <SampleBadge />}
              </div>
              <p className="eyebrow mt-6 text-white/50">
                {vehicle.year} · {vehicle.make}
              </p>
              <h1 className="headline mt-3 text-[clamp(3.2rem,7vw,5rem)]">{vehicle.model}</h1>
              {vehicle.variant && <p className="mt-3 text-lg text-muted">{vehicle.variant}</p>}

              <div className="mt-8 border-y border-white/10 py-6">
                <p className="eyebrow text-white/45">Price</p>
                <p className="headline mt-2 text-[3.4rem] leading-none">{formatPrice(vehicle.price)}</p>
                {vehicle.financingAvailable && (
                  <p className="mt-3 text-sm text-muted">
                    Financing options may be available.{' '}
                    <Link to={`/financing?vehicle=${vehicle.id}`} className="text-white underline underline-offset-4 hover:text-f2a-hot">
                      Ask about financing
                    </Link>
                  </p>
                )}
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-2">
                {specs.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex flex-col gap-2 bg-ink p-4">
                    <dt className="eyebrow flex items-center gap-2 text-[10px] text-white/45">
                      <Icon className="size-3.5 text-f2a-hot" aria-hidden />
                      {label}
                    </dt>
                    <dd className="text-[15px] text-white">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 grid gap-2">
                <Button size="lg" arrow onClick={() => openInquiry({ vehicle })}>
                  Inquire about this car
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button href={site.phone.href} variant="outline" icon={<Phone className="size-4" aria-hidden />} className="px-3!">
                    Call F2A Cars
                  </Button>
                  <Button variant="outline" icon={<CalendarDays className="size-4" aria-hidden />} onClick={() => openInquiry({ vehicle, intent: 'viewing' })} className="px-3!">
                    Schedule viewing
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-20 grid gap-14 lg:mt-28 lg:grid-cols-12">
          <div className="lg:col-span-7 xl:col-span-8">
            <Reveal>
              <h2 className="headline text-5xl">Description</h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{vehicle.description}</p>
            </Reveal>

            {vehicle.features.length > 0 && (
              <Reveal className="mt-16">
                <h2 className="headline text-5xl">Key features</h2>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {vehicle.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 border border-white/10 px-4 py-3.5 text-white/85">
                      <Check className="size-4 shrink-0 text-f2a-hot" aria-hidden />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            <div className="mt-16 border-t border-white/10">
              <Accordion title="Vehicle details" defaultOpen>
                <dl className="grid gap-x-10 sm:grid-cols-2">
                  {details
                    .filter(([, value]) => value != null && value !== '')
                    .map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-6 border-b border-white/10 py-3">
                        <dt className="text-white/50">{label}</dt>
                        <dd className="text-right text-white">{value}</dd>
                      </div>
                    ))}
                </dl>
              </Accordion>
              <Accordion title="Financing">
                <p>Financing options may be available for selected vehicles. Submit an inquiry to discuss your options.</p>
                <Button to={`/financing?vehicle=${vehicle.id}`} variant="outline" size="sm" arrow className="mt-5">
                  Check financing options
                </Button>
              </Accordion>
              <Accordion title="Trade-in">
                <p>Have a car to trade? Tell F2A about your current car and put it toward this one. Trade-in values are discussed directly with F2A.</p>
                <Button to={`/trade?vehicle=${vehicle.id}`} variant="outline" size="sm" arrow className="mt-5">
                  Start a trade-in
                </Button>
              </Accordion>
              <Accordion title="Consignment">
                <p>Want F2A to help sell your current car instead? Send an inquiry about consignment — terms are discussed directly with F2A.</p>
                <Button to="/consign" variant="outline" size="sm" arrow className="mt-5">
                  Inquire about consignment
                </Button>
              </Accordion>
            </div>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9 xl:col-span-4" aria-label="Talk to F2A">
            <div className="border border-white/10 bg-carbon p-6 sm:p-8 lg:sticky lg:top-[calc(7rem_+_var(--banner-h))]">
              <p className="eyebrow text-f2a-hot">Talk to F2A</p>
              <p className="headline mt-4 text-4xl">Questions about this car?</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">“{brand.aftersales}” Reach F2A directly — before and after you buy.</p>
              <div className="mt-6 space-y-2">
                <Button href={site.phone.href} variant="outline" className="w-full" icon={<Phone className="size-4" aria-hidden />}>
                  {site.phone.display}
                </Button>
                <Button href={site.messenger} variant="outline" className="w-full" icon={<MessageCircle className="size-4" aria-hidden />}>
                  Message on Messenger
                </Button>
                <Button href={`mailto:${site.email}?subject=${encodeURIComponent(`Inquiry: ${title}`)}`} variant="outline" className="w-full" icon={<Mail className="size-4" aria-hidden />}>
                  Email F2A
                </Button>
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related-title" className="mt-24 border-t border-white/10 pt-16 lg:mt-32">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 id="related-title" className="headline text-[clamp(2.8rem,6vw,4.5rem)]">
                You may also like
              </h2>
              <Button to="/cars" variant="outline" arrow>
                View all cars
              </Button>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((v, i) => (
                <Reveal key={v.id} delay={i * 0.06}>
                  <VehicleCard vehicle={v} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </Shell>
    </>
  )
}
