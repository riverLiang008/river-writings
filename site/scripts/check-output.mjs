import { readFile, readdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
const output = resolve(dirname(fileURLToPath(import.meta.url)), '../.vitepress/dist')
const expected = ['index.html', 'en/index.html', '404.html', 'zh/about.html', 'zh/literature/index.html',
  'zh/literature/demo/index.html', 'zh/literature/demo/editions/sample-v1/morning.html',
  'zh/literature/demo/editions/sample-v1/window.html', 'zh/literature/a-cloud/index.html',
  ...['sleepwalker', 'nothing-happened', 'blue-bicycle', 'thought-and-thought', 'arrogance-of-advice', 'reading-and-existence'].map(id => `zh/literature/a-cloud/editions/selected-v1/${id}.html`)]
async function walk(path, prefix = '') {
  const results = []
  for (const item of await readdir(path, { withFileTypes: true })) {
    const relative = `${prefix}${item.name}`
    if (item.isDirectory()) results.push(...await walk(resolve(path, item.name), `${relative}/`))
    else results.push(relative)
  }
  return results
}
const files = await walk(output)
const html = files.filter((path) => path.endsWith('.html'))
if (html.length !== expected.length || expected.some((path) => !html.includes(path))) throw new Error('Unexpected page set in build')
for (const path of files) {
  if (/\.pdf$|\.map$|\.obsidian|^sources\//.test(path)) throw new Error(`Forbidden build artifact: ${path}`)
  if (/\.(html|js|json|css)$/.test(path)) {
    const text = await readFile(resolve(output, path), 'utf8')
    if (/SSTM_Original|Agency_Dynamic_Original|River_Editorial_|sources\/materials|sources\/pdf/.test(text)) throw new Error(`Internal material reference in ${path}`)
  }
}
console.log(`Verified ${html.length} sample pages and build artifact boundaries.`)
