import { useId, useMemo, useState, type ReactNode } from 'react'
import { useSearchParams } from 'react-router'
import { CarFront, Search, SlidersHorizontal, TriangleAlert, X } from 'lucide-react'
import { PageHero } from '../components/blocks/PageHero'
import { Button } from '../components/ui/Button'
import { Dialog } from '../components/ui/Dialog'
import { SelectInput } from '../components/ui/Form'
import { Reveal } from '../components/ui/Reveal'
import { StateMessage } from '../components/ui/States'
import { priceOptions } from '../components/vehicles/SearchPanel'
import { SampleNotice, VehicleCard, VehicleCardSkeleton } from '../components/vehicles/VehicleCard'
import { images } from '../data/images'
import { cn } from '../lib/cn'
import { formatCompactPrice } from '../lib/format'
import { fetchVehicles, filterKeys, filterOptions, filterVehicles, sortOptions, type InventoryFilters } from '../lib/inventory'
import { Seo } from '../lib/seo'
import { useAsync } from '../lib/useAsync'

type Options = ReturnType<typeof filterOptions>
type Update = (key: string, value: string) => void

function Field({ label, children }: { label: string; children: (id: string) => ReactNode }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-2.5 block text-white/50">
        {label}
      </label>
      {children(id)}
    </div>
  )
}

function ChipGroup({ label, options, value, onChange }: { label: string; options: string[]; value?: string; onChange: (v: string) => void }) {
  return (
    <fieldset>
      <legend className="eyebrow mb-2.5 text-white/50">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value === option
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(active ? '' : option)}
              className={cn(
                'h-10 border px-3.5 text-sm transition-colors duration-300',
                active ? 'border-f2a bg-f2a text-white' : 'border-white/15 text-white/70 hover:border-white/40 hover:text-white',
              )}
            >
              {option}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

function FilterControls({ filters, options, update }: { filters: InventoryFilters; options: Options; update: Update }) {
  return (
    <div className="space-y-7">
      <Field label="Make">
        {(id) => <SelectInput id={id} value={filters.make ?? ''} onChange={(e) => update('make', e.target.value)} options={options.makes} placeholder="Any make" />}
      </Field>
      <Field label="Model">
        {(id) => <SelectInput id={id} value={filters.model ?? ''} onChange={(e) => update('model', e.target.value)} options={options.models} placeholder="Any model" />}
      </Field>
      <fieldset>
        <legend className="eyebrow mb-2.5 text-white/50">Year</legend>
        <div className="grid grid-cols-2 gap-2">
          <SelectInput aria-label="Minimum year" value={filters.minYear ?? ''} onChange={(e) => update('minYear', e.target.value)} options={[...options.years].reverse()} placeholder="From" />
          <SelectInput aria-label="Maximum year" value={filters.maxYear ?? ''} onChange={(e) => update('maxYear', e.target.value)} options={options.years} placeholder="To" />
        </div>
      </fieldset>
      <fieldset>
        <legend className="eyebrow mb-2.5 text-white/50">Price</legend>
        <div className="grid grid-cols-2 gap-2">
          <SelectInput aria-label="Minimum price" value={filters.minPrice ?? ''} onChange={(e) => update('minPrice', e.target.value)} options={priceOptions} placeholder="Min" />
          <SelectInput aria-label="Maximum price" value={filters.maxPrice ?? ''} onChange={(e) => update('maxPrice', e.target.value)} options={priceOptions} placeholder="Max" />
        </div>
      </fieldset>
      <ChipGroup label="Body type" options={options.bodyTypes} value={filters.body} onChange={(v) => update('body', v)} />
      <ChipGroup label="Transmission" options={options.transmissions} value={filters.transmission} onChange={(v) => update('transmission', v)} />
      <ChipGroup label="Fuel type" options={options.fuelTypes} value={filters.fuel} onChange={(v) => update('fuel', v)} />
    </div>
  )
}

const chipLabel = (key: string, value: string) => {
  if (key === 'minPrice') return `From ${formatCompactPrice(Number(value))}`
  if (key === 'maxPrice') return `Up to ${formatCompactPrice(Number(value))}`
  if (key === 'minYear') return `From ${value}`
  if (key === 'maxYear') return `Up to ${value}`
  if (key === 'q') return `“${value}”`
  return value
}

export default function Cars() {
  const [params, setParams] = useSearchParams()
  const [sheetOpen, setSheetOpen] = useState(false)
  const { data, loading, error, retry } = useAsync(fetchVehicles)

  const filters = Object.fromEntries(params) as InventoryFilters
  const all = useMemo(() => data ?? [], [data])
  const results = useMemo(() => filterVehicles(all, Object.fromEntries(params) as InventoryFilters), [all, params])
  const options = filterOptions(all, filters.make)
  const active = filterKeys.filter((key) => params.get(key))

  const update: Update = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    if (key === 'make') next.delete('model')
    setParams(next, { replace: true, preventScrollReset: true })
  }
  const reset = () => setParams(filters.sort ? { sort: filters.sort } : {}, { replace: true, preventScrollReset: true })

  const countLabel = `${results.length} ${results.length === 1 ? 'vehicle' : 'vehicles'}`

  return (
    <>
      <Seo
        title="Available Cars | F2A Cars"
        description="Browse quality pre-owned cars from F2A Cars in Timog, Quezon City. Search by make, model, year, price, body type, transmission and fuel type."
      />
      <PageHero compact eyebrow="Inventory" title={['Available', <>cars<span className="text-f2a">.</span></>]} subtitle="Find a vehicle that fits your lifestyle." image={images.heroes.cars} />

      <section aria-label="Inventory" className="container-site pb-24 lg:pb-32">
        {all.some((v) => v.sample) && <SampleNotice className="mb-8" />}

        {/* Toolbar */}
        <div className="sticky top-[72px] z-20 -mx-5 border-y border-white/10 bg-ink/90 px-5 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:top-20 lg:mx-0 lg:border-x lg:px-5">
          <div className="flex flex-wrap items-center gap-3">
            <label className="relative min-w-0 flex-1 basis-60">
              <span className="sr-only">Search make or model</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/40" aria-hidden />
              <input
                type="search"
                value={filters.q ?? ''}
                onChange={(e) => update('q', e.target.value)}
                placeholder="Search make or model..."
                className="h-12 w-full border border-white/15 bg-white/[0.03] pl-11 pr-4 text-base outline-none transition-colors placeholder:text-white/35 hover:border-white/30 focus:border-f2a"
              />
            </label>
            <SelectInput
              aria-label="Sort by"
              value={filters.sort ?? 'newest'}
              onChange={(e) => update('sort', e.target.value === 'newest' ? '' : e.target.value)}
              options={sortOptions}
              placeholder={false}
              wrapperClassName="w-full sm:w-56"
            />
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="flex h-12 flex-1 items-center justify-center gap-2 border border-white/15 px-4 text-xs font-semibold uppercase tracking-[0.16em] transition-colors hover:border-white sm:flex-none lg:hidden"
            >
              <SlidersHorizontal className="size-4" aria-hidden />
              Filters
              {active.length > 0 && <span className="flex size-5 items-center justify-center rounded-full bg-f2a text-[10px]">{active.length}</span>}
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[16.5rem_minmax(0,1fr)] xl:gap-14">
          <aside aria-label="Filters" className="hidden lg:block">
            <div className="sticky top-44">
              <div className="mb-7 flex items-center justify-between">
                <h2 className="headline text-3xl">Filters</h2>
                {active.length > 0 && (
                  <button type="button" onClick={reset} className="eyebrow text-f2a-hot hover:text-white">
                    Reset
                  </button>
                )}
              </div>
              <FilterControls filters={filters} options={options} update={update} />
            </div>
          </aside>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="eyebrow mr-2 text-white/60" aria-live="polite">
                {loading ? 'Loading cars…' : countLabel}
              </p>
              {active.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => update(key, '')}
                  className="flex h-8 items-center gap-1.5 border border-white/15 px-3 text-xs text-white/80 transition-colors hover:border-f2a hover:text-white"
                  aria-label={`Remove filter ${chipLabel(key, params.get(key) ?? '')}`}
                >
                  {chipLabel(key, params.get(key) ?? '')}
                  <X className="size-3" aria-hidden />
                </button>
              ))}
            </div>

            <div className="mt-6">
              {error ? (
                <StateMessage
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
                  We couldn’t load the inventory right now. Please try again, or contact F2A directly.
                </StateMessage>
              ) : loading ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-busy>
                  {Array.from({ length: 6 }, (_, i) => (
                    <VehicleCardSkeleton key={i} />
                  ))}
                </div>
              ) : all.length === 0 ? (
                <StateMessage icon={<CarFront aria-hidden />} title="No vehicles found" actions={<Button to="/contact">Contact F2A</Button>}>
                  Contact F2A directly to ask about available units.
                </StateMessage>
              ) : results.length === 0 ? (
                <StateMessage
                  icon={<Search aria-hidden />}
                  title="No cars match your search."
                  actions={
                    <>
                      <Button to="/contact">Contact F2A</Button>
                      <Button variant="outline" onClick={reset}>
                        Reset filters
                      </Button>
                    </>
                  }
                >
                  Try changing your filters or contact F2A directly.
                </StateMessage>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {results.map((vehicle, i) => (
                    <Reveal key={vehicle.id} delay={(i % 3) * 0.06}>
                      <VehicleCard vehicle={vehicle} sizes="(min-width: 1280px) 25vw, (min-width: 640px) 45vw, 90vw" />
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile filters */}
      <Dialog open={sheetOpen} onClose={() => setSheetOpen(false)} label="Filters" variant="sheet">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="headline text-3xl">Filters</h2>
          <button type="button" onClick={() => setSheetOpen(false)} aria-label="Close filters" className="flex size-11 items-center justify-center border border-white/15">
            <X className="size-5" aria-hidden />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6">
          <FilterControls filters={filters} options={options} update={update} />
        </div>
        <div className="grid grid-cols-2 gap-2 border-t border-white/10 px-5 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4">
          <Button variant="outline" onClick={reset}>
            Reset
          </Button>
          <Button onClick={() => setSheetOpen(false)}>Show {countLabel}</Button>
        </div>
      </Dialog>
    </>
  )
}
