// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://www.rayhsu.tech",
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
  },
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
