import Vector2 from '../../vector2';
import CanvasSprite from './canvas-sprite';

export default class TextSprite extends CanvasSprite {

  private center: Vector2;
  private content: string;
  private fontSize: number;
  private fontFamily: string;
  private alignment: CanvasTextAlign;

  public constructor(
    center: Vector2,
    content: string,
    fontSize: number,
    fontFamily: string,
    alignment: CanvasTextAlign,
    fill: boolean,
    lineWidth: number,
    fillColor: string,
    strokeColor: string
  ) {
    super('text', fill, lineWidth, fillColor, strokeColor);

    this.center = center;
    this.content = content;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.alignment = alignment;
  }

  public getCenter(): Vector2 {
    return this.center;
  }

  public getAlignment(): CanvasTextAlign {
    return this.alignment;
  }

  public getContent(): string {
    return this.content;
  }

  public getFontSize(): number {
    return this.fontSize;
  }

  public getFontFamily(): string {
    return this.fontFamily;
  }

  public setContent(content: string): void {
    this.content = content;
  }
}
