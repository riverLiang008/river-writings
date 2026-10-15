# River Writings

文学作品原材料、编辑记录与网站规划工作区。

- `sources/materials/`：原 Markdown 与历史编辑／发布方案，保留内部结构。
- `sources/pdf/`：三本作品的原始 PDF。
- `docs/plans/`：文学网站方案与分阶段 TODO。

sources 属于内部原材料，不直接作为网站构建输入。整理稿和发布版本后续另存，不覆盖原稿。「思想实验」收录 SSTM 与 AD，目前仅展示名称，正文另待整理与发布确认。

Odyssey Design 文档在独立项目维护，用作产品内链接，不在此建立栏目或复制内容。

2026-10-14：materials 移至 sources/materials，根目录三个 PDF 移至 sources/pdf；28 个文件移动前后 SHA-256 校验一致。

参见 [架构提案](docs/plans/river-site-architecture-proposal.md) 和 [分阶段 TODO](docs/plans/river-site-todo.md)。

## 网站工程

`site/` 已建立 VitePress 文学阅读工程。使用虚构样本生成页面，原材料不进入构建。

在根目录运行 `pnpm install --frozen-lockfile`，然后 `pnpm dev` 开始本地开发；`pnpm check` 检查类型，`pnpm build` 构建并检查产物，`pnpm preview` 预览构建结果。

具体结构和子路径配置见 [工程说明](site/README.md)。CI 检查与构建；main 分支检查通过后部署到 GitHub Pages，路径为 `/river-writings/`。仓库 Settings → Pages 的 Source 需设为 GitHub Actions。
