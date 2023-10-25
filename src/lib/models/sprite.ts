export default abstract class Sprite {

  private width: number;
  private height: number;
  private lineWidth: number;
  private strokeColor: string;
  private fillColor: string;

  private fill: boolean;

  public constructor(
    width: number,
    height: number,
    lineWidth: number,
    strokeColor: string,
    fillColor: string,
    fill: boolean,
  ) {
    this.width = width;
    this.height = height;
    this.lineWidth = lineWidth;
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
    this.fill = fill;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public getLineWidth(): number {
    return this.lineWidth;
  }

  public getStrokeColor(): string {
    return this.strokeColor;
  }

  public getFillColor(): string {
    return this.fillColor;
  }

  public getFill(): boolean {
    return this.fill;
  }
}
