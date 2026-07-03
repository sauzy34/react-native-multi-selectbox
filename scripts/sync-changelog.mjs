#!/usr/bin/env node
/**
 * Keep the npm package CHANGELOG in sync with the monorepo root.
 *
 * Source of truth:  CHANGELOG.md (repo root)
 * Mirror (for npm): packages/multi-selectbox/CHANGELOG.md
 *
 * Used by `pnpm publish:lib` before npm publish. You can also run:
 *   node scripts/sync-changelog.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const source = path.join(root, 'CHANGELOG.md')
const target = path.join(root, 'packages/multi-selectbox/CHANGELOG.md')

if (!fs.existsSync(source)) {
  console.error(`Missing source changelog: ${source}`)
  process.exit(1)
}

const body = fs.readFileSync(source, 'utf8')
const prev = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : null

if (prev === body) {
  console.log('CHANGELOG already in sync (root → packages/multi-selectbox).')
  process.exit(0)
}

fs.mkdirSync(path.dirname(target), { recursive: true })
fs.writeFileSync(target, body)
console.log('Synced CHANGELOG.md → packages/multi-selectbox/CHANGELOG.md')
