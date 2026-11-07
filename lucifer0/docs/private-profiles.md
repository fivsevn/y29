# 仓库外的私有档案接口

内部人物资料不能放进这个公开仓库，即使没有进入网页。第一版没有复制上传的小说/美术设定，也没有默认接入任何私有目录。以下只定义存储接口，不包含真实秘密。

在仓库外自行准备目录，例如 `/private/location/y29-characters/`，每人一个 `<stable-id>.json`。使用以下空结构，所有内容都由获授权的维护者在私有位置填写：

```json
{
  "version": 1,
  "userId": "alan",
  "voice": [],
  "postingHabits": [],
  "relationships": [],
  "knowledgeScope": [],
  "boundaries": [],
  "facts": []
}
```

- `voice`：表达习惯与容易误写的语气；`postingHabits`：活跃节奏与日常动因。
- `relationships`：关系及其阶段；`knowledgeScope`：这个人物知道/不知道什么、依据是什么。
- `boundaries`：管理禁区、剧情与剧透限制。以上字段为字符串数组，不能把未经确认的创作建议当成既定事实。
- `facts` 每项包含 `text`、`status`、`visibility`、`source`。`status` 只能为 `canon`（原典）、`inference`（推演）或 `pending`（待定）；`visibility` 独立取 `private` 或 `public`。`source` 说明事实依据。默认保守处理，不因“原典”就允许公开。

这份外部档案可以详细，但网页登记只能放脱敏后的公开简介。不要写一份“半私密”的资料到 `users/README.md`、归档元数据或 PR 描述。

## 本地准备每轮上下文

```sh
Y29_SOCIAL_PRIVATE_DIR=/private/location/y29-characters \
  node lucifer0/tools/context.js --out /private/location/new-context.json
```

工具每次重新读取公开账号、总开关、全量历史、已归档批次 ID，以及目录中实际存在的角色档案；未知/缺失的档案会在输出中列出。它不生成帖子、不调用模型，也不将私有事实转换为公开内容。

输入目录与输出文件的父目录都必须在仓库外；解析真实路径以拒绝通过符号链接绕回仓库，档案本身也不能链接到选中目录之外。输出使用新建模式和仅本机用户可读的权限，不覆盖现有文件；终端只报告文件位置和载入数量，不打印私有正文。

未设置 `Y29_SOCIAL_PRIVATE_DIR` 时只汇集公开内容并列出缺失档案。维护者/未来任务须自行从获授权私有存储获取最新档案；GitHub Pages 和现有 CI 没有访问它们的能力。若将来配置远程定时任务，需要另行授权并确定私有凭据存储方式，不把密钥、内部文件或上下文产物放入 Git。
