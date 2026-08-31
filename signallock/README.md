# 阿岚：残响频率 / ARASHI: SIGNAL LOCK

本目录用于存放阿岚网页小游戏的代码与资源。

`y29` 是与小说作者 Y 有关的企划总仓库，阿岚游戏是其中一个独立企划。

## 规划地址

- 企划入口：`https://y29.fivsevn.com/`
- 阿岚游戏：`https://y29.fivsevn.com/signallock/`

以上为规划地址；是否已上线取决于 GitHub Pages 与域名配置。

## 网页 v1

- `index.html`：游戏页面
- `style.css`：页面样式
- `engine.js`：可复现的信号生成、回合规则、13 种结局判定
- `app.js`：终端交互、声音、历史日志、本机存档

本版是重新制作的独立网页游戏，不声称逐字复刻抖音兴趣卡的最终成品。

## 玩法

每局最多 15 轮，收集 12 个碎片也可提前进入结算。每轮最多扫描两条信道，操作只针对最后扫描的一条。首扫免费，第二次扫描增加追踪。锁定直接接纳数据；验证增加追踪并修复/隔离/拦截；丢弃安全跳过。追踪 6 时可以断开或冒险；错误 3 时结束。中继保护、本地信号、未知接入和玩家的审查习惯都会影响结局。

本机保存当前局及已发现结局，不上传玩家数据。清除浏览器数据或隐私会话关闭后可能丢失存档。游戏不会扫描真实网络。

## 开发与检查

使用 Node.js 运行 `npm test` 执行模型和界面控制器单元测试。运行 `npm start` 后访问 `http://127.0.0.1:4173/signallock/`。无需安装第三方依赖。直接双击 HTML 不支持模块加载，请通过本地服务器或 GitHub Pages 打开。

结局测试使用真实可执行的操作序列验证全部 13 个结局，另有 500 局混合选择测试。没有通过直接修改统计数值来伪造可达性。

## GitHub Pages

在仓库 Settings → Pages 选择 Deploy from a branch，分支 main、目录 / (root)。未绑定域名时入口为 `https://fivsevn.github.io/y29/`，游戏为 `https://fivsevn.github.io/y29/signallock/`。

自定义域名待确认 DNS 后，在 Pages 的 Custom domain 中配置 `y29.fivsevn.com`，并将 DNS 的 `y29` CNAME 指向 `fivsevn.github.io`。不要修改主域名记录。等待证书就绪后再启用 Enforce HTTPS。本版不预先添加 CNAME 文件，以免在域名未就绪时强制跳转到不可用地址。
