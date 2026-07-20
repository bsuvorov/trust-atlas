// Helpers that turn the long spreadsheet cells into short, scannable labels for
// cards and badges. The full text still shows on the detail pages.

// Text before the first em-dash, semicolon, or sentence break.
export function firstClause(str) {
  if (!str) return "";
  const cut = str.split(/\s*[—;]\s*|\.\s/)[0];
  return cut.trim();
}

// Leading yes/no/qualifier for a spec value.
export function leadWord(str) {
  if (!str) return "";
  const m = str.match(/^(Yes|No|Minimal|Strong|Weak|Excellent|Good|Moderate|Low-Medium|Low|Medium|High|Open|Closed|Sealed|Standard|Common|Removed|Poor|Awkward|Not applicable|Not relevant)/i);
  return m ? m[0] : firstClause(str);
}

export function toneForValue(str) {
  const v = (str || "").toLowerCase();
  if (/^(yes|strong|excellent|high|open|standard|removed)/.test(v)) return "sage";
  if (/^(no|weak|poor|closed|sealed|not a stacking|minimal)/.test(v)) return "ox";
  return "neutral";
}
