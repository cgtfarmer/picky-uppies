export default class TextSpriteCanvasRenderer {
    constructor() {
        this.sprite = null;
        this.canvas = null;
        this.canvasContext = null;
        this.gameObject = null;
    }
    setDisplay(display) {
        this.canvas = display;
        this.canvasContext = this.canvas.getContext();
    }
    setSprite(sprite) {
        this.sprite = sprite;
    }
    setGameObject(gameObject) {
        this.gameObject = gameObject;
    }
    render() {
        if (this.sprite == null ||
            this.canvas == null ||
            this.canvasContext == null ||
            this.gameObject == null)
            return;
        const center = this.sprite.getCenter();
        this.canvasContext.beginPath();
        this.canvasContext.lineWidth = this.sprite.getLineWidth();
        this.canvasContext.strokeStyle = this.sprite.getStrokeColor();
        this.canvasContext.fillStyle = this.sprite.getFillColor();
        this.canvasContext.font = `${this.sprite.getFontSize()}px ${this.sprite.getFontFamily()}`;
        this.canvasContext.textAlign = this.sprite.getAlignment();
        const canvasCenter = this.canvas.getBounds().getCenter();
        this.canvasContext.fillText(this.sprite.getContent(), (canvasCenter.x + center.x), (canvasCenter.y - center.y));
        if (this.sprite.getFill()) {
            this.canvasContext.fill();
        }
        this.canvasContext.stroke();
    }
}
