import { useSearchParams } from 'react-router'
import { Mail, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react'
import { LeadSection } from '../components/blocks/LeadSection'
import { PageHero } from '../components/blocks/PageHero'
import { ConsentField, ContactFields } from '../components/forms/ContactFields'
import { Button } from '../components/ui/Button'
import { Form, FormError, SelectField, SubmitButton, SuccessPanel, TextAreaField } from '../components/ui/Form'
import { Reveal } from '../components/ui/Reveal'
import { images } from '../data/images'
import { site } from '../data/site'
import { Seo } from '../lib/seo'
import { submitForm, type ContactPayload } from '../lib/submissions'
import { useForm } from '../lib/useForm'

const interests = ['Buy a Car', 'Sell My Car', 'Trade', 'Consign', 'Financing', 'General Inquiry']
const mapsKey = import.meta.env.VITE_GOOGLE_MAPS_EMBED_KEY

function MapBlock() {
  const query = encodeURIComponent(`${site.name}, ${site.address.lines.join(', ')}`)
  return (
    <div className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-carbon sm:aspect-[16/7]">
      {mapsKey ? (
        <iframe
          title={`Map: ${site.name}, ${site.address.lines.join(', ')}`}
          src={`https://www.google.com/maps/embed/v1/place?key=${mapsKey}&q=${query}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0 grayscale invert-[0.92] contrast-[0.9]"
        />
      ) : (
        // Placeholder until a Maps key is configured — no coordinates are assumed.
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-6 text-center [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:48px_48px]">
          <span className="relative flex size-16 items-center justify-center rounded-full bg-f2a">
            <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-f2a/50 [animation-duration:2.4s]" />
            <MapPin className="relative size-7" aria-hidden />
          </span>
          <div>
            <p className="headline text-4xl sm:text-5xl">{site.address.lines[0]}</p>
            <p className="mt-2 text-muted">{site.address.lines.slice(1).join(', ')}</p>
          </div>
          <Button href={site.mapsUrl} variant="outline" icon={<Navigation className="size-4" aria-hidden />}>
            Open in Google Maps
          </Button>
        </div>
      )}
    </div>
  )
}

export default function Contact() {
  const [params] = useSearchParams()
  const form = useForm()
  const topic = params.get('topic')

  const channels = [
    { icon: MapPin, label: 'Location', value: [site.name, ...site.address.lines].join('\n'), href: site.mapsUrl, cta: 'Get directions' },
    { icon: Phone, label: 'Phone', value: site.phone.display, href: site.phone.href, cta: 'Call F2A' },
    { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}`, cta: 'Email F2A' },
    { icon: MessageCircle, label: 'Messenger', value: 'F2A CARS on Facebook', href: site.messenger, cta: 'Message F2A' },
  ]

  return (
    <>
      <Seo title="Contact F2A Cars | Timog, Quezon City" description={`Talk to F2A Cars in Timog, Quezon City. Call ${site.phone.display}, email ${site.email} or message F2A on Facebook.`} />
      <PageHero eyebrow="Contact" title={['Let’s talk', <>cars<span className="text-f2a">.</span></>]} subtitle="Buying, selling, trading or consigning — reach F2A Cars directly." image={images.heroes.contact}>
        <div className="flex flex-wrap gap-3">
          <Button href={site.phone.href} size="lg" icon={<Phone className="size-4" aria-hidden />}>
            Call F2A
          </Button>
          <Button href={`mailto:${site.email}`} size="lg" variant="outline" icon={<Mail className="size-4" aria-hidden />}>
            Email F2A
          </Button>
          <Button href={site.messenger} size="lg" variant="outline" icon={<MessageCircle className="size-4" aria-hidden />}>
            Message F2A
          </Button>
        </div>
      </PageHero>

      <section aria-label="Contact details" className="border-b border-white/10 py-16 lg:py-24">
        <div className="container-site">
          <ul className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map(({ icon: Icon, label, value, href, cta }, i) => (
              <li key={label} className="bg-ink">
                <Reveal delay={i * 0.06} className="h-full">
                  <a
                    href={href}
                    {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                    className="group flex h-full flex-col gap-6 p-6 transition-colors hover:bg-carbon sm:p-8"
                  >
                    <Icon className="size-6 text-f2a-hot" aria-hidden />
                    <span>
                      <span className="eyebrow block text-white/45">{label}</span>
                      <span className="mt-2 block whitespace-pre-line break-words text-lg text-white">{value}</span>
                    </span>
                    <span className="eyebrow mt-auto text-white/70 transition-colors group-hover:text-f2a-hot">{cta} →</span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal className="mt-4">
            <MapBlock />
          </Reveal>
        </div>
      </section>

      <LeadSection
        id="message"
        index="01"
        eyebrow="Send a message"
        title={
          <>
            Drop us
            <br />a <span className="text-f2a">line.</span>
          </>
        }
        intro={<p>Tell F2A what you’re looking for and how you’d like to be contacted.</p>}
      >
        {form.status === 'success' ? (
          <SuccessPanel
            title="Message sent."
            actions={
              <Button to="/cars" arrow>
                Browse cars
              </Button>
            }
          >
            <p>Thank you for contacting F2A Cars.</p>
          </SuccessPanel>
        ) : (
          <Form form={form} aria-label="Contact F2A" className="grid gap-5 sm:grid-cols-2" onValid={(d) => submitForm('contact', d as ContactPayload)}>
            <ContactFields />
            <SelectField
              name="interest"
              label="Interested in"
              required
              options={interests}
              defaultValue={interests.find((i) => i.toLowerCase() === topic?.toLowerCase()) ?? ''}
              className="sm:col-span-2"
            />
            <TextAreaField name="message" label="Message" className="sm:col-span-2" placeholder="How can F2A help?" />
            <ConsentField />
            <div className="space-y-4 sm:col-span-2">
              <FormError />
              <SubmitButton className="w-full sm:w-auto">Send message</SubmitButton>
            </div>
          </Form>
        )}
      </LeadSection>
    </>
  )
}
