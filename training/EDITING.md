# 飙肌野郎：内容与规则维护指南

本页描述当前实现。游戏保留七日流程、隐藏状态、按实际出勤触发的同伴事件和 Canvas 像素场景。新增内容应从下表定位到对应数据源，再检查受影响的规则和测试。

## 文件与修改入口

| 想修改什么 | 入口 |
| --- | --- |
| 前台问题、初始状态、原五位好友、每日热身 | `game.js`：`START_QUESTIONS`、`createGame`、`CHARACTER_DATA`、`WARMUPS` |
| 原始训练动作、每日动作池 | `game.js`：`WORKOUTS`、`SCHEDULE`；追加数据在 `content.js`：`EXTRA_WORKOUTS`、`EXTRA_SCHEDULE` |
| 原五位好友事件、第一批普通日常 | `content.js`：`FRIEND_EVENTS`、`FRIEND_PHASES`、`GYM_EXTRAS`、`NIGHT_EXTRAS` |
| 老戴、Kevin、神秘哥，以及三组组合事件 | `expansion.js`：`NEW_CHARACTERS`、`NEW_FRIEND_ROWS`、`FRIEND_GROUPS` |
| 追加同伴场景、日常、组合、逐日出场、结局消息 | `variety.js`：`COMPANION_SCENES`、`AMBIENT_TRAIN`、`AMBIENT_MEAL`、`MORE_GROUPS`、`ARRIVALS`、`MEAL_ARRIVALS`、`ENDING_LINES` |
| 店铺、菜单、每日店铺池、dx 小食 | `game.js`：`MENUS`、`DAY_STORES`、`STORE_LINES`、`STORE_ARRIVALS`、`DX_SIDES` |
| 追加菜单、小菜 | `expansion.js`：`EXTRA_MENUS`、`SIDE_DISHES`；`variety.js`：`MORE_MENU` |
| 黑屏镜子独白、群聊回复 | `narrative.js`：`MIRROR_POOLS`、`GROUP_REPLIES`、`GROUP_ACK`；追加数据在 `variety.js`：`MORE_MIRROR`、`MORE_REPLIES` |
| 出勤、事件抽取、训练结算、菜单轮换、跨日 | `game.js`：导出的规则函数，见下文 |
| 手机报告、支付画像、周末消息 | `game.js`：`renderReport`、`paymentProfile`、`friendEndingMessages` |
| 文字演出、确认选项、像素图、布局 | `game.js` 的 `if(hasDOM)` 内：`render*`、`startDialogue`、`drawScene`、`drawMini`；样式在 `style.css` |

`game.js` 在导入时组合数据：先合入 `expansion.js` 的好友与菜单，再由 `installVariety()` 追加事件、组合和结局，然后追加镜子、群聊与菜单；最后把 `EXTRA_SCHEDULE` 加到每日动作池。直接阅读单个数据文件时，看到的是一部分内容；测试导入 `game.js` 后看到组合后的全集。不要在同一运行环境重复调用 `installVariety()`。

当前测试校验的规模为：21 个动作、8 位固定好友、214 个好友事件、98 个追加普通日常、24 个组合场景、109 项主餐、192 句镜子独白、16 种群聊回复。改变规模时同步更新对应校验，不能只改数字来掩盖重复、遗漏或失去可达性。

## 一周的状态流

开场体验卡 → 前台四问 → 换装 → 独自出发／建立最多四人的小群 → DAY 1。

每天的 `step` 按以下流程变化：

```text
warmup → warmupResult → event → eventResult
  → workout → workoutResult → gymEvent → gymEventResult
  → workout → workoutResult
  → [bonusOffer → bonusResult → 选加练时再来一轮 workout → workoutResult]
  → mealPlace → mealPlaceResult → meal → mealResult
  → [sideOffer → sideResult]
  → afterEvent → afterEventResult → summary
```

`advanceDay()` 只接受 `summary`。前六天进入下一日，重置回合、加练、小菜、主餐和当前店铺；第七天进入 `epilogue`，随后是锁屏、收件箱、训练／支付／朋友消息、镜子与周末结束。手机报告通过 `reportViewed` 记录阅读情况，`phoneUnlocked` 避免返回收件箱时重新锁屏。

规则函数返回新状态；不符合当前阶段的操作通常返回原状态。界面用 `pendingAction` 保存选中的选项，确认后才交给规则函数，并用 `animating` 阻止过渡期间再次操作。新流程需要同时补上规则、渲染分支和按钮分派。

## 状态与随机规则

- `seed`：同一初始条件下复现抽取结果；`hash()` 根据种子、日期、阶段与角色 ID 决定出勤和事件。
- `party[].hidden`：个人能力、疲劳、恢复、信心、动作熟练度、实际训练和用餐记录。不能用“被邀请”代替“实际出勤”。
- `traits`：本周选择倾向；`needs`：`fuel`、`sleep`、`mood`；`tags`：开场问答标签。前台答案中的恢复与信心增益在 `createGame()` 中作用到玩家本人。
- `history`：每天训练动作、主餐、训练朋友与饭局朋友；在晚饭结束时写入，周末统计以此为准。
- `interactions`：事件 ID、参与朋友、选择 ID 与阶段；事件去重与结局互动数依赖此记录。
- `spend`：主餐、小菜与馆内消费分别记账；`stores`：玩家主餐到店次数；`mainMeal`：防止小菜反馈覆盖当天主餐。
- `selectedStore`：当天选定店铺。dx 喜好只在当天选定 dx 后增加饭局出勤率；跨日必须清空。

`attendance(state, phase)` 是实际出勤的统一入口，训练与饭局分别判定。邓子在规则层禁止训练。飞飞和邓子的 `preferredStores` 包含 dx捕鲸堡，选定后饭局到场概率增加 18 个百分点，仍然可能缺席；邀请其中一人后，dx 每天都可选，否则只在第 1、3、7 天进入普通店铺池。

`contextualEvent()` 依次考虑满足全员到场的组合、两人临时事件、到场好友专属事件与普通池；已经记录的事件会被排除，普通池耗尽时才退回全池。训练与饭局分开抽取。`eventFor()` 的每日普通事件按当日池抽取，不读取状态；因此新增普通事件要检查与其他阶段、其他日期是否重复。

## 添加或修改内容

### 好友与场景

固定好友的基础结构包含：

```js
{
  id: 'stable-id', name: '称呼', relation: '简短公开介绍', focus: 'balanced',
  bias: {awareness: 1},
  rates: {train: 70, meal: 70, cancel: 10, extra: 10, rest: 40},
  look: {hair: 0, hairColor: 0, eyes: 0, top: 0, bottom: 0, shoes: 0, accessory: 0, body: 0},
  events: {train: ['到场参考'], meal: ['饭局参考'], ending: ['结局消息']}
}
```

好友事件行使用 `[旁白, 选项一, 反馈一, 选项二, 反馈二, 效果对象]`。`FRIEND_PHASES[id]` 必须与事件数组逐项对应，值为 `train` 或 `meal`；`makeFriendEvent()` 生成第三个暂停／倾听选项。

`COMPANION_SCENES[id][phase]` 中的追加场景采用 `旁白|选项|反馈` 三段字符串，由 `installVariety()` 补齐另一个选择和效果。字符串内部不能再放 `|`。

组合事件的 `members` 必须都是稳定角色 ID，且全员实际到场才触发。新好友还需要检查邀请后的回复、`ARRIVALS`／`MEAL_ARRIVALS`、`GROUP_ACK`、结局统计措辞以及相关测试，不能只添加一行通讯录。

原始三组普通事件池在 `game.js` 装载时获得 `base-阶段-日期-序号` ID，追加事件保留自己的 ID。普通事件应有唯一 `id`、`minDay`、`who`、`text` 和 `choices`，每个选项有 `id`、`label`、`line`、`delta`。不同日池和阶段之间也要保持旁白唯一，避免一周重复。

### 动作与菜单

动作条目包含 `name`、`en`、`explain`、`main`、`load`；`main` 取 `strength`、`cardio` 或 `mobility`。添加动作后加入对应 `SCHEDULE`／`EXTRA_SCHEDULE`，由 `workoutsFor()` 每段展示五个不同项目；说明只在点选后展开。`doWorkout()` 中还有身体部位映射，增加动作时也要评估该映射，不能只添加文案。

主餐条目包含 `id`、`name`、`icon`、`price`、`line`、`delta`。同店 ID 必须唯一；当前 `MORE_MENU` 生成的 ID 允许不同店之间重复，完整点餐键是 `店名|菜品ID`。`MORE_MENU` 的行结构是 `名称|图标|价格|反馈`，效果由装载代码统一生成。

`menuFor()` 每天轮换四项，可能把最后一项标记为售罄；`chooseMeal()` 校验当前店铺和库存。小菜由 `sideFor()` 单独决定，可拒绝，接受后独立记账，不能覆盖 `mainMeal`。昆虫饮料属于游戏虚构内容。

新增店铺还需要同步每日店铺池、员工台词、到店旁白、`storeScene()` 的像素场景映射；不要让店员冒用固定朋友姓名。

### 结局、手机与外观

`paymentProfile()` 根据到店、菜品、开支和行为倾向评分选出 14 种画像之一；添加画像需要构造满足条件的真实数据验证，避免无条件高分遮住其他画像。支付列表倒序，周度小结置顶。

`friendEndingMessages()` 从实际 `history` 统计训练／饭局碰头天数，从 `interactions` 统计互动；缺席时不要写成在场。`appearanceRoute()`、`compositeMetrics()` 与镜子独白读取的状态不同，修改一处时需要确认其他收尾是否仍然一致。

手表只展示复合指标；不要把隐藏参数直接当数值栏公开。音乐栏是最近播放信息。锁屏没有最近播放栏，通知打开后回到收件箱不重新锁屏。合照只纳入有实际训练或用餐记录的人。

## 验证与发布

从仓库根目录运行：

```bash
node --test tests/training*.test.js
npm test
npm run build
```

训练测试覆盖完整七日流程、出勤与邓子限制、500 个种子的同伴和日常去重、菜单轮换与售罄、小菜记账、画像条件及手机收尾控制器。模拟控制器不能代替浏览器验收：还需实际检查选项出现与确认、逐字显示、滚轮、页面高度、锁屏返回和完整重开。

修改 `game.js` 时更新 `index.html` 中脚本 URL 的版本参数；修改数据文件时同步更新 `game.js` 中对应的导入 URL 版本。修改样式则更新页面样式 URL 版本。新增运行文件必须加入根目录 `build.js` 的输出清单，并确认构建后的 `/training/` 页面可用。

游戏没有存档迁移或刷新续玩。
