# react-native-multi-selectbox

Platform-independent (Android / iOS / Expo) Selectbox | Picker | Multi-select.

> **Monorepo source of truth:** this package (`packages/multi-selectbox`).  
> Legacy root `/lib` was removed in migration **Phase 3**. Published npm **1.5.x** remains available; **2.0** is developed here (`2.0.0-alpha.x`).

## Install (consumers)

```bash
npm install react-native-multi-selectbox
# peers:
npm install react-native-svg lodash
# Expo:
npx expo install react-native-svg
npm install lodash
```

## Develop in this monorepo

```bash
# from repo root
pnpm install
pnpm example   # Expo SDK 56 demo in apps/example
```

The example app depends on `"react-native-multi-selectbox": "workspace:*"`.

## Usage

```tsx
import { useState } from 'react'
import { View } from 'react-native'
import SelectBox, { type SelectOption } from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'

// Options must contain `item` and `id`
const K_OPTIONS: SelectOption[] = [
  { item: 'Juventus', id: 'JUVE' },
  { item: 'Real Madrid', id: 'RM' },
]

function Example() {
  const [selectedTeam, setSelectedTeam] = useState<SelectOption | Record<string, never>>({})
  const [selectedTeams, setSelectedTeams] = useState<SelectOption[]>([])

  return (
    <View>
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
        onMultiSelect={(item) => setSelectedTeams((prev) => xorBy(prev, [item], 'id'))}
        onTapClose={(item) => setSelectedTeams((prev) => xorBy(prev, [item], 'id'))}
        isMulti
      />
    </View>
  )
}
```

## Package layout

```text
packages/multi-selectbox/
  src/
    index.ts          # public entry
    SelectBox.js      # implementation (TS in Phase 4)
    SelectBox.d.ts    # interim prop types
    components/       # Icon, Toggle
    constants/        # Colors
```

## Peer dependencies

| Peer | Notes |
|------|--------|
| `react` / `react-native` | Any modern version supported by your app / Expo SDK |
| `react-native-svg` | Required for icons; use `expo install` in Expo apps |
| `lodash` | Used for list helpers (`isEmpty`, `find`, demo often uses `xorBy`) |

## Migration status

| Phase | Status |
|-------|--------|
| 3 Single library tree | **Done** — only this package |
| 4 Full TypeScript implementation | Pending |
| 5 Tests | Pending |
| 8 Publish 2.0 | Pending |
