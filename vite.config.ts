import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { images } from './src/data/images.ts'
import { concept, site, socialLinks } from './src/data/site.ts'
import { vehicles } from './src/data/vehicles.ts'
import { HERO_SIZES, imageSources } from './src/lib/image.ts'

const staticRoutes = ['/', '/cars', '/sell-your-car', '/trade', '/consign', '/financing', '/about', '/vlogs', '/contact', '/privacy', '/terms']

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/**
 * SEO files from the same data the app uses:
 * - index.html placeholders (%SITE_URL%, %SITE_DESCRIPTION%) + site-wide AutoDealer JSON-LD
 * - homepage-only preload of the hero image (same URLs <Img> requests), so LCP doesn't wait for the JS
 * - robots.txt, and sitemap.xml when VITE_SITE_URL is set (sample vehicles are excluded)
 * Concept builds (`concept.enabled` in src/data/site.ts) get a noindex tag instead of business
 * structured data, and no sitemap.
 */
function seo(siteUrl: string): Plugin {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: site.name,
    description: site.description,
    url: `${siteUrl}/`,
    logo: `${siteUrl}/brand/f2a-logo.png`,
    image: `${siteUrl}/og-image.jpg`,
    telephone: site.phone.international,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      postalCode: site.address.postalCode,
      addressCountry: site.address.countryCode,
    },
    sameAs: Object.values(socialLinks).filter(Boolean),
  }

  const hero = imageSources(images.heroes.home.src)
  const heroPreload = `if(location.pathname==='/'){var l=document.createElement('link');l.rel='preload';l.as='image';l.href=${JSON.stringify(hero.src)};l.imageSrcset=${JSON.stringify(hero.srcSet ?? '')};l.imageSizes=${JSON.stringify(HERO_SIZES)};l.fetchPriority='high';document.head.appendChild(l)}`

  return {
    name: 'f2a-seo',
    transformIndexHtml: (html) => ({
      html: html
        .replaceAll('%SITE_URL%', siteUrl)
        .replaceAll('%SITE_DESCRIPTION%', escapeHtml(site.description))
        .replace('<!--hero-preload-->', `<script>${heroPreload}</script>`),
      tags: concept.enabled
        ? [{ tag: 'meta', attrs: { name: 'robots', content: 'noindex, nofollow' }, injectTo: 'head' }]
        : [{ tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(jsonLd).replace(/</g, '\\u003c'), injectTo: 'head' }],
    }),
    generateBundle() {
      const sitemap = siteUrl && !concept.enabled
      const robots = ['User-agent: *', 'Allow: /', sitemap && `Sitemap: ${siteUrl}/sitemap.xml`].filter(Boolean).join('\n')
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${robots}\n` })
      if (!sitemap) return
      const paths = [...staticRoutes, ...vehicles.filter((v) => !v.sample).map((v) => `/cars/${v.id}`)]
      const urls = paths.map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`).join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  // On Vercel, fall back to the project's production domain so Open Graph URLs are absolute.
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  const siteUrl = (env.VITE_SITE_URL || (vercelUrl ? `https://${vercelUrl}` : '')).replace(/\/$/, '')
  return {
    plugins: [react(), tailwindcss(), seo(siteUrl)],
    build: {
      rolldownOptions: {
        // Libraries in their own long-cached chunk; pages stay code-split per route.
        output: { codeSplitting: { groups: [{ name: 'vendor', test: /node_modules/ }] } },
      },
    },
  }
})
