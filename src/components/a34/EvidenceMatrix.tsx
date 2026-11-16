import {
  fingerprint,
  formatCounts,
  llamaUptimeNote,
  matrixRows,
  models,
} from '../../content/a34/figures.ts'
import { EvidenceChip } from './EvidenceChip.tsx'

export function EvidenceMatrix() {
  return (
    <div className="a34-matrix-wrap">
      <table className="a34-matrix">
        <caption className="sr-only">
          Evidence matrix for Llama 3.1 405B, DeepSeek-V3, BLOOM-176B, and GPT-4
        </caption>
        <thead>
          <tr>
            <th scope="col">Figure</th>
            {models.map((model) => (
              <th key={model.id} scope="col" className="a34-profile">
                <strong>{model.name}</strong>
                <span>{model.meta}</span>
                <span className="a34-pills">
                  <span>{model.architecture}</span>
                  <span>{model.access}</span>
                </span>
              </th>
            ))}
          </tr>
          <tr className="a34-finger-row">
            <th scope="row">Disclosure</th>
            {models.map((model) => {
              const print = fingerprint(model.id)
              return (
                <td key={model.id}>
                  <span className="a34-dots" aria-hidden="true">
                    {print.dots.map((dot, index) => (
                      <i key={matrixRows[index].id} className={`a34-dot a34-dot-${dot.toLowerCase()}`} />
                    ))}
                  </span>
                  <span className="a34-count">{formatCounts(print.counts)}</span>
                </td>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {matrixRows.map((row) => (
            <tr key={row.id}>
              <th scope="row">
                <i className={`a34-swatch a34-swatch-${row.resource}`} aria-hidden="true" />
                {row.label}
              </th>
              {models.map((model) => {
                const cell = row.cells[model.id]
                const undisclosed = cell.length === 1 && cell[0].evidence === 'ND'
                return (
                  <td key={model.id} className={undisclosed ? 'a34-nd' : undefined}>
                    {cell.map((item) => (
                      <span key={item.id} className="a34-cell-fig">
                        {item.evidence === 'ND' ? (
                          <EvidenceChip label="ND" />
                        ) : (
                          <>
                            <span>{item.display}</span> <EvidenceChip label={item.evidence} />
                            {item.sub ? <small>{item.sub}</small> : null}
                          </>
                        )}
                      </span>
                    ))}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="a34-caveat">
        Dots: one per row. Counts: one per labeled figure, so two figures in one row count twice. {llamaUptimeNote}
      </p>
      <p className="a34-caveat">
        Read across rows with care. An A100 GPU-hour does far less work than an H100 or H800 hour, DeepSeek-V3
        trained in FP8, and emissions scopes differ. GPT-4's two costs price the same final run two ways; they are
        not a range. No developer has published total spending.
      </p>
      <p className="a34-sources">
        Sources by column: Llama 3.1 [L1, L2] · DeepSeek-V3 [D1] · BLOOM [B2] parameters, tokens, hardware; [B1]
        GPU-hours, time, energy, emissions · GPT-4 [G1] non-disclosure; [G4] compute; [G3] ≈$40M; [G2] ≈$78M. Panels:
        compute chart [L2, D1, B2, G4]; efficiency [D1]; performance map [C1, L2].
      </p>
    </div>
  )
}
