import { AlgorithmPoster } from '../components/poster/AlgorithmPoster.tsx'
import { MechanismSection } from '../components/mechanisms/MechanismSection.tsx'
import { ReferenceList } from '../components/ReferenceList.tsx'
import { visibleAboutSections } from '../data/documentation.ts'
import { site } from '../data/site.config.ts'
import { usePageTitle } from '../hooks/useRoute.ts'

export function AlgorithmTypesPage() {
  usePageTitle(`Algorithm Types · ${site.courseCode}`)

  return (
    <main id="main" className="page page-wide">
      <AlgorithmPoster />

      <div className="appendix-wrap">
        <nav className="on-page" aria-label="On this page">
          <a href="#poster">Poster</a>
          <a href="#about">About</a>
          <a href="#how-they-work">How they work</a>
          <a href="#references">References</a>
        </nav>

        <section id="about" className="prose-section" aria-labelledby="about-title">
          <h2 id="about-title">About this artifact</h2>
          <div className="about-layout">
            {visibleAboutSections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className={
                  section.id === 'methodology' || section.id === 'value' ? 'about-wide' : undefined
                }
                aria-labelledby={`${section.id}-title`}
              >
                <h3 id={`${section.id}-title`}>{section.title}</h3>
                {section.blocks ? (
                  <div className="methodology-grid">
                    {section.blocks.map((block) => (
                      <div key={block.heading}>
                        <h4>{block.heading}</h4>
                        {block.paragraphs.map((paragraph) => (
                          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  section.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))
                )}
              </section>
            ))}
          </div>
        </section>

        <MechanismSection />

        <section id="references" className="prose-section references-block" aria-labelledby="references-title">
          <h2 id="references-title">References</h2>
          <p>Entries are in alphabetical order. In-text citations with three or more authors use “et al.”</p>
          <ReferenceList />
        </section>
      </div>
    </main>
  )
}
