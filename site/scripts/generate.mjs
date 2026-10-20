import { readFile, mkdir, writeFile, readdir, unlink } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'

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
  pages.set(path, `---\n${Object.entries(metadata).filter(([, value]) => value !== undefined).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n')}\n---\n\n${body}\n`)
}
add('zh/literature/index.md', { title: '文学作品' }, `# 文学作品\n\n以作品集为起点，沿着章节阅读。\n\n## [${collection.title}](${root})\n\n${collection.description}\n\n虚构样本 · ${chapters.length} 篇 · 中文\n\n[开始阅读 →](${chapters[0].link})\n\n---\n\n当前是网站阅读样本，正式作品将在整理和确认后加入。`)
add('zh/about.md', { title: '关于' }, '# 关于\n\n这里是 River 的文学作品阅读空间。作品将以书籍、作品集和系列的方式呈现，让每一篇文字保留它所在的语境。\n\n目前可阅读《天空中飘来一朵云》四篇精选。其余作品陆续整理。')
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
const releaseDir = resolve(site, '../publication/releases/a-cloud')
const release = JSON.parse(await readFile(resolve(releaseDir, 'collection.json'), 'utf8'))
const allowed = ['sleepwalker', 'nothing-happened', 'blue-bicycle', 'thought-and-thought']
if (release.id !== 'a-cloud' || release.edition !== 'selected-v1' || release.entries.length !== allowed.length || release.entries.some((entry, index) => entry.id !== allowed[index] || entry.file !== `${entry.id}.md`)) throw new Error('Unexpected cloud release scope')
const cloudRoot = '/zh/literature/a-cloud/'
const cloudChapters = release.entries.map(entry => ({ ...entry, link: `${cloudRoot}editions/${release.edition}/${entry.id}` }))
add('zh/literature/a-cloud/index.md', { title: release.title, aside: false, outline: false }, `<div class="collection-book">
<p class="collection-label">COLLECTION 001</p>

# ${release.title}

<p class="collection-info">中文原作 · 选集 / ${cloudChapters.length} 篇</p>
<h2 class="contents-title">目录 / CONTENTS</h2>
<ol class="book-contents">${cloudChapters.map((entry, index) => `<li><a href="${process.env.SITE_BASE ? process.env.SITE_BASE.slice(0, -1) : ''}${entry.link}"><span>${String(index + 1).padStart(2, '0')}</span><span>${entry.title}<span class="collection-keywords">${entry.keywords.zh.join(" · ")}</span></span></a></li>`).join('')}</ol>
</div>`)
for (const [index, entry] of cloudChapters.entries()) {
  const text = await readFile(resolve(releaseDir, entry.file), 'utf8')
  if (createHash('sha256').update(text).digest('hex') !== entry.sha256 || !text.startsWith(`# ${entry.title}\n`) || /等待戈多的人都该死|<script|<iframe|@include|\{\{/.test(text)) throw new Error('Release content failed validation')
  const neighbor = offset => cloudChapters[index + offset] ? { text: cloudChapters[index + offset].title, link: cloudChapters[index + offset].link } : false
  add(`${entry.link.slice(1)}.md`, { title: entry.title, collectionTitle: release.title, collectionLink: cloudRoot, originalDate: entry.date, translationLink: ['sleepwalker', 'nothing-happened', 'blue-bicycle', 'thought-and-thought'].includes(entry.id) ? `/en/literature/a-cloud/editions/selected-v1/${entry.id}` : undefined, aside: false, outline: false, chapters: cloudChapters.map(({ title, link }) => ({ title, link })), prev: neighbor(-1), next: neighbor(1) }, text)
}
const englishDir = resolve(releaseDir, 'en')
const translation = JSON.parse(await readFile(resolve(englishDir, 'translation.json'), 'utf8'))
const englishText = await readFile(resolve(englishDir, 'sleepwalker.md'), 'utf8')
if (translation.id !== 'sleepwalker' || translation.language !== 'en' || translation.sourceSha256 !== release.entries[0].sha256 || createHash('sha256').update(englishText).digest('hex') !== translation.sha256 || !englishText.includes('Translated into English by ChatGPT.') || !englishText.includes('not transcriptions of Williams')) throw new Error('English release validation failed')
const englishCollectionTitle = 'A Cloud Drifts Across the Sky'
const secondTranslation = JSON.parse(await readFile(resolve(englishDir, 'nothing-happened.translation.json'), 'utf8'))
const secondText = await readFile(resolve(englishDir, 'nothing-happened.md'), 'utf8')
if (secondTranslation.id !== 'nothing-happened' || secondTranslation.language !== 'en' || secondTranslation.sourceSha256 !== release.entries[1].sha256 || createHash('sha256').update(secondText).digest('hex') !== secondTranslation.sha256 || !secondText.startsWith(`# ${secondTranslation.title}\n`) || !secondText.includes('Translated into English by ChatGPT.') || !secondText.includes('not a verified quotation')) throw new Error('Second English release validation failed')
const thirdTranslation = JSON.parse(await readFile(resolve(englishDir, 'blue-bicycle.translation.json'), 'utf8'))
const thirdText = await readFile(resolve(englishDir, 'blue-bicycle.md'), 'utf8')
if (thirdTranslation.id !== 'blue-bicycle' || thirdTranslation.language !== 'en' || thirdTranslation.sourceSha256 !== release.entries[2].sha256 || createHash('sha256').update(thirdText).digest('hex') !== thirdTranslation.sha256 || !thirdText.startsWith(`# ${thirdTranslation.title}\n`) || !thirdText.includes('Translated into English by ChatGPT.')) throw new Error('Third English release validation failed')
const fourthTranslation = JSON.parse(await readFile(resolve(englishDir, 'thought-and-thought.translation.json'), 'utf8'))
const fourthText = await readFile(resolve(englishDir, 'thought-and-thought.md'), 'utf8')
if (fourthTranslation.id !== 'thought-and-thought' || fourthTranslation.language !== 'en' || fourthTranslation.sourceSha256 !== release.entries[3].sha256 || createHash('sha256').update(fourthText).digest('hex') !== fourthTranslation.sha256 || !fourthText.startsWith(`# ${fourthTranslation.title}\n`) || !fourthText.includes('Translated into English by ChatGPT.') || !fourthText.includes('provisional back-translations')) throw new Error('Fourth English release validation failed')
const englishChapters = [{ ...translation, text: englishText }, { ...secondTranslation, text: secondText }, { ...thirdTranslation, text: thirdText }, { ...fourthTranslation, text: fourthText }].map(entry => ({ ...entry, link: `/en/literature/a-cloud/editions/selected-v1/${entry.id}` }))
add('en/literature/a-cloud/index.md', { title: englishCollectionTitle, aside: false, outline: false }, `# ${englishCollectionTitle}\n\nChinese originals · English translations\n\n${englishChapters.map((entry, index) => `${index + 1}. [${entry.title}](${entry.link})<span class="collection-keywords">${release.entries.find(source => source.id === entry.id).keywords.en.join(" · ")}</span>`).join('\n')}`)
for (const [index, entry] of englishChapters.entries()) {
  const neighbor = offset => englishChapters[index + offset] ? { text: englishChapters[index + offset].title, link: englishChapters[index + offset].link } : false
  add(`${entry.link.slice(1)}.md`, { title: entry.title, lang: 'en', collectionTitle: englishCollectionTitle, collectionLink: '/en/literature/a-cloud/', originalDate: release.entries[index].date, readingLanguage: 'English', translationLink: cloudChapters[index].link, chapters: englishChapters.map(({ title, link }) => ({ title, link })), aside: false, outline: false, prev: neighbor(-1), next: neighbor(1) }, entry.text)
}
pages.set('zh/literature/index.md', `---\ntitle: 文学作品\n---\n\n# 文学作品\n\n[${release.title}](${cloudRoot})\n`)
for (const [path, archiveEnglish] of [['index.md', false], ['en/index.md', true]]) {
  add(path, { layout: 'home', ...(archiveEnglish ? { title: 'Writing Archive', lang: 'en', archiveEnglish: true } : {}), archiveCollection: { totalEntries: cloudChapters.length, entries: (archiveEnglish ? englishChapters : cloudChapters).map(({ title, link }) => ({ title, link })) } }, '')
}
for (const [path, text] of pages) {
  const target = resolve(output, path)
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, text, 'utf8')
}
console.log(`Generated ${pages.size} pages from explicit fixtures and four hash-verified selected chapters; sources/ was not scanned.`)
