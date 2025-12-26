import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

export default function TooltipCard({ payload }) {
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
            <a href={payload.note?.link} target="_blank" rel="noreferrer">
              查看规则
              <ExternalLink size={14} />
            </a>
          </div>
          <p className="tooltip-meta">原始拼写：{payload.segment.char}</p>
          <p className="tooltip-meta">基础罗马音：{payload.segment.baseRoman || '—'}</p>
          <p className="tooltip-meta">最终发音：{payload.segment.finalRoman || '—'}</p>
          <p className="tooltip-rule">{payload.note?.label}</p>
          <p className="tooltip-desc">{payload.note?.description}</p>
          {payload.note?.before && (
            <p className="tooltip-logic">{payload.note.before} → {payload.note.after}</p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
