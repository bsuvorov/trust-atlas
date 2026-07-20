// Disclaimers and attribution.
//
// Design intent (per the site owner): this is an educational reference, not an
// advertisement or a solicitation of advisory services. So: conspicuous,
// repeated "not advice — consult your own advisors" language, and a factual,
// non-promotional attribution to the firm (no calls to action, no claims about
// services, no testimonials, no performance figures). Whether a given use of
// this material constitutes an "advertisement" under the SEC Marketing Rule or
// DFPI rules is a legal/compliance determination for counsel — this component
// only implements the neutral, disclosure-forward presentation.

import { INK, PAPER, OXBLOOD, SAGE, LINE } from "../theme.jsx";

export const FIRM_NAME = "Three Main Points";
export const FIRM_URL = "https://www.threemainpoints.com";
export const FIRM_HOST = "threemainpoints.com";

export const DISCLAIMER_FULL =
  "This site is an educational reference about trust structures, offered for general informational purposes only. " +
  "It is not legal, tax, investment, accounting, or financial advice; it is not an offer, solicitation, or recommendation " +
  "to buy or sell any security or to adopt any strategy; and it does not create any attorney–client, fiduciary, or advisory " +
  "relationship. Trust, estate, and tax planning is highly fact-specific and jurisdiction-specific, and the figures shown " +
  "here are dated (July 2026) and change frequently. Nothing here is tailored to your situation. Before acting on anything " +
  "you read, consult your own qualified legal, tax, and financial advisors, who can evaluate your specific circumstances.";

export const DISCLAIMER_SHORT =
  "Educational reference only — not legal, tax, or financial advice. " +
  "Consult your own legal, tax, and financial advisors before acting.";

// Factual attribution. Deliberately not a call to action.
export function Attribution({ dark = false }) {
  return (
    <span
      className="ta-body text-[12px]"
      style={{ color: dark ? "#B9C0AE" : "#6A7280" }}
    >
      Compiled as a study aid by {FIRM_NAME} ·{" "}
      <a
        href={FIRM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2"
        style={{ color: dark ? "#B9C0AE" : SAGE }}
      >
        {FIRM_HOST}
      </a>
    </span>
  );
}

// The conspicuous footer band. Readable size, bordered, clearly labeled.
export function FooterDisclaimer() {
  return (
    <div
      className="ta-avoid-break rounded-md p-4"
      style={{ border: `1px solid #3A424F`, background: "#161D28" }}
    >
      <div
        className="ta-mono mb-1.5 text-[11px] uppercase tracking-widest"
        style={{ color: "#C98B84" }}
      >
        Important — please read
      </div>
      <p className="ta-body text-[12.5px] leading-relaxed" style={{ color: "#C7CCD4" }}>
        {DISCLAIMER_FULL}
      </p>
    </div>
  );
}

// Prominent disclosure block for the printed research brief and the Reference
// page. Light background so it prints clearly.
export function DisclosureBlock({ compact = false }) {
  return (
    <div
      className="ta-avoid-break rounded-md p-4"
      style={{ border: `1.5px solid ${OXBLOOD}`, background: "#F6ECEA" }}
    >
      <div className="ta-mono mb-1.5 text-[11px] uppercase tracking-widest" style={{ color: OXBLOOD }}>
        Important — not advice
      </div>
      <p className="ta-body text-[12.5px] leading-relaxed" style={{ color: INK }}>
        {DISCLAIMER_FULL}
      </p>
      {!compact && (
        <p className="ta-body mt-2 text-[11.5px]" style={{ color: "#5A6170" }}>
          <Attribution />
        </p>
      )}
    </div>
  );
}
