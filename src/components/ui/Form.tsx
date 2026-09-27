import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  type FormEvent,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react'
import { m } from 'framer-motion'
import { Check, ChevronDown, CircleAlert, Info, LoaderCircle } from 'lucide-react'
import { concept, site } from '../../data/site'
import { cn } from '../../lib/cn'
import { readForm, type FormApi } from '../../lib/useForm'
import { Button } from './Button'

const FormContext = createContext<FormApi | null>(null)
const useFieldError = (name: string) => useContext(FormContext)?.errors[name]

type FormProps = {
  form: FormApi
  /** Called with the trimmed string fields once native validation passes. */
  onValid: (data: Record<string, string>, el: HTMLFormElement) => Promise<void>
  /** Return false to intercept a submit (e.g. "Enter" on a non-final step). */
  beforeSubmit?: (el: HTMLFormElement) => boolean
  className?: string
  id?: string
  'aria-label'?: string
  children: ReactNode
}

export function Form({ form, onValid, beforeSubmit, className, children, ...rest }: FormProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const el = e.currentTarget
    if (form.status === 'submitting') return
    if (beforeSubmit && !beforeSubmit(el)) return
    if (!form.validate(el)) return
    void form.submit(() => onValid(readForm(el), el))
  }

  return (
    <FormContext.Provider value={form}>
      <form
        noValidate
        onSubmit={handleSubmit}
        onInput={(e) => form.clear((e.target as HTMLInputElement).name)}
        className={className}
        {...rest}
      >
        {concept.enabled && (
          <p className="flex gap-2.5 border border-white/10 bg-white/[0.03] px-4 py-3 text-xs leading-relaxed text-white/65 sm:col-span-2">
            <Info className="mt-px size-3.5 shrink-0 text-f2a-hot" aria-hidden />
            Concept demo — this form isn’t connected, so nothing you enter is sent or stored.
          </p>
        )}
        {children}
      </form>
    </FormContext.Provider>
  )
}

export const fieldClasses =
  'w-full rounded-none border border-white/15 bg-white/[0.03] px-4 text-base text-light outline-none transition-colors duration-300 placeholder:text-white/30 hover:border-white/30 focus:border-f2a focus:bg-white/[0.05] aria-[invalid=true]:border-f2a-hot disabled:cursor-not-allowed disabled:opacity-50'

function Message({ id, error, hint }: { id: string; error?: string; hint?: ReactNode }) {
  if (error) {
    return (
      <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-sm text-f2a-hot">
        <CircleAlert className="size-3.5 shrink-0" aria-hidden />
        {error}
      </p>
    )
  }
  return hint ? (
    <p id={`${id}-hint`} className="mt-2 text-sm text-white/45">
      {hint}
    </p>
  ) : null
}

const describedBy = (id: string, error?: string, hint?: ReactNode) => (error ? `${id}-error` : hint ? `${id}-hint` : undefined)

function Label({ htmlFor, required, children }: { htmlFor: string; required?: boolean; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="eyebrow mb-2.5 block text-white/60">
      {children}
      {required && (
        <span className="text-f2a-hot" aria-hidden>
          {' '}
          *
        </span>
      )}
    </label>
  )
}

type FieldBase = { name: string; label: string; hint?: ReactNode; className?: string }

export function TextField({ name, label, hint, className, required, ...input }: FieldBase & Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'className'>) {
  const id = useId()
  const error = useFieldError(name)
  return (
    <div className={cn('min-w-0', className)}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        name={name}
        required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(fieldClasses, 'h-12')}
        {...input}
      />
      <Message id={id} error={error} hint={hint} />
    </div>
  )
}

export function TextAreaField({ name, label, hint, className, required, ...area }: FieldBase & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name' | 'className'>) {
  const id = useId()
  const error = useFieldError(name)
  return (
    <div className={cn('min-w-0', className)}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <textarea
        id={id}
        name={name}
        required={required}
        rows={4}
        aria-invalid={!!error}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(fieldClasses, 'min-h-28 resize-y py-3')}
        {...area}
      />
      <Message id={id} error={error} hint={hint} />
    </div>
  )
}

export type Option = string | { value: string; label: string }

type SelectInputProps = { options: Option[]; placeholder?: string | false; wrapperClassName?: string } & SelectHTMLAttributes<HTMLSelectElement>

/** Styled native <select> — used by forms and inventory filters. */
export function SelectInput({ options, placeholder = 'Select…', wrapperClassName, className, ...select }: SelectInputProps) {
  return (
    <div className={cn('relative min-w-0', wrapperClassName)}>
      <select className={cn(fieldClasses, 'h-12 min-w-0 cursor-pointer appearance-none truncate pr-10', className)} {...select}>
        {placeholder !== false && <option value="">{placeholder}</option>}
        {options.map((o) => {
          const { value, label } = typeof o === 'string' ? { value: o, label: o } : o
          return (
            <option key={value} value={value}>
              {label}
            </option>
          )
        })}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-white/50" />
    </div>
  )
}

export function SelectField({ name, label, hint, className, required, ...select }: FieldBase & Omit<SelectInputProps, 'name' | 'className'>) {
  const id = useId()
  const error = useFieldError(name)
  return (
    <div className={cn('min-w-0', className)}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <SelectInput id={id} name={name} required={required} aria-invalid={!!error} aria-describedby={describedBy(id, error, hint)} {...select} />
      <Message id={id} error={error} hint={hint} />
    </div>
  )
}

type ChoiceFieldProps = {
  name: string
  label: string
  options: string[]
  required?: boolean
  defaultValue?: string
  onChange?: (value: string) => void
  className?: string
}

/** Radio group rendered as tappable chips. */
export function ChoiceField({ name, label, options, required, defaultValue, onChange, className }: ChoiceFieldProps) {
  const id = useId()
  const error = useFieldError(name)
  return (
    <fieldset className={cn('min-w-0', className)} aria-describedby={error ? `${id}-error` : undefined}>
      <legend className="eyebrow mb-2.5 text-white/60">
        {label}
        {required && (
          <span className="text-f2a-hot" aria-hidden>
            {' '}
            *
          </span>
        )}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option} className="relative cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option}
              required={required}
              defaultChecked={defaultValue === option}
              onChange={() => onChange?.(option)}
              className="peer sr-only"
            />
            <span className="flex min-h-11 items-center border border-white/15 px-4 text-sm text-white/75 transition-colors duration-300 hover:border-white/40 peer-checked:border-f2a peer-checked:bg-f2a peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-f2a-hot">
              {option}
            </span>
          </label>
        ))}
      </div>
      <Message id={id} error={error} />
    </fieldset>
  )
}

export function CheckboxField({ name, required, children, className }: { name: string; required?: boolean; children: ReactNode; className?: string }) {
  const id = useId()
  const error = useFieldError(name)
  return (
    <div className={className}>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-white/70">
        <input
          id={id}
          type="checkbox"
          name={name}
          value="yes"
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="peer sr-only"
        />
        <span
          aria-hidden
          className="mt-0.5 flex size-5 shrink-0 items-center justify-center border border-white/25 transition-colors peer-checked:border-f2a peer-checked:bg-f2a peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-f2a-hot peer-checked:[&>svg]:opacity-100"
        >
          <Check className="size-3.5 opacity-0" strokeWidth={3} />
        </span>
        <span>{children}</span>
      </label>
      <Message id={id} error={error} />
    </div>
  )
}

export function SubmitButton({ children, className }: { children: ReactNode; className?: string }) {
  const busy = useContext(FormContext)?.status === 'submitting'
  return (
    <Button
      type="submit"
      size="lg"
      disabled={busy}
      aria-busy={busy}
      arrow={!busy}
      icon={busy ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : undefined}
      className={className}
    >
      {busy ? 'Sending…' : children}
    </Button>
  )
}

export function FormError() {
  const failed = useContext(FormContext)?.status === 'error'
  if (!failed) return null
  return (
    <div role="alert" className="flex gap-3 border border-f2a/50 bg-f2a/10 p-4 text-sm leading-relaxed text-white/85">
      <CircleAlert className="mt-0.5 size-4 shrink-0 text-f2a-hot" aria-hidden />
      <p>
        We couldn’t send your request. Please try again, or contact F2A directly at{' '}
        <a href={site.phone.href} className="font-semibold underline underline-offset-4">
          {site.phone.display}
        </a>
        .
      </p>
    </div>
  )
}

export function SuccessPanel({ title = 'Thank you.', children, actions }: { title?: string; children: ReactNode; actions?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  // A long form collapses into this panel — bring it into view if it ended up off-screen.
  useEffect(() => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect && (rect.top < 80 || rect.top > window.innerHeight * 0.6)) ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  return (
    <m.div ref={ref} role="status" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex scroll-mt-28 flex-col items-start gap-6">
      <span className="flex size-16 items-center justify-center rounded-full bg-f2a">
        <Check className="size-8" strokeWidth={2.5} aria-hidden />
      </span>
      <h3 className="headline text-[clamp(3rem,8vw,4.5rem)]">{title}</h3>
      <div className="max-w-md space-y-2 text-lg leading-relaxed text-white/75">{children}</div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
      <p className="text-sm text-muted">
        {concept.enabled ? 'Concept demo — nothing was sent. To reach F2A Cars, call ' : 'Need a faster answer? Call '}
        <a href={site.phone.href} className="text-white underline underline-offset-4">
          {site.phone.display}
        </a>{' '}
        or{' '}
        <a href={site.messenger} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4">
          message F2A on Facebook
        </a>
        .
      </p>
    </m.div>
  )
}
