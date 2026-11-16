import type { Evidence, Figure } from '../../content/a34/figures.ts'
import { evidenceName } from '../../content/a34/figures.ts'

export function EvidenceChip({ label }: { label: Evidence }) {
  return (
    <abbr className={`a34-chip a34-chip-${label.toLowerCase()}`} title={evidenceName[label]}>
      <span className="sr-only">{evidenceName[label]}: </span>
      {label}
    </abbr>
  )
}

export function FigureValue({ figure, hero = false }: { figure: Figure; hero?: boolean }) {
  return (
    <span className={hero ? 'a34-figure a34-figure-hero' : 'a34-figure'}>
      <span className="a34-figure-value">{figure.display}</span>
      <EvidenceChip label={figure.evidence} />
      {figure.sub ? <span className="a34-figure-sub">{figure.sub}</span> : null}
    </span>
  )
}
