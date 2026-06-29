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

## Options presentation (anchored overlay)

Options open in an **anchored overlay** (`Modal` + `measureInWindow` on the field), not inline inside a parent `ScrollView`. That avoids nested VirtualizedList issues while keeping a **FlatList** by default.

- Tap the dimmed backdrop or chevron to close.
- Panel flips **above** the field when there is more room above.
- `virtualized={false}` still switches the panel body to ScrollView+map (escape hatch).
- Multi chips stay in the field row (horizontal ScrollView).

A future **bottom sheet** can replace `AnchoredOptionsOverlay` without rewriting `OptionsPanel`.

## Develop

```bash
pnpm install   # repo root
pnpm typecheck
pnpm test
pnpm example
pnpm example:web
```
