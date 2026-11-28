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

<!-- intake-request:intake-9122605d16684899b91a8faf71e5bb0f -->
<!-- samples:start -->

采集时间：2026-11-28 23:58:13（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Abstracts wallpapers  
     
   Hi, just making abstract wallpapers for my desktop.  
     
   \[图片省略\]mat3\_-Camera\_00011920×1080 3.33 MB  
     
   \[图片省略\]abstract wall\_paper0021920×1080 3.22 MB  
     
   \[图片省略\]abstract wall\_paper1920×1080 3.27 MB

2. **发言者 2**（回复第 1 条）：I featured you on BlenderNation, have a great weekend\!  
     
       
     
         BlenderNation – 28 Nov 26  
       
     
       
       \[图片省略\]  
     
   Best of 某社区: 2026-48  
     
     Every week, hundreds of artists share their work on the 某社区 forum. I'm putting some of the best work in the spotlight in a weekly post here on BlenderNation.

### 讨论 2

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：想在体育板发自己减肥  
     
   但是感觉现在岛民都集中在中医  
     
   加上我也想被人回复就发在中医了  
     
   发点jp谢罪  
     
   \( \`д´\)红豆泥斯密马赛

2. **发言者 1**：今天是下午饭之前上称95kg  
     
   早上没吃  
     
   中午吃的西红柿鸡蛋盖浇饭加鸭腿去皮  
     
   晚上吃的青椒炒鸡蛋盖浇饭加鸭腿去皮  
     
   还去健身房锻炼了一个小时，爬坡鸡15分钟高位下拉45分钟  
     
   锻炼应该用组来计数但是我没记

3. **发言者 1**：分享图片

4. **发言者 1**：分享图片

5. **发言者 2**：jp是tm谁拉的草莓塔

6. **发言者 1**：我还会坚持记录下去的  
     
   肥哥们还请看在jp的份上监督我

7. **发言者 1**（回复第 5 条）：\[引用第 5 条\]  
     
   不觉得很色吗

8. **发言者 3**：穿刺公来了

9. **发言者 1**：今早上吃了阿姆斯特朗喷气式阿姆斯特朗回旋炮  
     
   和茶水

10. **发言者 1**：中午全素宴，懒得喷这哈皮食堂  
     
   要不是上班时间紧我早就出去吃了

11. **发言者 4**：Cy

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Servos backfeeding Voltage  
     
   Hello,  
     
   I am building a project that uses a 16x12 pwm servo shield to drive several servos. I am powering the shield from a ubs power brick through an adjustable step up/down module, set to 5V.  
     
   This module also has an on/off button. If i have a servo plugged into the shield and the power module is disabled, it shows 0 on its Voltage display. However, with a couple of servos, it shows some voltage \(up to 1.5\) even when disabled.  
     
   From my understanding, what is happening is that the control signal from the arduino is somehow "leaking" into the power connections of the servo.  
     
   Is this a big issue? Especially if I plan to have multiple servos plugged into the shield ?.  
     
   How can I fix it if its necessary? I wanted to  disabled/detach a servo, but the shield doesn't seem to allow that.  
     
   Thanks

2. **发言者 2**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   16x12 pwm servo shield  
     
   Can you provide a link to or a photo of the exact shield board you are using please? There seem to be a number of variants of such products about.

3. **发言者 3**（引用未收录发言）：I do know the shield, but I don't know the power module.  
     
   Please provide a link to the product.  
     
   You don't need a buck or boost converter if your supply is already 5volt.  
     
   Servos could fail when you mechanically overload them or use them past their swing range.  
     
   Cheap SG-90 servos don't always swing the full 180 degrees.

4. **发言者 1**（回复第 3 条）：Here is an amazon Link for the module \(can't say its 100% the same, since I didn't buy this one, but it almost definitely is\).  
     
   The servo don't rotate past their range. The angles aren't set to either of the extremes.  
     
   My main issue is the fact that a few of those servos "push" power into the module when it is disabled \(and therefore the servos should be unpowered\)

5. **发言者 3**（回复第 4 条）：What you're saying is not possible.  
     
   There is no electrical link between USB power from the Mega to the servo or power module.  
     
   Power can only come from the power module. Maybe it's broken, or not working as expected.  
     
   You should have used a simple female to screw adapter instead of that power module.

6. **发言者 1**（引用未收录发言）：Nevermind, its all 4 of those servos doing it now. Unfortunate

### 讨论 4

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Release candidate: Godot 4.8 RC 1  
     
   Godot 4.8 has arrived at the Release Candidate stage\!  
     
   Fuzzy searching, \`Trail3D\`, editor main screen docks, symbol renaming, and more await in a production-ready environment :rocket:  
     
   Help us get it over the finish line with one final round of testing:  
     
       
         \[图片省略\]  
     
         Godot Engine  
       
     
       
       \[图片省略\]  
     
   Release candidate: Godot 4.8 RC 1 – Godot Engine  
     
     We give thanks to our contributors for an efficent release cycle\!

### 讨论 5

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

3. **发言者 3**（回复第 1 条）：He has overtaken Agostini in terms of World Championship titles. He’s retiring at the height of his career – so he’ll always be a star in the annals of the sport. A wise decision – and he’s probably earned enough money too…

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Users asking to remove their commits under GDPR  
     
   Seeing a spike of people asking to remove their commits from open-source GitHub repositories that I am the owner of because those commits carry their personal email or other identifiers.How are you handling these?

2. **发言者 1**（回复第 1 条）：Looks like there are a lot of these on GitHub:\[链接隐去\]

3. **发言者 2**（回复第 1 条）：I'd reject it. I'm an American though. They publicly posted their commits/pull-requests, on a public platform, with a publicly available email. The email they used was completely in their control. Github makes it extremely easy to use an obfuscated email. I'm not going to rewrite the git repo history to remove an email address, not to mention rewrites are highly suspicious nowadays.

4. **发言者 3**（回复第 2 条）：Currently on the first page all of the requests are from the same person. He only promoted a service and an MCP server in the last 1 or 2 months.Yet he still has a photo of himself with his name, an X, a LinkedIn account, blogs, etc. He will have a hard time if he want to wipe himself from the internet.

5. **发言者 4**（回复第 1 条）：That’s a tricky question.Git is very good at remembering things. It’s most certainly not designed to be GDPR-friendly \(which was of course never a goal for Git\).You could filter it out but it would require a force-push and it would have consequences for other contributors.I would probably consider running this by a lawyer \(perhaps in EU\).

6. **发言者 5**（回复第 1 条）：Sounds like officious busybodies who take pleasure in making other people's lives difficult for the sake of 'the rules'™.Information on a public open source GitHub repository is - well - public by definition.Hence, I'd reject those outright.

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Systemd - Service Hardening vs Containers  
     
   Discuss  
   With all the AI-based hacking that is occurring recently, I started to spend time improving the security posture of my Yunohost instance at home. The first thing I did was remove access to all apps on my instance from the public internet, and replace it with a Tailscale network, by removing port-forwards from my firewall into my Yunohost.  
     
   The second thing I did was have my LLM run a security audit of the Yunohost apps I have installed. It gave me a list of a few more security-related flags I could add my Systemd services definitions to reduce permissions. Rather that restricting permissions, I cold remove all permissions and grant only what is necessary – that is what a container’s perspective. I believe Systemd has some container-management now.  
     
   Is anyone else here interested in having their Yunohost apps installed into a Systemd-managed container, rather than a hardened Systemd service? I’m not a security expert, so I don’t know all attack vectors, but it seems like a better security choice to me.

2. **发言者 1**（回复第 1 条）：Actually, I think there’s a lot more to the security story than just service hardening. I’ll work on an essay that considers the whole picture and share it here.

3. **发言者 2**（回复第 1 条）：Please, if you find an important security issue: send a mail to the Security team \| Yunohost instead of publish here

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：2026 Nerd Games Swap Gallery  
     
   \[图片省略\]2026 Nerd Games Swap1920×1920 958 KB  
     
   Gallery for the 2026 Nerd Games Swap

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Marmot, an alternative Go compiler

2. **发言者 2**（回复第 1 条）：1300 commits in 3 weeks, shameless.

3. **发言者 3**（回复第 1 条）：“Go, lowered to machine code”  
     
   Are there Go compilers that do not output machine code?

4. **发言者 3**（回复第 1 条）：“Small binaries. A hello world with println is 201 KB in release mode, against 1.83 MB from go build. With fmt.Println it is 698 KB against 2.43 MB.”  
     
   Since the whole website is AI generated I'm gonna assume it's just cheating and not that Go is missing an otherwise obvious optimization.

5. **发言者 3**（回复第 4 条）：\[Ah, a good part of the standard library tests fail\]\(\[链接隐去\]

6. **发言者 1**（回复第 5 条）：1. Just to be clear, this project is not mine. I posted because I found interesting.  
   2. This is definitely a work in progress. Not sure how far it'll get, though.

7. **发言者 4**（回复第 1 条）：I just want to say that TinyGo is a proven alternative Go compiler that produces, well, tiny binaries :\)  
     
   Recently, I tried compiling a program with the 30 most common packages. The main Go compiler \(gc\) produced a 4000 KB binary, while TinyGo's was only 550 KB.  
     
   By the way, Go also has an alternative GCC-based compiler \(gccgo\). I haven't tried it, though.

8. **发言者 5**（回复第 7 条）：Are there any tradeoffs?

9. **发言者 6**（回复第 8 条）：TinyGo doesn't implement all of Go, so not all programs will compile with it, not even all of the standard library. For a list of differences, see \[链接隐去\]

10. **发言者 4**（回复第 3 条）：You'd be surprised :\) There's Goscript, for example — it transpiles Go to TypeScript. GopherJS transpiles to JavaScript. I also had my own project that transpiled Go to C.

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：日区羊毛党，首三月折扣购买的。  
     
   尊敬的用户：  
      
   您好！我们将向您发放金额为 JP¥xxxxxxx 的退款。该笔退款的相应购买交易如下：所购商品：Google AI Ultra \(20 TB\) \(Google One\)；。这笔退款会退还至您完成相应购买交易时所使用的支付方式。  
     
   11 月 21 日订阅的，今天一个星期后被取消了，退款是全部退款，白嫖一星期？如果能退款不亏。  
     
   现在反重力模型确实不错，后悔当初没上一波土区，土区的兄弟还好吗？

2. **发言者 2**：3 折也被取消了吗，我 1 折的无了，本来打算弄个号重新开 3 折

3. **发言者 3**：为什么呀？

4. **发言者 1**：发言者 2 都搞不到活动链接了吧？不知道一个好被取消还去撸会不会被封号

5. **发言者 4**：第一波的土区 快一个月了， 还完好

6. **发言者 5**：今天刚买的土区三个月

7. **发言者 1**：发言者 5 什么价格 请问有渠道吗？ ultra 我看是原价呢  只有 pro 及以下才有

8. **发言者 5**（回复第 7 条）：\[引用第 7 条\] 就是新用户打折那三个月了

### 讨论 11

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

### 讨论 12

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

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：London Overound line route maps  
     
   Hello. I am trying to use OSM data to generate London Overground line diagrams using \{\{Rapid transit OSM map\}\} template on Wikipedia.  
     
   Here are the six line diagrams: User:MRSC/sandbox18 - Wikipedia  
     
   Three of them are working. Liberty/Suffragette/Lioness.  
     
   But I am struggling to get Mildmay, Weaver and Windrush working. Mildmay and Windrush have the route lines but not the stations, so I am hoping that’s an easy fix. Weaver looks like it has got mangled with Lea Valley lines and might require some untangling. But I’ve exhausted what I think are the correct updates to OSM and Wikidata and would appreciate some help.

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Jersey Cloth Details - Match It  
     
   I would like to get the same look for the blue jersey on this picture in Darktable \(processed in CaptureOne\).  Its the texture and reflection that I could not get the same.  
     
   \[图片省略\]P10015292048×1365 538 KB  
     
   My version with Darktable:  
     
   \[图片省略\]P10015292048×1294 309 KB  
     
   The raw file:  
     
   P1001529.RW2 \(34.3 MB\)  
     
   I’m certainly gonna learn something new :slight\_smile:  
     
   This file is licensed Creative Commons, By-Attribution, Share-Alike.

2. **发言者 2**（回复第 1 条）：Compare with a fast edit in Greycard:  
     
   \[图片省略\]P1001529-12048×1365 1.08 MB  
     
   P1001529.RW2.gcd.txt \(9.3 KB\)

3. **发言者 3**（回复第 1 条）：RT and GIMP  
     
   \[图片省略\]P1001529 RT and GIMP \(jpegli\)4501×3000 958 KB

4. **发言者 4**（回复第 1 条）：\[图片省略\]P1001529\_012200×1555 931 KB  
     
   P1001529.RW2.xmp \(25,5 KB\)

5. **发言者 5**（回复第 1 条）：P1001529.RW2.xmp \(14.6 KB\)  
     
   \[图片省略\]P10015292048×1365 1.12 MB

6. **发言者 6**（回复第 1 条）：\[图片省略\]P1001529-output-2048px2048×1365 426 KB  
     
   Filmulator easily recovers the details in the dark blue with just two sliders: Drama 80 and White Clipping Point 0.54

7. **发言者 7**（回复第 1 条）：\[图片省略\]P10015291919×1280 915 KB  
     
   P1001529.RW2.xmp \(16.3 KB\)

8. **发言者 1**（引用未收录发言）：Yes I added sharpening, probably I played with de-noise too, I did not notice that it was weird.  The my knowledge there is no history stack like darktable to quickly view what edits were applied.

9. **发言者 8**（回复第 1 条）：Edited to my taste, not trying to match anything. darktable 5.6.2 with FilmicRGB  
     
   \[图片省略\]P10015291979×1320 472 KB  
     
   P1001529.RW2.xmp \(8.6 KB\)

10. **发言者 7**（回复第 9 条）：The match is already in the shot\! :stuck\_out\_tongue\_winking\_eye:

### 讨论 15

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

2. **发言者 2**（回复第 1 条）：I featured you on BlenderNation, have a great weekend\!  
     
       
     
         BlenderNation – 28 Nov 26  
       
     
       
       \[图片省略\]  
     
   Best of 某社区: 2026-48  
     
     Every week, hundreds of artists share their work on the 某社区 forum. I'm putting some of the best work in the spotlight in a weekly post here on BlenderNation.

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：开个唱歌接龙串，作为龙头一号肥，我想听DOUDOU的《宝船》，二号接歌肥必须唱这个！\( \`д´\)二号唱完可以说自己想听的歌，三号接歌肥必须唱二号想听的歌，以此类推\(\`ε´ \)  
     
   ❌不会唱的可以去听来学，不能瞎几把唱别的歌\( \`д´\)  
     
   ✅敢唱就是好样的，跑调啥的无所谓，重要的是感情！清唱/带伴奏都OK，整首/一段都OK\( \`д´\)  
     
   ⚠️想一展歌喉的肥哥可以发网盘/k歌APP/录音等链接，注意保护隐私\( \`д´\)  
     
   🚫禁止高手炸鱼，说自己唱的不好然后点开一听是歌神这种通通拉屎便秘\( \`д´\)  
     
   ps：开这串主要是为了开盲盒听歌，所以一首歌有好几个肥唱这种情况无所谓，大家想唱就唱，唱的响亮，mzg会为大家鼓掌！👏🏻👏🏻👏🏻

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Light artifacts on MacOS  
     
   Godot Version  
   4.7.2  
     
   Question  
   Hello\! While developing my game I’ve noticed that on MacOS the lighting system displays some artifacts. I’ve set up a new project to test it out and the behavior still happens. I’ve run the same project on my other computer \(a Linux desktop\) and this behavior did not happen.  Here’s a screenshot of the artifact in question:  
     
   \[图片省略\]Pasted 2026-11-26 at 10.37.40 AM1087×731 24.4 KB  
     
   This only seems to happen with SpotLight3D and OmniLight3D. DirectionalLight3D and AreaLight3D seem to work fine :thinking:.  
     
   Anyone knows if there’s a fix to this or if I’m doing something wrong? I’m on MacOS 27.2.1 by the way.

2. **发言者 2**（回复第 1 条）：To me it looks like UI, but at least it strange as I never experienced it on Mac.  
     
   What’s your Mac specs?

3. **发言者 3**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   I’m on MacOS 27.2.1 by the way.  
     
   This doesn’t help us much since we would also need to know which device you’re on, there are massive differences.  
     
   Are you able to create a MRP and possibly post it here?

4. **发言者 1**（回复第 2 条）：It’s the base model of the MacBook Pro with the M4 chip and 16 GB of RAM. From my testing the artifact is more noticeable on lower resolutions \(the screenshot is 480x270\). I’ve changed the resolution to 1280x720 and the artifact is still there, just appears way smaller:  
     
   \[图片省略\]Pasted 2026-11-26 at 4.29.29 PM747×460 27.8 KB

5. **发言者 1**（回复第 3 条）：I’m on the base model of the MacBook Pro with the M4 chip and 16 GB of RAM \(this one\). I’ve also created an MRP on Github here.

6. **发言者 4**（回复第 1 条）：Since the artifacts only appear with SpotLight3D and OmniLight3D on the M4 MacBook Pro and not on the Linux desktop, the MRP on GitHub should make this much easier to narrow down. In 4.7.2, does the same thing happen if the project is switched to a different rendering method, such as Mobile or Compatibility?

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Michael Giles RIP  
     
   More sad news:  
     
       
         \[图片省略\]  
     
         the Guardian – 26 Nov 26  
       
     
       
         
     
   Michael Giles, co-founder and drummer of King Crimson, dies aged 84  
     
     The British musician brought deft playing to prog masterpiece In the Court of the Crimson King, then worked as a session musician with the likes of Bryan Ferry  
     
       
     
       
         
         
       
     
       
     
   Of the original lineup, only Fripp is left now, a testament to the restorative powers of music, champagne and cheesecake.

2. **发言者 2**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   music, champagne and cheesecake.  
     
   And Toyah.

3. **发言者 1**（回复第 2 条）：Indeed. I did think of adding the love of a wife whom he clearly adores to that list.

4. **发言者 3**（回复第 2 条）：??? Have I missed something? What has she got to do with Giles passing? Never played  on a KC or Giles solo album afaik.

5. **发言者 2**（回复第 4 条）：The reference was to the longevity of Fripp in the above posts.

6. **发言者 3**（回复第 5 条）：I’m sorry, Andy. I still do not get what Wilcox has got to do with King Crimson apart from being married to Robert Fripp. Even less to do with Michael Giles death. Maybe it’s just me.

7. **发言者 1**（回复第 6 条）：It’s called thread drift. It sometimes happens on online forums.

### 讨论 19

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

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: How to Start a Blog?  
     
   I want to start a blog primarily as a writing exercise and habit. I do not want to \(as is my habit:\) get derailed and make it a massive infrastructure optimization project :OI do own my own domain and have hosting available via ionos. I'm OK paying a small monthly fee for easy onboarding and responsive layout. Key criteria is: lowest possible friction to start writing, some small theme/layout/feel personalization, and ability to export once I do eventually make an extensive infra/self-hosted project out of it :-D

2. **发言者 1**（回复第 1 条）：\(for those who wonder: Yes, I could / might ask AI for recommendation, but I'm trying to maintain some vestige of human contact and creativity and communication/discourse :\)

3. **发言者 2**（回复第 1 条）：Build it yourself with simple html, CSS, and a simple backend. That way the site can look like whatever you want now and in the future.Isn't that all there is to it?

4. **发言者 3**（回复第 1 条）：Use a static site generator and host on cloudflare, very easy/minimal. Use filesystem based routing so all you have to do is add a new file to get a new page.I'm using tanstack, tailwind, and an agent set up the basics. I've had to tweak the design, but it's fully custom - nice for a personal site to not look the same as others.

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Redmine: Backup don´t work  
     
   What app is this about, and its version: Redmine, 7.0.1~ynh1  
     
   What YunoHost version are you running: yunohost\_version: 12.1.43  
     
   What type of hardware are you using: VPS bought online  
     
   Describe your issue  
   I tried to make a backup through the online-module of Yunohost. For Redmine the Backup stopped with the warning: rbenv: version \`3.4.11’ not installed.  
     
   I also tried to do an update - the scripts stopped at the same point with the same message. See Log.  
     
   Share relevant logs or error messages  
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

4. **发言者 4**（回复第 1 条）：I received 2 cards yesterday and I will post as soon as I review how to hide the images\! :roll\_eyes:

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Pop\!\_OS 26.04 LTS Has Landed

2. **发言者 2**（引用未收录发言）：Why do you bring up Redox?  
     
   Maybe there's some context here that I'm missing, but from my POV the suggestion kind of comes out of left field. They could be thinking about \*anything\* and not publicly talking about it.

3. **发言者 3**（回复第 2 条）：The lead developer of Redox works for System 76, at least last I checked.

4. **发言者 4**（回复第 3 条）：That, and Redox has been gaining all the COSMIC apps.  There's definitely some cross pollination going on, even if Redox isn't explicitly a System76 project \(and predates the lead developer being employed by them\).

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：JetBrains 中国地区官网 在 12 月 12 日之前全系列半价，各位这次还会续费吗。

2. **发言者 2**：全家桶我几个月前退了换成只购买了 goland

3. **发言者 3**：看邮件是 7 月续费的，到今天一次都没打开过。明年肯定不续费了

4. **发言者 4**：早就不用 IDE 了，都是直接 orca、t3 code、paseo 等 AI 工具

5. **发言者 5**：不买，但是还在用因为买过 1 次之后可以使用 Fallback 版本，而且也一样很好用...感觉买 1 次支持（也不贵），继续续费看起来没有太大刚需和提升？

6. **发言者 6**：明年 4 月到期，不续了，到期就用社区版。

7. **发言者 7**：把钱用在订阅 plan 上吧

8. **发言者 8**：把钱用到各种 plan 就好了，价格并不便宜

9. **发言者 9**：买啊为啥不买，AI 不用 IDE 的代码索引，精确性、速度、额度消耗都差一截  
   而且大型工程还是要看代码的，JetBrains 的各类浏览特性就是比免费的强，跟有没有 AI 没关系

10. **发言者 10**：不会了，上次打开都不记得什么时候了。看代码用 vscode 就行了（虽然也没什么机会打开

11. **发言者 11**（回复第 9 条）：\[引用第 9 条\] AI 用 IDE 索引我是没想到的

### 讨论 25

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Re: \[閒聊\] 買東西的時候很快樂但拆包裹很懶  
     
   \[引用未收录发言\]  
   : 覺得自己真的很矛盾，網購的時候可以花好幾個小時比價看心得  
   : 下單之後還會一直看物流進度，巴不得隔天就收到  
   : 結果包裹真的送到了，反而可以放在家裡好幾天都不拆  
   : 尤其是那種需要整理或清洗才能使用的東西  
   : 想到拆完還要處理紙箱跟包裝材料，就突然失去動力  
   : 有時候甚至下一批包裹都到了，上一批還原封不動躺在旁邊XD  
   : 開始懷疑自己享受的到底是購物，還是等待東西送來的那種期待感  
   : 有人跟我一樣嗎？  
   : 還是大家收到包裹都是迫不及待馬上拆開  
     
   這樣聽起來很矛盾啊？  
     
   如果真需要上網買東西，正常來說一定是基於特定需求，如果真的為此感到懶惰，那網購  
   的目的到底是什麼？  
     
   而且如果因為規格不達標（如數量不對、漏風等），而需要回頭去跟賣方談，往往也必須  
   要有拆封證明（錄影畫面）才行  
     
   不然在品質監督上，很容易淪為羅生門（買方吵東西有問題，但賣方卻認為東西不應有問  
   題等）  
     
   這些優先順序，總該要搞清楚才行...

### 讨论 26

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

6. **发言者 4**（回复第 5 条）：That’s quite pricey\!

### 讨论 27

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Die 某社区 Richter \[Sammelthread\]  
     
   Huhu, wir probieren uns aktuell in ein paar neuen Shows aus, unter anderem „某社区 Richter“, da gab es bisher zwei Folgen und wir haben großen Spaß daran. Es waren auch nicht die letzten beiden Ausgaben :wink: Deswegen, falls ihr auf 某社区 spannenden Posts begegnet \(es müssen nicht BIDA Stories sein, Hauptsache sie sind unterhaltsam, meinungsstark und gut zum Diskutieren\), dann haut hier gerne die Links rein und wir schauen uns das für die nächsten Folgen an, vielleicht ist eure Einreichung dann Teil der Sendung :slight\_smile:  
     
   Danki und viel Spaß beim Programm :hammer:

2. **发言者 2**（回复第 1 条）：Schon was älter, aber einer meiner Lieblingsbeiträge, die ich bisher auf 某社区 gefunden habe:  
     
   Ich habe deine Bewerbung abgelehnt, weil sie SCHEIẞE war

3. **发言者 3**（回复第 1 条）：\[链接隐去\]

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Why does the map still show old labels after my edit?  
     
   Hi everyone,  
     
   I edited a couple of places in Nakhchivan yesterday, but the standard map still shows the old labels today.  
     
   The changeset is Changeset: 192506490 \| OpenStreetMap. I changed the former BEKO building to Soliton and marked Sevgilim Kafesi as demolished. The object pages show the changes, but I can still see the old labels on the map at zoom levels 17–19.  
     
   Could someone help me check whether the tiles are waiting to refresh? Thanks\!

2. **发言者 2**（回复第 1 条）：Soliton is showing up for me so your changes have been updated. \(There is still a BEKO label nearby also, but you didn’t change that so I suppose that is intentional\).  
     
   \[图片省略\]Screenshot\_20261127\_085047\_Chrome1080×942 68.2 KB  
     
   You may be seeing a cached version.  
     
       
     
         \[链接隐去\]  
       
     
       
         
     
   Browser cache - OpenStreetMap Wiki

3. **发言者 1**（回复第 2 条）：Thanks, 发言者 2\! I can see Soliton on one of the close-up tiles now too. Some other zoom levels still show the old labels, and Sevgilim Kafesi is still showing on another tile.  
     
   Is it normal for the different zoom levels and other websites using the standard tiles to update at different times?  
     
   I left the separate BEKO point for now because I still need to confirm whether it was the same shop.

4. **发言者 3**（回复第 3 条）：Yes, it is common. For the differences between tiles, the cause is probably that your browser has cached \(saved\) the old tiles to save om bandwidth. Either wait till the cache refreshes or clear it manually to fix discrepancies.

5. **发言者 4**（回复第 1 条）：If you’re on Windows, Ctrl\+F5 is your best friend. Give it a few minutes and force-refresh the map. OSM has set re-rendering times only for certain low zoom level tiles \(1–12 I believe?\). For the high zoom levels, the Carto map is rendered when prompted by viewers.

### 讨论 29

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Interview with Gentoo Linux Developer Michał Górny on not using LLMs  
     
   In case anyone’s interested, I interviewed Michał Górny, a long-time open source developer on why he doesn’t like to use LLMs in software development:  
     
       
         \[图片省略\]  
     
         \[链接隐去\]  
       
     
       
       \[图片省略\]  
     
   Interview: Michał Górny on not using LLMs in Gentoo  
     
     Why this Gentoo Linux develooper prefers not to use LLMs

2. **发言者 2**（回复第 1 条）：Thanks for posting this. \(I ran Gentoo between 2002 and 2009, so before Michał Górny joined. I switched to Arch in 2009\).

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\( \`д´\)σ那就由你来决定我明天要干什么吧！

2. **发言者 1**：规则很简单：  
     
   每天22点前，你都可以给我指派一项任务，然后我从里头随机roll一个，第二天执行。  
     
   1.不能违法犯罪  
     
   2.不能违反版规  
     
   3.尽量不违背公序良俗  
     
   4.如果要花钱最好别太多（我还蛮穷）  
     
   5.尽量一天内能完成  
     
   暂时就想到这么多，边玩边完善规则吧\(　ﾟ 3ﾟ\)

3. **发言者 2**：总之撸5遍吧  
     
   \(\*ﾟ∇ﾟ\)  
     
   \(つд⊂\)

4. **发言者 3**：\( ﾟ∀。\)7  
     
   找个网课学点东西，免费的就行，学什么都行

5. **发言者 4**：保持呼吸  
     
   因为你有在好好活着，所以我也会好好活着\|ー\` \)

6. **发言者 1**：我会尽量完成，当然没完成我也不会接受什么惩罚的\(\`ε´ \)最多给你们发点jp

7. **发言者 5**：玩4小时游戏\(　ﾟ 3ﾟ\)

8. **发言者 6**：在憋尿的状态下通勤\(=ﾟωﾟ\)=

9. **发言者 7**：明晚写日记

10. **发言者 8**：\( ﾟ∀。\)吃顿沙县

11. **发言者 1**（回复第 8 条）：\[引用第 8 条\]  
     
   \[引用第 3 条\]  
     
   我就知道会有这种伤身体的雷霆挑战\(\|\|\|ﾟДﾟ\)  
     
   不过没所谓，反正也抽不中，来吧\( \`д´\)

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Happy birthday - Anarchy in the UK  
     
   Released on the 26th November 1976…it still sounds as fresh today as it did back then.

2. **发言者 2**（回复第 1 条）：Yes\! And Glen Matlock was discussing it on BBC radio 4 at lunchtime - so much for anarchy\!

3. **发言者 3**（回复第 2 条）：Love the irony, Clive\! I liked the piece very much though, when he picked up that guitar at the end, and then the producer played the song in under him.

4. **发言者 4**（回复第 1 条）：I thought it was awful, I thought it just set out to destroy, of course that was the intent, but shortly before its release this friend of mine took me to the Marquee because “you must see this new band”.   Inevitably the usual chaos ensued, vomiting everywhere, the SPs arrive on stage, Jonny looked at the audience, “what a f———- dump you’re all wankers”.  
     
   I’ll never forget it\!

5. **发言者 5**（回复第 1 条）：And We Don’t Care. :wink:

6. **发言者 6**（回复第 1 条）：I absolutely agree. That song, and indeed that entire first album will never grow old. Songs like “No Feelings” and “New York” still send shivers down my spine, all these years on.

7. **发言者 7**（回复第 1 条）：I had a vinyl copy probably released in the early 80s that sounded fantastic. Loud and clean.  
     
   Loved it.  
     
   I found more an affinity with PiL to be honest. Much more diverse musically and conceptually..

8. **发言者 8**（回复第 1 条）：Looking forward to the Sex Pistols in Newcastle next month. Pix to follow.

9. **发言者 9**（回复第 1 条）：I was, and still am, never much for “punk” rock although I consider that album to be a great heavy  rock album. I was a teenager in London when it was released and it somehow captured that time and some of the many frustrations I felt perfectly.

10. **发言者 10**（回复第 1 条）：Mr Goodwin the sports teacher sent me back to the changing room as a “ never mind the \*\*\*\*\*\* here’s the sex pistols” t shirt was unacceptable attire\! My mum also refused to iron it…..  
     
   That album had so much energy it was quite infectious at the time - played it last month,  
     
   Pretty Vacant stands out for me but an excellent album

11. **发言者 11**（回复第 1 条）：\[图片省略\]IMG\_26381290×1628 192 KB  
     
      Game changer

### 讨论 32

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: What languages and frameworks encourage minimal amounts of dependencies?  
     
   Or perhaps put another way, less susceptible to supply chain attacks

### 讨论 33

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

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Optimistic Update vs. Immediate Intent

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：受到了一些评分账号的诱惑开通的，然后又受到了黑色星期五的促销诱惑。  
   现在我后悔了，还是 gpt 和 claude 好用。

2. **发言者 2**：Claude 不好说，但是说人话的水平绝对比 gpt 要好太多

3. **发言者 3**：我这几天甚至在用 gemini pro，把 claude 200x 放一边去了。。。

4. **发言者 4**：你都能用 Claude 还去凑什么热闹😂

5. **发言者 5**：我感觉哈基米的能力目前还是比 gpt 好用，而且额度给的也挺多的。

6. **发言者 6**：如果是小号订阅的且考虑出的话，我收。

7. **发言者 7**：卖吧，一堆人等着收呢，加点钱估计都好卖

8. **发言者 6**：发言者 6 大号没权限。注册了小号有 99，寻思等周五看看还有啥优惠没，结果旧的优惠没抢上，新的优惠也没有看到。

9. **发言者 8**：对于 Google Antigravity 我觉得还是不要着急下手$99.99/年，先用$4.99/月尝尝鲜，毕竟 3 个月后，ai 可能又是一片天，谁也不知道谁家在憋大招，说不定 Google 以后一样拉，GPT 会有新模型，或者哪一天 DeepSeek 成为 Claude 平替都有可能。

10. **发言者 9**：我 5 个 Claude，还是正价开了 2 个 Gemini Ultra 20X，把 GPT 降级 PLUS，很久没用了

11. **发言者 10**：好多人都跟风买的

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[討論\] 那些只會生不會養的家長是不是只想騙補助  
     
   如題  
   生了小孩之後不顧小孩健全成長只會叫別人包容忍耐的是不是都是一群我不會顧只會生只想騙補助的家長啊  
   這樣跟吃合法飯有什麼差別？  
   就算現在生育率低鼓勵生育也不應該一堆敗類下一代吧？  
   有沒有應該將只會生不會顧的家庭生育補助回收的八卦  
   -----  
   Sent from J某社区 on my iPhone

2. **发言者 2**（回复第 1 条）：年輕89生育率超高，孩子十幾歲就踢

3. **发言者 2**（回复第 1 条）：出去要他賺錢拿回家

4. **发言者 3**（回复第 1 条）：樓上你錯了 我有很多有錢人的家教學

5. **发言者 3**（回复第 1 条）：生 當然有很多很乖很氣質的 但是有

6. **发言者 3**（回复第 1 条）：錢人的小孩放縱起來真的會讓你覺得

7. **发言者 3**（回复第 1 条）：他長大就是會仗勢霸凌別人的人…

8. **发言者 4**（回复第 1 条）：要怎麼定義只會生不會養？

9. **发言者 5**（回复第 1 条）：我妹就是個廢物家長  生一個性騷擾

10. **发言者 5**（回复第 1 条）：同學的  ㄧ個個性頑劣的  真該塞回

11. **发言者 5**（回复第 1 条）：肚子結紮別禍害人

### 讨论 37

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：What is this pattern?  
     
   Hello, my name is Barbara.  I just found this site. I am an occasional knitter, and I started the panels for this afghan a few years ago. I lost the pattern when I moved, and would love to finish the afghan. Can anyone help? I have tried to post photos, but it doesn’t seem to work.

2. **发言者 2**（回复第 1 条）：Welcome to KH.  You can try posting photos again.  I think a photo isn’t allowed on the first post.

3. **发言者 1**（回复第 2 条）：Oh thanks. I will try again.

4. **发言者 3**（回复第 3 条）：Keep trying we’d like to help if we can.

5. **发言者 1**（回复第 4 条）：Thanks. It still won’t let me post my photos. :weary\_face:

6. **发言者 4**（回复第 5 条）：Welcome to the forum\!  
     
   Check that the photo isn’t too large. That’ll stop it from uploading. You can use a site like this to resize.  
     
   \[链接隐去\]

7. **发言者 5**（回复第 1 条）：It can also take longer than you think to upload a photo. Don’t close the window too early or it won’t continue to load.

### 讨论 38

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Weekly builds for Natron 2.6  
     
   Hello 某社区\! :wave:  
     
   Here at Natron we’re proud to announce that the compositor is making a comeback after quite a long time\! :partying\_face: Work has been poured to refloat the project and we’d like to hear what would you say after you try it. Thanks to a brilliant coding agent we could pick up pace for a newer release. Yet we still need your good ol’ valuable feedback, as that is indispensable for a nice, well rounded version of Natron. :blush:  
     
   At the moment we’re trying to figure out things with GitHub Workflows as weekly downloads do not yet appear under the releases tab. :flushed: As of now, nigthly.link will suffice, so excuse us for that. We’ll keep you up to date when we setup a much proper release channel in GitHub. :grin:  
     
   Link to the nightly binaries here.

### 讨论 39

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

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：失眠迷思：刚交时是否真的会有快感，和正常的通道获得的快感有什么不同\( ﾟ∀。\)

2. **发言者 2**：刚交是通过前列腺的，理论上可能男女快感大致相同

3. **发言者 3**：问

4. **发言者 4**：快进到老来护工巴掌响

5. **发言者 5**：很舒服的哦，肥肥要不要试试啊\(つд⊂\)

6. **发言者 6**（回复第 2 条）：\[引用第 2 条\]  
     
   女人有前列腺吗\( ﾟ∀。\)

7. **发言者 7**（回复第 2 条）：\[引用第 2 条\]  
     
   女的没有前列腺

8. **发言者 8**（回复第 2 条）：\[引用第 2 条\]  
     
   肥哥草到男娘的可能性20\[1,100\]％

9. **发言者 9**：快进到你们这些玩皮炎的骗子

10. **发言者 10**：与其坐而论道，不如起而行之

11. **发言者 11**：可能是纯心理作用？\( ﾟ∀。\)说不来

### 讨论 41

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：What are some Arduino UNO R4 Wifi screen shields that are touchscreen and RGB?  
     
   Can you give me some screens?

2. **发言者 2**（回复第 1 条）：Hi :waving\_hand: Yes, there are other Arduino UNO R4 Wifi screen shields. For example : \[链接隐去\] This is a screen shield that supports the Arduino UNO R4 Wifi and has touchscreen with RGB.

3. **发言者 1**（回复第 2 条）：Okay thanks...

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：What would it take to get to this level on Godot?  
     
   To all you talented people who have ideas, I’d love to hear your thoughts.  
     
       
       \[图片省略\]

2. **发言者 2**（回复第 1 条）：It’s AI slop. Don’t aspire to be like it.  
     
   Learn to do things right by doing them yourselves.

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: unLAB.run – homelab in a tab using unkernel  
     
   To add to the fun with \[链接隐去\] \(\[链接隐去\] here's a project I've been building this week \[链接隐去\] Run an entire network of linux machines with a virtualized switch right in your browser tab.Open source at \[链接隐去\] contributions welcome\!

2. **发言者 2**（回复第 1 条）：lovely

### 讨论 44

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

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：感觉二次元小圈子最抽象的一种人是那种喜欢说角色只是立场不同的人，和电视剧影视剧美漫的那种粉丝还不太一样\( ﾟ∀。\)

2. **发言者 1**：二次元的还有点说不得的感觉，一说就急，跟你列一堆，再来一句只是立场不同或者之类的变体

3. **发言者 1**：一种想要证明是坏逼但是不是坏逼的脑袋尖尖的感觉

4. **发言者 1**：小丑粉丝好像也有这种\( ﾟ∀。\)，但印象里就见过一次

5. **发言者 2**：呃\| ω・´\)部分人是立场不同，有的人是被环境逼得疯子，还有的就是纯作者恶趣味例如某个无职的转生给那个鲁迪设的某些非常死宅的兴趣爱好

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Monitor resolution, hdmi and usb-c  
     
   It seems, that there is a Problem with the Microphone usage,  I triede three

2. **发言者 1**（引用未收录发言）：The microphone is working now. Not shure, what caused the problem, nor, what solved it.  
     
   Meanwhile the speaker output via the media-carrier board is working too.  
     
   Some-side effect, using the usb-c to hdmi-adapter:  
     
   Audio output through  the usb-c to hdmi adapter to the monitor is no longer possible. Workaround is using the media carrier‘s analog line-out and a separate speaker.

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Tüingo-verse  
     
   Some new 3D renders showcasing v2 of my Blender rendering add-on, Studioverse\!  
     
   The materials featured in these renders are also from another pack I created: Proterials.  
     
   You can find more images in my Behance post too  
     
   \[链接隐去\]  
     
   \[图片省略\]21 - 2529c - Twin B Comp V22160×1794 2.11 MB  
     
   \[图片省略\]01 - cbedc - Twin2160×1800 1.84 MB  
     
   \[图片省略\]02 - 147fd - Twin \(2\)2160×1800 1.55 MB  
     
   \[图片省略\]03 - 481d7 - Twin2160×1800 1.49 MB  
     
   \[图片省略\]04 - 4daeb - Twin \(2\)2160×1800 1.55 MB  
     
   \[图片省略\]05 - 8ee50 - Twin \(2\)2160×1800 1.29 MB  
     
   \[图片省略\]06 - 05183 - Twin \(2\)2160×1800 1.45 MB  
     
   \[图片省略\]07 - 49846 - Twin2160×1800 1.63 MB  
     
   \[图片省略\]08 - 2529c - Twin Interior A V12160×1800 1.94 MB  
     
   \[图片省略\]10 - f9239 - Twin2160×1800 2.01 MB  
     
   \[图片省略\]11 - 72b42 - Twin2160×1800 1.95 MB  
     
   \[图片省略\]12 - 147fd - Twin \(3\)2160×3840 2.65 MB  
     
   \[图片省略\]13 - 0e73c - Twin \(2\)3840×2160 3.82 MB  
     
   \[图片省略\]15 - 2529c - Twin A Cropped V21986×1395 1.33 MB  
     
   \[图片省略\]16 - 147fd - Twin3840×2160 3.7 MB  
     
   \[图片省略\]17 - cbedc - Twin2160×1800 1.29 MB  
     
   \[图片省略\]19 - 05183 - Twin2160×1800 1.43 MB  
     
   \[图片省略\]18 - 0e73c - Twin2160×1800 1.3 MB  
     
   \[图片省略\]20 - 8ee50 - Twin2160×1800 1.25 MB

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Blender Geo Node Texture Deformation  
     
   Hi, I have a problem with a texture in geometry nodes. My situation is the following: I have a sidewalk, but the faces overlap when the corner gets sharper. I fixed this with making a new curve where the points are wrong. I sampled the position from them and I’m pretty happy with the mesh. But now I experienced a problem with the texture. You can see it gets stretched. The operation I used was the set position node. I want the texture to go normal in the curve, that the squares are kept the right way. I don’t know how to fix this, so I hope someone can help me with this.  
     
   \[图片省略\]Screenshot 2026-11-27 1534381138×504 39.8 KB  
     
   \[图片省略\]Screenshot 2026-11-27 1534161823×719 86.8 KB  
     
   \[图片省略\]Screenshot 2026-11-27 1533402136×712 99.3 KB  
     
   \[图片省略\]Screenshot 2026-11-27 153310875×743 506 KB  
     
   \[图片省略\]Screenshot 2026-11-27 152843872×746 495 KB

<!-- samples:end -->

