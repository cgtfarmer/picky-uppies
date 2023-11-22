import CanvasDisplay from '../../display/canvas-display';
import GameObject from '../../game-object';
import TextSprite from '../../sprite/canvas/text-sprite';
import Vector2 from '../../vector2';

export default class TextSpriteCanvasRenderer {

  private sprite: TextSprite | null;
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

  public setSprite(sprite: TextSprite): void {
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

    // const center: Vector2 = this.sprite.getCenter();
    const position: Vector2 = this.gameObject.getTransform().position;

    this.canvasContext.beginPath();
    this.canvasContext.lineWidth = this.sprite.getLineWidth();
    this.canvasContext.strokeStyle = this.sprite.getStrokeColor();
    this.canvasContext.fillStyle = this.sprite.getFillColor();
    this.canvasContext.font = `${this.sprite.getFontSize()}px ${this.sprite.getFontFamily()}`;
    this.canvasContext.textAlign = this.sprite.getAlignment();

    const canvasCenter: Vector2 = this.canvas.getBounds().getCenter();
    this.canvasContext.fillText(
      this.sprite.getContent(),
      (canvasCenter.x + position.x),
      (canvasCenter.y - position.y)
    );

    if (this.sprite.getFill()) {
      this.canvasContext.fill();
    }

    this.canvasContext.stroke();
  }
}
