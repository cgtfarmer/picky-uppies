import { Renderable } from '../../interface/renderable';
import { Display } from '../display/display';
import GameObject from '../game-object';
import { SpriteRenderer } from '../sprite-renderer/sprite-renderer';
import SpriteRendererFactory from '../sprite-renderer/sprite-renderer-factory';
import Sprite from '../sprite/sprite';

export default class Scene implements Renderable {

  private readonly width: number;
  private readonly height: number;

  private gameObjects: GameObject[];

  public constructor(width: number, height: number, gameObjects: GameObject[]) {
    this.width = width;
    this.height = height;
    this.gameObjects = gameObjects;
  }

  public getGameObjects() {
    return this.gameObjects;
  }

  public addRenderable(renderable: GameObject) {
    this.gameObjects.push(renderable);
  }

  public generateSpriteRenderers(display: Display): void {
    const spriteRendererFactory: SpriteRendererFactory = SpriteRendererFactory.getInstance();

    this.gameObjects.forEach((gameObject: GameObject) => {
      const sprite: Sprite | null = gameObject.getSprite();

      if (sprite == null) return;

      const spriteRenderer: SpriteRenderer =
        spriteRendererFactory.create(sprite, display, gameObject.getTransform());

      gameObject.setSpriteRenderer(spriteRenderer);
    });
  }

  public update(): void {
    this.gameObjects.forEach(e => e.update());
  }
}
