import { defineConfig } from 'vitepress'

const base = process.env.SITE_BASE || '/'
if (!base.startsWith('/') || !base.endsWith('/')) throw new Error('SITE_BASE must start and end with /')

export default defineConfig({
  title: 'River · 文学作品',
  description: '作品、片段与缓慢阅读。',
  lang: 'zh-CN',
  srcDir: '.generated',
  base,
  cleanUrls: true,
  appearance: true,
  lastUpdated: false,
  themeConfig: {
    logo: undefined,
    siteTitle: 'River',
    nav: [
      { text: '文学作品', link: '/zh/literature/' },
      { text: '关于', link: '/zh/about' }
    ],
    sidebar: [],
    outline: false,
    search: { provider: 'local', options: { locales: { root: { translations: {
      button: { buttonText: '搜索作品', buttonAriaLabel: '搜索作品' },
      modal: { noResultsText: '没有找到相关作品', resetButtonTitle: '清除', displayDetails: '显示详情',
        footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' } }
    } } } } },
    docFooter: { prev: '上一篇', next: '下一篇' },
    footer: { message: '文字之间，留一点空白。', copyright: 'River · 本地阅读样本' }
  }
})
