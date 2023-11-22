import Rng from './rng';
import Vector2 from './vector2';

export default class Bounds {

  private center: Vector2;
  private extents: Vector2;
  private max: Vector2;
  private min: Vector2;
  private size: Vector2;

  public constructor(center: Vector2, size: Vector2) {
    this.center = center;
    this.extents = size.multiplyScalar(0.5);
    this.size = size;
    this.max = this.center.add(this.extents);
    this.min = this.center.subtract(this.extents);
  }

  public getCenter(): Vector2 {
    return this.center;
  }

  public getSize(): Vector2 {
    // return this.extents.multiply(2);
    return this.size;
  }

  public getExtents(): Vector2 {
    return this.extents;
  }

  // public getExtents(): Vector2 {
  //   return this.extents;
  // }

  public getMin(): Vector2 {
    // return this.center.subtract(this.extents);
    return this.min;
  }

  public getMax(): Vector2 {
    // return this.center.add(this.extents);
    return this.max;
  }

  public getRandomPoint(): Vector2 {
    const rng: Rng = Rng.getInstance();

    return new Vector2(
      rng.getRandomInt(this.min.x, this.max.x),
      rng.getRandomInt(this.min.y, this.max.y),
    );
  }

  public getRandomPointWithPadding(padding: number): Vector2 {
    const rng: Rng = Rng.getInstance();

    const minWithPadding: Vector2 = this.min.addScalar(padding);
    const maxWithPadding: Vector2 = this.max.subtractScalar(padding);

    return new Vector2(
      rng.getRandomInt(minWithPadding.x, maxWithPadding.x),
      rng.getRandomInt(minWithPadding.y, maxWithPadding.y)
    );
  }
}
