import type { MouseEvent, ReactNode } from 'react'
import { navigate, toHref } from '../lib/route.ts'
import { useRoute } from '../hooks/useRoute.ts'

type SiteLinkProps = {
  href: string
  className?: string
  children: ReactNode
}

export function SiteLink({ href, className, children }: SiteLinkProps) {
  const path = useRoute()
  const targetPath = href.split('#')[0] || '/'
  const current = path === targetPath && !href.includes('#')

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.defaultPrevented || event.button !== 0) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    navigate(href)
  }

  return (
    <a
      href={toHref(href)}
      className={className}
      aria-current={current ? 'page' : undefined}
      onClick={onClick}
    >
      {children}
    </a>
  )
}
