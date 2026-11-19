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

采集时间：2026-11-19 14:52:44（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：大家好，我是独立开发者 发言者 1，最近上线了一个小工具，来分享创造节点求拍砖：  
     
   👉 \[链接隐去\]  
     
   \#\# 起因  
     
   想做这个，是因为试了一圈"颜值打分"”脸型测试"网站，发现它们都有同一个问题：扔给你一个 7.3 分，但不告诉你这个分是怎么来的。 脸型说你是"心形"，依据是什么也看不到。  
     
   所以我给自己定了一条规矩：只要给出一个数字，就把它在脸上画出来。 脸长、颧骨宽、下颌宽、眼角连线，全都叠在你的照片上，你可以自己验证量得对不对。  
     
   \#\# 能测什么（免费）  
   - 脸型：椭圆、圆、方、心形、长、菱形，六种里最接近哪一种，并给出依据  
   - 对称度：左右脸的镜像吻合程度  
   - 黄金比例 / 三庭五眼：各项比例离 1.618 有多远  
   - 眼角倾斜：左右眼分别多少度  
   - 眼型、下颌线，还有一个"真实镜像"（看别人眼里的你，不是镜子里左右翻转的你）  
     
   \#\# 收费的部分  
     
   免费结果已经够用。如果想看更细的，有一份一次性付费报告。内容有约 40 项测量、发型 / 眼镜 / 修容 / 护肤的改善建议、用你自己照片生成的 AI 发型试戴图，还有 PDF。不搞订阅，7 天内可以退款。 报告长什么样，可以先看样例再决定：\[链接隐去\]  
     
   \#\# 几个原则  
   - 不推荐整形，不会出现"你需要做 X 手术"这类话  
   - 不做明星脸比对，也不做种族识别  
   - 分数描述的是一张照片里的几何比例，不代表你这个人值多少分。光线、角度、表情都会影响结果  
     
   \#\# 求反馈  
     
   刚上线没几天，肯定有不少问题，很想听大家的意见：  
     
   - 测量结果和你对自己的认知差得多吗？  
   - 哪些地方让你觉得不可信，或者看不懂？  
   - 手机上用起来顺不顺？  
     
   帖子里的批评我都会认真回复，谢谢大家 🙏

### 讨论 2

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Upcoming Critical PHP Security Release \(18 Nov 2026\)

2. **发言者 2**（回复第 1 条）：If it happens again next month, I'm setting up a cron job to stop my nextcloud instance every four weeks to match their release cycle.  
     
   The tone is my way to cope with the never ending stream of security updates.

3. **发言者 3**（回复第 1 条）："The issues rated CRITICAL require either non-default configuration or uncommon setups."

4. **发言者 4**（回复第 3 条）：Love that they added that sentence. Hopefully it's the start of a trend\!

5. **发言者 5**（回复第 1 条）：I wonder if this more than just \[链接隐去\] from October 23:  
     
   &gt; Since this setup is unlikely in practice, we are handling it in the regular release cycle and will publish a full advisory for CVE-2026-115560 with the next release.

6. **发言者 6**（回复第 2 条）：First I disabled http2 on nginx, now php8.4-fpm, in between I upgraded my linux kernel due to the network kernel panic CVE - and luckily I had no java exposed. Let me know when I can tell my hoster to just unplug the system, just to be safe.

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：I caught the Google AI in a math error  
     
   I wanted to know the boiling point of water at a close elevation and asked Google and the value they gave 211F did not match the Fun Facts included in the extended answer. So I asked if one thing and another are true and it answered that I spotted a math error.  
     
   I asked how it could get math wrong and got that basically when they screw with language they lose track of things. How About THAT\!  
     
   AI = Artificial Idiot. You might think "why push artificial when we have a huge ever-replenishing supply of the real thing?" but no, this is worth trillions of dollars in taxes and inflation.

### 讨论 4

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Microsoft disabled API permissions seemingly overnight  
     
   As of yesterday, Authorization.RoleAssignments.Write \(a53c8130\) now shows isEnabled: false on the Power Platform API service principal \(8578e004\), and Authorization.Write \(440ac968\) was added around October and seems to be working as a replacement.Tried multiple tenants. Unsure if related to the outages but I can't find any information about this, very unusual, having to hotfix services with zero notice.

2. **发言者 2**（回复第 1 条）：Used PP since inception, in Australia. I'm used to zero notice outages, weird bugs that occur on Thursdays after their seemingly Wednesday overnight changes and the fix that seems to wait until US time, automates that look enabled following an outage but they're actually disabled, and back dated communications. Yet despite all that it's still a great platform I love to build on lol...

### 讨论 5

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

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：老家母校的幽默减负:  
     
   周六日照常补课，但不给老师发补课费，所以算没补课。  
     
   \( ﾟ∀。\)

2. **发言者 2**：给学校的薪资减负了属于是\( ﾟ∀。\)

3. **发言者 3**：开动脑筋这一块\( ﾟ∀。\)

4. **发言者 4**：分享图片

5. **发言者 5**：\(´ﾟДﾟ\`\)

6. **发言者 6**：校长书记：这减负真是好政策啊嗯σ\( ᑒ \)

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Debbie Bliss Sweater With Ribbed Yoke  
     
   Good Morning,  发言者 1 here. I am a beginner/intermediate knitter and i cannot wrap my brain around how this collar works. Can anyone help me please?  Thank you\!  
     
   \[图片省略\]10000307921920×2560 759 KB  
     
    hopefully the upload worked.

2. **发言者 1**（回复第 1 条）：Thank you so much. I just needed the back and forth, with tappered on either side directions. Youve been a great help. Time to rip it out now\!\!  Thanks again\!\!

3. **发言者 2**（回复第 2 条）：You’re at the last bit now, almost finished\! Enjoy finishing this adorable sweater.

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：1.6.0 版本已上架，同步跟进 某社区 网站即将启用的新功能：  
     
   “从第 18,320,001 条回复起，回复支持 Markdown，更早的回复仍按发布时的格式显示。”  
     
   \[链接隐去\]  
     
   \[链接隐去\]

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Blue, I mean, black hour  
     
   Been playing with 发言者 2’s Greycard a bit more. This is a shot from January 2022, a post-sunset long exposure over Kincaid Reservoir near Alexandria, Louisiana.  
     
   \[图片省略\]IMG\_3184-social2048×1152 297 KB  
     
   IMG\_3184.CR3 \(21.4 MB\)  
     
   IMG\_3184.CR3.gcd.txt \(2.8 MB\)  
     
   This file is licensed Creative Commons, By-Attribution, Share-Alike.

2. **发言者 2**（回复第 1 条）：Those colors\!\!

3. **发言者 3**（回复第 1 条）：\[图片省略\]SunsetLake\_PIX2058×1020 48.3 KB  
     
   Panoramic. I kept it dark, with increased contrast and vibrancy on the blue channel.

4. **发言者 4**（回复第 1 条）：A DT5.7 edit  
     
   IMG\_3184.CR3.xmp \(13.0 KB\)  
     
   \[图片省略\]IMG\_31842000×1334 266 KB

5. **发言者 5**（回复第 1 条）：\[图片省略\]IMG\_31841980×1321 372 KB  
     
   IMG\_3184.CR3.xmp \(8.0 KB\)

6. **发言者 1**（回复第 2 条）：\[图片省略\] 发言者 2:  
     
   Those colors\!\!  
     
   I was liking it\!  LOL  
     
   Then right in the middle of my exposure a guy in a boat went through the shot \(you can see the green trail of his light in the raw\). I shot several others and they’re equally colorful, but I like the cloud pattern best in this one.

7. **发言者 6**（回复第 1 条）：Even darker.    :slight\_smile:  
     
   \[图片省略\]red\_hour2400×1600 264 KB

8. **发言者 3**（回复第 7 条）：So dark… A bit scary…

9. **发言者 7**（回复第 1 条）：Such a lovely shot, I just had to try Filmulator on it.  
     
   \[图片省略\]IMG\_3184-output-2048px2048×1152 210 KB  
     
   16:9 crop  
     
   Exposure comp \+5/6  
     
   NR on  
     
   NR strength 24  
     
   Speckle NR strength 3.86  
     
   Drama 68.5  
     
   White Clipping Point 0.573

10. **发言者 8**（回复第 1 条）：Holy macaroni what a dynamic, vibrant and beautiful photo\!

11. **发言者 9**（回复第 1 条）：I went for colour:  
     
   \[图片省略\]IMG\_31842000×1194 331 KB  
     
   IMG\_3184.CR3.xmp \(18,1 KB\)

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Java4Shell is a reason to use Java

2. **发言者 2**（引用未收录发言）：The point seems to be that entire classes of security violations generally do not exist in Java \(which is true\), not that security violations do not exist in Java.  
     
   It seems a reasonable point.

3. **发言者 3**（回复第 1 条）：I'm assuming this person has never heard of the JNI.

4. **发言者 1**（回复第 3 条）：The native code protections apply to JNI. The difference between the JVM and other ecosystems is that you will need to opt-in even if the JNI comes from a transitive dependency.

5. **发言者 3**（引用未收录发言）：A guaranteed segfault is memory safe. This is actually how the jvm detects null pointers: it lets the program segfault, and then prevents the os from killing it.

6. **发言者 4**（回复第 5 条）：I was using segfault sloppily.   
     
   It's the \`slice\` data structure that can tear under data races and one can read/write past the allocated region. So it's \*not\* a "controlled explosion\*.

7. **发言者 2**（引用未收录发言）：&gt; That’s more of an argument of ...  
     
   I was hoping for a discussion of ...  
     
   And I was not suggesting that it was "a pro for Java specifically". I could have listed other languages with the same benefit\(s\), but I did not realize that failing to do so would raise concern. My apologies.

8. **发言者 5**（引用未收录发言）：This kind of whataboutism is such a popular waste of time in software development circles, and I am tired of reading it. "Oh, there are exploits that don't have to do with memory safety, so why care about memory safety?" is really not serious at all, no matter how much you pepper it up to seem like a serious point of contention.

9. **发言者 6**（回复第 8 条）：I addressed this in a reply to another comment. What I don’t understand is the argument for Java specifically over other memory safe languages, especially given Java has had some high profile RCEs.

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Holy cr\[某参与者\]\! You’re old\! Cake  
     
   Another day another work birthday\!\!  
     
   My boy JT turns 50\! Tomorrow\!\!  
     
   \[图片省略\]IMG\_99342856×2142 499 KB  
     
   I used my big top cupcake silicone pan and then made tinier replicas

2. **发言者 2**（回复第 1 条）：As soon as I saw the thumbnail, I knew this was one of your cakes\! This made me laugh and I’m sure it’ll do the same for the birthday boy\!

3. **发言者 3**（回复第 1 条）：Bahahahaaaaa\! What a great use for that pan\! This is going to be a hit\!

4. **发言者 4**（回复第 1 条）：Another fun &amp; fabulous cake\!

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Brume – video, GIF and image tools that run in the browser

### 讨论 13

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

### 讨论 14

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
     
   \[图片省略\]Screenshot 2026-11-15 at 13.52.16786×764 59.2 KB  
     
   o

4. **发言者 1**（回复第 3 条）：Hi 发言者 2\! Yes that’s exactly what I was looking for, my b for not being clear :bowing\_woman: Thanks for your help\! :relaxed:

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Strange Request  
     
   Hi there,  
     
   Could someone with a Naim Nait 2 measure the difference from the rubber feet to the outer width edge of the unit. I looked on-line but couldn’t find anything. My own amp is currently being re-capped so I cannot check.  
     
   Anyone with a NAC62 would also work.  
     
   Any help appreciated.

2. **发言者 2**（回复第 1 条）：Hi\! Here i have 85 MMS. Original feet\!  
     
   \[图片省略\]IMG\_20261118\_2051417241920×2550 1.3 MB

3. **发言者 2**（回复第 1 条）：From case Edge to foot Edge. Here we are  
     
   \[图片省略\]IMG\_20261118\_21\[数字标识隐去\]×2550 652 KB

4. **发言者 1**（回复第 1 条）：ah, I see. I mean the distance from the outer edge of the rubber foot to the edge of the case. Just tilt the ruler to horizontal. Thank you for checking this for me.

5. **发言者 2**（回复第 4 条）：Correct\!

6. **发言者 1**（回复第 5 条）：No, you are measuring the height. Please measure the outer edge of either rubber foot to the edge of the case \(width\).

7. **发言者 2**（回复第 6 条）：Ops… i think my ruler can’t get there…

8. **发言者 3**（回复第 1 条）：About 16mm on a 32.5.

9. **发言者 1**（回复第 8 条）：Thanks, 发言者 3. I don’t know if the foot placements are the same on the 32.5 but maybe they are.

10. **发言者 1**（引用未收录发言）：发言者 3, thanks for your help.

11. **发言者 4**（回复第 1 条）：There is a difference between the Nait1 and Nait2 sleeve. I swapped my Nait2 sleeve for a better Nait1 sleeve and had to widen the hole on the sleeve for the screw in feet to be able to access the sled properly. It’s only a mm or so but means the feet don’t go in square. I tried this with another Nait1 sleeve and it was the same.

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：专车上的川普，但为什么我会幻视成范小勤的脸  
     
   \( ﾟ∀。\)7

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Rento Knitted Hoodie  
     
   Hi friends- can someone help me with this pattern, I think I’m doing it wrong.  
     
   I finished step 1, ending on a WS row. Then I started step 2 with chart I with the first row \(RS\) being P2 \(K1,P2\) to the end, 2nd row all purls, third row same as row 1 and then repeat 2 and 3.  
     
   Is that right, and if not, can someone tell me what I’m doing wrong? I’ve never used a chart before.  
     
   thank you so much in advance\!  
     
   Pattern: Novita Isoveli: Rento knitted hoodie

2. **发言者 2**（回复第 1 条）：That looks like the comfiest hoodie ever\!  I hope we get to see a pic when you’re done with it\!

3. **发言者 1**（回复第 1 条）：Thank you\!\!

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：各位大佬好👋  
   平时折腾跨境社媒、数据采集、广告校验、多账号环境的应该都懂，找干净稳定的住宅代理真的很头疼，踩过不少速度拉胯、IP 容易关联、池子里脏 IP 多的坑😮💨  
     
   最近发现 1024Proxy 开放免费试用，不用上来直接充值，适合先实测质量再决定要不要长期用👍  
     
   🌍简单说下亮点：  
   ✅ 原生住宅 ISP IP，城市级精准定位，IP 风险低  
   ✅ 动态住宅、长效静态 ISP、短效静态多种类型可选  
   ✅ 支持 HTTP \(S\) / SOCKS5，API 接入友好，搭配反指纹浏览器、自动化工具都适配  
   ✅ 会话时长可自定义，粘性 / 轮转模式按需切换  
   ✅ 24 小时技术支持，后台仪表盘操作简单，白名单、认证配置直观  
   ✅ 高可用，在线稳定性不错  
     
   🎁试用领取方式：  
   注册账号之后，要么直接联系在线客服申请试用额度，也可以用 CDK 兑换流量，先跑业务看延迟、存活率、封锁情况✅  
     
   领取网站：  
     
   \[链接隐去\]  
     
   💡适合人群：  
   ▪️跨境电商运营、海外社媒矩阵  
   ▪️数据采集、SEO 监测、广告验证  
   ▪️自动化脚本、测试环境、多账号养号  
   ▪️需要干净住宅 IP 做项目测试的开发  
     
   ⚠️温馨提示：  
   试用额度以页面显示为准，一人一次，适合前期摸底测试；正式业务再按需选套餐。  
     
   有没有已经试过的老哥？欢迎在楼下聊聊速度和踩坑情况，一起交流下代理选型经验🤝

### 讨论 19

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：IPv6 delegation, an unusually subtle failure mode

2. **发言者 2**（回复第 1 条）：Interesting. I will keep an eye on this in my setup. Given the abundance of IPv6 addresses, I wonder why ISPs keep them dynamic. Every client should be getting assigned the same prefix.

### 讨论 20

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

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Does anyone remember this?  
     
   \[图片省略\]Image 2728×717 108 KB  
     
   I miss buying Polaroid film by the case. Not.  
     
   The DSO must have had quite an impact on their business.

2. **发言者 2**（回复第 1 条）：Okay, I guess it is an oscilloscope trace camera\! Good ideas usually have a second lifetime. So it could be a pregnancy ultrasound camera, also\!

3. **发言者 1**（回复第 2 条）：Yeah, anything with a CRT basically. Pretty much everything now can save the image to a thumb drive.

4. **发言者 3**（回复第 1 条）：I remember seeing a Tektronix camera for their oscilloscopes, a bit more boxy and the standard blue color.  
     
   There was also a special camera used for making drivers licenses that used polaroid film. It would expose 1/2 of the picture at a time, so you often had to wait for a 2nd person to have their license made so the film was not wasted.

5. **发言者 1**（回复第 4 条）：\[图片省略\] 发言者 3:  
     
   so the film was not wasted.  
     
   Film cost was definitely a consideration using the HP 'scope camera as well. The Polaroid film packs got pretty expensive toward the end.

6. **发言者 4**（回复第 1 条）：Some of you will know I worked in Telecoms. When I started my apprenticeship in 1977 the meters that recorded call charges were photographed then the photographs sent to the billing department to be read.

7. **发言者 1**（回复第 6 条）：Did you use Polaroid or conventional film?

8. **发言者 4**（回复第 7 条）：I didn't get involved, but, as far as I know it was conventional film.

9. **发言者 1**（回复第 8 条）：That would be my guess as Polaroid would have been very expensive. The early peel-apart version would have been very cumbersome to use as well.

10. **发言者 4**（回复第 1 条）：When was Polaroid invented? I suspect meters were being photographed long before Polaroid.

11. **发言者 1**（回复第 10 条）：Polaroid cameras around 1948. Conventional film cameras definitely preceded Polaroid.  
     
   My parents had this 620 roll film camera in the 40s.  
     
   \[图片省略\]Screenshot 2026-11-16 at 11.08.18 AM858×946 99.9 KB

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How to make a car without suspension?  
     
   4.7.2  
   Question  
   What is the simplest way to create a 3D car without suspension?  
     
   What I tried so far:  
     
   To use HingeJoint \(wheels clipped into the ground when going more than 18 kmph\) and you cant change bias in jolt\(i want it to be qbout 75kg in total, but the hingo joinc can’t hold it with bias = 3\)…  
     
   Vehicle body \(tried stuff like stiffness = 10000 and suspension/travel = 0, but the car went crazy with 1 or both of those settings\)  
     
   \[图片省略\]grafik135×184 27.9 KB  
     
   I also tried to switch to other physics engines :grimacing:…  
     
   And it would be cool to use a BreakeJoint to lose wheels.  
     
   Edit: I just want to drive an ingame bobicar. :sweat\_smile:

2. **发言者 2**（回复第 1 条）：Sphere car\!  
     
       
     
         \[链接隐去\]  
       
     
       
         
     
   Arcade-style Car :: Godot 4 Recipes  
     
       
     
       
         
         
       
     
       
     
   One of the first projects I learned.

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: A 149M model handles 70% of phone-agent steps locally, Claude the rest

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Within Temptation and S10 - Roon  
     
   Can someone explain how it’s possible that the new Within Temptation single with S10 is or seems not available in Roon?  
     
   I can find it in Qobuz and Audirvāna, but have no succes in Roon.  
     
   \[图片省略\]10000923961080×1101 113 KB

### 讨论 25

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：现在互联网上铺天盖地地宣传人工智能消灭工作岗位  
     
   那么现在的学生群体出现相对应的厌学现象了吗  
     
   毕竟过去的宣传都是好好学习是为了找一份好工作

2. **发言者 2**：“大学学位的全部意义，就是向潜在雇主证明，你能够连续四年坚持出现在某个地方，并且还算不错地、按时地完成一系列任务。这样，如果他雇了你，就有一个尚可的概率，你会每天出现在公司，并且不会把他的生意搞砸。”

3. **发言者 3**：现在针对学生扭曲思想的宣传太多了，已经多到相互矛盾了\(　ﾟ 3ﾟ\)

4. **发言者 4**：看愣了……相关性不等于因果性，冰淇淋不会导致溺水。肥哥你的前提条件其实存在片面的因素，学生厌学的原因要具体问题具体分析。  
     
   其次要考虑哪部分工作被AI取代了。劳动是人的本质需求，人应该在创作中找到快乐。但在雇佣关系下劳动仅仅被看做是谋生的手段，人被迫成为工具，被异化。如果AI可以替代枯燥、重复、被高度异化的劳动，那它反而能把人类从这种被动处境里解放出来，有底气去自由地选择做自己想做的事情。  
     
   最后，我感觉是现实情况确实会比较复杂。AI替代了旧岗位，创造了巨大的使用价值，但是我们没准备好，没有相应的制度去分配这种使用价值，所以人们才会有“AI取代了我们的工作让我们没饭吃”的恐慌

5. **发言者 5**（回复第 3 条）：\[引用第 3 条\]  
     
   \( ﾟ∀。\)比如呢

6. **发言者 6**：喊着人工智能赶紧代替人工的不应该大多是学生群体吗，没有经济压力，也没有裁员危机，还喜欢混迹于“技术前沿”\( ﾟ∀。\)

7. **发言者 7**（回复第 6 条）：\[引用第 6 条\]  
     
   学生也不都是傻逼吧，我前几年找实习秋招的时候就知道会被AI一脚踢死了\( ;ﾟдﾟ\)

8. **发言者 8**：去年做毕设用ai三小时速通时，就知道这个专业已经完蛋了\( ・\_ゝ・\)  
     
   果然毕业待业中

9. **发言者 9**：让那群没啥能力又占着就业岗位还把员工当无薪家奴般使唤和画饼的老逼登死一部分就行了\(｀･ω･\)

10. **发言者 10**（回复第 4 条）：\[引用第 4 条\]  
     
   所以与其说AI是取代工作，不如说是消灭了精细化的职业分工，但是现阶段的生产关系又严重依赖于职业分工，才造成了劳动者经济和收入上的矛盾。

11. **发言者 11**：\( ﾟ∀。\)学生也没那么自傲吧，感觉大部分都是“我几把谁”的普通人状态，并没有什么过人之处，就算没有AI随便来个别的人也能代替我的工作，螺丝钉罢了

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：S1pw in Baby Blanket  
     
   Good Morning, I am knitting a baby blanket DK with the border included, to make a border stitch between the border and the pattern of the blanket it tells me to do S1pw, which I have been doing but what’s annoying at the beginning when I start it pulls up a bit which I don’t like, is there another way I could do this. I may need to undo what I have knitted so far but if there’s another way and it looks neat I’ll more than happily start again. I have attached a photo and hope it’s clear enough for you to see what I mean.  
     
   \[图片省略\]IMG\_00701920×1440 640 KB

2. **发言者 2**（回复第 1 条）：It might help to know which pattern you’re making.  
     
   The slipped stitch will pull up because it is only being worked every other row which makes a elongated stitch.  Often this looks nice over an extended area but if you don’t like the result I’m sure there could be other possibilites.  
     
   Can you guve a link to the pattern or tell us the name, number, publisher so we can see it?

3. **发言者 3**（回复第 1 条）：Correct me if I’m wrong, but it looks like you’re slipping one pw alternate  garter ridges \(this being two rows\) rather than on alternate rows.  
     
   I think a sl1pw in garter stitch on alternate rows should give you a column of loose V’s?

4. **发言者 1**（回复第 2 条）：I got the pattern from \[链接隐去\] it’s called Jamie Blanket, knitpurlmaked/Mindie Designs 2017. I hope that helps, someone on the forum suggested knitting into the back of the stitch instead of slipping it but what would I do on the return row?

5. **发言者 1**（引用未收录发言）：I was using the yarn at the front but it still pulled upwards, then read that the pattern says keep the yarn at the back but I still have the same problem, it’s she it first starts off but it doesn’t look good and it annoys me as I would like it so stay straight, if thst makes any sense\!\!

6. **发言者 3**（引用未收录发言）：Here’s a picture of the corner that you’ve shown us.  
     
   \[图片省略\]412961500×1000 191 KB

7. **发言者 4**（回复第 1 条）：\[链接隐去\]

8. **发言者 1**（回复第 1 条）：Thank You, I’ll give it a go and will do a small knitting square first to see how it turns out. The pattern says to do S1pw both ends and on the return just knit &amp; purl. I still can’t send the photos it keeps coming up with an error\!

9. **发言者 2**（引用未收录发言）：Very nice slipped stitch. Glad to hear you cracked it and managed to upload a pic too\!

### 讨论 27

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Fr. \(04.12.\) Kneipenquiz  
     
   Moin,  
     
   der Dezember startet mit einem Kracher am Freitag:  
     
   Das Kneipenquiz kommt mit einer neuen Ausgabe ab 20 Uhr\!  
     
   Andreas und Johanna führen durch den Abend und müssen sich durch die „Halbe Punkt“-Chöre durchsetzen.  
     
                 
     
   \[图片省略\]Screenshot 2026-11-13 1832221920×1342 175 KB

2. **发言者 2**（回复第 1 条）：Viertel Punkte…\!\!\! Buuuuh…  2 3/17 Punkte… Yeeeeah

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：超过 50%的功能通过移动端远程完成。虽然开发了 7 个月，但是目前还是很初步的阶段，bug 比较多，并且很多交互上都比较难用，希望大家多提意见。  
   \[链接隐去\]  
     
   适用场景：  
   1、有多台设备需要允许 Agent。  
   2、随时随地写代码、管理服务器。  
   3、希望将 Agent 跑在容器或者 K8S 中（K8S 支持还在开发）。  
     
   主要聚焦三个方向：  
   1、一个入口，统一管理所有设备。  
   2、多终端接入，随时随地远程协作。  
   3、面向大规模场景的服务器管理。  
     
   移动端主要功能演示，PC 管理另一台机器的体验也是差不多的。  
   \[链接隐去\]  
     
   目前配置流程会稍微繁琐，有什么问题可以在这里讨论。\[链接隐去\]  
     
   目前仅支持 Codex、OpenCode 内核，暂时仅支持 API。  
   支持窗口级别的远程桌面。  
   支持 Docker 容器实例。  
     
   iOS 目前还未上架，需要走 TestFlight，好像最近 iOS 上架又严格了。。。不过我们还有小程序还没上线（小程序只能走中继，无法连接自托管）  
     
   目前正在改善的问题：  
   目标是要能够管理大量的服务器，但是目前的 node 实现导致内存占用已经无法再优化，所以最近也会把节点和控制代码往 rust 进行迁移。  
     
   说一下云端安全问题：  
   我在这方面花了较多的功夫先后改了好几版，和大多数的远程方式不同，云端只负责连接协商（类似于 Cloudflare Zero Trust）。而客户端之间通过公私钥完成认证并建立连接，机制类似 SSH。即使云端被攻破，攻击者也无法直接获得已绑定客户端的访问权限。  
     
   关于免费：  
   说实话，远程桌面的流量确实承受不起，目前只能保证免费 AI 会话的中继，所以限制了使用额度。我在连接链路上做了大量的优化使得传输带宽极小，所以目前给的额度是完全够用的。远程桌面只能尽力而为了，走 P2P 是不消耗中继流量的。

### 讨论 29

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Residential vs. tertiary  
     
   Ich bitte um Eure Einschätzung:  
     
   Es geht um die Krummhaarstr. und die Uhlandstr. in Schorndorf:  
     
   \[图片省略\]2026-11-18 10\_18\_47-Anschreiben HM extern - Word778×888 325 KB  
     
   Diese ist seit eh und je als residential gemappt. Die Straße ist für innerörtliche Verhältnisse relativ breit und hat großteils \(noch\) eine gestrichelte Mittellinie. Radwege befinden sich teils auf der Fahrbahn, teils daneben, teils als Radweg, teils als Angebotsstreifen. Erst vor nicht allzulanger Zeit wurde maxspeed auf 30 heruntergesetzt \(Begründung: Lärmschutz\). Das Parken ist nur street\_side erlaubt. Nach meiner Erfahrung ist dies eine relative wichtige Verbindung zwischen dem Osten/Südosten Schorndorfs und dem Süden Schorndorfs, auch von und zum Krankenhaus und zum Schulzentrum Grauhalde.  
     
   In den umliegenden Wohngebieten herrschen etwas schmalere Straßen, Tempo-30-Zone und Parken auf der Straße vor \(was das Durchkommen bei Begegnungsverkehr einschränkt\).  
     
   Ich überlege, diese beiden Straßen ihrer Verkehrsbedeutung nach zur tertiary hochzustufen. Haltet Ihr das für gerechtfertigt?

2. **发言者 1**（引用未收录发言）：某参与者 korrekt, in allen Punkten zutreffend.

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：The Mystery Machine  
     
   I created my own version of the Mystery Machine from “Scooby-Doo”.  
     
   \[图片省略\]The Mystery Machine5760×3240 4.1 MB

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Basketball- a family ATC  
     
   This one is for my Son in law. A few years ago, we were lucky enough to all be together for Christmas at my eldest son’s home.  
     
   One of the littles had received a kids’ basketball hoop and at a relatively calm moment, my son in law pushed all the furniture aside and played basketball with his kiddos. They were pretty small, about 2 and 4, but he encouraged them to get in his way, steal the ball, take shots.  
     
   I was watching them play and told him he was a good dad. He replied, “I know,” which cracked me right up. :rofl:  
     
   I am so blessed with my awesome family\!  
     
   \[图片省略\]IMG\_70362707×2160 1.86 MB

2. **发言者 2**（回复第 1 条）：What a sweet memory to commemorate for you son-in-law\!

3. **发言者 3**（回复第 1 条）：Great memory, both my sons would have answered the same way :joy:

### 讨论 32

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：High current consumption in software standby mode on the Nano R4  
     
   Dear Arduino community,  
     
   For my project, I need to minimise the power consumption of my Arduino Nano R4 \(Renesas RA4M1\).  
     
   To achieve this, I put my Arduino into software standby mode most of the time, as this allows for the greatest reduction in power consumption using a WFI instruction. \(see \[链接隐去\]  
     
   Here is the code :  
     
   // 1. Unlock protection register:  Low power modes and the battery backup function  
    R\_SYSTEM-&gt;PRCR = \(0xA500 \| R\_SYSTEM\_PRCR\_PRC1\_Msk\);   
   // Allowing Software standby mode  
   R\_SYSTEM-&gt;SBYCR\_b.SSBY = 1;  
   // Software standby returns by RTC alarm interrupt  
   R\_ICU-&gt;WUPEN \|= R\_ICU\_WUPEN\_RTCALMWUPEN\_Msk;  
     // Lock protection register  
     R\_SYSTEM-&gt;PRCR = 0xA500;  
     
   I also removed the power LED \(DL3\), but the current consumption is still around 0.3 mA in sleep mode, which is far too high. I was expecting a current consumption of around 30 µA.  
     
   Does anyone have any ideas on how I could further reduce the current consumption in sleep mode?  
     
   Best regards,  
     
   Yves

2. **发言者 2**（回复第 1 条）：300uA eh?  
     
   \[图片省略\]image322×293 11.8 KB  
     
   Coincidence?

3. **发言者 1**（回复第 2 条）：Well, I'm wondering how I overlooked something like this myself.  
     
   As it is also a 5V-tolerant pin, I just left the pull-up resistor at 5V. Now, my current consumption in sleep mode is about 46 µA, which is much more tolerable for my application.  
     
   Thank you very much\!

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: New Accounts  
     
   Do you lose the green tag and noob penalty after accumulating 30 karma points? I notice my username doesn't look green anymore when I log out and look at it even though my account is only 4 days old.

2. **发言者 2**（回复第 1 条）：It's not easy being green. Your username still look green to me

3. **发言者 3**（回复第 1 条）：&gt; Do you lose the green tag and noob penalty after accumulating 30 karma points?No.

4. **发言者 1**（回复第 2 条）：Thanks\!

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Boot Drive running out of space?  
     
   What type of hardware are you using: Old laptop or computer  
     
   What YunoHost version are you running: 12.1.42  
     
   How are you able to access your server: SSH  
     
   Are you in a special context or did you perform specific tweaking on your YunoHost instance ?: No  
     
   Describe your issue  
   Hello.  
     
   I wonder if anyone can help me with this one…?  
     
   Every week for the past  4 years I do an “Update” and a Diagnostic from the webgui. Today I had a warning email from root with the following:  
     
   Storage /boot \(on device / dev/sda1\) has only 9.1 MiB \(4%\) space remaining \(out of 213 MiB\). Be careful.  
     
   Should I be concerned?. Never seen this before, so I’m not sure whats happening. Today there was a YNH update to 12.1.42 as well as a kernel update.  
     
   many thanks in advance  
     
   Dj  
     
   Share relevant logs or error messages  
   Storage /boot \(on device / dev/sda1\) has only 9.1 MiB \(4%\) space remaining \(out of 213 MiB\). Be careful.

2. **发言者 1**（回复第 1 条）：I think i fixed the issue…  
     
   There have been a number of kernel updates recently so I ran:  
     
   dpkg --list \| grep linux-image  
     
   to see what kernels I had… There were many…  
     
   Then I ran  
     
   sudo apt autoremove --purge  
     
   I ran Diagnostics again, and this time I get:  
     
   Storage /boot \(on device /dev/sda1\) still has 106 MiB \(50%\) space left \(out of 213 MiB\)\!  
     
   with a green tick… Whew…  
     
   Dj

3. **发言者 2**（回复第 2 条）：From time to time you can also run yunohost tools basic-space-cleanup  
     
       
         \[图片省略\]  
     
         \[链接隐去\]  
       
     
       
       \[图片省略\]  
     
   Cleaning up space \| Yunohost  
     
     If your system runs out of space, you may an emergency option to get back some bit of space, and investigate what's taking up space

4. **发言者 1**（回复第 3 条）：发言者 2 Wow, thanks for that one…  
     
   I’m ok now with the original issue, but that ncdu / was fanstastic, all this time using this system, 6 years\! and I never used it… Very very useful… Thank you\!  
     
   Every day is a school day\!  
     
   Dj

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Naim Remote Is Able To Control Gryphon Amp  
     
   For the first time I have both Naim 282/250DR/HicapDR/NAPSC and Gryphon amps powered up concurrently for a thorough comparison. Both amps are connected with their own speaker cables for a more fuss-free switching, NAP250DR is on Chord Signature XL while the Gryphon Diablo 300 gets the higher range Chord Sarum T.  
     
   I got a shock when I pressed the mute button on the Naim remote when music was still playing through the Gryphon. The Gryphon suddenly went to mute. I didn’t expect this to happen so I tried using the Naim remote to turn the volume of the Gryphon amp up and down. Surprisingly the Gryphon amp responded accordingly. I then tested the Gryphon remote with the Naim NAC282 and surprisingly everything works like a charm. The mute and volume buttons on the Gryphon remote all worked on the Naim.  
     
   I can’t recall if I used any of these remotes with the Luxman integrated, and I’ll attempt to try it the next time I intend to do a shoot out between the Naim and Luxman/Gryphon.  
     
   \[图片省略\]IMG\_20261114\_1143251920×3413 1.16 MB

2. **发言者 2**（回复第 1 条）：You’ll find the Naim remote will run a lot of other manufacturers gear. Chances are it uses the Philips rc5 protocol which is quite common. My Naim remote does the basic functions of my old audiolab 8000CDM which is useful

3. **发言者 1**（回复第 2 条）：My Gryphon dealer provided a spare remote \(for a small fee\) as there were few cases of the original Gryphon remote failing. Now I have two spare remotes for the Gryphon, or Naim.

4. **发言者 3**（回复第 1 条）：I must say the Narcom 5 is one of the best remotes I’ve ever had it’s very robust and functional.  
     
   It has a quality feel. :\+1:

5. **发言者 4**（回复第 1 条）：\[图片省略\]IMG\_89541920×1440 540 KB  
     
   What’s a “remote control”…….:grin::grin:

6. **发言者 5**（回复第 5 条）：Speaker looks like it’s been pimped out with under lighting around the driver on this pic.  
     
   In sympathy with the Nait 50, nice work :ok\_hand:

7. **发言者 4**（回复第 6 条）：Trick of the light \!

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：所以晚上刷牙之后为什么不能吃东西\|∀ﾟ  
     
   诸君不觉得很奇怪吗：明明早上刷完牙还能正常吃饭，早上刷完牙一白天10多个小时都随便吃东西，但是偏偏晚上刷过牙之后8个小时左右，就一点东西都不能吃了，吃了一口还要去重新刷\(´ﾟДﾟ\`\)到底是为什么啊

2. **发言者 2**：因为晚上刷过牙之后牙齿会睡觉，这时候吃东西会把牙齿都唤醒，容易导致牙齿们精神衰弱偏头痛\(\*ﾟ∇ﾟ\)

3. **发言者 3**：早上应该是吃完饭再刷牙，但是赶时间或者其他原因导致往往只能先刷牙再吃饭\(´ﾟДﾟ\`\)先吃后刷，上午不吃东西的话，一整天只有中午饭后到睡前一段时间，大约十个小时，比先刷后吃能多好个小时\|∀ﾟ

4. **发言者 4**：刷牙是为了清洁口腔里的细菌以及食物残渣\( ´\_ゝ\`\)  
     
   晚上刷完不吃东西可以保持长达8小时的清洁状态，漱完口又吃东西一整晚细菌在你嘴里用残渣开派对  
     
   漱口水什么让你饭后用就是吃完饭马上做清洁尽量长时间的保持口腔干净  
     
   当然啦口腔卫生得保持是每个人自己的事情我才不关心xUa的口腔健康呢哼\(\*ﾟーﾟ\)

5. **发言者 5**（回复第 4 条）：\[引用第 4 条\]  
     
   哇，还有傲娇看ﾟ∀ﾟ\)σ

6. **发言者 6**：夜间唾液分泌会大幅减少，而且睡觉的时候没法喝水\(　ﾟ 3ﾟ\)缺少唾液调节和饮水冲刷，食物残渣和菌斑更容易形成稳定的发酵环境，所以睡前刷牙维持相对洁净的口腔环境就更加重要

### 讨论 37

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Heute ab 15:30: GTA 6- Releaseparty\!  
     
   \[图片省略\]73742000×1500 281 KB  
     
   Hallo ihr Lieben\! Wir sind tuuuurbo gehyped auf GTA 6 und deshalb steht der ganze Mittwoch im Stern des GTA-6-Countdowns\! Am Releaseabend \(Mi. 20 bis Do. 03:30 Uhr \), mit Ede, Nils Valle, Tim und meiner Wenigkeit, wollen wir gerne ein großes „Was erleben wir wohl gleich in GTA 6“-Bingofeld mit euren Vorschlägen befüllen. Wenn wir dann ab 0 Uhr mit noch mehr Bohnen das Game anzocken, könnt ihr fleißig abstreichen.  
     
   Aaaalso brauchen wir dafür eure Vorschläge\! Was sehen und erleben wir wohl alles in Vice City? Besoffene, die in eine Gasse kotzen? Leute, die sich vor einer Bar prügeln? Schreibts uns\! :two\_hearts:

2. **发言者 2**（回复第 1 条）：Im Radio, auf einer Werbefläche oder sonst wo sieht man eine MAGA-Referenz :billed\_cap:

3. **发言者 3**（回复第 1 条）：frei herumlaufende alligatoren

4. **发言者 4**（回复第 1 条）：Wasted\!

5. **发言者 5**（回复第 1 条）：Mehr als 5\(?\)s Airtime mit einem Auto.  
     
   Edit:  
     
   Moment, nicht wie bei Bingo Battle?

6. **发言者 6**（回复第 1 条）：Hund kackt  
     
   Feuerwehr fährt mit Blaulicht  
     
   NPC machen Unfall  
     
   Hubschrauber fliegt vorbei

7. **发言者 7**（回复第 1 条）：6 7  
     
   Maga Parodie  
     
   Mamdamu oder ein andere Demokratisch erfolgreiche Person  
     
   Elon Musk Parodie  
     
   Trump Parodie  
     
   Alte Charactere aus GTA Vice City  
     
   Lowrider

8. **发言者 8**（回复第 1 条）：Lazlow sehen oder hören  
     
   Easter Egg zu anderen Games gefunden  
     
   NPC wird von Tier gefressen

9. **发言者 9**（回复第 1 条）：jemand ruft an und möchte bowlen  
     
   Tommy Vercetti taucht auf  
     
   ferngesteuerter Helikopter Minispiel

10. **发言者 10**（回复第 1 条）：Einen Hinweis auf Saint Denis finden.  
     
   Hinweise auf Arthur finden.

11. **发言者 2**（回复第 1 条）：Florida Man wird erwähnt :beansmirk:

### 讨论 38

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：国内一家公司出海, 我在的海外实体签的\*\*Service Agreement\(服务合同\)\*\* 远程办公  
     
   然后昨天 HR 通知我项目不行/不盈利,直接关业务了.  所以服务合同终止, 也没有赔偿\(这个有预期,签的时候知道是服务合同\)  
     
   其实早有预感项目不行, 只是没想到这一天来的这么快. 然后突然收到这个消息,感觉挺难受的. 因为在老家\*\*浙江宁波, 简直是互联网荒漠\*\*, 原来毕业就在深圳/杭州/上海待了七年回到宁波, 有点不想再出去了.   
     
   现在这个情况宁波非常难找工作.  有些焦虑. 害

2. **发言者 2**：这一天终会到来

3. **发言者 3**：我司已开始欠薪了，下一步解散也不远了 emmm

4. **发言者 4**：迟早会来，早晚的事情。我是现在摆正心态了，当成工资日结的零工来做

5. **发言者 5**：继续找远程，一边用 ai 做自己的东西一边上班，只要不饿死就不要去搞铁人三项

6. **发言者 6**：我也是宁波的，感觉也快了，加个好友认识一下，到时候互帮互助 MTgzNTI5NDE4OTA=

7. **发言者 7**：听你这么说英语应该很好，再找一份海外 remote 应该也不难吧？

8. **发言者 8**：宁波离杭州不远 可以试试杭州的岗位呀

9. **发言者 9**：不是你的错，但让你承担后果；如何处理类似情况是一个问题；至少你不是因为自己的个人能力问题而解约的

10. **发言者 10**：宁波离上海杭州都很近啊

11. **发言者 11**：发言者 8 杭州更是卷到天际！！！！

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Why not have the ability to load sidecar file in duplicate manager?  
     
   I am just throwing out an idea for comment. I am playing with an image in the Play Raw category. I decided to make a duplicate and I want to apply another users sidecar file. The quickest way for me to do this is in duplicate manager in my view rather than having to go to to the lighttable view, select the image, load the sidecar file and then back to the darkroom view.  
     
   So I am wondering if this is something that would be worth proposing as a feature request or if it is only me that feels the ability to add a sidecar file should be available in the duplicate manager?  
     
   Maybe a new icon could be added next to each duplicate image.  
     
   \[图片省略\]image404×361 25.1 KB

2. **发言者 2**（回复第 1 条）：It could be added, but only after 5.8. Darktable is in feature freeze now.

3. **发言者 3**（引用未收录发言）：\[图片省略\] 发言者 4:  
     
   If you drag a sidecar onto the image in darkroom, you already have the option to create a duplicate.  
     
   For some odd reason, it bothers me a bit that the window text doesn’t match the order of the buttons :sweat\_smile:  
     
   Like the text says replace history or duplicate, and the buttons say duplicate or replace history \(the other way around\)

4. **发言者 4**（引用未收录发言）：Is there an advantage to creating the duplicates first then dragging in the XMPs?

5. **发言者 3**（回复第 4 条）：If you can select to create duplicate after drag-and-dropping an .xmp … I don’t think so

6. **发言者 5**（回复第 4 条）：\[图片省略\] 发言者 4:  
     
   Is there an advantage to creating the duplicates first then dragging in the XMPs?  
     
   Keeping the original. Oh, wait…  
     
   \[图片省略\] 发言者 3:  
     
   you can select to create duplicate after drag-and-dropping an .xmp  
     
   Good point\!

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Довідкові карти України на даних OSM: аптеки, лікарні, бювети — поділюся й прошу зворотного зв'язку  
     
   Привіт. Я роблю Mapiko — платформу, де люди створюють власні карти. Частина довідкових карт там зібрана з OpenStreetMap \(аптеки, лікарні, клініки й інше\), з атрибуцією © OpenStreetMap contributors, ODbL. Беремо лише об’єкти з назвою та адресою.  
     
   Хочу спитати спільноту:  
     
   які теги варто враховувати для годин роботи й доступності, щоб не показувати застаріле?  
     
   куди краще повідомляти про помилки, які ми помічаємо в даних, — у нотатки OSM чи сюди?  
     
   Сайт: \[链接隐去\]

2. **发言者 2**（回复第 1 条）：Про години роботи почитайте тут: Uk:Key:opening\_hours - OpenStreetMap Wiki  
     
   Якщо ви впевнені, що є помилка – краще її виправити самим

3. **发言者 3**（回复第 1 条）：\[图片省略\]  
     
         osmybiz.osm.ch  
       
     
       
         
     
   OSMyBiz  
     
       
     
       
         
         
       
     
       
     
   Для додавання/редагування poi

### 讨论 41

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：markdownWeb

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Geometry in/out sockets undocumented issue  
     
   \[图片省略\]image316×188 10.2 KB  
     
   \[图片省略\]image295×187 10.7 KB  
     
   Hi, I discovered an issue regarding the group sockets order that can potentially problematic for people learning but also for advanced users. Not a bug but a design inconsistency.  
     
   If for some reason the geometry input is misplaced or missing \(like in my case because I designed the modifier on an empty initially and there is not geo input\) just adding it on the list will break functionality if there are already other sockets. In general the order of Group Input sockets has no restrictions afaik.  
     
   The Geometry Input socket has to be placed on top of the socket list just below the Output socket.  
     
   By default it is created last in the list and will not work.  
     
   I discovered this by trial and error and is not documented. Of course the fixes to prevent confusion could be to enforce the insertion position or making it independent of the ui.  
     
   What is the path to get this at least documented if not changed in some way?

2. **发言者 2**（引用未收录发言）：In fact this even happens in 3.6 when you add a non-geometry input type and move it above the \(first geometry type\).. the output disappears because it has no geometry to work on.  
     
   As mentioned above it seem to be easier to implement than "searching for the next geometry type input slot.

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：RE: Controlling and Addressing NR4 LEDS  
     
   I am writing a small project on the Nano R4 and I want to use some LEDs on the board as status lights but I am unable to find documentation on addressing \(LED\_BUILTIN\) or addressing and controlling \(RGB LED\) them. So far all I have found is the schematic. I don't understand how to write to P204 or command the RGB LED.  
     
   Any guidance would be helpful and save me adding an external LED

2. **发言者 1**（引用未收录发言）：I ended up stumbling across this code that gave me 22u, 23u, 24u, and 25u as how to write to each. I may have seen that but thought of LEDR, LEDG, and LEDB as assignments that weren't shown

3. **发言者 2**（回复第 2 条）：\[图片省略\] 发言者 1:  
     
   this code that gave me 22u, 23u, 24u, and 25u  
     
   Yep, defined there:  
     
   \#define LEDR        \(23u\)  
   \#define LEDG        \(24u\)  
   \#define LEDB        \(25u\)

4. **发言者 1**（回复第 3 条）：Oh, weird. I didn't see those lines of code in the posting above :man\_shrugging: Nevertheless, thanks.  
     
   Just curious, where does the -u suffix originate from. Ive only used the Uno R3 prior to this?

5. **发言者 2**（回复第 4 条）：unsigned int.  
     
   \#define LEDR   \(23u\)  
     
   \#define LEDR  23  
     
   LEDR = pin 23 = port P409  
     
   Confusing at best. Desperate approach to keep identic pinout for all different MCUs under arduino nano family.

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Dev snapshot: Godot 4.8 beta 4  
     
   It’s only been a little over a week since our previous development snapshot, and in that time we’ve already worked through the majority of remaining release blockers\!  
     
   If you’re interested in helping us reach the final stretch, be sure to check out our latest snapshot: Godot 4.8 beta 4.  
     
       
         \[图片省略\]  
     
         Godot Engine  
       
     
       
       \[图片省略\]  
     
   Dev snapshot: Godot 4.8 beta 4 – Godot Engine  
     
     With all but a handful of release blockers resolved, a release candidate is imminent\!

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: ADE Index – a sourced and ranked index of 975 agentic coding tools

2. **发言者 2**（回复第 1 条）：How many of these things do we really need. Especially given a lot of what's described as agentic engineering seems comes down to writing a few markdown files...

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Self-hosting a small member portal with YunoHost instead of Softr?  
     
   Discuss  
   I’m setting up a simple members’ area for a neighborhood garden group here in Richmond, Virginia. Right now I’m leaning toward Softr because it connects to Airtable easily, but I don’t love the monthly cost for a group with around 40 people.  
     
   I already run YunoHost on a small VPS for email and a couple of apps, so self-hosting something feels natural. I’m not a developer, just comfortable following documentation and poking around slowly.  
     
   My concern is that Softr-style drag-and-drop app building may not really exist in the YunoHost catalog. I don’t need AI app building, just a login-protected page with a member directory, maybe a simple form, and event listings. I’m unsure whether to combine a CMS with single sign-on, or whether that adds too much maintenance for one person.  
     
   Has anyone here built something similar on YunoHost? Which apps did you put together, and what broke or got annoying over time?

2. **发言者 2**（回复第 1 条）：Not sure to understand your need here, but did you try homarr? It’s available in the catalog

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Nouvelle skin 某社区 - Centralisation des bugs/améliorations  
     
   Tout d'abord bravo à nos tauliers Caf et Fask \(et le hum hum...stagiaire, Claude :sweat\_smile:\) pour ce grand ravalement de façade.  
     
   Ce topic est là pour centraliser les remarques et éventuelles remontées de bugs \(qui seraient entièrement la faute du stagiaire of course\) concernant cette nouvelle skin.  
     
   Pensez bien à préciser sur quel browser/OS/device vous avez testé si vous remontez un problème.  
     
   J'ouvre le bal avec une broutille sur iOS/Safari, on est clairement pas sur du bug mais plutôt de l'UX  
     
   \[图片省略\]IMG\_82191170×2532 150 KB  
     
   Quand on scroll vers le haut dans un topic, je trouve que le logo 某社区, très utile pour retourner à la liste des topics, est minuscule, et je me retrouve à souvent utiliser le bouton de retour au site principal sans trop faire gaffe, alors que je souhaite la plupart du temps retourner à la liste des topics.

2. **发言者 2**（回复第 1 条）：C’est déjà dans la liste, cf  \[链接隐去\]  
     
   Mais on centralise ici \! :smiley:  
     
   Doc incoming en news, mais en gros vous avez 3 couleurs possibles pour le forum now :smiley:

3. **发言者 3**（回复第 1 条）：ça date peut-être de bien avant la mise à jour, mais j'ai tenté de lier mon compte GitHub dans mon profil et "The redirect\_uri is not associated with this application.  
     
   The application might be misconfigured or could be trying to redirect you to a website you weren't expecting."

4. **发言者 2**（回复第 3 条）：Je note. On a encore des réglages à corriger. Vu ce que j’ai retrouvé en faisant la passe sur tous les textes légaux et sur le WP, il DOIT reste plein de merdes \(j’ai encore une bonne grosse todo côté admin :smiley: \)

5. **发言者 4**（回复第 4 条）：Souci sur une des pages des configs,  je pense que c'est un problème de mise en page qui a sauté au changement mais je touche pas l'admin pour rien péter avec mon 0.00001% bug power.  :smiley:  
     
   \[图片省略\]image1080×1023 291 KB

6. **发言者 5**（回复第 1 条）：Dans le menu des préférences, concernant l'interface, il y a une option rédigée en anglais :  
     
   \[图片省略\]

7. **发言者 2**（回复第 6 条）：Normal :grimacing: On est sur la build super bêta depuis 2015 en fait, les trads ont toujours du retard.

8. **发言者 6**（引用未收录发言）：Pareil, la Mona Sans, c'est rond et mignon, mais à lire j'aime pas non plus, on dirait que c'est toujours flou et trop serré, ça vaut pas une Arial basique

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：之前一直可以的，记忆中好像是升级到 27.3 Beta2 不行了  
     
   各种截屏软件、某社区自带截屏、系统自带截屏，都不行  
     
   现象是一旦开启截屏，某社区窗口就消失。。。如果用系统带的 ⇧⌘4，虽然某社区窗口在，但是截下来的内容里也没有某社区窗口

2. **发言者 2**：遇到了，用某社区自己的截图可以的样子

3. **发言者 3**：1capture 可以。

4. **发言者 4**：某社区本身问题，退某社区版本到 4.1.15.55 稳定无问题。

5. **发言者 5**：这个是某社区的设置，录屏的时候会隐藏聊天窗口，在某社区的设置-通用里面可以关闭

6. **发言者 1**（回复第 5 条）：\[引用第 5 条\] 没有看到这个设置呀，AI 和我说某社区有一个「点击截图按钮时保留当前窗口」的功能，但我没找到设置项  
     
   发言者 4 \#3 目前某社区是最新的 4.2.0.54，但另一台电脑上，系统版本、某社区版本啥的都一样，目前是正常的。。。  
     
   发言者 2 \#1 用某社区自己的截图也不行。。。

<!-- samples:end -->

