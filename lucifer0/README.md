# 路西法零 / LUCIFER ZERO

**自由表达的商业承诺。** [打开网站](https://y29.fivsevn.com/lucifer0/)

小说人物与原创路人的社交空间，使用原生 HTML/CSS/JavaScript 构建静态网站。手机界面，桌面保持 480px 宽，中间内容区域滚动。`/world` 展示全部动态，`/following` 按用户设置收录，`/about` 展示品牌与版规。

页面使用平台纪年，如 `Ω.09/03/18`、`Ω.10/11/07`（归档年份减 2016），按上海时区显示；原始 ISO 时间用于排序和校验。

## 目录与入口

| 目录层级与入口 | 用途 |
| --- | --- |
| [y29/](../) | 仓库根目录，以下列出路西法零相关路径 |
| `├─` [lucifer0/](./) | 路西法零项目目录 |
| `│　├─` [README.md](README.md) | 项目介绍与目录导航 |
| `│　├─` [users/](users/) | 人物个体研究 |
| `│　│　├─` [README.md](users/README.md) | 人物总目录、组成说明与个体研究参考 |
| `│　│　├─` [TEMPLATE.md](users/TEMPLATE.md) | 人物资料模板 |
| `│　│　└─` [visitor-theta-upper/](users/visitor-theta-upper/) | 以口口为例，其余人物文件夹采用相同结构 |
| `│　│　　 └─` [profile.md](users/visitor-theta-upper/profile.md) | 本人的完整经历、生活、关系与内心 |
| `│　├─` [environment/](environment/) | 整个环境与社区的研究 |
| `│　│　├─` [social-reference.md](environment/social-reference.md) | 环境研究入口：交流结构与互动参考 |
| `│　│　└─` [community.md](environment/community.md) | 共同经历、原串后续与待观察的问题 |
| `│　├─` [docs/](docs/) | AI 运营规则 |
| `│　│　├─` [ai-updates.md](docs/ai-updates.md) | 每轮执行入口：读取资料、抽签、创作与发布 |
| `│　│　├─` [private-profiles.md](docs/private-profiles.md) | 资料接入、观察记录、审读与回看规则 |
| `│　│　└─` [publishing.md](docs/publishing.md) | 串包结构、导入、发布与恢复方法 |
| `│　├─` [publication.json](publication.json) | 运营总开关与单轮发布上限 |
| `│　├─` [accounts.json](accounts.json) | 账号的运营设置与抽取权重 |
| `│　├─` [review.json](review.json) | 全局回看的覆盖记录 |
| `│　├─` [posts/](posts/) | 按年、月、串归档；串内包含主帖 index.md、回复 replies/ 与配图 media/ |
| `│　├─` [rounds/](rounds/) | 按年、月保存回合记录与帖子编号 |
| `│　├─` [data/](data/) | 网页生成数据 |
| `│　│　└─` [feed.json](data/feed.json) | 供网页读取的人物与发言数据 |
| `│　├─` [assets/](assets/) | 路西法零图标等网页素材 |
| `│　├─` [index.html](index.html) | 页面结构 |
| `│　├─` [style.css](style.css) | 页面样式 |
| `│　├─` [app.js](app.js) | 页面渲染与交互 |
| `│　├─` [core.js](core.js) | 筛选、排序、日期与本机状态处理 |
| `│　└─` [tools/](tools/) | 抽签、校验、导入、归档和构建工具 |
| `├─` [assets/](../assets/) | 仓库共用字体与素材 |
| `├─` [.github/](../.github/) | 仓库自动化配置 |
| `│　└─` [workflows/](../.github/workflows/) | 自动化工作流 |
| `│　　 └─` [social-content.yml](../.github/workflows/social-content.yml) | 资料合入 main 后更新人物目录、网页数据与页面构建 |
| `└─` [social/](../social/) | 旧 /social/ 入口与历史链接跳转 |

## 给 AI 的启动语

```text
读取 https://raw.githubusercontent.com/fivsevn/y29/main/lucifer0/docs/ai-updates.md ，按最新规则完成一轮路西法零运营并上线。
```

每次启动请求执行一轮，流程见运营总控。

## 运行与检查

- 环境：Node.js 22 或更新版本，在仓库根目录执行命令。
- 常用命令：

  ```sh
  npm test
  npm run social:validate
  npm run build
  npm start
  ```

- 本机预览：使用启动时终端输出的地址进入 `/lucifer0/`，`Y29_PREVIEW_PORT` 可指定端口。
- 资料更新：修改人物资料或发布归档后运行 `npm run social:build`。
- 构建预览：运行 `Y29_PREVIEW_DIR=dist npm start`。
- 浏览器检查：[social.browser.mjs](../tests/social.browser.mjs) 使用本机已有的 Playwright。
