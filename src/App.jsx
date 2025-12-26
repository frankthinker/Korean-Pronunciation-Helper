import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import TextInputPanel from './components/TextInputPanel'
import RuleFilterTabs from './components/RuleFilterTabs'
import SegmentBoard from './components/SegmentBoard'
import RomanizationStrip from './components/RomanizationStrip'
import RuleLegend from './components/RuleLegend'
import StatsPanel from './components/StatsPanel'
import TooltipCard from './components/TooltipCard'
import { romanizeSentence } from './lib/romanizer'

const DEFAULT_SENTENCE = '오늘 저녁에 뭐 먹을래? 나는 따뜻한 국물이 땡겨.'

export default function App() {
  const [text, setText] = useState(DEFAULT_SENTENCE)
  const [debouncedText, setDebouncedText] = useState(DEFAULT_SENTENCE)
  const [activeRule, setActiveRule] = useState('all')
  const [hoverPayload, setHoverPayload] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    setIsAnalyzing(true)
    const handler = setTimeout(() => {
      setDebouncedText(text)
      setIsAnalyzing(false)
    }, 280)
    return () => clearTimeout(handler)
  }, [text])

  const analysis = useMemo(() => romanizeSentence(debouncedText || ''), [debouncedText])

  return (
    <div className="kpv-app">
      <Header />
      <main className="kpv-layout">
        <div className="kpv-column kpv-column--left">
          <TextInputPanel
            value={text}
            onChange={setText}
            onSampleSelect={(sample) => setText(sample)}
            isLoading={isAnalyzing}
          />
          <RuleLegend />
        </div>
        <div className="kpv-column kpv-column--right">
          <RomanizationStrip text={analysis.finalRomanization} />
          <section className="kpv-panel">
            <div className="kpv-panel__header">
              <div>
                <p className="panel-label">音变高亮筛选</p>
                <h2>逐字高亮 + 悬浮提示</h2>
              </div>
            </div>
            <RuleFilterTabs activeRule={activeRule} onChange={setActiveRule} stats={analysis.ruleStats} />
            <SegmentBoard segments={analysis.segments} activeRule={activeRule} onHover={setHoverPayload} />
          </section>
          <section className="kpv-panel">
            <div className="kpv-panel__header">
              <div>
                <p className="panel-label">规则统计与学习指引</p>
                <h2>快速锁定频繁发生的音变</h2>
              </div>
            </div>
            <StatsPanel stats={analysis.ruleStats} />
          </section>
        </div>
      </main>
      <TooltipCard payload={hoverPayload} />
    </div>
  )
}
