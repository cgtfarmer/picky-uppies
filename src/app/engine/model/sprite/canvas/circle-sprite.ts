import Vector2 from '../../vector2.js';
import CanvasSprite from './canvas-sprite.js';

export default class CircleSprite extends CanvasSprite {

  private center: Vector2;
  private radius: number;

  public constructor(
    center: Vector2,
    radius: number,
    fill: boolean,
    lineWidth: number,
    fillColor: string,
    strokeColor: string,
  ) {
    super('circle', fill, lineWidth, fillColor, strokeColor);

    this.center = center;
    this.radius = radius;
  }

  public getCenter(): Vector2 {
    return this.center;
  }

  public getRadius(): number {
    return this.radius;
  }
}
