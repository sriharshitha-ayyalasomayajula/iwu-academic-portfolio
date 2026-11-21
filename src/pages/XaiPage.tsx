import {
  caseStudies,
  classificationRationale,
  explanationParagraphs,
  findings,
  limitations,
  reflection,
} from '../content/a44/claims.ts'
import { a44Sources } from '../content/a44/sources.ts'
import { SiteLink } from '../components/SiteLink.tsx'
import { downloadHref } from '../data/downloads.ts'
import { site } from '../data/site.config.ts'
import { xaiArtifact } from '../data/xai.ts'
import { usePageTitle } from '../hooks/useRoute.ts'

const altPage1 =
  'Page 1 of the explainable-AI infographic. It defines transparency, interpretability, and explainability, compares six explanation methods across scope, access, evidence, and maturity, and features the Turpin Suggested Answer study beside a smaller Claude Golden Gate feature result.'

const altPage2 =
  'Page 2 of the explainable-AI infographic. Three separate checks for task performance, explanation faithfulness, and system trustworthiness sit above task metrics and the Zech combined-hospital comparison of internal ROC-AUC 0.931 and external ROC-AUC 0.815.'

export function XaiPage() {
  usePageTitle(`Explainable AI · ${site.courseCode}`)
  const page1 = downloadHref(xaiArtifact.png1)
  const page2 = downloadHref(xaiArtifact.png2)

  return (
    <main id="main" className="page a44 a44-web">
      <header className="a44-hero-grid">
        <div>
          <p className="eyebrow">{xaiArtifact.eyebrow}</p>
          <h1>{xaiArtifact.title}</h1>
          <p className="lede">{xaiArtifact.summary}</p>
          <p>
            {site.studentName} · {site.institution} · {site.term}
          </p>
          <div className="button-row">
            <a className="button" href={downloadHref(xaiArtifact.pdf)} download={xaiArtifact.pdf}>
              Download PDF (2 pages)
            </a>
            <a className="button" href={page1} download={xaiArtifact.png1}>
              PNG, page 1
            </a>
            <a className="button" href={page2} download={xaiArtifact.png2}>
              PNG, page 2
            </a>
            <SiteLink href={xaiArtifact.printPath} className="button button-secondary">
              Open print layout
            </SiteLink>
          </div>
        </div>
        <figure className="a44-hero-thumb">
          <img src={page1} alt={altPage1} />
        </figure>
      </header>

      <section className="prose-section" aria-labelledby="a44-preview-title">
        <h2 id="a44-preview-title">Infographic</h2>
        <div className="a44-preview-row">
          <figure>
            <img src={page1} alt={altPage1} />
            <figcaption>Page 1. Why an explanation can mislead, and two published cases.</figcaption>
          </figure>
          <figure>
            <img src={page2} alt={altPage2} />
            <figcaption>Page 2. Three checks, task metrics, and the external-validation case.</figcaption>
          </figure>
        </div>
      </section>

      <section className="prose-section" aria-labelledby="a44-findings-title">
        <h2 id="a44-findings-title">Three findings</h2>
        <div className="a44-findings">
          {findings.map((finding) => (
            <article key={finding.title}>
              <h3>{finding.title}</h3>
              <p>{finding.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="prose-section" aria-labelledby="a44-explain-title">
        <h2 id="a44-explain-title">Explanation</h2>
        {explanationParagraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </section>

      <section className="prose-section" aria-labelledby="a44-class-title">
        <h2 id="a44-class-title">Classification rationale</h2>
        {classificationRationale.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </section>

      <section className="prose-section" aria-labelledby="a44-reflect-title">
        <h2 id="a44-reflect-title">Reflection on learning</h2>
        {reflection.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </section>

      <section className="prose-section" aria-labelledby="a44-cases-title">
        <h2 id="a44-cases-title">Three published case studies</h2>
        <div className="a44-cases-web">
          {caseStudies.map((study) => {
            const source = a44Sources.find((item) => item.id === study.id)
            return (
              <article key={study.id}>
                <h3>{study.title}</h3>
                <p>{study.authors}</p>
                <p>{study.text}</p>
                {source ? (
                  <p>
                    <a href={source.href}>Read the research paper</a>
                  </p>
                ) : null}
              </article>
            )
          })}
        </div>
      </section>

      <section className="prose-section" aria-labelledby="a44-limits-title">
        <h2 id="a44-limits-title">Research limitations and interpretation notes</h2>
        <ul>
          {limitations.map((item) => (
            <li key={item.slice(0, 32)}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="prose-section" id="references" aria-labelledby="a44-refs-title">
        <h2 id="a44-refs-title">References</h2>
        <ul className="references">
          {a44Sources.map((source) => (
            <li key={source.id}>
              [{source.id}] {source.text} <a href={source.href}>{source.linkLabel}</a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
