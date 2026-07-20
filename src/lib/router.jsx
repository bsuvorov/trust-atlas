// Minimal hash router — no dependency, works on static GitHub Pages hosting.
// Routes look like "#/trusts/slat". We expose the current path plus a Link
// component and a programmatic navigate().
import { useState, useEffect, useCallback } from "react";

export function currentPath() {
  const h = window.location.hash.replace(/^#/, "");
  return h || "/";
}

export function navigate(to) {
  if (to.startsWith("#")) to = to.slice(1);
  window.location.hash = to;
  // Jump to top on route change (unless linking to an in-page anchor).
  if (!to.includes("#")) window.scrollTo({ top: 0, behavior: "instant" });
}

export function useRoute() {
  const [path, setPath] = useState(currentPath());
  useEffect(() => {
    const onHash = () => setPath(currentPath());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return path;
}

// Parse "/trusts/slat" against patterns like "/trusts/:id".
export function match(pattern, path) {
  const pp = pattern.split("/").filter(Boolean);
  const ap = path.split("/").filter(Boolean);
  if (pp.length !== ap.length) return null;
  const params = {};
  for (let i = 0; i < pp.length; i++) {
    if (pp[i].startsWith(":")) params[pp[i].slice(1)] = decodeURIComponent(ap[i]);
    else if (pp[i] !== ap[i]) return null;
  }
  return params;
}

export function Link({ to, children, className = "", style = {}, ...rest }) {
  const onClick = useCallback(
    (e) => {
      // Let modified clicks (open in new tab) behave normally.
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      navigate(to);
    },
    [to]
  );
  const href = to.startsWith("#") ? to : `#${to}`;
  return (
    <a href={href} onClick={onClick} className={className} style={style} {...rest}>
      {children}
    </a>
  );
}
