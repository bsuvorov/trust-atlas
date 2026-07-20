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
  body { background: ${PAPER}; color: ${INK}; }
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

// Interprets short yes/no/qualitative values into a colored dot + label.
// Used across spec tables so a reader can scan a column fast.
export function Verdict({ value }) {
  const v = (value || "").toLowerCase();
  let color = "#9A9488";
  if (/\byes\b|strong|excellent|high|open|standard|removed|^no,/.test(v))
    color = SAGE;
  if (/^no\b|weak|poor|closed|sealed|not a stacking|minimal/.test(v)) color = OXBLOOD;
  if (/medium|moderate|low-medium|awkward|good/.test(v)) color = "#B07A2E";
  return (
    <span
      className="inline-block rounded-full"
      style={{ width: 8, height: 8, background: color, flex: "0 0 auto" }}
      aria-hidden="true"
    />
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
