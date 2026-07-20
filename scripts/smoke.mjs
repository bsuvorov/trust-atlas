// Smoke test: server-render every page + the shell to catch runtime errors
// (bad refs, undefined access, malformed JSX) without a browser. Not a full
// interaction test — it verifies the app mounts and renders each route.
import { build } from "esbuild";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";
import { writeFileSync, rmSync } from "node:fs";

const root = dirname(fileURLToPath(import.meta.url)) + "/..";

// Minimal browser-ish globals the modules touch at import/render time.
const store = {};
globalThis.localStorage = {
  getItem: (k) => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v); },
  removeItem: (k) => { delete store[k]; },
};
globalThis.window = {
  location: { hash: "#/" },
  addEventListener() {},
  removeEventListener() {},
  scrollTo() {},
  print() {},
  matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
};
globalThis.document = { getElementById: () => null, body: {} };

const P = (rel) => JSON.stringify(join(root, rel));
const entry = `
  import { renderToString } from "react-dom/server";
  import Home from ${P("src/pages/Home.jsx")};
  import ExploreTrusts from ${P("src/pages/ExploreTrusts.jsx")};
  import TrustDetail from ${P("src/pages/TrustDetail.jsx")};
  import Compare from ${P("src/pages/Compare.jsx")};
  import SituationalTrusts from ${P("src/pages/SituationalTrusts.jsx")};
  import SituationalDetail from ${P("src/pages/SituationalDetail.jsx")};
  import CaseStudies from ${P("src/pages/CaseStudies.jsx")};
  import SituationGuide from ${P("src/pages/SituationGuide.jsx")};
  import ObjectivesGuide from ${P("src/pages/ObjectivesGuide.jsx")};
  import Reference from ${P("src/pages/Reference.jsx")};
  import trusts from ${P("src/data/trusts.json")};
  import situational from ${P("src/data/situational.json")};

  export function run() {
    const out = {};
    const bad = [];
    const render = (name, el) => {
      const html = renderToString(el);
      out[name] = html.length;
      if (/>undefined<|>null<|>NaN</.test(html)) bad.push(name);
    };
    render("Home", <Home/>);
    render("ExploreTrusts", <ExploreTrusts/>);
    for (const t of trusts.trusts) render("TrustDetail:"+t.id, <TrustDetail id={t.id}/>);
    render("Compare-empty", <Compare/>);
    render("SituationalTrusts", <SituationalTrusts/>);
    for (const t of situational.trusts) render("SituationalDetail:"+t.id, <SituationalDetail id={t.id}/>);
    render("CaseStudies", <CaseStudies/>);
    render("SituationGuide", <SituationGuide/>);
    render("ObjectivesGuide", <ObjectivesGuide/>);
    render("Reference", <Reference/>);
    return { out, bad };
  }
`;

// Write inside the repo so node_modules (react, react-dom) resolves.
const src = join(root, "scripts", ".smoke-entry.jsx");
const outfile = join(root, "scripts", ".smoke-bundle.mjs");
writeFileSync(src, entry);

let out;
try {
  await build({
    entryPoints: [src],
    bundle: true,
    format: "esm",
    platform: "node",
    packages: "external",
    jsx: "automatic",
    loader: { ".json": "json", ".jsx": "jsx" },
    outfile,
    logLevel: "warning",
  });
  const mod = await import(pathToFileURL(outfile).href + "?t=" + Date.now());
  const res = mod.run();
  out = res.out;
  if (res.bad.length) {
    console.error("Views leaking undefined/null/NaN into content:", res.bad);
    process.exit(1);
  }
} finally {
  rmSync(src, { force: true });
  rmSync(outfile, { force: true });
}
const names = Object.keys(out);
const empty = names.filter((n) => !out[n] || out[n] < 20);
console.log(`Rendered ${names.length} views.`);
if (empty.length) {
  console.error("Suspiciously empty renders:", empty);
  process.exit(1);
}
console.log("All views rendered non-empty. Sample sizes:",
  Object.fromEntries(names.slice(0, 4).map((n) => [n, out[n]])));
console.log("OK");
