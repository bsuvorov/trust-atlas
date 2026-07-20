// Objectives Guide — the decision-tree view. Start from what the client is
// trying to achieve; each objective routes to the structure to start with and
// why. Cross-links carry you into the trust pages.
import { useState } from "react";
import { INK, PAPER, OXBLOOD, SAGE, LINE } from "../theme.jsx";
import { Link } from "../lib/router.jsx";
import { PageWrap, PageHeader } from "../components/PageBits.jsx";
import { GlossaryText } from "../lib/glossary.jsx";
import { CrossLink } from "../lib/crosslink.jsx";
import objectives from "../data/objectives.json";

export default function ObjectivesGuide() {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const rows = query
    ? objectives.filter(
        (o) =>
          o.objective.toLowerCase().includes(query) ||
          o.startWith.toLowerCase().includes(query) ||
          o.reason.toLowerCase().includes(query)
      )
    : objectives;

  return (
    <PageWrap>
      <PageHeader
        eyebrow="Decision tree · 19 objectives"
        title="Objectives Guide"
        lede="The same territory as the Situation Guide, approached from intent: name the objective, and the tree points to the structure to start with — and the reason. Invert first — several objectives resolve to no irrevocable trust at all."
      />

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Filter objectives — e.g. 'grandchildren', 'liquidity', 'non-citizen'…"
        className="ta-body ta-noprint mt-6 w-full rounded-md px-4 py-2.5 text-[14px]"
        style={{ background: "#FFFFFF", border: `1px solid ${LINE}`, color: INK, outline: "none" }}
      />

      <div className="mt-6 flex flex-col gap-px overflow-hidden rounded-lg" style={{ border: `1px solid ${LINE}` }}>
        {rows.map((o, i) => (
          <div
            key={o.id}
            className="ta-avoid-break grid grid-cols-1 gap-4 p-5 sm:grid-cols-[1fr_1fr]"
            style={{ background: "#FFFFFF", borderTop: i === 0 ? "none" : `1px solid ${LINE}` }}
          >
            <div className="flex gap-3">
              <span className="ta-display text-lg font-semibold" style={{ color: "#C9C3B6", minWidth: 26 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="ta-mono text-[10px] uppercase tracking-widest" style={{ color: SAGE }}>
                  If the objective is
                </div>
                <p className="ta-body mt-1 text-[14.5px] font-medium leading-snug" style={{ color: INK }}>
                  {o.objective}
                </p>
              </div>
            </div>
            <div className="sm:border-l sm:pl-4" style={{ borderColor: LINE }}>
              <div className="ta-mono text-[10px] uppercase tracking-widest" style={{ color: OXBLOOD }}>
                Usually start with
              </div>
              <p className="ta-body mt-1 text-[14px] font-semibold leading-snug" style={{ color: OXBLOOD }}>
                <CrossLink>{o.startWith}</CrossLink>
              </p>
              <p className="ta-body mt-2 text-[12.5px] leading-relaxed" style={{ color: "#4A5262" }}>
                <GlossaryText>{o.reason}</GlossaryText>
              </p>
            </div>
          </div>
        ))}
        {rows.length === 0 && (
          <div className="ta-body p-6 text-center text-[13px]" style={{ background: "#fff", color: "#6A7280" }}>
            No objectives match “{q}”.
          </div>
        )}
      </div>

      <p className="ta-body mt-6 max-w-2xl text-[13px] leading-relaxed" style={{ color: "#6A7280" }}>
        Prefer to start from the client's circumstances instead of their goal?{" "}
        <Link to="/situations" style={{ color: OXBLOOD, textDecoration: "underline", textUnderlineOffset: 3 }}>
          Use the Situation Guide →
        </Link>
      </p>
    </PageWrap>
  );
}
