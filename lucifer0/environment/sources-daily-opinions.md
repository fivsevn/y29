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

<!-- intake-request:intake-2f47fc6689184a87b52d1b243edc4c00 -->
<!-- samples:start -->

采集时间：2026-11-14 22:01:43（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Battle System Ideas?  
     
   Godot Version  
   4.7  
     
   Question  
   I want some battle System Ideas for a game I’m making. :3 Similar to Cuphead or Hollow Knight or Cuphead

2. **发言者 2**（回复第 1 条）：Please read Posting guidelines in \#Help channel  
     
   Any search engine can help you with this.

3. **发言者 1**（回复第 2 条）：uh What?

### 讨论 2

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Introducing myself — 发言者 1 from Blanco, TX  
     
   Hello everyone,  
     
   I'm 发言者 1 from Blanco, TX. I work in construction estimating and quantity takeoff, preparing estimates from project drawings for homeowners, builders and contractors across the US.  
     
   I'm new to the Arduino community and keen to learn from the forum. Glad to be here\!  
     
   Sean

2. **发言者 2**（回复第 1 条）：Welcome and have fun with Arduino\!

3. **发言者 3**（回复第 1 条）：Welcome\!  
     
   Relax, grab your favorite beverage and go through the archives, there is a lot there.

4. **发言者 4**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   I'm new to the Arduino community  
     
   Show the picture of your Arduino UNO R3 hardware.

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[VENDU\] Steam Deck OLED 1TB  
     
   A peu près tout est dans le titre.  
     
   Je vends ma Steam Deck OLED 1TB achetée en janvier 2026. Je pensais en avoir absolument besoin, je pensais que ça allait changer ma vie... et elle a dû tourner 20h max depuis que je l'ai achetée.  
     
   Elle est comme neuve, 0 griffe, 0 souci. Elle est vendue dans son étui rigide avec le chargeur et le câble. Je n'ai plus la boîte en carton par contre.  
     
   Payée 679 EUR en janvier 2026, vendue aujourd'hui par Steam pour la modique somme de 919 EUR parce que why the fuck not. J'aimerais en tirer 550 EUR \(fdp in via MR ou remise en mains propres côté Bruxelles\).

2. **发言者 2**（回复第 1 条）：\(Bonne vente, mais je pense que tu ne devrais pas partager des numéros de transaction privés comme ça\)

3. **发言者 3**（回复第 1 条）：Ça pourrait intéresser un pote. Je mets une option dessus pour 24h si c'est OK pour toi, le temps de vérifier avec lui. Si pas, tant pis. :wink:

4. **发言者 1**（回复第 3 条）：Aucun souci :slight\_smile:

5. **发言者 1**（回复第 2 条）：Ah bien vu merci, je vire image et je la remettrai en version censurée quand je serai chez moi

6. **发言者 3**（回复第 1 条）：Bon, finalement, pas possible pour mon pote. Désolé \! \(Mais merci d'avoir gardé l'option\).

7. **发言者 4**（回复第 1 条）：Hello,  
     
   Je suis intéressé par l'annonce du coup vu que le pote de 发言者 3 est pas intéressé. C'est toujours open ou tu as eu d'autres gens intéressés en mp ? Je te la prendrai au prix annoncé.

8. **发言者 1**（回复第 7 条）：Hello,  
     
   Cest toujours dispo, rien en MP pour le moment :slight\_smile: .  
     
   Paiement Paypal entre proches te convient ? On peut passer en MP pour la suite.

9. **发言者 4**（回复第 1 条）：ça roule, je passe sur 某社区 \!

10. **发言者 1**（回复第 1 条）：C'est vendu, on peut fermer :slight\_smile:

### 讨论 4

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Kildall's algorithm  
     
   &gt; I work on a new \[Common\] Lisp compiler called Cleavir. Cleavir is the compiler part of Dr. Robert Strandh’s project, SICL

2. **发言者 2**（回复第 1 条）：Kildall's better known for his work on APL.

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Spotify connect “no longer works”  
     
   My fiancée this morning tried to stream to the SuperUniti from Spotify Connect on iOS and saw the message “no longer works with Spotify”.  
     
   Mine seems to be working, although the App Store shows an app update available for Spotify.  
     
   Has anyone else seen this?  And could someone from Naim confirm is it the case that the old streamers now don’t work with Spotify Connect anymore?  
     
   Edit: the SU is running the latest firmware with the new Naim radio.

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Re: \[閒聊\] 板上先生怎麼熬過太太更年期？  
     
   \[引用未收录发言\]  
   : 我太太更年期這段時間  
   : 脾氣暴躁異常  
   : 像是不定時炸彈  
   : 會在開心的氣氛中突然暴怒  
   : 讓身邊的人既錯愕又無奈  
   : 她每天回家都會莫名發怒五到十分鐘  
   : 才會冷靜下來好好談事情  
   : 基本上跟她談過但完全沒用  
   : 摔東西冷眼嘲諷已經是家常便飯  
   : 家裏女兒也受不了自己媽媽的火爆脾氣還有嘴巴  
   : 我們除了安靜不說話等時間過去這招  
   : 也不知道該怎麼辦  
   : 一般女性更年期要多久時間？  
   : 板上先生你們是如何熬過這段時期？  
   : 現在每天回家都會無奈待會面對的是冷暴力  
   : 已經好幾次我直接在社區大廳等候她冷靜  
   : 好像也只能這樣了、很無奈。  
     
   我老婆之前也是這樣......我也陪她去看更年期婦產科門診，  
     
   但是她不願意配合吃女性荷爾蒙，然後我建議她換用大豆異黃酮加蜂王乳，配合看中醫調  
     
   理加上早上陪她一起運動，這樣她比較願意．  
     
   家務方面幾乎80%我在做，  
     
   之後就有改善了，供參考．

2. **发言者 2**（回复第 1 条）：男人也有更年期

3. **发言者 3**（回复第 1 条）：只有一個性別算人

4. **发言者 4**（回复第 1 条）：男人的更年期男人自己不關心，女人不在乎，因為女人

5. **发言者 4**（回复第 1 条）：比較在乎自己

6. **发言者 5**（回复第 1 条）：不是每個人都適合吃女性荷爾蒙

7. **发言者 6**（回复第 1 条）：二樓太粗暴了

8. **发言者 7**（回复第 1 条）：男人沒時間管自己的更年期，錢難賺，子細漢

9. **发言者 8**（回复第 1 条）：板上先生是誰?

10. **发言者 9**（回复第 1 条）：日本人

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Early morning at the lake \(pond\)  
     
   Forecast was for patchy fog but that never happened. We have virtually no autumn color this year \(for the third in a row\). But at least it’s nice weather, with blue skies, highs around 75F / 24C and lows around 54F / 12C.  
     
   Playing with Greycard 0.11.0.  
     
   This file is licensed Creative Commons, By-Attribution, Share-Alike.  
     
   \[图片省略\]IMG\_7810-social-IMG\_7810-22048×1152 567 KB  
     
   IMG\_7810.CR3 \(23.5 MB\)  
     
   IMG\_7810.CR3.gcd.txt \(27.0 MB\)  
     
   \(wow… 800k\+ lines in that text sidecar\!\!\!\)

2. **发言者 2**（回复第 1 条）：\[图片省略\]IMG\_78102048×1365 824 KB  
     
   Took a swing using greycard…

3. **发言者 3**（回复第 1 条）：Sidecar bigger than the RAW :joy:  
     
   Is there some AI denoise involved or something? I don’t know how Greycard works

4. **发言者 4**（回复第 1 条）：DT5.7 IMG\_7810.CR3.xmp \(16.4 KB\)  
     
   \[图片省略\]IMG\_78102000×1334 482 KB

5. **发言者 5**（回复第 1 条）：\[图片省略\]IMG\_78102000×1293 538 KB  
     
   IMG\_7810.CR3.xmp \(21,0 KB\)

6. **发言者 6**（回复第 1 条）：tried to warm a bit to get that morning mood  
     
   \[图片省略\]IMG\_7810\_011920×1175 867 KB  
     
   IMG\_7810.CR3.xmp \(19.9 KB\)  
     
   \*nightly from today  
     
   \(I suddenly get no git version info in the about box after compiling a fresh version\)

7. **发言者 7**（回复第 1 条）：\[图片省略\]IMG\_78101920×1345 741 KB  
     
   IMG\_7810.CR3.xmp \(24.6 KB\)

8. **发言者 8**（回复第 3 条）：\[图片省略\] 发言者 3:  
     
   Sidecar bigger than the RAW  
     
   某参与者 :smirk:

9. **发言者 9**（回复第 1 条）：Darktable 5.7  
     
   \[图片省略\]IMG\_78101920×1281 358 KB  
     
   IMG\_7810\_03.CR3.xmp \(58.4 KB\)

10. **发言者 10**（回复第 1 条）：Still ‘playing’ with GIMP… trying to get what I think is acceptable and natural… Cool colour temp… tried warm… but perhaps cool is my preferred choice…  
     
   Here’s my attempt. Hope it’s ok, thanks for sharing\!  
     
   \[图片省略\]IMG\_78101090×727 317 KB

11. **发言者 11**（回复第 1 条）：Fine scene, choose for a light and soft touch, surely \(much\) lighter the when taken… hope you like it.  
     
   \[图片省略\]IMG\_7810\_02031×1440 408 KB  
     
   IMG\_7810.CR3.xmp \(26.4 KB\)  
     
   Warmed the white balance a bit. Slightly enhanced oranges and the same with the greens. Removed couple of spots.

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Wrist warmers  
     
   This is what a recent mystery crochet became. A gift for a daughter.  Nothing beats toasty hands. \#DottyAndNell \#handmade \#slowfashion crochet  
     
   \[图片省略\]10000649471078×1080 348 KB

2. **发言者 2**（回复第 1 条）：pretty\!  
     
   I like the ruffles~

3. **发言者 3**（回复第 1 条）：The ruffle is way cute\! I love these\!

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：TCG Terminology  
     
   Sup Yall, My town as recently opened a Cafe that hosts Game nights every week, so its time I start learning Vocab Specific words.  
     
   I was curious if anyone else happens to have a good list for SPECIFIC Card games  
     
   I already used this site to get the ball rolling for intro vocabulary. I happen to play MTG and Gundam IRL so I should be able to find that vocab easy enough. But for Pokemon and One Piece I know nothing. If anyone has any good lists floating around I would appreciate that.  
     
   ALSO, I am making a deck in 某社区 to share once finished as well separated by games so it wont be just for me.

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Neues Hauke PnP Mittelalter  
     
   Hallo zusammen ich hoffe es gibt nicht schon bereits ein Beitrag dazu.  
     
   Trotzdem wollte ich es teilen für alle, bei denen es noch nicht auf der 某社区 Startseite aufgetaucht ist\!\!

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：其实我怀疑现在根本没有要石雕的别的平台引流来的新人，全都是老肥哥们想要碎槽领新饼的阴毛

2. **发言者 2**：\( ﾟ∀。\)槽都碎了还怎么领新饼？  
     
   能说出这种话来，你才是新人吧\(　^ω^\)

3. **发言者 3**：碎槽了还怎么领新饼，而且饼干不是能自己碎吗\( ﾟ∀。\)

4. **发言者 4**：阴毛吗？那很不卫生了\( ﾟ∀。\)

5. **发言者 5**：连正常换饼都不会，那还是新人啊

6. **发言者 6**：虽然总说引流，不过也没几个新人吧，好像想引就能来的似的\( ﾟ∀。\)

7. **发言者 7**：槽是不可恢复的啊\( ﾟ∀。\)777想拥有另外一个五个槽的号只能换地方，用新邮箱新手机号注册

8. **发言者 7**：而且饼可以自碎\( ﾟ∀。\)等下一次开放领取的时候再领任意个新饼就好了

9. **发言者 8**：po才是新人吧饼干机制都不知道食雕三个月先

10. **发言者 1**：老久没领饼干了原谅我\( TдT\)我紫衫去了

11. **发言者 1**：留下jp

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Father  
     
   \[图片省略\]013840×2160 4.59 MB  
     
   \[图片省略\]023840×2160 4.72 MB  
     
   \[图片省略\]043840×2160 4.81 MB  
     
   \[图片省略\]06'3840×2160 4.91 MB  
     
   \[图片省略\]053840×2160 4.1 MB

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：用 Claude Fable 5.2 做了一个 AI 图像生成网站，用的最新的 H3 Image 模型，用 Claude Fable 5.2 做是大材小用，体现不出 Fable 5.2 的能力，额度反而蹭蹭往下掉，悲催的是，做完这个项目，我的 Claude 弹验证了，天才程序员下线。说说这个项目，H3 Image 模型生图除了快和 4K ，并不觉得有多好，有些失望，不值得我花巨资买个 ai 域名，如果大家想体验，可以留下邮箱，我给送一些积分。  
   网址： \[链接隐去\]

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: How is your team handling the flood of PRs?  
     
   Curious to hear how everyone is dealing with the flood of PRs in their teams now that we all arrived in the AI era and dust settled a bit. From review process \(humans \+ agents, when/which\) to e2e testing \(like having scenarios as markdown that agents test?\), where did you land and what were the hard lessons learned?

2. **发言者 2**（回复第 1 条）：&gt; everyone is dealing with the flood of PRs in their teams now that we all arrived in the AI eraYeah, I think free will doesn't exist too

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：EU: Digital Fairness Act - Discussion  
     
   You might have heard of the Digital Fairness Act, currently being prepared in the EU. It’s mainly about commercial, digital practices in general but also has a few points on game-specific things like dark-patterns in advertising, in purchase flows, in-game currencies and loot boxes.  
     
   Some resources on this:  
     
   The DFA itself: Digital Fairness Act articles \| Digital Fairness  
     
   An article about what the big video game lobby thinks: “Unworkable, unjustified and disproportionate”: trade bodies slam the EU’s Digital Fairness Act – Mobilegamer.biz  
     
   One of those lobbies: Video Games Europe - About us  
     
   I’m generally very much inclined to like the proposal and respect the willingness to protect minors especially from a practice that has been tolerated for a quite a long time now without being properly addressed.  
     
   Reading the lobby’s response pokes at my general distaste for the state of the games industry. Of course Roblox and Embracer don’t like the idea, that they can’t sell pay-to-win/progress and loot boxes to children anymore.  
     
   On a side note: does anybody know how it is with trading cards in the EU?

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Openwrt : modem 5G pour internet dans une maison  
     
   \[图片省略\]IMG-20261109-WA00011396×441 66.6 KB  
     
   Bonjour,  
     
   J'ai acheté une box Telstar 5G avec openwrt d'installer dessus.  
     
   J'ai mis ma carte sim, configurer le pin. Ça a l'air de bien se passer puisque le réseau 4G est accroché . Par ailleurs, dans la partie SMS, j'arrive à en envoyer. Donc, à priori, le réseau est bien détecté.  
     
   Cependant, je n'ai aucune connexion internet sur les ports RJ45 ou via le wifi du routeur. Et je ne comprends pas comment faire pour tester le connectivité.  
     
   Pouvez-vous me dire quelles commandes envoyées \(ping ?\) pour tester la connexion ?  
     
   Savez-vous quel paramètre faut-il modifier pour avoir accès à Internet lorsqu'on est connecté au routeur ?  
     
   D'avance merci  
     
   Xavier

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How I Ended Up Turning a 22-Year-Old PostgreSQL Type-Confusion Primitive into RCE \(CVE-2026-6460\)

2. **发言者 1**（回复第 1 条）：Very nice deep dive into the Postgres internal type system. The investigation was LLM-assisted and the post has some highly questionable visualizations, but the blog post text looks hand-written.

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Mixed Lighting Mojo  
     
   A photo from the Concert Hall in Bad Orb. it has a very neat presence in person. But I struggled to control the mixed lighting in this shot. I ended up using a masked second instance of CC to control the skylit parts. But I am not 100% convined by my result and am curious how you guys will tackle this.  
     
   \[图片省略\]261016\_185832\_DSC090712000×1330 448 KB  
     
   261016\_185832\_DSC09071.ARW \(23.7 MB\)  
     
   5.7 XMP  
   261016\_185832\_DSC09071.ARW.xmp \(32.0 KB\)  
     
   This file is licensed Creative Commons, By-Attribution, Share-Alike.

2. **发言者 2**（回复第 1 条）：\[图片省略\]261016\_185832\_DSC090711623×1080 373 KB  
     
   261016\_185832\_DSC09071.ARW.xmp \(16.3 KB\)

3. **发言者 3**（回复第 1 条）：I prefer it warm and cosy. :innocent:  
     
   \[图片省略\]261016\_185832\_DSC090712000×1380 547 KB  
     
   261016\_185832\_DSC09071.ARW.xmp \(18,3 KB\)

4. **发言者 4**（回复第 1 条）：With ART 1.26.9  
     
   \[图片省略\]261016\_185832\_DSC090716016×4016 1.95 MB  
     
   261016\_185832\_DSC09071.ARW.arp \(13.4 KB\)  
     
   Greetings. Roberto

5. **发言者 5**（回复第 1 条）：\[图片省略\]261016\_185832\_DSC090711587×1080 756 KB  
     
   261016\_185832\_DSC09071\_01.ARW.xmp \(21,2 KB\)

6. **发言者 6**（回复第 1 条）：I like this picture a lot :slight\_smile: Darktable 5.4  
     
   \[图片省略\]261016\_185832\_DSC090712048×900 271 KB  
     
   261016\_185832\_DSC09071.ARW.xmp \(17.2 KB\)

7. **发言者 7**（回复第 1 条）：FerrumPix and GIMP  
     
   \[图片省略\]261016\_185832\_DSC09071 FerrumPix and GIMP3000×2000 1.14 MB

8. **发言者 8**（回复第 1 条）：Darktable 5.7  
     
   \[图片省略\]261016\_185832\_DSC090711920×1450 365 KB  
     
   261016\_185832\_DSC09071.ARW.xmp \(8.7 KB\)

9. **发言者 9**（回复第 1 条）：Nothing fancy, just bloomed the light sources. One white balance on the inside wall and the other on the top of the building  
     
   \[图片省略\]261016\_185832\_DSC090712573×1764 453 KB  
     
   261016\_185832\_DSC09071.ARW.xmp \(20.2 KB\)

10. **发言者 10**（回复第 1 条）：\[图片省略\]ConcertHall\_PIX2058×1423 536 KB  
     
   Night time shot restyled “Nuit Americaine”…  
     
   \(Well, I tried\)

11. **发言者 11**（回复第 1 条）：:green\_square: Green  
     
   \[图片省略\]261016\_185832\_DSC090711917×1280 301 KB  
     
   \(The effect was achieved by disabling white balance.\)

### 讨论 19

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：The value of 某社区 for a non-beginner  
     
   Title is quite weird but bear with me: I’ve been studying japanese for quite a bit, and while I’ve had ebbs and flows and some really bad years, I’ve started again and have been able to rekindle old habits.  
     
   As a baseline, I usually study grammar via immersion and then writing down notes and checking them again \+ I have a teacher I have classes with every week so I also get grammar \(and general\) lessons from her.  
     
   So I guess my question is if 某社区’s SRS system would still be helpful, or if  my current method of mostly immersion might be better. I know its silly to ask this on the 某社区 forums since it’ll be mostly people who are biased towards 某社区, but I feel like hearing everyone’s experiences would help me in my decision  
     
   Also yes I’m trying out the 30 day trial :\] refreshing some n5 stuff I still mess up, but I already got to lv 28 from mastering a buncha cards lol i feel like I’m cheating

2. **发言者 2**（回复第 1 条）：I started 某社区 at N3 and find it very useful. I think you can’t adequately reinforce/learn vocabulary from immersion alone. As for grammar, I think it’s also a useful reinforcement.

3. **发言者 2**（引用未收录发言）：\[图片省略\] 发言者 3:  
     
   I see above that someone feels like vocabulary can’t be reinforced from immersion alone.  
     
   I did say adequately reinforced :stuck\_out\_tongue: like somethings will be reinforced, others wont, and you’ll miss out on things that dont appear frequently enough in the media you consume imo

4. **发言者 3**（回复第 3 条）：I still don’t agree. In fact, it’s the complete opposite. SRS queues give me a light reinforcement but it’s never adequate. It takes me reading words over and over across different examples to ever reach the level I consider “adequate”, as in, I understand the feeling this word will convey. All these words I am using right now weren’t bestowed to me through Anki or a similar interface

5. **发言者 2**（引用未收录发言）：\[图片省略\] 发言者 1:  
     
   People squabble over frequency decks but tbh sticking with one regardless of flaws and nitpicks will propel you to be able to i\+1 a lot of stuff out here.  
     
   Agreed\! Consistency is def the most important factor

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：OsmAnd edits through to September by new user in Northumberland  
     
   Continuing the discussion from Changesets by 'Albert radley':  
     
   They look like someone has discovered with OsmAnd that they can edit the map.  Their last edit was 2 months ago so they may not see changeset discussion comment messages.  If anything looks “obviously wrong” I’d fix it, but some of the edits look to be trying to add genuine new stuff \(even if some names are perhaps beyond even loc\_name\).

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：龙，不该有奶子  
     
   龙娘分两种情况，通过魔法或者其他什么设定化身为人，有奶子很正常，毕竟她选择变成了“人”。  
     
   但是如果是龙，就是龙本身，不应该有奶子  
     
   无论是东方龙还是西方龙，长了奶子就是异端

2. **发言者 2**：龙主要原型是爬行动物又不是哺乳动物，没乃乃不是很正常？\( ﾟ∀。\)7

3. **发言者 3**：我不管，我要嘬龙娘乃乃

4. **发言者 4**：我提供一个解决方案  
     
   龙像鸭嘴兽一样是卵胎生，在产下龙蛋并孵化后，诞生的幼崽龙还需要经历一段时间的哺乳期。而为了哺乳幼崽，从怀孕到幼崽脱离哺乳期后的这段时间，怀孕的龙的乳腺会开始发育并在龙幼崽诞生前发育完备、具备哺乳功能，并在龙幼崽的哺乳期期间形成明显的乳房。  
     
   而在龙幼崽脱离哺乳期后，龙的乳腺不再发育并逐渐萎缩，直到恢复回怀孕之前的样子。这样龙就变回平胸了\(ゝ∀･\)

5. **发言者 5**：，对

6. **发言者 6**：\( ﾟ∀。\)……是什么东西让你发出了如此感慨，亚龙人女仆吗  
     
   正经的龙形象好像就从来都没有过柰子吧

7. **发言者 7**：po啊，不是龙娘害了你，是这e621害了你啊

8. **发言者 8**：龙本体怎么会有奶子呢\( ﾟ∀。\)  
     
   po你到底看到了什么

9. **发言者 9**：我的奶龙\( ´д\`\)

10. **发言者 10**：人形龙娘有胸我接受\(　ﾟ 3ﾟ\)  
     
   龙形为什么还有我不接受\(╬ﾟдﾟ\)

11. **发言者 11**：但跟龙亲缘近的是鸡，鸡会有胸肌和胸毛，胸前蓬蓬的软软的可以孵人也不是不行吧\( ´ρ\`\)

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Uploaded image becomes darker  
     
   A recently uploaded image became a lot darker about a second after upload. It’s a jpg exported out of Krita and most of the layers in the Krita file are renders from Blender. The image looks fine in my file browser, and has an sRGB color profile. Advice appreciated.

2. **发言者 1**（回复第 1 条）：Uploading a PNG instead of a JPG fixed the problem. Except that clicking on the image does not give a full size view.

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：目前给弄了个 3 年的定期存款  
     
   希望有点收益,不要太大也不要冒险吧

2. **发言者 2**：每年给孩子屯几根金条，比你那些存款靠谱的多。

3. **发言者 3**：长江电力

4. **发言者 4**：我现在是在银行 app 里买金子

5. **发言者 5**：银行股定投

6. **发言者 6**：纳斯达克

7. **发言者 7**：老派思维

8. **发言者 8**：买国债，年收益率 2.0%左右，10 年期、20 年期都行，每半年付利息

9. **发言者 9**：黄金，虚拟币，纳指

10. **发言者 10**：逢低买金条

11. **发言者 11**：黄金 纳指

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：S1pw in Baby Blanket  
     
   Good Morning, I am knitting a baby blanket DK with the border included, to make a border stitch between the border and the pattern of the blanket it tells me to do S1pw, which I have been doing but what’s annoying at the beginning when I start it pulls up a bit which I don’t like, is there another way I could do this. I may need to undo what I have knitted so far but if there’s another way and it looks neat I’ll more than happily start again. I have attached a photo and hope it’s clear enough for you to see what I mean.  
     
   \[图片省略\]IMG\_00701920×1440 640 KB

2. **发言者 2**（回复第 1 条）：It might help to know which pattern you’re making.  
     
   The slipped stitch will pull up because it is only being worked every other row which makes a elongated stitch.  Often this looks nice over an extended area but if you don’t like the result I’m sure there could be other possibilites.  
     
   Can you guve a link to the pattern or tell us the name, number, publisher so we can see it?

3. **发言者 3**（回复第 1 条）：Correct me if I’m wrong, but it looks like you’re slipping one pw alternate  garter ridges \(this being two rows\) rather than on alternate rows.  
     
   I think a sl1pw in garter stitch on alternate rows should give you a column of loose V’s?

4. **发言者 1**（回复第 2 条）：I got the pattern from \[链接隐去\] it’s called Jamie Blanket, knitpurlmaked/Mindie Designs 2017. I hope that helps, someone on the forum suggested knitting into the back of the stitch instead of slipping it but what would I do on the return row?

5. **发言者 1**（引用未收录发言）：I was using the yarn at the front but it still pulled upwards, then read that the pattern says keep the yarn at the back but I still have the same problem, it’s she it first starts off but it doesn’t look good and it annoys me as I would like it so stay straight, if thst makes any sense\!\!

6. **发言者 3**（引用未收录发言）：Here’s a picture of the corner that you’ve shown us.  
     
   \[图片省略\]412961500×1000 191 KB

7. **发言者 4**（回复第 1 条）：\[链接隐去\]

8. **发言者 1**（回复第 1 条）：Thank You, I’ll give it a go and will do a small knitting square first to see how it turns out. The pattern says to do S1pw both ends and on the return just knit &amp; purl. I still can’t send the photos it keeps coming up with an error\!

9. **发言者 2**（引用未收录发言）：Very nice slipped stitch. Glad to hear you cracked it and managed to upload a pic too\!

### 讨论 25

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Gamma PDF – AI-native PDF reader, self-hosted  
     
   Author here.I have been reading papers and taking notes for years, using Zotero for the PDFs, Obsidian for the notes, and, recently, an AI chat tab for my questions. Gamma PDF is my attempt to make that one place.In Gamma, you open a paper by simply pasting an arXiv \(or DOI\) link. Highlight a sentence, or drag a box round a figure, and it becomes a note beside the page with the quote and a link back.You can ask the AI about a figure or some text, and you get an answer that cites a page you can click.You can read and annotate papers on an iPad with the Apple Pencil. Notability \(Goodnotes\) import/export is supported.You can connect to Zotero's cloud and use Gamma as a better Zotero client, or import your whole library with no effort.You can deploy Gamma with Docker and read papers from anywhere.You can connect Gamma to Codex \(Claude\) with Gamma MCP, using it as a knowledge base.Try it without installing: \[链接隐去\]

2. **发言者 2**（回复第 1 条）：Cool project\! Does it support onenote import?

3. **发言者 3**（回复第 1 条）：neat ui ngl

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：What do you think of local ai models on your pc helping with development?  
     
   Recently i’ve been playing with Ollama and tested few coding models like Qwen-2.5:14b or Qwen3.5:27b, for me they’re great text formatting tools and can somewhat help with math but writing large amounts of code is still problem for them, even if they’re not magic wand for coding do you think they can be game changer for game dev or minor improvement or even bigger problem than help?

2. **发言者 2**（回复第 1 条）：I think for any tool, AI or otherwise, the important thing is to find a tool that solves a problem, not pick a tool and then find uses for that tool

3. **发言者 1**（回复第 2 条）：it is true but still knowing possibilities of something is the way you find the tool when you need it

4. **发言者 3**（回复第 1 条）：what do you expect to help you with those models?  
     
   do you know how to setup bridge? MCP  
     
   how do you prompt instructions? \( specific functions or documentation search or deliver full logic?\)

5. **发言者 1**（回复第 4 条）：i didn’t dived into this much, but that’s the topic for overall local ai being helpfull for game dev in any sense, for me it fixes ton of problems with formatting but it’s nice to hear other’s opinion / ideas

6. **发言者 2**（回复第 1 条）：Regardless of if it is capable of creating non-slop or not I’d advice avoiding using it generatively until the actual legal situation is established, to avoid risking unintended plagiarism issues or inability to copyright your work

7. **发言者 1**（回复第 6 条）：really i never though ai might be a legal problem in the future

8. **发言者 2**（回复第 1 条）：And the issue with the liability is that this isn’t something you can rely on being protected by the lack of law, they aren’t making anything new illegal, so anything done before new laws and precedent will be prosecutable

9. **发言者 1**（引用未收录发言）：That’s the big problem with ai, i think code isn’t as bad in that terms but assets? i think it will cause some problems in the future  
     
   Also it is interesting that if you think about AI itself it won’t be better than a high organized team wtih free assets and knowledge of game engine

10. **发言者 1**（引用未收录发言）：Well losing skill to add semicolons at the end of each line rapidly is very important skill so…

### 讨论 27

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[A VENDRE\] Apple Watch SE \(2e génération\)  
     
   Bonjour la zone, j'ai offert à ma femme une Apple Watch SE \(2e génération\) 40 mm GPS boitier aluminium Galaxy et bracelet sport Galaxy Taille S/M en octobre 2024 et elle a pour ainsi dire quasiment pas servi après 2 semaines à faire mumuse avec. Photos possible.  
     
   Vu qu'elle doit se racheter des Airpods je me dis autant en financer une partie avec la revente de la Watch.  
     
   Achetée 200 balles sur Amazon Italie  
     
   \[图片省略\]image540×817 40.8 KB  
     
   Je propose 100 balles, négociable si zonien de longue date, remise en main propre à Amiens et alentours préférée, sinon expédition à vos frais.  
     
   Je laisse l'annonce 2 semaines ici avant de la poster sur leboncoin.

2. **发言者 2**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   remise en main propre préférée  
     
   D'accord, mais où ?  
     
   \(j'ai une petite idée en tant que modo, mais bon...\)  
     
   Je ne suis pas intéressé, mais c'est pour que l'annonce soit claire

3. **发言者 3**（回复第 1 条）：potentiellement intéressé pour Mme en fonction de "où".

4. **发言者 4**（回复第 1 条）：Moi je parie que c'est Amiens \(mon 2ème prénom c'est Sherlock\)

5. **发言者 5**（回复第 4 条）：\[图片省略\] 发言者 4:  
     
   mon 2ème prénom c'est Sherlock  
     
   Too late ... glorieux naming déjà pris  :zany\_face:

6. **发言者 1**（回复第 1 条）：En effet avec la ville c'est mieux :sweat\_smile:  
     
   Donc Amiens et alentours et 1er post édité.  
     
   发言者 3 tu es évidemment un zonien de longue date donc si les frais de ports font peur on peut discuter.

7. **发言者 3**（回复第 6 条）：Je te dis ça ce soir :slight\_smile:

8. **发言者 3**（回复第 7 条）：Je passe. Elle préfère garder sa vieille.

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Terminal borders that don't cost a cell

2. **发言者 2**（回复第 1 条）：What would people do to not use a proper GUI library.  
     
   I mean, it’s cool but we’re like \*this\* close to adding \`inset\`, \`outset\`, \`groove\`, and \`ridge\` styles and it’ll be basically Motif/win95, only on a grid.

3. **发言者 3**（引用未收录发言）：Can you expand a little what distinguishes this from a full GUI, especially in light of projects like \[链接隐去\] which render Wayland into a terminal with sixels?  
     
   As far as I can tell, the main difference is the kind of styling that's easy to do, and the amount of fallbacks and variations needed if your terminal handles different features differently in termcap.

4. **发言者 4**（回复第 1 条）：I love this\!  
     
   Does it fail gracefully in terminals without support and just not render the lines?

5. **发言者 5**（回复第 1 条）：Ghostty is starting to remind me of Chromium; a place where new standards for a platform are unilaterally inserted and by which others are pressured to adopt due to popularity. I don't want to end up in a world where 90% of "TUI" apps actually require ghostty and will not render reasonably in any other terminal.

6. **发言者 1**（回复第 4 条）：Yes. assuming the terminal is well behaved. As a simple test, both the Ratatui apps degrade fine in tmux under \[链接隐去\] if it's any indication of things not breaking hard \(notoriously a painful combo\). The detection logic in the spec is just normal stuff you'd expect.

7. **发言者 3**（引用未收录发言）：I'm not sure why they're not considered GUIs. As capabilities get added, the distinction seems like it's become negligible, and the main difference seems to be that the rendering is flakier and less capable.

8. **发言者 1**（回复第 7 条）：A good answer to this might be to ask yourself how would labeling them GUIs make something clearer?

9. **发言者 3**（回复第 8 条）：They are GUIs. The main distinction, as far as I can tell, is that there's a little bit less setup to access them remotely, in exchange for a worse user experience. But that additional setup doesn't seem to be a fundamental limitation of the technology.

10. **发言者 6**（回复第 1 条）：I like the idea\!  
     
   The log example's borders touch the text which is looks pretty bad IMO, and might make reading harder depending on the language.    
   I wonder if the protocol can mandate a visual separation.

11. **发言者 1**（引用未收录发言）：Yeah, I can see how this would be pretty nice for lnav.

### 讨论 29

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Wireless Headphones have really improved over time  
     
   During my most recent vacation, used a pair of B&amp;W PX8 S2 for playback.  They exceeded my expectations performance wise.  
     
   So, decided to compare the PX8 S2 to the venerable Sennheiser HD 600 and HD 650.  To my utter surprise, the PX8 S2 was clearly a step up sonically over either Sennheiser offering. Every aspect of playback was better with the PX8 S2.  Dynamics, low level detail, tonal balance, you name it, it was better.  The thing that really stood out was horns and woodwinds sounded a lot closer to real with the PX8 S2.  Also used a questyle dongle for hi-res.  
     
   I’m wondering how much the carbon fiber driver plays into this.  This has caused me to re-evaluate priorities regarding headphone listening, including costs to get high quality sound.

2. **发言者 2**（回复第 1 条）：I’m so sorry for your ears.

3. **发言者 2**（引用未收录发言）：It’s that almost all are closed back. I don’t deny use cases for wireless or ANC.  
     
   But closed backs are fatiguing. Even the ZMF Verite.

4. **发言者 1**（回复第 3 条）：Ah\!  Makes sense.  
     
   My favorite headphones are open:  Abyss Diana TC and Verum 2.

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：NDX2 can’t see product  
     
   Hi to all, After a power cut and all my gear was suddenly ‘switched’ off, I’ve had a few issues with the Naim app not seeing my NDX2. After a while it does eventually connect but sometimes it doesn’t so I’m a bit perplexed here and looking for some advice please?  
     
   I’ve done all the necessary things like reboot my routers and the streamer I had to do a factory reset which was a real pain.  
     
   Any tips will be greatly appreciated..

2. **发言者 2**（回复第 1 条）：I had a similar issue here in Sydney and eventually had to power everything down, reboot the router, wait until fully rebooted, only then restart my Ci-102.  
     
   Although I’d already rebooted the CI-102, it only worked correctly on the second reboot, I guess as the router needed more time following its reboot.  
     
   Networks can be tricky \!

3. **发言者 3**（回复第 1 条）：As 发言者 2 says try turning everything off at the mains. Router\(s\)  all network devices. Power the router back up and wait. Cup of tea time. Wait until your phone sees the wifi again then turn your phone wifi off and on. Then power on the NDX2 and let it find the network.

4. **发言者 4**（引用未收录发言）：Interesting. For me a restart of the NDX2 is what solves it, not a restart of the tablet. I too am using Wi-Fi for everything.

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Re: \[求助\] 婚後買房地點選擇  
     
   都不選，因為都不好。  
     
   另外不要過度指望他人，公婆能幫忙但是很好但是不要依賴；如果老人家身體出個問題或  
   是那天累了不想顧又是一個難題。  
   這個幾乎發生機率我看有個70%吧，周遭一堆公婆原本說很願意很喜歡小孩然後放棄的。  
     
   —  
     
   我的誠心建議是3  
   太太或是先生評估換工作  
   換到近一點的地方然後兩個人都能走路上下班的。  
   你自己看你不管選1或是2兩個人加起來一天幾乎都有快4個小時的時間浪費掉，這都還沒  
   提到通勤的錢跟耗費的心力。  
     
   要育兒，關鍵就是時間跟體力；兩個工作近然後離小孩近可以輪流Cover我覺得才是王道  
   ，省下的時間心力絕對超過金錢。  
     
   當然就看你們的工作是不是真的好到捨不得換啦...

2. **发言者 2**（回复第 1 条）：要兩個人都能走路上班，這條件太困難了吧

3. **发言者 3**（回复第 1 条）：我也覺得夫妻一直分開上班真的花太多時間在交通上了

4. **发言者 3**（回复第 1 条）： 就算有後援 家庭生活還是要妳們花時間經營

5. **发言者 4**（回复第 1 条）：正解

6. **发言者 5**（回复第 1 条）：同意這篇！我公婆超罩，而且我爸媽也願意幫忙，但

7. **发言者 5**（回复第 1 条）：其實看長輩照顧也會很心疼她們，他們住中部但兩個

8. **发言者 5**（回复第 1 条）：禮拜輪流上來北部幫我顧老大，覺得他們犧牲很多，

9. **发言者 5**（回复第 1 条）：年紀大體力是一方面，離開熟悉的交友圈真的很影響

10. **发言者 5**（回复第 1 条）：心理健康，所以老二我就沒有請他們幫忙（但她們有

11. **发言者 5**（回复第 1 条）：空可以隨時上來玩小孩），偶爾幫助可以，但讓長輩

### 讨论 32

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Craftily Containing My Pharmaceuticals  
     
   \[图片省略\]IMG\_74052577×1933 1 MB  
     
   Every time I travel with my pill case, I end up fishing pills out of the bottom of my bag… This is non-optimal, of course. So, finally, I got smart and made a special zipper pouch just for my pill case. Now all those tiny pills are held hostage… fashionably\!  
     
   \[图片省略\]IMG\_74042016×1512 691 KB  
     
   \[图片省略\]IMG\_74061956×1467 670 KB  
     
   It even matches this larger bag that holds all my pill bottles. It’s faded and in need of a wash, but you see the resemblance, I hope…  
     
   \[图片省略\]IMG\_74092427×1820 731 KB

2. **发言者 2**（回复第 1 条）：That’s a great solution. I only take 3 pills a day, but I keep them in day and night boxes like that because I that’s the only way I can verify I took them correctly.

3. **发言者 3**（回复第 1 条）：Nice\! It’s important to store pills fashionably\!

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：そう難しくはある  
     
   In one of the examples for the まい grammar point, this construction is used:  
     
   １９５０年代、学者達は、コンピューターを使って天気を予報することはそう難しくはあるまいと考えていたが、１４日以上先の予報は不可能である事がすぐに明らかになった。  
     
   I have recently learned the くはない・くはある grammar point as well, so I’m wondering if that’s what this is, i.e., this is saying “it’s not that it would not be difficult \[but it would be possible\]”, or if this is just a construction that’s necessary to connect an い-adjective with まい. Does anyone know if this counts as the くはある grammar point?  
     
   Thanks\!

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Pavement mapping question  
     
   Hi folks,  
     
   I was reading \[DRAFT PROPOSAL\] Should I be mapping a separate pavement or an integrated pavement? Guidance for UK mappers and was going to ask there but thought perhaps I should open a separate topic.  
     
   Just to make sure, I’ve understood, example:  
     
   \[图片省略\]Screenshot from 2026-11-14 13-43-141035×750 248 KB  
     
   Link: OpenStreetMap  
     
   Consensus generally would be to:  
     
   Map the red pavements as separate footpaths  
     
   Presumably with a footpath=sidewalk tag?  
     
   Adding sidewalk:separate to the roads or sidewalk=no if these are separated paths rather than sidewalks?  
     
   Not tag the orange pavements, instead add these as properties of Balmoral Avenue.  
     
   Add sidewalk = both?  
     
   Connect the bottom red path to the perpendicular road \(Balmoral Avenue\) - since the pavements has a kerb to the road.  
     
   Connect the other red paths via the driveways in blue? Since there is no actual footpath to road connection. Even though those driveways are presumably private?  
     
   \[图片省略\]Screenshot from 2026-11-14 13-43-14 annotated1035×750 258 KB  
     
   Thanks\!

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：我现在的梦想，每月能赚2万元，租一个安静点的房子，装个快点wifi，最好没有累的工作，有稳定的性生活

2. **发言者 2**：\( ´ー\`\)

3. **发言者 3**：去掉第一个和最后一个

4. **发言者 4**：至少我每天一撸，非常稳定\( \`ー´\)

5. **发言者 2**：梦想：不被裁

6. **发言者 5**：梦想，父母多活一点，最好90岁加还身体健康，然后我也身体健康\|∀ﾟ

7. **发言者 6**：2万块又不累的工作太稀罕了\( ﾟ∀。\)

8. **发言者 7**：我真感觉钱是万能的  
     
   \|ー\` \)  
     
   已经在努力挣钱但是还是好想要钱啊  
     
   我想要天降五百万

9. **发言者 8**：这个全国99.9%的人都达不到吧

10. **发言者 1**（回复第 9 条）：\[引用第 9 条\]  
     
   所以说是梦想

11. **发言者 9**：都做梦了为什么不是每个月有不同的美少女包养我要多少给多少

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Quadruped walk cycle  
     
   I’ve been working on a goat walk cycle for a short film. I used a horse as a reference \(because it was in tutorial Blender timeline\), so I know there might be some differences in the movement. I’d really appreciate your feedback and suggestions on how to improve the walk cycle. Thanks\!

### 讨论 37

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：App store 10 月 14 订阅，今天自动续订。 钱扣了，但是 store 里订阅状态显示已取消订阅，订阅有效期到 12 月 14 日（我没有进行过操作）。  
   Muse App 里现在显示没有订阅，是免费版。尴尬了，然后去网页版里也看不到订阅，也无法进行新订阅，貌似是订阅状态卡住了。  
   Apple 账号没问题，刚试着订了个别的，秒付了。

2. **发言者 2**：可以联系下客服？  
   另外问下，付费版本 除了模型更换 还有其他差异吗  
   比如云电脑资源更大？ 目前 150g 硬盘 内存可用的只有 1g 左右

3. **发言者 3**：我也想知道。付费版和免费版。使用上有什么不同吗？想付费，但是一直没成功

4. **发言者 1**：发言者 2 没留意过，刚问它是 6G （系统可见约 7.7 GiB ）。  
   模型其实差别还挺大的，wonder 基本不太容易忘事儿。

5. **发言者 1**：发言者 3 反正我体感就是额度基本用不完，主动性挺好，有点烦了甚至。wonder 日常使用感觉真挺好的，grok bot 我测试是 opus5.5 ，但用起来也没觉得比这个好很多。

6. **发言者 3**（回复第 5 条）：\[引用第 5 条\] 我也有 muse 和 grok ，老印区的，但是我觉得额度太少。我主要是想看看付费版的对比有什么大区别。但是目前没找到付费的渠道。我只绑定了邮箱。怕瞎搞给封号了

7. **发言者 1**：发言者 3 grok 30 刀订阅的额度确实有点少了，最近用的难受。muse 是 20 刀够够的，但是我这续订失败，预感不妙了

8. **发言者 3**（回复第 7 条）：\[引用第 7 条\] 是的，但是没办法，没羊毛了。。。我还是花钱收了个老印区的

9. **发言者 2**：我听说网页上 16 刀？ 楼主去看看

10. **发言者 1**：发言者 2 嗯，网页版订阅便宜些。但是网页更不行，各种卡过不了

### 讨论 38

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Kit Couture, Fugloy Fingerless Mittens  
     
   Just wanted to check I am doing correctly.  
     
   Working the thumb, even though the chart is 12 rows, and pattern tells me I am working for 14 rounds, 2 more than is shown.  In addition to the first round that requires a KYOK?  
     
   \[图片省略\]IMG\_84371920×730 301 KB  
     
   \[图片省略\]IMG\_84391920×2560 1010 KB

2. **发言者 2**（回复第 1 条）：Yes, the pattern stitch is worked by KYOK so include that as you work row 1 of the repeat. Then continue with the chart’s row 2  
     
   \[链接隐去\]

3. **发言者 1**（回复第 2 条）：Great. And then just continue?. The instructions talk about going beyond Row 12 - begin chart again I guess?

4. **发言者 2**（回复第 3 条）：Yes, until there are other directions, continue the chart. The photos in Ravelry show the pattern extending beyond the thumb and up to the ribbing at the fingers.

5. **发言者 1**（回复第 4 条）：Thank you. I guess first time doing, difficult to imagine. I understand, thanks to you\!

6. **发言者 2**（回复第 5 条）：First time is often a bit puzzling but you’re on your way now. If another question comes up, don’t hesitate to ask. And of course we love to see your finished project\!

7. **发言者 1**（回复第 6 条）：Well thank you. I appreciate your advice. Often it is for validation, like asking a good friend to check it out\!

8. **发言者 2**（回复第 7 条）：Absolutely. We’re always happy to take a look. Have fun with these very pretty mitts.

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Google search hides Nvidia stock graph  
     
   As the title says, this might be region-specific, EU here, searching any form of:  
   - NVDA stock  
   - $NVDA stock price  
   - NVIDIA stockDoesn’t show the graph module. Any other company works fine.

2. **发言者 2**（回复第 1 条）：Works fine for me just googling “nvda” in the US.

3. **发言者 3**（回复第 1 条）：Works fine in Sweden.

4. **发言者 4**（回复第 1 条）：Google stock is also hidden

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Fumlo: Troll Platformer – my Godot 4 3D platformer is out on Google Play \(LAN multiplayer, free first world\)  
     
   Hi everyone\! Fumlo is out on Google Play. It’s a short-level 3D platformer with hidden \(but fair\) traps, for 1–4 players.  
     
   \[图片省略\]  
     
   A few things that might be interesting for other Godot devs:  
     
   Mobile renderer on every target, one graphics configuration for phone and PC  
     
   LAN multiplayer: every device simulates its own Fumlo and reports its state and triggered traps; the host is the referee for trap state, pause, level choice and results  
     
   Levels are authored as gameplay footprints and heights; the environment \(terrain, grass, water, rocks\) is derived from that data and baked  
     
   One-time unlock via the Google Play Billing plugin; the whole first world is free, also in multiplayer  
     
   Happy to answer questions about any of it, and I’d love feedback on how it plays.  
     
   Google Play: \[链接隐去\]

### 讨论 41

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Message transfer from UNO R4 to UNO Q over the home WiFi network  
     
   I want to send the message "Hello" at a 1-second interval from the UNO R4 to the UNO Q using their Wi-Fi networks and my home router. I have tried various codes supplied by AI that compile and run successfully, but no message appears on the Python Monitor of the Linux MPU. Both Arduino gets connected  well with my home router without problem.  
     
   I would be glad if someone could post a working sketch for the UNO R4 and a script for the UNO Q.

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Don't bother patching: multiple remote code execution vulnerabilities in Danfoss AK-SM800A

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Control NDX. Tidal  
     
   Hi  
     
   Do I need a legacy app or will the current update to date app on Google control tidal lossless  
     
   My dealership is unsure but is willing to sell me a ndx 2 though

2. **发言者 2**（回复第 1 条）：The NDX will play the built-in Tidal but not Tidal Connect. The current app will control it. There is no ‘legacy’ App for streamers.

3. **发言者 1**（回复第 2 条）：That’s what I needed thanks  
     
   M

4. **发言者 3**（回复第 3 条）：I think you need to use the Naim app to play Tidal with the NDX \(latest firmware\) whereas with the NDX2 you can use the Tidal app because it supports Tidal connect.

5. **发言者 1**（引用未收录发言）：Hi  
     
   Yes I was and still considering the ndx2 it’s just the vast price difference makes the original a little appealing.  
     
   But I don’t like problem or workarounds so I’m going to dem the 2 and an original so I’ve got a few hundred miles in the next week lol

6. **发言者 4**（回复第 5 条）：The Mk1 is cheap for a reason\! If you understand its limitations and can live with them, it’s a possibility, but if service and parts availability prevent a repair it may seem like false economy. If this is a long term purchase, I would go for an NDX2, or even an ND5XS2 at a lower price.

7. **发言者 1**（回复第 6 条）：Yes the nd5xs with a white light would fit my CB setup nicely  
     
   But they have discontinued it

8. **发言者 4**（回复第 7 条）：Presumably you mean ND5XS2? Yes, it’s discontinued, as is the NDX2, although it’s not impossible that a dealer may have some old or ex-demo stock available.

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[公告\] 十一月份置底檢舉區  
     
   此篇十一月份置底檢舉區  
     
   請各位板友附上欲檢舉文章之  
     
   1.【文章代碼】  
   2.【被檢舉人的ID】  
   3.【違反板規編號】  
   4.【違規行為描述】  
     
   若不知道怎麼查詢文章代碼  
     
   請於欲檢舉文章的頁面按大寫Q  
     
   於置底檢舉區發表非檢舉推文者  
     
   板主得逕行刪除  
     
   另外：  
     
   1.如無特殊情形，不另行推文與發文說明  
   2.若無被禁言，請善用檢舉區  
     
   感謝大家\!\!

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：darktable lua-scripts Export to Fediverse Vernissage  
     
   Hello everyone,  
     
   First of all to me: I am not a developer.  
     
   I have created a Lua script for my own needs, which can export to the image platform Vernissage via its API.  
     
   I have recently had this revised with the support of the AI Mistral Vibe and had it brought into a “reasonable structure” with comments.  
     
   The application is arguably quite special because there aren’t that many vernissage users \(shame\).  
     
   Is there any place where you put such exotic LUA scripts, and where you could load it up if necessary?  
     
   vernissage\_darktable.zip \(13.8 KB\)

2. **发言者 2**（回复第 1 条）：The easiest way: you could zip it and upload to OP.

3. **发言者 1**（回复第 2 条）：Sorry, I’m already overwhelmed with the “upload to OP” instruction.  
     
   Where and to whom?

4. **发言者 2**（回复第 3 条）：original post in this thread; edit it and upload your script

5. **发言者 1**（引用未收录发言）：By the way, the script is only tested under Linux and the blurhash binary is compiled there.

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Sashiko coaster set take 2  
     
   I’m learning\! I think this coaster set came out better than the first one.  
     
   \[图片省略\]10000127381920×1618 1.02 MB  
     
   These are backed with black linen. No top stitch, but hand sewn closure after the turn.  
     
   Now, if only I had any need for coasters.

2. **发言者 2**（回复第 1 条）：You had fun making these\!  
     
   Thank you for sharing  
     
   They’re lovely  
     
   I see a small white statue sitting on one  
     
   What’s the name for a pocket of scent in your dresser?  
     
   well done you

3. **发言者 1**（回复第 2 条）：Thanks\! They were really fun. I imagine they’ll go to someone as a holiday gift.

4. **发言者 3**（回复第 2 条）：Oh, maybe a drawer sachet?  
     
   That’s a cool idea\!  
     
   And 发言者 1, your stitching is lovely\!

5. **发言者 4**（回复第 1 条）：ooh, yes, these are even better than the last set\! :grin:

6. **发言者 5**（回复第 1 条）：So nice. I love the patterns. You have a great gift there for someone.

7. **发言者 6**（回复第 1 条）：Really nice\! I don’t think you have to have a use for everything. You could clip them all together and make sort of a stitchbook for reference on future projects. And, you practiced and learned a nice skill. Well done. Hope you make other things with your lovely stitching\!

8. **发言者 1**（回复第 7 条）：Thanks, they were fun. My ongoing challenge is what to do with stuff I make to get it gone from my house. :laughing:

9. **发言者 7**（回复第 1 条）：So pretty\! Envious of how you got those stitches so even\!

10. **发言者 1**（回复第 9 条）：I make a grid first with one of those heat-erase pens. Otherwise I wouldn’t have a hope\!

11. **发言者 7**（回复第 10 条）：Hey, if it works, it works\! I would do the same thing.

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Black Friday / Cyber Monday  
     
   Hello,  
     
   Will there be a promo this year?  
     
   Thanks

2. **发言者 2**（回复第 1 条）：i would love to know too. I want to get lifetime if possible, but…  
     
   \[图片省略\]  
   Screenshot\_20261113-155612\_Firefox1200×431 274 KB  
     
   yeah.

3. **发言者 3**（回复第 1 条）：There is usual a sale at then end of December each year where 某社区 lifetime goes from 150 to 120$ when you purchase it on the website.  
     
   I think that’s the only one they have.

4. **发言者 4**（回复第 1 条）：There will be the usual BunsGiving this year :tada:

5. **发言者 5**（回复第 4 条）：For those considering lifetime, will the discounted price be prorated based on how much time we have left on our membership?

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How do I communicate with my Autoload scenes/scripts?  
     
   Godot Version  
   4.7.2.stable  
     
   Question  
   \[图片省略\]Screenshot202611140412371582×1079 138 KB  
     
   \[图片省略\]image325×627 27.3 KB  
     
   Hiii, so, I added an audio manager I seen from this video, all I wanna know is how do I go about getting a reference to the Autoloaded scenes there so i can modify things on it\(music and volume\)  
     
   \(Idk yet if my GameManager should also be on Autoload, next step for me is I need to learn where to store setting variables to make sure they are the same in all scenes  
     
   still figuring that out ;p\)

<!-- samples:end -->

