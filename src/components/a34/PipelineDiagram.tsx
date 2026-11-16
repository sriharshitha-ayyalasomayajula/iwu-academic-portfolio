import { EvidenceChip } from './EvidenceChip.tsx'
import { computeShare } from '../../content/a34/figures.ts'

const stages = [
  {
    n: '1',
    title: 'Collect data',
    action: 'Gather text and code at scale',
    bullets: ['Web pages, books, code, licensed and synthetic text', 'Scale: Llama 3.1 405B trained on 15.6T tokens'],
    chip: true,
    output: 'raw corpus',
  },
  {
    n: '2',
    title: 'Prepare data',
    action: 'Clean, filter and tokenize',
    bullets: ['Remove duplicates, low-quality text and personal data', 'Split text into tokens; set the data mix'],
    output: 'training-ready tokens',
  },
  {
    n: '3',
    title: 'Pretrain',
    action: 'Learn to predict the next token',
    bullets: ['Thousands of GPUs run for weeks to months', 'Checkpoints let training resume after hardware failures'],
    output: 'base model',
  },
  {
    n: '4',
    title: 'Post-train & evaluate',
    action: 'Make it useful and safer',
    bullets: ['Fine-tune on instructions and human or AI feedback', 'Benchmark and red-team before release'],
    output: 'assistant model',
  },
  {
    n: '5',
    title: 'Deploy',
    action: 'Serve, monitor, update',
    bullets: ['Run the model for users (inference)', 'Monitor quality and misuse'],
    output: 'live service',
    ongoing: true,
  },
] as const

function StageIcon({ n }: { n: string }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (n === '1') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...p} d="M6 4h8l4 4v12H6zM14 4v4h4M8 13h8M8 16h5" />
      </svg>
    )
  }
  if (n === '2') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...p} d="M4 6h16M7 6l2 13h6l2-13M9 12h6" />
      </svg>
    )
  }
  if (n === '3') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect {...p} x="7" y="7" width="10" height="10" rx="1.5" />
        <path {...p} d="M9 4v3M15 4v3M9 17v3M15 17v3M4 9h3M4 15h3M17 9h3M17 15h3" />
      </svg>
    )
  }
  if (n === '4') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...p} d="M12 4l6 2v5c0 3.4-2.4 5.8-6 7.2C8.4 16.8 6 14.4 6 11V6z" />
        <path {...p} d="M9 12l2 2 4-4" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle {...p} cx="12" cy="12" r="7" />
      <path {...p} d="M12 8v4l3 2" />
    </svg>
  )
}

export function PipelineDiagram() {
  return (
    <div className="a34-pipeline" role="img" aria-label="Five training stages. Pretraining is marked as the dominant stage. DeepSeek-V3 spent 95.6 percent of GPU-hours on pretraining, 4.3 percent on context extension, and 0.2 percent on post-training.">
      <ol className="a34-stages">
        {stages.map((stage) => (
          <li key={stage.n} className={`a34-stage a34-stage-${stage.n}`}>
            <div className="a34-stage-top">
              <span className="a34-roundel">{stage.n}</span>
              <StageIcon n={stage.n} />
            </div>
            <h3>{stage.title}</h3>
            <p className="a34-action">{stage.action}</p>
            <ul>
              <li>
                {stage.bullets[0]}
              </li>
              <li>
                {'chip' in stage && stage.chip ? (
                  <>
                    Scale: Llama 3.1 405B trained on 15.6T tokens <EvidenceChip label="OR" />
                  </>
                ) : (
                  stage.bullets[1]
                )}
              </li>
            </ul>
            <p className="a34-output">
              <strong>Output:</strong> {stage.output}
              {'ongoing' in stage && stage.ongoing ? (
                <span className="a34-infty"> ∞ Inference costs continue after training</span>
              ) : null}
            </p>
          </li>
        ))}
      </ol>
      <div className="a34-share-row">
        <p className="a34-share-label">
          Where DeepSeek-V3's 2.788M GPU-hours went <EvidenceChip label="OR" />
        </p>
        <div className="a34-share" aria-hidden="true">
          <span className="a34-share-a" />
          <span className="a34-share-b" />
          <span className="a34-share-c" />
        </div>
        <p className="a34-share-keys">
          {computeShare.map((item) => (
            <span key={item.id}>{item.display}</span>
          ))}
        </p>
      </div>
      <p className="a34-caveat">
        One model's split. Post-training shares vary by developer, and DeepSeek-V3's post-training drew on a
        separately trained model (DeepSeek-R1) whose cost is not counted.
      </p>
      <p className="a34-bracket">Evaluation runs throughout: data checks (2), loss and benchmark tracking (3), safety testing (4).</p>
      <p className="sr-only">
        {computeShare.map((item) => item.display).join('; ')}
      </p>
    </div>
  )
}
