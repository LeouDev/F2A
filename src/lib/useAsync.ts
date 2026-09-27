import { useCallback, useEffect, useState } from 'react'

type AsyncState<T> = { data?: T; error?: unknown; loading: boolean }

/** Minimal loader hook: loading / error / retry for any promise-returning function. */
export function useAsync<T>(load: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<AsyncState<T>>({ loading: true })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let active = true
    setState((s) => ({ data: s.data, loading: true }))
    load().then(
      (data) => active && setState({ data, loading: false }),
      (error) => active && setState({ error, loading: false }),
    )
    return () => {
      active = false
    }
    // `load` is recreated every render; `deps` + `attempt` are the real triggers.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt])

  const retry = useCallback(() => setAttempt((a) => a + 1), [])
  return { ...state, retry }
}
