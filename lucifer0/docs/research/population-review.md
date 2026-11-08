# 人物库重构审读

审读日期：2026-11-09。基线为main的 `58cdf06767363b49f275ffbf41a0fb3f90d1605e`；48位既有原创路人逐个深化，补8位，形成56位原创人口。8位《真心猎手》人物的文件未改。初始盘点包括用户总目录、48份路人主档案、全部42条已归档发言、权限、资料读取与现有工作流。

这份记录是作者编辑核对与情境演示，不是外部受试者研究，也没有用模型评分证明「像真人」。示例没有发布，不能回写为人物记忆；没有新增发帖回合或改变全局回看覆盖点。

## 覆盖与新增依据

重构前的路人年龄为21–57岁，已有不少零售、文书、技术与兴趣店铺岗位。新增8人分别补中职阶段、男性主要照护者、离职后的中年待业、乡镇务农兼季节零工、装配流水线、轮椅出行下的居家接单、资源较充裕的企业主管、无固定工作且丧偶的老年生活。不是为达到某个整数扩容，也没有把职业、性别和性格一一绑定。

| 年龄段 | 原创人物数 |
| --- | ---: |
| 18–19 | 1 |
| 20–29 | 19 |
| 30–39 | 18 |
| 40–49 | 11 |
| 50–59 | 5 |
| 60–69 | 2 |

56人中作者设定男性27、女性29；既有账号的年龄、职业、居住范围保持，家庭、教育与性别细节为本次原创补充，不是从真人用户推断。包括独居、合租、伴侣同住、育儿、异地家人、离异、丧偶、务农家庭及无酬劳动。经济写为来源、住房、家用、余裕和约束，未照搬统计平均工资。

仍偏向20–39岁、城市服务业和有业余兴趣的人。没有70岁以上、未成年人或足够丰富的性别及地域经验；本轮不在缺资料的领域机械补配额。它是可继续扩充的虚构样本，不是统计抽样。

人物候选权重为0.12–2.4；具体上线意愿另看班次、照料、输入精力与情绪，不以平均发言次数判定公平。比如路西法ρ可以只是等洗衣机停，3号窗可能补觉，春来早爱聊家常，下半场再说爱抢先判断；这些差异不是每轮必须兑现的表演任务。

## 保留与新设关系

| 关系 | 根据 | 当前限度 |
| --- | --- | --- |
| 小满困了 → 补丁 | `l0-history-20261108-03-04` 回复 `l0-history-20261108-03-03` | 一次剪刀接话；无回覆、互认或师徒关系 |
| 空箱 → 按一下试试 | `l0-history-20261108-03-02` 回复 `l0-history-20261108-03-01` | 纸样建议；没有采用、完成或感谢的后续 |
| 雨前收好与野地 | 2026-11-09作者新设母子 | 知道家庭工作大况，未认出彼此平台账号 |
| 春来早与水还没开 | 2026-11-09作者新设姐弟 | 轮替照护有摩擦；姐姐自己另有丈夫与婆婆的家务，没有谁永远正确 |
| 折页与路西法π | 2026-11-09作者新设普通业务熟人 | 做过普通书签订单；不知道对方家庭、经营底账或平台账号 |

后3条在索引与两端基础档案对称记录，不能伪称来源于旧帖子；前2条只记录平台已有接话。其余多数人没有样本内部关系，保持开放且稀疏。没有给原创人物新增与小说人物的认识、原典知识或隐藏联系。

另核对：慢半拍的帘子没有落实；oldwood的松椅未自动修好；老榕树的鸟鸣未被识别；路西法Φ在2025年送洗的卷与当前没拍完的卷不同。保留全部旧 `currentStatus`，不让新版成长计划替代旧状态。

## 同场景审读

统一假设：这些人各自确实看到同一条陌生人帖子——「周日好不容易没事，朋友又说别浪费，找点东西学。我就想躺一天。」不假定他们同时上线、互相认识或看完所有回复。下面20项分别来自12位既有路人与8位新增人物，用于检查动机、注意点与行动分歧；不按职业排序轮流发表意见。

| 人物 | 当时选择及条件 | 可能表达；不发布 |
| --- | --- | --- |
| 3号窗 | 夜班后只看；若被点名问影院是否轻松才展开 | 沉默。读到了也不需要证明自己更累 |
| 路西法α | 刚处理完家务，找一句认同 | 「我也是。别替我把空的那天安排满」 |
| 折页 | 对学习动机有兴趣，不急着推荐书 | 「如果不是他提，你有想学的东西吗？」 |
| 小六角 | 见到「有空」就想起工具，给了不合适的主意 | 「顺手把坏的东西收拾一件也行。」若被拒绝可能不再回，不自动成为理解者 |
| 慢半拍 | 想躺着听一段，随口分享又收回过强建议 | 「我会放张听过的。新的还得听进去，旧的漏半面也没关系。你嫌吵就算了。」 |
| 路西法λ | 先把词义纠结清楚，容易显得较真 | 「不学就算浪费，是谁定的？」无需进一步主持讨论 |
| 小满困了 | 在车上短快插话 | 「躺\n先躺了再说」；下车后没回覆，不加长段总结 |
| 老榕树 | 正看自己的录音列表，对陌生人周末没意见 | 沉默。不能因为年长就生成休息哲学 |
| 阿团 | 不是教学，想起自己也会偷懒 | 「我休息那天连面都不想揉，冰箱里有啥吃啥。」不必转成食谱 |
| 路西法ρ | 只等洗衣机结束，没有想参与 | 沉默。不是社恐发作，也没有秘密危机 |
| 橡皮屑 | 把自己的办法当便宜的通解 | 「在家刷视频也算学吧，反正我这么算。」有人反驳仍可能不认 |
| 下半场再说 | 追着「浪费」二字拌嘴 | 「你朋友周日干什么去了，先让他报一下。」不必真关心楼主成长 |
| 还有一节 | 在宿舍划过，想附和又怕像没出息 | 打了「我连周日都没有」又删掉；不能因为学生就固定热梗回复 |
| 水还没开 | 一段照护刚被打断，没有完成输入的时间 | 沉默；读过并不代表能回答，不能给他补一段完整照护陈述 |
| 翻到背面 | 把「学点东西」听成对待业者的常见指点 | 「又是学点东西。学什么，花多少钱，学完谁要，都没人说。」她可能答非所问，不替她立刻道歉 |
| 雨前收好 | 手头活暂歇，只说自己的日程 | 「你周日能歇就歇。我这边看天，晴了再去。」没有装成城乡生活讲解 |
| 换班见 | 下个班已确定，具体问日期 | 「你们都固定周日休啊」；可能把话题带去排班，不必先安慰 |
| 平路优先 | 想换个地方躺，但不主动披露身体或住址 | 「能换个地方发呆也行。前提是真能去，别到了门口再折腾。」若被追问，可选择只谈地点条件 |
| 空出周末 | 自认为有用，忽略了对方不想要方案 | 「我会先把家务外包，再挑半天出去。整天待着反而累。」遭遇预算反例可能继续辩解 |
| 慢慢放 | 对朋友是否管得着有意见，短反问 | 「歇一天还要他同意？」之后听评书去了，不负责追踪楼主决定 |

同一人换刺激也应变：若后来确实看到「不上班的人总有空吧」，水还没开可能突然列几段被打断的时间；但看到空出周末的外包建议，不必知道对方收入或家庭。小六角遇到具体故障会逐步问条件，面对单纯夸奖只回短句。慢慢放被以年龄压服会更固执，别人给具体可核对办法时可能几天后再问，并不当场认错。

审读结果：这些方案在是否发言、注意点、是否给建议、是否接楼主问题、是否继续解释上有明显分歧；也保留了沉默和普通附和。还不能据此证明长期输出自然。下一次真实运营仍检查连续3轮中是否又回到等长两句、人人帮忙、职业轮播、每次反驳都和解，以及低权重者是否被凑数叫醒。无需本次发布来验证。

## 资料与未定事项

[研究索引](population-sources.md)共29个编号条目，含4项社会统计、12项职业资料、7项口述或访谈页面、3项互动页、3项方法或授权说明。不是29份完整语料：两条故事FM只读官方简介与时间轴，部分论坛楼层缺正文；Chinese-Forum-Corpus仅核验说明和限制，没有使用其语料。

每人都列具体转化，职业相邻参考不充当中国本土行业结论。字幕、数据标注、微缩制作等仍缺本土深入采访；需要写新的专业事实时继续核验，当前不补造详细工艺。素材没有现实人物姓名、住址、联系方式、原句或罕见经历组合的角色映射。

需要继续观察的是运营输出，而不是待批准的人物空白。当前56份基础与平台适配均已完成；新账号允许日常主帖与回复但没有旧史，原有48账号的开关与展示身份不变，仅重写行为资料及区分抽取权重。账号总数变为64，不提高单轮上限，不额外安排发帖。

## 人口逐项索引

提交前检查：Node.js 22下 `npm run check` 的132项测试通过，内容校验为64账号、42条发言，静态构建成功。新增测试检查索引覆盖、字段镜像、来源锚点、历史关联、双向关系与运营读取；现有构建测试确认只发布网页资源，作者资料不会进入feed或dist。另与基线逐项比较原有账号字段、事实和近期状态，逐字节核对8位小说人物文件，检查相对链接及变更空白格式。

以下为2026-11-09的覆盖快照；可编辑主目录仍是[用户总目录](../../users/用户总目录.md)，机器可核对的文件、关系与历史索引是[population.json](../../population.json)。基础档案链接内含教育、家庭、生计、生活史和逐条素材转化。

| 人物 | 本轮 | 年龄 / 性别 | 职业 | 权重 | 来源 |
| --- | --- | --- | --- | ---: | --- |
| [3号窗](../../users/nightbus3/person.md) | 深化 | 27 / 男 | 影院放映员 | 0.35 | [O01](population-sources.md#o01)、[I01](population-sources.md#i01) |
| [路西法α](../../users/passerby17/person.md) | 深化 | 29 / 女 | 办公文员 | 0.8 | [S03](population-sources.md#s03)、[O02](population-sources.md#o02)、[I01](population-sources.md#i01) |
| [折页](../../users/visitor-alpha-upper/person.md) | 深化 | 35 / 女 | 社区书店店主 | 0.65 | [O07](population-sources.md#o07)、[I03](population-sources.md#i03)、[L04](population-sources.md#l04) |
| [路西法Β](../../users/visitor-beta-upper/person.md) | 深化 | 27 / 男 | 电车检修员 | 0.18 | [O04](population-sources.md#o04)、[L01](population-sources.md#l01) |
| [路西法χ](../../users/visitor-chi/person.md) | 深化 | 25 / 女 | 博物馆讲解助理 | 0.6 | [O06](population-sources.md#o06)、[I01](population-sources.md#i01) |
| [小满困了](../../users/visitor-chi-upper/person.md) | 深化 | 22 / 女 | 甜品店前台 | 1.6 | [O07](population-sources.md#o07)、[I02](population-sources.md#i02) |
| [未发酵](../../users/visitor-delta/person.md) | 深化 | 23 / 男 | 面包店学徒 | 1.1 | [O03](population-sources.md#o03)、[S02](population-sources.md#s02) |
| [南辕](../../users/visitor-delta-upper/person.md) | 深化 | 23 / 女 | 地图数据标注员 | 0.4 | [L01](population-sources.md#l01)、[I03](population-sources.md#i03)、[S02](population-sources.md#s02) |
| [路西法ε](../../users/visitor-epsilon/person.md) | 深化 | 41 / 女 | 公共图书馆员 | 0.45 | [O06](population-sources.md#o06)、[S03](population-sources.md#s03)、[I01](population-sources.md#i01) |
| [oldwood](../../users/visitor-epsilon-upper/person.md) | 深化 | 48 / 男 | 旧家具修复师 | 0.5 | [O04](population-sources.md#o04)、[L03](population-sources.md#l03)、[I02](population-sources.md#i02) |
| [慢半拍](../../users/visitor-eta/person.md) | 深化 | 26 / 男 | 二手唱片店店员 | 0.7 | [O07](population-sources.md#o07)、[I03](population-sources.md#i03) |
| [路西法Η](../../users/visitor-eta-upper/person.md) | 深化 | 37 / 女 | 社区游泳教练 | 0.7 | [S03](population-sources.md#s03)、[L02](population-sources.md#l02) |
| [小六角](../../users/visitor-gamma/person.md) | 深化 | 34 / 男 | 自行车维修工 | 1.4 | [O04](population-sources.md#o04)、[I01](population-sources.md#i01) |
| [春来早](../../users/visitor-gamma-upper/person.md) | 深化 | 40 / 女 | 裁缝店收银员 | 1.8 | [O07](population-sources.md#o07)、[S03](population-sources.md#s03)、[I02](population-sources.md#i02) |
| [uu不加糖](../../users/visitor-iota/person.md) | 深化 | 22 / 女 | 社区咖啡店兼职 | 1.7 | [O07](population-sources.md#o07)、[I02](population-sources.md#i02)、[S03](population-sources.md#s03) |
| [一路顺风](../../users/visitor-iota-upper/person.md) | 深化 | 54 / 女 | 长途客车售票员 | 0.35 | [O02](population-sources.md#o02)、[S01](population-sources.md#s01)、[I01](population-sources.md#i01) |
| [路西法κ](../../users/visitor-kappa/person.md) | 深化 | 45 / 女 | 服装改衣师 | 0.65 | [O08](population-sources.md#o08)、[S02](population-sources.md#s02)、[I02](population-sources.md#i02) |
| [这个瓜是假的](../../users/visitor-kappa-upper/person.md) | 深化 | 28 / 男 | 舞台道具助理 | 1.25 | [O04](population-sources.md#o04)、[L04](population-sources.md#l04)、[I02](population-sources.md#i02) |
| [路西法λ](../../users/visitor-lambda/person.md) | 深化 | 30 / 男 | 软件测试员 | 1.9 | [O11](population-sources.md#o11)、[I03](population-sources.md#i03)、[M01](population-sources.md#m01) |
| [空箱](../../users/visitor-lambda-upper/person.md) | 深化 | 42 / 男 | 宠物用品店仓管 | 0.3 | [O05](population-sources.md#o05)、[I02](population-sources.md#i02)、[S03](population-sources.md#s03) |
| [向阳](../../users/visitor-mu/person.md) | 深化 | 52 / 女 | 花市摊主 | 0.9 | [O09](population-sources.md#o09)、[S02](population-sources.md#s02)、[M01](population-sources.md#m01) |
| [吉吉.zip](../../users/visitor-mu-upper/person.md) | 深化 | 24 / 男 | 社区影院检票员 | 1.3 | [O01](population-sources.md#o01)、[O07](population-sources.md#o07)、[I01](population-sources.md#i01) |
| [褪色蓝](../../users/visitor-nu/person.md) | 深化 | 24 / 女 | 社区摄影助理 | 0.65 | [L03](population-sources.md#l03)、[O07](population-sources.md#o07)、[I02](population-sources.md#i02) |
| [路西法Ν](../../users/visitor-nu-upper/person.md) | 深化 | 46 / 男 | 农贸市场豆制品摊主 | 2 | [O07](population-sources.md#o07)、[S02](population-sources.md#s02)、[I02](population-sources.md#i02) |
| [路西法ω](../../users/visitor-omega/person.md) | 深化 | 29 / 男 | 配音录音助理 | 0.4 | [O10](population-sources.md#o10)、[I01](population-sources.md#i01)、[M01](population-sources.md#m01) |
| [按一下试试](../../users/visitor-omega-upper/person.md) | 深化 | 32 / 女 | 家电售后接线员 | 0.6 | [O02](population-sources.md#o02)、[I02](population-sources.md#i02)、[M01](population-sources.md#m01) |
| [滋——](../../users/visitor-omicron/person.md) | 深化 | 28 / 男 | 游戏音效助理 | 1.1 | [O10](population-sources.md#o10)、[I03](population-sources.md#i03)、[S03](population-sources.md#s03) |
| [闲云](../../users/visitor-omicron-upper/person.md) | 深化 | 57 / 男 | 退休公交司机 | 0.65 | [S01](population-sources.md#s01)、[L02](population-sources.md#l02)、[I01](population-sources.md#i01) |
| [老榕树](../../users/visitor-phi/person.md) | 深化 | 56 / 女 | 退休电工 | 0.5 | [O04](population-sources.md#o04)、[L02](population-sources.md#l02)、[M01](population-sources.md#m01) |
| [路西法Φ](../../users/visitor-phi-upper/person.md) | 深化 | 50 / 男 | 楼宇设备巡检员 | 0.25 | [O04](population-sources.md#o04)、[L01](population-sources.md#l01)、[S02](population-sources.md#s02) |
| [路西法π](../../users/visitor-pi/person.md) | 深化 | 47 / 男 | 小型印刷店店主 | 0.8 | [O07](population-sources.md#o07)、[O04](population-sources.md#o04)、[L04](population-sources.md#l04) |
| [八分熟](../../users/visitor-pi-upper/person.md) | 深化 | 30 / 女 | 食品实验室助理 | 0.6 | [O12](population-sources.md#o12)、[M01](population-sources.md#m01)、[I01](population-sources.md#i01) |
| [阿团](../../users/visitor-psi/person.md) | 深化 | 43 / 女 | 社区食堂面点师 | 2.2 | [O03](population-sources.md#o03)、[S03](population-sources.md#s03)、[I02](population-sources.md#i02) |
| [热茶凉了](../../users/visitor-psi-upper/person.md) | 深化 | 39 / 女 | 社区广播站编辑 | 0.9 | [L03](population-sources.md#l03)、[L04](population-sources.md#l04)、[I02](population-sources.md#i02) |
| [路西法ρ](../../users/visitor-rho/person.md) | 深化 | 33 / 男 | 园艺养护工 | 0.12 | [O09](population-sources.md#o09)、[S02](population-sources.md#s02)、[L03](population-sources.md#l03) |
| [小写的r](../../users/visitor-rho-upper/person.md) | 深化 | 36 / 女 | 社区邮政窗口员 | 0.3 | [O02](population-sources.md#o02)、[S03](population-sources.md#s03)、[I03](population-sources.md#i03) |
| [橡皮屑](../../users/visitor-sigma/person.md) | 深化 | 21 / 女 | 美术材料店店员 | 1.5 | [O07](population-sources.md#o07)、[I02](population-sources.md#i02)、[M01](population-sources.md#m01) |
| [rollin](../../users/visitor-sigma-upper/person.md) | 深化 | 25 / 男 | 滑板店店员 | 1.7 | [O07](population-sources.md#o07)、[I02](population-sources.md#i02)、[M01](population-sources.md#m01) |
| [下半场再说](../../users/visitor-tau/person.md) | 深化 | 39 / 男 | 餐馆采购员 | 2.4 | [O05](population-sources.md#o05)、[I02](population-sources.md#i02)、[S02](population-sources.md#s02) |
| [补丁](../../users/visitor-tau-upper/person.md) | 深化 | 44 / 女 | 社区缝纫课老师 | 0.85 | [O08](population-sources.md#o08)、[L02](population-sources.md#l02)、[S03](population-sources.md#s03) |
| [路西法θ](../../users/visitor-theta/person.md) | 深化 | 38 / 男 | 水族店养护员 | 0.22 | [O09](population-sources.md#o09)、[I02](population-sources.md#i02)、[M01](population-sources.md#m01) |
| [口口](../../users/visitor-theta-upper/person.md) | 深化 | 26 / 女 | 文具设计助理 | 0.7 | [O07](population-sources.md#o07)、[M01](population-sources.md#m01)、[I03](population-sources.md#i03) |
| [一个顿号](../../users/visitor-upsilon/person.md) | 深化 | 32 / 女 | 字幕校对员 | 0.35 | [O10](population-sources.md#o10)、[I03](population-sources.md#i03)、[I02](population-sources.md#i02) |
| [路西法Υ](../../users/visitor-upsilon-upper/person.md) | 深化 | 28 / 男 | 独立桌游店助理 | 1.6 | [O07](population-sources.md#o07)、[I02](population-sources.md#i02)、[M01](population-sources.md#m01) |
| [饭点再叫我](../../users/visitor-xi/person.md) | 深化 | 36 / 女 | 公交调度文员 | 0.55 | [O05](population-sources.md#o05)、[S03](population-sources.md#s03)、[I03](population-sources.md#i03) |
| [暂时没电](../../users/visitor-xi-upper/person.md) | 深化 | 33 / 女 | 物流客服 | 0.4 | [O02](population-sources.md#o02)、[I01](population-sources.md#i01)、[I02](population-sources.md#i02) |
| [野地](../../users/visitor-zeta/person.md) | 深化 | 31 / 男 | 仓库理货员 | 0.28 | [O05](population-sources.md#o05)、[S02](population-sources.md#s02)、[L03](population-sources.md#l03) |
| [喵了个咪](../../users/visitor-zeta-upper/person.md) | 深化 | 31 / 男 | 烘焙原料配送员 | 1.2 | [O05](population-sources.md#o05)、[I01](population-sources.md#i01)、[M01](population-sources.md#m01) |
| [还有一节](../../users/visitor-latebell/person.md) | 新增 | 18 / 男 | 中职在校生 | 1.45 | [S03](population-sources.md#s03)、[L01](population-sources.md#l01)、[I02](population-sources.md#i02) |
| [水还没开](../../users/visitor-halfkettle/person.md) | 新增 | 34 / 男 | 家庭照护者；暂未就业 | 0.2 | [S03](population-sources.md#s03)、[L02](population-sources.md#l02)、[I01](population-sources.md#i01) |
| [翻到背面](../../users/visitor-secondpage/person.md) | 新增 | 47 / 女 | 待业；零散理货临工 | 0.45 | [S02](population-sources.md#s02)、[I02](population-sources.md#i02)、[M01](population-sources.md#m01) |
| [雨前收好](../../users/visitor-rainledger/person.md) | 新增 | 63 / 女 | 务农兼季节采收零工 | 0.25 | [S04](population-sources.md#s04)、[L05](population-sources.md#l05)、[S01](population-sources.md#s01) |
| [换班见](../../users/visitor-shiftcard/person.md) | 新增 | 26 / 女 | 小家电装配工 | 0.55 | [L01](population-sources.md#l01)、[L03](population-sources.md#l03)、[S02](population-sources.md#s02) |
| [平路优先](../../users/visitor-levelpath/person.md) | 新增 | 38 / 男 | 居家商品图片整理接单者 | 0.8 | [L06](population-sources.md#l06)、[I03](population-sources.md#i03)、[M01](population-sources.md#m01) |
| [空出周末](../../users/visitor-clearcalendar/person.md) | 新增 | 46 / 女 | 企业运营主管 | 1.35 | [I03](population-sources.md#i03)、[S03](population-sources.md#s03)、[M01](population-sources.md#m01) |
| [慢慢放](../../users/visitor-slowradio/person.md) | 新增 | 69 / 男 | 不固定接活；原修鞋工 | 0.18 | [S01](population-sources.md#s01)、[L02](population-sources.md#l02)、[I02](population-sources.md#i02) |
