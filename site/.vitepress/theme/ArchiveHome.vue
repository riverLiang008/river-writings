<script setup lang="ts">
import { useData } from 'vitepress'
const { frontmatter } = useData()
const collections = [
  { id: 'a-cloud', title: '天空中飘来一朵云' },
  { id: 'julian', title: '尤里安' },
  { id: 'diagonal', title: '在对角线上' },
  { id: 'afternoon', title: '有风吹过的寻常下午' },
  { id: 'sunset', title: '晨光熹微中我们看见镜中的自己' },
  { id: 'novel', title: '痛苦的时候，发呆的时间就会变长' }
]
</script>

<template>
  <div class="archive-home">
    <header class="archive-intro">
      <div class="archive-heading"><h1>River<span>.</span></h1></div>
    </header>

    <section class="archive-collections" aria-labelledby="collections-title">
      <div class="archive-section-label"><h2 id="collections-title">{{ frontmatter.archiveEnglish ? 'COLLECTIONS' : '辑 / COLLECTIONS' }}</h2><span>INDEX · 001—006</span></div>
      <div class="collection-grid">
        <article v-for="(collection, index) in collections" :key="collection.id" class="archive-card work-shelf" :class="{ 'shelf-wide': [0, 3, 4].includes(index) }">
          <div class="card-meta"><span>{{ String(index + 1).padStart(3, '0') }} / COLLECTION</span></div>
          <div class="card-title"><h3>{{ collection.title }}</h3></div>
        </article>
      </div>
    </section>
  </div>
</template>
