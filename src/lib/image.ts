const WIDTHS = [480, 768, 1080, 1440, 1920, 2560]

/**
 * Responsive src/srcSet for Unsplash (imgix) URLs; other sources are used as-is.
 * Shared by <Img> and the build-time hero preload (vite.config.ts) so both request identical URLs.
 */
export function imageSources(src: string, maxWidth = 2560): { src: string; srcSet?: string } {
  if (!src.includes('images.unsplash.com')) return { src }
  const url = (w: number) => `${src}?auto=format&fit=crop&w=${w}&q=${w > 1200 ? 62 : 70}`
  const widths = WIDTHS.filter((w) => w <= maxWidth)
  return { src: url(widths[Math.min(2, widths.length - 1)]), srcSet: widths.map((w) => `${url(w)} ${w}w`).join(', ') }
}

/**
 * `sizes` for the homepage hero. The photo (3:2) is cover-cropped, so its rendered width is
 * max(box width, box height × 1.5): phones show it in a ~64svh-tall box, desktop at full height.
 * Shared with the build-time preload, which must use the identical string to be reused.
 */
export const HERO_SIZES = '(max-width: 1023px) max(100vw, 96vh), max(100vw, 150vh)'
