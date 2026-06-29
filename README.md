# react-native-multi-selectbox

[![npm version](https://badge.fury.io/js/react-native-multi-selectbox.svg)](https://badge.fury.io/js/react-native-multi-selectbox)
[![npm downloads](https://img.shields.io/npm/dm/react-native-multi-selectbox.svg?style=flat-square)](https://www.npmjs.com/package/react-native-multi-selectbox)

Platform-independent (Android / iOS / **Expo**) select box, multi-select, and picker with a shared UI.

![demo](https://raw.githubusercontent.com/sauzy34/react-native-multi-selectbox/master/demo.gif)

> **2.0 is developed in this monorepo** (`packages/multi-selectbox`, TypeScript).  
> **npm 1.5.x** remains the last published line until **2.0** ships (see [docs/MIGRATION.md](./docs/MIGRATION.md)).

## Monorepo layout

```text
apps/example/                 # Expo SDK 56 TypeScript demo
packages/multi-selectbox/     # Library source (publishable package name)
docs/MIGRATION.md             # Migration plan & phase log
```

## Develop (Expo demo)

Requires **Node 20+** and **pnpm 10+**.

```bash
pnpm install
pnpm example          # expo start --offline — then press i / a
pnpm example:web      # browser (react-native-web)
pnpm typecheck
pnpm test
pnpm lint
pnpm format           # Prettier write
```

Demo app: [`apps/example`](./apps/example) — depends on `"react-native-multi-selectbox": "workspace:*"`. Web needs `react-dom` / `react-native-web` (already in the example package).

**Hosted web demo (GitHub Pages):** [sauzy34.github.io/react-native-multi-selectbox](https://sauzy34.github.io/react-native-multi-selectbox/) — deployed by CI on push (`build-web-demo` / `deploy-pages`). Enable **Settings → Pages → Source: GitHub Actions** once if the site 404s.

## Install in your app (consumers)

```bash
npm install react-native-multi-selectbox
```

### Peer dependencies

| Peer           | Notes                             |
| -------------- | --------------------------------- |
| `react`        | ≥ 18                              |
| `react-native` | ≥ 0.73 (Expo SDK 50+ recommended) |

Icons use built-in text glyphs — **no** `lodash` or `react-native-svg`.

## Usage

Options **must** include `id` and `item`.

```tsx
import { useState } from 'react'
import { View } from 'react-native'
import SelectBox, { type SelectOption } from 'react-native-multi-selectbox'

const K_OPTIONS: SelectOption[] = [
  { item: 'Juventus', id: 'JUVE' },
  { item: 'Real Madrid', id: 'RM' },
  { item: 'Barcelona', id: 'BR' },
]

function toggleById(list: SelectOption[], item: SelectOption): SelectOption[] {
  return list.some((x) => x.id === item.id) ? list.filter((x) => x.id !== item.id) : [...list, item]
}

export function Demo() {
  const [selectedTeam, setSelectedTeam] = useState<SelectOption | Record<string, never>>({})
  const [selectedTeams, setSelectedTeams] = useState<SelectOption[]>([])

  return (
    <View style={{ margin: 30 }}>
      <SelectBox
        label="Select single"
        options={K_OPTIONS}
        value={selectedTeam}
        onChange={setSelectedTeam}
      />
      <SelectBox
        label="Select multiple"
        options={K_OPTIONS}
        selectedValues={selectedTeams}
        onMultiSelect={(item) => setSelectedTeams((prev) => toggleById(prev, item))}
        onTapClose={(item) => setSelectedTeams((prev) => toggleById(prev, item))}
        isMulti={true}
      />
    </View>
  )
}
```

### Types

```ts
import type {
  SelectOption,
  SelectBoxProps,
  SelectBoxSingleProps,
  SelectBoxMultiProps,
} from 'react-native-multi-selectbox'
```

`SelectBoxProps` is a **discriminated union** on `isMulti` (`true` → multi; omit/`false` → single).

### Props (overview)

| Prop                                              | Description                                                                                                                                     |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `options`                                         | `{ id, item }[]` (non-arrays treated as `[]`)                                                                                                   |
| `value` / `onChange`                              | Single-select controlled value                                                                                                                  |
| `selectedValues` / `onMultiSelect` / `onTapClose` | Multi-select                                                                                                                                    |
| `isMulti`                                         | `true` for multi mode                                                                                                                           |
| `hideInputFilter`                                 | Hide search field in the dropdown                                                                                                               |
| `virtualized`                                     | `true` (default): options `FlatList`; `false`: options ScrollView — use `false` inside `FlatList` / `SectionList` / vertical `ScrollView` hosts |
| `listOptionProps`                                 | Extra props for the options **FlatList** (when virtualized)                                                                                     |
| `multiSelectInputFieldProps`                      | Extra props for the chips **ScrollView**                                                                                                        |
| `inputFilterStyle` / `inputFilterContainerStyle`  | Filter field styles (`color` supported)                                                                                                         |
| `*Style` props                                    | Label, container, options, chips, empty states, selected text                                                                                   |
| Icon colors                                       | `arrowIconColor`, `searchIconColor`, `toggleIconColor`                                                                                          |
| `selectIcon`                                      | Custom dropdown icon node                                                                                                                       |
| `searchInputProps`                                | Extra `TextInput` props for the filter                                                                                                          |

See [`packages/multi-selectbox/src/types.ts`](./packages/multi-selectbox/src/types.ts) for the full TypeScript surface.

### Scrolling hosts (avoid nested VirtualizedList)

RN warns when a vertical `FlatList` / `SectionList` is nested inside a vertical `ScrollView` (or another VirtualizedList). SelectBox options default to a `FlatList` (`virtualized={true}`).

1. **Prefer `FlatList` / `SectionList` for long screens** — each field or card is a row ([`demos/SectionListHostDemo.tsx`](./apps/example/demos/SectionListHostDemo.tsx)).
2. **`ScrollView` is fine for simpler forms** — still set `virtualized={false}` on every SelectBox ([`demos/ScrollViewHostDemo.tsx`](./apps/example/demos/ScrollViewHostDemo.tsx)).
3. Use default **`virtualized={true}`** only when there is no other vertical scroll parent (short fixed layout / non-scrolling modal).

The Expo app (`apps/example/App.tsx`) tabs between both hosts. Details: [`packages/multi-selectbox/README.md`](./packages/multi-selectbox/README.md#hosting-selectbox-in-scrolling-screens).

## Scripts (root)

| Script                       | Purpose                      |
| ---------------------------- | ---------------------------- |
| `pnpm example`               | Start Expo example (offline) |
| `pnpm example:web`           | Start Expo web demo          |
| `pnpm example:export:web`    | Static `expo export -p web`  |
| `pnpm typecheck`             | `tsc` in all packages        |
| `pnpm test` / `pnpm test:ci` | Jest (library) + smoke       |
| `pnpm lint`                  | ESLint                       |
| `pnpm format`                | Prettier write               |

## Contributing

1. Use **pnpm** and branch from the active migration branch if applicable.
2. Library changes go in `packages/multi-selectbox`; exercise them via `pnpm example` and `pnpm test`.
3. Follow [docs/MIGRATION.md](./docs/MIGRATION.md) for the 2.0 roadmap (Phase 8 = publish).

Issues: https://github.com/sauzy34/react-native-multi-selectbox/issues

## License

MIT — see [LICENSE](./LICENSE).
