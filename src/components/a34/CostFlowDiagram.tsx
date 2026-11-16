import { costShares, gpuHourFormulaNote } from '../../content/a34/figures.ts'
import { EvidenceChip } from './EvidenceChip.tsx'

export function CostFlowDiagram() {
  return (
    <div className="a34-flow-wrap">
      <div
        className="a34-flow"
        role="img"
        aria-label="Flow from model size and tokens to simplified training FLOPs, then to theoretical GPU-hours by dividing by peak FLOP per second, utilization, and 3,600 seconds per hour. Reported GPU-hours then branch into cost, energy and emissions, and wall-clock time."
      >
        <p className="a34-flow-kicker">Theoretical estimate. This path does not produce a reported GPU-hour total.</p>
        <div className="a34-flow-top">
          <div className="a34-flow-node">
            <strong>Model size (N)</strong>
          </div>
          <div className="a34-flow-node">
            <strong>Training tokens (D)</strong>
          </div>
          <div className="a34-flow-op" aria-hidden="true">
            →
          </div>
          <div className="a34-flow-node a34-flow-flops">
            <strong>Training compute ≈ 6 · N · D FLOPs*</strong>
            <span>Simplified dense-model estimate</span>
          </div>
          <div className="a34-flow-op">
            ÷ (peak FLOP/s × utilization × 3,600 s/h)
          </div>
          <div className="a34-flow-node a34-flow-theory">
            <strong>Theoretical GPU-hours</strong>
            <span>Formula only. No new total is computed.</span>
          </div>
        </div>
        <p className="a34-flow-kicker">Reported GPU-hours. Published totals, then three outcomes.</p>
        <div className="a34-flow-branches">
          <div className="a34-branch">
            <span className="a34-op-label">× price per GPU-hour</span>
            <div className="a34-outcome">
              <strong>Compute cost ($)</strong>
              <p>
                DeepSeek-V3: 2.788M GPU-h × $2 (assumed rental) = <b>$5.576M</b> <EvidenceChip label="OR" />
              </p>
            </div>
          </div>
          <div className="a34-branch">
            <span className="a34-op-label">× power per GPU × facility overhead</span>
            <div className="a34-outcome">
              <strong>Energy (MWh)</strong>
              <p>
                Llama 3.1 405B: 30.84M GPU-h × 0.7 kW ≈ <b>21,600 MWh</b> <EvidenceChip label="DD" />{' '}
                <em>(peak-power basis)</em>
              </p>
            </div>
            <span className="a34-op-label">× grid carbon intensity</span>
            <div className="a34-outcome">
              <strong>Emissions (t CO₂e)</strong>
              <p>
                BLOOM: 433 MWh × 57 g/kWh ≈ <b>24.7 t</b> <EvidenceChip label="OR" />
              </p>
            </div>
          </div>
          <div className="a34-branch">
            <span className="a34-op-label">÷ number of GPUs, + downtime</span>
            <div className="a34-outcome">
              <strong>Wall-clock time</strong>
              <p>
                DeepSeek-V3: 2.788M ÷ 2,048 GPUs ÷ 24 ≈ <b>57 days</b> <EvidenceChip label="DD" />{' '}
                <em>(if all GPUs ran every stage)</em>
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="a34-caveat">
        * Rule of thumb for dense transformers: it matches Llama 3.1 405B's reported 3.8×10²⁵ FLOPs. For
        mixture-of-experts models, use active parameters (DeepSeek-V3: 37B, not 671B). It ignores attention
        overhead, experiments and failed runs. {gpuHourFormulaNote}
      </p>
    </div>
  )
}

export function CostShareRanges() {
  return (
    <aside className="a34-shares" aria-label="Development-cost shares that the GPU-hour formula leaves out">
      <h3>What the formula leaves out</h3>
      <p>
        Final-run compute is only part of development cost. Across four frontier models (GPT-3, OPT-175B,
        GPT-4, Gemini Ultra) <EvidenceChip label="IE" />:
      </p>
      <div className="a34-range-axis" aria-hidden="true">
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
      <ul>
        {costShares.map((item) => (
          <li key={item.id}>
            <span>
              {item.label} <strong>{item.range[0]}–{item.range[1]}%</strong>
            </span>
            <span className="a34-range-track">
              <span
                style={{
                  left: `${item.range[0]}%`,
                  width: `${item.range[1] - item.range[0]}%`,
                }}
              />
            </span>
          </li>
        ))}
      </ul>
      <p>Also excluded from published figures: research experiments, data licensing, and inference.</p>
    </aside>
  )
}
