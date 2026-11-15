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

<!-- intake-request:intake-c54e63edd85d408d8544086b41bdcde3 -->
<!-- samples:start -->

采集时间：2026-11-16 04:00:06（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Wedge pillowcase  
     
   My son has had really bad reflux for years. Recently I bought him a wedge pillow to sleep on, it seems to help. The only trouble is, it didn’t come with a pillowcase. Pillcases are advisable in our house, for both hygiene and comfort, so I decided to make one. The pillow is in multiple sections, with Velcro on the sides to hold them together, so the pillow cases needed to be tubes to leave the sides open. For the neck pillow, I just sewed a tube and slid it in. For the wedge itself, I made it snap shut so that it can come off easily for washing, and be adjusted if needed. I used a washable water resistant fabric with a suede finish. It’s super soft,  and my son loves the ghost print.  
     
   \[图片省略\]IMG\_20261111\_1530342571920×2560 1.15 MB  
     
   \[图片省略\]IMG\_20261111\_15\[数字标识隐去\]×1440 743 KB  
     
   \[图片省略\]IMG\_20261111\_15\[数字标识隐去\]×2560 1.17 MB

2. **发言者 2**（回复第 1 条）：I wonder why odd shape pillows rarely come with pillowcases\!  
     
   Problem solved when you can sew\! Nice job\!

3. **发言者 1**（回复第 2 条）：I know\! Odd pillows and weighted blankets should really come with cases included.

4. **发言者 3**（回复第 1 条）：Cute solve\!

5. **发言者 4**（回复第 1 条）：Excellent solution\!

### 讨论 2

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

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\( ﾟᯅ 。\)原来世界上真的有“生理性别为女、社会身份和自我认同为男、同时还是异性恋”的人

2. **发言者 1**：首先故事都是我编的，不对任何可能的事实和真实性负责  
     
   听个乐就好\(　ﾟ 3ﾟ\)

3. **发言者 1**：事情要从我的一个女性朋友谈了一个大她十六岁的对象开始\(｀･ω･\)

4. **发言者 2**：什么一听可乐

5. **发言者 3**：这异性恋喜欢的到底是男人还是女人

6. **发言者 1**：据朋友自述，这个对象在她高中时期是她的数学家教，在她毕业之前，一切正常  
     
   这个人在当时只是在正常的教学，并没有其他的行为\(　ﾟ 3ﾟ\)  
     
   直到毕业之后

7. **发言者 1**（回复第 5 条）：\[引用第 5 条\]  
     
   这个异性恋的对象是女人  
     
   或者说是社会身份为女性的人  
     
   听完这事之后我完全拿不准这人的取向\( ﾟ∀。\)  
     
   总之叙述会比较混乱，还请见谅

8. **发言者 1**（回复第 6 条）：\[引用第 6 条\]  
     
   在毕业之后，朋友觉得这人教过她也算是个老师，于是就决定找这个人吃顿饭感谢一下  
     
   中间过程我没听全  
     
   总之这顿饭的结果是这个人把我的这个朋友认作了妹妹\( ﾟ∀。\)

9. **发言者 1**：我不是对忘年交有什么刻板印象奥  
     
   但是一个在社会认同上马上奔四，外在还是一个成年男性的人，把一个小自己十六岁，刚刚高中毕业的女性认作自己的妹妹  
     
   这是否有些怪呢\( ﾟ∀。\)

10. **发言者 1**：当然，没过俩月  
     
   俩人就这么处上了  
     
   \( ﾟ∀。\)我真的怀疑这个朋友是不是有什么恋老癖

11. **发言者 1**：当然，我相信一段真挚的感情是可以跨越时间和年龄的鸿沟的  
     
   可惜这个人好像并不那么真挚

### 讨论 4

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Les p'tits jeux solo de TechDweeb  
     
   Article publié sur : Les p'tits jeux solo de TechDweeb - 某社区.fr  
   Dans ma quête de RPG solitaires \(dont je vous parlais déjà ici\), je suis tombé sur un petit gars plutôt sympathique et débordant d’idées, l’ami TechDweeb, créateur de quelques petits jeux solo minimalistes qui méritent le coup d’œil. « Je n’ai pas de taf, je vis chez ma maman, je fais des vidéos 某社区, et mon chat me déteste ». C’est en…

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Light Metal: Custom Skin for darktable 5.6.2  
     
   Light Metal is a medium-gray theme that serves as an alternative to darktable-icons-grey, striking a balance between neutrality and visual comfort.  
     
   Screenshots:  
     
   \[图片省略\]Captura 2026-11-15\_2\_022560×1440 1.95 MB  
     
   \[图片省略\]Captura 2026-11-15\_12560×1440 2.36 MB  
     
   It took me weeks to get to this point \(of learning and enjoyment\), since it was done the old-fashioned way: typing, testing, and restarting. It may still require some tweaking.  
     
   AI was only used to assist with image generation and to check for typos.  
     
   Together with Dark Metal, they now form the Metal\_Pack \[GitHub repository\].  
     
   If you’d like to try it out and provide feedback, it would be greatly appreciated.  
     
   Please use the thread specific to the topic in question \(  
     
   Light Metal / Dark Metal\)  
     
   Thank you.

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：ESP32 \+ SPI Display  
     
   Hello, I am having issues connecting my SPI display. Display Module, 3.5 inch TFT LCD Screen Module for Arduino MEGA 2560 Board 480x320\(with Touch Panel\) : Amazon.ca: Industrial &amp; Scientific  
     
   That is the one I purchased. I am wondering if i am doing something incorrectly. I have not used ESP32's before so this is my first try\! Is someone able to point me in the correct direction for instructions? I have tried putting color on the display but it always stays white no matter what. Thank you

2. **发言者 2**（回复第 1 条）：Hi, can you make a wiring diagram of how you have the display connected to your ESP32?

3. **发言者 2**（引用未收录发言）：There might be further documentation in the TFT\_eSPI library that can help you.  
     
   Can you also post any code you have tried?

4. **发言者 2**（引用未收录发言）：Can you also post the user\_setup.h file from the TFT\_eSPI library?

5. **发言者 2**（引用未收录发言）：There is a section you might want to use.  
     
   \[图片省略\]IMG\_66141242×2688 339 KB

6. **发言者 1**（回复第 5 条）：Ill try that, thank you

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：有在用的老师提供一些经验分享吗？  
   只自己工作室内部使用。

2. **发言者 2**：容易炸车

3. **发言者 3**：哪里有卖，为啥不用中专站

4. **发言者 4**：等个车

5. **发言者 5**：\[链接隐去\]    这个是国庆的时候我自己订阅的账号被封，找到的方案，我是个人席位，使用到现在很稳，期间官方送的重置直接用也没影响。而且我看网站解答中说个人席位被封, 保 3 次换号（ 整个 Team 被官方停用不在保障范围内。）。  
     
   \[图片省略\]

6. **发言者 1**：发言者 3 中转站容易掺水耽误工作啊

7. **发言者 6**：Team 如果被端，就一锅端了吧？车头车厢全炸，自己开吧

8. **发言者 7**：\[链接隐去\] 独享号，可多人共享一个独享号

9. **发言者 8**：发言者 6 不会我同事的经常封

10. **发言者 9**：我可以帮开, 6.25x \+ 500r 一个月. 目前只开了 3 个席位

11. **发言者 10**：发言者 5   
     
   这家涨价了  
     
   价格：1100\(最开始的价格，不确定是不是这个\) --&gt; 1500 --&gt; 1700

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Wooden Crate  
     
   \(topic deleted by author\)

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Debbie Bliss Sweater With Ribbed Yoke  
     
   Good Morning,  发言者 1 here. I am a beginner/intermediate knitter and i cannot wrap my brain around how this collar works. Can anyone help me please?  Thank you\!  
     
   \[图片省略\]10000307921920×2560 759 KB  
     
    hopefully the upload worked.

2. **发言者 1**（回复第 1 条）：Thank you so much. I just needed the back and forth, with tappered on either side directions. Youve been a great help. Time to rip it out now\!\!  Thanks again\!\!

3. **发言者 2**（回复第 2 条）：You’re at the last bit now, almost finished\! Enjoy finishing this adorable sweater.

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Do you think everyone is going too far with Jensen Huang?

2. **发言者 2**（回复第 1 条）：I think we’re at the beginning of a super cycle of reporting, not at the end.  The board obviously felt they had to move quickly, and that feels jarring when we know relatively little, but this story will continue for months.

3. **发言者 3**（回复第 1 条）：pitchforks come out in a second these days. and people repeat what they hear, without anyone verifying anything.guilty or not, if the mob comes for you....

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Quad’s latest  
     
   For those hankering after a 21st century Naim shoebox retrospective…..  
     
   \[图片省略\]IMG\_0668820×547 396 KB  
     
   Looks really, really cool……:smiling\_face\_with\_sunglasses:  
     
   ATB, J

2. **发言者 2**（回复第 1 条）：Sorry, no. 33, 303 meets Tandys.

3. **发言者 1**（回复第 2 条）：Now that’s a while ago……. But it’ll strike a chord with many, IAG’s marketing snipers tend not to miss :smirking\_face:.  
     
   ATB, J

4. **发言者 2**（回复第 3 条）：Hi J,  
     
   They have kept the form, they have kept the font, I suppose they had to do something. But they have messed with an all time classic piece of industrial design.  
     
   Does it matter? No. I’d be surprised if today’s buyers know much of Quad’s back story and ESLs.  
     
   Best,  
     
   C.

5. **发言者 3**（回复第 1 条）：Friend sent his Nagra in for a 2nd repair, decided to buy the Western Electric 300B amp. In the meantime thought the Quad would be a good interim. It was not. In the flesh they don’t appear well finished and the sound didn’t fall into the “surprisingly good for the money” category. Good to see them back but I don’t think they’re doing themselves justice at present.

6. **发言者 1**（回复第 5 条）：Indeed, but of course price is everything, otherwise why introduce the Platina range?  
     
   And we all know there’s no such thing as Unicorns :joy::joy:.  
     
   ATB, J

7. **发言者 4**（回复第 1 条）：At first I thought this must be AI.

8. **发言者 5**（回复第 1 条）：It’s probably my bizarre taste but I like the new Quad look\!

9. **发言者 6**（回复第 1 条）：Maybe they’re hoping to pick up some disgruntled Naim owners who prefer green to white…  
     
   and green is one colour you can say without being accused by somebody of being a racist\!

10. **发言者 4**（回复第 8 条）：\[图片省略\] 发言者 5:  
     
   I like the new Quad look\!  
     
   They obviously have a “new look” twice a’year.  
     
   Once Quad was iconic British Brand,  it still is but fully made in China with possible the same electronic as their other brands have, no thanks.

11. **发言者 7**（回复第 1 条）：Reminds me of Lego. :rofl:

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Aggiungere a 60 parcheggi a pagamento già presenti in OSM i tag oggi mancanti  
     
   Parcheggi gestiti da FS Park, APCOA e ViaMilano Parking \(aeroporti di Milano e Bergamo\) - sparsi in tutta Italia.  
     
   Fonte: le pagine ufficiali dei singoli parcheggi sui siti dei gestori \(fspark.it, apcoa.it, \[链接隐去\] Ogni changeset riporta nel tag source il link alla pagina usata.  
     
   Regole che il programma rispetta:  
     
   aggiungo un tag solo se manca e non modifica mai un valore già presente  
     
   prima di ogni invio rilegge l’elemento e, se qualcuno l’ha modificato dopo il mio controllo, lo salto;  
     
   un parcheggio per changeset, uno ogni 15 minuti, con automatic=yes e un commento che descrive la modifica;  
     
   ho controllato a mano l’elenco completo “prima/dopo” prima di avviarlo.  
     
   La domanda principale riguarda la licenza: secondo voi è accettabile copiare posti e orari dal sito del gestore del parcheggio stesso, o bisognerebbe chiedere un permesso scritto? Se la comunità preferisce, posso limitarmi a opening\_hours e parking.  
     
   Grazie,  
     
   Paolo

2. **发言者 1**（引用未收录发言）：Il meccanismo è uno script sul mio computer che simula l’invio a mano, intendi questo?  
     
   grazie  
     
   ciao  
     
   paolo

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How to make your own deck  
     
   Hi everyone\! :relaxed: I’m new to 某社区 and I’m loving it so far, but despite all my best efforts, I can’t seem to figure out how to make my own personal deck. Is that a feature that’s only available when you purchase a subscription? Sorry for the silly question :sweat\_smile:

2. **发言者 2**（回复第 1 条）：Hi there and welcome to the forums\! :wave:  
     
   I’ve tried creating a Deck without a sub and it works \(editing, adding cards etc.\).  
     
   What is the name/description you’re trying to use for the Deck?  
     
   DM me if you’re not comfortable sharing it here.  
     
   I have a feeling it may be something weird like a false-positive profanity check or something dumb like that

3. **发言者 2**（回复第 2 条）：Ah, I just realized you might be asking how to do it?  
     
   If you go to the My Decks page, there will be a section called Custom Decks.  
     
   You can access Decks \(My Decks\) from this Content dropdown  
     
   \[图片省略\]  
   Screenshot 2026-11-15 at 13.52.16786×764 59.2 KB  
     
   o

4. **发言者 1**（回复第 3 条）：Hi 发言者 2\! Yes that’s exactly what I was looking for, my b for not being clear :bowing\_woman: Thanks for your help\! :relaxed:

### 讨论 14

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

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Anthropomorphic Software

2. **发言者 2**（回复第 1 条）：&gt; If you are aware of any more examples, I would be glad to list them here.  
     
   Years ago while skimming dmesg, I chanced on:  
     
   \`\`\`  
   Dazed and confused, but trying to continue  
   \`\`\`  
     
   I have no memory of what I was trying to debug that day, but I think about that message often.  
     
   "Mood", I suppose.  Hang in there Tux 🫂

3. **发言者 3**（回复第 1 条）：&gt; LLM agents are the ultimate version of anthropomorphic software. But agents do not have to sound human. I force my agents to not speak like humans for my own sanity.  
     
   What's the prompt/skill for that?

4. **发言者 4**（引用未收录发言）：Perhaps "conversational software" would be a better term, then?

5. **发言者 5**（引用未收录发言）：Indeed, I think there should be regulation prohibiting any automated agent from pretending to be a human.

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Mi \(18.11.\) GTA 6- Releaseabend: Wir wollen eure Bingo-Vorschläge  
     
   \[图片省略\]73742000×1500 281 KB  
     
   Hallo ihr Lieben\! Wir sind tuuuurbo gehyped auf GTA 6 und deshalb steht der ganze Mittwoch im Stern des GTA-6-Countdowns\! Am Releaseabend \(Mi. 20 bis Do. 03:30 Uhr \), mit Ede, Nils Valle, Tim und meiner Wenigkeit, wollen wir gerne ein großes „Was erleben wir wohl gleich in GTA 6“-Bingofeld mit euren Vorschlägen befüllen. Wenn wir dann ab 0 Uhr mit noch mehr Bohnen das Game anzocken, könnt ihr fleißig abstreichen.  
     
   Aaaalso brauchen wir dafür eure Vorschläge\! Was sehen und erleben wir wohl alles in Vice City? Besoffene, die in eine Gasse kotzen? Leute, die sich vor einer Bar prügeln? Schreibts uns\! :two\_hearts:

2. **发言者 2**（回复第 1 条）：Im Radio, auf einer Werbefläche oder sonst wo sieht man eine MAGA-Referenz :billed\_cap:

3. **发言者 3**（回复第 1 条）：frei herumlaufende alligatoren

4. **发言者 4**（回复第 1 条）：Wasted\!

5. **发言者 5**（回复第 1 条）：Mehr als 5\(?\)s Airtime mit einem Auto.  
     
   Edit:  
     
   Moment, nicht wie bei Bingo Battle?

6. **发言者 6**（回复第 1 条）：Hund kackt  
     
   Feuerwehr fährt mit Blaulicht  
     
   NPC machen Unfall  
     
   Hubschrauber fliegt vorbei

7. **发言者 7**（回复第 1 条）：6 7  
     
   Maga Parodie  
     
   Mamdamu oder ein andere Demokratisch erfolgreiche Person  
     
   Elon Musk Parodie  
     
   Trump Parodie  
     
   Alte Charactere aus GTA Vice City  
     
   Lowrider

8. **发言者 8**（回复第 1 条）：Lazlow sehen oder hören  
     
   Easter Egg zu anderen Games gefunden  
     
   NPC wird von Tier gefressen

9. **发言者 9**（回复第 1 条）：jemand ruft an und möchte bowlen  
     
   Tommy Vercetti taucht auf  
     
   ferngesteuerter Helikopter Minispiel

10. **发言者 10**（回复第 1 条）：Einen Hinweis auf Saint Denis finden.  
     
   Hinweise auf Arthur finden.

11. **发言者 2**（回复第 1 条）：Florida Man wird erwähnt :beansmirk:

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Change Custom Mouse  
     
   Godot Version  
   4.6.3  
     
   Question  
   Im Trying to make the player´s cursor to change when you press a key, but for some reason it isn´t working, i tested it without the if conditional and it worked perfectly, idk what the problem is  
     
   extends Node2D  
   var fork = preload\("\[链接隐去\]  
   var control: float = 1  
     
   func \_ready\(\):  
   	if Input.is\_action\_just\_pressed\("change\_hand"\):  
   		Input.set\_custom\_mouse\_cursor\(fork, Input.CURSOR\_ARROW\)

2. **发言者 1**（引用未收录发言）：Thank you for you answer, it worked perfectly after i replaced the \_ready func for a \_unhandled\_input func, thanks a lot :slight\_smile:

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：30块钱6斤蛋挞，我看看是怎么个事\(つд⊂\)

2. **发言者 2**：jmjp

3. **发言者 3**：jmjp

4. **发言者 4**：看样子怎么好像是蛋挞皮边角料的样子\(\*ﾟーﾟ\)  
     
   po要不要翻翻评价看看，因为小肥我就曾经没仔细看所以买到了八块钱的车厘子树苗

5. **发言者 5**（回复第 4 条）：\[引用第 4 条\]  
     
   最后怎么处理的\( ﾟ∀。\)

6. **发言者 1**（回复第 4 条）：\[引用第 4 条\]  
     
   没评论，因为就上了几件，现在卖完了\( ﾟ∀。\)

7. **发言者 6**：jmjp

8. **发言者 7**（回复第 4 条）：\[引用第 4 条\]  
     
   脑海中出现一幅大馋猪收到一个大包裹打开一看是雷霆大树苗的画面，笑死了\(\`ヮ´ \)

9. **发言者 4**（回复第 8 条）：\[引用第 8 条\]  
     
   别笑我了！\( \`д´\)  
     
   我早该警惕的，哪有这么便宜的车厘子呢\( ´ー\`\)雷霆树苗宿舍没地方种又不能一直扔阳台，双休日给奶奶带回去了，据说全种死了

10. **发言者 8**：快速等待\( \`\_っ´\)

### 讨论 19

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

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Replace skull icon in lighttable  
     
   Maybe most people keep photos always inside the same folder, I don’t.  
     
   So I see the skull icon for missing files on the lighttable very often.  
     
   To see this icon is awful and I’m talking only about this particular icon, not the whole app, if somebody feels bad because of my comment or this post.  
     
   Developers can add these “easter eggs” at Easter if users agree to this joke.  
     
   But please keep DT clean and nice, I don’t wanna see kids toy pixel skulls as icon replacement for something so common as a missing file.  
     
   Please allow users to replace this icon with a SVG or PNG we choose, if you don’t want to remove it \(Would be really a big loss, I know\). But this icon is taste and it isn’t my taste for a simple, missing file.

2. **发言者 2**（回复第 1 条）：Something like the broken-image icon would be easier on the eye, and possibly more meaningful.

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Philips CD-i Joystick Controller  
     
   I wanted to play a game I got on my Philips CD-i but the game required a controller with a joystick and not a regular Dpad. Well I don't own the bigger CD-i console that comes with the wireless controller so... I made my own.  
     
   Attached is code to run a diagnostic, just to make sure the signals are correct. \(It makes the cursor on screen drift to the right\) And the other is the controller code itself.  
     
   I will also be making a wireless version too using a couple of XIAO ESP32-C6 modules.  
     
   By the way, the game I wanted to play that requires a joystick is Super Mario's Wacky Worlds prototype. Link Here: \[链接隐去\]  
     
   \[图片省略\]IMG\_66051920×2560 983 KB  
     
   \[图片省略\]IMG\_66041920×2560 884 KB  
     
   CD-I Controller 2.zip \(2.1 MB\)  
     
   Included a text file with my references and a basic schematic

2. **发言者 2**（回复第 1 条）：Please post links to datasheets and technical manuals, and schematics.

3. **发言者 3**（回复第 1 条）：You don't seem to have any doubt... Wouldn't be the case to move your post to Projects/Showcase?

4. **发言者 1**（回复第 2 条）：Updated

5. **发言者 2**（回复第 4 条）：Please read reply \#2 again.

6. **发言者 1**（回复第 1 条）：Here is what I used.  
     
   \[图片省略\]IMG\_66131920×1440 292 KB  
     
       
     
         \[链接隐去\]  
       
     
       
         
     
   The CD-i controller interface – The World of CD-i  
     
       
     
       
         
         
       
     
       
     
   TwBurn Library: GitHub - TwBurn/cdi-controller-library: Arduino Library for CD-i controllers · GitHub  
     
   CD-i male connector: Philips 22ER9021 CD-i Gamepad Repair - retrostuff

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：前几天蹭了一下所属大部门 VP 的饭，旁敲侧击的问了一下今年度企业接入 AI 带来的额外成本  
     
   我们公司在接入 AI 上起步算是比较晚的，今年 2 月伴随着 Opus4.6 的发布才开始大规模采购基于 AWS 分销的 Claude API，之后更进一步采购了外界的 Gateway 服务从而实现了几乎所有的模型供应商的模型覆盖  
     
   员工采取每月限额的方式来限制，截止到目前整体的大模型调用支出已经占据了部门往年总工资支出的 20%，估计一整个自然年的话应该能到 30%朝上。  
     
   公司的年度盈利并没有变好，甚至有变差的趋势，估摸着这份支出最后还是会回到打工人自己头上。明年应该是砍额度\+裁员，按照比例的话估计要裁 20%\+，瑟瑟发抖中。。。

2. **发言者 2**：看着就有点儿焦虑了

3. **发言者 3**：大半年体会下来  
   个人感觉还是对移动端，前端开发影响最大  
   减少 95%开发人力，叠加经济下行

4. **发言者 4**：AI 时代，大家的武器都升级了，相当于都没升级。待遇相比于我司还是好的，我司不仅零 AI 补贴，实习都变成了“付费上班”。更离谱的是，一边理所当然地按 AI 时代的标准要求实习生 5 倍产出、拉高交付门槛，一边连一分钱的 Token 都不肯报销。

5. **发言者 5**：自己革自己的命  
     
   营收基本不增反减, 效率反而提升\( 带来的正反结果都有\),但效率肯定是提升了, 那么不裁员 不换血干嘛  
     
   ai 阅读理解代码的能力,让老员工存在的必要性直接减到 0, 以前还要传帮带,现在有些代码连老员工都解释不清,ai 几分钟就给你分析的明明白白  
     
   所以, 自己搞死自己, 就是以前蒸汽机时代, 工人都不是被自己搞死的

6. **发言者 6**：没有 ai 结果是一样的，商机/签约/回款每个统计指标都很差  
     
   已经打算再砍 30%了，剩下的人结合 ai 提效不影响正常业务，才是收益

7. **发言者 7**：国外有公司已经采取本地部署开源模型，只有在开源模型解决不了时才调用闭源 api

8. **发言者 8**：总工资 20% 有点夸张了，等于是你们 hc 成本凭空扩张了这么多。

9. **发言者 9**：牛逼

10. **发言者 10**：发言者 4 总结一下😢  
    \[链接隐去\]

11. **发言者 11**：变革期，  
   工业革命也是大幅降低生产成本，造成分配不均，引发了周期性的经济危机，随后才推出社会保障、失业保险、最低工资和最高工时、让人无后顾之忧，去消费。  
   降低成本总有个度。

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Perfectclone – Yoink the source code of any website, not an AI clone

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Spotify connect “no longer works”  
     
   My fiancée this morning tried to stream to the SuperUniti from Spotify Connect on iOS and saw the message “no longer works with Spotify”.  
     
   Mine seems to be working, although the App Store shows an app update available for Spotify.  
     
   Has anyone else seen this?  And could someone from Naim confirm is it the case that the old streamers now don’t work with Spotify Connect anymore?  
     
   Edit: the SU is running the latest firmware with the new Naim radio.

### 讨论 25

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Let's Employ

2. **发言者 2**（回复第 1 条）：A "modern" job posting tech that doesn't have an explicit identifier for remote work?

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Advent of Tess  
     
   Does anyone here do this kind of paper folding? Have you participated in previous years of Advent of Tess? I am thinking about taking on the challenge\!

2. **发言者 2**（回复第 1 条）：Those look amazing. But also like I might pull my hair out trying to make them. What a cool Advent though\! If you participate I hope you’ll share the results with us\!

3. **发言者 1**（回复第 2 条）：Thanks for the encouragement.  
     
   This combines things I enjoy \(math/geometry \+ art/tesselations\) and origami \(which I enjoy but sometimes lack the precision needed\) so, hmmm . . .  
     
   Also, should I take on another project . . . ?  
     
   :thinking:

4. **发言者 2**（回复第 3 条）：Find a free tutorial and try one. If you like it, then why not. If it’s too frustrating there are a million other ways to bring your love of tessalations/geometry and origami together.  
     
   I’m an enabler. :joy:

### 讨论 27

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How to Make Particles Moving along a Path?  
     
   Godot Version  
   4.2.1  
     
   Question  
   Hi Everyone  
     
   How to make particles moving along a path in Godot, like the example below?  
     
   Unity Surge plugin - Wrangling a particle system  
     
   \[图片省略\]image1920×1092 168 KB

2. **发言者 1**（引用未收录发言）：Wow, that sounds complicated. I think Unity and Unreal possess the directable particles with splines feature since ten years ago…  
     
   Is there no Godot plugin for moving particles along a path? How can Godot developers build dynamic particle effects that run through bezier curves?

3. **发言者 2**（引用未收录发言）：Can you show a visual mockup of the effect, with the actual pipe paths?

4. **发言者 1**（回复第 3 条）：It’s similar to these:  
     
   Particles through Pipe  
     
   Water through Pipes

5. **发言者 2**（回复第 1 条）：And here it is combined with built in particle process shader:

6. **发言者 1**（引用未收录发言）：Thank you\! It looks exactly like the Unity Surge plugin. Unfortunately, I can’t see anything when I play the engine, maybe because I’m a total noob in Godot. Here’s my project, made with Godot v4.7.2:  
     
   Project  
     
   Or could you please share your project?

7. **发言者 2**（回复第 6 条）：Make sure to:  
     
   Assign the script to the particles node  
     
   Assign the path node to the path property of the particle node  
     
   Draw an actual curve for the path node.

8. **发言者 1**（回复第 7 条）：Thanks again\! It works

9. **发言者 1**（回复第 7 条）：Hey 发言者 2 , if I delete the Curve3D of the Path3D and create a new curve, the particles still follow the deleted curve. Is there an easy way to make the particles follow the new curve?

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：好想被榨精\(つд⊂\)

2. **发言者 2**：把出题的抓过来代替我被榨\(\`ゥ´ \)我负责把这份录像复制数十亿份卖给全世界

3. **发言者 3**：1如果改成巨乳就选  
     
   2大妈味太重了犹豫要不要选  
     
   3必选  
     
   4可以选但是要换成那件黑丝警察服  
     
   5不选  
     
   6纯当妈子还行，瑟瑟就免了  
     
   7也行但也是换身衣服不喜欢皮衣  
     
   89不选

4. **发言者 3**（回复第 3 条）：\[引用第 3 条\]  
     
   啊只能选三个吗？能不能先跟她们说好只要把那几个小的赶出去剩下的可以一起来

5. **发言者 4**：选选选

6. **发言者 5**：选了你给我吗

7. **发言者 6**：先把蘑菇打一顿没有异议吧

8. **发言者 7**（引用未收录发言）：\[引用未收录发言\]  
     
   对不起，我看错了，4不是巴格斯特

9. **发言者 7**：说到底亚瑟王的胸虽然大但怎么会这么大啊，男性

10. **发言者 8**（引用未收录发言）：\[引用未收录发言\]  
     
   发言和饼干最匹配的一次\( ﾟ∀。\)

11. **发言者 9**：骗你的，选完三个也是一样榨

### 讨论 29

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How to optimise a picture that is dark in one part and too light in the other part?  
     
   Hello,  
     
   How do you go about optimising a photograph that is too dark in one area \(shadows\) and bright or too bright in another due to the bright sunshine –  
     
   or like this one of the cathedral of Palermo, Sicily, where the foreground is more or less correct and the background too light?  
     
   Which functions does one use for that?  
     
   Kind regards  
     
   发言者 1  
     
   \_1330467.RW2 \(20.9 MB\)

2. **发言者 2**（回复第 1 条）：Tools on the first tab \(Exposure\):  
     
   Shadows/Highlights  
     
   Tone Equalizer  
     
   Dynamic Range Compression

3. **发言者 3**（回复第 1 条）：since there is no licence for a playraw, i just upload the pp3. You can apply this file to you picture \(open folder top right\) and inspect the tools i used.  
     
   \_1330467.RW2.jpg.out.pp3 \(17,2 KB\)

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：MP3 or WAV in onboard memory  
     
   I am trying to understand how to store and call up a small MP3 \(52K\) or WAV \(138K\) file up for my thunderstorm sketch. Any help or suggestions would be helpful.

2. **发言者 2**（回复第 1 条）：You can try looking here: GitHub - pschatzmann/arduino-audio-tools: Audio Tools \(a powerful Audio library for Microcontrollers and the Desktop\) · GitHub .

3. **发言者 3**（回复第 1 条）：What board are you trying to store those files on.

4. **发言者 1**（回复第 1 条）：Arduino R4 But I can use an Arduino Nano ESP32 or an Arduino R3 if those will work better.  
     
   I have considered getting an ArduinoQ to try it if the others will not work.

5. **发言者 4**（回复第 4 条）：You can use SPIFFS or there are online sites that will convert an audio file into a C array.

6. **发言者 5**（回复第 4 条）：All those boards will work.

7. **发言者 5**（回复第 1 条）：What do you want to store the file on, SD/TF card or local RAM/Flash or even better FRAM.

8. **发言者 1**（回复第 1 条）：Local ram, I can get a FRAM module if that would work better. I have tried 2 different SD/TF readers and neither can see the SD card. I decided to try to add it local in order to resolve issue.  
     
   Update: I ordered a FRAM module and will try that once I figure out how to put the file on it and call it up.

9. **发言者 5**（回复第 8 条）：As a professional programmer for over half a century and as an employer of professional programmers, the comment that you couldn't get the SD/TF to work is not acceptable. Why did you not use the forum to help you to get it to work?  
     
   In any case, the FRAM is better all around, what size did you get?

10. **发言者 3**（回复第 1 条）：How are you planning to play that WAV file.  
     
   An R4 Minima does not have an I2S sound output.  
     
   A basic ESP32 has I2S and plenty of internal storage \(4MB\).

11. **发言者 1**（回复第 10 条）：I have a pam8403 installed and tested

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Mottle is a small browser game I got hooked on, so I built a place to play it online: \[链接隐去\]  
     
   The idea is simple. Drag \(or use WASD / arrow keys\) to move, and the moment you let go your creature fades into the colour of the tile under it. Seekers sweep the garden with cones of light, and if one sees you for too long you lose a life. Grab fireflies for points, survive each round's timer for a bonus, and the Seekers get faster and more numerous every round.  
     
   - Plays instantly in the browser, no download or sign-up  
   - Works on desktop and mobile, with a portrait layout for phones  
   - A full guide under the game: how the camo and alert meters work, scoring, and tips for surviving later rounds  
     
   One round takes a couple of minutes. Give it a try, and feedback is welcome.

### 讨论 32

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Wooden Crate  
     
   A game-ready prop  
     
   Tris: 300  
     
   Textures: 4096x4096, PBR  
     
   Maps: Base Color, Normal, Roughness, AO  
     
   Time spent: ~7 hours  
     
   \[图片省略\]BoxRender2160×2160 2.61 MB  
     
   \[图片省略\]BoxWireframeRender2160×2160 2.91 MB

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Thumb gusset  
     
   Hi . I m making Susan Crawford winter warmer mittens.  I have got to row 20 … it states.  
     
   Pattern to marker place the next 13 stitches on hold  for thumb gusset .  
     
   Using  backwards loop and continuing to maintain pattern cast on 13st   patt 2 pm patt to end of round .  
     
   I,m confused re the maintain pattern bit … how do i do that when casting on .  
     
   Do i cast on in the colours that correspond with the colourwork chart . Thank you

2. **发言者 2**（回复第 1 条）：\[链接隐去\]  
     
   You can see in the 4th photo down on the details page that the palm pattern is maintained across the newly cast on sts. As 某参与者 mentioned, just remember to carry one of the yarns over the cast on sts so that both yarns are available as you continue the mitten. Either color will work.

3. **发言者 1**（引用未收录发言）：Thank you

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Thoughts on memory layers like mem0  
     
   Really curious if there is actually a market for companies trying to sell a memory layer for AI agents.Look at Claude code's "automemory" for example, they don't use a vector database or anything complex. Its just simple markdown files on the local filesystem along with grep for retrieval and it works great for me.For many simpler use cases, simple techniques like context summarisation are good enough.

2. **发言者 2**（回复第 1 条）：It depends on how you productize it. There’s market. The memory itself is a must-have, but you should probably implement it with some advantages and make it domain-specific to be better at something like retrieving, indexing, etc.

3. **发言者 1**（回复第 2 条）：I agree that domain-specific memory layers might be the way to go, in which case devs are just better off making their own memory layer for their use case, instead of having a dependency on a third party, don't you think?Especially now that building a simple memory layer particular to your use case won't take a lot of time and effort. And you can keep making it better as you go forward.

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Advice on Mesh  
     
   Guys,  
     
   I’ve just installed a mesh network to replace powerlines throughout the house.  No more drop outs etc\!  
     
   But one question. I have a dedicated satellite adjacent to the main system but plugged in to the main circuit not the hi-fi dedicated radial.  As the satellite has 2 Ethernet points I’ve wired the NDX2 and Uniticore directly to the satellite rather than via a switch figuring that one less connection was better, but would the NDX2 receive a better feed from the Uniticore if I used a dedicated switch? The switch I have is a standard Netgear, nothing fancy.  
     
   We tried both when installing and frankly there was no difference, so you would reasonably say why ask, but I was curious to know if there was any thoughts on best practice amongst the experts.  
     
   Thanks in advance guys.  
     
   Lindsay

2. **发言者 1**（引用未收录发言）：Thank you Sean.  
     
   Edit to say yes the satellite does act as a switch.  Thanks again.

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Wordpress single sign on  
     
   What app is this about, and its version: wordpress  
     
   What YunoHost version are you running: 13.0.10 \(testing\)  
     
   What type of hardware are you using: VPS bought online  
     
   Describe your issue  
   With many apps I can login once to the yunohost portal and then click through to the application … however, with wordpress this doesn’t work.  
     
   ie I have to login twice \(although the second login to wordpress does work well with yunohost ldap server\).  
     
   Is there a way to pass the yunohost login through to wordpress ?  I see the plugin http-authentication gets installed but not enabled \(I tried enabling it and couldn’t get it to work\).  
     
   Perhaps there is an alternative wordpress plugin that does the job ?  
     
   \(I know this has come up before, but I didn’t spot anything recently\)  
     
   Thanks\!  
     
   Thanks.  
     
   Share relevant logs or error messages  
   none

2. **发言者 2**（回复第 1 条）：Ihave the same problem.  wp-admin → login yunohost → wp-admin → login wordpress and it is ok

3. **发言者 3**（回复第 1 条）：Not sure is a good idea because this process on Yunohost add a very good security guarantee and wordpress is always attacked..  
     
   you can try add the permission wp-admin  in the group visitors and comment the sso in the  nginx conf…  
     
   \#include conf.d/yunohost\_panel.conf.inc;  
     
   and restart the service nginx  
     
   systemctl restart nginx  
     
   but as said before it is still safer be protected by the sso…

4. **发言者 1**（回复第 3 条）：\[图片省略\] 发言者 3:  
     
   Not sure is a good idea because this process on Yunohost add a very good security guarantee and wordpress is always attacked..  
     
   Indeed.  
     
   I want to only use LDAP, but login to yunohost once, but when I click in wordpress I’m logged into wordpress \(like many other apps\).  
     
   Presumably, there is some http headers to pass through or something.

5. **发言者 1**（回复第 2 条）：\[图片省略\] 发言者 2:  
     
   Ihave the same problem. wp-admin → login yunohost → wp-admin → login wordpress and it is ok  
     
   Thanks … glad its not just me \!

### 讨论 37

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Parsing nested lists in BQN

2. **发言者 2**（回复第 1 条）：This approach to parsing, and wrangling with trees in array languages in general, have been really eye-opening for me\! Plus, it's really quite a lot of fun.  
     
   It's also worth noting that CBQN's performance characteristics seem to have changed quite a bit since that post, as for me the nested array-based version is faster than the recursive descent approach.

### 讨论 38

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Rainbow hexie basket  
     
   Cute little project. Not sure I have any use for it but it will make a sweet gift.  
     
   \[图片省略\]IMG\_13842016×1512 400 KB  
     
   \[图片省略\]IMG\_13882839×2126 1.12 MB  
     
   \[图片省略\]IMG\_13862016×1512 458 KB  
     
   Easy, anyhow, &amp; a chance to use some 5X5 swap squares :slight\_smile:

2. **发言者 2**（回复第 1 条）：Soooo pretty\! :heart\_eyes: More things need to be rainbow, I think.

3. **发言者 3**（回复第 1 条）：Can’t have enough rainbow baskets\!

4. **发言者 4**（回复第 1 条）：So dang cute\!

5. **发言者 5**（回复第 1 条）：I love it so much\! What a great little basket\!

6. **发言者 6**（回复第 1 条）：Cute\! Good idea to let the hexies fold in to get a bowl shape.

7. **发言者 1**（回复第 1 条）：Thanks all\! It’s not my idea, I saw it online somewhere &amp; thought it was cute. And of course, “I can make that\!”

8. **发言者 7**（回复第 1 条）：That is extremely cute

9. **发言者 8**（回复第 1 条）：Love this\! :heart\_eyes:  
     
   \(darnit, why do I have no use for one either?\)

10. **发言者 1**（回复第 1 条）：1 more hexie makes a lid :wink:

11. **发言者 9**（回复第 1 条）：It’s adorable\! And I recognize some of those prints\! :pink\_heart:

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How yo use navigation agents 3D in godot engine  
     
   Godot Version 4.8 Beta 3  
   Hellooooooooooo :waving\_hand:t2: How are you today?  
     
   Question  
   Please help me for how i can use navigation agents 3d in my simple test prototype level for knowledge about how can ai navigation agents works and how i can use this\!

2. **发言者 2**（回复第 1 条）：Godot Engine documentation  
       
     
       
         
     
   3D navigation overview  
     
     Godot provides multiple objects, classes and servers to facilitate grid-based or mesh-based navigation and pathfinding for 2D and 3D games. The following section provides a quick overview over all ...

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：如何停止自我审判？

2. **发言者 2**：做点事，就算做的很烂也先别管，先做。

3. **发言者 3**：做点能马上有正反馈的事情

4. **发言者 4**：用一些适度的感官刺激打断当前的想法，比如含一块冰，喝一口醋

5. **发言者 1**（回复第 2 条）：\[引用第 2 条\]  
     
   有时就是因为做得太烂才开始审判的\(;´Д\`\)

6. **发言者 5**：细说

7. **发言者 6**：冲一发

8. **发言者 7**：\( ﾟ∀。\)搞差不多得了，真想把自己审判到完美啊

9. **发言者 8**：休庭

10. **发言者 9**：我的咨询师给我的办法，虽然不能根本性解决你的问题，但是能稍微好受一些：  
     
   478呼吸法，可以随便找个视频跟着做五分钟，适用于失眠焦虑  
     
   身体扫描，这个同上  
     
   以上两个办法更多是让你的注意力回归当下，我个人还是觉得人是环境动物，不舒服先换一个环境慢慢缓解

11. **发言者 1**（回复第 8 条）：\[引用第 8 条\]  
     
   我的理性告诉我这根本不可能，但我的感性不接受\(;´Д\`\)

### 讨论 41

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

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\#\# 介绍认识  
     
   前两周，一位亲戚给我推了一个女生的某社区，大致介绍了一下对方的情况。  
     
   我今年 30 岁，其实之前一直不太愿意通过相亲这种方式认识女生。不过最近想了想，加个某社区也没什么，先聊聊看也无妨。毕竟在目前的工作地，身边没什么朋友，如果能找到有共同爱好的人，以后一起骑骑车、爬爬山，偶尔约着出去玩，也挺不错。  
     
   \#\# 聊天  
     
   加上某社区后，简单聊了几句，和我预想的差不多，基本看不出对方有什么主动交流的意愿，聊天也很难继续推进。  
     
   两天后，我主动问对方有没有时间线下见一面。对方表示有时间可以，于是我接着问她什么时候方便。结果对方说最近没空，等有时间再说。  
     
   说实话，到这里我其实已经不太想继续约了。  
     
   过了几天，亲戚问起我们的进展，我便如实说了自己的感受，觉得女生应该没什么想法。后来亲戚又帮忙向对方的介绍人打听了一下，得到的答复是：对方那周确实有事情，回老家了。  
     
   \#\# 再次约见面  
     
   既然如此，本周我便又主动约了一次。对方这次表示有空，于是我们约好周末一起吃饭。  
     
   确定见面时间后，我问对方有没有什么特别想吃的。对方表示没有，于是我就随便找了一家店。对于这个安排，对方既没有明确表示认可，也没有提出异议。  
     
   \#\# 见面  
     
   见面当天，我又问了一遍对方有没有什么想吃的，得到的答复依然是没有。既然如此，那就按照之前选好的地方吃饭吧。  
     
   整个过程基本就是吃饭加客套话，聊的也都是一些比较常规的话题。聊天过程中，对方明确表示，自己其实比较抵触通过相亲这种方式认识异性。  
     
   听到这里，我倒也不觉得意外，毕竟这和我最初的猜想基本一致。  
     
   吃完饭后，对方表示要回去了。OK，那就回去吧。  
     
   我和她一起下楼，出了楼之后，她便径直离开了，头也没回。

2. **发言者 2**：双方的建模还满意吗？

3. **发言者 3**：现在一些互联网相亲的程序感觉搞得还是挺不错的可以试试，减少自己试错的损失吧。遇到对的人不容易

4. **发言者 4**：这种没机会就放弃吧，继续多试试，每个人的喜好不一样。我表哥嫂嫂说也是见了很多不合适，但最后见了我表哥感觉很合适。

5. **发言者 5**：你不是她的菜

6. **发言者 6**：“ 对方明确表示，自己其实比较抵触通过相亲这种方式认识异性。”,只是没有相中你

7. **发言者 7**：是这样的，很难遇到能继续聊得下去的

8. **发言者 8**：发言者 2 不都说了，你还没明白么

9. **发言者 9**：“得到的答复是：对方那周确实有事情，回老家了”    
     
   到这一步基本就能推测出后面了。 基本上都是常见的套路。 我只想问，吃饭 AA 了没？ 哈哈

10. **发言者 10**：不管是啥方式，其实见面的一两分钟就知道是否合适了

11. **发言者 11**：饭钱 AA 要回来！！！！

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Modeling and rigging needed  
     
   hello im making a Roblox game called Facility after hours and its a horror asym game  
     
   i really would like help with modeling and rigging and this project could be fun\!

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：FUGLOY FINGERLESS MITTENS - INCREASES  
     
   Hi, just wanted to check that I am thinking correctly: am I right in thinking, that to do my 7 increases every other row, I increase the yo’s. Eg. for round6  
     
   \[图片省略\]IMG\_84471678×1576 537 KB  
     
   , it should be ‘k1, yo, p5, yo, k1’ ..p25

2. **发言者 2**（回复第 1 条）：Yes, that’s it. The increases are every other round. The increases are forming the thumb gusset as the sts between the yarn overs increase by 2sts each time.  
     
   \[链接隐去\]

3. **发言者 1**（回复第 2 条）：Many many thanks\! So grateful

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Online Protractor

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Coordinating Star Bag and Tablet Cover  
     
   \[图片省略\]10000281851920×2550 1.41 MB  
     
   \[图片省略\]10000281641920×2410 567 KB  
     
   A few weeks ago, I stumbled across a star shaped tote bag pattern on Etsy, saved it for later, and then completely forgot about it. A random 某社区 video popped up, someone making the same bag from the same pattern\! It was not difficult, but it was a lot of ironing, and it’s still a little wrinkled from turning it inside out. The pattern provided some smaller stars for decoration, but they were so small\! I made my own and stuffed it with scraps, and I already had the chain/ring. I’m definitely going to make the larger size next.  
     
   \[图片省略\]10000281801920×2550 1.85 MB  
     
   \[图片省略\]10000282071920×2550 1.88 MB  
     
   I really liked the fabric I used on the star, and I needed something to keep my tablet in. I was amazed, my machine went through two layers of batting, the lining, outer fabric, and the lace\! I wanted to add a snap, but my snap pliers went missing. I used bias tape to tie the cover shut instead, and I think I like it better. It fits in the star bag with room to spare\!

2. **发言者 2**（回复第 1 条）：Cute\! That star back could be very versatile for gifting, too\!

3. **发言者 1**（回复第 2 条）：Thanks\! Gifting one is a great idea\! :pink\_heart:

4. **发言者 2**（回复第 3 条）：They’d be great gift bags\!

5. **发言者 3**（回复第 1 条）：What an adorable tote and tablet bag\!

6. **发言者 1**（回复第 5 条）：Thanks\!

7. **发言者 4**（回复第 1 条）：Very nice, blue is my favorite color. Love the colorful charm.

8. **发言者 1**（回复第 7 条）：Thanks\! I’ve seen a bunch of bag charms like that lately on social media, and even with adding the eyelet, it was easier than I thought.

9. **发言者 4**（回复第 8 条）：I’ve seen them too. I need to look into make me some for my bookbags

10. **发言者 3**（回复第 1 条）：:maple\_leaf: :fallen\_leaf: :maple\_leaf: Congratulations\! Your Coordinating Star Bag and Tablet Cover are a Featured Project this week\! :maple\_leaf: :fallen\_leaf: :maple\_leaf:

11. **发言者 1**（回复第 10 条）：Thanks\! :pink\_heart:

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Help fix text error  
     
   Godot Version  
   4.5  
     
   Question  
   how to solve this text error  
     
   \[图片省略\]

2. **发言者 1**（回复第 1 条）：it says “expected closing “\)” after call arguments”

3. **发言者 2**（回复第 1 条）：You are missing a ‘\+’  
     
   %UpgradeClickButton.text = \(str\(int\(hoses\)\)\+ " garden hoses 💸 " \+ str\(int\(click\_cost\)\)\)

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Fr. \(04.12.\) Kneipenquiz  
     
   Moin,  
     
   der Dezember startet mit einem Kracher am Freitag:  
     
   Das Kneipenquiz kommt mit einer neuen Ausgabe ab 20 Uhr\!  
     
   Andreas und Johanna führen durch den Abend und müssen sich durch die „Halbe Punkt“-Chöre durchsetzen.  
     
                 
     
   \[图片省略\]Screenshot 2026-11-13 1832221920×1342 175 KB

2. **发言者 2**（回复第 1 条）：Viertel Punkte…\!\!\! Buuuuh…  2 3/17 Punkte… Yeeeeah

<!-- samples:end -->

