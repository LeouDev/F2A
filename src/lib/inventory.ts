import { vehicles, type Vehicle } from '../data/vehicles'

/*
 * Inventory data access — the only place components get vehicles from.
 * Today it serves the local list in src/data/vehicles.ts. To go live, replace the body of
 * fetchVehicles() with a Supabase query, e.g.
 *
 *   const { data, error } = await supabase
 *     .from('vehicles').select('*, images:vehicle_images(src, alt, position)')
 *     .order('listed_at', { ascending: false })
 *   if (error) throw error
 *   return data
 */
let request: Promise<Vehicle[]> | undefined

export function fetchVehicles(): Promise<Vehicle[]> {
  // ponytail: local data + a short dev-only delay so skeleton states are visible; real latency replaces it.
  request ??= new Promise((resolve) => setTimeout(() => resolve(vehicles), import.meta.env.DEV ? 450 : 0))
  return request.catch((error) => {
    request = undefined // allow retry after a failed request
    throw error
  })
}

export type SortKey = 'newest' | 'price-asc' | 'price-desc' | 'year-desc'

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'year-desc', label: 'Year: Newest' },
]

/** Filter keys double as URL query params on /cars. */
export type InventoryFilters = Partial<
  Record<'q' | 'make' | 'model' | 'minYear' | 'maxYear' | 'minPrice' | 'maxPrice' | 'body' | 'transmission' | 'fuel', string>
> & { sort?: SortKey }

export const filterKeys = ['q', 'make', 'model', 'minYear', 'maxYear', 'minPrice', 'maxPrice', 'body', 'transmission', 'fuel'] as const

const statusRank = { available: 0, reserved: 1, sold: 2 }

const comparators: Record<SortKey, (a: Vehicle, b: Vehicle) => number> = {
  newest: (a, b) => (b.listedAt ?? '').localeCompare(a.listedAt ?? ''),
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  'year-desc': (a, b) => b.year - a.year,
}

export function filterVehicles(list: Vehicle[], f: InventoryFilters): Vehicle[] {
  const terms = (f.q ?? '').toLowerCase().split(/\s+/).filter(Boolean)
  const num = (s?: string) => (s ? Number(s) : undefined)
  const [minYear, maxYear, minPrice, maxPrice] = [num(f.minYear), num(f.maxYear), num(f.minPrice), num(f.maxPrice)]

  const matches = list.filter((v) => {
    const haystack = `${v.year} ${v.make} ${v.model} ${v.variant ?? ''}`.toLowerCase()
    return (
      terms.every((t) => haystack.includes(t)) &&
      (!f.make || v.make === f.make) &&
      (!f.model || v.model === f.model) &&
      (minYear == null || v.year >= minYear) &&
      (maxYear == null || v.year <= maxYear) &&
      (minPrice == null || v.price >= minPrice) &&
      (maxPrice == null || v.price <= maxPrice) &&
      (!f.body || v.bodyType === f.body) &&
      (!f.transmission || v.transmission === f.transmission) &&
      (!f.fuel || v.fuelType === f.fuel)
    )
  })
  const compare = comparators[f.sort ?? 'newest'] ?? comparators.newest
  // Sold units always sink to the bottom.
  return matches.sort((a, b) => statusRank[a.status] - statusRank[b.status] || compare(a, b))
}

const uniq = (values: (string | undefined)[]) => [...new Set(values.filter((v): v is string => !!v))].sort()

export function filterOptions(list: Vehicle[], make?: string) {
  const years = list.map((v) => v.year)
  return {
    makes: uniq(list.map((v) => v.make)),
    models: uniq(list.filter((v) => !make || v.make === make).map((v) => v.model)),
    bodyTypes: uniq(list.map((v) => v.bodyType)),
    transmissions: uniq(list.map((v) => v.transmission)),
    fuelTypes: uniq(list.map((v) => v.fuelType)),
    years: years.length
      ? Array.from({ length: Math.max(...years) - Math.min(...years) + 1 }, (_, i) => String(Math.max(...years) - i))
      : [],
  }
}

export const priceSteps = [500_000, 1_000_000, 1_500_000, 2_000_000, 3_000_000, 5_000_000, 10_000_000, 20_000_000]
