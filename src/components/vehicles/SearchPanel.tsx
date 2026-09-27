import { useId, useState, type ComponentProps, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { Search } from 'lucide-react'
import { cn } from '../../lib/cn'
import { formatCompactPrice } from '../../lib/format'
import { fetchVehicles, filterOptions, priceSteps } from '../../lib/inventory'
import { useAsync } from '../../lib/useAsync'
import { Button } from '../ui/Button'
import { SelectInput } from '../ui/Form'

function LabeledSelect({ label, className, ...props }: { label: string } & ComponentProps<typeof SelectInput>) {
  const id = useId()
  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow mb-2 block text-[10px] text-white/50">
        {label}
      </label>
      <SelectInput id={id} {...props} />
    </div>
  )
}

export const priceOptions = priceSteps.map((p) => ({ value: String(p), label: formatCompactPrice(p) }))

/** Hero "FIND YOUR NEXT CAR" panel — submits to /cars with query params. */
export function SearchPanel({ className }: { className?: string }) {
  const navigate = useNavigate()
  const { data } = useAsync(fetchVehicles)
  const [make, setMake] = useState('')
  const options = filterOptions(data ?? [], make || undefined)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const params = new URLSearchParams()
    new FormData(e.currentTarget).forEach((value, key) => {
      if (typeof value === 'string' && value) params.set(key, value)
    })
    const query = params.toString()
    navigate(query ? `/cars?${query}` : '/cars')
  }

  return (
    <form
      role="search"
      aria-labelledby="hero-search-title"
      onSubmit={onSubmit}
      className={cn('border border-white/10 bg-carbon/85 p-5 shadow-2xl shadow-black/60 backdrop-blur-xl sm:p-6 lg:p-7', className)}
    >
      <div className="flex items-center justify-between gap-4">
        <h2 id="hero-search-title" className="headline flex items-center gap-3 text-2xl sm:text-3xl">
          <Search className="size-5 text-f2a-hot" aria-hidden />
          Find your next car
        </h2>
        <Link to="/cars" className="eyebrow hidden text-white/50 transition-colors hover:text-white sm:inline">
          Browse all cars →
        </Link>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-[repeat(5,minmax(0,1fr))_auto] lg:items-end">
        <LabeledSelect label="Make" name="make" value={make} onChange={(e) => setMake(e.target.value)} options={options.makes} placeholder="Any make" />
        <LabeledSelect key={make} label="Model" name="model" options={options.models} placeholder="Any model" />
        <LabeledSelect label="Min price" name="minPrice" options={priceOptions} placeholder="No minimum" />
        <LabeledSelect label="Max price" name="maxPrice" options={priceOptions} placeholder="No maximum" />
        <LabeledSelect label="Body type" name="body" options={options.bodyTypes} placeholder="Any body type" className="sm:col-span-2 lg:col-span-1" />
        <Button type="submit" arrow className="sm:col-span-2 lg:col-span-1">
          Search cars
        </Button>
      </div>
    </form>
  )
}
