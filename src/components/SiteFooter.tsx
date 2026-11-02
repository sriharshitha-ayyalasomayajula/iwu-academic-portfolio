import { site } from '../data/site.config.ts'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p>
          {site.courseCode} {site.courseTitle} · {site.assignment}
          {site.institution ? ` · ${site.institution}` : ''}
        </p>
      </div>
    </footer>
  )
}
