// How prominent families used these structures. Content is drawn from public
// record (court opinions, published wills, reporting, filings) and clearly
// flagged as illustrative — not advice, no affiliation.
import { INK, PAPER, OXBLOOD, SAGE, LINE } from "../theme.jsx";
import { Badge } from "../theme.jsx";
import { Link } from "../lib/router.jsx";
import { PageWrap, PageHeader, Section, Callout } from "../components/PageBits.jsx";
import { GlossaryText } from "../lib/glossary.jsx";
import casesData from "../data/cases.json";
import trustsData from "../data/trusts.json";

const trustById = Object.fromEntries(trustsData.trusts.map((t) => [t.id, t]));

export default function CaseStudies() {
  const { cases, disclaimer } = casesData;
  return (
    <PageWrap>
      <PageHeader
        eyebrow="Prominent families · public record"
        title="Case Studies"
        lede="How the structures in this atlas have actually been used — the precedents, the fortunes, and the cautionary tales behind GRATs, dynasty trusts, and charitable lead trusts."
      />

      <div
        className="ta-body mt-5 rounded-md p-3 text-[12px] leading-relaxed"
        style={{ background: "#EEECE5", color: "#5A6170", border: `1px solid ${LINE}` }}
      >
        <span className="ta-mono uppercase tracking-widest" style={{ color: SAGE }}>Note · </span>
        {disclaimer}
      </div>

      <div className="mt-8 flex flex-col gap-6">
        {cases.map((c) => (
          <article
            key={c.id}
            id={c.id}
            className="ta-avoid-break overflow-hidden rounded-lg"
            style={{ background: "#FFFFFF", border: `1px solid ${LINE}` }}
          >
            <div className="border-b p-6" style={{ borderColor: LINE }}>
              <div className="flex flex-wrap items-center gap-2">
                {c.trustIds.map((tid) =>
                  trustById[tid] ? (
                    <Link key={tid} to={`/trusts/${tid}`}>
                      <Badge tone="ox">{trustById[tid].abbr}</Badge>
                    </Link>
                  ) : null
                )}
                <span className="ta-mono text-[11px] uppercase tracking-widest" style={{ color: SAGE }}>
                  {c.era}
                </span>
              </div>
              <h2 className="ta-display mt-3 text-2xl font-semibold leading-tight">{c.title}</h2>
              <div className="ta-body mt-1 text-[14px]" style={{ color: OXBLOOD }}>{c.family}</div>
              <div className="ta-mono mt-2 text-[11.5px]" style={{ color: "#6A7280" }}>{c.structure}</div>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-5 p-6 lg:grid-cols-2">
              <div className="lg:col-span-2">
                <p className="ta-body text-[15px] leading-relaxed" style={{ color: "#2A3140" }}>
                  <GlossaryText>{c.summary}</GlossaryText>
                </p>
              </div>
              <Section label="How it worked">
                <p className="ta-body text-[13.5px] leading-relaxed" style={{ color: "#2A3140" }}>
                  <GlossaryText>{c.howItWorked}</GlossaryText>
                </p>
              </Section>
              <div className="flex flex-col gap-4">
                <Callout tone="sage" label="The takeaway">
                  <GlossaryText>{c.takeaway}</GlossaryText>
                </Callout>
                <Callout tone="ox" label="Watch-out">
                  <GlossaryText>{c.watchOut}</GlossaryText>
                </Callout>
              </div>
              <div className="lg:col-span-2 border-t pt-3" style={{ borderColor: LINE }}>
                <span className="ta-mono text-[11px]" style={{ color: "#8A8578" }}>
                  Source · {c.source}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </PageWrap>
  );
}
