import { useEffect, useId, useRef } from 'react'
import { EvidenceChip } from '../components/a34/EvidenceChip.tsx'
import { SiteLink } from '../components/SiteLink.tsx'
import { matrixRows, models } from '../content/a34/figures.ts'
import { a34References } from '../content/a34/references.ts'
import { downloadHref } from '../data/downloads.ts'
import { llmArtifact } from '../data/llmTraining.ts'
import { site } from '../data/site.config.ts'
import { usePageTitle } from '../hooks/useRoute.ts'

const altPage1 =
  'Page 1 of the infographic. A five-stage pipeline from data collection to deployment, with a bar showing that pretraining used 95.6% of DeepSeek-V3’s GPU-hours; four resource tiles for data, compute, energy and time with example figures; and a flow diagram showing GPU-hours multiplied by price to give cost, by power to give energy and emissions, and divided by GPU count to give time.'

const altPage2 =
  'Page 2 of the infographic. An evidence matrix comparing Llama 3.1 405B, DeepSeek-V3, BLOOM-176B and GPT-4 across nine figures, with a disclosure fingerprint for each; a log-scale chart of training compute; a comparison showing DeepSeek-V3 used about one-eleventh of Llama 3.1’s GPU-hours; a map of what drives performance; and four key findings.'

function Preview({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const onCancel = () => dialog.close()
    dialog.addEventListener('cancel', onCancel)
    return () => dialog.removeEventListener('cancel', onCancel)
  }, [])

  return (
    <figure className="a34-preview">
      <button type="button" onClick={() => dialogRef.current?.showModal()}>
        <img src={src} alt={alt} />
      </button>
      <figcaption>{caption}</figcaption>
      <dialog ref={dialogRef} className="a34-lightbox" aria-labelledby={titleId}>
        <img src={src} alt="" />
        <p id={titleId}>{caption}</p>
        <form method="dialog">
          <button className="button" type="submit">
            Close
          </button>
        </form>
      </dialog>
    </figure>
  )
}

export function LlmTrainingPage() {
  usePageTitle(`LLM Training · ${site.courseCode}`)
  const page1 = downloadHref(llmArtifact.png1)
  const page2 = downloadHref(llmArtifact.png2)
  const explanatoryFile = 'AIML-501_Assignment_3.4_LLM_Training_Explanatory_Document.pdf'

  return (
    <main id="main" className="page a34 a34-web">
      <header className="a34-hero-grid">
        <div>
          <p className="eyebrow">{llmArtifact.eyebrow}</p>
          <h1>{llmArtifact.title}</h1>
          <p className="lede">{llmArtifact.summary}</p>
          <p>
            {site.studentName} · {site.institution} · {site.term}
          </p>
          <ul className="a34-meta">
            <li>2-page infographic</li>
            <li>17 × 11 in</li>
            <li>4 models</li>
            <li>10 sources</li>
          </ul>
          <div className="button-row">
            <a className="button" href={downloadHref(llmArtifact.pdf)} download={llmArtifact.pdf}>
              Download PDF
            </a>
            <a className="button" href={page1} download={llmArtifact.png1}>
              PNG p.1
            </a>
            <a className="button" href={page2} download={llmArtifact.png2}>
              PNG p.2
            </a>
            <SiteLink href={llmArtifact.printPath} className="button button-secondary">
              Open print layout
            </SiteLink>
            <a className="button" href={downloadHref(explanatoryFile)} download={explanatoryFile}>
              Download Explanatory Document (PDF)
            </a>
          </div>
        </div>
        <figure className="a34-thumb">
          <img src={page1} alt={altPage1} />
        </figure>
      </header>

      <section className="prose-section" aria-labelledby="overview-title">
        <h2 id="overview-title">Overview</h2>
        <div className="a34-overview">
          <article>
            <h3>Objective</h3>
            <p>
              Explain how large language models are trained and examine how data, computational resources, energy,
              and training time influence costs and model performance.
            </p>
          </article>
          <article>
            <h3>Approach</h3>
            <p>
              Organize the research around three connected perspectives: the training lifecycle, resource
              requirements and their relationships, and comparisons of publicly documented LLMs.
            </p>
          </article>
          <article>
            <h3>Process</h3>
            <p>
              Review technical reports and model documentation, verify published figures, distinguish estimates from
              reported measurements, and translate the findings into comparative visualizations.
            </p>
          </article>
        </div>
      </section>

      <section className="prose-section" aria-labelledby="preview-title">
        <h2 id="preview-title">Infographic</h2>
        <Preview src={page1} alt={altPage1} caption="Page 1. Pipeline, resources, and the GPU-hour arithmetic." />
        <Preview
          src={page2}
          alt={altPage2}
          caption="Page 2. Evidence matrix, scale, efficiency, and performance."
        />
      </section>

      <section className="prose-section" aria-labelledby="findings-title">
        <h2 id="findings-title">Three findings</h2>
        <div className="a34-findings-web">
          <article>
            <h3>Training compute connects cost, energy and time.</h3>
            <p>
              Reported GPU-hours become cost when multiplied by price, energy when multiplied by power, and calendar
              time when divided by GPU count. DeepSeek-V3's 2.788M H800 GPU-hours at an assumed $2 per hour give its
              reported $5.576M final-run cost.
            </p>
          </article>
          <article>
            <h3>Efficiency depends on architecture and training choices.</h3>
            <p>
              DeepSeek-V3 reported about one-eleventh of Llama 3.1 405B's GPU-hours and, in DeepSeek's own evaluation
              of both base models, scored 87.1 vs 84.4 on MMLU. The hours were on different chips, and the comparison
              does not show what caused the difference.
            </p>
          </article>
          <article>
            <h3>Transparency limits what can be compared.</h3>
            <p>
              BLOOM published nearly every training figure; GPT-4 published none, so its compute and cost appear here
              only as independent estimates. Labeling each number keeps estimates from being read as measurements.
            </p>
          </article>
        </div>
      </section>

      <section className="prose-section" aria-labelledby="method-title">
        <h2 id="method-title">Research Methodology and Evidence</h2>
        <p className="a34-method-intro">
          Every number in the infographic carries one of four labels. The label records whether the figure was
          published, estimated by an outside source, calculated from disclosed inputs, or not published at all. A
          shorter line under a number, such as a scope or a pricing method, explains that figure. It is not a second
          result.
        </p>

        <details className="a34-details">
          <summary>Evidence labels</summary>
          <div className="a34-def-grid">
            <article>
              <h3>
                <EvidenceChip label="OR" /> Officially reported
              </h3>
              <p>Reported in the developer's own publication or in the cited primary study.</p>
            </article>
            <article>
              <h3>
                <EvidenceChip label="IE" /> Independent estimate
              </h3>
              <p>An outside estimate. It is not a measurement from the training run.</p>
            </article>
            <article>
              <h3>
                <EvidenceChip label="DD" /> Derived
              </h3>
              <p>Arithmetic from disclosed inputs. The source did not print that result as a measurement.</p>
            </article>
            <article>
              <h3>
                <EvidenceChip label="ND" /> Not disclosed
              </h3>
              <p>The cited sources do not publish this figure.</p>
            </article>
          </div>
          <p>
            The Llama 3.1 MMLU score of 84.4 is DeepSeek's measurement, reported in DeepSeek's paper.
          </p>
          <p>
            Fingerprint dots are one per matrix row. The count beside them tallies figures. A row with two labeled
            numbers, such as BLOOM’s two emission scopes or GPT-4’s two prices, counts twice. DeepSeek-V3’s 671B
            total and 37B active parameters are two figures because they are different scopes.
          </p>
        </details>

        <details className="a34-details">
          <summary>Model notes</summary>
          <div className="a34-model-notes">
            <article>
              <h3>Llama 3.1 405B</h3>
              <p>
                Location-based emissions are 8,930 t CO₂e <EvidenceChip label="OR" />. The 11,390 t figure is the 8B
                + 70B + 405B family total. Energy of ≈21,600 MWh <EvidenceChip label="DD" /> is 30.84M GPU-hours ×
                0.7 kW, Meta’s per-GPU peak-power figure. Actual power draw was not reported. Training time is{' '}
                <EvidenceChip label="ND" />. The &gt;90% effective-time figure covers a 54-day snapshot, not the full
                run. The 15.6T token count is cited to the paper, not the model card.
              </p>
            </article>
            <article>
              <h3>DeepSeek-V3</h3>
              <p>
                The $5.576M figure <EvidenceChip label="OR" /> assumes $2 per H800 GPU-hour and covers the official
                training run, not prior research, ablations, hardware, or staff. The simplified FLOP figure uses 37B
                active parameters, not 671B. GPU-hours are H800 hours and are not treated as equal to Llama’s H100
                hours.
              </p>
            </article>
            <article>
              <h3>BLOOM-176B</h3>
              <p>
                The 433 MWh figure is a GPU-only estimate from GPU-hours × 400 W, published by Luccioni et al.{' '}
                <EvidenceChip label="OR" />. Dynamic emissions are 24.7 t and the partial lifecycle total is 50.5 t.
                Those are different scopes, not a range. Training data in the matrix is 366B tokens from the model
                card, not from the carbon-footprint paper.
              </p>
            </article>
            <article>
              <h3>GPT-4</h3>
              <p>
                The ≈$40M and ≈$78M figures price the same final run two ways <EvidenceChip label="IE" />. They are
                not added and not a range. Size, data, hardware, duration, energy, and emissions are{' '}
                <EvidenceChip label="ND" />. An unverified development-hardware total of about $90M is omitted. So
                are widely circulated but unverified estimates of 1.8T parameters, 13T tokens, and 25,000 A100s.
              </p>
            </article>
          </div>
        </details>

        <details className="a34-details">
          <summary>Calculations</summary>
          <div className="a34-scroll">
            <table className="a34-calc">
              <caption>Derived figures and the arithmetic behind them</caption>
              <thead>
                <tr>
                  <th scope="col">Result</th>
                  <th scope="col">Arithmetic</th>
                  <th scope="col">Label</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Llama training compute, check</td>
                  <td>6 × 405B × 15.6T ≈ 3.8×10²⁵ FLOPs. Matches the reported figure. Dense model.</td>
                  <td>
                    <EvidenceChip label="DD" />
                  </td>
                </tr>
                <tr>
                  <td>DeepSeek-V3 simplified FLOPs</td>
                  <td>6 × 37B active × 14.8T ≈ 3.3×10²⁴. Not 6 × 671B, which is about 18× higher and wrong for this mixture-of-experts model.</td>
                  <td>
                    <EvidenceChip label="DD" />
                  </td>
                </tr>
                <tr>
                  <td>BLOOM simplified FLOPs</td>
                  <td>6 × 176B × 366B ≈ 3.9×10²³. Dense-model shortcut.</td>
                  <td>
                    <EvidenceChip label="DD" />
                  </td>
                </tr>
                <tr>
                  <td>Llama energy</td>
                  <td>30.84M GPU-hours × 0.7 kW ≈ 21,600 MWh. Peak-power basis, not a meter reading.</td>
                  <td>
                    <EvidenceChip label="DD" />
                  </td>
                </tr>
                <tr>
                  <td>DeepSeek-V3 wall-clock illustration</td>
                  <td>2.788M ÷ 2,048 ÷ 24 ≈ 57 days, if all GPUs ran every stage. The reported pretraining duration is under 2 months.</td>
                  <td>
                    <EvidenceChip label="DD" />
                  </td>
                </tr>
                <tr>
                  <td>Token ratio</td>
                  <td>15.6T ÷ 366B ≈ 43×.</td>
                  <td>
                    <EvidenceChip label="DD" />
                  </td>
                </tr>
                <tr>
                  <td>GPU-hour ratio</td>
                  <td>2.788M ÷ 30.84M ≈ 1/11. A ratio of reported hours on H800 and H100 chips, not a measure of equal work and not a cause of the MMLU scores.</td>
                  <td>
                    <EvidenceChip label="DD" />
                  </td>
                </tr>
                <tr>
                  <td>Theoretical GPU-hours</td>
                  <td>FLOPs ÷ (peak FLOP/s × utilization × 3,600 s/h). No new GPU-hour total is computed from this, because the infographic uses only reported GPU-hour totals.</td>
                  <td>Definition</td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>

        <details className="a34-details">
          <summary>Exclusions and limitations</summary>
          <div className="a34-limit-grid">
            <article>
              <h3>Comparisons that were not made</h3>
              <ul>
                <li>No cost ranking. The dollar figures use different accounting methods.</li>
                <li>
                  No chart that treats A100, H100, and H800 GPU-hours as the same work. The compute tile is labeled
                  “not equal units of work.”
                </li>
                <li>No hypothetical Llama rental price.</li>
              </ul>
            </article>
            <article>
              <h3>Figures that were left out</h3>
              <ul>
                <li>No unverified GPT-4 parameter, token, or accelerator counts.</li>
                <li>An unverified development-hardware total of about $90M is omitted.</li>
              </ul>
            </article>
          </div>
        </details>
      </section>

      <section className="prose-section" aria-labelledby="reflection-title">
        <h2 id="reflection-title">Reflection on Learning</h2>
        <div className="a34-prose">
          <p>
            Developing this portfolio artifact helped me understand the scale and complexity of training large
            language models beyond their architectures and capabilities. I explored how training data, computational
            resources, energy consumption, and training time interact, and how decisions about model architecture and
            training efficiency influence resource requirements and costs.
          </p>
          <p>
            One of the most valuable parts of this assignment was comparing Llama 3.1 405B, DeepSeek-V3, BLOOM-176B,
            and GPT-4. I initially expected training figures to be relatively straightforward to compare, but the
            research revealed important differences in hardware, reporting methods, cost assumptions, and the
            availability of technical information. For example, distinguishing DeepSeek-V3's active parameters from
            its total parameters helped me better understand mixture-of-experts architectures and why simplified
            computational estimates require careful interpretation.
          </p>
          <p>
            A significant challenge was ensuring that the infographic communicated accurate information without
            overwhelming the reader. I addressed this by reviewing technical reports and model documentation,
            separating reported figures from estimates, revising unclear comparisons, and organizing the findings into
            diagrams, tables, and visual relationships.
          </p>
          <p>
            This assignment strengthened both my technical understanding and my ability to communicate complex AI
            concepts responsibly. I learned that training efficiency cannot be evaluated through model size or cost
            alone, and that transparent reporting is essential for meaningful comparisons. These lessons will be
            useful when evaluating model architectures, computational requirements, and deployment decisions in future
            AI engineering projects.
          </p>
        </div>
      </section>

      <section className="prose-section" id="references" aria-labelledby="references-title">
        <h2 id="references-title">References</h2>
        <ol className="references">
          {a34References.map((item) => {
            const links = item.links ?? (item.href ? [{ label: item.href, href: item.href }] : [])
            return (
              <li key={item.id}>
                [{item.id}] {item.text}{' '}
                {links.map((link) => (
                  <a key={link.href} href={link.href} rel="noreferrer">
                    {link.label}
                  </a>
                ))}
              </li>
            )
          })}
        </ol>
        <p className="sr-only">
          Matrix rows: {matrixRows.map((row) => row.label).join(', ')}. Models:{' '}
          {models.map((model) => model.name).join(', ')}.
        </p>
      </section>
    </main>
  )
}
