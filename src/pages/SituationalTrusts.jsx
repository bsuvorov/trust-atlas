// The seven situational / at-death structures. Kept separate from the core nine
// because the workbook uses a different schema for them (no hurdle rate, swap
// power, etc.) — forcing them into the core matrix produced empty cells.
import { INK, OXBLOOD, SAGE, LINE } from "../theme.jsx";
import { Link } from "../lib/router.jsx";
import { PageWrap, PageHeader } from "../components/PageBits.jsx";
import situationalData from "../data/situational.json";

const CATS = [
  { key: "death", title: "Triggered at death — marital & exemption architecture" },
  { key: "special", title: "Special-purpose — protection & benefits" },
];

export default function SituationalTrusts() {
  const { trusts, categories } = situationalData;
  return (
    <PageWrap>
      <PageHeader
        eyebrow="7 situational structures"
        title="Explore Situational Trusts"
        lede="These are routed to by the Situation and Objectives guides. Most are at-death or special-purpose vehicles rather than lifetime wealth-transfer engines, so they get their own profiles instead of the core-nine matrix."
      />

      {CATS.map((cat) => (
        <div key={cat.key} className="mt-8">
          <div
            className="ta-mono mb-1 text-[11px] uppercase tracking-widest"
            style={{ color: OXBLOOD }}
          >
            {cat.title}
          </div>
          <p className="ta-body mb-4 max-w-3xl text-[12.5px] leading-relaxed" style={{ color: "#6A7280" }}>
            {categories[cat.key]}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trusts
              .filter((t) => t.category === cat.key)
              .map((t) => (
                <Link
                  key={t.id}
                  to={`/situational/${t.id}`}
                  className="ta-avoid-break flex flex-col rounded-lg p-5"
                  style={{ background: "#FFFFFF", border: `1px solid ${LINE}` }}
                >
                  <div className="ta-display text-xl font-semibold" style={{ color: INK }}>
                    {t.abbr}
                  </div>
                  <div className="ta-body mt-1 text-[12px] leading-snug" style={{ color: "#6A7280" }}>
                    {t.name.replace(/\s*\(.*$/, "")}
                  </div>
                  <p className="ta-body mt-3 flex-1 text-[13px] leading-relaxed" style={{ color: "#2A3140" }}>
                    {t.attrs.whatItIs}
                  </p>
                  <div className="ta-mono mt-4 text-[11px] font-medium" style={{ color: OXBLOOD }}>
                    Read the profile →
                  </div>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </PageWrap>
  );
}
