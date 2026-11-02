export type RelationshipId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

export type ContrastTableRow = {
  label: string
  values: [string, string]
}

export type Relationship = {
  id: RelationshipId
  from: string[]
  to: string[]
  bidirectional: boolean
  edgeLabel: string
  contrast: [string, string]
  note: string
  contrastHeaders: [string, string]
  rows: ContrastTableRow[]
}

export const relationships: Relationship[] = [
  {
    id: 'A',
    from: ['decision-tree'],
    to: ['random-forest', 'gradient-boosting'],
    bidirectional: false,
    edgeLabel: 'Base learner: parallel vs. sequential',
    contrast: ['Independent trees, then average.', 'Sequential trees fit the remaining error.'],
    note: 'Both ensembles use trees. Forests train them separately. Boosting adds them to correct the current ensemble.',
    contrastHeaders: ['Random forest', 'Gradient boosting'],
    rows: [
      {
        label: 'Combination',
        values: [
          'Independent trees, then a vote or a mean.',
          'A new tree at each stage, fit to the remaining error.',
        ],
      },
      {
        label: 'How the trees differ',
        values: [
          'Bootstrap sample and a random feature subset (Breiman, 2001).',
          'Each tree is fit to the negative gradient of the current ensemble (Friedman, 2001).',
        ],
      },
      {
        label: 'Reading this contrast',
        values: [
          'Averaging less-alike trees is a guide to reducing variance, not a law.',
          'Stagewise fitting targets the error that remains. Depth and learning rate change the result.',
        ],
      },
    ],
  },
  {
    id: 'B',
    from: ['k-means'],
    to: ['pca'],
    bidirectional: true,
    edgeLabel: 'Groups rows vs. transforms columns',
    contrast: ['Assigns each row to a cluster.', 'Replaces columns with variance axes.'],
    note: 'Both skip prediction labels. Clustering does not reduce the feature count. PCA does not assign groups. They are often used together.',
    contrastHeaders: ['K-Means', 'PCA'],
    rows: [
      {
        label: 'Question',
        values: ['Which observations are similar?', 'Which directions in the features vary the most?'],
      },
      {
        label: 'Output',
        values: [
          'A cluster assignment for each observation, plus centroids.',
          'Orthogonal components and coordinates on those components.',
        ],
      },
      {
        label: 'What changes',
        values: ['Group membership of the rows.', 'The coordinate system of the features.'],
      },
      {
        label: 'Labels',
        values: ['Not used.', 'Not used.'],
      },
      {
        label: 'A limitation',
        values: [
          'K is chosen in advance, and Euclidean distance depends on scaling and initialization.',
          'The components are linear, and high variance is not always the useful signal.',
        ],
      },
    ],
  },
  {
    id: 'C',
    from: ['naive-bayes'],
    to: ['bert'],
    bidirectional: true,
    edgeLabel: 'Independence vs. context (text)',
    contrast: ['Multiplies feature probabilities.', 'Reads each token from both sides.'],
    note: 'Both can classify text. Naive Bayes is trained on labels. BERT is pretrained, then often fine-tuned.',
    contrastHeaders: ['Naive Bayes', 'BERT'],
    rows: [
      {
        label: 'Representation',
        values: ['A product of per-feature probabilities under a class.', 'A contextual vector for each token.'],
      },
      {
        label: 'Context',
        values: [
          'Features are treated as conditionally independent given the class.',
          'Each token is interpreted using tokens on both sides.',
        ],
      },
      {
        label: 'Training',
        values: [
          'Supervised estimation from labeled examples.',
          'Self-supervised masked-token pretraining, then often supervised fine-tuning.',
        ],
      },
      {
        label: 'Typical output',
        values: [
          'A class probability.',
          'A representation a task head can classify, tag, or use to predict a span.',
        ],
      },
    ],
  },
  {
    id: 'D',
    from: ['bert'],
    to: ['gpt'],
    bidirectional: true,
    edgeLabel: 'Encoder vs. decoder (shared Transformer)',
    contrast: ['Bidirectional masked-token encoder.', 'Causal next-token decoder.'],
    note: 'Both are Transformers (Vaswani et al., 2017). Direction of context and the pretraining target differ.',
    contrastHeaders: ['BERT', 'GPT-style models'],
    rows: [
      {
        label: 'Stack',
        values: ['Transformer encoder.', 'Transformer decoder.'],
      },
      {
        label: 'Context',
        values: [
          'Both directions, through masked-token pretraining.',
          'Previous tokens only, in the basic causal model.',
        ],
      },
      {
        label: 'Pretraining objective',
        values: [
          'Predict masked tokens. The original BERT model also trains a next-sentence objective.',
          'Predict the next token.',
        ],
      },
      {
        label: 'Typical use after pretraining',
        values: [
          'Fine-tune for classification, tagging, or span prediction.',
          'Generate by repeating next-token prediction. Fine-tuning or alignment may follow.',
        ],
      },
    ],
  },
  {
    id: 'E',
    from: ['gpt'],
    to: ['diffusion'],
    bidirectional: true,
    edgeLabel: 'Token-by-token vs. iterative denoising',
    contrast: ['Appends one token to a prefix.', 'Updates a whole sample from noise.'],
    note: 'Text is a common GPT-style case and images a common diffusion case. Neither mechanism is only one modality.',
    contrastHeaders: ['GPT-style models', 'Diffusion models'],
    rows: [
      {
        label: 'Generation step',
        values: [
          'Append one token conditioned on the prefix.',
          'Update the whole sample to remove some noise.',
        ],
      },
      {
        label: 'Repetition',
        values: ['Continue until a stopping condition.', 'Iterate through a schedule of noise levels.'],
      },
      {
        label: 'Training signal cited here',
        values: [
          'Next-token prediction (Radford et al., 2018).',
          'Noise prediction under a diffusion objective (Ho et al., 2020). Other formulations differ.',
        ],
      },
      {
        label: 'Modality',
        values: [
          'Often text or other tokens. The mechanism is not only prose.',
          'Often images. The mechanism is not only images.',
        ],
      },
    ],
  },
  {
    id: 'F',
    from: ['cnn'],
    to: ['diffusion'],
    bidirectional: false,
    edgeLabel: 'Convolutional U-Net = denoiser backbone',
    contrast: ['Local filters learn visual features.', 'A U-Net predicts the added noise.'],
    note: 'Ho et al. (2020) use a convolutional U-Net to denoise. Other diffusion backbones exist.',
    contrastHeaders: ['Convolutional network', 'Diffusion models'],
    rows: [
      {
        label: 'Role on this figure',
        values: [
          'An architecture that reuses local filters.',
          'A generative procedure that reverses added noise.',
        ],
      },
      {
        label: 'Where they meet',
        values: [
          'A convolutional U-Net is one denoiser used inside diffusion models.',
          'Ho et al. (2020) predict the added noise with that style of backbone.',
        ],
      },
      {
        label: 'Limit',
        values: [
          'A CNN is not itself a diffusion model.',
          'Not every diffusion model uses a convolutional U-Net.',
        ],
      },
    ],
  },
]

export function relationshipIdsFor(algorithmId: string): RelationshipId[] {
  return relationships
    .filter((item) => item.from.includes(algorithmId) || item.to.includes(algorithmId))
    .map((item) => item.id)
}

export function formatRelationshipIds(ids: RelationshipId[]): string {
  if (ids.length === 0) return ''
  if (ids.length === 1) return `Relationship ${ids[0]}`
  return `Relationships ${ids.join(', ')}`
}
