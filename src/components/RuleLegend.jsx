import { RULE_REFERENCES, RULE_COLORS } from '../lib/rules'

export default function RuleLegend() {
  return (
    <div className="rule-legend">
      {Object.entries(RULE_REFERENCES)
        .filter(([key]) => key !== 'base')
        .map(([key, meta]) => (
          <a
            key={key}
            className="rule-chip"
            style={{ background: `${(RULE_COLORS[key] ?? RULE_COLORS.default)}22`, borderColor: RULE_COLORS[key] || RULE_COLORS.default }}
            href={`https://zhuanlan.zhihu.com/p/1979218803289248530${meta.anchor ?? ''}`}
            target="_blank"
            rel="noreferrer"
          >
            {meta.label}
          </a>
        ))}
    </div>
  )
}
