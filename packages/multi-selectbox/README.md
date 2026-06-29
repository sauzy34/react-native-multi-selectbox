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

## Hosting SelectBox in scrolling screens

React Native warns when a **vertical VirtualizedList** (`FlatList` / `SectionList`) is nested inside a vertical **`ScrollView`** (or another VirtualizedList). SelectBox options default to a **`FlatList`** (`virtualized={true}`) with a max height and `nestedScrollEnabled`.

### Recommended (RN-correct)

1. **Make the screen a `FlatList` or `SectionList`** — each field or card is a row / section item (preferred for long screens). Demo: [`apps/example/demos/SectionListHostDemo.tsx`](../../apps/example/demos/SectionListHostDemo.tsx).
2. **Or use a vertical `ScrollView`** for simpler forms — still set **`virtualized={false}`** on every SelectBox. Demo: [`apps/example/demos/ScrollViewHostDemo.tsx`](../../apps/example/demos/ScrollViewHostDemo.tsx).
3. When SelectBox is rendered **as a list row** (inside `FlatList` / `SectionList`) **or** inside a **vertical `ScrollView`**, set **`virtualized={false}`** so options use a bounded `ScrollView` + `.map()` instead of a second VirtualizedList:

```tsx
// Screen owns scrolling (FlatList / SectionList / ScrollView).
// Options must not be another vertical VirtualizedList.
<SelectBox virtualized={false} options={OPTIONS} onChange={...} />
```

4. Keep the default **`virtualized={true}`** only when SelectBox is **not** under another vertical scroll parent (e.g. a short fixed layout, modal body that is not a `ScrollView` / list, single field on screen).

Switch hosts in the Expo app tabs (`apps/example/App.tsx`).

| Host                                              | Suggested `virtualized`                          |
| ------------------------------------------------- | ------------------------------------------------ |
| `FlatList` / `SectionList` row                    | `false`                                          |
| Vertical `ScrollView`                             | `false`                                          |
| Non-scrolling `View` / modal without list scroll  | `true` (default, better for large option lists)  |

Multi chips use a **horizontal `ScrollView`** (content-sized chips) — that orientation does not conflict with a vertical page list.

## Develop

```bash
pnpm install   # repo root
pnpm typecheck
pnpm test
pnpm example
pnpm example:web
```
