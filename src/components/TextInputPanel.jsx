import { motion } from 'framer-motion'
import { WandSparkles, Loader2 } from 'lucide-react'

const samples = [
  '오늘 저녁에 뭐 먹을래? 나는 따뜻한 국물이 땡겨.',
  '학교에 가기 전에 커피 한 잔 마실까요?',
  '저 문장을 빠르게 읽으면 어떤 음변이 생길까?',
]

export default function TextInputPanel({ value, onChange, onSampleSelect, isLoading }) {
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
          onClick={() => onSampleSelect(samples[Math.floor(Math.random() * samples.length)])}
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
      <div className="sample-chips">
        {samples.map((sentence) => (
          <motion.button
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
