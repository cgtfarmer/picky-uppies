import CanvasSprite from './canvas-sprite.js';
export default class RectangleSprite extends CanvasSprite {
    constructor(bounds, fill, lineWidth, fillColor, strokeColor) {
        super('rectangle', fill, lineWidth, fillColor, strokeColor);
        this.bounds = bounds;
    }
    getBounds() {
        return this.bounds;
    }
}
