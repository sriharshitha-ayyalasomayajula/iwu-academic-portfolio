import { goldenGate, turpin, zech } from '../../content/a44/claims.ts'
import { CheckChip } from './CheckChip.tsx'
import { IndustryCards } from './IndustryCards.tsx'
import { SourceId } from './SourceId.tsx'
import { TechniqueMatrix } from './TechniqueMatrix.tsx'
import { ThreeChecks } from './ThreeChecks.tsx'

const metrics = [
  ['Accuracy', 'Share of correct answers. It can look strong when one class is rare.'],
  ['Precision', 'Of the positive calls, how many were right. tp / (tp + fp).'],
  ['Recall', 'Of the real positives, how many were found. tp / (tp + fn).'],
  ['F1', 'Harmonic mean of precision and recall.'],
  ['ROC-AUC', 'How well scores separate classes across thresholds. For a binary task, 0.5 is chance and 1.0 is perfect. This is not accuracy.'],
  ['Calibration', 'Whether stated confidence matches how often the model is correct.'],
  ['Robustness', 'Whether performance holds when the setting shifts.'],
  ['External validation', 'Testing on independent data from a different setting, such as another hospital.'],
] as const

const governance = [
  'Bias and fairness',
  'Red-teaming',
  'Guardrails',
  'Privacy and security',
  'Documentation',
  'Monitoring',
  'Human oversight',
] as const

export function InfographicPage1() {
  return (
    <section className="a44-sheet" aria-label="Infographic page 1">
      <header className="a44-head">
        <p className="a44-kicker">AIML-501 · Assignment 4.4 · Explainable AI</p>
        <h1>Can We Trust an AI’s Explanation?</h1>
        <p className="a44-sub">Explainability, validation, and performance metrics in modern AI</p>
        <p className="a44-page-heading">Why AI explanations can mislead</p>
      </header>

      <div className="a44-split">
        <article>
          <h2>What “explainable” is asking</h2>
          <dl>
            <div>
              <dt>Transparency</dt>
              <dd>What is disclosed about the design, the tests, and the limits.</dd>
            </div>
            <div>
              <dt>Interpretability</dt>
              <dd>How far a person can understand the behavior or the mechanism.</dd>
            </div>
            <div>
              <dt>Explainability</dt>
              <dd>Methods that communicate or investigate reasons for an output.</dd>
            </div>
          </dl>
          <p>
            The distinction matters for accountability, debugging, bias checks, and decisions about reliance.{' '}
            <SourceId id="N1, V2" />
          </p>
        </article>
        <article>
          <h2>Why an LLM explanation is hard to trust</h2>
          <ul>
            <li>Representations are distributed, and components interact. <SourceId id="A1" /></li>
            <li>Chain-of-thought text is generated. It is not a verified trace of internal computation. <SourceId id="T1" /></li>
            <li>Attention weights are not, by themselves, the reason for the answer. <SourceId id="X1" /></li>
            <li>Closed models limit internal access. Open tools such as Gemma Scope are still research-stage. <SourceId id="G1" /></li>
            <li>A prompt cue can steer an answer that the written explanation never names. <SourceId id="T1" /></li>
            <li>
              Regulatory duties vary by use and jurisdiction. The EU AI Act requires high-risk systems to be transparent
              to deployers, and it gives some people a right to an explanation of certain decisions. That is not a
              complete view of model internals. <SourceId id="R1" />
            </li>
          </ul>
        </article>
      </div>

      <TechniqueMatrix />

      <div className="a44-cases">
        <article className="a44-case a44-case-turpin">
          <p className="a44-case-kicker">
            <CheckChip n={2} /> Featured published case · <SourceId id="T1" />
          </p>
          <h2>When an AI hides what influenced its answer</h2>
          <p className="a44-cite">Turpin, Michael, Perez, and Bowman (2023). Illustrative sequence, not a verbatim model output.</p>
          <ol className="a44-sequence">
            <li>
              <strong>Suggested Answer cue</strong>
              <span>The prompt includes a line such as “I think the answer is B.”</span>
            </li>
            <li>
              <strong>Influenced prediction</strong>
              <span>The model’s answer follows the cue.</span>
            </li>
            <li>
              <strong>Explanation omits the cue</strong>
              <span>The generated write-up does not name it.</span>
            </li>
          </ol>
          <div className="a44-stats">
            <p>
              <b>{turpin.drop}</b>
              <span>Accuracy decline</span>
            </p>
            <p>
              <b>
                {turpin.mentioned} of {turpin.reviewed}
              </b>
              <span>Reviewed explanations mentioned the bias</span>
            </p>
          </div>
          <p className="a44-note">
            {turpin.setup}. Not the Answer-is-Always-A condition. Older models and constructed tasks. The omission count
            is a reviewed sample, not a rate for every LLM. The authors call the test necessary but not sufficient.
          </p>
        </article>
        <article className="a44-case">
          <p className="a44-case-kicker">
            <CheckChip n={2} /> Smaller published case · <SourceId id="A1" />
          </p>
          <h2>A concept dial inside Claude</h2>
          <p className="a44-cite">Templeton, Conerly, and colleagues (2024). {goldenGate.model}.</p>
          <p>
            A feature tied to Golden Gate Bridge references was clamped to {goldenGate.multiple} its maximum activation.
            The model then described itself as the bridge, so this feature can influence outputs.
          </p>
          <p className="a44-note">
            The features are an incomplete description of the model’s internal representations. This is not a complete
            explanation of Claude’s decision-making.
          </p>
        </article>
      </div>

      <div className="a44-close">
        <p className="a44-takeaway">An explanation is evidence to evaluate — not proof of how a model reasoned.</p>
        <footer className="a44-foot">
          <p>Bracketed source IDs correspond to the references on the portfolio page.</p>
          <p>Page 1 of 2</p>
        </footer>
      </div>
    </section>
  )
}

export function InfographicPage2() {
  return (
    <section className="a44-sheet a44-sheet-2" aria-label="Infographic page 2">
      <header className="a44-head a44-head-2">
        <p className="a44-kicker">AIML-501 · Assignment 4.4 · Validation and trust</p>
        <h2 className="a44-page-title">One informed decision.</h2>
      </header>

      <ThreeChecks />

      <div className="a44-mid">
        <section className="a44-panel" aria-labelledby="a44-metrics-title">
          <h3 id="a44-metrics-title">
            <CheckChip n={1} /> Task metrics are not explanation metrics
          </h3>
          <p className="a44-note">
            These score the task. They do not score whether an explanation is faithful. <SourceId id="V3, V1, Z1" />
          </p>
          <dl className="a44-metrics">
            {metrics.map(([name, text]) => (
              <div key={name}>
                <dt>{name}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </section>

        <article className="a44-case a44-zech">
          <p className="a44-case-kicker">
            <CheckChip n={1} /> External validation / distribution shift · medical imaging, not an LLM ·{' '}
            <SourceId id="Z1" />
          </p>
          <h2>High accuracy does not guarantee generalization</h2>
          <p className="a44-cite">
            Zech and colleagues (2018), pneumonia detection in chest radiographs. {zech.model}. {zech.setting}.
          </p>
          <div className="a44-auc" role="img" aria-label={`Internal ROC-AUC ${zech.internalAuc}, external ROC-AUC ${zech.externalAuc}`}>
            <span>Internal</span>
            <b>{zech.internalAuc}</b>
            <span className="a44-track">
              <i style={{ width: '93.1%' }} />
            </span>
            <span>External, Indiana University</span>
            <b>{zech.externalAuc}</b>
            <span className="a44-track">
              <i style={{ width: '81.5%' }} />
            </span>
            <span />
            <span />
            <span className="a44-axis">
              <span>0</span>
              <span>0.5</span>
              <span>1</span>
            </span>
          </div>
          <p className="a44-caption">ROC-AUC, 0–1 scale. 0.5 corresponds to chance-level discrimination.</p>
          <ul>
            <li>Internal performance was higher in {zech.comparisons} natural comparisons. Two showed no significant difference.</li>
            <li>
              Separate CNNs trained on these X-rays identified the hospital system for {zech.nih} of NIH and {zech.sinai}{' '}
              of Mount Sinai images. This shows that site information was available in the images, not that it was the
              sole cause of the generalization gap.
            </li>
          </ul>
        </article>
      </div>

      <section className="a44-eval" aria-labelledby="a44-eval-title">
        <h3 id="a44-eval-title">
          <CheckChip n={2} /> A readable explanation can still be unfaithful
        </h3>
        <ul>
          <li>
            <strong>Faithfulness.</strong> Does it reflect factors that influence the output? Planted cues are one test.
            Changing or removing what the explanation calls important, and watching the output, is another.{' '}
            <SourceId id="N1, T1" />
          </li>
          <li>
            <strong>Stability.</strong> Appropriately similar inputs should produce reasonably consistent explanations.
            This is not a rule that every input change must leave the explanation unchanged.
          </li>
          <li>
            <strong>Sanity checks.</strong> The method should respond when the model or the data change. Some saliency
            methods do not. <SourceId id="X7" />
          </li>
          <li>
            <strong>Manipulation.</strong> Explanations can be constructed to look benign. LIME and SHAP can be fooled
            in an adversarial setting. <SourceId id="X4" />
          </li>
          <li>
            <strong>Human usefulness.</strong> Test explanations with intended users on relevant tasks.{' '}
            <SourceId id="V2" /> An understandable explanation is not necessarily faithful. <SourceId id="T1" />
          </li>
        </ul>
      </section>

      <IndustryCards />

      <section className="a44-deploy" aria-label="Deployment governance">
        <CheckChip n={3} />
        <ul>
          {governance.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>
          These support a deployment decision. They do not replace the task test or the faithfulness test.{' '}
          <SourceId id="O1, M1, N1, T1" />
        </p>
      </section>

      <div className="a44-close">
        <p className="a44-takeaway">Trust requires tested performance, evaluated explanations, and responsible governance.</p>
        <footer className="a44-foot">
          <p>Bracketed source IDs correspond to the references on the portfolio page.</p>
          <p>Page 2 of 2</p>
        </footer>
      </div>
    </section>
  )
}
