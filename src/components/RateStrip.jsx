// The date-stamped federal rate card. These numbers drive most of the trust
// economics and the workbook is explicit that they reset monthly, so they ride
// along in the header and on trust pages.
import { INK, PAPER, SAGE } from "../theme.jsx";
import { Link } from "../lib/router.jsx";

const RATES = [
  { label: "§7520 rate", value: "5.2%" },
  { label: "AFR (long)", value: "4.98%" },
  { label: "Gift/estate exempt.", value: "$15M" },
  { label: "GST exempt.", value: "$15M" },
  { label: "Top transfer rate", value: "40%" },
];

export function RateStrip({ compact = false }) {
  return (
    <div
      className="ta-mono flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px]"
      style={{ color: PAPER }}
    >
      <span className="uppercase tracking-widest" style={{ color: "#B9C0AE" }}>
        July 2026
      </span>
      {RATES.map((r) => (
        <span key={r.label} className="whitespace-nowrap">
          <span style={{ opacity: 0.65 }}>{r.label} </span>
          <span className="font-medium">{r.value}</span>
        </span>
      ))}
      {!compact && (
        <Link
          to="/reference"
          className="underline underline-offset-4"
          style={{ color: "#B9C0AE" }}
        >
          rates reset monthly →
        </Link>
      )}
    </div>
  );
}

// A lighter inline version for use on a paper background (trust pages).
export function RateInline() {
  const items = [
    ["§7520", "5.2%"],
    ["AFR long", "4.98%"],
    ["Exemption", "$15M"],
    ["GST", "$15M"],
  ];
  return (
    <div
      className="ta-mono flex flex-wrap gap-x-4 gap-y-1 rounded-md px-3 py-2 text-[11px]"
      style={{ background: "#EEECE5", color: INK }}
    >
      <span className="uppercase tracking-widest" style={{ color: SAGE }}>
        Rates · Jul 2026
      </span>
      {items.map(([k, v]) => (
        <span key={k}>
          <span style={{ opacity: 0.6 }}>{k} </span>
          <span className="font-medium">{v}</span>
        </span>
      ))}
    </div>
  );
}
