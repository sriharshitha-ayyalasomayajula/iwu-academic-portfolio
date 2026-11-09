export const neuralArtifact = {
  path: '/aiml-501/neural-networks',
  eyebrow: 'AIML-501 · Assignment 2.4',
  title: 'Inside a Neural Network: Components and TensorFlow Playground Experiments',
  summary:
    'Exploring neural network structure, nonlinear activation, and model evaluation through TensorFlow Playground experiments.',
  pptx: 'aiml-501-neural-networks.pptx',
  pdf: 'aiml-501-neural-networks.pdf',
}

export const neuralShots = {
  exp1a: 'aiml-501/neural-networks/exp1a-circle.png',
  exp1b: 'aiml-501/neural-networks/exp1b-circle.png',
  exp2a: 'aiml-501/neural-networks/exp2a-xor.png',
  exp2b: 'aiml-501/neural-networks/exp2b-xor.png',
  exp3a: 'aiml-501/neural-networks/exp3a-spiral.png',
  exp3b: 'aiml-501/neural-networks/exp3b-spiral.png',
  weights: 'aiml-501/neural-networks/weights-crop.png',
}

export const componentGroups = [
  {
    title: 'Structure',
    items: ['Layers', 'Neurons', 'Weights'],
    note: 'Layers order the computation. Neurons combine inputs. Weights, with biases, are the trainable parameters.',
  },
  {
    title: 'Transformation',
    items: ['Activation functions'],
    note: 'A nonlinear activation lets stacked layers represent a curved decision region. These runs compare Linear and Tanh.',
  },
  {
    title: 'Learning',
    items: ['Loss functions', 'Optimization algorithms'],
    note: 'The loss scores the error. Common loss functions include mean squared error and cross-entropy; the appropriate choice depends on the task. Gradient descent is a common optimization algorithm, and the learning rate controls the size of each parameter update. Those settings stayed fixed.',
  },
]

export const experiments = [
  {
    id: 'experiment-1',
    title: 'Experiment 1: Network architecture',
    question: 'How do hidden layers affect a network’s ability to learn the circle data?',
    shots: [
      {
        src: neuralShots.exp1a,
        alt: 'TensorFlow Playground circle data with no hidden layers at epoch 535. The decision boundary is straight and linear, training loss 0.486, test loss 0.492.',
        label: '1A · No hidden layers',
        facts: ['Epoch 535', 'Training loss 0.486', 'Test loss 0.492'],
        reading: 'A straight, linear decision boundary. The network underfits the circle.',
      },
      {
        src: neuralShots.exp1b,
        alt: 'TensorFlow Playground circle data with two hidden layers of two Tanh neurons at epoch 528. Training loss 0.137, test loss 0.202.',
        label: '1B · Two hidden layers, 2 neurons, Tanh',
        facts: ['Epoch 528', 'Training loss 0.137', 'Test loss 0.202'],
        reading:
          'The boundary bends around the circle but does not fully enclose it; test loss remains higher than training loss.',
      },
    ],
    interpretation:
      'Adding hidden layers let the network represent a nonlinear region and lowered the observed test loss. The pair does not establish an ideal architecture.',
  },
  {
    id: 'experiment-2',
    title: 'Experiment 2: Linear vs. Tanh',
    question:
      'Why does a nonlinear activation matter on XOR? Both networks use two hidden layers of four neurons, learning rate 0.03, and noise 0.',
    shots: [
      {
        src: neuralShots.exp2a,
        alt: 'TensorFlow Playground XOR data with a linear activation at epoch 526. Training loss 0.491, test loss 0.513.',
        label: '2A · Linear',
        facts: ['Epoch 526', 'Training loss 0.491', 'Test loss 0.513'],
        reading: 'The network does not learn the four XOR regions.',
      },
      {
        src: neuralShots.exp2b,
        alt: 'TensorFlow Playground XOR data with Tanh activation at epoch 536. Training loss displayed as 0.000, test loss 0.001.',
        label: '2B · Tanh',
        facts: ['Epoch 536', 'Training loss 0.000', 'Test loss 0.001'],
        reading: 'The output shows four separate XOR regions. The training loss is the rounded display, not exactly zero.',
      },
    ],
    interpretation:
      'Stacking linear maps remains an affine transformation. Tanh let this network represent the XOR pattern.',
  },
  {
    id: 'experiment-3',
    title: 'Experiment 3: Noise and generalization',
    question:
      'How do training loss and test loss compare on the spiral data? Both networks use three hidden layers of eight Tanh neurons and learning rate 0.03.',
    shots: [
      {
        src: neuralShots.exp3a,
        alt: 'TensorFlow Playground spiral data with noise 0 at epoch 1017. Training loss 0.010, test loss 0.073.',
        label: '3A · Noise 0',
        facts: ['Epoch 1,017', 'Training loss 0.010', 'Test loss 0.073', 'Gap 0.063'],
        reading: 'The boundary follows the spiral. Training loss is lower than test loss.',
      },
      {
        src: neuralShots.exp3b,
        alt: 'TensorFlow Playground spiral data with noise 25 at epoch 1030. Training loss 0.034, test loss 0.041.',
        label: '3B · Noise 25',
        facts: ['Epoch 1,030', 'Training loss 0.034', 'Test loss 0.041', 'Gap 0.007'],
        reading: 'The boundary still follows the spiral. The observed train-to-test gap is smaller.',
      },
    ],
    interpretation:
      'Both runs learned a spiral-shaped region. The smaller gap in the noise-25 run cannot be attributed to noise: the generated samples differ, each configuration was run once, and the initial weights may have differed. The comparison does not show that adding noise improves generalization. Training loss and test loss need to be read together.',
  },
]

export const neuralReferences = [
  {
    id: 'goodfellow-2016',
    text: 'Goodfellow, I., Bengio, Y., & Courville, A. (2016). Deep learning. MIT Press.',
    url: 'https://www.deeplearningbook.org/',
  },
  {
    id: 'google-nn',
    text: 'Google. (n.d.). Neural networks. Machine Learning Crash Course.',
    url: 'https://developers.google.com/machine-learning/crash-course/neural-networks',
  },
  {
    id: 'rumelhart-1986',
    text: 'Rumelhart, D. E., Hinton, G. E., & Williams, R. J. (1986). Learning representations by back-propagating errors. Nature, 323(6088), 533–536.',
    url: 'https://doi.org/10.1038/323533a0',
  },
  {
    id: 'playground',
    text: 'Smilkov, D., & Carter, S. (n.d.). TensorFlow Playground.',
    url: 'https://playground.tensorflow.org/',
  },
  {
    id: 'smilkov-2017',
    text: 'Smilkov, D., Carter, S., Sculley, D., Viégas, F. B., & Wattenberg, M. (2017). Direct-manipulation visualization of deep networks. arXiv.',
    url: 'https://arxiv.org/abs/1708.03788',
  },
]
