import { EdgeTTS } from '@andresaya/edge-tts'
import { webcrypto } from 'node:crypto'

const DEFAULT_VOICE = 'ko-KR-SunHiNeural'
const DEFAULT_FORMAT = 'audio-24khz-48kbitrate-mono-mp3'
const MAX_TEXT_LENGTH = 500
const RATE_MIN = -80
const RATE_MAX = 60

export function edgeTtsPlugin() {
  return {
    name: 'edge-tts-proxy',
    configureServer(server) {
      server.middlewares.use('/api/tts', createEdgeTtsMiddleware())
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/tts', createEdgeTtsMiddleware())
    },
  }
}

function createEdgeTtsMiddleware() {
  return async (req, res, next) => {
    if (req.method !== 'POST') {
      res.statusCode = 405
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Method Not Allowed' }))
      return
    }

    ensureCrypto()

    try {
      const body = await readJson(req)
      const text = (body?.text ?? '').toString().trim()
      const voice = (body?.voice ?? DEFAULT_VOICE).toString()
      const format = (body?.format ?? DEFAULT_FORMAT).toString()
      const rate = parseRate(body?.rate)

      if (!text) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: '缺少要朗读的文本' }))
        return
      }

      if (text.length > MAX_TEXT_LENGTH) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: `文本过长（最多 ${MAX_TEXT_LENGTH} 个字符）` }))
        return
      }

      const audioBuffer = await synthesizeWithEdge(text, voice, format, rate)
      res.statusCode = 200
      res.setHeader('Content-Type', getMimeType(format))
      res.setHeader('Cache-Control', 'no-store')
      res.setHeader('Content-Length', audioBuffer.length)
      res.end(audioBuffer)
    } catch (error) {
      console.error('[edge-tts] synthesize failed:', error)
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: normalizeError(error) }))
    }
  }
}

async function synthesizeWithEdge(text, voice, format, rate) {
  const tts = new EdgeTTS()
  await tts.synthesize(text, voice, { outputFormat: format, rate })
  return tts.toBuffer()
}

function getMimeType(format) {
  const f = format.toLowerCase()
  if (f.includes('mp3')) return 'audio/mpeg'
  if (f.includes('opus') && f.includes('webm')) return 'audio/webm'
  if (f.includes('opus') && f.includes('ogg')) return 'audio/ogg'
  if (f.includes('wav') || f.includes('riff')) return 'audio/wav'
  if (f.includes('pcm')) return 'audio/L16'
  return 'application/octet-stream'
}

function ensureCrypto() {
  if (!globalThis.crypto || !globalThis.crypto.subtle) {
    globalThis.crypto = webcrypto
  }
}

function normalizeError(error) {
  if (isNetworkIssue(error)) {
    return '语音朗读需要联网，请检查网络连接后再试。'
  }
  if (error?.message) {
    return error.message
  }
  return '合成失败'
}

function isNetworkIssue(error) {
  if (!error) return false
  const offlineCodes = new Set(['ENOTFOUND', 'EAI_AGAIN', 'ECONNRESET', 'ECONNREFUSED', 'ETIMEDOUT'])
  if (offlineCodes.has(error.code)) return true
  const msg = (error.message || '').toLowerCase()
  return (
    msg.includes('network') ||
    msg.includes('getaddrinfo') ||
    msg.includes('websocket inactivity') ||
    msg.includes('fetch failed') ||
    msg.includes('offline') ||
    msg.includes('timeout')
  )
}

function parseRate(value) {
  const numeric = typeof value === 'string' ? Number(value) : value
  if (!Number.isFinite(numeric)) return 0
  if (numeric < RATE_MIN) return RATE_MIN
  if (numeric > RATE_MAX) return RATE_MAX
  return Math.round(numeric)
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => {
      chunks.push(chunk)
    })
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8')
        resolve(raw ? JSON.parse(raw) : {})
      } catch (err) {
        reject(err)
      }
    })
    req.on('error', reject)
  })
}
