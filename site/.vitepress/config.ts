import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'node:url'

const base = process.env.SITE_BASE || '/'
if (!base.startsWith('/') || !base.endsWith('/')) throw new Error('SITE_BASE must start and end with /')

export default defineConfig({
  title: 'River · 文学作品',
  description: 'River 的文学档案：以辑为线索，沿着文字阅读。',
  lang: 'zh-CN',
  srcDir: '.generated',
  markdown: { math: true },
  vite: { publicDir: fileURLToPath(new URL('../public', import.meta.url)) },
  base,
  cleanUrls: true,
  appearance: true,
  lastUpdated: false,
  locales: {
    root: { label: '中文 + English', lang: 'zh-CN', link: '/' },
    en: {
      label: 'English', lang: 'en', link: '/en/',
      description: 'River’s writing archive. Chinese originals and English translations.',
      themeConfig: {
        nav: [{ text: 'GitHub', link: 'https://github.com/riverLiang008/river-writings' }],
        search: { provider: 'local' },
        langMenuLabel: 'Language',
        returnToTopLabel: 'Back to top',
        darkModeSwitchLabel: 'Appearance',
        darkModeSwitchTitle: 'Switch to dark theme',
        lightModeSwitchTitle: 'Switch to light theme'
      }
    }
  },
  themeConfig: {
    i18nRouting: false,
    langMenuLabel: '语言 / Language',
    logo: undefined,
    siteTitle: 'RIVER',
    nav: [
      { text: 'GitHub', link: 'https://github.com/riverLiang008/river-writings' },
      { text: '关于 / ABOUT', link: '/zh/about' }
    ],
    sidebar: [],
    outline: false,
    search: { provider: 'local', options: { locales: { root: { translations: {
      button: { buttonText: '搜索作品', buttonAriaLabel: '搜索作品' },
      modal: { noResultsText: '没有找到相关作品', resetButtonTitle: '清除', displayDetails: '显示详情',
        footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' } }
    } } } } },
    docFooter: { prev: '上一篇', next: '下一篇' },
    footer: { copyright: '© 2026 RIVER' }
  }
})
