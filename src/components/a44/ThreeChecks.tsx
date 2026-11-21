const checks = [
  {
    n: '1',
    name: 'Task performance',
    question: 'Is the model doing the intended task, including outside the data it was judged on?',
  },
  {
    n: '2',
    name: 'Explanation faithfulness',
    question: 'Does the explanation reflect factors that influence the output?',
  },
  {
    n: '3',
    name: 'System trustworthiness',
    question: 'Are documentation, safeguards, monitoring, and oversight fit for this use?',
  },
] as const

export function ThreeChecks() {
  return (
    <section className="a44-checks" aria-labelledby="a44-checks-title">
      <div className="a44-checks-lead">
        <h3 id="a44-checks-title">Three checks. One judgment.</h3>
        <p>Each question stays separate. Together they inform a decision. They are not added into a trust score.</p>
      </div>
      <ol>
        {checks.map((check) => (
          <li key={check.n} className={`a44-check a44-check-${check.n}`}>
            <span>{check.n}</span>
            <strong>{check.name}</strong>
            <p>{check.question}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
