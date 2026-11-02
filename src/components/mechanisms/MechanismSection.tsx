import type { ReactNode } from 'react'
import { useId } from 'react'
import { RelationshipCard } from '../poster/AlgorithmPoster.tsx'
import { getAlgorithm } from '../../data/algorithms.ts'
import { mechanisms, studyGroups } from '../../data/mechanisms.ts'
import {
  formatRelationshipIds,
  relationshipIdsFor,
  relationships,
} from '../../data/relationships.ts'
import { domainById, paradigmById } from '../../data/taxonomy.ts'

const ink = '#14233a'
const blue = '#1d4e89'
const green = '#0f6b67'
const copper = '#9a5b2e'
const paper = '#fffcf8'
const softBlue = '#e7f0f8'
const softGreen = '#e5f3f1'
const line = '#c9c1b4'
const font = 'Source Sans 3, Segoe UI, sans-serif'

function Diagram({
  description,
  children,
}: {
  description: string
  children: (marker: string) => ReactNode
}) {
  const marker = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 720 280" role="img" aria-label={description}>
      <defs>
        <marker id={marker} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill={copper} />
        </marker>
      </defs>
      {children(marker)}
    </svg>
  )
}

function Box({
  x,
  y,
  w,
  h,
  label,
  fill = paper,
  stroke = ink,
  size = 16,
}: {
  x: number
  y: number
  w: number
  h: number
  label: string
  fill?: string
  stroke?: string
  size?: number
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="3" fill={fill} stroke={stroke} strokeWidth="1.75" />
      <text
        x={x + w / 2}
        y={y + h / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={ink}
        fontSize={size}
        fontFamily={font}
      >
        {label}
      </text>
    </g>
  )
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  marker,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  marker: string
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={copper}
      strokeWidth="2"
      markerEnd={`url(#${marker})`}
    />
  )
}

function DecisionTreeDiagram() {
  return (
    <g>
      <Box x={270} y={28} w={180} h={52} label="Feature test" fill={softBlue} stroke={blue} />
      <line x1={360} y1={80} x2={160} y2={168} stroke={blue} strokeWidth="1.75" />
      <line x1={360} y1={80} x2={560} y2={168} stroke={blue} strokeWidth="1.75" />
      <text x={230} y={118} fill={ink} fontSize="15" fontFamily={font}>
        yes
      </text>
      <text x={470} y={118} fill={ink} fontSize="15" fontFamily={font}>
        no
      </text>
      <Box x={70} y={168} w={180} h={52} label="Leaf: class A" fill={paper} stroke={blue} />
      <Box x={470} y={168} w={180} h={52} label="Leaf: class B" fill={paper} stroke={blue} />
      <text x={360} y={250} textAnchor="middle" fill={ink} fontSize="15" fontFamily={font}>
        Further tests repeat the same split
      </text>
    </g>
  )
}

function RandomForestDiagram({ marker }: { marker: string }) {
  return (
    <g>
      {[36, 176, 316].map((x) => (
        <g key={x}>
          <Box x={x} y={36} w={120} h={40} label="Tree" fill={softBlue} stroke={blue} size={15} />
          <line x1={x + 60} y1={76} x2={x + 22} y2={118} stroke={blue} strokeWidth="1.75" />
          <line x1={x + 60} y1={76} x2={x + 98} y2={118} stroke={blue} strokeWidth="1.75" />
          <rect x={x + 4} y={118} width="36" height="24" fill={paper} stroke={blue} />
          <rect x={x + 80} y={118} width="36" height="24" fill={paper} stroke={blue} />
        </g>
      ))}
      <text x={236} y={176} textAnchor="middle" fill={ink} fontSize="15" fontFamily={font}>
        trained separately
      </text>
      <Arrow x1={470} y1={100} x2={530} y2={124} marker={marker} />
      <Box x={530} y={96} w={166} h={64} label="Vote or average" fill={softBlue} stroke={blue} />
    </g>
  )
}

function GradientBoostingDiagram({ marker }: { marker: string }) {
  const y = 108
  return (
    <g>
      <Box x={24} y={y} w={130} h={56} label="Tree 1" fill={softBlue} stroke={blue} />
      <Arrow x1={154} y1={y + 28} x2={196} y2={y + 28} marker={marker} />
      <text x={175} y={88} textAnchor="middle" fill={ink} fontSize="14" fontFamily={font}>
        remaining
      </text>
      <text x={175} y={104} textAnchor="middle" fill={ink} fontSize="14" fontFamily={font}>
        error
      </text>
      <Box x={204} y={y} w={130} h={56} label="Tree 2" fill={softBlue} stroke={blue} />
      <Arrow x1={334} y1={y + 28} x2={376} y2={y + 28} marker={marker} />
      <text x={355} y={96} textAnchor="middle" fill={ink} fontSize="14" fontFamily={font}>
        remaining error
      </text>
      <Box x={384} y={y} w={130} h={56} label="Tree 3" fill={softBlue} stroke={blue} />
      <Arrow x1={514} y1={y + 28} x2={556} y2={y + 28} marker={marker} />
      <Box x={564} y={y} w={132} h={56} label="Ensemble" fill={paper} stroke={copper} />
    </g>
  )
}

function KMeansDiagram({ marker }: { marker: string }) {
  const dotsA = [
    [78, 92],
    [112, 108],
    [90, 136],
    [128, 128],
  ]
  const dotsB = [
    [210, 150],
    [246, 168],
    [198, 186],
    [236, 196],
  ]
  return (
    <g>
      <rect x={24} y={28} width={300} height={224} fill={paper} stroke={line} />
      <text x={174} y={52} textAnchor="middle" fill={ink} fontSize="16" fontFamily={font} fontWeight="700">
        1. Assign to nearest
      </text>
      {dotsA.map(([x, y]) => (
        <circle key={`a-${x}`} cx={x} cy={y} r="6" fill={blue} />
      ))}
      {dotsB.map(([x, y]) => (
        <circle key={`b-${x}`} cx={x} cy={y} r="6" fill={green} />
      ))}
      <rect x={96} y={108} width="16" height="16" fill={copper} />
      <rect x={220} y={164} width="16" height="16" fill={copper} />
      <Arrow x1={336} y1={140} x2={384} y2={140} marker={marker} />
      <rect x={396} y={28} width={300} height={224} fill={paper} stroke={line} />
      <text x={546} y={52} textAnchor="middle" fill={ink} fontSize="16" fontFamily={font} fontWeight="700">
        2. Move to the mean
      </text>
      {dotsA.map(([x, y]) => (
        <circle key={`a2-${x}`} cx={x + 372} cy={y} r="6" fill={blue} />
      ))}
      {dotsB.map(([x, y]) => (
        <circle key={`b2-${x}`} cx={x + 372} cy={y} r="6" fill={green} />
      ))}
      <rect x={468} y={112} width="16" height="16" fill={copper} />
      <rect x={586} y={168} width="16" height="16" fill={copper} />
    </g>
  )
}

function PcaDiagram() {
  const points = [
    [-90, -8],
    [-40, 18],
    [10, -16],
    [50, 10],
    [90, -6],
    [-20, 8],
    [30, 20],
    [-70, 12],
    [70, -18],
    [0, -4],
  ]
  return (
    <g>
      <line x1={70} y1={230} x2={430} y2={230} stroke={line} strokeWidth="1.75" />
      <text x={250} y={252} textAnchor="middle" fill={ink} fontSize="15" fontFamily={font}>
        original feature axis
      </text>
      <g transform="translate(250 145) rotate(-28)">
        <ellipse rx="150" ry="58" fill={softBlue} stroke={blue} strokeWidth="1.75" />
        {points.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill={blue} />
        ))}
        <line x1={-168} y1={0} x2={168} y2={0} stroke={copper} strokeWidth="2.5" />
        <line x1={0} y1={-78} x2={0} y2={78} stroke={green} strokeWidth="2.5" />
      </g>
      <text x={430} y={78} fill={copper} fontSize="16" fontFamily={font} fontWeight="700">
        PC1
      </text>
      <text x={300} y={58} fill={green} fontSize="16" fontFamily={font} fontWeight="700">
        PC2
      </text>
      <text x={560} y={150} fill={ink} fontSize="15" fontFamily={font}>
        Keep the
      </text>
      <text x={560} y={170} fill={ink} fontSize="15" fontFamily={font}>
        leading axis
      </text>
    </g>
  )
}

function CnnDiagram({ marker }: { marker: string }) {
  return (
    <g>
      <rect x={28} y={78} width="92" height="92" fill={paper} stroke={blue} strokeWidth="1.75" />
      {Array.from({ length: 16 }, (_, index) => (
        <rect
          key={index}
          x={36 + (index % 4) * 20}
          y={86 + Math.floor(index / 4) * 20}
          width="16"
          height="16"
          fill={index % 3 === 0 ? blue : softBlue}
        />
      ))}
      <text x={74} y={196} textAnchor="middle" fill={ink} fontSize="15" fontFamily={font}>
        Input
      </text>
      <Arrow x1={128} y1={124} x2={168} y2={124} marker={marker} />
      <Box x={176} y={86} w={130} h={76} label="Local filters" fill={softBlue} stroke={blue} />
      <text x={241} y={196} textAnchor="middle" fill={ink} fontSize="15" fontFamily={font}>
        reused across
      </text>
      <Arrow x1={314} y1={124} x2={354} y2={124} marker={marker} />
      <rect x={362} y={70} width="70" height="108" fill={softGreen} stroke={green} />
      <rect x={378} y={58} width="70" height="108" fill={softBlue} stroke={blue} />
      <text x={430} y={196} textAnchor="middle" fill={ink} fontSize="15" fontFamily={font}>
        Feature maps
      </text>
      <Arrow x1={456} y1={124} x2={508} y2={124} marker={marker} />
      <Box x={516} y={92} w={160} h={64} label="Output" fill={paper} stroke={ink} />
    </g>
  )
}

function NaiveBayesDiagram({ marker }: { marker: string }) {
  return (
    <g>
      <Box x={36} y={36} w={210} h={48} label="P(feature 1 | class)" fill={softBlue} stroke={blue} size={15} />
      <Box x={36} y={100} w={210} h={48} label="P(feature 2 | class)" fill={softBlue} stroke={blue} size={15} />
      <Box x={36} y={164} w={210} h={48} label="P(feature 3 | class)" fill={softBlue} stroke={blue} size={15} />
      <text x={280} y={128} textAnchor="middle" fill={ink} fontSize="22" fontFamily={font}>
        ×
      </text>
      <Box x={312} y={100} w={120} h={56} label="Prior" fill={softGreen} stroke={green} />
      <Arrow x1={440} y1={128} x2={486} y2={128} marker={marker} />
      <Box x={494} y={48} w={190} h={56} label="Posterior A" fill={paper} stroke={ink} />
      <Box x={494} y={140} w={190} h={56} label="Posterior B" fill={softBlue} stroke={blue} />
      <text x={589} y={230} textAnchor="middle" fill={ink} fontSize="15" fontFamily={font}>
        Choose the larger posterior
      </text>
    </g>
  )
}

function BertDiagram({ marker }: { marker: string }) {
  const tokens = ['The', 'cat', '[MASK]', 'sat', 'down']
  return (
    <g>
      {tokens.map((token, index) => (
        <Box
          key={token}
          x={36 + index * 136}
          y={128}
          w={120}
          h={52}
          label={token}
          fill={token === '[MASK]' ? '#f8f1e8' : paper}
          stroke={token === '[MASK]' ? copper : blue}
        />
      ))}
      <path d="M96 128 Q250 36 364 128" fill="none" stroke={copper} strokeWidth="2" markerEnd={`url(#${marker})`} />
      <path d="M624 128 Q470 36 364 128" fill="none" stroke={copper} strokeWidth="2" markerEnd={`url(#${marker})`} />
      <text x={180} y={58} fill={ink} fontSize="15" fontFamily={font}>
        left context
      </text>
      <text x={470} y={58} fill={ink} fontSize="15" fontFamily={font}>
        right context
      </text>
      <text x={360} y={220} textAnchor="middle" fill={ink} fontSize="15" fontFamily={font}>
        Predict the hidden token from both sides
      </text>
    </g>
  )
}

function GptDiagram({ marker }: { marker: string }) {
  const tokens = ['The', 'cat', 'sat']
  return (
    <g>
      {tokens.map((token, index) => (
        <g key={token}>
          <Box x={36 + index * 150} y={108} w={120} h={52} label={token} fill={softBlue} stroke={blue} />
          {index < tokens.length - 1 ? (
            <Arrow x1={156 + index * 150} y1={134} x2={180 + index * 150} y2={134} marker={marker} />
          ) : null}
        </g>
      ))}
      <Arrow x1={456} y1={134} x2={500} y2={134} marker={marker} />
      <rect
        x={508}
        y={108}
        width="140"
        height="52"
        rx="3"
        fill={paper}
        stroke={copper}
        strokeWidth="1.75"
        strokeDasharray="5 4"
      />
      <text x={578} y={134} textAnchor="middle" dominantBaseline="middle" fill={ink} fontSize="16" fontFamily={font}>
        next token
      </text>
      <text x={250} y={64} fill={ink} fontSize="15" fontFamily={font}>
        Each position sees only earlier tokens
      </text>
      <text x={578} y={190} textAnchor="middle" fill={ink} fontSize="15" fontFamily={font}>
        future tokens blocked
      </text>
    </g>
  )
}

function DiffusionDiagram({ marker }: { marker: string }) {
  const densities = [0, 8, 22]
  return (
    <g>
      <text x={40} y={36} fill={ink} fontSize="15" fontFamily={font}>
        Add noise
      </text>
      {densities.map((count, index) => (
        <g key={`f-${count}`}>
          <rect x={40 + index * 150} y={52} width="88" height="72" fill={softBlue} stroke={blue} />
          {Array.from({ length: count }, (_, dot) => (
            <circle
              key={dot}
              cx={52 + index * 150 + (dot % 6) * 12}
              cy={64 + Math.floor(dot / 6) * 12}
              r="2.2"
              fill={ink}
            />
          ))}
          {index < 2 ? <Arrow x1={136 + index * 150} y1={88} x2={176 + index * 150} y2={88} marker={marker} /> : null}
        </g>
      ))}
      <text x={40} y={168} fill={ink} fontSize="15" fontFamily={font}>
        Denoise
      </text>
      {[22, 8, 0].map((count, index) => (
        <g key={`r-${count}`}>
          <rect x={40 + index * 150} y={184} width="88" height="72" fill={index === 2 ? softGreen : paper} stroke={green} />
          {Array.from({ length: count }, (_, dot) => (
            <circle
              key={dot}
              cx={52 + index * 150 + (dot % 6) * 12}
              cy={196 + Math.floor(dot / 6) * 12}
              r="2.2"
              fill={ink}
            />
          ))}
          {index < 2 ? <Arrow x1={136 + index * 150} y1={220} x2={176 + index * 150} y2={220} marker={marker} /> : null}
        </g>
      ))}
      <text x={520} y={120} fill={ink} fontSize="15" fontFamily={font}>
        Many small
      </text>
      <text x={520} y={140} fill={ink} fontSize="15" fontFamily={font}>
        updates, not
      </text>
      <text x={520} y={160} fill={ink} fontSize="15" fontFamily={font}>
        one jump
      </text>
    </g>
  )
}

const diagrams: Record<string, (marker: string) => ReactNode> = {
  'decision-tree': () => <DecisionTreeDiagram />,
  'random-forest': (marker) => <RandomForestDiagram marker={marker} />,
  'gradient-boosting': (marker) => <GradientBoostingDiagram marker={marker} />,
  'k-means': (marker) => <KMeansDiagram marker={marker} />,
  pca: () => <PcaDiagram />,
  cnn: (marker) => <CnnDiagram marker={marker} />,
  'naive-bayes': (marker) => <NaiveBayesDiagram marker={marker} />,
  bert: (marker) => <BertDiagram marker={marker} />,
  gpt: (marker) => <GptDiagram marker={marker} />,
  diffusion: (marker) => <DiffusionDiagram marker={marker} />,
}

export function MechanismSection() {
  return (
    <section className="band" id="how-they-work" aria-labelledby="how-title">
      <h2 id="how-title">How the Algorithms Work</h2>
      <p className="section-intro">
        Related algorithms are grouped. Each card shows the mechanism, a short explanation, and an
        illustrative use. The comparison for that group follows the cards.
      </p>
      {studyGroups.map((group) => (
        <section key={group.id} className="study-group" aria-labelledby={`group-${group.id}`}>
          <h3 id={`group-${group.id}`}>{group.title}</h3>
          <p className="section-intro">{group.lede}</p>
          <div className="mechanism-grid">
            {group.algorithmIds.map((id) => {
              const algorithm = getAlgorithm(id)
              const copy = mechanisms.find((item) => item.id === id)
              const letters = relationshipIdsFor(id)
              if (!copy) return null
              const domains = [
                ...algorithm.domains.primary.map((domain) => `${domainById(domain).label} (primary)`),
                ...algorithm.domains.secondary.map((domain) => `${domainById(domain).label} (secondary)`),
              ]
              return (
                <article key={id} className="learn-card" id={`mech-${id}`}>
                  <p className={`paradigm-badge paradigm-${algorithm.paradigm}`}>
                    {paradigmById(algorithm.paradigm).label}
                  </p>
                  <h4>{algorithm.name}</h4>
                  <p className="note-meta">
                    {algorithm.modelForm}
                    {algorithm.paradigmNote ? ` · ${algorithm.paradigmNote}` : ''}
                  </p>
                  <p className="note-meta">{domains.join(' · ')}</p>
                  <Diagram description={copy.description}>{(marker) => diagrams[id](marker)}</Diagram>
                  <p>{copy.caption}</p>
                  <p>{algorithm.detail}</p>
                  <p>
                    <strong>Use. </strong>
                    {algorithm.detailUseCase}
                  </p>
                  {letters.length > 0 ? (
                    <p className="note-meta">
                      {letters.map((letter) => (
                        <a key={letter} href={`#compare-${letter}`}>
                          {formatRelationshipIds([letter])}
                        </a>
                      ))}
                    </p>
                  ) : null}
                </article>
              )
            })}
          </div>
          <div className="study-relations">
            {group.relationshipIds.map((relationshipId) => {
              const relationship = relationships.find((item) => item.id === relationshipId)
              return relationship ? (
                <RelationshipCard key={relationshipId} relationship={relationship} detailed />
              ) : null
            })}
          </div>
        </section>
      ))}
    </section>
  )
}
