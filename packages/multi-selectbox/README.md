# react-native-multi-selectbox

Platform-independent (Android / iOS / Expo / web) Selectbox | Picker | Multi-select.

> **Source of truth:** `packages/multi-selectbox` (TypeScript).  
> Demo: monorepo `pnpm example` / `pnpm example:web` → `apps/example` (Expo SDK 56).

## Install (consumers)

```bash
npm install react-native-multi-selectbox
# peers only:
#   react >= 18
#   react-native >= 0.73
```

No `lodash` or `react-native-svg` required — icons use built-in text glyphs.

## Types

```ts
import SelectBox, {
  type SelectOption,
  type SelectBoxProps,
  type SelectBoxSingleProps,
  type SelectBoxMultiProps,
} from 'react-native-multi-selectbox'
```

`SelectBoxProps` is a **discriminated union** on `isMulti`:

- Single: `isMulti` omitted/`false`, optional `value` + `onChange`
- Multi: `isMulti: true`, optional `selectedValues` + `onMultiSelect` / `onTapClose`

Options must include `id` and `item`.

## Lists & nested ScrollViews

By default options render in a **vertical `FlatList`** with a **max height** and **`nestedScrollEnabled`**. If the SelectBox sits inside a **parent vertical ScrollView**, RN may log a nested VirtualizedList warning. To avoid it:

```tsx
<SelectBox virtualized={false} options={OPTIONS} onChange={...} />
```

Multi chips use a **horizontal ScrollView** (content-sized chips).

## Develop

```bash
pnpm install   # repo root
pnpm typecheck
pnpm test
pnpm example
pnpm example:web
```
