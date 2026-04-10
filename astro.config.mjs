import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://johnnylemonny.github.io",
  base: "/ExoVault",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  }
});
