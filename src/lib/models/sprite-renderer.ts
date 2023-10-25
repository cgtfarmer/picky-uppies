import Sprite from './sprite';
import Transform from './transform';

export default class SpriteRenderer {

  private readonly sprite: Sprite;
  private readonly transform: Transform;
  private readonly canvasContext: CanvasRenderingContext2D;

  public constructor(
    sprite: Sprite, transform: Transform, canvasContext: CanvasRenderingContext2D
  ) {
    this.sprite = sprite;
    this.transform = transform;
    this.canvasContext = canvasContext;
  }

  public render() {
    this.canvasContext.beginPath();
    this.canvasContext.lineWidth = this.sprite.getLineWidth();
    this.canvasContext.strokeStyle = this.sprite.getStrokeColor();
    this.canvasContext.fillStyle = this.sprite.getFillColor();

    this.canvasContext.rect(
      this.transform.getX(), this.transform.getY(), this.sprite.getWidth(), this.sprite.getHeight()
    );

    if (this.sprite.getFill()) {
      this.canvasContext.fill();
    }

    this.canvasContext.stroke();
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
