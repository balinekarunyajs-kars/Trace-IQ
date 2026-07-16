import { useState, useEffect } from 'react'

/**
 * Generic data-fetching hook.
 * @param {Function} fetcher - async function returning an axios response
 * @param {*} defaultValue  - initial / fallback value
 */
export function useApi(fetcher, defaultValue = null) {
  const [data, setData]       = useState(defaultValue)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetcher()
        if (!cancelled) setData(res.data)
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.detail || 'Failed to load data. Is the backend running?')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, []) // eslint-disable-line

  return { data, loading, error }
}
