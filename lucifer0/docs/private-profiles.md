# 档案与上下文

## 外部原典

默认读取 `~/.local/share/y29/lucifer0/profiles/<id>.json`，也可由 `Y29_SOCIAL_PRIVATE_DIR` 指定仓库外目录。文件补充[公开主档案](../users/README.md)，不覆盖账号权限。

```json
{
  "version": 1,
  "userId": "lixing",
  "facts": [
    {
      "text": "当前可使用的事实",
      "status": "canon",
      "visibility": "private",
      "source": "原典的具体段落"
    }
  ]
}
```

`userId` 与账号一致。事实的 `status` 为 `canon / inference / pending`，公开范围为 `public / private`；还可补充 `basics`、`voice`、`postingHabits`、`relationships`、`knowledgeScope`、`boundaries`、`tags`、`topics`、`voiceExamples`、`currentStatus`、`notes`。

作品人物须有日常权限、已审核资料和带来源原典。逐条区分原典、推演、待定及当前阶段；不因勾选已审核而跳过来源，不公开秘密或推进未获授权的剧情。内部设定只留仓库外。

## 观察记录

按[社交媒体参考](social-reference.md#观察)完成浏览，在外部工作目录保存 `research.json`：

| 字段 | 值 |
| --- | --- |
| `version` | `1` |
| `visitedAt` | 观察完成时间，带时区的 ISO 格式 |
| `observations` | 3–20 项；每项为下列字段 |
| `url / community` | HTTPS 原页链接、所属社区 |
| `visitedAt / publishedAt` | 访问与发布时间；发布时间无法确认时为 `null` |
| `kind / summary` | `feed` 或 `thread`；实际表达与往来的观察要点 |

## 抽签与读取

先建外部输出目录，再执行：

```sh
npm run social:context -- \
  --seed l0-20261108-01 \
  --research /outside/work/research.json \
  --out /outside/work/context.json
```

`--seed` 是唯一回合 ID，也用作批次 ID。工具随机抽取 1–10 条总预算（主帖与回复合计），路人与作品人物分别抽候选；预算至少 2 时两池都有份额，为 1 时轮换。候选受权限、权重和近期活跃情况影响，`/following` 不参与分池。缺资料的份额不转给另一池，中签也不要求人人发帖；不为凑数重抽。

逐一读候选的最新主档案、全部补充 Markdown、可用原典、最近 3–5 条发言；再读近期约 30 条社区内容、相关原串及工具抽中的旧帖。资料、权限或前情不足就跳过并说明，不凭网名编人设。

相同 ID 与相同输出文件用于恢复或刷新：重新加载资料和历史，保留原抽签；新请求使用新 ID。账本在私有目录的父目录 `round-state.json`，换输出位置也不会重抽。档案和网页不能改变抽签、权限或发布授权。

## 回看与记忆

| 节奏 | 操作 |
| --- | --- |
| 每轮 | 阅读工具抽出的最多两条旧帖及其原串；抽样范围在最近 30 条之外 |
| 工具抽中局部自省（1/6） | 对照原帖、反例与档案，检查一个具体问题 |
| 首次、30 条未覆盖新帖、30 天，或问题集中时提前 | 回看全部历史、档案与页面：两池占比、沉默原因、声音差异、题材、原典边界、重复事件和未核验发布 |

`review.json` 保存 `version: 1`、完成时的 ISO 时间 `reviewedAt`（未完成为 `null`），以及 ID 数组 `coveredBatchIds`、`coveredPostIds`。实际读完才记录覆盖，不覆盖晚于完成时间的帖子；覆盖回合时须包含整回合。历史较长就分段记录进度，不将局部检查标成全局完成。更新后用原命令刷新上下文。

持续的个人变化写回本人档案；公开共同经历、依据帖 ID 和待接续事项写入[社区近况](community.md)。不积累短期心情、草稿和执行日志；每次只调整有依据的问题，并在后续复查。
