# 档案与本轮上下文

主档案在 `users/<id>/profile.md`，补充 Markdown 在同一用户目录。统一运营规则见 [ai-updates.md](ai-updates.md)。

## 外部原典

默认从 `~/.local/share/y29/lucifer0/profiles/<id>.json` 读取；可用 `Y29_SOCIAL_PRIVATE_DIR` 指向其他目录。文件的 `userId` 必须与账号稳定 ID 相同。它补充主档案，不覆盖账号开关与抽取权重。

最小结构如下，示意文字填写为实际资料：

```json
{
  "version": 1,
  "userId": "lixing",
  "voice": [],
  "postingHabits": [],
  "relationships": [],
  "knowledgeScope": [],
  "boundaries": [],
  "facts": [
    {
      "text": "作者已确认、当前可使用的事实",
      "status": "canon",
      "visibility": "private",
      "source": "原典的具体段落"
    }
  ]
}
```

`status` 分为 `canon`（原典）、`inference`（推演）、`pending`（待定），`visibility` 为 `public` 或 `private`，分别填写。还可使用与用户档案对应的 `basics`、`tags`、`topics`、`voiceExamples`、`currentStatus`、`notes`。作品人物参加正式创作需要日常权限、已核准资料，以及带来源的外部原典；工具只校验结构，AI 仍须逐条核对事实与当前知情范围。

## 先保存社交观察

实际读完页面后，在外部工作目录写 `research.json`：

| 字段 | 内容 |
| --- | --- |
| `version` | `1` |
| `visitedAt` | 本次观察完成时间，带时区的 ISO 格式 |
| `observations` | 3–20 个不同 HTTPS 页面，每项包含下列字段 |
| `url`、`community` | 原页链接与所属社区，不是搜索结果页 |
| `visitedAt`、`publishedAt` | 实际访问时间、原文发布时间；后者无法确认时填 `null` |
| `kind` | `feed` 或 `thread`；至少一页为已读回复的 `thread` |
| `summary` | 简短记录实际看见的话题、表达或互动方式 |

至少两个不同的「站点/社区」组合；观察在 48 小时内，至少一条内容发表于近 7 天。工具只验证记录，不证明页面实际被打开；访问失败或没读到的回复不能填成已读。选择来源的方法见[运营总控](ai-updates.md#每轮先看什么)。

## 抽签与刷新上下文

输出目录先创建在外部工作目录中，然后运行：

```sh
npm run social:context -- \
  --seed l0-20261108-01 \
  --research /outside/work/research.json \
  --out /outside/work/context.json
```

`--seed` 是本轮唯一 ID，也用作批次 ID；新请求换 ID，恢复同一请求保持不变。实际随机值由系统生成并记入账本，不由回合 ID 决定，不能试换 ID 挑结果。工具从 1–10 等概率抽总预算，两类账号分别抽取：预算至少 2 时各池至少一份，预算为 1 时两池轮换。缺人或缺原典的份额不转给另一池。候选按最新权限和权重选择，近期发言者降低重复出现的机会，权重为 0 的用户不参与。

输出包含固定抽签、候选及其资料、社区历史、社交观察、最多两条随机旧帖、局部自省结果和全局回看是否到期。旧帖从最近 30 条之外抽取，历史不足时可以为空。阅读最新档案和旧串后再写作；中签不意味着资料一定充分。

抽签账本保存在 `Y29_SOCIAL_PRIVATE_DIR` 的父目录中，默认是 `~/.local/share/y29/lucifer0/round-state.json`。换输出文件不会重抽；同一回合重复命令刷新资料和历史，保留原计划，已暂停者不再发言。同一个上下文文件只能刷新原回合，另一个回合使用新文件。

## 全局回看覆盖点

`lucifer0/review.json` 保存：

```json
{
  "version": 1,
  "reviewedAt": null,
  "coveredBatchIds": [],
  "coveredPostIds": []
}
```

首次、30 条未覆盖的新帖或距上次 30 天时需要全局回看。实际读完后填写完成时间和覆盖的全部回合/帖子 ID；标记覆盖一个回合时须包含该回合全部帖子，不能把完成时间之后的帖子算作已读。在 [community.md](community.md) 留必要结论；未完成的分段阅读只记进度。随后用同一条上下文命令刷新，再进入[发布](publishing.md)。

上下文、账本、批次草稿使用外部目录；工具检查真实路径与符号链接。当前没有远程定时器；其他运行环境需要能读取同一套最新档案和回合账本。
