import { useEffect, useRef, useState } from 'react'
import { m } from 'framer-motion'
import { ArrowLeft, Camera, X } from 'lucide-react'
import { cn } from '../../lib/cn'
import { submitForm, type SellRequestPayload } from '../../lib/submissions'
import { readForm, useForm } from '../../lib/useForm'
import { Button } from '../ui/Button'
import { ChoiceField, Form, FormError, SelectField, SubmitButton, SuccessPanel, TextField } from '../ui/Form'
import { ease } from '../ui/Reveal'
import { ConsentField, ContactFields } from './ContactFields'
import { commonMakes, conditionOptions, fuelOptions, transmissionOptions, yearOptions } from './fields'

const steps = ['Your car', 'Condition', 'Photos', 'Contact', 'Submit'] as const
const photoSlots = ['Front', 'Rear', 'Side', 'Interior', 'Dashboard', 'Engine'] as const
type PhotoSlot = (typeof photoSlots)[number]
type Photo = { file: File; url: string }

const summaryLabels: Record<string, string> = {
  year: 'Year',
  make: 'Make',
  model: 'Model',
  variant: 'Variant',
  mileage: 'Mileage (km)',
  transmission: 'Transmission',
  fuelType: 'Fuel type',
  condition: 'Overall condition',
  accidentHistory: 'Accident history',
  floodHistory: 'Flood history',
  serviceHistory: 'Service history',
  name: 'Name',
  phone: 'Phone',
  email: 'Email',
  preferredContact: 'Preferred contact',
}

/** 5-step "Sell your car" form. All steps stay mounted (hidden) so values persist; each step validates before continuing. */
export function SellForm() {
  const form = useForm()
  const [step, setStep] = useState(0)
  const [photos, setPhotos] = useState<Partial<Record<PhotoSlot, Photo>>>({})
  const [summary, setSummary] = useState<Record<string, string>>({})
  const fieldsets = useRef<(HTMLFieldSetElement | null)[]>([])
  const top = useRef<HTMLDivElement>(null)
  const photoUrls = useRef<string[]>([])
  const last = steps.length - 1

  useEffect(() => () => photoUrls.current.forEach((url) => URL.revokeObjectURL(url)), [])

  const goTo = (target: number) => {
    setStep(target)
    top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    requestAnimationFrame(() => top.current?.focus({ preventScroll: true }))
  }

  const next = () => {
    const current = fieldsets.current[step]
    if (!current || !form.validate(current)) return
    if (step === last - 1 && current.form) setSummary(readForm(current.form))
    goTo(Math.min(step + 1, last))
  }

  const addPhoto = (slot: PhotoSlot, file?: File) => {
    if (!file || !file.type.startsWith('image/')) return
    const url = URL.createObjectURL(file)
    photoUrls.current.push(url)
    setPhotos((current) => ({ ...current, [slot]: { file, url } }))
  }

  const removePhoto = (slot: PhotoSlot) =>
    setPhotos((current) => {
      const next = { ...current }
      delete next[slot]
      return next
    })

  if (form.status === 'success') {
    return (
      <div className="border border-white/10 bg-carbon p-6 sm:p-10">
        <SuccessPanel
          actions={
            <>
              <Button to="/cars" arrow>
                Browse cars
              </Button>
              <Button to="/" variant="outline">
                Back to home
              </Button>
            </>
          }
        >
          <p>Your car details have been received.</p>
          <p>F2A will contact you about your car.</p>
        </SuccessPanel>
      </div>
    )
  }

  const photoCount = Object.keys(photos).length

  return (
    <div ref={top} tabIndex={-1} className="scroll-mt-28 border border-white/10 bg-carbon outline-none">
      {/* Progress */}
      <div className="border-b border-white/10 p-6 sm:px-10 sm:py-8">
        <ol className="grid grid-cols-5 gap-2">
          {steps.map((label, i) => (
            <li key={label} aria-current={i === step ? 'step' : undefined}>
              <span className={cn('block h-1 transition-colors duration-500', i <= step ? 'bg-f2a' : 'bg-white/15')} />
              <span className={cn('eyebrow mt-3 hidden text-[10px] sm:block', i === step ? 'text-white' : 'text-white/40')}>
                {String(i + 1).padStart(2, '0')} {label}
              </span>
            </li>
          ))}
        </ol>
        <p className="eyebrow mt-4 text-white/60 sm:hidden">
          Step {step + 1} of {steps.length} — {steps[step]}
        </p>
      </div>

      <Form
        form={form}
        aria-label="Sell your car"
        className="p-6 sm:p-10"
        beforeSubmit={() => {
          if (step === last) return true
          next()
          return false
        }}
        onValid={(data) => submitForm('sell', { ...data, photos: Object.values(photos).map((p) => p!.file.name) } as SellRequestPayload)}
      >
        {steps.map((label, i) => (
          <m.fieldset
            key={label}
            ref={(el: HTMLFieldSetElement | null) => {
              fieldsets.current[i] = el
            }}
            hidden={i !== step}
            animate={i === step ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            transition={{ duration: 0.5, ease }}
            className="grid min-w-0 gap-5 sm:grid-cols-2"
          >
            <legend className="mb-8 flex items-baseline gap-3">
              <span className="eyebrow text-f2a-hot">{String(i + 1).padStart(2, '0')}</span>
              <span className="headline text-4xl sm:text-5xl">{label}</span>
            </legend>

            {i === 0 && (
              <>
                <TextField name="make" label="Make" required list="sell-makes" autoComplete="off" placeholder="e.g. Toyota" />
                <datalist id="sell-makes">
                  {commonMakes.map((make) => (
                    <option key={make} value={make} />
                  ))}
                </datalist>
                <TextField name="model" label="Model" required placeholder="e.g. Fortuner" />
                <SelectField name="year" label="Year" required options={yearOptions} />
                <TextField name="variant" label="Variant" placeholder="e.g. 2.8 Q 4x4" />
                <TextField name="mileage" label="Mileage (km)" type="number" inputMode="numeric" min={0} step={1} placeholder="e.g. 45000" />
                <SelectField name="transmission" label="Transmission" options={transmissionOptions} />
                <SelectField name="fuelType" label="Fuel type" options={fuelOptions} />
              </>
            )}

            {i === 1 && (
              <>
                <ChoiceField name="condition" label="Overall condition" options={conditionOptions} required className="sm:col-span-2" />
                <ChoiceField name="accidentHistory" label="Accident history" options={['No accidents', 'Minor', 'Major', 'Not sure']} required className="sm:col-span-2" />
                <ChoiceField name="floodHistory" label="Flood history" options={['No', 'Yes', 'Not sure']} required className="sm:col-span-2" />
                <SelectField name="serviceHistory" label="Service history" options={['Complete records', 'Partial records', 'No records', 'Not sure']} className="sm:col-span-2" />
              </>
            )}

            {i === 2 && (
              <div className="sm:col-span-2">
                <p className="max-w-xl text-muted">Clear photos help F2A review your car. Add as many as you can — they’re optional.</p>
                <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                  {photoSlots.map((slot) => {
                    const photo = photos[slot]
                    return (
                      <div key={slot} className="relative aspect-[4/3] overflow-hidden border border-dashed border-white/20 bg-white/[0.02]">
                        {photo ? (
                          <>
                            <img src={photo.url} alt={`${slot} photo preview`} className="size-full object-cover" />
                            <span className="eyebrow absolute bottom-2 left-2 bg-black/70 px-2 py-1 text-[10px]">{slot}</span>
                            <button
                              type="button"
                              onClick={() => removePhoto(slot)}
                              aria-label={`Remove ${slot.toLowerCase()} photo`}
                              className="absolute right-2 top-2 flex size-9 items-center justify-center bg-black/70 transition-colors hover:bg-f2a"
                            >
                              <X className="size-4" aria-hidden />
                            </button>
                          </>
                        ) : (
                          <label className="flex size-full cursor-pointer flex-col items-center justify-center gap-2 text-white/55 transition-colors hover:bg-white/[0.04] hover:text-white focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-f2a-hot">
                            <Camera className="size-6" aria-hidden />
                            <span className="eyebrow text-[10px]">{slot}</span>
                            <span className="text-xs text-white/40">Add photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              aria-label={`Upload ${slot.toLowerCase()} photo`}
                              onChange={(e) => addPhoto(slot, e.target.files?.[0])}
                            />
                          </label>
                        )}
                      </div>
                    )
                  })}
                </div>
                <p className="mt-4 text-sm text-white/45">{photoCount} of {photoSlots.length} photos added</p>
              </div>
            )}

            {i === 3 && <ContactFields />}

            {i === 4 && (
              <>
                <div className="sm:col-span-2">
                  <p className="text-muted">Review your details before submitting.</p>
                  <dl className="mt-6 grid gap-x-10 sm:grid-cols-2">
                    {Object.entries(summaryLabels)
                      .filter(([key]) => summary[key])
                      .map(([key, label]) => (
                        <div key={key} className="flex justify-between gap-6 border-b border-white/10 py-3 text-sm">
                          <dt className="text-white/50">{label}</dt>
                          <dd className="text-right text-white">{summary[key]}</dd>
                        </div>
                      ))}
                    <div className="flex justify-between gap-6 border-b border-white/10 py-3 text-sm">
                      <dt className="text-white/50">Photos</dt>
                      <dd className="text-right text-white">{photoCount}</dd>
                    </div>
                  </dl>
                </div>
                <ConsentField />
              </>
            )}
          </m.fieldset>
        ))}

        <div className="mt-10 space-y-4">
          <FormError />
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            {step > 0 ? (
              <Button variant="ghost" onClick={() => goTo(step - 1)} icon={<ArrowLeft className="size-4" aria-hidden />}>
                Back
              </Button>
            ) : (
              <span />
            )}
            {step < last ? (
              <Button size="lg" arrow onClick={next}>
                Continue
              </Button>
            ) : (
              <SubmitButton>Submit my car</SubmitButton>
            )}
          </div>
        </div>
      </Form>
    </div>
  )
}
