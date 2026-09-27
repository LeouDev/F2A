import { useState } from 'react'
import { m } from 'framer-motion'
import { gallery, galleryCategories, type GalleryCategory } from '../../data/images'
import { bentoTiles } from '../../lib/bento'
import { cn } from '../../lib/cn'
import { Img } from '../ui/Img'
import { SectionHeader } from '../ui/Section'

type Filter = GalleryCategory | 'All'

export function GallerySection({ index = '05' }: { index?: string }) {
  const [filter, setFilter] = useState<Filter>('All')
  const items = filter === 'All' ? gallery : gallery.filter((item) => item.category === filter)
  const tiles = bentoTiles(items.length)

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

        {/* Tile grid that always fills complete rows (see lib/bento.ts) */}
        <m.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8 grid grid-flow-row-dense grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4"
        >
          {items.map((item, i) => {
            const tile = tiles[i]
            const large = tile.full || tile.lg !== null
            return (
              <figure
                key={item.image.src}
                className={cn(
                  'group relative aspect-[4/3] overflow-hidden bg-steel',
                  tile.full && 'max-lg:col-span-2 max-lg:aspect-[16/9]',
                  tile.lg === 'feature' && 'lg:col-span-2 lg:row-span-2 lg:aspect-auto',
                  tile.lg === 'wide' && 'lg:col-span-2 lg:aspect-auto',
                  tile.lg === 'row' && 'lg:col-span-3 lg:aspect-[21/9]',
                )}
              >
                <Img
                  image={item.image}
                  sizes={large ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1024px) 33vw, 50vw'}
                  maxWidth={large ? 1920 : 1080}
                  className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end gap-3 p-3 sm:p-4">
                  {filter === 'All' && <span className="eyebrow bg-black/70 px-2 py-1 text-[10px] text-white backdrop-blur-sm">{item.category}</span>}
                  <span
                    aria-hidden
                    className="ml-auto hidden max-w-[75%] truncate bg-black/70 px-2 py-1 text-xs text-white/85 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100 lg:block"
                  >
                    {item.image.alt}
                  </span>
                </figcaption>
              </figure>
            )
          })}
        </m.div>
      </div>
    </section>
  )
}
