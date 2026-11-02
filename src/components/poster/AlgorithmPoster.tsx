import { algorithmsInLane, getAlgorithm, type Algorithm } from '../../data/algorithms.ts'
import { downloadHref, infographicDownloads } from '../../data/downloads.ts'
import {
  formatRelationshipIds,
  relationshipIdsFor,
  relationships,
  type Relationship,
} from '../../data/relationships.ts'
import { site } from '../../data/site.config.ts'
import {
  chamferedForm,
  domainById,
  domainOrder,
  paradigmById,
  type Domain,
  type Paradigm,
} from '../../data/taxonomy.ts'

const lanes: Paradigm[] = ['supervised', 'unsupervised', 'self-supervised']

function domainState(algorithm: Algorithm, domain: Domain): 'primary' | 'secondary' | 'none' {
  if (algorithm.domains.primary.includes(domain)) return 'primary'
  if (algorithm.domains.secondary.includes(domain)) return 'secondary'
  return 'none'
}

function flowLabel(relationship: Relationship): string {
  const from = relationship.from.map((id) => getAlgorithm(id).shortName).join(', ')
  const to = relationship.to.map((id) => getAlgorithm(id).shortName).join(' / ')
  return `${from} ${relationship.bidirectional ? '↔' : '→'} ${to}`
}

function DomainDots({ algorithm }: { algorithm: Algorithm }) {
  return (
    <ul className="domain-dots">
      {domainOrder.map((domain) => {
        const state = domainState(algorithm, domain)
        const info = domainById(domain)
        const spoken =
          state === 'primary' ? 'primary' : state === 'secondary' ? 'secondary' : 'not a typical domain'
        return (
          <li key={domain} className={`domain-dot is-${state}`}>
            <span aria-hidden="true" className="dot-mark">
              {state === 'primary' ? '●' : state === 'secondary' ? '○' : '·'}
            </span>
            <span aria-hidden="true">{info.shortLabel}</span>
            <span className="sr-only">
              {info.label}: {spoken}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export function AlgorithmCard({ algorithm }: { algorithm: Algorithm }) {
  const letters = relationshipIdsFor(algorithm.id)
  const fullName = algorithm.shortName === algorithm.name ? null : algorithm.name
  return (
    <article
      className={`poster-node${chamferedForm(algorithm.modelForm) ? ' is-chamfer' : ' is-square'}`}
      aria-labelledby={`${algorithm.id}-name`}
    >
      <p className={`paradigm-badge paradigm-${algorithm.paradigm}`}>{paradigmById(algorithm.paradigm).label}</p>
      <h3 id={`${algorithm.id}-name`}>
        {algorithm.shortName}
        {fullName ? <span className="sr-only"> ({fullName})</span> : null}
      </h3>
      <p className="model-form">
        {algorithm.modelForm}
        {algorithm.paradigmNote ? ` · ${algorithm.paradigmNote}` : ''}
      </p>
      <DomainDots algorithm={algorithm} />
      <p className="node-summary">{algorithm.summary}</p>
      <p className="node-use">
        <span className="use-label">Use: </span>
        {algorithm.useCase}
      </p>
      <p className="node-edge-badges">
        {letters.map((letter) => (
          <a key={letter} href={`#rel-${letter}`}>
            {letter}
            <span className="sr-only"> {formatRelationshipIds([letter])}</span>
          </a>
        ))}
      </p>
    </article>
  )
}

export function PosterHeader({
  pageLabel,
  titleAs = 'h1',
  compact = false,
}: {
  pageLabel?: string
  titleAs?: 'h1' | 'p'
  compact?: boolean
}) {
  const courseLine = `${site.courseCode} ${site.courseTitle} · ${site.assignment} · ${site.institution}`
  const title = 'Algorithm Types'
  return (
    <header className="poster-header">
      <p className="poster-kicker">{courseLine}</p>
      <div className="poster-title-row">
        {titleAs === 'h1' ? (
          <h1 id="poster-title">{title}</h1>
        ) : (
          <p className="sheet-title">{title}</p>
        )}
        <p className="poster-meta">
          {site.studentName ? <span>{site.studentName}</span> : null}
          {site.term ? <span>{site.term}</span> : null}
          <span>{site.figureDate}</span>
          {pageLabel ? <span>{pageLabel}</span> : null}
        </p>
      </div>
      {compact ? null : (
        <p className="poster-thesis">
          Ten machine learning methods compared by learning paradigm, model form, application domain,
          and six relationships.
        </p>
      )}
    </header>
  )
}

export function DownloadBar() {
  if (infographicDownloads.length === 0) return null
  return (
    <div className="download-bar no-print">
      <p>Download the infographic</p>
      <ul>
        {infographicDownloads.map((item) => (
          <li key={item.id}>
            <a href={downloadHref(item.file)} download>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Lane({ paradigm }: { paradigm: Paradigm }) {
  const info = paradigmById(paradigm)
  return (
    <section className={`lane lane-${paradigm}`} aria-labelledby={`lane-${paradigm}`}>
      <header className="lane-head">
        <h3 id={`lane-${paradigm}`}>{info.label}</h3>
        <p>{info.laneNote}</p>
      </header>
      <div className="lane-nodes">
        {algorithmsInLane(paradigm).map((algorithm) => (
          <AlgorithmCard key={algorithm.id} algorithm={algorithm} />
        ))}
      </div>
    </section>
  )
}

export function TaxonomyZone() {
  return (
    <section className="zone zone-taxonomy" aria-labelledby="taxonomy-title">
      <h2 id="taxonomy-title">Algorithm taxonomy</h2>
      <Lane paradigm="supervised" />
      <div className="taxonomy-split">
        {lanes.slice(1).map((paradigm) => (
          <Lane key={paradigm} paradigm={paradigm} />
        ))}
      </div>
    </section>
  )
}

export function RelationshipCard({
  relationship,
  detailed = false,
}: {
  relationship: Relationship
  detailed?: boolean
}) {
  return (
    <article className="rel-card" id={detailed ? `compare-${relationship.id}` : `rel-${relationship.id}`}>
      <h3>
        <span className="letter-badge">{relationship.id}</span>
        {relationship.edgeLabel}
      </h3>
      <p className="rel-flow">{flowLabel(relationship)}</p>
      {detailed ? (
        <div className="table-scroll">
          <table className="comparison">
            <caption className="sr-only">
              {formatRelationshipIds([relationship.id])}. {relationship.edgeLabel}
            </caption>
            <thead>
              <tr>
                <th scope="col">Comparison</th>
                <th scope="col">{relationship.contrastHeaders[0]}</th>
                <th scope="col">{relationship.contrastHeaders[1]}</th>
              </tr>
            </thead>
            <tbody>
              {relationship.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  <td>{row.values[0]}</td>
                  <td>{row.values[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="contrast-pair">
          <p>{relationship.contrast[0]}</p>
          <p>{relationship.contrast[1]}</p>
        </div>
      )}
      <p className="rel-note">{relationship.note}</p>
    </article>
  )
}

export function RelationshipZone() {
  return (
    <section className="zone zone-relations" aria-labelledby="rel-panel-title">
      <h2 id="rel-panel-title">Relationships</h2>
      <p className="zone-intro">
        Six comparisons. The letter, the algorithms, and the difference sit together.
      </p>
      <div className="rel-grid">
        {relationships.map((relationship) => (
          <RelationshipCard key={relationship.id} relationship={relationship} />
        ))}
      </div>
    </section>
  )
}

function MatrixCell({ algorithm, domain }: { algorithm: Algorithm; domain: Domain }) {
  const state = domainState(algorithm, domain)
  const label = state === 'primary' ? 'Primary' : state === 'secondary' ? 'Secondary' : 'None'
  const mark = state === 'primary' ? '●' : state === 'secondary' ? '○' : '—'
  return (
    <td className={`matrix-${state}`}>
      <span aria-hidden="true">{mark}</span>
      <span className="sr-only">{label}</span>
    </td>
  )
}

export function PosterLegend() {
  return (
    <ul className="poster-legend">
      <li>
        <span className="swatch swatch-supervised" aria-hidden="true" />
        Supervised
      </li>
      <li>
        <span className="swatch swatch-unsupervised" aria-hidden="true" />
        Unsupervised
      </li>
      <li>
        <span className="swatch swatch-self" aria-hidden="true" />
        Self-supervised, drawn inside unsupervised
      </li>
      <li>
        <span className="swatch swatch-square" aria-hidden="true" />
        Square corners: classical algorithm or ensemble
      </li>
      <li>
        <span className="swatch swatch-chamfer" aria-hidden="true" />
        Rounded corner: neural architecture or model family
      </li>
      <li>● primary domain, ○ secondary domain</li>
      <li>
        <span className="swatch swatch-line" aria-hidden="true" />
        Letter A–F: relationship, listed with the comparisons
      </li>
    </ul>
  )
}

export function MatrixZone() {
  return (
    <section className="zone zone-matrix" aria-labelledby="matrix-title">
      <h2 id="matrix-title">Classification matrix</h2>
      <div className="matrix-scroll">
      <table className="matrix">
        <caption className="sr-only">Classification of the ten algorithms by paradigm and domain</caption>
        <thead>
          <tr>
            <th scope="col">Algorithm</th>
            <th scope="col">Paradigm</th>
            {domainOrder.map((domain) => (
              <th key={domain} scope="col">
                {domainById(domain).label}
              </th>
            ))}
          </tr>
        </thead>
        {lanes.map((paradigm) => (
          <tbody key={paradigm}>
            <tr className={`matrix-group matrix-group-${paradigm}`}>
              <th scope="rowgroup" colSpan={6}>
                {paradigmById(paradigm).label}
                {paradigm === 'self-supervised' ? ' · inside unsupervised' : ''}
              </th>
            </tr>
            {algorithmsInLane(paradigm).map((algorithm) => (
              <tr key={algorithm.id}>
                <th scope="row">{algorithm.name}</th>
                <td>{paradigmById(algorithm.paradigm).label}</td>
                {domainOrder.map((domain) => (
                  <MatrixCell key={domain} algorithm={algorithm} domain={domain} />
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
      </div>
      <PosterLegend />
      <p className="poster-footnote">
        Self-supervised: training targets are constructed from unlabeled data (masked token, next
        token, added noise); classified as unsupervised for this assignment. Generative AI is a
        task category. Use cases are illustrative. Mechanism diagrams and full references:
        https://sriharshitha-ayyalasomayajula.github.io/iwu-academic-portfolio/
      </p>
    </section>
  )
}

export function AlgorithmPoster() {
  return (
    <article className="poster" id="poster" aria-labelledby="poster-title">
      <PosterHeader />
      <DownloadBar />
      <TaxonomyZone />
      <RelationshipZone />
      <MatrixZone />
    </article>
  )
}
