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

采集时间：2026-11-28 15:13:51（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：今天是红色

2. **发言者 2**：今天是小熊

3. **发言者 3**：今天是蓝白

4. **发言者 1**：饮料标签

5. **发言者 2**（回复第 4 条）：\[引用第 4 条\]  
     
   不赖

6. **发言者 1**：今天是透明的

7. **发言者 4**（回复第 4 条）：\[引用第 4 条\]  
     
   用饮料标签真的不喇屁股吗\( ﾟ∀。\)

8. **发言者 5**：今天是创可贴

### 讨论 2

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

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Quiz: Guess the album / artist: just a bit of fun\!  
     
   As per title try and guess the album by the snippet of their album cover and extra bonus \(imaginary\) points if you can name the artist.  
     
       
         \[图片省略\]  
     
         BBC  
       
     
       
       \[图片省略\]  
     
   BBC - Quiz: Can you guess the iconic album artwork?  
     
     We may have zoomed in just a bit...

2. **发言者 2**（回复第 1 条）：Only got one wrong. Misidentified one album but got the artist right. Good quiz….  
     
   \[图片省略\]image1640×2360 275 KB

3. **发言者 1**（回复第 2 条）：Badger I had to edit the post as the bbc one showed the artists but thanks for playing.:\+1:

4. **发言者 2**（回复第 3 条）：Cheers 发言者 1. Enjoyed the quiz\!

5. **发言者 3**（回复第 1 条）：It seems one has to b a subscriber to Apple News to see.

6. **发言者 1**（回复第 5 条）：I did not realise that. Here’s the BBC magazine. Guess the album.  
     
       
         \[图片省略\]  
     
         BBC  
       
     
       
       \[图片省略\]  
     
   BBC - Quiz: Can you guess the iconic album artwork?  
     
     We may have zoomed in just a bit...

7. **发言者 3**（回复第 1 条）：I got 5 right\! But only one through recognising it, the others random\! I only have one of the albums \(the one I got right\!\), - the vast majority simply not my kind of music.

### 讨论 4

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

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Ambiguous Errors Are the Mind Killer

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[A VENDRE / PRICECHECK\] 7900xtx  
     
   Je cherche surtout un prix parce que je n'ai aucune idée du marché avec les fluctuations dues à l'IA. Les sous de cette vente me serviront à acheter un objectif pour faire de la photographie animalière.  
     
   Voilà ce que je vends \(facture initiale\), config achetée chez Dubaro en Décembre 2023.  
     
   \[图片省略\]image855×740 128 KB  
     
   Raison de la vente :  
     
   J'ai changé de GPU en décembre 2025 parce que je voulais le RTX. La 7900xtx est sur une étagère dans sa boite depuis, en me disant que ça pourrait dépanner au cas où.  
     
   \[图片省略\]image1201×350 24.9 KB  
     
   j'ai essayé de trouver le prix de l'occas pour une 7900xtx mais je comprends pas la disparité des prix que je trouve, sur vinted y'en a pas une seule sous 1100€ et sur le bon coin y'en a une listée à 700 balles.  
     
   Donc même si vous achetez pas, me donner un prix auquel je n'arnaque pas l'acheteur sans me faire arnaquer moi même m'avancerait déjà pas mal.  
     
   Merci\!

2. **发言者 1**（引用未收录发言）：Mon kit appareil photo \+ objectif va me couter autour de 2000balles, c'est pour ça que je veux "alléger" la facture en la revendant. Merci pour le post détaillé.

3. **发言者 2**（回复第 2 条）：Je comprends.  
     
   À toi de gérer le risque d’une défaillance de ta 5080 sur les 5 prochaines années.  
     
   Avant on se posait pas la question. Mais maintenant outre les prix délirants, c’est même la disponibilité de ces cartes high end qui est remise en cause.  
     
   nVidia et AMD quittent le marché des particuliers …  
     
   Bon courage dans ta réflexion \!

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Preview gallery in rawtherappe editor  
     
   Since few days even after installing Rawtherapee 5.13, very few photos show completely black in preview gallery but when clicked and loaded for edition they seem to be OK not black. Is it due to a codec issue or what else ?

2. **发言者 2**（回复第 1 条）：Hello, what’s your camera ?

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[Voting\] Feature Proposal – Seaplane Bases  
     
   Voting has started for Seaplane Bases.  
     
   It proposes to introduce aeroway=seaplane\_base as a variant to aeroway=aerodrome, similar to aeroway=heliport.  
     
   It also proposes to standardise water runway tagging as seamark:type=seaplane\_landing\_area and not aeroway=runway.  
     
       
     
         \[链接隐去\]  
       
     
       
         
     
   Proposal:Seaplane Bases - OpenStreetMap Wiki

### 讨论 9

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

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[討論\] 那些只會生不會養的家長是不是只想騙補助  
     
   如題  
   生了小孩之後不顧小孩健全成長只會叫別人包容忍耐的是不是都是一群我不會顧只會生只想騙補助的家長啊  
   這樣跟吃合法飯有什麼差別？  
   就算現在生育率低鼓勵生育也不應該一堆敗類下一代吧？  
   有沒有應該將只會生不會顧的家庭生育補助回收的八卦  
   -----  
   Sent from J某社区 on my iPhone

### 讨论 11

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

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：分享下我做的 Browser Game Hub。站里收了些能直接在网页上玩的小游戏，赛车、益智、双人游戏都有。不用下客户端，也不用注册账号。  
     
   \[链接隐去\]  
     
   我还加了个实机视频 Feed。挑不出来就刷两段，看到想玩的可以直接从视频点过去。手机上能筛支持触屏的，想和朋友一起玩也能按人数找。  
     
   大家有空可以上去玩两把。要是碰到哪个游戏打不开，或者手机上按了没反应，可以在楼里留个游戏名和设备型号，我好复现。

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Knitting group potluck soup that holds up in a slow cooker?  
     
   Our Sacramento knitting group meets Saturday afternoons and we take turns bringing something for the table. I have a slow cooker and was thinking about an easy lentil soup since it can sit on low for a few hours while we work through our projects. My concern is timing and texture: will the lentils turn mushy if they stay warm for three or four hours, and does the soup thicken too much as it sits? I also do not want to soak anything overnight because I usually decide what to make the morning of. I found a one-pot lentil soup recipe online that says no soaking is needed, but I have not made it and cannot speak to how it behaves in a slow cooker rather than on the stove. Has anyone brought lentil soup to a knit night or potluck and kept it warm for hours? Any tips on liquid ratios or when to add vegetables so they do not fall apart? I would appreciate hearing what worked.  
     
   I found this Easy Lentil Soup Recipe \(One Pot, No Soaking\) while searching for no-soak options, but I still can’t tell how it holds up on low for three or four hours without turning to mush. Anyone tried keeping lentils warm that long?

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Animation cow calf rescue  
     
   Animations are beginning to emerge.

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Godot 3\(not 4\)pick up and use items  
     
   Godot Version  
   Godot 3 .2.3 stable  
     
   Question  
   \(A\) you are walking across a platform you find a gun on the ground you pick it attach it to the player  then using a key like \(S for example\)  it shots bullet.  
     
   \(b\) you find a knife  you then use a key like \(T for an example\) to throw it.. \(and based on what it hits you either kill and enemy or brake windows etc..\)  
     
   \(C\) you find an apple  you put it into your inventory  then later  you give it to an NPC eat or sell it\)

2. **发言者 2**（回复第 1 条）：So what is your question / problem?  
     
   I recommend checking Posting guidelines in \#Help channel

3. **发言者 1**（回复第 1 条）：\[A\]  
     
   \[1\] how do you pick up the gun  \[2\] how do you attach it to player \(3\) how to make shot  
     
   \[B\]  
     
   \[1\] how do you pick up knife  \[2\] how do you throw it   \[3\} how do you tell what if if hits enemy then kill enemy or if it hits window how do brake window  
     
   \[C\]  
     
   how do you pick up apple  how do you put into inventory  how do take it out of inventory and hand it to NPC

4. **发言者 3**（回复第 1 条）：Honest question , why are you still on Godot 3?  Things have moved on somewhat.

5. **发言者 4**（回复第 1 条）：Thanks for pointing to an Area2D proximity check and a shared interacted signal. For Godot 3.2.3, is that still the usual first step before wiring a separate inventory, or does pickup need to live inside the inventory system from the start?

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：犯罪预告：小肥将在后天前往滨寿司进行超级肥力挑战\(　ﾟ 3ﾟ\)

2. **发言者 2**：100个是及格线  
     
   不要给岛丢人\( \`д´\)

3. **发言者 3**：200个是及格线  
     
   不要给岛丢人\( \`д´\)

4. **发言者 4**：300个是及格线  
     
   不要给岛丢人\( \`д´\)

5. **发言者 1**（回复第 2 条）：\[引用第 2 条\]  
     
   \[引用第 3 条\]  
     
   \[引用第 4 条\]  
     
   这要看钱包脸色

6. **发言者 5**：100773482\[1,337845818\]个是及格线  
     
   不要给岛丢人\( \`д´\)

7. **发言者 6**（回复第 5 条）：\[引用第 5 条\]  
     
   钱包是爹还是你是爹\( \`д´\)让它看看谁才是主人！

8. **发言者 7**：5810573833778\[1,6352785342828\]个是及格线  
     
   不要给岛丢人\( \`д´\)

9. **发言者 8**：\( ›´ω\`‹ \)回转寿司好贵的，肥之前吃完满脑子就是好后悔，还不如去kfc吃全家桶爽

10. **发言者 9**：80\[1,100\]个是及格线  
     
   \(\`ヮ´ \)不要给岛丢人！

11. **发言者 10**：1～3 排队一下午吃不上 弑羽而归  
     
   4～6 因为好奇点了很贵的单品结果不好吃  
     
   7～9 完美平衡了预算和口腹之欲，肥力小测大成功  
     
   10     ？？？

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：1st-gen streamers and Spotify/Tidal  
     
   Is there something wrong with the app or a recent firmware update that I’m missing?  My UQ2 has just absolutely refused to play Tidal or Spotify.  Will show the track/album info but stays stuck on pause.  I’ve deleted and reinstalled all the apps \(incl the Naim app\) but it’s still stuck.  I’m on 4.9.4 and it’s just the damnedest thing.  Absolutely no go.  
     
   Only thing I can think if is that I’m on wifi and not plugged into an access point.  
     
   Any BTW - internet radio works just fine.  
     
   Anyone else with issues?

2. **发言者 2**（回复第 1 条）：My UQ is also not working.  
     
   Please let me know when you sort out the problem.

3. **发言者 1**（回复第 1 条）：Still no clue.  It plays for a split second and then goes right to ‘pause’

4. **发言者 1**（回复第 1 条）：Tried from my iPad as well - no joy.

5. **发言者 3**（回复第 4 条）：See the thread " Naim app not working".

6. **发言者 1**（回复第 5 条）：where?

7. **发言者 3**（回复第 6 条）：Streaming part, or search in the search part and tap " Naim app ". One thread has 154 posts and more.

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Company Culture = Slack Emoji ÷ sqrt\(Headcount\)

2. **发言者 2**（回复第 1 条）：Tag: satire  
     
   How do you figure this is a satire? On the orange site people take it seriously: \[链接隐去\]

3. **发言者 3**（回复第 1 条）：\`330/sqrt\(180\) = 25\`, yeah this is fine.

4. **发言者 4**（回复第 2 条）："Culture" is an ill-defined term, especially here.  
     
   To lose the satire tag, I'd expect at least some heuristics like "this company in business area X has a good culture according to this metric, while its competitor does not, and this is the difference in their economic performance". You can sub in stuff like employee satisfaction if you want.

5. **发言者 5**（回复第 1 条）：This is an excellent friday post :shia-labeouf-applause:

6. **发言者 6**（回复第 1 条）：&gt; If your company uses Microsoft Teams, there is no equivalent formula. There doesn’t need to be. If you use Teams, your lack of culture is probably the least of your problems.  
     
   I don’t know what’s funnier: this truth, or that some people deny it.

7. **发言者 7**（回复第 2 条）：&gt; How do you figure this is a satire? On the orange site people take it seriously  
     
   Holding up the orange site as an example is... interesting.

8. **发言者 2**（回复第 7 条）：Why? HN has a lots people from American corporations, they presumably understand what is meant to be taken seriously in the context of "corporate culture" even if it is in fact ridiculous.

9. **发言者 8**（回复第 1 条）：Disappointingly slackbot refuses to collect any of the relevant numbers

10. **发言者 9**（回复第 9 条）：\[链接隐去\]

11. **发言者 9**（回复第 1 条）：I think this equation may need a term for proportion of Slack users who are grad/doctoral students. My work slack has a whopping coefficient of 58.04, but if you somehow filtered down to emojis added by staff/faculty, I suspect it would shrink immensely. Maybe that reveals something about the workplace culture\!

### 讨论 19

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Spanish-language guides: darktable, RapidRAW on Linux and color management  
     
   Hi all\! I’m a photographer and sysadmin from Barcelona. After 14 years with Lightroom I moved my whole workflow to Linux with free software, and I’ve been writing guides in Spanish for people who don’t read English comfortably. In case they help any Spanish-speaking users here:  
     
   darktable en español: first steps developing RAW files in darktable. darktable en español: cómo empezar a revelar RAW  
     
   Problemas de RapidRAW en Linux: GPU, Nvidia and Wayland issues, with the fixes that worked for me. Problemas de RapidRAW en Linux: GPU, Nvidia y Wayland \(soluciones\)  
     
   Gestión del color en Linux para fotógrafos: from monitor calibration to printing. Gestión del color en Linux: guía fácil en 5 pasos  
     
   Feedback and corrections are very welcome, especially on the color management one. Thanks to everyone here for all the knowledge shared over the years\!

2. **发言者 2**（回复第 1 条）：Hola, se echa mucho en falta contenido en español, así que enhorabuena, de paso esto me lleva a tu pagina, un preset de RapidRaw que además es lo que uso ahora, contenido muy interesante y fotografías muy buenas. Un saludo

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Sheetlytic – Take a photo of sheet music and hear it play  
     
   My wife is a piano teacher, and she often encounters a simple problem: students return home after their lessons and forget how a piece is supposed to sound or how a particular passage should be played.I built Sheetlytic, an app that turns a photo of sheet music into playable music.The idea is to bridge the gap between reading sheet music and hearing it, without having to search for an existing recording or manually enter notes into notation software.While the original motivation came from piano teaching, I think it could also be useful for musicians learning unfamiliar pieces on their own.Sheetlytic is available on:Android: \[链接隐去\] \[链接隐去\] \[链接隐去\] the developer and would love to hear your feedback, particularly on usability, recognition accuracy, and potential use cases.Happy to answer any questions\!

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Quilty Paper Bookmark  
     
   For the last several years we give my MIL an annual subscription to Quiltfolk magazine. Every year I print out the email I receive saying they’ve renewed and cut out the cute quilty header and put it in an envelope or otherwise wrap it.  
     
   \[图片省略\]QuiltFolkBookmark02576×284 42.6 KB  
     
   This year I am in possession of some borrowed dies and embossing folders including these quilt-related ones\! So I made a bookmark instead.  
     
   \[图片省略\]QuiltFolkBookmark01336×576 41.3 KB  
     
   We’ve ordered and special issue that is on the way, so I’ll put the bookmark in it then wrap that.

2. **发言者 2**（回复第 1 条）：That’s an awesome idea for a gift subscription\! And an adorable bookmark.

3. **发言者 3**（回复第 1 条）：I love the idea of coordinating your card to the giftcard and this bookmark is too cute\!

4. **发言者 1**（回复第 1 条）：Thanks, friends\!

5. **发言者 4**（回复第 1 条）：I love this idea\! This way you have something nice and useful to wrap up and give on the day. I like subscriptions as a gift too, that way you have something to look forward to all year.

6. **发言者 1**（回复第 5 条）：Thanks\! And this subscription is kind of expensive, so something a lot of people would not get for themselves. Plus, like a lot of older people she has everything she needs and just about anything she wants, so gifts are difficult to think of.

7. **发言者 5**（回复第 1 条）：So cool\!\!\!  
     
   Love this

8. **发言者 1**（回复第 7 条）：Aw, thank you\!

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：招募几个内测用户免费使用 Claude Pro，需要的报名，网址：\[链接隐去\]

2. **发言者 2**：这想法不错啊，网费是怎么算的，报名内测

3. **发言者 1**：发言者 2 欢迎试用，网费可以按小时计费，在页面上联系管理员即可

4. **发言者 3**：我去网吧玩游戏的喂  不是去干活的 本末倒置了

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Blurry HDR background in final render vs. viewport preview  
     
   Hi everyone,  
     
   When I render an image in Blender, the HDR background comes out noticeably blurry, whereas in the viewport preview it looks sharper / higher resolution. The HDR file itself is HD \(~8 MB\).  
     
   Which settings should I check or adjust?  
     
   thank you  
     
   my world settings attached  
     
   \[图片省略\]Screenshot\_11831×1252 338 KB

2. **发言者 2**（回复第 1 条）：Change the mapping location\(Z axis\) to 0cm from 5cm. If its still blurry then get more higher quality HDRIs. If that still doesn’t work, then it has to do with  the “light paths” or “texture coordinate” nodes.

3. **发言者 1**（回复第 2 条）：thank you, but then why in the preview it is not blurry?  
     
   I think it has to do with the denoise. But how to avoid to denoise it?

4. **发言者 1**（引用未收录发言）：thank you, but I am honest: I prefer to avoid double passages - I hope there will be a solution. Why in preview is that ok? It has no sense

5. **发言者 3**（回复第 4 条）：Can you show images of the background in viewport and render? That could help see the problem.

6. **发言者 1**（回复第 5 条）：of course. Two are from viewport, one is the rendered  
     
   \[图片省略\]render2560×1600 2.44 MB  
     
   \[图片省略\]viewport21149×982 1.01 MB  
     
   \[图片省略\]viewport1568×1013 1.2 MB

7. **发言者 3**（回复第 6 条）：OK, this is most definitely a resolution problem, I can see the pixels.  
     
   These settings are the only thing I know that can cause a lower resolution at render than in the viewport.  
     
   \[图片省略\]resolution336×632 31.7 KB

8. **发言者 1**（回复第 1 条）：genious…\!\! You made it. Neither AI or Italian Forum guessed it. Thank you so so so much &lt;3  
     
   My texture resoluzion was set in 1024. Which is the suggested one?

9. **发言者 3**（回复第 8 条）：If your scene renders without issue, I suggest no limit. These simplify setting are something you use only if your scene is too heavy and won’t render.  
     
   Or are you asking about what resolution the background should have? It’s the biggest texture in the scene, so don’t be afraid of going high quality, a 4k background is reasonable, or even higher if it fits in memory.

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：A new game im making  
     
   Hi\! This is umbilla, a fast paced 2d action roguelike platformer with movement from ultrakill and art inspired by dr nowhere.  
     
       
   You might know me from my weird dog game from before but i hav cancelled that project cuz it was sorta undoable. Then i got an idea for this and made this prototype in inder 2 days \(the vid is outdated, since then i added coyote time, jump buffer, the ability do walljump farther if u dash into a wall etc…\). I hope you like it :grinning\_face\_with\_smiling\_eyes:

### 讨论 25

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：塞钱箱

2. **发言者 2**：偷五百  
     
   现在你有500负资产了  
     
   你想把他用在什么地方？

3. **发言者 3**：放入 从魔理沙家获取到的 浅紫色胖次

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Systemd - Service Hardening vs Containers  
     
   Discuss  
   With all the AI-based hacking that is occurring recently, I started to spend time improving the security posture of my Yunohost instance at home. The first thing I did was remove access to all apps on my instance from the public internet, and replace it with a Tailscale network, by removing port-forwards from my firewall into my Yunohost.  
     
   The second thing I did was have my LLM run a security audit of the Yunohost apps I have installed. It gave me a list of a few more security-related flags I could add my Systemd services definitions to reduce permissions. Rather that restricting permissions, I cold remove all permissions and grant only what is necessary – that is what a container’s perspective. I believe Systemd has some container-management now.  
     
   Is anyone else here interested in having their Yunohost apps installed into a Systemd-managed container, rather than a hardened Systemd service? I’m not a security expert, so I don’t know all attack vectors, but it seems like a better security choice to me.

2. **发言者 1**（回复第 1 条）：Actually, I think there’s a lot more to the security story than just service hardening. I’ll work on an essay that considers the whole picture and share it here.

3. **发言者 2**（回复第 1 条）：Please, if you find an important security issue: send a mail to the Security team \| Yunohost instead of publish here

### 讨论 27

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How do you keep a kayak setup simple and still enjoy the water?  
     
   I’ve been thinking about picking up a basic kayak for flat water and slow rivers, mostly for quiet mornings and short paddles on my own. I already own a Tundra and would just strap it on the roof, so the boat itself matters more than any trailer. What I’m unsure about is how much of the extra gear is actually needed versus how much is just nice to have. The paddles seem to vary so much in weight and length, and I don’t want to buy twice. I’m also wondering whether a sit-on-top or sit-in makes more sense for calm water and occasional wet exits, since I’m a beginner. I’m not looking for anything fancy, just something that works without turning into a project. For those paddling the same kind of sheltered water, what setup has stayed practical for you?

2. **发言者 2**（回复第 1 条）：\[某参与者\] ?

3. **发言者 2**（回复第 1 条）：By the way I love cayaking. Guess who is the chicken on the pic  
     
   \[图片省略\]IMG\_11091920×1283 871 KB

4. **发言者 3**（回复第 1 条）：If you intend taking it out in the cold weather, can I suggest not having a small fire to keep warm. It sank. I’ve now found to my cost that…  
     
   “You can not have your kayak and heat it”

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Objections to .php application being published on ICANN site

2. **发言者 2**（回复第 1 条）：I don't understand, would it not be majorly illegal in a trademark sense to give control of the .php TLD to anyone other than the organization which controls PHP?

3. **发言者 3**（回复第 2 条）：because usa is a failed state and it's culture sips into the whole world.

4. **发言者 4**（回复第 2 条）：That was my first thought too, but I couldn't immediately find a trademark registration for PHP.

5. **发言者 5**（回复第 2 条）：Depends where the nameserver is located and the trademark legislation of the respective country

6. **发言者 6**（回复第 1 条）：ICANN gave \`.amazon\` to Bezos, so I expect it's fine if the one making most buck on \`.php\` will get that TLD anyway.

7. **发言者 7**（回复第 4 条）：A registration isn't fully required for trademark rights. Nevertheless even a registered trademark doesn't prevent non competition from using the same name for another purpose.

8. **发言者 8**（回复第 1 条）：It's inane that two applications this evil are even considered by ICANN. They don't have Google?

9. **发言者 9**（回复第 6 条）：How is that even remotely comparable? Amazon is a registered trademark owned by the company which got the gTLD. It's most certainly not about who makes the most money. Google has also had .fly since 2014, I don't think they're running very many airlines.

10. **发言者 10**（回复第 9 条）：The Amazon case is instructive because it shows how ICANN has a USA-centric view of the relative importance of money and intellectual property, compared to people and the places they live.  
     
   Google owns a leading airfare data business \[链接隐去\]  
   \(I wonder if it’s still written in Common Lisp.\)

### 讨论 29

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

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How do you sell stuff?  
     
   When it comes to selling stuff, the first place that people might think of here in Slovakia or Czechia is a site called Bazoš, where I used to sell things that still hold some value.  
     
   Since I didn’t get much luck selling there, especially camera gear, I prefer to sell or trade-in on a site like MPB, since they cover the shipping costs. The money I get is much lower, but it’s also a lot easier, almost guaranteed sell. I’ve had stuff sitting on Bazoš for months with barely anyone contacting me. The few people that did were usually not seriously interested.  
     
   However, I’ve also got some gaming merchandise that I no longer want \(it’s taking up space too\) and I’m doubting that anyone would be interested in it on Bazoš \(the game is barely known here AFAIK\), so I was thinking about putting it on Ebay to get a decent reach. Does anyone have experience with it? What other site would you recommend me trying?

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Riffsheet – your coding agent breaks down a short video shot by shot

### 讨论 32

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：24 年的 B200 比 23 年的 H200 算力高两倍  
   25 年的 B300 比 24 年的 B200 算力高 1.6 倍  
   26 年的 R100 比 25 年的旗舰 算力高 3 倍  比三年前的 H200 理论算力要高 18～25 倍了  
     
   那再过两年，花大价钱部署的 H200 B200 直接淘汰的级别，卖二手都不一定有人接，卖出去可能也是骨折骨灰价格  
     
   或者说过两三年，这些卡会掉价进入普通用户市场  
     
   到时候不追求最新模型的普通用户，就能本地跑当前版本模型的无限 token  
     
   大家怎么看，预计无限 token 要多久进入家家户户

2. **发言者 1**：后面是不是 NVIDIA 越赚钱，迭代越快，其他人死的越快

3. **发言者 2**：r100 比起 h200 要高这么多吗  
   怪不得不要了

4. **发言者 3**：即便是 6 年前上市的，算力是 H200 1/3 的 A100（如果加上稀疏特性，A100 的实际算力可能比不过 H200 的 1/10）  
   云上 GPU 的价格大概 8 卡一个月也能租大几万出去，单卡二手差不多 5-8 万左右  
     
   所以现在担心两三年后 H200 淘汰，有点想的太远了。除非说未来出现什么模型，能力能达到当前 opus5 的水平，然后只有 100-200B 的参数量，那才会出现无限 token 走进千家万户

5. **发言者 4**：无限 token？？？  
   你当这些卡白菜价啊。这么多人买个云服务器都扣扣索索。手机套餐都嫌弃贵，就敢想无限 token 了。除非有便宜效果好的卡。

6. **发言者 5**：发言者 3 非常同意。实际上生产中在很多缺卡的地区，T4 都还有人在大规模使用，查了一下这已经是 2018 年的卡了，现在仍然没有到想要用多少就能有多少的地步。  
     
   另外 B200 HGX 数据中心版本是 1000W，这不太是普通用户家里能放的，普通人家里可能最多能放个 RTX PRO 产品线。其实现在如果不是一个非常急性子的人，很多 AI 盒子或者 mac studio 这些已经足够让你满血 qwen3.8 27b 自由了，如果习惯多个 agent 同时上而且必须要快的话，我猜现在这么缺 GPU，我个人估计还得三到五年才能迭代出一个 decode 足够快的硬件 \+ 一个 coding 性能没什么大缺点的小模型（qwen 已经足够好，但就是原版 thinking 废话太多了）

7. **发言者 6**：现在舍不得投入的后面应该也没机会买更先进的吧?

8. **发言者 7**：行业高速增长的时候这都不是事儿，二手乃至 n 手的硬件都有自己的生态。

9. **发言者 8**：算力只是不如新的，又不是归零了，为啥搞得和无价值破烂一样恨不得马上脱手...  
   该用一样用，又没啥影响。  
   而且只说用途的话，要用卡的地方太多了，就算不用来做 LLM 相关的训练或推理，传统音视频处理、非 LLM 推理之类的一样大把场景能用。

10. **发言者 1**：发言者 8   
   “高盛 2026 年的研究指出，AI 加速芯片通常按约 4—6 年的使用寿命估计，但经济性淘汰可能早于物理损坏。“  
   “路透社 2026 年 10 月 1 日的报道显示，部分贷款机构对 GPU 资产采取更加保守的 3—4 年折旧或估值假设”  
   \[链接隐去\]  
     
   \[链接隐去\]  
     
   旧卡会有剩余价值，但是价值没有想象的大，一个是物理使用寿命出厂设计就不是很久，一个是新的产品的竞争力差距。再过两年当时的 H100 物理寿命就快到期了。而且如果入手后，前三年没有回本，后续应该很难靠现成的卡回本了，因为价值曲线应该是下滑的

11. **发言者 1**：发言者 4 流量套餐和这个完全不是一回事，流量必须有基站，这个普通人是不可能架设的，但是 token 有卡就有机会自己架设

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Positive thumbs up  
     
   I guess one of my sons really is paying attention. He told me yesterday he had a coworker that wears lots of sweaters. Somehow the conversation came around to “my mother knits” and she is actually pretty good. \(Not how I would describe it\). He then said I think if you picked out a pattern &amp; yarn she would knit for you. Uh, wrong. She could be waiting for a long time. I suggested she should learn. I could point her in right direction. He said, she is too busy. Hey at least I got a “pat on the back” and my knitting is not going unnoticed.

2. **发言者 2**（回复第 1 条）：Don’t you love it when people volunteer your time for you??  You might educate your son a bit about the time it takes to knit something, and that it has to be something you WANT to knit\!  
     
   But it IS nice that he obviously appreciates your skills\!

3. **发言者 3**（回复第 1 条）：Oh it’s so nice your son was showing you off\!  
     
   And separately… oh dear, he doesn’t know how much time and effort it takes to make a sweater.  
     
   People who don’t knit do seem to have a tendency to offer knitters’ time and skill for free.  I’ve had suggestions i could go into business because people would buy a sweater for £30 or £40\!\! Ha ha.  More like £3000 or £4000 plus yarn costs don’t you think?

4. **发言者 4**（回复第 1 条）：Nice to know that your son appreciates what you do. He just doesn’t realize the time and effort involved\! Maybe you could teach him to knit?  
     
   A coworker once commented to me and some knitter friends that it would be terrific to be able to knit if only because of the money one would save. We laughed.

5. **发言者 5**（回复第 3 条）：I’ve had the same comment made to me several times.  People just don’t realize the time it takes to knit a sweater.  And they think all yarn comes from WalMart or Michael’s.   If I put a price on the time it took, and the cost of the yarn, to knit a sweater, their eyes would bulge.

6. **发言者 2**（回复第 5 条）：I usually just tell them how much the yarn cost, and that stops them cold.  Sometimes I also mention the time it took, although I don’t really track that.

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Wild Brute – 3D Character  
     
   Hi everyone\!  
     
   Here’s my finished 3D model of Wild Brute, a brute-style character.  
     
   He has a huge, muscular build, grey skin, pointed ears, glowing yellow eyes and fangs. His outfit includes a torn blue loincloth with a white buckle belt, blue studded wrist cuffs and blue ankle wraps.  
     
   The character was modeled, textured and rigged in Blender 4.2.3, using Rigify Legacy. The rig does not include facial bones. The model uses a toon shader with an outline.  
     
   I’m also including the clay and wireframe views for anyone interested in the topology. Tomyris, another character of mine, appears next to him in a couple of images just to show the height difference.  
     
   This was a personal project, not a commission.  
     
   Thanks for checking out my work\! I’m open to feedback and hope you like it\!  
     
   \[图片省略\]Wild\_Burte\_011920×1080 1.3 MB  
     
   \[图片省略\]Wild\_Burte\_061920×1080 1.41 MB  
     
   \[图片省略\]Wild\_Burte\_051920×1080 1.47 MB  
     
   \[图片省略\]Wild\_Burte\_041920×1080 2.15 MB  
     
   \[图片省略\]Wild\_Burte\_031920×1080 1.67 MB  
     
   \[图片省略\]Wild\_Burte\_021920×1080 1.5 MB

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Glance: where is the glance.yml file?  
     
   What app is this about, and its version: Glance, 0.8.8~ynh1  
     
   What YunoHost version are you running: 12.1.43  
     
   What type of hardware are you using: VPS bought online  
     
   Describe your issue  
   I need to edit the glance.yml file from terminal, but I can’t find it. There is only one file \(“glance”\) inside /var/www/glance  
     
   Where can I find the yml directory?  
     
   Thanks  
     
   Share relevant logs or error messages  
   This happens if I run that only file:  
     
   ./glance  
     
   parsing config: reading glance.yml: open glance.yml: no such file or directory

2. **发言者 2**（回复第 1 条）：it should be  
     
   /home/\[链接隐去\]

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Marc Marquez  
     
   A true great announced his intention to retire after this coming weekend’s race. It will be a big event I think\!  
     
       
         \[图片省略\]  
     
         BBC Sport  
       
     
       
       \[图片省略\]  
     
   MotoGP: Marc Marquez to retire after final race of 2026 season  
     
     MotoGP champion Marc Marquez says he will retire - days after clinching a record-equalling eighth title.

2. **发言者 2**（回复第 1 条）：He’ll be sorely missed.  
     
   It wasn’t the same without him, when he was injured.  
     
   I just hope that Pedro picks the sport up, where Marc leaves it.

### 讨论 37

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

### 讨论 38

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Help finding log files for darktable  
     
   I am having an issue with Windows 11 install of Darktable 5.7 and I want to share a log file.  
     
   I was expecting to find it by C:\\Users\\username\\AppData\\Local\\Microsoft\\Windows\\INetCache\\darktable-dev5.7  
     
   But I don’t see INETCACHE…please any advice?  
     
   \[图片省略\]image992×916 44.3 KB

2. **发言者 2**（回复第 1 条）：Can you share which document said you could find it there? It’s out of date and we need to correct it.  
     
   Thanks. I encountered this when I was a new user but didn’t fix it.

3. **发言者 3**（回复第 1 条）：Read the FAQ…

4. **发言者 4**（回复第 1 条）：faq \| darktable that FAQ Entry is admittedly confusing.  
     
   \[图片省略\]grafik840×543 35.9 KB  
     
   The important part are the two last lines. We are not keeping the docs for 4.8 around anymore either, so I removed that first part that threw you off 发言者 1

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Main chip heats  
     
   Hello. I found my old R3 today. I lost the cable, and used it off a 9V battery. Now, when plugged in via the battery, the main chip heats up very warm in 3 seconds. The board has only a big UNO text so it isn't official.

2. **发言者 2**（回复第 1 条）：Based on the limited information provided, it sounds like you might have hooked up the battery incorrectly. If that's so, you likely have an ex-Arduino. Sorry for your loss.

3. **发言者 3**（回复第 1 条）：How exactly did you attach the battery to the board ?

4. **发言者 1**（回复第 1 条）：By the adapter

5. **发言者 3**（回复第 4 条）：Do you mean the barrel jack ?  
     
   If so, then are you sure that you used the correct polarity ?

6. **发言者 4**（回复第 5 条）：\[图片省略\] 发言者 3:  
     
   If so, then are you sure that you used the correct polarity ?  
     
   If the "UNO" is anything like the official schematic \(which of course we don't know\) : \[链接隐去\] \(See top middle marked X1\) then the barrel jack input has a diode in the path for reverse polarity protection.

7. **发言者 5**（回复第 5 条）：You may have used a Alternating Current battery and not Direct Current

8. **发言者 5**（回复第 2 条）：That is impossible as all Arduinos have short circuit prevention and overvoltage prevention.

9. **发言者 6**（回复第 8 条）：\[图片省略\] 发言者 5:  
     
   Arduinos  
     
   The board has only a big UNO text so it isn't official.  
     
   OP's board is not an Arduino.

10. **发言者 5**（回复第 9 条）：Copied boards should have the same functions. Cheaper because its unofficial.

11. **发言者 7**（回复第 10 条）：\[图片省略\] 发言者 5:  
     
   all Arduinos have short circuit prevention and overvoltage prevention  
     
   Original Uno R3 doesn't have either. And reverse polarity protection is only for barrel, not for VIN.  
     
   \[图片省略\]image972×355 24.1 KB  
     
   \[图片省略\] 发言者 5:  
     
   Copied boards should have the same functions.  
     
   Should... :grinning\_face\_with\_smiling\_eyes:

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: CostPerToken – Rank LLM API providers by your monthly bill

### 讨论 41

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：各位 网友，黑五期间我们 Proxy001 这边上了一波活动。做数据采集、跨境电商、SEO 监控、广告验证或者社媒矩阵的朋友，可以先白嫖测试，跑通自己的业务再考虑付费。  
     
   \#\# 先说福利，一共两件事  
     
   \*\*1. 注册即送 500M 动态流量\*\*  
   新用户注册后自动到账，住宅动态 IP 可直接跑测试，不用先充值。  
     
   \*\*2. 额外放出 4 个 1G 流量 CDK 兑换码，先到先得，兑完即止：\*\*  
     
   - CDK 1：\[TLI0OUHH28OL4GYLGUDDI1KHV7EDGFDX\]  
   - CDK 2：\[2VWCRJOIVW14W0UIPPN48M535IUJ53KA\]  
   - CDK 3：\[EJ2C4VPMA6PL80JPGW231YBA8TF67OAR\]  
   - CDK 4：\[ZISCUN0A40Z2I6S91MMNVAJT7GK2G43N\]  
     
   兑换方式：登录后进入控制台的 CDK/兑换码入口输入即可。  
     
   \*\*没抢到 CDK 的朋友也不用着急\*\*，可以通过 某社区 联系我们，有任何问题都可以协助处理：  
   \[链接隐去\]  
     
   \#\# 产品简单介绍（官方参数，供参考）  
     
   - \*\*IP 池规模\*\*：100M\+ 住宅 / 数据中心 / 移动 IP，覆盖 200\+ 国家和地区，支持国家、州、城市级定向  
   - \*\*动态住宅代理\*\*：自动轮换 \+ 粘性会话（最长 180 分钟），全协议支持、无限并发  
   - \*\*静态住宅代理\*\*：真实 ISP 家庭 IP，独享不共享，$2.9/IP/月起，不限流量  
   - \*\*静态数据中心代理\*\*：$1.9/IP/月起，适合稳定长连接场景  
   - \*\*无限住宅套餐\*\*：$35/天，不限流量，支持视频平台类高带宽场景  
   - \*\*接入方式\*\*：提供 API / SDK，支持 Python、Node.js、Puppeteer、Selenium，文档和示例齐全  
   - \*\*稳定性与服务\*\*：官方标称 99.8% 在线率、平均响应 &lt;0.3s；7×24 小时客服，支持开具发票  
     
   \#\# 适合哪些场景  
     
   电商比价与竞品监控、网页数据采集、搜索引擎排名监控、广告投放验证、AI 训练数据采集、多账号社媒矩阵运营。  
     
   官网地址（注册可走这个链接）：  
   \[链接隐去\]  
     
   黑五期间官网还有最高 \+500GB 赠送流量的活动，具体以官网结算页为准。  
     
   有接入或地区资源方面的问题，欢迎评论区留言或私信，看到都会回。建议大家先拿 500M 跑一轮自己的业务，好用再回来。

### 讨论 42

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

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Die 某社区 Richter \[Sammelthread\]  
     
   Huhu, wir probieren uns aktuell in ein paar neuen Shows aus, unter anderem „某社区 Richter“, da gab es bisher zwei Folgen und wir haben großen Spaß daran. Es waren auch nicht die letzten beiden Ausgaben :wink: Deswegen, falls ihr auf 某社区 spannenden Posts begegnet \(es müssen nicht BIDA Stories sein, Hauptsache sie sind unterhaltsam, meinungsstark und gut zum Diskutieren\), dann haut hier gerne die Links rein und wir schauen uns das für die nächsten Folgen an, vielleicht ist eure Einreichung dann Teil der Sendung :slight\_smile:  
     
   Danki und viel Spaß beim Programm :hammer:

2. **发言者 2**（回复第 1 条）：Schon was älter, aber einer meiner Lieblingsbeiträge, die ich bisher auf 某社区 gefunden habe:  
     
   Ich habe deine Bewerbung abgelehnt, weil sie SCHEIẞE war

3. **发言者 3**（回复第 1 条）：\[链接隐去\]

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：小肥你知道吗\(\`ε´ \)真正的有钱人去吃汉堡喝可乐，那用的都是真正的红木做的吸管盒。只要在镀金的按压手柄上按一下，就能按出来一根银吸管

2. **发言者 2**：你知道吗，真正有钱人喝蜜雪冰城从来不用优惠券，吃肯德基麦当劳从来不点套餐，只点单品\( ﾟдﾟ\)\( ﾟдﾟ\)\( ﾟдﾟ\)

3. **发言者 3**：果然是有钱人，快餐饮料还带吸管\(￣皿￣\)

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Dyna xv1 and Lyra on vertere arm  
     
   Is there someone who auditioned the dyna xv1 or the Lyra’s on the vertere arm?  
     
   \[某参与者\] i believe here your opinion will matter a lot :grin:

2. **发言者 2**（回复第 1 条）：\[图片省略\]image1600×716 68.5 KB  
     
   Superb pairing \(XVS1\) rhythmic, musical, compelling listening.

3. **发言者 1**（回复第 2 条）：Fantastic\!\!\!

4. **发言者 3**（回复第 2 条）：The depth in the wood is beautiful. Lovely setup\!

5. **发言者 2**（回复第 1 条）：发言者 3 发言者 1 thank you guys, I also have the original Vertere SG PSU which could be configured for the Xerxes.  Unfortunately the more recent Vertere PSUs can’t, but I have to say it’s the aesthetics of the Xerxes above anything else which stops me from upgrading to a Vertere deck.

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：The race for Officve: an open-source office suite in one month

2. **发言者 2**（回复第 1 条）：How will Officve, when complete, compare to libreoffice/openoffice?

3. **发言者 3**（回复第 1 条）：Office CVE is a great name for a slopware product. It could also have a premium edition named Office RCE.

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：GZ Santa 2026  
     
   Puisqu'on est jamais mieux servi que par soit même, je m'y recolle cette année \!  
     
   Décembre approche à grands pas, la place de ma ville arbore un grand sapin décoré, et toujours pas de secret santa ici \! Il est grand temps d'y remédier \!  
     
   Vous connaissez la musique, les personnes intéressées m'indiquent ici qu'elles veulent participer, puis m'envoient par MP les infos listées ci-dessous.  
     
   C'est toujours un chouette moment alors n'hésitez pas à vous lancer même si vous ne l'avez encore jamais fait \!  
     
   Sur 某社区, on ne se contente pas de râler de manière qui se respecte, de refaire le monde et de critiquer les IA pour mieux les utiliser par ailleurs \(hum hum\), on a aussi l'esprit de Noël \!:santa\_claus::christmas\_tree::wrapped\_gift:  
     
   Donc, comme disait le poète "I'm waiting for you"  
     
   Nom et Prénom  
     
   Adresse  
     
   Numéro de tel  
     
   Taille de teeshirt.  
     
   C’est parti\!\!  
     
   Participant  
   Infos  
   Envoyé  
   Recu  
     
   发言者 2  
   :white\_check\_mark:  
     
   发言者 3  
   :white\_check\_mark:  
     
   发言者 4  
     
   发言者 5  
   :white\_check\_mark:  
     
   发言者 6  
   :white\_check\_mark:  
     
   发言者 8  
   :white\_check\_mark:  
     
   发言者 9  
     
   某参与者  
     
   某参与者  
     
   某参与者  
     
   某参与者  
   :white\_check\_mark:  
     
   某参与者  
     
   某参与者  
   :white\_check\_mark:  
     
   某参与者

2. **发言者 2**（回复第 1 条）：Hop j’en suis :smiling\_face\_with\_three\_hearts:

3. **发言者 3**（回复第 1 条）：I'm in \!

4. **发言者 4**（回复第 1 条）：Je n'y avais pas encore pensé, mais IN biensur \!

5. **发言者 5**（回复第 1 条）：j'en suis \!

6. **发言者 5**（回复第 1 条）：la base de donnée à revendre depuis le temps \! c'est tres RGPD compliant ^^

7. **发言者 6**（回复第 1 条）：Iiiiiiiiiiin I am

8. **发言者 5**（回复第 1 条）：Alors je voudrais l'organiser au taff.  
     
   Mais existe t il un endroit ou inserer les participants anonyme,  
     
   puis tirage au sort devant tout le monde.  
     
   Et que seule l organisateur connaisse sans pouvoir modifier

9. **发言者 7**（回复第 8 条）：\[图片省略\] 发言者 5:  
     
   tirage au sort devant tout le monde.  
     
   C'est quoi le but du tirage publique si personne ne sait qui est tiré au sort ?  
     
   \(Si c'est juste une excuse pour boire un coup ensemble, y'a sûrement moyen de trouver un autre prétexte\)

10. **发言者 8**（回复第 1 条）：J'en suis aussi cette année, merci pour l'initiative :face\_blowing\_a\_kiss:

11. **发言者 9**（回复第 1 条）：Moi j'aime bien recevoir des petits cadeaux non prévu chaque année, i'am in \\o/

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某些男娘虽然貌美如花骚得出水，但论心理素质比我还硬汉\(\|\|\|ﾟДﾟ\)  
     
   ——观男娘戴负数贞操锁有感  
     
   什么叫你能把牛子用锁顶回肚子里几厘米，真上刑啊哥们

2. **发言者 2**：缩阳术

3. **发言者 3**：\(　ﾟ 3ﾟ\)

4. **发言者 1**：不要一边拿扳手大力拧六角螺丝，一边说什么“戴久了雌堕骚几把就再也硬不起来了”这种话啊！  
     
   太吓人了！\(\|\|\|ﾟДﾟ\)

5. **发言者 3**（回复第 4 条）：\[引用第 4 条\]  
     
   也不是很吓人，这种拿内六角上螺丝的反而是最好逃课的\(　ﾟ 3ﾟ\)

6. **发言者 4**：小肥好奇带贞操锁的其实最没有贞操了吧\(つд⊂\)

7. **发言者 5**：只是没有聚吧了，又不是没有睾丸人

8. **发言者 6**（回复第 6 条）：\[引用第 6 条\]  
     
   草\(\`ヮ´ \)还真是

9. **发言者 7**：我小时候在哪本书里来着？儒林外史？看见过这个情节，某地方官无意间看见有个人去跟一群尼姑取乐，于是去查他，把人喊来以后发现这个人没有🐔，遂作罢  
     
   第二次他反应过来了，找来一条狗，在他“批”上抹了香油，叫狗来舔，🐔一下就伸出来了\( ﾟ∀。\)然后给这个人判了个什么刑来着，想不起来

10. **发言者 8**：带锁男娘是真的色\( ´ρ\`\)

11. **发言者 9**（回复第 9 条）：\[引用第 9 条\]  
     
   猎奇

<!-- samples:end -->

