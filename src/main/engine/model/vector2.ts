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

    return (difference.x > 0 && difference.y > 0);
  }

  public lessThan(value: Vector2): boolean {
    const difference: Vector2 = this.subtract(value);

    return (difference.x < 0 && difference.y < 0);
  }

  public between(min: Vector2, max: Vector2): boolean {
    return (this.greaterThan(min) && this.lessThan(max));
  }

  /**
   * Calculate the angle of this vector as if it were stemming from the center of the unit circle.
   *
   * <p>Angles are computed counterclockwise where 0 is represented by
   * the normalized vector (1, 0), and pi is represented by the normalized vector (-1, 0)</p>
   */
  public angle(): number {
    const result: number = Math.atan2(this.y, this.x);
    if (this.y >= 0) return result;

    return (2 * Math.PI) + result;
  }

  /**
   * Garbo manual version.
   */
  // public badAngle(): number {
  //   const normalized: Vector2 = this.normalize();

  //   const result: number = Math.atan(normalized.y / normalized.x);
  //   if (normalized.x > 0 && normalized.y > 0) {
  //     return result;
  //   } else if (normalized.x < 0 && normalized.y > 0) {
  //     return (Math.PI / 2) - result;
  //   } else if (normalized.x < 0 && normalized.y < 0) {
  //     return (1.5 * Math.PI) - result;
  //   } else if (normalized.x > 0 && normalized.y < 0) {
  //     return (1.5 * Math.PI) - result;
  //   }

  //   if (normalized.x == 0) {
  //     if (normalized.y == 1) return (Math.PI / 2);

  //     return (Math.PI * 1.5);
  //   }

  //   if (normalized.y == 0) {
  //     if (normalized.x == 1) return 0;

  //     return Math.PI;
  //   }

  //   return 0;
  // }

  /**
   * Determine if angle is greater than the given vector's angle.
   *
   * <p>See <code>angle</code></p>
   *
   * @param value the given vector
   *
   * @returns whether the angle is greater than the given vector's angle
   */
  public greaterThanAngle(value: Vector2): boolean {
    return this.angle() > value.angle();
  }

  public lessThanAngle(value: Vector2): boolean {
    return this.angle() < value.angle();
  }

  public betweenAngle(min: Vector2, max: Vector2): boolean {
    return (this.greaterThanAngle(min) && this.lessThanAngle(max));
  }

  public slope(): number {
    return (this.y / this.x);
  }

  public equals(value: Vector2): boolean {
    return (value.x == this.x && value.y == this.y);
  }

  public toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}
