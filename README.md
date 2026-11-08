# Y.29

与小说作者 **Y.** 及其作品相关的互动衍生企划总仓库。

这里收录独立网页游戏、互动叙事与实验性终端项目。  
项目主要以静态网页形式运行，并发布于 GitHub Pages。

## Games

### 01 / ARASHI: SIGNAL LOCK
**阿岚：残响频率**

[`/signallock/`](signallock/)

以信号扫描与信息判定为核心的终端式叙事游戏。

玩家在有限轮次中扫描未知信号，并选择锁定、验证或丢弃。不同的判断、追踪状态与收集内容会导向不同结局。

**Status:** ONLINE

---

### 02 / MOBILE UTOPIA: OPEN TABLE
**移动乌托邦：留个位置**

`/mobileutopia/`

尚未发布。

**Status:** OFFLINE

---

### 03 / STEEL MUSCLE RUN: 飙肌野郎
**来都来了**

[`/training/`](training/)

单人七日训练叙事游戏。

从进入 **57training** 开始，在训练、对话、约饭与日常事件中度过一周。角色关系与各种隐藏状态由玩家的选择和实际经历逐步形成。

**Status:** ONLINE

## Other Projects

### LUCIFER ZERO / 路西法零

[`/lucifer0/`](lucifer0/) · [打开网站](https://y29.fivsevn.com/lucifer0/)

虚拟社交网站企业，标语为「自由表达的商业承诺」。黑色手机界面，`/world` 展示全部动态，`/following` 按用户开关收录，`/about` 展示品牌与版规。

内容按用途分为三个目录：[users](lucifer0/users/README.md) 管理个人研究，总目录与模板在此，每个人物文件夹只有一份完整档案；[environment](lucifer0/environment/social-reference.md) 研究整个环境、社区与群体互动；[docs](lucifer0/docs/ai-updates.md) 保存发布与运营规则，AI 总控说明每轮阅读顺序、抽签和发布流程。其余目录用于网页素材、数据、帖子归档与构建。整体入口和启动语见 [lucifer0/README.md](lucifer0/README.md)。

### STORYTELLER

[`/storyteller/`](storyteller/)

用于显示短消息与状态的独立终端项目。

网页终端与 Raspberry Pi 可以读取同一份公开状态；消息来源由 GitHub Discussions 同步。它不是游戏，而是 Y.29 中用于实验实体终端、网络信息与叙事之间关系的项目。

## Structure

- `/` — Y.29 企划入口
- `/signallock/` — ARASHI: SIGNAL LOCK
- `/mobileutopia/` — MOBILE UTOPIA: OPEN TABLE
- `/training/` — STEEL MUSCLE RUN: 飙肌野郎
- `/storyteller/` — STORYTELLER terminal
- `/lucifer0/` — 路西法零，小说人物的手机社交空间
- `/social/` — 旧入口，保留查询参数及帖子链接并转向 `/lucifer0/`
- `/assets/` — 共用资源
- `/tests/` — 自动化测试

## Technical

项目以原生 HTML、CSS 与 JavaScript 为主。

- GitHub Pages 部署
- 无独立服务端
- 无模型 API
- 无登录系统
- 不依赖 npm 第三方运行库
- 玩家数据原则上保留在浏览器本地或当前运行状态中

开发与测试入口：

```bash
npm test
npm start
npm run build
```

使用 Node.js 22 或更新版本，无需安装第三方运行依赖。`npm run test:games` 只检查游戏；`npm run check` 依次运行全部测试、社交内容校验和构建。

具体项目的修改入口：[阿岚](signallock/README.md)、[移动乌托邦](mobileutopia/README.md)、[飙肌野郎](training/EDITING.md)、[STORYTELLER](storyteller/README.md)、[路西法零](lucifer0/README.md)。

## Original Work

小说原作、设定资料及其他参考材料不随游戏公开发布。

网页中为互动体验新增的剧情、对白、事件与演出属于衍生内容，不替代小说正文及作者正式设定。
