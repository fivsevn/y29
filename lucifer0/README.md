# 路西法零 / LUCIFER ZERO

**自由表达的商业承诺。** [打开网站](https://y29.fivsevn.com/lucifer0/)

小说人物与原创路人的社交空间，使用原生 HTML/CSS/JavaScript 构建静态网站。手机界面，桌面保持 480px 宽，中间内容区域滚动。`/world` 展示全部动态，`/following` 按各用户的独立开关收录，`/about` 展示品牌与版规。

页面使用平台纪年，如 `Ω.09/03/18`、`Ω.10/11/07`（归档年份减 2016），按上海时区显示。原始 ISO 时间用于排序和校验，平台纪年用于网页展示。

## 结构与入口

| 模块 | 入口与文件 | 作用 |
| --- | --- | --- |
| 人物研究 | [users/](users/README.md) | `README.md` 汇总人物目录与参考，`TEMPLATE.md` 提供资料结构；每个人物文件夹内的一份 `profile.md` 保存完整生活与内心 |
| 环境研究 | [environment/](environment/social-reference.md) | 整体环境与社区的互动研究、公共记忆和待接续问题 |
| AI 运营 | [docs/](docs/ai-updates.md) | 发布总控、资料读取、观察审读、抽签与发布恢复规则 |
| 配置与回看 | `publication.json` | 运营总开关与单轮发布上限 |
| 配置与回看 | `accounts.json` | 账号的运营设置与抽取权重 |
| 配置与回看 | `review.json` | 全局回看的覆盖记录 |
| 发布归档 | `posts/YYYY/MM/<串ID>/` | 保存主帖 `index.md`、回复 `replies/` 与配图 `media/` |
| 发布归档 | `rounds/YYYY/MM/<回合ID>.json` | 记录已归档回合与帖子编号，供发布和恢复核对 |
| 网页数据 | `data/feed.json` | 从人物资料和发布归档生成的页面数据 |
| 网页资源 | `index.html`、`style.css`、`app.js`、`core.js` | 页面结构、样式与交互；访客点赞保存在本机，帖子基础点赞为叙事数值 |
| 网页资源 | `assets/` | 图标等共用素材；共用字体放在仓库根 `assets/` |
| 兼容入口 | `../social/` | 保留旧 `/social/` 入口与历史帖子链接 |
| 工具 | `tools/` | 抽签、校验、导入、归档和构建 |
| 自动同步 | `../.github/workflows/social-content.yml` | 资料合入 `main` 后更新人物目录、网页数据与页面构建 |

## 给 AI 的启动语

```text
读取 https://raw.githubusercontent.com/fivsevn/y29/main/lucifer0/docs/ai-updates.md ，按最新规则完成一轮路西法零运营并上线。
```

每次启动请求执行一轮，由 AI 按运营总控完成资料读取、创作与发布。

## 运行与检查

- 环境：Node.js 22 或更新版本。
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
- 浏览器检查：`tests/social.browser.mjs` 使用本机已有的 Playwright。
