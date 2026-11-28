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

<!-- intake-request:intake-345c442da17843218238103a1db3ab67 -->
<!-- samples:start -->

采集时间：2026-11-28 12:03:35（北京时间）

### 讨论 1

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

### 讨论 2

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：2026 Nerd Games Swap Gallery  
     
   \[图片省略\]2026 Nerd Games Swap1920×1920 958 KB  
     
   Gallery for the 2026 Nerd Games Swap

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Twisted pairs monster  
     
   \[图片省略\]4096×4096 1.64 MB  
     
   Colors of wires are wrong on purpose  
     
   \[图片省略\]4096×4096 2.04 MB  
     
   First idea for render  
     
   \[图片省略\]4096×4096 4.58 MB

### 讨论 4

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Flokk Hunter – a browser stealth game about surveillance cameras

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区 entrainer son fil de sugestion  
     
   Depuis quelque temps je trouvait mes suggestion plutôt déprimante voir carrément orientée alarmiste /pessimiste.  
     
   et la depuis la sortied de GTA VI je suis inondé de video 发言者 1 disant comme ce jeux est un échec et une honte. Donc je suppose que 某社区 发言者 1 considère comme un gros beau masculiniste \( pour le bauf, il à peut être raison\).  
     
   Une solution pourrait être de surfer en mode anonyme ou de créer un nouveau compte., mais j'ai tout mes sujet favoris, mes souscriptions \( oui je suis abonné au chanel 某社区 canard PC, non je ne le regarde presque plus, le format de l'emission est trop long pour moi\)  
     
   Et je suis abonner premium, donc outre qu'il 发言者 1 faudrait une nouvelle adresse mail, il pourrait 发言者 1 reconnaître facilement sur mes données privée.  
     
   Donc je 发言者 1 demandait si vous connaîtriez un truc pour rendre le flux plus généraliste, qu'il 发言者 1 propose des truc nouveaux \(nouveau sujets, nouveau 某社区ur sur les sujet que j'aime, et moins de slop\)?  
     
   Merci pour vos suggestions.

2. **发言者 2**（回复第 1 条）：J’ai ça aussi, régulièrement je redresse idéologiquement l’algo en mass cliquant sur « pas intéressé » et ça fonctionne… un temps  
     
   Je pense que ces contenus sont poussés sur d’autres critères, en particulier parce qu’ils génèrent beaucoup d’engagement

3. **发言者 3**（回复第 1 条）：Sur ordi: après avoir cliqué sur ton profil, Vos données dans 某社区 &gt; Gérer votre historique 某社区 &gt; Supprimer  
     
   Sur appli et mobile, après avoir cliqué sur ton profil: Paramètres &gt; Historique et confidentialité et la tu peux effacer ton ancienne activité  
     
   Et hop, une création de compte évitée.

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 選舉被插隊以及公投票  
     
   選舉投票領取真的很奇怪  
     
       \(1\)公投票不給  
       \(前幾次的選舉也是一樣\)  
       \(每次投票後我都要上來某社区 碎唸\)  
     
       \(2\)有人不想排隊  
          居然選務人員還幫忙安排插隊  
       那個人就站得好好的能走路  
       怎麼可以順著他的意思呢?\!  
       \(不想當場開罵只好回來在這裏發洩\)  
     
       反正應該就所有的票一次領好才對  
       我看電視上政治人物投票給媒體拍照  
       也是四種票一次領取並且一一投入票箱  
     
       問題是我家這裏  
       居然公投票是一位專員負責  
       而且遠離市長票的區域  
     
       其實就小場地  
       硬要依"鄰"分成兩區  
       應該是反正都排成一列  
       輪到時  
       再上前分桌子等候  
     
       投票桌其實有四個  
       但很多人就空等比較顯眼的兩桌就是了

2. **发言者 2**（回复第 1 条）：阿你很行幹嘛不去當選務 嘴巴都很會

3. **发言者 2**（回复第 1 条）：講你現場跟他講啊

4. **发言者 3**（回复第 1 条）：排兩列，分單號鄰跟雙號鄰才快啊

5. **发言者 4**（回复第 1 条）：公投票正常是會問 沒問你也可以自

6. **发言者 4**（回复第 1 条）：己問他

7. **发言者 4**（回复第 1 条）：插隊你可以跟選務說

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Monitor resolution, hdmi and usb-c  
     
   It seems, that there is a Problem with the Microphone usage,  I triede three

2. **发言者 1**（引用未收录发言）：The microphone is working now. Not shure, what caused the problem, nor, what solved it.  
     
   Meanwhile the speaker output via the media-carrier board is working too.  
     
   Some-side effect, using the usb-c to hdmi-adapter:  
     
   Audio output through  the usb-c to hdmi adapter to the monitor is no longer possible. Workaround is using the media carrier‘s analog line-out and a separate speaker.

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Kanboard upgrade, checksums don't match  
     
   What app is this about, and its version: 1.2.57~ynh3  
     
   What YunoHost version are you running: 12.1.43 armhf  
     
   What type of hardware are you using: Internet Cube with VPN  
     
   Describe your issue  
   Same issue as here mentionned here,  
     
   \[链接隐去\]  
     
   Checksum are not matching the actual packages  
     
   Share relevant logs or error messages  
   \[链接隐去\]

2. **发言者 2**（回复第 1 条）：Hello,  
     
   It was fixed yesterday, try again\!  
     
   Though it’s been a few release in the 2 last months there is this issue with this app, due to some unusual pattern in upstream release process \(seems like tags are re-pushed after original release\). Might happen again at the next release FYI…

3. **发言者 1**（回复第 1 条）：Thank you very much and for the explaination too, I understand better now :smiley:

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Core album artwork missing  
     
   I know there have been other \(now closed\) threads on this.  
     
   I am simply ripping cds to the Uniticore, but am now finding I nearly always have to enter the album artwork manually. \(Despite the rip of the music itself and details thereof all being fine\).

2. **发言者 2**（回复第 1 条）：When you manually instigate a search for the artwork, and other metadata, from the Core, does it find it?  
     
   If so, possibly/probably a temporary glitch with the metadata providers….  
     
   If it doesn’t improve, raise a ticket with Naim Support - \[联系方式隐去\]  
     
   ATB, J

3. **发言者 1**（回复第 2 条）：I go to:  
     
   Edit Metadata  
     
   Change cover  
     
   At which point various search methods appear. “Bing” often seems to offer the best version of the album cover, but to answer your question, yes I normally am able to quickly find the album artwork with this method. \(I then normally save it to my “photos” and choose to use it from there and then save. Seems to be the most “solid” method\).

4. **发言者 2**（回复第 3 条）：In which case I’d open a ticket with Naim Support, both for yourself and everyone else who uses a Core.  
     
   Coincidentally, I ripped a new CD today and, similar to your experience, it identified all the tracks correctly but failed to find the album artwork……  
     
   Note, there was a similar bug not so long ago, fixed by the most recent update to the Core’s firmware.  
     
   ATB, J

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：为了给大家提供更全面的选购体验，我们的全新独立店铺现已与链动小铺完成商品同步更新，欢迎各位新老朋友前往体验选购！  
     
   独立店铺地址：\[链接隐去\] （仅支持 U S D T，所有订单均需人工发货）  
   链动小铺地址：\[链接隐去\] （支持支付宝、某社区）  
     
   目前是双店铺同时运营，欢迎大家使用体验。  
     
   使用或下单过程中如遇到任何问题，欢迎随时联系我们的客服团队。感谢大家一直以来的支持与信任，祝您使用愉快！  
     
   欢迎您加入：  
   我们的官方 QQ 开放交流 3 群：27078264  
   我们的官方 TG 开放交流群： \[链接隐去\]  
   我们的官方 店铺地址： \[链接隐去\]

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：The race for Officve: an open-source office suite in one month

2. **发言者 2**（回复第 1 条）：How will Officve, when complete, compare to libreoffice/openoffice?

3. **发言者 3**（回复第 1 条）：Office CVE is a great name for a slopware product. It could also have a premium edition named Office RCE.

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：明天考公，我今天坐车去成都考场  
     
   火车候车碰到单位领导了  
     
   寄了，和我是同一辆车，他也去成都  
     
   我现在正在猛猛走位卡视野  
     
   千万千万别是和我一个车厢，甚至相邻座位吧？

2. **发言者 2**：小肥啊，去成都干什么呀

3. **发言者 3**：领导可能和你一个考场

4. **发言者 4**：小肥啊，去成都干什么呀

5. **发言者 5**：小肥啊，求求你不要告诉别人，我什么都会做的

### 讨论 13

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

4. **发言者 3**（引用未收录发言）：Glad to hear that you’ve got it going and thank you for the update. Your persistance is at the top of the charts. Keep us updated and enjoy working this pattern. It’s going to be beautiful.

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: AI Face Shape Detection and Custom Beard Design  
     
   You can get your best beard styles which suits your face shape

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Preview gallery in rawtherappe editor  
     
   Since few days even after installing Rawtherapee 5.13, very few photos show completely black in preview gallery but when clicked and loaded for edition they seem to be OK not black. Is it due to a codec issue or what else ?

2. **发言者 2**（回复第 1 条）：Hello, what’s your camera ?

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Die 某社区 Richter \[Sammelthread\]  
     
   Huhu, wir probieren uns aktuell in ein paar neuen Shows aus, unter anderem „某社区 Richter“, da gab es bisher zwei Folgen und wir haben großen Spaß daran. Es waren auch nicht die letzten beiden Ausgaben :wink: Deswegen, falls ihr auf 某社区 spannenden Posts begegnet \(es müssen nicht BIDA Stories sein, Hauptsache sie sind unterhaltsam, meinungsstark und gut zum Diskutieren\), dann haut hier gerne die Links rein und wir schauen uns das für die nächsten Folgen an, vielleicht ist eure Einreichung dann Teil der Sendung :slight\_smile:  
     
   Danki und viel Spaß beim Programm :hammer:

2. **发言者 2**（回复第 1 条）：Schon was älter, aber einer meiner Lieblingsbeiträge, die ich bisher auf 某社区 gefunden habe:  
     
   Ich habe deine Bewerbung abgelehnt, weil sie SCHEIẞE war

3. **发言者 3**（回复第 1 条）：\[链接隐去\]

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Music for old men  
     
   Four favourites for elderly philosophic pondering.  
     
   Can you recommend me any others.  
     
   \[图片省略\]IMG\_3390717×717 48.3 KB  
     
   \[图片省略\]IMG\_3391300×269 17.5 KB  
     
   \[图片省略\]IMG\_33931500×1500 419 KB  
     
   \[图片省略\]IMG\_3392679×679 47.5 KB  
     
   Cash is American 1V  Hurt.

2. **发言者 2**（回复第 1 条）：Anything by Bill Fay  
     
   \[图片省略\]IMG\_0751500×500 34.3 KB

3. **发言者 3**（回复第 1 条）：\[图片省略\]IMG\_46631170×1148 188 KB  
     
   Carrie &amp; Lowell by Sufjan Stevens. Written after his mother’s death. Beautiful

4. **发言者 4**（回复第 1 条）：Blomstedt was a mere 94 when he recorded this:  
     
   \[图片省略\]61kWdq6PvwL.\_AC\_SX679\_679×679 52.2 KB  
     
   Born in 1927, he continued conducting until earlier this year.  He died a few weeks ago — a well-lived life.  
     
   Roger

5. **发言者 5**（回复第 1 条）：\[图片省略\]  
       
     
   Sometimes a young man’s song from an old man’s lips gives you all the philosophy you need.  
     
   50 years ago, “Ramble On” was about banging groupies. As Plant sings it now, it’s about something else.

6. **发言者 6**（回复第 1 条）：Anything by Mose Allison  
     
   It’s amazing the first track was track was written over 60 years ago, but it could have been written last week.  
     
       
       \[图片省略\]  
       
     
       
       \[图片省略\]  
       
     
       
       \[图片省略\]

7. **发言者 7**（回复第 1 条）：\[图片省略\]Guy\_Clark\_My\_Favorite\_Picture\_Of\_You\_13\_600600×600 47.6 KB  
     
   Guy Clark - My Favorite Picture Of You - CD \(2013\)

8. **发言者 8**（回复第 1 条）：Heaven - Chris Rea, philosophical about driving and life.

9. **发言者 1**（回复第 7 条）：I have all Guy ‘s cds. Wonderful song writer.  
     
   Rodney Crowell wrote a tribute on..  
     
   \[图片省略\]IMG\_3396600×600 98.2 KB  
     
   It ain’t over yet.  
     
   I suppose we could have his mate Townes..  
     
   \[图片省略\]IMG\_3395599×596 65.7 KB  
     
   Waitin around to die. :face\_with\_peeking\_eye:

10. **发言者 1**（回复第 6 条）：I only know Mose from his jazz piano.

11. **发言者 1**（回复第 4 条）：Well I’m chasing him hard. My start of the 88th year not too far ahead.  
     
   I am not sure it is a life well lived but we all do the best we can.

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：瞌睡的时候恰好有了枕头，  
   10 月份从国企性质单位跳槽到了现公司（私企），工作内容有点像是 FDE  
   试用总共三个月，第二个月还没结束主管给我提交了提前转正的申请，且公司准备再给我采购一台 M5pro 48\+1T 的  
   因为我用的自己的电脑，2023 年买的 macbook M2Pro 32\+512、  
   当时是特地多花了三千加配了内存，觉得当时的选择很对，这几年一直也觉得够用，  
   但当我近期工作中发现，我的电脑在 cmux（终端工具）同时开了 20 个窗口的同时，其中四五个再跑 agent team，这时候我的电脑会巨烫巨卡

2. **发言者 2**：Apple M3 Max 64 GB 开多了也有点吃力了，多开 Agent \+ 多个项目同时进行 😅

3. **发言者 3**：新电脑到了没？旧电脑出吗？

4. **发言者 4**：巨烫巨卡，难道不是 CPU 不够？

5. **发言者 5**：FDE 人均百万年薪是真的吗

6. **发言者 6**：我是在 Linux 服务器上跑 Agent Team 做开发，48GB RAM 确实已经不够用了，所以我又要一个服务器，把一些跑门禁测试的工作放上去。

7. **发言者 7**：64G 頂配的 M1 MAX 跑 Agent Team ，只會耗電快，很少遇到燙的

8. **发言者 8**：跳到私企了？

### 讨论 19

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Why optimistic updates are corrosive

2. **发言者 2**（回复第 1 条）：Now that's a URL

3. **发言者 1**（回复第 1 条）：\[This one\]\(\[链接隐去\] is even better but I won't be spamming submissions on the same topic.

4. **发言者 1**（引用未收录发言）：Also not an UX guy but simplest solution that come to my mind would be one or more of the following: a color coding \(yellow or filled gray instead of red\) consistently used all over the website, subtle animation \(replace arrow with small spinner?\), changing state to disabled, tooltip. For me the benefit outweighs some ui complexity.

5. **发言者 3**（回复第 4 条）：Color coding only is not great as it's not accessible to color blind people. That's why their examples have a dedicated icon for the in-progress state.

6. **发言者 1**（回复第 5 条）：Pattern then. Filled triangle: confirmed, hatched - in flight. Could be used for "Post" button etc. Color was just one of options I provided as example solution, I imagine UX person would figure something out.

7. **发言者 4**（引用未收录发言）：I often read 某社区 on the subway where the network is unreliable, and I have often wished for an in-progress state so I would know whether my upvote actually went through\! It’s very low stakes and 某社区 is generally very responsive so I usually assume it did, but it’d be nice to know for sure. I don’t know exactly what such an in-progress state would look like, but I wish it existed.

8. **发言者 5**（回复第 3 条）：Author of that linked post here :\) \(apparently my account's too new to post it here yet\). Feel free to engage.

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：这俄罗斯的奶粉里面是不是掺东西了\( ﾟ∀。\)国内的奶我喝遍天下无敌手，第一次和俄罗斯的牛奶噗哩噗哩了，第三次才压制住

2. **发言者 2**：有说法是大部分中国人其实都有乳糖不耐受，所以国内的牛奶是针对国人特意优化过防止你喝完就窜的减量版\( ﾟ∀。\)具体减啥了我也不懂

3. **发言者 3**：那怎么人人买外国的奶粉？婴儿不窜稀吗？\( ﾟ∀。\)

4. **发言者 4**（回复第 3 条）：\[引用第 3 条\]  
     
   婴儿乳糖不耐的话怕是有点难活哦\( ﾟ∀。\)

5. **发言者 5**（回复第 3 条）：\[引用第 3 条\]  
     
   大多数动物都是长大了之后才对乳类不耐受的。长大了就不喝奶了

6. **发言者 6**：你不会买的是什么老式奶粉吧，那种奶粉是纯添加的植脂末啊\( ﾟ∀。\)

7. **发言者 7**：你吃点奶酪试试，看看是不是不耐受

8. **发言者 1**（回复第 7 条）：\[引用第 7 条\]  
     
   奶酪也没事啊\( ﾟ∀。\)

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Top down sweater with scoop hem  
     
   I’m knitting a top down sweater and want to make a scoop hem so I need to incorporate short rows into the front and back. I have 160 stitches on the front and the back. Any ideas on spacing of the wraps?

2. **发言者 2**（回复第 1 条）：I wonder if binding off at intervals might give you more control over the shaped side edges and be easier to visualize.  
     
   There’s also a short row calculator in addition to the method recommended by 某参与者 which can be set for hems. I haven’t used it myself so this isn’t from presonal experience.  
     
   \[链接隐去\]

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Christmas Card Swap R5 Gallery  
     
   Christmas Card Swap R5  
     
   \[图片省略\]image472×661 68.7 KB  
     
   Swap Thread

2. **发言者 2**（回复第 1 条）：Probably owing to our proximity, I received my card from \[某参与者\] yesterday.  
     
   \[图片省略\]176371920×2550 964 KB  
     
   I love the way the words are shaped\!  He also tucked in a couple of fun extras.  
     
   Thank you\! :heart:

3. **发言者 3**（回复第 1 条）：I love how the words shape the tree. Lovely start to the gallery and the upcoming holiday season.

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Toy Train Coaster  
     
   \[图片省略\]train-11350×1080 1.18 MB  
     
   \[图片省略\]train-21350×1080 1.08 MB  
     
   \[图片省略\]train-31350×1080 895 KB  
     
   \[图片省略\]train-41350×1080 892 KB  
     
   \[图片省略\]train-51350×1080 984 KB  
     
   \[图片省略\]train-61350×1080 1.02 MB  
     
   \[图片省略\]train-81350×1080 1.06 MB  
     
       
     
   某社区: \[链接隐去\]

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Journey To Europa: An interactive look at the Europa Clipper mission  
     
   I recently became fascinated by the Europa Clipper mission, and it's multi planet journey all the way out to the orbit of Jupiter. With the close earth pass happening in just a few days, I thought it would be cool to visualize some of the amazing things its doing to get to Europa, and also be able to dive into some of the science behind what it's going to Europa for. The Launch Journey is the main storyline and focus of the site, but i've been adding some additional rooms and views, like diving into the individual parts of the ship or learning more about the radiation of Jupiter, etc.I think the ability to interact with the thing you are learning about really helps make it interesting. Would love any thoughts or feedback\!

### 讨论 25

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How to gradually add vocab to Master\+?  
     
   I apologize as I’m certain this has been discussed before but I can’t find the thread. I really want to start incorporating master\+ for my vocab \(I’ve already done so for grammar\) but I’m worried I will have a deluge of over 1000 reviews if I do so. Is there any way to mark just a few items at a time as master\+ so I can space out the reviews?

2. **发言者 2**（回复第 1 条）：Sounds like they resolved this, but when I did the initial update all I was slated to get like 2000 reviews on one day and staff manually paced them out for me.  
     
   That is to say, even if it isn’t fixed, staff could help you out if it came down to it\!

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：On a cold morning  
     
   On a cold morning this week, I took a short photo walk around Lake Ümminger. This is one of the photos I felt was worth editing further. I made sure not to lose the cold atmosphere, but at the same time, I wanted the shivering, puffed-up heron to really stand out.  
     
   The editing was done in darktable 5.7.0\+2285.  
     
   I’m looking forward to seeing your edits.  
     
   This file is licensed Creative Commons, By-Attribution, Share-Alike.  
     
   \[图片省略\]2611\_Rundgang\_UemmingerSee\_0089\_033840×2160 880 KB  
     
   2611\_Rundgang\_UemmingerSee\_0089.NEF \(26,8 MB\)  
     
   2611\_Rundgang\_UemmingerSee\_0089.NEF.xmp \(57,8 KB\)

2. **发言者 2**（回复第 1 条）：Happy to see you’re sticking around :slight\_smile: \!

3. **发言者 3**（回复第 1 条）：dt 5.7 Master, spektrafilm, some AI masking  
     
   \[图片省略\]2611\_Rundgang\_UemmingerSee\_0089575×800 188 KB  
     
   2611\_Rundgang\_UemmingerSee\_0089.NEF.xmp \(14.5 KB\)

4. **发言者 4**（回复第 1 条）：Thanks for the playraw. My xmp might look confusing to follow because it is based on a Fujifilm Velvia style for my Canon R7. I have also then used color zones to raise the chroma of the warm tones.  
     
   R7 Velvia.dtstyle \(6.0 KB\)  
     
   DT5.72611\_Rundgang\_UemmingerSee\_0089.NEF.xmp \(14.9 KB\)  
     
   \[图片省略\]2611\_Rundgang\_UemmingerSee\_00892000×1332 681 KB

5. **发言者 1**（引用未收录发言）：Thank you very much for your very detailed Workflow Description.

6. **发言者 5**（回复第 5 条）：Just downloaded your .xmp curious to have a look…  
     
   I think your way of working is quite clean and organized in comparison to mine… :slight\_smile:

7. **发言者 1**（回复第 6 条）：I’m glad to hear that. Do you see any serious mistakes or settings I shouldn’t make?

8. **发言者 6**（回复第 1 条）：\[图片省略\]2611\_Rundgang\_UemmingerSee\_00891980×1299 479 KB  
     
   2611\_Rundgang\_UemmingerSee\_0089.NEF.xmp \(8.6 KB\)

9. **发言者 1**（引用未收录发言）：Thanks for your comment—it means a lot to me. And by the way, I turned 71 this year…. :wink:

10. **发言者 7**（回复第 1 条）：\[图片省略\]2611\_Rundgang\_UemmingerSee\_00892048×923 696 KB  
     
   2611\_Rundgang\_UemmingerSee\_0089.NEF.xmp \(13.9 KB\)

11. **发言者 6**（引用未收录发言）：Y’all are young. I’m more than 75.

### 讨论 27

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

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Rick Beato Interview Mick Jagger  
     
   The Interview  
     
   M

2. **发言者 2**（回复第 1 条）：Will watch, Rick is invariably a good watch.  
     
   Thank you.

3. **发言者 1**（回复第 2 条）：I agree. He has insight and asks good questions, and then gives his respondent time and space to answer.

4. **发言者 3**（回复第 1 条）：Enjoyed:\+1:

5. **发言者 4**（回复第 1 条）：Best interview with Mick Jagger that I’ve ever seen. All about the music and his process \(if you can call it that\). Magical.

6. **发言者 5**（回复第 1 条）：A proper interview with Mick, for once.  
     
   Rick has been a Stones fan since childhood, so there’s loads of empathy, and it’s more of a conversation between two old geezers, rather than the normal Q and A type of interview.  
     
   Very good. :\+1: :\+1:

7. **发言者 6**（回复第 1 条）：This is a joy to watch. Rick just is such a good interviewer and you can tell Mick is enjoying the conversation.

8. **发言者 7**（回复第 1 条）：Sympathy for the Mickle, was there?

9. **发言者 8**（回复第 1 条）：Nearly all Beato interviews are worth watching, he concentrates on the music and not the personality. Plus they are in depth.  
     
   However he made me very annoyed the other day.  He ran down his top 20 best rock singers of all time.  Paul Rodgers was not in it, I mean, come on\!\!\! :enraged\_face:

10. **发言者 9**（回复第 1 条）：Thanks for posting such an enjoyable and insightful conversation.  
     
   G

11. **发言者 10**（回复第 1 条）：Watched it last night. He’s had some excellent interviews lately, including Bernie Taupin, Peter Gabriel, Lee Sklar, Steve Lukather, and BIlly Joel, which was a really good and interesting one…plenty of others too.

### 讨论 29

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：想付费\(小钱\)找一个永久\(直到关站跑路\)的看视频的方式, 两月看不了一次  
     
   看 v 站一上午, 也没找到什么方案, 邀请码, 捐助之类的  
     
   \*\*我的设备\*\*   
     
   - 安卓电视, 笔记本电脑, 有一块移动硬盘\(无 NAS\)  
     
   \*\*场景及目前的办法\*\*  
     
   - 自己在电脑上: 电影名 \+ 在线. 视频一般比较糊, 免费嘛.   
   &gt; 付费的话想清晰一些, 1080p, 很常见的那些电影剧集就行  
     
   - 孩子动画片在电视上: 找网盘资源 \+ 买日卡网盘账户下载到硬盘   
   &gt; 能接受, 想更省事一些. 第一反应是想找免费的, 忘记去咸鱼买, 浪费大量时间, 所以想一次性付费, 永远去那下载. 下载也挺慢, 也浪费时间  
     
   - 安卓电视\(无魔法\): 有时候临时起意想看: 影视 app \+ 某聚合网址, 很糊, 有广告, 很多源还不能放, 很多水印广告, 多人家庭场景很不方便, 试错成本挺大.   
     
   &gt; 在 v 站找了好大会都没找到当时参照的那个帖子, 所以我现在也都不知道怎么弄的了  
     
   提前感谢大家\!  
     
   平时都是禁止孩子看电视的, 自己也没有看电影/剧集的习惯, 那些爱奇艺网飞会员太不合适了, 只是非常偶尔的看一次

2. **发言者 2**：可以找 emby 的公益站

3. **发言者 1**：发言者 2 能给推荐个嘛?   
     
   原谅我当伸手党, 搞一上午了, 身心俱疲, 想抄作业  
   \[链接隐去\]

4. **发言者 3**：开了 b 站大会员😶

5. **发言者 2**（回复第 3 条）：\[引用第 3 条\] 主要公益站一般是限时开启注册，平时不关注这块基本碰不上 本来想说有付费的 emby 服，但是你说看的少，每个月付费也不划算

6. **发言者 1**：发言者 3 说实话, 就没有超级飞侠英文版, 等一些未删减的电影剧集, 比如说. 基本看不着里面的付费内容

7. **发言者 4**：研究下 pt

8. **发言者 5**：尽头是 nas\+pt

9. **发言者 1**：发言者 2  我开始搜索公益服啦, 比如说这个, 看介绍是一年保号一次\(挺好, 能接受\). 还有 30/15 天不上线就删号的太狠了. 看了一下付费版, 为啥没有永久 vip, 199 也行, 真是很偶尔看一次, 没有那种按观看量付费的嘛 哈哈  
   \[链接隐去\]

10. **发言者 6**：发言者 1 超级飞侠英文版不说公益 emby 了，收费 emby 都不一定有

11. **发言者 1**：发言者 5   
   发言者 4 得有个 nas, 还得做种共享, 这样得 24h 待机, 还是很麻烦吧

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Hard Drive pricing has gotten bad

2. **发言者 2**（回复第 1 条）：My needs are pretty modest. I could get by with a pair of 8 TB drives—probably even a pair of 6 TB drives. Unfortunately, that doesn’t really do anything to the price, as the author says:  
     
   &gt; And if you’re thinking you’ll just buy a smaller one, Best Buy’s 8TB Black Friday special is $299.99. That’s $37.50/TB and fifty bucks more than my 20TB cost two years ago.  
     
   It’s rough out here…

3. **发言者 3**（回复第 2 条）：I'm getting by with a mirror of two 4-5T drives and I'm really wishing I had bought spares for when they start to fail.

4. **发言者 4**（回复第 1 条）：First RAM and GPU prices go up some 200% because of the slop generation, now storage devices also go up because you gotta store all the slop somewhere?

5. **发言者 5**（回复第 4 条）：I believe it's more because ssd and nvme drives uses similar memory tech than what is required for ai chips. So they are all competing for more or less the same wafers and fab space, and since everything is redirected to produce more ai chips, everything else is getting scarcier and pricier

6. **发言者 4**（回复第 5 条）：Sure, the SSD price increases because of DRAM caches needing the same memory chips is a thing, but this post is about \*hard drives\*, the ones with spinning magnetic platters.

7. **发言者 6**（回复第 6 条）：Yup, and as SSDs and NVME drives go up, more 'classical' loads switch from them back to HDDs, driving their price up as well.

8. **发言者 7**（回复第 6 条）：When people can't afford houses in London they buy houses in Bristol instead and that makes the house prices in Bristol go up about six months after the house prices in London spike upwards.

9. **发言者 8**（回复第 1 条）：The flip side of this is everyone's computers appreciated in value for the first time in history? A desktop I bought more than 2 years ago is now worth almost double.

10. **发言者 9**（回复第 6 条）：In at least some segments an SSD directly competes with an HDD, though.  
     
   So the scarcity and/or cost of SSDs going up could mean increased demand for HDDs

11. **发言者 10**（回复第 1 条）：I feel it. I just caught one of the drives in my server making some weird noises a couple of days ago and... Ordering a replacement plus a spare was at least 2x what I paid two years ago for 2 drives :\( And these are "only" 4TB, and they are refurbished.

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Extending Is\_In cleanup to Quebec  
     
   As discussed in Cleaning up unnecessary is\_in tags Is\_in tags are not necessary when they point to a already mapped boundary. There are about 12 thousand is\_in=Quebec tags. I am proposing removing all tags of this type.  
     
   Yes remove unnecessary is\_in tags  
     
   No \(Specify why in reply\)  
     
   0  
   voters  
     
   Further References:  
     
       
     
         \[链接隐去\]  
       
     
       
         
     
   is\_in check  
     
       
     
       
         
         
       
     
       
     
       
     
         \[链接隐去\]  
       
     
       
         
     
   Automated edits/发言者 1/Remove is in tags in British Columbia -...

2. **发言者 1**（回复第 1 条）：Désolé pour mon mauvais français. Je comprends. Intégrez-le au flux de travail. Au bout d’un certain temps, nous pourrons supprimer les éléments restants qui auraient échappé à la vigilance des éditeurs.

### 讨论 32

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：到我啦到我啦肥哥们\(ﾉ\)\`ω´\(ヾ\)  
     
   生日当天卡点解锁死证，有点太吉利了

2. **发言者 2**：举糕糕~  
     
   　　☆☆☆☆☆☆☆☆  
     
    　╭┻┻┻┻┻┻┻┻╮  
     
    　┃╱╲╱╲╱╲╱╲┃  
     
    ╭┻━━━━━━━━┻╮  
     
    ┃╱╲╱╲╱╲╱╲╱╲┃  
     
    ┗━━━━━━━━━━┛  
     
    　　　∧＿∧　∧＿∧  
     
   　　\(\( ・∀・ \)\)・∀・\) \)  
     
    　　\`＼　　 ∧ 　　ノ  
     
   　　　/　　｜/　　｜  
     
    　　（＿ノ＿\)\_ノL＿\)

3. **发言者 3**：举糕糕~  
     
   　　☆☆☆☆☆☆☆☆  
     
    　╭┻┻┻┻┻┻┻┻╮  
     
    　┃╱╲╱╲╱╲╱╲┃  
     
    ╭┻━━━━━━━━┻╮  
     
    ┃╱╲╱╲╱╲╱╲╱╲┃  
     
    ┗━━━━━━━━━━┛  
     
    　　　∧＿∧　∧＿∧  
     
   　　\(\( ・∀・ \)\)・∀・\) \)  
     
    　　\`＼　　 ∧ 　　ノ  
     
   　　　/　　｜/　　｜  
     
    　　（＿ノ＿\)\_ノL＿\)

4. **发言者 4**：举糕糕~  
     
   　　☆☆☆☆☆☆☆☆  
     
    　╭┻┻┻┻┻┻┻┻╮  
     
    　┃╱╲╱╲╱╲╱╲┃  
     
    ╭┻━━━━━━━━┻╮  
     
    ┃╱╲╱╲╱╲╱╲╱╲┃  
     
    ┗━━━━━━━━━━┛  
     
    　　　∧＿∧　∧＿∧  
     
   　　\(\( ・∀・ \)\)・∀・\) \)  
     
    　　\`＼　　 ∧ 　　ノ  
     
   　　　/　　｜/　　｜  
     
    　　（＿ノ＿\)\_ノL＿\)

5. **发言者 5**：以撒领域大神！  
     
   死证不是生命的终点，而是另一段故事的破茧重生的开始，肥哥生日快乐呀！  
     
   举糕糕~  
     
   　　☆☆☆☆☆☆☆☆  
     
    　╭┻┻┻┻┻┻┻┻╮  
     
    　┃╱╲╱╲╱╲╱╲┃  
     
    ╭┻━━━━━━━━┻╮  
     
    ┃╱╲╱╲╱╲╱╲╱╲┃  
     
    ┗━━━━━━━━━━┛  
     
    　　　∧＿∧　∧＿∧  
     
   　　\(\( ・∀・ \)\)・∀・\) \)  
     
    　　\`＼　　 ∧ 　　ノ  
     
   　　　/　　｜/　　｜  
     
    　　（＿ノ＿\)\_ノL＿\)

6. **发言者 6**：举糕糕~  
     
   　　☆☆☆☆☆☆☆☆  
     
    　╭┻┻┻┻┻┻┻┻╮  
     
    　┃╱╲╱╲╱╲╱╲┃  
     
    ╭┻━━━━━━━━┻╮  
     
    ┃╱╲╱╲╱╲╱╲╱╲┃  
     
    ┗━━━━━━━━━━┛  
     
    　　　∧＿∧　∧＿∧  
     
   　　\(\( ・∀・ \)\)・∀・\) \)  
     
    　　\`＼　　 ∧ 　　ノ  
     
   　　　/　　｜/　　｜  
     
    　　（＿ノ＿\)\_ノL＿\)

7. **发言者 7**：举糕糕~  
     
   　　☆☆☆☆☆☆☆☆  
     
    　╭┻┻┻┻┻┻┻┻╮  
     
    　┃╱╲╱╲╱╲╱╲┃  
     
    ╭┻━━━━━━━━┻╮  
     
    ┃╱╲╱╲╱╲╱╲╱╲┃  
     
    ┗━━━━━━━━━━┛  
     
    　　　∧＿∧　∧＿∧  
     
   　　\(\( ・∀・ \)\)・∀・\) \)  
     
    　　\`＼　　 ∧ 　　ノ  
     
   　　　/　　｜/　　｜  
     
    　　（＿ノ＿\)\_ノL＿\)

8. **发言者 8**：举糕糕~  
     
   　　☆☆☆☆☆☆☆☆  
     
    　╭┻┻┻┻┻┻┻┻╮  
     
    　┃╱╲╱╲╱╲╱╲┃  
     
    ╭┻━━━━━━━━┻╮  
     
    ┃╱╲╱╲╱╲╱╲╱╲┃  
     
    ┗━━━━━━━━━━┛  
     
    　　　∧＿∧　∧＿∧  
     
   　　\(\( ・∀・ \)\)・∀・\) \)  
     
    　　\`＼　　 ∧ 　　ノ  
     
   　　　/　　｜/　　｜  
     
    　　（＿ノ＿\)\_ノL＿\)

9. **发言者 9**：举水果蛋糕！  
     
   g c418

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：The Goblin  
     
   The Goblin 3D Character art  
     
   \[图片省略\]Thumbnail1920×1080 898 KB  
     
   This character is a stylized 3D goblin with green skin, a large rounded head, and long, pointed ears that extend horizontally from either side. His expressive eyes, slightly furrowed brows, and downturned mouth give him a worried, tired, and somewhat grumpy appearance.  
     
   \[图片省略\]Render\_Town1920×1080 1.87 MB  
     
   He wears a short-sleeved brown shirt with a light-colored collar and front buttons, dark trousers, and simple brown shoes. His design combines exaggerated proportions with detailed textures and carefully sculpted facial features. The subtle variations in his skin tone and the worn appearance of his clothing add depth and character to his overall look.  
     
   \[图片省略\]1\_Wireframe1920×1080 1.08 MB  
     
   \[图片省略\]2\_Wireframe1920×1080 1 MB  
     
   \[图片省略\]3\_Wireframe1920×1080 1.06 MB

2. **发言者 2**（回复第 1 条）：It’s fairly obvious your text is AI-generated, which makes me suspicious of your model as well. Please clarify the role AI has played here. Unlisting for now

3. **发言者 1**（回复第 2 条）：Hello 发言者 2, AI was used in this project to give the character a clear description and also, to help me improve the level of English on it, as i am not a native speaker. Anyway, all modeling, texturing, rigging and rendering were done by me, thanks for your warning and i am in expectant of your reply

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：If you're doing Monte Carlo try Knuth LGC  
     
   I was doing a monte carlo simulation involving a few million iterations and that didn't really need anything all that random.  I remembered reading about a fast algorithm for very fast values \(just a couple of ops\), so I asked about this and was surprised that there is one. I just inserted it into my c code and it became ten times faster.  If you're doing some monte carlo simulations where you don't need anything very random, give it a try.before: 3.5 seconds.  after: 0.42 seconds.code I used:   \#include &lt;stdint.h&gt;  
     
      static uint32\_t seed = 1;   // any non-zero value is fine  
     
      static inline uint32\_t fast\_rand\(void\) \{  
          seed = seed \* 1664525u \+ 1013904223u;   // mod 2^32 is free  
          return seed;  
      \}  
     
      // then \(example\):  
      int ch = fast\_rand\(\) % 1297 // where 1297 is the range.  
     
   \(there's a slight bias when using % this way.\) code gave the same results so it was still correct.  you would adjust 1297 to the range you need an integer result in, this is from my example.

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：dreamy look Diffuse/sharpen or contrast equalizer  
     
   Hi guys.  
     
   To create this type of photograph, can it be done using only Darkroom, or would I need to use GIMP? I’ve seen that it’s possible with Lightroom, but I haven’t found tutorials in DT on how to achieve this dreamy look.  
     
   \[图片省略\]3335×597 37.3 KB  
     
   \[图片省略\]2452×678 17.2 KB  
     
   \[图片省略\]1474×318 12 KB  
     
   Which would be better to use: Diffuse/Sharpen or Contrast Equalizer? To create this effect, would the module only be applied to the highlights or to the entire image?  
     
   1.CR2 \(27.6 MB\)  
     
   2.ARW \(47.5 MB\)  
     
   Thanks for your help.

2. **发言者 2**（回复第 1 条）：I am primarily seeing a lot of bloom here - that can be done with DorS with the bloom preset, fine-tuning with the iterations and using masking to further refine the effect.  
     
   Other than that: A lot of the “look” of photo is down to composition, lighting, colours etc. Achieving a “dreamy” look is a lot more than bloom - many things in camera, some in processing.

3. **发言者 3**（回复第 2 条）：In darktable there also exist an older bloom module that creates a soft bloom effect by blurring the highlights and then blending the result with the original image.  
     
   A warning in the manual says, though: “This module performs blurs in Lab color space, and is no longer recommended. Instead, use the tone equalizer module or the exposure module with a parametric mask.”

4. **发言者 1**（回复第 2 条）：Ahh ok. Understood. it depends on photography too. I was playing with DorS with bloom present, but it added a bigger black edge. Wow it’s a very complex module

5. **发言者 4**（引用未收录发言）：\[图片省略\] 发言者 5:  
     
   It appears to me that the 1st order affects the finest details and the 4th order the largest details.  
     
   Other way round; 1st and 2nd are the same size and bigger details, and affected differently by the direction. 3rd and 4th are also the same size, smaller details. 1/2 or 3/4 do the same thing if direction is 0.  
     
   Took me a while to learn that it’s not 4 different sizes, only 2\!

6. **发言者 5**（回复第 5 条）：Thanks for the correction of my understanding. Just experimenting further with this module you certainly have a lot of control over the bloom effect. I suspect some users have some nice bloom presets that they have created. The edge management sliders also do a lot of heavy lifting for these effects.  
     
   \[图片省略\]image342×145 2.4 KB

### 讨论 36

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

### 讨论 37

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Free branching JSON dialogue box for Godot 4: condition parser, runner, typewriter \(Dialogue Kit Lite\)  
     
   Dialogue Kit Lite is free: branching JSON dialogue with a condition parser, a runner and a typewriter dialogue box for Godot 4.  
     
   Free Lite: \[链接隐去\]  
     
   Full kit \(adds quest log and tracker, portraits with moods, localisation with CSV export, save/load\): \[链接隐去\]  
     
   Tested on Godot 4.4 stable \(Linux, GL Compatibility renderer, software OpenGL\). Not tested: real keyboard, mouse, touch or gamepad hardware, Forward\+ and Mobile renderers.  
     
   The code and the text were written with AI assistance and then run through the tests described on the page.

### 讨论 38

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

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Connecting a TAG MCLAREN PA20R to NAP 250 new classic  
     
   So I creating a second system for when I’m kicked out of the listening room when the family comes home over Christmas.  
     
   I have a Tag maclaren pre amp and since buying some NP 350’s and 250 going spare.  
     
   Not sure how to connect them is it just a normal RCA cable with XLR’s on the other end or a specific arrangement. I note the Tag has Balanced outputs but not sure if they are connected.  
     
   I found a manual that says  
     
   " As an option, the PA20R can be ﬁtted with transformers.  
     
   Please contact your retailer if you require this option. If you do not have the transformer-coupled, balanced output option, the XLR sockets labelled OUTPUT 3 left and right are  
     
   not connected and cannot be used  
     
   When the transformer-coupled, balanced output option is installed, you can use the XLR sockets labelled OUTPUT 3 on the back panel of your PA20R. The output uses two XLR sockets"  
     
   I bought mine second havd many years ago so have no idea if it’s fitted. But If so can I just use Naim XLR cables that came with my NAP 250?

2. **发言者 2**（回复第 1 条）：Perhaps 发言者 4 might know?

3. **发言者 3**（回复第 1 条）：id just plug them in and try, it will either work or not - keep vol at min tho

4. **发言者 1**（引用未收录发言）：Yep thanksI  think I’ll open it up first, guess I’m looking for something to  be connected to the XLR outputs?

5. **发言者 4**（回复第 4 条）：Yes, this sort of transformer often comes canned so a little pair of tin cans perhaps?  
     
   If you take a couple of pictures then between us all we should be able to tell for sure.

6. **发言者 3**（回复第 5 条）：yes, thta was what i was about to say, about the size of an alps pot

7. **发言者 4**（回复第 1 条）：Yes, I assume that’s why the balanced outputs, if fitted, have transformers.

8. **发言者 5**（回复第 7 条）：So the only way is to open it?

9. **发言者 4**（回复第 1 条）：Probably the safest option here if unknown.

10. **发言者 6**（回复第 1 条）：Maybe my mistake, but I read the OP as meaning that - as he bought some 350’s recently - the old 250 is now available for a second system .. i.e. it would be the unbalanced stereo XLR input that he would have to accommodate.  Ah .. unless it’s a new 250 as well.  OK, now I understand.

11. **发言者 7**（回复第 10 条）：The OP says ‘XLR cables’ that came with the 250, so it’s safe to assume that it’s a New Classic 250 they have.

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\#\#\# 买了两年的新加坡腾讯服务器，结果新加坡资源紧张不让新建服务器，已购买的服务器也无法更换地域。  
   \[图片省略\]  
     
   \#\#\# 这就是腾讯云的, 安全可靠的弹性计算服务吗？实时扩展或缩减计算资源吗？领教了  
     
   \[图片省略\]

### 讨论 41

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：FastLanes: Next-gen File Format  
     
   \`performance\` because this format optimizes SIMD support etc.

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：傻逼皿煮党\(╬ﾟдﾟ\)9或者是别的什么傻逼  
     
   怎么把fanbox的PayPal和信用卡支付停用了啊！那我上哪去买色色动漫美少女啊！  
     
   狗日的自己私下去爱泼斯坦那做客，傻逼信用卡公司恋童癖跳出来大喊大叫指责别人有正常的成人R18装nm的道德卫士呢\( ᑭ\`д´\)ᓀ\)\)д´\)ᑫ

2. **发言者 1**：狗日的没招了，看来只能去搞一张visa了\( ›´ω\`‹ \)就说用来打游戏充值吧

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Non itchy wool possibly merino  
     
   I have very dry, sensitive skin and I have found many wool garments simply too itchy to bear.  I will mention here that I am autistic - we have lots of sensory issues.  I remember also the garments my mum knitted me as a child and how I couldn’t wait to remove them\!  
     
   My late mother was a huge fan of Merino wool, but I stuck with my acrylic or cotton.  I decided to be daring and buy some Merino.  My most sensitive area is my neck and I have held this yarn around my neck and, surprise surprise it doesn’t  itch\!  
     
   This means that at some point I can make a “luxury” cardigan.  I bought it on vinted.  I am now worrying it’s from China as it has no country of origin on.  If that’s the case, it may not be merino\!  Does anyone know which retailers sell this as I’m curious.  I would also like you to show me your favourite Merino, which is hopefully on sale in UK.  
     
   \[图片省略\]422391080×2340 346 KB

2. **发言者 2**（引用未收录发言）：Cashmere might be an issue because many people are sensitive to goat fibers. It feels ultra soft to the hand but might still be itchy. Cashmere doesn’t seem to be an issue for me; I can knit with mohair but can’t wear it.

3. **发言者 1**（引用未收录发言）：I’ve used bamboo.  It was a recognised brand, cannot remember which, but the cardigan was very heavy and didn’t get worn for that reason.  This is about 15 years since.

4. **发言者 3**（回复第 1 条）：Check out qivuit yarn.  It is beautiful\!\!\!  It is from the underbelly of muskox.  Extremely soft, extremely warm and extremely expensive.  It lacks the scales found on most wools - these scales are what irritate.  Available in Greenland, and here in northern Canada.

5. **发言者 1**（回复第 4 条）：This is what I found.  
     
   the UK, 100% Qiviut \(musk ox underwool\) yarn typically costs around £104.50 per 22g skein  
     
   That’s just ridiculous.

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Dangerous Subway Passengers - Animation Project  
     
   \[图片省略\]Subway1920×1080 2.54 MB  
     
   I’ve just rendered my first frame for a new animation project. There are still thousands of issues to fix, but I had to start somewhere. Right now it’s better that the pants aren’t visible… :melting\_face:

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: How can we build a crowdsouced due diligence platform?  
     
   San Francisco has a problem. From LARPers to grossly unethical behavior, even those with bad reputation regularly secure deals due to a lack of public information on their past. Most recently, a friend of mine lost over $900k in a deal that, in part, could have been avoided if my friend knew who they were working with.I've been thinking for a long time on how to improve this process - At first I was thinking an append-only comment page indexed on LinkedIn profiles, but due to defamation concerns, it may be better for comments to be leading questions instead \("why are you banned from CapitalOne cafe?"\). But overall, I'm not satisfied with what I've come up with. Has anyone else thought about this problem?

2. **发言者 2**（回复第 1 条）：Yep, I've thought about the problem. Including the opposite side - what if someone was an unethical person, but later learned better and is now being ethical and trustworthy? Would you like to be judged for the rest of your life based on the mistakes of your youth?Of course, some people won't change. But how would a system like this know the difference?

3. **发言者 3**（回复第 1 条）：I think we need a crowdsourced everything platform

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Forthcoming saturation curve module.  
     
   I first learned about this new module in my post regarding AGX saturation, which led to me obtaining a nightly build, in order to experiment with it.  
     
   It is an amazingly intuitive module, and I suspect that in most cases there will be no need to call upon its guided filter options.  
     
   I was therefore disappointed to discover that I was unable to pin the curve to my Quick Access panel, which I would find incredibly useful.  
     
   I strongly suspect that this may be an oversight, because other curves and graphs can be pinned to Quick Access, as can all of the other saturation curve controls.  
     
   Below is a screen grab of the which options can be pinned.  
     
   \[图片省略\]SC options447×522 66.4 KB

2. **发言者 2**（回复第 1 条）：I think the best thing would be to go to GitHub and create an issue. I’m almost sure that this can still make it to 5.8

3. **发言者 1**（回复第 2 条）：I’m afraid that I wouldn’t know where to begin.

4. **发言者 3**（回复第 3 条）：Go to github, register, login. Then in darktables repo open an issue and fill out the template. And maybe add 发言者 4 to ping the creator of this module :slight\_smile: .

5. **发言者 4**（回复第 4 条）：no need for that: satcurvergb: fix QAP exposure by 发言者 4 · Pull Request \#23275 · darktable-org/darktable · GitHub

6. **发言者 5**（引用未收录发言）：\[图片省略\] 发言者 1:  
     
   I have absolutely no idea what that means  
     
   this is premium “service” in a FOSS community

7. **发言者 1**（引用未收录发言）：\[图片省略\] 发言者 3:  
     
   opens a pull request which, once approved by the maintainer, pulls the code-change into darktables codebase.  
     
   My brain cell read it as withdrawing the request to fix it, which rather baffled me \(but that ain’t new\).

8. **发言者 2**（回复第 1 条）：I’d feel better if they were called “push request” :sweat\_smile:  
     
   But I remember reading some posts that the name makes sense even if it appears wrong, but forgot what it was

9. **发言者 6**（回复第 8 条）：\[图片省略\] 发言者 2:  
     
   that the name makes sense even if it appears wrong  
     
   push &amp; pull: it’s all a matter of relativity… :innocent:  
     
   sorry, could not help myself

10. **发言者 7**（回复第 8 条）：\[图片省略\] 发言者 2:  
     
   I’d feel better if they were called “push request” :sweat\_smile:  
     
   Well, you push it to your repo, and you request the maintainer to pull it into their repo, so “pull request” make sense :slight\_smile:

11. **发言者 3**（回复第 10 条）：Considering the action a Pull Request requires to fulfill is a “merge” IMHO “Merge Request” is the more sane term for a PR.

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Mini Apple and Punpkin Pies  
     
   I usually make mini apple pies and this year I used muffin liners and it didn’t allow ease of making the lattice cover. No matter how much butter I put in the wells, it sticks. I like the lattice design better, but these bite sizes are great for portion sizes.  
     
   \[图片省略\]10000219551920×2550 638 KB  
     
   \[图片省略\]10000219661080×617 145 KB  
     
   \[图片省略\]10000219481920×2550 689 KB  
     
   \[图片省略\]10000219491920×2550 637 KB  
     
   \[图片省略\]10000219501920×2550 710 KB  
     
   I used this for the apple pies and followed the recipe on the back of a pumpkin puree can and cooked the same way as the mini apple pies.  
     
       
         \[图片省略\]  
     
         Pinterest  
       
     
       
       \[图片省略\]  
     
   Mini Apple Pies Recipe - Shugary Sweets \| Mini apple recipes, Homemade apple...  
     
     A collection of ingredients and items related to making apple pies. It includes pie crusts in a muffin tin, sugar, nutmeg, cinnamon, flour, vanilla, and diced apples. Apple pies in muffin tin, Mini apple pies easy, Apple pie recipes

2. **发言者 2**（回复第 1 条）：My goodness these are cute\! And such a good idea for a big group

3. **发言者 1**（回复第 2 条）：Yup, already in portion sizes no cutting needed. Freezing is a breeze too since you can thaw out just one serving at a time.

4. **发言者 3**（回复第 1 条）：Oh I love this idea.

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Abstracts wallpapers  
     
   Hi, just making abstract wallpapers for my desktop.  
     
   \[图片省略\]mat3\_-Camera\_00011920×1080 3.33 MB  
     
   \[图片省略\]abstract wall\_paper0021920×1080 3.22 MB  
     
   \[图片省略\]abstract wall\_paper1920×1080 3.27 MB

<!-- samples:end -->

