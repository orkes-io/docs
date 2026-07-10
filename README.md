# Orkes Conductor - Documentation

This site is built with [MkDocs](https://www.mkdocs.org/). Page source lives as `.mdx` files under `docs/`; the actual MkDocs site (`mkdocs_content/`, `mkdocs.yml`, `index.md`, `custom.css`, `.mkdocs-routes.txt`) is **generated** from that source by `scripts/generate-mkdocs-site.js` — don't hand-edit generated files, edit the `.mdx` source instead.

### Installation

```
npm install
pip install -r requirements.txt
```

### Fetch shared OSS docs

Some pages pull content from the open-source `conductor-oss/conductor` repo (see `shared-docs.lock.yml`). Fetch it once before building or previewing:

```
npm run fetch:oss-docs
```

Re-run this if you get an `OSS docs source not found` error, or if you need to pick up newer OSS docs (bump the `ref` in `shared-docs.lock.yml` first).

### Updating a doc page

1. Edit the relevant `.mdx` file under [`docs/`](https://github.com/orkes-io/docs/tree/main/docs).
2. Preview locally with:
   ```
   npm run dev
   ```
   This regenerates the MkDocs site and rebuilds/serves it on every save.
3. Commit and push. CI builds the site fresh (including `llms.txt`/`llms-full.txt`, which are fully auto-generated from current doc content) and deploys it — no manual deploy step needed.

### One-off build + serve

If you just want a single build without the file watcher:

```
npm run serve
```

### Build only

```
npm run build
```

Generates the MkDocs site (via `generate-mkdocs-site.js` + `mkdocs build` + postprocessing) without serving it.

### Auditing

```
npm run audit:docs
```

Runs `scripts/audit-docs-build.js` against the generated site — this also runs in CI and can fail the deploy independently of the MkDocs build itself.
