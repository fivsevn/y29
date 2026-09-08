# 飙肌野郎：内容维护

沿用原七日流程、隐藏参数和 Canvas 场景。第三轮仅增加整屏手机模式与内容数据。

- `game.js / CHARACTER_DATA`：五位固定朋友的简短介绍、外观、初始倾向、出勤及消息。不要给邓子增加训练出勤：`attendance` 也显式禁止她参训。
- `content.js / FRIEND_EVENTS`：每人五个可选择专属事件；前四位的前三个是馆内、后两个是饭局；邓子的五个全部是饭局。每行依次是旁白、选项一、反馈一、选项二、反馈二、效果。
- `game.js / attendance、contextualEvent、recordInteraction`：实际出勤、组合事件、互动记录。训练画面、训练增长和结局使用同一出勤结果。
- `content.js / EXTRA_WORKOUTS、EXTRA_SCHEDULE`：新增训练项目与首次出现日期；原项目保留在 `game.js / WORKOUTS、SCHEDULE`。
- `content.js / GYM_EXTRAS、NIGHT_EXTRAS`：28 个馆内、21 个晚间事件，按天递进。原事件池仍保留。
- `game.js / MENUS、DAY_STORES、STORE_LINES、STORE_ARRIVALS`：食物、饭店日池、员工台词、到店反馈。员工用职务称呼，不借用朋友姓名。
- `game.js / START_QUESTIONS`：前台四问与初始映射。
- `game.js / renderPhone、renderReport、stage`：邀请、聊天回复、消息列表、三份报告和内心总结。手机阶段不创建上方场景画布。
- `game.js / friendEndingMessages、EPILOGUE_LINES、THOUGHT_POOLS`：结局台词；朋友消息结合实际同行、约饭、互动和玩家倾向。
- `game.js / watchHud、compositeMetrics`：手表字段和复合指标。底层参数不要直接展示。
- `style.css / .pixel-handset、.chat-screen、.chat-bubble`：整屏像素手机样式；其他场景继续使用原样式。

验证：运行全套 tests、build 和 diff 检查。新数据文件已加入 build.js。改动发布时更新 index.html 的样式/脚本版本；若修改 content.js，也更新 game.js 的导入版本。

测试包含五个固定种子的完整七日周目，逐轮断言出现新事件；随机内容不承诺任意连续五局绝对无重复，现有游玩状态仍只在内存中。
