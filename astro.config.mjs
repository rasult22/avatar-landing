import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import svelte from '@astrojs/svelte'
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  vite: {
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'entry.[hash:6].mjs',
          chunkFileNames: 'chunks/chunk.[hash:6].mjs',
          assetFileNames: 'assets/asset.[hash:6][extname]',
        }
      }
    }
  },
  site: "https://companionai.tech/",
  integrations: [tailwind(), icon(), svelte()],
});
