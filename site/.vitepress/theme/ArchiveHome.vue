<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import { collections } from './collections'
const { frontmatter } = useData()
const guide = (collection: typeof collections[number]) => frontmatter.value.archiveEnglish ? collection.en : collection.zh
const chapterPreview = () => frontmatter.value.archiveCollection.entries.slice(0, 2).map((entry: { title: string }) => entry.title).join(' / ')
</script>

<template>
  <div class="archive-home">
    <header class="archive-intro">
      <div class="archive-heading"><h1>River<span>.</span></h1></div>
      <p class="archive-preface"><template v-if="frontmatter.archiveEnglish">It feels like a pity that we cannot observe ourselves from the outside.<br>Perhaps that is one of the reasons I began to write.</template><template v-else>觉得人类无法从外部观察自己是一种遗憾。<br>这大概是我写作的初衷之一。</template><a :href="withBase(frontmatter.archiveEnglish ? '/en/preface' : '/zh/preface')">{{ frontmatter.archiveEnglish ? 'PREFACE ↗' : '写在前面 ↗' }}</a></p>
    </header>

    <section class="archive-collections" aria-labelledby="collections-title">
      <div class="archive-section-label"><h2 id="collections-title">{{ frontmatter.archiveEnglish ? 'COLLECTIONS' : '辑 / COLLECTIONS' }}</h2><span>INDEX · 001—{{ String(collections.length).padStart(3, '0') }}</span></div>
      <div class="collection-grid">
        <article v-for="(collection, index) in collections" :key="collection.id" class="archive-card work-shelf" :class="{ 'shelf-wide': [0, 3].includes(index), 'shelf-full': index === 4 }">
          <div class="card-meta"><span>{{ String(index + 1).padStart(3, '0') }} / COLLECTION</span></div>
          <div class="card-title"><h3><a v-if="collection.id === 'a-cloud'" :href="withBase(frontmatter.archiveEnglish ? '/en/literature/a-cloud/' : '/zh/literature/a-cloud/')">{{ frontmatter.archiveEnglish ? collection.englishTitle : collection.title }} ↗</a><a v-else-if="collection.id === 'diagonal' && (frontmatter.diagonalCollection || frontmatter.localDiagonal)" :href="withBase(frontmatter.archiveEnglish ? '/en/literature/diagonal/' : '/zh/literature/diagonal/')">{{ frontmatter.archiveEnglish ? collection.englishTitle : collection.title }} ↗</a><a v-else-if="collection.id === 'afternoon' && frontmatter.afternoonCollection" :href="withBase(frontmatter.archiveEnglish ? '/en/literature/afternoon/' : '/zh/literature/afternoon/')">{{ frontmatter.archiveEnglish ? collection.englishTitle : collection.title }} ↗</a><a v-else-if="collection.id === 'julian' && frontmatter.julianCollection" :href="withBase(frontmatter.archiveEnglish ? '/en/literature/julian/' : '/zh/literature/julian/')">{{ frontmatter.archiveEnglish ? 'Julian' : collection.title }} ↗</a><template v-else>{{ collection.title }}</template></h3></div>
          <div class="collection-guide">
            <p class="collection-genre">{{ guide(collection).genre }}</p>
            <p class="collection-description">{{ guide(collection).description }}</p>
            <p v-if="collection.id === 'a-cloud'" class="collection-contents"><span>{{ frontmatter.archiveEnglish ? 'Contents: ' : '收录：' }}</span>{{ frontmatter.archiveEnglish ? `${frontmatter.archiveCollection.totalEntries} selected pieces in Chinese; ${frontmatter.archiveCollection.entries.length} in English` : `${frontmatter.archiveCollection.totalEntries} 篇精选` }} · {{ chapterPreview() }}</p>
            <p v-else-if="collection.id === 'diagonal' && (frontmatter.diagonalCollection || frontmatter.localDiagonal)" class="collection-contents"><span>{{ frontmatter.archiveEnglish ? 'Contents: ' : '收录：' }}</span>{{ frontmatter.diagonalCollection ? (frontmatter.archiveEnglish ? `${frontmatter.diagonalCollection.totalEntries} pieces in Chinese and English` : `${frontmatter.diagonalCollection.totalEntries} 篇已上线（中英文）`) : '八章 · 本地审稿预览' }}</p>
            <p v-else-if="collection.id === 'afternoon' && frontmatter.afternoonCollection" class="collection-contents"><span>{{ frontmatter.archiveEnglish ? 'Contents: ' : '收录：' }}</span>{{ frontmatter.archiveEnglish ? `${frontmatter.afternoonCollection.totalEntries} ${frontmatter.afternoonCollection.totalEntries === 1 ? 'piece' : 'pieces'} in Chinese and English` : `${frontmatter.afternoonCollection.totalEntries} 篇已上线（中英文）` }}</p>
            <p v-else-if="collection.id === 'julian' && frontmatter.julianCollection" class="collection-contents">{{ frontmatter.archiveEnglish ? '2 reviewed chapters in Chinese and English; remaining chapters forthcoming.' : '收录：2 篇已审章节（中英文），其余章节整理中。' }}</p><p v-else class="collection-contents"><span>{{ frontmatter.archiveEnglish ? 'Contents: ' : '收录：' }}</span>{{ guide(collection).contents }}</p>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
