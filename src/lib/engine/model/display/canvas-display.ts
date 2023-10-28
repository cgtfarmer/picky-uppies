import DomAccessor from '@/lib/accessor/dom-accessor';
import { Display } from './display';

export default class CanvasDisplay implements Display {

  private static readonly id: string = 'canvas';

  private readonly width: number;
  private readonly height: number;
  private readonly htmlCanvasElement: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;

  private readonly backgroundColor: string;

  public constructor(width: number, height: number, backgroundColor: string) {
    this.width = width;
    this.height = height;
    this.backgroundColor = backgroundColor;

    // this.htmlCanvas = new HTMLCanvasElement();
    this.htmlCanvasElement = DomAccessor.getInstance().createCanvas();
    this.htmlCanvasElement.id = CanvasDisplay.id;
    // this.htmlCanvasElement.id = 'canvas';
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
