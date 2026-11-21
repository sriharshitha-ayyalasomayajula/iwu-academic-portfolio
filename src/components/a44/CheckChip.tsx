export function CheckChip({ n }: { n: 1 | 2 | 3 }) {
  const name = n === 1 ? 'Task' : n === 2 ? 'Explanation' : 'System'
  return (
    <span className={`a44-chip a44-chip-${n}`}>
      <b>{n}</b> {name}
    </span>
  )
}
