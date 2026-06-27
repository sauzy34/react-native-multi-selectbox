# Migration: RN CLI → Expo monorepo (TypeScript)

**Branch:** `chore/expo-monorepo-migration`  
**Baseline commit:** `bbc901a` (master / current HEAD at Phase 0 start)  
**Package (source of truth):** `packages/multi-selectbox` @ `2.0.0-alpha.0` (legacy root `/lib` **removed** in Phase 3)  
**Demo (source of truth):** `apps/example` — Expo **SDK 56** (legacy root CLI demo deprecated)  
**Published npm still:** **1.5.x** on registry until **2.0** ships  
**Target release line:** **2.0.0** (beta first)

This document is the source of truth for migration decisions. Update the checklist as phases complete.

---

## Phase 0 — Align & branch (complete; commit optional until you ask)

### Decisions (frozen for this migration)

| Decision              | Choice                                                                          | Rationale                                                                                            |
| --------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Repo layout           | **Monorepo**                                                                    | Separate publishable library from Expo demo                                                          |
| Language              | **TypeScript** everywhere (package + example)                                   | Full type-safety; addresses [#46](https://github.com/sauzy34/react-native-multi-selectbox/issues/46) |
| App framework         | **Expo** (managed first)                                                        | Replace EOL RN CLI demo; no custom native modules in the library                                     |
| Migration style       | **Greenfield Expo + port library**                                              | Avoid RN 0.64 → current in-place CLI upgrades                                                        |
| Package manager       | **pnpm** workspaces (`pnpm-workspace.yaml`, `packageManager` field)             | Fast installs; hoisted linker for RN/Expo Metro                                                      |
| Library runtime deps  | Stay **React Native + `react-native-svg`** (not `expo` as a library dependency) | Works in Expo _and_ RN CLI consumers                                                                 |
| Versioning            | **2.0.0** for modern peers + types; keep **1.5.x** on npm                       | Peer/`svg` major + TS is a breaking line for tooling, not necessarily for JSX API                    |
| Public SelectBox API  | **Stable for 2.0** (see inventory below)                                        | No redesign; optional keys / selection limits are **2.1+**                                           |
| Cheap bugfixes in 2.0 | Allowed if small and tested (see scope)                                         | Don’t re-ship top GitHub pain points                                                                 |
| Testing               | **Library-first** Jest + jest-expo + RNTL; app smoke only                       | See testing architecture discussion in planning                                                      |
| Expo SDK              | **Pin latest stable at Phase 2 scaffold time** (document exact SDK in Phase 2)  | Don’t pre-pin a number that may lag; lock in when scaffolding                                        |

### Target layout

```text
/
├── package.json                 # workspaces orchestrator only (private)
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
├── .npmrc                       # node-linker=hoisted (RN/Expo)
├── packageManager               # pnpm@10.x via package.json field
├── tsconfig.base.json
├── .nvmrc                       # Node 20+
├── docs/
│   ├── MIGRATION.md             # this file
│   └── QA.md                    # Phase 5/8 device checklist (later)
├── apps/
│   └── example/                 # Expo TypeScript demo (Phase 2 scaffold)
└── packages/
    └── multi-selectbox/         # publishable react-native-multi-selectbox
        ├── package.json         # 2.0.0-alpha.0 during migration
        ├── src/
        └── …
```

### 2.0 scope — in

- [ ] Monorepo with `apps/example` + `packages/multi-selectbox`
- [ ] Expo TypeScript example app replacing RN CLI demo workflow
- [x] Library moved from `lib/` → `packages/multi-selectbox/src` (TS implementation = Phase 4; interim `.d.ts` in place)
- [ ] Exported types: `SelectOption`, discriminated `SelectBoxProps` (single vs multi)
- [ ] Peers aligned for modern RN / Expo (`react-native-svg` via `expo install` in docs)
- [ ] Workspace link: example depends on local package (not npm 1.5 for day-to-day dev)
- [ ] Library unit/component tests (Jest + RNTL) + root `typecheck` + CI-ready scripts
- [ ] Docs: Expo install path, TS usage, 1.x → 2.0 migration notes
- [ ] Remove RN CLI `android/` / `ios/` and legacy root tooling **after** Expo demo is green
- [ ] Publish path for `2.0.0-beta.x` then `2.0.0` (execution in Phase 8)

### 2.0 scope — cheap bugfixes (in, if implemented with tests)

| Fix                                                                                     | Related issues                                                                                                                                       |
| --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Guard non-array / missing `options`                                                     | [#92](https://github.com/sauzy34/react-native-multi-selectbox/issues/92)                                                                             |
| Controlled / preselected `value` & `selectedValues` respected                           | [#81](https://github.com/sauzy34/react-native-multi-selectbox/issues/81)                                                                             |
| ScrollView-friendly options list (avoid nested VirtualizedList footgun where practical) | [#62](https://github.com/sauzy34/react-native-multi-selectbox/issues/62), [#74](https://github.com/sauzy34/react-native-multi-selectbox/issues/74)   |
| Obvious style passthrough bugs when touching filter styles                              | [#77](https://github.com/sauzy34/react-native-multi-selectbox/issues/77), [#105](https://github.com/sauzy34/react-native-multi-selectbox/issues/105) |

### 2.0 scope — out (defer to 2.1+ or separate work)

- Custom option field names (`name` instead of `item`) — [#87](https://github.com/sauzy34/react-native-multi-selectbox/issues/87), [#88](https://github.com/sauzy34/react-native-multi-selectbox/issues/88)
- Selection limit API — [#70](https://github.com/sauzy34/react-native-multi-selectbox/issues/70), [#89](https://github.com/sauzy34/react-native-multi-selectbox/issues/89)
- Open-by-default prop — [#75](https://github.com/sauzy34/react-native-multi-selectbox/issues/75)
- Full clickable row (not only arrow) as a new API unless trivial with existing structure — [#86](https://github.com/sauzy34/react-native-multi-selectbox/issues/86)
- Custom icon set API redesign — [#101](https://github.com/sauzy34/react-native-multi-selectbox/issues/101)
- `activeOptionsLabelStyle` and other new style keys unless needed for type completeness from patches — [#103](https://github.com/sauzy34/react-native-multi-selectbox/issues/103)
- Visual redesign / new interaction model
- Detox/Maestro as PR-required E2E (optional later)
- Supporting RN versions older than Expo SDK baseline
- In-place upgrade of existing CLI `android/` / `ios/` projects

### Public API inventory (1.x → keep in 2.0)

**Option shape (unchanged):**

```ts
{
  id: string | number
  item: string
}
```

**Props used by `lib/index.js` today (must type and support):**

| Prop                         | Role                                         |
| ---------------------------- | -------------------------------------------- |
| `label`                      | Field label text                             |
| `labelStyle`                 | Label style                                  |
| `containerStyle`             | Outer container                              |
| `options`                    | Option list                                  |
| `value`                      | Single-select selected option                |
| `selectedValues`             | Multi-select selected options                |
| `isMulti`                    | Multi mode flag                              |
| `onChange`                   | Single-select callback                       |
| `onMultiSelect`              | Multi select toggle callback                 |
| `onTapClose`                 | Multi chip remove callback                   |
| `inputPlaceholder`           | Placeholder / empty multi hint               |
| `hideInputFilter`            | Hide search field                            |
| `width`                      | Width (default `'100%'`)                     |
| `selectIcon`                 | Custom dropdown icon node                    |
| `arrowIconColor`             | Chevron color                                |
| `searchIconColor`            | Search icon color                            |
| `toggleIconColor`            | Multi toggle icon color                      |
| `searchInputProps`           | Extra `TextInput` props for filter           |
| `multiSelectInputFieldProps` | Extra props on multi selected list           |
| `listOptionProps`            | Extra props on options `FlatList`            |
| `inputFilterContainerStyle`  | Filter row container                         |
| `inputFilterStyle`           | Filter `TextInput` style                     |
| `optionsLabelStyle`          | Option label text                            |
| `optionContainerStyle`       | Option row                                   |
| `multiOptionContainerStyle`  | Selected chip container                      |
| `multiOptionsLabelStyle`     | Selected chip label                          |
| `multiListEmptyLabelStyle`   | Empty multi placeholder label                |
| `listEmptyLabelStyle`        | Empty filtered list label                    |
| `selectedItemStyle`          | Single-select value text                     |
| `listEmptyText`              | Empty list copy (default `No results found`) |

Default export: **memoized** `SelectBox`.

**Peer dependencies today (`lib/package.json`):** `lodash`, `react-native-svg@^12` — **revisit in Phase 4** (inline lodash helpers optional; svg major via Expo alignment).

### Success criteria (Phase 0 definition of “migration done”)

Must all be true before calling the migration complete (Phase 8):

1. **Expo demo runs:** from repo root (or `apps/example`), `npx expo start` launches the football-teams style demo on iOS Simulator and/or Android emulator without RN CLI.
2. **Workspace package:** example imports `react-native-multi-selectbox` from **`packages/multi-selectbox`**, not a stale npm 1.x copy for local dev.
3. **Type-safety:** `pnpm typecheck` passes for **package + example** with `strict` TypeScript; app code uses exported prop types (no `any` in package public surface).
4. **Tests:** library has automated tests for at least render, single select, multi toggle, options guard, and controlled/preselected values; `pnpm test` / `pnpm test:ci` is green.
5. **No CLI required for contributors:** README documents Expo workflow; root is not “run `react-native run-ios` on 0.64”.
6. **Legacy natives removed or clearly orphaned:** `android/` and `ios/` at repo root are deleted **or** explicitly marked obsolete only if still needed for a documented reason (prefer delete after Phase 2–3 green).
7. **Publish readiness:** package version on 2.0 line can be built/packed; CHANGELOG or MIGRATION notes explain 1.x → 2.0 (peers, TS, install with `expo install react-native-svg`).
8. **Regressions:** cheap bugfixes in scope either fixed + tested or explicitly deferred with issue links in QA notes.

### Success criteria (Phase 0 only — this phase)

- [x] Migration branch created: `chore/expo-monorepo-migration`
- [x] Scope in/out frozen in this document
- [x] Public API inventory captured
- [x] Target layout agreed
- [x] Delete / retire list documented
- [x] Phase checklist for Phase 1+ outlined
- [ ] Phase 0 commit on the branch (run when you want it on remote / history)

### Delete or retire later (do **not** delete until Phase 2–3 are green)

| Path / artifact                                                                        | When to remove                    | Notes                                            |
| -------------------------------------------------------------------------------------- | --------------------------------- | ------------------------------------------------ |
| `android/`                                                                             | After Expo example runs (Phase 7) | RN CLI demo native project                       |
| `ios/`                                                                                 | After Expo example runs (Phase 7) | Includes Flipper-era Podfile                     |
| Root `index.js` (`AppRegistry`)                                                        | **Removed Phase 7**               | —                                                |
| Root `App.js`                                                                          | **Removed Phase 7**               | —                                                |
| Root `metro.config.js` / `babel.config.js` (CLI)                                       | **Removed Phase 7**               | Package keeps its own `babel.config.js` for Jest |
| Root RN `0.64` / React `16` dependencies                                               | **Removed Phase 1/7**             | —                                                |
| `__tests__/App-test.js`                                                                | **Removed Phase 7**               | Package Jest suite                               |
| `lib/` package tree                                                                    | **Removed in Phase 3**            | —                                                |
| `lib/yarn.lock`                                                                        | **Removed in Phase 3**            | —                                                |
| `.buckconfig`, Flow, Watchman, CLI eslint                                              | **Removed Phase 7**               | Root ESLint 9 + Prettier                         |
| Direct npm dependency on published `react-native-multi-selectbox` inside monorepo demo | Phase 3                           | Use workspace `*`                                |

**Keep:** `demo.gif`, `LICENSE`, `CODE_OF_CONDUCT.md`, GitHub issue history, npm package name `react-native-multi-selectbox`.

### Risks acknowledged in Phase 0

| Risk                            | Mitigation                                                         |
| ------------------------------- | ------------------------------------------------------------------ |
| Dual `lib/` + `packages/` drift | Single move in Phase 3; delete `lib/` same PR or immediately after |
| Metro monorepo resolution       | Expo monorepo `watchFolders` in Phase 2–3                          |
| Android release-only crashes    | EAS preview optional in Phase 8; not blocking Phase 0–5            |
| Scope creep on UX issues        | Out-of-scope list above is binding for 2.0                         |

---

## Execution checklist (high level)

### Phase 0 — Align & branch

- [x] Branch `chore/expo-monorepo-migration`
- [x] Document decisions, scope, API, success criteria, delete list
- [ ] Commit Phase 0 docs (optional; ask to commit anytime)

### Phase 1 — Monorepo skeleton

- [x] Root private orchestrator `package.json` + **pnpm** (`pnpm-workspace.yaml`, `.npmrc`, `packageManager`)
- [x] `tsconfig.base.json` (strict) + package `tsconfig` extending it
- [x] Root scripts stubs (`typecheck`, `test`, `test:ci`, `example`, `build`, `lint`, `clean`)
- [x] Placeholder `apps/example` and `packages/multi-selectbox` workspace packages
- [x] Root `.gitignore` Expo / pnpm / coverage entries
- [x] `pnpm-lock.yaml` via `pnpm install`; `pnpm typecheck` green on placeholder
- [ ] Commit Phase 1 (when requested)

### Phase 2 — Expo example app

- [x] `apps/example` via `create-expo-app` **blank-typescript** (Expo **SDK 56**)
- [x] `react-native-svg@15.15.4` aligned for SDK 56; `lodash` for demo xor
- [x] Port root `App.js` → `apps/example/App.tsx` (typed options via package `SelectOption`)
- [x] Metro monorepo `apps/example/metro.config.js` (`watchFolders`, hoisted `nodeModulesPaths`)
- [x] Smoke: `pnpm typecheck`; `expo export --platform ios` bundles workspace SelectBox (687 modules)
- [x] Record **exact Expo SDK + RN versions** (see Phase 2 pins below)
- [ ] Commit / push Phase 2 (this change set)
- [ ] Manual `pnpm example` on simulator/device (optional local QA)

### Phase 2 pins (locked at scaffold time)

| Package                            | Version                                                  |
| ---------------------------------- | -------------------------------------------------------- |
| **Expo SDK**                       | **56** (`expo@~56.0.12`, `sdkVersion` 56.0.0)            |
| **react**                          | **19.2.3**                                               |
| **react-native**                   | **0.85.3**                                               |
| **expo-status-bar**                | ~56.0.4                                                  |
| **react-native-svg**               | **15.15.4**                                              |
| **typescript** (example + package) | ~5.9.2                                                   |
| **react-native-multi-selectbox**   | `workspace:*` → `packages/multi-selectbox@2.0.0-alpha.0` |

**Note:** SelectBox **JS was copied** from legacy `/lib` into `packages/multi-selectbox/src` so the example runs against the workspace package. Phase 3 removes the dual `/lib` source; Phase 4 fully TypeScripts implementation (ambient `SelectBox.d.ts` is interim).

### Phase 3 — Extract library package

- [x] `packages/multi-selectbox` is the **only** library package tree
- [x] Removed legacy root **`/lib`** (and `lib/yarn.lock`) — no dual source
- [x] Package `exports` / `files` point at `src` only; README documents monorepo + consumers
- [x] Example depends on workspace package (`workspace:*`)
- [x] Root README + `App.js` point at `apps/example` / deprecate CLI demo entry
- [x] `pnpm typecheck` + iOS `expo export` still resolve workspace SelectBox
- [ ] Interactive Fast Refresh QA (optional local)

### Phase 4 — TypeScript + full type-safety

- [x] `src/types.ts` — `SelectOption`, shared props, **discriminated** `SelectBoxSingleProps` | `SelectBoxMultiProps`
- [x] Convert `SelectBox`, `Icon`, `Toggle`, `Colors` to `.tsx` / `.ts` (removed legacy `.js` / ambient `.d.ts`)
- [x] Export types from entry (`SelectOption`, `SelectBoxProps`, single/multi variants)
- [x] Typecheck package + example clean; iOS `expo export` OK
- [x] PeerDependencies ranges: `react>=18`, `react-native>=0.73`, `react-native-svg>=13`, `lodash>=4.17`
- [x] Runtime `options` / `selectedValues` normalized with `Array.isArray` (guards non-array)

### Phase 5 — Testing architecture

- [x] Jest + **`@react-native/jest-preset`** + RNTL in package (jest-expo deferred — peer/Babel friction with RN 0.85; RN preset is sufficient for a pure RN library)
- [x] Typed fixtures + `renderSelectBox` + `TEST_IDS` (exported from package)
- [x] Core regression tests: render, options guard, ScrollView host, single, multi, filter, empty list, controlled value, hideInputFilter
- [x] Example smoke: resolves workspace package via `require('react-native-multi-selectbox')`
- [x] Root `pnpm test` / `pnpm test:ci`; `.github/workflows/ci.yml` (typecheck + test:ci)

### Phase 6 — Stability fixes

- [x] Options guard (Phase 4 `Array.isArray`; retained)
- [x] Controlled selection — `value` / `selectedValues` drive UI; parent updates reflected (tested)
- [x] **ScrollView-friendly lists** — options panel + multi chips use `ScrollView` + `.map()` (no nested `FlatList` / VirtualizedList) — addresses [#62](https://github.com/sauzy34/react-native-multi-selectbox/issues/62) / [#74](https://github.com/sauzy34/react-native-multi-selectbox/issues/74)
- [x] `listOptionProps` / `multiSelectInputFieldProps` typed as ScrollView props (`OptionsListProps`, `MultiSelectFieldProps`)
- [x] Style passthrough — `inputFilterStyle` (incl. `color`) wins over defaults; `placeholderTextColor` follows filter color when unset ([#77](https://github.com/sauzy34/react-native-multi-selectbox/issues/77), [#105](https://github.com/sauzy34/react-native-multi-selectbox/issues/105))
- [x] Clear filter text when closing the options panel
- [x] Tests green — **14** tests incl. `SelectBox.stability.test.tsx`

### Phase 7 — Cleanup & DX

- [x] Deleted CLI `android/`, `ios/`, root `App.js` / `index.js` / `app.json`, Metro/Babel CLI configs, Buck/Flow/Watchman, legacy `__tests__`, root `yarn.lock`
- [x] ESLint 9 flat config + Prettier at monorepo root (`pnpm lint`, `pnpm format`)
- [x] README Expo-first + TypeScript usage + monorepo scripts
- [~] CHANGELOG / publish notes deferred to Phase 8 with 2.0 release

### Phase 8 — Validate & release

- [ ] Manual QA checklist (`docs/QA.md`)
- [ ] Optional EAS preview build
- [ ] Publish `2.0.0-beta.0` then stable `2.0.0`
- [ ] Smoke in a fresh Expo app outside monorepo

---

## Phase log

| Phase                | Status      | Date       | Notes                                                                                     |
| -------------------- | ----------- | ---------- | ----------------------------------------------------------------------------------------- |
| 0 Align & branch     | **Done**    | 2026-06-27 | Branch `chore/expo-monorepo-migration` @ `bbc901a`; [`docs/MIGRATION.md`](./MIGRATION.md) |
| 1 Monorepo skeleton  | **Done**    | 2026-06-27 | pnpm workspaces; placeholders; strict `tsconfig.base.json`                                |
| 2 Expo example       | **Done**    | 2026-06-27 | SDK 56 / RN 0.85.3 / React 19.2.3; iOS `expo export` OK                                   |
| 3 Extract package    | **Done**    | 2026-06-27 | `/lib` deleted; `packages/multi-selectbox` sole source                                    |
| 4 TypeScript         | **Done**    | 2026-06-27 | Full TS modules + discriminated `SelectBoxProps`                                          |
| 5 Testing            | **Done**    | 2026-06-27 | 10 Jest tests; ~92% statements on SelectBox                                               |
| 6 Stability fixes    | **Done**    | 2026-06-27 | ScrollView options/chips; filter styles; controlled value tests                           |
| 7 Cleanup & DX       | **Done**    | 2026-06-27 | CLI natives removed; ESLint/Prettier; Expo-first README                                   |
| 8 Validate & release | Not started |            |                                                                                           |

---

## Next action

**Start Phase 8:** validate (manual QA / optional EAS), publish `2.0.0-beta` then `2.0.0`, smoke in a fresh Expo app. Add `CHANGELOG.md` with 1.x → 2.0 notes.

### Phase 7 commands (verified)

```bash
pnpm install
pnpm typecheck
pnpm test
pnpm lint
pnpm format:check
pnpm example
# legacy paths must not exist:
test ! -d android && test ! -d ios && test ! -f App.js
```

**Note:** Prefer **pnpm** only. This repo is **Expo-first monorepo**; no RN CLI app at the root.
