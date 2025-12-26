const PARTICLE_FORMS = new Set([
  '은',
  '는',
  '이',
  '가',
  '을',
  '를',
  '과',
  '와',
  '으로',
  '로',
  '에서',
  '에게',
  '께서',
  '까지',
  '부터',
  '만',
  '도',
  '이나',
  '나',
  '이라도',
  '라도',
  '조차',
  '뿐',
  '마저',
  '처럼',
  '처럼은',
  '처럼도',
])

const PARTICLE_SUFFIXES = Array.from(PARTICLE_FORMS).sort((a, b) => b.length - a.length)

const DEPENDENT_NOUNS = new Set([
  '것',
  '점',
  '분',
  '사람',
  '시간',
  '동안',
  '이상',
  '이후',
  '이전',
  '직후',
  '직전',
  '만큼',
  '만치',
  '뿐',
  '밖',
  '밖에',
  '바람',
  '차례',
  '차',
  '쯤',
  '정도',
  '결과',
  '덕분',
  '탓',
  '김',
  '김에',
  '대로',
  '데',
  '때',
  '때문',
  '측',
  '편',
  '쪽',
  '줄',
  '자리',
  '거리',
  '중',
  '사정',
  '사이',
  '와중',
  '양',
  '듯',
  '판',
])

const COUNTERS = new Set([
  '번',
  '회',
  '명',
  '분',
  '살',
  '마리',
  '마디',
  '개',
  '권',
  '장',
  '잔',
  '병',
  '대',
  '통',
  '가지',
  '줄',
  '송이',
  '시',
  '차',
  '켤레',
  '채',
  '필',
  '발',
  '척',
  '쪽',
  '단',
  '벌',
  '포기',
  '근',
  '모금',
  '모',
  '리터',
  '그램',
  '킬로',
  '팩',
  '상자',
  '세트',
  '모음',
  '입',
  '입자',
])

const COUNTER_SUFFIXES = ['살', '시', '개월', '주', '년', '차', '도', '층']

const COPULA_FORMS = new Set([
  '이다',
  '이에요',
  '이에',
  '이야',
  '이여',
  '이요',
  '이에요',
  '이였습니다',
  '이었어요',
  '이었다',
  '입니다',
  '이라서',
  '이라도',
  '이라면',
  '이라니',
  '이라며',
  '이지만',
  '이니까',
  '이니',
  '이네요',
  '이냐',
  '이냐고',
  '이라구',
  '이라고',
  '이라고요',
  '이라네',
  '이래요',
  '이랍니다',
])

const COPULA_REGEX = /^이(?:었|였|라|니|야|여|요|라[고니며]?|니까|니라|랍니다|래요|러니|라도|라면|라서|자|구|던)/

const LEXICAL_TENSE_PREFERRED = new Set([
  '사람',
  '정도',
  '시간',
  '조건',
  '성과',
  '성격',
  '사건',
  '관건',
  '효과',
  '교과',
  '상태',
  '결론',
  '결정',
  '감정',
  '분위기',
  '변화',
  '위기',
  '경험',
  '계획',
])

const EMPTY_META = () => ({
  role: 'content',
  tags: new Set(),
  blockNInsertion: false,
  prefersTense: false,
})

const HANGUL_ONLY = /[가-힣]/

function normalizeWord(word = '') {
  return word.replace(/[^가-힣]/g, '')
}

function matchWithParticleSuffix(word) {
  for (const suffix of PARTICLE_SUFFIXES) {
    if (word.endsWith(suffix) && word.length > suffix.length) {
      return {
        stem: word.slice(0, word.length - suffix.length),
        suffix,
      }
    }
  }
  return null
}

export function classifyWord(rawWord) {
  if (!rawWord || !HANGUL_ONLY.test(rawWord)) {
    return EMPTY_META()
  }
  const normalized = normalizeWord(rawWord)
  const meta = EMPTY_META()

  if (!normalized) return meta

  if (COPULA_FORMS.has(normalized) || COPULA_REGEX.test(normalized)) {
    meta.role = 'copula'
    meta.tags.add('copula')
    meta.blockNInsertion = true
    return meta
  }

  if (PARTICLE_FORMS.has(normalized)) {
    meta.role = 'particle'
    meta.tags.add('particle')
    return meta
  }

  const suffixMatch = matchWithParticleSuffix(normalized)
  const baseCandidates = new Set()
  baseCandidates.add(normalized)
  if (suffixMatch) {
    baseCandidates.add(suffixMatch.stem)
  }

  for (const candidate of baseCandidates) {
    if (DEPENDENT_NOUNS.has(candidate)) {
      meta.role = 'dependentNoun'
      meta.tags.add('dependentNoun')
      meta.prefersTense = true
      return meta
    }
  }

  for (const candidate of baseCandidates) {
    if (COUNTERS.has(candidate) || COUNTER_SUFFIXES.some((suffix) => candidate.endsWith(suffix))) {
      meta.role = 'counter'
      meta.tags.add('counter')
      meta.prefersTense = true
      return meta
    }
  }

  if (LEXICAL_TENSE_PREFERRED.has(normalized)) {
    meta.prefersTense = true
  }

  return meta
}
