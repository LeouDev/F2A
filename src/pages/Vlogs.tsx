import { useState } from 'react'
import { m } from 'framer-motion'
import { Clapperboard } from 'lucide-react'
import { FollowF2A } from '../components/blocks/FollowF2A'
import { PageHero } from '../components/blocks/PageHero'
import { VlogSpotlight } from '../components/home/VlogSpotlight'
import { VlogCard } from '../components/media/Cards'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/ui/Section'
import { StateMessage } from '../components/ui/States'
import { images } from '../data/images'
import { BrandIcon } from '../components/ui/Icons'
import { site, socialLinks } from '../data/site'
import { vlogCategories, vlogs, type VlogCategory } from '../data/vlogs'
import { cn } from '../lib/cn'
import { Seo } from '../lib/seo'

type Filter = VlogCategory | 'All'

export default function Vlogs() {
  const [filter, setFilter] = useState<Filter>('All')
  const episodes = filter === 'All' ? vlogs : vlogs.filter((vlog) => vlog.category === filter)

  return (
    <>
      <Seo
        title="F2A Vlogs | F2A Cars"
        description="The F2A experience — cars, stories, people and deals. Watch F2A Vlogs, car features and customer releases from F2A Cars."
      />
      <PageHero
        eyebrow="F2A Vlogs"
        title={['The F2A', <>experience<span className="text-f2a">.</span></>]}
        subtitle="Cars. Stories. People. Deals."
        image={images.heroes.vlogs}
      />

      <VlogSpotlight index="01" />

      <section aria-labelledby="episodes-title" className="py-20 sm:py-24 lg:py-32">
        <div className="container-site">
          <SectionHeader
            index="02"
            eyebrow="Watch"
            id="episodes-title"
            title={
              <>
                Latest
                <br />
                episodes<span className="text-f2a">.</span>
              </>
            }
            subtitle="Vlogs, car reviews, new arrivals, customer releases and special features from the F2A channel."
            action={
              <div className="flex flex-wrap gap-3">
                <Button href={site.facebook} variant="outline" icon={<BrandIcon name="facebook" className="size-4" />}>
                  Facebook
                </Button>
                {socialLinks.youtube && (
                  <Button href={socialLinks.youtube} variant="outline" icon={<BrandIcon name="youtube" className="size-4" />}>
                    YouTube
                  </Button>
                )}
              </div>
            }
          />

          <div role="group" aria-label="Filter episodes" className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
            {(['All', ...vlogCategories] as Filter[]).map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={filter === category}
                onClick={() => setFilter(category)}
                className={cn(
                  'eyebrow h-10 shrink-0 border px-4 transition-colors duration-300',
                  filter === category ? 'border-f2a bg-f2a text-white' : 'border-white/15 text-white/60 hover:border-white/40 hover:text-white',
                )}
              >
                {category}
              </button>
            ))}
          </div>

          <m.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="mt-8">
            {episodes.length ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {episodes.map((vlog, i) => (
                  <Reveal key={vlog.id} delay={(i % 3) * 0.06}>
                    <VlogCard vlog={vlog} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <StateMessage
                icon={<Clapperboard aria-hidden />}
                title="No episodes yet"
                actions={
                  <Button href={site.facebook} arrow>
                    Watch on Facebook
                  </Button>
                }
              >
                There are no episodes in this category yet. Catch the latest F2A videos on Facebook.
              </StateMessage>
            )}
          </m.div>
        </div>
      </section>

      <FollowF2A index="03" />
    </>
  )
}
