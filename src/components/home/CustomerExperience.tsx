import { customerStories } from '../../data/customerStories'
import { site } from '../../data/site'
import { SocialProofStats } from '../blocks/SocialProofStats'
import { StoryCard } from '../media/Cards'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/Section'

export function CustomerExperience({ index = '06' }: { index?: string }) {
  return (
    <section aria-labelledby="experience-title" className="relative border-t border-white/10 py-20 sm:py-24 lg:py-32">
      <div className="container-site">
        <SectionHeader
          index={index}
          eyebrow="Customer experience"
          id="experience-title"
          title={
            <>
              Quality cars.
              <br />
              Real people.
              <br />
              <span className="text-f2a">Real deals.</span>
            </>
          }
          subtitle="What the F2A community says on Facebook — and the releases behind it."
          action={
            <Button href={site.facebook} variant="outline" arrow>
              Read reviews on Facebook
            </Button>
          }
        />

        <SocialProofStats className="mt-16" />

        <Reveal className="mt-20 flex flex-wrap items-end justify-between gap-4">
          <h3 className="headline text-4xl sm:text-5xl">F2A customer stories</h3>
          <p className="max-w-sm text-sm text-muted">Handovers and releases from F2A clients.</p>
        </Reveal>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {customerStories.map((story, i) => (
            <Reveal key={story.id} delay={i * 0.07}>
              <StoryCard story={story} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
