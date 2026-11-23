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

读求助帖时，先找出发帖人遇到什么、已经试过什么、还想请人帮他弄清哪件事。来源论坛可能要求填写设备和版本，也可能习惯在开头问好、末尾预先道谢并署名。采集区保留脱敏节选的原貌，写本站稿时再判断哪些细节会影响理解或后续接话。这个判断同样适用于中文来源。

采用时沿用本次操作保存的案例映射；涉及研究补充时，在 `researchMaintenance` 对应条目的 `summary` 记下材料日期、标题和改编方向，不补回原身份或平台。具体研究仍回到相应专题，不在多处复制整段；新鲜公共资讯的观察继续按[执行与发布](../docs/publishing.md#填写当前更新)记录。

## 当日素材

<!-- intake-request:intake-20de1abb1f5e4903898940a1832cedc5 -->
<!-- samples:start -->

采集时间：2026-11-23 11:59:34（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Super integrated……  
     
   The previous thread seems to have disappeared?  
     
   In light of no available SUPERNAIT or in fact any NAIM integrated, alternative options may include your recommendations……  
     
   How about the “new” Accuphase E3000?  
     
   \[图片省略\]image740×721 81.1 KB

2. **发言者 2**（回复第 1 条）：One of their best products many say. But listen to it before payin’

3. **发言者 3**（回复第 2 条）：Sort of quite like it’s retro look.

4. **发言者 4**（回复第 1 条）：Nice looking bit of kit

5. **发言者 5**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   How about the “new” Accuphase  
     
   They are usually very well build.  
     
   A friend had the original E202 from the 70’s, they are now collectors item.  
     
   All those buttons makes it rather the opposite to say a Nait 50.  
     
   Two very different products, directed at two very different clients.  
     
   Bet its expensive, some like the VU metre, it has its charm admitted.  
     
   Not for me TBH.

6. **发言者 1**（回复第 5 条）：This is a thread to discuss no current NAIM Integrated line up offering , as the “other” thread from 发言者 6 has disappeared…….?  
     
   Happy for this to be “merged”…

7. **发言者 6**（回复第 6 条）：I’m cool.

8. **发言者 1**（回复第 7 条）：I can’t find the thread…..?

9. **发言者 6**（回复第 8 条）：Not can I, it was something along the theme of come on Naim this is your backyard but can’t see it on search or on tags.  
     
   Hey Ho, not to worry.

10. **发言者 7**（回复第 1 条）：I don’t know the amp, so I can’t comment on its suitability as a hi-end integrated amp, but if I were in the market for such a thing, I would look at the Sugden range and if one could stretch to it, a Sugden Sapphire I-A4. If not, the A21SE is terrific too.

11. **发言者 1**（回复第 1 条）：Thread introduction edited to follow on from that missing thread…

### 讨论 2

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

### 讨论 3

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

### 讨论 4

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

3. **发言者 3**（回复第 1 条）：If adding the new node makes the line uneven you could as well as 发言者 2 described select the neighbouring nodes of that line and then press L to straighten it again.

4. **发言者 2**（回复第 3 条）：If the new node is the only selected object you can also use L to straighten

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Univ Crashing  
     
   is this knackered in 5.2? tried a file in 5.1.2 and it’s fine, 5.2.3 crashes.

2. **发言者 2**（回复第 1 条）：you might want to download v5.2.4 then test the problem with it.  
     
   you can also contact the provider \[developer\] of univ about this.  
     
   hope this helps, happy :blender\_logo\_64\_png:ing\!

### 讨论 6

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

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：General measurements discussion for GraphWorks visualizer  
     
   Share and discuss your impressions of different measurements in the new GraphWorks visualizer tool, whether you’ve actually listened to the headphones or not \(which is normally taboo on most audiophile forums\).  
     
   I have not listened to most of the headphones in this tool btw. So most of my impressions will be based on the 5128 graphs, and sometimes some virtual listening. So they should be taken with a grain of salt.

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：La Pause Comics 39  
     
   Article publié sur :			La Pause Comics 39 - 某社区.fr  
     
   Comme tous les mois \(ou presque\), si vous êtes abonné à notre Patreon, vous pouvez désormais dévorer une nouvelle Pause Comics, notre podcast mensuel dans lequel Arkeon vous propose sa sélection de BD et comics du mois. En spin-off des Clairvoyants, notre podcast dédié au Marvel Cinematic Universe, La Pause Comics s’attache à traiter de l’actu BD, toutes catégories et…

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Scheduling a Simulated Vertical Farm  
     
   A 3D simulation of a vertical lettuce farm I built at a hackathon. It runs entirely in the browser. Two copies of the same farm run side by side one on fixed schedules, one with a scheduler that times harvests from scan data and plans the lights around real electricity prices. In the simulation, the scheduled farm uses about 20% less electricity per kg of sellable lettuce.source: \[链接隐去\]

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How to use both Dynamic Shadows and Static LightmapGI?  
     
   Godot Version  
   v4.7.2.stable.official \[ed1daf0bf\]  
     
   Question  
   I want to use LightmapGI in my game to optimize the lighting. I also want to have dynamic shadows cast from the player character and the enemies.  
     
   If I set Light3D to Static Baking mode, it only calculates shadows during the baking of the Lightmap, meaning that shadows from dynamic meshes wont be cast ON static geometry during gameplay. If I set Light3D to Dynamic Baking mode, shadows from dynamic objects do get cast, but, AS I UNDERSTAND, Light3D will also calculate shadows from static objects, even if they were backed.  
     
   How can I calculate the shadows for static objects, such as level geometry, only during baking process, while calculating shadows for dynamic entities during runtime? I want optimization of LightmapGI, but i also want player to cast shadow on the ground.

### 讨论 11

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

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：人类以后可以剥削ai吗\( ﾟ∀。\)  
     
   还是说得再雇佣一双操纵ai的手  
     
   现在网约车通过把风险转移给网约车司机榨取利润   规避责任   如果变成无人驾驶的话  还会出现类似网约车司机的生态位吗

2. **发言者 2**：没有token的话ai真的会不干活\( ﾟ∀。\)

3. **发言者 3**：\( ﾟ∀。\)以后估计是全国大算力池了，想剥削剥削啥呢

4. **发言者 4**：其实我有另一个问题，什么都用ai替代，大伙都挣不到钱了，那谁来消费呢\(´ﾟДﾟ\`\)

5. **发言者 5**（回复第 4 条）：\[引用第 4 条\]  
     
   解放生产力之后就开始个人追求了，每个人都没经济压力ﾟ∀ﾟ\)σ

### 讨论 13

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

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：从工作城市往返老家。  
   老婆的表妹，本来只有在节假日买不到票的时候才会蹭车，现在平时周末回去都要蹭车。

2. **发言者 2**：直接和你老婆说就行了

3. **发言者 3**：是需要等很久才能接到人吗，这种亲属关系对我来说蹭车无所谓，但是等久了不行。

4. **发言者 4**：不顺路？还是说时间不重叠？还是说你想自己接其他人的顺风车？这种关系，你如果没原因，那就没办法体面拒绝，你就只能生硬的不回去一两个月，就不蹭了

5. **发言者 5**：是否顺路？是否需要额外时间成本？

6. **发言者 6**：跟你老婆说。  
   你有什么困扰？

7. **发言者 7**：你肯定跟你老婆说过，你老婆估计也会说让她蹭毕竟是表妹，这关系其实很亲了

8. **发言者 8**：加班

9. **发言者 9**：文中没说时间成本的话，我觉得这件事本身应该没那么难接受吧；   
   如果时间成本很高就和你老婆说让你老婆解决

10. **发言者 10**：直接跟你老婆开玩笑，就说，天天这么处着，你也不怕我们俩好上。。。。 就不会有下文了

11. **发言者 11**：发言者 10 你这么说是不嫌事大

### 讨论 15

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

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：2026-11-22 wiki outage \(06:51 to 09:14 UTC\+0\)  
     
   Edit: the site is live again.  
   The wiki has been returning HTTP response code 500 with the following message:  
     
   Sorry\! This site is experiencing technical difficulties.  
   Try waiting a few minutes and refreshing.  
     
   \(Cannot access the database\)  
     
   The issue has been ongoing since UTC 06:51 \(2 hours ago\) \[链接隐去\]  
     
   There is an open ticket regarding the outage on OpenStreetMap Operations Issue Tracker: Wiki is down · Issue \#1445 · openstreetmap/operations · GitHub.

2. **发言者 2**（回复第 1 条）：\(post deleted by author\)

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：My nodebook  
     
   I am trying my hand at nodevember this year, starting with \#18 : “Prism”.  
     
   On the evening of the 21st, after three nights of fighting with refractive indices… it dawned on me : I was trying to make a working pathtracer. No wonder I was struggling. Consider this my hello world  
     
   \[图片省略\]2026.11.18\_prism1922×1080 1.2 MB

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Advanced Charts still not work properly on the IoT Remote App  
     
   Well, it’s a bit frustrating, but apparently the Arduino team just can’t seem to get Advanced Charts to work properly. Or perhaps they simply don’t want to.  
     
   On the bright side, everything works beautifully in a browser \(MacBook, iMac, and even iPad\): All data updates correctly, all curves are displayed in full. That’s really great\!  
     
   Unfortunately, the IoT Remote App is a different story. Sometimes half the legend is missing, along with the corresponding curves. Other times, an Advanced Chart remains completely blank, displaying nothing but the message “No data available.”  
     
   Brilliant in the browser. Broken in the app.

2. **发言者 2**（回复第 1 条）：The app on which platform? Maybe a screenshot could help too

### 讨论 19

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Holy cr\[某参与者\]\! You’re old\! Cake  
     
   Another day another work birthday\!\!  
     
   My boy JT turns 50\! Tomorrow\!\!  
     
   \[图片省略\]IMG\_99342856×2142 499 KB  
     
   I used my big top cupcake silicone pan and then made tinier replicas

2. **发言者 2**（回复第 1 条）：As soon as I saw the thumbnail, I knew this was one of your cakes\! This made me laugh and I’m sure it’ll do the same for the birthday boy\!

3. **发言者 3**（回复第 1 条）：Bahahahaaaaa\! What a great use for that pan\! This is going to be a hit\!

4. **发言者 4**（回复第 1 条）：Another fun &amp; fabulous cake\!

5. **发言者 1**（回复第 1 条）：\[图片省略\]image1086×1448 317 KB  
     
   It was well received\!\!\!

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[VENDU\] Code GTA 6 sur PS5  
     
   Si quelqu'un veut acheter GTA6 sur PS5 en numérique, j'ai oublié d'annuler une de mes précos, donc j'ai une boite en rab, je revends le code au prix d'achat de 60€  au lieu de 80 sur le store \(si vous voulez la boite, y a juste un poster dedans en plus, on pourrait s'arranger en mains propres sur Paris ou en envoi à vos frais\)  
     
   PS : C'est vendu \!

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Where the company's employees launch the tools that Claude created  
     
   Hi everyone,Here is a situation: In a typical company these days, many employees are creating tools using AI \(Claude &amp; Cursor\) to help with their work. They run these tools on their own computers, which no one else can use or on a builder platform with a public URL and either no login or a hand-rolled one the agent wrote.Question: Where do they run this? Who can see it? What happens if an employee leaves the company?

2. **发言者 2**（回复第 1 条）：Good question. The answer is that software is now personal and disposable. If the employee leaves and you do not have access to their personal software utilities you just vibecode your own instead, and you'd actually prefer to do this anyway since you can style your software as you please.

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Dungeons game - 0.0.1  
     
   Good day\!  
     
   My name is Boris Mladenov and i introduce to you DUNGEONS game, i still havent got a real name for it lol but the game is about going throught infinite rooms of like dungeon rooms and its still work in progress there are no traps and i mean nothing, just going throught rooms and a inventory thats kinda useless and im sorry about it. For now my game its version 0.0.1 version so i want you to rate it if it has some potential in it while developement.  
     
   DUNGEONS GAME by Boris Mladenov

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：C\+\+26 is done \(again\)\! — Trip report: November 2026 ISO C\+\+ standards meeting \(Búzios, Brazil\)

2. **发言者 2**（引用未收录发言）：&gt; What is the use case for wanting a default mode where the contract isn’t guaranteed to be enforced?  
     
   isn't the default mode "the end user chooses what behaviour they want from the compile flags they pass"? with e.g.  -fcontract-evaluation-semantic=...

3. **发言者 3**（回复第 1 条）：Búzios is definitely a Tier 1 place to have a conference.

4. **发言者 4**（引用未收录发言）：well you just noticed the biggest problem with c\+\+: it's design-by-committee. there are so many entities - corporates, individuals, organizations, each wanting something different. maybe someone's employer's coding guideline requires contracts to be ignorable by default, and now we all have to pay for it.

5. **发言者 5**（回复第 1 条）：The syntax is unfortunate, but yay\! Guaranteed contracts\!  
     
   I guess I'm going to be writing \`\#define always\_enforce std::contracts::controls::enforced\` in my future C\+\+ projects.  
     
   EDIT: Oh, I should've finished reading lol -- "using namespace std::contracts::controls;" yeah that's good and works.

6. **发言者 5**（引用未收录发言）：I think a plausible reason is that contracts are already being used in the wild in some places and it's important to not break those existing workflows. But I'm just playing devil's advocate. ~~I would've preferred a simpler syntax at least.~~ edit: I didn't finish reading: \`using namespace std::contracts::controls; \[...\] pre\(x &gt; 0\)\` is fine IMO.

7. **发言者 6**（引用未收录发言）：Existing practice in many C\+\+ assertion macros is that the shorter spelling is disabled in release mode, and you need to use a special mode to have them enabled all the time. That's just the culture of C\+\+; the standard feature follows it.

8. **发言者 7**（回复第 1 条）：I find it so strange that we haven’t just all agreed that new versions of C\+\+ are a bad idea and the language should be frozen and exist only to support the large existing codebase.

9. **发言者 1**（回复第 8 条）：That would imply that nothing should be done to aid improvement to the safety and correctness of existing C\+\+.  
     
   Saying "this language is bad and so we should leave the standard bad" is not helpful, it basically means every implementation starts developing different but overlapping fixes and improvements and every project has to work out how to build in a way that uses all of those extensions.

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：哈哈哈哈哈一下冒出来好多弱智酱的串  
     
   \( ﾟ∀。\)

2. **发言者 2**：\( ﾟ∀。\)

3. **发言者 3**：\( ﾟ∀。\)

4. **发言者 4**：\( ﾟ∀。\)

5. **发言者 1**：\( ﾟ∀。\)

6. **发言者 5**：\( ﾟ∀。\)

7. **发言者 6**：\( ﾟ∀。\)

8. **发言者 7**：\( ﾟ∀。\)

9. **发言者 8**：\( ﾟ∀。\)

10. **发言者 9**：\( ﾟ∀。\)

11. **发言者 10**：\( ﾟ∀。\)

### 讨论 25

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：darktable, RapidRAW, LLM-Co-coding and everything else  
     
   Hi all\!  
     
   Since there’s been some discussions about both the pros and cons of LLM co-coding and the user experience \(aka “complexity”\) of darktable, I thought maybe some of you might be interested in a blog post I wrote about these things.  
     
   It’s in German only \(sorry\), but I’m told google translate does a reasonably good job nowadays :wink:  
     
   You can find it here:  
     
       
     
         Schall und Stille – 17 Nov 26  
       
     
       
       \[图片省略\]  
     
   Nerds gegen Agenten  
     
     Wir schreiben das Jahr 2026, und sowohl Apple als auch Microsoft haben es sich tief im Rektum eines größenwahnsinnigen Faschisten bequem gemacht – ebenso wie praktisch jede andere einflussreiche Tech-Firma aus den USA auch.  
     
   Das ist nicht nur für die...  
     
       
     
       
         
         
       
     
       
     
   Kind regards,  
     
   Stephan

2. **发言者 2**（回复第 1 条）：Hey Stephan,  
     
   Thanks for the interesting write-up and the second chance\! Really glad it’s working well for you. As for the website sounding a bit AI, since German is my first language, I rely on translators and AI to phrase things in English :wink:  
     
   Have a nice weekend,  
     
   Timon

3. **发言者 3**（回复第 1 条）：I liked your article\! Refreshing to read some well-written, human, non-corporate German.

4. **发言者 4**（回复第 1 条）：Hello,  
     
   Great article\! Since I don’t speak German, I used AI to translate it :wink:  
     
   Greetings from the Luberon :fr:  
     
   Christian

5. **发言者 5**（回复第 1 条）：A nice blog article. Thanks for sharing it here :wave::blush:

6. **发言者 1**（回复第 1 条）：thank you all :slight\_smile: I’m glad that you enjoyed reading my article.

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How to gradually add vocab to Master\+?  
     
   I apologize as I’m certain this has been discussed before but I can’t find the thread. I really want to start incorporating master\+ for my vocab \(I’ve already done so for grammar\) but I’m worried I will have a deluge of over 1000 reviews if I do so. Is there any way to mark just a few items at a time as master\+ so I can space out the reviews?

### 讨论 27

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：我有两台磊科 N60 Pro ，刷了 OpenWRT 25.12.6 作为纯 AP 用，都开启了 802.11r ，但主流的手机、平板跨 AP 漫游都很慢，几乎要等到其中一个 AP 完全没信号的时候，才会切换到另一个 AP。  
     
   求大佬解答可能原因。  
     
   \[图片省略\]  
     
   详见上图

### 讨论 28

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

### 讨论 29

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：ARD Gaming  
     
   Hallo,  
     
   dieses Format scheint ja bereits einige Zeit zu laufen… um die 5 Jahre, lese ich gerade. Mir wars noch unbekannt und ich hab hier auch keine andere Forenthemen gefunden, die es erwähnen.  
     
   某社区 :  
     
   \[链接隐去\]  
     
       
         \[图片省略\]  
     
         games.ard.de  
       
     
       
         
     
   ARD Gaming  
     
     Das Gaming-Schaufenster der ARD: Spiele mit Sendungsbezug, Streams und Community — fair, zugänglich, für alle.  
     
       
     
       
         
         
       
     
       
     
   Ich finds jedenfalls schön zu sehen, dass es weiterhin lebendige Verbindungen zu den „Öffentlich-Rechtlichen“ gibt. Denn einige bekannte Gesichter aus der Bohnen-Crew sind \(waren bisher\) ja in diesen Shows doch zu sehen ab und zu.

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[CVE-2026-123633 &amp; CVE-2026-123007\] Unauthenticated Remote Code Execution in NGINX  
     
   Discuss  
   Unauthenticated Remote Code Execution in NGINX: CVE-2026-123633 and CVE-2026-123007  
     
   More info here: Unauthenticated Remote Code Execution in NGINX: CVE-2026-123633 and CVE-2026-123007 \| Wiz Blog  
     
   Does it impact Yunohost?

2. **发言者 1**（回复第 1 条）：upgrading nginx to 1.31.9 should work as well, but yunohost wise, can someone confirm.

3. **发言者 1**（引用未收录发言）：Yup seems we are too far out on nginx. :face\_with\_hand\_over\_mouth:

4. **发言者 2**（回复第 1 条）：Short temp fix for yunohost 12:  
     
   sed -i 's/ssl http2/ssl/g' /etc/nginx/conf.d/\*.conf  
   systemctl restart nginx  
     
   For yunohost 13 do this \(maybe an upgrade is enough cause debian security push some fix\):  
     
   sed -i 's/http2 on;/http2 off;/g' /etc/nginx/conf.d/\*.conf  
   systemctl restart nginx

5. **发言者 3**（回复第 1 条）：Thank you for the fix\! What kind of \(bad\) consequences this change might have?

6. **发言者 2**（回复第 1 条）：After this fix, your server use http1 instead of http2, it could be a little slower.

7. **发言者 4**（回复第 1 条）：Hello,  
     
   Will the patch be used to reactivate this change or will it be required manually?

8. **发言者 2**（回复第 1 条）：A new stable \(bookworm\) yunohost released remove http2 until debian backport the fixes.

9. **发言者 2**（回复第 1 条）：Official announcement ☢ \[CVE-2026-123633/123007\] Critical vulnerability in nginx upgrade system package ASAP\!

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Winter's Last Light Snowy Forest Environment ❄️  
     
   Well, winter is coming… and apparently, I decided to bring a whole forest with it. :grin:  
     
   A quiet snowy forest, the last warm sunlight of the day, and enough snow to make you reconsider going outside.  
     
   I wanted to capture that cozy winter twilight atmosphere - warm sunset colors meeting cold blue shadows, with a peaceful forest slowly disappearing into the evening.  
     
   A little about the scene:  
     
   Created in Blender 5.2.2  
     
   Rendered with Cycles  
     
   Procedural snow system built with Geometry Nodes  
     
   Adjustable snow accumulation and density  
     
   4K ground textures  
     
   The entire environment took around 2–3 hours to create.  
     
   And no, you don’t need a shovel to explore this forest. :wink:  
     
   I’d love to hear your thoughts and feedback\!  
     
   Available on CGTrader:  
     
   \[链接隐去\]  
     
   Created by 发言者 1.  
     
   \[图片省略\]Winter Forest 11280×720 1.38 MB  
     
   \[图片省略\]Winter Forest 61280×720 1.66 MB  
     
   \[图片省略\]Winter Forest 71280×720 1.12 MB  
     
   \[图片省略\]Winter Forest 51280×720 1.45 MB

### 讨论 32

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

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Recherche d'un gentil graphiste pour refaire les cinematiques de mon jeu  
     
   Bonjour ici , j'ai un petit jeu que je pense vendre sur Steam et je suis une tanche monumentale en graphisme, pour l'instant mes assets sont générés par le jeu et ça passe plus ou moins,  
     
   par contre les cinématiques sont moches ,  donc je cherche un graphiste qui pourrait me les refaire .Ce sont des cases BD actuellement générées par ce cher Claude , j'en ai une vingtaine actuellement , je pense en avoir une quarantaine d'ici que tout le contenu soit produit. L'idée étant de garder la scène mais de la redessiner en mieux \(ce qui vu la qualité actuelle ne devrait pas étre hyper compliqué\)  
     
   On verra en mp pour les tarifs, devis , prix fixe ou pourcentage sur les revenus du jeu , vu que tout travail mérite salaire.

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Eleria OS – A Debian 13 Based Distro with an HTML Desktop Shell  
     
   Eleria OS is a new, Debian 13 based linux distro that is both lightweight and \(in my opinion\) beautiful. It has been one of the most fun things I've worked on in a long time and I really didn't think it'd go this far.Debian logs in for you and uses the X Display Manager to load a VERY stripped down Chromium, to then load the Eleria OS Login Screen.The HTML Desktop communicates via JavaScript to a special and custom-made bridge which then communicates to Debian 13 Trixie.This allows for the HTML Desktop and File Manager to actually show files on your system or save a screenshot.You may find the website here: eleria.framer.website , or the GitHub here: \[链接隐去\]

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How to create and destroy an object in GD script?  
     
   Godot Version  
   Godot v4.7.2  
     
   Question  
   I’ve recently got started with game development in Godot. I’m currently trying to create bullets when the player left clicks  
     
   Currently I have this to send the in the direction of the mouse position:  
     
   func \_process\(delta\):  
   	if fired == true:  
   		if Input.is\_action\_just\_pressed\("mouse\_left"\):  
   			mouse\_pos = get\_global\_mouse\_position\(\)  
   			angle = get\_angle\_to\(mouse\_pos\)  
   			  
   			\#go to player position  
   			\#un-queue\_free\(\)  
   			  
   			look\_at\(get\_global\_mouse\_position\(\)\)  
   			velocity.x = cos\(angle\)  
   			velocity.y = sin\(angle\)  
     
   			timer.start\(\)  
   			fired = true  
   			print\("Fired"\)  
   	else:  
   		print\("Already fired"\)  
     
   func \_physics\_process\(delta: float\) -&gt; void:  
   	if fired == true:  
   		global\_position \+= velocity \* speed \* delta  
     
   func \_on\_timer\_timeout\(\) -&gt; void:  
   	fired = false  
   	print\(get\_global\_transform\(\)\)  
   	queue\_free\(\)  
     
   EDIT – The code above is in my bullet scene  
     
   However, I’m not sure as to how to get the player position an go to it \(presumably position\), and if you can undo the queue\_free?  
     
   Sorry if this doesn’t make the most sense, I’m new to game development so may be missing something but thanks for your help

2. **发言者 1**（引用未收录发言）：Thanks for your reply, how would I instantiate it? As for the timer, that was an attempt to delete the bullet a short time after it has been fired, though of course I couldn’t get it back once deleted.

3. **发言者 2**（回复第 1 条）：I think the logical approach is to remove the bullet when it collides with something or leaves the screen, rather than based on time. To detect when it leaves the screen, add a VisibleOnScreenNotifier2D and listen for its signal to trigger queue\_free\(\). I believe the tutorial 某参与者 pointed you toward includes an example of this.

4. **发言者 2**（回复第 1 条）：What I would do is give the bullet a variable direction. When you create it, from the player, you do: bullet.direction = global\_position.direction\_to\(get\_global\_mouse\_position\(\)\).normalized\(\)  
     
   Then, in the bullet’s \_physics\_process \(not in \_ready\), you do: global\_position \+= direction \* SPEED \* delta

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：GitHub Actions accepts invalid YAML

2. **发言者 2**（回复第 1 条）：YAML moment. I’m not shocked at all.

3. **发言者 3**（回复第 1 条）：&gt; On GitHub's side, I'm not sure if they have a clean path towards spec conformance here.  
     
   Are you referring to the fact that fixing this parsing issue would break some users' existing workflows? Hopefully they don't go down the path of adding a "quirks mode" to the parser\!

4. **发言者 1**（回复第 3 条）：Yeah, exactly. Historically GitHub has shown great hesitance when it comes to breaking Actions, even when it would make the ecosystem more correct as a whole. I think that's been changing recently \(e.g. with the renewed attention on dangerous triggers like \`pull\_request\_target\`\) however, so who knows\!

5. **发言者 4**（回复第 1 条）：Just stop using all together. It's about time really.

6. **发言者 5**（回复第 5 条）：Are we both talking about the same thing? Because I really should.

7. **发言者 6**（回复第 1 条）：I remember being extremely excited to move CI/CD pipelines to GH, but I think since adopting GH Actions, it has been a consistent, albeit slow, decline in satisfaction. Just so many curious product decisions that leave me scratching my head.

### 讨论 37

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：讨厌上班･ﾟ\( ﾉд\`ﾟ\)  
     
   但是不上班就无法生存

2. **发言者 2**：你有脚嘛？  
     
   如果有的话买几套女装黑丝白丝然后遮住脸怼着自己脚拍，这样你就能在家赚钱了

### 讨论 38

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Zenith script fails  
     
   what must I do to get Syqon Zenith to work?

2. **发言者 2**（回复第 1 条）：Hello, perhaps you can start by explaining what problem you encounter?

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Staff Appreciation Thread  
     
   So, Discourse just updated and a lot of us are noting a ton of bugs and just general complaints about the UI changes. Hopefully the dust will settle in a place we all can agree to once everything is said and done and the team finishes their work.  
     
   Based on the demographics of Japanese learners and the nature of the bug reporting thread, I know a lot of us work in tech, so hopefully we can appreciate how stressful it is when a third-party system you use for your application updates and you have to integrate those updates with your users. So, I wanted to make a post that just calls out our appreciation for the staff working on the forum updates and the staff in general during what is certainly going to be a hard few days. お疲れ様です！

2. **发言者 2**（回复第 1 条）：お疲れ様 we love u 某社区 staff

3. **发言者 3**（回复第 1 条）：Let’s go staff\! お疲れ様員様！

4. **发言者 4**（回复第 1 条）：It sounds like a lot of things were somewhat forced on the staff this week, and they got pretty much all of it working in a single day\!  
     
   I also noticed they were commenting on progress throughout the day and night, so they must have been working around the clock to get everything resolved.  
     
   某社区 team, your dedication is amazing\! It’s one of many reasons why we all love 某社区\!

5. **发言者 1**（回复第 1 条）：This is a special thanks to 发言者 5 also - Idk if you are the main person making the fixes or just the designated post-writer, but your updates have made me feel like real progress is being make this experience much more customized for our community.

6. **发言者 5**（回复第 5 条）：Happy to help out\! Big changes to things that are routine can always be jarring :person\_bowing:.

7. **发言者 6**（回复第 1 条）：I love you all :sparkling\_heart:

8. **发言者 6**（回复第 7 条）：Why is my level number bigger than my pfp :sob: :folded\_hands:

9. **发言者 1**（回复第 8 条）：Try the Modern theme 发言者 5 describes in this thread\!

10. **发言者 5**（回复第 8 条）：I will make this fix today, thanks for reminding me about it\!

11. **发言者 5**（回复第 8 条）：Where exactly is this showing as bigger than your profile pic, and are you on PC or mobile? I just checked a few pages in the old themes and the avatar is significantly bigger than the level badge in all of them.

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\# AI 订阅与账号服务  
     
   \#\# Claude 系列  
     
   \#\#\# 1. KYC 服务  
     
   - Claude 欧美白皮 Personal KYC、Portal KYC  
   - 通过率：99%  
     
   \#\#\# 2. 成品号  
     
   - CC Pro  
   - CC Max 5x  
   - CC Ultra 20x  
     
   \#\#\# 3. 成品号 \+ VPS 环境  
     
   - 海外留学生代开 CC Max 5x  
   - 免 KYC 号  
   - 质保 KYC 及封号退款：以收到银行退款为准，扣除 20% 手续费  
   - \*\*交付方式：AWS VPS \+ Claude CLI 授权\*\*  
     
   \#\# ChatGPT 代充  
     
   \| 套餐 \| 价格 \|  
   \| --- \| ---: \|  
   \| Plus \| ¥115 \|  
   \| Pro 100 刀（5x） \| ¥630 \|  
   \| Pro 200 刀（20x） \| ¥1040 \|  
   \| Pro 500 刀（50x） \| ¥3150 \|  
     
   \#\# Gemini 系列  
     
   - Gemini Ultra 5X：代充值 / 成品  
   - Gemini Ultra 20X：代充值 / 成品  
   - 均可使用反重力，全功能，正规渠道质保订阅  
     
   \#\# Google 系列  
     
   - Gmail 老邮箱  
   - 谷歌疑难杂症解决：首登扫码 / 反重力扫码  
     
   ---  
     
   \*\*绿泡联系方式：\`YzY0MDIwMjY=\`\*\*

### 讨论 41

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

3. **发言者 3**（回复第 1 条）：你這解方真的很妙，如果老人家不反對的話，我給120

4. **发言者 3**（回复第 1 条）：分！（滿分100，多的20分是創意特別加分\! XD）

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：International Space Station. Sightings and pics  
     
   Clear as a bell earlier up here in the tundra with another pass in about an hour. The NASA app is great to locate and be alerted.

2. **发言者 2**（回复第 1 条）：It really is a great sight, even here in London on a clear night. You’ll like this live SEN feed from ISS on 某社区, I quite often have it on in the background while listening to music.  
     
       
       \[图片省略\]

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Hilfe beim Kauf von smarten Heizungsthermostaten  
     
   Moin zusammen, ich möchte den Black Friday mitnehmen und unsere Wohnung mit digitalen/smarten Heizungsthermostaten austatten.  
     
   Ich hab da jetzt nur ein paar Fragen. Wir haben keine zwei Geschosse, was mal zwei Wohnungen waren, jede Etage hat ihre eigene Gastherme. Brauche ich dann zwei Basis Stationen? Quasi für jede Therme eine?\!  
     
   Und wir haben so ein analoges Raumthermostat, was per Funk mit der Therme kommuniziert. Wie genau sagen wir denn der Therme, dass sie in Zukunft dann nicht mehr mit dem alten Raumthermostat kommunizieren soll, sondern mit der neuen Basis Station? Das verstehe ich noch nicht so richtig :smiley: Ich hoffe sehr auf euere Hilfe :smiley:

2. **发言者 2**（回复第 1 条）：Geht es nur um Thermostaten die an die Heizkörper geschraubt werden oder Raumthermostaten und die Ventile sitzen wo anders?

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Textarea, no text formatting nor menu  
     
   What app is this about, and its version: Textarea, 1.0.0~ynh1  
     
   What YunoHost version are you running: 12.1.42  
     
   What type of hardware are you using: VPS bought online  
     
   Describe your issue  
   installed with no warnings or problems, but I can not use markdown nor menu features like qr code etc.  
     
   opened an issue in package repo: no menu icon nor formatting · Issue \#4 · YunoHost-Apps/textarea\_ynh · GitHub  
     
   Share relevant logs or error messages  
   none in browser

2. **发言者 1**（引用未收录发言）：:check\_mark: :clap:  
     
   thanks\!

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Dragon something  
     
   Hi everyone,  
     
   I would like to have your opinion on this one.  
     
   For this one the mesh was divided in small cluster, one per uvtile, to achieve an higher level of subdivision and sculpt the fine details.  
     
   \[图片省略\]20260730\_1449\_Dragon\_Stone1920×1920 2.07 MB  
     
   \[图片省略\]20260730\_1426\_Dragon\_Stone \(4\)1920×1920 1.92 MB  
     
   \[图片省略\]20260730\_1426\_Dragon\_Stone \(3\)1920×1920 837 KB  
     
   \[图片省略\]20260730\_1426\_Dragon\_Stone \(2\)1920×1920 912 KB  
     
   \[图片省略\]20260803\_2018\_Dragon\_Stone1920×1920 1.44 MB  
     
   \[图片省略\]20260730\_1446\_Dragon\_Stone \(1\)1601×890 406 KB  
     
   \[图片省略\]20260730\_1448\_Dragon\_Stone1920×1920 1.83 MB

2. **发言者 2**（回复第 1 条）：I’ve never seen a dragon with such a short neck. Looks interesting, but somehow less intimidating than a usual dragon

3. **发言者 1**（回复第 2 条）：I thought it was coherent with the rocky aspect of the creature. Short and rocky. Maybe is too compact ahahah.

4. **发言者 2**（回复第 3 条）：Oh it does give me some Witcher 3 troll vibes now that you mention that. Kind of like a slower, but harder hitting dragon lol

### 讨论 46

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

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Synology DSM Security Alert  
     
   Synology posted a security alert overnight,  if you’re register with them you should have an e-mail.  
     
   Affected DSM products  
     
   Fixed version  
     
   7.4.1-90080-2  
     
   7.3.2-86009-6  
     
   7.2.2                     \| Ongoing  
     
   7.2.1                     \| Ongoing  
     
   7.1.1                     \| Ongoing  
     
   To check the version your NAS runs, go to Control Panel &gt; Update &amp; Restore.

2. **发言者 2**（回复第 1 条）：Thanks Mike. If my NAS is set to update automatically, will it take care of itself?

3. **发言者 3**（回复第 1 条）：Thanks Mike.  
     
   Didn’t receive any emails but have now updated our four units.

4. **发言者 4**（回复第 1 条）：Thanks Mike - just started the update.  I suspect after all these new vulnerabilities, there will be many firmware updates to come for various stuff over the next couple of weeks

5. **发言者 1**（回复第 4 条）：Yep,  seems cyber hacking is becoming a popular sport these days.  
     
   Fear of it is also becoming an issue.  
     
   Whatever,  reading the Synology www techie stuff re these vulnerables, it seems my old Synology is now officially in the EOL category,    so thinking of a new one.  
     
   Question is,  do I stick with HDD or move to SSD.

6. **发言者 4**（回复第 5 条）：SSD costs make that a big decision. Can you possibly firewall off your old Synology from the internet, plus stop a few of the remote access services?

7. **发言者 1**（回复第 6 条）：I’m not so much worried about no support for running on into the future,  but thinking HDD and NAS age,  it’s all been on 24/7 for 12 years.

8. **发言者 4**（回复第 7 条）：I guess thats’ a good time to consider replacing.  I’m quite sure you have backups though.  I do the normal Hyper backups, then every few weeks do an extra USB copy, on the basis that if you do 2 backups, you will never need either - one of SOD LAW commandments

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Do. \(19.11.\) Adventure Abend  
     
   Moin,  
     
   am Donnerstag Abend ermitteln wieder vier Bohnen in einem Kriminalfall\!  
     
   Teilnehmende: Sam, Johanna, Florentin und Andreas  
     
   Start: 20:00 Uhr  
     
   Spiel: Hidden Games: Königsmord  
     
   Setting: Ein Fest auf einem alten Landsitz der Familie König endet mit einem Mord.  
     
   \[图片省略\]Screenshot 2026-11-16 \[数字标识隐去\]×706 39.9 KB

2. **发言者 2**（回复第 1 条）：Gegenprogramm zu GTA. Bin ja mal gespannt ob dadurch mehr oder weniger einschalten

3. **发言者 3**（回复第 1 条）：Oh die Dinger lieb ich \!\!\!

4. **发言者 4**（回复第 1 条）：Ja geil dann ist der Abend gerettet und ich werde nicht schwach schonmal GTA zu spielen.  
     
   Top Besetzung

5. **发言者 5**（回复第 1 条）：Meeega cool. Ich liebe diese Fallakten, vorallem Hidden Games sind echt stark. Hab auch diese schon selbst gelöst, bin gespannt den Bohnen dabei zuzusehen :blush::nerd\_face:

6. **发言者 6**（回复第 2 条）：Vielleicht wird der Mord in GTA VI ermittelt :kappa:

7. **发言者 7**（回复第 6 条）：Uuuuuh ein Revival von  
     
                 
     
   Nice wäre das.

8. **发言者 6**（回复第 7 条）：Cool, das kannte ich noch gar nicht :beanpoggers:  
     
   Muss ich mal nachholen :beannote:

9. **发言者 8**（回复第 1 条）：Fantastische Besetzung\! Ihr verwöhnt uns\! :beancute:

10. **发言者 9**（回复第 1 条）：Freue mich auf gleich. Das begleitete Rätseln gepaart mit Rollenspiel ist für mich immer ein Hochgenuss.

11. **发言者 10**（回复第 1 条）：Ist das noch RBTV? :beansweat:

<!-- samples:end -->

