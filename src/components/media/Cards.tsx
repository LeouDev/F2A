import { ArrowUpRight, Play, Quote } from 'lucide-react'
import type { CustomerStory } from '../../data/customerStories'
import type { Post } from '../../data/posts'
import { site } from '../../data/site'
import type { Testimonial } from '../../data/testimonials'
import type { Vlog } from '../../data/vlogs'
import { cn } from '../../lib/cn'
import { formatDate } from '../../lib/format'
import { BrandIcon } from '../ui/Icons'
import { Img } from '../ui/Img'

export function PlaceholderTag({ className }: { className?: string }) {
  return <span className={cn('eyebrow inline-flex h-6 items-center border border-dashed border-white/30 px-2 text-[9px] text-white/60', className)}>Placeholder</span>
}

/** Episode card. Without a video URL it links to the F2A Facebook page. */
export function VlogCard({ vlog }: { vlog: Vlog }) {
  const href = vlog.videoUrl ?? site.facebook
  return (
    <article className="group relative flex h-full flex-col border border-white/10 bg-carbon transition-colors duration-500 hover:border-white/25">
      <div className="relative aspect-video overflow-hidden bg-steel">
        <Img image={vlog.thumbnail} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" maxWidth={1080} className="size-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.06]" />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <span aria-hidden className="absolute bottom-4 left-4 flex size-11 items-center justify-center rounded-full bg-f2a transition-transform duration-500 group-hover:scale-110">
          <Play className="ml-0.5 size-4 fill-current" />
        </span>
        {vlog.duration && <span className="eyebrow absolute bottom-4 right-4 bg-black/70 px-2 py-1 text-[10px]">{vlog.duration}</span>}
        {vlog.placeholder && <PlaceholderTag className="absolute left-4 top-4 bg-black/50" />}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="eyebrow flex flex-wrap gap-x-3 text-white/45">
          <span className="text-f2a-hot">{vlog.episode ? `EP. ${vlog.episode}` : vlog.category}</span>
          {vlog.episode && <span>{vlog.category}</span>}
          {vlog.date && <time dateTime={vlog.date}>{formatDate(vlog.date)}</time>}
        </p>
        <h3 className="headline mt-3 text-3xl leading-[0.92]">{vlog.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{vlog.description}</p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="eyebrow mt-auto flex items-center gap-2 pt-6 text-white transition-colors after:absolute after:inset-0 hover:text-f2a-hot"
        >
          {vlog.videoUrl ? 'Watch episode' : 'Watch on Facebook'}
          <ArrowUpRight className="size-4" aria-hidden />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </article>
  )
}

/** "Latest from F2A" post card — typographic when the post has no thumbnail. */
export function PostCard({ post }: { post: Post }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex min-h-64 flex-col justify-end overflow-hidden border border-white/10 bg-carbon p-5 transition-colors duration-500 hover:border-white/30 sm:p-6"
    >
      {post.thumbnail ? (
        <>
          <Img image={post.thumbnail} alt="" sizes="(min-width: 1024px) 25vw, 90vw" maxWidth={768} className="absolute inset-0 size-full object-cover opacity-45 transition duration-[1.4s] ease-out-expo group-hover:scale-105 group-hover:opacity-60" />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
        </>
      ) : (
        <span aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(228,2,4,0.35),transparent_55%)]" />
      )}
      <span className="eyebrow relative flex items-center justify-between gap-3 text-white/60">
        <span className="flex items-center gap-2">
          <BrandIcon name="facebook" className="size-3.5 text-white" /> {post.category}
        </span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </span>
      <p className="headline relative mt-4 text-[1.9rem] leading-[0.95]">{post.caption}</p>
      <span className="eyebrow relative mt-5 flex items-center gap-2 text-white/80 transition-colors group-hover:text-f2a-hot">
        View on Facebook <ArrowUpRight className="size-4" aria-hidden />
        <span className="sr-only">(opens in a new tab)</span>
      </span>
    </a>
  )
}

export function StoryCard({ story }: { story: CustomerStory }) {
  return (
    <figure className="group relative flex h-full flex-col border border-white/10 bg-carbon">
      <div className="relative aspect-[4/3] overflow-hidden bg-steel md:aspect-[4/5]">
        <Img image={story.photo} sizes="(min-width: 768px) 30vw, 90vw" maxWidth={1080} className="size-full object-cover grayscale transition duration-[1.4s] ease-out-expo group-hover:scale-105 group-hover:grayscale-0" />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        {story.placeholder && <PlaceholderTag className="absolute left-4 top-4 bg-black/50" />}
        <span className="absolute inset-x-5 bottom-5">
          <span className="eyebrow text-f2a-hot">{story.vehicle}</span>
          <span className="headline mt-2 block text-3xl">{story.customer}</span>
        </span>
      </div>
      <figcaption className="p-5 text-sm leading-relaxed text-muted sm:p-6">{story.story}</figcaption>
    </figure>
  )
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col justify-between gap-8 border border-white/10 bg-carbon p-6 sm:p-8">
      <div>
        <div className="flex items-center justify-between">
          <Quote className="size-7 text-f2a" aria-hidden />
          {testimonial.placeholder && <PlaceholderTag />}
        </div>
        <blockquote className="mt-6 text-xl leading-snug text-white/85">“{testimonial.quote}”</blockquote>
      </div>
      <figcaption className="border-t border-white/10 pt-5">
        <span className="headline block text-2xl">{testimonial.name}</span>
        {testimonial.vehicle && <span className="eyebrow mt-1 block text-white/45">{testimonial.vehicle}</span>}
      </figcaption>
    </figure>
  )
}
