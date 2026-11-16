import { a34References } from '../../content/a34/references.ts'
import { EvidenceChip } from './EvidenceChip.tsx'
import { PipelineDiagram } from './PipelineDiagram.tsx'
import { ResourceTiles } from './ResourceTiles.tsx'
import { CostFlowDiagram, CostShareRanges } from './CostFlowDiagram.tsx'
import { EvidenceMatrix } from './EvidenceMatrix.tsx'
import { EfficiencyPanel, FlopsLogChart, RelationshipMap } from './AnalysisPanels.tsx'

const findings = [
  {
    n: '1',
    title: 'GPU-hours are the hub.',
    text: 'Price, power, and GPU count turn the same reported hours into cost, energy, and time.',
  },
  {
    n: '2',
    title: 'Allocation beats size.',
    text: 'At a fixed compute budget, the split between model size and tokens changes the result.',
  },
  {
    n: '3',
    title: 'Published costs are narrow.',
    text: 'Each dollar figure is one final training run, not the whole development project.',
  },
  {
    n: '4',
    title: 'Disclosure is uneven.',
    text: 'Open releases disclose most of the training metrics compared here. GPT-4 discloses none of the nine metrics; its three numerical figures shown here are independent estimates.',
  },
]

function Legend() {
  return (
    <ul className="a34-legend">
      <li>
        <EvidenceChip label="OR" /> Reported in the developer's own publication or in the cited primary study.
      </li>
      <li>
        <EvidenceChip label="IE" /> Independent estimate
      </li>
      <li>
        <EvidenceChip label="DD" /> Derived by the author from disclosed figures
      </li>
      <li>
        <EvidenceChip label="ND" /> Not disclosed
      </li>
    </ul>
  )
}

export function InfographicPage1() {
  return (
    <section className="a34-sheet" aria-label="Infographic page 1">
      <header className="a34-band a34-head">
        <p className="a34-kicker">AIML-501 · Assignment 3.4 · Generative AI LLM Training</p>
        <h1>How a Large Language Model Gets Trained — and What It Costs</h1>
        <div className="a34-head-bottom">
          <div>
            <p className="a34-sub">
              Five stages, four resources, and the arithmetic that turns GPU-hours into dollars, electricity and time
            </p>
            <p className="a34-by">Sriharshitha Ayyalasomayajula · Indiana Wesleyan University · Fall 2026</p>
          </div>
          <Legend />
        </div>
      </header>

      <section className="a34-band a34-s1" aria-labelledby="a34-s1">
        <h2 id="a34-s1">
          <span>1</span> The training pipeline
        </h2>
        <PipelineDiagram />
      </section>

      <section className="a34-band a34-s2" aria-labelledby="a34-s2">
        <h2 id="a34-s2">
          <span>2</span> Four resources every training run consumes
        </h2>
        <ResourceTiles />
      </section>

      <section className="a34-band a34-s3" aria-labelledby="a34-s3">
        <h2 id="a34-s3">
          <span>3</span> How resources become cost, energy and time
        </h2>
        <div className="a34-s3-grid">
          <CostFlowDiagram />
          <CostShareRanges />
        </div>
      </section>

      <footer className="a34-band a34-foot">
        <p>
          Sources: [L1] Meta 2024 · [L2] Llama Team 2024 · [D1] DeepSeek-AI 2024 · [B1] Luccioni et al. 2023 · [B2]
          BigScience 2022 · [G3] Cottier et al. 2024. Full references on Page 2.
        </p>
        <p>Page 1 of 2</p>
      </footer>
    </section>
  )
}

export function InfographicPage2() {
  return (
    <section className="a34-sheet a34-sheet-2" aria-label="Infographic page 2">
      <header className="a34-band a34-head a34-head-2">
        <p className="a34-kicker">AIML-501 · Assignment 3.4 · Generative AI LLM Training</p>
        <h2 className="a34-page-title">What Four Real Models Reveal — and What They Don't</h2>
        <p className="a34-sub">Disclosure, scale, efficiency, and what actually drives performance</p>
      </header>

      <section className="a34-band a34-s4" aria-labelledby="a34-s4">
        <h2 id="a34-s4">
          <span>4</span> Evidence matrix: four models, four levels of disclosure
        </h2>
        <EvidenceMatrix />
      </section>

      <section className="a34-band a34-s5" aria-labelledby="a34-s5">
        <h2 id="a34-s5" className="sr-only">
          What the evidence shows
        </h2>
        <div className="a34-s5-grid">
          <FlopsLogChart />
          <EfficiencyPanel />
          <RelationshipMap />
        </div>
      </section>

      <section className="a34-band a34-findings">
        <div className="a34-finding-row">
          {findings.map((item) => (
            <article key={item.n}>
              <span>{item.n}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <p className="a34-takeaway">
          Compute drives cost, energy and time. How that compute is allocated shapes what it buys, and only disclosed
          figures can be checked.
        </p>
      </section>

      <footer className="a34-band a34-foot a34-foot-2">
        <p>
          <EvidenceChip label="OR" /> officially reported · <EvidenceChip label="IE" /> independent estimate ·{' '}
          <EvidenceChip label="DD" /> derived by the author from disclosed figures · <EvidenceChip label="ND" /> not
          disclosed. Costs are final-run figures unless stated.
        </p>
        <ol>
          {a34References.map((item) => (
            <li key={item.id}>
              [{item.id}] {item.text}
            </li>
          ))}
        </ol>
        <p>Page 2 of 2</p>
      </footer>
    </section>
  )
}
