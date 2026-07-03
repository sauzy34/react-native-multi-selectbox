# Migrating from 1.x to 2.x

Consumer-facing notes for upgrading **react-native-multi-selectbox**. For full release history, see [CHANGELOG.md](../CHANGELOG.md).

## Breaking changes

- **Peers:** `react` ≥ 18 and `react-native` ≥ 0.73 (Expo SDK 50+ recommended). Drop older RN CLI / Expo SDK baselines if you still target them only for this library.
- **Removed peers:** `lodash` and `react-native-svg` are **no longer** required by this package. Remove them from your app if you only installed them for SelectBox.
- **TypeScript:** the public API ships with types (`SelectOption`, single vs multi props). Option shape remains `{ id, item }` unless you map with `optionIdKey` / `optionLabelKey`.
- **Default options list:** `virtualized` defaults to **`false`** (host-safe `ScrollView`). Use `virtualized={true}` only for large option lists **without** an outer vertical scroll parent.

## Upgrade steps

1. Install the latest 2.x:

   ```bash
   npm install react-native-multi-selectbox@latest
   ```

2. Align React / React Native (or Expo) to supported peers.

3. Remove unused `lodash` / `react-native-svg` if they were only for this library.

4. Prefer embedding SelectBox under `ScrollView` / `FlatList` / `SectionList` with the default `virtualized={false}`.

5. Optional: adopt 2.0.2+ controls (`maxSelected`, `optionIdKey` / `optionLabelKey`, `hideChipClose`, etc.) — see the [package README](../packages/multi-selectbox/README.md) and [live demo](https://sauzy34.github.io/react-native-multi-selectbox/).

## Monorepo note

This repository is a **pnpm monorepo** (`packages/multi-selectbox` + `apps/example`). App consumers only need the published npm package; contributors should follow [CONTRIBUTING.md](../CONTRIBUTING.md).
