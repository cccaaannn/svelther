import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/weather-svelte-app/",
  plugins: [svelte()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
})