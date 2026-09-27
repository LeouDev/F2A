import { LegalPage } from '../components/blocks/LegalPage'

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Use"
      seoTitle="Terms of Use | F2A Cars"
      description="Terms for using the F2A Cars website."
      updated="September 27, 2026"
      sections={[
        {
          heading: 'Using this website',
          body: <p>By using this website you agree to these terms. If you do not agree, please do not use the site.</p>,
        },
        {
          heading: 'Vehicle listings',
          body: (
            <p>
              Listings, photos, prices and specifications are provided for general information and may change without notice. A vehicle’s
              availability, price and condition are confirmed only by F2A Cars directly. Please verify all details with F2A before making a decision.
            </p>
          ),
        },
        {
          heading: 'Inquiries and requests',
          body: (
            <p>
              Submitting an inquiry, quote request, trade-in, consignment or financing form does not create a contract or reservation. Trade-in
              values, consignment terms and financing options are discussed and agreed directly with F2A Cars. Financing inquiries do not guarantee
              approval.
            </p>
          ),
        },
        {
          heading: 'Content and brand',
          body: <p>The F2A Cars name, logo, F2A Vlogs and website content belong to their respective owners and may not be reused without permission.</p>,
        },
        {
          heading: 'Third-party links',
          body: <p>This website links to third-party sites such as Facebook. F2A Cars is not responsible for the content or practices of those sites.</p>,
        },
        {
          heading: 'Changes',
          body: <p>F2A Cars may update these terms from time to time. The date above shows when they were last updated.</p>,
        },
      ]}
    />
  )
}
