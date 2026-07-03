// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import mermaid from 'astro-mermaid';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://coderturtle.io/",
  trailingSlash: "always",

  redirects: {
    "/blog/": "/projects/",
    "/blog/vibing/": "/projects/coderturtle-io/log/vibing-with-chatgpt/",
  },

  integrations: [
    mdx(),
    // Dark is now the site's default theme; match mermaid's fallback theme
    // to it. autoTheme still switches per-visitor via the data-theme
    // attribute set by ThemeToggle/pre-paint scripts.
    mermaid({ theme: "dark" }),
    sitemap(),   // generates sitemap at build time
    tailwind()   // official Tailwind integration
  ],
  markdown: {
    // Shiki highlights every fenced code block, including ```mermaid,
    // before astro-mermaid's rehype plugin gets a chance to turn it into a
    // real diagram — so mermaid blocks were silently rendering as
    // syntax-highlighted text instead of diagrams. `excludeLangs` only
    // takes effect when `syntaxHighlight` is the object form (not the
    // "shiki" string shorthand); it leaves matching blocks as plain
    // <code class="language-mermaid"> for astro-mermaid to transform.
    syntaxHighlight: {
      type: "shiki",
      excludeLangs: ["mermaid"],
    },
    shikiConfig: {
      theme: "github-dark-dimmed" // other options: 'nord', 'monokai', 'dracula', etc.
    }
  }
});
