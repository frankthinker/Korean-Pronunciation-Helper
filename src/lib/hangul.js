const S_BASE = 0xac00
const V_COUNT = 21
const T_COUNT = 28
const N_COUNT = V_COUNT * T_COUNT

export const CHOSEONG = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
]

export const JUNGSEONG = [
  'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ',
  'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
]

export const JONGSEONG = [
  '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ',
  'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
]

export const BASE_INITIAL_ROM = {
  'ㄱ': 'g',
  'ㄲ': 'kk',
  'ㄴ': 'n',
  'ㄷ': 'd',
  'ㄸ': 'tt',
  'ㄹ': 'r',
  'ㅁ': 'm',
  'ㅂ': 'b',
  'ㅃ': 'pp',
  'ㅅ': 's',
  'ㅆ': 'ss',
  'ㅇ': '',
  'ㅈ': 'j',
  'ㅉ': 'jj',
  'ㅊ': 'ch',
  'ㅋ': 'k',
  'ㅌ': 't',
  'ㅍ': 'p',
  'ㅎ': 'h'
}

export const BASE_MEDIAL_ROM = {
  'ㅏ': 'a',
  'ㅐ': 'ae',
  'ㅑ': 'ya',
  'ㅒ': 'yae',
  'ㅓ': 'eo',
  'ㅔ': 'e',
  'ㅕ': 'yeo',
  'ㅖ': 'ye',
  'ㅗ': 'o',
  'ㅘ': 'wa',
  'ㅙ': 'wae',
  'ㅚ': 'oe',
  'ㅛ': 'yo',
  'ㅜ': 'u',
  'ㅝ': 'wo',
  'ㅞ': 'we',
  'ㅟ': 'wi',
  'ㅠ': 'yu',
  'ㅡ': 'eu',
  'ㅢ': 'ui',
  'ㅣ': 'i'
}

export const BASE_FINAL_ROM = {
  '': '',
  'ㄱ': 'k',
  'ㄲ': 'k',
  'ㄳ': 'k',
  'ㄴ': 'n',
  'ㄵ': 'n',
  'ㄶ': 'n',
  'ㄷ': 't',
  'ㄹ': 'l',
  'ㄺ': 'k',
  'ㄻ': 'm',
  'ㄼ': 'p',
  'ㄽ': 'l',
  'ㄾ': 'l',
  'ㄿ': 'p',
  'ㅀ': 'l',
  'ㅁ': 'm',
  'ㅂ': 'p',
  'ㅄ': 'p',
  'ㅅ': 't',
  'ㅆ': 't',
  'ㅇ': 'ng',
  'ㅈ': 't',
  'ㅊ': 't',
  'ㅋ': 'k',
  'ㅌ': 't',
  'ㅍ': 'p',
  'ㅎ': 't'
}

export const FINAL_TO_INITIAL = {
  '': '',
  'ㄱ': 'ㄱ',
  'ㄲ': 'ㄲ',
  'ㄳ': 'ㅅ',
  'ㄴ': 'ㄴ',
  'ㄵ': 'ㅈ',
  'ㄶ': 'ㅎ',
  'ㄷ': 'ㄷ',
  'ㄹ': 'ㄹ',
  'ㄺ': 'ㄱ',
  'ㄻ': 'ㅁ',
  'ㄼ': 'ㅂ',
  'ㄽ': 'ㅅ',
  'ㄾ': 'ㅌ',
  'ㄿ': 'ㅍ',
  'ㅀ': 'ㅎ',
  'ㅁ': 'ㅁ',
  'ㅂ': 'ㅂ',
  'ㅄ': 'ㅅ',
  'ㅅ': 'ㅅ',
  'ㅆ': 'ㅆ',
  'ㅇ': 'ㅇ',
  'ㅈ': 'ㅈ',
  'ㅊ': 'ㅊ',
  'ㅋ': 'ㅋ',
  'ㅌ': 'ㅌ',
  'ㅍ': 'ㅍ',
  'ㅎ': 'ㅎ'
}

export const BATCHIM_DECOMPOSITION = {
  'ㄳ': ['ㄱ', 'ㅅ'],
  'ㄵ': ['ㄴ', 'ㅈ'],
  'ㄶ': ['ㄴ', 'ㅎ'],
  'ㄺ': ['ㄹ', 'ㄱ'],
  'ㄻ': ['ㄹ', 'ㅁ'],
  'ㄼ': ['ㄹ', 'ㅂ'],
  'ㄽ': ['ㄹ', 'ㅅ'],
  'ㄾ': ['ㄹ', 'ㅌ'],
  'ㄿ': ['ㄹ', 'ㅍ'],
  'ㅀ': ['ㄹ', 'ㅎ'],
  'ㅄ': ['ㅂ', 'ㅅ']
}

export const TENSE_MAP = {
  'ㄱ': 'ㄲ',
  'ㄷ': 'ㄸ',
  'ㅂ': 'ㅃ',
  'ㅅ': 'ㅆ',
  'ㅈ': 'ㅉ'
}

export const ASPIRATED_MAP = {
  'ㄱ': 'ㅋ',
  'ㄷ': 'ㅌ',
  'ㅂ': 'ㅍ',
  'ㅈ': 'ㅊ'
}

export const PALATAL_TRIGGERS = new Set(['ㅣ', 'ㅑ', 'ㅕ', 'ㅛ', 'ㅠ'])

export const BREAK_CHARS = new Set([' ', '\\n', '\\t'])

export function isHangul(char) {
  if (!char) return false
  const code = char.charCodeAt(0)
  return code >= 0xac00 && code <= 0xd7a3
}

export function decompose(char) {
  const code = char.charCodeAt(0)
  if (!isHangul(char)) return null
  const sIndex = code - S_BASE
  const choIndex = Math.floor(sIndex / N_COUNT)
  const jungIndex = Math.floor((sIndex % N_COUNT) / T_COUNT)
  const jongIndex = sIndex % T_COUNT
  return {
    initial: CHOSEONG[choIndex],
    medial: JUNGSEONG[jungIndex],
    final: JONGSEONG[jongIndex]
  }
}

export function romanizeInitial(jamo) {
  return BASE_INITIAL_ROM[jamo] ?? ''
}

export function romanizeMedial(jamo) {
  return BASE_MEDIAL_ROM[jamo] ?? ''
}

export function romanizeFinal(jamo) {
  return BASE_FINAL_ROM[jamo] ?? ''
}

export function composeRomanization(jamoTriple) {
  if (!jamoTriple) return ''
  const { initial, medial, final } = jamoTriple
  return [romanizeInitial(initial), romanizeMedial(medial), romanizeFinal(final)].join('')
}

export function cloneJamo(triple) {
  if (!triple) return null
  return { initial: triple.initial, medial: triple.medial, final: triple.final }
}

export function splitBatchim(finalJamo) {
  const parts = BATCHIM_DECOMPOSITION[finalJamo]
  if (!parts) return { base: finalJamo, release: '' }
  return { base: parts[0], release: parts[1] }
}
