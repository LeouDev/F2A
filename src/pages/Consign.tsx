import { LeadSection } from '../components/blocks/LeadSection'
import { PageHero } from '../components/blocks/PageHero'
import { ProcessSteps } from '../components/blocks/ProcessSteps'
import { ConsentField, ContactFields, FormSection } from '../components/forms/ContactFields'
import { commonMakes, yearOptions } from '../components/forms/fields'
import { Button } from '../components/ui/Button'
import { Form, FormError, SelectField, SubmitButton, SuccessPanel, TextAreaField, TextField } from '../components/ui/Form'
import { Reveal } from '../components/ui/Reveal'
import { Eyebrow } from '../components/ui/Section'
import { images } from '../data/images'
import { Seo } from '../lib/seo'
import { submitForm, type ConsignmentRequestPayload } from '../lib/submissions'
import { useForm } from '../lib/useForm'

const steps = [
  { title: 'Submit your car', text: 'Send your car’s details and photos to F2A.' },
  { title: 'Vehicle review', text: 'F2A reviews your car’s details and condition.' },
  { title: 'Marketing', text: 'Your car is presented to potential buyers.' },
  { title: 'Customer inquiries', text: 'Buyer inquiries are handled and communicated to you.' },
  { title: 'Sale', text: 'Your car finds its next owner.' },
]

export default function Consign() {
  const form = useForm()

  return (
    <>
      <Seo title="Consign Your Car | F2A Cars" description="Let F2A Cars help you sell your car. Send a consignment inquiry to F2A in Timog, Quezon City." />
      <PageHero
        eyebrow="Consignment"
        title={['Let us help you', <>sell your car<span className="text-f2a">.</span></>]}
        subtitle="Consign your car with F2A — we help present it to buyers and handle the inquiries."
        image={images.heroes.consign}
      >
        <Button size="lg" arrow onClick={() => document.getElementById('consign')?.scrollIntoView({ behavior: 'smooth' })}>
          Inquire about consignment
        </Button>
      </PageHero>

      <section aria-labelledby="consign-how" className="border-b border-white/10 py-20 lg:py-28">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow index="01">How consignment works</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 id="consign-how" className="headline mt-6 text-[clamp(3rem,7vw,5.5rem)]">
                  Five steps.
                  <br />
                  <span className="text-f2a">One team.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
              <p className="text-lg leading-relaxed text-muted">
                With consignment, F2A helps you sell your car to a buyer — from reviewing your car to handling buyer inquiries. Consignment terms are
                discussed directly with F2A.
              </p>
            </Reveal>
          </div>
          <ProcessSteps steps={steps} className="mt-14 sm:grid-cols-2 lg:grid-cols-5" />
        </div>
      </section>

      <LeadSection
        id="consign"
        index="02"
        eyebrow="Consignment inquiry"
        title={
          <>
            Tell us about
            <br />
            your <span className="text-f2a">car.</span>
          </>
        }
        intro={<p>Share the basics and F2A will get in touch to discuss consigning your car.</p>}
      >
        {form.status === 'success' ? (
          <SuccessPanel
            actions={
              <Button to="/" variant="outline">
                Back to home
              </Button>
            }
          >
            <p>Your consignment inquiry has been received.</p>
            <p>F2A will contact you to discuss your car.</p>
          </SuccessPanel>
        ) : (
          <Form form={form} aria-label="Consignment inquiry" className="space-y-12" onValid={(d) => submitForm('consign', d as ConsignmentRequestPayload)}>
            <FormSection index="01" title="Your car">
              <SelectField name="year" label="Year" required options={yearOptions} />
              <TextField name="make" label="Make" required list="consign-makes" autoComplete="off" />
              <datalist id="consign-makes">
                {commonMakes.map((make) => (
                  <option key={make} value={make} />
                ))}
              </datalist>
              <TextField name="model" label="Model" required />
              <TextField name="mileage" label="Mileage (km)" type="number" inputMode="numeric" min={0} />
              <TextField name="askingPrice" label="Asking price (₱)" type="number" inputMode="numeric" min={0} hint="Optional" className="sm:col-span-2" />
              <TextAreaField name="message" label="Anything else?" placeholder="Condition, modifications, documents…" className="sm:col-span-2" />
            </FormSection>

            <FormSection index="02" title="Your details">
              <ContactFields />
              <ConsentField />
            </FormSection>

            <div className="space-y-4">
              <FormError />
              <SubmitButton className="w-full sm:w-auto">Inquire about consignment</SubmitButton>
            </div>
          </Form>
        )}
      </LeadSection>
    </>
  )
}
