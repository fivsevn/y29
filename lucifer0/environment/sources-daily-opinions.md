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

<!-- intake-request:intake-e4e3e60b54434f02b8ef00e9adb7059e -->
<!-- samples:start -->

采集时间：2026-11-15 10:03:28（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 大家都說愛麗絲黃不好看？  
     
   如題，  
   我啊肥肥，早安女版！  
     
   大家都說間諜愛麗絲黃長得不好看，但你們不覺得他的輪廓弄精緻一點很像中國女星李一桐  
   嗎？  
     
   \[链接隐去\]  
   \[图片省略\]  
     
   那我覺得就很好看耶！  
     
   這個時代，醫美發達還是有機會的吧？  
   把皮膚弄好輪廓再去微整，再配上化妝，無敵的吧！  
     
   女版的姐姐美眉們大家怎麼看呢？

2. **发言者 2**（回复第 1 条）：許純美也說自己像王祖賢

3. **发言者 3**（回复第 1 条）：普臉才適合間諜

4. **发言者 4**（回复第 1 条）：笑起來有像 但是沒有白嫩少女感

5. **发言者 5**（回复第 1 条）：我可以

6. **发言者 6**（回复第 1 条）：你眼睛還好咩

7. **发言者 6**（回复第 1 条）：她都49了 應該懶的醫了

8. **发言者 7**（回复第 1 条）：有幾張有點像，但有幾張又差很多，

9. **发言者 7**（回复第 1 条）：可能整過

10. **发言者 8**（回复第 1 条）：長太漂亮當間諜會太高調吧

### 讨论 2

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Alien headphones Naim app  
     
   Just noticed something strange in the Naim app.  
     
   I own a pair of B&amp;O Beoplay H95 headphones, but no Focal headphones whatsoever.  
     
   How have H95 found a way into my Naim system? Appeared out of nowhere. Not added in any way.  
     
   \[图片省略\]33381080×2340 200 KB

2. **发言者 2**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   I own a pair of B&amp;O Beoplay H95 headphones, but no Focal headphones whatsoever.  
     
   How have H95 found a way into my Naim system?  
     
   Because you say you own them? Why mention Focal when they are not listed under “My Devices”?  
     
   I suspect the B&amp;O headphones are compatible, possibly actually made by Focal?

3. **发言者 3**（回复第 1 条）：This is a bug, we’ve found the cause and will get a fix into the next release. Thanks for reporting it 发言者 1

4. **发言者 4**（回复第 1 条）：I was about to say maybe your neighbour has found a cheap way of listening to a Naim system. But it’s just a boring old bug :man\_shrugging:

5. **发言者 1**（回复第 4 条）：Cool I was quite surprised.  
     
   Thx

6. **发言者 2**（回复第 1 条）：It would be nice to be able to group together non-Naim equipment, particularly as Naim no longer make the Muso-QB.  
     
   I’m really unsure what I’d do to replace them when mine eventually die.

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：OV knooppunt Spaarnepoort, Haarlem  
     
   Gistermiddag tot avond naar deze \(via de Bouwapp aangekondigde\) infomarkt geweest.  
     
   Ter visualisatie hier het bewuste gebied op OSM.  
     
   Ik vroeg me af of de OSM-NL OV-specialisten hier alvast wat info over dit knooppunt willen o.a. welke vervoermaatschappijen dit knooppunt aangaan doen of is deze info net nog te vroeg ?  
     
   Wat ik sowieso weet is dat alle bussen die in deze regio van &amp; naar IJmuiden rijden met de komst van dit OV-knooppunt heel anders gaat rijden.  
     
   Bestuurlijk Definitief Ontwerp OV knooppunt: werknaam was Nieuw Zuid is geworden OV-knooppunt Spaarnepoort.  
     
   Bestuurlijk Definitief Ontwerp herinrichtinginfrastructuur Schipholweg, Haarlem.  
     
   Veel info is al middels de 3 jaar terug gestartte projectnote terug te vinden.  
     
   Mocht er meer info behoefte zijn wil ik de info van gistermiddag &amp; avond graag delen.

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

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：FUGLOY FINGERLESS MITTENS - INCREASES  
     
   Hi, just wanted to check that I am thinking correctly: am I right in thinking, that to do my 7 increases every other row, I increase the yo’s. Eg. for round6  
     
   \[图片省略\]IMG\_84471678×1576 537 KB  
     
   , it should be ‘k1, yo, p5, yo, k1’ ..p25

2. **发言者 2**（回复第 1 条）：Yes, that’s it. The increases are every other round. The increases are forming the thumb gusset as the sts between the yarn overs increase by 2sts each time.  
     
   \[链接隐去\]

3. **发言者 1**（回复第 2 条）：Many many thanks\! So grateful

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[Nidimages\] Photo sharing for family and friends  
     
   Nidimages for YunoHost  
   Overview  
   An open-source photo sharing web app to keep your family and friends connected with your adventures and memories. Easy to host: keep your data in your control\!  
     
   \[图片省略\]  
     
   Shipped version: 1.5~ynh1  
     
   Demo: Nidimages - Trains in the wild  
     
   Documentation and resources  
     
   Upstream YunoHost repository: GitHub - YunoHost-Apps/nidimages\_ynh: Package for Nidimages in YunoHost · GitHub  
     
   Presentation blog post: Presenting Nidimages: photo sharing for family and friends  
     
   Upstream app code repository: 发言者 1/nidimages: An open-source photo sharing web app to keep your family and friends connected with your adventures and memories. Easy to host: keep your data in your control\! - 发言者 1's Forge

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Sawpping between DT 5.7 &amp; 5.6.2 appimages...  
     
   Hi all,  
     
   I currently run 5.7 sandboxed and 5.6.2 unboxed. Now I’m wanting to swap the two around, with 5.6.2 sandboxed \(5.7 unboxed\) to they don’t interfere with each other.  
     
   5.7 will, essentially, become my daily driver.  
     
   My question is, are there thing I need to be aware of regarding compatibility between xmp files? Or anything else I need to be aware of?  
     
   I’m just concerned that if I make the switch, I may end up with issues particularly with regard to existing dstyles.  
     
   Alternatively, if someone knows roughly when 5.8 might be released, I might just wait for the update.  
     
   Ant advice would be much appreciated.

2. **发言者 2**（回复第 1 条）：For 5.8 release see milestone: 5.8 Milestone · darktable-org/darktable · GitHub

3. **发言者 1**（回复第 2 条）：Thanks, Much appreciated. I think I’ll want to prioritise 5.7 on my machine before Christmas.  
     
   Cheers.

4. **发言者 3**（回复第 1 条）：Following the usual schedule release might be around December. Since there are multiple bigger projects underway it might slip though.  
     
   At lease for contrast &amp; texture I know of a “breaking change” being in the pipe which will alter existing edits. Also 5.7 XMPs might be incompatible with 5.6.x. So be aware of that.

5. **发言者 4**（回复第 4 条）：With new releases normally projected to solstices, what will normally be the freeze date for new/amended features to master?

6. **发言者 5**（回复第 5 条）：Normal release cycle: Release cycle · darktable-org/darktable Wiki · GitHub

7. **发言者 6**（回复第 1 条）：Editing histories and settings \(that includes history stacks in the database and XMP files, styles and presets in the database\) will be migrated \(histories when you re-open an image, styles and presets I believe when you start the application\). Depending on the modules involved,5.6 may not be able to read XMP, dtstyle and dtpreset files generated by the development version.

8. **发言者 1**（回复第 7 条）：Thanks 发言者 6, much appreciated. I think I’ll back up all my existing files, remove them from my laptop and start my 5.7/5.8 journey with a new slate. I doubt I’ll use 5.6.2 again before the 5.8 update comes through.  
     
   I really love the progress DT makes on each iteration. It just keeps getting better. Special thanks to all involved.

9. **发言者 3**（引用未收录发言）：So multiple darktable installations will get different config dirs?

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Do I own the code I write with the help of AI?  
     
   Hi folks, I wanted to ask this simple question: is the code I write with AI mine to license as I please? I hear from a lot of people that one can’t copyright works made with AI, can someone with knowledge give us a definitive answer on this topic?

2. **发言者 2**（回复第 1 条）：It's currently unknown and will be case by case. The advice is to keep licensing as you normally would.

3. **发言者 3**（回复第 1 条）：You should ask your service provider and rank the response after the beep

4. **发言者 4**（回复第 1 条）：&gt; the code I write with AIEvery line of code produced for you by AI is not copyrightable. You do not own the copyright, and the way the law works you are not the author. You can use it, but you do not own it.

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Silent Night ornament  
     
   This was a make-and-take at Pinners Conference. I went with my Mom and Sister in law- we all made the same one. I think they are beautiful\!  
     
   \[图片省略\]IMG\_70241815×2441 1.6 MB  
     
   It’s hard to tell but the blue background is very glittery and looks like all the starts are out… so pretty\!

2. **发言者 2**（回复第 1 条）：It looks really good\!\! I hadn’t heard of Pinners Conference before but it looks like it’s so much fun. And extra fun when you can share the experience with your family.

3. **发言者 1**（回复第 1 条）：We had so much fun that we intend to do it annually\!\!

4. **发言者 3**（回复第 1 条）：Lovely ornament\!

5. **发言者 4**（回复第 1 条）：I love the sparkly background\! It definitely gives the starry effect.

6. **发言者 5**（回复第 1 条）：This is gorgeous\!  
     
   I meant to check out that conference when you mentioned it earlier this year and promptly forgot\!  
     
   Hopefully next fall…..

7. **发言者 1**（回复第 1 条）：Thank you, friends\!

8. **发言者 6**（回复第 1 条）：That’s the perfect use for that sparkly blue material\!

9. **发言者 1**（回复第 1 条）：Thank you\!

10. **发言者 7**（回复第 1 条）：Oh that’s pretty\! I need to start making Christmas crafts.

11. **发言者 1**（回复第 1 条）：Thank you\!  
     
   I’m already a bit overwhelmed with all the crafting in my list…. :exploding\_head:

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：具体配置：  
     
   CPU: Intel® Xeon E5-2680 v4 \(14 Cores 28 Threads\)  
   Memory: 128GB ECC DDR4  
   Storage: 2x480GB Datacenter SSD  
   Network: 1Gbps, 3x IPv4, 15TB/month  
   IPMI included  
     
   价格 $60/m

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[公告\] 十一月份置底檢舉區  
     
   此篇十一月份置底檢舉區  
     
   請各位板友附上欲檢舉文章之  
     
   1.【文章代碼】  
   2.【被檢舉人的ID】  
   3.【違反板規編號】  
   4.【違規行為描述】  
     
   若不知道怎麼查詢文章代碼  
     
   請於欲檢舉文章的頁面按大寫Q  
     
   於置底檢舉區發表非檢舉推文者  
     
   板主得逕行刪除  
     
   另外：  
     
   1.如無特殊情形，不另行推文與發文說明  
   2.若無被禁言，請善用檢舉區  
     
   感謝大家\!\!

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：MegaUI — 发言者 1 Complete Game UI Kit \(Unity, SVG &amp; PNG\)  
     
   :puzzle\_piece: A complete game UI kit for developers who want polished interfaces faster.  
     
   I built MegaUI, a game UI design system for menus, HUDs, inventories, settings, and full game interfaces.  
     
   What is included:  
     
   2,672 SVG assets  
     
   4 PNG sets  
     
   84 4K game screens  
     
   244 icons  
     
   Unity package  
     
   HTML/CSS gallery  
     
   Design tokens  
     
   4 themes  
     
   It is designed to save time on the UI side of game development, whether you are building a Unity game, a web game, or a prototype.  
     
   See it here:  
     
   LINK :slight\_smile:  
     
   \[链接隐去\]

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：高中时候班级里面有很多苍蝇，我的前桌当时打死了一只苍蝇，苍蝇的尸体掉在地上，我一开始没有在意，过了一会低头发现有两只苍蝇在搬运那只苍蝇的尸体，一堆苍蝇一抖一抖的向我挪过来，实在是太掉san了。  
     
   我想用脚踢一踢赶走他们，脚都快踩上了，但只有一只苍蝇飞走了，还有另一只苍蝇锲而不舍的搬运着那只苍蝇的尸体  
     
   为什么会这样呢，同伴的尸体甚至比自己的生命都重要吗，明明平时那么难打死的，一阵风吹过就会警惕到立刻飞走的苍蝇，但在搬运同伴的尸体的时候却像一位坚毅的勇士寸步不离，小肥当时大受震撼

2. **发言者 2**：还好我没有苍蝇的尸体重要ᕕ\( ᐛ \)ᕗ

3. **发言者 3**：昆虫搬运同类尸体是很常见的现象，一般认为是为了防止招来天敌或滋生病菌

4. **发言者 1**：奥对我在高中的时候已经目睹了很多次苍蝇在我的桌子上交配，恶心死我了，想拍死它又怕它死在我桌子上。  
     
   有一次差点拍到了，我手已经感受到了两只苍蝇的触感了，但小肥心软了，立刻把手收了回来，两个苍蝇还叠在一起，对于苍蝇性欲已经超过求生欲了吗\( ´\_ゝ\`\)

5. **发言者 4**：是吃同伴的尸体吧\( ﾟ∀。\)

6. **发言者 5**：朋友，好吃

7. **发言者 6**：打爆某种苍蝇后会爆兵\( ﾟπ。\)  
     
   满地蛆

8. **发言者 7**（回复第 7 条）：\[引用第 7 条\]  
     
   我到死都忘不了我一个朋友一脸贱兮兮的伸出手给我看他手里捏爆了的苍蝇和苍蝇肚子里的一大团蠕动的蛆

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Speaker cable  
     
   Time to replace 20 year old naim cable. After a lot of digging am thinking Turrelium q silver iii.    Thoughts &amp; comments appreciated.

2. **发言者 2**（回复第 1 条）：Nothing wrong with 20 - year old NACA5. In fact, it should now be just about run in\! Just cut off the ends and have it re-soldered to new Naim SA8s - job done.  Use the money you saved to buy more music.

3. **发言者 3**（回复第 2 条）：Seconded.

4. **发言者 4**（回复第 2 条）：\[图片省略\] 发言者 2:  
     
   In fact, it should now be just about run in\!  
     
   It’s funny because it’s true.

5. **发言者 5**（回复第 1 条）：Third vote for cut/re-terminate.

6. **发言者 6**（回复第 1 条）：Follow Richard’s advice, there is no need to buy a new cable.  
     
   :slightly\_smiling\_face:

7. **发言者 7**（回复第 1 条）：I have no idea how old my NACA 5 is. It does have the latest plugs now; I can’t remember when these were put on.

8. **发言者 8**（回复第 1 条）：Looks like you can start enjoying your system now that the Naca are run in after 20 years :rofl:

9. **发言者 9**（回复第 1 条）：For that matter my 40 yr old NACA4 still works great. It’s what I use for my Atom and Dynaudio Audience 52SE speakers. It came with my CB 42.5/HC/140 originally.  
     
   I still use my NACA5 7m pair on my main system. This weekend I have a Boulder 866 integrated amp in the house on loan. I plan to use my NACA5 with those, but I have to change the amp ends from banana to spade connectors.

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Berner Löchligut-Quartier erhält städtische Postleitzahl 3014  
     
   Ab 2027 wird in der Gemeinde Bern Postleitzahl 3048 zu 3014  
     
   Links:  
     
   \[链接隐去\]  
     
   Stadtplan - map.bern.ch  
     
   Löchligut – Wikipedia  
     
   Löchligut - Wikidata  
     
   Category:Bern-Löchligut - Wikimedia Commons

2. **发言者 2**（回复第 1 条）：Die offene Frage ist die vollständige PLZ 3014-00 sprich 3014 Bern oder sonst eine Variante?

3. **发言者 3**（引用未收录发言）：Will das ein Berner machen oder soll ich nochmal?  
     
   Ich hab das “in den Medien” gesehen, und hab gedacht, da sollte mensch mal nachfragen.  
     
   Wenn du magst/kannst, fänd‘ ich das super. Einpflegen in ELI und JOSM-Liste mache ich dann gerne.

4. **发言者 1**（回复第 2 条）：Gehe von 3014 Bern aus. Aber wenn du schon wegen der Lizenz nachfragst… :slight\_smile:  
     
   Jedenfalls danke zum voraus für deine Arbyte.

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：The value of 某社区 for a non-beginner  
     
   Title is quite weird but bear with me: I’ve been studying japanese for quite a bit, and while I’ve had ebbs and flows and some really bad years, I’ve started again and have been able to rekindle old habits.  
     
   As a baseline, I usually study grammar via immersion and then writing down notes and checking them again \+ I have a teacher I have classes with every week so I also get grammar \(and general\) lessons from her.  
     
   So I guess my question is if 某社区’s SRS system would still be helpful, or if  my current method of mostly immersion might be better. I know its silly to ask this on the 某社区 forums since it’ll be mostly people who are biased towards 某社区, but I feel like hearing everyone’s experiences would help me in my decision  
     
   Also yes I’m trying out the 30 day trial :\] refreshing some n5 stuff I still mess up, but I already got to lv 28 from mastering a buncha cards lol i feel like I’m cheating

2. **发言者 2**（回复第 1 条）：I started 某社区 at N3 and find it very useful. I think you can’t adequately reinforce/learn vocabulary from immersion alone. As for grammar, I think it’s also a useful reinforcement.

3. **发言者 2**（引用未收录发言）：\[图片省略\] 发言者 3:  
     
   I see above that someone feels like vocabulary can’t be reinforced from immersion alone.  
     
   I did say adequately reinforced :stuck\_out\_tongue: like somethings will be reinforced, others wont, and you’ll miss out on things that dont appear frequently enough in the media you consume imo

4. **发言者 3**（回复第 3 条）：I still don’t agree. In fact, it’s the complete opposite. SRS queues give me a light reinforcement but it’s never adequate. It takes me reading words over and over across different examples to ever reach the level I consider “adequate”, as in, I understand the feeling this word will convey. All these words I am using right now weren’t bestowed to me through Anki or a similar interface

5. **发言者 2**（引用未收录发言）：\[图片省略\] 发言者 1:  
     
   People squabble over frequency decks but tbh sticking with one regardless of flaws and nitpicks will propel you to be able to i\+1 a lot of stuff out here.  
     
   Agreed\! Consistency is def the most important factor

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Kit Couture, Fugloy Fingerless Mittens  
     
   Just wanted to check I am doing correctly.  
     
   Working the thumb, even though the chart is 12 rows, and pattern tells me I am working for 14 rounds, 2 more than is shown.  In addition to the first round that requires a KYOK?  
     
   \[图片省略\]IMG\_84371920×730 301 KB  
     
   \[图片省略\]IMG\_84391920×2560 1010 KB

2. **发言者 2**（回复第 1 条）：Yes, the pattern stitch is worked by KYOK so include that as you work row 1 of the repeat. Then continue with the chart’s row 2  
     
   \[链接隐去\]

3. **发言者 1**（回复第 2 条）：Great. And then just continue?. The instructions talk about going beyond Row 12 - begin chart again I guess?

4. **发言者 2**（回复第 3 条）：Yes, until there are other directions, continue the chart. The photos in Ravelry show the pattern extending beyond the thumb and up to the ribbing at the fingers.

5. **发言者 1**（回复第 4 条）：Thank you. I guess first time doing, difficult to imagine. I understand, thanks to you\!

6. **发言者 2**（回复第 5 条）：First time is often a bit puzzling but you’re on your way now. If another question comes up, don’t hesitate to ask. And of course we love to see your finished project\!

7. **发言者 1**（回复第 6 条）：Well thank you. I appreciate your advice. Often it is for validation, like asking a good friend to check it out\!

8. **发言者 2**（回复第 7 条）：Absolutely. We’re always happy to take a look. Have fun with these very pretty mitts.

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：DD Photos tutorial and ProductHunt launch  
     
   DD Photos has been introduced here at 某社区 before.  It is an open-source static site generator for photo albums.  It has a companion desktop app \(Mac/Linux/Windows\) that makes it easy to build and configure your site.  
     
   Two updates:  
     
   We are doing a ProductHunt launch starting today to build awareness - \[链接隐去\] - and would appreciate any up-votes you are willing to give.  
     
   We also have a new 某社区 tutorial which shows the features of the site and how to use the DD Photos App.  
     
   Thanks,  
     
   Doug

### 讨论 19

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Do you still need to know whats going on in the code?  
     
   Hi, do you guys think its still important to know whta's going in the code written by AI when its working and manual testing looks good too.However, the code generated by AI looks obfuscated/minified and need a rewrite if you wana understand.

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Crocheted Valkyrie Baby Beanie and Rattle Set  
     
   I saw a post in my neighborhood FB group about someone wanting a baby beanie and rattle set made  as custom order for multiple sets. She provided an AI generated photo for what she had in mind. I have 6 sets she ordered and needs to be finished by Dec 25. I am on the third set at the moment.  
     
   This is what I ended up making. The rattle was free hand and the beanie I found a free pattern and the wings were also a free pattern.  
     
   \[图片省略\]10000214981542×2047 387 KB  
     
   I uploaded the photo of my finished set and chatgpt came up with this:  
     
   \[图片省略\]10000214991088×1445 381 KB  
     
   Progress photo  
     
   \[图片省略\]10000215091920×2550 691 KB  
     
   Original photo from the customer  
     
   \[图片省略\]1000021510720×524 89.7 KB

2. **发言者 2**（回复第 1 条）：You really turned her “dream” into reality\!

3. **发言者 1**（回复第 2 条）：She was so excited\! She is in military service and their group are know as the Valkyries and 6 families are having babies soon. The first due this month. She already has the first set with her for the first baby’s arrival.

4. **发言者 3**（回复第 1 条）：So awesome\!

5. **发言者 4**（回复第 1 条）：You are so great at taking an idea and running with it. What a fun and gorgeous set. I love it even more with the background info on what inspired the customer’s request\!

6. **发言者 1**（回复第 5 条）：Me too\! I love the back story to the request. When I created Roger and I had to figure out the differences with that character vs. Luffy, it gave me the confidence to do this request. This was easy compared to what I had to do make Roger\! With all the AI generated crocheted projects there, it’s tough to find patterns since it didn’t originate from someone who actually made it.

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Mi \(18.11.\) GTA 6- Releaseabend: Wir wollen eure Bingo-Vorschläge  
     
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

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：BLG 3:1 拿下 S16 冠军，LPL 时隔五年再捧杯。B 站当场宣布：给所有人送大会员！  
     
   · 时间：11 月 15 日 12:00 — 11 月 16 日 12:00，限时 24 小时  
     
   · 领法：打开 B 站，搜索「大会员」，点领取，站内直接到账  
     
   领完可以顺手在「订阅精灵」小程序里记了一笔：免费领的会员也有有效期，设个到期提醒。  
     
   \[链接隐去\]  
     
   \[链接隐去\]

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Perses

2. **发言者 1**（回复第 1 条）：Looks like a solid alternative to Grafana, though I haven't tried it yet.   
     
   Tooling looks solid already which is my biggest gripe with Grafana \(they redo their \*as-code CLIs frequently\).

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[公告\] 十一月份置底閒聊區  
     
   此篇為十一月份置底閒聊區  
     
   歡迎大家聊天  
     
   請遵守聊天禮儀  
     
   勿使用敏感字詞  
     
   反串仍需拿捏份際  
     
   感謝大家\!！

2. **发言者 2**（回复第 1 条）：首推 ^\_^

3. **发言者 3**（回复第 1 条）：\[链接隐去\] 拘役50日緩刑3年的反串~~~

4. **发言者 4**（回复第 1 条）：肩推

5. **发言者 5**（回复第 1 条）：老黄屁眼起火推

6. **发言者 6**（回复第 1 条）：老黃被排泄掉了

7. **发言者 7**（回复第 1 条）：還是很感謝老黃的 唉唉

8. **发言者 5**（回复第 1 条）：希望NV接著不要被華爾街那幫雜碎搞垮就好

9. **发言者 5**（回复第 1 条）：CUDA也是老黄的堅持才有今天

### 讨论 25

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Incorrect asset file name is being exported with glTF from Blender to Godot?  
     
   Godot Version  
   4.7.2  
     
   Question  
   When I export a glTF from Blender to Godot I find one of the exported baked textures files has an old name that was discarded and now not used in any of the resources included in the Blender file?  
     
   I have quit both apps, looked through all data including orphan data in the .blend file, and re-exported the glTF. When I open Godot one of the newly imported assets shows a name not in the Blender file anymore. It’s easy enough to change the file name but if I re-export or re-import the glTF again one of the file resources has the old name.  
     
   Is this a bug in the glTF exporter for Blender 4.5? I will try it again in Blender 5.2 on another machine.  
     
   Thanks

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：什么都不说，只放一张图在这  
     
   \(　д \) ﾟ ﾟ

2. **发言者 1**：🎸  
     
   \#/我/在/网/上/到/底/看了些什么\#   
     
   http🎸://🎸t.c🎸n/A🎸XY🎸r4🎸0t🎸8

3. **发言者 1**（回复第 2 条）：\[引用第 2 条\]  
     
   为啥链接发不了呀  
     
   到底哪里有非法词语\(´ﾟДﾟ\`\)

4. **发言者 2**：他的内裤是闪闪发光的金色诶\( ﾟ∀。\)

5. **发言者 3**：搬屎就算了，还发粪坑链接

6. **发言者 4**（回复第 5 条）：\[引用第 5 条\]  
     
   这也算屎？你对屎的定义有点太广了吧

7. **发言者 5**：他身上有效果器耶\(´ﾟДﾟ\`\)

8. **发言者 1**：想到之前哪个串肥哥说乳头割下来它会自己长回去的\(´ﾟДﾟ\`\)

9. **发言者 6**：道理我都懂，但是他为什么有5个奇酷比

10. **发言者 5**：“我的奇酷比也会阴晴圆缺，那么我是月亮吗”

11. **发言者 7**（回复第 10 条）：\[引用第 10 条\]  
     
   我求你了

### 讨论 27

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 抓蝴蝶  
     
   \[链接隐去\]  
     
   阿嬤抓到兩隻笨蝴蝶！

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：The right speakers  
     
   I have the PMC Prodigy 5 speakers which I used with my SuperNait 3/ND5 XS2 combo.  
     
   I now have the NSC 222 and NC250 amp. I am wondering whether I would achieve much by spending up to £4k on new speakers? I can go down to my local hifi shop and try some out, but will I be wasting my time?  
     
   BTW, I like a bright sound.  
     
   Thanks

2. **发言者 2**（回复第 1 条）：I’d say the tx5 would be more sideways with that level of amplification. Look at the focal range Aria Evo or the Proac Response, both will give the brighter sound you like.

3. **发言者 3**（回复第 2 条）：The TX9 is a step change up from the Prodigy 5. Incomparable. I have both.  
     
   OP may also consider TX25 and/or TX55  
     
   I’m a huge fan of ALCHRIS and he has a cult following for a reason…..

4. **发言者 2**（回复第 3 条）：Yes, I can see that and am thinking of the tx9 myself. I just think the nc amp kit mentioned is a cut above them though.

5. **发言者 4**（回复第 1 条）：Good afternoon and welcome,  
     
   No you won’t be wasting your time because, notwithstanding any sage advice you’ll receive on here, speakers are a very personal thing and you won’t know with any certainty until you’ve tried for yourself.  
     
   Best regards,  
     
   Lindsay

6. **发言者 5**（回复第 1 条）：If you like your existing PMCs, maybe the Prophecy 5 would be worth a listen?

7. **发言者 3**（回复第 4 条）：Please don’t be fooled by AlChris pricing structure.

8. **发言者 2**（回复第 7 条）：Fair comment. I haven’t yet heard them.

9. **发言者 3**（回复第 8 条）：I own them and have demod the signature range as well as owning the OPs PMC P5.  
     
   Hence my “educated” suggestion. If he likes the PMC P5, he will love the TX9

10. **发言者 2**（回复第 9 条）：I was thinking between the tx9 or going to the stand mount tx 25 to improve the midrange but I’ll stop here so as not to take over this thread. It is a future move for me dependent on a new smaller home that won’t accommodate the physica size of my Spendor D9,2’s.

11. **发言者 3**（回复第 10 条）：Ive also suggested the TX25 if funding \(within OPs budget\) and room is suitable :ok\_hand:t2:

### 讨论 29

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

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Why isn't the Solid protocol more popular?  
     
   Reading about decentralised protocols, I found Solid from Tim Berners-Lee: \[链接隐去\] can control your data and grant selective access to certain Solid apps. You could pay a monthly fee to store your data or your ISP could offer some GB of storage for free with your telecom package.So my question is: why it isn't popular or why did it flop?

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Sashiko coaster set take 2  
     
   I’m learning\! I think this coaster set came out better than the first one.  
     
   \[图片省略\]10000127381920×1618 1.02 MB  
     
   These are backed with black linen. No top stitch, but hand sewn closure after the turn.  
     
   Now, if only I had any need for coasters.

2. **发言者 2**（回复第 1 条）：You had fun making these\!  
     
   Thank you for sharing  
     
   They’re lovely  
     
   I see a small white statue sitting on one  
     
   What’s the name for a pocket of scent in your dresser?  
     
   well done you

3. **发言者 1**（回复第 2 条）：Thanks\! They were really fun. I imagine they’ll go to someone as a holiday gift.

4. **发言者 3**（回复第 2 条）：Oh, maybe a drawer sachet?  
     
   That’s a cool idea\!  
     
   And 发言者 1, your stitching is lovely\!

5. **发言者 4**（回复第 1 条）：ooh, yes, these are even better than the last set\! :grin:

6. **发言者 5**（回复第 1 条）：So nice. I love the patterns. You have a great gift there for someone.

7. **发言者 6**（回复第 1 条）：Really nice\! I don’t think you have to have a use for everything. You could clip them all together and make sort of a stitchbook for reference on future projects. And, you practiced and learned a nice skill. Well done. Hope you make other things with your lovely stitching\!

8. **发言者 1**（回复第 7 条）：Thanks, they were fun. My ongoing challenge is what to do with stuff I make to get it gone from my house. :laughing:

9. **发言者 7**（回复第 1 条）：So pretty\! Envious of how you got those stitches so even\!

10. **发言者 1**（回复第 9 条）：I make a grid first with one of those heat-erase pens. Otherwise I wouldn’t have a hope\!

11. **发言者 7**（回复第 10 条）：Hey, if it works, it works\! I would do the same thing.

### 讨论 32

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Neues Hauke PnP Mittelalter  
     
   Hallo zusammen ich hoffe es gibt nicht schon bereits ein Beitrag dazu.  
     
   Trotzdem wollte ich es teilen für alle, bei denen es noch nicht auf der 某社区 Startseite aufgetaucht ist\!\!

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：这两天刷 X 的时间线，感觉老黄这些年真没白干。  
     
   各种人都有人替他说话。从程序员、游戏玩家到创业者，连平时不关注芯片的人，也在声援他。这场面确实少见。  
     
   从当年坚持投入 CUDA ，到今天的 AI 热潮，几十年的眼光和坚持，大家都看在眼里。  
     
   公司做到全球顶尖，已经很难。遇到争议时，还能有这么多不同背景的人主动站出来支持，这份认可，比市值更让人感慨。  
     
   感觉老黄可以回归：钮祜禄·黄仁勋

2. **发言者 2**：最后一句啥意思

### 讨论 34

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

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Introducing myself — 发言者 1 from Blanco, TX  
     
   Hello everyone,  
     
   I'm 发言者 1 from Blanco, TX. I work in construction estimating and quantity takeoff, preparing estimates from project drawings for homeowners, builders and contractors across the US.  
     
   I'm new to the Arduino community and keen to learn from the forum. Glad to be here\!  
     
   Sean

2. **发言者 2**（回复第 1 条）：Welcome and have fun with Arduino\!

3. **发言者 3**（回复第 1 条）：Welcome\!  
     
   Relax, grab your favorite beverage and go through the archives, there is a lot there.

4. **发言者 4**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   I'm new to the Arduino community  
     
   Show the picture of your Arduino UNO R3 hardware.

5. **发言者 2**（回复第 4 条）：发言者 4  Does Sean indicate that he is using a Uno R3? I don't read that anywhere...

6. **发言者 4**（回复第 5 条）：Someone is joining the Arduino Community; so, he has to come at least with an Arduino UNO R3.

7. **发言者 5**（回复第 6 条）：\[图片省略\] 发言者 4:  
     
   he has to come at least with an Arduino UNO R3.  
     
   No, there may still be time to avoid that all-too-common beginner mistake.  
     
   I've never owned one :grinning\_face:

8. **发言者 6**（回复第 1 条）：Welcome\! With your just-created domain name and an Arduino you must be planning some interesting projects\! I'm interested in how economical and responsive your Lithuanian-hosted web site is if you want to talk about that. I'm looking for an inexpensive hosting company.

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Let Me Let You Own Your Data

2. **发言者 2**（回复第 1 条）：There was WebSQL Database, but Mozilla and Microsoft conspired to kill it and replace it with the far, far inferior IndexedDB back when they still had some relevance to web standards. But in any case an in-browser database is not something durable enough \(e.g. proper backups\) to rely on for users' critical data.

3. **发言者 3**（引用未收录发言）：Offhand I know that Azure blob storage happens to include an API for block IO \(i.e. like a SAN or like EBS\) and some other primitives you could use for a VFS but I can't remember what they all are  
     
   but S3 only does immutabl-ish object storage, by which I mean you can overwrite an object but iirc you have to overwrite the entire thing; last I checked you can't just overwrite part of an object in S3

4. **发言者 4**（回复第 1 条）：Related: \[链接隐去\]

5. **发言者 5**（回复第 1 条）：One option that's worth considering here is GitHub. Private repos are free, and you can OAuth with a user's GitHub account and store data directly in their own repo.  
     
   The downside is that most non-technical users don't know what "GitHub" is and sending them through that signup is weird.  
     
   If your users are likely to have GitHub accounts already it could make an excellent backend for storing data.

6. **发言者 6**（回复第 1 条）：I feel like there's a contradiction in requirements here. Either the user lets us hold their data \(i.e. we throw it all in a DB\), or they hold it on their device \(and lose cross device sync\), or they tell you how to get it \(and log in/provide keys for some other provider\).  
     
   I bet it could be done with cryptography somehow, but that has its own issues.

7. **发言者 7**（回复第 1 条）：Couldn't you store the user's data as an encrypted blob in some public place?  
   Queries like sqlite/duckdb can run locally on the browser.  
     
   Cross device sync is a QR or a way to share the private key \(\+password optinally?\)

8. **发言者 8**（回复第 1 条）：Not advocating for it \(never used it\) but a user being able to "have" their own data is party of Tim Berners-Lee's Solid project.   
     
   \[链接隐去\]  
     
   I've always meant to spend some time looking into it.

9. **发言者 9**（回复第 2 条）：My understanding is that WebSQL was killed because the spec was just "whatever SQLite does", so it was hard to have it be a web standard.

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

1. **发言者 1**：Re: \[閒聊\] 板上先生怎麼熬過太太更年期？  
     
   \[引用未收录发言\]  
   : 我太太更年期這段時間  
   : 脾氣暴躁異常  
   : 像是不定時炸彈  
   : 會在開心的氣氛中突然暴怒  
   : 讓身邊的人既錯愕又無奈  
   : 她每天回家都會莫名發怒五到十分鐘  
   : 才會冷靜下來好好談事情  
   : 基本上跟她談過但完全沒用  
   : 摔東西冷眼嘲諷已經是家常便飯  
   : 家裏女兒也受不了自己媽媽的火爆脾氣還有嘴巴  
   : 我們除了安靜不說話等時間過去這招  
   : 也不知道該怎麼辦  
   : 一般女性更年期要多久時間？  
   : 板上先生你們是如何熬過這段時期？  
   : 現在每天回家都會無奈待會面對的是冷暴力  
   : 已經好幾次我直接在社區大廳等候她冷靜  
   : 好像也只能這樣了、很無奈。  
     
   我老婆之前也是這樣......我也陪她去看更年期婦產科門診，  
     
   但是她不願意配合吃女性荷爾蒙，然後我建議她換用大豆異黃酮加蜂王乳，配合看中醫調  
     
   理加上早上陪她一起運動，這樣她比較願意．  
     
   家務方面幾乎80%我在做，  
     
   之後就有改善了，供參考．

2. **发言者 2**（回复第 1 条）：男人也有更年期

3. **发言者 3**（回复第 1 条）：只有一個性別算人

4. **发言者 4**（回复第 1 条）：男人的更年期男人自己不關心，女人不在乎，因為女人

5. **发言者 4**（回复第 1 条）：比較在乎自己

6. **发言者 5**（回复第 1 条）：不是每個人都適合吃女性荷爾蒙

7. **发言者 6**（回复第 1 条）：二樓太粗暴了

8. **发言者 7**（回复第 1 条）：男人沒時間管自己的更年期，錢難賺，子細漢

9. **发言者 8**（回复第 1 条）：板上先生是誰?

10. **发言者 9**（回复第 1 条）：日本人

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Christmas is just around the corner .why not whip up a "cookie kingdom" to gift to your loved ones?  
     
   Sweet Gingerbread World / Candy Kingdom  
     
   Hey all\! Still in the middle of tweaking this candy-themed scene. Right now, the shaders and lighting feel a bit flat in some areas, especially in the foreground.  
     
   What tricks or tweaks would you suggest to give the icing, candy roofs, and background more depth?  
     
   \[图片省略\]Screenshot 2026-11-14 2053131433×815 959 KB  
     
   \[图片省略\]Screenshot 2026-11-14 2100401919×1027 803 KB  
     
   \[图片省略\]Screenshot 2026-11-14 2100591366×828 1.15 MB  
     
   \[图片省略\]Screenshot 2026-11-14 2102161323×824 935 KB  
     
   \[图片省略\]Screenshot 2026-11-14 2102291915×1030 845 KB  
     
   \[图片省略\]Screenshot 2026-11-14 2100041436×829 1.21 MB  
     
   \[图片省略\]Screenshot 2026-11-14 2057041064×586 611 KB

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How to Make Particles Moving along a Path?  
     
   Godot Version  
   4.2.1  
     
   Question  
   Hi Everyone  
     
   How to make particles moving along a path in Godot, like the example below?  
     
   Unity Surge plugin - Wrangling a particle system  
     
   \[图片省略\]image1920×1092 168 KB

2. **发言者 1**（引用未收录发言）：Wow, that sounds complicated. I think Unity and Unreal possess the directable particles with splines feature since ten years ago…  
     
   Is there no Godot plugin for moving particles along a path? How can Godot developers build dynamic particle effects that run through bezier curves?

3. **发言者 2**（引用未收录发言）：Can you show a visual mockup of the effect, with the actual pipe paths?

4. **发言者 1**（回复第 3 条）：It’s similar to these:  
     
   Particles through Pipe  
     
   Water through Pipes

5. **发言者 2**（回复第 1 条）：And here it is combined with built in particle process shader:

6. **发言者 1**（引用未收录发言）：Thank you\! It looks exactly like the Unity Surge plugin. Unfortunately, I can’t see anything when I play the engine, maybe because I’m a total noob in Godot. Here’s my project, made with Godot v4.7.2:  
     
   Project  
     
   Or could you please share your project?

7. **发言者 2**（回复第 6 条）：Make sure to:  
     
   Assign the script to the particles node  
     
   Assign the path node to the path property of the particle node  
     
   Draw an actual curve for the path node.

8. **发言者 1**（回复第 7 条）：Thanks again\! It works

### 讨论 41

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\(・∀・\)到底是谁说的锻炼健身可以抑制性欲减少手冲，我怎么觉着锻炼完摸牛牛更爽了，肌肉酸痛呼吸加速即将喷发的感觉真爽吧

2. **发言者 2**：痴肥啊痴肥，你执着于不射，却也因执着的存在关注自己想射还是不想射。反而从禁欲出发走进了执着与关注的怪圈，让自己逃脱不出无尽的苦海。  
     
   若真要觉悟，我劝你这小肥试习我不射之射的法门，射也不执着，不射也不执着，渐渐忘却了射与不射的区别，最终意识到射与不射都是一场空，随即忘却射的存在本身，入我三千大道，遁入空门口牙

3. **发言者 3**：锻炼健身刺激激素分泌，会让你更想射的\(\`ヮ´ \)σ\`∀´\) ﾟ∀ﾟ\)σ  
     
   正确的方法是把自己练到爬都爬不动，自然就没有欲望了

4. **发言者 4**：长期练腿可以促进睾酮水平

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：New Classic Stacking Order  
     
   I know that this has been asked before but not recently and experiences evolve.  
     
   The second part of my 300 system should arrive tomorrow. I will now have  
     
   NSS 333  
     
   NPX 300  
     
   NAC 332  
     
   NPX 300  
     
   NAP 350  
     
   NAP 350  
     
   I currently have a five shelf Fraim stack plus an older steel and glass stack.  
     
   I assume that one of the NPX 300 should go on the steel stack for a few months. This would mean - from the top  
     
   NSS 333  
     
   NAC 332  
     
   NPX 300  
     
   NAP 350  
     
   NAP 350  
     
   Would anyone see it differently?  
     
   In the future, it is likely that I will go to two four-shelf Fraim stacks. \( TT and power supply on two shelves\). Should the two NPX 300 or the two NAP 3550 go on the TT stack?

2. **发言者 2**（回复第 1 条）：Keeping the 300s high may help with cable dressing, of Burndies in particular. Putting both on a separate ‘brawn’ rack may be best if space permits.  
     
   I’ve always put the preamp on top, with the streamer below. It certainly worked a little better with Classic boxes: any difference with New Classic was more marginal in my limited experience, but perhaps something to try.

3. **发言者 1**（回复第 2 条）：Yes that was the way with my classic system as well.

4. **发言者 3**（回复第 1 条）：In my rack.  
     
   Top is the LP 12, then the 333 and below that the 332.  
     
   Then I have the NC 250.  
     
   I have both of my NPX 300 on the 2 bottom shelves of my rack.  
     
   The NVC TT and NPX TT are on a separate rack  
     
   Edited to correct typo.

5. **发言者 4**（回复第 4 条）：So your 333 is below your 333? :open\_mouth:

6. **发言者 5**（回复第 1 条）：With my one stack Fraim with medium height legs and active ATC 40A speakersI \(so no Naim power amps\) I’ve gone with this:  
     
   333  
     
   332  
     
   300 \(for 332\)  
     
   300 \(f the 333\)  
     
   Like others on here when I had OC separates I used to put the pre amp on top. Naim now recommend streamer on top with NC, so that is what I have done.

7. **发言者 6**（回复第 1 条）：I have:  
     
   Turntable  
     
   333  
     
   332  
     
   Vertere Phono Stage  
     
   Turntable Motor Control  
     
   250  
     
   If I had NPXs I would probably try putting them lower down the stack away from the 333/332 &amp; phono stage.

8. **发言者 7**（回复第 1 条）：On one Naim Fraim Lite  
     
   Naim Core \+ Innuos Phoenix Net  
     
   333  
     
   332  
     
   350  
     
   350  
     
   300  
     
   300

9. **发言者 8**（回复第 1 条）：I have a simple system:  
     
   333  
     
   332  
     
   250  
     
   I may get 2x 300 NPXs at some stage, if I do I’ll get a Fraim and keep them lower down, burndies permitting.  
     
   Tony

10. **发言者 1**（回复第 9 条）：The burndy is plenty long enough to reach 3 levels.

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Habe was kaputt gemacht  
     
   Hallo.  
     
   Kann jemand helfen? Kann ich einen von mir \(per Vespucci\) hochgeladenen Änderungssatz \(\#191854269\) rückgängig machen? Ich wollte nur den maxspeed ändern, weil der falsch eingetragen war \(40kmh statt 100kmh\). Vespucci hat dann angezeigt, dass es 229 Änderungen hochladen will. Ich habe dann die KI gefragt, ob das sein kann. Die meinte das sei normal. Dadurch wurde dann wohl die Straße verschoben. Sorry. Bin Anfänger. Wollte nur was Gutes tun… Kann jemand helfen?  
     
   Gruß Markus

2. **发言者 2**（回复第 1 条）：Revertiert.

3. **发言者 1**（回复第 1 条）：Danke Dir.  
     
   Hätte ich das auch irgendwie machen können?

4. **发言者 2**（回复第 3 条）：Da gibt es verschiedene Möglichkeiten. Ob es direkt in Vespucci geht weiß ich nicht.  
     
   Ich mache es meistens in JOSM.

5. **发言者 1**（回复第 1 条）：Ich habe es auch auf \[链接隐去\] direkt versucht, aber keine Option gefunden. Muss mich in das Bearbeitungsthema einlesen.  
     
   Habe auf der Webseite selbst jetzt die Höchstgeschwindigkeit geändert. Das scheint funktioniert zu haben.  
     
   Danke Dir nochmal.

6. **发言者 3**（回复第 4 条）：Hallo,  
     
   in Vespucci geht ein Revert nicht. Ich mache es, falls notwendig, über JOSM:  
     
   Gruss  
     
   发言者 3

7. **发言者 1**（回复第 1 条）：Danke für die Hinweise.

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：そう難しくはある  
     
   In one of the examples for the まい grammar point, this construction is used:  
     
   １９５０年代、学者達は、コンピューターを使って天気を予報することはそう難しくはあるまいと考えていたが、１４日以上先の予報は不可能である事がすぐに明らかになった。  
     
   I have recently learned the くはない・くはある grammar point as well, so I’m wondering if that’s what this is, i.e., this is saying “it’s not that it would not be difficult \[but it would be possible\]”, or if this is just a construction that’s necessary to connect an い-adjective with まい. Does anyone know if this counts as the くはある grammar point?  
     
   Thanks\!

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Thumb gusset  
     
   Hi . I m making Susan Crawford winter warmer mittens.  I have got to row 20 … it states.  
     
   Pattern to marker place the next 13 stitches on hold  for thumb gusset .  
     
   Using  backwards loop and continuing to maintain pattern cast on 13st   patt 2 pm patt to end of round .  
     
   I,m confused re the maintain pattern bit … how do i do that when casting on .  
     
   Do i cast on in the colours that correspond with the colourwork chart . Thank you

2. **发言者 2**（回复第 1 条）：\[链接隐去\]  
     
   You can see in the 4th photo down on the details page that the palm pattern is maintained across the newly cast on sts. As 某参与者 mentioned, just remember to carry one of the yarns over the cast on sts so that both yarns are available as you continue the mitten. Either color will work.

3. **发言者 1**（引用未收录发言）：Thank you

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：SDL3.dll failed to loading installing darktable-5.7.0\+2001  
     
   Received this message during installation:  
     
   \[图片省略\]image235×140 3.93 KB  
     
   I’m up to date on my Windows updates, so I don’t understand why I am getting this.

2. **发言者 2**（回复第 1 条）：Could it be this:  An error message prevents darktable from installing or starting on Windows ?  
     
   \(no hot ladies behind that link, just hot tips :sunglasses:\)

3. **发言者 3**（回复第 1 条）：\[链接隐去\]

4. **发言者 3**（回复第 3 条）：\[图片省略\]  
     
         \[链接隐去\]  
       
     
       
         
     
   sdl3.dll free download \| DLL‑\[链接隐去\]  
     
     Download sdl3.dll free\! Fix DLL missing error. Solve it yourself or get help using DLL‑\[链接隐去\] Client to fix DLL error automatically.

5. **发言者 2**（回复第 1 条）：In the age of spam I’d advise against downloading dll’s from non-official sources…

6. **发言者 4**（回复第 1 条）：I am seeing this SDL3 error when starting last night’s Win64 build 5.7.0\+2021, although darktable subsequently then runs OK.  
     
   I don’t see the error when starting my regular 5.6.2 installation on same PC.

7. **发言者 5**（回复第 1 条）：Someone started an issue in GitHub around this. The packaging for windows needs to be updated.

8. **发言者 1**（回复第 7 条）：That’s music to my ears. I’ll wait on the fix. So far dt seems to work fine.

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 家人要你像工作一樣應答  
     
   如題  如果你下班了  
     
   接到家人的電話  
     
   家人要你像是在工作一樣的應答  
     
   要像面對老闆一樣  
     
   如果不像在工作就會被嘴  
     
   你會怎麼做哩？  
     
   好奇問問大家

2. **发言者 2**（回复第 1 条）：家人是哪一位 長輩嗎

3. **发言者 1**（回复第 1 条）：不是欸就同輩

4. **发言者 2**（回复第 1 条）：哦 你個性比較弱哦

5. **发言者 1**（回复第 1 条）：我怎麼樣沒差只是好奇大家會怎樣

6. **发言者 3**（回复第 1 条）：看是像哪做種工作

7. **发言者 3**（回复第 1 条）：現在下班應對老闆是不接電話 網路不

8. **发言者 3**（回复第 1 条）：穩

9. **发言者 3**（回复第 1 条）：手機?不會帶

10. **发言者 4**（回复第 1 条）：就跟他說我都會直接批評老闆

11. **发言者 4**（回复第 1 条）：然後開始批評他

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 遲到  
     
   一直以來其實對上班遲到扣錢這件事沒覺得怎樣  
   但加班要隔半小時才開始算就覺得很不合理  
   如果遲到一分鐘就要扣半小時的錢連忘記打卡都要扣  
   那加班隔半小時才開始算不滿半小時也不算  
   等於要拿到加班費要留下來整整一小時才算半小時的錢  
   比較起來有夠虧

2. **发言者 2**（回复第 1 条）：鼓勵你不遲到,鼓勵你準時下班不要拖

3. **发言者 2**（回复第 1 条）：台錢,「每個奇怪規定的背後,都有一

4. **发言者 2**（回复第 1 条）：個離譜的故事」

5. **发言者 3**（回复第 1 条）：你可以故意晃到遲到29分再打卡

6. **发言者 3**（回复第 1 条）：或是加班滿半小時又30秒

<!-- samples:end -->

