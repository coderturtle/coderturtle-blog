/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,md,mdx}"],   // include .astro!
  theme: {
    extend: {
      colors: {
        night:  "#1C1C1E",
        shell:  "#4C956C",
        coral:  "#F25C54",
        ivory:  "#F1ECCE",
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "monospace"],
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
