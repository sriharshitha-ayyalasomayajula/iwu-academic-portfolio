import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { warnIfSiteConfigIncomplete } from './data/site.config.ts'
import './index.css'
import './styles/poster.css'
import './styles/mechanisms.css'
import './styles/print.css'
import './styles/neural.css'
import './styles/a34.css'
import './styles/a44.css'
import App from './App.tsx'

warnIfSiteConfigIncomplete()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
