import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // '/' locally and on a name.github.io / name.gitlab.io site; the GitLab pipeline sets
  // BASE_PATH=/<project-name>/ when the site lives under a sub-path
  base: process.env.BASE_PATH || '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
