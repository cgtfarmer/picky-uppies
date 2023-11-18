import Vector2 from '../vector2.js';

export interface Action {
  perform(position: Vector2): void;
}
