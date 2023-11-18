import CanvasDisplay from './canvas-display.js';

export default class DisplayFactory {

  private static singleton: DisplayFactory;

  public static getInstance(): DisplayFactory {
    if (this.singleton == null) this.singleton = new DisplayFactory();

    return this.singleton;
  }

  public createCanvas(htmlCanvasElement: HTMLCanvasElement): CanvasDisplay {
    return new CanvasDisplay(1280, 720, '#000000', htmlCanvasElement);
  }
}
