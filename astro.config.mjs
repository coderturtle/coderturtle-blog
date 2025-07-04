// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import mermaid from 'astro-mermaid';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://coderturtle.github.io/coderturtle-blog/", // 👈 repo URL
  base: "/coderturtle-blog/",                              // 👈 repo URL
  trailingSlash: "always",

  integrations: [
    mdx(),
    mermaid(),
    sitemap(),   // generates sitemap at build time
    tailwind()   // official Tailwind integration
  ],
  markdown: {
    syntaxHighlight: "shiki", // <-- THIS ENABLES SHIKI
    shikiConfig: {
      theme: "ayu" // other options: 'nord', 'monokai', 'dracula', etc.
    }
  }
});