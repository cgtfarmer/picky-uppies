import Bounds from '../../bounds';
import CanvasSprite from './canvas-sprite';

export default class RectangleSprite extends CanvasSprite {

  private bounds: Bounds;

  public constructor(
    bounds: Bounds,
    fill: boolean,
    lineWidth: number,
    fillColor: string,
    strokeColor: string,
  ) {
    super('rectangle', fill, lineWidth, fillColor, strokeColor);

    this.bounds = bounds;
  }

  public getBounds(): Bounds {
    return this.bounds;
  }
}
