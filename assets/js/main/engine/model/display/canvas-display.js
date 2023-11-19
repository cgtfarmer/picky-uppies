import Bounds from '../bounds.js';
import Vector2 from '../vector2.js';
class CanvasDisplay {
    constructor(width, height, backgroundColor, htmlCanvasElement) {
        this.bounds = new Bounds(new Vector2((width / 2), (height / 2)), new Vector2(width, height));
        this.backgroundColor = backgroundColor;
        // this.htmlCanvas = new HTMLCanvasElement();
        this.htmlCanvasElement = htmlCanvasElement;
        this.htmlCanvasElement.id = CanvasDisplay.id;
        // this.htmlCanvasElement.id = 'canvas';
        this.htmlCanvasElement.width = width;
        this.htmlCanvasElement.height = height;
        this.htmlCanvasElement.style.backgroundColor = this.backgroundColor;
        const context = this.htmlCanvasElement.getContext('2d');
        if (context == null)
            throw Error('HTML Canvas Context failed to initialize');
        this.context = context;
        this.transformMatrix = new Vector2(1, -1);
        // this.container.insertAdjacentElement('beforeend', this.htmlCanvas);
        // this.container.insertAdjacentHTML('beforeend', `
        //   <canvas
        //     id="canvas"
        //     width="${this.width}"
        //     height="${this.height}"
        //     style="background-color: ${this.backgroundColor};"
        //   >
        //   </canvas>
        // `);
    }
    getBounds() {
        return this.bounds;
    }
    getContext() {
        return this.context;
    }
    getHtmlCanvasElement() {
        return this.htmlCanvasElement;
    }
    getTransformMatrix() {
        return this.transformMatrix;
    }
    clearFrame() {
        const size = this.bounds.getSize();
        this.context.clearRect(0, 0, size.x, size.y);
    }
}
CanvasDisplay.id = 'canvas';
export default CanvasDisplay;
