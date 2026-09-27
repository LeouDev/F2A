import { useState } from 'react'
import { m } from 'framer-motion'
import { gallery, galleryCategories, type GalleryCategory } from '../../data/images'
import { cn } from '../../lib/cn'
import { Img } from '../ui/Img'
import { SectionHeader } from '../ui/Section'

type Filter = GalleryCategory | 'All'

export function GallerySection({ index = '05' }: { index?: string }) {
  const [filter, setFilter] = useState<Filter>('All')
  const items = filter === 'All' ? gallery : gallery.filter((item) => item.category === filter)

  return (
    <section aria-labelledby="gallery-title" className="relative py-20 sm:py-24 lg:py-32">
      <div className="container-site">
        <SectionHeader
          index={index}
          eyebrow="Automotive gallery"
          id="gallery-title"
          title={
            <>
              Every kind
              <br />
              of <span className="text-f2a">ride.</span>
            </>
          }
          subtitle="Sports cars, luxury rides, SUVs, pickups and vans — the kinds of vehicles featured across the F2A feed."
        />

        <div role="group" aria-label="Filter gallery" className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
          {(['All', ...galleryCategories] as Filter[]).map((category) => (
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

        <m.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="mt-8 columns-2 gap-3 md:columns-3 lg:gap-4">
          {items.map((item) => (
            <figure key={item.image.src} className="group relative mb-3 break-inside-avoid overflow-hidden bg-steel lg:mb-4">
              <Img
                image={item.image}
                sizes="(min-width: 768px) 33vw, 50vw"
                maxWidth={1080}
                className={cn('w-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105', item.tall ? 'aspect-[3/4]' : 'aspect-[4/3]')}
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-3 sm:p-4">
                <span className="eyebrow text-[10px] text-f2a-hot">{item.category}</span>
                <span className="hidden max-w-[70%] truncate text-right text-xs text-white/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:block">{item.image.alt}</span>
              </figcaption>
            </figure>
          ))}
        </m.div>
      </div>
    </section>
  )
}
