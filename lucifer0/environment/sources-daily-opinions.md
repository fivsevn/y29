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

<!-- intake-request:intake-2e8a9736f705494fb1e27bc737884bce -->
<!-- samples:start -->

采集时间：2026-11-26 00:05:08（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：最近在做一件事，想听听大家的意见  
     
   公司要建一套面向 AI 的完整架构，我先在家里搭一遍，当作灰度环境。在家里跑通、跑稳的东西，才会推到公司  
     
   \#\# 家里搭了什么  
     
   硬件不多：一台 NAS、一台显卡机，再加几台 Mac。按三层来搭：  
     
   \* 基础设施：代码仓库、CI 调度、镜像仓库、容器部署、监控和链路追踪。所有服务都跑在 Docker 里，部署只走一个入口  
   \* AI 中台：模型网关、Agent 编排、调用记录和评测，统一的身份、权限和 Key 管理  
   \* 业务交付：需求进来由 Agent 拆卡，开发、评审、测试几个 Agent 协作提合并请求，再走自动检查 → 合并队列 → 打版本 → 构建镜像 → 定向部署 → 灰度验证 → 全量  
     
   公司用的是同一批开源组件，只是用户多、并发高  
     
   现在基础设施和 AI 中台，交付链路还在一段一段接  
     
   \#\# 拿真实问题回来验证  
     
   这是其中验证的一环。同事在公司报的问题，比如：  
     
   - 任务排队  
   - 长任务续聊失败  
   - 偶发 401  
   - 内存被打爆  
     
   先在家里复现出来，做 A/B 对比，修好了再推回公司：  
     
   - 复现用的是脱敏后重写的用例  
   - 代码只从家里流向公司。推之前先把公司那边多出来的改动补回家里，不然两边会互相覆盖  
     
   \#\# 还没想清楚的问题  
     
   1. 规模差一两个数量级的时候，哪些问题在家里基本复现不了？你们是靠压测工具硬造出来，还是干脆只在公司灰度？  
   2. 脱敏重写以后的用例，会不会跟真实问题偏得太远？抽象到什么程度比较合适  
   3. 整套架构都在家里先搭一遍，是不是太重了？哪几层其实没必要在家里先跑  
     
   ---  
     
   欢迎拍砖，尤其想听「这么做没意义」的反对意见

2. **发言者 2**：（为什么要浪费家里的电费和算力资源给公司用 x  
   （让公司开测试环境

3. **发言者 3**：规模差一两个数量级   硬件使用率不止一个量级，2 核 的机器 ，多一个量级最少要多 4 核 cpu，2 个核心跑满的，多一个量级要 6 个核心，再多一个量级要 18 个核心，不是简单的翻倍

4. **发言者 4**：发言者 2 可以周末的时候在家跑工作（当然是 AI 值守）然后下周的工作日就可以慢慢挤牙膏把这些工作内容吐出来，从而度过轻松的一周。  
   以前 AI 编程还没这么火，Claude 刚出 3.5 版本的时代，我经常这么干，公司其他人还古法编程，我经常一天干完一周的活但是不推送代码

5. **发言者 1**：发言者 2 纯粹不想受到流程和制度的束缚，想把事情快速的推下去对去 gh 提交几个 pr  
     
   发言者 4 你说的有道理哦留出剩下的五天可以把这个月的事都推进完对吗哈哈哈哈哈哈哈  
     
   发言者 3 无关投产只看架构，量级的问题只要做好集群的预留剩下的都交给落地成本解决就好了

6. **发言者 4**：发言者 1 完全可以啊，我一个月里有不少日子是自由的，见天带家人出去旅游

### 讨论 2

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Max's Christmas Mouse 2026  
     
   Technically - not completely finished - there is a small bare spot on his behind that is waiting for the additional bag of jingle bells \(that don’t jingle, but are well made and weigh a ton\).  
     
   \[图片省略\]20261119\_1744071920×2560 599 KB  
     
   \[图片省略\]20261119\_1743581920×2560 540 KB  
     
   Here he is “in process” with the test hat \(later replaced\)  
     
   \[图片省略\]20261117\_1609411920×2560 990 KB  
     
   He weighs so much\!\! I told Jackson that I was going to name him “Lethal Weapon”, but, of course, I won’t.

2. **发言者 2**（回复第 1 条）：The slippers :smiling\_face\_with\_three\_hearts:

3. **发言者 1**（回复第 2 条）：Crafted from baby socks \(as were his hat, top, and leggings\) :smiley:

4. **发言者 3**（回复第 1 条）：Oh, I just want to hug that little guy, even at the risk of being indented by jingle bells\! :wink:

5. **发言者 4**（回复第 1 条）：That is so adorable\! :heart:

6. **发言者 5**（回复第 1 条）：Oh so freakin cute\!\!\! Wow\! Great job\!

7. **发言者 1**（回复第 1 条）：Thank you 发言者 2 发言者 3 发言者 4 发言者 5 \!\!

8. **发言者 6**（回复第 1 条）：Oh, my giggles\! He’s an utter delight\! Jingle pants for the win\! There’s no way he could ever be accused of being a half-a$$ jingler\! \(at least not after you patch his bum\)

9. **发言者 7**（回复第 1 条）：This is the absolute best\! So much whimsy and joy. And Lethal Weapon is a Christmas name, so I vote go for it.

10. **发言者 8**（回复第 1 条）：Flippin’ ADORABLE my Friend\!

11. **发言者 9**（回复第 1 条）：He is so joyful\! Obsessed, as always.

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：ESP32 Short-circuit due to Reverse Polarity  
     
   Hi, I am a beginner in Arduino and had a short on my ESP32 nano right after I plugged in the 7.4 v battery. There was brief smoke from the voltage regulator. I had the battery connected to ground and VIN. After the short, I used a mutimeter to test the pins and saw my 3.3V pin wasn't operating at the correct ohms. My initial assumptions are that I accidentally had reverse polarity causing the voltage regulator to fry and the 3.3v to short. I am wondering if my assumption is correct and if there is a good way to protect against this. From my understanding, the ESP32 nano doesn't have any reverse polarity protection.

2. **发言者 2**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   I am wondering if my assumption is correct and if there is a good way to protect against this  
     
   Quite likely it's correct. Attention is best universal way, you can make protection circuit but next time you will hit something else.  
     
   Your board might still work while powered at 3.3V.

3. **发言者 3**（回复第 1 条）：My best guess is that your ESP32 is toast. The best precaution is paying strict attention to detail when connecting the board to power. Depending on the board and your skill set you may be able to replace the regulator but I don't see this ending well.  
     
   Ron

4. **发言者 1**（回复第 3 条）：Thanks for the feedback. I'll go ahead and find a replacement and will make sure to pay close attention to my inputs next time.

5. **发言者 4**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   From my understanding, the ESP32 nano doesn't have any reverse polarity protection.  
     
   Your above assertion looks correct when looking at the following VIN/3.3V converter of NANO ESP32:  
     
   \[图片省略\]image578×389 14.6 KB

### 讨论 4

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Miao of curcity  
     
   3d model of miao  
     
   \[图片省略\]MIAO-3D-13032×2142 929 KB  
     
   \[图片省略\]MIAO-3D-33032×2142 1.16 MB  
     
   \[图片省略\]MIAO-3D-23032×2142 948 KB  
     
   3d printing of Miao  
     
   \[图片省略\]DSC07568\_JN拼图\_22400×1350 414 KB  
     
   \[图片省略\]DSC07524\_JN拼图2400×3200 918 KB  
     
   comic and concept of Miao  
     
   \[图片省略\]CUR-C03A-MIAO-阿描号\_JN副本3285×2190 631 KB  
     
   \[图片省略\]S\_一模一样的螺丝071440×1920 458 KB  
     
   \[图片省略\]S\_一模一样的螺丝061440×1920 433 KB  
     
   \[图片省略\]S\_一模一样的螺丝051440×1920 477 KB  
     
   \[图片省略\]S\_一模一样的螺丝041440×1920 446 KB  
     
   \[图片省略\]S\_一模一样的螺丝031440×1920 462 KB  
     
   \[图片省略\]S\_一模一样的螺丝021440×1920 533 KB  
     
   \[图片省略\]S\_一模一样的螺丝011440×1920 439 KB

2. **发言者 2**（回复第 1 条）：Such an impressive project\! :heart\_eyes:

3. **发言者 1**（回复第 2 条）：Thanks\!               :laughing:

4. **发言者 3**（回复第 1 条）：supper amazing \!

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Top down sweater with scoop hem  
     
   I’m knitting a top down sweater and want to make a scoop hem so I need to incorporate short rows into the front and back. I have 160 stitches on the front and the back. Any ideas on spacing of the wraps?

2. **发言者 2**（回复第 1 条）：I wonder if binding off at intervals might give you more control over the shaped side edges and be easier to visualize.  
     
   There’s also a short row calculator in addition to the method recommended by 某参与者 which can be set for hems. I haven’t used it myself so this isn’t from presonal experience.  
     
   \[链接隐去\]

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：General measurements discussion for GraphWorks visualizer  
     
   Share and discuss your impressions of different measurements in the new GraphWorks visualizer tool, whether you’ve actually listened to the headphones or not \(which is normally taboo on most audiophile forums\).  
     
   I have not listened to most of the headphones in this tool btw. So most of my impressions will be based on the 5128 graphs, and sometimes some virtual listening. So they should be taken with a grain of salt.

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: N8n-TUI – A keyboard-driven terminal UI for n8n

### 讨论 8

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

### 讨论 9

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

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Into the Fires of Ancient Cosmic Destiny  
     
   I really struggled with this one. I threw module after module at the shot until the colours ran through my fingers like sand. At some point I just stopped.  
     
   Maybe the soundtrack helped or was part of the problem.  
     
   \[图片省略\]261020\_083344\_DSC093631999×1081 541 KB  
     
   261020\_083344\_DSC09363.ARW \(23.7 MB\)  
     
   5.7 XMP  
   261020\_083344\_DSC09363.ARW.xmp \(35.5 KB\)  
     
   This file is licensed Creative Commons, By-Attribution, Share-Alike.

2. **发言者 2**（回复第 1 条）：\[图片省略\]261020\_083344\_DSC093632999×3000 434 KB  
     
   261020\_083344\_DSC09363.ARW.xmp \(7.9 KB\)  
     
   XMP is from 5.7  
     
   In a rush, but something like this I think :grinning: :white\_large\_square:

3. **发言者 3**（回复第 1 条）：Lots of help from G’MIC’s simple dehaze and that led to some haloing issues so did a simple cleanup of that as well.   Also healed out a distraction.   :slight\_smile:  
     
   \[图片省略\]261020\_083344\_DSC093631616×1080 540 KB

4. **发言者 4**（回复第 1 条）：\[图片省略\]261020\_083344\_DSC093631980×1317 422 KB  
     
   261020\_083344\_DSC09363.ARW.xmp \(8.4 KB\)

5. **发言者 5**（回复第 1 条）：\[图片省略\]Fields\_PIX2046×2058 418 KB  
     
   I had to crop… Or else there is no subject and everything is far far away…

6. **发言者 6**（回复第 1 条）：\[图片省略\]261020\_083344\_DSC093631920×1134 1.02 MB  
     
   261020\_083344\_DSC09363.ARW.xmp \(37.1 KB\)  
     
   Thanks for sharing… :slightly\_smiling\_face:

7. **发言者 7**（回复第 1 条）：Unfortunately only at my laptop at the moment. Anyway I try it:  
     
   dt 5.7  
     
   \[图片省略\]261020\_083344\_DSC093632000×1194 401 KB  
     
   261020\_083344\_DSC09363.ARW.xmp \(21,7 KB\)

8. **发言者 8**（回复第 1 条）：Even when doing near to nothing except the basic I auto apply to a picture it already comes out as a very beautiful picture. What I added was switching off AgX and recalc the capture sharpen radius…  
     
   Will work on it tomorrow, now it looks like this…  
     
   \[图片省略\]261020\_083344\_DSC09363\_02036×1440 336 KB  
     
   261020\_083344\_DSC09363.ARW.xmp \(13.2 KB\)

9. **发言者 9**（回复第 1 条）：ART:  
     
   \[图片省略\]261020\_083344\_DSC093632800×1869 1.72 MB  
     
   261020\_083344\_DSC09363.ARW.arp \(12.2 KB\)  
     
   Greycard:  
     
   \[图片省略\]261020\_083344\_DSC093633200×2133 2.41 MB  
     
   261020\_083344\_DSC09363.ARW.gcd.txt \(17.6 KB\)

10. **发言者 8**（回复第 1 条）：And a final one in which I cropped,  manipulated a bit more and the colors.  
     
   \[图片省略\]261020\_083344\_DSC09363\_12381×1440 369 KB  
     
   261020\_083344\_DSC09363\_01.ARW.xmp \(28.6 KB\)

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Launching Goodt for the first time on Steam is very slow  
     
   Steam is very slow to launch the game for the first time. During the freezing period, no files were created in the background, meaning it might freeze before executing the following code:  
     
   extends Control  
     
   var Ui = preload\("\[链接隐去\]  
     
   var NewGameDataSetting = preload\("\[链接隐去\]  
     
   var DataSettingBase = preload\("\[链接隐去\]  
     
   var data\_io = preload\("\[链接隐去\]  
     
   var Custom = preload\("\[链接隐去\]  
     
   var LoadFun = preload\("\[链接隐去\]  
     
   func \_ready\(\) -&gt; void:   
     
   cretea\_ui\(\)  
     
   signal\_fun\(\)  
     
   init\(\)  
     
   init\_setting\(\)  
     
   But after waiting a while, it can start normally. Repeating the game to close and launch within the next few minutes works fine, but if you don’t start the game for a long time—usually less than 10 minutes—you will have to wait a very long time to start。  
     
   I still can’t find the reason for this; it might be related to the godotsteam plugin, because my demo version doesn’t have godotsteam, and it starts normally.  
     
   Does anyone know what the reason is?

2. **发言者 2**（回复第 1 条）：This is expected, see this, depending on the hardware, 10 minutes is long though, are you sure it’s that long?

3. **发言者 1**（回复第 2 条）：I have found the cause of the problem, it is a problem with the Steam backend settings

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：A faster algorithm for extracting hexadecimal digits of π

2. **发言者 2**（回复第 1 条）：An aside: it seems Firefox mobile only renders the top half of glyphs in the expressions.

3. **发言者 3**（回复第 2 条）：Looks fine for me \(Android 17, Firefox 160.0.1\)

4. **发言者 2**（回复第 3 条）：\[链接隐去\]  
     
   GV: 160.0.1-20261116130455  
   AS: 160.0  
   OS: Android 17

5. **发言者 4**（回复第 4 条）：Seeing the exact same on Firefox 160.0.1 on NixOS.

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：末世中只有自己和兄弟/闺蜜活了下来，两个人住在一起艰难求生，但是慢慢互生情愫，又都不好意思明讲自己成了gay/拉拉，于是有一天一方提起“现在人类只剩下咱们两个了，是不是应该努力增加种群数量？”然后两个人也不提两个男人/女人没法生的事儿，从今往后只是闷头作哀，这样的剧情如何呢 \(\`ヮ´ \)

2. **发言者 2**：给

3. **发言者 3**：拉

4. **发言者 4**：不好意思在哪？暗示在哪？这不是纯直球

5. **发言者 5**：那种群数量怎么办

6. **发言者 6**：我就想看俩人互撅皮炎或互扣\( \`д´\)

7. **发言者 1**（回复第 5 条）：\[引用第 5 条\]  
     
   交给避难所外面肆虐的触手之类的东西吧 \(\`ε´ \)

8. **发言者 7**：不行，我只能吃男女\(╬ﾟдﾟ\)

9. **发言者 8**：为什么不能是女兄弟，我看你就是看不起假小子

10. **发言者 9**：gay

11. **发言者 10**（回复第 4 条）：\[引用第 4 条\]

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Focal Sopra N°2 – Uniti Nova, Nova PE or NSC 222 \+ NAP 250?  
     
   Hey everyone\!  
     
   I’m planning to get a pair of Focal Sopra N°2s and would appreciate some advice from anyone who’s owned or spent time listening to them with Naim amplification.  
     
   I’m considering the Uniti Nova, Nova PE and NSC 222 \+ NAP 250, or something else you recommend and I’m curious how these combinations compare with the Sopras.  
     
   Has anyone tried more than one of these setups? Were the differences noticeable in bass impact, dynamics, soundstage, vocals or at lower listening volumes?  
     
   The speakers will be in an open living room with a 20-foot vaulted ceiling, and I primarily listen to music through streaming.  
     
   I’m interested in whether the New Classic separates offer a meaningful improvement over the Uniti range in everyday listening.  
     
   Would love to hear your experiences and which pairing you’d recommend.  
     
   Thanks\!

2. **发言者 2**（回复第 1 条）：Your proposed optional systems are looking like modern Mullets, to varying degrees. The 222/250 option might be a good starting point but you will need a NPX300 to do that system justice.  
     
   The Sopra 2s are beasts and the NC NAP250 might struggle to get the best out of them IMHO.  
     
   I would be inclined to look at the 300 series with the Sopra 2s, or Nova/200 series with a less demanding speaker.

3. **发言者 2**（引用未收录发言）：Depends if your goal is optimal SQ or powerful convenience.

4. **发言者 3**（回复第 3 条）：It would make a difference if the “powerful convenience” happened to exert a good grip on the speakers  making it up to the job if not the last word in sound quality.  
     
   And which is best for the OP would also depend on available funds, and on any desire/expectation of upgrading, or if the intent is to buy and stick for the foreseeable future.

5. **发言者 4**（回复第 1 条）：About three years ago I auditioned the Sopras with a NC 222/250. They are not really voiced to my taste but that is just personal preference. They also hooked up a Nova to the Sopras and I was very surprised how good that system sounded.

6. **发言者 5**（引用未收录发言）：\[图片省略\] 发言者 1:  
     
   have an opportunity to try the NSC 222 \+ NAP 250 at home.  
     
   Just do it :\+1:. Then you’ll know for sure won’t you?  
     
   ATB, J

7. **发言者 6**（引用未收录发言）：某参与者 has just bought a Nova PE. He has had a few systems. See what he thinks?

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：我之前的年度订阅也是 99.99 美金一年，但是还没有到期，如何参加今年黑五活动呢？

2. **发言者 2**：先 Switch 到月付，会收你一个月的钱，之后刷新页面看到 plan 更新成月付后，再 Switch 回年付就能看到五折价。升级后的订阅截止日期会变成明年今天，你刚刚给的一个月以及之前年度订阅的剩余时间都会退钱

3. **发言者 1**：我试了一下不行，我的还是先生 199 的年付，我还以为可以在最终付费的时候回变成 99，结果我点击订阅，然后还收取了 199，现在在申请退款。  
   发言者 2

4. **发言者 1**：发言者 2 就是我切换到了月付，已经扣费了 19.99，然后去管理订阅里，再 Switch 到年付，上面显示 199.99

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Beaded Penguins  
     
   My son and I made these beaded penguins by following this 某社区 tutorial \[链接隐去\] It took significantly longer than anticipated \(like, it took hours…not the deceptive 15 minutes of the video\), but they are super cute\!  
     
   \[图片省略\]854a4592-d742-44f8-b026-9cb8ed3e6e6b1920×1440 394 KB  
     
   \[图片省略\]IMG\_20261115\_1945042771920×2560 784 KB  
     
   \[图片省略\]IMG\_20261115\_1945344611920×1440 370 KB  
     
   \[图片省略\]IMG\_20261115\_1945449931920×1440 351 KB

2. **发言者 2**（回复第 1 条）：Those are so tiny and cute\! Anything with tiny beads looks like it takes hours to me.

3. **发言者 1**（回复第 2 条）：It does. It definitely takes hours. So many repetitive hours \(this is why beading is not my craft of choice\).

4. **发言者 3**（回复第 1 条）：They are ADORABLE \!

5. **发言者 4**（回复第 1 条）：Adorable\! I love how your kids craft with you\! :heart:

6. **发言者 5**（回复第 1 条）：They’re so darn cute\! You both did a great job. I want to do some of these but my seed beads are cheap and therefor not a uniform size - which is death for this kind of work, alas.

7. **发言者 6**（回复第 1 条）：Penguins are my favorite. These are just so darling, I can’t\!

8. **发言者 1**（回复第 1 条）：Thank you 发言者 6 发言者 4 发言者 3 发言者 5 \!  
     
   发言者 5 Our beads were a little bigger than seed beads, and probably not the ideal shape either, but I agree that a uniform size of bead is important for this kind of project.

9. **发言者 7**（回复第 1 条）：Adorable\!

10. **发言者 1**（回复第 9 条）：Thank you\!

11. **发言者 8**（回复第 1 条）：I love these\! Too cute\!

### 讨论 17

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

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Arduino IDE 2.x background CPU usage  
     
   I've noticed Arduino IDE 2.x can keep the clangd process busy for a while when I'm working on ESP32 sketches on my M1 MacBook Air.  
     
   Even after I've finished editing, the background activity can hang around longer than I'd expect. I know the IDE does indexing for code suggestions, but is there a way to keep it from doing so much work in the background?

### 讨论 19

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

### 讨论 20

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

### 讨论 21

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

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Knitting group potluck soup that holds up in a slow cooker?  
     
   Our Sacramento knitting group meets Saturday afternoons and we take turns bringing something for the table. I have a slow cooker and was thinking about an easy lentil soup since it can sit on low for a few hours while we work through our projects. My concern is timing and texture: will the lentils turn mushy if they stay warm for three or four hours, and does the soup thicken too much as it sits? I also do not want to soak anything overnight because I usually decide what to make the morning of. I found a one-pot lentil soup recipe online that says no soaking is needed, but I have not made it and cannot speak to how it behaves in a slow cooker rather than on the stove. Has anyone brought lentil soup to a knit night or potluck and kept it warm for hours? Any tips on liquid ratios or when to add vegetables so they do not fall apart? I would appreciate hearing what worked.  
     
   I found this Easy Lentil Soup Recipe \(One Pot, No Soaking\) while searching for no-soak options, but I still can’t tell how it holds up on low for three or four hours without turning to mush. Anyone tried keeping lentils warm that long?

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Adguard and DOH  
     
   What app is this about, and its version: AdGuard Home 0.107.80~ynh1  
     
   What YunoHost version are you running: 12.1.42  
     
   What type of hardware are you using: VPS bought online  
     
   Describe your issue  
   Hi all, I am trying for first time YNH and it’s wonderful\!  
     
   I installed it on an OVH vps, using ynh free subdomain.  
     
   I then installed ADH with goal of having open the DOH only and limiting access to specific client-id.  
     
   Which port should I enter into the HTTS field to enable? Port 443 is not allowed.  
     
   Thank you\!  
     
   Share relevant logs or error messages  
   Port 443 is not allowed

2. **发言者 1**（引用未收录发言）：I have set the client-id in allowed\_clients and it works regardless of the https port field, no problems with that.  
     
   Changing the https port is not my intention, but it seems ADH need me to enter some, otherwise I cannot disable DOT and DOQ, for my goal to have only DOH enabled.  
     
   \[图片省略\]image367×188 8.97 KB

3. **发言者 1**（引用未收录发言）：The client access can be restricted only on DOH, due to YNH not handling domain wildcard.  
     
   Thank you for the ideas. As solution for my configuration, I blocked DOT and DOQ ports in firewall, not in ADH.

4. **发言者 2**（回复第 1 条）：everything is explained on the package docs: adguardhome\_ynh/doc/ADMIN.md at master · YunoHost-Apps/adguardhome\_ynh · GitHub

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Pontia, A bot and remote UI for local coding agents

### 讨论 25

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

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Doorway Santorini  
     
   I just loved the texture of this doorway I stumbled past on the island of Santorini earlier this year. I know 发言者 8 will do a great edit and I also hope to see an edit from 某参与者 \(regardless of software used\) :blush: 发言者 6 I am not sure if this image lends itself to one of your magic mushroom edits.  
     
   Santorini2026\_0068.CR3 \(38.6 MB\)  
     
   Santorini2026\_0068.CR3.xmp \(16.7 KB\)  
     
   \[图片省略\]Santorini2026\_00681334×2000 639 KB  
     
   This file is licensed Creative Commons, By-Attribution, Share-Alike.

2. **发言者 2**（回复第 1 条）：\[Edit\] retouched away the 2 disturbaces  
     
   \[图片省略\]Santorini2026\_0068\_0\_01908×1440 297 KB  
     
   Santorini2026\_0068.CR3.xmp \(39.4 KB\)

3. **发言者 3**（回复第 1 条）：DT Nightly from a few days ago  
     
   Santorini2026\_0068.CR3.xmp \(17.7 KB\)  
     
   \[图片省略\]Santorini2026\_0068717×1023 309 KB

4. **发言者 4**（回复第 1 条）：Santorini2026\_0068.CR3.xmp \(12.5 KB\)  
     
   \[图片省略\]Santorini2026\_00681366×2048 1.43 MB

5. **发言者 5**（回复第 1 条）：darktable 5.6.2. Custom white balance/color calibration based on the gray clouds.  
     
   \[图片省略\]Santorini2026\_00681223×1980 888 KB  
     
   Santorini2026\_0068.CR3.xmp \(11.0 KB\)

6. **发言者 6**（回复第 1 条）：Don’t really have anything psychedelic to add to this one, 发言者 1, but how about opening my virtual stash of gems on it.   lol  
     
   Had a few minutes before I head off to work, so why not.  
     
   :slight\_smile:  
     
   \[图片省略\]Santorini2026\_0068\_gems1596×2400 1.84 MB

7. **发言者 7**（回复第 1 条）：Not sure if my additional brightness round the door works well enough.  
     
   \[图片省略\]Santorini2026\_00681456×2166 595 KB  
     
   Santorini2026\_0068.CR3.xmp \(27.8 KB\)

8. **发言者 8**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   I know 发言者 8 will do a great edit  
     
   Well done 发言者 1, this sets my somewhat under pressure. :scream: :rofl:  
     
   To be honest, without having seen the RAW yet, just judging on my Smartphone. This looks challenging. Will have a look later on, when I’m at home again.

9. **发言者 9**（回复第 1 条）：\[图片省略\]Santorini2026\_00681243×1919 1.34 MB  
     
   Santorini2026\_0068.CR3.xmp \(18.6 KB\)

10. **发言者 8**（回复第 1 条）：Not sure if I can match your expectations. I’m just on my small Laptop this evening.  
     
   dt 5.7  
     
   \[图片省略\]Santorini2026\_0068\_011999×2835 1.68 MB  
     
   Santorini2026\_0068.CR3.xmp \(27,3 KB\)  
     
   or maybe…  
     
   \[图片省略\]Santorini2026\_0068\_021999×2835 1.41 MB  
     
   Santorini2026\_0068.CR3.xmp \(28,0 KB\)

11. **发言者 10**（回复第 1 条）：RT and GIMP  
     
   \[图片省略\]Santorini2026\_0068 RT and GIMP2001×3000 2.13 MB

### 讨论 27

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：//-Planet: Ani \| play-test \| Steam Chat  
     
   Hi, I’m now about to start having live play tests for the game to test out multiplayer and the game, so I’m looking for volunteers to join and test the game\! And also at the release of the game when I release it on steam, a random 10 people will be picked and given a free copy of the game for play testing\! Join the GC to get a chance to play-test or bug-test the game\! you will get a ping if the play-tests are live\! The link is Steam Community :: Chat Invitation \!

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Fund browser-grade certificate checking for every TLS client

2. **发言者 2**（回复第 1 条）：Really interesting idea. I like that it's distrust only.  
     
   Would OneCRL track revocations for certificates outside the trees trusted by Mozilla? A couple years ago I was looking at the differences between some common trust roots, as they are not entirely aligned, especially Microsoft's. I think there may be a renovation gap there?

### 讨论 29

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：如果把某部小说影视番剧乐曲游戏名字中的一到两个字改成“屁眼”会发生什么

2. **发言者 2**：追逐星空的屁眼\( ﾟ∀。\)

3. **发言者 3**：荒野大镖客:屁眼

4. **发言者 4**：这个屁眼不太冷

5. **发言者 5**：评新编历史剧《海瑞屁眼》

6. **发言者 6**：从屁眼开始的异世界生活

7. **发言者 7**：《关于若干屁眼问题的决议》\( ﾟ∀。\)  
     
   屁嘞⊂彡☆\)\)∀\`\)谁家诊断证明跑出来了

8. **发言者 8**：进击的屁眼

9. **发言者 9**：屁眼搁浅  
     
   \( ﾟ∀。\)

10. **发言者 10**：东京屁眼

11. **发言者 11**：Bang Dream It's My屁眼\!\!\!\!\!

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：静态博客，AI 友好，约束都用 agents.md 和 design.md 定好了。  
     
   做这个磨了我好几个晚上，感兴趣的佬们可以拿去许愿式修改  
     
   项目链接：\[链接隐去\]  
   DEMO：\[链接隐去\]  
     
   个人站：  
   个人站里面一些涉及后端服务的功能就没放 github 上啦，许愿编程很快  
     
   \[链接隐去\]

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：If only every morning could start like this  
     
   \[图片省略\]Screenshot 2026-11-25 111347 - Copy730×426 12.1 KB  
     
   I’ve found out that doing very small chunks of study, if I had lots of reviews piles up, greatly eases the pressure and increases the likelyhood of learning.

### 讨论 32

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Ironclad Boat  
     
   An ironclad boat inspired by the game “Turnip28:Swill”, which is a game very similar to Warhammer.  
     
   \[图片省略\]Swill Boat1920×1080 1.95 MB

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Nerd Commander IV  
     
   \(Thema vom Verfasser gelöscht\)

### 讨论 34

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

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[CVE-2026-123633 &amp; CVE-2026-123007\] Unauthenticated Remote Code Execution in NGINX  
     
   Discuss  
   Unauthenticated Remote Code Execution in NGINX: CVE-2026-123633 and CVE-2026-123007  
     
   More info here: Unauthenticated Remote Code Execution in NGINX: CVE-2026-123633 and CVE-2026-123007 \| Wiz Blog  
     
   Does it impact Yunohost?

2. **发言者 1**（回复第 1 条）：upgrading nginx to 1.31.9 should work as well, but yunohost wise, can someone confirm.

3. **发言者 1**（引用未收录发言）：Yup seems we are too far out on nginx. :face\_with\_hand\_over\_mouth:

4. **发言者 2**（回复第 1 条）：Short temp fix for yunohost 12:  
     
   sed -i 's/ssl http2/ssl/g' /etc/nginx/conf.d/\*.conf  
   systemctl restart nginx  
     
   For yunohost 13 do this \(maybe an upgrade is enough cause debian security push some fix\):  
     
   sed -i 's/http2 on;/http2 off;/g' /etc/nginx/conf.d/\*.conf  
   systemctl restart nginx

5. **发言者 3**（回复第 1 条）：Thank you for the fix\! What kind of \(bad\) consequences this change might have?

6. **发言者 2**（回复第 1 条）：After this fix, your server use http1 instead of http2, it could be a little slower.

7. **发言者 4**（回复第 1 条）：Hello,  
     
   Will the patch be used to reactivate this change or will it be required manually?

8. **发言者 2**（回复第 1 条）：A new stable \(bookworm\) yunohost released remove http2 until debian backport the fixes.

9. **发言者 2**（回复第 1 条）：Official announcement ☢ \[CVE-2026-123633/123007\] Critical vulnerability in nginx upgrade system package ASAP\!

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Xenon, a free dashboard for the spare screens on your desk

### 讨论 37

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：New language selector box on wiki pages  
     
   I’ve reworked the wiki’s \{\{Languages\}\} template with new styling. It’s still a draft that hasn’t replaced the old template. I have started discussion about the template change on \[链接隐去\] and Template talk:Languages - OpenStreetMap Wiki  
     
   Wide \(new top, old bottom\):  
     
   \[图片省略\]image968×413 38.8 KB  
     
   \[图片省略\]image1002×376 43.3 KB  
     
   Narrow \(new top, old bottom\):  
     
   \[图片省略\]image468×280 15.3 KB  
     
   \[图片省略\]image470×265 14.9 KB  
     
   What do you think?  
     
   Replace the old template with the new styling  
     
   Do not replace the old template yet  
     
   0  
   voters

2. **发言者 2**（回复第 1 条）：I like it. It improves readability, doesn’t need more space and the design does not look too corporate.

3. **发言者 3**（引用未收录发言）：\[图片省略\] 发言者 5:  
     
   once we enable the Translate extension,  
     
   Got a timeline on that, Minh?  
     
   If it’s not “x”, it may be worth holding off on changing the pages?

4. **发言者 1**（回复第 3 条）：\[图片省略\] 发言者 3:  
     
   it may be worth holding off on changing the pages?  
     
   Do you mean changing the language template? Why would it be beneficial to delay?

5. **发言者 4**（引用未收录发言）：\[图片省略\] 发言者 5:  
     
   At that point, it might make sense to align the design of both boxes.  
     
   发言者 1 Could you do that? See \[链接隐去\] for the language box of the translation extension.

6. **发言者 5**（回复第 5 条）：We don’t have control over the design of the extension’s navigation bar. It’d be up to us to tailor our custom template to match.

7. **发言者 1**（回复第 6 条）：I assume 发言者 4 means matching the design of the Translate extension’s language selector box in my revised template  
     
   \[图片省略\]image913×147 13.7 KB

8. **发言者 6**（回复第 1 条）：Great. A plus would be to show by default the wiki page in the preferred language expressed in our navigators parameters.

9. **发言者 1**（回复第 1 条）：User:发言者 1/Main Page - OpenStreetMap Wiki updated with new a Languages template to match the Translate extension. It has the “Add languages” and “Help” buttons that the current template has but which are missing from the Translate extension’s box.  
     
   \[图片省略\]image991×190 14.2 KB

10. **发言者 5**（回复第 9 条）：Thank you. For what it’s worth, the extension has a similar link for adding a translation, but it only appears above the bar in fine print when you’re logged in. Maybe something similar would avoid a right float that breaks up the layout.

11. **发言者 1**（回复第 1 条）：\[图片省略\]image981×212 43.9 KB

### 讨论 38

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

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：AGX and color saturation  
     
   I would be interested in hearing about how folk deal with color saturation when processing with AGX. I am aware that saturation increases when contrast is added, but am never sure what to do next.  
     
   I often feel the need to add some additional saturation, and recall others mentioning doing likewise during AGX’s development days.  
     
   I typically either crank up AGX’s saturation, or use Color Balance RGB \(global vibrance or a preset\), but I often question whether I am doing the right thing.  
     
   I would therefore appreciate hearing about what other AGX users do.

2. **发言者 2**（引用未收录发言）：\[图片省略\] 发言者 3:  
     
   color balance rgb or another module to adjust saturation.  
     
   Might be good to mention if one desires contrast without adding saturation, color balance rgb’s contrast slider is the best choice \(filmic has it too, but yeah, doesn’t count here as we’re talking AgX\)

3. **发言者 3**（回复第 2 条）：\[图片省略\] 发言者 2:  
     
   Might be good to mention if one desires contrast with out adding saturation, color balance rgb is the best choice  
     
   Totally agree. Also color zones and color equalizer are two more very suitable modules.

4. **发言者 4**（回复第 1 条）：I really like the saturation slider in the look section. On a lot of photos it does the job very well. I usually go between 110 and 120 % max. It is really easy to use and I find it subtle enough for most cases.  
     
   When I need more control I go for color balance rgb; I recently also discovered the power of the “primaries” section of agx… I need to explore it more \!

5. **发言者 5**（回复第 1 条）：Right now my preferred way to use saturation in darktable is the saturation curve module. It does an exceptional job. It will be available in december with the next darktable release or you can use a nightly build to test it.

6. **发言者 3**（回复第 5 条）：\[图片省略\] 发言者 5:  
     
   Right now my preferred way to use saturation in darktable is the saturation curve module.  
     
   I must explore this module more. Thanks for prodding me to do so. I really appreciate the different experiences and opinions from this forum. That is how I learn.

7. **发言者 6**（回复第 5 条）：How are you using the module? Any specific tips?

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Matrix Multiplication is Θ\(n^2.25\)

2. **发言者 2**（回复第 1 条）：In retrospect, the exponent for matrix multiplication being 9/4, two \*square\* numbers, makes a lot of sense.

3. **发言者 3**（回复第 1 条）：I was going to upvote this but I realized there is no accompanying machine checked proof, only one that relies on natural language which I still don't trust for LLMs especially w/ 100\+ pages of generated proof.  
     
   Link to paper without machine checked proof: \[链接隐去\]

4. **发言者 4**（回复第 1 条）：Has OpenAI reintroduced RLHF for their math research models?  
     
   This proof seems more readable than the ones from earlier in the summer.

5. **发言者 5**（回复第 1 条）：Stochastic parrots are unstopable. All these AI-driven math „proofs” are just marketing for me to pump AI net worth.   
     
   I bet there are much more critical places where AI companies may show their value.

### 讨论 41

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\( \`д´\)还有谁！

2. **发言者 2**：申请出战

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Bose Quiet Comfort Ultra 2 Earbuds  
     
   I have been searching for a replacement set of earbuds for casual listening ‘out and about’ from an iPhone XR - so fit and minimal distortion were my goals. Bought these directly from Bose:  
     
   \[图片省略\]IMG\_40141920×2560 1.11 MB  
     
   I don’t like the burrowing requirement of foam tips and the ‘wings’ on these make them secure.  
     
   Worth noting that the Bose web site has these ‘refurbished’ items at a very reasonable £169 and gives 30 days return - a great way to test them that you can’t get elsewhere.  
     
   I really wanted a wired pair to use with a Dragonfly but the various connectors don’t marry up. I don’t need ANC but having played with the settings have found the best sound is achieved with ANC switched on but set to the lowest possible level. Anyone know why that might be? Just sonic flavour?

2. **发言者 2**（回复第 1 条）：I would guess that Bose have just engineered them to sound at their best when ANC is engaged, whatever the levels of ambient noise.

3. **发言者 3**（回复第 1 条）：Apple do or did a lightning to USB adaptor that should work with your XR if you want to use a dragonfly.  
     
   \[图片省略\]IMG\_12171206×1785 298 KB

4. **发言者 1**（回复第 3 条）：Thanks 发言者 3 and I actually have one. I considered this with a wired pair of buds that Bose have just brought out but the Bose have a USB C on the end which doesn’t fit the phone and the Dragonfly obviously has a 3.5mm connector at one end.  
     
   I could have gone with adaptors for adaptors but apart from being really awkward, would be introducing far too many connections.

5. **发言者 4**（回复第 1 条）：\[图片省略\]image1125×2436 239 KB  
     
   Not too expensive and they don’t just rely on the tips being in the ear as they have a little hook. Very comfy and perfect for casual “out and about” earbuds.

6. **发言者 1**（回复第 5 条）：Thanks 发言者 4. I find Sony buds a little bass shy for my tastes which is why I went fo the Bose with the stability wing.

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：有无前段时间从 jio 被赶下车，最近几天又上车 99usd Gemini 的老兄，请问  
     
   新开的半价 Google AI PRO 可以正常使用反重力 antigravity 吗  
     
   因为实在不想麻烦将历史对话导来导去。

2. **发言者 2**：可以

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Ventuno Q: HDMI limited to 1920×1080 although monitor EDID reports 3440×1440  
     
   Hi,  
     
   I found another issue while testing Debian Trixie on the Ventuno Q.  
     
   My new monitor is an HP 534pm \(3440×1440 ultrawide\). The same problem occurred previously with the Ubuntu image, so it does not appear to be Debian-specific.  
     
   The monitor is detected correctly and its EDID is read successfully:  
     
   Display Product Name: 'HP 534pm'  
     
   The EDID contains the native mode:  
     
   DTD 1: 3440x1440 59.97 Hz  
     
   Pixel Clock: 319.75 MHz  
     
   and additional ultrawide modes:  
     
   3440x1440 @ 75 Hz  
     
   3440x1440 @ 100 Hz  
     
   However, neither Debian nor Ubuntu expose any ultrawide or 1440p modes.  
     
   xrandr --verbose only lists modes up to 1920×1080, and:  
     
   cat /sys/class/drm/card0-HDMI-A-1/modes  
     
   returns:  
     
   1920x1080  
     
   1680x1050  
     
   1600x900  
     
   ...  
     
   with no 3440×1440 mode present.  
     
   Since the monitor EDID is detected correctly, but the detailed timing descriptors are not exposed through DRM/KMS, this looks like a limitation or bug in the display driver or display stack rather than a monitor issue.  
     
   Can anyone confirm whether ultrawide resolutions such as 3440×1440 are currently supported on the Ventuno Q HDMI output?  
     
   Thanks\!

2. **发言者 1**（引用未收录发言）：Thank you very much,某参与者\!  
     
   That explains a lot of things.  
     
   I could work around the other error messages by powering the Arduino Ventuno Q via the barrel jack and using a simple USB-C to HDMI adapter \(no USB-C dock with multiple functions\).

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Kris – Fan Art  
     
   \[图片省略\]021024×1280 1.56 MB  
     
   \[图片省略\]031024×1280 1.58 MB  
     
   \[图片省略\]051024×1280 1.53 MB  
     
   \[图片省略\]081024×1280 1.53 MB  
     
   \[图片省略\]091024×1280 1.53 MB  
     
   Made a 3D sculpt of Kris from Deltarune\! Hope you guys like it\!  
     
   IG:\[链接隐去\]

2. **发言者 2**（回复第 1 条）：great work \!

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Show Shuffle: Keine Ahnung  
     
   Moin,  
     
   es gibt ein neues Show Shuffle Format:  
     
                 
     
   Ein Moderator, drei schlaue Köpfe im Ratepanel und jede Menge absurde bis nerdige Fakten-Fragen. Zugegeben, dieses Konzept kommt dem einem oder anderen vielleicht bekannt vor. Heute widtmen sich Lars Eric Paulsen, Tim Heinke, Mark Oliver Lehmann und Florentin Will den kleinen und großen Fragen des Nischenwissens. Hat hat GTA mit der Preis ist heiß zu tun? Wofür steht der gründe Code in Matrix? Durch lustige Knobelei und klägliches vor sich hin raten, versuchen unsere Ratefüchse der Lösung näher zu kommen. Schickt uns in den Kommentaren eure Nerdfragen und viel Spaß bei der Folge\!

2. **发言者 2**（回复第 1 条）：Oh, Genial Daneben?  
     
   Hatte ich schon öfter gedacht, dass das eine einfach zu adaptierende Sache für RBTV sein könnte.  
     
   Wäre ja vielleicht sogar mal mit Hennes Bender oder so möglich

3. **发言者 3**（回复第 2 条）：Ich meine es gab vor Urzeiten sogar mal ein Almost Plaily was ähnlich war, zudem die Idee schon sehr früh mehrere Male vorgeschlagen wurde von der Community :beanjoy:  
     
   Vlt. könnte die Community ja Fakten einschicken?

4. **发言者 1**（回复第 3 条）：Ja, die Community kann Fakten schicken und die Almost Plaily Folge hieß damals „Clever Vorbei“:

5. **发言者 3**（回复第 4 条）：Oh, danke fürs verlinken\! Hab kurz durch die AP Playlist geklickt, aber hab das auf die Schnelle nicht gefunden.

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：最近想试一下 MAGI-2，主要还是对它的音视频同步生成比较感兴趣——以前用视频模型大多只能出“默片”，音效和配音还得后期另找工具补，这次可以直接把画面、对白、环境音和镜头节奏一起带出来。  
     
   看到 magi-2.run 这边正好开放了免注册的在线试用：\[链接隐去\]  
     
   \[图片省略\]  
     
   打开就能直接进到生成界面，不用先走一套繁琐的注册流程，对于只想先看看模型底子、测测提示词响应的人来说挺友好的。  
     
   \[图片省略\]  
     
   简单逛了一圈界面，实用功能给得挺全的：  
   - 左侧支持 \*\*Text to Video（文生视频）\*\* 和 \*\*Image to Video（图生视频）\*\*，如果一时想不到写什么，输入框下面也自带了几个现成的示例标签（像 Beach sunrise、Neon rain、Window cat 这些），点一下就能直接跑；  
   - 参数这块可以选画幅比例（16:9 等多种常见比例）、720p 分辨率以及 4 秒的免费试用时长；  
   - 比较有意思的是下面还带了 \*\*Generate Audio\*\*（生成音频）、\*\*Web Search\*\* 和 \*\*Return Last Frame\*\*（返回尾帧）几个开关，平时如果想拍连续镜头，用尾帧接着往下续一段会顺手很多；  
   - 右侧可以直接切换 Preview 和 History，跑完的结果能直接在线看。  
     
   目前站内开放了每天几条 4 秒预览的免费试用额度。大家如果最近正好在折腾 AI 视频，或者想找个带环境音的脑洞场景测试一下成片效果，可以直接点进去试两把，有跑出什么有意思的 Prompt 也可以在楼下交流。

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Paper Snowflake &amp; Other Winter Rosettes  
     
   \[图片省略\]SnowflakeRosettes02319×576 52.1 KB  
     
   I just love rosettes\! So when I friend lent me her snowflake rosette die, I dug into my paper stash and made several\!  
     
   \[图片省略\]SnowflakeRosettes01576×500 67.5 KB  
     
   In the top photo you can see that I dug out my basic rosette die to add as a bottom layer and then I dug out some pennant dies and made a whole wintery award ribbon thingy. It became a gift topper.  
     
   \[图片省略\]XmasRosettes01-01576×567 151 KB  
     
   While I had the basic rosette die out, I made a couple more that I then added pennants to and made snowman and Santa head diecuts for. The award ribbon styles have some glitter, too.  
     
   I’ve already made a few more white snowflake rosettes that I am sure I will decorate up in the coming weeks. I’ll add them here.  
     
   Oopsie\! I forgot one\!  
     
   \[图片省略\]SnowflakeRosettes03370×576 59.8 KB  
     
   \[图片省略\]SnowflakeRosettes03a324×576 45.9 KB

2. **发言者 2**（回复第 1 条）：Those are so darned elegant looking\!  I love that you were able to build on the base snowflake to customize your own creations.

3. **发言者 1**（回复第 2 条）：Thank you so much\! I’m kind of obsessed with making them.

4. **发言者 3**（回复第 1 条）：I can understand the obsession\! They are beautiful\!

5. **发言者 4**（回复第 1 条）：They’re gorgeous, especially with your lovely papers\!

6. **发言者 5**（回复第 1 条）：I never knew these were called rosettes\! I can say I learned something new today :slight\_smile: They are stunning. I am envious of your paper stash.

7. **发言者 6**（回复第 1 条）：I know I’ve written this before, but your paper work is epic.

8. **发言者 1**（回复第 1 条）：发言者 3 Aw, thanks\! I’ve always loved this form, so it’s very satisfying.  
     
   发言者 4 and 发言者 5 It’s been really fun to dig through the stash to find what prints might be good for these with the folding and the circular-ness.  
     
   发言者 6 You’re so kind to say so\!

9. **发言者 7**（回复第 1 条）：Beautiful\!

10. **发言者 1**（回复第 9 条）：Thank you\!

<!-- samples:end -->

