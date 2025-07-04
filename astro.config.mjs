// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://coderturtle.github.io/coderturtle-blog/", // 👈 repo URL
  base: "/coderturtle-blog/",                              // 👈 repo URL
  trailingSlash: "always",

  integrations: [
    mdx(),
    sitemap(),   // generates sitemap at build time
    tailwind()   // official Tailwind integration
  ]
});