import { useCallback, useMemo, useState, type ReactNode } from 'react'
import type { Vehicle } from '../../data/vehicles'
import { Dialog } from '../ui/Dialog'
import { InquiryContext, type OpenInquiryOptions } from './inquiryContext'
import { InquiryForm } from './InquiryForm'

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<OpenInquiryOptions>({})
  const [session, setSession] = useState(0)
  const [pageVehicle, setPageVehicle] = useState<Vehicle | null>(null)

  const openInquiry = useCallback((next: OpenInquiryOptions = {}) => {
    setOptions(next)
    setSession((s) => s + 1)
    setOpen(true)
  }, [])

  const value = useMemo(() => ({ openInquiry, pageVehicle, setPageVehicle }), [openInquiry, pageVehicle])
  const close = () => setOpen(false)

  return (
    <InquiryContext.Provider value={value}>
      {children}
      <Dialog open={open} onClose={close} labelledBy="inquiry-title">
        <InquiryForm key={session} vehicle={options.vehicle ?? null} intent={options.intent ?? 'inquiry'} onClose={close} />
      </Dialog>
    </InquiryContext.Provider>
  )
}
