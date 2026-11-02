/**
 * Portfolio identity. Name, term, program, and institution are filled.
 * TODO(author): processNarrative — how this artifact was planned and revised
 * TODO(author): aiDisclosure — factual AI-assistance statement, only if you want it published
 * Empty strings are omitted from the page.
 */
export const site = {
  portfolioTitle: 'IWU Academic Portfolio',
  institution: 'Indiana Wesleyan University',
  program: 'Master of Science in Computer Information Sciences',
  specialization: 'Artificial Intelligence Specialization',
  courseCode: 'AIML-501',
  courseTitle: 'Model Development',
  assignment: 'Assignment 1.5',
  studentName: 'Sriharshitha Ayyalasomayajula',
  term: 'Fall 2026',
  figureDate: 'November 2026',
  disclaimer:
    'This is a student coursework portfolio. It is not an official Indiana Wesleyan University website.',
  bio: 'I am a graduate student in the Master of Science in Computer Information Sciences program, specializing in Artificial Intelligence, at Indiana Wesleyan University. My professional background includes AI engineering, machine learning applications, document intelligence, and language-model-based systems. Through this program, I aim to strengthen my theoretical understanding of model development and connect foundational concepts with practical applications.',
  personalValue:
    'I bring practical experience building AI solutions together with an interest in understanding how and why different machine learning methods work. My goal is to combine sound model selection, technical implementation, and clear communication to develop useful, reliable AI applications.',
  processNarrative: '',
  aiDisclosure: '',
}

export function warnIfSiteConfigIncomplete(): void {
  if (!import.meta.env.DEV) return
  const missing = (
    ['processNarrative', 'aiDisclosure'] as const
  ).filter((key) => site[key].trim().length === 0)
  if (missing.length > 0) {
    console.warn(
      `site.config.ts is missing ${missing.join(', ')}. Those fields are omitted from the public page until they are filled in.`,
    )
  }
}
