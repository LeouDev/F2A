import { useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import type { ContactMethod } from '../../lib/submissions'
import { CheckboxField, ChoiceField, TextField } from '../ui/Form'

export const PHONE_PATTERN = '[0-9+\\(\\)\\s\\-]{7,20}'
export const contactMethods: ContactMethod[] = ['Call', 'Text', 'Messenger', 'Email']

/** Name / phone / email / preferred contact — shared by every lead form (2-column grid parent). */
export function ContactFields() {
  const [method, setMethod] = useState('Call')
  return (
    <>
      <TextField name="name" label="Name" required autoComplete="name" className="sm:col-span-2" />
      <TextField
        name="phone"
        label="Phone"
        type="tel"
        inputMode="tel"
        required
        autoComplete="tel"
        placeholder="09XX XXX XXXX"
        pattern={PHONE_PATTERN}
        data-error="Enter a valid phone number."
      />
      <TextField
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        required={method === 'Email'}
        hint={method === 'Email' ? 'Required for email replies.' : undefined}
      />
      <ChoiceField name="preferredContact" label="Preferred contact method" options={contactMethods} defaultValue="Call" onChange={setMethod} className="sm:col-span-2" />
    </>
  )
}

export function ConsentField({ children }: { children?: ReactNode }) {
  return (
    <CheckboxField name="consent" required className="sm:col-span-2">
      {children ?? 'I agree to be contacted by F2A Cars about this request.'} See the{' '}
      <Link to="/privacy" className="text-white underline underline-offset-4">
        Privacy Policy
      </Link>
      .
    </CheckboxField>
  )
}

export function FormSection({ title, index, children }: { title: string; index?: string; children: ReactNode }) {
  return (
    <fieldset className="grid min-w-0 gap-5 sm:grid-cols-2">
      <legend className="mb-6 flex items-baseline gap-3">
        {index && <span className="eyebrow text-f2a-hot">{index}</span>}
        <span className="headline text-3xl sm:text-4xl">{title}</span>
      </legend>
      {children}
    </fieldset>
  )
}
