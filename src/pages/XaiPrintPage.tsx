import { InfographicPage1, InfographicPage2 } from '../components/a44/InfographicSheets.tsx'
import { SiteLink } from '../components/SiteLink.tsx'
import { downloadHref } from '../data/downloads.ts'
import { site } from '../data/site.config.ts'
import { xaiArtifact } from '../data/xai.ts'
import { usePageTitle } from '../hooks/useRoute.ts'

export function XaiPrintPage() {
  usePageTitle(`Print · Explainable AI · ${site.courseCode}`)

  return (
    <main id="main" className="print-main a44 a44-print-main">
      <div className="print-toolbar no-print">
        <p>Assignment 4.4 print layout. Two landscape pages, 17 × 11 inches.</p>
        <div className="download-bar">
          <ul>
            <li>
              <a href={downloadHref(xaiArtifact.pdf)} download={xaiArtifact.pdf}>
                PDF
              </a>
            </li>
            <li>
              <a href={downloadHref(xaiArtifact.png1)} download={xaiArtifact.png1}>
                PNG, page 1
              </a>
            </li>
            <li>
              <a href={downloadHref(xaiArtifact.png2)} download={xaiArtifact.png2}>
                PNG, page 2
              </a>
            </li>
          </ul>
        </div>
        <SiteLink href={xaiArtifact.path}>Back to the artifact</SiteLink>
      </div>
      <InfographicPage1 />
      <InfographicPage2 />
    </main>
  )
}
