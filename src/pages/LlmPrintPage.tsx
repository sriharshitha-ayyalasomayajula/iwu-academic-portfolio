import { SiteLink } from '../components/SiteLink.tsx'
import { InfographicPage1, InfographicPage2 } from '../components/a34/InfographicSheets.tsx'
import { downloadHref } from '../data/downloads.ts'
import { llmArtifact } from '../data/llmTraining.ts'
import { site } from '../data/site.config.ts'
import { usePageTitle } from '../hooks/useRoute.ts'

export function LlmPrintPage() {
  usePageTitle(`Print · LLM Training · ${site.courseCode}`)

  return (
    <main id="main" className="print-main a34 a34-print-main">
      <div className="print-toolbar no-print">
        <p>Version 2 print layout. Two landscape pages, 17 × 11 inches.</p>
        <div className="download-bar">
          <ul>
            <li>
              <a href={downloadHref(llmArtifact.pdf)} download={llmArtifact.pdf}>
                PDF
              </a>
            </li>
            <li>
              <a href={downloadHref(llmArtifact.png1)} download={llmArtifact.png1}>
                PNG, page 1
              </a>
            </li>
            <li>
              <a href={downloadHref(llmArtifact.png2)} download={llmArtifact.png2}>
                PNG, page 2
              </a>
            </li>
          </ul>
        </div>
        <SiteLink href={llmArtifact.path}>Back to the artifact</SiteLink>
      </div>
      <InfographicPage1 />
      <InfographicPage2 />
    </main>
  )
}
