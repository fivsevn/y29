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

<!-- intake-request:intake-02fec4ebe3ea4f5dba3c4b14fd2b2503 -->
<!-- samples:start -->

采集时间：2026-11-14 10:00:50（北京时间）

### 讨论 1

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：What are you doing this weekend?  
     
   Feel free to tell what you plan on doing this weekend and even ask for help or feedback.  
     
   Please keep in mind it’s more than OK to do nothing at all too\!

2. **发言者 2**（回复第 1 条）：- Have a good laugh at recent news.  
   - Practice drawing.  
   - Complain about the hot weather.  
   - Lots of \[Fennel\]\(\[链接隐去\]

3. **发言者 3**（回复第 1 条）：Fix a puncture in my bike and hopefully get some riding in.  
     
   Work on cucmber tests for a module of GoActivityPub

4. **发言者 4**（回复第 1 条）：Searching for gig work here in NYC, running a board game event, hosting a little social gathering, and applying to the \[Eyebeam residency\]\(\[链接隐去\] The deadline is \*Sunday\* so we are going to hustle\!  
     
   Still no luck on the job search.

5. **发言者 5**（回复第 1 条）：I recently invested in a UPS and it will luckily arrive today\! So will probably be setting it up and doing some homelab maintenance.  
     
   Probably also keep working on my receipt printer project

6. **发言者 6**（回复第 1 条）：Finally have time for Ant programming language. Will start thinking about package manager:  
   \* \[链接隐去\]

7. **发言者 7**（回复第 1 条）：- going to watch a wheelchair basketball match, hope its less aggressive than the last one :O  
   - work on my programming language, possibly implement more stdlib things, maybe one or two IR passes  
   - finally work out again, maybe go for a hike  
   - finish reading my current book, start a new one

8. **发言者 8**（回复第 2 条）：Fennel looks interesting. Thanks for pointing to it\! What are you building with ti?  
     
   I recently got a R36S handheld and wanted to build a few games for myself. I was looking at Love2D and Teal, but I am more excited for Lisp \(for a future project\).

9. **发言者 9**（回复第 1 条）：This weekend I'm working on \[Folune\]\(\[链接隐去\] a lightweight desktop editor for plain text and Markdown.

10. **发言者 10**（回复第 1 条）：Reviewing some p5.js contributions\! Including some initial explorations to support gltf import, and a CPU compute shader fallback for older devices. Going to be discussing how best to do that fallback and not tank performance, maybe you have to opt into it so you're aware and can adapt your project to do less stuff, etc?

11. **发言者 11**（引用未收录发言）：Yeah that's the idea anyway, if I ever stop finding new improvements.

### 讨论 2

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Re: \[求助\] 婚後買房地點選擇  
     
   我會考量  
     
   未來房價 及 想離父母近一點  
     
   有一個重點你沒考量到  
     
   未來父母年紀大 會需要你們花時間心力照看  
     
   近一點總是好  
     
   而且B房價高 應該生活機能較好 未來也好脫手  
     
   所以我會選B  
     
   \[引用未收录发言\] 最近和另一半為了買房地點意見不合，雙方各有考量，想請大家客觀評估。  
   : 一、家庭背景  
   : \* 夫妻目前育有一名未滿一歲的寶寶，雙方收入相近，未來房款平均分擔。  
   : \* 太太目前在 A 地工作，先生目前在外縣市C 地工作。  
   : \* 先生工作地附近有低成本的公務宿舍。  
   : \* 目前暫住夫家，公婆能協助照顧孩子。  
   : 二、目前考慮的兩個購屋方案  
   : 方案 A：  
   : \* 太太不需要通勤。  
   : \* 先生單程通勤約 85分鐘。  
   : \* 房價較低，每坪比 B 便宜約 5 萬元。  
   : \* 距離公婆較遠。  
   : 方案 B：  
   : \* 太太單程通勤約 40分鐘。  
   : \* 先生單程通勤約 65分鐘。  
   : \* 距離公婆較近，方便長輩協助育兒。  
   : \* 房價較高，每坪比 A 貴約 5 萬元。  
   : 以上通勤時間為 Google 地圖顯示的單程車程。  
   : 三、另外有三個重要條件  
   : \* 公公後年將退休，未來可以協助接送孩子，因此 B 確實有相當穩定的育兒支援優勢。  
   : \* A、B 每坪房價相差約 5 萬元，若以一般家庭購屋坪數計算，總價會有百萬元以上的?  
     
   : 距。  
   : \* 先生表示，約十年後一定可以調任至 D 地（與 A、B 位於同一縣市），只是時間早晚  
   : 的問題。屆時先生從 A、B 通勤的時間差異不大，而太太若住 A，則不需要通勤。  
   : 四、夫妻雙方的立場  
   : 先生傾向 B：目前通勤時間較短，又能靠近父母，獲得穩定的育兒支援，減輕家庭負擔?  
     
   : 太太傾向 A：房價較低、自己不必通勤，且考量先生未來確定會調職，長期而言可能更?  
     
   : 合家庭的生活與財務規劃。  
   : 五、想請問大家  
   : \* 如果是你們，會選擇 A 還是 B？  
   : \* 是否值得為了後援多付出購屋成本？  
   : \* 買房應該優先考量目前的育兒支援與通勤便利，還是未來的長期生活規劃？  
   : 希望大家能客觀分析，不需要刻意支持任何一方，也歡迎有買房、育兒經驗的版友分享?  
     
   : 謝謝！  
     
   ----  
   Sent from Be某社区 on my iPhone 13

2. **发言者 2**（回复第 1 条）：選B當然是對男方很好 那房貸就應該多付一點比例啊

3. **发言者 2**（回复第 1 条）：離公婆近以後要多顧公婆 房價又高幾百萬 太太都要出

4. **发言者 2**（回复第 1 条）：一半 需要公婆後援總因也是先生遠在天邊 怎麼好意思

5. **发言者 2**（回复第 1 条）：AA?

6. **发言者 3**（回复第 1 条）：樓上好兇喔，那太太的爸媽是不能出力嗎?

7. **发言者 3**（回复第 1 条）：選B對男方好，選A難道女方要多付一點? 雙標仔

8. **发言者 4**（回复第 1 条）：下班直接到家 \+ 老公難以陪伴 \+ 下班全職做所有家事

9. **发言者 4**（回复第 1 条）：還要一打一帶小孩，就為了換來不接觸公婆太猛惹XD

10. **发言者 4**（回复第 1 条）：不要把自己對公婆的恨投射到所有人身上好嗎XD？

11. **发言者 3**（回复第 1 条）：確實，有些人挑到爛蘋果還覺得自己意見很有參考價值

### 讨论 3

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

### 讨论 4

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：早上故意让电脑开着，装睡觉，显示母子的片。等我妈来我房间看，她给我电脑桌旁边桌子稍微整理了一下不知道看到屏幕没有。那么明显应该看到了的啊，她的表现又感觉她没看到

2. **发言者 2**：\( ☉д⊙\)这是综一吧，我看到什么了

3. **发言者 3**：李在赣神魔\( ﾟωﾟ\)

4. **发言者 4**：弗  
     
   但可能只是以为是普通的片吧，不看完咋知道是母子片

5. **发言者 5**：\(ﾟДﾟ≡ﾟДﾟ\)  
     
   弗\!

6. **发言者 6**：弗

7. **发言者 7**：？

8. **发言者 8**：po怎么听起来好像希望被看到

9. **发言者 9**：不是\(ﾟДﾟ≡ﾟДﾟ\)你来真的

10. **发言者 10**：woc

11. **发言者 11**：弗X100

### 讨论 5

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Sa. \(07.11.\) Ränkespiel von Maurice Weber  
     
   Moin,  
     
   heute ab 16 Uhr ist Nils zu Gast beim Ränkespiel\!  
     
   Der Stream ist auf den 某社区 TV Kanälen zu sehen und wird sich bis in den späten Abend ziehen.  
     
   Es wird Crusader Kings 3 gespielt und Nils kann mit Maurice, Sep von den Piets, Steinwallen und Copeylius Intrigen spinnen.

### 讨论 6

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Live map of U.S. flights during tonight's FAA nationwide ground stop

2. **发言者 2**（回复第 1 条）：Fun irony \(beyond being Friday the 13th\): FAA lost radar and frequencies between centers but ADS-B is broadcast by the planes themselves, so a couple hundred hobbyist receivers probably kept the full picture the whole time.

3. **发言者 3**（回复第 1 条）：Wow, impressive TTM. Barely enough time for the domain to resolve\!

4. **发言者 4**（回复第 3 条）：&gt;Barely enough time for the domain to resolve\!contrary to popular belief, DNS doesn't actually need 24 hours \(or whatever\) to "propagate". It only needs enough time for caches to expire, if they exist. For non-existent domains this shouldn't be an issue.

5. **发言者 5**（回复第 1 条）：Really fast work\! I didn't know all of this data was publicly available.

6. **发言者 1**（回复第 1 条）：I remember seeing a similar cool GIF for 9/11 flights, and thought it'd be cool to see if for today's ground stop too, and had Claude Code generate the website in ~30 mins.Liked it so much and thought I'd clean it up a bit, deploy, and share :\) Enjoy\!

### 讨论 7

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

### 讨论 8

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Philips CD-i Joystick Controller  
     
   I wanted to play a game I got on my Philips CD-i but the game required a controller with a joystick and not a regular Dpad. Well I don't own the bigger CD-i console that comes with the wireless controller so... I made my own.  
     
   Attached is code to run a diagnostic, just to make sure the signals are correct. \(It makes the cursor on screen drift to the right\) And the other is the controller code itself.  
     
   I will also be making a wireless version too using a couple of XIAO ESP32-C6 modules.  
     
   By the way, the game I wanted to play that requires a joystick is Super Mario's Wacky Worlds prototype. Link Here: \[链接隐去\]  
     
   \[图片省略\]IMG\_66051920×2560 983 KB  
     
   \[图片省略\]IMG\_66041920×2560 884 KB  
     
   CD-I Controller.zip \(7.8 KB\)

2. **发言者 2**（回复第 1 条）：Please post links to datasheets and technical manuals, and schematics.

3. **发言者 3**（回复第 1 条）：You don't seem to have any doubt... Wouldn't be the case to move your post to Projects/Showcase?

### 讨论 9

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Rento Knitted Hoodie  
     
   Hi friends- can someone help me with this pattern, I think I’m doing it wrong.  
     
   I finished step 1, ending on a WS row. Then I started step 2 with chart I with the first row \(RS\) being P2 \(K1,P2\) to the end, 2nd row all purls, third row same as row 1 and then repeat 2 and 3.  
     
   Is that right, and if not, can someone tell me what I’m doing wrong? I’ve never used a chart before.  
     
   thank you so much in advance\!  
     
   Pattern: Novita Isoveli: Rento knitted hoodie

2. **发言者 2**（回复第 1 条）：That looks like the comfiest hoodie ever\!  I hope we get to see a pic when you’re done with it\!

### 讨论 10

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Uploading Images  
     
   For some reason I appear to be having a problem uploading images to accompany posts to the What Are You Listening To thread, the image appears in the post but the upload percentage stays at zero and the image will not load.  
     
   I’m using an iPad and I’m not doing anything that I have not done previously when I successfully uploaded images, any ideas ?

2. **发言者 2**（回复第 1 条）：I had this issue so i just copy and paste images in now which works fine.

3. **发言者 1**（回复第 2 条）：Tried that but still have the same issue I’m afraid\!\!

4. **发言者 2**（回复第 1 条）：The images need to be not ‘owned’ by another app, e.g. you can’t copy and paste from Google Drive directly, you must download the image into Gallery \(on Android\) and copy/paste from there.  
     
   It’s the same reason why you cannot upload the images.  
     
   HTH

5. **发言者 3**（回复第 1 条）：Using Apple use the copy and delete saving keeping all those images backing up.

### 讨论 11

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Embers of the Reach: a peaceful colony builder, released on the Mac App Store \(Godot 4\)  
     
   I’ve just shipped my first game, made in Godot 4: a sci-fi colony builder with belts, a day/night power budget and crew expeditions. It’s free on the Mac App Store, with an iPad version in review.  
     
   A few things that might interest Godot folks:  
     
   The simulation is deterministic and integer-only \(fractions are stored as permille\), kept apart from nodes and the scene tree. The client only submits commands to it. That made a headless test suite and save/restore much easier.  
     
   Shipping a Godot export through the Mac App Store had a few traps: no duplicate app/team ID entitlements in App Store mode, an explicit LSMinimumSystemVersion, and native plugins as plain .dylib files rather than flat .framework bundles.  
     
   Store: Embers of the Reach App - App Store  
     
   Site: \[链接隐去\]  
     
   Happy to go into detail on any of it.

### 讨论 12

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Wrist warmers  
     
   This is what a recent mystery crochet became. A gift for a daughter.  Nothing beats toasty hands. \#DottyAndNell \#handmade \#slowfashion crochet  
     
   \[图片省略\]10000649471078×1080 348 KB

2. **发言者 2**（回复第 1 条）：pretty\!  
     
   I like the ruffles~

3. **发言者 3**（回复第 1 条）：The ruffle is way cute\! I love these\!

### 讨论 13

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：We Dislike LLM Output, not Because of Comprehension  
     
   Here is a blog post I just wrote, I hope it might be a fun read to you.  
     
   \[链接隐去\]

2. **发言者 2**（回复第 1 条）：Who is We ?

3. **发言者 3**（回复第 2 条）：I didn’t understand this blog. In my work I use copilot almost as a work colleague who is cleverer than me\!  
     
   But I work from home so that explains a lot. Once it starts discussing last nights football results then I will worry\!

4. **发言者 1**（回复第 2 条）：Just that I don’t want to use passive tense throughout the essay. It’s not a strict academic paper anyway.

5. **发言者 4**（回复第 1 条）：I think the bottom line is the comparison with medicine/pharmacology. As far as meds are concerned, there are some where we do not fully understand how they work, yet we use them because studies show that they are effective and very helpful, and there is also a lot of praxtical experience with them. Its similar with ai and llms.

6. **发言者 5**（回复第 1 条）：Honestly, I’m not sure I am smart enough to understand your article without some stringent analysis.

7. **发言者 5**（引用未收录发言）：\[图片省略\] 发言者 1:  
     
   The idea is that we \(well, I\) find it hard to hold LLM accountable thus we dislike LLM output.  
     
   Just a quick thought off the top of my head:  
     
   I think I generally dislike LLM output because It is the appearance of human behavior, but without human logic. At first it looks cool/good/acceptable, and the longer you look at it the more uncanny it becomes.

8. **发言者 6**（回复第 7 条）：\[图片省略\] 发言者 5:  
     
   uncanny  
     
   That’s exactly why I feel very uncomfortable when I get to using a chatbot. I would use them much more often if the output felt appropriately robotic. It’s why I quite dislike phrases like “You’re absolutely right\!” or “It’s not just X, it’s Y”. It just feels wrong whenever I come across them.

9. **发言者 7**（引用未收录发言）：Interesting… I’ve never heard of it :laughing:  
     
   Now, I never worked with the commercial side of things, all defense.  I do recall the Army putting things in contracts like “all documents written in sixth-grade English” or the like.  
     
   In the US at least, English is the new programming language.  And LLMs are like people, each with their own understanding of the language.  A recipe for fun…

10. **发言者 6**（引用未收录发言）：\[图片省略\] 某参与者:  
     
   I almost wrote, “You’re NOT a person…” …now that’s scary\!  
     
   An “I, robot” moment huh :laughing:

### 讨论 14

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：最近在玩 dsh ，因为是个比较新的东西，所以它生态圈里的项目全都是新出来的    
   玩了两个礼拜，发现了一个可怕的事情，这些新项目的 readme/doc/commit/pr 基本都是 ai 生成的八股长篇，但凡作者给你配上几张实机演示截图都算是比较用心的了，大部分项目都是无图无演示几千字纯文本的自动生成  
   很难看到旧时代那种简短且精准表述的人工文档了  
   作者是省心了，用户可就遭罪了  
   自己慢慢看，又麻烦又耗时，最终要么 ai 直接总结要么看个大概就让 ai 自己安装  
   我玩了几天 dsh 也受不了了，直接说想要什么方面的功能或增强，让它自己去寻找然后安装  
   仔细想想挺可怕的，越来越多的项目都不再是给人看的，或许这并非作者的本意，但实际情况就是人亲身参与的成本越来越高，只能交给 ai ，最终 ai 写 ai 看 ai 用形成稳定的闭环，人被排除出了循环，美其名曰只做决策🤣

2. **发言者 2**：是的，现在的公众号文章也是，几乎人人都能堆出来这些东西，能看的人性的东西太少了，个人化感受的东西太少了，都是硬生生的枯涩的理性分析，我们就像活在一个 AI 的脑子里。

3. **发言者 3**：简短且精准表述的文档 一样是可以通过 AI 生成的。问题还是在于生成了文档自己都不看，不进行润色和修改。  
   项目里的文档给到第三方你也用 AI 瞎扯一堆有的没的，肯定是要被叼一通。

### 讨论 15

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Fixing a WebKit bug to see if promises are made of train tracks

2. **发言者 2**（回复第 1 条）：Nice to see a breakdown of a bug fix like this these days

### 讨论 16

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

### 讨论 17

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Виявив дічь на мапі  
     
   OpenStreetMap    Ось тут якась дічь: струмок у його назві номер дороги, поруч непридатна для їзди ґрунтівка. В кого є ідеї що з цим робить - то зробіть будь-ласка .

### 讨论 18

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

### 讨论 19

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[引用未收录发言\]  
     
   看来我必须要展现我的真实实力了\( \`\_っ´\)

2. **发言者 1**（引用未收录发言）：\[引用未收录发言\]  
     
   \( \`\_っ´\)

3. **发言者 1**（引用未收录发言）：\[引用未收录发言\]  
     
   \( \`\_っ´\)

4. **发言者 1**（引用未收录发言）：\[引用未收录发言\]  
     
   \( \`\_っ´\)

5. **发言者 1**（引用未收录发言）：\[引用未收录发言\]  
     
   \( \`\_っ´\)

6. **发言者 1**（引用未收录发言）：\[引用未收录发言\]  
     
   \( \`\_っ´\)

7. **发言者 1**（引用未收录发言）：\[引用未收录发言\]  
     
   \( \`\_っ´\)

8. **发言者 1**（引用未收录发言）：\[引用未收录发言\]  
     
   \( \`\_っ´\)

9. **发言者 1**（引用未收录发言）：\[引用未收录发言\]  
     
   \( \`\_っ´\)

10. **发言者 2**：\(｀･ω･\)

11. **发言者 3**：我还以为是让我一直点引用\(\(\(　ﾟдﾟ\)\)\)

### 讨论 20

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Dmarcguard port &amp; host  
     
   What app is this about, and its version: dmarcguard 1.7.2~ynh1  
     
   What YunoHost version are you running: 13.0.8 \(testing\)  
     
   What type of hardware are you using: VPS bought online  
     
   Describe your issue  
   I noticed that dmarcguard uses a random port and only allows connections from localhost.  Also, metrics are disabled. This is an issue if you want to monitor your dmarc reports remotely.  
     
   It would be great if, say, a tickbox is added to enable metrics and settings for the listen port and address.  
     
   \(great little app, BTW, very useful addition\)  
     
   Share relevant logs or error messages  
   None

2. **发言者 2**（回复第 1 条）：Since it binds to localhost on a random port, an SSH tunnel is probably the safest immediate workaround for remote access; for metrics, I’d keep them off unless the app exposes a separate metrics listener, because changing the main bind address may expose the whole UI. A dedicated metrics toggle/listen-address option would be the cleaner fix.

3. **发言者 1**（回复第 2 条）：Yep.  
     
   Currently I simply use the firewall to block metrics access from all source addresses apart from my home \(yes, it would be great if source address firewall options was in the GUI\!\).

### 讨论 21

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Anvil builds premium websites at lower cost  
     
   Anvil is an AI app builder focused on premium UI/UX  without the premium price tags. Build polished websites by using natural language with with real project execution, live previews and  automated error correction. Plans starts at $1 for 7 days with 1M tokens. Built independently from Africa in Zambia.

### 讨论 22

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Black Friday / Cyber Monday  
     
   Hello,  
     
   Will there be a promo this year?  
     
   Thanks

2. **发言者 2**（回复第 1 条）：i would love to know too. I want to get lifetime if possible, but…  
     
   \[图片省略\]  
   Screenshot\_20261113-155612\_Firefox1200×431 274 KB  
     
   yeah.

3. **发言者 3**（回复第 1 条）：There is usual a sale at then end of December each year where 某社区 lifetime goes from 150 to 120$ when you purchase it on the website.  
     
   I think that’s the only one they have.

4. **发言者 4**（回复第 1 条）：There will be the usual BunsGiving this year :tada:

5. **发言者 5**（回复第 4 条）：For those considering lifetime, will the discounted price be prorated based on how much time we have left on our membership?

### 讨论 23

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

### 讨论 24

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Error not showing up in the debug window  
     
   Godot Version  
   V4.7.2  
     
   Question  
   	\# Quit if the audio bus wasn't found  
   	if audio\_bus\_id == -1:  
   		push\_error\("Could not find target audio bus: " \+ audio\_bus\_name\)  
   		push\_error\("Quitting..."\)  
   		get\_tree\(\).quit\(1\)  
     
   For some reason I don’t see any errors in the debug window or console when this runs. Am I not using push\_error\(\) correctly?

2. **发言者 2**（回复第 1 条）：Have you confirmed that your if statement is actually true? Try to step through your code line by line using the debugger to see if it’s actually true or not.

3. **发言者 1**（回复第 2 条）：The statement is true, when I test it the game quits fine. Could it be that the game is quitting before the error is sent? I’m new to Godot so I don’t know if that is how it works.

4. **发言者 2**（回复第 3 条）：Well, test it\! Comment out the line that makes the game quit, and see if the error gets printed. It’s usually faster to just try it out rather than try and look for an answer to something you can test so quickly.

5. **发言者 3**（回复第 1 条）：Does normal debug output works? Sometimes the remote debug port\(6007\) gets occupied by other programs.

### 讨论 25

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Floral ornament  
     
   Another Pinners Conference make-and take\! This was done with watercolors and with watercolor pencils. I don’t think I’ve ever done watercolor on wood before.  
     
   \[图片省略\]IMG\_70231737×1693 1.14 MB  
     
   Thanks for looking\!

2. **发言者 2**（回复第 1 条）：What an interesting technique - I would never have thought of using watercolours on wood.  The colours are so vibrant, too\!

3. **发言者 1**（回复第 1 条）：Thanks\!

4. **发言者 3**（回复第 1 条）：I actually really like doing watercolor on wood. It has an almost velvety texture. Lovely work\!

5. **发言者 4**（回复第 1 条）：Another amazing ornament\! Your tree is going to be popping this year. \(That’s what the youths say, right?\)  
     
   Quick mod note: I used my special powers to move this to the Completed Projects side of the category so it gets its proper due as a project.

6. **发言者 1**（回复第 1 条）：Thanks, everyone\!  
     
   发言者 4 I have no idea how I messed that up, so thanks for fixing it\!

7. **发言者 5**（回复第 1 条）：Pretty\! This ornament has so much possibility outside of decorating a Christmas tree.

8. **发言者 1**（回复第 1 条）：Thank you\! I agree\!

9. **发言者 6**（回复第 1 条）：Nice\! I like doing mixed media. Is that on wood?

10. **发言者 1**（回复第 1 条）：Thank you\! Yes, it’s on wood\!

### 讨论 26

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Magic Goats  
     
   Some goats . New WIP  
     
   .Blender 5.3 / eevee / toon texture  / rigging  
     
   \[图片省略\]cabras endiabladas1920×1080 1.58 MB  
     
   \[图片省略\]cabra toon 21920×1080 1.84 MB  
     
   \[图片省略\]cabra toon 11920×1080 2.13 MB

### 讨论 27

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：最近一直在折腾 yovoice ，现在把社区板块上线了： \[链接隐去\]  
     
   把大家用 yovoice 做出来的声音作品聚到一起，可以分享自己的作品，也可以听听别人的创作、找找灵感  
     
   \[图片省略\]  
   \[图片省略\]

### 讨论 28

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Contra "Glue work considered harmful"

2. **发言者 2**（引用未收录发言）：You seem to be using the term glue work differently from the article. The definition used there is mostly social: Helping onboard new peers, helping make sure that the team has a coherent technical vision, and that the people working on different parts of the system are aware of it, etc.  
     
   I don't think that's easy to automate with C\+\+ templates.

3. **发言者 3**（引用未收录发言）：You're talking about glue code maybe, which is completely different.

4. **发言者 4**（引用未收录发言）：Argh, I honestly thought your comment had no replies yet. Sorry, I didn't mean to pile on.  
     
   Does anyone recognise this mistake? It's not the first time I've misread the UI like this. 'This comment has replies / has no replies yet' is somehow not entirely obvious to my eye.

5. **发言者 5**（引用未收录发言）：I think this is a defensible reading of the original post if you bring your own cynical frame to it. I think many readers, especially more junior ones, might not.

6. **发言者 6**（引用未收录发言）：100% this. I ran myself ragged in a huge, dysfunctional, company and also watched several of the best engineers burn themselves out.  
     
   Your best course is resume-driven-development so that you always have the option to leave.

7. **发言者 7**（回复第 6 条）：Well, maybe resume-driven development as typically understood is the version best optimised for leaving for other large companies; for moderate size there are a few different types with different enough getting-hired tactics not to identify them with the same kind of RDD, and unlike the huge case, there is some choice of which risk/dysfunction profile is less personally painful…

8. **发言者 8**（回复第 1 条）：&gt; Goedecke is quite accurately describing some of the incentives presented to employees at big tech. My problem with the post is that he tells you to internalize them instead of keeping in mind that a better world is possible.  
     
   That’s his thing.

9. **发言者 9**（回复第 8 条）：Yeah, if you work at Oxide like OP or a similar small-medium company that has attracted a higher concentration of talent, then the bigco advice doesn’t really apply. The most I might riff on the post as applied to bigco is that unbelievable inefficiencies enacted over a long period of time can create space for dramatic improvements you can take credit for.

### 讨论 29

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

### 讨论 30

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[閒聊\] 卡通手錶 200元  
     
   台北車站 Y區地下街  
       巧遇小叮噹手錶  
       居然只要 200元  
       很開心的兩款都買下  
     
       應該是有版權的吧?  
       有小貼紙註明 animation  
     
       這種是哪裏的貨源呢  
       用起來品質沒問題吧?\!

2. **发言者 2**（回复第 1 条）：高機率大陸

3. **发言者 3**（回复第 1 条）：當然可以，手錶已經是相當成熟的

4. **发言者 3**（回复第 1 条）：製程產品，幾乎沒有可能買到雷貨

5. **发言者 3**（回复第 1 条）：尤其大陸製的，CP爆表

### 讨论 31

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Berner Löchligut-Quartier erhält städtische Postleitzahl 3014  
     
   Ab 2027 wird in der Gemeinde Bern Postleitzahl 3048 zu 3014  
     
   Links:  
     
   \[链接隐去\]  
     
   Stadtplan - map.bern.ch  
     
   Löchligut – Wikipedia  
     
   Löchligut - Wikidata  
     
   Category:Bern-Löchligut - Wikimedia Commons

### 讨论 32

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：有点困了，找个肥人拿他的肥腚当枕头睡觉\(　ﾟ 3ﾟ\)

2. **发言者 2**：三 \(　ﾟ 3ﾟ\)  
     
   放了个有水声的屁

3. **发言者 3**：口也我提神醒脑屁啦\(\`ヮ´ \)

### 讨论 33

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Fr. \(04.12.\) Kneipenquiz  
     
   Moin,  
     
   der Dezember startet mit einem Kracher am Freitag:  
     
   Das Kneipenquiz kommt mit einer neuen Ausgabe ab 20 Uhr\!  
     
   Andreas und Johanna führen durch den Abend und müssen sich durch die „Halbe Punkt“-Chöre durchsetzen.  
     
                 
     
   \[图片省略\]Screenshot 2026-11-13 1832221920×1342 175 KB

### 讨论 34

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Erreur lors de la mise à jour de wallabag  
     
   What app is this about, and its version: wallabag2  2.6.14~ynh1  
     
   What YunoHost version are you running:  12.1.41.2  
     
   What type of hardware are you using: Old laptop or computer  
     
   Describe your issue  
   Bonjour,  
     
   la mise à jour échoue systématiquement.  
     
   Merci d’avance pour votre aide.  
     
   Share relevant logs or error messages  
   “Impossible de mettre à jour wallabag2 : Une erreur s’est produite durant l’exécution du script de mise à jour de l’application”  
     
   \[链接隐去\]

2. **发言者 1**（引用未收录发言）：Bonjour,  
     
   La version de php est 8.3  
     
   le module DOM était bien présent..

3. **发言者 2**（引用未收录发言）：La version “système” ne peut-elle pas être une autre? Perso c’est le cas quand  je vérifie avec php -v et je n’ai pas de trace de php8.2 sur mon serveur.  
     
   Ne faudrait-il pas plutôt installer la version de phpx.x-xml correspondante à php -v qui peut être différente de php8.2? Ou changer la version par défaut avec update-alternatives --config php ?

4. **发言者 3**（回复第 3 条）：Si, si, tout à fait, cela revient à cela.

5. **发言者 3**（回复第 4 条）：Je parlais précisément de 8.2 car je pense que c’est le cas de 发言者 1 et de tout serveur ynh où php 8.2 n’a pas été désinstallé.  
     
   L’hypothèse est qu’un script retombe sur la version système \(quelle qu’elle soit; bien sûr il n’y aura pas de pb si la version est 8.4 car l’install de wallabag installe php8.4-xml\)

6. **发言者 2**（回复第 5 条）：oui, je n’avais pas lu le début du fichier log, c’est bien une 8.2 par défaut :  
     
     YNH\_DEFAULT\_PHP\_VERSION: '8.2'  
     
   Ou sinon choisir la version 8.4 avec update-alternatives --config php avant l’upgrade de wallabag, comme ça ça devrait passer sans rien installer.

7. **发言者 3**（回复第 6 条）：\[图片省略\] 发言者 2:  
     
   update-alternatives --config php  
     
   Le pb c’est qu’il me semble que la version \( YNH\_DEFAULT\_PHP\_VERSION\) est fixée qq part en dur \(helper ou autre\) à 8.2 et que le seul moyen d’échapper à ce déterminisme est d’avoir désinstallé la version 8.2.

### 讨论 35

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：某社区: Algorithmic MIDI Companion – Viterbi SATB Solver and Euclidean Rhythms

### 讨论 36

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Question about vocabulary in 某社区 Reading Passages  
     
   Hi there\!  
     
   I have a question regarding the vocabulary necessary to fully understand the reading passages. As an example, I recently started the passages marked as N5. Since I just finished both the Vocabulary and Grammar N5 某社区 decks, I kind of assumed that the passages for N5 would be simple enough that I could understand them. And I can, for the most part.  
     
   Im noticing, though, that some of these include vocabulary and grammar points I haven’t studied yet. When I looked up the ones I wasn’t familiar with, they show up in the 某社区 content section as N4 or lower.  
     
   I guess my question is, is this normal? Sometimes I feel the need to click on the “Show All Translations” button because of a word or phrase I don’t know yet, and it feels like I’m cheating.

2. **发言者 2**（回复第 1 条）：Personally, I think 某社区 should provide an i\+1 experience.  
     
   The content should not contain so many things that are outside of what is learnt.

### 讨论 37

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：ioctl\("TIOCMGET"\): Inappropriate ioctl for device  
     
   Hello\! I converted an old MacBook Pro to Linux Mint and now trying to get my Mega 2560 board to run on the new OS. I am running IDE 2.3.11 from an AppImage file. When I attempted to upload the Blink example I received the following error:OS error: ioctl\("TIOCMGET"\): Inappropriate ioctl for device  
     
   There was a post from 2024 that appeared to be for a similar problem, but the original poster also had another problem so it's not clear how it was solved. I did follow the guidance provided by one responder \(\[某参与者\]\) regarding dmesg and this was the output after plugging the board in:  
     
   \[180775.001020\] usb 1-1.4: new full-sped USB device number 26 using xhci\_hcd  
     
   \[180775.104536\] usb 1-1.4: New USB device found, idVendor=2341, idProduct=0042, bcdDevice= 0.01  
     
   \[180775.104551\] usb 1-1.4: New USB device strings: Mfr=1, Product=2, SerialNumber=220  
     
   \[180775.104557\] usb 1-1.4: Manufacturer: Arduino \(\[链接隐去\]  
     
   \[180775.104562\] usb 1-1.4: SerialNumber: 5573630393135190D072  
     
   \[180775.113793\] cdc\_acm 1-1.4:1.0: ttyACM0: USB ACM device  
     
   Any help would be greatly appreciated.  
     
   Thanks\!

### 讨论 38

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Help with a knitting pattern  
     
   Hello all :waving\_hand:  
     
   I’m new here and so happy to have found this forum\!  
     
   I’ve recently started knitting again after quite a long break and I’m trying to knit a jumper for my first granddaughter who is almost one :smiling\_face: I’ve got a pattern from Love Crafts \(see pic\) but I’m struggling with the instructions on the pattern. I’m making the largest size and when it comes to the raglan I can see I need to do 16rows but I’m unclear on which rows I decrease…is it rows 1, 5, 9 and 13 \(therefore losing 8 stitches\) or 1, 4, 8, 12, 16 \(therefore losing 10 stitches\)? Would appreciate any help anyone could give me :smiley:  
     
   \[图片省略\]IMG\_54651169×2529 460 KB

2. **发言者 1**（回复第 1 条）：Ahh that’s really helpful. Thanks so much for your welcome, congrats and assistance. I thought I’d need to lose 10 stitches :blush: The pattern is by UK hand knitting \(UKHKA 3\). I’m doing the cute green jumper \(hopefully\)\!  
     
   \[图片省略\]IMG\_54661169×1591 370 KB

3. **发言者 1**（引用未收录发言）：Thank you for your help. That makes sense :slight\_smile:

4. **发言者 2**（回复第 2 条）：Very sweet pattern and a classic. Have fun with the knitting and please do post a photo when you finish\!

### 讨论 39

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：NSC 222 jump to 100 Volume on Tidal  
     
   Just had this happened twice this weekend by accidentally knocking my phone, the volume jumped straight to 100\!\!\! Found since there is a volume lock on the naim app but blow me down are these types of thing really still possible after all these years into streaming?  
     
   Will the volume lock at 50% prevent this happening again?

2. **发言者 2**（回复第 1 条）：I can’t say whether limiting the volume to 50% would stop it from happening, but it would at least make full volume much quieter and less likely to trash your speakers, so in the absence of a better solution, worth a try.

3. **发言者 3**（回复第 2 条）：Worked for me with Spotify on my SU and UQ2 when it went through a brief phase of doing that.

4. **发言者 4**（回复第 1 条）：Maybe i’m crazy but to me this is a disqualifying bug for the 222 .  I would not buy an amp that can so easily destroy my speakers.

5. **发言者 5**（回复第 4 条）：I’ve not had this problem \(I bought mine in early 2024\). My max volume is set to 100%. I’ve not seen this mentioned here much, maybe once previously, so I don’t think this is a common bug.

6. **发言者 2**（回复第 1 条）：There have been a few incidences of this reported here over the years, so this is not unique. It happened to me some years ago on a Superuniti at the end of a firmware update. Fortunately \(for my speakers, not my ears\) I was in room at the time and was able to dive for the volume control, and no damage was done.

7. **发言者 2**（引用未收录发言）：Some of these incidents occurred when users were not in the same room, and in a couple of cases I recall, not even at home, leading to sustained loudspeaker abuse, not to mention annoyed neighbours. So potentially much more problematic than cases of user error with a remote.

8. **发言者 5**（回复第 7 条）：Do you recall if these specific issues were resolved?  
     
   In the OP’s case, it sounds more like a too aggressive volume control on the phone.

9. **发言者 6**（回复第 7 条）：I remember that issue, it was specific to Spotify that allows you to control any device it’s ever connected to remotely.

10. **发言者 2**（回复第 9 条）：Spotofy Connect is, by design, one of the potential causes of this issue, but not the only one. In my case it happened as the streamer restarted itself after a firmware update.

11. **发言者 1**（引用未收录发言）：yep I use the remote to control volume not the phone. These happened while the phone was being used or touched at the same time as playing from Tidal.

### 讨论 40

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Weird lines on objects in the distance  
     
   Godot Version: 4.7  
   Question  
   I get weird lines on objects in the distance in my 3D game. I am using forward plus both on mobile and computer.  
     
   \[图片省略\]168151080×746 74.4 KB

2. **发言者 2**（回复第 1 条）：Looks like shadow acne, see:  
     
   3D lights and shadows — Godot Engine \(stable\) documentation in English

### 讨论 41

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

### 讨论 42

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How To Make The End/Tail Of A Curve Dont Rotate When I Move It?  
     
   So I have a problem about a tail or end of a curve that always rotate everytime I move it. Unlike the other segment of the curve that move normally \(without any rotation\), the end/tail of the currve always rotate everytime I move it :frowning:  
     
   Do you guys know how to make the tail/end of the curve just move whenever we move it without rotation?  
     
   I am trying to upload a video, but this forum said “New User Cannot Upload Attachments” :frowning:  
     
   so I am sharing the link of the video through 某社区, I hope it is allowed to do so  
     
   VIDEO

### 讨论 43

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：今天刷一会某社区公众号，AI 写的推送越来越多了，连 Ubuntu 官方账号也是 AI 写了。我也不是说排斥 AI ，我就觉得看着难受，看起来费劲。现在同事的技术方案也都是纯 AI 写，密密麻麻全是字，真的没法看。我只能丢给 AI 看，然后我再问 AI 到底在讲什么。以后就变成了 AI 写，AI 看，人再也不参与了。  
     
   \[链接隐去\]  
     
   \[链接隐去\]

2. **发言者 2**：有可能会，就好像现在已经很难看到普通人穿着人手工裁剪制作的衣服了，离开校园也不常看到人拿笔亲手写的字了，以前设计行业拿尺笔画的设计图现在也全都是数字文件

3. **发言者 3**：不会的，AI 写文已经被网文圈子的读者抵制了，而且读者是真金白银用脚投票，想要运营好公众号不可能依靠 AI 大量注水成功，而 OP 截图的更像是更新日志，反正现在代码都是 AI 写的了，用 AI 写更新日志也理所当然吧

4. **发言者 4**：不会，因为写作市场很小，AI 也懒得朝这个方向发力。AI 搞写作秒了起点又如何，抢作者的 2000 块低保吗？现在都向 coding 发力，企业的钱好赚多了。  
   以后特训之后，可能写作更傻，GPT 就属于典型完全放弃写作能力了。

5. **发言者 5**：未来更好的“捕获-定制训练模型”的方案和能力应会赋予个人，而不是全部人都使用同样的模型。但是在当前仍技术不足，同时和模型厂商的利益有冲突，所以它们也不会发展和推广这种技术。

6. **发言者 6**：这是官方账号？

### 讨论 44

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Don't bother patching: multiple remote code execution vulnerabilities in Danfoss AK-SM800A

### 讨论 45

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[A VENDRE\] Apple Watch SE \(2e génération\)  
     
   Bonjour la zone, j'ai offert à ma femme une Apple Watch SE \(2e génération\) 40 mm GPS boitier aluminium Galaxy et bracelet sport Galaxy Taille S/M en octobre 2024 et elle a pour ainsi dire quasiment pas servi après 2 semaines à faire mumuse avec. Photos possible.  
     
   Vu qu'elle doit se racheter des Airpods je me dis autant en financer une partie avec la revente de la Watch.  
     
   Achetée 200 balles sur Amazon Italie  
     
   \[图片省略\]image540×817 40.8 KB  
     
   Je propose 100 balles, négociable si zonien de longue date, remise en main propre à Amiens et alentours préférée, sinon expédition à vos frais.  
     
   Je laisse l'annonce 2 semaines ici avant de la poster sur leboncoin.

2. **发言者 2**（回复第 1 条）：\[图片省略\] 发言者 1:  
     
   remise en main propre préférée  
     
   D'accord, mais où ?  
     
   \(j'ai une petite idée en tant que modo, mais bon...\)  
     
   Je ne suis pas intéressé, mais c'est pour que l'annonce soit claire

3. **发言者 3**（回复第 1 条）：potentiellement intéressé pour Mme en fonction de "où".

4. **发言者 4**（回复第 1 条）：Moi je parie que c'est Amiens \(mon 2ème prénom c'est Sherlock\)

5. **发言者 5**（回复第 4 条）：\[图片省略\] 发言者 4:  
     
   mon 2ème prénom c'est Sherlock  
     
   Too late ... glorieux naming déjà pris  :zany\_face:

6. **发言者 1**（回复第 1 条）：En effet avec la ville c'est mieux :sweat\_smile:  
     
   Donc Amiens et alentours et 1er post édité.  
     
   发言者 3 tu es évidemment un zonien de longue date donc si les frais de ports font peur on peut discuter.

7. **发言者 3**（回复第 6 条）：Je te dis ça ce soir :slight\_smile:

8. **发言者 3**（回复第 7 条）：Je passe. Elle préfère garder sa vieille.

### 讨论 46

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：Tool for reading OpenStreetMap data  
     
   Just a brief post about Ographis, a GIS tool that Claude and I are building. It reads several geodata formats, including OpenStreetMap PBF files. It also features a tool for easily fetching data via Overpass.  
     
   \[图片省略\]ographis2559×1387 348 KB  
     
   Since I have contributed a lot to OpenStreetMap over the years, it´s only fair that I help making the data even more accessible as well. Feel free to open an issue if you have any suggestions.  
     
       
     
         \[链接隐去\]  
       
     
       
         
     \[图片省略\]  
     
     GitHub - gishubio/Ographis: Spatial ETL and mapping tool for the desktop,...  
     
       Spatial ETL and mapping tool for the desktop, written in Rust. A graphical program where you connect inputs, tools and outputs on a canvas, and a command line that runs the same models.

2. **发言者 1**（回复第 1 条）：OK, just one more example, combining elevation data, satellite imagery and OpenStreetMap data. Hope you´ll have as much fun as I am with this. Now, I´ll stop posting about this.  
     
   \[图片省略\]Hunneberg\_OSM1920×1040 250 KB

### 讨论 47

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：How Not to Build a Music Player

2. **发言者 2**（回复第 1 条）：AMP is one letter away from a different music player, \[AIMP\]\(\[链接隐去\]

3. **发言者 3**（回复第 1 条）：Fun article. I for one wholeheartedly want more "How not to" articles on the web. It was one of my big frustrations while working as a physics researcher. No publishes what they've tried that didn't work\!   
     
   Learning from your own mistakes is good. But learning from someone elses mistakes so you don't have to make them yourself is even better\!

4. **发言者 4**（引用未收录发言）：I disagree that this requires months of planning before code is written. For a personal project, writing code immediately and constantly iterating and learning is a totally reasonable approach - this is usually how my personal projects end up going and it keeps the process fun.

5. **发言者 5**（引用未收录发言）：Waterfall is usually not the best methodology.

6. **发言者 6**（回复第 2 条）：To me the name looks as if it were meant to be some hypothetical pre-Windows version of \[WinAMP\]\(\[链接隐去\] :-\)

7. **发言者 7**（回复第 5 条）：At no point i mention any kind of methodology.

8. **发言者 5**（回复第 7 条）：You describe a methodology \("months of up front planning, before you start work"\), even if you don't name it.

9. **发言者 1**（引用未收录发言）：&gt; If these are “a few goals”, I feel like an unaccomplished slacker.  
     
   Yes, perhaps a bit far from those goals. still figuring out how to replace harfbuzz.  
   There are libraries like \[Hamza\]\(\[链接隐去\] that I want to try.

10. **发言者 7**（回复第 8 条）：You are misquoting me. Please read what i \*actually\* wrote.

11. **发言者 5**（回复第 10 条）："A project like this needs months of thinking before a single line of code gets written."  
     
   Sorry, you're right, you didn't necessarily state all of that thinking was spent planning, that's on me.

### 讨论 48

近七天主帖与公开首批回复中的短节选，省略了部分发言。已自动去除明显标识；未做逐条语义转述。

1. **发言者 1**：\[VENDU\] Steam Deck OLED 1TB  
     
   A peu près tout est dans le titre.  
     
   Je vends ma Steam Deck OLED 1TB achetée en janvier 2026. Je pensais en avoir absolument besoin, je pensais que ça allait changer ma vie... et elle a dû tourner 20h max depuis que je l'ai achetée.  
     
   Elle est comme neuve, 0 griffe, 0 souci. Elle est vendue dans son étui rigide avec le chargeur et le câble. Je n'ai plus la boîte en carton par contre.  
     
   Payée 679 EUR en janvier 2026, vendue aujourd'hui par Steam pour la modique somme de 919 EUR parce que why the fuck not. J'aimerais en tirer 550 EUR \(fdp in via MR ou remise en mains propres côté Bruxelles\).

2. **发言者 2**（回复第 1 条）：\(Bonne vente, mais je pense que tu ne devrais pas partager des numéros de transaction privés comme ça\)

3. **发言者 3**（回复第 1 条）：Ça pourrait intéresser un pote. Je mets une option dessus pour 24h si c'est OK pour toi, le temps de vérifier avec lui. Si pas, tant pis. :wink:

4. **发言者 1**（回复第 3 条）：Aucun souci :slight\_smile:

5. **发言者 1**（回复第 2 条）：Ah bien vu merci, je vire image et je la remettrai en version censurée quand je serai chez moi

6. **发言者 3**（回复第 1 条）：Bon, finalement, pas possible pour mon pote. Désolé \! \(Mais merci d'avoir gardé l'option\).

7. **发言者 4**（回复第 1 条）：Hello,  
     
   Je suis intéressé par l'annonce du coup vu que le pote de 发言者 3 est pas intéressé. C'est toujours open ou tu as eu d'autres gens intéressés en mp ? Je te la prendrai au prix annoncé.

8. **发言者 1**（回复第 7 条）：Hello,  
     
   Cest toujours dispo, rien en MP pour le moment :slight\_smile: .  
     
   Paiement Paypal entre proches te convient ? On peut passer en MP pour la suite.

9. **发言者 4**（回复第 1 条）：ça roule, je passe sur 某社区 \!

10. **发言者 1**（回复第 1 条）：C'est vendu, on peut fermer :slight\_smile:

<!-- samples:end -->

