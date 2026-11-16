export interface A34Link {
  label: string
  href: string
}

export interface A34Reference {
  id: string
  text: string
  /** Primary location. The page uses `links` when a citation names more than one document. */
  href?: string
  links?: A34Link[]
}

/** Section D reference list. URLs are the locations named by the blueprint or the prior verified package. */
export const a34References: A34Reference[] = [
  {
    id: 'L1',
    text: 'Meta. (2024). Llama 3.1 model card. Hugging Face / GitHub.',
    href: 'https://github.com/meta-llama/llama-models/blob/main/models/llama3_1/MODEL_CARD.md',
    links: [
      {
        label: 'GitHub model card',
        href: 'https://github.com/meta-llama/llama-models/blob/main/models/llama3_1/MODEL_CARD.md',
      },
      {
        label: 'Hugging Face model card',
        href: 'https://huggingface.co/meta-llama/Llama-3.1-405B',
      },
    ],
  },
  {
    id: 'L2',
    text: 'Llama Team, AI @ Meta. (2024). The Llama 3 herd of models. arXiv:2407.21783.',
    href: 'https://arxiv.org/abs/2407.21783',
  },
  {
    id: 'D1',
    text: 'DeepSeek-AI. (2024). DeepSeek-V3 technical report. arXiv:2412.19437.',
    href: 'https://arxiv.org/abs/2412.19437',
  },
  {
    id: 'B1',
    text: 'Luccioni, A. S., Viguier, S., & Ligozat, A.-L. (2023). Estimating the carbon footprint of BLOOM, a 176B parameter language model. JMLR, 24(253).',
    href: 'https://jmlr.org/papers/v24/23-0069.html',
  },
  {
    id: 'B2',
    text: 'BigScience. (2022). BLOOM model card. Hugging Face; BigScience Workshop (2022), arXiv:2211.05100.',
    href: 'https://huggingface.co/bigscience/bloom',
    links: [
      { label: 'Model card', href: 'https://huggingface.co/bigscience/bloom' },
      { label: 'Paper', href: 'https://arxiv.org/abs/2211.05100' },
    ],
  },
  {
    id: 'G1',
    text: 'OpenAI. (2023). GPT-4 technical report. arXiv:2303.08774.',
    href: 'https://arxiv.org/abs/2303.08774',
  },
  {
    id: 'G2',
    text: 'Stanford HAI. (2024). AI Index Report 2024, ch. 1.',
    href: 'https://hai.stanford.edu/assets/files/hai_ai-index-report-2024-smaller2.pdf',
  },
  {
    id: 'G3',
    text: 'Cottier, B., et al. (2024, rev. 2025). The rising costs of training frontier AI models. arXiv:2405.21015.',
    href: 'https://arxiv.org/abs/2405.21015',
  },
  {
    id: 'G4',
    text: 'Epoch AI. (n.d.). Notable AI models database, GPT-4 entry.',
    href: 'https://epoch.ai/data/ai-models',
  },
  {
    id: 'C1',
    text: 'Hoffmann, J., et al. (2022). Training compute-optimal large language models. arXiv:2203.15556.',
    href: 'https://arxiv.org/abs/2203.15556',
  },
]
