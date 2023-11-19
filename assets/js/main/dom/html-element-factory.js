export default class HtmlElementFactory {
    static getInstance() {
        if (this.singleton == null)
            this.singleton = new HtmlElementFactory();
        return this.singleton;
    }
    createCanvas(id) {
        const canvas = document.createElement('canvas');
        canvas.id = id;
        return canvas;
    }
}
