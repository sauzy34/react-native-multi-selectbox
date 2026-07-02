# react-native-multi-selectbox

[![npm version](https://img.shields.io/npm/v/react-native-multi-selectbox.svg?style=flat-square)](https://www.npmjs.com/package/react-native-multi-selectbox)
[![npm downloads](https://img.shields.io/npm/dm/react-native-multi-selectbox.svg?style=flat-square)](https://www.npmjs.com/package/react-native-multi-selectbox)
[![license](https://img.shields.io/npm/l/react-native-multi-selectbox.svg?style=flat-square)](./LICENSE)
[![CI](https://img.shields.io/github/actions/workflow/status/sauzy34/react-native-multi-selectbox/ci.yml?branch=master&style=flat-square&label=CI)](https://github.com/sauzy34/react-native-multi-selectbox/actions/workflows/ci.yml)

Cross-platform **select** / **multi-select** / **picker** for **React Native** and **Expo**.

### Live demo

**[sauzy34.github.io/react-native-multi-selectbox](https://sauzy34.github.io/react-native-multi-selectbox/)**

---

## Documentation (where to edit what)

This repo has **two README files on purpose**. They serve different audiences — do **not** duplicate long API docs in both.

| File                                                                             | Audience                                                             | Maintain                                                                  |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **[`packages/multi-selectbox/README.md`](./packages/multi-selectbox/README.md)** | **npm + library consumers** (install, examples, props, types, hosts) | **Source of truth for the public API** — edit this when usage/docs change |
| **This file (root)**                                                             | **GitHub / contributors** (monorepo map, scripts, contributing)      | Keep **short** — link to the package README for usage                     |

**Do not** copy-paste the same examples into both files. If something drifts, update the package README only, then ensure this hub still links to it.

Other approaches teams use (and why we don’t for now):

- **Symlink root → package** — GitHub root would be 100% npm docs (fine for tiny repos; loses a clear contributor hub).
- **Symlink package → root** — npm would ship monorepo/`pnpm example` noise (bad for consumers).
- **Generate both from fragments** — best at larger scale (`docs/*.md` + a small script); overkill until you have many packages.

Optional later: a `scripts/sync-readme.mjs` is unnecessary if you keep the split above.

---

## Install (consumers)

```bash
npm install react-native-multi-selectbox
```

Peers: `react` ≥ 18, `react-native` ≥ 0.73.

**Full guide:** [packages/multi-selectbox/README.md](./packages/multi-selectbox/README.md) — quick start, single/multi examples, scrolling hosts, props, types.

**Changelog / 1.x → 2.0:** [CHANGELOG.md](./CHANGELOG.md) · layout notes: [docs/MIGRATION.md](./docs/MIGRATION.md)

---

## Monorepo layout

```text
apps/example/                 # Expo SDK 56 demo (web + native)
packages/multi-selectbox/     # Publishable library (npm name: react-native-multi-selectbox)
docs/MIGRATION.md             # Migration plan & phase log
.github/workflows/ci.yml      # quality + GitHub Pages deploy
```

---

## Develop

Requires **Node 20+** and **pnpm 10+**.

```bash
pnpm install
pnpm example              # Expo start (offline by default) — press i / a / w
pnpm example:web          # browser via react-native-web
pnpm example:export:web   # static export → apps/example/dist (Pages)
pnpm typecheck
pnpm test                 # Jest (library) + example smoke
pnpm lint
pnpm format
pnpm --filter react-native-multi-selectbox build   # emit dist/ for publish
```

| Script                       | Purpose                             |
| ---------------------------- | ----------------------------------- |
| `pnpm example`               | Start Expo example (offline)        |
| `pnpm example:web`           | Start Expo web demo                 |
| `pnpm example:export:web`    | Static `expo export --platform web` |
| `pnpm typecheck`             | `tsc` in all packages               |
| `pnpm test` / `pnpm test:ci` | Library Jest + example host smoke   |
| `pnpm lint` / `pnpm format`  | ESLint / Prettier                   |

Demo hosts: [`apps/example/demos/SectionListHostDemo.tsx`](./apps/example/demos/SectionListHostDemo.tsx), [`ScrollViewHostDemo.tsx`](./apps/example/demos/ScrollViewHostDemo.tsx) · app chrome: [`apps/example/App.tsx`](./apps/example/App.tsx).

CI deploys the web demo to GitHub Pages on push to `master` / `main` ([workflow](./.github/workflows/ci.yml)).

### Publish (npm + GitHub Release)

1. Bump `packages/multi-selectbox/package.json` `version` and add notes under that version in [`CHANGELOG.md`](./CHANGELOG.md) (keep the package copy in sync).
2. Commit and push the version bump to `master`.
3. From the monorepo root:

```bash
pnpm publish:lib
# with npm OTP:
pnpm publish:lib -- --otp=123456
```

`publish:lib` publishes to npm, creates/pushes tag `vX.Y.Z`, and the [Release](./.github/workflows/release.yml) workflow creates or updates the matching GitHub Release from the CHANGELOG section.

- npm only (no tag / no GH release): `pnpm publish:lib -- --no-tag`
- dry-run: `pnpm publish:lib -- --dry-run`
- re-run release for an existing tag: **Actions → Release → Run workflow** and enter `vX.Y.Z`

---

## Contributing

1. Use **pnpm** from the repo root.
2. Library changes go in [`packages/multi-selectbox`](./packages/multi-selectbox); exercise with `pnpm example` / `pnpm test`.
3. Update **consumer docs** in [`packages/multi-selectbox/README.md`](./packages/multi-selectbox/README.md) when the public API or recommended usage changes; update this root README only for monorepo/dev concerns.
4. Keep Prettier/ESLint clean (`pnpm format` / `pnpm lint`).
5. Release notes go in [CHANGELOG.md](./CHANGELOG.md) (mirrored under the package for npm).

PRs and issues: [github.com/sauzy34/react-native-multi-selectbox](https://github.com/sauzy34/react-native-multi-selectbox).

---

## License

[MIT](./LICENSE) © [Saurav Gupta](https://github.com/sauzy34)
