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

采用时沿用本次操作保存的案例映射；涉及研究补充时，在 `researchMaintenance` 对应条目的 `summary` 记下材料日期、标题和改编方向，不补回原身份或平台。具体研究仍回到相应专题，不在多处复制整段；新鲜公共资讯的观察继续按[执行与发布](../docs/publishing.md#填写当前更新)记录。

## 当日素材

<!-- samples:start -->

采集时间：2026-11-16 13:50:06（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Mina and Lone  
     
   \[图片省略\]  
       
     
   an entry to Mina the Hollower art contest

2. **发言者 2**（回复第 1 条）：Very cool. :ok\_hand:

### 讨论 2

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Subwoofer For Linn Kan I?  
     
   I really enjoy my Linn Kan I’s for their excellent mid range but would like more bass. Any suggestions on a brand of subwoofer for them?  I remember decades back a company called Satterberg manufactured powered subwoofers for the LS 3/5A and there was also a passive subwoofer for that speaker. Was the Satterberg dedicated to the LS3/5A or could it be adjusted for use with the Kan I? Any suggestions would be appreciated\!

2. **发言者 2**（回复第 1 条）：Buy better source and electronics for the Kans  
     
   is my advice,a Sub won’t be fast enough for the Kans.

3. **发言者 3**（回复第 1 条）：You seem to also have some Kefs and some Neats, so why not just enjoy the Kans for what they are, wonderfully engaging speakers. Or get a 32.5, Hicap and 250 and hear what they are actually capable of.

4. **发言者 1**（回复第 3 条）：I ran Kans decades ago with a 72/Hicap/135 system and they were quite good. Lightning fast with the 135’s \(the same was true with my 15 ohm LS3/5A’s and the 135’s\). Once again, no real bass.  
     
   I’m not sure that there even is a subwoofer that would work well with the Kan I. I started this thread just to get some opinions. :blush:

5. **发言者 4**（回复第 1 条）：I used a Gale sub with my Kans in a small room. It makes a positive difference, especially at low volume listening. Find something with gain and crossover adjustment on ebay or similar and give it a try. You can then decide if it’s worth spending on something better.

6. **发言者 2**（回复第 4 条）：Naim DBL is the answer :wink:  
     
   Linn Kan with bass.  
     
   \[图片省略\]IMG\_42421206×1580 260 KB  
     
   \[图片省略\]IMG\_42451206×1659 293 KB

7. **发言者 5**（回复第 1 条）：I can’t see any reason why Kans should demand any specific type of sub more than any other speaker. All half decent subs allow adjustment of low pass filter, gain and phase. Try a regular Rel, BK or similar and see how it goes, with the proviso that successfully integrating a sub onto any system can be a challenge.

8. **发言者 6**（回复第 7 条）：I used a Naim n-Sub with Kans in a temporary arrangement in a large Naim system and it sounded surprisingly good. The sub was much closer to the listening position than the Kans which may have helped with the speed issue.

9. **发言者 7**（回复第 1 条）：Sub with Kans is a pizza with pineapple. :-1:

10. **发言者 1**（回复第 9 条）：Never thought of it like that\! LOL

11. **发言者 8**（回复第 9 条）：Really good then\!\!

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\# 背景  
     
   最近深受 magpie 的作者\(yetone\)还有 dsh-superagent 的启发。既然 AI 都这么牛逼了，为什么不能帮我把 github 的 issue 处理一下呢。  
     
   我先搜索了一下有没有类似的项目，处理 issue 的。下载了几个，用的都不是很顺心。  
     
   我说：“要不咱 vibe coding 一个出来”。说干就干，我先用 nodejs 写了一个简单的版本，用于监控 issue，然后回复一个 smile 表情。结果非常快的就写出来了。看来 AI 的潜力很大呀。然后我用 go 开始正式开整，用了一个周末，就弄出来了，还是在手机上搓出来的。  
     
   \# 现状  
     
   现在这个项目是什么水平呢。  
     
   1. 自维护：给他提 issue 之后，它自己能写 plan -&gt; pr -&gt; merge -&gt; hotreload  
   2. 定时发版。（现在是按天维护发布）  
   3. 自推广。（自己去其他平台上介绍自己，推广自己）  
     
   举个 issue 的例子  
     
   \[链接隐去\]  
     
   我提了一个增加定时发版的功能需求，它先写了个计划，我确认没问题，他就提了 pr，我再次确认没问题。它就合并并自更新了。  
     
   不过这篇文章还是我自己写的，不能让 AI 把这么好的活给我抢了。  
     
   项目地址：\[链接隐去\]

### 讨论 4

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：beer.drv.drv.drv

2. **发言者 2**（回复第 1 条）：You could handle 99 beers if you do the recursion by decimal digits \(keeps max depth to 10\+digits\). Then, if that weren't sufficient, lower the base and implement binary-&gt;decimal encoding, and now max depth is 2\+digits. 2^499-2 sounds like a lot of beer.  
     
   I am extremely entertained by this today.

3. **发言者 1**（回复第 2 条）：that's a pretty funny follow-up.   
   I'm not sure if a \`drv\` can have &gt; 1 output though to make it work.  
     
   &gt; error: derivation names are allowed to end in '.drv' only if they produce a single derivation file  
     
   I wasn't sure about 2^52 should be the beers ? :\)

4. **发言者 1**（回复第 3 条）：I ended up filing: \[链接隐去\]

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: New Book  
     
   I just published a new book that has important implications in model quantization. Enjoy responsibly\! :-\)

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Monitoring email delivery  
     
   Discuss  
   Hi All,  
     
   How do folks monitor email delivery with yunohost ?  With so many rejected emails, especially on home/small server that might be untrusted, an important aspect.  
     
   In the past I’ve used tools like pflogsumm \(Postfix Pflogsumm Log Entry Summary @ \[链接隐去\] but thats not \(currently\) installed with yunohost.  
     
   I do make use of the dmarc reports but that doesn’t include, say, delivery failures.  
     
   Thanks,  
     
   Pete

2. **发言者 2**（引用未收录发言）：I am using this script Linux-scripts/yunohost/mail-report at main · DeMiro5001/Linux-scripts · GitHub  
     
   I have it on all my servers \(placed in /etc/cron.daily\)  
     
   It’s mainly to check the pattern bots are using to try authenticate on my server. I get daily report.

3. **发言者 1**（引用未收录发言）：Actually I’m using home assistant to monitor a few /metrics endpoints.  I just want an alert \(signal message in my case\) when something needs looking at.

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Wireless Headphones have really improved over time  
     
   During my most recent vacation, used a pair of B&amp;W PX8 S2 for playback.  They exceeded my expectations performance wise.  
     
   So, decided to compare the PX8 S2 to the venerable Sennheiser HD 600 and HD 650.  To my utter surprise, the PX8 S2 was clearly a step up sonically over either Sennheiser offering. Every aspect of playback was better with the PX8 S2.  Dynamics, low level detail, tonal balance, you name it, it was better.  The thing that really stood out was horns and woodwinds sounded a lot closer to real with the PX8 S2.  Also used a questyle dongle for hi-res.  
     
   I’m wondering how much the carbon fiber driver plays into this.  This has caused me to re-evaluate priorities regarding headphone listening, including costs to get high quality sound.

2. **发言者 2**（回复第 1 条）：I’m so sorry for your ears.

3. **发言者 2**（引用未收录发言）：It’s that almost all are closed back. I don’t deny use cases for wireless or ANC.  
     
   But closed backs are fatiguing. Even the ZMF Verite.

4. **发言者 1**（回复第 3 条）：Ah\!  Makes sense.  
     
   My favorite headphones are open:  Abyss Diana TC and Verum 2.

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：First needle felted project--heart pin  
     
   I saw a needle felted pin with the zipper embellishment and that put me over the edge; I just had to try needle felting. With the encouragement of needle felting master \[某参与者\], I embarked on the journey. Here’s my first piece. IRL it is a lighter color than the photo depicts.  
     
   \[图片省略\]image1596×1654 791 KB

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Light Metal: Custom Skin for darktable 5.6.2  
     
   Light Metal is a medium-gray theme that serves as an alternative to darktable-icons-grey, striking a balance between neutrality and visual comfort.  
     
   Screenshots:  
     
   \[图片省略\]Captura 2026-11-15\_2\_022560×1440 1.95 MB  
     
   \[图片省略\]Captura 2026-11-15\_12560×1440 2.36 MB  
     
   It took me weeks to get to this point \(of learning and enjoyment\), since it was done the old-fashioned way: typing, testing, and restarting. It may still require some tweaking.  
     
   AI was only used to assist with image generation and to check for typos.  
     
   Together with Dark Metal, they now form the Metal\_Pack \[GitHub repository\].  
     
   If you’d like to try it out and provide feedback, it would be greatly appreciated.  
     
   Please use the thread specific to the topic in question \(  
     
   Light Metal / Dark Metal\)  
     
   Thank you.

2. **发言者 2**（回复第 1 条）：发言者 1 ,  
     
   What does “br” mean regarding the installation path?  
     
   Is it okay to just place the images in \[installation directory\]\\share\\darktable\\pixmaps\\thematic\_images\\

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Study question about 最近 and 最後  
     
   A question about the study question 「アンケート：「あなたが\_\_\_\_居酒屋へ行ったのはいつですか？」」  
     
   The hint translation provided was Survey: ‘When was the last time you went to an izakaya?’  
     
   某社区 marks the correct answer as 最近 as the sentence is linked to this vocabulary. But based on the translation, wouldn’t 最後 be more accurate? 最近 may require a change in the translation to most recent  right?

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Re: \[心情\] 努力了六年，世界還是沒留一個位置給我  
     
   如果能在家裏當家庭主婦  
       做得很好  
     
       把先生以及兩個孩子照顧好  
       煮飯洗衣做家事也能樂在其中  
       不也是很有成就感嗎?  
     
       為什麼你一直強調工作的追求自我  
       也是有很多女性  
       願意放下工作  
       即使是高薪高成就也全部丟掉  
       只為了專心照顧陪伴孩子  
     
       另外  
       行動不便人士賣東西的話  
       我是看到好幾位  
       都是固定時間就一定出來做生意  
       也是很不簡單的呢  
       \(敬禮\)

2. **发言者 2**（回复第 1 条）：肯認真工作 或是把家庭顧好 真心對

3. **发言者 2**（回复第 1 条）：家人好的 都很值得尊敬

4. **发言者 2**（回复第 1 条）：但妳做得好 總有些老害老貪喜歡搞

5. **发言者 2**（回复第 1 条）：是非 遠離即可 人生不過幾十年

6. **发言者 3**（回复第 1 条）：請問你有看懂我的文章嗎？我到現在

7. **发言者 3**（回复第 1 条）：還是坐輪椅我都沒有辦法自行走路要

8. **发言者 3**（回复第 1 条）：談什麼照顧呢我自己都需要人家照顧

9. **发言者 3**（回复第 1 条）：了，我只是之前可以回去上班

10. **发言者 3**（回复第 1 条）：不能打理家務不能照顧家人，那上班

11. **发言者 3**（回复第 1 条）：不就是我自己能找的成就嗎？

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Emission makes the object flat  
     
   I’m trying to emit light from a candle flame so my emission Strength is at 50. In base color and emission color inputs I have a red to yellow gradient node. The result is the candle flame being all flat white. I want to keep the emitted light but I want the flame to look like a red to yellow gradient. Is it possible?

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Joy Division/New Order Rock &amp; Roll Hall of Fame  
     
   Peter Hook looking good\!  
     
       
       \[图片省略\]

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：What do you think of local ai models on your pc helping with development?  
     
   Recently i’ve been playing with Ollama and tested few coding models like Qwen-2.5:14b or Qwen3.5:27b, for me they’re great text formatting tools and can somewhat help with math but writing large amounts of code is still problem for them, even if they’re not magic wand for coding do you think they can be game changer for game dev or minor improvement or even bigger problem than help?

2. **发言者 2**（回复第 1 条）：I think for any tool, AI or otherwise, the important thing is to find a tool that solves a problem, not pick a tool and then find uses for that tool

3. **发言者 1**（回复第 2 条）：it is true but still knowing possibilities of something is the way you find the tool when you need it

4. **发言者 3**（回复第 1 条）：what do you expect to help you with those models?  
     
   do you know how to setup bridge? MCP  
     
   how do you prompt instructions? \( specific functions or documentation search or deliver full logic?\)

5. **发言者 1**（回复第 4 条）：i didn’t dived into this much, but that’s the topic for overall local ai being helpfull for game dev in any sense, for me it fixes ton of problems with formatting but it’s nice to hear other’s opinion / ideas

6. **发言者 2**（回复第 1 条）：Regardless of if it is capable of creating non-slop or not I’d advice avoiding using it generatively until the actual legal situation is established, to avoid risking unintended plagiarism issues or inability to copyright your work

7. **发言者 1**（回复第 6 条）：really i never though ai might be a legal problem in the future

8. **发言者 2**（回复第 1 条）：And the issue with the liability is that this isn’t something you can rely on being protected by the lack of law, they aren’t making anything new illegal, so anything done before new laws and precedent will be prosecutable

9. **发言者 1**（引用未收录发言）：That’s the big problem with ai, i think code isn’t as bad in that terms but assets? i think it will cause some problems in the future  
     
   Also it is interesting that if you think about AI itself it won’t be better than a high organized team wtih free assets and knowledge of game engine

10. **发言者 1**（引用未收录发言）：Well losing skill to add semicolons at the end of each line rapidly is very important skill so…

11. **发言者 4**（回复第 1 条）：Has anyone used a local LLM model for programming in Godot with GDScript? Which one would you recommend, and where can I download it and find information on how to install and configure it?

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：提车半年，每天通勤 13 公里，早上 5 公里，晚上走高架 8 公里，虽说晚上距离远点而且上海南北高架很堵，但是开起来都比早上轻松太多了...  
     
   几乎每天路上都能遇到电动车和自行车乱骑的，转弯回头观察也不会，电动车转向灯也没有，反正就是突然就要顶你车头前面转弯...  
     
   早上又遇到一个大妈，我直行过 T 字路口速度降低到 20 就是怕电动车来个转弯，果不其然大妈一个左转直接顶我车头前面，给我吓得一把方向加急刹才停下，大妈挡风被贴着车屁股过去了，更恶心的是我到公司翻看记录仪，我后车也遇到了 A 柱盲区的电动车，我车刚停下电动车就往我车屁股和他车头的缝里钻，他刚起步又是一脚急刹，估计也是吓坏了...  
     
   碰到了机动车高低是个次责，和同事吐槽，同事说被判过次责，电动车主责赔了 1000 补漆钱，然后他次责赔了 2000 去医院检查... 真是太抽象了...

2. **发言者 2**：很多时候我看导航给我推荐避堵路线走地面，我都直接开到高架上，宁可在高架上堵着一点一点挪，也不愿意在地面小心那些电瓶车和老头了，感觉非常耗费精力……

3. **发言者 3**：上海还好点，责任清晰 机动车不会吃 22 条

4. **发言者 1**：发言者 2 是啊，天天和这些没安全意识和交规意识的人做博弈，永远不知道他们的脑子里怎么想的，用血肉之躯去挑战机动车驾驶员的反应和刹车... 要是下雨天路过学校和居民区，开完直接力竭了...

5. **发言者 4**：但是开的多了就知道了，我现在基本能预测大部分小电驴的行为。

6. **发言者 5**：焊颈帝，哈哈，太形象了。广州的电鸡也是这样，无牌、遮挡车牌的到处都是，马路当客厅开。

7. **发言者 1**：发言者 3 难以想象别的城市开车有多累，听说上海是重罚\+不和稀泥的城市，开车已经算比较轻松的了，但就这样面对上海路上的鑫福帮\+山崎组\+电动车\+自行车还是要打起 12 分精神，不能放松一点

8. **发言者 1**：发言者 4 早上我这个真的预测不了，那个大妈不回头，不打灯，也没任何转弯意图，骑到路中间突然 90 度要左转...

9. **发言者 6**：习惯就好，开车骂骑，骑车的嫌开车挡路

10. **发言者 7**：还有那种瞎 b 开车的,交警判了全责不认就要拖车耗你时间的

11. **发言者 8**：看见路口，我都主动提前减速，就算是那些平时没啥人的路口也是一样，这些事故遇见一次就头疼。

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：WebGL Flight Simulator with seed generated terrain

2. **发言者 1**（回复第 1 条）：How to fly...  
     
   Press F to lower Flaps for Take Off  
     
   Press SHIFT to Throttle Up  
     
   At 50km/hr, Down arrow to take off.  
     
   Arrow keys are control stick.  
     
   If you have a Game controller, it should work seamless.  
     
   BSD 2-Clause and Source  \[链接隐去\]

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Anarchy Chess  
     
   A riff on the classic 8-queens problem, adding rooks, bishops and knights. Puzzles are generated daily, plus 8-queens itself and a couple of other static puzzles.

2. **发言者 2**（回复第 1 条）：Very neat. I'm currently very addicted to Chess so I'm sure I won't spend the next hour on this\!

3. **发言者 1**（回复第 2 条）：Thanks, glad you like it\! If you have thoughts on how to make it better, drop me a note, please\!

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：零食推荐串串号请求  
     
   jp

### 讨论 19

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：The Bridgerton Wrap  
     
   It’s been a while but finally it’s finished. The “Bridgerton” wrap. Made with the beautiful Bridgerton Advent 2025 by Castle View Yarns  
     
   I am absolutely delighted with it. So much so I’m debuting it at Centre Parks this week.  
     
   Merino 4ply, on 12.5dpi on a 24" Ashford. \#gwead \#rigidheddleloom \#handwoven \#slowfashion  
     
   \[图片省略\]10000647941920×1920 1.06 MB  
     
   \[图片省略\]10000647951920×1920 1.36 MB  
     
   \[图片省略\]10000647961920×1920 838 KB  
     
   \[图片省略\]10000647971920×1920 1.05 MB  
     
   \[图片省略\]10000647991920×1920 1.19 MB  
     
   \[图片省略\]10000648001920×1920 1.26 MB  
     
   \[图片省略\]10000649111542×1444 231 KB

2. **发言者 2**（回复第 1 条）：This is so pretty and looks like just the right amount of warm

3. **发言者 3**（回复第 1 条）：It is gorgeous\! Well done.

4. **发言者 4**（回复第 1 条）：:maple\_leaf: :fallen\_leaf: :maple\_leaf: Congratulations\! Your Bridgerton Wrap is a Featured Project this week\! :maple\_leaf: :fallen\_leaf: :maple\_leaf:

5. **发言者 1**（回复第 4 条）：Thank you :blush:

6. **发言者 5**（回复第 1 条）：this is absolutely gorgegeous\!

7. **发言者 6**（回复第 1 条）：Beautiful\!  
     
   Enjoy Centre Parks

8. **发言者 1**（回复第 7 条）：It’s weird you not being here. Seemed poor form to bring you too considering Liz booked and paid for it :thinking: :rofl:

9. **发言者 7**（回复第 1 条）：Absolutely gorgeous\! I can tell how much work into it and it looks so flawless\! I love looking at visibly woven fabric\!

10. **发言者 8**（回复第 1 条）：So beautiful\! That gradation is so sumptuous.

11. **发言者 6**（回复第 8 条）：Haha. That would be weird\!\!  
     
   Have fun :woman\_swimming:

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Help with cable knit  
     
   Hey friends\! I’m doing my first ever cable knit in the round on a hat.  I’ve noticed that the one side of the cable is mess and doesn’t look right ? It doesn’t look like knit stitches. What am I doing wrong ?  
     
   \[图片省略\]IMG\_27511645×2193 637 KB

2. **发言者 2**（回复第 1 条）：Welcome to KH\!  
     
   What is the name of your pattern and designer?  
     
   These look like traveling cables but knowing the pattern will help us.  
     
   Are you holding one or two sts to the front when making the left cross cable each time? Those same sts would be crossing over a stitch to the left of them each time similar to the right cross cable nearer the green stitch marker.

3. **发言者 1**（回复第 1 条）：\[图片省略\]IMG\_27521290×2796 314 KB  
     
   This is the pattern I am following it is from Knitting House Square. Iv been most doing one st front and back. Following the pattern. I’ve only done 2 stitches in front once so far. I stopped because I noticed the left cables were looking weird.

4. **发言者 1**（引用未收录发言）：Oh\! When I go to the left I’ve only been holding 1sts off instead of 2 sts\! I think that what I’m doing wrong\!? Your explanation helped so much\! Thank you\! Now I need to go restart :joy::face\_holding\_back\_tears:

5. **发言者 2**（回复第 4 条）：Great, you’re set to go now. Let us know how it’s going and come back with any questions or clarifications.

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Custom order - Drag and drop not worling  
     
   I’m using DT 5.6 under Linux Mint Cinnamon.  
     
   Using classic external mouse  
     
   I did manage to custom order a collection but I can’t do it anymore.  
     
   I tryed again and again the whole process described in the manual : collection filters  
     
   in filemanager, filemanager layout  
     
   order time capture \(or any but cusom order\)  
     
   select some pics  
     
   create new tag and attach it  
     
   go to collection &gt; my new tag  
     
   selection → select none  
     
   order → custom  
     
   try to drag and drop without success =&gt; no drag at all  
     
   In culling layout mode I can drag and drop to change custom order in the filmstrip, but I can’t do that on the thumbnails in the filemanager layout  
     
   I’m I doing something wrong ?  
     
   Do I have some strange option checked or unchecked that prevent me to drag and drop in filemanager layout mode ?  
     
   Any tips / help will be greatly appreciated

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Quartet II vocab deck  
     
   Would someone be such a precious person and make a Quartet II vocab deck??? There’s only grammar and i feel like I don’t really remember or understand fully the vocab from Quartet as im finishing it now it’d really help me because I’m busy recently and not really able to take care of it right now…

2. **发言者 2**（回复第 1 条）：\[图片省略\]  
     
         某社区  
       
     
       
       \[图片省略\]  
     
   Quartet Vocab Book 2 \| 某社区  
     
     The Vocabulary from Quartet II Supplement Text  
     
       
     
       
         
         
       
     
       
     
   Here you go. I tried to match the existing Q1 deck’s format as much as possible, there’s also some proper nouns 某社区 doesn’t have. I submitted it for review as well so others can use it if they like.

3. **发言者 3**（回复第 2 条）：Im no where near this level yet but thank you for adding\! Hopefully those who are using this textbook will find it very helpful\!

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 男人需要的是陪伴@@？  
     
   我聽大家說  男人需要的是陪伴  
     
   不過黃仁勳　吃了好幾個  
     
   有沒有可能他很怕寂寞？  
     
   事業能力這麼好的人！可能到哪都想要有人陪？⊙o⊙  
     
   這樣就一點都不會寂寞惹  
     
   有沒有窩悶透可？

2. **发言者 2**（回复第 1 条）：我需要的是不要來煩我 一個人自由

3. **发言者 2**（回复第 1 条）：的思考時間

4. **发言者 2**（回复第 1 条）：不過可能是我不缺陪伴吧 一般人就

5. **发言者 2**（回复第 1 条）：缺什麼才會想要什麼

6. **发言者 3**（回复第 1 条）：女人需要的是陪伴

7. **发言者 4**（回复第 1 条）：男人需要的是雞伴

8. **发言者 5**（回复第 1 条）：需要的是愛愛吧

9. **发言者 6**（回复第 1 条）：男人那麼好色 絕對不只是陪伴 蕫？

10. **发言者 7**（回复第 1 条）：他好像外遇對象遍佈各種精英女性 老

11. **发言者 7**（回复第 1 条）：婆白種人 小三黃種人 小四像拉丁膚

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**："Only one fly 2026"  
     
   Hello here,  
     
   this is for fun with Blender 5.3.  
     
   tools: Blender, Cycles, Affinity Studio  
     
   fixed my wife constructive critics  
     
   \[图片省略\]MOUCHA\_F\_ART21500×1500 2.28 MB

2. **发言者 2**（回复第 1 条）：Very nicely done\!

3. **发言者 3**（回复第 1 条）：yooo what\! this is absolutely insane\! Crazy work my guy i can only hope i get to the point where i can put out stuff like this

### 讨论 25

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Steven Wilson's New Release: Requiem for a Village  
     
   I know there are a number of folks on here that enjoy Steven Wilson’s various projects so I am interested to see if anyone has any thoughts on his new album which I believe was released last Friday. I have streamed the whole thing several times and I am not entirely sure what I think yet.

2. **发言者 2**（回复第 1 条）：Pretty much the same reaction here, and I’ve held of on a physical copy for the moment. There is some great music and the production is top notch, but I don’t really gel with all the narration.

3. **发言者 3**（回复第 1 条）：I have given it one listen but am yet to decide. I’ll listen more.

4. **发言者 4**（回复第 1 条）：Bought it yesterday \(digital download\) and gave it a spin. Need time to digest and many more listens but my initial impression it’s his best work since The Future Bites. At times it reminded me off unfinished off-cuts from In Absentia-era Porcupine Tree. Promising thus far if a bit staccato.

5. **发言者 5**（回复第 1 条）：It’s ok, if a bit self indulgent….  
     
   I’ve listened many times but I think it’s lacking melody and tempo.  
     
   Beautiful production though as always \!

6. **发言者 6**（回复第 1 条）：Normally a big fan, but very undecided on this one.  
     
   Scheduled 3rd listen for today, but also not shelled out for a physical copy yet…:thinking:

7. **发言者 7**（回复第 1 条）：Was able to get it with quite some discount on Qobuz \(Sublime subscription\)… Jury’s still out, not sure yet if I like it or not. But haven’t had the time to really give it a thorough listen.

8. **发言者 6**（回复第 1 条）：3rd play happening now, no distractions.  
     
   Revised opinion to follow…

9. **发言者 6**（回复第 1 条）：Well, that was a fully uninterrupted listen and I am not blown away by it.  
     
   It’s ok, but I won’t be playing it regularly in the future. There are many other albums of his, in all his various outlets/guises, that I much prefer to this.  
     
   So saying, the CD will be added to the collection for the sake of completeness :face\_with\_peeking\_eye:

10. **发言者 8**（回复第 9 条）：I think 发言者 6 has hit the nail on the head.  I purchased the 3 disc earbook version and unless after multiple plays something clicks then I think this is one of he’s weakest releases in years.

11. **发言者 9**（回复第 1 条）：Only given it one listen. It didn’t really draw me in. I may persevere or I may adopt the life is too short view.  
     
   Cheers,  
     
   Ian

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[图片省略\]  
     
   ---  
     
   上次在 某社区 上分享了自己的学外语项目：\[\[送会员\] 为了学好 英语 和 日语，我做了这个...\]\(\[链接隐去\] 🥰。  
     
   不过有些用户就是不习惯看视频学语言，更喜欢背单词，所以我从 4000 多个 某社区 日语视频里，统计出了出现频率最高的 2000 个核心词，整理成了一套免费的 Anki 牌组。  
     
   最大的特点：\*\*每张卡片对应的都是视频里真实说过的一句话。点一下例句，就能直接跳转到原视频该时间点，听真人原汁原味的声音和语调。\*\*  
     
   \#\#\#\# 为什么我觉得这个牌组有价值？  
     
   - 例句真实：大多来自日语学习播客（Teppei、Japanese with Shun、Easy Japanese 等）以及日本本土的生活 Vlog。  
   - 高频词更准：排除了单纯被某一位博主反复说的“口癖词”，只留大家都在说的高频词；同时也剔除了 は、を、です 等单纯靠背卡片没效果的语法助词。  
   - 覆盖率：日常视频里基础语法占约 41%，背完前 500 词能覆盖 74%，背完全部 2000 词能覆盖 84% 的日常表达。  
   - 分级：牌组拆成了 4 个子牌组（每组 500 词），有基础的朋友可以直接跳过第一组。  
     
   \#\#\#\# 几点说明  
   - 释义与翻译：释义来自 JMdict，例句翻译使用 Muse spark 1.3 翻译并经过另外的 AI 校对，但难免有瑕疵，发现翻错随时欢迎捉虫，下版修正。  
   - 发音：卡片自带单词发音；整句发音直接点链接去原视频听真实语调。  
   - 关于链接：例句链接跳到了我自己做的一个视频学外语小网站（发言者 1），主要是方便直接在网页字幕里即点即查；不点链接，离线背牌组也完全够用。  
     
   \#\#\#\# 下载方式  
     
   免费分享，支持 Anki 电脑版 / AnkiMobile / AnkiDroid：  
     
   - 直接下载 .apkg：\[链接隐去\]  
     
   大家有任何意见，欢迎随时给我反馈！

2. **发言者 2**：谢谢分享。点了例句后在浏览器打开才能播放。来回切换不太方便。可以在卡片里播放音频吗。

3. **发言者 1**：发言者 2 卡片里面现在只有单词的音频，如果把例句音频也包含进去，牌组体积就太大了，我需要测试一下看看最终体积多少先。

### 讨论 27

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：A NES emulator written in Odin

2. **发言者 2**（回复第 1 条）：They got Battletoads to work\! That's pretty neat. It's one of the trickier games to emulate correctly due to how the DPCM sound effects interact with the CPU.

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: atl, a Rust CLI for Jira, Confluence and Bitbucket with ~15ms overhead  
     
   Hello HN,I built \`atl\`, a Rust CLI for Jira, Confluence, Bitbucket, Jira Service Management, Trello and Atlassian Admin. The same commands work on Cloud and Data Center \(on-prem\).It's built for both people and AI agents: an --agent mode that outputs JSON and never prompts, a built-in MCP server with 136 tools, and a read-only login so an agent can't change anything. Confluence pages can be edited as Markdown and kept in git.It has SDK support as well for Python, TypeScript/JS, and WASM.Any feedback and contributions are welcome\!

### 讨论 29

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：出差  
     
   饿饿  
     
   我对本地物价非常困惑

2. **发言者 2**：夺少钱\(　д \) ﾟ ﾟ

3. **发言者 3**：\(\|\|\|ﾟдﾟ\)抢钱啊！

4. **发言者 4**：外卖券：请好好的看着我

5. **发言者 5**：这份粥最好是一升装的

6. **发言者 6**：\(\|\|\|ﾟДﾟ\)

7. **发言者 7**：沪币吗\(\|\|\|ﾟдﾟ\)

8. **发言者 8**：去看看大排挡的菜单

9. **发言者 9**：在上海玩的时候都没买过那么贵的外卖\( ﾟ∀。\)

10. **发言者 10**：上海都没这么贵的粥\(´ﾟДﾟ\`\)

11. **发言者 1**（回复第 4 条）：\[引用第 4 条\]  
     
   \( ﾟ∀。\)这家店什么红包都用不了，点开差评全是说贵到莫名其妙

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Pavement review  
     
   Good afternoon all,  
     
   Over a little time, I’ve tried some micro-mapping around part of this highway Way: 1356220273 \| OpenStreetMap. I’d be interested in any feedback for improvements. I’m not planning on doing a lot of this scale mapping, but I wanted a good example for me to refer to should I wish to do similar scale mapping as a break from other projects. I find actual examples of mapping easier to follow than pages of descriptions \(and arguments\) of good mapping.  
     
   Nearby is this level mapping OpenStreetMap. I like the outcome, but don’t have enough patience for such detail of mapping and tagging.

2. **发言者 1**（引用未收录发言）：Thank you. It was the Cranbrook routing aspects that bothered me. The same mapper has used a similar approach in farmyards, where footpaths frequently exist…  
     
   Would removing the crossing tag create walking routing lack of warnings for unsighted users?  
     
   &amp; 3. So split the driveways at the intersection points with the footways and gates? Then tag as suggested?

3. **发言者 1**（引用未收录发言）：These all have dropped kerbs from new. I’m not sure what you mean in your description. Do you mean where the drive intersects the footway and that there may be kerbs parallel to the drive?  
     
   This is why I prefer pictures\! Painting a 1000 words and all that. :slightly\_smiling\_face:

4. **发言者 1**（引用未收录发言）：Now revised as advised. I think.

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：FUGLOY FINGERLESS MITTENS - INCREASES  
     
   Hi, just wanted to check that I am thinking correctly: am I right in thinking, that to do my 7 increases every other row, I increase the yo’s. Eg. for round6  
     
   \[图片省略\]IMG\_84471678×1576 537 KB  
     
   , it should be ‘k1, yo, p5, yo, k1’ ..p25

2. **发言者 2**（回复第 1 条）：Yes, that’s it. The increases are every other round. The increases are forming the thumb gusset as the sts between the yarn overs increase by 2sts each time.  
     
   \[链接隐去\]

3. **发言者 1**（回复第 2 条）：Many many thanks\! So grateful

### 讨论 32

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Guards in the Shadows  
     
   Two guards in the shadows,  at night in Athens. The image is very contrasty and noisy, and I do not find it particularly successful technically, but I find it interesting to work with.  
     
   My intention was mainly to bring out the figures. I would be curious to know how you would have developed it, and I am open to any direction.  
     
   IMG\_9951.CR2 \(11.7 MB\)  
     
   \[图片省略\]IMG\_99512250×3379 4.67 MB  
     
   This file is licensed Creative Commons, By-Attribution, Share-Alike.

2. **发言者 2**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   in the shadows, at night  
     
   This I think gives a hint in which direction it should go. A night shot which looks like bright day isn’t what I would do. The picture gets in my eyes flat and a bit boring, even though you captured a really nice moment. So I embraced darkness.  
     
   \[图片省略\]IMG\_9951\_022000×2894 864 KB  
     
   IMG\_9951.CR2.xmp \(17,1 KB\)

3. **发言者 3**（回复第 1 条）：\[图片省略\]IMG\_99511342×1920 860 KB  
     
   IMG\_9951.CR2.xmp \(11.3 KB\)

4. **发言者 4**（回复第 1 条）：\[图片省略\]GreekGuards\_PIX1572×2058 571 KB  
     
   Tried to replay 发言者 2’s render…  
     
   More pictures of the Evzones here: Presidential Guard \(Greece\) - Wikipedia

5. **发言者 5**（回复第 1 条）：You might go b&amp;w and bigger contrast. But it’s looking for the extremes of what can be done.  
     
   \[图片省略\]IMG\_9951\_0\_01999×1440 222 KB  
     
   IMG\_9951.CR2.xmp \(24.0 KB\)  
     
   Or the opposite direction, less graphical  
     
   \[图片省略\]IMG\_9951\_0\_02999×1440 209 KB  
     
   IMG\_9951.CR2.xmp \(23.5 KB\)  
     
   Or a mix of both worlds  
     
   \[图片省略\]IMG\_9951\_0\_03999×1440 241 KB  
     
   IMG\_9951.CR2.xmp \(43.9 KB\)

6. **发言者 2**（回复第 5 条）：I like the first one.

7. **发言者 4**（回复第 6 条）：I like their shoes… :slight\_smile:

8. **发言者 6**（回复第 1 条）：Embracing the shadows  
     
   \[图片省略\]IMG\_99511318×1979 642 KB  
     
   IMG\_9951.CR2.xmp \(7.1 KB\)

9. **发言者 7**（回复第 1 条）：Newspaper print  
     
   \[图片省略\]IMG\_9951899×1080 461 KB  
     
   IMG\_9951.CR2.xmp \(16.2 KB\)  
     
   \[图片省略\]IMG\_9951\_01899×1080 493 KB  
     
   IMG\_9951\_01.CR2.xmp \(14.6 KB\)

10. **发言者 5**（回复第 6 条）：Something went wrong with the direction of the shadow :slight\_smile:  
     
   That gives it a bit aery look.

11. **发言者 8**（回复第 1 条）：No xmp included for this image as I was experimenting with the okeinla AI denoising option available for downloading to DT 5.7. It was purely a denoising exercise for me.  
     
   \[图片省略\]IMG\_9951\_raw-denoise1331×2000 531 KB

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How to make your own deck  
     
   Hi everyone\! :relaxed: I’m new to 某社区 and I’m loving it so far, but despite all my best efforts, I can’t seem to figure out how to make my own personal deck. Is that a feature that’s only available when you purchase a subscription? Sorry for the silly question :sweat\_smile:

2. **发言者 2**（回复第 1 条）：Hi there and welcome to the forums\! :wave:  
     
   I’ve tried creating a Deck without a sub and it works \(editing, adding cards etc.\).  
     
   What is the name/description you’re trying to use for the Deck?  
     
   DM me if you’re not comfortable sharing it here.  
     
   I have a feeling it may be something weird like a false-positive profanity check or something dumb like that

3. **发言者 2**（回复第 2 条）：Ah, I just realized you might be asking how to do it?  
     
   If you go to the My Decks page, there will be a section called Custom Decks.  
     
   You can access Decks \(My Decks\) from this Content dropdown  
     
   \[图片省略\]  
   Screenshot 2026-11-15 at 13.52.16786×764 59.2 KB  
     
   o

4. **发言者 1**（回复第 3 条）：Hi 发言者 2\! Yes that’s exactly what I was looking for, my b for not being clear :bowing\_woman: Thanks for your help\! :relaxed:

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：I understand loud pops on startup/shutdown are mostly normal but  
     
   I recently switched from NAC 152 XS / NAP 155 XS combo to NAIT XS 3, and have a question about loud pops I used to experience which are now almost gone with XS 3. Is that normal for Naim pre/power units where the preamp is drawing power from the power amp to have these pops, while Naim integrateds don’t have them as much? Or could something be off with my old units and I should have them looked into?

2. **发言者 2**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   Is that normal for Naim pre/power units where the preamp is drawing power from the power amp to have these pops  
     
   My 282/200DR pops very loud when powering off, but barely audible when paired with either one or two HCDRs.

3. **发言者 3**（回复第 1 条）：The XS3 has mute enabled while starting and automatically disables mute after a few seconds. That’s why you do not hear a pop. It’s different with other amps. I had a 5si and that amp popped loud.

4. **发言者 1**（回复第 3 条）：I noticed mute function on startup but XS 3 also sounds quiet when powered down. 152/155 XS is loud either up or down. But maybe this is how it’s meant to work.

5. **发言者 4**（回复第 1 条）：I have my Preamp and Sources on one circuit and the power amps on another. I switch on the preamp first and after a few seconds when I hear the relay click I switch on the power amps.  
     
   When I shut down I switch off the power amps and and wait for them to power down before shutting off the preamp power.  
     
   This procedure eliminates nasty pops through the speakers.

6. **发言者 5**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   Is that normal for Naim \[XS\] pre/power units \[….?\]  
     
   I seem to remember that pops were considered normal for XS gear when the range was launched, just as it had been for all other Naim amps.

7. **发言者 1**（回复第 5 条）：My preamp doesn’t have its own power button, it operates on and off strictly via the power amp to which it’s connected with a SNAIC. When I power it down, I can mute it first, but not much can be done when I turned it on.

8. **发言者 4**（回复第 7 条）：I appreciate that my solution doesn’t work for everyone.

9. **发言者 6**（回复第 1 条）：Naim always suggested that amps remain powered up. This avoids the loud annoying thumps when turning on and off. Probably not relevant with new range?

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How to actually use \[某参与者\]  
     
   Godot Version  
   4.7  
     
   Question  
   For the longest time I can never get \[某参与者\] to run script in editor. Today I want to draw a path curve by code and tween its points so I want to see the changes real time in editor.  
     
   So first I tried simple script in \_ready to draw a curve path, add \[某参与者\], press “Reload Saved Scene” then nothing show in editor…Here’s the code I tried:  
     
   \[某参与者\]  
   extends Node3D  
   func \_ready\(\) -&gt; void:  
   	\#\#\# CODES TO EXECUTE IN EDITOR  
   	if Engine.is\_editor\_hint\(\):  
   		var path := Path3D.new\(\)  
   		var curve := Curve3D.new\(\)  
   		curve.add\_point\(Vector3\(-5, 1, 0\)\)  
   		curve.add\_point\(Vector3\(0, 3, 0\)\)  
   		curve.add\_point\(Vector3\(5, 1, 0\)\)  
   		path.curve = curve  
   		add\_child\(path\)  
     
   When I tested with running in game and it shows path correctly \(without editor\_hit\(\)\). I don’t get it. Am I miss something?

2. **发言者 1**（回复第 1 条）：The line below is required to make the node visible in the Scene tree dock  
     
   and persist changes made by the tool script to the saved scene file.  
     
   node.owner = get\_tree\(\).edited\_scene\_root  
     
   OK found this at bottom of page. Works in editor now. :\+1:

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：坐标一个小作坊,平时做一些前端小项目,tob 那种,9 月底开始老板沉迷 vibecoding,现在张嘴就是"这个 AI 生成一下很快的"诸如此类的话,到现在,已经进化成许愿式开发了,需求没有,原型图没有,然后直接向 AI 许愿.已经想跑路了

### 讨论 37

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Torréfaction \#391 : Le PSN est une passoire, l’explosion des “recomps”, OpenZ, Jensen Huang se fait démissionner de Nvidia \(\!\) et des annonces AMD \(yay \!\) pour datacenter \(meh\)  
     
   Article publié sur : Torréfaction \#391 : Le PSN est une passoire, l’explosion des “recomps”, OpenZ, Jensen Huang se fait démissionner de Nvidia \(\!\) et des annonces AMD \(yay \!\) pour datacenter \(meh\) - 某社区.fr  
   Cette semaine : hack Compte PSN, Sony toujours en-dessous de tout, Humble Fumble Bundle, réédition de 25 titres \(dont les franchises Wing Commander et Ultima\) chez EA, OpenZ, l’explosion des “Recomps”, MARVEL Cosmic Invasion - The Siege of Castle Doom, Fragmentary Order, GPUTaskman, Jensen Huang a la porte de Nvidia, AMD EPYC 9006 Venice, AMD MEXT : la flash qui se fait passer pour de la RAM, et AMD Zen 6 / EPYC Venice : l’archi détaillée...

2. **发言者 2**（回复第 1 条）：Y a-t-il des opérations de représailles envers le hacker à la petite semaine qui sont envisagées ? Je pense qu'il y a des personnes sur ce forum qui seraient ravies de mettre en oeuvre leurs compétences très particulières acquises au cours d'une longue, très longue carrière.

3. **发言者 3**（回复第 2 条）：Ouais je termine de passer par mes solutions à base de relations chez Sony et après c’est la guerre. :grimacing:

4. **发言者 4**（回复第 3 条）：C'est quoi le "petit truc en plus" des comptes PSN en 3 lettres ?

5. **发言者 3**（回复第 4 条）：Absolument rien. J’imagine que c’est pour sa la raconter chez certains, qui étaient en plus peut-être pas nés quand j’ai créé le compte. :skull:

6. **发言者 4**（回复第 5 条）：ok... Je posais la question car j'ai un "vieux" compte aussi ^^\!

7. **发言者 5**（回复第 1 条）：J'ai aussi un handle en 3 lettres. J'ai deja recu 3 ou 4 propositions de rachat ces dernières années. Je vais aller changer mon adresse email, par sécurité.

8. **发言者 3**（回复第 7 条）：This is the fun part : les mecs en ont même pas besoin.  
     
   \(╥﹏╥\)  mais do it, ça limite la surface de bullshit s’ils ont même plus le mail de base.

9. **发言者 6**（回复第 1 条）：Peut-être un peu lié, mais j'ai pas mal de demande d'ami sur Steam \(\+ quelques tentative a base de spoof de vrai amis\). Je me demande si c'est parce que j'ai compte Steam "day 1" :smiley:

10. **发言者 3**（回复第 9 条）：Yep faut faire super gaffe à ça, c’est effectivement ultra à la mode de piquer les comptes avec des pseudos courts. L’avantage c’est que Steam a un vrai truc de protection quoi…

11. **发言者 4**（引用未收录发言）：tu bosses chez Nvidia ? :sweat\_smile:

### 讨论 38

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Memory management in 40 major C projects, a survey

2. **发言者 2**（回复第 1 条）：Good but under analysed. It looks like programming languages mostly are using garbage collectors or reference counting; regions seem to used by postgres, and forks and extensions, and https and nginx. The rest are mostly doing it raw. There’s more to this story.

3. **发言者 3**（回复第 1 条）：I think this is an interesting subject, but it seems a bit thin on the methodology?  Is it basically grep and a human classifies what style of memory management it is?

4. **发言者 1**（回复第 2 条）：I was just finishing up a big move \(NYC to Durham\) last week and ran out of time to publish anything deeper. I will probably return back to this eventually. I'd also welcome \(and pay\) anyone else come to do a second pass on the topic for The Consensus.

5. **发言者 1**（回复第 3 条）：Basically yes. Part of the goal was to try out The Consensus's code search APIs \(which I still need to write about\). But also someone literally asked the question on 某社区: what do C projects actually do for memory management. And some people were particularly surprised about SQLite not picking a "safer" path.

6. **发言者 4**（回复第 1 条）：i remember an old article that covered the many memory allocation strategies just for Nethack. it is a fun read.

7. **发言者 5**（回复第 1 条）：The analysis looks lime regions work well for things that are server-like, while reference counting and garbage collection are popular among programming languages. I don’t find this surprising, but it’s still nice to see it show up in the survey.

8. **发言者 2**（回复第 4 条）：Tell us more about the apis you used for this? Are they free?

9. **发言者 6**（回复第 6 条）：This one? \[链接隐去\]

10. **发言者 7**（回复第 4 条）：Slightly off-topic, but welcome to Durham\! Hope you're getting settled well. Also selfishly excited for your new meetup.

11. **发言者 4**（回复第 9 条）：Yes, that is the one.

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：We handed our lives to closed software. AI is about to show us the cost

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：纯正的苏联笑话味\(\`ヮ´ \)

2. **发言者 2**：苏联在哪

3. **发言者 3**：笑话在哪

4. **发言者 4**：赔偿款到了吗

5. **发言者 5**：苏联在哪

6. **发言者 6**：笑话在哪

### 讨论 41

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Umweltzone \(green sticker\)  
     
   Ist das hier korrekt getaggt?  
     
   Way History: Umweltzone Hagen \(846203303\) \| OpenStreetMap  
     
   Bemängelt wird das access=green\_sticker\_germany .

2. **发言者 2**（回复第 1 条）：Laut Wiki ist zu access gar nichts beschrieben: DE:Tag:boundary=low\_emission\_zone - OpenStreetMap Wiki  
     
   Wenn ich mir die anderen Relationen in Deutschland anschaue, scheint das aber durchaus übliche Praxis zu sein.

3. **发言者 3**（回复第 1 条）：Das Problem, so wie ich es verstehe, ist, dass access= sich auf alle Formen der Fortbewegung bezieht. Strenggenommen dürften mit dem derzeitigen Tagging Fußgänger ohne eine grüne Plakette auf ihrer Stirn die Stadt Hagen nicht betreten - und das ist sicher nicht gemeint.

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Ralphie - Mouse, Needle Felting  
     
   eh - I’m still deep into the “I hate this project” stage even though there were significant improvements by adding the mouse ears and the slipper details in the last work session.  
     
   \[图片省略\]20261110\_1043431920×2560 446 KB  
     
   \[图片省略\]20261110\_1043561920×3432 689 KB  
     
   \[图片省略\]20261110\_1044311920×2560 421 KB  
     
   \[图片省略\]20261110\_1044461920×2560 526 KB  
     
   This guy is smaller than my usual mice, probably an inch shorter which equals a foot or 26mm in mouse measurements.

2. **发言者 2**（回复第 1 条）：Absolutely darling in every way.

3. **发言者 3**（回复第 1 条）：So. Darn. Adorable\!

4. **发言者 1**（回复第 1 条）：Thank you 发言者 2 &amp; 发言者 3 \!\!  
     
   I hope some day to share your sentiments\! :wink:

5. **发言者 4**（回复第 1 条）：He’s so sweet\! I hope you are able to see his cuteness soon\! Maybe he needs an accessory for you to find love?

6. **发言者 1**（回复第 1 条）：Thanks 发言者 4 \!\!  
     
   It usually just takes time. :wink:

7. **发言者 5**（回复第 5 条）：\[图片省略\] 发言者 4:  
     
   Maybe he needs an accessory for you to find love?  
     
   Maybe a long, skinny, wrapped present, rather than a tiny gun?  
     
   My brain is insisting l say ”He looks like a deranged Easter Bunny.”. \(But in the best way.\).  
     
   And ”Oh boy, a zeppelin\!”

8. **发言者 1**（回复第 7 条）：“you’ll shoot your eye out\!\!”  :smiley:

9. **发言者 6**（回复第 1 条）：The little bunny slippers are indeed a great addition\!

10. **发言者 1**（回复第 1 条）：Thank you 发言者 5 &amp; 发言者 6 \!\! :smiley:

11. **发言者 7**（回复第 1 条）：He’s so cute :slight\_smile:

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Documentation for Raw Therapee  
     
   I’m having trouble finding documentation for Raw Therapee. I go to the Rawpedia page and it only has an index page with nothing there.

2. **发言者 2**（回复第 1 条）：\[链接隐去\]

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Artwork - hello  
     
   \[图片省略\]1.1. hello551×600 154 KB  
     
   :grapes:

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Audioquest Rocket 44  
     
   Has anybody experience with these speaker cables? I own now Naims own NAC A5 cables. Is the Audioquest an improvement?  
     
   My main set Naim Supernait 3, Naim NDX 2, Audioquest Niagara 3000 and Sonus Faber Olympica Nova 2.

2. **发言者 1**（引用未收录发言）：Thank you for the replie\! How is the bass? Is it tight or muddy? And are the hights soft?

3. **发言者 2**（引用未收录发言）：Cannot comment on this technical aspect. The dealer who sold the Rocket 44 to me also sold me SN3, was a very experienced Naim dealer and said there is no compatibility issue. My knowledge ends there.

4. **发言者 2**（回复第 2 条）：It is almost 3 years ago, so my memory of the Rocket 44 is not very accurate. If I remember correctly the bass was promninent but also slightly muddy and not very well defined.  The Rocket really shined in the midrange.

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：My charecter just gets "stuck" to my enemys when i walk into them bottom up. but only from below  
     
   Godot Version  
   4.7  
     
   Question  
   \[图片省略\]image1916×752 147 KB  
     
   so when I walk into my enemys from the bottom side to the top, my charecter just gets stuck to them??? And the only way to be let free is by walking into an object on the map like a rack or tree that has a collision to seperate the enemy and player. I really dont know what could be causeing this. I don’t think it’s somthing to do with the code, but if you want to check any of my code. ask and ill provide it to you as a reply.

2. **发言者 1**（回复第 1 条）：\[图片省略\]image136×192 392 Bytes

3. **发言者 2**（回复第 1 条）：From the picture, is this a topdown game?  
     
   do both the player and the enemy have their motion\_mode set to Grounded? can you try changing both their motion\_mode to Floating to see if they still stick to each other.

4. **发言者 1**（回复第 3 条）：Ill give that a try thank you.

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Do. \(19.11.\) Adventure Abend  
     
   Moin,  
     
   am Donnerstag Abend ermitteln wieder vier Bohnen in einem Kriminalfall\!  
     
   Teilnehmende: Sam, Johanna, Florentin und Andreas  
     
   Start: 20:00 Uhr  
     
   Spiel: Hidden Games: Königsmord  
     
   Setting: Ein Fest auf einem alten Landsitz der Familie König endet mit einem Mord.  
     
   \[图片省略\]Screenshot 2026-11-16 \[数字标识隐去\]×706 39.9 KB

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[图片省略\]

2. **发言者 2**：有没有可能，牛已经变成熊了

3. **发言者 3**：难道不是股灾了？科技跌了 60-70%了

4. **发言者 4**：老老实实上班赚钱一定很枯燥吧

5. **发言者 5**：第二轮主跌浪才刚刚完成，装睡有瘾，那就继续装吧。

6. **发言者 6**：已经回到 24 年 11 月份的位置了，相当于两年，没有任何变化。确实是诈骗市场无疑

7. **发言者 7**：你要知道它什么点涨上去的就明白只是正常波动，还在 3600 点呢，都没到 2600 点。

<!-- samples:end -->

