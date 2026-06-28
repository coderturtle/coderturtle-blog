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
        paper:  "#F7F4EA",
        mist:   "#82B8BA",
      },
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
        sans: ["Atkinson", "Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
