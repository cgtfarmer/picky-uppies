export default class Canvas {

  private readonly container: Element;

  private readonly width: number;
  private readonly height: number;
  private readonly htmlCanvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;

  private readonly backgroundColor: string;

  public constructor(container: Element, width: number, height: number, backgroundColor: string) {
    this.container = container;
    this.width = width;
    this.height = height;
    this.backgroundColor = backgroundColor;

    this.htmlCanvas = new HTMLCanvasElement();
    this.htmlCanvas.width = this.width;
    this.htmlCanvas.height = this.height;
    this.htmlCanvas.style.backgroundColor = this.backgroundColor;

    const context = this.htmlCanvas.getContext('2d');

    if (context == null) throw Error('HTML Canvas Context failed to initialize');

    this.context = context;

    this.container.insertAdjacentElement('beforeend', this.htmlCanvas);

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
}
