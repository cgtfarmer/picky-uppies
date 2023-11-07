import Rng from './rng';
import Vector2 from './vector2';

export default class Bounds {
  private center: Vector2;
  private extents: Vector2;
  // private max: Vector2;
  // private min: Vector2;
  // private size: Vector2;

  public constructor(center: Vector2, size: Vector2) {
    this.center = center;
    this.extents = size.multiply(0.5);
    // this.size = size;
    // this.max = this.center.add(this.extents);
    // this.min = this.center.subtract(this.extents);
  }

  public getCenter(): Vector2 {
    return this.center;
  }

  public getSize(): Vector2 {
    return this.extents.multiply(2);
  }

  public getExtents(): Vector2 {
    return this.extents;
  }

  public getMin(): Vector2 {
    return this.center.subtract(this.extents);
  }

  public getMax(): Vector2 {
    return this.center.subtract(this.extents);
  }

  public getRandomPoint(): Vector2 {
    const size: Vector2 = this.getSize();

    const rng: Rng = Rng.getInstance();
    return new Vector2(
      rng.getRandomInt(0, size.x),
      rng.getRandomInt(0, size.y)
    );
  }
}
