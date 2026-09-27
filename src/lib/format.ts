const peso = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})
const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })
const integer = new Intl.NumberFormat('en-PH')

export const formatPrice = (value: number) => peso.format(value)

/** ₱1.5M, ₱500K */
export const formatCompactPrice = (value: number) => `₱${compact.format(value)}`

export const formatMileage = (km?: number) => (km == null ? '—' : `${integer.format(km)} km`)

/** ISO date (YYYY-MM-DD) → "Sep 27, 2026" */
export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })

export const vehicleTitle = (v: { year: number; make: string; model: string }) => `${v.year} ${v.make} ${v.model}`

/** Title + variant, e.g. "2019 Ford Mustang GT 5.0 Fastback" */
export const vehicleName = (v: { year: number; make: string; model: string; variant?: string }) =>
  [vehicleTitle(v), v.variant].filter(Boolean).join(' ')
