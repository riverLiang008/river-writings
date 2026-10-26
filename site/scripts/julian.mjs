import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createHash } from 'node:crypto'

export async function addJulian(add, site) {
  const directory = resolve(site, '../publication/releases/julian')
  const collection = JSON.parse(await readFile(resolve(directory, 'collection.json'), 'utf8'))
  if (collection.id !== 'julian' || collection.edition !== 'selected-v1' || collection.entries.length !== 4 || collection.entries.some((entry, index) => entry.id !== ['perhaps-an-unemployed-drifter', 'the-coin-is-still-in-the-air', 'between-two-worlds', 'a-mark'][index])) throw new Error('Unexpected julian release scope')
  const validated = []
  for (const entry of collection.entries) {
  if (entry.file !== `${entry.id}.md` || entry.translation.file !== `en/${entry.id}.md`) throw new Error('Unexpected julian release files')
  const texts = {}
  for (const [language, file, hash, title] of [['zh', entry.file, entry.sha256, entry.title], ['en', entry.translation.file, entry.translation.sha256, entry.englishTitle]]) {
    const text = await readFile(resolve(directory, file), 'utf8')
    if (createHash('sha256').update(text).digest('hex') !== hash || !text.startsWith(`# ${title}\n`) || /<script|<iframe|@include|\{\{/im.test(text) || text.startsWith('---\n')) throw new Error('Julian release validation failed')
    texts[language] = text
  }
  if (entry.translation.sourceSha256 !== entry.sha256 || !texts.en.includes('Translated into English by ChatGPT.')) throw new Error('Julian translation validation failed')
  validated.push({ ...entry, texts })
  }
  for (const language of ['zh', 'en']) {
    const english = language === 'en'
    const title = english ? collection.englishTitle : collection.title
    const root = `/${language}/literature/julian/`
    const chapters = validated.map(entry => ({ title: english ? entry.englishTitle : entry.title, link: `${root}editions/${collection.edition}/${entry.id}` }))
    add(`${root.slice(1)}index.md`, { title, lang: english ? 'en' : 'zh-CN', aside: false, outline: false }, `<div class="collection-book">
<p class="collection-label">COLLECTION 002</p>

# ${title}

<p class="collection-info">${english ? `Conversations · Translated from Chinese / ${chapters.length} pieces` : `已审章节 · 中文原作 / ${chapters.length} 篇`}</p>
<h2 class="contents-title">${english ? 'CONTENTS' : '目录 / CONTENTS'}</h2>
<ol class="book-contents">${chapters.map((chapter, index) => `<li><a href="${process.env.SITE_BASE ? process.env.SITE_BASE.slice(0, -1) : ''}${chapter.link}"><span>${String(index + 1).padStart(2, '0')}</span><span>${chapter.title}</span></a></li>`).join('')}</ol>
</div>`)
    for (const [index, entry] of validated.entries()) {
    const { title: chapterTitle, link } = chapters[index]
    const neighbor = offset => chapters[index + offset] ? { text: chapters[index + offset].title, link: chapters[index + offset].link } : false
    add(`${link.slice(1)}.md`, { title: chapterTitle, lang: english ? 'en' : 'zh-CN', collectionTitle: title, collectionLink: root, originalDate: entry.date, ...(english ? { readingLanguage: 'English' } : {}), translationLink: `/${english ? 'zh' : 'en'}/literature/julian/editions/${collection.edition}/${entry.id}`, chapters, aside: false, outline: false, prev: neighbor(-1), next: neighbor(1) }, entry.texts[language])
    }
  }
  return { totalEntries: collection.entries.length }
}
