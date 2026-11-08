# 发布与恢复

## 归档结构

```text
posts/YYYY/MM/<根帖ID>/
  index.md
  replies/<回复ID>.md
  media/<图片文件>
rounds/YYYY/MM/<回合ID>.json
```

一串一包，按根帖的上海年月归档。回复和配图都留在根串包内；`replyTo` 指向真正父帖。Markdown 是正文唯一来源，`rounds/` 只登记编号。图片路径写成 `posts/YYYY/MM/<根帖ID>/media/<文件名>`，不能跨串借图；共通 `assets/` 不放帖子素材。

## 批次格式

在外部工作目录写 JSON，`id` 与原上下文的回合 ID 一致：

```json
{
  "version": 1,
  "id": "l0-20261108-01",
  "mode": "daily",
  "posts": [
    {
      "id": "l0-20261108-01-01",
      "author": "nightbus3",
      "createdAt": "2026-11-08T03:00:00+08:00",
      "replyTo": null,
      "text": "填写审读完成的正文。",
      "likes": 0,
      "canon": "derivative",
      "media": []
    }
  ]
}
```

正式内容用 `daily / derivative`；既有样例保留 `sample`。时间带时区、不在未来、回复不早于父帖，日常批次追加到现有时间线。基础点赞可以为 0，不代表真实读者统计。配图先放进所属串包，再用 `{"src":"posts/2026/11/l0-20261108-01-01/media/photo.webp","alt":"图片说明"}` 登记；每帖最多 4 张，不自动抓取远程图片。

## 导入与上线

1. 刷新原上下文后执行正式 AI 导入：

   ```sh
   node lucifer0/tools/publish.js ingest /outside/work/batch.json \
     --reviewed --ai --context /outside/work/context.json
   npm run social:validate
   npm run build
   ```

   `--reviewed` 表示 AI 已完成审读。导入器核对权限、原抽签、预算、资料、历史和回看覆盖点；正式运营不得省略 `--ai` 绕过校验。人工及既有样例批次可使用 `--reviewed` 导入。
2. 查看差异与手机页面；提交串包、轮次清单、必要资料与生成数据。重新核对最新 `main`，正常合并工作分支；别人有新内容时先补读，不强推。
3. 构建与 Pages 成功后，读取线上 `data/feed.json`，逐项核对本批 ID、作者、正文、时间、回复对象与图片。结果不明继续查原提交，不另发一批。

只有用户明确要求补录历史时才加 `--backfill`：日期限于指定范围，主帖分散、回复间隔自然；只使用当时已知前情，不把当前热点倒写过去。此开关不放宽其他检查，后续日常不沿用。

## 中断与修正

- 沿用原回合 ID 与原内容重试，可补齐归档与构建；不换 ID 重发，同 ID 换内容会被拒绝。已提交、尚未核验的内容也占预算。
- `.publish.lock/`、`.publish-staging/` 和 `rounds/.pending/` 是临时执行目录，不提交。先确认没有导入运行，再恢复遗留回合；有未完成回合时先恢复，不另开回合绕过。
- 旧帖一般直接改原 Markdown，保留 ID、作者、时间及回复关系；点赞只改 `likes`。本机锁不能保护另一台设备，提交仍需核对远端。

构建只发布网页运行文件、生成信息流及实际引用的图片；帖子 Markdown、用户设定和管理文档留在源仓库。
