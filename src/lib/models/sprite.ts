export default abstract class Sprite {

  private x: number;
  private y: number;
  private width: number;
  private height: number;

  public constructor(
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
