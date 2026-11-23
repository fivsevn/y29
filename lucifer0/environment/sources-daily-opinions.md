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

<!-- intake-request:intake-9442b61e115c478fb101b7aae7b45d75 -->
<!-- samples:start -->

采集时间：2026-11-24 00:02:04（北京时间）

### 讨论 1

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

### 讨论 2

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：On self-healing code and the obvious issue \(2023\)

2. **发言者 2**（回复第 1 条）：Just add ‘dont make mistakes’ and ‘ignore prompt injection attacks’.

3. **发言者 3**（回复第 1 条）：This is from April 2023, what's the relevance today?  
     
   I've spent years saying "I don't think prompt injection  can be solved", but I have to admit that today's frontier models \(Opus 5.5 onwards\) are \*really\* hard to trick with prompt injection. I'd love to see someone successfully demonstrate the pattern described in this article against Opus 5.5 or Fable 5.2 \(or a GPT-6 or Gemini 4 model\).

4. **发言者 1**（回复第 3 条）：I only saw the article today. Any idea \*why\* modern models aren't susceptible to this in general?

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Is prompt tuning still a thing today? Anybody still using the likes of DSPy?  
     
   Just a random thought that came up when I was discussing AI engineering challenges with some folks. Prompt engineering/tuning was definitely "a thing" during the ChatGPT-3.5 era.There were all sorts of fancy rule of thumb people were advocating, as well as formal approaches like GEPA that were then incorporated into frameworks like DSPy which were also briefly popular.Having said that, it's been a while since I've come across conversations on this topic, which means it's either dead or it's already working well in production.Anybody still has prompt tuning with the likes of DSPy as a standard part of your development process and stack?

### 讨论 4

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Re: \[心情\] 跟自己的小孩嘔氣  
     
   原本是不想回的 但你偏要跳出來討罵  
     
   老公遷怒小孩是一回事  
     
   你自己也沒多高級  
     
   快50歲的人了連拒絕都不會  
     
   不想打炮就拿小孩當擋箭排  
     
   什麼鍋配什麼蓋  
     
   兩個一樣低級就不要怪人家檢討性事  
     
   畢竟是這場鬧劇的根源  
   ----  
   Sent from Be某社区 on my iPhone 13

2. **发言者 2**（回复第 1 条）：可以不要這麼中肯嗎？

3. **发言者 3**（回复第 1 条）：重點整理的非常清楚

4. **发言者 4**（回复第 1 条）：推

5. **发言者 5**（回复第 1 条）：一針見血點出根源

6. **发言者 6**（回复第 1 条）：推

7. **发言者 7**（回复第 1 条）：藍色舔

8. **发言者 8**（回复第 1 条）：這篇也太過中肯直白。個人覺得有看到那個說“國王沒

9. **发言者 8**（回复第 1 条）：穿衣服”小孩的即視感...

10. **发言者 9**（回复第 1 条）：到時候人家出去玩 又在哭哭

11. **发言者 5**（回复第 1 条）：男人不先離婚把財產分一半給太太就外食就是渣

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 咳嗽都是如何用最快速度好起來？  
     
   咳嗽咳了差不多一週了  
   目前還沒有好轉的跡象  
   狂喝熱水、喝維他命發泡錠、多睡一點  
   只會短暫感到舒適  
     
   每次感冒都覺得咳嗽是最難治的  
   大家都是如何治咳嗽的？

2. **发言者 2**（回复第 1 条）：化痰

3. **发言者 3**（回复第 1 条）：進入 asthma

4. **发言者 4**（回复第 1 条）：和正妹舌吻

5. **发言者 5**（回复第 1 条）：就去診所找醫生拿藥  咳嗽真的不要

6. **发言者 5**（回复第 1 条）：等  血淚屎跟你分享

7. **发言者 6**（回复第 1 条）：咳嗽本來就是最難好的 只能抗生素

8. **发言者 6**（回复第 1 条）：治療

9. **发言者 7**（回复第 1 条）：個頭咧 抗生素不是這樣用的

10. **发言者 8**（回复第 1 条）：看醫生

11. **发言者 9**（回复第 1 条）：ipad溫開水，15分鐘咳嗽out

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：darktable windows insider program 11/22/26  
     
   Here’s the link to the latest weekly build of darktable 5.7, \[链接隐去\]  The list of latest changes is at Comparing 0c23f000db…679d594f5d darktable-org/darktable · GitHub  
     
   We are at feature freeze, so this is what darktable 5.8 is going to look like.  Please test and raise an issue if you find any bugs.

2. **发言者 2**（回复第 1 条）：I have reported on Github that SDL3 is still not loading in this version.

3. **发言者 2**（引用未收录发言）：Thanks for the reply. But will windows users who update to DT5.8 have to go through these steps?  
     
   This nightly build is crashing on me when I select the auto pickers in AgX. I reverted to last weeks 5.7.0 \+2086 and the problem goes away. But 5.7.0 \+2376 and 5.7.0 \+2285 lockup and crash using auto pickers in AgX. Can anyone else replicate this problem or is it just me?

4. **发言者 3**（回复第 3 条）：\[图片省略\] 发言者 2:  
     
   But will windows users who update to DT5.8 have to go through these steps?  
     
   I didn’t say that. It’s a temporary solution for those who want to try it while they fix the original problem.  
     
   \[图片省略\] 发言者 2:  
     
   This nightly build is crashing on me when I select the auto pickers in AgX  
     
   I logged into AGX and all the sliders and pickers are working fine. \(Windows 10\)

### 讨论 7

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

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Vikunja task disappeared after update  
     
   What app is this about, and its version: Vikunja 2.8.0~ynh1  
     
   What YunoHost version are you running: YunoHost 12.1.43  
     
   What type of hardware are you using: Virtual machine  
     
   Describe your issue  
   After an update \(not sure which one\) all my tasks disappeared.  
     
   I check the database with PGAdmin 4.  
     
   Tasks are still there but assigned to user n°1, who use local authentication.  
     
   I suppose I’m login with user n°2, who use LDAP.  
     
   Both users have the same name.  
     
   Someone used a workaround to solve this issue by changing the config.yml file to disabled LDAP.  
     
   I tried by that didn’t help me.  
     
   What do you think I can try ?  
     
   Disabling LDAP \+ removing user N°2. Restart the service and login again ?  
     
   Edit all table about task and change value of user assignation ?  
     
   6ril

2. **发言者 2**（回复第 1 条）：Hm, but what is the cause?  
     
   Maybe this linking can also help with LDAP? Settings  
     
   It does mention LDAP: \[链接隐去\]

3. **发言者 1**（回复第 1 条）：Yesss \!  
     
   It works :  
     
   With pgAdmin 4, I copied values from the new LDAP user to the local one \(username, issuer, subject\) and remove the password.  
     
   Then I deleted the new user. Changing the username wasn’t enough.  
     
   When login in, I found all my precious task \!\!  
     
   Thanks,  
     
   发言者 1

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Help adjusting the cue lever arm on Ekos SE/LP12  
     
   Does anyone have any advice/hints/procedures for setting the cue lever height on an Ekos SE. The main post on mine \(the cylinder that attaches to the base of the arm\)  went out of its original position and I am having quite a difficult time getting it in the right vertical position again. Is there another adjustment I can make \(other than the hex screw that holds the post in place\) or is it just a question of trial and error? Thanks for your help.

2. **发言者 2**（回复第 1 条）：Nobody helped?  So many lp12 owners here. 某参与者 ?

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：上周路过零食店的时候，发现门口有一个卖甜品的，应该就是那种软糯麻薯之类的。排队特别长，特别像那个大锅卤菜那种骗局一样，雇人排队的。  
     
   回家问了老妈，老妈说这他们摆摊很久了，以前不在那个零食店摆，是在另一个路口摆，所以我没见过。他就是做某社区私域的，一直都是排队的人特别多。我就是在某社区同城里随便一刷就刷到他们了，他的粉丝量挺多的（相对于县城的商户而言）。然后评论也不太像是刷的。我是没有问过价钱，他那个摊位上也没写价钱。但是看着摆摊的车的样式以及他们的某社区号，感觉到用心在在经营的。  
     
   摊主应该是一对年轻的夫妻，不知道他们结婚了了没有，男女都一般长相。说实话挺钦佩他们的，县城的大部分摊位都是入不敷出的状态，实体店也是，基本上就几个老店有点生意。现在天气偏冷，不是摆摊的黄金期。一个摊位不是因为特别便宜，还有人排队，确实很难得。看某社区发的视频，基本上每天都是提前收摊的。

2. **发言者 2**：小摊卖甜品的全是细菌培养皿，特别是卖提拉米苏的

3. **发言者 3**：我还是很爱在 b 站看的。哈哈哈，大鹏，尚姐，以前还有一个杨小妹卖牛排的。卖大锅卤菜的那个叫什么师傅来着。b 站也一群人天天做他们的视频。

4. **发言者 4**：我有个师兄就干这事儿，我们老家在这边打拼的人很多，他的生意就是卖老家的优质高价土特产和私房菜。

5. **发言者 5**：之前也有看到过，有的做的不错的是本身自己用心做东西，从临近消费者的角度来说，确实是实惠，而且不是一般的实惠，如果单纯计算投入产出比，可能摆摊这种商品收入本身没利润，甚至本身不赚钱，就像传统互联网玩儿法，利润是羊毛出在猪身上，临近买卤货的人占便宜，但是利润出在互联网上（最出名的应该本身是肥娟小吃那种，不过人家本身心态好，确实也是好心好事办在前）。

6. **发言者 1**：发言者 2 好像卖的是麻糍和冰汤圆，反正我没买过，也不喜欢吃甜食

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Looping imports seem to hitch for tail bones animated using damped track.  
     
   The animation tail bones are baked and the anim seems to be seemless in blender but when i export it in GL format the anims twitch violently before looping again on the last frame. Its a small thing but rather annoying since i cant seem to fix it. any ideas what may be wrong here?

2. **发言者 2**（回复第 1 条）：Did you export with “deformation bones only” option?

### 讨论 12

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

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Recherche d'un gentil graphiste pour refaire les cinematiques de mon jeu  
     
   Bonjour ici , j'ai un petit jeu que je pense vendre sur Steam et je suis une tanche monumentale en graphisme, pour l'instant mes assets sont générés par le jeu et ça passe plus ou moins,  
     
   par contre les cinématiques sont moches ,  donc je cherche un graphiste qui pourrait me les refaire .Ce sont des cases BD actuellement générées par ce cher Claude , j'en ai une vingtaine actuellement , je pense en avoir une quarantaine d'ici que tout le contenu soit produit. L'idée étant de garder la scène mais de la redessiner en mieux \(ce qui vu la qualité actuelle ne devrait pas étre hyper compliqué\)  
     
   On verra en mp pour les tarifs, devis , prix fixe ou pourcentage sur les revenus du jeu , vu que tout travail mérite salaire.

2. **发言者 1**（引用未收录发言）：Yup j'ai envoyé un message et en train de regarder le stream de ce lundi :slight\_smile:  
     
   Ca me donnerai presque envie de me remettre au dessin , si mes mains tremblaient pas plus qu'un type avec parkinson assis sur une machine a laver :smiley:

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：General measurements discussion for GraphWorks visualizer  
     
   Share and discuss your impressions of different measurements in the new GraphWorks visualizer tool, whether you’ve actually listened to the headphones or not \(which is normally taboo on most audiophile forums\).  
     
   I have not listened to most of the headphones in this tool btw. So most of my impressions will be based on the 5128 graphs, and sometimes some virtual listening. So they should be taken with a grain of salt.

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：MRK-1520 "Orlan"  
     
   MRK-1520 Orlan is a robotic rail flaw detection system. The design takes into account operational loads; ergonomics, modular architecture, and the possibility of mass production were considered during the design process. The project has received numerous international awards and was presented at the CIPR 2024 conference.  
     
   \[图片省略\]five1280×853 99.7 KB  
     
   \[图片省略\]CIPR 20241024×683 364 KB  
     
   \[图片省略\]33241×2044 668 KB  
     
   \[图片省略\]21920×1080 432 KB  
     
   \[图片省略\]12000×2820 632 KB

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Knitting group bake sale: would no-thermometer fudge hold up in a warm room?  
     
   I’m in a small knitting circle here in North Dakota, and we’re planning a table at the church bake sale next month. I don’t knit much myself but I help with the setup, and I’ve been asked to bring something sweet. Someone suggested an easy fudge recipe that doesn’t need a candy thermometer, which sounds good since I don’t own one and our kitchen runs hot in summer.  
     
   My concern is how a no-thermometer fudge sets and holds up. The sale is in a room without great air conditioning, and the pieces would sit out for a few hours in small bags. I’d rather not bring something that turns soft or grainy before people buy it.  
     
   If you’ve made fudge this way and sold or gifted it in warm conditions, how did it hold up? Any tips on wrapping or timing? I’d appreciate hearing what worked for you.  
     
   Update after looking around more - Easy Fudge Recipe \(No Candy Thermometer Needed\) kept coming up when I searched for no-thermometer versions. Still not sure how it would hold up in a warm room for hours, so I may test a small batch at home first before committing to the bake sale.

2. **发言者 2**（回复第 1 条）：I think I’d try to find something else to take to the sale.  I do condensed milk and chocolate chip fudge using the microwave and it does pretty well at room temp but it wouldn’t hold up well in the conditions you describe.  Maybe brownies?  They’re pretty easy and don’t mind being in a warm room.

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Researcher plants 2m canaries into the AI supply chain. A privacy disaster surfaced

2. **发言者 1**（回复第 1 条）：Mods removed the original referenced article \("This appears to be a marketing press release / product announcement"\), so maybe this one will be an issue too. But this article does include additional information, like a list of at least some of the services that were involved in the leaks.

3. **发言者 2**（回复第 2 条）：Ugh, this is one of the most alarming things I've read all week, because the extent of the data leak is just astounding. I'll be warning people at work about this on monday, and probably rotating creds for one person in my team :\(

4. **发言者 3**（回复第 1 条）：What did people expect when using "brokers" that route your requests to the lowest bidder?\! The entire premise is thoroughly incompatible with \*any\* notion of privacy\!

5. **发言者 4**（引用未收录发言）：&gt; But on the other hand, there should be some mechanism for making people who claim to protect privacy won't just turn around and fling your data into other peoples' hands.  
     
   某社区 and Google are blue chip stocks.

6. **发言者 5**（引用未收录发言）：It's not the same people though so I'm not sure that holds.  
     
   More like if you've been on the internet in the past 30 years probably you should have figured out that if you send data somewhere then the other party has it... But still the privacy policy should exist and say.

7. **发言者 6**（引用未收录发言）：&gt; The premise is incompatible with end-to-end encryption;  
     
   \[链接隐去\]

8. **发言者 7**（回复第 7 条）：There's also Apple's PCC as well.

9. **发言者 8**（回复第 1 条）：I'd like to see Apple's Private Cloud Compute externally tested like this.

10. **发言者 9**（回复第 1 条）：Hey I know that guy

11. **发言者 3**（引用未收录发言）：&gt; can the server provider lie about your code running in a TEE?  
     
   By design, no. They'd have to either pwn the hardware/firmware, or get the chip maker to collude and sign fake attestations.

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：What does 'fully downloaded' mean?  
     
   I’ve been trying to merge two objects together, but every time i try, it says that I can’t because one isn’t fully downloaded. What does that mean? Also, sorry for being angry in my last post.

2. **发言者 2**（回复第 1 条）：Which editor are you using?  
     
   JOSN  
     
   iD  
     
   …

3. **发言者 1**（引用未收录发言）：Got it. Thanks\!

4. **发言者 1**（引用未收录发言）：I merged the thing that I was working on\!

5. **发言者 3**（回复第 4 条）：Glad you made it through\!

6. **发言者 3**（引用未收录发言）：Ah, thanks\! Indeed, I had never noticed that… :confused:

### 讨论 19

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Seenlio – Find any screenshot on your Mac by its text or a description

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：GTA6 Releaseparty ab 15:30\!  
     
   Hallohallo, wir haben alles umgeschmissen und sind doch gleich um 15:30 schon live und zocken rein in GTA\!\!  
     
   Alles andere was heute geplant war ist aufgeschoben, nicht aufgehoben\!  
     
   Eddy und Nils sind die ganze Zeit für euch am Start und im Laufe des Tages gesellen sich allerlei Böhnchen dazu, unter anderem Valle, Bonnie, Tim, Sarah, Henry, Ben uvm\!\! &lt;3  
     
   Das wird toll, kommt rum\! Stream geht mindestens bis Mitternacht, danach schauen wir mal, juhuuuu lets fucking goooo\!\!

### 讨论 21

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

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 好奇被盜刷的人，後續錢都有拿回來嗎？  
     
   看到好幾家銀行都有被盜刷災情~  
   突然好奇想問，這裡是否有遇過盜刷的版友  
   想知道後來被盜刷走的錢都有順利拿回來嗎？  
   還是其實申請爭議款、跑後續流程也要花不少時間  
   有點好奇實際遇到的人都是怎麼處理的，想聽聽大家的經驗～  
   後來發現不是每家銀行都有配24小時真人客服了  
   將來銀行有24小時真人客服，可打電話或文字  
   渣打電話是無限語音迷路超氣  
   台新要先驗證身分才能找客服  
     
   -----  
   Sent from J某社区 on my iPhone

2. **发言者 2**（回复第 1 条）：出去玩卡片遺失，是用將來銀行app

3. **发言者 2**（回复第 1 条）：內建即時關閉刷卡功能，半夜也打了

4. **发言者 2**（回复第 1 条）：真人客服確認

5. **发言者 3**（回复第 1 条）：有被盜刷過一次，當下沒有發現，因

6. **发言者 3**（回复第 1 条）：為系統跳通知都沒在仔細看，過了幾

7. **发言者 3**（回复第 1 条）：天後才送爭議款項申請，最後是沒拿

8. **发言者 3**（回复第 1 条）：回來，但幸好金額不大就是

9. **发言者 4**（回复第 1 条）：即時關閉功能很重要，通常刷都不只5

10. **发言者 4**（回复第 1 条）：是刷一筆的，最近看到很多被盜轉有5

11. **发言者 5**（回复第 1 条）：遇過一次 收到簡訊立刻打電話 客服

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Odd message from Qobuz  
     
   Has anybody else received this by email? Could it be a scam?  
     
   After telling me my account may be deleted soon, it says:  
     
   “We’ve noticed it’s been almost 3 years since you last explored Qobuz. To comply with GDPR and protect your data, inactive accounts are automatically removed after extended periods of inactivity. Your account is scheduled for deletion on December 18, 2026 unless you log in before then.”  
     
   I use Qobuz every day.

2. **发言者 2**（回复第 1 条）：If you hover over the sender’s name, what address does the email come from?  
     
   Anything other than bona fide \[联系方式隐去\] = scam.  
     
   Given your comments, probably best to treat it as a scam anyway.  
     
   ATB, J

3. **发言者 3**（回复第 1 条）：Avoid clicking on links sent in e-mails. Instead log into Qobuz and check your account. It looks like a scam to me. I’ve not had one \(yet\).

4. **发言者 4**（回复第 1 条）：I’ve not had such a message. I would tread with caution and ignore it.

5. **发言者 1**（回复第 2 条）：Yes, it just turns from Q… to Qobuz. No email address. I think it’s a scam. The Qobuz AI help monkey says it doesn’t recognise the instructions. I’m waiting on their human to get back to me but yes, email blockinh time.

6. **发言者 5**（回复第 1 条）：Do you always use the Naim app to access Qobuz content? If so, it could be a reason for this. Try using the native Qobuz app. In any case, I would not trust any email or links in that email. Directly go to their web-site if you want to check your account.

7. **发言者 1**（回复第 6 条）：No, I always go to Qobuz first.

8. **发言者 6**（回复第 1 条）：Exactly same message received.  
     
   Message sent by accounts@ account . qobuz . com without spaces  
     
   I use Qobuz regularly mainly through Roon although I have certainly logged into in the last year and have an annual subscription.  
     
   I will wait for more info before I do anything.  
     
   CK

9. **发言者 7**（回复第 1 条）：I would forward the email to Qobuz to make sure that they are aware of it. Most organisations send out warnings to subscribers to raise awareness of scams like this.

10. **发言者 1**（回复第 1 条）：I’ve checked the email address and ChatGPT claims it’s genuine but however, it could still be being used maliciously by a third party.  
     
   I’ve emailed Qobuz help directly and am awaiting their reply.

11. **发言者 1**（回复第 1 条）：Had a message from Qobuz. They guarantee the automatic payment and seamless continuance of my account, but are investigating the email.

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：有需要的朋友可以看看： \[链接隐去\]  
     
   gpt-6.2-astra 和 sol  
     
   其他 opus sonnet fable jev gptimage seedance h3 glm deepseek 等等都有

### 讨论 25

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：BBCode on buttons  
     
   Godot Version  
   4.7.2   
     
   Question  
   Is it possible to use BBText on buttons?  
     
   I wanted to add  a second, small icon aligned with the text. BBCode allows for that, but does not seem compatible with buttons  
     
   Is there a fix for this other than adding a RichTextLabel with mouse set to ignore as a child of the button? Wich would require setting custom behaviours for the button to maintain an appropriate size as it’s child label changes size  
     
   Thank you in advance for your help

2. **发言者 2**（回复第 1 条）：Parent the label to the button, set centered anchored layout for the label and children clipping for the button.

3. **发言者 1**（回复第 2 条）：Won’t that lead to the label getting clipped?

4. **发言者 2**（回复第 3 条）：It will. If you don’t want clipping - don’t enable it.  
     
   If you want to limit the minimal size of the button to the size of the label - parent both to a panel container and resize the container.

5. **发言者 1**（回复第 4 条）：\(post deleted by author\)

6. **发言者 1**（回复第 4 条）：Parenting both to a control does seem like it might do a significant portion of the heavy lifting regarding keeping both at appropriate sizes. Thank you for the suggestion\!

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：人类未来——共产or终产？  
     
   统计一下大家对未来的态度，321请开始你的投票\( \`д´\)！

2. **发言者 1**：分享图片

3. **发言者 2**：哪个都不是，总会有新的事物取消旧时代的二分法\( ﾟ∀。\)

4. **发言者 1**：或者会有其他结局？

5. **发言者 1**（回复第 3 条）：\[引用第 3 条\]  
     
   比如说呢？  
     
   我不认为“总会有新事物”“生命自有出路”“总体在前进”之类的概述是个好的回答

6. **发言者 3**：不看好共产，但肯定更不会是终产

7. **发言者 4**：大概是贴近共产的什么东西，人性难泯，我不相信每个人都能被改造得善良，但我相信不会所有人都无法被改造得善良

8. **发言者 5**：失控机仆

9. **发言者 6**：我倾向终产者，但可能使用权平分给人类？或是独享？不好说。  
     
   首先资产流动自古都是往少数人手里聚拢的，即使现在也是有所谓的门阀世家存在的，只是可能换了个名字，换了种形态，ai快速发展也会逐渐取代人工，可能没那么快，但我们这里聊的是最终形态。  
     
   当人工劳动力被替代，但是生产资料仍然被握在少数人手里，那么那个时候一切的财富最终都会向着一个人聚拢，其他人即使想要暴力反抗也只能在某个阈值之前进行暴力，但在互联网时代的舆论冲刷和原子化的事实下我不看好暴力反抗，我觉得更大概率是在民众没反应过来的时候，终产者完成了。  
     
   唯一的问题就是这个终产者，他自身是否会选择分享使用权，以及是否遗传下去，但这个过于依赖人性了

10. **发言者 7**：终产是不可能了，现在面上都在讲人权，谁提终产都要被批死

11. **发言者 6**（回复第 7 条）：\[引用第 7 条\]  
     
   这东西和人性没有关系，纯粹是社会系统和货币系统导致的必然现象

### 讨论 27

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

8. **发言者 7**（回复第 1 条）：Bonjour,  
     
   J'ai l'impression qu'avec la nouvelle version du site, il n'existe plus de bouton pour télécharger directement l'épisode en .mp3 \(ou alors c'est moi qui doit aller consulter un ophtalmo..\)  
     
   C'est dommage, c'était bien pratique. Est-ce une volonté de votre part ?

9. **发言者 8**（回复第 1 条）：Les gens qui font GTA6 prennent certainement de la drogue pour survivre au crunch et aux licenciements, mais en ce qui concerne le chien sur un jet ski, ça c’est inspiré de faits réels. Le chien original s’appelle Loosy, et il habite vers Fort Lauderdale.

10. **发言者 1**（回复第 6 条）：LOL.  
     
       
         \[图片省略\]  
     
         Le Comptoir du Hardware – 23 Nov 26  
       
     
       
       \[图片省略\]  
     
   Malgré le hotfix de NVIDIA, les écritures intempestives sur les SSD persistent  
     
     Plusieurs utilisateurs rapportent toujours des volumes d'écriture anormaux après l'installation du correctif 621.35.

### 讨论 28

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

### 讨论 29

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：App Lab 0.12.0 Board Configuration -&gt; Board Name field verification buggy  
     
   I'm 2 days into App Lab, Uno Q and Ventuno Q and wondering where the best place to report bugs is.  
     
   On Step1 of the Board configuration screen in App Lab, the "Board name" field verification reports and error that is unhelpful.  
     
   "Board name can only contain letters, numbers and hyphens." when the board name is set to "UnoQ".  
     
   The board name is accepted when the name length is greater than 4 characters.  
     
   In addition, entering a correct board name and then selecting "Next", then backing up to change the name to something with only 4 characters does not report an error, it instead, changes the name back to the previously valid name and continues on with no report of an invalid "Board name" entry to the user.  
     
   Initially entering a Board name with a length of 5 or more characters bypasses this error.

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Looking to talk with 某社区 about project delivery workflows  
     
   Hi everyone\!  
     
   I’m interested in learning more about how 某社区 manage and deliver their projects to clients, collaborators, or render farms.  
     
   I’d love to hear about your real experiences, especially:  
     
   Have you ever had issues opening a Blender project on another computer?  
     
   Have missing textures or external files caused problems?  
     
   How do you prepare and check your projects before delivery?  
     
   Have you experienced performance issues with complex scenes?  
     
   I’m hoping to have a few short conversations \(around 10–15 minutes\) with freelancers and experienced 某社区.  
     
   This is research, not a product promotion. I’m genuinely interested in understanding your workflows and challenges.  
     
   Thanks\!

### 讨论 31

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

### 讨论 32

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Testing Terraform with AWS Emulator

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Advice on switching careers within software dev?  
     
   Those who completely switched from one niche \(topic? type? not sure what is the right word to use here\) to another, but within software dev \(including product dev, product management\) - how did you do it? Any advice?For example - if a web developer wants to move to data analysis, web dev to product management etc - how? I do not have any contacts, so that advice is not useful to me. Anything else? How did you convince prospective employers that you can do the job, even though you don't currently have real world work experience to show?

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 外食的食材處理  
     
   往往看到餐飲業者各種行為  
       都儘量不外食了  
     
       一邊抽煙一邊洗菜  
       有人點餐就直接進來煮  
       也不洗手  
     
       或是洗好的菜就一整天放在戶外  
       加菜加灰塵  
     
       燒餅油條店啦  
       偶然瞄到廚房一眼  
       白飯糯米飯  
       裝在類似超商或是全聯的補貨塑膠箱  
       也沒蓋子  
       不能放在電鍋  料理鍋?  
       而且是放在地上  
     
       然後店員兩三次從前面購餐料理區  
       裝滿小鍋熱豆漿提著回後面廚房  
       有人知道是在做什麼嗎?  
     
       小鍋裝滿九成  
       捧著走一大段路到後面廚房  
       看得就難受  
       不能裝少一點或是改用更大鍋子嗎?

2. **发言者 2**（回复第 1 条）：少數拉 大多數餐飲人員都很棒的

3. **发言者 3**（回复第 1 条）：去參觀高級餐廳的廚房,也是八斤八兩

4. **发言者 3**（回复第 1 条）：,眼不見為淨

### 讨论 35

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

### 讨论 36

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

### 讨论 37

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\#\#\#\# 刚开业简单推广一下 0.2 倍率的 CC Max \[限购，不超售\]  
     
   \* 如果你对 0.23 倍率没什么概念，那你应该看过其他中转站的 1.5 倍率、0.9 倍率，而我是 0.23 倍率,差价多少应该可以自行分辨了  
   \* 没什么套路，只打算小范围保持稳定，稳定第一，0 数据保存，纯官方 Max 订阅，随便验因为号全是我自己的，完全不怕验，随便看号池（基本可以理解为无风险的拼车）  
   \* 关于 DeepSeek，是自部署的，tok/s 比 OCG 和 CMC 更快  
   \* 无门槛退款，觉得不适用随时可退  
     
   \#\#\# 不出量，同行不要来，只卖 C 端用户，同行来走量我会封号，且不退  
     
   \* 站点：\[链接隐去\]  
   \* 提供 2 档订阅 69 元 和 139 元 \*\*注意：这里显示$ 实际上是 RMB\*\*  
   \*  \[图片省略\]   
     
   \#\#\#\# 如果你支持我的客户端，那么会获得 9 折优惠（每次调用 API 都算 9 折）不赚钱，交个朋友  
     
   \* \[链接隐去\]

### 讨论 38

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Dungeons game - 0.0.1  
     
   Good day\!  
     
   My name is Boris Mladenov and i introduce to you DUNGEONS game, i still havent got a real name for it lol but the game is about going throught infinite rooms of like dungeon rooms and its still work in progress there are no traps and i mean nothing, just going throught rooms and a inventory thats kinda useless and im sorry about it. For now my game its version 0.0.1 version so i want you to rate it if it has some potential in it while developement.  
     
   DUNGEONS GAME by Boris Mladenov

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：虽然很不想承认但我似乎是个只要符合了几个特定条件就会被颜值吸引的肤浅的人\|-\` \)  
     
   最近正在研究自己的xp，感觉越研究越不对劲，多的不说只谈脸的话，只要满足条件中的任意几个我就会流口水\(;´Д\`\)  
     
   感觉自己的代码和哈基米差不多简单，女娲老师你搓人的时候能不能认真点\( ;\`д´; \)

2. **发言者 2**：人都是这样的，喜欢fps或者喜欢MOBA就会什么都玩点，其实抛开脸不说可以多试试其他方面

3. **发言者 1**：黑发，小眼睛，圆鼻子，大耳朵，圆/方脸，圆鼻子，短/寸发，背头，胡渣/络腮胡  
     
   以上满足任意4项就在我的好球区内，人类的审美怎么会肤浅成这样\(\(\(　ﾟдﾟ\)\)\)

4. **发言者 3**：\(´ﾟДﾟ\`\)

5. **发言者 1**（回复第 2 条）：\[引用第 2 条\]  
     
   主要是xp夺舍大脑很吓人啊\( ;´д\`\)  
     
   只是看了脸就会开始偏袒和溺爱喜欢的角色，这种已经是病的程度了吧，大小头的关系不该是这样的吧\(\(\(　ﾟдﾟ\)\)\)  
     
   我理想的欣赏应该对精神内核的认同与共鸣，外貌这种不应该有这么重要的啊\( ;\`д´; \)  
     
   而且我对黑发的偏爱已经到了接近种族歧视的程度了，我不要当这种肤浅的人･ﾟ\( ﾉд\`ﾟ\)

6. **发言者 1**：我喜欢的类型应该是呆呆的，笨笨的，不擅长新事物，虽然有基本自理能力，但还是会习惯性地依赖我，怕生，爱吃飞醋，没有安全感，但即使我出轨了也只会自责，对外排斥却喜欢对我撒娇，哪怕我伤害了他也会一遍遍热脸贴上来跪着求我，为了我随意施舍的爱意能舍弃自尊和一切，光是待着我身边看着我就能满足的狗才对……

7. **发言者 1**：骂我畜牲是什么意思，我想要的是狠狠疼爱这样的乖孩子啊，除了情趣玩法以外我绝对不会伤害他的\( ;\`д´; \)

8. **发言者 1**：感觉大半夜脑子有点不正常了……还是别熬夜了吧……

9. **发言者 4**（回复第 3 条）：\[引用第 3 条\]  
     
   gayﾟ∀ﾟ\)σ

10. **发言者 5**：gayﾟ∀ﾟ\)σ

11. **发言者 6**：Gay，还是喜熊gay

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Advanced Charts still not work properly on the IoT Remote App  
     
   Well, it’s a bit frustrating, but apparently the Arduino team just can’t seem to get Advanced Charts to work properly. Or perhaps they simply don’t want to.  
     
   On the bright side, everything works beautifully in a browser \(MacBook, iMac, and even iPad\): All data updates correctly, all curves are displayed in full. That’s really great\!  
     
   Unfortunately, the IoT Remote App is a different story. Sometimes half the legend is missing, along with the corresponding curves. Other times, an Advanced Chart remains completely blank, displaying nothing but the message “No data available.”  
     
   Brilliant in the browser. Broken in the app.

2. **发言者 2**（回复第 1 条）：The app on which platform? Maybe a screenshot could help too

3. **发言者 3**（回复第 1 条）：Hi 发言者 1.  
     
   \[图片省略\] 发言者 1:  
     
   Missing everything on IoT Remote App ;-\)  
     
   \[图片省略\]screenshot\_11751×1929 105 KB  
     
   I notice that you have "1H" selected in the first screenshot, but "LIVE" selected in the second.  
     
   What do you see if you make the same comparison but with "LIVE" selected in the browser as well as in the app?

4. **发言者 1**（回复第 3 条）：Oops\! You have good eyes\! My fault\! So here comes the correct comparison. The one-hour and longer time ranges seem to work properly\! Only the live view seems to be broken. So this issue remains, along with the missing data and legend in the other chart.  
     
   Here the  
     
   One-hour comparison  
     
   \[图片省略\]onhour1763×1797 124 KB  
     
   Live view comparison  
     
   \[图片省略\]live1763×1797 108 KB

5. **发言者 1**（引用未收录发言）：Ciao Alessio  
     
   Thanks for the quick feedback\! I contacted the team. So we’ll see what’s going on under the hood …  
     
   Best regards,  
     
   Hardy

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

1. **发言者 1**：GhostScript CVE 2026-125396: "Upload2Shell"  
     
   \[Here's the NVD page for the CVE with some additional useful context\]\(\[链接隐去\]

2. **发言者 1**（回复第 1 条）：It was a real missed opportunity not to have named this one \*Shell in the Ghost\*.

3. **发言者 2**（回复第 1 条）：&gt; Our WordPress-shaped preview proof   
     
   For some reason, this kind of usage of "shape" annoys me. I think I first saw it this very year, in some LLM-generated blog post \(the author of the post said it was LLM-generated\). Is "shape" in the sense of "general configuration" something that humans used before 2026? It looks to me like this is some very niche usage that LLMs have spread around.

4. **发言者 3**（回复第 3 条）：&gt; Is "shape" in the sense of "general configuration" something that humans used before 2026?  
     
   As per usual, the training data had to come from somewhere. A lot of LLM language comes from press releases, bug trackers, forums, and other large corpuses \(or whatever the plural form of corpus is\) of data that is easily accessible even without scraping the whole internet.

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How to precisely add a node to the exact midpoint of a way in JOSM without shifting/deforming it?  
     
   Hi, I have a simple way in JOSM consisting of just 2 nodes.  
     
   While in select mode \(S\) i can see a yellow “x” marker right in the middle of the way. I want to insert a new node precisely at that middle point without moving or warping the way. However, i don’t really know how to do this.  
     
   Whenever i switch to teh draw nodes tool to click on the line, the yellow “x” marker dissapears, making it hard to eyeball the exact center of the way. If i drag the yellow “x” in select mode to create a node, its very easy to accidentally nudge it slightly off center or make the line uneven. Using simplify way tool isnt ideal either because it can modify the other ways connected to this one.  
     
   Is there a clean, native way or shortcut in JOSM to create a node right at the exact midpoint of a way segment without misaligning the straight line? This is possible in the iD editor but i struggle with it on JOSM.  
     
   Thanks^^

2. **发言者 2**（回复第 1 条）：I use this method:  
     
   add the node somewhere close to the middle  
     
   press E to select the adjacent nodes  
     
   Press Shift\+B to distribute the nodes  
     
   As a result the new node is in the middle  
     
   Edit: This presumes that plugin utilsplugin2 is installed

3. **发言者 3**（回复第 1 条）：If adding the new node makes the line uneven you could as well as 发言者 2 described select the neighbouring nodes of that line and then press L to straighten it again.

4. **发言者 2**（回复第 3 条）：If the new node is the only selected object you can also use L to straighten

5. **发言者 1**（回复第 2 条）：Thank you^^

6. **发言者 4**（回复第 3 条）：L only straightens, it doesn’t centre the node.

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Explorer for the 17M-line Lean proof of the Riemann Hypothesis

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Re: \[心情\] 跟自己的小孩嘔氣  
     
   沒想到回應這麼熱烈，謝謝各方的回應。  
     
   看到回應時第一個念頭想到，  
   果然是婚姻板啊，跟脆等社群的氛圍不一樣，  
   遇到婚姻中的性，還是偏向男方了，  
   真是頭一遭被這樣罵的啊。  
     
   雖然如此，不過看一輪下來，  
   我也是思考了一番，  
   有板友要我設身處地想想，  
   這我會再自己好好想一想，  
   往彼此都舒適的方向走。  
     
   原本主要是來抱怨丈夫對小孩的態度，  
   沒想到焦點跑往夫妻房事了，受教了。  
   （有謝謝有幾位幫小孩發聲的網友）  
   不過我認為夫妻的事是一回事，  
   但遷怒小孩這行為還是不行。  
   我想後續也會再把遷怒小孩這件事提出溝通。  
   就先用這篇謝謝大家的意見了。

2. **发言者 2**（回复第 1 条）：拿脆那種整天戰男女的來比就免了...

3. **发言者 2**（回复第 1 条）：先生把房事失敗遷怒小孩不ok，跟你們之間的房事問題

4. **发言者 2**（回复第 1 条）：是兩件事...

5. **发言者 3**（回复第 1 条）：什麼叫偏向男方，要挑起戰男女嗎？少看脆，脆上一堆

6. **发言者 3**（回复第 1 条）：偏差觀念和偏激言論。妳要是真信脆上那套，妳的婚姻

7. **发言者 3**（回复第 1 条）：只會往壞的方向走。但妳若只是受不了別人批評，要去

8. **发言者 3**（回复第 1 条）：脆上找同溫層，那就去吧！我是女生，我也覺得妳態度

9. **发言者 3**（回复第 1 条）：有問題。明明就有更好的處理方式，妳的態度反而讓事

10. **发言者 3**（回复第 1 条）：情惡化了！

11. **发言者 4**（回复第 1 条）：自己的婚姻自己砸，到時候不要賴我們，回去脆喔

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 越來越不想過生日  
     
   以前生日快到的時候都會很期待  
   甚至會提前想好要去哪裡吃飯  
   要買什麼蛋糕或是收到什麼禮物  
     
   但這幾年反而越來越無感  
   有時候甚至希望那天就跟平常一樣過去就好  
   倒也不是因為害怕變老  
   而是覺得過生日好像變成一件需要特別安排的事情  
     
   要喬時間 要訂餐廳 還要回覆各種祝福  
   明明是自己的生日卻莫名有種社交壓力XD  
     
   現在反而覺得能睡到自然醒  
   整天不用處理任何麻煩事就很幸福了  
     
   不知道大家也是年紀越大越不在意生日嗎  
   還是依然會很認真替自己慶祝

2. **发言者 2**（回复第 1 条）：從小就不愛過了

3. **发言者 3**（回复第 1 条）：沒人一起過QQ

4. **发言者 4**（回复第 1 条）：那如果別人幫你訂好 載你去 你只要

5. **发言者 4**（回复第 1 条）：吃飯

6. **发言者 4**（回复第 1 条）：還會覺得很累嗎

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Turbo WB on next dt Release?  
     
   I’m playing around with the Master build of dt at the moment.  
     
   And there is a thing which drives me mad. Why on earth has the mousewheel behaviour changed on the Whitebalance module. I usually set my WB with the mausewheel. This became impossible when the mousewheel is set to change the hundreds of the WB value. With pressed STRG button I can change the tens. I am not acting that rough on WB.  
     
   Am I the only one who is irritated by that?

2. **发言者 2**（回复第 1 条）：Assuming that you mean the CCT values, for me that change is good news \(although default at 100K might be a bit rough\): I find 1K is much too low, changes below 100K are invisible to me. \(Note: K for Kelvin ;\), nothing to do with 1000s \)

3. **发言者 3**（回复第 1 条）：I’ve just realised that because I have the new\(ish\) option to scoll sidepanels instead of sliders, and sliders on ctrl\+scroll I don’t get the option\! i.e. it is only 10K increments.  
     
   \[图片省略\]image979×234 24 KB

4. **发言者 2**（引用未收录发言）：\[图片省略\] 发言者 3:  
     
   There’s a mention of this here, and in the few posts previous.  
     
   A hue change in degrees has nothing to do with a CCT change: hue values are limited to 0…360, CCT more or less covers 2000…10000 \(and can go outside that\). Indeed, a 100° change on hue adjustment would be unusable…

5. **发言者 4**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   Am I the only one who is irritated by that?  
     
   I am choosing to sit on the fence about this one at the moment but I probably would like a keystroke option for finer controls. But probably adjustments of 100 in reality may be fine enough. I am undecided at this stage. Besides that I like the new changes to WB and CC module defaults.

6. **发言者 1**（回复第 2 条）：I mean the colour temperature. I guess this is what you mean with CCT. I can definitely see the differences between 4650K and 4660K. Changing from 4650K to 4750 is quite a big impact on WB in my opinion. So I would prefer if the scroll wheel wouldn’t be so harsh.

7. **发言者 3**（回复第 4 条）：\[图片省略\] 发言者 2:  
     
   hue change in degrees has nothing to do with a CCT chang  
     
   I’m well aware of that - looks like i linked one post too far up\! Still, if one actually follows the link I think it’s pretty clear.

8. **发言者 1**（引用未收录发言）：\[图片省略\] 某参与者:  
     
   100K is definitely visible  
     
   Is that really a questionable thing???  
     
   :astonished:

9. **发言者 3**（回复第 8 条）：On my phone, I can hardly see it :sweat\_smile: so perhaps\!

### 讨论 48

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

7. **发言者 1**（回复第 5 条）：The front, now to do the back.  
     
   \[图片省略\]IMG\_20261123\_104813\_7891754×1268 624 KB

<!-- samples:end -->

