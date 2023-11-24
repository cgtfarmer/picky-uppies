import Component from '../component';
import GameObject from '../game-object';
import Transform from '../transform';
import Vector2 from '../vector2';

export default class BoxCollider2d extends Component {

  private size: Vector2;

  public constructor(gameObject: GameObject, transform: Transform, size: Vector2) {
    super(gameObject, transform);

    this.size = size;
  }

  // public closestPoint(point: Vector2): Vector2 {
  //   const difference: Vector2 = point.subtract(this.transform.position);

  //   const extents: Vector2 = this.size.divideScalar(2);
  //   const max: Vector2 = this.transform.position.add(extents);

  //   // y = (difference.x / difference.y) * max.x

  //   return
  // }

  public getCenter(): Vector2 {
    return this.transform.position;
  }

  /**
   * Check if the Collider overlaps a point.
   *
   * @param point the point
   *
   * @returns whether or not the collider overlaps the point
   */
  public overlapPoint(point: Vector2): boolean {
    const extents: Vector2 = this.size.divideScalar(2);
    const min: Vector2 = this.transform.position.subtract(extents);
    const max: Vector2 = this.transform.position.add(extents);

    return point.between(min, max);
  }
}
