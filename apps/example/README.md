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
```

Then press `i` / `a` for iOS Simulator / Android emulator, or scan the QR code with Expo Go.

### `UnexpectedServerData` / “No returned query result”

That comes from **Expo CLI calling Expo’s backend** (not from SelectBox). Default `pnpm example` uses **`--offline`** so Metro starts without those GraphQL calls. If you need online mode and still see it: retry later, check network/VPN, or run `pnpm example:clear`.

## Stack (pinned at Phase 2)

| Package                      | Version                                    |
| ---------------------------- | ------------------------------------------ |
| expo                         | ~56.0.12                                   |
| react                        | 19.2.3                                     |
| react-native                 | 0.85.3                                     |
| react-native-svg             | 15.15.3 (align with `expo install`)        |
| react-native-multi-selectbox | `workspace:*` → `packages/multi-selectbox` |

Metro is configured for the monorepo (`metro.config.js` watchFolders + hoisted `node_modules`).
