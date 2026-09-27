/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public site URL, no trailing slash. Used for canonical URLs, Open Graph, sitemap.xml. */
  readonly VITE_SITE_URL?: string
  /** Optional Google Maps Embed API key (referrer-restricted). Without it the contact map is a placeholder. */
  readonly VITE_GOOGLE_MAPS_EMBED_KEY?: string
}
