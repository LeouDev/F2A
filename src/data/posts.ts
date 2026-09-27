import { images, type ImageAsset } from './images'
import { site } from './site'

export type PostCategory = 'F2A Vlogs' | 'New Arrivals' | 'Car Stories' | 'Customer Releases' | 'F2A Updates'

/**
 * "Latest from F2A" cards. Today: real posts copied from the F2A CARS Facebook page.
 * Later: supply the same shape from the Facebook Graph API (server-side) or a CMS —
 * never scrape Facebook from the browser.
 */
export type Post = {
  id: string
  caption: string
  /** ISO date */
  date: string
  category: PostCategory
  /** Link to the post. Falls back to the page URL when the individual post URL isn't known. */
  url: string
  /** Optional — posts without a thumbnail render as typographic cards. */
  thumbnail?: ImageAsset
}

export const posts: Post[] = [
  {
    id: 'fb-f2a-vlogs-ep-406',
    caption: 'F2A Vlogs EP. 406 — Isang former member ng Mavs Phenomenal Basketball Team…',
    date: '2026-09-27',
    category: 'F2A Vlogs',
    url: site.facebook,
    thumbnail: images.media.ep406Small,
  },
  {
    id: 'fb-scammer-alert',
    caption: 'Scammer alert / awareness post',
    date: '2026-09-22',
    category: 'F2A Updates',
    url: site.facebook,
  },
  {
    id: 'fb-convert-your-car-into-cash',
    caption: 'Let’s convert your car into cash!',
    date: '2026-04-06',
    category: 'F2A Updates',
    url: site.facebook,
  },
]
