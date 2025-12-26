import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

export default function TooltipCard({ payload, onEnter = () => {}, onLeave = () => {} }) {
  const notes =
    payload?.notes?.length
      ? payload.notes
      : payload?.note
        ? [payload.note]
        : []
  const primary = notes[0]
  const extra = notes.slice(1)
  const [coords, setCoords] = useState({ x: 0, y: 0, transform: 'translate(0, 0)' })

  useEffect(() => {
    if (!payload) return
    const margin = 16
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800
    const anchorSide = payload.anchorSide || 'right'
    const anchorX = payload.anchorX ?? payload.x ?? 0
    const anchorY = payload.anchorY ?? payload.y ?? 0
    const y = Math.min(Math.max(margin, anchorY), viewportHeight - margin)
    const isRightAligned = anchorX > window.innerWidth * 0.7
    const tooltipWidth = 320
    const x = isRightAligned ? anchorX - tooltipWidth : anchorX
    const transform = 'translate(0, -50%)'
    setCoords({ x, y, transform })
  }, [payload])

  const renderRuleNote = (note) => (
    <div key={note.rule} className="tooltip-note">
      <p className="tooltip-rule">{note.label ?? note.rule}</p>
      {note.description && <p className="tooltip-desc">{note.description}</p>}
      {(note.before || note.after) && (
        <p className="tooltip-logic">
          <span className="tooltip-value">{note.before || '—'}</span>
          <span className="tooltip-label">→</span>
          <span className="tooltip-value">{note.after || '—'}</span>
        </p>
      )}
    </div>
  )

  return (
    <AnimatePresence>
      {payload?.segment && (
        <motion.div
          className="tooltip-card"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18 }}
          style={{ left: coords.x, top: coords.y, transform: coords.transform }}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          <div className="tooltip-head">
            <h4>{payload.segment.char}</h4>
            {primary?.link && (
              <a href={primary.link} target="_blank" rel="noreferrer">
                查看规则
                <ExternalLink size={14} />
              </a>
            )}
          </div>
          <div className="tooltip-section tooltip-basics">
            <p className="tooltip-meta">
              <span className="tooltip-label">原始拼写</span>
              <span className="tooltip-value">{payload.segment.char}</span>
            </p>
            <p className="tooltip-meta">
              <span className="tooltip-label">基础罗马音</span>
              <span className="tooltip-value">{payload.segment.baseRoman || '—'}</span>
            </p>
            <p className="tooltip-meta">
              <span className="tooltip-label">最终发音</span>
              <span className="tooltip-value">{payload.segment.finalRoman || '—'}</span>
            </p>
          </div>
          {primary && <div className="tooltip-section tooltip-primary">{renderRuleNote(primary)}</div>}
          {extra.length > 0 && (
            <div className="tooltip-section tooltip-extra">
              <p className="tooltip-section-title">其它同时发生的音变</p>
              {extra.map((note) => renderRuleNote(note))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
