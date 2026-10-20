import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createHash } from 'node:crypto'

export async function addDiagonal(add, site) {
  const directory = resolve(site, '../publication/releases/diagonal')
  const collection = JSON.parse(await readFile(resolve(directory, 'collection.json'), 'utf8'))
  if (collection.id !== 'diagonal' || collection.edition !== 'selected-v1' || collection.entries.length !== 1 || collection.entries[0].id !== 'go-to-xinjiang') throw new Error('Unexpected diagonal release scope')
  const entry = collection.entries[0]
  if (entry.file !== 'go-to-xinjiang.md' || entry.translation.file !== 'en/go-to-xinjiang.md') throw new Error('Unexpected diagonal release files')
  const texts = {}
  for (const [language, file, hash, title] of [['zh', entry.file, entry.sha256, entry.title], ['en', entry.translation.file, entry.translation.sha256, entry.englishTitle]]) {
    const text = await readFile(resolve(directory, file), 'utf8')
    if (createHash('sha256').update(text).digest('hex') !== hash || !text.startsWith(`# ${title}\n`) || /<script|<iframe|@include|\{\{|^---/im.test(text)) throw new Error('Diagonal release validation failed')
    texts[language] = text
  }
  if (entry.translation.sourceSha256 !== entry.sha256 || !texts.en.includes('Translated into English by ChatGPT.')) throw new Error('Diagonal translation validation failed')
  for (const language of ['zh', 'en']) {
    const english = language === 'en'
    const title = english ? collection.englishTitle : collection.title
    const chapterTitle = english ? entry.englishTitle : entry.title
    const root = `/${language}/literature/diagonal/`
    const link = `${root}editions/${collection.edition}/${entry.id}`
    add(`${root.slice(1)}index.md`, { title, lang: english ? 'en' : 'zh-CN', aside: false, outline: false }, `<div class="collection-book">
<p class="collection-label">COLLECTION 003</p>

# ${title}

<p class="collection-info">${english ? 'Travel writing · Translated from Chinese / 1 piece' : '旅行写作 · 中文原作 / 1 篇'}</p>
<h2 class="contents-title">${english ? 'CONTENTS' : '目录 / CONTENTS'}</h2>
<ol class="book-contents"><li><a href="${process.env.SITE_BASE ? process.env.SITE_BASE.slice(0, -1) : ''}${link}"><span>01</span><span>${chapterTitle}</span></a></li></ol>
</div>`)
    add(`${link.slice(1)}.md`, { title: chapterTitle, lang: english ? 'en' : 'zh-CN', collectionTitle: title, collectionLink: root, originalDate: entry.date, ...(english ? { readingLanguage: 'English' } : {}), translationLink: `/${english ? 'zh' : 'en'}/literature/diagonal/editions/${collection.edition}/${entry.id}`, chapters: [{ title: chapterTitle, link }], aside: false, outline: false, prev: false, next: false }, texts[language])
  }
  return { totalEntries: collection.entries.length }
}
