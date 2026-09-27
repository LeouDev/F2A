/**
 * Mirrors the future Supabase `testimonials` table.
 * ⚠️ Placeholders only — never invent customer quotes. Add real testimonials
 * (with the customer's permission) and delete these entries.
 */
export type Testimonial = {
  id: string
  quote: string
  name: string
  vehicle?: string
  source?: string
  placeholder?: boolean
}

export const testimonials: Testimonial[] = [
  { id: 'placeholder-1', quote: 'Customer testimonial placeholder', name: 'Customer name', vehicle: 'Vehicle', placeholder: true },
  { id: 'placeholder-2', quote: 'Customer testimonial placeholder', name: 'Customer name', vehicle: 'Vehicle', placeholder: true },
  { id: 'placeholder-3', quote: 'Customer testimonial placeholder', name: 'Customer name', vehicle: 'Vehicle', placeholder: true },
]
