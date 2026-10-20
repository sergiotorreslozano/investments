# AGENTS.md — investments repo

## What this repo is
Markdown investment analysis documents + an Astro-based MD viewer.

## Structure
```
analysis/          # Source markdown files (single source of truth)
viewer/            # Astro + React + MDX static site
  src/
    content/analyses/   # Copied/synced from analysis/ for content collections
    pages/              # index.astro + analysis/[slug].astro
    layouts/Layout.astro
  package.json
  astro.config.mjs
README.md          # Index + framework summary
LICENSE            # Apache 2.0
```

## Viewer (Astro + React + MDX)

### Commands (run from `viewer/`)
```bash
npm install       # Install deps (Node 20+)
npm run dev       # Dev server at http://localhost:4321
npm run build     # Static build to viewer/dist/
npm run preview   # Preview production build
```

### How it works
- Content collections (`src/content/config.ts`) load markdown from `src/content/analyses/`
- Files are **copied** from `../analysis/` to `src/content/analyses/` (not symlinked)
- Titles extracted from first `# Heading` (no frontmatter required)
- Static site output — deploy anywhere (GitHub Pages, Netlify, Vercel)

### Adding new analyses
1. Add `.md` file to `analysis/` (source of truth)
2. Copy to `viewer/src/content/analyses/` (or sync via script)
3. Run `npm run build` in `viewer/`

### Sync script (optional)
```bash
cp analysis/*.md viewer/src/content/analyses/
```

## Conventions for analysis files
- Filename: `{Company|Sector}_{Descriptor}_Date.md`
- Date in filename: `YYYY-MM-DD` or `MonYYYY`
- Sections: Business Model → Moat → Financials → Valuation → Risks → Strategy → Austrian View
- Conservative valuation bias: explicit assumption evolution, probability-weighted optionality

## Working with this repo
- **Read analyses**: `read` or `glob` on `analysis/`
- **Write analyses**: Add to `analysis/` with filename convention above
- **Viewer dev**: `cd viewer && npm run dev`
- **No test/lint/CI** — pure document archive + static site