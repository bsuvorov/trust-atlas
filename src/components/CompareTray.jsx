// Sticky bottom tray — the Apple "compare" pattern. Shows the up-to-three
// selected trusts and a button to open the comparison. Hidden when empty and
// on the compare page itself.
import { INK, PAPER, OXBLOOD, LINE } from "../theme.jsx";
import { useCompare, removeCompare, clearCompare, MAX_COMPARE } from "../lib/compare.jsx";
import { navigate, useRoute } from "../lib/router.jsx";
import trustsData from "../data/trusts.json";

const byId = Object.fromEntries(trustsData.trusts.map((t) => [t.id, t]));

export function CompareTray() {
  const ids = useCompare();
  const path = useRoute();
  if (ids.length === 0 || path === "/compare") return null;

  return (
    <div
      className="ta-noprint fixed bottom-0 left-0 right-0 z-40 ta-fade"
      style={{ background: INK, borderTop: `1px solid ${OXBLOOD}` }}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
        <span
          className="ta-mono hidden shrink-0 text-[11px] uppercase tracking-widest sm:block"
          style={{ color: "#B9C0AE" }}
        >
          Compare · {ids.length}/{MAX_COMPARE}
        </span>
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {ids.map((id) => (
            <span
              key={id}
              className="ta-mono flex items-center gap-2 rounded px-2.5 py-1 text-[12px]"
              style={{ background: "#2A3140", color: PAPER, border: `1px solid #3A424F` }}
            >
              {byId[id]?.abbr || id}
              <button
                onClick={() => removeCompare(id)}
                aria-label={`Remove ${byId[id]?.abbr || id}`}
                style={{ color: "#9AA1AD" }}
              >
                ✕
              </button>
            </span>
          ))}
          {ids.length < MAX_COMPARE && (
            <span className="ta-body text-[12px]" style={{ color: "#7C8494" }}>
              add up to {MAX_COMPARE - ids.length} more
            </span>
          )}
        </div>
        <button
          onClick={() => clearCompare()}
          className="ta-body text-[12px] underline underline-offset-4"
          style={{ color: "#9AA1AD" }}
        >
          clear
        </button>
        <button
          onClick={() => navigate("/compare")}
          disabled={ids.length < 2}
          className="ta-body rounded-md px-4 py-2 text-[13px] font-semibold transition-colors"
          style={{
            background: ids.length < 2 ? "#3A424F" : PAPER,
            color: ids.length < 2 ? "#7C8494" : INK,
            border: `1px solid ${ids.length < 2 ? "#3A424F" : LINE}`,
            cursor: ids.length < 2 ? "not-allowed" : "pointer",
          }}
        >
          Compare →
        </button>
      </div>
    </div>
  );
}
