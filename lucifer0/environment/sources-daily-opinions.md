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

采集时间：2026-11-26 15:45:41（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Chilling day  
     
   \[图片省略\]Chilling\_day\_InU\_uni3456×1944 3.31 MB

2. **发言者 2**（回复第 1 条）：Is this all 3D, or is there some painting here?

3. **发言者 1**（回复第 2 条）：nop, all is 3D

4. **发言者 3**（回复第 3 条）：Super chill day to be a chilling day :smiling\_face\_with\_sunglasses: Love the scene, nice work\!

### 讨论 2

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

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：欸我艹\( ´ρ\`\)怎么会有香蕉这种几乎完美的水果  
     
   好吃，自带包装把皮一扒就能吃，没有籽没有核，还是优质碳水

2. **发言者 1**：\(\*´д\`\)唯一可惜的就是不太好储存

3. **发言者 2**：能懂！不用吐籽不用削皮，还没有那种会把自己的手搞的黏糊糊的汁水，太权威了  
     
   我之前特喜欢吃苹果蕉，哎呀感觉口感比香蕉还棒，po后面可以试试\(=ﾟωﾟ\)=

4. **发言者 3**：提子也很好\(=ﾟωﾟ\)=

5. **发言者 4**：\( ﾟ∀。\)没经过选育的香蕉:请输入文本

6. **发言者 5**：上次线上买香蕉收到之后一堆果蝇，什么时候能解决一下不好保存这个问题就好了\( ﾟ∀。\)

7. **发言者 6**：还对便秘问题立竿见影

8. **发言者 7**：其实现在的香蕉已经是次一档的华蕉了  
     
   在以前有一个香蕉种类叫大麦克，现在的香蕉香精就是复现的大麦克的香味。  
     
   据说又香又甜，又耐储运，可惜因为无性繁殖导致对特定病害完全没有抵抗力，最后灭绝了。  
     
   在美国南部到哥伦比亚北部还有少量种植，不过已经无法商品化了，只能说是用于保存种群基因样本。  
     
   而且当代的华蕉其实也是无性繁殖的，开始有病害了。  
     
   \( ´\_ゝ\`\)

9. **发言者 4**（回复第 6 条）：\[引用第 6 条\]  
     
   可以试试吊起来，吊在阴凉通风的地方，当然买了就猛猛造，两下吃完就行了

10. **发言者 8**：肥奶总是对小肥说，香蕉装到系住口的塑料袋里就会延缓变黑\( ﾟ∀。\)  
     
   不知道是不是真的\( ﾟ∀。\)

11. **发言者 5**（回复第 9 条）：\[引用第 9 条\]  
     
   买回来是青的，于是就放了几天，果蝇迅速出生\(\|\|\|ﾟДﾟ\)  
     
   果然还是得去线下店买啊，吃多少买多少\( ﾟ∀。\)

### 讨论 4

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：最近做了一个有趣的小网站：  
     
   \*\*Curio Card Atlas（好奇心卡片图鉴）\*\*  
     
   我尝试把知识探索、抽卡游戏和数字收藏结合起来，让认识世界这件事变得更有趣。  
     
   🐼 探索珍稀动物与神奇生物    
   🌌 发现遥远的星系与宇宙奥秘    
   🏔️ 欣赏世界各地的自然奇观    
   🎨 收藏世界名画与艺术作品    
   🏛️ 了解历史文物与人类文明    
     
   每次打开卡包，都是一次未知的发现。每张卡片背后，都有一段值得了解的知识。  
     
   网站接入了维基百科开放媒体资源、NASA 及多家博物馆的开放馆藏资源，并持续自动更新卡片。  
     
   完全免费，无需注册，打开就能玩。大人可以满足好奇心，小朋友也可以边玩边学习。  
     
   希望把它慢慢做成一个\*\*可以玩的世界百科全书\*\*。  
     
   Discover the world, one card at a time.  
     
   一张卡片，一次发现，收藏整个世界。  
     
   🔗 \[链接隐去\]  
     
   欢迎大家体验，也欢迎提出建议！

### 讨论 5

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

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：//-Planet: Ani \| play-test \| Steam Chat  
     
   Hi, I’m now about to start having live play tests for the game to test out multiplayer and the game, so I’m looking for volunteers to join and test the game\! And also at the release of the game when I release it on steam, a random 10 people will be picked and given a free copy of the game for play testing\! Join the GC to get a chance to play-test or bug-test the game\! you will get a ping if the play-tests are live\! The link is Steam Community :: Chat Invitation \!

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：MILANA в RigaMall: пилотное уточнение телефона и email в OpenStreetMap  
     
   Здравствуйте\! Пишем от имени MILANA. Хотим вручную сверить сведения о действующих магазинах из нашего корпоративного каталога. Закрытые магазины в работу не включаем.  
     
   Предлагаем начать с объекта MILANA в ТРЦ «Рига Молл» \(Красногорск\): Node: Milana \(6989068585\) \| OpenStreetMap  
     
   Сейчас телефон и почта объекта совпадают с контактами филиала XL. Для RigaMall предлагаем указать \[数字标识隐去\] и \[联系方式隐去\]. Источник — официальная карточка филиала: MILANA — РигаМолл, Красногорск . MILANA разрешает использовать эти контактные данные в OSM. В пилоте меняются только телефон и email существующего объекта.  
     
   Подскажите, пожалуйста, уместно ли внести эту точечную контактную правку до обсуждения дальнейшей серии? Будем благодарны за замечания по источнику и тегам. Публичный контакт для ответов — MILANA sh: MILANA sh \| OpenStreetMap

2. **发言者 2**（回复第 1 条）：конечно, уместно, правьте.  
     
   если что, вы сами и внесли эти неверные телефон и емэйл :\)\) Node History: Milana \(6989068585\) \| OpenStreetMap

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Seahelm – Native Mac app for running Claude Code agents in parallel

### 讨论 9

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

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Scott Aaronson on recent complexity theory AI achievements

2. **发言者 2**（回复第 1 条）：A top of the field theoretical computer science and quantum computing professor, having basically the same reaction to all this as I, a random guy on the internet, did.  
     
   it's wild. we are in wild times.

3. **发言者 3**（回复第 2 条）：FWIW Scott Aaronson worked at OpenAI for a couple years, on theoretical foundations of AI safety.  So he's not a disinterested observer, though I have no reason to think he's not genuine here

4. **发言者 4**（引用未收录发言）：Somebody else wrote a paper refuting it: \[The Invalidity of "The Invalidity of Alpöge's Proof of the Riemann Hypothesis"\]\(\[链接隐去\]  
     
   \[某社区\]\(\[链接隐去\] is more to the point:  
     
   &gt; Nielsen is a crank and her papers should not be taken seriously.

5. **发言者 5**（回复第 1 条）：&gt; Will this improve the reader's next program? Will it deepen their understanding of their last program? Will it be more interesting in five or ten years? Is this compelling material that will seed a discussion, or is it just an artifact?   
     
   \[About\]\(\[链接隐去\]  
     
   Are we just gossiping what is effectively some guy's blog about his dinner party now?

6. **发言者 6**（引用未收录发言）：Nielsen could demonstrate that they are correct by showing the bug in leans transitive axiom discovery algorithm. Lean reports that Alpöges proof doesn’t depend on assuming RH is true as an axiom.

7. **发言者 7**（引用未收录发言）：This has been discussed at length. The Lean community has published a blog post stating that the Lean proof is definitely, 100% correct: \[链接隐去\]  
     
   These are the world's expert on Lean. It really doesn't get clearer than this.

8. **发言者 1**（回复第 5 条）：This not “some guy”. He’s a top talent in complexity theory. The reaction that top people in math and CS are having to these events is interesting to observe in my opinion. For sure it can “seed a discussion” and be “interesting in ten years”, since you want to quote.

9. **发言者 5**（回复第 8 条）：It'll be interesting in 10 years that rationalist/effective altruist Aaronson was excited for the future of AI? Will that seed a discussion that improves your next program?

### 讨论 11

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

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：General measurements discussion for GraphWorks visualizer  
     
   Share and discuss your impressions of different measurements in the new GraphWorks visualizer tool, whether you’ve actually listened to the headphones or not \(which is normally taboo on most audiophile forums\).  
     
   I have not listened to most of the headphones in this tool btw. So most of my impressions will be based on the 5128 graphs, and sometimes some virtual listening. So they should be taken with a grain of salt.

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[討論\] 女權團體要不要出來捍衛 洋成0 的八卦  
     
   如題，今天最紅的新聞  
     
   台北的偶像 洋成0  
     
   原本是一位性魅力爆棚的同志男神  
     
   今天被爆出竟然是是同志，還是0……  
     
   原本領養小孩被塑造多善良多有愛心都算了  
     
   但他老婆這樣算是被騙婚嗎？情何以堪……  
     
   女權團體有站出來捍衛這種議題過嗎？

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Modulino and Lorem Ipsum  
     
   \(1\) Is Modulino and its libraries unsupported, or has it lost popularity to the point of its device categories being placed in "Recycle Bin" category \(due for removal\)?  I see Modulino as the perfect "no fuss" lesrning tool. Bummer to see it gone.  
     
   \(2\) This Recycle Bin category seems to have its place-holder data still intact, rather than its purpose described.  
     
       
         
           
            Projects Discussion and Showcase

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Cream animation  
     
   Hi everyone\!  
     
   I’m trying to create a cream simulation in Blender using the FLIP Fluids addon, but I’m struggling to get the liquid to flow smoothly. I’ve tried adjusting the simulation resolution, but the results still aren’t as smooth as I want.  
     
   Does anyone have experience creating cream-like liquid simulations with FLIP Fluids? I’d really appreciate any tips or suggestions on how to achieve a smoother, more realistic flow.  
     
   Thanks in advance\!  
     
   \[图片省略\]Screenshot 2026-11-25 1711422558×1484 877 KB

2. **发言者 2**（回复第 1 条）：Hi, this is probably due to high viscosity settings, try reducing it slightly.

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Snappymail upgrade - with two mail account  
     
   What app is this about, and its version: 3.1.4~ynh1  
     
   What YunoHost version are you running: 12.1.43  
     
   What type of hardware are you using: Virtual machine  
     
   Describe your issue  
   Hello,  
     
   After upgrade,  
     
   current\_version: 2.38.2~ynh4  
     
   new\_version: 3.1.4~ynh1  
     
   when i switch from one mail account to another, a password is ask and it refuse to connect to the second  account…  
     
   Same error, at every upgrade of snappymail since a long time  
     
   What the best way to avoid this issue ?  
     
   Thank’s  
     
   Share relevant logs or error messages  
   Account error: Switch vers le compte “\[联系方式隐去\]” a échoué

2. **发言者 2**（回复第 1 条）：Hello,  
     
   \[图片省略\] 发言者 1:  
     
   when i switch from one mail account to another, a password is ask and it refuse to connect to the second account…  
     
   Please provide more context details - what do you call “switching”/where do you try doing this in Snappymail?

3. **发言者 1**（引用未收录发言）：Hello 发言者 2  
     
   I’ve not change any password account, so this is not the reason of this problem.  
     
   But, you give me the solution :  
     
   remove the .cryptkey file  
     
   now I switch to the second account, I type my password, it is recorded  
     
   I switch again to the second account, I have my mails \!  
     
   Thank’s a lot \!

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：看到了一套国民党套餐\( ﾟ∀。\)  
     
   饮品：

2. **发言者 1**：小菜

3. **发言者 1**：主食

4. **发言者 2**（回复第 3 条）：\[引用第 3 条\]  
     
   这个是真好喝，有点中西菜式结合的味道\( ﾟ∀。\)总之感觉很奢靡的生活才能创造出这种菜式

5. **发言者 3**：讲解食\|∀ﾟ

6. **发言者 4**：酱（菜）结（合）了主（食）

7. **发言者 5**（回复第 6 条）：\[引用第 6 条\]  
     
   ？！菜和食？！

8. **发言者 6**（回复第 4 条）：\[引用第 4 条\]  
     
   单看图片不就是山药百合豆浆粥吗，奢靡在哪\( ﾟ∀。\)

9. **发言者 7**：怎么都是喝的没有硬菜

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Interview with Gentoo Linux Developer Michał Górny on not using LLMs  
     
   In case anyone’s interested, I interviewed Michał Górny, a long-time open source developer on why he doesn’t like to use LLMs in software development:  
     
       
         \[图片省略\]  
     
         \[链接隐去\]  
       
     
       
       \[图片省略\]  
     
   Interview: Michał Górny on not using LLMs in Gentoo  
     
     Why this Gentoo Linux develooper prefers not to use LLMs

### 讨论 19

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：最近刷到一句话，感觉醍醐灌顶，“人生就是看谁先找到自己”  
     
   我的理解是，找到自己“享受”的状态，自洽地工作，生活，社交，独处...

### 讨论 20

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

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Godot Testing Harness  
     
   One of my biggest gripes with Godot as a software engineer was the lack of a good testing framework.  Not that this is good but I like it.  I wrote a testing harness for Godot that I’ve been using it for a while and decided to post it on github and share it.  
     
   Its an add-on for Godot that allows you to write unit tests, integration tests, and my favorite part, take “snapshots” of Godot.  This is where you can take a screen shot or a recording of gameplay and see the debug elements as if you were debugging step by step. But you can do this after the fact.  
     
   Hope you guys enjoy it,  
     
       
     
         \[链接隐去\]  
       
     
       
         
     \[图片省略\]  
     
     GitHub - 发言者 1/godot\_snapshot  
     
       Contribute to 发言者 1/godot\_snapshot development by creating an account on GitHub.

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: I made a daily quiz game on AI bubble to unwind during stressful times  
     
   Hello HN,It's been a rough couple of days and weeks on the tech world \+ tech stock markets, so to unwind a little bit I created this fun game that presents 5 headlines every day and you need to pick your confidence on whether it's Real or it's a "Bubble".Note that I don't want to make a judgment call on whether we are indeed in an AI bubble or not, and whether it's collapsing or not. The name and the game goes both ways and could support both cases imo. And the whole point of the game is exactly to try getting out of the whole speculation and have a little of fun.There is no back-end, no auth, no account. It's just a JS bundle updated daily for the new questions to pop up. Your daily stats are stored in localStorage so if you want to keep your stats you need to use the same device evey day.Cheers,  
   Guilherme Perotta

2. **发言者 2**（回复第 1 条）：your game to unwind has a very short timer?

3. **发言者 1**（回复第 2 条）：Hmm. That's a good point. I put it short because I didn't want people to google it. But you are right I don't want to put too much pressure. I think 30s should be good?

### 讨论 23

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

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：The beauty of CSS mixins

2. **发言者 2**（回复第 1 条）：I had been asking and fighting for mixins for a decade now.  
     
   I am so happy we finally got composition in CSS. This is the kind of stuff that give me back hope in software.  
     
   Thank you to everyone involved in bringing them to life.

### 讨论 25

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Knitting group potluck soup that holds up in a slow cooker?  
     
   Our Sacramento knitting group meets Saturday afternoons and we take turns bringing something for the table. I have a slow cooker and was thinking about an easy lentil soup since it can sit on low for a few hours while we work through our projects. My concern is timing and texture: will the lentils turn mushy if they stay warm for three or four hours, and does the soup thicken too much as it sits? I also do not want to soak anything overnight because I usually decide what to make the morning of. I found a one-pot lentil soup recipe online that says no soaking is needed, but I have not made it and cannot speak to how it behaves in a slow cooker rather than on the stove. Has anyone brought lentil soup to a knit night or potluck and kept it warm for hours? Any tips on liquid ratios or when to add vegetables so they do not fall apart? I would appreciate hearing what worked.  
     
   I found this Easy Lentil Soup Recipe \(One Pot, No Soaking\) while searching for no-soak options, but I still can’t tell how it holds up on low for three or four hours without turning to mush. Anyone tried keeping lentils warm that long?

### 讨论 26

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

### 讨论 27

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Magic 8 ball or Crystal ball  
     
   \#include &lt;LiquidCrystal.h&gt;  
     
   LiquidCrystal lcd \(12,11,5,4,3,2\);  
     
   const int switchPin = 6;  
     
   int switchState = 0;  
     
   int prevSwitchState = 0;  
     
   int reply;  
     
   void setup\(\)\{  
     
   lcd.begin\(16, 2\);  
     
   pinMode\(switchPin, INPUT\);  
     
   lcd.print\(" Ask the"\);  
     
   lcd.setCursor\(0,1\);  
     
   lcd.print\("Crystal ball"\);  
     
   \}  
     
   void loop\(\)\{  
     
   switchState = digitalRead\(switchPin\);  
     
   if \(switchState \!= prevSwitchState \)\{  
     
   if \(switchState == LOW\)\{  
     
   reply = random\(8\);  
     
   lcd.clear\(\);  
     
   lcd.setCursor\(0,0\);  
     
   lcd.print\("The ball says :"\);  
     
   lcd.setCursor\(0,1\);  
     
   switch\(reply\)\{  
     
   case 0:  
     
   lcd.print\("Yes"\);  
     
   break;  
     
   case 1:  
     
   lcd.print\("Most likely"\);  
     
   break;  
     
   case 2:  
     
   lcd.print\("Certainly"\);  
     
   break;  
     
   case 3:  
     
   lcd.print\("Outlook good"\);  
     
   break;  
     
   case 4:  
     
   lcd.print\("Unsure"\);  
     
   break;  
     
   case 5:  
     
   lcd.print\("Negative"\);  
     
   break;  
     
   case 6:  
     
   lcd.print\("Doubtful"\);  
     
   break;  
     
   case 7:  
     
   lcd.print\("No"\);  
     
   break;  
     
   \}  
     
   \}  
     
   \}  
     
   prevSwitchState = switchState;  
     
   \}

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Fox Sprite \(OviManic\) 3D recreation 2026  
     
   \[图片省略\]  
     
   \[图片省略\]  
     
   \[图片省略\]  
     
   \*Andrew Head as Rupert Giles Voice\* Previously-- \*Normal Voice\* on me doing blender stuff \(November of 2024\) I recreated OviManic’s Fox Sprite character from Ovivixen. Re-redid it, as I kind of did it no justice being so green at blender.  
     
   \[图片省略\]  
     
   \[图片省略\]  
     
   \[图片省略\]  
     
   Used this as an opportunity for more NPR rendering and rigging practice-- Finally busted out grease pencil and I LOVE IT OMG. Not real-time friendly at all, but surprisingly powerful and easy to get decent results out of the box.

### 讨论 29

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：有没有线上配镜相关的串，最近想换眼镜了但是实体店配镜都太贵了，想知道线上配镜应该注意哪些事项\( ﾟ∀。\)  
     
   jp

2. **发言者 1**：jp

3. **发言者 1**：jp

4. **发言者 1**：分享图片

5. **发言者 1**（引用未收录发言）：\[引用未收录发言\]  
     
   好肥哥配镜店有没有啥要注意的，我看淘宝上价格不一，该选哪种比较好\( ﾟ∀。\)7

6. **发言者 2**：我印象中，镜框不值钱，镜片看品牌，一般就那几个，什么蔡司依视路啥的，不同品牌类型镜片价格大差不差，什么防蓝光这种功能性说法和普通镜片差别不大。  
     
   可以按价格和镜框类型选，如果度数高，不喜欢/不接受厚的，可以选折射率高的更贵的款；如果度数还在缓慢增长，可以看看便宜的，毕竟估计几年后还需要再配。

7. **发言者 3**：线上配镜如果不是特别急的话不要原价配，可以加些羊毛群，依视路隔三岔五做活动，二百左右就能配了\( ﾟ∀。\)这这种羊毛群应该能拿到不少返佣所以发的很勤，我该码的都码了应该不算广告吧。

### 讨论 30

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

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：书接上回 \(\[链接隐去\]  
   昨晚加班干活到 11 点多才回家，到家后发现女朋友还没睡，状态不太好。她和我吐槽他们现在几乎只能拿到基本工资了,绩效差不多全部扣完，比２个月前更加变本加厉。  
   想到她工作了 6,7 年，现在拿到的钱比她刚毕业的时候还少，她就焦虑的不行。我女朋友平时有空就会学习技术，ai 流行了也将 ai 融合进工作中增加效率，没想到最后还不如应届的时候。他们办公室的其他人也有在抱怨，有些小年轻吐槽快交不起房租了。最惨的是那些有房贷有车贷还有孩子要养的，只能去舔领导，让领导开心点给自己多打点绩效。听了这些，我感觉有种深深的无力感，打工人真的太难了，想凭技术老老实实的赚点钱真不容易。🙁  
   我现在最庆幸的是，还没有买房和我有个还算稳定的工作，如果女朋友失业了，我们也不至于马上过不下去。  
   真的一年比一年难了。

2. **发言者 2**：蛋糕越来越小，再怎么舔领导也只是减缓那一天的到来罢了。。。

3. **发言者 3**：薪资结构随意调整， 不能仲裁吗， 劳动合同里没写吗？

### 讨论 32

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

### 讨论 33

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

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Is RSA in Jeopardy?  
     
   I've seen numerous anecdotal reports that at least 2 of the AI labs have figured out factoring large prime numbers.1. Has anyone else heard this? / Is it true?2. Given most of the Internet relies on RSA, now what?

2. **发言者 2**（回复第 1 条）：2. It sucks to live in a world without public keys, but it is what is is. We may need to return to 1980's style banking sooner or later. Checks in the mail. Hop in your car and meet people when you need to conduct business.

3. **发言者 3**（回复第 2 条）：Maybe trusted parties brokering giant one-time pads is the only way....

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Needles, Haystacks, and Numbers Between 0 and 1

2. **发言者 2**（回复第 1 条）：this is a solution with known residual risk and not a an asymptotically improving one as human curation would be. please please please take this wonderful language and build a comprehensive standard library for it. use go or even c\+\+ or ruby as inspiration.

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Nerd Commander IV  
     
   \(Thema vom Verfasser gelöscht\)

### 讨论 37

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

### 讨论 38

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

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Pink Reverie  
     
   \[图片省略\]24 Small3024×4256 4.76 MB  
     
   \[图片省略\]Screenshot 2026-11-25 220748547×731 441 KB

2. **发言者 2**（回复第 1 条）：WHAT\! this looks so real beautiful work

3. **发言者 1**（回复第 2 条）：Thank you :smiley:

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：好无聊\( ›´ω\`‹ \)求前十个回复，词语、短语、成语、短句都可以，只要不超过十个字就行。我试试能不能随手写段内容，把这十个回复都包含进去，还能逻辑通顺\(　ﾟ 3ﾟ\)

2. **发言者 2**：日日夜夜反反复复失败

3. **发言者 3**：来都来了

4. **发言者 4**：前前后后碌碌庸庸废材

5. **发言者 5**：往事越千年，魏武挥鞭

6. **发言者 6**：我想拉史

7. **发言者 7**：浪漫一如初见  
     
   //=͟͟͞͞\( 'ヮ' 三 'ヮ' =͟͟͞͞\)

8. **发言者 8**：前列腺高潮真的存在吗

9. **发言者 9**：撸一撸到底吧

10. **发言者 10**：肯德基疯狂星期四

11. **发言者 11**：疯狂星期四vw50

### 讨论 41

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Input profile to working profile  
     
   Maybe I am doing something wrong but When I edit a raw file in darktable and use the input profile module I select a camera profile \(that I created myself\)  and then choose a working profile.  
     
   When I have an image with relatively low saturated colors I expect that whatever working profile I select the look of thei mage should not change because it is simply converted into the working profile. But when I select a different working profile the look of the image changes drastically.  
     
   What is going wrong here? Doese darktable not use my system monitor profile to correctly display the image?  
     
   Any thoughts?

2. **发言者 2**（回复第 1 条）：Some modules, like AgX and maybe sigmoid, can apply curves in the working profile. Linear, unbounded operations like exposure don’t care about the profile.

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：本人不是专家，之前炒股小亏过，仅发帖请教。目前看历史 k 线，创业板指和中证 500 都处于阶段性低位，还要跌多少到底部我不知道，但是向上空间还是很大的。如果现在入场、分批买入这两个的 ETF，不加杠杆、拿闲钱投入、持有 3 至 5 年年以上，预期收益达到 20% 应该不算异想天开吧？长期持有这种宽基指数风险也不大，这样年化收益能到 5 个点左右，是不是也算是个不错的理财方式？

2. **发言者 2**：大盘到 1500，可以全仓入

3. **发言者 1**：这个感觉有点难等

4. **发言者 3**：还没到 3200，3100，建仓都不是时候

5. **发言者 4**：那我建议你避免梭哈 btc

6. **发言者 5**：目前大盘屡创新低，不建议盲目抄底

7. **发言者 6**：任何市场，你定投 30 年，都可以赚。前提是不要下车

8. **发言者 7**：首先，得有底

9. **发言者 8**：3-5 年内，在这个位置买入赚钱问题不大，关键是你得忍住不要看到跌了就害怕

10. **发言者 1**：我倒是没准备定投，我是准备这几个月分几次买入，然后一直持有，等涨到 20% 以上之后分次卖出

11. **发言者 9**：还有人有钱抄底那就不算铁底

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

1. **发言者 1**：solving animation issue running on editor  
     
   Godot Version  
   Godot v4.7.2  
     
   Question  
   I’ve been trying to make a game, but when I try to run it on the editor, it appears this:  
     
   \[图片省略\]Ảnh màn hình 2026-11-22 lúc 18.21.281368×368 39.8 KB  
     
   This is my line of code:  
     
   \[图片省略\]Ảnh màn hình 2026-11-22 lúc 18.21.591074×744 78.6 KB  
     
   I tried to add a suitable ‘idle\_right’ animation and put the animatedsprite2d back to the box to try again, but the issue persists. I’d appreciate the help greatly.

2. **发言者 2**（回复第 1 条）：How/where are you adding the animation? Can you post a screenshot?  
     
   Also, ensure that the name of your animation does not contain any uppercase letters.

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Fondue und 193. OSM-Stammtisch Zürich, Fr 11. Dezember, ab 18:30  
     
   Das jährliche Fondue essen und der nächste OSM-Stammtisch in Zürich findet am Freitag, dem 11. Dezember statt.  
     
   Wir treffen uns in der Bitwäscherei, ein Hackerspace in der ehemaligen Zürcher Zentralwäscherei. Der Hackerspace ist ein paar Fuss-Minuten vom Bahnhof Hardbrücke entfernt \(~300m laut OSRM\).  
     
   Datum: Mittwoch, 11. November 2026  
     
   Zeit: Ab 18:30 Uhr  
     
   Ort: Bitwäscherei, Neue Hard 12, Zürich  
     
   Weitere Infos wie üblich im OSM-Wiki.  
     
   Zur Planung des Fondues gibts eine Umfrage: Poll - Sosm Fondue - nuudel

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Just Dashboard, open-source Linux full management dashboard

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Deadlock Animatic - Vyper x Whatever she can get  
     
   \[图片省略\]  
       
     
   Grease pencil \+ compositor \+ video editor :ok\_hand:

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：A ring with tourmaline and topaz  
     
   \[图片省略\]ring 24112026\_11920×1080 2.08 MB  
     
   \[图片省略\]ring 24112026\_21920×1080 1.55 MB  
     
   \[图片省略\]ring 24112026\_31920×1080 1.96 MB

2. **发言者 2**（回复第 1 条）：Sooo pretty i love the center stone\!

<!-- samples:end -->

