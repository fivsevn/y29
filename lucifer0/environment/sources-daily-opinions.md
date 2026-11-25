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

<!-- intake-request:intake-8f42ca5f5d174bbcbfd925211fb7c173 -->
<!-- samples:start -->

采集时间：2026-11-26 00:06:42（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：按理说现在这环境人好招了，但是一周能看的也没几个简历，是因为年底了吗？ 最近更少了  
   西安，3 年以上，vue 技术栈，有思路想法，有责任心，自研项目，公司还在上升期，非 996， 13k-23k  
   邮箱: \[联系方式隐去\]

2. **发言者 2**：有公司介绍吗😎

3. **发言者 3**：还不是写到要求简单，面试的时候太难，vue 就那么点东西，会写个 demo 知道大概技术栈就行了，还有啥好面试的了。  
   其他 node，跨平台适配，pc mobile 都有不一样的的，这些都不要求吗？？

4. **发言者 4**：非 996 是啥意思？995 还是 966 ？

5. **发言者 1**：发言者 3 AI 时代，已经不注重八股文， web 端

6. **发言者 5**：有想法，有责任心，这样的人就不多，工作不到 10 年遇见太多逆天同事。

7. **发言者 6**：我觉得与其问技术不如直接看有没有自己的落地作品，只要看出点个人追求

8. **发言者 7**：看你说的是要求简单；  
   我刚刚毕业那会找工作也这样，要求都写的简单，去面试就嫌弃我项目简单

9. **发言者 8**：现在就这样，招聘方和求职方对简历的标准不一样，求职的实实在在写吧，公司看不上，按照假大空的写呢，公司一面发现简历有点水分也不爱要。  
   年底确实求职的变少了，招聘的更少。

10. **发言者 9**：靠谱又有技术人的，然后又要低工资留在当地，满足一切条件的人是很难。  
     
   只要不是北上广深武汉都有这种问题

11. **发言者 10**：发言者 1 不注重八股文，日常工作 AI 也能完成，那前端面试问什么

### 讨论 2

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Gestion des redirections MyWebApp NGINX  
     
   Bonjour, j’espère que vous allez bien ?  
     
   J’utilise YunoHost sur un ancien laptop.  
     
   J’ai voulu rapatrier un site/blog perso que j’avais commencé sur un hébergeur classique.  
     
   J’ai donc installé my\_webapp et fait un lien symbolique vers mes fichiers HTML / CSS sur mon disque dur externe.  
     
   Avant, mon site était géré avec Apache, donc fichier .htaccess pour les redirections, etc.  
     
   Maintenant si je veux adapter les règles, faut que j’édite la config Nginx ?  
     
   Mais lorsque je vais dans /etc/nginx.conf.d/ j’ai plusieurs fichiers pour le nom de domaine concerné :  
     
   domaine.tld.conf  
     
   domaine.tld.d  
     
   Lequel des deux j’ai le droit de modifier pour cela ?  
     
   Si je fais une mise à jour de YunoHost ou de l’application, ça risque de sauter ?  
     
   J’imagine que ce serait mieux d’avoir un txt quelque part avec les règles comme ça je restaure facilement ?  
     
   Merci pour votre aide, j’apprends pas à pas sur Nginx et j’ai l’impression d’avoir ouvert un livre encore plus gros que le html et css :smiley:  
     
   Merci à vous

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：换个串发吃什么  
     
   图为上周吃的萨利亚\(　ﾟ 3ﾟ\)

2. **发言者 1**：分享图片

3. **发言者 1**：今天吃了之前肥哥说的多利亚饭和蒜香鸡排\(ゝ∀･\)

4. **发言者 1**：本来想加个甜品的，但没给小票没法加菜，懒得找服务员，就这样吧\(\`ε´ \)

5. **发言者 2**：上海萨莉亚好像没有番茄罗勒恰巴塔吃诶\(　ﾟ 3ﾟ\)

6. **发言者 1**：忘发了，早八结束在宿舍对面吃的热干面\( ﾟ∀ﾟ\)

7. **发言者 1**（回复第 6 条）：\[引用第 6 条\]  
     
   应该说是炸酱热干面，老板娘还问我要不要香菜，没想到放了那么多\( ・\_ゝ・\)

8. **发言者 1**：晚饭，味千拉面 麻麻辣辣牛肉饭  
     
   好吃，但有点油\( ﾟ∀。\)

9. **发言者 1**：早饭没吃，晚饭是隆江猪脚饭\( ﾟ∀ﾟ\)

### 讨论 4

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Heart  
     
   \[图片省略\]

2. **发言者 2**（回复第 1 条）：how it is made?

3. **发言者 3**（回复第 1 条）：OMG IT’S ALIVE\!\! :grey\_heart:

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Collisions and PathFollow  
     
   Godot Version  
   4.6.3  
     
   Question  
   I am trying to have an enemy follow a path, but his collision box doesn’t seem to follow them. I have the enemy saved as a scene with the collision shape as a child node to the rigid body. On my main scene, the path follow and path nodes are children of the rigid body so the rigidbody can access their values and thus follow their path, but this has resulted in the collision box not moving. I’m unsure if I’ve thought about this incorrectly. In the screenshot you can see the character standing on the collision box of the enemy’s origional position even though the enemy’s collision box has moved with them.  
     
   \[图片省略\]image565×461 11.5 KB  
     
   \[图片省略\]2026-11-20\_14-54266×175 8.18 KB

2. **发言者 2**（回复第 1 条）：Things that follow paths should normally be children of the follow node, not the other way around.  
     
   That said, rigid bodies are not really meant to be animated directly by scripting. They’re supposed to be moved by the physics simulation.

### 讨论 6

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

### 讨论 7

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

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Witchy Wood Slices  
     
   I saw a cool wood slice art piece on Pinterest and fell in love with the idea of making something similar for \[某参与者\] in the Mystical Swap.  
     
   \[图片省略\]PSX\_20261109\_114107\_17942460965681920×2296 1.05 MB  
     
   I wanted to do a cascade of wood slices in varying sizes. I selected some slices and sketched designs on them before sealing each wood piece with acrylic medium. Then my husband foraged a likely branch that had been trimmed at his work. I scaled back the number of wood slices for better balance after selecting the perfect branch.  
     
   The slices were painted with acrylics and for the moon moth I used glow-in-the-dark paint as an accent.  
     
   \[图片省略\]20261103\_0829421920×1440 1.08 MB  
     
   \[图片省略\]20261103\_0831411920×2560 664 KB  
     
   \[图片省略\]20261007\_2357241920×1440 629 KB  
     
   \[图片省略\]20261007\_2357281920×1440 581 KB

2. **发言者 2**（回复第 1 条）：Ooooooh\! This is lovely\! I especially like the glowy moon moth. Very nice\! :last\_quarter\_moon\_face:

3. **发言者 3**（回复第 1 条）：Delightful\! You’ve achieved a great balance of rustic and fine finish with the materials and your lovely paintings.

4. **发言者 4**（回复第 1 条）：This is lovely. I love the moth\!

5. **发言者 1**（回复第 1 条）：Thank you, 发言者 4, 发言者 3, 发言者 2\!

6. **发言者 5**（回复第 1 条）：Ooh\! I’m a sucker for glow in the dark stuff, but the awesome art work makes these next- level awesome\!

7. **发言者 1**（回复第 6 条）：Thank you\! Finsing a good glow in the dark paint is half the battle\!

8. **发言者 3**（回复第 1 条）：:turkey: :deciduous\_tree: :fox: :evergreen\_tree: :chipmunk: :deciduous\_tree: :deer: :evergreen\_tree: :rabbit\_face: Your great project is one of this week’s Featured ProjectsCongratulations and thank you for sharing with the 某社区 Community\!\!\! :turkey: :deciduous\_tree: :fox: :evergreen\_tree: :chipmunk: :deciduous\_tree: :deer: :evergreen\_tree: :rabbit\_face:

9. **发言者 1**（回复第 8 条）：Thank you\!

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Fly. Fight. Build. Conquer. Multiplayer in the Browser

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[链接隐去\] à sauvegarder  
     
   Bonjour,  
     
   j'ai une adresse e mail sur \[链接隐去\] avec un bridge  
     
   comment faire pour sauvegarder sur un PC les paramétres du compte et tous les e mails ?  
     
   Cordialement

2. **发言者 1**（回复第 1 条）：bonjour,  
     
   j'avais trouvé le système importexportstooolNG  
     
   est-ce qu'il existe un autre moyen pour une sauvegarde ?

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Getting old Java phones online again

2. **发言者 2**（回复第 1 条）：BT PAN is pretty annoying. Palm devices also used it IIRC, and the Treos didn't have WiFi, so you were forced to use 2G or Bluetooth networking.

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：General measurements discussion for GraphWorks visualizer  
     
   Share and discuss your impressions of different measurements in the new GraphWorks visualizer tool, whether you’ve actually listened to the headphones or not \(which is normally taboo on most audiophile forums\).  
     
   I have not listened to most of the headphones in this tool btw. So most of my impressions will be based on the 5128 graphs, and sometimes some virtual listening. So they should be taken with a grain of salt.

### 讨论 13

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

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：今天分享一个出海小产品，\[链接隐去\]  
     
   一个纯前端的在线图片编辑工具网站  
     
   没有后端，没有数据库，没有服务器成本  
     
   主要是参考别人做的加了一点自己的使用心得，感觉还挺好用的  
     
   希望有大佬锐评下哈哈哈哈！！！

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：有无基/督/徒家庭的肥哥，好奇  
     
   并非封/建传/教意图\( ´\_ゝ\`\)解释起来有些繁琐

2. **发言者 2**：就岛上的岛风，正经的真的看得下去嘛

3. **发言者 3**：宗教带来的是心理安慰，和知识完全是另一个方面的事情吧\( ﾟ∀。\)所以倒也没啥冲突的

4. **发言者 4**：温州的吗？

5. **发言者 5**：我有个关系还行的同学就是基督教家庭出身的，自己也信教，他自己说他觉得基督教的教义是可以自圆其说的

6. **发言者 6**：对基督教我只有一个问题，对萝莉涩图起飞会不能上天堂吗

7. **发言者 7**：老家坐标东南沿海\(　ﾟ 3ﾟ\)，基本上家家户户都信教，佛教耶稣教大概对半。  
     
   以我的成长体验，我感觉在这穷乡下，宗教不过是老一辈亲戚邻里之间有矛盾有需要时，非常冠冕堂皇的托词罢了。比如家长以不同宗教为由命自家小孩不要跟谁谁家孩子玩；比如亲戚一家宣言转信耶稣然后拒绝参加一些传统习俗并减少往来。  
     
   不过当时我们年轻一辈是没人在意这些的，参加宗教活动大多是家长强迫。不过我看他们这些小男生耶稣教徒倒也挺乐意做礼拜的，因为他们经常讨论哪个班的谁谁会来做礼拜。

8. **发言者 8**：不知道啊，祖籍陕西现在在烟大\( ﾟ∀。\)从小到大统计少数民族和宗教人士班里几乎没有应声的  
     
   不过这并不妨碍我整本电子古兰经假装伊斯兰教徒\(\`ヮ´ \)刚好有个新疆朋友

9. **发言者 9**（引用未收录发言）：\[引用未收录发言\]  
     
   等一下，基督教电子游戏小组这东西听着是不是太反乌托邦了\( ﾟ∀。\)

10. **发言者 10**：东百边境  
     
   在俺们这旮瘩啥教都不如黄大仙管用\( ﾟ∀。\)但即便是黄大仙也不咋管事了，村里多半已不再言谈神鬼，谈及跳大神也止于风闻，谈及算卦则多半的老人不愿再传下去

11. **发言者 11**：对基督教的唯一接触是大一冬至那天，有个同省的老学长邀请我们几个小登去他家吃饺子，还带上了他的一些朋友。然后看到他家在墙上挂着基督教的证书，看日期有十几年了，他和他爱人学历都挺高的，餐前也会祷告，感谢主带来食物和水巴拉巴拉，他家小孩信不信教倒是没注意。后来我问这些个朋友是怎么认识的，他朋友回答是教会还是什么教会活动认识的\( ﾟ∀。\)

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Fair isle  
     
   So my first stitch after a color change is too loose and wonky because if I tighten it to where it’s supposed to be, that obviously tightens my float. Anyone have any tricks for this?  
     
   Thank you

2. **发言者 2**（回复第 1 条）：What pattern are you doing?  Would trapping the float help?

3. **发言者 3**（回复第 1 条）：One trick that may help is to tighten the second stitch after that first stitch following the color change. It may also help to twist the two yarns around each other to set the stitch size.

4. **发言者 1**（回复第 1 条）：I want it for general knowledge. It would apply no matter what pattern. So you’re suggesting trapping it on the stitch just prior to the color change? Hmm that may work. I’m screwing around on a flat swatch so lemme see. Hot damn\! You’re my favorite\!\!\! Perfect solution :hugs::hugs::hugs::hugs: Thank you. How did that not occur to me in my madness? Lol

5. **发言者 1**（回复第 3 条）：You know, I’ve done that. If you watch closely, however, it does pull that float a bit, especially with lighter weight yarns. Im swatching with worsted and I’ve noticed that particular issue isn’t quite as prevelant. But I think I’m going to trap the new color one stitch before the color change. It worked very well on my swatch. :smiling\_face: Thank you for your response\!\!

6. **发言者 1**（引用未收录发言）：Also this would really work out for me bc I knit true to needle size. Some folks call that tight but I call it accurate\! There is no slack under my stitches and they still move freely.

7. **发言者 4**（引用未收录发言）：Ooh, that looks like a lovely technique\!  Bookmarking that video for sure\!

8. **发言者 4**（回复第 1 条）：Trapping floats, Continental\!  
     
       
       \[图片省略\]

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：First try out work - mini house  
     
   \[图片省略\]20261123\_2151492874×1849 1.02 MB

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Weird light pollution gradient  
     
   Hello,  
     
   I’ve recently set up a new rig with an SQA55, JUWEI-14 Mount, and a ToupTek ATR533C camera.  
     
   Here’s a short exposure I took today \(~90x 60s\), about an hour and a half of the Pleiades. When I stack them with siril including my flat and bias frames, I get this weird banding pattern.  
     
   Does this look like normal light pollution to you?  
     
   \[图片省略\]image750×750 195 KB  
     
   I’ve also attached a sample light, bias, and flat frame. It kind of seems like the flat is not being applied correctly but I’m very new to this so I’m pretty lost…  
     
   2026-11-21\_17-51-32\_\_0.00s\_0004.fits \(17.3 MB\)  
     
   2026-11-20\_22-54-15\_\_4.44s\_0005.fits \(17.3 MB\)  
     
   2026-11-20\_21-09-42\_\_60.00s\_0007.fits \(17.3 MB\)

2. **发言者 2**（回复第 1 条）：I’ve only dabbled my toe into astrophotography, so don’t take my suggestion without a pinch of salt, but I wonder if it’s caused by some stray light scatter in your optics? Say a distant streetlight just glancing the surface of your objective/mirror/lens. At these exposure times it only takes a tiny bit of scattered light to do similar effects.

3. **发言者 1**（回复第 2 条）：It’s possible that some light got in but I’m in the backyard. I don’t know if the lights from my home are enough to cause these problems.

4. **发言者 2**（回复第 3 条）：\[图片省略\] 发言者 1:  
     
   I don’t know if the lights from my home are enough to cause these problems.  
     
   Hopefully someone more knowledgeable than I can confirm, but I would say yes. Even an interior light behind a curtain in a window 50 metres away can have drastic effects if it touches any optical surface. A simple black card hood around the lens should be enough to confirm or disprove it.

5. **发言者 3**（回复第 1 条）：Hello, are you using darks for image calibration? If not this may be why the correction is too large, for 60s of exposure it should be useful.  
     
   If you are using it, I don’t know… Perhaps stray light, it’s quite hard to see in the single images but of course it will be more visible in the stacks.

### 讨论 19

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

### 讨论 20

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

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Does only the DIYables 3.5 inch TFT screen shield work for the Arduino UNO R4 Wifi or is there any others?  
     
   Is there any other screen shield that is touchscreen and has colors and the screen fits perfectly onto the Arduino UNO R4 Wifi like a normal shield? Other than the DIYable one, and there like any on TaoBao or Shopee? Please let me know\! Thanks...

2. **发言者 2**（回复第 1 条）：Are there others? Yes.  
     
   2.4“ and 2.8”   with the ILI9341—you'll have to search for them yourself to see if the shops shown carry them, since they cover up the Uno and are rarely purchased.  
     
   The ones shown should work with the Adafruit ILI9341 library.  
     
   All others are 3.3V, mostly SPI displays; if you get an ESP8266 or ESP32, there won’t be any problems, and displays range from 1.2“ to 7”.

3. **发言者 1**（回复第 1 条）：But screens made for Arduino UNO R3 is mainly for R3 and processor is slower as the UNO R3’s processor is slower compared to UNO R4 Wifi. The UNO R3 is 8-bits and clock at 16 mhz while UNO R4 Wifi is 32-bits and clock at 48 mhz.

4. **发言者 2**（回复第 3 条）：So what? The ILI9341 can run at more than 48 MHz.

5. **发言者 1**（回复第 1 条）：But screen will be slower - Said by Chat GPT when I ask it :face\_with\_raised\_eyebrow:

6. **发言者 2**（回复第 5 条）：Chat GPT still has a lot to learn. It's not the ILI's fault—it's just that the library is very slow. As I wrote, get an SPI display and a level shifter, and it'll work better.

7. **发言者 1**（回复第 1 条）：But the problem is that now the Arduino UNO R4 Wifi cannot be pushed to its 32-bit and 48 mhz limit.

8. **发言者 1**（引用未收录发言）：Ok thanks :smiley: But where do I buy the 3.5 inch one? The page shows only the product description and did not tell me where to buy it. One question : does it have colours and is it touchscreen? I don’t think it’s touchscreen. If it is not, can you find me one that is touchscreen? Thanks

9. **发言者 2**（回复第 8 条）：Search on AliExpress for   3.5-inch 480x320 TFT LCD module display with ILI9488 controller for Arduino Uno and Mega2560 boards, with or without touch panel

10. **发言者 2**（引用未收录发言）：\[图片省略\] 某参与者:  
     
   For both types, I use the moononournation/Arduino\_GFX graphics library \(listed as "GFX\_Library\_for\_Arduino" in the Arduino IDE Library Manager\).  
     
   Arduino GFX isn't for beginners; to learn, start with Adafruit or the LCD Wiki, and then move on to something better.

11. **发言者 1**（回复第 9 条）：Can you find me a trustable one?

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Will Claude be able to solve future maths problems?  
     
   I think what we are seeing is amazing, Claude has been able to prove the Riemann Hypothesis. I also read that the solution was an idea used by Chebyshev. So my question is: what if Claude approaches a problem that it has never seen in training and that no one has tried to solve in infinite ways, without a lot of examples from the last 150 years?

2. **发言者 2**（回复第 1 条）：A problem that it has never seen in training casts a shadow—in the form of a common ancestry of ideas and jargon—that it has seen in training.Without that shadow, the problem would be utterly alien to us. We wouldn't even have the language to express it, so how could we feed it to Claude?

3. **发言者 3**（回复第 1 条）：Simple yes

4. **发言者 4**（回复第 1 条）：I wouldn't bet on it. LLMs are poor with math. Many of the unsolved questions in Humanity's Last Exam are mathematical.The main strength of a LLM is being able to turn electricity into attention, and most likely it's an augmentation like CAD rather than doing the whole work.

5. **发言者 4**（回复第 2 条）：They were great at mixing at matching broad ideas that may be unconnected to a person. The old LLMs at least, expensive ones like GPT 4.5. They were excellent at this, but nobody wanted to pay the cost.The new ones are more directional, like a flashlight targeted at coding.

6. **发言者 5**（回复第 4 条）：How can you say LLMs are poor at math?  You lost me at that.

7. **发言者 1**（回复第 2 条）：Let’s imagine that someone will produce with his research the new Riemann Hypothesis. No reason to think that a new theory is “alien to us”, it can simply be new to us

8. **发言者 6**（回复第 1 条）：Hell yeah ?

9. **发言者 2**（回复第 7 条）：The point of my comment was to probe the meaning of "never seen in training" and its nuances by looking at the extreme end of the spectrum.

10. **发言者 7**（回复第 1 条）：We don't know

### 讨论 23

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

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Fund browser-grade certificate checking for every TLS client

2. **发言者 2**（回复第 1 条）：Really interesting idea. I like that it's distrust only.  
     
   Would OneCRL track revocations for certificates outside the trees trusted by Mozilla? A couple years ago I was looking at the differences between some common trust roots, as they are not entirely aligned, especially Microsoft's. I think there may be a renovation gap there?

### 讨论 25

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：我今天在网上看到一篇纪念数学家、哲学家王浩的文章，里头提到哲学家何兆武。何兆武在他的《上学记》里谈到，有一次他和王浩讨论幸福问题，王浩最终同意了如下说法：幸福是日高日远的觉悟，是不断的拷问和扬弃，是通过苦恼的欢欣，而不是简单的信仰。  
     
   我觉得这句话就像阳光一样，一下子照亮我的内心了。只是叹息光阴似箭，年少时并不懂得珍惜。不知道大家都追求的是什么样的生活呢？大概正是人人都有不同的追求，这个世界才如此五彩缤纷吧。

2. **发言者 2**：我觉得日常上班，有时忙，有时不忙，喝一杯咖啡，卫生间里蹲十分钟，看个网文，发几个帖子，就挺幸福啊。要求是不是很低？

3. **发言者 3**：不断地被推着前进, 并不知道我自己想要的是啥, 也没有朝着这个方向努力, 每天疲惫不堪, 虚度时日

4. **发言者 4**：只工作不上班，每天花时间最多的地方就是躺在沙滩上晒太阳, etc.  
     
   我觉得我的时间远比公司给我的要昂贵，我只是还没证明它

5. **发言者 5**：AI 出来后，越发感觉人类的使命就是吃喝玩乐🤩🥳🥰

6. **发言者 6**：有一天提早下班了，下地铁后去 KFC 吃了顿晚饭骑车回家，路上看到太阳还没落山拍了一张照片发了朋友圈，配文是：  
     
   停下来拍太阳的时候，风正好吹过  
   以前是放学，现在叫下班  
   感觉差不多，又好像多了点  
     
   或许是明天不用 6 点半起了，8 点也还好  
   大概是手里的绿茶是冰的，而我有两杯  
   （图里没拍，但你们知道就好）\[跳跳\]

7. **发言者 1**：发言者 6 真是生动活泼的文字。

8. **发言者 7**：不生病，身体没有任何不舒服，不会失眠，正常上班，偶尔加加班也无妨，有一两个朋友时常聚一聚，周末能宅在家喝茶看电影，看老动漫，就知足了

9. **发言者 2**：发言者 6 让 ai 生成古诗

10. **发言者 8**：不知道。

11. **发言者 1**：发言者 5 做喜欢的事情，的确就和吃喝玩乐一样舒服。

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：是我活到头了吗，看到有家长把生姜塞孩子肛 门里体罚的\( ﾟ∀。\)

2. **发言者 2**：我只在字母圈见过这么玩的

3. **发言者 3**：他妈的都说了小圈玩法别往社交媒体上发\(╬ﾟдﾟ\)  
     
   除了生姜之外我还看到好多家长不知道从哪学的小圈玩法，一问就是“我看某社区上说他们都这么教育自己孩子”  
     
   tnnd，对方说的可不是真正意义上的孩子啊\(╬ﾟдﾟ\)

4. **发言者 4**（回复第 2 条）：\[引用第 2 条\]

5. **发言者 5**（回复第 2 条）：\[引用第 2 条\]  
     
   这也太扯\(　д \) ﾟ ﾟ字母圈也不这么玩啊，不“舒服”的

6. **发言者 6**：孩子以后觉醒了奇怪的xp咋办\( ﾟ∀。\)

7. **发言者 1**（回复第 6 条）：\[引用第 6 条\]  
     
   我记得不知道从哪里看到“爱海SM是因为童年创伤”的理论了\( ﾟ∀。\)

8. **发言者 7**：话说我这边这算是一种偏方……治肚子寒凉……当然了是在生病比较严重的时候，姜切指头大小去皮再塞

9. **发言者 8**（回复第 1 条）：\[引用第 1 条\]  
     
   给孩子上水刑的都有，模仿西冰库大酒店也不怕给孩子水出脑坏死

### 讨论 27

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

6. **发言者 1**（回复第 2 条）：And I’m back\! Ha\! Still working on the leaves pattern. About to start the row which has a K5tog. Did you knit as written or did you do something different?  
     
   I am taking this slowly. Already had to take it all out once so carefully counting after each row\! I used your advice, marking each repeat which really helps\!\!\!  
     
   thank you\!  
     
   Charlene

7. **发言者 2**（回复第 6 条）：I worked the k5tog as written. It worked out well as I remember.  
     
   Working slowly through this yoke pattern is a good idea. Lots of shaping and fun at the same time. You’re making great progress\!

8. **发言者 4**（回复第 1 条）：Do you know about lifelines, which can protect your hard work if you have to rip back to fix something?  
     
       
       \[图片省略\]

9. **发言者 1**（回复第 7 条）：Thank you\!  I love a challenge.  Ha\!  
     
   Hope you have a nice Thanksgiving.  
     
   Charlene

10. **发言者 1**（回复第 8 条）：Great video\!  Thank you so much.  I am hoping I won’t need to take out any more rows on this project.  Taking it slow\!  
     
   Happy knitting and I hope you have a nice Thanksgiving.  
     
   Charlene

11. **发言者 5**（回复第 1 条）：I need the stitch pearl or knit it plain but from the back that avoids holes for me .Good luck \!

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Darktable spektrafilm pack generator  
     
   As it might be missed in the thread it has been posted, I think a new post is better. I made a little website that lets you create a pack file for darktable’s spektrafilm module from all the film stocks currently available.  
     
       
         \[图片省略\]  
     
         发言者 1.\[链接隐去\]  
       
     
       
         
     
   Spektrafilm Pack Creator for darktable  
     
     Pick film and paper profiles from darktable and Negs, synced from git every night, and download them as one spektrafilm pack for darktable.  
     
       
     
       
         
         
       
     
       
     
   In case you want to contribute, this is the repo: GitHub - 发言者 1/spektrafilm-stock-repo: collection of digitized film stocks for forther usage in spektrafilm · GitHub  
     
   Thanks to all people involved digitizing film stocks and creating the shoulders to stand on with this page\! Enjoy. Also thanks to the GRKit project for the nice film stock icons and the general page design ideas :slight\_smile:

### 讨论 29

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

### 讨论 30

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

### 讨论 31

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

3. **发言者 3**（回复第 1 条）：包山包海都說算是行銷

4. **发言者 4**（回复第 1 条）：GA證照不是照著背就有了嗎哈哈哈

5. **发言者 5**（回复第 1 条）：現在老闆都看短期轉換啊 以前做的

6. **发言者 5**（回复第 1 条）：那些經營要經營的又深觀察期又長

7. **发言者 6**（回复第 1 条）：現在不投廣就沒流量啊

8. **发言者 7**（回复第 1 条）：現在多數公司預算分配八成是促購轉

9. **发言者 7**（回复第 1 条）：換 當然選的人就是要會投廣

10. **发言者 8**（回复第 1 条）：那是你們公司層級不夠吧，大品牌的

11. **发言者 8**（回复第 1 条）：行銷才不是只投廣

### 讨论 32

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：The CIA is the latest federal agency hit by a cyber breach  
     
   The CIA is the latest federal agency hit by a cyber breach, with two sources confirming to Fox News that unclassified information was exposed on a network used for intelligence analysis.An FBI source says the intrusion occurred the same day the bureau suffered a separate cyberattack last week.The CIA and Office of the Director of National Intelligence discovered the breach, according to The New York Times.Sources tell Fox News the CIA cyber breach happened the exact same day the FBI was hacked last week

2. **发言者 2**（回复第 1 条）：The most significant breach target of the year.And no-one here cares, when they should.

3. **发言者 3**（回复第 1 条）：Looks more like war than ever.  Though I bet that a lot of the outages were truly from people hurriedly updating to harden against expected operations.  Given the state of Iran war that seems like the most likely perpetrator.  Anyone here believe it is coming from a different actor?

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Matrix Multiplication is Θ\(n^2.25\)

2. **发言者 2**（回复第 1 条）：In retrospect, the exponent for matrix multiplication being 9/4, two \*square\* numbers, makes a lot of sense.

3. **发言者 3**（回复第 1 条）：I was going to upvote this but I realized there is no accompanying machine checked proof, only one that relies on natural language which I still don't trust for LLMs especially w/ 100\+ pages of generated proof.  
     
   Link to paper without machine checked proof: \[链接隐去\]

4. **发言者 4**（回复第 1 条）：Has OpenAI reintroduced RLHF for their math research models?  
     
   This proof seems more readable than the ones from earlier in the summer.

5. **发言者 5**（回复第 1 条）：Stochastic parrots are unstopable. All these AI-driven math „proofs” are just marketing for me to pump AI net worth.   
     
   I bet there are much more critical places where AI companies may show their value.

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Baumarkt Hellweg schliesst alle Filialen bis Ende Nov 2026  
     
   Hier der Status NRW:  
     
   \(Steinfurt\) - Übernahme durch Obi  
     
   Mechernich-Kommern - Übernahme durch Obi  
     
   \(Münster-Gievenbeck - Übernahme durch Obi\)  
     
   \(Beckum\) - Übernahme durch Bauhaus  
     
   Dortmund-Hacheney - Übernahme durch Bauhaus  
     
   Essen-Rellinghausen  - Übernahme durch Bauhaus  
     
   Iserlohn - Übernahme durch Bauhaus  
     
   Gelsenkirchen - Von Bauhaus übernommen  
     
   Dortmund-Kley - Fortführung durch Hornbach  
     
   Essen-Borbeck - Fortführung durch Hornbach  
     
   St. Augustin - Fortführung durch Hornbach  
     
   Die Neueröffnungen finden ca. März 2027 statt.  
     
   Alle anderen werden voraussichtlich abgewickelt, die bereits aus OSM gelöschten sind eingeklammert:  
     
   \(Ahaus\)  
     
   \(Bielefeld\)  
     
   \(Bocholt\)  
     
   Bochum  
     
   Bonn-Beuel  
     
   Bonn-Duisdorf  
     
   \(Dortmund-Wambel\)  
     
   Dorsten  
     
   Duisburg  
     
   \(Dülmen\)  
     
   Ennepetal  
     
   Essen-Altenessen  
     
   Essen-Kettwig  
     
   \(Gronau\)  
     
   Hagen  
     
   \(Hamm\)  
     
   Hattingen  
     
   Kreuztal  
     
   \(Lüdenscheid\)  
     
   Mettmann  
     
   Monheim  
     
   \(Münster-Loddenheide\)  
     
   Oberhausen  
     
   \(Recklinghausen\)  
     
   Rheda-Wiedenbrück  
     
   \(Selm\)  
     
   Werl  
     
   Wuppertal  
     
   Quelle: WN und KI-Recherche

2. **发言者 2**（回复第 1 条）：In Bielefeld gibt es schon seit etwa einem Jahr keinen Hellweg-Baumarkt mehr, da ist mittlerweile eine Globus Baumarkt Filiale drin …

3. **发言者 1**（回复第 1 条）：Eine Abfrage dazu:  
     
   Query: overpass turbo

4. **发言者 1**（回复第 1 条）：Sollte man eigentlich das brand-Geraffel auch löschen, wenn man einen shop auf disused stellt?

5. **发言者 3**（回复第 1 条）：Essen-Kettwig hat auch seit letzter Woche geschlossen. Hier steht wohl noch nicht fest wie es weiter geht. Der Markt fehlt in Deiner Liste \(noch\)

6. **发言者 4**（回复第 4 条）：erscheint mir logisch, also ja

7. **发言者 5**（回复第 4 条）：Jo, sehe ich auch so wie Walter 发言者 4

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：希望达子再接再厉，早日破千亿百亿  
   戳破 AI 大泡沫，成功造福全人类

2. **发言者 2**：金融泡沫破灭，其实是全民买单的。 😑

3. **发言者 3**：期待五折股价，赶紧死

4. **发言者 4**：谷歌站起来后，大家都讨厌 a 家了

5. **发言者 5**：这种垃圾公司，有什么好恭喜的。

6. **发言者 6**：发言者 5 他说的是向下破万亿，是在嘲讽……

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：我好饿啊\( ;´д\`\)我好想吃猪脚饭

2. **发言者 2**：吃

### 讨论 37

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：GTA6 , any platforms  
     
   Anyone ? :flexed\_biceps:t2:  
     
   \[图片省略\]IMG\_9216585×902 55.5 KB

2. **发言者 2**（回复第 1 条）：Just remember if you wait  for 6 years, all the bugs will be fixed; it will have a PS6 enhanced edition; and be available for $20.  
     
   If you buy it now, when the enhanced low cost version is out, you’ll already have played it to death.

3. **发言者 3**（回复第 2 条）：Supposedly the delays have been to ensure that the release version is as debugged as it can be. Takes 80 hours to complete if you are a competent gamer approx. But there’s many more hours of enjoyment over and beyond completing the main game.  
     
   I would say that for £70 approx that’s a good deal

4. **发言者 1**（回复第 1 条）：The radio stations was damn good , I would say they sounds better than some have to offer for steaming :laughing:.  
     
   5 hrs into the game and it’s so addictive . Tons of great contents and hilarious stuffs . Hahahah  
     
   I haven’t even touch the tip of the iceberg yet so busy with chores to do in this game . A worthy 10/10 .

5. **发言者 2**（引用未收录发言）：My friends at work are also playing it with their older kids.  
     
   Bonding over car jacking and murdering pimps in cold blood :joy:

6. **发言者 4**（回复第 5 条）：If you over do that your criminalise and harden your character… for a certain path… but there are other ways… the choice is yours.. but it is entertaining.  
     
   The car jacking can be fun… the best so far has been a mobility scooter to resolve a neighbourhood feud\! obviously quite early on

7. **发言者 1**（回复第 1 条）：\[图片省略\]IMG\_92241290×1850 303 KB

8. **发言者 5**（引用未收录发言）：\[图片省略\]  
     
         \[链接隐去\]  
       
     
       
         
     
   xkcd: Cutting Edge

9. **发言者 2**（回复第 8 条）：Spot on

### 讨论 38

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Knight Dusk End  
     
   \[图片省略\]Thumbnail1616×1264 1.5 MB  
     
   Knight Dusk End, Blender 3.6 Eevee  
     
   \[图片省略\]13840×2160 4.63 MB  
     
   \[图片省略\]23840×2160 4.27 MB  
     
   \[图片省略\]33840×2160 4.77 MB  
     
   \[图片省略\]43840×2160 4.73 MB  
     
   \[图片省略\]51920×1080 152 KB  
     
   \[图片省略\]63840×2160 4.67 MB  
     
   \[图片省略\]71920×1080 168 KB  
     
   \[图片省略\]83840×2160 2.97 MB  
     
   \[图片省略\]93840×2160 4.04 MB  
     
   \[图片省略\]Logo3840×2160 3.44 MB  
     
   \[图片省略\]ss1920×1080 909 KB  
     
   Safe\!

2. **发言者 2**（回复第 1 条）：wow , that is supper amazing \!

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：I just received my Nikon D200 and the sun has set  
     
   \[图片省略\]\_AKX0550\_fujifilm\_acros\_100\_ii2824×4104 2.25 MB  
     
   \_AKX0550.NEF \(8.3 MB\)  
     
   Edited using negs so I faked the extension to .xmp  
     
   \_AKX0550.NEF.negs.xmp \(835 Bytes\)  
     
   This file is licensed Creative Commons, By-Attribution, Share-Alike.

2. **发言者 1**（回复第 1 条）：Here’s one close to the In-Camera jpeg \(White Balance as Shot\)  
     
   \[图片省略\]\_AKX0550\_fujifilm\_c2002608×3888 3.15 MB

3. **发言者 2**（回复第 2 条）：Did the CCD gang get to you? :grinning:

4. **发言者 1**（回复第 3 条）：Yes\! Lucy Lumen got me :laughing:

5. **发言者 3**（回复第 1 条）：\[图片省略\]\_AKX05502000×2874 621 KB  
     
   \_AKX0550.NEF.xmp \(22,3 KB\)

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Nerd Commander IV  
     
   \(Thema vom Verfasser gelöscht\)

### 讨论 41

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 冬天皮膚保養  
     
   冬天手跟臉都會乾到變白白的  
   看起來就會有點醜  
   擦護手霜又沒辦法一勞永逸  
   想問大家有遇過這種狀況嗎？怎麼解決的？

### 讨论 42

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

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Deviled Eggs with Candied Bacon  
     
   \[图片省略\]10000217781920×1446 322 KB  
     
   My office is having their Thanksgiving Luncheon today and for the Potluck I will be bringing in Deviled Eggs with Candied Bacon.  
     
   I used this recipe to make these:  
     
       
       \[图片省略\]  
       
     
   \[图片省略\]10000217771920×2550 663 KB  
     
   \[图片省略\]10000217761920×2550 784 KB  
     
   \[图片省略\]10000217751920×2550 1.13 MB

2. **发言者 2**（回复第 1 条）：Those look delicious\!

3. **发言者 3**（回复第 1 条）：I am about to send this to Mr. Stitch and beg him to make these. Thanks so much for sharing\!

4. **发言者 4**（回复第 1 条）：Oooooo\! These sounds delicious\!

5. **发言者 1**（回复第 1 条）：It’s pretty yummy\! My husband found the recipe and the bacon is worth the work. It’s a nice addittion to the traditional recipe.

6. **发言者 5**（回复第 1 条）：Yum\! I love deviled eggs, but the candied bacon is magnifique :woman\_cook:.

7. **发言者 6**（回复第 1 条）：These are gonna have to go on my Thanksgiving table this year\! My family will go insane for these\! Of course, I may be sealing my fate because my husband will want them ALL. THE. TIME.  
     
   \(Beginning to plot how I can make these a surprise…\)

8. **发言者 1**（回复第 1 条）：They were a big hit at my work luncheon\! Not one left. This is always served at our family Thanksgiving dinner as well. My husband usually makes these but I work up at 5 am the day if my luncheon for work and I made them myself this time.

9. **发言者 4**（回复第 1 条）：:turkey: :deciduous\_tree: :fox: :evergreen\_tree: :chipmunk: :deciduous\_tree: :deer: :evergreen\_tree: :rabbit\_face: Your great project is one of this week’s Featured ProjectsCongratulations and thank you for sharing with the 某社区 Community\!\!\! :turkey: :deciduous\_tree: :fox: :evergreen\_tree: :chipmunk: :deciduous\_tree: :deer: :evergreen\_tree: :rabbit\_face:

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：GitHub Is Down  
     
   See title.

2. **发言者 1**（回复第 1 条）：Annnnnd it's back.

3. **发言者 2**（回复第 1 条）：I can login, but as soon as I enter my 2FA it says no server is available to handle the request and boots me out.EDIT: Mobile app stayed logged in but requests such as marking notifications as read result in an error

4. **发言者 3**（回复第 1 条）：Can't login here, 10h50 EST. Github status shows all system operational.

### 讨论 45

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

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：1. 订阅 plus,google 地址更换为美国  
   2. google one 显示黑五折扣，但显示不支持订阅。  
   3. 更改账单地址为美国，订阅了黑五 pro  
   4. 反重力、CLI 均不支持 neon，web 支持 neon  
   5. 补充下，支付改为了美国，但是最终支付还是显示港币。  
   有类似情况的吗？求解决方案~

2. **发言者 2**：我开通比较顺利，反重力里面可以用 neno，换节点试试呢？

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：大晚上的去一个塔罗直播间蹲着看节目\( ﾟ∀。\)

2. **发言者 1**：顾客:老师，我想看看和我睡觉这个人对我是什么想法  
     
   主播:你们两个是什么关系  
     
   &gt;暧昧  
     
   主播:暧昧多久  
     
   &gt;两三年  
     
   主播（抽牌）:我看你也有别的床搭子?  
     
   &gt;对  
     
   主播:他看你也就觉得是一个床搭子，没什么特别的

3. **发言者 1**：&gt;老师，我想看看我和我对象能不能过的长久  
     
   &gt;我们两个都有家庭

4. **发言者 2**：\(　д \) ﾟ ﾟ

5. **发言者 1**（回复第 2 条）：\[引用第 2 条\]  
     
   哦对，那个女生:  
     
   &gt;我就说他怎么对我平时这么冷淡，但是他不应该啊，他应该喜欢我，应该对我好

6. **发言者 1**：&gt;老师，我们两个分手三个月了，还能复合吗  
     
   主播:抽个牌看看对方的状态  
     
   &gt;我知道他外面有人了，我抓到的

7. **发言者 3**：･ﾟ\( ﾉヮ´ \)这就是现充吗  
     
   ･ﾟ\( ﾉд\`ﾟ\)为什么这种人都有对象

8. **发言者 1**（回复第 6 条）：\[引用第 6 条\]  
     
   那个男的外面还不止一个\( ﾟ∀。\)

9. **发言者 4**：符合我对塔罗受众的想象\( ﾟ∀。\)

10. **发言者 5**（回复第 7 条）：\[引用第 7 条\]  
     
   就这种啥都不挑只想配种的人对象才多呢\( ﾟ∀。\)7

11. **发言者 1**（回复第 9 条）：\[引用第 9 条\]  
     
   说实话，在真的听完她的讲述以后，我反而理解了这种情况的成因  
     
   一个人没法从自身来获取情绪价值，就要向外求，这就让一个人变得很难去断舍离，一旦从某个人身上获取到了情绪价值，就会抓住不放手

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How to gradually add vocab to Master\+?  
     
   I apologize as I’m certain this has been discussed before but I can’t find the thread. I really want to start incorporating master\+ for my vocab \(I’ve already done so for grammar\) but I’m worried I will have a deluge of over 1000 reviews if I do so. Is there any way to mark just a few items at a time as master\+ so I can space out the reviews?

2. **发言者 2**（回复第 1 条）：Sounds like they resolved this, but when I did the initial update all I was slated to get like 2000 reviews on one day and staff manually paced them out for me.  
     
   That is to say, even if it isn’t fixed, staff could help you out if it came down to it\!

<!-- samples:end -->

