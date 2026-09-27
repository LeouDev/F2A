import { Link } from 'react-router'
import { X } from 'lucide-react'
import type { Vehicle } from '../../data/vehicles'
import { vehicleName, vehicleTitle } from '../../lib/format'
import { submitForm, type InquiryPayload } from '../../lib/submissions'
import { useForm } from '../../lib/useForm'
import { ContactFields } from '../forms/ContactFields'
import { Button } from '../ui/Button'
import { Form, FormError, SelectField, SubmitButton, SuccessPanel, TextAreaField, TextField } from '../ui/Form'
import type { InquiryIntent } from './inquiryContext'

const today = () => {
  const now = new Date()
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10)
}

export function InquiryForm({ vehicle, intent, onClose }: { vehicle: Vehicle | null; intent: InquiryIntent; onClose: () => void }) {
  const form = useForm()
  const viewing = intent === 'viewing'
  const vehicleLabel = vehicle ? vehicleName(vehicle) : ''

  return (
    <div>
      <header className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-white/10 bg-carbon/95 px-6 py-5 backdrop-blur-md sm:px-8">
        <div className="min-w-0">
          <p className="eyebrow text-f2a-hot">{viewing ? 'Schedule a viewing' : vehicle ? 'Vehicle inquiry' : 'Inquire now'}</p>
          <h2 id="inquiry-title" className="headline mt-2 truncate text-4xl sm:text-5xl">
            {vehicle ? vehicleTitle(vehicle) : 'Talk to F2A'}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex size-11 shrink-0 items-center justify-center border border-white/15 transition-colors hover:border-white"
        >
          <X className="size-5" aria-hidden />
        </button>
      </header>

      <div className="px-6 py-7 sm:px-8 sm:py-8">
        {form.status === 'success' ? (
          <SuccessPanel
            actions={
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            }
          >
            <p>Your inquiry has been received.</p>
            <p>We will contact you regarding {vehicle ? 'the vehicle' : 'your inquiry'}.</p>
          </SuccessPanel>
        ) : (
          <Form
            form={form}
            aria-label={viewing ? 'Schedule a viewing' : 'Vehicle inquiry'}
            className="grid gap-5 sm:grid-cols-2"
            onValid={(data) => submitForm('inquiry', { ...data, intent, vehicleId: vehicle?.id } as InquiryPayload)}
          >
            <ContactFields />
            <TextField name="vehicle" label="Vehicle" defaultValue={vehicleLabel} placeholder="Which car are you interested in?" className="sm:col-span-2" />
            {viewing && (
              <>
                <TextField name="preferredDate" label="Preferred date" type="date" min={today()} required />
                <SelectField name="preferredTime" label="Preferred time" options={['Morning', 'Afternoon', 'Evening']} placeholder="Any time" />
              </>
            )}
            <TextAreaField
              name="message"
              label="Message"
              className="sm:col-span-2"
              defaultValue={viewing ? 'I’d like to schedule a viewing.' : undefined}
              placeholder="Questions about the car, trade-in, financing…"
            />
            <div className="space-y-4 pt-2 sm:col-span-2">
              <FormError />
              <SubmitButton className="w-full">Send inquiry</SubmitButton>
              <p className="text-xs leading-relaxed text-muted">
                By sending, you agree to be contacted by F2A Cars about this inquiry. See our{' '}
                <Link to="/privacy" onClick={onClose} className="text-white underline underline-offset-4">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </Form>
        )}
      </div>
    </div>
  )
}
