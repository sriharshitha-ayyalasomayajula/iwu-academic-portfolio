export type InfographicDownload = {
  id: string
  label: string
  file: string
}

/** Files produced by scripts/export-infographic.mjs into public/downloads/. */
export const infographicDownloads: InfographicDownload[] = [
  { id: 'pdf', label: 'PDF', file: 'aiml-501-algorithm-types.pdf' },
  { id: 'png-1', label: 'PNG, page 1', file: 'aiml-501-algorithm-types-page-1.png' },
  { id: 'png-2', label: 'PNG, page 2', file: 'aiml-501-algorithm-types-page-2.png' },
  { id: 'jpg-1', label: 'JPEG, page 1', file: 'aiml-501-algorithm-types-page-1.jpg' },
  { id: 'jpg-2', label: 'JPEG, page 2', file: 'aiml-501-algorithm-types-page-2.jpg' },
]

export function downloadHref(file: string): string {
  const base = import.meta.env.BASE_URL
  return `${base}downloads/${file}`
}
