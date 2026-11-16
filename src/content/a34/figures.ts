/**
 * Assignment 3.4 Version 2 figures.
 * Display strings and classifications follow AIML-501_A3.4_V2_Review_and_Blueprint.md Section D.
 * Chart values are the blueprint's Section G3 numbers.
 */

export type Evidence = 'OR' | 'IE' | 'DD' | 'ND'

export const evidenceName: Record<Evidence, string> = {
  OR: "Reported in the developer's own publication or in the cited primary study.",
  IE: 'Independent estimate',
  DD: 'Derived by the author from disclosed figures',
  ND: 'Not disclosed',
}

export interface Figure {
  id: string
  display: string
  sub?: string
  evidence: Evidence
  sourceIds: string[]
  value?: number
}

export type ResourceKey = 'data' | 'compute' | 'energy' | 'time' | 'cost'

export interface MatrixRow {
  id: string
  label: string
  resource: ResourceKey
  cells: Record<ModelId, Figure[]>
}

export type ModelId = 'llama' | 'deepseek' | 'bloom' | 'gpt4'

export const models: { id: ModelId; name: string; meta: string; architecture: string; access: string }[] = [
  {
    id: 'llama',
    name: 'Llama 3.1 405B',
    meta: 'Meta · Jul 2024',
    architecture: 'Dense',
    access: 'Open weights',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek-V3',
    meta: 'DeepSeek-AI · Dec 2024',
    architecture: 'Mixture-of-experts',
    access: 'Open weights',
  },
  {
    id: 'bloom',
    name: 'BLOOM-176B',
    meta: 'BigScience · 2022',
    architecture: 'Dense',
    access: 'Open weights + open science',
  },
  {
    id: 'gpt4',
    name: 'GPT-4',
    meta: 'OpenAI · Mar 2023',
    architecture: 'Architecture not disclosed',
    access: 'Closed',
  },
]

function fig(
  id: string,
  display: string,
  evidence: Evidence,
  sourceIds: string[],
  value?: number,
  sub?: string,
): Figure {
  return { id, display, evidence, sourceIds, value, sub }
}

const nd = (id: string): Figure => fig(id, 'ND', 'ND', [])

export const matrixRows: MatrixRow[] = [
  {
    id: 'parameters',
    label: 'Parameters',
    resource: 'compute',
    cells: {
      llama: [fig('llama-params', '405B', 'OR', ['L2'], 405e9)],
      deepseek: [
        fig('ds-params-total', '671B total', 'OR', ['D1'], 671e9),
        fig('ds-params-active', '37B active per token', 'OR', ['D1'], 37e9),
      ],
      bloom: [fig('bloom-params', '176B', 'OR', ['B2'], 176e9)],
      gpt4: [nd('gpt4-params')],
    },
  },
  {
    id: 'tokens',
    label: 'Training tokens',
    resource: 'data',
    cells: {
      llama: [fig('llama-tokens', '15.6T', 'OR', ['L2'], 15.6e12)],
      deepseek: [fig('ds-tokens', '14.8T', 'OR', ['D1'], 14.8e12)],
      bloom: [fig('bloom-tokens', '366B', 'OR', ['B2'], 366e9, 'from 1.6 TB of text')],
      gpt4: [nd('gpt4-tokens')],
    },
  },
  {
    id: 'hardware',
    label: 'Hardware',
    resource: 'compute',
    cells: {
      llama: [fig('llama-hw', 'Up to 16K H100', 'OR', ['L2'])],
      deepseek: [fig('ds-hw', '2,048 H800', 'OR', ['D1'], 2048)],
      bloom: [fig('bloom-hw', '384 A100', 'OR', ['B1'], 384)],
      gpt4: [nd('gpt4-hw')],
    },
  },
  {
    id: 'gpu-hours',
    label: 'GPU-hours',
    resource: 'compute',
    cells: {
      llama: [fig('llama-gpuh', '30.84M', 'OR', ['L1'], 30.84e6)],
      deepseek: [fig('ds-gpuh', '2.788M', 'OR', ['D1'], 2.788e6)],
      bloom: [fig('bloom-gpuh', '1.08M', 'OR', ['B1'], 1.08299e6)],
      gpt4: [nd('gpt4-gpuh')],
    },
  },
  {
    id: 'flops',
    label: 'Training compute',
    resource: 'compute',
    cells: {
      llama: [fig('llama-flops', '3.8×10²⁵ FLOPs', 'OR', ['L2'], 3.8e25)],
      deepseek: [
        fig(
          'ds-flops',
          '≈3.3×10²⁴',
          'DD',
          ['D1'],
          3.2856e24,
          '6 × 37B active × 14.8T',
        ),
      ],
      bloom: [fig('bloom-flops', '≈3.9×10²³', 'DD', ['B1', 'B2'], 3.865e23, '6 × 176B × 366B')],
      gpt4: [fig('gpt4-flops', '≈2.1×10²⁵', 'IE', ['G4'], 2.1e25)],
    },
  },
  {
    id: 'time',
    label: 'Training time',
    resource: 'time',
    cells: {
      llama: [nd('llama-time')],
      deepseek: [fig('ds-time', 'Pretraining < 2 months', 'OR', ['D1'])],
      bloom: [fig('bloom-time', '118 days', 'OR', ['B1'], 118)],
      gpt4: [nd('gpt4-time')],
    },
  },
  {
    id: 'energy',
    label: 'Energy',
    resource: 'energy',
    cells: {
      llama: [fig('llama-energy', '≈21,600 MWh', 'DD', ['L1'], 21600, 'peak-power basis')],
      deepseek: [nd('ds-energy')],
      bloom: [fig('bloom-energy', '433 MWh', 'OR', ['B1'], 433, 'GPU-only estimate')],
      gpt4: [nd('gpt4-energy')],
    },
  },
  {
    id: 'emissions',
    label: 'Emissions',
    resource: 'energy',
    cells: {
      llama: [fig('llama-emis', '8,930 t CO₂e', 'OR', ['L1'], 8930, 'location-based')],
      deepseek: [nd('ds-emis')],
      bloom: [
        fig('bloom-emis-gpu', '24.7 t', 'OR', ['B1'], 24.7, 'dynamic GPU emissions'),
        fig('bloom-emis-life', '50.5 t', 'OR', ['B1'], 50.5, 'partial lifecycle, different scope'),
      ],
      gpt4: [nd('gpt4-emis')],
    },
  },
  {
    id: 'cost',
    label: 'Compute cost',
    resource: 'cost',
    cells: {
      llama: [nd('llama-cost')],
      deepseek: [
        fig('ds-cost', '$5.576M', 'OR', ['D1'], 5.576e6, 'assumed $2/GPU-h; final run only'),
      ],
      bloom: [nd('bloom-cost')],
      gpt4: [
        fig('gpt4-cost-amort', '≈$40M', 'IE', ['G3'], 40e6, 'method: amortized hardware + energy'),
        fig('gpt4-cost-cloud', '≈$78M', 'IE', ['G2'], 78e6, 'method: cloud rental, same run'),
      ],
    },
  },
]

export function figureById(id: string): Figure {
  for (const row of matrixRows) {
    for (const model of models) {
      const found = row.cells[model.id].find((item) => item.id === id)
      if (found) return found
    }
  }
  throw new Error(`Missing figure ${id}`)
}

/**
 * Disclosure-fingerprint rule
 * ------------------------------
 * A matrix row contributes one dot. The dot's label is the evidence label
 * shared by every figure in that row. These rows never mix labels.
 * The printed count tallies figures, not rows. A cell with two labeled
 * figures adds two. Italic sub text is not a separate figure.
 * DeepSeek's 671B total and 37B active counts are two figures because they
 * are different scopes. BLOOM's 24.7 t and 50.5 t are two figures. GPT-4's
 * ≈$40M and ≈$78M are two figures.
 */
export function fingerprint(modelId: ModelId): { dots: Evidence[]; counts: Record<Evidence, number> } {
  const counts: Record<Evidence, number> = { OR: 0, IE: 0, DD: 0, ND: 0 }
  const dots: Evidence[] = []
  for (const row of matrixRows) {
    const cell = row.cells[modelId]
    const labels = new Set(cell.map((item) => item.evidence))
    if (labels.size !== 1) {
      throw new Error(`Row ${row.id} / ${modelId} mixes evidence labels`)
    }
    dots.push(cell[0].evidence)
    for (const item of cell) counts[item.evidence] += 1
  }
  return { dots, counts }
}

export function formatCounts(counts: Record<Evidence, number>): string {
  return (['OR', 'IE', 'DD', 'ND'] as const)
    .filter((label) => counts[label] > 0)
    .map((label) => `${counts[label]} ${label}`)
    .join(' · ')
}

export const computeShare = [
  fig('ds-pretrain-h', 'Pretraining 2.664M · 95.6%', 'OR', ['D1'], 2.664e6),
  fig('ds-context-h', 'Context extension 0.119M · 4.3%', 'OR', ['D1'], 0.119e6),
  fig('ds-post-h', 'Post-training 0.005M · 0.2%', 'OR', ['D1'], 0.005e6),
]

export const dataCompare = [
  fig('bloom-tokens-bar', '366B', 'OR', ['B2'], 366e9),
  fig('llama-tokens-bar', '15.6T', 'OR', ['L2'], 15.6e12),
]
export const tokenRatio = fig('token-ratio', '≈43× more', 'DD', ['L2', 'B2'], 15.6e12 / 366e9)

export const gpuCompare = [
  fig('bloom-gpuh-bar', '1.08M', 'OR', ['B1'], 1.08e6),
  fig('ds-gpuh-bar', '2.79M', 'OR', ['D1'], 2.788e6),
  fig('llama-gpuh-bar', '30.84M', 'OR', ['L1'], 30.84e6),
]

export const flopsBars = [
  fig('flops-bloom', '3.9×10²³', 'DD', ['B1', 'B2'], 3.865e23),
  fig('flops-ds', '3.3×10²⁴', 'DD', ['D1'], 3.2856e24),
  fig('flops-gpt4', '2.1×10²⁵', 'IE', ['G4'], 2.1e25),
  fig('flops-llama', '3.8×10²⁵', 'OR', ['L2'], 3.8e25),
]
export const flopsGhost = fig('flops-ghost', '6.0×10²⁵', 'DD', ['D1'], 5.958e25)

export const efficiencyHours = {
  deepseek: fig('eff-ds-h', '2.79M', 'OR', ['D1'], 2.788e6),
  llama: fig('eff-llama-h', '30.84M', 'OR', ['L1'], 30.84e6),
  ratio: fig('eff-ratio', '≈1/11', 'DD', ['D1', 'L1'], 2.788e6 / 30.84e6),
}
export const efficiencyMmlu = {
  deepseek: fig('eff-ds-mmlu', '87.1', 'OR', ['D1'], 87.1),
  llama: fig('eff-llama-mmlu', '84.4', 'OR', ['D1'], 84.4),
}

export const costShares = [
  { id: 'hardware', label: 'Computing hardware', range: [47, 64] as const, evidence: 'IE' as const, sourceIds: ['G3'] },
  { id: 'staff', label: 'R&D staff, incl. equity', range: [29, 49] as const, evidence: 'IE' as const, sourceIds: ['G3'] },
  { id: 'energy', label: 'Energy', range: [2, 6] as const, evidence: 'IE' as const, sourceIds: ['G3'] },
]

export const workedExamples = {
  cost: fig('ex-cost', '$5.576M', 'OR', ['D1'], 5.576e6),
  energy: fig('ex-energy', '21,600 MWh', 'DD', ['L1'], 21600),
  emissions: fig('ex-emis', '24.7 t', 'OR', ['B1'], 24.7),
  time: fig('ex-time', '57 days', 'DD', ['D1'], 56.7),
}

export const llamaUptimeNote =
  'Over a 54-day pretraining snapshot, effective training time was >90%.'

export const gpuHourFormulaNote =
  'Theoretical GPU-hours ≈ FLOPs ÷ (peak FLOP/s × utilization × 3,600 s/h). Reported GPU-hours are published totals, not this estimate.'
