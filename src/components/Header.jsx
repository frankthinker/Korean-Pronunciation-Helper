import { Sparkles, BookOpenCheck } from 'lucide-react'

const gradients = {
  primary: 'linear-gradient(120deg, rgba(151,217,225,0.45), rgba(255,192,203,0.35))',
}

export default function Header() {
  return (
    <header className="kpv-hero" style={{ backgroundImage: gradients.primary }}>
      <div className="kpv-hero__meta">
        <span className="pill pill--accent">
          <Sparkles size={16} />
          实时发音拆解
        </span>
        <span className="pill pill--ghost">
          <BookOpenCheck size={16} />
          规则来自知乎专栏
        </span>
      </div>
      <h1 className="gradient-title">韩语音变拉丁转写</h1>
      <p>
        输入任意韩语句子，系统将依据《韩语发音规则全解》自动拆解音节、追踪连音/同化/紧音化等音变，并用活泼的高亮与悬浮卡片展示“原始拼写 → 规则 → 变化逻辑 → 最终发音”。
      </p>
    </header>
  )
}
