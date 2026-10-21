import { readFile, readdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
const output = resolve(dirname(fileURLToPath(import.meta.url)), '../.vitepress/dist')
const expected = [...['zh', 'en'].flatMap(lang => [`${lang}/literature/diagonal/index.html`, `${lang}/literature/diagonal/editions/selected-v1/z293.html`, `${lang}/literature/diagonal/editions/selected-v1/go-to-xinjiang.html`]), 'en/literature/a-cloud/editions/selected-v1/thought-and-thought.html', 'en/literature/a-cloud/editions/selected-v1/blue-bicycle.html', 'index.html', 'en/index.html', 'en/literature/a-cloud/index.html', 'en/literature/a-cloud/editions/selected-v1/sleepwalker.html', 'en/literature/a-cloud/editions/selected-v1/nothing-happened.html', '404.html', 'zh/about.html', 'zh/literature/index.html',
  'zh/literature/demo/index.html', 'zh/literature/demo/editions/sample-v1/morning.html',
  'zh/literature/demo/editions/sample-v1/window.html', 'zh/literature/a-cloud/index.html',
  ...['sleepwalker', 'nothing-happened', 'blue-bicycle', 'thought-and-thought'].map(id => `zh/literature/a-cloud/editions/selected-v1/${id}.html`)]
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
for (const [id, noteCount] of Object.entries({ sleepwalker: 2, 'nothing-happened': 1, 'blue-bicycle': 0, 'thought-and-thought': 7 })) {
  const text = await readFile(resolve(output, `zh/literature/a-cloud/editions/selected-v1/${id}.html`), 'utf8')
  if (/FOOTREF|原注 ·|&lt;sup/.test(text)) throw new Error(`Unconverted reading markup: ${id}`)
  for (let n = 1; n <= noteCount; n++) {
    for (const marker of [`id="note-${n}"`, `id="ref-${n}"`, `href="#note-${n}"`, `href="#ref-${n}"`]) {
      if (text.split(marker).length !== 2) throw new Error(`Missing or duplicate note link ${marker}: ${id}`)
    }
  }
  if (id === 'nothing-happened') {
    const poem = text.match(/<div class="poem">([\s\S]*?)<\/div>/)?.[1]
    if (!poem || (poem.match(/<br\s*\/?>/g) || []).length !== 3) throw new Error('Expected four poem lines')
  }
}
const englishPage = await readFile(resolve(output, 'en/literature/a-cloud/editions/selected-v1/sleepwalker.html'), 'utf8')
for (const marker of ['Translated into English by ChatGPT.', 'id="translation-note"', 'href="#translation-note"', 'not transcriptions of Williams', '/zh/literature/a-cloud/editions/selected-v1/sleepwalker']) {
  if (!englishPage.includes(marker)) throw new Error(`English attribution or source link missing: ${marker}`)
}
for (const n of [1, 2]) {
  for (const marker of [`id="note-${n}"`, `id="ref-${n}"`, `href="#note-${n}"`, `href="#ref-${n}"`]) {
    if (!englishPage.includes(marker)) throw new Error(`English note link missing: ${marker}`)
  }
}
const secondEnglishPage = await readFile(resolve(output, 'en/literature/a-cloud/editions/selected-v1/nothing-happened.html'), 'utf8')
for (const marker of ['Translated into English by ChatGPT.', 'not a verified quotation', 'id="ref-1"', 'id="note-1"', 'href="#note-1"', 'href="#ref-1"', '/zh/literature/a-cloud/editions/selected-v1/nothing-happened', '/en/literature/a-cloud/editions/selected-v1/sleepwalker']) {
  if (!secondEnglishPage.includes(marker)) throw new Error(`Second English page missing: ${marker}`)
}
const englishPoem = secondEnglishPage.match(/<div class="poem">([\s\S]*?)<\/div>/)?.[1]
if (!englishPoem || (englishPoem.match(/<br\s*\/?>/g) || []).length !== 3) throw new Error('Expected four English poem lines')
const thirdEnglishPage = await readFile(resolve(output, 'en/literature/a-cloud/editions/selected-v1/blue-bicycle.html'), 'utf8')
for (const marker of ['Translated into English by ChatGPT.', 'Moment A:', 'Moment B:', '/zh/literature/a-cloud/editions/selected-v1/blue-bicycle', '/en/literature/a-cloud/editions/selected-v1/nothing-happened']) {
  if (!thirdEnglishPage.includes(marker)) throw new Error(`Third English page missing: ${marker}`)
}
const fourthEnglishPage = await readFile(resolve(output, 'en/literature/a-cloud/editions/selected-v1/thought-and-thought.html'), 'utf8')
for (const marker of ['Translated into English by ChatGPT.', 'class="chapter-subtitle"', 'provisional back-translations', 'id="translation-note"', '/zh/literature/a-cloud/editions/selected-v1/thought-and-thought', '/en/literature/a-cloud/editions/selected-v1/blue-bicycle']) {
  if (!fourthEnglishPage.includes(marker)) throw new Error(`Fourth English page missing: ${marker}`)
}
for (let n = 1; n <= 7; n++) {
  for (const marker of [`id="note-${n}"`, `id="ref-${n}"`, `href="#note-${n}"`, `href="#ref-${n}"`]) {
    if (fourthEnglishPage.split(marker).length !== 2) throw new Error(`Missing or duplicate fourth English note link: ${marker}`)
  }
}
for (const path of ['en/literature/a-cloud/index.html', 'en/literature/a-cloud/editions/selected-v1/blue-bicycle.html', 'zh/literature/a-cloud/editions/selected-v1/thought-and-thought.html']) {
  if (!(await readFile(resolve(output, path), 'utf8')).includes('/en/literature/a-cloud/editions/selected-v1/thought-and-thought')) throw new Error(`Fourth translation link missing from ${path}`)
}
console.log(`Verified ${html.length} pages, Chinese and English notes, translation attribution, four poem lines and build boundaries.`)

for (const language of ['zh', 'en']) {
  const chapter = await readFile(resolve(output, `${language}/literature/diagonal/editions/selected-v1/go-to-xinjiang.html`), 'utf8')
  const other = language === 'en' ? 'zh' : 'en'
  if (!chapter.includes(`/${other}/literature/diagonal/editions/selected-v1/go-to-xinjiang`)) throw new Error('Missing diagonal language switch')
  if (language === 'en' && !chapter.includes('Translated into English by ChatGPT.')) throw new Error('Missing diagonal translation credit')
  const home = await readFile(resolve(output, language === 'en' ? 'en/index.html' : 'index.html'), 'utf8')
  if (!home.includes(`/${language}/literature/diagonal/`)) throw new Error('Missing diagonal home link')
}
if (files.some(path => path.includes('review-v1'))) throw new Error('Local review pages leaked into public build')

for (const language of ['zh', 'en']) {
  const root = `/${language}/literature/diagonal/editions/selected-v1/`
  const first = await readFile(resolve(output, `${root.slice(1)}go-to-xinjiang.html`), 'utf8')
  const second = await readFile(resolve(output, `${root.slice(1)}z293.html`), 'utf8')
  if (!first.includes(`${root}z293`) || !second.includes(`${root}go-to-xinjiang`)) throw new Error('Missing diagonal chapter navigation')
  const other = language === 'en' ? 'zh' : 'en'
  if (!second.includes(`/${other}/literature/diagonal/editions/selected-v1/z293`)) throw new Error('Missing Z293 language switch')
  if (language === 'en' && !second.includes('Translated into English by ChatGPT.')) throw new Error('Missing Z293 translation credit')
}
