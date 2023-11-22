import { Display } from './display';
import Bounds from '../bounds';
import Vector2 from '../vector2';

export default class CanvasDisplay implements Display {

  private static readonly id: string = 'canvas';

  private readonly bounds: Bounds;
  private readonly htmlCanvasElement: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private readonly transformMatrix: Vector2;

  private readonly backgroundColor: string;

  public constructor(
    width: number,
    height: number,
    backgroundColor: string,
    htmlCanvasElement: HTMLCanvasElement
  ) {
    this.bounds = new Bounds(
      new Vector2(
        (width / 2),
        (height / 2)
      ),
      new Vector2(width, height)
    );
    this.backgroundColor = backgroundColor;

    // this.htmlCanvas = new HTMLCanvasElement();
    this.htmlCanvasElement = htmlCanvasElement;
    this.htmlCanvasElement.id = CanvasDisplay.id;
    // this.htmlCanvasElement.id = 'canvas';
    this.htmlCanvasElement.width = width;
    this.htmlCanvasElement.height = height;
    this.htmlCanvasElement.style.backgroundColor = this.backgroundColor;

    const context = this.htmlCanvasElement.getContext('2d');

    if (context == null) throw Error('HTML Canvas Context failed to initialize');

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

  public getBounds(): Bounds {
    return this.bounds;
  }

  public getContext(): CanvasRenderingContext2D {
    return this.context;
  }

  public getHtmlCanvasElement(): HTMLCanvasElement {
    return this.htmlCanvasElement;
  }

  public getTransformMatrix(): Vector2 {
    return this.transformMatrix;
  }

  public clearFrame(): void {
    const size: Vector2 = this.bounds.getSize();

    this.context.clearRect(0, 0, size.x, size.y);
  }
}
