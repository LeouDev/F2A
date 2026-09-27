import { images, type ImageAsset } from './images'

export type VlogCategory = 'Vlogs' | 'Car Reviews' | 'New Arrivals' | 'Customer Releases' | 'Special Features'

export const vlogCategories: VlogCategory[] = ['Vlogs', 'Car Reviews', 'New Arrivals', 'Customer Releases', 'Special Features']

/** Mirrors the future Supabase `vlogs` table. */
export type Vlog = {
  id: string
  episode?: number
  title: string
  /** ISO date */
  date?: string
  /** e.g. "6:35" */
  duration?: string
  description: string
  category: VlogCategory
  thumbnail: ImageAsset
  /**
   * YouTube or Facebook video URL. Leave null until the real link is supplied —
   * the player then links to the F2A Facebook page instead of embedding.
   */
  videoUrl: string | null
  /** Clearly marked stand-in card; remove once real episodes are added. */
  placeholder?: boolean
}

export const vlogs: Vlog[] = [
  {
    // Real episode, from the F2A CARS Facebook page (posted Sep 27, 2026).
    id: 'ep-406',
    episode: 406,
    title: 'F2A Vlogs EP. 406',
    date: '2026-09-27',
    duration: '6:35',
    description:
      'Sinong former member ng Mavs Phenomenal Basketball Team ang bibili saten ng worth 4 million na supercar? Full vlog on the F2A CARS page.',
    category: 'Vlogs',
    thumbnail: images.media.ep406,
    videoUrl: null,
  },
  // ─── Placeholders: replace with real episodes (title, date, thumbnail, video URL) ───
  {
    id: 'placeholder-new-arrivals',
    title: 'New arrivals walkaround',
    description: 'Placeholder card — a real F2A episode will appear here.',
    category: 'New Arrivals',
    thumbnail: images.vlogPlaceholders.newArrival,
    videoUrl: null,
    placeholder: true,
  },
  {
    id: 'placeholder-customer-release',
    title: 'Customer release',
    description: 'Placeholder card — a real F2A episode will appear here.',
    category: 'Customer Releases',
    thumbnail: images.vlogPlaceholders.release,
    videoUrl: null,
    placeholder: true,
  },
  {
    id: 'placeholder-car-review',
    title: 'Car review',
    description: 'Placeholder card — a real F2A episode will appear here.',
    category: 'Car Reviews',
    thumbnail: images.vlogPlaceholders.review,
    videoUrl: null,
    placeholder: true,
  },
  {
    id: 'placeholder-special-feature',
    title: 'Special feature',
    description: 'Placeholder card — a real F2A episode will appear here.',
    category: 'Special Features',
    thumbnail: images.vlogPlaceholders.feature,
    videoUrl: null,
    placeholder: true,
  },
  {
    id: 'placeholder-vlog',
    title: 'F2A Vlogs episode',
    description: 'Placeholder card — a real F2A episode will appear here.',
    category: 'Vlogs',
    thumbnail: images.vlogPlaceholders.vlog,
    videoUrl: null,
    placeholder: true,
  },
]

export const featuredVlog = vlogs[0]
