import CanvasSprite from './canvas-sprite';

export default class RectangleSprite extends CanvasSprite {

  private width: number;
  private height: number;

  public constructor(
    width: number,
    height: number,
    fill: boolean,
    lineWidth: number,
    fillColor: string,
    strokeColor: string,
  ) {
    super(fill, lineWidth, fillColor, strokeColor);

    this.width = width;
    this.height = height;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }
}
