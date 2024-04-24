import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import svelte from '@astrojs/svelte'
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://companionai.tech/",
  integrations: [tailwind(), icon(), svelte()],
});
