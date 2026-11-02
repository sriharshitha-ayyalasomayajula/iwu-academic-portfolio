export type Paradigm = 'supervised' | 'unsupervised' | 'self-supervised'

export type ModelForm =
  | 'Classical algorithm'
  | 'Ensemble method'
  | 'Neural architecture'
  | 'Pretrained model family'
  | 'Generative model family'

export type Domain = 'tabular' | 'cv' | 'nlp' | 'genai'

export type ParadigmInfo = {
  id: Paradigm
  label: string
  laneNote: string
}

export type DomainInfo = {
  id: Domain
  label: string
  shortLabel: string
  description: string
}

export const paradigms: ParadigmInfo[] = [
  {
    id: 'supervised',
    label: 'Supervised',
    laneNote: 'The training examples include the outcome.',
  },
  {
    id: 'unsupervised',
    label: 'Unsupervised',
    laneNote: 'No externally supplied prediction label.',
  },
  {
    id: 'self-supervised',
    label: 'Self-supervised',
    laneNote: 'Inside unsupervised.',
  },
]

export const domains: DomainInfo[] = [
  {
    id: 'tabular',
    label: 'Tabular Data',
    shortLabel: 'Tab',
    description: 'Rows of mixed features, such as records, transactions, or sensor tables.',
  },
  {
    id: 'cv',
    label: 'Computer Vision',
    shortLabel: 'CV',
    description: 'Images, frames, and other visual signals.',
  },
  {
    id: 'nlp',
    label: 'Natural Language Processing',
    shortLabel: 'NLP',
    description: 'Text and other language data.',
  },
  {
    id: 'genai',
    label: 'Generative AI',
    shortLabel: 'GenAI',
    description:
      'A task category: producing new content. It is not a data modality, and it can sit alongside NLP or computer vision.',
  },
]

export const domainOrder: Domain[] = ['tabular', 'cv', 'nlp', 'genai']

export function paradigmById(id: Paradigm): ParadigmInfo {
  const paradigm = paradigms.find((item) => item.id === id)
  if (!paradigm) throw new Error(`Unknown paradigm: ${id}`)
  return paradigm
}

export function domainById(id: Domain): DomainInfo {
  const domain = domains.find((item) => item.id === id)
  if (!domain) throw new Error(`Unknown domain: ${id}`)
  return domain
}

export function chamferedForm(form: ModelForm): boolean {
  return form !== 'Classical algorithm' && form !== 'Ensemble method'
}
