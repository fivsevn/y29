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

具体项目的实现说明见各自目录。

## Original Work

小说原作、设定资料及其他参考材料不随游戏公开发布。

网页中为互动体验新增的剧情、对白、事件与演出属于衍生内容，不替代小说正文及作者正式设定。
