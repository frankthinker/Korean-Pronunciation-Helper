import { RULE_REFERENCES, RULE_COLORS } from '../lib/rules'

export default function StatsPanel({ stats = {} }) {
  const entries = Object.entries(stats).sort((a, b) => b[1] - a[1])
  return (
    <div className="stats-grid">
      {entries.map(([rule, count]) => (
        <div key={rule} className="stat-card" style={{ borderColor: RULE_COLORS[rule] || 'var(--neutral-200)' }}>
          <p>{RULE_REFERENCES[rule]?.label ?? rule}</p>
          <strong>{count}</strong>
        </div>
      ))}
      {!entries.length && <p className="stat-empty">暂无音变，输入更多文本试试</p>}
    </div>
  )
}
