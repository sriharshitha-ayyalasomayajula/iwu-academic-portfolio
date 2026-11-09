import { SiteLink } from '../components/SiteLink.tsx'
import { downloadHref } from '../data/downloads.ts'
import {
  componentGroups,
  experiments,
  neuralArtifact,
  neuralReferences,
  neuralShots,
} from '../data/neuralNetworks.ts'
import { site } from '../data/site.config.ts'
import { usePageTitle } from '../hooks/useRoute.ts'

function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path}`
}

export function NeuralNetworksPage() {
  usePageTitle(`Neural Networks · ${site.courseCode}`)

  return (
    <main id="main" className="page page-wide nn-page">
      <header className="nn-intro">
        <p className="eyebrow">{neuralArtifact.eyebrow}</p>
        <h1>{neuralArtifact.title}</h1>
        <p className="lede">
          I use three TensorFlow Playground comparisons to see how layers, activation, and
          evaluation change what a network learns.
        </p>
        <p>
          {site.studentName} · {site.institution} · {site.term}
        </p>
        <div className="button-row">
          <a className="button" href={downloadHref(neuralArtifact.pptx)} download={neuralArtifact.pptx}>
            Download PowerPoint
          </a>
        </div>
      </header>

      <section className="prose-section" id="objective" aria-labelledby="objective-title">
        <h2 id="objective-title">Objective</h2>
        <div className="nn-copy">
        <p>
          I want to understand how layers, neurons, weights, activation functions, loss, and
          optimization work together, and how those choices show up in a decision boundary and in
          training and test loss.
        </p>
        </div>
      </section>

      <section className="prose-section" id="description" aria-labelledby="description-title">
        <h2 id="description-title">Description</h2>
        <div className="nn-copy">
        <p>
          The artifact explains six neural network components and reports three Playground
          comparisons: circle data with and without hidden layers, XOR with linear and Tanh
          activations, and spiral data at two noise settings. The learning rate is 0.03 and the
          batch size is 10 in every run. I did not vary the loss function or the optimizer.
        </p>
        </div>
      </section>

      <section className="prose-section" id="process" aria-labelledby="process-title">
        <h2 id="process-title">Process</h2>
        <div className="nn-copy">
        <p>
          I trained each configuration and saved a screenshot showing the epoch count and
          the training and test loss. The six
          trained screenshots are the evidence. Initial screenshots at epoch 0 stay in the project
          folder and are not the results. I then built the 11-slide presentation and this page
          from those images and the numbers printed on them.
        </p>
        </div>
      </section>

      <section className="prose-section" aria-labelledby="value-title">
        <h2 id="value-title">Unique Value and Relevance</h2>
        <div className="nn-split">
          <article>
            <h3>Unique Value</h3>
            <p>
              The six components stay next to the runs that use them. The same screenshots and
              loss values appear here and in the downloadable slides.
            </p>
          </article>
          <article>
            <h3>Relevance</h3>
            <p>
              The comparison is for students and practitioners who need to see how architecture,
              activation, and evaluation change a model choice before they commit to one.
            </p>
          </article>
        </div>
      </section>

      <section className="prose-section" id="components" aria-labelledby="components-title">
        <h2 id="components-title">Six components</h2>
        <p className="nn-copy">
          This is an instructional grouping by primary role, not a standardized or mutually
          exclusive taxonomy. Weights are part of the structure, and training updates them.
        </p>
        <div className="nn-groups">
          {componentGroups.map((group) => (
            <article key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>{group.note}</p>
            </article>
          ))}
        </div>
        <p className="nn-flow">
          Each neuron applies an activation function to its weighted inputs and bias. The loss
          measures prediction error, backpropagation computes gradients, and the optimizer
          updates the weights and biases.
        </p>
      </section>

      <section className="prose-section" id="architecture" aria-labelledby="architecture-title">
        <h2 id="architecture-title">Architecture used in Experiment 2</h2>
        <p>Two inputs, two hidden layers of four neurons, and one output.</p>
        <NetworkDiagram />
        <p className="nn-copy">
          This diagram is schematic. The highlighted blue connection illustrates a positive weight,
          and the highlighted orange connection illustrates a negative weight. One neuron computes
          a = f(Σ wᵢxᵢ + b). Forward propagation makes the prediction. The loss measures the error.
          Backpropagation computes gradients. The optimizer updates the weights and biases. In
          these runs, η = 0.03.
        </p>
        <figure className="nn-figure nn-weights">
          <img
            src={asset(neuralShots.weights)}
            alt="Crop of the trained XOR Tanh network showing blue positive weights and orange negative weights."
          />
          <figcaption>
            Playground draws a positive weight in blue and a negative weight in orange. Thickness
            shows magnitude. Crop from Experiment 2B.
          </figcaption>
        </figure>
      </section>

      {experiments.map((experiment) => (
        <section className="prose-section" id={experiment.id} key={experiment.id} aria-labelledby={`${experiment.id}-title`}>
          <h2 id={`${experiment.id}-title`}>{experiment.title}</h2>
          <p>{experiment.question}</p>
          <div className="nn-compare">
            {experiment.shots.map((shot) => (
              <figure key={shot.src} className="nn-figure">
                <a href={asset(shot.src)} target="_blank" rel="noopener noreferrer">
                  <img src={asset(shot.src)} alt={shot.alt} />
                </a>
                <figcaption>
                  <strong>{shot.label}</strong>
                  <ul>
                    {shot.facts.map((fact) => (
                      <li key={fact}>{fact}</li>
                    ))}
                  </ul>
                  <p>{shot.reading}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="nn-copy">{experiment.interpretation}</p>
        </section>
      ))}

      <section className="prose-section" id="visualization" aria-labelledby="visualization-title">
        <h2 id="visualization-title">Summary: Why Visualization Matters</h2>
        <p>
          Why visualization matters: TensorFlow Playground turns abstract network operations into
          visible evidence. Colored connections illustrate weights, individual neuron maps reveal
          intermediate representations, and the output plot shows the learned decision boundary.
          These views helped identify underfitting in Experiments 1A and 2A and interpret the
          train–test loss gap in Experiment 3. Visualization complements numerical evaluation
          rather than replacing it.
        </p>
      </section>

      <section className="prose-section" id="reflection" aria-labelledby="reflection-title">
        <h2 id="reflection-title">Learning reflection</h2>
        <div className="nn-copy">
        <p>
          I learned to keep the pieces apart. Layers and neurons set what the network can
          represent. Weights and biases are the values training changes. An activation such as
          Tanh is the nonlinear step. The loss scores the prediction, and the optimizer uses
          gradients from backpropagation to update the weights.
        </p>
        <p>
          The circle runs made hidden layers concrete. With no hidden layer, the boundary stayed
          straight and both losses stayed near one half. Two small Tanh layers bent the
          boundary and lowered the test loss. The XOR runs made the activation concrete. The
          linear network never separated the four corners. The Tanh network did.
        </p>
        <p>
          On the spiral data I read training loss and test loss together. The noise-free run had
          the lower training loss and the larger gap. The noise-25 run had a smaller gap. I do
          not take that as evidence that noise improves generalization. Each configuration was one
          run, on its own generated sample, and the initial weights may have differed.
        </p>
        <p>
          The difficult part was knowing what a loss number can support. I kept the learning rate
          and batch size fixed, checked the picture of the boundary, and wrote the limit next to
          the comparison. That is also how I want to select a model later: match the architecture
          to the pattern, change one thing at a time, and treat a single run as a single run.
          Building the presentation also tested my understanding. Weights were the hardest
          component to classify because they define connections within the network but are also
          the parameters updated during training.
        </p>
        </div>
      </section>

      <section className="prose-section references-block" id="references" aria-labelledby="nn-references-title">
        <h2 id="nn-references-title">References</h2>
        <ul className="references">
          {neuralReferences.map((reference) => (
            <li key={reference.id}>
              {reference.text}{' '}
              <a href={reference.url}>{reference.url}</a>
            </li>
          ))}
        </ul>
        <p>Experiment screenshots and reported results were collected by the author using TensorFlow Playground.</p>
        <p className="back-link">
          <SiteLink href="/">Back to the portfolio</SiteLink>
        </p>
      </section>
    </main>
  )
}

function NetworkDiagram() {
  const input = [70, 150]
  const hidden = [48, 116, 184, 252]
  const output = [150]
  const columns = [40, 150, 260, 370]

  return (
    <svg className="nn-diagram" viewBox="0 0 430 300" role="img" aria-labelledby="nn-diagram-title">
      <title id="nn-diagram-title">Network with two inputs, two hidden layers of four neurons, and one output</title>
      {hidden.map((y) => (
        <line key={`a-${y}`} x1={columns[0] + 16} y1={input[0]} x2={columns[1] - 16} y2={y} className="nn-edge" />
      ))}
      {hidden.map((y) => (
        <line key={`b-${y}`} x1={columns[0] + 16} y1={input[1]} x2={columns[1] - 16} y2={y} className="nn-edge" />
      ))}
      {hidden.map((y1) =>
        hidden.map((y2) => (
          <line key={`${y1}-${y2}`} x1={columns[1] + 16} y1={y1} x2={columns[2] - 16} y2={y2} className="nn-edge" />
        )),
      )}
      {hidden.map((y) => (
        <line key={`c-${y}`} x1={columns[2] + 16} y1={y} x2={columns[3] - 16} y2={output[0]} className="nn-edge" />
      ))}
      <line x1={columns[0] + 16} y1={input[0]} x2={columns[1] - 16} y2={hidden[0]} className="nn-edge nn-edge-pos" />
      <line x1={columns[0] + 16} y1={input[1]} x2={columns[1] - 16} y2={hidden[2]} className="nn-edge nn-edge-neg" />
      {input.map((y, index) => (
        <g key={y}>
          <circle cx={columns[0]} cy={y} r="16" className="nn-node" />
          <text x={columns[0]} y={y + 4} textAnchor="middle">
            {index === 0 ? 'X₁' : 'X₂'}
          </text>
        </g>
      ))}
      {hidden.map((y) => (
        <circle key={`h1-${y}`} cx={columns[1]} cy={y} r="16" className="nn-node" />
      ))}
      {hidden.map((y) => (
        <circle key={`h2-${y}`} cx={columns[2]} cy={y} r="16" className="nn-node" />
      ))}
      <circle cx={columns[3]} cy={output[0]} r="16" className="nn-node nn-output" />
      <text x={columns[0]} y={286} textAnchor="middle">
        Input
      </text>
      <text x={columns[1]} y={286} textAnchor="middle">
        Hidden 1
      </text>
      <text x={columns[2]} y={286} textAnchor="middle">
        Hidden 2
      </text>
      <text x={columns[3]} y={286} textAnchor="middle">
        Output
      </text>
    </svg>
  )
}
