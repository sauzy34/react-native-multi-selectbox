# `@rn-multi-selectbox/example`

Expo **SDK 56** TypeScript demo for `react-native-multi-selectbox` (workspace package).

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

### Scrolling layout

The demo screen is a **`SectionList`** (not an outer `ScrollView`). Each demo card is a section row; every `SelectBox` uses **`virtualized={false}`** so the options panel is not a second vertical VirtualizedList inside the list. That matches React Native’s guidance and avoids nested-list warnings / gesture fights — see the library README section *Hosting SelectBox in scrolling screens*.

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
