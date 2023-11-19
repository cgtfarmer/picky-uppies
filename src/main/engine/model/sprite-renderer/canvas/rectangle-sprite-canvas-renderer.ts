import Bounds from '../../bounds';
import CanvasDisplay from '../../display/canvas-display';
import { Display } from '../../display/display';
import GameObject from '../../game-object';
import Scene from '../../scene/scene';
import RectangleSprite from '../../sprite/canvas/rectangle-sprite';
import Sprite from '../../sprite/sprite';
import Transform from '../../transform';
import Vector2 from '../../vector2';
import { SpriteRenderer } from '../sprite-renderer';

export default class RectangleSpriteCanvasRenderer implements SpriteRenderer {

  private sprite: RectangleSprite | null;
  private canvas: CanvasDisplay | null;
  private canvasContext: CanvasRenderingContext2D | null;
  private gameObject: GameObject | null;

  public constructor() {
    this.sprite = null;
    this.canvas = null;
    this.canvasContext = null;
    this.gameObject = null;
  }

  public setDisplay(display: CanvasDisplay): void {
    this.canvas = display;
    this.canvasContext = this.canvas.getContext();
  }

  public setSprite(sprite: RectangleSprite): void {
    this.sprite = sprite;
  }

  public setGameObject(gameObject: GameObject): void {
    this.gameObject = gameObject;
  }

  public render(): void {
    if (
      this.sprite == null ||
      this.canvas == null ||
      this.canvasContext == null ||
      this.gameObject == null
    ) return;

    // console.log(`GO xform: ${this.gameObject?.getTransform()}`);
    this.canvasContext.beginPath();
    this.canvasContext.lineWidth = this.sprite.getLineWidth();
    this.canvasContext.strokeStyle = this.sprite.getStrokeColor();
    this.canvasContext.fillStyle = this.sprite.getFillColor();

    const bounds: Bounds = this.sprite.getBounds();
    // const min: Vector2 = bounds.getMin();
    // const max: Vector2 = bounds.getMax();
    const size: Vector2 = bounds.getSize();

    // const sceneCenter: Vector2 = this.scene.getBounds().getCenter();
    const canvasCenter: Vector2 = this.canvas.getBounds().getCenter();
    this.canvasContext.rect(
      // this.transform.position.x,
      // this.transform.position.y,
      // (this.transform.position.x - extents.x),
      // (this.transform.position.y - extents.y),
      (canvasCenter.x + this.getMin().x),
      (canvasCenter.y + this.getMax().y),
      size.x,
      size.y
    );

    if (this.sprite.getFill()) {
      this.canvasContext.fill();
    }

    this.canvasContext.stroke();
  }

  public getMin(): Vector2 {
    if (this.sprite == null || this.gameObject == null) return Vector2.zero();

    return this.gameObject.getTransform().position
      .add(this.sprite.getBounds().getMin());
    // .subtract(this.sprite.getBounds().getMin())
    // .subtract(this.sprite.getBounds().getMin());
  }

  public getMax(): Vector2 {
    if (this.sprite == null || this.gameObject == null) return Vector2.zero();

    return this.gameObject.getTransform().position
      .add(this.sprite.getBounds().getMax());
    // .subtract(this.sprite.getBounds().getMax());
  }
}

// class Rectangle {
//   constructor(x, y, width, height, color) {
//     this.width = width;
//     this.height = height;
//     this.x = x;
//     this.y = y;
//     this.xAnchor = (x + (this.width / 2));
//     this.yAnchor = (y + (this.height / 2));
//     this.lineWidth = 0.5;
//     this.strokeColor = '#000000';
//     this.fillColor = color;
//     this.fill = true;
//     this.rotation = null;
//   }

//   updatePosition(x, y) {
//     this.x = x;
//     this.y = y;
//     this.xAnchor = (x + (this.width / 2));
//     this.yAnchor = (y + (this.height / 2));
//   }

//   updateAnchorPosition(x, y) {
//     this.xAnchor = x;
//     this.yAnchor = y;
//     this.x = (this.xAnchor - (this.width / 2));
//     this.y = (this.yAnchor - (this.height / 2));
//   }

//   render() {
//     if (this.rotation) {
//       game.ctx.translate(this.xAnchor, this.yAnchor);
//       // game.ctx.translate(this.x, this.y);
//       // game.ctx.rotate(this.rotation * Math.PI / 180);
//       game.ctx.rotate(this.rotation);
//       // game.ctx.rotate((2 * Math.PI) - this.rotation);
//       // game.ctx.translate((this.x * -1), (this.y * -1));
//       game.ctx.translate((this.xAnchor * -1), (this.yAnchor * -1));
//     }

//     game.ctx.beginPath();
//     game.ctx.lineWidth = this.lineWidth;
//     game.ctx.strokeStyle = this.strokeColor;
//     game.ctx.fillStyle = this.fillColor;
//     game.ctx.rect(this.x, this.y, this.width, this.height);

//     if (this.fill) {
//       game.ctx.fill();
//     }

//     game.ctx.stroke();

//     if (this.rotation) {
//       game.ctx.translate(this.xAnchor, this.yAnchor);
//       // game.ctx.translate(this.x, this.y);
//       // game.ctx.rotate((this.rotation * -1) * Math.PI / 180);
//       game.ctx.rotate(this.rotation * -1);
//       // game.ctx.rotate((2 * Math.PI) - (this.rotation * -1));
//       // game.ctx.translate((this.x * -1), (this.y * -1));
//       game.ctx.translate((this.xAnchor * -1), (this.yAnchor * -1));
//     }
//   }
// }
