import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'outline' | 'light' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

type BaseProps = {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  arrow?: boolean
  className?: string
  children: ReactNode
}

type LinkProps = BaseProps & { to: string }
type AnchorProps = BaseProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps | 'href'>
type NativeButtonProps = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>

type ButtonProps = LinkProps | AnchorProps | NativeButtonProps

const variants: Record<Variant, string> = {
  primary: 'bg-f2a text-white hover:bg-f2a-deep',
  outline: 'border border-white/25 text-white hover:border-white hover:bg-white hover:text-ink',
  light: 'bg-white text-ink hover:bg-light',
  ghost: 'text-white hover:text-f2a-hot',
}

const sizes: Record<Size, string> = {
  sm: 'min-h-10 gap-2 px-4 py-2 text-[11px]',
  md: 'min-h-12 gap-2.5 px-6 py-3 text-xs',
  lg: 'min-h-14 gap-3 px-8 py-3.5 text-[13px]',
}

function buttonClasses(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(
    'group/btn relative inline-flex shrink-0 select-none items-center justify-center text-center font-semibold uppercase leading-tight tracking-[0.16em] sm:whitespace-nowrap',
    'transition-[background-color,border-color,color,transform] duration-300 ease-out-expo active:scale-[0.98]',
    'disabled:pointer-events-none disabled:opacity-60',
    variants[variant],
    variant === 'ghost' ? sizes[size].replace(/px-\d+/, 'px-0') : sizes[size],
    className,
  )
}

const isExternal = (href: string) => /^https?:\/\//.test(href)

export function Button(props: ButtonProps) {
  const { variant, size, icon, arrow, className, children, ...rest } = props
  const cls = buttonClasses(variant, size, className)
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {arrow && (
        <ArrowUpRight
          aria-hidden
          className="size-4 shrink-0 transition-transform duration-300 ease-out-expo group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
        />
      )}
    </>
  )

  if ('to' in rest) {
    return (
      <Link to={rest.to} className={cls}>
        {content}
      </Link>
    )
  }
  if ('href' in rest) {
    const external = isExternal(rest.href)
    return (
      <a {...rest} className={cls} {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" {...rest} className={cls}>
      {content}
    </button>
  )
}
