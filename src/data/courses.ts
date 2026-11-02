export type Course = {
  id: string
  code: string
  title: string
  note: string
  artifactHref: string
  artifactLabel: string
}

export const courses: Course[] = [
  {
    id: 'aiml-501',
    code: 'AIML-501',
    title: 'Model Development',
    note: 'Assignment 1.5 is a comparative figure of ten machine learning methods, with mechanism diagrams and a technical appendix.',
    artifactHref: '/aiml-501/algorithm-types',
    artifactLabel: 'View the Algorithm Types artifact',
  },
]

export const featuredProject = {
  eyebrow: 'AIML-501 · Assignment 1.5',
  title: 'Machine Learning Algorithm Types: A Comparative Visual Framework',
  summary:
    'A landscape figure of ten machine learning methods by learning paradigm, model form, and application domain, with six labeled relationships.',
  href: '/aiml-501/algorithm-types',
  printHref: '/aiml-501/algorithm-types/print',
}
