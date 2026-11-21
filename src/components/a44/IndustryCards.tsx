import { CheckChip } from './CheckChip.tsx'
import { SourceId } from './SourceId.tsx'

const orgs = [
  {
    name: 'OpenAI',
    check: 3 as const,
    types: ['DOC', 'EVAL', 'SAFEGUARD'],
    body: 'GPT-4o System Card, 8 August 2024: more than 100 external red teamers, tests in 45 languages, and an overall preparedness rating of Medium. Voice safeguards include preset voices and an output classifier. This is documentation and risk evaluation, not a mechanistic account.',
    source: 'O1',
  },
  {
    name: 'Anthropic',
    check: 2 as const,
    types: ['MECH'],
    body: 'Claude 3 Sonnet feature research finds internal directions and shows that one can be steered. Feature steering is not a test of whether a written explanation is faithful.',
    source: 'A1',
  },
  {
    name: 'Google DeepMind',
    check: 2 as const,
    types: ['MECH', 'TOOL'],
    body: 'Gemma Scope releases sparse autoencoders for Gemma 2 models. The authors call the technique immature. Gemma is not Gemini.',
    source: 'G1',
  },
  {
    name: 'Meta',
    check: 3 as const,
    types: ['SAFEGUARD'],
    body: 'Llama Guard classifies prompts and responses against a safety-risk taxonomy. A safety classifier does not explain the model it guards.',
    source: 'M1',
  },
] as const

export function IndustryCards() {
  return (
    <section className="a44-orgs" aria-labelledby="a44-orgs-title">
      <h3 id="a44-orgs-title">What four published efforts actually show</h3>
      <p className="a44-legend">
        DOC documentation · EVAL structured evaluation · MECH mechanistic research · TOOL released research tooling ·
        SAFEGUARD safety filtering or other protective controls
      </p>
      <div>
        {orgs.map((org) => (
          <article key={org.name}>
            <header>
              <CheckChip n={org.check} />
              <strong>{org.name}</strong>
              {org.types.map((type) => (
                <span key={type}>{type}</span>
              ))}
            </header>
            <p>
              {org.body} <SourceId id={org.source} />
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
