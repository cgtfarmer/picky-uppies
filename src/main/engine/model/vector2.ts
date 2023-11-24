export default class Vector2 {

  public static zero(): Vector2 {
    return new Vector2(0, 0);
  }

  public static up(): Vector2 {
    return new Vector2(0, 1);
  }

  public static down(): Vector2 {
    return new Vector2(0, -1);
  }

  public static left(): Vector2 {
    return new Vector2(-1, 0);
  }

  public static right(): Vector2 {
    return new Vector2(1, 0);
  }

  public static upLeft(): Vector2 {
    return new Vector2(-1, 1);
  }

  public static upRight(): Vector2 {
    return new Vector2(1, 1);
  }

  public static downLeft(): Vector2 {
    return new Vector2(-1, -1);
  }

  public static downRight(): Vector2 {
    return new Vector2(1, -1);
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

  public greaterThan(value: Vector2): boolean {
    const difference: Vector2 = this.subtract(value);

    if (difference.x > 0 && difference.y > 0) return true;

    return false;
  }

  public lessThan(value: Vector2): boolean {
    const difference: Vector2 = this.subtract(value);

    if (difference.x < 0 && difference.y < 0) return true;

    return false;
  }

  public between(min: Vector2, max: Vector2): boolean {
    if (this.greaterThan(min) && this.lessThan(max)) return true;

    return false;
  }

  public toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}
