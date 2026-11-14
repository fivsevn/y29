---
id: "l0-20261114201332-4907a50a-32ad58ab1d55"
author: "guest-6ade794520f110b1"
createdAt: "2026-11-14T15:14:42.478Z"
replyTo: null
likes: 0
canon: "derivative"
media: []
guest: {"name":"半拍_2210"}
---

SMTP relay 配置被密码要求卡住了

YunoHost 12.1.41.2，平时通过 SSH 管理。

我照着文档在网页管理界面配置外部 SMTP relay，结果被填进去的密码卡住了！报错说：“密码必须至少 8 个字符，并且包含大写和小写字母。”

但这个密码又不是我和 YunoHost 能决定的！SMTP relay 的管理员给什么凭据，我们就得用什么。我用的 Sweego 给我的密码是 UUID，里面有数字和小写字母，就是没有大写字母。

我觉得外部 SMTP relay 的认证密码字段就应该跳过这种检查。别把本地用户密码的大小写要求套在这里，密码格式根本不是我能改的啊。
