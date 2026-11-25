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

<!-- intake-request:intake-1683a2483a844d62b74e080b75cb0cc6 -->
<!-- samples:start -->

采集时间：2026-11-25 12:04:02（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Buzz left channel  
     
   Hi everyone,  
     
   I’ve had an intermittent buzzing left channel which trying to diagnose is driving me nuts so any help is very much appreciated.  
     
   Sometimes \(but not every time\) when I switch on I get a ground type buzz through my left speaker only. It doesn’t increase in loudness when I increase volume, and I can still hear music beyond the buzz. When I press mute the amplifier is silent. I have changed din to xlr cable left channel - seemed to work fine at first but then the buzz today returned upon switch on \( I have recently been on holiday\). The buzz is across all inputs in the NAC252. When this last happened I wiggled the left din-xlr cable slightly and the buzz disappeared, but today has returned \(checked cable dressing - cable in exactly same spot. Any help very much appreciated  
     
   System is NAC252/SUPERCAP DR/NAP300DR with Ndx2 555psu  
     
   Thanks all

2. **发言者 2**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   When this last happened I wiggled the left din-xlr cable slightly and the buzz disappeared  
     
   Sounds like a bad cable. Maybe you can have your dealer inspect it, while they loan you a replacement to see if it resolves anything.

3. **发言者 1**（回复第 2 条）：Sorry I should have mentioned, I changed the din-xlr cable a few months back, but today the buzz returned again at switch on  
     
   KR

### 讨论 2

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Prepare your kitchen for the holidays  
     
   \[图片省略\]talvikaappi1920×1080 2.44 MB

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：我们在短时间内获得了 5k 用户，它比目前任何第三方 UI 都更加流畅丝滑，每一个 token 输出都做了精致的 UI 适配，体积仅 20MB 左右  
     
   官网 \[链接隐去\]  
   开源地址 \[链接隐去\]  
     
   \[链接隐去\]   \[链接隐去\]  \[链接隐去\]

2. **发言者 2**：从内测就开始支持。完美的软件。手机客户端有惊喜。

3. **发言者 3**：作者更新很积极，软件使用体感也很棒，现在作为日常主力工具使用。

4. **发言者 4**：看着不错 可惜我只有 gpt 的模型能用。  
     
   gpt 接到 claude 里面好用吗？

5. **发言者 5**：支持

6. **发言者 1**：发言者 4 可以挺好用的，比 codex 快一些

7. **发言者 6**：跟 t3 code、paseo 以及其他的众多的竞品比的话，优势是什么呢

8. **发言者 7**：很棒～～～  
   另求手机端适配 duo

9. **发言者 8**：在意体验，重视用户需求，耐心打磨。很好用～～

10. **发言者 1**（回复第 7 条）：\[引用第 7 条\] 在连接其他设备方面更好，整体更轻，ui 方面见仁见智，用户体验方面我认为 baocode 更好

11. **发言者 4**：发言者 1 能力上会有退化么 比如 cc 可能 prompt 针对 cc 的模型做了优化？

### 讨论 4

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

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Bypassing iOS Safari 60 FPS Limit

2. **发言者 2**（回复第 1 条）：Amazing work from a technical standpoint, however…  
     
   I am not sure it is worth implementing this on a real web page. I could tell the difference side-by-side but I would rather have a full day’s battery than a few extra frames. Many modern webpages are already too heavy and I don’t need advertisements updating at 120hz

3. **发言者 3**（回复第 1 条）：It's a neat hack, but the refracting Liquid Ass widget has been distracting me the whole time. Please use it for better things than emulating a bad design. Apple's fever dream of putting the content first made the content below and the content above it both fight each other into illegible flickery mess.

4. **发言者 4**（回复第 1 条）：Ironic that an article about increasing render speed would be on a website that renders so slowly

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[難過\] 又又又又又要看牙齒了  
     
   大家好 我是发言者 1 貓頭早上去了辦公室一小時 把事情處理一下 然後就離開了 回來剔牙刷牙  
     
   等等要看牙齒了  
     
   帶了雞球陪我  
     
   \[链接隐去\]  
     
   怕 好恐怖 ==

2. **发言者 2**（回复第 1 条）：又又又又是誰

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：General measurements discussion for GraphWorks visualizer  
     
   Share and discuss your impressions of different measurements in the new GraphWorks visualizer tool, whether you’ve actually listened to the headphones or not \(which is normally taboo on most audiophile forums\).  
     
   I have not listened to most of the headphones in this tool btw. So most of my impressions will be based on the 5128 graphs, and sometimes some virtual listening. So they should be taken with a grain of salt.

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

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：玩酒馆的话，GLM有活人味还是D老师  
     
   \( ﾟ∀。\)

2. **发言者 1**：JP

3. **发言者 1**：JP

4. **发言者 2**：GLM吧，DS越来越人机了\( ﾟ∀。\)

5. **发言者 3**：国模都不太行 硬要选 glm 鱼八股太难杀了\( ﾟπ。\)

6. **发言者 1**：试了试噶啦吗，怎么感觉命中率很低的样子\( ﾟ∀。\)

7. **发言者 4**：用哈基米吧\(\`ε´ \)

8. **发言者 1**（回复第 7 条）：\[引用第 7 条\]  
     
   没工具进不去网站\( ﾟ∀。\)

9. **发言者 5**：ds现在是人下人

10. **发言者 6**：试试哈基米

11. **发言者 7**：41f目前写文甚至还不如r1，还是用旮旯吗吧\( ´д\`\)

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Tool Functions Through Animation Player  
     
   Godot Version  
   4.7.2  
     
   Question  
   Is there any way to call a function in editor through a animation player?  
     
   I am using an Animation Player to control the spawning of nodes in game at certain timestamps but I’d like to preview where they’d spawn in the editor. I have an AnimationPlayer with a call\_method track which adds a node as a child. I’m hoping that I can get it to call the function in editor as opposed to only in game.  
     
   Thank you for your help\!

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Wi-Fi drops out constantly  
     
   Continuing the discussion from USB-A ports and Wi-Fi often don't work after boot:  
     
   My wifi drops out constantly, this is kind of frustrating.  Do I have a defective board?

2. **发言者 2**（回复第 1 条）：Assuming there is no difference between the Wi-Fi networks of the UNO Q and VENTUNO Q, I would like to share a working, tested non-containerized UNO Q script that allows you to control LED1\_R and LED1\_B from an Android mobile phone dashboard.  
     
   Do you think that script would be helpful for you to diagnose the state of your Wi-Fi network?

3. **发言者 1**（回复第 1 条）：The Ventuno Q is the one dropping on the connection not my wifi infra.

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: ModelXare – Decentralized AI Models  
     
   I have been exploring a different future for AI where we can finally take control of our models and keep our data 100% private. I built modelXare with the goal of creating the DNS-equivalent for AI capabilities. It uses a combination of system one and system two models to dynamically route the user intent\(s\) to the ideal micro-model\(s\) that gets downloaded \(and cached\) locally to processes your request.This is just the first iteration of this vision. There is a lot of work that needs to be done and a lot of micro-models that can be added but imagine a world where we all can build this network of micro-models together and break the chains from the big AI labs.

2. **发言者 2**（回复第 1 条）：nice\! do you have any videos or tutorials so that we can learn how to do it?

3. **发言者 1**（回复第 2 条）：You can try it directly in your browser: \[链接隐去\] a brief tutorial on how to publish your own micro-model here: \[链接隐去\] I forgot to mention the most important part ^\_^ Is all open source: \[链接隐去\]

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：What brought you joy today?  
     
   What brought you joy today?  
     
   Me: I finally spent some time in the workshop. My son asked to potter around in the workshop and explicitely suggested I could do something else in the workshop while we were there. So I finally tidied up and got to work on a nesting box using plans from Nabu.  
     
   \[图片省略\]PXL\_20261118\_162353794.RAW-01.COVER604×453 204 KB  
     
   \[图片省略\]PXL\_20261121\_170644068.RAW-01.COVER453×604 161 KB

2. **发言者 2**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   What brought you joy today?  
     
   Not quite joy like yours, but more like a good laugh reading the unfortunate literal translation of the caption “blue tits on a box” in the Nabu link that the browser offered in my language

3. **发言者 3**（回复第 1 条）：Sunny day and a walk in the park. It’s such a joy to feel the sun on the skin on these short winter days. And since we are photographers the november light is spectacular all day.

4. **发言者 2**（引用未收录发言）：\[图片省略\] 发言者 4:  
     
   Soon it will become a select few, who bike in rain, sleet, and the occasional snow  
     
   The latest date I’ve ever ridden a bike was around mid November, several years ago. It was right next to a river with was a bit of frost on the asphalt, enough to make the front wheel skid when I braked hard enough :grimacing:  
     
   Good thing it was a straight and I wasn’t going fast

5. **发言者 4**（回复第 4 条）：Get winter tires. They are a game changer. \(I actually have a “winter bike” so I don’t need to change tires depending on the day’s weather.\)

6. **发言者 2**（回复第 5 条）：At that time I was actually thinking about getting Schwalbe Ice Spiker Pro. Those are even tougher off-road tires that could handle basically anything, but I never got them since they’re expensive and I didn’t want to run them on asphalt too much, since the snow was rather uncommon.

7. **发言者 5**（回复第 1 条）：Walking in to work in late Nov and seeing this…  
     
   \[图片省略\]PXL\_20261117\_142457247.RAW-013072×4080 2.42 MB  
     
   There are still roses on many of the rose bushes…  
     
   It will all come crashing down but this fall in southern Ontario has been a gem. Very little rain and warm temps…I think it hit 19C on the weekend…

8. **发言者 6**（回复第 7 条）：\[图片省略\] 发言者 5:  
     
   There are still roses on many of the rose bushes…  
     
   Yes, I have a couple of big rose plants climbing a fence in my back yard. Today, the roses have about six blossoms and there are also several beautiful clematis blossoms.

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Voronoi cluster Scale?  
     
   I’m trying to find a way to scale Voronoi by Noise, like small clusters. I think the attached image can explain more.  
     
   \[图片省略\]518963903\_10171787319650374\_7525915469445821270\_n1152×1225 358 KB

2. **发言者 2**（回复第 1 条）：In all my tests scaling voronoi with noise ends up “wavy”.  
     
   It might be better to mix different voronoi’s with a mask.  
     
   \[图片省略\]11804×879 141 KB

3. **发言者 1**（回复第 2 条）：Thanks, but it has intersections.

4. **发言者 3**（回复第 3 条）：Perhaps doing the drops with GN might be easier…  
     
   For a procedural texture, you’d need to have access to the inner loop of the voronoi, to add some kind of recursion or a secondary loop… That forces you to have the whole shader made with other nodes.  
     
   It’s doable, but doing it with nodes has its limits, and it may even crash the machine. \(doing it with OSL gives you more robustness\)

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：娃就快上小学了，找小区其他家长打听了下，年级高一点后，每天的作业还是挺多的，我挺反感卷孩子们的，搞了家庭作业助手： \[链接隐去\] 之前薅的 token 用不完，现在完全免费使用。欢迎有同样想法的家长体验，提意见。

2. **发言者 2**：这什么啊。咋用。

3. **发言者 3**：豆包千问都可以直接拍照解答吧

4. **发言者 4**：体验不了一点，明显不满足中国宝宝的体质

5. **发言者 5**：打开 3 秒钟关掉 字太多 压力好大

6. **发言者 6**：你确定这是给中国家长用的，看着完全不知道怎么用，一点也不简洁。

7. **发言者 7**：90%的家长英文能力都读不了这个网站吧，面向海外用户和国内高知家庭的吗

8. **发言者 8**：闭门造车的洋垃圾产物

9. **发言者 9**：嘉豪

10. **发言者 10**：生产力过剩，全用来造垃圾了

11. **发言者 11**：让小孩轻松一点点，让知识少一点点。

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Top down sweater with scoop hem  
     
   I’m knitting a top down sweater and want to make a scoop hem so I need to incorporate short rows into the front and back. I have 160 stitches on the front and the back. Any ideas on spacing of the wraps?

2. **发言者 2**（回复第 1 条）：I wonder if binding off at intervals might give you more control over the shaped side edges and be easier to visualize.  
     
   There’s also a short row calculator in addition to the method recommended by 某参与者 which can be set for hems. I haven’t used it myself so this isn’t from presonal experience.  
     
   \[链接隐去\]

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：First attempt at weaving \(with yarn\)  
     
   At some point I’d like to try learning to weave in a more structured way. In the meantime, at some point last year I tried creating something by weaving some yarn in a homemade “loom” made out of cardboard :joy:. It was fun but a lot of work… I will likely not pick this up again until I have some massive amount of time to learn how to do it properly, lol…  
     
   \[图片省略\]20260509\_0955581920×2560 1.58 MB  
     
   \[图片省略\]20260509\_0956001920×2560 1.45 MB  
     
   \[图片省略\]20260509\_1035051920×2560 1.45 MB  
     
   \[图片省略\]20260509\_1055041920×2560 1.61 MB  
     
   \[图片省略\]20260511\_2020001920×2560 1.33 MB  
     
   \[图片省略\]20260513\_1220351920×2560 1.83 MB  
     
   \[图片省略\]20260511\_1629231920×2560 1.35 MB  
     
   In hindsight, starting with a really long article of clothing was probably not the best choice for a first project, lol\! And it wasn’t even that long… It was not long enough for me, but my youngest daughter can use it, and she was pretty excited about it, too :heart:  
     
   \[图片省略\]20260513\_161034\(1\)1920×2560 786 KB  
     
   Thanks for looking\!

2. **发言者 2**（回复第 1 条）：What an ambitious project\!  I love your color choices and how great is that that your daughter can not only use it, but that she’s excited about it too\!  Perfect outcome for a project that turned out to be so much work.

3. **发言者 3**（回复第 1 条）：So fun\! And I believe the cardboard loom \(or the plastic ones with stretchy bands to make potholders\) is probably where most would start that learning process, so you are obviously on the right track\!

4. **发言者 4**（回复第 1 条）：That’s a huge first project\! Nice job\!

5. **发言者 5**（回复第 1 条）：Wow\! I like how you made it sooooo long\! When I first started dabbling in weaving I made a cardboard loom like this:  
     
   \[图片省略\]1fbd1b155eec9301ddf968b93f4cdcf9581×513 50.7 KB  
     
   Here’s a tutorial of you’d like\!\!  
     
       
         \[图片省略\]  
     
         \[链接隐去\]  
       
     
       
       \[图片省略\]  
     
   Cardboard Box Looms: DIY Weaving at it’s finest\! – Craft Leftovers

6. **发言者 1**（回复第 1 条）：Thank you everyone for your kind words, and thank you 发言者 5 for the tutorial\!

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Can Passcode support be vibecoded for 某社区?  
     
   It's  -- could we add passkey support? Here's a prompt.   
     
   &gt; Extend the existing Ruby on Rails &amp; Vanilla JS codebase to provide the minimal necessary user interface , frontend &amp; backend implementations to support webauthn/passkeys.  Support multiple passkeys per user.  Support passkey detection when the user is logged out, so the user credential can be automatically detected without input.   Do not include any third party frameworks, use only vanilla JS and common browser APIs. ensure compatibility with Chromium, Safari and Firefox.  
     
   I swear on my PS4 that I wrote this message.

2. **发言者 2**（回复第 1 条）：\[链接隐去\]

### 讨论 19

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：乡镇干了个公益性岗位  
     
   想的是来这儿摸一年鱼，因为自己有点副业，经济还说的过来，但是乡镇工作很让人痛苦，由于选的是个刚经过重组的，里面的编制都满员了，被各种各样的人占着，里面干实事的人少的要死，由此我和另一个实习生，来到了这个地狱。

2. **发言者 2**：跑路吧，有积蓄那还不如跑外卖，自由。

3. **发言者 1**：公益性岗位，每个乡镇俩个人，我和另一个人天天苦不堪言，感觉像是要死了一样，每天都有人来搞事，什么莫名其妙的事情都能安排到我头上，美名其曰自己没做过，怎么，我一来就有人做了，那不说明，你们这些人全是废物，来这儿算锻炼心性我认，可是你那个态度搞得好像是施舍给我的，我又不是正式的，其他乡镇的怎么好耍怎么来，什么福利都给安排，一到你这儿就是上面抓得紧，到岗都多久了，到现在工资都没发，上面拨款成笑话，工资卡也不找我们要，问他们要提供什么也不说，就说个还在处理，神经吗，一到这儿那些神经老油条，就说要抽空多看书，中午加班是常态，工作做不完是常态，周六天需要你一起下村加班，这里早饭是不提供的，中午饭看伙食团心情（10块），晚饭不提供的，其他地方什么都配套，什么都有。

4. **发言者 1**：分享图片

5. **发言者 1**：每天就指望吃饭补充精力，晚上由于这里连个小饭馆都没有，只有那种炒菜店，我连个盖饭都吃不到，之前一次中午饭，我和办公室一个比我早来半年的同事一起加班处理，结果我们去吃饭的时候，只有半碗米饭了，同事是够吃的，但是会多一点，同事就直接给我了，但是我不够吃啊，伙食团是按人数定量的，结果我们俩最后来，还没吃上饭?  
     
   更别说办公室里面的恶心人物，邪恶四眼，一副笑面虎的模样，每天要等他说吃饭才能走，神经吗，更别说其他的，自己搞出来的错误，非要安在我头上。  
     
   \( ・\_ゝ・\)\( ´\_ゝ\`\)\(\*´д\`\)，好难受，跟家里人吐槽，家里人就知道告诉我解决办法，我寻思我知道解决办法，我为什么找你，我就是想跟你吐槽，我甚至明说了，我很难受，这些人很烦，他还是保持不理解，一直是那个神奇的态度。这个解决办法就是面对问题不耻下问这些口水话，还要跟领导用书面语言，领导跟你面对面交流，你还用书面语言啊\( ´\_ゝ\`\)

6. **发言者 3**：都公益岗了，那就run呗\( ﾟ∀。\)

7. **发言者 2**：那你辞职啊

8. **发言者 2**（回复第 7 条）：\[引用第 7 条\]  
     
   这种岗位还不如在家

9. **发言者 4**：&gt;乡镇公益性岗位  
     
   &gt;想的是摸一年鱼  
     
   抖m？

10. **发言者 5**：要么辞，要么摆？又不缺钱，这么多事不会影响到副业吗\( ﾟ∀。\)

11. **发言者 5**：而且看你吃饭的描述，这莫非还是异地乡镇

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: What Are You Learning?  
     
   Curious to understand what people are learning especially because I keep wrestling with this depressing voice in my head - "is learning anything even worth it in the age of AI"

2. **发言者 2**（回复第 1 条）：Anything and everything that might be interesting. Why not? Knowledge is never superfluous.

3. **发言者 3**（回复第 1 条）：&gt; "is learning anything even worth it in the age of AI"If all the business front/backends are llm/bots, then maybe there is no point learning. Since \(I tend think\) it is faaar away, domain knowledge, creativity, critical thinking will still very much needed.

4. **发言者 4**（回复第 1 条）：learning to prioritize and shut down random ideas :\(every idea is now 2\+ hrs of rabbit hole, its fun thou. but need to get out of it at some point

5. **发言者 5**（回复第 1 条）：as a fs web dev and soon to be replaced by ai and corporate greed I'm learning stuff that might help me switch to a diff role. :\( like embeed stuff \(which is not safe at all. Ai is getting pretty good at doing low level stuff and pcb design.Learning geo and maps and farming just for fun.

6. **发言者 6**（回复第 1 条）：Windows and Power Shell.

7. **发言者 7**（回复第 1 条）：I am studying a paper from Mark Burgess which is an updated presentation on Promise Theory basics \[链接隐去\]

8. **发言者 8**（回复第 1 条）：How to sew. Most of my hobbies have always been on the computer, comma, but having a physical hobby is a nice break. You can see exactly what's going wrong in most situations, but it can be damn hard.I'm mostly interested in repairing various textiles, like clothing and bag. My current stretch goal is to be able to build out some basic backpacks or messenger bags.

9. **发言者 9**（回复第 1 条）：You don't learn for the sake of learning though, you want to go from point A to B and you have to learn xyz to get there. Then ask yourself if it's worth getting to point B, not is it worth to learn xyz. You can always fold AI into the process, it's not the main thing you need to constantly think about like your typical middle manager who is trying to impress their boss.

10. **发言者 10**（回复第 1 条）：Just now I'm learning about the theoretical future risks posed by the use of cerebral organoids in global conflict.

11. **发言者 11**（回复第 8 条）：How is the sewing going? Have you repaired anything cool yet? I have been thinking about trying it too. Would you recommend it for a complete beginner?

### 讨论 21

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

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：刚收到邮件，OpenAI 修复了 Codex 的额度扣费漏洞，修复后 GPT-6.2 Sol 和 Astra 的额度会比之前消耗得更快...  
     
   \[链接隐去\]

2. **发言者 2**：\[链接隐去\]   
   收到啦，真是不当人

3. **发言者 3**：感觉 Astra 本来就消耗很快了，还以为会说修复的是消耗快的 bug，无语了，PRO 5X 感觉不够用了

4. **发言者 4**：砍吧，已经准备取消订阅了

5. **发言者 5**：只能说再见  
    \[链接隐去\]

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Knitting group bake sale: would no-thermometer fudge hold up in a warm room?  
     
   I’m in a small knitting circle here in North Dakota, and we’re planning a table at the church bake sale next month. I don’t knit much myself but I help with the setup, and I’ve been asked to bring something sweet. Someone suggested an easy fudge recipe that doesn’t need a candy thermometer, which sounds good since I don’t own one and our kitchen runs hot in summer.  
     
   My concern is how a no-thermometer fudge sets and holds up. The sale is in a room without great air conditioning, and the pieces would sit out for a few hours in small bags. I’d rather not bring something that turns soft or grainy before people buy it.  
     
   If you’ve made fudge this way and sold or gifted it in warm conditions, how did it hold up? Any tips on wrapping or timing? I’d appreciate hearing what worked for you.  
     
   Update after looking around more - Easy Fudge Recipe \(No Candy Thermometer Needed\) kept coming up when I searched for no-thermometer versions. Still not sure how it would hold up in a warm room for hours, so I may test a small batch at home first before committing to the bake sale.

2. **发言者 2**（回复第 1 条）：I think I’d try to find something else to take to the sale.  I do condensed milk and chocolate chip fudge using the microwave and it does pretty well at room temp but it wouldn’t hold up well in the conditions you describe.  Maybe brownies?  They’re pretty easy and don’t mind being in a warm room.

### 讨论 24

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

### 讨论 25

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Holiday Aprons for a Santa Parade  
     
   I just finished these and am so chuffed with how they turned out, I had to share\!  
     
   The company I work for has a float in the local Santa Claus Parade. We have a candy Christmas theme that we add to each year. This year we decided everyone needed to look a little more cohesive, so I suggested aprons.  
     
   We grabbed some cheap aprons on Amazon, and I designed the wordmarks and cut them on glitter vinyl on my Silhouette. Hot off the presses:  
     
   \[图片省略\]108211920×2550 1010 KB  
     
   \[图片省略\]108241920×2550 896 KB  
     
   Obligatory model shots:  
     
   \[图片省略\]108151920×2560 1000 KB  
     
   \[图片省略\]108181920×2560 971 KB  
     
   I cut five more of each and we’ll be pressing those tomorrow at our prep night.  
     
   …And I just realized I probably won’t get to wear one in the parade since I will be wearing an inflatable gingerbread man costume\! :joy:

2. **发言者 2**（回复第 1 条）：OMGosh these are so FREAKING cute\!\!\!

3. **发言者 3**（回复第 1 条）：This is great for creating cohesiveness. Adorable\!

4. **发言者 4**（回复第 1 条）：Nice job\! I was a bit sad when you first said you weren’t going to be wearing one…but then, inflatable gingerbread  costume…

5. **发言者 5**（回复第 1 条）：These are so festive and cheery\! YEY\! Are they all the same color combinations?

6. **发言者 6**（回复第 1 条）：these are darling\! I especially love the sparkly one\!

7. **发言者 7**（回复第 1 条）：So cute\! Though it’s hard to beat an inflatable gingerbread man costume…  
     
   I hope your team has the best time at the parade\!

8. **发言者 8**（回复第 1 条）：Your aprons look amazing\!

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：What VP \!= VNP Means \(In 3 Minutes\)

2. **发言者 2**（回复第 1 条）：&gt; You learned how to take a determinant in your linear algebra class:  
     
   Oh no, I’m going to need more than 3 minutes, aren’t I?

3. **发言者 3**（引用未收录发言）：&gt; This is the first time in my life I've heard of the permanent.  
     
   Me too, and I have a Ph.D. in stuff that involved \_a lot\_ of linear algebra.

4. **发言者 4**（回复第 2 条）：I’ve done literal rocket science with less linear algebra than “the permanent”.

5. **发言者 5**（回复第 3 条）：I think the permanent comes up more in graph theory than in linear algebra, at least that's where I know it from.

6. **发言者 6**（回复第 5 条）：Indeed. At least not the kind of linear algebra used in common physics

7. **发言者 7**（引用未收录发言）：I'm Gen Z American, also didn't really learn linear algebra until undergrad. Never heard of permanent either.

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

1. **发言者 1**：Search Improvements  
     
   I don’t know if there has been a post about it although I got a replay on the bug reports thread about some speed optimization being done which I have noticed and is awesome, but I also wanted to point out that it seems that now in searching, all non JLTP results are now followed by common results first, rather than mixing them in by character length order only, and this change is much appreciated\! Although it does seem sometimes that a ‘common’ marked result appears a row or two after the block of ‘common’ results \(example searching for 極 shows 極寒 not together with all the other common items.

### 讨论 29

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：GTA6 Releaseparty ab 15:30\!  
     
   Hallohallo, wir haben alles umgeschmissen und sind doch gleich um 15:30 schon live und zocken rein in GTA\!\!  
     
   Alles andere was heute geplant war ist aufgeschoben, nicht aufgehoben\!  
     
   Eddy und Nils sind die ganze Zeit für euch am Start und im Laufe des Tages gesellen sich allerlei Böhnchen dazu, unter anderem Valle, Bonnie, Tim, Sarah, Henry, Ben uvm\!\! &lt;3  
     
   Das wird toll, kommt rum\! Stream geht mindestens bis Mitternacht, danach schauen wir mal, juhuuuu lets fucking goooo\!\!

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：我发现一个很神奇的现象，写字的时候如果写着写着发现某个字写的很好看很帅  
     
   那么这个字大概率写错了  
     
   是由于大脑先注意到他是错的所以很特别，但一时间又没有看出哪里错，于是就判断为“写的好看”吗  
     
   人类真奇妙啊 ᕕ\( ﾟ∀。\)ᕗ

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Zephyr-sketch-tool 0.4.2 \(Windows\) flagged by 8/71 on VirusTotal, quarantined by Bitdefender  
     
   Installing arduino:\[联系方式隐去\] for the UNO Q with arduino-cli 1.6.0 on Windows 11 downloads zephyr-sketch-tool-0.4.2-i686-mingw32.zip from downloads.arduino.cc. The zip's SHA-256 \(e746c08c5a5323f3cbd746b7a14ba2984e64863ad15a99b2742316fdf1edb9a1\) matches the checksum in package\_index.json.  
     
   The zephyr-sketch-tool.exe inside \(SHA-256 c30dce6e64f0b888681c2f0dadc1f3f770dada60f97421ff4b9eb2cd5ecacc2d\) is:  
     
   removed by Bitdefender Advanced Threat Defense: "Unsigned process arduino-cli.exe executed unsigned file zephyr-sketch-tool.exe";  
     
   flagged by 8/71 vendors on VirusTotal \(Avira, Fortinet, WithSecure, Elastic, Trellix, Cynet, Bkav, Rising\), label trojan.epack/gen2: VirusTotal  
     
   Can Arduino confirm whether this is a false positive, and is a signed build planned?

### 讨论 32

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Where is Qwen 4 27B?  
     
   Maybe I'm lifting the wrong rocks to find some news on this much anticipated model for local enthusiasts like yours truly. I can feel the hype dousing off now that its been months since "soon" was communicated.If anyone knows something I'm eager to hear. And where you get your updates/news from on this.

2. **发言者 2**（回复第 1 条）：Qwensday.

3. **发言者 3**（回复第 1 条）：I too wait most impatiently. People like to say 'no news is good news' but that's horse shit. I want some news.

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：30\+ Jahre Karte von Berlin digital  
     
   Hallo Community,  
     
   in der Geography Awareness Week 2026 \(Woche des Geographie-Bewusstseins\) vom 16. bis 20. November 2026 entstand ein lang geplantes Projekt zur sogenannten Karte von Berlin 1:5000, kurz auch K5 genannt.  
     
   Die Karte von Berlin ist nicht nur einfach ein Stadtplan. Sie basiert auf geodätischer Vermessung. Der Anfang der damals noch Stadtplan von Berlin genannten Karte liegt in der Gründung von Groß Berlin im Jahr 1920.  
     
   Ältere Kartenblätter sind bereits in der sogenannten Histomap Berlin veröffentlicht. Ab den 1990er Jahren wurden die Karten digital hergestellt und vertrieben. Seit der OpenData Verordnung Berlin im Jahr 2020 sind sie frei verwendbar. Diese neueren Karten ab dem Jahr 1995 sind jetzt auch in einer Web Map veröffentlicht und einsehbar.  
     
   Seht es euch einfach an: \[链接隐去\]

2. **发言者 2**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   Datenlizenz Deutschland 2.0  
     
   Also nicht für Osm nutzbar, oder gibt es die extra Erlaubnis?

3. **发言者 1**（回复第 2 条）：\[图片省略\] 发言者 2:  
     
   Also nicht für Osm nutzbar, oder gibt es die extra Erlaubnis?  
     
   Da musst du die Urheber fragen. Wie würdest du sie denn nutzen wollen? 1:1 abzeichnen? Mit KI vectorisieren? Dann kannst du gleich beim Liegenschaftskataster nach den Rohdaten fragen. Lies vorher die OpenDataV Berlin von 2020.

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Red knob  
     
   A few years ago Adam Meredith posted this picture  
     
   \[图片省略\]image1920×2560 227 KB  
     
   in a thread about the earliest Naim kits one has. I’d love to have one of those red knobs if it was possible. Is it?  
     
   Thanks to anyone for any suggestions.  
     
   M.

2. **发言者 2**（回复第 1 条）：Not a google search I’d do myself, but knock yourself out Max.  
     
   G

3. **发言者 3**（回复第 1 条）：Chicken\!  
     
   \[图片省略\]IMG\_95781206×2622 324 KB

4. **发言者 2**（回复第 3 条）：\[图片省略\] 发言者 3:  
     
   Chicken  
     
   …head.  
     
   Who knew?  
     
   G

5. **发言者 4**（回复第 1 条）：\[图片省略\]s-l16001254×1254 76 KB

6. **发言者 5**（回复第 3 条）：发言者 7

7. **发言者 6**（回复第 1 条）：\[图片省略\]merlin\_135847308\_098289a6-90ee-461b-88e2-20920469f96a-articleLarge.jpg600×450 6.66 KB

8. **发言者 1**（回复第 3 条）：The right hand ones are not exactly like those in AM’s pics, but thanks. I have done some browsing myself of course.  
     
   I’ll wait for some more useful replies.

9. **发言者 2**（回复第 8 条）：A reverse image search - close, but no cigar.  
     
   It might be a way to research it though.  
     
   G

10. **发言者 7**（回复第 6 条）：I sold five of mine recently, to buy a cable.  
     
   \[图片省略\]IMG\_a3940633-6b2c-4dd2-bf65-2fcd3e7d8fa7554×554 28.1 KB

11. **发言者 8**（回复第 1 条）：There used to be some red, green and maybe iirc blue? Knobs in the old spares stores, but no idea whether they still exist or have been disposed of or used up. Maybe 某参与者 knows

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Blender v4.5.17 LTS v5.2.5 LTS v5.4.0 OpenPBR Patch Releases  
     
   on the releases page v4.5.17 LTS, v5.2.5 LTS, at the WIP OpenPBR page \[near bottom\] the newest v5.4.0 OpenPBR patch build are there for downloading.  
     
   on the release notes page one can read about the changes for every release.  
     
   happy :blender\_logo\_64\_png:ing\!

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Zooproxy 上新\*\*美国 AI 优化渠道 IP\*\*，适配 ChatGPT、Claude 等大模型批量任务，单价 $1.25/IP，针对 AI 业务风控做专项优化。  
     
   美国 IP AI 优化套餐专为 AI 业务负载调优，网络针对 AI 机器人访问、API 调用、模型推理实现低延迟稳定连通，针对 AI 平台常见的指纹识别与流量限制做了防护优化，IP 属性更好 有其他业务的客户也可以选择该套餐使用。  
     
   联系官方 TG 客服 \[某参与者\] 还可领取专属优惠券。  
     
   🎁网友专属福利：注册即可兑换 CDK，免费领取动态住宅流量  
     
   官网注册入口：\[\[链接隐去\]  
     
   注册登录后进入控制台，找到 CDK 兑换入口直接激活即可。  
     
   邀请码：\*\*veexfwaif\*\*，新用户首单可享半价。 注册时填写  
     
   可用 CDK：  
     
   \`\`\`  
   UEJK‑EKE9‑ME97  
   QB6X‑CMTM‑FCTX  
   7ZAR‑WKKQ‑ANVH  
   ZYLA‑RK7G‑QFW9  
   P4TY‑P3YU‑8272  
   85G4‑BYDJ‑UMDR  
   FES3‑FAKU‑TVS9  
   \`\`\`  
     
   CDK 名额有限，如果上面 CDK 已被领完，可以联系官方备用渠道获取：  
   \[联系标识隐去\]  
   \[联系标识隐去\]  
     
   官方通知频道，不定期发放福利：\[链接隐去\]  
     
   \#\# 产品简单介绍  
     
   - 静态 ISP 住宅 IP：固定 IP，适合 AI Agent、社媒矩阵、跨境账号长期运行；静态钱包未提取 IP 不计费  
   - 动态住宅代理：IP 自动轮换，流量永久不过期，适配爬虫、公开数据采集、批量 AI 请求  
   - 支持 HTTP/HTTPS/ SOCKS5，支持城市级定向、API 对接，兼容指纹浏览器自动化脚本  
     
   &gt;   
   &gt; 备注：SOCKS5 默认转发 TCP 流量；UDP 转发需要单独联系商务评估开通。  
   \[图片省略\]  
   \[图片省略\]

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

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Why there are still no non-WebKit browsers on iOS

2. **发言者 1**（回复第 1 条）：Sad to see that Apple is trying to avoid adhering to the spirit of the DMA by setting requirements that are very difficult to fulfill. And to make it worse they keep these requirements secret and don't allow Mozilla to talk about them.

3. **发言者 2**（回复第 1 条）：This is why iOS is not a serious computing platform.

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[問題\] 電鍋料理推薦  
     
   這幾週工作比較忙  
   比較沒時間自己煮 但外食很貴又不太健康  
   目前只會用電鍋煮湯跟蒸蛋  
   想問大家有知道電鍋可以快速簡單的料理嗎？

2. **发言者 2**（回复第 1 条）：生命體徵維持餐:米肉菜洗好加鹽一起

3. **发言者 2**（回复第 1 条）：蒸

4. **发言者 2**（回复第 1 条）：只需注意肉不能冰凍狀態丟進去 不會

5. **发言者 2**（回复第 1 条）：熟。不適合筍子不夠熟無法去除毒素

6. **发言者 2**（回复第 1 条）：肉不夠油的話蒸好自己淋橄欖油補足

7. **发言者 2**（回复第 1 条）：脂肪

8. **发言者 3**（回复第 1 条）：粥 炊飯所有的料一鍋塞 天氣涼可以

9. **发言者 3**（回复第 1 条）：出門前擺好設定時器回家就煮好可以

10. **发言者 3**（回复第 1 条）：吃了

11. **发言者 4**（回复第 1 条）：馬鈴薯 蛋 用電鍋蒸熟了就可以弄成

### 讨论 41

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

### 讨论 42

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

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：人的性偏好真的是会变化的  
     
   初中:柰子越大越好→高中:萝莉也可以这么色吗，萝莉也可以→大学:男娘也可以这么色吗，男娘也可以→现在:男的也可以

2. **发言者 2**：涩涩应当是自由的

3. **发言者 1**：牛子这么脏，用手撸都觉得不方便→自己锁自己牛子可以→我锁别人的也可以，现在真让我锁男娘的小粉牛我都可以下口

4. **发言者 3**：gay

5. **发言者 4**：true

6. **发言者 5**：柰子越大越好

7. **发言者 6**：gay

8. **发言者 7**：哈哈，这人一再降低标准也做不了爱

9. **发言者 8**（回复第 3 条）：\[引用第 3 条\]  
     
   你不会是前几天那个想嗦男娘粉牛的gay吧\( ﾟ∀。\)

10. **发言者 9**（回复第 8 条）：\[引用第 8 条\]  
     
   \( \`д´\)说的你好像可以一样

11. **发言者 10**：true

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Outlines and shadows on labels aren't pixelated with pixel fonts  
     
   Godot Version  
   4.7  
     
   Question  
   Basically what I wrote in the title. In the images below you can see that the outlines and shadows don’t look right with the pixelated fonts I’m using \(both in viewport and canvas items stretch mode\). It looks better in the viewport mode, but it’s still blurry and not really what I want.  
     
   \[图片省略\]  
     
   \[图片省略\]  
     
   \[图片省略\]  
     
   \[图片省略\]  
     
   Here is what I’d like it to look like:  
     
   \[图片省略\]ex6255×250 170 Bytes  
     
   \[图片省略\]ex7398×389 260 Bytes  
     
   \[图片省略\]image371×358 255 Bytes  
     
   Is there a simple way of getting it to look like that?

2. **发言者 2**（回复第 1 条）：Have you set your filter mode?  
     
   In project settings you can change the default to “Nearest” at this path “rendering/textures/canvas\_textures/default\_texture\_filter”

3. **发言者 1**（回复第 2 条）：Yes I did that, it doesn’t make a difference.

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Controlling a RGB LED Strip\!  
     
   Hello all,  
     
   I am trying to use an Arduino UNO to control a RGB LED strip. I am using four PWM channels to control the White, Red, Green, and Blue LEDs on the strips. For the most part the Code and Hardware works. I am reading a pair of push buttons for each color. Press either button and the color turns on or off. This works correctly. Hold a button and the color ramps up or down depending on which button is being held. One button for UP and one button for DOWN. This works for the most part. What is happening that I can't sort out is that when you hold the UP buttons the LEDs flash as they ramp up in intensity.  Can someone please help? Right now the code is straight line. I plan on converting it into a series of generic functions but I want to get it working correctly first. Any help will be greatly appreciated. Since I am a new user I can't upload attachments.  
     
   Thanks,  
     
   rich\!

2. **发言者 2**（回复第 1 条）：发言者 1 I have removed your email address from your original post as it is not a good idea to publish it on a public forum and it is not needed in this context

3. **发言者 3**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   I am trying to use an Arduino UNO to control a RGB LED strip. I am using four PWM channels to control the White, Red, Green, and Blue LEDs on the strips  
     
   A RGB led strip contains three tiny leds -- Red, Green, and Blue. Why is there White led in your case?

4. **发言者 1**（回复第 3 条）：These strips have four LEDs in them. White, Red, Green, and Blue. It is the way they were designed. You supply 24 volts to the strip. You then ground the various colors to turn them on. Everything works except for the flashing when usinf the UP buttons.  
     
   Thanks,  
     
   rich\!

5. **发言者 1**（回复第 2 条）：Please restore my email address? Whoever tries to help me will also need the schematic.  
     
   Thanks,  
     
   rich\!

6. **发言者 2**（回复第 4 条）：Please post the schematic of your project here showing how the components are interconnected and powered.  A 'photo of a hand drawn circuit is good enough

7. **发言者 1**（回复第 6 条）：I tried to do that and I was told that I can't up load any attachments because I ama new user. Yes, I know that just having the software won't work.  
     
   Thanks,  
     
   rich\!

8. **发言者 1**（引用未收录发言）：\[图片省略\]LED.Controller.Schematic1920×2560 689 KB

9. **发言者 4**（引用未收录发言）：What's your math for R3 / R4 ? Your TIP will never saturate.

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Cerulion – Harness for Robotics, Gemini 3.8 Flash Matches GPT-6 Astra  
     
   Hey HN\! I'm Lakshay, and at Cerulion we cooked up a harness for physical AI. Built on top of our deterministic runtime, we now have MCP tools that let any LLM see and move a robot. It closes the loop with measurements so a model doesn't try to guess its way through the task, and imbues common sense and robotics best practices into the workflow.We ran the numbers on LIBERO-PRO and quite frankly are a bit shocked. Gemini 3.8 Flash with Cerulion solved 73 of 100 LIBERO-PRO tasks. GPT-6 Astra on a bare 3-tool baseline \(arXiv:2610.30051\) solved 71, at about 12x the cost and 3x the wall time per run. Flash on that same baseline solved 25.Guys. Gemini 3.8 Flash matched GPT-6 Astra for robotics. Model intelligence is not the bottleneck. A harness is all you need ;\)Star us and follow along. Try the quickstart, lmk what you guys wanna see next. I'll post again soon\! \(teaser: my Nespresso machine is getting a lot of attention from my robot arm\)

2. **发言者 2**（回复第 1 条）：Congrats, Lakshay\!

3. **发言者 1**（回复第 2 条）：Thanks Christian\! :D

### 讨论 47

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

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：And relax  
     
   I’ve had a rather busy few weeks.  
     
   A couple of months ago I made the decision to retire. Luckily enough at the age of 60.  
     
   I finally left my workplace a week ago and I’ve finally had chance to have a couple of decent sessions listening to my system…  
     
   And I’m thrilled with just how good it sounds. Maybe I’d forgotten how good it sounds \(it’s been ages since I’ve had a few spare hours to listen\) or perhaps I’ve finally managed to sit down, completely relax and listen with no distractions, thoughts of the next day at work or thinking I’d better get to bed.  
     
   I’ll have a little less income but I’ll manage. Since losing my wife 5 years ago I’m not bothered about holidays, meals out etc. I don’t run a fancy car and clothes, watches and the latest massive TV hold no appeal.  
     
   I’m just looking forward to some quality music with a nice glass of red and answering to no-one.

2. **发言者 2**（回复第 1 条）：Enjoy your time relaxing a little. Early retirement and a simple life is well earned.

3. **发言者 3**（回复第 1 条）：Enjoy your retirement Basil.  Being able to spend more time listening to your excellent system is one bonus of retirement but I suspect other activities will come along too and you’ll soon be wondering how you ever found the time to go to work.  Best wishes  
     
   Roger

4. **发言者 4**（回复第 1 条）：Congratulations to you Basil\!  I am contemplating the same

5. **发言者 5**（回复第 1 条）：Congratulations. I can’t wait to retire, but I still have some 5 years to go…

6. **发言者 6**（回复第 1 条）：Congratulations on your retirement. I was fortunate enough to be able to retire early three years ago and it has been a great experience so far. While retirement opens up opportunities to do things I had always wanted to do, I actually think the best part is now having a choice about what not do.

7. **发言者 7**（回复第 1 条）：Very pleased for you.  
     
   I took early retirement and my Naim system, some nice red wine and maybe the cricket on the box in the depths of winter are nice things to have  
     
   Best wishes  
     
   Ian

8. **发言者 8**（回复第 1 条）：Wishing you a happy retirement and many hours of musical enjoyment.

9. **发言者 9**（回复第 1 条）：Yes well done and enjoy, I’m going to reduced hrs in 18 months for a year or so then kick back

10. **发言者 10**（回复第 1 条）：Cheers

11. **发言者 11**（回复第 1 条）：Hope you have a long and happy retirement.

<!-- samples:end -->

