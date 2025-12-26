import { motion } from 'framer-motion'
import { Copy } from 'lucide-react'

export default function RomanizationStrip({ text }) {
  const copyRoman = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text)
    }
  }
  return (
    <motion.div className="roman-strip" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div>
        <p className="panel-label">真实口语拉丁转写</p>
        <h2>{text || '等待输入...'}</h2>
      </div>
      <button className="ghost-btn" onClick={copyRoman}>
        <Copy size={16} />
        复制
      </button>
    </motion.div>
  )
}
