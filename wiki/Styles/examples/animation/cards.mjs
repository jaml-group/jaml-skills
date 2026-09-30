export function card(index) {
    return {
        type: 'label',
        cap: `Card ${index}`,
        color: 'random',
        styles: ['background.stripy', 'animation.entry.frombottom(duration:400;easing:bouncing;delay:seq(25))', 'animation.exit.squeeze(to:left;duration:200)', 'interact.closable']
    };
}
