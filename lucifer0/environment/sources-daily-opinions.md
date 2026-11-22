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

读求助帖时，先找出发帖人遇到什么、已经试过什么、还想请人帮他弄清哪件事。来源论坛可能要求填写设备和版本，也可能习惯在开头问好、末尾预先道谢并署名。采集区保留脱敏节选的原貌，写本站稿时再判断哪些细节会影响理解或后续接话。这个判断同样适用于中文来源。

采用时沿用本次操作保存的案例映射；涉及研究补充时，在 `researchMaintenance` 对应条目的 `summary` 记下材料日期、标题和改编方向，不补回原身份或平台。具体研究仍回到相应专题，不在多处复制整段；新鲜公共资讯的观察继续按[执行与发布](../docs/publishing.md#填写当前更新)记录。

## 当日素材

<!-- samples:start -->

采集时间：2026-11-22 14:02:12（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：听到认识的人借了580w网贷  
     
   \(´ﾟДﾟ\`\)  
     
   本来焦虑躯体化的我突然不焦虑了  
     
   \( ﾟ∀。\)

2. **发言者 2**：能借850w出来也不简单

3. **发言者 3**：能借1850w出来也不简单

4. **发言者 1**：可能他是公职人员吧  信用分比较高  
     
   要是我就拖家带口跑国外去了

5. **发言者 1**：其实不是580w   家里人给我说的是2000w  不过我不敢信

6. **发言者 1**：还有网贷借了30w又借30w的  
     
   成年人等我社会好沉重啊

7. **发言者 4**：能借到1亿5800万也是不容易

8. **发言者 5**：能借5亿800万？这么吊

9. **发言者 1**：靠  家里人搞错了   是做了个2000w的买卖 不是借了2000w网贷  我寻思那能套这么多钱出来  抵押物也没有  \( ﾟ∀。\)  世上又多了一个有钱人  可惜不是我

10. **发言者 6**：如果这种消息能缓解你的焦虑的话，我建议你去听戒社\( ﾟ∀。\)听完之后感觉人生一片辉煌

11. **发言者 1**（回复第 10 条）：\[引用第 10 条\]  
     
   开玩笑的   \( ﾟπ。\)  
     
   要是能这么好也不用交叫什么焦虑症了

### 讨论 2

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Sadnes Garn Wendy Sweater \(saddle shoulder\)  
     
   Hello and please help.  See attached; I am at point A and am stuck.  The pattern seems to interchange RNDS and ROWS and no where does it state ‘join to work in the RND’. But maybe I am expected to know when to do this.  Should I have joined before \(or at point A\)? This I thought would be a quick knit but the shoulder shaping has stumped me.  
     
   \[图片省略\]Wendy Sweater 1899×1599 161 KB  
     
   \[图片省略\]Wendy Sweater 2899×1599 139 KB  
     
   I am a fairly good knitter \(picked it up again during lockdown\) and have knitted many items including jumpers/sweaters but never a saddle shoulder and never anything from Sandnes Garn.

2. **发言者 1**（引用未收录发言）：Hello 某参与者, Thank you for your help.  I cast on 70 sts and my stitch count at the point I marked A is 96 which should be correct.  If I now join itr then why does the pattern state “cast on x sts at end of ROW for neck”?  The comment below says that the ROW/RNDS switch is intentional.  I am not helped because I can not picture the construction.

3. **发言者 1**（引用未收录发言）：Thank you.  But if I join to work in the RND at my point A why does it say cast on sts at end ROW after I have joined in the round?  I am quite mad that I can’t figure this out.

4. **发言者 1**（引用未收录发言）：发言者 2 thank you.  I understand and read through the pattern again and see that ‘what is coming’ next pattern writing.  One last question please?  I knitted straight, cast on 10 extra sts but now I am on the was so I am going to purl across to get back to the ws then knit to the 1st marker and join to work itr.

5. **发言者 1**（引用未收录发言）：某参与者 I agree, writing ‘cont further in RNDS…’ at the point that it is written is confusing.  Thank you so much for taking the time to reply; very much appreciated.

6. **发言者 2**（回复第 4 条）：After you cast on the 10sts, turn so that the RS is facing you. This is the point where the knitting is joined to knit in the round. Now knit to the first marker and call that the beginning of round marker.

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 朋友一直爽約  
     
   朋友爽約已經不是一兩次  
   總是會在出去玩的前幾天說臨時有事無法赴約  
   我跟其他朋友最多只有感到無奈  
   不太確定她是否有意識到，還是我們關係好才這樣  
   目前也還沒有戳破，不想傷了感情  
     
   大家有遇過這樣的人嗎？

2. **发言者 2**（回复第 1 条）：以後把她的話一律反著聽：同意=不同

3. **发言者 2**（回复第 1 条）：意。喜歡=不喜歡。再見=永遠不見

4. **发言者 3**（回复第 1 条）：能理解 畢竟那麼雞歪愛公審人 表面

5. **发言者 3**（回复第 1 条）：答應你就好

6. **发言者 4**（回复第 1 条）：是我的話就會慢慢不聯絡了

7. **发言者 5**（回复第 1 条）：就不用刻意經營

8. **发言者 6**（回复第 1 条）：就慢慢淡出吧

9. **发言者 7**（回复第 1 条）：放生

10. **发言者 8**（回复第 1 条）：就不要約了真的

11. **发言者 9**（回复第 1 条）：不是一次兩次還一而再再而三把她納

### 讨论 4

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Free Plus Friday – first 3 sign-ups each Friday get a year of Plus free

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Bye Bye darktable  
     
   After about three years of using darktable, I’ve decided to stop using it. It turned out to be too complex for me. I’ll continue my photo editing work with DxO Photolab and Affinity Studio. My main problem was the lack of feedback; sometimes I just didn’t know how or which module to use to solve a particular problem.

2. **发言者 2**（回复第 1 条）：Once it stabilizes and matures a bit I think greycard will be a great option for those who look for something easier to grasp.  
     
   It’s early days but it’s already very usable. The big problem might be that old edits will break as the software progresses fast and there’s no “engine versioning”.

3. **发言者 3**（回复第 1 条）：Good on you for finding what works for you. Clarity in life is a blessing and fumbling with a tool that just doesn’t sit right in your hands is tiring.

4. **发言者 4**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   My main problem was the lack of feedback; sometimes I just didn’t know how or which module to use to solve a particular problem.  
     
   If you do not mind, could you be a little more detailed about this? Might help the devs and community improve this aspect where possible.

5. **发言者 5**（回复第 1 条）：I have seen several of your edits, and they are excellent, although I’m not sure which software you used on them. If they were darktable, I think you were doing very well with it.  
     
   But, as others have said, you should choose a tool that you are comfortable working with. I’m looking forward to seeing your future work.

6. **发言者 6**（回复第 1 条）：Well, darktable isn’t for everyone. You gave it three years, which is more than many.  
     
   I have enjoyed your excellent photos. Best wishes.

7. **发言者 7**（回复第 1 条）：Good luck. If you are exclusively going to user proprietary software, does this also mean bye bye to 某社区?

8. **发言者 1**（回复第 7 条）：yes, because this forum is exclusive for FOSS.

9. **发言者 8**（回复第 8 条）：Farewell, 发言者 1 :saluting\_face:

10. **发言者 7**（回复第 8 条）：Too bad—all the best for the future.

11. **发言者 3**（回复第 8 条）：Aw man that’s a bummer. Take care and pay us a visit once in a while :-\).

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Probabilistic data structures in Go, part 2

2. **发言者 2**（回复第 1 条）：\[Part 1, previously \(12 comments\)\]\(\[链接隐去\]

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Dear Santa: Please add to the End Of Year Forum Synopsis  
     
   Stats on  
     
   b-words identified and removed due to Discourse  
     
   b-words identified and removed due to user flagging  
     
   b-words profiles and statistics \(username, minutes read, posts read, posts made, topics made \(zero\), replies answered \(also zero\)... more is better  
     
   b-word tokens - scrapers, repeaters, cheerleaders, slangers, facters, ... I have missed a few.  
     
   ... and a single "b-word" button... to encourage more humans to have some say about a web site conceived by humans, for humans to visit, to interact with humans, to control computer things, so the humans who work hard to make these devices can increase sales to humans.  
     
   There used to be a "spam forum" for users to post to... but "b-words" seem to be granted golden-child status, and untouchable.  
     
   F\* the b-words.

2. **发言者 1**（回复第 1 条）：I see Discourse has already viewed... like one seconds after posting.  
     
   \[图片省略\]image848×647 67.1 KB

3. **发言者 2**（回复第 1 条）：Define "b-word" please.  
     
   Tom.... :smiley: :\+1: :coffee: :australia:

4. **发言者 1**（回复第 3 条）：Exactly what one would say...  
     
   \[图片省略\]

5. **发言者 1**（引用未收录发言）：My interest is not the eradication of bots. My interest is obtaining the data necessary for humans to eradicate the existence of bots.

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：General measurements discussion for GraphWorks visualizer  
     
   Share and discuss your impressions of different measurements in the new GraphWorks visualizer tool, whether you’ve actually listened to the headphones or not \(which is normally taboo on most audiophile forums\).  
     
   I have not listened to most of the headphones in this tool btw. So most of my impressions will be based on the 5128 graphs, and sometimes some virtual listening. So they should be taken with a grain of salt.

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：First needle felted project--heart pin  
     
   I saw a needle felted pin with the zipper embellishment and that put me over the edge; I just had to try needle felting. With the encouragement of needle felting master 发言者 2, I embarked on the journey. Here’s my first piece. IRL it is a lighter color than the photo depicts.  
     
   \[图片省略\]image1596×1654 791 KB

2. **发言者 2**（回复第 1 条）：HUrrah\!\! :smiley: :trophy:

3. **发言者 1**（回复第 2 条）：Thanks :heart:

4. **发言者 3**（回复第 1 条）：wow, looks great\!  
     
   how is the zipper attached?

5. **发言者 4**（回复第 1 条）：This is really cool. I love the softer take on the heart shape.

6. **发言者 5**（回复第 1 条）：Great job\!

7. **发言者 6**（回复第 1 条）：This is awesome\! I’ve never seen an embellishment like this with needle felting :o

8. **发言者 1**（回复第 7 条）：It wasn’t my original idea but I did fall in love with it. Next time I will do it differently to avoid that little gap where the zipper ends meet.

9. **发言者 1**（回复第 1 条）：Thanks 发言者 5 and 发言者 4

10. **发言者 7**（回复第 1 条）：I like this wonky heart shape\! I have a zippy pin from what I believe to be the original designer of that style, I’ll find it &amp; take a pic. Such a neat idea to use those old metal zips\!

11. **发言者 1**（回复第 10 条）：I’d love to see it\!

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Camera  
     
   \[图片省略\]FINAL\_SHOT1008×1561 3.68 MB  
     
   \[图片省略\]wire1008×1561 1.01 MB

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Outdoor projector for a backyard movie setup—worth trying with a Naim system?  
     
   I’ve been setting up a backyard movie night area at our place here in North Carolina, and I keep going back and forth on the display side of things. Our indoor setup is built around a Naim system, so audio isn’t the problem—I’d route sound through that rather than relying on whatever speakers come with a projector. The gap is the picture.  
     
   I’ve been looking at the Lisowod L61Pro outdoor projector since it’s marketed for exactly this kind of use. My main hesitation is brightness and noise: our yard has a porch light and some ambient glow from the street, and I don’t want to be squinting at a washed-out image. I’m also unsure how loud a portable unit like this runs when it’s sitting a few feet from the seating.  
     
   For those who run outdoor projections with their Naim gear handling the audio, what has actually worked for you in similarly lit spaces? Any pitfalls I should think about before committing?

### 讨论 12

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
     
   1. 你五歲小孩很愛爸爸，要跟爸爸一起睡，  
     
   所以你老公應該是一個情緒穩定，有耐心，愛孩子的爸爸，  
   而且前幾年每天陪玩陪睡才能得到孩子的愛，這不是幾天就可以達到，  
   你對孩子付出多少愛，孩子就回報你多少愛，孩子黏他就說明一切了  
     
   2.你一打二很辛苦，好媽媽無庸質疑  
     
   3.你把夫妻間的做愛說成打炮，  
     
   你應該討厭做愛，或是討厭跟你老公做愛，  
   生理性排斥，  
   你老公都五十歲了還對你性緻勃勃，他沒問題。  
   你為什麼對你老公生理性排斥？  
   女人三十如狼四十如虎，你正值狼虎之年啊？

2. **发言者 2**（回复第 1 条）：第一句就不對了，養過小孩嗎？這年紀小孩天生孺慕爸

3. **发言者 2**（回复第 1 条）：媽需要陪伴，就算是個超級大爛人也一樣

4. **发言者 3**（回复第 1 条）：樓上，但孩子當天是想黏（較少相處的）爸爸，而非主

5. **发言者 3**（回复第 1 条）：要照顧者媽媽。多少還是因為爸爸有用心在孩子身上吧

6. **发言者 3**（回复第 1 条）：？！

7. **发言者 4**（回复第 1 条）：最好是超級大爛人小孩也會愛，天天喝醉打小孩試試?

8. **发言者 5**（回复第 1 条）：一樓真的養過小孩嗎

9. **发言者 6**（回复第 1 条）：倒數三行的問法真有趣

10. **发言者 7**（回复第 1 条）：一樓沒養過也當過小孩吧！

11. **发言者 8**（回复第 1 条）：其實小孩黏父母其中一人有部份原因是對依附關係感到

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：是实时高斯泼溅吗？说是只用半个 AI4 TRIP 加速器的算力

2. **发言者 2**：国内还在等 V14.。。

3. **发言者 1**：发言者 2 那肯定是等不到了

4. **发言者 3**：感觉在里面玩 gta 应该很好玩，能有效解决路怒症

5. **发言者 4**：画面升级跨度也太大了

6. **发言者 5**：这个功能我是真心想要，第三人称视角太有安全感了。

7. **发言者 6**：马斯克那条帖里写的是实时 AI 视频生成，不用游戏引擎，算力只用一个 AI4 TRIP 加速器的一半。没看到官方提高斯泼溅。

8. **发言者 7**：\[链接隐去\]   
   \[链接隐去\]  
   参见该特斯拉工程师的会议报告，实时 3D 场景应该是使用生成式 3D 高斯泼溅技术实现的。

9. **发言者 8**：我宣布，人车交互进入全新纪元

10. **发言者 9**：照这个情况，国内 5 年后、10 年后有可能用上吗？

### 讨论 14

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

9. **发言者 8**（回复第 1 条）：Fantastische Besetzung\! Ihr verwöhnt uns\! :beancute:

10. **发言者 9**（回复第 1 条）：Freue mich auf gleich. Das begleitete Rätseln gepaart mit Rollenspiel ist für mich immer ein Hochgenuss.

11. **发言者 10**（回复第 1 条）：Ist das noch RBTV? :beansweat:

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：我爷爷奶奶就像克苏鲁，正在持续污染家里每一个人的精神。被污染的人之间还会彼此污染。  
     
   我已经没招了。除了发疯我已经没招了。我甚至不能9xl，因为对90岁的人使用9xl会出事的吧？虽然我觉得二位身体素质看起来比我好。

2. **发言者 1**：我想不明白，我想不明白。家里没有垃圾桶，没有我的床，没有厚被子。随便哪个碗碟柜子都有50年历史。家里很穷吗？其实没有，每个人的退休工资都比我的工资高。  
     
   哦对我现在没工资了，作为家里唯一需要上班的人，我刚失业了。

3. **发言者 2**：嗯嗯，然后呢？深呼吸，然后继续说\| ω・´\)

4. **发言者 3**：直接辞退可以仲裁赔偿，po可以的话还是记得去试试，向AI咨询该怎么做就可以了，直接上12345打电话就行

5. **发言者 1**（回复第 4 条）：\[引用第 4 条\]  
     
   已经找律师仲裁了，虽然很头疼但是这个问题甚至不是最大的。

6. **发言者 1**：等我紧急把手头事情全部弄完从外地通宵坐车回来。我爷已经出院了。我奶准备二阶段住院。我早上八点到家，一进门我就开始崩溃。因为我奶还没起床，还没醒。

7. **发言者 1**：我在爷爷奶奶家是没有床的，平时都睡沙发。只要我睡沙发，我爷爷奶奶就会在五六点起床然后搞出点动静。比如铲客厅旁边阳台猫砂盆里的猫砂，比如突然把所有存的塑料袋都翻一遍。比如突然扫扫沙发旁边的地。比如叫小姐妹来聊聊天。但是我不在家他们是不会起这么早的。

8. **发言者 1**：我不知道图什么，只要我一睡沙发，这个客厅就突然有意思。我要是睡得像个死猪就什么事都没有了。但是我睡眠很脆弱。

9. **发言者 1**：陪床更是绝望。  
     
   问她吃什么，说不吃。再问就是要小米粥和素包子。我说你不能这么吃，医生说你营养不良，贫血，骨质疏松都-4.5了，你需要吃有营养的。她不行，就要吃小米粥和素包子。

10. **发言者 1**：她非要喝粥，我买了青菜瘦肉粥。  
     
   她：不好喝，甜不甜咸不咸的。  
     
   她要吃花卷，我买了肉花卷。  
     
   她：不好吃，再不吃了，下次别买。

11. **发言者 1**：她要喝汤的，我买了馄饨，中午吃的，第二天早上她拉肚子，她怪我给她买的馄饨有问题。

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Long tail cast on  
     
   Help please? I am starting to knit a cardigan and want to use the long tailed cast on for a nice clean ribbed edge. I need to cast on 203 stitches. According to the attached photo using \#8 needles and worsted weight yarn My calculations come to a tail of 47 feet. Is this correct? The pattern is Lethe from Berroco and I am doing size 43”.  
     
   \[图片省略\]IMG\_34973180×1167 208 KB

2. **发言者 2**（回复第 1 条）：\[链接隐去\]  
     
   For myself, I find that casting on 10-20 sts then taking out and measuring length of the cast on yarn works best. You can then scale up the measurement to 203sts plus a foot or two extra and come close.  
     
   An alternative for this number of sts is to use two ends from two separate balls of yarn for the cast on.  
     
       
       \[图片省略\]

3. **发言者 1**（回复第 1 条）：What a great idea 发言者 2. That is exactly what I will do. Thank you\!

4. **发言者 3**（回复第 2 条）：For that many stitches I’d deal with an extra end to weave in and use two strands of yarn.  I have added yarn when I ran out of tail yarn before.  I held the too short tail and the new yarn overlapping and worked one cast on stitch with the thumb yarn doubled then dropped the old tail.  It worked and the one double strand stitch didn’t really show.

5. **发言者 4**（回复第 3 条）：You can join the two ends of the two balls together in a slip knot to anchor them together on either the needle or in your hand, sometimes a bit easier to get going. Don’t knit into that slip knot,  just use it as a temporary anchor.

6. **发言者 4**（引用未收录发言）：I really avoid long tail cast on, mostly because it untwists the yarn.  
     
   My mum tried to teach me crochet cast on when I was very little, I didn’t see the point at the time but I’d definitely try it again now.

7. **发言者 5**（回复第 6 条）：I hope you like it\! There are several \(many?\) variations: regular crochet, stretchy crochet, maybe even super stretchy. I’m not sure if all of them are reversible. That’s one feature I like. Long-tail makes me question which side is public and how to knit/purl the next row.

8. **发言者 6**（回复第 2 条）：Wished I had seen this several days ago. Just did long tail cast on for 130 stitches and had to undo it at least 3 times before I got it right. Now I have several different options that should help. Thanks

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 已經11月中了 開始在想跨年要怎麼過  
     
   近幾年來 發現自己面對人多吵雜的地方越來越抗拒  
   比起去人擠人的跨年現場跟著音樂煙火和一群人 一同慶祝這個節日  
   更喜歡在家和親近的人 一起吃飯聊天度過 也不知道是體力不行了  
   還是喜好改變了

2. **发言者 2**（回复第 1 条）：明年的機票都訂好了

3. **发言者 3**（回复第 1 条）：已經想好要約誰來家裡過了

4. **发言者 4**（回复第 1 条）：跟喜歡的某社区r一起過

5. **发言者 5**（回复第 1 条）：跟好朋友在家吃吃飯聊聊天

6. **发言者 5**（回复第 1 条）：也是一種跨年的好方式

7. **发言者 6**（回复第 1 条）：更喜歡後者

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: System 1.5 Model – Inkling-2-Mini Decision

### 讨论 19

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Ragdoll physic not colliding at all\!  
     
   Godot Version  
   4.7.2  
     
   Question  
   I tried to make a ragdoll for my 1st attempt in active ragdoll controller. Soo for precise debug, and trial and error for each parts, I decide to make more physic bones as I go, butt for the first few bones I made, none of it can collide, I had check every possible way that could cause the issue, and none still be found, I used Jolt physic engine.

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：My Monitor Was Cutting My Download Speed by 75%

2. **发言者 2**（引用未收录发言）：Doesn’t seem AI to me, what made you say that?

3. **发言者 3**（引用未收录发言）：The comment was not written by an LLM. I have never \(knowingly\) used an LLM for anything and I've written publicly on \[two\]\(\[链接隐去\] \[occasions\]\(\[链接隐去\] about my dislike of them.  
     
   Is there something about my comment that looks like an LLM wrote it? Or am I misunderstanding your comment?

4. **发言者 4**（回复第 3 条）：maybe it's the use of —, some people think only LLM can use them

5. **发言者 5**（回复第 3 条）：Sorry about that, shouldn't have done the witch-hunt-y comment. Knee jerk reaction to skimming the em-dash and "not X, but Y". My bad on sending bad vibes.

6. **发言者 6**（回复第 1 条）：Good write up.  
     
   I'm reminded of \[The Habitat of Hardware Bugs\]\(\[链接隐去\] Specifically the bit about how hardware is very prone to performance bugs, more often than outright breakage, because they don't break the overall system badly enough to render the device unsellable.

7. **发言者 3**（回复第 5 条）：All good. We all make mistakes. I hope these is not a reciprocal witch hunt.

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Help with boot time Grub menu  
     
   I have rebuilt the kernel and installed a new kernel and would like select it from the grub menu at boot time but this is all I see:  
     
   \[图片省略\]image1123×206 8.69 KB  
     
   Any ideas of what I might be doing wrong.  I used debian fakeroot and installed updated kernel versions.  In the past they have appeared in the menu and /boot/grub/grub.cfg has been updated.  I did run update-grub before rebooting.  
     
   My serial console is otherwise working fine.

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Torréfaction \#392 : GTA VI, Alfred 6, le bug tueur de SSD chez Nvidia, teasing DDR6 et Anthropic cartonne en bourse  
     
   Article publié sur :			Torréfaction \#392 : GTA VI, Alfred 6, le bug tueur de SSD chez Nvidia, teasing DDR6 et Anthropic cartonne en bourse - 某社区.fr  
     
   Cette semaine : GTA VI, Pool of Madness, Peel, Crest, Alfred 6, DJ Trax – A Moment of Clarity, nouvel épisode des Clairvoyants, Dynamic Duo – Higher than Rap \+ A2O Lite Neon, Infinite Edition \+ XG – DEPENDS, Musk, Nvidia a aussi son bug tueur de SSD, première baisse des prix des SSD début 2027 ?, le JEDEC taunt la DDR6, et Anthropic \(Claude\) fait un carton en bourse...

2. **发言者 2**（回复第 1 条）：Au moment d'aborder le sujet GTA VI, il y a eu 1/2 seconde de blanc - j'ai vraiment cru que pour troller, vous alliez lancer le son "Jean-Pierre Coffe qui râle".

3. **发言者 3**（回复第 1 条）：Je viens de me taper un fou rire de malade. 发言者 1 "ils veulent me tuer mon ssd les encules \!"... et j'étais pas prêt :joy:

4. **发言者 4**（回复第 1 条）：Alors c'est \[某参与者\] qui a decouvert Crest.  
     
   Moi je suis juste allé le pointer du doigt à Caf pour pas qu'il le rate.  
     
   Il l'a raté et c'est moi qui est prit pour lui.

5. **发言者 5**（回复第 1 条）：Hotfix pour sauver vos SSDs  
     
   \[链接隐去\]

6. **发言者 1**（回复第 5 条）：Perso, je vais rester en 621.01 et attendre les WHQL, parce qu'ils sont foutus d'introduire d'autres nouveaux bugs...

7. **发言者 6**（回复第 1 条）：Vraiment excellent Crest.

8. **发言者 7**（回复第 1 条）：Bonjour,  
     
   J'ai l'impression qu'avec la nouvelle version du site, il n'existe plus de bouton pour télécharger directement l'épisode en .mp3 \(ou alors c'est moi qui doit aller consulter un ophtalmo..\)  
     
   C'est dommage, c'était bien pratique. Est-ce une volonté de votre part ?

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[链接隐去\]  
     
   What type of hardware are you using: Other ARM board  
     
   What YunoHost version are you running: 12.1.41.2  
     
   How are you able to access your server: The webadmin  
     
   Describe your issue  
   Bonjour,  
     
   Je réouvre un ticket fermé pour essayer d’aller jusqu’au bout cette fois-ci. Merci spécifiquement à 发言者 3 pour son assistance. Je reviens avec plus d’informations que vous m’aviez demandées.  
     
   Déjà pour répondre à cette demande : \[quote=“发言者 3, post:2, topic:43108, full:true”\]  
     
   Si ce n’est déjà fait, passe en navigation privée pour voir si cela change qqch.  
     
   Si le problème subsiste, regarde les messages d’erreurs de la console du navigateur \(F12\).  
     
   \[/quote\]  
     
   Les fichiers CSS ne sont pas ouverts du fait d’un mauvais type MIME, text/html au lieu de text/css.  
     
   Merci pour vos conseils, n’ésitez pas à me solliciter si nécessaire.  
     
   Cordialement.  
     
   Share relevant logs or error messages  
   RAS

2. **发言者 2**（回复第 1 条）：Ce serait bien de résumer le problème \(qu’est ce que tu as fait et qu’est ce qui se passe\). On a oublié

3. **发言者 3**（回复第 1 条）：Je réitère quant à moi les demandes de précisions adressées dans le précédent thread.

4. **发言者 3**（引用未收录发言）：C’est indépendant de ton utilisateur puisque tout visiteur rencontre le même problème avec le deuxième site.  
     
   Comme dit précédemment, il doit y avoir quelque chose dans sa conf nginx qui intercepte le css.

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Grammar  
     
   Hi,  
     
   When I started with 某社区 I only wanted to learn Vocab so I turned the grammar side of things off. Now, I want to learn grammar too but I cannot find an option on the website to do this. Any help would be appreciated.  
     
   Cheers

2. **发言者 2**（回复第 1 条）：Hi\!  
     
   I am glad to hear that 某社区 has been helping you with your vocab study.  
     
   When you mean that you couldn’t find a way to do this, I am not exactly sure what you mean. Is there any chance you would be able to give me a bit of extra context? I’ll try to help you get it up and running asap.

3. **发言者 1**（回复第 2 条）：Sure.  
     
   When you sign up for 某社区 you can choose to learn grammar, vocab’ or both. I turned off grammar lessons, so now I only get tested on my vocab’.  
     
   How do I turn grammar lessons back on?

4. **发言者 2**（回复第 3 条）：I see. When you click on your avatar menu in the app, then settings, then general, what do you see under this?  
     
   \[图片省略\]image1401×225 16.7 KB

5. **发言者 1**（回复第 1 条）：Cheers

### 讨论 25

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How to Create a Human Model in the PSX Style  
     
   Description  
   Take a look at the image below. I’ve managed to create a symmetrical shape using the Mirror modifier, but I don’t know how to add body contours like the model on the right or make it look more human-like.  
     
   What I Want to Create  
   A PSX-style low-poly model  
     
   My Goal  
   A basic human model in the PSX style, like the one on the right  
     
   What I Want to Know  
   How can I make it look more human?  
     
   I’d like to know how to shape the arms and legs like the one on the right and make it look more human. For the face,  
     
   What I’ve Tried and Researched  
   I’ve used the Mirror modifier to make it symmetrical on both sides.  
     
   The one on the left is just a test, so I didn’t make it properly.  
     
   Translated with \[链接隐去\] \(free version\)  
     
   model data: \[链接隐去\]  
     
   human.blend \(182.9 KB\)  
     
   \[图片省略\]screenshot-2026-11-21\_14-20-51-blender1665×1257 346 KB

2. **发言者 1**（引用未收录发言）：Thank you.  
     
   I’m not looking for textures. I’m trying to figure out how to increase the number of polygons to create a shape like the one on the right.  
     
   Also, is using a mirror tool a standard technique?  
     
   I watched some low-poly modeling videos on 某社区, but I’d like to know the easiest way to do it.

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Help adjusting the cue lever arm on Ekos SE/LP12  
     
   Does anyone have any advice/hints/procedures for setting the cue lever height on an Ekos SE. The main post on mine \(the cylinder that attaches to the base of the arm\)  went out of its original position and I am having quite a difficult time getting it in the right vertical position again. Is there another adjustment I can make \(other than the hex screw that holds the post in place\) or is it just a question of trial and error? Thanks for your help.

### 讨论 27

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Re: \[心情\] 跟自己的小孩嘔氣  
     
   原本是不想回的 但你偏要跳出來討罵  
     
   老公遷怒小孩是一回事  
     
   你自己也沒多高級  
     
   快50歲的人了連拒絕都不會  
     
   不想打炮就拿小孩當擋箭排  
     
   什麼鍋配什麼蓋  
     
   兩個一樣低級就不要怪人家檢討性事  
     
   畢竟是這場鬧劇的根源  
   ----  
   Sent from Be某社区 on my iPhone 13

2. **发言者 2**（回复第 1 条）：可以不要這麼中肯嗎？

3. **发言者 3**（回复第 1 条）：重點整理的非常清楚

4. **发言者 4**（回复第 1 条）：推

5. **发言者 5**（回复第 1 条）：一針見血點出根源

6. **发言者 6**（回复第 1 条）：推

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：太耐用了！！！！！  
     
   我订阅的 Ultra 版本，高强度使用（场景: 跟 agent 约束性计算相关），下面是使用量截图。  
     
   \[图片省略\]  
     
   然后我问了一下 AI， 按照目前使用情况每天 8 小时，同时开启三个 gemini 4 neon high 窗口，用一个月没问题，因为每周都会重置。  
     
   完全 opus 5.5 平替。 我这里不引战，我只说我自己的感受，差距不大，有的时候会有一样的错觉。  
   现在彻底抛弃 GPT，Claude 就更不用说了，号早就被封了。  
     
   也别问我为啥不考虑其他模型，我不比较，你们用就行。😄  
     
   这个月难得比较开心的时刻。

2. **发言者 2**：Pro 订阅一个比较复杂的数据分析 neon high 会让额度直接见底，耗时 1 小时 30 分钟，但回答质量还是令人满意的。  
   无论是 google 还是 anthropic，不开放自家最顶级的模型给 pro 订阅，oai 起码把 astra 提供给 plus 用，这点上 oai 更慷慨些。  
   2026 年底了，尽管 claude 在 skill mcp 等技术上有先发优势，但其他两家也追了上来。一个比较显著比其他两家强的地方在于前端 UI 做了好，即 claude desktop app 的交互，包括 m365 的插件，给非程序员用户提供了极大的便利。但程序员也不那么在乎交互，能出活才是主要的。

3. **发言者 3**：不要把重置考虑进去。 这段时间在拉客，肯定会重置。  
   刚刚重置过了，你是不是刚好在重置以后看的使用量。。

4. **发言者 4**：确实很耐用

5. **发言者 1**：发言者 3 刚才没找到重置按钮，在哪里呀？

6. **发言者 3**：发言者 1 \[链接隐去\]

7. **发言者 1**：发言者 3 看来激动了....  我在用用，后面追加一下评论

8. **发言者 3**：发言者 1 至少 gemini 用着不烧心。  隔壁 A/隔三差五的捐款封号太烧心了。

9. **发言者 5**：年初 gemini3 刚出来的时候也是表现很突出，然后就是一路下坡，断崖式降智

10. **发言者 6**：下个月不会再订 Claude 了，提心吊胆不说，Gemini 即使不是最聪明的输出内容适合人类阅读，光凭这点就应该订阅，以至于不会让自己的能力退化的更快甚至还能学习，而 opus 和 fable 更偏向于许愿式而且输出的内容我觉得我 CPU 转不动带宽也不够。

11. **发言者 7**：你的 Ultra 是 5x 还是 20x ？

### 讨论 29

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：GTA6 Releaseparty ab 15:30\!  
     
   Hallohallo, wir haben alles umgeschmissen und sind doch gleich um 15:30 schon live und zocken rein in GTA\!\!  
     
   Alles andere was heute geplant war ist aufgeschoben, nicht aufgehoben\!  
     
   Eddy und Nils sind die ganze Zeit für euch am Start und im Laufe des Tages gesellen sich allerlei Böhnchen dazu, unter anderem Valle, Bonnie, Tim, Sarah, Henry, Ben uvm\!\! &lt;3  
     
   Das wird toll, kommt rum\! Stream geht mindestens bis Mitternacht, danach schauen wir mal, juhuuuu lets fucking goooo\!\!

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：把射精当成大招真的很奇怪啊\( ﾟ∀。\)  
     
   印象里早年看r18，女主至少会对男主说“我们一起去吧”显得对齐颗粒度。  
     
   现在的很多射精就跟奥特光线一样，男主丢闪女方立刻高潮开喷，跟“看到男主立刻排卵”一样奇异搞笑。射精应该是男方的缴械而不是终结技啊\( ﾟ∀。\)

2. **发言者 2**：你可以去看女性向的本子，而不是男性向\(｀･ω･\)

3. **发言者 3**：根据我二十多年资深处男的想象，应该是女方也临门一脚了，然后蛇精的冲击让她一起达到了高潮，这个样子\( ﾟ∀。\)7

4. **发言者 4**：对，应该让女主先去好几次，最后被草得受不了求饶以后男主才狠狠射出来\(〃∀〃\)

5. **发言者 5**：\( ﾟ∀。\)7

6. **发言者 6**：说到底，杆役蛇的时候对方真的会有感觉吗，感觉来自什么，精液的冲击力或者温度？\( ﾟ∀。\)7

7. **发言者 7**：嗨呀你别管

8. **发言者 8**（回复第 6 条）：\[引用第 6 条\]  
     
   想象  
     
   海绵宝宝划出一道彩虹.jpg

9. **发言者 9**：･ﾟ\( ﾉヮ´ \)･ﾟ\( ﾉヮ´ \)･ﾟ\( ﾉヮ´ \)

10. **发言者 10**：一键跟跳.jpg

11. **发言者 11**（回复第 2 条）：\[引用第 2 条\]  
     
   女性向本子也有哦\(｀･ω･\)强制爱除外

### 讨论 31

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

### 讨论 32

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Verkehrsberuhigter Bereich auf Durchgangsstraße  
     
   Hallo, ich bin gerade auf die Straße Bermbachtal in Ruhla gestoßen. Dort wird die als highway=secondary getaggte Ortsdurchfahrt abschnittsweise zum verkehrsberuhigten Bereich, wohl wegen des fehlenden Platzes für Gehwege. Aktuell ist dieser Abschnitt als living\_street eingetragen.  
     
   Ist das so korrekt? Ist jeder verkehrsberuhigte Bereich automatisch eine living\_street? Oder gilt das übliche Prinzip, dass wir Sprünge in der Straßenklasse vermeiden und sich das Tagging nach der tatsächlichen Verkehrsbedeutung, nicht der offiziellen Einstufung richtet?  
     
   \(Ich will mangels Ortskenntnis nicht beurteilen, ob die Einstufung als secondary hier gerechtfertigt ist. Falls ja, müsste man die Straße An der Gottesgabe für die entgegengesetzte Fahrtrichtung wohl auch heraufstufen.\)

2. **发言者 1**（引用未收录发言）：Danke\!  
     
   \(Der Link in deinem Beitrag ist wohl falsch. Das Zitat kommt aus DE:Key:living\_street - OpenStreetMap Wiki .\)

3. **发言者 2**（回复第 1 条）：Das gibt’s auch in Hochstadt. Da fahren sogar mehrere Linienbusse durch die Spielstraße, obwohl m. W. geregelt ist, dass Straßen mit ÖPNV-Verkehr nicht als Spielstraße beschildert werden sollen.

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: What made you pivot your interest to the field of AI?  
     
   If you work in the field of AI, machine learning what made you do so? What sparked your interest and which skills and resources helped you along the way?

2. **发言者 2**（回复第 1 条）：I was studying EE. I came across new face generation using GANs. I wanted to learn more. Someone pointed me to the fast.ai courses. I never looked back after that.

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：A pair of plays...  
     
   I drove out again to the same lake where I shot the sunrise a week or so back. There was periodic, off-and-on warm sunset light, but it was undependable. Also it’s already kind of toasted and crunchy looking in terms of “fall color”. Just hasn’t happened too much. These are a pair of images shot side by side. I’m not sure they’re good enough to survive. I’m also not sure the edits are done, but I’m stopping now.  
     
   Done in Greycard.  
     
   Hmmmm…  
     
   \[图片省略\]IMG\_7847-social1365×2048 1.31 MB  
     
   IMG\_7847.CR3 \(28.4 MB\)  
     
   IMG\_7847.CR3.gcd.txt \(1.4 MB\)  
     
   \[图片省略\]IMG\_7862-social1365×2048 1.73 MB  
     
   IMG\_7862.CR3 \(32.2 MB\)  
     
   IMG\_7862.CR3.gcd.txt \(2.3 MB\)  
     
   This file is licensed Creative Commons, By-Attribution, Share-Alike.

2. **发言者 2**（回复第 1 条）：Those are stunning, especially the first one is composed beautifully :slight\_smile: \!

3. **发言者 3**（回复第 1 条）：Brighter and louder.   :slight\_smile:  
     
   \[图片省略\]IMG\_78471600×2400 1.95 MB

4. **发言者 4**（回复第 1 条）：\[图片省略\]IMG\_78471322×1920 1.64 MB  
     
   IMG\_7847.CR3.xmp \(22.5 KB\)

5. **发言者 5**（回复第 1 条）：IMG\_7847.CR3.xmp \(11.6 KB\)  
     
   IMG\_7862.CR3.xmp \(14.7 KB\)  
     
   \[图片省略\]IMG\_78471762×2563 916 KB  
     
   \[图片省略\]IMG\_78621744×2380 1.04 MB

6. **发言者 6**（回复第 3 条）：\[图片省略\] 发言者 3:  
     
   Brighter and louder. :slight\_smile:  
     
   Aahh… Non, non un non\! :disguised\_face:  
     
   Softer and quieter. :shushing\_face:  
     
   \[图片省略\]IMG\_78621999×2999 1.09 MB  
     
   IMG\_7862\_01.CR3.xmp \(10.1 KB\)  
     
   dt 5.7.0\+1845~g69c98c95aa

7. **发言者 1**（回复第 6 条）：\[图片省略\] 发言者 6:  
     
   Softer and quieter.  
     
   I thought about B&amp;W when I shot that one but it was getting a little late when I was processing and I didn’t even try. The contrast makes it a natural.  
     
   What caught my eye were all the tiny leaves / blooms \(or whatever they are – it was too wet to get very close to it\).

8. **发言者 3**（回复第 6 条）：Different strokes for different folks.  Even so, might try a low key, later.   :slight\_smile:

9. **发言者 7**（回复第 1 条）：This is a one click edit using a style based on Fujifilm Velvia.  
     
   R7 Velvia.dtstyle \(6.0 KB\)  
     
   DT 5.7 IMG\_7847.CR3.xmp \(13.4 KB\)  
     
   \[图片省略\]IMG\_78471334×2000 1.14 MB

10. **发言者 8**（回复第 1 条）：dt 5.7 with C&amp;T module:  
     
   \[图片省略\]IMG\_78472000×2718 2.03 MB  
     
   IMG\_7847\_01.CR3.xmp \(27,1 KB\)

11. **发言者 7**（回复第 1 条）：Again another one click edit based on the Fujifilm style. I tend not to use it as it is overtop for color but it kind of suits this image.  
     
   IMG\_7862.CR3.xmp \(13.8 KB\)  
     
   \[图片省略\]IMG\_78621334×2000 1.38 MB

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Internet Archive Staffers Are Unionizing

2. **发言者 2**（回复第 1 条）：As a marxist, please don't kill the IA.

3. **发言者 3**（回复第 2 条）：Why would a staff union kill it?

4. **发言者 4**（引用未收录发言）：It's not about how much money is brought in but how it is spent. Is there money left over? Can something be cut? Service or people?

5. **发言者 3**（回复第 4 条）：Whether or not the organisation is run for profit, its sustainability shouldn't depend on paying people inadequately.

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Can't get 12v power relay to work  
     
   Hey there folks\!  
     
   I'm trying to open and close a set of 8 12v pneumatic valves. When I connect 12v power to one directly, it functions as expected. When I try to go through an 8-channel power relay module, I can't get it to power.  
     
   I've tried setting the high/low jumper to both positions. I've swapped out the wires that go from the 12v power source to the power relay with some 14 gauge wire. When I connect COM and NC, it's not powering the solenoid. I've tried multiple arduinos and power relays. Only the original power relay clicks, and then only once. I suspect I burned that one out during one of my initial tests.  
     
   I'm at a loss of what to try next. Can some of you fine individuals provide some guidance please? I'm planning on picking up a multimeter next.  
     
   \[图片省略\]IMG\_20261120\_1551225171920×2560 1.69 MB  
     
   \[图片省略\]IMG\_20261120\_1551309591920×2560 1.24 MB  
     
   \[图片省略\]IMG\_20261120\_1551373891920×2560 1.05 MB  
     
   \[图片省略\]IMG\_20261120\_1552220641920×2560 1.25 MB  
     
   Thank you\!

2. **发言者 2**（回复第 1 条）：It would appear that you don't have a circuit between the Uno and the relay board. I only see a single wire from pin 13 to IN8, with no return path.

3. **发言者 1**（回复第 2 条）：Yes, that's correct. The power relay is opto-isolated, which I think doesn't require a ground for the signal. Am I incorrect on this?

4. **发言者 2**（回复第 3 条）：You are incorrect. You do not have a circuit: an unbroken path that returns to its origin. Electricity 101, I'm afraid.

5. **发言者 1**（回复第 4 条）：Okay\! For this setup, would I connect from the Arduino ground to the same terminal that the 13 pin is going to?

6. **发言者 2**（回复第 5 条）：That would short pin 13 to ground.

7. **发言者 1**（回复第 1 条）：Yeah that makes sense. I'm assuming I wouldn't want it on the COM/NC/NO side, because 12v should be flowing there. Is that a bad assumption?

8. **发言者 2**（回复第 7 条）：You should begin with either a schematic of your particular relay board or the hookup instructions that should have come with it. If neither was included, you need to locate one or the other.

9. **发言者 1**（回复第 1 条）：Unfortunately, it didn't come with any documentation, and the product site has no documentation either.

10. **发言者 1**（引用未收录发言）：Thanks for the help\!

11. **发言者 3**（引用未收录发言）：Between com8 and in8 there's optocoupler, LED in practice that will be powered to trigger the relay. I wouldn't say there's "default configuration" here.

### 讨论 37

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[链接隐去\] à sauvegarder  
     
   Bonjour,  
     
   j'ai une adresse e mail sur \[链接隐去\] avec un bridge  
     
   comment faire pour sauvegarder sur un PC les paramétres du compte et tous les e mails ?  
     
   Cordialement

2. **发言者 1**（回复第 1 条）：bonjour,  
     
   j'avais trouvé le système importexportstooolNG  
     
   est-ce qu'il existe un autre moyen pour une sauvegarde ?

### 讨论 38

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Changing the SSO adress from mydomain.fr to vps.mydomain.fr  
     
   What type of hardware are you using: VPS bought online  
     
   What YunoHost version are you running: YunoHost 12.1.43  
     
   How are you able to access your server: SSH  
     
   Describe your issue  
   Hello  
     
   I have installed yunohost on a VPS and am trying to set it up.  
     
   I have the dns set in such a way the VPS is under the adress vps\[dot\]mydomain\[dot\]fr  
     
   For DNS reasons, I had to enter vps\[dot\]mydomain\[dot\]fr as a subdomain of mydomain\[dot\]fr, since it’s the one managing the DNS.  
     
   The problem is, when I try to access the SSO, it tries to redirect me to mydomain\[dot\]fr/yunohost/sso, wich don’t work since the server is behind another subdomain.  
     
   I want it to resirect to vps\[dot\]mydomain\[dot\]fr instead. How do I do this ?  
     
   vps\[dot\]mydomain\[dot\]fr is the main domain but the portal customisations are under mydomain\[dot\]fr on the admin panel  
     
   I tried changing the setting in etc/ssowat/conf.json.persistent but to no effect  
     
   Share relevant logs or error messages  
   no error log since it’s not an “error”

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How to gradually add vocab to Master\+?  
     
   I apologize as I’m certain this has been discussed before but I can’t find the thread. I really want to start incorporating master\+ for my vocab \(I’ve already done so for grammar\) but I’m worried I will have a deluge of over 1000 reviews if I do so. Is there any way to mark just a few items at a time as master\+ so I can space out the reviews?

### 讨论 40

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

### 讨论 41

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[求助\]发言者 1沒有共識的解決方案  
     
   各位大大好，最近我家老婆跟小孩想養貓  
   我試著陪小孩去一次貓店逗貓抱貓，也試過陪去收容所看貓抱了一下，因為我對氣味毛髮等各種敏感，加上也沒有喜歡，所以我就一直投反對票。  
   但是老婆去看了以後就越陷越深，現在說我不養貓不是真的理由，而是想要控制權。  
     
   這招打下來我不知道怎麼回應，我們也沒養過，我也理解喜歡小動物的心情以及愛貓人士的各種迷湯，只是老婆明明都知道我連乳液/香水/各種好的不好的味道都敏感，聲音也敏感，光去看貓試一下就渾身不自在，那我要怎麼辦呢？  
     
   好好跟老婆說了最後換來一句「為什麼是我說了算，為什麼是我在控制這件事」  
     
   =====================发言者 1以上請按Ctrl\+y刪除，以下請勿刪除发言者 1=======================  
     
   是否同意記者抄文：YES/NO  
   -----  
   Sent发言者 1from发言者 1J某社区发言者 1on发言者 1my发言者 1iPhone

2. **发言者 2**（回复第 1 条）：慢慢勸說，我老公是嚴重過敏，連去農場摸水豚都立馬

3. **发言者 2**（回复第 1 条）：長紅疹我自然不會想養任何動物，不然你就假日好好帶

4. **发言者 2**（回复第 1 条）：她去泡貓咖滿足她一下

5. **发言者 3**（回复第 1 条）：一堆養前喊可愛養後隨便亂養的垃圾飼主\+1发言者 1過敏嚴重

6. **发言者 3**（回复第 1 条）：也會死人\+1

7. **发言者 4**（回复第 1 条）：敏感~~要說得精確一點啊，是過敏嗎?

8. **发言者 4**（回复第 1 条）：會打噴嚏就算是過敏囉~~過敏就不能養阿

9. **发言者 4**（回复第 1 条）：你有過敏體質，小孩八成也會有，直接斷了這條路~~

10. **发言者 5**（回复第 1 条）：離婚

11. **发言者 3**（回复第 1 条）：要吃藥就是有過敏體質不要不信邪亂養\+1发言者 1偶爾帶他們

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：计算机背后都是数学，所以数学难题很容易攻克，属于专业对口吗？  
     
   那么医学背后是什么？为什么没有 AI 攻克癌症、慢病的一些好消息啊？

2. **发言者 2**：ai 目前还是擅长纯电脑能干的活吧  
     
   医学涉及到临床，太复杂了  
     
   希望早点介入医学，我爸妈牙齿不太好，要是能研究出牙齿再生就好了

3. **发言者 3**：它连自身的灾难性遗忘和神经网络的可解释性问题都解决不了。

4. **发言者 4**：等 A\\的消息吧

5. **发言者 5**：因为人类对生理的了解还很少

6. **发言者 6**：不是说 10 年内就攻克很多绝症么？希望 A\\ 不要乱吹 NB

7. **发言者 7**：我只希望 A÷股价别先死了

8. **发言者 8**：目前 AI 的 scaling 太弱了，还需要猛猛的 scaling，以前认为人脑一个神经元与大模型参数等价，最近有研究表明，单个人神经元就可以执行复杂运算，自身就可以相当于一个复杂神经网络，如果是这样，那人脑的参数量还要上升几个数量级。

9. **发言者 9**：发言者 2 你的这个愿望有实现的可能了。  
     
   吃药长牙！日本开展全球首例临床试验  
   \[链接隐去\]

10. **发言者 10**：要找志愿者，签生死状的那种，且亲属不准事后扯皮，国家层面不准远程施法。

11. **发言者 2**：发言者 9 666

### 讨论 43

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

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：刚悟到的一种学习方法论  
     
   就是给自己环境，例如想学画画？关注很多绘画博主，同时桌子上随时摆着画纸/数位屏和笔，电脑上下好绘画相关APP，手机上下好米画师。想学编程？关注很多技术博主，搭好编程环境。给X、某社区的相关圈子的博主点赞让它们多给自己推送等，让环境推着自己走\| ω・´\)

2. **发言者 2**：不会一转人在床上躺画技心中涨，收藏夹自己学习么\( ・\_ゝ・\)

3. **发言者 3**：\(\`ε´ \)只关注不学习满足信息收集癖的来了

4. **发言者 4**：Vibe Learning

5. **发言者 5**：确实有点用，我觉得是因为从众效应，看到身边人都在做某事，就更容易去做某事

6. **发言者 6**：我曾经在考试前一个月每天把课本摊在电脑前打游戏码字，你也快来加入吧

7. **发言者 7**：你为什么不反过来试试做减法？什么影响你学某件事物，你就去停止或减少这些事物的时间？

8. **发言者 8**（回复第 7 条）：\[引用第 7 条\]  
     
   \( ﾟ∀。\)好像有点道理

9. **发言者 9**（回复第 2 条）：\[引用第 2 条\]  
     
   画技没涨，手机里的色图反而涨了，撸管的熟练度高涨\(\`ヮ´ \)

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Knitted sections placed on holders  
     
   I am knitting the Leaves Cardigan by Florence Merlin, getting ready to start the yoke part of the pattern and need to pick up stitches from holders for left front, first sleeve, back, second sleeve and right front. Just wondering if anyone has a great way to avoid holes between all these picked up stitches. Thank you\!\!\!  
     
   Additionally if anyone has made this little cardigan and has any tips on the yoke portion, I would love to hear them. I’ve been reading all the notes on Ravelry and see I’m not only one in my confusion with this pattern. Thank you\!  
     
   Charlene

2. **发言者 2**（引用未收录发言）：I’m such a loose knitter. It looks like I knit the entire cardigan on a 2.25mm \(US1\) needle.  
     
   Don’t hesitate to come back and ask away\!

3. **发言者 1**（回复第 2 条）：Yikes\! Those are small needles\! Thanks for your help\!\!\!

4. **发言者 3**（引用未收录发言）：I use this method from Patty Lyons. It works really well\!  
     
       
         \[图片省略\]  
     
         \[链接隐去\]  
       
     
       
         
     
   Ask Patty: Seamless Sweater, No Holes – Modern Daily Knitting

5. **发言者 1**（回复第 4 条）：Thank you so much\!  
     
   Charlene

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Re: \[閒聊\] 相親男生聽到女生薪水2萬多就跑了  
     
   \[引用未收录发言\]  
   : 剛看到fb上有女網友談到  
   : 去相親時,對方男生一聽到她薪水只有2萬6  
   : 就說謝謝不聯絡了  
   : 底下有女網友回覆,她也是,對方還說好可憐搶著幫她把飯錢付了  
   : 最後丟了一句花錢消災,然後就沒下文了  
   : 現在男生也這麼現實嗎？  
   : 知道女生只有兩萬多,兩個一起也買不起房子直接刪除了  
   : 難怪少子化了  
   : 感覺這兩個男的也肯定是窮鬼了,根本是找分母的吧  
   :

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: 发言者 1 – An open-source MBTI alternative with 1024 profiles

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：为什么打yin'jing百度输入法首选词是“阴痉”？阴痉是个什么东西\( ﾟ∀。\)  
     
   词库被污染了么\( ﾟ∀。\)

2. **发言者 1**：如图，这还是我把该词恢复默认词频之后

3. **发言者 2**：\( ﾟ∀。\)引进？

4. **发言者 1**：ai和浏览器都搜不到这个词啊

5. **发言者 1**（回复第 1 条）：\[引用第 1 条\]  
     
   甚至高频备选词都没有阴茎的

6. **发言者 3**：那你可以看看这个  
     
   也是百度输入法\(　ﾟ 3ﾟ\)  
     
   现在看好像没有了，几天前我试了一下真的是这个奇怪的候选词

7. **发言者 4**：嘿我的也是\( ﾟ∀。\)什么情况

8. **发言者 1**（回复第 6 条）：\[引用第 6 条\]  
     
   \( ﾟ∀。\)7

9. **发言者 1**：我在任何一个平台上都没有搜到阴痉这个词的使用或解释..除了一些看上去没有检查直接使用了备选词的帖子或视频

10. **发言者 5**：之前也看到过吐槽帖说输入法越来越难用了\(´ﾟДﾟ\`\)并不了解这方面但有人说是因为现在都是AI抓取词库导致词库被污染了\( ﾟ∀。\)7

11. **发言者 6**：桀桀\(ゝ∀･\)快来用完全不联网的语燕输入法吧

<!-- samples:end -->

