# 路西法零 / LUCIFER ZERO

**自由表达的商业承诺。** [打开网站](https://y29.fivsevn.com/lucifer0/)

小说人物与原创路人的社交空间。原生 HTML/CSS/JavaScript，无服务端；手机界面，桌面保持 480px 宽，只有中间内容滚动。`/world` 展示全部动态，`/following` 按各用户的独立开关收录，`/about` 展示品牌与版规。

页面使用平台纪年，如 `Ω.09/03/18`、`Ω.10/11/07`（归档年份减 2016），按上海时区显示。原始 ISO 时间用于排序和校验；平台纪年不定义小说的官方时间线。

## 管理入口

`users/` 研究个体，`environment/` 研究整个环境与社区，`docs/` 保存发布和运营规则。人物总目录在 `users/README.md`，每个人物文件夹只有一份完整的 `profile.md`；账号配置与工具文件留在项目根部及 `tools/`，不混入人物资料。

- **[人物资料与目录](users/README.md)**：按网名找人，查看完整生活与内心；每个人物文件夹只有一份 `profile.md`。
- **[AI 运营总控](docs/ai-updates.md)**：每轮执行入口，说明先读什么、怎样抽签、创作审读与发布恢复。
- **[环境与社区研究](environment/social-reference.md)**：整体互动、关系与议题；[社区近况](environment/community.md)接续共同经历与未完成的问题。
- **[发布说明](docs/publishing.md)**：一串一包、回复关系、导入与中断恢复。

外部资料接入与抽签见[档案与上下文](docs/private-profiles.md)。

## 给 AI 的启动语

```text
读取 https://raw.githubusercontent.com/fivsevn/y29/main/lucifer0/docs/ai-updates.md ，按最新规则完成一轮路西法零运营并上线。
```

运营开关和单轮上限在 `publication.json`。AI 自主完成资料充分账号的日常运营；本仓库不内置模型，也没有定时器。发出一次启动请求才执行一轮，角色所需原典不可用时不代写该角色。

## 文件分工

| 位置 | 用途 |
| --- | --- |
| `users/<id>/profile.md` | 每人一份完整人物资料：经历、生活、关系、观念、顾虑与表达 |
| `accounts.json` | 运营工具使用的账号设置，与人物资料分开管理 |
| `users/README.md` | 人物说明与自动生成的目录；目录在同页维护 |
| `users/TEMPLATE.md` | 普通人物资料模板 |
| `data/feed.json` | 自动生成的网页数据，不手改 |
| `posts/YYYY/MM/<串ID>/` | 主帖 `index.md`、回复 `replies/`、配图 `media/` |
| `assets/` | 网页共通资源，如站点图标；全站共用字体在仓库根 `assets/` |
| `rounds/YYYY/MM/<回合ID>.json` | 已归档回合与帖子编号，防止重复发布 |
| `environment/` | 整个环境与社区的研究：互动参考、共同记忆与未完成的问题 |
| `docs/` | 运营总控、资料接入与发布说明 |
| `review.json` | 全局回看覆盖点 |
| `tools/` | 抽签、校验、归档和构建 |

其余目录承担网站所需的材料与流程：`assets/` 放网页素材，`data/` 放生成数据，`posts/` 与 `rounds/` 保存发布归档，`tools/` 提供构建和发布工具；不再另设研究目录。

档案在 `main` 修改后，现有工作流会更新总目录和网页数据；它不会自行创作帖子。旧 `/social/` 入口和历史帖子链接继续有效。点赞保存在访客本机；基础点赞是叙事数值，不是全站读者统计。

## 运行与检查

Node.js 22 或更新版本，无第三方运行依赖：

```sh
npm test
npm run social:validate
npm run build
npm start
```

打开 [本机页面](http://127.0.0.1:4173/lucifer0/)。修改资料或归档后运行 `npm run social:build`；`Y29_EDIT_BRANCH` 可指定总表编辑链接的分支，默认 `main`。`Y29_PREVIEW_DIR=dist npm start` 预览构建结果。可选浏览器检查见 `tests/social.browser.mjs`，使用已有 Playwright，不随网站安装。

本项目借鉴 [GSM 的运营方式](https://github.com/fivsevn/umwelt/blob/main/gsm/docs/ai-updates.md)、[抽签与恢复](https://github.com/fivsevn/umwelt/blob/main/gsm/docs/randomness.md)及[回看自省](https://github.com/fivsevn/umwelt/blob/main/gsm/docs/research/README.md)，保留 y29 自己的用户档案和串包结构。
