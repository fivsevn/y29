# STORYTELLER

只显示当前状态的黑白通信终端。网页和 Pi 使用同一 HTML/CSS/JS、仓库内置 Fusion Pixel 字体和 320×240 逻辑画布；浏览器只进行整体等比例缩放。无外部字体请求、消息列表、localStorage 或历史界面。英文及中文均使用 12px 像素字体，失败时回退到 Courier New / monospace。非整数放大可能略有模糊，Pi 在 320×240 下为 1:1。

## 运行

在仓库根目录执行 `python3 -m http.server 8000`，打开 http://localhost:8000/storyteller/ 。线上入口：https://y29.fivsevn.com/storyteller/ 。构建沿用 `npm run build`。

默认 `current-state.json` 是明确标记 MOCK 的共享静态等待状态，不自动生成假消息，也不表示实体 Pi 在线。修改该文件后页面约 3 秒轮询刷新。时间显示的是当前消息 startedAt（UTC），不是客户端时钟。启动画面是本地 0.9 秒初始化，消息不做逐字播放。

## 统一 current-state v1

```json
{
  "version": 1,
  "status": "ONLINE",
  "source": "ARASHI",
  "message": "今晚风很大。\n不要过桥。",
  "sequence": 1,
  "startedAt": "2026-09-10T01:00:00Z",
  "expiresAt": "2026-09-10T01:01:00Z",
  "mock": false
}
```

status 为 ONLINE / WAITING / OFFLINE；sequence 为非负安全整数；startedAt、expiresAt 使用带时区 ISO 8601。expiresAt 为 null 仅用于静态 mock；真实服务须提供到期时间并持续刷新，失效后清除旧消息显示 OFFLINE。请求失败或格式错误同样清除画面旧消息，恢复后自动显示最新状态。新状态整体替换旧状态，无回放。source 最多 32 个字符；message 输入最多 4096 个字符，画面固定 46 半角格 × 6 行，溢出省略，推荐源端限制到 138 个全角字符以内。

默认接口 `./current-state.json`；也可通过 `?state=` 指定 URL（用 encodeURIComponent 编码）。两端必须使用完全相同的接口；跨域服务需正确配置 CORS。接口返回 JSON，建议 Cache-Control: no-store。轮询为 3 秒，请求超时 5 秒；这是当前内容的尽力同步，网络延迟下可能有数秒差异，不保证逐帧一致。GitHub Pages/CDN 静态文件也不保证即时更新。

LINK 表示状态源可用性，不是实体设备心跳。后续若要声称网页就是物理设备当下画面，还需 Pi 确认已显示的 sequence 与设备心跳；设备离线时网页必须标明失联。

## Raspberry Pi 3 / SPI 320×240

1. 先按屏幕实际型号安装驱动，确认 Raspberry Pi OS 桌面确实显示在 SPI 屏，分辨率为 320×240。本项目不修改屏幕驱动、启动配置或现有设备服务。
2. 安装系统支持的 Chromium。将此仓库克隆到 Pi，进入仓库目录，在已登录的图形桌面终端运行 `sh storyteller/pi/start.sh`，全屏打开上述线上网页。Pi 与远处浏览器因此使用同一资源、同一状态源。
3. 如需本地运行，在仓库根目录启动 `python3 -m http.server 8000 --bind 127.0.0.1`，另一个桌面终端运行 `STORYTELLER_URL=http://127.0.0.1:8000/storyteller/ sh storyteller/pi/start.sh`。本地 mock 与远端不是同一个文件；要同步请给两端设置同一公开状态 API。
4. 验收中文、边框四角、无滚动条及断网恢复。退出 kiosk 可按 Alt+F4。验收后可将脚本加入当前桌面环境的开机自启动；桌面系统版本和 SPI 驱动尚未在实机核验，因此不自动改系统服务。

无图形桌面、仅 framebuffer 的系统尚不支持直接运行此脚本。必须先完成桌面输出到 SPI 的配置；不能将浏览器启动成功等同于 SPI 屏驱动完成。

## 尚未完成的 GitHub Discussions 接入

需确定仓库 Discussion 分类/主题、留言筛选规则、消息过期策略。可信服务通过 webhook 或轮询读取 Discussions，转换为上述单一 current-state，以原子替换发布。GitHub token 只保存在服务端；浏览器/Pi 不携带 token。服务端仅保留去重游标与必要当前状态。后续添加 Pi 心跳/显示确认，以区分“接口在线”和“物理设备在线”。本版不包含此服务、实机驱动安装或设备心跳。
