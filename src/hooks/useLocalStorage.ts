import { useState } from 'react'

export default function useLocalStorage(
  key: string,
  initialValue: string
): [string, (value: Function | string) => void, Error | null] {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = typeof window !== 'undefined' && window.localStorage.getItem(key)

      return item ? item : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const [error, setError] = useState<Error | null>(null)

  const setValue = (value: Function | string) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)

      window.localStorage.setItem(key, valueToStore)
    } catch (error) {
      setError(error instanceof Error ? error : new Error(String(error)))
    }
  }

  return [storedValue, setValue, error]
}
