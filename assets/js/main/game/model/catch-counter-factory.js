import CatchCounter from './catch-counter.js';
import Animator from '/picky-uppies/assets/js/main/engine/model/animator/animator.js';
import TextSpriteCanvasRenderer from '/picky-uppies/assets/js/main/engine/model/sprite-renderer/canvas/text-sprite-canvas-renderer.js';
import TextSprite from '/picky-uppies/assets/js/main/engine/model/sprite/canvas/text-sprite.js';
import Vector2 from '/picky-uppies/assets/js/main/engine/model/vector2.js';
export default class CatchCounterFactory {
    static getInstance() {
        if (this.singleton != null)
            return this.singleton;
        this.singleton = new CatchCounterFactory();
        return this.singleton;
    }
    createDefault(sceneBounds) {
        const sceneBoundsMax = sceneBounds.getMax();
        const center = new Vector2((sceneBoundsMax.x - 84), (sceneBoundsMax.y - 100));
        const sprite = new TextSprite(center, '0 / 10', 84, 'Georgia', 'end', true, 0.5, '#ffffff', '#000000');
        const spriteRenderer = new TextSpriteCanvasRenderer();
        const animator = new Animator(spriteRenderer, [sprite]);
        const catchCounter = new CatchCounter(animator, 10);
        catchCounter.setCustomId('catch-counter');
        return catchCounter;
    }
}
