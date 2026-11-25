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

<!-- intake-request:intake-dc46fab4010c47dda3b3004c2f1aa8e8 -->
<!-- samples:start -->

采集时间：2026-11-26 00:10:42（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Dev snapshot: Godot 4.8 beta 5  
     
   Not even a full week after our previous development snapshot, our team has already resolved all remaining release blockers\! :gdparty:  
     
   We encourage everyone to try their hand at our last \(probably\) development snapshot of the 4.8 release cycle: Godot 4.8 beta 5.  
     
       
         \[图片省略\]  
     
         Godot Engine  
       
     
       
       \[图片省略\]  
     
   Dev snapshot: Godot 4.8 beta 5 – Godot Engine  
     
     One last stop before release candidate

### 讨论 2

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：General measurements discussion for GraphWorks visualizer  
     
   Share and discuss your impressions of different measurements in the new GraphWorks visualizer tool, whether you’ve actually listened to the headphones or not \(which is normally taboo on most audiophile forums\).  
     
   I have not listened to most of the headphones in this tool btw. So most of my impressions will be based on the 5128 graphs, and sometimes some virtual listening. So they should be taken with a grain of salt.

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Naim app  
     
   The latest update to the Naim app is failing to update on my iPhone tonight. Any suggestions?

2. **发言者 2**（回复第 1 条）：Sorry, same for me. Do not know how to fix.

3. **发言者 3**（回复第 1 条）：Yes same here, wheel spins, and then it goes back to ‘update’…..odd

4. **发言者 4**（回复第 1 条）：Ditto :frowning:  
     
   ATB, J

5. **发言者 5**（回复第 1 条）：Same issue for me also on iPhone and Mac

6. **发言者 6**（回复第 1 条）：it is not only the naim app, other apps show same

7. **发言者 5**（回复第 6 条）：I was ok on a load of other apps

8. **发言者 7**（回复第 1 条）：same here. other apps above naim in list also won’t update. They will update if you click each one in turn though . Only the Naim one actually stuck

9. **发言者 8**（回复第 1 条）：Thx for the heads up.  I’ll avoid updating for a few days.  
     
   Roger

10. **发言者 9**（回复第 1 条）：Same here, other apps will update but not the Naim app. Maybe \[某参与者\] or \[某参与者\] would know what’s going on - or is this just an aberration?

11. **发言者 10**（回复第 1 条）：Updated on my android phone, no problem.

### 讨论 4

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：9/UX: a Macintosh-inspired desktop for 9front  
     
   I have written a story about this on the Register, but of course I can't post that here.  
     
   I think this is a quite astonishing effort and could make 9front \_considerably\_ more usable... but it's bot-assisted, so I don't think they'll take it.

2. **发言者 2**（回复第 1 条）：Bot assisted aside, it avoids the uncanny valley that a more faithful implementation might fall victim to. Only weird thing was that /home was suddenly lost during the demo and acme crashed \(Firefox\).

3. **发言者 3**（回复第 1 条）：Aesthetically its somewhat interesting, but getting these two very distinct GUI paradigms to mesh well in practice is going to take a lot more effort.

4. **发言者 4**（引用未收录发言）：Yes, and the blog article itself is sloppy as well. The omnipresent clanker sales pitch phrasing is exhausting.

5. **发言者 1**（引用未收录发言）：Interesting. I only had a quick play with it, but TBH, I am not really competent to drive 9front effectively. I'm definitely not able to read the code. I didn't notice any of this. Lindsay seems to be actively working on it, so if you have the time, do please tell him what you told us...?

6. **发言者 5**（引用未收录发言）：God it's weird to read LLM writing anywhere in the vicinity of Plan 9.

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Spanish-language guides: darktable, RapidRAW on Linux and color management  
     
   Hi all\! I’m a photographer and sysadmin from Barcelona. After 14 years with Lightroom I moved my whole workflow to Linux with free software, and I’ve been writing guides in Spanish for people who don’t read English comfortably. In case they help any Spanish-speaking users here:  
     
   darktable en español: first steps developing RAW files in darktable. darktable en español: cómo empezar a revelar RAW  
     
   Problemas de RapidRAW en Linux: GPU, Nvidia and Wayland issues, with the fixes that worked for me. Problemas de RapidRAW en Linux: GPU, Nvidia y Wayland \(soluciones\)  
     
   Gestión del color en Linux para fotógrafos: from monitor calibration to printing. Gestión del color en Linux: guía fácil en 5 pasos  
     
   Feedback and corrections are very welcome, especially on the color management one. Thanks to everyone here for all the knowledge shared over the years\!

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Paper Snowflake &amp; Other Winter Rosettes  
     
   \[图片省略\]SnowflakeRosettes02319×576 52.1 KB  
     
   I just love rosettes\! So when I friend lent me her snowflake rosette die, I dug into my paper stash and made several\!  
     
   \[图片省略\]SnowflakeRosettes01576×500 67.5 KB  
     
   In the top photo you can see that I dug out my basic rosette die to add as a bottom layer and then I dug out some pennant dies and made a whole wintery award ribbon thingy. It became a gift topper.  
     
   \[图片省略\]XmasRosettes01-01576×567 151 KB  
     
   While I had the basic rosette die out, I made a couple more that I then added pennants to and made snowman and Santa head diecuts for. The award ribbon styles have some glitter, too.  
     
   I’ve already made a few more white snowflake rosettes that I am sure I will decorate up in the coming weeks. I’ll add them here.  
     
   Oopsie\! I forgot one\!  
     
   \[图片省略\]SnowflakeRosettes03370×576 59.8 KB  
     
   \[图片省略\]SnowflakeRosettes03a324×576 45.9 KB

2. **发言者 2**（回复第 1 条）：Those are so darned elegant looking\!  I love that you were able to build on the base snowflake to customize your own creations.

3. **发言者 1**（回复第 2 条）：Thank you so much\! I’m kind of obsessed with making them.

4. **发言者 3**（回复第 1 条）：I can understand the obsession\! They are beautiful\!

5. **发言者 4**（回复第 1 条）：They’re gorgeous, especially with your lovely papers\!

6. **发言者 5**（回复第 1 条）：I never knew these were called rosettes\! I can say I learned something new today :slight\_smile: They are stunning. I am envious of your paper stash.

7. **发言者 6**（回复第 1 条）：I know I’ve written this before, but your paper work is epic.

8. **发言者 1**（回复第 1 条）：发言者 3 Aw, thanks\! I’ve always loved this form, so it’s very satisfying.  
     
   发言者 4 and 发言者 5 It’s been really fun to dig through the stash to find what prints might be good for these with the folding and the circular-ness.  
     
   发言者 6 You’re so kind to say so\!

9. **发言者 7**（回复第 1 条）：Beautiful\!

10. **发言者 1**（回复第 9 条）：Thank you\!

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Who do I contact if my support ticket is not getting addressed in 11 days?  
     
   Basically the title. Got a support ticket that I posted on November 13 with a few questions regarding the app itself and subscription issue and they have not been addressed yet, almost half the time of subscription have passed since then

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Tomyris – Original 3D Character  
     
   Hi everyone\!  
     
   Here’s my finished 3D model of Tomyris, an original warrior character.  
     
   She has a strong, muscular build, long wild black hair, brown eyes and gold hoop earrings. Her outfit includes a dark brown harness top with a gold ring, a pleated skirt with gold tips, gold shoulder armor, bracers and greaves, fingerless gloves and gold high-heeled boots.  
     
   The character was modeled, textured and rigged in Blender 4.2.3, using Rigify Legacy. The rig does not include facial bones. The model uses simple flat-color materials, with no toon shader and no complex textures.  
     
   I’m also including the clay and wireframe views for anyone interested in the topology.  
     
   This was a personal project, not a commission.  
     
   Thanks for checking out my work\! I’m open to feedback and hope you like it\!  
     
   \[图片省略\]She\_Warrior\_05960×540 137 KB  
     
   \[图片省略\]She\_Warrior\_06960×540 134 KB  
     
   \[图片省略\]image1920×1080 1.65 MB  
     
   \[图片省略\]image1920×1080 1.68 MB  
     
   \[图片省略\]image1920×1080 1.97 MB  
     
   \[图片省略\]image1920×1080 1.58 MB

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: AnywhereRoles – remote jobs with link checks and time zone overlap

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[問題\] 請問穿過膝上絲襪的女生  
     
   請問膝上絲襪會容易滑下來嗎？  
     
   公司制服是穿裙子和絲襪  
   一直都穿褲襪  
   但上廁所穿脫很麻煩，還常常弄破  
     
   想說不知道可不可以改穿膝上絲襪？  
   但缺點好像是容易滑下來或勒大腿？  
     
   ----  
   Sent from Be某社区 on my iPhone 17

2. **发言者 2**（回复第 1 条）：膝上襪會鬆，會掉下來要一直拉，大

3. **发言者 2**（回复第 1 条）：腿比較有肉的會勒，很挑人，褲襪比

4. **发言者 2**（回复第 1 条）：較方便啦

5. **发言者 3**（回复第 1 条）：好像只穿過一次 不太喜歡膝上襪

6. **发言者 4**（回复第 1 条）：所以才發明吊帶

7. **发言者 5**（回复第 1 条）：還有一種挖洞的方便上廁所

8. **发言者 6**（回复第 1 条）：用吊帶

9. **发言者 7**（回复第 1 条）：有開檔的褲襪啊，也有非醫療的壓力

10. **发言者 7**（回复第 1 条）：腿襪，好的非醫療壓力腿襪不滑，也

11. **发言者 7**（回复第 1 条）：不過緊。你買到醫療的腿襪上班要花5

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Gamescom LAN 2027  
     
   Hello again.  
     
   2027 steht bald wieder an und somit auch wieder die Gamescom LAN. Wie schaut es aus mit unseren Astronauts Bohnen?  
     
   Ich frage vor allem wegen der Community Promo-Codes an, weil man sich schon die Tickets holen kann und würde traditionell gerne bei 某社区 sitzen \(Team Itzjanina forever\).  
     
   Könnt ihr schon was näheres mitteilen bzw ab wann habt ihr planerischer Gewissheit?  
     
   Aber erst einmal weiter fröhliches GTA daddeln  
     
   \#einervon33mio  
     
   \#GamescomLAN27  
     
   \#TeamITZJANINA

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：我好饿啊\( ;´д\`\)我好想吃猪脚饭

2. **发言者 2**：吃

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Any guides for sending SMS with an Air780EX Breakout Module?  
     
   Maybe I’m just not looking hard enough but I have yet to find anything that worked \(nor a comprehensible AT command guide\). I might also just be botching the wiring.  
     
   This is how I’ve been wiring it:  
     
   Uno R4 TX &gt; level shifter &gt; Air780EX RXD  
   Uno R4 RX &gt; Air780EX TXD  
   Uno R4 GND &gt; Air780EX GND  
     
   I’ve been powering the Air780EX with a 5V power adapter through the VIN pin

2. **发言者 2**（回复第 1 条）：check the datasheet for your board, is 5V enough to power it? I've seen such modules needing 6-12V 2A  
     
   I also recommend the level shifter on both RX and TX.  
     
   By the way, how did you wire the level shifter?

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[链接隐去\] à sauvegarder  
     
   Bonjour,  
     
   j'ai une adresse e mail sur \[链接隐去\] avec un bridge  
     
   comment faire pour sauvegarder sur un PC les paramétres du compte et tous les e mails ?  
     
   Cordialement

2. **发言者 1**（回复第 1 条）：bonjour,  
     
   j'avais trouvé le système importexportstooolNG  
     
   est-ce qu'il existe un autre moyen pour une sauvegarde ?

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Re: \[心情\] 跟自己的小孩嘔氣  
     
   感覺妳還蠻幸福的呀  
   1.老公顧家，要忍受都在外面工作不能陪伴孩子的日子。孩子也愛他  
   2.妳還很上他的心  
   3.他有提前預告不是硬來蠻幹，都提前預告了感覺得出他的期待。  
     
   看下來其實我真的覺得他沒啥問題  
   期待落空和妳在文章中那種事不關己的態度多少會讓人有點氣餒，畢竟夫妻關係和房事應  
   該是雙向的。  
     
   妳也不看看很多人妻在婚姻中最常抱怨的是什麼？  
   就是老公不顧家、小孩不親爸都黏媽媽、老公不碰她、老公外面有人、家務繁忙老公硬來  
   等等...  
   他不是完美但還不錯吧？有到需要上網發一篇要公幹他的程度嗎？  
     
   —  
     
   哎  
   您的故事讓我想到我一個朋友  
   也是長期在外面工作的  
   老婆每次他回來都會把小孩哄睡然後給他驚喜，或是有什麼戰袍和小情趣什麼蛋之類的（  
   再講下去就18禁了）。  
   夫妻關係可好的咧...  
   他也更努力在工作、更愛他的家庭、超愛他老婆。  
     
   準備一點小心意或是幫忙哄哄小孩應該不難？當然如果不願做也沒差沒有對錯，畢竟婚姻  
   和夫妻心靈關係是你自己的。  
     
   我是覺得男性這種生物真的很簡單好拿捏啦...

2. **发言者 2**（回复第 1 条）：有心沒心其實都看得出來

3. **发言者 3**（回复第 1 条）：馭夫術這麼簡單就是有一堆白癡要對著幹

4. **发言者 4**（回复第 1 条）：能靠半百肉體就抓緊的老公，不知道到底在不滿什麼

5. **发言者 5**（回复第 1 条）：老公半百了還有需求,你應該要感恩...

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Problem finishing off a hat with magic loop  
     
   I am finishing off a ribbed beanie with magic loop. I have reached the last two rounds.  I’m having a lot of trouble working the next to last round because it is so small\! And it has 6 K2togs. Any suggestions on how to work that very small next to last row?  I was thinking of trying to use a crochet hook. The final row is drawing the yarn through with a tapestry needle to close off the top so that will be easy.

2. **发言者 2**（回复第 1 条）：If you have another circular needle even if it’s not exactly the same needle size, you could use that. It would be good if it’s close to the same size but need not be the same as the needle you’ve been using.  
     
   Dpns will work too.  
     
       
       \[图片省略\]

3. **发言者 3**（回复第 1 条）：I like to switch to double pointed needles when I get to that point. They take some getting used to, but at least you’re not fighting to keep the stitches in a circle and there’s so few of them that it’s not that hard to handle…

4. **发言者 1**（回复第 3 条）：Thanks. I will have to learn how to use double points. Right now I don’t know how and I am stuck at the next to last round. You are right about fighting to keep those last stitches in a circle. That’s what is tripping me up. I’m thinking of trying to put in a lifeline and then trying to finish off those last stitches with a crochet needle. I’ll see if that might work.

5. **发言者 4**（回复第 4 条）：You can probably hook the last row off with a crochet hook. Run the hook through the stitches as if to k2tog and grab your yarn and pull through. Do a couple and then put them on a clippy marker to hold for later.  Once you’ve decreased them all, cut the yarn and run it through the stitches in order and pull tight.

6. **发言者 1**（回复第 5 条）：Thanks. That was my plan\!

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：我之前的年度订阅也是 99.99 美金一年，但是还没有到期，如何参加今年黑五活动呢？

2. **发言者 2**：先 Switch 到月付，会收你一个月的钱，之后刷新页面看到 plan 更新成月付后，再 Switch 回年付就能看到五折价。升级后的订阅截止日期会变成明年今天，你刚刚给的一个月以及之前年度订阅的剩余时间都会退钱

3. **发言者 1**：我试了一下不行，我的还是先生 199 的年付，我还以为可以在最终付费的时候回变成 99，结果我点击订阅，然后还收取了 199，现在在申请退款。  
   发言者 2

4. **发言者 1**：发言者 2 就是我切换到了月付，已经扣费了 19.99，然后去管理订阅里，再 Switch 到年付，上面显示 199.99

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Money Doesn't Grow on Trees\! - An incremental game made in 48 hours  
     
   Hi everyone\! I’m really proud to share with you all a game made in 48 hours for a local game jam.  
     
   In Money Doesn’t Grow on Trees, you play as Stee, a mutated gardener fish, taking care of Pr. Maria GIRLBOSS garden by planting trees that gives you money \!\!\!  
     
   Plant a tree and use money to evolve it  
     
   Water them so they keep producing  
     
   Protect them by punching praying mantises trying to eat them  
     
   Reach every tier of Pr. Girlboss’ requests to unlock all the plants  
     
   The game is available right here on \[链接隐去\] \!  
     
   NOTE : Only jam participants are able to rate the game, but you can still play and have fun\! A post-jam version is already in the works and will be available once the winners are announced.

2. **发言者 2**（回复第 1 条）：i think the tutorial is not understandable, at least for the first few seconds i don’t know what happens i just see some art that isn’t very clear, i suggest you making more clear tutorial or if tutorial is some sort of prologue if this is more story-based game then change the tutorial’s name to prologue

### 讨论 19

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Super integrated……  
     
   The previous thread seems to have disappeared?  
     
   In light of no available SUPERNAIT or in fact any NAIM integrated, alternative options may include your recommendations……  
     
   How about the “new” Accuphase E3000?  
     
   \[图片省略\]image740×721 81.1 KB

2. **发言者 2**（回复第 1 条）：One of their best products many say. But listen to it before payin’

3. **发言者 3**（回复第 2 条）：Sort of quite like it’s retro look.

4. **发言者 4**（回复第 1 条）：Nice looking bit of kit

5. **发言者 5**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   How about the “new” Accuphase  
     
   They are usually very well build.  
     
   A friend had the original E202 from the 70’s, they are now collectors item.  
     
   All those buttons makes it rather the opposite to say a Nait 50.  
     
   Two very different products, directed at two very different clients.  
     
   Bet its expensive, some like the VU metre, it has its charm admitted.  
     
   Not for me TBH.

6. **发言者 1**（回复第 5 条）：This is a thread to discuss no current NAIM Integrated line up offering , as the “other” thread from 发言者 6 has disappeared…….?  
     
   Happy for this to be “merged”…

7. **发言者 6**（回复第 6 条）：I’m cool.

8. **发言者 1**（回复第 7 条）：I can’t find the thread…..?

9. **发言者 6**（回复第 8 条）：Not can I, it was something along the theme of come on Naim this is your backyard but can’t see it on search or on tags.  
     
   Hey Ho, not to worry.

10. **发言者 7**（回复第 1 条）：I don’t know the amp, so I can’t comment on its suitability as a hi-end integrated amp, but if I were in the market for such a thing, I would look at the Sugden range and if one could stretch to it, a Sugden Sapphire I-A4. If not, the A21SE is terrific too.

11. **发言者 1**（回复第 1 条）：Thread introduction edited to follow on from that missing thread…

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Dutch data protection authority advises against purchasing AI camera glasses  
     
   related: \[Nearby Glasses \(smart glasses detector android app\)\]\(\[链接隐去\]

2. **发言者 2**（回复第 1 条）：Who would've guessed?

3. **发言者 3**（回复第 2 条）：Everyone, but for responsible and transparent governance of a country you want to make decisions based on product research before you ban an entire group of products from being sold in your country. The companies making these devices will attempt to sue the country \(or the entire EU\) for the ban and they have enough capital to make this ugly.

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：First attempt at weaving \(with yarn\)  
     
   At some point I’d like to try learning to weave in a more structured way. In the meantime, at some point last year I tried creating something by weaving some yarn in a homemade “loom” made out of cardboard :joy:. It was fun but a lot of work… I will likely not pick this up again until I have some massive amount of time to learn how to do it properly, lol…  
     
   \[图片省略\]20260509\_0955581920×2560 1.58 MB  
     
   \[图片省略\]20260509\_0956001920×2560 1.45 MB  
     
   \[图片省略\]20260509\_1035051920×2560 1.45 MB  
     
   \[图片省略\]20260509\_1055041920×2560 1.61 MB  
     
   \[图片省略\]20260511\_2020001920×2560 1.33 MB  
     
   \[图片省略\]20260513\_1220351920×2560 1.83 MB  
     
   \[图片省略\]20260511\_1629231920×2560 1.35 MB  
     
   In hindsight, starting with a really long article of clothing was probably not the best choice for a first project, lol\! And it wasn’t even that long… It was not long enough for me, but my youngest daughter can use it, and she was pretty excited about it, too :heart:  
     
   \[图片省略\]20260513\_161034\(1\)1920×2560 786 KB  
     
   Thanks for looking\!

2. **发言者 2**（回复第 1 条）：What an ambitious project\!  I love your color choices and how great is that that your daughter can not only use it, but that she’s excited about it too\!  Perfect outcome for a project that turned out to be so much work.

3. **发言者 3**（回复第 1 条）：So fun\! And I believe the cardboard loom \(or the plastic ones with stretchy bands to make potholders\) is probably where most would start that learning process, so you are obviously on the right track\!

4. **发言者 4**（回复第 1 条）：That’s a huge first project\! Nice job\!

5. **发言者 5**（回复第 1 条）：Wow\! I like how you made it sooooo long\! When I first started dabbling in weaving I made a cardboard loom like this:  
     
   \[图片省略\]1fbd1b155eec9301ddf968b93f4cdcf9581×513 50.7 KB  
     
   Here’s a tutorial of you’d like\!\!  
     
       
         \[图片省略\]  
     
         \[链接隐去\]  
       
     
       
       \[图片省略\]  
     
   Cardboard Box Looms: DIY Weaving at it’s finest\! – Craft Leftovers

6. **发言者 1**（回复第 1 条）：Thank you everyone for your kind words, and thank you 发言者 5 for the tutorial\!

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Grammar  
     
   Hi,  
     
   When I started with 某社区 I only wanted to learn Vocab so I turned the grammar side of things off. Now, I want to learn grammar too but I cannot find an option on the website to do this. Any help would be appreciated.  
     
   Cheers

2. **发言者 2**（回复第 1 条）：Hi\!  
     
   I am glad to hear that 某社区 has been helping you with your vocab study.  
     
   When you mean that you couldn’t find a way to do this, I am not exactly sure what you mean. Is there any chance you would be able to give me a bit of extra context? I’ll try to help you get it up and running asap.

3. **发言者 1**（回复第 2 条）：Sure.  
     
   When you sign up for 某社区 you can choose to learn grammar, vocab’ or both. I turned off grammar lessons, so now I only get tested on my vocab’.  
     
   How do I turn grammar lessons back on?

4. **发言者 2**（回复第 3 条）：I see. When you click on your avatar menu in the app, then settings, then general, what do you see under this?  
     
   \[图片省略\]image1401×225 16.7 KB

5. **发言者 1**（回复第 1 条）：Cheers

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Mecha bust  
     
   \[图片省略\]metin-seven\_3d-hard-surface-modeler-toy-designer\_science-fiction-mecha-bust2000×2000 4.3 MB  
     
   A mech bust. :robot:  
     
   Modeled using the Chisel SDF add-on for Blender.  
     
   Textured and rendered with LuxCoreRender in Blender.  
     
   A little work-in-progress compilation:  
     
   \[图片省略\]metin-seven\_3d-hard-surface-modeler-toy-designer\_science-fiction-mecha-bust\_wip2000×2000 2.62 MB  
     
   In the third image you can see that I assigned pure red, green and blue colors to different parts of the SDF model, so after meshing the model I could split the R, G and B channels of the vertex colors into masks for coloring, texturing and materials.  
     
   Hope you like it\! :blush:  
     
   :house: Home ─ \[链接隐去\]  
     
   :artist\_palette: Work ─ \[链接隐去\]  
     
   :joystick: Play ─ \[链接隐去\]  
     
   :butterfly: Bluesky ─ \[链接隐去\]  
     
   :mammoth: Mastodon ─ \[链接隐去\]  
     
   :file\_cabinet: Archive ─ \[链接隐去\]

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: EMWaver – build and flash MCU firmware from just Chrome, no IDE

### 讨论 25

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 這一期發票不可能有人沒中吧 你們中多少  
     
   這一期9-10月發票  
   基本上都是通通有獎耶  
   前提是你最少要有5張發票  
   你如果0張 當然不會中  
     
   可以分享你中幾元嗎  
   這一期很多人中4200元  
     
   我在消費版看到的  
   很像沒有人是一張都沒中  
   這不太可能發生  
   要不就是反串  
     
   我只中一張500元  
   雲端專屬獎啦  
     
   12/6星期天去超商  
   列印出紙本 領498元啦

2. **发言者 2**（回复第 1 条）：我知道澎湖曾有大獎是兩人中同一號

3. **发言者 3**（回复第 1 条）：剛剛對了發現沒中...

4. **发言者 4**（回复第 1 条）：冷霸摳，我出運啦 哈哈

5. **发言者 5**（回复第 1 条）：麥香奶茶一罐10元的發票 500

6. **发言者 6**（回复第 1 条）：綁定銀行帳戶就直接匯到戶頭了

7. **发言者 1**（回复第 1 条）：竟然有人沒中

8. **发言者 1**（回复第 1 条）：3、4樓才是正常情況，至少會有200

9. **发言者 7**（回复第 1 条）：為何？這期有什麼特殊的？我已經好

10. **发言者 7**（回复第 1 条）：幾年沒中過了

11. **发言者 8**（回复第 1 条）：我二十幾張，一張也沒中...

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：好无聊\( ›´ω\`‹ \)求前十个回复，词语、短语、成语、短句都可以，只要不超过十个字就行。我试试能不能随手写段内容，把这十个回复都包含进去，还能逻辑通顺\(　ﾟ 3ﾟ\)

2. **发言者 2**：日日夜夜反反复复失败

3. **发言者 3**：来都来了

4. **发言者 4**：前前后后碌碌庸庸废材

5. **发言者 5**：往事越千年，魏武挥鞭

6. **发言者 6**：我想拉史

7. **发言者 7**：浪漫一如初见  
     
   //=͟͟͞͞\( 'ヮ' 三 'ヮ' =͟͟͞͞\)

8. **发言者 8**：前列腺高潮真的存在吗

9. **发言者 9**：撸一撸到底吧

10. **发言者 10**：肯德基疯狂星期四

11. **发言者 11**：疯狂星期四vw50

### 讨论 27

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Top down sweater with scoop hem  
     
   I’m knitting a top down sweater and want to make a scoop hem so I need to incorporate short rows into the front and back. I have 160 stitches on the front and the back. Any ideas on spacing of the wraps?

2. **发言者 2**（回复第 1 条）：I wonder if binding off at intervals might give you more control over the shaped side edges and be easier to visualize.  
     
   There’s also a short row calculator in addition to the method recommended by 某参与者 which can be set for hems. I haven’t used it myself so this isn’t from presonal experience.  
     
   \[链接隐去\]

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：大家都在罵 AI 寫的程式碼是垃圾。SpaceXSI 主任工程師 Lauren Tan（\[某参与者\]）在 AI Engineer Code Summit 2026 的演講〈All Code Is Slop \(Except Mine\)〉說：寫垃圾的從來不只 AI，AI 只會把它身邊的環境放大。  
     
   她的團隊一個月合併一萬多個 PR，撤回比例反而從 0.98% 降到 0.47%。這支影片整理她怎麼做到：把每次糾正變成確定性檢查、拿掉難用的東西、把驗證做好，最後才輪到軟體工廠。  
     
   \[链接隐去\]

### 讨论 29

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Great Electronic Music With Meaningful Lyrics  
     
   I’m searching for more albums in this category.  
     
   As examples, here are 3 albums that I really enjoy and think are highly worthy of strong recommendations:  
     
   \[图片省略\]IMG\_0021994×1055 49.1 KB  
     
   \[图片省略\]IMG\_0020973×1066 158 KB  
     
   \[图片省略\]IMG\_0022980×1038 128 KB  
     
   Based on my taste, would anyone care to share some similar recommendations?  
     
   Cheers,  
     
   Stavs

2. **发言者 2**（回复第 1 条）：Hi 发言者 1,  
     
   Nearly a day passed and no responses from the forum:- what is going on? :thinking:  
     
   FYI I found the Lilly Allen album example OK, I was less keen on the Smile:D album by Porter Robinson, however not sure if this will work for you, but you could try music by ‘Getdown Services’.  
     
   Presently, I am listening to the album Massive Champion.  
     
   Have fun\!

3. **发言者 1**（回复第 2 条）：Thanks 发言者 2 for the recommendation. I’ll check it out.  
     
   Electronic music is a funny thing these days - there is just so much of it available. A lot of it leaves me a cold. It’s difficult to pinpoint what ticks my boxes. So different from the jazz, rock and blues I tend to listen to most, but certain electronic albums really do it for me.  
     
   The search continues…

4. **发言者 3**（回复第 1 条）：It depends what you mean by meaningful lyrics, and the type of electronic music you like…  
     
   I love this album:  
     
   \[图片省略\]image516×516 38.4 KB  
     
   An electric storm by White Noise  
     
   An old album, lyrics quite varied from amusing to sombre. I find the lyrics of the track The Visitation quite moving.

5. **发言者 4**（回复第 1 条）：Hi 发言者 1  
     
   Would 发言者 4 Eno - The Ship, fit your requirements?

6. **发言者 5**（回复第 1 条）：\[图片省略\]IMG\_9520726×704 110 KB

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Pokemon Childhood Version: A romhack where Mew is under the truck

2. **发言者 2**（回复第 1 条）：This unlocks so many memories\!

3. **发言者 3**（回复第 1 条）：Given it's not implemented, I guess it's true that you train your team to level 100, release it and then can upgrade your bike to a car\!

4. **发言者 4**（回复第 3 条）：I was hoping you could catch Luigi &amp; Yoshi too after getting a Machamp to 100 &amp; being the Elite Four 100 times.

5. **发言者 1**（回复第 3 条）：Ooh I never heard that one\! I might just have to add it :v

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：AI maskin do not work  
     
   HI, When I try to do AI masking in Dartable 5.6.2 get following error message:  
     
   Objekt mask preparation failed.  
     
   It has worked before.  Any tips of what to do?  
     
   Anders

2. **发言者 2**（回复第 1 条）：My gut tells me it might have something to do with the AI models not being properly initialized. What OS are you on? What does Preferences/AI show? Can you share a screenshot?

3. **发言者 1**（回复第 2 条）：Hi, I.a running Manjaro and attach a screenshot.  
     
   \[图片省略\]Skärmbild från 2026-11-24 11-45-481825×736 41.4 KB

4. **发言者 2**（回复第 1 条）：Mh, others might have more informed suggestions. I’d try deleting darktables cache folder ~/.cache/darktable/. You’ll need to re-download the AI models afterwards.

5. **发言者 1**（回复第 1 条）：~/.cache/darktable/ai was and is now empty. I have tried reinstall Darktable and re-download the AI modules but no succes…

6. **发言者 3**（回复第 1 条）：The same thing happened to me a few weeks ago. I will try to find the thread and link to it here. Short version: In the end, I had to install another module.  
     
   PS - Here it is: Introducing neural restore module – raw denoise, denoise, and upscale - \#205 by 发言者 3

7. **发言者 1**（回复第 1 条）：Thank you, I looked at 发言者 3 comment but I already have Onnx installed and it have been working… I starting to wonder if the problem is in Darktable or some outside access to an AI modell?\!

8. **发言者 2**（回复第 7 条）：darktable’s AI models work exclusively offline. Are you using the appimage? if no, could you try that one?

9. **发言者 1**（回复第 8 条）：I don’t know that program but I,ll look into it. THanks

10. **发言者 2**（回复第 9 条）：I mean simply running the official darktable appimage. It will use the same config folder as your package-manager-installed instance but comes bundled with it’s dependencies.

11. **发言者 2**（回复第 1 条）：I was wrong about the location of the AI models, they should be under ~/.local/share/darktable/models/  
     
   Try deleting and re-download through the preferences.  
     
   And yeah, 5.7 is the development version.

### 讨论 32

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：What am I doing wrong in this custom sentence?  
     
   \[图片省略\]277721080×2102 153 KB  
     
   I’m trying to add this sentence for the vocab word 捧げる, but I get the error in red. I don’t get what I’m doing wrong, my answer IS in Japanese, isn’t it?

2. **发言者 1**（回复第 1 条）：Okay, it works if I use just hiragana but… a\) the error message doesn’t make sense because hiragana IS Japanese, but also, for a vocab example sentence, why can’t I use kanji? I’m trying to learn the vocab, which does include a kanji?

3. **发言者 2**（回复第 1 条）：I haven’t used this feature, so forgive the speculatory answer, but maybe it’s a mobile vs web issue\(?\). I get the following when trying to gin up a sentence:  
     
   \[图片省略\]image853×938 51.5 KB  
     
   As per the on screen instructions and the with your experience, I get no error using kana only.

4. **发言者 1**（回复第 1 条）：But yours says you can use kanji with hiragana in parenthesis, but that also doesn’t work…  
     
   \[图片省略\]277761080×2102 153 KB  
     
   Maybe I should try on web later?

5. **发言者 1**（回复第 1 条）：I was on mobile, in the app, yeah\! With your help, I was able to get the right brackets and I got it to work\! Thanks\!

6. **发言者 3**（回复第 5 条）：发言者 1 发言者 2  
     
   I am fixing this issue in the mobile app right now\!

7. **发言者 4**（回复第 1 条）：your answer probably shouldn’t include the exclamation mark, otherwise you’d have to type it in every time. But it’s also part of the template  
     
   \(personally I wouldn’t include the よ either and instead make it part of the template too\)

8. **发言者 1**（回复第 7 条）：you’re right, I was playing around with the sentence, but I did it like this now, and it seems to work\!  
     
   \[图片省略\]278201080×2102 145 KB  
     
   \(it’s a line from 進撃の巨人, so I wanted to keep the よ in the word as I want to practice the full phrase, otherwise you’re right and the よ would be better as part of the template. Thanks for the tips\!\)

9. **发言者 1**（回复第 6 条）：ah, thank you so much\!

10. **发言者 3**（回复第 9 条）：发言者 1, 发言者 4 is right, both mobile and the web do not support the exclamation mark in the answer :person\_bowing:

11. **发言者 1**（回复第 10 条）：yeah, I removed it\!

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: MicroVM with automatic sleep and seamless wake-on-request

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Fondue und 193. OSM-Stammtisch Zürich, Fr 11. Dezember, ab 18:30  
     
   Das jährliche Fondue essen und der nächste OSM-Stammtisch in Zürich findet am Freitag, dem 11. Dezember statt.  
     
   Wir treffen uns in der Bitwäscherei, ein Hackerspace in der ehemaligen Zürcher Zentralwäscherei. Der Hackerspace ist ein paar Fuss-Minuten vom Bahnhof Hardbrücke entfernt \(~300m laut OSRM\).  
     
   Datum: Mittwoch, 11. November 2026  
     
   Zeit: Ab 18:30 Uhr  
     
   Ort: Bitwäscherei, Neue Hard 12, Zürich  
     
   Weitere Infos wie üblich im OSM-Wiki.  
     
   Zur Planung des Fondues gibts eine Umfrage: Poll - Sosm Fondue - nuudel

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 冬天皮膚保養  
     
   冬天手跟臉都會乾到變白白的  
   看起來就會有點醜  
   擦護手霜又沒辦法一勞永逸  
   想問大家有遇過這種狀況嗎？怎麼解決的？

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：是这样的肥哥们  
     
   我有一个朋友，他出于好奇买了点插进自己小小肥里的长条的一个结连一个结的东西，但是今天到货之后发现完全不知道插到哪里算对，而且进去时候的异物感让他觉得不舒服，但是买了又买了总不可能不用吧，所以那个朋友托我来岛上问下经验丰富的肥哥们  
     
   这是他发给我的jp

2. **发言者 2**：没爽感就扔啊，我之前好奇过，结果当时没感觉，第二天尿尿有火辣辣的感觉，更加坚定了不往牛道里通奇怪东西的感觉，假牛牛一样，没感觉就不要玩了，现在只买假批\( ﾟ∀。\)

3. **发言者 3**：没有快感是正常的，除了先天M圣体

4. **发言者 4**：我在等尿路感染，你在等什么

5. **发言者 1**：那这样的话那些有感觉的肥哥是为啥会有感觉\( ﾟ∀。\)

6. **发言者 5**（回复第 5 条）：\[引用第 5 条\]  
     
   人与人的体质不能一概而论.jpg

7. **发言者 1**：诶突然想来这jp好像就是岛上存的，补一张吧

8. **发言者 6**（回复第 7 条）：\[引用第 7 条\]  
     
   \(つд⊂\)再见了o小弟

9. **发言者 7**：\(っ˘Д˘\)ノ&lt;時候已不早我們要回家了  
     
   向po主說聲再見再見

10. **发言者 8**：发都发了再来几张吧

11. **发言者 9**（回复第 7 条）：\[引用第 7 条\]  
     
   这主视角人到底是穿了裤子还是没穿

### 讨论 37

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Wi-Fi drops out constantly  
     
   Continuing the discussion from USB-A ports and Wi-Fi often don't work after boot:  
     
   My wifi drops out constantly, this is kind of frustrating.  Do I have a defective board?

2. **发言者 2**（回复第 1 条）：Assuming there is no difference between the Wi-Fi networks of the UNO Q and VENTUNO Q, I would like to share a working, tested non-containerized UNO Q script that allows you to control LED1\_R and LED1\_B from an Android mobile phone dashboard.  
     
   Do you think that script would be helpful for you to diagnose the state of your Wi-Fi network?

3. **发言者 1**（回复第 1 条）：The Ventuno Q is the one dropping on the connection not my wifi infra.

### 讨论 38

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

6. **发言者 1**（回复第 2 条）：And I’m back\! Ha\! Still working on the leaves pattern. About to start the row which has a K5tog. Did you knit as written or did you do something different?  
     
   I am taking this slowly. Already had to take it all out once so carefully counting after each row\! I used your advice, marking each repeat which really helps\!\!\!  
     
   thank you\!  
     
   Charlene

7. **发言者 2**（回复第 6 条）：I worked the k5tog as written. It worked out well as I remember.  
     
   Working slowly through this yoke pattern is a good idea. Lots of shaping and fun at the same time. You’re making great progress\!

8. **发言者 4**（回复第 1 条）：Do you know about lifelines, which can protect your hard work if you have to rip back to fix something?  
     
       
       \[图片省略\]

9. **发言者 1**（回复第 7 条）：Thank you\!  I love a challenge.  Ha\!  
     
   Hope you have a nice Thanksgiving.  
     
   Charlene

10. **发言者 1**（回复第 8 条）：Great video\!  Thank you so much.  I am hoping I won’t need to take out any more rows on this project.  Taking it slow\!  
     
   Happy knitting and I hope you have a nice Thanksgiving.  
     
   Charlene

11. **发言者 5**（回复第 1 条）：I need the stitch pearl or knit it plain but from the back that avoids holes for me .Good luck \!

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：事情起因是写的代码质量不高出现告警，凌晨 2 点被拉起来改代码  
   可能后续还会复盘什么，搞得压力有点大  
   想问大家都是这样的吗，想考公了

2. **发言者 2**：问薪无愧

3. **发言者 3**：AI 写的还是自己写的

4. **发言者 4**：复盘：下次记得睡觉前手机关机  
     
   给几个钱哦，还 2 点起来给你改 bug，真要是重要也不至于上线才发现 bug，更不至于没有 AB 角晚上值班

5. **发言者 5**：回滚，有问题明天再看

6. **发言者 6**：不太理解为啥非要 2 点改 bug，而且还只是告警不是真实出问题。再说了，即便真出大问题，凌晨 2 点钟有人用吗？又不是全球服务。正确的做法是先回滚再说，慢慢排查呗

7. **发言者 7**：还是庙太小，半夜 2 点 还能上线的，肯定不合规

8. **发言者 8**：我最近一想到工作心理压力就挺大，刚工作的时候半夜改代码不会有心理压力，那时对未来充满期待，现在只想快点退休

9. **发言者 9**：发言者 6 国内一些制造业企业，24 小时生产的，软件上线后都是直接在生产环境改的，凌晨改 bug 不要太正常，不改就停产

10. **发言者 10**：怕不是慢查，凌晨就性能瓶颈，早高峰直接爆炸。  
     
   不过直接回滚就好，2 点改也改不明白，也没测试回归。

11. **发言者 11**：这个点我还没休息…

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Need help with understanding auto exposure values  
     
   Godot Version  
   4.7.3  
     
   Question  
   I’m having trouble understanding how to properly set up auto exposure with proper values in Godot.  
     
   I’m using physical light units with a small test scene. I have a sun and sky set up with correct values. According to charts for EV 100, the max exposure value should be around 14 and the minimum between 4 - 7 \( I have a small indoor area for testing exposure\). However, these settings make everything way too dark. The default settings look more correct, but it doesn’t make sense to me. In Unreal these settings work just fine so I figured it had to do with aperture and shutter speed. I’ve looked through the documentation on camera attributes as well as looking up real world camera settings, but I’ve not been able to translate between the two. I’m guessing I’m just not understanding how cameras work in general. Any help is appreciated.

### 讨论 41

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Getting old Java phones online again

2. **发言者 2**（回复第 1 条）：BT PAN is pretty annoying. Palm devices also used it IIRC, and the Treos didn't have WiFi, so you were forced to use 2G or Bluetooth networking.

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：What brought you joy today?  
     
   What brought you joy today?  
     
   Me: I finally spent some time in the workshop. My son asked to potter around in the workshop and explicitely suggested I could do something else in the workshop while we were there. So I finally tidied up and got to work on a nesting box using plans from Nabu.  
     
   \[图片省略\]PXL\_20261118\_162353794.RAW-01.COVER604×453 204 KB  
     
   \[图片省略\]PXL\_20261121\_170644068.RAW-01.COVER453×604 161 KB

2. **发言者 2**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   What brought you joy today?  
     
   Not quite joy like yours, but more like a good laugh reading the unfortunate literal translation of the caption “blue tits on a box” in the Nabu link that the browser offered in my language

3. **发言者 3**（回复第 1 条）：Sunny day and a walk in the park. It’s such a joy to feel the sun on the skin on these short winter days. And since we are photographers the november light is spectacular all day.

4. **发言者 2**（引用未收录发言）：\[图片省略\] 发言者 4:  
     
   Soon it will become a select few, who bike in rain, sleet, and the occasional snow  
     
   The latest date I’ve ever ridden a bike was around mid November, several years ago. It was right next to a river with was a bit of frost on the asphalt, enough to make the front wheel skid when I braked hard enough :grimacing:  
     
   Good thing it was a straight and I wasn’t going fast

5. **发言者 4**（回复第 4 条）：Get winter tires. They are a game changer. \(I actually have a “winter bike” so I don’t need to change tires depending on the day’s weather.\)

6. **发言者 2**（回复第 5 条）：At that time I was actually thinking about getting Schwalbe Ice Spiker Pro. Those are even tougher off-road tires that could handle basically anything, but I never got them since they’re expensive and I didn’t want to run them on asphalt too much, since the snow was rather uncommon.

7. **发言者 5**（回复第 1 条）：Walking in to work in late Nov and seeing this…  
     
   \[图片省略\]PXL\_20261117\_142457247.RAW-013072×4080 2.42 MB  
     
   There are still roses on many of the rose bushes…  
     
   It will all come crashing down but this fall in southern Ontario has been a gem. Very little rain and warm temps…I think it hit 19C on the weekend…

8. **发言者 6**（回复第 7 条）：\[图片省略\] 发言者 5:  
     
   There are still roses on many of the rose bushes…  
     
   Yes, I have a couple of big rose plants climbing a fence in my back yard. Today, the roses have about six blossoms and there are also several beautiful clematis blossoms.

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：The Rocketeer  
     
   I was going down a superhero rabbit hole when I stumbled upon this old, almost forgotten Disney IP, The Rocketeer.  
     
   So, naturally, I couldn’t resist giving it a go. This is my take on The Rocketeer, made in Blender. I’ve put together a series of renders, exploring both the closer details and some more cinematic shots.  
     
   I also think this would make a really fun subject for a short animated piece someday. Maybe that’s something I’ll explore in the future.  
     
   Hope you guys enjoy it\!  
     
   \[图片省略\]RENDERWOAHz1080×1440 2.2 MB  
     
   \[图片省略\]RENDERWOAHS1080×1440 2.19 MB  
     
   \[图片省略\]FRONT1080×1440 2.44 MB  
     
   \[图片省略\]SIDE1080×1440 2.5 MB  
     
   \[图片省略\]FULLBODY1080×1440 1.94 MB  
     
   \[图片省略\]FULLBODY21080×1440 1.94 MB  
     
   Here are some of the cinematic shots.  
     
   \[图片省略\]SS12048×1080 3.34 MB  
     
   \[图片省略\]22\(real\)2048×1080 3.04 MB  
     
   \[图片省略\]33\(done\)2048×1080 3.39 MB

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: What Happened to Midjourney?  
     
   A model that was very popular 2–3 years ago, but now I haven't heard anything about it at all.

2. **发言者 2**（回复第 1 条）：So what do people use nowadays? I'm still using Midjourney from time to time cause it has this... feel \(which gemini or chatgpt doesn't\).

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Tagging convention for 'ref' vs. 'prow\_ref' on Public Rights of Way  
     
   Hi everyone,  
     
   I’d like to clarify the current UK community convention regarding the use of ref alongside prow\_ref on Public Rights of Way.  
     
   I recently came across this feature tagged like this:  
     
   designation=public\_footpath  
   foot=designated  
   highway=footway  
   prow\_ref=Bengeo Rural FP 10  
   ref=Bengeo Rural Footpath 10  
     
   In cases like this, I was wondering if having both tags might be a bit redundant. From what I understand, ref is usually meant for a short reference code rather than a longer text like Bengeo Rural Footpath 10, so I thought prow\_ref alone might be enough here.  
     
   What is the generally accepted practice in the UK? Is it fine to remove the ref tag and keep only prow\_ref, or can it be shortened instead? Or is there a specific reason to keep both?  
     
   Thank you in advance for taking the time to look into this and share your advice.

2. **发言者 2**（回复第 1 条）：It isn’t normal to add both prow\_ref and ref for what is just really a prow\_ref.  In your example I’d ask the mapper why they did that.

3. **发言者 3**（回复第 1 条）：I previously left a comment for this user asking them not to add ref here: Changeset: 179821732 \| OpenStreetMap  
     
   I have been removing ref where I see it duplicating prow\_ref. It’s possibly some form of tagging of the renderer as ref is more likely to be surfaced by data consumers.

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：From formal verification to bug-finding in CHERIoT

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：how can i use a wait function in my script  
     
   Godot Version  
   Godot v4.7.2.stable  
     
   Question  
   Hello, i'm a beginner and i need some way to make a cooldown for stamina regen, i need it to regenerate a certain amount at a time but i can't figure out how to do it in an efficient way whenever the stamina goes below a certain amount, i tried using a Timer but i'm really struggling with it, any help would be appreciated.

2. **发言者 2**（回复第 1 条）：Could you show us what your current setup is? The code, the hierarchy, etc :slight\_smile:

3. **发言者 1**（引用未收录发言）：var stamina: float = 100:  
     
   set\(stamina\_value\):  
     
   stamina = clamp\(stamina\_value, 0, 100\);  
     
   func \_process\(delta: float\) → void:  
     
   if stamina &lt; 100:  
     
   stamina \+= delta \* 10;  
     
   i got it working so thanks alot, only issue now is that now the stamina becomes a float when it regens, i need it to be an int value cause this is for a dash system that consumes and then regenerates stamina

4. **发言者 1**（回复第 3 条）：thinking about it now i could also try having 3 charges of sorts that get depleted and recharge over time rather than a dynamic stamina system

5. **发言者 3**（回复第 3 条）：Why do you need it to be an int? Almost every single game I know, Stamina bars are a float since it’s easier to deal with and have a smoother curve you can represent on a progress bar. Having it be an int would require a lot of back and forth conversions.  
     
   Could you tell us why you need it to be an int exactly?

6. **发言者 1**（回复第 5 条）：at the moment i’m trying to make a dash with a cool down and limited dashes so i was thinking to have an int based system cause its only big bursts of stamina that needs to be removed and regenerated, i also realize that in that case i may as well just use a normal cooldown rather than a stamina based system

7. **发言者 3**（回复第 6 条）：But that doesn’t really answer the question of why it needs to be an integer vs. a float.

8. **发言者 1**（回复第 7 条）：DANG i’m so sorry for wasting all of your guys time, i just realized thats exactly how dashing works in most games anyway, i can’t believe it took me so long to realize, thanks for taking your time to try and help though

9. **发言者 1**（引用未收录发言）：thanks so much for helping me out, sorry for wasting your time

10. **发言者 1**（回复第 1 条）：thank you so much to everyone that helped

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Help adjusting the cue lever arm on Ekos SE/LP12  
     
   Does anyone have any advice/hints/procedures for setting the cue lever height on an Ekos SE. The main post on mine \(the cylinder that attaches to the base of the arm\)  went out of its original position and I am having quite a difficult time getting it in the right vertical position again. Is there another adjustment I can make \(other than the hex screw that holds the post in place\) or is it just a question of trial and error? Thanks for your help.

2. **发言者 2**（回复第 1 条）：Nobody helped?  So many lp12 owners here. 某参与者 ?

<!-- samples:end -->

