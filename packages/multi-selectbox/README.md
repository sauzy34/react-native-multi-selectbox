# react-native-multi-selectbox

Platform-independent (Android / iOS / Expo) Selectbox | Picker | Multi-select.

> **Source of truth:** `packages/multi-selectbox` (TypeScript, Phase 4).  
> Demo: monorepo `pnpm example` → `apps/example` (Expo SDK 56).

## Install (consumers)

```bash
npm install react-native-multi-selectbox lodash
npx expo install react-native-svg   # Expo
# or: npm install react-native-svg  # RN CLI
```

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

## Develop

```bash
pnpm install   # repo root
pnpm typecheck
pnpm example
```
