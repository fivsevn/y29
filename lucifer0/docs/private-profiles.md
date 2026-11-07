# 仓库外的详细用户档案

用户资料与运营规则分开维护。公开身份在 `users/registry.json`，初始人设在 `users/profile-seeds.json`；通过[本机用户管理](http://127.0.0.1:4173/lucifer0/manage/)修改后的详细档案，保存为仓库外的 `<stable-id>.json`。默认位置是 `~/.local/share/y29/lucifer0/profiles/`，也可以设置 `Y29_SOCIAL_PRIVATE_DIR`。

公开种子只有虚构路人和已公开的角色样例，不包含上传的小说内部资料。外部文件优先于种子；没有外部文件的账号仍可读取初始样例。已有小说人物的完整人设、秘密、重要关系和知情边界需要由获授权维护者在外部档案中补充，不能由样例推断。

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
- `activityWeight` 为 0–10 的相对抽取权重。0 表示暂不抽取；它不授予发布权限。
- `facts` 的每项有 `text`、`status`、`visibility`、`source`。`status` 只能为 `canon`（原典）、`inference`（推演）、`pending`（待定）；`visibility` 独立取 `private` 或 `public`。来源和公开性必须分别判断。

外部档案可以详细，公开简介必须简洁且经过审读。没有进入 `dist` 不等于私密；不能将内部资料放入任何 Git 文件、归档元数据或 PR 描述。

## 准备本轮候选与上下文

```sh
node lucifer0/tools/context.js \
  --out /private/location/round-context.json \
  --count 5 \
  --seed round-20261108-01
```

`--count` 默认 5，最多 20；`--seed` 可选，用于重现同一组抽取条件。指定外部资料目录时在运行前设置 `Y29_SOCIAL_PRIVATE_DIR`。工具每次重新读取公开账号、外部档案及种子、总开关、全部历史和已处理批次，并将随机候选一起写入外部上下文文件。外部覆盖数量与未单独建档的账号也会列出，初始种子不冒充已审核原典。

候选来自启用、允许 AI 使用、至少允许动态或回复之一且抽取权重大于 0 的账号；按权重不重复抽取，优先近期 7 条帖子中尚未发言的人，再按需补足。抽取只是选出候选，不生成帖子、不调用模型、不打开自动运营。正式写作仍需核对账号对动态/回复的权限、资料完整程度、发帖模式、前情和每批上限。

输入目录与输出父目录必须在仓库外；真实路径检查会拒绝绕回仓库的符号链接。上下文输出只新建，不覆盖已有文件；终端只报告位置和数量，不打印私有正文。

GitHub Pages 和现有 CI 不能读取本机私有档案。以后配置远程定时任务时，必须先另行确定和授权私有存储，不把密钥、内部文件或上下文产物放进 Git。
