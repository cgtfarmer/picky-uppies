import CanvasDisplay from './canvas-display';

export default class DisplayFactory {

  private static singleton: DisplayFactory;

  public static getInstance(): DisplayFactory {
    if (this.singleton == null) this.singleton = new DisplayFactory();

    return this.singleton;
  }

  public createCanvas(): CanvasDisplay {
    return new CanvasDisplay(1280, 720, '#000000');
  }
}
