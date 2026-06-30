# react-native-multi-selectbox

[![npm version](https://img.shields.io/npm/v/react-native-multi-selectbox.svg?style=flat-square)](https://www.npmjs.com/package/react-native-multi-selectbox)
[![npm downloads](https://img.shields.io/npm/dm/react-native-multi-selectbox.svg?style=flat-square)](https://www.npmjs.com/package/react-native-multi-selectbox)
[![license](https://img.shields.io/npm/l/react-native-multi-selectbox.svg?style=flat-square)](./LICENSE)
[![CI](https://img.shields.io/github/actions/workflow/status/sauzy34/react-native-multi-selectbox/ci.yml?branch=master&style=flat-square&label=CI)](https://github.com/sauzy34/react-native-multi-selectbox/actions/workflows/ci.yml)

Cross-platform **select** / **multi-select** / **picker** for **React Native** and **Expo** (iOS, Android, web). Shared UI and a TypeScript-first API.

### Live demo

**Try the interactive Expo web demos (SectionList + ScrollView hosts):**

### [sauzy34.github.io/react-native-multi-selectbox](https://sauzy34.github.io/react-native-multi-selectbox/)

Source for the demo app: [`apps/example`](./apps/example) · host patterns: [`SectionListHostDemo.tsx`](./apps/example/demos/SectionListHostDemo.tsx) · [`ScrollViewHostDemo.tsx`](./apps/example/demos/ScrollViewHostDemo.tsx)

---

## Table of contents

- [Features](#features)
- [Install](#install)
- [Quick start](#quick-start)
- [Examples](#examples)
  - [Single select](#single-select)
  - [Multi select](#multi-select)
  - [Hide search / filter](#hide-search--filter)
  - [Styling & colors](#styling--colors)
  - [Large option lists](#large-option-lists)
- [Scrolling hosts](#scrolling-hosts)
- [Props](#props)
- [Types](#types)
- [Monorepo & development](#monorepo--development)
- [References](#references)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Single- and multi-select with a consistent look on **iOS**, **Android**, and **web** (Expo / RNW)
- **TypeScript** types with a **discriminated union** on `isMulti`
- Searchable options (`hideInputFilter` to turn search off)
- Multi-select **chips** with remove / toggle affordances
- **Host-safe by default:** `virtualized={false}` uses a bounded options `ScrollView` (avoids nested VirtualizedList warnings under forms)
- Opt-in **`virtualized`** `FlatList` for very large option lists when there is no vertical scroll parent
- Peers: **`react`** and **`react-native`** — icons use built-in text glyphs

> **2.0** is the current release line (`packages/multi-selectbox`). See [CHANGELOG.md](./CHANGELOG.md) for 1.x → 2.0 notes and [docs/MIGRATION.md](./docs/MIGRATION.md) for the monorepo layout.

---

## Install

```bash
npm install react-native-multi-selectbox
# or
yarn add react-native-multi-selectbox
# or
pnpm add react-native-multi-selectbox
```

### Peer dependencies

| Peer           | Version                           |
| -------------- | --------------------------------- |
| `react`        | ≥ 18                              |
| `react-native` | ≥ 0.73 (Expo SDK 50+ recommended) |

No extra native modules. Works with Expo managed workflow and bare RN.

---

## Quick start

Options **must** include `id` and `item` (string label).

```tsx
import { useState } from 'react'
import { View } from 'react-native'
import SelectBox, { type SelectOption } from 'react-native-multi-selectbox'

const COUNTRIES: SelectOption[] = [
  { id: 'us', item: 'United States' },
  { id: 'ca', item: 'Canada' },
  { id: 'gb', item: 'United Kingdom' },
  { id: 'in', item: 'India' },
]

export function ProfileForm() {
  const [country, setCountry] = useState<SelectOption | Record<string, never>>({})

  return (
    <View style={{ padding: 16 }}>
      <SelectBox
        label="Country"
        inputPlaceholder="Search countries…"
        options={COUNTRIES}
        value={country}
        onChange={setCountry}
      />
    </View>
  )
}
```

Open the [live demo](https://sauzy34.github.io/react-native-multi-selectbox/) for more patterns (timezone, skills chips, tags, etc.).

---

## Examples

### Single select

Controlled value via `value` + `onChange`. Empty `{}` / missing `item` means “nothing selected” (1.x-compatible).

```tsx
import { useState } from 'react'
import SelectBox, { type SelectOption } from 'react-native-multi-selectbox'

const TIMEZONES: SelectOption[] = [
  { id: 'utc', item: 'UTC' },
  { id: 'pt', item: 'Pacific Time (PT)' },
  { id: 'et', item: 'Eastern Time (ET)' },
]

export function TimezoneField() {
  const [timezone, setTimezone] = useState<SelectOption>({ id: 'utc', item: 'UTC' })

  return (
    <SelectBox
      label="Timezone"
      inputPlaceholder="Find a timezone…"
      options={TIMEZONES}
      value={timezone}
      onChange={setTimezone}
    />
  )
}
```

### Multi select

Use `isMulti`, `selectedValues`, `onMultiSelect`, and `onTapClose` (chip remove). Parent owns the list — for example with a small toggle-by-id helper:

```tsx
import { useState } from 'react'
import SelectBox, { type SelectOption } from 'react-native-multi-selectbox'

const SKILLS: SelectOption[] = [
  { id: 'ts', item: 'TypeScript' },
  { id: 'rn', item: 'React Native' },
  { id: 'react', item: 'React' },
]

function toggleById(list: SelectOption[], item: SelectOption): SelectOption[] {
  return list.some((x) => x.id === item.id) ? list.filter((x) => x.id !== item.id) : [...list, item]
}

export function SkillsField() {
  const [skills, setSkills] = useState<SelectOption[]>([{ id: 'ts', item: 'TypeScript' }])

  return (
    <SelectBox
      label="Skills"
      inputPlaceholder="Add skills…"
      options={SKILLS}
      selectedValues={skills}
      onMultiSelect={(item) => setSkills((prev) => toggleById(prev, item))}
      onTapClose={(item) => setSkills((prev) => toggleById(prev, item))}
      isMulti
    />
  )
}
```

Reference implementation: multi cards in [`apps/example/demos/ScrollViewHostDemo.tsx`](./apps/example/demos/ScrollViewHostDemo.tsx).

### Hide search / filter

For short lists, hide the filter input:

```tsx
<SelectBox
  label="Department"
  options={DEPARTMENTS}
  value={department}
  onChange={setDepartment}
  hideInputFilter
/>
```

### Styling & colors

```tsx
<SelectBox
  label="Channels"
  options={CHANNELS}
  selectedValues={channels}
  onMultiSelect={...}
  onTapClose={...}
  isMulti
  arrowIconColor="#4F46E5"
  searchIconColor="#4F46E5"
  toggleIconColor="#4F46E5"
  selectedItemStyle={{ fontSize: 16, fontWeight: '500' }}
  optionsLabelStyle={{ fontSize: 15 }}
  multiOptionContainerStyle={{ backgroundColor: '#4F46E5', borderRadius: 999 }}
  multiOptionsLabelStyle={{ color: '#fff', fontWeight: '600' }}
  containerStyle={{ borderBottomColor: '#E5E7EB' }}
  inputFilterStyle={{ color: '#111827' }}
/>
```

Full style prop names are in [Props](#props) and [`packages/multi-selectbox/src/types.ts`](./packages/multi-selectbox/src/types.ts).

### Large option lists

Default options rendering is a **ScrollView** (`virtualized={false}`) — safest inside forms. For **large** catalogs **without** an outer vertical scroll parent, opt into a windowed list:

```tsx
<SelectBox
  label="City"
  options={MANY_CITIES}
  value={city}
  onChange={setCity}
  virtualized // FlatList + max height + nestedScrollEnabled
  listOptionProps={{ initialNumToRender: 12 }}
/>
```

---

## Scrolling hosts

React Native warns when a vertical **VirtualizedList** (`FlatList` / `SectionList`) is nested inside a vertical **`ScrollView`** (or another VirtualizedList).

| Host screen                           | Recommended `virtualized`    |
| ------------------------------------- | ---------------------------- |
| `FlatList` / `SectionList` row        | `false` (**default**)        |
| Vertical `ScrollView` form            | `false` (**default**)        |
| Fixed / modal **without** list scroll | `true` (opt-in, large lists) |

Copy-paste hosts in the example app:

| Pattern         | File                                                                                         | When to use              |
| --------------- | -------------------------------------------------------------------------------------------- | ------------------------ |
| **SectionList** | [`apps/example/demos/SectionListHostDemo.tsx`](./apps/example/demos/SectionListHostDemo.tsx) | Long screens (preferred) |
| **ScrollView**  | [`apps/example/demos/ScrollViewHostDemo.tsx`](./apps/example/demos/ScrollViewHostDemo.tsx)   | Simple / short forms     |

Tabs live in [`apps/example/App.tsx`](./apps/example/App.tsx). Deeper write-up: [packages/multi-selectbox/README.md — Hosting](./packages/multi-selectbox/README.md#hosting-selectbox-in-scrolling-screens).

---

## Props

Overview of the public surface. See **[`types.ts`](./packages/multi-selectbox/src/types.ts)** for the authoritative TypeScript definitions.

| Prop                                                     | Description                                                                                                                                                                                                                                                 |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options`                                                | `SelectOption[]` — `{ id, item }[]` (non-arrays treated as `[]`)                                                                                                                                                                                            |
| `label`                                                  | Field label above the control                                                                                                                                                                                                                               |
| `inputPlaceholder`                                       | Placeholder for closed field / filter                                                                                                                                                                                                                       |
| `value` / `onChange`                                     | **Single** select (when `isMulti` is omitted or `false`)                                                                                                                                                                                                    |
| `selectedValues` / `onMultiSelect` / `onTapClose`        | **Multi** select (`isMulti: true`)                                                                                                                                                                                                                          |
| `isMulti`                                                | `true` enables multi mode (discriminated props)                                                                                                                                                                                                             |
| `hideInputFilter`                                        | Hide the search field in the open panel                                                                                                                                                                                                                     |
| `virtualized`                                            | `false` (default): options `ScrollView`; `true`: options `FlatList`                                                                                                                                                                                         |
| `listOptionProps`                                        | Extra props for options **FlatList** (`virtualized={true}`)                                                                                                                                                                                                 |
| `listScrollViewProps`                                    | Extra props for options **ScrollView** (default mode)                                                                                                                                                                                                       |
| `multiSelectInputFieldProps`                             | Extra props for the chips **horizontal ScrollView**                                                                                                                                                                                                         |
| `searchInputProps`                                       | Extra `TextInput` props for the filter                                                                                                                                                                                                                      |
| `listEmptyText`                                          | Empty-state copy in the options panel                                                                                                                                                                                                                       |
| `selectIcon`                                             | Custom chevron / icon node                                                                                                                                                                                                                                  |
| `arrowIconColor` / `searchIconColor` / `toggleIconColor` | Icon paint colors                                                                                                                                                                                                                                           |
| Style props                                              | `labelStyle`, `containerStyle`, `selectedItemStyle`, `optionsLabelStyle`, `optionContainerStyle`, `multiOptionContainerStyle`, `multiOptionsLabelStyle`, `multiListEmptyLabelStyle`, `listEmptyLabelStyle`, `inputFilterStyle`, `inputFilterContainerStyle` |
| `width`                                                  | Field width (`DimensionValue`, default `'100%'`)                                                                                                                                                                                                            |

Test IDs for automation: [`TEST_IDS`](./packages/multi-selectbox/src/testIDs.ts) (exported from the package).

---

## Types

```ts
import SelectBox, {
  type SelectOption,
  type SelectBoxProps,
  type SelectBoxSingleProps,
  type SelectBoxMultiProps,
  type OptionsListProps,
  type OptionsScrollViewProps,
  type MultiSelectFieldProps,
  TEST_IDS,
} from 'react-native-multi-selectbox'
```

`SelectBoxProps` is a **discriminated union** on `isMulti`:

- **Single:** `isMulti` omitted / `false` → `value?`, `onChange?`
- **Multi:** `isMulti: true` → `selectedValues?`, `onMultiSelect?`, `onTapClose?`

```ts
export type SelectOption = {
  id: string | number
  item: string
}
```

---

## Monorepo & development

```text
apps/example/              # Expo SDK 56 demo (web + native)
packages/multi-selectbox/  # Library (publishable package name)
docs/MIGRATION.md          # 2.0 migration plan & phase log
.github/workflows/ci.yml   # quality + GitHub Pages deploy
```

Requires **Node 20+** and **pnpm 10+**.

```bash
pnpm install
pnpm example              # Expo start (offline by default) — press i / a / w
pnpm example:web          # browser via react-native-web
pnpm example:export:web   # static export → apps/example/dist (Pages)
pnpm typecheck
pnpm test                 # Jest (library) + example smoke
pnpm lint
pnpm format
pnpm --filter react-native-multi-selectbox build   # emit dist/ for publish
```

| Script                       | Purpose                             |
| ---------------------------- | ----------------------------------- |
| `pnpm example`               | Start Expo example (offline)        |
| `pnpm example:web`           | Start Expo web demo                 |
| `pnpm example:export:web`    | Static `expo export --platform web` |
| `pnpm typecheck`             | `tsc` in all packages               |
| `pnpm test` / `pnpm test:ci` | Library Jest + example host smoke   |
| `pnpm lint` / `pnpm format`  | ESLint / Prettier                   |

CI deploys the web demo to **GitHub Pages** on push to `master` / `main` (see [`.github/workflows/ci.yml`](./.github/workflows/ci.yml)).

---

## References

| Resource              | Link                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Live web demo**     | [sauzy34.github.io/react-native-multi-selectbox](https://sauzy34.github.io/react-native-multi-selectbox/)    |
| npm package           | [npmjs.com/package/react-native-multi-selectbox](https://www.npmjs.com/package/react-native-multi-selectbox) |
| Library source        | [`packages/multi-selectbox`](./packages/multi-selectbox)                                                     |
| Public types          | [`packages/multi-selectbox/src/types.ts`](./packages/multi-selectbox/src/types.ts)                           |
| Package README        | [`packages/multi-selectbox/README.md`](./packages/multi-selectbox/README.md)                                 |
| Example app           | [`apps/example`](./apps/example) · [example README](./apps/example/README.md)                                |
| SectionList host demo | [`demos/SectionListHostDemo.tsx`](./apps/example/demos/SectionListHostDemo.tsx)                              |
| ScrollView host demo  | [`demos/ScrollViewHostDemo.tsx`](./apps/example/demos/ScrollViewHostDemo.tsx)                                |
| Migration / roadmap   | [`docs/MIGRATION.md`](./docs/MIGRATION.md)                                                                   |
| Issues                | [GitHub Issues](https://github.com/sauzy34/react-native-multi-selectbox/issues)                              |
| CI                    | [Actions — CI workflow](https://github.com/sauzy34/react-native-multi-selectbox/actions/workflows/ci.yml)    |
| License               | [MIT](./LICENSE)                                                                                             |

React Native guidance on nested lists: [VirtualizedList](https://reactnative.dev/docs/virtualizedlist) (do not nest vertical VirtualizedLists inside vertical ScrollViews of the same orientation without care — this library defaults to a non-virtualized options panel for that reason).

---

## Contributing

1. Use **pnpm** from the repo root.
2. Change the library under [`packages/multi-selectbox`](./packages/multi-selectbox); exercise with `pnpm example` / `pnpm example:web` and `pnpm test`.
3. Keep Prettier/ESLint clean (`pnpm format` / `pnpm lint`).
4. See [CHANGELOG.md](./CHANGELOG.md) and [docs/MIGRATION.md](./docs/MIGRATION.md) for release notes and layout.

PRs and issues welcome: [github.com/sauzy34/react-native-multi-selectbox](https://github.com/sauzy34/react-native-multi-selectbox).

---

## License

[MIT](./LICENSE) © [Saurav Gupta](https://github.com/sauzy34)
