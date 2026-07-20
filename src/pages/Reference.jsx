// Reference: key federal figures, the GST & ETIP explainers, the state panel,
// and a searchable glossary. The deep background the rest of the site links to.
import { useState } from "react";
import { INK, PAPER, OXBLOOD, SAGE, LINE } from "../theme.jsx";
import { PageWrap, PageHeader, Section, Callout } from "../components/PageBits.jsx";
import { DisclosureBlock } from "../components/Disclaimer.jsx";
import { GlossaryText } from "../lib/glossary.jsx";
import glossary from "../data/glossary.json";
import figures from "../data/figures.json";
import explainers from "../data/explainers.json";

function Explainer({ data }) {
  return (
    <div className="ta-avoid-break rounded-lg p-6" style={{ background: "#FFFFFF", border: `1px solid ${LINE}` }}>
      <h3 className="ta-display text-xl font-semibold leading-snug">{data.title}</h3>
      {data.subtitle && (
        <p className="ta-body mt-1 text-[12px] italic" style={{ color: SAGE }}>{data.subtitle}</p>
      )}
      <dl className="mt-4 flex flex-col gap-3">
        {data.sections.map((s, i) => (
          <div key={i} className="ta-avoid-break">
            <dt className="ta-mono text-[10.5px] uppercase tracking-widest" style={{ color: OXBLOOD }}>
              {s.heading}
            </dt>
            <dd className="ta-body mt-1 text-[13px] leading-relaxed" style={{ color: "#2A3140" }}>
              <GlossaryText>{s.body}</GlossaryText>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function Reference() {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const terms = query
    ? glossary.filter(
        (g) => g.term.toLowerCase().includes(query) || g.definition.toLowerCase().includes(query)
      )
    : glossary;

  return (
    <PageWrap>
      <PageHeader
        eyebrow="Reference"
        title="Rates, rules & glossary"
        lede="The figures and doctrines the rest of the atlas rests on. Everything is dated July 2026; the Section 7520 rate and AFR reset monthly."
      />

      <div className="mt-6">
        <DisclosureBlock />
      </div>

      {/* federal figures */}
      <Section label="Key federal figures — July 2026" className="mt-8">
        <p className="ta-body mb-4 text-[12.5px]" style={{ color: "#6A7280" }}>{figures.intro}</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {figures.figures.map((f) => (
            <div key={f.label} className="ta-avoid-break rounded-lg p-4" style={{ background: "#FFFFFF", border: `1px solid ${LINE}` }}>
              <div className="ta-mono text-[10.5px] uppercase leading-tight tracking-widest" style={{ color: SAGE }}>
                {f.label}
              </div>
              <div className="ta-display mt-1 text-xl font-semibold" style={{ color: OXBLOOD }}>
                {f.value}
              </div>
              <p className="ta-body mt-1.5 text-[12px] leading-snug" style={{ color: "#6A7280" }}>{f.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* state panel */}
      <Section label="State panel — cross-cutting rules" className="mt-10">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {figures.states.map((s) => (
            <Callout key={s.state} tone={s.state === "California" ? "ox" : "sage"} label={s.state}>
              <GlossaryText>{s.body}</GlossaryText>
            </Callout>
          ))}
        </div>
      </Section>

      {/* explainers */}
      <Section label="Deep dives" className="mt-10">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Explainer data={explainers.gst} />
          <Explainer data={explainers.etip} />
        </div>
      </Section>

      {/* glossary */}
      <Section label={`Glossary — ${glossary.length} terms`} className="mt-10">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search the glossary…"
          className="ta-body mb-4 w-full rounded-md px-4 py-2.5 text-[14px]"
          style={{ background: "#FFFFFF", border: `1px solid ${LINE}`, color: INK, outline: "none" }}
        />
        <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
          {terms.map((g) => (
            <div key={g.term} className="ta-avoid-break border-b py-3" style={{ borderColor: LINE }}>
              <dt className="ta-body text-[13.5px] font-semibold" style={{ color: INK }}>{g.term}</dt>
              <dd className="ta-body mt-1 text-[12.5px] leading-relaxed" style={{ color: "#4A5262" }}>{g.definition}</dd>
            </div>
          ))}
        </div>
      </Section>

      <p className="ta-body mt-10 text-[11.5px] leading-relaxed" style={{ color: "#8A8578" }}>
        {figures.sources}
      </p>
    </PageWrap>
  );
}
