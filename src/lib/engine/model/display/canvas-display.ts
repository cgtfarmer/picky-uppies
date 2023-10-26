import Display from './display';

export default class CanvasDisplay extends Display {

  private static singleton: CanvasDisplay;

  private readonly width: number;
  private readonly height: number;
  private readonly htmlCanvasElement: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;

  private readonly backgroundColor: string;

  public static getInstance(): CanvasDisplay {
    if (this.singleton == null) this.singleton =
      new CanvasDisplay(1280, 720, '#888888');
    // new Canvas(container, 1360, 765, '#888888');

    return this.singleton;
  }

  public constructor(width: number, height: number, backgroundColor: string) {
    super();

    this.width = width;
    this.height = height;
    this.backgroundColor = backgroundColor;

    // this.htmlCanvas = new HTMLCanvasElement();
    this.htmlCanvasElement = document.createElement('canvas');
    this.htmlCanvasElement.width = this.width;
    this.htmlCanvasElement.height = this.height;
    this.htmlCanvasElement.style.backgroundColor = this.backgroundColor;

    const context = this.htmlCanvasElement.getContext('2d');

    if (context == null) throw Error('HTML Canvas Context failed to initialize');

    this.context = context;

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

  public getContext(): CanvasRenderingContext2D {
    return this.context;
  }

  public getHtmlCanvasElement(): Element {
    return this.htmlCanvasElement;
  }

  public clearFrame(): void {
    this.context.clearRect(0, 0, this.width, this.height);
  }
}
