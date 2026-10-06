# Orkes Conductor - Documentation

This site is built with [MkDocs](https://www.mkdocs.org/). Page source lives as `.mdx` files under `docs/`. The actual MkDocs site (`mkdocs_content/`, `mkdocs.yml`, and `.mkdocs-routes.txt`) is **generated** from that source by `scripts/generate-mkdocs-site.js`. This includes `mkdocs_content/index.md` and `mkdocs_content/css/custom.css`. Don't hand-edit generated files; edit the `.mdx` source instead.

The site merges two sources:

- **Enterprise content**, authored in this repo under `docs/`.
- **Shared OSS content**, pulled from the entire `docs/` folder of the open-source [`conductor-oss/conductor`](https://github.com/conductor-oss/conductor) repo (see `shared-docs.lock.yml`). Fixes to shared pages must be made in `conductor-oss/conductor`, not here.

### Installation

```
pip install -r requirements.txt
```

Node.js 18 or later is also required. There are no npm dependencies to install.

### Fetch shared OSS docs

Fetch the OSS docs once before building or previewing:

```
npm run fetch:oss-docs
```

This pulls the latest `main` of `conductor-oss/conductor` into `.cache/conductor-oss`. Re-run it if you get an `OSS docs source not found` error, or to pick up newer OSS docs.

### Updating a doc page

1. Edit the relevant `.mdx` file under [`docs/`](https://github.com/orkes-io/docs/tree/refactor/docs-oss-enterprise-merge/docs).
2. Preview locally with:
   ```
   npm run dev
   ```
   This regenerates the MkDocs site and rebuilds and serves it on every save, at http://127.0.0.1:3025/content/.
3. Commit and push. CI builds the site fresh, including `llms.txt` and `llms-full.txt`, which are fully auto-generated from the current doc content. No manual deploy step is needed.

### Running the generator locally

The generator is not idempotent against the committed `mkdocs_content/` tree. If the fetched OSS docs are at a different commit than the one that produced the committed files, a local build can change hundreds of unrelated files. After any local build, run `git status` and discard stray changes to `mkdocs_content/`, `mkdocs.yml`, and `.mkdocs-routes.txt` before committing:

```
git checkout -- mkdocs_content/ mkdocs.yml .mkdocs-routes.txt
```

### One-off build + serve

If you just want a single build without the file watcher:

```
npm run serve
```

### Build only

```
npm run build
```

Generates the MkDocs site (via `generate-mkdocs-site.js` + `mkdocs build` + postprocessing) into `build/` without serving it.

### Auditing

```
npm run audit:docs
```

Runs `scripts/audit-docs-build.js` against the generated site. This also runs in CI and can fail the deploy independently of the MkDocs build itself.

### Legacy files

`docusaurus.config.js`, `babel.config.js`, `src/`, `plugin/`, and `yarn.lock` are left over from the previous Docusaurus site and are not used by the MkDocs build. `sidebars.js` is still used: the generator reads it to build the navigation.
