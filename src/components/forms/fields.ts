import { formatPrice } from '../../lib/format'

/** Shared option lists for the sell / trade / consign / financing forms. */
export const commonMakes = [
  'Toyota', 'Mitsubishi', 'Nissan', 'Honda', 'Ford', 'Hyundai', 'Suzuki', 'Isuzu', 'Mazda', 'Kia', 'Chevrolet', 'Subaru',
  'BMW', 'Mercedes-Benz', 'Lexus', 'Audi', 'Porsche', 'Volkswagen', 'Land Rover', 'Jeep', 'Geely', 'MG',
]

const thisYear = new Date().getFullYear()
export const yearOptions = Array.from({ length: thisYear + 1 - 1990 + 1 }, (_, i) => String(thisYear + 1 - i))

export const transmissionOptions = ['Automatic', 'Manual', 'CVT', 'Other']
export const fuelOptions = ['Gasoline', 'Diesel', 'Hybrid', 'Electric']
export const conditionOptions = ['Excellent', 'Good', 'Fair', 'Needs work']

export const budgetOptions = [
  `Below ${formatPrice(1_000_000)}`,
  `${formatPrice(1_000_000)} – ${formatPrice(2_000_000)}`,
  `${formatPrice(2_000_000)} – ${formatPrice(3_000_000)}`,
  `${formatPrice(3_000_000)} – ${formatPrice(5_000_000)}`,
  `${formatPrice(5_000_000)} – ${formatPrice(10_000_000)}`,
  `Above ${formatPrice(10_000_000)}`,
]
