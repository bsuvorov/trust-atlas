// Side-by-side comparison of 2-3 selected core trusts. Rows are the workbook
// attributes, grouped; columns are the trusts. Sized to fit a 13-15" screen
// (label column + three trust columns).
import { INK, PAPER, OXBLOOD, SAGE, LINE } from "../theme.jsx";
import { Verdict, VerdictLegend } from "../theme.jsx";
import { Link, navigate } from "../lib/router.jsx";
import { PageWrap, PageHeader } from "../components/PageBits.jsx";
import { GlossaryText } from "../lib/glossary.jsx";
import { useCompare, removeCompare, clearCompare } from "../lib/compare.jsx";
import trustsData from "../data/trusts.json";

const byId = Object.fromEntries(trustsData.trusts.map((t) => [t.id, t]));

// Grouped rows. `dot` = show a status dot next to the value.
const GROUPS = [
  {
    label: "Purpose",
    rows: [
      ["typicalClient", "Typical client"],
      ["howItWorks", "How it works", { long: true }],
    ],
  },
  {
    label: "Transfer-tax profile",
    rows: [
      ["usesExemption", "Uses exemption"],
      ["inEstate", "In grantor estate", { dot: true }],
      ["basisStepUp", "Basis step-up", { dot: true }],
      ["gstStatus", "GST status & timing"],
      ["qsbsFit", "QSBS stacking fit", { dot: true }],
    ],
  },
  {
    label: "Mechanics",
    rows: [
      ["incomeTaxPayer", "Income tax payer"],
      ["bestAssets", "Best assets"],
      ["hurdleRate", "Hurdle / valuation rate"],
      ["swapPower", "Swap power", { dot: true }],
      ["flexibility", "Add / sell / borrow later"],
      ["assetProtection", "Asset protection", { dot: true }],
    ],
  },
  {
    label: "Risk",
    rows: [
      ["failureModes", "Top failure modes"],
      ["mortalityRisk", "Grantor mortality risk", { dot: true }],
      ["complexity", "Drafting complexity", { dot: true }],
    ],
  },
  {
    label: "Practicalities",
    rows: [
      ["ageToImplement", "Age to implement"],
      ["duration", "Typical duration"],
      ["beneficiaries", "Primary beneficiaries"],
      ["fundingMethod", "Funding method"],
      ["setupCost", "Legal setup cost"],
      ["annualCost", "Annual maintenance"],
      ["popularity", "Popularity", { dot: true }],
    ],
  },
];

export default function Compare() {
  const ids = useCompare();
  const trusts = ids.map((id) => byId[id]).filter(Boolean);

  if (trusts.length < 2) {
    return (
      <PageWrap>
        <PageHeader
          eyebrow="Compare"
          title="Pick trusts to compare"
          lede="Choose two or three trusts from the lineup to see them side by side across every attribute."
        />
        <Link
          to="/trusts"
          className="ta-body mt-6 inline-block rounded-md px-4 py-2 text-[13px] font-semibold"
          style={{ background: INK, color: PAPER }}
        >
          Go to the lineup →
        </Link>
      </PageWrap>
    );
  }

  const cols = trusts.length;
  const gridCols = `minmax(150px,180px) repeat(${cols}, minmax(0,1fr))`;

  return (
    <PageWrap>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <PageHeader eyebrow={`Compare · ${cols} trusts`} title="Side by side" />
        <button
          onClick={() => clearCompare()}
          className="ta-mono ta-noprint text-[11px] uppercase tracking-widest underline underline-offset-4"
          style={{ color: SAGE }}
        >
          clear all
        </button>
      </div>

      <VerdictLegend className="mt-4" />

      <div className="mt-4 overflow-x-auto">
        <div style={{ minWidth: cols >= 3 ? 720 : 560 }}>
          {/* sticky header row of trust names */}
          <div
            className="sticky top-[92px] z-10 grid items-end gap-px"
            style={{ gridTemplateColumns: gridCols, background: PAPER }}
          >
            <div />
            {trusts.map((t) => (
              <div key={t.id} className="px-3 pb-3">
                <div className="flex items-start justify-between gap-1">
                  <Link to={`/trusts/${t.id}`} className="ta-display text-xl font-semibold" style={{ color: INK }}>
                    {t.abbr}
                  </Link>
                  <button
                    onClick={() => removeCompare(t.id)}
                    className="ta-noprint text-[12px]"
                    style={{ color: "#B4AFA4" }}
                    aria-label={`Remove ${t.abbr}`}
                  >
                    ✕
                  </button>
                </div>
                <div className="ta-body mt-0.5 text-[11px] leading-tight" style={{ color: "#6A7280" }}>
                  {t.name.replace(/\s*\(.*$/, "")}
                </div>
              </div>
            ))}
          </div>

          {GROUPS.map((g) => (
            <div key={g.label}>
              <div
                className="ta-mono mt-4 mb-1 px-3 py-1.5 text-[10.5px] uppercase tracking-widest"
                style={{ color: PAPER, background: SAGE }}
              >
                {g.label}
              </div>
              {g.rows.map(([key, label, opts = {}]) => (
                <div
                  key={key}
                  className="ta-avoid-break grid gap-px border-b"
                  style={{ gridTemplateColumns: gridCols, borderColor: LINE }}
                >
                  <div
                    className="ta-mono px-3 py-2.5 text-[10.5px] uppercase leading-tight tracking-wide"
                    style={{ color: SAGE }}
                  >
                    {label}
                  </div>
                  {trusts.map((t) => (
                    <div
                      key={t.id}
                      className="px-3 py-2.5"
                      style={{ borderLeft: `1px solid ${LINE}` }}
                    >
                      <div className="flex gap-1.5">
                        {opts.dot && <span className="mt-1"><Verdict k={key} value={t.attrs[key]} /></span>}
                        <div
                          className="ta-body text-[12px] leading-snug"
                          style={{ color: "#2A3140", maxHeight: opts.long ? 220 : "none", overflow: opts.long ? "auto" : "visible" }}
                        >
                          <GlossaryText>{t.attrs[key]}</GlossaryText>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="ta-noprint mt-8 flex flex-wrap gap-3">
        <Link
          to="/trusts"
          className="ta-body rounded-md px-4 py-2 text-[13px] font-medium"
          style={{ border: `1px solid ${LINE}`, background: "#fff", color: INK }}
        >
          + Add another trust
        </Link>
        <button
          onClick={() => window.print()}
          className="ta-body rounded-md px-4 py-2 text-[13px] font-semibold"
          style={{ background: INK, color: PAPER }}
        >
          Print comparison
        </button>
      </div>

      <p className="ta-print-only mt-5 text-[10.5px] leading-relaxed" style={{ color: "#5A6170" }}>
        Educational reference only — not legal, tax, or financial advice. Consult your own qualified
        legal, tax, and financial advisors before acting. Figures are July 2026 and reset monthly.
        Compiled by Three Main Points · threemainpoints.com
      </p>
    </PageWrap>
  );
}
