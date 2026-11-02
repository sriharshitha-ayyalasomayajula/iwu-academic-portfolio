import type { Reference } from '../data/references.ts'
import { references } from '../data/references.ts'

function formatSuffix(suffix: string | undefined): string | null {
  if (!suffix) return null
  if (suffix.startsWith(',') || /^\(\d/.test(suffix)) return suffix
  return suffix.startsWith(' ') ? suffix : ` ${suffix}`
}

function ReferenceEntry({ reference }: { reference: Reference }) {
  const italicTitle = reference.kind === 'book' || reference.kind === 'report'
  const title = italicTitle ? <em>{reference.title}</em> : reference.title
  const edition =
    reference.kind === 'book' && reference.containerSuffix ? ` ${reference.containerSuffix}` : null

  return (
    <>
      {reference.authors} ({reference.year}). {title}
      {edition}
      {reference.container ? (
        <>
          {reference.kind === 'proceedings' ? '. In ' : '. '}
          <em>{reference.container}</em>
          {reference.kind !== 'book' ? formatSuffix(reference.containerSuffix) : null}
        </>
      ) : null}
      {reference.publisher ? `. ${reference.publisher}` : null}
      {reference.url ? (
        <>
          .{' '}
          <a href={reference.url}>{reference.url}</a>
        </>
      ) : (
        '.'
      )}
      {reference.note ? <span className="reference-note"> {reference.note}</span> : null}
    </>
  )
}

export function ReferenceList() {
  return (
    <ul className="references">
      {references.map((reference) => (
        <li key={reference.id} id={`ref-${reference.id}`}>
          <ReferenceEntry reference={reference} />
        </li>
      ))}
    </ul>
  )
}
