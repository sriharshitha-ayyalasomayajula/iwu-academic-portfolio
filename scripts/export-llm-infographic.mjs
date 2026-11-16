import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'public/downloads')
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const printUrl =
  process.env.PRINT_URL ??
  'http://127.0.0.1:5173/iwu-academic-portfolio/aiml-501/llm-training/print'
const pdfPath = path.join(outDir, 'aiml-501-llm-training.pdf')

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' })
    child.on('error', reject)
    child.on('exit', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`${command} exited ${code}`))
    })
  })
}

await mkdir(outDir, { recursive: true })

await run(chrome, [
  '--headless=new',
  '--disable-gpu',
  '--no-pdf-header-footer',
  '--hide-scrollbars',
  '--virtual-time-budget=15000',
  `--print-to-pdf=${pdfPath}`,
  printUrl,
])

await run('pdftoppm', ['-png', '-r', '300', pdfPath, path.join(outDir, 'aiml-501-llm-training-page')])

console.log(`Wrote ${pdfPath}`)
