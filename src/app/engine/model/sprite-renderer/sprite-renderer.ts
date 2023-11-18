import { Display } from '../display/display';
import GameObject from '../game-object';
import Sprite from '../sprite/sprite';

export interface SpriteRenderer {
  render(): void;

  setGameObject(gameObject: GameObject): void;

  setDisplay(display: Display): void;

  setSprite(sprite: Sprite): void;
};
