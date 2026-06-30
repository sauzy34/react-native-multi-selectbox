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

Icons use built-in text glyphs.

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

## Hosting SelectBox in scrolling screens

React Native warns when a **vertical VirtualizedList** (`FlatList` / `SectionList`) is nested inside a vertical **`ScrollView`** (or another VirtualizedList).

**Default `virtualized={false}`** renders options in a bounded **`ScrollView` + `.map()`** — safe under `ScrollView` / `FlatList` / `SectionList` hosts.

### Recommended (RN-correct)

1. **Make the screen a `FlatList` or `SectionList`** — each field or card is a row / section item (preferred for long screens). Demo: [`apps/example/demos/SectionListHostDemo.tsx`](../../apps/example/demos/SectionListHostDemo.tsx).
2. **Or use a vertical `ScrollView`** for simpler forms. Demo: [`apps/example/demos/ScrollViewHostDemo.tsx`](../../apps/example/demos/ScrollViewHostDemo.tsx).
3. Opt into **`virtualized={true}`** only when SelectBox is **not** under another vertical scroll parent and the option list is large (windowed `FlatList`):

```tsx
// Large option list, no outer vertical ScrollView / list host:
<SelectBox virtualized options={OPTIONS} onChange={...} />
```

Switch hosts in the Expo app tabs (`apps/example/App.tsx`).

| Host                                             | Suggested `virtualized`                |
| ------------------------------------------------ | -------------------------------------- |
| `FlatList` / `SectionList` row                   | `false` (default)                      |
| Vertical `ScrollView`                            | `false` (default)                      |
| Non-scrolling `View` / modal without list scroll | `true` (opt-in for large option lists) |

Multi chips use a **horizontal `ScrollView`** (content-sized chips) — that orientation does not conflict with a vertical page list.

## Develop

```bash
pnpm install   # repo root
pnpm typecheck
pnpm test
pnpm example
pnpm example:web
```
