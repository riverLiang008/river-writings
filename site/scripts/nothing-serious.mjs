import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createHash } from 'node:crypto'

export async function addNothingSerious(add, site) {
  const directory = resolve(site, '../publication/releases/nothing-serious')
  const collection = JSON.parse(await readFile(resolve(directory, 'collection.json'), 'utf8'))
  const scope = ['and-then', 'fuck-you-capacity', 'the-cost-of-attention']
  if (collection.id !== 'nothing-serious' || collection.edition !== 'selected-v1' || collection.entries.length !== 3 || collection.entries.some((entry, i) => entry.id !== scope[i])) throw new Error('Unexpected Nothing Serious release scope')
  const entries = []
  for (const entry of collection.entries) {
    const languages = Object.keys(entry.versions).sort().join(',')
    if (languages !== (entry.id === 'the-cost-of-attention' ? 'en,zh' : 'en')) throw new Error('Unexpected Nothing Serious languages')
    const texts = {}
    for (const [lang, version] of Object.entries(entry.versions)) {
      if (version.file !== `${lang}/${entry.id}.md`) throw new Error('Unexpected Nothing Serious file')
      const text = await readFile(resolve(directory, version.file), 'utf8')
      const title = lang === 'zh' ? entry.title : entry.englishTitle
      if (!text.startsWith(`# ${title}\n`) || createHash('sha256').update(text).digest('hex') !== version.sha256 || /<script|<iframe|@include|\{\{|^---\n|Production Backlog|Production Notes|RECORD VO|Figma:|SRT is master/im.test(text)) throw new Error('Nothing Serious validation failed')
      texts[lang] = text
    }
    entries.push({ ...entry, texts })
  }
  const chapterLink = (entry, lang) => `/${entry.versions[lang] ? lang : 'en'}/literature/nothing-serious/editions/selected-v1/${entry.id}`
  for (const lang of ['zh', 'en']) {
    const english = lang === 'en'
    const title = english ? collection.englishTitle : collection.title
    const root = `/${lang}/literature/nothing-serious/`
    const chapters = entries.map(entry => ({ title: (!english && entry.versions.zh ? entry.title : entry.englishTitle) + (!english && !entry.versions.zh ? ' · English' : ''), link: chapterLink(entry, lang) }))
    const contents = chapters.map((chapter, i) => `<li><a href="${(process.env.SITE_BASE || '/').slice(0, -1)}${chapter.link}"><span>${String(i + 1).padStart(2, '0')}</span><span>${chapter.title}</span></a></li>`).join('')
    add(`${root.slice(1)}index.md`, { title, lang: english ? 'en' : 'zh-CN', aside: false, outline: false }, `<div class="collection-book">
<p class="collection-label">COLLECTION 006</p>

# ${title}

<p class="collection-info">${english ? 'YouTube Lite scripts · 3 pieces / 1 available in Chinese and English' : 'YouTube Lite 文稿 · 3 篇 / 其中 1 篇提供中英文'}</p>
<h2 class="contents-title">${english ? 'CONTENTS' : '目录 / CONTENTS'}</h2>
<ol class="book-contents">${contents}</ol>
</div>`)
    for (const [i, entry] of entries.entries()) {
      if (!entry.versions[lang]) continue
      const other = english ? 'zh' : 'en'
      const neighbor = offset => chapters[i + offset] ? { text: chapters[i + offset].title, link: chapters[i + offset].link } : false
      add(`${chapterLink(entry, lang).slice(1)}.md`, {
        title: english ? entry.englishTitle : entry.title, lang: english ? 'en' : 'zh-CN',
        collectionTitle: title, collectionLink: root, readingLanguage: english ? 'English' : undefined,
        translationLink: entry.versions[other] ? chapterLink(entry, other) : undefined,
        chapters, aside: false, outline: false, prev: neighbor(-1), next: neighbor(1)
      }, entry.texts[lang])
    }
  }
  return { totalEntries: 3, englishEntries: 3, chineseEntries: 1 }
}
