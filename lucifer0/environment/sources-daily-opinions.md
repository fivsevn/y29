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

采集时间：2026-11-27 15:45:26（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: 4K fsync tail latency and SQLite WAL lock failures on a $4/mo VPS

### 讨论 2

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

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 新聞下的推文都在罵政黨  
     
   我還是比較喜歡上某社区看鄉民討論  
   滑Threads會覺得一直被推送很無腦的文  
     
   但是人氣比較高的某板  
   新聞下的推文一堆都在罵政黨、什麼都可以扯政黨  
   覺得也很無聊  
     
   但完全不能討論到政治也是不合理就是了  
     
   ----  
   Sent from Be某社区 on my iPhone 17

2. **发言者 2**（回复第 1 条）：比較想看真人討論 真實的聲音 而不

3. **发言者 2**（回复第 1 条）：是大家聲音都一致 就有點無聊

4. **发言者 3**（回复第 1 条）：一致在哪？

5. **发言者 4**（回复第 1 条）：基本上，不同意那個意見的人，大部

6. **发言者 4**（回复第 1 条）：分都會迴避評論，怕被圍剿

7. **发言者 4**（回复第 1 条）：所以意見一致是很正常的

8. **发言者 5**（回复第 1 条）：政府是人民公僕 做不好當然罵

### 讨论 4

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：The need for a formally verifiable mainstream programming language

2. **发言者 2**（回复第 1 条）：earlier this month someone at our local functional programming group made the case that , well, lean itself is a perfectly serviceable general programming language\!  
     
   Or at least the language itself has the right trappings. My impression is lots of the libs are still in the “lots of obvious and missing stuff” phase

3. **发言者 3**（回复第 1 条）：F\* extracting to OCaml is crazy good. It has both SMT backed refinement types and dependent types. There’s ADA as well. Liquid Haskell. Koka. ATS. Lean. So many options to evaluate before inventing something new.

4. **发言者 4**（引用未收录发言）：If you happen to have experience in Verus, how is it?

5. **发言者 5**（回复第 1 条）：\[链接隐去\] sounds very similar to what the author is suggesting. I‘ve never used it.

### 讨论 5

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

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：前几天在 某社区 发了一篇 Claude 的帖子，评论区不少人问 Etsy 开店的事，问得比我预想的多。索性把手上的资源整理成一个服务，先小范围试运行，链接放在最后。  
     
   背景  
     
   2018 年就在 Etsy 上卖东西，到现在 8 年。中间经历过几轮封店潮，买过资料店，也自己一遍遍尝试注册，把能踩的坑基本踩过：  
   自己折腾注册资料，验证过不去  
   用机场 IP 登录，被关联  
   欧美亲戚朋友担心税收问题，无法提供帮助  
   店铺遇到平台审核，提供不了验证信息。  
   后来稳定下来的做法只有一条：真实资料 \+ 注册地固定 IP \+ 本地主机，缺一个都容易出事。  
     
   这次试运行  
     
   首批 5 个名额，价格就是站上标的，不打折也不加价。问得多的问题我会补进 FAQ，所以直接在帖子里问也行。  
     
   不适合谁  
     
   想找"躺赚项目"的、对跨境电商一点都不了解、对手工艺和定制类产品一点经验都没有的—这三类都不合适。  
     
   我们不做  
     
   资料店、自媒体经常做的销量和利润虚假宣传、培训  
     
   链接与联系  
     
   \[链接隐去\] 绿泡泡：emNhaHpz（备注「Etsy \+ 地区」）· 邮箱：\[联系方式隐去\]

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Additions to National Cycle Network Maps - example in Flint  
     
   I have been trying to assist with clearing notes and have come across one where I am familiar with the issue that has been raised, but have no idea how to resolve. Another editor has also confirmed my view that the original poster of the note is correct, but he doesn’t know how to fix either. This is  not a unique situation .  
     
   The original note is OpenStreetMap You can see the current NCN5 tagging by looking along Golftyn Lane which goes SW from the position of the note.  
     
   The issue is that at this point NCN 5 is correctly mapped, but there is an alternative route which is not mapped. If you look at the image I have posted below you will see the alternative route in Purple and the Official Route in Green.  
     
   The Walk and Wheel Trust \( Newish name for Sustrans\) have a website for NCN5 which includes a link to OS maps where they do show both routes. I assume it would be bad form for me to post a screen shot of that though. You can find it via this page Route 5 - Walk Wheel Cycle Trust  
     
   So my question is - how should the alternative route be mapped?  
     
   \[图片省略\]NCN5 Flint1449×768 307 KB

2. **发言者 2**（回复第 1 条）：I would add the Ways that make up the alternate section to the same route relation, marking them with the role alternative. This role and a few others are documented on the Roles for Recreational Route Relations wiki page.

### 讨论 8

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

### 讨论 9

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

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Mails répétés toutes les 35 minutes par Nextcloud  
     
   What app is this about, and its version: Nextcloud 35.0.3~ynh1  
     
   What YunoHost version are you running: 12.1.43  
     
   What type of hardware are you using: Old laptop or computer  
     
   Describe your issue  
   Bonjour,  
     
   Depuis le 7 novembre, tous les utilisateurs de mon instance Yunohost reçoivent un mail de Nextcloud à intervalle régulier \(toutes les 35 minutes\). Pourtant aucune action n’a lieu au niveau de l’adresse mail…  
     
   Je vous joins une capture d’écran d’un des mails.  
     
   Merci par avance \!  
     
   \[图片省略\]ResizedImage\_2026-11-22\_17-21-58\_00721079×2288 158 KB  
     
   Share relevant logs or error messages  
   Voici les derniers logs de la mise à jour faite il y a 5 jours : \[链接隐去\]

2. **发言者 1**（回复第 1 条）：Cela a été résolu en désactivant l’option “Utiliser les e-mails de transfert des utilisateurs de YunoHost plutôt que les e-mails principaux ?” sur le panneau d’administration de l’application Nextcloud. Aucune idée si c’est un bug avec l’option, ou, si c’est le cas prévu lorsque tous les utilisateurs n’ont pas d’adresse mail de transfert

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：诸肥，嫌弃脸集中串，有没有搞头？

2. **发言者 1**：分享图片

3. **发言者 1**：分享图片

4. **发言者 1**：分享图片

5. **发言者 1**：分享图片

6. **发言者 2**：大半夜发嫌弃脸吗9k4你这家伙\(\`ヮ´ \)

7. **发言者 1**：分享图片

8. **发言者 1**：分享图片

9. **发言者 1**（回复第 6 条）：\[引用第 6 条\]

10. **发言者 1**：分享图片

11. **发言者 1**：分享图片

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Circuit Quest: from a simulated LED to breadboard wiring \(iOS/Android\)  
     
   I’m building Circuit Quest, an app for learning Arduino circuits on iPhone, iPad and Android. Here’s the part I wanted to show: getting from a working simulation to the actual breadboard connections.  
     
   This 19-second clip, recorded in the iOS app, shows an LED blinking, the same circuit in 3D, and the guide placing a resistor:  
     
       
       \[图片省略\]  
       
     
   A small detail in that last step: the resistor goes into e9 and e12, on separate connected strips. Putting both legs into the same strip would bypass the resistor. Those are the details the guide is meant to make clear.  
     
   Would that placement step be clear enough for someone using a breadboard for the first time? You can judge it from the clip.  
     
   If you want to try it, the designer, simulator and core lessons are free; optional Plus adds advanced missions. Circuit Quest on the App Store · Circuit Quest on Google Play.

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Fury -v- Joshua…  
     
   Who’s gonna win it…  
     
   Tyson for me….

2. **发言者 2**（回复第 1 条）：Tyson Fury claims he has been diagnosed schizophrenic. Is everybody hoping that two middle aged men bludgeoning each other senseless for the entertainment of admirers of pain and violence is going to improve his mental health?

3. **发言者 3**（回复第 2 条）：It will be like seeing Big Daddy v Giant Haystacks , but they at least tried not to seriously injure each other  
     
   I will keep my money in my pocket on this occasion.  
     
   After Fury’s claim about his schizophrenia I have a deep unease about this \( I have an acquired brain injury\)

4. **发言者 4**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   Who’s gonna win it…  
     
   I’d say Joshua, there’s more of him left than Tyson.

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Santa's Sack Swap Round 5 Gallery  
     
   Santa's Sack Swap Gallery  
     
   \[图片省略\]Supreme\_Santa\_Sack1734×2077 339 KB  
     
   Swap thread

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

1. **发言者 1**：某社区: Would you care for more than 2FA for any of your accounts?  
     
   Infrastructure has been hacked way too many times and some how the  Uno Reverse solution was to put onus on users to choose a more complex password that the user would not have used anywhere else in the past \(hence password managers came to existence\). Then some services added/mandated the support for requiring one additional authentication method, hence the term 2FA.As a user do you feel comfortable with that level of security or would you rather want to choose the number of authentication methods for your account based on the sensitivity of the service? In other words is 2FA good enough or would you prefer to have more.

2. **发言者 2**（回复第 1 条）：I would like to be able to use 2FA without texting my phone. Way too many places won't let you use fido, TOTP, passkeys or whatever without first enrolling your SMS provider as part of your auth.

### 讨论 17

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

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Darktable spektrafilm pack generator  
     
   As it might be missed in the thread it has been posted, I think a new post is better. I made a little website that lets you create a pack file for darktable’s spektrafilm module from all the film stocks currently available.  
     
       
         \[图片省略\]  
     
         发言者 1.\[链接隐去\]  
       
     
       
         
     
   Spektrafilm Pack Creator for darktable  
     
     Pick film and paper profiles from darktable and Negs, synced from git every night, and download them as one spektrafilm pack for darktable.  
     
       
     
       
         
         
       
     
       
     
   In case you want to contribute, this is the repo: GitHub - 发言者 1/spektrafilm-stock-repo: collection of digitized film stocks for forther usage in spektrafilm · GitHub  
     
   Thanks to all people involved digitizing film stocks and creating the shoulders to stand on with this page\! Enjoy. Also thanks to the GRKit project for the nice film stock icons and the general page design ideas :slight\_smile:

2. **发言者 2**（回复第 1 条）：I just started to play with spektrafilm, so sorry for my beginner question. I just downloaded a pack from the site and installed it as described. But then in darktable, I still get only the default film stock entries. I am using the latest nightly build on linux.

3. **发言者 3**（回复第 2 条）：Did you make the darktablerc change that’s in the instructions? I forgot to do that at first and also only saw the original pack.

4. **发言者 1**（回复第 2 条）：did you edit the rc file while darktable was open? Then it will get overwritten on closing

### 讨论 19

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[討論\] 你11月這期發票中多少?~~  
     
   今天又是開發票對獎日  
   又是幾家歡樂幾家愁  
   你中幾張多少獎金?  
     
   我先來:  
     
   中一張200\! ^0^  
   可以多買幾張耶誕卡了~~~  
   ------------------------  
   任發100批幣給有推分享中多少的  
   推才有 噓跟箭頭不算~~~  
   祝大家下次發票中大獎\!

2. **发言者 2**（回复第 1 条）：500而已，別人都中4000起跳

3. **发言者 2**（回复第 1 条）：你中200,不錯了

4. **发言者 3**（回复第 1 条）：70多張 中400 還不錯 明天可以吃好

5. **发言者 3**（回复第 1 条）：一點

6. **发言者 2**（回复第 1 条）：這一次沒中的絕對是少數

7. **发言者 4**（回复第 1 条）：不用對就知道0

8. **发言者 5**（回复第 1 条）：0張 ，全部都沒中

9. **发言者 6**（回复第 1 条）：這期的運氣要放到下期，中起來

10. **发言者 7**（回复第 1 条）：1700

11. **发言者 8**（回复第 1 条）：200

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Confiscating the Commons, part 1: The invention of proprietary software

2. **发言者 2**（回复第 1 条）：So I read this and \[part 2\]\(\[链接隐去\] but maybe I have to wait for part 3 to know how the commons are confiscated?  Unless I misunderstood something in the article, there's no discussion about someone taking free software away.  Instead, it's about companies building proprietary walled gardens on top of FOSS.  Which they're free to do.

3. **发言者 3**（回复第 2 条）：He is talking about LLMs, where copylefted code is 'laundered' during training, yielding similar, seemingly uncopyrighted output.

### 讨论 21

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

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：看 AI 越来越猛，想他的学习方式时，想到自己，自己的学习方式好像只有不断重复来加深肌肉记忆，从来没有真正理解学会，比如滑板尤克里里，并不是理解了乐理后的学习而是直接不断重复，即使是思考题，也都是学习固定的解题方法。自己好像从来没有学会过任何东西。你们有想过自己的学习方式么，纯靠天赋么，就像那啥拉马努一样答案直接从脑袋中冒出来，没有过程。

2. **发言者 2**：\[链接隐去\] 学习，然后泛化，  
   跟 AI 一样，做一个类似的任务，然后把这个任务延伸到类似的问题上，然后进行泛化

3. **发言者 3**：我打羽毛球，羽毛球有三不打：童子功不打，功夫熊猫不打，诡异老登不打。其实的诡异老登就是楼主说的这种，考虑甚至不是天赋，而是纯纯的个人经验的长年积累，一般的选手即使学个两年，也是无法应对的，但是三不打亦有高下只分，诡异老登只能垫底，另外两个会"功夫"的随便能抽爆他。

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Kanboard upgrade, checksums don't match  
     
   What app is this about, and its version: 1.2.57~ynh3  
     
   What YunoHost version are you running: 12.1.43 armhf  
     
   What type of hardware are you using: Internet Cube with VPN  
     
   Describe your issue  
   Same issue as here mentionned here,  
     
   \[链接隐去\]  
     
   Checksum are not matching the actual packages  
     
   Share relevant logs or error messages  
   \[链接隐去\]

2. **发言者 2**（回复第 1 条）：Hello,  
     
   It was fixed yesterday, try again\!  
     
   Though it’s been a few release in the 2 last months there is this issue with this app, due to some unusual pattern in upstream release process \(seems like tags are re-pushed after original release\). Might happen again at the next release FYI…

3. **发言者 1**（回复第 1 条）：Thank you very much and for the explaination too, I understand better now :smiley:

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：小道消息:达里奥开始解封了一批中国用户的Claude，不知是因为股价压力还是因为释怀了失蛋之痛

2. **发言者 2**：说不定是为了让他们再充钱然后再封呢\( ﾟ∀。\)

3. **发言者 1**（回复第 2 条）：\[引用第 2 条\]  
     
   杀鸡取卵不可取呀

4. **发言者 3**：骗进来杀罢了

5. **发言者 4**（回复第 3 条）：\[引用第 3 条\]  
     
   哪有什么杀鸡取卵  
     
   鸡都是自愿的\(\*´∀\`\)上赶着送钱呢

6. **发言者 5**（回复第 3 条）：\[引用第 3 条\]  
     
   这不是当上亡灵法师了嘛

7. **发言者 6**：就像韭菜，噶了一批又长一批\( ﾟ∀。\)

8. **发言者 7**（回复第 3 条）：\[引用第 3 条\]  
     
   韭菜罢了

9. **发言者 8**：骗进来杀罢了

### 讨论 25

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Communicating via the BluePill USB port without flashing the usual Bootloader  
     
   I would like to be able to communicate serially via USB whilst still programming the board with an St-link dongle.  
     
   All the links I could find on the internet all recommend flashing the standard generic bootloader which works on some clones but not on others even after doing the recommended modifications.  
     
   On the ones that work this bootloader gets overwritten the next time I flash a new sketch via the ST-link. I have not tried this again recently but when I did in the past I had concluded that this is because St-link loads the sketch at location 0x8000000 which is also the location where the bootloader gets installed.  
     
   I have seen programs which manage to incorporate this functionality but unfortunately I have not managed to find out how they do it.  
     
   Any suggestions please?

2. **发言者 2**（回复第 1 条）：Change the build procedure for uploading with the STlink to put the sketch past the bootloader...  
     
   The STM32F103 has a bootloader in ROM, but it only supports UART; no USB.

3. **发言者 1**（回复第 2 条）：Thank you. And how would one do that?

4. **发言者 1**（引用未收录发言）：某参与者 . I actually do not want to load a bootloader. I am happy to program via the ST-Link.  
     
   What I want to do is to avoid using an external TTL2USB module mainly to reduce the clutter.  
     
   How do I go about enabling the Tools-&gt;USB menu? Please remember that when my utility will eventually be running, it will be directly to a PC outside the Arduino IDE.

5. **发言者 1**（引用未收录发言）：某参与者 . Thank you, I found that option. Still have to test it.  
     
   In my project, I will have a python program on a PC which would need to transfer data, to and fro, to a suitably programmed Blue Pill. No IDE would need to be involded.  
     
   Would enabling this option from arduino-IDE allow me to this?

6. **发言者 1**（引用未收录发言）：\[图片省略\] 发言者 3:  
     
   It should. It's a setting / some additional code \(not sure which one\) that is applied to the board.  
     
   That would be great thanks.  
     
   In the Arduino Blue pill sketch, where would I look for data coming from the USB? Would it be Serial, Serial 1, or?

7. **发言者 3**（回复第 6 条）：\[图片省略\] 发言者 1:  
     
   Would it be Serial, Serial 1, or?  
     
   No idea, I have no knowledge about the board.

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Dff versus dsf file format \(looking for file definitions\)  
     
   Can anyone point me to the definition of the different formats.  
     
   I have read that they only differ in headers so I could \(maybe\) write a program to convert from one to the other.  
     
   Thanks  
     
   \[Reason – I had some SACD rips in dsf and converted then to dff because they were smaller and worked with an earlier version of the NDX software. I didn’t  keep the originals and it seems really hard to get a program to convert them back. I converted them because there was a file-size limit on an early version of the NDX software. The latest NDX software no longer supports dff\].

2. **发言者 2**（回复第 1 条）：DSF is the one you want for storing and browsing music,  it supports embedded metadata such as artist and track titles plus the art  
     
   DFF does not.  
     
   Sound quality is the same

3. **发言者 3**（回复第 2 条）：Yep. DSF is the way to go. I’ve been ripping SACDs directly to DSF for years with excellent results using SACDExtract. The process is a bit tedious at first, but once you get the correct software, configure a player on your network \(only certain PS3s and a handful of other DVD players will work\) and run the client software, it’s easy.

4. **发言者 1**（回复第 3 条）：Agree.  
     
   I had some SONY rips in DSF but they were too big for early version of the NDX software and reduced them in size to DFF.  
     
   \[链接隐去\]

5. **发言者 4**（回复第 1 条）：Wasn’t there a utility dff2dfs for Linux?  
     
       
         \[图片省略\]  
     
         \[链接隐去\]  
       
     
       
         
     
   Downloads – Signalyst  
     
       
     
       
         
         
       
     
       
     
   We never found naim streamers excel with DSD.  Try converting to hires FLAC and  compare \(using FFMPEG\).

### 讨论 27

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: AgentDesign – Make your coding agent draw each screen before it codes

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Torréfaction \#393 : du GTA6 \(bah oui\), du Nvidia \(surprise \!\), Blade Runner 2099, et LadyBird \(c’est non\)  
     
   Article publié sur :			Torréfaction \#393 : du GTA6 \(bah oui\), du Nvidia \(surprise \!\), Blade Runner 2099, et LadyBird \(c’est non\) - 某社区.fr  
     
   Cette semaine : Selaco: The Machines of War, GTA 6 Mini Tip, Ladybird, c’est de la merde™, iZotope Photon, Grand Theft Auto VI: The Album, You Can See Everything, Blade Runner 2099, Nvidia, the Jensen Saga, Nvidia, toujours moins de GPU, et Nvidia, driver 621.40, toujours des problèmes...

### 讨论 29

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[討論\] 小心脆賣農產品  
     
   標榜高麗菜過剩  
   說一箱10顆xx元  
   然後免運 貨到付款  
     
   結果連結填了資料  
   說要實名認證  
     
   然後還弄了名稱叫做X貓客服  
   說實名認證要連銀行帳戶  
     
   見鬼了！  
     
   今天看到又更扯  
   直接說送兩顆  
   不知道有沒有人被騙

2. **发言者 2**（回复第 1 条）：存款繞過OTP被轉走預備軍

3. **发言者 1**（回复第 1 条）：雖然這樣講很瞎 但是他們如果騙到我

4. **发言者 1**（回复第 1 条）：的錢

5. **发言者 1**（回复第 1 条）：下輩子要加倍奉還啊

6. **发言者 3**（回复第 1 条）：不是看謎片應該會冷靜一點吧

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Qualcomm’s Oryon 3 Reaches the Top

2. **发言者 2**（回复第 1 条）：What's blocking linux usage on Oryon chips?

3. **发言者 3**（回复第 2 条）：Someone with the chip in real hardware and an LLM sub. Or the old way: someone with the hardware and lots of time.  
     
   \(Unless you asked what's not supported yet: mostly cameras and graphics if I understand correctly\)

4. **发言者 4**（回复第 2 条）：Getting Linux up and running on them is a struggle. If your device isn’t supported by the early Linux developer preview or the Ubuntu concept ISO then you’re out of luck. Even then expect issues with peripherals, audio, graphics, WiFi, etc.

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：What's the standard way to rig the eyelids so they follow the eye shape?  
     
   For a character with an oval eye like this \(in white in the picture\), what’s the standard way to rig the eyelids so they follow the eye shape/silhouette?  
     
   \[图片省略\]Screenshot From 2026-11-25 23-50-14561×602 203 KB  
     
   \[图片省略\]image561×602 170 KB  
     
   \(it’s a side view of a character similar to Mike Wazowski from Monsters, Inc.\).  
     
   These are my Rigify Type settings for the first bone in the eyelid chain:  
     
   \[图片省略\]image396×549 31.9 KB

2. **发言者 2**（回复第 1 条）：With shape keys

3. **发言者 3**（回复第 1 条）：You can use Shrinkwrap, for both the controllers and the geometry of the eyelids:  
     
   \[图片省略\]imagen1361×546 241 KB  
     
   \[图片省略\]imagen1263×540 302 KB  
     
   For the geometry, use vertex groups to control the influence of the modifier.

4. **发言者 4**（回复第 1 条）：There isn’t a standard way, shape keys, shrinkwrap are valid techniques…  
     
   One other technique could be to rig with the eye being round and then use a lattice to form the final shape.  
     
   You can also go crazy and have bones that skrinkwraps to the eye’s surface, to my knowledge you pick the right technique given your budget, the design and the final flexibility you’d like the rig to have \!

5. **发言者 1**（回复第 4 条）：Thank you\! 发言者 3 too\! Shrinkwrap Constraint on the Eyelid control bone \(and disabling the Limit Distance constraint the Rigify control has\), and Shrinkwrap Modifier to only the eyelid mesh brings the desired outcome. It still needs a bit of tweaking, but I think it’s the right way forward.  
     
   \[图片省略\]imagen678×896 280 KB  
     
   \[图片省略\]imagen650×762 471 KB

### 讨论 32

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：自从公司搬到一家优衣库隔壁之后，午后遛弯经常出入，导致买衣服的冲动消费多了不少。  
     
   某社区上一直有一个问题：“其实我觉得优衣库已经很贵了，为什么大家还定义它为快消低端？”，下面有人纠正，优衣库的定位是“平价耐消”，而非“低端快销”，一些回答的大致意思是，优衣库衣服总体而言，是对得起售价的，相比其他品牌服装，相对更便宜一些。比如我媳妇就认为，优衣库可以算是商场里面可以比较安心的走进去挑选的品牌，相对比较不那么“刺客”。  
     
   但是，假如按原价购买优衣库，对比其他国产而言，属实算不上便宜，300 一条牛仔，300\+的外套，200\+的衬衫，等等。  
     
   所以很多习惯买优衣库的小伙伴，可能会等大促，比如刚过去的双十一，优惠是 2000-600（btw，优衣库价格相对比较透明稳定，不会有先提价后促销的情况），再叠加各种奇奇怪怪的优惠，可能会有更大的折扣。  
     
   另外优衣库家自己也会在上架后一段时间，不定时的推出各种优惠活动，一些价格较高的品类有较大额折扣并不罕见，现在买的多了以后，只要是原价优衣库，看都不看。。  
     
   然而，V2 上面的巨佬们，可能没那么多心思去关注这类活动。  
     
   简而言之，我做了一个小程序，叫做“购优汇”，帮助去跟踪优衣库的价格，希望让以折扣价购买优衣库这件事情，能够更容易一点。基本上做的就是取下价格，然后当有降价时，或到达目标价时，推送消息提醒。因为某社区限制，某个商品提醒过后，需要再次点击提醒才能继续推送，因此个人建议目标价提醒可能会比较好用。通常 8 折以下个人认为算好价。  
     
   购优汇：  
   \[图片省略\]

### 讨论 33

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

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Systemd - Service Hardening vs Containers  
     
   Discuss  
   With all the AI-based hacking that is occurring recently, I started to spend time improving the security posture of my Yunohost instance at home. The first thing I did was remove access to all apps on my instance from the public internet, and replace it with a Tailscale network, by removing port-forwards from my firewall into my Yunohost.  
     
   The second thing I did was have my LLM run a security audit of the Yunohost apps I have installed. It gave me a list of a few more security-related flags I could add my Systemd services definitions to reduce permissions. Rather that restricting permissions, I cold remove all permissions and grant only what is necessary – that is what a container’s perspective. I believe Systemd has some container-management now.  
     
   Is anyone else here interested in having their Yunohost apps installed into a Systemd-managed container, rather than a hardened Systemd service? I’m not a security expert, so I don’t know all attack vectors, but it seems like a better security choice to me.

2. **发言者 1**（回复第 1 条）：Actually, I think there’s a lot more to the security story than just service hardening. I’ll work on an essay that considers the whole picture and share it here.

3. **发言者 2**（回复第 1 条）：Please, if you find an important security issue: send a mail to the Security team \| Yunohost instead of publish here

### 讨论 35

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

### 讨论 36

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

### 讨论 37

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Mini Apple and Punpkin Pies  
     
   I usually make mini apple pies and this year I used muffin lines and it didn’t allow ease of making the lattice cover. No matter how much butter I put in the wells, it sticks. I like the lattice design better, but these bit sizes are great for portion sizes.  
     
   \[图片省略\]10000219551920×2550 638 KB  
     
   \[图片省略\]10000219661080×617 145 KB  
     
   \[图片省略\]10000219481920×2550 689 KB  
     
   \[图片省略\]10000219491920×2550 637 KB  
     
   \[图片省略\]10000219501920×2550 710 KB  
     
   \[/grid\]  
     
   I used this for the apple pies and followed the recipe on the back of a pumpkin puree can and cooked the same way as the mini apple pies.  
     
       
         \[图片省略\]  
     
         Pinterest  
       
     
       
       \[图片省略\]  
     
   Mini Apple Pies Recipe - Shugary Sweets \| Mini apple recipes, Homemade apple...  
     
     A collection of ingredients and items related to making apple pies. It includes pie crusts in a muffin tin, sugar, nutmeg, cinnamon, flour, vanilla, and diced apples. Apple pies in muffin tin, Mini apple pies easy, Apple pie recipes

### 讨论 38

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：I Learned to Stop Worrying and Love the AI  
     
   A few years ago talking heads and AM radio personalities went cookoo over AI. The warnings were replete with assertations of total destruction. I blew them off as doomsdayesque viewer/listener headline/listener bastards that saw dollar signs in words.Assuredly, they completely misunderstood the technology and the intricacies of how AI functions and what it was capable of. They read enough science fiction to regurgitate what sounded like knowledge of the future.Interestingly, they were largely right in the end. The tech has evolved fantastically quick. The wildest scenarios preposed from previous predicions is becoming realistic.I do not worry about those scenarios. I do not fear the wildest predictions. Throughout history humans have developed weapons, ideas, technologies, and systems that detractors predicted would kill us all or would lead to insurmountable changes to society.Electricity is not the devil. The printing press was not a detriment to society.AI will fundamentally change many things. That is a good thing. Humanity will forever be preserved.What is Humanity? We will perpetually find out.Happy Thanksgiving to everyone.

2. **发言者 2**（回复第 1 条）：My approach to AI isn't fear so much as respect, and hoping for the best. Happy Thanksgiving\!

### 讨论 39

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

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：v.4.1.0: Call for testers :\)  
     
   :carpentry\_saw: Call for Testing: :hammer\_and\_wrench:  
     
   I’ve just released new pre-release packages for the version :arrow\_forward: 4.0.9 :arrow\_backward:  \(listed as the latest dev packages on the G’MIC downloads page\). I’d be interested in getting feedback on these packages, particularly for the G’MIC-Qt plugin, whose code has been significantly modified \(should be more responsive than ever\!\).  
     
   :arrow\_forward: G'MIC - GREYC's Magic for Image Computing: A Full-Featured Open-Source Framework for Image Processing - Download

2. **发言者 2**（回复第 1 条）：Does this mean thousands of parameters gui filter can work well now? I have a not released filter that has thousanda of parameters \(color related\). Though to be fair, this is why I’d like a palette dialog. And I also wanted a crack on grid variant of existing dialogs.

3. **发言者 1**（回复第 2 条）：The parsing of filter parameters should have been slightly improved yes. I can’t tell if a thousand parameter filter will work, but it’s worth trying\!

4. **发言者 3**（回复第 1 条）：Threw a couple of presets at it and they worked well, David.  I say it’s a keeper \(and yes; today is my Thanksgiving holiday; lol\).   :slight\_smile:

5. **发言者 4**（引用未收录发言）：Kubuntu 24.04 / Gimp 3.2.8 / gmic\_gimp\_qt v4.1.0  / QT5  
     
   Too many filters, I went down  from Colorful Blobs to Warp \(BRF\)  About 20 filters with points in the preview …and all worked. Gave up.  
     
   Looks like deformations are ok.  Anything in particular that might not work ?

6. **发言者 1**（引用未收录发言）：Thanks 某参与者 \!  
     
   Could you please try this ?  
     
       
     
         \[链接隐去\]  
       
     
       
         
       
         
       
     
       
         
         .  
         
     
         
           
           committed 04:24PM - 24 Nov 26 UTC  
           
     
           
             
             \[图片省略\]  
             dtschump  
             
           
     
           
             
             \+3  
             -1

7. **发言者 1**（引用未收录发言）：Pushed some modifications on the git repo and everything seems fine now.  
     
   Just compiled the plug-in on Fedora 45 and that works right now:  
     
   \[图片省略\]gmic\_fedora1906×1050 297 KB

8. **发言者 1**（引用未收录发言）：Thanks 某参与者 , this gain is a bit unexpected I must say, but it’s always good to take :slight\_smile:

9. **发言者 5**（回复第 1 条）：The Arrays &amp; Tiles - Montage filter only works properly with up to 28 layers. When attempting to run it on an image with 29 or more layers, the filter behaves incorrectly.

10. **发言者 5**（引用未收录发言）：No, there is no error message displayed anywhere.

### 讨论 41

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 日語學習似乎鑽牛角尖  
     
   有時候看到一些影片想吸引注意吧  
      特別把某兩種類似說法放在一起  
      說明有何不同  
      但其實  
      評論上面有時候會有日本人回覆:  
      根本完全沒想過有這樣子的使用差別啊  
     
      中文的話  
      飯跟白飯  
      開水跟白開水  
      誰來說說有什麼不同?  
      什麼心情下會說"白開水"?  
     
      又再想到  
      中文很妙耶  
      很多字有兩種寫法  
      雞跟鷄  
      有人了解透徹嗎?  
     
      曾經到補習班學過日文好幾年  
      有日籍老師說  
      ですけど 是口語熟人在用的  
    　ですが的話就正式場合  
      新聞播報什麼的  
     
      可是我現在看天皇召見宇宙太空人  
      這位太空人說話中都用ですけど耶

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Omnigent — a meta-harness for building and running AI agents

2. **发言者 1**（回复第 1 条）：I have no idea whether this qualifies for a flagging or a flogging, or whether I've tagged it right, but it looks like a boon for those who use LLMs for coding.

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Skyrim inspired medieval tavern room diorama  
     
   I come from Maya and Houdini. As I was learning Blender I created this first project. It was fun to work on it\!  
     
   Video :slight\_smile: :  
     
   Skyrim inspired medieval tavern room diorama  
     
   Picture :  
     
   \[图片省略\]Preview\_SkyrimRoomDioarama\_V008\_CamRender\_All\_2026-10-311920×1080 1.74 MB  
     
   More info at my site : \[链接隐去\]

2. **发言者 1**（回复第 1 条）：Why isn’t my video embedded?

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：简单总结一下，就是我们本身使用 Quickwit，然后想着让多 Agent 去探索一下看看是否有性能提升的空间，用了一个 Clickbench 的 Benchmark 作为参考，结果效果真挺不错的。  
     
   链接在这里： \[链接隐去\]  
     
   感叹一下，如果 Token 足够的情况下，让 Agent 自己不断转起来，能做的事情太多了，  
   这才几年时间，AI 已经从最早只能做补全，到接管开发，到有机会能持续自主开发了

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Fondue und 193. OSM-Stammtisch Zürich, Fr 11. Dezember, ab 18:30  
     
   Das jährliche Fondue essen und der nächste OSM-Stammtisch in Zürich findet am Freitag, dem 11. Dezember statt.  
     
   Wir treffen uns in der Bitwäscherei, ein Hackerspace in der ehemaligen Zürcher Zentralwäscherei. Der Hackerspace ist ein paar Fuss-Minuten vom Bahnhof Hardbrücke entfernt \(~300m laut OSRM\).  
     
   Datum: Mittwoch, 11. November 2026  
     
   Zeit: Ab 18:30 Uhr  
     
   Ort: Bitwäscherei, Neue Hard 12, Zürich  
     
   Weitere Infos wie üblich im OSM-Wiki.  
     
   Zur Planung des Fondues gibts eine Umfrage: Poll - Sosm Fondue - nuudel

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How to gradually add vocab to Master\+?  
     
   I apologize as I’m certain this has been discussed before but I can’t find the thread. I really want to start incorporating master\+ for my vocab \(I’ve already done so for grammar\) but I’m worried I will have a deluge of over 1000 reviews if I do so. Is there any way to mark just a few items at a time as master\+ so I can space out the reviews?

2. **发言者 2**（回复第 1 条）：Sounds like they resolved this, but when I did the initial update all I was slated to get like 2000 reviews on one day and staff manually paced them out for me.  
     
   That is to say, even if it isn’t fixed, staff could help you out if it came down to it\!

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Generalized platform for building custom agent harnesses  
     
   What if you can configure each component of an agent harness from a web application and get a downloadable binary of the harness which runs on your own infrastructure?  
   Any opinions/feedback/ideas would be appreciated.

### 讨论 48

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

<!-- samples:end -->

