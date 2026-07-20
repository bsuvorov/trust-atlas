// Glossary tooltips. GlossaryText scans a string for known terms/acronyms and
// wraps the first occurrence of each in a hover-and-focus tooltip sourced from
// the workbook's Glossary tab. Deliberately conservative: whole-word matches,
// first occurrence only, so long-form copy stays readable.
import { useState } from "react";
import { SAGE } from "../theme.jsx";
import glossary from "../data/glossary.json";

// alias (what appears in prose) -> a substring that identifies the glossary row.
const ALIAS_TO_KEY = [
  ["GST", "Generation-Skipping"],
  ["Generation-Skipping Transfer Tax", "Generation-Skipping"],
  ["ETIP", "Estate Tax Inclusion"],
  ["Estate Tax Inclusion Period", "Estate Tax Inclusion"],
  ["AFR", "Applicable Federal Rate"],
  ["Applicable Federal Rate", "Applicable Federal Rate"],
  ["Section 7520", "Section 7520"],
  ["7520 rate", "Section 7520"],
  ["OBBBA", "One Big Beautiful"],
  ["QSBS", "Qualified Small Business Stock"],
  ["Section 1202", "Qualified Small Business Stock"],
  ["stacking", "QSBS stacking"],
  ["non-grantor", "Non-grantor trust"],
  ["grantor trust", "Grantor trust"],
  ["IDGT", "Intentionally Defective"],
  ["seed gift", "Seed gift"],
  ["seed capital", "Seed gift"],
  ["swap power", "Swap power"],
  ["substitution power", "Swap power"],
  ["basis step-up", "Step-up in basis"],
  ["step-up", "Step-up in basis"],
  ["carryover basis", "Step-up in basis"],
  ["portability", "Portability"],
  ["Crummey", "Crummey power"],
  ["reciprocal trust", "Reciprocal trust doctrine"],
  ["zeroed-out", "Zeroed-out"],
  ["Section 2701", "Section 2701"],
  ["vertical slice", "Section 2701"],
  ["Section 2036", "Section 2036"],
  ["CRUT", "CRUT / CRAT"],
  ["CRAT", "CRUT / CRAT"],
  ["CLAT", "CLAT / CLUT"],
  ["CLUT", "CLAT / CLUT"],
  ["Donor-Advised Fund", "Donor-Advised Fund"],
  ["DAF", "Donor-Advised Fund"],
  ["QTIP", "Qualified Terminable"],
  ["reverse-QTIP", "Reverse-QTIP"],
  ["Credit Shelter", "Credit Shelter"],
  ["bypass trust", "Credit Shelter"],
  ["QDOT", "Qualified Domestic"],
  ["Special Needs Trust", "Special Needs Trust"],
  ["SNT", "Special Needs Trust"],
  ["DAPT", "Domestic Asset Protection"],
  ["BDIT", "Beneficiary Defective"],
  ["ING", "Incomplete-gift"],
  ["throwback tax", "Throwback tax"],
  ["Prop 19", "Prop 19"],
  ["assignment of income", "Assignment of income"],
  ["decant", "Decanting"],
  ["HEMS", "HEMS"],
];

// Resolve each alias to its definition once at module load.
function buildIndex() {
  const byKey = {};
  for (const row of glossary) byKey[row.term.toLowerCase()] = row;
  const entries = [];
  for (const [alias, key] of ALIAS_TO_KEY) {
    const row = glossary.find((g) =>
      g.term.toLowerCase().includes(key.toLowerCase())
    );
    if (row) entries.push({ alias, term: row.term, definition: row.definition });
  }
  // Longest aliases first so "Section 7520 rate" wins over "7520 rate".
  entries.sort((a, b) => b.alias.length - a.alias.length);
  return entries;
}

const INDEX = buildIndex();

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// One combined regex, alternation ordered longest-first.
const MASTER_RE = new RegExp(
  "\\b(" + INDEX.map((e) => escapeRe(e.alias)).join("|") + ")\\b",
  "gi"
);

export function Term({ label, definition, term }) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className="ta-term relative"
      tabIndex={0}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {label}
      {open && (
        <span
          role="tooltip"
          className="ta-tip ta-body absolute left-0 top-full z-30 mt-1 block w-72 rounded-md p-3 text-[12.5px] font-normal leading-snug"
          style={{ background: "#FFFFFF", border: `1px solid ${SAGE}`, color: "#2A3140" }}
        >
          <span className="ta-mono mb-1 block text-[10px] uppercase tracking-widest" style={{ color: SAGE }}>
            {term}
          </span>
          {definition}
        </span>
      )}
    </span>
  );
}

// Turn a plain string into React nodes with the first hit of each term wrapped.
export function GlossaryText({ children }) {
  const text = typeof children === "string" ? children : "";
  if (!text) return children || null;

  const used = new Set();
  const nodes = [];
  let last = 0;
  let m;
  MASTER_RE.lastIndex = 0;
  while ((m = MASTER_RE.exec(text)) !== null) {
    const hit = m[0];
    const entry = INDEX.find((e) => e.alias.toLowerCase() === hit.toLowerCase());
    if (!entry || used.has(entry.term)) continue;
    used.add(entry.term);
    if (m.index > last) nodes.push(text.slice(last, m.index));
    nodes.push(
      <Term key={m.index} label={hit} term={entry.term} definition={entry.definition} />
    );
    last = m.index + hit.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}
