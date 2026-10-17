<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData, withBase } from 'vitepress'
import ArchiveHome from './ArchiveHome.vue'
const { frontmatter } = useData()
</script>

<template>
  <DefaultTheme.Layout :class="{ 'has-reading-translation': !!frontmatter.translationLink }">
    <template #nav-bar-content-after>
      <a v-if="frontmatter.translationLink" class="article-language-switch" :href="withBase(frontmatter.translationLink)" :lang="frontmatter.readingLanguage ? 'zh-CN' : 'en'">{{ frontmatter.readingLanguage ? '中文' : 'English' }}</a>
    </template>
    <template #home-hero-before><ArchiveHome v-if="frontmatter.archiveCollection" /></template>
    <template #doc-before>
      <div v-if="frontmatter.collectionTitle" class="reading-context">
        <a :href="withBase(frontmatter.collectionLink)">{{ frontmatter.collectionTitle }}</a>
        <span>{{ frontmatter.originalDate || '虚构阅读样本' }} · {{ frontmatter.readingLanguage || '中文' }}</span>
        <a v-if="frontmatter.translationLink" class="reading-language" :href="withBase(frontmatter.translationLink)" :lang="frontmatter.readingLanguage ? 'zh-CN' : 'en'">{{ frontmatter.readingLanguage ? '中文原文' : 'English' }}</a>
        <details class="chapter-menu">
          <summary>{{ frontmatter.readingLanguage ? 'Contents' : '作品目录' }}</summary>
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
