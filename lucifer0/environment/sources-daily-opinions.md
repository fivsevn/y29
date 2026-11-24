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

<!-- intake-request:intake-256ea6def4ed43e38253e2d36cecc736 -->
<!-- samples:start -->

采集时间：2026-11-24 12:01:12（北京时间）

### 讨论 1

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

6. **发言者 4**（引用未收录发言）：Ich meinte Tag:leisure=outdoor\_seating - OpenStreetMap Wiki

7. **发言者 5**（回复第 1 条）：Schaue dir mal das an: DE:Key:seasonal - OpenStreetMap Wiki

### 讨论 2

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Midnight Messenger  
     
   I found a moon and star wooden serving set at Goodwill last year. Even though I had no idea what to do with them, they followed me home.  
     
   The moon, at least, found a purpose and a new home as a painting for 某参与者 in the Mystical Swap.  
     
   \[图片省略\]PSX\_20261119\_223401\_17951492844851920×1979 983 KB  
     
   I primed the wood with watercolor ground and painted the moon with gouache. Then I sealed it with acrylic spray. The moon is about a foot and a half tall.  
     
   Process pics:  
     
   \[图片省略\]20261020\_2201531920×2560 1.09 MB  
     
   \[图片省略\]20261020\_2301171920×2560 1.38 MB  
     
   \[图片省略\]20261023\_0034031920×2560 1.29 MB

2. **发言者 2**（回复第 1 条）：I love it\! Yet another inspiring project. :sparkling\_heart:  
     
   \(Now plotting a thrift store trip for goods to upcycle…\)

3. **发言者 3**（回复第 1 条）：WOW\! This is the perfect upcycle for your find. It’s as though it was always meant to become. Your mid-night scene is wonderfully rendered. I know that the owl is the star of the show, but the mushrooms and lush forest floor are my favorite of all the details.

4. **发言者 4**（回复第 1 条）：This turned out lovely. Especially the owl in flight. The mushrooms on the bottom are absolutely perfect\!

5. **发言者 1**（回复第 1 条）：Thank you, 发言者 2, 发言者 3, 发言者 4\!

6. **发言者 5**（回复第 1 条）：Jaw- dropping\! Is there anything about this that I DON’T love?? No, no there isn’t\! Gorgeous work\!

7. **发言者 1**（回复第 6 条）：Aww, thank you\!

8. **发言者 1**（引用未收录发言）：Aww, that makes me so, so happy\!

### 讨论 3

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

### 讨论 4

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：General measurements discussion for GraphWorks visualizer  
     
   Share and discuss your impressions of different measurements in the new GraphWorks visualizer tool, whether you’ve actually listened to the headphones or not \(which is normally taboo on most audiophile forums\).  
     
   I have not listened to most of the headphones in this tool btw. So most of my impressions will be based on the 5128 graphs, and sometimes some virtual listening. So they should be taken with a grain of salt.

### 讨论 5

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

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Watch out for hallucinated online guides \[OSTechNix\]  
     
   I was doing some research and came accross this guide from OSTechNix - \[链接隐去\] which contains technical misinformation and appears to be written with generative AI to some extent, and this is just the first single article I've read on their site so now I'm wondering to which extent this is a common practice.Anyway I wanted to warn yall cause I haven't read any reviews on OSTechNix, so just another reminder not to blindly trust what you read on the internet.

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：bartender 7 和 macos 27 有兼容 bug,不知道大家有遇到没有

2. **发言者 2**：已经退订了，26 以来就有很多 bug，而且我发现很多 icon 并没有用，十天半个月也不会点一次，直接隐藏了

3. **发言者 3**：6 的时候就放弃了，换 thaw 了，自带隐藏以后笔记本都 thaw 都不用了，只有 macmini 还在用

4. **发言者 4**：已经退订了，不如用 AI 自己撸一个

5. **发言者 5**：27 用系统自带就好了，不需要用这些 app，亲测效果不错

6. **发言者 6**：发言者 4 哪有这么容易，你是觉得 bartender 的开发买不起 claude max 吗？  
   macOS 26 以来，系统 API 的变化对这类产品做了很多的限制，至今没有一个产品能完美实现菜单隐藏收起的功能，这不是 AI 就能解决的

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Neck decrease instructions help  
     
   The instructions state, Cast off 3 sts at beg of next row. Dec 1 st at neck edge of next 6 rows. There are 51 sts to begin with, so I am assuming I should have 42 sts when I’m done only I’m not getting that number. I am assuming that I am Dec 1 st at the end of the right side row and then Dec 1 st on the wrong side row.  So rows 1 through 6 each get 1 st decreased at the neck edge.

2. **发言者 2**（回复第 1 条）：What is the name of your pattern and designer?  
     
   A stitch count of 42sts makes sense after the cast off of 3sts plus the neck edge decreases of 6 total. Yes, dec at the neck edge at the end of the row \(RS\) and beginning of the next \(WS\) until 6sts have been decreased at the neck edge.  
     
   What is your stitch count? Is it possible that you lost count on the neck edge decreases?

3. **发言者 3**（引用未收录发言）：It happens to the best of us\!

4. **发言者 4**（引用未收录发言）：Good to hear you figured it out\!

5. **发言者 2**（引用未收录发言）：Great figuring this out. Lots of shaping going on. I keep track with paper and pencil if there are multiple rows involved in all this.  
     
   It’s going to be a stunning sweater\!

6. **发言者 1**（回复第 5 条）：I’ll post a picture when I have the front finished so you can see what it looks like. :slight\_smile:

7. **发言者 1**（回复第 5 条）：The front, now to do the back.  
     
   \[图片省略\]IMG\_20261123\_104813\_7891754×1268 624 KB

8. **发言者 2**（回复第 7 条）：It’s gorgeous\! Those cable just pop and look terrific along with the other pattern sts. Thanks for the photo.

9. **发言者 3**（回复第 7 条）：Oh, that’s glorious\!  Well done\!

10. **发言者 5**（回复第 1 条）：That’s is so lovely :heart\_eyes:\! Good job :\+1: :clap:\!

11. **发言者 4**（回复第 7 条）：Lovely\!

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Zephyr-sketch-tool 0.4.2 \(Windows\) flagged by 8/71 on VirusTotal, quarantined by Bitdefender  
     
   Installing arduino:\[联系方式隐去\] for the UNO Q with arduino-cli 1.6.0 on Windows 11 downloads zephyr-sketch-tool-0.4.2-i686-mingw32.zip from downloads.arduino.cc. The zip's SHA-256 \(e746c08c5a5323f3cbd746b7a14ba2984e64863ad15a99b2742316fdf1edb9a1\) matches the checksum in package\_index.json.  
     
   The zephyr-sketch-tool.exe inside \(SHA-256 c30dce6e64f0b888681c2f0dadc1f3f770dada60f97421ff4b9eb2cd5ecacc2d\) is:  
     
   removed by Bitdefender Advanced Threat Defense: "Unsigned process arduino-cli.exe executed unsigned file zephyr-sketch-tool.exe";  
     
   flagged by 8/71 vendors on VirusTotal \(Avira, Fortinet, WithSecure, Elastic, Trellix, Cynet, Bkav, Rising\), label trojan.epack/gen2: VirusTotal  
     
   Can Arduino confirm whether this is a false positive, and is a signed build planned?

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Create Colorful 3D Text with Geometry Nodes in Blender \| Procedural Motion Graphics  
     
   \[图片省略\]Riddon\_Text\_Intro000865221920×1080 812 KB  
     
   Hi. Create stunning, colorful 3D typography using Geometry Nodes in Blender\!  
     
   In this project, I explore procedural 3D text design, combining vibrant colors, layered geometry, transparency, and depth to create a unique and eye-catching typography style.  
     
   This project demonstrates how Geometry Nodes can be used to create interesting procedural designs and creative motion graphics in Blender.  
     
   Software: Blender  
     
   Technique: Geometry Nodes  
     
   Category: Procedural Design \| 3D Typography \| Motion Graphics  
     
       
       \[图片省略\]  
       
     
   \[图片省略\]Riddon\_Text\_Intro000864001920×1080 1.09 MB  
     
   \[图片省略\]Riddon\_Text\_Intro000864731920×1080 622 KB  
     
   \[图片省略\]Riddon\_Text\_Intro000864491920×1080 955 KB  
     
   \[图片省略\]Riddon\_Text\_Intro000864741920×1080 873 KB

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：GTA6 , any platforms  
     
   Anyone ? :flexed\_biceps:t2:  
     
   \[图片省略\]IMG\_9216585×902 55.5 KB

2. **发言者 2**（回复第 1 条）：Just remember if you wait  for 6 years, all the bugs will be fixed; it will have a PS6 enhanced edition; and be available for $20.  
     
   If you buy it now, when the enhanced low cost version is out, you’ll already have played it to death.

3. **发言者 3**（回复第 2 条）：Supposedly the delays have been to ensure that the release version is as debugged as it can be. Takes 80 hours to complete if you are a competent gamer approx. But there’s many more hours of enjoyment over and beyond completing the main game.  
     
   I would say that for £70 approx that’s a good deal

4. **发言者 1**（回复第 1 条）：The radio stations was damn good , I would say they sounds better than some have to offer for steaming :laughing:.  
     
   5 hrs into the game and it’s so addictive . Tons of great contents and hilarious stuffs . Hahahah  
     
   I haven’t even touch the tip of the iceberg yet so busy with chores to do in this game . A worthy 10/10 .

5. **发言者 2**（引用未收录发言）：My friends at work are also playing it with their older kids.  
     
   Bonding over car jacking and murdering pimps in cold blood :joy:

6. **发言者 4**（回复第 5 条）：If you over do that your criminalise and harden your character… for a certain path… but there are other ways… the choice is yours.. but it is entertaining.  
     
   The car jacking can be fun… the best so far has been a mobility scooter to resolve a neighbourhood feud\! obviously quite early on

7. **发言者 1**（回复第 1 条）：\[图片省略\]IMG\_92241290×1850 303 KB

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：GPP -- Build on Go with classes, generics, exceptions, and more

2. **发言者 2**（回复第 1 条）：We already have Go\+\+ at home. It's called Java.

3. **发言者 3**（回复第 1 条）：Okay but do they \*have\* to make complete LLM reliance so "in your face" by having a website which might as well be based on \[Slopstrap\]\(\[链接隐去\]

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How to precisely add a node to the exact midpoint of a way in JOSM without shifting/deforming it?  
     
   Hi, I have a simple way in JOSM consisting of just 2 nodes.  
     
   While in select mode \(S\) i can see a yellow “x” marker right in the middle of the way. I want to insert a new node precisely at that middle point without moving or warping the way. However, i don’t really know how to do this.  
     
   Whenever i switch to teh draw nodes tool to click on the line, the yellow “x” marker dissapears, making it hard to eyeball the exact center of the way. If i drag the yellow “x” in select mode to create a node, its very easy to accidentally nudge it slightly off center or make the line uneven. Using simplify way tool isnt ideal either because it can modify the other ways connected to this one.  
     
   Is there a clean, native way or shortcut in JOSM to create a node right at the exact midpoint of a way segment without misaligning the straight line? This is possible in the iD editor but i struggle with it on JOSM.  
     
   Thanks^^

2. **发言者 2**（回复第 1 条）：I use this method:  
     
   add the node somewhere close to the middle  
     
   press E to select the adjacent nodes  
     
   Press Shift\+B to distribute the nodes  
     
   As a result the new node is in the middle  
     
   Edit: This presumes that plugin utilsplugin2 is installed

3. **发言者 3**（回复第 1 条）：If adding the new node makes the line uneven you could as well as 发言者 2 described select the neighbouring nodes of that line and then press L to straighten it again.

4. **发言者 2**（回复第 3 条）：If the new node is the only selected object you can also use L to straighten

5. **发言者 1**（回复第 2 条）：Thank you^^

6. **发言者 4**（回复第 3 条）：L only straightens, it doesn’t centre the node.

7. **发言者 3**（回复第 6 条）：Yes, L is not centering.

### 讨论 14

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

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：首先斯派克这个超级三明治看起来有点好吃  
     
   其次……

2. **发言者 1**：没夹更多的原因主要是因为感觉再加下去真的就吃不下了\(;´Д\`\)

3. **发言者 2**：你真吃啊\(´ﾟДﾟ\`\)

4. **发言者 3**：嘬嘬嘬\(　ﾟ 3ﾟ\)

5. **发言者 1**：感觉还不错\( ﾟ∀。\)7  
     
   就是全麦吐司口感有点差，下次换成普通吐司应该会好一点

6. **发言者 4**：\(´ﾟДﾟ\`\)

7. **发言者 1**：以及往里头加些金枪鱼，再多挤一点酱，味道会比只吃火腿片加吐司好很多\| ω・´\)

8. **发言者 5**：其它美食考虑复刻吗  
     
   超大牛排 变身牛奶了什么的

9. **发言者 1**：吃完力\(ﾉ\)\`ω´\(ヾ\)  
     
   总结一下，整体味道还行，毕竟每样东西味道都差不太多，加一块不会难吃到哪去。只不过不建议肥卿们完全按斯派克的方法，只吃吐司和火腿片，不然半斤多吃下去真的会噎死的\( ›´ω\`‹ \)  
     
   吃的话多加酱多加酱多加酱，不然没有酱的话到后边口感就和吃抹布没多大区别了（不过也有可能是全麦吐司的锅，等回头换成普通吐司再试一次ᕕ\( ᐛ \)ᕗ）  
     
   p.s.如果腌制金枪鱼有剩，就不要直接空口吃了，这直接吃感觉好奇怪\(\*ﾟーﾟ\)

10. **发言者 1**（回复第 8 条）：\[引用第 8 条\]  
     
   超大牛排其实有想过，但是需要超级大煎锅。缺少厨具只能遗憾离场\(;´Д\`\)

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: A React Native math keypad for kids – fractions, exponents, no WebView  
     
   I run a small school for gifted kids in Honolulu, and our students do some of their math practice on iPads. I wanted a 9-year-old to be able to type 3 2/5 the way she'd write it on paper, and couldn't find a React Native component that did it. MathLive and MathQuill are good editors, but they're built on the DOM, so in React Native they only run inside a WebView, and I didn't want a WebView inside every answer box.It's harder than you might think to to make sure arrow keys, taps in parentheses, delete keys, tab key, etc. on a hardware keyboard all work as expected. We packaged it up so other schools/builders don't need to reinvent the wheel.It's drawn with react-native-svg and runs in Expo Go. A dev build adds two small iOS modules.We pulled it out of the tutoring app our students use every day and put it under MIT. It hasn't been run on Android yet. Web support is new in 0.1.1: 0.1.0 crashed on react-native-web, which I found out while taking a screenshot for this post.

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Re: \[求助\] 沒有共識的解決方案  
     
   老魯伯觀點  
   這件事情重點不在貓, 在她心裡只有自己沒有你  
     
   如果你明擺的會感到不舒服, 而且也明確的表達了  
   那她還無視這點, 甚至擴大解釋到控制慾  
   那很明顯的她根本不在乎你  
   你感到難受是你的事, 她只要自己開心就好  
   甚至你反對了還會被解釋成是你的錯  
     
   你要不要回想一下, 你在這段關係裡面的重量是怎樣?  
     
   ---  
   如果是老魯婆講這番話  
   我大概會噴她  
   那我找年輕女人在家你也不能管  
   憑什麼是你說了算, 憑什麼是你在控制這件事  
     
   \[引用未收录发言\]  
   : 各位大大好，最近我家老婆跟小孩想養貓  
   : 我試著陪小孩去一次貓店逗貓抱貓，也試過陪去收容所看貓抱了一下，因為我對氣味毛髮等各種敏感，加上也沒有喜歡，所以我就一直投反對票。  
   : 但是老婆去看了以後就越陷越深，現在說我不養貓不是真的理由，而是想要控制權。  
   : 這招打下來我不知道怎麼回應，我們也沒養過，我也理解喜歡小動物的心情以及愛貓人士的各種迷湯，只是老婆明明都知道我連乳液/香水/各種好的不好的味道都敏感，聲音也敏感，光去看貓試一下就渾身不自在，那我要怎麼辦呢？  
   : 好好跟老婆說了最後換來一句「為什麼是我說了算，為什麼是我在控制這件事」  
   : ===================== 以上請按Ctrl\+y刪除，以下請勿刪除 =======================  
   : 是否同意記者抄文：YES/NO  
   : -----

2. **发言者 2**（回复第 1 条）：建議離婚

3. **发言者 3**（回复第 1 条）：扣除最後一段,剩下贊同

4. **发言者 4**（回复第 1 条）：中肯

5. **发言者 5**（回复第 1 条）：有種離婚，不要只在心裡用嗆的

6. **发言者 6**（回复第 1 条）：\[链接隐去\]

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\`\`\`markdown  
   各位 V 站的老哥好，第一次在这个节点发帖，就不藏着掖着了，纯推广，但绝对真诚。  
     
   今天推一下自家的产品。不吹什么行业第一，主打一个真实原生 ISP 住宅网络和高性价比。  
     
   ✅ 真实原生ISP｜长效静态不限流不限速｜动态流量永久不过期｜新客$0.99起 👉  
     
   🎯 GitHub/Docker 加速｜Claude/ChatGPT防降智｜海外 VPS 纯净出口｜指纹浏览器多号隔离 👉  
     
   废话不多说，直接上几个 CDK 给老哥们测测水（先到先得，领了的楼下吱一声）：  
     
   WAXJ-GWPW-ZHAV  
   GP8P-G6N3-32EN  
   HPAS-EPKK-S3PL  
   9TBB-2N2K-B8KB  
   A25C-8CTZ-WSGU  
   SAUH-DQQ5-AQKK  
   HG5L-S3T4-RPH3  
   YVHE-2KRU-8QDV  
   2EFC-55T3-5L7G  
   \`\`\`  
     
   👉 \*\*注册直达通道（走链接防误伤）\*\*：\[链接隐去\]  
     
   📝 \*\*兑换方式\*\*： 注册登录 → 用户中心 → CDK兑换 → 输入码 → 流量到账。  
     
   没领到的可以关注频道蹲补货：\[某参与者\]。有网络配置问题的也欢迎楼下交流，看到就回！  
   \`\`\`

### 讨论 19

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

### 讨论 20

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

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Script help for Instanced UI's  
     
   Godot Version  
   4.7  
     
   Hi all.  
   Sorry a noob here :slightly\_smiling\_face:  
     
   I am starting to design a game which is quite UI heavy. After some research it seems the best way to approach this is to create separate scenes for each UI.  
     
   In starting I have just 3 UI scenes:  
     
   MainMenuUI  
     
   LocationUI  
     
   ShopUI  
     
   My main scene is named ‘GAME’ and I have added a child node to this called ‘UI’.  
     
   Then I have instatiated each of my UI scenes underneath.  
     
   So, my ‘GAME’ node2D tree looks like this:  
     
   GAME  
     
   -UI  
     
   -MainMenuUI  
     
   -ShopUI  
     
   -LocationUI  
     
   How do I go about scripting the visibilty of each of the instatiated nodes so only one shows up at once?  
     
   I am so sorry if my explanation is poor.  
     
   I just need to be able to swap each of the scenes.  
     
   Thanks in advance for ANY help\!

2. **发言者 1**（回复第 1 条）：Thank you. I will read up on this and try to implement it.

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Signal is Serious About Protecting Your Privacy

2. **发言者 2**（引用未收录发言）：Well, self-plug but somehow called for, if you use a server-side gateway like \[slidgnal\]\(\[链接隐去\] this is more or less like a IRC bouncer.

3. **发言者 1**（回复第 1 条）：I see this is getting flagged by a few as off-topic or spam. Presumably that's because of the title, which is egregiously self-congratulatory and pure marketing.  
     
   The reason I posted it is because it highlights the problem that these OS AI agents now can get at anything on your device and how hard to control this is and can compromise the stated benefits of privacy-focused apps.

4. **发言者 3**（引用未收录发言）：This is the main reason I still use Threema in my family. I do not like to loose my own chat history with my family members. Signal always feels like it is trying to protect my own chats from me. To be fair, I do understand the reasoning behind these choices, but for a daily use, I wan't to have more control over my own data and not be locked away from it.

5. **发言者 4**（引用未收录发言）：&gt; The ephemeral nature is part of the draw for me since I'm primarily using it for personal communications  
     
   Personal communications make things \*less\* ephemeral for me.  For example, when I get a message telling me the address for my cousin's wedding venue, I'll still want to read that message eight months later when I actually need to \*be\* at that venue.

6. **发言者 5**（引用未收录发言）：Hi, Signal developer here. Are you able to use local backups to export your data? They've been on Android for a long time, but they were just revamped to be faster, and they were just launched on iOS. We also have our own cloud backup offering that's encrypted with a randomly generated 64-char password.

7. **发言者 6**（回复第 4 条）：&gt; This is the main reason I still use Threema in my family  
     
   Are you self-hosting or does each individual purchase the app?  
     
   I'm not necessarily going to introduce \_another\_ app to family, friends, and groups as there's already Signal, WhatsApp, 某社区 \(yuck\), Matrix/Riot, and good \(bad\) SMS/MMS.

8. **发言者 7**（引用未收录发言）：I recommend doing a local export before migrating to a new device for any software like this. Signal support them, and there's also several high quality open source tools for backing up Signal messages.

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Filter by time of day, without date  
     
   I have 600 JPEGs from my wildlife camera and want to filter the images taken during the day \(e.g. between 07:00 and 18:00\), regardless of the date.  
     
   There is a “capture time” filter, but its fields require both a date and a time. Wildcards don’t seem to work \(e.g. “% 07:00”\).  
     
   Of course, I could filter the images externally using exiftool, but this seems like such an obvious use case that I suspect I must have overlooked something.  
     
   Is there a way to do this directly in darktable? I am using 5.7.0 2306.

2. **发言者 2**（回复第 1 条）：Like everything in life this could probably be done with lua scripting by building a script, that marks images with tags based on a capture time range. Those tags could then be used for filtering.

3. **发言者 1**（回复第 2 条）：Thanks 发言者 2. The AI of the day wrote me a lua script to select with a time-of-day range. I then label the selection e.g. “red” and  I’m back in the collection filter logic \(e.g. NOT “red” AND ISO &lt; 2000\).  
     
   However, it’s a hack and I would prefer an integration into the times collection filters \(issue filed\).  
     
   Happy to provide the script on request.

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：旧书摊发现的，问了下d老师说是什么联共布党史教材

2. **发言者 1**：内页有签名，有肥哥认识啥意思吗

3. **发言者 2**（回复第 2 条）：\[引用第 2 条\]  
     
   另外署名似乎是个姓万的人，可能是中国人\(=ﾟωﾟ\)=

4. **发言者 1**（回复第 3 条）：\[引用第 3 条\]  
     
   还真是在西安的书摊看到的！  
     
   可能是某个老党员的旧书流入二手市场了吧\|∀ﾟ

### 讨论 25

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

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: How likely are we to see a major quantum attack on modern crypto?  
     
   With it seeming increasingly possible that there is major new math coming our way, it seems like it's only a matter of time before a major institution sees a quantum attack \(on encrypted records, financial transactions, etc\)

2. **发言者 2**（回复第 1 条）：I think it's more likely continually improving LLM models find non quantum weaknesses that are exploited, versus having to leverage quantum capabilities to achieve the exploit.

3. **发言者 3**（回复第 1 条）：\[链接隐去\] &lt;-- if this is any indicator, after the RH rumours for the last few weeks/month, 'probably quite soon' there may be a quantum attack of some kind announced on Ring-LWE \(a core PQC primitive\).

4. **发言者 4**（回复第 1 条）：A quantum computer that can break SHA256 will be so enormous and expensive to operate that there will likely only be one place to point the finger at if/when that ever happens.

### 讨论 27

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Re: \[心情\] 跟自己的小孩嘔氣  
     
   \[引用未收录发言\]  
   : 是否同意記者抄文：NO  
   : 過兩天了，我現在還是覺得心情很差。  
   : 一個爸爸會因為小孩佔據床，讓自己打不到炮，而對小孩嘔氣冷暴力嗎？  
   : 我們家是爸爸在外縣市工作，  
   : 沒特別事情的話，每週末回來。  
   : 家裡這邊因為租屋處小，房間只有一雙一單，  
   : 平常就是我帶兩個小孩睡雙人房，  
   : 爸爸回來自己睡單人房，  
   : 但5歲老二很愛爸爸，  
   : 九月還是十月開始會去找爸爸一起睡。  
   : 這週假日回來，他就預告了這週要做，  
     
   看起來妳老公很期待  
     
   : 於是他跟小孩商量回到隔壁房間睡，  
   : 但小孩不要，我沒介入，就讓他跟小孩去協商，  
   : 畢竟想做的是他，我是能免就免，  
   : （都快半百的阿姨了，還想要我怎樣）  
     
   你的態度本身就有點問題  
     
   : 小孩睡他房間也是他開心同意的，  
   : 就不知道他怎麼講的，孩子都哭了，  
   : 但孩子還是不願意離開房間，  
   : 最後哭著睡著了。  
   : 而爸爸也負氣的去沙發睡。  
   : 隔天他就氣呼呼的問我那要怎麼辦，  
   : 我說還有一個晚上的機會啊。  
   : 當天他完全忽略小孩，也對我臭臉色，  
   : 我也覺得莫名其妙對我發火做什麼，  
   : 總之就是家裡一個低氣壓，  
   : 他自己關他房間做事，  
   : 我要張羅兩小，  
   : 只有外出用餐時跟我們走出去。  
   : 我自己也被他態度弄得很火，  
   : 早上也跟他說小孩就是很愛他所以才要找爸爸一起睡，  
   : 但沒想到親情輸給性慾，  
   : 小孩莫名其妙被仇視，  
   : 糟糕到我們走在路上，  
   : 小孩不小心絆倒受傷求抱，  
   : 他也沒關心小孩，也不想抱小孩。  
   : 我內心真的很火！  
   : 一次打炮沒打到就能棄小孩不顧？  
   : 對我來說，你這只是壓力大想找洞發洩吧，根本不是什麼恩愛情誼。  
     
   這句話很不優質  
     
   我幫妳老公回一下吧,如果你覺得這只是單純壓力大想找洞發洩,根本不是什麼恩愛情誼  
     
   那麼妳老公覺得壓力大找個外人發洩,並不是甚麼恩愛情誼,你能接受?  
     
   : 我不懂欸，  
   : 請問男士們，因為小孩的阻擾而愛愛失敗，  
   : 你們會這樣情緒失控嗎？  
     
   我換個角度打比方,看你能不能理解,男人對打炮的生理需求極高,我勉強比喻,對男人來說打一次炮的滿足感可比100次的spa  
     
   你就想你跟芳療師預約了100次 spa,最後都因為小孩撒番去不成,你會不會翻臉?

2. **发言者 2**（回复第 1 条）：這次事件可是有小孩介入，不單純是打不打炮的問題喔

3. **发言者 2**（回复第 1 条）：都已經做假日爸爸了回家的優先順序還是打炮，這是甘

4. **发言者 2**（回复第 1 条）：願做 ATM 嗎？

5. **发言者 3**（回复第 1 条）：都當 ATM 了還沒砲打, 這不是更冤?

6. **发言者 4**（回复第 1 条）：我跟芳療師預約了100次都因為小孩而去不成，我也不

7. **发言者 4**（回复第 1 条）：會翻臉喔

8. **发言者 4**（回复第 1 条）：而且我沒有不做喔。是有兩天可以選，有必要在第一天

9. **发言者 4**（回复第 1 条）：這樣翻臉嗎？之前都是在第二天，孩子願意配合回隔壁

10. **发言者 4**（回复第 1 条）：房間。這次第一晚回來，孩子想念爸爸，不想離開，這

11. **发言者 4**（回复第 1 条）：樣孩子就錯了嗎？

### 讨论 28

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

### 讨论 29

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：失业快半年了，移动端前端还有机会吗，boss 翻烂了，已读不回是个什么意思，求职 Android，flutter，web 前端开发，谁来帮帮忙！

2. **发言者 2**：谁还不是个孩子啊 :D

3. **发言者 3**：你这些现在统一都属于 ui 设计侧，基本上全栈开发都要会了，我们这单独的 ui 没有，外包有，但是很少找那个外包，最多新项目 ui 出图会找几次，后续布局和界面美化我们都是自己做了

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Horizontal curling in stockinette  
     
   See pattern Easy Vest Knitting Pattern by Liliplet found in Etsy.  \(I don’t know how to post a picture on my desktop\).  I wanted to use up some charcoal Red Heart yarn \(I know this isn’t the best quality but thought it would be a firm drape for a simple loose-fitting pullover\).  The pattern has a 1 row K1 P1 border followed by stockinette.  Mine is curling.  I contacted the author and she said blocking wet would work.  It does not.  I’ve always felt a few rows of rib are needed to anchor from curling.  Any advice?  I really like the easy way pattern looks and is written.  Two pieces, no finishing, simple cap sleeve style.

2. **发言者 1**（引用未收录发言）：Thanks for the reply. It’s just Red Heart Super Saver acrylic which is more like aran weight. I will try that on a narrow piece. I wouldn’t mind picking up stitches and knitting down either. Was sure looking to knitting a mindless project in the car, etc. I need to reorient myself with \[链接隐去\] Not very good with tech stuff and new forums.

3. **发言者 2**（回复第 2 条）：You’re doing just fine. Trying the steam block on a small swatch is a very good idea. Let us know how it goes.

4. **发言者 1**（回复第 3 条）：OK, thanks. Looking forward to knitting something simple rather than cardigans with my own trial and error alterations\!

5. **发言者 3**（引用未收录发言）：If your yarn is heavy, you could try it with a lighter weight in a similar colour.

6. **发言者 4**（回复第 1 条）：Thank you 发言者 3  
     
   I had similar problem, stockinette curls even after I inserted one purl row. Blocking help a bit.  
     
   Just wondering, will top loose stretching on bottom after altering showed in video?

7. **发言者 5**（回复第 6 条）：I don’t think it loses any stretch at all with this method.

8. **发言者 1**（回复第 3 条）：I can never find my original post so I’ll thank you here. \(You’ve helped me before\). I appreciate it. I need to take some time to learn the forum. I just saw discussion of curling stockinette from a few years back. Wish all previous ones would pop up so we are not duplicating questions and solutions.

9. **发言者 2**（回复第 8 条）：There are so many questions and variations on the forum dating back quite a ways. You can try searching which sometimes helps to find similar questions and maybe different solutions.  
     
   Happy to be able to help. You’re very welcome.

10. **发言者 1**（回复第 9 条）：Thanks.

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Looking to talk with 某社区 about project delivery workflows  
     
   Hi everyone\!  
     
   I’m interested in learning more about how 某社区 manage and deliver their projects to clients, collaborators, or render farms.  
     
   I’d love to hear about your real experiences, especially:  
     
   Have you ever had issues opening a Blender project on another computer?  
     
   Have missing textures or external files caused problems?  
     
   How do you prepare and check your projects before delivery?  
     
   Have you experienced performance issues with complex scenes?  
     
   I’m hoping to have a few short conversations \(around 10–15 minutes\) with freelancers and experienced 某社区.  
     
   This is research, not a product promotion. I’m genuinely interested in understanding your workflows and challenges.  
     
   Thanks\!

2. **发言者 2**（回复第 1 条）：发言者 1 Why do I have the sneaking suspicion that you are doing research for a vibecoded addon that will revolutionize our workflows?

3. **发言者 3**（回复第 2 条）：It’s very interesting to see just how and what can be revolutionized here though. :laughing:

4. **发言者 4**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   This is research, not a product promotion.  
     
   Have you need read the other threads, that asked similar questions, and all the answers that were given?  
     
   That’s a basic step in research: reading the information that already exists.

5. **发言者 5**（引用未收录发言）：lmao just reading this made my adhd have an adhd. RIP :sweat\_smile:

6. **发言者 6**（回复第 1 条）：There’s dozens of topics already existing about this, and no indication that this OP is a real person or has any interest in engaging with the community. Closing

### 讨论 32

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Jazz refreshed, part two  
     
   Let’s continue, a long time has passed since the first part.

2. **发言者 1**（回复第 1 条）：Prism, evolution, live.  
     
   \[图片省略\]IMG\_c5ea7c54-3462-4ff8-9c6d-58a4dfba7503300×300 20.4 KB

3. **发言者 2**（回复第 2 条）：thanks fr - tho a do find the choir on the first album more 70s retro than refreshing

4. **发言者 1**（回复第 3 条）：It’s an artist classified into the London jazz refreshed scene. The interesting aspect is that many artists within have very different music.  Some are more towards rap voices, other with a 70’s spirit, other more on the free kind of jazz.

5. **发言者 1**（回复第 1 条）：New artists, that I have for half of them not listened to yet:  
     
   corto.alto  
     
   Momoko Gill  
     
   Salin  
     
   Moses Yoofee Trio  
     
   VLADKO  
     
   Omasta  
     
   Yoni Mayraz  
     
   Nubya Garcia  
     
   Jazzbois  
     
   Don Glori  
     
   Happy Garden  
     
   jerk  
     
   Jemima Whyte  
     
   Blair / Huber

6. **发言者 3**（回复第 1 条）：发言者 1 what is this Jazz Refreshed about? I missed part one…

7. **发言者 1**（回复第 6 条）：Jazz refreshed is a London jazz artists organization, who tend to give a new spirit to jazz today.  
     
   You have a lot of musicians as Nubya Garcia, Makaya Mc Craven, Yussef Dayes, Ashley Henry, Kaidi Tatham, Sarah Tandy, Kokoroko…

8. **发言者 3**（回复第 1 条）：Great\! Thanks..

9. **发言者 2**（回复第 7 条）：thanks fr - love this - something old in a new guise

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How to loop through a specific set of keys in a dictionary godot  
     
   im using godot version 4.7.2 stable  
     
   im trying to make it so i can loop through a specific set of keys in a dictionary, but i cant find anything that works, i’ve tried a few methods but none of them worked

2. **发言者 2**（回复第 1 条）：What have you tried? Generally you have to filter out what you need with if statements, what does your data look like? What do you want filtered?

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Held together by spare time: Reviving \[链接隐去\] during PHP2Shell

2. **发言者 2**（回复第 1 条）：I'm not really informed about the technical details of the wiki, but why don't a static HTML backup is present?. When such vulnerability occurs, at least the userbase will have access to something.

3. **发言者 3**（引用未收录发言）：In my experience, distro packaging of web applications \(in particular PHP that runs in the context of a web server and not an app server of its own\) tends not to mesh very well with how the applications work, or how they're deployed \(i.e. multiple instances\). So your 80:20 solution would make more sense anyways.

4. **发言者 3**（回复第 1 条）：&gt; The rest were the kind of thing that just ate time, and they make for a pretty dull story. $wgMainCacheType = CACHE\_ACCEL needs php83-pecl-apcu, and opcache doesn't count.   
     
   Opcache just handles \(automatic\) code caching, APCu handles \(application opt-in\) data caching.

5. **发言者 4**（回复第 2 条）：Or just put the whole thing in an SSG

6. **发言者 1**（回复第 4 条）：I didn't know this\! Thank you for taking the time to point it out.

7. **发言者 1**（回复第 2 条）：A static backup is a good idea, we've had a few contributors kick around the idea of packaging our documentation as a set of mandocs as well. It just takes time to implement everything we want.

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Fahrplanwechsel 2027  
     
   Hallo, bald steht ja der Fahrplanwechsel 2027 an und einige wichtige Änderungen sind schon bekannt:  
     
   neuer RE Frankfurt-Koblenz über die rechtsrheinische Strecke  
     
   neuer RE Frankfurt-Siegen und Verlängerung des Mittelhessen-Express von Dillenburg nach Siegen \(möglich, weil der bisherige IC Frankfurt-Münster wegfällt\)  
     
   Die kreisfreie Stadt Kaufbeuren und der Landkreis Ostallgäu treten dem MVV bei  
     
   Daneben noch einige kleinere Änderungen im regionalen Busverkehr, die ich so ungefähr im Schirm hab, z. B. eine neue Buslinie Bad Homburg-Grävenwiesbach.

2. **发言者 2**（引用未收录发言）：\[图片省略\] 发言者 3:  
     
   Reaktivierung Kellersberg - Siersdorf mit neuen Halten.  
     
   Korrektur: Reaktivierung Alsdorf Kellersberg - Alsdorf Businesspark - Aldenhoven Siersdorf.  
     
   Die Strecke wird zunächst nur bis Businesspark befahren.  
     
   \(Ich habe außerdem mal die Städte ergänzt, sonst findet das ja keiner. :wink:\)

3. **发言者 3**（引用未收录发言）：\[图片省略\] 发言者 1:  
     
   Ok jetzt muss ich fragen: was ist die Story dahinter?  
     
   Kurz gesagt: Alstom \(die sind irgendwie überall Schuld …\) liefert die Züge für SH \(die nach Dänemark fahren können\) erst frühestens 2028 \(eher 2030\) und Dänemark baut ETCS \(die dänischen Züge dürfen dann nicht mehr nach DE\). Lösungen gäbe es zwar, juckt aber niemanden insb. bei DSB \(ausführlich \[1\] \)

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：虽然很不想承认但我似乎是个只要符合了几个特定条件就会被颜值吸引的肤浅的人\|-\` \)  
     
   最近正在研究自己的xp，感觉越研究越不对劲，多的不说只谈脸的话，只要满足条件中的任意几个我就会流口水\(;´Д\`\)  
     
   感觉自己的代码和哈基米差不多简单，女娲老师你搓人的时候能不能认真点\( ;\`д´; \)

2. **发言者 2**：人都是这样的，喜欢fps或者喜欢MOBA就会什么都玩点，其实抛开脸不说可以多试试其他方面

3. **发言者 1**：黑发，小眼睛，圆鼻子，大耳朵，圆/方脸，圆鼻子，短/寸发，背头，胡渣/络腮胡  
     
   以上满足任意4项就在我的好球区内，人类的审美怎么会肤浅成这样\(\(\(　ﾟдﾟ\)\)\)

4. **发言者 3**：\(´ﾟДﾟ\`\)

5. **发言者 1**（回复第 2 条）：\[引用第 2 条\]  
     
   主要是xp夺舍大脑很吓人啊\( ;´д\`\)  
     
   只是看了脸就会开始偏袒和溺爱喜欢的角色，这种已经是病的程度了吧，大小头的关系不该是这样的吧\(\(\(　ﾟдﾟ\)\)\)  
     
   我理想的欣赏应该对精神内核的认同与共鸣，外貌这种不应该有这么重要的啊\( ;\`д´; \)  
     
   而且我对黑发的偏爱已经到了接近种族歧视的程度了，我不要当这种肤浅的人･ﾟ\( ﾉд\`ﾟ\)

6. **发言者 1**：我喜欢的类型应该是呆呆的，笨笨的，不擅长新事物，虽然有基本自理能力，但还是会习惯性地依赖我，怕生，爱吃飞醋，没有安全感，但即使我出轨了也只会自责，对外排斥却喜欢对我撒娇，哪怕我伤害了他也会一遍遍热脸贴上来跪着求我，为了我随意施舍的爱意能舍弃自尊和一切，光是待着我身边看着我就能满足的狗才对……

7. **发言者 1**：骂我畜牲是什么意思，我想要的是狠狠疼爱这样的乖孩子啊，除了情趣玩法以外我绝对不会伤害他的\( ;\`д´; \)

8. **发言者 1**：感觉大半夜脑子有点不正常了……还是别熬夜了吧……

9. **发言者 4**（回复第 3 条）：\[引用第 3 条\]  
     
   gayﾟ∀ﾟ\)σ

10. **发言者 5**：gayﾟ∀ﾟ\)σ

11. **发言者 6**：Gay，还是喜熊gay

### 讨论 37

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: A narrated map tour of the events leading up to the Texas Revolution  
     
   I put together a narrated map of the Texas Revolution. You can listen to a 20-minute audio guided version or just scroll through the events:I thought the chronological and location based timeline made it easier to follow and learn as well. I was inspired by Mapbox’s “storytelling” template on GitHub and built my own version with MapLibre fork of Mapbox GL \(with free satellite imagery and terrain tiles from USGS\) and lots of help from Claude. There are lots of parameters that were built in, like the rotation and transition speed. Essentially themed it and added source links to the cards.The information was sourced from Handbook of Texas by THC. The voice is AI generated using Elevenlabs v4. That github project \[链接隐去\] has some cool use-case examples that have been published as web features by a few publications. There is so much more you can do with this, like hooking it to live data. The template is a great place to start\!Narrations by Elevenlabs TTS.Working on this new one around Houston Oil industry as well. \[链接隐去\]

### 讨论 38

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：GTA6 Releaseparty ab 15:30\!  
     
   Hallohallo, wir haben alles umgeschmissen und sind doch gleich um 15:30 schon live und zocken rein in GTA\!\!  
     
   Alles andere was heute geplant war ist aufgeschoben, nicht aufgehoben\!  
     
   Eddy und Nils sind die ganze Zeit für euch am Start und im Laufe des Tages gesellen sich allerlei Böhnchen dazu, unter anderem Valle, Bonnie, Tim, Sarah, Henry, Ben uvm\!\! &lt;3  
     
   Das wird toll, kommt rum\! Stream geht mindestens bis Mitternacht, danach schauen wir mal, juhuuuu lets fucking goooo\!\!

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Problem finishing off a hat with magic loop  
     
   I am finishing off a ribbed beanie with magic loop. I have reached the last two rounds.  I’m having a lot of trouble working the next to last round because it is so small\! And it has 6 K2togs. Any suggestions on how to work that very small next to last row?  I was thinking of trying to use a crochet hook. The final row is drawing the yarn through with a tapestry needle to close off the top so that will be easy.

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：The ArtStation Marketplace is moving to Gumroad  
     
   ArtStation Magazine – 18 Nov 26  
       
     
       
       \[图片省略\]  
     
   The ArtStation Marketplace is moving to Gumroad - ArtStation Magazine  
     
     We’ve heard your feedback on the Marketplace move to Gumroad. Here’s why we made this decision and what stays the same on ArtStation  
     
       
       Est. reading time: 4 minutes  
       
     
       
     
       
         
         
       
     
       
     
   :confused:

### 讨论 41

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Stacktrace when installing kernel 6.1.0-56-amd64, stuck and can't move on  
     
   What type of hardware are you using: Old laptop or computer  
     
   What YunoHost version are you running: 12  
     
   How are you able to access your server: The webadmin  
     
   SSH  
     
   Direct access via physical keyboard/screen  
     
   Describe your issue  
   Since yesterday, my yunohost did not respond while updating using the web interface. The culprit seems the update to the kernel 6.1.0-56, which seems partially installed. dpkg --reconfigure -a allows to move on to an apt upgrade but the upgrade always fail in a stacktrace \(i see calls from ext4 within\). and drops either unresponsive or to unresponsive bash.  
     
   Is it a known issue ? How do I fix that ?  
     
   Currently running memtest86 to ensure that it’s not an hardware fault, tried also to check the disk, seems OK.  
     
   Share relevant logs or error messages

2. **发言者 2**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   The culprit seems the update to the kernel 6.1.0-56, which  
     
   I have a similar problem with Yunohost on a VPS with that same kernel.  
     
   Anytime an intensive process runs, the kernel panics.  
     
   I worked around the issue by booting to the old kernel. The same actions now don’t cause a panic.

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Neue Luftbilder der Stadt Bern  
     
   Laut dem Berner Mediencenter und der Erwähnung von 发言者 2 gibt’s in Bern neue Luftbilder, die aktuell grad mal 6 Monate alt sind.  
     
   Sobald Add 2026 imagery for the City of Berne by 发言者 2 · Pull Request \#3116 · osmlab/editor-layer-index · GitHub akzeptiert wurde, sollten diese Luftbilder bei vielen OSM-Editor-Apps automatisch ankommen, mit \[链接隐去\] sollten diese Fotos auch in JOSM angezeigt werden.

2. **发言者 2**（回复第 1 条）：Man kann natürlich in allen gebräuchlichen Editoren die URL auch für einen “Custom” Hintergrundeintrag verwenden, wenn man nicht genügend Geduld hat :-\).

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：darktable windows insider program 11/22/26  
     
   Here’s the link to the latest weekly build of darktable 5.7, \[链接隐去\]  The list of latest changes is at Comparing 0c23f000db…679d594f5d darktable-org/darktable · GitHub  
     
   We are at feature freeze, so this is what darktable 5.8 is going to look like.  Please test and raise an issue if you find any bugs.

2. **发言者 2**（回复第 1 条）：I have reported on Github that SDL3 is still not loading in this version.

3. **发言者 2**（引用未收录发言）：Thanks for the reply. But will windows users who update to DT5.8 have to go through these steps?  
     
   This nightly build is crashing on me when I select the auto pickers in AgX. I reverted to last weeks 5.7.0 \+2086 and the problem goes away. But 5.7.0 \+2376 and 5.7.0 \+2285 lockup and crash using auto pickers in AgX. Can anyone else replicate this problem or is it just me?

4. **发言者 3**（回复第 3 条）：\[图片省略\] 发言者 2:  
     
   But will windows users who update to DT5.8 have to go through these steps?  
     
   I didn’t say that. It’s a temporary solution for those who want to try it while they fix the original problem.  
     
   \[图片省略\] 发言者 2:  
     
   This nightly build is crashing on me when I select the auto pickers in AgX  
     
   I logged into AGX and all the sliders and pickers are working fine. \(Windows 10\)

5. **发言者 1**（回复第 3 条）：\[图片省略\] 发言者 2:  
     
   But will windows users who update to DT5.8 have to go through these steps?  
     
   Hopefully not.  That’s why I post the weeklies, so that problems like this get discovered and fixed before release :smile:

6. **发言者 4**（回复第 3 条）：I’m on windows 11 and AgX auto pickers are working fine. I hope the SDL3 error will be fixed in the next release.

7. **发言者 2**（回复第 1 条）：Thanks everyone for your replies. I will load a new nightly again soon and check my AgX crash which seems to a local issue. Strange problem to come out of the blue. I will try a fresh config file incase the issue hides in there.

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Les Clairvoyants \#116 : Secret Wars, Marvel fait sa guerre des mondes  
     
   Article publié sur :			Les Clairvoyants \#116 : Secret Wars, Marvel fait sa guerre des mondes - 某社区.fr  
     
   Épisode 116 : où Fask, Fox et Arkeon spéculent une toute dernière fois sur Avengers: Doomsday, font le focus sur la suite avec Secret Wars, sans oublier un petit coup d'œil sur toutes les dernières news en provenance du Marvel Cinematic Universe...

2. **发言者 2**（回复第 1 条）：Je vous le dis les amis, le "To me my X-Men" du last trailer m’a foutu les poils. Beaucoup trop d’heures passées sur ces comics quand j’étais gamin. Ce qui est très drôle puisque gamin, la phrase existait pas. Déjà parce que je lisais des trads, et a priori la formulation date de… 2013. :smiley:  
     
       
       \[图片省略\]

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：肥哥们，我突然产生了一种前所未有的冲动，我想爱，想吃，想下定决心学习，想用心享受一部电影或一本好书，想动笔写下脑海中的一切故事，想劳动，想建设，想立刻飞到家里又想一瞬间睡着睡到自然醒  
     
   感觉自己已经几乎完美了，就只差动手去做了

2. **发言者 2**：加油

3. **发言者 3**：你都这个点还醒着，有啥想法都不奇怪，甚至可以说有点典\( ﾟ∀ﾟ\)，当然还是鼓励你真的去试一下的\(｀･ω･\)

4. **发言者 4**：落实不难，贵在坚持

5. **发言者 5**：听上去有点bipolar躁狂期的意思

6. **发言者 6**：你只是想撸管了，去撸吧，把你的所有梦想愿景动力一起发射出去改变世界

7. **发言者 7**：感觉大脑在矫枉过正

8. **发言者 8**：我想起一位俄国文学巨匠σ\`∀´\)

9. **发言者 9**：一股文青味

10. **发言者 10**：五点钟不睡觉，你想日本轰炸美国，金三角出货北京都正常

11. **发言者 11**：你只是把夜熬穿了

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Do you like voting?  
     
   I realized we can vote on the new version of the forum\!  
     
   Give it a go…  
     
   Yes, I do.  
     
   No, I don’t.  
     
   0  
   voters

2. **发言者 2**（回复第 1 条）：GASP  
     
   So we can bring POLLING from the Wanikani forums to the 某社区 forums now??? THIS IS EXCITING\! And we can now have people vote on Bunnies vs Possums now as well\!

3. **发言者 1**（回复第 2 条）：Yes, I do.  
     
   No, I don’t.  
     
   0  
   voters

4. **发言者 3**（回复第 1 条）：I was just being a stinker and I actually think it’s cool that we have 2 ways of doing this.

5. **发言者 1**（回复第 1 条）：In conclusion, POLLing is proportionally more popular than voting.

6. **发言者 4**（回复第 1 条）：Im confused  
     
   Didnt we have polling before?

7. **发言者 5**（回复第 6 条）：\(Bread thoughts not said out loud: “Thank goodness somebody else thinks this too. I thought I was hallucinating.”\)

8. **发言者 1**（回复第 1 条）：Maybe those bread thoughts I couldn’t hear were right\!  
     
   To be fair, I didn’t say that we didn’t have it before :joy:  
     
   But what’s definitely new is getting badges for users voting on a topic you made.  
     
   But since I haven’t got any of those badges, I’m wondering if I did it wrong :sweat\_smile:

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Amni-CAD – parametric CAD with stress and flow simulation in a browser

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Description or inscription in name=\* tag  
     
   Hi,  
     
   could you please clarify if there are any local conventions in Poland regarding the name=\* tag, or if the general OSM standard applies: that name=\* should not be used for descriptive names?  
     
   The reason I am asking is that user Carpathians, who maps primarily in Poland, has started tagging description=\* or inscription=\* as name=\* in Slovakia. For example, in southern Poland, he tagged 36 historic=wayside\_shrine with name=NMP and is now adding this tag to features in Slovakia as well. Similarly, he uses name=INRI on historic=wayside\_cross, even when there is no inscription on the object.  
     
   I have tried to contact him, as have several users from Poland and Slovakia, but he hasn’t replied at all and continues to make similar edits.

2. **发言者 2**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   or if the general OSM standard applies: that name=\* should not be used for descriptive names?  
     
   yes, we even have some authorized bot edits purging common cases of that

<!-- samples:end -->

