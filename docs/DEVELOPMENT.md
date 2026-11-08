# Y.29 开发导航

想继续深化游戏，先确定修改属于内容、规则还是演出，再进入对应项目。各游戏独立运行，共享字体和首页；路西法零与 STORYTELLER 有独立的数据维护流程。

## 从哪里开始

| 目标 | 先看 | 主要修改入口 |
| --- | --- | --- |
| 阿岚：增加信号、事件、结局 | [游戏说明](../signallock/README.md) | `signallock/engine.js`：信号、状态与结局；`app.js`：终端、声音、存档 |
| 移动乌托邦：调整资源、天气、安排、饭局 | [游戏说明](../mobileutopia/README.md) | `mobileutopia/engine.js`：六时段模型；`app.js`：操作与存档 |
| 飙肌野郎：增加好友、场景、动作、菜单 | [维护指南](../training/EDITING.md) | `training/game.js` 与 `content.js`、`expansion.js`、`variety.js`、`narrative.js` |
| 飙肌野郎：修改周目、出勤、报告、像素演出 | [状态流与字段](../training/EDITING.md#一周的状态流) | `training/game.js`：导出的规则函数及 `if(hasDOM)` 内界面 |
| 修改首页、导航与项目状态 | [总览](../README.md) | 根 `index.html`、`style.css`；项目状态同时更新 README |
| 路西法零：编辑人物与帖子 | [管理入口](../lucifer0/README.md) | `lucifer0/users/`、`posts/`；不要直接编辑生成的 feed 和用户总目录 |
| STORYTELLER：消息、过期和实体终端 | [终端说明](../storyteller/README.md) | `storyteller/state.js`、`app.js`、`.github/scripts/storyteller-sync.mjs` |

移动乌托邦的代码可以通过 `/mobileutopia/` 直接试玩，但首页仍标记 OFFLINE、没有入口链接。这表示尚未正式列入发布目录；修改它不应顺带改成 ONLINE。

## 运行与检查

在仓库根目录使用 Node.js 22 或更新版本：

```sh
npm start
# http://127.0.0.1:4173/
```

不需要 `npm install`。站点没有 npm 第三方运行依赖；HTML 使用浏览器模块，不能把直接双击页面作为完整预览方式。端口冲突时可用 `Y29_PREVIEW_PORT=4174 npm start`。

```sh
npm run test:games  # 修改游戏时的快速规则与控制器检查
npm run check       # 全部测试 → 社交内容校验 → dist 构建
Y29_PREVIEW_DIR=dist npm start
```

`dist/` 是可重新生成的静态预览目录，不要手改或提交。`build.js` 使用运行文件白名单；新增浏览器模块、图片或入口时，要同步补到构建并检查产物。阿岚另有 `dist/signallock-preview.html`，包含样式、代码、字体及字体许可，可独立携带。

构建还会从公开源文档重建 `lucifer0/data/feed.json` 和 `lucifer0/users/用户总目录.md`，因此可能在源目录产生生成文件差异；提交前检查这些差异是否来自本次公开资料修改，不要手工修补生成结果。

只有 Node 可执行程序、没有 npm 时，基础操作等价于：

```sh
node serve.js
node --test tests/*.test.js
node lucifer0/tools/publish.js validate
node build.js
```

## 改动怎样验证

| 改动 | 重点检查 |
| --- | --- |
| 新事件、分支、结局 | ID 唯一、阶段正确、有可执行路径、反馈完整；使用真实操作序列验证 |
| 数值、随机与概率 | 保留固定种子复现；同时检查缺席、资源不足、极端选择、完整周目 |
| 存档与重开 | 有存档的项目保持当前局与档案分离、刷新可恢复、重开后刷新不会回到旧局；旧版本兼容或明确失效边界；训练按内存模式检查重开 |
| 页面与演出 | 320px 手机与桌面；选项确认；连续点击；字体与 Canvas；浏览器存储被拒时仍可玩 |
| 新文件与资源 | 源目录和 `dist/` 都能加载；本地链接、模块和字体无 404；没有把草稿或维护工具混入预览包 |

已有模型测试覆盖阿岚全部 13 个结局、移动乌托邦全部 5 个结局，以及训练整周、朋友实际出勤和内容去重。控制器测试使用模拟浏览器环境，不能代替真实浏览器中的排版和点击检查。

有外部 Playwright 环境时，可运行可选浏览器检查；它不加入网站运行依赖：

```sh
node tests/games.browser.mjs
node tests/social.browser.mjs
```

`Y29_PLAYWRIGHT_MODULE` 可指定 Playwright 的模块路径。游戏检查支持 `Y29_SITE_URL`（默认本机首页）、`Y29_SCREENSHOTS`（截图目录）；修复后的分支加 `Y29_EXPECT_FIXED=1` 检查重开后刷新。社交检查使用 `Y29_SOCIAL_URL`（默认本机 `/lucifer0/`）。浏览器检查只在独立浏览器会话内操作游戏和本机阅读状态。

## 数据和发布边界

| 项目 | 玩家数据位置 | 刷新后 |
| --- | --- | --- |
| 阿岚 | 浏览器 localStorage，种子与操作记录、已发现结局分开保存 | 可恢复当前局 |
| 移动乌托邦 | 浏览器 localStorage，当前晚与最近 12 晚档案分开保存 | 可恢复；撤回的临时安排不累积到新存档 |
| 飙肌野郎 | 当前页面内存 | 周目清空，从体验卡开始 |
| 路西法零 | 本机阅读状态；公共动态由仓库生成 | 本机点赞等状态可保留 |
| STORYTELLER | 公开 `current.json` | 重新读取当前有效消息，不保存历史对话 |

当前线上由仓库根目录发布到 GitHub Pages，根 `CNAME` 管理自定义域名；CI 的 `dist/` 是检查和下载预览用途，未自动替换线上发布来源。改根 README 或维护文档会进入公开仓库；私有原作、外部档案和运营上下文按各项目现有规则留在仓库外。

`.github/workflows/check.yml` 负责测试和构建；`social-content.yml` 从已编辑的档案、帖子生成目录和 feed；`storyteller.yml` 同步指定 Discussion 的当前状态。后两者会写生成文件，游戏开发无需调用它们来创作内容。

一次修改尽量围绕一个可观察结果。先修改源文件，补受影响规则的回归，运行检查，再预览 `dist/`；提交前确认 `git diff --check` 通过，且没有私有材料、临时截图和生成目录。
