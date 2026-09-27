import { Link } from 'react-router'
import { images } from '../../data/images'
import { cn } from '../../lib/cn'

/** Official F2A badge + wordmark. */
export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} aria-label="F2A Cars — home" className={cn('group flex items-center gap-3', className)}>
      <img
        src={images.brand.logo.src}
        alt=""
        width={40}
        height={40}
        className="size-10 shrink-0 rounded-full ring-1 ring-white/15 transition-transform duration-700 ease-out-expo group-hover:-rotate-12"
      />
      <span className="flex flex-col whitespace-nowrap">
        <span className="headline text-[1.7rem] leading-[0.78]">
          F<span className="text-f2a">2</span>A Cars
        </span>
        <span className="eyebrow mt-1 text-[8.5px] leading-none tracking-[0.46em] text-white/45">Quality cars</span>
      </span>
    </Link>
  )
}
