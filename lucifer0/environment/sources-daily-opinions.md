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

<!-- samples:start -->

采集时间：2026-11-25 15:55:15（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Heart  
     
   \[图片省略\]

2. **发言者 2**（回复第 1 条）：how it is made?

3. **发言者 3**（回复第 1 条）：OMG IT’S ALIVE\!\! :grey\_heart:

### 讨论 2

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：老的 14 用了 3 年多了，坚持不住想换机。  
   之前都是直接官方购买，现在发现拼多多居然比官方便宜 1000 多，看红书又发现很多避雷帖。  
   想问大家，现在购买 iphone 比较靠谱且有性价比的渠道是哪里？

2. **发言者 2**：百亿补贴呗，保真不保新，拼多多百亿补贴买了 iPhone 17Pro，淘宝百亿补贴买了 iPhone 17，都没啥问题，iPhone 17Pro 的硬件厂商（三星屏、德赛电池）相对好点，不过这个应该和平台没啥关系

### 讨论 3

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

### 讨论 4

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：AirPlay  
     
   Hi all, I have NAIM Unity CI 102, it is AirPlay compatible and AirPlay is enabled via the App. However when playing local files in Spotify, the device does not appear under the track output “Bluetooth and Airplay” list. I can connect with Bluetooth but it requires phone to be left right next to the streamer. Anyone know how to connect with AirPlay?

2. **发言者 2**（回复第 1 条）：Why Airplay? You should be able to use Spotify Connect. Is the 102 visible in the Spotify app as a Connect device?  
     
   Is your phone on the same home network as the 102, not on a 4G network ?

3. **发言者 3**（回复第 1 条）：Mine was installed today and shows up on AirPlay on my iPad, but I agree with Chris. There are much better ways of playing from streaming platforms than using AirPlay…:thinking:

4. **发言者 4**（回复第 1 条）：Hi,  
     
   I have a similar issue, but with Chromecast casting on the CI-102.  
     
   I use and pay for lesser-known streaming services, so “big-name Connect” features don’t work in my case. I can work around it without this functionality, but it definitely compromises the practicality of the unit.  
     
   Regards,  
     
   Vladislav

5. **发言者 5**（回复第 1 条）：I use a MacBook and can see and connect to both of my CI-102 devices via Airplay. I simply select the output and direct the audio to the device I want to play to.  
     
   I’m not sure I understand your terminology about “playing local files in Spotify”.  
     
   Are you playing a locally stored files, such as on a NAS drive or trying to play Spotify?  
     
   What device are you actually using to control the CI-102?

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：2026 Nerd Games Swap Gallery  
     
   \[图片省略\]2026 Nerd Games Swap1920×1920 958 KB  
     
   Gallery for the 2026 Nerd Games Swap

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Pokemon Childhood Version: A romhack where Mew is under the truck

2. **发言者 2**（回复第 1 条）：This unlocks so many memories\!

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Description or inscription in name=\* tag  
     
   Hi,  
     
   could you please clarify if there are any local conventions in Poland regarding the name=\* tag, or if the general OSM standard applies: that name=\* should not be used for descriptive names?  
     
   The reason I am asking is that user Carpathians, who maps primarily in Poland, has started tagging description=\* or inscription=\* as name=\* in Slovakia. For example, in southern Poland, he tagged 36 historic=wayside\_shrine with name=NMP and is now adding this tag to features in Slovakia as well. Similarly, he uses name=INRI on historic=wayside\_cross, even when there is no inscription on the object.  
     
   I have tried to contact him, as have several users from Poland and Slovakia, but he hasn’t replied at all and continues to make similar edits.

2. **发言者 2**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   or if the general OSM standard applies: that name=\* should not be used for descriptive names?  
     
   yes, we even have some authorized bot edits purging common cases of that

3. **发言者 3**（回复第 1 条）：Over 7000 changesets from Vespucci :open\_mouth:

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：General measurements discussion for GraphWorks visualizer  
     
   Share and discuss your impressions of different measurements in the new GraphWorks visualizer tool, whether you’ve actually listened to the headphones or not \(which is normally taboo on most audiophile forums\).  
     
   I have not listened to most of the headphones in this tool btw. So most of my impressions will be based on the 5128 graphs, and sometimes some virtual listening. So they should be taken with a grain of salt.

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Top best Material Design apps  
     
   - Top 1: Tomato Timer - a simple focus timer  
   - Top 2: Material Capsule - a dynamic island for Android  
   - Top 3: n0widget - simple widgets with material designIdeas for another top 3 in comments.

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Re: \[心情\] 跟自己的小孩嘔氣  
     
   感覺妳還蠻幸福的呀  
   1.老公顧家，要忍受都在外面工作不能陪伴孩子的日子。孩子也愛他  
   2.妳還很上他的心  
   3.他有提前預告不是硬來蠻幹，都提前預告了感覺得出他的期待。  
     
   看下來其實我真的覺得他沒啥問題  
   期待落空和妳在文章中那種事不關己的態度多少會讓人有點氣餒，畢竟夫妻關係和房事應  
   該是雙向的。  
     
   妳也不看看很多人妻在婚姻中最常抱怨的是什麼？  
   就是老公不顧家、小孩不親爸都黏媽媽、老公不碰她、老公外面有人、家務繁忙老公硬來  
   等等...  
   他不是完美但還不錯吧？有到需要上網發一篇要公幹他的程度嗎？  
     
   —  
     
   哎  
   您的故事讓我想到我一個朋友  
   也是長期在外面工作的  
   老婆每次他回來都會把小孩哄睡然後給他驚喜，或是有什麼戰袍和小情趣什麼蛋之類的（  
   再講下去就18禁了）。  
   夫妻關係可好的咧...  
   他也更努力在工作、更愛他的家庭、超愛他老婆。  
     
   準備一點小心意或是幫忙哄哄小孩應該不難？當然如果不願做也沒差沒有對錯，畢竟婚姻  
   和夫妻心靈關係是你自己的。  
     
   我是覺得男性這種生物真的很簡單好拿捏啦...

2. **发言者 2**（回复第 1 条）：有心沒心其實都看得出來

3. **发言者 3**（回复第 1 条）：馭夫術這麼簡單就是有一堆白癡要對著幹

4. **发言者 4**（回复第 1 条）：能靠半百肉體就抓緊的老公，不知道到底在不滿什麼

5. **发言者 5**（回复第 1 条）：老公半百了還有需求,你應該要感恩...

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Money Doesn't Grow on Trees\! - An incremental game made in 48 hours  
     
   Hi everyone\! I’m really proud to share with you all a game made in 48 hours for a local game jam.  
     
   In Money Doesn’t Grow on Trees, you play as Stee, a mutated gardener fish, taking care of Pr. Maria GIRLBOSS garden by planting trees that gives you money \!\!\!  
     
   Plant a tree and use money to evolve it  
     
   Water them so they keep producing  
     
   Protect them by punching praying mantises trying to eat them  
     
   Reach every tier of Pr. Girlboss’ requests to unlock all the plants  
     
   The game is available right here on \[链接隐去\] \!  
     
   NOTE : Only jam participants are able to rate the game, but you can still play and have fun\! A post-jam version is already in the works and will be available once the winners are announced.

2. **发言者 2**（回复第 1 条）：i think the tutorial is not understandable, at least for the first few seconds i don’t know what happens i just see some art that isn’t very clear, i suggest you making more clear tutorial or if tutorial is some sort of prologue if this is more story-based game then change the tutorial’s name to prologue

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Any guides for sending SMS with an Air780EX Breakout Module?  
     
   Maybe I’m just not looking hard enough but I have yet to find anything that worked \(nor a comprehensible AT command guide\). I might also just be botching the wiring.  
     
   This is how I’ve been wiring it:  
     
   Uno R4 TX &gt; level shifter &gt; Air780EX RXD  
   Uno R4 RX &gt; Air780EX TXD  
   Uno R4 GND &gt; Air780EX GND  
     
   I’ve been powering the Air780EX with a 5V power adapter through the VIN pin

2. **发言者 2**（回复第 1 条）：check the datasheet for your board, is 5V enough to power it? I've seen such modules needing 6-12V 2A  
     
   I also recommend the level shifter on both RX and TX.  
     
   By the way, how did you wire the level shifter?

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：看到了一套国民党套餐\( ﾟ∀。\)  
     
   饮品：

2. **发言者 1**：小菜

3. **发言者 1**：主食

4. **发言者 2**（回复第 3 条）：\[引用第 3 条\]  
     
   这个是真好喝，有点中西菜式结合的味道\( ﾟ∀。\)总之感觉很奢靡的生活才能创造出这种菜式

5. **发言者 3**：讲解食\|∀ﾟ

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Underground Pipeline  
     
   This is a small render I wanted to do as a concept for an animation where two characters meet on a bridge. Personally, I like the lighting, but I think it still needs more greebles. Thoughts?  
     
   \[图片省略\]Underground Pipeline1920×1080 2.92 MB

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：事情起因是写的代码质量不高出现告警，凌晨 2 点被拉起来改代码  
   可能后续还会复盘什么，搞得压力有点大  
   想问大家都是这样的吗，想考公了

2. **发言者 2**：问薪无愧

3. **发言者 3**：AI 写的还是自己写的

4. **发言者 4**：复盘：下次记得睡觉前手机关机  
     
   给几个钱哦，还 2 点起来给你改 bug，真要是重要也不至于上线才发现 bug，更不至于没有 AB 角晚上值班

5. **发言者 5**：回滚，有问题明天再看

6. **发言者 6**：不太理解为啥非要 2 点改 bug，而且还只是告警不是真实出问题。再说了，即便真出大问题，凌晨 2 点钟有人用吗？又不是全球服务。正确的做法是先回滚再说，慢慢排查呗

7. **发言者 7**：还是庙太小，半夜 2 点 还能上线的，肯定不合规

8. **发言者 8**：我最近一想到工作心理压力就挺大，刚工作的时候半夜改代码不会有心理压力，那时对未来充满期待，现在只想快点退休

9. **发言者 9**：发言者 6 国内一些制造业企业，24 小时生产的，软件上线后都是直接在生产环境改的，凌晨改 bug 不要太正常，不改就停产

10. **发言者 10**：怕不是慢查，凌晨就性能瓶颈，早高峰直接爆炸。  
     
   不过直接回滚就好，2 点改也改不明白，也没测试回归。

11. **发言者 11**：这个点我还没休息…

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 是不是只要會投廣就可以做行銷?  
     
   以前聽行銷的同事聊天都感覺他們超屌  
   懂品牌 想策略 企劃活動廣告什麼的一堆  
   然後還要很瞭消費心理  
     
   但現在的行銷同事 聽來聽去就是在投廣而已  
   好像應徵的時候說有考GA證照就好= =  
     
   這是世代的崩壞  
   還是行銷這行業要掛了XD

2. **发言者 2**（回复第 1 条）：行銷\(X\)詐騙洗腦\(O\)

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：4 Seasons Paintings  
     
   I don’t think I’ve ever shared this one before.  
     
   Back in the day, when my kids were little, we used to go to this open art studio in town. They provided all the materials and even fed us lunch, and it was a great place to meet people of all abilities and social backgrounds. Anyway\! You were allowed one canvas per visit, and on one of my visits, I made a tree and experimented with a dish scrubbing thing to make the leaves. I took the tree home and I really liked it, but it looked so odd by itself on a wall, as the canvas is fairly small. So I thought I’d create other trees to complement it, and I decided on trying to recreate the tree for each season. Here is the result. The group is currently hung on the wall of the powder room/main level bathroom.  
     
   \[图片省略\]20260707\_1908151920×1440 416 KB  
     
   This was the first painting \(summer\):  
     
   \[图片省略\]20260707\_1915121920×2560 1.04 MB  
     
   Unfortunately it got a bit scratched when I had to put it in storage when were renovating last year.  
     
   Fall  
     
   \[图片省略\]20260707\_1915321920×2560 1.03 MB  
     
   I guess I forgot to take an individual photo of the other two. Oops\!  
     
   Thanks for looking\!

2. **发言者 2**（回复第 1 条）：These are great, I always love sets of art of the four seasons.

3. **发言者 3**（回复第 1 条）：Very cool\! I like the way they are grouped, also.

4. **发言者 4**（回复第 1 条）：Very cool\!

5. **发言者 1**（回复第 1 条）：Thank you everyone for your kind words\!

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Fund browser-grade certificate checking for every TLS client

2. **发言者 2**（回复第 1 条）：Really interesting idea. I like that it's distrust only.  
     
   Would OneCRL track revocations for certificates outside the trees trusted by Mozilla? A couple years ago I was looking at the differences between some common trust roots, as they are not entirely aligned, especially Microsoft's. I think there may be a renovation gap there?

### 讨论 19

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How do you navigate the new forums?  
     
   I use the web version of 某社区 on my phone to do reviews, learn new items, and interact with the forums. Since the forums updated yesterday, I’ve struggled to get to the last reply in a thread.  
     
   This is especially true for the Gourmet Race. I can scroll through the replies, but there are well over a thousand now, and I don’t see the option to quick-scroll to the bottom. I tried with the mobile site and the desktop site.  
     
   I also had tracking on, so I could click to the last reply that I read. The tracking option is still how I left it, but the button seems to have disappeared.  
     
   Is there a feature that I’m not seeing? How do I navigate the new forums interface?

2. **发言者 2**（引用未收录发言）：It’s very… 某社区… and I really don’t like 某社区

3. **发言者 3**（回复第 1 条）：I thought I was going crazy because I just couldn’t figure it out :sweat\_smile:

4. **发言者 1**（引用未收录发言）：Hi 发言者 6, I’ve just tried again, and I’m still not able to get to the bottom of the page for the Gourmet Race. The best I can readily do is get to September 7. If I scroll to the bottom from there, I can get maybe a week at a time.  
     
   The “Can we still walk together” thread is equally difficult to navigate.

5. **发言者 4**（回复第 1 条）：Seconding 发言者 1; the new layout is effectively unusable on my web version. Also seconding 发言者 2, this new layout wastes a lot of space and I don’t like the nested replies.

6. **发言者 4**（回复第 5 条）：Additionally, when I posted this reply, it didn’t immediately load into the page and instead I had to hard refresh the page to validate my own reply had gone through.

7. **发言者 5**（回复第 1 条）：I’ll be waiting for the last touch up on the forums but really not a big fan of the nested replies either…  
     
   It makes some answer get lost under the little \+ signs and it’s more difficult to follow the whole thread chronologically.  
     
   As stated by  发言者 2 above, it’s suppose to be a forum not 某社区.  
     
   Also, give me back the read the level color\!  
     
   Brunpro ain’t blue.

8. **发言者 6**（回复第 4 条）：Has been fixed on all theme versions. Sorry for the delay\! I needed to push through a few other fixes at the same time that I was able to pick up :person\_bowing: . Opening pages to your last read position and the sidebars should all be working now correctly. Please let me know if there are any other issues\!

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：A request for freezing the editing of the Indo-China border areas  
     
   \[图片省略\]  
         
         Chinese Editors altering Disputed Territories India  
         
     
       
     
       
       Updates today:   
   Accounts with shared changest comment:   
     
   Manually adjusted boundary nodes to align with aerial imagery and verified local landmarks. \[Batch x/59 · part y/2\]   
     
   where x and y are positive integers.   
     
   Aadhya Shetty , changeset 192341359 , 192347512  
   Gaurangi Saraf , changeset 192344873  
   Laban Majumdar , changeset 192344876 , 192347518  
   Libni Shah , changeset 192344883 , 192347521  
   Pratyush Dhawan , changeset 192344884  
   Rajata Bhatia , changeset 192344885  
   aarnagara16@ , changeset 19234503…  
       
     
   As an Indian national, l draw the attention of the international community to this very sensitive issue. OSM is a mapping community only. There’s an ongoing power struggle going on in the ground between Indian and the Chinese forces at the LAC. Since there has been no proper settlement so far, l would request the DWG to freeze the editing of the Indo-China border to prevent any kind of misrepresentation on the map.

2. **发言者 2**（回复第 1 条）：Just a friendly reminder: if you’d like to bring this to the DWG’s attention, it’s best to contact them directly rather than simply drop their name here. You can find the contact details on the wiki: Data Working Group - OpenStreetMap Wiki

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Will Claude be able to solve future maths problems?  
     
   I think what we are seeing is amazing, Claude has been able to prove the Riemann Hypothesis. I also read that the solution was an idea used by Chebyshev. So my question is: what if Claude approaches a problem that it has never seen in training and that no one has tried to solve in infinite ways, without a lot of examples from the last 150 years?

2. **发言者 2**（回复第 1 条）：A problem that it has never seen in training casts a shadow—in the form of a common ancestry of ideas and jargon—that it has seen in training.Without that shadow, the problem would be utterly alien to us. We wouldn't even have the language to express it, so how could we feed it to Claude?

3. **发言者 3**（回复第 1 条）：Simple yes

4. **发言者 4**（回复第 1 条）：I wouldn't bet on it. LLMs are poor with math. Many of the unsolved questions in Humanity's Last Exam are mathematical.The main strength of a LLM is being able to turn electricity into attention, and most likely it's an augmentation like CAD rather than doing the whole work.

5. **发言者 4**（回复第 2 条）：They were great at mixing at matching broad ideas that may be unconnected to a person. The old LLMs at least, expensive ones like GPT 4.5. They were excellent at this, but nobody wanted to pay the cost.The new ones are more directional, like a flashlight targeted at coding.

6. **发言者 5**（回复第 4 条）：How can you say LLMs are poor at math?  You lost me at that.

7. **发言者 1**（回复第 2 条）：Let’s imagine that someone will produce with his research the new Riemann Hypothesis. No reason to think that a new theory is “alien to us”, it can simply be new to us

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：原来网上自称的做题蛆都是自嘲的吗  
     
   最近mj宇宙很火   大家普遍评价都是很贴合国内高中  
     
   但我怎么记的高中身边各处都是做题蛆  
     
   那有什么娱乐活动宿舍活动  
     
   IP 河北\( ´\_っ\`\)

2. **发言者 2**：哦哦抱抱肥哥\(=ﾟωﾟ\)=不过我印象中的高中做题蛆主要是一部分人特别明显吧，比如开个元旦联欢别人看围在教室里表演他在一边刷题的那种\|-\` \)好在大部人应该只是淡淡的做题蛆味。  
     
   IP 山东

3. **发言者 1**（回复第 2 条）：\[引用第 2 条\]  
     
   为什么元旦要联欢  \( ´\_っ\`\)

4. **发言者 3**：你已经亮出IP了自己心里应该有答案了吧\(　ﾟ 3ﾟ\)，地域性问题罢了  
     
   IP：河北\( ;´д\`\)

5. **发言者 4**：可能不同地区不同校风不一样 ip 浙江 我们高中当时选科分班后 两个班二十几个男生下课天天跟 mj 高中一样天天去看厕所里的黄金巨蟒\( ﾟ∀。\)做题蛆也有 但是我们都一起玩

6. **发言者 5**（回复第 3 条）：\[引用第 3 条\]  
     
   即使是河北高中也是有元旦联欢的  
     
   ip石家庄某机场县

7. **发言者 6**：元旦联欢不只是整点花生瓜子看个电影而已吗\( ´\_ゝ\`\)旦  
     
   ip河南

8. **发言者 7**：还好吧，感觉并没有很浓重的做题氛围\( ﾟ∀。\)感觉更像是由于绝望所导致的淡淡的死感和“人之将死”的癫狂  
     
   IP：陕西西安北郊某省示范26届

9. **发言者 8**：河南的  
     
   5点40上早自习，10点才下晚自习，两个星期才回家一天（对农村学生甚至是半天），身上邋遢发臭是好学生的象征，勤洗澡讲卫生是要被批评的对时间的浪费（当然这个还是看班主任，很多还是没这么变态的），任何形式的电子产品都严重违纪，看课外书也不允许，哪有时间玩什么，下课时说两句话差不多了  
     
   甚至听家里的小辈说同高中现在下课说话也被管，教室的监控还接入了抬头率监测系统，上自习时东张西望也会被扣分  
     
   元旦联欢倒还是有的，至少我17年上高中时有，一群男生看到女生穿短裙就瞪眼张嘴互相嘿嘿，因为那时候县里的确没几个女人会穿短裙。现在就不知道有没有这联欢了

10. **发言者 9**：做题蛆也是有娱乐活动的\( ﾟ∀。\)  
     
   ip石家庄

11. **发言者 10**：哪有娱乐活动，不都是看看黄金巨蟒、综合楼玩玩电梯、上课偷吃、八卦别人谈恋爱、和兄弟重复烂梗这种苦中作乐的事\( ﾟ∀。\)  
     
   就是因为没啥好玩的，一个隔壁班的笑话可以乐一学期

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Testing Hairgasm add on  
     
   \[图片省略\]Screenshot 2026-11-24 at 10.26.571459×1027 1.66 MB  
     
   Hairgasm - select a shape, paint where the hair goes and click a button. male, female and fabulous styles to instantly pick from

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Opportunities \| Prediction Market 核心管理岗位  
   Job Type: Full-Time ，Reomte  
   PS：  
     
   1. 资深合规 / 合规专家  
   负责预测市场业务的合规体系建设，涵盖市场准入、监管政策、KYC/AML、交易监控及风险管理。  
   必须具备预测市场合规经验，有 Kalshi、Polymarket 等平台背景者优先。  
   2. 资深产品/产品负责人  
   负责预测市场产品整体规划与核心功能设计，涵盖事件创建、市场定价、交易机制、流动性及结算流程。必须具备预测市场产品经验。  
   3. 资深运营/运营负责人  
   负责预测市场平台整体运营，包括市场及事件运营、用户增长、交易活动、用户留存和数据分析。  
   必须具备预测市场平台运营经验，有实际交易量及用户增长成果者优先。  
   4. 资深市场/市场增长负责人  
   负责预测市场全球品牌营销及用户增长，统筹 KOL、媒体、社区、内容营销和海外市场推广。  
   必须具备预测市场行业营销或增长经验，有成熟渠道资源及实际获客成果者优先。  
   5. 资深商务/商务合作负责人  
   负责预测市场全球商务拓展及战略合作，包括交易平台、钱包、流量渠道、媒体及 Web3 生态资源合作。必须具备预测市场行业 BD 或战略合作经验，有成熟行业资源和商务落地能力者优先。  
     
   统一硬性要求：  
   （1）必须有真实 Prediction Market（预测市场）从业经验，普通 Web3、CEX、DEX 背景不能替代。  
   （2）中英文均须流利，能够独立进行商务沟通及专业业务交流。  
   （3）优先考虑 Kalshi、Polymarket 等预测市场平台背景。  
   （4）注重实际业务经验和执行能力，不局限于战略规划及团队管理。  
     
   请携带简历咨询，谢谢，  
   介绍合适 candidates 有酬谢，  
   \[联系标识隐去\]  
   E: \[联系方式隐去\]

### 讨论 25

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

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Marten Speakers  
     
   Hi Richard, I would appreciate if you can open the locked thread “Marten Speakers” and merge this post below into the thread. Thanks.  
     
   Continuing the discussion from Marten Speakers:  
     
   发言者 2 may I ask if you still have the Gryphon Diablo 300? Does the amp come with the internal Gryphon DAC?  
     
   I am having a bit of a conundrum at the moment after the Naim amps have been optimised to a high level. After several lengthy comparisons I now find the Diablo 300 to sound less open than the Naim 282/250DR/HicapDR with a darker sound in the midrange. I currently suspect the mains power cables used with the Gryphon are the culprit as all the power cables I own are warm sounding. The Shunyata Alpha-X NR didn’t quite fit as it made the sound more polite and relaxed, presumably with its noise filtering.  
     
   Long story short, may I ask what power cable did you use with the Gryphon Diablo 300 when you had it? Have you compared any other power cables on the Gryphon?

2. **发言者 2**（引用未收录发言）：Also the DAC plays important role. In my case I use the DAC of my cd player, the Esoteric K-05XD, for streaming too. And the result is great. Before choosing that route, I had done various A-B comparisons including Gryphon’s own optional unit.

### 讨论 27

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Turkey Rosette Award Ribbon Gift Bag Decorations - Like You Do for Thanksgiving  
     
   \[图片省略\]TurkeyRosettes01576×451 133 KB  
     
   I’ve been on a bit of a rosette jag and already started a Topic for the snowflake and winter ones I’ve been making thinking that I would stick to that broad theme. I had already planned to make a couple of these die cut turkeys to decorate gift bags.  
     
   \[图片省略\]TurkeyRosettes03366×576 60.4 KB  
     
   You see our lovely neighbor’s dog, Jag, is one of Vivienne’s best friends AND that lovely neighbor’s girlfriend loves Viv, too, and often gives her lovely gifts in charming packaging, including an Easter basket and a plastic jack-o-lantern\! Viv really wanted to give back, so we put together 2 gift bags with some Thanksgiving-themed treats and toys for Jag and for the girlfriend’s dogs. Anyway, I couldn’t keep myself from adding rosettes to the turkeys. Whatta ya gunna do?  
     
   \[图片省略\]TurkeyRosettes02349×576 84.7 KB

2. **发言者 2**（回复第 1 条）：So cuuuute\!\!

3. **发言者 3**（回复第 1 条）：Viv is so generous and has a good eye for design.

4. **发言者 4**（回复第 1 条）：Fuh-ancy\! You know, I can appreciate a gift giver who goes above and beyond to beautify the packaging and Vivienne is clearly among those who understand that presentation is important. I especially like the addition of that Thanksgiving colored glitter along the edge.

5. **发言者 1**（回复第 1 条）：Thanks, everyone\! It was really fun to dig around in my autumn-themed papers for the rosette part.  
     
   发言者 4 That’s one of the new Liquid Tinsels from Tim Holtz\! I couldn’t resist and bought a bundle of all four. I’m also on a glitter jag\!

6. **发言者 5**（回复第 1 条）：Instantly heard a turkey gobble in my mind. I love that you chose the realistic colors with having the blue head. You don’t see that often in decor, and I just love that you went in that direction.

7. **发言者 1**（回复第 6 条）：Aw, thanks\! We have wild turkeys that make a circuit through the “neighborhood” which is maybe why going with blue was the only thing I even considered.

8. **发言者 5**（回复第 7 条）：Oh I bet- very jealous of your current location. It would be a dream for Mr. Stitch and I :grin:

9. **发言者 1**（回复第 8 条）：We’re quite lucky to have gotten our spot in the woods when we did\!

10. **发言者 6**（回复第 1 条）：Wonderful gift tags, the rosettes are a perfect addition to the turkey tails :turkey:

11. **发言者 1**（回复第 10 条）：Thanks so much\! I thought the same thing about the rosettes and the tails\!

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Why there are still no non-WebKit browsers on iOS

2. **发言者 1**（回复第 1 条）：Sad to see that Apple is trying to avoid adhering to the spirit of the DMA by setting requirements that are very difficult to fulfill. And to make it worse they keep these requirements secret and don't allow Mozilla to talk about them.

3. **发言者 2**（回复第 1 条）：This is why iOS is not a serious computing platform.

### 讨论 29

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

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Sightline – Windows CLI for AI agents to capture UI and map DPI coords

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Need help with understanding auto exposure values  
     
   Godot Version  
   4.7.3  
     
   Question  
   I’m having trouble understanding how to properly set up auto exposure with proper values in Godot.  
     
   I’m using physical light units with a small test scene. I have a sun and sky set up with correct values. According to charts for EV 100, the max exposure value should be around 14 and the minimum between 4 - 7 \( I have a small indoor area for testing exposure\). However, these settings make everything way too dark. The default settings look more correct, but it doesn’t make sense to me. In Unreal these settings work just fine so I figured it had to do with aperture and shutter speed. I’ve looked through the documentation on camera attributes as well as looking up real world camera settings, but I’ve not been able to translate between the two. I’m guessing I’m just not understanding how cameras work in general. Any help is appreciated.

### 讨论 32

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：既然本子界有黄毛不良，巨O小男孩，眼镜肥宅和筋肉黑人四大NTR知名人物，那为什么没有本子作者把这四个人设反转成不良少女，巨乳小学生，体味很重的宅宅和黑皮体育生再去逆NTR原来的婊子女友，画四大天王轮番上苦主的本子呢？  
     
   感觉要是画出来了会很有热度\( ﾟ∀。\)7

2. **发言者 1**：换种想法，四大牛人高手瞒着大和抚子型的妻子轮番偷吃也好味\( ´ρ\`\)  
     
   每次回家都发现不了老公被巨乳小学生领居闯入家门诱惑，黑皮体育生亲戚在吃饭时偷偷逗弄老公却察觉不到，和老公约会到一半却被不良少女凶狠地打断，老公被拉走后无能的妻子只能一个人掉小珍珠，老公的阴湿阿宅妹妹主动提出搬过来住，却不知道体味很重的阿宅天天都在偷吃…最终发现被牛了的大和抚子型妻子伤心流泪，被四大高手架着一块搞6P最后体会到了真正的快乐…诸如此类的展开\( ´ρ\`\)

3. **发言者 2**：我记得有个黄毛变性被反杀的本子，很不错  
     
   \(\*´∀\`\)

4. **发言者 3**：看到过这类题材的黄文，我也是兴冲冲去看，结果发现这剧情我都硬不起来\( ´ー\`\)  
     
   原来我本质是喜欢“男性占主导地位”

5. **发言者 4**：巨乳小学生最好是雌小鬼\( ´ρ\`\)

6. **发言者 5**：淦\( \`д´\)你他妈的淫商一定有190！

7. **发言者 6**：男主角一挑五吗，那很血气方刚了

8. **发言者 6**：所谓6p其实最少有三个人都在百合play罢

### 讨论 33

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

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：最近折腾了不少节点，踩坑无数，直到用上这个日本原生家宽，才算真正找到了"毕业款"。独享住宅 IP，纯净度拉满；不吹不黑，实测一周，直接把之前收藏的十几个节点全删了——这节点真没对手。  
     
   产品优惠一览，总有一款适合你  
   光说节点好不够，这家的产品线覆盖很全，价格也够狠：  
     
   动态住宅代理｜$0.47/GB 起，流量计费，流量永久有效不清零，无隐形扣费，适配调试、批量采集  
     
   长效静态 ISP 代理｜$3.2/月起，包月独享，端口不限流量，低延迟稳定性强，长期养号优选  
     
   短效静态住宅代理｜$0.02/条起，价格实惠，在线周期可控，短时高频任务即用即换，避免资源浪费  
     
   无限流量套餐｜$0.3/天/端口起，无需监控流量余量，适合长期跑业务，降低运营成本  
     
   充值福利：充值赠额最高 15%，多充多送  
     
   老用户拉新：拉新成功可拿佣金返利  
     
   适用场景覆盖：跨境电商、海外社媒矩阵、账号运维、数据采集、广告核验、AI 工具等业务。  
     
   住宅 IP 获取渠道  
     
   我用的这家：\[链接隐去\]  
     
   邀请码：Novproxy888  
     
   福利：送大家一批 CDK 测试  
   光说没用，直接上福利。下面这批 CDK 兑换码，先到先得，手慢无：  
   RPGR-FTZ2-ZLUP  
   SAHJ-AWEG-K5EC  
   GCR7-QMCB-NU7T  
   GTB8-5YAK-ZYDK  
   K6FQ-7GN9-7A8V  
   FTQ9-RC5H-DVJ2  
   UQJD-86R5-VL67  
   LEUV-5MKZ-LTMA

2. **发言者 2**：muse 不能绑 IP，不然我记入手了。 现在 muse 的 IP 真的是脏啊

3. **发言者 3**：不错不错，使用它成功注册了 muse

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Mails répétés toutes les 35 minutes par Nextcloud  
     
   What app is this about, and its version: Nextcloud 35.0.3~ynh1  
     
   What YunoHost version are you running: 12.1.43  
     
   What type of hardware are you using: Old laptop or computer  
     
   Describe your issue  
   Bonjour,  
     
   Depuis le 7 novembre, tous les utilisateurs de mon instance Yunohost reçoivent un mail de Nextcloud à intervalle régulier \(toutes les 35 minutes\). Pourtant aucune action n’a lieu au niveau de l’adresse mail…  
     
   Je vous joins une capture d’écran d’un des mails.  
     
   Merci par avance \!  
     
   \[图片省略\]ResizedImage\_2026-11-22\_17-21-58\_00721079×2288 158 KB  
     
   Share relevant logs or error messages  
   Voici les derniers logs de la mise à jour faite il y a 5 jours : \[链接隐去\]

2. **发言者 1**（回复第 1 条）：Cela a été résolu en désactivant l’option “Utiliser les e-mails de transfert des utilisateurs de YunoHost plutôt que les e-mails principaux ?” sur le panneau d’administration de l’application Nextcloud. Aucune idée si c’est un bug avec l’option, ou, si c’est le cas prévu lorsque tous les utilisateurs n’ont pas d’adresse mail de transfert

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Great Electronic Music With Meaningful Lyrics  
     
   I’m searching for more albums in this category.  
     
   As examples, here are 3 albums that I really enjoy and think are highly worthy of strong recommendations:  
     
   \[图片省略\]IMG\_0021994×1055 49.1 KB  
     
   \[图片省略\]IMG\_0020973×1066 158 KB  
     
   \[图片省略\]IMG\_0022980×1038 128 KB  
     
   Based on my taste, would anyone care to share some similar recommendations?  
     
   Cheers,  
     
   Stavs

2. **发言者 2**（回复第 1 条）：Hi 发言者 1,  
     
   Nearly a day passed and no responses from the forum:- what is going on? :thinking:  
     
   FYI I found the Lilly Allen album example OK, I was less keen on the Smile:D album by Porter Robinson, however not sure if this will work for you, but you could try music by ‘Getdown Services’.  
     
   Presently, I am listening to the album Massive Champion.  
     
   Have fun\!

3. **发言者 1**（回复第 2 条）：Thanks 发言者 2 for the recommendation. I’ll check it out.  
     
   Electronic music is a funny thing these days - there is just so much of it available. A lot of it leaves me a cold. It’s difficult to pinpoint what ticks my boxes. So different from the jazz, rock and blues I tend to listen to most, but certain electronic albums really do it for me.  
     
   The search continues…

4. **发言者 3**（回复第 1 条）：It depends what you mean by meaningful lyrics, and the type of electronic music you like…  
     
   I love this album:  
     
   \[图片省略\]image516×516 38.4 KB  
     
   An electric storm by White Noise  
     
   An old album, lyrics quite varied from amusing to sombre. I find the lyrics of the track The Visitation quite moving.

5. **发言者 4**（回复第 1 条）：Hi 发言者 1  
     
   Would 发言者 4 Eno - The Ship, fit your requirements?

6. **发言者 5**（回复第 1 条）：\[图片省略\]IMG\_9520726×704 110 KB

### 讨论 37

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

### 讨论 38

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：9/UX: a Macintosh-inspired desktop for 9front  
     
   I have written a story about this on the Register, but of course I can't post that here.  
     
   I think this is a quite astonishing effort and could make 9front \_considerably\_ more usable... but it's bot-assisted, so I don't think they'll take it.

2. **发言者 2**（回复第 1 条）：Bot assisted aside, it avoids the uncanny valley that a more faithful implementation might fall victim to. Only weird thing was that /home was suddenly lost during the demo and acme crashed \(Firefox\).

3. **发言者 3**（回复第 1 条）：Aesthetically its somewhat interesting, but getting these two very distinct GUI paradigms to mesh well in practice is going to take a lot more effort.

### 讨论 39

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

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Neue Luftbilder der Stadt Bern  
     
   Laut dem Berner Mediencenter und der Erwähnung von 发言者 2 gibt’s in Bern neue Luftbilder, die aktuell grad mal 6 Monate alt sind.  
     
   Sobald Add 2026 imagery for the City of Berne by 发言者 2 · Pull Request \#3116 · osmlab/editor-layer-index · GitHub akzeptiert wurde, sollten diese Luftbilder bei vielen OSM-Editor-Apps automatisch ankommen, mit \[链接隐去\] sollten diese Fotos auch in JOSM angezeigt werden.

2. **发言者 2**（回复第 1 条）：Man kann natürlich in allen gebräuchlichen Editoren die URL auch für einen “Custom” Hintergrundeintrag verwenden, wenn man nicht genügend Geduld hat :-\).

### 讨论 41

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

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: The all-in cost of buying $1k of Bitcoin in 58 countries, updated daily

2. **发言者 2**（回复第 1 条）：I might be stupid, butisn't "$1000 of bitcoin" a pretty vague thing? I thought every exchange has its own rate \(even before thinking about comission and fees, which your website compares\). Does it make sense to compare "$1000 of bitcoin" in different countries, since it could mean different amount of bitcoins?

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Abandoned Motel Doors in California  
     
   I spent too much time looking at Dino Kuzniks shots again, as one does, got me nostalgic for my last US trip, so I decided to browse through my older photos again and in the meantime I whipped out a look that gets close to his colors/dynamic range.  
     
   I still struggle with a contrast complex, but I think that this one kind of works - the shadows arent too crushed, the white point is controlled, yet the image still feels punchy. At least - I think - curious to see your takes\!  
     
   \[图片省略\]DSC\_08241289×1920 1.07 MB  
     
   DSC\_0824.NEF \(26.5 MB\)  
     
   DSC\_0824.NEF.xmp \(15.4 KB\)  
     
   \(requires the “full” spektrafilm pack from here - Darktable spektrafilm pack generator - I am using the new Portra 400NC with arctic upsampling, going into negadoctor and into AgX - sue me :smiley:\)  
     
   Edit: switching the film stock to Portra 800 also works really good, I recommend you try that if youre into this sort of look.  
     
   This file is licensed Creative Commons, By-Attribution, Share-Alike.

2. **发言者 2**（回复第 1 条）：\[图片省略\]HotelCalifornia\_PIX1838×2058 534 KB  
     
   You can check out any time you like, but you can never leave.

3. **发言者 3**（回复第 1 条）：Edit with Alcedo Studio v0.3.7  
     
   I used the built-in film simulation module with Portra 160 and the scanner simulation mode, followed by OpenDRT for the final output transform. I used a non-existent 16mm Portra 160 format to give the image a slightly lo-fi feel.  
     
   \[图片省略\]DSC\_08241500×2000 1.14 MB  
     
   Default 3.alcpreset.txt \(4.6 KB\)

4. **发言者 4**（回复第 1 条）：Added local contrast with DorS \(tweaked preset\), and a little colour grade. Those awnings look a little flat to begin with so I don’t think my editing made them any flatter  
     
   \[图片省略\]DSC\_08241748×2564 464 KB  
     
   DSC\_0824.NEF.xmp \(18.3 KB\)

5. **发言者 5**（回复第 1 条）：DT5.7 DSC\_0824.NEF.xmp \(15.1 KB\)  
     
   \[图片省略\]DSC\_08242000×2000 827 KB

6. **发言者 6**（回复第 1 条）：\[图片省略\]DSC\_0824\_20251119\_12001117×1200 841 KB  
     
   DSC\_0824.NEF.xmp \(39.4 KB\)

7. **发言者 7**（回复第 1 条）：\[图片省略\]DSC\_08241319×1980 521 KB  
     
   DSC\_0824.NEF.xmp \(8.1 KB\)

8. **发言者 8**（回复第 1 条）：I struggle to imitate another photographer’s style.  Here my play.  
     
   \[图片省略\]DSC\_08241500×2000 342 KB  
     
   DSC\_0824.nef.xmp \(20.4 KB\)  
     
   I went for a low-contrast look with AgX and tweaked colors a bit with the channel mixer function of color calibration.

9. **发言者 9**（回复第 1 条）：\[图片省略\]DSC\_08242000×2893 1.19 MB  
     
   DSC\_0824\_01.NEF.xmp \(27,0 KB\)

10. **发言者 5**（回复第 9 条）：发言者 9, a nice clean look. Well done.

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：GTA6 Releaseparty ab 15:30\!  
     
   Hallohallo, wir haben alles umgeschmissen und sind doch gleich um 15:30 schon live und zocken rein in GTA\!\!  
     
   Alles andere was heute geplant war ist aufgeschoben, nicht aufgehoben\!  
     
   Eddy und Nils sind die ganze Zeit für euch am Start und im Laufe des Tages gesellen sich allerlei Böhnchen dazu, unter anderem Valle, Bonnie, Tim, Sarah, Henry, Ben uvm\!\! &lt;3  
     
   Das wird toll, kommt rum\! Stream geht mindestens bis Mitternacht, danach schauen wir mal, juhuuuu lets fucking goooo\!\!

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：how can i use a wait function in my script  
     
   Godot Version  
   Godot v4.7.2.stable  
     
   Question  
   Hello, i'm a beginner and i need some way to make a cooldown for stamina regen, i need it to regenerate a certain amount at a time but i can't figure out how to do it in an efficient way whenever the stamina goes below a certain amount, i tried using a Timer but i'm really struggling with it, any help would be appreciated.

2. **发言者 2**（回复第 1 条）：Could you show us what your current setup is? The code, the hierarchy, etc :slight\_smile:

3. **发言者 1**（引用未收录发言）：var stamina: float = 100:  
     
   set\(stamina\_value\):  
     
   stamina = clamp\(stamina\_value, 0, 100\);  
     
   func \_process\(delta: float\) → void:  
     
   if stamina &lt; 100:  
     
   stamina \+= delta \* 10;  
     
   i got it working so thanks alot, only issue now is that now the stamina becomes a float when it regens, i need it to be an int value cause this is for a dash system that consumes and then regenerates stamina

4. **发言者 1**（回复第 3 条）：thinking about it now i could also try having 3 charges of sorts that get depleted and recharge over time rather than a dynamic stamina system

5. **发言者 3**（回复第 3 条）：Why do you need it to be an int? Almost every single game I know, Stamina bars are a float since it’s easier to deal with and have a smoother curve you can represent on a progress bar. Having it be an int would require a lot of back and forth conversions.  
     
   Could you tell us why you need it to be an int exactly?

6. **发言者 1**（回复第 5 条）：at the moment i’m trying to make a dash with a cool down and limited dashes so i was thinking to have an int based system cause its only big bursts of stamina that needs to be removed and regenerated, i also realize that in that case i may as well just use a normal cooldown rather than a stamina based system

7. **发言者 3**（回复第 6 条）：But that doesn’t really answer the question of why it needs to be an integer vs. a float.

8. **发言者 1**（回复第 7 条）：DANG i’m so sorry for wasting all of your guys time, i just realized thats exactly how dashing works in most games anyway, i can’t believe it took me so long to realize, thanks for taking your time to try and help though

9. **发言者 1**（引用未收录发言）：thanks so much for helping me out, sorry for wasting your time

10. **发言者 1**（回复第 1 条）：thank you so much to everyone that helped

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：在一拍脑袋设计出这么可爱的小鱼胶囊的同时，就没人想过这么细长还带尖角的形状会喇嗓子眼吗\( ﾟ∀。\)不知道为什么咽下去的时候横过来了差点给我扁桃体戳个大洞

2. **发言者 1**：这特么甚至宣传是给中老年人吃的，也不是鱼油就只是维生素d3而已干嘛要做成小鱼的样子\( ﾟ∀。\)

3. **发言者 2**：\( ﾟ∀。\)7"完全没有做成鱼形状的理由啊，会不会买到残次品了\( ﾟ∀。\)

4. **发言者 3**（回复第 3 条）：\[引用第 3 条\]  
     
   其实是为了能咬破直接喝，一般这么做的鱼油都不会太腥来着\( ﾟ∀。\)7

5. **发言者 1**（回复第 3 条）：\[引用第 3 条\]  
     
   朋友说这个是特殊设计，可以把鱼尾巴拧开倒水里喝，但是包装上也妹写啊\( ﾟ∀。\)只写了口服每次一粒温开水送服

6. **发言者 1**（回复第 4 条）：\[引用第 4 条\]  
     
   但这不是鱼油是d3･ﾟ\( ﾟ∀。\) ﾟ。好微妙啊

7. **发言者 1**：可能是一条产线又做鱼油又做d3？不懂了，这个真的很喇嗓子\( ﾟ∀。\)

8. **发言者 3**（回复第 7 条）：\[引用第 7 条\]  
     
   咱说可能就是直接咬破吧\( ﾟ∀。\)

9. **发言者 1**（回复第 8 条）：\[引用第 8 条\]  
     
   我都买胶囊了肯定就是为了不让舌头接触到里面的东西啊\(\`ヮ´ \)不然我直接买粉兑着喝

10. **发言者 1**：好在我嗓子眼够大的，活了二十来年从来没被鱼刺卡住过，势必驯服小鱼\(　ﾟ 3ﾟ\)

11. **发言者 4**（回复第 10 条）：\[引用第 10 条\]  
     
   \(〃∀〃\)hso  
     
   \(つд⊂\)

### 讨论 47

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

8. **发言者 7**（回复第 1 条）：Les gens qui font GTA6 prennent certainement de la drogue pour survivre au crunch et aux licenciements, mais en ce qui concerne le chien sur un jet ski, ça c’est inspiré de faits réels. Le chien original s’appelle Loosy, et il habite vers Fort Lauderdale.

9. **发言者 1**（回复第 6 条）：LOL.  
     
       
         \[图片省略\]  
     
         Le Comptoir du Hardware – 23 Nov 26  
       
     
       
       \[图片省略\]  
     
   Malgré le hotfix de NVIDIA, les écritures intempestives sur les SSD persistent  
     
     Plusieurs utilisateurs rapportent toujours des volumes d'écriture anormaux après l'installation du correctif 621.35.

10. **发言者 8**（回复第 9 条）：Et a priori ça touche par les RTX 50 c’est pour ça que je voyais pas de prob ici. Ce merdier…

11. **发言者 1**（回复第 10 条）：Alors, a priori, ça en toucherait certaines \(cfr. le papier\).

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Prepare your kitchen for the holidays  
     
   \[图片省略\]talvikaappi1920×1080 2.44 MB

<!-- samples:end -->

