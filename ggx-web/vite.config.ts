import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// GitHub Pages serves the project at /GGX/; local dev stays at /
export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/GGX/' : '/',
  plugins: [react(), tailwindcss()],
  build: { rolldownOptions: { input: { main: 'index.html', deck: 'deck.html' } } },
})
