// Builds the static site: bundles the React app into app.js and generates the
// Tailwind utilities it uses into app.css. Run `npm install` once, then
// `npm run build`. Pass --watch for an incremental dev loop.
//
// Data comes from src/data/*.json, produced by `npm run extract` from the
// source workbook. Re-extract whenever the spreadsheet changes.
import { build, context } from "esbuild";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const watch = process.argv.includes("--watch");

const buildOptions = {
  entryPoints: [join(root, "src", "main.jsx")],
  bundle: true,
  minify: !watch,
  sourcemap: watch,
  format: "iife",
  jsx: "automatic",
  loader: { ".json": "json" },
  define: { "process.env.NODE_ENV": watch ? '"development"' : '"production"' },
  target: ["es2019", "safari13"],
  outfile: join(root, "app.js"),
  logLevel: "info",
};

function tailwind() {
  execFileSync(
    join(root, "node_modules", ".bin", "tailwindcss"),
    ["-c", "tailwind.config.cjs", "-i", "tailwind.css", "-o", "app.css", "--minify"],
    { cwd: root, stdio: "inherit" }
  );
}

if (watch) {
  const ctx = await context(buildOptions);
  await ctx.watch();
  tailwind();
  console.log("Watching for changes... (run tailwind manually if you edit classes)");
} else {
  await build(buildOptions);
  tailwind();
  console.log("Build complete: app.js + app.css");
}
