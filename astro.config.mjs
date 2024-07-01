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
          entryFileNames: 'entry.[hash:11].mjs',
          chunkFileNames: 'chunks/chunk.[hash:11].mjs',
          assetFileNames: 'assets/asset.[hash:11][extname]',
        }
      }
    }
  },
  site: "https://companionai.tech/",
  integrations: [tailwind(), icon(), svelte()],
});
