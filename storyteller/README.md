# STORYTELLER

线上：https://y29.fivsevn.com/storyteller/
共享状态：https://y29.fivsevn.com/storyteller/current.json
留言：https://github.com/fivsevn/y29/discussions/1

黑白 DOS 终端、内置中文像素字体、320×240 逻辑画布等比例放大，保留 0.9 秒启动画面、状态、来源、当前消息、UTC 时间和序号。无消息历史界面或本地存储。

## Discussion → current-state

`.github/workflows/storyteller.yml` 监听 Discussion #1 的 `discussion_comment.created`，包括回复。其他帖子的评论不执行同步。`workflow_dispatch` 可手动初始化或补同步已有评论；相关代码 push 也会执行一次初始化。只使用自动提供的 GITHUB_TOKEN（contents:write、discussions:read、pages:write），无需 PAT、Secret 或轮询采集服务。

每次事件分页读取该帖子评论与回复，按评论 ID 处理尚未处理的内容；JSON 仅保存当前状态和最后评论 ID，不保存历史。并发任务通过内容 SHA 校验重试，重复投递不会增加序号。编辑/删除不触发同步，不撤销已经处理的消息。

- 任何用户普通评论 → `SOURCE: @用户名`、`MESSAGE: 正文`；按 Unicode 码点最多 120 个字符，超长末尾用省略号。
- 仅作者精确为 `fivsevn`，且整条正文精确为 `/online`、`/waiting`、`/offline` 时改变状态。前后空格、换行、附加文本、其他大小写均为普通 transmission。
- 状态命令保留上一条普通消息的来源和正文，更新状态、时间和序号；普通消息保留当前状态。初始 ONLINE。时间是最近一次已处理评论的创建时间（UTC）。
- `expiresAt:null`：当前内容持续显示到下一次更新，不因无人留言自动过期；LINK 不是 Pi 心跳。
- 评论通过 textContent 显示，不执行 HTML 或脚本，也不插入 shell 命令。

更新 current.json 后，工作流显式请求现有 Pages 分支构建，因为 GITHUB_TOKEN 的提交不会自动触发 Pages 构建。不改变 Pages 发布来源或仓库其他页面。上线延迟包含 Actions 排队、Pages 构建及 CDN 传播，通常远大于页面的 3 秒轮询间隔，不保证秒级发布。失败可以重新运行工作流，已经写入的评论不会重复处理。

默认读取 `./current.json`，每 3 秒请求，超时 5 秒，并附带时间桶查询参数避免缓存长期停留。旧 `current-state.json` mock 已移除；旧窗口需刷新一次。也可通过 `?state=` 指定同一公开 JSON 接口，跨域需允许 CORS。请求失败或格式错误显示断线，恢复后自动回到最新状态。

## Raspberry Pi / SPI 320×240

先确保 Raspberry Pi OS 图形桌面与 Chromium 可在 SPI 屏显示 320×240。在已有仓库目录、图形桌面终端执行：

```sh
git pull --ff-only && sh storyteller/pi/start.sh
```

启动脚本默认打开线上页面，因此 Pi 和网页读取完全相同的 current.json，无需令牌或 Pi 采集服务。可用 STORYTELLER_URL 覆盖地址。脚本不更改屏幕驱动、系统服务或其他 kiosk。Alt+F4 退出。无桌面的 framebuffer 系统需要先配置图形环境；物理屏幕驱动和 Pi 心跳不在此同步方案内。

## 本地验证

```sh
node --test tests/*.test.js
node build.js
python3 -m http.server 8000
```

打开 http://localhost:8000/storyteller/ 。画布固定 320×240，其他尺寸整体缩放；长文在 46 半角格×6行范围内换行/省略。后台 JSON 的 120 字符限制和画布可见行数是两层独立限制。
