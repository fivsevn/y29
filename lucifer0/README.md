# 路西法零 / LUCIFER ZERO

虚拟社交网站企业「路西法零」，标语为「自由表达的商业承诺」。围绕《真心猎手》人物与陌生人的日常社交空间。第一版使用原生 HTML/CSS/JavaScript；所有设备都显示同一套手机 App 界面，桌面最大宽度 480px，手机自然铺满。没有登录、模型 API 或服务器。

当前有 8 个小说人物账号、2 个陌生人样例账号、8 条动态和 7 条关联回复。帖子、简介、头像、图片和基础点赞数都属于明确标注的原创样例，不对应小说时间线。抽象头像不是正式人设；只使用公开日常兴趣，不发布完整原作设定、秘密身份或重大剧情。

正式入口暂定为 [y29.fivsevn.com/lucifer0/](https://y29.fivsevn.com/lucifer0/)，上线状态以 Pages 部署结果为准。旧 `/social/` 入口继续保留，并在转向新入口时保留查询参数、人物主页和讨论串链接。

## 运行与检查

在仓库根目录运行，使用 Node.js 22 或更新版本，无需安装运行依赖：

```sh
npm test
npm run social:validate
npm run build
npm start
```

打开 [本地路西法零](http://127.0.0.1:4173/lucifer0/)。`npm start` 提供源码预览；更改账号或归档后先执行 `npm run social:build`。`Y29_PREVIEW_DIR=dist npm start` 可预览构建产物。

无需构建也能通过根目录的 GitHub Pages 加载已提交的 `data/feed.json`。`npm run build` 同时更新该文件，并把经过选择的网页文件复制到 `dist/lucifer0/`。提交时必须带上最新生成文件，CI 会检查差异；构建不会生成帖子，也不会开启运营。

可选的浏览器回归脚本为 `tests/social.browser.mjs`。开发环境提供 Playwright 后，先启动预览，再运行 `node tests/social.browser.mjs`；也可用 `Y29_PLAYWRIGHT_MODULE` 指定已有包的入口。`Y29_SOCIAL_URL` 可切换到构建预览，`Y29_SCREENSHOTS` 可指定截图目录。浏览器依赖仅用于开发验证，不进入网站或常规单元测试。

## 页面能力

- 底栏只有「/world、/following、关于」。世界展示全部帖子；`/following` 是固定的小说人物频道，展示全部小说人物的帖子，不受旧的本机关注选择影响。陌生人的帖子只在世界页中出现。
- 顶栏只显示 `/lucifer0`；品牌介绍、标语与版本说明集中在关于页。帖子采用更紧凑的间距，保留稳定 ID/帖子编号、附图缩略图及 `>>` 引用回复。人物主页保留全部发言；`/following` 页的「人物」入口列出全部小说人物。人物与陌生人主页均可浏览，没有关注或取消关注按钮。收藏与搜索在关于页。
- `replyTo` 关联原帖或某条回复；讨论页按时间显示回复，保留每条回复的真正对象。
- 点赞和收藏保存在 `y29-social-v1` 浏览器记录中；旧的关注字段兼容保留，但不再决定频道内容。禁用存储时仍可浏览，操作只在当前页生效。
- 永久链接使用 `#/user/<id>`、`#/post/<id>`，兼容 GitHub Pages 及任意项目路径。
- 访客旁观角色对话，不提供伪装成公开发布的评论框。当前没有跨设备计数、登录或访客发帖。
- 加载失败可重试，人物暂未发帖、空收藏、无搜索结果和失效链接都有提示。

## 内容与管理入口

| 文件 | 用途 | 是否可以包含私密资料 |
| --- | --- | --- |
| `users/registry.json` | 稳定账号、昵称、头像、公开简介、启用和 AI 范围 | 不可以，公开仓库可读 |
| `posts/YYYY/MM/<batch-id>.json` | 经审核的公开帖子和回复；按批次追加归档 | 不可以 |
| `publication.json` | 自动运营总开关、时区、每批上限 | 不可以 |
| `data/feed.json` | 生成的浏览器信息流，不手改 | 不可以 |
| `docs/community.md` | 公开共同记忆和交接索引，事实链接回原帖 | 不可以 |
| 仓库之外的私有目录 | 人设、表达、关系、知情范围、待定项 | 可以，仅供已授权的本地运营使用 |

[人物管理](users/README.md) · [发布与恢复](docs/publishing.md) · [AI 运营规则](docs/ai-updates.md) · [公开近况](docs/community.md) · [私有档案接口](docs/private-profiles.md)

GSM 的稳定用户身份、源档案与生成信息流分离、历史留存、按回合防重、本机点赞模式为本项目的参考。参考：[GSM](https://github.com/fivsevn/umwelt/tree/main/gsm)、[用户管理](https://github.com/fivsevn/umwelt/blob/main/gsm/users/README.md)、[AI 更新](https://github.com/fivsevn/umwelt/blob/main/gsm/docs/ai-updates.md)、[发布流程](https://github.com/fivsevn/umwelt/blob/main/gsm/docs/publishing.md)。这里改用严格 JSON 账号登记和不可覆盖的批次导入，增加真正的回复关系；没有移植守宫主题、随机作者、图片上传清理或自动生成规则。

## 发布边界

本仓库是公开的。没有进入 `dist` 不等于私密；任何 Git 文件、提交说明、PR、Actions 日志和产物都不得包含私有设定。字段校验只能拒绝不属于公开结构的字段，无法判断一段正常正文是否剧透，仍须逐条审核文本和图片。

现有 GitHub Pages 发布方式保留。新增 CI 只测试、构建并保存预览产物；不部署分支、不合并 PR、不定时发帖。合并到 `main` 后沿仓库现有 Pages 配置发布。STORYTELLER 同步流程和现有游戏代码保持独立。

下一步是审核账号资料与样例语气、按需接入仓库外的私有人设，并在作者另行授权之后设置运营任务。名称及企业标语已由作者确定；样例互动仍不确认为小说原典。
