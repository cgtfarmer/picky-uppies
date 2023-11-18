import Vector2 from '../vector2';

export interface Action {
  perform(position: Vector2): void;
}
