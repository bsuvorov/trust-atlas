# Trust Atlas

A reference atlas of irrevocable trust structures — built to be read one trust
at a time, compared three at a time, and printed as a client research brief.

**Five sections:**

- **Explore Trusts** — the eight core lifetime-transfer vehicles (SLAT, ILIT,
  GRAT, IDGT, Dynasty, CRT, QPRT, CLAT). Lineup grid → full "product page" per
  trust → select up to three and compare side by side.
- **Situational Trusts** — the six at-death / special-purpose structures
  (Credit Shelter, QTIP, QDOT, SNT, DAPT, BDIT), which use their own schema.
- **Case Studies** — how prominent families (Walton, Zuckerberg, Adelson,
  Onassis, Lauder, Knight) used these structures, drawn from public record and
  clearly labeled illustrative.
- **Situation Guide** — 18 client situations. Select up to five and print a
  research brief: trusts to research, why they fit, and the watch-outs.
- **Objectives Guide** — the 19-row decision tree: name the objective, get the
  structure to start with and why.

Plus a **Reference** area (key federal figures, GST & ETIP explainers, state
panel, 35-term glossary) that the rest of the site links into. Jargon gets
hover-definition tooltips everywhere it appears.

The palette and type are shared with the sibling `irrevocable-trust-framework`
site (ink / paper / oxblood / sage; Fraunces + IBM Plex). This is a separate
repository and shares no code with it.

## Data

All trust content comes from a practitioner workbook
(`scripts/Trust_Structures_Lookup_v2_2.xlsx`), extracted to JSON in
`src/data/`. The spreadsheet is the source of truth — edit it, then re-extract.
Case-study content lives in `src/data/cases.json` (hand-authored from public
record). Figures are July 2026; the §7520 rate and AFR reset monthly.

## Develop

```
npm install          # once
npm run extract      # regenerate src/data/*.json from the workbook (needs python3 + openpyxl)
npm run build        # bundle app.js + app.css (commit these — GitHub Pages serves them)
npm run dev          # incremental esbuild watch
node scripts/smoke.mjs  # server-render every page to catch runtime errors
```

Open `index.html` directly, or serve the folder with any static server. The
build has no runtime server dependency; React is bundled and the site is a
static SPA with hash routing (works on GitHub Pages).

This site is an educational reference and does not represent legal, tax, or
financial advice. Verify all federal figures in the month of any transfer.
