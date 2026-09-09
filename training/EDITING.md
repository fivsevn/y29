# 飙肌野郎：内容维护

## 第六轮：内容与手机细节

新增内容集中在 `variety.js`，由 `game.js` 在原数据上追加，不替换原流程。

- `COMPANION_SCENES`：新增 107 个固定角色场景；按训练／饭局分开，邓子只有饭局。原场景在 content.js、expansion.js，总计 214 个；每个角色事件现在有三种选择。
- `AMBIENT_TRAIN、AMBIENT_MEAL`：新增 49 个日常场景，总日常追加池为 98 个；保留按天递进。已发生事件写入本周记录，后续抽取排除它们。
- `MORE_GROUPS`：组合场景从 12 个增至 24 个；仍要求对应组合全员实际到场，且同周不重复。
- `ARRIVALS、MEAL_ARRIVALS、ABSENT_REASONS`：逐角色、逐天的到场／约饭表现；请勿把未到场写成在现场。
- `ENDING_LINES、MORE_REPLIES`：固定朋友结局台词总计 67 句，玩家回复从 8 种增至 16 种。实际碰面次数仍由本周记录生成；不同角色使用不同措辞。
- `MORE_MENU`：50 道新食物，菜单总计 100 项；保留每日轮换、售罄、加菜及独立计费。昆虫饮料是游戏虚构内容。
- `MORE_MIRROR`：新增 96 句原创短独白，总计 192 句，每次仍只抽三句。
- `game.js / paymentProfile`：14 种支付画像及触发条件、解释文本；不是纯随机标题。周结置顶、支付倒序且不显示误导的流水编号。
- `game.js / workoutsFor`：每回合五项训练，保持点选才展开说明。
- `style.css / .is-locked、.chat-screen .pixel-phone-list`：锁屏统一背景、不显示最近播放，消息卡片分隔；聊天软件内仍保留最近播放信息。

回归额外覆盖：500 种整周日常去重、八位角色事件去重、14 种画像条件、所有菜单及独白数量、锁屏内容、完整重开。

沿用原七日流程、隐藏参数和 Canvas 场景。第五轮加入三位朋友、四人同行、每日菜单、加菜及时间回环。

## 第五轮新增数据入口

- `expansion.js / NEW_CHARACTERS、NEW_FRIEND_ROWS`：老戴、Kevin、神秘哥；每位各 7 个训练事件、7 个饭局事件。公开介绍保持含蓄，设定只通过行为体现。
- `expansion.js / FRIEND_GROUPS`：孟总与 Y.、熙熙与飞飞、老戴与 Kevin 与神秘哥，三组共 12 个组合事件；全员实际到场才可触发，同周不重复。
- `expansion.js / EXTRA_MENUS、SIDE_DISHES`：29 道新增菜单（含 5 种虚构昆虫饮料）、4 种可选小菜；每道菜的 id 必须唯一。
- `game.js / menuFor、sideFor、chooseSide`：每天轮换四项菜单，偶尔售罄；加菜独立计费，不覆盖主餐记录。
- `game.js / workoutsFor、APPEARANCE、drawMini`：每段四项训练选项、亚文化搭配及对应像素外观。
- `game.js / renderIntro、resetWeek`：体验卡开场、153 cm / 43 kg 默认值、完整清空状态并回到七天前。
- `game.js / renderReport`：57pay 周度小结置顶、支付记录倒序；`style.css / .is-locked`：大时钟及底部锁屏通知。

## 原有内容入口

- `game.js / CHARACTER_DATA`：原五位固定朋友的简短介绍、外观、初始倾向、出勤及消息，另从 expansion.js 合入三位。不要给邓子增加训练出勤：`attendance` 也显式禁止 TA 参训。
- `content.js / FRIEND_EVENTS、extraFriendRows、FRIEND_PHASES`：65 个固定角色事件。前四位各 7 个馆内、7 个饭局，邓子 9 个饭局。每行依次是旁白、选项一、反馈一、选项二、反馈二、效果；阶段索引控制场合。
- `game.js / attendance、contextualEvent、recordInteraction`：实际出勤、组合事件、互动记录。训练画面、训练增长和结局使用同一出勤结果。
- `content.js / EXTRA_WORKOUTS、EXTRA_SCHEDULE`：新增训练项目与首次出现日期；原项目保留在 `game.js / WORKOUTS、SCHEDULE`。
- `content.js / GYM_EXTRAS、NIGHT_EXTRAS`：28 个馆内、21 个晚间事件，按天递进。原事件池仍保留。
- `game.js / MENUS、DAY_STORES、STORE_LINES、STORE_ARRIVALS`：食物、饭店日池、员工台词、到店反馈。员工用职务称呼，不借用朋友姓名。
- `game.js / START_QUESTIONS`：前台四问与初始映射。
- `game.js / renderInviteGate、renderPhone、renderReport、stage`：独自出发/建群、群聊、首次通知锁屏、公众号报告。点通知解锁后只返回消息列表。
- `narrative.js / MIRROR_POOLS`：96 句原创黑屏镜子独白，分身体、仪式、关系、饮食、休息、自我六类；每次按状态抽三句。没有引用名人名言。
- `narrative.js / GROUP_REPLIES、GROUP_ACK`：8 种玩家回复及角色回应；`game.js / friendEndingMessages` 结合实际互动生成群内短消息。
- `game.js / phoneStatus、paintGroupPhoto`：现实时间、57Signal、由开局状态组合得到的模拟电量、实际同行者合照。音乐栏只是最近播放信息，不会自动播放音频。
- `game.js / watchHud、compositeMetrics`：手表字段和复合指标。底层参数不要直接展示。
- `style.css / .pixel-handset、.chat-screen、.chat-bubble`：整屏像素手机样式；其他场景继续使用原样式。

验证：运行全套 tests、build 和 diff 检查。新数据文件已加入 build.js。改动发布时更新 index.html 的样式/脚本版本；若修改 content.js，也更新 game.js 的导入版本。

测试包含五个固定种子的完整七日周目，以及 500 个种子下八位朋友的七日事件去重，另检查组合事件、菜单轮换、售罄防护、加菜账单及完整重开。固定角色专属事件一周内不重复；普通日常池仍随机。现有游玩状态仍只在内存中。
