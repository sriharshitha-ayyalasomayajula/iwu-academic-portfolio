import { CheckChip } from './CheckChip.tsx'
import { SourceId } from './SourceId.tsx'

const rows = [
  {
    name: 'Attention visualization',
    source: 'X1',
    scope: 'Often local',
    access: 'Internal access',
    evidence: 'Reads attention patterns. Not causal proof.',
    maturity: 'Established; value as an explanation is debated',
  },
  {
    name: 'LIME',
    source: 'X2',
    scope: 'Local',
    access: 'Black-box compatible',
    evidence: 'Behavioral surrogate around one prediction.',
    maturity: 'Established; it is an approximation',
  },
  {
    name: 'SHAP',
    source: 'X3',
    scope: 'Local; aggregatable',
    access: 'Model-dependent; black-box variants exist',
    evidence: 'Assigns each feature a contribution to a prediction. Local attributions can be aggregated; attribution is not causal proof.',
    maturity: 'Established',
  },
  {
    name: 'Counterfactual testing',
    source: 'X5',
    scope: 'Usually local',
    access: 'Black-box compatible',
    evidence: 'Behavioral changes under interventions.',
    maturity: 'Established',
  },
  {
    name: 'Mechanistic interpretability',
    source: 'A1',
    scope: 'Local and broader investigations',
    access: 'Internal access',
    evidence: 'Internal features and circuits. Sometimes a causal intervention.',
    maturity: 'Active research',
  },
  {
    name: 'Representation probing',
    source: 'X6',
    scope: 'Across examples or datasets',
    access: 'Internal access',
    evidence: 'Whether information is decodable from activations. Decodable is not the same as used.',
    maturity: 'Established method, with known limits',
  },
] as const

export function TechniqueMatrix() {
  return (
    <figure className="a44-panel a44-matrix-wrap">
      <figcaption>
        <h3>
          <CheckChip n={2} /> Explanation techniques are not one ladder
        </h3>
        <p>
          These methods are used here to investigate existing models. None of the six is itself an intrinsically
          interpretable model architecture. The columns can overlap.
        </p>
      </figcaption>
      <table className="a44-matrix">
        <thead>
          <tr>
            <th scope="col">Technique</th>
            <th scope="col">Scope</th>
            <th scope="col">Access</th>
            <th scope="col">Evidence</th>
            <th scope="col">Maturity or limitation</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <th scope="row">
                {row.name} <SourceId id={row.source} />
              </th>
              <td>{row.scope}</td>
              <td>{row.access}</td>
              <td>{row.evidence}</td>
              <td>{row.maturity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}
