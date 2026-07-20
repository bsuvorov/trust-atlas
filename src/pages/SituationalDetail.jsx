// Profile page for one situational trust — its own schema, not the core matrix.
import { INK, OXBLOOD, SAGE, LINE } from "../theme.jsx";
import { Eyebrow } from "../theme.jsx";
import { Link } from "../lib/router.jsx";
import { PageWrap, Section, Prose, Callout } from "../components/PageBits.jsx";
import { GlossaryText } from "../lib/glossary.jsx";
import { CrossLink } from "../lib/crosslink.jsx";
import situationalData from "../data/situational.json";

const byId = Object.fromEntries(situationalData.trusts.map((t) => [t.id, t]));

export default function SituationalDetail({ id }) {
  const t = byId[id];
  if (!t) {
    return (
      <PageWrap>
        <p className="ta-body">Unknown trust.</p>
        <Link to="/situational" style={{ color: OXBLOOD }}>Back</Link>
      </PageWrap>
    );
  }
  const a = t.attrs;
  return (
    <PageWrap>
      <div className="ta-mono mb-5 flex items-center gap-2 text-[11px]" style={{ color: SAGE }}>
        <Link to="/situational" style={{ color: SAGE }}>Situational Trusts</Link>
        <span>/</span>
        <span style={{ color: INK }}>{t.abbr}</span>
      </div>

      <Eyebrow>Situational structure</Eyebrow>
      <h1 className="ta-display mt-2 text-4xl font-semibold leading-tight">{t.abbr}</h1>
      <div className="ta-body mt-1 text-[15px]" style={{ color: "#6A7280" }}>
        {t.name.replace(/\s*\(.*$/, "")}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-2">
        <Section label="What it is" className="lg:col-span-2">
          <Prose size="16px">{a.whatItIs}</Prose>
        </Section>

        <Section label="Irrevocable? (and when)">
          <Prose size="14px">{a.irrevocableWhen}</Prose>
        </Section>

        <Section label="When it enters the conversation">
          <Prose size="14px">{a.trigger}</Prose>
        </Section>

        <Section label="Key mechanics">
          <Prose size="14px">{a.keyMechanics}</Prose>
        </Section>

        <Section label="Transfer-tax role">
          <Prose size="14px">{a.transferTaxRole}</Prose>
        </Section>

        <Section label="Watch-outs & failure modes" className="lg:col-span-2">
          <Callout tone="ox">
            <GlossaryText>{a.watchOuts}</GlossaryText>
          </Callout>
        </Section>

        <Section label="Why it's not in the core eight" className="lg:col-span-2">
          <Prose size="14px">
            <CrossLink currentId={id}>{a.notInCoreEight}</CrossLink>
          </Prose>
        </Section>
      </div>

      <div className="mt-12 border-t pt-5" style={{ borderColor: LINE }}>
        <Link to="/situational" className="ta-mono text-[12px] uppercase tracking-widest" style={{ color: OXBLOOD }}>
          ← All situational trusts
        </Link>
      </div>
    </PageWrap>
  );
}
