import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { site } from '../data/site'
import type { Vehicle } from '../data/vehicles'
import { vehicleTitle } from './format'

type SeoProps = {
  title: string
  description?: string
  /** Absolute URL or site-relative path */
  image?: string
  type?: 'website' | 'article' | 'product'
  noindex?: boolean
  /** Structured data (schema.org) for this page */
  jsonLd?: object
}

const DEFAULT_IMAGE = '/og-image.jpg'

export const siteUrl = () => (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, '')

const absolute = (url: string) => (/^https?:\/\//.test(url) ? url : `${siteUrl()}${url.startsWith('/') ? '' : '/'}${url}`)

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = href
}

/**
 * Per-page metadata. index.html carries the homepage defaults for crawlers that don't run JS
 * (social previews); this updates title, description, Open Graph, Twitter and canonical on navigation.
 */
export function Seo({ title, description = site.description, image = DEFAULT_IMAGE, type = 'website', noindex, jsonLd }: SeoProps) {
  const { pathname } = useLocation()

  useEffect(() => {
    const url = `${siteUrl()}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`
    const img = absolute(image)
    document.title = title
    setMeta('name', 'description', description)
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow')
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', img)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', img)
    setCanonical(url)
  }, [title, description, image, type, noindex, pathname])

  return jsonLd ? (
    <script
      type="application/ld+json"
      // JSON-LD must not be HTML-escaped; `<` is escaped to keep it inert.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
    />
  ) : null
}

/** schema.org Car + Offer for a real (non-sample) listing. The site-wide AutoDealer block is injected into index.html at build time. */
export const carJsonLd = (v: Vehicle) => ({
  '@context': 'https://schema.org',
  '@type': 'Car',
  name: [vehicleTitle(v), v.variant].filter(Boolean).join(' '),
  brand: { '@type': 'Brand', name: v.make },
  model: v.model,
  vehicleModelDate: String(v.year),
  ...(v.mileage != null && { mileageFromOdometer: { '@type': 'QuantitativeValue', value: v.mileage, unitCode: 'KMT' } }),
  vehicleTransmission: v.transmission,
  fuelType: v.fuelType,
  bodyType: v.bodyType,
  driveWheelConfiguration: v.driveType,
  color: v.color,
  image: v.images.map((image) => absolute(image.src)),
  offers: {
    '@type': 'Offer',
    price: v.price,
    priceCurrency: 'PHP',
    availability: `https://schema.org/${v.status === 'sold' ? 'SoldOut' : v.status === 'reserved' ? 'LimitedAvailability' : 'InStock'}`,
    seller: { '@type': 'AutoDealer', name: site.name },
  },
})
