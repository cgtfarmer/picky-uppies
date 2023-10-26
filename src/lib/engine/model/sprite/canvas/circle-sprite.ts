import CanvasSprite from './canvas-sprite';

export default class CircleSprite extends CanvasSprite {

  private radius: number;

  public constructor(
    radius: number,
    fill: boolean,
    lineWidth: number,
    fillColor: string,
    strokeColor: string,
  ) {
    super(fill, lineWidth, fillColor, strokeColor);

    this.radius = radius;
  }

  public getRadius(): number {
    return this.radius;
  }
}
