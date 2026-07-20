// Shared design tokens and small UI primitives.
// Palette and type are carried over from the sibling
// irrevocable-trust-framework site: an editorial "private-client" look.

export const INK = "#1C2430";
export const PAPER = "#F7F6F2";
export const OXBLOOD = "#7A2E2E";
export const SAGE = "#5C6B5E";
export const LINE = "#D9D5CC";

// Injected once at the app root. @import pulls the three families; the rest are
// small helpers Tailwind doesn't cover (font classes, fade-in, print rules).
export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
  .ta-display { font-family: 'Fraunces', Georgia, serif; }
  .ta-body { font-family: 'IBM Plex Sans', -apple-system, sans-serif; }
  .ta-mono { font-family: 'IBM Plex Mono', monospace; }
  body { background: ${PAPER}; color: ${INK}; overflow-wrap: break-word; }
  /* long tokens (dollar ranges, statute cites) never force horizontal scroll */
  .ta-body, .ta-mono, .ta-display { overflow-wrap: break-word; }
  .ta-fade { animation: taFade .3s ease both; }
  @keyframes taFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
  .ta-term { border-bottom: 1px dotted ${SAGE}; cursor: help; }
  .ta-tip { box-shadow: 0 8px 30px rgba(28,36,48,.16); }
  @media (prefers-reduced-motion: reduce) { .ta-fade { animation: none; } }

  /* Print: hide chrome, open up layout for a clean research brief. */
  @media print {
    .ta-noprint { display: none !important; }
    .ta-print-only { display: block !important; }
    body { background: #fff; }
    a { color: inherit; text-decoration: none; }
    .ta-fade { animation: none; }
    .ta-page { padding: 0 !important; }
    .ta-avoid-break { break-inside: avoid; }
  }
  .ta-print-only { display: none; }
`;

// ---- primitives ------------------------------------------------------------

export function Eyebrow({ children, color = OXBLOOD, className = "" }) {
  return (
    <div
      className={`ta-mono uppercase tracking-widest text-[11px] font-medium ${className}`}
      style={{ color }}
    >
      {children}
    </div>
  );
}

export function Badge({ children, tone = "neutral" }) {
  const tones = {
    neutral: { bg: "#EEECE5", fg: INK, bd: LINE },
    ox: { bg: "#F1E4E1", fg: OXBLOOD, bd: "#E2C9C4" },
    sage: { bg: "#E7ECE6", fg: SAGE, bd: "#CFD9CC" },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span
      className="ta-mono inline-block rounded px-2 py-0.5 text-[11px] font-medium whitespace-nowrap"
      style={{ background: t.bg, color: t.fg, border: `1px solid ${t.bd}` }}
    >
      {children}
    </span>
  );
}

// ---- verdict dots ----------------------------------------------------------
// A colored dot gives an at-a-glance *favorability* reading of a spec value,
// from the perspective of a typical estate-planning goal. It is a general
// scanning aid, NOT a rating or recommendation — the full cell text always
// shows next to it. Polarity is attribute-aware (e.g. "in estate: No" is an
// advantage; "mortality risk: High" is a watch-out).

export const VERDICT_LEVELS = {
  good: { mark: "✓", color: SAGE, bg: "#E7ECE6", bd: "#CFD9CC", label: "Advantage" },
  mixed: { mark: "~", color: "#9A6A1E", bg: "#F5EEE1", bd: "#E6D8BE", label: "Mixed / depends" },
  caution: { mark: "✕", color: OXBLOOD, bg: "#F1E4E1", bd: "#E2C9C4", label: "Watch-out" },
  na: { mark: "–", color: "#8A8578", bg: "#EEECE5", bd: LINE, label: "N/A · informational" },
};

export function verdictLevel(key, value) {
  const v = (value || "").toLowerCase();
  const has = (re) => re.test(v);
  switch (key) {
    case "inEstate":
      if (has(/^no\b|^no,|removed/)) return "good";
      if (has(/only if|during the term|note balance: yes|yes during/)) return "mixed";
      return "caution";
    case "basisStepUp":
      if (has(/not relevant|not applicable/)) return "na";
      if (has(/^yes/)) return "good";
      return "caution";
    case "assetProtection":
      if (has(/strong|excellent/)) return "good";
      if (has(/good|moderate/)) return "mixed";
      if (has(/weak|poor/)) return "caution";
      return "mixed";
    case "swapPower":
      if (has(/^standard|^common|^yes/)) return "good";
      if (has(/^no\b|version: no/)) return "caution";
      return "mixed";
    case "gstStatus":
      if (has(/not applicable/)) return "na";
      if (has(/excellent|entire point|can be fully|^usually gst exempt/)) return "good";
      if (has(/awkward|^poor/)) return "caution";
      return "mixed";
    case "qsbsFit":
      if (has(/not applicable/)) return "na";
      if (has(/^yes\b/)) return "good";
      return "caution";
    case "mortalityRisk":
    case "complexity":
      if (has(/^high/)) return "caution";
      if (has(/low-medium|^medium/)) return "mixed";
      if (has(/^low/)) return "good";
      return "mixed";
    case "popularity":
      if (has(/^high/)) return "good";
      if (has(/^low/)) return "caution";
      return "mixed";
    default:
      return "na";
  }
}

// key + value → a legible mark chip. (level can be passed directly for legends.)
export function Verdict({ k, value, level, size = 18 }) {
  const lvl = level || verdictLevel(k, value);
  const t = VERDICT_LEVELS[lvl] || VERDICT_LEVELS.na;
  return (
    <span
      className="ta-mono inline-flex items-center justify-center font-semibold"
      title={t.label}
      style={{
        width: size,
        height: size,
        borderRadius: 4,
        background: t.bg,
        color: t.color,
        border: `1px solid ${t.bd}`,
        fontSize: Math.round(size * 0.62),
        lineHeight: 1,
        flex: "0 0 auto",
      }}
    >
      {t.mark}
    </span>
  );
}

// Legend explaining the dots. Placed wherever dots are shown.
export function VerdictLegend({ className = "", note = true }) {
  return (
    <div
      className={`ta-mono flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[10.5px] ${className}`}
      style={{ color: SAGE }}
    >
      {Object.entries(VERDICT_LEVELS).map(([lvl, t]) => (
        <span key={lvl} className="flex items-center gap-1.5">
          <Verdict level={lvl} size={16} />
          <span style={{ color: "#5A6170" }}>{t.label}</span>
        </span>
      ))}
      {note && (
        <span style={{ color: "#8A8578" }}>
          · at-a-glance only, not a rating — read the full text
        </span>
      )}
    </div>
  );
}

export function Card({ children, className = "", style = {} }) {
  return (
    <div
      className={`rounded-lg ${className}`}
      style={{ background: "#FFFFFF", border: `1px solid ${LINE}`, ...style }}
    >
      {children}
    </div>
  );
}
