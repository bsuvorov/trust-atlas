// The "product page" for a single core trust. The 26 workbook attributes are
// grouped into readable sections; the "pairs with" text cross-links to siblings.
import { INK, OXBLOOD, SAGE, LINE } from "../theme.jsx";
import { Badge, Verdict, VerdictLegend, Eyebrow } from "../theme.jsx";
import { Link, navigate } from "../lib/router.jsx";
import { PageWrap, Section, Prose, SpecRow, Callout } from "../components/PageBits.jsx";
import { RateInline } from "../components/RateStrip.jsx";
import { GlossaryText } from "../lib/glossary.jsx";
import { CrossLink } from "../lib/crosslink.jsx";
import { useCompare, toggleCompare, MAX_COMPARE } from "../lib/compare.jsx";
import { leadWord } from "../lib/trustmeta.js";
import trustsData from "../data/trusts.json";

const byId = Object.fromEntries(trustsData.trusts.map((t) => [t.id, t]));
const ORDER = trustsData.trusts.map((t) => t.id);

// Attributes shown as a scannable spec grid with a status dot.
const AT_A_GLANCE = [
  ["usesExemption", "Uses lifetime exemption"],
  ["inEstate", "Included in estate"],
  ["basisStepUp", "Basis step-up"],
  ["incomeTaxPayer", "Income tax payer"],
  ["assetProtection", "Asset protection"],
  ["swapPower", "Swap power"],
  ["gstStatus", "GST status & timing"],
  ["qsbsFit", "QSBS stacking fit"],
];

const ECONOMICS = [
  ["bestAssets", "Best assets"],
  ["hurdleRate", "Hurdle / valuation rate"],
  ["ageToImplement", "Typical age to implement"],
  ["duration", "Typical duration"],
  ["fundingMethod", "Funding method"],
  ["beneficiaries", "Primary beneficiaries"],
];

function CompareButton({ id }) {
  const ids = useCompare();
  const on = ids.includes(id);
  const full = ids.length >= MAX_COMPARE && !on;
  return (
    <button
      onClick={() => !full && toggleCompare(id)}
      disabled={full}
      className="ta-mono rounded-md px-3 py-1.5 text-[11px] font-medium uppercase tracking-widest transition-colors"
      style={{
        background: on ? OXBLOOD : "transparent",
        color: on ? "#fff" : full ? "#B4AFA4" : OXBLOOD,
        border: `1px solid ${on ? OXBLOOD : full ? "#D8D3C8" : "#D8C4C0"}`,
        cursor: full ? "not-allowed" : "pointer",
      }}
    >
      {on ? "✓ In compare" : full ? "Compare full" : "+ Compare"}
    </button>
  );
}

export default function TrustDetail({ id }) {
  const t = byId[id];
  if (!t) {
    return (
      <PageWrap>
        <p className="ta-body">Unknown trust.</p>
        <Link to="/trusts" style={{ color: OXBLOOD }}>Back to the lineup</Link>
      </PageWrap>
    );
  }
  const a = t.attrs;
  const idx = ORDER.indexOf(id);
  const prev = ORDER[(idx - 1 + ORDER.length) % ORDER.length];
  const next = ORDER[(idx + 1) % ORDER.length];

  return (
    <PageWrap>
      {/* breadcrumb */}
      <div className="ta-mono mb-5 flex items-center gap-2 text-[11px]" style={{ color: SAGE }}>
        <Link to="/trusts" style={{ color: SAGE }}>Explore Trusts</Link>
        <span>/</span>
        <span style={{ color: INK }}>{t.abbr}</span>
      </div>

      {/* hero */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        <div>
          <Eyebrow>Core structure</Eyebrow>
          <h1 className="ta-display mt-2 text-4xl font-semibold leading-tight">{t.abbr}</h1>
          <div className="ta-body mt-1 text-[15px]" style={{ color: "#6A7280" }}>
            {t.name.replace(/\s*\(.*$/, "")}
          </div>
          <p className="ta-display mt-4 max-w-2xl text-[19px] italic leading-snug" style={{ color: OXBLOOD }}>
            <GlossaryText>{t.primaryPurpose}</GlossaryText>
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge>Popularity: {leadWord(a.popularity)}</Badge>
            <Badge>Complexity: {leadWord(a.complexity)}</Badge>
            <Badge>Mortality risk: {leadWord(a.mortalityRisk)}</Badge>
            <CompareButton id={id} />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-lg p-4" style={{ background: "#FFFFFF", border: `1px solid ${LINE}` }}>
            <div className="ta-mono text-[10.5px] uppercase tracking-widest" style={{ color: SAGE }}>
              Typical client
            </div>
            <p className="ta-body mt-1.5 text-[13px] leading-snug" style={{ color: "#2A3140" }}>
              {a.typicalClient}
            </p>
          </div>
          <RateInline />
        </div>
      </div>

      {/* how it works */}
      <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-2">
        <Section label="How it works" className="lg:col-span-2">
          <Prose>{a.howItWorks}</Prose>
        </Section>

        {/* at a glance */}
        <Section label="At a glance">
          <VerdictLegend className="mb-3" />
          <div>
            {AT_A_GLANCE.map(([key, label]) => (
              <div key={key} className="ta-avoid-break border-b py-2.5" style={{ borderColor: LINE }}>
                <div className="flex items-center gap-2">
                  <Verdict k={key} value={a[key]} />
                  <div className="ta-mono text-[10.5px] uppercase tracking-widest" style={{ color: SAGE }}>
                    {label}
                  </div>
                </div>
                <div className="ta-body mt-1 pl-4 text-[13px] leading-snug" style={{ color: "#2A3140" }}>
                  <GlossaryText>{a[key]}</GlossaryText>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* economics & timing */}
        <Section label="Economics & timing">
          {ECONOMICS.map(([key, label]) => (
            <SpecRow key={key} label={label}>
              <GlossaryText>{a[key]}</GlossaryText>
            </SpecRow>
          ))}
        </Section>

        {/* risks */}
        <Section label="Risks & failure modes" className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Callout tone="ox" label="Top failure modes & drafting traps">
              <GlossaryText>{a.failureModes}</GlossaryText>
            </Callout>
            <div className="flex flex-col gap-4">
              <Callout tone="ox" label="Grantor mortality risk">
                <GlossaryText>{a.mortalityRisk}</GlossaryText>
              </Callout>
              <Callout tone="sage" label="Drafting complexity">
                {a.complexity}
              </Callout>
            </div>
          </div>
        </Section>

        {/* cost */}
        <Section label="Cost (2026 market ranges)">
          <SpecRow label="Legal setup">{a.setupCost}</SpecRow>
          <SpecRow label="Annual maintenance">{a.annualCost}</SpecRow>
        </Section>

        {/* pairs with — cross-linked */}
        <Section label="Pairs with">
          <p className="ta-body text-[14px] leading-relaxed" style={{ color: "#2A3140" }}>
            <CrossLink currentId={id}>{a.combinations}</CrossLink>
          </p>
        </Section>
      </div>

      {/* prev / next */}
      <div className="mt-12 flex items-center justify-between border-t pt-5" style={{ borderColor: LINE }}>
        <button
          onClick={() => navigate(`/trusts/${prev}`)}
          className="ta-mono text-[12px] uppercase tracking-widest"
          style={{ color: SAGE }}
        >
          ← {byId[prev].abbr}
        </button>
        <Link to="/trusts" className="ta-mono text-[12px] uppercase tracking-widest" style={{ color: OXBLOOD }}>
          All trusts
        </Link>
        <button
          onClick={() => navigate(`/trusts/${next}`)}
          className="ta-mono text-[12px] uppercase tracking-widest"
          style={{ color: SAGE }}
        >
          {byId[next].abbr} →
        </button>
      </div>
    </PageWrap>
  );
}
