import Animator from '/picky-uppies/assets/js/main/engine/model/animator/animator.js';
import TextSpriteCanvasRenderer from '/picky-uppies/assets/js/main/engine/model/sprite-renderer/canvas/text-sprite-canvas-renderer.js';
import TextSprite from '/picky-uppies/assets/js/main/engine/model/sprite/canvas/text-sprite.js';
import Vector2 from '/picky-uppies/assets/js/main/engine/model/vector2.js';
import StopWatch from './stop-watch.js';
export default class StopWatchFactory {
    static getInstance() {
        if (this.singleton != null)
            return this.singleton;
        this.singleton = new StopWatchFactory();
        return this.singleton;
    }
    createDefault(sceneBounds) {
        const sceneBoundsMax = sceneBounds.getMax();
        const center = new Vector2(0, (sceneBoundsMax.y - 100));
        const sprite = new TextSprite(center, '00:00:00', 84, 'Georgia', 'center', true, 0.5, '#ffffff', '#000000');
        const spriteRenderer = new TextSpriteCanvasRenderer();
        const animator = new Animator(spriteRenderer, [sprite]);
        const stopWatch = new StopWatch(animator);
        stopWatch.setCustomId('stop-watch');
        return stopWatch;
    }
}
