import {
  FINAL_TO_INITIAL,
  PALATAL_TRIGGERS,
  ASPIRATED_MAP,
  TENSE_MAP,
  cloneJamo,
  composeRomanization,
  decompose,
  isHangul,
  romanizeFinal,
  romanizeInitial,
} from './hangul.js'
import { RULE_REFERENCES, RULE_DESCRIPTIONS } from './rules.js'

const LINK_BASE = 'https://zhuanlan.zhihu.com/p/1979218803289248530'

const buildNote = (rule, extra = {}) => {
  const meta = RULE_REFERENCES[rule] ?? {}
  const base = {
    rule,
    label: meta.label ?? '音变',
    description: RULE_DESCRIPTIONS[rule] ?? '',
    link: `${LINK_BASE}${meta.anchor ?? ''}`,
    targets: ['current', 'next'],
  }
  return { ...base, ...extra }
}

const TENSIFICATION_FINALS = new Set([
  'ㄱ', 'ㄲ', 'ㅋ', 'ㄳ', 'ㄺ',
  'ㄷ', 'ㅅ', 'ㅆ', 'ㅈ', 'ㅊ', 'ㅌ',
  'ㅂ', 'ㅄ', 'ㄼ', 'ㄾ', 'ㄿ', 'ㅀ'
])

const H_WEAKENING_CONTEXT = new Set(['', 'ㄴ', 'ㄹ', 'ㅁ'])

const N_INSERTION_FINALS = new Set(['ㄱ', 'ㄲ', 'ㅋ', 'ㄺ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄹ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅍ', 'ㅅ', 'ㅆ', 'ㅈ', 'ㅊ'])

const N_INSERTION_VOWELS = new Set(['ㅣ', 'ㅑ', 'ㅕ', 'ㅛ', 'ㅠ', 'ㅖ', 'ㅒ'])

const ASSIMILATION_RULES = {
  'ㄱㄴ': { final: 'ㅇ', initial: 'ㄴ' },
  'ㄱㄹ': { final: 'ㅇ', initial: 'ㄴ' },
  'ㄱㅁ': { final: 'ㅇ', initial: 'ㅁ' },
  'ㄴㄹ': { final: 'ㄹ', initial: 'ㄹ' },
  'ㄹㄴ': { final: 'ㄹ', initial: 'ㄹ' },
  'ㅂㅁ': { final: 'ㅁ', initial: 'ㅁ' },
  'ㅂㄴ': { final: 'ㅁ', initial: 'ㄴ' },
  'ㅂㄹ': { final: 'ㅁ', initial: 'ㄹ' },
  'ㅁㄴ': { final: 'ㅁ', initial: 'ㄴ' },
  'ㅇㄹ': { final: 'ㅇ', initial: 'ㄴ' },
  'ㄷㄴ': { final: 'ㄴ', initial: 'ㄴ' },
  'ㄷㅁ': { final: 'ㄴ', initial: 'ㅁ' },
  'ㄷㄹ': { final: 'ㄴ', initial: 'ㄹ' },
  'ㅅㄴ': { final: 'ㄴ', initial: 'ㄴ' },
  'ㅆㄴ': { final: 'ㄴ', initial: 'ㄴ' },
  'ㅈㄴ': { final: 'ㄴ', initial: 'ㄴ' },
  'ㅊㄴ': { final: 'ㄴ', initial: 'ㄴ' },
  'ㅎㄴ': { final: 'ㄴ', initial: 'ㄴ' },
  'ㅅㅁ': { final: 'ㄴ', initial: 'ㅁ' },
  'ㅆㅁ': { final: 'ㄴ', initial: 'ㅁ' },
  'ㅈㅁ': { final: 'ㄴ', initial: 'ㅁ' },
  'ㅊㅁ': { final: 'ㄴ', initial: 'ㅁ' },
  'ㅎㅁ': { final: 'ㄴ', initial: 'ㅁ' },
}

export function tokenizeSentence(sentence) {
  const tokens = []
  let buffer = ''
  let type = null

  const flush = () => {
    if (!buffer) return
    tokens.push({ text: buffer, type })
    buffer = ''
    type = null
  }

  for (const char of sentence) {
    const isKor = isHangul(char)
    const nextType = isKor ? 'hangul' : 'other'
    if (type === null) {
      type = nextType
      buffer = char
      continue
    }
    if (nextType === type) {
      buffer += char
    } else {
      flush()
      type = nextType
      buffer = char
    }
  }

  flush()
  return tokens
}

export function analyzeSyllableBlock(block) {
  return Array.from(block).map((char) => {
    if (!isHangul(char)) {
      return { char, baseJamo: null, workJamo: null }
    }
    const decomposed = decompose(char)
    return {
      char,
      baseJamo: cloneJamo(decomposed),
      workJamo: cloneJamo(decomposed),
    }
  })
}

function baseRomanizeTriple(jamo) {
  if (!jamo) return { text: '', notes: [] }
  const text = composeRomanization(jamo)
  return {
    text,
    notes: [
      buildNote('base', {
        label: '基础发音',
        description: RULE_DESCRIPTIONS.base,
        before: text,
        after: text,
        link: `${LINK_BASE}${RULE_REFERENCES.base?.anchor ?? ''}`,
        targets: ['current'],
      }),
    ],
  }
}

function applyLiaison(current, next) {
  if (!current?.final || !next) return null
  if (current.final === 'ㅇ') return null
  const nextInitial = next.initial ?? ''
  if (nextInitial === 'ㅎ' && (current.final === 'ㅅ' || current.final === 'ㅆ')) return null
  const eligible = !nextInitial || nextInitial === 'ㅇ' || nextInitial === 'ㅎ'
  if (!eligible) return null
  const released = FINAL_TO_INITIAL[current.final]
  if (!released) return null
  const before = romanizeFinal(current.final)
  const afterInitial = romanizeInitial(released)
  const nextInitialLabel = nextInitial || '∅'
  const dropFinal = released !== 'ㅇ'
  return {
    apply: true,
    current: { ...current, final: dropFinal ? '' : current.final },
    next: { ...next, initial: released },
    note: buildNote('liaison', {
      label: '连音释放',
      before: `${before} + ${nextInitialLabel}`,
      after: afterInitial,
    }),
  }
}

function applyAssimilation(current, next) {
  if (!current?.final || !next?.initial) return null
  const pair = current.final + next.initial
  const result = ASSIMILATION_RULES[pair]
  if (!result) return null
  return {
    apply: true,
    current: { ...current, final: result.final },
    next: { ...next, initial: result.initial },
    note: buildNote('assimilation', {
      before: pair,
      after: result.final + result.initial,
    }),
  }
}

function applyTensification(current, next) {
  if (!next?.initial || !current?.final) return null
  if (!TENSIFICATION_FINALS.has(current.final)) return null
  const tensified = TENSE_MAP[next.initial]
  if (!tensified) return null
  return {
    apply: true,
    current: { ...current },
    next: { ...next, initial: tensified },
    note: buildNote('tensification', {
      before: next.initial,
      after: tensified,
    }),
  }
}

function applyAspiration(current, next) {
  if (!next?.initial) return null
  if (current?.final === 'ㅎ' && ASPIRATED_MAP[next.initial]) {
    return {
      apply: true,
      current: { ...current, final: '' },
      next: { ...next, initial: ASPIRATED_MAP[next.initial] },
      note: buildNote('aspiration', {
        label: 'ㅎ触发送气',
        before: next.initial,
        after: ASPIRATED_MAP[next.initial],
      }),
    }
  }
  if (next.initial === 'ㅎ' && current?.final && ASPIRATED_MAP[current.final]) {
    return {
      apply: true,
      current: { ...current, final: ASPIRATED_MAP[current.final] },
      next: { ...next, initial: 'ㅇ' },
      note: buildNote('aspiration', {
        label: 'ㅎ吸收送气',
        before: current.final + 'ㅎ',
        after: ASPIRATED_MAP[current.final] + 'ㅇ',
      }),
    }
  }
  return null
}

function applyPalatalization(current, next) {
  if (!next?.initial || !PALATAL_TRIGGERS.has(next.medial)) return null
  const map = {
    'ㄷ': 'ㅈ',
    'ㅌ': 'ㅊ',
    'ㄸ': 'ㅉ',
  }
  if (map[current?.final]) {
    return {
      apply: true,
      current: { ...current, final: '' },
      next: { ...next, initial: map[current.final] },
      note: buildNote('palatalization', {
        before: current.final + next.initial,
        after: map[current.final] + next.initial,
      }),
    }
  }
  const special = {
    'ㅅ': 'ㅆ',
    'ㅆ': 'ㅆ',
    'ㅈ': 'ㅈ',
    'ㅉ': 'ㅉ',
    'ㅊ': 'ㅊ',
  }
  if (special[next.initial]) {
    return {
      apply: true,
      current: { ...current },
      next: { ...next, initial: special[next.initial] },
      note: buildNote('palatalization', {
        label: '腭化紧音',
        before: next.initial,
        after: special[next.initial],
        targets: ['next'],
      }),
    }
  }
  return null
}

function applyContraction(current, next) {
  if (!current || !next) return null
  if (current.final === 'ㅎ' && next.initial === 'ㅇ' && next.medial === 'ㅕ') {
    return {
      apply: true,
      current: { ...current, final: '' },
      next: { ...next, medial: 'ㅕ' },
      note: buildNote('contraction', {
        label: 'ㅎ+여 缩约',
        before: 'ㅎ + ㅕ',
        after: 'ㅕ',
      }),
    }
  }
  if (current.final === 'ㅂ' && next.initial === 'ㅇ' && next.medial === 'ㅗ') {
    return {
      apply: true,
      current: { ...current, final: '' },
      next: { ...next, medial: 'ㅘ' },
      note: buildNote('contraction', {
        label: 'ㅂ+ㅗ → ㅘ',
        before: 'ㅂ + ㅗ',
        after: 'ㅘ',
      }),
    }
  }
  return null
}

function applyHWeakening(current, next) {
  if (!current || !next) return null
  if (current.final === 'ㅎ' && (!next.initial || next.initial === 'ㅇ')) {
    return {
      apply: true,
      current: { ...current, final: '' },
      next: { ...next, initial: next.initial || 'ㅇ' },
      note: buildNote('hWeakening', {
        before: 'ㅎ',
        after: 'Ø',
        targets: ['current'],
      }),
    }
  }
  const prevFinal = current.final ?? ''
  if (next.initial === 'ㅎ' && H_WEAKENING_CONTEXT.has(prevFinal)) {
    return {
      apply: true,
      current: { ...current },
      next: { ...next, initial: 'ㅇ' },
      note: buildNote('hWeakening', {
        label: 'ㅎ弱化',
        before: 'ㅎ',
        after: 'Ø',
        targets: ['next'],
      }),
    }
  }
  return null
}

function applyNInsertion(current, next) {
  if (!current || !next) return null
  if (next.initial !== 'ㅇ') return null
  if (!N_INSERTION_VOWELS.has(next.medial)) return null
  const prevFinal = current.final ?? ''
  const finalTrigger = prevFinal && N_INSERTION_FINALS.has(prevFinal)
  const medialTrigger = !prevFinal && N_INSERTION_VOWELS.has(current.medial ?? '')
  if (!finalTrigger && !medialTrigger) return null
  return {
    apply: true,
    current: { ...current },
    next: { ...next, initial: 'ㄴ' },
    note: buildNote('nInsertion', {
      before: 'Ø',
      after: 'ㄴ',
      targets: ['next'],
    }),
  }
}

function applyTHFusion(current, next) {
  if (!current?.final || next?.initial !== 'ㅎ') return null
  const fused = TH_FUSION_MAP[current.final]
  if (!fused) return null
  return {
    apply: true,
    current: { ...current, final: '' },
    next: { ...next, initial: fused },
    note: buildNote('aspiration', {
      label: '收音+ㅎ送气',
      before: `${current.final}+ㅎ`,
      after: fused,
    }),
  }
}

function applyGlide(current, next) {
  if (!current || !next) return null
  if (!current.final && ['ㅘ', 'ㅙ', 'ㅚ', 'ㅟ', 'ㅞ'].includes(next.medial)) {
    return {
      apply: true,
      current: { ...current },
      next: { ...next },
      note: buildNote('glide', {
        before: 'w + 元音',
        after: '滑音融合',
        targets: ['next'],
      }),
    }
  }
  return null
}

const RULE_PIPELINE = [
  applyContraction,
  applyNInsertion,
  applyTHFusion,
  applyLiaison,
  applyAssimilation,
  applyHWeakening,
  applyTensification,
  applyAspiration,
  applyPalatalization,
  applyGlide,
]

function resolveRules(current, next) {
  const state = { current: cloneJamo(current), next: cloneJamo(next), notes: [] }
  RULE_PIPELINE.forEach((fn) => {
    const outcome = fn(state.current, state.next)
    if (outcome?.apply) {
      state.current = outcome.current
      state.next = outcome.next
      state.notes.push(outcome.note)
    }
  })
  return state
}

function distributeNotes(notes = []) {
  const currentNotes = []
  const nextNotes = []
  notes.forEach((note) => {
    const targets = note.targets ?? ['current']
    if (targets.includes('current')) currentNotes.push(note)
    if (targets.includes('next')) nextNotes.push(note)
  })
  return { currentNotes, nextNotes }
}

function describeSegment(char, index, baseJamo, finalJamo, notes) {
  const base = baseRomanizeTriple(baseJamo)
  return {
    type: 'syllable',
    index,
    char,
    baseJamo,
    finalJamo,
    baseRoman: base.text,
    finalRoman: composeRomanization(finalJamo),
    notes: [...base.notes, ...notes],
  }
}

export function romanizeSentence(sentence) {
  const tokens = tokenizeSentence(sentence)
  const segments = []
  let finalRomanization = ''
  const ruleStats = {}

  tokens.forEach((token, tokenIdx) => {
    if (token.type !== 'hangul') {
      segments.push({ type: 'other', text: token.text })
      finalRomanization += token.text
      return
    }

    const syllables = analyzeSyllableBlock(token.text)
    for (let i = 0; i < syllables.length; i++) {
      const unit = syllables[i]
      if (!unit.baseJamo) {
        segments.push({ type: 'other', text: unit.char })
        finalRomanization += unit.char
        continue
      }

      const baseJamo = cloneJamo(unit.baseJamo)
      let updated = cloneJamo(unit.workJamo)
      let notes = unit.pendingNotes ? [...unit.pendingNotes] : []
      const nextUnit = syllables[i + 1]
      const nextWorkJamo = nextUnit?.workJamo ? cloneJamo(nextUnit.workJamo) : null

      if (nextWorkJamo) {
        const resolution = resolveRules(updated, nextWorkJamo)
        updated = resolution.current
        syllables[i + 1].workJamo = resolution.next
        const { currentNotes, nextNotes } = distributeNotes(resolution.notes)
        notes = [...notes, ...currentNotes]
        if (nextNotes.length) {
          syllables[i + 1].pendingNotes = [
            ...(syllables[i + 1].pendingNotes ?? []),
            ...nextNotes,
          ]
        }
      }

      unit.workJamo = updated
      const segment = describeSegment(
        unit.char,
        `${tokenIdx}-${i}`,
        baseJamo,
        updated,
        notes,
      )
      segments.push(segment)
      finalRomanization += segment.finalRoman
      segment.notes.forEach((note) => {
        if (note.rule === 'base') return
        ruleStats[note.rule] = (ruleStats[note.rule] ?? 0) + 1
      })
    }
  })

  return { segments, finalRomanization, ruleStats }
}
const TH_FUSION_MAP = {
  'ㄷ': 'ㅌ',
  'ㅅ': 'ㅌ',
  'ㅆ': 'ㅌ',
  'ㅈ': 'ㅊ',
  'ㅊ': 'ㅊ',
  'ㅌ': 'ㅌ',
}
