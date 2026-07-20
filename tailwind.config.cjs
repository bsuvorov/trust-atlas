/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        ink: "#1C2430",
        paper: "#F7F6F2",
        oxblood: "#7A2E2E",
        sage: "#5C6B5E",
        line: "#D9D5CC",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["'IBM Plex Sans'", "-apple-system", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
