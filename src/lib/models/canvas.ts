export default class Canvas {

  private readonly container: Element;

  private readonly width: number;
  private readonly height: number;

  private readonly backgroundColor: string;

  public constructor(container: Element, width: number, height: number, backgroundColor: string) {
    this.container = container;
    this.width = width;
    this.height = height;
    this.backgroundColor = backgroundColor;

    this.container.insertAdjacentHTML('beforeend', `
      <canvas
        id="canvas"
        width="${this.width}"
        height="${this.height}"
        style="background-color: ${this.backgroundColor};"
      >
      </canvas>
    `);
  }
}
