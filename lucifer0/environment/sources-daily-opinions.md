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

采集时间：2026-11-14 08:41:33（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Probabilistic data structures in Go

2. **发言者 2**（回复第 1 条）：These are so cool\! I know Bloom filters, so thank you for introducing me to the others.

3. **发言者 3**（回复第 1 条）：There’s a relatively new and simpler alternative to HyperLogLog for cardinality estimation that Knuth called the CVM algorithm \(after its authors\) \[链接隐去\]

4. **发言者 3**（回复第 3 条）：Oh, another classic \(1970s\) randomized algorithm is Robert Morris’s “Counting Large Numbers of Events in Small Registers” \[abstract\]\(\[链接隐去\] \[pdf\]\(\[链接隐去\]

5. **发言者 4**（引用未收录发言）：IIRC, cuckoo filters also get you closer to the theoretical lower bound of log2\(1/e\) bits per item stored, whereas Bloom filters are at best 1.44 times that. So even though inserts slow down as you reach capacity, you could get back the performance by increasing capacity 10% or 20%, and you'd still be smaller than the equivalent Bloom filter.

6. **发言者 5**（回复第 3 条）：Wow, this algorithm is beautiful\!

### 讨论 2

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

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How To Make The End/Tail Of A Curve Dont Rotate When I Move It?  
     
   So I have a problem about a tail or end of a curve that always rotate everytime I move it. Unlike the other segment of the curve that move normally \(without any rotation\), the end/tail of the currve always rotate everytime I move it :frowning:  
     
   Do you guys know how to make the tail/end of the curve just move whenever we move it without rotation?  
     
   I am trying to upload a video, but this forum said “New User Cannot Upload Attachments” :frowning:  
     
   so I am sharing the link of the video through 某社区, I hope it is allowed to do so  
     
   VIDEO

### 讨论 4

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

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：area\_fg of -nan gives positive number  
     
   I am not sure this is the expected behavior but I am getting a positive foreground area size when image is all -nan, as in the example below:  
     
   &gt; gmic -v -1 10,10 -div '\{iM\}' -area\_fg 0,0 \+echo '\{iM\}\\n'  
   2  
     
   the division by iM is what causes the -nan. I bumped into this by accident when processing a blank image which was not supposed to be blank. Is this a bug? Area image is below.  
     
   \[图片省略\]nanareashot786×786 1.82 KB

2. **发言者 2**（回复第 1 条）：Does area\_fg not count the area of shapes? In your case, that shape is 2 pixels, so each pixel is given the value of 2.

3. **发言者 3**（回复第 2 条）：It isn’t suppose to happen. I tested, and a sea of nan should remain the same everywhere in area\_fg. It’s a island everywhere or not.

4. **发言者 2**（回复第 1 条）：Sorry folks for introducing a false memory or fact.

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[討論\] 在超商拿整疊百元鈔付錢  
     
   在超商拿整疊百元鈔付錢  
   而且不用皮夾  
   一大疊百元舊鈔  
   還有一張五百元拿起來數  
     
   蠻特別的  
     
   而且這個時間喝特大杯咖啡  
   另外買了約略10瓶600cc可樂  
   女性 頭髮斑白  
   大概是做什麼工作的

2. **发言者 2**（回复第 1 条）：光看這些敘述很難判斷職業

3. **发言者 2**（回复第 1 条）：可能是小生意或攤商習慣使用現金

### 讨论 7

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

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Can anyone name anything new that AI has done?  
     
   We're 2 years into this. Still looking for something that an AI did all by itself that is actually new. Everything I've seen so far still involves a human sussing out the new thing or the model is just aggregating data that is already there from disconnected sources that never got tied together.

2. **发言者 2**（回复第 1 条）：That's AI for ya. What you are seemingly looking for is AGI and that we do not yet have.

3. **发言者 3**（回复第 1 条）：\[链接隐去\] among many others

4. **发言者 4**（回复第 1 条）：Yep, it is all over. Nihil novi and all that. It it is totally pointless. No sane person uses AI. Can you step a little closer over there? Don't worry. It is totally not a trap.

5. **发言者 1**（回复第 2 条）：Maybe someone shows up, makes a solid case for something new, and surprises us. There's still people out there claiming it can, so I'm going to keep asking this every month until someone wows me or the topic dies at a societal level.

6. **发言者 5**（回复第 1 条）：It created a novel form of psychosis.

7. **发言者 1**（回复第 6 条）：We already had that. Did everyone forget about QAnon?

8. **发言者 6**（引用未收录发言）：I think if you are strong headed enough, you can ignore that the sky is blue and day is light

9. **发言者 7**（回复第 1 条）：protein folding problem?  
   \[链接隐去\]

10. **发言者 8**（回复第 1 条）：Some pretty interesting financial schemes

11. **发言者 9**（回复第 3 条）：Maybe getting a bit philosophical here, but isn't AI just solving math problems using existing methods? It's not making up new types of math \(like inventing calculus for example\).. or is it?

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：前几天吵架了，跟老婆冷战了，夫妻之间嘛，小打小闹总是有的，我有我的认错方式，即兴做了个小程序,  
   1.可以分享  
   2.有定时约定，保证下次一定 \[ doge \]   
   3.由于不能冷战太久，做得略粗糙，欢迎点评  
   \[图片省略\]  
   \[图片省略\]

2. **发言者 2**：黄老板也上 某社区 ？

3. **发言者 1**：前 100 送铜币哈！！！

4. **发言者 3**：用不到 都是老婆认错

5. **发言者 4**：每日一？

6. **发言者 5**：建议可以修改性别，男女通用。

7. **发言者 6**：老婆：老黄？？？原来你范的这个错啊

8. **发言者 7**：这也能龟上?

9. **发言者 8**：紧跟实时热点

10. **发言者 1**：发言者 2 黄老板说我冤\[doge\]

11. **发言者 9**：道德感极低，没有法律意识，  
   要是让老黄知道了，把你撸成干

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Puritan audio mains purifier PS106  
     
   I’ve done a search but not much about this PS106 purifier. Thinking of trying one in a few weeks. I’ve already changed all mains cables to Puritan Classic and have been pleasantly surprised by the effect. Seems to be many have chosen the top of the range PSM156 and ultimate cables but I’m a pensioner now and have to work to a budget. Seem to be a couple of options, filter/no filter, dc offset removal/no removal. Yet to understand more of this. Just wondered whether the 106 \(or 108\) are a thing out there?

2. **发言者 1**（引用未收录发言）：Thanks, that’s very useful. My dealer has all his demo kit plugged into Puritan and he’ll lend me what I need to try at home. The PS108 purist is looking favourite atm.

### 讨论 11

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

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Proposal to import NaPTAN information for Sheffield Supertram  
     
   None of the Sheffield Supertram tram stops have any NaPTAN information at the moment. I’d like to import NaPTAN tags and add them to the platforms. If this is ok then I’m trying to think of the best way to go about it. On NaPTAN, there are separate ATCO codes for each platform and 1 for the whole stop, as well as a separate stop area code. Would it be best to just import the platform information, because I’m not sure where I would put the information for the stop as a whole? I would leave the names as they are and add fixme tags for any that differ between OSM and NaPTAN; I think some of the tram stop names have been recently changed, but this may not be verifiable irl yet

2. **发言者 1**（回复第 1 条）：\[图片省略\]  
     
   NaPTAN/Tag mappings - OpenStreetMap Wiki Going off this just add the PLT ones?

3. **发言者 2**（回复第 1 条）：Could the codes for the whole stop go on the stop\_area relation? e.g. \[链接隐去\]

4. **发言者 1**（回复第 3 条）：Maybe but the stop areas already have StopAreaCodes which are different to the code for the tram stop. It’s weird but I think it’s because stop areas like Meadowhall Interchange may include bus stops as well as the tram platforms

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Battle System Ideas?  
     
   Godot Version  
   4.7  
     
   Question  
   I want some battle System Ideas for a game I’m making. :3 Similar to Cuphead or Hollow Knight or Cuphead

2. **发言者 2**（回复第 1 条）：Please read Posting guidelines in \#Help channel  
     
   Any search engine can help you with this.

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Question about vocabulary in 某社区 Reading Passages  
     
   Hi there\!  
     
   I have a question regarding the vocabulary necessary to fully understand the reading passages. As an example, I recently started the passages marked as N5. Since I just finished both the Vocabulary and Grammar N5 某社区 decks, I kind of assumed that the passages for N5 would be simple enough that I could understand them. And I can, for the most part.  
     
   Im noticing, though, that some of these include vocabulary and grammar points I haven’t studied yet. When I looked up the ones I wasn’t familiar with, they show up in the 某社区 content section as N4 or lower.  
     
   I guess my question is, is this normal? Sometimes I feel the need to click on the “Show All Translations” button because of a word or phrase I don’t know yet, and it feels like I’m cheating.

2. **发言者 2**（回复第 1 条）：Personally, I think 某社区 should provide an i\+1 experience.  
     
   The content should not contain so many things that are outside of what is learnt.

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：小时候喜欢黑深残，该死的人全死光，不该死的因为某些失误或者意外也死掉，哪怕主角拯救了世界也只能继续孤独的往下走。就是要某种遗憾留在观众心里才能给人留下深刻的印象啊\( \`д´\)  
     
   现在只想看大团圆。哪怕突然降神，用某种完全不合乎作品逻辑的方法把之前死掉的好角色全部复活，只要大家好好的在一起就心满意足了\(;´Д\`\)。  
     
   不过像杀青梗这种连世界观都一起抛弃的方法还是不喜欢，这样不是连主角本身的存在都否定了吗\(\*´д\`\)

2. **发言者 2**：老了ﾟ\(つд\`ﾟ\)  
     
   之前写小说只写be，死光了才好\(σﾟ∀ﾟ\)σ  
     
   现在重新看以前的文稿，只想问为什么全死了\( ﾟ∀。\)

3. **发言者 3**：我喜欢好结局，也喜欢为了促成好结局而达成的故事  
     
   杀青梗可以认为是平行世界\(　ﾟ 3ﾟ\)

4. **发言者 4**：生活太辛苦，吃点工业糖精都觉得甜\( ´\_ゝ\`\)

5. **发言者 5**：这就是我看网上有些人觉得《灰色兼职》结局有点生硬，但我非常喜欢这个结局的原因\( ﾟ∀。\)包了一个很棒的寿司

6. **发言者 6**：写的时候足够冷酷到这里该死就写死了\(｀･ω･\)看的时候连角色重伤都：求求你不要\(;´Д\`\)

7. **发言者 1**：夏日重现看完了，真好啊\( ´∀\`\)。为了不剧透就不说好在哪里了\(　ﾟ 3ﾟ\)

8. **发言者 1**（回复第 7 条）：\[引用第 7 条\]  
     
   不过这集数有点奇怪，感觉像是加上去的\( ﾟ∀。\)

9. **发言者 7**：有个经典的动画片来着，班里有一个死人没被发现，被找到前会一直离奇死人，死法千奇百怪，女主叫见崎鸣，以前中二的就爱看这种。现在听说小马宝莉的小马老死了都不敢看了\(\*ﾟーﾟ\)

10. **发言者 8**（回复第 9 条）：\[引用第 9 条\]  
     
   another\( ﾟ∀。\)我倒是觉得这个还好，意难平的不算多

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How I Ended Up Turning a 22-Year-Old PostgreSQL Type-Confusion Primitive into RCE \(CVE-2026-6460\)

2. **发言者 1**（回复第 1 条）：Very nice deep dive into the Postgres internal type system. The investigation was LLM-assisted and the post has some highly questionable visualizations, but the blog post text looks hand-written.

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Drummer Boy  
     
   Concept By Ben Eblen Design  
     
   \[图片省略\]3.11080×1080 771 KB  
     
   \[图片省略\]3.51080×1080 889 KB  
     
   \[图片省略\]3.41080×1080 896 KB  
     
   \[图片省略\]3.31080×1080 784 KB

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Trip to Japan is never boring  
     
   Some images from my trip to Japan. Will come back for sure.  
     
   \[图片省略\]20241211\_1635021350×1800 589 KB  
     
   \[图片省略\]DSCF67542000×1333 671 KB  
     
   \[图片省略\]20241214\_1513291800×1350 861 KB  
     
   \[图片省略\]20241214\_1519531350×1800 695 KB  
     
   \[图片省略\]20241217\_1153421800×1350 760 KB  
     
   \[图片省略\]dscf68022000×1333 764 KB  
     
   \[图片省略\]dscf68052000×1333 813 KB  
     
   \[图片省略\]Document Name \+ compressed\_92300×1725 701 KB  
     
   \[图片省略\]Document Name \+ compressed\_122300×1725 809 KB  
     
   \[图片省略\]IMG\_8028\_monday400 \(2\)1920×1280 1.35 MB

2. **发言者 2**（回复第 1 条）：Hi,  
     
   nice pics. They remembered me Thirty-six Views of Mount Fuji

3. **发言者 3**（回复第 1 条）：Nice \!  
     
   And this could be very interesting “raw material” for the Play Raw section.

4. **发言者 1**（回复第 3 条）：Yes, I will post some of them for sure, but some are JPEGs from Samsung Galaxy S24 ultra.

5. **发言者 4**（回复第 1 条）：Thank you for the excellent travel photos. The day I was near Fuji-san was extraordinarily cloudy, so I wasn’t able to see much of it myself.

6. **发言者 5**（回复第 1 条）：Nice pics\!  
     
   I can also say that no trip is ever boring, when looking around with the eyes of a curious child\! :smiling\_face:

### 讨论 19

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 大家都說愛麗絲黃不好看？  
     
   如題，  
   我啊肥肥，早安女版！  
     
   大家都說間諜愛麗絲黃長得不好看，但你們不覺得他的輪廓弄精緻一點很像中國女星李一桐  
   嗎？  
     
   \[链接隐去\]  
   \[图片省略\]  
     
   那我覺得就很好看耶！  
     
   這個時代，醫美發達還是有機會的吧？  
   把皮膚弄好輪廓再去微整，再配上化妝，無敵的吧！  
     
   女版的姐姐美眉們大家怎麼看呢？

2. **发言者 2**（回复第 1 条）：許純美也說自己像王祖賢

3. **发言者 3**（回复第 1 条）：普臉才適合間諜

4. **发言者 4**（回复第 1 条）：笑起來有像 但是沒有白嫩少女感

5. **发言者 5**（回复第 1 条）：我可以

6. **发言者 6**（回复第 1 条）：你眼睛還好咩

7. **发言者 6**（回复第 1 条）：她都49了 應該懶的醫了

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Neues Hauke PnP Mittelalter  
     
   Hallo zusammen ich hoffe es gibt nicht schon bereits ein Beitrag dazu.  
     
   Trotzdem wollte ich es teilen für alle, bei denen es noch nicht auf der 某社区 Startseite aufgetaucht ist\!\!

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Claude OAuth Failures  
     
   Claude has started having serious OAuth errors and hangs, but nothing appears on the Claude Status site yet\[0\]. It's been several minutes now, not sure if its a blip or something more serious. Obv Claude is still reporting the issues with MS O365 connector; but not sure if it's related.\[0\] \[链接隐去\]

2. **发言者 2**（回复第 1 条）：Thanks for posting. Was wondering it was just me or not.

3. **发言者 3**（回复第 1 条）：Confermed from Italy

4. **发言者 1**（回复第 2 条）：Also downdetector \[0\] has reported errors spiking as well.\[0\] \[链接隐去\]

5. **发言者 4**（回复第 1 条）：Thanks for posting\!Facts from my end:I got "Please run /login · API Error: 403 Attention Required\! \| Cloudflare" during a long task that had been running for 27 minutes 10 seconds.I don't do any work related to Microsoft Office.The login isn't working, it opens the browser with a URL starting with \[链接隐去\] but just sits there with the little spinner.

6. **发言者 5**（回复第 1 条）：Yeah, I've noticed that I got booted from Claude Code and can't log-in again.  \(Graz, Austria.\)  Happened about 20 mins ago.Anthropic just updated with an incident report:  \[链接隐去\]

7. **发言者 1**（回复第 1 条）：It seems to have resolved for me now; I retried the auth link and it worked now.

8. **发言者 6**（回复第 6 条）：Its resolved for me. Also \(Graz, Austria\). 2 minutes ago i got to logon again

9. **发言者 5**（回复第 8 条）：Thanks for the heads-up.  I was also just able to log-in.If you're working on anything interesting, neighbor, feel free to shoot me an email. My email address is \(temporarily\) in my profile.Edited to add:  Got kicked out again.  It worked for about 5 mins.

10. **发言者 7**（回复第 8 条）：I managed to log in ~5 minutes ago but kicked out again now.

11. **发言者 8**（回复第 1 条）：Same issue, resolved a few minutes ago but happened again.

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：最近大厂也在 AI 标注平台么  
     
   前几天 天猫打了好几次电话  
   我还以为啥大事  
   原来是让我注册 他们的 “晓天睿士” 平台，但是搞笑的是 他们网页标题：  
   \[图片省略\]  
     
   然后这几天 腾讯也高了一个，认证就能提现 100 现金， 😂 真的薅羊毛么  
     
   \[图片省略\]  
     
   \[链接隐去\]

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Configuration of SMTP relay fails due to password requirements  
     
   What type of hardware are you using: Raspberry Pi 3, 4\+  
     
   What YunoHost version are you running: 12.1.41.2  
     
   How are you able to access your server: SSH  
     
   Describe your issue  
   Following documentation of YunoHost, I tried to set up an SMTP relay via the administrative web interface.  
     
   This fails due to the check of the provided password\!  
     
   But neither me nor YunoHost is responsible for this password\! Both of us are faced with the credentials the SMTP relay’s administrator requires. \(In my case Sweego uses UUIDs as passwords, containing numbers and lowercase characters, but NO uppercase ones.\)  
     
   So I recommend to skip this check of the provided password.  
     
   Share relevant logs or error messages  
   “Das Passwort muss mindestens 8 Zeichen lang sein und Gross- sowie Kleinbuchstaben enthalten” \(translated to English: “Password requires at least 8 characters, containing upper- and lowercase letters”\)

### 讨论 24

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

### 讨论 25

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Reading a text file "line by line"  
     
   Godot Version  
   4.6.1  
     
   Question  
   This is probably a very simple question, but I couldn’t find anything relevant online.  
     
   I want to have a dialog system, a VERY basic one however which is completely linear. As such I had the idea to create a .txt file and have each line of dialog be written in one line of the file.  
     
   IE:  
     
   “Line one  
     
   Line two  
     
   Line three”  
     
   However I don’t know how to code in something that only reads one line of the text. For example, if I have a variable that counts up when the dialog progresses, how can I read the number in the variable and fetch the correct line?  
     
   I have seen tutorials for reading JSON files, usually meant for save features in video games, but I’m unsure how to do it for TXT files. And either way, they use arrays which I am not familiar with. So I’m asking if there is a simple way to do this or if I have to create a complicated system.

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Histories  
     
   When are you going to put the new histories section in the 某社区 app for mobile?

2. **发言者 2**（回复第 1 条）：Hey\! Welcome to the forums :tada:  
     
   What new histories section do you mean?

3. **发言者 1**（回复第 1 条）：\[图片省略\]  
   IMG\_41731179×2556 202 KB  
     
   The new stories section I can see it on 某社区 on google but no in 某社区 mobile app I don’t know why

4. **发言者 3**（回复第 3 条）：\[图片省略\] 发言者 1:  
     
   The new stories section I can see it on 某社区 on google but no in 某社区 mobile app I don’t know why  
     
   The team usually rolls out the web version before rolling out the app version, so it may take a wee while  
     
   \(I do think it would be a good idea to implement simultaneous rollout though\)

5. **发言者 2**（回复第 3 条）：Yes, Stories are going to be added to the app. In fact, that is one of the things being worked on currently\!

### 讨论 27

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Arduino Q allowing python udp  
     
   hello there, I'm running an udp  app that send string over udp how to properlly allow port 50555/udp  the project yaml file have a line for ports:\[\] but it's unfortunately read only  
     
   so far my python app run, but nothing get out from the udp port dispite the socket opened successfully,  
     
   what I missing ?

2. **发言者 1**（引用未收录发言）：apparently there is no port forwarding set from the container, so overriding the yaml can be doable from external import but I don't know the exact syntax may be port: -50555/udp   what is your guess ?

3. **发言者 1**（引用未收录发言）：exactly, what I need, thx

4. **发言者 2**（回复第 1 条）：You are welcome. I'm glad if I was able to be of assistance.  
     
   Regards, Per

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[引用未收录发言\]  
     
   看来我必须要展现我的真实实力了\( \`\_っ´\)

2. **发言者 1**（引用未收录发言）：\[引用未收录发言\]  
     
   \( \`\_っ´\)

3. **发言者 1**（引用未收录发言）：\[引用未收录发言\]  
     
   \( \`\_っ´\)

4. **发言者 1**（引用未收录发言）：\[引用未收录发言\]  
     
   \( \`\_っ´\)

5. **发言者 1**（引用未收录发言）：\[引用未收录发言\]  
     
   \( \`\_っ´\)

6. **发言者 1**（引用未收录发言）：\[引用未收录发言\]  
     
   \( \`\_っ´\)

7. **发言者 1**（引用未收录发言）：\[引用未收录发言\]  
     
   \( \`\_っ´\)

8. **发言者 1**（引用未收录发言）：\[引用未收录发言\]  
     
   \( \`\_っ´\)

9. **发言者 1**（引用未收录发言）：\[引用未收录发言\]  
     
   \( \`\_っ´\)

10. **发言者 2**：\(｀･ω･\)

11. **发言者 3**：我还以为是让我一直点引用\(\(\(　ﾟдﾟ\)\)\)

### 讨论 29

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Contra "Glue work considered harmful"

2. **发言者 2**（引用未收录发言）：You seem to be using the term glue work differently from the article. The definition used there is mostly social: Helping onboard new peers, helping make sure that the team has a coherent technical vision, and that the people working on different parts of the system are aware of it, etc.  
     
   I don't think that's easy to automate with C\+\+ templates.

3. **发言者 3**（引用未收录发言）：You're talking about glue code maybe, which is completely different.

4. **发言者 4**（引用未收录发言）：Argh, I honestly thought your comment had no replies yet. Sorry, I didn't mean to pile on.  
     
   Does anyone recognise this mistake? It's not the first time I've misread the UI like this. 'This comment has replies / has no replies yet' is somehow not entirely obvious to my eye.

5. **发言者 5**（引用未收录发言）：I think this is a defensible reading of the original post if you bring your own cynical frame to it. I think many readers, especially more junior ones, might not.

6. **发言者 6**（引用未收录发言）：100% this. I ran myself ragged in a huge, dysfunctional, company and also watched several of the best engineers burn themselves out.  
     
   Your best course is resume-driven-development so that you always have the option to leave.

7. **发言者 7**（回复第 6 条）：Well, maybe resume-driven development as typically understood is the version best optimised for leaving for other large companies; for moderate size there are a few different types with different enough getting-hired tactics not to identify them with the same kind of RDD, and unlike the huge case, there is some choice of which risk/dysfunction profile is less personally painful…

8. **发言者 8**（回复第 1 条）：&gt; Goedecke is quite accurately describing some of the incentives presented to employees at big tech. My problem with the post is that he tells you to internalize them instead of keeping in mind that a better world is possible.  
     
   That’s his thing.

9. **发言者 9**（回复第 8 条）：Yeah, if you work at Oxide like OP or a similar small-medium company that has attracted a higher concentration of talent, then the bigco advice doesn’t really apply. The most I might riff on the post as applied to bigco is that unbelievable inefficiencies enacted over a long period of time can create space for dramatic improvements you can take credit for.

### 讨论 30

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

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Inspector Gadget  
     
   \[图片省略\]4096×4096 1.11 MB  
     
   \[图片省略\]4096×4096 796 KB  
     
   \[图片省略\]4096×4096 849 KB  
     
   \[图片省略\]4096×4096 1.31 MB

### 讨论 32

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

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 警察似乎鬆懈不管事?  
     
   我說的話絕對負責  
       真的是親身經驗的  
     
       某個十字路口各方向的交通號誌故障  
       在附近兩步路的某警察機關的大門口警察  
       完全不管  
     
       儘管當面告知警察了  
       完全不願意移動腳步過來察看  
       只要走過來幾步路  
       即可看到路口號誌情形  
       完全不動  
       頂多嘴巴重複著:"路口號誌不會亮"  
     
       或許有人會說  
       並非他的單位  
       實在使不上力  
     
       但  
       真的是如此嗎?  
     
       就傍晚五點多啦  
       走路經過某路口  
       各方向紅綠燈都是熄滅的  
       所有車子以及路人大多都不敢動  
       還想活得久一點  
     
       既然要投訴就來個徹底一下  
       多年以來  
       上下班時間台北市警察只會窩在騎樓人行道  
       看著車來車往或是發呆...吧?\!  
       這是什麼任務?  
     
       如果有義交的話  
       就是義交上場指揮交通

2. **发言者 2**（回复第 1 条）：大門口警察執勤不能擅離崗位啦

3. **发言者 2**（回复第 1 条）：這種情況打1995請他們派人處理才對

4. **发言者 3**（回复第 1 条）：別人回覆的你總是聽不進去呢

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：So. \(08.11.\) PnP: Cyras Cosmic Quest III - The Void Seed mit Nils  
     
   Moin,  
     
   Sonntag spielt Nils bei einem Pen &amp; Paper  Abenteuer mit, jedoch außer Haus fernab einer RBTV-Produktion. Im Sendeplan ist daher auch bewusst die Rede von einem „Restream“. Gesponsert wird es von Congstar.  
     
   Das Pen&amp;Paper wird ab 16 Uhr auf den RBTV Kanälen gestreamt.  
     
   Spielleiter: Alexander Karnstedt  
     
   Teilnehmende: Nils, Baso, Jennyan, Kadditv und Leon von Bonjwa  
     
   So sah zum Beispiel eine vorherige Ausgabe aus:

2. **发言者 2**（回复第 1 条）：Aah, das „no VoD“ bezieht sich dann auch nur darauf, dass RBTv sich nicht darum kümmert / in der Mediathek haben wird, aber die anderen Streamenden oder Congstar schon, richtig? Entschuldige, dass ich doof nachfrage.

3. **发言者 3**（回复第 1 条）：Habs gestern komplett verfolgt und hat mir tatsächlich gut gefallen. Vor allem die Baso/Nils Kombo\! Von der anderen Seite des Tisch’s kam ja ausser von Kaddi leider nicht sooo viel.  
     
   Ich werd auch mal in die vorigen zwei Teile reinschauen.

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Newly Startup – Discover emerging startups, SaaS and AI tools

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Help with cable knit  
     
   Hey friends\! I’m doing my first ever cable knit in the round on a hat.  I’ve noticed that the one side of the cable is mess and doesn’t look right ? It doesn’t look like knit stitches. What am I doing wrong ?  
     
   \[图片省略\]IMG\_27511645×2193 637 KB

2. **发言者 2**（回复第 1 条）：Welcome to KH\!  
     
   What is the name of your pattern and designer?  
     
   These look like traveling cables but knowing the pattern will help us.  
     
   Are you holding one or two sts to the front when making the left cross cable each time? Those same sts would be crossing over a stitch to the left of them each time similar to the right cross cable nearer the green stitch marker.

3. **发言者 1**（回复第 1 条）：\[图片省略\]IMG\_27521290×2796 314 KB  
     
   This is the pattern I am following it is from Knitting House Square. Iv been most doing one st front and back. Following the pattern. I’ve only done 2 stitches in front once so far. I stopped because I noticed the left cables were looking weird.

4. **发言者 1**（引用未收录发言）：Oh\! When I go to the left I’ve only been holding 1sts off instead of 2 sts\! I think that what I’m doing wrong\!? Your explanation helped so much\! Thank you\! Now I need to go restart :joy::face\_holding\_back\_tears:

5. **发言者 2**（回复第 4 条）：Great, you’re set to go now. Let us know how it’s going and come back with any questions or clarifications.

### 讨论 37

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\# 项目介绍  
   \[图片省略\]  
     
   效果如下，现在支持点击任意位置；甚至是多选文字直接删除，妈妈再也不用担心我们输错啦~  
     
   \[图片省略\]  
     
   欢迎各位朋友建议\+提 issue  
   ui 方面希望给出更多的建议，争取赶上 mac 的体验！  
   喜欢的朋友可以点个 star 哦  
     
   项目地址： \[链接隐去\]

### 讨论 38

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

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Ralphie - Mouse, Needle Felting  
     
   eh - I’m still deep into the “I hate this project” stage even though there were significant improvements by adding the mouse ears and the slipper details in the last work session.  
     
   \[图片省略\]20261110\_1043431920×2560 446 KB  
     
   \[图片省略\]20261110\_1043561920×3432 689 KB  
     
   \[图片省略\]20261110\_1044311920×2560 421 KB  
     
   \[图片省略\]20261110\_1044461920×2560 526 KB  
     
   This guy is smaller than my usual mice, probably an inch shorter which equals a foot or 26mm in mouse measurements.

2. **发言者 2**（回复第 1 条）：Absolutely darling in every way.

3. **发言者 3**（回复第 1 条）：So. Darn. Adorable\!

4. **发言者 1**（回复第 1 条）：Thank you 发言者 2 &amp; 发言者 3 \!\!  
     
   I hope some day to share your sentiments\! :wink:

5. **发言者 4**（回复第 1 条）：He’s so sweet\! I hope you are able to see his cuteness soon\! Maybe he needs an accessory for you to find love?

6. **发言者 1**（回复第 1 条）：Thanks 发言者 4 \!\!  
     
   It usually just takes time. :wink:

7. **发言者 5**（回复第 5 条）：\[图片省略\] 发言者 4:  
     
   Maybe he needs an accessory for you to find love?  
     
   Maybe a long, skinny, wrapped present, rather than a tiny gun?  
     
   My brain is insisting l say ”He looks like a deranged Easter Bunny.”. \(But in the best way.\).  
     
   And ”Oh boy, a zeppelin\!”

8. **发言者 1**（回复第 7 条）：“you’ll shoot your eye out\!\!”  :smiley:

9. **发言者 6**（回复第 1 条）：The little bunny slippers are indeed a great addition\!

10. **发言者 1**（回复第 1 条）：Thank you 发言者 5 &amp; 发言者 6 \!\! :smiley:

11. **发言者 7**（回复第 1 条）：He’s so cute :slight\_smile:

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Please add Resize Font to Fit function to LineEdit and TextEdit in Godot\_v4.8-beta3\_mono\_win64  
     
   \[图片省略\]image491×174 6.42 KB  
     
   I love this new  Resize Font to Fit on UI tool at Label node but I think dev forgot Godot have LineEdit and RichTextLabel. They are no Resize Font to Fit function yet, please add on that too.  
     
   Thank for make Godot much better.

2. **发言者 2**（回复第 1 条）：This is the forums not really the place to propose features

3. **发言者 1**（回复第 2 条）：Then where should I be post?  
     
   The features is just copy and place.

4. **发言者 2**（回复第 1 条）：This is where proposals should be made:  
     
   GitHub - godotengine/godot-proposals: Godot Improvement Proposals \(GIPs\) · GitHub

### 讨论 41

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：TCG Terminology  
     
   Sup Yall, My town as recently opened a Cafe that hosts Game nights every week, so its time I start learning Vocab Specific words.  
     
   I was curious if anyone else happens to have a good list for SPECIFIC Card games  
     
   I already used this site to get the ball rolling for intro vocabulary. I happen to play MTG and Gundam IRL so I should be able to find that vocab easy enough. But for Pokemon and One Piece I know nothing. If anyone has any good lists floating around I would appreciate that.  
     
   ALSO, I am making a deck in 某社区 to share once finished as well separated by games so it wont be just for me.

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：大学体育为啥能这么烦人\( ﾟπ。\)明明我校专业课请假了都说不算缺课可以考试，偏偏体育课请多了假也要重修，我腿骨折了连学校都没来也不给通融，甚至校园跑都不给免\( ﾟπ。\)

2. **发言者 1**：有重修是不是评优评先之类的活动就没戏了？\( ´\_ゝ\`\)

3. **发言者 2**：\(　ﾟ 3ﾟ\)我们学校想申请保健体育，只有影响运动的残疾人才能批  
     
   哦对了，单耳失聪不算影响运动哦\(ゝ∀･\)  
     
   就这还只是申请保健体育，而不是体育免修，最关键的是这个B申请还要半年申请一次

4. **发言者 2**（回复第 2 条）：\[引用第 2 条\]  
     
   我们这边评优评先还要求体育学期总分值85以上呢\(\`ヮ´ \)评价是这种没什么含金量的鸟东西和奖学金以及各种野鸡比赛坐一桌

5. **发言者 3**：这么阴间，我们学校如果受伤了和体育老师交医生证明就行，最多要求来旁观体育课

6. **发言者 1**：校园跑代跑有风险吗 我真的快吐了\( ´\_ゝ\`\)

7. **发言者 4**（回复第 6 条）：\[引用第 6 条\]  
     
   你不跑都没风险，学校只怕闹吧，你说你骨折了要你跑那就得宣传一下自己身残志坚，反正又不会因为这个跑步让你不毕业。\( ´∀\`\)

8. **发言者 1**：好想吐\( ・\_ゝ・\)到底为什么算缺课，我真不想重修……骨折了也不放过我\( ´\_ゝ\`\)这学校还宣传人文关怀呢

9. **发言者 1**：我代跑都找好了老师说期末会看资料记录\( ﾟ∀。\)那看到我拄个拐杖还健步如飞岂不一秒知道我找代跑了\( ﾟ∀。\)77

10. **发言者 5**：那你就拄个拐慢慢走呗，问就是学校逼的

11. **发言者 6**（回复第 6 条）：\[引用第 6 条\]  
     
   很看学校的，我们学校抓的特别严，跑步中途还要人脸识别

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How Not to Build a Music Player

2. **发言者 2**（回复第 1 条）：AMP is one letter away from a different music player, \[AIMP\]\(\[链接隐去\]

3. **发言者 3**（回复第 1 条）：Fun article. I for one wholeheartedly want more "How not to" articles on the web. It was one of my big frustrations while working as a physics researcher. No publishes what they've tried that didn't work\!   
     
   Learning from your own mistakes is good. But learning from someone elses mistakes so you don't have to make them yourself is even better\!

4. **发言者 4**（引用未收录发言）：I disagree that this requires months of planning before code is written. For a personal project, writing code immediately and constantly iterating and learning is a totally reasonable approach - this is usually how my personal projects end up going and it keeps the process fun.

5. **发言者 5**（引用未收录发言）：Waterfall is usually not the best methodology.

6. **发言者 6**（回复第 2 条）：To me the name looks as if it were meant to be some hypothetical pre-Windows version of \[WinAMP\]\(\[链接隐去\] :-\)

7. **发言者 7**（回复第 5 条）：At no point i mention any kind of methodology.

8. **发言者 5**（回复第 7 条）：You describe a methodology \("months of up front planning, before you start work"\), even if you don't name it.

9. **发言者 1**（引用未收录发言）：&gt; If these are “a few goals”, I feel like an unaccomplished slacker.  
     
   Yes, perhaps a bit far from those goals. still figuring out how to replace harfbuzz.  
   There are libraries like \[Hamza\]\(\[链接隐去\] that I want to try.

10. **发言者 7**（回复第 8 条）：You are misquoting me. Please read what i \*actually\* wrote.

11. **发言者 5**（回复第 10 条）："A project like this needs months of thinking before a single line of code gets written."  
     
   Sorry, you're right, you didn't necessarily state all of that thinking was spent planning, that's on me.

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Les p'tits jeux solo de TechDweeb  
     
   Article publié sur : Les p'tits jeux solo de TechDweeb - 某社区.fr  
   Dans ma quête de RPG solitaires \(dont je vous parlais déjà ici\), je suis tombé sur un petit gars plutôt sympathique et débordant d’idées, l’ami TechDweeb, créateur de quelques petits jeux solo minimalistes qui méritent le coup d’œil. « Je n’ai pas de taf, je vis chez ma maman, je fais des vidéos 某社区, et mon chat me déteste ». C’est en…

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Stylized Japanese Village - low poly game assets for Unity \(diploma project\)  
     
   Hi everyone\! Sharing my diploma project: a stylized Japanese village for a Unity game, modelled in Blender.  
     
   15 buildings, each with upgrade levels so the player can see the village grow  
     
   10 props \(torii gate, bell, water mill, well, anvil and more\)  
     
   5 rigged characters: a mid poly samurai and ashigaru, plus three low poly villagers \(3-5k tris\)  
     
   The whole scene shares one palette texture atlas and only 3 materials, 150-300k triangles in total  
     
   You can rotate the models here:  
     
   Samurai - Stylized Mid Poly Game Character - 3D model by 发言者 1 \(发言者 1\) \[c6de551\] - Sketchfab  
     
   I’d love feedback on topology and silhouettes. Full portfolio with clay and wireframe renders: \[链接隐去\]  
     
   I’m also open for freelance work \(props, buildings, low poly characters\).  
     
   \[图片省略\]12\_Pagoda\_01\_hero1920×1920 233 KB  
     
   \[图片省略\]Samurai\_01\_hero1920×1920 143 KB  
     
   \[图片省略\]01\_Island1920×1080 351 KB

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Guards in the Shadows  
     
   Two guards in the shadows,  at night in Athens. The image is very contrasty and noisy, and I do not find it particularly successful technically, but I find it interesting to work with.  
     
   My intention was mainly to bring out the figures. I would be curious to know how you would have developed it, and I am open to any direction.  
     
   IMG\_9951.CR2 \(11.7 MB\)  
     
   \[图片省略\]IMG\_99512250×3379 4.67 MB  
     
   This file is licensed Creative Commons, By-Attribution, Share-Alike.

2. **发言者 2**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   in the shadows, at night  
     
   This I think gives a hint in which direction it should go. A night shot which looks like bright day isn’t what I would do. The picture gets in my eyes flat and a bit boring, even though you captured a really nice moment. So I embraced darkness.  
     
   \[图片省略\]IMG\_9951\_022000×2894 864 KB  
     
   IMG\_9951.CR2.xmp \(17,1 KB\)

3. **发言者 3**（回复第 1 条）：\[图片省略\]IMG\_99511342×1920 860 KB  
     
   IMG\_9951.CR2.xmp \(11.3 KB\)

4. **发言者 4**（回复第 1 条）：\[图片省略\]GreekGuards\_PIX1572×2058 571 KB  
     
   Tried to replay 发言者 2’s render…  
     
   More pictures of the Evzones here: Presidential Guard \(Greece\) - Wikipedia

5. **发言者 5**（回复第 1 条）：You might go b&amp;w and bigger contrast. But it’s looking for the extremes of what can be done.  
     
   \[图片省略\]IMG\_9951\_0\_01999×1440 222 KB  
     
   IMG\_9951.CR2.xmp \(24.0 KB\)  
     
   Or the opposite direction, less graphical  
     
   \[图片省略\]IMG\_9951\_0\_02999×1440 209 KB  
     
   IMG\_9951.CR2.xmp \(23.5 KB\)  
     
   Or a mix of both worlds  
     
   \[图片省略\]IMG\_9951\_0\_03999×1440 241 KB  
     
   IMG\_9951.CR2.xmp \(43.9 KB\)

6. **发言者 2**（回复第 5 条）：I like the first one.

7. **发言者 4**（回复第 6 条）：I like their shoes… :slight\_smile:

8. **发言者 6**（回复第 1 条）：Embracing the shadows  
     
   \[图片省略\]IMG\_99511318×1979 642 KB  
     
   IMG\_9951.CR2.xmp \(7.1 KB\)

9. **发言者 7**（回复第 1 条）：Newspaper print  
     
   \[图片省略\]IMG\_9951899×1080 461 KB  
     
   IMG\_9951.CR2.xmp \(16.2 KB\)  
     
   \[图片省略\]IMG\_9951\_01899×1080 493 KB  
     
   IMG\_9951\_01.CR2.xmp \(14.6 KB\)

10. **发言者 5**（回复第 6 条）：Something went wrong with the direction of the shadow :slight\_smile:  
     
   That gives it a bit aery look.

11. **发言者 8**（回复第 1 条）：No xmp included for this image as I was experimenting with the okeinla AI denoising option available for downloading to DT 5.7. It was purely a denoising exercise for me.  
     
   \[图片省略\]IMG\_9951\_raw-denoise1331×2000 531 KB

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Re: \[閒聊\] 黃仁勳偷吃原因  
     
   \[引用未收录发言\]  
   : 如題  黃仁勳的偷吃對象  
   : 也不是啥大美女  
   : 他偷吃也不是因為老婆不正  
   : 也不是因為老婆不會賺錢  
   : 所以可能是想要工作上有人陪？  
   : 那台灣很多夫妻不就GG  
   : 除非有在一起工作的話  
     
   間諜就是被特訓過的，他們對於人性的掌握特別敏銳．  
     
   就像海王跟海后．  
     
   中共派了很多美女間諜這種東西在美國的政界商界，  
     
   台灣、日本也是．  
     
   所以台灣人應該警惕，這時候破獲這些案子，是否跟2027年習近平打算犯台有關？

2. **发言者 2**（回复第 1 条）：如果是醜女間諜的話....

3. **发言者 3**（回复第 1 条）：我消息是2026犯台，你消息錯的吧！

4. **发言者 3**（回复第 1 条）：我去年得到消息是2025有可能犯台，

5. **发言者 3**（回复第 1 条）：今年2026有可能犯台，請跟上中共犯

6. **发言者 3**（回复第 1 条）：台資訊好嗎？

7. **发言者 3**（回复第 1 条）：你資訊不跟上，沒準備好，別說我沒

8. **发言者 3**（回复第 1 条）：提醒你，好人很難做耶。

9. **发言者 3**（回复第 1 条）：大家一定要提高警覺，拜託各位了

10. **发言者 4**（回复第 1 条）：那你明年就會得到消息是2027犯台了

11. **发言者 4**（回复第 1 条）： 後年的消息是2028

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Sa. \(07.11.\) Ränkespiel von Maurice Weber  
     
   Moin,  
     
   heute ab 16 Uhr ist Nils zu Gast beim Ränkespiel\!  
     
   Der Stream ist auf den 某社区 TV Kanälen zu sehen und wird sich bis in den späten Abend ziehen.  
     
   Es wird Crusader Kings 3 gespielt und Nils kann mit Maurice, Sep von den Piets, Steinwallen und Copeylius Intrigen spinnen.

<!-- samples:end -->

