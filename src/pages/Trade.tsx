import { Link, useSearchParams } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import { LeadSection } from '../components/blocks/LeadSection'
import { PageHero } from '../components/blocks/PageHero'
import { ProcessSteps } from '../components/blocks/ProcessSteps'
import { ConsentField, ContactFields, FormSection } from '../components/forms/ContactFields'
import { budgetOptions, commonMakes, conditionOptions, yearOptions } from '../components/forms/fields'
import { Button } from '../components/ui/Button'
import { Form, FormError, SelectField, SubmitButton, SuccessPanel, TextField } from '../components/ui/Form'
import { images } from '../data/images'
import { vehicleName } from '../lib/format'
import { fetchVehicles } from '../lib/inventory'
import { Seo } from '../lib/seo'
import { submitForm, type TradeRequestPayload } from '../lib/submissions'
import { useAsync } from '../lib/useAsync'
import { useForm } from '../lib/useForm'

const steps = [
  { title: 'Tell us about your car', text: 'Share your current car’s details and condition.' },
  { title: 'Pick your next ride', text: 'Choose from the cars available at F2A — or tell us what you’re looking for.' },
  { title: 'Talk it through', text: 'F2A reviews your car and discusses the trade-in with you directly.' },
]

export default function Trade() {
  const [params] = useSearchParams()
  const { data } = useAsync(fetchVehicles)
  const form = useForm()
  const preselected = data?.find((v) => v.id === params.get('vehicle'))
  const vehicleOptions = [...(data ?? []).filter((v) => v.status !== 'sold').map(vehicleName), 'Not sure yet', 'Something not listed']

  return (
    <>
      <Seo title="Trade-In | F2A Cars" description="Ready to upgrade? Trade your current car for your next ride with F2A Cars in Timog, Quezon City." />
      <PageHero
        eyebrow="Trade-in"
        title={['Ready to', <>upgrade<span className="text-f2a">?</span></>]}
        subtitle="Trade your current car for your next ride."
        image={images.heroes.trade}
      >
        <Button size="lg" arrow onClick={() => document.getElementById('trade')?.scrollIntoView({ behavior: 'smooth' })}>
          Start my trade-in
        </Button>
      </PageHero>

      <section aria-label="How trade-ins work" className="border-b border-white/10 py-20 lg:py-28">
        <div className="container-site">
          <ProcessSteps steps={steps} className="md:grid-cols-3" />
          <p className="mt-6 text-sm text-white/50">Trade-in values and terms are discussed directly with F2A after reviewing your car.</p>
        </div>
      </section>

      <LeadSection
        id="trade"
        index="01"
        eyebrow="Start your trade-in"
        title={
          <>
            Your car in.
            <br />
            <span className="text-f2a">Next ride out.</span>
          </>
        }
        intro={<p>Tell F2A about the car you have and the car you want. We’ll get in touch to talk it through.</p>}
        aside={
          <Link to="/consign" className="group flex items-center justify-between gap-4 border border-white/10 bg-carbon p-6 transition-colors hover:border-white/30">
            <span>
              <span className="eyebrow block text-f2a-hot">Prefer to consign?</span>
              <span className="headline mt-2 block text-3xl">Let F2A help sell your car</span>
            </span>
            <ArrowUpRight className="size-6 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden />
          </Link>
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
            <p>Your trade-in request has been received.</p>
            <p>F2A will contact you to talk about your current car and your next ride.</p>
          </SuccessPanel>
        ) : (
          <Form form={form} aria-label="Trade-in request" className="space-y-12" onValid={(d) => submitForm('trade', d as TradeRequestPayload)}>
            <FormSection index="01" title="Your current car">
              <SelectField name="currentYear" label="Year" required options={yearOptions} />
              <TextField name="currentMake" label="Make" required list="trade-makes" autoComplete="off" />
              <datalist id="trade-makes">
                {commonMakes.map((make) => (
                  <option key={make} value={make} />
                ))}
              </datalist>
              <TextField name="currentModel" label="Model" required />
              <TextField name="currentMileage" label="Mileage (km)" type="number" inputMode="numeric" min={0} />
              <SelectField name="currentCondition" label="Condition" options={conditionOptions} className="sm:col-span-2" />
            </FormSection>

            <FormSection index="02" title="Your next ride">
              <SelectField
                key={data ? 'ready' : 'loading'}
                name="desiredVehicle"
                label="Desired vehicle"
                options={vehicleOptions}
                defaultValue={preselected ? vehicleName(preselected) : ''}
              />
              <SelectField name="budget" label="Budget" options={budgetOptions} />
            </FormSection>

            <FormSection index="03" title="Your details">
              <ContactFields />
              <ConsentField />
            </FormSection>

            <div className="space-y-4">
              <FormError />
              <SubmitButton className="w-full sm:w-auto">Start my trade-in</SubmitButton>
            </div>
          </Form>
        )}
      </LeadSection>
    </>
  )
}
