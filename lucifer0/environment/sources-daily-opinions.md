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

<!-- intake-request:intake-52238c8221b746cb98bc887efbbfbedd -->
<!-- samples:start -->

采集时间：2026-11-25 00:03:18（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：不知道是不是切换频繁，还是有其他人登录过的原因，今天突然就告诉我账号封禁了。  
     
   我换了个号，结果一直要我 Authenticator 的验证码，我输了又说验证码错误，就是过不了。  
     
   即使通过其他方式过了两步验证，但是想把两步验证或者动态验证码关掉的话，就还是会回到登录的页面，叫你输动态验证码，却不给二维码给你扫。。。我就是动态验证码登不了才想关掉的呀，又叫我输动态验证码，晕了。  
     
   问了下 Gemini，它说是因为设备太新还没信任，得用上 7 天之后，才能看看能不能改。。  
     
   反正这个动态验证码真是太有毒了，明明之前就是通过它进去的现在却老说我验证码错误，是不是有别人用动态验证码登录过我这的就失效了？  
     
   太烦了，只能等明天看看账号申诉结果了。  
     
   你们有没有遇到过这种情况？

2. **发言者 2**：你是薅羊毛了？

3. **发言者 3**：谷歌对老号感觉容忍度是可以的，你是新号？

4. **发言者 4**：对于老号来说,只要不是新设备登入你 IP 全球乱跳都没问题

### 讨论 2

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：General measurements discussion for GraphWorks visualizer  
     
   Share and discuss your impressions of different measurements in the new GraphWorks visualizer tool, whether you’ve actually listened to the headphones or not \(which is normally taboo on most audiophile forums\).  
     
   I have not listened to most of the headphones in this tool btw. So most of my impressions will be based on the 5128 graphs, and sometimes some virtual listening. So they should be taken with a grain of salt.

### 讨论 3

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

### 讨论 4

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Let's Meet in the Middle

2. **发言者 2**（回复第 1 条）：I always have \`whereami\` aliased to \`hostname\`.

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Need help finding model for mysterious 3.2 inch touchscreen display  
     
   I've picked up a 3.2 inch touchscreen module from a friend \(they got it in a bulk lot with no identification\) wanting to build a photo frame type project, but found myself stuck as what driver chip it could be using, I'm posting hoping someone could point me to a driver name or arduino library. pictures below  
     
   \[图片省略\]TFT\_back1920×1201 966 KB  
     
   \[图片省略\]TFT\_front1790×2724 1.43 MB

2. **发言者 1**（引用未收录发言）：ah thanks\! never thought to do that but that looks to be the one, I'll test it out and put a result here in a bit.

3. **发言者 1**（回复第 2 条）：got it working now, thanks\! just used the UTFT 320x240 demo with the line UTFT myGLCD\(SSD1289\_8,A1,A2,A0,A3\); pasted in where the default one was and it works\!

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Material 3 for Godot  
     
   I created a port for material 3 to be used in Godot.  I personally love the modern style of websites and apps, but video game UI always seems to fall by the wayside.  So I made this a while back and decided to upload to github and share.  
     
   Hope you guys find it helpful,  
     
       
     
         \[链接隐去\]  
       
     
       
         
     \[图片省略\]  
     
     GitHub - 发言者 1/godot\_material3  
     
       Contribute to 发言者 1/godot\_material3 development by creating an account on GitHub.

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Daydream – AI video editor for your agents

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Search Improvements  
     
   I don’t know if there has been a post about it although I got a replay on the bug reports thread about some speed optimization being done which I have noticed and is awesome, but I also wanted to point out that it seems that now in searching, all non JLTP results are now followed by common results first, rather than mixing them in by character length order only, and this change is much appreciated\! Although it does seem sometimes that a ‘common’ marked result appears a row or two after the block of ‘common’ results \(example searching for 極 shows 極寒 not together with all the other common items.

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Blender v4.5.17 LTS v5.2.5 LTS v5.4.0 OpenPBR Patch Releases  
     
   on the releases page v4.5.17 LTS, v5.2.5 LTS, at the WIP OpenPBR page \[near bottom\] the newest v5.4.0 OpenPBR patch build are there for downloading.  
     
   on the release notes page one can read about the changes for every release.  
     
   happy :blender\_logo\_64\_png:ing\!

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 女孩兒會用潤唇膏嗎？  
     
   如題，  
   大家午安啊肥肥來了！  
     
   最近冬天比較冷，  
   常常舔嘴唇就會乾裂，  
     
   這時候我都會用小護士。  
     
   女孩兒們會用潤唇膏嗎？  
   大多什麼時候用？  
   一天會補幾次呢？  
     
   一起來聊聊！

2. **发言者 2**（回复第 1 条）：炸豬油

3. **发言者 1**（回复第 1 条）：那個現在比護唇膏還貴

4. **发言者 3**（回复第 1 条）：乾了就用

5. **发言者 4**（回复第 1 条）：照三餐用  無法忍受嘴唇乾

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：上早八，老师要交名单  
     
   ：班长交下名单哈？班长呢？班长也没来啊？  
     
   ：那一班还有别的班干部吗？团支书来了吗？  
     
   ：团支书也没来啊？那学习委员呢？  
     
   ：学习委员也没来啊？？那只有这三个是主要班干部吗，，副班呢？  
     
   ：副班也没来啊？？？  
     
   \( ﾟ∀。\)\( ﾟ∀。\)\( ﾟ∀。\)

2. **发言者 1**：都不要笑了\( \`д´\)\( \`д´\)\( \`д´\)σ这是一班的，耻辱！

3. **发言者 2**：\(\`ヮ´ \)σ\`∀´\)ﾟ∀ﾟ\)σ

4. **发言者 3**：σ\`∀´\)

5. **发言者 4**：\(\`ヮ´ \)σ\`∀´\) ﾟ∀ﾟ\)σ

6. **发言者 5**：\(\`ヮ´ \)σ\`∀´\) ﾟ∀ﾟ\)σ

7. **发言者 6**：\(\`ヮ´ \)σ\`∀´\) ﾟ∀ﾟ\)σ

8. **发言者 7**：看来真是人民的班干部\(\`ヮ´ \)σ\`∀´\) ﾟ∀ﾟ\)σ颇具群众作风啊

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Mise à jour automatique des entrées DNS avec lebureau.coop  
     
   Est-ce que vous savez si on peut utiliser lebureau.coop avec les fonctions automatiques de mise à jour des entrées DNS de yunohost ?

2. **发言者 2**（回复第 1 条）：Pas encore, mais il y a eu du travail dessus le week end dernier.  
     
   Le code dns-lexicon a été adapté, mais je crois que la pull request n’est pas encore transmise:  
     
   Comparing dns-lexicon:main...arthru:lebureau · dns-lexicon/dns-lexicon · GitHub  
     
   Une fois proposée et intégrée, ce sera assez rapide.

3. **发言者 1**（回复第 1 条）：C’est magnifique merci.  
     
   Tu as une idée de où est-ce que ce sera annoncé ?

4. **发言者 2**（回复第 1 条）：A minima dans le changelog de la version qui intégrera ce travail. Il est possible qu’on en parle dans la catégorie Anouncement aussi

5. **发言者 1**（回复第 1 条）：Merci je vais suivre ça.

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：今天总感觉遇到了不少好兆头，趁这个机会，把自己做了很久的一个个人项目拿出来，想听听大家的意见与反馈，叨扰大家了。  
     
   　　项目名为「星愿遗嘱」，简单来讲，这是一个帮助用户长期记录、保存和传递个人意愿的项目。  
     
   　　项目的创作理念，其实来自一些大家经常开玩笑讲起的话：“如果我哪天死了，请一定帮我删除浏览记录”、“如果我哪天死了，记得帮我告诉某个朋友一些事情”。  
     
   　　我自己也曾经经历过相当严重的心理困境，一度走到了轻生的边缘。当时让我选择继续生活的理由其实很简单：我意识到自己还有很多话没有来得及跟孩子讲，也不希望有一天，自己的想法只能由别人来解释。这个看似微不足道的念想，让我重新有了面对生活的意愿。  
     
   　　从那之后，我就希望自己的经历多少可以帮助到一些有类似困境的人。很多时候，人在情绪中很难看清自己的生活，而那些尚未完成的事情、尚未说出口的话，或许也能成为我们重新审视生活的一个契机。  
     
   　　于是便有了「星愿遗嘱」这个项目。  
     
   　　软件会邀请用户在日常生活中不断记录、修改和完善自己的“遗嘱”，并通过定期打卡刷新自己的“存续状态”。这里的遗嘱并不局限于财产分配，它可以是想对某个人说的话，可以是对一些事情的交代，也可以只是现阶段对自己人生的理解。  
     
   　　对于有长期意愿保存需求的用户，项目也提供实体信件的托管与交付服务。在满足预先约定的存续失效条件并完成必要核实后，平台会通过邮政渠道将信件寄往用户事先验证的指定地址。当然，存续失效并不等同于死亡认定，信件也不必然具备法律意义上的遗嘱效力。  
     
   　　除了这些功能之外，我也花了相当多的时间在项目的美术与交互设计上。随着用户一次次完成打卡，画面中的星空也会逐渐发生变化。我希望用这种方式，让原本有些机械的打卡行为，成为一件能够感受到时间积累的事情。  
     
   　　我其实并不希望用户把写遗嘱当作一件临终时才需要做的事情。人的想法会随着生活不断发生变化，今天在意的事情，几年后或许已经释怀；今天尚未说出口的话，明天或许就有机会亲口告诉对方。  
     
   　　我希望遗嘱不一定是人生的最后一篇文字，它也可以是一篇伴随人生不断修改的文字。  
     
   　　这大概也是我做这个项目时所理解的“向死而生”。  
     
   　　目前项目的基础功能已经基本完备，但距离自己心目中的样子还有相当长的一段路要走。作为一个独立开发者，也很想知道大家对这种产品形态、交互设计，以及存续确认和隐私保护机制有什么看法。  
     
   　　欢迎各位体验、批评，也欢迎提出一些我没有考虑到的问题。测试阶段使用虚构内容即可，不必填写真实的私人意愿。  
     
   　　网页版（PC / iOS / Android）：  
   　　\[链接隐去\]  
     
   　　安卓版（目前采用 WebView 套壳）：  
   　　\[链接隐去\]  
        
   　　感谢各位愿意花时间读到这里。

2. **发言者 2**：1. 没有公证处对接  
   2. 没有律所合作  
   3. 无法证实遗嘱人精神状态  
   = 这个项目 100%死亡 （还不如改成 备忘录 app）

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：AI maskin do not work  
     
   HI, When I try to do AI masking in Dartable 5.6.2 get following error message:  
     
   Objekt mask preparation failed.  
     
   It has worked before.  Any tips of what to do?  
     
   Anders

2. **发言者 2**（回复第 1 条）：My gut tells me it might have something to do with the AI models not being properly initialized. What OS are you on? What does Preferences/AI show? Can you share a screenshot?

3. **发言者 1**（回复第 2 条）：Hi, I.a running Manjaro and attach a screenshot.  
     
   \[图片省略\]Skärmbild från 2026-11-24 11-45-481825×736 41.4 KB

4. **发言者 2**（回复第 1 条）：Mh, others might have more informed suggestions. I’d try deleting darktables cache folder ~/.cache/darktable/. You’ll need to re-download the AI models afterwards.

5. **发言者 1**（回复第 1 条）：~/.cache/darktable/ai was and is now empty. I have tried reinstall Darktable and re-download the AI modules but no succes…

6. **发言者 3**（回复第 1 条）：The same thing happened to me a few weeks ago. I will try to find the thread and link to it here. Short version: In the end, I had to install another module.  
     
   PS - Here it is: Introducing neural restore module – raw denoise, denoise, and upscale - \#205 by 发言者 3

7. **发言者 1**（回复第 1 条）：Thank you, I looked at 发言者 3 comment but I already have Onnx installed and it have been working… I starting to wonder if the problem is in Darktable or some outside access to an AI modell?\!

8. **发言者 2**（回复第 7 条）：darktable’s AI models work exclusively offline. Are you using the appimage? if no, could you try that one?

9. **发言者 1**（回复第 8 条）：I don’t know that program but I,ll look into it. THanks

10. **发言者 2**（回复第 9 条）：I mean simply running the official darktable appimage. It will use the same config folder as your package-manager-installed instance but comes bundled with it’s dependencies.

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Les Clairvoyants \#116 : Secret Wars, Marvel fait sa guerre des mondes  
     
   Article publié sur :			Les Clairvoyants \#116 : Secret Wars, Marvel fait sa guerre des mondes - 某社区.fr  
     
   Épisode 116 : où Fask, Fox et Arkeon spéculent une toute dernière fois sur Avengers: Doomsday, font le focus sur la suite avec Secret Wars, sans oublier un petit coup d'œil sur toutes les dernières news en provenance du Marvel Cinematic Universe...

2. **发言者 2**（回复第 1 条）：Je vous le dis les amis, le "To me my X-Men" du last trailer m’a foutu les poils. Beaucoup trop d’heures passées sur ces comics quand j’étais gamin. Ce qui est très drôle puisque gamin, la phrase existait pas. Déjà parce que je lisais des trads, et a priori la formulation date de… 2013. :smiley:  
     
       
       \[图片省略\]

3. **发言者 2**（引用未收录发言）：Je me suis mal exprimé, je voulais dire que le fait que la phrase devienne "populaire" date de 2013, et la source c’était les occurrences sur le Net via un papier random donc :man\_shrugging: \(et a priori c’était lié a un DA, mais je vais retrouver ça ASAP.\)  
     
   Bon en revanche y’a pas Hawkeye ? Du coup ils vont perdre ?  :grimacing:

4. **发言者 3**（回复第 1 条）：Référence direct au premier épisode de X Men 97, j'imagine, où Cyclope dit exactement "to me, my x-men" dans son oreillette...  
     
   Ce podcast tombe à pic, je suis complètement largué dans le MCU. J'imagine qu'on parle du  Secret Wars de Hickman, que j'avais adoré lire à sa sortie y a déjà une éternité... \(mention spéciale à Battleworld, 1602 et Weirdworld\)

5. **发言者 1**（回复第 4 条）：\[图片省略\] 发言者 3:  
     
   Référence direct au premier épisode de X Men 97, j'imagine, où Cyclope dit exactement "to me, my x-men" dans son oreillette...  
     
   Aussi, oui. :slight\_smile:

### 讨论 16

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

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Horizontal curling in stockinette  
     
   See pattern Easy Vest Knitting Pattern by Liliplet found in Etsy.  \(I don’t know how to post a picture on my desktop\).  I wanted to use up some charcoal Red Heart yarn \(I know this isn’t the best quality but thought it would be a firm drape for a simple loose-fitting pullover\).  The pattern has a 1 row K1 P1 border followed by stockinette.  Mine is curling.  I contacted the author and she said blocking wet would work.  It does not.  I’ve always felt a few rows of rib are needed to anchor from curling.  Any advice?  I really like the easy way pattern looks and is written.  Two pieces, no finishing, simple cap sleeve style.

2. **发言者 1**（引用未收录发言）：Thanks for the reply. It’s just Red Heart Super Saver acrylic which is more like aran weight. I will try that on a narrow piece. I wouldn’t mind picking up stitches and knitting down either. Was sure looking to knitting a mindless project in the car, etc. I need to reorient myself with \[链接隐去\] Not very good with tech stuff and new forums.

3. **发言者 2**（回复第 2 条）：You’re doing just fine. Trying the steam block on a small swatch is a very good idea. Let us know how it goes.

4. **发言者 1**（回复第 3 条）：OK, thanks. Looking forward to knitting something simple rather than cardigans with my own trial and error alterations\!

5. **发言者 3**（引用未收录发言）：If your yarn is heavy, you could try it with a lighter weight in a similar colour.

6. **发言者 4**（回复第 1 条）：Thank you 发言者 3  
     
   I had similar problem, stockinette curls even after I inserted one purl row. Blocking help a bit.  
     
   Just wondering, will top loose stretching on bottom after altering showed in video?

7. **发言者 5**（回复第 6 条）：I don’t think it loses any stretch at all with this method.

8. **发言者 1**（回复第 3 条）：I can never find my original post so I’ll thank you here. \(You’ve helped me before\). I appreciate it. I need to take some time to learn the forum. I just saw discussion of curling stockinette from a few years back. Wish all previous ones would pop up so we are not duplicating questions and solutions.

9. **发言者 2**（回复第 8 条）：There are so many questions and variations on the forum dating back quite a ways. You can try searching which sometimes helps to find similar questions and maybe different solutions.  
     
   Happy to be able to help. You’re very welcome.

10. **发言者 1**（回复第 9 条）：Thanks.

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Security incident on Hex.pm

2. **发言者 2**（回复第 1 条）：Holly-molly. What a bug\! I mean, yeah, it’s a standart-ish way to get RCE but the way how it’s triggered is something.   
     
   I want to believe at some moment all languages will stick to 2-3 formats and will not reinvent the wheel.

### 讨论 19

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

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：is it posible to make a dictionary with 2 values?  
     
   Godot Version  
   4.7.2  
     
   Question  
     
   im triying to make a list of questions with a dictionary the question should have an answer and a topic to create other options based on the topic.   
     
   example   
     
   "question": "answer,"topic"  
     
   "who are you" : "juan", "name"  
     
   is there a way to do it or should i find another method?

2. **发言者 2**（回复第 1 条）：Dictionary values can be arrays or objects.

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Cdx-dock – Bridge LangChain/CrewAI/AutoGen/Hermes, cut token overhead

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Curvature map maddness  
     
   I’m getting all these white lines and noise.  
     
   The model has around 5m verts, which is big for Blender. I’m using the pointiness geometry attribute to bake a curvature map but it’s doing this. Any ideas what’s going on?  
     
   \[图片省略\]261123 pointiness 013758×1806 4.13 MB

2. **发言者 2**（回复第 1 条）：I’m asking myself:1  
     
   Why do you use the color of the colorramp to drive the factor of a mix node ?  
     
   ..so maybe the conversation from color to factor uses some color management “thingy” which leads to some not quite white to extremely white transformation ?

3. **发言者 3**（回复第 1 条）：Pointiness works per vertex and reacts strongly to uneven density, so on a 5M-vert mesh long thin triangles show up as those white lines and noise. Try baking from a remeshed or decimated copy, or smooth the value first with a Blur Attribute node in Geometry Nodes before you bake.

4. **发言者 1**（回复第 2 条）：Just to push the contrast.

5. **发言者 1**（回复第 3 条）：It’s all quads and the mesh is symmetrical and pretty smooth. I had to really push the contrast with the colour ramp because it is so smooth. The really weird part, is the white streaks and spots are not symmetrical.

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Re: \[閒聊\] 相親男生聽到女生薪水2萬多就跑了  
     
   昨天才在網路上看到  
   一個男的做感情諮詢  
     
   月薪38K住家裡吃爸媽的，開BMW月繳車貸15k，信用卡欠款7萬循環利率，存款2萬  
     
   抱怨覺得自己長得不錯（？），沒有女生看的上他，覺得女生只看錢跟條件，然後說自己  
   開BMW女生坐了也舒服也很有面子啊，為什麼沒人選他  
     
   真的是底層魯中魯  
     
   這已經不是女生看他條件選不選他的問題  
   是根本沒能力好好生活了吧  
     
   月薪38K有點少但勉強算有一技之長吧  
   但是車貸、卡債這種消費觀，看就知道揀角沒前途  
     
   要談戀愛，至少雙方都有月薪4萬比較合適一點，要結婚至少雙方5-6萬，勉強可以過兩人  
   生活  
     
   自己現在月薪50K，平時吃吃喝喝大概15k左右，之前信貸投資每個月還款15k  
     
   3C產品買一次就要勒緊褲腰帶好幾個月，談戀愛光是出去玩的經費、油錢、開銷，想一想  
   就頭皮發麻，每天回家尻尻槍身心舒暢，完全不想談戀愛了  
     
   不要說什麼全付男，就是AA 制我也覺得我自己談不起戀愛，完全就是虧本買賣，如果沒  
   有走到最後更是賠了夫人又折兵  
     
   然後上網看很多女生還在幻想男生就是要買單一切就覺得好好笑...真的是，睏矇睏麥眠  
   夢，只能說慢慢找吧，祝夢姐們都可以找到月收50w如意郎君XD

2. **发言者 2**（回复第 1 条）：月薪38K比殘廢還不如 啥一技之長...

3. **发言者 3**（回复第 1 条）：題外話 我個人不支持信貸投資 以投

4. **发言者 3**（回复第 1 条）：資大盤連續N年的賠錢率來看 七年還

5. **发言者 3**（回复第 1 条）：有10%左右 房貸20年就趨近於0% 甚

6. **发言者 3**（回复第 1 条）：至30年就更低（以名目報酬率算）

7. **发言者 3**（回复第 1 条）：扣掉貸款利率和通膨率的話賠錢率就

8. **发言者 3**（回复第 1 条）：更高了

9. **发言者 4**（回复第 1 条）：開BMW給人印象不好，很多毒駕酒駕肇

10. **发言者 4**（回复第 1 条）：事都開BMW，把BMW賣掉，減少負債

11. **发言者 5**（回复第 1 条）：男女有別，男生38K廢物，女生小資

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：蹲厕迷思：如果片里的老师都是表演，那么现实中现充进行活塞运动的时候，会不会也有表演的成分\( ﾟ∀。\)

2. **发言者 2**：你问我？

3. **发言者 3**：据说是有的\( ﾟ∀。\)

4. **发言者 4**：问

5. **发言者 5**：道

6. **发言者 6**：于

7. **发言者 7**：于

### 讨论 25

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Stacktrace when installing kernel 6.1.0-56-amd64, stuck and can't move on  
     
   What type of hardware are you using: Old laptop or computer  
     
   What YunoHost version are you running: 12  
     
   How are you able to access your server: The webadmin  
     
   SSH  
     
   Direct access via physical keyboard/screen  
     
   Describe your issue  
   Since yesterday, my yunohost did not respond while updating using the web interface. The culprit seems the update to the kernel 6.1.0-56, which seems partially installed. dpkg --reconfigure -a allows to move on to an apt upgrade but the upgrade always fail in a stacktrace \(i see calls from ext4 within\). and drops either unresponsive or to unresponsive bash.  
     
   Is it a known issue ? How do I fix that ?  
     
   Currently running memtest86 to ensure that it’s not an hardware fault, tried also to check the disk, seems OK.  
     
   Share relevant logs or error messages

2. **发言者 2**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   The culprit seems the update to the kernel 6.1.0-56, which  
     
   I have a similar problem with Yunohost on a VPS with that same kernel.  
     
   Anytime an intensive process runs, the kernel panics.  
     
   I worked around the issue by booting to the old kernel. The same actions now don’t cause a panic.

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Turkey Print Autumn Napkins with Mitered Corners  
     
   I have made cloth napkins for October and December, so I decided I wanted some for November. My November/Thanksgiving decor is turkey-based, so I spend a couple of years looking for a print that suited my tastes. Earlier this year, I found it and this week I made 'em\!  
     
   \[图片省略\]TurkeyNapkins01576×445 105 KB  
     
   I was able to get eight 13.5" napkins out of 2 yards. The suqares were originally 15", with 3/4" for the mitered hem.  
     
   \[图片省略\]TurkeyNapkins03440×576 94.4 KB  
     
   I had intended to find a coordinating print for a panel on the back, framed by the mitered edge. But I couldn’t find something that worked for me in color, theme, and style. I picked up something that I had settled for, but when I realized that the back was pretty much plain white, I decided to forego the panel\!  
     
   \[图片省略\]TurkeyNapkins02274×576 56.2 KB  
     
   We’ll use them all month in the coming years, but the napkin rings only come out for holiday dinner or guests\!

2. **发言者 2**（回复第 1 条）：Love them\!  They’ll go so well with all your turkey decor.

3. **发言者 1**（回复第 2 条）：Thanks\! I think they’re a good match for any of our plates, too\!

4. **发言者 3**（回复第 1 条）：Love them\!

5. **发言者 1**（回复第 4 条）：Thank you\!

6. **发言者 4**（回复第 1 条）：The mitered corners are perfect\!\!\!

7. **发言者 1**（回复第 6 条）：Hehe\! They aren’t all perfect. THANKS\!

8. **发言者 5**（回复第 1 条）：These will bring so much charm to the table\!\!

9. **发言者 6**（回复第 1 条）：Those are so elegant and perfect. Also, your corners are admirably perfect \(mine always come out wonky\).

10. **发言者 7**（回复第 1 条）：Oh my goodness, this print is so dreamy. Festive without being too typically “turkey forward”. Would love to see your turkey decor all out and how these fit in\!

### 讨论 27

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：不懂就问，不知道大法的保修政策，还是没发票按照出厂日期保修？

### 讨论 28

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

### 讨论 29

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

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：binding off mid row  
     
   hey so i made a pattern for a freehand idea i’m making, and im a beginner knitter so i need to know if you can bind off several stitches mid row, and how. i’m trying to make a U-shaped edge indent  
     
   below are photos from my pattern and my reference image for the project  
     
   \[图片省略\]IMG\_3779544×917 94.3 KB  
     
   \[图片省略\]IMG\_3764225×225 4.89 KB

2. **发言者 2**（回复第 1 条）：Welcome to the forum\!  
     
   Yes, you can bind off in the middle of a row. It’s a technique often used to make the neckline in a sweater or to make buttonholes. You would then need to use two balls of yarn to work each side of the bind off.  
     
       
       \[图片省略\]

3. **发言者 3**（回复第 1 条）：Looks like a fun pattern\!  
     
   In addition to binding off mid row you would also be continuing with either a sloped bind off or decreases at the opening edge.  
     
   I hope you’ll share pics of your experiments and final project, it’s great seeing ideas take shape.

4. **发言者 1**（回复第 2 条）：I don’t have a second ball, would it be possible to use both sides of the yarn to reach the desired effect? or would it be possible to use decreases in the same way ? i’ll be seaming the sides so that may pull it to the side

5. **发言者 1**（引用未收录发言）：I’m actually flat-knitting this as a rectangle, then ill seam the sides to create a bag

6. **发言者 4**（回复第 5 条）：In that case, you can bind off in the center and work one side completely, cut the yarn and reattach to work the other side.  Just keep track of how many decreases you make on each row so you can mirror them.

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：What Happened to Silicon Valley?

2. **发言者 2**（回复第 1 条）：Very interesting discussion about economics, IMO.

### 讨论 32

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Instatiated Scene Visibilty Scripting help please  
     
   Godot Version  
   4.7  
     
   Hi all.  
     
   Sorry a noob here :slight\_smile:  
     
   I am starting to design a game which is quite UI heavy. After some research it seems the best way to approach this is to create separate scenes for each UI.  
     
   In starting out I have just 3 UI scenes:  
     
   MainMenuUI  
     
   LocationUI  
     
   ShopUI  
     
   My main scene is named ‘GAME’ and I have added a child node to this called ‘UI’.  
     
   Then I have instatiated each of my UI scenes underneath.  
     
   So, my ‘GAME’ node2D tree looks like this:  
     
   GAME  
     
   -UI  
     
   MainMenuUI  
     
   ShopUI  
     
   LocationUI  
     
   How do I go about scripting the visibilty of each of the instatiated nodes so only one shows up at once?  
     
   I am so sorry if my explanation is poor.  
     
   I just need to be able to swap each of the scenes.  
     
   Thanks in advance for ANY help\!

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Everything will get breached. How do you limit the blast radius?  
     
   Got another breach email this morning, this travel operator had my passport number and travel history stored. At this point I feel every service we use is going to get dumped eventually.I consider unique passwords and hardware 2FA as no brainers, they stop credential stuffing, but they don't help when a service leaks your actual identity. There are just so many services that require personal data like your passport number, phone number etc. And I think the fallout will only get worse as agentic workflows and local models become more mainstream and people start giving them more and more personal data.Assuming every vendor database is basically public eventually, how are you actually limiting the blast radius without turning everyday life into a massive faff?

2. **发言者 2**（回复第 1 条）：I don't give my real name/info to a website unless it's absolutely required. Helps limit the fallout but is not complete prevention.

3. **发言者 3**（回复第 1 条）：Lock down your credit reports.  \(I admit that I have not done so.  I should.\)

4. **发言者 1**（回复第 3 条）：I'm assuming this is a USA centric suggestion. How do you even do this?

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Re: \[難過\] 花了半年原來對方超噁  
     
   交往認識清楚才上床  
      怎麼會第一天認識二話不說就先上床  
      搞什麼交友軟體啊  
      不好吧  
      難道你自己也喜歡一夜情?\!  
     
      多愛自己一點  
      想買什麼就買什麼  
      不要隨意讓自己的錢出走  
     
      還好渣男離開了  
      如果糾纏不清看怎麼辦才好

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：出版行业真的很缺翻译人才吗？怎么看些引进的出版书翻译都跟坨屎没什么区别，甚至也不太通人性

2. **发言者 2**：一眼某社区读书《肠子》･ﾟ\( ﾉヮ´ \)

3. **发言者 1**（回复第 2 条）：\[引用第 2 条\]  
     
   忍到这里终于忍不下去了，恨不得给翻译的肠子抽出来

4. **发言者 3**：我也想吐槽，这书就狗龄记岁和出亡还好点，其它翻译，尤其是电视模特那一章跟狗屎一样。

5. **发言者 4**：名著类的好翻译需要对两种语言都有极高的掌握水平，同时还需要对原作者的写作风格、写作习惯、著作思想、甚至旁征博引的文献资料有足够的了解和自己的思考，在做到这些的同时，还要坚持翻译的原则，让译文流畅优美又不失原作的本意。能做下来这种工作的人，素养和底蕴都是绝对不能浅薄的，举个例子，咱读的中文版泰戈尔诗集，最广为流传的版本是冰心和郑振铎的译版。我记得我最近看的一本考古专著的翻译，作者在翻译的同时还考据了大量中外文献，对全文多处错漏处进行了校订和注释。我很喜欢读一些优秀作品的译者序也是这个原因，抛开翻译本身，这些译者本身都是非常非常优秀的人文类学者，他们写的序涉及到自己对原作的总结和观点，都是非常值得一读的。

6. **发言者 5**：很多翻译工作都是外包的，质量和校对看心情

7. **发言者 6**：宁顺而不信，宁信而不顺，其实翻译真正纠结的不是什么信达雅，就是这两个。  
     
   实际上当年严复提出信达雅之后，在后半句马上就补充，说他自己其实觉得这种翻译不太对，所以后世的人不要拿他说事。结果完全没人提这茬。  
     
   很多时候原文就是混乱的，以至于我真的自己学了外语接触翻译之后，受到了不小的冲击\( ﾟ∀。\)感觉自己被骗了一样。

8. **发言者 7**：老板：我们把这个，这个，还有这章留给学生作为练习，小肥你和肥博士来校对一下挂我的名字出版

9. **发言者 8**：翻译已经成学阀自留地了

10. **发言者 9**：这书我买的台版\(　ﾟ 3ﾟ\)

11. **发言者 10**：主要业界也没什么利润能雇厉害的人吧

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：说下怎么开，正常点进去，按年付，是正常的价格 大概 199.  
   但是你可以到活动列表页面，有个 4 块钱开一个月的。先点击开下。再回到老的页面，选择年付，就是半价了  
     
   \[链接隐去\]

2. **发言者 2**：此福利不再提供

3. **发言者 1**：发言者 2 。。好吧

### 讨论 37

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：v.4.1.0: Call for testers :\)  
     
   :carpentry\_saw: Call for Testing: :hammer\_and\_wrench:  
     
   I’ve just released new pre-release packages for the version :arrow\_forward: 4.0.9 :arrow\_backward:  \(listed as the latest dev packages on the G’MIC downloads page\). I’d be interested in getting feedback on these packages, particularly for the G’MIC-Qt plugin, whose code has been significantly modified \(should be more responsive than ever\!\).  
     
   :arrow\_forward: G'MIC - GREYC's Magic for Image Computing: A Full-Featured Open-Source Framework for Image Processing - Download

2. **发言者 2**（回复第 1 条）：Does this mean thousands of parameters gui filter can work well now? I have a not released filter that has thousanda of parameters \(color related\). Though to be fair, this is why I’d like a palette dialog. And I also wanted a crack on grid variant of existing dialogs.

3. **发言者 1**（回复第 2 条）：The parsing of filter parameters should have been slightly improved yes. I can’t tell if a thousand parameter filter will work, but it’s worth trying\!

4. **发言者 3**（回复第 1 条）：Threw a couple of presets at it and they worked well, David.  I say it’s a keeper \(and yes; today is my Thanksgiving holiday; lol\).   :slight\_smile:

5. **发言者 4**（引用未收录发言）：Kubuntu 24.04 / Gimp 3.2.8 / gmic\_gimp\_qt v4.1.0  / QT5  
     
   Too many filters, I went down  from Colorful Blobs to Warp \(BRF\)  About 20 filters with points in the preview …and all worked. Gave up.  
     
   Looks like deformations are ok.  Anything in particular that might not work ?

### 讨论 38

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：NDX Ground Setting with Weiss DAC501 MK2  
     
   Hi Folks,  
     
   I am using NDX/XPS-DR/282/HC-DR/250.2 for current system and I had added the second source \(Weiss DAC501 MK2\) to the system.  
     
   Could kindly advise what is the ground setting on NDX should I select ? Chassic or Floating ?  
     
   Thanks for advise and support \!\!\!

2. **发言者 2**（回复第 1 条）：there may be a subtle difference in sound in either position, but ive found no difference but it depends on how the weiss is earthed, just try in both positions and see if you hear any change.

3. **发言者 3**（回复第 1 条）：It will depend upon whether the Weiss has its signal ground connected to earth or not. Probably best to ask them.  If so, set the NDX to floating, if not, set it to chassis.

4. **发言者 1**（回复第 1 条）：发言者 3  发言者 2  
     
   Thanks for your advise, let me consult Weiss for the question :smiley:

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Top down sweater with scoop hem  
     
   I’m knitting a top down sweater and want to make a scoop hem so I need to incorporate short rows into the front and back. I have 160 stitches on the front and the back. Any ideas on spacing of the wraps?

2. **发言者 2**（回复第 1 条）：I wonder if binding off at intervals might give you more control over the shaped side edges and be easier to visualize.  
     
   There’s also a short row calculator in addition to the method recommended by 某参与者 which can be set for hems. I haven’t used it myself so this isn’t from presonal experience.  
     
   \[链接隐去\]

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Release: Roto v0.14.0

2. **发言者 2**（回复第 1 条）：Didn't expect this mostly bugfix release to be posted here\! Anyway, happy to answer any questions about Roto\!

3. **发言者 2**（引用未收录发言）：That is indeed correct. You can share Rust types to Roto so there's also no way to provide this really. Of course, you could work around this by ensuring that all the scripts only manipulate some state object that you serialize, but I understand that this would be cumbersome and error prone.

4. **发言者 3**（回复第 3 条）：Right, but this proposal fails quickly with my use case, whereby the scripts yield to the engine to resolve user prompts, thus their 'program counter' could be anywhere in the script, including inside a loop. At that point, it's not possible to segregate runtime state from script state \(from game state\).  
     
   Thanks nonetheless for the good work\!

5. **发言者 2**（回复第 4 条）：Yep, for sure. I hope you find a language that can do what you want\!

### 讨论 41

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Serving scrape bots on a silver platter: the dotMD extension  
     
   Every "post number" and "topic" link on the forum with a ".md" extension, is plaintext.  A little obfuscation could go a long way.  
     
   For example:  
     
   This topic: Serving scrape bots on a silver platter: the dotMD extension  
     
   This topic with .md: Serving scrape bots on a silver platter: the dotMD extension  
     
   The .md extension only works in the URL bar...

2. **发言者 2**（回复第 1 条）：Sorry but I don't know what you are talking about

3. **发言者 2**（引用未收录发言）：OK, I see that result, but I am not clear what point you are making

4. **发言者 1**（回复第 3 条）：For a moment I thought, "that is why bots are johnny-on-the-spot" with finding and replying... but I realize, that is how all search engines find the data.

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How do I crop a subviewport  
     
   \(topic deleted by author\)

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: SutraDB – Zero-build embedded hybrid vector and BM25 database in Rust

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How to gradually add vocab to Master\+?  
     
   I apologize as I’m certain this has been discussed before but I can’t find the thread. I really want to start incorporating master\+ for my vocab \(I’ve already done so for grammar\) but I’m worried I will have a deluge of over 1000 reviews if I do so. Is there any way to mark just a few items at a time as master\+ so I can space out the reviews?

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[图片省略\]  
   到账可能有延迟

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：La Pause Comics 39  
     
   Article publié sur :			La Pause Comics 39 - 某社区.fr  
     
   Comme tous les mois \(ou presque\), si vous êtes abonné à notre Patreon, vous pouvez désormais dévorer une nouvelle Pause Comics, notre podcast mensuel dans lequel Arkeon vous propose sa sélection de BD et comics du mois. En spin-off des Clairvoyants, notre podcast dédié au Marvel Cinematic Universe, La Pause Comics s’attache à traiter de l’actu BD, toutes catégories et…

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[链接隐去\]  
   彻底重构了之前的架构，实测超级稳定

2. **发言者 2**：文件传输协议,使用场景是什么

3. **发言者 3**：你来晚了啊。现在都按上传流量一刀切了。管你啥协议

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：feedback re mask management in Darktable 5.7  
     
   I downloaded the 5.7 nightly build yesterday and have been experimenting on a quarantined subset of my images. The new mask management interface is much better and less confusing, even without any formal documentation\!  
     
   Keep up the good work

<!-- samples:end -->

