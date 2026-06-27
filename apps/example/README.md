# `@rn-multi-selectbox/example`

Expo **SDK 56** TypeScript demo for `react-native-multi-selectbox` (workspace package).

## Run

From the monorepo root:

```bash
pnpm install
pnpm example
# or: pnpm --filter @rn-multi-selectbox/example start
```

Then press `i` / `a` for iOS Simulator / Android emulator, or scan the QR code with Expo Go.

## Stack (pinned at Phase 2)

| Package                      | Version                                    |
| ---------------------------- | ------------------------------------------ |
| expo                         | ~56.0.12                                   |
| react                        | 19.2.3                                     |
| react-native                 | 0.85.3                                     |
| react-native-svg             | 15.15.3 (align with `expo install`)        |
| react-native-multi-selectbox | `workspace:*` → `packages/multi-selectbox` |

Metro is configured for the monorepo (`metro.config.js` watchFolders + hoisted `node_modules`).
