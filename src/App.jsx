import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import TextInputPanel from './components/TextInputPanel'
import RuleFilterTabs from './components/RuleFilterTabs'
import SegmentBoard from './components/SegmentBoard'
import RomanizationStrip from './components/RomanizationStrip'
import RuleLegend from './components/RuleLegend'
import StatsPanel from './components/StatsPanel'
import TooltipCard from './components/TooltipCard'
import TtsPanel from './components/TtsPanel'
import sampleSentences from './data/sampleSentences'
import { romanizeSentence } from './lib/romanizer'

const SAMPLE_BATCH_SIZE = 3
const DEFAULT_SENTENCE = sampleSentences[0]

const pickRandomSamples = (count = SAMPLE_BATCH_SIZE) => {
  if (sampleSentences.length <= count) {
    return [...sampleSentences]
  }
  const indexes = new Set()
  while (indexes.size < count) {
    indexes.add(Math.floor(Math.random() * sampleSentences.length))
  }
  return [...indexes].map((idx) => sampleSentences[idx])
}

export default function App() {
  const [text, setText] = useState(DEFAULT_SENTENCE)
  const [debouncedText, setDebouncedText] = useState(DEFAULT_SENTENCE)
  const [activeRule, setActiveRule] = useState('all')
  const [hoverPayload, setHoverPayload] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [samples, setSamples] = useState(() => pickRandomSamples())

  const refreshSamples = () => setSamples(pickRandomSamples())

  const handleSampleSelect = (sentence) => setText(sentence)

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
            onSampleSelect={handleSampleSelect}
            onRefreshSamples={refreshSamples}
            samples={samples}
            isLoading={isAnalyzing}
          />
          <RuleLegend />
          <TtsPanel text={text} />
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
