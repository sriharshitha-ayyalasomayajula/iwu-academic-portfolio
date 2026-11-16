import { SiteLink } from '../components/SiteLink.tsx'
import { featuredProject } from '../data/courses.ts'
import { llmArtifact } from '../data/llmTraining.ts'
import { neuralArtifact } from '../data/neuralNetworks.ts'
import { downloadHref, infographicDownloads } from '../data/downloads.ts'
import { site } from '../data/site.config.ts'
import { usePageTitle } from '../hooks/useRoute.ts'

const identity = [
  { label: 'Program', value: `${site.program}, ${site.specialization}` },
  { label: 'Institution', value: site.institution },
  { label: 'Term', value: site.term },
].filter((item) => item.value.trim().length > 0)

export function HomePage() {
  usePageTitle(site.portfolioTitle)

  return (
    <main id="main" className="page">
      <section className="home-hero home-hero-centered">
        <p className="eyebrow">{site.courseCode} · Graduate coursework</p>
        <h1>Academic Portfolio</h1>
        <p className="lede">
          A growing collection of graduate coursework, technical experiments, and visual learning
          artifacts developed for AIML-501 Model Development.
        </p>
      </section>
      <dl className="identity">
        {identity.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>

      <section className="profile-grid" aria-label="About the student">
        <article className="project-panel" id="bio" aria-labelledby="bio-title">
          <h2 id="bio-title">About Me</h2>
          <p>{site.bio}</p>
        </article>
        <article className="project-panel" id="value" aria-labelledby="value-title">
          <h2 id="value-title">What I Bring</h2>
          <p>{site.personalValue}</p>
        </article>
      </section>

      <section className="home-section" id="coursework" aria-labelledby="coursework-title">
        <h2 id="coursework-title">AIML-501 Model Development</h2>
        <div className="project-grid">
          <article className="project-panel">
            <p className="course-code">{llmArtifact.eyebrow}</p>
            <h3>
              <SiteLink href={llmArtifact.path} className="artifact-title-link">
                {llmArtifact.title}
              </SiteLink>
            </h3>
            <p>{llmArtifact.summary}</p>
            <SiteLink href={llmArtifact.path} className="artifact-preview-link">
              <img
                className="artifact-preview"
                src={downloadHref(llmArtifact.png1)}
                alt="Page 1 of the LLM training infographic: five training stages, four resource tiles, and a flow from GPU-hours to cost, energy, and time."
              />
            </SiteLink>
            <div className="button-row">
              <SiteLink href={llmArtifact.path} className="button">
                View artifact
              </SiteLink>
              <a className="button" href={downloadHref(llmArtifact.pdf)} download={llmArtifact.pdf}>
                Download PDF (2 pages)
              </a>
            </div>
          </article>
          <article className="project-panel">
            <p className="course-code">{neuralArtifact.eyebrow}</p>
            <h3>Visualizing Neural Networks</h3>
            <p>{neuralArtifact.summary}</p>
            <div className="button-row">
              <SiteLink href={neuralArtifact.path} className="button">
                View artifact
              </SiteLink>
              <a className="button" href={downloadHref(neuralArtifact.pptx)} download={neuralArtifact.pptx}>
                Download PowerPoint
              </a>
            </div>
          </article>
          <article className="project-panel">
            <p className="course-code">{featuredProject.eyebrow}</p>
            <h3>{featuredProject.title}</h3>
            <p>{featuredProject.summary}</p>
            {infographicDownloads.some((item) => item.id === 'png-1') ? (
              <img
                className="artifact-preview"
                src={downloadHref('aiml-501-algorithm-types-page-1.png')}
                alt="Page 1 of the Algorithm Types infographic, showing ten machine learning methods grouped by learning paradigm."
              />
            ) : null}
            <div className="button-row">
              <SiteLink href={featuredProject.href} className="button">
                View artifact
              </SiteLink>
              <a className="button" href={downloadHref('aiml-501-algorithm-types.pdf')} download>
                Download PDF (2 pages)
              </a>
              <SiteLink href={featuredProject.printHref} className="button button-secondary">
                Open print layout
              </SiteLink>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}
