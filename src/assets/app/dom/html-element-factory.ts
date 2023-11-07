export default class HtmlElementFactory {

  private static singleton: HtmlElementFactory;

  public static getInstance(): HtmlElementFactory {
    if (this.singleton == null) this.singleton = new HtmlElementFactory();

    return this.singleton;
  }

  public createCanvas(id: string): HTMLCanvasElement {
    const canvas: HTMLCanvasElement = document.createElement('canvas');

    canvas.id = id;

    return canvas;
  }
}
