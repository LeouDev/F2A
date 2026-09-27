import { LegalPage } from '../components/blocks/LegalPage'

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      seoTitle="Privacy Policy | F2A Cars"
      description="How F2A Cars collects and uses the information you submit through this website."
      updated="September 27, 2026"
      sections={[
        {
          heading: 'Overview',
          body: <p>This notice explains how F2A Cars collects and uses personal information that you submit through this website.</p>,
        },
        {
          heading: 'Information you give us',
          body: (
            <ul>
              <li>Contact details such as your name, phone number and email address, and your preferred contact method.</li>
              <li>Details about vehicles you want to buy, sell, trade, consign or finance, including photos you choose to add.</li>
              <li>Any message you send us.</li>
            </ul>
          ),
        },
        {
          heading: 'How we use it',
          body: (
            <p>
              We use your information to respond to your inquiry — for example to answer questions about a car, prepare a quote, arrange a viewing,
              or discuss trade-in, consignment or financing options — and for after-sales communication about your transaction.
            </p>
          ),
        },
        {
          heading: 'Sharing',
          body: <p>Your information is shared only when needed to handle your request, or when required by law.</p>,
        },
        {
          heading: 'Third-party services',
          body: (
            <p>
              This website may load content from third-party services (for example fonts, images, maps, and links to Facebook). Those services have
              their own privacy policies.
            </p>
          ),
        },
        {
          heading: 'Your choices',
          body: (
            <p>
              You may ask F2A Cars to access, correct or delete the personal information you have submitted, subject to applicable Philippine law,
              including the Data Privacy Act of 2012 (Republic Act No. 10173). Contact us using the details below.
            </p>
          ),
        },
      ]}
    />
  )
}
