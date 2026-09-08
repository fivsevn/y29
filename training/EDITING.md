# 飙肌野郎：内容维护

沿用原七日流程、隐藏参数和 Canvas 场景。第四轮加入建群前独自出发分支、通知锁屏、群聊与熄屏独白。

- `game.js / CHARACTER_DATA`：五位固定朋友的简短介绍、外观、初始倾向、出勤及消息。不要给邓子增加训练出勤：`attendance` 也显式禁止她参训。
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

测试包含五个固定种子的完整七日周目，以及 500 个种子下五位朋友的七日事件去重。固定角色专属事件一周内不重复；普通日常池仍随机。现有游玩状态仍只在内存中。
