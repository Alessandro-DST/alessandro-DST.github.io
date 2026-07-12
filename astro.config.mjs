// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages user site: served from the domain root, so no `base` is needed.
export default defineConfig({
  site: 'https://alessandro-DST.github.io',
  vite: {
    plugins: [tailwindcss()],
  },
});
