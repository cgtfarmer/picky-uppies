import Animator from '../animator/animator.js';
import RectangleSpriteCanvasRenderer from '../sprite-renderer/canvas/rectangle-sprite-canvas-renderer.js';
import TextSpriteCanvasRenderer from '../sprite-renderer/canvas/text-sprite-canvas-renderer.js';
import RectangleSprite from '../sprite/canvas/rectangle-sprite.js';
import TextSprite from '../sprite/canvas/text-sprite.js';
import UiElement from './ui-element.js';
export default class UiElementFactory {
    static getInstance() {
        if (this.singleton != null)
            return this.singleton;
        this.singleton = new UiElementFactory();
        return this.singleton;
    }
    createButtonElement(bounds) {
        const sprite = new RectangleSprite(bounds, true, 2, '#666666', '#000000');
        const spriteRenderer = new RectangleSpriteCanvasRenderer();
        const animator = new Animator(spriteRenderer, [sprite]);
        const uiElement = new UiElement(animator);
        return uiElement;
    }
    createTextElement(center, content, fontSize) {
        const sprite = new TextSprite(center, content, fontSize, 'Georgia', 'center', true, 0.5, '#ffffff', '#000000');
        const spriteRenderer = new TextSpriteCanvasRenderer();
        const animator = new Animator(spriteRenderer, [sprite]);
        return new UiElement(animator);
    }
}
