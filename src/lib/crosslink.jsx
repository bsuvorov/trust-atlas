// Turns trust names and abbreviations appearing in prose into links to the
// relevant detail page. This is the web value the spreadsheet can't give:
// the "combinations" and "trusts to consider" fields become navigable.
import { Link } from "./router.jsx";
import { OXBLOOD } from "../theme.jsx";
import trustsData from "../data/trusts.json";
import situationalData from "../data/situational.json";

// Build alias -> route. Order longest-first so full names beat acronyms.
function buildIndex() {
  const entries = [];
  const add = (alias, to) => entries.push({ alias, to });
  for (const t of trustsData.trusts) {
    const to = `/trusts/${t.id}`;
    add(t.abbr, to);
    // Full name without the trailing "(ABBR)" and any "— …" qualifier.
    const full = t.name.replace(/\s*\(.*$/, "").replace(/\s*—.*$/, "").trim();
    if (full.length > 4) add(full, to);
  }
  for (const t of situationalData.trusts) {
    const to = `/situational/${t.id}`;
    add(t.abbr, to);
    const full = t.name.replace(/\s*\(.*$/, "").replace(/\s*—.*$/, "").trim();
    if (full.length > 4) add(full, to);
  }
  // A few spelled-out variants that appear in prose.
  add("Charitable Remainder Trust", "/trusts/crt");
  add("Charitable Remainder Unitrust", "/trusts/crt");
  add("Charitable Lead Annuity Trust", "/trusts/clt");
  add("Charitable Lead Trust", "/trusts/clt");
  add("Dynasty Trust", "/trusts/dynasty");
  add("Family Limited Partnership", null);
  entries.sort((a, b) => b.alias.length - a.alias.length);
  return entries.filter((e) => e.to);
}

const INDEX = buildIndex();

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Whole-word matches only. Short acronyms otherwise link inside longer words —
// "ING" would light up inside the DING / NING / WING variants it is named with.
// The trailing lookahead still allows plurals ("GRATs") and possessives, with
// the suffix left outside the link text.
const MASTER_RE = new RegExp(
  "\\b(" + INDEX.map((e) => escapeRe(e.alias)).join("|") + ")(?=s?\\b)",
  "g"
);

// currentId: don't self-link the page you're already on.
export function CrossLink({ children, currentId }) {
  const text = typeof children === "string" ? children : "";
  if (!text) return children || null;

  const used = new Set();
  const nodes = [];
  let last = 0;
  let m;
  MASTER_RE.lastIndex = 0;
  while ((m = MASTER_RE.exec(text)) !== null) {
    const hit = m[0];
    const entry = INDEX.find((e) => e.alias === hit);
    if (!entry) continue;
    const isSelf = currentId && entry.to.endsWith(`/${currentId}`);
    if (used.has(entry.to) || isSelf) continue;
    used.add(entry.to);
    if (m.index > last) nodes.push(text.slice(last, m.index));
    nodes.push(
      <Link
        key={m.index}
        to={entry.to}
        style={{ color: OXBLOOD, textDecoration: "underline", textUnderlineOffset: 3 }}
      >
        {hit}
      </Link>
    );
    last = m.index + hit.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}
