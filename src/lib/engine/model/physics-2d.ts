import GameObject from './game-object';
import Scene from './scene/scene';
import Vector2 from './vector2';

export default class Physics2D {

  private static singleton: Physics2D;

  public static getInstance(): Physics2D {
    if (this.singleton == null) this.singleton = new Physics2D();

    return this.singleton;
  }

  public overlapCircle(position: Vector2, radius: number, gameObjects: GameObject[]): GameObject[] {
    return gameObjects.filter((o) => {
      return this.pointIntersectsCircle(position, radius, o.getTransform().position);
    });
  }

  public pointIntersectsCircle(center: Vector2, radius: number, point: Vector2): boolean {
    const difference: Vector2 = point.minus(center);

    const magnitude: number = difference.magnitude();

    if (magnitude <= radius) return true;

    return false;
  }
}
