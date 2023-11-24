import Component from '../component';
import GameObject from '../game-object';
import Transform from '../transform';
import Vector2 from '../vector2';
import { Collider2d } from './collider-2d';

export default class CircleCollider2d extends Component implements Collider2d {

  private radius: number;

  public constructor(gameObject: GameObject, transform: Transform, radius: number) {
    super(gameObject, transform);

    this.radius = radius;
  }

  public closestPoint(point: Vector2): Vector2 {
    const difference: Vector2 = point.subtract(this.transform.position);

    return difference.normalize().multiplyScalar(this.radius);
  }

  /**
   * Check if the Collider overlaps a point.
   *
   * @param point the point
   *
   * @returns whether or not the collider overlaps the point
   */
  public overlapPoint(point: Vector2): boolean {
    // console.log(`[Physics2d] center=${center}, radius=${radius}, point=${point}`);

    const difference: Vector2 = point.subtract(this.transform.position);

    const magnitude: number = difference.magnitude();

    return (magnitude <= this.radius);
  }

  public getCenter(): Vector2 {
    return this.transform.position;
  }

  public isTouching(collider: Collider2d): boolean {
    const closestPoint: Vector2 = this.closestPoint(collider.getCenter());

    return collider.overlapPoint(closestPoint);
  }

  public overlapCollider(): Collider2d[] {
    // CHANGE COLLIDER2D INTERFACE TO CLASS TO INHERIT THESE COMMON ONES
    // return physicsScene.colliders().filter((e) => e.isTouching(this));
  }
}
