# `Plugins.followScroll`

<!-- Generated from native authoring; do not edit. -->

[English](follow-scroll.md)

## Follow scrolling

<a id="entry-followscroll"></a>

跟随增长内容，直到读者开始查看历史

用于限制高度的流式日志或活动面板；读者未暂停时自动跟随最新内容。

观察视口、内容尺寸及内容树和文本变化。布局收缩导致浏览器钳制到底部时先记录该位置，避免随后内容增长后延迟到达的滚动事件误暂停跟随。向上滚轮、导航键、触摸或指针滚动，以及非折叠文本选择会暂停跟随。已注册的嵌套跟随所有者默认隔离输入，内容较短时也一样。启用 chain 后，对应边界或较短内容上的纵向滚轮可传递给祖先。普通滚动容器仅在原生溢出行为允许时传递边界滚轮；容器内部滚动及嵌套文本选择仍由本地拥有。resume() 显式回到最新位置；用户向下滚动到底部也会恢复。清除选择不会恢复跟随。 未收到输入通知的向上移动也会暂停，避免外部意图延迟到达前回跳。显式 resume 仅在稳定期间修正排队的移动：底部须跨一次渲染机会保持静止，不能只凭 scrollend 判断完成。无位移的 resume 不保留持续修正许可。新的向上意图取消稳定过程；稳定后到达的移动按新的阅读移动处理。 正常流式增长继续跟随；其位置写入及报告已有位置的事件不会延长旧移动的修正许可。

宿主必须有受限高度及 auto 或 scroll 滚动。content 在子组件挂载后选择一个稳定且不限制高度的后代。每个视口只能有一个跟随所有者，不要在同一视口同时使用其他位置写入或位置恢复机制。

每次挂载调用 connect(controller, element)，可返回清理函数。初始状态读取 controller.following；后续变化调用 onChange(following, controller)。控制器提供 update()、pause()、resume()、notifyScrollIntent('up'|'down'|'end')、destroy()。隐藏期间不写入位置，显示后保留跟随或暂停状态。卸载销毁控制器、观察器及监听器，断开后不得继续持有旧控制器。

应用拥有最新按钮的文案、可见性、布局、面板高度及折叠策略。应用主动展开或查看内容且需要保留阅读位置时，先调用 controller.pause()。手动更新可继续使用 jam.followScrollToBottom(viewport)；所有辅助函数形式都会跟踪内容变化以识别浏览器钳制；可选 { content: HTMLElement, onChange } 额外启用尺寸观察及自动跟随调度。 可信外部输入桥可调用 notifyScrollIntent('up') 暂停并取消待执行工作；'down' 在当前及下一次已安排的渲染机会检查是否实际到达底部，不会拉动已暂停的读者。若该机会内未到达底部，许可失效；更晚的移动需要新信号或显式 resume。可选 'end' 取消许可。原生滚动手势仍使用 scrollend 生命周期。应用负责桥接来源校验、已取消输入过滤及清理。

插件默认临时设置纵向溢出行为为 contain，chain 为 true 时设置为 auto；清理时恢复原始内联值，除非其他所有者已修改。链式传递已验证纵向滚轮；auto 下的原生触摸链式滚动尚未验证。忽略已取消、缩放和水平滚轮输入。替换内容节点需要重新挂载或应用插件。此能力不负责虚拟化、历史加载、行锚定或位置持久化。浏览器不提供 scrollend 时，显式 resume 可明确返回最新内容。

位置参数顺序: `content` → `connect` → `onChange` → `chain`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `content` | `string` | 未提供 | 稳定且不限制高度的内容后代选择器 |
| `connect` | `function` | 未提供 | 接收控制器和视口的挂载回调，可返回清理函数 |
| `onChange` | `function` | 未提供 | 接收布尔值和控制器的跟随状态变化回调 |
| `chain` | `boolean` | `false` | 在顶部向上、底部向下或内容未溢出时，允许纵向滚轮传递给祖先 |

Applications own the distinction between live output and completed history. A newly mounted short or hidden viewport may initially be at the bottom and therefore following. In `connect(controller, element)`, call `controller.pause()` for completed history before publishing the initial state; connect runs before the plugin schedules its first update. Also pause before revealing completed content when an existing controller may still be following from an earlier live phase. Keep explicit Latest actions mapped to `resume()`, and resume live disclosure only according to application policy. Pausing preserves the current position; it does not restore positions clamped by hiding or removing content. No extra scroll writer or per-frame correction is needed.

```javascript jaml-playground
export default {
    type: 'container',
    components: [
        {
            type: 'button',
            cap: 'Append log line',
            onclick() {
                const _body = this.parentElement.querySelector('.follow-log-content');
                _body.cmpt.insertComponent({ type: 'element', value: 'New output from the build', style: { display: 'block', padding: '8px' } });
            }
        },
        {
            type: 'button',
            cap: 'Latest',
            onclick() {
                this.parentElement.querySelector('.follow-log').followController?.resume();
            }
        },
        {
            type: 'container',
            class: 'follow-log',
            style: { display: 'block', height: '160px', overflow: 'auto' },
            plugins: [
                Plugins.followScroll({
                    content: '.follow-log-content',
                    connect(controller, element) {
                        element.followController = controller;
                        return () => {
                            if (element.followController === controller) {
                                delete element.followController;
                            }
                        };
                    }
                })
            ],
            components: [{ type: 'container', class: 'follow-log-content', style: { display: 'block' }, components: [{ type: 'element', value: 'Build started' }] }]
        }
    ]
};
```
