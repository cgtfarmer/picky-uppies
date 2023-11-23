import Vector2 from './vector2';

export default class Bounds {

  private center: Vector2;
  private extents: Vector2;
  private max: Vector2;
  private min: Vector2;
  private size: Vector2;

  public constructor(center: Vector2, size: Vector2) {
    this.center = center;
    this.extents = size.divideScalar(2);
    this.size = size;
    this.max = this.center.add(this.extents);
    this.min = this.center.subtract(this.extents);
  }

  public getCenter(): Vector2 {
    return this.center;
  }

  public getSize(): Vector2 {
    return this.size;
  }

  public getExtents(): Vector2 {
    return this.extents;
  }

  public getMin(): Vector2 {
    return this.min;
  }

  public getMax(): Vector2 {
    return this.max;
  }
}
