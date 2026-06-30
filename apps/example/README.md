# `@rn-multi-selectbox/example`

Expo **SDK 56** TypeScript demo for `react-native-multi-selectbox` (workspace package).

## Hosted demo (GitHub Pages)

After CI deploys from **`master` / `main`**:

**https://sauzy34.github.io/react-native-multi-selectbox/**

Enable once: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The `github-pages` environment only allows deploys from branches permitted under **Settings → Environments → github-pages → Deployment branches and tags** (default: protected / selected branches — usually just the default branch). Feature branches like `chore/expo-monorepo-migration` are blocked unless you set **No restriction** (or add that branch) and extend the `if` in `.github/workflows/ci.yml`. Export uses `EXPO_BASE_URL=/react-native-multi-selectbox` (`app.config.js`).

## Run

Use the **migration monorepo tip** (not `master` / RN CLI era):

```bash
# this worktree if master is locked elsewhere:
git fetch origin chore/expo-monorepo-migration
git checkout -f origin/chore/expo-monorepo-migration

pnpm install
pnpm example              # expo start --offline (avoids Expo API GraphQL errors)
# pnpm example:online     # talks to Expo servers (account / updates / telemetry)
# pnpm example:clear      # --offline -c clears Metro cache
# pnpm example:web        # browser demo (react-native-web)
# pnpm example:web:online
# pnpm example:export:web # static web export smoke
```

Then press `i` / `a` for iOS Simulator / Android emulator, **`w` for web**, or open the Metro URL in a browser when using `pnpm example:web`.

### Web

Web depends on **`react-dom`**, **`react-native-web`**, and **`@expo/metro-runtime`** (SDK-aligned via `expo install`).

```bash
pnpm example:web
# → http://localhost:8081 (or the URL Expo prints)
```

QA checklist: single + multi select, filter, chips, icon colors on deselect, options panel scroll.

### Scrolling hosts (separate demo files)

The app chrome lets you switch patterns; each host is its own file so you can copy the one that fits:

| File                                                               | Host          | When to use                                            |
| ------------------------------------------------------------------ | ------------- | ------------------------------------------------------ |
| [`demos/SectionListHostDemo.tsx`](./demos/SectionListHostDemo.tsx) | `SectionList` | Preferred for long screens (same idea with `FlatList`) |
| [`demos/ScrollViewHostDemo.tsx`](./demos/ScrollViewHostDemo.tsx)   | `ScrollView`  | Simple / short–medium forms                            |

Shared catalogs and chrome live under [`demos/shared/`](./demos/shared/) (`data.ts`, `theme.ts`, `ui.tsx`). Entry: [`App.tsx`](./App.tsx).

Library default is **`virtualized={false}`** (host-safe). Demos follow that default under `SectionList` / `ScrollView` hosts; set `virtualized` only if you opt into windowed options. Library docs: _Hosting SelectBox in scrolling screens_.

`pnpm test` / `test:ci` runs `scripts/smoke-demos.mjs` (App host wiring regression).

### `UnexpectedServerData` / “No returned query result”

That comes from **Expo CLI calling Expo’s backend** (not from SelectBox). Default `pnpm example` / `example:web` use **`--offline`** so Metro starts without those GraphQL calls. If you need online mode and still see it: retry later, check network/VPN, or run `pnpm example:clear`.

## Stack (pinned)

| Package                      | Version                                    |
| ---------------------------- | ------------------------------------------ |
| expo                         | ~56.0.12                                   |
| react / react-dom            | 19.2.3                                     |
| react-native                 | 0.85.3                                     |
| react-native-web             | ^0.21.2                                    |
| @expo/metro-runtime          | ~56.0.15                                   |
| react-native-multi-selectbox | `workspace:*` → `packages/multi-selectbox` |

Metro is configured for the monorepo (`metro.config.js` watchFolders + hoisted `node_modules`).
