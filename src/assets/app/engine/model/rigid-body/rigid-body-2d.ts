import Transform from '../transform.js';
import Vector2 from '../vector2.js';

export default class RigidBody2d {

  private readonly transform: Transform;

  public constructor(transform: Transform) {
    this.transform = transform;
  }

  public movePosition(position: Vector2) {
    this.transform.position = position;
  }
}
