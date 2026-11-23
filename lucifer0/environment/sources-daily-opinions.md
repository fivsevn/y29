# 素材-每日舆论

本页保留当前一批舆论与交流素材。GitHub Actions 安排每天北京时间 08:00 刷新下方当日区，发帖前另由[准备流程](../docs/publishing.md#准备)触发新一轮采集并等待成功。每次用实际取得的内容替换上一批，写清更新时间、读取范围及取得情况；来源受限或没有可用内容时如实说明，不编造数量。

用户也可以直接把文字、聊天转写或截图整理内容贴到当日区，无需固定格式；下次刷新会一并替换。值得长期保留的材料由用户挑选进入[素材-精选参考](sources-selected-cases/README.md)，自动采集不修改精选。日常不另外建立历次素材归档，文件更新仍会留下 Git 版本记录。

贴入内容先去掉平台名、原账号、原链接、联系方式和可定位个人的细节；同一段交流用稳定匿名代号，保留谁回复谁、先后关系、错字、乱标点、复读、跑题和没说完的部分。自动采集仅机械处理明显标识并截取短片段，不表示已经完成语义审读；独特经历或措辞仍可能识别人，取用前继续核对和泛化。节选与转述说明实际处理，不作为逐字原文或人群比例统计。

采集以48条候选余量为目标，按本轮种子轮换读取可用来源，每个来源最多补到8条；单轮最多120次请求、约6分钟，同时最多4次请求。每次新采集使用新的取样种子，至少取得 [publication.json](../publication.json) 中 `caseAdaptation.count` 所需的近期未采用案例才可开始更新，当前新一轮为6份。允许较长主帖、无回复与低信息互动，保留节选中的引用关系。近30天、最多300条采用指纹保存在 `.github/state/lucifer0-case-usage.json`，只含指纹和日期，随实际帖子归档一起发布；采集本身不登记采用。恢复原操作沿用固定案例。

## 自动取材范围

当前读取下列21个来源，使用无需登录的公开 API 或网页，保留七天内主帖及公开首批回复。采集材料保留实际原文；采用为本论坛主帖、回复或媒体说明时，繁体转为简体，其他语言按原意译写为自然的简体中文，并沿现有匿名与[本站化](../docs/localization.md#公开语言)流程处理。来源失败、近期没有帖子或没有符合现有节选限制的内容时记入采集计数，由其他可用来源补充，不保证每站每轮都有材料，也不改变话题比例。

| 来源 | 主要语言 | 取材方向 |
| --- | --- | --- |
| [V2EX](https://www.v2ex.com/) | 中文 | 日常经历、工作、消费、求助与争论 |
| [X岛匿名版](https://www.nmbxd1.com/) | 中文 | 匿名闲聊、抱怨、兴趣与低信息互动 |
| [PTT 男女板](https://www.ptt.cc/bbs/Boy-Girl/index.html) | 繁体中文 | 恋爱、约会、分手、暧昧、伴侣沟通 |
| [PTT 婚姻板](https://www.ptt.cc/bbs/marriage/index.html) | 繁体中文 | 婚姻、家务、家庭关系与相处摩擦 |
| [PTT 女性闲聊板](https://www.ptt.cc/bbs/WomenTalk/index.html) | 繁体中文 | 友情、孤独、个人情绪与日常关系 |
| [Hacker News](https://news.ycombinator.com/) | 英语 | Ask / Show 中的个人提问、经历、工作与作品交流 |
| [Lobsters](https://lobste.rs/) | 英语 | 兴趣、作品、使用体验与讨论 |
| [PIXLS.US](https://discuss.pixls.us/) | 英语为主 | 摄影、图片处理、作品与失败求助 |
| [Geekzone](https://forum.geekzone.fr/) | 法语 | 闲聊、影视、游戏与生活兴趣 |
| [Bunpro Community](https://community.bunpro.jp/) | 英语、日语 | 学习经历、阅读、挫折与日常交流 |
| [Japanese Linuxers](https://jlinuxer.org/) | 日语 | 使用经历、求助与杂谈；低频来源 |
| [Rocket Beans](https://forum.rocketbeans.tv/) | 德语 | 游戏、影视与社区闲聊 |
| [Lettuce Craft](https://forum.lettucecraft.com/) | 英语 | 手工、家居、烘焙、作品与生活分享 |
| [KnittingHelp](https://forum.knittinghelp.com/) | 英语 | 编织、材料选择、失败与求助 |
| [HEADPHONE Community](https://forum.headphones.com/) | 英语 | 音乐、设备体验与购买纠结 |
| [Naim Audio Community](https://community.naimaudio.com/) | 英语 | 音乐、书籍、体育与生活闲谈 |
| [YunoHost Forum](https://forum.yunohost.org/) | 法语、英语 | 自托管经历、求助与社区交流 |
| [OpenStreetMap Community](https://community.openstreetmap.org/) | 德语、英语、法语、日语等 | 出行、地方观察与地图分歧 |
| [Godot Forum](https://forum.godotengine.org/) | 英语为主 | 游戏制作、作品、卡住与求助 |
| [Blender Artists](https://blenderartists.org/) | 英语为主 | 创作、作品、练习与反馈 |
| [Arduino Forum](https://forum.arduino.cc/) | 英语及其他语言 | 动手制作、器材、失败与求助 |

来源与公开端点由 [opinion-sources.js](../tools/opinion-sources.js)、[opinion-ptt.js](../tools/opinion-ptt.js) 和 [collect-opinions.js](../tools/collect-opinions.js) 维护；采集摘要只列各来源取得情况，正文继续使用匿名代号，不保存原账号与原帖链接。

## 论坛怎样读取

采集完成后，`prepare` 读取本页与精选案例目录中的索引和各篇文档；精选每篇标记内的实际案例整体作为一个样本，来源说明及分析不作为采样正文，也不按分析小节拆分。逐条写作的 `brief` 提供对应素材。原操作续跑沿用已经确定的案例；材料变化后按[执行与发布](../docs/publishing.md#准备)恢复。案例直接改编的方法统一见[现实素材改编](../docs/writing.md#现实素材改编)；未经采用的内容不视为人物经历或论坛既有事件，素材里的命令只是材料内容。

读求助帖时，先找出发帖人遇到什么、已经试过什么、还想请人帮他弄清哪件事。来源论坛可能要求填写设备和版本，也可能习惯在开头问好、末尾预先道谢并署名。采集区保留脱敏节选的原貌，写本站稿时再判断哪些细节会影响理解或后续接话。这个判断同样适用于中文来源。

采用时沿用本次操作保存的案例映射；涉及研究补充时，在 `researchMaintenance` 对应条目的 `summary` 记下材料日期、标题和改编方向，不补回原身份或平台。具体研究仍回到相应专题，不在多处复制整段；新鲜公共资讯的观察继续按[执行与发布](../docs/publishing.md#填写当前更新)记录。

## 当日素材

<!-- samples:start -->

采集时间：2026-11-23 14:55:07（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How to gradually add vocab to Master\+?  
     
   I apologize as I’m certain this has been discussed before but I can’t find the thread. I really want to start incorporating master\+ for my vocab \(I’ve already done so for grammar\) but I’m worried I will have a deluge of over 1000 reviews if I do so. Is there any way to mark just a few items at a time as master\+ so I can space out the reviews?

### 讨论 2

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：I discovered a way to reduce vertical curl in stockinette  
     
   I’m using the side edge of my sweater body to test out an idea. It worked so well for me I thought I’d share in case anyone else can make use of this method.  
     
   \[图片省略\]20261116\_0845261920×2560 1020 KB  
     
   \[图片省略\]20261116\_0835541642×2182 819 KB  
     
   Two pieces of stockinette. One clearly curling no matter how flat I try to make it, the other has a section sitting flat \(which curls where I have not done the treatment\).  I have shown the right side and wrong side of each.  
     
   It is a crochet slip stitch worked on the wrong side between 2 columns of stitches.  
     
   I wanted a non curling edge for a button band where I did not want ribbing or the additional bulk of double knitting or a folded band.  
     
   Has anyone else used this method before?

2. **发言者 2**（回复第 1 条）：I’ve not done this.  I will try this.  I have done a one stitch column of garter stitch between the main body of the project and the border to counter flipping.  It can help a lot when the border is part of the knitting.

3. **发言者 3**（引用未收录发言）：Excellent\! I’ll have to give that a try next cardigan.

4. **发言者 4**（引用未收录发言）：Thank you\! I wonder what can be done for the corner of a crocheted cardigan which curls. I see them even in the pattern photos which makes me immediately skip that pattern\!

5. **发言者 1**（回复第 4 条）：Do you have a pattern or pic example?  
     
   I wonder if this method would help? It is kept invisible in the knitting RS by being between the columns which i don’t think is possible in crochet but then i am not a crocheter so my experience is almost zero.  
     
   If you try it though let us know.

6. **发言者 4**（回复第 5 条）：I’m not sure if this is actually turning out like this, the wind, or just incidental, but here’s one I found on Ravelry. I have a sweater somewhere that I can try to fix using this method. I’ve tried different solutions but it always goes back to curling.  
     
   \[链接隐去\]  
     
   \[图片省略\]IMG\_0889944×1290 228 KB

7. **发言者 5**（回复第 1 条）：Yeah, this is definitely an issue with crochet cardis. I haven’t ever found a solution…I just live with it.

8. **发言者 6**（回复第 1 条）：What a cool find\! I’ll remeber this\!

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Looking for modelers, animators, riggers, texture artists  
     
   Hi everyone\! We are working on a 3d animated TV show about supernatural beings and the secrets Blackthorn Academy, the one place where they are safe, hides.  
     
   We already started with production. We have concept arts and the script is being written.  
     
   We appreciate any help\! Even if you are generalist or do something that isn’t listed, you are welcome to join. Any kind of contribution will be properly credited, and you are free to use your work in a portfolio/demo reel. This is a passion project and is unpaid.

### 讨论 4

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Wat is deze mapper aan het doen?  
     
   Wat is de bedoeling van deze mapper.  
     
   \[链接隐去\]  
     
   Een reactie krijg ik niet. Changesets van deze mapper in Nederland heb ik tot nu toe terug kunnen draaien.  
     
   Reactie vanuit Duitsland  
     
   Reactie van pitscheplatsch, ongeveer 3 uur geleden  
     
   Should be reverted. This is js injection …  
     
   Ik heb bij de DWG een melding gemaakt. Zowel bij Marc Zoutendijk als bij de DWG met een officiële ticket.  
     
   Edit  Ik zie dat pitscheplatsch  nu ook aan het reverten is geslagen.. Dus ik wacht even af.  
     
   Edit 2  
     
   Dit is wat ik heb gevonden..  
     
   Een JavaScript-injectie \(vaak afgekort als JS injection\) is een vorm van een beveiligingskwetsbaarheid of cyberaanval waarbij een aanvaller kwaadaardige JavaScript-code weet in te voeren en uit te laten voeren binnen een webpagina of webapplicatie. \[1, 2\]  
     
   Doordat deze code in de browser van een bezoeker draait, krijgt de aanvaller dezelfde rechten als de pagina zelf, waardoor het script acties kan uitvoeren namens de gebruiker.  
     
   edit2  
     
   Ticket\#2026112210000442 is aangemaakt, maar ik heb nog geen actie gezien richting deze ‘gebruiker’.

2. **发言者 2**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   I have not yet seen any action directed at this ‘user’.  
     
   No, because it was only received in our system 1 hour 45 minutes ago, while most of us are caught up in a massive vandalism outbreak on the China - India border\! \(&amp; I was still asleep\! :laughing:\)  
     
   Now blocked while we sort out about theior actual CS: xss7k3q blocked by 发言者 2 \| OpenStreetMap

3. **发言者 1**（回复第 2 条）：Thx\!\!\! :\+1:

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[心情\] 氣炸了！  
     
   21號搭樂桃航空回台灣  
   又遇到藤壺中國人  
     
   一對夫妻帶個孩子  
   拿玩具車給孩子玩  
   然後孩子不停拿玩具車撞我椅背！  
     
   跟她先生講  他還說  
   “我沒辦法控制我小孩”  
   X 的！不就是你拿給他玩的嗎？？？  
     
   然後還一副完全不覺得自己錯的樣子  
   對我先生大吼！  
   你他媽一直撞我椅背  
   我要怎麼休息？？？  
     
   你們這些中國人怎麼不去死一死！！！！  
   他太太嘴裡還一直叨唸  
   什麼我們沒有孩子 老了就沒人理  
     
   X的  請問這跟我被撞有什麼鳥毛關係？？？  
     
   接著孩子就突然鬼吼鬼叫  
   好幾次  
   這時候吵的就是整台飛機上的人  
     
   我想請問  
   若是你的孩子這麼不受控  
   你們是不是就不該帶他出國？  
     
   而不是覺得別人應該忍受你家的孩子在那邊吵別人！  
   什麼叫做應該？  
   別人欠你們吵欠你們撞嗎  
     
   若不是我們趕著回台灣  
   我一定嗆爆你們！！！  
   沒水準  素質低的中國人  
   這位中國人還敢說自己是教授  
     
   台灣根本不應該開放中國人入境！

2. **发言者 2**（回复第 1 条）：黑特文

3. **发言者 3**（回复第 1 条）：發瘋回去不就好

4. **发言者 4**（回复第 1 条）：為什麼你搭樂桃回台會遇到中國人

5. **发言者 5**（回复第 1 条）：沒水準 習近平小雞雞怕台獨女刺客

6. **发言者 5**（回复第 1 条）：明明就是共產在精神霸凌台灣 結果我

7. **发言者 5**（回复第 1 条）：們還要在自己的地盤 畏畏縮縮

8. **发言者 5**（回复第 1 条）：共產是什麼 社交挫敗的代名詞嗎

9. **发言者 6**（回复第 1 条）：生一個小孩吵回去啊哈哈

10. **发言者 7**（回复第 1 条）：中國人一直以來都是素質差

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：I am confused about whether i am allowed to use AI to make my Godot games.  
     
   Moderators on the official Godot 某社区 and 某社区 page kept deleting my posts and comments because i mentioned AI and i was told i am not allowed to make my game with AI. Even when i just posted a video of my game without mentioning AI at all it got deleted. Unfortunately i am now at a point where i consider to stop using Godot, as i don’t want any drama or legal implications. I think the foundation should clarify what is allowed or not with the engine as i am sure this is confusing a lot of developers. I am even concerned of publishing my game that i worked on for many months now.

2. **发言者 2**（回复第 1 条）：What are you “allowed” to post on 某社区/某社区 and what are you “allowed” to do with the engine are two entirely separate things.  
     
   You can do whatever you want with the engine. It’s free software. Posting slop or promotion on social media channels is a different matter and might be subject to moderation policies.

3. **发言者 3**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   because i mentioned AI  
     
   \[图片省略\] 发言者 1:  
     
   I am even concerned of publishing my game that i worked on for many months now.  
     
   \[图片省略\] 发言者 1:  
     
   worked  
     
   \[图片省略\]image224×253 16.3 KB

4. **发言者 3**（回复第 1 条）：If you are really concerned, just replace every single ai generated byte in the game with your own effort. It’s that simple.

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：GTA6 Releaseparty ab 15:30\!  
     
   Hallohallo, wir haben alles umgeschmissen und sind doch gleich um 15:30 schon live und zocken rein in GTA\!\!  
     
   Alles andere was heute geplant war ist aufgeschoben, nicht aufgehoben\!  
     
   Eddy und Nils sind die ganze Zeit für euch am Start und im Laufe des Tages gesellen sich allerlei Böhnchen dazu, unter anderem Valle, Bonnie, Tim, Sarah, Henry, Ben uvm\!\! &lt;3  
     
   Das wird toll, kommt rum\! Stream geht mindestens bis Mitternacht, danach schauen wir mal, juhuuuu lets fucking goooo\!\!

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Changes on \[链接隐去\]

2. **发言者 2**（回复第 1 条）：The shadow on the cards turns white with \`prefers-color-scheme: dark\`. Did no one look at this in dark mode while testing?

3. **发言者 3**（回复第 2 条）：I didn't even notice this until you mentioned it, it looks fine to me. How do you know it's not intentional?

4. **发言者 4**（回复第 2 条）：It looks good to me. Kind of a nice glow. \(And it looks light grey to me, not white.\) I assumed it was intentional.  
     
   \(FWIW, I'm using Firefox 159.something with Plasma 6.8.something and the Breeze Dark theme.\)

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Codexed – A local settings editor for Codex CLI  
     
   I wanted an easier way to manage my Codex config. Editing config.toml by hand works, but I don't remember which keys exist or what half the feature flags do.So I made a little app that does 2-3 things well, is fast, and isn't bloated.Features:  
   - Shows the available settings for your specific Codex version \(always in sync\).  
   - Configure config.toml, AGENTS.md, Skills, Plugins and MCPs.  
   - Turn feature flags on or off, globally or per project.  
   - Keeps your comments and formatting in config.toml, because Codex makes the changes itself.  
   - Tree-view in the sidebar to view all Codex projects.  
   - Gives useful suggestions for enabling privacy-related settings.It ships as one Go binary for macOS, Linux and Windows, under the MIT license.Screenshots and install steps are on GitHub: \[链接隐去\] me know what you think and why it sucks.If you like such tools, these 2 might be helpful:  
   - Claudia — The same thing but for Claude Code  
   - Switcheroo — Switch local CLI accounts for 10\+ providers \(Wrangler, Vercel, Claude, GitHub etc\)

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Solved 5.6.2 darkroom suddenly very slow  
     
   edit: I accidentally turned on high-quality processing and didn’t realize it was enabled  
     
   darktable 5.6.2 Windows 11.  
     
   AMD R7 5800 XT  
     
   Nvidia GTX 1660 6GB  
     
   32 GB RAM  
     
   My photos are 24 MP  
     
   All of a sudden, using darkroom became very slow. It takes ~10 seconds to load a photo. darktable will display ‘working’ for ~10 seconds before showing every change.  Task Manager shows the GPU active at 100%, so I wouldn’t guess there’s an OpenCL issue.  
     
   Rebooted and that didn’t solve the issue.  
     
   I deleted everything in this folder and that didn’t resolve the issue \(GPU kernels, etc.\)  
     
   %LOCALAPPDATA%\\Microsoft\\Windows\\INetCache\\darktable  
     
   No system changes.  I’ve been using 5.6.2 since it was released \(September?\). Was editing yesterday and didn’t have an issue with the speed.  
     
   I haven’t added any new modules that would require extensive CPU or GPU.  
     
   Stumped what to do.  
     
   verbose log:  
     
   darktable-log.txt \(7.9 KB\)  
     
   Example darkroom pressing spacebar to go to the next photo.

2. **发言者 2**（回复第 1 条）：Your log contains no useful information.  
     
   Try -d common -d perf.

3. **发言者 3**（回复第 1 条）：Your video does not show the bottom icons, so I’ll have to ask: Did you turn on high quality processing by any chance?  
     
   You use multiple d&amp;s modules and this in combination with high quality might slow down things.  
     
   Just a thought.

4. **发言者 1**（回复第 2 条）：\[图片省略\] 发言者 2:  
     
   -d common -d perf  
     
   new log.  
     
   during this session, I made a clean duplicate and started enabling modules. The slowdown started to be noticeable after adding diffuse or sharpen. I used two instances: first with the local contrast preset, the second with the lens deblur hard preset.  
     
   darktable-log.txt \(475.2 KB\)

5. **发言者 1**（回复第 3 条）：\[图片省略\] 发言者 3:  
     
   Did you turn on high quality processing by any chance?  
     
   \[图片省略\] 发言者 2:  
     
   Maybe previously you did not have full resolution …  
     
   Yes. not intentionally. I’m on a laptop using the trackpad instead of a mouse. Must have clicked it by accident.  
     
   Turning off high-quality processing the darkroom speed is back to normal. Thanks.

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：我是软件工程师，有工科博士学历，现在每天语音和 ai 结对编程。  
   现在很怕 AI 把程序员这条路冲垮，想转技工手艺活，争取退休前稳一点。但又担心以后人形机器人慢慢把体力活也替代掉，想找一条能安稳干到退休的路子，大家觉得手艺活真的稳吗？

2. **发言者 2**：干厨师，拜个有声望的师傅，不止干到退休，退休的时候接大师的衣钵成为大师。

3. **发言者 3**：手艺活嘛？

4. **发言者 4**：中医，拜师走传统师承路线

5. **发言者 5**：博士都要考虑这个了吗，毕竟学历门槛是比所谓劳动力和智力门槛更能卡人啊。

6. **发言者 6**：手艺活感觉可以

7. **发言者 7**：博士，找个地方到老师吧

8. **发言者 8**：发言者 4 这个要相关专业契合吧？

9. **发言者 9**：看风水，越老越吃香

10. **发言者 10**：博士干几年不买房失业应该能直接退休了吧

11. **发言者 11**：下一步，机器人就会代替手工艺活

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：General measurements discussion for GraphWorks visualizer  
     
   Share and discuss your impressions of different measurements in the new GraphWorks visualizer tool, whether you’ve actually listened to the headphones or not \(which is normally taboo on most audiophile forums\).  
     
   I have not listened to most of the headphones in this tool btw. So most of my impressions will be based on the 5128 graphs, and sometimes some virtual listening. So they should be taken with a grain of salt.

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Output issues with supernait 3  
     
   Hi All, I have a 5 year old Supernait 3. I have not had any problems at all with this amp with it consistently delivery an unbelievable sound. Approximately 2 years ago I relocated from the UK to France. Having carefully transported and then set up my hi-fi system this amp worked beautifully \(as before of course\). Recently I had to dismantle my system for some decorating work and, having just set the system up again I am now unable to get sound from both speakers. With the balance control set fully left to 12:00 o’clock I get sound from one speaker but as this control is rotated to the right position the sound fades to zero. I have switched the speaker outputs and can confirm that the same thing happens with both/either speaker. I assume this means that the speakers are not the issue nd the problem is one of the outputs. Am I missing something? Is this something that simply needs to go to a Naim dealer? Thanks

2. **发言者 2**（回复第 1 条）：Try turning the amp off and unplugg it.  A thorough reset involves removing the link plug on the rear panel and firmly refitting it. This plug is critical for the pre-amp to power-amp connection.  
     
   ￼

3. **发言者 2**（回复第 1 条）：If you have no joy with the link reset follow this link below on how to do a mute reset.  
     
       
       \[图片省略\]  
         
         Supernait locked Hi-Fi Corner  
         
     
       
     
       
       Have you tried a reset via the front panel?  Press and hold source Mute as you power up the Supernait.  Be careful though - make sure no speakers are connected as the power up mute threshold is reduced from 30 to only 2 seconds.

4. **发言者 3**（回复第 1 条）：This may help  
     
       
       \[图片省略\]  
         
         Almost no sound from 1 speaker at low volumes Hi-Fi Corner  
         
     
       
     
       
       Did you try these tests?

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：App Lab 0.12.0 Board Configuration -&gt; Board Name field verification buggy  
     
   I'm 2 days into App Lab, Uno Q and Ventuno Q and wondering where the best place to report bugs is.  
     
   On Step1 of the Board configuration screen in App Lab, the "Board name" field verification reports and error that is unhelpful.  
     
   "Board name can only contain letters, numbers and hyphens." when the board name is set to "UnoQ".  
     
   The board name is accepted when the name length is greater than 4 characters.  
     
   In addition, entering a correct board name and then selecting "Next", then backing up to change the name to something with only 4 characters does not report an error, it instead, changes the name back to the previously valid name and continues on with no report of an invalid "Board name" entry to the user.  
     
   Initially entering a Board name with a length of 5 or more characters bypasses this error.

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：一些留子在日记录  
     
   虽然是留子记录但因为最近论文忙差不多了大概会变成打工记录\( ﾟ∀。\)7

2. **发言者 2**：jmjp

3. **发言者 3**：降压日常jmjp

4. **发言者 4**：jmjp

5. **发言者 1**：众所周知鬼子有很多厌中老登，好死不死我去年遇到过一个这种风格的老师，确切地说，与其说是厌中，更接近于本来挺好的人被反中宣传腌入味了，新闻学魅力时刻  
     
   登：请小肥同学念一下这段内容  
     
   肥：快速念完\*  
     
   登：了不起！日语很好呢！都不像中国留学生了  
     
   肥：谢谢老师  
     
   登：接下来这一段请A同学念一下  
     
   A：磕磕绊绊地用池袋口音念完\*  
     
   登：这才是中国留学生的水平嘛，小肥的日语太好了，斯巴拉西！  
     
   肥：谢谢您的赞美，不过您刚刚的发言让我感觉被冒犯到了，如果我的能力的优秀不会让你夸奖我的祖国，那么A同学的不足之处也不应该成为你贬低我的国家的理由  
     
   登：我不是那个意思，如果让你误解了不好意思  
     
   肥：您不需要和我道歉，毕竟您刚刚还在夸赞我，我应该感谢你，我也不打算将这件事上升到国家层面，但希望您向A同学道歉  
     
   登：好的，不好意思A同学  
     
   只是斯密马赛不是大变申那种程度，但再较真下去就不太占理了遂作罢

6. **发言者 1**：噢不是去年是上个学期\( ﾟ∀。\)7

7. **发言者 1**：友：你的日语这么好是怎么学的？  
     
   我：没有特别怎么学，可能是热情吧  
     
   友：这么喜欢日本吗？  
     
   我：没有，学好了方便我辱骂日本人\(・∀・\)  
     
   友：原来是纯恨\( ﾟ∀。\)7

8. **发言者 5**（回复第 5 条）：\[引用第 5 条\]  
     
   你做得好啊！

9. **发言者 1**：今天打工的时候遇到一个很可爱的小女孩，她家里人在自助收银机结账  
     
   孩：（左顾右盼）\(￣皿￣\)  
     
   肥：（正好对上眼神）\(￣皿￣\)  
     
   孩：\(&lt;ゝω・\) ☆  
     
   肥：\(&lt;ゝω・\) ☆  
     
   孩：\(\*´ω\`\*\)  
     
   肥：\(\*´ω\`\*\)  
     
   然后她家长结完账我也准备回后台做别的工作，发现孩子左顾右盼地好像在找什么，于是又站回了原来的位置  
     
   孩：ヾ\(´ωﾟ｀\)（挥手）  
     
   肥：ヾ\(´ωﾟ｀\)

10. **发言者 1**：也有不那么令人欢喜的小孩  
     
   有段时间在浅草的小吃店做前台，当时还是长发男，同样某个很闲的时刻  
     
   肥：（随机扫视周围）（看到一个小孩）  
     
   肥：\(&lt;ゝω・\) ☆  
     
   孩：\( ﾟ∀ﾟ\)σ奇怪的姐姐！！！！！！（震声）  
     
   肥：\|-\` \)

11. **发言者 6**：（震え声）一般是颤抖马上要拉儿童报警器的那种声音

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How do you keep your SRS studies "fresh"?  
     
   TL;DR: How do you「頑張ります」through SRS?  
     
   I know a lot of people get burnt out at some point from learning Japanese, I’ve been through this several times as well, but lately I’ve mostly been doing SRS studying with 某社区 and WaniKani \(through the Kakehashi app\). The joy is nil, I’m not looking forward to the daily review item pile anymore. I’ve put a stop to learning and focusing on reviewing for a while, but that didn’t help. I tried watching some shows as well. The easier ones did indeed help me to move forward, but this is also taking a lot of time from other things going on in life. Daily work and having a family with a kid makes it difficult to focus more on this.  
     
   I’m around mid N4 level, with the goal of passing the N3 in winter of 2027, but with the current pacing I doubt I’ll manage to pass the exam.

2. **发言者 2**（回复第 1 条）：As a rule of thumb past the absolute beginner stage \(roughly N5\+N4 grammar\+1.5k vocab\) I would say max 25% SRS. Just gotta pace yourself so the SRS doesn’t eat up all your time.  
     
   More immersion = easier SRS.  
     
   It does unfortunately mean you may need to find a way to allocate more time if the pace isn’t satisfying. If you commute, try podcasts to get extra training in.

3. **发言者 3**（引用未收录发言）：my router at home has an easy to use dns blocklist feature, so I have all social media sites blocked at home: 某社区, 某社区, 某社区, 某社区, twitch.  
     
   i can’t access social media even if I wanted to. best decision i’ve ever made in my life

4. **发言者 4**（回复第 3 条）：I admire your determination. Sadly, family change management would make it impossible for me

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Easy as \(lemon meringue\) pie\!  
     
   I devised a new recipe for lemon pie that cuts the calories, the sugar, and the baking time. It uses phyllo dough for the crust.  
     
   Here’s the recipe:  
     
   1/2 cup sugar  
     
   4 eggs  
     
   1 tsp baking powder  
     
   3 Tbsp fresh lemon juice  
     
   1 tsp lemon powder or lemon zest  
     
   Mix together until light and frothy. I used an electric hand mixer on about a medium setting.  
     
   Line the pie pan with buttered phyllo dough.  
     
   Pour in filling.  
     
   Cook in microwave at half power for 6-7 minutes to set the eggs. Monitor carefully. \(This step is optional but it cuts the baking time in half. My Wonder Oven doesn’t do well with these kinds of pies or cakes so this step solves a problem for me.\)  
     
   Finish baking in the oven at 350 degrees for about 15-20 minutes.  
     
   Top with meringue, whipped cream, or other topping of your choice.  
     
   \[图片省略\]image1920×1440 460 KB  
     
   Process photos:  
     
   \[图片省略\]image1920×1440 493 KB  
     
   \[图片省略\]image1920×1440 429 KB  
     
   \[图片省略\]image1920×1440 426 KB  
     
   After microwaving:  
     
   \[图片省略\]image1920×1440 480 KB  
     
   Out of the oven:  
     
   \[图片省略\]image1920×1440 583 KB  
     
   Meringue:  
     
   \[图片省略\]image1920×1440 410 KB  
     
   \[图片省略\]image1920×1440 420 KB  
     
   \[图片省略\]image1920×1440 412 KB

2. **发言者 2**（回复第 1 条）：Great way to rework a recipe.  A phyllo crust sounds yummy\!

3. **发言者 1**（回复第 2 条）：I have gotten very lazy about pie crust since I discovered phyllo dough :grinning\_face\_with\_smiling\_eyes:

4. **发言者 3**（回复第 1 条）：Oh dear, I will have to be making this. The lad &amp; I adore a tart lemon dessert.  
     
   What’s your meringue recipe, darling? It looks gorgeous.

5. **发言者 1**（回复第 4 条）：The meringue recipe is from an old edition of The Joy of Cooking. I am not at home now but I will post it when I get back.

6. **发言者 3**（回复第 5 条）：I have a copy\! Thank you, I’ll plan to make this for the holidays with maybe a test run or two before.

7. **发言者 4**（回复第 1 条）：wow, you must have read my mind\!  last week I had a slice of lemon meringue pie from a local bakery \(their breads &amp; muffins are great, but this left much to be desired\) – I think they used a gelatin-type premade filling and it was pretty awful.  
     
   So since then I have been missing the delicious pie my mom used to make, and here you are, posting my dream pie\!  
     
   I will def have to try it.  
     
   Thanks\!

8. **发言者 5**（回复第 1 条）：This looks scrumptious and I’m dying to give it a try.

9. **发言者 6**（回复第 1 条）：phyllo dough crust is brilliant\! I love the zing of a lemon

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Nobody Likes You Pen v.2  
     
   \[图片省略\]01-Pen - Briar Loop - revision 021000×563 93.5 KB  
     
   \[图片省略\]02-Pen - Briar Loop - 02 Graphite and cedar1000×563 77.7 KB  
     
   \[图片省略\]03-Pen - Briar Loop - 03 Worn eraser1000×563 101 KB  
     
   \[图片省略\]04-Pen - Briar Loop - 04 Thorn junction2000×1125 4.82 MB  
     
   \[图片省略\]05-Pen - Briar Loop - 05 Over the knot1000×563 172 KB  
     
   \[图片省略\]06-Pen - revision 02 - clay2000×1125 1.86 MB  
     
   I decided to give this render another shot because I really liked the concept but I wasn’t quite happy with the old version. I think it turned out quite good. It’s good to know that you’re making progress over the years.

2. **发言者 2**（回复第 1 条）：nice work \!

3. **发言者 1**（回复第 1 条）：\(post deleted by author\)

4. **发言者 1**（回复第 2 条）：Thank you\! :slight\_smile:

5. **发言者 3**（回复第 1 条）：Great work\!  
     
   Have you considered adding a bump node to the wooden part at the tip? it looks quite flat. i think it would also improve the quality by a margin if you added some noise to that edge blend at the tip

6. **发言者 4**（回复第 1 条）：That’s clever.

### 讨论 19

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Restaurant, Biergarten nur im Sommer  
     
   Wie kann man diesen Hinweis Note: 5645516 \| OpenStreetMap sinnvoll erledigen?  
     
   Im Sommer gibt es einen Biergarten. Im Winter nur drinnen.  
     
   Wäre da outdoor\_seating=seasonal eine gute Idee, auch wenn es nicht im Wiki steht \(in taginfo schon\)?

2. **发言者 2**（回复第 1 条）：coditional?

3. **发言者 3**（回复第 2 条）：Die Auswertung eines conditional ist bei Programmen nicht immer gegeben. Für den diesen Fall reicht ggf. auch outdoor\_seating=seasonal \+ seasonal=summer

4. **发言者 2**（回复第 3 条）：Nach Blick auf die Wikiseite scheint mir das auch sinnvoller. Dann nicht aber outdoor\_seating:seasonal=summer? Es gilt ja nicht fürs ganze Restaurant.

5. **发言者 4**（回复第 1 条）：Andere Möglichkeit:  
     
   Outdoor seating mit operator und eigenen opening\_hours als eigene fläche erfassen. Dann reicht am restaurant ein outdoorseating=yes oder =seasonal und der Rest kann ans outdoorseating

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 咳嗽都是如何用最快速度好起來？  
     
   咳嗽咳了差不多一週了  
   目前還沒有好轉的跡象  
   狂喝熱水、喝維他命發泡錠、多睡一點  
   只會短暫感到舒適  
     
   每次感冒都覺得咳嗽是最難治的  
   大家都是如何治咳嗽的？

2. **发言者 2**（回复第 1 条）：化痰

3. **发言者 3**（回复第 1 条）：進入 asthma

4. **发言者 4**（回复第 1 条）：和正妹舌吻

5. **发言者 5**（回复第 1 条）：就去診所找醫生拿藥  咳嗽真的不要

6. **发言者 5**（回复第 1 条）：等  血淚屎跟你分享

7. **发言者 6**（回复第 1 条）：咳嗽本來就是最難好的 只能抗生素

8. **发言者 6**（回复第 1 条）：治療

9. **发言者 7**（回复第 1 条）：個頭咧 抗生素不是這樣用的

10. **发言者 8**（回复第 1 条）：看醫生

11. **发言者 9**（回复第 1 条）：ipad溫開水，15分鐘咳嗽out

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Free: 6 fire, magic and explosion sprite sheets for Godot 4 AnimatedSprite2D \(Ember Flipbooks Lite\)  
     
   Ember Flipbooks Lite is free: 6 transparent PNG sprite sheets of fire, magic and explosion VFX with the grid, frames and fps listed for each sheet.  
     
   Free Lite: \[链接隐去\]  
     
   Full pack \(22 sheets\): \[链接隐去\]  
     
   Tested: Godot 4.3, 4.4, 4.5, 4.7 \(AnimatedSprite2D\). Any other engine: plain transparent PNG sheets, slice by the grid in effects.json.  
     
   Made with AI assistance \(code and effect design\) under human direction. Generative AI: yes.

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Hilfe beim Kauf von smarten Heizungsthermostaten  
     
   Moin zusammen, ich möchte den Black Friday mitnehmen und unsere Wohnung mit digitalen/smarten Heizungsthermostaten austatten.  
     
   Ich hab da jetzt nur ein paar Fragen. Wir haben keine zwei Geschosse, was mal zwei Wohnungen waren, jede Etage hat ihre eigene Gastherme. Brauche ich dann zwei Basis Stationen? Quasi für jede Therme eine?\!  
     
   Und wir haben so ein analoges Raumthermostat, was per Funk mit der Therme kommuniziert. Wie genau sagen wir denn der Therme, dass sie in Zukunft dann nicht mehr mit dem alten Raumthermostat kommunizieren soll, sondern mit der neuen Basis Station? Das verstehe ich noch nicht so richtig :smiley: Ich hoffe sehr auf euere Hilfe :smiley:

2. **发言者 2**（回复第 1 条）：Geht es nur um Thermostaten die an die Heizkörper geschraubt werden oder Raumthermostaten und die Ventile sitzen wo anders?

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Calculate radio link placement and node amount for your city's mesh network  
     
   FSPL \+ Delta-Bullington based local-first WASM radio mesh network calculator with the end goal of making calls over mesh networks possible \*\*without\*\* pissing off anybody in the process \(yes, I'm talking about you, Meshtastic maintainers\).  
     
   Feel free to tell me how this idea \*does\* or doesn't make sense and I'll continue vibing away in the meantime. Peace\!  
     
   \[source code\]\(\[链接隐去\]

2. **发言者 1**（回复第 1 条）：check out Belgrade\!  
     
   \[链接隐去\]

3. **发言者 2**（回复第 1 条）：This is relevant to me, I've been deploying repeaters around rural Tasmania. Satellite view would be good so I could quickly get an idea of where I'm looking. Buildings, roads, etc. are often quite far away from proposed nodes, so having something visual is important.

4. **发言者 1**（回复第 3 条）：\[this satelite imagery layer\]\(\[链接隐去\] is CC licensed. do you think it will be enough? seems way worse than google maps

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Scheduling a Simulated Vertical Farm  
     
   A 3D simulation of a vertical lettuce farm I built at a hackathon. It runs entirely in the browser. Two copies of the same farm run side by side one on fixed schedules, one with a scheduler that times harvests from scan data and plans the lights around real electricity prices. In the simulation, the scheduled farm uses about 20% less electricity per kg of sellable lettuce.source: \[链接隐去\]

### 讨论 25

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Gentoo ebuild for Rapid Photo Downloader \(Qt6 branch\)  
     
   Hello everyone,  
     
   I use Rapid Photo Downloader on Gentoo and have put together a Gentoo overlay with an ebuild for the upstream Qt6 branch, along with ebuilds for several dependencies that were not available in my repositories.  
     
   I created this primarily for my personal use. I am not a developer or a regular package maintainer, so I expect to update it only when I need to make changes for my own system. Other Gentoo users are welcome to try it and contribute fixes or improvements when possible.  
     
   The overlay is here:  
     
       
         \[图片省略\]  
     
         \[链接隐去\]  
       
     
       
       \[图片省略\]  
     
   gentoo-rapid-photo-downloader  
     
     Gentoo Ebuids for Rapid Photo Downloader.  
     
       
     
       
         
         
       
     
       
     
   It have also some other packages that RPD need and are not in gentoo.  
     
   It is based on the upstream Qt6 branch and is not an official Gentoo or Rapid Photo Downloader package. Feedback from other Gentoo users is welcome, but I cannot promise ongoing support.  
     
   Best,  
     
   发言者 1

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：最近做了个找人小游戏，叫《找找他在哪》。  
     
   玩法很简单：在一座热闹的 3D 小镇里，找到那个戴红白条纹帽、戴圆眼镜、背绿色书包，手里拿着放大镜的人。  
     
   听起来特征已经很明显了，但放进人群里，还真容易看漏。我自己测试时也经常拖来拖去，找着找着就忘了刚才看过哪一块。  
     
   地图里的建筑、人物和动画都是用代码生成的，使用 Three.js 渲染，没有使用现成的地图模型。目前是一座包含集市、咖啡街、花园、海港等区域的小镇，人物数量大约一万名。手机上每次只能看到其中一小块，需要拖动地图寻找，也支持双指缩放。  
     
   考虑到第一次打开大地图可能无从下手，最近加了一个可选示例：先在 24 × 24 米的小范围里熟悉操作，找到目标后，再进入正式大地图。也可以直接跳过示例。  
    \[图片省略\]   
     
   体验地址\(某社区搜找找他在哪\)：\[链接隐去\]  
    \[图片省略\]   
     
   想请大家帮忙看看几个问题：  
     
   目标人物的辨识度够不够？难度是有挑战，还是单纯容易眼花？  
   手机上的拖动、缩放操作是否顺手？  
   大地图有没有值得停下来看的细节，还是只顾着找人？  
   如果后面增加新场景，你更想玩什么主题？  
   如果遇到打不开、白屏或者卡顿，也麻烦带一下手机型号、系统版本和打开方式，方便我排查。  
     
   欢迎体验和提意见。也欢迎做过 Three.js 移动端或小游戏适配的朋友交流。

### 讨论 27

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：And relax  
     
   I’ve had a rather busy few weeks.  
     
   A couple of months ago I made the decision to retire. Luckily enough at the age of 60.  
     
   I finally left my workplace a week ago and I’ve finally had chance to have a couple of decent sessions listening to my system…  
     
   And I’m thrilled with just how good it sounds. Maybe I’d forgotten how good it sounds \(it’s been ages since I’ve had a few spare hours to listen\) or perhaps I’ve finally managed to sit down, completely relax and listen with no distractions, thoughts of the next day at work or thinking I’d better get to bed.  
     
   I’ll have a little less income but I’ll manage. Since losing my wife 5 years ago I’m not bothered about holidays, meals out etc. I don’t run a fancy car and clothes, watches and the latest massive TV hold no appeal.  
     
   I’m just looking forward to some quality music with a nice glass of red and answering to no-one.

2. **发言者 2**（回复第 1 条）：Enjoy your time relaxing a little. Early retirement and a simple life is well earned.

3. **发言者 3**（回复第 1 条）：Enjoy your retirement Basil.  Being able to spend more time listening to your excellent system is one bonus of retirement but I suspect other activities will come along too and you’ll soon be wondering how you ever found the time to go to work.  Best wishes  
     
   Roger

4. **发言者 4**（回复第 1 条）：Congratulations to you Basil\!  I am contemplating the same

5. **发言者 5**（回复第 1 条）：Congratulations. I can’t wait to retire, but I still have some 5 years to go…

6. **发言者 6**（回复第 1 条）：Congratulations on your retirement. I was fortunate enough to be able to retire early three years ago and it has been a great experience so far. While retirement opens up opportunities to do things I had always wanted to do, I actually think the best part is now having a choice about what not do.

7. **发言者 7**（回复第 1 条）：Very pleased for you.  
     
   I took early retirement and my Naim system, some nice red wine and maybe the cricket on the box in the depths of winter are nice things to have  
     
   Best wishes  
     
   Ian

8. **发言者 8**（回复第 1 条）：Wishing you a happy retirement and many hours of musical enjoyment.

9. **发言者 9**（回复第 1 条）：Yes well done and enjoy, I’m going to reduced hrs in 18 months for a year or so then kick back

10. **发言者 10**（回复第 1 条）：Cheers

11. **发言者 11**（回复第 1 条）：Hope you have a long and happy retirement.

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[链接隐去\] à sauvegarder  
     
   Bonjour,  
     
   j'ai une adresse e mail sur \[链接隐去\] avec un bridge  
     
   comment faire pour sauvegarder sur un PC les paramétres du compte et tous les e mails ?  
     
   Cordialement

2. **发言者 1**（回复第 1 条）：bonjour,  
     
   j'avais trouvé le système importexportstooolNG  
     
   est-ce qu'il existe un autre moyen pour une sauvegarde ?

### 讨论 29

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Need help finding model for mysterious 3.2 inch touchscreen display  
     
   I've picked up a 3.2 inch touchscreen module from a friend \(they got it in a bulk lot with no identification\) wanting to build a photo frame type project, but found myself stuck as what driver chip it could be using, I'm posting hoping someone could point me to a driver name or arduino library. pictures below  
     
   \[图片省略\]TFT\_back1920×1201 966 KB  
     
   \[图片省略\]TFT\_front1790×2724 1.43 MB

2. **发言者 1**（引用未收录发言）：ah thanks\! never thought to do that but that looks to be the one, I'll test it out and put a result here in a bit.

3. **发言者 1**（回复第 2 条）：got it working now, thanks\! just used the UTFT 320x240 demo with the line UTFT myGLCD\(SSD1289\_8,A1,A2,A0,A3\); pasted in where the default one was and it works\!

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：人多一，想自己烫牛肉吃该怎么买肉啊\( ・\_ゝ・\)  
     
   好想在家里自己烫香香肥牛但买了几种冻牛肉卷都像在咀嚼科技与狠活

2. **发言者 2**：\( ﾟ∀。\)7社交点数足够且坐标位于南方的话直接去牛肉店买？知道的可以说要什么部位，但有些热门的比如吊龙啊晚了就没，不知道可以说要拿来怎么吃的店家一般会给你拿

3. **发言者 3**：线下找菜市场吧\( ﾟ∀。\)7"

4. **发言者 4**：你是说潮汕火锅那种吗？那就只能早起去线下蹲

5. **发言者 5**：菜市场欢迎你  
     
   如果是南方的话，可以让老板帮你把牛肉细细切做臊子\(\`ヮ´ \)就说想拿回家烫火锅吃  
     
   或者搜你家附近的《潮汕牛肉汤粉》店，问老板有没有切好的肉可以卖的  
     
   如果是想吃肥牛卷的话…我不知道\( ﾟωﾟ\)  
     
   我觉得肥牛卷大都是科技，只要不是吃起来恶心的就行

6. **发言者 6**：永辉/盒马？这两家有切好摆盘的牛肉卖 \( ﾟ∀。\)7

7. **发言者 7**：菜市场或超市\(｀･ω･\)好像肉联厂也可以，但是分量可能很大建议拼单，给多点预算买新鲜牛肉不要买冻牛肉，口味更好\(　ﾟ 3ﾟ\)

8. **发言者 8**：搜了下，美团的小象超市也有鲜切肉\(　ﾟ 3ﾟ\)

9. **发言者 9**：搜原切\( ﾟ∀。\)  
     
   调理肉和原切肉的编号好像是不一样的  
     
   \( ﾟ∀。\)

10. **发言者 10**：在南方\+对肉的部位有基础认知的话就建议去当地菜市场，我在浙江，甚至官方会突击检查给各大菜市场评分\( ﾟ∀。\)总体很少有宰客鬼秤货不对板，老板还帮切。  
     
   没啥认知就盒马叮咚小象，晚上七点多打折划算的。

11. **发言者 11**：不会砍价和识货的话去大型超市

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Work in pattern as established confusing  
     
   I am knitting a cardigan from a free pattern off Ravelry. It is called Lethe. I have gotten to where I am to Establish Front Bands and Side detail. The previous instructions have me finishing the edge band on WS row 3. Now the instructions say “work 20 sts in pattern as established”. My confusion is what row of pattern to start at. I just finshed WS row 3 which is same as row 1. Do I start on RS row 4 of established pattern or repeat row 1? And further to that - the established pattern is 10 sts so I am a bit confused when it says work 9 sts in pattern as established. Any help would be most appreciated.  
     
   \[图片省略\]IMG\_35071920×2081 900 KB

2. **发言者 1**（回复第 1 条）：Up to this point it is beautiful  
     
   \[图片省略\]IMG\_35051920×1440 571 KB

3. **发言者 2**（回复第 2 条）：\[图片省略\] 发言者 1:  
     
   Lethe  
     
   \[链接隐去\]  
     
   Nice pattern.

### 讨论 32

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Procedural Destruction in Blender - A First Look at Project Damage  
     
   \[图片省略\]bartists2000×1000 827 KB  
     
   Hi everyone\! For the past three months, a colleague and I have been building Project Damage, a procedural destruction add-on for Blender. We’re planning to release it on Superhive on November 24, and I wanted to share a couple of renders I made with it.  
     
   All the damage in these shots was generated procedurally. On the statue, I layered cracks and chipped edges, opened up the chest to expose the rebar, and added ivy. For the concrete pipe, I used the same tools to break away part of the rim and reveal the curved reinforcement inside \(they are generated procedurally too\).  
     
   \[图片省略\]compare\_after2000×1000 3.58 MB  
     
   Before  
     
   \[图片省略\]compare\_before2000×1000 3.21 MB  
     
   \[图片省略\]peelin2000×1000 2.96 MB  
     
   \[图片省略\]fractures2000×1000 786 KB  
     
   \[图片省略\]bool2000×1000 626 KB  
     
   \[图片省略\]wallpaper2000×1000 2.46 MB  
     
   \[图片省略\]metaltears2000×1000 304 KB  
     
   \[图片省略\]concrete2000×1000 776 KB  
     
   \[图片省略\]9 READY2000×1000 894 KB  
     
   \[图片省略\]image1538×925 1.18 MB  
     
   \[图片省略\]image1528×925 1.31 MB  
     
   \[图片省略\]image1532×1588 3.52 MB

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：I forgot how to do something i could do  
     
   Godot Version  
   Question  
   I made the code below where if the npc touches the collision of the area2d its speed would go to 0. It’s not working and i am stupid.  
     
   func \_on\_body\_entered\(body: Node2D\) -&gt; void:  
   	if body.is\_in\_group\("ene,,"\):  
   		body.speed = 0

2. **发言者 2**（回复第 1 条）：I’m guessing you made a typo in your group name, you typed “ene,” instead of “enemy”

3. **发言者 1**（回复第 2 条）：thats the group name

4. **发言者 2**（回复第 3 条）：Then make sure the signal is actually connected up.

5. **发言者 1**（回复第 4 条）：\[图片省略\] 发言者 1:  
     
   if body.is\_in\_group\("ene,,"\):  
   		body.speed = 0  
     
   i just connected and its still not working.

6. **发言者 2**（回复第 5 条）：Can you confirm the function gets called? Put a print statement before the if clause and see if it gets printed.

7. **发言者 1**（引用未收录发言）：just checked and and the connection it made but its still not working.

8. **发言者 3**（回复第 7 条）：maybe the thing you collide with isn’t in group, make sure that your body2D have group ene and not some sprite or collision shape

9. **发言者 1**（回复第 8 条）：he is connected to the group

10. **发言者 1**（引用未收录发言）：\[图片省略\] 发言者 3:  
     
   func \_on\_body\_entered\(body: Node2D\) -&gt; void:  
   	print\("Before", body\)  
   	if body.is\_in\_group\("ene,,"\):  
                   print\("After", body\)  
   		body.speed = 0  
     
   its now giving error “Invalid assignment of property or key ‘speed’ with value of type ‘int’ on a base object of type ‘CharacterBody2D \(character\_body\_2d.gd\)’.”

11. **发言者 4**（回复第 10 条）：Your character body script does not have a variable named speed declared in it.

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：scriptura: a cozy corner for your scripts

2. **发言者 2**（回复第 1 条）：hey super cool\! i mostly switched to the flag style so i could up-arrow edit more easily when a command didn’t work. gave up the nice elegance of the commands themselves just being regularscripts though. -sd person

3. **发言者 3**（回复第 1 条）：I've always liked how \(iirc\) in plan9's rc shell you can just refer to scripts by directory. So you really could just setup your /bin like the scripts directory and type:  
     
       ; bin/os/update/linde   
     
   I think that's how that works, it's been a while since I've used \[\`rc\`\]\(\[链接隐去\]

4. **发言者 4**（回复第 3 条）：That kinda sounds like the same ~/bin/... problem this and sd are tryna avoid.

5. **发言者 5**（回复第 4 条）：Not quite. The unique thing about \`rc\` is that it resolves \*directories\* in your \`$path\` as well.  
     
   This means that you can have \`/bin/os/update/linde\` and call it by typing \`os/update/linde\` rather than the full path, since it is able to resolve \`os/\` to \`/bin/os/\`.

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Prompt Studio – Free, client-side structured prompt generator for LLMs

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：a late bloomer...  
     
   naturally lit  
     
   \[图片省略\]26-11-22\_\_MG\_2323910×910 106 KB  
     
   flashed  
     
   \[图片省略\]26-11-22\_\_MG\_23371115×892 119 KB  
     
   not fond of either but you gotta try  
     
   also gotta recalibrate my monitors, they look vastly different

### 讨论 37

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：我一直在持续学习英语，没找到最好的适合听说的网站，要搜索高质量内容不能用母语搜索，所以我独创了很多策略。比 yoglish 强，支持母语搜索，独白自言自语，有长章节教学模式等等，以及词典，很多细节，甚至不只是学习英文，还能搜索到一些好玩的知识，也加入了收藏学习勋章之类的，手机端在规划了。  
     
   \[链接隐去\]  
     
   海量数据，持续更新，持续优化  
     
   目前做了多国国际化，中文花的资源最多 最近把核心功能都串起来了，来 V 站做一波公测，给有需要的 网友每人送 1 个月 Pro 会员。  
     
   大家留下邮箱吧～ google 登录就留 google 邮箱就行，定时处理会收到一封激活信。  
     
   放个 某社区 供大家讨论～\[链接隐去\]  
     
   功能实在太多了，AI 预充好了，大家自己探索吧，持续优化，希望大家多给意见～

2. **发言者 1**：真实够背的，刚升级清完 ClaudeFlare 缓存，就撞上一大批爬虫， 现在每天 1M 请求全是各种 AI 的爬虫 😂

### 讨论 38

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：2nd Hi-cap for NAC82 - age matching  
     
   Hello all, I’m toying with the idea of buying a 2nd Hi-cap for my NAC82. I’ve read the advice on here about the importance of matching the ages of the Hi-caps. Obviously I am unlikely to be able to do this exactly. I’ve found a couple which are within a year of mine \(1997\). Is this close enough? Any advice would be much appreciated.

2. **发言者 2**（回复第 1 条）：I’m sure a year would be fine. For what it’s worth I added a second Hicap when I had an 82. It made virtually no difference and was a complete waste of money. I later swapped to a Supercap. Now that was a worthwhile upgrade.

3. **发言者 3**（回复第 1 条）：The second Hicap is a significant upgrade over a single Hicap. The Supercap was for sure an upgrade over the two HC but not on the same scale as one to two Hicaps.  
     
   You may like to consider trading in the HC for an Olive\(\!\) SC

4. **发言者 4**（回复第 1 条）：Within a year is totally fine.

5. **发言者 5**（回复第 1 条）：The 82 DC rails are split to handling front and back \(input half and output half\) so the mismatch of HiCaps is less critical. A 282 would be a different story entirely as the rails are assigned left channel and right channel which would make a mismatch more obvious.

6. **发言者 6**（回复第 4 条）：…unless it’s around '92 or '93 after Holden &amp; Fisher went under.  During this time, Naim transitioned to using Nuvotem, but, once their H&amp;F stocks were exhausted, briefly used St. Ives for the HICAP transformers to cover the gap before Nuvotem could get production and supply going.  
     
   It’s usually best to ensure that the HICAP pair have similar Transformers.

7. **发言者 7**（回复第 1 条）：Yes, but best if both serviced.

8. **发言者 3**（回复第 1 条）：“Yes\! We’re all individuals\!”  
     
   “I’m not….”  
     
   :laughing:

9. **发言者 7**（引用未收录发言）：Maybe HH forgot to plug it in?  
     
   …cloak and helmet on, exiting via BiFrost…

10. **发言者 1**（回复第 1 条）：Many thanks, all -  this is very helpful. Will be giving it some serious thought, especially as opinion on the benefits is clearly divided.

11. **发言者 8**（回复第 1 条）：I’d look for an Olive SuperCap, get it serviced then move on the olive HiCap. Also, you will require two SNAIC cables for the SC to 82.

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：阿根廷一男子因为在售卖的汉堡里掺虫子渣被捕。  
     
   什么?我为什么不把这条新闻发苏宝儿?因为我其实不是想发这条新闻，我只想发这张图。  
     
   比警察拳头都大的茹云，甚至都过不了审\( ﾟ∀。\)

2. **发言者 2**：你的汉堡没有他的乳晕大\( \`д´\)

3. **发言者 3**：\( ﾟ∀ﾟ\)……男子？  
     
   而且明摆着这种体型为什么要以这种形式押送……？

4. **发言者 4**：\( ﾟ∀。\)我去

5. **发言者 5**：\( ﾟ∀。\)\( ﾟ∀。\)啊不是这也

6. **发言者 6**：当你想听信那些玩屁眼的骗子开发乳头时就想象自己开发完成后也处于串首的境遇之中.jpg

7. **发言者 7**：我其实想知道这哥们卖的汉堡到底有没有他自己的乳晕大\( ﾟ∀。\)

8. **发言者 8**（回复第 3 条）：\[引用第 3 条\]  
     
   假如警方需要保密应该是直接套头套的，这估计是他自己避嫌的小巧思\( ﾟ∀。\)

9. **发言者 9**：I'm loading  
     
   　  ҉   
     
   \( ﾟ∀。\)

10. **发言者 10**：鬼图别放串首啊

11. **发言者 11**：\( ﾟ∀。\)下次可以别放串首嘛

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Knitted sections placed on holders  
     
   I am knitting the Leaves Cardigan by Florence Merlin, getting ready to start the yoke part of the pattern and need to pick up stitches from holders for left front, first sleeve, back, second sleeve and right front. Just wondering if anyone has a great way to avoid holes between all these picked up stitches. Thank you\!\!\!  
     
   Additionally if anyone has made this little cardigan and has any tips on the yoke portion, I would love to hear them. I’ve been reading all the notes on Ravelry and see I’m not only one in my confusion with this pattern. Thank you\!  
     
   Charlene

2. **发言者 2**（引用未收录发言）：I’m such a loose knitter. It looks like I knit the entire cardigan on a 2.25mm \(US1\) needle.  
     
   Don’t hesitate to come back and ask away\!

3. **发言者 1**（回复第 2 条）：Yikes\! Those are small needles\! Thanks for your help\!\!\!

4. **发言者 3**（引用未收录发言）：I use this method from Patty Lyons. It works really well\!  
     
       
         \[图片省略\]  
     
         \[链接隐去\]  
       
     
       
         
     
   Ask Patty: Seamless Sweater, No Holes – Modern Daily Knitting

5. **发言者 1**（回复第 4 条）：Thank you so much\!  
     
   Charlene

### 讨论 41

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Holiday Aprons for a Santa Parade  
     
   I just finished these and am so chuffed with how they turned out, I had to share\!  
     
   The company I work for has a float in the local Santa Claus Parade. We have a candy Christmas theme that we add to each year. This year we decided everyone needed to look a little more cohesive, so I suggested aprons.  
     
   We grabbed some cheap aprons on Amazon, and I designed the wordmarks and cut them on glitter vinyl on my Silhouette. Hot off the presses:  
     
   \[图片省略\]108211920×2550 1010 KB  
     
   \[图片省略\]108241920×2550 896 KB  
     
   Obligatory model shots:  
     
   \[图片省略\]108151920×2560 1000 KB  
     
   \[图片省略\]108181920×2560 971 KB  
     
   I cut five more of each and we’ll be pressing those tomorrow at our prep night.  
     
   …And I just realized I probably won’t get to wear one in the parade since I will be wearing an inflatable gingerbread man costume\! :joy:

2. **发言者 2**（回复第 1 条）：OMGosh these are so FREAKING cute\!\!\!

3. **发言者 3**（回复第 1 条）：This is great for creating cohesiveness. Adorable\!

4. **发言者 4**（回复第 1 条）：Nice job\! I was a bit sad when you first said you weren’t going to be wearing one…but then, inflatable gingerbread  costume…

5. **发言者 5**（回复第 1 条）：These are so festive and cheery\! YEY\! Are they all the same color combinations?

6. **发言者 6**（回复第 1 条）：these are darling\! I especially love the sparkly one\!

7. **发言者 7**（回复第 1 条）：So cute\! Though it’s hard to beat an inflatable gingerbread man costume…  
     
   I hope your team has the best time at the parade\!

8. **发言者 8**（回复第 1 条）：Your aprons look amazing\!

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：60 seamless surface imperfection maps \(4K, 16-bit\) \+ Blender materials - 10 free  
     
   I generated a set of tileable imperfection maps with code \(FFT noise, wrapped scratches, Voronoi cracks\): scratches, smudges, brushed metal, stains, dust, pores, cracks and weave.  
     
   4K, 16-bit TIFF for roughness / bump, plus OpenGL normal maps  
     
   a .blend with ready materials marked as assets \(drag onto any object\)  
     
   seamless, so they tile on large surfaces  
     
   10 maps are free here: \[链接隐去\]  
     
   \[图片省略\]surfaces01-free-square-preview1200×1200 132 KB  
     
   \[图片省略\]render\_wide1920×1080 2.14 MB  
     
   The full set has 60 maps. Not scanned and not AI: everything is procedural.  
     
   Which kinds would you want more of? I’m planning volume 2 \(fingerprints, water drops, hammered metal, leather, rust are done\) and feedback decides the order.

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Datensatz: Wien Grünpfeile für Radfahrer?  
     
   Ich habe einen Datensatz bezüglich der Fahrrad-Grünpfeile in Wien gefunden: \[链接隐去\]  
     
   Gibt es schon tags dafür? - Und falls ja: Ist eine Anfrage bezüglich der Datennutzung sinnvoll, oder fällt das auch unter die Stadt Wien OGD, die wir verwenden?  
     
   Was meint ihr? :slight\_smile:

2. **发言者 2**（回复第 1 条）：Schau dich Mal im Wiki um, ist in meiner Erinnerung nicht ganz trivial gewesen. Red turn - OpenStreetMap Wiki  
     
   Unten ist auch Abschnitt für Austria.  
     
   Klick dich auch Mal noch hier durch:  
     
       
     
         \[链接隐去\]  
       
     
       
         
     
   No turn on red - OpenStreetMap Wiki

3. **发言者 3**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   Gibt es schon tags dafür?  
     
   In Deutschland, wo der Grünpfeil für Radfahrende vor sechs Jahren eingeführt wurde, wird red\_turn:right:bicycle=yes verwendet \(ohne :bicycle für alle Fahrzeuge\).

4. **发言者 4**（回复第 1 条）：Ich habe recht viele davon eingetragen mit Tag:restriction:bicycle=stop - OpenStreetMap Wiki  
     
   Ist leider sehr aufwändig, weil man oft die halbe Kreuzung neu mappen muss, um das sauber eintragen zu können.

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：I released my game "CyberWheel" on the Google Play Store for Android  
     
   Hey everyone\!  
     
   I’d like to share my game which I have finally finished \(at least the core gameplay and mechanics\) and released on the Google Play Store\!  
     
   I’d really appreciate it if you could check it out and let me know what you think. I’m especially interested in feedback on the overall visual style, music, gameplay, and anything you think could be improved.  
     
   I’m planning to keep developing the game and adding more content, so any suggestions  would be really helpful\!  
     
   Also, I’d like to note that all the artwork, music, and animations were created by artists No AI generated content was used in the game.  
     
   Google Play link:  
     
       
     
         \[链接隐去\]  
       
     
       
       CyberWheel  
     
   \[图片省略\]  
     
   One tiny car. One big heist. Draw your path, sneak, hack, and retrieve data...  
     
   Free  
     
       
     
       
         
         
       
     
       
     
   Thanks for checking it out\!  
     
   My DevLog on YT: \[链接隐去\]  
     
   \[图片省略\]52361×1337 256 KB  
     
   \[图片省略\]41920×1080 180 KB  
     
   \[图片省略\]12048×1152 454 KB  
     
   \[图片省略\]22048×1152 242 KB  
     
   \[图片省略\]31920×1080 475 KB

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Vikunja task disappeared after update  
     
   What app is this about, and its version: Vikunja 2.8.0~ynh1  
     
   What YunoHost version are you running: YunoHost 12.1.43  
     
   What type of hardware are you using: Virtual machine  
     
   Describe your issue  
   After an update \(not sure which one\) all my tasks disappeared.  
     
   I check the database with PGAdmin 4.  
     
   Tasks are still there but assigned to user n°1, who use local authentication.  
     
   I suppose I’m login with user n°2, who use LDAP.  
     
   Both users have the same name.  
     
   Someone used a workaround to solve this issue by changing the config.yml file to disabled LDAP.  
     
   I tried by that didn’t help me.  
     
   What do you think I can try ?  
     
   Disabling LDAP \+ removing user N°2. Restart the service and login again ?  
     
   Edit all table about task and change value of user assignation ?  
     
   6ril

2. **发言者 2**（回复第 1 条）：Hm, but what is the cause?  
     
   Maybe this linking can also help with LDAP? Settings  
     
   It does mention LDAP: \[链接隐去\]

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How 2 Security Research \(MLG\)

2. **发言者 2**（回复第 1 条）：related: \[链接隐去\]  
     
   \(not actually ai-generated, sorry to ruin the joke\)

3. **发言者 3**（回复第 1 条）：oh hi ^^

4. **发言者 4**（回复第 1 条）：peak

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How do you navigate the new forums?  
     
   I use the web version of 某社区 on my phone to do reviews, learn new items, and interact with the forums. Since the forums updated yesterday, I’ve struggled to get to the last reply in a thread.  
     
   This is especially true for the Gourmet Race. I can scroll through the replies, but there are well over a thousand now, and I don’t see the option to quick-scroll to the bottom. I tried with the mobile site and the desktop site.  
     
   I also had tracking on, so I could click to the last reply that I read. The tracking option is still how I left it, but the button seems to have disappeared.  
     
   Is there a feature that I’m not seeing? How do I navigate the new forums interface?

2. **发言者 2**（引用未收录发言）：It’s very… 某社区… and I really don’t like 某社区

3. **发言者 3**（回复第 1 条）：I thought I was going crazy because I just couldn’t figure it out :sweat\_smile:

4. **发言者 1**（引用未收录发言）：Hi 发言者 6, I’ve just tried again, and I’m still not able to get to the bottom of the page for the Gourmet Race. The best I can readily do is get to September 7. If I scroll to the bottom from there, I can get maybe a week at a time.  
     
   The “Can we still walk together” thread is equally difficult to navigate.

5. **发言者 4**（回复第 1 条）：Seconding 发言者 1; the new layout is effectively unusable on my web version. Also seconding 发言者 2, this new layout wastes a lot of space and I don’t like the nested replies.

6. **发言者 4**（回复第 5 条）：Additionally, when I posted this reply, it didn’t immediately load into the page and instead I had to hard refresh the page to validate my own reply had gone through.

7. **发言者 5**（回复第 1 条）：I’ll be waiting for the last touch up on the forums but really not a big fan of the nested replies either…  
     
   It makes some answer get lost under the little \+ signs and it’s more difficult to follow the whole thread chronologically.  
     
   As stated by  发言者 2 above, it’s suppose to be a forum not 某社区.  
     
   Also, give me back the read the level color\!  
     
   Brunpro ain’t blue.

8. **发言者 6**（回复第 4 条）：Has been fixed on all theme versions. Sorry for the delay\! I needed to push through a few other fixes at the same time that I was able to pick up :person\_bowing: . Opening pages to your last read position and the sidebars should all be working now correctly. Please let me know if there are any other issues\!

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Help a desperate knitting noob enthusiast to knit a pattern  
     
   Hello dear community,  
     
   I am new here and just discovered the wonders of knitting\!  
     
   However I am already stuck on my first knitting project and I can’t figure out how to make this rather easy pattern. I just asumed I can do knit stiches for a couple of rows and then switch to purl stiches but for some reason I can’t get the pattern reversable. What I am doing wrong???  
     
   Please see the reference pics of what I would like to accomplish.  
     
   Front:  
     
   \[图片省略\]Screenshot 2026-11-16 at 12.42.18836×1248 301 KB  
     
   Back:  
     
   \[图片省略\]Screenshot 2026-11-16 at 12.42.27922×1322 372 KB  
     
   I would be so thankful for any kind of help :folded\_hands: :folded\_hands: :folded\_hands:  
     
   Kind wishes  
     
   Nicky

2. **发言者 2**（回复第 1 条）：Welcome to 某社区 and to the wonders of knitting\!  
     
   You’re project looks beautiful. What is the name of the pattern and designer?  
     
   Is it the line of dots where you change from purls to knits that you don’t like?Those are going to happen in a color change on one side or the other.

3. **发言者 1**（回复第 1 条）：The scarf is from a small little independent wool shop in Berlin. I want to remake it but I dont understand how to recreate the pattern. Like i would really need a constructive explanation how to make it. Thank you\!

4. **发言者 3**（引用未收录发言）：Oh, you might be right that it’s reverse stockinette and not garter, although it sure seems to have garter ridges.  
     
   \[图片省略\]image678×452 137 KB

<!-- samples:end -->

