<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData, withBase } from 'vitepress'
import ArchiveHome from './ArchiveHome.vue'
const { frontmatter } = useData()
</script>

<template>
  <DefaultTheme.Layout>
    <template #home-hero-before><ArchiveHome v-if="frontmatter.archiveCollection" /></template>
    <template #doc-before>
      <div v-if="frontmatter.collectionTitle" class="reading-context">
        <a :href="withBase(frontmatter.collectionLink)">{{ frontmatter.collectionTitle }}</a>
        <span>虚构阅读样本 · 中文</span>
        <details class="chapter-menu">
          <summary>作品目录</summary>
          <ol>
            <li v-for="chapter in frontmatter.chapters" :key="chapter.link">
              <a :href="withBase(chapter.link)" :aria-current="chapter.title === frontmatter.title ? 'page' : undefined">{{ chapter.title }}</a>
            </li>
          </ol>
        </details>
      </div>
    </template>
  </DefaultTheme.Layout>
</template>
