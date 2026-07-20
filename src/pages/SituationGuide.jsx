// Situation Guide + the printable research brief. Select up to five client
// situations; the page assembles a clean, print-optimized brief listing, per
// situation, the trusts to research, why they fit, and the watch-outs.
import { useState } from "react";
import { INK, PAPER, OXBLOOD, SAGE, LINE } from "../theme.jsx";
import { Link } from "../lib/router.jsx";
import { PageWrap, PageHeader } from "../components/PageBits.jsx";
import { GlossaryText } from "../lib/glossary.jsx";
import { CrossLink } from "../lib/crosslink.jsx";
import { DisclosureBlock, Attribution } from "../components/Disclaimer.jsx";
import situations from "../data/situations.json";

const MAX = 5;

function Check({ on, disabled }) {
  return (
    <span
      className="mt-0.5 flex shrink-0 items-center justify-center rounded"
      style={{
        width: 18,
        height: 18,
        border: `1.5px solid ${on ? OXBLOOD : disabled ? "#D8D3C8" : "#B7B1A5"}`,
        background: on ? OXBLOOD : "transparent",
        color: "#fff",
        fontSize: 11,
      }}
    >
      {on ? "✓" : ""}
    </span>
  );
}

export default function SituationGuide() {
  const [selected, setSelected] = useState([]);

  const toggle = (id) => {
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : s.length < MAX ? [...s, id] : s
    );
  };

  const chosen = selected
    .map((id) => situations.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <PageWrap>
      <div className="ta-noprint">
        <PageHeader
          eyebrow="18 client situations"
          title="Situation Guide"
          lede="Start from where the client actually is. Select up to five situations and generate a printable research brief — the trusts to look into, why they might fit, and how each one blows up."
        />

        {/* selection bar */}
        <div
          className="sticky top-[56px] md:top-[92px] z-20 mt-6 flex flex-wrap items-center gap-3 rounded-md px-4 py-3"
          style={{ background: INK }}
        >
          <span className="ta-mono text-[11px] uppercase tracking-widest" style={{ color: selected.length ? PAPER : "#7C8494" }}>
            {selected.length} / {MAX} selected
          </span>
          <div className="flex-1" />
          {selected.length > 0 && (
            <button
              onClick={() => setSelected([])}
              className="ta-body text-[12px] underline underline-offset-4"
              style={{ color: "#9AA1AD" }}
            >
              clear
            </button>
          )}
          <button
            onClick={() => window.print()}
            disabled={selected.length === 0}
            className="ta-body rounded-md px-4 py-2 text-[13px] font-semibold"
            style={{
              background: selected.length ? PAPER : "#3A424F",
              color: selected.length ? INK : "#7C8494",
              cursor: selected.length ? "pointer" : "not-allowed",
            }}
          >
            Print research brief
          </button>
        </div>

        {/* picker */}
        <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-2">
          {situations.map((s) => {
            const on = selected.includes(s.id);
            const disabled = !on && selected.length >= MAX;
            return (
              <button
                key={s.id}
                onClick={() => toggle(s.id)}
                disabled={disabled}
                className="ta-avoid-break flex gap-3 rounded-lg p-4 text-left transition-colors"
                style={{
                  background: on ? "#FFFDF8" : "#FFFFFF",
                  border: `1px solid ${on ? OXBLOOD : LINE}`,
                  opacity: disabled ? 0.5 : 1,
                  cursor: disabled ? "not-allowed" : "pointer",
                }}
              >
                <Check on={on} disabled={disabled} />
                <div>
                  <div className="ta-body text-[14px] font-semibold leading-snug" style={{ color: INK }}>
                    {s.situation}
                  </div>
                  <div className="ta-body mt-1.5 text-[12.5px] leading-snug" style={{ color: OXBLOOD }}>
                    <CrossLink>{s.trusts}</CrossLink>
                  </div>
                  <p className="ta-body mt-1.5 text-[12px] leading-snug" style={{ color: "#6A7280" }}>
                    {s.whyItFits}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------- the research brief (screen preview + print output) ---------- */}
      {chosen.length > 0 && (
        <div className="mt-12">
          {/* print letterhead */}
          <div className="ta-print-only mb-4" style={{ borderBottom: `2px solid ${INK}`, paddingBottom: 12 }}>
            <div className="ta-display text-2xl font-semibold">Trust Atlas — Research Brief</div>
            <div className="ta-mono text-[11px]" style={{ color: SAGE }}>
              Federal figures: July 2026 · §7520 5.2% · AFR long 4.98% · exemption $15M · rates reset monthly
            </div>
            <div className="mt-1">
              <Attribution />
            </div>
          </div>

          <div className="ta-noprint mb-4 flex items-center gap-3">
            <div className="ta-display text-2xl font-semibold">Your research brief</div>
            <span className="ta-mono text-[11px] uppercase tracking-widest" style={{ color: SAGE }}>
              {chosen.length} situation{chosen.length > 1 ? "s" : ""}
            </span>
          </div>

          {/* disclosure travels with the brief (screen preview + print) */}
          <div className="mb-5">
            <DisclosureBlock />
          </div>

          <div
            className="rounded-lg"
            style={{ background: "#FFFFFF", border: `1px solid ${LINE}` }}
          >
            {chosen.map((s, i) => (
              <div
                key={s.id}
                className="ta-avoid-break p-6"
                style={{ borderTop: i === 0 ? "none" : `1px solid ${LINE}` }}
              >
                <div className="ta-mono text-[11px] uppercase tracking-widest" style={{ color: SAGE }}>
                  Situation {i + 1}
                </div>
                <h3 className="ta-display mt-1 text-xl font-semibold leading-snug" style={{ color: INK }}>
                  {s.situation}
                </h3>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1fr]">
                  <div>
                    <div className="ta-mono text-[10.5px] uppercase tracking-widest" style={{ color: OXBLOOD }}>
                      Trusts to research
                    </div>
                    <p className="ta-body mt-1 text-[13.5px] font-medium leading-snug" style={{ color: INK }}>
                      <CrossLink>{s.trusts}</CrossLink>
                    </p>
                    <div className="ta-mono mt-3 text-[10.5px] uppercase tracking-widest" style={{ color: SAGE }}>
                      Why it fits
                    </div>
                    <p className="ta-body mt-1 text-[13px] leading-relaxed" style={{ color: "#2A3140" }}>
                      <GlossaryText>{s.whyItFits}</GlossaryText>
                    </p>
                  </div>
                  <div
                    className="rounded-md p-3"
                    style={{ background: "#F6ECEA", borderLeft: `3px solid ${OXBLOOD}` }}
                  >
                    <div className="ta-mono text-[10.5px] uppercase tracking-widest" style={{ color: OXBLOOD }}>
                      Watch-outs — how it blows up
                    </div>
                    <p className="ta-body mt-1 text-[13px] leading-relaxed" style={{ color: INK }}>
                      <GlossaryText>{s.watchOuts}</GlossaryText>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="ta-print-only mt-4 text-[10.5px] leading-relaxed" style={{ color: "#5A6170" }}>
            Educational reference only — not legal, tax, or financial advice. Consult your own qualified
            legal, tax, and financial advisors before acting. Verify all federal figures in the month of
            any transfer. Compiled by Three Main Points · threemainpoints.com
          </p>
        </div>
      )}
    </PageWrap>
  );
}
