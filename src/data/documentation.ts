export type DocBlock = {
  heading: string
  paragraphs: string[]
}

export type DocSection = {
  id: string
  title: string
  paragraphs: string[]
  blocks?: DocBlock[]
}

export const aboutSections: DocSection[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    paragraphs: [
      'This artifact compares ten algorithms used in model development. It keeps three questions apart: where the training signal comes from, what form the model takes, and where the method is typically applied. Those questions are easy to collapse into one label, and the figure is organized so they stay separate.',
      'The poster is the primary piece. The diagrams show one mechanism for each algorithm. The technical notes keep a short academic explanation, the relationship comparisons, and the sources.',
    ],
  },
  {
    id: 'description',
    title: 'Description',
    paragraphs: [
      'Each algorithm sits in a learning-paradigm lane, carries a model-form label, and shows primary and secondary application domains. Six relationships, lettered A through F, connect methods that share a component or that are often treated as substitutes. A classification matrix repeats the same decisions in a table.',
      'Use cases on the poster and in the notes are illustrative scenarios. They are not results from a study, and the figure does not report accuracy.',
    ],
  },
  {
    id: 'objective',
    title: 'Objective',
    paragraphs: [
      'I want to understand how these algorithms differ in learning paradigm, architecture, task, and application. The figure keeps those distinctions visible so a method is not reduced to a single label.',
    ],
  },
  {
    id: 'process',
    title: 'Process',
    paragraphs: [
      'I selected ten methods across tabular machine learning, computer vision, natural language processing, and generative AI. I researched their learning paradigms and the relationships among them, then developed the taxonomy and the mechanism diagrams. I revised the layout and terminology through multiple versions, checked the citations, exported the two-page infographic, and deployed this React and Vite portfolio to GitHub Pages.',
    ],
  },
  {
    id: 'ai-disclosure',
    title: 'AI Assistance',
    paragraphs: [
      'I used ChatGPT and Claude to support planning, technical review, and content refinement, and Cursor to assist with website implementation and deployment. I reviewed and revised the final content and presentation.',
    ],
  },
  {
    id: 'tools',
    title: 'Tools and Technologies',
    paragraphs: [
      'The site is a React and TypeScript application built with Vite. Layout and the mechanism diagrams are HTML, CSS, and inline SVG. No charting library was added. The Vite base path is /iwu-academic-portfolio/, for GitHub Pages, and public/404.html sends unknown project-site paths back into the single-page app.',
      'The downloadable infographic is a two-page landscape PDF, with a PNG and a JPEG of each page. The website shows the same taxonomy, relationships, and classification matrix, and adds the mechanism diagrams and references.',
    ],
  },
  {
    id: 'methodology',
    title: 'Classification Methodology',
    paragraphs: [],
    blocks: [
      {
        heading: 'What was compared',
        paragraphs: [
          'The set is decision tree, random forest, gradient boosting, k-means, PCA, convolutional networks, naive Bayes, BERT, GPT-style models, and diffusion models. It is not a full survey. Reinforcement learning is outside this version.',
        ],
      },
      {
        heading: 'Learning paradigm',
        paragraphs: [
          'Paradigm names the training signal. Supervised methods learn from examples that include the outcome. Unsupervised methods here do not: k-means groups rows, and PCA re-expresses features. Self-supervised methods build the target from the data itself, such as a masked token, the next token, or added noise. That group is drawn inside unsupervised and still labeled on its own.',
        ],
      },
      {
        heading: 'Model form',
        paragraphs: [
          'Model form is separate from paradigm: classical algorithm, ensemble, neural architecture, pretrained family, or generative family. A neural architecture is not a way of learning. Convolutional networks are supervised here because labeled image classification (LeCun et al., 1998) is the setting that established them. The same architecture is also trained with other objectives (Goodfellow et al., 2016).',
          'BERT and GPT-style models are pretrained families. BERT’s mask is the self-supervised step; later fine-tuning is not the paradigm. This figure calls GPT-style next-token training self-supervised because the target is taken from the sequence. Fine-tuning is optional. Diffusion is usually described as unsupervised generative modeling. It is placed here because the added-noise target is constructed from the data. Conditioning on text or a class does not make every diffusion model supervised.',
        ],
      },
      {
        heading: 'Application domain',
        paragraphs: [
          'The domains are tabular data, computer vision, natural language processing, and generative AI. A filled mark is primary. An open mark is secondary. Generative AI is a task category, not a data modality.',
        ],
      },
      {
        heading: 'Boundary cases',
        paragraphs: [
          'Naive Bayes is primarily NLP, beside BERT in relationship C, and secondarily tabular. K-means and PCA are primarily tabular and secondarily computer vision. Neither is a vision architecture. A convolutional network’s secondary generative mark is a component use: many diffusion models denoise with a convolutional U-Net (Ho et al., 2020). Not every diffusion model uses a CNN, and a CNN is not a diffusion model. Lloyd (1982) is the batch k-means procedure. MacQueen (1967) is the name.',
        ],
      },
      {
        heading: 'Why these six relationships',
        paragraphs: [
          'These links are choices, not every possible connection. A contrasts a forest’s parallel trees with boosting’s sequential trees. B contrasts grouping rows with transforming columns. C contrasts feature independence with bidirectional context. D contrasts encoder and decoder uses of the Transformer (Vaswani et al., 2017). E contrasts one new token with a whole-sample update. F records the U-Net as a common denoiser, not an identity between a CNN and a diffusion model.',
        ],
      },
    ],
  },
  {
    id: 'value',
    title: 'Value Proposition (Unique Value / Relevance)',
    paragraphs: [
      'The useful part of the figure is the separation of paradigm, model form, and domain, together with six relationships that can be checked against the sources. A reader can see that an ensemble remains supervised, that a Transformer is not one training objective, and that generative AI names a task. The same separation is why the self-supervised lane is drawn inside the unsupervised family and still labeled on its own.',
      'The figure does not rank the methods, report accuracy, or recommend an algorithm for a deployment. Primary domains are typical uses on this assignment, not exclusive ones.',
    ],
  },
]

export const visibleAboutSections = aboutSections.filter(
  (section) => section.paragraphs.length > 0 || (section.blocks?.length ?? 0) > 0,
)
