# `Plugins.followScroll`

<!-- Generated from native authoring; do not edit. -->

[中文](follow-scroll.zh.md)

## Follow scrolling

<a id="entry-followscroll"></a>

Follow growing content until reader inspection

Use for capped streaming logs or activity panels that follow their latest content while the reader has not paused.

Observes viewport and content resize. Upward wheel, navigation keys, touch or pointer scrolling, and noncollapsed text selection pause following. Registered nested follow owners isolate input by default, including when short. With chain enabled, vertical wheel at the matching boundary or over short content may pass to an ancestor. Ordinary scroll boxes pass boundary wheel only when native overscroll permits; scrolling within a box and nested selection remain locally owned. resume() explicitly rejoins latest; downward user scrolling to bottom also rejoins. Selection collapse does not resume. Unsolicited upward movement also pauses before delayed external intent arrives. Explicit resume corrects queued motion only while settling: bottom must remain quiet across a rendering opportunity; scrollend alone is not completion. A no-op resume creates no ongoing correction permission. New upward intent cancels settlement. Motion arriving after settlement is treated as new reading movement. Normal streaming growth continues to follow; its writes and events reporting owned positions do not extend old correction permission.

Attach to a viewport with a bounded height and overflow auto or scroll. content must select one stable, uncapped descendant after children mount. One follow owner per viewport; do not combine with another position writer or saved-position restoration on that same viewport.

connect(controller, element) runs for each mount and may return cleanup. Read controller.following for initial state; onChange(following, controller) reports subsequent transitions. The controller provides update(), pause(), resume(), notifyScrollIntent('up'|'down'|'end') and destroy(). Hidden viewports receive no writes; reveal preserves follow/pause state. Unmount destroys that controller, observers and listeners. Never retain the old controller after disconnect.

App owns Latest button wording, visibility and placement, panel cap and collapse policy. Call controller.pause() before an app-driven inspection or expansion when it should preserve reading position. Existing jam.followScrollToBottom(viewport) remains the manual-update alternative; optional { content: HTMLElement, onChange } enables resize observation. For a trusted external input bridge, notifyScrollIntent('up') pauses and cancels pending work; 'down' checks actual bottom immediately and through one scheduled rendering opportunity without pulling a paused reader. If no movement reaches bottom in that opportunity, permission expires; a later movement needs another signal or explicit resume. Optional 'end' cancels permission. Native scroll gestures retain their scrollend lifetime. The app owns bridge authentication, canceled-input filtering and teardown.

The plugin temporarily sets vertical overscroll to contain by default or auto when chain is true, restoring the original inline value on cleanup unless another owner changed it. Chaining is verified for vertical wheel input; native touch chaining with auto is not qualified. Already canceled, zoom and horizontal wheel input is ignored. Content replacement requires remount/reapplication. This is not virtualization, history fetching, row anchoring or position persistence. Without browser scrollend, use explicit resume for unambiguous latest control.

Positional order: `content` → `connect` → `onChange` → `chain`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `content` | `string` | Not supplied | Selector for the stable uncapped content descendant |
| `connect` | `function` | Not supplied | Mount callback receiving controller and viewport; may return cleanup |
| `onChange` | `function` | Not supplied | Following-state transition callback receiving boolean and controller |
| `chain` | `boolean` | `false` | Allow vertical wheel to chain to an ancestor at top/up, bottom/down or when content does not overflow |

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
