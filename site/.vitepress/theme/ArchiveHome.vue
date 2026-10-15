<script setup lang="ts">
import { useData, withBase } from 'vitepress'
const { frontmatter } = useData()
</script>

<template>
  <div class="archive-home">
    <header class="archive-intro">
      <div class="archive-heading"><h1>River<span>.</span></h1></div>
    </header>

    <section class="archive-collections" aria-labelledby="collections-title">
      <div class="archive-section-label"><h2 id="collections-title">辑 / COLLECTIONS</h2><span>INDEX · 001—004</span></div>
      <div class="collection-grid">
        <a class="archive-card collection-featured" :href="withBase(frontmatter.archiveCollection.link)">
          <div class="card-meta"><span>001 / COLLECTION</span><span>虚构样本 · 02 篇</span></div>
          <div class="card-title"><span class="card-english">ALONG THE RIVER</span><h3>{{ frontmatter.archiveCollection.title }}</h3></div>
          <p>从清晨的河岸，到午后的窗边。<br>两个日常片刻，一次缓慢的行走。</p>
          <div class="card-bottom"><span>散文片段 / 中文</span><span class="card-action">进入这一辑 ↗</span></div>
        </a>
        <div class="archive-card collection-placeholder">
          <div class="card-meta"><span>002 / RESERVED</span><span>目录预留</span></div>
          <div class="card-title"><h3>未题名</h3></div>
          <div class="card-bottom"><span>尚未收录</span><span>—</span></div>
        </div>
        <div class="archive-card collection-placeholder">
          <div class="card-meta"><span>003 / RESERVED</span><span>目录预留</span></div>
          <div class="card-title"><h3>未题名</h3></div>
          <div class="card-bottom"><span>尚未收录</span><span>—</span></div>
        </div>
        <div class="archive-card collection-placeholder archive-note">
          <div class="card-meta"><span>004 / RESERVED</span><span>目录预留</span></div>
          <div class="card-title"><h3>未题名</h3></div>
          <div class="card-bottom"><span>尚未收录</span><span>—</span></div>
        </div>
      </div>
    </section>

    <section class="archive-reading" aria-labelledby="reading-title">
      <div class="archive-section-label"><h2 id="reading-title">选读 / READING INDEX</h2><span>02 ENTRIES</span></div>
      <a v-for="(entry, index) in frontmatter.archiveCollection.entries" :key="entry.link" :href="withBase(entry.link)" class="reading-row">
        <span class="reading-number">{{ String(Number(index) + 1).padStart(2, '0') }}</span><h3>{{ entry.title }}</h3><span class="reading-origin">{{ frontmatter.archiveCollection.title }} · 散文片段</span><span aria-hidden="true">↗</span>
      </a>
    </section>
  </div>
</template>
