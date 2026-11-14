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

<!-- intake-request:intake-dc6868ef33b14b20a80b23573b3dfb99 -->
<!-- samples:start -->

采集时间：2026-11-14 16:00:24（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Sa. \(07.11.\) Ränkespiel von Maurice Weber  
     
   Moin,  
     
   heute ab 16 Uhr ist Nils zu Gast beim Ränkespiel\!  
     
   Der Stream ist auf den 某社区 TV Kanälen zu sehen und wird sich bis in den späten Abend ziehen.  
     
   Es wird Crusader Kings 3 gespielt und Nils kann mit Maurice, Sep von den Piets, Steinwallen und Copeylius Intrigen spinnen.

### 讨论 2

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：以 typora 为核心，参考了 Bear 和飞书文档，做了个原生 markdown 编辑器。  
   主要是不想使用破解的 typora ，其他产品也都不怎么好用，所以造个轮子。  
   永远免费，也永远不挂广告。纯单机，没有任何联网功能。  
   欢迎使用。windows store 里搜“如言”。

2. **发言者 2**：没有 mac 版吗？

3. **发言者 1**：发言者 2 没有，因为我是 win ，主要功能点还是来源于自身需求。

4. **发言者 3**：我更喜欢在 github 上下载后使用.

5. **发言者 4**：windows store 有个问题，之前电脑禁止了更新，它不给我安装

6. **发言者 1**：发言者 3 直接下载使用要签名，不然会被报不安全引起用户担忧。但签名很麻烦，不如直接上传 store 更安全。

7. **发言者 5**：\[链接隐去\]  收录一下

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[求助\] 婚後買房地點選擇  
     
   最近和另一半為了買房地點意見不合，雙方各有考量，想請大家客觀評估。  
     
   一、家庭背景  
     
   \* 夫妻目前育有一名未滿一歲的寶寶，雙方收入相近，未來房款平均分擔。  
   \* 太太目前在 A 地工作，先生目前在外縣市C 地工作。  
   \* 先生工作地附近有低成本的公務宿舍。  
   \* 目前暫住夫家，公婆能協助照顧孩子。  
     
   二、目前考慮的兩個購屋方案  
     
   方案 A：  
     
   \* 太太不需要通勤。  
   \* 先生單程通勤約 85分鐘。  
   \* 房價較低，每坪比 B 便宜約 5 萬元。  
   \* 距離公婆較遠。  
     
   方案 B：  
     
   \* 太太單程通勤約 40分鐘。  
   \* 先生單程通勤約 65分鐘。  
   \* 距離公婆較近，方便長輩協助育兒。  
   \* 房價較高，每坪比 A 貴約 5 萬元。  
     
   以上通勤時間為 Google 地圖顯示的單程車程。  
     
   三、另外有三個重要條件  
     
   \* 公公後年將退休，未來可以協助接送孩子，因此 B 確實有相當穩定的育兒支援優勢。  
   \* A、B 每坪房價相差約 5 萬元，若以一般家庭購屋坪數計算，總價會有百萬元以上的差  
   距。  
   \* 先生表示，約十年後一定可以調任至 D 地（與 A、B 位於同一縣市），只是時間早晚  
   的問題。屆時先生從 A、B 通勤的時間差異不大，而太太若住 A，則不需要通勤。  
     
   四、夫妻雙方的立場  
     
   先生傾向 B：目前通勤時間較短，又能靠近父母，獲得穩定的育兒支援，減輕家庭負擔。  
     
   太太傾向 A：房價較低、自己不必通勤，且考量先生未來確定會調職，長期而言可能更符  
   合家庭的生活與財務規劃。  
     
   五、想請問大家  
     
   \* 如果是你們，會選擇 A 還是 B？  
   \* 是否值得為了後援多付出購屋成本？  
   \* 買房應該優先考量目前的育兒支援與通勤便利，還是未來的長期生活規劃？  
     
   希望大家能客觀分析，不需要刻意支持任何一方，也歡迎有買房、育兒經驗的版友分享，  
   謝謝！

2. **发言者 2**（回复第 1 条）：選A的話太太會願意多照顧嗎? 不會的話選B吧

3. **发言者 2**（回复第 1 条）：不然小孩生病或臨時要處理什麼事情，先生怎麼趕?

4. **发言者 2**（回复第 1 条）：A看起來只有太太爽到，先生傾向B也是為了減輕負擔

5. **发言者 3**（回复第 1 条）：當然是離後援近，雙薪家庭，小孩未來幼稚園生病發燒

6. **发言者 3**（回复第 1 条）：、加班來不及接小孩，後援臨時接送照護，近點方便超

7. **发言者 3**（回复第 1 条）：多

8. **发言者 4**（回复第 1 条）：B

9. **发言者 4**（回复第 1 条）：A最後太太一定會抱怨她每天都要多帶小孩三個小時

10. **发言者 4**（回复第 1 条）：而且85分鐘的單趟通勤到最後你可能會變成當地租房

11. **发言者 4**（回复第 1 条）：然後假日回家

### 讨论 4

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: What is the state of self-hosting email in 2026?  
     
   I mean both on your own server and on cheap but reliable VPS providers like Hetzner?If you self-host email what is your current stack?

2. **发言者 2**（回复第 1 条）：I have self hosted side 2001, mostly opensuse, with postfix, but the IMAP etc has changed over the years, now using dovecot. Yes its a pain, yes it takes effort, but just like some people spend there spare time painting, I run my own email server.

3. **发言者 3**（回复第 1 条）：postfix, dovecot, rspamd on debian stable, with lots of custom configuration. The main problem is not really the server side or getting it set up right, if you know what you're doing, but outbound delivery if you're sending SMTP traffic from any kind of bulk hosting/VPS/VM/colo provider. No matter how impeccable your spf, dkim, dmarc is.

4. **发言者 4**（回复第 1 条）：nixos-mailserver\[0\] \+ ZohoMail as an outbound relay.Works like a charm\!\[0\]: \[链接隐去\]

5. **发言者 5**（回复第 1 条）：Hetzner even has a straightforward guide to setting up a self-hosted mail server:  
   \[链接隐去\] also considering self-hosting email, but pretty much everything I've read suggests that keeping your emails out of spam folders is a huge pain. Still exploring different options.

6. **发言者 6**（回复第 1 条）：Linode and hand the keys to Claude \(in an appropriately limited way\). It sets up dkim, dmarc, spf etc and will guide you through processing dmarc reports. Interestingly it's better than the previous \(hand tuned over 15 years\) setup in that even hotmail manages to receive email now.

7. **发言者 7**（回复第 1 条）：Haven't tried it myself but \[链接隐去\] looks interesting

8. **发言者 8**（回复第 1 条）：Hetzner is not cheap anymore.  
   They tripled their pricing.

9. **发言者 9**（回复第 1 条）：Same. It is not the server or hardware. It is where the email lands and what they do with your email based on the metadata.

10. **发言者 10**（回复第 1 条）：I've been self-hosting for almost 20 years.However, my server went down many, many times for hours without me noticing, sometimes for days.Despite today's outage, it's still more than worth having a third-party company like Google or Microsoft handle your email. At least they have monitoring 24/7 and people on call to fix issues when things stop working.

11. **发言者 11**（回复第 1 条）：Mailserver image on Hetzner

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：So, who's making a Zelda: Ocarina of Time Study deck?  
     
   Seems like the perfect time to be working on one. Lot’s of old, archaic language in there, perfect for study.

2. **发言者 2**（回复第 1 条）：In my native language we have a saying that goes “the best service one can get is self-service”. Time to follow your dreams of deck-building I think

### 讨论 6

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

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：肥母：和其他老头老太太聊天 现在年轻人怎么在家啃老不工作呢  
     
   我：是啊可多了 大环境不好 我这种有班上的你就乐着吧  
     
   母：瞎说 绝大部分都是正常工作的 我身边没看有谁呆家里啊  
     
   ：多了 那个小A疫情期间丢工作 到现在待业3年了 小B卷进XX事丢工作 到现在5年了 小C前年一开始个体单干 后来炒期货 成了老赖 现在还不是在家躺着  
     
   ：你这些是少数极端例子 大部分人都还是上班的  
     
   ：我们家在XX市（某1.5线城市）二环旁边 这些哥们家庭基本都是附近事业单位/高校/企业的 已经远高于平均水平了  
     
   ：行 吧  
     
   辩经赢了老登耶\(＾o＾\)ﾉ

2. **发言者 2**：惨痛的胜利

3. **发言者 3**：惨痛的胜利

### 讨论 8

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

### 讨论 9

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

### 讨论 10

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

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Les p'tits jeux solo de TechDweeb  
     
   Article publié sur : Les p'tits jeux solo de TechDweeb - 某社区.fr  
   Dans ma quête de RPG solitaires \(dont je vous parlais déjà ici\), je suis tombé sur un petit gars plutôt sympathique et débordant d’idées, l’ami TechDweeb, créateur de quelques petits jeux solo minimalistes qui méritent le coup d’œil. « Je n’ai pas de taf, je vis chez ma maman, je fais des vidéos 某社区, et mon chat me déteste ». C’est en…

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Humble bundle vibe update takes out MFA and potentially exposes account info  
     
   I don’t know if anyone here shipped to this humble bundle thing, but it sounds bad for your potential customers.  
     
       
       \[图片省略\]

2. **发言者 2**（回复第 1 条）：I bought there some \[链接隐去\] courses it worked fine.

3. **发言者 1**（回复第 2 条）：Before or after this update? Maybe try and change your password just to be sure? :person\_shrugging:t4:

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Don't bother patching: multiple remote code execution vulnerabilities in Danfoss AK-SM800A

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：OV knooppunt Spaarnepoort, Haarlem  
     
   Gistermiddag tot avond naar deze \(via de Bouwapp aangekondigde\) infomarkt geweest.  
     
   Ter visualisatie hier het bewuste gebied op OSM.  
     
   Ik vroeg me af of de OSM-NL OV-specialisten hier alvast wat info over dit knooppunt willen o.a. welke vervoermaatschappijen dit knooppunt aangaan doen of is deze info net nog te vroeg ?  
     
   Wat ik sowieso weet is dat alle bussen die in deze regio van &amp; naar IJmuiden rijden met de komst van dit OV-knooppunt heel anders gaat rijden.  
     
   Bestuurlijk Definitief Ontwerp OV knooppunt: werknaam was Nieuw Zuid is geworden OV-knooppunt Spaarnepoort.  
     
   Bestuurlijk Definitief Ontwerp herinrichtinginfrastructuur Schipholweg, Haarlem.  
     
   Veel info is al middels de 3 jaar terug gestartte projectnote terug te vinden.  
     
   Mocht er meer info behoefte zijn wil ik de info van gistermiddag &amp; avond graag delen.

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：ADVENT: a 3D character universe  
     
   \[图片省略\]ADVENT character1400×2217 413 KB  
     
   ADVENT is my personal character project mixing dark mythology, street culture and digital fashion. Made with Blender and Marvelous Designer.  
     
   More renders and the full project: \[链接隐去\]

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：WS2812 Led strip - making a color pattern  
     
   Greetings...  
     
   I have Arduino Uno and a Led strip WS2812 with 60 led's on it...  
     
   I need help making a code, so as to have a color pattern on the strip consisting of the following colors...  
     
   Red  
     
   Blue  
     
   Orange  
     
   Green  
     
   Red  
     
   Blue  
     
   Orange  
     
   Green  
     
   Red  
     
   Blue  
     
   Orange  
     
   Green  
     
   and so on all the way to 60'th LED...  
     
   All the lights are supposed to be constantly on, and not in a wave or pulsing...  
     
   If somebody has time to help me, I thank you in advance...  
     
   All the best...  
     
   M.J.

2. **发言者 2**（回复第 1 条）：Welcome to the forum  
     
   Have you managed to set any of the LEDs to any colour, even if it is the same colour for all of them ?  
     
   Which LED library are you using and which Arduino board do you have ?  Have you looked at the examples that come with the library ?

3. **发言者 3**（引用未收录发言）：That's a good start. Try each example, and then look at the code to see if you can easily change it to what you want. You don't need to be very knowledgeable in coding to read the words and get a basic idea. Your problem is that almost all examples will be about what you call pulsing and wave.  
     
   Good luck.

4. **发言者 1**（引用未收录发言）：Thanks, I've tried it... Only first 4 light up and change color every second...  
     
   I need an example of static colors in a pattern to modify...

5. **发言者 4**（回复第 4 条）：\[图片省略\] 发言者 1:  
     
   I need an example  
     
   ???

6. **发言者 5**（回复第 4 条）：\[图片省略\] 发言者 1:  
     
   Only first 4 light up and change color every second...  
     
   Read the comments in the code  
     
   \[图片省略\] 发言者 1:  
     
   I need an example of static colors in a pattern to modify...  
     
   That what I thought I gave you, so please explain in detail what you want.

7. **发言者 6**（引用未收录发言）：Enjoy the free fish.

8. **发言者 1**（回复第 6 条）：The strip has 60 led's, so I need 4 colors to repeat, no blinking, no wave or pulsing, just LED's to be on at all times....  
     
   Red  
     
   Blue  
     
   Orange  
     
   Green  
     
   Red  
     
   Blue  
     
   Orange  
     
   Green  
     
   Red  
     
   Blue  
     
   Orange  
     
   Green  
     
   and so on all the way to 60'th LED...

9. **发言者 1**（回复第 7 条）：发言者 6  
     
   You've made your opinion clear, and I've been polite enough not to comment on it...  
     
   If you don't want to help, please continue to some other topic that interests you more and stop spamming people who are willing to help...  
     
   All the best...

10. **发言者 1**（引用未收录发言）：发言者 7  
     
   Thank you, thank you, thank you...  
     
   You are a life-savior Emily, thank you again so much...

11. **发言者 7**（回复第 10 条）：No problem. Happy to point you in the right direction.

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：KIT COUTURE - FUGLOY FINGERLESS MITTENS  
     
   A question on the chart which I attach as well as the instruction - bear in mind there are 56 stitches cast on.  
     
   Am working on the RH Glove, so according to the chart I start one stitch in.  
     
   Having been asked to mark the 31st stitch, I am confused by the chart instruction: - the repeat asks me to yo p2tog tbl - 4 times - within a 6 stitch repeat.  I work out that if I am to follow the chart I am missing on stitch from that first row, before the 31st stitch I need to knit?  
     
   \[图片省略\]IMG\_8437320×122 13.8 KB  
     
   \[图片省略\]IMG\_8440320×284 30.4 KB

2. **发言者 2**（回复第 1 条）：56 sts  
     
   The 31st stitch is marked.  
     
   The chart for right glove  
     
   1 st, 6×4 = 24 sts, 5 sts = 30  
     
   The next stitch is stitch 31 which is marked.  
     
   The pattern says knit this marked stitch  
     
   Purl 25  
     
   Total 56  
     
   You perhaps got confused and thought you needed to work 31 sts of chart, but just 30 is correct.  
     
   I hope this helps

3. **发言者 2**（引用未收录发言）：You’re welcome.  
     
   We all miss things, sometimes we just need someone else to check something.  
     
   Enjoy the rest of your project.

4. **发言者 1**（回复第 3 条）：Thank you\!

### 讨论 18

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

### 讨论 19

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：24 年年初注册的，将近两年了，刚开始就订阅了俩月 pro 后续一直是 200🔪的，两个落地都是家宽，后期等到了 qqpw 就一直用 qqpw 了，应该不是 IP 的问题。  
     
   说实话作为程序员其实本就知道 claude 有一万种办法精确过滤出中国用户，但是心里不愿意承认，直到今天才面对现实...  
     
   有能力过 kyc 的带价来。

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Tell HN: Google Search to start locking down search behind a login wall  
     
   Usually, when I used Google Search on some ISP CGNAT IP addresses \(not even a VPN\), I usually get countless CAPTCHAs evertime I initiate a new session to Google Search on a new private browsing window \(probably an artifact from residential proxy botnets\).Recently, in addition to that, they started to just lock the entire search results page behind a login prompt on some of those bad IP addresses \(like 某社区 does for some time with the "Sign in to confirm you're not a bot" prompt\). This potentially makes the service less accessible, especially for those using a shared/public computers.I did not even get this prompt on some VPN IPs, and even no CAPTCHAs at all, even with a free one like given by Firefox.Has anyone encountered that? I just encountered this today. It's really unfortunate for the internet to become less friendly to signed-out users, especially since AI scrapers starting to "abuse" the internet for their value.

2. **发言者 2**（回复第 1 条）：I’ve been so very happy with Kagi. I also let my agents use it via API, and it helps them surface a lot of stuff they don’t find without it.

3. **发言者 3**（回复第 2 条）：are there any alternatives to Kagi that don't support the Russian war economy?

4. **发言者 4**（回复第 3 条）：The hardware to support a full tax index would be affordable for most Americans.  The custom software you would need is probably achievable with a couple hundred dollars of tokens.

5. **发言者 5**（回复第 1 条）：Please change your title to something less declarative like某社区: have you encountered increased login-required for Google search results?

6. **发言者 6**（回复第 1 条）：When connecting from questionable IPs \(like VPN exit addresses\) Google has been very paranoid for a long time, I don't try.Unfortunately, the prevalence of scrapers means that anything that could be a scraper is presumed to be so.

7. **发言者 1**（回复第 5 条）：Yes, I think that's a better title \(that I failed to think of when thinking about posting the statement here on HN\). Unfortunately, I missed the submission editing time window.

8. **发言者 7**（回复第 3 条）：Do you have more info on this?

9. **发言者 8**（回复第 1 条）：They already locked it behind a wall of AI and advertisements.

10. **发言者 9**（回复第 8 条）：Seems that Kagi buying data from multiple search providers, including Yandex.

11. **发言者 10**（回复第 1 条）：May as well just use Kagi

### 讨论 21

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

### 讨论 22

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

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：如果你想赚大钱，就把冰糖和面粉当毒の品卖给瘾君子吧\(\`ヮ´ \)他们能怎么办？报警吗？

2. **发言者 2**：致

3. **发言者 3**：会被抓，然后按诈骗判

4. **发言者 4**：搞大了被人做掉了怎么办

5. **发言者 5**（回复第 3 条）：\[引用第 3 条\]  
     
   但是交易的时候说是冰糖，卖的也是冰糖，也能算诈骗吗\( ﾟ∀。\)

6. **发言者 6**：我怎么记得真有社会新闻讲过这个，有个人拿明矾当毒卖后来嫌利润太低直接搞成了冰糖

7. **发言者 6**（回复第 6 条）：\[引用第 6 条\]  
     
   为了规避价格争议他的做法是在包装里塞一包茶叶，最后好像给判的就是欺诈消费者

8. **发言者 7**（回复第 6 条）：\[引用第 6 条\]  
     
   ？明矾相比毒，品是很贵的东西吗？

9. **发言者 8**：调戏刑警是件很危险的事情

10. **发言者 9**（回复第 8 条）：\[引用第 8 条\]  
     
   我记得是一开始用冰糖假冒毒 品（为了符合单价还塞了一袋茶叶），后面嫌冰糖成本太高就换成明矾了  
     
   被抓了是被按诈骗判的，因为他商品名是高纯度冰糖，发的却是明矾\(\`ゥ´ \)

11. **发言者 10**：那人如果一直卖白糖可能还真没事？

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：35mm photos  
     
   Earlier on in the spring/summer I had purchased some 35mm film and had some unused rolls in the fridge. I decided after 30 years I’d try getting back into film. I finally developed them a few weeks ago and got them scanned. I even had some I did in high school scanned as well. It’s been a learning experience that’s for sure, but it was fun doing it again. Nothing like moving the film advance level and hearing that click.  
     
   First two are from this year and the last two are from high school photography.  
     
   \[图片省略\]PICT00391600×1067 799 KB  
     
   \[图片省略\]PICT00481067×1600 609 KB  
     
   \[图片省略\]PICT01921600×1067 513 KB  
     
   \[图片省略\]PICT02131600×1067 472 KB

2. **发言者 2**（回复第 1 条）：Very cool\!

3. **发言者 3**（回复第 1 条）：Always love seeing your work.

4. **发言者 4**（回复第 1 条）：Very nice. The B&amp;W ones from high school particularly appeal to me. They could both make great album covers or T-shirts. I was starting to get into photography in college, before digital, and B&amp;W was my favorite.

5. **发言者 5**（回复第 1 条）：These images are all so engaging. It’s hard to really recall just how different the mystery of film photography was back in the day.

6. **发言者 6**（回复第 1 条）：They’re all interesting and very nice. I like the pink cast to the first 2. In the 1st bxw, he looks like he’s thinking, What?\! I’m just picking veggies. :blush: Nice nostalgia for the school ones.

7. **发言者 4**（回复第 1 条）：I only had enough free elective hours to take one course in college. We used color slide film. Fuji was my go-to since it was reliable and inexpensive in 1985/86. The professor required slides so he could project them during class for discussions of students’ work. It’s was a bit :grimacing: feeling, depending on how your project went that week.

### 讨论 25

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

### 讨论 26

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

### 讨论 27

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Help fix code: spawn random items with multiple spawn points godot  
     
   Godot Version  
   4.7  
     
   Question  
   Im trying to make items that spawn randomly and spawn at one of 4 spawn places. heres the code i have so far. please help  
     
   var coin\_positions = \[   
   	Vector2\(-590, -250\),  
   	Vector2\(-264, -250\),  
   	Vector2\(67, -250\),  
   	Vector2\(395, -250\)  
   \]  
     
   func \_on\_body\_entered\(body: Node2D\) -&gt; void:  
   	if body.name == "Player":  
   		emit\_signal\("coin\_collected"\)  
   		queue\_free\(\)  
   	else:   
   		queue\_free\(\)  
     
   func \_physics\_process\(delta\):  
   	position.y \+= 200 \* delta  
     
   func do\(\):  
   	var timer = Timer.new\(\)  
   	timer.wait\_time = 1.7  \# seconds between spawns  
   	timer.autostart = true  
   	add\_child\(timer\)  
   	timer.timeout.connect\(\_on\_timer\_timeout\)  
     
   func \_on\_timer\_timeout\(\) -&gt; void:  
   	\# Pick a random index from the positions array  
   	var index = randi\_range\(0, coin\_positions.size\(\) - 1\)  
   	var pos = coin\_positions\[index\]  
   	  
   	\# Instantiate the coin scene  
   	var coin = load\("\[链接隐去\]  
   	coin.global\_position = pos  
   	  
   	\# Add it to the scene tree  
   	add\_child\(coin\)

2. **发言者 2**（回复第 1 条）：Other than a few small matters \(is the spawner object supposed to call queue\_free when it collides with anything that isn’t the player? Who calls do?\), this looks good to me.  
     
   Can you describe what you expect your code to do, and what it does instead?

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Kildall's algorithm  
     
   &gt; I work on a new \[Common\] Lisp compiler called Cleavir. Cleavir is the compiler part of Dr. Robert Strandh’s project, SICL

### 讨论 29

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Thitre  
     
   Thitre  
     
   \[图片省略\]Cover artwork3840×2160 3.23 MB  
     
   Thitre is a hero who has reached a conclusion no ordinary mind could accept: the world cannot be saved by preserving it. Cold, merciless, and absolute in his convictions, he sees existence itself as a cycle with no purpose, no resolution, and no meaningful end. To him, destruction is not the opposite of salvation; it is its ultimate form.  
     
   He seeks an ending, convinced that the only way to save the world is to bring it to an end. Perhaps this is the ultimate contradiction of his existence, and now The Hero Is The Real Evil..  
     
   \[图片省略\]13840×2160 3.84 MB  
     
   \[图片省略\]23840×2160 3.24 MB  
     
   \[图片省略\]33840×2160 2.45 MB  
     
   \[图片省略\]43840×2160 2.77 MB  
     
   \[图片省略\]53840×2160 4.23 MB  
     
   \[图片省略\]63840×2160 4.02 MB  
     
   \[图片省略\]73840×2160 4.05 MB  
     
   \[图片省略\]83840×2160 3.95 MB  
     
   \[图片省略\]93840×2160 4.16 MB  
     
   \[图片省略\]Background Back W Logo3840×2160 2.2 MB  
     
   \[图片省略\]Viewport 12160×1117 160 KB  
     
   \[图片省略\]Viewport 22160×1117 275 KB  
     
   PS: I know I’m sharing this here to get nothing at all, as always, but screw it..

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：ioctl\("TIOCMGET"\): Inappropriate ioctl for device  
     
   Hello\! I converted an old MacBook Pro to Linux Mint and now trying to get my Mega 2560 board to run on the new OS. I am running IDE 2.3.11 from an AppImage file. When I attempted to upload the Blink example I received the following error:OS error: ioctl\("TIOCMGET"\): Inappropriate ioctl for device  
     
   There was a post from 2024 that appeared to be for a similar problem, but the original poster also had another problem so it's not clear how it was solved. I did follow the guidance provided by one responder \(\[某参与者\]\) regarding dmesg and this was the output after plugging the board in:  
     
   \[180775.001020\] usb 1-1.4: new full-sped USB device number 26 using xhci\_hcd  
     
   \[180775.104536\] usb 1-1.4: New USB device found, idVendor=2341, idProduct=0042, bcdDevice= 0.01  
     
   \[180775.104551\] usb 1-1.4: New USB device strings: Mfr=1, Product=2, SerialNumber=220  
     
   \[180775.104557\] usb 1-1.4: Manufacturer: Arduino \(\[链接隐去\]  
     
   \[180775.104562\] usb 1-1.4: SerialNumber: 5573630393135190D072  
     
   \[180775.113793\] cdc\_acm 1-1.4:1.0: ttyACM0: USB ACM device  
     
   Any help would be greatly appreciated.  
     
   Thanks\!

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Re-engineering sweater to knit in wool not acrylic  
     
   Hey folks,  
     
   This is my favourite sweater, but it’s factory made in acrylic and has pilled so badly I can’t wear it.  I would like to re-engineer it and knit it again in wool.  
     
   Can anyone help identify what the central panel stitches are please?  I’m calling them little V shapes followed by larger V shapes and using AI to help create a stitch by stitch guide.  If anyone has any hints or tips, that would be amazing.  
     
   Also wondering whether anyone has any suggestions for which wool to use?  I was thinking a merino, in aran weight, but really happy to take advice from anyone who’s had particular success with a particular wool for cables.  I’m going to knit it in black.  Want to avoid the pilling issue of the original.  All help very much appreciated and received with huge thanks.  
     
   \[图片省略\]image797×789 177 KB  
     
   \[图片省略\]image598×589 93.4 KB

2. **发言者 1**（引用未收录发言）：Thank you so much, that’s super helpful.  I have both those books, but I’m looking forward to checking out the tutorials you’ve linked.  So appreciate your time and guidance.

3. **发言者 2**（回复第 2 条）：Cables are so much fun to work. This is going to be a beautiful sweater\!

4. **发言者 3**（回复第 1 条）：Definitely make a swatch of your cable pattern…they may not show well in black. I’d hate for you to do all that work and have it not be seen\!  And swatching gives you a great chance to practice the stitches.  
     
   I have a cardigan that I love, made from West Yorkshire Spinners “Fleece” yarn, which is 100% Blue-faced Leicester.  It’s so soft and comfy\!  Though it does pill a bit under the arms.

### 讨论 32

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

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：没用这些工具前，我一般 11 点准时睡。但这俩月重度依赖各种 AI 编程助手之后，每天基本干到半夜 1 点，人不仅没轻松，反而更累了。  
     
   简单总结下这段时间的折磨：  
     
   “透支”式提效： 过去一两个月，感觉把未来一年的技术活全干完了。活儿非但没变少，反而呈指数级增加。  
     
   严重的戒断与失控感： 这个项目自己手搓了 2 年，结果用了 2 个月 AI 之后，现在偶尔想自己人工去改点代码，居然开始感到手足无措、甚至有点发怵。感觉脑子正在被 AI “外包”掏空。  
     
   更深的长期焦虑： 活是干完了，但预期里未来一年依然是无休止的重度技术活在等着，完全看不到头。  
     
   回想起来，当初用 AI 是为了“偷懒”，结果现在成了给 AI 打工的监工。  
     
   大家现在都是什么状态？是我打开方式不对，还是这玩意儿本来就是个无底洞？

2. **发言者 2**：为什么下班还要干活？

3. **发言者 3**：AI 都能干好，人还去学习技术干嘛？本来就是替代，现在还需要人来指导大方向，以后发展，嘴巴随便糊弄一下就能搞一个软件出来，没辙的

4. **发言者 4**：变成黑客帝国里的人体电池了

5. **发言者 5**：我觉得主要还是没有回报的问题

6. **发言者 6**：发言者 5 回报不要想了，写代码这事会慢慢贬值，幸好现阶段可以减负担

7. **发言者 7**：因为本来就要不断学新知识与落地想法，受限于工作-生活-人体矛盾，大部分人做不到而看到做到的人是天之骄子又极其努力甚至放弃很多才能达成一定成就，所以说服自己回归生活；但是现在 AI 大幅度减少重复性工作，人类大脑需要不断开辟疆界，很多人才发现原来属于个体的“地理大发现”一直都是被囚禁在生产力不进步的基础之上，而自己其实很多时间一直在做重复性工作。  
   要减轻焦虑，推荐使用反内卷法也即焦虑的内卷法——当别人都在内卷而产生焦虑进而导致反内卷之后，停止内卷而减轻焦虑反而能够导致内卷。这里的关键是个体的内卷终于到了一种程度，即只要再内卷就会反内卷；所以，重要的是根据自身与外界的情况来调整（然而这太难了），精确化大环境与粗糙化周身环境，才能够抵御厚度浅薄的凌厉攻击。

8. **发言者 8**：大脑是预测器  
   以前：自己边想边干→心里有预期→干完拿到反馈→对不上分泌多巴胺，推你去修正→对上了分泌内啡肽，觉得踏实快乐→快乐驱动你接着干，循环自己转起来  
   现在：执行外包→只剩汇报和 review→没有理解的抓手，预期越来越少→快乐被旁路，只剩多巴胺在空转→越干越累，自己动手时发怵  
     
   就好比黑猴打虎先锋，坚持手打，你对虎先锋的每个招数都有预期，他啥时候来大姨妈你都清除，自然第一次通关之后畅快无比（内啡肽）  
   现在 Agent 好比风灵月影，记下干完，你根本不了解打虎先锋的套路，只会驱动你过剧情通关，拿不到游戏策略精心设计好的快乐。通关完后一场空虚

### 讨论 34

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

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Harness Relay – the coding agents you have, working together  
     
   If you already have multiple coding agents\(one kind of agent also works though\), you should really look into this project\! It's a desktop app that brings coding agents working together, with user experience similar to ChatGPT\!One kind of agent is enough for an agent team: all of one kind, or any mix of Claude Code, Codex, Grok, Cursor Agent, Antigravity, GitHub Copilot CLI, Muse Code and five open-source coding agents on your own model backends. For each question, the lead agent designs the team: each member’s role and model, and how they take turns. Once you confirm it, the real agents on your machine work on your code, or any question, and answer each other.It also supports voice input, notification, branching in conversation, task scheduling, and mobile app\(PWA\) support\!If you are interested in this project, please give it a try and star us on the GitHub repo, thanks\!GitHub repo: \[链接隐去\]

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：邻居似乎已经快失踪一个月了\( ´ー\`\)

2. **发言者 2**：邻居是真人吗

3. **发言者 1**（回复第 2 条）：\[引用第 2 条\]  
     
   我依稀记得隔壁确实是有人住的，印象里他们家还有个小男孩，但这也是很久很久之前的印象了\(・ー・\)

4. **发言者 1**：我们小区是一梯三户，我偶尔能撞见另一户的人家去开他们家的门，但基本上没遇见过隔壁邻居家的人\( ﾟ∀。\)本来他们家门口已经被贴了停煤气的条子了，昨天出门又看见贴了停电的条子……

5. **发言者 1**：然后那张停煤气的表单好像是10月15号就停了

6. **发言者 2**：等一下居然不是海龟汤吗！

7. **发言者 1**（回复第 6 条）：\[引用第 6 条\]  
     
   都中医了，当然是真事啊！\(╬ﾟдﾟ\)⊂彡☆\)\)д\`\)

8. **发言者 3**：我的邻居据说已经失踪十几年了\( ﾟ∀。\)7

9. **发言者 1**（回复第 8 条）：\[引用第 8 条\]  
     
   怎会如此

10. **发言者 4**：从一开始隔壁就没人

11. **发言者 5**：这是沉浸团吗.jpg

### 讨论 37

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：The Bridgerton Wrap  
     
   It’s been a while but finally it’s finished. The “Bridgerton” wrap. Made with the beautiful Bridgerton Advent 2025 by Castle View Yarns  
     
   I am absolutely delighted with it. So much so I’m debuting it at Centre Parks this week.  
     
   Merino 4ply, on 12.5dpi on a 24" Ashford. \#gwead \#rigidheddleloom \#handwoven \#slowfashion  
     
   \[图片省略\]10000647941920×1920 1.06 MB  
     
   \[图片省略\]10000647951920×1920 1.36 MB  
     
   \[图片省略\]10000647961920×1920 838 KB  
     
   \[图片省略\]10000647971920×1920 1.05 MB  
     
   \[图片省略\]10000647991920×1920 1.19 MB  
     
   \[图片省略\]10000648001920×1920 1.26 MB  
     
   \[图片省略\]10000649111542×1444 231 KB

2. **发言者 2**（回复第 1 条）：This is so pretty and looks like just the right amount of warm

3. **发言者 3**（回复第 1 条）：It is gorgeous\! Well done.

4. **发言者 4**（回复第 1 条）：:maple\_leaf: :fallen\_leaf: :maple\_leaf: Congratulations\! Your Bridgerton Wrap is a Featured Project this week\! :maple\_leaf: :fallen\_leaf: :maple\_leaf:

5. **发言者 1**（回复第 4 条）：Thank you :blush:

6. **发言者 5**（回复第 1 条）：this is absolutely gorgegeous\!

7. **发言者 6**（回复第 1 条）：Beautiful\!  
     
   Enjoy Centre Parks

8. **发言者 1**（回复第 7 条）：It’s weird you not being here. Seemed poor form to bring you too considering Liz booked and paid for it :thinking: :rofl:

9. **发言者 7**（回复第 1 条）：Absolutely gorgeous\! I can tell how much work into it and it looks so flawless\! I love looking at visibly woven fabric\!

10. **发言者 8**（回复第 1 条）：So beautiful\! That gradation is so sumptuous.

11. **发言者 6**（回复第 8 条）：Haha. That would be weird\!\!  
     
   Have fun :woman\_swimming:

### 讨论 38

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：We Dislike LLM Output, not Because of Comprehension  
     
   Here is a blog post I just wrote, I hope it might be a fun read to you.  
     
   \[链接隐去\]

2. **发言者 2**（回复第 1 条）：Who is We ?

3. **发言者 3**（回复第 2 条）：I didn’t understand this blog. In my work I use copilot almost as a work colleague who is cleverer than me\!  
     
   But I work from home so that explains a lot. Once it starts discussing last nights football results then I will worry\!

4. **发言者 1**（回复第 2 条）：Just that I don’t want to use passive tense throughout the essay. It’s not a strict academic paper anyway.

5. **发言者 4**（回复第 1 条）：I think the bottom line is the comparison with medicine/pharmacology. As far as meds are concerned, there are some where we do not fully understand how they work, yet we use them because studies show that they are effective and very helpful, and there is also a lot of praxtical experience with them. Its similar with ai and llms.

6. **发言者 5**（回复第 1 条）：Honestly, I’m not sure I am smart enough to understand your article without some stringent analysis.

7. **发言者 5**（引用未收录发言）：\[图片省略\] 发言者 1:  
     
   The idea is that we \(well, I\) find it hard to hold LLM accountable thus we dislike LLM output.  
     
   Just a quick thought off the top of my head:  
     
   I think I generally dislike LLM output because It is the appearance of human behavior, but without human logic. At first it looks cool/good/acceptable, and the longer you look at it the more uncanny it becomes.

8. **发言者 6**（回复第 7 条）：\[图片省略\] 发言者 5:  
     
   uncanny  
     
   That’s exactly why I feel very uncomfortable when I get to using a chatbot. I would use them much more often if the output felt appropriately robotic. It’s why I quite dislike phrases like “You’re absolutely right\!” or “It’s not just X, it’s Y”. It just feels wrong whenever I come across them.

9. **发言者 7**（引用未收录发言）：Interesting… I’ve never heard of it :laughing:  
     
   Now, I never worked with the commercial side of things, all defense.  I do recall the Army putting things in contracts like “all documents written in sixth-grade English” or the like.  
     
   In the US at least, English is the new programming language.  And LLMs are like people, each with their own understanding of the language.  A recipe for fun…

10. **发言者 6**（引用未收录发言）：\[图片省略\] 某参与者:  
     
   I almost wrote, “You’re NOT a person…” …now that’s scary\!  
     
   An “I, robot” moment huh :laughing:

### 讨论 39

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

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：2d animated particles with variants  
     
   Godot Version  
   4.7.2  
     
   Question  
   Hey the title is pretty self explanatory i have a sprite sheet with 4 columns for the animation and 3 rows for the different variants is there an easy way to make the gpu particles2d switch between the variants. If not could you point me in the direction on how to make a shader for this.

### 讨论 41

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Fixing a WebKit bug to see if promises are made of train tracks

2. **发言者 2**（回复第 1 条）：Nice to see a breakdown of a bug fix like this these days

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Mapped Chronicles: места из книг, фильмов и игр на карте OSM — прошу обратной связи  
     
   Всем привет\! Делаю бесплатный сайт Mapped Chronicles: маршруты по реальным местам из книг, фильмов, игр, путешествий, истории и мифов. Каждая история — это точки на карте по порядку, с коротким рассказом, датой и источниками. Рекламы и платных функций нет.  
     
   Что здесь связано с OSM:  
     
   карта — Leaflet с тайлами OSM, атрибуция на месте;  
     
   координаты точек сверяю по Википедии и Nominatim;  
     
   у каждой точки есть метка точности: точное, приблизительное, предположительное или вымышленное место;  
     
   любую точку можно открыть в OSM, Organic Maps, Google и Apple Maps, весь маршрут — скачать в GPX;  
     
   карту маршрута можно встроить на свой сайт.  
     
   Для примера, маршруты по России:  
     
   «Мастер и Маргарита»: Москва Булгакова  
     
   «Брат» и «Брат 2»: от Петербурга до Чикаго  
     
   Крузенштерн и Лисянский: первое русское кругосветное плавание  
     
   Все точки на одной карте мира: \[链接隐去\]  
     
   Буду рад любым замечаниям и пожеланиям\!

2. **发言者 2**（回复第 1 条）：крутая идея\! в детстве, читая Жюль Верна, мечтал о том, чтобы на подробной карте рассматривать места действия, и вот наконец свершилось \(\[链接隐去\]  
     
   жаль, что сайт не открывается без ВПН

3. **发言者 1**（回复第 2 条）：Спасибо\! Про доступ: сайт хостится на Vercel, и у части российских провайдеров он, к сожалению, открывается только через VPN. Повлиять на это сам пока не могу, но буду искать вариант.

4. **发言者 2**（回复第 3 条）：\[图片省略\]image868×355 22.4 KB  
     
   эти кнопки в последнем Chrome не работают. Нажимаешь - экран моргает, и больше ничего не меняется

5. **发言者 2**（引用未收录发言）：адрес меняется  
     
   впн - не впн - пофиг, все равно не работает  
     
   во вкладке Консоль ничего не появляется  
     
   интересно, что кнопка “игры” работает, при нажатии на нее отбираются соответствующие маршруты:  
     
   \[图片省略\]image1120×1002 102 KB  
     
   но потом при нажатии любой другой кнопки снова вываливается сюда:  
     
   \[图片省略\]image1089×1134 135 KB  
     
   ха, в режиме инкогнито все работает

6. **发言者 1**（回复第 5 条）：Спасибо огромное\! Кнопки ломались, если перед этим навести мышь на ссылку «Каталог» в шапке: сайт заранее подгружал общий каталог и потом показывал его вместо выбранной категории. Надеюсь фикс поможет\!

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Magic Goats  
     
   Some goats . New WIP  
     
   .Blender 5.3 / eevee / toon texture  / rigging  
     
   \[图片省略\]cabras endiabladas1920×1080 1.58 MB  
     
   \[图片省略\]cabra toon 21920×1080 1.84 MB  
     
   \[图片省略\]cabra toon 11920×1080 2.13 MB

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：La MAJ vers GRAV 2.0.28 tombe en erreur  
     
   What app is this about, and its version: grav 2.0.14  
     
   What YunoHost version are you running: 12.1.41.2  
     
   What type of hardware are you using: Other ARM board  
     
   Describe your issue  
   Bonjour,  
     
   La MAJ de GRAV de la version 2.0.14 vers la version 2.0.28 tombe en erreur.  
     
   Share relevant logs or error messages  
   \[链接隐去\]

2. **发言者 2**（回复第 1 条）：Can you please try again, looks like a temporary error on GitHub end.

3. **发言者 2**（引用未收录发言）：Sounds like a temporary issue upstream, try again

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：如题 就是想请教一下 是否会被封  我目前是日本节点家宽没问题 使用 claude 目前一个月没出现过问题 是用的日本地区的 email \+ 日本电话号 绑定的 \+ 日本卡充值 的方式 所以想现在用这个 gmail 去直接登录 higgs 并且连接 mcp 会有风险吗?

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: SeharaCloud – Self-Hosted Multimedia System

2. **发言者 1**（回复第 1 条）：Self-hosted media cloud for music, video, documents, and images. Files are automatically indexed \(C\+\+ daemon\), metadata is stored in PostgreSQL, and a REST API \(\[链接隐去\] Core\) serves them to clients \(mobile app, web frontend...\).

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：之前分享过自己做的开源分屏对比扩展\*\*Panelize\*\*——不用配 API Key ，直接在一个窗口里分屏打开已登录的 ChatGPT 、Claude 、Gemini 、Grok 、DeepSeek 、Kimi 、豆包、通义千问等 13 个内置 AI 网页，输入一次问题，点\`Send All\`同时看所有回答。  
     
   刚刚发布了\*\*v2.2\*\*，把大家呼声最高的自定义网站和本地 API 补齐了：  
     
   - \*\*添加任意 AI 对话网站：\*\* 点顶部\`\+\`→\`添加自定义 AI\`，内置\`Perplexity\`、\`秘塔 AI 搜索\`、\`Poe\`、\`Open WebUI\`等快捷按钮，粘贴网址即可并排嵌入（支持统一传图、临时对话与完整长回答拼接截图）。  
   - \*\*一键接入 Magpie 与 Ollama 等 OpenAI 兼容 API：\*\* 设置页内置\*\*Magpie\*\*（\`127.0.0.1:3425/v1\`）与\*\*Ollama\*\*（免改\`OLLAMA\_ORIGINS\`跨域配置）一键填充预设，也可接硅基流动、DeepSeek API 、OpenRouter ，点「加载模型」自动拉取列表，和网页版 ChatGPT Plus / Claude Pro 同屏 PK 。  
   - \*\*纯本地零服务端：\*\* 按单域名最小权限授权，可选的 API Key 仅存在本机浏览器\`IndexedDB\`（不同步、不随备份导出），MIT 开源。  
     
   \[图片省略\]  
     
   - Chrome/Edge 商店： \[链接隐去\]  
   - 配置指南（含 Magpie/Perplexity/Ollama ）： \[链接隐去\]  
   - GitHub 源码： \[链接隐去\]  
     
   欢迎大家试试，有常用网站没识别准输入框的话直接丢链接，我来适配！

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Neues Hauke PnP Mittelalter  
     
   Hallo zusammen ich hoffe es gibt nicht schon bereits ein Beitrag dazu.  
     
   Trotzdem wollte ich es teilen für alle, bei denen es noch nicht auf der 某社区 Startseite aufgetaucht ist\!\!

<!-- samples:end -->

