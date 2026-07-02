#!/usr/bin/env node
/**
 * Publish react-native-multi-selectbox to npm, then push a v* git tag so the
 * "Release" GitHub Actions workflow can create/update the GitHub Release.
 *
 * Usage (from monorepo root):
 *   pnpm publish:lib
 *   pnpm publish:lib -- --otp=123456
 *   pnpm publish:lib -- --dry-run
 *   pnpm publish:lib -- --no-tag          # npm only, skip git tag / CI release
 *
 * Env:
 *   SKIP_GITHUB_RELEASE=1  same as --no-tag
 */
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pkgPath = path.join(root, 'packages/multi-selectbox/package.json')

const rawArgs = process.argv.slice(2)
const noTag = rawArgs.includes('--no-tag') || process.env.SKIP_GITHUB_RELEASE === '1'
const publishArgs = rawArgs.filter((a) => a !== '--no-tag')

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
const version = pkg.version
const tag = `v${version}`
const dryRun = publishArgs.some((a) => a === '--dry-run' || a.startsWith('--dry-run='))

function run(cmd, args, opts = {}) {
  const result = spawnSync(cmd, args, {
    cwd: root,
    stdio: 'inherit',
    shell: false,
    ...opts,
  })
  if (result.error) {
    throw result.error
  }
  return result.status ?? 1
}

function runCapture(cmd, args) {
  return spawnSync(cmd, args, {
    cwd: root,
    encoding: 'utf8',
    shell: false,
  })
}

console.log(`\n📦 Publishing react-native-multi-selectbox@${version}…\n`)

const publishStatus = run('pnpm', [
  '--filter',
  'react-native-multi-selectbox',
  'publish',
  '--access',
  'public',
  ...publishArgs,
])
if (publishStatus !== 0) {
  process.exit(publishStatus)
}

if (noTag || dryRun) {
  if (dryRun) {
    console.log('\nDry run: skipping git tag and GitHub Release workflow.')
  } else {
    console.log('\n--no-tag / SKIP_GITHUB_RELEASE: skipping git tag.')
  }
  process.exit(0)
}

const tagExists = runCapture('git', ['rev-parse', '-q', '--verify', `refs/tags/${tag}`])
if (tagExists.status === 0) {
  console.log(
    `\nTag ${tag} already exists locally; will push to update remote + re-run Release workflow.`,
  )
} else {
  console.log(`\n🏷  Creating annotated tag ${tag}…`)
  const tagStatus = run('git', ['tag', '-a', tag, '-m', `Release ${tag}`])
  if (tagStatus !== 0) {
    process.exit(tagStatus)
  }
}

console.log(`\n⬆  Pushing ${tag} to origin (triggers Release workflow)…`)
const pushStatus = run('git', ['push', 'origin', tag])
if (pushStatus !== 0) {
  console.error(`
Published to npm, but failed to push tag ${tag}.
Create the GitHub Release by pushing the tag:

  git push origin ${tag}
`)
  process.exit(pushStatus)
}

console.log(`
✅ npm publish complete and ${tag} pushed.
   GitHub Actions workflow "Release" will create or update:
   https://github.com/sauzy34/react-native-multi-selectbox/releases/tag/${tag}
`)
