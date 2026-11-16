import { dataCompare, gpuCompare, tokenRatio } from '../../content/a34/figures.ts'
import { EvidenceChip } from './EvidenceChip.tsx'

function Icon({ id }: { id: string }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (id === 'data') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...p} d="M6 5h12v14H6zM9 9h6M9 12h6M9 15h4" />
      </svg>
    )
  }
  if (id === 'compute') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect {...p} x="7" y="7" width="10" height="10" rx="1.5" />
        <path {...p} d="M9 4v3M15 4v3M9 17v3M15 17v3M4 9h3M4 15h3M17 9h3M17 15h3" />
      </svg>
    )
  }
  if (id === 'energy') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...p} d="M13 3L6 13h6l-1 8 8-12h-6z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle {...p} cx="12" cy="12" r="7" />
      <path {...p} d="M12 8v5l3 2" />
    </svg>
  )
}

function MicroBars({
  rows,
  label,
}: {
  rows: { name: string; value: number; display: string }[]
  label: string
}) {
  const max = Math.max(...rows.map((row) => row.value))
  return (
    <div className="a34-micro" role="img" aria-label={label}>
      {rows.map((row) => (
        <div key={row.name} className="a34-micro-row">
          <span>{row.name}</span>
          <span className="a34-micro-track">
            <span style={{ width: `${Math.max(4, (row.value / max) * 100)}%` }} />
          </span>
          <strong>{row.display}</strong>
        </div>
      ))}
    </div>
  )
}

export function ResourceTiles() {
  return (
    <div className="a34-tiles">
      <article className="a34-tile a34-tile-data">
        <header>
          <Icon id="data" />
          <div>
            <h3>Data</h3>
            <p>Measured in tokens (word pieces)</p>
          </div>
        </header>
        <p className="a34-hero">
          15.6T tokens <EvidenceChip label="OR" />
        </p>
        <p className="a34-hero-note">Llama 3.1 405B, 2024</p>
        <MicroBars
          label="Training tokens: BLOOM 366 billion versus Llama 3.1 15.6 trillion, about 43 times more."
          rows={[
            { name: 'BLOOM, 2022', value: dataCompare[0].value ?? 0, display: '366B' },
            { name: 'Llama 3.1, 2024', value: dataCompare[1].value ?? 0, display: '15.6T' },
          ]}
        />
        <p className="a34-micro-note">
          {tokenRatio.display} <EvidenceChip label="DD" />
        </p>
        <p className="a34-why">More tokens need more compute; filtering decides what that compute is spent on.</p>
      </article>

      <article className="a34-tile a34-tile-compute">
        <header>
          <Icon id="compute" />
          <div>
            <h3>Compute</h3>
            <p>Measured in GPU-hours (GPUs × hours) and FLOPs</p>
          </div>
        </header>
        <p className="a34-hero">
          30.84M <EvidenceChip label="OR" />
        </p>
        <p className="a34-hero-note">H100 GPU-hours, Llama 3.1 405B, on up to 16K GPUs</p>
        <MicroBars
          label="Reported GPU-hours: BLOOM 1.08 million A100, DeepSeek-V3 2.79 million H800, Llama 3.1 30.84 million H100. Different chips are not equal work."
          rows={[
            { name: 'BLOOM A100', value: gpuCompare[0].value ?? 0, display: gpuCompare[0].display },
            { name: 'DeepSeek H800', value: gpuCompare[1].value ?? 0, display: gpuCompare[1].display },
            { name: 'Llama H100', value: gpuCompare[2].value ?? 0, display: gpuCompare[2].display },
          ]}
        />
        <p className="a34-micro-note">Different chips: not equal units of work.</p>
        <p className="a34-why">The largest share of final-run cost.</p>
      </article>

      <article className="a34-tile a34-tile-energy">
        <header>
          <Icon id="energy" />
          <div>
            <h3>Energy</h3>
            <p>Measured in megawatt-hours (MWh)</p>
          </div>
        </header>
        <p className="a34-hero">
          433 MWh <EvidenceChip label="OR" />
        </p>
        <p className="a34-hero-note">BLOOM, estimated GPU electricity</p>
        <p className="a34-compare">
          On France's low-carbon grid (57 g CO₂e/kWh), that is 24.7 t CO₂e <EvidenceChip label="OR" />.
        </p>
        <p className="a34-why">A small share of cost but a major source of emissions. The grid sets the carbon.</p>
      </article>

      <article className="a34-tile a34-tile-time">
        <header>
          <Icon id="time" />
          <div>
            <h3>Time</h3>
            <p>Measured in wall-clock days</p>
          </div>
        </header>
        <p className="a34-hero">
          118 days <EvidenceChip label="OR" />
        </p>
        <p className="a34-hero-note">BLOOM, on 384 A100 GPUs</p>
        <p className="a34-compare">
          Llama 3.1's cluster had 419 unexpected interruptions in a 54-day snapshot <EvidenceChip label="OR" />.
        </p>
        <p className="a34-why">Time ≈ GPU-hours ÷ GPUs, plus downtime. More GPUs means faster runs, but also more failures.</p>
      </article>
    </div>
  )
}
