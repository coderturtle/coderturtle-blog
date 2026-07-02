/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,md,mdx}"],   // include .astro!
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        night:     "#1C1C1E",
        shell:     "#4C956C",
        coral:     "#F25C54",
        ivory:     "#F1ECCE",
        paper:     "#F7F4EA",
        mist:      "#82B8BA",
        kraft:     "#C9A56A",
        bark:      "#6B4E2E",
        parchment: "#FBF7EC",
        // Dark-mode "glow workshop at night" palette: void is the deep
        // background (darker than `night`, which becomes an elevated
        // surface color on top of it), glow is a brightened shell-green
        // used for bloom/glow accents on interactive elements.
        void:      "#0A0F0D",
        glow:      "#6FDDA0",
      },
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
        sans: ["Atkinson", "Inter", "ui-sans-serif", "system-ui"],
      },
      transitionTimingFunction: {
        // Snappier "instrument panel" feel for hover/interaction chrome
        // (bare `transition` utility default). Ambient/idle animations
        // (turtle wander, status pip pulse) keep their own explicit easing.
        DEFAULT: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
