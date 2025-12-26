import { RULE_REFERENCES } from '../lib/rules'

const orderedRules = [
  'all',
  'liaison',
  'assimilation',
  'tensification',
  'aspiration',
  'palatalization',
  'contraction',
  'glide',
  'neutralization',
  'base',
]

export default function RuleFilterTabs({ activeRule, onChange, stats }) {
  return (
    <div className="rule-tabs">
      {orderedRules.map((ruleKey) => {
        const label =
          ruleKey === 'all'
            ? '全部高亮'
            : RULE_REFERENCES[ruleKey]?.label ?? ruleKey
        const count = ruleKey === 'all' ? Object.values(stats ?? {}).reduce((a, b) => a + b, 0) : stats?.[ruleKey] ?? 0
        const active = activeRule === ruleKey
        return (
          <button
            key={ruleKey}
            className={`rule-tab ${active ? 'is-active' : ''}`}
            onClick={() => onChange(ruleKey)}
          >
            <span>{label}</span>
            <span className="badge">{count}</span>
          </button>
        )
      })}
    </div>
  )
}
