import Sprite from '../sprite.js';
export default class CanvasSprite extends Sprite {
    constructor(type, fill, lineWidth, fillColor, strokeColor) {
        super('canvas');
        this.fill = fill;
        this.lineWidth = lineWidth;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
    }
    getFill() {
        return this.fill;
    }
    getLineWidth() {
        return this.lineWidth;
    }
    getFillColor() {
        return this.fillColor;
    }
    getStrokeColor() {
        return this.strokeColor;
    }
}
