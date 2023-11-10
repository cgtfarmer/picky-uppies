import GameObject from '../game-object';

export interface SpriteRenderer {
  render(): void;

  setGameObject(gameObject: GameObject): void;
};
