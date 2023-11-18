import DomAccessor from './dom/dom-accessor.js';
import HtmlElementFactory from './dom/html-element-factory.js';
import DisplayFactory from './engine/model/display/display-factory.js';
import Game from './engine/model/game/game.js';
class Application {
    static getInstance() {
        if (this.singleton != null)
            return this.singleton;
        const htmlElementFactory = HtmlElementFactory.getInstance();
        const domAccessor = DomAccessor.getInstance();
        const displayFactory = DisplayFactory.getInstance();
        this.singleton = new Application(htmlElementFactory, domAccessor, displayFactory);
        return this.singleton;
    }
    constructor(htmlElementFactory, domAccessor, displayFactory) {
        this.htmlElementFactory = htmlElementFactory;
        this.domAccessor = domAccessor;
        this.displayFactory = displayFactory;
    }
    start() {
        const canvasElement = this.htmlElementFactory.createCanvas(Application.CANVAS_ID);
        this.domAccessor.append(Application.CONTAINER_ID, canvasElement);
        const canvasDisplay = this.displayFactory.createCanvas(canvasElement);
        const game = Game.getInstance();
        game.setDisplay(canvasDisplay);
        game.start();
    }
}
Application.CONTAINER_ID = 'main';
Application.CANVAS_ID = 'canvas';
export default Application;
Application.getInstance().start();
