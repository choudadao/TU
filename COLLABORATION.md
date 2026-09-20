# TU 视觉基线与增量协作

设计来源：[HOME 66:580](https://www.figma.com/design/3wOR12HmvYis24oKXRExwg/TU-Draft?node-id=66-580)。2026-09-20 读取的新版设计上下文；桌面对照尺寸 1920 × 1080。

## 模块映射

| 模块 | Figma 节点 | 内容/结构 | 独立样式 |
|---|---|---|---|
| 导航和公告 | 66:582 | components/header.js | styles/header.css |
| 首屏 | 66:581 | content.js → hero；sections.js → renderScreen | styles/screens.css → .hero |
| 第二屏双入口 | 66:619 | content.js → identity；sections.js → renderScreen | styles/screens.css → .split |
| TU Classic | 66:630 | content.js → classic；sections.js → renderScreen | styles/screens.css → .campaign |
| 场景分类 | 66:635 | content.js → categories；sections.js → renderGrid | styles/grids.css → .categories |
| 全屏视频 | 66:652 | content.js → video；sections.js → renderVideo | styles/screens.css → .video |
| 四列商品入口 | 66:657 | content.js → edit；sections.js → renderGrid | styles/grids.css → .products |
| 服务条 | 66:686 | sections.js → renderServices | styles/services.css |
| 三列编辑影像 | 66:714 | content.js → stories；sections.js → renderGrid | styles/grids.css → .stories |
| 页尾 | 66:730 | components/footer.js | styles/footer.css |

代码路径均相对于 dist。机器可读映射为 module-map.js。共享 renderer 的修改应只对目标 layout 分支生效，不能影响其他消费者。

## 公共样式规范

| 项目 | Figma 基线 |
|---|---|
| 品牌字体 | Albert Sans，本地加载；常规 400 / 标题 500 |
| 页尾字体 | Albert Sans 400 |
| 常规标题 | 18px / 500 / 字距 -1px / 大写 |
| 视频标题 | 30px / 400 / 行高 38px / 字距 -0.6px / 大写 |
| 文字入口 | 14px / 400 / 字距 -1px / 大写 / 下划线边框 0.5px |
| 主文字 / 次级文字 | #212529 / #565B58 |
| 反白 / 反白边框 | #FFFFFF / rgba(255,255,255,.4) |
| 常用间距 | 8 / 16 / 24 / 40 / 60 / 80px |
| 桌面左右留白 | 60px，场景与影像模块按原稿通栏 |
| 图标 | 使用 Figma 导出资产；导航 22px，社交 24px |
| 全屏高度 | 100svh；原稿基准 1080px，保留浏览器全屏行为 |
| 普通影像模块 | 1920 宽时 880px；桌面其他宽度按模块比例适配 |

规范位于 styles/tokens.css。局部改版优先覆盖模块样式，不随意修改公共 token。

## 冻结的动效

只有开场第二屏覆盖第一屏。只有 fullscreen 模块变暗/变亮；最大暗层 55%，原有 smoothstep 计算不变。新增视频也是 fullscreen，因此居中时为完整亮度；普通模块不变暗。明暗与叠层仍独立为 motion.js + styles/motion.css；逐屏吸附及导航开合独立为 snap.js，不与原动效混写。减少动态效果模式保持原有关闭行为。

## 每次更新流程

1. 用户提供节点链接、改动说明和需要保留的部分。
2. 读取该节点的新设计，与对应前端模块比较；说明修改范围及公共样式影响。
3. 只修改对应内容、组件与模块样式；保留 DOM id、节点映射和动效。
4. 同尺寸截图检查目标模块，检查未改模块、手机布局和滚动行为。
5. 提交差异清单并更新原预览链接，不另建网站。

可直接使用：
“更新了【模块名】的【节点链接】。请仅同步此模块的视觉与内容，其余模块和两种动效不变。如涉及公共样式或关联组件，先说明影响。完成后给出同尺寸截图和改动清单。”

## 已知边界

- 这是首页视觉/交互原型，不包含真实账户、搜索、购物、订阅和社交跳转；图标保留原稿视觉但不伪造业务结果。
- 公告里的 Rings / XX%、重复图片、退换承诺、电话号码来自原稿占位内容，本次不替客户改文案；上线前必须另行确认。
- 没有指定移动端 Figma 节点，窄屏是基本自适应，不宣称移动端逐像素还原。
