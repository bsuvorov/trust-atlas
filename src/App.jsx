import { useEffect } from "react";
import { INK, PAPER, OXBLOOD, SAGE, LINE, GLOBAL_CSS } from "./theme.jsx";
import { useRoute, match, Link } from "./lib/router.jsx";
import { RateStrip } from "./components/RateStrip.jsx";
import { CompareTray } from "./components/CompareTray.jsx";

import Home from "./pages/Home.jsx";
import ExploreTrusts from "./pages/ExploreTrusts.jsx";
import TrustDetail from "./pages/TrustDetail.jsx";
import Compare from "./pages/Compare.jsx";
import SituationalTrusts from "./pages/SituationalTrusts.jsx";
import SituationalDetail from "./pages/SituationalDetail.jsx";
import CaseStudies from "./pages/CaseStudies.jsx";
import SituationGuide from "./pages/SituationGuide.jsx";
import ObjectivesGuide from "./pages/ObjectivesGuide.jsx";
import Reference from "./pages/Reference.jsx";

const NAV = [
  { to: "/trusts", label: "Explore Trusts" },
  { to: "/situational", label: "Situational Trusts" },
  { to: "/cases", label: "Case Studies" },
  { to: "/situations", label: "Situation Guide" },
  { to: "/objectives", label: "Objectives Guide" },
];

function renderRoute(path) {
  if (path === "/") return <Home />;
  if (path === "/trusts") return <ExploreTrusts />;
  let p;
  if ((p = match("/trusts/:id", path))) return <TrustDetail id={p.id} />;
  if (path === "/compare") return <Compare />;
  if (path === "/situational") return <SituationalTrusts />;
  if ((p = match("/situational/:id", path))) return <SituationalDetail id={p.id} />;
  if (path === "/cases") return <CaseStudies />;
  if (path === "/situations") return <SituationGuide />;
  if (path === "/objectives") return <ObjectivesGuide />;
  if (path === "/reference") return <Reference />;
  return <NotFound />;
}

function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <div className="ta-display text-3xl">Page not found</div>
      <Link
        to="/trusts"
        className="ta-body mt-4 inline-block underline underline-offset-4"
        style={{ color: OXBLOOD }}
      >
        Back to the lineup
      </Link>
    </div>
  );
}

function Header({ path }) {
  const isActive = (to) => path === to || path.startsWith(to + "/");
  return (
    <header className="ta-noprint sticky top-0 z-30" style={{ background: INK }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-2.5">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="ta-display text-lg font-semibold" style={{ color: PAPER }}>
            Trust Atlas
          </span>
          <span className="ta-mono hidden text-[10px] uppercase tracking-widest sm:inline" style={{ color: "#7C8494" }}>
            irrevocable structures
          </span>
        </Link>
        <RateStrip />
      </div>
      <nav style={{ background: "#161D28", borderTop: `1px solid #2A3140` }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-1 px-3">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="ta-body px-3 py-2.5 text-[13px] font-medium transition-colors"
              style={{
                color: isActive(n.to) ? PAPER : "#9AA1AD",
                borderBottom: `2px solid ${isActive(n.to) ? OXBLOOD : "transparent"}`,
              }}
            >
              {n.label}
            </Link>
          ))}
          <div className="flex-1" />
          <Link
            to="/reference"
            className="ta-body px-3 py-2.5 text-[13px] transition-colors"
            style={{
              color: path === "/reference" ? PAPER : "#7C8494",
              borderBottom: `2px solid ${path === "/reference" ? OXBLOOD : "transparent"}`,
            }}
          >
            Reference
          </Link>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer
      className="ta-noprint mt-16"
      style={{ background: INK, color: "#9AA1AD" }}
    >
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="ta-display text-lg" style={{ color: PAPER }}>
          Trust Atlas
        </div>
        <p className="ta-body mt-3 max-w-2xl text-[13px] leading-relaxed">
          A study and comparison tool for irrevocable trust structures, built
          from a practitioner reference workbook. Figures are July 2026 and reset
          monthly. This site is an educational reference and does not represent
          legal, tax, or financial advice.
        </p>
        <div className="ta-mono mt-5 flex flex-wrap gap-x-5 gap-y-1 text-[11px]">
          <Link to="/trusts" style={{ color: "#B9C0AE" }}>Explore Trusts</Link>
          <Link to="/situational" style={{ color: "#B9C0AE" }}>Situational Trusts</Link>
          <Link to="/cases" style={{ color: "#B9C0AE" }}>Case Studies</Link>
          <Link to="/situations" style={{ color: "#B9C0AE" }}>Situation Guide</Link>
          <Link to="/objectives" style={{ color: "#B9C0AE" }}>Objectives Guide</Link>
          <Link to="/reference" style={{ color: "#B9C0AE" }}>Reference</Link>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const path = useRoute();

  useEffect(() => {
    document.body.className = "ta-body";
  }, []);

  return (
    <div style={{ background: PAPER, minHeight: "100vh", color: INK }}>
      <style>{GLOBAL_CSS}</style>
      <Header path={path} />
      <main className="ta-page ta-fade" key={path}>
        {renderRoute(path)}
      </main>
      <Footer />
      <CompareTray />
      <div style={{ height: 72 }} className="ta-noprint" />
    </div>
  );
}
