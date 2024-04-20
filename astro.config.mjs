import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import svelte from '@astrojs/svelte'
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "http://avatar-landing-page-site.s3-website-us-east-1.amazonaws.com/",
  integrations: [tailwind(), icon(), svelte()],
});
