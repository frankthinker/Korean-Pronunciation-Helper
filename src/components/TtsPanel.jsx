import { useEffect, useState } from 'react'
import { Volume2, Loader2 } from 'lucide-react'

const VOICES = [
  { id: 'ko-KR-SunHiNeural', label: 'SunHi · Female' },
  { id: 'ko-KR-InJoonNeural', label: 'InJoon · Male' },
]
const RATE_MIN = -95
const RATE_MAX = 60

export default function TtsPanel({ text }) {
  const [voice, setVoice] = useState(VOICES[0].id)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [audio, setAudio] = useState(null)
  const [rate, setRate] = useState(0)
  const [isOnline, setIsOnline] = useState(
    typeof navigator === 'undefined' ? true : navigator.onLine,
  )

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause()
        URL.revokeObjectURL(audio.src)
      }
    }
  }, [audio])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine)
    }
    window.addEventListener('online', handleStatusChange)
    window.addEventListener('offline', handleStatusChange)
    return () => {
      window.removeEventListener('online', handleStatusChange)
      window.removeEventListener('offline', handleStatusChange)
    }
  }, [])

  const disabled = !text?.trim() || isLoading || !isOnline
  const formattedRate = rate >= 0 ? `+${rate}%` : `${rate}%`

  const handleSpeak = async () => {
    if (!text?.trim()) {
      setError('请输入要朗读的韩语句子')
      return
    }
    if (!isOnline) {
      setError('检测到当前处于离线状态，请连接互联网后再使用朗读功能。')
      return
    }
    setError('')
    setIsLoading(true)
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice, rate }),
      })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || '合成失败')
      }
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      if (audio) {
        audio.pause()
        URL.revokeObjectURL(audio.src)
      }
      const player = new Audio(url)
      setAudio(player)
      player.onended = () => setIsLoading(false)
      player.onerror = () => {
        setIsLoading(false)
        setError('音频播放失败')
      }
      await player.play()
    } catch (err) {
      setIsLoading(false)
      setError(err.message ?? '合成失败')
    }
  }

  return (
    <section className="kpv-panel tts-panel">
      <div className="kpv-panel__header">
        <div>
          <p className="panel-label">自然语音朗读</p>
          <h2>Edge Neural 语音</h2>
        </div>
      </div>
      <div className="tts-controls">
        <label>
          <span>发音人</span>
          <select value={voice} onChange={(e) => setVoice(e.target.value)}>
            {VOICES.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <div className="tts-rate">
          <label htmlFor="tts-rate">
            <span>语速调节</span>
            <strong>{formattedRate}</strong>
          </label>
          <input
            id="tts-rate"
            type="range"
            min={RATE_MIN}
            max={RATE_MAX}
            step="5"
            value={rate}
            onChange={(event) => setRate(Number(event.target.value))}
          />
          <div className="tts-rate__labels">
            <span>超慢</span>
            <span>适中</span>
            <span>更快</span>
          </div>
        </div>
        <button type="button" className="primary-btn" disabled={disabled} onClick={handleSpeak}>
          {isLoading ? <Loader2 className="spin" size={16} /> : <Volume2 size={16} />}
          {isLoading ? '合成中…' : '朗读句子'}
        </button>
        {error ? (
          <p className="tts-error">{error}</p>
        ) : (
          <p className="tts-hint">
            {isOnline
              ? '使用微软 Edge Neural 免费语音实时朗读，无需额外配置。'
              : '当前处于离线模式，联网后方可使用朗读功能。'}
          </p>
        )}
      </div>
    </section>
  )
}
