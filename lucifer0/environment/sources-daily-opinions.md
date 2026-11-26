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

<!-- intake-request:intake-fa9d0e6051d44dcbaa8a1b00c4388dba -->
<!-- samples:start -->

采集时间：2026-11-26 12:05:04（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Quilty Paper Bookmark  
     
   For the last several years we give my MIL an annual subscription to Quiltfolk magazine. Every year I print out the email I receive saying they’ve renewed and cut out the cute quilty header and put it in an envelope or otherwise wrap it.  
     
   \[图片省略\]QuiltFolkBookmark02576×284 42.6 KB  
     
   This year I am in possession of some borrowed dies and embossing folders including these quilt-related ones\! So I made a bookmark instead.  
     
   \[图片省略\]QuiltFolkBookmark01336×576 41.3 KB  
     
   We’ve ordered and special issue that is on the way, so I’ll put the bookmark in it then wrap that.

2. **发言者 2**（回复第 1 条）：That’s an awesome idea for a gift subscription\! And an adorable bookmark.

3. **发言者 3**（回复第 1 条）：I love the idea of coordinating your card to the giftcard and this bookmark is too cute\!

### 讨论 2

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Cloud IDE v0.1.6 "Stratus" – open-source desktop IDE with built-in AI assistance for Arduino, ESP32 and Deneyap  
     
   \(topic deleted by author\)

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Update on a security incident involving 1Password’s backend systems

2. **发言者 2**（引用未收录发言）：LastPass claimed that vault contents were safe by design while getting totally pwned, so I’m not sure how confident I am.

### 讨论 4

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[Calendrier de l’Avent\] ChocoCervo 2026  
     
   Le calendrier de l’Avent d’énigmes ChocoCervo \(anciennement lockee . fr / avent\) est de retour pour 2026, l’ouverture du site a eu lieu ce matin.  
     
   Il faut évidemment attendre le 1er décembre pour les énigmes, mais la chasse aux badges est déjà commencée \(ça fait turbiner les neurones aussi\).  
     
   Et un des badges s'obtient en "parrainant" quelqu'un, donc je mets mon lien  :wink:  
     
       
         \[图片省略\]  
     
         chococervo.fr  
       
     
       
       \[图片省略\]  
     
   ChocoCervo : Calendrier de l'Avent d'énigmes  
     
     Bienvenue sur le premier calendrier de l'Avent d'énigmes en ligne. Entièrement gratuit, communautaire et solidaire, et toujours porté par Lockee et The Escapers.

2. **发言者 2**（回复第 1 条）：Tu es sûr que le lien de parrainage fait quelque chose ?

3. **发言者 1**（回复第 2 条）：Si personne ne l'a encore utilisé, il fait que j'obtiens un badge \(dans la "course" aux badges\), sinon c'est en effet transparent.  :wink:

4. **发言者 1**（引用未收录发言）：Pour les badges, F12 ne fait pas tout, il faut explorer, lire \(parfois entre les lignes\), aller aileurs sur la toile... bref, s'amuser.  
     
   Et il y a un 某社区 où on peut trouver de l'aide aussi.

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Fujifilm XT-3 settings advice  
     
   I had mine set so that rear dial controlled shutter speed, front dial ISO with aperture on the lens.  Those were the only controls I ever used.  Spent some time away from it \(With an X-100\) and allowed the XT-3 battery to flatten losing all my settings.  Now all charged back up / new battery.  Top right dial is set to T and top left dial to A.  The rear dial / thumb wheel still controls the shutter speed.  Now for the life of me I cannot figure out how to get it back the way it was. What I would like to do is disable all auto-ISO leaving just full manual control of ISO on the front dial.  Somehow it seems not possible to disable auto ISO although clearly I had it that way in the past.  I cannto differentiate if my settings are wrong or if there is a hardware problems with this dial / button.  Any suggestions much appreciated.

2. **发言者 2**（回复第 1 条）：do you have a separate ISO dial? the x-t30 has one, on the left, if it is switched to A it’ll be auto  
     
   edit, getting confused, x-t5 has one, x-t30 doesn’t, i thought x-t3 did

3. **发言者 3**（回复第 2 条）：Yes the X-T3 has an ISO dial on the top. I guess the OP is trying to use other controls instead, though I don’t see why. I guess you maybe have to set both of the dedicated dials to ‘A’ to use another in their place?

4. **发言者 2**（回复第 3 条）：not sure, there are also some menu settings to set up the different function controls etc

5. **发言者 3**（回复第 4 条）：This website \(\[链接隐去\] talks about setting ‘“ISO Dial Setting \(A\)” to “Command” \(Set Up → Button/Dial Setting\)’ so maybe it’s one of those menu items. I don’t have my camera with me atm so I can’t check \(I have an X-T2 and and X-T4, which I’m guessing are virtually identical\)

6. **发言者 4**（回复第 1 条）：You need to go to: Setup menu, \[ISO DIAL SETTING \(A\)\], and set it to  \[COMMAND\]

7. **发言者 5**（回复第 1 条）：I use auto ISO, front dial for exposure comp, manual SS and aperture.

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：肥每天玩游戏看漫画然后找同人二创反复咀嚼已习以为常  
     
   会不会这种沉迷于文学创作里的人物以及人物关系性的其实是少数人\( ・\_ゝ・\)更多的人其实并不会整天看这些虚构的故事而是去和现实生活里的人交流沟通更不会关心二次创作

2. **发言者 2**：对啊

3. **发言者 3**：对啊

4. **发言者 4**：大多数人现在书也不看电影也不看每天看个ai短剧都知足了，大多数人还每天在痘印慢脚和别人汴京嘴淬了毒一样攻击素不相识的陌生人，难道大多数人就是正确的吗\(\`ヮ´ \)

5. **发言者 5**：评价是自己爽就完了\(\`ヮ´ \)你都爽了还管别人怎么想

6. **发言者 6**：欢迎来到现实世界

### 讨论 7

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

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: PortalGate – Zero-leakage client portals for \[链接隐去\]

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Hello \[链接隐去\] IT IS I, THE ROBOT COOK\!  
     
   He’s here to take your job, and eliminate you, while serving you a meal. OF YOURSELF\!  
     
   \(I’m not sure how this whole website works, but I hope I’m not breaking some social codes here\)  
     
   \[图片省略\]whuh1920×1920 4.77 MB

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How to properly set up for non-pixelart game a.k.a. eliminate blurry or jagged art and textures  
     
   Godot Version  
   4.8  
     
   Question  
   Hiyya\!  
     
   For non-pixelart 2d games, such as hand drawn textures or lineart based games… what is the route to take? Is there somewhere a tutorial to follow?  
     
   The textures seem to somehow blur out at times.  
     
   Switching around the options in Projects Settings seem to improve things, yet the blurriness appears and there’s strange interlacing or more like “weird resizing effect” happening when the character stops.  
     
   How does one go about it?  
     
   How do we make smooth and crisp art move around?  
     
   Please share what you know. &lt;3

2. **发言者 2**（回复第 1 条）：Draw your art accurate to the desired size in game, or draw oversize and enable mipmaps, this will consume more VRAM. If you are making a game that can support an unrestricted camera then as the screen size increases the player’s field of view can without stretching textures.

3. **发言者 1**（引用未收录发言）：Thank you\!  
     
   I’ll mess around\! :slight\_smile:

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Problem Downloading or Updating App on iPad or iPhone  
     
   I have attempted to do the most recent Focal and Naim app update and it will look like it’s starting to update but then immediately stops and goes back to the update button.  I have uninstalled the app on my iPhone and I am unable to do a clean install, the app icon worlds for a moment and then goes back to its original state without downloading.  
     
   I’m in Canada and this started with the update we received yesterday.  Is anyone else having problems updating or even reinstalling?

2. **发言者 1**（回复第 1 条）：Sorry just saw the post below that others are experiencing the same problem, this thread can be closed/merged with the post.

3. **发言者 2**（回复第 1 条）：Ditto here in Chicago.

4. **发言者 3**（回复第 1 条）：Failing to update to naim App from 8.3  to  8.3.1 on iOS 27.2.1  
     
   Same symptoms as reported above, here in Perth Australia. \(all other iphone app updates successful\).

5. **发言者 4**（回复第 1 条）：Same here

6. **发言者 5**（回复第 5 条）：Same here in The Netherlands. iOS problem??

7. **发言者 6**（回复第 1 条）：Same here, Madeira, Portugal

8. **发言者 7**（回复第 1 条）：Same … but it has spread to other apps too. None of them will update.

9. **发言者 8**（回复第 1 条）：Same here in the UK.

10. **发言者 9**（回复第 7 条）：Same Normandie France

11. **发言者 10**（回复第 1 条）：Same for me, I still can use my Mac but in reality I use it 99% of the time on my iPhone  
     
   very uncomfortable  
     
   regards Henri

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：General measurements discussion for GraphWorks visualizer  
     
   Share and discuss your impressions of different measurements in the new GraphWorks visualizer tool, whether you’ve actually listened to the headphones or not \(which is normally taboo on most audiophile forums\).  
     
   I have not listened to most of the headphones in this tool btw. So most of my impressions will be based on the 5128 graphs, and sometimes some virtual listening. So they should be taken with a grain of salt.

### 讨论 13

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

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Nerd Commander IV  
     
   \(Thema vom Verfasser gelöscht\)

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：目前手里用的是一台 MacBook Air M2，24GB 内存、1TB 硬盘，平时主要就是办公、浏览网页、看看视频之类的。  
     
   一直以来对这台电脑都挺满意的，尤其是便携性。经常需要移动办公，有时候晚上躺在床上抱着电脑看看电视，也不会觉得重。14 寸左右的尺寸对我来说真的刚刚好，轻巧、方便，随时拿起来就能用。  
     
   不过之前买电脑的时候，主要考虑的就是日常办公和娱乐，并没有考虑过其他用途。  
     
   现在 AI 时代，自己也开始对本地 AI 模型产生兴趣，想折腾一些简单的本地模型，学习、测试一下，另外也会涉及一些代码编译、开发之类的工作。结果发现目前这台 Air 在这些场景下还是有点吃力，性能和散热都有些捉襟见肘。  
     
   所以最近有了换电脑的想法。  
     
   目前比较纠结的是尺寸问题。  
     
   个人还是非常喜欢 14 寸的尺寸，毕竟经常移动办公，也有躺床上使用的习惯，太大太重的话，便携性和使用体验都会打折扣。  
     
   但是网上看了不少评测，感觉 15 寸、16 寸的机器在散热、性能释放方面似乎会比 14 寸更有优势。不知道实际使用中差距到底有多大？尤其是长时间跑模型、编译代码这些场景，14 寸和 16 寸的体验会不会有明显区别？  
     
   目前个人比较关注 M3 Max 14 寸 MacBook Pro，感觉配置和尺寸似乎都比较符合自己的需求，但又担心 14 寸的散热和持续性能释放不如 16 寸。  
     
   想问问论坛里有没有实际使用过 14 寸和 16 寸 MacBook Pro 的朋友，特别是用来跑本地 AI 模型、开发、编译的朋友：  
     
   1. 14 寸和 16 寸在散热、持续性能释放方面，实际差距到底有多大？  
   2. 如果主要是跑一些中小型本地 AI 模型、日常开发和代码编译，14 寸 M3 Max 是否足够？  
   3. 16 寸除了屏幕大一些，性能和散热方面的优势是否真的值得牺牲便携性？  
   4. 如果经常移动办公，甚至偶尔躺床上抱着使用，16 寸会不会明显笨重？  
     
   目前个人还是更倾向于 14 寸，毕竟便携性对我来说真的很重要，但又不想买回来之后，因为散热或者性能释放的问题而后悔。  
     
   希望有实际使用经验的朋友分享一下，尤其是长期使用过这两个尺寸、跑过 AI 模型的朋友，想听听真实体验，而不只是参数和跑分。  
     
   先谢谢大家！

2. **发言者 2**：能坚持就坚持一年，等 M7Pro

3. **发言者 1**：发言者 2 想玩 ai 模型、M7Pro 得等到啥时候呀

4. **发言者 2**：发言者 1 本地 AI 的话得上 M7Max 了吧，Pro 的带宽还是不行。但 Max 的加价就为了玩一玩本地模型，不值得。  
   如果不差钱倒无所谓。

5. **发言者 2**：发言者 1 M6 没有 pro 和 max，明年春天 M7 应该就出来了，最迟明年年底估计 M7 的 pro 和 max 就上市了。  
   M7 专门针对本地模型/本地智能做了优化，你查查资料。

6. **发言者 3**：发言者 1 玩模型，不如花点钱去租个机器，不用了可以退。本地跑投的钱，足够玩很久还便宜。

7. **发言者 4**：M7Pro 应该明年 10 月份，买 14 寸的话，不要选 max 芯片，散热压不住，max 芯片配 16 寸的才行

8. **发言者 5**：16 寸习惯了其实还好，单手拿确实非常沉，但是出差在酒店、咖啡厅这种地方大屏的体验明显要好

9. **发言者 6**：苹果那个大模型就玩具，m3 台式机生成个图都要好久 别说笔记本了 比照 NV 差远了

10. **发言者 7**：14 寸就行了

11. **发言者 8**：你要不换个思路？  
   买 Mac Studio，重的任务放在上面跑，平时仍然用 Air 移动办公，Studio 可以远程上去看。

### 讨论 16

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

### 讨论 17

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

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Optimizing Rustc's next trait solver

2. **发言者 2**（回复第 1 条）：You should optimize this website so that it displays text before the 某社区 video is fully loaded.

3. **发言者 3**（回复第 2 条）：Fwiw it did exactly that on my phone repeatedly.

4. **发言者 1**（回复第 3 条）：I cannot replicate this, tried for awhile now. The entire page is only a few kilobytes, and there's some fonts, not much more. I self-host it in the Netherlands, possibly you're living closer to a 某社区 server than my house.

5. **发言者 4**（回复第 4 条）：I seen probably what 发言者 2 seen, from Seattle on Windows with both Firefox and Chrome.  
     
   \[链接隐去\]  
     
   Not a problem worth really posting about though...

6. **发言者 1**（回复第 5 条）：Seattle does sound a hell of a lot closer to a 某社区 server than my computer in Europe haha

7. **发言者 5**（回复第 6 条）：You could avoid the flash of white followed by text by instead having the text use a system font as fallback and then allow it to reflow once the CSS fonts loaded. It is not great, but it fails back more gracefully if the fonts never load.

8. **发言者 3**（回复第 4 条）：Sorry, to be clear, I meant that on my phone the text loads first. I live in California \(SF bay area\)

### 讨论 19

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

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Proposal: Cubicles \(showers, etc.\)  
     
   RFC started for proposal about presence or type of cubicles in shower rooms. Link:  
     
       
     
         \[链接隐去\]  
       
     
       
         
     
   Proposal:Cubicles - OpenStreetMap Wiki  
     
       
     
       
         
         
       
     
       
     
   Feedback is welcome.

2. **发言者 2**（回复第 1 条）：When does an enclosure=walls\_and\_doors, become an enclosure=rooms?  
     
   &amp; what are “snail\_walls”?

3. **发言者 3**（回复第 2 条）：Maybe that? 某社区

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：吃点

2. **发言者 1**：本来想吃KFC的，结果离学校最近的KFC今天没开门\( ´\_ゝ\`\)，星期四吃塔斯汀好了

### 讨论 22

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

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Where are all the amazing AI-generated software?  
     
   I feel like the most amazing thing about AI so far is AI itself.Is anyone using a brand-new tool that was not available 5 years ago?I see people decompiling/reverse engineering the Adobe suite, which is an amazing feat, but the resulting software itself is barely usable.Since it’s so easy to build anything now, I get a sense we’re seeing a proliferation of one-off, proof-of-concept projects, where great software takes time and effort and often multiple people, AI notwithstanding.

2. **发言者 2**（回复第 1 条）：I think there is tons of new software and it is visible, but adoption just doesn't come, because not much is good enough to displace current alternative. Everything has a switching cost and what AI produces is mostly not worth the price.   
   Also, software people are probably secretly finding tons of cool stuff, but they are a minority in our population.

3. **发言者 3**（回复第 2 条）：It could also be that adoption doesn't come because what AI produces is actually good enough to stop buying software. People are vibe coding their own custom apps \(at least they're eating their own dog food, right?\) and calling it good enough.

4. **发言者 4**（回复第 1 条）：I got Linux on my phone and it works perfectly\! Claude Code did it in 5 hours. Now I'm building my own phone OS

5. **发言者 2**（回复第 4 条）：Yeah, I guess building your own is better than just using someone else's. Why linux though? Isn't customized android better?

6. **发言者 2**（回复第 3 条）：yeah, as OP said, AI is the software now. Pretty hard to replace that.

7. **发言者 5**（回复第 1 条）：Great software is not made by generating lots of code with maximum speed.  All those prompt jockeys have bought the wrong idea of productivity.

8. **发言者 4**（回复第 5 条）：No, Android sucks. A bare Linux is much better

9. **发言者 6**（回复第 1 条）：I rebuilt a $10/month tool for myself and use it every day. It works for me because it's a LinkedIn posting tool - it works worse from third-party servers because LinkedIn bans those accounts, but when it runs as a free Claude plugin on my laptop, it can use my browser for automations that are much harder to detect and ban.

10. **发言者 7**（回复第 4 条）：I find this the perfect example. Perhaps not a proof-of-concept, but a one-off. Will most software be custom build for a single user now?

11. **发言者 8**（回复第 1 条）：What would amazing AI-generated software look like?

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Brutalism snow scene  
     
   brutalism inspired scene with snow  
     
   used asset from polyhaven, ambientcg, pbrpx  
     
   there is still a lot that I think would improve but thought it was taking too long, rendering took a lot of time too probably due to the snow  
     
   also I am not from a region that get snow so the snow might not be that acurate  
     
   \[图片省略\]final-snow-11920×1080 1.77 MB  
     
   \[图片省略\]final-snow-21920×1080 2.06 MB  
     
   \[图片省略\]final-snow-71920×1080 2.06 MB  
     
   \[图片省略\]final-snow-61920×1080 1.9 MB  
     
   \[图片省略\]final-snow-51920×1080 2.02 MB  
     
   \[图片省略\]final-snow-41920×1080 1.98 MB  
     
   \[图片省略\]final-snow-31920×1080 1.48 MB  
     
   \[图片省略\]final-snow-21920×1080 2.06 MB  
     
   \[图片省略\]final-snow-81920×1080 1.89 MB  
     
   \[图片省略\]final-snow-91920×1080 1.76 MB  
     
   \[图片省略\]final-nigth-11920×1080 1.87 MB  
     
   \[图片省略\]final-nigth-21920×1080 1.49 MB  
     
   \[图片省略\]final-nigth-31920×1080 2.1 MB  
     
   \[图片省略\]final-dawn-11920×1080 1.88 MB  
     
   \[图片省略\]final-dawn-31920×1080 1.82 MB  
     
   \[图片省略\]final-dawn-21920×1080 1.93 MB  
     
   \[图片省略\]final-sun-11920×1080 2.03 MB  
     
   \[图片省略\]final-sun-31920×1080 1.81 MB  
     
   \[图片省略\]final-sun-21920×1080 2.09 MB  
     
   \[图片省略\]final-clay-11920×1080 1.42 MB  
     
   \[图片省略\]final-clay-21920×1080 1.12 MB

### 讨论 25

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Marten Speakers  
     
   Hi Richard, I would appreciate if you can open the locked thread “Marten Speakers” and merge this post below into the thread. Thanks.  
     
   Continuing the discussion from Marten Speakers:  
     
   发言者 2 may I ask if you still have the Gryphon Diablo 300? Does the amp come with the internal Gryphon DAC?  
     
   I am having a bit of a conundrum at the moment after the Naim amps have been optimised to a high level. After several lengthy comparisons I now find the Diablo 300 to sound less open than the Naim 282/250DR/HicapDR with a darker sound in the midrange. I currently suspect the mains power cables used with the Gryphon are the culprit as all the power cables I own are warm sounding. The Shunyata Alpha-X NR didn’t quite fit as it made the sound more polite and relaxed, presumably with its noise filtering.  
     
   Long story short, may I ask what power cable did you use with the Gryphon Diablo 300 when you had it? Have you compared any other power cables on the Gryphon?

2. **发言者 2**（引用未收录发言）：Also the DAC plays important role. In my case I use the DAC of my cd player, the Esoteric K-05XD, for streaming too. And the result is great. Before choosing that route, I had done various A-B comparisons including Gryphon’s own optional unit.

### 讨论 26

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

### 讨论 27

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

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：最近用 AI 生成 Tampermonkey userscript 感觉流程不太方便  
     
   搜到了一个叫 \[Tweeks\]\(\[链接隐去\] 的 AI-native 替代品  
     
   可以直接在插件界面输入需求生成脚本（在这个产品里好像就叫 tweeks）  
     
   于是果断把 Tampermonkey 换掉了

2. **发言者 2**：试了下挺不错的, 但是这里用到了 ai, 后面估计会收费

3. **发言者 1**：发言者 2 每天的免费额度会重置，不过可能用的不是什么高级模型。付费的话好像是可以用自己的模型，我暂时没感觉需要付费

4. **发言者 3**：目前在用 script cat 代替 Tampermonkey，体验也挺不错的

### 讨论 29

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：If only every morning could start like this  
     
   \[图片省略\]Screenshot 2026-11-25 111347 - Copy730×426 12.1 KB  
     
   I’ve found out that doing very small chunks of study, if I had lots of reviews piles up, greatly eases the pressure and increases the likelyhood of learning.

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Modulino and Lorem Ipsum  
     
   \(1\) Is Modulino and its libraries unsupported, or has it lost popularity to the point of its device categories being placed in "Recycle Bin" category \(due for removal\)?  I see Modulino as the perfect "no fuss" lesrning tool. Bummer to see it gone.  
     
   \(2\) This Recycle Bin category seems to have its place-holder data still intact, rather than its purpose described.  
     
       
         
           
            Projects Discussion and Showcase

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Generalized Riemann Hypothesis proof in Lean 4, in 76k lines \(down from 17M\)  
     
   This is a shortened version of Alpöge's Lean proof of RH and GRH for Dirichlet L-functions \(\[链接隐去\] which was about 17 million lines.  
     
   There are two editions proving the same five theorems: a readable one at about 300,000 lines \(start at grh/GUIDE.md\) and a compact one at about 76,000.  
     
   Github repo: \[链接隐去\]

2. **发言者 2**（回复第 1 条）：The prize should go to whoever can get it to fit \[legibly\] on a t-shirt.

### 讨论 32

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[链接隐去\] à sauvegarder  
     
   Bonjour,  
     
   j'ai une adresse e mail sur \[链接隐去\] avec un bridge  
     
   comment faire pour sauvegarder sur un PC les paramétres du compte et tous les e mails ?  
     
   Cordialement

2. **发言者 1**（回复第 1 条）：bonjour,  
     
   j'avais trouvé le système importexportstooolNG  
     
   est-ce qu'il existe un autre moyen pour une sauvegarde ?

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Gestion des redirections MyWebApp NGINX  
     
   Bonjour, j’espère que vous allez bien ?  
     
   J’utilise YunoHost sur un ancien laptop.  
     
   J’ai voulu rapatrier un site/blog perso que j’avais commencé sur un hébergeur classique.  
     
   J’ai donc installé my\_webapp et fait un lien symbolique vers mes fichiers HTML / CSS sur mon disque dur externe.  
     
   Avant, mon site était géré avec Apache, donc fichier .htaccess pour les redirections, etc.  
     
   Maintenant si je veux adapter les règles, faut que j’édite la config Nginx ?  
     
   Mais lorsque je vais dans /etc/nginx.conf.d/ j’ai plusieurs fichiers pour le nom de domaine concerné :  
     
   domaine.tld.conf  
     
   domaine.tld.d  
     
   Lequel des deux j’ai le droit de modifier pour cela ?  
     
   Si je fais une mise à jour de YunoHost ou de l’application, ça risque de sauter ?  
     
   J’imagine que ce serait mieux d’avoir un txt quelque part avec les règles comme ça je restaure facilement ?  
     
   Merci pour votre aide, j’apprends pas à pas sur Nginx et j’ai l’impression d’avoir ouvert un livre encore plus gros que le html et css :smiley:  
     
   Merci à vous

### 讨论 34

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

### 讨论 35

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

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Indie founders making &gt; 1k MRR, has your revenue been affected by AI?

### 讨论 37

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Chilling day  
     
   \[图片省略\]Chilling\_day\_InU\_uni3456×1944 3.31 MB

2. **发言者 2**（回复第 1 条）：Is this all 3D, or is there some painting here?

3. **发言者 1**（回复第 2 条）：nop, all is 3D

4. **发言者 3**（回复第 3 条）：Super chill day to be a chilling day :smiling\_face\_with\_sunglasses: Love the scene, nice work\!

### 讨论 38

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

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Buzz left channel  
     
   Hi everyone,  
     
   I’ve had an intermittent buzzing left channel which trying to diagnose is driving me nuts so any help is very much appreciated.  
     
   Sometimes \(but not every time\) when I switch on I get a ground type buzz through my left speaker only. It doesn’t increase in loudness when I increase volume, and I can still hear music beyond the buzz. When I press mute the amplifier is silent. I have changed din to xlr cable left channel - seemed to work fine at first but then the buzz today returned upon switch on \( I have recently been on holiday\). The buzz is across all inputs in the NAC252. When this last happened I wiggled the left din-xlr cable slightly and the buzz disappeared, but today has returned \(checked cable dressing - cable in exactly same spot. Any help very much appreciated  
     
   System is NAC252/SUPERCAP DR/NAP300DR with Ndx2 555psu  
     
   Thanks all

2. **发言者 2**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   When this last happened I wiggled the left din-xlr cable slightly and the buzz disappeared  
     
   Sounds like a bad cable. Maybe you can have your dealer inspect it, while they loan you a replacement to see if it resolves anything.

3. **发言者 1**（回复第 2 条）：Sorry I should have mentioned, I changed the din-xlr cable a few months back, but today the buzz returned again at switch on  
     
   KR

4. **发言者 3**（回复第 1 条）：The problem is in the 252, somewhere between the volume control and the output mute relay.

### 讨论 40

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

### 讨论 41

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：大家好，我是作者本人。  
     
   起因很简单：经常在某社区、B 站、某社区刷到想留存的图片和视频，但保存流程很折腾，第三方网页下载器不放心，存下来的文件又散落在下载文件夹里，再也找不回来。  
     
   所以我做了 Linkget，一个 macOS 命令行小工具：粘贴帖子链接，图片和视频直接进 macOS 照片图库（也可以选择存到文件夹），和平时拍的照片放在一起。  
     
   安装（Homebrew）：  
     
   \`\`\`  
   brew install Popcornnnnnnnn/tap/linkget  
   linkget    \# 一条命令搞定  
   \`\`\`  
     
   几个特点：  
     
   - 纯本地运行，没有服务器、没有账号体系。需要登录的站点复用你浏览器里已有的登录状态，下载在你自己机器上完成（底层基于 gallery-dl 和 yt-dlp）  
   - 支持某社区、某社区、某社区、某社区、某社区、某社区 等，\`linkget sites\` 可以看完整列表  
   - 下载会核对完整性：图集数量和源站对不上、实况图（Live Photo）和静图配不上对的，不会静默导入，会留下来提示你处理  
   - 断了能续：每次下载有本地记录，中断后用 \`linkget retry\` / \`linkget recover\` 接着下，不用从头来  
   - 附带一个 \`read\` 功能，可以把帖子的字幕和文字抓下来，之后慢慢看、总结或翻译  
     
   MIT 开源，我自己每天在用，这次是第一次正式发出来。欢迎试用和提 issue，批评也欢迎，尤其是下载可靠性和完整性校验这块，我做得可能过于严格了，正好听听大家的意见。  
     
   演示：  
   \[图片省略\]  
     
   仓库：\[链接隐去\]

### 讨论 42

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

2. **发言者 2**（回复第 1 条）：Ooooooh\! This is lovely\! I especially like the glowy moon moth. Very nice\! :last\_quarter\_moon\_face:

3. **发言者 3**（回复第 1 条）：Delightful\! You’ve achieved a great balance of rustic and fine finish with the materials and your lovely paintings.

4. **发言者 4**（回复第 1 条）：This is lovely. I love the moth\!

5. **发言者 1**（回复第 1 条）：Thank you, 发言者 4, 发言者 3, 发言者 2\!

6. **发言者 5**（回复第 1 条）：Ooh\! I’m a sucker for glow in the dark stuff, but the awesome art work makes these next- level awesome\!

7. **发言者 1**（回复第 6 条）：Thank you\! Finsing a good glow in the dark paint is half the battle\!

8. **发言者 3**（回复第 1 条）：:turkey: :deciduous\_tree: :fox: :evergreen\_tree: :chipmunk: :deciduous\_tree: :deer: :evergreen\_tree: :rabbit\_face: Your great project is one of this week’s Featured ProjectsCongratulations and thank you for sharing with the 某社区 Community\!\!\! :turkey: :deciduous\_tree: :fox: :evergreen\_tree: :chipmunk: :deciduous\_tree: :deer: :evergreen\_tree: :rabbit\_face:

9. **发言者 1**（回复第 8 条）：Thank you\!

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Wi-Fi drops out constantly  
     
   Continuing the discussion from USB-A ports and Wi-Fi often don't work after boot:  
     
   My wifi drops out constantly, this is kind of frustrating.  Do I have a defective board?

2. **发言者 2**（回复第 1 条）：Assuming there is no difference between the Wi-Fi networks of the UNO Q and VENTUNO Q, I would like to share a working, tested non-containerized UNO Q script that allows you to control LED1\_R and LED1\_B from an Android mobile phone dashboard.  
     
   Do you think that script would be helpful for you to diagnose the state of your Wi-Fi network?

3. **发言者 1**（回复第 1 条）：The Ventuno Q is the one dropping on the connection not my wifi infra.

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Showing a MessageBox from kernel-mode

### 讨论 45

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

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Magic 8 ball or Crystal ball  
     
   \#include &lt;LiquidCrystal.h&gt;  
     
   LiquidCrystal lcd \(12,11,5,4,3,2\);  
     
   const int switchPin = 6;  
     
   int switchState = 0;  
     
   int prevSwitchState = 0;  
     
   int reply;  
     
   void setup\(\)\{  
     
   lcd.begin\(16, 2\);  
     
   pinMode\(switchPin, INPUT\);  
     
   lcd.print\(" Ask the"\);  
     
   lcd.setCursor\(0,1\);  
     
   lcd.print\("Crystal ball"\);  
     
   \}  
     
   void loop\(\)\{  
     
   switchState = digitalRead\(switchPin\);  
     
   if \(switchState \!= prevSwitchState \)\{  
     
   if \(switchState == LOW\)\{  
     
   reply = random\(8\);  
     
   lcd.clear\(\);  
     
   lcd.setCursor\(0,0\);  
     
   lcd.print\("The ball says :"\);  
     
   lcd.setCursor\(0,1\);  
     
   switch\(reply\)\{  
     
   case 0:  
     
   lcd.print\("Yes"\);  
     
   break;  
     
   case 1:  
     
   lcd.print\("Most likely"\);  
     
   break;  
     
   case 2:  
     
   lcd.print\("Certainly"\);  
     
   break;  
     
   case 3:  
     
   lcd.print\("Outlook good"\);  
     
   break;  
     
   case 4:  
     
   lcd.print\("Unsure"\);  
     
   break;  
     
   case 5:  
     
   lcd.print\("Negative"\);  
     
   break;  
     
   case 6:  
     
   lcd.print\("Doubtful"\);  
     
   break;  
     
   case 7:  
     
   lcd.print\("No"\);  
     
   break;  
     
   \}  
     
   \}  
     
   \}  
     
   prevSwitchState = switchState;  
     
   \}

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Deviled Eggs with Candied Bacon  
     
   \[图片省略\]10000217781920×1446 322 KB  
     
   My office is having their Thanksgiving Luncheon today and for the Potluck I will be bringing in Deviled Eggs with Candied Bacon.  
     
   I used this recipe to make these:  
     
       
       \[图片省略\]  
       
     
   \[图片省略\]10000217771920×2550 663 KB  
     
   \[图片省略\]10000217761920×2550 784 KB  
     
   \[图片省略\]10000217751920×2550 1.13 MB

2. **发言者 2**（回复第 1 条）：Those look delicious\!

3. **发言者 3**（回复第 1 条）：I am about to send this to Mr. Stitch and beg him to make these. Thanks so much for sharing\!

4. **发言者 4**（回复第 1 条）：Oooooo\! These sounds delicious\!

5. **发言者 1**（回复第 1 条）：It’s pretty yummy\! My husband found the recipe and the bacon is worth the work. It’s a nice addittion to the traditional recipe.

6. **发言者 5**（回复第 1 条）：Yum\! I love deviled eggs, but the candied bacon is magnifique :woman\_cook:.

7. **发言者 6**（回复第 1 条）：These are gonna have to go on my Thanksgiving table this year\! My family will go insane for these\! Of course, I may be sealing my fate because my husband will want them ALL. THE. TIME.  
     
   \(Beginning to plot how I can make these a surprise…\)

8. **发言者 1**（回复第 1 条）：They were a big hit at my work luncheon\! Not one left. This is always served at our family Thanksgiving dinner as well. My husband usually makes these but I work up at 5 am the day if my luncheon for work and I made them myself this time.

9. **发言者 4**（回复第 1 条）：:turkey: :deciduous\_tree: :fox: :evergreen\_tree: :chipmunk: :deciduous\_tree: :deer: :evergreen\_tree: :rabbit\_face: Your great project is one of this week’s Featured ProjectsCongratulations and thank you for sharing with the 某社区 Community\!\!\! :turkey: :deciduous\_tree: :fox: :evergreen\_tree: :chipmunk: :deciduous\_tree: :deer: :evergreen\_tree: :rabbit\_face:

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How to gradually add vocab to Master\+?  
     
   I apologize as I’m certain this has been discussed before but I can’t find the thread. I really want to start incorporating master\+ for my vocab \(I’ve already done so for grammar\) but I’m worried I will have a deluge of over 1000 reviews if I do so. Is there any way to mark just a few items at a time as master\+ so I can space out the reviews?

2. **发言者 2**（回复第 1 条）：Sounds like they resolved this, but when I did the initial update all I was slated to get like 2000 reviews on one day and staff manually paced them out for me.  
     
   That is to say, even if it isn’t fixed, staff could help you out if it came down to it\!

<!-- samples:end -->

