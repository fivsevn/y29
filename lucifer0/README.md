# 路西法零 / LUCIFER ZERO

虚拟社交网站企业「路西法零」，标语为「自由表达的商业承诺」。使用原生 HTML/CSS/JavaScript，公开页面不需要服务器或模型 API。所有设备保持同一套深色手机界面，桌面最大宽度 480px，手机自然铺满。本机另有专门管理用户档案的页面，写入资料文件而不发布帖子。

初始 **56 个账号**：8 个《真心猎手》人物、48 个原创路人。路人名称为「路西法」加希腊字母原字形，例如「路西法α」「路西法Ω」，没有分隔点。现有 8 条动态和 7 条关联回复仍是原创样例，不对应小说时间线；扩充用户档案没有批量制造新帖。作品人物未公开的资料、重大秘密和完整原作设定没有写入仓库。

正式入口暂定为 [y29.fivsevn.com/lucifer0/](https://y29.fivsevn.com/lucifer0/)，上线状态以 Pages 部署结果为准。旧 `/social/` 入口保留，跳转时保留查询参数、人物主页与讨论串链接。

## 本机使用

在仓库根目录运行 Node.js 22 或更新版本，无需安装运行依赖：

```sh
npm test
npm run social:validate
npm run build
npm start
```

- [手机社交页面](http://127.0.0.1:4173/lucifer0/)
- [用户档案管理](http://127.0.0.1:4173/lucifer0/manage/)

用户管理提供检索、作品筛选、新增、编辑、暂停、删除无历史账号和随机抽取预览。基本资料、表达习惯、自由设定、近期状态、知情范围等集中在个人档案；通用运营规则单独在文档中维护。作品来源是可自由填写的栏目，可以添加其他作品的人物。

保存公开账号字段会更新 `users/registry.json` 和浏览器信息流；详细设定保存到 `~/.local/share/y29/lucifer0/profiles/`，可通过 `Y29_SOCIAL_PRIVATE_DIR` 更换仓库外位置。每个账号独立保存，AI 每轮读取最新版本。管理端只绑定本机，没有将文件写入能力部署到公开网站，也不会把私有设定复制到公开构建。

`npm start` 提供源码预览；手工更改账号或归档后执行 `npm run social:build`。`Y29_PREVIEW_DIR=dist npm start` 可检查静态构建，用户管理需要使用源码预览。

无需构建也能通过根目录的 GitHub Pages 加载已提交的 `data/feed.json`。`npm run build` 更新此文件，并只复制明确列出的网页与素材到 `dist/lucifer0/`。提交时带上最新生成文件，CI 会核对；构建不生成帖子、不打开自动运营。

可选浏览器回归脚本为 `tests/social.browser.mjs`。开发环境提供 Playwright 后，启动预览再运行脚本；`Y29_PLAYWRIGHT_MODULE` 可指定已有包入口，`Y29_SOCIAL_URL` 切换预览地址，`Y29_SCREENSHOTS` 指定截图目录。浏览器依赖不进入网站或常规单元测试。

## 页面行为

- 底栏只有 `/world`、`/following`、`/about`。`/world` 展示全部已发布动态，`/following` 展示管理档案中开启 `inFollowing` 的账号；作品来源不决定收录开关，旧的浏览器关注记录也不影响结果。
- 初始 8 个作品人物进入 `/following`，48 个路人不进入；维护者可以为任何账号调整。启用、AI 使用、发动态、回复、收录 `/following` 是分别管理的选项。
- 顶栏只显示 `/lucifer0`。`/about` 只保留 LUCIFER ZERO / Ω、路西法零和企业标语，其他说明放在维护文档。
- 帖子保留稳定 ID/编号、附图缩略图与 `>>` 引用。`replyTo` 连接真正的回复对象，讨论页按时间显示。
- 点赞、收藏保存在 `y29-social-v1` 浏览器记录；禁用存储仍可浏览，操作仅当前页生效。永久链接使用 `#/user/<id>` 与 `#/post/<id>`。
- 不提供访客发帖、登录或跨设备计数。加载失败可重试，空列表和失效链接都有提示。

## 资料与规则分开

| 文件或位置 | 用途 | 可否包含私密设定 |
| --- | --- | --- |
| `users/registry.json` | 账号、作品来源、公开资料与参与开关 | 不可以 |
| `users/profile-seeds.json` | 公开安全的初始人设；实际编辑存到外部 | 不可以 |
| 仓库外的 `<id>.json` | 每人的详细设定、自由备注和私有资料 | 可以，仅供授权的本机管理与运营 |
| `docs/ai-updates.md` | 统一读取、随机选择、创作和审核规则 | 不可以 |
| `posts/YYYY/MM/<batch-id>.json` | 审核过的公开帖子和回复，按批次追加 | 不可以 |
| `publication.json` | 自动运营总开关、时区、每批上限 | 不可以 |
| `data/feed.json` | 生成的公开信息流，不手改 | 不可以 |
| `docs/community.md` | 公开共同记忆，事实链接回原帖 | 不可以 |

[用户管理说明](users/README.md) · [私有档案结构](docs/private-profiles.md) · [每轮运营规则](docs/ai-updates.md) · [发布与恢复](docs/publishing.md) · [公开近况](docs/community.md)

本机管理页面可以预览随机候选，CLI 也能生成包含最新资料、完整历史与候选的外部上下文。按权重不重复抽人，优先避开近期活跃作者；抽中不代表必须发帖，更不代表已经发布。`automaticPosting` 保持关闭，没有创建定时任务。

GSM 的稳定身份、源档案与生成信息流分离、历史留存和按回合防重是参考基础：[GSM](https://github.com/fivsevn/umwelt/tree/main/gsm)、[用户管理](https://github.com/fivsevn/umwelt/blob/main/gsm/users/README.md)、[AI 更新](https://github.com/fivsevn/umwelt/blob/main/gsm/docs/ai-updates.md)。本项目另设专用档案页面、每人一份外部设定和作品来源，避免把个人资料与统一提示词混成一份长文。

## 发布边界

仓库是公开的，没有进入 `dist` 不等于私密。Git 文件、提交说明、PR、Actions 日志和产物都不得包含内部设定。字段校验不能识别一段正常文字是否剧透，公开内容仍须逐条审读。

现有 Pages 发布方式保留。CI 只测试、构建并保存预览产物，不部署分支、不合并 PR、不定时发帖；STORYTELLER 与现有游戏代码保持独立。后续正式运营需要另行授权，并为执行环境配置可读取的私有档案。
