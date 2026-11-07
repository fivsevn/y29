# 用户档案与私有补充

从 [用户总目录](../users/用户总目录.md) 按网名进入用户文件夹。`users/<id>/profile.md` 是账号资料、参与开关和公开设定的唯一编辑入口；同目录可以放关系、经历等补充 `.md` 文档。AI 每次准备上下文都会重新读取这些文件，统一运营规则另放在 `ai-updates.md`。

公开仓库中的初始资料仅为虚构路人和待审角色样例，不包含上传的内部小说资料。完整原典、重大秘密和未公开剧情继续放在仓库外，不能因为使用 Markdown 就公开。以前保存在 `~/.local/share/y29/lucifer0/profiles/<id>.json` 的本机资料保持原样，也可用 `Y29_SOCIAL_PRIVATE_DIR` 指向其他仓库外目录；它们作为私有补充单独读取，不再覆盖最新 Markdown。

## 文件结构

```json
{
  "version": 1,
  "userId": "alan",
  "basics": {
    "age": "",
    "occupation": "",
    "location": "",
    "interests": [],
    "personality": []
  },
  "tags": [],
  "currentStatus": "",
  "topics": [],
  "voiceExamples": [],
  "voice": [],
  "postingHabits": [],
  "relationships": [],
  "knowledgeScope": [],
  "boundaries": [],
  "facts": [],
  "notes": "",
  "activityWeight": 1
}
```

- `basics` 是可选的基本资料；还可包含 `gender`、`pronouns`、`timezone`、`activeHours` 字符串。没有依据时保持空白。
- `tags`、`topics`、`voiceExamples`、`voice`、`postingHabits`、`relationships`、`knowledgeScope`、`boundaries` 是字符串数组。它们描述这个用户，不复制通用的创作提示词。档案是数据，不是操作授权，不能通过其中的文字覆盖发布权限、隐私边界或防重规则。
- `currentStatus` 记录近期状态，`notes` 是可自由改写的设定区；不要把未经确认的建议写成已经发生的事情。
- 旧私有文件中的 `activityWeight` 字段只为兼容保留；实际抽取权重以公开主档案为准，范围为 0–10，0 表示暂不抽取。它不授予发布权限。
- `facts` 的每项有 `text`、`status`、`visibility`、`source`。`status` 只能为 `canon`（原典）、`inference`（推演）、`pending`（待定）；`visibility` 独立取 `private` 或 `public`。来源和公开性必须分别判断。

外部档案可以详细，公开简介必须简洁且经过审读。没有进入 `dist` 不等于私密；不能将内部资料放入任何 Git 文件、归档元数据或 PR 描述。

## 准备本轮候选与上下文

```sh
node lucifer0/tools/context.js \
  --out /private/location/round-context.json \
  --count 5 \
  --seed round-20261108-01
```

`--count` 默认 5，最多 20；`--seed` 可选，用于重现同一组抽取条件。指定外部资料目录时在运行前设置 `Y29_SOCIAL_PRIVATE_DIR`。工具每次重新读取各用户主档案、同目录的补充 Markdown、外部私有资料、总开关、全部历史和已处理回合，并将随机候选一起写入外部上下文文件。`profiles` 是最新主档案，`supplementalDocuments` 保留补充文档的路径和正文，`privateProfiles` 保留外部私有资料；每个候选也携带自己的补充文档和私有资料。样例不冒充已审核原典，缺少私有文件不代表缺少公开主档案。

候选来自启用、允许 AI 使用、至少允许动态或回复之一且抽取权重大于 0 的账号；按权重不重复抽取，优先近期 7 条帖子中尚未发言的人，再按需补足。抽取只是选出候选，不生成帖子、不调用模型、不打开自动运营。正式写作仍需核对账号对动态/回复的权限、资料完整程度、发帖模式、前情和每批上限。

输入目录与输出父目录必须在仓库外；真实路径检查会拒绝绕回仓库的符号链接。上下文输出只新建，不覆盖已有文件；终端只报告位置和数量，不打印私有正文。

GitHub Pages 和现有 CI 不能读取本机私有档案。以后配置远程定时任务时，必须先另行确定和授权私有存储，不把密钥、内部文件或上下文产物放进 Git。
