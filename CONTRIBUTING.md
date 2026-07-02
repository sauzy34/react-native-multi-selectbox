# Contributing

Thanks for helping improve **react-native-multi-selectbox**.

## Setup

Requires **Node 20+** and **pnpm 10+**.

```bash
pnpm install
```

## Repo layout

```text
apps/example/                 # Expo demo (web + native)
packages/multi-selectbox/     # Publishable library (npm: react-native-multi-selectbox)
docs/MIGRATION.md             # 1.x → 2.0 migration notes
.github/workflows/            # CI, Pages deploy, GitHub Releases on v* tags
```

## Develop

```bash
pnpm example              # Expo start (offline by default) — press i / a / w
pnpm example:web          # browser via react-native-web
pnpm example:export:web   # static export → apps/example/dist
pnpm typecheck
pnpm test                 # Jest (library) + example smoke
pnpm lint
pnpm format
pnpm --filter react-native-multi-selectbox build
```

| Script                       | Purpose                             |
| ---------------------------- | ----------------------------------- |
| `pnpm example`               | Start Expo example (offline)        |
| `pnpm example:web`           | Start Expo web demo                 |
| `pnpm example:export:web`    | Static `expo export --platform web` |
| `pnpm typecheck`             | `tsc` in all packages               |
| `pnpm test` / `pnpm test:ci` | Library Jest + example host smoke   |
| `pnpm lint` / `pnpm format`  | ESLint / Prettier                   |

Demo sources: [`apps/example/demos/`](./apps/example/demos/) · app chrome: [`apps/example/App.tsx`](./apps/example/App.tsx).

CI runs quality checks and deploys the web demo to GitHub Pages on push to `master` / `main`.

## Guidelines

1. Use **pnpm** from the repo root.
2. Library code lives in [`packages/multi-selectbox`](./packages/multi-selectbox). Exercise changes with `pnpm example` and `pnpm test`.
3. Public API / consumer docs: update [`packages/multi-selectbox/README.md`](./packages/multi-selectbox/README.md).
4. Keep Prettier and ESLint clean (`pnpm format` / `pnpm lint`).
5. User-facing changes: add a section under the next version in [CHANGELOG.md](./CHANGELOG.md) (keep the copy under the package in sync for npm).

## Publish (maintainers)

1. Bump `version` in `packages/multi-selectbox/package.json` and add notes under that version in [CHANGELOG.md](./CHANGELOG.md) (keep the package copy in sync).
2. Commit and push to `master`.
3. From the monorepo root:

```bash
pnpm publish:lib
# with npm OTP if required:
pnpm publish:lib -- --otp=123456
```

`publish:lib` publishes to npm, creates/pushes tag `vX.Y.Z`, and the [Release](./.github/workflows/release.yml) workflow creates or updates the matching GitHub Release from the CHANGELOG section.

- npm only (no tag / no GH release): `pnpm publish:lib -- --no-tag`
- dry-run: `pnpm publish:lib -- --dry-run`
- re-run release for an existing tag: **Actions → Release → Run workflow** and enter `vX.Y.Z`

Publish only from the library package (the repo root is a private monorepo workspace).

## Pull requests

Open PRs against `master`. Describe the problem, the approach, and how you verified it (tests / example app).

Issues and PRs: [github.com/sauzy34/react-native-multi-selectbox](https://github.com/sauzy34/react-native-multi-selectbox).
