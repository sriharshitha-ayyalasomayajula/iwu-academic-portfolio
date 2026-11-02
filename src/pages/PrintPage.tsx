import {
  DownloadBar,
  MatrixZone,
  PosterHeader,
  PosterLegend,
  RelationshipZone,
  TaxonomyZone,
} from '../components/poster/AlgorithmPoster.tsx'
import { SiteLink } from '../components/SiteLink.tsx'
import { site } from '../data/site.config.ts'
import { usePageTitle } from '../hooks/useRoute.ts'

export function PrintPage() {
  usePageTitle(`Print · Algorithm Types · ${site.courseCode}`)

  return (
    <main id="main" className="print-main page-wide">
      <div className="print-toolbar no-print">
        <p>
          These two sheets are the infographic. Page 1 is the taxonomy. Page 2 is the relationships
          and the classification matrix. The mechanism diagrams stay on the website.
        </p>
        <DownloadBar />
        <SiteLink href="/aiml-501/algorithm-types">Back to the artifact</SiteLink>
      </div>
      <article className="print-sheet">
        <PosterHeader pageLabel="Page 1 of 2" titleAs="h1" />
        <TaxonomyZone />
        <div className="sheet-fill">
          <PosterLegend />
        </div>
      </article>
      <article className="print-sheet">
        <PosterHeader pageLabel="Page 2 of 2" titleAs="p" compact />
        <RelationshipZone />
        <MatrixZone />
      </article>
    </main>
  )
}
