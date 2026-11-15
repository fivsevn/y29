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

<!-- intake-request:intake-1ea3f3c5994e4ae794c5299fc19958f1 -->
<!-- samples:start -->

采集时间：2026-11-15 16:04:23（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：“Al uvedkommende motortrafik forbudt” – destination eller private?  
     
   Hvordan tagger man bedst disse adgangsregler, som er skiltet et lille stykke inde i skoven på østsiden af Tange Sø \(lidt syd for Gudenåcentralens Plantage\):  
     
   \[图片省略\]IMG\_20261114\_1431333781500×2000 1.6 MB  
     
   Der ligger nogle få huse langs vejen inde i skoven.  
     
   Jeg regner med, at det skal være enten:  
     
   motor\_vehicle=destination  
     
   bicycle=no  
     
   horse=no  
     
   foot=yes  
     
   eller  
     
   motor\_vehicle=private  
     
   bicycle=no  
     
   horse=no  
     
   foot=yes

2. **发言者 2**（回复第 1 条）：Er det ikke bare reglerne for privat skov &gt; 5 ha? Så man kunne måske også skrive:  
     
   bicycle=yes  
     
   foot=yes  
     
   dog=leashed  
     
   motor\_vehicle=private  
     
   dvs. hvis adgangen blot følger lovgivningen \(Naturbeskyttelsesloven § 23\)?  
     
   Skal alle stier og veje mærkes i skoven, eller er det underforstået ved privat skov?

3. **发言者 3**（回复第 1 条）：motor\_vehicle=destination  
     
   bicycle=no  
     
   horse=no  
     
   foot=yes  
     
   Respekter hvad der står på undertavlen. Tvivlsspørgsmål kan besvares af fredningsnævnet.

4. **发言者 2**（回复第 3 条）：Jeg kan godt læse hvad der står på skiltet; men tænkte, at lovgivningen gik forud for skiltningen?  
     
   Når jeg er i tvivl, sender jeg gerne spørgsmålet til \[链接隐去\]

### 讨论 2

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

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：我的 Claude 在前天弹出 portal 验证，当即用护照进行了验证，但是已经 48h 以上了还一直在验证中，提示正在检查。有没有 网友知道啥情况吗？

2. **发言者 2**：13 号刚注册了新号，就弹 KYC 了，14 号用护照过了，暂时还没被疯，过几天开个 Pro 试试😂

3. **发言者 3**：发言者 2   
     
   Claude 有 2 种身份认证：  
   身份认证：新号刚注册、订阅时随机触发，用大陆护照可以随便过。  
   门户认证：日常使用过程中风控触发，用大陆护照秒封。  
     
   后面日常使用，应该还会碰到门户认证，我有 2 个老号，都被到了门户认证。

4. **发言者 4**：claude team 含金量上升了, 只需要过一次

5. **发言者 1**：补充点背景，pro，美区 AppStore 支付，谷歌账号注册，全都是 10\+年以上账号，Claude 初次注册使用 23 年，开 pro 也才一个多月...

6. **发言者 4**：23 年的 3 个老号,跳了两个 kyc. 账号都是轮流 5max, 20max. 所以这一波是真的恨.

7. **发言者 5**：发言者 3 你怎么过门户的，求推荐

8. **发言者 3**：发言者 5 淘宝/论坛上有人代过，不过包退款。我找的是 600 块，不过退款。因为是公司同事一起用，所以也没太在意这个价格了，只要能过。\[链接隐去\]   
     
   好像最低的 300 就行

9. **发言者 6**：\+1 我的也已经超过 48h

10. **发言者 2**：发言者 3 门户认证是指 Cyber Verification 吗

11. **发言者 7**：当下就能验证出结果吧

### 讨论 4

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

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Rento Knitted Hoodie  
     
   Hi friends- can someone help me with this pattern, I think I’m doing it wrong.  
     
   I finished step 1, ending on a WS row. Then I started step 2 with chart I with the first row \(RS\) being P2 \(K1,P2\) to the end, 2nd row all purls, third row same as row 1 and then repeat 2 and 3.  
     
   Is that right, and if not, can someone tell me what I’m doing wrong? I’ve never used a chart before.  
     
   thank you so much in advance\!  
     
   Pattern: Novita Isoveli: Rento knitted hoodie

2. **发言者 2**（回复第 1 条）：That looks like the comfiest hoodie ever\!  I hope we get to see a pic when you’re done with it\!

3. **发言者 1**（回复第 1 条）：Thank you\!\!

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Re: \[閒聊\] 吃辣到底要怎麼訓練  
     
   忽然想到有這篇文的存在  
   來更新一下  
     
   已能吃辣  
     
   無他，惟手熟爾  
     
   \[引用未收录发言\]  
   : 標題: \[閒聊\] 吃辣到底要怎麼訓練  
   : 時間: Tue Nov 30 18:27:00 2021  
   : 　  
   : 我這個月才挑戰肯德基上校炸雞成功  
   : 好啦承認有一點辣吃起來比較提味  
   : 　  
   : 想說麥當勞應該也行吧  
   : 特價套餐只有辣雞翅我還是點了  
   : 　  
   : 結果辣到吃什麼都只剩辣味  
   : 舌頭又麻又痛，連可樂都變難喝  
   : 　  
   : 好痛苦……  
   : 為什麼我要花錢來折磨自己呢  
   : 　  
   : 每次都跟我說吃辣可以訓練  
   : 痛覺要怎麼訓練啦  
   : 　  
   : --  
   :

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: OpenAI Astra post-launch slump?  
     
   Anyone frustrated with GPT-6 Astra lately? The quality swings wildly from session to session. It feels like the backend is silently redirecting to Luna or other models. I wasn't aware OpenAI did this, but now it makes so much sense because some of the answers and performance read very much like a different model.Lately it misses obvious details in the code, only to say "oh yeah, I should have mentioned that\!"I explicitly tell it to look at the code in the context, then I start to realize it's making generalizations. "oh yeah, I should have answered from the code\!"The frustrating aspect is that the items listed above are like models from 6-12 months ago. Astra is absolutely amazing and shouldn't perform this way.

2. **发言者 2**（回复第 1 条）：Quite honestly 6-Astra has disappointed ever since Opus 5.5. It makes assumptions without clarification, burns through weekly quotas and just feels slower and more clunky. 6.1-Sol seems to have the right balance of quality for price/usage.I start everything with an Opus 5.5 first step and maybe have 6-Astra review on High effort.

3. **发言者 3**（回复第 1 条）：Why are the OP and /某参与者 talking about Luna?Sol is the next biggest model and pretty good, Luna isn't even in the conversation?

4. **发言者 4**（回复第 1 条）：After using Claude extensively for about 9 months, last month I let my subscription lapse and tried out OpenAI instead.  It was fine to start but then I noticed quality issues and just needing more rework time than I was accustomed to with Claude.  This month I switched back to Claude.  I will say it's much better at writing code comments than Claude - I can't stand the way Claude writes comments.

5. **发言者 5**（回复第 3 条）：Astra is more like an agentic manager model that delegates to smaller models like Luna. Similar with Fable/Mythic.Sol is more of a smarter model compared to Astra, designed for small pulses of work.This is speculation, but it's how it feels like it works. OpenAI is known for its misleading naming conventions.

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Let Me Let You Own Your Data

2. **发言者 2**（回复第 1 条）：There was WebSQL Database, but Mozilla and Microsoft conspired to kill it and replace it with the far, far inferior IndexedDB back when they still had some relevance to web standards. But in any case an in-browser database is not something durable enough \(e.g. proper backups\) to rely on for users' critical data.

3. **发言者 3**（引用未收录发言）：Offhand I know that Azure blob storage happens to include an API for block IO \(i.e. like a SAN or like EBS\) and some other primitives you could use for a VFS but I can't remember what they all are  
     
   but S3 only does immutabl-ish object storage, by which I mean you can overwrite an object but iirc you have to overwrite the entire thing; last I checked you can't just overwrite part of an object in S3

4. **发言者 4**（回复第 1 条）：Related: \[链接隐去\]

5. **发言者 5**（回复第 1 条）：One option that's worth considering here is GitHub. Private repos are free, and you can OAuth with a user's GitHub account and store data directly in their own repo.  
     
   The downside is that most non-technical users don't know what "GitHub" is and sending them through that signup is weird.  
     
   If your users are likely to have GitHub accounts already it could make an excellent backend for storing data.

6. **发言者 6**（回复第 1 条）：I feel like there's a contradiction in requirements here. Either the user lets us hold their data \(i.e. we throw it all in a DB\), or they hold it on their device \(and lose cross device sync\), or they tell you how to get it \(and log in/provide keys for some other provider\).  
     
   I bet it could be done with cryptography somehow, but that has its own issues.

7. **发言者 7**（回复第 1 条）：Couldn't you store the user's data as an encrypted blob in some public place?  
   Queries like sqlite/duckdb can run locally on the browser.  
     
   Cross device sync is a QR or a way to share the private key \(\+password optinally?\)

8. **发言者 8**（回复第 1 条）：Not advocating for it \(never used it\) but a user being able to "have" their own data is party of Tim Berners-Lee's Solid project.   
     
   \[链接隐去\]  
     
   I've always meant to spend some time looking into it.

9. **发言者 9**（回复第 2 条）：My understanding is that WebSQL was killed because the spec was just "whatever SQLite does", so it was hard to have it be a web standard.

### 讨论 9

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

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How to tag a threapist locations name?  
     
   I want to add my therapist’s office, but the office does not have a name. is it acceptable to add the name of my therapist or leave it blank?

2. **发言者 2**（回复第 1 条）：Sure, you can just add noname=yes \(Tag:noname=yes - OpenStreetMap Wiki\).  
     
   Or leave it blank, but maybe then someone else will add a generic name :slight\_smile:

3. **发言者 3**（回复第 1 条）：One other thing you could do it add the name of the doctor, and also add named:signed=no \(Tag:name:signed=no - OpenStreetMap Wiki\) to denote that there’s no sign with the doctor’s office name.

4. **发言者 4**（回复第 1 条）：I do usually use the name of doctors and therapists in the name field. It’s what is written on the sign and I don’t see a reason why I should make the tagging more complex than necessary.

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Sweet Little Art Dolls  
     
   \(Tutorial added: Art/Scrapy Doll Tutorial \)  
     
   I made these dolls years ago, maybe 2018 or 19,  for our church craft fair, and they were well received.  
     
   So it was time again to use up some scraps. I made 10 dolls, each about 12" tall, with their bodies 6.6" tall. I had so much fun mixing and matching colors.  
     
   \[图片省略\]20261107\_1636141920×1848 809 KB  
     
   \[图片省略\]20261107\_1637271920×1617 754 KB  
     
   \[图片省略\]20261107\_1636491920×1766 761 KB  
     
   \[图片省略\]20261104\_1239211920×3413 1.25 MB  
     
   \(Tutorial added: Art/Scrapy Doll Tutorial \)

2. **发言者 2**（回复第 1 条）：Those are adorable\! I love the patterns you chose and their faces are great.

3. **发言者 3**（回复第 1 条）：Very cute\!

4. **发言者 4**（回复第 1 条）：They are adorable\! Are you using a specific pattern?

5. **发言者 1**（回复第 4 条）：I made the pattern myself. It is pretty simple, Front/back, arms, and legs. Well, I do a head/body thing. I’ve used the same poor homemade paper pattern for years, it is getting limp and tattered. If any one wants a tutorial, I could make them.

6. **发言者 5**（回复第 5 条）：Love them. And a short tutorial would be lovely. I have sooooo much fabric. Thanks.

7. **发言者 6**（回复第 1 条）：Cute, cute\!  
     
   I bet all 3 of my grands would like these\!  
     
   I vote Yes on a tutorial

8. **发言者 7**（回复第 1 条）：Nice\!  What do you stuff them with? \(I feel like I’ve seen similar things both as light weight rag dolls and as weighted dolls that can sit up.\)

9. **发言者 8**（回复第 1 条）：This are so dang cute\! The design fits the scrapiness so well. And they’re little faces\!

10. **发言者 1**（回复第 8 条）：Just regular stuffing. I like the idea of a weighted bottom. Thanks.

11. **发言者 9**（回复第 1 条）：They are all so fun and colorful\!

### 讨论 12

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

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：个人评价自己不算五音不全，就是唱不上去，非常挤，还是想学习一下的，也不算特别热爱，不是要非常专业的那种。  
     
   但是从来没线下学过，不知道是不是有很多坑，怎么找靠谱呢？本来之前和同学去星聚会看到好像他们有自己的这种教学，但是网上完全搜不到任何真实评价的感觉，全是广告的样子。

2. **发言者 2**：美团有单节的体验课，一线城市有夜校课，某社区可以搜一搜，可以试试

3. **发言者 3**：别找成人的, 找专业的艺培机构、普通人找那种教小孩声乐专业毕业的科班老师。

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Incorrect asset file name is being exported with glTF from Blender to Godot?  
     
   Godot Version  
   4.7.2  
     
   Question  
   When I export a glTF from Blender to Godot I find one of the exported baked textures files has an old name that was discarded and now not used in any of the resources included in the Blender file?  
     
   I have quit both apps, looked through all data including orphan data in the .blend file, and re-exported the glTF. When I open Godot one of the newly imported assets shows a name not in the Blender file anymore. It’s easy enough to change the file name but if I re-export or re-import the glTF again one of the file resources has the old name.  
     
   Is this a bug in the glTF exporter for Blender 4.5? I will try it again in Blender 5.2 on another machine.  
     
   Thanks

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：我的小众怒点：说话时发现喉咙里有痰影响发声时我会很怒，怒得想直接撕开喉咙把痰打死\( \`\_っ´\)

2. **发言者 2**：不小众  
     
   因为我也是\(;´Д\`\)

### 讨论 16

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

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：loom knitting  
     
   I’m making scrubbies with cotton yarn and the nylon yarn, on a loom.  Does anyone else do that?  I have a problem with pulling the first cast-on loops up to the last cast-on loops, in order to sew the scrubbie together.  I can’t truly see the first cast on loops, so it ends up looking a little stretched out.  Does anyone have suggestions about how to mark each cast on loop so it’s easy to pull it up to the last cast on loop? \[链接隐去\]

2. **发言者 2**（回复第 1 条）：First, I don’t loom knit so I’m not sure I understand the problem.  Could you put a removable marker in the first ewrap and pull the marker up with both strands of yarn?  If that worked would you need a marker in every loop?

3. **发言者 3**（回复第 1 条）：The video shows what needs to happen at 7:55.  I don’t loom knit either, but I think 发言者 2 has a good idea. Maybe put a clippy marker in every 4th stitch? Then at least you could be sure things were lining up properly.

4. **发言者 4**（回复第 1 条）：I can’t help with your question other than what has been said. Maybe a marker on each cast on stitch before starting row 1.  
     
   Otherwise, maybe try a different tutoral?  This one is sewn in a way which looks easier to me. There are probably several methods you could try and one might suit you better.  
     
       
       \[图片省略\]

5. **发言者 1**（回复第 3 条）：yeah, that is a good idea, and I’m kind of doing that now, with red yarn.

6. **发言者 1**（回复第 4 条）：Oh, EXCELLENT\!  She doesn’t hook the bottom loops with the first loops.  She just uses the anchor string and pulls the original side together.  Oh good\!  Thank you \!\!:raising\_hands: :peacock: :sun\_with\_face: :smiley:  
   Heading

7. **发言者 4**（回复第 6 条）：You’re welcome. Hopefully you can enjoy making with the different method rather than getting frustrated with it.

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[心情\] 絕子絕孫  
     
   絕子絕孫  
   也好過拿著不公不義  
   傷天害理的錢  
   養育下一代  
     
   你有臉跟你的孩子說  
   你靠那些傷天害理的行為賺錢嗎  
     
   你敢嗎  
     
   還是  
   其實你的孩子  
   也在做同樣的事情

2. **发言者 2**（回复第 1 条）：蛤什麼臭俗辣 我跟你講啦 孔子是韓

3. **发言者 2**（回复第 1 条）：國人 那申敏兒是辣台妹啦 幹

4. **发言者 3**（回复第 1 条）：問題是很多不同立場的人對於 不公

5. **发言者 3**（回复第 1 条）：不義傷天害理的定義不同

6. **发言者 3**（回复第 1 条）：例如鐵軌難題 有人覺得為了救五個

7. **发言者 3**（回复第 1 条）：人去犧牲一個人是正義 我覺得那是

8. **发言者 3**（回复第 1 条）：不公不義

9. **发言者 3**（回复第 1 条）：有人覺得廢死是正義 有人覺得那是

10. **发言者 3**（回复第 1 条）：傷天害理

### 讨论 19

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: A blog on how computers work from scratch \(1\)  
     
   I started learning and writing up this blog in my own words, combining multiple resources until I feel comfortable in my understanding and then writing them down on my own. No AI here \(other than help during the learning\). This is article 1 of the series.Started understanding the flow of things from wall outlet, I know I skipped the things around how sand turns into a chip, but it would have gotten very long, maybe a story for another time.Looking for some feedback.

2. **发言者 2**（回复第 1 条）：&gt; Looking for some feedback.I would really suggest starting with an overview of the whole process you want to cover, before drilling into details. I mean that both for the whole series as well as on a per-article basis.

3. **发言者 1**（回复第 2 条）：yeah that's a very good point, thank you\!

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Kildall's algorithm  
     
   &gt; I work on a new \[Common\] Lisp compiler called Cleavir. Cleavir is the compiler part of Dr. Robert Strandh’s project, SICL

2. **发言者 2**（回复第 1 条）：Kildall's better known for his work on APL.

3. **发言者 3**（回复第 2 条）：Gary Kildall is \*far\* better known as the cofounder of Digital Research and creator of the CP/M operating system

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Not seeing output on serial monitor  
     
   \(topic deleted by author\)

### 讨论 22

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

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Speaker cable  
     
   Time to replace 20 year old naim cable. After a lot of digging am thinking Turrelium q silver iii.    Thoughts &amp; comments appreciated.

2. **发言者 2**（回复第 1 条）：Nothing wrong with 20 - year old NACA5. In fact, it should now be just about run in\! Just cut off the ends and have it re-soldered to new Naim SA8s - job done.  Use the money you saved to buy more music.

3. **发言者 3**（回复第 2 条）：Seconded.

4. **发言者 4**（回复第 2 条）：\[图片省略\] 发言者 2:  
     
   In fact, it should now be just about run in\!  
     
   It’s funny because it’s true.

5. **发言者 5**（回复第 1 条）：Third vote for cut/re-terminate.

6. **发言者 6**（回复第 1 条）：Follow Richard’s advice, there is no need to buy a new cable.  
     
   :slightly\_smiling\_face:

7. **发言者 7**（回复第 1 条）：I have no idea how old my NACA 5 is. It does have the latest plugs now; I can’t remember when these were put on.

8. **发言者 8**（回复第 1 条）：Looks like you can start enjoying your system now that the Naca are run in after 20 years :rofl:

9. **发言者 9**（回复第 1 条）：For that matter my 40 yr old NACA4 still works great. It’s what I use for my Atom and Dynaudio Audience 52SE speakers. It came with my CB 42.5/HC/140 originally.  
     
   I still use my NACA5 7m pair on my main system. This weekend I have a Boulder 866 integrated amp in the house on loan. I plan to use my NACA5 with it, but I have to change the amp ends from banana to spade connectors.

### 讨论 24

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

### 讨论 25

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Projection has bad color quailty - where to begin searching for solutions  
     
   I’m participating in an event where jpg images and videos that looks fine on a mac, are at the same time projected on a screen with bad outcome. There are areas with a strange yellow in highlight areas and some magenta colors – that make me think of clipped colors and out of gamut issues \(issues I have previously encountered in posts in this forum only\). There is also some strong hard step \(banding\) effects in transition in highlights.  
     
   This kind of problem has not been there before with this projector, so I guess it has something to do with the communication between the mac and the projector.  
     
   I believe the mac software is fairly standard.  
     
   Nobody else here seems to know what to do to correct the error, and neither I know  about \(macs and\) color profiles etc, that I guess is the problem.  
     
   Can anybody give me a tip where we should start searching the problem?

2. **发言者 2**（回复第 1 条）：Most of the time the manual of the projector helps. At least if it isn’t a cheap office projector.

3. **发言者 3**（回复第 1 条）：I suspect some other user has modified the projector’s settings. See if you can tweak the projectors colors, contrast and brightness to better replicate your expectations. This is probably a common issue with shared resources.

### 讨论 26

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

### 讨论 27

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Replies from Claude are unavailable on your account. You can complete the verification now in the Anthropic Verification Portal.  
     
   7 月注册的 用了三个月 pro 套餐 不编程 只在 ios 手机客户端问问题，美区礼品卡订阅。固定 winpc 新加披节点 昨晚建了个代谢报告的项目 就被谈门户验证了，看了诸多案例，在犹豫是自己中国护照验证，还是淘宝外援，这次验证过了是不是能消停很久？ 里面存了很多项目、记忆 不像重新开号。

2. **发言者 2**：Portal 护照会秒封，充值时的 Personal 认证可以用护照。

3. **发言者 3**：会秒 感觉是玄学

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Modeling and rigging needed  
     
   hello im making a Roblox game called Facility after hours and its a horror asym game  
     
   i really would like help with modeling and rigging and this project could be fun\!

### 讨论 29

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Editor Suggestion: De-emphasize nodes without scripts or unique names  
     
   As much as I really enjoy Godot’s UI nodes, actually having to work in a large enough UI scene is dreadful because my eyes gloss over all of the compositional nodes in a tree.  
     
   \[图片省略\]image391×443 20.1 KB  
     
   It would be really nice to de-emphasize nodes under certain conditions, such as  
     
   Non-script nodes  
     
   Non-unique nodes  
     
   Non-named nodes \(node name matches node type, “VBoxContainer”\)  
     
   Example:  
     
   \[图片省略\]image391×443 20 KB  
     
   I’m thinking about including options for this under the scene tree dotted menu, probably a new section with three new checkboxes  
     
    Emphasize named nodes  
     
    Emphasize scripted nodes  
     
    Emphasize unique nodes  
     
   \[图片省略\]image543×276 23.4 KB  
     
   Posting this for feedback/comments, do yall think this would be a good improvement for the editor?

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：最近压力有点大，突破记录了一天飞了二十次\( TдT\)

2. **发言者 2**：铁公鸡啊\( ﾟ∀。\)

3. **发言者 3**：\( ﾟ∀。\)真金枪不倒

4. **发言者 4**：二……二十次？真的不会炸膛吗\(\|\|\|ﾟДﾟ\)

5. **发言者 5**：不是哥们不相信你

6. **发言者 6**：我一天撸两次鸡鸡都会涨得痛，你们这种一天十几次的到底怎么做到的

7. **发言者 7**：致敬中国传奇机长\( \`ー´\)7

8. **发言者 8**：枪皮还好吗\( ﾟ∀。\)

9. **发言者 1**（回复第 6 条）：\[引用第 6 条\]  
     
   有中场休息啊\( ´\_ゝ\`\)就是现在时不时小腹胀痛

10. **发言者 9**：多少？\(　д \) ﾟ ﾟ

11. **发言者 10**：我三次就晕了\(\|\|\|ﾟДﾟ\)  
     
   四次就会影响到第二天  
     
   20次……感觉我会死在屏幕前

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 男人需要的是陪伴@@？  
     
   我聽大家說  男人需要的是陪伴  
     
   不過黃仁勳　吃了好幾個  
     
   有沒有可能他很怕寂寞？  
     
   事業能力這麼好的人！可能到哪都想要有人陪？⊙o⊙  
     
   這樣就一點都不會寂寞惹  
     
   有沒有窩悶透可？

2. **发言者 2**（回复第 1 条）：我需要的是不要來煩我 一個人自由

3. **发言者 2**（回复第 1 条）：的思考時間

4. **发言者 2**（回复第 1 条）：不過可能是我不缺陪伴吧 一般人就

5. **发言者 2**（回复第 1 条）：缺什麼才會想要什麼

### 讨论 32

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Dropbox privacy policy, cause for concern?  
     
   Hi folks,Just received a Privacy Policy update from Dropbox.Noted the following line with concern:“We’ve further explained our collection and use of your data to better identify what data is being used for which purposes.”Anyone have insight into what this entails?Thanks :\)

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Solving the fox game

2. **发言者 2**（回复第 1 条）：I bet using some variant of \[proof-number search\]\(\[链接隐去\] would help a ton here -- either for doing the search, or probably for finding a winning line now that you have the tablebase.  
     
   I'm always happy when I get a chance to bring up PN search -- it's not widely known, but it \*\*dramatically\*\* outperforms minimax specifically for \*\*proving\*\* position values.

3. **发言者 3**（引用未收录发言）：I wonder how long it would take to check whether optimal sheep play from the canonical original position always avoids multijump opportunities for foxes\!

### 讨论 34

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

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Forum dismiss new  
     
   hi \[某参与者\] - it may be me but i think the dismiss new now resets the last read to the end of all threads - in the past i have been able to wait until there were a number of posts on a thread \(eg system pics\) and then read from the last read post to the end now it just goes to posts added since dismiss new

2. **发言者 1**（回复第 1 条）：hi \[某参与者\] i have realised that i selected dismiss all when new was set to all - i need to check i am only looking at topics only before dismissing - just slow in getting used to the new options

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Display the crop value in the closed module in darktable  
     
   \[图片省略\]image374×334 14.6 KB  
     
   Is there a way to display the crop value when it’s applied and the module/accordion is closed?  
     
   It’s sort of the equivalent of the “orientation” property, which correctly displays auto.

2. **发言者 2**（回复第 1 条）：The text shown here is the title of a preset. So just create presets of your favorite crop ratios and name them accordingly. Then, after selecting the preset, the ratio would be displayed.

3. **发言者 3**（回复第 1 条）：Try setting a manual label before saving the preset. Then, the preset will have a manual label, which should be applied when you use the preset.  
     
   Maybe not as convenient as what you’re asking \(you need to define and use presets\), but maybe enough?

4. **发言者 4**（回复第 3 条）：The issue is that a preset saves all the module amounts, so the edited margins as well as the aspect ratio, therefore if you move the crop \(while keeping the same aspect ratio\), youre at different settings than the preset, so nothing is shown

5. **发言者 1**（引用未收录发言）：my point is that after cropping an image, if the module is on, there is nothing telling which crop is applied. In other modules like orientation are showing basic information of what has bee applied. For the crop my suggestion is to use the name of the presets:  
     
   crop 5:4, 4x5, 8x10 - 1.25 or just crop 1.25  
     
   crop freehand  
     
   crop custom  
     
   and so on.

6. **发言者 5**（回复第 5 条）：There are a few variables…one is the crop size, maybe not what you want but it can be added to your info line so you can see the current crop size updated for an image…  
     
   \[图片省略\]image901×309 11.8 KB  
     
   \[图片省略\]image601×199 80.3 KB  
     
   \[图片省略\]image436×236 81.5 KB

7. **发言者 4**（回复第 6 条）：Now all that is needed is to make the image information line do some quick maths…

### 讨论 37

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Umweltzone \(green sticker\)  
     
   Ist das hier korrekt getaggt?  
     
   Way History: Umweltzone Hagen \(846203303\) \| OpenStreetMap  
     
   Bemängelt wird das access=green\_sticker\_germany .

2. **发言者 2**（回复第 1 条）：Laut Wiki ist zu access gar nichts beschrieben: DE:Tag:boundary=low\_emission\_zone - OpenStreetMap Wiki  
     
   Wenn ich mir die anderen Relationen in Deutschland anschaue, scheint das aber durchaus übliche Praxis zu sein.

3. **发言者 3**（回复第 1 条）：Das Problem, so wie ich es verstehe, ist, dass access= sich auf alle Formen der Fortbewegung bezieht. Strenggenommen dürften mit dem derzeitigen Tagging Fußgänger ohne eine grüne Plakette auf ihrer Stirn die Stadt Hagen nicht betreten - und das ist sicher nicht gemeint.

### 讨论 38

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：以前我也是个古法编程的坚定维护者，但随着 DeepSeek Flash 1017 模型的发布，尝试了一下，现在已经离不开 AI 编程了。  
     
   AI 可以自动完成：编码、验证、修复、重构一条龙，再也不需要自己去思考具体逻辑、代码漏洞等问题，最多只需要自己设计程序架构。（甚至也可以让 AI 设计架构）  
     
   不知道从何时开始，我慢慢地也习惯了向 AI 不断提需求、提改动，键盘也开始从从来敲代码变成敲 prompt 了...  
     
   而这一切的代价，就是付费 token ，仅此而已。

2. **发言者 2**：你醒啦，我还以为是半年前呢。

3. **发言者 3**：你醒啦，我还以为 gpt5 要发布了呢

4. **发言者 4**：yes 工程师啦，人主要是做设计优化、做关键决策这些

5. **发言者 5**：你醒啦，我还以为 gpt4 要发布了呢

6. **发言者 6**：我去，不早说

7. **发言者 7**：神仙哪，你再打个盹儿，GPT 12.8 都发布了。

8. **发言者 8**：火星了，哥

9. **发言者 9**：翻译一下：我是一个国企铁饭碗，拥抱 AI 比在座各位晚了一年，又能如何😁  
     
   评论里笑归笑，楼主默默的在那凡尔赛大伙也是一点也不想接招啊😁

10. **发言者 1**：那个莫名其妙的 发言者 9 真的懒得喷，已拉黑。也不知道是生活不如意还是怎样，戾气真重。  
     
   我只是想感叹一下现在的 AI 真的太好用了，还有我过去竟然一直没想要用 AI ，简直是损失啊

11. **发言者 10**：看看吧.  
     
   按照这些天满屏 kyc.  
     
   过段时间 SOTA 崇拜者会发觉彻底被断供了的.  
     
   那时候可能局面会更有意思.

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[Nidimages\] Photo sharing for family and friends  
     
   Nidimages for YunoHost  
   Overview  
   An open-source photo sharing web app to keep your family and friends connected with your adventures and memories. Easy to host: keep your data in your control\!  
     
   \[图片省略\]  
     
   Shipped version: 1.5~ynh1  
     
   Demo: Nidimages - Trains in the wild  
     
   Documentation and resources  
     
   Upstream YunoHost repository: GitHub - YunoHost-Apps/nidimages\_ynh: Package for Nidimages in YunoHost · GitHub  
     
   Presentation blog post: Presenting Nidimages: photo sharing for family and friends  
     
   Upstream app code repository: 发言者 1/nidimages: An open-source photo sharing web app to keep your family and friends connected with your adventures and memories. Easy to host: keep your data in your control\! - 发言者 1's Forge

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Pixels on my sprite are missing and or blurring.  
     
   Godot Version  
   godot-4  
     
   Question  
   Hello everyone\!  
     
   I’ve been having trouble with pixels on my sprites blurring or just completely missing for a while now. I’ve tried to set the texture filter to nearest but that doesn’t seem to do anything and the only solution I have found is scaling the sprite up or zooming in the viewport, both of which doesn’t look good. Any help will be appreciated\!  
     
   \[图片省略\]image266×359 24.5 KB

2. **发言者 2**（回复第 1 条）：Try disabling vram compression in image’s import options \(and then re-import\).

### 讨论 41

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：根据真实事件改编，真实到毛骨悚然！尘封多年的档案，终于搬上互联网！2026年度最恐怖故事，全程高能，吓破你的胆！胆小者慎入！心脏病患者禁止阅读！

2. **发言者 1**：两点了，早点睡吧

3. **发言者 2**：三点了，早点睡吧

4. **发言者 3**：四点了，早点睡吧

5. **发言者 4**：五点了，早点睡吧

6. **发言者 5**：六点了，早点睡吧

7. **发言者 6**：七点了，早点睡吧

8. **发言者 7**：八点了，该起床了

9. **发言者 8**：九点了，该上班了

10. **发言者 9**：怎么时间都这么整齐的\( ﾟ∀。\)

11. **发言者 10**：十点了，该摸鱼了

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Building Lovable for hardware, any suggestions and needs?

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Link Previews and You

2. **发言者 1**（引用未收录发言）：Yeah\! Often "obvious" features have pretty far reaching implications, I know the email image trick is used by both marketers and spammers to identify which inboxes are being read

3. **发言者 2**（回复第 1 条）：Link Previews for a web app are a real stumper. I hate same origin policy so much.  
     
   I can run a server but then I'm leaking things about my users \(what links they are sharing\) to my server...

4. **发言者 3**（引用未收录发言）：I, for one, love posts about bad specs\!

### 讨论 44

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

### 讨论 45

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

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：GPT 高缓不降智低至 0.09 倍率，官 key0.28 倍率，国模 DS 0.09 倍率，满血 ccmax1.1 倍率 包稳不烧心，用了都说好 varai.top

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Rate limit blocking upload  
     
   hey im new here an  i been wanting to make my local area better , i spent 3 hours today  adjusting roads an woods lakes etc as well as  adding new ones that were not mapped . anyway  i cannot upload it i tried josm and the normal site multiple times  with waits in between and i keep getting the same issue . from my searching  i assume its because my account is new but i would like to keep going . but then my edits will be bigger an blocked again. any help would be great . thanks \!

2. **发言者 1**（引用未收录发言）：how small are we talking  ?  i tired this an still get the same issue … maybe im flagged for trying so much i will try an even smaller section tm i guess  
     
   \[图片省略\]Screenshot 2026-11-13 233246822×434 141 KB

3. **发言者 2**（回复第 2 条）：Yeah, that’s definitely too large of an edit for a fresh account. You might have more success doing smaller editing elsewhere first then returning here later.

4. **发言者 3**（回复第 1 条）：Your changesets are currently empty. This might be caused by the rate limit for new users:  
     
   \[链接隐去\]  
     
   What exact error message are you getting when you try to upload? Could you try moving just one node and uploading it immediately to see if that works?

5. **发言者 4**（回复第 2 条）：if you followed some guide: has it advised to make especially initial edits really small? Can you link that guide?

6. **发言者 1**（回复第 4 条）：was error 429 . i  just tried very small sections an it seemed to work , will my rate limit ever raise ? because chopping it in little squares is kind of annoying since each time i have to re copy a section thats already been uploaded to make it accurate

7. **发言者 1**（回复第 5 条）：i didnt follow anything but according to everyone ur first couple of edits  have to be super small . it seems like just  a few feet of trail will get blocked on a new acc

8. **发言者 1**（回复第 1 条）：thanks for the help everyone . i guess the waiting game starts :sweat\_smile:

9. **发言者 1**（回复第 1 条）：my areas are uploading as single nodes instead of an area because i cant copy big enough sections . once my rate limit is higher will it fix or do i have to now go delete the single nodes that arent registering as an area ?

10. **发言者 5**（回复第 1 条）：Help and support mod here - I’ve merged another topic here, since it seems to be the same problem.

11. **发言者 6**（回复第 1 条）：wrong list

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Les p'tits jeux solo de TechDweeb  
     
   Article publié sur : Les p'tits jeux solo de TechDweeb - 某社区.fr  
   Dans ma quête de RPG solitaires \(dont je vous parlais déjà ici\), je suis tombé sur un petit gars plutôt sympathique et débordant d’idées, l’ami TechDweeb, créateur de quelques petits jeux solo minimalistes qui méritent le coup d’œil. « Je n’ai pas de taf, je vis chez ma maman, je fais des vidéos 某社区, et mon chat me déteste ». C’est en…

<!-- samples:end -->

