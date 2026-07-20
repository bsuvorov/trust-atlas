// Small building blocks shared across pages.
import { INK, OXBLOOD, SAGE, LINE } from "../theme.jsx";
import { Eyebrow } from "../theme.jsx";
import { GlossaryText } from "../lib/glossary.jsx";

export function PageWrap({ children, className = "" }) {
  return <div className={`mx-auto max-w-6xl px-5 py-8 ${className}`}>{children}</div>;
}

export function PageHeader({ eyebrow, title, lede }) {
  return (
    <div className="max-w-3xl">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h1 className="ta-display mt-2 text-3xl font-semibold leading-tight sm:text-4xl">
        {title}
      </h1>
      {lede && (
        <p className="ta-body mt-3 text-[15px] leading-relaxed" style={{ color: "#4A5262" }}>
          {lede}
        </p>
      )}
    </div>
  );
}

// A titled content block used down every detail page.
export function Section({ label, children, className = "" }) {
  return (
    <section className={`ta-avoid-break ${className}`}>
      <div
        className="ta-mono mb-3 border-b pb-1.5 text-[11px] uppercase tracking-widest"
        style={{ color: SAGE, borderColor: LINE }}
      >
        {label}
      </div>
      {children}
    </section>
  );
}

// Body copy with glossary tooltips applied.
export function Prose({ children, className = "", size = "15px" }) {
  return (
    <p
      className={`ta-body leading-relaxed ${className}`}
      style={{ fontSize: size, color: "#2A3140" }}
    >
      <GlossaryText>{children}</GlossaryText>
    </p>
  );
}

// A label / value pair for spec grids.
export function SpecRow({ label, children }) {
  return (
    <div className="ta-avoid-break border-b py-2.5" style={{ borderColor: LINE }}>
      <div className="ta-mono text-[10.5px] uppercase tracking-widest" style={{ color: SAGE }}>
        {label}
      </div>
      <div className="ta-body mt-1 text-[13.5px] leading-snug" style={{ color: "#2A3140" }}>
        {children}
      </div>
    </div>
  );
}

export function Callout({ tone = "ox", label, children }) {
  const bg = tone === "ox" ? "#F6ECEA" : "#EBF0EA";
  const bar = tone === "ox" ? OXBLOOD : SAGE;
  return (
    <div
      className="ta-avoid-break rounded-md p-4"
      style={{ background: bg, borderLeft: `3px solid ${bar}` }}
    >
      {label && (
        <div className="ta-mono mb-1 text-[10.5px] uppercase tracking-widest" style={{ color: bar }}>
          {label}
        </div>
      )}
      <div className="ta-body text-[13.5px] leading-relaxed" style={{ color: INK }}>
        {children}
      </div>
    </div>
  );
}
