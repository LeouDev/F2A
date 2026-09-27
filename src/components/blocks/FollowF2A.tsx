import { posts } from '../../data/posts'
import { site, socialLinks } from '../../data/site'
import { socialProof } from '../../data/socialProof'
import { cn } from '../../lib/cn'
import { PostCard } from '../media/Cards'
import { Button } from '../ui/Button'
import { BrandIcon, type Brand } from '../ui/Icons'
import { Reveal } from '../ui/Reveal'
import { Eyebrow } from '../ui/Section'

const platforms: { name: Brand; label: string }[] = [
  { name: 'facebook', label: 'Facebook' },
  { name: 'youtube', label: 'YouTube' },
  { name: 'tiktok', label: 'TikTok' },
]

/** "FOLLOW F2A" + "Latest from F2A" post cards. */
export function FollowF2A({ index }: { index?: string }) {
  return (
    <section aria-labelledby="follow-title" className="relative overflow-hidden border-y border-white/10 bg-carbon py-20 sm:py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 size-[36rem] rounded-full bg-f2a/10 blur-[140px]" />
      <div className="container-site relative grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow index={index}>Stay connected</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="follow-title" className="headline mt-6 text-[clamp(3.5rem,9vw,7.5rem)]">
              Follow
              <br />
              <span className="text-f2a">F2A</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">Stay updated with the latest cars, episodes, releases and automotive stories.</p>
          </Reveal>
          <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-3">
            {platforms.map(({ name, label }) => {
              const url = socialLinks[name]
              const icon = <BrandIcon name={name} className="size-4" />
              return url ? (
                <Button key={name} href={url} variant={name === 'facebook' ? 'primary' : 'outline'} icon={icon}>
                  {label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </Button>
              ) : (
                <span key={name} aria-disabled="true" title={`${label} link coming soon`} className="inline-flex h-12 cursor-not-allowed select-none items-center gap-2.5 border border-white/15 px-6 text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
                  {icon}
                  <span>{label}</span>
                  <span className="sr-only"> — link not available yet</span>
                </span>
              )
            })}
          </Reveal>
          <Reveal delay={0.2} className="mt-12 flex items-baseline gap-4 border-t border-white/10 pt-8">
            <span className="headline text-7xl">
              {socialProof.followers.replace(/M$/, '')}
              <span className="text-f2a">M</span>
            </span>
            <span className="eyebrow text-white/50">Followers on Facebook</span>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="headline text-4xl sm:text-5xl">Latest from F2A</h3>
            <Button href={site.facebook} variant="ghost" size="sm" arrow>
              View more on Facebook
            </Button>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={i * 0.06} className={cn(i === 0 && 'sm:col-span-2')}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
