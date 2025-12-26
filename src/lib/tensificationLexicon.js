export const FORCED_TENSIFICATION_PATTERNS = [
  // Category (b): Sino two-syllable samples
  { pattern: '절대', targets: [1], reason: 'ㄹ收音+ㄷ的汉字词' },
  { pattern: '달성', targets: [1], reason: 'ㄹ收音+ㅅ的汉字词' },
  { pattern: '발전', targets: [1], reason: 'ㄹ收音+ㅈ的汉字词' },

  // Category (c): Sino compounds where后音节无触发尾音
  { pattern: '인사과', targets: [2], reason: '合成词紧音化' },
  { pattern: '입장권', targets: [1], reason: '合成词紧音化' },
  { pattern: '대기권', targets: [2], reason: '合成词紧音化' },
  { pattern: '참정권', targets: [2], reason: '合成词紧音化' },
  { pattern: '당뇨병', targets: [2], reason: '合成词紧音化' },
  { pattern: '맥주병', targets: [2], reason: '合成词紧音化' },
  { pattern: '신뢰성', targets: [2], reason: '合成词紧音化' },
  { pattern: '로마자', targets: [2], reason: '合成词紧音化' },
  { pattern: '감사장', targets: [2], reason: '合成词紧音化' },
  { pattern: '문제점', targets: [2], reason: '合成词紧音化' },
  { pattern: '협심증', targets: [2], reason: '合成词紧音化' },

  // Additional汉字词或惯用读音
  { pattern: '성과', targets: [1], reason: '惯用汉字紧音化' },
  { pattern: '물가', targets: [1], reason: '惯用汉字紧音化' },
  { pattern: '사건', targets: [1], reason: '惯用汉字紧音化' },
  { pattern: '조건', targets: [1], reason: '惯用汉字紧音化' },
  { pattern: '인기', targets: [1], reason: '惯用汉字紧音化' },
  { pattern: '인건비', targets: [1], reason: '惯用汉字紧音化（第二音节）' },
  { pattern: '효과', targets: [1], reason: '规范上允许的紧音读音' },
  { pattern: '교과', targets: [1], reason: '规范上允许的紧音读音' },
  { pattern: '관건', targets: [1], reason: '规范上允许的紧音读音' },

  // Category (d): stems ending w/ ㄴ/ㅁ +特殊语尾
  { pattern: '넘겠다', targets: [1, 2], reason: 'ㄴ/ㅁ后接-겠다语尾' },
  { pattern: '젊지만', targets: [1], reason: 'ㄴ/ㅁ后接-지만语尾' },

  // Category (e): 连体形 -ㄹ + 名词 样例
  { pattern: '건널 다리', targets: [2], reason: '连体形-ㄹ后名词' },
  { pattern: '갈 사람', targets: [1], reason: '连体形-ㄹ后名词' },
  { pattern: '받을 자격', targets: [2], reason: '连体形-ㄹ后名词' },

  // Category (f): 固有词及组合
  { pattern: '여덟 번', targets: [2], reason: '固有数词连用' },
  { pattern: '열 장', targets: [1], reason: '固有数词连用' },
  { pattern: '열 여덟 개', targets: [3], reason: '固有数词连用' },
  { pattern: '스물여덟 살', targets: [4], reason: '固有数词连用' },
  { pattern: '술집', targets: [1], reason: '固有合成词' },
  { pattern: '잠자리', targets: [1], reason: '固有合成词' },
]
