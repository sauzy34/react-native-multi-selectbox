# `@rn-multi-selectbox/example`

Expo **SDK 56** TypeScript demo for `react-native-multi-selectbox` (workspace package).

## Live demo

**https://sauzy34.github.io/react-native-multi-selectbox/**

Deployed from `master` / `main` via CI (GitHub Pages). Local export uses `EXPO_BASE_URL=/react-native-multi-selectbox` in `app.config.js`.

## Run (from monorepo root)

```bash
pnpm install
pnpm example              # Expo start (offline by default) — press i / a / w
pnpm example:web          # browser via react-native-web
pnpm example:export:web   # static export → apps/example/dist
```

| Script                                    | Purpose                                            |
| ----------------------------------------- | -------------------------------------------------- |
| `pnpm example`                            | Offline Expo start (avoids Expo API GraphQL noise) |
| `pnpm example:online`                     | Online Expo start                                  |
| `pnpm example:clear`                      | Offline start + clear Metro cache                  |
| `pnpm example:web` / `example:web:online` | Web demo                                           |
| `pnpm example:export:web`                 | Static web export smoke                            |

QA: single + multi select, filter, chips, icon colors, options panel scroll.

## Demos

| File                                                               | Host          | Notes                       |
| ------------------------------------------------------------------ | ------------- | --------------------------- |
| [`demos/SectionListHostDemo.tsx`](./demos/SectionListHostDemo.tsx) | `SectionList` | Preferred for long screens  |
| [`demos/ScrollViewHostDemo.tsx`](./demos/ScrollViewHostDemo.tsx)   | `ScrollView`  | Simple / short–medium forms |
| [`demos/AdditionalApisDemo.tsx`](./demos/AdditionalApisDemo.tsx)   | API cards     | 2.0.2+ controls             |

Shared UI under [`demos/shared/`](./demos/shared/). Entry: [`App.tsx`](./App.tsx).

Library default is **`virtualized={false}`** (host-safe). See the [package README](../../packages/multi-selectbox/README.md) for scrolling-host guidance.

`pnpm test` / `test:ci` runs [`scripts/smoke-demos.mjs`](./scripts/smoke-demos.mjs).

### `UnexpectedServerData` / “No returned query result”

That comes from **Expo CLI calling Expo’s backend**, not SelectBox. Default `pnpm example` uses **`--offline`**. If you need online mode and still see it: retry, check VPN, or `pnpm example:clear`.

## Stack

| Package                      | Version                                    |
| ---------------------------- | ------------------------------------------ |
| expo                         | ~56.0.12                                   |
| react / react-dom            | 19.2.3                                     |
| react-native                 | 0.85.3                                     |
| react-native-web             | ^0.21.2                                    |
| react-native-multi-selectbox | `workspace:*` → `packages/multi-selectbox` |

Monorepo contributor docs: [CONTRIBUTING.md](../../CONTRIBUTING.md).
