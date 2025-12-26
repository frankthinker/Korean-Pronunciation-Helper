export const RULE_COLORS = {
  liaison: '#ff8a65',
  assimilation: '#9575cd',
  tensification: '#ffb74d',
  aspiration: '#4fc3f7',
  palatalization: '#f06292',
  neutralization: '#aed581',
  contraction: '#ba68c8',
  glide: '#4db6ac',
  hWeakening: '#80cbc4',
  nInsertion: '#f48fb1',
  default: '#90a4ae'
}

export const RULE_REFERENCES = {
  liaison: {
    label: '连音 (연음)',
    anchor: '#连音和音变',
  },
  assimilation: {
    label: '同化 (비음/유음화 등)',
    anchor: '#协同同化',
  },
  tensification: {
    label: '紧音化 (경음화)',
    anchor: '#紧音化',
  },
  aspiration: {
    label: '送气化 (격음화)',
    anchor: '#送气化',
  },
  palatalization: {
    label: '腭化 (구개음화)',
    anchor: '#腭化',
  },
  neutralization: {
    label: '收音中和 (음절말 자음화)',
    anchor: '#收音规则',
  },
  contraction: {
    label: '缩约 (축약)',
    anchor: '#缩约规则',
  },
  glide: {
    label: '滑音 (반모음화)',
    anchor: '#半元音',
  },
  hWeakening: {
    label: 'ㅎ弱化/消失',
    anchor: '#ㅎ的弱化',
  },
  nInsertion: {
    label: 'ㄴ添加 (ㄴ첨가)',
    anchor: '#ㄴ插音',
  },
  base: {
    label: '原始读音',
    anchor: '#总体规则'
  }
}

export const RULE_PRIORITY = [
  'contraction',
  'liaison',
  'assimilation',
  'hWeakening',
  'nInsertion',
  'tensification',
  'aspiration',
  'palatalization',
  'glide',
  'neutralization',
  'base'
]

export const RULE_DESCRIPTIONS = {
  liaison: '终声+次音的联读，批注释放尾音进入下个音节。',
  assimilation: '鼻音/流音/摩擦音同化，根据下一个音节调整。',
  tensification: '受特定辅音影响发生紧音化。',
  aspiration: 'ㅎ或送气音激发送气化。',
  palatalization: 'ㅅ/ㅆ/ㅈ/ㅊ在i音前腭化为ㅆ/ㅉ/ㅈ/ㅊ等。',
  neutralization: '收音拾取标准化尾音。',
  contraction: '合并双元音或变成缩约形式。',
  glide: '滑音介入缓冲两个相邻元音。',
  hWeakening: 'ㅎ夹在元音或流音间会弱化直至消失。',
  nInsertion: '特定韵尾遇以ㅇ起首的i系元音时插入ㄴ音。',
  base: '原始音节未经音变的参考罗马音。'
}
