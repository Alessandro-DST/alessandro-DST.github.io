# alessandro-DST.github.io

Personal portfolio site built with [Astro](https://astro.build) and Tailwind CSS. Fully static output, deployed to GitHub Pages.

## Run locally

```sh
npm install
npm run dev      # http://localhost:4321
```

## Build

```sh
npm run build    # static site in dist/
npm run preview  # serve the production build locally
```

## Structure

- `src/pages/index.astro` — the single page
- `src/components/` — page sections (Header, About, Projects, Footer)
- `src/components/diagram/` — self-contained interactive infrastructure diagram. Edit `data.ts` to change nodes, edges and popup content — no code changes needed.

> **⚠ Diagram data policy:** `src/components/diagram/data.ts` is published on a public website in a public repo. Only sanitized, generic data belongs there — never real IP addresses, hostnames, credentials or internal domain names.

## Deployment (GitHub Pages)

- Deploys via GitHub Actions on push to `main`. Add the workflow file at `.github/workflows/deploy.yml` (not included in this scaffold).
- One-time setup: in the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.
- `astro.config.mjs` sets `site: 'https://alessandro-DST.github.io'`. This is a user site served from the domain root, so no `base` path is configured.
