# 资料核查笔记

## 已核实的核心事实

| 项目 | 结论 | 来源状态 |
| --- | --- | --- |
| 景点名称 | Menara Keagungan Limboto；当地也常称 Pakaya Tower / Menara Pakaya | Gorontalo 县旅游搜索结果与官方新闻索引一致 |
| 位置 | Kayubulan, Kecamatan Limboto, Kabupaten Gorontalo, Gorontalo, Indonesia | 用户提供的 Google Maps 地址已核对 |
| 坐标 | 0.6269984, 122.9773079 | 用户提供的地图嵌入链接参数 |
| 定位 | Limboto 城镇地标及公共空间，位于 Kabupaten Gorontalo 行政中心附近 | Google Maps 与县政府搜索结果 |
| 建筑特征 | 开放式钢结构观景塔，与公园及周边城市街景共同构成地标景观 | 真实照片检索与官方景点简介摘要 |

## 内容处理原则

1. 当前用户明确要求网站支持英语，因此以 **Bahasa Indonesia 为默认语言**，提供 **English** 切换；此要求优先于原始材料中的“单语言”描述。
2. 原始材料中与 Baguio 有关的尾部文字与该地点无关，不纳入网站。
3. 没有可靠一手来源支撑的开放时间、门票、停车容量或评分，不写为确定事实；改以“请在出行前向现场或官方渠道确认”的中性提示呈现。
4. 站内将使用用户提供的 Google Maps 嵌入地址，并改为印尼语地区参数 `id` 与 `ID`。
5. 真实摄影仅使用明确来源的已搜集照片；原创生成资产限定为品牌标志和抽象装饰，不把生成图当作场地纪实照片。

## 已访问来源

- Google Maps：用户提供的地址页面，确认位于 Kayubulan, Limboto。
- Gorontalo 县旅游部门的 destinations 页面：访问时返回 502；其搜索索引仍显示景点官方描述，页面可用性将在站内以非官方声明及出行前确认提示处理。
- Google Maps 的地点条目：地点显示为 "Limboto Tower / Menara Keagungan Limboto"，并在查询时显示 4.6 / 5、6,248 条评论、地址与当日开放状态；该类动态信息已在页面中标明查询日期，并提示出行前复核。
- Wikimedia Commons：`Menara Keagungan Limboto.jpg` 的作者声明为 CC BY-SA 4.0；网站使用该照片并在图注中注明作者与许可证。

## 交付前界面验证

| 检查项 | 结果 |
| --- | --- |
| 首页默认语言 | 通过：页面首先显示 Bahasa Indonesia。 |
| 英语切换 | 通过：顶栏按钮将导航、正文、FAQ、页脚和页面标题切换为 English。 |
| 独立法律页面 | 通过：隐私政策、服务条款与 Cookie 设置均为独立路由，而非弹窗。 |
| 响应式主页面 | 通过：已检查桌面与 390px 宽度移动端的首屏、信息区块和页脚。 |
| TypeScript 与生产构建 | 通过：`pnpm check` 与 `pnpm build` 均成功。 |

## 构建静态审计说明

构建产物中未发现 `example.com` 或 `chrome-extension://`。`localhost` 仅出现在 Manus 预览平台自动注入的运行时调试条件中（`window.__MANUS_HOST_DEV__`），不属于网站内容、链接、canonical、结构化数据或部署域名。

---

# 2026 年 8 月内容扩充资料

## 已核验的新增事实

| 主题 | 可用于网站的表述 | 来源 |
| --- | --- | --- |
| 建造与落成 | 印尼语 Wikipedia 条目记载：塔于 2002 年建设，2003 年 9 月 20 日落成；网站将明确标注为“百科条目记载”，避免将二手信息表述为官方结论。 | https://id.wikipedia.org/wiki/Menara_Keagungan |
| 当前管理 | Gorontalo 县政府 2026 年公告称：Menara Pakaya 的五年管理合作包含管理、修复、周边区域整治、垂直通达和公共区域的阶段性完善。 | https://gorontalokab.go.id/berita/1117/menara-pakaya-dikelola-swasta-pemkab-gorontalo-dorong-produktivitas-aset |
| 从城区抵达 | 省交通部门的线路查询页列有 Terminal Dungingi—Telaga—Terminal Limboto（AA-02）及 Gorontalo—Kayubulan—Biluhu Tengah—Ilomata（P-05）等线路。该页不保证具体班次、票价或最后一段步行条件。 | https://sahabat.gorontaloprov.go.id/cek-trayek |
| 机场地面交通 | 省级公开资料检索显示 Djalaluddin 机场进行机场出租车与租赁车辆地面交通管理；网站将仅提示“使用正规机场出租车、预订接送或租赁车辆，并在出发当天确认”，不写固定价格或候车位置。 | https://berita.gorontaloprov.go.id/2017/11/12/dishub-bandara-djalaluddin-tata-transportasi-di-bandara/ |

## 内容边界

1. 当前县政府公告说明区域处于持续整治或设施完善背景之下；因此 WC、无障碍、停车位数量、观景层开放状态、夜间进出和充电设备均不得写成固定可用的既成事实。
2. 站内将补充“服务类型与提问方式”而非商户名称、价格、评分或商业导购。
3. 交通板块将拆成机场、城市/公交、出租车/租车、私家车/最后一段四个通道，并以“出发前确认”作为统一安全提示。

## 补充参考与编辑决策

| 资料 | 可用内容 | 编辑处理 |
| --- | --- | --- |
| Gorontalo 省机场地面交通公告 | 机场对出租车和租赁车辆实施地面交通管理；公告强调乘客舒适与安全。 | 用于“选择正规、已许可或预订渠道”的一般性提醒，不保留 2017 年的运营商数量、价格或候车点。 |
| Kompas 2022 年报道 | 报道称塔为钢结构，约 65 米高、设五层，并提及 2019 年 LED 美化和从塔上可见城市、山地与 Danau Limboto。 | 作为“历史资料/媒体报道”的解释性脚注；不把电梯、观景层、夜灯或登塔通道写成当下保证。 |
| 2026 年县政府公告 | 管理与修复仍在推进，涉及结构、垂直通达及公共区。 | 在实用页设置显著的“现场状态”提示，指导游客在出行日确认。 |

## 关于传说内容

本轮检索没有发现由政府、档案馆、研究机构或可靠媒体明确记录、且专门与 Menara Keagungan Limboto 相关的地方传说。网站不会创作或转载来源不明的“传说”；将使用带出处的“历史时间线与城市语境”替代，以保持专业科普项目的可验证性。

## 本轮页面核验

| 检查项 | 结果 |
| --- | --- |
| 英语首页 | 通过：历史时间线、四种到达方式、七类实用服务、来源链接及 FAQ 均转换为英语；仅保留不可翻译的专有地名、机构名和路线编码。 |
| 印尼语首页 | 通过：新增模块均使用 Bahasa Indonesia；英文只存在于许可缩写、品牌专名、地图服务名与引用来源名。 |
| 语言切换 | 通过：从英语切回默认印尼语后，页面标题、导航、辅助文字、FAQ 和新增章节完整更新。 |
| 桌面与移动布局 | 通过：1280px 与 390px 宽度下，新时间线、交通板块和服务卡片均保持可读。 |
| 构建验证 | 通过：`pnpm check` 和 `pnpm build` 均成功。 |
