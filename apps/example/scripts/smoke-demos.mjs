/**
 * Lightweight CI smoke for example host demos (no Metro/Jest RN runner required).
 * Ensures both host patterns stay wired into App and stay host-safe.
 */
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8')
/** Strip block/line comments so docs mentioning virtualized={true} don't fail checks. */
const stripComments = (src) =>
  src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1')

const app = read('App.tsx')
const section = read('demos/SectionListHostDemo.tsx')
const scroll = read('demos/ScrollViewHostDemo.tsx')
const data = read('demos/shared/data.ts')
const theme = read('demos/shared/theme.ts')
const ui = read('demos/shared/ui.tsx')

assert.match(app, /SectionListHostDemo/, 'App imports SectionList host demo')
assert.match(app, /ScrollViewHostDemo/, 'App imports ScrollView host demo')
assert.match(app, /host === 'sectionList'/, 'App switches SectionList host')
assert.match(app, /host === 'scrollView'/, 'App switches ScrollView host')

assert.match(section, /SectionList/, 'SectionList demo uses SectionList')
assert.match(
  section,
  /export default function SectionListHostDemo/,
  'SectionList demo default export',
)
assert.match(scroll, /ScrollView/, 'ScrollView demo uses ScrollView')
assert.match(scroll, /export default function ScrollViewHostDemo/, 'ScrollView demo default export')

for (const [name, src] of [
  ['SectionListHostDemo', section],
  ['ScrollViewHostDemo', scroll],
]) {
  const code = stripComments(src)
  assert.doesNotMatch(
    code,
    /virtualized=\{true\}/,
    `${name} must not force virtualized FlatList under hosts`,
  )
  assert.match(code, /<SelectBox[\s\S]*?\/>/, `${name} renders SelectBox`)
}

assert.match(data, /export const COUNTRIES/, 'shared option catalogs present')
assert.match(theme, /export const theme/, 'shared theme present')
assert.match(ui, /export function DemoCard/, 'shared DemoCard present')

console.log('[@rn-multi-selectbox/example] smoke-demos: OK (App hosts + shared demos)')
