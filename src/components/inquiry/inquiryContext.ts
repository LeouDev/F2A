import { createContext, useContext } from 'react'
import type { Vehicle } from '../../data/vehicles'

export type InquiryIntent = 'inquiry' | 'viewing'

export type OpenInquiryOptions = { vehicle?: Vehicle | null; intent?: InquiryIntent }

type InquiryContextValue = {
  openInquiry: (options?: OpenInquiryOptions) => void
  /** Vehicle on the current detail page — used by the mobile action bar's INQUIRE button. */
  pageVehicle: Vehicle | null
  setPageVehicle: (vehicle: Vehicle | null) => void
}

// Kept in its own module so hot-reloading the provider doesn't recreate the context.
export const InquiryContext = createContext<InquiryContextValue | null>(null)

export function useInquiry() {
  const context = useContext(InquiryContext)
  if (!context) throw new Error('useInquiry must be used inside <InquiryProvider>')
  return context
}
