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

采集时间：2026-11-18 14:51:10（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：同一个项目，正在开发，所以对比起来比较明显，6.2 比 6.1 更简洁 更快了一些，挺好用的。  
   当然是个人体验。  
     
   还是感谢一下 O 社，毕竟不封号啊。

2. **发言者 2**：是快了一点，昨天的 6.1sol，首字 7s 以上，下午十几的 tok/s  
     
   现在再用 6.2sol，首字 3s 内，也有 40tok/s

3. **发言者 3**：不封号的 Gemini 有 180t/s，我都不知道这种最低个位数的模型怎么能吹起来，就算 6.2 也就三四十。

4. **发言者 4**：御三家：  
     
   1. A\\封号；  
   2. G 家，反重力太差劲了；  
   3. O 家，平衡。

5. **发言者 5**：确实，我是用每个月送的 API 额度 Pi\+Sol，今天确实快\+不废话

### 讨论 2

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Ice maker with a water line on a YunoHost box?  
     
   Discuss  
   I run YunoHost on a small home server in Tulsa and want to add a countertop ice maker to the kitchen setup. The model I’m looking at needs a permanent water line and has a companion app for scheduling and filter reminders, and I’d rather not have another cloud account sitting on my network. My plan is to keep the appliance itself dumb and only track filter changes and run times in a small self-hosted app on the YunoHost instance, but I’m unsure whether that is worth the effort for a single appliance or if the vendor app is fine isolated on a guest VLAN. Another worry is water pressure at the hookup and whether these units tolerate being on a smart plug that gets cut remotely. Has anyone here integrated a kitchen appliance like this with their YunoHost setup, and how did you handle the vendor app?

2. **发言者 2**（回复第 1 条）：Perhaps look if an home assistant integration exist for your kitchen device

### 讨论 3

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

### 讨论 4

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：这姐姐也是真的不嫌冷，今天我们这寒潮过境，我出门还在想少穿了，结果转个弯吓一跳\( ﾟ∀。\)  
     
   但裸背露腿的确实\( ´ρ\`\)啊……

2. **发言者 2**：图床炸了？

3. **发言者 3**：看不到图，但是  
     
   淦

4. **发言者 4**：是

5. **发言者 5**：逼养的，看不到图你自己穿给肥哥们看\( \`д´\)

6. **发言者 6**：逼养的，看不到图你自己穿给肥哥们看\( \`д´\)

7. **发言者 7**：n

8. **发言者 8**：i

9. **发言者 9**：n

10. **发言者 10**：j

11. **发言者 1**：图床炸了\( ;´д\`\)

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：First attempt at oil pastels  
     
   I’ve been seeing a few posts on 某社区 lately of oil pastels and I’ve fallen in love\!  
     
   I generally see and knit, so this is my first attempt at something art related in a long time.  
     
   \[图片省略\]IMG\_01141920×1440 487 KB  
     
   If anyone has any tips or tricks, I’m open for suggestions

2. **发言者 2**（回复第 1 条）：That is amazing for a first attempt\!

3. **发言者 3**（回复第 1 条）：You’re doing beautifully\!  
     
   The only tip I can think of at the moment:  
     
   You can tape a piece of tracing paper over that to keep it from smudging inside your sketchbook.

4. **发言者 4**（回复第 1 条）：That is gorgeous and your colors are so dreamy\!

5. **发言者 1**（回复第 3 条）：That’s a good tip\! Thank you.  
     
   I didn’t notice some transfer to the opposite page.

6. **发言者 5**（回复第 1 条）：So pretty\!

### 讨论 6

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

### 讨论 7

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Need help with snow photos  
     
   I want to edit some older photos from my archive for a photobook project. The problem is that all the photos are taken in winter with snow, and I’ve always struggled with editing snow shots. Since snow is white, it’s really hard to do something creative with it. I was thinking about converting them all to black and white, especially since they don’t have much color anyway. What do you guys think? How do you edit your snow photos?  
     
   \_DSC0445.NEF \(28.4 MB\)  
     
   \[图片省略\]\_DSC0445\_011920×1278 765 KB  
     
   This file is licensed Creative Commons, By-Attribution, Share-Alike.

2. **发言者 2**（回复第 1 条）：darktable 5.6.2, AgX. I white balanced on that slab of roof a little to the right of the center.  
     
   \[图片省略\]\_DSC04451980×1318 743 KB  
     
   \_DSC0445.NEF.xmp \(8.2 KB\)

3. **发言者 1**（引用未收录发言）：Thanks for the suggestion, your edit is amazing\! Indeed the contrast between warm and cold is beautiful. I also like the softness you introduce with contrast &amp; texture, it gives the photo a great mood.

4. **发言者 1**（引用未收录发言）：Thank you for your lengthy post, lots of great information about snow photos. Your edit is great, too. Can you also share the xmp to see exactly what module you used?

5. **发言者 3**（回复第 1 条）：\[图片省略\] 发言者 4:  
     
   Snow is white, except when it’s not.  
     
   For some reason this gave me a good laugh :laughing:  
     
   Anyways, here’s my edit:  
     
   \[图片省略\]\_DSC04451621×1080 452 KB  
     
   \_DSC0445.NEF.xmp \(16.8 KB\)

6. **发言者 4**（回复第 4 条）：Sure. I don’t know what version I’m on anymore, but it’s some nightly version with the new white balance \+ color calibration interaction. The majority of the edit comes from the white balance and color balance rgb. Spektrafilm is more or less default.  
     
   \_DSC0445.NEF.xmp \(23.7 KB\)

7. **发言者 1**（引用未收录发言）：Thank you\!

8. **发言者 5**（回复第 1 条）：Cant really contribute to the ideology just jumping in with a high key look with destroyed highlight contrast just so you can choose from.  
     
   Beautiful peaceful place and a great shot.  
     
   \[图片省略\]\_DSC04453840×2557 929 KB  
     
   \_DSC0445\_01.NEF.xmp \(15.4 KB\)

9. **发言者 6**（回复第 1 条）：What a beautiful part of the world you have photographed here. I used color zones module to tame the blue shadows and add warmth to the buildings.  
     
   DT5.7 \_DSC0445.NEF.xmp \(23.2 KB\)  
     
   \[图片省略\]\_DSC0445\_022000×1432 625 KB

10. **发言者 7**（回复第 1 条）：Next time I edit a pic with some snow, I will copy / paste the 1300 pages of “War and Peace”…

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：G-Shock GBA-900-7AER  
     
   This is a personal project I have been working on recently. It’s a G-Shock GBA-900-7AER watch which has been on my to-do list a while. The designs on these watches have always interested me and I wanted to try and make it true to size and form and as realistic as possible. It also gave me the opportunity to test some of Marmoset Toolbags new text features which was fun.  
     
   More renders and turntable available on my \[链接隐去\]  
     
   \[图片省略\]turn83840×2160 2.87 MB  
     
   \[图片省略\]turn43840×2160 2.83 MB  
     
   \[图片省略\]shock101920×1920 151 KB  
     
   \[图片省略\]shockt32160×3840 2.41 MB  
     
   \[图片省略\]shock113840×3840 4.89 MB

2. **发言者 2**（回复第 1 条）：nah bro you cant just take high quality photos and call them renders \! \(jk\)

3. **发言者 3**（回复第 1 条）：Very nice\! I can tell you put a lot of love into this.  
     
   The hands on the clock don’t match the time on the LCD display. Is that some special function of the thing?  
     
   \(Sorry, I suppose I could look up the manual for the thing myself…\)

4. **发言者 1**（回复第 3 条）：Ha ha, i honestly didn’t think about this. What a miss\! The digital information had some significant numbers just for fun but I completely forgot the hands. They should match. Good eye\!

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[VENDU\] Code GTA 6 sur PS5  
     
   Si quelqu'un veut acheter GTA6 sur PS5 en numérique, j'ai oublié d'annuler une de mes précos, donc j'ai une boite en rab, je revends le code au prix d'achat de 60€  au lieu de 80 sur le store \(si vous voulez la boite, y a juste un poster dedans en plus, on pourrait s'arranger en mains propres sur Paris ou en envoi à vos frais\)  
     
   PS : C'est vendu \!

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: WalletFeed, Apple Card Transactions to Webhooks, Sheets and S3

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Photocard Driving Licence  
     
   I’m going to have to replace my paper licence with a photocard one and I was wondering how successful a suitable selfie is with the DVLA.  Has anybody had to use one of these paid Apps that claim to make sure you get approval.

2. **发言者 2**（回复第 1 条）：Do check when you get it back \(keep an image of the old one\) as they have a habit of dropping categories, mostly “D”.

3. **发言者 1**（回复第 2 条）：Thanks,  I do have copies and had also heard that some categories were removed. :astonished\_face:  
     
   I have A.

4. **发言者 3**（回复第 1 条）：Don’t wear specs in the photo. :-1:  
     
   It’ll  get rejected.  
     
   I always went to the post office no problems.

5. **发言者 4**（引用未收录发言）：\[图片省略\] 某参与者:  
     
   Also required is an optician’s statement unless the doctor tests eyesight as well.  
     
   Has this come in the last couple of years? I wasn’t asked to provide one two years ago \(at age 70\).  
     
   I had my photo taken professionally \(I needed a new passport as well\), and he could upload it directly and give me a code. My wife had hers taken at Tesco \(Timson’s IIRC\)

6. **发言者 1**（回复第 1 条）：Thanks all. I’m 60 so hopefully it will be straightforward.

7. **发言者 5**（回复第 6 条）：well at least when you are 60 your formal eye tests by an optician become free…

8. **发言者 1**（回复第 7 条）：It does :\+1:

9. **发言者 1**（引用未收录发言）：I don’t wear sunglasses but thanks anyway.

10. **发言者 4**（引用未收录发言）：That’s what I thought. Amusingly I had an email today from my optician on this very topic.  
     
   They are too late though, I had a eye test &amp; scans two weeks ago, and I appear to be compliant.

11. **发言者 5**（回复第 10 条）：\[图片省略\] 发言者 4:  
     
   They are too late though, I had a eye test &amp; scans two weeks ago, and I appear to be compliant.  
     
   well indeed I think for most of us of have regular eye tests - its a non issue. One of the questions you are typically asked is whether you drive and if so and  you need correction your prescription applies to meet the standards as BAU.

### 讨论 12

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

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：The entirety of "Let Over Lambda" is now freely available online

2. **发言者 2**（回复第 1 条）：One of the best lisp books of all time. Absolute joy to read.

3. **发言者 3**（回复第 1 条）：Why do we not get the same hyperbolic claims for macro facilities in other languages? Are other languages’ macro facilities worse in some way?

4. **发言者 4**（回复第 3 条）：Prolog's goal\_expansion and term\_expansion mechanisms are also very interesting, as they're just Prolog rules that get executed and modify the source code. Prolog is also homoiconic. They're very easy to use. But it is not a standard feature, some Prolog systems skip it, while others implement it in subtle different ways.

5. **发言者 5**（回复第 1 条）：I should revisit it again, I have the dead tree edition, and it was wonderfully quirky and informative at the time. I didn't actually use most of what I learned but loved it.

6. **发言者 6**（引用未收录发言）：There is an \[errata page\]\(\[链接隐去\] and a \[clarifications page\]\(\[链接隐去\]

7. **发言者 2**（回复第 3 条）：Mostly yes, because they are often not homoiconic.

8. **发言者 7**（回复第 4 条）：&gt; not a standard feature ... implement it in subtle different ways  
     
   Understanding Lisp as a family \(while this book means Common Lisp\) macro systems we can different ways indeed. I've not explored expansion much, could you discuss them more or point to a nice guide? :\)

9. **发言者 8**（回复第 4 条）：In practice I think Prolog doesn't need the macro system as much because it isn't strictly evaluated, and we have \`=../2\` and \`call/N\` that let us do a lot of tricks.  
     
   I also think non-strict evaluation helps reduce Haskell's need for macros, although there is a full macro system in Template Haskell that is not especially popular, although I don't have an explanation for that.

10. **发言者 8**（回复第 3 条）：I think a lot of the original hyperbole dates to an era when the principal target of the comparison would be C and the difference between the two really is immense.

11. **发言者 8**（引用未收录发言）：Common Lisp also blurs the line between compile-time and run-time, which I think increases the power compared to other systems.

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Hi i've started programming or learning to code, and while i'm certain the script is okay, the player sprite just doesn't move  
     
   Godot Version  
   extends CharacterBody2D  
     
   const SPEED = 300.0  
     
   const JUMP\_VELOCITY = -850.0  
     
   func \_physics\_process\(delta: float\) → void:  
     
   print\("Physics is running"\)  
     
   var direction = Input.get\_axis\("left", "right"\)  
     
   if not is\_on\_floor\(\):  
   	velocity.y \+= get\_gravity\(\).y \* delta  
     
   if Input.is\_action\_just\_pressed\("jump"\) and is\_on\_floor\(\):  
   	velocity.y = JUMP\_VELOCITY  
     
   if direction \!= 0:  
   	velocity.x = direction \* SPEED  
   else:  
   	velocity.x = move\_toward\(velocity.x, 0.0, SPEED\)  
     
   move\_and\_slide\(\)  
     
   Question  
   Hi sorry to bother everyone but I need help with some coding. I don’t have any experience with coding or video game design. I’mtrying to create a very simple platformer with the goal of having a character move left and right and jump on the platforms. the issue is whenever I run the scene, I cannot move the player character at all. My keyboard does work and I've followed 某社区 tutorials, but I;m getting nowhere,and for some reason, the scene does not play. The nodes look okay and the colison effect is there.

2. **发言者 2**（回复第 1 条）：Have you assign input name “left” “right” " jump"?  
     
   In project &gt; project setting &gt; input map and re name them.

3. **发言者 3**（回复第 1 条）：If you don’t have anything else there, it could look like you don’t move as the camera follows the player.  
     
   Add this in physics process:  
     
   print\("Position: ", global\_position\)  
     
   If you see it changing in the prints, you are moving.

4. **发言者 4**（回复第 1 条）：One more thing worth checking is whether the correct scene is set as the Main Scene under Project → Project Settings → Application → Run.  
     
   Also, make sure the script is attached to the CharacterBody2D node and that the Input Map actions match the names used in your code.

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：RT  
   滚动就有顿挫感，一点都不丝滑，在 CMD 中没问题

2. **发言者 1**：已解决

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Crochet help  
     
   Wasn’t sure if I can ask a crochet question here or just knitting questions.  
     
   Anyway, I’m trying to crochet a beginner’s scarf but it doesn’t seem to be getting any wider … do rows 3 and 4 mean I should be increasing? I’m new to crochet and am struggling already. Many thanks  
     
   \[图片省略\]IMG\_89151179×772 132 KB

2. **发言者 2**（回复第 1 条）：What is the name of your pattern and designer?  
     
   Yes, it looks like there are increases in rows 2 and 3 where several sts are worked into a single stitch. Then the increase row 3 and row 4 are repeated.  
     
   某参与者 \[某参与者\] 某参与者 Would you help out please?

3. **发言者 1**（回复第 2 条）：Hi thanks for your reply.  
     
   It’s called the Borough Scarf by Stitchberry  
     
   Which bit tells me the increase in row 3 and 4 please?

4. **发言者 1**（引用未收录发言）：Thank you so much :blush:

5. **发言者 2**（回复第 4 条）：Row 3 in the repeat is the increase. Rows 3 \(inc row\) and 4 \(crochet plain with no inc\) make up the repeat. Row 2 which is part of the beginning looks to me to have an inc as well but that is a one time row.  
     
   \[链接隐去\]  
     
   Thanks for the pattern information\!

6. **发言者 1**（回复第 5 条）：Ah ok . I’ve undone it so many times \! Thank you , I will try again

7. **发言者 2**（回复第 6 条）：It’s sometimes \(often\) difficult to get started but once you’re on your way, the rest should go smoothly. Work several repeats and see if the scarf is doing what you predict. If not, come right back. We have some excellent crocheters who are happy to give advice.  
     
   It’s a beautiful stitch pattern and worth the effort.

8. **发言者 1**（回复第 7 条）：I appreciate your help . I’ll give it another go and see what happens\!\! Thank you

9. **发言者 1**（引用未收录发言）：Thank you , I’ll look at the link for the inc/dec help . Hopefully I’ll get there as it does look so nice :blush:

10. **发言者 3**（回复第 1 条）：Every time you put more than one stitch into the stitch below, you are increasing. It looks like you are doing that. The item should be getting bigger. Hope this helps.

11. **发言者 1**（回复第 10 条）：Thank you

### 讨论 17

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

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：好想玩人体练成\( \`д´\)  
     
   我来组成头部\( \`д´\)

2. **发言者 2**：我来组成左眼

3. **发言者 3**：我来组成身体

4. **发言者 4**：我来组成右手

5. **发言者 5**：我来组成右手

6. **发言者 5**（回复第 5 条）：\[引用第 5 条\]  
     
   不兑应该是左手\(´ﾟДﾟ\`\)

7. **发言者 6**：我来组成双腿

8. **发言者 7**：这都炼了个啥啊喂

9. **发言者 8**（回复第 8 条）：\[引用第 8 条\]  
     
   ･ﾟ\( ﾉヮ´ \)

10. **发言者 9**（回复第 8 条）：\[引用第 8 条\]  
     
   \(\`ヮ´ \)

11. **发言者 10**：再来\( \`д´\)  
     
   我来组成头部

### 讨论 19

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

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Dt 5.8 WIP is the biggest release so far  
     
   \[图片省略\]dt loc trend1760×832 109 KB  
     
   5.8 is currently the biggest release as in changes of loc, and even when normalized as net growth tendency \(see plot\), it is still all time high surpassing 2.6.  
     
   What might be the implications to future development, especially maintainability? \(Yes I am aware that 5.8 ships really a lot of features.\)  
     
   Note: app code is everything under src/ and data/kernels, excluding src/tests/ and src/external/.

2. **发言者 2**（回复第 1 条）：Cool graph\! I find it interesting that the net growth was pretty stable from 4.0 to 5.2 and then it quickly shot up :smiley: Also, I’m struggling to see “tests deleted” in it though… might be too small to be noticeable and therefore it’s not necessary to include it imo.

3. **发言者 1**（回复第 2 条）：People don’t really have reasons to remove a lot of tests. It is just kept for symmetry…

4. **发言者 2**（回复第 3 条）：Yeah, that’s what I was guessing was the reason :sweat\_smile: Maybe it could be split into two graphs? App and Tests separately, I wonder if that would make a difference

5. **发言者 3**（回复第 1 条）：And it’s a good thing in my opinion. This version has by far the biggest positive impact on my workflow.

6. **发言者 4**（回复第 1 条）：Cool :slight\_smile: When will dt go into feature freeze for 5.8?

7. **发言者 5**（回复第 6 条）：\[图片省略\]  
     
         GitHub  
       
     
       
       \[图片省略\]  
     
   GTK4 work and 5.8 Dec release · darktable-org/darktable · Discussion \#22660  
     
     As you all know the current code base has received a huge amount of changes to prepare the Gtk4 transition. The work is not finished, but that's not the point of this message. Some time ago I said ...

8. **发言者 6**（回复第 1 条）：Soooo… It’s going to be a very good Christmas this year then? I’m looking forward to it. I’ve skipped out on trying any of the new features but I have an idea of how much work has been put in to it by all the contributors and testers.

9. **发言者 5**（回复第 1 条）：Besides the new modules, v there’s also lots of work done on GTK 4. I find the guts of the pipeline beyond my understanding, but I don’t know what the right way to restructure it would be. Collecting what kinds of bugs we keep running into is a good start. I think that’s what 发言者 1 already started on GitHub.

10. **发言者 1**（引用未收录发言）：\[图片省略\] 某参与者:  
     
   I guess I was once impressed with filmic.  
     
   Aurelien getting really disappointed here  : p

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Symphony Fighters Promo/Production Updates  
     
   Promotional image made for the socials. Made in Blender 4.3  
     
   \[图片省略\]Quick Update Reb and Kim 21080×1080 312 KB  
     
   \[图片省略\]

### 讨论 22

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

### 讨论 23

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

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Can using a VPN get your account shadowbanned or flagged?

2. **发言者 2**（回复第 1 条）：Can using a VPN get your account shadowbanned or flagged?Not likely.  What a person posts will determine what happens to their account.  Plenty of people here are on VPN's.

3. **发言者 1**（回复第 2 条）：Thank you\!

### 讨论 25

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

### 讨论 26

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

### 讨论 27

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区 AI Policy  
     
   Does the 某社区 have an AI policy?  
     
   I would expect that topics or replies which are copied and pasted directly from the output of an AI model are not welcome.

2. **发言者 2**（回复第 1 条）：I don’t trust the replies I get from an AI in English, let alone in a language where I don’t have full fluency.  
     
   I have no idea what BP’s official line is, but I think I’ve seen responses elsewhere that things are handled by real people? Please take with multiple grains of salt, though, I’m just going off a vague memory of other replies.

3. **发言者 3**（回复第 2 条）：I think Clerk is specifically talking about a policy for the forums

4. **发言者 2**（回复第 3 条）：OH WAIT forums, not the content, oops. I am apparently not awake today, apologies\!

5. **发言者 4**（回复第 1 条）：For example, I asked Shampoo if his replies are AI generated  
     
   \[图片省略\]What actually happens when you come back after a break? \(a native speaker asking learners\)  
     
   发言者 4 You caught me. I write naturally in Japanese, and for my English posts I draft in Japanese and use a tool to help me put it into English  
     
   There isn’t currently a rule, and if there was it would be hard to enforce.

6. **发言者 5**（回复第 1 条）：just curious, is that for ethical reasons or accuracy or?

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Adapting CPython for yk

2. **发言者 2**（回复第 1 条）：The article is pretty captivating. There is also an interesting comment from Ken Jin \(who is working on JIT for cPython\). This supports my opinion that comments are an important part of a blog. :\)

### 讨论 29

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：打算 12 月回国旅游\+过年，远程工作 2-3 个月。  
   Claude 和 OpenAI 最近都更新了使用政策不允许在中国大陆地区调用模型，甚至 Amazon Bedrock 上的 Claude 现在也是管辖范围没法用了。  
     
   Claude 就不想了，有没有什么比较正规的方式可以用其他比如 GPT 模型？  
   我现在查下来 Azure 和 GitHub Copilot 好像可以，有没有类似经验的朋友？

2. **发言者 2**：我觉得 2-3 个月就玩吧，不要工作了。回到海外再工作更好吧

3. **发言者 3**：100% 合规：没有  
   100% 合法：没有  
     
   所以别纠结什么合法合规，直接挂 vpn 继续用你的 openai 就行了。claude 就算了

4. **发言者 1**：发言者 2 公司给的假顶多就能玩一个月，这次难得想国内呆久一点，工作还是要工作的

5. **发言者 1**：发言者 3 主要是办公电脑的服务都是公司签约的，现在公司联系了说这些回国可能用不了了，有合规方法的话还能让公司专门买一下

6. **发言者 3**（回复第 5 条）：\[引用第 5 条\] claude 先丢一边。openai 你回国挂 vpn 就行了，自用约等于不封号。

7. **发言者 4**：Cursor 就行吧，除了贵没别的缺点正规简单可报销。

8. **发言者 5**：办个国外支持大陆漫游的大流量电话卡，合法合规

9. **发言者 1**：发言者 5 网络其实还好，公司有提供微软的企业线路用来办公，办公手机本身也能国际漫游，现在问题公司不想违反使用条款。私下常看 某社区 还是有自信不被发现的。

10. **发言者 6**：远程连回家里的电脑应该是最稳妥的了

11. **发言者 7**：workbuddy 国际版

### 讨论 30

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

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 如果可以裸辭 大家最想把時間用來做甚麼  
     
   這幾天剛好跟朋友聊到這個問題  
   他就說他最近請了長假打算去歐洲玩一個月  
   問我如果可以有一段很長的放鬆休息時間  
   我想做甚麼  
   我應該也會想出國散心之類的  
   那大家呢  
   會想做些甚麼

2. **发言者 2**（回复第 1 条）：在家躺平

3. **发言者 3**（回复第 1 条）：裸辭就不能瘋狂跟下屬幹幹嗎 失智民

4. **发言者 3**（回复第 1 条）：主黨 阿勳被搞到失智

5. **发言者 4**（回复第 1 条）：只是不想工作而已，但不會特別想做

6. **发言者 4**（回复第 1 条）：什麼，怎麼辦

7. **发言者 5**（回复第 1 条）：參加短期出家

8. **发言者 6**（回复第 1 条）：想躺平

9. **发言者 7**（回复第 1 条）：環遊世界

10. **发言者 8**（回复第 1 条）：裸辭然後出國個1-2年這種事我幹過了

11. **发言者 8**（回复第 1 条）：前半年是真的爽 後半年開始懷疑自己

### 讨论 32

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：有没有人尝过人肉的味道？  
     
   今天烧菜端铁盘子的时候，盘子在锅边烤太久，手指头表面直接被烫糊了，闻起来还挺香的，特别像小时候吃的那种烤蚂蚱的味道，人肉的味道跟昆虫像吗？有肥哥知道不

2. **发言者 2**：σ\( ᑒ \)我吃一点

3. **发言者 3**：肥哥变成喰种了大伙快跑

4. **发言者 4**：嘴唇死皮有点像

5. **发言者 1**（回复第 4 条）：\[引用第 4 条\]  
     
   嘴唇死皮吃起来哽啾啾的没有啥味道，但是口感还挺有意思的

6. **发言者 5**：听说是鸡肉味的，无法求证\( ﾟ∀。\)7

7. **发言者 6**：我之前不小心徒手放到电烙铁上，烫熟一块  
     
   闻着是真的香去

8. **发言者 7**：之前局麻做手术用的电刀 感觉我的肉就是饭店的烤肉味\( ﾟ∀。\)

9. **发言者 8**：考虑到商朝有吃殉人的考古证据，人肉应该不会很难吃\( ﾟ∀。\)

10. **发言者 9**：想起来之前听说人油是月牙形的，好奇在网上搜了半天，还奇怪怎么没有资料\( ﾟ∀。\)777  
     
   反应过来之后十分的\( ﾟ∀。\)

11. **发言者 10**：你闻到的大概是角质蛋白烧焦的味道吧\( ﾟ∀。\)人体材质差异还蛮大的

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Fr. \(04.12.\) Kneipenquiz  
     
   Moin,  
     
   der Dezember startet mit einem Kracher am Freitag:  
     
   Das Kneipenquiz kommt mit einer neuen Ausgabe ab 20 Uhr\!  
     
   Andreas und Johanna führen durch den Abend und müssen sich durch die „Halbe Punkt“-Chöre durchsetzen.  
     
                 
     
   \[图片省略\]Screenshot 2026-11-13 1832221920×1342 175 KB

2. **发言者 2**（回复第 1 条）：Viertel Punkte…\!\!\! Buuuuh…  2 3/17 Punkte… Yeeeeah

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：My fancy hat  
     
   \[图片省略\]1. my fency hat866×600 421 KB

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Recherche d'un gentil graphiste pour refaire les cinematiques de mon jeu  
     
   Bonjour ici , j'ai un petit jeu que je pense vendre sur Steam et je suis une tanche monumentale en graphisme, pour l'instant mes assets sont générés par le jeu et ça passe plus ou moins,  
     
   par contre les cinématiques sont moches ,  donc je cherche un graphiste qui pourrait me les refaire .Ce sont des cases BD actuellement générées par ce cher Claude , j'en ai une vingtaine actuellement , je pense en avoir une quarantaine d'ici que tout le contenu soit produit. L'idée étant de garder la scène mais de la redessiner en mieux \(ce qui vu la qualité actuelle ne devrait pas étre hyper compliqué\)  
     
   On verra en mp pour les tarifs, devis , prix fixe ou pourcentage sur les revenus du jeu , vu que tout travail mérite salaire.

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Very frequent 'write EPIPE' exceptions; IDE basically unusable  
     
   I'm on 2.3.11 on Linux \(ZorinOS\).  
     
   Lately I'm getting repetitive write EPIPE exceptions; to the point where the IDE is practically unusable.  
     
   \[图片省略\]Screenshot from 2026-11-16 09-50-31717×358 32.4 KB  
     
   A JavaScript error occurred in the main process  
   Uncaught Exception:  
     
   Error: write EPIPE  
       at afterWriteDispatched \(node:internal/stream\_base\_commons:161:15\)  
       at writeGeneric \(node:internal/stream\_base\_commons:152:3\)  
       at Socket.\_writeGeneric \(node:net:953:11\)  
       at Socket.\_write \(node:net:965:8\)  
       at writeOrBuffer \(node:internal/streams/writable:564:12\)  
       at \_write \(node:internal/streams/writable:493:10\)  
       at Writable.write \(node:internal/streams/writable:502:10\)  
       at console.value \(node:internal/console/constructor:304:16\)  
       at console.log \(node:internal/console/constructor:379:26\)  
       at console.&lt;computed&gt; \[as info\] \(/tmp/.mount\_arduinGLwqF8/resources/app/lib/backend/electron-main.js:2:1240165\)  
     
   Restarting the PC is only a temporary fix.  Any ideas?

2. **发言者 2**（回复第 1 条）：I can't really help but an answer to the below questions might help others to help you.  
     
   Did this happen with previous versions of ID 2.x as well?  
     
   Did the problems start after a recent upgrade of ZorinOS?

3. **发言者 1**（回复第 2 条）：I've had this issue with the IDE in the past, but it seems to come and go.  Only recent OS updates are daily security updates.

4. **发言者 1**（引用未收录发言）：So launching from the terminal seems to alleviate the issue.  Thank you for providing that workaround.

### 讨论 37

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: What do you think is going on with that many outages coming in a row?  
     
   In just four days we have seen:\* Outlook exchange server outage for almost 20 hours   
   \* FAA communication channels outage   
   \* A few US banks outage   
   \* United Airlines outageDo you think it is related to AI coding, just coincidence or we start to see, but can’t detect, AI hijacking systems everywhere?

2. **发言者 2**（回复第 1 条）：Without getting too conspiratorial, it's pretty common every year for a bunch of software updates to get pushed early November in anticipation of code freezes around Thanksgiving. A spike of outages around this time is not uncommon in any given year - but the FAA ground stop was notable enough to draw extra attention to all subsequent outages.

3. **发言者 1**（回复第 2 条）：Ah, yes, the US is heading into thanksgiving. I am from the UK, so for me code freezes mostly a theme for December, but I think you are completely right here.

4. **发言者 3**（回复第 3 条）：I had a colleague refer to the next 45 days as "American Ramadan" in most corporate offices.  Instead of fasting from food, they fast from work.

5. **发言者 4**（回复第 2 条）：This seems the most plausible. I highly doubt all these traditional, slow moving enterprises were token-maxing this past spring and these outages being the outcomes of that and latent bugs. If anything they have very slow, controlled releases of system/software updates. Maybe MSFT is the exception because they are a tech company.

6. **发言者 5**（回复第 1 条）：We don't have much information about any of these. It could be anything from new guys tripping off a landmine to cyber attacks. I wish insiders talk more about those, but apparently that's not a good advice.

7. **发言者 6**（回复第 1 条）：Are we in a middle of a huge Cyber warfare?\[链接隐去\]

8. **发言者 7**（回复第 1 条）：&gt; Do you think it is related to AI codingYou never heard of Microsoft, isn't it ?

### 讨论 38

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

### 讨论 39

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

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Lock your GitHub Actions

2. **发言者 2**（回复第 1 条）：This helpfully shows me how to lock the actions, but I'm missing how it's better than the old way: SHAs in the references, updated by dependabot.

3. **发言者 2**（回复第 2 条）：I got an answer: this pins transitive dependencies also.

4. **发言者 3**（回复第 2 条）：I migrated to a lock file because it doesn’t clutter the workflows with hashes, it’s cleaner with proper versions. It also works with Dependabot so no regression on this side either.

5. **发言者 4**（回复第 2 条）：yeah at work we use \[ratchet\]\(\[链接隐去\] and it works quite well.

6. **发言者 5**（回复第 1 条）：Seems good\!  
     
   I wish they'd provided a way to do this without the \`gh\` tool; I can't be the only person who doesn't use it. Maybe I'm just missing it.

7. **发言者 6**（回复第 5 条）：This only pins direct dependencies, all others are unpinned when using this approach.

8. **发言者 7**（回复第 1 条）：Tangential, but a lot of people don't know: dependabot doesn't update transitive dependencies by default.  
     
   I suggest setting it to do so and using groups to keep the cadence of PRs manageable:  
     
   \[链接隐去\]

9. **发言者 2**（回复第 8 条）：It's not clear that applies to "package-ecosystem: github-actions"

10. **发言者 8**（回复第 6 条）：FYI you don't technically need to use \`gh\` to do this - all of the GitHub CLI extensions can technically be run on their own  
     
   But it's better to install it through the \`gh\` CLI so it then automagically provides things like authentication

### 讨论 41

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Sète – Tanger Med Direct  
     
   Hello everyone,  
     
   I need help from the community with this ferry route:  
     
       
         \[图片省略\]  
     
         OpenStreetMap  
       
     
       
       \[图片省略\]  
     
   Way: Sète – Tanger Med / طنجة – سيت \(309885392\)  
     
     OpenStreetMap is a map of the world, created by people like you and free to use under an open license.  
     
       
     
       
         
         
       
     
       
     
   Could anyone confirm whether this route is still available directly between Sète and Tanger, and vice versa, without crossing Barcelona? According to the website " Ferries to Sicily, Sardinia, Morocco, Tunisia, Spain, Albania and Algeria \| GNV ", this ferry route is still available, but I want to confirm it is still active locally.  
     
   Thanks in advance for your help\!

2. **发言者 2**（引用未收录发言）：For other routes \(bus for instance\), we can say that it’s a exit only or enter only stop. For ferry, I haven’t seen a similar thing. Any advice?  
     
   Here A-B and B-A are not possible, just A-C \(via B\), B-C, C-A \(via B\), C-B.  
     
   Of course, at B you can try to exit. But be prepared to have trouble with customs…

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：-Stargazer- \| Music Track \| Needing Opinions  
     
   Hey\! just looking for feedback on my music for my game\! just rate it 1-10 on what you think how good it is\! the music is on 某社区 and the track is name -Stargazer-\!  
     
       
       \[图片省略\]

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：当我使用网页端访问 Claude 登陆的时候，点击 Account 之后，发现 Where you’re logged in 里面的 Device 和 Location 都能正常显示 VPN 对应的信息，且目前 Claude 网页端可以正常使用 Pro 的所有功能。  
     
   但是，如果 Claude Code 登陆并 Authorize 的时候，Location 就会显示为 Unknown，感觉这是个潜在的风险，不敢继续使用害怕被封。请问大家使用的时候遇到过这种情况吗？

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：FUGLOY FINGERLESS MITTENS - INCREASES  
     
   Hi, just wanted to check that I am thinking correctly: am I right in thinking, that to do my 7 increases every other row, I increase the yo’s. Eg. for round6  
     
   \[图片省略\]IMG\_84471678×1576 537 KB  
     
   , it should be ‘k1, yo, p5, yo, k1’ ..p25

2. **发言者 2**（回复第 1 条）：Yes, that’s it. The increases are every other round. The increases are forming the thumb gusset as the sts between the yarn overs increase by 2sts each time.  
     
   \[链接隐去\]

3. **发言者 1**（回复第 2 条）：Many many thanks\! So grateful

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 斷頭  
     
   同事平常都有去上理財課，  
   也常常拿著商業周刊，工商雜誌研究。  
     
   今天上班他一直看手機也常常去廁所。  
     
   然後有聽他持續唸唸有詞地說：「斷頭…斷頭...斷頭…」  
     
   聽起來有點恐怖，有沒有人知道這是什麼意思，只知道大概跟股票有關？  
     
   女版的小資女孩兒們一起來聊聊吧！

2. **发言者 2**（回复第 1 条）：簡單來說，就是「借錢買股票卻跌太

3. **发言者 2**（回复第 1 条）：多，券商怕你還不出錢，直接幫你把

4. **发言者 2**（回复第 1 条）：股票賣掉還債」。

5. **发言者 3**（回复第 1 条）：路易十六

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：公司收益砍半，已经在变相逼离职了，小肥我今年刚毕业，准备考明年的研，就是没想好考学校层次低一点的热门专业还是好学校的天坑专业\(つд⊂\)，求肥哥们给点建议

2. **发言者 1**：本科是双非一本软工，现在的工作是后端，出来找不到下家\(;´Д\`\)  
     
   因为本科是为了热门专业没去211，结果读了四年出来这专业也变天坑了，所以研究生就想读个好学校

3. **发言者 2**：试试农林生态类学科\( ﾟ∀。\)7

4. **发言者 3**：现在很难说什么专业不容易被淘汰吧，不如选个喜欢的\( ﾟ∀。\)

5. **发言者 1**（回复第 3 条）：\[引用第 3 条\]  
     
   农林是不是太天坑了\( ﾟ∀。\)。。。我能接受的最坑也就是生医工或者跟半导体不沾边的材料

6. **发言者 2**（回复第 5 条）：\[引用第 5 条\]  
     
   \(\`ᝫ´ \)进可考公农业局林业局，退可返乡包地种田

7. **发言者 4**：天坑专业…学出来能干嘛\( ﾟ∀。\)7  
     
   如果专业不对口，简历就只剩本科学历了

8. **发言者 1**（回复第 7 条）：\[引用第 7 条\]  
     
   主要是找个事儿干，我现在本科没干两月被裁，而且行业也完蛋，只能考研了，要gap期不长的话只有这俩选择了\( ・\_ゝ・\)

9. **发言者 5**（回复第 5 条）：\[引用第 5 条\]  
     
   生医工肥泪目了\( ;´д\`\)

10. **发言者 1**（回复第 9 条）：\[引用第 9 条\]  
     
   肥哥组里去向怎么样ᕕ\( ﾟ∀。\)ᕗ

11. **发言者 1**（引用未收录发言）：\[引用未收录发言\]  
     
   这也是赌嘛，万一三年后热门还是热门呢  
     
   老实择校很枯燥吧.jpg\(　ﾟ 3ﾟ\)

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：做了个面向 Apple Silicon Mac 的 Antigravity 辅助工具 \*\*GravityBox\*\*，今天刚整理完 \*\*v1.1.1\*\*，有这个需求的 网友可以试一下。  
     
   GitHub 仓库：\[链接隐去\]  
     
   ---  
     
   \#\#\# 为什么做这个工具？  
     
   迫于 Claude 封号，ChatGPT 用烦了，Carbon 和 Hydrogen 发布后我感觉 Gemini 又可以了，所以最近高强度使用 Antigravity。但 Antigravity 本体太糙了，很多顺手的功能都没有，就跟着自己的实际痛点搓了一个。（本人不是程序员，完全是根据自己的需求指挥 AI 做出来的）  
     
   \#\#\# GravityBox 做了什么？  
     
   一个基于 Swift 6 / AppKit \+ 内置 Node 22 的原生伴侣，\*\*零修改 \`/Applications/\[链接隐去\]  
     
   - \*\*实时 HUD\*\*：输入框下方直看耗时、TPS、Token 费用、上下文水位与自动压缩次数。  
   - \*\*中英秒切\*\*：支持中英界面零重启实时切换（已适配官方 \`2.23.0\` ~ \`2.32.2\`）；习惯官方原版英文的也可以只开英文版 HUD。  
   - \*\*配额透视\*\*：严格拆开 5 小时与每周额度及精确重置时间，菜单栏随手可查。  
   - \*\*安全切号\*\*：低额度推荐备用号，不后台强杀，退出 IDE 后快照切换且异常自动回滚。  
   - \*\*本地账单\*\*：只读统计分周期消耗与缓存省钱比例，支持逐条明细检索及 JSON 导出。  
   - \*\*无损瘦身\*\*：隔离保护聊天与凭据，仅清理缓存和旧日志进废纸篓，随时可一键撤销。  
     
   ---  
     
   \#\#\# 说明与运行要求  
     
   - \*\*环境要求\*\*：macOS 14\+、Apple Silicon（M 系列全系芯片），仅针对官方正式版 Antigravity，安装包内置运行环境无需另装 Node。  
   - \*\*隐私边界\*\*：MIT 开源，\*\*零遥测零上报\*\*，数据仅存本地 \`~/Library/Application Support/GravityBox\`（自动检查更新和同步价格表默认均关闭）。  
   - \*\*首次打开\*\*：个人开源项目未购买付费 Apple 公证证书，首次打开若被拦截，在「系统设置 → 隐私与安全性」点“仍要打开”，或在核对 \`.sha256\` 后执行 \`xattr -cr /Applications/\[链接隐去\] 即可。

2. **发言者 2**：不错，我来试试

3. **发言者 1**（回复第 2 条）：\[引用第 2 条\] 感谢支持

4. **发言者 3**：账号-添加账号-浏览器登录, 点击后提示"未配置 Google OAuth 凭据，请在 .env 中配置 GRAVITYBOX\_GOOGLE\_CLIENT\_ID 与 GRAVITYBOX\_GOOGLE\_CLIENT\_SECRET", 这个如何设置呢?

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Warning dans les logs suite mise à jour vers 12.1.42  
     
   What type of hardware are you using: Old laptop or computer  
     
   What YunoHost version are you running: 12.1.42  
     
   Describe your issue  
   Bonjour, suite à la dernière mise à jour, j’ai quelques soucis et dans les logs je ne sais pas si c’est important. Qu’en pensez-vous ? On vous remerciant.  
     
   Share relevant logs or error messages  
   \[链接隐去\]

<!-- samples:end -->

