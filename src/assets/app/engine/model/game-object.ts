import { Renderable } from '../interface/renderable.js';
import Scene from './scene/scene.js';
import { SpriteRenderer } from './sprite-renderer/sprite-renderer.js';
import Sprite from './sprite/sprite.js';
import Transform from './transform.js';
import UuidProvider from '@/engine/uuid-provider.js';

export default class GameObject implements Renderable {
  public readonly id: string;

  public enabled: boolean;

  protected readonly transform: Transform;

  protected scene: Scene | null;

  protected sprite: Sprite;

  protected spriteRenderer: SpriteRenderer | null;

  public constructor(
    transform: Transform,
    sprite: Sprite,
  ) {
    this.id = UuidProvider.getRandom();
    this.enabled = true;
    this.scene = null;
    this.transform = transform;
    this.sprite = sprite;
    this.spriteRenderer = null;
  }

  public getScene(): Scene | null {
    return this.scene;
  }

  public getSprite(): Sprite | null {
    return this.sprite;
  }

  public getTransform(): Transform {
    return this.transform;
  }

  public setScene(scene: Scene): void {
    this.scene = scene;
  }

  public setSpriteRenderer(spriteRenderer: SpriteRenderer): void {
    this.spriteRenderer = spriteRenderer;
  }

  public update(): void {
    throw Error('Implement override');
  }
}
