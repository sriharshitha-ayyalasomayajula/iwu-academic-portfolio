import { efficiencyHours, efficiencyMmlu, flopsBars, flopsGhost } from '../../content/a34/figures.ts'
import { EvidenceChip } from './EvidenceChip.tsx'

const names = ['BLOOM-176B', 'DeepSeek-V3', 'GPT-4', 'Llama 3.1 405B']

function logPos(value: number): number {
  const min = 23
  const max = 26
  return ((Math.log10(value) - min) / (max - min)) * 100
}

export function FlopsLogChart() {
  return (
    <figure className="a34-panel" aria-labelledby="flops-title">
      <h3 id="flops-title">Training compute spans about 100×</h3>
      <div
        className="a34-log"
        role="img"
        aria-label="Log-scale training compute from about 3.9 times 10 to the 23 for BLOOM, derived, to 3.8 times 10 to the 25 for Llama, officially reported. A dashed ghost bar shows the wrong DeepSeek total-parameter shortcut at 6.0 times 10 to the 25."
      >
        <div className="a34-log-axis" aria-hidden="true">
          <span />
          <span className="a34-log-axis-track">
            {[1e23, 1e24, 1e25, 1e26].map((tick, index) => (
              <span key={tick} style={{ left: `${logPos(tick)}%` }}>
                10{['²³', '²⁴', '²⁵', '²⁶'][index]}
              </span>
            ))}
          </span>
          <span className="a34-log-end a34-log-end-spacer" aria-hidden="true">
            3.8×10²⁵ <EvidenceChip label="OR" />
          </span>
        </div>
        {flopsBars.map((bar, index) => (
          <div key={bar.id} className="a34-log-row">
            <span>{names[index]}</span>
            <span className="a34-log-track">
              {[1e23, 1e24, 1e25, 1e26].map((tick) => (
                <i key={tick} className="a34-log-gridline" style={{ left: `${logPos(tick)}%` }} />
              ))}
              {bar.id === 'flops-ds' ? (
                <i className="a34-ghost" style={{ width: `${logPos(flopsGhost.value ?? 1)}%` }} />
              ) : null}
              <b
                className={bar.evidence === 'OR' ? 'is-or' : 'is-est'}
                style={{ width: `${logPos(bar.value ?? 1)}%` }}
              />
            </span>
            <span className="a34-log-end">
              {bar.display} <EvidenceChip label={bar.evidence} />
            </span>
          </div>
        ))}
        <p className="a34-ghost-note">
          Dashed bar: DeepSeek-V3 using all 671B params, {flopsGhost.display} (wrong for MoE, 18× too high). ≈100× range.
        </p>
      </div>
      <p className="a34-caveat">
        Why it matters: the 6·N·D shortcut must use active parameters, or MoE models look 18× costlier than they were.
      </p>
    </figure>
  )
}

export function EfficiencyPanel() {
  const hourMax = efficiencyHours.llama.value ?? 1
  return (
    <figure className="a34-panel" aria-labelledby="eff-title">
      <h3 id="eff-title">Reported hours beside one shared evaluation</h3>
      <div
        role="img"
        aria-label="DeepSeek-V3 reports 2.79 million H800 GPU-hours and Llama 3.1 405B reports 30.84 million H100 GPU-hours, a derived ratio of about one eleventh. These hours are not equivalent work. In DeepSeek's own base-model MMLU evaluation the scores are 87.1 and 84.4. The comparison does not establish why the scores differ."
      >
        <p className="a34-pair-label">GPU-hours (reported). Not equivalent work across H800 and H100.</p>
        {[
          ['DeepSeek-V3 H800', efficiencyHours.deepseek] as const,
          ['Llama 3.1 H100', efficiencyHours.llama] as const,
        ].map(([name, item]) => (
          <div key={item.id} className="a34-pair-row">
            <span>{name}</span>
            <span className="a34-pair-track">
              <b style={{ width: `${((item.value ?? 0) / hourMax) * 100}%` }} />
            </span>
            <strong>
              {item.display} <EvidenceChip label={item.evidence} />
            </strong>
          </div>
        ))}
        <p className="a34-call">
          {efficiencyHours.ratio.display} <EvidenceChip label="DD" />
          <small> Reported-hour ratio only. Not the cause of the scores below.</small>
        </p>
        <p className="a34-pair-label">MMLU, base model, 5-shot, DeepSeek's evaluation of both.</p>
        {(
          [
            ['DeepSeek-V3', efficiencyMmlu.deepseek],
            ['Llama 3.1 405B', efficiencyMmlu.llama],
          ] as const
        ).map(([name, figure]) => (
          <div key={figure.id} className="a34-pair-row">
            <span>{name}</span>
            <span className="a34-pair-track">
              <b style={{ width: `${figure.value ?? 0}%` }} />
            </span>
            <strong>
              {figure.display} <EvidenceChip label={figure.evidence} />
            </strong>
          </div>
        ))}
      </div>
      <ul className="a34-bullets">
        <li>Scores are from DeepSeek's own evaluation of both base models.</li>
        <li>DeepSeek attributes the savings to MoE (37B active), FP8 mixed-precision training and hardware–software co-design. Released five months later.</li>
        <li>Excludes DeepSeek's prior research and experiment costs.</li>
      </ul>
    </figure>
  )
}

export function RelationshipMap() {
  return (
    <figure className="a34-panel a34-map" aria-labelledby="map-title">
      <h3 id="map-title">What drives performance?</h3>
      <p className="a34-legend-inline">
        <span>→ by definition</span>
        <span>⇢ tends to (empirical)</span>
        <span>↔ trade-off</span>
      </p>
      <svg viewBox="0 0 640 128" role="img" style={{ fontFamily: 'Source Sans 3, sans-serif' }} aria-label="Relationship map. Model size and training tokens define compute through 6 N D. Mixture-of-experts architecture defines compute through fewer active parameters. Compute tends to help performance when size and data are balanced. At fixed compute, size and tokens trade off. Spending does not determine performance.">
        <defs>
          <marker id="a34-arr" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0 0 L7 3 L0 6 Z" fill="#1F3A5F" />
          </marker>
        </defs>
        <line x1="150" y1="22" x2="230" y2="52" stroke="#1F3A5F" strokeWidth="1.8" markerEnd="url(#a34-arr)" />
        <line x1="150" y1="64" x2="230" y2="60" stroke="#1F3A5F" strokeWidth="1.8" markerEnd="url(#a34-arr)" />
        <line x1="168" y1="104" x2="236" y2="72" stroke="#1F3A5F" strokeWidth="1.8" markerEnd="url(#a34-arr)" />
        <line x1="70" y1="34" x2="70" y2="50" stroke="#1F3A5F" strokeWidth="1.8" markerStart="url(#a34-arr)" markerEnd="url(#a34-arr)" />
        <line x1="360" y1="58" x2="430" y2="32" stroke="#1F3A5F" strokeWidth="1.8" strokeDasharray="5 3" markerEnd="url(#a34-arr)" />
        <line x1="500" y1="96" x2="545" y2="48" stroke="#6B7280" strokeWidth="1.8" strokeDasharray="4 3" />
        <text x="522.5" y="76" textAnchor="middle" fontSize="14" fontWeight="700" fill="#6B7280">✕</text>
        <text x="168" y="40" fontSize="16" fill="#1B2433">6 · N · D</text>
        <rect x="6" y="6" width="144" height="28" rx="5" fill="#F7F4EE" stroke="#1F3A5F" />
        <text x="78" y="25" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1B2433">Model size</text>
        <rect x="6" y="48" width="144" height="28" rx="5" fill="#F7F4EE" stroke="#1F3A5F" />
        <text x="78" y="67" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1B2433">Tokens</text>
        <rect x="6" y="90" width="162" height="28" rx="5" fill="#F7F4EE" stroke="#C2611A" />
        <text x="87" y="109" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1B2433">Architecture</text>
        <rect x="236" y="42" width="124" height="32" rx="5" fill="#F8E6D6" stroke="#C2611A" />
        <text x="298" y="63" textAnchor="middle" fontSize="17" fontWeight="700" fill="#1B2433">Compute</text>
        <rect x="450" y="8" width="180" height="30" rx="5" fill="#F7F4EE" stroke="#8A3B3B" />
        <text x="540" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1B2433">Performance</text>
        <rect x="450" y="90" width="180" height="30" rx="5" fill="#E5E7EB" stroke="#4B5563" />
        <text x="540" y="110" textAnchor="middle" fontSize="16" fontWeight="700" fill="#4B5563">$ Spending</text>
      </svg>
      <ul className="a34-bullets">
        <li>Model size → Compute; Training tokens → Compute: 6 · N · D</li>
        <li>Architecture (MoE) → Compute: fewer active parameters per token</li>
        <li>Compute ⇢ Performance: more compute tends to help when size and data are balanced (scaling laws)</li>
        <li>Model size ↔ Training tokens: at fixed compute: Chinchilla 70B / 1.4T beat Gopher 280B / 300B <EvidenceChip label="OR" /></li>
        <li>$ Spending ⇢ Performance, struck through: money buys compute, not results</li>
      </ul>
      <p className="a34-caveat">
        Llama 3's own scaling laws put the compute-optimal size near 402B parameters on 16.55T tokens for its
        budget, close to the 405B / 15.6T it trained. <EvidenceChip label="OR" />
      </p>
    </figure>
  )
}
