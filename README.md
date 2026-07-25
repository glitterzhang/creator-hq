# CreatorHQ

The lightweight client and income tracker for freelance creators. A Morrow AI product.
Ships as a free in-browser app and a native desktop app (Mac + Windows, via Tauri).

## Repo structure

```
creator-hq/
├── index.html            # marketing site (homepage)
├── privacy.html           # privacy policy
├── web/
│   └── creator-tracker-app.html   # SINGLE SOURCE OF TRUTH for the app — edit this file only
├── app/
│   └── index.html         # generated copy of web/creator-tracker-app.html, served at /app/
├── desktop-app/            # Tauri v2 project (native Mac/Windows app)
│   ├── package.json
│   ├── scripts/sync-frontend.mjs   # copies web/creator-tracker-app.html into frontend/ before dev/build
│   └── src-tauri/          # Rust backend
├── scripts/build-site.mjs  # builds dist/ (index.html, privacy.html, app/index.html) for deployment
└── package.json            # site build: npm run build → runs scripts/build-site.mjs
```

**Never hand-edit `app/index.html` or `desktop-app/frontend/index.html`** — both are generated
copies of `web/creator-tracker-app.html`. Edit that one file; both the web build and the desktop
app pick up changes from it.

The app detects which context it's running in via:

```js
const IS_DESKTOP = typeof window !== "undefined" && !!window.__TAURI__;
```

This gates desktop-only features (folder sync) so the exact same file works identically as a
plain web page and inside the Tauri shell.

## Local development

**Web / marketing site:**

```bash
npm install
npm run build   # builds dist/ from index.html, privacy.html, and web/creator-tracker-app.html
```

Then open the files in `dist/` directly, or serve that directory with any static file server.

**Desktop app:**

```bash
cd desktop-app
npm install
npm run dev      # launches the native app in dev mode
npm run build     # produces installers under desktop-app/src-tauri/target/release/bundle/
```

Requires the Rust toolchain (`rustup`) installed locally.

## Deployment

- **Site**: deployed to Vercel from this repo. Framework preset "Other", build command
  `npm run build`, output directory `dist` — only the files meant to be public (the marketing
  homepage, privacy page, and the app) get deployed; source files like `desktop-app/` and
  `scripts/` never reach the live site.
- **Desktop installers**: built locally (or via CI) with `tauri build` and attached to GitHub
  Releases. The desktop app is not yet code-signed/notarized — first launch shows an
  "unidentified developer" warning on both macOS and Windows; this is expected until signing is
  set up.

## Data & privacy

Both versions store data locally only (browser localStorage for the web version, a local file
for the desktop version) — no account or server is required for core functionality. See
[privacy.html](./privacy.html) for details.
