export type ReferenceKind = 'article' | 'book' | 'proceedings' | 'report'

export type Reference = {
  id: string
  kind: ReferenceKind
  authors: string
  year: string
  title: string
  container?: string
  containerSuffix?: string
  publisher?: string
  url?: string
  note?: string
}

export const references: Reference[] = [
  {
    id: 'breiman-2001',
    kind: 'article',
    authors: 'Breiman, L.',
    year: '2001',
    title: 'Random forests',
    container: 'Machine Learning, 45',
    containerSuffix: '(1), 5–32',
    url: 'https://doi.org/10.1023/A:1010933404324',
  },
  {
    id: 'devlin-2019',
    kind: 'proceedings',
    authors: 'Devlin, J., Chang, M.-W., Lee, K., & Toutanova, K.',
    year: '2019',
    title:
      'BERT: Pre-training of deep bidirectional transformers for language understanding',
    container:
      'Proceedings of the 2019 Conference of the North American Chapter of the Association for Computational Linguistics: Human Language Technologies',
    containerSuffix: '(pp. 4171–4186)',
    publisher: 'Association for Computational Linguistics',
    url: 'https://doi.org/10.18653/v1/N19-1423',
  },
  {
    id: 'friedman-2001',
    kind: 'article',
    authors: 'Friedman, J. H.',
    year: '2001',
    title: 'Greedy function approximation: A gradient boosting machine',
    container: 'The Annals of Statistics, 29',
    containerSuffix: '(5), 1189–1232',
    url: 'https://doi.org/10.1214/aos/1013203451',
  },
  {
    id: 'goodfellow-2016',
    kind: 'book',
    authors: 'Goodfellow, I., Bengio, Y., & Courville, A.',
    year: '2016',
    title: 'Deep learning',
    publisher: 'MIT Press',
    url: 'https://www.deeplearningbook.org/',
  },
  {
    id: 'hastie-2009',
    kind: 'book',
    authors: 'Hastie, T., Tibshirani, R., & Friedman, J.',
    year: '2009',
    title: 'The elements of statistical learning: Data mining, inference, and prediction',
    containerSuffix: '(2nd ed.)',
    publisher: 'Springer',
    url: 'https://doi.org/10.1007/978-0-387-84858-7',
  },
  {
    id: 'ho-2020',
    kind: 'proceedings',
    authors: 'Ho, J., Jain, A., & Abbeel, P.',
    year: '2020',
    title: 'Denoising diffusion probabilistic models',
    container: 'Advances in Neural Information Processing Systems 33',
    containerSuffix: '(NeurIPS 2020), 6840–6851',
    url: 'https://proceedings.neurips.cc/paper/2020/hash/4c5bcfec8584af0d967f1ab10179ca4b-Abstract.html',
  },
  {
    id: 'lecun-1998',
    kind: 'article',
    authors: 'LeCun, Y., Bottou, L., Bengio, Y., & Haffner, P.',
    year: '1998',
    title: 'Gradient-based learning applied to document recognition',
    container: 'Proceedings of the IEEE, 86',
    containerSuffix: '(11), 2278–2324',
    url: 'https://doi.org/10.1109/5.726791',
  },
  {
    id: 'lloyd-1982',
    kind: 'article',
    authors: 'Lloyd, S. P.',
    year: '1982',
    title: 'Least squares quantization in PCM',
    container: 'IEEE Transactions on Information Theory, 28',
    containerSuffix: '(2), 129–137',
    url: 'https://doi.org/10.1109/TIT.1982.1056489',
  },
  {
    id: 'macqueen-1967',
    kind: 'proceedings',
    authors: 'MacQueen, J.',
    year: '1967',
    title: 'Some methods for classification and analysis of multivariate observations',
    container:
      'Proceedings of the Fifth Berkeley Symposium on Mathematical Statistics and Probability',
    containerSuffix: '(Vol. 1, pp. 281–297)',
    publisher: 'University of California Press',
  },
  {
    id: 'quinlan-1986',
    kind: 'article',
    authors: 'Quinlan, J. R.',
    year: '1986',
    title: 'Induction of decision trees',
    container: 'Machine Learning, 1',
    containerSuffix: '(1), 81–106',
    url: 'https://doi.org/10.1007/bf00116251',
  },
  {
    id: 'radford-2018',
    kind: 'report',
    authors: 'Radford, A., Narasimhan, K., Salimans, T., & Sutskever, I.',
    year: '2018',
    title: 'Improving language understanding by generative pre-training',
    publisher: 'OpenAI',
    url: 'https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf',
  },
  {
    id: 'vaswani-2017',
    kind: 'proceedings',
    authors:
      'Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I.',
    year: '2017',
    title: 'Attention is all you need',
    container: '31st Conference on Neural Information Processing Systems (NIPS 2017)',
    url: 'https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf',
  },
]

const inText: Record<string, string> = {
  'breiman-2001': 'Breiman (2001)',
  'devlin-2019': 'Devlin et al. (2019)',
  'friedman-2001': 'Friedman (2001)',
  'goodfellow-2016': 'Goodfellow et al. (2016)',
  'hastie-2009': 'Hastie et al. (2009)',
  'ho-2020': 'Ho et al. (2020)',
  'lecun-1998': 'LeCun et al. (1998)',
  'lloyd-1982': 'Lloyd (1982)',
  'macqueen-1967': 'MacQueen (1967)',
  'quinlan-1986': 'Quinlan (1986)',
  'radford-2018': 'Radford et al. (2018)',
  'vaswani-2017': 'Vaswani et al. (2017)',
}

export function citationText(id: string): string {
  const label = inText[id]
  if (!label) throw new Error(`No in-text citation for ${id}`)
  return label
}

export function citationList(ids: string[]): string {
  return ids.map((id) => citationText(id)).join('; ')
}
