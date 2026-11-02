export function basePath(): string {
  return import.meta.env.BASE_URL.replace(/\/$/, '')
}

export function toHref(to: string): string {
  const hashIndex = to.indexOf('#')
  const hash = hashIndex >= 0 ? to.slice(hashIndex) : ''
  const rawPath = hashIndex >= 0 ? to.slice(0, hashIndex) : to
  const path = rawPath === '' ? '/' : rawPath
  const base = basePath()
  if (path === '/') return `${base}/${hash}`
  return `${base}${path}${hash}`
}

export function currentPath(): string {
  const base = basePath()
  let path = window.location.pathname
  if (base && path.startsWith(base)) {
    path = path.slice(base.length)
  }
  if (!path || path === '/') return '/'
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1)
  if (!path.startsWith('/')) path = `/${path}`
  return path
}

export function navigate(to: string): void {
  const href = toHref(to)
  const nextUrl = new URL(href, window.location.origin)
  window.history.pushState(null, '', href)
  window.dispatchEvent(new PopStateEvent('popstate'))
  const hash = nextUrl.hash.replace('#', '')
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const behavior: ScrollBehavior = reduce ? 'auto' : 'smooth'
  if (hash) {
    window.requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior })
    })
    return
  }
  window.scrollTo({ top: 0, behavior })
}
