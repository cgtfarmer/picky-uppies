import CanvasDisplay from '../../display/canvas-display';
import Scene from '../../scene/scene';
import CircleSprite from '../../sprite/canvas/circle-sprite';
import Transform from '../../transform';
import Vector2 from '../../vector2';
import { SpriteRenderer } from '../sprite-renderer';

export default class CircleSpriteCanvasRenderer implements SpriteRenderer {

  private static readonly START_ANGLE: number = 0;
  private static readonly END_ANGLE: number = 2 * Math.PI;
  private static readonly COUNTERCLOCKWISE: boolean = false;

  private readonly sprite: CircleSprite;
  private readonly scene: Scene;
  private readonly canvas: CanvasDisplay;

  private readonly canvasContext: CanvasRenderingContext2D;

  public constructor(sprite: CircleSprite, canvas: CanvasDisplay, scene: Scene) {
    this.sprite = sprite;
    this.canvas = canvas;
    this.scene = scene;
    this.canvasContext = this.canvas.getContext();
  }

  public render() {
    this.canvasContext.beginPath();
    this.canvasContext.lineWidth = this.sprite.getLineWidth();
    this.canvasContext.strokeStyle = this.sprite.getStrokeColor();
    this.canvasContext.fillStyle = this.sprite.getFillColor();

    const center: Vector2 = this.sprite.getCenter();
    this.canvasContext.arc(
      center.x,
      center.y,
      // (this.transform.position.x + (this.sprite.getRadius() / 2)),
      // (this.transform.position.y + (this.sprite.getRadius() / 2)),
      this.sprite.getRadius(),
      CircleSpriteCanvasRenderer.START_ANGLE,
      CircleSpriteCanvasRenderer.END_ANGLE,
      CircleSpriteCanvasRenderer.COUNTERCLOCKWISE
    );

    if (this.sprite.getFill()) {
      this.canvasContext.fill();
    }

    this.canvasContext.stroke();
  }
}

// class Circle {
//   constructor(x, y, radius, color) {
//     this.x = x;
//     this.y = y;
//     this.xAnchor = x;
//     this.yAnchor = y;
//     this.radius = radius;
//     this.fillColor = color;
//     this.lineWidth = 0.5;
//     this.strokeColor = '#000000';
//   }

//   render() {
//     game.ctx.beginPath();
//     game.ctx.lineWidth = this.lineWidth;
//     game.ctx.strokeStyle = this.strokeColor;
//     game.ctx.fillStyle = this.fillColor;
//     game.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
//     game.ctx.fill();
//     game.ctx.stroke();
//   }
// }
