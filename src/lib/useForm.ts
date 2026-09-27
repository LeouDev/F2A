import { useCallback, useState } from 'react'

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

type Validatable = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

function messageFor(el: Validatable): string {
  const v = el.validity
  if (v.valueMissing) {
    if (el instanceof HTMLSelectElement || (el instanceof HTMLInputElement && el.type === 'radio')) return 'Please choose an option.'
    if (el instanceof HTMLInputElement && el.type === 'checkbox') return 'Please tick this box to continue.'
    return 'This field is required.'
  }
  if (v.typeMismatch && el.type === 'email') return 'Enter a valid email address.'
  if (v.patternMismatch) return el.dataset.error ?? 'Please check this field.'
  return el.validationMessage
}

/**
 * Native constraint validation (required, type, pattern, min/max) with custom inline messages.
 * `validate` works on a whole form or a single <fieldset> (used by the multi-step sell form).
 */
export function useForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = useCallback((scope: HTMLFormElement | HTMLFieldSetElement) => {
    const next: Record<string, string> = {}
    let first: Validatable | undefined
    for (const el of Array.from(scope.elements) as Validatable[]) {
      if (!('validity' in el) || !el.willValidate || el.checkValidity() || next[el.name]) continue
      next[el.name] = messageFor(el)
      first ??= el
    }
    setErrors(next)
    first?.focus()
    return !first
  }, [])

  const clear = useCallback((name: string) => {
    setErrors((current) => {
      if (!current[name]) return current
      const rest = { ...current }
      delete rest[name]
      return rest
    })
  }, [])

  const submit = useCallback(async (run: () => Promise<void>) => {
    setStatus('submitting')
    try {
      await run()
      setStatus('success')
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }, [])

  return { status, setStatus, errors, validate, clear, submit }
}

export type FormApi = ReturnType<typeof useForm>

/** Non-empty string fields of a form (files are handled separately). */
export function readForm(form: HTMLFormElement) {
  const data: Record<string, string> = {}
  new FormData(form).forEach((value, key) => {
    if (typeof value === 'string' && value.trim() !== '') data[key] = value.trim()
  })
  return data
}
