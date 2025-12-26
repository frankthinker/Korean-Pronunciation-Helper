import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { romanizeSentence } from '../src/lib/romanizer.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const snapshotPath = path.join(__dirname, 'romanizer.snapshot.json')

function sortObject(obj = {}) {
  return Object.keys(obj)
    .sort()
    .reduce((acc, key) => {
      acc[key] = obj[key]
      return acc
    }, {})
}

function formatDiff(expected, actual) {
  return `Expected: ${JSON.stringify(expected)}\nActual:   ${JSON.stringify(actual)}`
}

function main() {
  if (!fs.existsSync(snapshotPath)) {
    console.error(`Snapshot file not found: ${snapshotPath}`)
    process.exit(1)
  }

  const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'))
  let hasFailure = false

  snapshot.forEach((entry, idx) => {
    const { sentence, finalRomanization, ruleStats } = entry
    const result = romanizeSentence(sentence)
    const romanDiffers = result.finalRomanization !== finalRomanization
    const expectedStats = sortObject(ruleStats)
    const actualStats = sortObject(result.ruleStats)
    const statsDiffer = JSON.stringify(expectedStats) !== JSON.stringify(actualStats)

    if (romanDiffers || statsDiffer) {
      hasFailure = true
      console.error(`\n[${idx + 1}] Regression detected for sentence: ${sentence}`)
      if (romanDiffers) {
        console.error('  Final romanization mismatch:')
        console.error(formatDiff(finalRomanization, result.finalRomanization))
      }
      if (statsDiffer) {
        console.error('  Rule stats mismatch:')
        console.error(formatDiff(expectedStats, actualStats))
      }
    }
  })

  if (hasFailure) {
    process.exit(1)
  }
  console.log(`All ${snapshot.length} romanizer snapshots match.`)
}

main()
