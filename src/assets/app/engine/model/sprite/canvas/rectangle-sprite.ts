import Bounds from '../../bounds.js';
import CanvasSprite from './canvas-sprite.js';

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
