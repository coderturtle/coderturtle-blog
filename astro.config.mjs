import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [tailwind()],
  base: "/coderturtle.io/",
  site: "https://coderturtle.github.io/coderturtle.io",
  trailingSlash: "always"
});
