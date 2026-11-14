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

采集时间：2026-11-14 13:49:23（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Oee

### 讨论 2

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

### 讨论 3

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Animation player foreign problem  
     
   Godot Version  
   4.7  
     
   Question  
   so it can be clear form th ebegining i am not wokring on windows i am working on tablet dex mdoe so files work diffrently and the rpoblme is that i moved my animtion player form my 2d game proejct to another 3d game roject and then puted the file back to the 2d project and now i cant edit or move or put any new keys or add keys and when i click animtion then mange animtions i find that writen near every animtion and the root node and eveyrthing sayes foreign near it instade of built-in and now i am stuck ic na tedit naything on the naimtion is it possible to fix

2. **发言者 2**（回复第 1 条）：Not a solution to your issue, I know, but it may help if you could invest in a keyboard for your tablet, maybe..? \[图片省略\]

3. **发言者 3**（回复第 1 条）：You may be able to make it unique and save it again to this project, with this floppy disk icon.  
     
   \[图片省略\]image674×461 58.5 KB

### 讨论 4

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：最近 codex 特别慢， 尝试体验以下 CodeBuddy Trae 这些。 发现国模\(主要用 glm flash deepseek flash\)真的效果还是可以的， 不光更便宜，整体其实效果还行。整体下来比 codex 价格合适。  
     
   另外还有一个感受就是即使不用手写代码，但是最好还有一个编辑器，在类似 CodeBuddy trae 这种编辑器里面使用 ai 的时候感觉 ai 对项目整体的感知能力会更好，比如我用 openspec 产出好的 task ，CodeBuddy trae 可以比较顺畅的沿着计划执行下去， 但是 codex 无论是客户端 cli 还是嵌入到 zed 中都总是卡壳断在某个任务上停止。   
     
   再有就是编辑器中可以连远程机器，直接可以交给 ai 去操作，以及编辑器里打开浏览器去操作验收功能，尽管 codex 也有这种能力，但是要占用系统的 chrome ，相比之下感觉放到编辑器中开个浏览器似乎更友好一点。感觉比起一些各种自己配置的编辑器不如这种拿来就用的效率高，而且相对还更成熟。  
     
   当然顶级模型应该还是国外的领先，我用 codex 也只是 gpt6 sol 和 gpt6.1 terra ，也不敢开太高，主要额度用的太快了。   
     
   最近使用的一点感受，不知道你们感受如何

2. **发言者 2**：以前的国模还是去美空看  
   现在嘛  🤣

3. **发言者 3**：用着用着你就会发现会流口水

4. **发言者 4**：其实是 codex 最近太拉了,连之前流口水的谷歌现在 gemini 4 hydrogen / carbon \+ 反重力都比 codex 好用的多。  
   国模确实还行，但是跟 a/和谷歌比好用和效率上还是差的有点远，尤其是 hydrogen 真的可以叫又便宜又快又好了。

5. **发言者 5**：好久没用 Kimi K3 了，不知道最近降智了没，之前用起来体感上和 Astra 同一档，就是太贵

6. **发言者 6**：其实对于多数人来说并没有那么多复杂的场景需要用那么先进的模型。我现在全部用国产模型了，公司可以免费报销国外的现金模型也懒得去折腾搞

7. **发言者 7**：opus 4.6 的水平现在仍然相当可用。前沿模型单纯智力差异在普通任务里可感知的差异越来越小。

8. **发言者 8**：cc 昨天终究还是被封了，正在准备支持国产

9. **发言者 9**：用 codex 降智明显，反而是 deepseek flash 用起来又快又好

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：finally vent  
     
   我必须要阻止你，肥哥，一但杀了一个人，就再也没法回头了\|ー\` \)

2. **发言者 2**：那正如我所愿\(・ー・\)

3. **发言者 3**：取、取岛用岛\( ﾟ∀。\)

4. **发言者 1**：龙骑真好看啊，真嗣好漂亮啊

5. **发言者 4**：一但是谁

6. **发言者 5**：加油

7. **发言者 1**（回复第 5 条）：\[引用第 5 条\]  
     
   ZqM

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Arduino Q allowing python udp  
     
   hello there, I'm running an udp  app that send string over udp how to properlly allow port 50555/udp  the project yaml file have a line for ports:\[\] but it's unfortunately read only  
     
   so far my python app run, but nothing get out from the udp port dispite the socket opened successfully,  
     
   what I missing ?

2. **发言者 1**（引用未收录发言）：apparently there is no port forwarding set from the container, so overriding the yaml can be doable from external import but I don't know the exact syntax may be port: -50555/udp   what is your guess ?

3. **发言者 1**（引用未收录发言）：exactly, what I need, thx

4. **发言者 2**（回复第 1 条）：You are welcome. I'm glad if I was able to be of assistance.  
     
   Regards, Per

### 讨论 7

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

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Coordinating Star Bag and Tablet Cover  
     
   \[图片省略\]10000281851920×2550 1.41 MB  
     
   \[图片省略\]10000281641920×2410 567 KB  
     
   A few weeks ago, I stumbled across a star shaped tote bag pattern on Etsy, saved it for later, and then completely forgot about it. A random 某社区 video popped up, someone making the same bag from the same pattern\! It was not difficult, but it was a lot of ironing, and it’s still a little wrinkled from turning it inside out. The pattern provided some smaller stars for decoration, but they were so small\! I made my own and stuffed it with scraps, and I already had the chain/ring. I’m definitely going to make the larger size next.  
     
   \[图片省略\]10000281801920×2550 1.85 MB  
     
   \[图片省略\]10000282071920×2550 1.88 MB  
     
   I really liked the fabric I used on the star, and I needed something to keep my tablet in. I was amazed, my machine went through two layers of batting, the lining, outer fabric, and the lace\! I wanted to add a snap, but my snap pliers went missing. I used bias tape to tie the cover shut instead, and I think I like it better. It fits in the star bag with room to spare\!

2. **发言者 2**（回复第 1 条）：Cute\! That star back could be very versatile for gifting, too\!

3. **发言者 1**（回复第 2 条）：Thanks\! Gifting one is a great idea\! :pink\_heart:

4. **发言者 2**（回复第 3 条）：They’d be great gift bags\!

5. **发言者 3**（回复第 1 条）：What an adorable tote and tablet bag\!

6. **发言者 1**（回复第 5 条）：Thanks\!

7. **发言者 4**（回复第 1 条）：Very nice, blue is my favorite color. Love the colorful charm.

8. **发言者 1**（回复第 7 条）：Thanks\! I’ve seen a bunch of bag charms like that lately on social media, and even with adding the eyelet, it was easier than I thought.

9. **发言者 4**（回复第 8 条）：I’ve seen them too. I need to look into make me some for my bookbags

10. **发言者 3**（回复第 1 条）：:maple\_leaf: :fallen\_leaf: :maple\_leaf: Congratulations\! Your Coordinating Star Bag and Tablet Cover are a Featured Project this week\! :maple\_leaf: :fallen\_leaf: :maple\_leaf:

11. **发言者 1**（回复第 10 条）：Thanks\! :pink\_heart:

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 以為是A菜\(買錯了\)  
     
   傷腦筋  
     
         菜市場又再一次的買錯了  
     
         自以為是A菜  
         煮來吃發現味道不對  
         好像比較刺激辛辣感  
     
         買成小芥菜或是油菜了吧  
         網路上照片也大概比對了一下  
     
         好像是有些牛肉麵店附的青菜  
         很常使用的菜就是了  
         吃到飽餐廳  
         也遇過可能是這個菜的中式料理  
         基本上都吃不習慣  
     
         不知道是菜價比較便宜還是怎麼樣  
         比較被廣泛採用吧

2. **发言者 2**（回复第 1 条）：芥菜醃製後才會變牛肉麵的酸菜

3. **发言者 3**（回复第 1 条）：妳多大了？怎麼還不會看菜選菜嗎？

4. **发言者 4**（回复第 1 条）：原po是男的

5. **发言者 5**（回复第 1 条）：可以問攤販

6. **发言者 6**（回复第 1 条）：沒關係 至少我們認識它了！

7. **发言者 7**（回复第 1 条）：你是不是買到甜椒 還問辣不辣?

8. **发言者 8**（回复第 1 条）：買菜之前可以問問賣菜的老闆

9. **发言者 8**（回复第 1 条）：這樣可以確保買到想吃的青菜

10. **发言者 9**（回复第 1 条）：不嚴重辣 我當年可是青龍椒混朝天椒

11. **发言者 9**（回复第 1 条）：一鍋炒請全家吃

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Inspector Gadget  
     
   \[图片省略\]4096×4096 1.11 MB  
     
   \[图片省略\]4096×4096 796 KB  
     
   \[图片省略\]4096×4096 849 KB  
     
   \[图片省略\]4096×4096 1.31 MB

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Yarn for double knit scarf?  
     
   I’m thinking to make my first ever double knit scarf for a friend and found a pattern/grid for what design I want, but the creator didn’t list the yarn they used\! They stated its 432 rows long and I want it to be about the regular length and drape of an adult scarf, what size/type of yarn \(\+ size of needles\!\) should I be using?  
     
   Thank you :slight\_smile:

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Preprocessing best practices for bit depth and compression  
     
   I’d love to get feedback on a performance improvement I’m looking at for my preprocessing script \(GPS\_Preprocess.py\), which previously set bit depth to 32 and no compression for all steps  
     
   The performance improvement sets bit depth to 16 and compression to gzip2 with quantization of 0 \(lossless?\), for all steps prior to stacking. For stacking it sets the bit depth to 32 and turns off compression.  
     
   My script supports drizzling with scale factors and the images look to be saved as 32 bit to drizzletmp, I’m I correct to use gzip2 with quantization of 0 to ensure they are losslessly compressed?  
     
   In testing it is ~2X faster and consumes less disk space and memory. The final stack looks to be visually comparable to my previous 32 bit and no compression runs and with similar noise and SNR values.  
     
   Is this approach a good idea or will it lose signal vs 32 bit depth and no compression?  
     
   Thanks in advance

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Fixing a WebKit bug to see if promises are made of train tracks

2. **发言者 2**（回复第 1 条）：Nice to see a breakdown of a bug fix like this these days

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Christmas  
     
   There. I said it.

2. **发言者 2**（回复第 1 条）：Lol. I had my first ‘no can do because it’s too close to Christmas’ yesterday. I wanted something delivered next week. :joy:

3. **发言者 3**（回复第 1 条）：\[图片省略\]IMG\_45971170×1137 152 KB

4. **发言者 4**（回复第 3 条）：Noddy ready for another cash windfall, through all the royalties. :grin:

5. **发言者 5**（回复第 1 条）：Excommunication surely follows any mention of C\*\*\*\*\*\*\*s before December

6. **发言者 6**（回复第 1 条）：Easter eggs in the shops in one week…

7. **发言者 7**（回复第 6 条）：I remember, just after Easter one year, I went to the supermarket and there was a choir singing Carols .  
     
   My comment about it being a little premature , was met with the response about knowing what the day was?  
     
   I said no, and was reminded it was Ist April.  
     
   :man\_facepalming::man\_facepalming::flushed\_face::flushed\_face:

8. **发言者 1**（回复第 5 条）：Strangely enough, the last thing the bowl of petunias thought was: “Oh no, not again.”.  :wink:

9. **发言者 8**（回复第 7 条）：:joy:

10. **发言者 9**（回复第 1 条）：If you do it next year, i might have to block you on the forum……if i can remember:wink:

11. **发言者 10**（回复第 1 条）：I’ve seen a house with a tree up already. To each their own i suppose.

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: What customer acquisition channel is working best for you?  
     
   What customer acquisition channel is working best for you right now?

2. **发言者 2**（回复第 1 条）：turning it back - what's working for you?I have grok bot setup to monitor social media \+ blogs in domains related to my area, so I can do reachouts based on demonstrated interest

### 讨论 16

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Les p'tits jeux solo de TechDweeb  
     
   Article publié sur : Les p'tits jeux solo de TechDweeb - 某社区.fr  
   Dans ma quête de RPG solitaires \(dont je vous parlais déjà ici\), je suis tombé sur un petit gars plutôt sympathique et débordant d’idées, l’ami TechDweeb, créateur de quelques petits jeux solo minimalistes qui méritent le coup d’œil. « Je n’ai pas de taf, je vis chez ma maman, je fais des vidéos 某社区, et mon chat me déteste ». C’est en…

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：如题，我面过 tx 外包，字节外包，从来没碰到过需要提前下载客户端的情况，我一般都是面试前半小时才下载进入房间。我就很好奇，早不取消，偏偏面试前一小时告诉我取消了，何意味？难道候选者提前下好钉钉点击确认参加，就真的会赴约吗？😂  
     
    \[链接隐去\]

2. **发言者 2**：双向选择的事情，其实没啥。

3. **发言者 3**：投诉他

4. **发言者 1**：发言者 3 投诉就算了，我感觉取消了也好，正好周五放松下 \[链接隐去\]

5. **发言者 4**：发言者 1 还好没面试，这要是通过了去了，才发现是个事逼儿，后悔都来不及😑

6. **发言者 5**：挺好的，他觉得你也不是很想来，你觉得他事儿逼，双向放弃，互相节省时间

7. **发言者 6**：中间有一段你隔了一天都没回复他 这好吗

8. **发言者 6**：还有人家都祝你面试加油了你也不回谢一下

9. **发言者 1**：发言者 6 没有日程提醒这个不回也没啥吧，都是成年人了，约好的面试难道还会忘吗 \[链接隐去\]

10. **发言者 7**：既然多次提醒你加入日程，应该在他们那边这个很重要，如果这还没引起你的注意，那确实不去也罢

11. **发言者 8**：提前准备一下呗。一般一面的面试官也都是牛马，一堆事要处理，你不加日程人家可能怕忘了或者心情不好就直接换了，面试本来就是运气占大半的，有的甚至开视频那一瞬间看到对方就直接给过不了，无关技术。现在求职的人又多还处于弱势方，所以人家不在乎。

### 讨论 18

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：So. \(08.11.\) PnP: Cyras Cosmic Quest III - The Void Seed mit Nils  
     
   Moin,  
     
   Sonntag spielt Nils bei einem Pen &amp; Paper  Abenteuer mit, jedoch außer Haus fernab einer RBTV-Produktion. Im Sendeplan ist daher auch bewusst die Rede von einem „Restream“. Gesponsert wird es von Congstar.  
     
   Das Pen&amp;Paper wird ab 16 Uhr auf den RBTV Kanälen gestreamt.  
     
   Spielleiter: Alexander Karnstedt  
     
   Teilnehmende: Nils, Baso, Jennyan, Kadditv und Leon von Bonjwa  
     
   So sah zum Beispiel eine vorherige Ausgabe aus:

2. **发言者 2**（回复第 1 条）：Aah, das „no VoD“ bezieht sich dann auch nur darauf, dass RBTv sich nicht darum kümmert / in der Mediathek haben wird, aber die anderen Streamenden oder Congstar schon, richtig? Entschuldige, dass ich doof nachfrage.

3. **发言者 3**（回复第 1 条）：Habs gestern komplett verfolgt und hat mir tatsächlich gut gefallen. Vor allem die Baso/Nils Kombo\! Von der anderen Seite des Tisch’s kam ja ausser von Kaddi leider nicht sooo viel.  
     
   Ich werd auch mal in die vorigen zwei Teile reinschauen.

### 讨论 19

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] Nvidia輝達黃仁勳還有機會來台灣開兆元宴  
     
   自從2024黃仁勳旋風來台  
     
   去了台北、台中 許多地方  
   也造就許多夜市小吃  
     
   每次來會見大咖  
   會有一波台灣股票大漲的題材  
     
   Nvidia輝達黃仁勳最近發生些事情  
   還有機會來台灣開兆元宴嗎？  
     
   台灣好不容易景氣好轉  
   和帶動台灣國際知名度的機會  
     
   之前和黃仁勳一同吃飯的台灣企業大佬  
   有沒有安慰一下Jensen Huang  
     
   -----  
   Sent from J某社区 on my SHARP SH-Z60.

2. **发言者 2**（回复第 1 条）：情慾流動宴

3. **发言者 3**（回复第 1 条）：不是有沒有機會 他沒要宣傳公司就

4. **发言者 3**（回复第 1 条）：不需要了

5. **发言者 4**（回复第 1 条）：有的,每個都打電話給Jensen了

6. **发言者 5**（回复第 1 条）：他還能不能出國都是個問題

7. **发言者 6**（回复第 1 条）：\[链接隐去\]

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Clear self study sentences  
     
   Hi there  
     
   I got a lifetime membership long time ago already and in the past I learned a lot with 某社区.  
     
   Long dtory short: I did a learning break, very long time did not use the app and want to start from 0.  
     
   I reset all data but for self created content you cannot do that. At least I did not find it how to do it.  
     
   I searched the forum here as well and found a post with a similar issue where it seemed one of the developers added a button in the specific user account to clear reviews for self created content as well.  
     
   Would this be posssible for my account too?  
     
   I would really appreciate it.  
     
   To be clear, I don’t want to delete the sentences just putting them out of the review section

2. **发言者 2**（回复第 1 条）：Welcome back\! :wave:  
     
   I believe this is the section in the Reset Settings page:  
     
   \[图片省略\]  
   Screenshot 2026-11-09 at 14.29.471058×316 25.6 KB

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Re-engineering sweater to knit in wool not acrylic  
     
   Hey folks,  
     
   This is my favourite sweater, but it’s factory made in acrylic and has pilled so badly I can’t wear it.  I would like to re-engineer it and knit it again in wool.  
     
   Can anyone help identify what the central panel stitches are please?  I’m calling them little V shapes followed by larger V shapes and using AI to help create a stitch by stitch guide.  If anyone has any hints or tips, that would be amazing.  
     
   Also wondering whether anyone has any suggestions for which wool to use?  I was thinking a merino, in aran weight, but really happy to take advice from anyone who’s had particular success with a particular wool for cables.  I’m going to knit it in black.  Want to avoid the pilling issue of the original.  All help very much appreciated and received with huge thanks.  
     
   \[图片省略\]image797×789 177 KB  
     
   \[图片省略\]image598×589 93.4 KB

2. **发言者 1**（引用未收录发言）：Thank you so much, that’s super helpful.  I have both those books, but I’m looking forward to checking out the tutorials you’ve linked.  So appreciate your time and guidance.

3. **发言者 2**（回复第 2 条）：Cables are so much fun to work. This is going to be a beautiful sweater\!

4. **发言者 3**（回复第 1 条）：Definitely make a swatch of your cable pattern…they may not show well in black. I’d hate for you to do all that work and have it not be seen\!  And swatching gives you a great chance to practice the stitches.  
     
   I have a cardigan that I love, made from West Yorkshire Spinners “Fleece” yarn, which is 100% Blue-faced Leicester.  It’s so soft and comfy\!  Though it does pill a bit under the arms.

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How I Ended Up Turning a 22-Year-Old PostgreSQL Type-Confusion Primitive into RCE \(CVE-2026-6460\)

2. **发言者 1**（回复第 1 条）：Very nice deep dive into the Postgres internal type system. The investigation was LLM-assisted and the post has some highly questionable visualizations, but the blog post text looks hand-written.

### 讨论 23

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Nvidia  
     
   After $330 Billion being wiped off of Nvidia’s value today, maybe people with gaming PC’s might be able to look forward to lower prices for graphics cards. After all, if a high percentage of Nvidia’s output ends up in China and that now stops, it could mean that Nvidia will have to rely on it’s core business. Which was gaming graphics cards.

2. **发言者 2**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   Nvidia’s output ends up in China  
     
   Queue Franky H.  
     
   I don’t think it’s going to bring NVidia back to the gaming stuff, money corrupts. I see it within my employers company.  
     
   We’ve two Shields, they’re great.

3. **发言者 3**（回复第 1 条）：Stock drops are all about uncertainty. Once things settle they’ll recover and it’ll likely be like it never happened. I doubt they will voluntarily stop selling to China either.

4. **发言者 4**（回复第 1 条）：A second affair now reported on BBC radio.

5. **发言者 4**（回复第 1 条）：Board apparently considering showing Huang the door.  
     
   The question has been asked about Nvidia’s future without him.

6. **发言者 3**（回复第 1 条）：Do kinda think that if we addressed such affairs with a consistent eye rhen most such orgs would be operating with imterim top people most of the time. Power imbalances always produce this outcome. You either find someone you perceive as an equal or abuse your power.

7. **发言者 5**（回复第 1 条）：Any company should be more than just one man. Sack him and move on.

8. **发言者 6**（回复第 1 条）：With Photoshop now telling me that my “already pretty d\[某参与者\] hot” graphics card is not up to snuff for local AI processing, I am thinking that I need to pull the trigger on the “even hotter” one I’ve been considering\!

9. **发言者 3**（回复第 7 条）：It’s the model though. Most start with one person and thus de facto buy into charismatic leadership because they perceive from the off that it’s the thing which made them successful.

10. **发言者 7**（回复第 1 条）：He is out, the  CFO will take interim CEO position.  
     
   Reports the board already hired a firm to find another CEO, now a company built around one man must learn to run without him.

11. **发言者 8**（回复第 1 条）：Well, seeing what is happening here I’m relieved that all my money is in Poundland shares…

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Harness Relay – the coding agents you have, working together  
     
   If you already have multiple coding agents\(one kind of agent also works though\), you should really look into this project\! It's a desktop app that brings coding agents working together, with user experience similar to ChatGPT\!One kind of agent is enough for an agent team: all of one kind, or any mix of Claude Code, Codex, Grok, Cursor Agent, Antigravity, GitHub Copilot CLI, Muse Code and five open-source coding agents on your own model backends. For each question, the lead agent designs the team: each member’s role and model, and how they take turns. Once you confirm it, the real agents on your machine work on your code, or any question, and answer each other.It also supports voice input, notification, branching in conversation, task scheduling, and mobile app\(PWA\) support\!If you are interested in this project, please give it a try and star us on the GitHub repo, thanks\!GitHub repo: \[链接隐去\]

### 讨论 25

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

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Nochmal Wanderrouten - was macht man damit?  
     
   \[图片省略\]  
     
         OpenStreetMap  
       
     
       
       \[图片省略\]  
     
   Relation: 169883  
     
     OpenStreetMap is a map of the world, created by people like you and free to use under an open license.  
     
       
     
       
         
         
       
     
       
     
   Ist das Kunst . . . ?

### 讨论 27

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

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Humble bundle vibe update takes out MFA and potentially exposes account info  
     
   I don’t know if anyone here shipped to this humble bundle thing, but it sounds bad for your potential customers.  
     
       
       \[图片省略\]

2. **发言者 2**（回复第 1 条）：I bought there some \[链接隐去\] courses it worked fine.

3. **发言者 1**（回复第 2 条）：Before or after this update? Maybe try and change your password just to be sure? :person\_shrugging:t4:

### 讨论 29

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：目前给弄了个 3 年的定期存款  
     
   希望有点收益,不要太大也不要冒险吧

2. **发言者 2**：每年给孩子屯几根金条，比你那些存款靠谱的多。

3. **发言者 3**：长江电力

4. **发言者 4**：我现在是在银行 app 里买金子

5. **发言者 5**：银行股定投

6. **发言者 6**：纳斯达克

7. **发言者 7**：老派思维

8. **发言者 8**：买国债，年收益率 2.0%左右，10 年期、20 年期都行，每半年付利息

9. **发言者 9**：黄金，虚拟币，纳指

10. **发言者 10**：逢低买金条

11. **发言者 11**：黄金 纳指

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：到清华参加一个学术会议，可以在学校里面转悠转悠。没有什么隐藏的地方值得探索的？

2. **发言者 2**：回来了，都回来了，卧龙岛\( ﾟдﾟ\)

3. **发言者 3**：曾经的酒吧舞蹈。也不再辉煌

4. **发言者 4**：带带我\( TдT\)  
     
   我也想进清华

5. **发言者 5**：我20年前把我的相机套忘在清华了，可以帮我找找吗

6. **发言者 6**：教授的屁股只能摸一次\( \`\_っ´\)

7. **发言者 7**：我大专你问我？

8. **发言者 8**：清华好像没北大好玩

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Move compilation popup  
     
   The compilation popup appears in the bottom right of my IDE 2.3.10. Often when compiling it covers important information in the output panel and, to a lesser extent, in the serial monitor. How can I move it?

### 讨论 32

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Neues Hauke PnP Mittelalter  
     
   Hallo zusammen ich hoffe es gibt nicht schon bereits ein Beitrag dazu.  
     
   Trotzdem wollte ich es teilen für alle, bei denen es noch nicht auf der 某社区 Startseite aufgetaucht ist\!\!

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Sweet Little Art Dolls  
     
   \(Tutorial added: Art/Scrapy Doll Tutorial \)  
     
   I made these dolls years ago, maybe 2018 or 19,  for our church craft fair, and they were well received.  
     
   So it was time again to use up some scraps. I made 10 dolls, each about 12" tall, with their bodies 6.6" tall. I had so much fun mixing and matching colors.  
     
   \[图片省略\]20261107\_1636141920×1848 809 KB  
     
   \[图片省略\]20261107\_1637271920×1617 754 KB  
     
   \[图片省略\]20261107\_1636491920×1766 761 KB  
     
   \[图片省略\]20261104\_1239211920×3413 1.25 MB  
     
   \(Tutorial added: Art/Scrapy Doll Tutorial \)

2. **发言者 2**（回复第 1 条）：Those are adorable\! I love the patterns you chose and their faces are great.

3. **发言者 3**（回复第 1 条）：Very cute\!

4. **发言者 4**（回复第 1 条）：They are adorable\! Are you using a specific pattern?

5. **发言者 1**（回复第 4 条）：I made the pattern myself. It is pretty simple, Front/back, arms, and legs. Well, I do a head/body thing. I’ve used the same poor homemade paper pattern for years, it is getting limp and tattered. If any one wants a tutorial, I could make them.

6. **发言者 5**（回复第 5 条）：Love them. And a short tutorial would be lovely. I have sooooo much fabric. Thanks.

7. **发言者 6**（回复第 1 条）：Cute, cute\!  
     
   I bet all 3 of my grands would like these\!  
     
   I vote Yes on a tutorial

8. **发言者 7**（回复第 1 条）：Nice\!  What do you stuff them with? \(I feel like I’ve seen similar things both as light weight rag dolls and as weighted dolls that can sit up.\)

9. **发言者 8**（回复第 1 条）：This are so dang cute\! The design fits the scrapiness so well. And they’re little faces\!

10. **发言者 1**（回复第 8 条）：Just regular stuffing. I like the idea of a weighted bottom. Thanks.

11. **发言者 9**（回复第 1 条）：They are all so fun and colorful\!

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[板務\] 取消板主任期制以及提高每日發文上限  
     
   女板實施任期制是因為多年前  
     
   女板人數眾多，  
     
   板主負荷大  
     
   因此採取汰換制度  
     
   唯現今某社区使用者日趨減少，女板更少  
     
   其實不需要經常更換板主  
     
   所以建議可以取消任期制度  
     
   另外，以聊天群組來說，  
     
   女板的每日可發文的數量太低，只有三篇  
     
   勢必影響發文意願  
     
   事實上現在每日的發文就經常不到10篇，  
     
   難以說是在交流。  
     
   如果擔心有人連續發文洗板  
     
   可以透過配套板規  
     
   例如限制隔半小時才能再發一篇  
     
   或是需要其他人發文後才能發新的文章等等方式  
     
   避免連續發文洗板  
     
   因此建議提高至一日至少10篇文章  
     
   讓願意發文的板友有個正常的發文空間。  
     
   以上板務建議  
     
   希望女板越來越好

2. **发言者 2**（回复第 1 条）：一天10篇太多了啦。3~5篇差不多

3. **发言者 2**（回复第 1 条）：贊成限制間隔30~60分鐘再次發文

4. **发言者 3**（回复第 1 条）：一天3篇就很多怪人洗文了

5. **发言者 4**（回复第 1 条）：每天三篇的幾乎都是爛文章 提高只

6. **发言者 4**（回复第 1 条）：是增加爛文章比例而已

7. **发言者 4**（回复第 1 条）：廢除任期制度之前有投票過 民主國

8. **发言者 4**（回复第 1 条）：家大家還是不喜歡萬年皇帝

9. **发言者 4**（回复第 1 条）：至少大家希望決定權還是在人民手上

10. **发言者 5**（回复第 1 条）：現在也沒在定期選板主了 基本就跟

11. **发言者 5**（回复第 1 条）：萬年板主無異

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Nodevember 2026 - Day 4: Brass  
     
   \[图片省略\]0120960×540 44.2 KB  
     
   \[图片省略\]04-brass-nodetree1920×1032 145 KB  
     
   Timelapse:  
     
       
       \[图片省略\]

### 讨论 36

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

### 讨论 37

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：KIT COUTURE - FUGLOY FINGERLESS MITTENS  
     
   A question on the chart which I attach as well as the instruction - bear in mind there are 56 stitches cast on.  
     
   Am working on the RH Glove, so according to the chart I start one stitch in.  
     
   Having been asked to mark the 31st stitch, I am confused by the chart instruction: - the repeat asks me to yo p2tog tbl - 4 times - within a 6 stitch repeat.  I work out that if I am to follow the chart I am missing on stitch from that first row, before the 31st stitch I need to knit?  
     
   \[图片省略\]IMG\_8437320×122 13.8 KB  
     
   \[图片省略\]IMG\_8440320×284 30.4 KB

2. **发言者 2**（回复第 1 条）：56 sts  
     
   The 31st stitch is marked.  
     
   The chart for right glove  
     
   1 st, 6×4 = 24 sts, 5 sts = 30  
     
   The next stitch is stitch 31 which is marked.  
     
   The pattern says knit this marked stitch  
     
   Purl 25  
     
   Total 56  
     
   You perhaps got confused and thought you needed to work 31 sts of chart, but just 30 is correct.  
     
   I hope this helps

3. **发言者 2**（引用未收录发言）：You’re welcome.  
     
   We all miss things, sometimes we just need someone else to check something.  
     
   Enjoy the rest of your project.

4. **发言者 1**（回复第 3 条）：Thank you\!

### 讨论 38

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Documentation for Raw Therapee  
     
   I’m having trouble finding documentation for Raw Therapee. I go to the Rawpedia page and it only has an index page with nothing there.

2. **发言者 2**（回复第 1 条）：\[链接隐去\]

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Terminal borders that don't cost a cell

2. **发言者 2**（回复第 1 条）：What would people do to not use a proper GUI library.  
     
   I mean, it’s cool but we’re like \*this\* close to adding \`inset\`, \`outset\`, \`groove\`, and \`ridge\` styles and it’ll be basically Motif/win95, only on a grid.

3. **发言者 3**（引用未收录发言）：Can you expand a little what distinguishes this from a full GUI, especially in light of projects like \[链接隐去\] which render Wayland into a terminal with sixels?  
     
   As far as I can tell, the main difference is the kind of styling that's easy to do, and the amount of fallbacks and variations needed if your terminal handles different features differently in termcap.

4. **发言者 4**（回复第 1 条）：I love this\!  
     
   Does it fail gracefully in terminals without support and just not render the lines?

5. **发言者 5**（回复第 1 条）：Ghostty is starting to remind me of Chromium; a place where new standards for a platform are unilaterally inserted and by which others are pressured to adopt due to popularity. I don't want to end up in a world where 90% of "TUI" apps actually require ghostty and will not render reasonably in any other terminal.

6. **发言者 1**（回复第 4 条）：Yes. assuming the terminal is well behaved. As a simple test, both the Ratatui apps degrade fine in tmux under \[链接隐去\] if it's any indication of things not breaking hard \(notoriously a painful combo\). The detection logic in the spec is just normal stuff you'd expect.

7. **发言者 3**（引用未收录发言）：I'm not sure why they're not considered GUIs. As capabilities get added, the distinction seems like it's become negligible, and the main difference seems to be that the rendering is flakier and less capable.

8. **发言者 1**（回复第 7 条）：A good answer to this might be to ask yourself how would labeling them GUIs make something clearer?

9. **发言者 3**（回复第 8 条）：They are GUIs. The main distinction, as far as I can tell, is that there's a little bit less setup to access them remotely, in exchange for a worse user experience. But that additional setup doesn't seem to be a fundamental limitation of the technology.

10. **发言者 6**（回复第 1 条）：I like the idea\!  
     
   The log example's borders touch the text which is looks pretty bad IMO, and might make reading harder depending on the language.    
   I wonder if the protocol can mandate a visual separation.

11. **发言者 1**（引用未收录发言）：Yeah, I can see how this would be pretty nice for lnav.

### 讨论 40

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

### 讨论 41

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: String\#to\_proc\` to Help Traversing JSON  
     
   I've resuscitated a project I was working on years ago.I was tired of having nested \`flat\_map\` making my code basically unreadable just to fetch a simple value.  
   The idea is to make simple &amp; readable the traversing of deeply nested structures like JSON responses, while staying in Ruby &amp; keeping its flexibility. Here it goes:    graphql\_response.then\(&amp;'\[data\]\[repository\]\[issues\]\[edges\]\*\(\[node\]\[title\]\)'\)  
       \# =&gt; \["Support negative indexes", "Document aggregates"\]  
     
       github\_prs\_response.then\(&amp;'\*\[draft\].any?'\)  
       \# =&gt; true  
     
   It's different from jq or JSONPath in that:   
   - it's a Ruby block so you can use it with \`map\`, \`find\`, etc.  
   - you can call Ruby method from it  
   - it doesn't automatically flatten arrays, you decide  
   - it raises on \`nil\` by default \(unless you use \`&amp;\`, i.e. \`\[customer\]\[address\]&amp;\[city\]\`\)Obviously, it has drawbacks:  
   - it's yet another syntax to learn  
   - it monkey-patches \`String\` which might be a blocker for someI'm really looking for feedback here, what do you think?  
   Is it worth releasing a gem with this value proposition?

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：OsmAnd edits through to September by new user in Northumberland  
     
   Continuing the discussion from Changesets by 'Albert radley':  
     
   They look like someone has discovered with OsmAnd that they can edit the map.  Their last edit was 2 months ago so they may not see changeset discussion comment messages.  If anything looks “obviously wrong” I’d fix it, but some of the edits look to be trying to add genuine new stuff \(even if some names are perhaps beyond even loc\_name\).

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How do I set the default rotation of a mesh before exporting it into a MeshLibrary  
     
   Godot Version  
   4.3  
     
   Question  
   I’ve been using gridmaps and i’ve been liking it, but i have an issue.  
     
   I export all files as glb from Blockbench and copy all the meshes to a scene which i export as a .meshlib \(.tres does not work for me\), but the problem im having is that if i rotate it in blockbench it will be rotated in the scene i paste it, it shows it in the transform tab 45 degrees rotation. but if i place it in the gridmap it defaults to not being rotated.  
     
   I tried editing the mesh library itself but i run into another issue where if i export the meshes again to edit them all setting on the mesh library will be overwritten.  
     
   I remember there being some key bind that would make for example, a scale of 1, 1.5, 1 into a 1, 1, 1 but i cannot find it. Can i do something like that with rotations?

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：港版，游戏只买了旷野之息和马里奥派对。  
     
   聊几点感受以及使用情况：  
   1. 买了内地用的转接头。设置 720p 以后家里电视才连上。  
   2. 每天掌机模式 3 小时，目前感觉右手手腕有点酸  
   3. 旷野之息，电量从 80 到 20 续航仅俩小时。目前 6 血，见怪基本靠炸弹炸半天，正面突很容易死。跑图太累了，山高还特别不好爬。感觉能玩很久，也不敢同时买火焰纹章怕玩不过来。神庙全靠观察，不像古墓丽影会告诉你关键道具在哪。  
   4. 想买双人成行，发现要再买手柄或者一对 joy con ，游戏外设配齐得一点点加钱。虽说买了实体卡可以回血，但估计短时间不可能了。  
   5. 怕小学生上瘾，不敢带着玩。只能晚上跟老婆玩一会。  
     
   总体来说还是很开心的，男人至死是少年，怀念小学去同学家玩双截龙的日子（最喜欢 2 代）。

2. **发言者 2**：跑图的话，搞个 DLC 就有小摩托

3. **发言者 3**：野炊慢慢探索就好啦，跑图很有意思，开地图、开神庙开传送塔，不同的食物、道具与怪物，当然地图太大跑图也会有些浪费时间。打怪慢慢来，我是一直靠武器强度打弱怪的，弹反基本不用，持盾挡住一下攻击再打，怪后退了再挡。

4. **发言者 4**：可以拼个家庭会员，下载 FC ，我每次朋友来都一起玩双截龙双人

5. **发言者 5**：第一次玩野炊吗，新手用好林克时间也可以度过前期困难阶段。

6. **发言者 1**（回复第 3 条）：\[引用第 3 条\]  
   确实太宏大了，古墓丽影十几个小时就能通关。  
   弹反我总感觉反应不跟手，原来可以直接用盾挡的吗？我以为要跟弹反一起才行。  
   而且我总感觉注释不好用，并不像视频里说的注视的时候只有一个怪攻击  
     
   发言者 5 \#4  
   是新手，林克时间还没学？

7. **发言者 6**：跑图可以学下风蛋赶路，但会少很多乐趣。  
   慢慢跑图看风景挺好玩的，这游戏又没有进度压力，想怎么玩怎么玩

8. **发言者 7**：第一次玩野炊不建议去找攻略，影响游戏体验，不要太心急了，慢慢跑图，该有的都会有的。

9. **发言者 1**（回复第 7 条）：\[引用第 7 条\]  
   本来想走主线通关了去火焰纹章，发现不解神庙还不行，血太少。现在围着山跑，直接爬不上去

10. **发言者 6**：发言者 1   
   优先加体力体验会好一些，血量无所谓，反正是瞬间回血。体力够爬的也高。

11. **发言者 1**（回复第 10 条）：\[引用第 10 条\]  
   瞬间回血是啥意思？不加血的话一下就死了

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：梦见岛被某吧和某短视频平台的伪人入侵了，张开闭口就是\+3、典孝急崩乐、神人、小鬼以及emoji黄豆和满口阴阳怪气的脏话，大家都不会好好说话了，红名把置顶串改成了儒雅随和的头像Σ\( ﾟдﾟ\)  
     
   吓死我了，还好是做梦\( ﾟ∀。\)7

2. **发言者 2**：绷，闹麻了，做个梦都要氵一贴，还以为是做雌小鬼魅魔夜袭炸井的梦呢\(\`ヮ´ \)

3. **发言者 3**（回复第 2 条）：\[引用第 2 条\]  
     
   你有dll吗你就叫，有本事把你的dll分享出来啊\(╬ﾟдﾟ\)

4. **发言者 4**（回复第 1 条）：\[引用第 1 条\]  
     
   经验\+3

5. **发言者 2**（回复第 3 条）：\[引用第 3 条\]  
     
   没有度盘会员\( ﾟ∀。\)大小限制传不上去

6. **发言者 5**：（发了一些emoji黄豆和二游神人节奏）

7. **发言者 6**：查询岛演化角度36\[10,100\]

8. **发言者 7**（回复第 2 条）：\[引用第 2 条\]  
     
   缺个黄豆\(\`ヮ´ \)

9. **发言者 8**：\+3

10. **发言者 9**：3

11. **发言者 10**：兰州烧饼\(\`ヮ´ \)

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：The active editor cannot provide outline information  
     
   I have been using outline mode in IDE 2.3.10 lately and have found it is useful and  works fine for a moderately sized sketch for the Raspberry Pico board that I have been working on. However, when I am working on a rather large sketch for an ESP32 devkit 1 board, the outline randomly disappears and I am left with the outline window containing the text:  
     
   The active editor cannot provide outline information  
     
   I then can't get the outline back. Eventually it will randomly re-appear again, but I have no idea what is causing either disappearance or re-appearance.  
     
   The ESP32 sketch does compile so it seems to be syntactically correct.  
     
   Is there any way to do a "refresh" to get the outline back?  
     
   Toggling the outline from the command palette seems ineffective and just hides or un-hides the outline window.

2. **发言者 2**（回复第 1 条）：I just tried it \(great feature\), and on the second one I opened, I got that error. I clicked the symbol twice, and the outline reappeared.

3. **发言者 2**（引用未收录发言）：\[图片省略\] 发言者 1:  
     
   Also worth noting as I only clicked it once, then tried toggling the feature in the Command Palette. Is that as in a double-click rather than two single clicks?  
     
   2 single clicks.

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Backup / restore don't 100% work  
     
   What type of hardware are you using: VPS bought online  
     
   What YunoHost version are you running: 13.0.8 \(testing\)  
     
   How are you able to access your server: The webadmin  
     
   Are you in a special context or did you perform specific tweaking on your YunoHost instance ?: I do have some hooks installed but I don’t believe this is the cause  
     
   Describe your issue  
   Setting up a new server its prudent to do a backup/restore test.  I’m using restic.  
     
   Doing this test I’ve noticed :  
     
   Some apps fail to start \(fix is Force-upgrade\)  
     
   Some apps loose portal icons \(fix is Force-upgrade\)  
     
   Domains loose settings such as email/custom title &amp; logo etc \(fix is to manually repair\)  
     
   Good to see no data lost, but I’m a bit surprised that the restore has these niggles.  
     
   Many thanks.  
     
   Share relevant logs or error messages  
   None … but I can re-test and gather if useful.

2. **发言者 2**（回复第 1 条）：Hi, sorry, this is way too vague to trigger any help or initiate any investigation for bugs. Please share the restore logs of the related issues. :slight\_smile:

3. **发言者 1**（回复第 2 条）：Okay, fair enough, so it sounds like this might be new to you.  
     
   I’ll do my best to repeat the backup/restore test and report back here.  
     
   Pete

4. **发言者 3**（回复第 1 条）：You used the restic app?

5. **发言者 1**（回复第 4 条）：For these reproductions, no, just the regular yunohost backup feature on a fresh install.  
     
   But, yes, I first noticed this with a restic backup.  But same happens without restic.

6. **发言者 3**（回复第 5 条）：OK, so it looks to be a Trixie issue, because I didn’t face it on bookworm. For the app logos, they are first fetched when running “fetch available updates”

7. **发言者 1**（引用未收录发言）：I raised Restoring a backup doesn't restore domain settings · Issue \#2927 · YunoHost/issues · GitHub to the lack of domain restoration

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Claude OAuth Failures  
     
   Claude has started having serious OAuth errors and hangs, but nothing appears on the Claude Status site yet\[0\]. It's been several minutes now, not sure if its a blip or something more serious. Obv Claude is still reporting the issues with MS O365 connector; but not sure if it's related.\[0\] \[链接隐去\]

2. **发言者 2**（回复第 1 条）：Thanks for posting. Was wondering it was just me or not.

3. **发言者 3**（回复第 1 条）：Confermed from Italy

4. **发言者 1**（回复第 2 条）：Also downdetector \[0\] has reported errors spiking as well.\[0\] \[链接隐去\]

5. **发言者 4**（回复第 1 条）：Thanks for posting\!Facts from my end:I got "Please run /login · API Error: 403 Attention Required\! \| Cloudflare" during a long task that had been running for 27 minutes 10 seconds.I don't do any work related to Microsoft Office.The login isn't working, it opens the browser with a URL starting with \[链接隐去\] but just sits there with the little spinner.

6. **发言者 5**（回复第 1 条）：Yeah, I've noticed that I got booted from Claude Code and can't log-in again.  \(Graz, Austria.\)  Happened about 20 mins ago.Anthropic just updated with an incident report:  \[链接隐去\]

7. **发言者 1**（回复第 1 条）：It seems to have resolved for me now; I retried the auth link and it worked now.

8. **发言者 6**（回复第 6 条）：Its resolved for me. Also \(Graz, Austria\). 2 minutes ago i got to logon again

9. **发言者 5**（回复第 8 条）：Thanks for the heads-up.  I was also just able to log-in.If you're working on anything interesting, neighbor, feel free to shoot me an email. My email address is \(temporarily\) in my profile.Edited to add:  Got kicked out again.  It worked for about 5 mins.

10. **发言者 7**（回复第 8 条）：I managed to log in ~5 minutes ago but kicked out again now.

11. **发言者 8**（回复第 1 条）：Same issue, resolved a few minutes ago but happened again.

<!-- samples:end -->

