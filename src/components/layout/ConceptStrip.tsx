import { concept } from '../../data/site'

/** Disclaimer strip on every page while this is a concept build (see `concept` in data/site.ts). */
export function ConceptStrip() {
  if (!concept.enabled) return null
  const author = (
    <a href={concept.url} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
      {concept.author}
    </a>
  )

  return (
    <div className="relative z-10 flex h-8 items-center justify-center bg-light px-4 text-ink">
      <p className="truncate text-[11px] font-medium sm:text-xs">
        <span className="max-lg:hidden">
          Concept website created by {author} {concept.purpose}. {concept.disclaimer}
        </span>
        <span className="lg:hidden">
          Concept website by {author} · Not affiliated with <span className="max-sm:hidden">or endorsed by </span>F2A Cars
        </span>
      </p>
    </div>
  )
}
