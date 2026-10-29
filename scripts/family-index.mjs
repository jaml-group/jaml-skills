// Curated selection pointers. Complete API contracts remain in their owning guides.
const purposes = {
    'Styles/animation': ['Entry, exit and motion effects.', '入场、离场与运动效果。'],
    'Styles/auto': ['Automatic focus, text fitting, movement/scroll synchronization and position restoration.', '自动聚焦、文字适配、移动或滚动同步与位置恢复。'],
    'Styles/checkbox': ['Checkbox/option layout and legacy markers; native controls own selection.', '复选框或选项布局及旧式标记；原生控件拥有选择状态。'],
    'Styles/theme': ['Local light/dark color-scheme boundaries; use on for foreground roles.', '局部明暗配色边界；前景角色使用 on。'],
    'Styles/check': ['Optional checked-option decoration; the native option owns selection.', '可选的选中项装饰；选择状态由原生选项控件拥有。'],
    'Styles/click': ['Click-triggered behavior, including bringing positioned peers forward.', '点击触发行为，包括将定位的同级内容置于前方。'],
    'Styles/echarts': ['Chart options and data presentation; start with the native chart contract.', '图表配置与数据呈现；先选择原生图表契约。'],
    'Styles/group': ['Grouped child surfaces and layout presets.', '子项分组表面与布局预设。'],
    'Styles/interact': ['Move, resize, fold, sort or dismiss an existing host; check the chosen behavior’s prerequisites.', '移动、调整大小、折叠、排序或关闭已有宿主；检查所选行为的前提。'],
    'Styles/on': ['Foreground roles for an existing light or dark surface.', '已有浅色或深色表面上的前景角色。'],
    'Styles/stylize': ['Deprecated compatibility aliases for group styles; use group for new composition.', '分组样式的已弃用兼容别名；新组合使用 group。'],
    'Styles/sync': ['Copy a computed dimension on framework resize; prefer flex/grid when sufficient.', '在框架尺寸事件中同步计算尺寸；能表达关系时优先使用 flex/grid。'],
    'Styles/with': ['Theme surface and trait treatments on a supported host.', '受支持宿主上的主题表面与特征处理。'],
    'Styles/common/agent': ['Style the native control backing an input.', '设置输入控件内部原生代理的样式。'],
    'Styles/common/align': ['Align boxes and their content.', '对齐盒子及其内容。'],
    'Styles/common/attrs': ['Set attributes on the selected host or slot target.', '为选定宿主或插槽目标设置属性。'],
    'Styles/common/background': ['Background color and image presentation.', '背景颜色与图像呈现。'],
    'Styles/common/border': ['Border geometry and appearance.', '边框几何与外观。'],
    'Styles/common/cap': ['Specialize the native caption’s presentation.', '定制原生标题的呈现。'],
    'Styles/common/clazz': ['Named classes and reusable descendant rules.', '命名类与可复用后代规则。'],
    'Styles/common/color': ['Foreground and semantic color presentation.', '前景与语义颜色呈现。'],
    'Styles/common/css': ['Local declarations and state-prefixed CSS; not a new interaction owner.', '局部声明与状态前缀 CSS；不创建新的交互所有者。'],
    'Styles/common/filter': ['Visual filters on the selected target.', '选定目标上的视觉滤镜。'],
    'Styles/common/flex': ['Flex sizing and placement.', 'Flex 尺寸与位置。'],
    'Styles/common/gap': ['Spacing between layout children.', '布局子项间距。'],
    'Styles/common/grid': ['Grid tracks and child placement.', '网格轨道与子项放置。'],
    'Styles/common/hide': ['Visibility and display treatments; check lifecycle when removing content.', '可见性与显示处理；移除内容时检查生命周期。'],
    'Styles/common/icon': ['Render icon names or literal glyphs; check renderer and asset prerequisites.', '呈现图标名称或字形；检查渲染器与资源前提。'],
    'Styles/common/layout': ['Container geometry, flex/grid arrangements and managed foldable layouts.', '容器几何、flex/grid 排列与受管理的可折叠布局。'],
    'Styles/common/margin': ['Space outside the selected box.', '选定盒子外部的间距。'],
    'Styles/common/mask': ['Mask and fade presentation.', '遮罩与渐隐呈现。'],
    'Styles/common/outline': ['Outlines around the selected target.', '选定目标周围的轮廓。'],
    'Styles/common/overflow': ['Overflow and directional presentation; check watcher requirements.', '溢出及方向呈现；检查观察行为的要求。'],
    'Styles/common/padding': ['Space inside the selected box.', '选定盒子内部的间距。'],
    'Styles/common/shadow': ['Shadow and elevation presentation.', '阴影与层次呈现。'],
    'Styles/common/size': ['Width, height and sizing constraints.', '宽度、高度与尺寸约束。'],
    'Styles/common/text': ['Typography and text wrapping; box alignment has its own contract.', '排版与文字换行；盒子对齐有独立契约。'],
    'Styles/common/trait': ['Shared semantic roles and type classes.', '共享语义角色与类型类。'],
    'Styles/common/value': ['Specialize the native value’s presentation.', '定制原生值的呈现。'],
    'Styles/layers/layer': ['Add content around the host’s existing purpose; read stacking and slot ownership.', '围绕宿主已有用途添加内容；阅读层叠与插槽所有权契约。'],
    'Styles/layers/background': ['Decorative background content.', '装饰性背景内容。'],
    'Styles/layers/border': ['Decorative border layers.', '装饰性边框层。'],
    'Styles/layers/canvas': ['Canvas-based decorative content.', '基于画布的装饰内容。'],
    'Styles/layers/chart': ['Chart layers around an existing host.', '已有宿主上的图表层。'],
    'Styles/layers/combo': ['Composite decorative layer effects.', '组合式装饰层效果。'],
    'Styles/layers/crosshair': ['Crosshair decoration.', '十字线装饰。'],
    'Styles/layers/css': ['A CSS-styled child layer.', '由 CSS 设置样式的子层。'],
    'Styles/layers/follower': ['Decorative layers with optional pointer following; does not own selection.', '可选跟随指针的装饰层；不拥有选择状态。'],
    'Styles/layers/glare': ['Glare and highlight effects.', '眩光与高亮效果。'],
    'Styles/layers/overlay': ['Overlay content and its stacking.', '覆盖层内容与层叠。'],
    'Styles/layers/ribbon': ['Ribbon decoration.', '缎带装饰。'],
    'Styles/layers/scroller': ['Scrolling layer effects.', '滚动层效果。'],
    'Styles/layers/spinner': ['Decorative activity; use a progress owner for measured completion.', '装饰性活动效果；可测量完成度应使用进度所有者。'],
    'Styles/layers/watermark': ['Watermark decoration.', '水印装饰。'],
    'Plugins/composable-plugins': ['Configuration-driven dashboard composition; requires a configuration and router.', '配置驱动的面板组合；需要配置与路由器。'],
    'Plugins/event': ['Publish scroll progress and active section through the messenger.', '通过消息系统发布滚动进度与当前章节。'],
    'Plugins/follow-scroll': ['Follow growing content while preserving reader-controlled pause/resume.', '跟随增长内容，并保留读者控制的暂停与恢复。'],
    'Plugins/i18n': ['Load translation dictionaries for existing localization.', '为已有本地化机制加载翻译字典。'],
    'Plugins/interact-plugins': ['Drag data, accept drops and other explicit interaction engines; free positioning starts with styles.', '拖放数据及显式交互引擎；自由定位先查看样式入口。'],
    'Plugins/navigation': ['Previous/next controls backed by an existing live collection owner.', '由已有实时集合所有者驱动的上一项与下一项控件。'],
    'Plugins/observe': ['Observe direct children or viewport intersection without owning the UI.', '观察直接子项或视口交叉，不拥有界面内容。'],
    'Plugins/popup': ['Attach contextual menus or tips; check trigger, focus and cleanup.', '附加上下文菜单或提示；检查触发、焦点与清理契约。'],
    'Plugins/router-plugins': ['URL-driven root and nested content outlets.', 'URL 驱动的根路由与嵌套路由出口。'],
    'Plugins/shortcut': ['Application-defined hover actions; not keyboard-shortcut registration.', '应用定义的悬停操作；不是键盘快捷键注册。'],
    'Plugins/show-more': ['Reveal another batch of existing native rows.', '分批显示已有原生行。'],
    'Plugins/subRouter': ['A nested outlet beneath the parent or global router.', '父路由或全局路由下的嵌套出口。']
};

export function familyPurpose(file, locale) {
    const _key = file.replace(/(?:\.zh)?\.md$/, '');
    const _purpose = purposes[_key];
    if (_purpose) {
        return _purpose[locale === 'zh' ? 1 : 0];
    }
    const _native = /^Styles\/([a-z]+)-style$/.exec(_key)?.[1];
    if (_native) {
        return locale === 'zh' ? `原生 ${_native} 的呈现；先选择元素与行为。` : `Presentation for native ${_native}; select the element and behavior first.`;
    }
    if (/^Styles\/(active|disabled|focus|hover|checked|indeterminate|visited)$/.test(_key)) {
        return locale === 'zh' ? '已有状态的呈现；不创建该状态。' : 'Presentation for an existing state; does not activate that state.';
    }
    if (/^Styles\/(before|after)$/.test(_key)) {
        return locale === 'zh' ? 'CSS 伪元素呈现。' : 'CSS pseudo-element presentation.';
    }
    if (/^Styles\/(cap|icon|label|extra)slot$/.test(_key)) {
        return locale === 'zh' ? '插槽包装器样式；与分配到插槽的内容不同。' : 'Slot-wrapper styling; distinct from its assigned content.';
    }
    if (/^Styles\/(child|extra)$/.test(_key)) {
        return locale === 'zh' ? '子项或插槽内容上的样式；先确认目标。' : 'Styles on child or slotted content; establish the target first.';
    }
    return '';
}
