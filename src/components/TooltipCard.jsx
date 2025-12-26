import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

export default function TooltipCard({ payload }) {
  const notes =
    payload?.notes?.length
      ? payload.notes
      : payload?.note
        ? [payload.note]
        : []
  const primary = notes[0]
  const extra = notes.slice(1)

  return (
    <AnimatePresence>
      {payload?.segment && (
        <motion.div
          className="tooltip-card"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18 }}
          style={{ left: payload.x, top: payload.y }}
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
          <p className="tooltip-meta">原始拼写：{payload.segment.char}</p>
          <p className="tooltip-meta">基础罗马音：{payload.segment.baseRoman || '—'}</p>
          <p className="tooltip-meta">最终发音：{payload.segment.finalRoman || '—'}</p>
          <p className="tooltip-rule">{primary?.label ?? '—'}</p>
          <p className="tooltip-desc">{primary?.description}</p>
          {primary?.before && (
            <p className="tooltip-logic">
              {primary.before} → {primary.after}
            </p>
          )}
          {extra.length > 0 && (
            <div className="tooltip-extra">
              <p>同时发生：</p>
              <ul>
                {extra.map((note) => (
                  <li key={note.rule}>{note.label}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
