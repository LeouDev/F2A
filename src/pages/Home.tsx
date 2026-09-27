import { ClosingCTA } from '../components/blocks/ClosingCTA'
import { FollowF2A } from '../components/blocks/FollowF2A'
import { CustomerExperience } from '../components/home/CustomerExperience'
import { FeaturedCars } from '../components/home/FeaturedCars'
import { GallerySection } from '../components/home/GallerySection'
import { Hero } from '../components/home/Hero'
import { Services, ServicesMarquee } from '../components/home/Services'
import { TrustStrip } from '../components/home/TrustStrip'
import { VlogSpotlight } from '../components/home/VlogSpotlight'
import { WhyF2A } from '../components/home/WhyF2A'
import { SearchPanel } from '../components/vehicles/SearchPanel'
import { Seo } from '../lib/seo'

export default function Home() {
  return (
    <>
      <Seo title="F2A Cars | Quality Pre-Owned Cars in Quezon City" />
      <Hero />
      <div className="container-site relative z-10 -mt-24 sm:-mt-28">
        <SearchPanel />
      </div>
      <TrustStrip />
      <FeaturedCars />
      <ServicesMarquee />
      <Services />
      <WhyF2A />
      <VlogSpotlight />
      <GallerySection />
      <CustomerExperience />
      <FollowF2A index="07" />
      <ClosingCTA />
    </>
  )
}
