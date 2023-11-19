import GameObject from '../game-object';
import Vector2 from '../vector2';

export interface RigidBody {

  movePosition(position: Vector2): void;

  translate(delta: Vector2): void;

  setGameObject(gameObject: GameObject): void;
}
