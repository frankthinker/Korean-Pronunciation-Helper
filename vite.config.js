import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { edgeTtsPlugin } from './server/edgeTtsMiddleware.js'

export default defineConfig({
  plugins: [react(), edgeTtsPlugin()],
  server: {
    port: 5175,
    hmr: {
      overlay: true,
    },
  },
})
