import { motion } from 'framer-motion'
import { RULE_COLORS, RULE_REFERENCES } from '../lib/rules'

function deriveNote(segment, activeRule) {
  if (!segment?.notes) return null
  if (activeRule === 'all') {
    return segment.notes.find((note) => note.rule !== 'base') ?? segment.notes.find((note) => note.rule === 'base')
  }
  return segment.notes.find((note) => note.rule === activeRule)
}

function getColor(note) {
  if (!note) return 'var(--neutral-200)'
  return RULE_COLORS[note.rule] ?? RULE_COLORS.default
}

export default function SegmentBoard({ segments, activeRule, onHover }) {
  return (
    <div className="segment-board">
      {segments.map((segment, idx) => {
        if (segment.type === 'other') {
          return (
            <span key={`${segment.text}-${idx}`} className="segment-other">
              {segment.text}
            </span>
          )
        }
        const note = deriveNote(segment, activeRule)
        const color = getColor(note)
        const isDimmed = activeRule !== 'all' && !note
        return (
          <motion.button
            key={segment.index}
            className={`segment-card ${isDimmed ? 'is-dimmed' : ''}`}
            style={{ borderColor: color, background: `${color}22` }}
            onMouseEnter={(event) => {
              const rect = event.currentTarget.getBoundingClientRect()
              const payload = {
                x: rect.left + rect.width / 2,
                y: rect.top,
                segment,
                note: note ?? segment.notes?.find((n) => n.rule === 'base'),
              }
              onHover(payload)
            }}
            onMouseLeave={() => onHover(null)}
            whileHover={{ y: -4 }}
          >
            <span className="segment-char">{segment.char}</span>
            <small>{note ? RULE_REFERENCES[note.rule]?.label ?? note.rule : '—'}</small>
            <p className="segment-roman">{segment.finalRoman}</p>
          </motion.button>
        )
      })}
    </div>
  )
}
