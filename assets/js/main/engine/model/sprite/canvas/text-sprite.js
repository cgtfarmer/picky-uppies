import CanvasSprite from './canvas-sprite.js';
export default class TextSprite extends CanvasSprite {
    constructor(center, content, fontSize, fontFamily, alignment, fill, lineWidth, fillColor, strokeColor) {
        super('text', fill, lineWidth, fillColor, strokeColor);
        this.center = center;
        this.content = content;
        this.fontSize = fontSize;
        this.fontFamily = fontFamily;
        this.alignment = alignment;
    }
    getCenter() {
        return this.center;
    }
    getAlignment() {
        return this.alignment;
    }
    getContent() {
        return this.content;
    }
    getFontSize() {
        return this.fontSize;
    }
    getFontFamily() {
        return this.fontFamily;
    }
    setContent(content) {
        this.content = content;
    }
}
