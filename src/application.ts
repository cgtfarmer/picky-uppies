import DomAccessor from './main/dom/dom-accessor';
import HtmlElementFactory from './main/dom/html-element-factory';
import CanvasDisplay from './main/engine/model/display/canvas-display';
import DisplayFactory from './main/engine/model/display/display-factory';
import Game from './main/engine/model/game/game';

export default class Application {

  private static readonly CONTAINER_ID: string = 'main';
  private static readonly CANVAS_ID: string = 'canvas';

  private static singleton: Application;

  public static getInstance(): Application {
    if (this.singleton != null) return this.singleton;

    const htmlElementFactory: HtmlElementFactory = HtmlElementFactory.getInstance();

    const domAccessor: DomAccessor = DomAccessor.getInstance();

    const displayFactory: DisplayFactory = DisplayFactory.getInstance();

    this.singleton = new Application(htmlElementFactory, domAccessor, displayFactory);

    return this.singleton;
  }

  private htmlElementFactory: HtmlElementFactory;
  private domAccessor: DomAccessor;
  private displayFactory: DisplayFactory;

  public constructor(
    htmlElementFactory: HtmlElementFactory,
    domAccessor: DomAccessor,
    displayFactory: DisplayFactory
  ) {
    this.htmlElementFactory = htmlElementFactory;
    this.domAccessor = domAccessor;
    this.displayFactory = displayFactory;
  }

  public start(): void {
    const canvasElement: HTMLCanvasElement =
      this.htmlElementFactory.createCanvas(Application.CANVAS_ID);

    this.domAccessor.append(Application.CONTAINER_ID, canvasElement);

    const canvasDisplay: CanvasDisplay = this.displayFactory.createCanvas(canvasElement);

    const game: Game = Game.getInstance();
    game.setDisplay(canvasDisplay);
    game.start();
  }
}

Application.getInstance().start();
