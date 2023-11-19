import CanvasDisplay from './canvas-display.js';
export default class DisplayFactory {
    static getInstance() {
        if (this.singleton == null)
            this.singleton = new DisplayFactory();
        return this.singleton;
    }
    createCanvas(htmlCanvasElement) {
        return new CanvasDisplay(1280, 720, '#000000', htmlCanvasElement);
    }
}
