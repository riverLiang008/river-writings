import { readFile, mkdir, writeFile, readdir, unlink } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const site = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const output = resolve(site, '.generated')
const fixtures = resolve(site, 'fixtures')
const collection = JSON.parse(await readFile(resolve(fixtures, 'collection.json'), 'utf8'))
const safeId = /^[a-z0-9-]+$/
if (collection.fictional !== true || collection.language !== 'zh-CN' || !safeId.test(collection.id) || !safeId.test(collection.edition)) {
  throw new Error('Only explicit fictional Chinese samples are supported in this scaffold')
}
if (!collection.title || !Array.isArray(collection.entries) || !collection.entries.length) throw new Error('Invalid collection')
const seen = new Set()
const chapters = []
const root = `/zh/literature/${collection.id}/`
for (const entry of collection.entries) {
  if (!safeId.test(entry.id) || seen.has(entry.id) || !entry.title || !/^[a-z0-9-]+\.md$/.test(entry.file)) throw new Error('Invalid chapter')
  seen.add(entry.id)
  const text = await readFile(resolve(fixtures, entry.file), 'utf8')
  if (!text.startsWith(`# ${entry.title}\n`) || /<script|<iframe|@include|^---/im.test(text)) throw new Error('Unsupported sample Markdown')
  chapters.push({ ...entry, text, link: `${root}editions/${collection.edition}/${entry.id}` })
}
// Remove only generated Markdown under the dedicated output root; preserve VitePress caches elsewhere.
async function clearMarkdown(directory) {
  await mkdir(directory, { recursive: true })
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, item.name)
    if (item.isSymbolicLink()) throw new Error('Symlinks are forbidden in generated content')
    if (item.isDirectory()) await clearMarkdown(path)
    else if (item.name.endsWith('.md')) await unlink(path)
    else throw new Error(`Unexpected generated file: ${item.name}`)
  }
}
await clearMarkdown(output)
const pages = new Map()
function add(path, metadata, body) {
  pages.set(path, `---\n${Object.entries(metadata).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n')}\n---\n\n${body}\n`)
}
add('index.md', {
  layout: 'home',
  archiveCollection: { title: collection.title, link: root, entries: chapters.map(({ title, link }) => ({ title, link })) }
}, '')
add('zh/literature/index.md', { title: '文学作品' }, `# 文学作品\n\n以作品集为起点，沿着章节阅读。\n\n## [${collection.title}](${root})\n\n${collection.description}\n\n虚构样本 · ${chapters.length} 篇 · 中文\n\n[开始阅读 →](${chapters[0].link})\n\n---\n\n当前是网站阅读样本，正式作品将在整理和确认后加入。`)
add('zh/about.md', { title: '关于' }, '# 关于\n\n这里是 River 的文学作品阅读空间。作品将以书籍、作品集和系列的方式呈现，让每一篇文字保留它所在的语境。\n\n目前开放的是虚构阅读样本。作者介绍与正式作品将在确认后补充。')
add('404.md', { title: '页面未找到' }, '# 这一页还没有文字\n\n[回到首页](/) · [浏览作品](/zh/literature/)')
add(`zh/literature/${collection.id}/index.md`, { title: collection.title }, `# ${collection.title}\n\n${collection.description}\n\n虚构样本 · 中文 · ${collection.edition}\n\n[开始阅读 →](${chapters[0].link})\n\n## 目录\n\n${chapters.map((c, i) => `${i + 1}. [${c.title}](${c.link})`).join('\n')}\n\n---\n\n本作品仅用于试读网站，不属于作者现有作品。`)
for (const [index, chapter] of chapters.entries()) {
  const neighbor = (offset) => chapters[index + offset] ? { text: chapters[index + offset].title, link: chapters[index + offset].link } : false
  add(`${chapter.link.slice(1)}.md`, {
    title: chapter.title, collectionTitle: collection.title, collectionLink: root,
    chapters: chapters.map(({ title, link }) => ({ title, link })),
    prev: neighbor(-1), next: neighbor(1)
  }, chapter.text)
}
for (const [path, text] of pages) {
  const target = resolve(output, path)
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, text, 'utf8')
}
console.log(`Generated ${pages.size} pages from explicit fictional fixtures; sources/ was not scanned.`)
