// The lineup: a grid of the eight core trusts. Each card links to its detail
// page and carries a compare checkbox (Apple-style select-to-compare).
import { INK, OXBLOOD, SAGE, LINE } from "../theme.jsx";
import { Badge } from "../theme.jsx";
import { Link } from "../lib/router.jsx";
import { PageWrap, PageHeader } from "../components/PageBits.jsx";
import { useCompare, toggleCompare, MAX_COMPARE } from "../lib/compare.jsx";
import { firstClause, leadWord, costRange, exemptionLabel } from "../lib/trustmeta.js";
import trustsData from "../data/trusts.json";

function CompareToggle({ id }) {
  const ids = useCompare();
  const on = ids.includes(id);
  const full = ids.length >= MAX_COMPARE && !on;
  return (
    <label
      className="ta-mono flex cursor-pointer select-none items-center gap-1.5 text-[11px]"
      style={{ color: full ? "#B4AFA4" : on ? OXBLOOD : SAGE, cursor: full ? "not-allowed" : "pointer" }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!full) toggleCompare(id);
      }}
    >
      <span
        className="flex items-center justify-center rounded"
        style={{
          width: 15,
          height: 15,
          border: `1.5px solid ${on ? OXBLOOD : "#C4BFB4"}`,
          background: on ? OXBLOOD : "transparent",
          color: "#fff",
          fontSize: 10,
          lineHeight: 1,
        }}
      >
        {on ? "✓" : ""}
      </span>
      Compare
    </label>
  );
}

export default function ExploreTrusts() {
  const { trusts } = trustsData;
  return (
    <PageWrap>
      <PageHeader
        eyebrow="The Lineup · 8 core structures"
        title="Explore Trusts"
        lede="The eight lifetime transfer vehicles that carry most estate-planning cases. Open any one to study it in full, or tick up to three to compare them side by side."
      />

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trusts.map((t) => (
          <Link
            key={t.id}
            to={`/trusts/${t.id}`}
            className="group ta-avoid-break flex flex-col rounded-lg p-5 transition-colors"
            style={{ background: "#FFFFFF", border: `1px solid ${LINE}` }}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="ta-display text-2xl font-semibold leading-none" style={{ color: INK }}>
                  {t.abbr}
                </div>
                <div className="ta-body mt-1.5 text-[12.5px] leading-snug" style={{ color: "#6A7280" }}>
                  {t.name.replace(/\s*\(.*$/, "")}
                </div>
              </div>
              <CompareToggle id={t.id} />
            </div>

            <p className="ta-body mt-3 flex-1 text-[13.5px] leading-relaxed" style={{ color: "#2A3140" }}>
              {t.primaryPurpose}
            </p>

            {/* cost strip — typical 2026 market ranges */}
            <div
              className="mt-4 grid grid-cols-2 rounded-md"
              style={{ border: `1px solid ${LINE}`, background: "#FAF9F5" }}
            >
              <div className="px-3 py-2" style={{ borderRight: `1px solid ${LINE}` }}>
                <div className="ta-mono text-[9.5px] uppercase tracking-widest" style={{ color: SAGE }}>
                  Setup
                </div>
                <div className="ta-mono mt-0.5 text-[13px] font-medium" style={{ color: INK }}>
                  {costRange(t.attrs.setupCost)}
                </div>
              </div>
              <div className="px-3 py-2">
                <div className="ta-mono text-[9.5px] uppercase tracking-widest" style={{ color: SAGE }}>
                  Annual
                </div>
                <div className="ta-mono mt-0.5 text-[13px] font-medium" style={{ color: INK }}>
                  {costRange(t.attrs.annualCost)}
                </div>
              </div>
            </div>

            {/* lifetime exemption — spelled out, not just Yes/No/Minimal */}
            <div
              className="mt-2 rounded-md px-3 py-2"
              style={{ border: `1px solid ${LINE}`, background: "#FAF9F5" }}
            >
              <div className="ta-mono text-[9.5px] uppercase tracking-widest" style={{ color: SAGE }}>
                Lifetime exemption
              </div>
              <div className="ta-body mt-0.5 text-[12.5px] leading-snug" style={{ color: INK }}>
                {exemptionLabel(t.attrs.usesExemption)}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              <Badge tone="neutral">Popularity: {leadWord(t.attrs.popularity)}</Badge>
              <Badge tone="neutral">Complexity: {leadWord(t.attrs.complexity)}</Badge>
            </div>

            <div
              className="ta-mono mt-4 flex items-center gap-1 text-[11px] font-medium transition-colors"
              style={{ color: OXBLOOD }}
            >
              Study this trust →
            </div>
          </Link>
        ))}
      </div>

      <p className="ta-body mt-8 max-w-2xl text-[13px] leading-relaxed" style={{ color: "#6A7280" }}>
        Looking for at-death and special-purpose structures — Credit Shelter, QTIP,
        QDOT, Special Needs, DAPT, BDIT?{" "}
        <Link to="/situational" style={{ color: OXBLOOD, textDecoration: "underline", textUnderlineOffset: 3 }}>
          See Situational Trusts →
        </Link>
      </p>
    </PageWrap>
  );
}
