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

采集时间：2026-11-21 14:34:31（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: How did 某社区 get its name?  
     
   At first glance, you'd think it's a news website for hackers but it's much more than that.

2. **发言者 2**（回复第 1 条）：\[链接隐去\]

3. **发言者 3**（回复第 1 条）：It was originally setup by renowned British television personality Hacker T Dog as a news site. After several funding rounds he exited with quite the payoff and now lives a life of relative solitude in \[链接隐去\]

4. **发言者 1**（回复第 2 条）：Thank you\!

5. **发言者 1**（回复第 3 条）：Thank you\!

### 讨论 2

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：国庆那阵要整理一批文件，分类、归档都不太趁手，批量改名也麻烦，就趁假期自己做了一个 \`App\`。11 月中终于在 \`App Store\` 上架了。  
     
   临近黑色星期五，想给 \`V\` 友回馈一下，放一批限量免费兑换码，先到先得。  
     
   主要特点：  
     
   - 按类型、日期等规则整理文件，先预览再执行  
   - 自动归档：App 开着时，所选文件夹里的新文件会自动整理  
   - 新建文件夹、查看文件详情  
   - 也支持批量重命名：前缀/后缀、替换、序列号等，可撤销  
   - 完全在本机处理  
     
   \[File Organizer @ App Store\]\(\[链接隐去\]  
     
   兑换码数量有限：  
   \`\`\`text  
   6JFPY4P9JN6A  
   FXKNA4KENJ79  
   R34M4734JMFL  
   LXYT744P39PP  
   EK4JPHWA6N7N  
   93TKM4WMWX94  
   TLLXLW737FPP  
   9JKANRL7KWPM  
   TNPFKWHWNTEX  
   RRRLPJALWKAT  
   N6A664R3A7WK  
   9TEYXYHEWTXT  
   9XXHNKENXTPR  
   HRYRAWTHN3PY  
   A94KFMA7J9XX  
   TLXX6J9EYFM4  
   4PHTEP9WJEM9  
   HEM37A3XLYKA  
   3TLRLYXE6R3K  
   XP66YH4KEX9T  
   JA933YLE4KTM  
   WWYRJ6HRK3EN  
   N4J4KLXHKX49  
   FXMFWK7YEKWW  
   XLWNAKN9MM9L  
   4E7WWYMFR3AK  
   W4YNJYFXXYRY  
   P446H6M67YPH  
   LL797T44XK39  
   H3NEYNF49PRN  
   \`\`\`

2. **发言者 2**：LXYT744P39PP，已用，谢谢分享

3. **发言者 3**：N4J4KLXHKX49，已兑换，感谢

4. **发言者 4**：WWYRJ6HRK3EN 已用，感谢

5. **发言者 5**：TLXX6J9EYFM4 已兑换，谢谢

6. **发言者 6**：看在你头像好看的份上

7. **发言者 7**：EK4JP，谢大佬

8. **发言者 8**：TLLXLW737FPP 已用，谢谢大佬

9. **发言者 9**：都没了 NDQ0ODMzMEBnbWFpbC5jb20= 求一个

10. **发言者 10**：这事 workbuddy 不就可以干了吗？  
     
   当然我一般是用命令行

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Running while carrying a camera  
     
   Hello everyone,  
     
   While I do my weekly running I often encounter scenes that I’d like to photograph. Straight to the point : do you know a bag that could carry a small camera \(a Canon M50 \+ the 22mm pancake\), while still being very comfortable to run 10km \(6 miles\) ? I’m concerned for my comfort of course but also the camera’s, that would have not to be jumping up and down with each stride.  
     
   Any experience welcome \!

2. **发言者 2**（回复第 1 条）：If you carry a light backpack, you can put it on the strap with a clip.

3. **发言者 1**（回复第 2 条）：The only bag I usually carry is a very thin fanny pack to carry my phone. Otherwise, it’s just my pair of shoes, a short and a t-shirt.

4. **发言者 2**（回复第 3 条）：If the fanny pack has a strap, you may be able to put a clip on it.  
     
   I use the this one from Pgytech.

5. **发言者 3**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   Canon M50 \+ the 22mm pancake  
     
   I never owned one, but I loved the Canon M50 for its compact design. I had many students buy them on my recommendation and then Canon killed the M mount. Hmmmm.

6. **发言者 4**（回复第 1 条）：When I \(used to\) go running, I grab a camera that’s light enough to hold in my hand the entire time. Anything dangling from my body is too uncomfortable.  
     
   Also, I want some tele reach. I’ve used a Nikon 1, a Pentax Q, a Panasonic GM, a Ricoh GR, and most commonly, my phone. \(The latter two of course have no tele\)

7. **发言者 5**（回复第 1 条）：No experience, but a holster of some kind that keeps the camera against or close to the body \(not the bendy parts\) would help a lot.  
     
   If it is light enough, using heavy-duty Velcro on the clothing and camera to snap on might work, but that might be asking for trouble…

### 讨论 4

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Query about すぎる  
     
   Hi everyone,  
     
   I am back from a break and recapping all N5 topics before getting stuck into N4 and I saw something that made me a little confused.  
     
   When I first learnt 〜すぎる I understood it to be used to express something is too much of that adjective and to have a negative nuance IE this cake is too sweet \(for my liking\)  
     
   But the topic I just read mentions it in a positive light so I just wanted to check, if I said 「うさぎは可愛すぎる\!」would the listening understand that to mean “bunnies are so freaking cute \(and seeing their cuteness fills me with joy\)\!” Or are they going to think that I find bunny’s cuteness deplorable.  
     
   If I can use it with positive nuance, what are the social rules for this IE just with friends, spoken and not written Etc etc.  
     
   Thanks in advance\!\!\!

2. **发言者 2**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   うさぎは可愛すぎる\!  
     
   I think it just means as in english, “bunnies are tooooo cute\!”  and i think you can use it with anyone but maybe more casual is just 可愛すぎ and more formal 可愛すぎます

3. **发言者 1**（回复第 2 条）：Thank you, thats what I was thinking too. I have been using とても to express when something is so or too cute, but will be fun to practice it with すぎる😀

4. **发言者 3**（回复第 1 条）：If you want to use a more casual way you can also say めっちゃ~  
     
   めっちゃ可愛い \(it is so cute \!\).  
     
   This is used a lot amongst friends but really casual.

5. **发言者 2**（回复第 3 条）：朝（ちょう\) eg 超可愛い （ちょうかわいい）is another one that i like a lot\!

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Advent of Tess  
     
   Does anyone here do this kind of paper folding? Have you participated in previous years of Advent of Tess? I am thinking about taking on the challenge\!

2. **发言者 2**（回复第 1 条）：Those look amazing. But also like I might pull my hair out trying to make them. What a cool Advent though\! If you participate I hope you’ll share the results with us\!

3. **发言者 1**（回复第 2 条）：Thanks for the encouragement.  
     
   This combines things I enjoy \(math/geometry \+ art/tesselations\) and origami \(which I enjoy but sometimes lack the precision needed\) so, hmmm . . .  
     
   Also, should I take on another project . . . ?  
     
   :thinking:

4. **发言者 2**（回复第 3 条）：Find a free tutorial and try one. If you like it, then why not. If it’s too frustrating there are a million other ways to bring your love of tessalations/geometry and origami together.  
     
   I’m an enabler. :joy:

5. **发言者 3**（回复第 1 条）：Those are so cool\!  
     
   I am struggling to make some Swedish paper stars, so I have a great admiration for people who have the patience to make more complicated folding patterns.  
     
   I recently made a cool little box from one sheet of paper but have yet to use nice paper. Soon, though. I might try one of the free patterns…I have so much paper\!

6. **发言者 1**（回复第 4 条）：That’s great advice\!

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How can i recreate this comic style for background  
     
   \[图片省略\]office1920×1080 2.12 MB  
     
   \[链接隐去\] this is look i wanna recreate for my environment.

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：General measurements discussion for GraphWorks visualizer  
     
   Share and discuss your impressions of different measurements in the new GraphWorks visualizer tool, whether you’ve actually listened to the headphones or not \(which is normally taboo on most audiophile forums\).  
     
   I have not listened to most of the headphones in this tool btw. So most of my impressions with be based on the 5128 graphs, and sometimes also some virtual listening. So they should be taken with a grain of salt.

### 讨论 8

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

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Linn Selekt free dac upgrade  
     
   Promotion started yesterday and running till 5th Jan, if you buy a new Select DSM whichever dac you choose will be upgraded to the next up for free. You pay for the cartridges required. I think I’ll be taking them up on this to replace my Akurate DSM beginning of Dec.

2. **发言者 2**（回复第 1 条）：Nice offer but……. three auditions later, still not tempted :innocent:. Offer helps the trade ins a bit, but not grabbed by the Linn sound in the same way Naim grabs me and holds on.  
     
   Of course, YMMV and in a few years a one box solution might be the way.  
     
   ATB, J

3. **发言者 3**（回复第 2 条）：You have stated exactly the issue I had after i bought a Linn Selekt edition hub. Its cost me a fortune to get out of streaming and back to an amp and CD I liked.

4. **发言者 4**（引用未收录发言）：I’ve now owned both the Linn Selekt and the Nova PE. Despite waxing lyrical about the Selekt in the past, I must admit I’m not sure I’ve lost anything by moving to the Nova PE. It’s very, very impressive and a lot cheaper\!

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：What are you doing this weekend?  
     
   Feel free to tell what you plan on doing this weekend and even ask for help or feedback.  
     
   Please keep in mind it’s more than OK to do nothing at all too\!

2. **发言者 2**（回复第 1 条）：My workplace just announced the immediate end of working from home a couple of days a week, back to full time in the office; so I'll be looking at job postings.  
     
   It's somewhat nice to have something concrete to stress over rather than the general malaise that seems to have settled over the entire software engineering field in recent months.

3. **发言者 3**（引用未收录发言）：It's a shame the guys over at \[链接隐去\] are prioritizing their Windows support before Linux, otherwise I would've recommended them for a new take on video editing software :\( Both them and FilePilot are sadly married to the Windows ecosystem still for the foreseeable future.

4. **发言者 4**（回复第 1 条）：Playing Padel &amp; playing GTAIV. Coding a little on my task management app.

5. **发言者 5**（回复第 2 条）：Oh don't worry - the general malaise will still be there for you once you're no longer stressed about something concrete.

6. **发言者 6**（回复第 1 条）：New Anthrodam\! \(On a slightly twisted ankle and/or pulled hamstring, alas\!\)

7. **发言者 7**（回复第 1 条）：licking my wounds after my first layoff, at the only company i’ve ever worked at full time

8. **发言者 8**（回复第 1 条）：\[Today\]\(\[链接隐去\] the Seattle co-working session for Handmade devs. Swing by if you live nearby\!

9. **发言者 9**（回复第 1 条）：Continue binge reading malazan \(can't be arsed about life when there's a siege on\)

10. **发言者 10**（回复第 1 条）：I've been working on \[CabFuse\]\(\[链接隐去\] a free tab manager for Windows 10 File Explorer.  
     
   Recently added automatic merging of new Explorer windows into tabs and optional vertical tabs.

11. **发言者 11**（回复第 1 条）：Traveling down to Virginia to visit partner's family.

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：I discovered a way to reduce vertical curl in stockinette  
     
   I’m using the side edge of my sweater body to test out an idea. It worked so well for me I thought I’d share in case anyone else can make use of this method.  
     
   \[图片省略\]20261116\_0845261920×2560 1020 KB  
     
   \[图片省略\]20261116\_0835541642×2182 819 KB  
     
   Two pieces of stockinette. One clearly curling no matter how flat I try to make it, the other has a section sitting flat \(which curls where I have not done the treatment\).  I have shown the right side and wrong side of each.  
     
   It is a crochet slip stitch worked on the wrong side between 2 columns of stitches.  
     
   I wanted a non curling edge for a button band where I did not want ribbing or the additional bulk of double knitting or a folded band.  
     
   Has anyone else used this method before?

2. **发言者 2**（回复第 1 条）：I’ve not done this.  I will try this.  I have done a one stitch column of garter stitch between the main body of the project and the border to counter flipping.  It can help a lot when the border is part of the knitting.

3. **发言者 3**（引用未收录发言）：Excellent\! I’ll have to give that a try next cardigan.

4. **发言者 4**（引用未收录发言）：Thank you\! I wonder what can be done for the corner of a crocheted cardigan which curls. I see them even in the pattern photos which makes me immediately skip that pattern\!

5. **发言者 1**（回复第 4 条）：Do you have a pattern or pic example?  
     
   I wonder if this method would help? It is kept invisible in the knitting RS by being between the columns which i don’t think is possible in crochet but then i am not a crocheter so my experience is almost zero.  
     
   If you try it though let us know.

6. **发言者 4**（回复第 5 条）：I’m not sure if this is actually turning out like this, the wind, or just incidental, but here’s one I found on Ravelry. I have a sweater somewhere that I can try to fix using this method. I’ve tried different solutions but it always goes back to curling.  
     
   \[链接隐去\]  
     
   \[图片省略\]IMG\_0889944×1290 228 KB

7. **发言者 5**（回复第 1 条）：Yeah, this is definitely an issue with crochet cardis. I haven’t ever found a solution…I just live with it.

8. **发言者 6**（回复第 1 条）：What a cool find\! I’ll remeber this\!

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: CLI for agents to download movie clips from dialogues

2. **发言者 2**（回复第 1 条）：nice tool btw how are you pulling the clips from clip.cafe under the hood? do the have a public/undocumented api or is it jut scraping html??

3. **发言者 1**（回复第 1 条）：So I faced this issue when working with agents to edit video, we were trying to do a supercut with a lot of film scenes. Manually having to go through 某社区 and other sites to find the clips was tedious. This CLI wraps all that complexity so your agents and you can save a lot of time.

4. **发言者 1**（回复第 2 条）：the good ol' html navigation :\)

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：我大部分时间都不需要用自己的梯子，所以之前都是买的按量付费的，结果前两天想自己电脑看个油管，晚上梯子速度都带不动，才知道那些机场有多拉跨  
     
   自建 / 机场都可以推荐  
     
   预算 20-30r /月 （因为用的确实不多）

2. **发言者 2**：你要肯出大概 100 块，我可以推荐速度顶顶的

3. **发言者 3**：\[链接隐去\]

4. **发言者 4**：试试里面的专线 \[链接隐去\]

5. **发言者 5**：发言者 2 这个是用的专线吗，还是机场？

6. **发言者 6**：aHR0cHM6Ly93d3cuZGdpbnYuY2xpY2svIy9yZWdpc3Rlcj9jb2RlPTJwM3FPYnVj  
     
   韩国新加坡节点非常非常非常快

7. **发言者 2**：发言者 5 专线

8. **发言者 7**：我用的梯子看油管看某社区甚至是 p 站 x 站上面的视频速度都不慢，但是看 TG 上面的视频速度很慢，FHD 清晰度基本上看不了，有朋友知道怎么回事吗

9. **发言者 8**：20-30 自建都有三网了

10. **发言者 9**：我整了个 Google ai ultra，然后每个月 40 刀赠金，自建一个出口服务器非常爽

11. **发言者 10**：aHR0cHM6Ly91c2VyLnllc2hhLnByby8jL3JlZ2lzdGVyP2NvZGU9VlZrQm00V0g=  
   年付 58 月 30G

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Compile from Git fails with AI Flag  
     
   I cannot compile 5.7.0 with the AI flag enabled.  
     
   fails as shown below:  
     
   – Fetching ONNX Runtime v1.24.4 release metadata from GitHub API…  
     
   CMake Warning at cmake/modules/FindONNXRuntime.cmake:240 \(message\):  
     
   Failed to fetch release metadata from GitHub: “HTTP response code said  
     
   error”  
     
   Call Stack \(most recent call first\):  
     
   src/CMakeLists.txt:3 \(find\_package\)  
     
   CMake Warning at cmake/modules/FindONNXRuntime.cmake:266 \(message\):  
     
   Could not obtain integrity hash for onnxruntime-linux-x64-1.24.4.tgz from  
     
   package repository.  Refusing to download without verification.  Install  
     
   ONNX Runtime manually or set ONNXRUNTIME\_OFFLINE=ON.  
     
   Call Stack \(most recent call first\):  
     
   src/CMakeLists.txt:3 \(find\_package\)  
     
   CMake Error at src/CMakeLists.txt:5 \(message\):  
     
   ONNX Runtime not found

2. **发言者 2**（回复第 1 条）：Please read the warnings and messages. They tell you what to do : install onnx runtime manually.

3. **发言者 3**（回复第 2 条）：FindONNXRuntime.cmake search the onnxruntime-linux-x64-1.24.4.tgz in a github repo that doesn’t exist any more.  
     
   I’m now trying to figure out how to install it manually in a linux mint \(the one-line install script provided in darktable user manual - GPU acceleration also search in that non-existent github repo\).

4. **发言者 4**（回复第 3 条）：\[图片省略\] 发言者 1:  
     
   onnxruntime-linux-x64-1.24.4.tgz  
     
   Some onnx related repos are reported as being deliberately offline: Microsoft's official Python agent framework hijacked to distribute malware says  
     
   It’s been pointed out online that Microsoft’s repo for ONNX Runtime, an AI accelerator, is also offline.

5. **发言者 5**（回复第 4 条）：Ahh… Thanks.  
     
   Circumstances beyond our control then: we will just have to wait until the rest of the world sorts itself out .

6. **发言者 1**（回复第 2 条）：发言者 2 et al …  
     
   Thanks, missed that.  
     
   Will continue to compile without AI.  
     
   :upside\_down\_face:

7. **发言者 6**（回复第 1 条）：The nightly AppImages seem to be failing for the same reason since two days.

8. **发言者 7**（回复第 7 条）：Can’t do much honestly.

9. **发言者 5**（回复第 1 条）：As and when someone notices that MS has got its act together with the onnx githib, Do please post here, so we can all go back to the nightlies.  
     
   Compiling without AI is not an option for me: it quickly became indispensable. Most of my masking shapes are AI.  
     
   Wanting to update to the Flexi-Mask latest. But hey, what I have works, so no hurry.

### 讨论 15

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

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Moongrave a Roguelite Tower Defense on Steam \!  
     
   Hey,  
     
   We are two indie developers working on Moongrave, a tower defense game made with Godot.  
     
   Story: In a world where the moon has shattered, humanity has fled underground, for evil lurks on the surface. Their only hope is a moon crystal that can rise up, strike down the wicked creatures, and bring back the resources vital to rebuilding the underground colony.  
     
   A demo is available:  \[链接隐去\]  
     
   Your feedback matters\! Share your thoughts on the game and help us make it even better.  
     
   Jonathan from the Moongrave team  
     
   \[图片省略\]EN\_Screenshots\_011920×1080 414 KB  
     
   \[图片省略\]FR\_Screenshots\_071920×1080 304 KB  
     
   \[图片省略\]EN\_Screenshots\_061920×1080 305 KB  
     
   \[图片省略\]image1914×1071 376 KB  
     
   \[图片省略\]EN\_Screenshots\_031920×1080 447 KB

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Chairs  
     
   I make chairs for fun using blender and 3dcoat for texturing.  
     
   \[图片省略\]00041920×1080 2.38 MB  
     
   \[图片省略\]00031920×1080 2.34 MB  
     
   \[图片省略\]00021920×1080 2.64 MB  
     
   \[图片省略\]00011920×1080 2.26 MB

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Re: \[閒聊\] 相親男生聽到女生薪水2萬多就跑了  
     
   有沒有想過  
   到了要相親的年紀  
   在台灣薪水兩萬多  
   這是什麼概念  
     
   這說是三級貧戶也沒錯吧  
   雖然不應要求要多會賺錢  
   但沒必要找一個這麼極端的吧  
   找她根本是沒苦硬吃了  
   在台灣這種薪水不住家裡的話，她養的活自己嗎

2. **发言者 2**（回复第 1 条）：26k養不活自己 但是40k養得活自己跟

3. **发言者 2**（回复第 1 条）：小孩

### 讨论 19

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
     
   1. 你五歲小孩很愛爸爸，要跟爸爸一起睡，  
     
   所以你老公應該是一個情緒穩定，有耐心，愛孩子的爸爸，  
   而且前幾年每天陪玩陪睡才能得到孩子的愛，這不是幾天就可以達到，  
   你對孩子付出多少愛，孩子就回報你多少愛，孩子黏他就說明一切了  
     
   2.你一打二很辛苦，好媽媽無庸質疑  
     
   3.你把夫妻間的做愛說成打炮，  
     
   你應該討厭做愛，或是討厭跟你老公做愛，  
   生理性排斥，  
   你老公都五十歲了還對你性緻勃勃，他沒問題。  
   你為什麼對你老公生理性排斥？  
   女人三十如狼四十如虎，你正值狼虎之年啊？

2. **发言者 2**（回复第 1 条）：第一句就不對了，養過小孩嗎？這年紀小孩天生孺慕爸

3. **发言者 2**（回复第 1 条）：媽需要陪伴，就算是個超級大爛人也一樣

4. **发言者 3**（回复第 1 条）：樓上，但孩子當天是想黏（較少相處的）爸爸，而非主

5. **发言者 3**（回复第 1 条）：要照顧者媽媽。多少還是因為爸爸有用心在孩子身上吧

6. **发言者 3**（回复第 1 条）：？！

7. **发言者 4**（回复第 1 条）：最好是超級大爛人小孩也會愛，天天喝醉打小孩試試?

8. **发言者 5**（回复第 1 条）：一樓真的養過小孩嗎

9. **发言者 6**（回复第 1 条）：倒數三行的問法真有趣

10. **发言者 7**（回复第 1 条）：一樓沒養過也當過小孩吧！

11. **发言者 8**（回复第 1 条）：其實小孩黏父母其中一人有部份原因是對依附關係感到

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Hilfe beim Kauf von smarten Heizungsthermostaten  
     
   Moin zusammen, ich möchte den Black Friday mitnehmen und unsere Wohnung mit digitalen/smarten Heizungsthermostaten austatten.  
     
   Ich hab da jetzt nur ein paar Fragen. Wir haben keine zwei Geschosse, was mal zwei Wohnungen waren, jede Etage hat ihre eigene Gastherme. Brauche ich dann zwei Basis Stationen? Quasi für jede Therme eine?\!  
     
   Und wir haben so ein analoges Raumthermostat, was per Funk mit der Therme kommuniziert. Wie genau sagen wir denn der Therme, dass sie in Zukunft dann nicht mehr mit dem alten Raumthermostat kommunizieren soll, sondern mit der neuen Basis Station? Das verstehe ich noch nicht so richtig :smiley: Ich hoffe sehr auf euere Hilfe :smiley:

2. **发言者 2**（回复第 1 条）：Geht es nur um Thermostaten die an die Heizkörper geschraubt werden oder Raumthermostaten und die Ventile sitzen wo anders?

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Recherche d'un gentil graphiste pour refaire les cinematiques de mon jeu  
     
   Bonjour ici , j'ai un petit jeu que je pense vendre sur Steam et je suis une tanche monumentale en graphisme, pour l'instant mes assets sont générés par le jeu et ça passe plus ou moins,  
     
   par contre les cinématiques sont moches ,  donc je cherche un graphiste qui pourrait me les refaire .Ce sont des cases BD actuellement générées par ce cher Claude , j'en ai une vingtaine actuellement , je pense en avoir une quarantaine d'ici que tout le contenu soit produit. L'idée étant de garder la scène mais de la redessiner en mieux \(ce qui vu la qualité actuelle ne devrait pas étre hyper compliqué\)  
     
   On verra en mp pour les tarifs, devis , prix fixe ou pourcentage sur les revenus du jeu , vu que tout travail mérite salaire.

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Help adjusting the cue lever arm on Ekos SE/LP12  
     
   Does anyone have any advice/hints/procedures for setting the cue lever height on an Ekos SE. The main post on mine \(the cylinder that attaches to the base of the arm\)  went out of its original position and I am having quite a difficult time getting it in the right vertical position again. Is there another adjustment I can make \(other than the hex screw that holds the post in place\) or is it just a question of trial and error? Thanks for your help.

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Levent Alpoge Claims Proof of Riemann Hypothesis

2. **发言者 2**（回复第 1 条）：Primary source posted here: \[链接隐去\]

3. **发言者 3**（回复第 1 条）：Amazing if true \(in the sense that there's no subtle hole in the proof, obviously I don't assume the person in question would try to lie\).  
     
   The timing of this being released right after the IPO feels a little cynical though.

4. **发言者 4**（回复第 1 条）：There are apparently hundreds \(thousands?\) of other mathematical proofs that start with "assuming the Riemann hypothesis...", so if this holds up those all become established at once.

5. **发言者 5**（回复第 3 条）：&gt; The timing of this being released right after the IPO feels a little cynical though.  
     
   they, er, elliptically address this in the document.  certainly seems to me it would be weirder to hold on to it longer.

6. **发言者 6**（回复第 4 条）：Any particularly important? I've heard the same but I don't know which ones have the most importance.

7. **发言者 7**（回复第 3 条）：For the record, Levent Alpöge has already been in the news months ago in relation to the Navier-Stokes problem, where OpenAI announced a proof and then Tristan Buckmaster and he claimed they were already working on that and OpenAI may have \(deliberately or inadvertently\) worked off of their unfinished progress.

8. **发言者 8**（回复第 1 条）：Reportedly, 250,000 pages. May as well ask an oracle for an answer.

9. **发言者 9**（回复第 3 条）：&gt; The timing of this being released right after the IPO feels a little cynical though.  
     
   They couldn’t have released it during the quiet period.

10. **发言者 10**（引用未收录发言）：The Miller-Rabin test usually refers to the probabilistic version. The so-called Miller test is the deterministic one. And indeed GRH implies that the latter algorithm runs in polynomial time, but funnily enough the quasi-RH result proved by OpenAI in October already sufficed for this implication. See discussion in this \[MathOverflow thread\]\(\[链接隐去\]

11. **发言者 11**（回复第 8 条）：Not really. Even his summary already reads like it has enough detail to let experts in the area start understanding the roughest sketch of the approach.  
     
   The 250,000 page result is evidently a mess, and will certainly be cut down in size, with a lot of combined human and AI effort over the coming months.

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Sadnes Garn Wendy Sweater \(saddle shoulder\)  
     
   Hello and please help.  See attached; I am at point A and am stuck.  The pattern seems to interchange RNDS and ROWS and no where does it state ‘join to work in the RND’. But maybe I am expected to know when to do this.  Should I have joined before \(or at point A\)? This I thought would be a quick knit but the shoulder shaping has stumped me.  
     
   \[图片省略\]Wendy Sweater 1899×1599 161 KB  
     
   \[图片省略\]Wendy Sweater 2899×1599 139 KB  
     
   I am a fairly good knitter \(picked it up again during lockdown\) and have knitted many items including jumpers/sweaters but never a saddle shoulder and never anything from Sandnes Garn.

2. **发言者 1**（引用未收录发言）：Hello 某参与者, Thank you for your help.  I cast on 70 sts and my stitch count at the point I marked A is 96 which should be correct.  If I now join itr then why does the pattern state “cast on x sts at end of ROW for neck”?  The comment below says that the ROW/RNDS switch is intentional.  I am not helped because I can not picture the construction.

3. **发言者 1**（引用未收录发言）：Thank you.  But if I join to work in the RND at my point A why does it say cast on sts at end ROW after I have joined in the round?  I am quite mad that I can’t figure this out.

4. **发言者 1**（引用未收录发言）：发言者 2 thank you.  I understand and read through the pattern again and see that ‘what is coming’ next pattern writing.  One last question please?  I knitted straight, cast on 10 extra sts but now I am on the was so I am going to purl across to get back to the ws then knit to the 1st marker and join to work itr.

5. **发言者 1**（引用未收录发言）：某参与者 I agree, writing ‘cont further in RNDS…’ at the point that it is written is confusing.  Thank you so much for taking the time to reply; very much appreciated.

6. **发言者 2**（回复第 4 条）：After you cast on the 10sts, turn so that the RS is facing you. This is the point where the knitting is joined to knit in the round. Now knit to the first marker and call that the beginning of round marker.

### 讨论 25

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Hay,Calling for Devs and HN  
     
   It feels too much annoyed while updating my team at the time when I am in the deep coding session. I am not pitching anyone just wondering if only its me or there is anybody else. if anyone faced it; when it happened,what part feels too much annoying to you and how do u handle  this frustration?

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：90 后程序员开始创业，目前主要在承接海外自动化项目，而且在探索海外接单的方式。目前主要运营 X，红薯这里用来做个记录，同时希望可以分享相关案例来辐射国内客服。  
   现状：  
   口语还得提升，虽然目前还没遇到需要会议的国外客户，但是如果遇到了因为语言导致丢单岂不是太亏了。  
   项目：  
   最近再帮一个客户做 shopify 的自动跟单，也就是客户下单以后通过谷歌邮箱通知，最后直接落入订单管理系统，以及后续的只能分析工作流。用 n8n 来完成整个工作流的搭建。  
   新客户还在开发中，用来冷邮件沟通的账号还在预热，目前只能在 upwork 上投一些简历，希望可以有一些新的机会。  
   国内有想要实现自动化工作流的可以跟我咨询，目前也做过自动化选品工作流。  
   我觉得 AI 只能让本身已经有可获利的 sop 的人来提升效率，相反那些希望用 AI 来窥探天机的人只会陷入另一个信息茧房中，因为你没办法通过自己的认知来分辨和修正 AI 的输出。

### 讨论 27

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Zenith script fails  
     
   what must I do to get Syqon Zenith to work?

2. **发言者 2**（回复第 1 条）：Hello, perhaps you can start by explaining what problem you encounter?

### 讨论 28

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

### 讨论 29

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

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Blaze Fielding – Streets of Rage \(3D Fan Art\)  
     
   Blaze Fielding – Streets of Rage \(3D Fan Art\)  
     
   Hi everyone\!  
     
   Here’s my finished 3D model of Blaze Fielding from Streets of Rage.  
     
   I wanted to create my own 3D interpretation of the character, keeping her classic look and giving her a stylized toon-shaded appearance.  
     
   The model features her long wavy brown hair, gold hoop earrings, black cropped leather jacket, red crop top, red mini skirt with a black belt and silver buckle, fingerless gloves and red boots.  
     
   The character was modeled, textured and rigged in Blender 4.2.3, using Rigify Legacy. The rig does not include facial bones. The model uses a toon shader with an outline.  
     
   This was a personal project, not a commission.  
     
   Thanks for checking out my work\! I’m open to feedback and hope you like it\!  
     
   \[图片省略\]Blaze\_07960×540 71 KB  
     
   \[图片省略\]Blaze\_01960×540 109 KB  
     
   \[图片省略\]Blaze\_02960×540 113 KB  
     
   \[图片省略\]Blaze\_03960×540 152 KB  
     
   \[图片省略\]Blaze\_04960×540 107 KB  
     
   \[图片省略\]Blaze\_06960×540 150 KB  
     
   \[图片省略\]Blaze\_05960×540 119 KB  
     
   \[图片省略\]Blaze\_08960×540 42.5 KB

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 冬天到了 薑母鴨還是羊肉爐？  
     
   冬天要到了  
   發現身邊朋友要不只吃薑母鴨，或是就只吃羊肉爐  
   我是兩個都吃不會特別排斥，各有各的好  
   你們是哪一派的？

2. **发言者 2**（回复第 1 条）：都ㄘ  不挑

3. **发言者 3**（回复第 1 条）：基本上肉都不多,要買一些火鍋料

4. **发言者 4**（回复第 1 条）：麻油雞

5. **发言者 5**（回复第 1 条）：麻油薑母紅燒 雞鴨豬牛羊鹿魚蝦貝類

6. **发言者 6**（回复第 1 条）：都吃阿，麻辣鍋也很好

### 讨论 32

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

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Gyro for accurate 90° turns on a small maze robot: is the MPU6050 still a good choice?  
     
   Hi all. I'm helping a kids' team with a small two-wheel maze robot \(micro:bit-based, but the gyro question is general\). We need repeatable in-place 90° turns, each within ±2°, over a 5-minute run. Side distance sensors will correct the heading while driving, so long-term drift matters less than per-turn accuracy.  
     
   We're considering a branded MPU6050 module \(Joy-IT SEN-MPU6050 or branded IMU based gyro\) rather than a generic GY-521, with:  
     
   a gyro bias calibration at standstill \(about 2 s\) at every power-up  
     
   a one-time scale calibration \(spin 10 full turns against a floor mark and work out a correction factor\)  
     
   Z-rate integration only \(no fusion\)  
     
   Questions:  
     
   With that calibration, is ±2° per 90° turn realistic with an MPU6050? What do you actually see?  
     
   How common are clone or faulty MPU6050 chips on cheap GY-521 boards, and does a branded module really avoid this?  
     
   Would you pick a different 6-axis IMU today \(e.g. ICM-42670, LSM6DSO, BMI160/BMI270\) for this job, and why?  
     
   Any tips on motor vibration, sample rate or filter settings for turn-in-place measurement?  
     
   Thanks\!

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Using guix as the source of a package  
     
   Discuss  
   Hi all great people\!  
     
   How unusual would be to have a package that is packaged using guix and not released as a .deb? I’d like to propose and use a package like that, but I don’t know if it would be accepted as an official package.  
     
   I know guix can create .deb archives, but I’d like to use it as a \(totally fine\) last resort.  
     
   Have a great day\!

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Crossing=unmarked crossing:markings=zebra  
     
   Mamy w Polsce trochę crossing=unmarked crossing:markings=zebra i crossing=unmarked crossing:markings=yes które są kompletnie błędną kombinacją.  
     
   Wygląda na to że czasem jest to zaznaczanie faktu że jest oznakowanie poziome, bez oznakowania pionowego  
     
   Co z tym robimy?  
     
   Uznajemy że crossing= jest bezwartościowym i mylącym tagiem i nawet go nie usiłujemy usuwać czy poprawiać? \(dotychczasowe podejście\)  
     
   Uznajemy że crossing= jest bezwartościowym i mylącym tagiem i go masowo kasujemy wyrzucając dane który w nim są?  
     
   Uznajemy że crossing= jest bezwartościowym i mylącym tagiem i go masowo kasujemy wyrzucając dane który w nim są, jeśli ma konflikt z innymi tagami?  
     
   Wymyślamy nowy tag typu crossing:vertical\_sign=D-16 czy crossing:vertical\_sign=yes czy crossing:vertical\_sign=no?  
     
   Wymyślamy nowy tag typu crossing:vertical\_sign=no i zakładamy że każde crossing=unmarked crossing:markings=zebra/yes to właśnie taki przypadek i migrujemy przez usunięcie błędnych crossing=unmarked i zaznaczenie tego co autor miał na myśli?  
     
   \[图片省略\]screen-2026-11-20-15-11-09716×179 86.5 KB

2. **发言者 2**（引用未收录发言）：\[图片省略\] 某参与者:  
     
   Jakiego głosowania?  
     
       
     
         \[链接隐去\]  
       
     
       
         
     
   Proposal:Highway crossing cleanup - OpenStreetMap Wiki

3. **发言者 3**（引用未收录发言）：\[图片省略\] 发言者 1:  
     
   crossing:signed=D-6  
     
   raczej crossing:signed=PL:D-6

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Torréfaction \#392 : GTA VI, Alfred 6, le bug tueur de SSD chez Nvidia, teasing DDR6 et Anthropic cartonne en bourse  
     
   Article publié sur :			Torréfaction \#392 : GTA VI, Alfred 6, le bug tueur de SSD chez Nvidia, teasing DDR6 et Anthropic cartonne en bourse - 某社区.fr  
     
   Cette semaine : GTA VI, Pool of Madness, Peel, Crest, Alfred 6, DJ Trax – A Moment of Clarity, nouvel épisode des Clairvoyants, Dynamic Duo – Higher than Rap \+ A2O Lite Neon, Infinite Edition \+ XG – DEPENDS, Musk, Nvidia a aussi son bug tueur de SSD, première baisse des prix des SSD début 2027 ?, le JEDEC taunt la DDR6, et Anthropic \(Claude\) fait un carton en bourse...

2. **发言者 2**（回复第 1 条）：Au moment d'aborder le sujet GTA VI, il y a eu 1/2 seconde de blanc - j'ai vraiment cru que pour troller, vous alliez lancer le son "Jean-Pierre Coffe qui râle".

3. **发言者 3**（回复第 1 条）：Je viens de me taper un fou rire de malade. 发言者 1 "ils veulent me tuer mon ssd les encules \!"... et j'étais pas prêt :joy:

4. **发言者 4**（回复第 1 条）：Alors c'est \[某参与者\] qui a decouvert Crest.  
     
   Moi je suis juste allé le pointer du doigt à Caf pour pas qu'il le rate.  
     
   Il l'a raté et c'est moi qui est prit pour lui.

### 讨论 37

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

### 讨论 38

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Visited links are purple

2. **发言者 2**（引用未收录发言）：Really makes it hard to search the same term ob multiple different engines :\(

3. **发言者 3**（引用未收录发言）：A better solution would be for browsers to lie about the color of links to Javascript.

4. **发言者 4**（回复第 3 条）：CSS :visited styles can leak your browsing history in many ways beyond just colour. So yes, JavaScript getComputedStyle\(\) has in fact been lying about links for over 15 years \[链接隐去\]

5. **发言者 3**（回复第 4 条）：My point is that you can keep displaying it in a different color to the user, as long as you don't say so. As far as I can tell, this isn't what's happening today.

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Long tail cast on  
     
   Help please? I am starting to knit a cardigan and want to use the long tailed cast on for a nice clean ribbed edge. I need to cast on 203 stitches. According to the attached photo using \#8 needles and worsted weight yarn My calculations come to a tail of 47 feet. Is this correct? The pattern is Lethe from Berroco and I am doing size 43”.  
     
   \[图片省略\]IMG\_34973180×1167 208 KB

2. **发言者 2**（回复第 1 条）：\[链接隐去\]  
     
   For myself, I find that casting on 10-20 sts then taking out and measuring length of the cast on yarn works best. You can then scale up the measurement to 203sts plus a foot or two extra and come close.  
     
   An alternative for this number of sts is to use two ends from two separate balls of yarn for the cast on.  
     
       
       \[图片省略\]

3. **发言者 1**（回复第 1 条）：What a great idea 发言者 2. That is exactly what I will do. Thank you\!

4. **发言者 3**（回复第 2 条）：For that many stitches I’d deal with an extra end to weave in and use two strands of yarn.  I have added yarn when I ran out of tail yarn before.  I held the too short tail and the new yarn overlapping and worked one cast on stitch with the thumb yarn doubled then dropped the old tail.  It worked and the one double strand stitch didn’t really show.

5. **发言者 4**（回复第 3 条）：You can join the two ends of the two balls together in a slip knot to anchor them together on either the needle or in your hand, sometimes a bit easier to get going. Don’t knit into that slip knot,  just use it as a temporary anchor.

6. **发言者 4**（引用未收录发言）：I really avoid long tail cast on, mostly because it untwists the yarn.  
     
   My mum tried to teach me crochet cast on when I was very little, I didn’t see the point at the time but I’d definitely try it again now.

7. **发言者 5**（回复第 6 条）：I hope you like it\! There are several \(many?\) variations: regular crochet, stretchy crochet, maybe even super stretchy. I’m not sure if all of them are reversible. That’s one feature I like. Long-tail makes me question which side is public and how to knit/purl the next row.

8. **发言者 6**（回复第 2 条）：Wished I had seen this several days ago. Just did long tail cast on for 130 stitches and had to undo it at least 3 times before I got it right. Now I have several different options that should help. Thanks

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Factuio – A factory TUI game written in Rust  
     
   \[链接隐去\]

### 讨论 41

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：先说结论：被封后用美国签证页审核，地区也选美国，秒通过，暂时没有被封。  
     
   时间记录如下：  
   1. 大概在 11 月 13、14 号那会儿的封禁潮中，我一起被封了，是在使用过程中弹出了需要 Portal 的验证。我之前用的节点一直是比较便宜的公共 VPN，大概 80 多块钱半年，一直用的日本节点。  
     
   2. 被封禁以后，我一直在计划是不是买一个纯净的个人独占 IP，去搭建一个稳定的环境再解封。这中间一直没做其他操作，单纯做了 claude 的数据导出，避免拿不回来  
     
   3. 大概等了十来天，直到 11 月 21 号的时候，我有点懒得搞了，就直接继续用之前的 VPN，并且保持日本节点开始申诉。  
     
   4. 申诉过程中，地区选的美国，材料选的是我的美签（具体签证类型是很普通的那种，不展开了）。拍了签证页、拍了人脸以后秒通过，到目前大概过了半个多小时还没有被封。  
     
   后续如果有新的更新的话，我会发上来。

2. **发言者 2**：虽然不知道 ANT 上市之后 某社区 上那张 A/ 利润都来自中国的言论是不是真的，但是我觉得这种别人明确不给你用还钻空子的行为好像一只舔狗……

3. **发言者 3**：10w/1000w 的概率都在 A 社自己的报告中

4. **发言者 4**：现在解封还有封禁都很玄学，我有个朋友天天破机场登录都没事

5. **发言者 5**：啊这，你这是过 portal 验证啊，又不是被 claude suspend 了，这不能叫解封啊

6. **发言者 6**：发言者 2 明明不让上，非要强上了，扔下 20 刀嫖资，这不是舔狗，这是流氓，上到就是赚到。\[链接隐去\]

7. **发言者 7**（回复第 2 条）：\[引用第 2 条\]  
     
   模型差距这一块是客观的，解决不了这个就没别的办法

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：ART can now read Nikon HE compressed Raw files.  
     
   Hi,  
     
   I confirmed that from Ver. 1.26.11, ART can read Nikon HE compressed Raw files.  
     
   \[链接隐去\]

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：A Little Boo  
     
   I made this ghost doll for \[某参与者\]’s daughter as part of the Mystical swap. She’s since been named Lucy and is living her best afterlife.  
     
   \[图片省略\]20261104\_010906960×1280 451 KB  
     
   \[图片省略\]20261104\_0109381920×2560 1.06 MB  
     
   Lucy was made using a vintage linen table runner I picked up at a fleamarket several years ago. It has gorgeous colors and came already embroidered and with the crocheted edges. I made her bow and shoes with felt.  
     
   Process pics:  
     
   \[图片省略\]20261103\_0841211920×2560 1.66 MB  
     
   \[图片省略\]20261103\_2153591920×2560 1.27 MB  
     
   \[图片省略\]20261103\_2156281920×2560 1.32 MB  
     
   \[图片省略\]20261104\_0045221920×2560 1.8 MB

2. **发言者 2**（回复第 1 条）：It’s adorable\!

3. **发言者 3**（回复第 1 条）：What a cute and creative upcycle of vintage linens.

4. **发言者 4**（回复第 1 条）：Aww so cute and I love the upcycling\!

5. **发言者 5**（回复第 1 条）：OMG that is adorable\!\! :heart\_eyes:

6. **发言者 6**（回复第 1 条）：WHAAAAA\!? This is adorable and a genius way to repurpose vintage embroidered linens\! And you’ve made the most of the runner with your placement of the embroidery and her little face. ACK\!  
     
   I have recently gone down a similarly themed road by stamping ghosts onto printed cardstock so they appear to be using non-white sheets and this is really speaking to my whimsy\!

7. **发言者 7**（回复第 1 条）：Love love love\!

8. **发言者 8**（回复第 1 条）：She is just the best\! Those Mary Janes poking out is such a great touch.

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Learning GDScript &amp; the Godot Engine.  
     
   Hello i’m trying to learn Godot. I was just wondering what’s the way you guys used to learn coding. I know a little bit about the logic of coding, but I feel so lost &amp; I’m not sure where to start to ACTUALLY learn. Sorry if this isn’t the right place to ask.

2. **发言者 2**（回复第 1 条）：I recommend starting here:  
     
       
     
         Godot Engine documentation  
       
     
       
         
     
   Your first 2D game  
     
     In this step-by-step tutorial series, you will create your first complete 2D game with Godot. By the end of the series, you will have a simple yet complete game of your own, like the image below. i...

3. **发言者 3**（回复第 1 条）：What do you mean with actually learn?  
     
   I always thought those practice problems with dictionaries or arrays as inventories felt too simple and not useful. But really, they are usually just arrays or dictionaries\! So I would continue practicing the basics if i were you.  
     
   I recommend Godotneers and GDquests coding tutorials.

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：EngineRoom  
     
   That is a illustration in our Web Novel.  
     
   Modeled and Renderd with Blender / Cycles.  
     
   Finishid with Procreate and ClipStudio.Smokes is not 3Dmodel.  
     
   \[图片省略\]CS3\_00\_02\_Image06のコピー1080×1920 2.18 MB  
     
   \[图片省略\]CS3\_00\_03\_02\_resizedのコピー1920×1080 2.05 MB

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[討論\] 有什麼手段可以合法反擊抽菸的人？  
     
   如題  
   我是指在公共場合、開放空間遇到討人厭的二手菸味  
   有什麼方法可以防範或立刻回擊當事人？  
   先不討論直接跟當事人言語規勸的方式  
   畢竟會在開放空間大剌剌抽菸的人想必也懶得理別人的好好規勸  
   他們臉皮都很厚  
   只會覺得我們這些非抽菸的人優越感又開始作祟而已  
   有沒有其他更低風險的非攻擊行為可以直接反制？  
   聽說菸害防制法的主管機關是地方單位的衛生局  
   所以直接報警是沒用的= =  
   鴿子只會回說取締二手菸不在他們業務範圍內  
   但如果警察不能受理  
   那今天菸害防制法罰則再重又有什麼用？  
   又沒人要執法……  
   衛生局假日也沒人值班吧  
   真的要等衛生局來處理  
   都已經是幾天之後的事了  
   是還能取締誰？  
   所以菸害防制法其實是虛法對嗎？  
   實務上要怎麼立即取締呢？有人試過嗎？  
     
   -----  
   Sent from J某社区 on my iPhone

2. **发言者 2**（回复第 1 条）：這問ai比問網友有用多了~

3. **发言者 3**（回复第 1 条）：在他旁邊吹泡泡，看他會不會覺得很

4. **发言者 3**（回复第 1 条）：困擾

5. **发言者 4**（回复第 1 条）：錄影丟煙蒂，用廢棄物清理法檢舉

6. **发言者 5**（回复第 1 条）：如果有小孩的話講一下一般對方會聽

7. **发言者 5**（回复第 1 条）：當然態度自己拿捏好

8. **发言者 6**（回复第 1 条）：遠離就好 不要惹事不值得

9. **发言者 7**（回复第 1 条）：去禁煙的地方啊

10. **发言者 8**（回复第 1 条）：你在旁邊放屁啊

11. **发言者 9**（回复第 1 条）：叫政府不要賣煙

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Re: \[求助\] 沒有共識的解決方案  
     
   這 我又有經驗可以分享了  
     
   我家也有考慮過要養  
     
   不過除了照顧之外 寵物會掉毛 也有異味  
     
   這我們無法接受  
     
   後來想到一個好辦法  
     
   養在我老婆的娘家  
     
   既可以去玩寵物 老人家又有寵物陪伴  
     
   我們三不五時會回去玩寵物  
     
   一舉數得  
     
   且老人蠻閒的 天天打掃也不嫌煩  
     
   選我正解  
     
   \[引用未收录发言\] 各位大大好，最近我家老婆跟小孩想養貓  
   : 我試著陪小孩去一次貓店逗貓抱貓，也試過陪去收容所看貓抱了一下，因為我對氣味毛髮  
     
   : 等各種敏感，加上也沒有喜歡，所以我就一直投反對票。  
   : 但是老婆去看了以後就越陷越深，現在說我不養貓不是真的理由，而是想要控制權。  
   : 這招打下來我不知道怎麼回應，我們也沒養過，我也理解喜歡小動物的心情以及愛貓人士  
     
   : 的各種迷湯，只是老婆明明都知道我連乳液/香水/各種好的不好的味道都敏感，聲音也敏  
     
   : 感，光去看貓試一下就渾身不自在，那我要怎麼辦呢？  
   : 好好跟老婆說了最後換來一句「為什麼是我說了算，為什麼是我在控制這件事」  
   : ===================== 以上請按Ctrl\+y刪除，以下請勿刪除 =======================  
     
   : 是否同意記者抄文：YES/NO  
   : -----  
   : Sent from J某社区 on my iPhone  
     
   ----  
   Sent from Be某社区 on my iPhone 13

2. **发言者 2**（回复第 1 条）：我也滿推薦這方案的，一舉多得

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Safety Bully Anthropic right steward of our enterprise AI  
     
   Chinese Models are arguably more friendly - \[链接隐去\]

<!-- samples:end -->

