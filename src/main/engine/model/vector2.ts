export default class Vector2 {

  public static zero(): Vector2 {
    return new Vector2(0, 0);
  }

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

  public multiply(value: Vector2): Vector2 {
    return new Vector2(
      (this.x * value.x),
      (this.y * value.y),
    );
  }

  public divide(value: Vector2): Vector2 {
    return new Vector2(
      (this.x / value.x),
      (this.y / value.y),
    );
  }

  public addScalar(value: number): Vector2 {
    return new Vector2(
      (this.x + value),
      (this.y + value)
    );
  }

  public subtractScalar(value: number): Vector2 {
    return new Vector2(
      (this.x - value),
      (this.y - value)
    );
  }

  public multiplyScalar(value: number): Vector2 {
    return new Vector2(
      (this.x * value),
      (this.y * value),
    );
  }

  public divideScalar(value: number): Vector2 {
    return new Vector2(
      (this.x / value),
      (this.y / value),
    );
  }

  public magnitude(): number {
    return Math.sqrt(
      Math.pow(this.x, 2) + Math.pow(this.y, 2)
    );
  }

  public normalize(): Vector2 {
    const magnitude: number = this.magnitude();

    if (magnitude == 0) return Vector2.zero();

    return this.divideScalar(magnitude);
  }

  public toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}
