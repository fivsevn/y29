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

<!-- intake-request:intake-06d7d9e9cc8f4646b7c283d4c31241d6 -->
<!-- samples:start -->

采集时间：2026-11-27 12:07:47（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Does only the DIYables 3.5 inch TFT screen shield work for the Arduino UNO R4 Wifi or is there any others?  
     
   Is there any other screen shield that is touchscreen and has colors and the screen fits perfectly onto the Arduino UNO R4 Wifi like a normal shield? Other than the DIYable one, and there like any on TaoBao or Shopee? Please let me know\! Thanks...

2. **发言者 2**（回复第 1 条）：Are there others? Yes.  
     
   2.4“ and 2.8”   with the ILI9341—you'll have to search for them yourself to see if the shops shown carry them, since they cover up the Uno and are rarely purchased.  
     
   The ones shown should work with the Adafruit ILI9341 library.  
     
   All others are 3.3V, mostly SPI displays; if you get an ESP8266 or ESP32, there won’t be any problems, and displays range from 1.2“ to 7”.

3. **发言者 1**（回复第 1 条）：But screens made for Arduino UNO R3 is mainly for R3 and processor is slower as the UNO R3’s processor is slower compared to UNO R4 Wifi. The UNO R3 is 8-bits and clock at 16 mhz while UNO R4 Wifi is 32-bits and clock at 48 mhz.

4. **发言者 2**（回复第 3 条）：So what? The ILI9341 can run at more than 48 MHz.

5. **发言者 1**（回复第 1 条）：But screen will be slower - Said by Chat GPT when I ask it :face\_with\_raised\_eyebrow:

6. **发言者 2**（回复第 5 条）：Chat GPT still has a lot to learn. It's not the ILI's fault—it's just that the library is very slow. As I wrote, get an SPI display and a level shifter, and it'll work better.

7. **发言者 1**（回复第 1 条）：But the problem is that now the Arduino UNO R4 Wifi cannot be pushed to its 32-bit and 48 mhz limit.

8. **发言者 1**（引用未收录发言）：Ok thanks :smiley: But where do I buy the 3.5 inch one? The page shows only the product description and did not tell me where to buy it. One question : does it have colours and is it touchscreen? I don’t think it’s touchscreen. If it is not, can you find me one that is touchscreen? Thanks

9. **发言者 2**（回复第 8 条）：Search on AliExpress for   3.5-inch 480x320 TFT LCD module display with ILI9488 controller for Arduino Uno and Mega2560 boards, with or without touch panel

10. **发言者 2**（引用未收录发言）：\[图片省略\] 某参与者:  
     
   For both types, I use the moononournation/Arduino\_GFX graphics library \(listed as "GFX\_Library\_for\_Arduino" in the Arduino IDE Library Manager\).  
     
   Arduino GFX isn't for beginners; to learn, start with Adafruit or the LCD Wiki, and then move on to something better.

11. **发言者 1**（回复第 9 条）：Can you find me a trustable one?

### 讨论 2

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Sprite Spawning  
     
   Godot Version  
   Godot. 4.7.2  
     
   Question  
   Alright im making a game where all you need to do is dodge a bunch of obstacles inside of this box.  
     
   I have a cannon sprite that i want to spawn only one my wall tiles\(Not including corners\) and always point inwards. Not \(0,0\) but more like if it was on the right wall, it would point left, top wall, pointing down, and left wall pointing right, etc.  
     
   Can someone help explain it to me?

2. **发言者 2**（回复第 1 条）：Iterate through tiles and determine tile type. The type maps to one of 4 cardinal direction vectors. Use that vector to calculate the spawn position offset from the tile center. Also pass it to look\_at\(\) function to aim the cannon in that direction.

3. **发言者 3**（回复第 1 条）：as 发言者 2 said you need to iterate, also you might need more sprites per each direction if you want it to look good

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How WinHelp files work

2. **发言者 2**（回复第 1 条）：Huh, I always assumed they were RTF files with a little bit of additional structure.  I had no idea they were so complex.

3. **发言者 3**（回复第 1 条）：Nice\!  
     
   I'll have to try compiling it to WebAssembly and hooking it up alongside \[CHMate\]\(\[链接隐去\] the next time I'm working on my experiments to build a more workflow-appropriate frontend for \[Recoll\]\(\[链接隐去\] to see how close I can get to \[Zeal\]\(\[链接隐去\] for ancient retro-hobby reference materials.

4. **发言者 4**（引用未收录发言）：Isn't the quintessential "filesystem in a file" macOS installer packages?

5. **发言者 5**（回复第 2 条）：They're built from RTF files with Help Workshop; most of the authoring is basically done in Word abusing various features like page breaks and footnotes for things that are not in the pages of the help file itself, and the Help project file for metadata like a TOC and index.

6. **发言者 6**（引用未收录发言）：One pertinent example for programmers: PDBs \(designed by Jan Gray\) are a \_transactional\_ file system in a file\! You can update a PDB file in place and if the writer crashes mid-transaction you can roll back to the clean previous state.

### 讨论 4

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Weekly builds for Natron 2.6  
     
   Hello 某社区\! :wave:  
     
   Here at Natron we’re proud to announce that the compositor is making a comeback after quite a long time\! :partying\_face: Work has been poured to refloat the project and we’d like to hear what would you say after you try it. Thanks to a brilliant coding agent we could pick up pace for a newer release. Yet we still need your good ol’ valuable feedback, as that is indispensable for a nice, well rounded version of Natron. :blush:  
     
   At the moment we’re trying to figure out things with GitHub Workflows as weekly downloads do not yet appear under the releases tab. :flushed: As of now, nigthly.link will suffice, so excuse us for that. We’ll keep you up to date when we setup a much proper release channel in GitHub. :grin:  
     
   Link to the nightly binaries here.

### 讨论 5

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

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Will We Head to Deflation?  
     
   Hello folks,I support AI advancements and have always believed they will create an entirely new class of jobs and dramatically improve productivity.But if we don't create enough new jobs to replace those lost to AI, how do we prevent deflation? We could be looking at the biggest deflationary period in history.Just printing more money won't be enough when the deflation is productivity based, will it?Nobody can predict what lies ahead, especially with disruption happening at such an unprecedented pace.Where do you see things heading? What new jobs could emerge? Robotics, perhaps?

2. **发言者 2**（回复第 1 条）：Miltech and military are really booming today.

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Same cable RCA RCA v Din Din  
     
   Just purchased an older Chord Cobra 3 RCA RCA to go from my Ndac into the RCAs of my 252  
     
   Its a bit different to the lavender bit smoother and a bit more bloom which suits my system well  
     
   If I can get the Din Din version what differences would you expect. Also going to try a Hiline shortly as well from my dealer

2. **发言者 2**（回复第 1 条）：DIN is much better.

3. **发言者 3**（回复第 1 条）：RCA Is much better. :wink:

4. **发言者 2**（回复第 3 条）：You are wrong :sweat\_smile:

5. **发言者 3**（回复第 4 条）：No I’m not :rofl:

6. **发言者 3**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   Also going to try a Hiline shortly as well from my dealer  
     
   Think I’d pass on the Hiline they have a reputation of self destruct. :scream:

7. **发言者 4**（回复第 6 条）：But they do sound good…

8. **发言者 5**（回复第 1 条）：Many many years ago when I was demoing a used CDS3 I was contemplating a Chord Sarum when the dealer who could have encouraged the Chord, the more expensive, demonstrated quite clearly that the Hiline was the most organic by far.  And further in 20 years of owning Naim stuff I’ve never found an interconnect, speaker cables slightly different, that improves upon Naim’s own.

9. **发言者 1**（回复第 1 条）：Cheers Lindsay. Its the organic sound I am after. I have seen on here before that the same cable din din or rca does sound different- the rcas being smoother and the din having more prat. I never really tried the lavender in the past wity ndx dac etc but now using it and its a nice balance  
     
   Gonna give the hiline a go and see if I can pick up a cobra din din

10. **发言者 6**（回复第 8 条）：Many years ago when I was using an Ndac into 82/HiCap/250, I had a Hiline which had “ceased to function” and, whilst awaiting its repair, happened to hear what was then called a Chord Solstice \(shortly after renamed Sarum\). It was a revelatory moment. Bought the Solstice.  
     
   Other than that, I do agree that a Din-Din is better than an RCA version.

11. **发言者 7**（回复第 1 条）：XLR - XLR or go home. :wink:

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：SCEE Overlay maxspeed  
     
   Hallo  
     
   Ich möchte mir in SCEE ein Overlay für maxspeed einrichten  
     
   Leider komme ich alleine nicht weiter.  
     
   Weiss jemand wie das geht und kann mir sagen, was ich da eingeben muss.  
     
   Bei mir ist alles rot - es wird nicht erkannt welcher way was hat und welcher nicht.  
     
   Gruss  
     
   发言者 1  
     
   \[图片省略\]Screenshot\_20261126\_172956\_de.westnordost.streetcomplete.expert1080×2340 241 KB

2. **发言者 2**（回复第 1 条）：Funktioniert das?  
     
   \[链接隐去\]

3. **发言者 1**（回复第 2 条）：Funktioniert leider nicht bei maxspeed  
     
   Unklar ist auch, was im unteren Bereich einzutragen ist..  
     
   Hat jemand eine Idee oder hat jemand ein maxspeed Overlay bei sich

4. **发言者 3**（回复第 1 条）：Versuche es mal damit:  
     
   highway ~ motorway\|trunk\|primary\|secondary\|tertiary\|unclassified\|residential\|motorway\_link\|trunk\_link\|primary\_link\|secondary\_link\|tertiary\_link

5. **发言者 1**（引用未收录发言）：Du hast recht - es war tatsächlich eine Leerzeile drin. Jetzt geht es. Danke

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：坐标：西安  
     
   学历：本科 （网络教育）；专科（全日制）；  
     
   1. 9k 单休 通勤往返 2 小时  
      
   2. 12k（总包） 996 通勤往返 2 小时  
     
   3. 8k 966 通勤往返 30 分钟  
     
   说明：12k 的总包指的是公司应该交的社保公积金都包含在内

2. **发言者 2**：你们说总包是包社保公积金吗

3. **发言者 3**：3 永远只选工作时间最少的

4. **发言者 4**：钱多事少离家近，  
   第三个占了两个，  
   要钱就选 2，要舒坦就选 3

5. **发言者 5**：上面不是有个招前端的。你看看那个帖子 也是西安的

6. **发言者 6**：结合上面网页的说明。我提一点，考虑下公司业务场景，是否容易解散之类的

7. **发言者 7**：都是钱少的情况下选事少的。钱多事少总得选其一

8. **发言者 8**：真是造孽啊 怎么给那么少 不过现在前端还能找到就不错了

9. **发言者 9**：我的朋友，你看问题的角度刁钻啊。你要看看这些公司什么行业，有没有前途。你放在这里比较，应该这几个在你心里差不多的。你看看公司前途，别干几个月就倒闭了，大环境不好

10. **发言者 10**：3 算起来时薪比另外两个高把

11. **发言者 11**：选 3，单休约等于不休，996 早死两年，钱差的又不多，小命要紧

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Hail the Buoyant  
     
   A model based on the religious fanatics that are obsessed with becoming buoyant in MADNESS: Project Nexus \(2021\)  
     
   \[图片省略\]发言者 1-madness-project-nexus-zealot-abbot-011920×1080 297 KB  
     
   \[图片省略\]发言者 1-madness-project-nexus-zealot-abbot-021920×1080 292 KB  
     
   \[图片省略\]发言者 1-madness-project-nexus-zealot-abbot-031920×1080 289 KB  
     
   \[图片省略\]发言者 1-madness-project-nexus-zealot-abbot-042160×3840 4.46 MB  
     
   \[图片省略\]发言者 1-madness-project-nexus-zealot-abbot-ref3000×2883 829 KB  
     
   It’s believed that they come from the plethora of asylums that the NEXUS Core built in Nevada…but taken away by Dr. Crackpot, indoctrinated and conditioned to terminate all who oppose him or his faith. It’s probably the best case scenario… better than ending up as an Abomination I’ll tell you that much.  
     
   My take on a flagellant like this guy differs from the ones in-game. They’re mostly seen wearing bandit or miner outfits that makes them very generic aside from the prophets and gravediggers.  
     
   It’s been eons ever since I modelled tools of war so I chose simple designs.  
     
   Modelled, textured and sculpted in Blender  
     
   Rendered in Marmoset Toolbag  
     
   Credits  
     
   HardyNerdy - Animations and poses  
     
   Texas Steve - Armature

2. **发言者 1**（回复第 1 条）：\[图片省略\]

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[問題\] 發票全部沒中  
     
   有人跟我一樣  
   二零二六年九月十月發票全部沒中的  
   雖然大多數發票  
   我都交給別人了  
   但連續好幾期沒中  
   有點倒楣

2. **发言者 2**（回复第 1 条）：\+1

3. **发言者 3**（回复第 1 条）：超過兩年以上紙本跟雲端都沒再中過.

4. **发言者 4**（回复第 1 条）：我也是 運氣都全部用在股票上了

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：假设我寒假去北京，在不考虑花销的情况下，我需要做什么准备呢\( ﾟ∀。\)  
     
   比如景点门票或者什么

2. **发言者 1**：分享图片

3. **发言者 1**：分享图片

4. **发言者 2**：\( ﾟ∀。\)不考虑开销是吗？  
     
   \( \`д´\)σ预约包场人民大会堂

5. **发言者 3**：很多景点是提前七天/十四天预约的，多注意一下  
     
   如果要去国博/军博的话最好留出单独一天\( ﾟ∀。\)

6. **发言者 4**：预约北京饭店\( ﾟ∀。\)

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How to close an tab \(file\) in IDE 2.3.11 without deleting from drive?  
     
   How can I close a file in the IDE without deleting the file from the hard drive?  
     
   When selecting the symbol "..." it's allowing me to delete a file \(message "move file to trash"\) but not just closing it from the IDE.  
     
   The tab's themself don't have a closing symbol \("X"\).  
     
   Thanks for clarification.

2. **发言者 2**（回复第 1 条）：The IDE will show a tab for all files of valid types that are present in the sketch directory.  Because of that you cannot close a tab in the IDE.  I suspect that this is intended behaviour to allow you to view, edit and search all of the files that will be used when you compile the sketch.  
     
   Why do you want to close a tab in the IDE ?

3. **发言者 3**（引用未收录发言）：\[图片省略\] 发言者 1:  
     
   three-dot menu doesn't have an option "Open Sketch in new Window"  
     
   IDE 2.3.11...  
     
   \[图片省略\]image1264×715 44.7 KB

4. **发言者 1**（回复第 3 条）：oops, I was talking about the three-dot menu on the "tabs" line.

5. **发言者 4**（回复第 1 条）：Same annoyance here. What works for me: I move the finished .h/.cpp files into a src subfolder inside the sketch - they stop showing as tabs but still compile. Only the .ino files have to stay in the root or they will not build.

### 讨论 14

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

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Omnigent — a meta-harness for building and running AI agents

2. **发言者 1**（回复第 1 条）：I have no idea whether this qualifies for a flagging or a flogging, or whether I've tagged it right, but it looks like a boon for those who use LLMs for coding.

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Into the Fires of Ancient Cosmic Destiny  
     
   I really struggled with this one. I threw module after module at the shot until the colours ran through my fingers like sand. At some point I just stopped.  
     
   Maybe the soundtrack helped or was part of the problem.  
     
   \[图片省略\]261020\_083344\_DSC093631999×1081 541 KB  
     
   261020\_083344\_DSC09363.ARW \(23.7 MB\)  
     
   5.7 XMP  
   261020\_083344\_DSC09363.ARW.xmp \(35.5 KB\)  
     
   This file is licensed Creative Commons, By-Attribution, Share-Alike.

2. **发言者 2**（回复第 1 条）：\[图片省略\]261020\_083344\_DSC093632999×3000 434 KB  
     
   261020\_083344\_DSC09363.ARW.xmp \(7.9 KB\)  
     
   XMP is from 5.7  
     
   In a rush, but something like this I think :grinning: :white\_large\_square:

3. **发言者 3**（回复第 1 条）：Lots of help from G’MIC’s simple dehaze and that led to some haloing issues so did a simple cleanup of that as well.   Also healed out a distraction.   :slight\_smile:  
     
   \[图片省略\]261020\_083344\_DSC093631616×1080 540 KB

4. **发言者 4**（回复第 1 条）：\[图片省略\]261020\_083344\_DSC093631980×1317 422 KB  
     
   261020\_083344\_DSC09363.ARW.xmp \(8.4 KB\)

5. **发言者 5**（回复第 1 条）：\[图片省略\]Fields\_PIX2046×2058 418 KB  
     
   I had to crop… Or else there is no subject and everything is far far away…

6. **发言者 6**（回复第 1 条）：\[图片省略\]261020\_083344\_DSC093631920×1134 1.02 MB  
     
   261020\_083344\_DSC09363.ARW.xmp \(37.1 KB\)  
     
   Thanks for sharing… :slightly\_smiling\_face:

7. **发言者 7**（回复第 1 条）：Unfortunately only at my laptop at the moment. Anyway I try it:  
     
   dt 5.7  
     
   \[图片省略\]261020\_083344\_DSC093632000×1194 401 KB  
     
   261020\_083344\_DSC09363.ARW.xmp \(21,7 KB\)

8. **发言者 8**（回复第 1 条）：Even when doing near to nothing except the basic I auto apply to a picture it already comes out as a very beautiful picture. What I added was switching off AgX and recalc the capture sharpen radius…  
     
   Will work on it tomorrow, now it looks like this…  
     
   \[图片省略\]261020\_083344\_DSC09363\_02036×1440 336 KB  
     
   261020\_083344\_DSC09363.ARW.xmp \(13.2 KB\)

9. **发言者 9**（回复第 1 条）：ART:  
     
   \[图片省略\]261020\_083344\_DSC093632800×1869 1.72 MB  
     
   261020\_083344\_DSC09363.ARW.arp \(12.2 KB\)  
     
   Greycard:  
     
   \[图片省略\]261020\_083344\_DSC093633200×2133 2.41 MB  
     
   261020\_083344\_DSC09363.ARW.gcd.txt \(17.6 KB\)

10. **发言者 8**（回复第 1 条）：And a final one in which I cropped,  manipulated a bit more and the colors.  
     
   \[图片省略\]261020\_083344\_DSC09363\_12381×1440 369 KB  
     
   261020\_083344\_DSC09363\_01.ARW.xmp \(28.6 KB\)

11. **发言者 1**（回复第 1 条）：I love the coloured gradients you guys got out of the sky, makes the whole image work so much better. Thanks :-\)\!

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Christmas Card Swap R5 Gallery  
     
   Christmas Card Swap R5  
     
   \[图片省略\]image472×661 68.7 KB  
     
   Swap Thread

2. **发言者 2**（回复第 1 条）：Probably owing to our proximity, I received my card from \[某参与者\] yesterday.  
     
   \[图片省略\]176371920×2550 964 KB  
     
   I love the way the words are shaped\!  He also tucked in a couple of fun extras.  
     
   Thank you\! :heart:

3. **发言者 3**（回复第 1 条）：I love how the words shape the tree. Lovely start to the gallery and the upcoming holiday season.

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How to gradually add vocab to Master\+?  
     
   I apologize as I’m certain this has been discussed before but I can’t find the thread. I really want to start incorporating master\+ for my vocab \(I’ve already done so for grammar\) but I’m worried I will have a deluge of over 1000 reviews if I do so. Is there any way to mark just a few items at a time as master\+ so I can space out the reviews?

2. **发言者 2**（回复第 1 条）：Sounds like they resolved this, but when I did the initial update all I was slated to get like 2000 reviews on one day and staff manually paced them out for me.  
     
   That is to say, even if it isn’t fixed, staff could help you out if it came down to it\!

### 讨论 19

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Footprint – Visual electronics learning, encyclopedia, and part search

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Michael Giles RIP  
     
   More sad news:  
     
       
         \[图片省略\]  
     
         the Guardian – 26 Nov 26  
       
     
       
         
     
   Michael Giles, co-founder and drummer of King Crimson, dies aged 84  
     
     The British musician brought deft playing to prog masterpiece In the Court of the Crimson King, then worked as a session musician with the likes of Bryan Ferry  
     
       
     
       
         
         
       
     
       
     
   Of the original lineup, only Fripp is left now, a testament to the restorative powers of music, champagne and cheesecake.

2. **发言者 2**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   music, champagne and cheesecake.  
     
   And Toyah.

3. **发言者 1**（回复第 2 条）：Indeed. I did think of adding the love of a wife whom he clearly adores to that list.

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Hilfe bei Relation / Multipolygon im See  
     
   Hallo zusammen,  
     
   bei der Bearbeitung von Relationen \+ Multipolygonen bin ich wieder am verzweifeln. In einem See möchte ich eine Fläche als “Wald” einzeichnen und dieses als Relation zum See einfügen. Egal wie ich das Gewässer und Wald Stück mit den Relationen verknüpfe, es bleibt falsch :frowning:  
     
   Die Wiki Seite zu dem Thema habe ich mir bereits angesehen. Das Hinzufügen einer Multipolygon Relation im iD Editor funktioniert anscheinend anders oder ich setze es ungewollt in iD falsch :smiley:  
     
   Kann mir bitte jemand erklären, wie genau eine Relation See \+ Waldfläche sauber hinzugefügt wird? Wie muss die Relation im äußeren Ring \(See\) eingestellt sein und wie muss die Relation im inneren Ring \(Wald\) angegeben sein. Als Beispiel kann ich mit dem Stück hier Changeset: 192444563 \| OpenStreetMap dienen.  
     
   Im Editor sieht es grafisch meiner Meinung nach gut aus, auf der OSM Karte jedoch nicht.  
     
   \[图片省略\]Screenshot 2026-11-25 1214221349×642 196 KB  
     
   \[图片省略\]Screenshot 2026-11-25 121636771×540 19.2 KB  
     
   Vielleicht hat jemand einen Tipp oder kann eine Schritt für Schritt Anleitung zusammenfassen :slight\_smile:

2. **发言者 2**（回复第 1 条）：Die Insel ist im Uhrzeigersinn gemappt, sie muss jedoch im Gegenuhrzeigersinn gemappt werden, siehe \[链接隐去\]  
     
   Das dürfte das Problem sein.

3. **发言者 3**（回复第 1 条）：Richtung ist hier egal.  
     
   Problem war inner/outer in Relation. Ist korrigiert \(mit JOSM\).

4. **发言者 1**（回复第 1 条）：Und wo genau liegt jetzt mein Fehler? Bei welchen Objekt muss ich die Relation drehen? :locomotive:  
     
   Edit: Vermutlich habe ich die Relation als zu kompliziert angesehen und es reicht aus, auf dem inneren Multipolygon eine Relation zum äußeren zu setzen :smiley:

5. **发言者 4**（引用未收录发言）：\[图片省略\] 发言者 3:  
     
   Der Wald außen rum ist als forest eingetragen, auf den Inseln als wood, das sollte man mMn vereinheitlichen.  
     
   Warum? Auf Inseln wird normalerweise kein normaler “Forstbetrieb” stattfinden.  
     
   Richtig wäre es aber wahrscheinlich, wenn man das Ufergehölz um den See in diesem Fall auch als “wood” taggen würde \(wobei es teilweise am Südrand sogar auch als scrub durchgehen könnte\).

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：1 年前从老东家工作了十年拿补偿走了，后面又工作了，其实还是一直留恋老东家。  
     
   中间有几次能回去的机会，但是，因为新的招聘岗位要求，导致没回得去，后面也逐渐不想这个事了。  
     
   因为之前曾经工作城市的原因，目前更换了一个城市在工作。  
     
   转折和这个“心动”来至于前几天，一个曾经单位的哥们，说他今年岗位上去了，即将变成区域负责人了。  
     
   他需要一个熟悉的人能帮他一起站台，给我电话问我的情况，要不要回去，我是突然觉得机会又来了。  
     
   也不知道最后能不能成功，其实还是有一些期盼，如果成功了，毕竟还能回到家乡和家里人身边工作了。

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：GPU Village  
     
   A graphics card, reimagined as a world of its own :herb:  
     
   What if there was a whole little world hidden behind the power of a PNY GeForce RTX 5080 graphics card?  
     
   \[图片省略\]GPU-1540×720 656 KB  
     
   \[图片省略\]GPU-2540×720 503 KB  
     
   \[图片省略\]GPU-5540×720 410 KB  
     
   \[图片省略\]GPU-3540×720 459 KB  
     
   \[图片省略\]GPU-7540×720 528 KB  
     
   \[图片省略\]GPU-4540×720 365 KB  
     
   \[图片省略\]GPU-6540×720 383 KB  
     
   \[图片省略\]GPU-8540×720 433 KB  
     
   \[图片省略\]GPU-9540×720 388 KB

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Non itchy wool possibly merino  
     
   I have very dry, sensitive skin and I have found many wool garments simply too itchy to bear.  I will mention here that I am autistic - we have lots of sensory issues.  I remember also the garments my mum knitted me as a child and how I couldn’t wait to remove them\!  
     
   My late mother was a huge fan of Merino wool, but I stuck with my acrylic or cotton.  I decided to be daring and buy some Merino.  My most sensitive area is my neck and I have held this yarn around my neck and, surprise surprise it doesn’t  itch\!  
     
   This means that at some point I can make a “luxury” cardigan.  I bought it on vinted.  I am now worrying it’s from China as it has no country of origin on.  If that’s the case, it may not be merino\!  Does anyone know which retailers sell this as I’m curious.  I would also like you to show me your favourite Merino, which is hopefully on sale in UK.  
     
   \[图片省略\]422391080×2340 346 KB

2. **发言者 2**（引用未收录发言）：Cashmere might be an issue because many people are sensitive to goat fibers. It feels ultra soft to the hand but might still be itchy. Cashmere doesn’t seem to be an issue for me; I can knit with mohair but can’t wear it.

### 讨论 25

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：想在体育板发自己减肥  
     
   但是感觉现在岛民都集中在中医  
     
   加上我也想被人回复就发在中医了  
     
   发点jp谢罪  
     
   \( \`д´\)红豆泥斯密马赛

2. **发言者 1**：今天是下午饭之前上称95kg  
     
   早上没吃  
     
   中午吃的西红柿鸡蛋盖浇饭加鸭腿去皮  
     
   晚上吃的青椒炒鸡蛋盖浇饭加鸭腿去皮  
     
   还去健身房锻炼了一个小时，爬坡鸡15分钟高位下拉45分钟  
     
   锻炼应该用组来计数但是我没记

3. **发言者 1**：分享图片

4. **发言者 1**：分享图片

5. **发言者 2**：jp是tm谁拉的草莓塔

6. **发言者 1**：我还会坚持记录下去的  
     
   肥哥们还请看在jp的份上监督我

7. **发言者 1**（回复第 5 条）：\[引用第 5 条\]  
     
   不觉得很色吗

8. **发言者 3**：穿刺公来了

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Need help with a circuit of controll with Proteus software  
     
   I would like to design an electrical circuit that meets the following specifications:  
     
   \[图片省略\]Screenshot 2026-11-26 1028281055×541 166 KB  
     
   The circuit must have two inputs and two outputs. It receives two signals from an external Arduino.  
     
   If both input 1 and input 2 are LOW, outputs 1 and 2 must also be LOW.  
     
   If input 1 is HIGH and input 2 is LOW, output 1 must be HIGH and output 2 must be LOW.  
     
   If input 2 is HIGH and input 1 is LOW, output 2 must be HIGH and output 1 must be LOW.  
     
   If both input 1 and input 2 are HIGH, the circuit must disable both signals, so that outputs 1 and 2 are both LOW.

2. **发言者 2**（回复第 1 条）：Is there any reason why you would not handle the logic using an Arduino rather than using hardware ?

3. **发言者 3**（回复第 1 条）：\[图片省略\]image852×773 4.56 KB

4. **发言者 1**（回复第 3 条）：Thank you for your suggestion, but it didn't work. At both outputs, I can still see both signals present. However, I want both signals to be disabled when both inputs are active simultaneously.  
     
   \[图片省略\]Screenshot 2026-11-26 1240211120×531 160 KB

5. **发言者 1**（引用未收录发言）：Thank you, but when I tested in Proteus, I found that both signals were still present at the outputs, and neither of them was turned off. What do you think \!

6. **发言者 3**（回复第 5 条）：\[图片省略\] 发言者 1:  
     
   What do you think \!  
     
   I think you want something different from what you described.  
     
   In what case do you want both signals to be off?

7. **发言者 3**（引用未收录发言）：\[图片省略\] 发言者 1:  
     
   I want both signals to be OFF only when both inputs are active \(HIGH\) simultaneously  
     
   Are you saying that with my circuit if you set both In1 and in2 HIGH that one or both of the outputs are HIGH?  
     
   \[图片省略\]image500×600 3.72 KB

8. **发言者 1**（回复第 7 条）：\[图片省略\] 发言者 1:  
     
   I tested  
     
   yes i tested, two signals are ON

9. **发言者 3**（回复第 8 条）：I don't use proteus software but I just tested the circuit with an online simulator and when both inputs are HIGH, both outputs are LOW. So I think there is something wrong with proteus.  
     
   \[图片省略\]image866×429 55 KB  
     
   The blue wire indicates the signal is HIGH and as you can see BOTH LEDs are OFF \(LOW\)

10. **发言者 1**（回复第 9 条）：Yes, it works.  
     
   thank's my freind :grinning\_face:

11. **发言者 4**（回复第 10 条）：hello  
     
   another schématic, same result:  
     
   \[图片省略\]Capture d'écran 2026-11-26 154947736×594 8.1 KB

### 讨论 27

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Tool Functions Through Animation Player  
     
   Godot Version  
   4.7.2  
     
   Question  
   Is there any way to call a function in editor through a animation player?  
     
   I am using an Animation Player to control the spawning of nodes in game at certain timestamps but I’d like to preview where they’d spawn in the editor. I have an AnimationPlayer with a call\_method track which adds a node as a child. I’m hoping that I can get it to call the function in editor as opposed to only in game.  
     
   Thank you for your help\!

2. **发言者 1**（引用未收录发言）：Yes, I have tried. The animation player, the node that does the spawning, and the spawned in node are all tool scripts.  
     
   The animation player is calling a function in the root node which runs add\_child\(\)

3. **发言者 2**（回复第 2 条）：\[图片省略\] 发言者 1:  
     
   The animation player is calling a function in the root node which runs add\_child\(\)  
     
   But it’s not literally adding it… Observably at least?  
     
   But the method is actually invoked, this you confirmed?  
     
   Have you tried this:  
     
   if Engine.is\_editor\_hint\(\):  
     spawned\_in\_node.owner = get\_tree\(\).edited\_scene\_root  
     
   This is needed for your node to appear in the Scene Tree.

4. **发言者 1**（回复第 3 条）：No, no method is called even when I just have a print unfortunately

5. **发言者 2**（回复第 4 条）：Hm. I’d have to reproduce this, but I do know that is your func takes required arguments, the animationplayer won’t call it. But if it prints at runtime and not in editor something else must be going on..  
     
   Try a minimal reproduction project to see if printing will work there… I can’t get to a laptop to try this for myself rn.  
     
   Creative thought: give the AnimationPlayer a script with \[某参与者\] on top.

6. **发言者 1**（回复第 5 条）：The animation player does have a tool script because it’s being used to control playing a song at the timestamp of the animation. I’ll create a mrp when I get access to my computer

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：In defense of lock poisoning in Rust \(2025\)

2. **发言者 1**（回复第 1 条）：This was previously posted a year ago: \[链接隐去\]  
     
   But I wanted to resubmit it because I found it a compelling counter-argument to \[链接隐去\]

3. **发言者 2**（回复第 1 条）：I think we should both get \`Poison\` and make \`std::sync::poison::Mutex\`'s \`lock\` panic on poison tbh  
     
   I wonder if \`std::sync::Mutex\` should be removed in favour of users choosing explicitly if they want poisoning or not tho

4. **发言者 3**（回复第 3 条）：Identifiers in \`std\`/\`alloc\`/\`core\` cannot be removed \(only marked as deprecated\) because they need to remain accessible so code written against newer editions can name types needed to interoperate with code written against older editions.

5. **发言者 4**（回复第 3 条）：&gt; I think we should both get Poison and make std::sync::poison::Mutex's lock panic on poison tbh  
     
   See my \[post from a day ago\]\(\[链接隐去\] about why this would be a pretty terrible outcome.

6. **发言者 5**（回复第 5 条）：I don’t see any benefit to keeping poisoning but making lock\(\) panic when everyone not interested in \(properly or improperly\) handling poison does .lock\(\).unwrap\(\) or .lock\(\).expect\(\) today. In addition to always taking the slow path, it is just churn for the sake of churn.  
     
   Edit: this is not an endorsement of letting lock\(\) silently continue on poison\!

7. **发言者 4**（回复第 6 条）：&gt; when everyone not interested in \(properly or improperly\) handling poison does .lock\(\).unwrap\(\) or .lock\(\).expect\(\) today  
     
   But everybody who does that, realizes sooner or later that they need to do \`.lock\(\).unwrap\_or\_else\(\|poison\| poison.into\_inner\(\)\)\`. That's also what the standard library does\!

8. **发言者 4**（引用未收录发言）：Well I can tell you that in 15 years of Rust I have only ever been bitten by the poison system and not once saved. And in that post, I showed you some examples of other projects and the general trend towards not using poisoning.  
     
   YMMV but really I do not know of a lot of evidence that supports that poisoning helps in any capacity but I have plenty of evidence that it creates unstable services.

### 讨论 29

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：A Little Boo  
     
   I made this ghost doll for 某参与者’s daughter as part of the Mystical swap. She’s since been named Lucy and is living her best afterlife.  
     
   \[图片省略\]20261104\_010906960×1280 451 KB  
     
   \[图片省略\]20261104\_0109381920×2560 1.06 MB  
     
   Lucy was made using a vintage linen table runner I picked up at a fleamarket several years ago. It has gorgeous colors and came already embroidered and with the crocheted edges. I made her bow and shoes with felt.  
     
   Process pics:  
     
   \[图片省略\]20261103\_0841211920×2560 1.66 MB  
     
   \[图片省略\]20261103\_2153591920×2560 1.27 MB  
     
   \[图片省略\]20261103\_2156281920×2560 1.32 MB  
     
   \[图片省略\]20261104\_0045221920×2560 1.8 MB

2. **发言者 2**（回复第 1 条）：It’s adorable\!

3. **发言者 3**（回复第 1 条）：What a cute and creative upcycle of vintage linens.

4. **发言者 4**（回复第 1 条）：Aww so cute and I love the upcycling\!

5. **发言者 5**（回复第 1 条）：OMG that is adorable\!\! :heart\_eyes:

6. **发言者 6**（回复第 1 条）：WHAAAAA\!? This is adorable and a genius way to repurpose vintage embroidered linens\! And you’ve made the most of the runner with your placement of the embroidery and her little face. ACK\!  
     
   I have recently gone down a similarly themed road by stamping ghosts onto printed cardstock so they appear to be using non-white sheets and this is really speaking to my whimsy\!

7. **发言者 7**（回复第 1 条）：Love love love\!

8. **发言者 8**（回复第 1 条）：She is just the best\! Those Mary Janes poking out is such a great touch.

9. **发言者 1**（回复第 1 条）：Thank you, 发言者 5, 发言者 8, 发言者 2, 发言者 7, 发言者 4, 发言者 3\!  
     
   发言者 6 - thank you\! I love your little ghosts, they’re so fun.

10. **发言者 9**（回复第 1 条）：Could she be any cuter\!?\!\! The shoes are killing me\!

11. **发言者 1**（回复第 1 条）：Thanks\! She was a fun, quick project.

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Show Shuffle: Keine Ahnung  
     
   Moin,  
     
   es gibt ein neues Show Shuffle Format:  
     
                 
     
   Ein Moderator, drei schlaue Köpfe im Ratepanel und jede Menge absurde bis nerdige Fakten-Fragen. Zugegeben, dieses Konzept kommt dem einem oder anderen vielleicht bekannt vor. Heute widtmen sich Lars Eric Paulsen, Tim Heinke, Mark Oliver Lehmann und Florentin Will den kleinen und großen Fragen des Nischenwissens. Hat hat GTA mit der Preis ist heiß zu tun? Wofür steht der gründe Code in Matrix? Durch lustige Knobelei und klägliches vor sich hin raten, versuchen unsere Ratefüchse der Lösung näher zu kommen. Schickt uns in den Kommentaren eure Nerdfragen und viel Spaß bei der Folge\!

2. **发言者 2**（回复第 1 条）：Oh, Genial Daneben?  
     
   Hatte ich schon öfter gedacht, dass das eine einfach zu adaptierende Sache für RBTV sein könnte.  
     
   Wäre ja vielleicht sogar mal mit Hennes Bender oder so möglich

3. **发言者 3**（回复第 2 条）：Ich meine es gab vor Urzeiten sogar mal ein Almost Plaily was ähnlich war, zudem die Idee schon sehr früh mehrere Male vorgeschlagen wurde von der Community :beanjoy:  
     
   Vlt. könnte die Community ja Fakten einschicken?

4. **发言者 1**（回复第 3 条）：Ja, die Community kann Fakten schicken und die Almost Plaily Folge hieß damals „Clever Vorbei“:

5. **发言者 3**（回复第 4 条）：Oh, danke fürs verlinken\! Hab kurz durch die AP Playlist geklickt, aber hab das auf die Schnelle nicht gefunden.

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Feedback on My Personalized Career Development App for People in Tech  
     
   Hi Everyone,I built 发言者 1 \(\[链接隐去\] by creating an Agentic OS on top of tech job postings. It provides job market insights, career advice, next-best action, learning materials, CV optimization, interview prep, and a community.I received positive feedback from close circles and would love to get unbiased feedback from this community. Please check it out and let me know what you think. All feedback is welcome.Thanks\!\!

### 讨论 32

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Connecting a TAG MCLAREN PA20R to NAP 250 new classic  
     
   So I creating a second system for when I’m kicked out of the listening room when the family comes home over Christmas.  
     
   I have a Tag maclaren pre amp and since buying some NP 350’s and 250 going spare.  
     
   Not sure how to connect them is it just a normal RCA cable with XLR’s on the other end or a specific arrangement. I note the Tag has Balanced outputs but not sure if they are connected.  
     
   I found a manual that says  
     
   " As an option, the PA20R can be ﬁtted with transformers.  
     
   Please contact your retailer if you require this option. If you do not have the transformer-coupled, balanced output option, the XLR sockets labelled OUTPUT 3 left and right are  
     
   not connected and cannot be used  
     
   When the transformer-coupled, balanced output option is installed, you can use the XLR sockets labelled OUTPUT 3 on the back panel of your PA20R. The output uses two XLR sockets"  
     
   I bought mine second havd many years ago so have no idea if it’s fitted. But If so can I just use Naim XLR cables that came with my NAP 250?

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Tägi vai tunniste?  
     
   Mikä on mielestäsi parempi käännös englanninkieliselle termille tag?  
     
   tunniste \(esim. “aseta viivalle tunniste natural=water”\)  
     
   tägi \(esim. “aseta viivalle tägi natural=water”\)  
     
   0  
   voters

2. **发言者 2**（回复第 1 条）：“Tägi” \(tai “tagi”\) ei ole oikeastaan käännös vaan aika ilkeä anglismi, mutta siitä huolimatta sopii jostain syystä omaan suuhun paremmin kuin “tunniste.” Ehkä näitä voisi pitää synonyymeina ja viljellä sellaisina?

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：想给孩子做个不一样的五岁生日祝福，就折腾了一个纸艺风格的视频。这次让小朋友和超级飞侠一起出场，成品 10 秒，放下面了。  
     
   \[\[图片省略\]\]\(\[链接隐去\]  
     
   \[点击看完整视频\]\(\[链接隐去\]  
     
   前面试了好几版，有的变成普通卡通，有的配音太像播报。这版比较接近我想要的感觉了。  
     
   把这套流程整理成了「纸艺生日动画创作助手」，刚通过 WorkBuddy 审核。上传照片，告诉它年龄和想要的角色，先看纸艺形象，再做视频。  
     
   \[图片省略\]  
     
   助手售价 5 元，购买后不限调用次数；制作视频需要视频生成工具。  
     
   在 WorkBuddy 搜索「纸艺生日动画创作助手」就能找到。大家看看效果怎么样。

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Piwigo Fails to update  
     
   What app is this about, and its version: Piwigo 16.5.0~ynh1  
     
   What YunoHost version are you running: 12.1.43  
     
   What type of hardware are you using: Old laptop or computer  
     
   Describe your issue  
   Good morning.  
     
   I was offered an update to Piwigo from 16.4.0~ynh1 to 16.5.0~ynh1, however it failed pretty much early into the update.  
     
   I’m not an expert, but reading the log, it would suggest that the repository is not available?  
     
   Many thanks for your help.  
     
   Dj  
     
   Share relevant logs or error messages  
   \[链接隐去\]

2. **发言者 2**（回复第 1 条）：It doesn’t work for me either.

3. **发言者 3**（回复第 1 条）：Based on the log it’s an upstream \(infra\) issue, there’s nothing more to do than to try again later.

4. **发言者 1**（回复第 3 条）：Indeed yes, I had an idea that it might be the case, but just wanted to check.  
     
   I’ll tray again later today.  
     
   Many thanks  
     
   Dj

5. **发言者 1**（回复第 2 条）：Should be working now… Just done an update…  
     
   Dj

6. **发言者 1**（回复第 3 条）：Yep.. Working, Just tried it by chance, and it worked  
     
   Thanx  
     
   Dj

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Need help with rigging/ armature bending the wrong way  
     
   Need help with armature stuff since I’m fairly new.  
     
   When I set my shin bone to 90 degrees the resting pose is correct and the legs bend correctly when I bring my character down. But when I want to pose the leg a bit far out it bends backwards  
     
   When I set it to -90 degrees, the opposite happens and the resting position is inverted so when I bring my character down it bends the wrong way but im able to pose the leg correctly.  
     
   Help is appreciated :slight\_smile:  
     
   Link to video since im a new user  
     
       
     
         \[链接隐去\]  
       
     
       
           
     
   2026-11-26 13-33-50.mp4  
     
   Google Drive file.

### 讨论 37

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[問題\] 請問冬天出國帶大衣都怎麼放  
     
   如題  
     
   例如韓式那種長版羽絨衣  
     
   體積有夠大  
     
   放托運行李很佔空間  
     
   穿上飛機也不太可能一直穿在身上  
     
   放機上頭頂行李架  
     
   又怕被人在大衣上面放行李壓著  
     
   衣服佔用頭頂行李空間不知妥不妥當 ！？  
     
   大家都怎麼處理呢？？  
     
   會帶衣物收納袋在機上收納嗎？？  
     
   謝謝

2. **发言者 2**（回复第 1 条）：當棉被蓋

3. **发言者 3**（回复第 1 条）：當地買,帶不回國就當地丟

4. **发言者 4**（回复第 1 条）：托運真空包包著

5. **发言者 5**（回复第 1 条）：折好放收納袋 放頭上行李箱

6. **发言者 6**（回复第 1 条）：坐等最後再放外套上去機艙行李櫃吧

7. **发言者 6**（回复第 1 条）：或者批在身上當毯子蓋…

8. **发言者 6**（回复第 1 条）：高級羽絨服少用真空壓縮會變形

9. **发言者 6**（回复第 1 条）：與降低蓬鬆度，除非壓縮的時間短

10. **发言者 7**（回复第 1 条）：過關時披在身上，其他時候掛登機箱

### 讨论 38

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Fair isle  
     
   So my first stitch after a color change is too loose and wonky because if I tighten it to where it’s supposed to be, that obviously tightens my float. Anyone have any tricks for this?  
     
   Thank you

2. **发言者 2**（回复第 1 条）：What pattern are you doing?  Would trapping the float help?

3. **发言者 3**（回复第 1 条）：One trick that may help is to tighten the second stitch after that first stitch following the color change. It may also help to twist the two yarns around each other to set the stitch size.

4. **发言者 1**（回复第 1 条）：I want it for general knowledge. It would apply no matter what pattern. So you’re suggesting trapping it on the stitch just prior to the color change? Hmm that may work. I’m screwing around on a flat swatch so lemme see. Hot damn\! You’re my favorite\!\!\! Perfect solution :hugs::hugs::hugs::hugs: Thank you. How did that not occur to me in my madness? Lol

5. **发言者 1**（回复第 3 条）：You know, I’ve done that. If you watch closely, however, it does pull that float a bit, especially with lighter weight yarns. Im swatching with worsted and I’ve noticed that particular issue isn’t quite as prevelant. But I think I’m going to trap the new color one stitch before the color change. It worked very well on my swatch. :smiling\_face: Thank you for your response\!\!

6. **发言者 1**（引用未收录发言）：Also this would really work out for me bc I knit true to needle size. Some folks call that tight but I call it accurate\! There is no slack under my stitches and they still move freely.

7. **发言者 4**（引用未收录发言）：Ooh, that looks like a lovely technique\!  Bookmarking that video for sure\!

8. **发言者 4**（回复第 1 条）：Trapping floats, Continental\!  
     
       
       \[图片省略\]

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\(´ﾟДﾟ\`\)看到知音漫客的作者开水滴筹了，肝病来着。支付不起医药费\( ;´д\`\)

2. **发言者 1**：分享图片

3. **发言者 2**：唉\( ´\_ゝ\`\)

4. **发言者 1**：水滴筹抽成好高啊\( ;´д\`\)居然8.6%吗

5. **发言者 3**（回复第 4 条）：\[引用第 4 条\]  
     
   八点六吗\( ﾟ∀。\)  
     
   我怎么记得是大几十成\( ﾟ∀。\)

6. **发言者 4**：水滴筹，我怎么记得是抽一半，然后给你显示是筹到总额多少多少

7. **发言者 1**（回复第 6 条）：\[引用第 6 条\]  
     
   \( ☉д⊙\)

8. **发言者 5**（回复第 1 条）：\[引用第 1 条\]  
     
   \[引用第 2 条\]  
     
   小强快跑啊，原来作者是他啊，这一篇我是回家路上借同学漫画看的时候偶然看到的，现在想想看已经是十几年了  
     
   这一篇我印象还挺深的，不知道有没有肥哥知道或者记得这一篇的内容。印象里是个外星人，厌倦了生活想联系变形公司把自己变形成蟑螂找个宇宙的角落躺平，寄托在CN某宅男的家里并与其结下深厚友谊。  
     
   故事的最后是不明所以的宅男女友把小强打死了，宅男为小强痛哭流涕，却不想外星人早已金蝉脱壳，欲联系变形公司再次变形成人类，堂堂正正地当宅男的室友

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Launching Goodt for the first time on Steam is very slow  
     
   Steam is very slow to launch the game for the first time. During the freezing period, no files were created in the background, meaning it might freeze before executing the following code:  
     
   extends Control  
     
   var Ui = preload\("\[链接隐去\]  
     
   var NewGameDataSetting = preload\("\[链接隐去\]  
     
   var DataSettingBase = preload\("\[链接隐去\]  
     
   var data\_io = preload\("\[链接隐去\]  
     
   var Custom = preload\("\[链接隐去\]  
     
   var LoadFun = preload\("\[链接隐去\]  
     
   func \_ready\(\) -&gt; void:   
     
   cretea\_ui\(\)  
     
   signal\_fun\(\)  
     
   init\(\)  
     
   init\_setting\(\)  
     
   But after waiting a while, it can start normally. Repeating the game to close and launch within the next few minutes works fine, but if you don’t start the game for a long time—usually less than 10 minutes—you will have to wait a very long time to start。  
     
   I still can’t find the reason for this; it might be related to the godotsteam plugin, because my demo version doesn’t have godotsteam, and it starts normally.  
     
   Does anyone know what the reason is?

2. **发言者 2**（回复第 1 条）：This is expected, see this, depending on the hardware, 10 minutes is long though, are you sure it’s that long?

3. **发言者 1**（回复第 2 条）：I have found the cause of the problem, it is a problem with the Steam backend settings

### 讨论 41

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Ansible Fails waiting for privilege escalation on Ubuntu 26

2. **发言者 2**（引用未收录发言）：Except that the output format of an established command is seldom a bug.  
     
   If you want to make a \*drop-in replacement\* for a utility, ensuring it responds in the same way is essential. You can do all you want to improve the internals, the documentation etc but why mess with the output?

3. **发言者 1**（引用未收录发言）：Yep, reading the issue, it's much more complex than I thought. The only thing left is why sudo-rs changed how prompts are handled

4. **发言者 3**（回复第 3 条）：The issue seems to hint at an answer:  
     
   &gt; sudo implemented this by capturing the pam password prompt, and rewriting it, which the sudo-rs maintainers did not implement.  
     
   I don't know anything about the pam API, but it wouldn't surprise me if this "capturing and rewriting the pam password prompt" stuff is pretty messy.

5. **发言者 4**（引用未收录发言）：No. Stick with Debian unless you went half baked ideas and slow security updates.

6. **发言者 5**（回复第 1 条）：I tell people I generally don't use Linux because it's messy and changes gratuitously, and when people ask me to explain what I mean, I tell them as an example that any how-to, book, manual, or script that's meant for one version of Ubuntu is often likely to not work with the next version, unless or until the how-to, book, manual or script is updated.  
     
   This is a perfect example.

7. **发言者 6**（引用未收录发言）：So i really want to like Ubuntu, they push alternative CPUs, seem to have big input into RV32 for RiscV...  actually, thats it.  I can't think of any other reason to like them.  
     
   Mir, snap, upstart, coreutils to rust.  Just a stench of not invented here.  No, I can't think of any reason to use Ubuntu other than 'nothing else is available'

8. **发言者 7**（引用未收录发言）：Vendor support. Many hardware vendors only provide ubuntu drivers and immediately drop support cases if running something else

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Thumbtack icons in Darktable  
     
   It’s a general question: what is the thumbtack icon about?  I just imported a few images I took yesterday and, while looking at them all in lighttable or in darkroom, there are thumbtacks on EVERY image except one.  WHY?  What does the thumbtack represent?  Am I missing something important?  
     
   \[图片省略\]Screenshot 2026-11-25 110929826×457 204 KB

2. **发言者 2**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   What does the thumbtack represent? Am I missing something important?  
     
   What version are you using? I don’t even have it. I’ve seen it before but I might have changed my preferences a while back.

3. **发言者 1**（回复第 1 条）：v. 5.6.2

4. **发言者 3**（回复第 1 条）：It appears when the image has GPS information.

5. **发言者 1**（回复第 1 条）：But they were all shot at the “same” time.  I’ll check on that.

6. **发言者 2**（回复第 4 条）：\[图片省略\] 发言者 3:  
     
   It appears when the image has GPS information.  
     
   I am not quite sure. My pictures do have GPS embedded yet I don’t have the pins. I remember seeing them long ago but never really used them. Now I can’t even see them. I even deleted the preferences and started DT from an appimage but they were not there.  
     
   I was thinking that it maybe something related to overlays but can’t find it.

7. **发言者 4**（回复第 1 条）：I do not know. But wonder after setting tooltips to on \(toggle with Shift-T\) what shows when you hover the pin?

8. **发言者 5**（引用未收录发言）：I am fairly sure it is the indicator for GPS information being present. You could e.g. Compare some of the marked with an unmarked image with exiftool -gps:all image.arw  
     
   This might not be documented :thinking:

9. **发言者 3**（回复第 6 条）：发言者 2  Do you have the variable $\(GPS.LOCATION.ICON\) in the pattern for the thumbnail overlay text \(in preferences &gt; lighttable\)?  
     
   发言者 5 assigning coordinates in the map view is sufficient, so the coordinates are not necessarily in the image file.

10. **发言者 1**（回复第 9 条）：I know I have the \(GPS.LOCATION.ICON\) feature.  
     
   \[图片省略\]Screenshot 2026-11-25 140344574×185 4.86 KB

11. **发言者 1**（回复第 10 条）：But, I bring this up to say that it is weird that the second to last image I shot did NOT have this thumbtack \(pushpin\) icon.  And I can’t find why.

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Princess Donut Postcard  
     
   I made this Princess Donut painting for 发言者 6 in the STS swap. \(A character from Dungeon Crawler Carl.\)  
     
   4x6" coldpress postcard paper with watercolor and colored pencil.  
     
   \[图片省略\]PSX\_20261107\_121555\_17940753951821756×2546 1.21 MB  
     
   Process pics:  
     
   \[图片省略\]20261106\_2212251920×2560 980 KB  
     
   \[图片省略\]20261106\_2234501920×2560 1.04 MB  
     
   \[图片省略\]20261106\_2304391920×2560 1.06 MB  
     
   \[图片省略\]20261106\_2348461920×2560 700 KB

2. **发言者 2**（回复第 1 条）：The facial expression is priceless. :grin:

3. **发言者 3**（回复第 1 条）：Beautiful work. You really captured the fluffy fur.

4. **发言者 4**（回复第 1 条）：Positively regal\!\! :castle:

5. **发言者 5**（回复第 1 条）：You really caputured cat-ittude in your painting\!

6. **发言者 6**（回复第 1 条）：I love my Princess Donut painting :purple\_heart: I have recently become obsessed with this series lol

7. **发言者 7**（回复第 1 条）：I can hear her voice. Great job.

8. **发言者 8**（回复第 1 条）：That is hilarious. I.love it. Would be funny on a shirt too.

9. **发言者 1**（回复第 1 条）：Thank you, 发言者 4, 发言者 7, 发言者 5, 发言者 8, 发言者 2, 发言者 6, and 发言者 3\!

10. **发言者 9**（回复第 1 条）：The Princess is not amused, apparently. This is very cute\! I’m not familiar with the show, but I can appreciate the fluffy cattitude\!

11. **发言者 1**（回复第 10 条）：Thanks\! Cattitude for sure\! It’s a super popular book series but I believe it is being adapted for movie/TV. Not released yet though.

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Bao – A Desktop Pet for Claude  
     
   Bao is a tiny panda that floats on your desktop and shows, live, what Claude Code is doing: thinking, reading, typing, running commands, waiting for you, asking for permission, or done. It calls out on the moments that matter.

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Rick Beato Interview Mick Jagger  
     
   The Interview  
     
   M

2. **发言者 2**（回复第 1 条）：Will watch, Rick is invariably a good watch.  
     
   Thank you.

3. **发言者 1**（回复第 2 条）：I agree. He has insight and asks good questions, and then gives his respondent time and space to answer.

4. **发言者 3**（回复第 1 条）：Enjoyed:\+1:

5. **发言者 4**（回复第 1 条）：Best interview with Mick Jagger that I’ve ever seen. All about the music and his process \(if you can call it that\). Magical.

6. **发言者 5**（回复第 1 条）：A proper interview with Mick, for once.  
     
   Rick has been a Stones fan since childhood, so there’s loads of empathy, and it’s more of a conversation between two old geezers, rather than the normal Q and A type of interview.  
     
   Very good. :\+1: :\+1:

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：//-Planet: Ani \| play-test \| Steam Chat  
     
   Hi, I’m now about to start having live play tests for the game to test out multiplayer and the game, so I’m looking for volunteers to join and test the game\! And also at the release of the game when I release it on steam, a random 10 people will be picked and given a free copy of the game for play testing\! Join the GC to get a chance to play-test or bug-test the game\! you will get a ping if the play-tests are live\! The link is Steam Community :: Chat Invitation \!

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Make the Plan a Value

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Servos backfeeding Voltage  
     
   Hello,  
     
   I am building a project that uses a 16x12 pwm servo shield to drive several servos. I am powering the shield from a ubs power brick through an adjustable step up/down module, set to 5V.  
     
   This module also has an on/off button. If i have a servo plugged into the shield and the power module is disabled, it shows 0 on its Voltage display. However, with a couple of servos, it shows some voltage \(up to 1.5\) even when disabled.  
     
   From my understanding, what is happening is that the control signal from the arduino is somehow "leaking" into the power connections of the servo.  
     
   Is this a big issue? Especially if I plan to have multiple servos plugged into the shield ?.  
     
   How can I fix it if its necessary? I wanted to  disabled/detach a servo, but the shield doesn't seem to allow that.  
     
   Thanks

2. **发言者 2**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   16x12 pwm servo shield  
     
   Can you provide a link to or a photo of the exact shield board you are using please? There seem to be a number of variants of such products about.

3. **发言者 3**（引用未收录发言）：I do know the shield, but I don't know the power module.  
     
   Please provide a link to the product.  
     
   You don't need a buck or boost converter if your supply is already 5volt.  
     
   Servos could fail when you mechanically overload them or use them past their swing range.  
     
   Cheap SG-90 servos don't always swing the full 180 degrees.

4. **发言者 1**（回复第 3 条）：Here is an amazon Link for the module \(can't say its 100% the same, since I didn't buy this one, but it almost definitely is\).  
     
   The servo don't rotate past their range. The angles aren't set to either of the extremes.  
     
   My main issue is the fact that a few of those servos "push" power into the module when it is disabled \(and therefore the servos should be unpowered\)

5. **发言者 3**（回复第 4 条）：What you're saying is not possible.  
     
   There is no electrical link between USB power from the Mega to the servo or power module.  
     
   Power can only come from the power module. Maybe it's broken, or not working as expected.  
     
   You should have used a simple female to screw adapter instead of that power module.

6. **发言者 1**（引用未收录发言）：Nevermind, its all 4 of those servos doing it now. Unfortunate

<!-- samples:end -->

