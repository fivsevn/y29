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

采集时间：2026-11-23 17:39:13（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：救救我，手机掉到撤硕里了，底下充电口麦克风进去了一点，红米note11TPro后盖塑料夹层也进了水（带颜色的。。）我现在用着还能闻到味，还好比较防水，我用水冲了没问题我下午还要出门啊，我不想带着这玩意出门\( ´\_ゝ\`\)我还要揣兜里，咋办咋办啊救救我，准备先去那种贴膜的店里看看能不能给我做清理多少钱都行\(;´Д\`\)我还没吃饭呢，拿了这玩意我还要付款

2. **发言者 2**：\(\|\|\|ﾟдﾟ\)📱小手机不要看，咱们走

3. **发言者 1**：救救我

4. **发言者 3**：\(´ﾟДﾟ\`\)

5. **发言者 1**：-45救回来了\( ;´д\`\)\( ;´д\`\)\( ;´д\`\)这个型号不好买手机壳啊

6. **发言者 4**（回复第 5 条）：\[引用第 5 条\]  
     
   \(´ﾟДﾟ\`\)你怎么和人说的，我手机粘屎了帮我清理一下吗

7. **发言者 1**：我再也不会信任这台手机了，再也不会带去厕所带上床玩了

8. **发言者 1**（回复第 6 条）：\[引用第 6 条\]  
     
   就跟他说清理一下后盖的水和充电口扬声器，我也饿的迷糊了，他闻这个水很臭，问我是不是掉厕所里了，人家开玩笑说的我居然说是\(\|\|\|ﾟДﾟ\)

9. **发言者 5**：寄给我，我用嘴嘬出来

10. **发言者 4**（回复第 8 条）：\[引用第 8 条\]  
     
   \( ﾟ∀。\)那还能给你清理的我去，这么好的吗

11. **发言者 6**：已经不干净力\( ›´ω\`‹ \)

### 讨论 2

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Comment récupérer un nom de domaine en noho.st?  
     
   What type of hardware are you using: Old laptop or computer  
     
   What YunoHost version are you running: 12.1.43  
     
   How are you able to access your server: The webadmin  
     
   Describe your issue  
   Comment récupérer un nom de domaine en noho.st ?  
     
   Je ne dispose plus du mot de passe du compte  
     
   Share relevant logs or error messages  
   Pas de log

2. **发言者 2**（回复第 1 条）：Salut, ça se passe par là : Nohost domain recovery - Suppression de domaine en \[链接隐去\] noho.st et ynh.fr

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Open-source MCP server to check AI search crawler readiness

### 讨论 4

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

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：App Lab 0.12.0 Board Configuration -&gt; Board Name field verification buggy  
     
   I'm 2 days into App Lab, Uno Q and Ventuno Q and wondering where the best place to report bugs is.  
     
   On Step1 of the Board configuration screen in App Lab, the "Board name" field verification reports and error that is unhelpful.  
     
   "Board name can only contain letters, numbers and hyphens." when the board name is set to "UnoQ".  
     
   The board name is accepted when the name length is greater than 4 characters.  
     
   In addition, entering a correct board name and then selecting "Next", then backing up to change the name to something with only 4 characters does not report an error, it instead, changes the name back to the previously valid name and continues on with no report of an invalid "Board name" entry to the user.  
     
   Initially entering a Board name with a length of 5 or more characters bypasses this error.

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Looking for modelers, animators, riggers, texture artists  
     
   Hi everyone\! We are working on a 3d animated TV show about supernatural beings and the secrets Blackthorn Academy, the one place where they are safe, hides.  
     
   We already started with production. We have concept arts and the script is being written.  
     
   We appreciate any help\! Even if you are generalist or do something that isn’t listed, you are welcome to join. Any kind of contribution will be properly credited, and you are free to use your work in a portfolio/demo reel. This is a passion project and is unpaid.

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Neck decrease instructions help  
     
   The instructions state, Cast off 3 sts at beg of next row. Dec 1 st at neck edge of next 6 rows. There are 51 sts to begin with, so I am assuming I should have 42 sts when I’m done only I’m not getting that number. I am assuming that I am Dec 1 st at the end of the right side row and then Dec 1 st on the wrong side row.  So rows 1 through 6 each get 1 st decreased at the neck edge.

2. **发言者 2**（回复第 1 条）：What is the name of your pattern and designer?  
     
   A stitch count of 42sts makes sense after the cast off of 3sts plus the neck edge decreases of 6 total. Yes, dec at the neck edge at the end of the row \(RS\) and beginning of the next \(WS\) until 6sts have been decreased at the neck edge.  
     
   What is your stitch count? Is it possible that you lost count on the neck edge decreases?

3. **发言者 3**（引用未收录发言）：It happens to the best of us\!

4. **发言者 4**（引用未收录发言）：Good to hear you figured it out\!

5. **发言者 2**（引用未收录发言）：Great figuring this out. Lots of shaping going on. I keep track with paper and pencil if there are multiple rows involved in all this.  
     
   It’s going to be a stunning sweater\!

6. **发言者 1**（回复第 5 条）：I’ll post a picture when I have the front finished so you can see what it looks like. :slight\_smile:

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：GhostScript CVE 2026-125396: "Upload2Shell"  
     
   \[Here's the NVD page for the CVE with some additional useful context\]\(\[链接隐去\]

2. **发言者 1**（回复第 1 条）：It was a real missed opportunity not to have named this one \*Shell in the Ghost\*.

3. **发言者 2**（回复第 1 条）：&gt; Our WordPress-shaped preview proof   
     
   For some reason, this kind of usage of "shape" annoys me. I think I first saw it this very year, in some LLM-generated blog post \(the author of the post said it was LLM-generated\). Is "shape" in the sense of "general configuration" something that humans used before 2026? It looks to me like this is some very niche usage that LLMs have spread around.

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Script help for Instanced UI's  
     
   Godot Version  
   4.7  
     
   Hi all.  
   Sorry a noob here :slightly\_smiling\_face:  
     
   I am starting to design a game which is quite UI heavy. After some research it seems the best way to approach this is to create separate scenes for each UI.  
     
   In starting I have just 3 UI scenes:  
     
   MainMenuUI  
     
   LocationUI  
     
   ShopUI  
     
   My main scene is named ‘GAME’ and I have added a child node to this called ‘UI’.  
     
   Then I have instatiated each of my UI scenes underneath.  
     
   So, my ‘GAME’ node2D tree looks like this:  
     
   GAME  
     
   -UI  
     
   -MainMenuUI  
     
   -ShopUI  
     
   -LocationUI  
     
   How do I go about scripting the visibilty of each of the instatiated nodes so only one shows up at once?  
     
   I am so sorry if my explanation is poor.  
     
   I just need to be able to swap each of the scenes.  
     
   Thanks in advance for ANY help\!

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区 v6. Si  
     
   Article publié sur :			某社区 v6. Si. - 某社区.fr  
     
   Il y a 11 ans, on rigolait du fait qu’il nous avait fallu 11 ans pour sortir une nouvelle version. Bon. A priori c’est notre rythme… Car la « nouvelle version » de 某社区, mise en ligne fin septembre 2015, commençait largement à souffrir des mêmes défauts reprochés à la version qu’elle remplaçait. Il aura fallu un sacré coup de motivation pour…

2. **发言者 2**（回复第 1 条）：Maintenant, faut préparer les 25 ans de GZ. :ninja:

3. **发言者 3**（回复第 1 条）：Haha j'y pensais récemment, justement, aux 25 ans de GZ. Parce qu'on bon, la dernière fois qu'on a fêté l'anniv de GZ, c'était les 15 ans non?

4. **发言者 1**（回复第 3 条）：Les 10 ? Bordel je refuse de chercher le thread dédié  :smiley:

5. **发言者 3**（回复第 4 条）：Les 10 je me souviens c'était la semaine suivant mon mariage. Du coup faire les 25 l'année prochaine serait parfait pour fêter mon divorce :smiley:

6. **发言者 1**（回复第 1 条）：Thx 发言者 2, je range ça là.  
     
   \[图片省略\]image622×626 41.9 KB

7. **发言者 4**（回复第 1 条）：Je vais rester simple, simplement merci à tous les boss pour tout ce qui est fait pour garder cette communauté telle qu'elle est depuis tant d'années  :heart: \!  
     
   Cette v6 est s3xy.  
     
   Btw au rythme ou ca va le prochain anniv se fera en visio depuis l'ephad :ninja:

8. **发言者 5**（回复第 1 条）：Je confirme qu'on a bien fêté les 15 ans, c'était dans un bar "geek" à côté de mon chez moi de l'époque, métro Strasbourg-St-Denis, dont le nom m'échappe là tout de suite.  
     
   \[图片省略\]p9230073jpg\_37033113690\_o1920×1440 561 KB

9. **发言者 6**（回复第 1 条）：Deux choses :  
     
   c'était mieux avant, il me reste quelques souvenirs de l'interface en pixel d'à l'époque, tout était mieux avant, notamment ma souplesse et la musique.  
     
   merci caf et l'équipe de garder la lumière allumée, cafzone/某社区 a bercé plus de la moitié de ma vie, faire un tour sur le forum est comme retrouver sa chambre d'ado chez ses parents, un point de repère dans le web.

10. **发言者 7**（回复第 1 条）：un ménestrel des médias  
     
   \[图片省略\]

11. **发言者 8**（回复第 1 条）：Rah je suis le prems \!  
     
   c'etait mieux avant  
     
   ==&gt;

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\(G\)RH is true by Anthropic and Levent Alpöge  
     
   In case you missed it…  
     
       
     
         alpo.ge  
       
     
       
         
     
   remark.pdf  
     
     239.37 KB  
     
       
     
       
         
         
       
     
       
     
   which results a rush publish of a partial human work:  
     
       
         \[图片省略\]  
     
         Math 216:  Foundations of Algebraic Geometry – 20 Nov 26  
       
     
       
         
     
   Hurried Announcement:  Alessandro Masullo GRH  
     
     Hi everyone, I am at the American Mathematical Society Executive Committee and Board of Trustees meeting now, and about to chair an hours-long meeting, but this is urgent, so I will try to get this…

2. **发言者 1**（回复第 1 条）：As a small addition, while I very much congrat and feel happy for Alpöge and his hard work, given his writing:  
     
   Claude and I have had a great time together with such breadth in recent months, but this time Claude far outpaced me near the finish line. No, Claude flew, and danced, and sparkled near that finish line.  
     
   I am a bit concerned about the over-anthropomorphizing of LLMs…

3. **发言者 2**（回复第 1 条）：It is totally unfair to compare what one single human can do against a human plus billions of dollars in tokens in the best LLM models.  
     
   What if we had used those billions to train and put multiple mathematicians to work together in the RH problem?  
     
   But this is how capitalism works. So, nothing new under the sun here.

4. **发言者 2**（引用未收录发言）：I read your comment as aggressive towards Jason.  
     
   But maybe it is just me.

5. **发言者 3**（回复第 4 条）：Yes it is, and I will remove that comment.  
     
   I’m so angry at these people who are clearly opposed to scientific progress. Sometimes I feel like we’re going back to the Middle Ages.

6. **发言者 4**（回复第 4 条）：I did not read David’s comment, but it’s worth keeping in mind that Jason’s comment is also plenty aggressive.  
     
   I don’t think that branding your colleagues as “the most despicable kind of human being” or labeling them as traitors online is going to do much good. Most people are just trying to cope with the present situation.

7. **发言者 3**（引用未收录发言）：\[图片省略\] 某参与者:  
     
   This increasing idealism in society is revolting.  
     
   I’ll go even further: it really feels like we’re back in the days of the religious morality that prevailed in the Middle Ages. Yet it’s obvious that, throughout history, the most moralizing people have often been the least trustworthy. These people are despicable.

### 讨论 12

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

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：General measurements discussion for GraphWorks visualizer  
     
   Share and discuss your impressions of different measurements in the new GraphWorks visualizer tool, whether you’ve actually listened to the headphones or not \(which is normally taboo on most audiophile forums\).  
     
   I have not listened to most of the headphones in this tool btw. So most of my impressions will be based on the 5128 graphs, and sometimes some virtual listening. So they should be taken with a grain of salt.

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：原来CNC工艺指的是Computer Numerical Control，也就是数控机床。  
     
   能不能别再发明新词把原本能看懂的东西变得看不懂了\( ´\_っ\`\)

2. **发言者 2**：这是好事啊，原来不知道是怎么做的件，可以说这一眼CNC来让外行感觉你很内行  
     
   也不用讨论什么车铣刨磨钻钳镗了，这就是CNC \(\`ヮ´\)

3. **发言者 3**：CNC这词不是挺久了吗\( ﾟ∀。\)

4. **发言者 1**：\(っ˘Д˘\)ノ&lt;今天晚上我要吃FR工艺鸡DM

5. **发言者 1**（回复第 2 条）：\[引用第 2 条\]  
     
   确实，我以前就觉得CNC很高端\( ;´д\`\)

6. **发言者 4**（回复第 5 条）：\[引用第 5 条\]  
     
   因为一开始真的很高端啊\( ﾟ∀。\)  
     
   我金工实习摇过手摇的机床，那可难受了，cnc直接写程序多轻松

7. **发言者 5**：cnc不算冷门缩写吧

8. **发言者 1**（回复第 6 条）：\[引用第 6 条\]  
     
   我的意思是知道数控机床很高端，但以为CNC是什么更特别的技术\( ;´д\`\)

9. **发言者 6**：\( ﾟ∀。\)不是性爱吗

10. **发言者 7**：cnc是草纳粹的意思

11. **发言者 8**：不是命令与征服Command &amp; Conquer嘛\( ﾟ∀。\)

### 讨论 15

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

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：不知道大家刷到过没有，最近 某社区 上挺多人把朋友、家人甚至自家猫狗 P 进 NPR Tiny Desk 的小桌演唱会里，主唱凑到麦克风前笑着挥手，乐队跟一句 “Outstanding”。原片是 Charlie Wilson 2023 年那场的最后 19 秒。  
     
   我顺手做了个专门生成这个梗的网页小工具，传照片就行，不用装 App。折腾下来有几个点，跟想自己做或者想玩的朋友说一下：  
     
   - 效果好不好，照片比模型影响大。主唱有两个特写，一定要用正脸、光线均匀、看得清眼睛的照片；萨克斯是单人镜头，别从合照里裁；后排键盘和两个和声挤在一个画面里，光线差不多的照片放一起才不违和。墨镜、口罩、重滤镜基本都翻车，宠物最好一张照片一只、脸占大半个画面。  
   - 一开始是直接出视频，后来改成先出一张免费的乐队预览图，脸不对就换，满意了再生成。这样大家心里有底，退款也少。  
   - 收费按视频不按人头，1 个人和 5 个人都是 $9.90 一条。玩这个梗的多半是整个群一起上，按人头收太劝退了。  
   - 还有个小坑：自己剪完发出去声音特别小，多半是响度太低，平台会把音量拉平。用 ffmpeg 的 loudnorm 拉到 -14 LUFS 左右就正常了。  
     
   具体怎么做、每个位置放谁、照片怎么挑，我写了篇比较长的教程放在 Hugging Face 上：  
   \[链接隐去\]  
     
   只能用本人同意的照片，名人和媒体照会直接被拦。我是做这个的人，想问问大家两个问题：先出预览这一步会不会嫌麻烦？五个位置（主唱、键盘、萨克斯、两个和声）一眼能看懂怎么分配吗？

### 讨论 17

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

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Compromise Test  
     
   We have developed an application we want to roll out for sale. Before we do, we plan to have a penetration test done. Before I spend the money on a pen test, I want to open an instance to the public and invite the HN community to take a shot at it.What's a good amount of money to set-aside for such an exercise?

2. **发言者 1**（引用未收录发言）：Thank you. All of my experience in development is in-house tools. I had not considered the legal liabilities and the need for a contract.

### 讨论 19

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Princess Donut Postcard  
     
   I made this Princess Donut painting for 发言者 6 in the STS swap. \(A character from Dungeon Crawler Carl.\)  
     
   4x6" coldpress postcard paper with watercolor and colored pencil.  
     
   \[图片省略\]PSX\_20261107\_121555\_17940753951821756×2546 1.21 MB  
     
   Process pics:  
     
   \[图片省略\]20261106\_2212251920×2560 980 KB  
     
   \[图片省略\]20261106\_2234501920×2560 1.04 MB  
     
   \[图片省略\]20261106\_2304391920×2560 1.06 MB  
     
   \[图片省略\]20261106\_2348461920×2560 700 KB

2. **发言者 2**（回复第 1 条）：The facial expression is priceless. :grin:

3. **发言者 3**（回复第 1 条）：Beautiful work. You really captured the fluffy fur.

4. **发言者 4**（回复第 1 条）：Positively regal\!\! :castle:

5. **发言者 5**（回复第 1 条）：You really caputured cat-ittude in your painting\!

6. **发言者 6**（回复第 1 条）：I love my Princess Donut painting :purple\_heart: I have recently become obsessed with this series lol

7. **发言者 7**（回复第 1 条）：I can hear her voice. Great job.

8. **发言者 8**（回复第 1 条）：That is hilarious. I.love it. Would be funny on a shirt too.

9. **发言者 1**（回复第 1 条）：Thank you, 发言者 4, 发言者 7, 发言者 5, 发言者 8, 发言者 2, 发言者 6, and 发言者 3\!

10. **发言者 9**（回复第 1 条）：The Princess is not amused, apparently. This is very cute\! I’m not familiar with the show, but I can appreciate the fluffy cattitude\!

11. **发言者 1**（回复第 10 条）：Thanks\! Cattitude for sure\! It’s a super popular book series but I believe it is being adapted for movie/TV. Not released yet though.

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Newest flash to UNO Q failed  
     
   I wanted to flash the latest OS 20261109-806 into UNO\_Q, but this was failed "unknown error".  
     
   I tried it 2 times. And yes, the jumper was set.  
     
   \[图片省略\]Uno-Q\_flash OS 20261109-806 - failed\_20-11-20261093×832 25.4 KB  
     
   Last week flashing the previous OS 20260528-558 was successful.  
     
   What's happen? What can I do? Or is there a bug in the downloaded file?

2. **发言者 2**（回复第 1 条）：Which operating system are you on?  
     
   What is the AppLab version?  
     
   As an alternative you can try flashing it with the arduino-flasher-cli although that would not explain why its failing in AppLab.  
     
   Does the board otherwise boot up OK?

3. **发言者 1**（回复第 2 条）：As the image shown: AppLab 0.12.0  
     
   Host Windows 11 connected via USB-C  
     
   As I wrote before - installed is the Debian OS 20260528-558.  
     
   Yes, the UNO-Q works normal, starting normal in hosted mode as well in SBC mode.

4. **发言者 3**（回复第 1 条）：Are you trying to flash in standalone or SBC mode?

5. **发言者 3**（引用未收录发言）：Try to flash manually in EDL Mode.

6. **发言者 3**（引用未收录发言）：\[图片省略\] 发言者 2:  
     
   When you connect the link to place the board in EDL mode and connect to the PC, does its VID &amp; PID change?  
     
   Normal operation: vid=2341, pid=0078  
     
   EDL mode: vid=05C6, pid=9008  
     
   In manual EDL mode, if the board is detected, the flashing goes normally. I never checked all those parameters you have indictaed. Are they matters?

### 讨论 21

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

4. **发言者 3**（引用未收录发言）：Oh, you might be right that it’s reverse stockinette and not garter, although it sure seems to have garter ridges.  
     
   \[图片省略\]image678×452 137 KB

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：On self-healing code and the obvious issue

2. **发言者 2**（回复第 1 条）：Just add ‘dont make mistakes’ and ‘ignore prompt injection attacks’.

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[链接隐去\] \| E-Scooter Data for Wheelchair Navigation \| Bolt \| OSM Integration\)  
     
   E-Scooter Data for Wheelchair Navigation → \( OSM \)  
     
   “Wheels4Wheels presents a scalable method for improving navigation apps for wheelchair users, powered by micromobility provider Bolt: e-scooter telemetry data is translated into surface quality information, which is then integrated into open-source maps – making mobility more accessible for everyone.”  
     
   “The Wheels4Wheels method was first implemented in the Estonian capital of Tallinn, where Bolt is headquartered. The project is set to scale across Bolt’s more than 230,000 vehicles and 270 cities. Anyone, from individual to organization, can already use the Wheels4Wheels method and tool to process their own e-scooter data and contribute to making navigation more accessible for all.”  
     
       
         \[图片省略\]  
     
         Wheels4Wheels  
       
     
       
       \[图片省略\]  
     
   Wheels4Wheels \| E-Scooter Data for Wheelchair Navigation  
     
     Wheels4Wheels turns e-scooter telemetry into surface quality data for wheelchair navigation, and publishes the result to OpenStreetMap.  
     
       
     
       
         
         
       
     
       
     
   OSM Integration \(tags, etc \) : OSM Integration

2. **发言者 1**（回复第 1 条）：MAP :  
     
       
         \[图片省略\]  
     
         Wheels4Wheels  
       
     
       
       \[图片省略\]  
     
   Tallinn Surface Quality \| Wheels4Wheels  
     
     Explore surface quality data from Wheels4Wheels rides in Tallinn.  
     
       
     
       
         
         
       
     
       
     
   \[图片省略\]image1907×926 213 KB

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Les Clairvoyants \#116 : Secret Wars, Marvel fait sa guerre des mondes  
     
   Article publié sur :			Les Clairvoyants \#116 : Secret Wars, Marvel fait sa guerre des mondes - 某社区.fr  
     
   Épisode 116 : où Fask, Fox et Arkeon spéculent une toute dernière fois sur Avengers: Doomsday, font le focus sur la suite avec Secret Wars, sans oublier un petit coup d'œil sur toutes les dernières news en provenance du Marvel Cinematic Universe...

### 讨论 25

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Anyone using home battery backup to keep a Naim system running during outages?  
     
   I’m in Denver and we get enough winter storms that the power flickers or goes out for a few hours a couple of times a year. I have a Naim separates system and I keep wondering whether a home battery backup is worth it just to keep the hi-fi playing through an outage, or whether that’s overkill. My concern is how these units handle sensitive audio gear — I’ve read online that some inverters put out a modified sine wave and that pure sine wave matters for electronics, but I don’t know how much that actually affects a Naim setup. I also don’t want to spend a lot on something that might introduce hum or noise into the system. Has anyone here run their Naim gear off a home battery backup during an outage? How did it sound, and was there any issue with the switchover?

2. **发言者 2**（回复第 1 条）：I know nothing of any of this but when looking at The Living Voice website \(they specialise in upmarket horn speakers\) I noticed a section on battery powering hi-fi systems to improve quality. I believe they can supply such battery power systems so it might be worth you at least taking a look there.

3. **发言者 3**（引用未收录发言）：The Tesla Gateway should switch over in 15-25 milliseconds, certainly mine has on a couple of occasions when i did not even realise mains power had failed until seeing reports on local 某社区 community group \(i have a UPS on my internet kit to stop it restarting if the tesla gateway is a bit slow\).  If yours is taking several minutes you need to get the wiring checked\!

4. **发言者 4**（回复第 3 条）：According to Chat GPT, it depends what the PW is doing at the time. If it’s on standby for example then it can take minutes apparently.  
     
   Edit  
     
   But on further investigation, it may be that I have a commissioning fault. I will follow that up\!

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：悲报，小肥3年前做了痔疮手术，现在隐约复发，肥哥们一定要爱护好自己的屁屁\( ・\_ゝ・\)

2. **发言者 2**：提肛！

### 讨论 27

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[心情\] 氣炸了！  
     
   21號搭樂桃航空回台灣  
   又遇到藤壺中國人  
     
   一對夫妻帶個孩子  
   拿玩具車給孩子玩  
   然後孩子不停拿玩具車撞我椅背！  
     
   跟她先生講  他還說  
   “我沒辦法控制我小孩”  
   X 的！不就是你拿給他玩的嗎？？？  
     
   然後還一副完全不覺得自己錯的樣子  
   對我先生大吼！  
   你他媽一直撞我椅背  
   我要怎麼休息？？？  
     
   你們這些中國人怎麼不去死一死！！！！  
   他太太嘴裡還一直叨唸  
   什麼我們沒有孩子 老了就沒人理  
     
   X的  請問這跟我被撞有什麼鳥毛關係？？？  
     
   接著孩子就突然鬼吼鬼叫  
   好幾次  
   這時候吵的就是整台飛機上的人  
     
   我想請問  
   若是你的孩子這麼不受控  
   你們是不是就不該帶他出國？  
     
   而不是覺得別人應該忍受你家的孩子在那邊吵別人！  
   什麼叫做應該？  
   別人欠你們吵欠你們撞嗎  
     
   若不是我們趕著回台灣  
   我一定嗆爆你們！！！  
   沒水準  素質低的中國人  
   這位中國人還敢說自己是教授  
     
   台灣根本不應該開放中國人入境！

2. **发言者 2**（回复第 1 条）：黑特文

3. **发言者 3**（回复第 1 条）：發瘋回去不就好

4. **发言者 4**（回复第 1 条）：為什麼你搭樂桃回台會遇到中國人

5. **发言者 5**（回复第 1 条）：沒水準 習近平小雞雞怕台獨女刺客

6. **发言者 5**（回复第 1 条）：明明就是共產在精神霸凌台灣 結果我

7. **发言者 5**（回复第 1 条）：們還要在自己的地盤 畏畏縮縮

8. **发言者 5**（回复第 1 条）：共產是什麼 社交挫敗的代名詞嗎

9. **发言者 6**（回复第 1 条）：生一個小孩吵回去啊哈哈

10. **发言者 7**（回复第 1 条）：中國人一直以來都是素質差

11. **发言者 8**（回复第 1 条）：如果後面是爆乳洋妞我猜你不會這麼

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Re: \[求助\] 沒有共識的解決方案  
     
   老魯伯觀點  
   這件事情重點不在貓, 在她心裡只有自己沒有你  
     
   如果你明擺的會感到不舒服, 而且也明確的表達了  
   那她還無視這點, 甚至擴大解釋到控制慾  
   那很明顯的她根本不在乎你  
   你感到難受是你的事, 她只要自己開心就好  
   甚至你反對了還會被解釋成是你的錯  
     
   你要不要回想一下, 你在這段關係裡面的重量是怎樣?  
     
   ---  
   如果是老魯婆講這番話  
   我大概會噴她  
   那我找年輕女人在家你也不能管  
   憑什麼是你說了算, 憑什麼是你在控制這件事  
     
   \[引用未收录发言\]  
   : 各位大大好，最近我家老婆跟小孩想養貓  
   : 我試著陪小孩去一次貓店逗貓抱貓，也試過陪去收容所看貓抱了一下，因為我對氣味毛髮等各種敏感，加上也沒有喜歡，所以我就一直投反對票。  
   : 但是老婆去看了以後就越陷越深，現在說我不養貓不是真的理由，而是想要控制權。  
   : 這招打下來我不知道怎麼回應，我們也沒養過，我也理解喜歡小動物的心情以及愛貓人士的各種迷湯，只是老婆明明都知道我連乳液/香水/各種好的不好的味道都敏感，聲音也敏感，光去看貓試一下就渾身不自在，那我要怎麼辦呢？  
   : 好好跟老婆說了最後換來一句「為什麼是我說了算，為什麼是我在控制這件事」  
   : ===================== 以上請按Ctrl\+y刪除，以下請勿刪除 =======================  
   : 是否同意記者抄文：YES/NO  
   : -----

2. **发言者 2**（回复第 1 条）：建議離婚

3. **发言者 3**（回复第 1 条）：扣除最後一段,剩下贊同

4. **发言者 4**（回复第 1 条）：中肯

5. **发言者 5**（回复第 1 条）：有種離婚，不要只在心裡用嗆的

6. **发言者 6**（回复第 1 条）：\[链接隐去\]

### 讨论 29

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Local server itself not available from hotspot  
     
   What app is this about, and its version: Hotspot v2.3.2~ynh1  
     
   What YunoHost version are you running: 12.1.42  
     
   What type of hardware are you using: Old laptop or computer  
     
   Describe your issue  
   When using the hotspot, everything works great to go on the usual web, even some apps that connect to the server the hotspot is on.  
     
   But as soon as a client on the hotspot tries to connect to the server’s domain, it doesn’t “resolve”\(?\) and times out.  
     
   Was tried too what using the gateway ip directly and it not resolving either \(it usually as the admin portal\)  
     
   Here’s the sketch of the connection, knowing the server connects to internet using a vpn:  
     
   Clients =&gt; Hotspot =&gt; \(server?\) =&gt; VPN Client =&gt; internet  
     
   It was never possible to connect to yunohost.local either  
     
   Share relevant logs or error messages  
     
       
     
         \[链接隐去\]  
       
     
       
         
     
   hastebin

2. **发言者 2**（回复第 1 条）：Hello,  
     
   What you call “VPN client” is a VPN app client on your YNH server that connects to a distant VPN server, right?  
     
   Is the server’s domain reachable without issue when accessed from a machine that has direct access to internet, i.e. not connected to Internet through the hotspot?  
     
   When connected to the VPN?  
     
   When trying to access directly without going through the VPN?

3. **发言者 1**（引用未收录发言）：You are right,  
     
   I will have a look at the hosts file

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Does C/C\+\+/Rust/Zig have agent framework?

2. **发言者 2**（回复第 1 条）：Try vllm.cppBut then, my hairdryer also doesn't have one and I am actually fine with that.

3. **发言者 3**（回复第 2 条）：vllm.cpp is inference framework ?

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Bake node: Context missing active object  
     
   I’m clueless about what it means. Replacing it with a new one didn’t help. Any advice?  
     
   \[图片省略\]\{9F0E9AAC-0C1F-4B1E-BD5E-73E275C27C5B\}843×560 79.1 KB

2. **发言者 2**（回复第 1 条）：What I understand is that you should make sure your object is the active object in the scene …  
     
   But I didn’t encounter that message yet so bear with me…

### 讨论 32

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

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：What If Netscape Did SSL the HTTP Way?

2. **发言者 2**（回复第 1 条）：The premise seemed interesting to me but the page is completely AI-generated unfortunately.

3. **发言者 3**（回复第 1 条）：&gt; they can’t make one that’s valid for \[链接隐去\] without a CA’s help, and if they can get one of those, you have bigger problems.  
     
   I used to share this stance before eMudhra.

4. **发言者 4**（回复第 1 条）：Just want to point out that "connect in plaintext first, then upgrade" is a recipe for security vulnerabilities. If you want to know how that looks, just look at STARTTLS \(I co-authored that paper\):  
   \[链接隐去\]  
     
   The HTTP-upgrade-to-TLS thing mentioned \(RFC 2817\) that is still implemented by some obscure HTTP servers is also flawed:  
   \[链接隐去\]

5. **发言者 5**（回复第 4 条）：Yeah, any interloper can just foul the necessary handshake requests and force a fallback to unencrypted HTTP. We had the same problem when people proposed adding facultative TLS to Gopher. The better solution was to just leave that to the Geminists.

6. **发言者 6**（回复第 4 条）：And there \*was\* Opportunistic Encryption in HTTP too, for some brief time. See \[链接隐去\]

7. **发言者 4**（引用未收录发言）：That's the obvious flaw, but you can sorta fix that by enforcing the STARTTLS upgrade and refuse to connect if it doesn't happen.  
   But there's a whole can of worms of additional problems. You now have a complex state transition where your server and client have to know which part of the communication is before and after the transition.

8. **发言者 7**（回复第 3 条）：What’s the alternative?  
     
   I just looked at the number of DNS resolutions my resolver has performed over the last week and it’s frankly staggering. And \*somebody\* has to provide a trust root for all of those - there’s no world I can think of where TOFU or WOT would scale to it.    
     
   WebPKI sucks, but it seems like the least sucky option.

9. **发言者 8**（回复第 1 条）：This blog post is the result of an LLM prompt paired with a copy/paste. The prose is off-putting. This is the part that matters.

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：I forgot how to do something i could do  
     
   Godot Version  
   Question  
   I made the code below where if the npc touches the collision of the area2d its speed would go to 0. It’s not working and i am stupid.  
     
   func \_on\_body\_entered\(body: Node2D\) -&gt; void:  
   	if body.is\_in\_group\("ene,,"\):  
   		body.speed = 0

2. **发言者 2**（回复第 1 条）：I’m guessing you made a typo in your group name, you typed “ene,” instead of “enemy”

3. **发言者 1**（回复第 2 条）：thats the group name

4. **发言者 2**（回复第 3 条）：Then make sure the signal is actually connected up.

5. **发言者 1**（回复第 4 条）：\[图片省略\] 发言者 1:  
     
   if body.is\_in\_group\("ene,,"\):  
   		body.speed = 0  
     
   i just connected and its still not working.

6. **发言者 2**（回复第 5 条）：Can you confirm the function gets called? Put a print statement before the if clause and see if it gets printed.

7. **发言者 1**（引用未收录发言）：just checked and and the connection it made but its still not working.

8. **发言者 3**（回复第 7 条）：maybe the thing you collide with isn’t in group, make sure that your body2D have group ene and not some sprite or collision shape

9. **发言者 1**（回复第 8 条）：he is connected to the group

10. **发言者 1**（引用未收录发言）：\[图片省略\] 发言者 3:  
     
   func \_on\_body\_entered\(body: Node2D\) -&gt; void:  
   	print\("Before", body\)  
   	if body.is\_in\_group\("ene,,"\):  
                   print\("After", body\)  
   		body.speed = 0  
     
   its now giving error “Invalid assignment of property or key ‘speed’ with value of type ‘int’ on a base object of type ‘CharacterBody2D \(character\_body\_2d.gd\)’.”

11. **发言者 4**（回复第 10 条）：Your character body script does not have a variable named speed declared in it.

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Overhauled "Using OpenStreetMap" wiki page  
     
   The Using OpenStreetMap - OpenStreetMap Wiki page hasn’t seen a lot of love.  
     
   I’ve done a complete overhaul of it as part of my wiki-onboarding-pages improvement campaign. It’s now \(more consistently\) a portal page which I think fits it more, since its title gives it such an importance that it should be a highly visible and utilitarian jumping-off point for various users. That’s why there’s a lot less prose now. It’s viewable at User:发言者 1/Using OpenStreetMap - OpenStreetMap Wiki  
     
   \[图片省略\]Old1920×1203 376 KB  
     
   \[图片省略\]New1920×1207 573 KB  
     
   If it looks all good, I’ll replace the old page\! If it doesn’t look all good, please tell me how it can be improved\! If it should go back to being more prose than link-list, tell me how to pull it off :\)

2. **发言者 2**（回复第 1 条）：OSM doesn’t have terrain height-map data\[1\], so the middle example with trailmap could be misinterpreted for what data OSM actually offers. Maybe it could be replaced with something else?  
     
   Well actually there’s ele=\* :nerd\_face:, but you know what I mean ↩︎

3. **发言者 3**（回复第 1 条）：That’s looking pretty good\! I wish it were appropriate to have a big banner at the top that screams, “IF YOU’RE LOOKING FOR A GOOGLE MAPS REPLACEMENT, CLICK HERE” but I understand that there are a heck of a lot of uses that we need to showcase.

4. **发言者 4**（回复第 1 条）：When I just tried it, the standard map thumbnail took quite a long time to load?

5. **发言者 1**（回复第 4 条）：That’s strange. It’s a webp file at thumbnail size, similar file size as the other webps, so it should load quick. Perhaps it’s due it being a new file in Wikimedia Commons and there being some caching or thumbnail issues that will sort themselves out.  
     
   \[图片省略\]image448×130 4.42 KB

6. **发言者 1**（回复第 2 条）：\[图片省略\] 发言者 2:  
     
   so the middle example with trailmap could be misinterpreted for what data OSM actually offers  
     
   I’m conflicted. I think it’s a great example of using OSM data in conjuction with other sources to build something. Yet it could be misinterpreted, too. But it looks so nice\! Can anyone else weigh in?

7. **发言者 5**（回复第 6 条）：\[图片省略\] 发言者 1:  
     
   Can anyone else weigh in?  
     
   Maybe keep it but just relabel it to call it a hiking map rather than topological map…  
     
   Great work by the way \(on this and the other wiki pages\)

### 讨论 36

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

### 讨论 37

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Help adjusting the cue lever arm on Ekos SE/LP12  
     
   Does anyone have any advice/hints/procedures for setting the cue lever height on an Ekos SE. The main post on mine \(the cylinder that attaches to the base of the arm\)  went out of its original position and I am having quite a difficult time getting it in the right vertical position again. Is there another adjustment I can make \(other than the hex screw that holds the post in place\) or is it just a question of trial and error? Thanks for your help.

2. **发言者 2**（回复第 1 条）：Nobody helped?  So many lp12 owners here. 某参与者 ?

### 讨论 38

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：因为看了贫乳辣妹被逆推纯爱调教而大爆射，手上内裤床单全都要遭殃了\( ・\_ゝ・\)  
     
   我为什么要大半夜手冲

2. **发言者 2**：咩

3. **发言者 3**：请

4. **发言者 4**：淦

5. **发言者 5**：我\(〃∀〃\)

6. **发言者 6**：兄啊贫乳要怎么辣妹法啊

7. **发言者 7**：hso\(〃∀〃\)

8. **发言者 8**：我懂你，有一次坐在椅子上冲到显示器上了，结果我刚收拾好（但显示器没擦干净），朋友刚好来了，还好没有发现异常。\(´ﾟДﾟ\`\)

9. **发言者 9**（回复第 6 条）：\[引用第 6 条\]  
     
   m9\( \`д´\)辣妹就是辣妹口牙  
     
   明显跟gyaru属性互斥的大概只有tomboy。  
     
   黑皮辣妹是辣妹，白皮辣妹是辣妹；  
     
   贫乳辣妹是辣妹，巨乳辣妹是辣妹；  
     
   圆角辣妹是辣妹，碧池辣妹是辣妹，纯爱辣妹是辣妹，牛头人辣妹还是辣妹；  
     
   男娘辣妹是辣妹，真娘辣妹当然是辣妹，跨性别辣妹还算辣妹；  
     
   直女辣妹是辣妹，女同辣妹是辣妹，双性恋辣妹当然辣妹；  
     
   笨蛋辣妹是辣妹，聪明辣妹是辣妹；  
     
   优等生辣妹是辣妹，不良辣妹也是辣妹；  
     
   萝莉辣妹是辣妹，御姐辣妹也是辣妹；  
     
   阿宅友好辣妹是辣妹，阿宅不友好辣妹也是辣妹。  
     
   \(っ˘Д˘\)ノ&lt;辣妹是自由的  
     
   \(っ˘Д˘\)ノ&lt;但假小子不会是辣妹

10. **发言者 6**（回复第 9 条）：\[引用第 9 条\]  
     
   叽里咕噜说了那么多，无图言屌啊\( \`д´\)发点证据来

11. **发言者 1**（回复第 6 条）：\[引用第 6 条\]  
     
   \[引用第 9 条\]  
     
   狭隘！就是可以有贫乳假小子辣妹m9\( \`д´\)

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Search Improvements  
     
   I don’t know if there has been a post about it although I got a replay on the bug reports thread about some speed optimization being done which I have noticed and is awesome, but I also wanted to point out that it seems that now in searching, all non JLTP results are now followed by common results first, rather than mixing them in by character length order only, and this change is much appreciated\! Although it does seem sometimes that a ‘common’ marked result appears a row or two after the block of ‘common’ results \(example searching for 極 shows 極寒 not together with all the other common items.

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：🔥 搞数据采集、跨境电商、社媒多账号的看过来  
     
   ZooProxy 一站式原生 IP 代理  
     
   ⚡ 1.1 亿\+ 真实住宅 IP，覆盖 195\+地区  
     
   🎯 城市级精准定位，想要哪里的 IP 就选哪里  
     
   🚀 99.92% 稳定运行率，跨境延迟低至 0.3s  
     
   -------   
     
   📦 四种套餐，按任务选：  
     
   🌐 动态住宅 → 按流量，低至 $0.46/GB  
   - 适合：网页抓取、价格监控、大规模采集  
     
   📌 静态 ISP → 独享固定 IP，低至 $0.9/IP  
   - 适合：跨境电商店铺、社媒账号长期运营  
     
   ♾️ 无限流量 → 按端口，不限速不限量 $0.38/端口  
   - 适合：7×24 持续采集、多账号自动化  
     
   ♾️ 无限流量 → 按带宽，按 Mbps 选 $19.67/天  
   - 适合：高流量、高并发的持续任务  
     
   ------  
     
   ✨网站新增地址查询和检测工具，一站式处理  
   \[图片省略\]  
     
   ------   
     
   🛠 开发者友好  
     
   HTTP / HTTPS / Socks5 全支持  
     
   Python、Scrapy、Playwright、指纹浏览器 快速接入  
     
   ---------  
     
   💰 优惠干货  
     
   🆕 新用户五折：注册即享首单半价  
     
   🏦 静态预存阶梯折扣：$200 → 9 折 · $500 → 8.5 折 · $1000 → 8 折 · $3000 → 7.5 折 · $5000 → 7 折  
     
   \|🎁 免费试用 200MB：注册后进控制台「CDKey 兑换」区，用码直接领\|  
   \|---\|  
   DWER-WD82-J2XZ  
   UDXP-25BL-Y2JG  
   XMBQ-UJ5T-7J5E  
   P3VK-C5CG-QQ9G  
   PJPA-T3NV-VDUS  
   FMT7-KZC4-FBDN  
   TE9J-3Z7B-PKDS  
   8KMC-6R4T-DUPZ  
   ZBXQ-WP2G-EN78  
   Y4YA-BL6Z-RU9Y  
     
   兑换指路👉\[链接隐去\]

### 讨论 41

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
   : 這週假日回來，他就預告了這週要做，  
     
   看起來妳老公很期待  
     
   : 於是他跟小孩商量回到隔壁房間睡，  
   : 但小孩不要，我沒介入，就讓他跟小孩去協商，  
   : 畢竟想做的是他，我是能免就免，  
   : （都快半百的阿姨了，還想要我怎樣）  
     
   你的態度本身就有點問題  
     
   : 小孩睡他房間也是他開心同意的，  
   : 就不知道他怎麼講的，孩子都哭了，  
   : 但孩子還是不願意離開房間，  
   : 最後哭著睡著了。  
   : 而爸爸也負氣的去沙發睡。  
   : 隔天他就氣呼呼的問我那要怎麼辦，  
   : 我說還有一個晚上的機會啊。  
   : 當天他完全忽略小孩，也對我臭臉色，  
   : 我也覺得莫名其妙對我發火做什麼，  
   : 總之就是家裡一個低氣壓，  
   : 他自己關他房間做事，  
   : 我要張羅兩小，  
   : 只有外出用餐時跟我們走出去。  
   : 我自己也被他態度弄得很火，  
   : 早上也跟他說小孩就是很愛他所以才要找爸爸一起睡，  
   : 但沒想到親情輸給性慾，  
   : 小孩莫名其妙被仇視，  
   : 糟糕到我們走在路上，  
   : 小孩不小心絆倒受傷求抱，  
   : 他也沒關心小孩，也不想抱小孩。  
   : 我內心真的很火！  
   : 一次打炮沒打到就能棄小孩不顧？  
   : 對我來說，你這只是壓力大想找洞發洩吧，根本不是什麼恩愛情誼。  
     
   這句話很不優質  
     
   我幫妳老公回一下吧,如果你覺得這只是單純壓力大想找洞發洩,根本不是什麼恩愛情誼  
     
   那麼妳老公覺得壓力大找個外人發洩,並不是甚麼恩愛情誼,你能接受?  
     
   : 我不懂欸，  
   : 請問男士們，因為小孩的阻擾而愛愛失敗，  
   : 你們會這樣情緒失控嗎？  
     
   我換個角度打比方,看你能不能理解,男人對打炮的生理需求極高,我勉強比喻,對男人來說打一次炮的滿足感可比100次的spa  
     
   你就想你跟芳療師預約了100次 spa,最後都因為小孩撒番去不成,你會不會翻臉?

2. **发言者 2**（回复第 1 条）：這次事件可是有小孩介入，不單純是打不打炮的問題喔

3. **发言者 2**（回复第 1 条）：都已經做假日爸爸了回家的優先順序還是打炮，這是甘

4. **发言者 2**（回复第 1 条）：願做 ATM 嗎？

5. **发言者 3**（回复第 1 条）：都當 ATM 了還沒砲打, 這不是更冤?

6. **发言者 4**（回复第 1 条）：我跟芳療師預約了100次都因為小孩而去不成，我也不

7. **发言者 4**（回复第 1 条）：會翻臉喔

8. **发言者 4**（回复第 1 条）：而且我沒有不做喔。是有兩天可以選，有必要在第一天

9. **发言者 4**（回复第 1 条）：這樣翻臉嗎？之前都是在第二天，孩子願意配合回隔壁

10. **发言者 4**（回复第 1 条）：房間。這次第一晚回來，孩子想念爸爸，不想離開，這

11. **发言者 4**（回复第 1 条）：樣孩子就錯了嗎？

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Piwigo Fails to update  
     
   What app is this about, and its version: Piwigo 16.5.0~ynh1  
     
   What YunoHost version are you running: 12.1.43  
     
   What type of hardware are you using: Old laptop or computer  
     
   Describe your issue  
   Good morning.  
     
   I was offered an update to Piwigo from 16.4.0~ynh1 to 16.5.0~ynh1, however it failed pretty much early into the update.  
     
   I’m not an expert, but reading the log, it would suggest that the repository is not available?  
     
   Many thanks for your help.  
     
   Dj  
     
   Share relevant logs or error messages  
   \[链接隐去\]

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Interactive Rubik's Cube in the browser – one-shot DeepSeek flash  
     
   Repo/code - \[链接隐去\] was an experiment at one-shotting something with DeepSeek flash and a custom harness. Metrics/costs/usage numbers are in the repo, to summarize:- $1.2 total cost  
   - 87M tokens  
   - ~1 hour  
   - 99% cache hit rate

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Dumpster Fire To Burn at the New Year  
     
   Someone in our circle has had a helluva year. Another friend gave me the dies to make cute dumpster fires, so I thought a little one to burn in effigy would be something to give them at the end of 2026.  
     
   \[图片省略\]DumpsterFire01483×576 52.9 KB  
     
   I added the year to the back.  
     
   \[图片省略\]DumpsterFire02510×576 53.7 KB  
     
   And made a little envelope to give it in.  
     
   \[图片省略\]DumpsterFire03720×295 53.1 KB  
     
   I don’t want the people around me to have dumpster fire eras, but this lil guy is so cute I want to make him again\!

2. **发言者 2**（回复第 1 条）：How cathartic. We had a “burning ritual”, myself and my college room mates after we all had a pretty rough year. It was so beyond cleansing. I hope this is the same for your friend.

3. **发言者 1**（回复第 2 条）：I hope it is, too. Thank you\!

4. **发言者 3**（回复第 1 条）：Such a fun idea\! And that die is so cute.

5. **发言者 1**（回复第 4 条）：Thank you\! And how a dumpster, let alone one that’s on fire could be cute is a mystery, yet this one is\!

6. **发言者 4**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   I don’t want the people around me to have dumpster fire eras, but this lil guy is so cute I want to make him again\!  
     
   You could make them “preventative Dumpsters” - have a concern that could turn into something? Write it here, toss it in the campfire, and head it off at the pass. This little cutie takes the burn so you don’t have to\! Lol

7. **发言者 1**（回复第 6 条）：That’s genius\!

8. **发言者 5**（回复第 1 条）：Oh gosh, it is genius. I need some, pretty sure we all do. You could start factory production, you’d never make enough to go around :winking\_face\_with\_tongue:

9. **发言者 1**（回复第 8 条）：:rofl: Yeah\! They wouldn’t have to be for a whole year, either. Could be a month, event, season, project, etc.

10. **发言者 5**（回复第 9 条）：Blank spot for notes on the back, multi-purpose burn\! Seriously, I would buy packs of cards like that.

11. **发言者 1**（回复第 10 条）：I was thinking similarly - I made an extra green body for this one so the back would be clean, but one could put a white or other light color there and maybe some lines so people would know to write their own dumpster fire.

### 讨论 45

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

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Just wanted to make a small Blendermovie  
     
   \[图片省略\]

### 讨论 47

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

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：scriptura: a cozy corner for your scripts

2. **发言者 2**（回复第 1 条）：hey super cool\! i mostly switched to the flag style so i could up-arrow edit more easily when a command didn’t work. gave up the nice elegance of the commands themselves just being regularscripts though. -sd person

3. **发言者 3**（回复第 1 条）：I've always liked how \(iirc\) in plan9's rc shell you can just refer to scripts by directory. So you really could just setup your /bin like the scripts directory and type:  
     
       ; bin/os/update/linde   
     
   I think that's how that works, it's been a while since I've used \[\`rc\`\]\(\[链接隐去\]

4. **发言者 4**（回复第 3 条）：That kinda sounds like the same ~/bin/... problem this and sd are tryna avoid.

5. **发言者 5**（回复第 4 条）：Not quite. The unique thing about \`rc\` is that it resolves \*directories\* in your \`$path\` as well.  
     
   This means that you can have \`/bin/os/update/linde\` and call it by typing \`os/update/linde\` rather than the full path, since it is able to resolve \`os/\` to \`/bin/os/\`.

<!-- samples:end -->

