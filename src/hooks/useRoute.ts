import { useEffect, useState } from 'react'
import { currentPath } from '../lib/route.ts'

export function useRoute(): string {
  const [path, setPath] = useState(() => currentPath())

  useEffect(() => {
    const sync = () => setPath(currentPath())
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  return path
}

export function usePageTitle(title: string): void {
  useEffect(() => {
    const previous = document.title
    document.title = title
    return () => {
      document.title = previous
    }
  }, [title])
}
