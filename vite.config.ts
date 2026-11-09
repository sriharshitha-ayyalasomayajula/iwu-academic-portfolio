import { createReadStream, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig, type Connect, type ViteDevServer } from 'vite'

const pptxType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
const root = path.dirname(fileURLToPath(import.meta.url))

function pptxMiddleware(): Connect.NextHandleFunction {
  return (req, res, next) => {
    const url = decodeURIComponent((req.url ?? '').split('?')[0])
    if (!url.endsWith('.pptx')) {
      next()
      return
    }
    const relative = url.replace(/^\/iwu-academic-portfolio\//, '')
    const file = path.join(root, 'public', relative)
    if (!existsSync(file)) {
      next()
      return
    }
    const filename = path.basename(file)
    res.setHeader('Content-Type', pptxType)
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    createReadStream(file).pipe(res)
  }
}

function pptxPlugin() {
  return {
    name: 'pptx-content-type',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(pptxMiddleware())
    },
    configurePreviewServer(server: ViteDevServer) {
      server.middlewares.use(pptxMiddleware())
    },
  }
}

// Project-site path for https://<user>.github.io/iwu-academic-portfolio/
export default defineConfig({
  base: '/iwu-academic-portfolio/',
  plugins: [react(), pptxPlugin()],
})
