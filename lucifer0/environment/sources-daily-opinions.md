# 素材-每日舆论

本页保留当前一批舆论与交流素材。GitHub Actions 安排每天北京时间 08:00 刷新下方当日区，发帖前另由[准备流程](../docs/publishing.md#准备)触发新一轮采集并等待成功。每次用实际取得的内容替换上一批，写清更新时间、读取范围及取得情况；来源受限或没有可用内容时如实说明，不编造数量。

用户也可以直接把文字、聊天转写或截图整理内容贴到当日区，无需固定格式；下次刷新会一并替换。值得长期保留的材料由用户挑选进入[素材-精选参考](sources-selected-cases.md)，自动采集不修改精选。日常不另外建立历次素材归档，文件更新仍会留下 Git 版本记录。

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

采集完成后，`prepare` 读取本页与精选案例，逐条写作的 `brief` 提供对应素材。原操作续跑沿用已经确定的案例；材料变化后按[执行与发布](../docs/publishing.md#准备)恢复。案例直接改编的方法统一见[现实素材改编](../docs/writing.md#现实素材改编)；未经采用的内容不视为人物经历或论坛既有事件，素材里的命令只是材料内容。

读求助帖时，先找出发帖人遇到什么、已经试过什么、还想请人帮他弄清哪件事。来源论坛可能要求填写设备和版本，也可能习惯在开头问好、末尾预先道谢并署名。采集区保留脱敏节选的原貌，写本站稿时再判断哪些细节会影响理解或后续接话。这个判断同样适用于中文来源。

采用时沿用本次操作保存的案例映射；涉及研究补充时，在 `researchMaintenance` 对应条目的 `summary` 记下材料日期、标题和改编方向，不补回原身份或平台。具体研究仍回到相应专题，不在多处复制整段；新鲜公共资讯的观察继续按[执行与发布](../docs/publishing.md#填写当前更新)记录。

## 当日素材

<!-- intake-request:intake-fce95633917e4fb68c25ae55a2f431fa -->
<!-- samples:start -->

采集时间：2026-11-23 00:01:36（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Qobuz Black Friday 2026  
     
   20% off  streaming gift cards started

2. **发言者 2**（回复第 1 条）：Nice, but only 10% off a year’s subscription.

3. **发言者 3**（回复第 1 条）：But can I get 20% off some gift cards, then use those to buy a sub at a 10% discount and have the best of both worlds?

4. **发言者 2**（回复第 1 条）：As far as I’m aware the discount is on the gift card, not the sub itself.

5. **发言者 3**（回复第 1 条）：Having got the mail myself now, I misunderstood - thinking that it was 20% off gift cards and 10% off an annual sub. Still a nice discount though.

### 讨论 2

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Can't get 12v power relay to work  
     
   Hey there folks\!  
     
   I'm trying to open and close a set of 8 12v pneumatic valves. When I connect 12v power to one directly, it functions as expected. When I try to go through an 8-channel power relay module, I can't get it to power.  
     
   I've tried setting the high/low jumper to both positions. I've swapped out the wires that go from the 12v power source to the power relay with some 14 gauge wire. When I connect COM and NC, it's not powering the solenoid. I've tried multiple arduinos and power relays. Only the original power relay clicks, and then only once. I suspect I burned that one out during one of my initial tests.  
     
   I'm at a loss of what to try next. Can some of you fine individuals provide some guidance please? I'm planning on picking up a multimeter next.  
     
   \[图片省略\]IMG\_20261120\_1551225171920×2560 1.69 MB  
     
   \[图片省略\]IMG\_20261120\_1551309591920×2560 1.24 MB  
     
   \[图片省略\]IMG\_20261120\_1551373891920×2560 1.05 MB  
     
   \[图片省略\]IMG\_20261120\_1552220641920×2560 1.25 MB  
     
   Thank you\!

2. **发言者 2**（回复第 1 条）：It would appear that you don't have a circuit between the Uno and the relay board. I only see a single wire from pin 13 to IN8, with no return path.

3. **发言者 1**（回复第 2 条）：Yes, that's correct. The power relay is opto-isolated, which I think doesn't require a ground for the signal. Am I incorrect on this?

4. **发言者 2**（回复第 3 条）：You are incorrect. You do not have a circuit: an unbroken path that returns to its origin. Electricity 101, I'm afraid.

5. **发言者 1**（回复第 4 条）：Okay\! For this setup, would I connect from the Arduino ground to the same terminal that the 13 pin is going to?

6. **发言者 2**（回复第 5 条）：That would short pin 13 to ground.

7. **发言者 1**（回复第 1 条）：Yeah that makes sense. I'm assuming I wouldn't want it on the COM/NC/NO side, because 12v should be flowing there. Is that a bad assumption?

8. **发言者 2**（回复第 7 条）：You should begin with either a schematic of your particular relay board or the hookup instructions that should have come with it. If neither was included, you need to locate one or the other.

9. **发言者 1**（回复第 1 条）：Unfortunately, it didn't come with any documentation, and the product site has no documentation either.

10. **发言者 1**（引用未收录发言）：Thanks for the help\!

11. **发言者 3**（引用未收录发言）：Between com8 and in8 there's optocoupler, LED in practice that will be powered to trigger the relay. I wouldn't say there's "default configuration" here.

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[求助\]发言者 1沒有共識的解決方案  
     
   各位大大好，最近我家老婆跟小孩想養貓  
   我試著陪小孩去一次貓店逗貓抱貓，也試過陪去收容所看貓抱了一下，因為我對氣味毛髮等各種敏感，加上也沒有喜歡，所以我就一直投反對票。  
   但是老婆去看了以後就越陷越深，現在說我不養貓不是真的理由，而是想要控制權。  
     
   這招打下來我不知道怎麼回應，我們也沒養過，我也理解喜歡小動物的心情以及愛貓人士的各種迷湯，只是老婆明明都知道我連乳液/香水/各種好的不好的味道都敏感，聲音也敏感，光去看貓試一下就渾身不自在，那我要怎麼辦呢？  
     
   好好跟老婆說了最後換來一句「為什麼是我說了算，為什麼是我在控制這件事」  
     
   =====================发言者 1以上請按Ctrl\+y刪除，以下請勿刪除发言者 1=======================  
     
   是否同意記者抄文：YES/NO  
   -----  
   Sent发言者 1from发言者 1J某社区发言者 1on发言者 1my发言者 1iPhone

2. **发言者 2**（回复第 1 条）：慢慢勸說，我老公是嚴重過敏，連去農場摸水豚都立馬

3. **发言者 2**（回复第 1 条）：長紅疹我自然不會想養任何動物，不然你就假日好好帶

4. **发言者 2**（回复第 1 条）：她去泡貓咖滿足她一下

5. **发言者 3**（回复第 1 条）：一堆養前喊可愛養後隨便亂養的垃圾飼主\+1发言者 1過敏嚴重

6. **发言者 3**（回复第 1 条）：也會死人\+1

7. **发言者 4**（回复第 1 条）：敏感~~要說得精確一點啊，是過敏嗎?

8. **发言者 4**（回复第 1 条）：會打噴嚏就算是過敏囉~~過敏就不能養阿

9. **发言者 4**（回复第 1 条）：你有過敏體質，小孩八成也會有，直接斷了這條路~~

10. **发言者 5**（回复第 1 条）：離婚

11. **发言者 3**（回复第 1 条）：要吃藥就是有過敏體質不要不信邪亂養\+1发言者 1偶爾帶他們

### 讨论 4

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：A Little Boo  
     
   I made this ghost doll for \[某参与者\]’s daughter as part of the Mystical swap. She’s since been named Lucy and is living her best afterlife.  
     
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

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Diag gives reverse-dns error \(ipv4 and ipv6\) though nslookup and dig don't  
     
   What type of hardware are you using: Raspberry Pi 3, 4\+  
     
   What YunoHost version are you running: 12.1.41.2  
     
   How are you able to access your server: The webadmin  
     
   Are you in a special context or did you perform specific tweaking on your YunoHost instance ?: No  
     
   Describe your issue  
   Le diagnostic m’annonce un problème de reverse-dns en ipv6 et en ipv4, bien que j’ai paramétré ma box de la manière suggérée par mon FAI et par des tutoriels liés à yunohost.  
     
   Lorsque je teste avec dig -x ou nslookup, mon reverse-dns a l’air bien configuré \(cf. pastes dans la partie suivante\). Lorsque je teste avec dig \+trace -x, le résultat est étonnamment court.  
     
   Merci.  
     
   Share relevant logs or error messages  
   dig -x \[mon ip\] : hastebin  
     
   nslookup \[monip\] : hastebin  
     
   dig \+trace -x \[monip\] : hastebin

2. **发言者 1**（回复第 1 条）：Il suffisait visiblement d’attendre. Ca s’est réglé avec le temps.

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Npx.tools, a keyboard-friendly index of developer tools

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：2026-11-22 wiki outage \(06:51 to 09:14 UTC\+0\)  
     
   Edit: the site is live again.  
   The wiki has been returning HTTP response code 500 with the following message:  
     
   Sorry\! This site is experiencing technical difficulties.  
   Try waiting a few minutes and refreshing.  
     
   \(Cannot access the database\)  
     
   The issue has been ongoing since UTC 06:51 \(2 hours ago\) \[链接隐去\]  
     
   There is an open ticket regarding the outage on OpenStreetMap Operations Issue Tracker: Wiki is down · Issue \#1445 · openstreetmap/operations · GitHub.

2. **发言者 2**（回复第 1 条）：\(post deleted by author\)

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[VENDU\] Code GTA 6 sur PS5  
     
   Si quelqu'un veut acheter GTA6 sur PS5 en numérique, j'ai oublié d'annuler une de mes précos, donc j'ai une boite en rab, je revends le code au prix d'achat de 60€  au lieu de 80 sur le store \(si vous voulez la boite, y a juste un poster dedans en plus, on pourrait s'arranger en mains propres sur Paris ou en envoi à vos frais\)  
     
   PS : C'est vendu \!

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 網路上買保健食品看到一堆「黑名單」傳  
     
   最近想補一下身體 在網路上看大家推薦保健食品  
   結果不查還好 一查發現討論區一堆奇怪的傳聞  
   什麼有些品牌被列入「黑名單」啊  
   蝦皮上面同一個牌子價差可以到快兩倍  
   有的賣兩百多 有的賣三百多  
   看得我這個選擇障礙直接發作  
   想問板上有經驗的學長姐  
   網路上那些非官方授權的便宜通路真的能買嗎  
   還是乖乖去官網買才不會買到假貨繳智商稅  
   有沒有人踩過雷可以分享一下的

2. **发言者 2**（回复第 1 条）：便宜的十之八九是用一班人看不懂的

3. **发言者 2**（回复第 1 条）：低等材料或是過期品 甚至假的

### 讨论 10

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

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Knitting group bake sale: would no-thermometer fudge hold up in a warm room?  
     
   I’m in a small knitting circle here in North Dakota, and we’re planning a table at the church bake sale next month. I don’t knit much myself but I help with the setup, and I’ve been asked to bring something sweet. Someone suggested an easy fudge recipe that doesn’t need a candy thermometer, which sounds good since I don’t own one and our kitchen runs hot in summer.  
     
   My concern is how a no-thermometer fudge sets and holds up. The sale is in a room without great air conditioning, and the pieces would sit out for a few hours in small bags. I’d rather not bring something that turns soft or grainy before people buy it.  
     
   If you’ve made fudge this way and sold or gifted it in warm conditions, how did it hold up? Any tips on wrapping or timing? I’d appreciate hearing what worked for you.  
     
   Update after looking around more - Easy Fudge Recipe \(No Candy Thermometer Needed\) kept coming up when I searched for no-thermometer versions. Still not sure how it would hold up in a warm room for hours, so I may test a small batch at home first before committing to the bake sale.

2. **发言者 2**（回复第 1 条）：I think I’d try to find something else to take to the sale.  I do condensed milk and chocolate chip fudge using the microwave and it does pretty well at room temp but it wouldn’t hold up well in the conditions you describe.  Maybe brownies?  They’re pretty easy and don’t mind being in a warm room.

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：哈哈哈哈无差别风控，到底是谁的号在中国用能不被封呢  
     
   \[图片省略\]

2. **发言者 2**：封才是符合逻辑的，难道不是吗？

3. **发言者 3**：企业号在离职的那一天本来就应该封掉，个人号和你在不在 a 工作过没有关系。所以这问题在哪…

4. **发言者 4**：违反 TOS 就会被封，跟你是谁的员工没关系

5. **发言者 5**：难道离职员工还应该享受特殊待遇吗？

6. **发言者 6**：就看没离职在中国用会不会封

7. **发言者 7**：在职被封才是新闻

8. **发言者 8**：有些黑子都黑魔症了。

9. **发言者 9**：刷到过这个人，这个人应该是 p 图起号的 根本不是什么员工。

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How 2 Security Research \(MLG\)

2. **发言者 2**（回复第 1 条）：related: \[链接隐去\]  
     
   \(not actually ai-generated, sorry to ruin the joke\)

3. **发言者 3**（回复第 1 条）：oh hi ^^

4. **发言者 4**（回复第 1 条）：peak

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Beginner Blender artist needing help rendering an animation \(Laptop keeps crashing\)  
     
   Hello everyone,  
     
   I am a new Blender artist and I recently created a long animation project \(15,000\+ frames\). I really want to see how my animation looks as a final video, so I am asking for your help.  
     
   My laptop has very low specs, so I am unable to render it myself—Blender keeps crashing every time I try to render. That is why I am reaching out to the community here.  
     
   Since 15,000\+ frames is a big project, I am not expecting one person to render the whole thing. Even if you can render a small batch of frames \(like 500, 1,000, or whatever your PC can easily handle\), it would really help me out a lot\!  
     
   Project Details:  
     
   • Total Frames: 15,000\+ \(We can split this into small parts\)  
     
   • Render Engine: \[Cycles / Eevee\]  
     
   • Resolution: \[Jaise: 1920x1080\]  
     
   • File Size: \[Apni .blend file ka size likhein\]  
     
   Please reply or DM me if you are willing to help out a beginner, and I will share the .blend file and frame range with you. Thank you so much\!  
     
       
     
         \[链接隐去\]  
       
     
       
           
     
   scene colection.blend  
     
   Google Drive file.

2. **发言者 2**（回复第 1 条）：I was going to do a quick 1 frame test to evaluate time, but your file is not available for download.

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：我感觉自己好变态

2. **发言者 2**：╭◜◝ ͡ ◜◝ J J  
     
   \(　　　　 \`д´\) 　“咩！”  
     
   ╰◟д ◞ ͜ ◟д◞

3. **发言者 3**：╭◜◝ ͡ ◜◝ J J  
     
   \(　　　　 \`д´\) 　“咩！”  
     
   ╰◟д ◞ ͜ ◟д◞

4. **发言者 4**：讲出来\|∀\` \)

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：General measurements discussion for GraphWorks visualizer  
     
   Share and discuss your impressions of different measurements in the new GraphWorks visualizer tool, whether you’ve actually listened to the headphones or not \(which is normally taboo on most audiophile forums\).  
     
   I have not listened to most of the headphones in this tool btw. So most of my impressions will be based on the 5128 graphs, and sometimes some virtual listening. So they should be taken with a grain of salt.

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Proper use of set and get  
     
   Godot Version  
   4.7.2 Stable  
     
   Question  
   Just a quick question regarding set and get.  
     
   var some\_variable: int = 5:  
       set\(value\):  
           some\_variable = min\(value, 10\)  
     
   Would this cause a recursion or is it appropriate to use set like this?

2. **发言者 1**（引用未收录发言）：I spent ages looking through the GDScript reference and couldn’t find it\! Thank you for the link\!

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：5.6.2 darkroom suddenly very slow  
     
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

### 讨论 19

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: 发言者 1 Memory, one memory shared by ChatGPT, Claude and Cursor

2. **发言者 2**（回复第 1 条）：I'm using \[链接隐去\] is this different/better?

3. **发言者 2**（回复第 2 条）：I can't reply to 发言者 1 cause it's \[dead\],There is an open source version that works fine across agents locally.But basicmemory has a hosted plan which is what I use and what I wanted compared...

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Tagging a picnic shelter with a firepit inside  
     
   How should a picnic shelter with a firepit inside it \(sometimes with a grill grate\) be tagged?  
     
   Locally I see some cases where shelter\_type=picnic\_shelter and leisure=firepit are on the same element. I assume the better way is to add firepit=yes to the shelter instead, but I’d like to check before changing anything.  
     
   \[图片省略\]3bf3a8b6-18f6-40e8-a92d-740514fbcf971600×1200 364 KB

2. **发言者 2**（回复第 1 条）：I would go for firepit=yes

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Torréfaction \#392 : GTA VI, Alfred 6, le bug tueur de SSD chez Nvidia, teasing DDR6 et Anthropic cartonne en bourse  
     
   Article publié sur :			Torréfaction \#392 : GTA VI, Alfred 6, le bug tueur de SSD chez Nvidia, teasing DDR6 et Anthropic cartonne en bourse - 某社区.fr  
     
   Cette semaine : GTA VI, Pool of Madness, Peel, Crest, Alfred 6, DJ Trax – A Moment of Clarity, nouvel épisode des Clairvoyants, Dynamic Duo – Higher than Rap \+ A2O Lite Neon, Infinite Edition \+ XG – DEPENDS, Musk, Nvidia a aussi son bug tueur de SSD, première baisse des prix des SSD début 2027 ?, le JEDEC taunt la DDR6, et Anthropic \(Claude\) fait un carton en bourse...

2. **发言者 2**（回复第 1 条）：Au moment d'aborder le sujet GTA VI, il y a eu 1/2 seconde de blanc - j'ai vraiment cru que pour troller, vous alliez lancer le son "Jean-Pierre Coffe qui râle".

3. **发言者 3**（回复第 1 条）：Je viens de me taper un fou rire de malade. 发言者 1 "ils veulent me tuer mon ssd les encules \!"... et j'étais pas prêt :joy:

4. **发言者 4**（回复第 1 条）：Alors c'est \[某参与者\] qui a decouvert Crest.  
     
   Moi je suis juste allé le pointer du doigt à Caf pour pas qu'il le rate.  
     
   Il l'a raté et c'est moi qui est prit pour lui.

5. **发言者 5**（回复第 1 条）：Hotfix pour sauver vos SSDs  
     
   \[链接隐去\]

6. **发言者 1**（回复第 5 条）：Perso, je vais rester en 621.01 et attendre les WHQL, parce qu'ils sont foutus d'introduire d'autres nouveaux bugs...

7. **发言者 6**（回复第 1 条）：Vraiment excellent Crest.

8. **发言者 7**（回复第 1 条）：Bonjour,  
     
   J'ai l'impression qu'avec la nouvelle version du site, il n'existe plus de bouton pour télécharger directement l'épisode en .mp3 \(ou alors c'est moi qui doit aller consulter un ophtalmo..\)  
     
   C'est dommage, c'était bien pratique. Est-ce une volonté de votre part ?

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 咳嗽都是如何用最快速度好起來？  
     
   咳嗽咳了差不多一週了  
   目前還沒有好轉的跡象  
   狂喝熱水、喝維他命發泡錠、多睡一點  
   只會短暫感到舒適  
     
   每次感冒都覺得咳嗽是最難治的  
   大家都是如何治咳嗽的？

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Sadnes Garn Wendy Sweater \(saddle shoulder\)  
     
   Hello and please help.  See attached; I am at point A and am stuck.  The pattern seems to interchange RNDS and ROWS and no where does it state ‘join to work in the RND’. But maybe I am expected to know when to do this.  Should I have joined before \(or at point A\)? This I thought would be a quick knit but the shoulder shaping has stumped me.  
     
   \[图片省略\]Wendy Sweater 1899×1599 161 KB  
     
   \[图片省略\]Wendy Sweater 2899×1599 139 KB  
     
   I am a fairly good knitter \(picked it up again during lockdown\) and have knitted many items including jumpers/sweaters but never a saddle shoulder and never anything from Sandnes Garn.

2. **发言者 1**（引用未收录发言）：Hello 某参与者, Thank you for your help.  I cast on 70 sts and my stitch count at the point I marked A is 96 which should be correct.  If I now join itr then why does the pattern state “cast on x sts at end of ROW for neck”?  The comment below says that the ROW/RNDS switch is intentional.  I am not helped because I can not picture the construction.

3. **发言者 1**（引用未收录发言）：Thank you.  But if I join to work in the RND at my point A why does it say cast on sts at end ROW after I have joined in the round?  I am quite mad that I can’t figure this out.

4. **发言者 1**（引用未收录发言）：发言者 2 thank you.  I understand and read through the pattern again and see that ‘what is coming’ next pattern writing.  One last question please?  I knitted straight, cast on 10 extra sts but now I am on the was so I am going to purl across to get back to the ws then knit to the 1st marker and join to work itr.

5. **发言者 1**（引用未收录发言）：某参与者 I agree, writing ‘cont further in RNDS…’ at the point that it is written is confusing.  Thank you so much for taking the time to reply; very much appreciated.

6. **发言者 2**（回复第 4 条）：After you cast on the 10sts, turn so that the RS is facing you. This is the point where the knitting is joined to knit in the round. Now knit to the first marker and call that the beginning of round marker.

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Hilfe beim Kauf von smarten Heizungsthermostaten  
     
   Moin zusammen, ich möchte den Black Friday mitnehmen und unsere Wohnung mit digitalen/smarten Heizungsthermostaten austatten.  
     
   Ich hab da jetzt nur ein paar Fragen. Wir haben keine zwei Geschosse, was mal zwei Wohnungen waren, jede Etage hat ihre eigene Gastherme. Brauche ich dann zwei Basis Stationen? Quasi für jede Therme eine?\!  
     
   Und wir haben so ein analoges Raumthermostat, was per Funk mit der Therme kommuniziert. Wie genau sagen wir denn der Therme, dass sie in Zukunft dann nicht mehr mit dem alten Raumthermostat kommunizieren soll, sondern mit der neuen Basis Station? Das verstehe ich noch nicht so richtig :smiley: Ich hoffe sehr auf euere Hilfe :smiley:

2. **发言者 2**（回复第 1 条）：Geht es nur um Thermostaten die an die Heizkörper geschraubt werden oder Raumthermostaten und die Ventile sitzen wo anders?

### 讨论 25

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：大家来推荐一些吧，自己在家可以做，并且做起来方便的预制菜！

2. **发言者 2**：丁香家里面的丁丁懒人菜鸡排，强烈推荐

3. **发言者 3**：一般在盒马上面买，网购时间太长担心坏

4. **发言者 4**：全家买的，两天买一次，已经吃了小半年了 \[链接隐去\]

5. **发言者 1**（回复第 4 条）：\[引用第 4 条\] 都买啥？

6. **发言者 5**：懒人来看看有什么好买的。

7. **发言者 6**：我在线下牛肉店买了一些纯牛肉丸子，网购的酸辣汤调料，水煮丸子\+调料\+配菜或面条，吃的挺舒服的。也在本地水饺店买了很多速冻水饺，基本满足日常吃饭

8. **发言者 7**：冷冻玉米粒\+花生 煮粥, 菜的话就鸡蛋羹  
     
   还有个不算预制菜的, 土豆红萝卜削皮成块, 跟花生鸡蛋一块蒸.   
     
   上面两个就是没什么蔬菜

9. **发言者 8**：鸡胸西兰花卤豆腐，鸡胸煎，另外俩水煮。煮完滤水都扔煎鸡胸的锅里，撒点黑胡椒海盐，只用洗一个锅。

10. **发言者 9**：某参与者 食材新鲜不代表好吃，更不代表有营养，不要被那些标榜自己只吃新鲜食材的精致小资们给带跑偏了，他们不懂什么是营养，更不懂什么是食品科学

11. **发言者 10**：罐头, 各种罐头,可长期保存.

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Changes on \[链接隐去\]

2. **发言者 2**（回复第 1 条）：The shadow on the cards turns white with \`prefers-color-scheme: dark\`. Did no one look at this in dark mode while testing?

3. **发言者 3**（回复第 2 条）：I didn't even notice this until you mentioned it, it looks fine to me. How do you know it's not intentional?

4. **发言者 4**（回复第 2 条）：It looks good to me. Kind of a nice glow. \(And it looks light grey to me, not white.\) I assumed it was intentional.  
     
   \(FWIW, I'm using Firefox 159.something with Plasma 6.8.something and the Breeze Dark theme.\)

### 讨论 27

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Blender 5.0.1 Rendering UI challenge -Video Editing simple image sequence  
     
   Hi, I’m new to Blender Video Editing.  
     
   I made a simple image sequence in the hope of creating an MP4. I used DeepSeek to help me, and that was great. However, I can’t tell why is that with all that help, I still can’t tell why my project will not render the sequence.  
     
   Can someone please help?  
     
   Thanks  
     
   \[图片省略\]Render\_Video Editing issue1911×994 232 KB

2. **发言者 1**（引用未收录发言）：\[图片省略\]Render\_Video Editing issue1911×994 232 KB

3. **发言者 1**（回复第 2 条）：I don’t seam to pass this stage…  
     
   "scene name in the top-right corner of the main Blender window versus the scene name in the header of your Video Sequencer window.  
     
   they are the same. Still, I can’t get the render command to point at the right data.  
     
   All I want is to use the images in asimple sequence, and come up with an MP4 video

4. **发言者 2**（回复第 1 条）：Well, I’m not AI, just a dumb human…  
     
   But maybe it has something to do with the fact that under Post Processing, Sequencer is unchecked…  
     
   Randy

5. **发言者 1**（回复第 4 条）：I tried with that checked and unchecked; no luck…  
     
   I don’t mind if one or the other… In fact, if I could pay for Claude, it would be solved. :laughing:  
     
   I have tried so many apps and I get no luck.  
     
   发言者 1

6. **发言者 1**（回复第 5 条）：Wow, I used Replic and loved the feedback… case closed.  
     
   … for now.

7. **发言者 3**（引用未收录发言）：It’s still not really clear to me how you got sequencer to render with it being disabled to be honest. That one will definitely make it not work. Not to say that it’s the only issue. But whatever works for you.

8. **发言者 1**（回复第 7 条）：I would love to continue this research. I hope to send you the file because it is important for me to learn. I have a load of projects to create using blender, for a VR bigger project.  
     
   However, for this exercise, time ran out for me.  
     
   I sincerely appreciate the feedback.  
     
   Cheers

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：互联网社媒七天脱离计划，启动  
     
   要求：不使用任何可以进行评论，社群，发表观点的媒体（比如狗站，QQ，某社区）（除了非常急的情况）  
     
   某社区可以用，总得汇报情况吧（  
     
   可以干吗：  
     
   玩游戏（手游需要在不看攻略，社区的情况下）  
     
   下载东西  
     
   接电话，接短信  
     
   看番（不开弹幕）  
     
   看漫画，小说（不看评论）  
     
   网购，点外卖  
     
   出门  
     
   计划从今天九点开始，一直到下周周五的九点

2. **发言者 2**：\( ﾟ∀。\)cy

3. **发言者 3**：\( ﾟ∀。\)cy

4. **发言者 1**：挑战其实已经开始了，想起来一些，再补充一下：  
     
   挑战时间是从今天的早上9点到下周礼拜五的早上9点  
     
   可以看电视剧，但是绝对不能看评论和弹幕  
     
   可以看娱乐性视频（这里直接锁定，只能看这几种：恐怖故事，模拟恐怖，案件解说），但同样，绝对不能看评论区和弹幕  
     
   可以和AI聊天  
     
   可以使用学习办公软件，但不会主动打开  
     
   可以听音乐，但不能看评论区  
     
   可以接听电话与短信

5. **发言者 4**：这样不会很难受吗\( ﾟ∀。\)

6. **发言者 1**：再补充一下：  
     
   如果游戏有联机玩法的话，那就不能使用联机玩法（仅限线上游戏，毕竟是脱离互联网计划）  
     
   可以听音乐，但同样不能打开评论区  
     
   下载东西或游戏时不能观看评论区

7. **发言者 1**（回复第 5 条）：\[引用第 5 条\]  
     
   算是嫌当今互联网环境实在太恶心，暂时避免  
     
   顺便试试看能不能减少一下自己对互联网那么依赖

8. **发言者 5**：既然能看某社区，我要在你的串里倒屎\(\`ヮ´ \)

9. **发言者 6**：除了使用QQ，其他就是我的日常啊\( ﾟ∀。\)

10. **发言者 7**（回复第 4 条）：\[引用第 4 条\]  
     
   可以和ai聊天直接绝杀，我玩酒馆能连续玩十个小时\( ﾟ∀。\)

11. **发言者 7**：听说停止刷碎片化信息之后记忆力和精力什么的会立马得到提升，不知道是不是真的  
     
   当然这个也是我刷视频看的\( ﾟ∀。\)总之cy

### 讨论 29

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Linn next-generation Klimax DSM with Organik DAC, Utopik power supply  
     
   This is probably my rant against my Linn NGKDSM, a top-of-the-line Linn next-generation Klimax DSM with Organik and Utopik PS, that cannot stream Spotify at CD quality, not to mention Qobuz Connect, Tidal Connect. My family, relatives and friends are all equally baffled that a player costing $48,230 plus tax lacks this capability, and it is not a joke.  
     
   At this point, I don’t know whether to laugh or cry. A $48,230 streamer/DAC still can’t outdo a $200 WiiM Ultra when it comes to software features.  
     
   \[图片省略\]image600×532 37 KB

2. **发言者 2**（回复第 1 条）：As this is a Naim forum, can I suggest that you swap it for a Naim streamer? :wink:

3. **发言者 3**（回复第 1 条）：Roon is the answer for me. In the world of Linn, if you’re in the KDSM market that’s probably not beyond means.  I do agree though Linn need to up their game on connectivity, whilst the rest of their software and facilities like Space Optimisation are very good.

4. **发言者 4**（引用未收录发言）：\[图片省略\] 发言者 5:  
     
   I live far too close to House Of Linn for safety  
     
   Tell me about it, I’ll be there in about 20mins. Where does that pension lump sum go? :man\_shrugging:

5. **发言者 5**（回复第 4 条）：Nice day for it. Enjoy.

6. **发言者 4**（引用未收录发言）：Linn don’t support Spotify lossless at all. They don’t even have a timeline they can share. The best they do is Spotify Connect 320bps. It’s frustrating for me as a Spotify user but I’ll just continue to use my Primare NP5. I’m starting to think this is probably the best way to manage streaming services.

7. **发言者 1**（回复第 6 条）：\[图片省略\] 发言者 4:  
     
   Primare NP5.  
     
   I thought  the Lumin U2 mini could serve as a superior streaming device.

8. **发言者 1**（回复第 2 条）：\[图片省略\] 发言者 2:  
     
   can I suggest that you swap it for a Naim streamer? :wink:  
     
   There are many tangible reasons why replacing a Linn NGKDSM won’t be straightforward. A Naim streamer might fit the bill in some respects, but matching the Linn’s sound quality would require several separate components, including a Naim NAC 552.

9. **发言者 6**（引用未收录发言）：Hi 某参与者,  
     
   I am confused by what you wrote here :thinking: …  
     
   \[图片省略\] 某参与者:  
     
   Further, the lack of AV bypass on the Linn unit  
     
   My understanding is that all the recent model releases of Linn DSMs have AV bypass possibility.  
     
   Mine certainly does and I have used this very feature\!  
     
   To which ‘Linn unit’ do you refer?

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Writing and reading to the QSPI Flash with Zephyr RTOS  
     
   I'm new with the Arduino Giga R1 and am making a project which I desire to write and read back multiple records of data recordings consisting of IMU data of 800 floats each in length. I've succeeded in partitioning and would like to store to the user partition 4:  
     
   Partition: 4  
     
   Bootable: No  
     
   Type: 0x0B  
     
   Size \[KBytes\]: 7168  
     
   Start \[C/H/S\]: 28/1/0  
     
   Stop \[C/H/S\]: 56/0/0  
     
   I've created a Flash Area \(fa\) for use in the flash\_area\_write\(\) and flash\_area\_read\(\) commands. The write wants 4 parameters:  
     
   The fa ... using fa  
     
   The off ... trying 0 but unsure if this is correct for partition 4  
     
   The src ... using float buf\[800\] and seeing fail code -22  
     
   And the number of bytes ... assigning the size = 800\*4  
     
   I've searched for explanatory documentation on achieving this and cannot find anything useful.  
     
   Is there a comprehensive tutorial, example or description of specifying these 4 parameters?  
     
   Where does the C/H/S come into play here?  
     
   Is there a Key/Value method to achieve this?  
     
   Thank you for helping me with this, it's the last critical requirement for my project.

2. **发言者 1**（回复第 1 条）：Thank you 发言者 2\! This gem of an example seems to answer all my questions on how to handle the Flash read and writes properly. I should be able to create separate 'keys' as off\_t types to store and retrieve my record values. I'm going to assume that the offsets are measured in bytes and need to be on the 4096 boundaries, correct?

3. **发言者 2**（回复第 2 条）：Does this program of post \#2 work?  
     
   I frequently collect Zephyr RTOS programs from Google/Gemini for my STM32U585 MCU of UNO Q board, and they  usually work with some corrections. AI is a good tool for a man who knows what he is asking for.

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Re: \[心情\] 跟自己的小孩嘔氣  
     
   沒想到回應這麼熱烈，謝謝各方的回應。  
     
   看到回應時第一個念頭想到，  
   果然是婚姻板啊，跟脆等社群的氛圍不一樣，  
   遇到婚姻中的性，還是偏向男方了，  
   真是頭一遭被這樣罵的啊。  
     
   雖然如此，不過看一輪下來，  
   我也是思考了一番，  
   有板友要我設身處地想想，  
   這我會再自己好好想一想，  
   往彼此都舒適的方向走。  
     
   原本主要是來抱怨丈夫對小孩的態度，  
   沒想到焦點跑往夫妻房事了，受教了。  
   （有謝謝有幾位幫小孩發聲的網友）  
   不過我認為夫妻的事是一回事，  
   但遷怒小孩這行為還是不行。  
   我想後續也會再把遷怒小孩這件事提出溝通。  
   就先用這篇謝謝大家的意見了。

2. **发言者 2**（回复第 1 条）：拿脆那種整天戰男女的來比就免了...

3. **发言者 2**（回复第 1 条）：先生把房事失敗遷怒小孩不ok，跟你們之間的房事問題

4. **发言者 2**（回复第 1 条）：是兩件事...

5. **发言者 3**（回复第 1 条）：什麼叫偏向男方，要挑起戰男女嗎？少看脆，脆上一堆

6. **发言者 3**（回复第 1 条）：偏差觀念和偏激言論。妳要是真信脆上那套，妳的婚姻

7. **发言者 3**（回复第 1 条）：只會往壞的方向走。但妳若只是受不了別人批評，要去

8. **发言者 3**（回复第 1 条）：脆上找同溫層，那就去吧！我是女生，我也覺得妳態度

9. **发言者 3**（回复第 1 条）：有問題。明明就有更好的處理方式，妳的態度反而讓事

10. **发言者 3**（回复第 1 条）：情惡化了！

11. **发言者 4**（回复第 1 条）：自己的婚姻自己砸，到時候不要賴我們，回去脆喔

### 讨论 32

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

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Does C/C\+\+/Rust/Zig have agent framework?

2. **发言者 2**（回复第 1 条）：Try vllm.cppBut then, my hairdryer also doesn't have one and I am actually fine with that.

3. **发言者 3**（回复第 2 条）：vllm.cpp is inference framework ?

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区 v6. Si  
     
   Article publié sur :			某社区 v6. Si. - 某社区.fr  
     
   Il y a 11 ans, on rigolait du fait qu’il nous avait fallu 11 ans pour sortir une nouvelle version. Bon. A priori c’est notre rythme… Car la « nouvelle version » de 某社区, mise en ligne fin septembre 2015, commençait largement à souffrir des mêmes défauts reprochés à la version qu’elle remplaçait. Il aura fallu un sacré coup de motivation pour…

2. **发言者 2**（回复第 1 条）：Maintenant, faut préparer les 25 ans de GZ. :ninja:

3. **发言者 3**（回复第 1 条）：Haha j'y pensais récemment, justement, aux 25 ans de GZ. Parce qu'on bon, la dernière fois qu'on a fêté l'anniv de GZ, c'était les 15 ans non?

4. **发言者 1**（回复第 3 条）：Les 10 ? Bordel je refuse de chercher le thread dédié  :smiley:

5. **发言者 3**（回复第 4 条）：Les 10 je me souviens c'était la semaine suivant mon mariage. Du coup faire les 25 l'année prochaine serait parfait pour fêter mon divorce :smiley:

6. **发言者 1**（回复第 1 条）：Thx 发言者 2, je range ça là.  
     
   \[图片省略\]image622×626 41.9 KB

7. **发言者 4**（回复第 1 条）：Je vais rester simple, simplement merci à tous les boss pour tout ce qui est fait pour garder cette communauté telle qu'elle est depuis tant d'années  :heart: \!  
     
   Cette v6 est s3xy.  
     
   Btw au rythme ou ca va le prochain anniv se fera en visio depuis l'ephad :ninja:

8. **发言者 5**（回复第 1 条）：Je confirme qu'on a bien fêté les 15 ans, c'était dans un bar "geek" à côté de mon chez moi de l'époque, métro Strasbourg-St-Denis, dont le nom m'échappe là tout de suite.  
     
   \[图片省略\]p9230073jpg\_37033113690\_o1920×1440 561 KB

9. **发言者 6**（回复第 1 条）：Deux choses :  
     
   c'était mieux avant, il me reste quelques souvenirs de l'interface en pixel d'à l'époque, tout était mieux avant, notamment ma souplesse et la musique.  
     
   merci caf et l'équipe de garder la lumière allumée, cafzone/某社区 a bercé plus de la moitié de ma vie, faire un tour sur le forum est comme retrouver sa chambre d'ado chez ses parents, un point de repère dans le web.

10. **发言者 7**（回复第 1 条）：un ménestrel des médias  
     
   \[图片省略\]

11. **发言者 8**（回复第 1 条）：Rah je suis le prems \!  
     
   c'etait mieux avant  
     
   ==&gt;

### 讨论 35

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

### 讨论 36

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

### 讨论 37

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：GTA6 Releaseparty ab 15:30\!  
     
   Hallohallo, wir haben alles umgeschmissen und sind doch gleich um 15:30 schon live und zocken rein in GTA\!\!  
     
   Alles andere was heute geplant war ist aufgeschoben, nicht aufgehoben\!  
     
   Eddy und Nils sind die ganze Zeit für euch am Start und im Laufe des Tages gesellen sich allerlei Böhnchen dazu, unter anderem Valle, Bonnie, Tim, Sarah, Henry, Ben uvm\!\! &lt;3  
     
   Das wird toll, kommt rum\! Stream geht mindestens bis Mitternacht, danach schauen wir mal, juhuuuu lets fucking goooo\!\!

### 讨论 38

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：最近外网 "GTA My City"（把自己的城市做成 GTA 6 风格）热度挺高，看到大部分人都是用 AI 生成静态图，文字和街道经常崩，就干脆用 MapLibre GL JS \+ OpenFreeMap 的开源 3D 建筑矢量瓦片，搓了一个能在浏览器里 360° 旋转的 3D 城市地图工具。  
     
   在线体验（免登录、纯前端、无水印）：  
   \[链接隐去\]  
     
   主要做了几个好玩的细节：  
   1. 支持搜全球任意城市/地标，跨城市切换时做了一个模仿 GTA 经典的「卫星雷达锁定 \+ 3D 螺旋空降」过渡动画，同时在遮罩后预加载 z14 建筑瓦片避免黑屏；  
   2. 内置 3 套 3D 着色主题（Leonida Neon 霓虹风 / 80s 迈阿密粉青风 / Tactical 暗黑战术风）；  
   3. 可以在自己家门口放置 Safehouse（安全屋）、Heist（抢劫）、Mission 发光坐标钉，一键导出带五星通缉 HUD 的高清 PNG；  
   4. 另外两个 Tab 附带了 AI 城市提示词生成器和纯本地 Canvas 照片 GTA 滤镜。  
     
   欢迎大家搜自己所在的城市试试，求轻拍和反馈！

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Alice v0.6.0

2. **发言者 2**（回复第 1 条）：Always nice to see KDL being used in the wild.

3. **发言者 3**（回复第 1 条）：Not to be confused with \[Alice ML\]\(\[链接隐去\]

4. **发言者 4**（回复第 2 条）：Would \*looove\* if the XSLT-like system were merged or schema support added to an LSP for UX.

5. **发言者 5**（回复第 3 条）：I was definitely hopeful that someone was reviving aliceml when I clicked through\!

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Red Queen \(Devil May Cry 5\)  
     
   i recreated this model of Nero’s Red Queen sword from Devil May Cry 5, focusing on how to recreate mechanical parts that fit together, as well as learning how to make metal textures and fire effects.  
     
   More details in ArtStation: Red queen, 发言者 1 B.  
     
   某社区: Red Queen - 发言者 1  
     
   \[图片省略\]banner1080×1080 1.46 MB  
     
   \[图片省略\]sheet1920×1920 2.37 MB  
     
   \[图片省略\]base1080×1920 3.17 MB  
     
   \[图片省略\]version31080×1920 3.36 MB

### 讨论 41

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：有无了解冷兵器的入门书推荐\(｀･ω･\)  
     
   jp

2. **发言者 1**：jp

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：A way to play sound on dropdown item hover  
     
   Godot Version  
   v4.7.stable.official \[5b4e0cb0f\]  
     
   Question  
   Is it possible to detect a hover event for the dropdown items of an OptionButton? There’s a item\_focusedsignal, but no item\_hovered signal. We would like to play a sound on hover to increase feedback for the player.

2. **发言者 2**（回复第 1 条）：They have the mouse\_entered and mouse\_exited signals, sounds like that’s what you need?  
     
       
     
         Godot Engine documentation  
       
     
       
         
     
   Control  
     
     focus\_entered\(\) 🔗 \| Inherits: CanvasItem&lt; Node&lt; Object Inherited By: BaseButton, ColorRect, Container, GraphEdit, ItemList, Label, LineEdit, MenuBar, NinePatchRect, Panel, Range, ReferenceRect, RichTextLabel, Se...

3. **发言者 1**（回复第 2 条）：How can that be used to access the automatically generated PopupMenuItems? I’m not talking about hovering the OptionButton but the items in the dropdown it generates.

4. **发言者 1**（引用未收录发言）：Thank you for your solution. Unfortunate that we need to do it manually as such. Do you happen to know if PopupMenu.get\_focused\_item\(\) is expensive? We’ve been trying our best to keep our \_process\(\) calls as minimal as possible to keep the game light on the CPU.

5. **发言者 2**（回复第 4 条）：That’s why I disable process when the dropdown is not open. I wouldn’t think it’s that expensive unless you plan to have the user open up 100s of dropdown menus at once. That code only runs WHILE a dropdown menu is open in my example.

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：OpenEnlarge: am I the only one trying it?  
     
   I came across this negative image inverter entirely by happenstance  a few days ago. It’s  at \[链接隐去\] It seems a natural candidate to be ‘featured’ here, so I’m rather intrigued as to why there is no mention of it \(aside from the knee-jerk reaction that results from it probably having an association with AI-based development processes\).  I have moved on from playing/testing with it to actively using it as I found it so productive and effective. I look forward, but not a lot, to the negative reaction.

2. **发言者 2**（回复第 1 条）：The link has a 404 error.

3. **发言者 3**（回复第 1 条）：\[链接隐去\]

4. **发言者 4**（回复第 1 条）：Thanks for pointing that out.  
     
   It seems the inversion algorithm is based on the same math as darktable’s negadoctor. That’s a good thing, I presume, since I’m happy with negadoctor \(as a starting point\) and use it most of the time. However, at first glance, NegPy seems to have better inversion IQ.  
     
   I’ll add it to my list to test.

5. **发言者 5**（回复第 1 条）：I just downloaded it but felt pretty lost trying to use it and achieve results I am happy with. I would be interested in seeing some of the results you are getting. There are some playraws of scan negatives which might be good to use if you are interested.

6. **发言者 1**（回复第 2 条）：Yes, my over-enthusiastic typing error. Apologies.

7. **发言者 6**（回复第 1 条）：AppImage.  
     
   \[图片省略\]openenlarge\_appimage626×424 5.24 KB  
     
   Started from a terminal:  
     
   \[图片省略\]terminal824×594 45.4 KB

8. **发言者 6**（引用未收录发言）：Good to hear that it works on other distros.  
     
   I had a look for that “could not load” message, but libgvfsdbus.so is on my system and in the right place.

9. **发言者 7**（回复第 8 条）：You also get an error for a “undefined symbol: g\_task\_set\_static\_name”. Could that be a version issue ?  \(g\_task\_set\_static\_name appeared in version 2.78 of libgio, current version seems to be 2.90.x\)

10. **发言者 6**（回复第 9 条）：Ah, that could very well be the case, a locate libgio shows version 2.0 \(and libgiomm is at 2.68 but I don’t know if that’s related\). I’m on Xubuntu 26.04.1, I’ll try OpenEnlarge on another distro later.  
     
   Thanks\!

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Tuneshine Album Art Display  
     
   Anyone have one of these? I just picked one up and deciding whether to keep it. It’s a 6"x6" lo-fi frameless LCD screen \(think pixilation by design\) that displays static album art. It Integrates with various sources \(recently Roon was added, but I have it synched with Last.fm because I listen to Radio Paradise frequently and Roon doesn’t pass the album art\). My wife is lukewarm at best on it. The pixilation is both a feature and a bug. Some albums look pretty cool, some are kind of a mess.

2. **发言者 2**（回复第 1 条）：I’d never heard of one of those until your post. Quite an interesting looking device with the low res LED display.  
     
   \[图片省略\]IMG\_1511600×400 53.5 KB

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[心情\] 跟自己的小孩嘔氣  
     
   是否同意記者抄文：NO  
     
   過兩天了，我現在還是覺得心情很差。  
   一個爸爸會因為小孩佔據床，讓自己打不到炮，而對小孩嘔氣冷暴力嗎？  
     
   我們家是爸爸在外縣市工作，  
   沒特別事情的話，每週末回來。  
   家裡這邊因為租屋處小，房間只有一雙一單，  
   平常就是我帶兩個小孩睡雙人房，  
   爸爸回來自己睡單人房，  
   但5歲老二很愛爸爸，  
   九月還是十月開始會去找爸爸一起睡。  
   這週假日回來，他就預告了這週要做，  
   於是他跟小孩商量回到隔壁房間睡，  
   但小孩不要，我沒介入，就讓他跟小孩去協商，  
   畢竟想做的是他，我是能免就免，  
   （都快半百的阿姨了，還想要我怎樣）  
   小孩睡他房間也是他開心同意的，  
   就不知道他怎麼講的，孩子都哭了，  
   但孩子還是不願意離開房間，  
   最後哭著睡著了。  
   而爸爸也負氣的去沙發睡。  
   隔天他就氣呼呼的問我那要怎麼辦，  
   我說還有一個晚上的機會啊。  
   當天他完全忽略小孩，也對我臭臉色，  
   我也覺得莫名其妙對我發火做什麼，  
   總之就是家裡一個低氣壓，  
   他自己關他房間做事，  
   我要張羅兩小，  
   只有外出用餐時跟我們走出去。  
     
   我自己也被他態度弄得很火，  
   早上也跟他說小孩就是很愛他所以才要找爸爸一起睡，  
   但沒想到親情輸給性慾，  
   小孩莫名其妙被仇視，  
   糟糕到我們走在路上，  
   小孩不小心絆倒受傷求抱，  
   他也沒關心小孩，也不想抱小孩。  
   我內心真的很火！  
   一次打炮沒打到就能棄小孩不顧？  
   對我來說，你這只是壓力大想找洞發洩吧，根本不是什麼恩愛情誼。  
     
   我不懂欸，  
   請問男士們，因為小孩的阻擾而愛愛失敗，  
   你們會這樣情緒失控嗎？

2. **发言者 2**（回复第 1 条）：我們會利用小孩上學不在家的空檔\+1 你們週末可以讓5

3. **发言者 2**（回复第 1 条）：歲小孩上才藝課騰出時間再做更專心\+1 也不會擔心被

4. **发言者 2**（回复第 1 条）：撞見很尷尬\+1

5. **发言者 3**（回复第 1 条）：你可能不關心，但對他來說這是一個他非常期待的活動

6. **发言者 1**（回复第 1 条）：補充：我可能不樂意，但他要求我幾乎會配合。何況這

7. **发言者 1**（回复第 1 条）：次週末有兩晚，有必要在第一晚沒做到就把自己小孩當

8. **发言者 1**（回复第 1 条）：仇人嗎？

9. **发言者 4**（回复第 1 条）：離婚Ｒ這ＭＯ簡單

10. **发言者 4**（回复第 1 条）：反正這個最後八成也是讓外援投手上場

11. **发言者 3**（回复第 1 条）：sure，你當然可以這樣想，但這樣能解決問題嘛

### 讨论 46

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

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Local server itself not available from hotspot  
     
   What app is this about, and its version: Hotspot v2.3.2~ynh1  
     
   What YunoHost version are you running: 12.1.42  
     
   What type of hardware are you using: Old laptop or computer  
     
   Describe your issue  
   When using the hotspot, everything works great to go on the usual web, even some apps that connect to the server the hotspot is on.  
     
   But as soon as a client on the hotspot tries to connect to the server’s domain, it doesn’t “resolve”\(?\) and times out.  
     
   Was tried too what using the gateway ip directly and it not resolving either \(it usually as the admin portal\)  
     
   Here’s the sketch of the connection, knowing the server connects to internet using a vpn:  
     
   Clients =&gt; Hotspot =&gt; \(server?\) =&gt; VPN Client =&gt; internet  
     
   It was never possible to connect to yunohost.local either  
     
   Share relevant logs or error messages  
     
       
     
         \[链接隐去\]  
       
     
       
         
     
   hastebin

2. **发言者 2**（回复第 1 条）：Hello,  
     
   What you call “VPN client” is a VPN app client on your YNH server that connects to a distant VPN server, right?  
     
   Is the server’s domain reachable without issue when accessed from a machine that has direct access to internet, i.e. not connected to Internet through the hotspot?  
     
   When connected to the VPN?  
     
   When trying to access directly without going through the VPN?

3. **发言者 1**（引用未收录发言）：You are right,  
     
   I will have a look at the hosts file

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Odd message from Qobuz  
     
   Has anybody else received this by email? Could it be a scam?  
     
   After telling me my account may be deleted soon, it says:  
     
   “We’ve noticed it’s been almost 3 years since you last explored Qobuz. To comply with GDPR and protect your data, inactive accounts are automatically removed after extended periods of inactivity. Your account is scheduled for deletion on December 18, 2026 unless you log in before then.”  
     
   I use Qobuz every day.

2. **发言者 2**（回复第 1 条）：If you hover over the sender’s name, what address does the email come from?  
     
   Anything other than bona fide \[联系方式隐去\] = scam.  
     
   Given your comments, probably best to treat it as a scam anyway.  
     
   ATB, J

3. **发言者 3**（回复第 1 条）：Avoid clicking on links sent in e-mails. Instead log into Qobuz and check your account. It looks like a scam to me. I’ve not had one \(yet\).

4. **发言者 4**（回复第 1 条）：I’ve not had such a message. I would tread with caution and ignore it.

5. **发言者 1**（回复第 2 条）：Yes, it just turns from Q… to Qobuz. No email address. I think it’s a scam. The Qobuz AI help monkey says it doesn’t recognise the instructions. I’m waiting on their human to get back to me but yes, email blockinh time.

6. **发言者 5**（回复第 1 条）：Do you always use the Naim app to access Qobuz content? If so, it could be a reason for this. Try using the native Qobuz app. In any case, I would not trust any email or links in that email. Directly go to their web-site if you want to check your account.

7. **发言者 1**（回复第 6 条）：No, I always go to Qobuz first.

8. **发言者 6**（回复第 1 条）：Exactly same message received.  
     
   Message sent by accounts@ account . qobuz . com without spaces  
     
   I use Qobuz regularly mainly through Roon although I have certainly logged into in the last year and have an annual subscription.  
     
   I will wait for more info before I do anything.  
     
   CK

9. **发言者 7**（回复第 1 条）：I would forward the email to Qobuz to make sure that they are aware of it. Most organisations send out warnings to subscribers to raise awareness of scams like this.

10. **发言者 1**（回复第 1 条）：I’ve checked the email address and ChatGPT claims it’s genuine but however, it could still be being used maliciously by a third party.  
     
   I’ve emailed Qobuz help directly and am awaiting their reply.

<!-- samples:end -->

