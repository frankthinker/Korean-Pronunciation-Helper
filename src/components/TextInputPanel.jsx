import { motion } from 'framer-motion'
import { WandSparkles, Loader2, RotateCcw } from 'lucide-react'

export default function TextInputPanel({
  value,
  onChange,
  onSampleSelect,
  onRefreshSamples,
  samples = [],
  isLoading,
}) {
  return (
    <section className="kpv-panel">
      <div className="kpv-panel__header">
        <div>
          <p className="panel-label">输入韩语句子</p>
          <h2>实时解析并标注所有音变</h2>
        </div>
        <motion.button
          whileTap={{ scale: 0.96 }}
          className="ghost-btn"
          onClick={() => onSampleSelect(samples[Math.floor(Math.random() * samples.length)] || '')}
        >
          <WandSparkles size={16} />
          换个示例
        </motion.button>
      </div>
      <div className="textarea-wrapper">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="例如：한국어 발음은 왜 이렇게 달라질까요?"
          rows={3}
        />
        {isLoading && (
          <div className="textarea-overlay">
            <Loader2 className="spin" size={20} />
            正在解析…
          </div>
        )}
      </div>
      <div className="sample-header">
        <p className="panel-label">示例句子</p>
        <button type="button" className="icon-btn" onClick={onRefreshSamples}>
          <RotateCcw size={16} />
          刷新示例
        </button>
      </div>
      <div className="sample-chips">
        {samples.map((sentence) => (
          <motion.button
            type="button"
            key={sentence}
            className="chip"
            onClick={() => onSampleSelect(sentence)}
            whileHover={{ y: -2 }}
          >
            {sentence}
          </motion.button>
        ))}
      </div>
    </section>
  )
}
