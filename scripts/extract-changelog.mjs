#!/usr/bin/env node
/**
 * Print the CHANGELOG.md body for a given semver (with or without leading "v").
 * Usage: node scripts/extract-changelog.mjs 2.0.3
 *        node scripts/extract-changelog.mjs v2.0.3
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const versionArg = process.argv[2]

if (!versionArg) {
  console.error('Usage: node scripts/extract-changelog.mjs <version>')
  process.exit(1)
}

const version = versionArg.replace(/^v/i, '')
const candidates = [
  path.join(root, 'CHANGELOG.md'),
  path.join(root, 'packages/multi-selectbox/CHANGELOG.md'),
]

const changelogPath = candidates.find((p) => fs.existsSync(p))
if (!changelogPath) {
  console.log(`## ${version}\n\nPublished \`react-native-multi-selectbox@${version}\`.\n`)
  process.exit(0)
}

const text = fs.readFileSync(changelogPath, 'utf8')
const escaped = version.replace(/\./g, '\\.')
// Keep a Changelog: ## [2.0.3] - 2026-06-30
const sectionRe = new RegExp(`## \\[${escaped}\\][^\\n]*\\n([\\s\\S]*?)(?=\\n## \\[|\\n\\[\\d|$)`)
const match = text.match(sectionRe)

if (!match) {
  console.log(
    `## ${version}\n\nPublished \`react-native-multi-selectbox@${version}\`.\n\nSee [CHANGELOG.md](https://github.com/sauzy34/react-native-multi-selectbox/blob/master/CHANGELOG.md) for details.\n`,
  )
  process.exit(0)
}

const body = match[1].trim()
const install = `### Install

\`\`\`bash
npm install react-native-multi-selectbox@${version}
\`\`\`
`

const hasInstall = /npm install react-native-multi-selectbox@/.test(body)
console.log(hasInstall ? `${body}\n` : `${body}\n\n${install}\n`)
