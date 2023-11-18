import { Display } from '../display/display';
import GameObject from '../game-object';
import { SpriteRenderer } from '../sprite-renderer/sprite-renderer';
import Sprite from '../sprite/sprite';

export default class Animator {

  public gameObject: GameObject | null;

  public sprites: Sprite[];
  public activeSprite: Sprite;
  public spriteRenderer: SpriteRenderer;

  public constructor(spriteRenderer: SpriteRenderer, sprites: Sprite[]) {
    this.sprites = sprites;
    this.activeSprite = sprites[0];
    this.spriteRenderer = spriteRenderer;
    this.spriteRenderer.setSprite(this.activeSprite);
    this.gameObject = null;
  }

  public setDisplay(display: Display): void {
    this.spriteRenderer.setDisplay(display);
  }

  public setGameObject(gameObject: GameObject): void {
    this.gameObject = gameObject;
    this.spriteRenderer.setGameObject(this.gameObject);
  }

  public render(): void {
    this.spriteRenderer.render();
  }
}
