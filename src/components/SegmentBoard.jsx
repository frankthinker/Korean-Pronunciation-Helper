import { motion } from 'framer-motion'
import { RULE_COLORS, RULE_REFERENCES } from '../lib/rules'

function getDisplayNotes(segment, activeRule) {
  if (!segment?.notes?.length) return []
  const filtered = segment.notes.filter((note) => note.rule !== 'base')
  const seen = new Set()
  const results = []

  filtered.forEach((note) => {
    if (activeRule !== 'all' && note.rule !== activeRule) return
    if (seen.has(note.rule)) return
    seen.add(note.rule)
    results.push(note)
  })

  if (results.length) return results

  if (activeRule !== 'all') return []

  const baseNote = segment.notes.find((note) => note.rule === 'base')
  return baseNote ? [baseNote] : []
}

function buildCardStyle(notes) {
  if (!notes.length) {
    return {
      borderColor: 'var(--neutral-200)',
      '--segment-bg': 'rgba(255, 255, 255, 0.95)',
    }
  }
  const colors = notes
    .map((note) => RULE_COLORS[note.rule] ?? RULE_COLORS.default)
    .filter(Boolean)

  if (!colors.length) {
    return {
      borderColor: 'var(--neutral-200)',
      '--segment-bg': 'rgba(255, 255, 255, 0.95)',
    }
  }

  if (colors.length === 1) {
    const color = colors[0]
    return {
      borderColor: color,
      '--segment-bg': `${color}22`,
    }
  }

  const stops = colors
    .slice(0, 3)
    .map((color, idx, arr) => {
      const ratio = Math.round((idx / (arr.length - 1 || 1)) * 100)
      return `${color}33 ${ratio}%`
    })
    .join(', ')

  return {
    borderColor: colors[0],
    '--segment-bg': `linear-gradient(135deg, ${stops})`,
  }
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
        const displayNotes = getDisplayNotes(segment, activeRule)
        const hasNote = displayNotes.length > 0
        const isDimmed = activeRule !== 'all' && !hasNote
        const cardStyle = buildCardStyle(displayNotes)
        const hoverNotes = hasNote
          ? displayNotes
          : segment.notes?.filter((note) => note.rule === 'base') ?? []
        let fallbackTags = segment.notes?.filter((note) => note.rule !== 'base') ?? []
        if (!fallbackTags.length) {
          fallbackTags = segment.notes?.filter((note) => note.rule === 'base') ?? []
        }
        const tagNotes = hasNote ? displayNotes : fallbackTags
        return (
          <motion.button
            key={segment.index}
            className={`segment-card ${isDimmed ? 'is-dimmed' : ''}`}
            style={cardStyle}
            onMouseEnter={(event) => {
              const rect = event.currentTarget.getBoundingClientRect()
              const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1024
              const tooltipWidth = 320
              const margin = 16
              const needsLeft = rect.right + tooltipWidth + margin > viewportWidth
              const anchorSide = needsLeft ? 'left' : 'right'
              const payload = {
                x: anchorSide === 'left' ? rect.left : rect.right,
                y: rect.top + rect.height / 2,
                anchorSide,
                anchorX: anchorSide === 'left' ? rect.left : rect.right,
                anchorY: rect.top + rect.height / 2,
                segment,
                note: hoverNotes[0] ?? segment.notes?.find((n) => n.rule === 'base'),
                notes: hoverNotes,
              }
              onHover(payload)
            }}
            onMouseLeave={() => onHover(null)}
            whileHover={{ y: -4 }}
          >
            <span className="segment-char">{segment.char}</span>
            <div className="segment-tags">
              {tagNotes.length ? (
                tagNotes.map((note) => (
                  <span key={note.rule} className="segment-tag">
                    {RULE_REFERENCES[note.rule]?.label ?? note.rule}
                  </span>
                ))
              ) : (
                <small>—</small>
              )}
            </div>
            <p className="segment-roman">{segment.finalRoman}</p>
          </motion.button>
        )
      })}
    </div>
  )
}
