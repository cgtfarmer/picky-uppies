import Vector2 from '../vector2';

export interface Display {
  clearFrame(): void;

  getTransformMatrix(): Vector2;
}
