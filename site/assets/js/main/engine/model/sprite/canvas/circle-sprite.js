import CanvasSprite from './canvas-sprite.js';
export default class CircleSprite extends CanvasSprite {
    constructor(center, radius, fill, lineWidth, fillColor, strokeColor) {
        super('circle', fill, lineWidth, fillColor, strokeColor);
        this.center = center;
        this.radius = radius;
    }
    getCenter() {
        return this.center;
    }
    getRadius() {
        return this.radius;
    }
}
