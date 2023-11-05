export default class Vector2 {
  public readonly x: number;
  public readonly y: number;

  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public add(value: Vector2): Vector2 {
    return new Vector2(
      (this.x + value.x),
      (this.y + value.y)
    );
  }

  public subtract(value: Vector2): Vector2 {
    return new Vector2(
      (this.x - value.x),
      (this.y - value.y)
    );
  }

  public magnitude(): number {
    return Math.sqrt(
      Math.pow(this.x, 2) + Math.pow(this.y, 2)
    );
  }

  public multiply(value: number): Vector2 {
    return new Vector2(
      (this.x * value),
      (this.y * value),
    );
  }

  public scale(value: Vector2): Vector2 {
    return new Vector2(
      (this.x * value.x),
      (this.y * value.y),
    );
  }
}
