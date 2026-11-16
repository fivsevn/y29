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

<!-- intake-request:intake-4b6b2f5900ff492ab020f1f32d0b0777 -->
<!-- samples:start -->

采集时间：2026-11-17 04:00:14（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：把随机咳出来的扁桃体结石，鼻腔结石揉开捏碎涂人中上  
     
   wow～

2. **发言者 2**：？？

3. **发言者 3**：\( ﾟπ。\)

4. **发言者 4**：咩

5. **发言者 5**：\( ﾟπ。\)

### 讨论 2

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

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Video render cycle engine  
     
   hii there , you can saport for  fast rendring cycle engine , minimum 1 minute video , my laptop very low , 1 minute video rendring it took 20 hour to render any sugetion for fast rendring , my laptop in 6gb graphic and rtx 4050 but note fast rendring , and rendring time lapto very hiting problem this is solve . thank you so much \!

### 讨论 4

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

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Crocheted Valkyrie Baby Beanie and Rattle Set  
     
   I saw a post in my neighborhood FB group about someone wanting a baby beanie and rattle set made  as custom order for multiple sets. She provided an AI generated photo for what she had in mind. I have 6 sets she ordered and needs to be finished by Dec 25. I am on the third set at the moment.  
     
   This is what I ended up making. The rattle was free hand and the beanie I found a free pattern and the wings were also a free pattern.  
     
   \[图片省略\]10000214981542×2047 387 KB  
     
   I uploaded the photo of my finished set and chatgpt came up with this:  
     
   \[图片省略\]10000214991088×1445 381 KB  
     
   Progress photo  
     
   \[图片省略\]10000215091920×2550 691 KB  
     
   Original photo from the customer  
     
   \[图片省略\]1000021510720×524 89.7 KB

2. **发言者 2**（回复第 1 条）：You really turned her “dream” into reality\!

3. **发言者 1**（回复第 2 条）：She was so excited\! She is in military service and their group are know as the Valkyries and 6 families are having babies soon. The first due this month. She already has the first set with her for the first baby’s arrival.

4. **发言者 3**（回复第 1 条）：So awesome\!

5. **发言者 4**（回复第 1 条）：You are so great at taking an idea and running with it. What a fun and gorgeous set. I love it even more with the background info on what inspired the customer’s request\!

6. **发言者 1**（回复第 5 条）：Me too\! I love the back story to the request. When I created Roger and I had to figure out the differences with that character vs. Luffy, it gave me the confidence to do this request. This was easy compared to what I had to do make Roger\! With all the AI generated crocheted projects there, it’s tough to find patterns since it didn’t originate from someone who actually made it.

7. **发言者 5**（回复第 1 条）：That is really cute\!

8. **发言者 6**（回复第 1 条）：Adorably fierce\!

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Bereinigung alter Adressen nach Umstellung?  
     
   Aus Adressumstellungen \(i.A. Konskriptionsnummern zu Hausnummern\) haben sich im Laufe der Jahre eine Menge alte Adressen angesammelt, die nach Übergangszeit entfernt werden sollten.  
     
   Neben den schon genannten addr:\*:old gibt es vor allem addrN:\* \(mit den Varianten addr:\*Nund addr:\*\_N\) und old\_addr:\*.  
     
   Hinsichtlich addrN ist das wichtig, weil einerseits Nominatim Unterstützung dafür signalisiert hat \(Beitrag\) und das ev. auch Osmand tun könnte \(neuer Suchalgorithmus ab Version 5.5\). In diesem Fall würden untote Adressen wiederbelebt.  
     
   Betroffen sind, neben separaten Adresspunkten,  
     
   Adressen mit addrN:conscriptionnumber: Zweitadressen mit Konskriptionsnummer sind unmöglich  
     
   Adressen mit addrN:place: wenn place ein Ortsname ist, handelt es sich um eine Konskriptionsnummer, siehe oben  
     
   old\_addr:\*: stören grundsätzlich nicht, aber wenn älter als ein Jahr handelt es sich um historische Adressen, die wir dann für immer mitschleppen  
     
   Ich erwähne 发言者 2, weil er viele Umstellungen erledigt hat.  
     
   Ist nicht brandeilig, aber was denkt Ihr darüber, damit man das mal angehen kann?

2. **发言者 2**（回复第 1 条）：AddrN sind nicht unbedingt alte Adressen, in manchen Gegenden wie bspw. Wien hat jedes Eckgrundstück mehrere Identadressen.  
     
   Ich sehe keinen Schaden darin, wenn das irgendwo nicht mehr nur ein strukturierter Hinweis ist, sondern auch gefunden wird.

3. **发言者 1**（回复第 2 条）：So war es auch nicht gemeint. Das addrN-Schema bleibt natürlich und bekommt den \(:N:\*, \*\_N, \*N\)-Zoo dazu.

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Audioquest Rocket 44  
     
   Has anybody experience with these speaker cables? I own now Naims own NAC A5 cables. Is the Audioquest an improvement?  
     
   My main set Naim Supernait 3, Naim NDX 2, Audioquest Niagara 3000 and Sonus Faber Olympica Nova 2.

2. **发言者 1**（引用未收录发言）：Thank you for the replie\! How is the bass? Is it tight or muddy? And are the hights soft?

3. **发言者 2**（引用未收录发言）：Cannot comment on this technical aspect. The dealer who sold the Rocket 44 to me also sold me SN3, was a very experienced Naim dealer and said there is no compatibility issue. My knowledge ends there.

4. **发言者 2**（回复第 2 条）：It is almost 3 years ago, so my memory of the Rocket 44 is not very accurate. If I remember correctly the bass was promninent but also slightly muddy and not very well defined.  The Rocket really shined in the midrange.

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Two little new nuisances in the Siril GUI  
     
   I am using the latest git version of Siril. Since a few month I have observed the following changes in behaviour of the GUI:  
     
   When you hover over the “\+”  icon under “Conversion” with your mouse, the icon gets highlighted with a blue border. When you then click on it, a dialogue to select image files is supposed to open, but it often doesnt. It took me a while to discover that this is because the click area is not the same as the highlighted area. You have to click on the right part of the hightlighted area, the left part does nothing. I cannot say if other clickable icons are affected.  
     
   In pixel math you have the “Sequence List” and you have the presets to fill in to the R, G, B fields.  When you uncheck the “Use single RGB/K expression” set you cursor to the G or B fields, and double-click on a preset, it should be inserted in the G or B field where the cursor is. However, it is always added to the R field.  
     
   Regards, 发言者 1

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：v1.6.0 版本增加的功能：  
     
    1. 增加了主题与配色： Tokyo Night , Catppuccin , Nord , Gruvbox   
    2. 支持桌面某社区分享作为内容入口  
      
     
   下载方式：  
     
    链接: \[链接隐去\]   
    提取码: WOOP   
     
   发布日期： 2026-11-16  
   版本号：  1.6.0  
     
   v1.5.0 版本介绍：  
     
   \[\[链接隐去\]

2. **发言者 2**：已拿

3. **发言者 3**：确定文末 v1.5.0 带的帖子链接是对的？？  
   点击链接调休熬到了这个主题:剪贴板效率工具 jcjcclient 1.5.0 发布  
     
   ???

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Local Mirror for FreeBSD pkgbase

2. **发言者 2**（回复第 1 条）：&gt; This problem started to become very obvious to me when I was converting all of my FreeBSD jails to pkgbase deployments  
     
   Sort of off-topic, but can anyone recommend articles or guides that describe this process?

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: If AI tools are so good, why isn't your bug backlog empty?  
     
   A lot of people outside tech ask me if AI is going to replace programmers and I just think: if that were the case we should be running out of things to doThe bug backlog should be empty and we've caught up to every feature request from PMs to the point that we are bottlenecked on the business sideBut that does not seem to be the case with my own company or most devs I talk to in the industrySo what gives?

2. **发言者 2**（回复第 1 条）：It is empty, for me and my team \(I'm an engineering manager\). We still have a support rotation but it's just so someone is aware they're supposed to respond to any alerts that come up.Edit: product doesn't have a deep backlog either. Usually we can only plan somewhere between a couple days and a month in advance. Major recent product launch so we are longest-horizon we have been for a while.

3. **发言者 3**（回复第 1 条）：Mine is. I've been telling my senior managements that it's cheaper to rewrite stuff from scratch with AI then fix OLD products. They ate that up and everything we have now never reach v1.0 status.

4. **发言者 4**（回复第 1 条）：If you or your company has nothing to build it means they're out of ideas. And if they're out of ideas, they have too many people.That's not a place you want to get to.

5. **发言者 5**（回复第 4 条）：There's always post-mature optimization to work on.

6. **发言者 6**（回复第 1 条）：It's empty for all the projects I'm working on.  Is your team just not putting in the time to fix them?

7. **发言者 7**（引用未收录发言）：&gt; It makes me wonder if it could be solved with better context managementThere's a reason that repos are now bloated with AGENTS.md files that try to cram context in as pre-text. And that there's so many vibe-coded context/memory aggregation frameworks.It's an AI-hard problem.

8. **发言者 8**（回复第 1 条）：Parkinson's Law:"Work expands so as to fill the time available for its completion"\[链接隐去\]

9. **发言者 9**（引用未收录发言）：I was going to say that.  
   Solo projects advance fast now, and bugs are very few.

10. **发言者 10**（回复第 1 条）：Standards are super low, so slop gets approved and no one is checking. We get graded on how many Jiras we close. A bug gets a Jira. So we are doing great\!

11. **发言者 11**（回复第 1 条）：Because just like without LLMs, focus is on delivering new products and features, not on paying down technical debt.

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Sparkfun Thing Plus ESP32-S3 with Adafruit 3.5" 480x320 TFT FeatherWing  
     
   Hello, I am having problem in using the two together. I plugged the Thing Plus board to the back of this display. Then, in the graphicstest\_featherwing, I changed the pin definition as following as the Adafruit Feather and Thing Plus use different pins:  
     
   \#define TFT\_CS   10  
   \#define TFT\_DC   9  
   \#define TFT\_RST -1  
   Adafruit\_HX8357 tft = Adafruit\_HX8357\(TFT\_CS, TFT\_DC, TFT\_RST\);  
     
   However, the screen just shows the white backlight. Nothing else. No graphics nor text. Could you please help to fix this problem?  
     
   SparkFun Thing Plus - ESP32-S3 IoT Board. - SparkFun Electronics  
     
   Adafruit TFT FeatherWing - 3.5 480x320 Touchscreen for Feathers \[V2 with TSC2007\] : Adafruit Industries, Unique &amp; fun DIY electronics and kits

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Rento Knitted Hoodie  
     
   Hi friends- can someone help me with this pattern, I think I’m doing it wrong.  
     
   I finished step 1, ending on a WS row. Then I started step 2 with chart I with the first row \(RS\) being P2 \(K1,P2\) to the end, 2nd row all purls, third row same as row 1 and then repeat 2 and 3.  
     
   Is that right, and if not, can someone tell me what I’m doing wrong? I’ve never used a chart before.  
     
   thank you so much in advance\!  
     
   Pattern: Novita Isoveli: Rento knitted hoodie

2. **发言者 2**（回复第 1 条）：That looks like the comfiest hoodie ever\!  I hope we get to see a pic when you’re done with it\!

3. **发言者 1**（回复第 1 条）：Thank you\!\!

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

1. **发言者 1**：在明明有一堆空桌子的图书馆，非要坐在有人的桌子的到底是什么品种的傻。B\(\|\|\|ˇヮˇ\)我学的好好的来了个人坐我旁边，写字还那么使劲搞得整个桌子都在晃

2. **发言者 2**：你去跟他说啊

3. **发言者 1**（回复第 2 条）：\[引用第 2 条\]  
     
   好主意\( \`\_っ´\)不过我在吃饭的路上了，回去就跟那人说，我非得问问他是脑子有什么毛病

4. **发言者 3**：快进到“我关注你很久了”  
     
   ﾟ∀ﾟ\)σ

5. **发言者 4**：操桌高手

6. **发言者 5**：其实他没在写字，他在桌子底下对你打胶  
     
   而你对此一无所有

7. **发言者 5**（回复第 6 条）：\[引用第 6 条\]  
     
   一无所知

8. **发言者 6**：隔空喊话岛

9. **发言者 7**：后续

10. **发言者 8**：后续呢

11. **发言者 9**：你们做爱了吗

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Robert Pattinson als neuer James Bond bestätigt\!  
     
   \(Thema vom Verfasser gelöscht\)

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Lock window coordinate  
     
   Hey, I’m using Window coordinates in the Shader Editor for a texture projection, and I love the exact look of it. How can I lock/freeze that exact Window projection onto my mesh \(on Frame 1\) so the texture stays stuck to the object when I animate the camera? \(I tried UV Project , but it slightly changed the projection look  
     
   \[图片省略\]IMG\_44503024×4032 2.35 MB

2. **发言者 1**（引用未收录发言）：Thanks a lot, I’ll let you know how it goes :grinning\_face\_with\_smiling\_eyes:

### 讨论 18

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

### 讨论 19

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Anyone using HomeKit cameras alongside a Linux photo workflow?  
     
   \(topic deleted by author\)

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：之前开的 20x，后面高强度蹬 Fable5.2，弹了 KYC 要求去 portal 验证，上传护照过验证后账户立即被暂停，邮件说是违反了支持的地区政策，订阅直接被取消，申诉后目前恢复了，不知道后面还封不封

2. **发言者 2**：中国护照 kyc 的吗

3. **发言者 3**：订阅还在吗？

4. **发言者 1**：发言者 2 对，中国护照首页

5. **发言者 1**：发言者 3 变成 free 了，play 的邮件是被取消且不退款

6. **发言者 1**：发言者 3 android 客户端登录 play 后订阅恢复了

7. **发言者 4**：求申诉小作文

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：What are you doing this week?  
     
   What are you doing this week? Feel free to share\!  
     
   Keep in mind it’s OK to do nothing at all, too.

2. **发言者 2**（回复第 1 条）：Trying to find Europe-based partnerships for Uruky and investors for a different product \(not under the same company because it'll require machine learning\), which needs a good amount of cash investment upfront. Also trying to find some part-time work to help fund the lack of a paying job.

3. **发言者 3**（回复第 1 条）：I am working on a PDF-merging program. This is to merge several pages from different PDF-files into one big page \(not just concatenating the pages after each other\). This is to align several maps produced from AutoCAD into one big map while removing overlapping sections.  
     
   While it's a small project I have learned some new things already about MuPDF and I'm using Raylib for the simple UI.

4. **发言者 4**（回复第 1 条）：Just bought a new computer and I am using it as an excuse to finally move entirely off Windows, so I am setting up Arch and figuring out how to get games working and all that.

5. **发言者 5**（回复第 1 条）：I've been building a DST platform \(similar to Antithesis\) and I'm onboarding a couple of friends so they can test their own systems.

6. **发言者 6**（回复第 1 条）：A place for long-form technical writing \(mostly essays, not a blog\), most likely going to be made with Astro.

7. **发言者 7**（回复第 1 条）：Small stuff at work since I'll be at OSMC for the next few days.  
     
   I like events, but I'm a nervous "leaver" for travels. If I'm on the way I'm generally OK, but I always stress the leaving part :D

8. **发言者 8**（引用未收录发言）：I was thinking about something similar for a while, i will definitely read your writeup :D

9. **发言者 9**（回复第 1 条）：Working with Nordic Thingy-91s. Power profiling with modern batteries is definitely a black magic \(to me\).

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Why is Stripe dashboard so slow?  
     
   We manage our subscriptions through Stripe. As a result sometimes we need to make manual changes from the Stripe dashboard such as updating a subscription, applying some custom discount etc. But it takes ages for the dashboard to load, then some minutes to navigate to our customer, then again a mintute to open the subscriptions. Do you face the same?Do I need to use stripe api to build my own lighter dashboard or is there a better way?

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Unable to install the ESPAsyncHTTPUpdateServer v3.0.0 library  
     
   Because I am trying to use ESPAsyncWebserver,  I have found that in order to do OTA updates, it is neccessary to also use ESPAsyncHTTPUpdateServer. However, when I try to install the ESPAsyncHTTPUpdateServer library \(v3.0.0\) I get this error message:  
     
   Failed to install library: 'ESPAsyncHTTPUpdateServer:3.0.0'. No valid dependencies solution found  
     
   Not come across this one before. Any ideas why its saying there are no valid dependencies?  
     
   I was able to install the older version 2.0.0 library, but when I hit the Update button I get the same error.

2. **发言者 1**（引用未收录发言）：Sorry, don't understand the reason for your question?  
     
   Its a library available via the Arduino IDE. Are ESP32 questions not permitted here?  
     
   \(If not, then I will raise an issue on the Github repository for ESPAsyncHTTPUpdateServer\).

3. **发言者 2**（回复第 2 条）：\[图片省略\] 发言者 1:  
     
   Its a library available via the Arduino IDE  
     
   I'm sorry, I mad a mistake and erase the reply.

4. **发言者 2**（引用未收录发言）：\[图片省略\] 发言者 1:  
     
   there is no ESP32 category  
     
   I've never used an ESP controller but from posts made here I've understood there is one special ESP that has a special category. Most other boards are handled in "Project.....".  
     
   Reading the category description/help usually guides You.

5. **发言者 3**（引用未收录发言）：\[图片省略\] 发言者 1:  
     
   Is it the general wisdom to use Async versions nowadays?  
     
   I never do.  
     
   \[图片省略\] 发言者 1:  
     
   What's the advantage?  
     
   With the ESP32, if the Async versions exploit RTOS and are task based, there could be a speed benefit. For an ESP8266 the difference in method was just that the call to handle\(\) was automatic at the end of loop\(\), so not really any benefit.

6. **发言者 1**（回复第 1 条）：I installed the newer 'Async TCP', i.e the one with the space in between and that seems to have satisfied the compiler. I am now having some difficulty understanding the Async library calls and syntax which I have made the subject of another discussion.  
     
   Thank you for the assistance with this library.

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

1. **发言者 1**：我想操人！！我想操人！！！！我想操人！！我想操人！！！！我想操人！！我想操人！！！！我想操人！！我想操人！！！！我想操人！！我想操人！！！！我想操人！！我想操人！！！！我想操人！！我想操人！！！！我想操人！！我想操人！！！！我想操人！！我想操人！！！！

2. **发言者 2**：\( \*・ω・\)✄╰ひ╯真拿你没办法

3. **发言者 3**：\(\`ε´ つ\*⊂\)真是拿你没办法

4. **发言者 4**：\(´ﾟДﾟ\`\)你不要过来啊

5. **发言者 5**：上面是三种情况

6. **发言者 6**：人有所操

7. **发言者 7**：･ﾟ\( ﾉヮ´ \)

8. **发言者 8**：\(〃∀〃\)  
     
   \(つд⊂\)

9. **发言者 1**：我想操人！！我想操人！！！！我想操人！！我想操人！！！！我想操人！！我想操人！！！！我想操人！！我想操人！！！！我想操人！！我想操人！！！！我想操人！！我想操人！！！！我想操人！！我想操人！！！！我想操人！！我想操人！！！！我想操人！！我想操人！！！！  
     
   我操！！！！！！！！！！！！！！！！！

10. **发言者 9**：我要草你ᕕ\( ᐛ \)ᕗ

11. **发言者 10**：\(;´Д\`\)

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Fr. \(04.12.\) Kneipenquiz  
     
   Moin,  
     
   der Dezember startet mit einem Kracher am Freitag:  
     
   Das Kneipenquiz kommt mit einer neuen Ausgabe ab 20 Uhr\!  
     
   Andreas und Johanna führen durch den Abend und müssen sich durch die „Halbe Punkt“-Chöre durchsetzen.  
     
                 
     
   \[图片省略\]Screenshot 2026-11-13 1832221920×1342 175 KB

2. **发言者 2**（回复第 1 条）：Viertel Punkte…\!\!\! Buuuuh…  2 3/17 Punkte… Yeeeeah

### 讨论 27

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

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：First needle felted project--heart pin  
     
   I saw a needle felted pin with the zipper embellishment and that put me over the edge; I just had to try needle felting. With the encouragement of needle felting master 发言者 2, I embarked on the journey. Here’s my first piece. IRL it is a lighter color than the photo depicts.  
     
   \[图片省略\]image1596×1654 791 KB

2. **发言者 2**（回复第 1 条）：HUrrah\!\! :smiley: :trophy:

3. **发言者 1**（回复第 2 条）：Thanks :heart:

### 讨论 29

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Spotify stopped streaming to ND5 XS  
     
   I wonder if anyone can help please? I have used Spotify Connect for years on my ND5 XS but now i just get the following message when trying to stream via connect.  
     
   \[图片省略\]Screenshot\_20261111-2031541008×2244 222 KB  
     
   My phone is a Pixel 9 Pro XL and I have restarted the network/ND5 XS and phone multiple times, nothing works. Cleared the Spotify Cache etc and still nothing. My wife has a Poco and it connects straight away, suggesting it might be the phone. This has worked for years, but stopped today. Any suggestions would be much appreciated. Please does any

2. **发言者 1**（引用未收录发言）：Thanks Chris, tried my work IOS device and get the same. It looks like whatever has changed is cross platform. I’ll try Naim support.

3. **发言者 2**（回复第 1 条）：My ND5XS is still working. Select Spotify every morning with bated breath :flushed\_face:. But keeping one eye on eBay for cheap NP5s :wink:

4. **发言者 1**（回复第 1 条）：Had contact with Naim Support, it appears Spotify are mucking about with their security protocols which is giving the issue. Hopefully they will find a solution soon, or I’ll have to get a Wiim Mini through the digital port as a workaround \(prefer not to\!\!\).

### 讨论 30

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

2. **发言者 2**（回复第 1 条）：发言者 1 ,  
     
   What does “br” mean regarding the installation path?  
     
   Is it okay to just place the images in \[installation directory\]\\share\\darktable\\pixmaps\\thematic\_images\\

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：号是不是废了，手机端还能登，还能用

2. **发言者 1**：完全自己的号，正常使用了一年了，都是正常充值

3. **发言者 1**：还真是付了钱就不用验证，充值后登上来了。。。

4. **发言者 2**：哈哈哈哈哈哈，大概率估计是不行了

### 讨论 32

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 間諜男子  
     
   \[链接隐去\]  
     
       日本節目專題報導黃老闆外遇事件  
       跑了一趟黃老闆到過的幾家店採訪  
     
       另外  
       五分鐘左右與一位\(前\)中國間諜男子視訊訪談  
       這是能公布的啊  
     
       十五分鐘左右則是現場來賓評論  
       其中東大准教授齊藤先生吧  
       這髮型是...??

2. **发言者 2**（回复第 1 条）：\[链接隐去\]

3. **发言者 2**（回复第 1 条）：\[链接隐去\]

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：This Month in Redox - October 2026

2. **发言者 2**（回复第 1 条）：being able to write Go programs for Redox is amazing. hope they can get it upstream.  
     
   the whole project is amazing.

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: How are you dealing with AI burnout?  
     
   I wonder if anyone else is experiencing the specific type of burnout that comes from working with AI tools. I think there are a couple of reasons that it is different from regular workload burnout.1. It feels that we are more divorced or removed from the day-to-day work and we have less understanding of what we're doing.   
   2. I see that there's not that same sense of accomplishment of building something.   
   3. The volume and the tools that we have to review the changes seem to be inadequate to handle the amount of code and the amount of changes that are happening.I can see it on my teams, how they're dealing with it and trying to come up with a workflow. I can see it on myself as I'm trying to work on my side projects, and it just feels like I'm slowly burning out deeper than before.

2. **发言者 2**（回复第 1 条）：By dealing with tasks sequentially, not concurrently.I feel that now we can spin up agents to tackle multiple projects or tasks at once, we end up context switching more than ever before, which seems like a fast track to burnout.

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Christmas Town: a cozy house and tree decorating game for iPhone, made solo in Godot  
     
   Hi everyone, I’m a solo dev and I just released Christmas Town, a free cozy iPhone game built with Godot. You decorate your own house, yard and Christmas tree in a snowy village, and you can walk around to see what other players built.  
     
   Things I’d love to hear thoughts on:  
     
   The home editor: placing furniture and yard items with a thumb, on a small screen  
     
   Keeping the loading flow honest so the screen never looks frozen on a phone  
     
   Getting Godot’s iOS plugin setup \(.gdip\) working for the store features  
     
   A note on assets: I coded the game myself. Some of the 3D models started from AI tools and I edited them by hand afterwards.  
     
   It’s on the App Store here \(iPhone only\): Yonggari Christmas Town App - App Store  
     
   Happy to answer questions about how any of it was done.

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Does anyone remember this?  
     
   \[图片省略\]Image 2728×717 108 KB  
     
   I miss buying Polaroid film by the case. Not.  
     
   The DSO must have had quite an impact on their business.

2. **发言者 2**（回复第 1 条）：Okay, I guess it is an oscilloscope trace camera\! Good ideas usually have a second lifetime. So it could be a pregnancy ultrasound camera, also\!

3. **发言者 1**（回复第 2 条）：Yeah, anything with a CRT basically. Pretty much everything now can save the image to a thumb drive.

4. **发言者 3**（回复第 1 条）：I remember seeing a Tektronix camera for their oscilloscopes, a bit more boxy and the standard blue color.  
     
   There was also a special camera used for making drivers licenses that used polaroid film. It would expose 1/2 of the picture at a time, so you often had to wait for a 2nd person to have their license made so the film was not wasted.

5. **发言者 1**（回复第 4 条）：\[图片省略\] 发言者 3:  
     
   so the film was not wasted.  
     
   Film cost was definitely a consideration using the HP 'scope camera as well. The Polaroid film packs got pretty expensive toward the end.

6. **发言者 4**（回复第 1 条）：Some of you will know I worked in Telecoms. When I started my apprenticeship in 1977 the meters that recorded call charges were photographed then the photographs sent to the billing department to be read.

7. **发言者 1**（回复第 6 条）：Did you use Polaroid or conventional film?

8. **发言者 4**（回复第 7 条）：I didn't get involved, but, as far as I know it was conventional film.

9. **发言者 1**（回复第 8 条）：That would be my guess as Polaroid would have been very expensive. The early peel-apart version would have been very cumbersome to use as well.

10. **发言者 4**（回复第 1 条）：When was Polaroid invented? I suspect meters were being photographed long before Polaroid.

11. **发言者 1**（回复第 10 条）：Polaroid cameras around 1948. Conventional film cameras definitely preceded Polaroid.  
     
   My parents had this 620 roll film camera in the 40s.  
     
   \[图片省略\]Screenshot 2026-11-16 at 11.08.18 AM858×946 99.9 KB

### 讨论 37

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

### 讨论 38

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\|-\` \)大概多少年后会有安全稳定 100% 没有副作用的近视治疗方法，不想当四眼仔了

2. **发言者 2**：目前反正是没有，之前看到好多案例运气不好后遗症是真的很严重\( ´ー\`\)

3. **发言者 3**：有的有的，等老花眼后近视就正好相互抵消了

4. **发言者 4**（回复第 3 条）：\[引用第 3 条\]  
     
   骗你的，实际上没法抵消

5. **发言者 5**：想要把眼球削掉一块的手术\( ﾟ∀。\)

6. **发言者 6**（回复第 3 条）：\[引用第 3 条\]  
     
   骗你的，远处东西得用老花镜看，近处的东西得用近视眼镜看

7. **发言者 7**：以后ai进行个体定制\(　ﾟ 3ﾟ\)

8. **发言者 8**（回复第 3 条）：\[引用第 3 条\]  
     
   实际上近的远的都看不清

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Do. \(19.11.\) Adventure Abend  
     
   Moin,  
     
   am Donnerstag Abend ermitteln wieder vier Bohnen in einem Kriminalfall\!  
     
   Teilnehmende: Sam, Johanna, Florentin und Andreas  
     
   Start: 20:00 Uhr  
     
   Spiel: Hidden Games: Königsmord  
     
   Setting: Ein Fest auf einem alten Landsitz der Familie König endet mit einem Mord.  
     
   \[图片省略\]Screenshot 2026-11-16 \[数字标识隐去\]×706 39.9 KB

2. **发言者 2**（回复第 1 条）：Gegenprogramm zu GTA. Bin ja mal gespannt ob dadurch mehr oder weniger einschalten

3. **发言者 3**（回复第 1 条）：Oh die Dinger lieb ich \!\!\!

4. **发言者 4**（回复第 1 条）：Ja geil dann ist der Abend gerettet und ich werde nicht schwach schonmal GTA zu spielen.  
     
   Top Besetzung

5. **发言者 5**（回复第 1 条）：Meeega cool. Ich liebe diese Fallakten, vorallem Hidden Games sind echt stark. Hab auch diese schon selbst gelöst, bin gespannt den Bohnen dabei zuzusehen :blush::nerd\_face:

6. **发言者 6**（回复第 2 条）：Vielleicht wird der Mord in GTA VI ermittelt :kappa:

7. **发言者 7**（回复第 6 条）：Uuuuuh ein Revival von  
     
                 
     
   Nice wäre das.

8. **发言者 6**（回复第 7 条）：Cool, das kannte ich noch gar nicht :beanpoggers:  
     
   Muss ich mal nachholen :beannote:

### 讨论 40

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

### 讨论 41

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Earthy kitchen shelf  
     
   This one is for another DIL\! These are her favorite colors, and her kitchen features a similar shade of green. For this project I used: popsicle sticks, a Lego minifig head, leaves from a fake plant, a ceramic tile, nail sticker, mini monopoly house, motherboard parts, hot glue, mat board, scrap paper, a Barbie plate, sculpey, marker, pony beads, jump ring, paint, nail polish, super glue, white glue.  
     
   \[图片省略\]IMG\_70281921×2011 1.38 MB  
     
   Thanks for looking\!

2. **发言者 2**（回复第 1 条）：Another amazing miniature\! Your DIL’s are lucky to receive such detailed and personalized creations.

3. **发言者 1**（回复第 1 条）：Thank you\!\!\!

4. **发言者 3**（回复第 1 条）：This might be my favorite one yet\!

5. **发言者 1**（回复第 1 条）：Thank you\!\!

6. **发言者 4**（回复第 1 条）：Another genius miniature\! You find the most inventive things to incorporate.

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Steven Wilson's New Release: Requiem for a Village  
     
   I know there are a number of folks on here that enjoy Steven Wilson’s various projects so I am interested to see if anyone has any thoughts on his new album which I believe was released last Friday. I have streamed the whole thing several times and I am not entirely sure what I think yet.

2. **发言者 2**（回复第 1 条）：Pretty much the same reaction here, and I’ve held of on a physical copy for the moment. There is some great music and the production is top notch, but I don’t really gel with all the narration.

3. **发言者 3**（回复第 1 条）：I have given it one listen but am yet to decide. I’ll listen more.

4. **发言者 4**（回复第 1 条）：Bought it yesterday \(digital download\) and gave it a spin. Need time to digest and many more listens but my initial impression it’s his best work since The Future Bites. At times it reminded me off unfinished off-cuts from In Absentia-era Porcupine Tree. Promising thus far if a bit staccato.

5. **发言者 5**（回复第 1 条）：It’s ok, if a bit self indulgent….  
     
   I’ve listened many times but I think it’s lacking melody and tempo.  
     
   Beautiful production though as always \!

6. **发言者 6**（回复第 1 条）：Normally a big fan, but very undecided on this one.  
     
   Scheduled 3rd listen for today, but also not shelled out for a physical copy yet…:thinking:

7. **发言者 7**（回复第 1 条）：Was able to get it with quite some discount on Qobuz \(Sublime subscription\)… Jury’s still out, not sure yet if I like it or not. But haven’t had the time to really give it a thorough listen.

8. **发言者 6**（回复第 1 条）：3rd play happening now, no distractions.  
     
   Revised opinion to follow…

9. **发言者 6**（回复第 1 条）：Well, that was a fully uninterrupted listen and I am not blown away by it.  
     
   It’s ok, but I won’t be playing it regularly in the future. There are many other albums of his, in all his various outlets/guises, that I much prefer to this.  
     
   So saying, the CD will be added to the collection for the sake of completeness :face\_with\_peeking\_eye:

10. **发言者 8**（回复第 9 条）：I think 发言者 6 has hit the nail on the head.  I purchased the 3 disc earbook version and unless after multiple plays something clicks then I think this is one of he’s weakest releases in years.

11. **发言者 9**（回复第 1 条）：Only given it one listen. It didn’t really draw me in. I may persevere or I may adopt the life is too short view.  
     
   Cheers,  
     
   Ian

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Custom order - Drag and drop not worling  
     
   I’m using DT 5.6 under Linux Mint Cinnamon.  
     
   Using classic external mouse  
     
   I did manage to custom order a collection but I can’t do it anymore.  
     
   I tryed again and again the whole process described in the manual : collection filters  
     
   in filemanager, filemanager layout  
     
   order time capture \(or any but cusom order\)  
     
   select some pics  
     
   create new tag and attach it  
     
   go to collection &gt; my new tag  
     
   selection → select none  
     
   order → custom  
     
   try to drag and drop without success =&gt; no drag at all  
     
   In culling layout mode I can drag and drop to change custom order in the filmstrip, but I can’t do that on the thumbnails in the filemanager layout  
     
   I’m I doing something wrong ?  
     
   Do I have some strange option checked or unchecked that prevent me to drag and drop in filemanager layout mode ?  
     
   Any tips / help will be greatly appreciated

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：人在海外，看黑五 Marshall Monitor III ANC 打折划算成 RMB 1400 左右，国内我看都要 2200 多，不知道拿下一个是否合适？  
   我手头只有个入耳式耳机\+有线头戴式，入耳式用长了续航一般，且耳道不舒服。我看了下马歇尔好像降噪续航都不错，而且音质也还可以。  
   个人看重：佩戴舒适度&gt;降噪&gt;续航&gt;音质

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 如果可以裸辭 大家最想把時間用來做甚麼  
     
   這幾天剛好跟朋友聊到這個問題  
   他就說他最近請了長假打算去歐洲玩一個月  
   問我如果可以有一段很長的放鬆休息時間  
   我想做甚麼  
   我應該也會想出國散心之類的  
   那大家呢  
   會想做些甚麼

2. **发言者 2**（回复第 1 条）：在家躺平

3. **发言者 3**（回复第 1 条）：裸辭就不能瘋狂跟下屬幹幹嗎 失智民

4. **发言者 3**（回复第 1 条）：主黨 阿勳被搞到失智

5. **发言者 4**（回复第 1 条）：只是不想工作而已，但不會特別想做

6. **发言者 4**（回复第 1 条）：什麼，怎麼辦

7. **发言者 5**（回复第 1 条）：參加短期出家

8. **发言者 6**（回复第 1 条）：想躺平

9. **发言者 7**（回复第 1 条）：環遊世界

10. **发言者 8**（回复第 1 条）：裸辭然後出國個1-2年這種事我幹過了

11. **发言者 8**（回复第 1 条）：前半年是真的爽 後半年開始懷疑自己

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：如果你们是名人的话会高强度自搜吗\( ﾟ∀。\)

2. **发言者 1**：或者是创作者的话会自搜作品吗\( ﾟ∀。\)

3. **发言者 2**：自搜肯定会，高强度取决于作品热度吧\( ﾟ∀。\)

4. **发言者 3**（回复第 2 条）：\[引用第 2 条\]  
     
   初期会高强度自搜\( ﾟ∀。\)后来就平常心了，主要是常常心虚不敢看了

5. **发言者 4**：参考QQ空间的那年今天，我不允许互联网里出现任何关于我的信息

6. **发言者 5**：搜过但0相关\( ・\_ゝ・\)

7. **发言者 6**：不会，感觉会看到不好的信息，然后忍不住下场反驳，最后被群嘲得更惨\( ﾟ∀。\)  
     
   已经目睹过好多类似的事了

8. **发言者 7**：\( ﾟ∀。\)怎么成为名人

9. **发言者 8**：虽然不是鸣人但是被学校公布的信息开盒了

10. **发言者 9**：我觉得应该会自搜一下，强度取决于闲不闲\( ﾟ∀。\)

11. **发言者 10**：我要是Naruto，就不看老婆本子了

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Hilfe beim Kauf von smarten Heizungsthermostaten  
     
   Moin zusammen, ich möchte den Black Friday mitnehmen und unsere Wohnung mit digitalen/smarten Heizungsthermostaten austatten.  
     
   Ich hab da jetzt nur ein paar Fragen. Wir haben keine zwei Geschosse, was mal zwei Wohnungen waren, jede Etage hat ihre eigene Gastherme. Brauche ich dann zwei Basis Stationen? Quasi für jede Therme eine?\!  
     
   Und wir haben so ein analoges Raumthermostat, was per Funk mit der Therme kommuniziert. Wie genau sagen wir denn der Therme, dass sie in Zukunft dann nicht mehr mit dem alten Raumthermostat kommunizieren soll, sondern mit der neuen Basis Station? Das verstehe ich noch nicht so richtig :smiley: Ich hoffe sehr auf euere Hilfe :smiley:

2. **发言者 2**（回复第 1 条）：Geht es nur um Thermostaten die an die Heizkörper geschraubt werden oder Raumthermostaten und die Ventile sitzen wo anders?

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Crochet help  
     
   Wasn’t sure if I can ask a crochet question here or just knitting questions.  
     
   Anyway, I’m trying to crochet a beginner’s scarf but it doesn’t seem to be getting any wider … do rows 3 and 4 mean I should be increasing? I’m new to crochet and am struggling already. Many thanks  
     
   \[图片省略\]IMG\_89151179×772 132 KB

2. **发言者 2**（回复第 1 条）：What is the name of your pattern and designer?  
     
   Yes, it looks like there are increases in rows 2 and 3 where several sts are worked into a single stitch. Then the increase row 3 and row 4 are repeated.  
     
   某参与者 \[某参与者\] 某参与者 Would you help out please?

3. **发言者 1**（回复第 2 条）：Hi thanks for your reply.  
     
   It’s called the Borough Scarf by Stitchberry  
     
   Which bit tells me the increase in row 3 and 4 please?

4. **发言者 1**（引用未收录发言）：Thank you so much :blush:

5. **发言者 2**（回复第 4 条）：Row 3 in the repeat is the increase. Rows 3 \(inc row\) and 4 \(crochet plain with no inc\) make up the repeat. Row 2 which is part of the beginning looks to me to have an inc as well but that is a one time row.  
     
   \[链接隐去\]  
     
   Thanks for the pattern information\!

6. **发言者 1**（回复第 5 条）：Ah ok . I’ve undone it so many times \! Thank you , I will try again

7. **发言者 2**（回复第 6 条）：It’s sometimes \(often\) difficult to get started but once you’re on your way, the rest should go smoothly. Work several repeats and see if the scarf is doing what you predict. If not, come right back. We have some excellent crocheters who are happy to give advice.  
     
   It’s a beautiful stitch pattern and worth the effort.

8. **发言者 1**（回复第 7 条）：I appreciate your help . I’ll give it another go and see what happens\!\! Thank you

9. **发言者 1**（引用未收录发言）：Thank you , I’ll look at the link for the inc/dec help . Hopefully I’ll get there as it does look so nice :blush:

10. **发言者 3**（回复第 1 条）：Every time you put more than one stitch into the stitch below, you are increasing. It looks like you are doing that. The item should be getting bigger. Hope this helps.

11. **发言者 1**（回复第 10 条）：Thank you

<!-- samples:end -->

