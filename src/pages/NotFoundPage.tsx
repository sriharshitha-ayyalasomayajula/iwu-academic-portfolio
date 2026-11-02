import { SiteLink } from '../components/SiteLink.tsx'
import { usePageTitle } from '../hooks/useRoute.ts'

export function NotFoundPage() {
  usePageTitle('Page not found · IWU Academic Portfolio')

  return (
    <main id="main" className="page">
      <h1>Page not found</h1>
      <p className="lede">That address is not part of this portfolio yet.</p>
      <SiteLink href="/">Return to the portfolio home</SiteLink>
    </main>
  )
}
