# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-06-30

Major rewrite: TypeScript library in a pnpm monorepo with an Expo example app. Published package source: `packages/multi-selectbox`.

### Added

- Full **TypeScript** public API (`SelectOption`, discriminated `SelectBoxProps` / single vs multi)
- **Expo SDK 56** example app (`apps/example`) with SectionList and ScrollView host demos
- Live web demo on GitHub Pages: https://sauzy34.github.io/react-native-multi-selectbox/
- Options panel **`virtualized`** flag (default **`false`**: bounded ScrollView — safe under form hosts; `true` uses FlatList for large lists without a vertical scroll parent)
- `listScrollViewProps` for non-virtualized options panel; `listOptionProps` for FlatList mode
- Filter clear control, full-row option press, multi chips via horizontal ScrollView
- Built-in text **glyph icons** (no SVG dependency)
- Jest + React Native Testing Library suite under `packages/multi-selectbox/__tests__`
- CI: typecheck, package build, lint, format, tests; Pages deploy from `master` / `main`
- Compile step emits **`dist/`** (CommonJS + declarations) for npm consumers; Metro still resolves `src` via the `react-native` field

### Changed

- **Peer dependencies** are only **`react` (≥18)** and **`react-native` (≥0.73)**. Previous peer packages (e.g. **`lodash`**, **`react-native-svg`**) are no longer required and should be removed from your app if you only used them for this library.
- Package is **TypeScript-first** with typed props; install remains `npm install react-native-multi-selectbox`
- Default options list behavior prioritizes **host safety** (`virtualized={false}`) over windowing

### Removed

- Legacy RN CLI app tree from the repository (`android/`, `ios/`, root `App.js`, etc.) — replaced by the Expo example
- Published reliance on **lodash** and **react-native-svg** as peer dependencies of this package

### Migration from 1.x

1. Upgrade peers to React 18+ and React Native 0.73+ (Expo SDK 50+ recommended).
2. Remove `lodash` / `react-native-svg` from your project **if** they were only installed for this package.
3. Prefer forms hosted in `ScrollView` / `FlatList` / `SectionList` with the default `virtualized={false}`; set `virtualized` only for large option lists without an outer vertical scroll parent.
4. Use TypeScript types from the package when possible; option shape remains `{ id, item }`.
5. See [docs/MIGRATION.md](./docs/MIGRATION.md) for the monorepo / development layout.

## [1.5.0] - prior

Last line published from the pre-monorepo / JavaScript package layout. See npm history for 1.x details.

[2.0.0]: https://github.com/sauzy34/react-native-multi-selectbox/compare/v1.5.0...v2.0.0
