import { romanizeSentence } from '../src/lib/romanizer.js'

const sentence = process.argv[2] ?? '꽃향기만 남기고 갔단다'
const result = romanizeSentence(sentence)
console.log(JSON.stringify(result, null, 2))
