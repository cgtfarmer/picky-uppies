class CircleSpriteCanvasRenderer {
    constructor() {
        this.sprite = null;
        this.canvas = null;
        this.canvasContext = null;
        this.gameObject = null;
    }
    setGameObject(gameObject) {
        this.gameObject = gameObject;
    }
    setSprite(sprite) {
        this.sprite = sprite;
    }
    setDisplay(display) {
        this.canvas = display;
        this.canvasContext = this.canvas.getContext();
    }
    render() {
        if (this.sprite == null ||
            this.canvas == null ||
            this.canvasContext == null ||
            this.gameObject == null)
            return;
        this.canvasContext.beginPath();
        this.canvasContext.lineWidth = this.sprite.getLineWidth();
        this.canvasContext.strokeStyle = this.sprite.getStrokeColor();
        this.canvasContext.fillStyle = this.sprite.getFillColor();
        const canvasCenter = this.canvas.getBounds().getCenter();
        const position = this.gameObject.getTransform().position;
        this.canvasContext.arc(
        // center.x,
        // center.y,
        (canvasCenter.x + position.x), (canvasCenter.y + position.y), 
        // (this.transform.position.x + (this.sprite.getRadius() / 2)),
        // (this.transform.position.y + (this.sprite.getRadius() / 2)),
        this.sprite.getRadius(), CircleSpriteCanvasRenderer.START_ANGLE, CircleSpriteCanvasRenderer.END_ANGLE, CircleSpriteCanvasRenderer.COUNTERCLOCKWISE);
        if (this.sprite.getFill()) {
            this.canvasContext.fill();
        }
        this.canvasContext.stroke();
    }
}
CircleSpriteCanvasRenderer.START_ANGLE = 0;
CircleSpriteCanvasRenderer.END_ANGLE = 2 * Math.PI;
CircleSpriteCanvasRenderer.COUNTERCLOCKWISE = false;
export default CircleSpriteCanvasRenderer;
// class Circle {
//   constructor(x, y, radius, color) {
//     this.x = x;
//     this.y = y;
//     this.xAnchor = x;
//     this.yAnchor = y;
//     this.radius = radius;
//     this.fillColor = color;
//     this.lineWidth = 0.5;
//     this.strokeColor = '#000000';
//   }
//   render() {
//     game.ctx.beginPath();
//     game.ctx.lineWidth = this.lineWidth;
//     game.ctx.strokeStyle = this.strokeColor;
//     game.ctx.fillStyle = this.fillColor;
//     game.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
//     game.ctx.fill();
//     game.ctx.stroke();
//   }
// }
