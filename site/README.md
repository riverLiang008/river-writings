# River 网站工程

VitePress 1.6.4 文学阅读骨架，使用虚构作品样本，不导入 sources 原材料。

在仓库根目录运行：

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm build
pnpm preview
```

Node.js 22+，pnpm 11.9.0。首次安装须联网；pnpm-lock.yaml 统一记录工作区依赖。

- `fixtures/`：明确标识为虚构的样本 manifest 与正文。
- `scripts/generate.mjs`：只读取上述固定样本目录，生成首页、作品列表、作品目录和章节。
- `.generated/`：生成内容，不手工修改或跟踪。
- `.vitepress/`：配置、Vue 布局和阅读样式。
- `.vitepress/dist/`：静态构建输出，不跟踪。

修改样本后重启 dev（生成器目前在启动和构建时执行）；主题和配置由 VitePress 热更新。

作品目录、上一篇／下一篇从 manifest 的顺序生成。默认中文，未构造英文页面；真实内容审批和译文配对流程尚未实现。构建检查固定样本页面集合和原材料路径泄漏，不能代替未来正式发布流程。

部署项目子路径时设置 `SITE_BASE=/仓库名/`，例如 PowerShell：

```powershell
$env:SITE_BASE='/river-writings/'
pnpm build
```

CI 只检查与构建，没有部署步骤。
