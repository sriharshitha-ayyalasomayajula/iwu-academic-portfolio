import { useEffect } from 'react'
import { SiteFooter } from './components/SiteFooter.tsx'
import { SiteHeader } from './components/SiteHeader.tsx'
import { useRoute } from './hooks/useRoute.ts'
import { AlgorithmTypesPage } from './pages/AlgorithmTypesPage.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { PrintPage } from './pages/PrintPage.tsx'

export default function App() {
  const path = useRoute()
  const printView = path === '/aiml-501/algorithm-types/print'

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      document.getElementById(hash)?.scrollIntoView()
      return
    }
    window.scrollTo(0, 0)
  }, [path])

  let page = <NotFoundPage />
  if (path === '/') page = <HomePage />
  if (path === '/aiml-501/algorithm-types') page = <AlgorithmTypesPage />
  if (printView) page = <PrintPage />

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {printView ? null : <SiteHeader />}
      {page}
      {printView ? null : <SiteFooter />}
    </>
  )
}
