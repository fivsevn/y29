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

采用时沿用本次操作保存的案例映射；涉及研究补充时，在 `researchMaintenance` 对应条目的 `summary` 记下材料日期、标题和改编方向，不补回原身份或平台。具体研究仍回到相应专题，不在多处复制整段；新鲜公共资讯的观察继续按[执行与发布](../docs/publishing.md#填写当前更新)记录。

## 当日素材

<!-- samples:start -->

采集时间：2026-11-20 14:42:13（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：我发现有个词叫贴脸开大，同时开大又可以指拉屎，那么……\( ﾟ∀。\)

### 讨论 2

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Asset UPnP Universal  
     
   I’ve been using Asset on my old QNAP NAS since 2016. Having upgraded to a QNAP TS-233 which uses an Arm 64 bit processor I thought I would be able to upgrade Asset free of charge \(my original purchase was a dedicated QNAP version that supposedly had lifetime upgrades\).  
     
   Having tried registration retrieval using my original order number none of the packages offered were for QNAP - all I could find was an offer to upgrade to Asset UPnP Universal, so I did that and have a receipt and order number BUT using the link in the email and the new order number the same thing happened - noQNAP Universal just an offer to buy one. The only 64 bit packages I could see were for Raspberry Pi not QNAP.  
     
   I’ve tried logging into the dBpoweramp forum - my user details are recognised but every time I try to post a query I’m told I need to log in - but the login then doesn’t work.  
     
   Has anyone any idea how to get round all of this? Or knowledge that the dBpoweramp sites are not working properly?

2. **发言者 2**（回复第 1 条）：发言者 4 perhaps?

3. **发言者 3**（回复第 1 条）：I bought the Asset Universal last year. The link in the email gives the following options.  
     
   \[图片省略\]IMG\_95691206×1970 287 KB

4. **发言者 4**（回复第 2 条）：Hi FR and 发言者 1,    I’m out of UK at moment and not good iphone access, plus not a QNAP user,    best I duck out.

5. **发言者 5**（回复第 3 条）：Same for me if I use the link in my email. Also using QNAP. Best contact dbpoweramp / asset.

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：InferNode — a modernised 64-bit Inferno OS, used for AI agent testing

2. **发言者 2**（回复第 1 条）：It’s not obvious how this is meaningfully different from using eg docker. They have a few comparison tables but it’s not clear there’s really a meaningful distinction.

3. **发言者 3**（回复第 1 条）：The website is just a pile of AI;DR slop that is horrible to read.  
     
   Is this actually Plan9/Inferno-based?

### 讨论 4

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：522 Pomegranate Suzanne  
     
   \[图片省略\]522 Pomegranate Suzanne3150×2395 1.54 MB  
     
   \[图片省略\]522 Pomegranate Suzanne Clay3150×2395 562 KB  
     
   Blender 5.2.2  
     
   Models: Blendkit, iMeshh, Poly Haven HDRI  
     
   Addons: Render Raw, Lens Sim, Sanctus Library  
     
   GIMP  
     
   No AI

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Recherche d'un gentil graphiste pour refaire les cinematiques de mon jeu  
     
   Bonjour ici , j'ai un petit jeu que je pense vendre sur Steam et je suis une tanche monumentale en graphisme, pour l'instant mes assets sont générés par le jeu et ça passe plus ou moins,  
     
   par contre les cinématiques sont moches ,  donc je cherche un graphiste qui pourrait me les refaire .Ce sont des cases BD actuellement générées par ce cher Claude , j'en ai une vingtaine actuellement , je pense en avoir une quarantaine d'ici que tout le contenu soit produit. L'idée étant de garder la scène mais de la redessiner en mieux \(ce qui vu la qualité actuelle ne devrait pas étre hyper compliqué\)  
     
   On verra en mp pour les tarifs, devis , prix fixe ou pourcentage sur les revenus du jeu , vu que tout travail mérite salaire.

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：GTA6 Releaseparty ab 15:30\!  
     
   Hallohallo, wir haben alles umgeschmissen und sind doch gleich um 15:30 schon live und zocken rein in GTA\!\!  
     
   Alles andere was heute geplant war ist aufgeschoben, nicht aufgehoben\!  
     
   Eddy und Nils sind die ganze Zeit für euch am Start und im Laufe des Tages gesellen sich allerlei Böhnchen dazu, unter anderem Valle, Bonnie, Tim, Sarah, Henry, Ben uvm\!\! &lt;3  
     
   Das wird toll, kommt rum\! Stream geht mindestens bis Mitternacht, danach schauen wir mal, juhuuuu lets fucking goooo\!\!

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：darktable manual - new and shiny\!  
     
   I had a small creative-cody itch I needed to scratch so over the last couple of days I revamped the theme of darktable’s manual \(with help by claude…\):  
     
   old…  
     
   \[图片省略\]grafik2140×1395 281 KB  
     
   vs new\!  
     
   \[图片省略\]grafik2140×1395 377 KB  
     
   A bit more colorful, better handling of wide screens, TOC in the right panel, some tweaks to the responsive layout.  
     
   If you guys find and problems I overlooked hit me up in this thread or open an issue at dtdocs repo :slight\_smile: .

2. **发言者 2**（回复第 1 条）：Nice work, congrats\!

3. **发言者 3**（回复第 1 条）：Still a pain to read for a lot of folks.  
     
   More contrast is needed \!

4. **发言者 4**（回复第 1 条）：I like it and use it regular, thanks for curing your itches\! :slight\_smile:

5. **发言者 5**（回复第 1 条）：I like it a lot\! But I have a question… why does every page contain links to the translations? We also have a menu at the top?

6. **发言者 6**（回复第 1 条）：The overall aesthetic design looks quite nice, readbility and layout is also good. Lgtm\!

7. **发言者 7**（引用未收录发言）：OTOH the coloured lines, while not necessary, seem nicely designed and not obtrusive.  I think they actually save some space as they allow the topics to not be indented relative to the section titles.

8. **发言者 8**（回复第 1 条）：Excellent, much more pleasant and modern looking :\+1:

9. **发言者 9**（引用未收录发言）：\[图片省略\] 发言者 1:  
     
   maybe those tech-blocks should be expanded by default  
     
   If all the tech-blocks are concise I would. The ones I checked were.  
     
   It great to see the work you are doing on the documents. I had hoped to contribute to this myself but I allowed the markup process to deter me. I should try and master it and help out a little. I do feel guilty.

10. **发言者 9**（引用未收录发言）：I will try and discipline myself to learn how to contribute. I will make a point of looking at what you suggest.

11. **发言者 10**（回复第 1 条）：Thank you very much for your excellent work; the document looks great and is now much easier to read.

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Arduino Giga R1 GC2145 PCLK  
     
   Hello,  
     
   The Arduino Giga R1 tested successfully with the Arduino GC2145 camera module. The PCLK is not continuous.  
     
   Arduino Giga R1 library allows access to the GC2145 registers in gc2145.cpp and gc2145.h.  
     
   Could you please provide a minimum configuration to make the PCLK continuous?  
     
   A continuous PCLK is important for our project.  
     
   Sincerely,  
     
   SI

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Kann Daten in JOSM nicht finden  
     
   Wollte nach langer OSM-Abstinenz in meiner Homezone einige Korrekturen zu Land-/Gebäudenutzung einpflegen, die sich seit der Ersterfassung ergeben haben. Unter anderen ist hier: OpenStreetMap Landkarte noch die “Zahnarztpraxis Kastner” erfasst. Die Praxis ist aktuell geschlossen und das Gebäude steht zum Verkauf. Ich kann aber in JOSM kein Objekt finden, an dem die Informationen bzgl. Nutzung, Adresse eingetragen sind.  
     
   Ich würde mich freuen, wenn mal jemand drauf schaut und  mir sagt, was ich übersehhe.

2. **发言者 2**（回复第 1 条）：I see a building with the dentist info and a largely overlapping building:part with no other tagging than building:part=yes looks useless \(as it is\) to me.  
     
   Try clicking the building with the Alt key pressed that should cycle through stacked objects.  
     
   Or try clicking the JOSM button on history way 208756514 that should load the way in JSOM \(Make sure JOSM us running before clicking of course\)

3. **发言者 3**（回复第 1 条）：Die Suche nach z.B. Kastner kann auch helfen.

4. **发言者 1**（回复第 1 条）：Thanks for the help\! The tip about pressing Alt-key brought up the operator information.  
     
   How do I correct the operator information now? Should I just delete it?

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：很早就听说过苏格拉底提问法，觉得有道理，但自己学东西的时候几乎用不上。没人按着我的头一遍一遍问我「你为什么这么想？」，我一般看完解释，觉得懂了，就直接翻篇。  
     
   最近看到一家做量化交易的公司 Jane Street 把这套方法做成了一个叫 \[Socratic Tutor\]\(\[链接隐去\] 的 Skill。它不告诉你答案，而是先让你说说自己的理解，再顺着你的回答往下问。但凡有一点不清楚的地方就会露馅，用来自学非常好用。  
     
   咋样，你们还有啥好用的通过 AI 学习的方法没？

2. **发言者 2**：grill-me 也差不多

3. **发言者 3**：先让你说说自己的理解挺有意思，不过这需要聪明的 AI 驾驭，不然你稍微没有严谨表达你的意图，可能会无限问下去

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Decrease for armhole shape in Irish moss stitch  
     
   Morning fellow knitters  
     
   Ive been looking for help with how to decrease to shape the armholes in Irish Moss Stitch.  
     
   Im a confident knitter and  have tried about 5 ways i know to decrease to make either side look equal. Every way I’ve tried its lop sided.  
     
   On checking this forum the decrease page shows how to without the pattern and Ive tried every one\!  
     
   Otherwise its a lovely garment  
     
   Help please  
     
   Hayfield 5223 ,  marked “easy”  
     
   pattern says decrease one stitch at each end and every following alternative row but this has stumped me

2. **发言者 1**（引用未收录发言）：Seems I can’t yet post a photo ….  
     
   I have tried what you suggested but all very lopsided. Just wondering if I ditch trying to follow the pattern on the decrease :face\_with\_raised\_eyebrow:

3. **发言者 1**（引用未收录发言）：Thank you that does look better \!\!  
     
   That was going to be my last effort to make the first and last stitches of the row stockinette and ignore the pattern.  
     
   It would have been good if Hayfiled had given clear instructions……  
     
   I’ll give this a go Tom  
     
   Regards  
     
   Pat

4. **发言者 2**（回复第 3 条）：I think it works when there are 2 of the same stitch in the column before decreasing.  
     
   It was interesting to try it out.  
     
   If you try it and don’t like it let us know, there might be other options too.

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：The End of Continuous Rework  
     
   I built a free and open source tool your AI agents can use to reduce the rework we often have to do with AI:\[链接隐去\]

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：转载  
     
   \( ;´д\`\)

2. **发言者 2**：小孩子真好哄\(\`ヮ´ \)

3. **发言者 3**（回复第 2 条）：\[引用第 2 条\]  
     
   好歹是去哄了，而不是“你凭什么有资格出现这种想法”

4. **发言者 4**：重点当然不是什么多大多少钱的初音未来，是这样的妈妈呀･ﾟ\( ﾉд\`ﾟ\)

5. **发言者 5**：小孩子真好哄\(\`ヮ´ \)

6. **发言者 6**：\(;´Д\`\)好幸福，但是人生还是没有未来

7. **发言者 7**：重点当然不是什么多大多少钱的初音未来，是这样的妈妈呀･ﾟ\( ﾉд\`ﾟ\)

8. **发言者 8**：看成了大的futa和超大的牛来

9. **发言者 9**：没在那儿抱怨父母敷衍他然后又开始原生家庭我有创伤我好惨，比起父母，这个小孩更稀有\(　ﾟ 3ﾟ\)

10. **发言者 10**：\(;´Д\`\)

11. **发言者 11**：有这样令人羡慕的家庭环境的人也会吐槽原生家庭吗\(;´Д\`\)

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Statement standby or don’t?  
     
   Okay my S1 monoblock is quite heaty. Can advise if I should put it on standby mode when I go to sleep for example? My 500 is always 24/7 last time. Unsure for the Statement though as it is super hot :thinking:.

2. **发言者 2**（回复第 1 条）：Ours is on all the time and is warm but not hot unless I’m pushing the volume, usually when watching a movie

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Design for Understandability

2. **发言者 1**（引用未收录发言）：I agree they "should" already be mainstream. In practice, I see a lot of cases where they should be applied but aren't.

3. **发言者 2**（引用未收录发言）：&gt; if we'd made better progress on this as an industry, MCP likely wouldn't have come into existence  
     
   Can you say more about that?

4. **发言者 3**（回复第 3 条）：My feeling is that if all our UIs and APIs were easy to use them we'd just let the LLM screen-scrape them or make API requests according to the structure in the Swagger files or whatever. Why would we need to make a separate thing for the LLM if the thing we made for ourselves was easy?

5. **发言者 4**（回复第 1 条）：Nice post. Personally, I've always believed that the essence of writing maintainable code is minimizing the amount of additional information you need to reason about any particular function or module. A lot of the practices in the post fall out as corollaries of this general idea.

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Honey Berry Princess - Fan Art  
     
   Hey guys, this is another fanart/project/study.  
     
   Amazing original art by \[某参与者\]  
     
   \[图片省略\]HoneyPrincess\_Full\_Details copy1332×1920 162 KB  
     
   \[图片省略\]HoneyPrincess\_Clean2664×3840 434 KB  
     
   \[图片省略\]HoneyPrincess\_Close copy2664×3840 1.8 MB  
     
   \[图片省略\]Slide\_sides1920×1080 1.11 MB  
     
   \[图片省略\]HoneyPrincess\_Clay1332×1920 1.02 MB  
     
   \[图片省略\]chanin-suasungnern-candy-p003-1 copy1920×2716 632 KB

2. **发言者 2**（回复第 1 条）：This looks great\! How did you make the material for the honey? It looks super thick and nice.

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区 AI Policy  
     
   Does the 某社区 have an AI policy?  
     
   I would expect that topics or replies which are copied and pasted directly from the output of an AI model are not welcome.

2. **发言者 2**（回复第 1 条）：I don’t trust the replies I get from an AI in English, let alone in a language where I don’t have full fluency.  
     
   I have no idea what BP’s official line is, but I think I’ve seen responses elsewhere that things are handled by real people? Please take with multiple grains of salt, though, I’m just going off a vague memory of other replies.

3. **发言者 3**（回复第 2 条）：I think Clerk is specifically talking about a policy for the forums

4. **发言者 2**（回复第 3 条）：OH WAIT forums, not the content, oops. I am apparently not awake today, apologies\!

5. **发言者 4**（回复第 1 条）：For example, I asked Shampoo if his replies are AI generated  
     
   \[图片省略\]What actually happens when you come back after a break? \(a native speaker asking learners\)  
     
   发言者 4 You caught me. I write naturally in Japanese, and for my English posts I draft in Japanese and use a tool to help me put it into English  
     
   There isn’t currently a rule, and if there was it would be hard to enforce.

6. **发言者 5**（回复第 1 条）：just curious, is that for ethical reasons or accuracy or?

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：ARD Gaming  
     
   Hallo,  
     
   dieses Format scheint ja bereits einige Zeit zu laufen… um die 5 Jahre, lese ich gerade. Mir wars noch unbekannt und ich hab hier auch keine andere Forenthemen gefunden, die es erwähnen.  
     
   某社区 :  
     
   \[链接隐去\]  
     
       
         \[图片省略\]  
     
         games.ard.de  
       
     
       
         
     
   ARD Gaming  
     
     Das Gaming-Schaufenster der ARD: Spiele mit Sendungsbezug, Streams und Community — fair, zugänglich, für alle.  
     
       
     
       
         
         
       
     
       
     
   Ich finds jedenfalls schön zu sehen, dass es weiterhin lebendige Verbindungen zu den „Öffentlich-Rechtlichen“ gibt. Denn einige bekannte Gesichter aus der Bohnen-Crew sind \(waren bisher\) ja in diesen Shows doch zu sehen ab und zu.

### 讨论 19

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Using guix as the source of a package  
     
   Discuss  
   Hi all great people\!  
     
   How unusual would be to have a package that is packaged using guix and not released as a .deb? I’d like to propose and use a package like that, but I don’t know if it would be accepted as an official package.  
     
   I know guix can create .deb archives, but I’d like to use it as a \(totally fine\) last resort.  
     
   Have a great day\!

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Installing ESP32 chip or Dev Board  
     
   Are there any benefits to installing an ESP32 chip and its components onto a PCB? OR should I just solder down the dev board?  
     
   Any benefits or downsides? I am dithering

2. **发言者 2**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   ESP32 chip  
     
   By chip, do you mean the IC or a module?  
     
   \[图片省略\]image1094×638 118 KB

3. **发言者 3**（回复第 1 条）：Explain what your project is to get some specifically focussed ideas.  
     
   Generally, an ESP32 chip is difficult to work with specific layout requirements regarding antenna, crystal oscillator etc. and even if miniaturisation is a consideration there are extremely compact boards available.

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Witchy Wood Slices  
     
   I saw a cool wood slice art piece on Pinterest and fell in love with the idea of making something similar for \[某参与者\] in the Mystical Swap.  
     
   \[图片省略\]PSX\_20261109\_114107\_17942460965681920×2296 1.05 MB  
     
   I wanted to do a cascade of wood slices in varying sizes. I selected some slices and sketched designs on them before sealing each wood piece with acrylic medium. Then my husband foraged a likely branch that had been trimmed at his work. I scaled back the number of wood slices for better balance after selecting the perfect branch.  
     
   The slices were painted with acrylics and for the moon moth I used glow-in-the-dark paint as an accent.  
     
   \[图片省略\]20261103\_0829421920×1440 1.08 MB  
     
   \[图片省略\]20261103\_0831411920×2560 664 KB  
     
   \[图片省略\]20261007\_2357241920×1440 629 KB  
     
   \[图片省略\]20261007\_2357281920×1440 581 KB

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：我在青岛，现在还在试用期，一个月到手八千五。我女朋友在体检中心上班，一个月三千，公司还经常找各种理由扣她五百。  
     
   我俩谈了八个月，平时相处挺好的。前两天她说想去拍写真，我顺口问了句「需要花钱的那种吗？」然后就冷场了。我当时想的是，平时用钱的地方挺多，拍照自己拍或者找朋友帮忙也行。这事只是个例子，平时碰到类似的事，我也不太知道怎么开口。  
     
   要是想往结婚那一步走，花钱这事总得聊聊。想问下有过类似经历的朋友，你们一开始是怎么聊的？后来有没有商量出一个两个人都能接受、也真的照着做了的办法？

2. **发言者 2**：你让她自己去查查拍写真需要多少钱呗，然后看看你有没有能力或者愿不愿意为她这个爱好支出呗，这两个都没达到直接拒了，我不认为你们需要对齐消费观，你们都是普通人，都活着现实世界了，我不认为你们的消费观会有太大的差距，因为有很多事情本身是理解不了的，你理解不了她对写真和其它爱好的需求，她也理解不了你对电脑，显卡，电子产品的需求。如果在你能力范围只内，且你愿意帮就帮，不愿意就拒（告诉她你拒绝的愿意，看看她能不能说服你），很简单。

3. **发言者 3**：对齐不了的，只能在不影响生活的情况下互相包容，相反如果到了影响到了生活或者包容不了，那最好别谈婚论嫁。当然没批评你女朋友意思，毕竟没说让你掏钱，自己生活不出现问题的情况下偶尔消费一下也没什么。而且，你们只是冷场，又不是吵架，打个哈哈糊弄过去就行了。

### 讨论 23

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

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: IT Thinks – Build a GPU from a Single NAND Gate  
     
   Hi HN,I built a hardware puzzle game, you start with one NAND gate and every chip you finish becomes a part of next one. basic gates, adders, decoders, latches and finally GPU. last one are a chip that recognises handwritten digits.I am happy to discuss how we can create better levels to for those concepts. you can try demo/full game on Steam

### 讨论 25

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\( \`д´\)选出你最爱的岛颜吧！一人最多一票！

2. **发言者 1**：我先来，经典款弱智酱！  
     
   \( ﾟ∀。\)

3. **发言者 2**：当然是\( \`д´\)

4. **发言者 3**：\(　^ω^\)你说投票就投票？

5. **发言者 4**：\( ›´ω\`‹ \)  
     
   虚弱酱

6. **发言者 5**：当然是\(　д \) ﾟ ﾟ了

7. **发言者 6**：\(\*´ω\`\*\)很温暖的感觉

8. **发言者 7**：电柱\|∀ﾟ

9. **发言者 8**：\(\`ヮ´ \)  
     
   简单但是看起来很嚣张的笑\(\`ヮ´ \)

10. **发言者 9**（回复第 2 条）：\[引用第 2 条\]  
     
   附议

11. **发言者 10**：\(╬ﾟ∀。\)

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Naim Radio  
     
   Hi, anyone having issues with Naim radio tracks. I can’t seem to play any? All other radio stations are working fine. I get the track cover but the play button won’t work. Suggestions?

2. **发言者 2**（回复第 1 条）：Copy \[某参与者\]  
     
   Hi 发言者 1,   Naim HQ peeps don’t routinely read the forum or listen to Naim Radio, so you need to alert them if you find a problem.  
     
   Stevesky is the main man for all things internet.radio

3. **发言者 3**（回复第 1 条）：Working in NY  
     
   David

4. **发言者 4**（回复第 1 条）：Same here: I can play Naim Classic \(both hi-res and 320\), but not Naim Radio and Naim Jazz. All other stations stored in the app show no problems.

5. **发言者 1**（回复第 4 条）：That’s exactly the same problem I have. It’s been around three days since Naim radio last played.

6. **发言者 5**（回复第 1 条）：On my Cyrus streamer that runs Bluesound Naim Radio and Naim Jazz both disappeared from my favorites stored in radio.

7. **发言者 4**（回复第 1 条）：Both stations \(Naim Radio and Naim Jazz\) are back to normal, thank you.

8. **发言者 1**（回复第 1 条）：Both back working for me as well. :\+1:

9. **发言者 6**（回复第 1 条）：See \[某参与者\] ’s post in the iRadio thread above. It seems there could be further outages before the issue is fully resolved.

10. **发言者 4**（回复第 1 条）：…and they‘re both off again. App shows the track that currently is \(presumably\) played, but the station stays muted. After about 15 secs it switches back to the station you successfully played before.

11. **发言者 1**（回复第 10 条）：Thanks for the update. Now that I know it’s a streaming issue rather than my issue I’m not so worried\!

### 讨论 27

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Hiring a Systems Programmer for Boxem  
     
   Handmade Cities \[has\]\(\[链接隐去\] a job referral program, where engineers and employers reach out about open roles. \(It's a free community service, so I'm \[not getting paid\]\(\[链接隐去\]  
     
   I'm cross-posting an unusually good opportunity from \[Boxem\]\(\[链接隐去\] who are writing fast shipping software and are very keen to hire a veteran C programmer:  
     
   &gt; "You will program in C and compile to linux and WASM. Linux nonblocking socket servers and WASM UI apps with modern graphics drivers. Custom versioned databases written to fit exactly the task. Write from scratch to reduce volume of code and complexity."  
     
   Few more notes:  
   - Boxem's remote for now, but will open a Miami office Q2 2027, after which they'll pay for your relocation.  
   - \[You may apply\]\(\[链接隐去\] online already. Application includes salary bands and rest of the info you need  
   - I know the CEO so I've invited them to 某社区. Ask any questions for the next number of days and they'll respond here\!

2. **发言者 1**（回复第 1 条）：Did I miss something about the rules of 某社区? \(Seeing as this got flagged off-topic by a user.\) The \`jobs\` tag reads as:  
   &gt; Employment/Internship opportunities  
     
   This is an employment opportunity I wanted to elevate, because it's rare to know a CEO looking to hire a low-level programmer and wants you writing code from scratch.

3. **发言者 2**（回复第 2 条）：We've generally done these \[kinds of posts\]\(\[链接隐去\] in a shared quarterly thread with a fixed format.

4. **发言者 3**（回复第 3 条）：That doesn't seem like a valid reason for people to flag this as "off topic". I hope you or another moderator will do the competent thing and remove those flags.

5. **发言者 4**（回复第 4 条）：Jeez, chill.

6. **发言者 5**（回复第 1 条）：Seems like an interesting opportunity, but details are so sparse, C still strikes me as a strange choice for these targets, and being at the whim of Amazon sounds less than appealing. Probably a solid business, though.

7. **发言者 6**（回复第 1 条）：&gt; Boxem's remote for now, but will open a Miami office Q2 2027, after which they'll pay for your relocation.  
     
   Downgrading like that is crazy.

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Explosion experiments  
     
   Been experimenting with rendering explosions in blender  
     
   Feedback appreciated, trying to nail that houdini production look.

2. **发言者 1**（引用未收录发言）：subtle at high res but very true. Ill try that for the next iteration

3. **发言者 2**（回复第 1 条）：Very nice\! Any chance for a video tutorial?

### 讨论 29

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Query about すぎる  
     
   Hi everyone,  
     
   I am back from a break and recapping all N5 topics before getting stuck into N4 and I saw something that made me a little confused.  
     
   When I first learnt 〜すぎる I understood it to be used to express something is too much of that adjective and to have a negative nuance IE this cake is too sweet \(for my liking\)  
     
   But the topic I just read mentions it in a positive light so I just wanted to check, if I said 「うさぎは可愛すぎる\!」would the listening understand that to mean “bunnies are so freaking cute \(and seeing their cuteness fills me with joy\)\!” Or are they going to think that I find bunny’s cuteness deplorable.  
     
   If I can use it with positive nuance, what are the social rules for this IE just with friends, spoken and not written Etc etc.  
     
   Thanks in advance\!\!\!

2. **发言者 2**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   うさぎは可愛すぎる\!  
     
   I think it just means as in english, “bunnies are tooooo cute\!”  and i think you can use it with anyone but maybe more casual is just 可愛すぎ and more formal 可愛すぎます

3. **发言者 1**（回复第 2 条）：Thank you, thats what I was thinking too. I have been using とても to express when something is so or too cute, but will be fun to practice it with すぎる😀

4. **发言者 3**（回复第 1 条）：If you want to use a more casual way you can also say めっちゃ~  
     
   めっちゃ可愛い \(it is so cute \!\).  
     
   This is used a lot amongst friends but really casual.

5. **发言者 2**（回复第 3 条）：朝（ちょう\) eg 超可愛い （ちょうかわいい）is another one that i like a lot\!

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Moving to Godot  
     
   Godot Version  
   godot-4  
     
   Question  
   I have used Gamemaker often, and am just now moving to Godot. What are some of the biggest differences?

2. **发言者 2**（回复第 1 条）：Start here: Introduction to Godot — Godot Engine \(stable\) documentation in English  
     
   and go on to here: Your first 2D game — Godot Engine \(stable\) documentation in English  
     
   and if you later want to do 3D: Your first 3D game — Godot Engine \(stable\) documentation in English

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Les Clairvoyants \#116 : Secret Wars, Marvel fait sa guerre des mondes  
     
   Article publié sur :			Les Clairvoyants \#116 : Secret Wars, Marvel fait sa guerre des mondes - 某社区.fr  
     
   Épisode 116 : où Fask, Fox et Arkeon spéculent une toute dernière fois sur Avengers: Doomsday, font le focus sur la suite avec Secret Wars, sans oublier un petit coup d'œil sur toutes les dernières news en provenance du Marvel Cinematic Universe...

### 讨论 32

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：44 ynh apps not instalable/upgradable due to codeberg outage  
     
   Hello,  
     
   Codeberg is currently down. As a result, all apps whose upstream is hosted on Codeberg can no longer be installed or updated.  
     
   We hope codeberg are going to find a solution.  
     
   Here a list of apps we think it’s risky to upgrade or install now:  
     
   anarcosyndicalismebook  
   digipad  
   digiscreen  
   digisteps  
   digitools  
   digitranscode  
   digiwords  
   fail2ban-web  
   faircamp  
   feber  
   fittrackee  
   flohmarkt  
   forte  
   gamja  
   gotosocial  
   holos  
   liberaforms  
   lichenmarkdown  
   mailbag  
   mastofessb  
   memo  
   mitra  
   mlmmj  
   moviebuff  
   piefed  
   readeck  
   snac  
   streams  
   translite  
   zwiicms

2. **发言者 2**（回复第 1 条）：Has a woraround you can temporarily add this in your /etc/hosts file:  
     
   217.197.84.140 \[链接隐去\]  
   2a0a:4580:103f:c0de::1 \[链接隐去\]  
     
   Source: \[链接隐去\]  
     
   NB: i didn’t check the ip so i hope it’s the good one…

3. **发言者 3**（回复第 1 条）：It is reachable now

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Grand Canyon - Arizona, USA  
     
   IMG\_2212.CR2 \(7,4 MB\)  
     
   This file is licensed Creative Commons, By-Attribution, Share-Alike.  
     
   \[图片省略\]IMG\_2212\_PIX2058×1306 830 KB  
     
   Too hot, no hikes…

2. **发言者 2**（回复第 1 条）：I set white balance module to daylight. I presume the blue look in the canyon was natural but I may be mistaken.  
     
   DT 5.7IMG\_2212.CR2.xmp \(16.2 KB\)  
     
   \[图片省略\]IMG\_22122000×1332 825 KB

3. **发言者 1**（回复第 2 条）：This is Arizona and Utah on the other side. There, the rocks are crazy unbelievably red. My render is possibly a bit too reddish but close to natural.

4. **发言者 3**（回复第 1 条）：\[图片省略\]IMG\_22121980×1223 1000 KB  
     
   IMG\_2212.CR2.xmp \(8.6 KB\)

5. **发言者 4**（回复第 2 条）：I also think the rocks are redder \(as remembered, not necessarily as seen\) than these renders. I don’t have my computer at the moment, but I find for scenes like this I have to use the auto white balance picker without the colored part of the scene, so I would have picked the right side with the scene, with sky and plants.

6. **发言者 5**（回复第 1 条）：\[图片省略\]IMG\_22121158×771 240 KB  
     
   IMG\_2212.CR2.xmp \(35.6 KB\)  
     
   dt 5.6.2  
     
   Looks like a view from the South Rim. Looking north \(or any other direction\), it’s still Arizona as far as the eye can see. :sunglasses:

7. **发言者 1**（回复第 6 条）：Yes, from the South Rim, and looking North. Utah’s border is about 50 miles away \(~ 80 kilometers\)  
     
   In most common situations, you can see up to 3 miles \(~ 5 kilometers\) away to the horizon before the curve of the Earth blocks the view.

8. **发言者 6**（回复第 1 条）：Opening up the shadows.   I know; a bit mundane compared to some of my other edits here.   lol  
     
   :slight\_smile:  
     
   \[图片省略\]IMG\_22122400×1599 2.26 MB

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Gyro for accurate 90° turns on a small maze robot: is the MPU6050 still a good choice?  
     
   Hi all. I'm helping a kids' team with a small two-wheel maze robot \(micro:bit-based, but the gyro question is general\). We need repeatable in-place 90° turns, each within ±2°, over a 5-minute run. Side distance sensors will correct the heading while driving, so long-term drift matters less than per-turn accuracy.  
     
   We're considering a branded MPU6050 module \(Joy-IT SEN-MPU6050 or branded IMU based gyro\) rather than a generic GY-521, with:  
     
   a gyro bias calibration at standstill \(about 2 s\) at every power-up  
     
   a one-time scale calibration \(spin 10 full turns against a floor mark and work out a correction factor\)  
     
   Z-rate integration only \(no fusion\)  
     
   Questions:  
     
   With that calibration, is ±2° per 90° turn realistic with an MPU6050? What do you actually see?  
     
   How common are clone or faulty MPU6050 chips on cheap GY-521 boards, and does a branded module really avoid this?  
     
   Would you pick a different 6-axis IMU today \(e.g. ICM-42670, LSM6DSO, BMI160/BMI270\) for this job, and why?  
     
   Any tips on motor vibration, sample rate or filter settings for turn-in-place measurement?  
     
   Thanks\!

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：When are public holidays?  
     
   The opening hours in OSM is a link \(example Node: Ostrava 12 \(3937235341\) \| OpenStreetMap \), clicking on it shows that it was open on 2026-11-17, when it was actually not \(PH\):  
     
   \[图片省略\]image1028×276 29.5 KB  
     
   \[某参与者\] \(I have no means to contact them\) has a draft from 2019 Proposal:Public Holidays - OpenStreetMap Wiki , is there any update on why it stayed as draft? I would comment, it probably lacks tracking different kinds of PH \(example: shortened workday, “PH2”?\), but I’d already be happy with just PH0.  
     
   It would be very useful in applications which usually give a heads-up when something is closed. Mapping PH gives the added benefit of knowing when a \(usually the administrative region being\) country’s services are open \(for walk-in, for operations, for digital communication\). Most countries don’t have an easily findable definitive page about their PH.

2. **发言者 2**（回复第 1 条）：On the page parsing the opening hours, you must change the location \(lat long\) so that the country/region is correctly detected:  
     
   \[图片省略\]Screenshot\_20261119-2058301080×951 71.4 KB  
     
   Then the public holiday is shown:  
     
   \[图片省略\]Screenshot\_20261119-2058461079×1301 125 KB

3. **发言者 2**（回复第 1 条）：And that service’s data on when public holidays are per country/region is stored in opening\_hours.js/src/holidays at main · opening-hours/opening\_hours.js · GitHub

4. **发言者 1**（回复第 2 条）：Yeah well, one would assume the coordinates are included when opening the link. Copy-pasting coordinates \(after noticing/knowing the big colourful graphs aren’t correct\) each time isn’t exactly user-friendly.

5. **发言者 1**（回复第 1 条）：I tried looking for a place where the URL pattern is injected to GitHub - openstreetmap/openstreetmap-website: The Rails application that powers OpenStreetMap · GitHub, didn’t find it. Is it parsed from the wiki? Template:KeyDescription - OpenStreetMap Wiki

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[图片省略\]

2. **发言者 2**：应该把回复框放在标题下面, 这样就可以进来直接开骂, 而不用这么麻烦的看帖子了.

3. **发言者 3**：可以看下我码的这个脚本插件，我给他在右下角加了两个快捷图标，左下角还有个悬浮显示的设置图标。  
     
   \[链接隐去\]  
   \[链接隐去\]  
     
   \[链接隐去\]

### 讨论 37

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Re: \[閒聊\] 相親男生聽到女生薪水2萬多就跑了  
     
   有沒有想過  
   到了要相親的年紀  
   在台灣薪水兩萬多  
   這是什麼概念  
     
   這說是三級貧戶也沒錯吧  
   雖然不應要求要多會賺錢  
   但沒必要找一個這麼極端的吧  
   找她根本是沒苦硬吃了  
   在台灣這種薪水不住家裡的話，她養的活自己嗎

2. **发言者 2**（回复第 1 条）：26k養不活自己 但是40k養得活自己跟

3. **发言者 2**（回复第 1 条）：小孩

### 讨论 38

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

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Stream GTA VI into Apple's Picture in Picture  
     
   Link to blog post: \[链接隐去\]

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：一个公益岗日常串\(\`ε´ \)

2. **发言者 1**：情况是这样的，我于十月份入职了我家附近的街道，目前是的科室是:基层治理综合指挥室，简称指挥中心  
     
   名字虽然唬人，但是我干的是客服的活\( ﾟ∀。\)，每天负责给各个网格员，社区书记打电话催他们完成141平台上的事件，以及，处理一键报险

3. **发言者 1**：说到这个一键报险，这是我们本地的百日攻坚项目，前段时间有奖励一件一百，出现过最多拿了2700的人\( ﾟ∀。\)  
     
   然后这就苦了我们这些平台管理员，天天要处理几十件一键报险，最多的时候一天来了144件一键报险\(╬ﾟдﾟ\)  
     
   然后呢，因为群众（对钱的）热情似火，什么飞线充电，消防通道占用，地砖烂了，井盖破损，通通一键上报，甚至出现了职业报险人，沿街找飞线充某社区，几十条都是他报的\(╬ﾟдﾟ\)

4. **发言者 1**：好在最近上面收紧了不给钱了  
     
   跟我同岗位的还有一个女生，她最近被薅去学收发文了，我主要在管平台\(ﾉ\)\`ω´\(ヾ\)

5. **发言者 1**：哎，没人看么？ᕕ\( ﾟ∀。\)ᕗ

6. **发言者 2**：我们这边没你说的这些\(　ﾟ 3ﾟ\)ip 河北

7. **发言者 3**：继续发

8. **发言者 4**：公益岗好像都是没工资的？那包吃住吗\(｀･ω･\)

9. **发言者 1**：然后呢我们的待遇是朝九晚五双休，三餐免费，工资按最低标准工资发，最近我们这上调了最低工资，所以，涨工资了！\( ﾟ∀ﾟ\)  
     
   正式员工要值班，我们倒是到点就走，然后不知道为何，我这个月的工资六号就发了\( ﾟ∀。\)7

10. **发言者 1**（回复第 8 条）：\[引用第 8 条\]  
     
   有工资的有的，包吃不包住，我住家里，因为在家附近通勤时间十几分钟\( ﾟ∀ﾟ\)

11. **发言者 1**（回复第 4 条）：\[引用第 4 条\]  
     
   后辈下午请假去打九价了，现在指挥室就我一个人在\( ´\_ゝ\`\)

### 讨论 41

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Within Temptation and S10 - Roon  
     
   Can someone explain how it’s possible that the new Within Temptation single with S10 is or seems not available in Roon?  
     
   I can find it in Qobuz and Audirvāna, but have no succes in Roon.  
     
   \[图片省略\]10000923961080×1101 113 KB

2. **发言者 2**（回复第 1 条）：I can see it in Roon on Tidal… so I’d put it down to Qobuz being tardy in releasing the database update. Give it a day or so…

3. **发言者 3**（回复第 1 条）：Was hugely into this band back in the 00’s. The Silent Force and The Heart of Everything are such great albums.

4. **发言者 1**（回复第 3 条）：Not that I’d buy everything, but I sure like their music in general. This is a good song, I like it. Appearance of S10 is a surprise, as it’s not exactly a match one would expect with Within Temptation. But I have to say that her voice is a good fit\!

5. **发言者 1**（回复第 2 条）：It’s showing now indeed

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Mutex poisoning is not for everyone

2. **发言者 2**（回复第 1 条）：For whatever reason I've bounced off of explanations of poisoning and why it's a problem in the past, but this was super clear and well organised. I'm now aware of \`std::sync::nonpoison\` in nightly and finally understand why \`parking\_lot\` is a transitive dependency of all my projects. Kudos\!

3. **发言者 3**（回复第 1 条）：I realize that rust is no longer a young language where change can rapidly happen, but it's a shame that people are so afraid to introduce edition breaking changes, this is what editions are for. The issues with poisoning mutexes are well documented, and I think it would be a shame to keep it as the default going forwards.

4. **发言者 4**（回复第 3 条）：code in later editions must work together with code in older editions. That would make these changes very challenging.   
     
   Is it such a big deal to use another Mutex from a library?

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：LEGO Saturn V - Animations  
     
   Hello everyone.  
     
   After creating these visuals LEGO Saturn V, I wanted to continue the journey with some animations.  
     
   I’m experimenting with different visual styles and animations, which I’m sharing in this thread.  
     
   This is a good opportunity to challenge myself by :  
     
   Creating custom-made GNs  
     
   Creating procedural animations  
     
   Getting into sound design.  
     
   LEGO set : NASA Apollo Saturn V - 92176  
     
   Model by Stephan3321 on Mecabricks :  
     
       
         \[图片省略\]  
     
         \[链接隐去\]  
       
     
       
       \[图片省略\]  
     
   \[链接隐去\] \| LEGO set 92176-1 NASA Apollo Saturn V  
     
     NASA Apollo Saturn V by Stephan3321  
     
       
     
       
         
         
       
     
       
     
   Summary  
   \[图片省略\]SatV\_AnimTop\_WIP\_01\_Duddits\_BA1080×1080 589 KB

### 讨论 44

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

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Torréfaction \#391 : Le PSN est une passoire, l’explosion des “recomps”, OpenZ, Jensen Huang se fait démissionner de Nvidia \(\!\) et des annonces AMD \(yay \!\) pour datacenter \(meh\)  
     
   Article publié sur : Torréfaction \#391 : Le PSN est une passoire, l’explosion des “recomps”, OpenZ, Jensen Huang se fait démissionner de Nvidia \(\!\) et des annonces AMD \(yay \!\) pour datacenter \(meh\) - 某社区.fr  
   Cette semaine : hack Compte PSN, Sony toujours en-dessous de tout, Humble Fumble Bundle, réédition de 25 titres \(dont les franchises Wing Commander et Ultima\) chez EA, OpenZ, l’explosion des “Recomps”, MARVEL Cosmic Invasion - The Siege of Castle Doom, Fragmentary Order, GPUTaskman, Jensen Huang a la porte de Nvidia, AMD EPYC 9006 Venice, AMD MEXT : la flash qui se fait passer pour de la RAM, et AMD Zen 6 / EPYC Venice : l’archi détaillée...

2. **发言者 2**（回复第 1 条）：Y a-t-il des opérations de représailles envers le hacker à la petite semaine qui sont envisagées ? Je pense qu'il y a des personnes sur ce forum qui seraient ravies de mettre en oeuvre leurs compétences très particulières acquises au cours d'une longue, très longue carrière.

3. **发言者 3**（回复第 2 条）：Ouais je termine de passer par mes solutions à base de relations chez Sony et après c’est la guerre. :grimacing:

4. **发言者 4**（回复第 3 条）：C'est quoi le "petit truc en plus" des comptes PSN en 3 lettres ?

5. **发言者 3**（回复第 4 条）：Absolument rien. J’imagine que c’est pour sa la raconter chez certains, qui étaient en plus peut-être pas nés quand j’ai créé le compte. :skull:

6. **发言者 4**（回复第 5 条）：ok... Je posais la question car j'ai un "vieux" compte aussi ^^\!

7. **发言者 5**（回复第 1 条）：J'ai aussi un handle en 3 lettres. J'ai deja recu 3 ou 4 propositions de rachat ces dernières années. Je vais aller changer mon adresse email, par sécurité.

8. **发言者 3**（回复第 7 条）：This is the fun part : les mecs en ont même pas besoin.  
     
   \(╥﹏╥\)  mais do it, ça limite la surface de bullshit s’ils ont même plus le mail de base.

9. **发言者 6**（回复第 1 条）：Peut-être un peu lié, mais j'ai pas mal de demande d'ami sur Steam \(\+ quelques tentative a base de spoof de vrai amis\). Je me demande si c'est parce que j'ai compte Steam "day 1" :smiley:

10. **发言者 3**（回复第 9 条）：Yep faut faire super gaffe à ça, c’est effectivement ultra à la mode de piquer les comptes avec des pseudos courts. L’avantage c’est que Steam a un vrai truc de protection quoi…

11. **发言者 4**（引用未收录发言）：tu bosses chez Nvidia ? :sweat\_smile:

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：想要被扶她大姐姐狠狠○啊  
     
   为什么世界上没有扶她大姐姐主动爱我\( ´\_ゝ\`\)

2. **发言者 1**：被扶她女儿女儿逆推  
     
   被扶她上司追求  
     
   还是扶她青梅吃醋主动索取  
     
   一切真的是棒极了\( ´ρ\`\)

3. **发言者 1**：我乘着扶她的牛子，如同宇航员一样飞上天空，穿过大气，最终登上月球，这些都离不开扶她啊

4. **发言者 1**：我就像玩具一样被佩戴着，如同摇摇车上一起一伏，好快活啊，就像坐在大船上一样

5. **发言者 1**：可惜世界上并没有扶她  
     
   我也不喜欢扶她，  
     
   我只不过希望有一个人去热烈的爱我，去证明我被需要  
     
   但是大家表达爱太含蓄了，所以我只能把希望寄托在扶她的身上，现在，就让我坐上扶她的牛子，飞离这片没有扶她的世界吧  
     
   向太空出发，去寻找可能存在的扶她

6. **发言者 2**：愿望早日成真！\(=ﾟωﾟ\)=

7. **发言者 3**：我愿意加入扶她大姐姐教

8. **发言者 4**：\(´ρ\`\)

9. **发言者 5**：\( ´ρ\`\)

10. **发言者 6**：\( ´ρ\`\)

11. **发言者 7**：\( ´ρ\`\)

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Anyone using home battery backup to keep a Naim system running during outages?  
     
   I’m in Denver and we get enough winter storms that the power flickers or goes out for a few hours a couple of times a year. I have a Naim separates system and I keep wondering whether a home battery backup is worth it just to keep the hi-fi playing through an outage, or whether that’s overkill. My concern is how these units handle sensitive audio gear — I’ve read online that some inverters put out a modified sine wave and that pure sine wave matters for electronics, but I don’t know how much that actually affects a Naim setup. I also don’t want to spend a lot on something that might introduce hum or noise into the system. Has anyone here run their Naim gear off a home battery backup during an outage? How did it sound, and was there any issue with the switchover?

2. **发言者 2**（回复第 1 条）：I know nothing of any of this but when looking at The Living Voice website \(they specialise in upmarket horn speakers\) I noticed a section on battery powering hi-fi systems to improve quality. I believe they can supply such battery power systems so it might be worth you at least taking a look there.

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：15 million web servers on one VM - smoltcp, DPDK, AF\_XDP

2. **发言者 2**（回复第 1 条）：An interesting observation from the graph at the end that wasn't pointed out in text: TAP/TUN don't seem to do too badly in this use case. I'd take that hit.

<!-- samples:end -->

