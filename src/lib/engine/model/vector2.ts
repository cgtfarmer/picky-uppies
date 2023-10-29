export default class Vector2 {
  public readonly x: number;
  public readonly y: number;

  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public minus(vector: Vector2) {
    return new Vector2(
      (this.y - vector.y),
      (this.x - vector.x)
    );
  }

  public magnitude() {
    return Math.sqrt(
      Math.pow(this.x, 2) + Math.pow(this.y, 2)
    );
  }
}
