import Vector2 from '../vector2';

export interface Collider2d {

  /**
   * Returns a point on the perimeter of this Collider that is closest to the given point.
   *
   * @param point the given point
   *
   * @return the point on the Collider perimeter closest to the given point
   */
  closestPoint(point: Vector2): Vector2;

  /**
   * Check if the Collider overlaps a point.
   *
   * @param point the point
   *
   * @returns whether or not the collider overlaps the point
   */
  overlapPoint(point: Vector2): boolean;

  /**
   * Get a list of all colliders that overlap this collider.
   *
   * @returns all the colliders which overlap this collider
   */
  overlapCollider(): Collider2d[];

  /**
   * Check whether or not this collider is touching the given collider.
   *
   * @param collider the given
   *
   * @return whether or not the colliders are touching
   */
  isTouching(collider: Collider2d): boolean;

  // /**
  //  * Checks whether this collider is touching any colliders on the specified layerMask or not.
  //  *
  //  * @param layerMask the given layer mask
  //  *
  //  * @return whether or not the collider is touching any collider in the layer mask
  //  */
  // isTouchingLayers(layerMask: number): boolean;

  getCenter(): Vector2;
}
