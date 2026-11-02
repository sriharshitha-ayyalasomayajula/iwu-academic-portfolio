import type { Domain, ModelForm, Paradigm } from './taxonomy.ts'

export type Algorithm = {
  id: string
  name: string
  shortName: string
  paradigm: Paradigm
  paradigmNote?: string
  modelForm: ModelForm
  domains: { primary: Domain[]; secondary: Domain[] }
  summary: string
  useCase: string
  detail: string
  detailUseCase: string
  citations: string[]
  posterRow: number
  posterColumn: number
}

export const algorithms: Algorithm[] = [
  {
    id: 'decision-tree',
    name: 'Decision Tree',
    shortName: 'Decision Tree',
    paradigm: 'supervised',
    modelForm: 'Classical algorithm',
    domains: { primary: ['tabular'], secondary: [] },
    summary: 'Splits labeled examples with feature tests and predicts at each leaf.',
    useCase: 'Trace a small-loan decision through readable rules.',
    detail:
      'A decision tree learns a sequence of tests from labeled examples. At each split it chooses a feature threshold that improves purity, using information gain or Gini impurity for classes, or a reduction in squared error for a numeric target (Quinlan, 1986; Hastie et al., 2009). Each leaf predicts a class by majority vote or a number by the mean of the cases that reach it. The fitted tree can be read as if-then rules.',
    detailUseCase:
      'A lender fits a shallow classification tree to past small-loan decisions so a reviewer can trace which income, debt, and delinquency tests led the model to approve or refer an application.',
    citations: ['quinlan-1986', 'hastie-2009'],
    posterRow: 1,
    posterColumn: 1,
  },
  {
    id: 'random-forest',
    name: 'Random Forest',
    shortName: 'Random Forest',
    paradigm: 'supervised',
    modelForm: 'Ensemble method',
    domains: { primary: ['tabular'], secondary: [] },
    summary: 'Averages many decision trees, each trained on a bootstrap sample of labeled data.',
    useCase: 'Estimate readmission risk from clinical record fields.',
    detail:
      'A random forest averages many decision trees. Each tree is trained on a bootstrap sample drawn with replacement from labeled data, and each split considers only a random subset of features (Breiman, 2001). The trees are fit independently. Classification forests combine them by majority vote, and regression forests by the mean. Resampling and the feature restriction make the trees less alike, so the average is less redundant than repeating one tree.',
    detailUseCase:
      'A clinic estimates 30-day readmission risk from tabular record fields, such as recent visits, diagnoses, and lab summaries, by combining many trees instead of trusting one unstable tree.',
    citations: ['breiman-2001'],
    posterRow: 1,
    posterColumn: 2,
  },
  {
    id: 'gradient-boosting',
    name: 'Gradient Boosting',
    shortName: 'Gradient Boosting',
    paradigm: 'supervised',
    modelForm: 'Ensemble method',
    domains: { primary: ['tabular'], secondary: [] },
    summary: 'Adds trees one at a time, each fit to the remaining error of the ensemble.',
    useCase: 'Estimate claim severity from policy and driver data.',
    detail:
      'Gradient boosting adds trees one at a time rather than averaging trees that were fit separately (Friedman, 2001). Each new tree is fit to the negative gradient of a chosen loss given the current ensemble. For squared error, that gradient is the remaining error. The step is scaled by a learning rate and then added in. Later trees focus on examples the ensemble still predicts poorly. Tree depth and the learning rate are the usual controls.',
    detailUseCase:
      'An insurer estimates claim severity from policy and driver tables. Each added tree is fit to the gradient of the pricing loss, so later trees concentrate on policies the current ensemble still misprices.',
    citations: ['friedman-2001'],
    posterRow: 1,
    posterColumn: 3,
  },
  {
    id: 'naive-bayes',
    name: 'Naive Bayes',
    shortName: 'Naive Bayes',
    paradigm: 'supervised',
    modelForm: 'Classical algorithm',
    domains: { primary: ['nlp'], secondary: ['tabular'] },
    summary:
      'Classifies by multiplying per-feature probabilities, assuming features are independent given the class.',
    useCase: 'Filter spam from word-presence counts in labeled mail.',
    detail:
      "Naive Bayes estimates the probability of a class from features by Bayes' theorem. It treats features as conditionally independent given the class, so the class-conditional likelihood is a product of per-feature probabilities estimated from labeled data (Hastie et al., 2009). A Gaussian model is used for continuous features, and multinomial or Bernoulli models for word counts. The predicted class has the largest posterior. The independence assumption is often false, and n-grams add only local order.",
    detailUseCase:
      'A mail filter estimates whether a message is spam from word-presence features, combining per-word probabilities that were counted on labeled mail.',
    citations: ['hastie-2009'],
    posterRow: 2,
    posterColumn: 1,
  },
  {
    id: 'k-means',
    name: 'K-Means Clustering',
    shortName: 'K-Means',
    paradigm: 'unsupervised',
    modelForm: 'Classical algorithm',
    domains: { primary: ['tabular'], secondary: ['cv'] },
    summary: 'Partitions observations into K groups around moving centroids.',
    useCase: 'Segment customers by recency, frequency, and spend.',
    detail:
      "The standard procedure, often called Lloyd's algorithm (Lloyd, 1982), alternates two steps: assign each observation to the nearest centroid, then move each centroid to the mean of its assigned observations. MacQueen (1967) introduced the name k-means. It converges to a local optimum, so results depend on initialization and on the chosen K. The usual objective is the within-cluster sum of squared Euclidean distances, and feature scale changes which points look close.",
    detailUseCase:
      'A retailer groups customers by purchase recency, frequency, and average order value into a chosen number of segments, then reviews whether those segments are useful for different promotions.',
    citations: ['lloyd-1982', 'macqueen-1967'],
    posterRow: 1,
    posterColumn: 1,
  },
  {
    id: 'pca',
    name: 'Principal Component Analysis',
    shortName: 'PCA',
    paradigm: 'unsupervised',
    modelForm: 'Classical algorithm',
    domains: { primary: ['tabular'], secondary: ['cv'] },
    summary: 'Rotates centered features into uncorrelated directions of high variance.',
    useCase: 'Compress correlated sensor readings before plotting them.',
    detail:
      'Principal component analysis re-expresses centered features as uncorrelated linear combinations. The first component is the direction of greatest variance, and each later component is the greatest-variance direction orthogonal to those already chosen (Hastie et al., 2009). Those directions are eigenvectors of the covariance matrix. Keeping the leading components reduces dimension while retaining the variance they explain. PCA does not assign clusters and does not use a prediction label. High variance is not always the signal a later task needs.',
    detailUseCase:
      'Before plotting a process with hundreds of correlated sensor readings, an analyst projects the centered readings onto a few components that retain most of the measured variance.',
    citations: ['hastie-2009'],
    posterRow: 1,
    posterColumn: 2,
  },
  {
    id: 'cnn',
    name: 'Convolutional Neural Network',
    shortName: 'CNN',
    paradigm: 'supervised',
    paradigmNote: 'usually trained with labels',
    modelForm: 'Neural architecture',
    domains: { primary: ['cv'], secondary: ['genai'] },
    summary: 'Reuses local filters across an image to build visual features.',
    useCase: 'Flag chest X-rays that may need radiologist review.',
    detail:
      'A convolutional network applies learnable filters to local neighborhoods and reuses each filter across positions. LeCun et al. (1998) demonstrated a convolutional network (LeNet-5) for document recognition. Later networks changed the depth and the training details; local weight sharing is the idea used here. Image classifiers are often trained with labels, and the same architecture is also trained with other objectives. Convolutional U-Nets are a standard denoising backbone in diffusion models (Ho et al., 2020).',
    detailUseCase:
      'A screening workflow trains a convolutional network on labeled chest X-rays to flag studies that may show pneumonia and route those studies to a radiologist. The flag is an input to review, not a diagnosis.',
    citations: ['lecun-1998', 'ho-2020'],
    posterRow: 2,
    posterColumn: 3,
  },
  {
    id: 'bert',
    name: 'BERT',
    shortName: 'BERT',
    paradigm: 'self-supervised',
    paradigmNote: 'then supervised fine-tuning',
    modelForm: 'Pretrained model family',
    domains: { primary: ['nlp'], secondary: [] },
    summary: 'Builds bidirectional token context, then fine-tunes on labeled tasks.',
    useCase: 'Route support tickets from the words in context.',
    detail:
      'BERT is a Transformer encoder (Vaswani et al., 2017; Devlin et al., 2019). Self-attention builds each token’s representation from tokens on both sides. Pretraining hides some tokens and trains the model to recover them from that bidirectional context. The published model also uses a next-sentence objective. Those targets are constructed from the text. A task head is then often fine-tuned with labeled data. BERT represents language and is not trained to continue a prefix one token at a time.',
    detailUseCase:
      'A support desk fine-tunes a pretrained BERT encoder on labeled tickets so a new ticket can be routed to billing, access, or technical support from the words in context, rather than from an unordered word list.',
    citations: ['vaswani-2017', 'devlin-2019'],
    posterRow: 1,
    posterColumn: 1,
  },
  {
    id: 'gpt',
    name: 'GPT-style Autoregressive Models',
    shortName: 'GPT-style models',
    paradigm: 'self-supervised',
    paradigmNote: 'fine-tuning optional',
    modelForm: 'Pretrained model family',
    domains: { primary: ['nlp', 'genai'], secondary: [] },
    summary: 'Predicts the next token from earlier tokens, then continues the sequence.',
    useCase: 'Draft a lab abstract one token at a time.',
    detail:
      'GPT-style models are decoder-only Transformers trained to predict the next token from the preceding tokens (Radford et al., 2018). Attention is causal, so a position does not use future tokens. Generation repeats that prediction and appends each chosen token. The 2018 report describes this pretraining as unsupervised; the target is the next token from the sequence itself. Fine-tuning or alignment can be added later and is optional. The same next-token training is also used on token sequences other than prose.',
    detailUseCase:
      'A researcher prompts a GPT-style model with notes for a lab abstract. The model drafts the paragraph one token at a time, each token conditioned on the notes and on the tokens already written.',
    citations: ['radford-2018', 'vaswani-2017'],
    posterRow: 1,
    posterColumn: 2,
  },
  {
    id: 'diffusion',
    name: 'Diffusion Models',
    shortName: 'Diffusion models',
    paradigm: 'self-supervised',
    paradigmNote: 'can be text-conditioned',
    modelForm: 'Generative model family',
    domains: { primary: ['cv', 'genai'], secondary: [] },
    summary: 'Learns to reverse added noise over many denoising steps.',
    useCase: 'Propose a product photo from a written brief.',
    detail:
      'A diffusion model learns to reverse a process that gradually corrupts an example with noise. Sampling starts from noise and applies many small updates. Ho et al. (2020) train a network to predict the noise added at each step. Unconditional models do not use task labels. Conditional models can also receive text or another input, so conditioning is separate from the denoising objective. The mechanism is iterative refinement and is not limited to images or to one backbone.',
    detailUseCase:
      'A product team conditions a diffusion model on a written photo brief, such as a matte black kettle on a walnut table in soft side light, and reviews the image produced across the denoising steps.',
    citations: ['ho-2020'],
    posterRow: 1,
    posterColumn: 3,
  },
]

const algorithmMap: Record<string, Algorithm> = Object.fromEntries(
  algorithms.map((algorithm) => [algorithm.id, algorithm]),
)

export const matrixOrder = [
  'decision-tree',
  'random-forest',
  'gradient-boosting',
  'k-means',
  'pca',
  'cnn',
  'naive-bayes',
  'bert',
  'gpt',
  'diffusion',
] as const

export function getAlgorithm(id: string): Algorithm {
  const algorithm = algorithmMap[id]
  if (!algorithm) throw new Error(`Unknown algorithm id: ${id}`)
  return algorithm
}

export function algorithmsInLane(paradigm: Paradigm): Algorithm[] {
  return algorithms
    .filter((algorithm) => algorithm.paradigm === paradigm)
    .sort((a, b) => a.posterRow - b.posterRow || a.posterColumn - b.posterColumn)
}

export function matrixAlgorithms(): Algorithm[] {
  return matrixOrder.map((id) => getAlgorithm(id))
}
