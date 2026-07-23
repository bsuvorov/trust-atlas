// Landing page: a short editorial hero and entry cards into the five sections.
import { INK, PAPER, OXBLOOD, SAGE, LINE } from "../theme.jsx";
import { Eyebrow } from "../theme.jsx";
import { Link } from "../lib/router.jsx";
import { DISCLAIMER_SHORT, Attribution } from "../components/Disclaimer.jsx";
import trustsData from "../data/trusts.json";

const SECTIONS = [
  {
    to: "/trusts",
    kicker: "9 core structures",
    title: "Explore Trusts",
    body: "Study each lifetime-transfer vehicle in full — SLAT, SLANT, ILIT, GRAT, IDGT, Dynasty, CRT, QPRT, CLAT — then compare up to three side by side.",
  },
  {
    to: "/situational",
    kicker: "7 structures",
    title: "Situational Trusts",
    body: "At-death and special-purpose vehicles: Credit Shelter, QTIP, QDOT, Special Needs, DAPT, BDIT, and ING.",
  },
  {
    to: "/cases",
    kicker: "Prominent families",
    title: "Case Studies",
    body: "How the Waltons, Zuckerberg, Adelson, Onassis and others actually used these structures — precedents and cautionary tales.",
  },
  {
    to: "/situations",
    kicker: "19 client situations",
    title: "Situation Guide",
    body: "Start from the client's circumstances. Select up to five and print a research brief of trusts, fit, and watch-outs.",
  },
  {
    to: "/objectives",
    kicker: "Decision tree · 20",
    title: "Objectives Guide",
    body: "Start from intent. Name the objective and the tree points to the structure to begin with — and why.",
  },
];

export default function Home() {
  return (
    <div>
      {/* hero */}
      <div style={{ background: INK }}>
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-16">
          <Eyebrow color="#B9C0AE">A reference atlas of irrevocable trusts</Eyebrow>
          <h1 className="ta-display mt-3 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl" style={{ color: PAPER }}>
            Study each trust. Compare the field. See how the great fortunes did it.
          </h1>
          <p className="ta-body mt-5 max-w-2xl text-[15px] leading-relaxed" style={{ color: "#B9C0AE" }}>
            Sixteen trust structures, nineteen client situations, and a decision
            tree — drawn from a practitioner reference workbook and built to be
            read one trust at a time, compared three at a time, and printed as a
            research brief.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/trusts"
              className="ta-body rounded-md px-5 py-2.5 text-[14px] font-semibold"
              style={{ background: PAPER, color: INK }}
            >
              Explore the lineup →
            </Link>
            <Link
              to="/situations"
              className="ta-body rounded-md px-5 py-2.5 text-[14px] font-medium"
              style={{ border: `1px solid #3A424F`, color: PAPER }}
            >
              Build a research brief
            </Link>
          </div>

          {/* conspicuous disclosure, kept in the hero so it's seen first */}
          <div
            className="mt-8 max-w-2xl rounded-md p-3"
            style={{ border: `1px solid #3A424F` }}
          >
            <p className="ta-body text-[12.5px] leading-relaxed" style={{ color: "#C7CCD4" }}>
              <span className="ta-mono uppercase tracking-widest text-[10.5px]" style={{ color: "#C98B84" }}>
                Not advice ·{" "}
              </span>
              {DISCLAIMER_SHORT}
            </p>
            <div className="mt-2">
              <Attribution dark />
            </div>
          </div>
        </div>
      </div>

      {/* section cards */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-5 sm:py-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="ta-avoid-break flex flex-col rounded-lg p-6 transition-colors"
              style={{ background: "#FFFFFF", border: `1px solid ${LINE}` }}
            >
              <div className="ta-mono text-[10.5px] uppercase tracking-widest" style={{ color: OXBLOOD }}>
                {s.kicker}
              </div>
              <h2 className="ta-display mt-2 text-2xl font-semibold" style={{ color: INK }}>
                {s.title}
              </h2>
              <p className="ta-body mt-2 flex-1 text-[13.5px] leading-relaxed" style={{ color: "#4A5262" }}>
                {s.body}
              </p>
              <div className="ta-mono mt-4 text-[11px] font-medium" style={{ color: OXBLOOD }}>
                Open →
              </div>
            </Link>
          ))}

          {/* reference card */}
          <Link
            to="/reference"
            className="ta-avoid-break flex flex-col justify-between rounded-lg p-6"
            style={{ background: "#EEECE5", border: `1px solid ${LINE}` }}
          >
            <div>
              <div className="ta-mono text-[10.5px] uppercase tracking-widest" style={{ color: SAGE }}>
                Rates · rules · glossary
              </div>
              <h2 className="ta-display mt-2 text-2xl font-semibold" style={{ color: INK }}>
                Reference
              </h2>
              <p className="ta-body mt-2 text-[13.5px] leading-relaxed" style={{ color: "#4A5262" }}>
                Key federal figures, the GST and ETIP explainers, the state panel,
                and a 40-term glossary.
              </p>
            </div>
            <div className="ta-mono mt-4 text-[11px] font-medium" style={{ color: OXBLOOD }}>
              Open →
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
