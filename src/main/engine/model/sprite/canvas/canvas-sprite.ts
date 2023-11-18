import Sprite from '../sprite';

export default abstract class CanvasSprite extends Sprite {

  private fill: boolean;

  private lineWidth: number;

  private fillColor: string;
  private strokeColor: string;

  public constructor(
    type: string,
    fill: boolean,
    lineWidth: number,
    fillColor: string,
    strokeColor: string,
  ) {
    super('canvas');

    this.fill = fill;
    this.lineWidth = lineWidth;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
  }

  public getFill(): boolean {
    return this.fill;
  }

  public getLineWidth(): number {
    return this.lineWidth;
  }

  public getFillColor(): string {
    return this.fillColor;
  }

  public getStrokeColor(): string {
    return this.strokeColor;
  }
}
