import { useSearchParams } from 'react-router'
import { Info } from 'lucide-react'
import { LeadSection } from '../components/blocks/LeadSection'
import { PageHero } from '../components/blocks/PageHero'
import { ProcessSteps } from '../components/blocks/ProcessSteps'
import { ConsentField, ContactFields, FormSection } from '../components/forms/ContactFields'
import { Button } from '../components/ui/Button'
import { Form, FormError, SelectField, SubmitButton, SuccessPanel, TextField } from '../components/ui/Form'
import { images } from '../data/images'
import { vehicleName } from '../lib/format'
import { fetchVehicles } from '../lib/inventory'
import { Seo } from '../lib/seo'
import { submitForm, type FinancingRequestPayload } from '../lib/submissions'
import { useAsync } from '../lib/useAsync'
import { useForm } from '../lib/useForm'

const NOTE = 'Financing options may be available for selected vehicles. Submit an inquiry to discuss your options.'

const steps = [
  { title: 'Choose a car', text: 'Browse the available cars, or tell us what you’re looking for.' },
  { title: 'Send an inquiry', text: 'Share your estimated down payment and preferred term.' },
  { title: 'Discuss your options', text: 'F2A contacts you to talk through the financing options that may be available.' },
]

export default function Financing() {
  const [params] = useSearchParams()
  const { data } = useAsync(fetchVehicles)
  const form = useForm()
  const preselected = data?.find((v) => v.id === params.get('vehicle'))
  const vehicleOptions = [...(data ?? []).filter((v) => v.status !== 'sold' && v.financingAvailable !== false).map(vehicleName), 'Not sure yet']

  return (
    <>
      <Seo title="Financing | F2A Cars" description={`${NOTE} F2A Cars, Timog, Quezon City.`} />
      <PageHero
        eyebrow="Financing"
        title={['Make your next car', <>more achievable<span className="text-f2a">.</span></>]}
        subtitle={NOTE}
        image={images.heroes.financing}
      >
        <Button size="lg" arrow onClick={() => document.getElementById('financing')?.scrollIntoView({ behavior: 'smooth' })}>
          Check financing options
        </Button>
      </PageHero>

      <section aria-label="How financing inquiries work" className="border-b border-white/10 py-20 lg:py-28">
        <div className="container-site">
          <ProcessSteps steps={steps} className="md:grid-cols-3" />
        </div>
      </section>

      <LeadSection
        id="financing"
        index="01"
        eyebrow="Financing inquiry"
        title={
          <>
            Let’s talk
            <br />
            <span className="text-f2a">options.</span>
          </>
        }
        intro={<p>{NOTE}</p>}
        aside={
          <p className="flex gap-3 border border-white/10 bg-carbon p-5 text-sm leading-relaxed text-white/65">
            <Info className="mt-0.5 size-4 shrink-0 text-f2a-hot" aria-hidden />
            This is an inquiry, not a loan application. Submitting it does not guarantee financing or approval.
          </p>
        }
      >
        {form.status === 'success' ? (
          <SuccessPanel
            actions={
              <Button to="/cars" arrow>
                Browse cars
              </Button>
            }
          >
            <p>Your financing inquiry has been received.</p>
            <p>F2A will contact you to discuss your options.</p>
          </SuccessPanel>
        ) : (
          <Form form={form} aria-label="Financing inquiry" className="space-y-12" onValid={(d) => submitForm('financing', d as FinancingRequestPayload)}>
            <FormSection index="01" title="Your details">
              <ContactFields />
            </FormSection>

            <FormSection index="02" title="Your plan">
              <SelectField
                key={data ? 'ready' : 'loading'}
                name="vehicle"
                label="Vehicle interested in"
                options={vehicleOptions}
                defaultValue={preselected ? vehicleName(preselected) : ''}
                className="sm:col-span-2"
              />
              <TextField name="downPayment" label="Estimated down payment (₱)" type="number" inputMode="numeric" min={0} step={1000} placeholder="e.g. 500000" />
              <SelectField name="preferredTerm" label="Preferred term" options={['12 months', '24 months', '36 months', '48 months', '60 months', 'Not sure yet']} />
              <ConsentField />
            </FormSection>

            <div className="space-y-4">
              <FormError />
              <SubmitButton className="w-full sm:w-auto">Check financing options</SubmitButton>
            </div>
          </Form>
        )}
      </LeadSection>
    </>
  )
}
