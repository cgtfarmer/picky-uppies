import GameObject from './game-object';
import Scene from './scene/scene';
import Vector2 from './vector2';

export default class Physics2D {

  private static singleton: Physics2D;

  public static getInstance(): Physics2D {
    if (this.singleton == null) this.singleton = new Physics2D();

    return this.singleton;
  }

  public overlapCircleAll(
    position: Vector2, radius: number, gameObjects: GameObject[]
  ): GameObject[] {
    return gameObjects.filter((e) => {
      return (
        e.isEnabled() && this.pointIntersectsCircle(position, radius, e.getTransform().position)
      );
    });
  }

  public pointIntersectsCircle(center: Vector2, radius: number, point: Vector2): boolean {
    // console.log(`[Physics2d] center=${center}, radius=${radius}, point=${point}`);

    const difference: Vector2 = point.subtract(center);

    const magnitude: number = difference.magnitude();

    if (magnitude <= radius) return true;

    return false;
  }
}
