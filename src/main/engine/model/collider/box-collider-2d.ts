import Component from '../component';
import GameObject from '../game-object';
import Transform from '../transform';
import Vector2 from '../vector2';
import { Collider2d } from './collider-2d';

export default class BoxCollider2d extends Component {

  private size: Vector2;

  public constructor(gameObject: GameObject, transform: Transform, size: Vector2) {
    super(gameObject, transform);

    this.size = size;
  }

  public overlapsCollider(collider: Collider2d): boolean {
    return false;
  }

  public closestPoint(point: Vector2): Vector2 {
    if (point.equals(this.transform.position)) {
      return new Vector2(
        this.transform.position.x,
        (this.transform.position.y + (this.size.y / 2)),
      );
    }

    const pointVector: Vector2 = point.subtract(this.transform.position);

    const extents: Vector2 = this.size.divideScalar(2);
    const max: Vector2 = this.transform.position.add(extents);

    // const normalizedDifference: Vector2 = difference.normalize();
    // const normalizedMax: Vector2 = max.normalize();

    // console.log(`normalizedDifference=${normalizedDifference}, normalizedMax=${normalizedMax}`);

    // const differenceSlope: number = difference.slope();
    // const maxSlope: number = max.slope();
    // if (differenceSlope > 0) {
    // } else if (differenceSlope < 0) {
    // }

    // TODO: Handle differenceSlope == 0
    return Vector2.zero();
  }

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
