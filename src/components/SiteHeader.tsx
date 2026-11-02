import { site } from '../data/site.config.ts'
import { SiteLink } from './SiteLink.tsx'

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <SiteLink href="/" className="wordmark">
          <span>{site.studentName || site.portfolioTitle}</span>
          <small>{site.institution}</small>
        </SiteLink>
        <nav className="site-nav" aria-label="Primary">
          <SiteLink href="/">Home</SiteLink>
          <SiteLink href="/#coursework">Coursework</SiteLink>
          <SiteLink href="/aiml-501/algorithm-types">Algorithm Types</SiteLink>
        </nav>
      </div>
    </header>
  )
}
