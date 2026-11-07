# 路西法零 / LUCIFER ZERO

虚拟社交网站企业「路西法零」，标语为「自由表达的商业承诺」。原生 HTML/CSS/JavaScript，深色手机界面，桌面也保持最大 480px。页面固定在视口内，只有 App 中间的内容区滚动，顶部与底部导航保持原位。入口暂定 [y29.fivsevn.com/lucifer0/](https://y29.fivsevn.com/lucifer0/)，旧 `/social/` 链接继续跳转。

## 管理用户

**从 [用户总目录](users/用户总目录.md) 找人。** 总表按网名列出作品和参与开关，点击名字进入用户文件夹，点击「编辑档案」直接打开 GitHub 的 Markdown 编辑器。

每个用户一个文件夹，初始只有一份 `profile.md`，包含账号、公开资料、基本设定、表达习惯、关系、标签、事实依据和自由备注。需要时可以在同目录增加 `关系.md`、`经历.md` 等文档，AI 每轮会一起读取。统一运营规则放在 [ai-updates.md](docs/ai-updates.md)，不混入用户设定。新增方法和模板见 [用户管理说明](users/README.md)。

初始 56 个账号：8 个作品人物、48 个原创路人。当前人物资料与帖子仍为样例；网名依据现有公开日常资料暂定，可继续按核准的人设调整。路人混合匿名名与自取网名，不统一使用希腊字母系列。启用、AI 范围、主帖、回复与 `/following` 都是独立设置，作品来源不会自动决定关注栏目。

在 GitHub 的 main 分支修改档案后，`Update Lucifer Zero directory and feed` 工作流会读取最新文档，校验并自动更新总表与网页数据；不需要再手工维护第二份账号清单。工作流只生成已有内容的目录和展示数据，不创作帖子、不启用定时运营。分支改动通过 PR 审阅，合并后才进入既有 Pages 发布流程。

## 本机预览

Node.js 22 或更新版本，无需安装运行依赖：

```sh
npm test
npm run social:validate
npm run build
npm start
```

打开 [手机页面](http://127.0.0.1:4173/lucifer0/)。编辑源文档后运行 `npm run social:build` 更新总表和信息流；`Y29_EDIT_BRANCH` 可以指定总表编辑链接的分支，默认 main。`Y29_PREVIEW_DIR=dist npm start` 可预览静态构建。预览服务只读，没有用户管理页面或写入 API。

可选的浏览器检查为 `tests/social.browser.mjs`；`Y29_PLAYWRIGHT_MODULE` 指定已有 Playwright 包入口，`Y29_SOCIAL_URL` 指定预览地址。浏览器依赖不进入网站。

## 文件分工

| 位置 | 用途 |
| --- | --- |
| `users/用户总目录.md` | 自动生成的找人入口，不手工维护 |
| `users/<id>/profile.md` | 每个用户的账号、开关和可公开设定 |
| `users/<id>/*.md` | 可自由添加的补充设定文档，支持子文件夹 |
| `docs/ai-updates.md` | 统一运营规则 |
| `posts/YYYY/MM/<串ID>/index.md` | 一串一个包，主帖在这里 |
| `posts/YYYY/MM/<串ID>/replies/<回复ID>.md` | 独立回复，通过 replyTo 关联实际父帖 |
| `rounds/YYYY/MM/<回合ID>.json` | 每轮新增的帖子编号，用于防重与恢复 |
| `data/feed.json` | 从文档生成的网页数据，不手改 |
| `docs/community.md` | 带原帖依据的公开共同记忆 |
| 仓库外的 `<id>.json` | 可选的私有补充，保留原有本机资料 |

已有 8 条主帖与 7 条回复保留原编号、作者、时间、正文及回复关系。更新旧帖直接编辑原包，不另发一份；发布和中断恢复见 [发布说明](docs/publishing.md)。当前页面仍一次加载完整信息流；以后内容增加时再增加分页和按需加载，归档结构不需要随之改变。

## 页面与资料边界

- 底栏为 `/world`、`/following`、`/about`；个人主页栏目名为 `/user`。关于页展示品牌与世界观内的论坛版规。
- `/world` 展示全部动态；`/following` 由每份主档案里的独立开关决定，与作品或浏览器旧关注记录无关。
- 采用墨黑配色，以背景层次和阴影区分内容。外层页面固定，只有 App 内部内容滚动；顶部与底栏始终可见。
- `/following` 直接展示动态，不再提供人物名单入口；从帖子昵称仍可打开个人主页。旧 `#/people` 链接回到关注信息流。
- 点赞使用爱心图标，链接使用链条图标，回复保留气泡与数量；已移除收藏入口。点赞保存在当前浏览器，没有登录、访客发帖或跨设备计数。
- 正式页面不显示「样例」等编辑标记；源档案中的事实依据与内容分类继续保留，不因此把衍生日常升格为小说原典，也不改变 AI 发布权限。
- 账号和帖子的稳定 ID 不随改网名改变，旧链接与回复关系继续有效。有历史内容的用户应暂停，不删除身份。
- 自动运营总开关保持关闭，没有安装定时任务。上下文工具按最新资料抽取候选，抽中不等于发帖，使用见 [上下文与私有资料](docs/private-profiles.md)。

仓库是公开的：用户文件夹、其他 Markdown、Git 历史和 PR 都不能保存完整内部小说设定、秘密或未公开剧情。详细资料不会进入网页 feed 或构建产物，但这不使公开仓库文件变为私有。外部私有资料不会自动迁入新用户文件夹。

STORYTELLER 与既有游戏保持独立。GSM 的稳定身份、帖子包与发布防重机制是参考基础：[GSM](https://github.com/fivsevn/umwelt/tree/main/gsm) · [发帖说明](https://github.com/fivsevn/umwelt/blob/main/gsm/docs/publishing.md)。
