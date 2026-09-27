import { Link } from 'react-router'
import { ArrowUpRight, Info } from 'lucide-react'
import type { Vehicle, VehicleStatus } from '../../data/vehicles'
import { cn } from '../../lib/cn'
import { formatMileage, formatPrice } from '../../lib/format'
import { useInquiry } from '../inquiry/inquiryContext'
import { Button } from '../ui/Button'
import { Img } from '../ui/Img'
import { Skeleton } from '../ui/States'

const statusStyles: Record<VehicleStatus, string> = {
  available: 'bg-f2a text-white',
  reserved: 'bg-white text-ink',
  sold: 'bg-steel text-white/60',
}

export function StatusBadge({ status, className }: { status: VehicleStatus; className?: string }) {
  return <span className={cn('eyebrow inline-flex h-7 items-center px-2.5 text-[10px]', statusStyles[status], className)}>{status}</span>
}

export function SampleBadge({ className }: { className?: string }) {
  return (
    <span className={cn('eyebrow inline-flex h-7 items-center border border-white/25 bg-black/55 px-2.5 text-[10px] text-white/80 backdrop-blur', className)}>
      Sample
    </span>
  )
}

/** Honest label while the inventory contains demo listings. */
export function SampleNotice({ className }: { className?: string }) {
  return (
    <p className={cn('flex items-start gap-3 border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-relaxed text-white/70', className)}>
      <Info className="mt-0.5 size-4 shrink-0 text-f2a-hot" aria-hidden />
      <span>
        <strong className="font-semibold text-white">Sample listings.</strong> The cars shown are placeholders for previewing this website — not
        actual F2A units. Contact F2A for the cars currently available.
      </span>
    </p>
  )
}

export function VehicleCard({ vehicle: v, sizes }: { vehicle: Vehicle; sizes?: string }) {
  const { openInquiry } = useInquiry()
  const href = `/cars/${v.id}`

  return (
    <article className="group relative flex h-full flex-col border border-white/10 bg-carbon transition-colors duration-500 hover:border-white/25">
      <Link to={href} tabIndex={-1} aria-hidden className="relative block aspect-[4/3] overflow-hidden bg-steel">
        <Img
          image={v.images[0]}
          sizes={sizes ?? '(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 90vw'}
          maxWidth={1440}
          className="size-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.06]"
        />
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-carbon/90 to-transparent" />
        <span className="absolute left-4 top-4 flex gap-2">
          <StatusBadge status={v.status} />
          {v.sample && <SampleBadge />}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="eyebrow text-white/50">
          {v.year} · {v.make}
        </p>
        <h3 className="headline mt-2 text-[2.1rem] leading-[0.9]">
          <Link to={href} className="transition-colors hover:text-f2a-hot">
            {v.model}
          </Link>
        </h3>
        {v.variant && <p className="mt-1.5 text-sm text-muted">{v.variant}</p>}

        <dl className="mt-5 grid grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-3 text-center">
          {[
            ['Mileage', formatMileage(v.mileage)],
            ['Trans.', v.transmission ?? '—'],
            ['Fuel', v.fuelType ?? '—'],
          ].map(([label, value]) => (
            <div key={label} className="px-1">
              <dt className="eyebrow text-[9px] text-white/40">{label}</dt>
              <dd className="mt-1 truncate text-[13px] text-white/85">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-[10px] text-white/40">Price</p>
            <p className={cn('headline mt-1.5 text-[1.9rem] transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5', v.status === 'sold' && 'text-white/40 line-through')}>
              {formatPrice(v.price)}
            </p>
          </div>
          <ArrowUpRight
            aria-hidden
            className="mb-1 size-6 -translate-x-2 translate-y-2 text-f2a-hot opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
          />
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <Button to={href} variant="outline" size="sm" className="group-hover:border-white">
            View details
          </Button>
          <Button size="sm" onClick={() => openInquiry({ vehicle: v })} aria-label={`Inquire about the ${v.year} ${v.make} ${v.model}`}>
            Inquire
          </Button>
        </div>
      </div>
    </article>
  )
}

export function VehicleCardSkeleton() {
  return (
    <div className="flex h-full flex-col border border-white/10 bg-carbon">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="space-y-3 p-6">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-3 w-28" />
        <Skeleton className="mt-5 h-12 w-full" />
        <Skeleton className="h-8 w-36" />
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
      </div>
    </div>
  )
}
