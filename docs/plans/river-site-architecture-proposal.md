# River 文学作品网站：架构提案

日期：2026-10-14（Asia/Shanghai）
状态：范围已确认，2026-10-15 已按作者授权建立本地网站工程；正式内容发布与部署待确认。

## 1. 定位与边界

riverWritings 用于文学作品的保存、编辑与网站建设。网站围绕作品集、书籍、系列和章节组织，提供文学阅读体验。

Odyssey Design 的设计文档由独立仓库 odysseyDesign/odyssey-architecture 维护，作为产品内链接的目标。文档结构、稳定 URL、版本与发布节奏由该项目管理。本站删除 Systems & Design 栏目，不创建 Odyssey 项目页，不复制其文档。

文学随笔归入文学作品。「思想实验」作为独立作品单位，SSTM 与 AD（Agency Dynamic）是其内部章节，首页仅展示「思想实验」，不标注章节名；章节正文整理与发布另行确认。原材料内的历史分类和发布方案保留不改；当前规划以作者最新确认的范围为准。

## 2. 已完成的目录整理

原 materials/ 整体移动到 sources/materials/，根目录三本 PDF 移至 sources/pdf/。保留原文件名、正文和内部结构，移动前后 28 个文件的 SHA-256 校验一致。本次只归档原材料，未提取 PDF、改写作品或生成发布版本。

| 位置 | 内容 |
|---|---|
| sources/pdf/ | 《天空中飘来一朵云》《尤里安》《在对角线上》三个原始 PDF |
| sources/materials/ 根部 | 四份编辑／发布方案和未命名.md，内部历史参考 |
| sources/materials/有风吹过的寻常下午/ | Intro 和 Afternoon No. 01—03，共四份 Markdown |
| sources/materials/晨光熹微中我们看见镜中的自己/ | 六篇随笔和 Preface，共七份 Markdown |
| sources/materials/痛苦的时候，发呆的时间就会变长/ | 三份未完成小说 Markdown，默认内部保存 |
| sources/materials/ideas/ | SSTM、Agency Dynamic 原稿；对应「思想实验」，原稿不直接导入网站 |
| sources/materials/.obsidian/ | 四份编辑器 JSON，不进入构建 |

共 21 份 Markdown、3 份 PDF、4 份 JSON。文件名、正文标题和最终作品集名分别核对，不自动重命名或纠错。原作日期从正文核对，不以文件修改时间代替。2026-10-14 已按作者授权初始化本地 Git，默认分支 main；尚无提交或远程仓库。

## 3. 技术方案

首选 VitePress + TypeScript 元数据校验 + Markdown + 自定义文学阅读布局 + 本地搜索 + GitHub Actions/Pages。实施时核对稳定版本、Node/pnpm 兼容性并锁定依赖。

此前 Odyssey 只读调查发现其使用 VitePress 1.6.4、pnpm、本地搜索和 Pages 部署。这些仅作为工程经验参考，不意味着纳入其内容或导航。此前未完成线上视觉与交互核验，不将本地配置调查当作已实测体验。

| 方案 | 取舍 |
|---|---|
| VitePress + 文学布局 | 复用工程经验，定制作品列表、目录与阅读样式，作为首选 |
| Astro + Content Collections | 内容模型与布局自由，若 VitePress 定制过重则作为备选 |
| Astro Starlight | 偏向文档阅读，不作为一期默认 |

先用虚构文学样本验证布局。产品文档三栏、editLink 和 lastUpdated 不直接移用到文学正文；KaTeX/Mermaid 不作为一期默认依赖，有具体作品需求时另行评估。

## 4. 信息架构与阅读体验

Home → Literary Works（文学作品）→ Collection（作品集／书籍／系列）→ Chapter（章节）。About、Search、Language 为辅助入口。首页展示简短作者介绍、获批作品集与少量开始阅读入口，不采用无限博客时间流。

当前首页六个作品单位使用稳定 id：a-cloud、julian、diagonal、afternoon、sunset、thought-experiments；最后一项为「思想实验」，收录 SSTM 与 AD。目前仅展示作品单位名称，不导入真实正文。novel 保留为内部作品身份，不改名或复用于「思想实验」，暂不展示。章节不脱离作品成为独立出版单位。

作品页展示标题、介绍、年代、体裁、公开版本、目录、开始阅读及获批封面与下载。正文使用单栏、适中行宽和中文行距，显示作品归属及原作日期。目录按钮展开当前作品章节；短文默认无右侧目录，长章节可提供本章目录。

移动端优先正文。上一篇／下一篇位于文末，按当前作品、版本和语言的 manifest 顺序生成。验证长标题、键盘操作、焦点返回、放大阅读及系统／浅色／深色主题。

## 5. 目录规划

目前实际包含 sources/、docs/plans/、site/、根 README 与 pnpm 工作区配置，已建立仅检查和构建的 GitHub Actions；content、editorial、assets 和 publication 仍为后续规划。

```text
riverWritings/
├── README.md
├── sources/                         # 内部原材料，不直接构建
│   ├── materials/                   # 原 Markdown、编辑记录、Obsidian 状态
│   └── pdf/                         # 原始 PDF
├── docs/plans/                      # 网站方案与 TODO
├── editorial/                       # 后续编辑记录
├── content/                         # 后续整理版本，不默认公开
│   ├── author/
│   └── literature/
│       ├── a-cloud/
│       ├── julian/
│       ├── diagonal/
│       ├── afternoon/
│       ├── sunset/
│       ├── thought-experiments/
│       └── novel/                   # 内部保留，暂不公开
├── assets/                          # 后续资源，逐项批准导出
├── publication/
│   ├── releases/                    # 获批清单
│   └── exports/                     # 获批内容导出
└── site/                            # 后续建站工程
    ├── scripts/
    ├── .vitepress/
    └── .generated/                  # 唯一构建输入
```

sources 保存原始依据，content 保存另行整理的版本，site 保存工具与主题。整理稿不覆盖原稿。新增作品通过 manifest、正文及审批记录加入，自动生成列表与导航。

可选私有编辑仓库与独立公开发布仓库；公开仓库仅接收获批内容、资源及工具，不同步内部材料和历史。是否分仓仍待决定，与 Odyssey 独立文档仓库无关。

## 6. 内容与版本模型

层级为 collection → edition → entry。作品与章节使用稳定 id，标题和 slug 分开；slug 变更须有重定向。作品目录使用 collection.yaml 和 editions/<edition-id>/<language>/，manifest 管理有序章节、介绍与版本。

| 字段 | 规则 |
|---|---|
| id、entryId、collection、edition | 稳定身份与有效作品归属 |
| title、originalTitle、language | 原始和显示标题分别登记；zh-CN/en |
| date、datePrecision、dateOriginalText | 原作日期和精度，未知用 null |
| revisedAt、publishedAt | 修订与发表日期，不覆盖写作日期 |
| status、completion、visibility | 默认 draft、internal；完成度与发布批准分开 |
| version、editionKind、supersedes | original/revised/publication 分版 |
| translationOf、sourceVersion、translationStatus | 译文绑定明确源版本 |
| entries、featuredEntries | 有序章节与获批推荐 |
| sourceRecord、sourceHash、assets | 内部来源与资源记录，内部路径不导出 |

发布清单绑定作品、章节、语言、版本、正文和资源哈希及作者批准范围。未来新增章节不继承批准；内容变化重新确认。系列可发布明确阶段版本，整书不默认用少量章节代替全本。

## 7. 双语、搜索与资源

建议 /zh/、/en/ 双前缀；根入口默认中文或语言选择待定。示例：/zh/literature/a-cloud/ 和 /zh/literature/a-cloud/editions/publication-v1/<chapter-slug>。

语言切换按身份和源版本查找真实获批译文。缺译明确提示并提供继续阅读中文的入口；部分翻译显示范围，不创建英文空页。仅真实配对输出 hreflang，canonical 指向自身语言和版本。

搜索仅索引获批生成内容，结果显示作品、章节、语言与版本；验证中文查询质量后再决定替代工具。图片登记来源、权利、图注与替代文本，PDF 下载单独批准。脚注与引用按作品实际需要验证。

## 8. 构建与部署

内部材料 → 版本整理与批准 → 发布清单校验 → 白名单导出 → site/.generated/ → 构建与产物检查 → 批准部署。

不递归扫描仓库根、sources 或全部 content。缺批准、有效归属、版本或资源登记时拒绝导出。页面、导航、搜索、下载与语言配对来自同一获批集合。检查 HTML、页面数据、搜索索引、资源与下载是否含内部材料。隐藏菜单、noindex 和 .gitignore 不代替发布边界。

Pages 仓库名、用户站／项目站和域名待定。CI 冻结安装、校验、构建并检查后仅上传 dist；验证 base 下的资源、深链接、刷新和 404。初期手动部署，保留发布版本与回滚对象。

## 9. 待决定事项

1. 文学样本验证后确定 VitePress 或 Astro。
2. 编辑与发布仓库划分、名称和 Pages 地址。
3. 默认语言、根入口及英文介绍范围。
4. 首期作品、版本、章节、封面和 PDF 下载范围。
5. 固定版本 URL 与可选当前版本短链接。
6. 网站基础设施实施和实际部署授权范围。

2026-10-15 已建立 VitePress 1.6.4 本地站点并安装锁定依赖，使用虚构样本生成 7 页。类型检查、静态产物检查和 Pages 子路径构建通过；首页与章节 HTTP 返回 200。浏览器工具不可用，视觉与交互待验收。尚未提取 PDF、导入真实作品、实现正式发布审批或部署。
