# Migration: RN CLI → Expo monorepo (TypeScript)

**Branch:** `chore/expo-monorepo-migration`  
**Baseline commit:** `bbc901a` (master / current HEAD at Phase 0 start)  
**Package today:** `react-native-multi-selectbox@1.5.0` (`lib/`)  
**Demo today:** RN CLI **0.64.1** / React **16.13.1** (repo root)  
**Target release line:** **2.0.0** (beta first)

This document is the source of truth for migration decisions. Update the checklist as phases complete.

---

## Phase 0 — Align & branch (complete; commit optional until you ask)

### Decisions (frozen for this migration)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Repo layout | **Monorepo** | Separate publishable library from Expo demo |
| Language | **TypeScript** everywhere (package + example) | Full type-safety; addresses [#46](https://github.com/sauzy34/react-native-multi-selectbox/issues/46) |
| App framework | **Expo** (managed first) | Replace EOL RN CLI demo; no custom native modules in the library |
| Migration style | **Greenfield Expo + port library** | Avoid RN 0.64 → current in-place CLI upgrades |
| Package manager | **pnpm** workspaces (`pnpm-workspace.yaml`, `packageManager` field) | Fast installs; hoisted linker for RN/Expo Metro |
| Library runtime deps | Stay **React Native + `react-native-svg`** (not `expo` as a library dependency) | Works in Expo *and* RN CLI consumers |
| Versioning | **2.0.0** for modern peers + types; keep **1.5.x** on npm | Peer/`svg` major + TS is a breaking line for tooling, not necessarily for JSX API |
| Public SelectBox API | **Stable for 2.0** (see inventory below) | No redesign; optional keys / selection limits are **2.1+** |
| Cheap bugfixes in 2.0 | Allowed if small and tested (see scope) | Don’t re-ship top GitHub pain points |
| Testing | **Library-first** Jest + jest-expo + RNTL; app smoke only | See testing architecture discussion in planning |
| Expo SDK | **Pin latest stable at Phase 2 scaffold time** (document exact SDK in Phase 2) | Don’t pre-pin a number that may lag; lock in when scaffolding |

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
- [ ] Library moved from `lib/` → `packages/multi-selectbox/src` with **strict TypeScript**
- [ ] Exported types: `SelectOption`, discriminated `SelectBoxProps` (single vs multi)
- [ ] Peers aligned for modern RN / Expo (`react-native-svg` via `expo install` in docs)
- [ ] Workspace link: example depends on local package (not npm 1.5 for day-to-day dev)
- [ ] Library unit/component tests (Jest + RNTL) + root `typecheck` + CI-ready scripts
- [ ] Docs: Expo install path, TS usage, 1.x → 2.0 migration notes
- [ ] Remove RN CLI `android/` / `ios/` and legacy root tooling **after** Expo demo is green
- [ ] Publish path for `2.0.0-beta.x` then `2.0.0` (execution in Phase 8)

### 2.0 scope — cheap bugfixes (in, if implemented with tests)

| Fix | Related issues |
|-----|----------------|
| Guard non-array / missing `options` | [#92](https://github.com/sauzy34/react-native-multi-selectbox/issues/92) |
| Controlled / preselected `value` & `selectedValues` respected | [#81](https://github.com/sauzy34/react-native-multi-selectbox/issues/81) |
| ScrollView-friendly options list (avoid nested VirtualizedList footgun where practical) | [#62](https://github.com/sauzy34/react-native-multi-selectbox/issues/62), [#74](https://github.com/sauzy34/react-native-multi-selectbox/issues/74) |
| Obvious style passthrough bugs when touching filter styles | [#77](https://github.com/sauzy34/react-native-multi-selectbox/issues/77), [#105](https://github.com/sauzy34/react-native-multi-selectbox/issues/105) |

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
{ id: string | number; item: string }
```

**Props used by `lib/index.js` today (must type and support):**

| Prop | Role |
|------|------|
| `label` | Field label text |
| `labelStyle` | Label style |
| `containerStyle` | Outer container |
| `options` | Option list |
| `value` | Single-select selected option |
| `selectedValues` | Multi-select selected options |
| `isMulti` | Multi mode flag |
| `onChange` | Single-select callback |
| `onMultiSelect` | Multi select toggle callback |
| `onTapClose` | Multi chip remove callback |
| `inputPlaceholder` | Placeholder / empty multi hint |
| `hideInputFilter` | Hide search field |
| `width` | Width (default `'100%'`) |
| `selectIcon` | Custom dropdown icon node |
| `arrowIconColor` | Chevron color |
| `searchIconColor` | Search icon color |
| `toggleIconColor` | Multi toggle icon color |
| `searchInputProps` | Extra `TextInput` props for filter |
| `multiSelectInputFieldProps` | Extra props on multi selected list |
| `listOptionProps` | Extra props on options `FlatList` |
| `inputFilterContainerStyle` | Filter row container |
| `inputFilterStyle` | Filter `TextInput` style |
| `optionsLabelStyle` | Option label text |
| `optionContainerStyle` | Option row |
| `multiOptionContainerStyle` | Selected chip container |
| `multiOptionsLabelStyle` | Selected chip label |
| `multiListEmptyLabelStyle` | Empty multi placeholder label |
| `listEmptyLabelStyle` | Empty filtered list label |
| `selectedItemStyle` | Single-select value text |
| `listEmptyText` | Empty list copy (default `No results found`) |

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

| Path / artifact | When to remove | Notes |
|-----------------|----------------|-------|
| `android/` | After Expo example runs (Phase 7) | RN CLI demo native project |
| `ios/` | After Expo example runs (Phase 7) | Includes Flipper-era Podfile |
| Root `index.js` (`AppRegistry`) | Phase 2–7 | Replaced by Expo entry |
| Root `App.js` | After port to `apps/example` | Source for demo port |
| Root `metro.config.js` / `babel.config.js` (CLI) | Phase 2+ | Superseded by Expo configs in `apps/example` |
| Root RN `0.64` / React `16` dependencies | Phase 1–7 | Root becomes workspace orchestrator |
| `__tests__/App-test.js` | Phase 5 | Replaced by package tests + optional app smoke |
| `lib/` package tree | After Phase 3 move verified | Prefer delete; avoid dual sources |
| `lib/yarn.lock` | With `lib/` | Workspaces own lockfile |
| `.buckconfig`, legacy RN template cruft | Phase 7 | Not needed for Expo |
| Direct npm dependency on published `react-native-multi-selectbox` inside monorepo demo | Phase 3 | Use workspace `*` |

**Keep:** `demo.gif`, `LICENSE`, `CODE_OF_CONDUCT.md`, GitHub issue history, npm package name `react-native-multi-selectbox`.

### Risks acknowledged in Phase 0

| Risk | Mitigation |
|------|------------|
| Dual `lib/` + `packages/` drift | Single move in Phase 3; delete `lib/` same PR or immediately after |
| Metro monorepo resolution | Expo monorepo `watchFolders` in Phase 2–3 |
| Android release-only crashes | EAS preview optional in Phase 8; not blocking Phase 0–5 |
| Scope creep on UX issues | Out-of-scope list above is binding for 2.0 |

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

| Package | Version |
|---------|---------|
| **Expo SDK** | **56** (`expo@~56.0.12`, `sdkVersion` 56.0.0) |
| **react** | **19.2.3** |
| **react-native** | **0.85.3** |
| **expo-status-bar** | ~56.0.4 |
| **react-native-svg** | **15.15.4** |
| **typescript** (example + package) | ~5.9.2 |
| **react-native-multi-selectbox** | `workspace:*` → `packages/multi-selectbox@2.0.0-alpha.0` |

**Note:** SelectBox **JS was copied** from legacy `/lib` into `packages/multi-selectbox/src` so the example runs against the workspace package. Phase 3 removes the dual `/lib` source; Phase 4 fully TypeScripts implementation (ambient `SelectBox.d.ts` is interim).

### Phase 3 — Extract library package
- [x] `packages/multi-selectbox` package.json (from Phase 1)
- [~] Sources live under `packages/multi-selectbox/src` (copied in Phase 2; **delete `/lib` dual source** still pending)
- [x] Example depends on workspace package (`workspace:*`)
- [ ] Confirm Fast Refresh package → example in interactive session
- [x] Example does not depend on npm registry 1.x

### Phase 4 — TypeScript + full type-safety
- [~] Interim `SelectBox.d.ts` + `SelectOption` / `SelectBoxProps` (not full discriminated unions yet)
- [ ] Convert components to TS
- [x] Export types from entry (`SelectOption`, `SelectBoxProps`)
- [x] Typecheck package + example clean (Phase 2)
- [~] PeerDependencies include `lodash`, `react`, `react-native`, `react-native-svg` (finalize ranges in Phase 4)

### Phase 5 — Testing architecture
- [ ] Jest + jest-expo + RNTL in package
- [ ] Typed fixtures + `renderSelectBox` + `TEST_IDS`
- [ ] Core regression tests
- [ ] App smoke test
- [ ] Root `test` / `test:ci`; optional CI workflow

### Phase 6 — Stability fixes
- [ ] Options guard
- [ ] Controlled selection
- [ ] ScrollView-friendly list strategy
- [ ] Style passthrough fixes if in scope
- [ ] Tests green

### Phase 7 — Cleanup & DX
- [ ] Delete CLI `android/` / `ios/` (and other retire list items)
- [ ] ESLint / Prettier aligned
- [ ] README Expo-first + TS
- [ ] CHANGELOG / migration notes for 2.0

### Phase 8 — Validate & release
- [ ] Manual QA checklist (`docs/QA.md`)
- [ ] Optional EAS preview build
- [ ] Publish `2.0.0-beta.0` then stable `2.0.0`
- [ ] Smoke in a fresh Expo app outside monorepo

---

## Phase log

| Phase | Status | Date | Notes |
|-------|--------|------|-------|
| 0 Align & branch | **Done** | 2026-06-27 | Branch `chore/expo-monorepo-migration` @ `bbc901a`; [`docs/MIGRATION.md`](./MIGRATION.md) |
| 1 Monorepo skeleton | **Done** | 2026-06-27 | pnpm workspaces; placeholders; strict `tsconfig.base.json` |
| 2 Expo example | **Done** | 2026-06-27 | SDK 56 / RN 0.85.3 / React 19.2.3; iOS `expo export` OK |
| 3 Extract package | **Partial** | 2026-06-27 | Code in `packages/…/src`; legacy `/lib` still present |
| 4 TypeScript | **Partial** | 2026-06-27 | Ambient `.d.ts` only; JS implementation |
| 5 Testing | Not started | | |
| 6 Stability fixes | Not started | | |
| 7 Cleanup & DX | Not started | | |
| 8 Validate & release | Not started | | |

---

## Next action

**Start Phase 3 (finish extract):** remove dual source — make `packages/multi-selectbox` the only SelectBox tree, delete or deprecate root `/lib`, document single source of truth. Then Phase 4 full TS conversion. Do not delete `android/` / `ios/` until Phase 7.

### Phase 2 commands (verified)

```bash
pnpm install
pnpm typecheck
pnpm example                    # expo start (interactive)
pnpm --filter @rn-multi-selectbox/example exec expo export --platform ios --output-dir /tmp/out
```

**Note:** Root is not an RN 0.64 app. Legacy CLI (`android/`, `ios/`, root `App.js`) and `/lib` remain until Phase 3/7. Prefer **pnpm** only.
