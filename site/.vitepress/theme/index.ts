import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import LiteraryLayout from './LiteraryLayout.vue'
import './style.css'

export default { extends: DefaultTheme, Layout: LiteraryLayout } satisfies Theme
