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
| Package manager | **npm workspaces** (default; revisit only if needed) | Simple; one lockfile at root |
| Library runtime deps | Stay **React Native + `react-native-svg`** (not `expo` as a library dependency) | Works in Expo *and* RN CLI consumers |
| Versioning | **2.0.0** for modern peers + types; keep **1.5.x** on npm | Peer/`svg` major + TS is a breaking line for tooling, not necessarily for JSX API |
| Public SelectBox API | **Stable for 2.0** (see inventory below) | No redesign; optional keys / selection limits are **2.1+** |
| Cheap bugfixes in 2.0 | Allowed if small and tested (see scope) | Don’t re-ship top GitHub pain points |
| Testing | **Library-first** Jest + jest-expo + RNTL; app smoke only | See testing architecture discussion in planning |
| Expo SDK | **Pin latest stable at Phase 2 scaffold time** (document exact SDK in Phase 2) | Don’t pre-pin a number that may lag; lock in when scaffolding |

### Target layout

```text
/
├── package.json                 # workspaces orchestrator only
├── package-lock.json
├── tsconfig.base.json
├── docs/
│   ├── MIGRATION.md             # this file
│   └── QA.md                    # Phase 5/8 device checklist (later)
├── apps/
│   └── example/                 # Expo TypeScript demo (from App.js)
└── packages/
    └── multi-selectbox/         # publishable react-native-multi-selectbox
        ├── package.json
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
3. **Type-safety:** `npm run typecheck` (or equivalent) passes for **package + example** with `strict` TypeScript; app code uses exported prop types (no `any` in package public surface).
4. **Tests:** library has automated tests for at least render, single select, multi toggle, options guard, and controlled/preselected values; `npm test` / `npm run test:ci` is green.
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
- [ ] Root workspaces `package.json`
- [ ] `tsconfig.base.json`
- [ ] Root scripts stubs (`typecheck`, `test`, `example`)
- [ ] Root `.gitignore` Expo entries
- [ ] Install lockfile at root

### Phase 2 — Expo example app
- [ ] `apps/example` via `create-expo-app` (TypeScript)
- [ ] `expo install react-native-svg` (and SDK-aligned peers)
- [ ] Port `App.js` → example `App.tsx`
- [ ] Metro monorepo `watchFolders`
- [ ] Verify `expo start` on simulator/emulator
- [ ] Record **exact Expo SDK + RN versions** in this file

### Phase 3 — Extract library package
- [ ] `packages/multi-selectbox` package.json
- [ ] Move sources from `lib/`
- [ ] Example depends on workspace package
- [ ] Fast Refresh from package → example
- [ ] Remove / stop using registry copy in example

### Phase 4 — TypeScript + full type-safety
- [ ] `types.ts` + discriminated props
- [ ] Convert components to TS
- [ ] Export types from entry
- [ ] Typecheck package + example clean
- [ ] Finalize peerDependencies

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
| 1 Monorepo skeleton | Not started | | |
| 2 Expo example | Not started | | |
| 3 Extract package | Not started | | |
| 4 TypeScript | Not started | | |
| 5 Testing | Not started | | |
| 6 Stability fixes | Not started | | |
| 7 Cleanup & DX | Not started | | |
| 8 Validate & release | Not started | | |

---

## Next action

**Start Phase 1:** monorepo skeleton (root workspaces, `tsconfig.base.json`, scripts, gitignore). Do not delete `android/` / `ios/` yet.
