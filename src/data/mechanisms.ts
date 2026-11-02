export type MechanismCopy = {
  id: string
  title: string
  caption: string
  description: string
}

export const mechanisms: MechanismCopy[] = [
  {
    id: 'decision-tree',
    title: 'Decision Tree',
    caption:
      'Each internal node tests one feature. Each leaf holds the prediction for the examples that reach it.',
    description:
      'A root box labeled feature test splits along two branches into a leaf for class A and a leaf for class B.',
  },
  {
    id: 'random-forest',
    title: 'Random Forest',
    caption:
      'Several trees are trained separately, with resampling and a random feature subset. Their predictions are then averaged or put to a vote.',
    description:
      'Three separate trees sit side by side, with arrows into one box labeled vote or average.',
  },
  {
    id: 'gradient-boosting',
    title: 'Gradient Boosting',
    caption:
      'Trees are added one at a time. Each new tree is fit to the remaining error of the ensemble so far, then added in.',
    description:
      'Three trees in a left-to-right sequence, each arrow labeled as fitting the remaining error, ending at an ensemble box.',
  },
  {
    id: 'k-means',
    title: 'K-Means',
    caption:
      'Assign every observation to the nearest centroid, then move each centroid to the mean of the observations assigned to it. Repeat until the assignments settle.',
    description:
      'Two panels. The first shows points assigned to two centroids. The second shows those centroids moved to the mean of each group.',
  },
  {
    id: 'pca',
    title: 'Principal Component Analysis',
    caption:
      'After centering, the first component follows the direction of greatest variance. Later components are orthogonal to the ones already chosen. Keeping the leading components reduces dimension.',
    description:
      'A cloud of points with a long axis marked PC1, a shorter orthogonal axis marked PC2, and a faint original feature axis.',
  },
  {
    id: 'cnn',
    title: 'Convolutional Neural Network',
    caption:
      'Small filters are reused across the image. Later layers combine those local responses. A head then maps the features to an output. The drawing shows the architecture, not one training objective.',
    description:
      'An input grid, then local filters, then feature maps, then an output, connected by arrows from left to right.',
  },
  {
    id: 'naive-bayes',
    title: 'Naive Bayes',
    caption:
      'Class-conditional feature probabilities are multiplied, then combined with the class prior. The class with the larger posterior is chosen. The product is the independence assumption.',
    description:
      'Three feature-likelihood boxes combine with a class prior and are compared as two class posteriors.',
  },
  {
    id: 'bert',
    title: 'BERT',
    caption:
      'A masked token is predicted from tokens on both sides. That bidirectional target is constructed from the text. A later fine-tuning stage is not drawn here.',
    description:
      'A row of tokens with the middle token masked. Arrows from the left tokens and the right tokens both point at the mask.',
  },
  {
    id: 'gpt',
    title: 'GPT-style Models',
    caption:
      'Each new token is predicted from the tokens that precede it. Future tokens are not used. Generation repeats that step and appends the chosen token.',
    description:
      'A row of tokens with arrows only from left to right into the next token. Tokens to the right of the prediction are marked as unseen.',
  },
  {
    id: 'diffusion',
    title: 'Diffusion Models',
    caption:
      'A forward process adds noise. The model learns the reverse: many small updates that remove noise, often by predicting the noise that was added. The drawing does not require one particular backbone.',
    description:
      'A top row shows an example becoming noise. A bottom row shows the reverse denoising steps back toward an example.',
  },
]

export type StudyGroup = {
  id: string
  title: string
  lede: string
  algorithmIds: string[]
  relationshipIds: Array<'A' | 'B' | 'C' | 'D' | 'E' | 'F'>
}

export const studyGroups: StudyGroup[] = [
  {
    id: 'trees',
    title: 'Trees and ensembles',
    lede: 'A decision tree is the shared base learner. Forests combine trees in parallel. Boosting adds them one at a time.',
    algorithmIds: ['decision-tree', 'random-forest', 'gradient-boosting'],
    relationshipIds: ['A'],
  },
  {
    id: 'structure',
    title: 'Clustering and dimensionality reduction',
    lede: 'Both methods are unsupervised. One assigns rows to groups. The other replaces columns with new axes.',
    algorithmIds: ['k-means', 'pca'],
    relationshipIds: ['B'],
  },
  {
    id: 'language',
    title: 'Language models and text classification',
    lede: 'Naive Bayes multiplies feature probabilities. BERT and GPT-style models are Transformers that read context in different directions.',
    algorithmIds: ['naive-bayes', 'bert', 'gpt'],
    relationshipIds: ['C', 'D'],
  },
  {
    id: 'vision',
    title: 'Computer vision and generative models',
    lede: 'Convolutional networks learn local visual features. Diffusion models remove noise over many steps. A U-Net is a common denoiser, not a requirement of every diffusion model.',
    algorithmIds: ['cnn', 'diffusion'],
    relationshipIds: ['F', 'E'],
  },
]
