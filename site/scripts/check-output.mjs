import { readFile, readdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
const output = resolve(dirname(fileURLToPath(import.meta.url)), '../.vitepress/dist')
const expected = [...['zh', 'en'].flatMap(lang => [`${lang}/literature/afternoon/index.html`, `${lang}/literature/afternoon/editions/selected-v1/afternoon-01.html`]), ...['zh', 'en'].flatMap(lang => [`${lang}/literature/diagonal/index.html`, `${lang}/literature/diagonal/editions/selected-v1/epilogue.html`, `${lang}/literature/diagonal/editions/selected-v1/tianshan.html`, `${lang}/literature/diagonal/editions/selected-v1/sayram-lake.html`, `${lang}/literature/diagonal/editions/selected-v1/kuerdening.html`, `${lang}/literature/diagonal/editions/selected-v1/train-through-xinjiang.html`, `${lang}/literature/diagonal/editions/selected-v1/new-years-eve.html`, `${lang}/literature/diagonal/editions/selected-v1/z293.html`, `${lang}/literature/diagonal/editions/selected-v1/go-to-xinjiang.html`]), 'en/literature/a-cloud/editions/selected-v1/thought-and-thought.html', 'en/literature/a-cloud/editions/selected-v1/blue-bicycle.html', 'index.html', 'en/index.html', 'en/literature/a-cloud/index.html', 'en/literature/a-cloud/editions/selected-v1/sleepwalker.html', 'en/literature/a-cloud/editions/selected-v1/nothing-happened.html', '404.html', 'zh/about.html', 'zh/literature/index.html',
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

for (const language of ['zh', 'en']) {
  const root = `/${language}/literature/diagonal/editions/selected-v1/`
  const second = await readFile(resolve(output, `${root.slice(1)}z293.html`), 'utf8')
  const third = await readFile(resolve(output, `${root.slice(1)}new-years-eve.html`), 'utf8')
  if (!second.includes(`${root}new-years-eve`) || !third.includes(`${root}z293`)) throw new Error('Missing third diagonal chapter navigation')
  const other = language === 'en' ? 'zh' : 'en'
  if (!third.includes(`/${other}/literature/diagonal/editions/selected-v1/new-years-eve`)) throw new Error('Missing third diagonal language switch')
  if (language === 'en' && !third.includes('Translated into English by ChatGPT.')) throw new Error('Missing third diagonal translation credit')
}

for (const language of ['zh', 'en']) {
  const root = `/${language}/literature/diagonal/editions/selected-v1/`
  const previous = await readFile(resolve(output, `${root.slice(1)}new-years-eve.html`), 'utf8')
  const current = await readFile(resolve(output, `${root.slice(1)}train-through-xinjiang.html`), 'utf8')
  if (!previous.includes(`${root}train-through-xinjiang`) || !current.includes(`${root}new-years-eve`)) throw new Error('Missing fourth diagonal chapter navigation')
  const other = language === 'en' ? 'zh' : 'en'
  if (!current.includes(`/${other}/literature/diagonal/editions/selected-v1/train-through-xinjiang`)) throw new Error('Missing fourth diagonal language switch')
  if (language === 'en') {
    for (const marker of ['Translated into English by ChatGPT.', 'remain to be verified', 'id="ref-1"', 'id="note-1"', 'href="#ref-1"', 'href="#note-1"']) {
      if (!current.includes(marker)) throw new Error(`Missing fourth diagonal credit or source note: ${marker}`)
    }
  }
}

for (const language of ['zh', 'en']) {
  const root = `/${language}/literature/diagonal/editions/selected-v1/`
  const previous = await readFile(resolve(output, `${root.slice(1)}train-through-xinjiang.html`), 'utf8')
  const current = await readFile(resolve(output, `${root.slice(1)}kuerdening.html`), 'utf8')
  if (!previous.includes(`${root}kuerdening`) || !current.includes(`${root}train-through-xinjiang`)) throw new Error('Missing Kuerdening chapter navigation')
  const other = language === 'en' ? 'zh' : 'en'
  if (!current.includes(`/${other}/literature/diagonal/editions/selected-v1/kuerdening`)) throw new Error('Missing Kuerdening language switch')
  if (language === 'en' && !current.includes('Translated into English by ChatGPT.')) throw new Error('Missing Kuerdening translation credit')
}

for (const language of ['zh', 'en']) {
  const root = `/${language}/literature/diagonal/editions/selected-v1/`
  const previous = await readFile(resolve(output, `${root.slice(1)}kuerdening.html`), 'utf8')
  const current = await readFile(resolve(output, `${root.slice(1)}sayram-lake.html`), 'utf8')
  if (!previous.includes(`${root}sayram-lake`) || !current.includes(`${root}kuerdening`)) throw new Error('Missing Sayram Lake chapter navigation')
  const other = language === 'en' ? 'zh' : 'en'
  if (!current.includes(`/${other}/literature/diagonal/editions/selected-v1/sayram-lake`)) throw new Error('Missing Sayram Lake language switch')
  if (language === 'en' && !current.includes('Translated into English by ChatGPT.')) throw new Error('Missing Sayram Lake translation credit')
}

for (const language of ['zh', 'en']) {
  const root = `/${language}/literature/diagonal/editions/selected-v1/`
  const previous = await readFile(resolve(output, `${root.slice(1)}sayram-lake.html`), 'utf8')
  const current = await readFile(resolve(output, `${root.slice(1)}tianshan.html`), 'utf8')
  if (!previous.includes(`${root}tianshan`) || !current.includes(`${root}sayram-lake`)) throw new Error('Missing Tianshan chapter navigation')
  const other = language === 'en' ? 'zh' : 'en'
  if (!current.includes(`/${other}/literature/diagonal/editions/selected-v1/tianshan`)) throw new Error('Missing Tianshan language switch')
  if (language === 'en' && !current.includes('Translated into English by ChatGPT.')) throw new Error('Missing Tianshan translation credit')
}

for (const language of ['zh', 'en']) {
  const root = `/${language}/literature/diagonal/editions/selected-v1/`
  const previous = await readFile(resolve(output, `${root.slice(1)}tianshan.html`), 'utf8')
  const current = await readFile(resolve(output, `${root.slice(1)}epilogue.html`), 'utf8')
  if (!previous.includes(`${root}epilogue`) || !current.includes(`${root}tianshan`)) throw new Error('Missing epilogue navigation')
  const other = language === 'en' ? 'zh' : 'en'
  if (!current.includes(`/${other}/literature/diagonal/editions/selected-v1/epilogue`)) throw new Error('Missing epilogue language switch')
  if (language === 'en' && (!current.includes('Translated into English by ChatGPT.') || !current.includes('the Xinjiang Museum'))) throw new Error('Missing epilogue credit or museum name')
}

for (const language of ['zh', 'en']) {
  const root = `/${language}/literature/afternoon/`
  const link = `${root}editions/selected-v1/afternoon-01`
  const chapter = await readFile(resolve(output, `${link.slice(1)}.html`), 'utf8')
  const index = await readFile(resolve(output, `${root.slice(1)}index.html`), 'utf8')
  const home = await readFile(resolve(output, language === 'en' ? 'en/index.html' : 'index.html'), 'utf8')
  const other = language === 'en' ? 'zh' : 'en'
  if (!home.includes(root) || !index.includes(link) || !chapter.includes(`/${other}/literature/afternoon/editions/selected-v1/afternoon-01`)) throw new Error('Missing afternoon collection or language link')
  if (language === 'en' && !chapter.includes('Translated into English by ChatGPT.')) throw new Error('Missing afternoon translation credit')
  if (/Self-Introduction|Incoming Product Professional|Occupation/.test(chapter)) throw new Error('Private afternoon introduction leaked')
}
if (html.some(path => /afternoon-0[23]/.test(path))) throw new Error('Unapproved afternoon entry published')
