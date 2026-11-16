import { useEffect } from 'react'
import { SiteFooter } from './components/SiteFooter.tsx'
import { SiteHeader } from './components/SiteHeader.tsx'
import { useRoute } from './hooks/useRoute.ts'
import { AlgorithmTypesPage } from './pages/AlgorithmTypesPage.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { LlmPrintPage } from './pages/LlmPrintPage.tsx'
import { LlmTrainingPage } from './pages/LlmTrainingPage.tsx'
import { NeuralNetworksPage } from './pages/NeuralNetworksPage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { PrintPage } from './pages/PrintPage.tsx'

export default function App() {
  const path = useRoute()
  const printView =
    path === '/aiml-501/algorithm-types/print' || path === '/aiml-501/llm-training/print'

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
  if (path === '/aiml-501/neural-networks') page = <NeuralNetworksPage />
  if (path === '/aiml-501/llm-training') page = <LlmTrainingPage />
  if (path === '/aiml-501/algorithm-types/print') page = <PrintPage />
  if (path === '/aiml-501/llm-training/print') page = <LlmPrintPage />

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
