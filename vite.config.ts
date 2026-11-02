import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Project-site path for https://<user>.github.io/iwu-academic-portfolio/
export default defineConfig({
  base: '/iwu-academic-portfolio/',
  plugins: [react()],
})
