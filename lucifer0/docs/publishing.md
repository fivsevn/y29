# 执行与发布

本页说明工具命令、工作记录和上线核验。创作方法见[发帖与改编](writing.md)，抽取规则见[抽签规则](lottery.md)，每次更新从[总入口](README.md)开始。

## 准备

使用 Node.js 22 或更新版本。首次使用或依赖变化后，先在仓库根目录执行 `npm ci`，安装图片转换依赖。执行环境提供内置运行时时，执行者自动使用其可用路径。在仓库根目录运行：

```sh
node lucifer0/tools/update.js prepare
```

工具输出 `operation.json` 与 `reading.md` 的绝对路径。前者保存当前更新的抽签、观察和草稿，后者按来源路径汇集人物、世界观和其他环境资料的完整原文，供 AI 阅读。账号表同时列出每个人登记的世界观。准备结果中的 `researchWindows` 按[抽签规则](lottery.md)用于本次素材取样。默认工作目录位于仓库外的 `~/.local/state/y29/lucifer0/current`。指定其他工作目录时使用：

```sh
node lucifer0/tools/update.js prepare --work /outside/work
```

再次执行同一命令会恢复当前更新，保留原编号、预算与抽中的人物，同时刷新阅读材料。每次处理一份当前更新，完成后再开始下一次。

用户明确指定总条数时，在新更新的准备命令加 `--count N`。参数范围与额度关系见[抽签规则](lottery.md)。恢复时沿用原操作保存的数量与结果。

## 填写当前更新

在 `operation.json` 中填写 `research`、`posts`、适用的 `reviews` 和[研究补充结果](#研究补充)。其余自动字段由工具管理。工具汇集材料后，执行者实际读完 `reading.md`，再开展观察与写作。

`research` 每项记录一个实际读到的公开页面：

| 字段 | 内容 |
| --- | --- |
| `category` | `news` 正式资讯、`trend` 社交话题、`daily` 日常经历 |
| `purpose` | Meme 采样页填 `"meme"`，其他观察可省略；发现入口与近期原用法分别记录，步骤见[Meme 研究](../environment/meme-research.md#每次更新读取近期-meme) |
| `kind` | `feed` 资讯、榜单或单篇材料；`thread` 带回复的讨论 |
| `url` | 原页 HTTPS 链接 |
| `visitedAt` | 实际访问时间，带时区的 ISO 时间 |
| `publishedAt` | 原始发布时间；无法确认时填 `null` |
| `summary` | 实际读到的范围、值得参考的情境或交流；采用时补对应帖子 ID 和改编方向 |

观察覆盖三个类别、至少三个不同页面和两个来源域名，其中有一段实际读到回复的讨论。访问发生在本次更新前 48 小时内，至少一项材料发表于最近七天。旧材料保留原日期，当前话题的热度按本次可读内容记录。

采用当前素材或精选案例时，按[素材取用](../environment/source-sampling.md#论坛怎样读取)记录，不为补足页面字段恢复原身份或平台，也不单独算作一项新鲜网页观察。

`posts` 使用以下结构；编号由本次更新编号加序号形成，署名在同一账号的后续回复中保持一致：

```json
{
  "id": "update-example-01",
  "author": "guest-example",
  "guest": { "name": "随手取的网名" },
  "createdAt": "2026-11-09T00:00:00+08:00",
  "replyTo": null,
  "text": "这里填写审读完成的发言。",
  "likes": 2,
  "canon": "derivative",
  "media": []
}
```

随机路人的 `author` 使用唯一的 `guest-` 编号，`guest.name` 保存公开网名。署名随帖子归档，网页自动汇集该账号的发言。库内人物使用原 `author` 编号，并省略 `guest` 字段。

`text` 保存实际文字。纯图发言填空字符串，并在 `media` 登记实际图片。

启用讨论配额的操作会带有私有 `reviews` 数组，每条实际发言对应一项审读结果：

```json
{ "postId": "update-example-01", "negative": true, "reason": "指责舍友擅自借走设备，要求对方归还。" }
```

`postId` 对应当前 `posts` 中的一条实际发言；`negative` 填本次审读的布尔判断，`reason` 写清依据。普通内容同样填写记录，例如 `negative: false`、`reason: "询问桌腿怎样固定，正文只在请求操作帮助。"`。字段只保存在操作文件，用于[讨论配额](lottery.md#负面与回复提示)核对。补写或修改正文后同步复核该项，发布页面沿用原帖子字段。

`likes` 保存本条基础赞数，取值依据与建议数值的处理见[评论与点赞研究](../environment/comments-research.md#点赞怎样形成差异)。

主帖的 `replyTo` 为 `null`；回复填写真正父帖的 ID。时间使用上海时区，处在已有时间线之后、实际当前时刻之前，回复时间晚于或等于父帖。新草稿的时间由 `brief` 安排，处理方式见[逐条写作](#逐条写作)。示例时间与正文在使用时替换为本次实际内容。

删除根帖时，移除整个根串发布包；删除回复时，移除其正文及下级回复，并清理这些发言独用的普通配图。随后重新生成信息流，核对剩余帖子及图片引用。

## 研究补充

准备结果中的 `researchMaintenance.selectedPaths` 给出本次研究对象，抽取方式见[抽签规则](lottery.md#研究补充)。读取选中文档和已有参考，再进入原始来源阅读材料。

围绕本专题尚未解释清楚的问题，连续读原帖及可见回复，再沿实际发生的来回追看后续。一起保留普通、低互动、重复和中断的交流；定向挑选的争执或纠错串用于理解机制，比例判断另需记录采样入口、排序、时间窗口与统计口径。搜索摘要和转述只作发现线索，有效案例以实际读到的原文为依据。

新增前先核对已有案例：同一原串的深化阅读补回原条目，写清这次新增的读取范围与访问日期；有独立价值的新样本沿原编号追加。记录原始日期、实际读到的楼层或分支、影响理解的先后关系，以及未展开、缺失或只见链接的部分。方法上的新发现修订本专题对应章节，已有概括相同的地方合并；过时资料核实后修正。

冲突的触发与转向归[负面与争议研究](../environment/negative-research.md)，回复怎样参与和接续归[评论研究](../environment/comments-research.md)，表达形式与疏漏归[说话方式研究](../users/speech-research.md)。同一来源在主要专题登记一次，其他专题用链接引用适用处。现有文档能容纳的研究继续在原处深化；确需新增文档时，先向用户说明名称、职责及与现有文档的边界。

当前素材与用户挑选的长期案例沿[每日舆论素材](../environment/source-sampling.md)取用，专题只补分析并引用材料日期与标题，不复制整串。自动刷新与本轮研究补充各记实际完成的工作。

完成检查后，将结果填入 `operation.json.researchMaintenance`，每份选中文档对应一项：

| 字段 | 内容 |
| --- | --- |
| `path` | 抽中的研究文档路径 |
| `status` | 实际补充或修正填 `updated`，检查后沿用现有内容填 `checked` |
| `summary` | 本次新增、修正的要点，或检查后沿用原内容的依据 |
| `sources` | 实际读取的来源数组；每项填写 `url`、`visitedAt`、`summary`，分别记录原页 HTTPS 链接、带时区的访问时间和实际读取范围 |

修改研究原文后，用原工作目录再次执行 `prepare`，读取刷新的材料，再继续写作与审读。研究结果随本次更新核验；最终报告列出实际补充或检查的文档和所得结论。

## 逐串抽取回复

先把实际采用的新主帖填入 `posts`，再执行：

```sh
node lucifer0/tools/update.js replies --work /outside/work
```

接续旧串时，用根帖 ID 指定目标；多个旧串可重复 `--thread`：

```sh
node lucifer0/tools/update.js replies --thread existing-root-id --work /outside/work
```

命令为每个根串返回 `rootId` 与 `replyCount`。将实际回复追加进同一份 `posts`，保留真正父帖与先后关系。额度、抽取方式和总量关系见[抽签规则](lottery.md)。

## 逐条写作

为一条新发言获取材料：

```sh
node lucifer0/tools/update.js brief --post 本次操作ID-01 --work /outside/work
```

为根串获取一条新回复：

```sh
node lucifer0/tools/update.js brief --post 本次操作ID-02 --thread 根帖ID --work /outside/work
```

需要指定一条发言作为父帖时使用：

```sh
node lucifer0/tools/update.js brief --post 本次操作ID-02 --reply-to 父帖ID --work /outside/work
```

`--thread` 与 `--reply-to` 每次选用一个；目标与身份的选择方式见[抽签规则](lottery.md#负面与回复提示)。已有草稿也可以按它的 ID 读取材料。命令返回 `draft`、`writer` 和 `editor`。先查看 `editor.timing`：`ready` 时使用返回的草稿及时间；`deferred` 时跳过本轮候选，后续更新重新评估。将 `writer` 作为本次单人写作输入，策划者使用 `editor` 安排当前操作；把完成的文字、图片和身份补进 `draft`，再保存到 `operation.json.posts`。临时路人的公开网名填入 `guest.name`。

`writer.createdAt` 是本条的时间。`editor.discussion` 显示已审读条数、负面数及下一条的缺口；写作者按 `writer.discussion` 所带原文理解提示。回复材料同时携带评论方法原文。`writer.self.voiceExamples` 保存标记为 `practice` 的表达练习，本人正式背景保存在其余档案材料中。

策划者从 `editor` 提示的本人背景资料选取当事人已知的片段，补入单条 `writer`；临时路人的当前处境也在这一步补齐。每写完一条，保存草稿及其 `reviews` 审读项，再获取下一条材料。完整 `reading.md` 供策划者核对资料；操作文件保留全部草稿与研究记录。命令中的 ID 替换为实际当前操作编号，回复目标使用草稿或归档中已有的帖号。

## 生成并归档配图

构思发言时按[配图](writing.md#配图)统筹图片用途；完成本次条数抽取与实际 `posts` 后，再用当前工作目录执行：

```sh
node lucifer0/tools/update.js suggest --work /outside/work
```

分池配置下，命令分别返回 `rootImagePostIds`、`replyImagePostIds` 和表情建议 `emotes`；`imagePostIds` 汇集两类普通图片候选，`imagePools` 分列候选、下限、实际已带普通图片的发言及缺口。结合已规划的用途，按[配图规则](writing.md#配图)完成图片与正文；表情素材从[Meme 资源](../environment/meme-research.md)进入原页选用。按[配图审读](writing.md#配图)查看实际文件，把采用结果填回操作文件。基础赞数结合[评论与点赞研究](../environment/comments-research.md#点赞怎样形成差异)审定后填写。

采用新分池配置的操作，每个 `media` 项显式填写 `kind`：普通图片为 `"image"`，表情包或反应图为 `"emote"`。例如：

```json
[
  { "src": "posts/2026/11/update-example-01/media/scene.webp", "alt": "描述实际画面", "kind": "image" },
  { "src": "assets/emotes/l0/huh.webp", "alt": "L0一手托下巴，斜眼看着旁边的问号。", "kind": "emote", "fit": "contain" }
]
```

`assets/emotes/l0/` 中的公共表情始终按表情识别，不能标为 `image`。随帖保存的表情或反应图同样标为 `emote`，由审读者按实际用途核对。旧帖未填写 `kind` 时沿原路径识别方式显示，不改写归档。

采用外部素材时，在对应 `research.summary` 保存资源页、作者、使用依据和处理方式；需要署名的素材在帖文或图片说明中保留署名与来源。

将普通随帖配图放在所属根串的 `media/` 中，在操作文件登记实际文件路径及 `alt`。`ingest` 会自动把引用的 PNG、JPG、JPEG、SVG 配图转换为同名 WebP，保留原尺寸、比例、透明度与 `kind`，并把操作文件、帖子 Markdown 和信息流中的引用一起更新为 `.webp`；引用保存成功后删除对应旧文件。已是 WebP 的图片不会重复压缩。普通配图的目标为回复时，图片仍归该回复所在根串。直接上传到仓库并由帖子引用的位图，也会在构建时自动转换，Actions 会提交新的 WebP、引用变化和旧文件删除。头像与站点界面素材按各自用途保存。素材须可用于本次发布，总量沿[配图规则](writing.md#配图)核对。

随帖字图等需要完整呈现时，在对应 `media` 项填写 `"fit": "contain"`。图片按原比例完整显示，小图保留原尺寸；此项只控制缩放，不决定是否为表情。

素材获取或生成受限时，保留当前操作，记录实际完成状态和具体原因，后续沿原操作接续。普通图片的缺口不能用表情顶替。`media` 按已取得、已检查的实际文件登记。

## 导入与上线

`posts` 为空时，先核对本轮资料变更。有变更时完成本节的仓库检查、提交与线上核验，再执行 `node lucifer0/tools/update.js finish --work /outside/work`；资料沿用时直接执行该命令。报告本轮观察、研究结果及未发帖原因。工作目录使用工具输出的实际位置。

有待发布发言且审读完成后，用工具输出的实际路径执行：

```sh
node lucifer0/tools/publish.js ingest /outside/work/operation.json --reviewed --ai
node lucifer0/tools/publish.js validate
node build.js
```

导入器核对当前更新、新主帖数、逐串回复额度、整体上限、账号权限、资料变化、观察记录、帖子编号、回复关系、时间和媒体。新分池操作还分别核对本轮主帖、回复的实际普通图片采用量是否达到[配图下限](writing.md#配图)；只填表情的轮次不能通过。资料在创作期间发生变化时，用原工作目录重新执行 `prepare`，读清变化并重新审读原草稿。

帖子 Markdown 是正文来源：

```text
posts/YYYY/MM/根帖ID/
  index.md
  replies/回复ID.md
  media/配图文件
```

每个主帖作为一个发布包，正文、回复和普通随帖配图集中在这个文件夹中；跨月回复也放回原包。帖子 Markdown 和包内 WebP 保存这份发布包的原稿与随帖配图，网页信息流由这些原稿生成。

站内公共表情共用 `assets/emotes/l0/` 发布包，[L0清单](../assets/emotes/l0/manifest.json)登记唯一的WebP文件。主帖和回复中的 `media.src` 直接采用清单路径，多个帖子反复引用同一文件。页面将公共表情与标为 `kind: "emote"` 的随帖表情按原比例缩至不超过80像素，靠左显示，不提供原图入口；普通图片保留查看原图。公共图一直保留在这个包中，转换和清理仅处理随帖素材。可用清单会随阅读材料和单条写作输入交给执行者。

导入完成后，将有持续影响的变化回写到对应原始资料，运行仓库检查并查看手机页面。把帖子、配图、必要的资料回写和生成信息流一起提交，核对最新 `main` 后正常推送。远端有新内容时先合并、补读并检查。保留既有网页样式。

确认 GitHub 构建与 Pages 发布成功，核实本次各张 WebP 配图均在线上正常加载；普通随帖配图还需点击页面“查看原图”，核实完整画面可加载，再使用同一工作目录执行：

```sh
node lucifer0/tools/update.js finish --work /outside/work
```

工具核对本地帖子和线上 `https://y29.fivsevn.com/lucifer0/data/feed.json` 的本次内容，成功后清理操作文件、阅读副本和本次临时文件，已替换的原格式图片随转换清除。报告实际条数、随机路人与库内人物各自条数、提交和线上核验结果。实际为零条时，报告已经做的观察、受限缺项或其他原因，再结束当前更新。

## 管理员公告

管理员按用户明确指令编写和发布公告。使用仓库外的人工批次文件，沿本页的帖子结构填写正文；批次的 `version` 为1，`id` 为本次公告编号，`mode` 为 `daily`，`posts` 为实际公告数组。然后执行：

```sh
node lucifer0/tools/publish.js ingest /outside/work/announcement.json --reviewed
node lucifer0/tools/publish.js validate
node build.js
```

公告审读后与必要资料一起提交上线，核验方式沿本页执行；核验完成后清理本次公告批次文件与临时文件。管理员的自动更新范围设为 `none`，抽签权重为0。全站第一帖 `site-welcome` 保存入站须知和访问权限，`/about` 从它的正文读取 `/guide` 与 `/access` 两个栏目，`log in` 弹窗使用同一份访问权限说明；调整时直接编辑这条原帖。首帖正文以“入站须知”为第一行，接一段介绍，规则按 `01 内容`、`02 内容` 连续编号并各占一行；最后以独立一行“访问权限”起一段说明。

## 恢复与修正

中断后继续使用原工作目录、原帖子 ID 和草稿。已经存在且内容相同的帖子由工具跳过，缺少的部分继续补齐；同 ID 的不同内容会要求核对。`.publish-pending.json` 暂存未完成导入，`.publish.lock/` 与 `.publish-staging/` 服务写入过程，工作目录的 `.update.lock/` 协调准备、收尾与撤回，均由工具管理。发布校验和构建要求当前导入已完成，准备及恢复仍可读取此前已完成的内容。

执行器被强制结束并留下锁时，AI 先核对该仓库的发布或准备进程已经退出，再清理相应的遗留锁目录，保留当前操作文件与 pending 记录，沿原命令恢复。

推送或上线尚未完成时，继续完成当前步骤；成功核验后再清理工作记录。旧帖修正直接编辑原 Markdown，保留 ID、作者、时间及回复关系，然后重新校验与构建。

补录历史使用用户明确指定的时间范围，并在导入时加 `--backfill`。当时的世界状况与人物阶段决定可用材料。日常更新沿当前时间线追加。

## 撤回未完成导入

旧稿因账号权限变化或内容调整需要重写时，使用原工作目录执行：

```sh
node lucifer0/tools/update.js cancel --work /outside/work
```

工具按当前操作的未完成写入记录逐一核对，只撤回其中仍与记录吻合、尚未进入 Git 的帖子文件。既有帖子、配图和手工改动继续保留；发现文件冲突时保留现场并报告具体路径。

成功撤回后，原操作编号、抽签与观察继续保留，草稿清空，阅读材料刷新。沿同一操作重写、审读并导入。撤回中途被打断时，可重复执行原命令。已经完成归档的正文按旧帖修正流程处理。
