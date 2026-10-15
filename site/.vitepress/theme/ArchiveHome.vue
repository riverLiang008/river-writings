<script setup lang="ts">
import { useData, withBase } from 'vitepress'
const { frontmatter } = useData()
</script>

<template>
  <div class="archive-home">
    <header class="archive-intro">
      <p class="archive-kicker">AN INDEPENDENT WRITING ARCHIVE</p>
      <div class="archive-heading"><h1>River<span>.</span></h1><p>文字的存放处，<br>也是重新阅读的起点。</p></div>
      <div class="archive-caption"><span>文学作品 · 片段 · 个人记录</span><span>A collection of writing & lived experience.</span></div>
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
          <div class="card-title"><span class="card-english">THE UNWRITTEN SHELF</span><h3>书架的另一格</h3></div>
          <p>每一辑保留自己的创作脉络。<br>这里等待下一部作品。</p>
          <div class="card-bottom"><span>尚未收录</span><span>—</span></div>
        </div>
        <div class="archive-card collection-placeholder">
          <div class="card-meta"><span>003 / RESERVED</span><span>目录预留</span></div>
          <div class="card-title"><span class="card-english">NOTES IN THE MARGIN</span><h3>页边，留白</h3></div>
          <p>写下的，重读的，尚待整理的。<br>让片段慢慢形成它的次序。</p>
          <div class="card-bottom"><span>尚未收录</span><span>—</span></div>
        </div>
        <aside class="archive-card archive-note">
          <div class="card-meta"><span>004 / ARCHIVE NOTE</span><span>关于编目</span></div>
          <h3>以辑为线索，<br>沿着文字阅读。</h3>
          <p>辑是作品的容器，体裁是阅读的线索。它们可以交叉，不必重合。</p>
          <div class="card-bottom"><span>当前为虚构样本与布局预留</span><a :href="withBase('/zh/about')">关于这里 ↗</a></div>
        </aside>
      </div>
    </section>

    <section class="archive-reading" aria-labelledby="reading-title">
      <div class="archive-section-label"><h2 id="reading-title">选读 / READING INDEX</h2><span>02 ENTRIES</span></div>
      <a v-for="(entry, index) in frontmatter.archiveCollection.entries" :key="entry.link" :href="withBase(entry.link)" class="reading-row">
        <span class="reading-number">{{ String(Number(index) + 1).padStart(2, '0') }}</span><h3>{{ entry.title }}</h3><span class="reading-origin">{{ frontmatter.archiveCollection.title }} · 散文片段</span><span aria-hidden="true">↗</span>
      </a>
    </section>
    <footer class="archive-endnote"><span>持续整理，缓慢增补。</span><span>中文 / ZH-CN</span></footer>
  </div>
</template>
